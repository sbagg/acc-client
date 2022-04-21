const CalcController = require('../../controllers/CalculationController')
var router = require('express').Router();

module.exports = app => {

app.get('/api/calculations', CalcController.getCalc);
app.get('/api/calculations/:id', CalcController.getCalcID);

app.post('/api/calculations',CalcController.postCalcID);
//app.post('/new/calculations',CalcController.postCalcID);

app.delete('/api/calculations/:id', CalcController.deleteCalcID);

//app.delete('delete/calculations/:id', CalcController.deleteCalcID);
}