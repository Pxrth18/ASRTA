from flask import Flask, render_template
import json

app = Flask(__name__)


# Load completed missions
def load_missions():
    with open("data/missions.json", "r") as file:
        return json.load(file)


# Load Upcoming missions
def load_upcoming():
    with open("data/upcoming.json", "r") as file:
        return json.load(file)
    
#load rocket gallery
def load_rockets():
    with open("data/rockets.json", "r") as file:
        return json.load(file)


# Home Page
@app.route("/")
def home():

    missions = load_missions()
    upcoming = load_upcoming()

    return render_template(
        "index.html",
        missions=missions,
        upcoming=upcoming
    )


# Mission Details Page
@app.route("/mission/<int:id>")
def mission_details(id):

    missions = load_missions()

    mission = next((m for m in missions if m["id"] == id), None)

    if mission is None:
        return "Mission not found", 404

    return render_template(
        "mission.html",
        mission=mission
    )

@app.route("/upcoming/<int:id>")
def upcoming_details(id):

    upcoming = load_upcoming()

    mission = next((m for m in upcoming if m["id"] == id), None)

    if mission is None:
        return "Mission not found", 404

    return render_template(
        "upcoming.html",
        mission=mission
    )

@app.route("/rockets")
def rockets():

    rockets = load_rockets()

    return render_template(
        "rockets.html",
        rockets=rockets
    )


@app.route("/rocketexplore/<int:id>")
def rocket_details(id):

    rockets = load_rockets()

    rocket = next((r for r in rockets if r["id"] == id), None)

    if rocket is None:
        return "Rocket not found", 404

    return render_template(
        "rocketexplore.html",
        rocket=rocket
    )


@app.route("/simulate/<int:id>")
def access(id):

    missions = load_missions()

    mission = next((m for m in missions if m["id"] == id), None)

    return render_template("access.html", mission=mission)

@app.route("/simulator/<int:id>")
def simulator(id):

    missions = load_missions()

    mission = next((m for m in missions if m["id"] == id), None)

    if mission is None:
        return "Mission not found", 404

    return render_template(
        "simulator.html",
        mission=mission
    )

# Run the application
if __name__ == "__main__":
    app.run(debug=True)