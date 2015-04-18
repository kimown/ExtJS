
<%@page import="java.sql.SQLException"%>
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

	
	if(type.equals("submit")){
		JSONObject obj=new JSONObject();
		String wid=request.getParameter("wid");
		String shyj=request.getParameter("SHYJ");
		String jbrdh=request.getParameter("SJH");
		String jbrbh=request.getParameter("I_CGYXX");
		String jbr=request.getParameter("JBR");
		String passOrReject=request.getParameter("passOrReject");
		String shzt="30";
		if(passOrReject.equals("pass")){
			shzt="40";
		}else if(passOrReject.equals("reject")){
			shzt="10";
		}
		String sql="UPDATE T_CGZXT_CGSQB SET JBR='"+jbr+"',JBRBH='"+jbrbh+"',JBRDH='"+jbrdh+"',SHZT='"+shzt+"' WHERE WID='"+wid+"'";
		String username=(String)session.getAttribute("username");
		StringBuffer sb=new StringBuffer();
		sb.append("INSERT INTO T_GGGL_SPJLB(WID, SHR, SHSJ, SHYJ, ZB_WID, SPJG) VALUES (");
		sb.append("SYS_GUID(),'").append(username).append("',to_char(sysdate,'yyyy-mm-dd hh24:mi:ss'),'");
		sb.append(shyj).append("','").append(wid).append("',decode('").append(passOrReject).append("','pass','通过','reject','不通过'))");
		Connection conn=DBUtil.getConnection();
		PreparedStatement pstmt=conn.prepareStatement(sql);
		PreparedStatement pstmt2=conn.prepareStatement(sb.toString());
		int  records=pstmt.executeUpdate();
		int  records2=pstmt2.executeUpdate();
		if(records>=1){
			obj.put("iresult",true);
		}else{
			obj.put("iresult",false);
		}
		response.getWriter().print(obj);
	}
	
	
	
	if(type.equals("JBR")){
		Connection conn=DBUtil.getConnection();
		String wid=request.getParameter("wid");
		String sql="SELECT JBR,JBRBH,JBRDH FROM T_CGZXT_CGSQB WHERE WID='"+wid+"'";
		String totalcountsql="SELECT COUNT(1) FROM T_CGZXT_CGSQB WHERE WID='"+wid+"'";
		PreparedStatement pstmt=conn.prepareStatement(sql);
		PreparedStatement pstmt1=conn.prepareStatement(totalcountsql);
		ResultSet rs=pstmt.executeQuery();
		ResultSet rs1=pstmt1.executeQuery();
		String totalcount="";
		if(rs1.next()){
			totalcount=rs1.getString(1);
		}
		String json="{\"totalcount\":"+totalcount+",";
		json+="\"_JBR\":[";
		while(rs.next()){
			json+="{\"JBR\":\""+rs.getString("JBR")+"\",\"JBRBH\":\""+rs.getString("JBRBH")+"\",\"JBRDH\":\""+rs.getString("JBRDH")+"\"},";
		}
		json=json.substring(0,json.length()-1)+"]}";
		response.getWriter().print(json);
	}
	
	
	if(type.equals("CGYXX")){
		Connection conn=DBUtil.getConnection();
		String sql="select t.ZGH,t.XM,a.SJ from T_GGGL_CGYXX t LEFT JOIN t_jzg_jbxx a ON t.zgh=a.zgh";
		String totalcountsql="SELECT COUNT(1) FROM T_GGGL_CGYXX";
		PreparedStatement pstmt=conn.prepareStatement(sql);
		PreparedStatement pstmt1=conn.prepareStatement(totalcountsql);
		ResultSet rs=pstmt.executeQuery();
		ResultSet rs1=pstmt1.executeQuery();
		String totalcount="";
		if(rs1.next()){
			totalcount=rs1.getString(1);
		}
		String json="{\"totalcount\":"+totalcount+",";
		json+="\"CGYXX\":[";
		while(rs.next()){
			json+="{\"ZGH\":\""+rs.getString("ZGH")+"\",\"XM\":\""+rs.getString("XM")+"\",\"SJ\":\""+rs.getString("SJ")+"\"},";
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
%>