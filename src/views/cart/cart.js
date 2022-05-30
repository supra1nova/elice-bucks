const uploadCart = () => {
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
        list.innerHTML = '';
        const emptycart = `<div class='emptycart'>장바구니가 비어있습니다.</div>`;
        list.insertAdjacentHTML('beforeend', emptycart);
        totalPaymentInf();
        return;
      }

      for (let i = 0; i < a.length; i++) {
        let { name, price, image, cnt } = a[i];
        const cartlist = `
                        <div class="list">
                            <div class="listItem">
                            <label class="check" for="">
                            <input type="checkbox" name="chkItem" class="itemCheck" checked>
                            <span class="ico"></span>
                          </label>
                          <div class="goods">
                            <a href="#" class="image is-96x96"><img src="${image}"></a>
                            <div class="itemName">
                              <div class="inner_name">
                                <a href="#" class="package name">${name}</a>
                              </div>
                            </div>
                            <div class="price">
                              <span class="pricecnt">${
                                Number(price) * Number(cnt)
                              }</span><span class="won">원</span>
                            </div>
                            <div class="countbar">
                              <button type="button" class="btn minus" name="decrease"><i class="fa-solid fa-minus"></i></button>
                              <input class="cntNumber cnt" readonly value="${cnt}"/>
                              <button type="button" class="btn plus" name="increase"><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <button type="button" class="delete is-large"></button>
                          </div>
                          </div>
                        </div>
                        `;
        list.insertAdjacentHTML('beforeend', cartlist);

        // 체크 박스 체크
        // let checkboxCheck = document.querySelector(`.check${i}`);
        // if (checkboxCheck.checked) {
        // }
      }
      minusBtnEvent();
      plusBtnEvent();
      totalPaymentInf();
      deleteBtnEvent();
      selectDeleteBtnEvent();
      checkboxBtnEvent();
      allCheckBtnEvent();
    };

    c.onerror = (error) => {
      console.log(error);
    };
  };
};

const totalPaymentInf = () => {
  const paymentMain = document.querySelector('.pamentMain');
  paymentMain.innerHTML = '';
  let price = document.getElementsByClassName('pricecnt');
  let count = document.getElementsByClassName('cntNumber');
  let checkboxes = document.getElementsByClassName('itemCheck');
  let totalPrice = 0;
  let totalCnt = 0;

  //
  for (let i = 0; i < price.length; i++) {
    if (checkboxes[i].checked) {
      totalPrice += Number(price[i].innerHTML);
      totalCnt += Number(count[i].value);
    }
  }
  const Inf = (totalPrice, totalCnt) => `
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
              <p id="productsTotal">${totalPrice} 원</p>
            </div>
            <div class="info">
              <p>배송비</p>
              <p id="deliveryFee">3,000원</p>
            </div>
          </div>
          <div class="total">
            <p class="total-label">총 결제금액</p>
            <p class="total-price" id="totalPrice">${totalPrice + 3000} 원</p>
          </div>
          <div class="purchase">
            <a href="/order">
              <button class="button is-info" id="purchaseButton">
              구매하기
              </button>
            </a>
          </div>
        </div>
        </div>
        `;
  paymentMain.insertAdjacentHTML('beforeend', Inf(totalPrice, totalCnt));
};

// 결제 정보

// 예시넣기
function plusBtnEvent() {
  let list = document.getElementsByClassName('list');
  for (let i = 0; i < list.length; i++) {
    let plusbtn = document.getElementsByClassName('plus')[i];

    plusbtn.addEventListener('click', () => {
      let count = document.getElementsByClassName('cntNumber')[i].value;
      let name = document.getElementsByClassName('name')[i].innerText;
      if (count === '9') {
        return;
      }
      count++;
      document.getElementsByClassName('cntNumber')[i].value = count;
      updateCnt(count, name, i);
      totalPaymentInf();
    });
  }
}

function minusBtnEvent() {
  let list = document.getElementsByClassName('list');
  for (let i = 0; i < list.length; i++) {
    let plusbtn = document.getElementsByClassName('minus')[i];
    plusbtn.addEventListener('click', () => {
      let count = document.getElementsByClassName('cntNumber')[i].value;
      let name = document.getElementsByClassName('name')[i].innerText;
      if (count === '1') {
        return;
      }
      count--;
      document.getElementsByClassName('cntNumber')[i].value = count;
      updateCnt(count, name, i);
      totalPaymentInf();
    });
  }
}

const updateCnt = (cnt, name, i) => {
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
      let price = Item.price;
      Item.cnt = Number(cnt);
      document.getElementsByClassName('pricecnt')[i].innerHTML = cnt * price;
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

// const getprice = (name, count, i) => {
//   let onRequest = indexedDB.open('cart', 1);
//   onRequest.onsuccess = () => {
//     const database = onRequest.result;
//     // 읽기 전용으로 transaction 적용. (빠름)
//     const transaction = database.transaction('carts', 'readonly');
//     // cart 저장소 가져오기
//     const carts = transaction.objectStore('carts');
//     const getItem = carts.get(name);
//     getItem.onsuccess = () => {
//       const Item = getItem.result;
//       const price = Item.price;
//       document.getElementsByClassName(`pricecnt`).innerHTML = price * count;
//     };
//   };
// };

const deleteBtnEvent = () => {
  let deleteBtns = document.getElementsByClassName('delete');
  for (let i = 0; i < deleteBtns.length; i++) {
    let name = document.getElementsByClassName('name')[i].innerHTML;
    deleteBtns[i].addEventListener('click', () => {
      let onRequest = indexedDB.open('cart', 1);
      onRequest.onsuccess = () => {
        const database = onRequest.result;
        // 읽기 전용으로 transaction 적용. (빠름)
        const transaction = database.transaction('carts', 'readwrite');
        // cart 저장소 가져오기
        const carts = transaction.objectStore('carts');
        const getItem = carts.delete(name);
        getItem.onsuccess = () => {
          console.log('삭제완료');
        };
      };
      uploadCart();
    });
  }
};

const selectDeleteBtnEvent = () => {
  let seleteDeleteBtn = document.querySelector('#checkedDel');
  seleteDeleteBtn.addEventListener('click', () => {
    let checkboxes = document.getElementsByClassName('itemCheck');
    let onRequest = indexedDB.open('cart', 1);
    onRequest.onsuccess = () => {
      const database = onRequest.result;
      // 읽기 전용으로 transaction 적용. (빠름)
      const transaction = database.transaction('carts', 'readwrite');
      // cart 저장소 가져오기
      const carts = transaction.objectStore('carts');
      for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
          let name = document.getElementsByClassName('name')[i].innerHTML;
          let delItem = carts.delete(name);
          delItem.onsuccess = () => {
            console.log('삭제완료');
          };
        }
      }
    };
    uploadCart();
  });
};

const checkboxBtnEvent = () => {
  let checkboxes = document.getElementsByClassName('itemCheck');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', () => {
      console.log('checkbox event');
      totalPaymentInf();
    });
  }
};

function allCheckBtnEvent() {
  let allCheckBtn = document.querySelector('#allCheck');
  allCheckBtn.addEventListener('click', () => {
    let checkboxes = document.getElementsByClassName('itemCheck');
    for (let i = 0; i < checkboxes.length; i++) {
      // 유사객체 당했다;
      if (!checkboxes[i].checked) {
        Array.from(checkboxes).forEach((checkbox) => {
          checkbox.checked = true;
        });
        break;
      }
      Array.from(checkboxes).forEach((checkbox) => {
        checkbox.checked = false;
      });
      totalPaymentInf();
      return;
    }
    totalPaymentInf();
  });
}

uploadCart();
