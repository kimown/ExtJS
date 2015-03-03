<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="java.util.Date" %>
<%@page import="java.text.SimpleDateFormat" %>    
<%
	Date d=new Date();
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
	String date=sdf.format(d);
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
        .x-form-sideText {     
            padding-left: 2px;     
            display: inline-block;     
            display: inline;  
        } 
        .x-form-sideText1 {     
            padding-left: 2px;     
            display: inline-block;     
            display: inline;  
        } 
</style>
</head>
<body >
<div id="topic-grid" ></div>
</body>
<script type="text/javascript">
var width=document.body.clientWidth;
var height=document.body.clientHeight;
var date="<%=date%>";
var username="<%=username%>";
</script>
</html>