// navbar 로그인 부분
import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';
import * as Api from '/api.js';

const headerNavbar1 = document.querySelector('#headerNavbar');
const noticeContainer = document.querySelector('.noticeContainer');
const paginationList = document.querySelector('.pagination-list');

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
  const pageId = new URLSearchParams(window.location.search).get('page');

  // 페이지네이션 - 각 페이지에 해당하는 url에 들어갔을 때 해당 글 10개만 보여줌
  const noticeList = await Api.get(
    '/api/notice/notices',
    `?page=${pageId}&perPage=10`
  );

  // 페이지네이션 목록
  const notices = noticeList.posts; // 한 페이지에 들어가는 공지글 내용 전부
  const page = noticeList.page; // 현재 보고 있는 페이지
  const perPage = noticeList.perPage; // 한 페이지에 들어갈 공지글 수
  const totalPage = noticeList.totalPage; // 전체 페이지 숫자
  const total = noticeList.total; // 전체 공지사항 개수

  // forEach로 돌면서 공지글의 id, title, time, author 각 자리에 할당
  notices.map((notice, index) => {
    const id = notice._id;
    const title = notice.title;
    const author = notice.author;
    // 날짜는 요일, 월, 일, 연도 까지만 나오도록 자르고, 문자열로 합쳐서 반환
    const time = Date(notice.createdAt).split(' ', 4).join(' ');

    noticeContainer.insertAdjacentHTML(
      'beforeend',
      ` 
        <td class="index">${total - (pageId - 1) * 10 - index}</a></td>
        <td class="title"><a href="/notice/${id}">${title}</a></td>
        <td class="author">${author}</td>
        <td class="date">${time}</td>
      `
    );
  });

  // 페이징 버튼 목록
  for (let i = 1; i <= totalPage; i++) {
    document.querySelector('.pagination-list').insertAdjacentHTML(
      'beforeend',
      `<li><a class="pagination-link" id="${i}" href="?page=${i}&perPage=10">${i}</a></li>`
    );
  }

  // 현재 페이지에 해당하는 페이징 버튼 활성화
  const pageBtn = document.getElementById(`${pageId}`);
  pageBtn.classList.add('active');

}
