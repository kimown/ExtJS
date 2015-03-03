package com.imooc.utils;

import java.util.UUID;

public class Uuid {
	
	
	/*
	 *http://blog.csdn.net/qq_20545159/article/details/43850607
	 */
	static String uuid="";
	static{
		uuid=UUID.randomUUID().toString();
	}
	public static String getUuid(){
		return uuid;
	}

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		System.out.println(uuid);
	}

}
