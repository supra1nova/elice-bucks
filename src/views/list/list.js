const container = document.querySelector('#container');

insertProductItem()

async function insertProductItem() {
    const res = await fetch('./data.json')
    const products = await res.json()
    
    products.forEach(product => {
        const image = product.image;
        const title = product.title;
        const des = product.des;
        const price = product.price;
      
        container.insertAdjacentHTML('beforeend',`
            <div class="prouduct-item">
                <div class="product-img">
                    <img src="${image}">
                </div>
                <div class="product-des">
                    <p class="product-des-title">${title}</p>
                    <p class="product-des-price">${price}</p>
                </div>
            </div> 
        `)
    })    
  }