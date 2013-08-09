/* TODO:
    - Install other dependencies (socket.io, etc)
    - Fix app.locals
    - Make Grunt work
    - Clean up jade files
 * ====================== */


/* Dependencies
 * ====================== */
var express  = require("express"),
    http     = require("http"),
    stylus   = require("stylus"),
    mongoose = require("mongoose"),

    routes   = require("./routes/routes"),
    util     = require("./util");

    require("colors");

var PORT = process.env.PORT,
    IP = process.env.IP;


var app = express();
mongoose.connect("mongodb://localhost/users");


/* Configuration
    - Set the port to 3000
    - Set the views folder to /views
    - Set the view engine to jade
    - Something.??
    - Enable case sensitive routing
    - Enable advanced logger

    - Parse request bodies
    - Something with HTTP requests??
    - Handle custom files before exposing /public??

    - Handle .less stylesheets

    - Serve static files??
 * ====================== */
app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");

    app.set("view options", { layout: false });
    app.enable("case sensitive routing");
    // app.use(express.logger("dev")); // comment if too much spam

    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // Set the local property 'url' to the current url. Used for navbar
    app.use(function(req, res, next) {
        if (req.url === "/") res.locals.url = "index";
        else res.locals.url = req.url.replace(/\W/g, "");
        next();
    });

    app.use(app.router);

    /*app.use(require("less-middleware")({
        dest: __dirname + '/public/css',
        src: __dirname + '/public/less',
        compress: true
    }));*/

    app.use(stylus.middleware({
        src: __dirname + "/public/stylus",
        dest: __dirname + "/public/css/"
    }));

    app.use(express.static(__dirname + "/public"));
});


/* Set locals
 * ====================== */
app.locals({
    appName: "Template",
    theme: "cosmo",
    author: "Morten Lindhardt",
    authorLink: "http://github.com/r3Fuze"
});


/* Database
 * ====================== */
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error")); // change this
db.once("open", function() {
    // stuff
    console.log("DB open");
});


/* Routes
 * ====================== */
app.get("/", routes.index);
app.get("/login", routes.login);
app.get("/signup", routes.signup);


/* Handle 404 and 500. This should be called after all other routes
 * ====================== */
app.use(routes._404);
app.use(routes._500);


/* Create the server
 * ====================== */
var server = http.createServer(app).listen(PORT, function() {
    console.log("Express server listening on port %s".blue, PORT);
});
