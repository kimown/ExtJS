Ext.onReady(function(){
	Ext.BLANK_IMAGE_URL = "/ExtJS/ext-2.0.2/air/samples/tasks/ext-2.0/resources/images/default/s.gif";
	Ext.QuickTips.init();
	vpInit();
})


var tabs;
function vpInit(){
		//tabpanl中背景图片：
		// http://stackoverflow.com/questions/11012423/sencha-set-image-as-background-to-a-panel
         tabs = new Ext.TabPanel({
            region    : 'center',
            margins   : '3 3 3 0', 
            activeTab : 0,
            defaults  : {
				autoScroll : true
			},
            items     : [{
                title    : '首页',
                //http://www.cnblogs.com/wenjl520/archive/2008/11/03/1325618.html
                iconCls:'House',
                html     : '<img src="52785f1d0d3e8.jpg" width=100% height=100%>',
                closable : false
             }],
             listeners:{
             	activate:tabActivate
             }
        });

        // Panel for the west
        var nav = new Ext.Panel({
            title       : '采购申请',
            region      : 'west',
            split       : true,
            width       : 200,
            collapsible : true,
            margins     : '3 0 3 3',
            cmargins    : '3 3 3 3'
        });
        var dataUrl='tree-data.json';
        switch(username){
        	case '199210935':dataUrl='tree-data_0.json';break;
        	case '200210610':dataUrl='tree-data_0.json';break;
        	case '200611485':dataUrl='tree-data_10.json';break;
        	case '199210324':dataUrl='tree-data_20.json';break;
        	case '200411037':dataUrl='tree-data_30.json';break;
        }
        var treePanel = new Ext.tree.TreePanel({
    		id: 'tree-panel',
    		title: '',
        	region:'west',
        	split: true,
        	width: 200,
        	minSize: 150,
        	autoScroll: true,
        	rootVisible: false,
        	lines: false,
        	singleExpand: false,
        	useArrows: true,
       		loader: new Ext.tree.TreeLoader({
            	dataUrl:dataUrl
       		 }),
        	root: new Ext.tree.AsyncTreeNode()
    	});
    	
    	//一个坑，点击叶子节点触发事件。
    	//http://blog.csdn.net/scythev/article/details/4818610
    	treePanel.addListener('click',function(node,e){
    		openTab(node);
    	});
        var win = new Ext.Window({
            title    : '',
            closable : false,
            width    : width,
            height   : height,
            //border : false,
            plain    : true,
            layout   : 'border',
            draggable: false,
            items    : [treePanel, tabs]
        });
        win.show();
        var nbsp="";
        var userAgent=navigator.userAgent;  //浏览器兼容性
        var n=300;
        if(userAgent.indexOf("Chrome")!=-1){
			n=220;
        }
         for(var i=0;i<n;i++){
        		nbsp+="&nbsp;";
        }
	Ext.Ajax.request({
		url:'logic.jsp',
		method:'post',
		params:{
			type:'userinfo',						
			username:username
		},
		success:function(response){
			var json=eval("("+response.responseText+")");
			if(json.iresult==true){
	        win.setTitle(time+nbsp+"欢迎您 ,<img src='/ExtJS/ext-2.0.2/resources/icons/user.png' />&nbsp;"+json.XM+'  <a href="javascript:void(0)" onclick="exit()">注销</a>',"Date");			
			}
		},
		failure:function(){
		}
	})	
}

function exit(){
	Ext.Ajax.request({
		url:'logic.jsp',
		method:'post',
		params:{
			type:'exit'
		},
		success:function(response){
			var result=Ext.decode(response.responseText);
			if(result.iresult==true){
				window.location.href="/ExtJS/index.jsp";
			}else{
				alert(0);
			}
		}
		})
}
function openTab(node){
	if(node.id.indexOf("ynode-")!=-1){
		return;
	};
	if(Ext.getCmp(node.id)){
		tabs.setActiveTab(Ext.getCmp(node.id));
		return;
	}
	var iconCls="";
	switch(node.id){
		case 'submit':
			iconCls="Applicationformadd";
			break;
		case 'all_purchases':
			iconCls="Applicationviewcolumns";
			break;
		case 'secretary_audit':
			iconCls="Commentedit";
			break;
		case 'Demo':
			iconCls="Cog";
			break;
		case 'dict':
			iconCls="Cogedit";
			break;
		case 'decide_method':
			iconCls="Pageedit";
			break;
		case 'audit':
			iconCls="Pagelightning";
			break;
		case 'BizModel':
			iconCls="Controller";
			break;
	}

	var html='<iframe id="'+node.id+'_iframe" frameborder="0" width=100% height=100%></iframe>';
            tab = new Ext.Panel({
                id: node.id,
                iconCls:iconCls,
                title: "",
                tabTip: "",
                html:html ,
                closable:true,
                autoScroll:true,
                border:true,
                listeners:{activate :tabActivate}
            });
            tab.setTitle(node.text);
            tabs.add(tab);
            tabs.setActiveTab(tab);

}
function tabActivate(p){
	if(p.id=="submit"){
		if(Ext.getDom("submit_iframe").src==""){
			Ext.getDom("submit_iframe").src="/ExtJS/applications/CGSQ/TJCGSQ/index.jsp";
		}
	}else if(p.id=="all_purchases"){
		if(Ext.getDom("all_purchases_iframe").src==""){
			Ext.getDom("all_purchases_iframe").src="/ExtJS/applications/CGSQ/SYCG/index.jsp";	
		}
	}else if(p.id=="secretary_audit"){
		if(Ext.getDom("secretary_audit_iframe").src==""){
			Ext.getDom("secretary_audit_iframe").src="/ExtJS/applications/CGSH/MSSH/index.jsp";	
		}
	}else if(p.id=="Demo"){
		if(Ext.getDom("Demo_iframe").src==""){
			Ext.getDom("Demo_iframe").src="/ExtJS/applications/DEMO/Demo1/index.jsp";	
		}
	}else if(p.id=="dict"){
		if(Ext.getDom("dict_iframe").src==""){
			Ext.getDom("dict_iframe").src="/ExtJS/applications/XTGL/ZDWH/index.jsp";	
		}
	}else if(p.id=="decide_method"){
		if(Ext.getDom("decide_method_iframe").src==""){
			Ext.getDom("decide_method_iframe").src="/ExtJS/applications/CGSH/QDCGFS/index.jsp";	
		}
	}else if(p.id=="audit"){
		if(Ext.getDom("audit_iframe").src==""){
			Ext.getDom("audit_iframe").src="/ExtJS/applications/CGSH/CGSQSH/index.jsp";	
		}
	}else if(p.id=="BizModel"){
		if(Ext.getDom("BizModel_iframe").src==""){
			Ext.getDom("BizModel_iframe").src="/ExtJS/applications/XTGL/JMWH/index.jsp";	
		}
	}
}