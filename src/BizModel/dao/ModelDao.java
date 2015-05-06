package BizModel.dao;
import org.apache.commons.dbutils.DbUtil;
public class ModelDao {
	public String helloWorld(){
		String s="こんにちは世界";
		return s;
	}

	public String getTables() {
		return DbUtil.getSQLAllJSON("SELECT ENAME,CNAME FROM MOD_BIZOBJ");
		// TODO Auto-generated method stub
	}

}
