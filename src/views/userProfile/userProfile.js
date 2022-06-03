import * as Api from '/api.js';

import headerNavbar from '../components/headerNavbar.js';
import { validateProfile, validateDeleteUser } from '/utils/validateForm.js';
import insertCategoryList from '../components/navCategoryList.js';
import { removeUser } from '../utils/user.js';
import alertModal from '/components/alertModal.js';
import alertGreenModal from '/components/alertGreenModal.js';
// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const userDeletePasswordInput = document.querySelector(
  '#userDeletePasswordInput'
);

const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const headerNavbar1 = document.querySelector('#headerNavbar');
const phoneNumber1 = document.querySelector('#phoneNumberInput');
const curpasswordInput = document.querySelector('#curpasswordInput');
const loginForm = document.querySelector('#loginForm');

const searchAddressButton = document.querySelector('#searchAddressButton');
const address1Input = document.querySelector('#address1Input');
const address2Input = document.querySelector('#address2Input');
const postalCodeInput = document.querySelector('#postalCodeInput');

//const postalCodeInput = document.querySelector('#postalCode');
//const searchAddressButton = document.querySelector('#searchAddressButton');
//const address1Input = document.querySelector('#address1');
//const address2Input = document.querySelector('#address2');

addAllEvents();
insertCategoryList();

// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.

let userId = '';
const setUserId = (_id) => {
  userId = _id;
};
// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllEvents() {
  headerNavbar1.innerHTML = headerNavbar.render();
  headerNavbar.componentDidMount();
  const result = await Api.get(`/api/user`);
  setUserId(result._id);
  console.log(result);
  //address1Input.value = result.address ? result.address.address1 : '';
  //address2Input.value = result.address ? result.address.address2 : '';
  //postalCodeInput.value = result.address ? result.address.postalCode : '';
  phoneNumber1.value = result.phoneNumber ? result.phoneNumber : '';
  emailInput.value = result.email;
  fullNameInput.value = result.fullName;
  submitButton.addEventListener('click', handleSubmit);
  loginForm.addEventListener('submit', deleteUser);
  searchAddressButton.addEventListener('click', searchAddress);
}

// 회원정보 수정 진행
async function handleSubmit(e) {
  e.preventDefault();
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const postalCode = postalCodeInput.value;
  const currentPassword = curpasswordInput.value;
  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const password = passwordInput.value;
  const passwordConfirm = passwordConfirmInput.value;
  const phoneNumber = phoneNumber1.value;
  // 잘 입력했는지 확인
  try {
    validateProfile(
      fullName,
      email,
      currentPassword,
      password,
      passwordConfirm
    );
  } catch (err) {
    return alertModal.alertModalActivate(err);
  }

  // 회원수정 api 요청
  try {
    const data = {
      fullName,
      email,
      password,
      address: { address1, address2, postalCode },
      phoneNumber,
      currentPassword,
    };

    const result = await Api.patch('/api/user', `${userId}`, data);
    const token = result.token;
    // 수정 성공, 토큰을 세션 스토리지에 저장
    localStorage.setItem('token', token);
    alertGreenModal.alertModalActivate(
      `정상적으로 수정되었습니다.`,
      function () {
        window.location.href = '/';
      }
    );
    // 홈 페이지 이동
  } catch (err) {
    console.error(err.stack);
    alertModal.alertModalActivate(
      `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
    );
  }
}
//userRouter.delete('/user/:userId'
async function deleteUser(e) {
  e.preventDefault();

  const password = userDeletePasswordInput.value;
  try {
    validateDeleteUser(password);
  } catch (err) {
    return alertModal.alertModalActivate(err);
  }
  if (!confirm('정말로 탈퇴하시겠습니까?')) {
    return;
  }
  // 잘 입력했는지 확인
  // 로그인 api 요청
  try {
    const data = { currentPassword: password };
    await Api.delete('/api/user', `${userId}`, data);
    removeUser();
    alertGreenModal.alertModalActivate(
      `정상적으로 탈퇴되었습니다.`,
      function () {
        window.location.href = '/';
      }
    );
    // 홈 페이지 이동
  } catch (err) {
    console.error(err.stack);
    alertModal.alertModalActivate(
      `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
    );
  }
}

// 주소 검색부분
function searchAddress(e) {
  e.preventDefault();
  console.log(e);
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
      address1Input.style.height = 'auto';
      let height = address1Input.scrollHeight; // 높이
      address1Input.style.height = `${height}px`;
      address2Input.placeholder = '상세 주소를 입력해 주세요.';
      address2Input.focus();
    },
  }).open();
}
