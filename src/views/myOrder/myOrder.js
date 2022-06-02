import * as Api from '/api.js';
import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';
import logincheck from '../order/logincheck.js';
// navbar 로그인 상태에 따른 로그인 메뉴 삽입

const headerNavbar1 = document.querySelector('#headerNavbar');

logincheck();
addAllElements();
insertCategoryList();

function addAllElements() {
  headerNavbar1.innerHTML = headerNavbar.render();
  headerNavbar.componentDidMount();
}

let userId = await getUserId();

async function getUserId() {
  try {
    const data = await Api.get(`/api/user`);
    return data._id;
  } catch (err) {
    console.log(err.stack);
  }
}
console.log(userId);

getUserOrders();

async function getUserOrders() {
  try {
    const products = await Api.get(`/api/order/user/orders`);
    console.log(products);
    console.log('주문 목록이 나왔습니다.');
  } catch (err) {
    console.log(err.stack);
  }
}
