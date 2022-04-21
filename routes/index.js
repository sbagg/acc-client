
const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();


const SampleController = require('../controllers/sampleController')
const calculation = require('./modelRoutes/calculationRoutes'); // CALCULATION ROUTES
const eto = require('./modelRoutes/etoRoutes'); // ETO ROUTES
const grid = require('./modelRoutes/gridRoutes'); // GRID ROUTES
const kc_dates = require('./modelRoutes/kc_datesRoutes'); // KC_DATES ROUTES
const kc = require('./modelRoutes/kcRoutes'); // KC ROUTES

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: 'application/vnd.api+json' }));
app.use(cors());

app.get('/api', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'Welcome to ACC API wit Node.js + Express + PostgreSQL + Docker!',
      version: '1.0.0',
    });
  });
calculation(app); // Calculation ROUTES
eto(app); // Eto ROUTES
grid(app); // Grid ROUTES
kc_dates(app); // KcDates ROUTES
kc(app); // Kc ROUTES


app.get('/sample', SampleController.getSample)


module.exports = app;



