const EtoController = require('../../controllers/EtoController')

module.exports = app => {

  app.get('/api/eto', EtoController.getEto);
  app.get('/api/eto/:id', EtoController.getEtoID);
}