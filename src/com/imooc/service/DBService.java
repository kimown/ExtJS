package com.imooc.service;

import java.util.List;

public interface DBService {
	//保存大字段
	public boolean saveClob(String clob);
	//根据用户ID获取用户姓名及用户组
	public String getUserInfo(String userid);
}
