window.onload = function(){

    var index = 1;

    var container = document.getElementsByClassName("container")[0];
    var banner = document.getElementsByClassName("banner")[0];
    var img = document.getElementsByClassName("banner_img")[0];
    var li = document.getElementsByClassName("banner_li");
    var arrows = document.getElementsByClassName("arrow");

    var buttonContainer = document.getElementsByClassName("button_container")[0];

    var buttons = document.getElementsByClassName("button_container_circle");

    var prev = document.getElementsByClassName("prev")[0];
    var next = document.getElementsByClassName("next")[0];


    var timer;

    stopAnimation();

    startAnimation();

    controlMouse();


    /*绑定button事件*/
    bindClickButton();


    //单个图片长度 offset
    var offset = img.offsetWidth;

    container.style.width = offset + "px";//图片长度
    container.style.height = img.offsetHeight + "px";//单个图片高度
    container.style.overflow = "hidden";

    //banner设置宽高
    banner.style.height = img.offsetHeight + "px";
    banner.style.width = offset * li.length + "px";
    banner.style.left = -offset + "px";

    //初始化arrow高度
    for(var i = 0; i < arrows.length; i++){
        arrows[i].style.top = parseInt(img.offsetHeight)/2 - parseInt(arrows[i].offsetHeight)/2 + 'px';
    }

    //初始化button位置
    buttonContainer.style.top = img.offsetHeight - 40 + "px";
    buttonContainer.style.left = (offset - buttonContainer.offsetWidth)/2 + 'px'; 

    /*向左*/
    prev.onclick = function(){
        index--;
        animate();
    }
    /*向右*/
    next.onclick = function(){
        index++;
        animate();
    }

    /*轮播动画*/
    function animate(){
        banner.style.transition = "0.3s";
        banner.style.left = -parseInt(offset) * index + "px";

        //针对无限循环
        if(index === 0){
            index=li.length - 2;
            reLocation();
        }else if(index === li.length - 1){
            index = 1;
            reLocation();
        }

        controlButton();
    }

    function reLocation(){
        setTimeout(()=>{
            banner.style.transition = "0s";
            banner.style.left = -parseInt(offset) * index + "px";
        },300)
    }

    function controlButton(){
        var key;

        if(index == 0){
            key = 5;
        }else if(index == li.length - 1){
            key = 1;
        }else{
            key = index;
        }

        for(var i=0;i<buttons.length;i++){
            if(key == buttons[i].getAttribute('index')){
                buttons[i].className = 'button_container_circle on'
            }else{
                buttons[i].className = 'button_container_circle'
            }
        }

    }

    
    /*button绑定*/
    function bindClickButton(){
        for(var i=0;i<buttons.length;i++){
            (function(ii){
                buttons[ii].onclick = function(){
                    index = buttons[ii].getAttribute('index');
                    animate();
                }
            })(i)
        }
    }

    /*定时自动轮播*/
    function startAnimation(){
        timer = setInterval(function(){
            next.onclick();
        },2000)
    }

    /*停止动画*/
    function stopAnimation(){
        if(timer){
            clearInterval(timer);
        }
    }

    /*控制鼠标，避免和自动轮播冲突*/
    function controlMouse(){
        container.onmouseover = function(){
            //停止鼠标移动
            stopAnimation();
        }
        container.onmouseout = function(){
            //开始动画
            startAnimation();
        }

    }


}