let circle, circlewrapper;
let counter;

let toggle = !1;

let textbox;
let no = 1;

let parent = -1;

let basecircle;

function init() {

  circle = document.getElementsByClassName('circle')[1];
  circlewrapper = document.getElementsByClassName('wrapper')[0];

  counter = document.getElementsByClassName('counter')[0];

  textbox = document.querySelector('input');

  textbox.addEventListener('click', (e) => {
    e.stopPropagation();
  })

  basecircle = document.querySelector('.circle.nospin');

  document.addEventListener('keydown', (e) => {
    if (13 === (e.which | e.keyCode) || e.key === 'Enter') {
      e.preventDefault(); 
      toggleSlide();
    }
    else if (32 === (e.which | e.keyCode) || e.key === ' ') {
      e.preventDefault();
      basecircle.classList.toggle('hidden');
    }
  })

  document.addEventListener('click', toggleSlide);

}

function toggleSlide() {

  toggle = !toggle;

  if (toggle) slideIn();
  else slideout();

  if (textbox.value == 0) {
    textbox.value = 1;
  }

  if (textbox.value > no) {

    for (let i = 0; i < textbox.value - no; i++) {
      let newcircle = document.createElement('div');
      newcircle.classList.add('circle');

      parent++;
      let newparent = document.getElementsByClassName('circle')[parent];
      newparent.appendChild(newcircle);
    }

  } 
  
  else if (textbox.value < no) {
    for (let i = 0; i < no - textbox.value; i++) {
      let currentparent = document.getElementsByClassName('circle')[parent];
      currentparent.removeChild(currentparent.firstChild);
      parent--;
    }
  }

  no = parseInt(textbox.value);

}

function valno(e) {
  if (!/^[0-9]*(?:\.\d{1,2})?$/.test(String.fromCharCode(e.keyCode || e.which)) && 13 !== (e.which | e.keyCode)) e.preventDefault();
}

function slideIn() {
  counter.classList.remove('slideOut');
  counter.classList.add('slideIn');
  setTimeout(() => textbox.focus(), 700);
}

function slideout() {
  counter.classList.remove('slideIn');
  counter.classList.add('slideOut');
  textbox.blur();
}


window.onload = init;