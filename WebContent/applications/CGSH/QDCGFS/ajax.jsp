<%@page import="org.json.JSONArray"%>
<%@page import="java.sql.ResultSetMetaData"%>
<%@page import="java.util.Enumeration"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.HashMap"%>
<%@page import="java.sql.SQLException"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="com.imooc.db.Md5" %>
<%@page import="org.json.JSONObject"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.imooc.db.DBUtil" %>
<%@page import="java.util.Date" %>
<%@page import="java.text.SimpleDateFormat" %>
<%
	request.setCharacterEncoding("UTF-8");
	String type="";
	Date d=new Date();
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	if(request.getParameter("type")!=null){
		type=(String)request.getParameter("type");
		System.out.println(sdf.format(d)+"  ：参数传递至logic.jsp,识别type="+type);
	}
	if(type.equals("CGFS")){
		String callback=request.getParameter("callback");
		Connection conn=DBUtil.getConnection();
		String sql="SELECT BM,MC FROM T_CGZXT_CGFSWH";
		String totalcountsql="SELECT COUNT(1) FROM T_CGZXT_CGFSWH";
		PreparedStatement pstmt=conn.prepareStatement(sql);
		PreparedStatement pstmt1=conn.prepareStatement(totalcountsql);
		ResultSet rs=pstmt.executeQuery();
		ResultSet rs1=pstmt1.executeQuery();
		String totalcount="";
		if(rs1.next()){
			totalcount=rs1.getString(1);
		}
		String json="{\"totalcount\":"+totalcount+",";
		json+="\"CGFS\":[";
		while(rs.next()){
			json+="{\"BM\":\""+rs.getString("BM")+"\",\"MC\":\""+rs.getString("MC")+"\"},";
		}
		if(rs!=null){
			try{
				rs.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		if(rs1!=null){
			try{
				rs1.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		if(pstmt!=null){
			try{
				pstmt.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		if(pstmt1!=null){
			try{
				pstmt1.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		/*
		if(conn!=null){
			try{
			//	conn.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}*/
		System.out.println(json+"------");
		json=json.substring(0,json.length()-1)+"]}";
		response.getWriter().print(json);
	}
	
%>