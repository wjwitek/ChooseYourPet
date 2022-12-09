from flask import Flask

app = Flask(__name__, static_folder="./assets/build", static_url_path="/")

@app.route("/")
def hello_world():
    return app.send_static_file("index.html")