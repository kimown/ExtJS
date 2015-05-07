Ext.onReady(function(){
	Ext.QuickTips.init();
	override();
	formInit();
})

var simple;
function formInit(){
	    //ext js 横向滚动条 - Google Search
        //http://zhidao.baidu.com/question/583788553.html
        //http://bbs.csdn.net/topics/300252540
        //http://www.cnblogs.com/ljian/archive/2011/10/13/2210756.html
        //http://www.cnblogs.com/zqmingok/articles/1698336.html
   simple = new Ext.FormPanel({
        labelWidth: 120, // label settings here cascade unless overridden
        //url:'save-form.php',
        frame:true,
        iconCls:'',
       // autoScroll :true,
        title: '采购申请登记',
        bodyStyle:'overflow-x:hidden;overflow-y:auto;padding:5px 5px 0',
        width: width,
        height:height,
        labelAlign:'right',
        buttonAlign :'right',
        items: [{
        	layout:'column',
        	items:[{
        		columnWidth:.33,
        		layout:'form',
        		defaultType:'textfield',
        		items:items1Init()
        	},{
        		columnWidth:.33,
        		layout:'form',
        		defaultType:'textfield',
        		items:items2Init()
        	},{
        		columnWidth:.33,
        		layout:'form',
        		defaultType:'textfield',
        		items:items3Init()
        	}]
        },{
        	xtype:'fieldset',
        	title:'其他',
        	autoHeight:true,
        	defaultType:'textarea',
        	defaults:{width:width*.7},
        	labelWidth:120,
        	anchor:'95%',
        	items:items4Init()
        }],
        buttons: [{
            text: '重置',
            iconCls:'Arrowundo',
            handler:function(){
            	
            }
        },{
            text: '暂存',
            iconCls:'Disk',
            handler:function(){
            	save("temp");
            }
            
        },{
            text: '提交',
            iconCls:'Accept',
            handler:function(){
            	save("submit");
            }
        }]
    });
    simple.render(document.body);
    formdataInit();
    formeventInit();
}

function save(type){
	if(type=="temp"){
		Ext.fly("SHZT").dom.value="0";
	}else{
		Ext.fly("SHZT").dom.value="10";
	}
	if(simple.form.isValid()){
		//http://my.oschina.net/journeyAya/blog/7686
		simple.form.submit({
			method:'post',
			waitMsg:'保存数据中...',
			url:'logic.jsp',
			success:function(form,action){
				//属性disabled会无法submit,http://zhidao.baidu.com/question/334747652.html
				//form保存方法。
				//http://witcheryne.iteye.com/blog/335577
				var iresult=action.result.success;
				if(iresult){
					Ext.Msg.alert("提示",'&nbsp;&nbsp;&nbsp;&nbsp;保存成功&nbsp;&nbsp;&nbsp;&nbsp;',function(){
						if(!!simple.getForm().reset()){
							formdataInit();
						}
					});
				}
			},
			failure:function(form,action){
				Ext.Msg.alert("提示",'与数据库交互失败，请稍后再试！');
			}
		});
	}else{
//http://stackoverflow.com/questions/13311375/extjs-create-custon-icon-for-ext-messagebox
		var fields=['I_CGFS','SGRDH','YQWCSJ','XMFZR','FZRDH','I_SYXQ','CKDJ','YQSBMC','JFDM','JFMC'];
		for(var i=0;i<fields.length;i++){
			if(Ext.getCmp(fields[i]).isValid()==false){
				var msg='<div style="width:260">'+"["+Ext.getCmp(fields[i]).fieldLabel+"]是必填项，请输入"+'</div>';
				Ext.MessageBox.show({
					title:'提示',
					msg:msg,
					buttons:Ext.MessageBox.OK,
					icon:Ext.MessageBox.ERROR,
					fn:function(){
						Ext.getCmp(fields[i]).focus();
					}
				})
				return;
			}
		}
	}
}
function formeventInit(){
	//可以参考这个  ,使用keydown事件达成更好的效果
	//http://www.cnblogs.com/hongdada/archive/2013/03/08/2949681.html
	simple.findById("SGSL").on('valid',function(){
		var sgsl=Ext.fly("SGSL").getValue();
		var cgdj=Ext.fly("CKDJ").getValue()==""?0:Ext.fly("CKDJ").getValue();
		Ext.fly("ZGZJ").dom.value=sgsl*cgdj;
	})
	simple.findById("SGSL").on('valid',function(){
		var sgsl=Ext.fly("SGSL").getValue()==""?0:Ext.fly("SGSL").getValue();
		var cgdj=Ext.fly("CKDJ").getValue()==""?0:Ext.fly("CKDJ").getValue();
		Ext.fly("ZGZJ").dom.value=sgsl*cgdj;
	})
	
	simple.findById("CKDJ").on('valid',function(){
		var sgsl=Ext.fly("SGSL").getValue()==""?0:Ext.fly("SGSL").getValue();
		var cgdj=Ext.fly("CKDJ").getValue()==""?0:Ext.fly("CKDJ").getValue();
		Ext.fly("ZGZJ").dom.value=sgsl*cgdj;
	})
}
function formdataInit(){
	var ar=['SGSJ','ZGZJ','I_SGXQ','SGR','I_SGBM'];
	for(var i=0;i<ar.length;i++){
		//simple.findById(ar[i]).setDisabled(true);
		//使用样式来进行不可编辑http://www.360doc.com/content/13/0127/19/432969_262718856.shtml
		simple.findById(ar[i]).addClass("x-item-disabled");
		//simple.findById(ar[i]).getEl().dom.readOnly = true; 
		//Ext.getCmp(ar[i]).getEl().dom.readOnly = true; 
		
	}
	simple.findById("SGSJ").setValue(date);
	simple.findById("SGSL").setValue("1");
	Ext.Ajax.request({
		url:'logic.jsp',
		method:'post',
		params:{
			type:'userinfo',						
			username:username
		},
		success:function(response){
			if(response.responseText){
			var json=eval("("+response.responseText+")");
			if(json.iresult==true){
				simple.findById("SGR").setValue(json.records[0].XM);
				simple.findById("SGRDH").setValue(json.records[0].SJ);
				simple.findById("I_SGXQ").setValue(json.records[0].XQDM);
				simple.findById("I_SGXQ").setRawValue(json.records[0].XQMC);
				simple.findById("I_SGBM").setValue(json.records[0].DWDM);
				simple.findById("I_SGBM").setRawValue(json.records[0].DWMC);

			}
			}
		},
		failure:function(){
		}
	})	
}

function createCustomField(id){
	var ds = new Ext.data.Store({
		proxy: new Ext.data.HttpProxy({
			url: 'paging.jsp'
		}),
		reader: new Ext.data.JsonReader({
			totalProperty: 'totalCount',
			root: 'records',
			id: ''
		}, [
		    {name: 'ZGH', mapping: 'ZGH'}
		    ,{name: 'XM', mapping: 'XM'}
		    ,{name: 'SJ', mapping: 'SJ'}
		])
	});
	var resultTpl = new Ext.XTemplate(
        '<tpl for="."><div class="search-item">',
            '<table cellspacing="3" ><tr><td height=20 ><span>{ZGH}</span>   </td><td>{XM}',
            '</tr></table>',
        '</div></tpl>'
    	); 
	var zghField = new Ext.form.ComboBox({
		store: ds,
		applyTo: id,
		mode:'remote',
		displayField:'XM',
		typeAhead: false,
		loadingText: '搜索...',
		id: id,
		minChars: 1,
		pageSize:10,
		minListWidth:150,
		triggerAction:'query',
		hideTrigger: true, 
		tpl: resultTpl,
     	itemSelector: 'div.search-item'
	});
	
	zghField.on('select', function(combo ,record){
		var r = record.copy();
	    r.id = r.get('ZGH');
	    Ext.fly("FZRDH").dom.value=r.get("SJ");
	    Ext.fly("FZRBH").dom.value=r.get("ZGH");
	}, this);
	return zghField;
}
function  items1Init(){
	var ar=new Array();
	var k=0;
	
	/*
	 * http://hi.baidu.com/tl528428/item/772d070368b36119cd34ea25
	 * http://lwbpeter.blog.163.com/blog/static/3850821120119505629550/
	 * 
	 */
	var ds_cgfs=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'logic.jsp?type=CGFS'
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
	//ds.load();   会提前加载数据
	ar[k++]=new Ext.form.ComboBox({
		fieldLabel:'采购方式',
		labelAlign:'right',
		store:ds_cgfs,
		hiddenName:'CGFS', //submit()会提交hiddenName作为key，value作为值
		id:'I_CGFS',
		name:'CGFS',
		emptyText:'请选择',
		mode:'remote',
		allowBlank :false,
		triggerAction:'all',
		valueField:'__BM',
		displayField:'__MC',
		forceSelection:true
	});
	//----end
		var ds_sgbm=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'logic.jsp?type=SGBM'
		}),
		reader:new Ext.data.JsonReader({
			root:'SGBM',
			id:''
		},[
			{name:'__DWDM',mapping:'DWDM'},
			{name:'__DWBZMC',mapping:'DWBZMC'}
		])
	});
		ar[k++]=new Ext.form.ComboBox({
		fieldLabel:'申购部门',
		labelAlign:'right',
		store:ds_sgbm,
		id:'I_SGBM',
		name:'SGBM',
		hiddenName:'SGBM',
		emptyText:'请选择',
		mode:'remote',
		readOnly:true,
		allowBlank :false,
		triggerAction:'all',
		valueField:'__DWDM',
		displayField:'__DWBZMC',
		forceSelection:true
	});
	
	ar[k++]=new Ext.form.DateField({
		fieldLabel:'要求完成时间',
		emptyText:'请选择',
		id:'YQWCSJ',
		name:'YQWCSJ',
		width :165,
		format:'Y-m-d',
		sideText: '<font color="red" id="'+Ext.id()+'">&nbsp;&nbsp;&nbsp;&nbsp;*</font>'
	});
	
	var ds_syxq=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'logic.jsp?type=SYXQ'
		}),
		reader:new Ext.data.JsonReader({
			root:'SYXQ'
		},[
			{name:'__XQBM',mapping:'XQBM'},
			{name:'__XQMC',mapping:'XQMC'}
		])
	});
		ar[k++]=new Ext.form.ComboBox({
		fieldLabel:'使用校区',
		labelAlign:'right',
		store:ds_syxq,
		id:'I_SYXQ',
		name:'SYXQ',
		hiddenName:'SYXQ',
		emptyText:'请选择',
		mode:'remote',
		allowBlank :false,
		triggerAction:'all',
		valueField:'__XQBM',
		displayField:'__XQMC',
		forceSelection:true,
    	sideText :'<font color=red>*</font>'		
	});
	
	ar[k++]={
    	xtype:'numberfield',
    	id:'CKDJ',
    	name:'CKDJ',
    	width:165,
    	allowNegative:false,
    	allowDecimals:true,
		allowBlank :false,
    	fieldLabel:'参考单价（元）',
    	sideText : '<font color=red>*</font>' 
    }
	
	ar[k++]={
		xtype:'textfield',
		id:'ZGZJ',
		name:'ZGZJ',
		width:165,
		fieldLabel:'最高总价（元）'
	};
	
	ar[k++]={
		xtype:'numberfield',
		id:'JFZJE',
		name:'JFZJE',
		allowNegative:false,
    	allowDecimals:true,
		width:165,
		fieldLabel:'经费总金额（元）'
	}
    return ar;
}

function items2Init(){
	var ar=[];
	var k=0;
	ar[k++]={
		xtype:'textfield',
		id:'SGR',
		name:'SGR',
		width:165,
		fieldLabel:'申购人'
	};
	
	ar[k++]=new Ext.form.Hidden({
		id:'SGRBH',
		value:username
	});
	
	var ds_syxq=new Ext.data.Store({
		proxy:new Ext.data.HttpProxy({
			url:'logic.jsp?type=SYXQ'
		}),
		reader:new Ext.data.JsonReader({
			root:'SYXQ'
		},[
			{name:'__XQBM',mapping:'XQBM'},
			{name:'__XQMC',mapping:'XQMC'}
		])
	});
		ar[k++]=new Ext.form.ComboBox({
		fieldLabel:'申购校区',
		labelAlign:'right',
		store:ds_syxq,
		hiddenName:'SGXQ',
		readOnly:true,
		id:'I_SGXQ',
		name:'SGXQ',
		emptyText:'请选择',
		mode:'remote',
		allowBlank :false,
		triggerAction:'all',
		valueField:'__XQBM',
		displayField:'__XQMC',
		forceSelection:true
	});
	
	ar[k++]={
		xtype:'textfield',
		id:'XMFZR',
		name:'XMFZR',
		width:165,
		fieldLabel:'项目负责人',
		sideText :'<font color=red>*</font>'
	}
	
	ar[k++]=new Ext.form.Hidden({
		id:'FZRBH'
	})
	ar[k++]=new Ext.form.Hidden({
		id:'SHZT'	
	})
	
	ar[k++]=new Ext.form.Hidden({
		id:'type',
		value:'save'
	})
	ar[k++]=new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({
        	fields:['name','value'],
        	data:[
        		['0','否'],
        		['1','是']
        	]
        }),
       // id:'SFJK',
        name:'SFJK',
        hiddenName:'SFJK',
        allowBlank :false,
        valueField:'name',
        displayField:'value',
        typeAhead: true,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'请选择',
        fieldLabel:'是否进口',
        selectOnFocus:true
    });
    
    ar[k++]={
    	xtype:'numberfield',
    	id:'SGSL',
    	name:'SGSL',
    	width:165,
    	allowNegative:false,
    	allowDecimals:false,
    	minValue:1,
    	//maxValue:100,
    	fieldLabel:'申购数量',
    	maskRe:/\d/
    }
    
    ar[k++]={
    	xtype:'textfield',
    	id:'JFDM',
    	name:'JFDM',
    	fieldLabel:'经费代码',
    	width:165,
		allowBlank :false,
    	sideText :'<font color=red>*</font>'
    }
    
    ar[k++]=new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({
        	fields:['name','value'],
        	data:[
        		['0','否'],
        		['1','是']
        	]
        }),
        id:'I_SFZG',
        hiddenName:'SFZG',
        name:'SFZG',
        allowBlank :false,
        valueField:'name',
        displayField:'value',
        typeAhead: true,
        width:165,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'请选择',
        fieldLabel:'是否自购',
        selectOnFocus:true
    });
	return ar;
}

function items3Init(){
	var ar=[];
	var k=0;
	ar[k++]={
		xtype:'textfield',
		id:'SGRDH',
		name:'SGRDH',
		width:165,
		fieldLabel:'申购人电话',
		allowBlank :false,
		sideText : '<font color=red>*</font>'		
	};
	
	ar[k++]=new Ext.form.DateField({
		fieldLabel:'申购时间',
		id:'SGSJ',
		name:'SGSJ',
		emptyText:'请选择',
		width :165,
		readOnly:true,
		format:'Y-m-d',
		sideText : false	
	});
	
	ar[k++]={
		xtype:'textfield',
		id:'FZRDH',
		name:'FZRDH',
		width:165,
		fieldLabel:'负责人电话',
		allowBlank :false,		
      	sideText : '<font color=red>*</font>'		
	};
	
		ar[k++]=new Ext.form.ComboBox({
        store: new Ext.data.SimpleStore({
        	fields:['name','value'],
        	data:[
        		['0','否'],
        		['1','是']
        	]
        }),
       // id:'SFMS',
        name:'SFMS',
        allowBlank :false,
        valueField:'name',
        hiddenName:'SFMS',
        displayField:'value',
        typeAhead: true,
        width:165,
        mode: 'local',
        forceSelection: true,
        triggerAction: 'all',
        emptyText:'请选择',
        fieldLabel:'是否免税',
        selectOnFocus:true
    });
    
    ar[k++]={
		xtype:'textfield',
		id:'YQSBMC',
		name:'YQSBMC',
		width:165,
		allowBlank :false,
		fieldLabel:'仪器设备名称',
    	sideText :'<font color=red>*</font>'		
	};
	
	ar[k++]={
		xtype:'textfield',
		id:'JFMC',
		name:'JFMC',
		width:165,
		fieldLabel:'经费名称',
		allowBlank :false,
    	sideText :'<font color=red>*</font>'		
	};
	return ar;
}
function items4Init(){
	var ar=[];
	var k=0;
	ar[k++]={
		fieldLabel:'供应商信息',
        id:'GYSXX',
        name:'GYSXX'
     };
    ar[k++]={
        fieldLabel:'仪器设备信息',
        id:'YQSBXX',
        name:'YQSBXX'
    };
    ar[k++]={
        fieldLabel:'申购理由',
        id:'SGLY',
        name:'SGLY',
      	sideText :'<font color=red>*</font>'     
    };  
    ar[k++]={
        fieldLabel:'原仪器设备处理意见',
        id:'YYQSBCLYJ',
        name:'YYQSBCLYJ'
     }
     ar[k++]={
        fieldLabel:'补充说明',
        id:'BCSM',
        name:'BCSM'
      }
    return ar;
}


//http://fireinjava.iteye.com/blog/665258
function override(){
	Ext.BLANK_IMAGE_URL = "/ExtJS/ext-2.0.2/air/samples/tasks/ext-2.0/resources/images/default/s.gif";
	Ext.form.Field.prototype.msgTarget='side';
	Ext.override(Ext.form.TextField, {  
            sideText : '',  
            onRender : function(ct, position) {  
                Ext.form.TextField.superclass.onRender.call(this, ct, position); 
               //对指定id的TextField进行重写，否则会影响类似DateField等含TextField的控件
                var idAr=['CKDJ','JFDM','SGRDH','FZRDH','YQSBMC','JFMC'];
                if (this.sideText != ''&&idAr.toString().indexOf(this.id)!=-1 && !this.triggerAction) {  
                    this.sideEl = ct.createChild({  
                                tag : 'div',  
                                html : this.sideText  
                            });  
                    this.sideEl.addClass('x-form-sideText');  
                }else if(this.sideText != ''&&this.id=='XMFZR'){
                	if(!!createCustomField("XMFZR")){//咳咳，这是个例外
                	this.sideEl = ct.first('div').createChild({  
                                tag : 'div',  
                                html : this.sideText  
                            });  
                    this.sideEl.addClass('x-form-sideText'); 
                	}
                }  
            }  
        });
	Ext.override(Ext.form.ComboBox, {  
            sideText : '',  
            onRender : function(ct, position) {  
                Ext.form.ComboBox.superclass.onRender.call(this, ct, position);  
                if (this.sideText != '') {  
                    this.sideEl = ct.first('div').createChild({  
                                tag : 'div',  
                                style : 'padding-left: 19px; ',  
                                html : this.sideText  
                            });  
                    this.sideEl.addClass('x-form-sideText');  
                }  
                if (this.hiddenName) {  
                    this.hiddenField = this.el.insertSibling({  
                                tag : 'input',  
                                type : 'hidden',  
                                name : this.hiddenName,  
                                id : (this.hiddenId || this.hiddenName)  
                            }, 'before', true);  
  
                    // prevent input submission  
                    this.el.dom.removeAttribute('name');  
                }  
                if (Ext.isGecko) {  
                    this.el.dom.setAttribute('autocomplete', 'off');  
                }  
  
                if (!this.lazyInit) {  
                    this.initList();  
                } else {  
                    this.on('focus', this.initList, this, {  
                                single : true  
                            });  
                }  
            }  
        }); 
       Ext.override(Ext.form.DateField, {  
            sideText : '',  
            onRender : function(ct, position) { 
                Ext.form.DateField.superclass.onRender.call(this, ct, position);
                if(this.sideText!=""){
                ct.first('div').insertHtml('beforeEnd','<div  class="x-form-sideText">'+this.sideText+'</div>')
                //手册参考：http://www.jb51.net/article/29946.htm
                }
            } ,
        onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.readOnly==true){
        	return;
        }
        if(this.menu == null){
            this.menu = new Ext.menu.DateMenu();
        }
        Ext.apply(this.menu.picker,  {
            minDate : this.minValue,
            maxDate : this.maxValue,
            disabledDatesRE : this.ddMatch,
            disabledDatesText : this.disabledDatesText,
            disabledDays : this.disabledDays,
            disabledDaysText : this.disabledDaysText,
            format : this.format,
            minText : String.format(this.minText, this.formatDate(this.minValue)),
            maxText : String.format(this.maxText, this.formatDate(this.maxValue))
        });
        this.menu.on(Ext.apply({}, this.menuListeners, {
            scope:this
        }));
        this.menu.picker.setValue(this.getValue() || new Date());
        this.menu.show(this.el, "tl-bl?");
    }
        });
       Ext.override(Ext.form.TextArea, {  
            sideText : '',  
            //重写onRender方法！
    		onRender : function(ct, position) {
					if (!this.el) {
						this.defaultAutoCreate = {
							tag : "textarea",
							style : "width:100px;height:60px;",
							autocomplete : "off"
						};
					}
					Ext.form.TextArea.superclass.onRender.call(this, ct,
							position);
					if (this.grow) {
						this.textSizeEl = Ext.DomHelper.append(document.body, {
									tag : "pre",
									cls : "x-form-grow-sizer"
								});
						if (this.preventScrollbars) {
							this.el.setStyle("overflow", "hidden");
						}
						this.el.setHeight(this.growMin);
					}
					if(this.sideText!=""){
                		this.sideEl = ct.createChild({  
                                tag : 'div',  
                                html : this.sideText  
                            })
                    this.sideEl.addClass('x-form-sideText'); 
                	}
				}
        });
        
       Ext.override(Ext.form.ComboBox, {
        onTriggerClick : function(){
        if(this.disabled){
            return;
        }
        if(this.readOnly==true){
        	return;
        }
        if(this.isExpanded()){
            this.collapse();
            this.el.focus();
        }else {
            this.onFocus({});
            if(this.triggerAction == 'all') {
                this.doQuery(this.allQuery, true);
            } else {
                this.doQuery(this.getRawValue());
            }
            this.el.focus();
        }
    }
       })    
       
       
/*  重写combobox的ontriggerclick
 * 事件：http://zhidao.baidu.com/question/1173976612926289819.html
 */
Ext.form.ComboBox.prototype.onTriggerClick = Ext.form.ComboBox.prototype.onTriggerClick.createInterceptor(
		function(){
			return !this.readOnly;
		}
	);
 ///  
	
	
//http://zyjustin9.iteye.com/blog/2114562	
Ext.isIE9 = Ext.isIE && navigator.userAgent.indexOf('MSIE 9')!=-1;  
Ext.isIE10 = Ext.isIE && navigator.userAgent.indexOf('MSIE 10')!=-1;  	
	Ext.override(Ext.menu.Menu, {  
    autoWidth: function() {  
        var el = this.el,  
            ul = this.ul;  
        if (!el) {  
            return;  
        }  
        var w = this.width;  
        if (w) {  
            el.setWidth(w);  
        } else if (Ext.isIE && !Ext.isIE8 && !Ext.isIE9 && !Ext.isIE10) {  
            el.setWidth(this.minWidth);  
            var t = el.dom.offsetWidth;  
            el.setWidth(ul.getWidth() + el.getFrameWidth("lr"));  
        }  
    }  
});  
// chrome  
Ext.override(Ext.menu.DateMenu, {    
    render : function() {    
        Ext.menu.DateMenu.superclass.render.call(this);    
        if (Ext.isGecko || Ext.isSafari || Ext.isChrome) {    
            this.picker.el.dom.childNodes[0].style.width = '178px';    
            this.picker.el.dom.style.width = '178px';    
        }    
    }    
});
}