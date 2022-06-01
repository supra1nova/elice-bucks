import headerNavbar from '../components/headerNavbar.js';
import insertCategoryList from '../components/navCategoryList.js';

const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();
insertCategoryList();

function addAllElements() {
  headerNavbar1.innerHTML = headerNavbar.render();
  headerNavbar.componentDidMount();
}
