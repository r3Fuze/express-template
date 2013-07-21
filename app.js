/* TODO:
    - Install other dependencies (socket.io, etc)
    - Fix app.locals
 * ====================== */


/* Dependencies
 * ====================== */
var express = require("express"),
    http    = require("http"),

    routes  = require("./routes/routes"),
    util    = require("./util"),
    secret  = require("./secret");


var app = express();


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
    app.set("port", process.env.PORT || 3000);
    app.set("views", __dirname + "/views");
    app.set("view engine", "jade");
    app.set("view options", { layout: false });
    app.enable("case sensitive routing");
    app.use(express.logger("dev"));

    app.use(express.bodyParser());
    app.use(express.methodOverride());

    // Set the local property 'url' to the current url. Used for navbar
    app.use(function(req, res, next) {
        if (req.url === "/") res.locals.url = "index";
        else res.locals.url = req.url.replace(/\W/g, "");
        next();
    });

    app.use(app.router);

    app.use(require("less-middleware")({
        dest: __dirname + '/public/css',
        src: __dirname + '/public/less',
        compress: true
    }));

    app.use(express.static(__dirname + "/public"));
});


/* Set locals
 * ====================== */
app.locals({
    appName: "Template",
    theme: "flatly",
    author: "Morten Lindhardt",
    authorLink: "http://github.com/r3Fuze"
});


/* Routes
 * ====================== */
app.get("/", routes.index);


/* Handle 404 and 500. This should be called after all other routes
 * ====================== */
app.use(routes._404);
app.use(routes._500);


/* Create the server
 * ====================== */
var server = http.createServer(app).listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
