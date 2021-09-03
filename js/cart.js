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

function haveAccess(id) {
    let email = getCookie("email");
    let password = getCookie("password");
    permission = false;
    $.ajax({
        url: "http://localhost:8080/carts",
        type: "POST",
        data: {"email": email, "password": password},
        async: false,
        success: function (carts) {
            cart = JSON.parse(carts)
            for (let j = 0; j < cart.length; j++) {
                if (cart[j].id == id) permission = true;
            }
        },
        error: function (response) {
            //todo response message
            alert(response)
        }
    });
    return permission;
}

function purchase() {
    let email = getCookie("email");
    let password = getCookie("password");
    $.ajax({
        url: "http://localhost:8080/purchase",
        type: "POST",
        data: {"email": email, "password": password},
        success: function (response) {
            alert(response);
            window.location = "/";
        },
        error: function (response) {
            //todo response message
            alert(response)
        }
    });
}

function addItem(id) {
    let email = getCookie("email");
    let password = getCookie("password");
    $.ajax({
        url: "http://localhost:8080/carts/items/add",
        type: "POST",
        data: {"email": email, "password": password, "productId": id},
        success: function () {
            location.reload();
        },
        error: function (response) {
            //todo response message
            alert(response)
        }
    });
}

function removeItem(id) {
    let email = getCookie("email");
    let password = getCookie("password");
    $.ajax({
        url: "http://localhost:8080/carts/items/subtract",
        type: "POST",
        data: {"email": email, "password": password, "productId": id},
        success: function () {
            location.reload();
        },
        error: function (response) {
            //todo response message
            alert(response)
        }
    });
}

function deleteItem(id) {
    let email = getCookie("email");
    let password = getCookie("password");
    $.ajax({
        url: "http://localhost:8080/carts/items/delete",
        type: "POST",
        data: {"email": email, "password": password, "productId": id},
        success: function () {
            location.reload();
        },
        error: function (response) {
            //todo response message
            alert(response)
        }
    });
}
