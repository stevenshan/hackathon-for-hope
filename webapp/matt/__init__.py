from flask import Flask
import os

def create_app():
    app = Flask(
        __name__,
        static_url_path="/static",
        instance_relative_config=True
    )

    app.config.from_object("config.Config")

    with app.app_context():
        from matt.views.controller import views

        app.register_blueprint(views)

    return app
    
