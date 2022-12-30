import unittest
from random import choice

import numpy as np

from utils.ahp import *
from utils.data import *


def random_symmetric_matrix(n: int) -> list[list]:
    values = [9, 7, 5, 3, 1, 1 / 3, 1 / 5, 1 / 7, 1 / 9]
    matrix = []
    for i in range(n):
        temp = []
        for j in range(i):
            temp.append(choice(values))
        matrix.append(temp)
    return process_matrix(matrix).tolist()


class TestHelperFunctions(unittest.TestCase):
    def test_process_matrix(self):
        raw_matrix = [[], [1], [1, 2], [1, 2, 3]]
        processed_matrix = np.asarray([[1, 1, 1, 1], [1, 1, 1 / 2, 1 / 2], [1, 2, 1, 1 / 3], [1, 2, 3, 1]])

        self.assertTrue(np.array_equal(process_matrix(raw_matrix), processed_matrix))

    def test_calculate_priority_vector(self):
        input_matrix = np.asarray([[1, 2, 3], [1 / 2, 1, 4], [1 / 3, 1 / 4, 1]])
        priority_vector = np.asarray([0.517, 0.358, 0.124])
        calculated_vector = calculate_priority_vector(input_matrix)

        self.assertTrue(np.allclose(priority_vector, calculated_vector, rtol=1e-02))

    def test_calculate_consistency(self):
        input_matrix = np.asarray([[1, 1, 1, 1], [1, 1, 1 / 2, 1 / 2], [1, 2, 1, 1 / 3], [1, 2, 3, 1]])
        consistency_ratio = 0.0863

        self.assertAlmostEqual(calculate_consistency(input_matrix), consistency_ratio, places=3)


class TestAHPMethods(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(TestAHPMethods, self).__init__(*args, **kwargs)
        pets_data = get_pets("../data/pets.csv")
        self.ahp = AnalyticHierarchyProcess(pets_data)
        self.ahp.add_criteria_matrix(np.load("data/criteria.npy").tolist())
        self.ahp.add_pets_matrix(np.load("data/pets.npy").tolist())

    def test_choose_pet(self):
        pets = self.ahp.choose_pet()

        self.assertTrue(pets[0]["name"], "Dog")
        self.assertTrue(pets[1]["name"], "Cat")
        self.assertTrue(pets[2]["name"], "Guinea pig")

    def test_consistency_indices(self):
        criteria = 1.125
        pets = [0.612, 2.318, 1.129, 2.395, 0.441, 0.876, 1.006]
        json = self.ahp.get_consistency_indices()

        self.assertAlmostEqual(criteria, json['criteria'], places=2)
        self.assertTrue(np.allclose(pets, json['pets'],  rtol=1e-02))


if __name__ == '__main__':
    unittest.main()
