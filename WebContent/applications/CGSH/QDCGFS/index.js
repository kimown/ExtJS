
Ext.onReady(function(){
	overrides();
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = "/ExtJS/ext-2.0.2/air/samples/tasks/ext-2.0/resources/images/default/s.gif";
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
    gridInit();
});

function gridInit(){
	var filter="AND SHZT='20'";
	var _tbar2 = new Ext.Toolbar(_tbar2Init());
    var store = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'paging.jsp?filter='+filter
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
		    ,{name: 'V_SFJK', mapping: 'V_SFJK'}
		    ,{name: 'V_SFMS', mapping: 'V_SFMS'}
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
    var grid = new Ext.grid.GridPanel({
    	id:'grid',
        store: store,
        columns: [
        	new Ext.grid.RowNumberer({
        		header:'',
        		width:20
        	}),
        	new Ext.grid.CheckboxSelectionModel(),
            {id:'OPERATION',header: "1操作", width: 40, sortable: true, dataIndex: 'OPERATION',renderer:rendererOPERATION},
            {id:'WID',header: "WID", width: 75, sortable: true, dataIndex: 'WID',hidden: true},
            {id:'SGBH',header: "申购编号", width: 100, sortable: true, dataIndex: 'SGBH'},
            {id:'K_CGFS',header: "采购方式", width: 75, sortable: true, dataIndex: 'K_CGFS',hidden: true},
            {id:'V_CGFS',header: "采购方式", width: 75, sortable: true, dataIndex: 'V_CGFS'},
            {id:'SGR',header: "申购人", width: 75, sortable: true, dataIndex: 'SGR'},
            {id:'SGRBH',header: "申购人编号", width: 75, sortable: true, dataIndex: 'SGRBH'},            
            {id:'SGRDH',header: "申购人电话", width: 75, sortable: true, dataIndex: 'SGRDH'},
            {id:'K_SGBM',header: "申购部门", width: 75, sortable: true, dataIndex: 'K_SGBM',hidden: true},
            {id:'V_SGBM',header: "申购部门", width: 75, sortable: true, dataIndex: 'V_SGBM'},
            {id:'K_SGXQ',header: "申购校区", width: 75, sortable: true, dataIndex: 'K_SGXQ',hidden: true},
            {id:'V_SGXQ',header: "申购校区", width: 75, sortable: true, dataIndex: 'V_SGXQ'},
            {id:'SGSJ',header: "申购时间", width: 75, sortable: true, dataIndex: 'SGSJ'},
            {id:'YQWCSJ',header: "要求完成时间", width: 75, sortable: true, dataIndex: 'YQWCSJ'},
            {id:'XMFZR',header: "项目负责人", width: 75, sortable: true, dataIndex: 'XMFZR'},
            {id:'FZRBH',header: "负责人编号", width: 75, sortable: true, dataIndex: 'FZRBH'},
            {id:'FZRDH',header: "负责人电话", width: 75, sortable: true, dataIndex: 'FZRDH'},
            {id:'K_SYXQ',header: "使用校区", width: 75, sortable: true, dataIndex: 'K_SYXQ',hidden: true},
            {id:'V_SYXQ',header: "使用校区", width: 75, sortable: true, dataIndex: 'V_SYXQ'},
            {id:'V_SFJK',header: "是否进口", width: 75, sortable: true, dataIndex: 'V_SFJK'},
            {id:'V_SFMS',header: "是否免税", width: 75, sortable: true, dataIndex: 'V_SFMS'},
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
        //autoExpandColumn: 'SGBH',
        height:height,
        width:width,
        title:'',
        loadMask:true,
        viewConfig:{
        	 columnsText : '列',
        	 sortAscText : '正序',  
    		 sortDescText : '降序'
        },
      //  sm:new Ext.grid.RowSelectionModel({singleSelect:true}),
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
    
    //grid的事件http://blog.163.com/xingchenbian_100/blog/static/942252872009477442358
    //查看页面
    grid.on('cellclick',function(grid, rowIndex, columnIndex, e){//添加mouseover事件
		var index=grid.getView().findRowIndex(e.getTarget());//根据mouseover所在的target可以取到行的位置
		if(index!==false){//取到当前选择的行
		var record=grid.getStore().getAt(index);//把这行的record取出来 
		//var str=Ext.encode(record.data);//组装成一个字符串
		var str="<div class='table_01'>"
			   +'<div style="font-size:12;float:center;height:20px;width:782px;border-bottom:1px solid #dedede;background-color:#dfe8f6;border-right:none">'
			   +'采购详细信息'+'</div>'
			   +"<div class='table_tr'><div class='table_tr_td'>申购编号:</div><div class='table_tr_td table_center'>"+record.get("SGBH") 
	           +"</div><div class='table_tr_td'>采购方式:</div><div class='table_tr_td table_center'>"+record.get("V_CGFS")
	           +"</div><div class='table_tr_td'>申购人:</div><div class='table_tr_td table_center'>"+record.get("SGR")
			   +"</div></div>"
			   +"<div class='table_tr01'><div class='table_tr_td'>申购人编号:</div><div class='table_tr_td table_center'>"+record.get("SGRBH")
			   +"</div><div class='table_tr_td'>申购人电话:</div><div class='table_tr_td table_center'>"+record.get("SGRDH")
			   +"</div><div class='table_tr_td'>申购部门:</div><div class='table_tr_td table_center'>"+record.get("V_SGBM")
			   +"</div></div>"
			   +"<div class='table_tr'><div class='table_tr_td'>申购校区:</div><div class='table_tr_td table_center'>"+record.get("V_SGXQ")
			   +"</div><div class='table_tr_td'>申购时间:</div><div class='table_tr_td table_center'>"+record.get("SGSJ")
			   +"</div><div class='table_tr_td'>要求完成时间:</div><div class='table_tr_td table_center'>"+record.get("YQWCSJ")
			   +"</div></div>"
			   +"<div class='table_tr01'><div class='table_tr_td'>项目负责人:</div><div class='table_tr_td table_center'>"+record.get("XMFZR")
			   +"</div><div class='table_tr_td'>负责人电话:</div><div class='table_tr_td table_center'>"+record.get("FZRDH")
			   +"</div><div class='table_tr_td'>使用校区:</div><div class='table_tr_td table_center'>"+record.get("V_SYXQ")
			   +"</div></div>"
			   +"<div class='table_tr'><div class='table_tr_td'> 是否进口:</div><div class='table_tr_td table_center'>"+record.get("V_SFJK")
			   +"</div><div class='table_tr_td'>是否免税:</div><div class='table_tr_td table_center'>"+record.get("V_SFMS")
	           +"</div><div class='table_tr_td'>申购数量:</div><div class='table_tr_td table_center'>"+record.get("SGSL")
			   +"</div></div>"
			   +"<div class='table_tr01'><div class='table_tr_td'>参考单价:</div><div class='table_tr_td table_center'>"+record.get("CKDJ")
			   +"</div><div class='table_tr_td'>最高总价:</div><div class='table_tr_td table_center'>"+record.get("ZGZJ")
	           +"</div><div class='table_tr_td'>仪器设备名称:</div><div class='table_tr_td table_center'>"+record.get("YQSBMC")
			   +"</div></div>"
			   +"<div class='table_tr'><div class='table_tr_td'>经费代码:</div><div class='table_tr_td table_center'>"+record.get("JFDM")
			   +"</div><div class='table_tr_td'>经费名称:</div><div class='table_tr_td table_center'>"+record.get("JFMC")
			   +"</div><div class='table_tr_td'>经费总金额:</div><div class='table_tr_td table_center'>"+record.get("JFZJE")
			   +"</div></div>"
			   +"<div class='table_tr01'><div class='table_tr_td'>是否自购:</div><div class='table_tr_td table_center'>"+record.get("V_SFZG")
			   +"</div><div class='table_tr_td'>供应商信息:</div><div class='table_tr_td table_center'>"+record.get("GYSXX")
	           +"</div><div class='table_tr_td'>仪器设备信息:</div><div class='table_tr_td table_center'>"+record.get("YQSBXX")
			   +"</div></div>"
			   +"<div class='table_tr'><div class='table_tr_td'>申购理由:</div><div class='table_tr_td table_center'>"+record.get("SGLY")
			   +"</div><div class='table_tr_td'>原仪器设备处理意见:</div><div class='table_tr_td table_center'>"+record.get("YYQSBCLYJ")
			   +"</div><div class='table_tr_td'>补充说明:</div><div class='table_tr_td table_center'>"+record.get("BCSM")
			   +"</div></div>"
			   +"<div class='table_tr01'><div class=' table_tr_td'>审核状态:</div><div class='table_tr_td table_center'>"+record.get("SHZT")
	           +"</div><div class='table_tr_td'></div><div class='table_tr_td table_center'>"
	           +"</div><div class='table_tr_td'></div><div class='table_tr_td table_center'>"						  
			   +"</div></div>"
			   +"</div>";
	   var rowE1=Ext.get(e.getTarget());//转换成Ext.Element对象
	   
	   //http://www.soso.io/article/29487.html用tip解决Ext列宽度不够的问题
	   rowE1.set({
	   	'ext:qtip':'<div style="font-size: 12;">'+ str +'</div>',//设置tip属性
		'ext:qwidth':780
		});
		}
	});	
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
		text:'确定采购方式',
		iconCls:'Wrench',
		handler:function(){
			batchAudit();
		}
	};
	return ar;
}


//ajax的loadmask
/**
 * http://www.sencha.com/forum/archive/index.php/t-89441.html
 * http://www.sencha.com/forum/archive/index.php/t-80678.html
 * http://www.sencha.com/forum/archive/index.php/t-9471.html
 */
var win;
function batchAudit(){
	var records=Ext.getCmp("grid").getSelectionModel().getSelections();
	if(records.length==0){
		Ext.Msg.alert("提示","请选中一行记录");
		return;
	}else{
		        if(!win){
		        	//http://extjs.org.cn/node/641
	var ds_cgfs=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'ajax.jsp?type=CGFS'
		}),
		reader:new Ext.data.JsonReader({
			root:'CGFS',
			totalProperty:'totalCount',
			id:''
		},[
			{name:'__BM',mapping:'BM'},
			{name:'__MC',mapping:'MC'}
		])
	});
	ds_cgfs.load();
            win = new Ext.Window({
                applyTo     : 'hello-win',
                layout      : 'fit',
                width       : 400,
                height      : 300,
                closeAction :'hide',
                //plain       : true,
                modal       : true,
                items       : {
                	xtype:'tabpanel',
                	activeTab:0,
                	defaults:{autoHeight:true, bodyStyle:'padding:10px'},
                	items:[{
                		title:'确定采购方式',
                		layout:'form',
               		    defaults: {width: 230},
                		defaultType: 'textfield',
                		labelAlign:'right',
                		items : [new Ext.form.ComboBox({
													fieldLabel : '采购方式',
													labelAlign : 'right',
													store : ds_cgfs,
													hiddenName : 'CGFS', // submit()会提交hiddenName作为key，value作为值
													id : 'I_CGFS',
													name : 'CGFS',
													emptyText : '请选择',
													mode : 'local',
													allowBlank : false,
													triggerAction : 'all',
													valueField : '__BM',
													displayField : '__MC',
													forceSelection : true
												})]
                	}]
                },
                buttons: [{
                    text     : '提交',
                    disabled : false,
                    iconCls  :'Accept',
                    handler  :function(){
                    	submit();
                    }
                },{
                    text     : '关闭',
                    iconCls  : 'Cancel',
                    handler  : function(){
                        win.hide();
                    }
                }]
            });
            
        }
        win.show();
	}
}

function submit(){
	var ar=['I_CGFS'];
	var arr=['采购方式'];
	var params={"type":"submit"};
	params["wid"]=Ext.getCmp("grid").getSelectionModel().getSelections()[0].get("WID");
	for(var i=0;i<ar.length;i++){
		if(Ext.getCmp(ar[i]).getValue()==''){
			Ext.MessageBox.alert("提示",arr[i]+"为必填项！",function(){
				Ext.getCmp(ar[i]).focus();
			})
			return;
		}
		params[ar[i]]=Ext.getCmp(ar[i]).getValue();
	}
	Ext.Ajax.request({
		url:'logic.jsp',
		method:'post',
		params: params,
		success:function(response){
			var rs=Ext.decode(response.responseText);
			if(rs.iresult==true){
				Ext.Msg.alert("提示","&nbsp;&nbsp;&nbsp;&nbsp;提交成功&nbsp;&nbsp;&nbsp;&nbsp;",function(){
					win.hide();
					var filter=" AND SHZT='10'";
					Ext.getCmp("grid").getStore().reload({params:{start:0,limit:15,filter:filter}});	
				})
			}
		}
	    
	})
}
function a(){

			var myMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
			Ext.Ajax.on('beforerequest', myMask.show, myMask);
			Ext.Ajax.on('requestcomplete', myMask.hide, myMask);
			//Ext.Ajax.on('requestexception', myMask.hide, myMask);
			
				for(var i=0;i<records.length;i++){
					Ext.Ajax.request({
					url:'logic.jsp',
					method:'post',
					params:{
						type:'batchAudit',						
						wid:records[i].get("WID")
					},
					success:function(response){
						var json=eval("("+response.responseText+")");
						if(json.iresult==true){
								//Ext.Msg.alert("提示",'&nbsp;&nbsp;&nbsp;&nbsp;删除成功&nbsp;&nbsp;&nbsp;&nbsp;');
						}
						var filter=" AND SHZT='10'";
						Ext.getCmp("grid").getStore().reload({params:{start:0,limit:15,filter:filter}});	
				},
				failure:function(){
					Ext.Msg.alert("提示",'与数据库交互失败，请稍后再试！');
				}
				})	
				}
	
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
    var filter=" AND SGRBH='"+userid+"' AND SHZT='20' ";
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
function overrides(){
	
}
/**
 * a 标签执行javascript的一些方法的区别，
 */
function view(){
	Ext.override(Ext.PagingToolbar, {
    // private
    onClick : function(which){
        var store = this.store;
        switch(which){
            case "first":
                this.doLoad(0);
            break;
            case "prev":
                this.doLoad(Math.max(0, this.cursor-this.pageSize));
            break;
            case "next":
                this.doLoad(this.cursor+this.pageSize);
            break;
            case "last":
                var total = store.getTotalCount();
                var extra = total % this.pageSize;
                var lastStart = extra ? (total - extra) : total-this.pageSize;
                this.doLoad(lastStart);
            break;
            case "refresh":
                this.doLoad(this.cursor);
            break;
        }
    }			
	})
}