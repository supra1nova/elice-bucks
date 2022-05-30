// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import headerNavbar from '../components/headerNavbar.js';
import leftMenu from '../components/leftMenu.js';
import insertCategoryList from '../components/navCategoryList.js';

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
  dashboard_content.innerHTML = await adminContent.render(
    userTotalNum,
    orderTotalNum
  );
}

const adminContent = {
  render: (userTotalNum, orderTotalNum) => {
    return `
    <h1>쇼핑몰 현황</h1>
    <div>
      <div>총 유저수 : ${userTotalNum}</div>
      <div>총 주문수 : ${orderTotalNum}</div>
      <div>총 매출 : ${orderTotalNum}</div>
      <div>css적용 예정</div>
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
