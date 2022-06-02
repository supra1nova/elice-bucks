// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import headerNavbar from '../components/headerNavbar.js';
import leftMenu from '../components/leftMenu.js';
import insertCategoryList from '../components/navCategoryList.js';
import orderslist from './orderslist.js';
import adminDetail from './adminDetail.js';

const leftMenuAdmin = document.querySelector('#leftMenuAdmin');
const headerNavbar1 = document.querySelector('#headerNavbar');
const dashboard_content = document.querySelector('#dashboard-content');

addAllElements();
insertCategoryList();

async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  leftMenuAdmin.innerHTML = await leftMenu.render({
    selected: 'orders',
  });
  await headerNavbar.componentDidMount();
  const datas = await getOrders();
  dashboard_content.innerHTML = orderslist.render(datas.posts);
  await orderslist.componentDidMount();

  //주문 상세보기
  const productEditButtons = document.getElementsByClassName(
    'product-edit-button'
  );
  //url처리
  let queryParams = new URLSearchParams(window.location.search);
  window.onpopstate = function (event) {
    history.go();
  };
  Array.from(productEditButtons).forEach((button) => {
    button.addEventListener('click', async () => {
      dashboard_content.innerHTML = adminDetail.render(datas.posts[button.id]);
      await adminDetail.componentDidMount();
      queryParams.set('detail', `${button.id}`);
      history.pushState(null, null, '?' + queryParams.toString());

      // const cancleButton = document.getElementById('cancleButton');
      // cancleButton.addEventListener('click', async () => {
      //   //addAllElements();
      //   window.location.href = `/adminProducts`;
      // });
    });
  });

  //페이지네이션
  const totalPage = datas.totalPage;
  for (let i = 1; i <= totalPage; i++) {
    document
      .querySelector('.pagination-list')
      .insertAdjacentHTML(
        'beforeend',
        `<li><a class="pagination-link" id="pagination${i}" href="?page=${i}&perPage=10">${i}</a></li>`
      );
  }

  // 현재 페이지에 해당하는 페이징 버튼 활성화
  const pageBtn = document.getElementById(`pagination${datas.page}`);
  pageBtn.classList.add('activePagination');
}

async function getOrders() {
  // 주문가져오기 api 요청/admin/orders
  const pageId = new URLSearchParams(window.location.search).get('page');
  try {
    const data = await Api.get(
      '/api/order/admin/orders/pagination',
      `?page=${pageId}&&perPage=10`
    );
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
//결제 완료
export async function setPaid(orderId) {
  try {
    const result = await Api.patch('/api/order/paid', `${orderId}`);
    alert(`결제 완료처리 되었습니다.`);
    window.location.reload();
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
//배송 처리
export async function setDelivered(orderId) {
  try {
    const result = await Api.patch('/api/order/delivered', `${orderId}`);
    alert(`배송 처리되었습니다.`);
    window.location.reload();
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
//주문 취소 처리
export async function setDeletedAt(orderId) {
  try {
    const result = await Api.patch('/api/order/cancel', `${orderId}`);
    alert(`주문 취소 처리되었습니다.`);
    window.location.reload();
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
