const async = require("async");
const bodyParser = require('body-parser')
const chalk = require('chalk');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
let app = express();
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        return console.log(err);
    }
});

app.get('/', function (req, res, next) {
    res.send('<img style="width:100%;" src="https://media1.tenor.com/images/a7eda1aa3541cadbb98dcb4f57931a58/tenor.gif"/>');
});

app.get('/patients', function (req, res, next) {
    MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            return console.log(err);
        }
        var dbo = db.db("mattdb");
        dbo.collection("patients").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.send(result);
        });
    });
});

app.get('/patients/:lastname/:firstname', function (req, res, next) {
    var first_name = req.params.firstname;
    var last_name = req.params.lastname;
    MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            return console.log(err);
        }
        var dbo = db.db("mattdb");
        dbo.collection("patients").findOne({
            firstname: first_name,
            lastname: last_name
        }, function (err, result) {
            if (err) return console.log(err);
            let patient = result;
            db.close();
            res.send(patient);
        });
    });
});

app.post('/patients/:lastname/:firstname/addprescription', function (req, res, next) {
    console.log(req.body);
    var first_name = req.params.firstname;
    var last_name = req.params.lastname;
    MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            return console.log(err);
        }
        var dbo = db.db("mattdb");
        dbo.collection("patients").findOne({
            firstname: first_name,
            lastname: last_name
        }, function (err, patient) {
            if (err) return console.log(err);
            let medicine = {
                "name": req.body.name,
                "instruction": req.body.instruction,
                "recommendation": req.body.recommendation,
                "days": req.body.days,
                "times": req.body.times,
                "dosage": req.body.dosage
            };
            patient.medicine.push(medicine);
            dbo.collection("patients").updateOne(
                { firstname: first_name,
                    lastname: last_name },
                { $set: { "medicine" : patient.medicine } }
             );
            db.close();
            res.send("Done.");
        });
    });
});

app.post('/patients/:lastname/:firstname/deleteprescription', function (req, res, next) {
    console.log(req.body);
    var first_name = req.params.firstname;
    var last_name = req.params.lastname;
    MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            return console.log(err);
        }
        var dbo = db.db("mattdb");
        dbo.collection("patients").findOne({
            firstname: first_name,
            lastname: last_name
        }, function (err, patient) {
            if (err) return console.log(err);
            let medicine = {
                "name": req.body.name,
                "instruction": req.body.instruction,
                "recommendation": req.body.recommendation,
                "days": req.body.days,
                "times": req.body.times,
                "dosage": req.body.dosage
            };
            console.log(medicine);
            patient.medicine.pop(medicine);
            dbo.collection("patients").updateOne(
                { firstname: first_name,
                    lastname: last_name },
                { $set: { "medicine" : patient.medicine } }
             );
            console.log(patient);
            db.close();
            res.send("Done.");
        });
    });
});

app.post('/patients/add', function (req, res, next) {
    var first_name = req.body.firstname;
    var last_name = req.body.lastname;
    var date_of_birth = req.body.dateofbirth;
    var medicine_name = req.body.medicinename;
    var medicine_days = req.body.medicinedays;
    var medicine_times = req.body.medicinetimes;
    var medicine_dosage = req.body.medicinedosage;
    var recommendations = req.body.recommendations;
    var patient = {
        "firstname": first_name,
        "lastname": last_name,
        "dateofbirth": date_of_birth,
        "medicine": {
            "name": medicine_name,
            "days": medicine_days,
            "times": medicine_times,
            "dosage": medicine_dosage
        },
        "recommendations": recommendations
    };
    MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            return console.log(err);
        }
        var dbo = db.db("mattdb");
        dbo.collection("patients").insertOne(patient, function (err, result) {
            if (err) throw err;
            db.close();
        });
    });
    res.send("Done");
});

app.get('/medicine', function (req, res, next) {
    MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            return console.log(err);
        }
        var dbo = db.db("mattdb");
        dbo.collection("medicine").find({}).toArray(function (err, result) {
            if (err) throw err;
            db.close();
            res.send(result);
        });
    });
});

app.get('/medicine/:name', function (req, res, next) {
    let medicine = req.params.name;
    MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            return console.log(err);
        }
        var dbo = db.db("mattdb");
        dbo.collection("medicine").findOne({
            name: medicine
        }, function (err, result) {
            if (err) return console.log(err);
            db.close();
            res.send(result);
        });
    });
});

app.post('/medicine/add/', function (req, res, next) {
    var _name = req.body.name;
    var _instruction = req.body.instruction;
    var _recommendation = req.body.recommendation;
    var _dosage = req.body.dosage;
    var _times = req.body.times;
    var _days = req.body.days;
    var medicine = {
        "name": _name,
        "instruction": _instruction,
        "recommendation": _recommendation
    };
    MongoClient.connect(process.env.MONGO_URL, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) {
            return console.log(err);
        }
        var dbo = db.db("mattdb");
        dbo.collection("medicine").insertOne(medicine, function (err, result) {
            if (err) throw err;
            db.close();
        });
    });
    res.send("Done");
});

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});