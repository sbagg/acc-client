const path = require('path');
const express = require('express');
const webpack = require("webpack");
// const app = express();

// const webpackDevMiddleware = require("webpack-dev-middleware");
// const config = require("./webpack.config.js");
// const compiler = webpack(config);
const app = express(),
            DIST_DIR = path.join(__dirname, 'dist'),
            HTML_FILE = path.join(__dirname, 'src', 'index.html')

app.use(express.static('src'));
app.use(express.static(DIST_DIR));
app.get('*', (req, res) => {
    res.sendFile(HTML_FILE, {root: '.'})
})


// app.use(
//     webpackDevMiddleware(compiler, {
//       publicPath: config.output.publicPath,
//     })
//   );
// app.use("/static", express.static('./static/'));

// app.use("/", express.static('./dist/main.js'));


const PORT = process.env.PORT || 6500
// app.listen(PORT, () => {
//     console.log(`App listening to ${PORT}....`)
//     console.log('Press Ctrl+C to quit.')
// })
app.listen(PORT, function () {
    console.log("Example app listening on port 6500!\n");
  });