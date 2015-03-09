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

	/**
	*
	*	超出打开游标的最大数 - Google Search  
	*
	*
	**/
	request.setCharacterEncoding("UTF-8");
	String type="";
	Date d=new Date();
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	if(request.getParameter("type")!=null){
		type=(String)request.getParameter("type");
		System.out.println(sdf.format(d)+"  ：参数传递至logic.jsp,识别type="+type);
	}
	if(type.equals("login")){
		String username=request.getParameter("username");
		String password=request.getParameter("password");
		Md5 md5=new Md5();
		JSONObject obj=new JSONObject();
		if(md5.checkPassword(username,password)){
			//问题：这里无法打印字符串？？？
			//System.out.println("问题：这里无法打印字符串？？？");
			obj.put("iresult",true);
		}else{
			obj.put("iresult",false);
		}
		response.getWriter().print(obj);
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
		json=json.substring(0,json.length()-1)+"]}";
		response.getWriter().print(json);
	}
	
	if(type.equals("SGBM")){
		Connection conn=DBUtil.getConnection();
		String sql="SELECT DWDM,DWBZMC FROM T_ZXBZ_DW";
		PreparedStatement pstmt=conn.prepareStatement(sql);
		ResultSet rs=pstmt.executeQuery();
		String json="";
		json+="{\"SGBM\":[";
		while(rs.next()){
			json+="{\"DWDM\":\""+rs.getString("DWDM")+"\",\"DWBZMC\":\""+rs.getString("DWBZMC")+"\"},";
		}
		if(rs!=null){
			try{
				rs.close();
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
		json=json.substring(0,json.length()-1)+"]}";
		response.getWriter().print(json);
	}
	
	if(type.equals("SYXQ")){
		Connection conn=DBUtil.getConnection();
		String sql="SELECT XQBM,XQMC FROM T_CGZXT_XQZDSJWH";
		PreparedStatement pstmt=conn.prepareStatement(sql);
		ResultSet rs=pstmt.executeQuery();
		String json="";
		json+="{\"SYXQ\":[";
		while(rs.next()){
			json+="{\"XQBM\":\""+rs.getString("XQBM")+"\",\"XQMC\":\""+rs.getString("XQMC")+"\"},";
		}
		if(rs!=null){
			try{
				rs.close();
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
		json=json.substring(0,json.length()-1)+"]}";
		response.getWriter().print(json);
	}
	
	if(type.equals("userinfo")){
		String username=request.getParameter("username");
		StringBuffer sb=new StringBuffer();
		sb.append("SELECT XM,");
		sb.append("       XQDM,");
		sb.append("       XQMC,");
		sb.append("       SJ,");
		sb.append("       SJ,");
		sb.append("       DWDM,");
		sb.append("       (SELECT DWBZMC FROM T_ZXBZ_DW WHERE DWDM = A.DWDM) AS DWMC");
		sb.append("  FROM T_JZG_JBXX A");
		sb.append("  LEFT JOIN T_CGZXT_XQZDSJWH B");
		sb.append("    ON A.XQDM = B.XQBM");
		sb.append(" WHERE A.ZGH = '"+username+"'");
		System.out.println(sdf.format(d)+":sql="+sb.toString());
		Connection conn=DBUtil.getConnection();
		PreparedStatement pstmt=conn.prepareStatement(sb.toString());
		ResultSet rs=pstmt.executeQuery();
		String json="";
		if(rs.next()){
			json="{\"iresult\":true,records:[{\"XM\":\""+rs.getString("XM")+"\",\"DWDM\":\""+rs.getString("DWDM")+"\",\"DWMC\":\""+rs.getString("DWMC")+"\",\"XQDM\":\""+rs.getString("XQDM")+"\",\"XQMC\":\""+rs.getString("XQMC")+"\",\"SJ\":\""+rs.getString("SJ")+"\"}]}";
		}
		response.getWriter().print(json);		
		
	}
	
	if(type.equals("save")){
		Map<String,String> map=new HashMap<String,String>();
		StringBuffer sb=new StringBuffer();
		sb.append("INSERT INTO T_CGZXT_CGSQB( WID,");
		StringBuffer cm=new StringBuffer();
		StringBuffer vl=new StringBuffer();
		Enumeration<String> names=request.getParameterNames();
			while(names.hasMoreElements()){
				String name=names.nextElement();
				if(!name.equals("type")){
					cm.append(name+",");
				}
				String value=request.getParameter(name);
				if(!value.equals("save")){
					vl.append("'"+value+"',");
				}
			}
		sb.append(cm.toString().substring(0,cm.length()-1)).append(") VALUES(").append("SYS_GUID(),"+vl.toString().substring(0,vl.toString().length()-1)).append(")");
		JSONObject obj=new JSONObject();
		//http://www.cnblogs.com/buzz/archive/2009/04/30/1447103.html
		try{
			Connection conn=DBUtil.getConnection();
			PreparedStatement pstmt=conn.prepareStatement(sb.toString());
			int rows=pstmt.executeUpdate();
			if(rows>0){
				obj.put("success", true);
				obj.put("errors","{}");
				System.out.println("update:"+sb.toString());
			}else{
				obj.put("success", false);
				obj.put("errors","{info:'错误了'}");
			}
		}catch(Exception e){
			e.printStackTrace();
			obj.put("success", false);
			obj.put("errors","{info:'错误了'}");
		}finally{
			response.getWriter().print(obj);
		}
	}
%>