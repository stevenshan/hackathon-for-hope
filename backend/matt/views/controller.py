import flask
from flask import jsonify
from flask import current_app as app
import redis
import uuid

views = flask.Blueprint("app", __name__)

@views.route("/medicine", methods=["GET"])
def _medicine():
    keys = list(app.redis.keys("medicine:*"))

    values = [app.redis.hgetall(x) for x in keys]

    return jsonify(values)

@views.route("/steven", methods=["GET"])
def _user():
    properties = app.redis.hgetall("steven:props")

    medicineNames = app.redis.keys("steven:medicine:*")

    medicines = [app.redis.hgetall(x) for x in medicineNames]
    temp = {"medicine": medicines}    
    temp.update(properties)

    return jsonify(temp)


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
