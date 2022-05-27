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

  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" for="requestSelectBox">요청사항</label>
    </div>
    <div class="field-body">
      <div class="select">
        <select id="requestSelectBox">
          <option value="배송시 요청사항을 선택해 주세요.">
            배송시 요청사항을 선택해 주세요.
          </option>
          <option value="직접 수령하겠습니다." class="select-option">
            직접 수령하겠습니다.
          </option>
          <option value="배송 전 연락바랍니다." class="select-option">
            배송 전 연락바랍니다.
          </option>
          <option
            value="부재 시 경비실에 맡겨주세요."
            class="select-option"
          >
            부재 시 경비실에 맡겨주세요.
          </option>
          <option
            value="부재 시 문 앞에 놓아주세요."
            class="select-option"
          >
            부재 시 문 앞에 놓아주세요.
          </option>
          <option
            value="부재 시 택배함에 넣어주세요."
            class="select-option"
          >
            부재 시 택배함에 넣어주세요.
          </option>
          <option value="직접 입력" class="select-option">
            직접 입력
          </option>
        </select>
      </div>
    </div>
  </div>
  
  <div class="field is-horizontal">
    <div class="field-label is-normal">
      <label class="label" for="receiverPhoneNumber">최종 결제 금액</label>
    </div>
    <div class="field-body is-normal">
      <div class="field">
        <p class=" column has-text-right totalPrice">
          0 원
        </p>
      </div>
    </div>
  </div>

  <button class="button is-primary" id="orderButton" >주문하기</button>
</div>
</div>`;

Main.insertAdjacentHTML('beforeend', KaKaomap);
