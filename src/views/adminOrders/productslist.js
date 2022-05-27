const productlist = {
  render: async (products) => {
    return `
          <h1>제품</h1>
          <button id="create-product-button" class = "primary ">
            제품 생성 +
          </button>
          <div class="product-list">
          <table>
          <thead>
            <tr>
              <th>품명</th>
              <th>가격</th>
              <th>카테고리</th>
              <th>이미지</th>
              <th>설명</th>
              <th class="tr-action"></th>
            </tr>
          </thead>
          <tbody >
          ${products
            .map(
              (product) => `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td class="productImage1">${product.category}</td>
                  <td class="productImage1">
                  <img src ="${product.image}"  width="300" height="30" id="product-image-file" /></td>
                  <td>${product.description}</td>
                  <td>
                    <button id="${product._id}" class="product-edit-button button is-primary">수정</button>
                    <button id="${product._id}" class="product-delete-button button is-primary">삭제</button>
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
export default productlist;
