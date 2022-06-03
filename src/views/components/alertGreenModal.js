const alertGreenModal = {
  alertModalActivate: (err, callback) => {
    const modal = document.querySelector('.modal');
    modal.classList.add('is-active');
    modal.innerHTML = alertGreenModal.render(err);
    alertGreenModal.componentDidMount(callback);
    return true;
  },
  componentDidMount: (callback) => {
    const modal = document.querySelector('.modal');
    const closeButton1 = document.querySelector('#closeButton1');
    const closeButton2 = document.querySelector('#closeButton2');
    closeButton1.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('is-active');
      if (callback) {
        callback();
      }
    });
    closeButton2.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.remove('is-active');
      if (callback) {
        callback();
      }
    });
  },
  render: (message) => {
    return `
        <div class="modal-background"></div>
            <div class="modal-card">
            <header class="modal-card-head" style="background-color:white;">
                <p class="modal-card-title" style="color:green;">알림</p>
                <button id="closeButton1" class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
                ${message}
            </section>
            <footer class="modal-card-foot" style="background-color:white;">
                <button id="closeButton2"  class="button is-success">확인</button>
            </footer>
        </div>
    `;
  },
};
export default alertGreenModal;

// html파일에 body 안에
// <!--modal-->
//     <div class="modal">

//     </div>
// 추가

// js파일에
// import alertGreenModal from '/components/alertGreenModal.js';

// alertGreenModal.alertModalActivate;

// alertGreenModal.alertModalActivate(err);

// alertGreenModal.alertModalActivate(
//   `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
// );
