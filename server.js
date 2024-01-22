const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection.js');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;