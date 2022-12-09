import numpy as np
import random


class AnalyticalHierarchyProcess:
    def __init__(self):
        self.criteria = ["time", "cost", "lifespan"]
        self.pets = ["cat", "dog", "snake"]
        self.criteria_matrix = np.ones([len(self.criteria), len(self.criteria)])
        self.pets_matrices = [np.ones([len(self.pets), len(self.pets)]) for _ in self.criteria]

    def add_pets_matrix(self, criteria: str, matrix: np.ndarray):
        self.pets_matrices[self.criteria.index(criteria)] = matrix

    def add_criteria_matrix(self, matrix: np.ndarray):
        self.criteria_matrix = matrix

    def choose_pet(self) -> str:
        criteria_vector = calculate_priority_vector(self.criteria_matrix).astype('float64')
        rank_vector = np.zeros(len(self.pets))
        for i in range(len(self.pets_matrices)):
            rank_vector += calculate_priority_vector(self.pets_matrices[i]).astype('float64') * criteria_vector[i]

        print(rank_vector)

        return self.pets[rank_vector.argmax()]


def calculate_priority_vector(matrix: np.ndarray) -> np.ndarray:
    eigen_values, eigen_vectors = np.linalg.eig(matrix)
    eigen_vector = eigen_vectors[:, 0]  # numpy returns things here weirdly, such that column i corresponds to
    # eigenvalue i
    return eigen_vector / eigen_vector.sum()


def randomize_matrix(n: int) -> np.ndarray:
    matrix = np.ones([n, n])
    for i in range(n):
        for j in range(n):
            if i < j:
                matrix[i][j] = random.random()
                matrix[j][i] = 1 / matrix[i][j]

    return matrix


# przykład jak to działa dla losowych odpowiedzi
if __name__ == "__main__":
    test = AnalyticalHierarchyProcess()
    test.add_criteria_matrix(randomize_matrix(3))
    test.add_pets_matrix("time", randomize_matrix(3))
    test.add_pets_matrix("cost", randomize_matrix(3))
    test.add_pets_matrix("lifespan", randomize_matrix(3))

    print(test.criteria_matrix)
    print(test.pets_matrices)

    print(test.choose_pet())
