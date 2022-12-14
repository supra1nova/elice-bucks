import { addCommas } from '/useful-functions.js';
const productlist = {
  render: (products) => {
    return `
    <hr/>
    <div class="content">
        <h1>제품</h1>
          <button id="create-product-button" class = "button is-info is-light mb-2">
            제품 생성 +
          </button>
          <div class="product-list">
          <div class ="table-container">
          <table class="table is-hoverable">
          <thead>
            <tr>
              <th>품명</th>
              <th>가격</th>
              <th>카테고리</th>
              <th>이미지</th>
              <th>설명</th>
              <th>재고</th>
              <th class="tr-action"></th>
            </tr>
          </thead>
          <tbody >
          ${products
            .map(
              (product, index) => `
                <tr>
                  <td>${product.name}</td>
                  <td>${addCommas(product.price)}</td>
                  <td class="productImage1">${
                    product.category?.name ? product.category.name : ''
                  }</td>
                  <td class="productImage1">
                  <img src ="${
                    product.image
                  }"  width="300" height="30" id="product-image-file" /></td>
                  <td>${product.description}</td>
                  <td>${addCommas(product.stock)}</td>
                  <td>
                    <button id="${index}" class="product-edit-button button is-primary  is-light">수정</button>
                    <button id="${
                      product._id
                    }" class="product-delete-button button is-danger   is-light">삭제</button>
                  </td>
                </tr>
            `
            )
            .join('\n')}
            </tbody>
          </table>
          </div>
          </div>
          </div>
          <!--페이지네이션-->
          <nav class="pagination is-rounded is-small is-centered mt-3 mb-5" role="navigation" aria-label="pagination">
            <ul class="pagination-list">
    
            </ul>
          </nav>
          <!--페이지네이션 끝-->
              
      `;
  },
};
export default productlist;
