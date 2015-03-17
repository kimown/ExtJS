package com.imooc.service.implement;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import com.imooc.service.DBService;
import com.imooc.db.DBUtil;

public class DBServiceImplement implements DBService{
	public  boolean saveClob(String clob) {
		boolean result=true;
		try {
			setClob(clob);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			result=false;
			e.printStackTrace();
		}
		return result;
	}

	public  void setClob(String clob) throws SQLException {
		// TODO Auto-generated method stub
		boolean result=false;
		String sql="PDATE T_DEMO SET CLOB='' WHERE WID=1";
		DBUtil _db=new DBUtil();
		Connection _con=_db.getConnection();
		PreparedStatement _pstmt=_con.prepareStatement(sql);
		try{
			int row=_pstmt.executeUpdate();
			if(row>0){
				System.out.println("清空成功");
			}
		}catch(Exception e){
			result=false;
			e.printStackTrace();
		}
		clob=clob.replaceAll("'", "''");
		while(clob.length()>1000){
			String _clob=clob.substring(0,1000);
			clob=clob.substring(1000);
			sql="UPDATE T_DEMO SET CLOB=CLOB||'"+_clob+"' WHERE WID='1'";
			System.out.println(sql);
			DBUtil db=new DBUtil();
			Connection conn=db.getConnection();
			PreparedStatement pstmt=conn.prepareStatement(sql);
			try{
				int rows=pstmt.executeUpdate();
				if(rows>0){
					result=true;
				}
			}catch(Exception e){
				result=false;
				e.printStackTrace();
			}
		}
		if(clob.length()>0){
			sql="UPDATE T_DEMO SET CLOB='"+clob+"' WHERE WID='1'";
			System.out.println(sql);
			DBUtil db=new DBUtil();
			Connection conn=db.getConnection();
			PreparedStatement pstmt=conn.prepareStatement(sql);
			try{
				int rows=pstmt.executeUpdate();
				if(rows>0){
					result=true;
				}
			}catch(Exception e){
				result=false;
				e.printStackTrace();
			}			
		}
		System.out.println("保存CLOB字段结果："+result);
	}

}
