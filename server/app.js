const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

const connection = require("../db/connection");

app.Sequelize = connection.Sequelize;
app.sequelize = connection.sequelize;

//const Promise = require("bluebird");

// Inject the db routes via express router, pass sequelize object to it
const dbRoutes = require("./routes/db.js")(app);
app.use("/db", dbRoutes);

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Render base index.html page in every route
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
