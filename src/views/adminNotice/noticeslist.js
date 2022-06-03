const noticeslist = {
  render: (notices) => {
    return `
        <div class="content">
          <h1>NOTICE</h1>
          <button id="create-product-button" class = "button is-info is-light mb-2">
            공지사항 생성 +
          </button>

          <div class="product-list">
          <table class="table is-hoverable">
          <thead>
            <tr>
              <th class="userTh">번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>수정일</th>
              <th class="tr-action"></th>
            </tr>
          </thead>
          <tbody class="noticeList" id="list">
          ${notices.posts
            .map(
              (notice, index) => `
                <tr>
                  <td>${notices.total - (notices.page - 1) * 10 - index}</td>
                  <td>${notice.title}</td>
                  <td class="productContent">${notice.content}</td>
                  <td>${notice.author}</td>
                  <td>${notice.createdAt}</td>
                  <td>${notice.updatedAt}</td>
                  <td>
                    <button id="${index}" class="product-edit-button button is-primary  is-light">수정</button>
                    <button id="${
                      notice._id
                    }" class="product-delete-button is-danger button is-light">삭제</button>
                  </td>
                </tr>
            `
            )
            .join('\n')}
            </tbody>
          </table>
            
          </div>
          </div>
      `;
  },
};
export default noticeslist;
