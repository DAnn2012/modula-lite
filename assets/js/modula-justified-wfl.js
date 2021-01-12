!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof module&&module.exports?module.exports=function(t,i){return void 0===i&&(i="undefined"!=typeof window?require("jquery"):require("jquery")(t)),e(i),i}:e(jQuery)}(function(l){function n(t,i){this.settings=i,this.checkSettings(),this.imgAnalyzerTimeout=null,this.entries=null,this.buildingRow={entriesBuff:[],width:0,height:0,aspectRatio:0},this.lastFetchedEntry=null,this.lastAnalyzedIndex=-1,this.yield={every:2,flushed:0},this.border=0<=i.border?i.border:i.margins,this.maxRowHeight=this.retrieveMaxRowHeight(),this.suffixRanges=this.retrieveSuffixRanges(),this.offY=this.border,this.rows=0,this.spinner={phase:0,timeSlot:150,$el:l('<div class="spinner"><span></span><span></span><span></span></div>'),intervalId:null},this.scrollBarOn=!1,this.checkWidthIntervalId=null,this.galleryWidth=t.width(),this.$gallery=t}n.prototype.getSuffix=function(t,i){for(var e=i<t?t:i,s=0;s<this.suffixRanges.length;s++)if(e<=this.suffixRanges[s])return this.settings.sizeRangeSuffixes[this.suffixRanges[s]];return this.settings.sizeRangeSuffixes[this.suffixRanges[s-1]]},n.prototype.removeSuffix=function(t,i){return t.substring(0,t.length-i.length)},n.prototype.endsWith=function(t,i){return-1!==t.indexOf(i,t.length-i.length)},n.prototype.getUsedSuffix=function(t){for(var i in this.settings.sizeRangeSuffixes)if(this.settings.sizeRangeSuffixes.hasOwnProperty(i)&&0!==this.settings.sizeRangeSuffixes[i].length&&this.endsWith(t,this.settings.sizeRangeSuffixes[i]))return this.settings.sizeRangeSuffixes[i];return""},n.prototype.newSrc=function(t,i,e,s){var n;return this.settings.thumbnailPath?n=this.settings.thumbnailPath(t,i,e,s):(s=null!==(s=t.match(this.settings.extension))?s[0]:"",n=t.replace(this.settings.extension,""),n=this.removeSuffix(n,this.getUsedSuffix(n)),n+=this.getSuffix(i,e)+s),n},n.prototype.showImg=function(t,i){this.settings.cssAnimation?(t.addClass("entry-visible"),i&&i()):(t.stop().fadeTo(this.settings.imagesAnimationDuration,1,i),t.find(this.settings.imgSelector).stop().fadeTo(this.settings.imagesAnimationDuration,1,i))},n.prototype.extractImgSrcFromImage=function(t){var i=void 0!==t.data("safe-src")?t.data("safe-src"):t.attr("src");return t.data("jg.originalSrc",i),i},n.prototype.imgFromEntry=function(t){t=t.find(this.settings.imgSelector);return 0===t.length?null:t},n.prototype.captionFromEntry=function(t){t=t.find("> .caption");return 0===t.length?null:t},n.prototype.displayEntry=function(t,i,e,s,n,r){t.width(s),t.height(r),t.css("top",e),t.css("left",i);var o,a,h,g=this.imgFromEntry(t);null!==g?(g.css("width",s),g.css("height",n),g.css("margin-left",-s/2),g.css("margin-top",-n/2),o=g.attr("src"),a=this.newSrc(o,s,n,g[0]),g.one("error",function(){g.attr("src",g.data("jg.originalSrc"))}),h=function(){o!==a&&g.attr("src",a)},"skipped"===t.data("jg.loaded")?this.onImageEvent(o,l.proxy(function(){this.showImg(t,h),t.data("jg.loaded",!0)},this)):this.showImg(t,h)):this.showImg(t),this.displayEntryCaption(t)},n.prototype.displayEntryCaption=function(t){var i,e=this.imgFromEntry(t);null!==e&&this.settings.captions?(null===(i=this.captionFromEntry(t))&&(e=e.attr("alt"),this.isValidCaption(e)||(e=t.attr("title")),this.isValidCaption(e)&&(i=l('<div class="caption">'+e+"</div>"),t.append(i),t.data("jg.createdCaption",!0))),null!==i&&(this.settings.cssAnimation||i.stop().fadeTo(0,this.settings.captionSettings.nonVisibleOpacity),this.addCaptionEventsHandlers(t))):this.removeCaptionEventsHandlers(t)},n.prototype.isValidCaption=function(t){return void 0!==t&&0<t.length},n.prototype.onEntryMouseEnterForCaption=function(t){t=this.captionFromEntry(l(t.currentTarget));this.settings.cssAnimation?t.addClass("caption-visible").removeClass("caption-hidden"):t.stop().fadeTo(this.settings.captionSettings.animationDuration,this.settings.captionSettings.visibleOpacity)},n.prototype.onEntryMouseLeaveForCaption=function(t){t=this.captionFromEntry(l(t.currentTarget));this.settings.cssAnimation?t.removeClass("caption-visible").removeClass("caption-hidden"):t.stop().fadeTo(this.settings.captionSettings.animationDuration,this.settings.captionSettings.nonVisibleOpacity)},n.prototype.addCaptionEventsHandlers=function(t){var i=t.data("jg.captionMouseEvents");void 0===i&&(i={mouseenter:l.proxy(this.onEntryMouseEnterForCaption,this),mouseleave:l.proxy(this.onEntryMouseLeaveForCaption,this)},t.on("mouseenter",void 0,void 0,i.mouseenter),t.on("mouseleave",void 0,void 0,i.mouseleave),t.data("jg.captionMouseEvents",i))},n.prototype.removeCaptionEventsHandlers=function(t){var i=t.data("jg.captionMouseEvents");void 0!==i&&(t.off("mouseenter",void 0,i.mouseenter),t.off("mouseleave",void 0,i.mouseleave),t.removeData("jg.captionMouseEvents"))},n.prototype.clearBuildingRow=function(){this.buildingRow.entriesBuff=[],this.buildingRow.aspectRatio=0,this.buildingRow.width=0},n.prototype.prepareBuildingRow=function(t){var i,e,s,n,r=!0,o=0,a=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*this.settings.margins,h=a/this.buildingRow.aspectRatio,g=this.settings.rowHeight,l=this.buildingRow.width/a>this.settings.justifyThreshold;if(t&&"hide"===this.settings.lastRow&&!l){for(i=0;i<this.buildingRow.entriesBuff.length;i++)e=this.buildingRow.entriesBuff[i],this.settings.cssAnimation?e.removeClass("entry-visible"):(e.stop().fadeTo(0,.1),e.find("> img, > a > img").fadeTo(0,0));return-1}for(t&&!l&&"justify"!==this.settings.lastRow&&"hide"!==this.settings.lastRow&&(r=!1,0<this.rows&&(r=(g=(this.offY-this.border-this.settings.margins*this.rows)/this.rows)*this.buildingRow.aspectRatio/a>this.settings.justifyThreshold)),i=0;i<this.buildingRow.entriesBuff.length;i++)n=(e=this.buildingRow.entriesBuff[i]).data("jg.width")/e.data("jg.height"),n=r?(s=i===this.buildingRow.entriesBuff.length-1?a:h*n,h):(s=g*n,g),a-=Math.round(s),e.data("jg.jwidth",Math.round(s)),e.data("jg.jheight",Math.ceil(n)),(0===i||n<o)&&(o=n);return this.buildingRow.height=o,r},n.prototype.flushRow=function(t){var i,e=this.settings,s=this.border,n=this.prepareBuildingRow(t);if(t&&"hide"===e.lastRow&&-1===n)this.clearBuildingRow();else{if(this.maxRowHeight&&this.maxRowHeight<this.buildingRow.height&&(this.buildingRow.height=this.maxRowHeight),t&&("center"===e.lastRow||"right"===e.lastRow)){for(var r=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*e.margins,o=0;o<this.buildingRow.entriesBuff.length;o++)r-=(i=this.buildingRow.entriesBuff[o]).data("jg.jwidth");"center"===e.lastRow?s+=r/2:"right"===e.lastRow&&(s+=r)}var a=this.buildingRow.entriesBuff.length-1;for(o=0;o<=a;o++)i=this.buildingRow.entriesBuff[this.settings.rtl?a-o:o],this.displayEntry(i,s,this.offY,i.data("jg.jwidth"),i.data("jg.jheight"),this.buildingRow.height),s+=i.data("jg.jwidth")+e.margins;this.galleryHeightToSet=this.offY+this.buildingRow.height+this.border,this.setGalleryTempHeight(this.galleryHeightToSet+this.getSpinnerHeight()),(!t||this.buildingRow.height<=e.rowHeight&&n)&&(this.offY+=this.buildingRow.height+e.margins,this.rows+=1,this.clearBuildingRow(),this.settings.triggerEvent.call(this,"jg.rowflush"))}};var i=0;function e(){return l("body").height()>l(window).height()}n.prototype.rememberGalleryHeight=function(){i=this.$gallery.height(),this.$gallery.height(i)},n.prototype.setGalleryTempHeight=function(t){i=Math.max(t,i),this.$gallery.height(i)},n.prototype.setGalleryFinalHeight=function(t){i=t,this.$gallery.height(t)},n.prototype.checkWidth=function(){this.checkWidthIntervalId=setInterval(l.proxy(function(){var t;this.$gallery.is(":visible")&&(t=parseFloat(this.$gallery.width()),e()===this.scrollBarOn?Math.abs(t-this.galleryWidth)>this.settings.refreshSensitivity&&(this.galleryWidth=t,this.rewind(),this.rememberGalleryHeight(),this.startImgAnalyzer(!0)):(this.scrollBarOn=e(),this.galleryWidth=t))},this),this.settings.refreshTime)},n.prototype.isSpinnerActive=function(){return null!==this.spinner.intervalId},n.prototype.getSpinnerHeight=function(){return this.spinner.$el.innerHeight()},n.prototype.stopLoadingSpinnerAnimation=function(){clearInterval(this.spinner.intervalId),this.spinner.intervalId=null,this.setGalleryTempHeight(this.$gallery.height()-this.getSpinnerHeight()),this.spinner.$el.detach()},n.prototype.startLoadingSpinnerAnimation=function(){var t=this.spinner,i=t.$el.find("span");clearInterval(t.intervalId),this.$gallery.append(t.$el),this.setGalleryTempHeight(this.offY+this.buildingRow.height+this.getSpinnerHeight()),t.intervalId=setInterval(function(){t.phase<i.length?i.eq(t.phase).fadeTo(t.timeSlot,1):i.eq(t.phase-i.length).fadeTo(t.timeSlot,0),t.phase=(t.phase+1)%(2*i.length)},t.timeSlot)},n.prototype.rewind=function(){this.lastFetchedEntry=null,this.lastAnalyzedIndex=-1,this.offY=this.border,this.rows=0,this.clearBuildingRow()},n.prototype.updateEntries=function(t){t=t&&null!=this.lastFetchedEntry?l(this.lastFetchedEntry).nextAll(this.settings.selector).toArray():(this.entries=[],this.$gallery.children(this.settings.selector).toArray());return 0<t.length&&(l.isFunction(this.settings.sort)?t=this.sortArray(t):this.settings.randomize&&(t=this.shuffleArray(t)),this.lastFetchedEntry=t[t.length-1],this.settings.filter?t=this.filterArray(t):this.resetFilters(t)),this.entries=this.entries.concat(t),!0},n.prototype.insertToGallery=function(t){var i=this;l.each(t,function(){l(this).appendTo(i.$gallery)})},n.prototype.shuffleArray=function(t){for(var i,e,s=t.length-1;0<s;s--)i=Math.floor(Math.random()*(s+1)),e=t[s],t[s]=t[i],t[i]=e;return this.insertToGallery(t),t},n.prototype.sortArray=function(t){return t.sort(this.settings.sort),this.insertToGallery(t),t},n.prototype.resetFilters=function(t){for(var i=0;i<t.length;i++)l(t[i]).removeClass("jg-filtered")},n.prototype.filterArray=function(t){var i=this.settings;if("string"===l.type(i.filter))return t.filter(function(t){t=l(t);return t.is(i.filter)?(t.removeClass("jg-filtered"),!0):(t.addClass("jg-filtered").removeClass("jg-visible"),!1)});if(l.isFunction(i.filter)){for(var e=t.filter(i.filter),s=0;s<t.length;s++)-1===e.indexOf(t[s])?l(t[s]).addClass("jg-filtered").removeClass("jg-visible"):l(t[s]).removeClass("jg-filtered");return e}},n.prototype.destroy=function(){clearInterval(this.checkWidthIntervalId),l.each(this.entries,l.proxy(function(t,i){var e=l(i);e.css("width",""),e.css("height",""),e.css("top",""),e.css("left",""),e.data("jg.loaded",void 0),e.removeClass("jg-entry");i=this.imgFromEntry(e);i.css("width",""),i.css("height",""),i.css("margin-left",""),i.css("margin-top",""),i.attr("src",i.data("jg.originalSrc")),i.data("jg.originalSrc",void 0),this.removeCaptionEventsHandlers(e);i=this.captionFromEntry(e);e.data("jg.createdCaption")?(e.data("jg.createdCaption",void 0),null!==i&&i.remove()):null!==i&&i.fadeTo(0,1)},this)),this.$gallery.css("height",""),this.$gallery.removeClass("justified-gallery"),this.$gallery.data("jg.controller",void 0)},n.prototype.analyzeImages=function(t){for(var i=this.lastAnalyzedIndex+1;i<this.entries.length;i++){var e=l(this.entries[i]);if(!0===e.data("jg.loaded")||"skipped"===e.data("jg.loaded")){var s=this.galleryWidth-2*this.border-(this.buildingRow.entriesBuff.length-1)*this.settings.margins,n=e.data("jg.width")/e.data("jg.height");if(s/(this.buildingRow.aspectRatio+n)<this.settings.rowHeight&&(this.flushRow(!1),++this.yield.flushed>=this.yield.every))return void this.startImgAnalyzer(t);this.buildingRow.entriesBuff.push(e),this.buildingRow.aspectRatio+=n,this.buildingRow.width+=n*this.settings.rowHeight,this.lastAnalyzedIndex=i}else if("error"!==e.data("jg.loaded"))return}0<this.buildingRow.entriesBuff.length&&this.flushRow(!0),this.isSpinnerActive()&&this.stopLoadingSpinnerAnimation(),this.stopImgAnalyzerStarter(),this.settings.triggerEvent.call(this,t?"jg.resize":"jg.complete"),this.setGalleryFinalHeight(this.galleryHeightToSet)},n.prototype.stopImgAnalyzerStarter=function(){this.yield.flushed=0,null!==this.imgAnalyzerTimeout&&(clearTimeout(this.imgAnalyzerTimeout),this.imgAnalyzerTimeout=null)},n.prototype.startImgAnalyzer=function(t){var i=this;this.stopImgAnalyzerStarter(),this.imgAnalyzerTimeout=setTimeout(function(){i.analyzeImages(t)},.001)},n.prototype.onImageEvent=function(t,i,e){var s,n;(i||e)&&(s=new Image,n=l(s),i&&n.one("load",function(){n.off("load error"),i(s)}),e&&n.one("error",function(){n.off("load error"),e(s)}),s.src=t)},n.prototype.init=function(){var r=!1,o=!1,a=this;l.each(this.entries,function(t,i){var e=l(i),s=a.imgFromEntry(e);if(e.addClass("jg-entry"),!0!==e.data("jg.loaded")&&"skipped"!==e.data("jg.loaded"))if(null!==a.settings.rel&&e.attr("rel",a.settings.rel),null!==a.settings.target&&e.attr("target",a.settings.target),null!==s){var n=a.extractImgSrcFromImage(s);if(s.attr("src",n),!1===a.settings.waitThumbnailsLoad){i=parseFloat(s.prop("width")),s=parseFloat(s.prop("height"));if(!isNaN(i)&&!isNaN(s))return e.data("jg.width",i),e.data("jg.height",s),e.data("jg.loaded","skipped"),o=!0,a.startImgAnalyzer(!1),!0}e.data("jg.loaded",!1),r=!0,a.isSpinnerActive()||a.startLoadingSpinnerAnimation(),a.onImageEvent(n,function(t){e.data("jg.width",t.width),e.data("jg.height",t.height),e.data("jg.loaded",!0),a.startImgAnalyzer(!1)},function(){e.data("jg.loaded","error"),a.startImgAnalyzer(!1)})}else e.data("jg.loaded",!0),e.data("jg.width",e.width()|parseFloat(e.css("width"))|1),e.data("jg.height",e.height()|parseFloat(e.css("height"))|1)}),r||o||this.startImgAnalyzer(!1),this.checkWidth()},n.prototype.checkOrConvertNumber=function(t,i){if("string"===l.type(t[i])&&(t[i]=parseFloat(t[i])),"number"!==l.type(t[i]))throw i+" must be a number";if(isNaN(t[i]))throw"invalid number for "+i},n.prototype.checkSizeRangesSuffixes=function(){if("object"!==l.type(this.settings.sizeRangeSuffixes))throw"sizeRangeSuffixes must be defined and must be an object";var t,i=[];for(t in this.settings.sizeRangeSuffixes)this.settings.sizeRangeSuffixes.hasOwnProperty(t)&&i.push(t);for(var e={0:""},s=0;s<i.length;s++)if("string"===l.type(i[s]))try{e[parseInt(i[s].replace(/^[a-z]+/,""),10)]=this.settings.sizeRangeSuffixes[i[s]]}catch(t){throw"sizeRangeSuffixes keys must contains correct numbers ("+t+")"}else e[i[s]]=this.settings.sizeRangeSuffixes[i[s]];this.settings.sizeRangeSuffixes=e},n.prototype.retrieveMaxRowHeight=function(){var t=null,i=this.settings.rowHeight;if("string"===l.type(this.settings.maxRowHeight))t=this.settings.maxRowHeight.match(/^[0-9]+%$/)?i*parseFloat(this.settings.maxRowHeight.match(/^([0-9]+)%$/)[1])/100:parseFloat(this.settings.maxRowHeight);else{if("number"!==l.type(this.settings.maxRowHeight)){if(!1===this.settings.maxRowHeight||null==this.settings.maxRowHeight)return null;throw"maxRowHeight must be a number or a percentage"}t=this.settings.maxRowHeight}if(isNaN(t))throw"invalid number for maxRowHeight";return t<i&&(t=i),t},n.prototype.checkSettings=function(){this.checkSizeRangesSuffixes(),this.checkOrConvertNumber(this.settings,"rowHeight"),this.checkOrConvertNumber(this.settings,"margins"),this.checkOrConvertNumber(this.settings,"border");var t=["justify","nojustify","left","center","right","hide"];if(-1===t.indexOf(this.settings.lastRow))throw"lastRow must be one of: "+t.join(", ");if(this.checkOrConvertNumber(this.settings,"justifyThreshold"),this.settings.justifyThreshold<0||1<this.settings.justifyThreshold)throw"justifyThreshold must be in the interval [0,1]";if("boolean"!==l.type(this.settings.cssAnimation))throw"cssAnimation must be a boolean";if("boolean"!==l.type(this.settings.captions))throw"captions must be a boolean";if(this.checkOrConvertNumber(this.settings.captionSettings,"animationDuration"),this.checkOrConvertNumber(this.settings.captionSettings,"visibleOpacity"),this.settings.captionSettings.visibleOpacity<0||1<this.settings.captionSettings.visibleOpacity)throw"captionSettings.visibleOpacity must be in the interval [0, 1]";if(this.checkOrConvertNumber(this.settings.captionSettings,"nonVisibleOpacity"),this.settings.captionSettings.nonVisibleOpacity<0||1<this.settings.captionSettings.nonVisibleOpacity)throw"captionSettings.nonVisibleOpacity must be in the interval [0, 1]";if(this.checkOrConvertNumber(this.settings,"imagesAnimationDuration"),this.checkOrConvertNumber(this.settings,"refreshTime"),this.checkOrConvertNumber(this.settings,"refreshSensitivity"),"boolean"!==l.type(this.settings.randomize))throw"randomize must be a boolean";if("string"!==l.type(this.settings.selector))throw"selector must be a string";if(!1!==this.settings.sort&&!l.isFunction(this.settings.sort))throw"sort must be false or a comparison function";if(!1!==this.settings.filter&&!l.isFunction(this.settings.filter)&&"string"!==l.type(this.settings.filter))throw"filter must be false, a string or a filter function"},n.prototype.retrieveSuffixRanges=function(){var t,i=[];for(t in this.settings.sizeRangeSuffixes)this.settings.sizeRangeSuffixes.hasOwnProperty(t)&&i.push(parseInt(t,10));return i.sort(function(t,i){return i<t?1:t<i?-1:0}),i},n.prototype.updateSettings=function(t){this.settings=l.extend({},this.settings,t),this.checkSettings(),this.border=0<=this.settings.border?this.settings.border:this.settings.margins,this.maxRowHeight=this.retrieveMaxRowHeight(),this.suffixRanges=this.retrieveSuffixRanges()},n.prototype.defaults={sizeRangeSuffixes:{},thumbnailPath:void 0,rowHeight:120,maxRowHeight:!1,margins:1,border:-1,lastRow:"nojustify",justifyThreshold:.9,waitThumbnailsLoad:!0,captions:!0,cssAnimation:!0,imagesAnimationDuration:500,captionSettings:{animationDuration:500,visibleOpacity:.7,nonVisibleOpacity:0},rel:null,target:null,extension:/\.[^.\\/]+$/,refreshTime:200,refreshSensitivity:0,randomize:!1,rtl:!1,sort:!1,filter:!1,selector:"a, div:not(.spinner)",imgSelector:"> img, > a > img",triggerEvent:function(t){this.$gallery.trigger(t)}},l.fn.justifiedGallery=function(s){return this.each(function(t,i){var e=l(i);e.addClass("justified-gallery");i=e.data("jg.controller");if(void 0===i){if(null!=s&&"object"!==l.type(s)){if("destroy"===s)return;throw"The argument must be an object"}i=new n(e,l.extend({},n.prototype.defaults,s)),e.data("jg.controller",i)}else if("norewind"!==s){if("destroy"===s)return void i.destroy();i.updateSettings(s),i.rewind()}i.updateEntries("norewind"===s)&&i.init()})}});
function tg_getURLParameter(t){return decodeURIComponent((new RegExp("[?|&]"+t+"=([^&;]+?)(&|#|;|$)").exec(location.search)||[,""])[1].replace(/\+/g,"%20"))||null}function modulaInViewport(t){"function"==typeof jQuery&&t instanceof jQuery&&(t=t[0]);t=t.getBoundingClientRect();return t.top-jQuery(window).height()<=-100&&-400<=t.top-jQuery(window).height()||t.bottom<=jQuery(window).height()}jQuery(document).on("vc-full-width-row-single vc-full-width-row",function(t,i){0<jQuery("body").find(".modula").length&&jQuery(window).trigger("modula-update")}),jQuery(window).on("elementor/frontend/init",function(){window.elementorFrontend&&window.elementorFrontend.hooks.addAction("frontend/element_ready/global",function(t){0<jQuery("body").find(".modula").length&&jQuery(window).trigger("modula-update")})}),function(u,s,a,t){var n="modulaGallery",e={resizer:"/",keepArea:!0,type:"creative-gallery",columns:12,gutter:10,desktopGutter:10,mobileGutter:10,tabletGutter:10,enableTwitter:!1,enableFacebook:!1,enableWhatsapp:!1,enablePinterest:!1,enableLinkedin:!1,enableEmail:!1,lazyLoad:0,initLightbox:!1,lightbox:"fancybox",lightboxOpts:{},inView:!1};function h(t,i){this.element=t,this.$element=u(t),this.$itemsCnt=this.$element.find(".modula-items"),this.$items=this.$itemsCnt.find(".modula-item"),this.options=u.extend({},e,i),this._defaults=e,this._name=n,this.tiles=[],this.$tilesCnt=null,this.completed=!1,this.lastWidth=0,this.resizeTO=0,this.isIsotope=!1,this.isLazyLoaded=!0,this.init()}h.prototype.init=function(){var i=this,t=a.documentElement.clientWidth;this.options.gutter=t<=568?this.options.mobileGutter:t<=768?this.options.tabletGutter:this.options.desktopGutter,u(a).trigger("modula_api_before_init",[i]),"custom-grid"===this.options.type?this.createCustomGallery():"creative-gallery"==this.options.type?this.createGrid():"grid"==this.options.type&&("automatic"==this.options.grid_type?this.createAutoGrid():this.createColumnsGrid()),"custom-grid"===this.options.type&&u(s).height()<u("html").height()&&i.onResize(i),u(s).resize(function(){i.onResize(i)}),u(s).on("modula-update",function(){i.onResize(i)}),u(a).on("lazyloaded",function(t){t=u(t.target);"modula"==t.data("source")&&(t.data("size",{width:t.width(),height:t.height()}),(t=t.parents(".modula-item")).addClass("tg-loaded"),t=i.$items.not(".jtg-hidden").index(t),i.placeImage(t),i.isIsotope&&i.$itemsCnt.modulaisotope("layout"))}),i.options.inView&&jQuery(s).on("DOMContentLoaded load resize scroll",function(){modulaInViewport(i.$element)&&i.$element.addClass("modula-loaded-scale")}),this.setupSocial(),this.options.onComplete&&this.options.onComplete(),"fancybox"!=i.options.lightbox||i.options.initLightbox||this.initLightbox(),u(a).trigger("modula_api_after_init",[i])},h.prototype.initLightbox=function(){var e=this;e.$element.on("click",".modula-item-link:not( .modula-simple-link )",function(t){t.preventDefault();var i=u.map(e.$items,function(t){var i=jQuery(t).find(".modula-item-link:not( .modula-simple-link )"),t=jQuery(t).find(".pic");return{src:i.attr("href"),opts:{$thumb:t.parents(".modula-item"),caption:i.data("caption"),alt:t.attr("alt"),image_id:i.attr("data-image-id")}}}),t=e.$items.index(jQuery(this).parents(".modula-item"));jQuery.modulaFancybox.open(i,e.options.lightboxOpts,t)})},h.prototype.trunc=function(t){return Math.trunc?Math.trunc(t):(t=+t,isFinite(t)?t-t%1||(t<0?-0:0===t?t:0):t)},h.prototype.createCustomGallery=function(){var h,r=this,t=this.$element.find(".modula-items").width(),d=this,l=this.options.columns,i=a.documentElement.clientWidth;"1"==this.options.enableResponsive&&(i<=568?l=this.options.mobileColumns:i<=768&&(l=this.options.tabletColumns)),h=0<this.options.gutter?(t-this.options.gutter*(l-1))/l:Math.floor(t/l*1e3)/1e3,this.$items.not(".jtg-hidden").each(function(t,i){var e,o,n={},s=u(i).data("width"),a=u(i).data("height");12<s&&(s=12),"1"==d.options.enableResponsive&&(e=s,o=a,1==l?a=(s=1)*o/e:((s=Math.round(l*e/12))<1&&(s=1),(a=Math.round(s*o/e))<1&&(a=1))),n.width=h*s+d.options.gutter*(s-1),n.height=Math.round(h)*a+d.options.gutter*(a-1),u(i).data("size",n).addClass("tiled").addClass(n.width>n.height?"tile-h":"tile-v").data("position"),u(i).css(u(i).data("size")),u(i).find(".figc").css({width:u(i).data("size").width,height:u(i).data("size").height}),r.loadImage(t)});t={itemSelector:".modula-item",layoutMode:"packery",packery:{gutter:parseInt(d.options.gutter)}};this.$itemsCnt.modulaisotope(t),this.isIsotope=!0},h.prototype.createGrid=function(){var o=this;this.$itemsCnt.data("area",this.$itemsCnt.width()*this.options.height),this.lastWidth=this.$itemsCnt.width();for(var t,i=0;i<this.$items.not(".jtg-hidden").length;i++)this.tiles.push(o.getSlot());this.tiles.sort(function(t,i){return t.position-i.position}),this.$items.not(".jtg-hidden").each(function(t,i){var e=o.tiles[t];u(i).data("size",e),u(i).addClass("tiled").addClass(e.width>e.height?"tile-h":"tile-v").data("position"),u(i).css({width:e.width,height:e.height}),u(i).find(".figc").css({width:e.width,height:e.height}),o.loadImage(t)}),this.isIsotope||(t={resizesContainer:!1,itemSelector:".modula-item",layoutMode:"packery",packery:{gutter:parseInt(o.options.gutter)}},this.$itemsCnt.modulaisotope(t),this.isIsotope=!0)},h.prototype.createAutoGrid=function(){this.$itemsCnt.justifiedGallery({rowHeight:this.options.rowHeight,margins:this.options.gutter,lastRow:this.options.lastRow,captions:!1,border:0,imgSelector:".pic",cssAnimation:!0,imagesAnimationDuration:700})},h.prototype.createColumnsGrid=function(){var e=this;this.$itemsCnt.modulaisotope({itemSelector:".modula-item",layoutMode:"packery",packery:{gutter:parseInt(this.options.gutter)}}),this.$items.each(function(t,i){e.loadImage(t)}),this.isIsotope=!0},h.prototype.getSlot=function(){if(0==this.tiles.length)return o={top:0,left:0,width:this.$itemsCnt.width(),height:this.options.height,area:this.$itemsCnt.width()*this.options.height,position:0};for(var t=0,i=0;i<this.tiles.length;i++)(o=this.tiles[i]).area>this.tiles[t].area&&(t=i);var e,o={},n=this.tiles[t];return(o=n.width>n.height?(e=n.width/2*this.options.randomFactor,n.prevWidth=n.width,n.width=Math.floor(n.width/2+e*(Math.random()-.5)),{top:n.top,left:n.left+n.width+this.options.gutter,width:n.prevWidth-n.width-this.options.gutter,height:n.height}):(e=n.height/2*this.options.randomFactor,n.prevHeight=n.height,n.height=Math.floor(n.height/2+e*(Math.random()-.5)),{left:n.left,top:n.top+n.height+this.options.gutter,width:n.width,height:n.prevHeight-n.height-this.options.gutter})).area=o.width*o.height,o.position=1e3*o.top+o.left,n.position=1e3*n.top+n.left,this.tiles[t]=n,this.tiles[t].area=n.width*n.height,o},h.prototype.reset=function(){this.tiles=[],"custom-grid"===this.options.type?this.createCustomGallery():"creative-gallery"==this.options.type?this.createGrid():"grid"==this.options.type&&("automatic"==this.options.grid_type?this.createAutoGrid():this.createColumnsGrid()),this.lastWidth=this.$itemsCnt.width(),u(a).trigger("modula_api_reset",[this])},h.prototype.onResize=function(i){var t;i.lastWidth!=i.$itemsCnt.width()&&(t=a.documentElement.clientWidth,i.options.gutter=t<=568?i.options.mobileGutter:t<=768?i.options.tabletGutter:this.options.desktopGutter,clearTimeout(i.resizeTO),i.resizeTO=setTimeout(function(){var t;i.options.keepArea&&(t=i.$itemsCnt.data("area"),i.$itemsCnt.height(t/i.$itemsCnt.width())),i.reset(),i.isIsotope&&i.$itemsCnt.modulaisotope({packery:{gutter:parseInt(i.options.gutter)}}).modulaisotope("layout")},100))},h.prototype.loadImage=function(t){var i,e=this,o=e.$items.not(".jtg-hidden").eq(t).find(".pic"),n={};"0"==e.options.lazyLoad&&(void 0===o.attr("width")&&void 0===o.attr("height")?((i=new Image).onload=function(){n={width:this.width,height:this.height},o.data("size",n),e.placeImage(t)},"undefined"!=o.attr("src")?i.src=o.attr("src"):i.src=o.data("src")):(n={width:o.width(),height:o.height()},o.data("size",n),e.placeImage(t)))},h.prototype.placeImage=function(t){if("grid"!=this.options.type){var i=this.$items.not(".jtg-hidden").eq(t),e=i.find(".pic"),o=i.data("size"),n=e.data("size");if(void 0!==o&&void 0!==n){o.width,o.height;var s=n.width/n.height,a=e.data("valign")?e.data("valign"):"middle",i=e.data("halign")?e.data("halign"):"center",h={top:"auto",bottom:"auto",left:"auto",right:"auto",width:"auto",height:"auto",margin:"0",maxWidth:"999em"};if(o.width*n.height/n.width>o.height)switch(h.width=o.width,h.left=0,a){case"top":h.top=0;break;case"middle":h.top=0-(o.width*(1/s)-o.height)/2;break;case"bottom":h.bottom=0}else switch(h.height=o.height,h.top=0,i){case"left":h.left=0;break;case"center":h.left=0-(o.height*s-o.width)/2;break;case"right":h.right=0}e.css(h),this.$items.not(".jtg-hidden").eq(t).addClass("tg-loaded")}}},h.prototype.setupSocial=function(){this.options.enableTwitter&&i(this.$items,this),this.options.enableFacebook&&o(this.$items,this),this.options.enablePinterest&&d(this.$items,this),this.options.enableLinkedin&&l(this.$items,this),this.options.enableWhatsapp&&r(this.$items,this),this.options.enableEmail&&p(this.$items,this)},h.prototype.destroy=function(){this.isPackeryActive&&(this.$itemsCnt.packery("destroy"),this.isPackeryActive=!1)};var i=function(t,i){t.find(".modula-icon-twitter").click(function(t){t.preventDefault();var i=u(this).parents(".modula-item").find("img.pic"),e=i.data("caption"),o=i.data("full"),t=i.attr("title"),i=a.title;return 0<t.length?i=u.trim(t):0<e.length&&(i=u.trim(e)),s.open("https://twitter.com/intent/tweet?url="+encodeURI(o)+"&text="+encodeURI(i),"ftgw","location=1,status=1,scrollbars=1,width=600,height=400").moveTo(screen.width/2-300,screen.height/2-200),!1})},o=function(t,i){t.find(".modula-icon-facebook").click(function(t){t.preventDefault();t="//www.facebook.com/sharer.php?u="+u(this).parents(".modula-item").find("img.pic").attr("data-full");return s.open(t,"ftgw","location=1,status=1,scrollbars=1,width=600,height=400").moveTo(screen.width/2-300,screen.height/2-200),!1})},r=function(t,i){t.find(".modula-icon-whatsapp").click(function(t){t.preventDefault();t=u(this).parents(".modula-item").find("img.pic").attr("data-full");return s.open("https://api.whatsapp.com/send?text="+encodeURI(t)+"&preview_url=true","ftgw","location=1,status=1,scrollbars=1,width=600,height=400").moveTo(screen.width/2-300,screen.height/2-200),!1})},d=function(t,i){t.find(".modula-icon-pinterest").click(function(t){t.preventDefault();var i=u(this).parents(".modula-item").find("img.pic"),e=i.data("full"),o=i.data("caption"),n=i.attr("title"),t=a.title;0<n.length?t=u.trim(n):0<o.length&&(t=u.trim(o));e="http://pinterest.com/pin/create/button/?url="+encodeURI(e)+"&description="+encodeURI(t);return 1<=i.length&&(t=i.attr("data-full"),e+="&media="+(i=t,(t=a.createElement("img")).src=i,i=t.src,t.src=null,i)),s.open(e,"ftgw","location=1,status=1,scrollbars=1,width=600,height=400").moveTo(screen.width/2-300,screen.height/2-200),!1})},l=function(t,i){t.find(".modula-icon-linkedin").click(function(t){t.preventDefault();t=u(this).parents(".modula-item").find("img.pic").attr("data-full"),t="//linkedin.com/shareArticle?mini=true&url="+ +encodeURI(t);return s.open(t,"ftgw","location=1,status=1,scrollbars=1,width=600,height=400").moveTo(screen.width/2-300,screen.height/2-200),!1})},p=function(t,n){t.find(".modula-icon-email").click(function(t){var i=encodeURI(n.options.email_subject),e=jQuery(".modula-icon-email").parents(".modula-item").find("img.pic").attr("data-full"),o=location.href,o="mailto:?subject="+i+"&body="+encodeURI(n.options.email_message.replace(/%%image_link%%/g,e).replace(/%%gallery_link%%/g,o));return s.open(o,"ftgw","location=1,status=1,scrollbars=1,width=600,height=400").moveTo(screen.width/2-300,screen.height/2-200),!1})};u.fn[n]=function(i){var e,o=arguments;return i===t||"object"==typeof i?this.each(function(){u.data(this,"plugin_"+n)||u.data(this,"plugin_"+n,new h(this,i))}):"string"==typeof i&&"_"!==i[0]&&"init"!==i?(this.each(function(){var t=u.data(this,"plugin_"+n);t instanceof h&&"function"==typeof t[i]&&(e=t[i].apply(t,Array.prototype.slice.call(o,1))),"destroy"===i&&u.data(this,"plugin_"+n,null)}),e!==t?e:this):void 0}}(jQuery,window,document),jQuery(document).ready(function(){var t=jQuery(".modula.modula-gallery");jQuery.each(t,function(){var t=jQuery(this).data("config");jQuery(this).modulaGallery(t)})});