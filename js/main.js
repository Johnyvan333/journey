'use strict';

pickmeup('.pickmeup');

var upperLetter = document.querySelector('.text-main__letter');
var letterInner = document.querySelector('.text-main__upperLetter');
var dateInner = document.querySelector('.about__date');
var aside = document.querySelector('.page-header__aside-text');
var asideBtn = document.getElementById('asideBtn');
var sliderInner = document.querySelector('.page-header__top-wrapper');
var sliderLeftBtn = document.getElementById('btnHeaderLeft');
var sliderRightBtn = document.getElementById('btnHeaderRight');

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
  event.preventDefault();
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

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 27) {
    if (aside.classList.contains('aside-more')) {
      asideBtn.classList.remove('aside-btn-more');
      aside.classList.remove('aside-more');
      asideBtn.innerHTML = 'more';
    }
  }
});

function setSlider() {
  var images = ['img/slider-photo-1.jpg', 'img/slider-photo-2.jpg', 'img/slider-photo-3.jpg', 'img/slider-photo-4.jpg', 'img/slider-photo-5.jpg', 'img/slider-photo-6.jpg'];
  var imagesTop = images.length - 1;
  var x = Math.floor(Math.random() * images.length);

  function toogleSlider() {
    sliderInner.style.backgroundImage = "url" + "(" + images[x] + ")";
  }
  sliderLeftBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (x !== 0) {
      x = --x;
      return toogleSlider();
    } else {
      x = imagesTop;
      return toogleSlider();
    }
  });
  sliderRightBtn.addEventListener('click', function(event) {
    event.preventDefault();
    if (x !== imagesTop) {
      x = ++x;
      return toogleSlider();
    } else {
      x = 0;
      return toogleSlider();
    }
  });
  return toogleSlider();
}
setSlider();
