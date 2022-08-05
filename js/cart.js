//Initilaisation Local Storage
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productLocalStorage);

const choiceBasket = document.querySelector("#cart__items");

function createCartElement(index, product) {
  let articleProduct = document.createElement("article");
  articleProduct.className = "cart__items";
  articleProduct.setAttribute("data-id", productLocalStorage[index].choixId);
  articleProduct.setAttribute(
    "data-color",
    productLocalStorage[index].choixCouleur
  );
  choiceBasket.appendChild(articleProduct);
  // console.log(articleProduct);

  // Insertion de la "DIV"

  let divProduct = document.createElement("div");
  divProduct.className = "cart__item__img";
  articleProduct.appendChild(divProduct);

  let imgProduct = document.createElement("img");
  imgProduct.src = product.imageUrl;
  imgProduct.alt = product.altTxt;
  divProduct.appendChild(imgProduct);

  let prodItemContent = document.createElement("div");
  prodItemContent.className = "cart__item__content";
  articleProduct.appendChild(prodItemContent);

  let prodItemContentDescript = document.createElement("div");
  prodItemContentDescript.className = "cart__item__content__description";
  prodItemContent.appendChild(prodItemContentDescript);

  let titleProd = document.createElement("h2");
  titleProd.className = "cart__item__content__description";
  titleProd.textContent = product.name;
  prodItemContentDescript.appendChild(titleProd);

  let colorProd = document.createElement("p");
  colorProd.textContent = productLocalStorage[index].choixCouleur;
  colorProd.className = "cart__item__content__description";
  prodItemContentDescript.appendChild(colorProd);

  let priceProd = document.createElement("p");
  priceProd.className = "cart__item__content__description";
  priceProd.textContent = product.price + "€";
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
  document.querySelectorAll(".itemQuantity").forEach(productQuantity => {
    productQuantity.addEventListener("change", (e) => {
      productLocalStorage.choiceQty({
      })
      console.log(choiceQty)
    })
  })
  

  let cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.className =
    "cart__item__content__settings__delete";
  cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

  let supprimeProd = document.createElement("p");
  supprimeProd.className = "deleteItem";
  cartItemContentSettingsDelete.appendChild(supprimeProd);
  supprimeProd.textContent = "Supprimer";
  supprimeProd.addEventListener("click", (e) => {
    e.preventDefault;

    // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
    let supprimeId = productLocalStorage[index].choixId;
    let supprimeColor = productLocalStorage[index].choixCouleur;
    
    // filter l'element à supprimer
    productLocalStorage = productLocalStorage.filter( elt => elt.choixId !== supprimeId || elt.choixCouleur !== supprimeColor);


    // Envoi les données dans le localstorage
    localStorage.setItem('panier', JSON.stringify(productLocalStorage));

    // Alert de la suppression de l'article
    alert('Votre article a bien été supprimé.');

    if (productLocalStorage.length === 0) {
      localStorage.clear();
  }

  location.reload();

  });
  // console.log(supprimeProd)
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

// Formulaire

//Instauration formulaire avec regex
function getForm() {
  let cartOrderForm = document.querySelector(".cart__order__form");

  //Création des expressions régulières
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Ecoute des "event"
  cartOrderForm.firstName.addEventListener("input", function () {
    validFirstName(this);
  });

  cartOrderForm.lastName.addEventListener("input", function () {
    validLastName(this);
  });

  cartOrderForm.address.addEventListener("input", function () {
    validAddress(this);
  });

  cartOrderForm.city.addEventListener("input", function () {
    validCity(this);
  });

  cartOrderForm.email.addEventListener("input", function () {
    validEmail(this);
  });

  // Validation
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (charRegExp.test(inputFirstName.value)) {
      firstNameErrorMsg.innerText = "";
    } else {
      firstNameErrorMsg.innerText = "Veuillez renseigner ce champ.";
    }
  };

  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (charRegExp.test(inputLastName.value)) {
      lastNameErrorMsg.innerText = "";
    } else {
      lastNameErrorMsg.innerText = "Veuillez renseigner ce champ.";
    }
  };

  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (addressRegExp.test(inputAddress.value)) {
      addressErrorMsg.innerText = "";
    } else {
      addressErrorMsg.innerText = "Veuillez renseigner ce champ.";
    }
  };

  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (charRegExp.test(inputCity.value)) {
      cityErrorMsg.innerText = "";
    } else {
      cityErrorMsg.innerText = "Veuillez renseigner ce champ.";
    }
  };

  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegExp.test(inputEmail.value)) {
      emailErrorMsg.innerText = "";
    } else {
      emailErrorMsg.innerText = "Veuillez renseigner votre email.";
    }
    console.log(emailErrorMsg);
  };

}
getForm();

// envoi des informations au local storage
function postForm() {
  const btnCommander = document.getElementById("order");

  // Ecouter les "event"
  btnCommander.addEventListener("click", (e) => {

    //Récupération des données du formulaire client
    let inputFirstName = document.getElementById("firstName");
    let inputLastName = document.getElementById("lastName");
    let inputAddress = document.getElementById("address");
    let inputCity = document.getElementById("city");
    let inputEmail = document.getElementById("email");

    //Création d'un tableau depuis le local storage
    let idProd = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      idProd.push(productLocalStorage[i].idProd);
    }
    // console.log(idProd);

    // Envoi des éléments dans le local storage
    localStorage.setItem("prenom", document.getElementById("firstName").value);
    localStorage.setItem("nom", document.getElementById("lastName").value);
    localStorage.setItem("adresse", document.getElementById("address").value);
    localStorage.setItem("ville", document.getElementById("city").value);
    localStorage.setItem("mail", document.getElementById("city").value);
  });

  
}
postForm();

//////////////////////////////////////////////////////////////
// const firstName = document.getElementById("firstName");
// const lastName = document.getElementById("lastName");
// const address = document.getElementById("address");
// const city = document.getElementById("city");
// const email = document.getElementById("email");

// const emailErrorMsg = document.getElementById("emailErrorMsg");
// function mailValidate() {
//     const mailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

//     if(mailRegex.test(email) == false) {
//         return false;
//     } else {
//         emailErrorMsg.textContent = null;
//         return true;
//     }
// }
// console.log(emailErrorMsg);

// const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
// function prenomValidate() {
//     const prenomRegex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
//     if(prenomRegex.test(prenom) == false) {
//         return false;
//     } else {
//         firstNameErrorMsg.textContent = null;
//         return true;
//     }
// }

// const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
// function nomValidate() {
//     const nomRegex = /^[a-z][a-z '-.,]{1,31}$|^$/i;
//     if(nomRegex.test(nom) == false) {
//         return false;
//     } else {
//         lastNameErrorMsg.textContent = null;
//         return true;
//     }
// }

// const addressErrorMsg = document.getElementById("addressErrorMsg");
// function adresseValidate() {
//     const adresseRegex = /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)/;
//     if(adresseRegex.test(adresse) == false) {
//         return false;
//     } else {
//         addressErrorMsg.textContent = null;
//         return true;
//     }
// }

// const cityErrorMsg = document.getElementById("cityErrorMsg");
// function VilleValidate() {
//     const villeRegex = /^[a-zA-Z ,.'-]+$/;
//     if(villeRegex.test(ville) == false) {
//         return false;
//     } else {
//         cityErrorMsg.textContent = null;
//         return true;
//     }
// }

/////////////////////////////////////////////////////////////////////////////////////

// Instauration formulaire

// function getForm() {
//     let cartOrderForm = document.querySelector(".cart__order__form");

//     let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
//     let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
//     console.log(charRegExp);
//     let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

//     // Ecoute de la modification du prénom
//     cartOrderForm.firstName.addEventListener('change', function() {
//         validFirstName(this);
//     });

//     cartOrderForm.lastName.addEventListener('change', function() {
//         validLastName(this);
//     });

//     cartOrderForm.address.addEventListener('change', function() {
//         validAddress(this);
//     });

//     cartOrderForm.city.addEventListener('change', function() {
//         validCity(this);
//     });
// }
// console.log(getForm);
// getForm()

//////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////

//Envoi des informations client au localstorage

// function postForm() {

//     let btnCommand = document.getElementById("order");

//     //Ecouter le panier
//     btnCommand.addEventListener("click", (event) =>{

//
