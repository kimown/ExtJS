<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="com.imooc.service.implement.DBServiceImplement" %>

<%
	String userid=(String)session.getAttribute("username");
	DBServiceImplement db=new DBServiceImplement();
	String username="";
	String userGroup="";
	try{
	String userinfo=db.getUserInfo(userid);
	String[] ar=userinfo.split(",");
	username=ar[0];
	userGroup=ar[1];
	}catch(Exception e){
		e.printStackTrace();
	}
%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>提交采购申请</title>
<script type="text/javascript" src="/ExtJS/ext-2.0.2/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="/ExtJS/ext-2.0.2/ext-all-debug.js"></script>
<link rel="stylesheet" type="text/css" href="/ExtJS/ext-2.0.2/resources/css/ext-all.css" />
<link rel="stylesheet" type="text/css" href="/ExtJS/ext-2.0.2/resources/icons_css/icon.css" />
<script type="text/javascript" src="index.js"></script>
<style type="text/css">
.x-grid3-row td,.x-grid3-summary-row td{line-height:25px;vertical-align:top;padding-left:1px;padding-right:1px;-moz-user-select:none;}
.table_01{float:left;height:auto;width:780px;border:1px solid #dedede;border-bottom:none;}
.table_tr{float:left;height:18px;width:780px;border-bottom:1px solid #dedede;background-color:#f1f1f1;border-right:none}
.table_tr01{float:left;height:18px;width:780px;border-bottom:1px solid #dedede;background-color:#ffffff;border-right:none}
.table_tr_td{float:left;height:18px;line-height:18px;width:130px;border-right:1px solid #dedede;text-align:right;padding-right:5px;}
.table_center{text-align:center;}
.table-info {
	margin:5px 5px 5px 5px;
	font-size:12px;
	color:#03386C;
	background-color:#99BBE8;
}
.table-info th {
	font-weight:bold;
	text-align:center;
	background-color:#D0E0F4;
	padding:2px 2px 2px 2px;
}
.table-info td {
	background-color:white;
	height:24px;
	padding:2px 2px 2px 2px;
}
</style>
</head>
<body>
<div id="grid-example"></div>
<div id="hello-win"></div>
<div id="hello-tabs"></div>
</body>
<script type="text/javascript">
var width=document.body.clientWidth;
var height=document.body.clientHeight;
var userid="<%=userid%>";
var username="<%=username%>";
var userGroup="<%=userGroup%>";
</script>
</html>