const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// parse body messages for post route
const bodyParser = require("body-parser");

const PRODUCTION_PORT = process.env.PORT || 8080;
const DEVELOPMENT_PORT = 3001;

const { env } = process;

const { NODE_ENV } = env;

const PORT = (NODE_ENV === "production" ? PRODUCTION_PORT : DEVELOPMENT_PORT);

const API = require("./helpers/api.js");

app.use(bodyParser.json());

// We could conditionally catch errors if we're in dev vs. prod, but in this
// case it doesn't really matter. We should be smart enough to handle errors
// with expected cases
process.on("unhandledRejection", (err) => {

  // Actually throw stack-traces for unhandled rejections (mainly for promise debugging)
  throw err;

});

// Inject the db routes via express router, pass app to it (sequelize is tied in)
const dbRoutes = require("./routes/db.js");

const serverRequestMethods = [ "get", "post", "put", "delete" ];

// Generify each server-handled request method and inject the pertinent type
// into express Router
serverRequestMethods.forEach((srm) => {

  app[srm]("/api/*", (req, res) => API[srm](req, res));

});

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// If we're in production, serve the files and static assets.
if (NODE_ENV === "production") {

  // Serve static assets
  app.use(express.static(path.resolve(__dirname, "..", "build")));

  app.get("*", (req, res) => {

    // Render base index.html page in every route
    res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));

  });

}

app.listen(PORT, () => {

  console.log(`App listening on port ${PORT}!`);

});
