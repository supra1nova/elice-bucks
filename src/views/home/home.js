// 아래는 현재 home.html 페이지에서 쓰이는 코드는 아닙니다.
// 다만, 앞으로 ~.js 파일을 작성할 때 아래의 코드 구조를 참조할 수 있도록,
// 코드 예시를 남겨 두었습니다.

import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';

const headerNavbar1 = document.querySelector('#headerNavbar');
const recipe = document.querySelector('.recipe');
const elicebucks = document.querySelector('.elicebucks');
const recycle = document.querySelector('.recycle');
const recipeText = document.querySelector('.recipeText');
const elicebucksText = document.querySelector('.elicebucksText');
const recyleText = document.querySelector('.recyleText');

addAllElements();
insertCategoryList();

function addAllElements() {
  headerNavbar1.innerHTML = headerNavbar.render();
  headerNavbar.componentDidMount();
}


// story 영역 hover시 글씨 변경
recipe.addEventListener('mouseover', () => {
  recipeText.innerHTML = "커피의 98%는 물로 구성되어 있습니다.<br/>따라서 정수가 된 신선한 물로 커피를 내리면<br/>최상의 커피를 즐기실 수 있습니다."
})
recipe.addEventListener('mouseout', () => {
  recipeText.innerHTML = "커피를 더 완벽하게<br/> 즐기는 방법"
})

elicebucks.addEventListener('mouseover', () => {
  elicebucksText.innerHTML = "엘리스벅스는 100% 아라비카 원두만을 사용하여, 최상의 맛을 선사하는 커피 한 잔을 드립니다."
})
elicebucks.addEventListener('mouseout', () => {
  elicebucksText.innerHTML = "엘리스벅스만의 특징"
})

recycle.addEventListener('mouseover', () => {
  recyleText.innerHTML = "상품 구매 시 함께 전달 드리는 재활용 백의<br/>점선까지 담아 밀봉하여 문 앞에 놓아주세요.<br/>캡슐 재활용 백 수거 요청을 주문하시면<br/>재활용 백을 수거합니다"
})
recycle.addEventListener('mouseout', () => {
  recyleText.innerHTML = "캡슐 재활용"
})