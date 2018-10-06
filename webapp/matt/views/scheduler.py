from . import controller

@controller.route("/", methods=["GET"])
def test():
    return "Test"
