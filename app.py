from flask import Flask
from utils.data import get_criteria_info, get_pet_data

criteria = get_criteria_info("./data/categories.csv")
pet_data = get_pet_data("./data/pet_data.csv", [i["name"] for i in criteria])
# TODO: criteria matrices from pet_data

app = Flask(__name__, static_folder="./assets/build", static_url_path="/")

@app.route("/")
def get_index():
    return app.send_static_file("index.html")

@app.route("/resources/criteria")
def get_criteria():
    return {"criteria": criteria}
