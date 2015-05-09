<%@page import="org.json.JSONObject"%>
<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@page import="java.sql.SQLException,
				java.text.SimpleDateFormat,
				java.util.Date,
				java.util.Enumeration,
				java.util.List,
				java.util.ArrayList,
				java.util.Arrays,
				org.json.JSONArray" %>
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
		String filter=" AND "+(request.getParameter("filter")==null?" 2=2 ":request.getParameter("filter"));
		
		StringBuffer sb=new StringBuffer();
		sb.append("SELECT *");
		sb.append("  FROM (SELECT ROWNUM AS N, E.*");
		sb.append("          FROM (SELECT ENAME,CNAME FROM MOD_BIZOBJ ").append(" WHERE 1=1 ").append(filter).append(orderby).append(") E)");
		sb.append(" WHERE N >").append(sInt).append(" AND N<=").append((sInt+lInt));
		IModel m=new ModelImpl();
		response.getWriter().print(m.paging(sb.toString()));
	}

	
	if(type.equals("getTablePrpts")){
		//过滤条件
		String filter=" AND "+(request.getParameter("filter")==null?" 2=2 ":request.getParameter("filter"));
		StringBuffer sb=new StringBuffer();
		sb.append("SELECT ID,HEADER,DATAINDEX,WIDTH,HIDDEN FROM MOD_BIZOBJPRPTY WHERE 1=1 ").append(filter);
		IModel m=new ModelImpl();
		response.getWriter().print(m.paging(sb.toString()));
	}
	
	if(type.equals("saveTable")){
		StringBuffer sb=new StringBuffer();
		sb.append("INSERT INTO MOD_BIZOBJ( ");
		StringBuffer cm=new StringBuffer();
		StringBuffer vl=new StringBuffer();
		Enumeration<String> names=request.getParameterNames();
		while(names.hasMoreElements()){
				String name=names.nextElement();
				if(!name.equals("type")){
					cm.append(name+",");
					String value=request.getParameter(name);
					vl.append("'"+value+"',");	
				}
		}
		sb.append(cm.toString().substring(0,cm.length()-1)).append(") VALUES(").append(vl.toString().substring(0,vl.toString().length()-1)).append(")");
		IModel m=new ModelImpl();
		response.getWriter().print(m.update(sb.toString()));
	}
	if(type.equals("saveEditGrid")){
		List<String> list=new ArrayList();
		Enumeration<String> names=request.getParameterNames();
		while(names.hasMoreElements()){
			StringBuffer sb=new StringBuffer();
			String name=names.nextElement();
			if(!name.equals("type")){
				sb.append("UPDATE MOD_BIZOBJ SET CNAME='").append(request.getParameter(name)).append("' WHERE ENAME='").append(name).append("'");
				list.add(sb.toString());
			}
		}
		int size=list.size();
		String[] ar=(String[])list.toArray(new String[size]);
		IModel m=new ModelImpl();
		response.getWriter().print(m.update(ar));
	}
	
	if(type.equals("saveEditGrid2")){
		String records=request.getParameter("records").replace("\"", "'");
		JSONArray ar=new JSONArray(records);
		String[] sqls=new String[ar.length()];
		for(int i=0;i<ar.length();i++){
			JSONObject obj=ar.getJSONObject(i);
			String[] k=obj.getNames(obj);
			StringBuffer sq=new StringBuffer();
			sq.append("UPDATE MOD_BIZOBJPRPTY SET ");
			for(int j=0;j<k.length;j++){
				if(!k[j].equals("DATAINDEX")){
					sq.append(k[j]).append("='").append(obj.get(k[j])).append("',");
				}
			}
			StringBuffer _sq=new StringBuffer();
			_sq.append(sq.substring(0,sq.length()-1));
			_sq.append(" WHERE DATAINDEX='").append(obj.get("DATAINDEX")).append("'");
			sqls[i]=_sq.toString();
		}	
		IModel m=new ModelImpl();
		response.getWriter().print(m.update(sqls));
	}
%>