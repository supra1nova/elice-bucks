import headerNavbar from '../components/headerNavbar.js';
import { kakaomap } from './kakaomap/kakaomap.js';
import insertCategoryList from '../components/navCategoryList.js';

const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();
insertCategoryList();
kakaomap();
createindexedDB();

async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}

async function createindexedDB() {
  let onRequest = await indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    console.log('orderDB 생성');
  };
  onRequest.onupgradeneeded = () => {
    const database = onRequest.result;
    database.createObjectStore('order');
  };
  onRequest.onerror = () => {
    console.log('Error creating or accessing db');
  };
}
