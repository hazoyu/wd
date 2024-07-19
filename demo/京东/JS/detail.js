//实现前进和后退小图片效果=====================
let prev=document.querySelector('.prev');
let next = document.querySelector('.next');
let ul = document.querySelector('.spec-items ul');
let lis = document.querySelectorAll('.spec-items ul li');
let img=document.querySelector('.mian-img img')
let zoomDivImg=document.querySelector('.zoom-div img');

prev.onclick=function(){
    ul.style.left='0';
    prev.style.background='url(./images/disabled-prev.png)'
}
next.onclick=function(){
    ul.style.left='-116px';
    prev.style.background=''
}

/**
 * 可以有过度效果：
 * 1.数字类
 * 2.颜色类
 * 3.转换：位移、旋转、缩放、倾斜
 * 4.盒阴影
 */

let imgs=document.querySelectorAll('.spec-items img')
//实现鼠标滑入显示图片=======================
for(let i=0;i<lis.length;i++){
    lis[i].onmouseover=function(){
        for(let j=0;j<lis.length;j++){
            lis[j].className='';
        }
        lis[i].className='img-hover';
        //显示大图
        //法一 img.src="./images/"+(i+1)+".webp"; 
        //法二 等于img.src=lis[i].children[0].src;
        //法三 img.src=imgs[i].src;
        img.src=imgs[i].src;
        zoomDivImg.src=imgs[i].src;
    }
}

let mianImg=document.querySelector('.mian-img');
let zoomPup=document.querySelector('.zoom-pup');
let zoomDiv=document.querySelector('.zoom-div');

//鼠标移入
mianImg.onmouseover=function(){
    zoomPup.style.display='block';
    zoomDiv.style.display='block';
}
//鼠标滑出
mianImg.onmouseout=function(){
    zoomPup.style.display='none';
    zoomDiv.style.display='none';
}
//鼠标移动
mianImg.onmousemove=function(e){
    //获取鼠标距离文档顶部的距离
    let pageY=e.pageY;
    //获取鼠标距离文档左部的距离
    let pageX=e.pageX;
    //获取到中图距离文档顶部的距离
    let offsetTop=mianImg.offsetTop;
    //获取到中图距离文档左部的距离
    let offsetLeft=mianImg.offsetLeft;
    //获取黄色小块的高度的一半 小块是正方形宽高一样
    let h=zoomPup.clientHeight/2;
    //中图的高度
    let H=mianImg.clientHeight
   
    let top=pageY-offsetTop-h;
    let left=pageX-offsetLeft-h;
    
    if(top<=0){
        top=0;
    }else if(top>=H-h*2){
        top=H-h*2;
    }

    if(left<=0){
        left=0
    }else if(left>=H-h*2){
        left=H-h*2;
    }

    zoomPup.style.top=top+'px';
    zoomPup.style.left=left+'px';
    

    //放大镜效果 法一
    //大图距离左边距离最远260px  中图距离左边距离最远114px  为260/114=2.28倍 X
    //大图反向移动   因为都是正方形所以就不另外计算Y
    // zoomDivImg.style.top=top*-2.28+'px';
    // zoomDivImg.style.left=left*-2.28+'px';
    //法二 gen
    //根据比例计算
    let y=top/(mianImg.clientHeight-zoomPup.clientHeight);
    let yy=y*(800-540);

    let x=left/(mianImg.clientWidth-zoomPup.clientWidth);
    let xx=x*(800-540);
    zoomDivImg.style.top=-yy+'px';
    zoomDivImg.style.left=-xx+'px';
    
    
}

//实现购物车数量改变
let reduce=document.querySelector('.reduce');
let add=document.querySelector('.add');
let buyNum=document.querySelector('.buy-num');

add.onclick=function(){
    buyNum.value++
    if(buyNum.value>1){
        reduce.className=('reduce');
    }
}

reduce.onclick=function(){
    buyNum.value--
    if(buyNum.value<=1){
        buyNum.value=1
        reduce.className=('reduce disabled');
    }
}