const express = require('express');
const port    = process.env.PORT || 4000;
const app     = express();
const dest    = `${__dirname}/public`;
const router  = require('./config/routes');
const errorHandler = require('./lib/errors');
const mongoose = require('mongoose');
const env = require('./config/env');
mongoose.Promise = require('bluebird');


app.use(express.static(dest));
mongoose.connect(env.db[process.env.NODE_ENV]);


app.use(router);
app.get('/*', (req, res) => res.sendFile(`${dest}/index.html`));
app.use(errorHandler);

app.listen(port, () => console.log(`Express has started on port: ${port}`));

module.exports = app;
