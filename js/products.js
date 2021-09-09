document.addEventListener('DOMContentLoaded', () => {
    para = new URLSearchParams(window.location.search);
    productCategory = para.get("category");
    productName = para.get("name");
    link = "http://localhost:8080/products";
    method = undefined;
    body = {};
    path = "Home &nbsp &#10095 &nbsp Products";
    if(!productCategory && !productName){
        method = "GET";
    }
    else if(productCategory && !productName){
        link += "/search/category";
        method = "POST";
        body = {"category": productCategory};
        path +=  " &nbsp &#10095 &nbsp" + productCategory;
    }
    else if(!productCategory && productName){
        link += "/search/name";
        method = "POST";
        body = {"name": productName};
        path +=  " &nbsp &#10095 &nbsp" + productName;
    }

    $.ajax({
        url: link,
        type: method,
        data: body,
        async: false,
        crossDomain: true,
        success: function (response) {
            document.getElementById("path").innerHTML = path;
            for (let i = 0; i < response.length; i++) {
                let div = document.createElement('div');
                let divTitle = document.createElement('div');
                let divPrice = document.createElement('div');
                let img = document.createElement('img');
                divTitle.className = "title";
                divPrice.className = "price";
                divTitle.innerHTML = response[i].title;
                divPrice.innerHTML = "$" + response[i].price;
                img.src = response[i].imgAddress;
                div.className = "product";
                div.appendChild(img);
                div.appendChild(divTitle);
                div.appendChild(divPrice);
                let url = new URL("http://localhost:3000/static/Product.html");
                url.searchParams.append("id", response[i].id);
                let value = "window.location=" + "'" + url + "'";
                div.setAttribute("onclick", value);
                document.getElementById("flex-container").appendChild(div);
            }
        },
        error: function (response) {
            alert(response.responseText);
        }
    });
});