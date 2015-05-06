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
   		    	var grid = new Ext.grid.GridPanel({
        			store: store,
        			region:'center',
        			id:'center',
        			loadMask: true,
        			columns: [
            			{header: "ENAME", width: 150, sortable: true, dataIndex: 'ENAME'},
           		    	{header: "CNAME", width: 150, sortable: true, dataIndex: 'CNAME'}
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
				var grid = new Ext.grid.GridPanel({
        			store: store,
       			    region:'east',
        			columns: [
            			{header: "id", width: 75, sortable: true, dataIndex: 'ID',hidden:true},
            			{header: "header", width: 150, sortable: true, dataIndex: 'HEADER'},
            			{header: "width", width: 75, sortable: true, dataIndex: 'WIDTH'},
            			{header: "dataIndex", width: 100, sortable: true, dataIndex: 'DATAINDEX'},
            			{header: "hidden", width: 85, sortable: true, dataIndex: 'HIDDEN'}
        			],
        			stripeRows: true,
        			height:350,
        			width:600,
       			    title:'属性表'
    				});
    			return grid;
			},
			tbarInit:function(){
				var ar=[];
				var k=0;
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
				return ar;
			},
			listenerInit:function(){
				this.grid.addListener("rowclick",function(){
					var record=this.getSelectionModel().getSelections();
					var ename=record[0].get("ENAME");
					var filter=" ENAME='"+ename+"'";
					JSCLASS.grid2.getStore().reload({params:{filter:filter}});
				})
			},
			query:function(){
				var ecname=Ext.getCmp("query_ecname").getValue();
				var filter=" (ENAME LIKE '%"+ecname+"%' OR CNAME LIKE '%"+ecname+"%')";
				Ext.getCmp("center").getStore().reload({params:{start:0,limit:10,filter:filter}});

			}
		}
}();
Ext.EventManager.onDocumentReady(JSCLASS.init,JSCLASS,true);