const GridModel = require("../models/GridModel.js");
//controller takes the request, response and next object 

module.exports = {
  // GET ALL SAMPLES
  getGrid(req, res, next) {
    return GridModel.get()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },
  getGridID(req, res, next) {
    return GridModel.getID()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },

};