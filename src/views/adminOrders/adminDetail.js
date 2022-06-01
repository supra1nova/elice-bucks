const adminDetail = {
  render: (oneOrder) => {
    console.log(oneOrder);
    const order = oneOrder.orderId;
    const user = order?.userId;
    const totalPrice = order?.totalPrice;
    const createdAt = order?.createdAt;
    const paid = order?.paid;
    const delivered = order?.delivered;
    const deletedAt = order?.deletedAt;
    const updatedAt = order?.updatedAt;
    const productsInfos = oneOrder.productsId;
    const postalCode = order?.address?.postalCode;
    const address1 = order?.address?.address1;
    const address2 = order?.address?.address2;
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
    <label class="label infoSection"><h1>주소정보</h1></label>
    <hr/>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label class="label">우편번호</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="Name" value="${postalCode}">
                </p>
            </div>
            <div class="field">
                <label class="label">주소 1</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="Name" value="${address1}">
                </p>
            </div>
            <div class="field">
                <label class="label">주소 2</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="가격" value="${address2}">
                </p>
            </div>
        </div>
    </div>
    <label class="label infoSection"><h1>주문 제품</h1></label>
    <hr/>
    ${productsInfos
      .map((productInfo, index) => {
        console.log(productsInfos);
        console.log(productInfo);
        const product = productInfo.productId;
        console.log(product);
        return `
      <div class="field is-horizontal">
      <div class="field-body">
          <div class="field">
              <label class="label">${index + 1}번 제품 이름</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="결제일" value="${
                product.name
              }">
              </p>
          </div>
          <div class="field">
              <label class="label">1개 가격</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="배달일" value="${
                product.price
              }">
              </p>
          </div>
          <div class="field">
              <label class="label">재고</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="수정일" value="${
                product.stock
              }">
              </p>
          </div>
          </div>
      </div>
      <div class="field is-horizontal">
      <div class="field-body">
          <div class="field">
              <label class="label">이미지</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="이미지" value="${
                product.image
              }">
              </p>
          </div>
          <div class="field">
              <label class="label">주문수량</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="배달일" value="${
                productInfo.productQty
              }">
              </p>
          </div>
          <div class="field">
              <label class="label">주문금액</label>
              <p class="control is-expanded">
              <input class="input" type="text" placeholder="주문취소" value="${
                productInfo.productQty * productInfo.productPrice
              }">
              </p>
          </div>
          </div>
      </div>
      <br>
      <br>
      `;
      })
      .join('\n')}
    <button class="product-edit-button button is-primary is-fullwidth mb-1">수정</button>
      <button class="product-delete-button button is-danger is-fullwidth mb-5 ">취소</button>
    `;
  },
};
export default adminDetail;
