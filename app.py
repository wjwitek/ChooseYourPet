from flask import Flask, send_from_directory, request, jsonify
from utils.data import get_criteria, get_pets
import os

criteria = None
pets = None
result = None

criteria_data = get_criteria("./data/categories.csv")
pets_data = get_pets("./data/pets.csv")

app = Flask(__name__, static_folder="./assets/build")

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
        "criteria": criteria is not None,
        "pets": pets is not None,
    }

@app.route("/api/submit/criteria", methods=["POST"])
def api_submit_criteria():
    global criteria
    # Raises 400 error if th request body is not a valid json
    data = request.get_json()
    print(data)

    # TODO: data validation
    if False:
        return "Invalid json structure", 400
    
    criteria = data
    result = None

    return jsonify(), 200

@app.route("/api/submit/pets", methods=["POST"])
def api_submit_pets():
    global pets
    # Raises 400 error if th request body is not a valid json
    data = request.get_json()
    try:
        

    # TODO: data validation
    if False:
        return "Invalid json structure", 400
    
    pets = data
    result = None

    return jsonify(), 200

@app.route("/api/result")
def api_result(key):
    if result is None:
        # TODO: calculate result
        result = "qwertyio"

    return result
