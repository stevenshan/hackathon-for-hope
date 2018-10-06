import flask

views = flask.Blueprint("app", __name__)

def route(*argv, **kwargs):
    return views.route(*argv, **kwargs)
