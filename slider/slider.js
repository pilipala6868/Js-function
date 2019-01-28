
$(document).ready(function() {

    //轮播盒高度设定
    $('.slideBox').height($('.slideImg2').height());
    //获取总图片数
    var imgSum = $('.slideImg').length;
    //轮播速度
    var sliderSpeed = 4000;


    //下方方块按钮
    $('.slideImg').each(function() {
        $('.slideBt').append($('<span></span>'));
    })
    //点击左右方向按钮
    $('.btns#previous').click(function() { rightSlide() });
    $('.btns#next').click(function() { leftSlide() });


    //自动轮播
    var slideGo = setInterval(leftSlide, sliderSpeed);

    //鼠标移入轮播图
    $('.slideBox').hover(function() {
        //方向键显示
        $('.btns').show();
        //停止轮播
        clearInterval(slideGo);
    }, function() {
        $('.btns').hide();
        slideGo = setInterval(leftSlide, sliderSpeed);
    });

    //鼠标移入定位方块
    $('.slideBt span').hover(function() {
        //停止轮播
        clearInterval(slideGo);
        //处理轮播位置
        var spanIndex = $(this).index();
        var lightUpIndex = $('.slideBt .lightUp').index();
        //不同方块
        if (spanIndex < lightUpIndex)
            for (var i=0; i<lightUpIndex - spanIndex; i++)
                rightSlide();
        else if (spanIndex > lightUpIndex)
            for (var i=0; i<spanIndex - lightUpIndex; i++)
                leftSlide();
    }, function() {
        //继续轮播
        slideGo = setInterval(leftSlide, sliderSpeed);
    });


    //绑定图片点击事件
    function clickSlide()
    {
        $('.slideImg').unbind('click');
        $('.slideImg2').click(function() { 
            window.location.href = $(this).attr('link');  //点击中间图片链接跳转
        });
        $('.slideImg1').click(function() { rightSlide() });
        $('.slideImg3').click(function() { leftSlide() });
    }
    clickSlide();

    //下方方块随轮播变化
    function slideBtUpdate()
    {
        $('.lightUp').removeClass('lightUp');
        var rightIndex = $('.slideImg2').index();
        $('.slideBt span').eq(rightIndex).addClass('lightUp');
    }
    slideBtUpdate();
    
    //左移
    function leftSlide()
    {
        var temp = $('.slideImg').eq(imgSum-1).attr('class');
        for(var i=imgSum-1; i>0; i--)
            $('.slideImg').eq(i).attr('class', $('.slideImg').eq(i-1).attr('class'));
        $('.slideImg').eq(0).attr('class', temp);
        
        clickSlide();  //重新绑定点击
        slideBtUpdate();  //位置方块变化
    }
    //右移
    function rightSlide()
    {
        var temp = $('.slideImg').eq(0).attr('class');
        for(var i=0; i<imgSum-1; i++)
            $('.slideImg').eq(i).attr('class', $('.slideImg').eq(i+1).attr('class'));
        $('.slideImg').eq(imgSum-1).attr('class', temp);
        
        clickSlide();  //重新绑定点击
        slideBtUpdate();  //位置方块变化
    }

});
