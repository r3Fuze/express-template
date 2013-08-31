
/* Index Route
 * ====================== */
exports.index = function(req, res) {
  res.render("index", { title: "Home" });
};

/* Login Route
 * ====================== */
exports.login = function(req, res) {
    res.render("login", {
        title: "Login"
    });
};

/* Signup Route
 * ====================== */
exports.signup = function(req, res) {
    res.render("signup", {
        title: "Signup"
    });
};

/* Docs Route
 * ====================== */
exports.docs = function(req, res) {
    res.render("docs", {
        title: "docs"
    });
};

/* 404 Route
 * ====================== */
exports._404 = function(req, res) {
    res.status(404);
    res.render("404", {
        title: "404: File Not Found!"
    });
};


/* 500 Route
 * ====================== */
exports._500 = function(err, req, res, next) {
    res.status(500);
    res.render("500", {
        title: "500: Internal Server Error!",
        error: err
    });
};