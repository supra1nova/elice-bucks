import { setPaid, setDelivered, setDeletedAt } from './adminOrders.js';
const adminDetail = {
  componentDidMount: async () => {
    //결제처리
    const paidButton = document.getElementsByClassName('paid-button');
    Array.from(paidButton).forEach((button) => {
      button.addEventListener('click', async () => {
        if (!confirm('결제처리 하시겠습니까?')) {
          return;
        }
        await setPaid(button.id);
      });
    });
    //배송처리
    const deliveredButton = document.getElementsByClassName('delivered-button');
    Array.from(deliveredButton).forEach((button) => {
      button.addEventListener('click', async () => {
        if (button.classList.contains('false')) {
          alert('먼저 결제처리 해주세요');
          return;
        }
        if (!confirm('배송처리 하시겠습니까?')) {
          return;
        }
        await setDelivered(button.id);
      });
    });
    //주문 취소 처리
    const deletedAtButton = document.getElementsByClassName('deletedAt-button');
    Array.from(deletedAtButton).forEach((button) => {
      button.addEventListener('click', async () => {
        if (!confirm('정말로 삭제하시겠습니까?')) {
          return;
        }
        await setDeletedAt(button.id);
      });
    });
    const goBackButton = document.getElementById('goBack');
    goBackButton.addEventListener('click', () => {
      window.location.href = `/adminOrders`;
    });
  },
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
    const productsInfos = oneOrder.productsId; // schema 바뀌어서 여기 products 로 바꾸셔야 할 듯 합니다..!(zinger)
    const postalCode = order?.address?.postalCode;
    const address1 = order?.address?.address1;
    const address2 = order?.address?.address2;
    let deletedFlag = false;
    if (order?.deletedAt && !order?.deletedAt?.startsWith('1')) {
      deletedFlag = true;
    }
    let paidFlag = false;
    if (order?.paid && !order?.paid?.startsWith('1')) {
      paidFlag = true;
    }
    return `
    <label class="label infoSection"><h1>주문정보</h1></label>
    <hr/>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label class="label">유저 아이디</label>
                <p class="control is-expanded">
                <input readOnly class="input" type="text" placeholder="Name" value="${user}">
                </p>
            </div>
            <div class="field">
                <label class="label">유저 이름</label>
                <p class="control is-expanded">
                <input readOnly class="input" type="text" placeholder="Name" value="${user}">
                </p>
            </div>
            <div class="field">
                <label class="label">총 가격</label>
                <p class="control is-expanded">
                <input readOnly class="input" type="text" placeholder="가격" value="${totalPrice}">
                </p>
            </div>
            <div class="field">
                <label class="label">주문일</label>
                <p class="control is-expanded">
                <input readOnly class="input" type="text" placeholder="Name" value="${createdAt}">
                </p>
            </div>
        </div>
    </div>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label class="label">결제일</label>
                <p class="control is-expanded">
                ${
                  (order?.paid?.startsWith('1') &&
                    (deletedFlag
                      ? `<input
                      readOnly
                      class="input"
                      type="text"
                      placeholder="결제일"
                      value="주문취소"
                    >`
                      : `<input
                      readOnly
                      id = "${order?._id}"
                      class="input paid-button button is-success is-light"
                      type="text"
                      placeholder="결제일"
                      value="결제처리"
                    >`)) ||
                  (order?.delivered &&
                    `<input
                    readOnly
                    class="input"
                    type="text"
                    placeholder="결제일"
                  value="${order.paid}"
                >`) ||
                  `<input
                      readOnly
                      class="input"
                      type="text"
                      placeholder="결제일"
                      value=""
                    >`
                }
                </p>
            </div>
            <div class="field">
                <label class="label">배달일</label>
                <p class="control is-expanded">
                ${
                  (order?.delivered?.startsWith('1') &&
                    (deletedFlag
                      ? `<input
                      readOnly
                      class="input"
                      type="text"
                      placeholder="배송일"
                      value="주문취소"
                    >`
                      : `<input
                      readOnly
                      id = "${order?._id}"
                      class="${paidFlag} input delivered-button button is-info is-light"
                      type="text"
                      placeholder="배송일"
                      value="배송처리"
                    >`)) ||
                  (order?.delivered &&
                    `<input
                    readOnly
                    class="input"
                    type="text"
                    placeholder="배송일"
                  value="${order.delivered}"
                >`) ||
                  `<input
                      readOnly
                      class="input"
                      type="text"
                      placeholder="배송일"
                      value=""
                    >`
                }
                </p>
            </div>
            <div class="field">
                <label class="label">주문취소</label>
                <p class="control is-expanded">
                ${
                  (order?.deletedAt?.startsWith('1') &&
                    `
                    <input
                    readOnly
                    id = "${order?._id}"
                    class="input deletedAt-button is-danger button is-light"
                    type="text"
                    value="주문취소"
                  >
                  `) ||
                  (order?.deletedAt &&
                    `<input readOnly class="input" type="text" placeholder="주문취소" value="${order.deletedAt}">`) ||
                  `<input readOnly class="input" type="text" placeholder="주문취소" value="">`
                }
                </p>
            </div>
            <div class="field">
                <label class="label">수정일</label>
                <p class="control is-expanded">
                <input readOnly class="input" type="text" placeholder="수정일" value="${updatedAt}">
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
                <input readOnly class="input" type="text" placeholder="Name" value="${postalCode}">
                </p>
            </div>
            <div class="field">
                <label class="label">주소 1</label>
                <p class="control is-expanded">
                <input readOnly class="input" type="text" placeholder="Name" value="${address1}">
                </p>
            </div>
            <div class="field">
                <label class="label">주소 2</label>
                <p class="control is-expanded">
                <input readOnly class="input" type="text" placeholder="가격" value="${address2}">
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
              <input readOnly class="input" type="text" placeholder="결제일" value="${
                product.name
              }">
              </p>
          </div>
          <div class="field">
              <label class="label">1개 가격</label>
              <p class="control is-expanded">
              <input readOnly class="input" type="text" placeholder="배달일" value="${
                product.price
              }">
              </p>
          </div>
          <div class="field">
              <label class="label">재고</label>
              <p class="control is-expanded">
              <input readOnly class="input" type="text" placeholder="수정일" value="${
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
              <input readOnly class="input" type="text" placeholder="이미지" value="${
                product.image
              }">
              </p>
          </div>
          <div class="field">
              <label class="label">주문수량</label>
              <p class="control is-expanded">
              <input readOnly class="input" type="text" placeholder="배달일" value="${
                productInfo.productQty
              }">
              </p>
          </div>
          <div class="field">
              <label class="label">주문금액</label>
              <p class="control is-expanded">
              <input readOnly class="input" type="text" placeholder="주문취소" value="${
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
      <button id="goBack" class="is-medium product-delete-button button is-warning is-light is-fullwidth mb-5 ">뒤로가기</button>
    `;
  },
};
export default adminDetail;
