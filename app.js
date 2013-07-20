/* TODO:
    - Install other dependencies (socket.io, etc)
 * ====================== */

/* Dependencies
 * ====================== */
var express = require("express"),
    http    = require("http"),

    routes  = require("./routes/routes"),
    secret  = require("./secret");


var app = express();

app.locals({
    theme: "cosmo"
});


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
    app.use(app.router);

    app.use(require("less-middleware")({
        dest: __dirname + '/public/css',
        src: __dirname + '/public/less',
        compress: true
    }));

    app.use(express.static(__dirname + "/public"));
});


/* Routes
 * ====================== */
app.get("/", function(req, res) {
    res.render("index", {
        title: "Building Web Apps in Node with Express"
    });
});


/* Create the server
 * ====================== */
var server = http.createServer(app).listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
