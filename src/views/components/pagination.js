import * as Api from '/api.js';

async function pagination(path) {
    // 카테고리 목록을 불러옴
    const pageLists = await Api.get('/api/notice', 'notices');
    console.log(pageLists);

    const noticeList = document.querySelector('.noticeList');
    const paginationContainer = document.querySelector('#paginationContainer');

    const posts = pageLists.posts;  // 한 페이지에 들어가는 공지글 내용 전부
    const page = pageLists.page;  // 현재 보고 있는 페이지
    const perPage = pageLists.perPage;  // 한 페이지에 들어갈 공지글 수
    const totalPage = pageLists.totalPage;  // 전체 페이지 숫자

    console.log("콘솔찍기:" + page, perPage, totalPage);

    posts.forEach(post => {

      noticeList.insertAdjacentHTML(
        'beforeend',
        ` 
          <a href='${path}?page=${page}&perPage=${perPage}'>
          <td class="post"><a href="#}">${post}</a></td>
          </a>
          `
      );
    });

      for (var i = 1; i <= totalPage; i++) {
        if (page == i) {
          paginationContainer.insertAdjacentHTML(
            'beforeend',
            `<li class='on'><a href='/notice/${i}' class='num' id='${i}'>${i}</a></li>`
          );
        } else {
          paginationContainer.insertAdjacentHTML(
            'beforeend',
            `<li><a href='/notice/${i}' class='num' id='${i}'>${i}</a></li>`
          );
        }
      }

      


}

export default pagination;