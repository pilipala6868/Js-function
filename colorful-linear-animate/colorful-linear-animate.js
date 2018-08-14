

/* 
 * 七彩背景颜色并不断动态变化
 * element: 选择器
 * colorful: 颜色鲜艳度 (从ff-00越来越鲜艳，ff为一片空白)
 * angle: 角度 (to top, to bottom, to left, to right, 135deg, to top right...)
 * speed: 变化速度 (slow, normal, fast)
*/
function colorfulAnimate(element, colorful, angle, speed)
{
  //缺省参数
  element = element || "body";
  colorful = colorful || "bb";
  angle = angle || "to top";
  speed = speed || "normal";

  //变化速度
  var speedNum = {'slow': 100, 'normal': 60, 'fast': 20};

  //构建各层次的rgb
  var colorNum = parseInt(colorful, 16);
  var c = [
    [256, colorNum, colorNum],
    [256, 256, colorNum],
    [colorNum, 256, colorNum],
    [colorNum, 256, 256],
    [colorNum, colorNum, 256],
    [256, colorNum, 256]
  ];

  //各层次的下一个变化颜色
  var c2be = $.extend(true, [], c);
  changeC2be();

  //颜色动态变化
  function colorAnimate()
  {
    //时刻检测调整html大小（防止DOM高度小于浏览器窗口时，linear-gradient在firefox的bug）
    if ($("html").height() < $(document).height())
      $("html").height($(document).height()); 

    //这个c2be已经完成，更新
    if (c[0].toString() == c2be[0].toString())
      changeC2be();

    //变化c到下一个数值
    for (var i=0; i<6; i++)
      c[i] = c2next(c[i], c2be[i]);

    //更新css
    var linear = "linear-gradient(" + angle;
    for (var i=0; i<6; i++)
      linear += ", rgb(" + c[i][0] + ", " + c[i][1] + ", " + c[i][2] + ") " + i*20 + "%";
    linear += ")";

    $(element).css("background", linear);
  }
  setInterval(function() {colorAnimate();}, speedNum[speed]);

  //颜色值加减
  function c2next(orig, next)
  {
    for (var i=0; i<3; i++)
    {
      if (orig[i] != next[i])
      {
        if (orig[i] > next[i])
          orig[i]--;
        else
          orig[i]++;
        break;
      }
    }
    return orig;
  }

  //更新下一个变化颜色
  function changeC2be()
  {
    c2be.push(c2be.shift());
  }
}