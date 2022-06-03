import { setPaid, setDelivered, setDeletedAt } from './adminOrders.js';
import alertModal from '/components/alertModal.js';
const orderslist = {
  componentDidMount: async () => {
    //결제처리
    const paidButton = document.getElementsByClassName('paid-button');
    Array.from(paidButton).forEach((button) => {
      button.addEventListener('click', async () => {
        if (!confirm('결제처리 하시겠습니까?')) {
          return;
        }
        await setPaid(button.id);
        //await setPaid('6296e9d8e09e915f852d2fb3');
      });
    });
    //배송처리
    const deliveredButton = document.getElementsByClassName('delivered-button');
    Array.from(deliveredButton).forEach((button) => {
      button.addEventListener('click', async () => {
        if (button.classList.contains('false')) {
          alertModal.alertModalActivate('먼저 결제처리 해주세요');
          return;
        }
        if (!confirm('배송처리 하시겠습니까?')) {
          return;
        }
        await setDelivered(button.id);
        //await setDelivered('6296e9d8e09e915f852d2fb3');
      });
    });
    //주문 취소 처리
    const deletedAtButton = document.getElementsByClassName('deletedAt-button');
    Array.from(deletedAtButton).forEach((button) => {
      button.addEventListener('click', async () => {
        if (!confirm('정말로 삭제하시겠습니까?')) {
          return;
        }
        await setDeletedAt(button.id);
        //await setDeletedAt('6296e9d8e09e915f852d2fb3');
      });
    });
  },
  render: (orders) => {
    return `
    <div class="content">
      <h1 class="tableTitle">주문</h1>
          <!--
          <button id="create-product-button" class = "primary ">
            오더 생성 +
          </button>
          -->
          <div class="product-list">
 
          <table class="table is-hoverable">
          <thead>
            <tr>
              <th>유저</th>
              <th>총 가격</th>
              <th>주문일</th>
              <th>결제일</th>
              <th>배송일</th>
              <th>주문취소</th>
              <th>수정일</th>
              <th class="tr-action"></th>
            </tr>
          </thead>
          <tbody class="noticeContainer" id="list">
          ${orders
            .map((oneOrder, index) => {
              const order = oneOrder.orderId;
              let deletedFlag = false;
              if (order?.deletedAt && !order?.deletedAt?.startsWith('1')) {
                deletedFlag = true;
              }
              let paidFlag = false;
              if (order?.paid && !order?.paid?.startsWith('1')) {
                paidFlag = true;
              }
              return `
                <tr class="${deletedFlag && 'deletedFlag'}">
                  <td class="productImage1">${order?.userId || ''}</td>
                  <td>${order?.totalPrice || ''}</td>
                  <td>${order?.createdAt || ''}</td>
                  <td>${
                    (order?.paid?.startsWith('1') &&
                      (deletedFlag
                        ? '주문취소'
                        : `
                      <button id="${order?._id}" class="paid-button button is-success  is-light">결제처리</button>
                    `)) ||
                    order?.paid ||
                    ''
                  }
                  </td>
                  <td>${
                    (order?.delivered?.startsWith('1') &&
                      (deletedFlag
                        ? '주문취소'
                        : `
                      <button id="${order?._id}" class="${paidFlag} delivered-button button is-info   is-light">배송처리</button>
                    `)) ||
                    order?.delivered ||
                    ''
                  }</td>
                  <td>${
                    (order?.deletedAt?.startsWith('1') &&
                      `
                    <button id="${order?._id}" class="deletedAt-button is-danger button is-light">주문취소</button>
                    `) ||
                    order?.deletedAt ||
                    ''
                  }</td>
                  <td>${order?.updatedAt || ''}</td>
                  <td>
                    <button id="${index}" class="product-edit-button button is-primary  is-light">상세보기</button>
                  </td>
                </tr>
            `;
            })
            .join('\n')}
            </tbody>
          </table>

            
          </div>
        </div>
        <!--페이지네이션-->
        <nav class="pagination is-rounded is-small is-centered mt-3 mb-5" role="navigation" aria-label="pagination">
        <ul class="pagination-list">

        </ul>
      </nav>
      <!--페이지네이션 끝-->
      `;
  },
};
export default orderslist;
