const chClick = document.querySelector(".checkClick");
const passw = document.querySelector("#password");

chClick.addEventListener('click',function(){
    const qwe = passw.getAttribute("type")=='password'?'text':'password';
    //alert(qwe);
    passw.setAttribute("type",qwe);
});