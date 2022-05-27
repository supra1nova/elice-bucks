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
    const paymentMain = document.querySelector('.pamentMain');
    // 장바구니 내역 초기화.
    list.innerHTML = '';
    paymentMain.innerHTML = '';
    const Inf = (total, totalCnt) => `
        <div class="tile is-parent tile-order-summary">
        <div class="box order-summary">
          <div class="header">
            <p>결제정보</p>
          </div>
          <div class="order-info">
            <div class="info">
              <p>상품수</p>
              <p id="productsCount">${totalCnt}개</p>
            </div>
            <div class="info">
              <p>상품금액</p>
              <p id="productsTotal">${total} 원</p>
            </div>
            <div class="info">
              <p>배송비</p>
              <p id="deliveryFee">3,000원</p>
            </div>
          </div>
          <div class="total">
            <p class="total-label">총 결제금액</p>
            <p class="total-price" id="totalPrice">${total + 3000} 원</p>
          </div>
          <div class="purchase">
            <button class="button is-info" id="purchaseButton">
              구매하기
            </button>
          </div>
        </div>
        </div>
        `;
    const c = carts.getAll();
    c.onsuccess = () => {
      let a = c.result;
      let total = 0;
      let totalCnt = 0;
      // getAll 값이 없으면 비어있다는 말 띄우기
      if (a.length === 0) {
        const emptycart = `<div class='emptycart'>장바구니가 비어있습니다.</div>`;
        list.insertAdjacentHTML('beforeend', emptycart);
        paymentMain.insertAdjacentHTML('beforeend', Inf(total, totalCnt));
        return;
      }

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
                              <button type="button" class="btn minus" name="decrease" onClick='event.preventDefault(); minusCnt(${i})'><i class="fa-solid fa-minus"></i></button>
                              <input class="cntNumber cnt-${i}" type="" readonly value="${cnt}" />
                              <button type="button" class="btn plus" name="increase" onClick='event.preventDefault(); plusCnt(${i})'><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <button type="button" class="delete is-large" onclick="deleteItem(${i})"></button>
                          </div>
                          </div>
                        </div>
                        `;
        list.insertAdjacentHTML('beforeend', cartlist);
        // 체크 박스 체크
        // let checkboxCheck = document.querySelector(`.check${i}`);
        // if (checkboxCheck.checked) {
        total += Number(price) * Number(cnt);
        totalCnt += cnt;
        // }
      }
      paymentMain.insertAdjacentHTML('beforeend', Inf(total, totalCnt));
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
  let checkboxCheck = document.querySelector(`.check${i}`);
  let check = checkboxCheck.checked;
  checkboxCheck.checked = check;
  const name = document.querySelector(`.name-${i}`).innerHTML;
  // getprice(name, Number(count), i);
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
  let checkboxCheck = document.querySelector(`.check${i}`);
  let check = checkboxCheck.checked;
  checkboxCheck.checked = check;
  // getprice(name, Number(count), i);
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
