setCooike(name,"");
setCooike(password, "");


var slideIndex = 1;


function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    let slideNo = slideIndex - 1;
    slides[slideNo].style.display = "block";
    dots[slideNo].className += " active";

}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}


document.addEventListener('DOMContentLoaded', () => {
    $.ajax({
        url: "http://localhost:8080/",
        type: "GET",
        success: function (response) {
            console.log(response);

        },
        error: function (error) {
            console.log(error);
        }
    })

    showSlides(slideIndex);

    $.ajax({
        url: "http://localhost:8080/",
        type: "GET",
        success: function (response) {
            console.log(response);
            for(let j=0 ; j < response.length ; j++){
                let line = document.createElement('hr');
                document.getElementById("product-summary").appendChild(line);
                let flexContainerDiv = document.createElement('div');
                let category = document.createElement('h2');
                category.id = "category";
                category.className = "top-div";
                category.innerHTML = response[j][0].category;
                document.getElementById("product-summary").appendChild(category);
                let moreDiv = document.createElement('p');
                moreDiv.id = "more";
                moreDiv.className = "top-div";
                moreDiv.innerHTML = "More " + response[j][0].category + " &#10095";
                document.getElementById("product-summary").appendChild(moreDiv);
                for (let i = 0; i < response[j].length; i++) {
                    flexContainerDiv.id = "flex-container";
                    let div = document.createElement('div');
                    let divTitle = document.createElement('div');
                    let divPrice = document.createElement('div');
                    let img = document.createElement('img');
                    divTitle.className = "title";
                    divPrice.className = "price";
                    img.id = "product-img";
                    divTitle.innerHTML = response[j][i].title;
                    divPrice.innerHTML = "$" + response[j][i].price;
                    img.src = response[j][i].imgAddress;
                    div.className = "product";
                    div.appendChild(img);
                    div.appendChild(divTitle);
                    div.appendChild(divPrice);
                    let url = new URL("http://localhost:3000/static/Product.html");
                    url.searchParams.append("id", response[j][i].id);
                    let value = "window.location=" + "'" + url + "'";
                    div.setAttribute("onclick", value);
                    flexContainerDiv.appendChild(div);
                }
                document.getElementById("product-summary").appendChild(flexContainerDiv);
                // if(j !== (response.length-1)) {
                //     let line = document.createElement('hr');
                //     document.getElementById("product-summary").appendChild(line);
                // }
            }
        },
        error: function (response) {
            //todo response message
            console.log(response);
            alert("Maybe You should Go To localhost:8080/test To Set Some Products First!\nThen Comeback to Homepage")
        }
    });


});


