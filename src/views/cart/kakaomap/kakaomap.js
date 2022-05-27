const Main = document.querySelector('.main');
const paymentInf = `
<div class="tile is-parent tile-order-summary">
<div class="box order-summary">
  <div class="header">
    <p>결제정보</p>
  </div>
  <div class="order-info">
    <div class="info">
      <p>상품수</p>
      <p id="productsCount">1개</p>
    </div>
    <div class="info">
      <p>상품금액</p>
      <p id="productsTotal"> 0 원</p>
    </div>
    <div class="info">
      <p>배송비</p>
      <p id="deliveryFee">3,000원</p>
    </div>
  </div>
  <div class="total">
    <p class="total-label">총 결제금액</p>
    <p class="total-price" id="orderTotal">192,000원</p>
  </div>
  <div class="purchase">
    <button class="button is-info" id="purchaseButton">
      구매하기
    </button>
  </div>
</div>
</div>`;

Main.insertAdjacentHTML('beforeend', paymentInf);
