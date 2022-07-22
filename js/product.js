let article_url_id = window.location.search;

let urlParams = new URLSearchParams(article_url_id);
let productId = urlParams.get("id");

// Insertion des options de couleurs
function setColors(colors) {
  for (let color of colors) {
    let select = document.getElementById("colors");
    let option = document.createElement("option");

    option.value = color;
    option.textContent = color;
    select.appendChild(option);
  }
}

function choiceProd(article) {
  let item = document.querySelector(".item");

  // Insertion des images
  let itemImg = item.querySelector(".item__img");
  let image = document.createElement("img");
  image.src = article.imageUrl;
  image.alt = article.altTxt;

  // Modification Titre
  let productName = item.querySelector("#title");
  productName.textContent = article.name;

  // Modification Price
  let prodPrice = item.querySelector("#price");
  prodPrice.textContent = article.price;

  // Modification Description
  let prodDescription = item.querySelector("#description");
  prodDescription.textContent = article.description;

  setColors(article.colors);

  itemImg.appendChild(image);
}

// choiceProd();

async function getProducts() {
  let id = new URL(window.location).searchParams.get("id");

  await fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);

      choiceProd(data);
    });
}

getProducts();

const qty = document.querySelector("#quantity");

const color = document.querySelector("#colors");

// Gestion du panier
function addToCart() {
  const addToCartBtn = document.querySelector("#addToCart");

  // Ecoute l'évenement
  addToCartBtn.addEventListener("click", (event) => {
    if (qty.value > 0 && qty.value <= 100 && qty.value != 0) {
      // Récupération choix de couleur et quantité
      let choiceColor = color.value;
      // alert('Yessssss !');

      let choiceQuantity = qty.value;
      // alert('Yoooooooo !');

      // Récupération des options d'article à ajouter
      let choiceArticle = {
        choixId: productId,
        choixCouleur: choiceColor,
        choiceQty: parseInt(choiceQuantity),
      };

      // Récup le local storage
      let cart = JSON.parse(localStorage.getItem("panier"));

      // Vérification
      if (cart == null) {
        cart = [];
      }
      // Recherche ligne ayant meme Id meme Color
      const productFind = cart.find(
        (el) => el.choixId === productId && el.choixCouleur === choiceColor
      );

      if (productFind) {
        // Si le produit est trouver on ajout le produit
        productFind.choiceQty += parseInt(choiceQuantity);

        // On ajout au panier et on le converti
        localStorage.setItem("panier", JSON.stringify(cart));
      } else {
        cart.push(choiceArticle);
        localStorage.setItem("panier", JSON.stringify(cart));
      }
    }
  });
}
// addToCart();

// function getBasket() {
//   return localStorage.getItem("product");
// }

//   const quantity = document.querySelector("#quantity");
//   quantity.addEventListener("change", (event) => {
//     let element = event.target;

//     alert(element.value);

//  });

//   const qtyChoice = quantity.addEventListener("click", (event) => {

//   //  alert("click !");
//  });
//////////////////////////////////////////////////////////////////////
// const qty = document.querySelector("#quantity");
// const color = document.querySelector("#colors");

// function addToCart(article) {
//   const addToCartBtn = document.querySelector("#addToCart");

//   // Ecouter quantity
//   addToCartBtn.addEventListener("click", (event) => {
//     if (qty.value > 0 && qty.value <= 100 && qty.value != 0) {
//       // alert(qty.value);

//       //Récupération des couleurs
//       let colorChoice = color.value;

//       //Récupération de la quantité
//       let qtyChoice = qty.value;

//       // Récupération liste produit
//       let choiceArticle = {
//         choixId: productId,
//         choixCouleur: colorChoice,
//         choiceQty: int(qtyChoice),
//       };

//     }
//   });
// }
// console.log(addToCart);

/////////////////////////////////////////////////////////////////////////
