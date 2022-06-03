import * as Api from '/api.js';
import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';
import logincheck from '../order/logincheck.js';

// navbar 로그인 상태에 따른 로그인 메뉴 삽입
const headerNavbar1 = document.querySelector('#headerNavbar');
const ordersContainer = document.querySelector('#ordersContainer');

//로그인 체크
logincheck();
// nav 바
addAllElements();
insertCategoryList();

function addAllElements() {
  headerNavbar1.innerHTML = headerNavbar.render();
  headerNavbar.componentDidMount();
}

// 유저 주문 정보 가져오기
async function getUserOrders() {
  try {
    let result = await Api.get(`/api/order/user/orders`);
    return result;
  } catch (err) {
    console.log(err.stack);
  }
}

let orders = await getUserOrders();

setUserOrders(orders);
// 주문 목록 해더
let orderListHeader = `<div
class="columns notification is-info is-light is-mobile orders-top"
>
<div class="column is-2">날짜</div>
<div class="column is-5">주문정보</div>
<div class="column is-2">가격</div>
<div class="column is-1">상태</div>
<div class="column is-1">신청</div>
<div class="column is-1">배송정보</div>
</div>`;
let disabled = 'disabled';
// 주문목록 띄우기
async function setUserOrders(orders) {
  if (orders.length === 0) {
    ordersContainer.insertAdjacentHTML(
      'beforeend',
      `${orderListHeader}<div class='div-center'>주문 목록이 비어있습니다.</div>`
    );
    return;
  }
  // 내용 초기화
  ordersContainer.innerHTML = `<div
  class="columns notification is-info is-light is-mobile orders-top"
  >
  <div class="column is-2">날짜</div>
  <div class="column is-5">주문정보</div>
  <div class="column is-2">가격</div>
  <div class="column is-1">상태</div>
  <div class="column is-1">신청</div>
  <div class="column is-1">배송정보</div>
  </div>`;
  // 값 대입
  for (let i = 0; i < orders.length; i++) {
    let createdAt = orders[i][0].createdAt.match(/\d\d\d\d-\d\d-\d\d/g, ''); // 날짜 match
    let price = (orders[i][0].orderId.totalPrice + 3000).toLocaleString();
    let productArr = orders[i][0].products;
    let product = '';
    let orderId = orders[i][0].orderId._id;
    let deletedAt = orders[i][0].orderId.deletedAt.match(/\d\d\d\d/g, '');
    let receiverName = orders[i][0].orderId.receiverName;
    let receiverPhoneNumber = orders[i][0].orderId.receiverPhoneNumber.replace(
      /^(\d{2,3})(\d{3,4})(\d{4})$/,
      `$1-$2-$3`
    );
    let { postalCode, address1, address2 } = orders[i][0].orderId.address;
    for (let j = 0; j < productArr.length; j++) {
      let productname = productArr[j].productId.name;
      let productQty = productArr[j].productQty;
      product += `<div class='orderItem'>${productname} / ${productQty} 개</div>`;
    }
    //주문 목록 생성기
    let order = `
    <div class="columns orders-item box" id="order">
    <div class="column is-2 div-center">
      <div class="orderDate">${createdAt}</div>
    </div>
    <div class="column is-5 order-summary is-flex is-flex-direction-column div-center">
      ${product}
    </div>
    <div class="column is-2 div-center orderStatus">
      <div class="orderprice">${price} 원</div>
    </div>
    <div class="column is-1 div-center orderStatus">
      <div class="Status">${
        Number(deletedAt) === 1970 ? '준비중' : '취소완료'
      }</div>
    </div>
    <div class="column is-1 div-center">
      <button class="button deleteButton" id="${orderId}">
        주문 취소
      </button>
    </div>
    <ul class="main-menu column is-1 orderStatus">
        <li class="item">
          <div class="item__name">배송정보</div>
          <div>
          <div class="item__contents">
            <div class="contents__menu container orders-container box">
              <ul class="inner">
                <li class="column is-3">
                  <h4>수령인</h4>
                  <ul >
                    <li >${receiverName}</li>
                  </ul>
                </li>
                <li class="column is-3"> 
                  <h4>휴대폰 번호</h4>
                  <ul>
                    <li>${receiverPhoneNumber}</li>
                  </ul>
                </li>
                <li class="column is-4">
                  <h4>주소</h4>
                  <ul>
                    <li>우편번호 : ${postalCode}</li>
                    <li>${address1}</li>
                    <li>${address2}</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          </div>
        </li>
      </div>
  </div>
  `;
    ordersContainer.insertAdjacentHTML('beforeend', order);
  }
  deleteBntEvnet();
}
// 주문 목록 삭제하기 구현.
async function deleteBntEvnet() {
  let deleteBtn = document.getElementsByClassName(`deleteButton`);
  let Status = document.getElementsByClassName(`Status`);
  for (let k = 0; k < deleteBtn.length; k++) {
    Status[k].innerHTML === '취소완료' ? (deleteBtn[k].disabled = true) : true;
    deleteBtn[k].addEventListener('click', async () => {
      try {
        await Api.patch(`/api/order/cancel/${deleteBtn[k].id}`);
        Status[k].innerHTML = '취소완료';
        deleteBtn[k].disabled = true;
      } catch (err) {
        console.log(err);
      }
    });
  }
}
