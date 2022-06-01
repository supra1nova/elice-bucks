const kakaomap = () => {
  const Main = document.querySelector('.main');
  const KaKaomap = `<div class="container">
<div class="box delivery-info">
  <!-- 배송지 정보 -->
  <p class="subtitle is-4">배송지정보</p>
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" for="receiverName">이름</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="receiverName"
            type="text"
            placeholder="받는 분 이름을 입력해 주세요."
            autocomplete="on"
          />
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" for="receiverPhoneNumber">연락처</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="receiverPhoneNumber"
            type="number"
            placeholder="- 없이 입력해 주세요."
            autocomplete="on"
          />
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" for="address2">주소</label>
    </div>
    <div class="field-body search">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="postalCode"
            type="text"
            placeholder=""
            readonly
          />
        </p>
      </div>
      <div>
        <button
          class="button is-light is-hovered"
          id="searchAddressButton"
        >
          주소찾기
        </button>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal no-label"></div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="address1"
            type="text"
            placeholder=""
            autocomplete="on"
            readonly
          />
        </p>
      </div>
    </div>
  </div>

  <div class="field is-horizontal">
    <div class="field-label is-normal no-label"></div>
    <div class="field-body">
      <div class="field">
        <p class="control">
          <input
            class="input"
            id="address2"
            type="text"
            placeholder=""
            autocomplete="on"
          />
        </p>
      </div>
    </div>
  </div>
</div>
</div>`;

  Main.insertAdjacentHTML('beforeend', KaKaomap);
};

export { kakaomap };
