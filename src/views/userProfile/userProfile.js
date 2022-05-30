import * as Api from '/api.js';
import headerNavbar from '../components/headerNavbar.js';
import { validateUpdateProfile } from '/utils/validateForm.js';
// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const headerNavbar1 = document.querySelector('#headerNavbar');
const phoneNumber1 = document.querySelector('#phoneNumberInput');
const address1Input = document.querySelector('#address1Input');
const address2Input = document.querySelector('#address2Input');
const postalCodeInput = document.querySelector('#postalCodeInput');
const curpasswordInput = document.querySelector('#curpasswordInput');

addAllElements();
addAllEvents();
// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

let userId = '';
const setUserId = (_id) => {
  userId = _id;
};
// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllEvents() {
  headerNavbar1.innerHTML = headerNavbar.render();
  headerNavbar.componentDidMount();
  const result = await Api.get(`/api/user`);
  console.log(result);
  setUserId(result._id);
  //submitButton.idParam = result._id;
  address1Input.value = result.address.address1;
  address2Input.value = result.address.address2;
  postalCodeInput.value = result.address.postalCode;
  phoneNumber1.value = result.phoneNumber;

  submitButton.addEventListener('click', handleSubmit);
  emailInput.value = result.email;
  fullNameInput.value = result.fullName;
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
    validateUpdateProfile(fullName, email, password, passwordConfirm);
  } catch (err) {
    return alert(err);
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

    await Api.patch('/api/users', `${userId}`, data);

    alert(`정상적으로 수정되었습니다.`);

    // 홈 페이지 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
