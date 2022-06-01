const orderslist = {
  render: (orders) => {
    console.log(orders);
    return `
    <div class="content">
      <h1 class="tableTitle">주문</h1>
          <!--
          <button id="create-product-button" class = "primary ">
            오더 생성 +
          </button>
          -->
          <div class="product-list">
          <table class="table is-hoverable">
          <thead>
            <tr>
              <th>유저</th>
              <th>가격</th>
              <th>주문일</th>
              <th>결제일</th>
              <th>배달일</th>
              <th>주문취소</th>
              <th>수정일</th>
              <th class="tr-action"></th>
            </tr>
          </thead>
          <tbody class="noticeContainer" id="list">
          ${orders
            .map(
              (order) =>
                `
                <tr>
                  <td class="productImage1">${order[0].userId}</td>
                  <td>${order[0].totalPrice}</td>
                  <td>${order[0].createdAt}</td>
                  <td>${order[0].paid}</td>
                  <td>${order[0].delivered}</td>
                  <td>${order[0].deletedAt ? order[0].deletedAt : ''}</td>
                  <td>${order[0].updatedAt ? order[0].updatedAt : ''}</td>
                  <!---<td class="productImage1">-->
                  <td>
                    <button id="${
                      order[0]._id
                    }" class="product-edit-button button is-primary  is-light">상세보기</button>
                    <button id="${
                      order._id
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
export default orderslist;
