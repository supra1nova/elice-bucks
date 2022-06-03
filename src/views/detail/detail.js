import headerNavbar from '/components/headerNavbar.js';
import insertCategoryList from '/components/navCategoryList.js';

const headerNavbar1 = document.querySelector('#headerNavbar');
const detailContainer = document.querySelector('#detailContainer');

addAllElements();
insertCategoryList();
insertProductDetail();

// navbar 로그인 상태에 따른 로그인 메뉴 삽입
async function addAllElements() {
  headerNavbar1.innerHTML = headerNavbar.render();
  headerNavbar.componentDidMount();
}

// 각 상품의 데이터를 html에 삽입
async function insertProductDetail() {
  // url에서 id에 해당하는 부분만 가져와서 id 변수에 할당
  const id = location.pathname.replace(/\/detail\/([\d\w]*)\/?/g, '$1');

  // '/api/product/${id}' 에서 상품의 상세 내용을 json으로 받아옴
  const res = await fetch(`/api/product/${id}`);
  const product = await res.json();

  const name = product.name;
  const description = product.description;
  const price = product.price.toLocaleString();
  const image = product.image;

  // 상품 name, description, price, image를 각 자리에 할당
  detailContainer.insertAdjacentHTML(
    'beforeend',
    `
          <div id="text">
              <p id="name">${name}</p>
              <p id="description">${description}</p>
              <p id="price">${price}원</p>
          </div>
          <div id="image">
              <img src="${image}">
          </div>
      `
  );
}

// 구매하기 버튼 click Event = 장바구니에 넣어주는 기능
const saveItem = async (e) => {
  const id = location.pathname.replace(/\/detail\/([\d\w]*)\/?/g, '$1');
  const res = await fetch(`/api/product/${id}`);
  const product = await res.json();
  const name = product.name;
  const cnt = 1;
  // 값이 불려졌는지 확인

  if (!name) {
    console.log('DB에 넣을 글 존제하지않습니다.');
    return;
  }
  // indexed 구조 생성
  const item = {
    ...product,
    cnt: cnt,
  };
  // indexedDB open
  let onRequest = indexedDB.open('cart', 1);
  // open 성공했을때
  onRequest.onsuccess = () => {
    // 저장소 생성, 카드 확인
    const database = onRequest.result;
    const transaction = database.transaction('carts', 'readwrite');
    const carts = transaction.objectStore('carts');
    // product indexedDB에 유무 파악
    const a = carts.get(name);
    a.onsuccess = () => {
      if (a.result) {
        console.log(a);
        alert('장바구니에 이미 존재하는 상품입니다.');
        return;
      }
      // 없다면 Put 하고 알림창 띄우기
      const addcmp = carts.put(item, name);
      console.log(addcmp);
      addcmp.onsuccess = () => {
        alert('장바구니 넣었습니다.');
      };
    };
  };
  // database 버전이 낮으면 업그레이드.
  onRequest.onupgradeneeded = () => {
    const database = onRequest.result;
    database.createObjectStore('carts');
    database.createObjectStore('order');
  };
  // indexed가 열리지 않으면 에러 콘솔에 띄우기
  onRequest.onerror = () => {
    console.log('Error creating or accessing db');
  };
};

const buyItem = async (e) => {
  const id = location.pathname.replace(/\/detail\/([\d\w]*)\/?/g, '$1');
  const res = await fetch(`/api/product/${id}`);
  const product = await res.json();
  const name = product.name;
  const cnt = 1;
  // 값이 불려졌는지 확인

  if (!name) {
    console.log('DB에 넣을 글 존제하지않습니다.');
    return;
  }
  // indexed 구조 생성
  const item = {
    ...product,
    cnt: cnt,
  };
  // indexedDB open
  let onRequest = indexedDB.open('cart', 1);
  // open 성공했을때
  onRequest.onsuccess = () => {
    // 저장소 생성, 카드 확인
    const database = onRequest.result;
    const transaction = database.transaction('carts', 'readwrite');
    const carts = transaction.objectStore('carts');
    // product indexedDB에 유무 파악
    const a = carts.get(name);
    a.onsuccess = () => {
      if (a.result) {
        location.pathname = '/cart';
        return;
      }
      // 없다면 Put 하고 알림창 띄우기
      const addcmp = carts.put(item, name);
      console.log(addcmp);
      addcmp.onsuccess = () => {
        location.pathname = '/cart';
      };
    };
  };
  // database 버전이 낮으면 업그레이드.
  onRequest.onupgradeneeded = () => {
    const database = onRequest.result;
    database.createObjectStore('carts');
    database.createObjectStore('order');
  };
  // indexed가 열리지 않으면 에러 콘솔에 띄우기
  onRequest.onerror = () => {
    console.log('Error creating or accessing db');
  };
};

// 구매하기 버튼에 addEventListener 구현
const addIndexbnt = document.querySelector('#cartBtn');
const buyIndexbnt = document.querySelector('#buyBtn');
addIndexbnt.addEventListener('click', saveItem);
buyIndexbnt.addEventListener('click', buyItem);

// indexedDB 저장소 create
const createindexedDB = () => {
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    console.log('Success creating or accessing db');
  };
  onRequest.onupgradeneeded = () => {
    const database = onRequest.result;
    database.createObjectStore('carts');
    database.createObjectStore('order');
  };
  onRequest.onerror = () => {
    console.log('Error creating or accessing db');
  };
};

createindexedDB();
