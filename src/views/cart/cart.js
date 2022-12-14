import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';
import { addCommas, convertToNumber } from '../useful-functions.js';
const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();
insertCategoryList();

function addAllElements() {
  headerNavbar1.innerHTML = headerNavbar.render();
  headerNavbar.componentDidMount();
}

const uploadCart = () => {
  // indexed 열기
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    const database = onRequest.result;
    // 읽기 전용으로 transaction 적용. (빠름)
    const transaction = database.transaction('carts', 'readonly');
    // cart 저장소 가져오기
    const carts = transaction.objectStore('carts');
    const cartItemlist = document.querySelector('.cartItemlist');
    // 장바구니 내역 초기화.
    cartItemlist.innerHTML = '';
    const Indcartslist = carts.getAll();
    Indcartslist.onsuccess = () => {
      let indexedDBcarts = Indcartslist.result;
      // getAll 값이 없으면 비어있다는 말 띄우기
      if (indexedDBcarts.length === 0) {
        cartItemlist.innerHTML = '';
        const emptycart = `<div class='emptycart'>장바구니가 비어있습니다.</div>`;
        cartItemlist.insertAdjacentHTML('beforeend', emptycart);
        totalPaymentInf();
        return;
      }

      for (let i = 0; i < indexedDBcarts.length; i++) {
        let { name, price, image, cnt, _id } = indexedDBcarts[i];
        let priceadd = addCommas(Number(price) * Number(cnt));
        const cartlist = `
                        <div class="list box order-summary field is-horizontal">
                            <div class="listItem container">
                            
                          <div class="goods is-ancestor">
                          <label class="check ml-1" for="">
                            <input type="checkbox" name="chkItem" class="itemCheck" checked>
                            <span class="ico"></span>
                          </label>
                            <a href="/detail/${_id}" class="image is-96x96"><img src="${image}"></a>
                            <div class="itemName tile">
                              <div class="inner_name">
                                <a href="/detail/${_id}" class="package name">${name}</a>
                              </div>
                            </div>
                            <div class="price">
                              <span class="pricecnt">${priceadd}</span><span class="won">원</span>
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
        cartItemlist.insertAdjacentHTML('beforeend', cartlist);

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

    Indcartslist.onerror = (error) => {
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
      totalPrice += Number(convertToNumber(price[i].innerHTML));
      totalCnt += Number(count[i].value);
    }
  }
  let totalPriceaddCommas = addCommas(totalPrice);
  let totalPriceaddCommasdel = addCommas(totalPrice + 3000);
  const paymentInf = (
    totalPriceaddCommas,
    totalCnt,
    totalPriceaddCommasdel
  ) => `
        <div class="tile tile-order-summary">
        <div class="box order-summary">
          <div class="header">
            <p>결제정보</p>
          </div>
          <div class="order-info">
            <div class="info">
              <p>상품수</p>
              <p id="productsCount">${totalCnt} 개</p>
            </div>
            <div class="info">
              <p>상품금액</p>
              <p id="productsTotal">${totalPriceaddCommas} 원</p>
            </div>
            <div class="info">
              <p>배송비</p>
              <p id="deliveryFee">${totalCnt === 0 ? 0 : '3,000'} 원</p>
            </div>
          </div>
          <div class="total">
            <p class="total-label">총 결제금액</p>
            <p class="total-price" id="totalPrice">${
              totalCnt === 0 ? 0 : totalPriceaddCommasdel
            } 원</p>
          </div>
          <div class="purchase">
            <a href="javascript:void(0)">
              <button class="button is-info" id="purchaseButton">
              구매하기
              </button>
            </a>
          </div>
        </div>
        </div>
        `;
  paymentMain.insertAdjacentHTML(
    'beforeend',
    paymentInf(totalPriceaddCommas, totalCnt, totalPriceaddCommasdel)
  );

  buyBtnEvent();
};

// 결제 정보

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
      document.getElementsByClassName('pricecnt')[i].innerHTML = addCommas(
        cnt * price
      );
      const updatecount = carts.put(Item, name);
      updatecount.onsuccess = () => {
        totalPaymentInf();
      };
    };
    getItem.onerror = () => {
      console.log('get error');
    };
  };
};

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
        let getItem = carts.delete(name);
        getItem.onsuccess = () => {
          console.log('삭제완료');
        };
      };
      uploadCart();
      allCheckBtnEvent();
    });
  }
};

function selectDeleteBtnEvent() {
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
      allCheckBtnEvent();
    };
    uploadCart();
  });
}

function checkboxBtnEvent() {
  let checkboxes = document.getElementsByClassName('itemCheck');
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].addEventListener('click', () => {
      totalPaymentInf();
    });
  }
}

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

function buyBtnEvent() {
  let buyBtn = document.getElementById('purchaseButton');
  buyBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let onRequest = indexedDB.open('cart', 1);
    let checkboxes = document.getElementsByClassName('itemCheck');
    let totalCount = document
      .querySelector('#productsCount')
      .innerHTML.replace(/[^0-9]/g, '');
    let totalPrice = document
      .querySelector('#productsTotal')
      .innerHTML.replace(/[^0-9]/g, '');
    let products = [];
    if (totalCount === '0') {
      return alertModal.alertModalActivate('장바구니가 비어있습니다.');
    }
    onRequest.onsuccess = () => {
      const database = onRequest.result;
      // 읽기 전용으로 transaction 적용. (빠름)
      // cart 저장소 가져오기
      const carts = database
        .transaction('carts', 'readonly')
        .objectStore('carts');

      let cartlist = carts.getAll();
      cartlist.onsuccess = () => {
        let cart = cartlist.result;
        for (let i = 0; i < checkboxes.length; i++) {
          if (checkboxes[i].checked) {
            let productId = cart[i]._id;
            let productQty = cart[i].cnt;
            let productPrice = cart[i].price;
            products.push({ productId, productQty, productPrice });
          }
        }
        let data = {
          products,
          totalQty: totalCount,
          totalPrice: totalPrice,
        };
        console.log(data);
        const order = database
          .transaction('order', 'readwrite')
          .objectStore('order');
        let orderput = order.put(data, 'summary');
        orderput.onsuccess = () => {
          location.pathname = '/order';
        };
      };
    };
  });
}

uploadCart();
