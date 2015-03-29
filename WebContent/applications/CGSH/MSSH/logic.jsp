
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.PreparedStatement"%><%@page import="com.imooc.db.Md5" %>
<%@page import="org.json.JSONObject"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="com.imooc.db.DBUtil" %>
<%@page import="java.util.Date" %>
<%@page import="java.text.SimpleDateFormat" %>
<%
    request.setCharacterEncoding("utf-8");
	String type="";
	if(request.getParameter("type")!=null){
		type=(String)request.getParameter("type");
		Date d=new Date();
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		System.out.println(sdf.format(d)+"  参数传递至logic.jsp,识别type="+type);
	}

	
	if(type.equals("delete")){
		JSONObject obj=new JSONObject();
		String wid=request.getParameter("wid");
		Connection conn=DBUtil.getConnection();
		String sql="DELETE  FROM T_CGZXT_CGSQB WHERE WID='"+wid+"'";
		PreparedStatement pstmt=conn.prepareStatement(sql);
		int  records=pstmt.executeUpdate();
		if(records>=1){
			//问题：这里无法打印字符串？？？
			//System.out.println("问题：这里无法打印字符串？？？");
			obj.put("iresult",true);
		}else{
			obj.put("iresult",false);
		}
		response.getWriter().print(obj);
	}
	
	if(type.equals("submit")){
		JSONObject obj=new JSONObject();
		String[] ar={"jbr","jbrbh","jbrdh"};
		String jbr=request.getParameter("jbr");
		String jbrbh=request.getParameter("jbrbh");
		String jbrdh=request.getParameter("jbrdh");
		String wid=request.getParameter("wid");
		String sql="UPDATE T_CGZXT_CGSQB SET JBR='"+jbr+"',JBRBH='"+jbrbh+"',jbrdh='"+jbrdh+"',SHZT='20' WHERE WID='"+wid+"'";
		System.out.println("执行sql="+sql);
		Connection conn=DBUtil.getConnection();
		PreparedStatement pstmt=conn.prepareStatement(sql);
		int  records=pstmt.executeUpdate();
		if(records>=1){
			obj.put("iresult",true);
		}else{
			obj.put("iresult",false);
		}
		response.getWriter().print(obj);
	}
%>