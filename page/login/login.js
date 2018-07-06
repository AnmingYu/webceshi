layui.use(['form', 'layer', 'jquery'], function() {
	var form = layui.form,
		layer = parent.layer === undefined ? layui.layer : top.layer
	$ = layui.jquery;

	$(".loginBody .seraph").click(function() {
		layer.msg("这只是做个样式，至于功能，你见过哪个后台能这样登录的？还是老老实实的找管理员去注册吧", {
			time: 5000
		});
	});

	//登录按钮
	form.on("submit(login)", function(data) {
		var id = $.trim($("#id").val()); //获取用户名  
		var password = $.trim($("#password").val()); //密码
		
		// var validateCode = $.trim($("#validateCode").val());  
		//var url = 'doLogin/managerLogin.action';
		// var param = {"username": username, "password": password, "validateCode": validateCode}; 
		var formParam = $("#form1").serialize(); //序列化表格内容为字符串   
		
		var managerBean={
			id:id,
			password:password
		}
		var bol = false;
		debugger;
		$.ajax({
			type: 'post', 
			url:urlname+"login/managerLogin.action",
			async: false,
			data:formParam,
			dataType: 'json',
			success: function(data) {
				if(data.code == "0"||data.code==0) {
					//alert("成功");
					bol=true;
				}else if(data.code == "-1"){
					alert("登录失败！");
					return false;
				}else {
					alert("登录异常");
					return false;
				}
			}
		});
		
		return bol;
	});

	//表单输入效果
	$(".loginBody .input-item").click(function(e) {
		e.stopPropagation();
		$(this).addClass("layui-input-focus").find(".layui-input").focus();
	})
	$(".loginBody .layui-form-item .layui-input").focus(function() {
		$(this).parent().addClass("layui-input-focus");
	})
	$(".loginBody .layui-form-item .layui-input").blur(function() {
		$(this).parent().removeClass("layui-input-focus");
		if($(this).val() != '') {
			$(this).parent().addClass("layui-input-active");
		} else {
			$(this).parent().removeClass("layui-input-active");
		}
	})
})