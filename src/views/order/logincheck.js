import { getUserData } from '../utils/user.js';
import alertModal from '/components/alertModal.js';
const logincheck = () => {
  const { name } = getUserData();
  if (!name) {
    alertModal.alertModalActivate('로그인 이후 사용 가능합니다.', function () {
      location.pathname = '/login';
    });
  }
};
export default logincheck;
