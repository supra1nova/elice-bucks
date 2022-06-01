export const startLoading = () => {
  document.querySelector('#loadingOverlay').classList.add('active');
};
export const endLoading = () => {
  document.querySelector('#loadingOverlay').classList.remove('active');
};

//html파일의 <body> 바로 밑에
// <!--로딩-->
//     <div class="overlay" id="loadingOverlay">로딩...</div>
//추가하기

//css파일에
/* 로딩 */
//   .overlay {
//     display:none;
//     position:fixed;
//     z-index:1000;
//     background-color: rgba(16,16,16,0.5);
//     top:0;
//     left:0;
//     width:100%;
//     height:100%;
// }
// .overlay.active {
//     display:flex;
//     justify-content: center;
//     align-items: center;
//     color:#fff;
// }
//추가하기
