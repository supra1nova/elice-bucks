// navbar 로그인 부분
import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';
import * as Api from '/api.js';

const headerNavbar1 = document.querySelector('#headerNavbar');
const container = document.querySelector('#container');
const paginationList = document.querySelector('.pagination-list');

addAllElements();
insertCategoryList();
insertProductList();

// navbar 로그인 상태에 따른 로그인 메뉴 삽입
function addAllElements() {
  headerNavbar1.innerHTML = headerNavbar.render();
  headerNavbar.componentDidMount();
}

// 전체 상품의 데이터를 html에 삽입
async function insertProductList() {
  // 쿼리에서 현재 해당하는 페이지를 가져와서 pageId에 할당
  const pageId = new URLSearchParams(window.location.search).get('page')

  // 페이지네이션 - 각 페이지에 해당하는 url에 들어갔을 때 해당 글 10개만 보여줌
  const productList = await Api.get('/api/product/products', `?page=${pageId}&&perPage=12`);

  // 페이지네이션 목록
  const products = productList.posts;
  const totalPage = productList.totalPage;

  // forEach로 돌면서 상품 id, image, name, price를 각 자리에 할당
  products.forEach((product) => {
    const id = product._id;
    const image = product.image;
    const name = product.name;
    const price = product.price.toLocaleString();

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

  // 페이징 번호 목록
  for (let i = 1; i <= totalPage; i++) {
    paginationList.insertAdjacentHTML(
      'beforeend',
      `<li><a class="pagination-link" href="?page=${i}&&perPage=12">${i}</a></li>`
    );
  }

}
