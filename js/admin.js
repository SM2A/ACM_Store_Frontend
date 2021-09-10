// let email = getCookie("email");
// let password = getCookie("password");

if (((email === "") && (password !== ""))
    || ((email !== "") && (password === ""))
    || ((email === "") && (password === ""))) {
    alert("Please login first");
    window.location.href = "/static/Login.html";
    clearCookie();
} else {
    $.ajax({
        url: "http://localhost:8080/valid_login",
        type: "POST",
        data: {"email": email, "password": password},
        success: function (response) {
            if (response == "0") {
                alert("Please login first");
                clearCookie();
                window.location = "/static/Login.html";
            } else if (response == "1") {
                $.ajax({
                    url: "http://localhost:8080/valid_admin",
                    type: "POST",
                    data: {"email": email, "password": password},
                    success: function (response) {
                        if (response == "0") {
                            alert("You are not Admin")
                            window.location = "/";
                        }
                    }
                });
            }
        }
    });
}
