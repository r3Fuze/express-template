// #login-element
// Regex's
//   simple password: ^.{3,200}$
//   no special charaters pw: /^[a-zA-Z0-9_]{3,200}$/
(function() {

    $("#login-email").val("test@email.com");
    $("#login-password").val("test_pass");

    $("#login-submit").on("click", function(e) {
        e.preventDefault();

        var email = $("#login-email").val(),
            password = $("#login-password").val(),
            remember = $("#login-remember").val();

        console.log("email test", /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email));
        console.log("password test", /^.{3,200}$/.test(password));

    });
}());