module.exports = {
    PORT: process.env.PORT,
    IP  : process.env.IP,

    mongo_url: "mongodb://localhost/users",
    session_secret: "3sekrt5yu",

    // app.locals
    locals: {
        appName: "Template",
        theme: "cosmo",
        author: "Morten Lindhardt",
        authorLink: "http://github.com/r3Fuze"
    },

    // Jake
    lint: {
        options: {
            bitwise: true,
            curly: false,
            eqeqeq: true,
            forin: true,
            immed: true,
            newcap: true,
            noarg: true,
            noempty: true,
            nonew: true,
            regexp: true,
            quotmark: "double",
            // undef: true,
            // strict: true,
            trailing: true,
            node: true
        },
        globals: {
            describe: false,
            it: false,
            beforeEach: false,
            afterEach: false
        }
    }
};