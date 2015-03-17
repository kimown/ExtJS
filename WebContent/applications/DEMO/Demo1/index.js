Ext.onReady(function(){
	Ext.QuickTips.init();
	initTab();
})

function initTab(){
     shtab = new Ext.TabPanel({
        el : 'tabs'
        ,id:'tabs'
        ,autoTabs : true
        ,activeTab : 0
        ,deferredRender : false
        ,border : false
        ,width : document.body.clientWidth 
        ,height : document.body.clientHeight
    });
    var tabList = null;
	tabList = [
    	{name:'待审核',id:'DSH',iconCls:'Flagad'}
		,{name:'已审核',id:'YSH',iconCls:'Flagae'}
		];
	
	for(var i=0;i<tabList.length;i++){
		var html='<div id=\'' + tabList[i].id + '_Grid\' style="HEIGHT:92%;";></div>';
		shtab.add({
			id : tabList[i].id
			,grid : null
			,listeners : {activate : tabActivate}
			,iconCls :tabList[i].iconCls
			,title :  tabList[i].name
			,html : html
		});
	}
    shtab.render(); 
}

function tabActivate(tab){
	if(tab.mxgrid){
		//tab.mxgrid.getStore().reload({params : {filter : "V_GPXM_GPXMSQSH:"+filter}});
	}else{
		initMXGrid(tab);
	}
}



function initMXGrid(tab){
	if (!tab.mxgrid) {
		 win=new Ext.Window({
			title:'111',
			id:tab.id+'_Grid',
			el:tab.id+'_Grid',
			width:document.body.clientWidth,
			height:document.body.clientHeight*.95,
			closeAction:'hide',
			plain:true,
			items:itemsInit(),
			buttons:[{
				text:'send'
			},{
				text:'cancel'
			}]
		})
		win.setPosition(0,28);
	    tab.mxgrid = win;
	} 
    tab.mxgrid.show();
}

function itemsInit(){
	var ar=[];
	var k=0;
	ar[k++]=new Ext.Button({
		iconCls  :'Flagaf',
		el:'form',
		text:'点击',
		tooltip:'点击展示htmleditor',
		handler:function(){
			tabpanelInit();
		}
	})
	return ar;
}

var tabwin;
function tabpanelInit(){
	if(!tabwin){
		tabwin=new Ext.Window({
		title: '1',
		width: 550,
        height: 300,
		minWidth: 100,
		minHeight: 100, 
		metaReadingType:1,
		closeAction : 'hide',
		layout: 'fit',
		items: [{
			xtype:'tabpanel',
			id:'tabpanel',
            plain:true,
            activeTab: 0,
            height:300,
            items:[new Ext.FormPanel({
            	labelWidth:75,
            	frame:true,
            	title:'FormPanel',
            	defaultType:'textfield',
            	items:[{
            		xtype:'button',
            		text:"保存",
            		handler:function(){
            			saveClob();
            		}
            	},{
           			 xtype:'htmleditor',
           			 title:'htmleditor',
           			 id:'clob',
            		 fieldLabel:'Biography',
          			 height:100,
           			 anchor:'98%'  
            	}]
            })]
		}],	
		modal : true,
		autoScroll: false ,
		buttonAlign : 'center',
		closable :false,
		buttons:[{
			text:'关闭',
			iconCls:'',
			handler:function(){
				tabwin.hide();
			}
		}]
		})
	Ext.getCmp('tabpanel').add({
		title:'参数附件模板下载',
		html:'<br/><br/><h1 align="center">参数附件模板下载<image title="下载" style="cursor:hand" src= "/epstar/web/apps/images/icon/attachment.gif" onclick="javascript:getAttachment(11,22)" /></h2><br/><br/><br/><h3 align="center">提示：参数附件填写完毕后请上传至   参数附件    TAB页</h2>'
	})
	}
	Ext.getCmp("tabpanel").activate(1);
		tabwin.show();
}

function saveClob(){
	var clob=Ext.fly('clob').dom.value;
	Ext.Ajax.request({
		url:'logic.jsp',
		method:'post',
		params:{
			type:'saveClob',						
			clob:clob
		},
		success:function(response){
			var obj=Ext.decode(response.responseText)
			if(obj.iresult==true){
				Ext.Msg.alert("提示",'&nbsp;&nbsp;&nbsp;&nbsp;保存成功&nbsp;&nbsp;&nbsp;&nbsp;');
			}
		},
		failure:function(){
			Ext.Msg.alert("提示",'与数据库交互失败，请稍后再试！');
		}
	})		
}
//renderTo和applyTo的区别
/*http://www.jb51.net/article/21749.htm
 * applyTo是将组件加在了指定元素之后，而renderTo则是加在指定元素之内
 * 
 */
//设置win的位置,win.setPosition();
/*http://bbs.csdn.net/topics/300029337
 */