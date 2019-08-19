window.onload = function() {
  
  // DOM取得
  const canvasWrap = document.getElementById('canvasWrap');
  const canvas = document.getElementById('contents');
  let context = canvas.getContext( '2d' );  
  
  // ウィンドウサイズを取得する
  let canvasWidth = canvasWrap.offsetWidth;
  let canvasHeight = canvasWrap.offsetHeight; 
  // キャンバスをウィンドウサイズに設定
  canvas.setAttribute("width", canvasWidth); 
  canvas.setAttribute("height", canvasHeight);  
   
     // パーティクル設定
     let particleAmount = 100; // パーティクル数
     if (canvasWidth < 768) {
      particleAmount = 50;
     }
     let particleWidth = 30; // サイズ変化幅
     let particleBase = 5; // ベースサイズ
     let colors = ['#40acf5', '#3ba7f4', '#bddcf6', '#68c6f9', '#bddcf6']; // 色をランダムに決める
    
     for(let i = 0; i < particleAmount; i++) {
        // ランダムでパーティクルのサイズを変更
       let particleSize = Math.floor( Math.random() * particleWidth) + particleBase;
       // ランダムに配列内の色を取り出す
       let color = colors[Math.floor( Math.random() * colors.length)];
       // 透明度
       let opacity = (Math.floor(Math.random() * 6) / 2) + 5;
       // 横軸と縦軸のランダム値
       let randomX = Math.floor(Math.random() * canvasWidth);
       let randomY = Math.floor(Math.random() * canvasHeight);
    
      context.fillStyle = color; // 描画色
      context.beginPath();
      context.arc(randomX, randomY, particleSize, 0, Math.PI * 2.0, false); // 円を描画
      context.globalAlpha = opacity; // 透明度
      context.fill() ;
    }
  
  }