import flask
from flask import current_app as app
import requests
import json
import uuid
from matt.views import controller

@controller.route("/", methods=["GET"])
def index():

    # get medicines
    DB_URL = app.config.get("DB_URL")
    DB_URI = app.config.get("DB_URI")

    medicines = requests.get(DB_URL + "/medicine").text
    userReq = requests.get(DB_URL + DB_URI)
    active = userReq.text
    _active = json.loads(active)

    return flask.render_template(
        "scheduler.html",
        medicines=medicines,
        prescriptions=active,
        firstname=_active["firstname"].capitalize(),
        lastname=_active["lastname"].capitalize(),
    )

DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

@controller.route("/", methods=["POST"])
def _index():
    return createOrUpdate("/addprescription")

@controller.route("/update", methods=["POST"])
def _update():
    return createOrUpdate("/updateprescription")

@controller.route("/delete", methods=["POST"])
def _delete():
    form = {x: flask.request.form[x] for x in flask.request.form}

    DB_URL = app.config.get("DB_URL")
    DB_URI = app.config.get("DB_URI")
    response = requests.post(DB_URL + DB_URI + "/deleteprescription",
                  data = form)

    if response.status_code != 200:
        print(response.status_code)
        raise ValueError("Received bad status code")

    return "good"

def createOrUpdate(endpoint):
    days = str(flask.request.form["days"]).lower().split(",")
    _days = set()
    for day in days:
        day = day.strip(" ")
        try:
            i = DAYS.index(day)
        except:
            i = -1
        if i != -1:
            _days.add(i)
        elif day in ("everday", "all", "every"):
            _days = _days.union(set(range(0, 7)))
    _days = list(_days)
    _days.sort()

    times = str(flask.request.form["times"]).lower().split(",")
    _times = set()
    for time in times:
        time = time.strip(" ")
        if time == "noon":
            _times.add(12)
        elif time == "midnight":
            _times.add(0)
        else:
            ampm = time[-2:]
            idx = time[:-2]

            valid = ampm in ("am", "pm")
            try:
                idx = int(idx)
            except:
                valid = false

            if not valid or idx > 12:
                continue

            pm = ampm == "pm"
            if idx == 12:
                idx = 0
            _times.add(idx + (12 if pm else 0))
    _times = list(_times)
    _times.sort()

    _days = ",".join([str(x) for x in _days])
    _times = ",".join([str(x) for x in _times])

    _id = str(uuid.uuid4())
    prescription = {
        "_id": flask.request.form.get("_id", _id),
        "name": flask.request.form["name"],
        "instruction": flask.request.form["instructions"],
        "recommendation": flask.request.form["recommendation"],
        "dosage": flask.request.form["dosage"],
        "times": _times,
        "days": _days,
    }

    if prescription["name"].strip(" ") == "":
        raise ValueError("Prescription needs a name.")

    DB_URL = app.config.get("DB_URL")
    DB_URI = app.config.get("DB_URI")
    response = requests.post(DB_URL + DB_URI + endpoint,
                  data = prescription)

    if response.status_code != 200:
        raise ValueError("Received bad status code")

    return json.dumps(prescription)

