package com.imooc.service.implement;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.imooc.service.DBService;
import com.imooc.db.DBUtil;

public class DBServiceImplement implements DBService{

	public String getSGBH() {
		DBUtil db=new DBUtil();
		Connection conn=db.getConnection();
		String sql="";
		try {
			PreparedStatement pstmt=conn.prepareStatement(sql);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// TODO Auto-generated method stub
		return null;
	}

}
