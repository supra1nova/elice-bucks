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
      updateCart();
    };
  };
};
