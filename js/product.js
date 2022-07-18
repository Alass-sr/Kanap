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

// const addToCartBtn = document.querySelector("#addToCart");
// addToCartBtn.addEventListener("click", (event)=>{
//    alert("Hola !");
// });

//   const quantity = document.querySelector("#quantity");
//   quantity.addEventListener("change", (event) => {
//     let element = event.target;

//     alert(element.value);

//  });

//   const qtyChoice = quantity.addEventListener("click", (event) => {

//   //  alert("click !");
//  });

const qty = document.querySelector("#quantity");
const color = document.querySelector("#colors");

function addToCart(article) {
  const addToCartBtn = document.querySelector("#addToCart");


  // Ecouter quantity
  addToCartBtn.addEventListener("click", (event) => {
    if (qty.value > 0 && qty.value <= 100 && qty.value != 0) {
      // alert(qty.value);

      //Récupération des couleurs
      let colorChoice = color.value;


      //Récupération de la quantité
      let qtyChoice = qty.value;


      // Récupération liste produit
      let choiceArticle = {
        choixId: productId,
        choixCouleur: colorChoice,
        choiceQty: int(qtyChoice),
      };
    }
  });
}
addToCart();

