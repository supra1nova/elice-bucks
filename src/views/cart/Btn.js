function plusCnt(i) {
  let count = document.querySelector(`.cnt-${i}`).value;
  if (count === 9) {
    return;
  }
  count++;
  document.querySelector(`.cnt-${i}`).value = count;
}

function minusCnt(i) {
  let count = document.querySelector(`.cnt-${i}`).value;
  if (count === 1) {
    return;
  }
  count--;
  document.querySelector(`.cnt-${i}`).value = count;
}

function isChecked(selector) {
  // 1. checkbox element를 찾습니다.

  // 2. checked 속성을 체크합니다.
  const is_checked = checkbox.checked;

  // 3. 결과를 출력합니다.
  document.getElementById('result').innerText = is_checked;
}

function toggleAllcheckbox() {
  const checkboxes = document.getElementsByName('chkItem');
  for (let i = 0; i < checkboxes.length; i++) {
    if (!checkboxes[i].checked) {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = true;
      });
      break;
      return;
    }
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
    return;
  }
}
