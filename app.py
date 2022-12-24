from flask import Flask, send_from_directory, request, jsonify
from utils.data import get_criteria_info, get_pet_data
import uuid
import os

MAX_BUFFER_SIZE = 20

buffer = {}

criteria = get_criteria_info("./data/categories.csv")
pet_data = get_pet_data("./data/pet_data.csv", [i["name"] for i in criteria])
# TODO: criteria matrices from pet_data

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

@app.route("/api/criteria")
def api_criteria():
    return {"criteria": criteria}

@app.route("/api/compute", methods=["POST"])
def api_compute():
    # Raises 400 error if th request body is not a valid json
    data = request.get_json()

    # TODO: data validation
    if False:
        return "Invalid json structure", 400

    if len(buffer) == MAX_BUFFER_SIZE:
        # Remove oldest element from the buffer
        buffer.pop(next(iter(buffer)))
    
    key = uuid.uuid4()
    buffer[key] = {"data": data, "result": None}

    return jsonify(), 201, {"location": f"/results/{key}"}

@app.route("/api/results/<uuid:key>")
def api_result(key):
    if key not in buffer:
        return "Invalid location", 400
    
    item = buffer[key]

    if item["result"] is None:
        # TODO: calculate result
        item["result"] = 1

    return item["result"]
