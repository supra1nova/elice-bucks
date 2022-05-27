import headerNavbar from '../components/headerNavbar.js';

const headerNavbar1 = document.querySelector('#headerNavbar');

addAllElements();

async function addAllElements() {
  headerNavbar1.innerHTML = await headerNavbar.render();
  await headerNavbar.componentDidMount();
}
