let t = 0;
let red = 0;
let interval;
let currmin;

let paused = !1;

let prevtime = 0;
let deltatime = 0;

let splash_div, start_button;
let main_div, main_timer, sub_timer;

let startbuttonclicked = !1;

let audio = new Audio('../../assets/timer/bell.wav');


performance.now = (() => 
  performance.now       ||
  performance.mozNow    ||
  performance.msNow     ||
  performance.oNow      ||
  performance.webkitNow ||            
  Date.now  // none found - fallback to browser default
)();


window.addEventListener('load', () => {

  splash_div = document.getElementById('splash')
  start_button = document.querySelector('button');

  main_div = document.getElementById('main');
  main_timer = document.getElementById('main_timer');
  sub_timer = document.getElementById('sub_timer');

  // set timer start value
  const userinput = parseInt(prompt('Seconds'));

  let startmin = Math.floor(userinput/60);
  let startsec = userinput % 60;
  if (startsec < 10) {
    startsec = '0' + startsec.toString();
  }

  main_timer.innerText = `${startmin} 分钟`;
  sub_timer.innerText = `${startmin} 分 ${startsec} 秒`;

  t = userinput;


  start_button.addEventListener('click', () => {

    splash_div.style.visibility = 'hidden';
    main_div.style.visibility = 'visible';

    interval = setInterval(timer, 1000);

    // pause on space or click
    document.addEventListener('keydown', (e) => {

      e = window.event || e;

      if (e.key === ' ') {
        e.preventDefault();
        onPause();
      }
      
    });

    document.addEventListener('click', onPause);

    startbuttonclicked = !0;

  });

});

function timer() {

  t--;
  console.log(t)

  let min = Math.floor(t / 60);
  let sec = t % 60;

  if (sec == 0) {
    currmin = min;
    red = 5;
    audio.play();
  }

  if (sec < 10) {
    sec = '0' + sec.toString();
  }

  if (red > 0) {
    red--;
    main_timer.style.color = 'red';
    main_timer.style.fontWeight = 'bold';
    main_timer.innerText = `${currmin} 分钟`
  } else {
    main_timer.style.color = 'black';
    main_timer.style.fontWeight = 'normal';
    main_timer.innerText = `${min} 分钟`
  }

  sub_timer.innerText = `${min} 分 ${sec} 秒`

  prevtime = performance.now();

  if (t == 0) {
    clearInterval(interval);
    playSound();
  }
}

function onPause() {

  if (startbuttonclicked) {

    paused = !paused;

    if (paused) {
      clearInterval(interval);
      deltatime = performance.now() - prevtime;
    }

    else {
      setTimeout(() => {
        timer()
        interval = setInterval(timer, 1000);
      }, 1000 - deltatime)
    }

  }
  
}

function playSound() {
  audio.play();
}