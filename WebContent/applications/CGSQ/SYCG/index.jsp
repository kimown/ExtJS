<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	String username=(String)session.getAttribute("username");

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
</style>
</head>
<body>
<div id="grid-example"></div>
</body>
<script type="text/javascript">
var width=document.body.clientWidth;
var height=document.body.clientHeight;
var userid="<%=username%>";
</script>
</html>