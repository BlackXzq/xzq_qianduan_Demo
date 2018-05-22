
window.onload = function() {
	initData();
}

function initData() {
	showNowTime();
}

/**
 * 设置当前时间显示
 * 格式为 YYYY 年 MM 月 DD 日 星期 D HH:mm:ss
 */

function showNowTime() {
	var showDateE = document.getElementById("dateMake");
	var getDate = function() {
		var nowDate = new Date();
		var year = nowDate.getFullYear();
		var month = nowDate.getMonth();
		var nDate = nowDate.getDate();
		var weekD = nowDate.getDay();
		var hours = nowDate.getHours();
		var minutes = nowDate.getMinutes();
		var seconds = nowDate.getSeconds();
		showDateE.innerHTML = formatDate(getDateYMD(year, month, nDate), getWeekNum(weekD), getDetailTime(hours, minutes, seconds))
	};
	setTimeout(getDate, 1000);
}

function formatDate(YMD, Week, HMS) {
	return YMD + " " + Week + " " + HMS;
}

//获取年月日
function getDateYMD(Y, M, D) {
	return Y+"年" + filledNum(M+1) + "月" + filledNum(D) + "日";
}

//获取当前周几
function getWeekNum(weekday) {
	var weekStr = "星期日";
	switch(weekday) {
		case 0:
			weekStr = "星期日";
			break;
		case 1:
			weekStr = "星期一";
			break;
		case 2:
			weekStr = "星期二";
			break;
		case 3:
			weekStr = "星期三";
			break;
		case 4:
			weekStr = "星期四";
			break;
		case 5:
			weekStr = "星期五";
			break;
		case 6:
			weekStr = "星期六";
			break;
	}
	return weekStr;
}

function getDetailTime(H, M, S) {
	return filledNum(H)+":" + filledNum(M) + ":" + filledNum(S);
}

//补全日期位数
function filledNum(value) {
	if(value < 10) {
		return "0"+value.toString();
	}
	return value.toString();
}
