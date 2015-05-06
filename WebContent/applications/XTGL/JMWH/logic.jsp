<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.sql.SQLException,
				java.text.SimpleDateFormat,
				java.util.Date"%>
<%@page import="BizModel.services.IModel,
				BizModel.services.impl.ModelImpl" %>
<%

	request.setCharacterEncoding("UTF-8");
	String type="";
	Date d=new Date();
	SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	if(request.getParameter("type")!=null){
		type=(String)request.getParameter("type");
		System.out.println(sdf.format(d)+"  ：参数传递至logic.jsp,识别type="+type);
	}
	if(type.equals("getTables")){
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
		
		StringBuffer sb=new StringBuffer();
		sb.append("SELECT *");
		sb.append("  FROM (SELECT ROWNUM AS N, E.*");
		sb.append("          FROM (SELECT ENAME,CNAME FROM MOD_BIZOBJ ").append(" WHERE").append(filter).append(orderby).append(") E)");
		sb.append(" WHERE N >").append(sInt).append(" AND N<=").append((sInt+lInt));
		IModel m=new ModelImpl();
		response.getWriter().print(m.paging(sb.toString()));
	}

%>