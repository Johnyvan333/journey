'use strict';

pickmeup('.pickmeup');

var upperLetter = document.querySelector('.text-main__letter');
var letterInner = document.querySelector('.text-main__upperLetter');
var dateInner = document.querySelector('.about__date');

function setLetter() {
  letterInner.innerHTML = upperLetter.innerHTML;
}

function setDate() {
  var currentDate = new Date();
  var currentMonth = currentDate.toString().slice(4, 7);
  var currentYear = currentDate.getFullYear();
  dateInner.innerHTML += currentMonth + ', ' + currentYear;
}
setLetter();
setDate();
