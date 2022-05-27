// navbar 로그인 부분
import headerNavbar from '../components/headerNavbar.js';
const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();
async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}

// 전체 상품의 데이터를 html에 삽입

const container = document.querySelector('#container');

insertProductList();

async function insertProductList() {
  // '/api/product' 에서 전체 상품 목록을 json으로 받아옴
  const res = await fetch('/api/product');
  const products = await res.json();

  // forEach로 돌면서 상품 id, image, name, price를 각 자리에 할당
  products.forEach((product) => {
    const id = product._id;
    const image = product.image;
    const name = product.name;
    const price = product.price;

    container.insertAdjacentHTML(
      'beforeend',
      `
            <div id="prouduct-item">
                <div id="product-img">
                    <a href='/detail/${id}'><img src="${image}"></a>
                </div>
                <div id="product-des">
                    <p id="product-des-name">${name}</p>
                    <p id="product-des-price">${price}원</p>
                </div>
            </div> 
        `
    );
  });
}
