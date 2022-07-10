

function choiceProducts(oneProduct) {
  
  let item = document.querySelector(".item");


  let itemImg = item.querySelector(".item__img");
  let image = document.createElement("img");
  image.src = oneProduct.imageUrl;
  image.alt = oneProduct.altTxt;

  let productName = item.getElementById("title");
  productName.textContent = oneProduct.name;


  let price = item.getElementById("price");
  price.textContent = oneProduct.price;

  
  let description = document.createElement("p");

  item.querySelector(".item__content__settings");
  let color = document.querySelector(".item__content__settings__color");
  color.querySelector("color-select");
  let selectColor = document.createElement("select");

  itemImg.appendChild(image);
  item.appendChild(productName);
  item.appendChild(price);
  item.appendChild(description);

  return item;
}

async function getProducts() {


  await fetch("http://localhost:3000/api/products/"+ id)
    .then((response) => response.json())
    .then((data) => {
      choiceProducts(data);
       console.log(data);
    });
}

getProducts();
