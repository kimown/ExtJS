/*
 * Ext JS Library 2.0.2
 * Copyright(c) 2006-2008, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://extjs.com/license
 */

FeedViewer = {};

Ext.onReady(function(){
	//Ext占位图片地址替换：http://book.51cto.com/art/200902/109288.htm
	Ext.BLANK_IMAGE_URL = "/ExtJS/ext-2.0.2/air/samples/tasks/ext-2.0/resources/images/default/s.gif";
    Ext.QuickTips.init();

    Ext.state.Manager.setProvider(new Ext.state.SessionProvider({state: Ext.appState}));

    var tpl = Ext.Template.from('preview-tpl', {
        compiled:true,
        getBody : function(v, all){
            return Ext.util.Format.stripScripts(v || all.description);
        }
    });
    FeedViewer.getTemplate = function(){
        return tpl;
    }

    var feeds = new FeedPanel();
    var mainPanel = new MainPanel();

    feeds.on('feedselect', function(feed){
        mainPanel.loadFeed(feed);
    });
    
    var viewport = new Ext.Viewport({
        layout:'border',
        items:[
            new Ext.BoxComponent({ // raw element
                region:'north',
                el: 'header',
                height:32
            }),
            feeds,
            mainPanel
         ]
    });

    // add some default feeds
    feeds.addFeed({
        url:'/ExtJS/aa.jsp',
        text: '提交采购申请'
    }, false, true);

    feeds.addFeed({
        url:'http://extjs.com/forum/external.php?type=RSS2',
        text: '所有采购'
    }, true);

    feeds.addFeed({
        url:'http://feeds.feedburner.com/ajaxian',
        text: 'Ajaxian'
    }, true);
});

// This is a custom event handler passed to preview panels so link open in a new windw
FeedViewer.LinkInterceptor = {
    render: function(p){
        p.body.on({
            'mousedown': function(e, t){ // try to intercept the easy way
                t.target = '_blank';
            },
            'click': function(e, t){ // if they tab + enter a link, need to do it old fashioned way
                if(String(t.target).toLowerCase() != '_blank'){
                    e.stopEvent();
                    window.open(t.href);
                }
            },
            delegate:'a'
        });
    }
};