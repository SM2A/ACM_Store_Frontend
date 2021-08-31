function goToCart() {
    let email = getCookie("email");
    let password = getCookie("password");

    if (((email === "") && (password !== ""))
        || ((email !== "") && (password === ""))
        || ((email === "") && (password === ""))) {
        alert("Please login first");
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
                    window.location = "/static/customer/Cart.html";
                }
            }
        });
    }
}
