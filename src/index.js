/**
 * Steps:
 * git init
 * npm init -y
 * 
 * npm install express
 * npm install nodemon
 * npm install morgan -D
 * 
 * sudo apt-get install mongodb
 * npm install mongoose
 * sudo service mongodb start
 * 
 * 
 * 
 */


const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mevn-learning-words',
{ useNewUrlParser: true , useUnifiedTopology: true })// add due some WARNINGS
.then(db => console.log('DB conectada!'))
.catch(err => console.log(err))

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/tasks', require('./routes/tasks'));

// static
app.use(express.static(path.join(__dirname, 'public')));;

// listenning on port
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
