const KcDateModel = require("../models/KcDatesModel");
//controller takes the request, response and next object 

module.exports = {
  // GET ALL SAMPLES
  getKcDate(req, res, next) {
    return KcDateModel.get()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },
  getKcDateID(req, res, next) {
    let id = req.params.id;
    return KcDateModel.getID()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },

};