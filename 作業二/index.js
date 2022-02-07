//圖片庫，增加圖片修改這邊即可
let imgsUrl = ['./imgs/Eagle.jpeg', './imgs/Fox.jpeg', './imgs/NutmegMannikin.jpeg', './imgs/Rabbit.jpeg', "./imgs/Reeves'smuntjac.jpeg"];

//取得畫面寬高
let windowWidth = document.body.clientWidth;
let windowHeight = document.body.clientHeight;

//輪播盒子
let wrap = document.querySelector('.wrap');

//圓點容器
let dots = document.querySelector('.dots');

//輪播展示圖片，展示功能核心！！
let newLeft = 0;

//內容容器
let list = new Array();
let wrapList = new Array();
let dotsList = new Array();

//讀取圖片數量
let i = 0;
imgsUrl.forEach(element => {
    //首頁圖片
    list += '<img id=' + i + ' src=' + element + ' alt="" draggable="false">';
    //輪播圖片
    wrapList += '<li class="imgBox"><img src=' + element + ' alt="" draggable="false"></li>';
    //圓點
    dotsList += '<li class="dot" id=' + i + '><img src=' + element + ' alt="" draggable="false"></li>';
    i ++;
});

//初始畫面
document.getElementById('imgs').innerHTML = list ;

//輪播圖片顯示
wrap.innerHTML = wrapList; 

//圓點顯示
dots.innerHTML = dotsList;

//偵測點選對象，並顯示
document.querySelectorAll('.imgs img').forEach(element => {
    element.addEventListener(
        'click',
        function () 
        {
            //顯示與初始頁隱藏
            document.querySelector('.imgs').style.display = 'none';
            document.querySelector('.canvas').style.display = 'block';

            //rwd
            rwd(windowWidth, windowHeight);

            //顯示
            wrap.style.left = this.id * windowWidth * -1 + 'px';
            newLeft = this.id * -1;

            //該圓點變色
            dots.children[newLeft * -1].style = 'border: 1px solid #FFF;opacity: 1;';
        }
    );
});

//偵測畫面
window.addEventListener(
    'resize', 
    function () 
    {
        //取得畫面寬高
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;

        //rwd 
        rwd(windowWidth, windowHeight);

        //輪播rwd
        wrap.style.left = newLeft * windowWidth + 'px';;
    }
);

//上下頁，圓點亮起
document.querySelectorAll('.btn').forEach(element => {
    element.addEventListener(
        'click', 
        function ()
        {
            //舊的圓點暗掉
            dots.children[newLeft * -1].style = 'border: none;opacity: 0.2;';

            //左右控制
            switch (this.innerHTML) 
            {
                case '左':
                    newLeft += 1;
                    if (newLeft > 0) {
                        newLeft = -imgsUrl.length + 1;
                    };
                    break;
                case '右':
                    newLeft -= 1;
                    if (newLeft < -imgsUrl.length + 1) {
                        newLeft = 0;
                    };
                    break;
            };
            wrap.style.left = newLeft * windowWidth + 'px';

            //下個圓點亮起
            dots.children[newLeft * -1].style = 'border: 1px solid #FFF;opacity: 1;';
        }
    );
});

//偵測圓點點擊
document.querySelectorAll('.dots .dot').forEach(element => {
    element.addEventListener(
        'click',
        function ()
        {
            //舊的圓點暗掉
            dots.children[newLeft * -1].style = 'border: none;opacity: 0.2;';
            
            //獲取點擊圓點
            newLeft = this.id * -1;
            wrap.style.left = newLeft * windowWidth + 'px';

            //下個圓點亮起
            this.style = 'border: 1px solid #FFF;opacity: 1;';
        }
    );
});

//滑鼠點擊
wrap.onmousedown = function (e) 
{
    //確認點擊，點擊位置
    let click = true;
    let downX = e.clientX;
    let downY = e.clientY;
    
    //輪播顯示值
    let warpLeft = parseInt(wrap.style.left);
    
    //誰先動
    let xFirst =true ;
    let yFirst =true ;

    //移動後的位置，移動的軸量
    let newX, moveX, moveY;

    //滑鼠點擊且移動，判斷誰先動
    document.onmousemove = function (e) 
    {
        if (downY - e.clientY > 0 && yFirst) {
            moveY = downY - e.clientY;
            wrap.style.bottom = moveY + "px";
            xFirst = false;
        } else if (downX - e.clientX != 0 && xFirst){
            moveX = downX - e.clientX;
            newX = warpLeft - moveX;
            wrap.style.left = newX + "px";
            yFirst = false;
        }
    };   
    
    //滑鼠鬆開
    document.onmouseup = out;
    //滑鼠離開頁面
    document.onmouseout = out;

    //滑鼠鬆開與離開
    function out() 
    {
        if (click == true && moveX > 0 && moveX > windowWidth / 5) {
            //舊的圓點暗掉
            dots.children[newLeft * -1].style = 'border: none;opacity: 0.2;';
            newLeft -= 1;
            if (newLeft < -imgsUrl.length + 1) {
                newLeft = 0;
            };
        } else if (click == true && moveX < 0 && moveX < -windowWidth / 5) {
            //舊的圓點暗掉
            dots.children[newLeft * -1].style = 'border: none;opacity: 0.2;';
            newLeft += 1;
            if (newLeft > 0) {
                newLeft = -imgsUrl.length + 1;
            };
        };
        //鬆開判斷一次
        if (click == true) {
            wrap.style.left = newLeft * windowWidth + 'px';
            dots.children[newLeft * -1].style = 'border: 1px solid #FFF;opacity: 1;';
        };
        if (click ==true && moveY > 20) {
            close();
        } else if (click ==true && moveY < 20) {
            wrap.style.bottom = 0;
        };
        click = false;
        document.onmousemove = function () {}; 
    };
};

//關閉
document.querySelector('.close').addEventListener('click', close);

//rwd
function rwd (windowWidth, windowHeight) 
{
    //畫布RWD
    document.querySelector('.canvas').style.width = windowWidth + "px";

    //輪播長度
    wrap.style.width = imgsUrl.length * windowWidth + 'px';

    //原點容器長度
    dots.style.width = imgsUrl.length * 30 + 'px';

    //顯示圖片容器
    document.querySelectorAll('.imgBox').forEach(element => {
        element.style.width = windowWidth + 'px';
    });

    //顯示圖片RWD
    document.querySelectorAll('.imgBox img').forEach(element => {
        element.style.width = windowWidth + 'px';
        element.style.height = 'auto';
        if ( element.offsetHeight >= windowHeight ) {
            element.style.height =  windowHeight + 'px';
            element.style.width = 'auto';
        } else {
            element.style.width = windowWidth + 'px';
            element.style.height = 'auto';
        } ;
    });
};

//關閉
function close()
{
    //隱藏畫布，顯示初始頁面
    document.querySelector('.imgs').style.display = 'block';
    document.querySelector('.canvas').style.display = 'none';  
    
    //圓點暗掉
    dots.children[newLeft * -1].style = 'border: none;opacity: 0.2;';

    //初始化高度
    wrap.style.bottom = 0;
};

