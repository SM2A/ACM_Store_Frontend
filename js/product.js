para = new URLSearchParams(window.location.search);
id = para.get("id");
quantityAvailable = undefined;
comments = undefined;

document.addEventListener('DOMContentLoaded', () => {
    $.ajax({
        url: "http://localhost:8080/comments/" + id,
        type: "GET",
        async: false,
        success: function (response) {
            comments = JSON.parse(response);
            table = document.getElementById('comments');
            for (let i = 0; i < comments.length; i++) {
                commentId = comments[i].id;
                row = table.insertRow();
                cell = row.insertCell();
                cell.innerHTML = "<strong style='font-size: 20px'>" + comments[i].user + "</strong>" + ": <br>"
                    + comments[i].text;
                cell = row.insertCell();
                cell.innerHTML = "<div style='font-size: 10px; text-align: right; display: flex; margin-left: 3em'> <div style='display: inline-block; float: left'>" +
                    "<img class="+ commentId + " onclick='like(this.className)' width='25' height='25' src='/img/thumbs-up.png' >" +
                    comments[i].likes + " &nbsp &nbsp" + "</div> <div style='display: inline-block; float: left'><img class=" +
                    commentId + " onclick='dislike(this.className)' width='25' height='25' src='/img/thumbs-down.png'>" + comments[i].dislikes + "</div> </div>";
            }
        },
        error: function (response) {
            alert(response.responseText)
        }
    });

    $.ajax({
        url: "http://localhost:8080/products/" + id,
        type: "GET",
        async: false,
        success: function (response) {
            quantityAvailable = response.quantityAvailable;
            document.getElementById('title').innerHTML = response.title;
            document.getElementById('price').innerHTML = '$' + response.price;
            document.getElementById('rating').innerHTML = "Rating: " + response.rating.toFixed(2);
            document.getElementById('description').innerHTML = response.description;
            document.getElementById('image').src = response.imgAddress;
            document.getElementById('total-rating').innerHTML = "Rating: " + response.rating.toFixed(2) + "<br>Based on " + comments.length + " reviews";
        },
        error: function (response) {
            alert(response.responseText)
        }
    });

    if (((email === "") && (password !== ""))
        || ((email !== "") && (password === ""))
        || ((email === "") && (password === ""))) {
        clearCookie();
        document.getElementById('add-to-cart').style.display = "inline-block";
        document.getElementById('show-quantity').style.display = "none";
        document.getElementById('description-title').style.marginTop = "8.8em";
    }else {
        $.ajax({
            url: "http://localhost:8080/valid_login",
            type: "POST",
            data: {"email": email, "password": password},
            async: false,
            success: function (response) {
                if (response == "0") {
                    document.getElementById('add-to-cart').style.display = "inline-block";
                    document.getElementById('show-quantity').style.display = "none";
                    document.getElementById('description-title').style.marginTop = "8.8em";
                }
                else if(response == "1") {
                    update();
                }
            },
            error: function (response) {
                alert(response.responseText)
            }
        });
    }
});


function update() {
    $.ajax({
        url: "http://localhost:8080/carts",
        type: "POST",
        data: {"email": email, "password": password},
        async: false,
        success: function (carts) {
            quantity = 0;
            openCart = JSON.parse(carts);
            for (let j = 0; j < openCart.length; j++) {
                if (openCart[j].status == "OPEN") {
                    get_url = "http://localhost:8080/carts/" + openCart[j].id;
                    $.ajax({
                        url: get_url,
                        type: "GET",
                        success: function (response) {
                            items = JSON.parse(response);
                            for (let i = 0; i < items.length; i++) {
                                if (items[i].id == id) {
                                    quantity = items[i].quantity;
                                }
                            }
                            if (quantity < 1) {
                                document.getElementById('add-to-cart').style.display = "inline-block";
                                document.getElementById('show-quantity').style.display = "none";
                                document.getElementById('description-title').style.marginTop = "8.8em";
                            }
                            else {
                                document.getElementById('add-to-cart').style.display = "none";
                                document.getElementById('show-quantity').style.display = "block";
                                document.getElementById('description-title').style.marginTop = "5.5em";
                                document.getElementById('quantity').innerHTML = "&nbsp " + quantity + " &nbsp";
                            }

                        },
                        error: function (response) {
                            alert(response.responseText)
                        }
                    });
                }
            }
        },
        error: function (response) {
            alert(response.responseText)
        }
    });
}


function checkState(){
    loggedIn = true;
    if (((email === "") && (password !== ""))
        || ((email !== "") && (password === ""))
        || ((email === "") && (password === ""))) {
        clearCookie();
        loggedIn = false;
    } else {
        $.ajax({
            url: "http://localhost:8080/valid_login",
            type: "POST",
            data: {"email": email, "password": password},
            async: false,
            success: function (response) {
                if (response == "0") {
                    loggedIn = false;
                }
            },
            error: function (response) {
                alert(response.responseText)
            }
        });
    }
    return loggedIn;
}


function addToCart(){
    if(checkState()) {
        $.ajax({
            url: "http://localhost:8080/carts/items/add",
            type: "POST",
            data: {"email": email, "password": password, "productId": id},
            success: function (response) {
                update();
                document.location.reload();
            },
            error: function (response) {
                alert(response.responseText)
            }
        });
    }else{
        alert("Please login first");
        window.location = "/static/Login.html";
    }
}


function increase(){
    $.ajax({
        url: "http://localhost:8080/carts/items/add",
        type: "POST",
        data: {"email": email, "password": password,"productId": id},
        success: function (response) {
            update()
            document.location.reload();
        },
        error: function (response) {
            alert(response.responseText)
        }
    });
}


function decrease(){
    $.ajax({
        url: "http://localhost:8080/carts/items/subtract",
        type: "POST",
        data: {"email": email, "password": password,"productId": id},
        success: function (response) {
            update();
            document.location.reload();
        },
        error: function (response) {
            alert(response.responseText)
        }
    });
}

function like(commentId){
    if(checkState()) {
        $.ajax({
            url: "http://localhost:8080/comments/" + commentId + "/like",
            type: "POST",
            data: {"id": commentId},
            success: function (response) {
                alert(response)
                document.location.reload();
            },
            error: function (response) {
                alert(response.responseText)
            }
        });
    }else{
        alert("Please login first");
        window.location = "/static/Login.html";
    }
}


function dislike(commentId){
    if(checkState()) {
        $.ajax({
            url: "http://localhost:8080/comments/" + commentId + "/dislike",
            type: "POST",
            data: {"id": commentId},
            success: function (response) {
                alert(response)
                document.location.reload();
            },
            error: function (response) {
                alert(response.responseText)
            }
        });
    }else{
        alert("Please login first");
        window.location = "/static/Login.html";
    }
}

