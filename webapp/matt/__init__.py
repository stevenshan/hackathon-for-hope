from flask import Flask
import os
import redis

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

        app.redis = redis.from_url(
            app.config["REDIS_URL"],
            charset="utf-8",
            decode_responses=True
        )

    return app
    
