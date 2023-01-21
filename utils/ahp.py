import numpy as np
from functools import partial

RI = {3: 0.546, 4: 0.83, 5: 1.08, 6: 1.26, 7: 1.33, 8: 1.41, 9: 1.45}

def process_matrix(raw_matrix: list[list[float]]) -> np.ndarray:
    matrix = np.eye(len(raw_matrix))
    for i in range(len(raw_matrix)):
        for j in range(len(raw_matrix[i])):
            matrix[i,j] = raw_matrix[i][j]
            matrix[j,i] = 1 / raw_matrix[i][j]
    return matrix

def calculate_priority_vector_evm(matrix: np.ndarray) -> np.ndarray:
    eigen_values, eigen_vectors = np.linalg.eig(matrix)
    # numpy returns things here weirdly, such that column i corresponds to eigenvalue i
    eigen_vector = eigen_vectors[:, eigen_values.argmax()]
    return eigen_vector / eigen_vector.sum()

def calculate_priority_vector_gmm(matrix: np.ndarray) -> np.ndarray:
    means = [geo_mean(row) for row in matrix]
    means_sum = sum(means)
    return np.asarray([mean / means_sum for mean in means])

def calculate_consistency(matrix: np.ndarray) -> float:
    eigen_values, _ = np.linalg.eig(matrix)

    n = len(matrix)
    ci = (eigen_values.astype('float64').max() - n) / (n - 1)
    return ci / RI[n]

def geo_mean(array: np.ndarray):
    return array.prod()**(1.0/len(array))

class AnalyticHierarchyProcess:
    def __init__(self, pets_data: list[dict[str, str]]):
        self.pets_data = pets_data

        self.criteria_matrix = {}
        self.pets_matrices = {}
        self.consistency_ratio = None
        self.expert_number = None
        self.method = partial(calculate_priority_vector_gmm)

    def is_criteria_set(self, expert_id: int) -> bool:
        return expert_id in self.criteria_matrix.keys() and self.criteria_matrix[expert_id] is not None

    def is_pets_set(self, expert_id: int) -> bool:
        return expert_id in self.pets_matrices.keys() and self.pets_matrices[expert_id] is not None

    def is_ready(self) -> bool:
        if len(self.criteria_matrix.keys()) != self.expert_number:
            return False
        if len(self.pets_matrices.keys()) != self.expert_number:
            return False

        for key in self.criteria_matrix:
            if not self.is_criteria_set(key):
                return False

        for key in self.pets_matrices:
            if not self.is_pets_set(key):
                return False

        return True

    def add_pets_matrix(self, raw_matrices: list[list[list[float]]], expert_id: int):
        self.pets_matrices[expert_id] = [process_matrix(raw) for raw in raw_matrices]

    def add_criteria_matrix(self, raw_matrix: list[list], expert_id: int):
        self.criteria_matrix[expert_id] = process_matrix(raw_matrix)

    def get_consistency_indices(self, expert_id):
        criteria_consistency = None if not self.is_criteria_set(expert_id) \
            else calculate_consistency(self.criteria_matrix[expert_id])
        pets_consistencies = None if not self.is_pets_set(expert_id)\
            else [calculate_consistency(matrix) for matrix in self.pets_matrices[expert_id]]

        return {"criteria": criteria_consistency, "pets": pets_consistencies}

    def calculate_rank_vector(self, expert_id) -> np.ndarray:
        criteria_vector = self.method(self.criteria_matrix[expert_id])
        criteria_vector = criteria_vector.astype("float64")

        rank_vector = np.zeros(len(self.pets_data))
        for i in range(len(self.pets_matrices)):
            pet_criteria_vector = self.method(self.pets_matrices[expert_id][i])
            rank_vector += pet_criteria_vector.astype("float64") * criteria_vector[i]

        return rank_vector

    def choose_pet(self) -> list[dict]:
        if not self.is_ready(): return None, None

        rank_vectors = []

        for key in self.criteria_matrix.keys():
            rank_vectors.append(self.calculate_rank_vector(key))

        # aggregate individual priorities using geometric mean
        rank_vectors = np.asarray(rank_vectors)
        rank_vector = [geo_mean(rank_vectors[:, i]) for i in range(rank_vectors.shape[1])]

        # return 3 highest results
        indexes = [i for i in range(len(self.pets_data))]
        result = [x for _, x in sorted(zip(rank_vector, indexes), reverse=True)][:3]
        result = [self.pets_data[i] for i in result]

        return result
