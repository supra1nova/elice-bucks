import * as Api from '/api.js';

// 카테고리 목록 삽입
async function insertCategoryList() {
  // 카테고리 리스트 삽입할 nav div
  const categoryNav = document.querySelector('.navbar-dropdown');

  // 카테고리 목록을 불러옴
  const categorylist = await Api.get('/api/category', 'categories');

  // forEach로 돌면서 카테고리 id, name을 각 자리에 할당
  categorylist.forEach((category) => {
    const categoryId = category._id;
    const categoryName = category.name;

    categoryNav.insertAdjacentHTML(
      'beforeend',
      `
        <a class="navbar-item" href="/category/${categoryId}">${categoryName}</a>
      `
    );
  });
}

export default insertCategoryList;