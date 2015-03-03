<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%
	String username=(String)session.getAttribute("username");

%>
<!--  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
这一句话如果不注释,document.body.clientHeight获取高度恒为0
-->

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<script type="text/javascript" src="/ExtJS/ext-2.0.2/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="/ExtJS/ext-2.0.2/ext-all-debug.js"></script>
<link rel="stylesheet" type="text/css" href="/ExtJS/ext-2.0.2/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="/ExtJS/ext-2.0.2/resources/icons_css/icon.css" />
<script type="text/javascript" src="index.js"></script>
<title>登录</title>
</head>
<body scroll=no>
</body>
<script type="text/javascript">
var width=document.body.clientWidth;
var height=document.body.clientHeight;
var d=new Date();
var ar=["天","一","二","三","四","五","六"];
var time="今天是"+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" 星期"+ar[d.getDay()];
var username="<%=username%>";
if(username=="null"){
	window.location.href="http://localhost:8080/ExtJS/";
}
/**
 * div标签简介：http://www.w3school.com.cn/tags/tag_div.asp
 * div水平居中：http://jingyan.baidu.com/article/a65957f490f8a624e67f9b0d.html
 */
</script>
</html>