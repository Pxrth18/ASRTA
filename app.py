from flask import Flask, render_template
import json

app = Flask(__name__)


def load_missions():
    with open("data/missions.json", "r") as file:
        return json.load(file)


@app.route("/")
def home():
    missions = load_missions()
    return render_template("index.html", missions=missions)

@app.route("/mission/<int:id>")
def mission_details(id):

    missions = load_missions()

    mission = next((m for m in missions if m["id"] == id), None)

    return render_template("mission.html", mission=mission)


if __name__ == "__main__":
    app.run(debug=True)