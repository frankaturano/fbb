!function(o,t,l){"use strict";function e(){function e(o,t){this.scrollLeft=o,this.scrollTop=t}function r(o){return.5*(1-Math.cos(Math.PI*o))}function c(o){if("object"!=typeof o||o.behavior===l||"auto"===o.behavior||"instant"===o.behavior)return!0;if("object"==typeof o&&"smooth"===o.behavior)return!1;throw new TypeError("behavior not valid")}function n(o){do{o=o.parentNode}while(o!==t.body&&!(o.clientHeight<o.scrollHeight||o.clientWidth<o.scrollWidth));return o}function s(t){t.frame=o.requestAnimationFrame(s.bind(o,t));var l,e,c,n=(h()-t.startTime)/f;l=r(n=n>1?1:n),e=t.startX+(t.x-t.startX)*l,c=t.startY+(t.y-t.startY)*l,t.method.call(t.scrollable,e,c),e!==t.x||c!==t.y||o.cancelAnimationFrame(t.frame)}function i(l,r,c){var n,i,a,f,m=h();l===t.body?(n=o,i=o.scrollX||o.pageXOffset,a=o.scrollY||o.pageYOffset,f=p.scroll):(n=l,i=l.scrollLeft,a=l.scrollTop,f=e),s({scrollable:n,method:f,startTime:m,startX:i,startY:a,x:r,y:c,frame:void 0})}if(!("scrollBehavior"in t.documentElement.style)){var a=o/Element||o.Element,f=468,p={scroll:o.scroll||o.scrollTo,scrollBy:o.scrollBy,scrollIntoView:a.prototype.scrollIntoView},h=o.performance&&o.performance.now?o.performance.now.bind(o.performance):Date.now;o.scroll=o.scrollTo=function(){c(arguments[0])?p.scroll.call(o,arguments[0].left||arguments[0],arguments[0].top||arguments[1]):i.call(o,t.body,~~arguments[0].left,~~arguments[0].top)},o.scrollBy=function(){c(arguments[0])?p.scrollBy.call(o,arguments[0].left||arguments[0],arguments[0].top||arguments[1]):i.call(o,t.body,~~arguments[0].left+(o.scrollX||o.pageXOffset),~~arguments[0].top+(o.scrollY||o.pageYOffset))},a.prototype.scrollIntoView=function(){if(c(arguments[0]))p.scrollIntoView.call(this,arguments[0]||!0);else{var l=n(this),e=l.getBoundingClientRect(),r=this.getBoundingClientRect();l!==t.body?(i.call(this,l,l.scrollLeft+r.left-e.left,l.scrollTop+r.top-e.top),o.scrollBy({left:e.left,top:e.top,behavior:"smooth"})):o.scrollBy({left:r.left,top:r.top,behavior:"smooth"})}}}}"object"==typeof exports?module.exports={polyfill:e}:e()}(window,document);
