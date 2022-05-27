// navbar 로그인 부분
import headerNavbar from '../components/headerNavbar.js';
const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();
async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}

// 각 카테고리별 상품 데이터를 html요소에 삽입
const container = document.querySelector('#container');

insertProductCategory();

async function insertProductCategory() {
    const id = location.pathname.replace(/\/category\/([\d\w]*)\/?/g, '$1');
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