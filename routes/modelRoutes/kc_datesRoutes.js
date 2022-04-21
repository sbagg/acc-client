const KcDatesController = require('../../controllers/KCDatesController')

module.exports = app => {

app.get('/api/kc_dates', KcDatesController.getKcDate)
app.get('/api/kc_dates/:id', KcDatesController.getKcDateID)

}