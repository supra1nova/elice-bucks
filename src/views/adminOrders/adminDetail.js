const adminDetail = {
  render: (order) => {
    console.log(order);
    const user = order[0].userId;
    const totalPrice = order[0].totalPrice;
    const createdAt = order[0].createdAt;
    const paid = order[0].paid;
    const delivered = order[0].delivered;
    const deletedAt = order[0].deletedAt;
    const updatedAt = order[0].updatedAt;
    const productsInfos = order[1];
    return `
    <label class="label">주문정보</label>
    <hr/>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label class="label">유저 아이디</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="Name" value="${user}">
                </p>
            </div>
            <div class="field">
                <label class="label">유저 이름</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="Name" value="${user}">
                </p>
            </div>
            <div class="field">
                <label class="label">가격</label>
                <p class="control is-expanded">
                <input class="input is-success" type="text" placeholder="가격" value="${totalPrice}">
                </p>
            </div>
            <div class="field">
                <label class="label">주문일</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="Name" value="${createdAt}">
                </p>
            </div>
        </div>
    </div>
    <div class="field is-horizontal">
        <div class="field-body">
            <div class="field">
                <label class="label">결제일</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="결제일" value="${paid}">
                </p>
            </div>
            <div class="field">
                <label class="label">배달일</label>
                <p class="control is-expanded">
                <input class="input is-success" type="text" placeholder="배달일" value="${delivered}">
                </p>
            </div>
            <div class="field">
                <label class="label">주문취소</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="주문취소" value="${deletedAt}">
                </p>
            </div>
            <div class="field">
                <label class="label">수정일</label>
                <p class="control is-expanded">
                <input class="input" type="text" placeholder="수정일" value="${updatedAt}">
                </p>
            </div>
        </div>
    </div>
    <label class="label">주문 제품</label>
    <hr/>
    ${productsInfos
      .map((product, index) => {
        console.log(product);
        return `
            
        `;
      })
      .join('\n')}
    
    <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
        <div class="field is-expanded">
            <div class="field has-addons">
            <p class="control">
                <a class="button is-static">
                +44
                </a>
            </p>
            <p class="control is-expanded">
                <input class="input" type="tel" placeholder="Your phone number">
            </p>
            </div>
            <p class="help">Do not enter the first zero</p>
        </div>
        </div>
    </div>
    
    <div class="field is-horizontal">
        <div class="field-label is-normal">
        <label class="label">Department</label>
        </div>
        <div class="field-body">
        <div class="field is-narrow">
            <div class="control">
            <div class="select is-fullwidth">
                <select>
                <option>Business development</option>
                <option>Marketing</option>
                <option>Sales</option>
                </select>
            </div>
            </div>
        </div>
        </div>
    </div>
    
    <div class="field is-horizontal">
        <div class="field-label">
        <label class="label">Already a member?</label>
        </div>
        <div class="field-body">
        <div class="field is-narrow">
            <div class="control">
            <label class="radio">
                <input type="radio" name="member">
                Yes
            </label>
            <label class="radio">
                <input type="radio" name="member">
                No
            </label>
            </div>
        </div>
        </div>
    </div>
    
    <div class="field is-horizontal">
        <div class="field-label is-normal">
        <label class="label">Subject</label>
        </div>
        <div class="field-body">
        <div class="field">
            <div class="control">
            <input class="input is-danger" type="text" placeholder="e.g. Partnership opportunity">
            </div>
            <p class="help is-danger">
            This field is required
            </p>
        </div>
        </div>
    </div>
    
    <div class="field is-horizontal">
        <div class="field-label is-normal">
        <label class="label">Question</label>
        </div>
        <div class="field-body">
        <div class="field">
            <div class="control">
            <textarea class="textarea" placeholder="Explain how we can help you"></textarea>
            </div>
        </div>
        </div>
    </div>
    
    <div class="field is-horizontal">
        <div class="field-label">
        <!-- Left empty for spacing -->
        </div>
        <div class="field-body">
        <div class="field">
            <div class="control">
            <button class="button is-primary">
                Send message
            </button>
            </div>
        </div>
        </div>
    </div>
    `;
  },
};
export default adminDetail;
