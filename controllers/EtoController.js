const EtoModel = require("../models/EtoModel.js");
//controller takes the request, response and next object 

module.exports = {
  // GET ALL SAMPLES
  getEto(req, res, next) {
    return EtoModel.get()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },
  getEtoID(req, res, next) {
    return EtoModel.getID()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },

};