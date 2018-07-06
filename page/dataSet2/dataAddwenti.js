layui.use(['table', 'layer', 'form', 'tree'], function() {
	var table = layui.table,
		form = layui.form,
		$ = layui.jquery
       

	debugger;
	var categoryName="";
	//确定
	debugger;
	$("#dataSetconfirm").off();
	$("#dataSetconfirm").on("click", function() {
		dataSetname = $("#dataSetName").val();
		form.on('select(requireddata)', function(data) {　　
		  category = data.value;
		  categoryName = data.elem[data.elem.selectedIndex].text
		  alert(categoryName);
		　 form.render("#dataSetTem");
	});
	
	});

	//获取选着模板
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
					$("#dataSetTem").append('<option value="">' + str + '</option>');
				}
				//renderForm();
			} else {
				alert("模板不存在");
			}
		}

	});

});
/*function renderForm() {
	layui.use('form', function() {
		var form = layui.form;
		form.render();
	});
}*/