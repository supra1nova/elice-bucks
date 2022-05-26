const container = document.querySelector('#container');

insertProductCategory();

async function insertProductCategory() {
    //const id = location.pathname.replace(정규표현식);
    const res = await fetch(`/api/category/${id}`);
    const products = await res.json();
    
    products.forEach(product => {
        const image = product.image;
        const name = product.name;
        const price = product.price;
      
        container.insertAdjacentHTML('beforeend',`
            <div id="prouduct-item">
                <div id="product-img">
                    <a href="${id}/"><img src="${image}"></a>
                </div>
                <div id="product-des">
                    <p id="product-des-name">${name}</p>
                    <p id="product-des-price">${price}원</p>
                </div>
            </div> 
        `)
    })
}