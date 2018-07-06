layui.use(['form','layer'],function(){
    var form = layui.form
        layer = parent.layer === undefined ? layui.layer : top.layer,
        $ = layui.jquery;
        
		 $("#submit").on("click", function() {
		 			//var formParam = $("#form2").serializeObject(); //序列化表格内容为字符串   
			var param = {};
 			param["username"] = $.trim($("#userName").val()); //获取用户名
 			param["password"] = $.trim($("#password").val()); //密码
 			param["password2"] = $.trim($("#password2").val()); //在次输入密码
 			param["authority"] = $.trim($("#authority").val()); //权限

 			if(param["password"] != param["password2"]) {
 				alert("密码不一致，请从新输入" + param["password"]);
 			} else {
 				form.on("submit(addUser)", function(data) {
 					$.ajax({
 						type: "post",
 						url: urlname + "user/addUser.action",
 						data: param,
 						async: false,
 						cache: false,
 						dataType: 'json',
 						success: function(data) {
 							if(data.message.code == "0") {
 								setTimeout(function() {
 									top.layer.close(index);
 									top.layer.msg("用户添加成功！");
 									layer.closeAll("iframe");
 									//刷新父页面
 									parent.location.reload();
 								}, 2000);
 								var index = top.layer.msg('数据提交中，请稍候', {
 									icon: 16,
 									time: false,
 									shade: 0.8
 								});
 							} else if(data.message.code == "-1") {
 								alert("数据提交失败");
 							} else if(data.message.code == "-2") {
 								alert("用户名存在");
 							} else {
 								alert("异常");
 							}
 						}

 					});
 					return false;
 				});
 			}
		
		
        	
        // 实际使用时的提交信息
        // $.post("上传路径",{
        //     userName : $(".userName").val(),  //登录名
        //     userEmail : $(".userEmail").val(),  //邮箱
        //     userSex : data.field.sex,  //性别
        //     userGrade : data.field.userGrade,  //会员等级
        //     userStatus : data.field.userStatus,    //用户状态
        //     newsTime : submitTime,    //添加时间
        //     userDesc : $(".userDesc").text(),    //用户简介
        // },function(res){
        //
        // })
        
        return false;
    });
*/
   		 });	
   		 
   		
        
    //格式化时间
    function filterTime(val){
        if(val < 10){
            return "0" + val;
        }else{
            return val;
        }
    }
    //定时发布
    var time = new Date();
    var submitTime = time.getFullYear()+'-'+filterTime(time.getMonth()+1)+'-'+filterTime(time.getDate())+' '+filterTime(time.getHours())+':'+filterTime(time.getMinutes())+':'+filterTime(time.getSeconds());

})