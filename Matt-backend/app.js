const bodyParser = require('body-parser')
const chalk = require('chalk');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
}, (err, db) => {
    if (err) {
        return console.log(err);
    }
});

app.get('/', function(req, res, next) {
    res.send('Hello Brandon');
});

app.get('/medicine/:name', function(req, res, next) {
    let medicine = req.params.name;
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, db) => {  
        if (err) {
          return console.log(err);
        }
        var dbo = db.db("mattdb");
        // dbo.collection("medicine").findOne({name: medicine}, function(err, result) {
        //     if (err) return console.log(err);
        //     console.log(result.name);
        //     db.close();
        // });
    });
    res.send(medicine);
});

app.post('/medicine/add/', function(req, res, next) {
    console.log(req.body);
    var _name = req.body.name;
    var _instruction = req.body.instruction;
    var _recommendation = req.body.recommendation;
    var medicine = {
        "name": _name,
        "instruction": _instruction,
        "recommendation": _recommendation
    };
    MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, db) => {  
        if (err) {
          return console.log(err);
        }
        var dbo = db.db("mattdb");
        dbo.collection("medicine").insertOne(medicine, function(err, result) {
            if (err) throw err;
            console.log(result.name);
            db.close();
        });
    });
    res.send("Done");
});

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});