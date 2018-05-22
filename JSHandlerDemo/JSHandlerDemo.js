

window.onload = function() {
	initData();
}

function initData() {
	checkInputContent();
	showTempContent();
}

/**
 * 添加btnlist事件
 */
function checkInputContent() {
	var btnListE = document.querySelector("#btnList");
	btnListE.onclick = function(event) {
		var currentE = event.target;
		if(currentE.nodeName.toLowerCase() == "button") {
			var targetID = currentE.id;
			hanlerBtnClick(targetID);
		}
	}
}

function hanlerBtnClick(btnId) {
	
	var radioA = document.querySelector("#radio-a");
	var inputTxtA = document.querySelector("#num-a");
	var radioB = document.querySelector("#radio-b");
	var inputTxtB = document.querySelector("#num-b");
	var showP = document.querySelector("#result");
	
	var inputATxt = inputTxtA.value;
	var inputBTxt = inputTxtB.value;
	var selectInputTxt = "";
	var selectInputE = null;
	var showMessage = "";
	
	if (radioA.checked) {
		selectInputTxt = inputATxt;
		selectInputE = inputTxtA;
	}
	if(radioB.checked) {
		selectInputTxt = inputBTxt;
		selectInputE = inputTxtB;
	}
	
	if(selectInputE == null) {
		alert("请选择要检测的Number内容");
		return;
	}
	if (!checkNumber(selectInputTxt)) {
  		alert("请输入正确数字");
  		return ;
 	}	
	
	switch(btnId) {
		case "btn0":
			
		break;
		case "btn1":
			
		break;
		case "btn2":
			var num = Math.abs(parseFloat(selectInputTxt));
			showMessage = "当前选中数字的绝对值：" + num;
		break;
		case "btn3":
			
		break;
		case "btn4":
			
		break;
		case "btn5":
			var num = Math.round(parseFloat(selectInputTxt));
			showMessage = "当前选中的数字四舍五入为整数：" + num;
		break;
		case "btn6":
			var maxNum = "";
			if(compareNum(inputATxt, inputBTxt)) {
				maxNum = inputATxt;
			} else {
				maxNum = inputBTxt;
			}
			showMessage = "A 和 B 中的最高值：" + maxNum;
		break;
		case "btn7":
			var minNum = "";
			if(compareNum(inputATxt, inputBTxt)) {
				minNum = inputBTxt;
			} else {
				minNum = inputATxt;
			}
			showMessage = "A 和 B 中的最低值：" + minNum;
		break;
	}
	showP.innerHTML = showMessage;
}

//验证字符串是否是数字
function checkNumber(theObj) {
	if(theObj.length == 0 || isNaN(theObj)) {
		return false;
	}
	return true;
}
//比较大小
function compareNum(num1, num2){
	if(num1.length == 0 || num2.length == 0) {
		alert("比较内容不能为空");
		return;
	}
 	if(parseFloat(num2) > parseFloat(num1))
 	{ 
 		return false; 
 	} 
 	return true; 
}



var tree = {
    "id": 0,
    "name": "root",
    "left": {
        "id": 1,
        "name": "Simon",
        "left": {
            "id": 3,
            "name": "Carl",
            "left": {
                "id": 7,
                "name": "Lee",
                "left": {
                    "id": 11,
                    "name": "Fate"
                }
            },
            "right": {
                "id": 8,
                "name": "Annie",
                "left": {
                    "id": 12,
                    "name": "Saber"
                }
            }
        },
        "right": {
            "id": 4,
            "name": "Tony",
            "left": {
                "id": 9,
                "name": "Candy"
            }
        }
    },
    "right": {
        "id": 2,
        "name": "right",
        "left": {
            "id": 5,
            "name": "Carl",
        },
        "right": {
            "id": 6,
            "name": "Carl",
            "right": {
                "id": 10,
                "name": "Kai"
            }        
        }
    }
}

var showSortMessage = "";
var showresultP = document.querySelector("#showSortResult");
// 假设id和name均不会重复，根据输入name找到对应的id
function submitName() {
	var inputNameE = document.querySelector("#inputName");
	if(inputNameE.value.length == 0) {
		alert("请输入需要查找的Name");
		return;
	}
	showSortMessage = "";
	findIdByName(tree, inputNameE.value);
	if(showSortMessage.length == 0) {
		showSortMessage = "未找到";
	}
	showresultP.innerHTML = inputNameE.value + ": " + showSortMessage;
}

function findIdByName(uobject, name) {
	if(uobject != null) {
		if(uobject["name"] == name) {
			showSortMessage += (uobject.id + " ");
		}
		findIdByName(uobject["left"], name);
		findIdByName(uobject["right"], name);
	}
}

// 假设id和name均不会重复，根据输入id找到对应的name
function submitID() {
	var inputIDE = document.querySelector("#inputID");
	if(inputIDE.value.length ==0) {
		alert("请输入需要查找的ID");
		return;
	}
	showSortMessage = "";
	findNameById(tree, inputIDE.value);
	if(showSortMessage.length == 0) {
		showSortMessage = "未找到";
	}
	showresultP.innerHTML = inputIDE.value + ": " + showSortMessage;
}
function findNameById(uobject, ID) {
	if(uobject != null) {
		if(uobject["id"] == ID) {
			showSortMessage += (uobject.name + " ");
		}
		findNameById(uobject["left"], ID);
		findNameById(uobject["right"], ID);
	}
}

// 把这个对象中所有的名字以“前序遍历”的方式全部输出到console中
function getListWithDLR() {
	showSortMessage = "";
	sortDLR(tree);
	showresultP.innerHTML = "前序遍历: " + showSortMessage;
}

function sortDLR(uobject) {
	if(uobject != null) {
		showSortMessage += (uobject["id"] + "  ");
		sortDLR(uobject["left"]);
		sortDLR(uobject["right"]);
	}
}

// 把这个对象中所有的名字以“中序遍历”的方式全部输出到console中
function getListWithLDR() {
	showSortMessage = "";
	sortLDR(tree);
	showresultP.innerHTML = "中序遍历: " + showSortMessage;
}

function sortLDR(uobject) {
	if(uobject != null) {
		sortLDR(uobject["left"]);
		showSortMessage += (uobject["id"] + "  ");
		sortLDR(uobject["right"]);
	}
}

// 把这个对象中所有的名字以“后序遍历”的方式全部输出到console中
function getListWithLRD() {
	showSortMessage = "";
	sortLRD(tree);
	showresultP.innerHTML = "后序遍历: " + showSortMessage;
}

function sortLRD(uobject) {
	if(uobject != null) {
		sortLRD(uobject["left"]);
		sortLRD(uobject["right"]);
		showSortMessage += (uobject["id"] + "  ");
	}
}

/**
 * 排序算法
 */

var tempArr = [
    {
        id: 1,
        name: 'candy',
        value: 40
    }, {
        id: 2,
        name: 'Simon',
        value: 50
    }, {
        id: 3,
        name: 'Tony',
        value: 45
    }, {
        id: 4,
        name: 'Annie',
        value: 60
    }
];

function showTempContent() {
	var showTTE = document.querySelector("#showTpArr");
	var showuseStr = "";
	for (var i = 0; i < tempArr.length; i++) {
		var item = tempArr[i];
		showuseStr += (JSON.stringify(item) + "<br/>");
	}
	showTTE.innerHTML = showuseStr;
}
function sortTempArr(sort) {
	var sortArry = tempArr.sort(function(item1, item2) {
		var item1Value = parseInt(item1.value);
		var item2Value = parseInt(item2.value);	
		if(sort == "0") {
			return item1Value - item2Value;
		} else {
			return item2Value - item1Value;
		}
	})
	var showsortTTE = document.querySelector("#showSortTempArry");
	showsortTTE.innerHTML = JSON.stringify(sortArry);
}

/**
 * 对象转化成数组
 */
var scoreObject = {
    "Tony": {
        "Math": 95,
        "English": 79,
        "Music": 68
    }, 
    "Simon": {
        "Math": 100,
        "English": 95,
        "Music": 98
    }, 
    "Annie": {
        "Math": 54,
        "English": 65,
        "Music": 88
    }
}

var menuArr = [
    [1, "Area1", -1],
    [2, "Area2", -1],
    [3, "Area1-1", 1],
    [4, "Area1-2", 1],
    [5, "Area2-1", 2],
    [6, "Area2-2", 2],
    [7, "Area1-2-3", 4],
    [8, "Area2-2-1", 6],
];

var showOAEl = document.getElementById("ObjectwithArray");

function Object2Array() {
	var temArray = [];
	for(key in scoreObject) {
		var obj = scoreObject[key];
		temArray.push([key, obj.Math, obj.English, obj.Music]);
	}
	console.log(temArray);
	showOAEl.innerHTML = temArray;
}

function Array2Object() {
	
}

