let list = new Array();
let imgsUrl = ['./imgs/Eagle.jpeg', './imgs/Fox.jpeg', './imgs/NutmegMannikin.jpeg', './imgs/Rabbit.jpeg', "./imgs/Reeves'smuntjac.jpeg"];
let windowWidth = document.body.clientHeight + "px";
//首頁圖片顯示
imgsUrl.forEach(element => {
    list += '<img width="150px" height="100px" src=' + element + ' alt="">';
});
document.getElementById('imgs').innerHTML = list ; 

//動態滿屏畫布
window.addEventListener(
    'resize', 
    function () {
        document.querySelector('.canvas').style.height = document.body.clientHeight + "px";
        document.querySelector('.img-box').style.width = document.body.clientWidth + "px";
    });

//輪播長度控制
//  document.querySelector('.content').style.width = imgsUrl.length * this.

//偵測點選對象，並顯示
document.querySelectorAll('.imgs img').forEach(element => {
    element.addEventListener(
        'click',
        function () {
            document.querySelector('.imgs').style.display = 'none';
            document.querySelector('.canvas').style.display = 'block';
        });
});

