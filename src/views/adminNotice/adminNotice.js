// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import * as Api from '/api.js';
import headerNavbar from '../components/headerNavbar.js';
import leftMenu from '../components/leftMenu.js';
import insertCategoryList from '../components/navCategoryList.js';
import noticeslist from './noticeslist.js';
import noticesDetail from './noticeDetail.js';

const leftMenuAdmin = document.querySelector('#leftMenuAdmin');
const headerNavbar1 = document.querySelector('#headerNavbar');
const paginationList = document.querySelector('.pagination-list');
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
  const totalPage = notices.totalPage;
  dashboard_content.innerHTML = noticeslist.render(notices);
  //페이지
  //페이지네이션
  for (let i = 1; i <= totalPage; i++) {
    document
      .querySelector('.pagination-list')
      .insertAdjacentHTML(
        'beforeend',
        `<li><a class="pagination-link" id="pagination${i}" href="?page=${i}&perPage=10">${i}</a></li>`
      );
  }

  // 현재 페이지에 해당하는 페이징 버튼 활성화
  const pageBtn = document.getElementById(`pagination${notices.page}`);
  pageBtn.classList.add('activePagination');
  //////////
  //url처리
  let queryParams = new URLSearchParams(window.location.search);
  window.onpopstate = function (event) {
    history.go();
  };
  //공지사항 생성
  document
    .getElementById('create-product-button')
    .addEventListener('click', async () => {
      queryParams.set('create', `notice`);
      history.pushState(null, null, '?' + queryParams.toString());

      const author = document
        .getElementById('userName')
        .innerText.split(' ')[0];
      paginationList.innerHTML = '';
      const result = {
        ...{ author },
      };
      dashboard_content.innerHTML = noticesDetail.render(result, false);
      noticesDetail.componentDidMount();
      await noticesDetail.componentDidMountCreate({ author });
    });

  //공지사항 수정
  const productEditButtons = document.getElementsByClassName(
    'product-edit-button'
  );
  Array.from(productEditButtons).forEach((button) => {
    button.addEventListener('click', async () => {
      queryParams.set('detail', `${button.id}`);
      history.pushState(null, null, '?' + queryParams.toString());
      const result = notices.posts[button.id];
      console.log(result);
      dashboard_content.innerHTML = noticesDetail.render(result, true);
      noticesDetail.componentDidMount();
      await noticesDetail.componentDidMountEdit(result);
      paginationList.innerHTML = '';
    });
  });

  //제품 삭제
  const productDelButtons = document.getElementsByClassName(
    'product-delete-button'
  );
  Array.from(productDelButtons).forEach((button) => {
    button.addEventListener('click', async () => {
      if (confirm('정말로 지우시겠습니까?')) {
        await removeNotice(button.id);
        window.location.reload();
      }
    });
  });
}

//.get('/totalnumOfusers',
//r.get('/notices',
async function getAllNotices() {
  try {
    // 쿼리에서 현재 해당하는 페이지를 가져와서 pageId에 할당
    const pageId = new URLSearchParams(window.location.search).get('page');
    // 페이지네이션 - 각 페이지에 해당하는 url에 들어갔을 때 해당 글 10개만 보여줌
    const data = await Api.get(
      '/api/notice/notices',
      `?page=${pageId}&&perPage=10`
    );
    return data;
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
//delete('/:noticeId'
async function removeNotice(id) {
  try {
    // 쿼리에서 현재 해당하는 페이지를 가져와서 pageId에 할당
    const pageId = new URLSearchParams(window.location.search).get('page');
    // 페이지네이션 - 각 페이지에 해당하는 url에 들어갔을 때 해당 글 10개만 보여줌
    await Api.delete('/api/notice', `${id}`);
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
