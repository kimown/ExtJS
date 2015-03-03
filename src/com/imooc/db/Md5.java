package com.imooc.db;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import sun.misc.BASE64Encoder;

public class Md5 {
	/**
	 * 消息摘要简介：一个消息摘要就是一个数据块的数字指纹。即对一个任意长度的一个数据块进行计算，产生一个唯一指印（对于SHA1是产生一个
	 * 20字节的二进制数组）。消息摘要是一种与消息认证码结合使用以确保消息完整性的技术。主要使用单向散列函数算法，可用于检验消息的完整性，
	 * 和通过散列密码直接以文本形式保存等，目前，广泛使用的算法有MD4、MD5、SHA-1.
	 * 
	 * 消息摘要有两个基本属性：
	 * 两个不同的报文难以产生相同的摘要；难以对指定的摘要生成一个报文，而可以由该报文反推算出该指定的摘要。
	 * 代表：美国国家标准技术研究所的SHA-1和麻省理工学院Ronald Rivest提出的MD5.
	 * 
	 * 摘抄：http://xxglx.jxcfs.com/net/zyk/htmlfiles/algorithm/algorithm00012.htm			
	 */
	
	//对用户密码进行MD5加密
	public String EncoderByMd5(String password) throws NoSuchAlgorithmException, UnsupportedEncodingException{
		MessageDigest md5=MessageDigest.getInstance("MD5");
		BASE64Encoder base64encoder=new BASE64Encoder();
		String password2md5=base64encoder.encode(md5.digest(password.getBytes("utf-8")));
		return password2md5;
	}
	
	

	/**
	 * @throws UnsupportedEncodingException 
	 * @throws NoSuchAlgorithmException 
	 * @throws SQLException 
	 * 因为MD5是基于消息摘要原理的，消息摘要的基本特征就是很难根据摘要推算出消息报文，因此要验证密码是否正确，就必须对输入密码(消息
	 * 报文)重新计算其摘要，和数据库中存储的摘要进行对比（即数据库中存储的其实是用户密码的摘要），若两个摘要相同，则说明密码正确；不同，
	 * 则说明密码错误。
	 * @throws  
	 * 
	 */
	//验证密码是否正确
	public boolean checkPassword(String userid,String password) throws SQLException, NoSuchAlgorithmException, UnsupportedEncodingException  {
		System.out.println("MD5.java:用户名："+userid+",password:"+password);
		
		Connection conn=DBUtil.getConnection();
		String sql="SELECT PASSWORD FROM T_JBXX_JBXX WHERE USERID=?";
		PreparedStatement pstmt=conn.prepareStatement(sql);
		pstmt.setString(1, userid);
		ResultSet rs=pstmt.executeQuery();
		String password2md5="";
		if(rs.next()){
			password2md5=rs.getString(1);
		}
		if(EncoderByMd5(password).equals(password2md5)){
			System.out.println("用户名/密码正确");
			return true;
		}else{
			System.out.println("用户名/密码错误");
			return false;
		}
	}
	
	/**
	 * @param args
	 * @throws UnsupportedEncodingException 
	 * @throws NoSuchAlgorithmException 
	 * @throws SQLException 
	 */
	public static void main(String[] args) throws NoSuchAlgorithmException, UnsupportedEncodingException, SQLException {
		// TODO Auto-generated method stub
		//Md5 md5=new Md5();
		//String s="1";
		//System.out.println(md5.EncoderByMd5(s));
		//System.out.println(md5.checkPassword("199210935", "12"));
		
	}

}
