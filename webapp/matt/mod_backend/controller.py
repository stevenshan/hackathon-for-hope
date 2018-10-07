import flask

mod_backend = flask.Blueprint("backend", __name__, url_prefix="/backend")

def route(*argv, **kwargs):
    return mod_backend.route(*argv, **kwargs)
