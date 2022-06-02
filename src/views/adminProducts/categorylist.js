const categorylist = {
  render: (categories) => {
    return `
    <div class="content">
      <h1>카테고리</h1>
      <button id="create-category-button" class = "button is-info is-light mb-2">
        카테고리 생성 +
      </button>
          <div class="product-list">
                  <table class="table is-hoverable">
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>이름</th>
                        <th class="ctr-action"></th>
                      </tr>
                    </thead>
                    <tbody >
        ${categories
          .map(
            (category) => `
                <tr>
                  <td>${category._id}</td>
                  <td>
                      <div > 
                          <div class="control field" >
                              <input
                              class="input"
                              id="nameInput${category._id}"
                              type="text"
                              placeholder="제품 이름"
                              autocomplete="on"
                              value="${category.name}"
                              />
                          </div>
                      </div>
                  </td>
                  <td>
                    <button id="${category._id}" class="category-edit-button button is-primary  is-light">바로수정</button>
                    <button id="${category._id}" class="category-delete-button button is-danger   is-light">삭제</button>
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
export default categorylist;
