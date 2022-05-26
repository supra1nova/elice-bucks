// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import headerNavbar from '../components/headerNavbar.js';
import leftMenu from '../components/leftMenu.js';
import productlist from './productslist.js';
const leftMenuAdmin = document.querySelector('#leftMenuAdmin');
const headerNavbar1 = document.querySelector('#headerNavbar');
const mainContent = document.querySelector('#mainContent');
const tbody = document.querySelector('#products');

addAllElements();
async function addAllElements() {
  const datas = await getProducts();
  tbody.innerHTML = await productlist.render(datas);
  headerNavbar1.innerHTML = await headerNavbar.render();
  leftMenuAdmin.innerHTML = await leftMenu.render({
    selected: 'products',
  });
  await headerNavbar.componentDidMount();

  document
    .getElementById('create-product-button')
    .addEventListener('click', async () => {
      const result = await createProduct();
      console.log(result);
      //window.location.href = `/adminProducts/${result.product._id}/edit`;
    });
}

async function getDataFromApi() {
  // 예시 URI입니다. 현재 주어진 프로젝트 코드에는 없는 URI입니다.
  const data = await Api.get('/api/user/data');
  const random = randomId();

  console.log({ data });
  console.log({ random });
}
async function getProducts() {
  // 제품가져오기 api 요청
  try {
    const data = await Api.get('/api-p');
    console.log(data);
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

async function createProduct(e) {
  // 제품생성 api 요청
  try {
    const data = {
      name: '가나다ㄹㄹ',
      price: 0,
      image: { _id: 0 },
      category: { _id: 0 },
      description: '',
    };

    const result = await Api.post('/api-p/register', data);

    alert(`정상적으로 제품 추가되었습니다.`);
    return result;
    // 표 리렌더 해야하지 않을까
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
