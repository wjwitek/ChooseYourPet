import numpy as np
import random


def process_matrix(raw_matrix: list[list]):
    matrix = np.eye(len(raw_matrix))
    for i in range(len(raw_matrix)):
        for j in range(len(raw_matrix[i])):
            matrix[j][i] = raw_matrix[i][j]
            matrix[i][j] = 1 / raw_matrix[i][j]
    return matrix


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


class AnalyticHierarchyProcess:
    def __init__(self, pets_data: list[dict], criteria_data: list[dict]):
        self.criteria = [criteria['name'] for criteria in criteria_data]
        self.pets = [pet['name'] for pet in pets_data]

        self.criteria_matrix = None
        self.pets_matrices = [None for _ in self.criteria]

    def criteria_set(self) -> bool:
        return self.criteria_matrix is not None

    def pets_set(self) -> bool:
        for matrix in self.pets_matrices:
            if matrix is None:
                return False
        return True

    def add_pets_matrix(self, criteria: int, raw_matrix: list[list]):
        self.pets_matrices[criteria] = process_matrix(raw_matrix)

    def add_criteria_matrix(self, raw_matrix: list[list]):
        self.criteria_matrix = process_matrix(raw_matrix)

    def choose_pet(self, pets_data) -> list:
        criteria_vector = calculate_priority_vector(self.criteria_matrix).astype('float64')
        rank_vector = np.zeros(len(self.pets))
        for i in range(len(self.pets_matrices)):
            rank_vector += calculate_priority_vector(self.pets_matrices[i]).astype('float64') * criteria_vector[i]

        indexes = [i for i in range(len(pets_data))]

        result = [x for _, x in sorted(zip(rank_vector, indexes), reverse=True)][:3]
        result = [pets_data[i] for i in result]

        return result
