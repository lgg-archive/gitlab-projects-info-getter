function showLoader() {
    document.getElementById("dark").classList.add("is-visible");
    document.getElementById("loader").classList.remove("invisible");

}

function hideLoader() {
    document.getElementById("dark").classList.remove("is-visible");
    document.getElementById("loader").classList.add("invisible");
}