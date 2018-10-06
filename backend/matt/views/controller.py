import flask
from flask import jsonify
from flask import current_app as app
import redis
import uuid
import datetime

views = flask.Blueprint("app", __name__)

@views.route("/medicine", methods=["GET"])
def _medicine():
    keys = list(app.redis.keys("medicine:*"))

    values = [app.redis.hgetall(x) for x in keys]

    return jsonify(values)

def _getUser():
    properties = app.redis.hgetall("steven:props")

    medicineNames = app.redis.keys("steven:medicine:*")

    medicines = [app.redis.hgetall(x) for x in medicineNames]
    temp = {"medicine": medicines}    
    temp.update(properties)

    return temp

@views.route("/steven", methods=["GET"])
def _user():
    return jsonify(_getUser())

@views.route("/test", methods=["GET"])
def __test():
    return str(datetime.datetime.today())

@views.route("/rebecca", methods=["GET"])
def __user():
    user = _getUser()

    medicines = user["medicine"]
    _medicines = []

    today = (datetime.datetime.today().weekday() + 1) % 7

    for x in medicines:
        days = str(x["days"]).split(",")
        if str(today) in days:
            dt = datetime.datetime.today()
            hours = str(x["times"]).split(",")
            for hour in hours:
                dt = dt.replace(minute=0, second=0,microsecond=0,hour=int(hour))

                start = dt.strftime("%Y-%m-%d %H:%M:%S") 
                dt = dt.replace(minute=10)
                end = dt.strftime("%Y-%m-%d %H:%M:%S") 

                result = {
                    "start": start,
                    "end": end,
                    "title": x["name"],
                    "summary": x["instruction"],
                }

                _medicines.append(result)

    return jsonify(_medicines)

@views.route("/steven/addprescription", methods=["POST"])
def _add():
    data = flask.request.form
    _data = {x: data[x] for x in data}

    _id = str(uuid.uuid4())

    app.redis.hmset("steven:medicine:%s" % _id, _data)

    return "good"

@views.route("/steven/deleteprescription", methods=["POST"])
def _delete():
    medicines = app.redis.keys("steven:medicine:*")
    _id = flask.request.form["_id"]

    for _medicine in medicines:
        medicine = app.redis.hgetall(_medicine)
        medicine = {x: medicine[x] for x in medicine} 

        if medicine["_id"] == _id:
            app.redis.delete(_medicine)
            break

    return "good"

@views.route("/steven/updateprescription", methods=["POST"])
def _update():
    medicines = app.redis.keys("steven:medicine:*")
    _id = flask.request.form["_id"]
    temp = {x: flask.request.form[x] for x in flask.request.form}

    for _medicine in medicines:
        medicine = app.redis.hgetall(_medicine)
        medicine = {x: medicine[x] for x in medicine} 

        if medicine["_id"] == _id:
            app.redis.delete(_medicine)
            app.redis.hmset(_medicine, temp)
            break

    return "good"
