let article_url_id = window.location.search;

let urlParams = new URLSearchParams(article_url_id);
let productId = urlParams.get("id");

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

  let itemImg = item.querySelector(".item__img");
  let image = document.createElement("img");
  image.src = article.imageUrl;
  image.alt = article.altTxt;

  let productName = item.querySelector("#title");
  productName.textContent = article.name;

  let prodPrice = item.querySelector("#price");
  prodPrice.textContent = article.price;

  let prodDescription = item.querySelector("#description");
  prodDescription.textContent = article.description;


  // setColors(article.colors);

 
  itemImg.appendChild(image);
  


}

// choiceProd();

async function getProducts() {

  let id = new URL(window.location).searchParams.get("id");

  await fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      

      
        
        choiceProd(data);
        
      
    });
}

getProducts();
