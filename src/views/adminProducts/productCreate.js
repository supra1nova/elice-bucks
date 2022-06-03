import * as Api from '/api.js';
import { validateProduct } from './../utils/validateForm.js';
import alertModal from '/components/alertModal.js';
import alertGreenModal from '/components/alertGreenModal.js';
const productCreate = {
  componentDidMount: async (productCat) => {
    let formData;
    const setFormData = (formData1) => {
      formData = formData1;
    };
    const submitButton = document.querySelector('#submitButton');
    document.getElementById(`${productCat._id}`).selected = true;
    submitButton.addEventListener('click', async (e) => {
      e.preventDefault();
      if (!formData) {
        return alertModal.alertModalActivate('사진(파일)을 선택해주세요!');
      }
      const data = await Api.postImage('/api/product/image', formData);
      if (data.error) {
        alertModal.alertModalActivate(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${data.error}`
        );
      }

      const name = document.getElementById('nameInput').value;
      const price = document.getElementById('priceInput').value;
      const categoryName = document.getElementById('categoriesSelect').value;
      let options = document.getElementById('categoriesSelect').options;
      const categoryId = options[options.selectedIndex].id;
      const image = data.image;
      const description = document.getElementById('descriptionInput').value;
      const stock = document.getElementById('stockInput').value;
      try {
        validateProduct(name, price, description, stock);
      } catch (err) {
        return alertModal.alertModalActivate(err);
      }

      try {
        const data = {
          name,
          price,
          category: { _id: `${categoryId}`, name: `${categoryName}` },
          image,
          description,
          stock,
        };
        const result = await Api.post('/api/product/register', data);
        alertGreenModal.alertModalActivate(
          `정상적으로 제품 추가되었습니다.`,
          function () {
            window.location.href = '/adminProducts/';
          }
        );
      } catch (err) {
        console.error(err.stack);
        alertModal.alertModalActivate(
          `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${err.message}`
        );
      }
    });

    document
      .getElementById('image-file')
      .addEventListener('change', async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setFormData(formData);
        document.getElementById('imageInput').value =
          '/images/' + e.target.files[0].name;
        document.getElementById('product-image-file').src = URL.createObjectURL(
          e.target.files[0]
        );
      });
  },
  render: (product, categories) => {
    return `
    <div class="register-user-form-container">
    <form class="box register-user-form-box" id="registerUserForm">
      <p class="title is-5 has-text-primary">생성하세요!</p>
        <div id="form-container">
  
            <div class="field">
            <label class="label" for="nameInput">제품 이름</label>
            <div class="control">
                <input
                class="input"
                id="nameInput"
                type="text"
                placeholder="제품 이름"
                autocomplete="on"
                value="${product.name}"
                />
            </div>
            </div>
            
            <div class="field mb-2">
            <label class="label" for="priceInput">가격</label>
            <div class="control">
                <input
                class="input"
                id="priceInput"
                type="text"
                placeholder="가격"
                autocomplete="on"
                value="${product.price}"
                />
            </div>
            </div>

            <div class="field mb-2">
            <label class="label" for="categoryInput">카테고리</label>
            <select name="categoriesSelect" class="select input" id ="categoriesSelect">
              ${categories
                .map(
                  (category) => `
                        <option id="${category?._id}">${category?.name}</option>
                  }
                    `
                )
                .join('\n')}
            </select>
            </div>

            <div class="field mb-2">
              <label class="label" for="stockInput">재고</label>
              <div class="control">
                  <input
                  class="input"
                  id="stockInput"
                  type="text"
                  placeholder="가격"
                  autocomplete="on"
                  value="${product.stock}"
                  />
              </div>
            </div>

            <div class="field mb-2">
            <label class="label" for="imageInput">이미지</label>
            <div class="control">
                <input
                readOnly
                class="input"
                id="imageInput"
                name="image"
                type="text"
                placeholder="이미지"
                autocomplete="on"
                value="${product.image ? product.image : ''}"
                />
                <div id = "image-control"> 
                <img  width="30" height="30" id="product-image-file" />
                <input type="file" name="image-file" id="image-file"/>
                
                </div>
            </div>
            </div>

            <div class="field mb-2">
            <label class="label" for="descriptionInput">제품 설명</label>
            <div class="control">
                <textarea
                class="input"
                name ="textarea"
                id="descriptionInput"
                type="text"
                rows="10"
                maxlength="300"
                placeholder="제품 설명"
                autocomplete="on"
                style="min-height: 7rem"
                >${product.description}</textarea>
            </div>
            </div>

        </div>
        <button class="button is-primary mt-5 is-fullwidth" id="submitButton">
          제품 생성하기
        </button>
        <button class="cancleButton button is-danger is-fullwidth" id="cancleButton">
          취소하기
        </button>
      
      </form>
      
    </div>
    `;
  },
};
export default productCreate;
