
<%@page import="org.json.JSONObject"%>
<%@page import="org.json.JSONArray"%>
<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@page import="com.imooc.db.DBUtil"%><%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
	response.setHeader("Pragma", "no-cache");
	response.setHeader("Cache-Control", "no-cache");
	response.setHeader("Expires", "0");

	//分页
	String start = request.getParameter("start");
	String limit = request.getParameter("limit");
	int sInt=0,lInt=20;
	if(start!=null&&limit!=null){
		Integer sInteger = new Integer(start);
		Integer lInteger = new Integer(limit);
		 sInt = sInteger.intValue();
		 lInt = lInteger.intValue();
	}
	
	//排序
	String sort=request.getParameter("sort");
	String dir =request.getParameter("dir");
	String orderby="";
	if(sort!=null&&dir!=null){
		orderby=" ORDER BY "+sort+" "+dir;
	}	
	
	//过滤条件
	String filter=request.getParameter("filter");
	String filters=request.getParameter("filters")==null?"":request.getParameter("filters");

	
	//跨域请求使用到，JSON和JSONP的区别而已
	String callback = request.getParameter("callback");
	

	StringBuffer totalcountsql=new StringBuffer();
	totalcountsql.append("SELECT COUNT(1) AS TOTALCOUNT FROM V_CGZXT_CGSQB WHERE 1=1 "+(filter==null?"":filter)+filters);
	Connection conn=DBUtil.getConnection();
	System.out.println("执行totalcountsql："+totalcountsql.toString());
	PreparedStatement pstmt=conn.prepareStatement(totalcountsql.toString());
	ResultSet rs=pstmt.executeQuery();
	String totalCount="";
	if(rs.next()){
		totalCount=rs.getString(1);
	}
	rs.close();
	pstmt.close();
	StringBuffer datasql=new StringBuffer();
	datasql.append("   SELECT *");
	datasql.append("     FROM (SELECT ROWNUM AS NUMROW, TEMP.*");
	datasql.append("             FROM (SELECT * FROM V_CGZXT_CGSQB WHERE 11=11 "+(filter==null?"":filter)+filters+(orderby==""?"":orderby)+") TEMP)");
	datasql.append("    WHERE NUMROW > "+sInt);
	datasql.append("      AND NUMROW <= "+(sInt+lInt));
	System.out.println("执行查出datasql："+datasql.toString());
	PreparedStatement pstmt1=conn.prepareStatement(datasql.toString());
	ResultSet rs1=pstmt1.executeQuery();
	//将查询结果直接拼接JSON格式
	JSONArray ja = new JSONArray();
	String key,value;
	int len=0;
	while(rs1.next()){
		JSONObject jo=new JSONObject();
		len=rs1.getMetaData().getColumnCount();
		for(int i=1;i<=len;i++){
			key=rs1.getMetaData().getColumnName(i);
			value=rs1.getString(i);
			if(value==null){
				value="";
			}
			try{
				jo.put(key.toUpperCase(),value);
			}catch(org.json.JSONException e){
				e.printStackTrace();
			}
		}
		ja.put(jo);
	}
	rs1.close();
	pstmt1.close();
	String json="{\"totalCount\":"+totalCount+",\"records\":"+ja.toString()+"}";
	response.getWriter().println(json);
%>