$(function() {
	layui.use(['table', 'layer', 'upload', 'form', 'layedit', 'laydate', 'tree'], function() {
		var table = layui.table,
			form = layui.form,
			$ = layui.jquery,
			layer = layui.layer,
			layedit = layui.layedit,
			laydate = layui.laydate,
			upload = layui.upload;

		//获取数据集序号Id
		dataId = $('#dataSetId').val();
		$.ajax({
			type: "post",
			url: urlname + "user/allUser.action",
			async: false,
			success: function(data) {
				//				/alert("ajax");
				//debugger;
				var jsonData = JSON.parse(data);
				if(jsonData.code == "0" || jsonData.code == 0) {
					for(var j = 0; j < jsonData.message.length; j++) {
						//  alert(jsonData.message[j]);
						str = jsonData.message[j];
						console.log(str);
						$("#lablePersonnel").append('<option value="' + str + '">' + str + '</option>');
						$("#examinePersonnel").append('<option value="' + str + '">' + str + '</option>');
						$("#establishPersonnel").append('<option value="' + str + '">' + str + '</option>');
					}
					renderForm();
				} else {
					alert("没有可指定人员")
				}
			}
		});
		//标注人员
		lable = "";
		examine = "";
		establis = "";
		form.on('select(lableName)', function(data) {
			console.log(data.value); //得到被选中的值
			lable = data.value;
			//alert(lable);
		});
		//检查人员
		form.on('select(examineName)', function(data) {
			console.log(data.value); //得到被选中的值
			examine = data.value;
			//	alert(examine);
		});
		//创建人员
		form.on('select(establishName)', function(data) {
			console.log(data.value); //得到被选中的值
			establis = data.value;
			//alert(establis);
		});

		laydate.render({
			elem: '#date',
			type: 'datetime'
		});
		$("#dataSetconfirm").off();
		$("#dataSetconfirm").on("click", function() {
			//任务名
			taskName = $("#taskName").val();
			//描述
			descriptor = $("#descriptor").val();
			//获取当前时间
			creationTime = (new Date()).valueOf();
			//待完成任务时间
			time = $("#date").val();
			formatTimeS = new Date(time).getTime();
			
			var task = new FormData();
			var imgdata = document.getElementById("lacalFolder").files;
			tasks = {};
			for(var i = 0; i < imgdata.length; i++) {
				console.log(imgdata[i]);
				//task["imgFiles"] = imgdata[i];
				task.append("imgFiles", imgdata[i]);
			}
			tasks["taskName"] = taskName;
			tasks["taskDescription"] = descriptor;
			tasks["demarcationPersonnel"] = lable;
			tasks["inspector"] = examine;
			tasks["creators"] = establis;
			tasks["creationTime"] = creationTime;
			tasks["waitForTime"] = formatTimeS;
			tasks["datasetId"] = dataId;

			task.append("task", JSON.stringify(tasks));
			console.log(task);	
			
			$.ajax({
				type: "post",
				url: urlname + "task/saveTask",
				async: false,
				data: task,
				// 告诉jQuery不要去处理发送的数据
				processData: false,
				// 告诉jQuery不要去设置Content-Type请求头
				contentType: false,
				success: function(data) {
					//debugger;
						var jsonData = JSON.parse(data);
						console.log(jsonData);
						console.log(jsonData.message);
						
							if(jsonData.code == "0" || jsonData.code == 0) {
								alert("成功");
								console.log("success");
							}	if(jsonData.code == "-1" || jsonData.code == -1) {
								alert("失败");
								console.log("success");
							}	if(jsonData.code == "-2" || jsonData.code == -2) {
								alert("无参数");
								console.log("success");
							}	if(jsonData.code == "-3" || jsonData.code == -3) {
								alert("无权限");
								console.log("success");
							}	if(jsonData.code == "-4" || jsonData.code == -4) {
								alert("任务名称已存在");
								console.log("success");
							}if(jsonData.code == "-5" || jsonData.code == -5) {
								alert("图片保存异常");
								console.log("success");
							}
					
					
				},
				error: function(responseStr) {
					alert("失败");
					console.log("error");
				}

			});
		});
		/*upload.render({
			elem: '#test1',
			url: urlname + "task/saveTask",
			accept: 'file', //允许上传的文件类型
			multiple: true, //支持多文件上传
			auto: false,
			bindAction: '#dataSetconfirm', //指向一个按钮触发上传
			before: function(data) {
				//layer.load(); //上传loading
				alert("走没走");
				task = {};
				//任务名
				taskName = $("#taskName").val();
				//描述
				descriptor = $("#descriptor").val;
				//获取当前时间
				creationTime = (new Date()).valueOf();
				//待完成任务时间
				time = $("#date").val();
				
				console.log(taskName);
				alert(taskName);
				task["taskName"] = taskName;
				task["taskDescription"] = descriptor;
				task["demarcationPersonnel"] = lable;
				task["inspector"] = examine;
				task["creators"] = establis;
				task["creationTime"] = creationTime;
				task["waitForTime"] = time;
				task["datasetId"] = dataId;
				this.data = {
					'task': JSON.stringify(task)
				};
			},
			alldone: function(res) {
				//上传完毕回调
				alert("成功");
			},
			error: function() {
				//请求异常回调
				alert("失敗");
			}

		});*/
	});
});

function renderForm() {
	layui.use('form', function() {
		var form = layui.form;
		form.render();
	});
}