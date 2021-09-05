function searchByName(name) {
    para = new URLSearchParams();
    para.append("name", name);
    link = "http://localhost:3000/static/Products.html?" + para.toString();
    window.location = link;
}