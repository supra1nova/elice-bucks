import { saveItem, updateItem } from './indexedDB/indexedDB.js';
// Todo list
// 1. plus minus 버튼 기능 구현
// [] - cutNumber 최소값은 1, 플러스 버튼 누르면 증가.
// [] - 최대값은 어떻게?
// 3. 체크 박스 구현
// checkbox가 true일때 가격 표현
// checkbox가 false일때 가격 표현 X
// 2. 장바구니 기능 버튼 구현
// [] - 장바구니 버튼을 눌렀을시 indexedDB 유무 확인
// [] - 장바구니 버튼 눌렀을시 indexedDB 파일에서 해당 값이 있는지 검사
// [] - 있다면 cnt++ 값만 하나 늘려서 구현
// [] - 없다면 해당 제품의 정보를 indexDB에 대입. cnt 초기값은 1
// [] - 해당 값이 새로고침 해도 사라지지 않는지 확인
// [] -

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

const examItem = (e) => {
  e.preventDefault();
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    const database = onRequest.result;
    const title = '백다방보단 맛있는 커피';
    const example = {
      name: title,
      price: '5,000',
      img: `https://cdn-icons-png.flaticon.com/512/5110/5110429.png`,
      cnt: '1',
    };
    console.log(example);
    const transaction = database.transaction('carts', 'readwrite');
    const carts = transaction.objectStore('carts');

    let adde = carts.put(example, title);
    adde.onsuccess = () => {
      updateItem();
    };

    transaction.onerror = () => {
      console.log(transaction.error);
    };
  };
};

updateItem();

// 결제 정보

// 예시넣기
const exbnt = document.querySelector('.ex');
exbnt.addEventListener('click', examItem);
