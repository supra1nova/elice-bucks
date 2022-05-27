// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import headerNavbar from '../components/headerNavbar.js';
import leftMenu from '../components/leftMenu.js';
import orderslist from './orderslist.js';
const leftMenuAdmin = document.querySelector('#leftMenuAdmin');
const headerNavbar1 = document.querySelector('#headerNavbar');
const dashboard_content = document.querySelector('#dashboard-content');

addAllElements();
async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  leftMenuAdmin.innerHTML = await leftMenu.render({
    selected: 'orders',
  });
  await headerNavbar.componentDidMount();

  const datas = await getOrders();
  console.log(datas);
  //dashboard_content.innerHTML = await orderslist.render(datas);
}

async function getOrders() {
  // 제품가져오기 api 요청
  try {
    const data = await Api.get('/api', 'orderlists');
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
