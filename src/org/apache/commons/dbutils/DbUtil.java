package org.apache.commons.dbutils;

import java.math.BigInteger;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.dbutils.handlers.ArrayHandler;
import org.apache.commons.dbutils.handlers.ArrayListHandler;
import org.apache.commons.dbutils.handlers.ScalarHandler;
import org.json.JSONArray;
import org.json.JSONObject;

public class DbUtil {
	private final static QueryRunner run=new QueryRunner();
	public static Connection getConn(){
		String driver="oracle.jdbc.driver.OracleDriver";
		String url="jdbc:oracle:thin:@127.0.0.1:1521:ORCL";
		String user="google";
		String pwd="google";
		Connection conn=null;
		try{
			DbUtils.loadDriver(driver);
			conn=DriverManager.getConnection(url,user,pwd);
		}catch(SQLException e){
			e.printStackTrace();
		}
		return conn;
	}
	/**
	 * 执行统计判断语句，语句的执行结果必须只返回一个布尔值
	 * @param sql
	 * @return
	 */
	public static boolean checkNumber(String sql){
		Connection conn=getConn();
		Number n=null;
		try {
			n = run.query(conn,sql, new ScalarHandler());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			DbUtils.closeQuietly(conn);
		}
		return (n!=null)?true:false;
	}
	/**
	 * 查询（返回单个结果）
	 * @param sql
	 * @return
	 */
	public static String sqlGetOne(String sql){
		Connection conn=getConn();
		Object[] rs=null;
		try {
			rs = run.query(conn,sql, new ArrayHandler());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			DbUtils.closeQuietly(conn);
		}
		return 	rs[0]==null?null:rs[0].toString();
	}
	/**
	 * 查询（返回Array结果）
	 * @param sql
	 * @return
	 */
	public static String queryArray(String sql){
		Connection conn=getConn();
		Object[] rs=null;
		try {
			rs = run.query(conn,sql, new ArrayHandler());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			DbUtils.closeQuietly(conn);
		}
		return 	Arrays.toString(rs);
	}
	
	/**
	 * 查询（返回ArrayList结果）
	 * @param sql
	 * @return
	 */
	public static String queryArrayList(String sql){
		Connection conn=getConn();
		List<Object[]> rs=null;
		try {
			rs = run.query(conn,sql, new ArrayListHandler());
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			DbUtils.closeQuietly(conn);
		}
		String s="[";
		for(Object[] i :rs){
			s+=Arrays.toString(i)+",";
		}
		s+=s.substring(0,s.length()-1)+"]";
		return 	s;
	}
	/**
	 * 更新（包括UPDATE、INSERT、DELETE，返回受影响的行数）
	 * @param sql
	 * @return
	 */
	public static int update(String sql){
		Connection conn=getConn();
		int n=-1;
		try {
			n=run.update(conn,sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}finally{
			DbUtils.closeQuietly(conn);
		}
		return n;
	}
	
	public static JSONArray getList(String sql){
		final JSONArray jsonAr=new JSONArray();
		Connection conn=getConn();
		try {
			run.query(conn,sql, new ResultSetHandler<Object>(){
				@Override
				public Object handle(ResultSet rs) throws SQLException {
					// TODO Auto-generated method stub
					ResultSetMetaData metaData=rs.getMetaData();
					int cols=metaData.getColumnCount();
					while(rs.next()){
						JSONObject jsonObj=new JSONObject();
						for(int i=1;i<=cols;i++){
							String colName=metaData.getColumnLabel(i);
							String value=rs.getString(colName);
							if(value==null){
								value="";
							}
							jsonObj.put(colName.toUpperCase(), value);
						}
						jsonAr.put(jsonObj);
					}
					return jsonAr;
				}
			});
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return jsonAr;
	}
	
	public static String getSQLAllJSON(String sql){
		StringBuffer sb=new StringBuffer();
		String totalCount=sqlGetOne("SELECT SUM(1) "+sql.substring(sql.toUpperCase().indexOf("FROM"),sql.lastIndexOf("WHERE")));
		sb.append("{\"totalCount\":").append(totalCount).append(",\"records\":");
		sb.append(getList(sql)).append("}");
		return sb.toString();
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		/*
		 * 
		DbUtil du=new DbUtil();
		String sql="select * from T_CGZXT_CGSQB t ";
		System.out.println(du.getSQLAllJSON(sql));
		
		*/
	}

}


//参考：http://www.codesuggestions.com/java/apache-commons-dbutils-tutorial/
/*
在此感谢，期间学到了很多关于Apache DbUtils的用法。
《Ext江湖》 http://book.51cto.com/art/201202/320035.htm
OSC  http://my.oschina.net/huangyong/blog/158362
	 http://www.oschina.net/code/snippet_12_6


*/