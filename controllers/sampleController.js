const SampleModel = require("../models/sampleModel");
//controller takes the request, response and next object 

module.exports = {
  // GET ALL SAMPLES
  getSample(req, res, next) {
    return SampleModel.get()
      .then(data => res.status(200).json({ success: true, data: data }))
      .catch(err => res.status(400).json({ err }));
  },

};