const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

// parse body messages for post route
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const connection = require("../db/connection");

app.Sequelize = connection.Sequelize;
app.sequelize = connection.sequelize;

// Inject the db routes via express router, pass app to it (sequelize is tied in)
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});


module.exports = app;
