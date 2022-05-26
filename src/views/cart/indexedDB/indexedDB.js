const saveItem = async () => {
  const 제품이름 = document.querySelector('#name');
  const inputprice = document.querySelector(''); // 값 대입. []
  const sumnail = document.getElementsByTagName('img')[0].src; // 값 찾기 []
  console.log(제품이름.innerHTML, inputprice.innerHTML, sumnail);
  const database = await onRequest.result;
  const name = 제품이름.innerHTML;
  const price = inputprice.innerHTML;
  const image = sumnail;
  const cnt = 1;
  if (!name) {
    console.log('DB에 넣을 글 존제하지않습니다.');
  }
  const item = {
    name: name,
    price: price,
    img: `${image}`,
    cnt: cnt,
  };
  const transaction = database.transaction('carts', 'readwrite');
  const carts = transaction.objectStore('carts');
  const currentCart = carts.getAll();
  currentCart.onsuccess = () => {
    // Indexed 존재여부 판단.
    const checkname = currentCart.filter((item) => item.name === name);
    if (checkname) {
      console.log('장바구니에 이미 존재하는 상품입니다.');
      return;
    }
  };
  await carts.add(item);

  transaction.onerror = () => {
    console.log(transaction.error);
  };
};

const updateItem = async () => {
  let onRequest = indexedDB.open('cart', 1);
  onRequest.onsuccess = () => {
    console.log('update성공');
    const database = onRequest.result;
    const transaction = database.transaction('carts', 'readonly');
    const carts = transaction.objectStore('carts');
    const list = document.querySelector('.cartItemlist');
    list.innerHTML = '';
    const c = carts.getAll();
    c.onsuccess = () => {
      let a = c.result;
      if (a.length === 0) {
        const emptycart = `<div class='emptycart'>장바구니가 비어있습니다.</div>`;
        list.insertAdjacentHTML('beforeend', emptycart);
        return;
      }
      for (let i = 0; i < a.length; i++) {
        let { name, price, img, cnt } = a[i];
        const cartlist = `
                        <div class="list">
                            <div class="listItem">
                            <label class="check" for="">
                            <input type="checkbox" name="chkItem" >
                            <span class="ico"></span>
                          </label>
                          <div class="goods">
                            <a href="#" class="image is-96x96"><img src="${img}"></a>
                            <div class="name">
                              <div class="inner_name">
                                <a href="#" class="package name${i}">${name}</a>
                              </div>
                            </div>
                            <div class="price">
                              <span class="selling">${price}</span><span class="won">원</span>
                            </div>
                            <div class="countbar">
                              <button type="button" class="btn minus" name="decrease" onClick='minuscnt(${i})'><i class="fa-solid fa-minus"></i></button>
                              <input class="cntNumber cnt-${i}" type="" readonly value="${cnt}" />
                              <button type="button" class="btn plus" name="increase" onClick='pluscnt(${i})'><i class="fa-solid fa-plus"></i></button>
                            </div>
                            <button type="button" class="delete">상품 삭제</button>
                          </div>
                          </div>
                        </div>
                        `;
        list.insertAdjacentHTML('beforeend', cartlist);
      }
    };
    c.onerror = (error) => {
      console.log(error);
    };
  };
};

export { saveItem, updateItem };
