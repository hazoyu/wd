//实现模糊查询======================
let keyword=document.querySelector('.keyword');//获取输入框
let searchHelper=document.querySelector('.search-helper');//获取下拉列表
//定义数组
let searchArr=['小米手机','华为手机','苹果手机','小米平板','苹果12','苹果手表'];
//给输入框绑定内容改变事件  oninput 事件在元素获得用户输入时发生
keyword.oninput=function(){
    searchHelper.innerHTML='';
    for(let i=0 ;i<searchArr.length;i++){
        if(searchArr[i].indexOf(keyword.value)!=-1){
            searchHelper.innerHTML+="<p>"+searchArr[i]+"</p>";
            searchHelper.style.display="block";
        }
    }
}
//onblur 事件发生在对象失去焦点时
keyword.onblur=function(){
    searchHelper.style.display='none';
}

//实现轮播图切换======================
let img =document.querySelector('.img');
let prev =document.querySelector('.prev');
let next =document.querySelector('.next');
let slide =document.querySelector('.slide');
let imgArr=['1.jpg','2.jpg','3.jpg','4.jpg'];
//拿到所有的li
let lis =document.querySelectorAll('.banner-btn li')

let count = 0;
//定义函数,用来切换图片路径
function cutImg(){
    img.src='./images/'+imgArr[count]
    for (let i=0;i<imgArr.length;i++){
        lis[i].className='';
    }
    lis[count].className='active';
}
//设置定时器,每隔三秒切换图片
let timer= setInterval(function(){
    count++;
    if(count>imgArr.length-1){
        count=0;
    }
    cutImg();
}, 2000);
//点击上一张
next.onclick=function(){
    count++
    if(count>imgArr.length-1){
        count=0;
    }
    cutImg();
}
//点击下一张
prev.onclick=function(){
    count--
    if(count<0){
        count=imgArr.length-1;
    }
    cutImg();
}
//鼠标滑入div,停止定时器
slide.onmouseover=function(){
    clearInterval(timer)
}
//鼠标滑出,启动定时器
slide.onmouseout=function(){
    timer= setInterval(function(){
        count++;
        if(count>imgArr.length-1){
            count=0;
        }
        cutImg();
    }, 2000);
}
//给li绑定点击事件
for(let i =0 ;i<lis.length;i++){
    lis[i].onclick=()=>{
        count=i;
        cutImg();
    }
}
//实现楼层定位切换=====================
let head=document.querySelector('.head');
let banner=document.querySelector('.banner');
let shortcut=document.querySelector('.shortcut');

let elevator=document.querySelector('.elevator');

//实现楼层滚动，文字变色效果========================
let items=document.querySelectorAll('.content .item');
let elevatorA=document.querySelectorAll('.elevator a');

let elevatorArr=[] ;//放4个数

//基础的高度
let base = head.offsetHeight+banner.offsetHeight+ shortcut.offsetHeight

for (let i = 0 ; i<items.length;i++){
    base=base+items[i].offsetHeight;
    elevatorArr.push(base);
}

//去除颜色函数
function clearColor(){
    for(let i=0;i<elevatorA.length;i++){
        elevatorA[i].style.color='';
    }
}

let search=document.querySelector('.search')
let searchM=document.querySelector('.search-m')
let searchLogo=document.querySelector('.search-logo')

//onscroll滚动事件
document.onscroll=function(){
    //获取滚动条垂直方向滚动了多少
    let top=document.documentElement.scrollTop || document.body.scrollTop
    //获取header的高度    clientHeight不包括height、padding、border
    let headHeight= head.offsetHeight; //包括height、padding、border

    let bannerHeight= banner.offsetHeight;
    let shortcutHeight= shortcut.offsetHeight;
    //当滚动条滚动到一定程度时，将楼层的定位换成固定定位
    if(top>=headHeight+bannerHeight+shortcutHeight-30){
        elevator.className='elevator elevator-fix'
        search.className='search search-fix'
        searchM.style.height='50px'
        searchLogo.style.display='block'

    }else{
        elevator.className='elevator'
        search.className='search'
        searchM.style.height='60px'
        searchLogo.style.display='none'
    }

    if(top>=headHeight+bannerHeight+shortcutHeight && top<elevatorArr[0]+40){
        clearColor();
        elevatorA[0].style.color='red';
    }else if (top>=elevatorArr[0]+40 && top<elevatorArr[1]+40  ){
        clearColor();
        elevatorA[1].style.color='red';
    }else if (top>=elevatorArr[1]+40 && top<elevatorArr[2]+40   ){
        clearColor();
        elevatorA[2].style.color='red';
    }else if (top>=elevatorArr[2]){
        clearColor();
        elevatorA[3].style.color='red';
    }else{
        clearColor();
    }
}