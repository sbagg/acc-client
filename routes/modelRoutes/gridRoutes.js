const GridController = require('../../controllers/GridController')

module.exports = app => {

  app.get('/api/grid', GridController.getGrid)
  app.get('/api/grid/:id', GridController.getGridID)
}