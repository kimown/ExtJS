<%@page import="com.imooc.db.Md5" %>
<%@page import="org.json.JSONObject"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.imooc.db.DBUtil" %>
<%@page import="java.util.Date" %>
<%@page import="java.text.SimpleDateFormat" %>
<%
	String type="";
	if(request.getParameter("type")!=null){
		type=(String)request.getParameter("type");
		Date d=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(sdf.format(d)+"  参数传递至logic.jsp,识别type="+type);
	}
	JSONObject obj=new JSONObject();
	if(type.equals("login")){
		String username=request.getParameter("username");
		String password=request.getParameter("password");
		Md5 md5=new Md5();
		if(md5.checkPassword(username,password)){
			//问题：这里无法打印字符串？？？
			//System.out.println("问题：这里无法打印字符串？？？");
			session.setAttribute("username",username);
			obj.put("iresult",true);
		}else{
			obj.put("iresult",false);
		}
	}
	response.getWriter().print(obj);
%>