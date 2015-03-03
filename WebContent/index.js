Ext.onReady(function(){
	Ext.QuickTips.init();
	formInit();
})

var body=Ext.getBody();
function formInit(){
	var form=new Ext.FormPanel({
		labelWidth:75,
		url:'',
		frame:true,
		title:'用户登录(DB)',
		iconCls:'Database',
		bodyStyle:'padding:5px 5px 0',
		width:350,
		defaults:{width:230},
		defaultType:'textfield',
		labelAlign:'right',
		buttonAlign:'center',
		items:[{
			fieldLabel:'用户名',
			id:'username',
			emptyText:'',
			allowBlank:false,
			blankText:'用户名为必填项',
			//加入icon，css定位 http://czpae86.iteye.com/blog/298406
			cls:'username'
		},{
			fieldLabel:'密码',
			id:'password',
			emptyText:'',
			inputType :'password',
			allowBlank:false,
			blankText:'密码为必填项',
			cls:'password'
		}],
		buttons:[{
			text:'登录',
			iconCls:'Accept',
			handler:function(){			

			}
		}]
	})
	form.render("div_main");
}
function login(){
	var username = Ext.fly("username").getValue();
	var password = Ext.fly("password").getValue();
	if(username==""){
		Ext.MessageBox.alert("提示","用户名不能为空");
		return;
	}
	if(password==""){
		Ext.MessageBox.alert("提示","密码不能为空");
		return;
	}
	Ext.Ajax.request({
		url : 'logic.jsp',
		method : 'post',
		params : {
			type : 'login',
			username : username,
			password : password
		},
		success : function(response) {
			var response = Ext.util.JSON.decode(response.responseText);
			if (response.iresult) {
				var msgTip = Ext.MessageBox.show({
					title : '提示',
					width : 250,
					msg : '正在登录,请稍后......'
					});
				window.location.href = ("/ExtJS/main2/index.jsp");

						// extjs怎么跳转页面 - Google Search
						// http://bbs.csdn.net/topics/350193108
						// window.location.href=("/ExtJS/main2/index.jsp?username="+username);
						// });
			} else {
						Ext.Msg.alert("提示", "用户名密码错误！");
			}
			},
			failure : function() {
				Ext.Msg.alert("提示", "系统繁忙，请稍后再试！");
		}
	})
}
document.onkeydown=function(e){ 
	var username = Ext.fly("username").getValue();
	var password = Ext.fly("password").getValue();
	var keyCode={};
	//兼容IE和firefox的监听事件
    //var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
	if(window.event){
		keyCode=window.event.keyCode;
	}else if(e.which){
		keyCode=e.which;
	}
	if(keyCode==13&&username!=""&&password!=""){
		login();
	}
}

/*
http://blog.sina.com.cn/s/blog_9dc8d5200101546a.html

*/


/**firefox和IE对按键监听事件,回车登录
http://blog.csdn.net/windxxf/article/details/6151832
http://blog.csdn.net/yingzi1202/article/details/8876120
http://blog.csdn.net/angus_17/article/details/6874990
http://www.w3school.com.cn/jsref/event_onkeydown.asp
http://www.w3school.com.cn/jsref/event_onkeydown.asp
http://www.nbhuxin.com/document%20onkeydown.html
**/