package BizModel.services.impl;

import org.json.JSONObject;

import BizModel.dao.ModelDao;
import BizModel.services.IModel;

public class ModelImpl implements IModel{
	private ModelDao dao=new ModelDao();
	@Override
	public String helloWorld() {
		// TODO Auto-generated method stub
		return dao.helloWorld();
	}
	@Override
	public String getTables() {
		// TODO Auto-generated method stub
		return dao.getTables();
	}
	@Override
	public String paging(String sql) {
		// TODO Auto-generated method stub
		return dao.paging(sql);
	}
	@Override
	public JSONObject update(String sql) {
		// TODO Auto-generated method stub
		return dao.update(sql);
	}
}
