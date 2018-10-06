import flask
from . import controller

@controller.route("/", methods=["GET"])
def index():
    return flask.render_template("scheduler.html")
