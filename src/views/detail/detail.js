const container = document.querySelector('#container');

insertProductDetail();

async function insertProductDetail() {
    const id = location.pathname.replace(/\/detail\/([\d\w]*)\/?/g, '$1');
    const res = await fetch(`/api/product/${id}`);
    const product = await res.json();

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
