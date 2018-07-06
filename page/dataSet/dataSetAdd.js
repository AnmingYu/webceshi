layui.use(['table', 'layer', 'form', 'tree'], function() {
	var table = layui.table,
		form = layui.form,
		$ = layui.jquery
		
		
	//设置选着模板 空模板 0

	//弹出框
	$("#newBtn").on("click", function() {
		miaoshu = 0;
		parameterName = layer.open({
			type: 1,
			title: ['任务数据', 'font-size:18px;', ],
			shade: false,
			skin: 'layui-layer-molv', //加上边框
			area: ['420px', '240px'], //宽高
			content: $("#layform")
		});
	});

	$.ajax({
		type: "post",
		url: urlname + "template/selectTemName.action ",
		async: false,
		success: function(data) {
			var jsonData = JSON.parse(data);
			console.log(jsonData);
			alert(jsonData.message);
			if(jsonData.code == "0" || jsonData.code == 0) {
				//var a=data.message.length;
				for(var j = 0; j < jsonData.message.length; j++) {
					//  alert(jsonData.message[j]);
					str = jsonData.message[j];
					console.log(str);
					$("#existtemp").append('<option value="' + str + '">' + str + '</option>');
				}
				renderForm();
			} else {
				alert("模板不存在");
			}
		}

	});

	form.on('select(dataSetName)', function(data) {
		console.log(data.value); //得到被选中的值
		value = data.value;
	});

	//确定
	$("#dataSetconfirm").off();
	$("#dataSetconfirm").on("click", function() {

		//数据集名称
		dataSetTask = $("#dataSetContext").val();
		//数据集描述
		dataSetDescribe = $("#describeName").val();
		//模板名称
		templateName = value;
		alert(templateName);
		//获取当前时间
		creationTime = (new Date()).valueOf();
		var dataset = {
			
		};
	    	dataset["dataSetTask"] = dataSetTask;
			dataset["dataSetDescribe"] = dataSetDescribe;
			dataset["temName"] = templateName;
			dataset["creationTime"] = creationTime;

		$.ajax({
			type: "post",
			url: urlname + "dataset/saveDataSet.action",
			contentType: "application/json",
			data: 
				JSON.stringify(dataset)
			,
			success: function(data) {
				var jsonData = JSON.parse(data);
				if(jsonData.code == 0 || jsonData.code == "0") {
					alert("成功");
				} else if(jsonData.code == -1 || jsonData.code == "-1") {
					alert("失败");
				} else if(jsonData.code == -2 || jsonData.code == "-2") {
					alert("参数获取失败");
				} else if(jsonData.code == -3 || jsonData.code == "-3") {
					alert("没有操作权限");
				} else if(jsonData.code == -4 || jsonData.code == "-4") {
					alert("数据集名称已存在");
				} else if(jsonData.code == -5 || jsonData.code == "-5") {
					alert("保存数据异常");
				}
			}
		});
	});

	//取消
	$("#quxiao").on("click", function() {
		$("#mingcheng").val("");

	});

});

function renderForm() {
	layui.use('form', function() {
		var form = layui.form;
		form.render();
	});
}