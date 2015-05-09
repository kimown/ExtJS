Ext.ns("cn.com");
Ext.BLANK_IMAGE_URL = "/ExtJS/ext-2.0.2/air/samples/tasks/ext-2.0/resources/images/default/s.gif";

JSCLASS=function(){
	
	return {
		init:function(){
			this.grid=this.gridInit();
			this.grid2=this.grid2Init();
			var viewport = new Ext.Viewport({
        		layout:'border'
        		,frame: false
        		,border: false
       		    ,items:[
            		this.grid,this.grid2
         			]
    			});
    		this.listenerInit();	
			},
			gridInit:function(){
				var store=new Ext.data.Store({
					proxy:new Ext.data.HttpProxy({
						url:'logic.jsp?type=getTables'
					}),
					reader:new Ext.data.JsonReader({
						totalProperty: 'totalCount',
						root: 'records'
					},[
						{name:'ENAME'},
						{name:'CNAME'}
					]),
					remoteSort:true
				})
				store.setDefaultSort("ENAME","DESC");
				store.load({params:{start:0,limit:10,filter:" 1=1 "}});
   		    	var grid = new Ext.grid.EditorGridPanel({
        			store: store,
        			region:'center',
        			id:'center',
        			loadMask: true,
        			clicksToEdit:1,
        			columns: [
            			{header: "ENAME", width: 150, sortable: true, dataIndex: 'ENAME'},
           		    	{header: "CNAME", width: 150, sortable: true, dataIndex: 'CNAME',editor:new Ext.form.TextField({allowBlank:false})}
        			],
        			stripeRows: true,
        			height:350,
        			width:600,
        			title:'',
        			bbar:new Ext.PagingToolbar({
        				pageSize:10,
        				store:store,
        				displayInfo:true,
        				displayMsg:'显示第   {0} 条到   {1} 条记录,共     {2}	条',
        				emptyMsg:'没有记录'
        			}),
        			tbar:this.tbarInit()
    			});
   		 		return grid;
			},
			grid2Init:function(){
				var store=new Ext.data.Store({
					proxy:new Ext.data.HttpProxy({
						url:'logic.jsp?type=getTablePrpts'
					}),
					reader:new Ext.data.JsonReader({
						totalProperty: 'totalCount',
						root: 'records'
					},[
						{name:'ID'},
						{name:'HEADER'},
					    {name:'WIDTH'},
						{name:'DATAINDEX'},
					    {name:'HIDDEN'}					    
					]),
					remoteSort:true
				})
				store.load({params:{filter:" 1=2 "}});

				var ar = new Ext.form.ComboBox({
						store : new Ext.data.SimpleStore({
									fields : ['name', 'value'],
									data : [['false', 'false'],
											['true', 'true']]
								}),
						name : 'hidden',
						hiddenName : 'SFJK',
						allowBlank : false,
						valueField : 'name',
						displayField : 'value',
						typeAhead : true,
						mode : 'local',
						forceSelection : true,
						triggerAction : 'all',
						emptyText : '请选择',
						fieldLabel : '',
						selectOnFocus : true
				});				
				var grid = new Ext.grid.EditorGridPanel({
        			store: store,
       			    region:'east',
        			columns: [
            			{header: "id", width: 75, sortable: true, dataIndex: 'ID',hidden:true},
            			{header: "header", width: 150, sortable: true, dataIndex: 'HEADER',editor:new Ext.form.TextField({allowBlank:false})},
            			{header: "width", width: 75, sortable: true, dataIndex: 'WIDTH',editor:new Ext.form.TextField({allowBlank:false})},
            			{header: "dataIndex", width: 100, sortable: true, dataIndex: 'DATAINDEX'},
            			{header: "hidden", width: 85, sortable: true, dataIndex: 'HIDDEN',editor:ar}
        			],
        			stripeRows: true,
        			height:350,
        			width:600,
        			clicksToEdit:1,
       			    title:'',
       			    tbar:this.tbarInit2()
    				});
    			return grid;
			},
			tbarInit:function(){
				var ar=[];
				var k=0;
				ar[k++]={
					text:'新增',
					iconCls:'Add',
					handler:function(){
						JSCLASS.add();
					}
				}
				ar[k++]='-';
				ar[k++]={
					text:'保存',
					iconCls:'Accept',
					handler:function(){
						JSCLASS.save();
					}
				}				
				ar[k++]='-';
				ar[k++]=" ENAME/CNAME:";
				ar[k++]={
					xtype:'textfield',
					id:'query_ecname',
					emptyText:'模糊搜索...'
				}
				ar[k++]='-';
				ar[k++]={
					text:'查询',
					iconCls:'Zoom',
					handler:function(){
						JSCLASS.query();
					}
				};
				ar[k++]='-';
				ar[k++]= {
					text : '重置',
					iconCls : 'Arrowundo',
					handler : function() {
						var ar=["query_ecname"];
						for(var i=0;i<ar.length;i++){
							if(Ext.getCmp(ar[i])){
								Ext.getCmp(ar[i]).reset();
							}
						}
					}
				};
				return ar;
			},
			tbarInit2:function(){
				var ar=[];
				var k=0;
				ar[k++]='属性表';
				ar[k++]='-';
				ar[k++]={
					text:'保存',
					iconCls:'Accept',
					handler:function(){
						JSCLASS.save2();
					}
				}
				return ar;
			},
			listenerInit:function(){
				//这里不使用rowclick事件。
				this.grid.addListener("cellclick",function(grid,rowIndex,columnIndex,e){
					//var record=this.getSelectionModel().getSelections();
					if(columnIndex!=0){
						return;
					}
					var record=this.getStore().getAt(rowIndex);
					var ename=record.get("ENAME");
					var filter=" ENAME='"+ename+"'";
					JSCLASS.grid2.getStore().reload({params:{filter:filter}});
				})
			},
			query:function(){
				var ecname=Ext.getCmp("query_ecname").getValue();
				var filter=" (ENAME LIKE '%"+ecname+"%' OR CNAME LIKE '%"+ecname+"%')";
				Ext.getCmp("center").getStore().reload({params:{start:0,limit:10,filter:filter}});
			},
			add:function(){
				if (!JSCLASS.win) {
				JSCLASS.win = new Ext.Window({
					title : '新增',
					width : 300,
					height : 140,
					closeAction : 'hide',
					layout : 'fit',
					items : [{
								xtype : 'panel',
								plain : true,
								items : [new Ext.FormPanel({
											url:'logic.jsp',
											id:'FormPanel',
											labelWidth : 75,
											frame : true,
											title : '',
											defaultType : 'textfield',
											items : [{
												fieldLabel:'英文名',
												anchor:'100%',
												id:'ENAME',
												name:'ENAME',
												allowBlank:false
											},{
												fieldLabel:'中文名',
												anchor:'100%',
												id:'CNAME',
												name:'CNAME',
												allowBlank:false
											}]
										})]
							}],
					modal : true,
					autoScroll : false,
					buttonAlign : 'center',
					closable : true,
					buttons : [{
								text : '保存',
								iconCls : 'Accept',
								handler : function() {
									if(Ext.getCmp('FormPanel').getForm().isValid()){
										Ext.getCmp('FormPanel').getForm().submit({
											mthod:'POST',
											params:{
												type:'saveTable'
											},
											waitMsg:'保存中,请等待...',
											success:function(form,action){
												var obj=Ext.decode(action.response.responseText);
												if(obj.success){
													Ext.Msg.alert("提示","&nbsp;&nbsp;&nbsp;&nbsp;"+obj.msg+"&nbsp;&nbsp;&nbsp;&nbsp;",function(){
														JSCLASS.win.hide();
														Ext.getCmp("center").getStore().reload();
													});
												}
											}
										});
									} else {
									var fields = ['ENAME', 'CNAME'];
									for (var i = 0; i < fields.length; i++) {
										if (Ext.getCmp(fields[i]).isValid() == false) {
											var msg = '<div style="width:260">'
												+ "["
												+ Ext.getCmp(fields[i]).fieldLabel
												+ "]是必填项，请输入" + '</div>';
											Ext.MessageBox.show({
													title : '提示',
													msg : msg,
													buttons : Ext.MessageBox.OK,
													icon : Ext.MessageBox.ERROR,
													fn : function() {
														Ext.getCmp(fields[i])
																.focus();
													}
												})
											return;
									}
								}

							}
								}
							},{
								text : '关闭',
								iconCls : 'Cancel',
								handler : function() {
									JSCLASS.win.hide();
								}
							}]
				})
			}
			JSCLASS.win.show();
			},
			save:function(){
				var datas=this.grid.store.getModifiedRecords();
				var params={};
				params['type']='saveEditGrid';
				Ext.each(datas,function(i){
					params[i.data.ENAME]=i.data.CNAME;
				});
				Ext.Ajax.request({
					url:'logic.jsp',
					method:'post',
					params:params,
					success:function(response){
						var obj=Ext.decode(response.responseText);
						if(obj.success){
							Ext.Msg.alert("提示","&nbsp;&nbsp;&nbsp;&nbsp;"+obj.msg+"&nbsp;&nbsp;&nbsp;&nbsp;",function(){
							Ext.getCmp("center").getStore().reload();
							});
						}
					}
			})
		},
		save2:function(){
			var datas=this.grid2.store.getModifiedRecords();
			if(datas.length<1){
				return;
			}
			var params={
				type:'saveEditGrid2'
			};
			var records=[];
			Ext.each(datas,function(i){
				var record={
					DATAINDEX:i.data.DATAINDEX
				};
				for(var t in i.modified){
					record[t]=i.data[t];
				}
				records.push(record);
			})
			params['records']=Ext.encode(records);
			Ext.Ajax.request({
					url:'logic.jsp',
					method:'post',
					params:params,
					success:function(response){
						var obj=Ext.decode(response.responseText);
						if(obj.success){
							Ext.Msg.alert("提示","&nbsp;&nbsp;&nbsp;&nbsp;"+obj.msg+"&nbsp;&nbsp;&nbsp;&nbsp;",function(){
							JSCLASS.grid2.getStore().reload();
							});
						}
					}
			})		
		}
	}
}();
Ext.EventManager.onDocumentReady(JSCLASS.init,JSCLASS,true);


//这里借鉴cellclick事件
/*
http://qinya.iteye.com/blog/747209

*/