import headerNavbar from '../components/headerNavbar.js';
import { kakaomap } from './kakaomap/kakaomap.js';
import insertCategoryList from '../components/navCategoryList.js';
import logincheck from './logincheck.js';
import * as Api from '/api.js';

logincheck();
kakaomap();
paymentInf();
insertCategoryList();

const headerNavbar1 = document.querySelector('#headerNavbar');
const paymentHtml = document.querySelector('.paymentHtml');
const receiverNameInput = document.querySelector('#receiverName');
const receiverPhoneNumberInput = document.querySelector('#receiverPhoneNumber');
const postalCodeInput = document.querySelector('#postalCode');
const searchAddressButton = document.querySelector('#searchAddressButton');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');

userdata();
let userId = '';
const setUserId = (_id) => {
  userId = _id;
};
async function userdata() {
  try {
    const result = await Api.get(`/api/user`);
    setUserId(result._id);
    console.log(result);
    console.log(userId);
    address1Input.value = result.address ? result.address.address1 : '';
    address2Input.value = result.address ? result.address.address2 : '';
    postalCodeInput.value = result.address ? result.address.postalCode : '';
    receiverPhoneNumberInput.value = result.phoneNumber
      ? result.phoneNumber
      : '';
    receiverNameInput.value = result.fullName;
  } catch (err) {
    console.log(err.stack);
  }
}

function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
}

async function doCheckout() {
  // 각 입력값 가져옴
  const receiverName = receiverNameInput.value;
  const receiverPhoneNumber = receiverPhoneNumberInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;

  // 입력이 안 되어 있을 시
  if (!receiverName || !receiverPhoneNumber || !postalCode || !address2) {
    return alert('배송지 정보를 모두 입력해 주세요.');
  }
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    const database = onRequest.result;
    const order = database
      .transaction('order', 'readwrite')
      .objectStore('order');
    let orderget = order.get('summary');
    orderget.onsuccess = async () => {
      let orderindexedDB = orderget.result;
      let data = {
        ...orderindexedDB,
        address: { postalCode, address1, address2 },
        userId,
      };
      console.log(data);
      // JSON 만듦
      let apiUrl = '/api/order/user/register';
      // POST 요청
      let res = await Api.post(apiUrl, data);

      if (res) {
        alert('주문에 성공하였습니다!');
        const carts = database
          .transaction('carts', 'readwrite')
          .objectStore('carts');
        let clear = carts.clear();
        clear.onsuccess = () => {
          location.pathname = '/';
        };
      } else {
        alert('주문에 실패하였습니다...');
      }
    };
  };
}

async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}

function createindexedDB() {
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    console.log('orderDB 생성');
  };
  onRequest.onupgradeneeded = () => {
    const database = onRequest.result;
    database.createObjectStore('carts');
    database.createObjectStore('order');
  };
  onRequest.onerror = () => {
    console.log('Error creating or accessing db');
  };
}
function addclickEvent() {
  let orderButton = document.querySelector('#orderButton');
  searchAddressButton.addEventListener('click', searchAddress);
  orderButton.addEventListener('click', doCheckout);
}

function paymentInf() {
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    const database = onRequest.result;
    const orderdb = database
      .transaction('order', 'readonly')
      .objectStore('order');
    let ordergetAll = orderdb.get('summary');
    ordergetAll.onsuccess = () => {
      let orderlist = ordergetAll.result;
      let totalQty = orderlist.totalQty;
      let totalPrice = orderlist.totalPrice;
      const paymentContent = `<div class="box order-summary">
                            <div class="header">
                              <p>결제정보</p>
                            </div>
                            <div class="order-info">
                              <div class="info">
                                <p>주문상품</p>
                                <p class="products-title" id="products">
                                  ${
                                    totalQty
                                      ? totalQty
                                      : '주문하신 상품이 없습니다'
                                  } 개
                                </p>
                              </div>
                              <div class="info">
                                <p>상품총액</p>
                                <p id="productsTotal">${totalPrice} 원</p>
                              </div>
                              <div class="info">
                                <p>배송비</p>
                                <p id="deliveryFee">3000 원</p>
                              </div>
                            </div>
                            <div class="total">
                              <p class="total-label">결제금액</p>
                              <p class="total-price" id="orderTotal">${
                                Number(totalPrice) + 3000
                              } 원</p>
                            </div>
                            <div class="purchase">
                              <button class="button is-info" id="orderButton">
                                결제하기
                              </button>
                            </div>
                          </div>`;
      paymentHtml.insertAdjacentHTML('beforeend', paymentContent);
      addclickEvent();
    };
  };
}

addAllElements();
insertCategoryList();
createindexedDB();
