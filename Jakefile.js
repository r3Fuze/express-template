/* TODO:
    - Figure out how to remove 'undeclared variable' warning
 * ====================== */
var conf = require("./conf");


desc("Lint JavaScript files!");
task("lint", function() {
    console.log("Linting files");

    var lint = require("./lib/jakelint.js");

    var files = new jake.FileList();
    files.include("**/*.js");
    files.exclude(["node_modules", "public/libs"]);
    var pass = lint.run(files.toArray(), conf.lint.options, conf.lint.globals);
    if (!pass) fail("Lint failed");
});

task("default", ["lint"]);
