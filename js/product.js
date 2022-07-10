let article_url_id = window.location.search;

let url_Id = new URLSearchParams (article_url_id);  


function choiceProd(article) {
  let item = document.querySelector(".item");
  item.className = "item__img";

  let choiceArticle = item.querySelector("article");
  
  let itemImg = item.querySelector(".item__img");
  let image = document.createElement("img");
  image.className = "item__img"
  image.src = article.imageUrl;
  image.alt = article.altTxt;


  let choiceContent = item.querySelector(".item__content");

  let productName = item.querySelector("h1");
  productName.className = "item__content__titlePrice";
  productName.textContent = article.name;

  let prodPrice = item.querySelector("span");
  prodPrice.className = "item__content__titlePrice";
  prodPrice.textContent = article.price;

  let prodDescription = item.querySelector("p");
  prodDescription.className = "item__content__description";
  prodDescription.textContent = article.description;


  item.appendChild(choiceArticle);

  choiceArticle.appendChild(itemImg);
  itemImg.appendChild(image);
  choiceContent.appendChild(productName);
  choiceContent.appendChild(prodPrice);
  choiceContent.appendChild(prodDescription);



  return item;
}


// choiceProd();

async function getProducts() {

  let id = (new URL(window.location).searchParams.get("id"));

  await fetch("http://localhost:3000/api/products/"+ id)
    .then((response) => response.json())
    .then((data) => {
       choiceProd(data);

       let articleProd = document.getElementsByClassName("item");
      for (let article of data) {
        let item = choiceProd(article);
        articleProd.appendChild(item);
        
      }
       console.log(data);


    });
}

 getProducts();
