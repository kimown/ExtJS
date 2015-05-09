package com.practise;

import java.util.Arrays;

import org.json.JSONArray;
import org.json.JSONObject;

public class Practise {
	 public static String string2Json(String s) { 
		    StringBuilder sb = new StringBuilder(s.length()+20); 
		    sb.append('\"'); 
		    for (int i=0; i<s.length(); i++) { 
		        char c = s.charAt(i); 
		        switch (c) { 
		        case '\"': 
		            sb.append("\\\""); 
		            break; 
		        case '\\': 
		            sb.append("\\\\"); 
		            break; 
		        case '/': 
		            sb.append("\\/"); 
		            break; 
		        case '\b': 
		            sb.append("\\b"); 
		            break; 
		        case '\f': 
		            sb.append("\\f"); 
		            break; 
		        case '\n': 
		            sb.append("\\n"); 
		            break; 
		        case '\r': 
		            sb.append("\\r"); 
		            break; 
		        case '\t': 
		            sb.append("\\t"); 
		            break; 
		        default: 
		            sb.append(c); 
		        } 
		    } 
		    sb.append('\"'); 
		    return sb.toString(); 
		 }
	 
	public static void main(String[] args){
		String s="[{'DATAINDEX':'WID1','HEADER1':'WID1'},{'DATAINDEX':'WID2','HEADER2':'WID2'}]";
		//JSONObject obj=new JSONObject(s);
		JSONArray ar=new JSONArray(s);
		String[] sqls=new String[ar.length()];
		for(int i=0;i<ar.length();i++){
			JSONObject obj=ar.getJSONObject(i);
			String[] k=obj.getNames(obj);
			StringBuffer sq=new StringBuffer();
			sq.append("UPDATE MOD_BIZOBJPRPTY SET ");
			for(int j=0;j<k.length;j++){
				if(!k[j].equals("DATAINDEX")){
					sq.append(k[j]).append("='").append(obj.get(k[j])).append("',");
				}
			}
			StringBuffer _sq=new StringBuffer();
			_sq.append(sq.substring(0,sq.length()-1));
			_sq.append(" WHERE DATAINDEX='").append(obj.get("DATAINDEX")).append("'");
			sqls[i]=_sq.toString();
		}
		System.out.println(Arrays.toString(sqls));
	}
}
