const token =
localStorage.getItem("token");

if(!token){

    window.location.replace(
        "loginForm.html"
    );

}
else{

    document.getElementById(
        "pageContent"
    ).style.display = "block";

}

document.getElementById("authBtn")
.addEventListener("click", function(){

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "role"
    );

    window.location.replace(
        "loginForm.html"
    );

});