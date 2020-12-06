/*
 *jsExpressEdit v1.0 - javascript parse Editor
 *
 * Author: Brian Hayes  
 *
 * Copyright 2020  jsexpressedit.com  
 *updateTextChanges
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
   
   */
	
	jQuery.fn.justtext = function() {//from  https://www.viralpatel.net/jquery-get-text-element-without-child-element/
		return jQuery(this).clone().children().remove().end().text();
		}
     var jsExpressEdit = {
     collect : '',
	dirColl : '',
     sort : false,
     sortall : false,
     url  :   window.location.href.split('?')[0].split('#')[0],
     track :  0,
     trackNodes : 0,
     strlength :30,
     attr : 'data-id-track',
     reboot   : function(){if (arguments[0]&&arguments[0]!='sort'&&arguments[0]!='sortall') alert(arguments[0]);
          if ( arguments[0] == 'sort')  
               this.parseTextarea(this.cn, this.bid, 'sort');
          else if (arguments[0] == 'sortall' )
               this.parseTextarea(this.cn, this.bid, 'sortall');
          else this.parseTextarea(this.cn, this.bid);
          },
     remove  : function(num,procedure){
          var elem =jQuery("["+this.attr+"="+num+"]",jQuery(this.obje));
          if ( procedure == 'strip'){
               var cnt = elem.contents();
               elem.replaceWith(cnt);
               this.reboot();
               }
          else if (procedure == 'all'){
               elem.remove();
               this.reboot();
               }
          else if (procedure == 'alltext'){
               text=arguments[2].replace(/^\s+|\s+$/g,'');
               html=this.obje.innerHTML;
               var pattern=new RegExp('(\u00a0|&nbsp;| )?'+text+'(&nbsp;|\u00a0| )?','g');
               html=html.replace(pattern,'');
               this.obje.innerHTML=html;jQuery("#edit_track_"+num,jQuery('#editorHtml_'+this.bid)).remove();
               }
          },
     searchReplace : function(search,replace){
          html=this.obje.innerHTML;  
          var search = jQuery('#'+search).val();
          var replace = jQuery('#'+replace).val();
          var pattern=new RegExp(search,'g');
          this.obje.innerHTML=html.replace(pattern,replace);
          this.reboot();
          },               
     createAllFigure : function(){
          var reboot=false;
           jQuery(this.obje).find('img').each(function(){
               var elem = jQuery(this);
               if (elem.parent().prop("tagName").toLowerCase()==='figure'){
                   console.log('a figure tag already created. Remove to reiniate caption creation.');  
                    }
               else {
                    elem.wrap('<figure></figure>');
                    jQuery('<figcaption>Image Caption Goes Here</figcaption>').insertAfter(elem);
                    reboot=true;
                    }
               });
          if (reboot)this.reboot()
          },
	createFigure   :  function(id,num,msg){
          var reboot=false;
          var elem =jQuery("["+this.attr+"="+num+"]",jQuery(this.obje)); console.log(elem)
          var rmsg='Figure tags should have one img only and caption text within a <figcaption> tag:  Malformed figure caption with multiple imgs/etc inserted within same figure tag. Remove extra images or figure/figcaption elements as needed';
          if (document.getElementById(id).checked){
               if (elem.parent().prop("tagName").toLowerCase()==='figure'){
                   alert('figure tag already created. Remove to reiniate caption creation.');
                   if(elem.siblings().length>1){
                         alert(rmsg);
                         }
                    if(elem.siblings()[0].prop("tagName").toLowerCase()!=='figcaption'){
                         alert(rmsg);
                         }
                    }
               else {
                    elem.wrap('<figure></figure>');
                    jQuery('<figcaption>Image Caption Goes Here</figcaption>').insertAfter(elem);
                    reboot=true;
                    }
               document.getElementById(id+'t').innerHTML='<span class="positon">'+msg+'</span>'; 
               }
          if (reboot)this.reboot();
		},//end oncheck
     removeAllFigures   :  function(){
          var reboot=false;
          jQuery(this.obje).find('img').each(function(){
               var elem = jQuery(this);
                if (elem.parent().prop("tagName").toLowerCase()==='figure'){
                    var cnt = elem.parent().contents();
                    elem.parent().replaceWith(cnt);
                    reboot=true;
                    }
               else alert('Figure Parent Wrap not found');
               if(elem.next().length>0&&elem.next().prop("tagName").toLowerCase()==='figcaption'){
                     elem.next().remove();
                     reboot=true;
                     }
               else {
                    alert('Normal next figcaption tag not found');
                    }
               });
          if (reboot)this.reboot();
               
		},//end oncheck
     removeEmptyP   :  function(){ 
          var html = jQuery(this.obje).html();
          var Pattern = new RegExp('<p [^>]*></p>|<p [^>]*><br></p>','g');
          var html = html.replace(Pattern,''); 
          jQuery(this.obje).html(html);
          this.reboot();
		},
	autodivwrap  : function(){ 
		jQuery(this.obje).wrapInner('<div></div>'); 
          this.reboot();
		},
     removeAllFiguresSaveCaptions   :  function(){
          var reboot=false;
          jQuery(this.obje).find('img').each(function(){
               var elem = jQuery(this);
               if (elem.parent().prop("tagName").toLowerCase()==='figure'){
                    var cnt = elem.parent().contents();
                    elem.parent().replaceWith(cnt);
                    reboot=true;
                    }
               else alert('Figure Parent Wrap not found');
               if(elem.next().length>0&&elem.next().prop("tagName").toLowerCase()==='figcaption'){
                     reboot=true;
                     }
               else {
                    alert('Normal next figcaption tag not found');
                    }
               });
          if (reboot)this.reboot();
               
		},//end oncheck
	selectText  :  function(bid){
		this.selectedText ='';
		 
		if (window.getSelection) {
		    this.selectedText = window.getSelection();
		    if (this.selectedText.toString().length > 5) { 
				jsExpressEdit.wrapSelect(bid, 'editorHtml_'+bid);
				return false;
				}
		     
			//docment.getElementById('editorHtml_'+bid).addEventListener("click", stopEvent, true);
			//removeEventListener('click',true);
			}
		else if (document.selection && document.selection.createRange) {
		    this.selectedText = document.selection.createRange();
		     alert ('doc.get' + this.selectedText)
			}
		return true;	
			/*
		// window.getSelection 
		if (jQuery(this.obje).getSelection) { 
			selectedText = jQuery(this.obje).getSelection(); 
		} 
		// document.getSelection 
		else if (document.getSelection) { 
			selectedText = document.getSelection(); 
		} 
		// document.selection 
		else if (document.selection) { 
			selectedText = 
			document.selection.createRange().text; 
		} else return;  
		// To write the selected text into the textarea 
		this.selectedText = selectedText.toString();*/
		},
	removeFigure   :  function(id,num,msg){
          var reboot=false;
          var elem =jQuery("["+this.attr+"="+num+"]",jQuery(this.obje));
          if (document.getElementById(id).checked) {
               if (elem.parent().prop("tagName").toLowerCase()==='figure'){
                    var cnt = elem.parent().contents();
                    elem.parent().replaceWith(cnt);
                    document.getElementById(id+'t').innerHTML+='<span class="clear positon">Figure Parent Wrap Removed</span>';
                    reboot=true;
                    }
               else alert('Figure Parent Wrap not found');
               if(elem.next().length>0&&elem.next().prop("tagName").toLowerCase()==='figcaption'){
                     elem.next().remove();
                     document.getElementById(id+'t').innerHTML+='<span class="clear positon"> figcaption and caption text removed</span>';
                     reboot=true;
                     }
               else {
                    alert('Normal next figcaption tag not found');
                    }
               if (reboot)this.reboot();
               }
		},//end oncheck 
	removeFigureSaveCaption   :  function(id,num,msg){
          var reboot=false;
          var elem =jQuery("["+this.attr+"="+num+"]",jQuery(this.obje));
          if (document.getElementById(id).checked) {
               if (elem.parent().prop("tagName").toLowerCase()==='figure'){
                    var cnt = elem.parent().contents();
                    elem.parent().replaceWith(cnt);
                    document.getElementById(id+'t').innerHTML+='<span class="clear positon">Figure Parent Wrap Removed</span>';
                    reboot=true;
                    }
               else alert('Figure Parent Wrap not found');
               if(elem.next().length>0&&elem.next().prop("tagName").toLowerCase()==='figcaption'){
                     //elem.next().remove();
                     document.getElementById(id+'t').innerHTML+='<span class="clear positon"> figcaption and caption text removed</span>';
                     reboot=true;
                     }
               else {
                    alert('Normal next figcaption tag not found');
                    }
               if (reboot)this.reboot();
               }
		},//end oncheck 
     closeEditor : function(bid) {
          arguments[1]='all';
		this.obje.removeAttribute('contentEditable');
          if (arguments[1]=='all'){ //not necessary as currently only one editor active at a time..    
               jQuery('.altEditorHtml').each(function(){ 
                    jQuery(this).empty();
                    });
               }
          else
          jQuery('#editorHtml_'+bid).empty();
          },
     updateAttr : function(id,type,attr,bid,track){  
          var elem=document.getElementById(bid); 
          var input=document.getElementById(id);
          var val=input.value; 
           var parseObj =jQuery("["+attr+"="+track+"]",jQuery('#'+bid)); 
          if (type==='id' && document.getElementById(val)){
               alert('The same or another element has the idname: '+val+' No change made');
               jsExpressEdit.reboot(); 
               }
          else if (type ==='addwrap'){
                    parseObj.wrap('<'+val+'></'+val+'>');
               }
          else{
               parseObj.attr(type,val);
               parseObj.removeAttr('data-mce-'+type);//clear tinymce old markup 
               input.parentNode.innerHTML+='<span class="altmsg">main form input is updated</span>';
               }
          jsExpressEdit.reboot();
          },
     updateText : function(track){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var text=jQuery(elem).html();
          var showObj=jQuery('#altTextAreaShow_'+this.bid+'_'+track); 
          if (!showObj.hasClass('hide')){
               showObj.attr('class','hide');
               return;
               }
          showObj.removeAttr('class','hide');
          var html='<div class="altTextAreaShow">Edit&nbsp;InnerHTML:<textarea id="jsTextareaClick_'+this.bid+'_'+track+'" rows="7" onkeyup="jsExpressEdit.autoGrowFieldScroll(this);">'+text+'</textarea>';
          html+='<p class="altSubmit" title="click to update text changes" onclick="jsExpressEdit.updateTextChanges(\''+track+'\',\'jsTextareaClick_'+this.bid+'_'+track+'\');">Update&nbsp;Text&nbsp;Changes</p><p class="clear"></p></div>'; 
          showObj.html(html);
          },
     updateTextChanges : function(track,id){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var val=jQuery('#'+id).val();
          elem.html(val);
          this.reboot();
          },
     checkRWDFrame  : function(id){
          var parent=elem.parent();
          var grandparent = parent.parent();
          var siblings = elem.siblings();
          var iframeAttr = grandparent.attr('data-iframe-rwd');
          var x = [];
          if (grandparent.id !== this.obje.id && iframeAttr === 'rwd' && grandparent.prop('nodeName').toLowerCase() == 'p'){
                    console.log(' gparent cool so far');
                    x.gp=true;
                    }
               else {
                    alert('no gparent attr: '+grandparent.attr('class'));
                    x.gp=false;
                    }
          if (parent.id !== this.obje.id && siblings.prop('nodeName').toLowerCase() == 'span' && parent.attr('data-mce-object') === "iframe"){
               x.p=true;
               }
          else {
               x.p = false;
               alert('parent problem');
               }
          if (siblings.length <2 && siblings.length > 0  && siblings.prop('nodeName').toLowerCase() == 'span'){
               alert('siblings checkout');
               x.s = true;
               }
          
          else {
               alert('siblinglen: '+siblings.length+ ' nodN: '+siblings.prop('nodeName').toLowerCase());
               x.s=false;
               }
          return x;
          },
     sortRespond : function(id){// sorting with addon editor for iframe RWD mode integrity
     //tiny-mce automatically wraps iframes with span/p elements.  Using iframe RWD wrap mode available for iframe videos allows them to respond to view-port changes and rwd class width styles etc. This checks for any tinymce changes to iframe RWD mode
     
          var source = jQuery('#'+id);
          source.find('iframe').each(function(){
               elem=jQuery(this);
               var src = elem.attr('src');
               var iUrl = src.split('?')[0];
               var iUrl = iUrl.split('/').pop();
               if (elem.parents("[data-iframe-id="+iUrl+"][data-iframe-level='style-class']",source).length){
                    console.log('moving iframes found parent');
                    }
               else {
                    var wrapper=source.find("[data-iframe-id="+iUrl+"][data-iframe-level='style-class']");
                    if (wrapper.length > 1)
                         console.log('multiple iframe wrapper');
                    else if (wrapper.length < 1)
                         console.log('no wrapper found error');
                    else {
                         console.log('normal iframe dragsort');
                         var iP = jQuery("[data-iframe-id="+iUrl+"][data-iframe-level='style-class']",source);
                         var classN = iP.attr('class');
                         var style = iP.attr('style'); 
                         var cnt = iP.contents();
                         iP.replaceWith(cnt);
                         var vidWrap = jQuery("[data-iframe-id="+iUrl+"][data-iframe-level='vidWrap']",source);
                         var cnt = vidWrap.contents();
                         vidWrap.replaceWith(cnt);
                         var parent=elem.parent();
                         var gp=parent.parent();
                         if (gp.prop('nodeName').toLowerCase()!=='div'){
                              var sibs = parent.siblings();
                              var parsibs=gp.siblings();
                              if (sibs.length <  parsibs.length ){
                                   var index = parent.index();
                                   if ( index < (sibs.length/2) ){
                                        console.log('insert Before Iframe Drag event, index: '+index + ' < sibs.length/2: '+ (sibs.length/2));
                                        parent.insertBefore(gp);
                                        }
                                   else {
                                        console.log('insert After Iframe Drag event, index: '+index + ' >= sibs.length/2: '+ (sibs.length/2));
                                        parent.insertAfter(gp);
                                        }
                                   }
                              else console.log('sibs.length: '+sibs.length+' < parsibs length: '+parsibs.length);
                              var classA =  typeof classN !== typeof undefined && classN !== false && classN !=='' ? ' class="'+classN+'"' : '' ;
               var styleA =  typeof style !== typeof undefined && style !== false && style !=='' ? ' style="'+style+';"' : ' style="width:95%;max-width:500px;" ';
                              parent.wrap('<p data-iframe-id="'+iUrl+'"  data-iframe-level="style-class" '+ styleA+ classA+'><span data-iframe-level="vidWrap" class="videoWrapper" data-iframe-id="'+iUrl+'"></span></p>');
                              }
                         }
                    
                    }
               });
          },
     autoiframeinit  :  function(method){
          var collect = [];
          jQuery('iframe',jQuery(this.obje)).each(function() {
               var num=jQuery(this).attr('data-id-track');
               collect.push(num);
               });  
          for ( i in collect ){
               jsExpressEdit.rwdIframeInit(collect[i],method,'auto');
               }
          this.reboot();
          },
     rwdIframeInit  :  function(track, method){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          if (method == 'add'){
               var parent = elem.parent(); 
               if (elem.prev().length || elem.prev().id  === this.obje.id || parent.prop('nodeName').toLowerCase() !== 'span' || parent.attr('data-mce-object') !== "iframe"){//
                    alert('Sumbmit Before Choosing Activation.  Be sure to actually submit page changes for tinymce to do its thing first then activate iframe RWD');
                    return;
                    }
var src = elem.attr('src');
               var iUrl = src.split('?')[0];
               var iUrl = iUrl.split('/').pop();
               elem.attr('data-iframe-id',iUrl);
			if (parent[0].hasAttribute('data-mce-p-iframe-id')){
				alert('skipping activated iframe auto id '+iUrl);
				return;
				}	
               var gp = parent.parent();
               var ggp = gp.parent();
               var ggpnodeN=ggp.prop('nodename'); 
               if (typeof ggpnodeN !== typeof undefined && ggpnodeN !== false && ggpnodeN !=='' && ggpnodeN.toLowerCase() == 'div' &&  ggp.attr('data-iframe-level') === 'style-class' && ggp.attr('data-iframe-id') === iUrl){
                    alert('Auto iframe RWD mode appears to be activated');
                    return;
                    }
               parent.attr('data-mce-p-iframe-level','span');
               elem.nextAll().each(function(i){
                    if (jQuery(this).attr('class') !=='mce-shim'){
                         alert('iframe sibling mce-shim not present problem');
                         return;
                         }
                    else {
                         if (i > 0)jQuery(this).remove();
                         }
                    });
               var classN = parent.attr('data-mce-p-class');
               var style = parent.attr('data-mce-p-style');
               var classA =  typeof classN !== typeof undefined && classN !== false && classN !=='' ? ' class="'+classN+'"' : '' ;
               var styleA =  typeof style !== typeof undefined && style !== false && style !=='' ? ' style="'+style+';"' : ' style="width:95%;max-width:500px;" ';
               var gpnodeN = gp.prop('nodeName');
               if (typeof gpnodeN !== typeof undefined && gpnodeN !== false && gpnodeN !=='' && gpnodeN.toLowerCase() === 'p' && gp.justtext() === '' ){
                    var cnt = gp.contents();
                    gp.replaceWith(cnt);
                    }
               parent.wrap('<p data-iframe-id="'+iUrl+'"  data-iframe-level="style-class" '+ styleA+ classA+'><span data-iframe-level="vidWrap" class="videoWrapper" data-iframe-id="'+iUrl+'"></span></p>');
               
               if (arguments[2] !=='auto')
                    alert('Response Enabled iframe video has just been activated.  The parent p tag recieves the styling or classname that has been appropriately styled for with the width response required. Temporary styling of this parent p tag has been applied and should be removed for custom styling!');
               elem.removeAttr('style');
               elem.removeAttr('class');
               parent.removeAttr('data-mce-p-class');
               parent.removeAttr('data-mce-p-style');
               if (arguments[2] !=='auto')this.reboot();
               return;
               }
          if (method == 'remove'){
               var src = elem.attr('src');
			if (elem.next().hasClass('mce-shim'))
				elem.next().remove();
               var iUrl = src.split('?')[0];
               var iUrl = iUrl.split('/').pop();
               var remElems =jQuery("[data-iframe-id="+iUrl+"]",jQuery(this.obje));
               remElems.each(function(){
                    if (jQuery(this).prop('nodeName').toLowerCase() == 'span' || jQuery(this).prop('nodeName').toLowerCase() == 'p'){
                         var cnt = jQuery(this).contents();
                         jQuery(this).replaceWith(cnt);
                         }
                    });
               var parent = elem.parent(); 
               parent.removeAttr('data-mce-p-iframe-id');
               parent.removeAttr('data-mce-p-iframe-level');
               if (arguments[2] !=='auto')this.reboot();
               return;
               }
          },
	wrapSelect  : function(bid,showId){  
          var showObj=jQuery('#'+showId);
		showObj.css({'border-color':'rgba(225,225,225,.60)','border':'1px','background-color':'rgba(175,175,175,.60)','position':'fixed','top':'20px','z-index':'10000000000'});
		var html='<div style="margin-left:50px;margin-top:10px;display:inline-block;background:#afafaf;font-size:14px;" class="clear fsmgreen altClassStyle">';
		html+='<p >Add New Element wrap around selected Text<br>1. First optionally add classname to the new tag:<br><input onblur="this.obje.focus());"  type="text" id="selectWrapperClass_'+bid+'" value=""><br>2.Second,  Select the text you wish to wrap. <br>Text to Select should be below the shadow of this box if necessary for focus. <br>After selecting text Do not click back into this box go directly to select tag step 3 otherwise selection is lost.<br> 3. Finally, select tag to wrap with from dropdown menu. <br><select onchange="jsExpressEdit.addWrapSelect(\''+bid+'\',\'addSelectElem_'+bid+'\');" id="addSelectElem_'+bid+'" class="altSelect">';
          html+='<option value="none">None</option>'+
          '<option value="p">P</option>'+
          '<option value="span">SPAN</option>'+
          '<option value="div">DIV</option>'+
          '<option value="figure">FIGURE</option>'+
          '<option value="figcaption">FIGCAPTION</option>'+
          '<option value="h1">H1</option>'+
          '<option value="h2">H2</option>'+
          '<option value="h3">H3</option>'+
          '<option value="h4">H4</option>'+
          '<option value="h5">H5</option>'+
          '<option value="h6">H6</option>'+
          '<option value="a">a</option>'+
          '<option value="ul">ul</option>'+
          '<option value="li">li</option>'+
          '<option value="ol">ol</option>'+
          '<option value="script">script</option>'+
          '<option value="fieldset">fieldset</option>'+
          '<option value="legend">legend</option>'+
          '<option value="blockquote">blockquote</option>'+
          '</select></p></div>';
          showObj.html(html);
          },
	addWrapSelect  :  function(bid,idtag){ 
		var tag=document.getElementById(idtag).value;
		var classN=document.getElementById('selectWrapperClass_'+bid).value; 
		var pattern=new RegExp('\r?\n|\r','g');
		if (window.getSelection) {
			var selectedText = window.getSelection();
			var text=selectedText.toString().replace(pattern,'<br>');
			if (text === "") {
				alert('selected text empty. Select text just before choosing tag type');
				this.reboot();
				}
			if (selectedText.rangeCount) {
				var range = selectedText.getRangeAt(0);
				range.deleteContents();
				newNode = document.createElement(tag);
				if(classN.length>1)
					newNode.className += classN;
				newNode.innerHTML = text;
				range.insertNode(newNode);
				}
			
			}
		else if (document.selection && document.selection.createRange) {
			range = document.selection.createRange();
			if (range.text === "") {
				alert('selected text empty. Select text just before choosing tag type');
				this.reboot();
				}
			var reptext = '<'+tag+'>' + range.text + '</'+tag+'>';
			range.text = reptext.replace(pattern,'<br>');
			}
		this.reboot();
		},
     sourceEditor : function(bid,showId){
          var text=jQuery(this.obje).html();
          var showObj=jQuery('#'+showId); 
          if (!showObj.hasClass('hide')){ 
               showObj.attr('class','hide');
               return;
               }
          showObj.removeAttr('class','hide');
          var html='<div class="altSourceTextAreaShow"><p class="clear"></p><p class="mt25 altEdButton" title="click to update source html changes" onclick="jsExpressEdit.sourceEditorChanges(\'sourceTextareaClick_'+this.bid+'\');">Update&nbsp;Source-Code&nbsp;Changes</p>Edit&nbsp;Source:<textarea id="sourceTextareaClick_'+this.bid+'" rows="15" onkeyup="jsExpressEdit.autoGrowFieldScroll(this);">'+text+'</textarea>';
          html+='<p class="altSubmit" title="click to update source html changes" onclick="jsExpressEdit.sourceEditorChanges(\'sourceTextareaClick_'+this.bid+'\');">Update&nbsp;Source-Code&nbsp;Changes</p><p class="clear"></p></div>'; 
          showObj.html(html);
          },
     sourceEditorChanges : function(id){
          var elem =jQuery(this.obje);
          var val=jQuery('#'+id).val();
          elem.html(val);
          this.reboot();
          },
     sortAll : function(track){ 
          var showObj=jQuery('#sortmovecopy_'+this.bid+'_'+track);
          if (!showObj.hasClass('hide')){ 
               showObj.attr('class','hide');
               return;
               }
          showObj.removeAttr('class','hide');
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var html='<p style="clear:both;"></p><div class="altClassStyle"><span  class="white floatleft left">Here we can choose an individual element then move or copy it as a sibling above or below it, or as child element or parent element. </span><p style="height:35px;clear:both;"></p>';
          html+='<div class="altImgTextAreaShow"><p>Specify element #number:<input id="sortAllElement_'+this.bid+'_'+track+'" type="text" size="5" value=""></p>';
          html+='<p><input name="sortAllradio_'+this.bid+'_'+track+'" type="radio" checked="checked" value="move">Move</p>';
          html+='<p><input name="sortAllradio_'+this.bid+'_'+track+'" type="radio" value="copy">Copy</p></div>';
          html+= '<p class="altEdText" title="Specify Operation On Selected Element">Choose How To Move/Copy Here:<select id="sortAllSelect_'+this.bid+'_'+track+'" class="altSelect">';
          html+= '<option value="none">Select Operation</option>'+
          '<option value="above">Append Above this Element</option>'+
          '<option value="below">Append Below this Element</option>'+
          '<option value="wrap">Wrap as Parent</option>'+
          '<option value="child">Add as last child</option>'+
          '<option value="firstchild">Add as first child</option>'+ 
		'</select></p>';
          
          html+='<p style="height:10px;clear:both;"></p>';
          html+='<p class="altSubmit" title="click to update element move changes" onclick="jsExpressEdit.updateSortAllChange(\''+track+'\');">Update Element Sort</p><p class="clear"></p></div>'; 
          showObj.html(html);
          },
     updateSortAllChange  :  function(track){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var sourcenum=jQuery('#sortAllElement_'+this.bid+'_'+track).val(); 
          var source=jQuery("["+this.attr+"="+sourcenum+"]",jQuery(this.obje));
          if (!jQuery.isNumeric(sourcenum)){
               alert('enter Number of element in organge you wish to move or copy');
               return;
               }
          var selection=jQuery('#sortAllSelect_'+this.bid+'_'+track).val();
          var radios=jQuery("[name=sortAllradio_"+this.bid+'_'+track+"]");
		for (var i = 0, length = radios.length; i < length; i++) {
			if (radios[i].checked) {
				var operation = radios[i].value;
				break;
				}
			}  
          if (selection === "above" ){
               if (operation === 'move') 
                         jQuery(source).detach().insertBefore(elem);
               else jQuery(source).clone().insertBefore(elem);
               }
          else if (selection === "below" ){
               if (operation === 'move') 
                         jQuery(source).detach().insertAfter(elem);
               else jQuery(source).clone().insertAfter(elem);
               }
          
          else if (selection === "child" ){
               if (operation === 'move') 
                    jQuery(source).detach().appendTo(elem);
               else jQuery(source).clone().appendTo(elem);
               }  
          else if (selection === "firstchild" ){
               if (operation === 'move') 
                         jQuery(source).detach().prependTo(elem);
               else jQuery(source).clone().prependTo(elem);
               }   
          else if (selection === "wrap" ){
               if (operation === 'move') 
                         jQuery(element).detach().wrap(source);
               else jQuery(source).clone().wrap(source);
               }     
          else {
               alert('Select an operation type from dropdown menu!');
               return;
               }
          this.reboot('sortall');
          },
          
     updateAlt : function(track){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var alt=jQuery(elem).attr('alt');
          var showObj=jQuery('#altImgTextAreaShow_'+this.bid+'_'+track); 
          if (!showObj.hasClass('hide')){ 
               showObj.attr('class','hide');
               return;
               }
          showObj.removeAttr('class','hide');
          var html='<div class="altImgTextAreaShow">Edit:&nbsp;Alt<textarea id="altImgTextareaClick_'+this.bid+'_'+track+'" onkeyup="jsExpressEdit.autoGrowFieldScroll(this);">'+alt+'</textarea>';
          html+='<p class="altSubmit" title="click to update alt tag changes" onclick="jsExpressEdit.updateAltChange(\''+track+'\',\'altImgTextareaClick_'+this.bid+'_'+track+'\');">Update&nbsp;Text&nbsp;Changes</p><p class="clear"></p></div>'; 
          showObj.html(html);
          },
     updateAltChange  : function(track,id){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var alt = elem.attr('alt');
          var val=jQuery('#'+id).val();
          elem.attr('alt',val);
          this.reboot();
          },
     addSibling : function(track){//used separately for iframes
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var src=jQuery(elem).attr('src'); 
          var showObj=jQuery('#addSiblingShow_'+this.bid+'_'+track); 
          if (!showObj.hasClass('hide')){ 
               showObj.attr('class','hide');
               return;
               }
          showObj.removeClass('hide');
          var html='<p >Choose to Add Next Sibling, Child, or Parent to this current Element:</p>';
          html+='<p ><input type="radio" name="addNodeType_'+this.bid+'_'+track+'" value="child">Add as Last Child Element</p>';
          html+='<p ><input type="radio" name="addNodeType_'+this.bid+'_'+track+'" value="previoussibling" checked="checked" >Add as Preivious Sibling</p>';
          html+='<p ><input type="radio" name="addNodeType_'+this.bid+'_'+track+'" value="nextsibling" checked="checked" >Add as Next Sibling</p>';
	   html+='<p ><input type="radio" name="addNodeType_'+this.bid+'_'+track+'" value="inner">Add Tag around Element Inner Content and keep Outer Tag</p>';
           html+='<p ><input type="radio" name="addNodeType_'+this.bid+'_'+track+'" value="replace">Replace Current Element with Selected Tag</p>';
          html+='<p ><input type="radio" name="addNodeType_'+this.bid+'_'+track+'" value="parent"  >Wrap as Parent</p>';
          html+='<p title="Add New Element">Choose Element type to Add:<select onchange="jsExpressEdit.addSiblingChange(\'addSiblingElem_'+this.bid+'_'+track+'\',\'addNodeType_'+this.bid+'_'+track+'\',\''+track+'\');" id="addSiblingElem_'+this.bid+'_'+track+'" class="altSelect">';
          html+='<option value="none">None</option>'+
          '<option value="p">P</option>'+
          '<option value="span">SPAN</option>'+
          '<option value="div">DIV</option>'+
          '<option value="figure">FIGURE</option>'+
          '<option value="figcaption">FIGCAPTION</option>'+
          '<option value="h1">H1</option>'+
          '<option value="h2">H2</option>'+
          '<option value="h3">H3</option>'+
          '<option value="h4">H4</option>'+
          '<option value="h5">H5</option>'+
          '<option value="h6">H6</option>'+
          '<option value="a">a</option>'+
          '<option value="ul">ul</option>'+
          '<option value="li">li</option>'+
          '<option value="ol">ol</option>'+
          '<option value="script">script</option>'+
          '<option value="fieldset">fieldset</option>'+
          '<option value="legend">legend</option>'+
          '<option value="blockquote">blockquote</option>'+
          '</select></p>';
	  html+='<p onclick="jsExpressEdit.addTargetChange(\'addNodeType_'+this.bid+'_'+track+'\',\''+track+'\');"  class="altSelect cursor underline">Or quick choice a Div Target Box for Creating New Content after/before this element</p>';
          html+='</div><!--alt show-->';
          showObj.html(html);
          },
     addTargetChange  :  function(nametype,track){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje)); 
          var radios=jQuery("[name="+nametype+"]"); 
		for (var i = 0, length = radios.length; i < length; i++) {
			if (radios[i].checked) {
				var type = radios[i].value;
				break;
				}
			} 
          
          var val='<div style="margin:20px;padding:30px; min-width:100px;min-height:100px;background-color:rgba(255,230,230,.4);"></div>';
          
          if (type==='previoussibling')
               jQuery(val).insertBefore(elem);
	  else
               jQuery(val).insertAfter(elem);
          this.reboot();
          },
     addSiblingChange  :  function(idele,nametype,track){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje)); 
          var radios=jQuery("[name="+nametype+"]"); 
		for (var i = 0, length = radios.length; i < length; i++) {
			if (radios[i].checked) {
				var type = radios[i].value;
				break;
				}
			} 
          var input=jQuery("#"+idele); 
          var val=input.val();
          var val='<'+val+'></'+val+'>';
          if (type==='nextsibling')
               jQuery(val).insertAfter(elem);
          else if (type==='previoussibling')
               jQuery(val).insertBefore(elem);
          else if (type==='sibling')
	       jQuery(val).appendTo(elem);
	  else if (type==='replace')
	       elem.replaceWith(function(){
                    return jQuery(val).append(jQuery(this).contents());
                    });
	  else if (type==='inner')
	       elem.wrapInner(val);
          else if (type==='parent')
			elem.wrap(val);
          this.reboot();
          },
     updateSrc : function(track){//used separately for iframes
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var src=jQuery(elem).attr('src'); 
          var showObj=jQuery('#altIframeTextAreaShow_'+this.bid+'_'+track); 
          if (!showObj.hasClass('hide')){ 
               showObj.attr('class','hide');
               return;
               }
          showObj.removeAttr('class','hide');
          var html='<div class="altIframeTextAreaShow warnlight">Edit:&nbsp;Src Here Otherwise tinymce will re-generate Old Src<textarea id="altIframeTextareaClick_'+this.bid+'_'+track+'" onkeyup="jsExpressEdit.autoGrowFieldScroll(this);">'+src+'</textarea>';
          html+='<p class="altSubmit" title="click to update alt tag changes" onclick="jsExpressEdit.updateSrcChange(\''+track+'\',\'altIframeTextareaClick_'+this.bid+'_'+track+'\');">Update&nbsp;Iframe&nbsp;Changes</p><p class="clear"></p></div>'; 
          showObj.html(html);
          },
     updateSrcChange : function(track,id){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var alt = elem.attr('src');
          var val=jQuery('#'+id).val();
          elem.attr('src',val);
          elem.parent().attr('data-mce-p-src',val);
          this.reboot();
          },
     editNode  : function(obj,nName){
          var classes=obj.getAttribute("class");
          var idn =  obj.id ? obj.id : '';
          var styles =obj.getAttribute("style");
          classes = ( !classes ) ? '' : classes; 
          styles = (!styles ) ? '' : styles;
          var styleT = ( nName == 'div' && jQuery(obj).attr('data-iframe-level') == 'style-class')? '<span class="redAlert">Iframe:Class:Style&nbsp;Here</span>' : 'Edit:Class:Style';
          var html='<span id="altShow_'+this.bid+'_'+this.track+'" class="altEdButton" title="Edit class and element style values" onclick="jsExpressEdit.show(\'altShow_'+this.bid+'_'+this.track+'\',\'Edit:Class:Style\',\'asis\',\'600\',\'\');">'+styleT+'</span>';//gen_Proc.adjustLeftMargin(\'altShow_'+this.bid+'_'+this.track+'t'+'\');
          html+='<div id="altShow_'+this.bid+'_'+this.track+'t" style="display:none;" class="altClassStyle">';
          html+='<p style="clear:both;"></p><span  class="altEdTagText">Edit&nbsp;ClassNames:<input id="jsClassClick_'+this.bid+'_'+this.track+'" type="text" value="'+classes+'" size="40"></span>';
          html+='<span class="altSubmit " onclick="jsExpressEdit.updateAttr(\'jsClassClick_'+this.bid+'_'+this.track+'\',\'class\',\''+this.attr+'\',\''+this.cn+'\',\''+this.track+'\');">Update&nbsp;Classes</span><p class="clear"></p>';
          html+='<p style="clear:both;"></p><span  class="altEdTagText">Edit&nbsp;Unique&nbsp;Id:<input id="jsIdClick_'+this.bid+'_'+this.track+'" type="text" value="'+idn+'" size="40"></span>';
          html+='<span class="altSubmit " onclick="jsExpressEdit.updateAttr(\'jsIdClick_'+this.bid+'_'+this.track+'\',\'id\',\''+this.attr+'\',\''+this.cn+'\',\''+this.track+'\');">Update&nbsp;Unique&nbsp;Id</span><p class="clear"></p>';
          html+='<span class="altEdTagText">Edit&nbsp;Styles:&nbsp;{&nbsp;<input id="jsStyleClick_'+this.bid+'_'+this.track+'" type="text" value="'+styles+'" size="40">&nbsp;}</span>';
          html+='<span class="altSubmit" onclick="jsExpressEdit.updateAttr(\'jsStyleClick_'+this.bid+'_'+this.track+'\',\'style\',\''+this.attr+'\',\''+this.cn+'\',\''+this.track+'\');">Update&nbsp;Styles</span><p class="clear"></p>';
          html+= '<p title="Add Additional Element Wrap to Pre-existing">Add Element Wrap:<select onchange="jsExpressEdit.updateAttr(\'jsSelectElem_'+this.bid+'_'+this.track+'\',\'addwrap\',\''+this.attr+'\',\''+this.cn+'\',\''+this.track+'\');" id="jsSelectElem_'+this.bid+'_'+this.track+'" class="altSelect">';
          html+='<option value="none">No Wrap</option>'+
          '<option value="p">P</option>'+
          '<option value="span">SPAN</option>'+
          '<option value="div">DIV</option>'+
          '<option value="figure">FIGURE</option>'+
          '<option value="figcaption">FIGCAPTION</option>'+
          '<option value="h1">H1</option>'+
          '<option value="h2">H2</option>'+
          '<option value="h3">H3</option>'+
          '<option value="h4">H4</option>'+
          '<option value="h5">H5</option>'+
          '<option value="h6">H6</option>'+
          '<option value="a">a</option>'+
          '<option value="ul">ul</option>'+
          '<option value="li">li</option>'+
          '<option value="ol">ol</option>'+
          '<option value="fieldset">fieldset</option>'+
          '<option value="legend">legend</option>'+
          '<option value="blockquote">blockquote</option>'+
          '</select></p>';  
          html+='</div><!--alt show-->';
          return html;
          },
	create_ajax : function (){
		if (window.XMLHttpRequest) {
		//  
			this.xhttp= new XMLHttpRequest();
			} 
		
		// Send an alert if the object wasn't created.
		if (!this.xhttp) {
			alert ('Some page functionality is unavailable.');
			}
	    
		},//end create_ajax
	use_ajax   : 	function (url,func,method){ 
		jsExpressEdit.create_ajax(); 
		if (this.xhttp) {
			this.Override=0
			this.xhttp.open(method, url+'&sess_override',true);
			this.xhttp.onreadystatechange = function(){
			jsExpressEdit[func]();}
			// Send the request:
			this.xhttp.send(null);
			return false;
			}
		else {
			return true;
			}
		}, //end use_ajax
	handle_replace	:   function () { console.log('return handler');
		if ( (this.xhttp.readyState == 4) && (this.xhttp.status == 200) ) {
			if (this.xhttp.responseText.length > 20) {
                    console.log('OK>20');
				console.log(this.xhttp.responseText)
				var jsonitems = JSON.parse(this.xhttp.responseText); 
				var key,size = 0;
				for (key in jsonitems){
					if (jsonitems.hasOwnProperty(key)) size++;
					}
				for (i=0; i<size; i++){  
					if (jsonitems[i]=='cssStyle'){
						var css = document.createElement("style");
						css.type = "text/css";
						if (css.styleSheet) css.styleSheet.cssText = jsonitems[i];
						else css.appendChild(document.createTextNode(jsonitems[i]));
						document.getElementsByTagName("head").appendChild(css);
						//console.log( jsonitems[2]);
						}
					else if (jsonitems[i]=='passfunct'){ 
						i++;
						if (jsonitems[i+1].indexOf('@x@')== -1){
							gen_Proc[jsonitems[i]](jsonitems[i+1]);
							i++;
							}
						else {
							var params=jsonitems[i+1].split('@x@'); 
							gen_Proc[jsonitems[i]].apply(this, params);
							i++;
							}
						}
					else if (jsonitems[i]=='passfunct2'){ 
						i++;
						window[jsonitems[i]](jsonitems[i+1]);  
						i++;   
						}
					else if (jsonitems[i]=='appendtop') {
						i++
						var mainobj=document.getElementById(jsonitems[i]);
						i++;  
						mainobj.innerHTML=jsonitems[i]+mainobj.innerHTML; 
						}
					else if (jsonitems[i]=='appendbottom') {
						i++;
						var mainobj=document.getElementById(jsonitems[i]);
						i++;  
						mainobj.innerHTML=mainobj.innerHTML+jsonitems[i]; 
						}
					else {  
						var mainobj=document.getElementById(jsonitems[i]);
						i++;  
						mainobj.innerHTML=jsonitems[i]; 
						}
					}//end for
				}//ajax repsonse.length
			else {
				if (gen_Proc['xml'+this.xmlCount].responseText==='no return'){
					console.log( 'No Return Values Found in Database');
					}
				else if (gen_Proc['xml'+this.xmlCount].responseText==='reBuffed'){
					console.log( 'reBuffed');
					}
				else if (gen_Proc['xml'+this.xmlCount].responseText==='updateImages'){
					console.log('Tiny Images directories and image resizing checked');
					}
				else if (gen_Proc['xml'+this.xmlCount].responseText.length>0){
					console.log(gen_Proc['xml'+this.xmlCount].responseText+' sent under 20');
					}
				else console.log( 'JasonReturn or mistake in handle replace');
                    
				}
			 
			}//ready state
		},//end handle_replace
	toggle_display    :  function(obje){
		if (typeof obje === "string"){ 
			var obje =  (obje == 'body') ? document.getElementsByTagName("body")[0] : document.getElementById(obje)
			}
		if(obje.style.display=="block") 
               obje.style.display='none';
          else obje.style.display='block';
		},//end showit
	autoGrowFieldScroll	:  function(f) {
		if (f.style.overflowY != 'scroll') f.style.overflowY = 'scroll';         
          var scrollH = f.scrollHeight;
		if(!f.style.height|| scrollH > f.style.height.replace(/[^0-9]/g,'') ){
			scrollit=scrollH+60;   
			f.style.height = scrollit+'px';  
			}
		},//end autogrowfieldscroll function
	show	:  function  (id,show,msgVar,width,mainconfig){//show  
		if(document.getElementById(id+ "t").style.display=="block"){
               if (msgVar === 'noclose')return;
			document.getElementById(id+"t").style.display ="none";
			document.getElementById(id).style.textDecoration = 'underline';
			document.getElementById(id).innerHTML=show;  
			document.getElementById(id).style.borderColor='initial'; 
			}
		else{
			document.getElementById(id+"t").style.display ="block";  
			if (msgVar !== 'noclose')document.getElementById(id).innerHTML='<span class="redAlertbackground white">Close </span>'+show;
			document.getElementById(id).style.borderColor='red';
			document.getElementById(id).style.textDecoration = 'underline'; 
			}
		}, //end show function
     getUploadSize :function(fn,fdir,id){ jsExpressEdit.use_ajax(jsExpressEdit.url+'?='+fn+'@@'+fdir+'&id='+id,'handle_replace','get'); 
          },
     changeCurrentSize : function(fn,storedir,fdir,id){
		if (!gen_Proc)return;
          var vid=document.getElementById(id);
          var value =vid.value;
          jsExpressEdit.use_ajax(edit_Proc.url+'?tiny_resize='+fn+'@@'+storedir+'@@'+fdir+'@@'+value+'&id='+id+'t','handle_replace','get'); 
          },
     editMultiTools  :  function(id){
          var html='<p style="clear:both;"></p><div style="background:#afafaf" class="altClassStyle"><!--Wrap Multi-->';
          
           html+='<p style="clear:both;"></p><div style="background:#999" class="fsmgreen" >';
          html+='<p class="tipdark p10  rad5">Choose multi elements from options below then choose whether to add/delete classes,  move, or wrap chosen elements with html tags, or delete them.</p>';
         html+='<p style="height:35px;clear:both;"></p>';
          html+='<div class="fsmdarkslategray"><h4 style="padding-bottom:10px;"> First Find Elements Using Method(s) below.</h4>';
          html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showjQuerySel_'+this.bid+'\',\'hide\');">Input jQuery Format Selector</p>';
          html+='<div id="showjQuerySel_'+this.bid+'" class="hide fsmdarkslategray">';
          html+='<p  class="altEdText">Use jQuery format selector (overrides tag/class method):<input id="jsClassActionSel_'+this.bid+'_'+this.track+'" type="text" value="" size="40"><br>ie. p:first, p:eq(3), p.myclassname:not(.skipthisclass,.notthisclass,#notthisid)</p>';
          html+='<p style="height:10px;clear:both;"></p>';
          html+='<div class="fsmdarkslategray"><!--wrap advanced-->';
          html+='<br><p>Or instead Use Advanced Method<br>Best for selecting multiple Groups of Multiple elements:</p>';
          html+='<p style="height:10px;clear:both;"></p>';
          html+='<p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showAdvancedjQuerySel_'+this.bid+'\',\'hide\');">Advanced Query Format Selector</p>';
          html+='</div><!--wrap advanced-->';
          html+='<div id="showAdvancedjQuerySel_'+this.bid+'" class="hide fsmwhite">';
          
          html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'advancedhide_'+this.bid+'\',\'hide\');">Advanced Info</p>';
          html+='<p id="advancedhide_'+this.bid+'" class="tipdark left hide">Advanced jQuery selector for finding elements uses three parts that enables a search for elements beginning with a different element but then choosing a relationship operation to find the final element being searched for.<br><br>For example there may be many p tags but we want the p tags that are the first sibling of div tags only.  For begin selector we enter div  then for operation select nextAll  then final find selector enter p:first or p:eq(0). <br><br><b>Advanced choices if all parts chosen will over-ride other search choices</b></p>';
          html+='<p style="height:20px;clear:both;"></p>';
          html+='<p  class="altEdText">Begin selector:<input id="jsClassActionAdvSel1_'+this.bid+'_'+this.track+'" type="text" value="" size="40"><br>ie.  p.myclassname:not(.skipthisclass,.notthisclass,#notthisid)</span>';
          
          html+='<p style="height:10px;clear:both;"></p>';
          html+= '<p class="altEdText">Select Operation:<select id="jsClassActionAdvSel2_'+this.bid+'_'+this.track+'" class="altSelect">';
          html+='<optgroup style="font-size:11px;">';
          html+= '<option value="none"> Select Relational Search</option>'+
          '<option value="nextAll">(nextAll) Search Next Siblings of begin selector</option>'+
          '<option value="prevAll">(prevAll) Search Previous Siblings of begin selector</option>'+
          '<option value="nextUntil">(nextUntil) Search for Next Sibling Elements Between Intial and final Elements choices</option>'+
          '<option value="prevUntil">(prevUntil) Search for Previous Sibling Elements Between Intial and final Elements choices</option>'+
          '<option value="parents">(parents) Search for Closest Ancestor of begin selector for Match</option>'+
          '<option value="find">(find) Search All Descendants of begin selector</option>'+
          '<option value="children">(children) Search Children Elements of begin selector</option>'+
		'</optgroup></select></p>';
          html+='<p style="height:10px;clear:both;"></p>';
          html+='<p  class="altEdText">Final elements to Find:<input id="jsClassActionAdvSel3_'+this.bid+'_'+this.track+'" type="text" value="" size="40"><br>ie.  p.myclassname:not(.skipthisclass,.notthisclass,#notthisid)</span>';
          html+='<p style="height:10px;clear:both;"></p></div><!--Close jQuery Selector Methods-->';
          
          html+='<p style="height:10px;clear:both;"></p></div><!--Close jQuery Selector Methods-->';
          html+='<br><br><b>Or Find Using Tag/Class method:</b><br><br>';
          html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showjQueryFindEleClass_'+this.bid+'\',\'hide\');">Use Tag/Classname Selector</p>';
          html+='<div id="showjQueryFindEleClass_'+this.bid+'" class="hide fsmdarkslategray">';
           html+= '<p class="altEdText" title="Specify element  to Find">Find Element:<select id="jsClassActionFE_'+this.bid+'_'+this.track+'" class="altSelect">'+
          '<option value="none">Find Tags</option>'+ 
          '<option value="children">Direct Children</option>'+ 
          '<option value="p">P</option>'+
          '<option value="span">SPAN</option>'+
          '<option value="div">DIV</option>'+
          '<option value="figure">FIGURE</option>'+
          '<option value="figcaption">FIGCAPTION</option>'+
          '<option value="h1">H1</option>'+
          '<option value="h2">H2</option>'+
          '<option value="h3">H3</option>'+
          '<option value="h4">H4</option>'+
          '<option value="h5">H5</option>'+
          '<option value="h6">H6</option>'+
          '<option value="a">a</option>'+
          '<option value="ul">ul</option>'+
          '<option value="li">li</option>'+
          '<option value="ol">ol</option>'+
          '<option value="form">form</option>'+
          '<option value="input">input</option>'+
          '<option value="textarea">textarea</option>'+
          '<option value="script">script</option>'+
          '<option value="fieldset">fieldset</option>'+
          '<option value="legend">legend</option>'+
          '<option value="blockquote">blockquote</option>'+
          '</select></p>'; 
          html+='<p style="height:10px;clear:both;"></p><p  class="left altEdText">Find class name(s):<input id="jsClassActionFCN_'+this.bid+'_'+this.track+'" type="text" value="" size="40"> <br><span class="left smallest"> Use commas between class names to designate finding any one or more of the class list  and spaces or periods to designate finding each of the designated classes. However,  <b>using spaces and periods</b>  ie ".class1 .class2"  will designate  finding an element with class name class2 within an element having a classname class1.  examples: ie JQuery comma separated style for finding any one class: ".class1, .class2, .class3" <br>Or find all the classes in an element:<br> ".class1.class2"  or for convienance: "class1 class2"</span> </p>';
          html+='<p style="height:10px;clear:both;"></p><span  style="color:orange;" class="altEdText">Exclude class name(s):<input id="jsClassActionRmCN_'+this.bid+'_'+this.track+'" type="text" value="" size="40"></p><p style="clear:both;"></p>use an input format as above</div><!--first find-->';
         //###########################
	    
          html+='<br><br><b>Or Find Using Numbered Element method:</b><br><br>';
	    html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showNumberSel_'+this.bid+'\',\'hide\');">Use Alternative Number Selector</p>';
          html+='<div id="showNumberSel_'+this.bid+'" class="hide fsmdarkslategray">';
          html+='<p  class="altEdText">Alternatively use Numbers to find element. Numbers are located left of each element:<input id="jsNumberActionSel_'+this.bid+'_'+this.track+'" type="text" value="" size="40"><br>ie. 1,4,7,10-15 (may include range)</p><p style="height:10px;clear:both;"></div>';
          html+='<p style="height:10px;clear:both;"></p></div><!--Close EleClass Methods-->';
		//###############  Choose Operation
		
           html+='<p class="tip2">Now Choose whether to  add/del classes, move, or wrap chosen elements, or delete them</p>';
          html+='<p style="height:10px;clear:both;"></p>';
          html+='<p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showMultiadddel_'+this.bid+'\',\'hide\');">Add or Delete Class Names To found </p><div id="showMultiadddel_'+this.bid+'" class="hide fsmdarkslategray"><h3>Add or Delete Classes To Found </h3>';
          html+='<p style="height:10px;clear:both;"></p><p class="altEdText">Add classnames to found: <input id="jsClassActionACN_'+this.bid+'_'+this.track+'" type="text" value="" size="40"><br><span class="smallest  center">Use Only Space Separated Class Names for add/delete</span></p>';
          
          html+='<p class="altEdText">Delete classnames from found:<input id="jsClassActionDCN_'+this.bid+'_'+this.track+'" type="text" value="" size="40"></p>';
          
          html+='<p style="height:10px;clear:both;"></p><p class="altSubmit  leftfloat left" onclick="jsExpressEdit.editMultiToolsChange(\'jsClassActionSel_'+this.bid+'_'+this.track+'\',\'jsClassActionFE_'+this.bid+'_'+this.track+'\',\'jsClassActionFCN_'+this.bid+'_'+this.track+'\',\'jsClassActionRmCN_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel1_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel2_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel3_'+this.bid+'_'+this.track+'\',\'jsClassActionACN_'+this.bid+'_'+this.track+'\',\'jsClassActionDCN_'+this.bid+'_'+this.track+'\');">Update&nbsp;Classes</p><p style="clear:both;"></p>';
          html+='</div><!--add/delete classes-->';
          
          //####################Begin Phase2
         html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showMultimove_'+this.bid+'\',\'hide\');">Multi Move Elements </p><div id="showMultimove_'+this.bid+'" class="hide fsmdarkslategray">';
         html+='<h3>Multi Move Elements </h3>';
         html+='<p style="height:10px;clear:both;"></p><p style="height:35px;clear:both;"></p>';
          html+='<p class="tipdark p10 rad5">Choose to find element to move above in the find element section. Now, choose the  Destination Target type Element to Move To here and also Choose the Move Type Operation on found Elements</p>';
          
          //##################Begin select destination
          html+='<div class="fsmdarkslategray"><h4>Specify Type of Destination Target Element<br><span class="small">Needs to be a Sibling type or Parent</span></h4>';
          html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showAdvancedjQuerySel2_'+this.bid+'\',\'hide\');">Advanced Query Format Selector for Destination Target Elements</p>';
          html+='<div id="showAdvancedjQuerySel2_'+this.bid+'" class="hide fsmdarkslategray">';
          html+='<p  class="altEdText pt10">Use jQuery format selector:<input id="jsClassActionSel2_'+this.bid+'_'+this.track+'" type="text" value="" size="40"><br>ie.  p.myclassname:not(.skipthisclass,.notthisclass,#notthisid)</span><br><br><br>';
          html+='<p style="height:10px;clear:both;"></p></div><!--Close jQuery Selector2 Methods-->';
           html+='<br><br><b>Or Find Destination Target Using:</b><br><br>';
          html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showjQueryFindEleClass2_'+this.bid+'\',\'hide\');">Use Tag/Classname Selector</p>';
          html+='<div id="showjQueryFindEleClass2_'+this.bid+'" class="hide fsmdarkslategray">';
           html+= '<p class="altEdText" title="Specify element to Find">Find Element:<select id="jsClassActionFE2_'+this.bid+'_'+this.track+'" class="altSelect">'+
          '<option value="none">Find Tags</option>'+ 
          '<option value="p">P</option>'+
          '<option value="span">SPAN</option>'+
          '<option value="div">DIV</option>'+
          '<option value="figure">FIGURE</option>'+
          '<option value="figcaption">FIGCAPTION</option>'+
          '<option value="h1">H1</option>'+
          '<option value="h2">H2</option>'+
          '<option value="h3">H3</option>'+
          '<option value="h4">H4</option>'+
          '<option value="h5">H5</option>'+
          '<option value="h6">H6</option>'+
          '<option value="a">a</option>'+
          '<option value="ul">ul</option>'+
          '<option value="li">li</option>'+
          '<option value="ol">ol</option>'+
          '<option value="form">form</option>'+
          '<option value="input">input</option>'+
          '<option value="textarea">textarea</option>'+
          '<option value="script">script</option>'+
          '<option value="fieldset">fieldset</option>'+
          '<option value="legend">legend</option>'+
          '<option value="blockquote">blockquote</option>'+
          '</select></p>'; 
          html+='<p style="height:10px;clear:both;"></p><span  class="left altEdText">Find destination class name(s):<input id="jsClassActionFCN2_'+this.bid+'_'+this.track+'" type="text" value="" size="40"> <br><span class="left smallest"> Use commas between class names to designate finding any one or more of the class list  and spaces or periods to designate finding each of the designated classes. However,  <b>using spaces and periods</b>  ie ".class1 .class2"  will designate  finding an element with class name class2 within an element having a classname class1.  examples: ie JQuery comma separated style for finding any one class: ".class1, .class2, .class3" <br>Or find all the classes in an element:<br> ".class1.class2"  or for convienance: "class1 class2" </span></span>';
          html+='<p style="height:10px;clear:both;"></p><span  style="color:orange;" class="altEdText">Exclude destination class name(s):<input id="jsClassActionRmCN2_'+this.bid+'_'+this.track+'" type="text" value="" size="40"></span><p style="clear:both;"></p>use an input format as above</div><!--first find-->';
          //##################
		
		
		
		
		
          html+='<p style="height:10px;clear:both;"></p></div><!--Close elementclass selector target Methods-->';
          //###############End Select Destination Element
          html+='<p style="height:10px;clear:both;"></p><div class="fsmdarkslategray">';
          html+= '<p class="altEdText">Now Select Operation (ie operation on the moved element itself. The destination target will also match the element type chosen in previous selection):<select id="jsClassActionOP_'+this.bid+'_'+this.track+'" class="altSelect">';
          html+= '<option value="none"> Select Target Operation</option>'+
          '<option value="abovenext">Append Element Above Next Sibling Target</option>'+
          '<option value="belownext">Append Below Next Sibling Target</option>'+
          '<option value="lastnext">Append as Last child of Next Sibling Target</option>'+
          '<option value="firstnext">Append as First child of Next Sibling Target</option>'+
          '<option value="aboveprev">Append Above Previous Sibling Target</option>'+
          '<option value="belowprev">Append Below Previous Sibling Target</option>'+
          '<option value="lastprev">Append as Last Child of Previous Sibling Target</option>'+
          '<option value="firstprev">Append as First Child of Previous Sibling Target</option>'+
          '<option value="aboveparent">Append Above its Parent (no target choice necessary)</option>'+
          '<option value="belowparent">Append Element Below its Parent (no target choice necessary)</option>'+
		'</select></p><p style="height:10px;clear:both;"></p></div>';
		//############End of type move operation
		html+='<p style="height:10px;clear:both;"></p><p class="altSubmit  leftfloat left" onclick="jsExpressEdit.editMultiToolsChange2( \'jsClassActionSel_'+this.bid+'_'+this.track+'\',\'jsClassActionFE_'+this.bid+'_'+this.track+'\',\'jsClassActionFCN_'+this.bid+'_'+this.track+'\',\'jsClassActionRmCN_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel1_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel2_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel3_'+this.bid+'_'+this.track+'\',\'jsClassActionOP_'+this.bid+'_'+this.track+'\',\'jsClassActionSel2_'+this.bid+'_'+this.track+'\',\'jsClassActionFE2_'+this.bid+'_'+this.track+'\',\'jsClassActionFCN2_'+this.bid+'_'+this.track+'\',\'jsClassActionRmCN2_'+this.bid+'_'+this.track+'\');">Update&nbsp;Multi&amp;Moves</p><p style="clear:both;"></p></div><!--multimove-->';
          //##########
          html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showMultiwrap_'+this.bid+'\',\'hide\');">Wrap Tags</p><div id="showMultiwrap_'+this.bid+'" class="hide fsmdarkslategray">';
          html+='<h3>Wrap Tags To found Class Names</h3>';          
           html+= '<p class="altEdText" >Wrap Op:<select id="jsClassActionWRAP_'+this.bid+'_'+this.track+'" class="altSelect">'+
          '<option value="none">No Action</option>'+ 
          '<option value="all">(Wrap) Wrap Tag(s) around selected Element(s)</option>'+
          '<option value="wrapAll">(WrapAll) Wrap Tag around Element(s)</option>'+
          '<option value="inner">Add Tag around Element Inner Content and keep Outer Tag</option>'+
          '<option value="replace">Replace Found Element Outer Tag with Selected Tag</option>'+
          '</select></p>';
          html+='<p style="height:10px;clear:both;"></p>';
          html+= '<p class="altEdText" title="Specify element  to Add Wrap">Wrap Tag:<select id="jsClassActionTAG_'+this.bid+'_'+this.track+'" class="altSelect">'+
          '<option value="none">none</option>'+ 
          '<option value="p">P</option>'+
          '<option value="span">SPAN</option>'+
          '<option value="div">DIV</option>'+
          '<option value="figure">FIGURE</option>'+
          '<option value="figcaption">FIGCAPTION</option>'+
          '<option value="h1">H1</option>'+
          '<option value="h2">H2</option>'+
          '<option value="h3">H3</option>'+
          '<option value="h4">H4</option>'+
          '<option value="h5">H5</option>'+
          '<option value="h6">H6</option>'+
          '<option value="a">a</option>'+
          '<option value="ul">ul</option>'+
          '<option value="li">li</option>'+
          '<option value="ol">ol</option>'+
          '<option value="fieldset">fieldset</option>'+
          '<option value="legend">legend</option>'+
          '<option value="blockquote">blockquote</option>'+
          '</select></p>'; 
           html+='<p style="height:10px;clear:both;"></p><p class="altSubmit  leftfloat left" onclick="jsExpressEdit.editMultiToolsChange4( \'jsClassActionSel_'+this.bid+'_'+this.track+'\',\'jsClassActionFE_'+this.bid+'_'+this.track+'\',\'jsClassActionFCN_'+this.bid+'_'+this.track+'\',\'jsClassActionRmCN_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel1_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel2_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel3_'+this.bid+'_'+this.track+'\',\'jsClassActionTAG_'+this.bid+'_'+this.track+'\',\'jsClassActionWRAP_'+this.bid+'_'+this.track+'\');">Update&nbsp;Multi&amp;TAG Wrap</p><p style="clear:both;"></p></div><!--wrap tags-->';
          //#############
          html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showMultidelete_'+this.bid+'\',\'hide\');">Delete Element Operations </p><div id="showMultidelete_'+this.bid+'" class="hide fsmdarkslategray">';
          html+='<h3>Choose Delete Operation on Found elements</h3>';          
           html+= '<p class="altEdText">Delete Op:<select id="jsClassActionDELOP_'+this.bid+'_'+this.track+'" class="altSelect">'+
          '<option value="none">No Action</option>'+ 
          '<option value="all">Remove Entire Elements (Tags and Content)</option>'+
          '<option value="strip">Strip Element Tags Leave Content</option>'+
          '<option value="rmInner">Keep Outer Tag Remove Inner Contents (Empty)</option>'+
          '</select></p>';
           html+='<p style="height:10px;clear:both;"></p><p class="altSubmit  leftfloat left" onclick="jsExpressEdit.editMultiToolsChange3( \'jsClassActionSel_'+this.bid+'_'+this.track+'\',\'jsClassActionFE_'+this.bid+'_'+this.track+'\',\'jsClassActionFCN_'+this.bid+'_'+this.track+'\',\'jsClassActionRmCN_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel1_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel2_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel3_'+this.bid+'_'+this.track+'\',\'jsClassActionDELOP_'+this.bid+'_'+this.track+'\');">Update&nbsp;Search/Replace Element</p><p style="clear:both;"></p></div><!--add/delete classes-->';
          //###########
		
          html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showMultiAddTag_'+this.bid+'\',\'hide\');">Create Tags</p><div id="showMultiAddTag_'+this.bid+'" class="hide fsmdarkslategray">';
          html+='<h3>Add Tag To found Elements</h3>';
           html+= '<p class="altEdText" >Add Tag As:<select id="jsClassActionAddTagOP_'+this.bid+'_'+this.track+'" class="altSelect">'+
          '<option value="none">No Action</option>'+ 
          '<option value="sibling">Add As Next Sibling Tag </option>'+
          '<option value="first">Add as First Child Tag </option>'+
          '<option value="last">Add Last Child Tag</option>'+
          '</select></p>';
          html+='<p style="height:10px;clear:both;"></p>';
          html+= '<p class="altEdText" title="Specify element type tag to add">Tag Type To Create:<select id="jsClassActionAddTypeTAG_'+this.bid+'_'+this.track+'" class="altSelect">'+
          '<option value="none">none</option>'+ 
          '<option value="p">P</option>'+
          '<option value="span">SPAN</option>'+
          '<option value="div">DIV</option>'+
          '<option value="figure">FIGURE</option>'+
          '<option value="figcaption">FIGCAPTION</option>'+
          '<option value="h1">H1</option>'+
          '<option value="h2">H2</option>'+
          '<option value="h3">H3</option>'+
          '<option value="h4">H4</option>'+
          '<option value="h5">H5</option>'+
          '<option value="h6">H6</option>'+
          '<option value="a">a</option>'+
          '<option value="ul">ul</option>'+
          '<option value="li">li</option>'+
          '<option value="ol">ol</option>'+
          '<option value="script">script</option>'+
          '<option value="fieldset">fieldset</option>'+
          '<option value="legend">legend</option>'+
          '<option value="blockquote">blockquote</option>'+
          '</select></p>'; 
           html+='<p style="height:10px;clear:both;"></p><p class="altSubmit  leftfloat left" onclick="jsExpressEdit.editMultiToolsChange5( \'jsClassActionSel_'+this.bid+'_'+this.track+'\',\'jsClassActionFE_'+this.bid+'_'+this.track+'\',\'jsClassActionFCN_'+this.bid+'_'+this.track+'\',\'jsClassActionRmCN_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel1_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel2_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel3_'+this.bid+'_'+this.track+'\',\'jsClassActionAddTagOP_'+this.bid+'_'+this.track+'\',\'jsClassActionAddTypeTAG_'+this.bid+'_'+this.track+'\');">Update&nbsp;Multi Create TAGs</p><p style="clear:both;"></p></div><!--wrap tags-->';
          //##########
		html+='<p style="height:10px;clear:both;"></p>';
		html+='<p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showSearchReplaceEle_'+this.bid+'\',\'hide\');">Search/Replace Found</p><div id="showSearchReplaceEle_'+this.bid+'" class="hide fsmdarkslategray">';
          html+='<p class="tipdark p10  rad5">Search/Replace Using Found Elements</p>';
          html+='<p  class="altEdText">Search and Replace using found Element types above. Will replace multiple occurances.<br>Search Term, Regex ok:<input id="jsClassActionSearchOP_'+this.bid+'_'+this.track+'" type="text" value="" size="30"></p>';
          html+='<p  class="altEdText"><br>Replace Term:<input id="jsClassActionReplaceOp_'+this.bid+'_'+this.track+'" type="text" value="" size="30"></p>';
		
		html+='<p style="height:10px;clear:both;"></p><p class="altSubmit  leftfloat left" onclick="jsExpressEdit.editMultiToolsChange6( \'jsClassActionSel_'+this.bid+'_'+this.track+'\',\'jsClassActionFE_'+this.bid+'_'+this.track+'\',\'jsClassActionFCN_'+this.bid+'_'+this.track+'\',\'jsClassActionRmCN_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel1_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel2_'+this.bid+'_'+this.track+'\',\'jsClassActionAdvSel3_'+this.bid+'_'+this.track+'\',\'jsClassActionSearchOP_'+this.bid+'_'+this.track+'\',\'jsClassActionReplaceOp_'+this.bid+'_'+this.track+'\');">Update&nbsp;Search/Replace</p><p style="clear:both;"></p></div><!--wrap tags-->';
          html+='</div><!--End showSearchReplace-->';
		//###############################
		
		html+='<p style="height:10px;clear:both;"></p>';
		html+='<div style="background:#999" class="fsmgreen" >';
          html+='<p class="tipdark p10  rad5">This group of Auto choices are carried out immediately on all the named element types</p>'; 
          html+='<p style="height:10px;clear:both;"></p><p title="Auto Create New Figure Caption Text for all Images in this post. Will preserve pre-existing"  class="altSubmit"  onclick="jsExpressEdit.createAllFigure();">Auto add Figure/Caption to all IMG (images)</p>';
          html+='<p style="height:10px;clear:both;"></p><p title="Auto Delete Figure Preserve Caption for all Images in this post." class="altSubmit" onclick="jsExpressEdit.removeAllFiguresSaveCaptions();">Auto remove all Figure while Preserving Captions</p>';
         html+='<p style="height:10px;clear:both;"></p><p title="Auto Delete Figure Caption Text for all Images in this post."  class="altSubmit" onclick="jsExpressEdit.removeAllFigures();">Auto remove all Figure/Captions</p><p style="clear:both;"></p>';
         html+='<p style="height:10px;clear:both;"></p><p   class="altSubmit" onclick="jsExpressEdit.autoiframeinit(\'add\');">Auto Add Iframe RWD Response</p><p style="clear:both;"></p>';
         html+='<p style="height:10px;clear:both;"></p><p   class="altSubmit" onclick="jsExpressEdit.autoiframeinit(\'remove\');">Auto Remove All Iframe RWD Response</p><p style="clear:both;"></p>';
         html+='<p style="height:10px;clear:both;"></p><p   class="altSubmit" onclick="jsExpressEdit.removeEmptyP();">Auto Delete Empty P Tags (&lt;p&gt;&lt;/p&gt; | &lt;p&gt; &lt;/p&gt; | or &lt;p&gt;&lt;br&gt;&lt;/p&gt;) </p><p style="clear:both;"></p>';
	    html+='<p style="height:10px;clear:both;"></p><p   class="altSubmit" onclick="jsExpressEdit.autodivwrap(\'wrapdiv\');">Auto Div Wrap Around Entire Text</p><p style="clear:both;"></p>';
	    
          html+='</div><!--auto multi-->';
		//###################
		html+='<p style="height:10px;clear:both;"></p>';
		html+='<div style="background:#999" class="fsmgreen" ><!--begin Search/replace-->';
          html+='<p class="tipdark p10  rad5">Search/Replace Entire Post All Elements</p>';
          html+='<p style="height:10px;clear:both;"></p><p class="altUpdate leftfloat left" onclick="jsExpressEdit.toggle_display(\'showSearchReplace_'+this.bid+'\',\'hide\');">Search Replace</p>';
          html+='<div id="showSearchReplace_'+this.bid+'" class="hide fsmdarkslategray">';
          html+='<p  class="altEdText">Search and Replace all innerHTML within this Text post. Will replace multiple occurances.<br>Search Term, Regex ok:<input id="searchTerm_'+this.bid+'_'+this.track+'" type="text" value="" size="30"></p>';
          html+='<p  class="altEdText"><br>Replace Term:<input id="replaceTerm_'+this.bid+'_'+this.track+'" type="text" value="" size="30"></p>';
          html+='<p style="height:10px;clear:both;"></p><p   class="altSubmit" onclick="jsExpressEdit.searchReplace(\'searchTerm_'+this.bid+'_'+this.track+'\',\'replaceTerm_'+this.bid+'_'+this.track+'\');">Submit Search/Replace</p><p style="clear:both;"></p>';
          html+='</div><!--End showSearchReplace-->';
          html+='<p style="height:10px;clear:both;"></p>';
          html+='</div><!--end Search/replace-->';
          html+='<p style="height:20px;clear:both;"></p></div><!--Wrap Multi-->';
          jQuery('#'+id).html(html);
          },
     getSelector  : function(idsel,ide,idcn,idrm){ 
          var sel =  jQuery('#jsNumberActionSel_'+this.bid+'_'+this.track).val();
		if (sel.length){ //numbers active
			sel=sel.replace(/ /g,'');
			var arr=sel.split(',');
			var elems = [];
			for (i in arr){ 
				if (arr[i].length){  
					if (!isNaN(arr[i]) || sel.indexOf('-') > 0 ) {  
						if (sel.indexOf('-') > 0 ){ 
							var narr=sel.split('-');
							if (narr.length === 2 && !isNaN(narr[0]) && !isNaN(narr[1])){
								var num= parseInt(narr[1])+1; 
								for (x=narr[0]; x < num; x++){ 
									var elem =jQuery("["+this.attr+"="+x+"]",jQuery(this.obje));console.log(elem);
									if (elem.length){ 
										elems.push(elem);
										}
									}
								}
							}
						else {
							var elem =jQuery("["+this.attr+"="+arr[i]+"]",jQuery(this.obje));
							if (elem.length){
								elems.push(elem);
								}
							}
					  
						}	
					}
				}
			if (elems.length){  
				var x={
					 status : 'advanced',
					 el  : elems
					 }
				 return x;
				}
			else {
				alert('Number select elements did not return valid elements using: ' + sel);
				return false;
				}
			}
		var selector='';
          var elems =[];
          if (arguments[5]){
               var ad1=arguments[4];
               var ad2=arguments[5];
               var ad3=arguments[6];
               var adv1=jQuery('#'+ad1).val().replace(/'|"/g,'');
               var adv2=jQuery('#'+ad2).val(); 
               var adv3=jQuery('#'+ad3).val().replace(/'|"/g,'');
               if (adv1.length&&adv2 !=='none'&&adv3.length){
                    if (adv2=='prevAll'){
                    jQuery(this.obje).find(adv1).each(function(i){
                              elems[i]=jQuery(this).prevAll(adv3);
                              });
                         var empty = true;
                         for (i in elems){//check for valid element find else return message of not found
                              if (jQuery(elems[i]).length){
                                   empty=false;
                                   break;
                                   }
                              } 
                         if (empty){
                              alert('Advanced jQuery did not return valid elements using: jQuery('+adv1+').prevAll('+adv3+')');
                               var x={
                                   status : false
                                   }
                              }
                         
                         else  {
                              var x={
                                   status : 'advanced',
                                   el  : elems
                                   }
                              }
                         return x;
                         }
                    else if (adv2=='nextAll'){
                         jQuery(this.obje).find(adv1).each(function(i){
                              elems[i]=jQuery(this).nextAll(adv3);
                              });
                         var empty = true;
                         for (i in elems){//check for valid element find else return message of not found
                              if (jQuery(elems[i]).length){
                                   empty=false;
                                   break;
                                   }
                              } 
                         if (empty){
                              alert('Advanced jQuery did not return valid elements using: jQuery('+adv1+').nextAll('+adv3+')');
                               var x={
                                   status : false
                                   }
                              }
                         
                         else  {
                              var x={
                                   status : 'advanced',
                                   el  : elems
                                   }
                              }
                         return x;
                         }
                    else if (adv2=='prevUntil'){
                         jQuery(this.obje).find(adv1).each(function(i){
                              elems[i]=jQuery(this).prevUntil(adv3);
                              });
                         var empty = true;
                         for (i in elems){//check for valid element find else return message of not found
                              if (jQuery(elems[i]).length){
                                   empty=false;
                                   break;
                                   }
                              } 
                         if (empty){
                              alert('Advanced jQuery did not return valid elements using: jQuery('+adv1+').prevUntil('+adv3+')');
                               var x={
                                   status : false
                                   }
                              }
                         
                         else  {
                              var x={
                                   status : 'advanced',
                                   el  : elems
                                   }
                              }
                         return x;
                         }
                    else if (adv2=='nextUntil'){
                         jQuery(this.obje).find(adv1).each(function(i){
                              elems[i]=jQuery(this).nextUntil(adv3);
                              });
                         var empty = true;
                         for (i in elems){//check for valid element find else return message of not found
                              if (jQuery(elems[i]).length){
                                   empty=false;
                                   break;
                                   }
                              } 
                         if (empty){
                              alert('Advanced jQuery did not return valid elements using: jQuery('+adv1+').nextUntil('+adv3+')');
                               var x={
                                   status : false
                                   }
                              }
                         
                         else  {
                              var x={
                                   status : 'advanced',
                                   el  : elems
                                   }
                              }
                         return x;
                         }
                    else if (adv2=='parents'){
                         jQuery(this.obje).find(adv1).each(function(i){
                              elems[i]=jQuery(this).closest(adv3);
                              });
                         var empty = true;
                         for (i in elems){//check for valid element find else return message of not found
                              if (jQuery(elems[i]).length){
                                   empty=false;
                                   break;
                                   }
                              } 
                         if (empty){
                              alert('Advanced jQuery did not return valid elements using: jQuery('+adv1+').closest('+adv3+')');
                               var x={
                                   status : false
                                   }
                              }
                         
                         else  {
                              var x={
                                   status : 'advanced',
                                   el  : elems
                                   }
                              }
                         return x;
                         }
                    else if (adv2=='find'){
                         jQuery(this.obje).find(adv1).each(function(i){
                              elems[i]=jQuery(this).find(adv3);
                              });
                         var empty = true;
                         for (i in elems){//check for valid element find else return message of not found
                              if (jQuery(elems[i]).length){
                                   empty=false;
                                   break;
                                   }
                              } 
                         if (empty){
                              alert('Advanced jQuery did not return valid elements using: jQuery('+adv1+').find('+adv3+')');
                               var x={
                                   status : false
                                   }
                              }
                         
                         else  {
                              var x={
                                   status : 'advanced',
                                   el  : elems
                                   }
                              }
                         return x;
                         }
                    else if (adv2=='children'){
                         jQuery(this.obje).find(adv1).each(function(i){
                              elems[i]=jQuery(this).children(adv3);
                              });
                         var empty = true;
                         for (i in elems){//check for valid element find else return message of not found
                              if (jQuery(elems[i]).length){
                                   empty=false;
                                   break;
                                   }
                              } 
                         if (empty){
                              alert('Advanced jQuery did not return valid elements using: jQuery('+adv1+').children('+adv3+')');
                               var x={
                                   status : false
                                   }
                              }
                         
                         else  {
                              var x={
                                   status : 'advanced',
                                   el  : elems
                                   }
                              }
                         return x;
                         }
                    }//if advanced query
               }     
          var sel =  jQuery('#'+idsel).val();
          if (sel.length){
               selector=sel;
               }
          else {
               if (jQuery('#'+ide).val()!=='none'&&jQuery('#'+ide).val()!=='children')selector=jQuery('#'+ide).val(); 
               var cn = document.getElementById(idcn).value;
               cn=cn.replace(/'|"/g,'');
               if (cn.replace(/ /g,'').length){
                    if (cn.indexOf(',')<0){//find if has all classes
                         if (cn.indexOf('.')<0&&cn.indexOf(' ')>-1){//has all spaces no period or comma
                              var arr=cn.split(' ');
                              var add = '';
                              for (i in arr){
                                   if (arr[i].length){
                                        add+='.'+arr[i];
                                        }
                                   }
                              selector+=add;
                              }
                         else {//use as is
                              selector+=cn;
                              }
                         }
                    else{ //has commas meaning find any one of class names
                         cn=cn.replace(/ /g,'');
                         var arr=cn.split(',');
                         var add = '';
                         for (i in arr){
                              if (arr[i].length){
                                   if (arr[i].indexOf('.')!=0){//add period
                                        add+=',.'+arr[i];
                                        }
                                   else add+=','+arr[i];//back as was
                                   }
                              }
                         selector+=add;
                         }//has commas
                         
                    }// input in field
               if (arguments[4]!=='selector'&&!jQuery(this.obje).find(selector).length){
                    alert('No elements found with selector \''+selector+'\'');
                    return false;
                    }
               }//get dropdown find selector
          var add='';
          if (document.getElementById(idrm).value.replace(/ /g,'').length){
               var cn = document.getElementById(idrm).value;
               var addnot = '';
               cn=cn.replace(/'|"/g,'');
               if (cn.replace(/ /g,'').length){
                    if (cn.indexOf(',')<0){//find if has all classes
                         if (cn.indexOf('.')<0&&cn.indexOf(' ')>-1){//has all spaces no period or comma
                              var arr=cn.split(' ');
                              for (i in arr){
                                   if (arr[i].length){
                                        addnot+='.'+arr[i];
                                        }
                                   } 
                              }
                         else {//use as is
                              addnot=cn;
                              }
                         }
                    else{ //has commas meaning find any one of class names
                         cn=cn.replace(/ /g,'');
                         var arr=cn.split(',');
                         for (i in arr){
                              if (arr[i].length){
                                   if (arr[i].indexOf('.')!=0){//add period
                                        addnot+=',.'+arr[i];
                                        }
                                   else addnot+=','+arr[i];//back as was
                                   }
                              } 
                         }//has commas
                         
                    }// input in field
               add=':not('+addnot+')';
               }
          selector+=add;
          if (jQuery('#'+ide).val()=='children'){//not target selector..
               elems = jQuery(this.obje).children(selector);
               if (arguments[4]!=='selector'&&!elems.length){
                    alert('no matching elements found for children with selector: '+selector);
                    return false;
                    }
               
               var x={
                    status : 'selector',
                    el  : elems
                    }
               return x;
               }
          else {
               elems=jQuery(this.obje).find(selector);
               if (arguments[4]!=='selector'&&!elems.length){
                    alert('no matching elements found for selector: '+selector);
                    return false;
                    }
               if (arguments[4]!=='selector'){
                    var x={
                         status : 'selector',
                         el  : elems
                         }
                    return x;
                    }
               return selector;
               }
          },
     editMultiToolsChange  :  function(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3,ida,idd){
          var x=this.getSelector(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3);
          if ( !x.status )return; 
          var status=x.status;
          var elems=x.el;
          var del=document.getElementById(idd).value.replace(/\./g,' ');
          var add=document.getElementById(ida).value.replace(/\./g,' ');
          if (status ==='advanced'){  
               for (i in elems){  
                    jQuery(elems[i]).each(function(){console.log(elems[i])
                         jQuery(this).addClass(add).removeClass(del);
                         });
                    }
               }
          else 
               elems.each(function(){
               jQuery(this).addClass(add).removeClass(del);
               });
          this.reboot();
          },
     editMultiToolsChange2  :  function(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3,idop,idsel2,ide2,idcn2,idrm2){//move
          var x=this.getSelector(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3);
          if ( !x.status )return; 
          var status=x.status;
          var elems=x.el;
          var selector2=this.getSelector(idsel2,ide2,idcn2,idrm2,'selector');
          var op= jQuery('#'+idop).val();
          if (!selector2.length){
               if (op !== 'aboveparent'&& op !=='belowparent' ){
                    alert('no matching elements found for target element using selector: '+selector2);
                    return;
                    }
               }
          if (op === 'none'){
               alert('Choose an Operation for Moving an Element to Target Destination');
               return;
               }  
          if (op === 'abovenext'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).nextAll(selector2).first().before(this);
                              });
                         }
                    }
               else 
                    elems.each(function(){
                    jQuery(this).nextAll(selector2).first().before(this);
                    });
               }
          if (op === 'belownext'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).nextAll(selector2).first().after(this);
                              });
                         }
                    }
               else 
                    elems.each(function(){
                         jQuery(this).nextAll(selector2).first().after(this);
                         });
               }
          if (op === 'lastnext'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).nextAll(selector2).first().append(this);
                              });
                         }
                    }
               else 
                    elems.each(function(){
                         jQuery(this).nextAll(selector2).first().append(this);
                         });
               }
          if (op === 'firstnext'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).nextAll(selector2).first().prepend(this);
                              });
                         }
                    }
               else 
                    elems.each(function(){
                         jQuery(this).nextAll(selector2).first().prepend(this);
                         });
               } 
          if (op === 'aboveprev'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).prevAll(selector2).first().before(this);
                              });
                         }
                    }
               else 
                    elems.each(function(){
                         jQuery(this).prevAll(selector2).first().before(this);
                         });
               }
          if (op === 'belowprev'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).prevAll(selector2).first().after(this);
                              });
                         }
                    }
               else 
                    elems.each(function(){
                         jQuery(this).prevAll(selector2).first().after(this);
                         });
               }
          if (op === 'lastprev'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).prevAll(selector2).first().append(this);
                              });
                         }
                    }
               else 
                    elems.each(function(){
                         jQuery(this).prevAll(selector2).first().append(this);
                         }); 
               }
          if (op === 'firstprev'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).prevAll(selector2).first().prepend(this);
                              });
                         }
                    }
               else 
                    elems.each(function(){
                         jQuery(this).prevAll(selector2).first().prepend(this);
                         });
               }
          if (op === 'aboveparent'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).parent().before(this);
                              });
                         }
                    }
               else 
                    elems.each(function(){
                         jQuery(this).parent().before(this);
                         });
               }
          if (op === 'belowparent'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).parent().after(this);
                              });
                         }
                    }
               else
                    elems.each(function(){
                         jQuery(this).parent().after(this);
                         });
               }
          if (op === 'aboveparents'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).closest().before(this);
                              });
                         }
                    }
               else elems.each(function(){
                    jQuery(this).closest().before(this);
                    });
               }
          if (op === 'belowparents'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).each(function(){
                              jQuery(this).closest().after(this);
                              });
                         }
                    }
               else
                    elems.each(function(){
                         jQuery(this).closest().after(this);
                         });
               }
          this.reboot();
          },
     editMultiToolsChange3  :  function(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3,idop){
          var x=this.getSelector(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3);
          if ( !x.status )return; 
          var status=x.status;
          var elems=x.el;
         var op= jQuery('#'+idop).val();
          if (op === 'none'){
               alert('Choose a Delete Operation');
               return;
               }
          else if (op==='all'){ 
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).remove();
                         }
                    }
               else elems.remove();
               } 
          else if (op==='strip'){ 
               if (status ==='advanced'){
                    for (i in elems){ 
                         elems[i].each(function(){
                              cnt =jQuery(this).contents();
                              jQuery(this).replaceWith(cnt);
                              });
                         }
                    }
               else elems.each(function(){
                    cnt =jQuery(this).contents();
                    jQuery(this).replaceWith(cnt);
                    });
               } 
          else if (op === 'rmInner'){
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).empty();
                         }
                    }
               else elems.empty();
               } 
          this.reboot();
          },
     editMultiToolsChange4  :  function(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3,idtag,idwe){
          var x=this.getSelector(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3);
          if ( !x.status )return; 
          var status=x.status;
          var elems=x.el;
          var tag=document.getElementById(idtag).value;
          var op=document.getElementById(idwe).value;
          if (tag==='none'){
               alert('Choose a tagname to wrap');
               return;
               }
          else tag ='<'+tag+'>'+'</'+tag+'>';
          if (op==='none'){
               alert('Choose an operation to wrap');
               return;
               }
          else if (op === 'all'){ 
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).wrap(tag);
                         }
                    }
               else elems.wrap(tag);
               }
          else if (op === 'wrapAll'){ 
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).wrapAll(tag);
                         }
                    }
               else {alert('wrap All generally requires the Advanced selector method if multiple elements are to be wrapped together with chosen tag, check results!');
                    elems.wrapAll(tag);
                    }
               }
          else if (op==='inner'){ 
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).wrapInner(tag);
                         }
                    }
               else elems.wrapInner(tag);
               }
          else if (op==='replace'){ 
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).replaceWith(function(){
                              return jQuery(tag).append(jQuery(this).contents());
                              });
                         }
                    }
               else {  
				elems.each(function(){
					jQuery(this).replaceWith(jQuery(tag).append(jQuery(this).contents()));
					});
				}
			} 
          this.reboot();
          },
     editMultiToolsChange5  :  function(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3,idop,idtag){
          var x=this.getSelector(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3);
          if ( !x.status )return; 
          var status=x.status;
          var elems=x.el;  
          var  op=document.getElementById(idop).value;  
          var tag=document.getElementById(idtag).value;
          if (tag==='none'){
               alert('Choose a tag to create type');
               return;
               }
          else tag ='<'+tag+'>'+'</'+tag+'>';
          if (op==='none'){
               alert('Choose sibling or child to add tag ');
               return;
               } 
          else if (op === 'sibling'){ 
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).after(tag);
                         }
                    }
               else {
                    elems.after(tag);
                    }
               }
          else if (op === 'last'){ 
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).append(tag);
                         }
                    }
               else elems.append(tag);
               }
          else if (op === 'first'){ 
               if (status ==='advanced'){
                    for (i in elems){ 
                         jQuery(elems[i]).prepend(tag);
                         }
                    }
               else elems.prepend(tag);
               }
          
          this.reboot();
          },
	editMultiToolsChange6  :  function(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3,idsearch,idreplace){
          var x=this.getSelector(idsel,ide,idcn,idrm,idadv1,idadv2,idadv3);
          if ( !x.status )return; 
          var status=x.status;
          var elems=x.el;
          var search=document.getElementById(idsearch).value;  
          var replace=document.getElementById(idreplace).value;
		var pattern=new RegExp(search,'g');
		
          if (status ==='advanced'){
			for (i in elems){ 
				jQuery(elems[i]).html(jQuery(elems[i]).html().replace(pattern,replace)); 
				}
			}
		else elems.each(function(){
			jQuery(this).html(jQuery(this).html().replace(pattern,replace));
			});
          this.reboot();
          },
     editImage  :  function(obj){ 
          var src=obj.getAttribute("src"); 
          var fn=src.split('/').pop(); 
          var fdir= typeof gen_Proc != "undefined" ? gen_Proc.tiny_resize_dir : 'tiny_resize/';
          var storedir= typeof gen_Proc != "undefined" ? gen_Proc.tiny_upload_dir : 'tiny_uploads/';
          var realWidth = obj.naturalWidth;
          var currWidth = obj.clientWidth;
          var html='<span id="altImageShow_'+this.bid+'_'+this.track+'" class="altEdButton" title="Edit class and element style values" onclick="jsExpressEdit.show(\'altImageShow_'+this.bid+'_'+this.track+'\',\'Image&nbsp;Edit\',\'asis\',\'600\',\'\');jsExpressEdit.getUploadSize(\''+fn+'\',\''+storedir+'\',\'altuploadSize_'+this.bid+'_'+this.track+'\');">Image&nbsp;Editor</span>'; //gen_Proc.adjustLeftMargin(\'altImageShow_'+this.bid+'_'+this.track+'t'+'\');
          html+='<div id="altImageShow_'+this.bid+'_'+this.track+'t" style="display:none;" class="altClassStyle">';
          //access to tiny upload dir by url for width info/changes may be blocked by .htaccess so using XMLHttpRequest..
		html+='<p style="display:block;clear:both;height:7px;"></p><p class="altCurImgSz">Current Actual Size:'+currWidth+'</p>'; 
		html+='<p class="altImageSize">Uploaded&nbsp;Size:&nbsp;</p><p id="altuploadSize_'+this.bid+'_'+this.track+'" class="altImageSize">Missing</p><p style="clear:both;display:block; "></p>';
		var imsg='Caption created. Edit Initial Caption Text & submit with all updates';
		html+='<p class="altCurImgSz"><input id="imgCaptionCreate_'+this.bid+'_'+this.track+'"  onchange="jsExpressEdit.createFigure(id,\''+this.track+'\',\''+imsg+'\');" value="1" name="void" type="checkbox">Create New Figure Caption Text for this Image</p><p id="imgCaptionCreate_'+this.bid+'_'+this.track+'t" style="clear:both;display:block;"></p>';
          var rmsg='Caption created. Edit Initial Caption Text & submit with all updates';
		html+='<p class="altCurImgSz"><input id="imgCaptionRemove_'+this.bid+'_'+this.track+'"  onchange="jsExpressEdit.removeFigure(id,\''+this.track+'\',\''+rmsg+'\');" value="1" name="void" type="checkbox">Remove Figure Caption Text if exists for this Image</p><p id="imgCaptionRemove_'+this.bid+'_'+this.track+'t" style="clear:both;display:block;"></p>';
		html+='<p class="altCurImgSz"><input id="imgCaptionPreserve_'+this.bid+'_'+this.track+'"  onchange="jsExpressEdit.removeFigureSaveCaption(id,\''+this.track+'\',\''+rmsg+'\');" value="1" name="void" type="checkbox">Remove Figure Preserve Caption Text if exists for this Image</p><p id="imgCaptionPreserve_'+this.bid+'_'+this.track+'t" style="clear:both;display:block;"></p>';
          html+='</div><!--alt show-->';
          return html;
          }, 
     resize    : function(obj,bid,track){
          var currWidth = obj.clientWidth;
          window.addEventListener('resize', function(){
               if ( currWidth !== obj.clientWidth) {  
                    clearTimeout(altEdImageTimer1);
                    var  altEdImageTimer1=setTimeout( function(){
                         if (jQuery('#altImageSize_'+bid+'_'+track)){
                              curSize=jQuery('#altImageSize_'+bid+'_'+track);
                              currWidth = obj.clientWidth;
                              curSize.html(currWidth);
                              }
                         }, 300);
                    }
               }, true); //resize
          },
     checkIframe : function (track){
          var elem =jQuery("["+this.attr+"="+track+"]",jQuery(this.obje));
          var ifs = elem.find('iframe');
          if ( ifs.length < 1) {
               elem.remove();
               this.reboot();
               }
          else if (ifs.length > 2) alert('multiple iframes in iframe division wrapper');
          },
     sortElements : function(obj){
          var nName = obj.nodeName.toLowerCase();
          if (nName.indexOf('text')>-1 ){
               return;
               }
          var sortallbutton= this.sortall ?'<span class="altEdButton" title="Move All elements including secondary or Copy" onclick="jsExpressEdit.sortAll('+this.track+');">Move/Copy To This Element</span><p class="hide" id="sortmovecopy_'+this.bid+'_'+this.track+'"></p>':'';        
           if (nName == 'img' ){
               var src = obj.getAttribute('src');
               var show ='<span style="width:auto;height:35px!important;" class="altEdTagText"> <img style="width:auto;max-width:60px;margin-right:10px;" src="'+src+'" height="35"></span>';
               var begin = '&lt;img src="' ;
               var end = '"&gt;';
               var build='<div class="altTagEdit">'+'<span class="altEdTagText">'+show+begin +src+end+sortallbutton+'</span></div><!--End build altTagEdit img-->';
               this.collect+=build;
               }
          else if (nName == 'a' ){
               var href = obj.getAttribute('href');
               var begin = '&lt;a href="';
               var end = '"&gt;';
               var innerHtml=obj.innerHTML;
               var build='<div class="altTagEdit">'+'<span class="altEdTagText">'+begin +href+end+innerHtml+'&lt;/a&gt;'+sortallbutton+'</span></div><!--End build altTagEdit A-->';
               this.collect+=build;
               } 
          else if ( nName == 'iframe' ){
               var src = obj.getAttribute('src');
               var begin = '&lt;iframe&gt;';
               var end = '"&lt;/iframe&gt;';
               var build='<div class="altTagEdit">'+'<span class="altEdTagText">'+begin +src+end+sortallbutton+'</span></div><!--End build altTagEdit img-->';
               this.collect+=build; 
               }
          else {
               if ( nName== 'span' && obj.outerHTML.match(/<span.*"><!--Temp br sub--><\/span>/)){
                    this.collect+='&lt;br&gt;'+removeall;
                    }//may be used when forced_root_block : 'p' is not set..
               else {//all other tags
                    var outermsg = '';
                    var count = obj.children.length;
                    var begin = '<span class="altEdTagText">&lt;'+nName+'&gt;</span>';
                    var text=jQuery(obj).justtext();
                    var textShow=  text.length > this.strlength ? text.substr(0,this.strlength) + '...' : text;
                    textShow='<span class="altEdTagText">'+textShow+'</span>';
                    var build='<div class="altTagEdit">'+begin +outermsg+textShow+sortallbutton;
                    this.collect+=build;
                    this.getElem(obj);
                    classes = count > 0 ? 'altTagEnd' :'altEdTagText';
                    var end = '<span class="'+classes+'">'+'&lt;\/'+nName+'&gt;</span>';
                    var build = end + '</div><!--End build altTagEdit main '+nName+'-->'; 
                    this.collect+=build;
                    }
               }
          },
     altSortParser  : function(item){//for addonParser..
          var junkdrawer = ToolMan.junkdrawer()
		var group = item.toolManDragGroup
		var list = group.element.parentNode ; 
		var id = list.getAttribute("id")
		var inc = 1;
		if (id == null ){
			alert('get Id Fail. For editing try different Modern Browser for best results')
			return
			}
		group.register('dragend', function() { 
			var getList = junkdrawer.serializeList(document.getElementById(id));
			var listArr = getList.split('|');
               var prevx = 0;
               var prevprev =-1;
               for (i=0; i < listArr.length; i++){
                    var count = parseInt(listArr[i].replace('edit_track_',''));
                    if (count < prevx){
                         var elem =jQuery("["+jsExpressEdit.attr+"="+count+"]",jQuery(jsExpressEdit.obje)).first(); 
                         var prev =jQuery("["+jsExpressEdit.attr+"="+prevx+"]",jQuery(jsExpressEdit.obje)).first();
                         var next = parseInt(elem.next().attr(jsExpressEdit.attr).replace('edit_track_',''));
                         if (count < prevprev){
                              elem.insertAfter(prev);
                              jsExpressEdit.reboot('sort');
                              }
                         else {
                              prev.insertBefore(elem);
                              jsExpressEdit.reboot('sort');
                              }
                         }
                    prevprev=prevx;
                    prevx=count;
                    }
			})  
          },
     parseNodes   : function(obj){
          var nName = obj.nodeName.toLowerCase();
          var updateText =  '<span class="altEdButton" title="Update text within this '+nName+'!" onclick="jsExpressEdit.updateText('+this.track+',\''+nName+'\');">Edit&nbsp;Text</span><div id="altTextAreaShow_'+this.bid+'_'+this.track+'" style="clear:both;" class="hide "></div>';
           
          var addSibling=  '<span class="altEdButton" title="Add child or Sibling After this Element:  '+nName+'!" onclick="jsExpressEdit.addSibling('+this.track+',\''+nName+'\');">Add/Replace&nbsp;&amp; Target Element</span><div id="addSiblingShow_'+this.bid+'_'+this.track+'" style="clear:both;" class="fsmdarkslategray hide"></div>';
          var updateSrc = '<span class="fs1nporange altEdButton" title="Update the Src within this '+nName+'!" onclick="jsExpressEdit.updateSrc('+this.track+',\''+nName+'\');">Change Iframe&nbsp;Src</span><div id="altIframeTextAreaShow_'+this.bid+'_'+this.track+'" style="clear:both;" class="hide "></div>'; 
          var remove = '<span class="altEdButton" title="Remove outer tags of this '+nName+' and leave all contents within it!" onclick="jsExpressEdit.remove('+this.track+',\'strip\');">Strip&nbsp;Tag</span>' ;   
          var removeall = '<span class="altEdButton" title="Remove this '+nName+' and all contents within it!" onclick="jsExpressEdit.remove('+this.track+',\'all\');">Full&nbsp;Removal</span>';
          var removeInfo = '<span class="altEdButton" title="First choose the iframe option to Remove Auto Iframe RWD mode" onclick="alert(\'Iframe RWD mode applied. First choose the iframe option to Remove Auto Iframe RWD mode ">Remove&nbsp;Info</span>';
           if (nName.indexOf('text')>-1 ){
               var text= obj.nodeValue;
               if (!text || /^\s*$/.test(text) )return; 
               var textShow=  text.length > this.strlength ? text.substr(0,this.strlength) + '...' : text;
               var removetext = '<span class="altEdButton" title="Remove textNode Completely" onclick="jsExpressEdit.remove(\''+this.track+'\',\'alltext\',\''+text+'\');">Full&nbsp;Removal</span>';
               var build='<div class="altTagEdit">'+'<span class="altEdTagText">'+textShow+'</span>'+removetext+'</div><!--End build altTagEdit textNode-->';
               this.collect+=build;
               }
          else if (nName == 'img' ){
               var updateAlt =  '<span class="altEdButton" title="Update text within this '+nName+'!" onclick="jsExpressEdit.updateAlt('+this.track+',\''+nName+'\');">Edit&nbsp;Alt&nbsp;Tag</span><div id="altImgTextAreaShow_'+this.bid+'_'+this.track+'" style="clear:both;" class="hide "></div>'; 
               var editImg=this.editImage(obj,this.bid);
               this.resize(obj,this.bid,this.track)
               var editStyle=this.editNode(obj,nName);
               var src = obj.getAttribute('src');
               var show ='<span style="width:auto;height:35px!important;" class="altEdTagText"> <img style="width:auto;max-width:60px;margin-right:10px;" src="'+src+'" ></span>';
               var begin = '&lt;img src="' ;
               var end = '"&gt;';
               var build='<div class="altTagEdit">'+'<span class="altEdTagText">'+show+begin +src+end+'</span>'+editImg+editStyle+removeall+updateAlt+addSibling+'</div><!--End build altTagEdit img-->';
               this.collect+=build;
               }
          else if (nName == 'a' ){
               var editStyle=this.editNode(obj,nName);
               var href = obj.getAttribute('href');
               var begin = '&lt;a href="';
               var end = '"&gt;';
               var innerHtml=obj.innerHTML;
               var build='<div class="altTagEdit">'+'<span class="altEdTagText">'+begin +href+end+innerHtml+'&lt;/a&gt;'+'</span>'+editStyle+removeall+addSibling+'</div><!--End build altTagEdit A-->';
               this.collect+=build;
               }
          else if ( nName == 'iframe' ){
               var msg='Automatic Two "div" wrappers will wrap around the iframe. The outer division can be styled or have class names added as needed.';
               var rwdIframe=  '<span class="altEdButton" title="RWD Respond Iframe" onclick="jsExpressEdit.rwdIframeInit('+this.track+',\'add\');">Add&nbsp;Auto-Iframe RWD</span><span class="altEdButton" title="RWD Respond Iframe" onclick="jsExpressEdit.rwdIframeInit('+this.track+',\'remove\');">Remove&nbsp;Auto-Iframe RWD</span><div id="altIframeRWDShow_'+this.bid+'_'+this.track+'" style="clear:both;" class="hide "></div>'; 
               var editImg=this.editImage(obj,this.bid);
               var editStyle=this.editNode(obj,nName); 
               var parent=jQuery(obj).parent();
               if  (parent.attr('data-mce-p-iframe-level') == 'span'){
                    editStyle = '<span class="altEdButton" title="Edit Parent p for RWD iframe Response using class or style tag" onclick="alert(\'Iframe RWD mode applied no changes to this span class are needed.  Apply RWD classes/styling and remove the default styling applied in the p element parent that was generated in auto iframe RWD mode. Auto iframe RWD mode may be removed in iframe options\');">Style/Class&nbsp;Info</span>';
                    removeall=removeInfo;
                    remove='';
                    }
               var src = obj.getAttribute('src');     
               var begin = '&lt;iframe&gt;';
               var end = '"&lt;/iframe&gt;';
               var build='<div class="altTagEdit">'+'<span class="altEdTagText">'+begin +src+end+'</span>'+updateSrc+editStyle+removeall+rwdIframe+'</div><!--End build altTagEdit img-->';
               this.collect+=build;
               }
          else {
               if ( nName== 'span' && obj.outerHTML.match(/<span.*"><!--Temp br sub--><\/span>/)){
                    this.collect+='&lt;br&gt;'+removeall+addSibling;
                    }//may be used when forced_root_block : 'p' is not set..
               else if ( nName== 'span' && jQuery(obj).hasClass('mce-shim')){
                    this.collect+='&lt;span&gt;&lt;/span&gt;<span class="">TinyMce Drag Shim Element</span>';
                    }
               else {//all other tags
                    var outermsg = '';
                    var editStyle=this.editNode(obj,nName);
                    if ( nName == 'p' && jQuery(obj).attr('data-iframe-level') == 'style-class'){
                         outermsg = ' Resposive Iframe Styles/Class Here ';
                         this.checkIframe(this.track);
                         remove='';
                         }
                    else if ( nName == 'span' && jQuery(obj).attr('data-iframe-level') == 'vidWrap'){
                         editStyle = '<span class="altEdButton" title="Edit Parent Div for RWD iframe Response using class or style tag" onclick="alert(\'Auto iframe RWD mode applied and no class/styling changes necessary here. Apply RWD classes/styling to the  p element parent which otherwise has default styling which may be removed. Auto iframe RWD mode may be removed..\');">Style/Class&nbsp;Info</span>';
                         removeall=removeInfo;
                         remove='';
                         }
                    else if ( nName == 'span' && jQuery(obj).attr('data-mce-p-iframe-level') == 'span'){
                         var editStyle = '<span class="altEdButton" title="Auto iframe RWD mode applied and no class/styling changes necessary here. Apply RWD classes/styling to the  p element parent which otherwise has default styling which may be removed. Auto iframe RWD mode may be removed" onclick="alert(\'Iframe RWD mode applied.  Auto iframe RWD mode applied and no class/styling changes necessary here. Apply RWD classes/styling to the  p element parent which otherwise has default styling which may be removed. Auto iframe RWD mode may be removed Auto iframe RWD mode may be removed in iframe options\');">Style/Class&nbsp;Info</span>';
                         removeall=removeInfo;
                         remove='';
                         }
                    var c  = obj.children;
                    count=0;
                    for (i=0; i<c.length; i++){
                         if (c[i].nodeName.toLowerCase() !== 'br'){
                              count++;
                              }             
                         }
                        
                    var begin = '<span class="altEdTagText">&lt;'+nName+'&gt;</span>';
                    var pretext=jQuery(obj).html().replace('<br>','&lt;br&gt;');
                    var b= document.createElement('div');
                    b.innerHTML=pretext;
                    document.body.appendChild(b);
                    var text = jQuery(b).justtext();
                    b.parentNode.removeChild(b);
                    var textShow=  text.length > this.strlength ? text.substr(0,this.strlength) + '...' : text;
                    textShow='<span class="altEdTagText">'+textShow+'</span>';
                    var build='<div class="altTagEdit">'+begin +textShow;
                    var editbuttons=(count  > 0 ) ? updateText+editStyle+remove+removeall+addSibling  : '';//if count > 0 do not updateText
                    this.collect+=build +editbuttons;
                    editbuttons=(count < 1 ) ? updateText+editStyle+remove+removeall+addSibling  : ''
                    this.getElem(obj);//getelem vs. parseNodes recursion we could also use
                    classes = count > 0  ? 'altTagEnd' :'altEdTagText';
                    var end =  '<span class="'+classes+'">'+'&lt;\/'+nName+'&gt;</span>';
                    var build = end + editbuttons + '</div><!--End build altTagEdit main '+nName+'-->'; 
                    this.collect+=build;
                    }
               }
          },
	removeAllAttr  :function(obje){
		 
			var children=obje.children;
			for(var i=0; i<children.length; i++) {
				if (children[i].hasAttribute(this.attr)){
					children[i].removeAttribute(this.attr);
					}
				this.removeAllAttr(children[i]);
				}
		 return;
		},
     parseTextarea   :  function(cn,bid){
		this.sort = arguments[2] === 'sort' ? true:false ;
		this.sortall = arguments[2] === 'sortall' ? true:false ;
		if  (this.sort && typeof ToolMan == "undefined" )alert('Missing Tool-Man Scripts. Primary Sort functionality disabled');
		this.collect='';
		this.dirColl='';
		this.trackNodes=this.track = 0;
		obje=document.getElementById(cn); 
		this.obje=obje;
		this.closeEditor(bid);
		this.removeAllAttr(obje);
		this.bid=bid;//id
		this.cn=cn;
		obje.setAttribute('contentEditable',true);
		var gotoTop='<a href="#editorHtml_'+this.bid+'" id="gotoAltEditTop" class="underline smallest ekblue">Go JsTop</a>';
		var goButton = '<a class="altEdButton rad5" title="go to Parse Editor Bottom" href="#parseGoBot" style="color:#ffffff" class="p3 cursor  editcolor editbackground italic underline ">GoBot </a>';
		var sortButton = this.sort ? '<p class="altEdButton rad5" onclick="jsExpressEdit.reboot();">Off Primary Sort</p>' : '<p class="altEdButton rad5" onclick="jsExpressEdit.reboot(\'sort\');">Go Sort Mode Primary</p>';
		var sortButton2 = this.sortall ? '<p class="altEdButton rad5" onclick="jsExpressEdit.reboot();">Off Secondary Sort</p>' : '<p class="altEdButton rad5" onclick="jsExpressEdit.reboot(\'sortall\');">Go Sort Mode Secondary /Copy</p>';
		var wrapButton='<p class="altEdButton rad5" onclick="jsExpressEdit.wrapSelect('+bid+',\'editorHtml_'+bid+'\');">Highlight &amp; Wrap</p><div id="wrapSelectShow_'+bid+'" class="altSourceEd"></div>';
		var directory= true ? '<p class="altEdButton rad5" onclick="jsExpressEdit.toggle_display(\'showDirectory_'+bid+'\',\'hide\');">GoTo Element</p><div id="showDirectory_'+bid+'" class=" altSourceEd" style="display:none;"></div>' : ''; 
		var build='<div id="ed_Html_'+bid+'" class="altSysEdit rad10"><div class="altEditTitleContainer"><p class="altEdButton rad5" onclick="jsExpressEdit.closeEditor(\''+bid+'\');">Remove Editor</p>'+goButton+directory+sortButton+sortButton2+'<input class="altEdButton rad5" value="Submit Page Changes" type="submit" name="submit"><p class="altEdButton rad5" onclick="jsExpressEdit.sourceEditor(\''+bid+'\',\'showSourceEdit_'+bid+'\');">Source Editor</p><div id="showSourceEdit_'+bid+'" class="hide  altSourceEd"></div>'+wrapButton+'<p class="altEdButton rad5" onclick="jsExpressEdit.toggle_display(\'showMultiEdit_'+bid+'\',\'hide\');jsExpressEdit.editMultiTools(\'showMultiEdit_'+bid+'\');">Multi Editor</p><div id="showMultiEdit_'+bid+'" class=" altSourceEd" style="display:none;"></div>  </div><!--alteditTitleContainer-->'+gotoTop;
		this.collect+=build;
		if (this.sort)this.collect+='<ul id="altTextAreaSort" class="boxes"><!--sort class-->';
		this.getNodes(obje);
		if (this.sort)this.collect+='</ul><!--End sort class-->';
		this.collect+='<p class="clear"></p><p class="altEditTitleContainer"><input class="mt25 altEditTitle rad5" value="Submit Page Changes" type="submit" name="submit"></p>';
		this.collect+='<a id="parseGoBot" title="go to Parse Editor Top" href="#editorHtml_'+bid+'" style="color:#ffffff" class="p3 cursor editcolor editbackground italic underline ">Editor Go Top </a></div><!--ed_Html altSysEdit-->';
		var showParse=document.getElementById('editorHtml_'+bid);
		showParse.innerHTML=this.collect; 
		var dirParse=document.getElementById('showDirectory_'+bid);
		dirParse.innerHTML=this.dirColl;
		if (this.sort){
			var o = document.getElementById('altTextAreaSort');
			dragsort.makeListSortable(o,this.altSortParser);
			}
		$('.openhide').each(function() {
		jQuery(this).on('click', function(e) {
			$('.hidefind').removeClass('hide');
			});
		});
          },
    getElem   : function(obje){//get elements also limits the recursion..
          var ele = 'div';
          var childs = obje.children;
          if (childs.strlen < 1)return;
          this.indent+='&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
          for(var i=0; i<childs.length; i++) {
               if(childs[i].nodeName.toLowerCase() == 'br' ){
                    //this.collect+='&lt;br&gt;';
                    continue;
                    }
			 
               if ( ! this.sort ) { 
                    this.track++;
                    childs[i].setAttribute(this.attr,this.track);
                    }
               var id =  this.sort ? '' : ' id="edit_track_'+this.track+'" ';
               var color =   this.sort   ? 'green smaller' : ( this.sortall ? 'orange' : 'hide hidefind darkslategray smallest' ); 
               var label =  !this.sort ? '<span class="' +color+ ' floatleft">#'+this.track+':</span>':'';
               this.collect+='<'+ele+id+' class="altEditElem " >'+label;
               if(this.sort)
                    jsExpressEdit.sortElements(childs[i]);
               else if(this.sortall)
                    jsExpressEdit.sortElements(childs[i]);  
               else
                    jsExpressEdit.parseNodes(childs[i],'ele');
              
               this.collect+='<p class="clear"></p></'+ele+'><!--End AltEditElem-->';
               }
          }, 
     getNodes   : function(obje){//all nodes
		var ele = (this.sort) ? 'li' : 'div';
          var childNodes = obje.childNodes
          if (childNodes.length < 1)return false;
          for(var i=0; i<childNodes.length; i++) {
			if ( childNodes[i].nodeType === 8 ) {//comment
				childNodes[i].parentNode.removeChild( childNodes[i] );
				continue;
				}
			
			 if ( childNodes[i].nodeType !== 1 ) {
                    jQuery(childNodes[i]).wrap('<p></p>');
                    }
               this.indent='';
               var nName = childNodes[i].nodeName.toLowerCase(); 
               this.track++;
               childNodes[i].setAttribute(this.attr,this.track); 
               if (this.sortall)this.trackNodes=this.track;
               else 
                    this.trackNodes++;

               var color =   this.sort   ? 'green ' : ( this.sortall ? 'orange ' : 'darkslategray small' );
	        var shownum= !this.sort ? '<span class="large darkslategray underline cursor">&nbsp;&nbsp;'+this.track+'</span>':'';
               this.collect+='<'+ele+' id="edit_track_'+this.track+'" class="altEditNodes box" ><p id="goto'+this.track+'" class="floatleft '+color+'">'+shownum+'</p>';
               this.dirColl+='<p class="floatleft clear"><a class="cursor underline italic altGoToIt" href="#goto'+this.track+'">GoTo '+nName+' #'+this.track+'</a></p>';
			if(this.sort)
                    jsExpressEdit.sortElements(childNodes[i]);
               else if(this.sortall)
                    jsExpressEdit.sortElements(childNodes[i],'sortall');
               else {
                    jsExpressEdit.parseNodes(childNodes[i]);
				}
              
               this.collect+='<p class="clear"></p></'+ele+'><!--End altEditNodes-->';
			
               }
          }//getFig
     }//jsExpressEdit