from flask import Flask, send_from_directory, request, jsonify
from utils.data import get_criteria, get_pets
from utils.ahp import AnalyticHierarchyProcess
import os

criteria_data = get_criteria("./data/categories.csv")
pets_data = get_pets("./data/pets.csv")

app = Flask(__name__, static_folder="./assets/build")
ahp = AnalyticHierarchyProcess(pets_data, criteria_data)

# Hacky way to make Flask catch all the routes and not try to serve static files
# See https://github.com/pallets/flask/issues/1633
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):
    if path != "" and os.path.exists(f"{app.static_folder}/{path}"):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

@app.route("/api/data/criteria")
def api_criteria():
    return {"data": criteria_data}

@app.route("/api/data/pets")
def api_pets():
    return {"data": pets_data}

@app.route("/api/available")
def api_available():
    return {
        "criteria": bool(ahp.criteria_set()),
        "pets": bool(ahp.pets_set()),
    }

@app.route("/api/submit/criteria", methods=["POST"])
def api_submit_criteria():
    # Raises 400 error if th request body is not a valid json
    data = request.get_json()

    if 'data' not in data or type(data['data']) != list:
        return "Invalid json structure", 400

    ahp.add_criteria_matrix(data['data'])

    return jsonify(), 200

@app.route("/api/submit/pets", methods=["POST"])
def api_submit_pets():
    # Raises 400 error if th request body is not a valid json
    data = request.get_json()

    if 'data' not in data or type(data['data']) != list or len(data['data']) != len(criteria_data):
        return "Invalid json structure", 400
    
    for i in range(len(data['data'])):
        ahp.add_pets_matrix(i, data['data'][i])

    return jsonify(), 200

@app.route("/api/result")
def api_result():
    result = ahp.choose_pet(pets_data)

    return {"data": result}
