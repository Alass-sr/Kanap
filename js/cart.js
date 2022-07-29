//Initilaisation Local Storage
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productLocalStorage);

const choiceBasket = document.querySelector("#cart__items");

function createCartElement(index, product) {
    let articleProduct = document.createElement("article");
    articleProduct.className = "cart__items";
    articleProduct.setAttribute(
      "data-id",
      productLocalStorage[index].choixId
    );
    articleProduct.setAttribute(
      "data-color",
      productLocalStorage[index].choixCouleur
    );
    choiceBasket.appendChild(articleProduct);
    console.log(articleProduct);

    // Insertion de la "DIV"

    let divProduct = document.createElement("div");
    divProduct.className = "cart__item__img";
    articleProduct.appendChild(divProduct);

    let imgProduct = document.createElement("img");
    imgProduct.src = product.imageUrl;
    imgProduct.alt = product.altTxt;
    divProduct.appendChild(imgProduct);
    console.log(imgProduct);

    let prodItemContent = document.createElement("div");
    prodItemContent.className = "cart__item__content";
    articleProduct.appendChild(prodItemContent);

    let prodItemContentDescript = document.createElement("div");
    prodItemContentDescript.className =
      "cart__item__content__description";
    prodItemContent.appendChild(prodItemContentDescript);

    let titleProd = document.createElement("h2");
    titleProd.className = "cart__item__content__description";
    titleProd.textContent = product.name;
    prodItemContentDescript.appendChild(titleProd);

    let colorProd = document.createElement("p");
    colorProd.textContent = productLocalStorage[index].choixCouleur;
    prodItemContentDescript.appendChild(colorProd);

    let priceProd = document.createElement("p");
    priceProd.textContent = product.price;
    prodItemContentDescript.appendChild(priceProd);

    let cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.className = "cart__item__content__settings";
    prodItemContent.appendChild(cartItemContentSettings);

    let cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.className =
      "cart__item__content__settings__quantity";
    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);

    let qtyProd = document.createElement("p");
    qtyProd.textContent = productLocalStorage[index].choiceQuantity;
    cartItemContentSettingsQuantity.appendChild(qtyProd);

    // Insertion quantity
    let productQuantity = document.createElement("input");
    productQuantity.className = "itemQuantity";
    productQuantity.value = productLocalStorage[index].choiceQuantity;
    productQuantity.setAttribute("type", "number");
    productQuantity.setAttribute("min", "1");
    productQuantity.setAttribute("max", "100");
    productQuantity.setAttribute("name", "itemQuantity");

    let cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.className =
      "cart__item__content__settings__delete";
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    let supprimeProd = document.createElement("p");
    supprimeProd.className = "deleteItem";
    cartItemContentSettingsDelete.appendChild(supprimeProd);
}


async function getCart() {
  // Vérification si panier vide
  if (productLocalStorage === null || productLocalStorage == 0) {
    alert("panier vide !");
  } else {
    for (let panierProduct in productLocalStorage) {
        
        let productId = productLocalStorage[panierProduct].choixId;
      await fetch("http://localhost:3000/api/products/" + productId)
        .then((response) => response.json())
        .then((data) => {
            createCartElement(panierProduct, data);
        });

    }
  }
}
getCart();

// function supprimeProd() {
//     let btn_supprime = document.querySelectorAll(".deleteItem");

//     for(let i = 0; i < btn_supprime.length; i++) {
//         btn_supprime[i].addEventListener("click",
//         alert('Yessssss'))
//     }
// }

// function getNbreProd() {
//   let elementTotal = document.getElementsByClassName("itemQuantity");
//   totalNbre = 0;

//   for (let product of elementTotal) {
//     totalNbre += product.choiceQuantity;
//   }
//   return totalNbre;
// }
