import * as Api from '/api.js';
import { validateEmail } from '/useful-functions.js';
import { getUserData } from '../localStorage.js';

// 요소(element), input 혹은 상수
const fullNameInput = document.querySelector('#fullNameInput');
const emailInput = document.querySelector('#emailInput');
const passwordInput = document.querySelector('#passwordInput');
const passwordConfirmInput = document.querySelector('#passwordConfirmInput');
const submitButton = document.querySelector('#submitButton');
const headerNavbar1 = document.querySelector('#headerNavbar');
import headerNavbar from '../components/headerNavbar.js';
const phoneNumber1 = document.querySelector('#phoneNumberInput');
const address1Input = document.querySelector('#address1Input');
const address2Input = document.querySelector('#address2Input');
const postalCodeInput = document.querySelector('#postalCodeInput');
const curpasswordInput = document.querySelector('#curpasswordInput');

addAllElements();
addAllEvents();
// html에 요소를 추가하는 함수들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllElements() {}

// 여러 개의 addEventListener들을 묶어주어서 코드를 깔끔하게 하는 역할임.
async function addAllEvents() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
  const result = await Api.get(`/api/user`);
  console.log(result);
  submitButton.idParam = result._id;
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
  const isFullNameValid = fullName.length >= 2;
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isPasswordSame = password === passwordConfirm;

  if (!isFullNameValid || !isPasswordValid) {
    return alert('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }

  if (!isEmailValid) {
    return alert('이메일 형식이 맞지 않습니다.');
  }

  if (!isPasswordSame) {
    return alert('비밀번호가 일치하지 않습니다.');
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

    await Api.patch('/api/users', `${e.currentTarget.idParam}`, data);

    alert(`정상적으로 수정되었습니다.`);

    // 홈 페이지 이동
    window.location.href = '/';
  } catch (err) {
    console.error(err.stack);
    alert(`문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`);
  }
}
