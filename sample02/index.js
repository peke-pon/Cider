window.onload = function() {　// 非サポート時実行しない
    if (!window.HTMLCanvasElement) return; 
  window.requestAnimFrame = (function(){　// アニメーション
        return  window.requestAnimationFrame   ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            function(callback){
                window.setTimeout(callback, 1000 / 60);
            };
    })();
  
const canvasWrap = document.getElementById('canvasWrap');
const canvas = document.getElementById('contents');
let context = canvas.getContext( '2d' ); 

// ウィンドウサイズを取得する
let canvasWidth = canvasWrap.offsetWidth;
let canvasHeight = canvasWrap.offsetHeight;
// キャンバスをウィンドウサイズに設定
canvas.setAttribute("width", canvasWidth); 
canvas.setAttribute("height", canvasHeight);
  
  let Particle = function(size, color, speed) {
    this.size = size;
    this.color = color;
    this.speed = speed;
    this.position = {
      x : 0,
      y : 0
    };
  };
  
  Particle.prototype.circle = function() {
    context.beginPath();
       context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2.0, false); 
       context.fillStyle = this.color; 
       context.globalAlpha = 0.7;
       context.fill() ;
  };

  let density = 1000;
  let particles = [];
  
  for(let i = 0; i < density; i++){
    particles[i] = new Particle(10, '#ffffff', Math.random()*2 +1);
    particles[i].position.x = Math.random()*canvas.width;
    particles[i].position.y = Math.random()*canvas.height;
    particles[i].size = Math.random()* 5;
    particles[i].circle();
  }
    
   function loop() {
     
    requestAnimFrame(loop);
    
    context.clearRect(0,0, canvasWidth,  canvasHeight);
    
    for (var i=0; i<density; i++) {
        particles[i].position.y += particles[i].speed;
        particles[i].circle();
 
        if (particles[i].position.y > canvas.width) particles[i].position.y = -30;
    }   
}  

   loop();
  
};
