const KcController = require('../../controllers/KCController')

module.exports = app => {

  app.get('/api/kc', KcController.getKc)
  app.get('/api/kc/:id', KcController.getKcID)
}