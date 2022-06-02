import { getUserData } from '../utils/user.js';

const logincheck = () => {
  const { name } = getUserData();
  if (!name) {
    alert('로그인 이후 사용 가능합니다.');
    location.pathname = '/login';
  }
};
export default logincheck;
