const container = document.querySelector('#container');

insertProductList();

async function insertProductList() {
    const res = await fetch('/api-p');
    const products = await res.json();
    
    products.forEach(product => {
        const image = product.image;
        const title = product.title;
        const price = product.price;
      
        container.insertAdjacentHTML('beforeend',`
            <div id="prouduct-item">
                <div id="product-img">
                    <a href="${title}/"><img src="https://www.starbucksathome.com/kr/sites/default/files/2022-01/KR_kr_SBUX_PACK_Medium-Roast_220117_1%20%284%29.png"></a>
                </div>
                <div id="product-des">
                    <p id="product-des-title">${title}</p>
                    <p id="product-des-price">${price}원</p>
                </div>
            </div> 
        `)
    })
}
/* <a href="${title}/"><img src="${image}"></a> */