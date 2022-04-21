const CalcModel = require("../models/CalculationModel");
//controller takes the request, response and next object 

module.exports = {
  // GET ALL SAMPLES
  getCalc(req, res, next) {
    return CalcModel.get()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },
  getCalcID(req, res, next) {
    return CalcModel.getID()
      .then(data => res.send(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },
  postCalcID(req, res, next) {
    return CalcModel.insertID()
      .then(data => res.status(200).json({ success: true, msg: "Calculations Posted" }))
      .catch(err => res.status(400).json({ err }));
  },
  deleteCalcID(req, res, next) {
    return CalcModel.deleteID()
      .then(data => res.status(200).json({ success: true, msg: "Calculations Deleted" }))
      .catch(err => res.status(400).json({ err }));
  },

};