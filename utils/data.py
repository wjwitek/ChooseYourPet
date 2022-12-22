import csv

def get_criteria_info(file_path: str) -> list[dict[str, str]]:
    with open(file_path) as file:
        csv_reader = csv.DictReader(file)

        if csv_reader.fieldnames != ["name", "description"]:
            raise ValueError("Categories csv file has invalid column names, expected: {name, description}")
        
        return [i for i in csv_reader]

def get_pet_data(file_path: str, criteria: list[str]) -> dict[str, dict[str, str]]:
    data = {}
    with open(file_path) as file:
        csv_reader = csv.DictReader(file)
        necessary_keys = ["name", "pictureUrl", "description"]

        if [i for i in necessary_keys if i not in csv_reader.fieldnames]:
            raise ValueError(f"Pet data csv file does not contain one of necessary columns: {necessary_keys}")

        for criterium in criteria:
            if criterium not in csv_reader.fieldnames:
                raise ValueError(f"Pet data csv file does not contain expected criterium: {criterium}")
        
        for criterium in [i for i in csv_reader.fieldnames if i not in necessary_keys]:
            if criterium not in criteria:
                print(f"Warning: pet data csv file contains unexpected criterium: {criterium}")
        
        for pet_data in csv_reader:
            try:
                data[pet_data["name"]] = {k: float(v) for (k, v) in pet_data.items() if k not in necessary_keys}
            except ValueError:
                raise ValueError(f"Criterium must be a numeric value, invalid value for the row: {pet_data['name']}")

            for key in [i for i in necessary_keys if i != "name"]:
                data[pet_data["name"]][key] = pet_data[key]
    
    return data
