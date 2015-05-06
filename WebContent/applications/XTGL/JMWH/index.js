Ext.ns("cn.com");
Ext.BLANK_IMAGE_URL = "/ExtJS/ext-2.0.2/air/samples/tasks/ext-2.0/resources/images/default/s.gif";

cn.com.JSCLASS=function(){
	
	return {
		init:function(){
			var grid=this.gridInit();
			    viewport = new Ext.Viewport({
        		layout:'border'
        		,frame: false
        		,border: false
       		    ,items:[
            		grid
         			]
    			});
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
				store.setDefaultSort("ENAME","DESC")
				store.load({params:{start:0,limit:2,filter:"1=1"}});
   		    	var grid = new Ext.grid.GridPanel({
        			store: store,
        			region:'center',
        			loadMask: true,
        			columns: [
            			{header: "ENAME", width: 120, sortable: true, dataIndex: 'ENAME'},
           		    	{header: "CNAME", width: 120, sortable: true, dataIndex: 'CNAME'}
        			],
        			stripeRows: true,
        			height:350,
        			width:600,
        			title:'',
        			bbar:new Ext.PagingToolbar({
        				pageSize:15,
        				store:store,
        				displayInfo:true,
        				displayMsg:'显示第   {0} 条到   {1} 条记录,共     {2}	条',
        				emptyMsg:'没有记录'
        			})
    			});
   		 		return grid;
			}	
			
			
		}
}();
Ext.EventManager.onDocumentReady(cn.com.JSCLASS.init,cn.com.JSCLASS,true);