const express = require('express');
const app = require('./routes/index.js');

const PORT = 7000;

app.use(express.static('public'));

app.get('*', function(req, res){
      res.sendFile("./public/index.html", {root: '.'});
    });

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));