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
        $.ajax({
            url: "http://localhost:8080/valid_login",
            type: "POST",
            data: {"email": email, "password": password},
            success: function (response) {
                if (response === "1") {
                    isLoggedIn = true;
                    document.getElementById('default-page-options').style.display = 'none';
                    document.getElementById('loggedIn-page-options').style.display = 'block';
                    console.log("Someone is logged in");
                    //todo logout link
                }
                else if(response === "0"){
                    document.getElementById('default-page-options').style.display = 'block';
                    document.getElementById('loggedIn-page-options').style.display = 'none';
                }
            }
        });
    }
});