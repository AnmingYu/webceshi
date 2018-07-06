layui.use(['table', 'layer'], function() {
	//监听工具条


	


	var table = layui.table,
		$ = layui.jquery;
	//获取数据集序号Id
	dataId = $('#dataId').val();
	dataIntId = Number(dataId);
	dataSetId = JSON.stringify(dataIntId);
	console.log(dataId);
	console.log(dataIntId);
	console.log(dataSetId);
	//alert(dataId);
	taskId = 0;
	tasklistName = $('#searchtask').val(),
		//第一个实例
		table.render({
			elem: '#taskList',
			cellMinWidth : 95,
			height : "full-125",
			url: urlname + "task/selectTask", //数据接口
			page: true, //开启分页
			where: {
				taskName: tasklistName,
				datasetId: dataSetId,
			},
			limit: 10,
			limits: [10, 20, 50, 100, 500],
			id: 'testReloadDataSet',
			response: {
				countName: 'total', //数据总数的字段名称，默认：count
				dataName: 'message' //数据列表的字段名称，默认：data
			},
			cols: [
				[ //表头
					{
						field: 'taskid',
						title: '序号',
						width: 200,
						sort: true,
						fixed: 'left'
					}, {
						field: 'taskName',
						title: '任务名称',
						width: 240
					}, {
						field: 'taskDescription',
						title: '任务描述',
						event: 'setSign',
						width: 240,
						sort: false
					}, {
						field: 'creationTime',
						title: '创建时间',
						width: 240
					}, {
						field: 'creators',
						title: '创建人员',
						width: 240

					}, {
						field: 'authority',
						title: '权限',
						width: 240

					}, {
						fixed: 'right',
						title: '操作',
						width: 300,
						align: 'center',
						toolbar: '#barDemo'
					}
				]
			]
		});
	//debugger;
	//搜索
	$("#searchBtn").on("click", function() {

		var demoReload = $("#searchtask");
		table.reload('testReloadDataSet', {
			where: {
				taskName: demoReload.val(),
			},
			page: {
				curr: 1 // 重新从第 1 页开始
			}
		});

	});
	//监听单元格事件
	table.on('tool(demoEvent)', function(obj) {
		var data = obj.data;
		
		if(obj.event === "detail") {
			layer.msg('ID：' + data.id + ' 的查看操作');
		} else if(obj.event === 'edit') {
			//编辑操作
			taskGetId = data.taskid;
			console.log(taskGetId)
			taskList(true);
		}
	});
	
	function taskList(edit) {
		$(function(){
		var index = layui.layer.open({
			title: "任务名称",
			type: 2,
			content: "taskAdd.html",
			success: function(layero, index) {
				var body = layui.layer.getChildFrame('body', index);
				if(edit) {
					body.find("#attribute").val(dataSetId);
					body.find("#gainTaskId").val(taskGetId);
					body.find(".newsName").val(edit.newsName);
					body.find(".abstract").val(edit.abstract);
					body.find(".thumbImg").attr("src", edit.newsImg);
					body.find("#news_content").val(edit.content);
					body.find(".newsStatus select").val(edit.newsStatus);
					body.find(".openness input[name='openness'][title='" + edit.newsLook + "']").prop("checked", "checked");
					body.find(".newsTop input[name='newsTop']").prop("checked", edit.newsTop);
					//form.render();
				}
				setTimeout(function() {
					layui.layer.tips('点击此处返回文章列表', '.layui-layer-setwin .layui-layer-close', {
						tips: 3
					});
				}, 500)
			}
		})
		layui.layer.full(index);
		//改变窗口大小时，重置弹窗的宽高，防止超出可视区域（如F12调出debug的操作）
		$(window).on("resize", function() {
			layui.layer.full(index);
		})
			});
	}
	
});