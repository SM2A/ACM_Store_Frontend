const email = getCookie("email");
const password = getCookie("password");
var isLoggedIn = false;

function logout(){
    if(isLoggedIn) {
        clearCookie();
        window.location = "/";
    }
    else {
        alert("You Are Not Logged In!")
        window.location = "/static/Login.html";
    }
}

document.addEventListener('DOMContentLoaded', () => { //wait until the html file is completely loaded to prevent errors
    if (email === "" || password === "") { // when no one is logged in, the header options are : 1-login 2-signup
        document.getElementById('default-page-options').style.display = 'block';
        document.getElementById('loggedIn-page-options').style.display = 'none';
        console.log("No one is logged in");
    } else { // when user is logged in, the options are: 1-profile 2-logout
        if (document.readyState !== 'loading') {
            $.ajax({
                url: "http://localhost:8080/valid_login",
                type: "POST",
                data: {"email": email, "password": password},
                async: false,
                success: function (response) {
                    if (response === "1") {
                        isLoggedIn = true;
                        $.ajax({
                            url: "http://localhost:8080/valid_admin",
                            type: "POST",
                            data: {"email": email, "password": password},
                            async: false,
                            success: function (res) {
                                if (res === "0") {
                                    document.getElementById('default-page-options').style.display = 'none';
                                    document.getElementById('loggedIn-page-options').style.display = 'block';
                                    document.getElementById('logout-link').previousElementSibling.innerHTML = "Profile";
                                    let url = new URL("http://localhost:3000/static/customer/Profile.html");
                                    document.getElementById('logout-link').previousElementSibling.setAttribute("href", url);
                                } else if (res === "1") {
                                    document.getElementById('default-page-options').style.display = 'none';
                                    document.getElementById('loggedIn-page-options').style.display = 'block';
                                    document.getElementById('logout-link').previousElementSibling.innerHTML = "Admin Page";
                                    let url = new URL("http://localhost:3000/static/admin/Admin.html");
                                    document.getElementById('logout-link').previousElementSibling.setAttribute("href", url);
                                }
                            }
                        });
                    } else if (response === "0") {
                        document.getElementById('default-page-options').style.display = 'block';
                        document.getElementById('loggedIn-page-options').style.display = 'none';
                    }
                }
            });
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    $.ajax({
        url: "http://localhost:8080/products/category",
        type: "GET",
        success: function (response) {
            console.log(response);
            for(let i = 0 ; i < response.length && i < 6 ; i++){
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.innerHTML = response[i];
                let url = new URL("http://localhost:3000/static/Products.html");
                url.searchParams.append("category", response[i]);
                a.setAttribute("href", url);
                li.appendChild(a);
                document.getElementById("navbar-lists").appendChild(li);
            }
        },
        error: function (response) {
            console.log(response.responseText);
            alert("Maybe You should Go To localhost:8080/test To Set Some Products First!\nThen Comeback to Homepage")
        }
    });
});


