// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import headerNavbar from '../components/headerNavbar.js';
import leftMenu from '../components/leftMenu.js';
import productlist from './productslist.js';
import ProductEdit from './productEdit.js';
import categorylist from './categorylist.js';
const leftMenuAdmin = document.querySelector('#leftMenuAdmin');
const headerNavbar1 = document.querySelector('#headerNavbar');
const mainContent = document.querySelector('#mainContent');
const dashboard_content = document.querySelector('#dashboard-content');

addAllElements();
async function addAllElements() {
  const datas = await getProducts();
  const categoriesdatas = await getCategories();
  dashboard_content.innerHTML = await categorylist.render(categoriesdatas);
  dashboard_content.innerHTML += await productlist.render(datas);
  headerNavbar1.innerHTML = await headerNavbar.render();
  leftMenuAdmin.innerHTML = await leftMenu.render({
    selected: 'products',
  });
  await headerNavbar.componentDidMount();
  //제품생성
  document
    .getElementById('create-product-button')
    .addEventListener('click', async () => {
      const result = await createProduct(categoriesdatas[0]);
      console.log(result);
      window.location.href = `/adminProducts`;
    });
  const productEditButtons = document.getElementsByClassName(
    'product-edit-button'
  );
  //제품 수정
  Array.from(productEditButtons).forEach((button) => {
    button.addEventListener('click', async () => {
      const result = await getProduct(button.id);
      console.log(result);
      dashboard_content.innerHTML = await ProductEdit.render(
        result,
        categoriesdatas
      );
      await ProductEdit.componentDidMount(result._id, result.category);
    });
  });
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
  const categoryEditButtons = document.getElementsByClassName(
    'category-edit-button'
  );
  //카테고리 수정

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
  try {
    const data = await Api.get('/api', 'product');
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
export async function getCategories() {
  try {
    const data = await Api.get('/api', 'category');
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
    const data = await Api.get('/api', `product/${id}`);
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function createProduct(tempCategory) {
  // 제품생성 api 요청
  try {
    const data = {
      name: `수정해주세요${Date.now()}`,
      price: 0,
      image: '수정해주세요',
      category: {
        _id: `${tempCategory._id}`,
        name: `${tempCategory.name}`,
      },
      description: '수정해주세요',
    };
    ///
    const result = await Api.post('/api/product/register', data);

    alert(`정상적으로 제품 추가되었습니다.`);
    return result;
    // 표 리렌더 해야하지 않을까
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
