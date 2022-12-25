import csv

def get_data(file_path: str, necessary_keys) -> list[dict[str, str]]:
    with open(file_path) as file:
        csv_reader = csv.DictReader(file)

        if [i for i in necessary_keys if i not in csv_reader.fieldnames]:
            raise ValueError(f"Csv file does not contain one of necessary columns: {necessary_keys}")
        
        return [i for i in csv_reader]

def get_criteria(file_path: str) -> list[dict[str, str]]:
    return get_data(file_path, ["name", "description"])

def get_pets(file_path: str) -> list[dict[str, str]]:
    return get_data(file_path, ["name", "pictureUrl", "description"])
