const orderslist = {
  render: (orders) => {
    return `
          <h1>주문</h1>
          <!--
          <button id="create-product-button" class = "primary ">
            오더 생성 +
          </button>
          -->
          <div class="product-list">
          <table>
          <thead>
            <tr>
              <th>유저</th>
              <th>가격</th>
              <th>카테고리</th>
              <th>이미지</th>
              <th>설명</th>
              <th class="tr-action"></th>
            </tr>
          </thead>
          <tbody >
          ${orders
            .map(
              (order) =>
                `
                <tr>
                  <td>${order[0].userId}</td>
                  <td>${order[0].totalPrice}</td>
                  <td class="productImage1"></td>
                  <td class="productImage1">
                  <img src ="${order.image}"  width="300" height="30" id="product-image-file" /></td>
                  <td></td>
                  <td>
                    <button id="${order._id}" class="product-edit-button button is-primary">수정</button>
                    <button id="${order._id}" class="product-delete-button button is-primary">삭제</button>
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
export default orderslist;
