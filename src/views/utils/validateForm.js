import { validateEmail } from './../useful-functions.js';

export const validateProfile = (
  fullName,
  email,
  currentPassword,
  password,
  passwordConfirm
) => {
  const isFullNameValid = fullName.length >= 2;
  const isEmailValid = validateEmail(email);
  const isCurrentPassword = currentPassword.length >= 4;
  if (password && passwordConfirm) {
    const isPasswordValid = password.length >= 4;
    const isPasswordSame = password === passwordConfirm;
    if (!isPasswordSame) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
  }
  if (!isFullNameValid || !isCurrentPassword) {
    throw new Error('이름은 2글자 이상, 비밀번호는 4글자 이상이어야 합니다.');
  }
  if (!isEmailValid) {
    throw new Error('이메일 형식이 맞지 않습니다.');
  }
  return 'ok';
};

export const validateLogin = (email, password) => {
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  if (!isEmailValid || !isPasswordValid) {
    throw new Error(
      '비밀번호가 4글자 이상인지, 이메일 형태가 맞는지 확인해 주세요.'
    );
  }
  return 'ok';
};

export const validateDeleteUser = (password) => {
  const isPasswordValid = password.length >= 4;
  if (!isPasswordValid) {
    throw new Error('비밀번호가 4글자 이상인지 확인해 주세요.');
  }
  return 'ok';
};
