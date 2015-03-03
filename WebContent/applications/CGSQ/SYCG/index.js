
Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = "/ExtJS/ext-2.0.2/air/samples/tasks/ext-2.0/resources/images/default/s.gif";
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    gridInit();
});

function gridInit(){ 
	var _tbar2 = new Ext.Toolbar(_tbar2Init());
    var store = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'paging.jsp'
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'totalCount',
			root: 'records',
			id: ''
		}, [
		    {name: 'WID', mapping: 'WID'}
		    ,{name: 'SGBH', mapping: 'SGBH'}
		    ,{name: 'K_CGFS', mapping: 'K_CGFS'}
		    ,{name: 'V_CGFS', mapping: 'V_CGFS'}
		    ,{name: 'SGR', mapping: 'SGR'}
		    ,{name: 'SGRBH', mapping: 'SGRBH'}
		    ,{name: 'SGRDH', mapping: 'SGRDH'}
		    ,{name: 'K_SGBM', mapping: 'K_SGBM'}
		    ,{name: 'V_SGBM', mapping: 'V_SGBM'}
		    ,{name: 'K_SGXQ', mapping: 'K_SGXQ'}
		    ,{name: 'V_SGXQ', mapping: 'V_SGXQ'}
		    ,{name: 'SGSJ', mapping: 'SGSJ'}
		    ,{name: 'YQWCSJ', mapping: 'YQWCSJ'}
		    ,{name: 'XMFZR', mapping: 'XMFZR'}
		    ,{name: 'FZRBH', mapping: 'FZRBH'}
		    ,{name: 'FZRDH', mapping: 'FZRDH'}
		    ,{name: 'K_SYXQ', mapping: 'K_SYXQ'}
		    ,{name: 'V_SYXQ', mapping: 'V_SYXQ'}
		    ,{name: 'SFJK', mapping: 'SFJK'}
		    ,{name: 'SFMS', mapping: 'SFMS'}
		    ,{name: 'SGSL', mapping: 'SGSL'}
		    ,{name: 'CKDJ', mapping: 'CKDJ'}
		    ,{name: 'ZGZJ', mapping: 'ZGZJ'}
		    ,{name: 'YQSBMC', mapping: 'YQSBMC'}
		    ,{name: 'JFDM', mapping: 'JFDM'}
		    ,{name: 'JFMC', mapping: 'JFMC'}
		    ,{name: 'JFZJE', mapping: 'JFZJE'}
		    ,{name: 'V_SFZG', mapping: 'V_SFZG'}
		    ,{name: 'GYSXX', mapping: 'GYSXX'}
		    ,{name: 'YQSBXX', mapping: 'YQSBXX'}
		    ,{name: 'SGLY', mapping: 'SGLY'}
		    ,{name: 'YYQSBCLYJ', mapping: 'YYQSBCLYJ'}
		    ,{name: 'BCSM', mapping: 'BCSM'}
		    ,{name: 'SHZT', mapping: 'SHZT'}
		]),
		remoteSort:true
	});	
	store.setDefaultSort("SGBH","DESC")
    // create the Grid
    var grid = new Ext.grid.GridPanel({
    	id:'grid',
        store: store,
        columns: [
        	//序号问题：http://blog.csdn.net/lanyingtianshiabc/article/details/17000409
        	//http://bbs.csdn.net/topics/330216483
        	new Ext.grid.RowNumberer({
        		header:'',
        		width:20
        	}),
        	new Ext.grid.CheckboxSelectionModel(),
            {id:'OPERATION',header: "操作", width: 40, sortable: true, dataIndex: 'OPERATION',renderer:rendererOPERATION},
            {id:'WID',header: "WID", width: 75, sortable: true, dataIndex: 'WID',hidden:true},
            {id:'SGBH',header: "申购编号", width: 120, sortable: true, dataIndex: 'SGBH'},
            {id:'K_CGFS',header: "采购方式", width: 75, sortable: true, dataIndex: 'K_CGFS'},
            {id:'V_CGFS',header: "采购方式", width: 75, sortable: true, dataIndex: 'V_CGFS'},
            {id:'SGR',header: "申购人", width: 75, sortable: true, dataIndex: 'SGR'},
            {id:'SGRBH',header: "申购人编号", width: 75, sortable: true, dataIndex: 'SGRBH'},            
            {id:'SGRDH',header: "申购人电话", width: 75, sortable: true, dataIndex: 'SGRDH'},
            {id:'K_SGBM',header: "申购部门", width: 75, sortable: true, dataIndex: 'K_SGBM'},
            {id:'V_SGBM',header: "申购部门", width: 75, sortable: true, dataIndex: 'V_SGBM'},
            {id:'K_SGXQ',header: "申购校区", width: 75, sortable: true, dataIndex: 'K_SGXQ'},
            {id:'V_SGXQ',header: "申购校区", width: 75, sortable: true, dataIndex: 'V_SGXQ'},
            {id:'SGSJ',header: "申购时间", width: 75, sortable: true, dataIndex: 'SGSJ'},
            {id:'YQWCSJ',header: "要求完成时间", width: 75, sortable: true, dataIndex: 'YQWCSJ'},
            {id:'XMFZR',header: "项目负责人", width: 75, sortable: true, dataIndex: 'XMFZR'},
            {id:'FZRBH',header: "负责人编号", width: 75, sortable: true, dataIndex: 'FZRBH'},
            {id:'FZRDH',header: "负责人电话", width: 75, sortable: true, dataIndex: 'FZRDH'},
            {id:'K_SYXQ',header: "使用校区", width: 75, sortable: true, dataIndex: 'K_SYXQ'},
            {id:'V_SYXQ',header: "使用校区", width: 75, sortable: true, dataIndex: 'V_SYXQ'},
            {id:'SFJK',header: "是否进口", width: 75, sortable: true, dataIndex: 'SFJK'},
            {id:'SFMS',header: "是否免税", width: 75, sortable: true, dataIndex: 'SFMS'},
            {id:'SGSL',header: "申购数量", width: 75, sortable: true, dataIndex: 'SGSL'},
            {id:'CKDJ',header: "参考单价", width: 75, sortable: true, dataIndex: 'CKDJ'},
            {id:'ZGZJ',header: "最高总价", width: 75, sortable: true, dataIndex: 'ZGZJ'},
            {id:'YQSBMC',header: "仪器设备名称", width: 75, sortable: true, dataIndex: 'YQSBMC'},
            {id:'JFDM',header: "经费代码", width: 75, sortable: true, dataIndex: 'JFDM'},
            {id:'JFMC',header: "经费名称", width: 75, sortable: true, dataIndex: 'JFMC'},
            {id:'JFZJE',header: "经费总金额", width: 75, sortable: true, dataIndex: 'JFZJE'},
            {id:'V_SFZG',header: "是否自购", width: 75, sortable: true, dataIndex: 'V_SFZG'},
            {id:'GYSXX',header: "供应商信息", width: 75, sortable: true, dataIndex: 'GYSXX'},
            {id:'YQSBXX',header: "仪器设备信息", width: 75, sortable: true, dataIndex: 'YQSBXX'},
            {id:'SGLY',header: "申购理由", width: 75, sortable: true, dataIndex: 'SGLY'}, 
            {id:'YYQSBCLYJ',header: "原仪器设备处理意见", width: 75, sortable: true, dataIndex: 'YYQSBCLYJ'},            
            {id:'BCSM',header: "补充说明", width: 75, sortable: true, dataIndex: 'BCSM'},
            {id:'SHZT',header: "审核状态", width: 75, sortable: true, dataIndex: 'SHZT'}
        ],
        stripeRows: true,
        autoExpandColumn: 'SGBH',
        height:height,
        width:width,
        title:'',
        loadMask:true,
        viewConfig:{
        	//tree的名字重写：http://bbs.csdn.net/topics/390666696
        	//重写排序;http://juchanghuan.iteye.com/blog/466429
        	//http://blog.csdn.net/itlwc/article/details/7868431
        	//forceFit:true,   //每列自动充满Grid
        	 columnsText : '列',
        	 sortAscText : '正序',  
    		 sortDescText : '降序'
        },
        sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
        bbar:new Ext.PagingToolbar({
        	pageSize:15,
        	store:store,
        	displayInfo:true,
        	displayMsg:'显示第   {0} 条到   {1} 条记录,共     {2}	条',
        	emptyMsg:'没有记录'
        }),
        tbar:_tbar1Init()
    });
   
    grid.on("render",function(e){
    	_tbar2.render(grid.tbar,1);
    })
    grid.render('grid-example');
	

    var filter=" AND SGRBH='"+userid+"'";
    store.load({params:{start:0,limit:15,filter:filter}});
    grid.getSelectionModel().selectFirstRow();	
}

function _tbar1Init(){
	var ar=[];
	var k=0;
	ar[k++]='申购编号：';
	ar[k++]={
		xtype:'textfield',
		id:'query_sgbh'
	}
	//友情提供：http://lazycat774880994.iteye.com/blog/697404
	ar[k++]={xtype:'tbseparator'};
	
	ar[k++]='仪器设备名称：';
	ar[k++]={
		xtype:'textfield',
		id:'query_yqsbmc'
	}
	ar[k++]='-';
	
	ar[k++]='申购时间：';
	ar[k++]={
		xtype:'datefield',
		id:'query_sgsj',
		format:'Y-m-d'
	}
	ar[k++]='-';
	ar[k++]={
		text:'查询',
		iconCls:'Zoom',
		handler:function(){
			query()
		}
	};
	ar[k++]='-';
	ar[k++]={
		text:'重置',
		iconCls:'Arrowundo',
		handler:function(){
			reset();	
		}
	}
	return ar;
}

function _tbar2Init(){
	var ar=[];
	var k=0;
	ar[k++]={
		text:'删除',
		iconCls:'Delete',
		handler:function(){
			
		}
	};
	ar[k++]='-';
	ar[k++]={
		text:'重置',
		handler:function(){
			
		}
	}
	return ar;
}
function reset(){
	var ar=['query_sgbh','query_yqsbmc','query_sgsj'];
	for(var i=0;i<ar.length;i++){
		Ext.getCmp(ar[i]).reset();
	}
}
function query(){
	var sgbh=Ext.fly("query_sgbh").dom.value;
	var yqsbmc=Ext.fly("query_yqsbmc").dom.value;
	var sgsj=Ext.fly("query_sgsj").dom.value;
    var filter=" AND SGRBH='"+userid+"'";
	if(sgbh){
		filter+=" AND SGBH LIKE '%"+sgbh+"%'";
	}
	if(yqsbmc){
		filter+=" AND YQSBMC LIKE '%"+yqsbmc+"%'";
	}
	if(sgsj){
		filter+=" AND SGSJ='"+sgsj+"'";
	}
	Ext.getCmp("grid").getStore().reload({params:{start:0,limit:15,filter:filter}});
}
/**
 * 
 *   
 *   
 *   http://www.cnblogs.com/jianglan/archive/2011/07/28/2119101.html
含有的参数的介绍：
1.value是当前单元格的值
2.cellmeta里保存的是cellId单元格id，id是列号，css是这个单元格的css样式。
3.record是这行的所有数据，你想要什么，record.data["id"]这样就获得了。
4.rowIndex是行号，不是从头往下数的意思，而是计算了分页以后的结果。
5.columnIndex列号。
6.store，这个厉害，实际上这个是你构造表格时候传递的ds，也就是说表格里所有的数据，你都可以随便调用，唉，太厉害了。
 * @param {} value
 * @param {} cellmeta
 * @param {} record
 * @param {} rowIndex
 * @param {} columnIndex
 * @param {} store
 */
function rendererOPERATION(value, cellmeta, record, rowIndex, columnIndex, store){
	var href='&nbsp;&nbsp;<a href="javascript:void(0);" onclick="view()" ><img src="/ExtJS/ext-2.0.2/resources/icons/zoom_in.png" /></a>';
	return href;
}
/**
 * a 标签执行javascript的一些方法的区别，
 */
function view(){
	alert(1);
}
/*
http://atian25.iteye.com/blog/425760
http://www.cnblogs.com/SanMaoSpace/archive/2013/01/27/2879057.html
http://www.blogjava.net/imcb/archive/2007/06/01/121325.html
Grid的属性大全，值得一看
http://www.cnblogs.com/jianglan/archive/2011/07/28/2119101.html


*/



/**
Ext  toolbar分两行
http://althars.iteye.com/blog/242719
http://lazycat774880994.iteye.com/blog/697404
http://lazycat774880994.iteye.com/blog/697404
http://www.blogjava.net/harvestfly/archive/2009/05/21/272046.html
http://www.cnblogs.com/ljian/
**/

//其他
/**
http://supercharles888.blog.51cto.com/609344/1184200
**/