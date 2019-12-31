# Cider.

[![download](https://img.shields.io/badge/Download-Ver1.00-blue?style=for-the-badge)](https://github.com/peke-pon/Cider/archive/master.zip)

![screenshot](https://github.com/peke-pon/stock/blob/master/Cider.png?raw=true)

[ Demo ➞](https://peke-pon.github.io/Cider/) <https://peke-pon.github.io/Cider/> 

## 概要

CanvasとJavaScriptを使用してボタンを押すとサイダーの泡が表示されるという無駄？機能を実装しています。

## Cavas

円の描画とアニメーションの表示にCanvasを使用しました。

キャンバスサイズはブラウザに合わせて親要素から取得したサイズをインラインstyleで追加しています。 

``` javascript

    Particle.prototype.circle = function () {
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2.0, false);
    context.fillStyle = this.color;
    context.globalAlpha = 0.85;
    context.fill(); 
    };　// 円を描画
  
```
	
## JavaScript

表示した円をfor文で大量に作り、それぞれを少し動かしては表示を素早く繰り返すことでアニメーションにしています。

今回は`requestAnimFrame`というメソッドを使用しました。   

``` javascript

    function loop() {
    requestAnimFrame(loop);

    context.clearRect(0, 0, canvasWidth, canvasHeight);

    for (var i = 0; i < particleAmount; i++) {
      particles[i].position.y += particles[i].speed;
      particles[i].circle();

      if (particles[i].position.y > canvasHeight) particles[i].position.y = -30;
	    }
	  } 
    loop();
    
 ```
  
## DOM操作

ボタンを押したらクラスを追加するというシンプルなものです。

``` javascript

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

```


### サンプルページ
cannvas勉強中に作成したコードを使用してサンプルページを2つ作成しました。`canvas01`、`canvas02`としてサイトページに組み込んでいます。

### スマートフォン対応
1ページしかないサイトですが、練習のためにレスポンシブ対応をしました。横幅に応じてメニューが変わります。画像サイズを2倍にしないとぼやけるなど意外に苦労しました。
