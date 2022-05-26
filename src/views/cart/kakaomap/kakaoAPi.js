// 자유롭게 코드를 작성해 보세요.
const receiverNameInput = document.querySelector('#receiverName');
const receiverPhoneNumberInput = document.querySelector('#receiverPhoneNumber');
const postalCodeInput = document.querySelector('#postalCode');
const searchAddressButton = document.querySelector('#searchAddressButton');
const address1Input = document.querySelector('#address1');
const address2Input = document.querySelector('#address2');
const requestSelectBox = document.querySelector('#requestSelectBox');
const orderButton = document.querySelector('#orderButton');

// 이벤트 추가
searchAddressButton.addEventListener('click', searchAddress);
orderButton.addEventListener('click', doCheckout);

// 이벤트에 사용할 함수
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = '';
      let extraAddr = '';

      if (data.userSelectedType === 'R') {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === 'R') {
        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== '' && data.apartment === 'Y') {
          extraAddr +=
            extraAddr !== '' ? ', ' + data.buildingName : data.buildingName;
        }
        if (extraAddr !== '') {
          extraAddr = ' (' + extraAddr + ')';
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
}

async function doCheckout() {
  // 각 입력값 가져옴
  const receiverName = receiverNameInput.value;
  const receiverPhoneNumber = receiverPhoneNumberInput.value;
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const request = requestSelectBox.value;

  // 입력이 안 되어 있을 시
  if (!receiverName || !receiverPhoneNumber || !postalCode || !address2) {
    return alert('배송지 정보를 모두 입력해 주세요.');
  }

  // 객체 만듦
  const data = {
    receiverName,
    receiverPhoneNumber,
    postalCode,
    address1,
    address2,
    request,
  };

  // JSON 만듦
  const dataJson = JSON.stringify(data);
  const apiUrl = `https://${window.location.hostname}:8190/api/order`;

  // POST 요청
  const res = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: dataJson,
  });

  if (res.status === 201) {
    alert('주문에 성공하였습니다!');
  } else {
    alert('주문에 실패하였습니다...');
  }
}
