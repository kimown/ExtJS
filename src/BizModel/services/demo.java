package BizModel.services;

import BizModel.services.impl.ModelImpl;

public class demo {
	public static void main(String[] args){
		IModel model=new ModelImpl();
		System.out.println(model.helloWorld());
	}
}