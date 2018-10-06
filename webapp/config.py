import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = "#######"

    #DB_URL = "http://hackthishelpkids-matt.appspot.com"
    #DB_URL = "http://128.237.165.133:8080"
    DB_URL = "http://localhost:5123"

    DB_URI = "/steven"

Config.SECRET_KEY = os.environ.get("SECRET_KEY", Config.SECRET_KEY)
