function scrollElementIntoView(elementID) {
    let elem = document.getElementById(elementID);
    if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
    }
}