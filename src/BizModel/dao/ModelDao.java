package BizModel.dao;
import org.apache.commons.dbutils.DbUtil;
import org.json.JSONObject;
public class ModelDao {
	private DbUtil db=new DbUtil();
	public String helloWorld(){
		String s="こんにちは世界";
		return s;
	}

	public String getTables() {
		return DbUtil.getSQLAllJSON("SELECT ENAME,CNAME FROM MOD_BIZOBJ");
		// TODO Auto-generated method stub
	}

	public String paging(String sql) {
		// TODO Auto-generated method stub
		StringBuffer sb=new StringBuffer();
		sb.append("SELECT SUM(1) ").append(sql.substring(sql.indexOf("FROM"),sql.lastIndexOf("WHERE")));
		System.out.println("-----分页开始------");
		System.out.println("统计总数："+sb.toString());
		System.out.println("分       页："+sql.toString());
		System.out.println("-----分页结束------");
		String totalCount=DbUtil.sqlGetOne(sb.toString());
		//String totalCount=db.sqlGetOne("SELECT SUM(1) ");
		StringBuffer _sb=new StringBuffer();
		_sb.append("{\"totalCount\":").append(totalCount).append(",\"records\":");
		_sb.append(DbUtil.getList(sql)).append("}");
		return _sb.toString();
	}

	public JSONObject update(String sql){
		JSONObject obj=new JSONObject();
		int rows= DbUtil.update(sql);
		if(rows>0){
			obj.put("success", true);
			obj.put("msg", "保存成功");
		}else{
			obj.put("success", false);
			obj.put("msg", "保存失败");	
		}
		return obj;
		
	}
}
