const router = require('express').Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
    // res.json(swaggerSpec);
    res.json(JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger/spec.json'), 'utf-8')));
  });

router.use(require('./sampleController'));

module.exports = router;

