// navbar 로그인 부분
import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';

const headerNavbar1 = document.querySelector('#headerNavbar');
const noticeList = document.querySelector('.noticeList');

addAllElements();
insertCategoryList();
insertNoticeList();

// navbar 로그인 상태에 따른 로그인 메뉴 삽입
async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}

// 공지사항 데이터를 html에 삽입
async function insertNoticeList() {
  // '/api/notice' 에서 전체 상품 목록을 json으로 받아옴
  const res = await fetch('notice.json');
  const notices = await res.json();

  // forEach로 돌면서 상품 id, image, name, price를 각 자리에 할당
  notices.forEach((notice) => {
    const id = notice._id;
    const title = notice.title;
    const timestamps = notice.timestamps;
    const author = notice.author;

    noticeList.insertAdjacentHTML(
      'beforeend',
      ` 
        <th class="num">순번</th>
        <td class="title"><a href="/notice/${id}">${title}</a></td>
        <td class="author">${author}</td>
        <td class="date">${timestamps}</td>
        `
    );
  });
}