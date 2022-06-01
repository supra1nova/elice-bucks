const adminDetail = {
  render: (order) => {
    console.log(order);
    const user = order[0].userId;
    const totalPrice = order[0].totalPrice;
    const createdAt = order[0].createdAt;
    const paid = order[0].paid;
    const delivered = order[0].delivered;
    const deletedAt = order[0].deletedAt;
    const updatedAt = order[0].updatedAt;
    const productsInfos = order[1];
    return `
    <label class="label infoSection"><h1>주문정보</h1></label>
    <hr/>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label class="label">유저 아이디</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="Name" value="${user}">
                </p>
            </div>
            <div class="field">
                <label class="label">유저 이름</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="Name" value="${user}">
                </p>
            </div>
            <div class="field">
                <label class="label">총 가격</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="가격" value="${totalPrice}">
                </p>
            </div>
            <div class="field">
                <label class="label">주문일</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="Name" value="${createdAt}">
                </p>
            </div>
        </div>
    </div>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label class="label">결제일</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="결제일" value="${paid}">
                </p>
            </div>
            <div class="field">
                <label class="label">배달일</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="배달일" value="${delivered}">
                </p>
            </div>
            <div class="field">
                <label class="label">주문취소</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="주문취소" value="${deletedAt}">
                </p>
            </div>
            <div class="field">
                <label class="label">수정일</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="수정일" value="${updatedAt}">
                </p>
            </div>
        </div>
    </div>
    <label class="label infoSection"><h1>주문 제품</h1></label>
    <hr/>
    ${productsInfos.map((productOrder, index) => {
      console.log(productsInfos);
      console.log(productOrder);
      const products = productOrder.productsId;
      console.log(products);
      return products
        .map(
          (product, index) =>
            `
      <div class="field is-horizontal">
      <div class="field-body">
          <div class="field">
              <label class="label">${index + 1}번 제품 이름</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="결제일" value="${product}">
              </p>
          </div>
          <div class="field">
              <label class="label">1개 가격</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="배달일" value="${delivered}">
              </p>
          </div>
          <div class="field">
              <label class="label">카테고리</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="주문취소" value="${deletedAt}">
              </p>
          </div>
          <div class="field">
              <label class="label">재고</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="수정일" value="${updatedAt}">
              </p>
          </div>
          </div>
      </div>
      <div class="field is-horizontal">
      <div class="field-body">
          <div class="field">
              <label class="label">이미지</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="이미지" value="${product}">
              </p>
          </div>
          <div class="field">
              <label class="label">주문수량</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="배달일" value="${delivered}">
              </p>
          </div>
          <div class="field">
              <label class="label">주문금액</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="주문취소" value="${deletedAt}">
              </p>
          </div>
          </div>
      </div>
      <br>
      <br>
      `
        )
        .join('\n');
    })}
    <button class="product-edit-button button is-primary is-fullwidth mb-1">수정</button>
      <button class="product-delete-button button is-danger is-fullwidth mb-5 ">취소</button>
    `;
  },
};
export default adminDetail;
