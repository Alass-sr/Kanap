function confirmation(){
    const idConfirm = document.getElementById("orderId");
    idConfirm.textContent = localStorage.getItem("order");
    console.log(localStorage.getItem("order"));
    // console.log(localStorage.getItem());
    // localStorage.clear();
   
    console.log('coucou');
}
confirmation()