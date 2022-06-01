const leftMenu = {
  render: (props) => {
    return `
    
    <div class ="leftMenu">
        <ul>
            <li class="dashboard ${
              props.selected === 'dashboard' ? 'selected' : ''
            }">
                <a href="/adminPage">대시보드</a>
            </li>
            <li class="orders ${props.selected === 'orders' ? 'selected' : ''}">
                <a href="/adminOrders">주문</a>
            </li>
            <li class="products ${
              props.selected === 'products' ? 'selected' : ''
            }">
                <a href="/adminProducts">제품</a>
            </li>
            <li class="orders ${props.selected === 'notice' ? 'selected' : ''}">
                <a href="/adminNotice">공지사항</a>
            </li>
        </ul>
    </div> 
    
        `;
  },
};
export default leftMenu;
