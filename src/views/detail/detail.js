// navbar 로그인 부분
import headerNavbar from '../components/headerNavbar.js';
const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();
async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}

// 각 상품에 맞는 데이터를 html 요소에 삽입
const container = document.querySelector('#container');

insertProductDetail();

async function insertProductDetail() {
    const id = location.pathname.replace(/\/detail\/([\d\w]*)\/?/g, '$1');
    const res = await fetch(`/api/product/${id}`);
    const product = await res.json();

  const name = product.name;
  const description = product.description;
  const price = product.price;
  const image = product.image;

  container.insertAdjacentHTML(
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

//// 구매하기 버튼 click Event = 장바구니에 넣어주는 기능

const saveItem = async (e) => {
  const id = location.pathname.replace(/\/detail\/([\d\w]*)\/?/g, '$1');
  const res = await fetch(`/api/product/${id}`);
  const product = await res.json();
  const description = product.description;
  const name = product.name;
  const price = product.price;
  const image = product.image;
  const cnt = 1;
  // 값이 불려졌는지 확인
  if (!name) {
    console.log('DB에 넣을 글 존제하지않습니다.');
    return;
  }
  // indexed 구조 생성
  const item = {
    product: product,
    name: name,
    price: price,
    img: `${image}`,
    cnt: cnt,
    id: id,
    description: description,
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
  };
  // indexed가 열리지 않으면 에러 콘솔에 띄우기
  onRequest.onerror = () => {
    console.log('Error creating or accessing db');
  };
};
// 구매하기 버튼에 addEventListener 구현
const addIndexbnt = document.querySelector('.addIndexDB');
addIndexbnt.addEventListener('click', saveItem);

// indexedDB 저장소 create
const createindexedDB = () => {
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
};

createindexedDB();
