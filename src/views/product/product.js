// navbar 로그인 부분
const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();
async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}

// 전체 상품의 데이터를 html 요소에 삽입
const container = document.querySelector('#container');

insertProductList();

async function insertProductList() {
    const res = await fetch('/api/product');
    const products = await res.json();

    products.forEach(product => {
        const id = product._id;
        const image = product.image;
        const name = product.name;
        const price = product.price;
      
        container.insertAdjacentHTML('beforeend',`
            <div id="prouduct-item">
                <div id="product-img">
                    <a href='/detail/${id}'><img src="${image}"></a>
                </div>
                <div id="product-des">
                    <p id="product-des-name">${name}</p>
                    <p id="product-des-price">${price}원</p>
                </div>
            </div> 
        `)
    })
}