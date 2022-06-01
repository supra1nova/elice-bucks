// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import headerNavbar from '../components/headerNavbar.js';
import leftMenu from '../components/leftMenu.js';
import insertCategoryList from '../components/navCategoryList.js';
import productlist from './productslist.js';
import ProductEdit from './productEdit.js';
import categorylist from './categorylist.js';
import productCreate from './productCreate.js';

const leftMenuAdmin = document.querySelector('#leftMenuAdmin');
const headerNavbar1 = document.querySelector('#headerNavbar');
const mainContent = document.querySelector('#mainContent');
const dashboard_content = document.querySelector('#dashboard-content');

addAllElements();
insertCategoryList();

async function addAllElements() {
  const datas = await getProducts();
  const categoriesdatas = await getCategories();
  dashboard_content.innerHTML = categorylist.render(categoriesdatas);
  dashboard_content.innerHTML += productlist.render(datas.posts);
  headerNavbar1.innerHTML = headerNavbar.render();
  leftMenuAdmin.innerHTML = leftMenu.render({
    selected: 'products',
  });
  headerNavbar.componentDidMount();
  //페이지네이션
  const totalPage = datas.totalPage;
  for (let i = 1; i <= totalPage; i++) {
    document
      .querySelector('.pagination-list')
      .insertAdjacentHTML(
        'beforeend',
        `<li><a class="pagination-link" href="?page=${i}&&perPage=10">${i}</a></li>`
      );
  }
  //제품생성
  document
    .getElementById('create-product-button')
    .addEventListener('click', async () => {
      //const result = await createProduct(categoriesdatas[0]);
      //console.log(result);
      //window.location.href = `/adminProducts`;
      const data = {
        name: `수정해주세요${Date.now()}`,
        price: 0,
        image: '수정해주세요',
        category: {
          _id: `${categoriesdatas[0]._id}`,
          name: `${categoriesdatas[0].name}`,
        },
        description: '수정해주세요',
      };
      dashboard_content.innerHTML = productCreate.render(data, categoriesdatas);
      await productCreate.componentDidMount(data.category);
      const cancleButton = document.getElementById('cancleButton');
      cancleButton.addEventListener('click', async () => {
        window.location.href = `/adminProducts`;
      });
    });

  //제품 수정
  const productEditButtons = document.getElementsByClassName(
    'product-edit-button'
  );
  Array.from(productEditButtons).forEach((button) => {
    button.addEventListener('click', async () => {
      const result = await getProduct(button.id);
      console.log(result);
      dashboard_content.innerHTML = ProductEdit.render(result, categoriesdatas);
      await ProductEdit.componentDidMount(result._id, result.category);
      const cancleButton = document.getElementById('cancleButton');
      cancleButton.addEventListener('click', async () => {
        //addAllElements();
        window.location.href = `/adminProducts`;
      });
    });
  });
  //제품 수정 취소

  //제품 삭제
  const productDelButtons = document.getElementsByClassName(
    'product-delete-button'
  );
  Array.from(productDelButtons).forEach((button) => {
    button.addEventListener('click', async () => {
      if (confirm('정말로 지우시겠습니까?')) {
        const result = await removeProduct(button.id);
        console.log(result);
        window.location.href = `/adminProducts`;
      }
    });
  });
  //카테고리생성
  document
    .getElementById('create-category-button')
    .addEventListener('click', async () => {
      const result = await createCategory();
      console.log(result);
      window.location.href = `/adminProducts`;
    });

  //카테고리 수정
  const trs = document.getElementsByClassName('categoryTr');
  const categoryEditButtons = document.getElementsByClassName(
    'category-edit-button'
  );
  Array.from(categoryEditButtons).forEach((button) => {
    button.addEventListener('click', async () => {
      const nameInput = document.querySelector(`#nameInput${button.id}`);
      const name = nameInput.value;
      console.log(name);
      try {
        const data = {
          name,
        };
        await Api.patch('/api/category', `${button.id}`, data);
        alert(`정상적으로 수정되었습니다.`);
        // 홈 페이지 이동
        window.location.href = '/adminProducts/';
      } catch (err) {
        console.error(err.stack);
        alert(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
      }
    });
  });
  const categoryDelButtons = document.getElementsByClassName(
    'category-delete-button'
  );
  //카테고리 삭제
  Array.from(categoryDelButtons).forEach((button) => {
    button.addEventListener('click', async () => {
      if (confirm('정말로 지우시겠습니까?')) {
        const result = await removeCategory(button.id);
        console.log(result);
        window.location.href = `/adminProducts`;
      }
    });
  });
}

async function getProducts() {
  // 제품가져오기 api 요청
  const pageId = new URLSearchParams(window.location.search).get('page');
  try {
    const data = await Api.get(
      '/api/product/products',
      `?page=${pageId}&&perPage=10`
    );
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

// navbar 카테고리 목록으로 사용
export async function getCategories() {
  try {
    const data = await Api.get('/api/category', 'categories');
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function getProduct(id) {
  // 제품가져오기 api 요청
  try {
    const data = await Api.get('/api/product', `${id}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function createCategory() {
  // 카테고리생성 api 요청
  try {
    const data = {
      name: `수정해주세요${Date.now()}`,
    };
    const result = await Api.post('/api/category/register', data);

    alert(`정상적으로 카테고리 추가되었습니다.`);
    return result;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function removeProduct(id) {
  // 제품삭제 api 요청
  try {
    const data = await Api.delete(`/api/product/${id}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function removeCategory(id) {
  // 카테고리삭제 api 요청
  try {
    const data = await Api.delete(`/api/category/${id}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
