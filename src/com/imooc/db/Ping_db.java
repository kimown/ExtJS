package com.imooc.db;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class Ping_db {

	/**
	 * @throws SQLException 
	 * @param args
	 * @throws  
	 */
	public static void main(String[] args) throws SQLException   {
		// TODO Auto-generated method stub
		Connection conn=DBUtil.getConnection();
		String sql="select wid,username from t_demo_jdbc where wid=?";
		PreparedStatement pstmt=conn.prepareStatement(sql);
		pstmt.setString(1, "1");
		ResultSet rs=pstmt.executeQuery();
		while(rs.next()){
			System.out.println("success:wid="+rs.getString(1)+",username="+rs.getString("username"));
		}
	}

}
