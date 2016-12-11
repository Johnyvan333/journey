'use strict';

pickmeup('.pickmeup');

var upperLetter = document.querySelector('.text-main__letter');
var letterInner = document.querySelector('.text-main__upperLetter');
var dateInner = document.querySelector('.about__date');
var aside = document.querySelector('.page-header__aside-text');
var asideBtn = document.getElementById('asideBtn');

function setLetter() {
  letterInner.innerHTML = upperLetter.innerHTML;
}
setLetter();

function setDate() {
  var currentDate = new Date();
  var currentMonth = currentDate.toString().slice(4, 7);
  var currentYear = currentDate.getFullYear();
  dateInner.innerHTML += currentMonth + ', ' + currentYear;
}
setDate();

asideBtn.addEventListener('click', function(event) {
  if (asideBtn.classList.contains('aside-btn-more')) {
    asideBtn.classList.remove('aside-btn-more');
    aside.classList.remove('aside-more');
    asideBtn.innerHTML = 'more';
  } else {
    asideBtn.classList.add('aside-btn-more');
    aside.classList.add('aside-more');
    asideBtn.innerHTML = 'less';
  }
});
