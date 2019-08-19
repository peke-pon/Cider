// nav menu ////////////////////////// //

let nav = document.querySelector('#nav');
let menu = document.querySelector('#menu-icon');

menu.addEventListener('click', function () {
  menu.classList.toggle("active");
  nav.classList.toggle("active");
});

let close = document.querySelector('.mainArea');

close.addEventListener('click', function () {
  menu.classList.remove("active");
  nav.classList.remove("active");
});

// bubble action ////////////////////////////////////// //

let img = document.querySelector('.mainImage > img');
let btn = document.querySelector('#bottleBtn');

btn.addEventListener('click', function () {
  img.classList.add("move");
  function remove() {
    img.classList.remove("move");
  }
  setTimeout(remove, 2500);
  setTimeout(bubble, 1000);
})

const canvasWrap = document.getElementById('canvas-wrap');
const canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let canvasWidth = canvasWrap.offsetWidth;
let canvasHeight = canvasWrap.offsetHeight;

function bubble() {

  canvas.setAttribute("width", canvasWidth);
  canvas.setAttribute("height", canvasHeight);

  let Particle = function (size, color, speed) {
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.position = {
      x: 0,
      y: 0
    };
  };

  Particle.prototype.circle = function () {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2.0, false);
    context.fillStyle = this.color;
    context.globalAlpha = 0.85;
    context.fill();
  };

  let density = 150;
  let particles = [];

  for (let i = 0; i < density; i++) {
    particles[i] = new Particle(6, '#ffffff', Math.random() * 3 + 1);
    particles[i].position.x = Math.random() * canvas.width;
    particles[i].position.y = Math.random() * 850;
    particles[i].size = (Math.random() * 7) + 3;
    particles[i].circle();
  }

  function splash() {
    requestAnimFrame(splash);
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    
    for (var i = 0; i < density; i++) {
      particles[i].position.y -= particles[i].speed;
      particles[i].circle();
    }
  }
  splash();
}

// particle ///////////////////////////////////////// //

window.onload = function () {
  var canvasWrap = document.querySelector('#canvas-wrap');
  var canvas = document.querySelector('#canvas-container');
  var context = canvas.getContext('2d');
  var center = {};

  var particles = [];
  var amount = 60;
  var colors = ['#69c6f8', '#42acf4', '#cae3f7', '#a0c6ff', '#69b3f8'];
  var size = 10;
  var speed = 35;

  var Pt = function () {
    this.size = Math.floor(Math.random() * 30) + size; 
    this.color = colors[~~(Math.random() * colors.length)]; 
    this.speed = this.size / speed; 

    this.pos = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height
    };

    var deg = Math.random() * 360;
    var rad = deg * Math.PI / 180;

    this.vec = {
      x: Math.cos(rad) * this.speed,
      y: Math.sin(rad) * this.speed
    };
    
    this.pos.x += this.vec.x * (Math.random() * center.x);
    this.pos.y += this.vec.y * (Math.random() * center.y);
  };

  Pt.prototype = {
    update: function () {
      this.pos.x += this.vec.x;
      this.pos.y += this.vec.y;

      if (this.pos.x > canvas.width + size
        || this.pos.x < 0 - size
        || this.pos.y > canvas.height + size
        || this.pos.y < 0 - size) {
        this.pos.x = center.x;
        this.pos.y = center.y;
      }
    },

    draw: function () {
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(this.pos.x, this.pos.y, this.size, 0, 2 * Math.PI, false);
      context.globalAlpha = 0.9;
      context.fill();
    }
  };

  function update() {
    requestAnimFrame(update);

    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    for (var i = 0; i < amount; i++) {
      particles[i].update();
      particles[i].draw();
    }
  }

  function set() {
    canvas.setAttribute("width", canvasWrap.offsetWidth);
    canvas.setAttribute("height", canvasWrap.offsetHeight);

    center.x = canvas.width / 2;
    center.y = canvas.height / 2;

    for (var i = 0; i < amount; i++) {
      particles.push(new Pt());
    }
    update();
  }
  set();
}

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();