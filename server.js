// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");

const Hapi = require('hapi');
const server = Hapi.server({ host: 'localhost', port: 3000 });

// Set up port to be either the host's designated port, or 3000
var PORT = process.env.PORT || 3000;

// Instantiate Express App
var app = express();

// Require routes
var routes = require("./routes");

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make public a static folder
app.use(express.static("public"));

// Connect Handlebars to our Express app
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Make every request go through route middleware
app.use(routes);

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Connected successfully!");
});

// Listen on the port
app.listen(PORT, function() {
  console.log("Listening on port: " + PORT);
});

server.route({
  method: 'GET',
  path: '/javascript/index.js*}',
  handler: {
    directory: {
      path:    __dirname + '/public',
      listing: false,
      index:   false
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function(request, reply) {
    reply.view('homepage');
  }
});