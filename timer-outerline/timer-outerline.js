$(document).ready(function() {

	var intervalTime = 60 * 1000 / 360;  //定时器间隔时间（1度）

	var pointnum = "";  //初始化polyline的points属性值
	var radius = parseInt($("#clock").css('width')) / 2;  //半径为时钟半径
	var x, y, radian;
	var angle = 0;

	//时间轴流动
	var timetravel = setInterval(function() {

		//转完一圈停止
		if (angle >= 360)
			clearInterval(timetravel);

		//角度转弧度
		radian = angle * (Math.PI / 180);  

		//计算x,y坐标值
		x = (radius + Math.sin(radian) * radius + 5).toFixed(1);
		y = (radius - Math.cos(radian) * radius + 5).toFixed(1);

		//增加points属性值
		pointnum += x + ',' + y + ' ';
		$("polyline").attr('points', pointnum);

		angle++;
		
	}, intervalTime);
});