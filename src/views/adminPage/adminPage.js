// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import headerNavbar from '../components/headerNavbar.js';
import leftMenu from '../components/leftMenu.js';
import insertCategoryList from '../components/navCategoryList.js';
import { addCommas } from '../useful-functions.js';

const leftMenuAdmin = document.querySelector('#leftMenuAdmin');
const headerNavbar1 = document.querySelector('#headerNavbar');
const mainContent = document.querySelector('#mainContent');
const dashboard_content = document.querySelector('#dashboard-content');

addAllElements();
insertCategoryList();

async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  leftMenuAdmin.innerHTML = await leftMenu.render({
    selected: 'dashboard',
  });
  await headerNavbar.componentDidMount();
  const orderTotalNum = await getOrderstotalNum();
  console.log(orderTotalNum);
  const userTotalNum = await getTotalnumOfusers();
  const totalSale = await getTotalSale();
  dashboard_content.innerHTML = await adminContent.render(
    userTotalNum,
    orderTotalNum,
    totalSale
  );
}

const adminContent = {
  render: (userTotalNum, orderTotalNum, totalSale) => {
    return `
    <h1>쇼핑몰 현황</h1>
    <div class="tile is-ancestor">
      <div class="tile is-4 is-vertical is-parent">
        <div class="tile is-child box tileContent">
          <p class="subtitle">총 유저수</p>
          <div class="titleContent">
            <p class="title">${addCommas(userTotalNum)}</p>
            <i class="title title-icon fa-solid fa-people-group"></i>
          </div>
          </div>
        <div class="tile is-child box tileContent">
          <p class="subtitle">총 주문수</p>
          <div class="titleContent">
            <p class="title">${addCommas(orderTotalNum)}</p>
            <i class="title title-icon fa-solid fa-receipt"></i>
          </div>
        </div>
      </div>
      <div class="tile is-parent">
        <div class="tile is-child box tileContent">
          <p class="subtitle">총 매출</p>
          <div class="titleContent">
            <p class="title">${addCommas(totalSale)}</p>
            <i class="title title-icon fa-solid fa-won-sign"></i>
          </div>
        </div>
      </div>
    </div>

    `;
  },
};

//.get('/order/totalNum'
async function getOrderstotalNum() {
  try {
    const data = await Api.get('/api/order/admin', 'qty');
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}

//.get('/totalnumOfusers',
async function getTotalnumOfusers() {
  try {
    const data = await Api.get('/api/user', 'numbers');
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
//admin/price get
async function getTotalSale() {
  try {
    const data = await Api.get('/api/order/admin', 'price');
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
