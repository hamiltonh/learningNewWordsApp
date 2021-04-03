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
 * npm install webpack -D
 * npm install -D webpack-cli
 * npm install -D babel-loader @babel/core @babel/preset-env
 * npm install vue-loader vue-template-compiler -D
 * npm install -D vue
 */
 
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const mongoose = require('mongoose');

const URI = 'mongodb://localhost/mevn-learning-words2'
mongoose.connect( URI,
{ useNewUrlParser: true , useUnifiedTopology: true })// add WARNINGS
.then(db => console.log('DB conectada!'))
.catch(err => console.log(err))



// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use('/api/tasks', require('./routes/tasks'));

// static
app.use(express.static(path.join(__dirname, 'public')));;

// listenning on port
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
