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
    	{name:'待审核',id:'DSH'}
		,{name:'已审核',id:'YSH'}
		]
	for(var i=0;i<tabList.length;i++){
		var html='<div id=\'' + tabList[i].id + '_Grid\' style="HEIGHT:90%"></div>';
		shtab.add({
			id : tabList[i].id
			,grid : null
			,listeners : {activate : tabActivate}
			,iconCls :'Flagad'
			,title : '<image src=/epstar/web/apps/images/database_table.gif>&nbsp;'+ tabList[i].name
			,html : html
		});
	}
    shtab.render(); 
}

function tabActivate(tab){
	if(tab.mxgrid){
		alert(1)
		//tab.mxgrid.getStore().reload({params : {filter : "V_GPXM_GPXMSQSH:"+filter}});
	}else{
		initMXGrid(tab);
	}
}



function initMXGrid(tab){
	if (!tab.mxgrid) {
		//Ext.getCmp(tab.id+'_Grid').
		 win=new Ext.Window({
			title:'111',
			id:tab.id+'_Grid',
			el:tab.id+'_Grid',
			layout:'fit',
			width:document.body.clientWidth,
			height:document.body.clientHeight*0.9,
			closeAction:'hide',
			//plain:true,
			buttons:[{
				text:'send'
			},{
				text:'cancel'
			}]
		})
	    tab.mxgrid = win;
	} 
    tab.mxgrid.show();
}
