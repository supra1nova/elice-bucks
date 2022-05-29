// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import { randomId } from '/useful-functions.js';
import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';

const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();
insertCategoryList();

// navbar 로그인 상태에 따른 로그인 메뉴 삽입
async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}