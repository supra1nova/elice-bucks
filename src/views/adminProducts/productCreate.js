import * as Api from '/api.js';
const productCreate = {
  componentDidMount: async (productCat) => {
    const submitButton = document.querySelector('#submitButton');
    document.getElementById(`${productCat._id}`).selected = true;
    submitButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const name = document.getElementById('nameInput').value;
      const price = document.getElementById('priceInput').value;
      const categoryName = document.getElementById('categoriesSelect').value;
      let options = document.getElementById('categoriesSelect').options;
      const categoryId = options[options.selectedIndex].id;
      const image = document.getElementById('imageInput').value;
      const description = document.getElementById('descriptionInput').value;
      const stock = document.getElementById('stockInput').value;

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
        alert(`정상적으로 제품 추가되었습니다.`);
        window.location.href = '/adminProducts/';
      } catch (err) {
        console.error(err.stack);
        alert(
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
        console.log(formData);
        const data = await Api.postImage('/api/product/imageUpload', formData);
        if (data.error) {
          alert(
            `문제가 발생하였습니다. 확인 후 다시 시도해 주세요: ${data.error}`
          );
        } else {
          document.getElementById('imageInput').value = data.image;
          document.getElementById('product-image-file').src = `${data.image}`;
        }
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
        <button class="button is-danger mt-3 is-fullwidth" id="cancleButton">
          취소하기
        </button>
      
      </form>
      
    </div>
    `;
  },
};
export default productCreate;
