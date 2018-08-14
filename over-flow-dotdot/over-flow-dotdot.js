    
    //文段溢出显示省略号 (外部盒子选择器，内部文段选择器，文段最大高度，省略号内容)  
    function overFlowDotDot(outBox, boxText, textMaxHeight, ellipsis)  
    {  
        var origiText = new Array();  //存放会溢出的文段内容原文/缩略文  
        var overHeight = new Array();  //存放原溢出高度  
        //初始化  
        for (var i=0; i<$(boxText).length; i++)  
        {  
            origiText[i] = "0";  
            overHeight[i] = 0;  
        }  
        $(boxText).each(function()  
        {  
            //判断文字是否溢出板块  
            if (parseInt($(this).css('height')) > textMaxHeight)  
            {  
                //存放好原文、溢出高度  
                var index = $(boxText).index(this);  
                origiText[index] = $(this).html();  
                overHeight[index] = parseInt($(this).css('height')) - textMaxHeight;  
                //缩略文段  
                while (parseInt($(this).css('height')) > textMaxHeight)  
                {  
                    var text = $(this).text();  
                    var text = text.substring(0, text.length-10) + ellipsis;  
                    $(this).html(text);  
                }  
                //鼠标显示为可点击  
                $(this).css('cursor', 'pointer');  
            }  
        });  
      
        //鼠标点击缩略了的文段  
        $(boxText).click(function()  
        {  
            var index = $(boxText).index(this);  
            if (origiText[index] != "0")  //判断是不是有缩略的文段  
            {  
                var temp = $(this).html();  
                if ($(this).html().length < origiText[index].length)  //判断是否已点开  
                {  
                    $(this).parents(outBox).animate({height: "+=" + overHeight[index]}, 100, function()  
                    {  
                        $(this).find(boxText).html(origiText[index]);  
                        origiText[index] = temp;  
                    });  
                }  
                else   
                {  
                    $(this).parents(outBox).animate({height: "-=" + overHeight[index]}, 100, function()  
                    {  
                        $(this).find(boxText).html(origiText[index]);  
                        origiText[index] = temp;  
                    });  
                }  
            }  
        })  
    }