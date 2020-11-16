const burger = document.querySelector('.header__burger')
const menu = document.querySelector('.header__menu')
const body = document.querySelector('body')
const headerList = document.querySelector('.header__list')
burger.addEventListener('click', (e) => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
  body.classList.toggle('lock');
})

headerList.addEventListener('click', (e) => {
  burger.classList.remove('active');
  menu.classList.remove('active');
  body.classList.remove('lock');
})