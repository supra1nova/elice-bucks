import { getUserData } from '../../localStorage.js';

const headerNavbar = {
  render: () => {
    const { name, role } = getUserData();
    return `
        <ul id="navbar">
            <li>
            ${
              name && role === 'basic-user'
                ? `<a href="/myPage">${name}</a>`
                : name && role === 'admin-user'
                ? `<a href="/myPage">관리자</a>`
                : `<a href="/login">로그인</a>`
            }
            </li>
            <li><a href="/register">회원가입</a></li>
            <li>
            <a href="#cart" aria-current="page">
                <span class="icon">
                <i class="fas fa-cart-shopping"></i>
                </span>
                <span>카트</span>
            </a>
            </li>
        </ul>
        `;
  },
};
export default headerNavbar;
