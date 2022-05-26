const container = document.querySelector('#container');

insertProductCategory();

async function insertProductCategory() {
    const res = await fetch(`/api/category/${category}`);
    const products = await res.json();
    
    products.forEach(product => {
        const image = product.image;
        const name = product.name;
        const price = product.price;
      
        container.insertAdjacentHTML('beforeend',`
            <div id="prouduct-item">
                <div id="product-img">
                    <a href="${name}/"><img src="https://www.starbucksathome.com/kr/sites/default/files/2022-01/KR_kr_SBUX_PACK_Medium-Roast_220117_1%20%284%29.png"></a>
                </div>
                <div id="product-des">
                    <p id="product-des-name">${name}</p>
                    <p id="product-des-price">${price}원</p>
                </div>
            </div> 
        `)
    })
}