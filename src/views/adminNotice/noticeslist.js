const noticeslist = {
  render: async (notices) => {
    return `
          <h1>공지사항</h1>
          <button id="create-product-button" class = "primary ">
            공지사항 생성 +
          </button>
          <div class="product-list">
          <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>내용</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>수정일</th>
              <th class="tr-action"></th>
            </tr>
          </thead>
          <tbody >
          ${notices
            .map(
              (notice, index) => `
                <tr>
                  <td>${index}</td>
                  <td>${notice.title}</td>
                  <td>${notice.content}</td>
                  <td>${notice.author}</td>
                  <td>${notice.createdAt}</td>
                  <td>${notice.updatedAt}</td>
                  <td>
                    <button id="${notice._id}" class="product-edit-button button is-primary">수정</button>
                    <button id="${notice._id}" class="product-delete-button button is-primary">삭제</button>
                  </td>
                </tr>
            `
            )
            .join('\n')}
            </tbody>
          </table>
            
          </div>
              
      `;
  },
};
export default noticeslist;
