const container = document.querySelector('#container');

insertProductItem();

async function insertProductItem() {
    const res = await fetch('./list.json');
    const products = await res.json();
    
    products.forEach(product => {
        const image = product.image;
        const title = product.title;
        const price = product.price;
      
        container.insertAdjacentHTML('beforeend',`
            <div id="prouduct-item">
                <div id="product-img">
                    <a href="${title}/"><img src="${image}"></a>
                </div>
                <div id="product-des">
                    <p id="product-des-title">${title}</p>
                    <p id="product-des-price">${price}원</p>
                </div>
            </div> 
        `)
    })    
}