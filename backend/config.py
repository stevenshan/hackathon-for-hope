import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = "#######"

    REDIS_URL = "localhost:6379"

Config.SECRET_KEY = os.environ.get("SECRET_KEY", Config.SECRET_KEY)
Config.REDIS_URL = os.environ.get("REDIS_URL", Config.REDIS_URL)
