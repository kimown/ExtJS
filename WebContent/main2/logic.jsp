
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.PreparedStatement"%><%@page import="com.imooc.db.Md5" %>
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
			obj.put("iresult",true);
		}else{
			obj.put("iresult",false);
		}
		response.getWriter().print(obj);
	}
	
	if(type.equals("exit")){
		/**
		http://www.cnblogs.com/shencheng/archive/2011/01/07/1930227.html
		http://blog.csdn.net/fly2749/article/details/5987870
		http://www.mossle.com/docs/jsp/html/jsp-ch-04.html
		http://yiminghe.iteye.com/blog/294781
		http://bbs.csdn.net/topics/220063138
		**/
		//销毁单个属性
		session.removeAttribute("username");
		//销毁全部session
		session.invalidate();
		obj.put("iresult",true);
		response.getWriter().print(obj);
	}
	
	if(type.equals("userinfo")){
		String username=request.getParameter("username");
		Connection conn=DBUtil.getConnection();
		String sql="SELECT XM FROM T_JZG_JBXX t WHERE ZGH='"+username+"'";
		PreparedStatement pstmt=conn.prepareStatement(sql);
		ResultSet rs=pstmt.executeQuery();
		if(rs.next()){
			//问题：这里无法打印字符串？？？
			//System.out.println("问题：这里无法打印字符串？？？");
			obj.put("iresult",true);
			obj.put("XM",rs.getString("XM"));
		}else{
			obj.put("iresult",false);
		}
		response.getWriter().print(obj);
	}
%>