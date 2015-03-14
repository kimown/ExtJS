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

</style>
</head>
<body scroll="no" leftmargin="0" topmargin="0" marginwidth="0" marginheight="0">
<div id="tabs" style="position:absolute;"></div>
<div id="div_main"></div>
</body>
<script type="text/javascript">
var width=document.body.clientWidth;
var height=document.body.clientHeight;
var userid="<%=username%>";
</script>
</html>