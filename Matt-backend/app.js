const chalk = require('chalk');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
let indexRouter = require('./routes/index');
require('dotenv').config()


MongoClient.connect(process.env.MONGO_URL, { useNewUrlParser: true }, (err, db) => {  
    if (err) {
      return console.log(err);
    }
  });

let app = express();
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);

app.use('/', indexRouter);

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});