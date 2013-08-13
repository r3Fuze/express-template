/* global module:false */
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Task configuration.
        jshint: {
            options: {
                // curly: true,
                "-W099"  : true, // smart tabs
                eqeqeq   : true,
                immed    : true,
                newcap   : true,
                noarg    : true,
                quotmark : "double",
                undef    : true,
                trailing : true,
                browser  : true,
                devel    : true,
                jquery   : true,
                node     : true

            },
            files: {
                src: "**/*.js"
            },
            gruntfile: {
                src: "Gruntfile.js"
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks("grunt-contrib-jshint");

    // Default task.
    grunt.registerTask("default", ["jshint"]);
};
