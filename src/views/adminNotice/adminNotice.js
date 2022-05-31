// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import headerNavbar from '../components/headerNavbar.js';
import leftMenu from '../components/leftMenu.js';
import insertCategoryList from '../components/navCategoryList.js';
import noticeslist from './noticeslist.js';

const leftMenuAdmin = document.querySelector('#leftMenuAdmin');
const headerNavbar1 = document.querySelector('#headerNavbar');
const mainContent = document.querySelector('#mainContent');
const dashboard_content = document.querySelector('#dashboard-content');

addAllElements();
insertCategoryList();

async function addAllElements() {
  headerNavbar1.innerHTML = headerNavbar.render();
  leftMenuAdmin.innerHTML = leftMenu.render({
    selected: 'notice',
  });
  headerNavbar.componentDidMount();
  const notices = await getAllNotices();
  console.log(notices);
  dashboard_content.innerHTML = await noticeslist.render(notices.posts);
  console.log(notices);
}

//.get('/totalnumOfusers',
//r.get('/notices',
async function getAllNotices() {
  try {
    const data = await Api.get('/api/notice', 'notices');
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
