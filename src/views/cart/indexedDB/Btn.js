function pluscnt(i) {
  let count = document.querySelector(`.cnt-${i}`).value;
  if (count === 9) {
    return;
  }
  count++;
  document.querySelector(`.cnt-${i}`).value = count;
}

function minuscnt(i) {
  let count = document.querySelector(`.cnt-${i}`).value;
  if (count === 1) {
    return;
  }
  count--;
  document.querySelector(`.cnt-${i}`).value = count;
}

function is_checked(selector) {
  // 1. checkbox element를 찾습니다.
  const checkbox = document.querySelector(`${selector}`);

  // 2. checked 속성을 체크합니다.
  const is_checked = checkbox.checked;

  // 3. 결과를 출력합니다.
  document.getElementById('result').innerText = is_checked;
}
