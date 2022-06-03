import * as Api from '/api.js';
import { validateNotice } from './../utils/validateForm.js';
import alertModal from '/components/alertModal.js';
import alertGreenModal from '/components/alertGreenModal.js';
const noticesDetail = {
  componentDidMount: () => {
    //취소 뒤로가기
    const cancleButton = document.getElementById('cancle-button');
    cancleButton.addEventListener('click', () => {
      window.location.reload();
    });
  },
  componentDidMountEdit: async (notice) => {
    const editButton = document.getElementById('edit-button');
    editButton.addEventListener('click', async () => {
      //.patch('/:noticeId',
      try {
        const newNotice = {
          ...notice,
          noticeId: notice._id,
          content: document.querySelector('#contentInput').value,
          title: document.querySelector('#titleInput').value,
        };
        await Api.patch('/api/notice', `${notice._id}`, newNotice);
        alertGreenModal.alertModalActivate(
          `정상적으로 수정되었습니다.`,
          function () {
            window.location.reload();
          }
        );
      } catch (err) {
        console.error(err.stack);
        alertModal.alertModalActivate(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
      }
    });
  },
  componentDidMountCreate: async (notice) => {
    //post('/register',\
    const editButton = document.getElementById('edit-button');
    editButton.addEventListener('click', async () => {
      const content = document.querySelector('#contentInput').value;
      const title = document.querySelector('#titleInput').value;
      try {
        validateNotice(title, content);
      } catch (err) {
        return alertModal.alertModalActivate(err);
      }
      try {
        const newNotice = {
          ...notice,
          content,
          title,
        };
        await Api.post('/api/notice/register', newNotice);
        alertGreenModal.alertModalActivate(
          `정상적으로 등록되었습니다.`,
          function () {
            window.location.reload();
          }
        );
        // 홈 페이지 이동
      } catch (err) {
        console.error(err.stack);
        alertModal.alertModalActivate(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
      }
    });
  },
  render: (notice, isEdit) => {
    const title = notice.title ? notice.title : '';
    const content = notice.content ? notice.content : '';
    return `
    <tbody class="noticeDetail">
        <tr class="noticeTitle content" >
            <td class="content">
                <div class="field mb-2">
                <label class="label" for="titleInput">제목</label>
                    <textarea
                    class="input"
                    name ="textarea"
                    id="titleInput"
                    type="text"
                    rows="10"
                    maxlength="300"
                    placeholder="내용"
                    autocomplete="on"
                    >${title}</textarea>
                    </div>
                </td>
            </tr>
          <tr>
            <td class="content">
            <div class="field mb-2">
                <label class="label" for="contentInput">내용</label>
                    <textarea
                    class="input"
                    name ="textarea"
                    id="contentInput"
                    type="text"
                    rows="10"
                    maxlength="300"
                    placeholder="내용"
                    autocomplete="on"
                    style="min-height:30rem;"
                    >${content}</textarea>
                </div>
            </td>
          </tr>
          <tr >
            <td>
            <div id="button-td">
                <button id="edit-button" class="product-edit-button button is-primary">${
                  isEdit ? '수정' : '생성'
                }</button>
                <button id="cancle-button" class="product-delete-button button is-danger">취소</button>
            </div>
            </td> 
          </tr>
        </tbody>
    `;
  },
};
export default noticesDetail;
