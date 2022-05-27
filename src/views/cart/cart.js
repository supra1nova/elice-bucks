// navbar 로그인 부분
import headerNavbar from '../components/headerNavbar.js';
const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();
async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}

// 3. 체크 박스 구현
// checkbox가 true일때 가격 표현
// checkbox가 false일때 가격 표현 X
// 2. 장바구니 기능 버튼 구현
// [] - 장바구니 버튼을 눌렀을시 indexedDB 유무 확인
// [] - 장바구니 버튼 눌렀을시 indexedDB 파일에서 해당 값이 있는지 검사
// [] - 있다면 cnt++ 값만 하나 늘려서 구현
// [] - 없다면 해당 제품의 정보를 indexDB에 대입. cnt 초기값은 1
// [] - 해당 값이 새로고침 해도 사라지지 않는지 확인

let onRequest = indexedDB.open('cart', 1);
onRequest.onsuccess = () => {
  console.log('Success creating or accessing db');
};
onRequest.onupgradeneeded = () => {
  const database = onRequest.result;
  database.createObjectStore('carts');
};
onRequest.onerror = () => {
  console.log('Error creating or accessing db');
};

// IndexedDB cart 저장소에 목록 있으면 실행.

const updateCart = () => {
  // indexed 열기
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    console.log('update성공');
    const database = onRequest.result;
    // 읽기 전용으로 transaction 적용. (빠름)
    const transaction = database.transaction('carts', 'readonly');
    // cart 저장소 가져오기
    const carts = transaction.objectStore('carts');
    const list = document.querySelector('.cartItemlist');
    // 장바구니 내역 초기화.
    list.innerHTML = '';
    const c = carts.getAll();
    c.onsuccess = () => {
      let a = c.result;
      // getAll 값이 없으면 비어있다는 말 띄우기
      if (a.length === 0) {
        const emptycart = `<div class='emptycart'>장바구니가 비어있습니다.</div>`;
        list.insertAdjacentHTML('beforeend', emptycart);
        return;
      }
      let total = 0;
      for (let i = 0; i < a.length; i++) {
        let { name, price, img, cnt } = a[i];
        const cartlist = `
                        <div class="list">
                            <div class="listItem">
                            <label class="check" for="">
                            <input type="checkbox" name="chkItem" class="check${i}">
                            <span class="ico"></span>
                          </label>
                          <div class="goods">
                            <a href="#" class="image is-96x96"><img src="${img}"></a>
                            <div class="name">
                              <div class="inner_name">
                                <a href="#" class="package name-${i}">${name}</a>
                              </div>
                            </div>
                            <div class="price">
                              <span class="price-${i}">${
          Number(price) * Number(cnt)
        }</span><span class="won">원</span>
                            </div>
                            <div class="countbar">
                              <button type="button" class="btn minus" name="decrease" onClick='minusCnt(${i})'><i class="fa-solid fa-minus"></i></button>
                              <input class="cntNumber cnt-${i}" type="" readonly value="${cnt}" />
                              <button type="button" class="btn plus" name="increase" onClick='plusCnt(${i})'><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <button type="button" class="delete is-large" onclick="deleteItem(${i})"></button>
                          </div>
                          </div>
                        </div>
                        `;
        list.insertAdjacentHTML('beforeend', cartlist);
        total += Number(price) * Number(cnt);
        document.querySelector('.totalPrice').innerHTML = `${total} 원`;
      }
    };
    c.onerror = (error) => {
      console.log(error);
    };
  };
};

// 결제 정보

// 예시넣기
function plusCnt(i) {
  let count = document.querySelector(`.cnt-${i}`).value;
  if (count == 9) {
    return;
  }
  count++;
  document.querySelector(`.cnt-${i}`).value = count;
  const name = document.querySelector(`.name-${i}`).innerHTML;
  getprice(name, count, i);
  updateCnt(count, name);
  updateCart();
}

function minusCnt(i) {
  let count = document.querySelector(`.cnt-${i}`).value;
  if (count == 1) {
    return;
  }
  count--;
  document.querySelector(`.cnt-${i}`).value = count;
  const name = document.querySelector(`.name-${i}`).innerHTML;
  const price = getprice(name);
  getprice(name, count, i);
  updateCnt(count, name);
  updateCart();
}

function isChecked(selector) {
  // 1. checkbox element를 찾습니다.

  // 2. checked 속성을 체크합니다.
  const is_checked = checkbox.checked;

  // 3. 결과를 출력합니다.
  document.getElementById('result').innerText = is_checked;
}

function toggleAllcheckbox() {
  const checkboxes = document.getElementsByName('chkItem');
  for (let i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].checked) {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      break;
      return;
    }
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    return;
  }
}

const updateCnt = async (cnt, name) => {
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    const database = onRequest.result;
    // 읽기 전용으로 transaction 적용. (빠름)
    const transaction = database.transaction('carts', 'readwrite');
    // cart 저장소 가져오기
    const carts = transaction.objectStore('carts');
    const getItem = carts.get(name);
    getItem.onsuccess = () => {
      const Item = getItem.result;
      Item.cnt = cnt;
      const updatecount = carts.put(Item, name);
      updatecount.onsuccess = () => {
        console.log('cnt 수정');
      };
    };
    getItem.onerror = () => {
      console.log('cnt를 업데이트 할수 없습니다.');
    };
  };
};
const getprice = (name, count, i) => {
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    const database = onRequest.result;
    // 읽기 전용으로 transaction 적용. (빠름)
    const transaction = database.transaction('carts', 'readonly');
    // cart 저장소 가져오기
    const carts = transaction.objectStore('carts');
    const getItem = carts.get(name);
    getItem.onsuccess = () => {
      const Item = getItem.result;
      const price = Item.price;
      document.querySelector(`.price-${i}`).innerHTML = price * count;
    };
  };
};

const deleteItem = (i) => {
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    const database = onRequest.result;
    // 읽기 전용으로 transaction 적용. (빠름)
    const transaction = database.transaction('carts', 'readwrite');
    // cart 저장소 가져오기
    const carts = transaction.objectStore('carts');
    const name = document.querySelector(`.name-${i}`).innerHTML;
    const getItem = carts.delete(name);
    getItem.onsuccess = () => {
      console.log('삭제완료');
    };
  };
  updateCart();
};

updateCart();
