const categorylist = {
  render: async (categories) => {
    console.log(categories);
    return `
        <h1>카테고리</h1>
            <button id="create-category-button" class = "primary">
                카테고리 생성 +
            </button>
          <div class="product-list">
                  <table>
                    <thead>
                      <tr>
                        <th>id</th>
                        <th>이름</th>
                        <th class="tr-action"></th>
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
                    <button id="${category._id}" class="category-edit-button button is-primary">수정</button>
                    <button id="${category._id}" class="category-delete-button button is-primary ">삭제</button>
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
export default categorylist;
