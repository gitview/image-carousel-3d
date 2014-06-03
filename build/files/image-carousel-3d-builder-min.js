/*
* Image Carousel 3D Builder 
* Date: 03-06-2014 
*
* ...
* @author harry 
*/

"function"!=typeof Object.create&&(Object.create=function(a){var b=function(){};return b.prototype=a,new b}),function(a,b){var c={init:function(b,c){var d=this;d.$elm=a(b),d.elm=b;var e=d.options=a.extend({},a.fn.buildImgCarousel3d.defaults,c);e.dataFileUrl="string"==typeof c?c:e.dataFileUrl,e.dataFileUrl=e.dataFileUrl||e.dataPath+e.dataFile,d.loadData()},loadData:function(){var b=this,c=b.options;a.ajax({url:c.dataFileUrl,dataType:c.jsonp?"jsonp":"json"}).done(function(a){b.carouselData=a,b.parseData(),b.buildDom()})},parseData:function(){var c=this,d=c.options;a(c.carouselData.list).each(function(c,e){a(e.list).each(function(a,c){c.img=d.assetPath+c.img,c.target||(c.target=c.link.match(b.location.host)?"_self":"_blank")})})},buildDom:function(){var b=this,c=b.options;b.$template=a("#"+c.templateId);var d=Hogan.compile(b.$template.html());b.$elm.html(d.render(b.carouselData)),b.$elm.imgCarousel3d(c)}};a.fn.buildImgCarousel3d=function(a){return this.each(function(){var b=Object.create(c);b.init(this,a)})},a.fn.buildImgCarousel3d.defaults={dataFile:"ps_plus_data.json",dataFileUrl:"",dataPath:"",assetPath:"",jsonp:!1,templateId:""}}(jQuery,window,document),function(a){var b={init:function(b,c){var d=this;d.$elm=a(b),d.elm=b;d.options=a.extend({},a.fn.imgCarousel3d.defaults,c);d.$scrollbar=d.$elm.find(".imgs-scrollbar"),d.$scroller=d.$scrollbar.find(".scroller"),d.scrollbarWidth=d.$scrollbar.width(),d.scrollerWidth=d.$scroller.width(),d.isLessThenIe10=a("html").hasClass("lt-ie10"),d.totalImgToView=5,d.imgDepthGap=.2,d.curImgViewIntervalId=0,d.isScrollerDragging=!1,d.intervalTime=150,d.angleGap=800,d.curLoadingQueueSign=0,d.initCarousel(),d.initScrollbar(),d.initController()},initCarousel:function(){var a=this,b=a.options;a.$imgsContainer&&a.$imgsContainer.css("zIndex",1);var c=a.$imgsContainer=a.$elm.find(".imgs");if(c.length>1){a.$curActiveType=a.$elm.find(".imgs-type.active");var d=a.$curActiveType.data();if(d&&d.connectId){if(a.$imgsContainer=a.$elm.find("#"+d.connectId).css("zIndex",2),a.setTypeSelection(),!a.$imgsContainer.length)return a.logErorr('Ohh! Category "'+d.connectId+'" not found! o_O'),0}else a.logErorr('Multiple images categories found but connection for cotegories not found. There should be "data-connect-id" in ".imgs-type.active" node'),a.logErorr("Selecting first categories for now"),a.$imgsContainer=c.eq(0)}a.$imgs=a.$imgsContainer.find(".img-container"),a.totalImgs=a.$imgs.length;var e=b.curIndex;b.curIndex=-5,a.targetViewIndex=-1,a.initImgsLoadComplete=!1,a.setPoints(),a.showImgAt(e),a.initImgsClick()},initImgsClick:function(){{var b=this;b.options}b.$imgs.find(".img-link").off("click"),b.$imgs.find(".img-link").on("click",function(c){var d=a(this),e=d.parent().parent();e.hasClass("active")||(c.preventDefault(),b.showImgAt(b.$imgs.index(e)))})},setPoints:function(){var a=this,b=a.options;a.isLessThenIe10||TweenLite.set(a.$imgsContainer,{css:{transformStyle:"preserve-3d",perspective:1100,perspectiveOrigin:"50% 50%"}}),a.posArray=[],a.$imgs.each(function(c){var d=(c-b.curIndex)*a.imgDepthGap,e=-Math.abs(d*a.angleGap),f=-Math.sin(d)*b.radius;a.posArray.push({angle:d,x:f,z:e})})},rotate:function(){var b,c,d=this,e=d.options,f=d.targetViewIndex-e.curIndex>0?-d.imgDepthGap:d.imgDepthGap;1===Math.abs(d.targetViewIndex-e.curIndex)?(b=Quint.easeOut,c=1):(b=Linear.easeNone,c=d.intervalTime/1e3);var g;if(d.$imgs.each(function(h,i){var j=d.posArray[h];j.angle=j.angle+f;var k=j.angle*d.angleGap,l=-Math.abs(k),m=Math.sin(j.angle)*e.radius,n=Math.ceil(.5*d.totalImgToView)*d.imgDepthGap*d.angleGap;n=Math.ceil(Math.abs(l))<Math.floor(Math.abs(n))?1:0;var o=0;e.imgRotation&&(o=Math.round(k)>=0?-30:30,o=0===Math.round(k)?0:o),d.isLessThenIe10?TweenLite.to(i,c,{x:m,ease:b,zIndex:parseInt(l,10),autoAlpha:n}):TweenLite.to(i,c,{x:m,z:l,zIndex:l,ease:b,autoAlpha:n,rotationY:o});var p=a(i);p.removeClass("active");var q=p.find(".img-content");if(n&&d.checkImgLoad(p),0===Math.round(k))g=p;else{TweenLite.to(q,.6,{borderColor:e.borderColor}),TweenLite.to(q.find(".img-info"),.3,{scaleY:0,transformOrigin:"bottom left",ease:Expo.easeOut}),TweenLite.to(q.find(".img-info div"),.1,{autoAlpha:0,y:10});var r=q.find("a.img-btn");TweenLite.killTweensOf(r),TweenLite.to(r,.1,{autoAlpha:0})}}),f>0?e.curIndex--:e.curIndex++,e.curIndex===d.targetViewIndex){clearInterval(d.curImgViewIntervalId);var h=g&&g.find(".img-content");h&&h.length&&(g.addClass("active"),TweenLite.to(h,c,{borderColor:e.activeBorderColor}),TweenLite.to(h.find(".img-info"),.6,{scaleY:1,transformOrigin:"bottom left",ease:Expo.easeOut}),h.find(".img-info div").each(function(a,b){TweenLite.to(b,.3,{autoAlpha:1,delay:.2*a,y:0})}),TweenLite.to(h.find("a.img-btn"),.3,{autoAlpha:1,delay:.6})),d.resetNextImgTime()}},initAnimationInterval:function(){{var a=this;a.options}clearInterval(a.curImgViewIntervalId),a.curImgViewIntervalId=setInterval(function(){a.rotate()},a.intervalTime)},showNext:function(){var a=this,b=a.options,c=b.curIndex;c++,c>=a.totalImgs&&(c=b.loop?0:a.totalImgs-1),a.showImgAt(c)},showPrev:function(){var a=this,b=a.options,c=b.curIndex;c--,0>=c&&(c=b.loop?a.totalImgs-1:0),a.showImgAt(c)},showImgAt:function(a){var b=this,c=b.options;if(console.log(a,b.targetViewIndex),!b.checkInitImgsLoad(a))return b.pendingImgViewIndex=a,!1;if(a!==b.targetViewIndex&&(b.targetViewIndex>=b.totalImgs?b.targetViewIndex=b.totalImgs-1:b.targetViewIndex<=0&&(b.targetViewIndex=0),b.targetViewIndex=a,b.initAnimationInterval(),!b.isScrollerDragging&&!b.changingCategory)){var d=b.totalImgs-1,e=b.targetViewIndex;e>d&&(e=d);var f=Math.abs(Math.round(e*((b.scrollbarWidth-b.scrollerWidth)/d))),g=Math.abs(.2*(b.targetViewIndex-c.curIndex));TweenLite.to(b.$scroller,g,{x:f,ease:Sine.easeOut})}},imgLoadHandler:function(b){var c=this,d=a(b.target);"load"===b.type?TweenLite.to(d,.6,{autoAlpha:1,ease:Sine.easeOut}):c.logErorr('Oops "'+b.target.src+'" image loading failed :('),c.curLoadingQueueSign==d.data().loadingQueueSign&&(c.loadingImgIndex++,c.setInitImgsLoadComplete())},setInitImgsLoadComplete:function(){var a=this;a.totalLoadingImgs!==a.loadingImgIndex||a.initImgsLoadComplete||(a.initImgsLoadComplete=!0,a.showImgAt(a.pendingImgViewIndex))},checkImgLoad:function(b){var c=this;if(!b.hasClass("loaded")){b.addClass("loaded"),c.totalLoadingImgs+=1;var d=function(a){c.imgLoadHandler(a)};b.find(".img-content img[data-src]").attr("data-loading-queue-sign",c.curLoadingQueueSign).load(d).error(d).css("opacity",0),b.find("img[data-src]").each(function(){$this=a(this),$this.parent();var b=$this.data();!$this.attr("src")&&b.src&&$this.attr("src",b.src)})}},checkInitImgsLoad:function(a){var b=this,c=(b.options,a+b.totalImgToView);c=c>b.totalImgs?b.totalImgs:c;b.totalLoadingImgs=0,b.loadingImgIndex=0,b.curLoadingQueueSign++;for(var d=0;c>d;d++)b.checkImgLoad(b.$imgs.eq(d));return b.setInitImgsLoadComplete(),b.initImgsLoadComplete},initScrollbar:function(){var a=this,b=a.options,c=function(){var c=Math.abs(Math.round(Math.round(this.x)/(a.scrollbarWidth/a.totalImgs)));if(!a.changingCategory){if(a.targetViewIndex=c,c===b.curIndex)return;a.rotate()}};Draggable.create(a.$scroller,{type:"x",bounds:{left:0,top:0,width:a.scrollbarWidth,height:0},onDrag:function(){c.call(this)},onDragStart:function(){a.isScrollerDragging=!0},onDragEnd:function(){c.call(this),a.isScrollerDragging=!1,a.resetNextImgTime()}}),a.$scrollbar.on("click",function(b){var c=b.offsetX||b.originalEvent.layerX,d=Math.abs(Math.round(c/(a.scrollbarWidth/a.totalImgs)));d>=a.totalImgs&&(d=a.totalImgs-1),a.showImgAt(d)}),a.$scroller.on("click",function(a){a.stopPropagation()})},initController:function(){var b=this,c=b.options;b.changingCategory=!1,b.$elm.find(".imgs-type").on("click",function(){var d=a(this);if(b.$curActiveType&&b.$curActiveType.removeClass("active"),b.$curActiveType=d,b.setTypeSelection(),d.addClass("active"),!b.changingCategory){var e=b.totalImgs+b.totalImgToView+15;b.changingCategory=!0,b.showImgAt(e),setTimeout(function(){b.changingCategory=!1,c.curIndex=0,b.initCarousel()},e*b.intervalTime)}});var d=0,e=0,f=10;b.$elm.find(".imgs-container").bind("touchstart touchmove touchend touchcancel",function(a){var c=a.originalEvent.touches[0],g=a.type;"touchstart"===g?d=c.pageX:"touchmove"===g?(e=c.pageX,a.preventDefault()):("touchend"===g||"touchcancel"===g)&&(e>d+f?b.showPrev():d-f>e&&b.showNext())})},resetNextImgTime:function(){var a=this,b=a.options;clearTimeout(a.autoSlideTimeoutId),!b.autoSlide||a.changingCategory||a.isScrollerDragging||(a.autoSlideTimeoutId=setTimeout(function(){a.showNext()},1e3*b.autoSlideDelay))},setTypeSelection:function(){{var a=this;a.options}TweenLite.to(a.$elm.find(".img-selectbar").eq(0),.8,{x:a.$curActiveType.position().left,ease:Expo.easeOut})},logErorr:function(a){console&&"function"==typeof console.error&&console.error(a)}};a.fn.imgCarousel3d=function(a){return this.each(function(){var c=Object.create(b);c.init(this,a)})},a.fn.imgCarousel3d.defaults={viewableImgs:5,curIndex:0,radius:960,borderColor:"rgba(220, 220, 220,0)",activeBorderColor:"rgba(220, 220, 220,1)",autoSlide:!1,autoSlideDelay:5,loop:!1,imgRotation:!0}}(jQuery,window,document);
//# sourceMappingURL=image-carousel-3d-builder-min.map