// var objDemo = document.getElementsByClassName("demo")[0];
// var objSmallBox = document.getElementsByClassName("small-box")[0];
// var objMark = document.getElementsByClassName("mark")[0];
// var objFloatBox = document.getElementsByClassName("float-box")[0];
// var objBigBox = document.getElementsByClassName("big-box")[0];
// var objBigBoxImage = objBigBox.getElementsByTagName('img')[0];

//鼠标进入事件
// objMark.onmouseover = function(){
//     objFloatBox.style.display = "block";
//     objBigBox.style.display = "block";
// }



//鼠标移出事件
// objMark.onmouseout = function(){
//     objFloatBox.style.display = "none";
//     objBigBox.style.display = "none";
// }



$(".demo").mouseover(function(){
    $(".big-box").css("display","block");
    $(".float-box").css("display","block");
});
$(".demo").mouseout(function(){
    $(".big-box").css("display","none");
    $(".float-box").css("display","none");
});



//鼠标移动事件 
// objMark.onmousemove = function(ev){
//     var _event = ev || window.event;

$(".demo").mousemove(function(event){




//获取放大镜的位置，left&top
/*client(X,Y):事件被触发时鼠标指针相对于浏览器页面的坐标
offset(left,top,......):自身外边框到定位父级的内边框的距离
offset(Width,Height):实际的 width + borderwidth + padding + scrollbar
*/

var left = event.clientX;
var top = event.clientY;

// var left = _event.clientX - objDemo.offsetLeft - objSmallBox.offsetLeft - objFloatBox.offsetWidth/2;//_event.clientX-50-0-162/2
// var top = _event.clientY - objDemo.offsetTop - objSmallBox.offsetTop - objFloatBox.offsetHeight/2;//_event.clientY-50-0-122/2

var nleft = left - $(".demo").offset().left - $(".float-box").width()/2;
var ntop = top - $(".demo").offset().top - $(".float-box").height()/2;




if(nleft < 0){
    nleft = 0;
}
// else if(left>(objMark.offsetWidth - objFloatBox.offsetWidth)){//left>400-162
//     left = objMark.offsetWidth - objFloatBox.offsetWidth;
// }

else if(nleft>($(".demo").width() -  $(".float-box").width())){//left>400-162
    nleft = $(".demo").width() -  $(".float-box").width();
}

if(ntop < 0){
    ntop = 0;
}else if(ntop>($(".demo").height() - $(".float-box").height())){//top>255-122
    ntop = $(".demo").height() - $(".float-box").height();
}


$(".float-box").css({
    left:nleft+"px",
    top:ntop+"px"
});

// objFloatBox.style.left = left + "px";
// objFloatBox.style.top = top + "px";

//按百分比显示
// var percentX = left / (objMark.offsetWidth - objFloatBox.offsetWidth);//left/(400-162)
// var percentY = top / (objMark.offsetHeight - objFloatBox.offsetHeight);//top/(255-122)
// objBigBoxImage.style.left = -percentX * (objBigBoxImage.offsetWidth - objBigBox.offsetWidth)+ "px";
// objBigBoxImage.style.top = -percentY * (objBigBoxImage.offsetHeight - objBigBox.offsetHeight)+ "px";




$(".big-box>img").css({
    left:-nleft*$(".demo").width()/$(".float-box").width()+"px",
    top:-ntop*$(".demo").height()/$(".float-box").height()+"px"
});
})

