
var postfixList = ['163.com', 'gmail.com', '126.com', 'qq.com', '263.net'];

window.onload = function() {
	initData();
}

function initData() {
	var input = document.getElementById('email-input');
	var ul = document.getElementById('email-sug-wrapper');
	// 指针
	var cont = true;
	var indexOne = 0;
	// 定义一个空元素用于接受返回值
	var list = [];
	// 进入页面聚焦在input
	input.focus();
	// 输入框的input事件
	input.addEventListener('input', function () {
		var str = input.value.trim();
		list = getPrompt(str);
		disInput(str); 
		if (str.length === 0) {
			cont = false;
		} else {
			cont = true;
		}
		getDisplay(cont);
	});
	// 键盘事件
	input.addEventListener('keydown', function (e) {
		// 向上
		if (e.keyCode == 38) {
			// 判断 indexOne 是否 0
			if (indexOne === 0) {
				indexOne = list.length - 1;
			} else {
				indexOne--;
			}
		}
		// 向下
		if (e.keyCode == 40) {
			// 判断 indexOne 是否等于list的长度 - 1
			if (indexOne === list.length - 1) {
				indexOne = 0;
			} else {
				indexOne++;
			}
		}
		// 回车
		if (e.keyCode === 13) {
			input.value = list[indexOne];
			getDisplay(false);
		}
		// esc全选
		if (e.keyCode === 27) {
			input.select();
		}
		disInput(list);
	});
	// 单击事件
	ul.addEventListener('click', function (e) {
		var target = e.target || event.target;
		input.value = target.innerText;
		input.focus();
		getDisplay(false);
	})
	// 检测输入是否变化
	function disInput(str) {
		if (str.length === 0) {
			return;
		} else {
			while (ul.firstChild) {
				ul.removeChild(ul.firstChild);
			}
			list.forEach(function (item, index) {
				var li = document.createElement('li');
				li.innerHTML = item;
				if (index === indexOne) {
					li.style.backgroundColor = '#f0f0f0';
				}
				ul.appendChild(li);
			});
		}
	}
	// 判断ul的display属性
	function getDisplay(cont) {
		if (cont) {
			ul.style.display = 'block';
		} else {
			ul.style.display = 'none';
		}
	}
	// 提示内容
	function getPrompt(str) {
		var arr = [];
		var res = [];
		// 检索输入字符里是否有@符号
		var hasStr = !(str.indexOf("@") === -1);
		var strArr = "";
		if (hasStr) {
			var index = str.indexOf("@");
			strArr = str.slice(index + 1);
			str = str.slice(0, index);
		}
		postfixList.forEach(function (el) {
			if (el.indexOf(strArr) === 0) {
				res.push(str + "@" + el);
			}
			arr.push(str + "@" + el);
		});
		return res.length ? res : arr;
	}

}
