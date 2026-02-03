function toggleNav() {
  const nav = document.querySelector('nav');
  nav.classList.toggle('open');
}

// DOM 로드 후 이벤트 연결
function initNav() {
  const menuBtn = document.querySelector('.menu-btn');

  if (!menuBtn) return;

  menuBtn.addEventListener('click', toggleNav);
}

// 실행
document.addEventListener('DOMContentLoaded', initNav);
