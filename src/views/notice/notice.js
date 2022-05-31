// navbar 로그인 부분
import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';
import * as Api from '/api.js';

const headerNavbar1 = document.querySelector('#headerNavbar');
const noticeList = document.querySelector('.noticeList');
const paginationList = document.querySelector('.pagination-list');

// if ( window.location == '/notice' ) {
//   window.location.href='/notice/?page=1&&perPage=10';
// }

addAllElements();
insertCategoryList();
insertNoticeList();

// navbar 로그인 상태에 따른 로그인 메뉴 삽입
async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}

// 공지사항 데이터를 html에 삽입 (페이지네이션 적용)
async function insertNoticeList() {
  // 쿼리에서 현재 해당하는 페이지를 가져와서 pageId에 할당
  const pageId = new URLSearchParams(window.location.search).get('page')

  // 페이지네이션 - 각 페이지에 해당하는 url에 들어갔을 때 해당 글 10개만 보여줌
  const notices = await Api.get('/api/notice/notices', `?page=${pageId}&&perPage=10`);

  // 페이지네이션 목록
  const posts = notices.posts;  // 한 페이지에 들어가는 공지글 내용 전부
  const totalPage = notices.totalPage;  // 전체 페이지 숫자

  // 페이지네이션 글들이 줄줄이 이어서 뜨지 않도록 리셋
  noticeList.innerHTML = '';
  
  // forEach로 돌면서 공지글의 id, title, time, author 각 자리에 할당
  posts.forEach(post => {
    const id = post._id;
    const title = post.title;
    const time = Date(post.createdAt);
    const author = post.author;

    noticeList.insertAdjacentHTML(
      'beforeend',
      ` 
        <th class="bullet">•</th>
        <td class="title"><a href="/notice/${id}">${title}</a></td>
        <td class="author">${author}</td>
        <td class="date">${time}</td>
      `
    );
  });

  // 페이징 번호 목록
  for (let i = 1; i <= totalPage; i++) {
    paginationList.insertAdjacentHTML(
      'beforeend',
      `<li><a class="pagination-link" href="?page=${i}&&perPage=10">${i}</a></li>`
    );

  }
}