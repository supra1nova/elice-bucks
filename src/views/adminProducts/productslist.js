const productlist = {
  render: async (products) => {
    console.log(products);
    return `
        ${products
          .map(
            (product) => `
                <tr>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td class="productImage1">${product.category}</td>
                  <td class="productImage1">
                  <img src ="${product.image}"  width="300" height="30" id="product-image-file" /></td>
                  <td>${product.description}</td>
                  <td>
                    <button id="${product._id}" class="edit-button">수정</button>
                    <button id="${product._id}" class="delete-button">삭제</button>
                  </td>
                </tr>
            `
          )
          .join('\n')}
      `;
  },
};
export default productlist;
