/* TODO:
    - Install other dependencies (socket.io, etc)
    - Fix app.locals
    - Make Grunt work
    - Clean up jade files

   Pkgs:
    - http://dandean.github.io/express-form/ - validate forms
 * ====================== */


/* Dependencies
 * ====================== */
var express     = require("express"),
    http        = require("http"),
    stylus      = require("stylus"),
    // mongo       = require("mongoose"),
    log         = require("logule").init(module),
    errorface   = require("errorface"),

    conf        = require("./conf"),
    routes      = require("./routes/routes"),
    util        = require("./util");

    require("colors");


var app = express();
// mongo.connect(conf.mongo_url);


/* Configuration
 * ====================== */
app.configure(function() {
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");

    app.set("view options", { layout: false });
    // app.use(express.logger("dev")); // comment if too much spam

    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.methodOverride());
    // app.use(express.session({ secret: conf.session_secret })); this gives err 500

    // Set the local property 'url' to the current url. Used for navbar
    // Fix this so it doesn't fire for each request
    app.use(function(req, res, next) {
        if (req.url === "/") {
            res.locals.url = "index";
        } else {
            res.locals.url = req.url.replace(/\W/g, "");
        }
        var app_theme = req.cookies.app_theme || "cosmo";
        res.locals.app_theme = app_theme;

        next();
    });

    app.locals = conf.locals;
    // app.use(app.router);

    app.use(stylus.middleware({
        src: __dirname + "/public/stylus",
        dest: __dirname + "/public/css/"
    }));

    app.use(express.static(__dirname + "/public"));
});


/* Database
 * ====================== */
/*var db = mongo.connection;
db.on("error", console.error.bind(console, "connection error")); // change this
db.once("open", function() {
    // stuff
    log.info("DB open");

    var userSchema = new mongo.Schema({
        username: {
            type: String,
            unique: true,
            match: /^[a-zA-Z0-9_]{3,20}$/
        }
    });
});*/


/* Routes
 * ====================== */
app.get("/", routes.index);
app.get("/login", routes.login);
app.get("/signup", routes.signup);
app.get("/docs", routes.docs);
app.get("/error", function() {
    app.wat();
});


/* Handle 404 and 500.
   This should be called after all other routes
 * ====================== */
app.use(routes._404);
app.use(routes._500);
// app.use(errorface.errorHandler()); uncomment to use errorface errors


/* Create the server
 * ====================== */
var server = http.createServer(app).listen(conf.PORT, function() {
    log.info("Express server listening on port %s", conf.PORT);
});
