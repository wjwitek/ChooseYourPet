import os
from flask import Flask, send_from_directory
from utils.data import get_criteria_info, get_pet_data

criteria = get_criteria_info("./data/categories.csv")
pet_data = get_pet_data("./data/pet_data.csv", [i["name"] for i in criteria])
# TODO: criteria matrices from pet_data

app = Flask(__name__, static_folder="./assets/build")

# Hacky way to make Flask catch all the routes and not try to serve static files
# See https://github.com/pallets/flask/issues/1633
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route("/api/criteria")
def criteria():
    return {"criteria": criteria}
