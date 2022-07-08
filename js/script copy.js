
async function getProducts() {
  await fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      let sectionProduits = document.getElementById("items");
      for (i = 0; i < data.length; i++) {
        const detailProduits = `
            <a href="./product.html?id=${data[i]._id}">
                <article>
                  <img
                    src="${data[i].imageUrl}"
                    alt="${data[i].altTxt}"
                  />
                  <h3 class="productName">${data[i].name}</h3>
                  <p class="productDescription">
                    ${data[i].description}
                  </p>
                </article>
              </a>
              `;

        sectionProduits.innerHTML += detailProduits;
      }
    
    });
}

   getProducts();
