const container = document.querySelector('#container');

insertProductDetail();

async function insertProductDetail() {
    const res = await fetch(`/api-p/product/${title}`);
    const product = await res.json();
    console.log(product);

    const name = product.name;
    const description = product.description;
    const price = product.price;
    const image = product.image;

    container.insertAdjacentHTML('beforeend',`
        <div id="text">
            <p id="name">${name}</p>
            <p id="description">${description}</p>
            <p id="price">${price}원</p>
        </div>
        <div id="image">
            <img src="${image}">
        </div>
    `)

}