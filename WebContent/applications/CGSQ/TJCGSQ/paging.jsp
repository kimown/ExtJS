
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="com.imooc.db.DBUtil"%><%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	response.setHeader("Pragma", "no-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Expires", "0");

	String start = request.getParameter("start");
	String limit = request.getParameter("limit");
	String query = request.getParameter("query");
	String callback = request.getParameter("callback");
	int sInt=0,lInt=20;
	if(start!=null&&limit!=null){
		Integer sInteger = new Integer(start);
		Integer lInteger = new Integer(limit);
		 sInt = sInteger.intValue();
		 lInt = lInteger.intValue();
	}
	StringBuffer totalcountsql=new StringBuffer();
	totalcountsql.append("SELECT COUNT(1) AS TOTALCOUNT FROM T_JZG_JBXX WHERE ZGH LIKE '%");
	totalcountsql.append(query+"%' OR XM LIKE '%"+query+"%'");
	Connection conn=DBUtil.getConnection();
	System.out.println("执行totalcountsql"+totalcountsql.toString());
	PreparedStatement pstmt=conn.prepareStatement(totalcountsql.toString());
	ResultSet rs=pstmt.executeQuery();
	String totalCount="";
	if(rs.next()){
		totalCount=rs.getString(1);
	}
	
	StringBuffer datasql=new StringBuffer();
	datasql.append("SELECT * FROM (SELECT ROWNUM AS NUMROW, TEMP.* FROM (SELECT SJ, XM, XQDM, ZGH FROM T_JZG_JBXX WHERE 1 = 1 AND XM LIKE '%");
	datasql.append(query+"%' OR ZGH LIKE '%").append(query).append("%') TEMP)");
	datasql.append(" WHERE NUMROW>").append(sInt).append(" AND NUMROW<=").append((sInt+lInt));
	System.out.println("执行datasql："+datasql.toString());
	PreparedStatement pstmt1=conn.prepareStatement(datasql.toString());
	ResultSet rs1=pstmt1.executeQuery();
	String recordsjson="[";
	while(rs1.next()){
		recordsjson+="{\"ZGH\":\""+rs1.getString("ZGH")+"\",\"XM\":\""+rs1.getString("XM")+"\",\"SJ\":\""+((rs1.getString("SJ")==null)?"":rs1.getString("SJ"))+"\"},";
	}
	String records=recordsjson.substring(0,recordsjson.length()-1)+"]";
	String json="{\"totalCount\":"+totalCount+",\"records\":"+records+"}";
	response.getWriter().println(json);
	
%>