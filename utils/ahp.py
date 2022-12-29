import numpy as np
import random

RI = {3: 0.546, 4: 0.83, 5: 1.08, 6: 1.26, 7: 1.33, 8: 1.41, 9: 1.45}

def process_matrix(raw_matrix: list[list[float]]) -> np.ndarray:
    matrix = np.eye(len(raw_matrix))
    for i in range(len(raw_matrix)):
        for j in range(len(raw_matrix[i])):
            matrix[i,j] = raw_matrix[i][j]
            matrix[j,i] = 1 / raw_matrix[i][j]
    return matrix

def calculate_priority_vector(matrix: np.ndarray) -> tuple[np.ndarray, float]:
    eigen_values, eigen_vectors = np.linalg.eig(matrix)
    # numpy returns things here weirdly, such that column i corresponds to eigenvalue i
    eigen_vector = eigen_vectors[:, 0]
    return eigen_vector / eigen_vector.sum(), eigen_values.max()

def calculate_consistency(eigen_value: float, matrix_len: int) -> float:
    ci = (eigen_value - matrix_len) / (matrix_len - 1)
    return ci / RI[matrix_len]

class AnalyticHierarchyProcess:
    def __init__(self, pets_data: list[dict[str, str]]):
        self.pets_data = pets_data

        self.criteria_matrix = None
        self.pets_matrices = None
        self.consistency_ratio = None

    def is_criteria_set(self) -> bool:
        return self.criteria_matrix is not None

    def is_pets_set(self) -> bool:
        return self.pets_matrices is not None

    def add_pets_matrix(self, raw_matrices: list[list[list[float]]]):
        self.pets_matrices = [process_matrix(raw) for raw in raw_matrices]

    def add_criteria_matrix(self, raw_matrix: list[list]):
        self.criteria_matrix = process_matrix(raw_matrix)

    def choose_pet(self) -> tuple[list[float], float]:
        if not self.is_criteria_set() or not self.is_pets_set(): return None, None

        criteria_vector, eigen_value = calculate_priority_vector(self.criteria_matrix)
        criteria_vector = criteria_vector.astype('float64')
        consistency_ratio = calculate_consistency(eigen_value, len(self.criteria_matrix))

        rank_vector = np.zeros(len(self.pets_data))
        for i in range(len(self.pets_matrices)):
            pet_criteria_vector, _ = calculate_priority_vector(self.pets_matrices[i])
            rank_vector += pet_criteria_vector.astype('float64') * criteria_vector[i]

        indexes = [i for i in range(len(self.pets_data))]

        result = [x for _, x in sorted(zip(rank_vector, indexes), reverse=True)][:3]
        result = [self.pets_data[i] for i in result]

        return result, consistency_ratio
