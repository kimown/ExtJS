package BizModel.services;

import org.json.JSONObject;

public interface IModel {
	public String helloWorld();
	public String getTables();
	public String paging(String sql);
	public JSONObject update(String sql);
	public JSONObject update(String[] sqls);
}
