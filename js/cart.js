// Initialise le local Storage
let cart = JSON.parse(localStorage.getItem("panier"));
console.table(cart);

let cartItem = document.querySelector("#cart__items");

function getCart(article) {
    if (cart === null || cart == 0) {
  let imageCart = document.createElement("img");
  imageCart.src = article.imageUrl;
  imageCart.alt = article.altTxt;
    }
    
}
getCart();
