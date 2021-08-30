document.addEventListener('DOMContentLoaded', () => { // No one is logged in now so the profile can not be shown
    if (email === "" || password === "") {
        document.querySelector('#default-page-options').style.display = 'block';
        document.querySelector('#loggedIn-page-options').style.display = 'none';
        alert("Please Login First")
        window.location = "/static/Login.html"; // redirect to login page
        console.log("No one is Logged In!");
    } else {
        $.ajax({
            url: "http://localhost:8080/valid_login",
            type: "POST",
            data: {"email": email, "password": password},
            success: function (response) {
                if (response === "1") {
                    $.ajax({
                        url: "http://localhost:8080/users/profile",
                        type: "POST",
                        data: {"email": email, "password": password},
                        success: function setProfileData(response) {
                            console.log(response);
                            document.querySelector('#id').innerHTML = response.id;
                            document.querySelector('#password').innerHTML = response.password;
                            document.querySelector('#lastName').innerHTML = response.lastName;
                            document.querySelector('#firstName').innerHTML = response.firstName
                            document.querySelector('#email').innerHTML = response.email;
                            document.querySelector('#address').innerHTML = response.address;
                            document.querySelector('#phoneNumber').innerHTML = response.phoneNumber;
                            document.querySelector('#registerDate').innerHTML = response.registerDate;
                            document.querySelector('#credit').innerHTML = response.credit;
                        }

                    })
                } else if (response === "0") { //the user information is wrong so the profile can not be shown -- is this situation possible?
                    alert("Please Login First");
                    window.location = "/static/Login.html";
                }
            }
        });
    }
});