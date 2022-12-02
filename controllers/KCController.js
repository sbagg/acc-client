const KcModel = require("../models/KCModel.js");
//controller takes the request, response and next object 

module.exports = {
  // GET ALL SAMPLES
  getKc(req, res, next) {
    return KcModel.get()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },
  getKcID(req, res, next) {
    return KcModel.getID()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },

};