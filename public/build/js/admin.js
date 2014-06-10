(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./lib/angular.min.js');

module.exports = angular;

},{"./lib/angular.min.js":2}],2:[function(require,module,exports){
/*
 AngularJS v1.2.16
 (c) 2010-2014 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(O,U,s){'use strict';function t(b){return function(){var a=arguments[0],c,a="["+(b?b+":":"")+a+"] http://errors.angularjs.org/1.2.16/"+(b?b+"/":"")+a;for(c=1;c<arguments.length;c++)a=a+(1==c?"?":"&")+"p"+(c-1)+"="+encodeURIComponent("function"==typeof arguments[c]?arguments[c].toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof arguments[c]?"undefined":"string"!=typeof arguments[c]?JSON.stringify(arguments[c]):arguments[c]);return Error(a)}}function ab(b){if(null==b||Ca(b))return!1;
var a=b.length;return 1===b.nodeType&&a?!0:w(b)||M(b)||0===a||"number"===typeof a&&0<a&&a-1 in b}function q(b,a,c){var d;if(b)if(P(b))for(d in b)"prototype"==d||("length"==d||"name"==d||b.hasOwnProperty&&!b.hasOwnProperty(d))||a.call(c,b[d],d);else if(b.forEach&&b.forEach!==q)b.forEach(a,c);else if(ab(b))for(d=0;d<b.length;d++)a.call(c,b[d],d);else for(d in b)b.hasOwnProperty(d)&&a.call(c,b[d],d);return b}function Qb(b){var a=[],c;for(c in b)b.hasOwnProperty(c)&&a.push(c);return a.sort()}function Sc(b,
a,c){for(var d=Qb(b),e=0;e<d.length;e++)a.call(c,b[d[e]],d[e]);return d}function Rb(b){return function(a,c){b(c,a)}}function bb(){for(var b=ka.length,a;b;){b--;a=ka[b].charCodeAt(0);if(57==a)return ka[b]="A",ka.join("");if(90==a)ka[b]="0";else return ka[b]=String.fromCharCode(a+1),ka.join("")}ka.unshift("0");return ka.join("")}function Sb(b,a){a?b.$$hashKey=a:delete b.$$hashKey}function D(b){var a=b.$$hashKey;q(arguments,function(a){a!==b&&q(a,function(a,c){b[c]=a})});Sb(b,a);return b}function Y(b){return parseInt(b,
10)}function Tb(b,a){return D(new (D(function(){},{prototype:b})),a)}function C(){}function Da(b){return b}function aa(b){return function(){return b}}function E(b){return"undefined"===typeof b}function B(b){return"undefined"!==typeof b}function X(b){return null!=b&&"object"===typeof b}function w(b){return"string"===typeof b}function vb(b){return"number"===typeof b}function Na(b){return"[object Date]"===wa.call(b)}function M(b){return"[object Array]"===wa.call(b)}function P(b){return"function"===typeof b}
function cb(b){return"[object RegExp]"===wa.call(b)}function Ca(b){return b&&b.document&&b.location&&b.alert&&b.setInterval}function Tc(b){return!(!b||!(b.nodeName||b.prop&&b.attr&&b.find))}function Uc(b,a,c){var d=[];q(b,function(b,g,f){d.push(a.call(c,b,g,f))});return d}function db(b,a){if(b.indexOf)return b.indexOf(a);for(var c=0;c<b.length;c++)if(a===b[c])return c;return-1}function Oa(b,a){var c=db(b,a);0<=c&&b.splice(c,1);return a}function ba(b,a){if(Ca(b)||b&&b.$evalAsync&&b.$watch)throw Pa("cpws");
if(a){if(b===a)throw Pa("cpi");if(M(b))for(var c=a.length=0;c<b.length;c++)a.push(ba(b[c]));else{c=a.$$hashKey;q(a,function(b,c){delete a[c]});for(var d in b)a[d]=ba(b[d]);Sb(a,c)}}else(a=b)&&(M(b)?a=ba(b,[]):Na(b)?a=new Date(b.getTime()):cb(b)?a=RegExp(b.source):X(b)&&(a=ba(b,{})));return a}function Ub(b,a){a=a||{};for(var c in b)!b.hasOwnProperty(c)||"$"===c.charAt(0)&&"$"===c.charAt(1)||(a[c]=b[c]);return a}function xa(b,a){if(b===a)return!0;if(null===b||null===a)return!1;if(b!==b&&a!==a)return!0;
var c=typeof b,d;if(c==typeof a&&"object"==c)if(M(b)){if(!M(a))return!1;if((c=b.length)==a.length){for(d=0;d<c;d++)if(!xa(b[d],a[d]))return!1;return!0}}else{if(Na(b))return Na(a)&&b.getTime()==a.getTime();if(cb(b)&&cb(a))return b.toString()==a.toString();if(b&&b.$evalAsync&&b.$watch||a&&a.$evalAsync&&a.$watch||Ca(b)||Ca(a)||M(a))return!1;c={};for(d in b)if("$"!==d.charAt(0)&&!P(b[d])){if(!xa(b[d],a[d]))return!1;c[d]=!0}for(d in a)if(!c.hasOwnProperty(d)&&"$"!==d.charAt(0)&&a[d]!==s&&!P(a[d]))return!1;
return!0}return!1}function Vb(){return U.securityPolicy&&U.securityPolicy.isActive||U.querySelector&&!(!U.querySelector("[ng-csp]")&&!U.querySelector("[data-ng-csp]"))}function eb(b,a){var c=2<arguments.length?ya.call(arguments,2):[];return!P(a)||a instanceof RegExp?a:c.length?function(){return arguments.length?a.apply(b,c.concat(ya.call(arguments,0))):a.apply(b,c)}:function(){return arguments.length?a.apply(b,arguments):a.call(b)}}function Vc(b,a){var c=a;"string"===typeof b&&"$"===b.charAt(0)?c=
s:Ca(a)?c="$WINDOW":a&&U===a?c="$DOCUMENT":a&&(a.$evalAsync&&a.$watch)&&(c="$SCOPE");return c}function qa(b,a){return"undefined"===typeof b?s:JSON.stringify(b,Vc,a?"  ":null)}function Wb(b){return w(b)?JSON.parse(b):b}function Qa(b){"function"===typeof b?b=!0:b&&0!==b.length?(b=K(""+b),b=!("f"==b||"0"==b||"false"==b||"no"==b||"n"==b||"[]"==b)):b=!1;return b}function ha(b){b=y(b).clone();try{b.empty()}catch(a){}var c=y("<div>").append(b).html();try{return 3===b[0].nodeType?K(c):c.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/,
function(a,b){return"<"+K(b)})}catch(d){return K(c)}}function Xb(b){try{return decodeURIComponent(b)}catch(a){}}function Yb(b){var a={},c,d;q((b||"").split("&"),function(b){b&&(c=b.split("="),d=Xb(c[0]),B(d)&&(b=B(c[1])?Xb(c[1]):!0,a[d]?M(a[d])?a[d].push(b):a[d]=[a[d],b]:a[d]=b))});return a}function Zb(b){var a=[];q(b,function(b,d){M(b)?q(b,function(b){a.push(za(d,!0)+(!0===b?"":"="+za(b,!0)))}):a.push(za(d,!0)+(!0===b?"":"="+za(b,!0)))});return a.length?a.join("&"):""}function wb(b){return za(b,
!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function za(b,a){return encodeURIComponent(b).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,a?"%20":"+")}function Wc(b,a){function c(a){a&&d.push(a)}var d=[b],e,g,f=["ng:app","ng-app","x-ng-app","data-ng-app"],h=/\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;q(f,function(a){f[a]=!0;c(U.getElementById(a));a=a.replace(":","\\:");b.querySelectorAll&&(q(b.querySelectorAll("."+a),c),q(b.querySelectorAll("."+
a+"\\:"),c),q(b.querySelectorAll("["+a+"]"),c))});q(d,function(a){if(!e){var b=h.exec(" "+a.className+" ");b?(e=a,g=(b[2]||"").replace(/\s+/g,",")):q(a.attributes,function(b){!e&&f[b.name]&&(e=a,g=b.value)})}});e&&a(e,g?[g]:[])}function $b(b,a){var c=function(){b=y(b);if(b.injector()){var c=b[0]===U?"document":ha(b);throw Pa("btstrpd",c);}a=a||[];a.unshift(["$provide",function(a){a.value("$rootElement",b)}]);a.unshift("ng");c=ac(a);c.invoke(["$rootScope","$rootElement","$compile","$injector","$animate",
function(a,b,c,d,e){a.$apply(function(){b.data("$injector",d);c(b)(a)})}]);return c},d=/^NG_DEFER_BOOTSTRAP!/;if(O&&!d.test(O.name))return c();O.name=O.name.replace(d,"");Ea.resumeBootstrap=function(b){q(b,function(b){a.push(b)});c()}}function fb(b,a){a=a||"_";return b.replace(Xc,function(b,d){return(d?a:"")+b.toLowerCase()})}function xb(b,a,c){if(!b)throw Pa("areq",a||"?",c||"required");return b}function Ra(b,a,c){c&&M(b)&&(b=b[b.length-1]);xb(P(b),a,"not a function, got "+(b&&"object"==typeof b?
b.constructor.name||"Object":typeof b));return b}function Aa(b,a){if("hasOwnProperty"===b)throw Pa("badname",a);}function bc(b,a,c){if(!a)return b;a=a.split(".");for(var d,e=b,g=a.length,f=0;f<g;f++)d=a[f],b&&(b=(e=b)[d]);return!c&&P(b)?eb(e,b):b}function yb(b){var a=b[0];b=b[b.length-1];if(a===b)return y(a);var c=[a];do{a=a.nextSibling;if(!a)break;c.push(a)}while(a!==b);return y(c)}function Yc(b){var a=t("$injector"),c=t("ng");b=b.angular||(b.angular={});b.$$minErr=b.$$minErr||t;return b.module||
(b.module=function(){var b={};return function(e,g,f){if("hasOwnProperty"===e)throw c("badname","module");g&&b.hasOwnProperty(e)&&(b[e]=null);return b[e]||(b[e]=function(){function b(a,d,e){return function(){c[e||"push"]([a,d,arguments]);return n}}if(!g)throw a("nomod",e);var c=[],d=[],m=b("$injector","invoke"),n={_invokeQueue:c,_runBlocks:d,requires:g,name:e,provider:b("$provide","provider"),factory:b("$provide","factory"),service:b("$provide","service"),value:b("$provide","value"),constant:b("$provide",
"constant","unshift"),animation:b("$animateProvider","register"),filter:b("$filterProvider","register"),controller:b("$controllerProvider","register"),directive:b("$compileProvider","directive"),config:m,run:function(a){d.push(a);return this}};f&&m(f);return n}())}}())}function Zc(b){D(b,{bootstrap:$b,copy:ba,extend:D,equals:xa,element:y,forEach:q,injector:ac,noop:C,bind:eb,toJson:qa,fromJson:Wb,identity:Da,isUndefined:E,isDefined:B,isString:w,isFunction:P,isObject:X,isNumber:vb,isElement:Tc,isArray:M,
version:$c,isDate:Na,lowercase:K,uppercase:Fa,callbacks:{counter:0},$$minErr:t,$$csp:Vb});Sa=Yc(O);try{Sa("ngLocale")}catch(a){Sa("ngLocale",[]).provider("$locale",ad)}Sa("ng",["ngLocale"],["$provide",function(a){a.provider({$$sanitizeUri:bd});a.provider("$compile",cc).directive({a:cd,input:dc,textarea:dc,form:dd,script:ed,select:fd,style:gd,option:hd,ngBind:id,ngBindHtml:jd,ngBindTemplate:kd,ngClass:ld,ngClassEven:md,ngClassOdd:nd,ngCloak:od,ngController:pd,ngForm:qd,ngHide:rd,ngIf:sd,ngInclude:td,
ngInit:ud,ngNonBindable:vd,ngPluralize:wd,ngRepeat:xd,ngShow:yd,ngStyle:zd,ngSwitch:Ad,ngSwitchWhen:Bd,ngSwitchDefault:Cd,ngOptions:Dd,ngTransclude:Ed,ngModel:Fd,ngList:Gd,ngChange:Hd,required:ec,ngRequired:ec,ngValue:Id}).directive({ngInclude:Jd}).directive(zb).directive(fc);a.provider({$anchorScroll:Kd,$animate:Ld,$browser:Md,$cacheFactory:Nd,$controller:Od,$document:Pd,$exceptionHandler:Qd,$filter:gc,$interpolate:Rd,$interval:Sd,$http:Td,$httpBackend:Ud,$location:Vd,$log:Wd,$parse:Xd,$rootScope:Yd,
$q:Zd,$sce:$d,$sceDelegate:ae,$sniffer:be,$templateCache:ce,$timeout:de,$window:ee,$$rAF:fe,$$asyncCallback:ge})}])}function Ta(b){return b.replace(he,function(a,b,d,e){return e?d.toUpperCase():d}).replace(ie,"Moz$1")}function Ab(b,a,c,d){function e(b){var e=c&&b?[this.filter(b)]:[this],l=a,k,m,n,p,r,z;if(!d||null!=b)for(;e.length;)for(k=e.shift(),m=0,n=k.length;m<n;m++)for(p=y(k[m]),l?p.triggerHandler("$destroy"):l=!l,r=0,p=(z=p.children()).length;r<p;r++)e.push(Ga(z[r]));return g.apply(this,arguments)}
var g=Ga.fn[b],g=g.$original||g;e.$original=g;Ga.fn[b]=e}function N(b){if(b instanceof N)return b;w(b)&&(b=ca(b));if(!(this instanceof N)){if(w(b)&&"<"!=b.charAt(0))throw Bb("nosel");return new N(b)}if(w(b)){var a=b;b=U;var c;if(c=je.exec(a))b=[b.createElement(c[1])];else{var d=b,e;b=d.createDocumentFragment();c=[];if(Cb.test(a)){d=b.appendChild(d.createElement("div"));e=(ke.exec(a)||["",""])[1].toLowerCase();e=ea[e]||ea._default;d.innerHTML="<div>&#160;</div>"+e[1]+a.replace(le,"<$1></$2>")+e[2];
d.removeChild(d.firstChild);for(a=e[0];a--;)d=d.lastChild;a=0;for(e=d.childNodes.length;a<e;++a)c.push(d.childNodes[a]);d=b.firstChild;d.textContent=""}else c.push(d.createTextNode(a));b.textContent="";b.innerHTML="";b=c}Db(this,b);y(U.createDocumentFragment()).append(this)}else Db(this,b)}function Eb(b){return b.cloneNode(!0)}function Ha(b){hc(b);var a=0;for(b=b.childNodes||[];a<b.length;a++)Ha(b[a])}function ic(b,a,c,d){if(B(d))throw Bb("offargs");var e=la(b,"events");la(b,"handle")&&(E(a)?q(e,
function(a,c){Fb(b,c,a);delete e[c]}):q(a.split(" "),function(a){E(c)?(Fb(b,a,e[a]),delete e[a]):Oa(e[a]||[],c)}))}function hc(b,a){var c=b[gb],d=Ua[c];d&&(a?delete Ua[c].data[a]:(d.handle&&(d.events.$destroy&&d.handle({},"$destroy"),ic(b)),delete Ua[c],b[gb]=s))}function la(b,a,c){var d=b[gb],d=Ua[d||-1];if(B(c))d||(b[gb]=d=++me,d=Ua[d]={}),d[a]=c;else return d&&d[a]}function jc(b,a,c){var d=la(b,"data"),e=B(c),g=!e&&B(a),f=g&&!X(a);d||f||la(b,"data",d={});if(e)d[a]=c;else if(g){if(f)return d&&d[a];
D(d,a)}else return d}function Gb(b,a){return b.getAttribute?-1<(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").indexOf(" "+a+" "):!1}function hb(b,a){a&&b.setAttribute&&q(a.split(" "),function(a){b.setAttribute("class",ca((" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ").replace(" "+ca(a)+" "," ")))})}function ib(b,a){if(a&&b.setAttribute){var c=(" "+(b.getAttribute("class")||"")+" ").replace(/[\n\t]/g," ");q(a.split(" "),function(a){a=ca(a);-1===c.indexOf(" "+a+" ")&&
(c+=a+" ")});b.setAttribute("class",ca(c))}}function Db(b,a){if(a){a=a.nodeName||!B(a.length)||Ca(a)?[a]:a;for(var c=0;c<a.length;c++)b.push(a[c])}}function kc(b,a){return jb(b,"$"+(a||"ngController")+"Controller")}function jb(b,a,c){b=y(b);9==b[0].nodeType&&(b=b.find("html"));for(a=M(a)?a:[a];b.length;){for(var d=b[0],e=0,g=a.length;e<g;e++)if((c=b.data(a[e]))!==s)return c;b=y(d.parentNode||11===d.nodeType&&d.host)}}function lc(b){for(var a=0,c=b.childNodes;a<c.length;a++)Ha(c[a]);for(;b.firstChild;)b.removeChild(b.firstChild)}
function mc(b,a){var c=kb[a.toLowerCase()];return c&&nc[b.nodeName]&&c}function ne(b,a){var c=function(c,e){c.preventDefault||(c.preventDefault=function(){c.returnValue=!1});c.stopPropagation||(c.stopPropagation=function(){c.cancelBubble=!0});c.target||(c.target=c.srcElement||U);if(E(c.defaultPrevented)){var g=c.preventDefault;c.preventDefault=function(){c.defaultPrevented=!0;g.call(c)};c.defaultPrevented=!1}c.isDefaultPrevented=function(){return c.defaultPrevented||!1===c.returnValue};var f=Ub(a[e||
c.type]||[]);q(f,function(a){a.call(b,c)});8>=S?(c.preventDefault=null,c.stopPropagation=null,c.isDefaultPrevented=null):(delete c.preventDefault,delete c.stopPropagation,delete c.isDefaultPrevented)};c.elem=b;return c}function Ia(b){var a=typeof b,c;"object"==a&&null!==b?"function"==typeof(c=b.$$hashKey)?c=b.$$hashKey():c===s&&(c=b.$$hashKey=bb()):c=b;return a+":"+c}function Va(b){q(b,this.put,this)}function oc(b){var a,c;"function"==typeof b?(a=b.$inject)||(a=[],b.length&&(c=b.toString().replace(oe,
""),c=c.match(pe),q(c[1].split(qe),function(b){b.replace(re,function(b,c,d){a.push(d)})})),b.$inject=a):M(b)?(c=b.length-1,Ra(b[c],"fn"),a=b.slice(0,c)):Ra(b,"fn",!0);return a}function ac(b){function a(a){return function(b,c){if(X(b))q(b,Rb(a));else return a(b,c)}}function c(a,b){Aa(a,"service");if(P(b)||M(b))b=n.instantiate(b);if(!b.$get)throw Wa("pget",a);return m[a+h]=b}function d(a,b){return c(a,{$get:b})}function e(a){var b=[],c,d,g,h;q(a,function(a){if(!k.get(a)){k.put(a,!0);try{if(w(a))for(c=
Sa(a),b=b.concat(e(c.requires)).concat(c._runBlocks),d=c._invokeQueue,g=0,h=d.length;g<h;g++){var f=d[g],l=n.get(f[0]);l[f[1]].apply(l,f[2])}else P(a)?b.push(n.invoke(a)):M(a)?b.push(n.invoke(a)):Ra(a,"module")}catch(m){throw M(a)&&(a=a[a.length-1]),m.message&&(m.stack&&-1==m.stack.indexOf(m.message))&&(m=m.message+"\n"+m.stack),Wa("modulerr",a,m.stack||m.message||m);}}});return b}function g(a,b){function c(d){if(a.hasOwnProperty(d)){if(a[d]===f)throw Wa("cdep",l.join(" <- "));return a[d]}try{return l.unshift(d),
a[d]=f,a[d]=b(d)}catch(e){throw a[d]===f&&delete a[d],e;}finally{l.shift()}}function d(a,b,e){var g=[],h=oc(a),f,l,k;l=0;for(f=h.length;l<f;l++){k=h[l];if("string"!==typeof k)throw Wa("itkn",k);g.push(e&&e.hasOwnProperty(k)?e[k]:c(k))}a.$inject||(a=a[f]);return a.apply(b,g)}return{invoke:d,instantiate:function(a,b){var c=function(){},e;c.prototype=(M(a)?a[a.length-1]:a).prototype;c=new c;e=d(a,c,b);return X(e)||P(e)?e:c},get:c,annotate:oc,has:function(b){return m.hasOwnProperty(b+h)||a.hasOwnProperty(b)}}}
var f={},h="Provider",l=[],k=new Va,m={$provide:{provider:a(c),factory:a(d),service:a(function(a,b){return d(a,["$injector",function(a){return a.instantiate(b)}])}),value:a(function(a,b){return d(a,aa(b))}),constant:a(function(a,b){Aa(a,"constant");m[a]=b;p[a]=b}),decorator:function(a,b){var c=n.get(a+h),d=c.$get;c.$get=function(){var a=r.invoke(d,c);return r.invoke(b,null,{$delegate:a})}}}},n=m.$injector=g(m,function(){throw Wa("unpr",l.join(" <- "));}),p={},r=p.$injector=g(p,function(a){a=n.get(a+
h);return r.invoke(a.$get,a)});q(e(b),function(a){r.invoke(a||C)});return r}function Kd(){var b=!0;this.disableAutoScrolling=function(){b=!1};this.$get=["$window","$location","$rootScope",function(a,c,d){function e(a){var b=null;q(a,function(a){b||"a"!==K(a.nodeName)||(b=a)});return b}function g(){var b=c.hash(),d;b?(d=f.getElementById(b))?d.scrollIntoView():(d=e(f.getElementsByName(b)))?d.scrollIntoView():"top"===b&&a.scrollTo(0,0):a.scrollTo(0,0)}var f=a.document;b&&d.$watch(function(){return c.hash()},
function(){d.$evalAsync(g)});return g}]}function ge(){this.$get=["$$rAF","$timeout",function(b,a){return b.supported?function(a){return b(a)}:function(b){return a(b,0,!1)}}]}function se(b,a,c,d){function e(a){try{a.apply(null,ya.call(arguments,1))}finally{if(z--,0===z)for(;u.length;)try{u.pop()()}catch(b){c.error(b)}}}function g(a,b){(function T(){q(F,function(a){a()});v=b(T,a)})()}function f(){x=null;J!=h.url()&&(J=h.url(),q(ma,function(a){a(h.url())}))}var h=this,l=a[0],k=b.location,m=b.history,
n=b.setTimeout,p=b.clearTimeout,r={};h.isMock=!1;var z=0,u=[];h.$$completeOutstandingRequest=e;h.$$incOutstandingRequestCount=function(){z++};h.notifyWhenNoOutstandingRequests=function(a){q(F,function(a){a()});0===z?a():u.push(a)};var F=[],v;h.addPollFn=function(a){E(v)&&g(100,n);F.push(a);return a};var J=k.href,A=a.find("base"),x=null;h.url=function(a,c){k!==b.location&&(k=b.location);m!==b.history&&(m=b.history);if(a){if(J!=a)return J=a,d.history?c?m.replaceState(null,"",a):(m.pushState(null,"",
a),A.attr("href",A.attr("href"))):(x=a,c?k.replace(a):k.href=a),h}else return x||k.href.replace(/%27/g,"'")};var ma=[],L=!1;h.onUrlChange=function(a){if(!L){if(d.history)y(b).on("popstate",f);if(d.hashchange)y(b).on("hashchange",f);else h.addPollFn(f);L=!0}ma.push(a);return a};h.baseHref=function(){var a=A.attr("href");return a?a.replace(/^(https?\:)?\/\/[^\/]*/,""):""};var Q={},da="",H=h.baseHref();h.cookies=function(a,b){var d,e,g,h;if(a)b===s?l.cookie=escape(a)+"=;path="+H+";expires=Thu, 01 Jan 1970 00:00:00 GMT":
w(b)&&(d=(l.cookie=escape(a)+"="+escape(b)+";path="+H).length+1,4096<d&&c.warn("Cookie '"+a+"' possibly not set or overflowed because it was too large ("+d+" > 4096 bytes)!"));else{if(l.cookie!==da)for(da=l.cookie,d=da.split("; "),Q={},g=0;g<d.length;g++)e=d[g],h=e.indexOf("="),0<h&&(a=unescape(e.substring(0,h)),Q[a]===s&&(Q[a]=unescape(e.substring(h+1))));return Q}};h.defer=function(a,b){var c;z++;c=n(function(){delete r[c];e(a)},b||0);r[c]=!0;return c};h.defer.cancel=function(a){return r[a]?(delete r[a],
p(a),e(C),!0):!1}}function Md(){this.$get=["$window","$log","$sniffer","$document",function(b,a,c,d){return new se(b,d,a,c)}]}function Nd(){this.$get=function(){function b(b,d){function e(a){a!=n&&(p?p==a&&(p=a.n):p=a,g(a.n,a.p),g(a,n),n=a,n.n=null)}function g(a,b){a!=b&&(a&&(a.p=b),b&&(b.n=a))}if(b in a)throw t("$cacheFactory")("iid",b);var f=0,h=D({},d,{id:b}),l={},k=d&&d.capacity||Number.MAX_VALUE,m={},n=null,p=null;return a[b]={put:function(a,b){if(k<Number.MAX_VALUE){var c=m[a]||(m[a]={key:a});
e(c)}if(!E(b))return a in l||f++,l[a]=b,f>k&&this.remove(p.key),b},get:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;e(b)}return l[a]},remove:function(a){if(k<Number.MAX_VALUE){var b=m[a];if(!b)return;b==n&&(n=b.p);b==p&&(p=b.n);g(b.n,b.p);delete m[a]}delete l[a];f--},removeAll:function(){l={};f=0;m={};n=p=null},destroy:function(){m=h=l=null;delete a[b]},info:function(){return D({},h,{size:f})}}}var a={};b.info=function(){var b={};q(a,function(a,e){b[e]=a.info()});return b};b.get=function(b){return a[b]};
return b}}function ce(){this.$get=["$cacheFactory",function(b){return b("templates")}]}function cc(b,a){var c={},d="Directive",e=/^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,g=/(([\d\w\-_]+)(?:\:([^;]+))?;?)/,f=/^(on[a-z]+|formaction)$/;this.directive=function l(a,e){Aa(a,"directive");w(a)?(xb(e,"directiveFactory"),c.hasOwnProperty(a)||(c[a]=[],b.factory(a+d,["$injector","$exceptionHandler",function(b,d){var e=[];q(c[a],function(c,g){try{var f=b.invoke(c);P(f)?f={compile:aa(f)}:!f.compile&&f.link&&(f.compile=
aa(f.link));f.priority=f.priority||0;f.index=g;f.name=f.name||a;f.require=f.require||f.controller&&f.name;f.restrict=f.restrict||"A";e.push(f)}catch(l){d(l)}});return e}])),c[a].push(e)):q(a,Rb(l));return this};this.aHrefSanitizationWhitelist=function(b){return B(b)?(a.aHrefSanitizationWhitelist(b),this):a.aHrefSanitizationWhitelist()};this.imgSrcSanitizationWhitelist=function(b){return B(b)?(a.imgSrcSanitizationWhitelist(b),this):a.imgSrcSanitizationWhitelist()};this.$get=["$injector","$interpolate",
"$exceptionHandler","$http","$templateCache","$parse","$controller","$rootScope","$document","$sce","$animate","$$sanitizeUri",function(a,b,m,n,p,r,z,u,F,v,J,A){function x(a,b,c,d,e){a instanceof y||(a=y(a));q(a,function(b,c){3==b.nodeType&&b.nodeValue.match(/\S+/)&&(a[c]=y(b).wrap("<span></span>").parent()[0])});var g=L(a,b,a,c,d,e);ma(a,"ng-scope");return function(b,c,d){xb(b,"scope");var e=c?Ja.clone.call(a):a;q(d,function(a,b){e.data("$"+b+"Controller",a)});d=0;for(var f=e.length;d<f;d++){var l=
e[d].nodeType;1!==l&&9!==l||e.eq(d).data("$scope",b)}c&&c(e,b);g&&g(b,e,e);return e}}function ma(a,b){try{a.addClass(b)}catch(c){}}function L(a,b,c,d,e,g){function f(a,c,d,e){var g,k,m,r,n,p,z;g=c.length;var I=Array(g);for(n=0;n<g;n++)I[n]=c[n];z=n=0;for(p=l.length;n<p;z++)k=I[z],c=l[n++],g=l[n++],m=y(k),c?(c.scope?(r=a.$new(),m.data("$scope",r)):r=a,(m=c.transclude)||!e&&b?c(g,r,k,d,Q(a,m||b)):c(g,r,k,d,e)):g&&g(a,k.childNodes,s,e)}for(var l=[],k,m,r,n,p=0;p<a.length;p++)k=new Hb,m=da(a[p],[],k,
0===p?d:s,e),(g=m.length?ia(m,a[p],k,b,c,null,[],[],g):null)&&g.scope&&ma(y(a[p]),"ng-scope"),k=g&&g.terminal||!(r=a[p].childNodes)||!r.length?null:L(r,g?g.transclude:b),l.push(g,k),n=n||g||k,g=null;return n?f:null}function Q(a,b){return function(c,d,e){var g=!1;c||(c=a.$new(),g=c.$$transcluded=!0);d=b(c,d,e);if(g)d.on("$destroy",eb(c,c.$destroy));return d}}function da(a,b,c,d,f){var k=c.$attr,l;switch(a.nodeType){case 1:T(b,na(Ka(a).toLowerCase()),"E",d,f);var m,r,n;l=a.attributes;for(var p=0,z=
l&&l.length;p<z;p++){var u=!1,F=!1;m=l[p];if(!S||8<=S||m.specified){r=m.name;n=na(r);W.test(n)&&(r=fb(n.substr(6),"-"));var J=n.replace(/(Start|End)$/,"");n===J+"Start"&&(u=r,F=r.substr(0,r.length-5)+"end",r=r.substr(0,r.length-6));n=na(r.toLowerCase());k[n]=r;c[n]=m=ca(m.value);mc(a,n)&&(c[n]=!0);N(a,b,m,n);T(b,n,"A",d,f,u,F)}}a=a.className;if(w(a)&&""!==a)for(;l=g.exec(a);)n=na(l[2]),T(b,n,"C",d,f)&&(c[n]=ca(l[3])),a=a.substr(l.index+l[0].length);break;case 3:t(b,a.nodeValue);break;case 8:try{if(l=
e.exec(a.nodeValue))n=na(l[1]),T(b,n,"M",d,f)&&(c[n]=ca(l[2]))}catch(x){}}b.sort(E);return b}function H(a,b,c){var d=[],e=0;if(b&&a.hasAttribute&&a.hasAttribute(b)){do{if(!a)throw ja("uterdir",b,c);1==a.nodeType&&(a.hasAttribute(b)&&e++,a.hasAttribute(c)&&e--);d.push(a);a=a.nextSibling}while(0<e)}else d.push(a);return y(d)}function R(a,b,c){return function(d,e,g,f,l){e=H(e[0],b,c);return a(d,e,g,f,l)}}function ia(a,c,d,e,g,f,l,n,p){function u(a,b,c,d){if(a){c&&(a=R(a,c,d));a.require=G.require;if(Q===
G||G.$$isolateScope)a=qc(a,{isolateScope:!0});l.push(a)}if(b){c&&(b=R(b,c,d));b.require=G.require;if(Q===G||G.$$isolateScope)b=qc(b,{isolateScope:!0});n.push(b)}}function F(a,b,c){var d,e="data",g=!1;if(w(a)){for(;"^"==(d=a.charAt(0))||"?"==d;)a=a.substr(1),"^"==d&&(e="inheritedData"),g=g||"?"==d;d=null;c&&"data"===e&&(d=c[a]);d=d||b[e]("$"+a+"Controller");if(!d&&!g)throw ja("ctreq",a,t);}else M(a)&&(d=[],q(a,function(a){d.push(F(a,b,c))}));return d}function J(a,e,g,f,p){function u(a,b){var c;2>arguments.length&&
(b=a,a=s);D&&(c=lb);return p(a,b,c)}var I,x,v,A,R,H,lb={},da;I=c===g?d:Ub(d,new Hb(y(g),d.$attr));x=I.$$element;if(Q){var T=/^\s*([@=&])(\??)\s*(\w*)\s*$/;f=y(g);H=e.$new(!0);ia&&ia===Q.$$originalDirective?f.data("$isolateScope",H):f.data("$isolateScopeNoTemplate",H);ma(f,"ng-isolate-scope");q(Q.scope,function(a,c){var d=a.match(T)||[],g=d[3]||c,f="?"==d[2],d=d[1],l,m,n,p;H.$$isolateBindings[c]=d+g;switch(d){case "@":I.$observe(g,function(a){H[c]=a});I.$$observers[g].$$scope=e;I[g]&&(H[c]=b(I[g])(e));
break;case "=":if(f&&!I[g])break;m=r(I[g]);p=m.literal?xa:function(a,b){return a===b};n=m.assign||function(){l=H[c]=m(e);throw ja("nonassign",I[g],Q.name);};l=H[c]=m(e);H.$watch(function(){var a=m(e);p(a,H[c])||(p(a,l)?n(e,a=H[c]):H[c]=a);return l=a},null,m.literal);break;case "&":m=r(I[g]);H[c]=function(a){return m(e,a)};break;default:throw ja("iscp",Q.name,c,a);}})}da=p&&u;L&&q(L,function(a){var b={$scope:a===Q||a.$$isolateScope?H:e,$element:x,$attrs:I,$transclude:da},c;R=a.controller;"@"==R&&(R=
I[a.name]);c=z(R,b);lb[a.name]=c;D||x.data("$"+a.name+"Controller",c);a.controllerAs&&(b.$scope[a.controllerAs]=c)});f=0;for(v=l.length;f<v;f++)try{A=l[f],A(A.isolateScope?H:e,x,I,A.require&&F(A.require,x,lb),da)}catch(G){m(G,ha(x))}f=e;Q&&(Q.template||null===Q.templateUrl)&&(f=H);a&&a(f,g.childNodes,s,p);for(f=n.length-1;0<=f;f--)try{A=n[f],A(A.isolateScope?H:e,x,I,A.require&&F(A.require,x,lb),da)}catch(B){m(B,ha(x))}}p=p||{};for(var v=-Number.MAX_VALUE,A,L=p.controllerDirectives,Q=p.newIsolateScopeDirective,
ia=p.templateDirective,T=p.nonTlbTranscludeDirective,E=!1,D=p.hasElementTranscludeDirective,Z=d.$$element=y(c),G,t,V,Xa=e,O,N=0,S=a.length;N<S;N++){G=a[N];var ra=G.$$start,W=G.$$end;ra&&(Z=H(c,ra,W));V=s;if(v>G.priority)break;if(V=G.scope)A=A||G,G.templateUrl||(K("new/isolated scope",Q,G,Z),X(V)&&(Q=G));t=G.name;!G.templateUrl&&G.controller&&(V=G.controller,L=L||{},K("'"+t+"' controller",L[t],G,Z),L[t]=G);if(V=G.transclude)E=!0,G.$$tlb||(K("transclusion",T,G,Z),T=G),"element"==V?(D=!0,v=G.priority,
V=H(c,ra,W),Z=d.$$element=y(U.createComment(" "+t+": "+d[t]+" ")),c=Z[0],mb(g,y(ya.call(V,0)),c),Xa=x(V,e,v,f&&f.name,{nonTlbTranscludeDirective:T})):(V=y(Eb(c)).contents(),Z.empty(),Xa=x(V,e));if(G.template)if(K("template",ia,G,Z),ia=G,V=P(G.template)?G.template(Z,d):G.template,V=Y(V),G.replace){f=G;V=Cb.test(V)?y(V):[];c=V[0];if(1!=V.length||1!==c.nodeType)throw ja("tplrt",t,"");mb(g,Z,c);S={$attr:{}};V=da(c,[],S);var $=a.splice(N+1,a.length-(N+1));Q&&pc(V);a=a.concat(V).concat($);B(d,S);S=a.length}else Z.html(V);
if(G.templateUrl)K("template",ia,G,Z),ia=G,G.replace&&(f=G),J=C(a.splice(N,a.length-N),Z,d,g,Xa,l,n,{controllerDirectives:L,newIsolateScopeDirective:Q,templateDirective:ia,nonTlbTranscludeDirective:T}),S=a.length;else if(G.compile)try{O=G.compile(Z,d,Xa),P(O)?u(null,O,ra,W):O&&u(O.pre,O.post,ra,W)}catch(aa){m(aa,ha(Z))}G.terminal&&(J.terminal=!0,v=Math.max(v,G.priority))}J.scope=A&&!0===A.scope;J.transclude=E&&Xa;p.hasElementTranscludeDirective=D;return J}function pc(a){for(var b=0,c=a.length;b<c;b++)a[b]=
Tb(a[b],{$$isolateScope:!0})}function T(b,e,g,f,k,n,r){if(e===k)return null;k=null;if(c.hasOwnProperty(e)){var p;e=a.get(e+d);for(var z=0,u=e.length;z<u;z++)try{p=e[z],(f===s||f>p.priority)&&-1!=p.restrict.indexOf(g)&&(n&&(p=Tb(p,{$$start:n,$$end:r})),b.push(p),k=p)}catch(F){m(F)}}return k}function B(a,b){var c=b.$attr,d=a.$attr,e=a.$$element;q(a,function(d,e){"$"!=e.charAt(0)&&(b[e]&&(d+=("style"===e?";":" ")+b[e]),a.$set(e,d,!0,c[e]))});q(b,function(b,g){"class"==g?(ma(e,b),a["class"]=(a["class"]?
a["class"]+" ":"")+b):"style"==g?(e.attr("style",e.attr("style")+";"+b),a.style=(a.style?a.style+";":"")+b):"$"==g.charAt(0)||a.hasOwnProperty(g)||(a[g]=b,d[g]=c[g])})}function C(a,b,c,d,e,g,f,l){var k=[],m,r,z=b[0],u=a.shift(),F=D({},u,{templateUrl:null,transclude:null,replace:null,$$originalDirective:u}),x=P(u.templateUrl)?u.templateUrl(b,c):u.templateUrl;b.empty();n.get(v.getTrustedResourceUrl(x),{cache:p}).success(function(n){var p,J;n=Y(n);if(u.replace){n=Cb.test(n)?y(n):[];p=n[0];if(1!=n.length||
1!==p.nodeType)throw ja("tplrt",u.name,x);n={$attr:{}};mb(d,b,p);var v=da(p,[],n);X(u.scope)&&pc(v);a=v.concat(a);B(c,n)}else p=z,b.html(n);a.unshift(F);m=ia(a,p,c,e,b,u,g,f,l);q(d,function(a,c){a==p&&(d[c]=b[0])});for(r=L(b[0].childNodes,e);k.length;){n=k.shift();J=k.shift();var A=k.shift(),R=k.shift(),v=b[0];if(J!==z){var H=J.className;l.hasElementTranscludeDirective&&u.replace||(v=Eb(p));mb(A,y(J),v);ma(y(v),H)}J=m.transclude?Q(n,m.transclude):R;m(r,n,v,d,J)}k=null}).error(function(a,b,c,d){throw ja("tpload",
d.url);});return function(a,b,c,d,e){k?(k.push(b),k.push(c),k.push(d),k.push(e)):m(r,b,c,d,e)}}function E(a,b){var c=b.priority-a.priority;return 0!==c?c:a.name!==b.name?a.name<b.name?-1:1:a.index-b.index}function K(a,b,c,d){if(b)throw ja("multidir",b.name,c.name,a,ha(d));}function t(a,c){var d=b(c,!0);d&&a.push({priority:0,compile:aa(function(a,b){var c=b.parent(),e=c.data("$binding")||[];e.push(d);ma(c.data("$binding",e),"ng-binding");a.$watch(d,function(a){b[0].nodeValue=a})})})}function O(a,b){if("srcdoc"==
b)return v.HTML;var c=Ka(a);if("xlinkHref"==b||"FORM"==c&&"action"==b||"IMG"!=c&&("src"==b||"ngSrc"==b))return v.RESOURCE_URL}function N(a,c,d,e){var g=b(d,!0);if(g){if("multiple"===e&&"SELECT"===Ka(a))throw ja("selmulti",ha(a));c.push({priority:100,compile:function(){return{pre:function(c,d,l){d=l.$$observers||(l.$$observers={});if(f.test(e))throw ja("nodomevents");if(g=b(l[e],!0,O(a,e)))l[e]=g(c),(d[e]||(d[e]=[])).$$inter=!0,(l.$$observers&&l.$$observers[e].$$scope||c).$watch(g,function(a,b){"class"===
e&&a!=b?l.$updateClass(a,b):l.$set(e,a)})}}}})}}function mb(a,b,c){var d=b[0],e=b.length,g=d.parentNode,f,l;if(a)for(f=0,l=a.length;f<l;f++)if(a[f]==d){a[f++]=c;l=f+e-1;for(var k=a.length;f<k;f++,l++)l<k?a[f]=a[l]:delete a[f];a.length-=e-1;break}g&&g.replaceChild(c,d);a=U.createDocumentFragment();a.appendChild(d);c[y.expando]=d[y.expando];d=1;for(e=b.length;d<e;d++)g=b[d],y(g).remove(),a.appendChild(g),delete b[d];b[0]=c;b.length=1}function qc(a,b){return D(function(){return a.apply(null,arguments)},
a,b)}var Hb=function(a,b){this.$$element=a;this.$attr=b||{}};Hb.prototype={$normalize:na,$addClass:function(a){a&&0<a.length&&J.addClass(this.$$element,a)},$removeClass:function(a){a&&0<a.length&&J.removeClass(this.$$element,a)},$updateClass:function(a,b){var c=rc(a,b),d=rc(b,a);0===c.length?J.removeClass(this.$$element,d):0===d.length?J.addClass(this.$$element,c):J.setClass(this.$$element,c,d)},$set:function(a,b,c,d){var e=mc(this.$$element[0],a);e&&(this.$$element.prop(a,b),d=e);this[a]=b;d?this.$attr[a]=
d:(d=this.$attr[a])||(this.$attr[a]=d=fb(a,"-"));e=Ka(this.$$element);if("A"===e&&"href"===a||"IMG"===e&&"src"===a)this[a]=b=A(b,"src"===a);!1!==c&&(null===b||b===s?this.$$element.removeAttr(d):this.$$element.attr(d,b));(c=this.$$observers)&&q(c[a],function(a){try{a(b)}catch(c){m(c)}})},$observe:function(a,b){var c=this,d=c.$$observers||(c.$$observers={}),e=d[a]||(d[a]=[]);e.push(b);u.$evalAsync(function(){e.$$inter||b(c[a])});return b}};var Z=b.startSymbol(),ra=b.endSymbol(),Y="{{"==Z||"}}"==ra?
Da:function(a){return a.replace(/\{\{/g,Z).replace(/}}/g,ra)},W=/^ngAttr[A-Z]/;return x}]}function na(b){return Ta(b.replace(te,""))}function rc(b,a){var c="",d=b.split(/\s+/),e=a.split(/\s+/),g=0;a:for(;g<d.length;g++){for(var f=d[g],h=0;h<e.length;h++)if(f==e[h])continue a;c+=(0<c.length?" ":"")+f}return c}function Od(){var b={},a=/^(\S+)(\s+as\s+(\w+))?$/;this.register=function(a,d){Aa(a,"controller");X(a)?D(b,a):b[a]=d};this.$get=["$injector","$window",function(c,d){return function(e,g){var f,
h,l;w(e)&&(f=e.match(a),h=f[1],l=f[3],e=b.hasOwnProperty(h)?b[h]:bc(g.$scope,h,!0)||bc(d,h,!0),Ra(e,h,!0));f=c.instantiate(e,g);if(l){if(!g||"object"!=typeof g.$scope)throw t("$controller")("noscp",h||e.name,l);g.$scope[l]=f}return f}}]}function Pd(){this.$get=["$window",function(b){return y(b.document)}]}function Qd(){this.$get=["$log",function(b){return function(a,c){b.error.apply(b,arguments)}}]}function sc(b){var a={},c,d,e;if(!b)return a;q(b.split("\n"),function(b){e=b.indexOf(":");c=K(ca(b.substr(0,
e)));d=ca(b.substr(e+1));c&&(a[c]=a[c]?a[c]+(", "+d):d)});return a}function tc(b){var a=X(b)?b:s;return function(c){a||(a=sc(b));return c?a[K(c)]||null:a}}function uc(b,a,c){if(P(c))return c(b,a);q(c,function(c){b=c(b,a)});return b}function Td(){var b=/^\s*(\[|\{[^\{])/,a=/[\}\]]\s*$/,c=/^\)\]\}',?\n/,d={"Content-Type":"application/json;charset=utf-8"},e=this.defaults={transformResponse:[function(d){w(d)&&(d=d.replace(c,""),b.test(d)&&a.test(d)&&(d=Wb(d)));return d}],transformRequest:[function(a){return X(a)&&
"[object File]"!==wa.call(a)&&"[object Blob]"!==wa.call(a)?qa(a):a}],headers:{common:{Accept:"application/json, text/plain, */*"},post:ba(d),put:ba(d),patch:ba(d)},xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN"},g=this.interceptors=[],f=this.responseInterceptors=[];this.$get=["$httpBackend","$browser","$cacheFactory","$rootScope","$q","$injector",function(a,b,c,d,n,p){function r(a){function c(a){var b=D({},a,{data:uc(a.data,a.headers,d.transformResponse)});return 200<=a.status&&300>a.status?
b:n.reject(b)}var d={method:"get",transformRequest:e.transformRequest,transformResponse:e.transformResponse},g=function(a){function b(a){var c;q(a,function(b,d){P(b)&&(c=b(),null!=c?a[d]=c:delete a[d])})}var c=e.headers,d=D({},a.headers),g,f,c=D({},c.common,c[K(a.method)]);b(c);b(d);a:for(g in c){a=K(g);for(f in d)if(K(f)===a)continue a;d[g]=c[g]}return d}(a);D(d,a);d.headers=g;d.method=Fa(d.method);(a=Ib(d.url)?b.cookies()[d.xsrfCookieName||e.xsrfCookieName]:s)&&(g[d.xsrfHeaderName||e.xsrfHeaderName]=
a);var f=[function(a){g=a.headers;var b=uc(a.data,tc(g),a.transformRequest);E(a.data)&&q(g,function(a,b){"content-type"===K(b)&&delete g[b]});E(a.withCredentials)&&!E(e.withCredentials)&&(a.withCredentials=e.withCredentials);return z(a,b,g).then(c,c)},s],h=n.when(d);for(q(v,function(a){(a.request||a.requestError)&&f.unshift(a.request,a.requestError);(a.response||a.responseError)&&f.push(a.response,a.responseError)});f.length;){a=f.shift();var k=f.shift(),h=h.then(a,k)}h.success=function(a){h.then(function(b){a(b.data,
b.status,b.headers,d)});return h};h.error=function(a){h.then(null,function(b){a(b.data,b.status,b.headers,d)});return h};return h}function z(b,c,g){function f(a,b,c,e){v&&(200<=a&&300>a?v.put(s,[a,b,sc(c),e]):v.remove(s));l(b,a,c,e);d.$$phase||d.$apply()}function l(a,c,d,e){c=Math.max(c,0);(200<=c&&300>c?p.resolve:p.reject)({data:a,status:c,headers:tc(d),config:b,statusText:e})}function k(){var a=db(r.pendingRequests,b);-1!==a&&r.pendingRequests.splice(a,1)}var p=n.defer(),z=p.promise,v,q,s=u(b.url,
b.params);r.pendingRequests.push(b);z.then(k,k);(b.cache||e.cache)&&(!1!==b.cache&&"GET"==b.method)&&(v=X(b.cache)?b.cache:X(e.cache)?e.cache:F);if(v)if(q=v.get(s),B(q)){if(q.then)return q.then(k,k),q;M(q)?l(q[1],q[0],ba(q[2]),q[3]):l(q,200,{},"OK")}else v.put(s,z);E(q)&&a(b.method,s,c,f,g,b.timeout,b.withCredentials,b.responseType);return z}function u(a,b){if(!b)return a;var c=[];Sc(b,function(a,b){null===a||E(a)||(M(a)||(a=[a]),q(a,function(a){X(a)&&(a=qa(a));c.push(za(b)+"="+za(a))}))});0<c.length&&
(a+=(-1==a.indexOf("?")?"?":"&")+c.join("&"));return a}var F=c("$http"),v=[];q(g,function(a){v.unshift(w(a)?p.get(a):p.invoke(a))});q(f,function(a,b){var c=w(a)?p.get(a):p.invoke(a);v.splice(b,0,{response:function(a){return c(n.when(a))},responseError:function(a){return c(n.reject(a))}})});r.pendingRequests=[];(function(a){q(arguments,function(a){r[a]=function(b,c){return r(D(c||{},{method:a,url:b}))}})})("get","delete","head","jsonp");(function(a){q(arguments,function(a){r[a]=function(b,c,d){return r(D(d||
{},{method:a,url:b,data:c}))}})})("post","put");r.defaults=e;return r}]}function ue(b){if(8>=S&&(!b.match(/^(get|post|head|put|delete|options)$/i)||!O.XMLHttpRequest))return new O.ActiveXObject("Microsoft.XMLHTTP");if(O.XMLHttpRequest)return new O.XMLHttpRequest;throw t("$httpBackend")("noxhr");}function Ud(){this.$get=["$browser","$window","$document",function(b,a,c){return ve(b,ue,b.defer,a.angular.callbacks,c[0])}]}function ve(b,a,c,d,e){function g(a,b){var c=e.createElement("script"),d=function(){c.onreadystatechange=
c.onload=c.onerror=null;e.body.removeChild(c);b&&b()};c.type="text/javascript";c.src=a;S&&8>=S?c.onreadystatechange=function(){/loaded|complete/.test(c.readyState)&&d()}:c.onload=c.onerror=function(){d()};e.body.appendChild(c);return d}var f=-1;return function(e,l,k,m,n,p,r,z){function u(){v=f;A&&A();x&&x.abort()}function F(a,d,e,g,f){L&&c.cancel(L);A=x=null;0===d&&(d=e?200:"file"==sa(l).protocol?404:0);a(1223===d?204:d,e,g,f||"");b.$$completeOutstandingRequest(C)}var v;b.$$incOutstandingRequestCount();
l=l||b.url();if("jsonp"==K(e)){var J="_"+(d.counter++).toString(36);d[J]=function(a){d[J].data=a};var A=g(l.replace("JSON_CALLBACK","angular.callbacks."+J),function(){d[J].data?F(m,200,d[J].data):F(m,v||-2);d[J]=Ea.noop})}else{var x=a(e);x.open(e,l,!0);q(n,function(a,b){B(a)&&x.setRequestHeader(b,a)});x.onreadystatechange=function(){if(x&&4==x.readyState){var a=null,b=null;v!==f&&(a=x.getAllResponseHeaders(),b="response"in x?x.response:x.responseText);F(m,v||x.status,b,a,x.statusText||"")}};r&&(x.withCredentials=
!0);if(z)try{x.responseType=z}catch(s){if("json"!==z)throw s;}x.send(k||null)}if(0<p)var L=c(u,p);else p&&p.then&&p.then(u)}}function Rd(){var b="{{",a="}}";this.startSymbol=function(a){return a?(b=a,this):b};this.endSymbol=function(b){return b?(a=b,this):a};this.$get=["$parse","$exceptionHandler","$sce",function(c,d,e){function g(g,k,m){for(var n,p,r=0,z=[],u=g.length,F=!1,v=[];r<u;)-1!=(n=g.indexOf(b,r))&&-1!=(p=g.indexOf(a,n+f))?(r!=n&&z.push(g.substring(r,n)),z.push(r=c(F=g.substring(n+f,p))),
r.exp=F,r=p+h,F=!0):(r!=u&&z.push(g.substring(r)),r=u);(u=z.length)||(z.push(""),u=1);if(m&&1<z.length)throw vc("noconcat",g);if(!k||F)return v.length=u,r=function(a){try{for(var b=0,c=u,f;b<c;b++)"function"==typeof(f=z[b])&&(f=f(a),f=m?e.getTrusted(m,f):e.valueOf(f),null===f||E(f)?f="":"string"!=typeof f&&(f=qa(f))),v[b]=f;return v.join("")}catch(h){a=vc("interr",g,h.toString()),d(a)}},r.exp=g,r.parts=z,r}var f=b.length,h=a.length;g.startSymbol=function(){return b};g.endSymbol=function(){return a};
return g}]}function Sd(){this.$get=["$rootScope","$window","$q",function(b,a,c){function d(d,f,h,l){var k=a.setInterval,m=a.clearInterval,n=c.defer(),p=n.promise,r=0,z=B(l)&&!l;h=B(h)?h:0;p.then(null,null,d);p.$$intervalId=k(function(){n.notify(r++);0<h&&r>=h&&(n.resolve(r),m(p.$$intervalId),delete e[p.$$intervalId]);z||b.$apply()},f);e[p.$$intervalId]=n;return p}var e={};d.cancel=function(a){return a&&a.$$intervalId in e?(e[a.$$intervalId].reject("canceled"),clearInterval(a.$$intervalId),delete e[a.$$intervalId],
!0):!1};return d}]}function ad(){this.$get=function(){return{id:"en-us",NUMBER_FORMATS:{DECIMAL_SEP:".",GROUP_SEP:",",PATTERNS:[{minInt:1,minFrac:0,maxFrac:3,posPre:"",posSuf:"",negPre:"-",negSuf:"",gSize:3,lgSize:3},{minInt:1,minFrac:2,maxFrac:2,posPre:"\u00a4",posSuf:"",negPre:"(\u00a4",negSuf:")",gSize:3,lgSize:3}],CURRENCY_SYM:"$"},DATETIME_FORMATS:{MONTH:"January February March April May June July August September October November December".split(" "),SHORTMONTH:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
DAY:"Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),SHORTDAY:"Sun Mon Tue Wed Thu Fri Sat".split(" "),AMPMS:["AM","PM"],medium:"MMM d, y h:mm:ss a","short":"M/d/yy h:mm a",fullDate:"EEEE, MMMM d, y",longDate:"MMMM d, y",mediumDate:"MMM d, y",shortDate:"M/d/yy",mediumTime:"h:mm:ss a",shortTime:"h:mm a"},pluralCat:function(b){return 1===b?"one":"other"}}}}function wc(b){b=b.split("/");for(var a=b.length;a--;)b[a]=wb(b[a]);return b.join("/")}function xc(b,a,c){b=sa(b,c);a.$$protocol=
b.protocol;a.$$host=b.hostname;a.$$port=Y(b.port)||we[b.protocol]||null}function yc(b,a,c){var d="/"!==b.charAt(0);d&&(b="/"+b);b=sa(b,c);a.$$path=decodeURIComponent(d&&"/"===b.pathname.charAt(0)?b.pathname.substring(1):b.pathname);a.$$search=Yb(b.search);a.$$hash=decodeURIComponent(b.hash);a.$$path&&"/"!=a.$$path.charAt(0)&&(a.$$path="/"+a.$$path)}function oa(b,a){if(0===a.indexOf(b))return a.substr(b.length)}function Ya(b){var a=b.indexOf("#");return-1==a?b:b.substr(0,a)}function Jb(b){return b.substr(0,
Ya(b).lastIndexOf("/")+1)}function zc(b,a){this.$$html5=!0;a=a||"";var c=Jb(b);xc(b,this,b);this.$$parse=function(a){var e=oa(c,a);if(!w(e))throw Kb("ipthprfx",a,c);yc(e,this,b);this.$$path||(this.$$path="/");this.$$compose()};this.$$compose=function(){var a=Zb(this.$$search),b=this.$$hash?"#"+wb(this.$$hash):"";this.$$url=wc(this.$$path)+(a?"?"+a:"")+b;this.$$absUrl=c+this.$$url.substr(1)};this.$$rewrite=function(d){var e;if((e=oa(b,d))!==s)return d=e,(e=oa(a,e))!==s?c+(oa("/",e)||e):b+d;if((e=oa(c,
d))!==s)return c+e;if(c==d+"/")return c}}function Lb(b,a){var c=Jb(b);xc(b,this,b);this.$$parse=function(d){var e=oa(b,d)||oa(c,d),e="#"==e.charAt(0)?oa(a,e):this.$$html5?e:"";if(!w(e))throw Kb("ihshprfx",d,a);yc(e,this,b);d=this.$$path;var g=/^\/?.*?:(\/.*)/;0===e.indexOf(b)&&(e=e.replace(b,""));g.exec(e)||(d=(e=g.exec(d))?e[1]:d);this.$$path=d;this.$$compose()};this.$$compose=function(){var c=Zb(this.$$search),e=this.$$hash?"#"+wb(this.$$hash):"";this.$$url=wc(this.$$path)+(c?"?"+c:"")+e;this.$$absUrl=
b+(this.$$url?a+this.$$url:"")};this.$$rewrite=function(a){if(Ya(b)==Ya(a))return a}}function Ac(b,a){this.$$html5=!0;Lb.apply(this,arguments);var c=Jb(b);this.$$rewrite=function(d){var e;if(b==Ya(d))return d;if(e=oa(c,d))return b+a+e;if(c===d+"/")return c}}function nb(b){return function(){return this[b]}}function Bc(b,a){return function(c){if(E(c))return this[b];this[b]=a(c);this.$$compose();return this}}function Vd(){var b="",a=!1;this.hashPrefix=function(a){return B(a)?(b=a,this):b};this.html5Mode=
function(b){return B(b)?(a=b,this):a};this.$get=["$rootScope","$browser","$sniffer","$rootElement",function(c,d,e,g){function f(a){c.$broadcast("$locationChangeSuccess",h.absUrl(),a)}var h,l=d.baseHref(),k=d.url();a?(l=k.substring(0,k.indexOf("/",k.indexOf("//")+2))+(l||"/"),e=e.history?zc:Ac):(l=Ya(k),e=Lb);h=new e(l,"#"+b);h.$$parse(h.$$rewrite(k));g.on("click",function(a){if(!a.ctrlKey&&!a.metaKey&&2!=a.which){for(var b=y(a.target);"a"!==K(b[0].nodeName);)if(b[0]===g[0]||!(b=b.parent())[0])return;
var e=b.prop("href");X(e)&&"[object SVGAnimatedString]"===e.toString()&&(e=sa(e.animVal).href);var f=h.$$rewrite(e);e&&(!b.attr("target")&&f&&!a.isDefaultPrevented())&&(a.preventDefault(),f!=d.url()&&(h.$$parse(f),c.$apply(),O.angular["ff-684208-preventDefault"]=!0))}});h.absUrl()!=k&&d.url(h.absUrl(),!0);d.onUrlChange(function(a){h.absUrl()!=a&&(c.$evalAsync(function(){var b=h.absUrl();h.$$parse(a);c.$broadcast("$locationChangeStart",a,b).defaultPrevented?(h.$$parse(b),d.url(b)):f(b)}),c.$$phase||
c.$digest())});var m=0;c.$watch(function(){var a=d.url(),b=h.$$replace;m&&a==h.absUrl()||(m++,c.$evalAsync(function(){c.$broadcast("$locationChangeStart",h.absUrl(),a).defaultPrevented?h.$$parse(a):(d.url(h.absUrl(),b),f(a))}));h.$$replace=!1;return m});return h}]}function Wd(){var b=!0,a=this;this.debugEnabled=function(a){return B(a)?(b=a,this):b};this.$get=["$window",function(c){function d(a){a instanceof Error&&(a.stack?a=a.message&&-1===a.stack.indexOf(a.message)?"Error: "+a.message+"\n"+a.stack:
a.stack:a.sourceURL&&(a=a.message+"\n"+a.sourceURL+":"+a.line));return a}function e(a){var b=c.console||{},e=b[a]||b.log||C;a=!1;try{a=!!e.apply}catch(l){}return a?function(){var a=[];q(arguments,function(b){a.push(d(b))});return e.apply(b,a)}:function(a,b){e(a,null==b?"":b)}}return{log:e("log"),info:e("info"),warn:e("warn"),error:e("error"),debug:function(){var c=e("debug");return function(){b&&c.apply(a,arguments)}}()}}]}function fa(b,a){if("constructor"===b)throw Ba("isecfld",a);return b}function Za(b,
a){if(b){if(b.constructor===b)throw Ba("isecfn",a);if(b.document&&b.location&&b.alert&&b.setInterval)throw Ba("isecwindow",a);if(b.children&&(b.nodeName||b.prop&&b.attr&&b.find))throw Ba("isecdom",a);}return b}function ob(b,a,c,d,e){e=e||{};a=a.split(".");for(var g,f=0;1<a.length;f++){g=fa(a.shift(),d);var h=b[g];h||(h={},b[g]=h);b=h;b.then&&e.unwrapPromises&&(ta(d),"$$v"in b||function(a){a.then(function(b){a.$$v=b})}(b),b.$$v===s&&(b.$$v={}),b=b.$$v)}g=fa(a.shift(),d);return b[g]=c}function Cc(b,
a,c,d,e,g,f){fa(b,g);fa(a,g);fa(c,g);fa(d,g);fa(e,g);return f.unwrapPromises?function(f,l){var k=l&&l.hasOwnProperty(b)?l:f,m;if(null==k)return k;(k=k[b])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!a)return k;if(null==k)return s;(k=k[a])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!c)return k;if(null==k)return s;(k=k[c])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!d)return k;if(null==
k)return s;(k=k[d])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);if(!e)return k;if(null==k)return s;(k=k[e])&&k.then&&(ta(g),"$$v"in k||(m=k,m.$$v=s,m.then(function(a){m.$$v=a})),k=k.$$v);return k}:function(g,f){var k=f&&f.hasOwnProperty(b)?f:g;if(null==k)return k;k=k[b];if(!a)return k;if(null==k)return s;k=k[a];if(!c)return k;if(null==k)return s;k=k[c];if(!d)return k;if(null==k)return s;k=k[d];return e?null==k?s:k=k[e]:k}}function xe(b,a){fa(b,a);return function(a,
d){return null==a?s:(d&&d.hasOwnProperty(b)?d:a)[b]}}function ye(b,a,c){fa(b,c);fa(a,c);return function(c,e){if(null==c)return s;c=(e&&e.hasOwnProperty(b)?e:c)[b];return null==c?s:c[a]}}function Dc(b,a,c){if(Mb.hasOwnProperty(b))return Mb[b];var d=b.split("."),e=d.length,g;if(a.unwrapPromises||1!==e)if(a.unwrapPromises||2!==e)if(a.csp)g=6>e?Cc(d[0],d[1],d[2],d[3],d[4],c,a):function(b,g){var f=0,h;do h=Cc(d[f++],d[f++],d[f++],d[f++],d[f++],c,a)(b,g),g=s,b=h;while(f<e);return h};else{var f="var p;\n";
q(d,function(b,d){fa(b,c);f+="if(s == null) return undefined;\ns="+(d?"s":'((k&&k.hasOwnProperty("'+b+'"))?k:s)')+'["'+b+'"];\n'+(a.unwrapPromises?'if (s && s.then) {\n pw("'+c.replace(/(["\r\n])/g,"\\$1")+'");\n if (!("$$v" in s)) {\n p=s;\n p.$$v = undefined;\n p.then(function(v) {p.$$v=v;});\n}\n s=s.$$v\n}\n':"")});var f=f+"return s;",h=new Function("s","k","pw",f);h.toString=aa(f);g=a.unwrapPromises?function(a,b){return h(a,b,ta)}:h}else g=ye(d[0],d[1],c);else g=xe(d[0],c);"hasOwnProperty"!==
b&&(Mb[b]=g);return g}function Xd(){var b={},a={csp:!1,unwrapPromises:!1,logPromiseWarnings:!0};this.unwrapPromises=function(b){return B(b)?(a.unwrapPromises=!!b,this):a.unwrapPromises};this.logPromiseWarnings=function(b){return B(b)?(a.logPromiseWarnings=b,this):a.logPromiseWarnings};this.$get=["$filter","$sniffer","$log",function(c,d,e){a.csp=d.csp;ta=function(b){a.logPromiseWarnings&&!Ec.hasOwnProperty(b)&&(Ec[b]=!0,e.warn("[$parse] Promise found in the expression `"+b+"`. Automatic unwrapping of promises in Angular expressions is deprecated."))};
return function(d){var e;switch(typeof d){case "string":if(b.hasOwnProperty(d))return b[d];e=new Nb(a);e=(new $a(e,c,a)).parse(d,!1);"hasOwnProperty"!==d&&(b[d]=e);return e;case "function":return d;default:return C}}}]}function Zd(){this.$get=["$rootScope","$exceptionHandler",function(b,a){return ze(function(a){b.$evalAsync(a)},a)}]}function ze(b,a){function c(a){return a}function d(a){return f(a)}var e=function(){var f=[],k,m;return m={resolve:function(a){if(f){var c=f;f=s;k=g(a);c.length&&b(function(){for(var a,
b=0,d=c.length;b<d;b++)a=c[b],k.then(a[0],a[1],a[2])})}},reject:function(a){m.resolve(h(a))},notify:function(a){if(f){var c=f;f.length&&b(function(){for(var b,d=0,e=c.length;d<e;d++)b=c[d],b[2](a)})}},promise:{then:function(b,g,h){var m=e(),u=function(d){try{m.resolve((P(b)?b:c)(d))}catch(e){m.reject(e),a(e)}},F=function(b){try{m.resolve((P(g)?g:d)(b))}catch(c){m.reject(c),a(c)}},v=function(b){try{m.notify((P(h)?h:c)(b))}catch(d){a(d)}};f?f.push([u,F,v]):k.then(u,F,v);return m.promise},"catch":function(a){return this.then(null,
a)},"finally":function(a){function b(a,c){var d=e();c?d.resolve(a):d.reject(a);return d.promise}function d(e,g){var f=null;try{f=(a||c)()}catch(h){return b(h,!1)}return f&&P(f.then)?f.then(function(){return b(e,g)},function(a){return b(a,!1)}):b(e,g)}return this.then(function(a){return d(a,!0)},function(a){return d(a,!1)})}}}},g=function(a){return a&&P(a.then)?a:{then:function(c){var d=e();b(function(){d.resolve(c(a))});return d.promise}}},f=function(a){var b=e();b.reject(a);return b.promise},h=function(c){return{then:function(g,
f){var h=e();b(function(){try{h.resolve((P(f)?f:d)(c))}catch(b){h.reject(b),a(b)}});return h.promise}}};return{defer:e,reject:f,when:function(h,k,m,n){var p=e(),r,z=function(b){try{return(P(k)?k:c)(b)}catch(d){return a(d),f(d)}},u=function(b){try{return(P(m)?m:d)(b)}catch(c){return a(c),f(c)}},F=function(b){try{return(P(n)?n:c)(b)}catch(d){a(d)}};b(function(){g(h).then(function(a){r||(r=!0,p.resolve(g(a).then(z,u,F)))},function(a){r||(r=!0,p.resolve(u(a)))},function(a){r||p.notify(F(a))})});return p.promise},
all:function(a){var b=e(),c=0,d=M(a)?[]:{};q(a,function(a,e){c++;g(a).then(function(a){d.hasOwnProperty(e)||(d[e]=a,--c||b.resolve(d))},function(a){d.hasOwnProperty(e)||b.reject(a)})});0===c&&b.resolve(d);return b.promise}}}function fe(){this.$get=["$window","$timeout",function(b,a){var c=b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame,d=b.cancelAnimationFrame||b.webkitCancelAnimationFrame||b.mozCancelAnimationFrame||b.webkitCancelRequestAnimationFrame,e=!!c,g=e?
function(a){var b=c(a);return function(){d(b)}}:function(b){var c=a(b,16.66,!1);return function(){a.cancel(c)}};g.supported=e;return g}]}function Yd(){var b=10,a=t("$rootScope"),c=null;this.digestTtl=function(a){arguments.length&&(b=a);return b};this.$get=["$injector","$exceptionHandler","$parse","$browser",function(d,e,g,f){function h(){this.$id=bb();this.$$phase=this.$parent=this.$$watchers=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=null;this["this"]=this.$root=this;
this.$$destroyed=!1;this.$$asyncQueue=[];this.$$postDigestQueue=[];this.$$listeners={};this.$$listenerCount={};this.$$isolateBindings={}}function l(b){if(p.$$phase)throw a("inprog",p.$$phase);p.$$phase=b}function k(a,b){var c=g(a);Ra(c,b);return c}function m(a,b,c){do a.$$listenerCount[c]-=b,0===a.$$listenerCount[c]&&delete a.$$listenerCount[c];while(a=a.$parent)}function n(){}h.prototype={constructor:h,$new:function(a){a?(a=new h,a.$root=this.$root,a.$$asyncQueue=this.$$asyncQueue,a.$$postDigestQueue=
this.$$postDigestQueue):(a=function(){},a.prototype=this,a=new a,a.$id=bb());a["this"]=a;a.$$listeners={};a.$$listenerCount={};a.$parent=this;a.$$watchers=a.$$nextSibling=a.$$childHead=a.$$childTail=null;a.$$prevSibling=this.$$childTail;this.$$childHead?this.$$childTail=this.$$childTail.$$nextSibling=a:this.$$childHead=this.$$childTail=a;return a},$watch:function(a,b,d){var e=k(a,"watch"),g=this.$$watchers,f={fn:b,last:n,get:e,exp:a,eq:!!d};c=null;if(!P(b)){var h=k(b||C,"listener");f.fn=function(a,
b,c){h(c)}}if("string"==typeof a&&e.constant){var l=f.fn;f.fn=function(a,b,c){l.call(this,a,b,c);Oa(g,f)}}g||(g=this.$$watchers=[]);g.unshift(f);return function(){Oa(g,f);c=null}},$watchCollection:function(a,b){var c=this,d,e,f,h=1<b.length,l=0,k=g(a),m=[],n={},p=!0,q=0;return this.$watch(function(){d=k(c);var a,b;if(X(d))if(ab(d))for(e!==m&&(e=m,q=e.length=0,l++),a=d.length,q!==a&&(l++,e.length=q=a),b=0;b<a;b++)e[b]!==e[b]&&d[b]!==d[b]||e[b]===d[b]||(l++,e[b]=d[b]);else{e!==n&&(e=n={},q=0,l++);a=
0;for(b in d)d.hasOwnProperty(b)&&(a++,e.hasOwnProperty(b)?e[b]!==d[b]&&(l++,e[b]=d[b]):(q++,e[b]=d[b],l++));if(q>a)for(b in l++,e)e.hasOwnProperty(b)&&!d.hasOwnProperty(b)&&(q--,delete e[b])}else e!==d&&(e=d,l++);return l},function(){p?(p=!1,b(d,d,c)):b(d,f,c);if(h)if(X(d))if(ab(d)){f=Array(d.length);for(var a=0;a<d.length;a++)f[a]=d[a]}else for(a in f={},d)Fc.call(d,a)&&(f[a]=d[a]);else f=d})},$digest:function(){var d,g,f,h,k=this.$$asyncQueue,m=this.$$postDigestQueue,q,x,s=b,L,Q=[],y,H,R;l("$digest");
c=null;do{x=!1;for(L=this;k.length;){try{R=k.shift(),R.scope.$eval(R.expression)}catch(B){p.$$phase=null,e(B)}c=null}a:do{if(h=L.$$watchers)for(q=h.length;q--;)try{if(d=h[q])if((g=d.get(L))!==(f=d.last)&&!(d.eq?xa(g,f):"number"==typeof g&&"number"==typeof f&&isNaN(g)&&isNaN(f)))x=!0,c=d,d.last=d.eq?ba(g):g,d.fn(g,f===n?g:f,L),5>s&&(y=4-s,Q[y]||(Q[y]=[]),H=P(d.exp)?"fn: "+(d.exp.name||d.exp.toString()):d.exp,H+="; newVal: "+qa(g)+"; oldVal: "+qa(f),Q[y].push(H));else if(d===c){x=!1;break a}}catch(w){p.$$phase=
null,e(w)}if(!(h=L.$$childHead||L!==this&&L.$$nextSibling))for(;L!==this&&!(h=L.$$nextSibling);)L=L.$parent}while(L=h);if((x||k.length)&&!s--)throw p.$$phase=null,a("infdig",b,qa(Q));}while(x||k.length);for(p.$$phase=null;m.length;)try{m.shift()()}catch(T){e(T)}},$destroy:function(){if(!this.$$destroyed){var a=this.$parent;this.$broadcast("$destroy");this.$$destroyed=!0;this!==p&&(q(this.$$listenerCount,eb(null,m,this)),a.$$childHead==this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&
(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$parent=this.$$nextSibling=this.$$prevSibling=this.$$childHead=this.$$childTail=this.$root=null,this.$$listeners={},this.$$watchers=this.$$asyncQueue=this.$$postDigestQueue=[],this.$destroy=this.$digest=this.$apply=C,this.$on=this.$watch=function(){return C})}},$eval:function(a,b){return g(a)(this,b)},$evalAsync:function(a){p.$$phase||
p.$$asyncQueue.length||f.defer(function(){p.$$asyncQueue.length&&p.$digest()});this.$$asyncQueue.push({scope:this,expression:a})},$$postDigest:function(a){this.$$postDigestQueue.push(a)},$apply:function(a){try{return l("$apply"),this.$eval(a)}catch(b){e(b)}finally{p.$$phase=null;try{p.$digest()}catch(c){throw e(c),c;}}},$on:function(a,b){var c=this.$$listeners[a];c||(this.$$listeners[a]=c=[]);c.push(b);var d=this;do d.$$listenerCount[a]||(d.$$listenerCount[a]=0),d.$$listenerCount[a]++;while(d=d.$parent);
var e=this;return function(){c[db(c,b)]=null;m(e,1,a)}},$emit:function(a,b){var c=[],d,g=this,f=!1,h={name:a,targetScope:g,stopPropagation:function(){f=!0},preventDefault:function(){h.defaultPrevented=!0},defaultPrevented:!1},l=[h].concat(ya.call(arguments,1)),k,m;do{d=g.$$listeners[a]||c;h.currentScope=g;k=0;for(m=d.length;k<m;k++)if(d[k])try{d[k].apply(null,l)}catch(n){e(n)}else d.splice(k,1),k--,m--;if(f)break;g=g.$parent}while(g);return h},$broadcast:function(a,b){for(var c=this,d=this,g={name:a,
targetScope:this,preventDefault:function(){g.defaultPrevented=!0},defaultPrevented:!1},f=[g].concat(ya.call(arguments,1)),h,k;c=d;){g.currentScope=c;d=c.$$listeners[a]||[];h=0;for(k=d.length;h<k;h++)if(d[h])try{d[h].apply(null,f)}catch(l){e(l)}else d.splice(h,1),h--,k--;if(!(d=c.$$listenerCount[a]&&c.$$childHead||c!==this&&c.$$nextSibling))for(;c!==this&&!(d=c.$$nextSibling);)c=c.$parent}return g}};var p=new h;return p}]}function bd(){var b=/^\s*(https?|ftp|mailto|tel|file):/,a=/^\s*(https?|ftp|file):|data:image\//;
this.aHrefSanitizationWhitelist=function(a){return B(a)?(b=a,this):b};this.imgSrcSanitizationWhitelist=function(b){return B(b)?(a=b,this):a};this.$get=function(){return function(c,d){var e=d?a:b,g;if(!S||8<=S)if(g=sa(c).href,""!==g&&!g.match(e))return"unsafe:"+g;return c}}}function Ae(b){if("self"===b)return b;if(w(b)){if(-1<b.indexOf("***"))throw ua("iwcard",b);b=b.replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08").replace("\\*\\*",".*").replace("\\*","[^:/.?&;]*");return RegExp("^"+
b+"$")}if(cb(b))return RegExp("^"+b.source+"$");throw ua("imatcher");}function Gc(b){var a=[];B(b)&&q(b,function(b){a.push(Ae(b))});return a}function ae(){this.SCE_CONTEXTS=ga;var b=["self"],a=[];this.resourceUrlWhitelist=function(a){arguments.length&&(b=Gc(a));return b};this.resourceUrlBlacklist=function(b){arguments.length&&(a=Gc(b));return a};this.$get=["$injector",function(c){function d(a){var b=function(a){this.$$unwrapTrustedValue=function(){return a}};a&&(b.prototype=new a);b.prototype.valueOf=
function(){return this.$$unwrapTrustedValue()};b.prototype.toString=function(){return this.$$unwrapTrustedValue().toString()};return b}var e=function(a){throw ua("unsafe");};c.has("$sanitize")&&(e=c.get("$sanitize"));var g=d(),f={};f[ga.HTML]=d(g);f[ga.CSS]=d(g);f[ga.URL]=d(g);f[ga.JS]=d(g);f[ga.RESOURCE_URL]=d(f[ga.URL]);return{trustAs:function(a,b){var c=f.hasOwnProperty(a)?f[a]:null;if(!c)throw ua("icontext",a,b);if(null===b||b===s||""===b)return b;if("string"!==typeof b)throw ua("itype",a);return new c(b)},
getTrusted:function(c,d){if(null===d||d===s||""===d)return d;var g=f.hasOwnProperty(c)?f[c]:null;if(g&&d instanceof g)return d.$$unwrapTrustedValue();if(c===ga.RESOURCE_URL){var g=sa(d.toString()),m,n,p=!1;m=0;for(n=b.length;m<n;m++)if("self"===b[m]?Ib(g):b[m].exec(g.href)){p=!0;break}if(p)for(m=0,n=a.length;m<n;m++)if("self"===a[m]?Ib(g):a[m].exec(g.href)){p=!1;break}if(p)return d;throw ua("insecurl",d.toString());}if(c===ga.HTML)return e(d);throw ua("unsafe");},valueOf:function(a){return a instanceof
g?a.$$unwrapTrustedValue():a}}}]}function $d(){var b=!0;this.enabled=function(a){arguments.length&&(b=!!a);return b};this.$get=["$parse","$sniffer","$sceDelegate",function(a,c,d){if(b&&c.msie&&8>c.msieDocumentMode)throw ua("iequirks");var e=ba(ga);e.isEnabled=function(){return b};e.trustAs=d.trustAs;e.getTrusted=d.getTrusted;e.valueOf=d.valueOf;b||(e.trustAs=e.getTrusted=function(a,b){return b},e.valueOf=Da);e.parseAs=function(b,c){var d=a(c);return d.literal&&d.constant?d:function(a,c){return e.getTrusted(b,
d(a,c))}};var g=e.parseAs,f=e.getTrusted,h=e.trustAs;q(ga,function(a,b){var c=K(b);e[Ta("parse_as_"+c)]=function(b){return g(a,b)};e[Ta("get_trusted_"+c)]=function(b){return f(a,b)};e[Ta("trust_as_"+c)]=function(b){return h(a,b)}});return e}]}function be(){this.$get=["$window","$document",function(b,a){var c={},d=Y((/android (\d+)/.exec(K((b.navigator||{}).userAgent))||[])[1]),e=/Boxee/i.test((b.navigator||{}).userAgent),g=a[0]||{},f=g.documentMode,h,l=/^(Moz|webkit|O|ms)(?=[A-Z])/,k=g.body&&g.body.style,
m=!1,n=!1;if(k){for(var p in k)if(m=l.exec(p)){h=m[0];h=h.substr(0,1).toUpperCase()+h.substr(1);break}h||(h="WebkitOpacity"in k&&"webkit");m=!!("transition"in k||h+"Transition"in k);n=!!("animation"in k||h+"Animation"in k);!d||m&&n||(m=w(g.body.style.webkitTransition),n=w(g.body.style.webkitAnimation))}return{history:!(!b.history||!b.history.pushState||4>d||e),hashchange:"onhashchange"in b&&(!f||7<f),hasEvent:function(a){if("input"==a&&9==S)return!1;if(E(c[a])){var b=g.createElement("div");c[a]="on"+
a in b}return c[a]},csp:Vb(),vendorPrefix:h,transitions:m,animations:n,android:d,msie:S,msieDocumentMode:f}}]}function de(){this.$get=["$rootScope","$browser","$q","$exceptionHandler",function(b,a,c,d){function e(e,h,l){var k=c.defer(),m=k.promise,n=B(l)&&!l;h=a.defer(function(){try{k.resolve(e())}catch(a){k.reject(a),d(a)}finally{delete g[m.$$timeoutId]}n||b.$apply()},h);m.$$timeoutId=h;g[h]=k;return m}var g={};e.cancel=function(b){return b&&b.$$timeoutId in g?(g[b.$$timeoutId].reject("canceled"),
delete g[b.$$timeoutId],a.defer.cancel(b.$$timeoutId)):!1};return e}]}function sa(b,a){var c=b;S&&(W.setAttribute("href",c),c=W.href);W.setAttribute("href",c);return{href:W.href,protocol:W.protocol?W.protocol.replace(/:$/,""):"",host:W.host,search:W.search?W.search.replace(/^\?/,""):"",hash:W.hash?W.hash.replace(/^#/,""):"",hostname:W.hostname,port:W.port,pathname:"/"===W.pathname.charAt(0)?W.pathname:"/"+W.pathname}}function Ib(b){b=w(b)?sa(b):b;return b.protocol===Hc.protocol&&b.host===Hc.host}
function ee(){this.$get=aa(O)}function gc(b){function a(d,e){if(X(d)){var g={};q(d,function(b,c){g[c]=a(c,b)});return g}return b.factory(d+c,e)}var c="Filter";this.register=a;this.$get=["$injector",function(a){return function(b){return a.get(b+c)}}];a("currency",Ic);a("date",Jc);a("filter",Be);a("json",Ce);a("limitTo",De);a("lowercase",Ee);a("number",Kc);a("orderBy",Lc);a("uppercase",Fe)}function Be(){return function(b,a,c){if(!M(b))return b;var d=typeof c,e=[];e.check=function(a){for(var b=0;b<e.length;b++)if(!e[b](a))return!1;
return!0};"function"!==d&&(c="boolean"===d&&c?function(a,b){return Ea.equals(a,b)}:function(a,b){if(a&&b&&"object"===typeof a&&"object"===typeof b){for(var d in a)if("$"!==d.charAt(0)&&Fc.call(a,d)&&c(a[d],b[d]))return!0;return!1}b=(""+b).toLowerCase();return-1<(""+a).toLowerCase().indexOf(b)});var g=function(a,b){if("string"==typeof b&&"!"===b.charAt(0))return!g(a,b.substr(1));switch(typeof a){case "boolean":case "number":case "string":return c(a,b);case "object":switch(typeof b){case "object":return c(a,
b);default:for(var d in a)if("$"!==d.charAt(0)&&g(a[d],b))return!0}return!1;case "array":for(d=0;d<a.length;d++)if(g(a[d],b))return!0;return!1;default:return!1}};switch(typeof a){case "boolean":case "number":case "string":a={$:a};case "object":for(var f in a)(function(b){"undefined"!=typeof a[b]&&e.push(function(c){return g("$"==b?c:c&&c[b],a[b])})})(f);break;case "function":e.push(a);break;default:return b}d=[];for(f=0;f<b.length;f++){var h=b[f];e.check(h)&&d.push(h)}return d}}function Ic(b){var a=
b.NUMBER_FORMATS;return function(b,d){E(d)&&(d=a.CURRENCY_SYM);return Mc(b,a.PATTERNS[1],a.GROUP_SEP,a.DECIMAL_SEP,2).replace(/\u00A4/g,d)}}function Kc(b){var a=b.NUMBER_FORMATS;return function(b,d){return Mc(b,a.PATTERNS[0],a.GROUP_SEP,a.DECIMAL_SEP,d)}}function Mc(b,a,c,d,e){if(null==b||!isFinite(b)||X(b))return"";var g=0>b;b=Math.abs(b);var f=b+"",h="",l=[],k=!1;if(-1!==f.indexOf("e")){var m=f.match(/([\d\.]+)e(-?)(\d+)/);m&&"-"==m[2]&&m[3]>e+1?f="0":(h=f,k=!0)}if(k)0<e&&(-1<b&&1>b)&&(h=b.toFixed(e));
else{f=(f.split(Nc)[1]||"").length;E(e)&&(e=Math.min(Math.max(a.minFrac,f),a.maxFrac));f=Math.pow(10,e);b=Math.round(b*f)/f;b=(""+b).split(Nc);f=b[0];b=b[1]||"";var m=0,n=a.lgSize,p=a.gSize;if(f.length>=n+p)for(m=f.length-n,k=0;k<m;k++)0===(m-k)%p&&0!==k&&(h+=c),h+=f.charAt(k);for(k=m;k<f.length;k++)0===(f.length-k)%n&&0!==k&&(h+=c),h+=f.charAt(k);for(;b.length<e;)b+="0";e&&"0"!==e&&(h+=d+b.substr(0,e))}l.push(g?a.negPre:a.posPre);l.push(h);l.push(g?a.negSuf:a.posSuf);return l.join("")}function Ob(b,
a,c){var d="";0>b&&(d="-",b=-b);for(b=""+b;b.length<a;)b="0"+b;c&&(b=b.substr(b.length-a));return d+b}function $(b,a,c,d){c=c||0;return function(e){e=e["get"+b]();if(0<c||e>-c)e+=c;0===e&&-12==c&&(e=12);return Ob(e,a,d)}}function pb(b,a){return function(c,d){var e=c["get"+b](),g=Fa(a?"SHORT"+b:b);return d[g][e]}}function Jc(b){function a(a){var b;if(b=a.match(c)){a=new Date(0);var g=0,f=0,h=b[8]?a.setUTCFullYear:a.setFullYear,l=b[8]?a.setUTCHours:a.setHours;b[9]&&(g=Y(b[9]+b[10]),f=Y(b[9]+b[11]));
h.call(a,Y(b[1]),Y(b[2])-1,Y(b[3]));g=Y(b[4]||0)-g;f=Y(b[5]||0)-f;h=Y(b[6]||0);b=Math.round(1E3*parseFloat("0."+(b[7]||0)));l.call(a,g,f,h,b)}return a}var c=/^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;return function(c,e){var g="",f=[],h,l;e=e||"mediumDate";e=b.DATETIME_FORMATS[e]||e;w(c)&&(c=Ge.test(c)?Y(c):a(c));vb(c)&&(c=new Date(c));if(!Na(c))return c;for(;e;)(l=He.exec(e))?(f=f.concat(ya.call(l,1)),e=f.pop()):(f.push(e),e=null);q(f,function(a){h=
Ie[a];g+=h?h(c,b.DATETIME_FORMATS):a.replace(/(^'|'$)/g,"").replace(/''/g,"'")});return g}}function Ce(){return function(b){return qa(b,!0)}}function De(){return function(b,a){if(!M(b)&&!w(b))return b;a=Y(a);if(w(b))return a?0<=a?b.slice(0,a):b.slice(a,b.length):"";var c=[],d,e;a>b.length?a=b.length:a<-b.length&&(a=-b.length);0<a?(d=0,e=a):(d=b.length+a,e=b.length);for(;d<e;d++)c.push(b[d]);return c}}function Lc(b){return function(a,c,d){function e(a,b){return Qa(b)?function(b,c){return a(c,b)}:a}
function g(a,b){var c=typeof a,d=typeof b;return c==d?("string"==c&&(a=a.toLowerCase(),b=b.toLowerCase()),a===b?0:a<b?-1:1):c<d?-1:1}if(!M(a)||!c)return a;c=M(c)?c:[c];c=Uc(c,function(a){var c=!1,d=a||Da;if(w(a)){if("+"==a.charAt(0)||"-"==a.charAt(0))c="-"==a.charAt(0),a=a.substring(1);d=b(a);if(d.constant){var f=d();return e(function(a,b){return g(a[f],b[f])},c)}}return e(function(a,b){return g(d(a),d(b))},c)});for(var f=[],h=0;h<a.length;h++)f.push(a[h]);return f.sort(e(function(a,b){for(var d=
0;d<c.length;d++){var e=c[d](a,b);if(0!==e)return e}return 0},d))}}function va(b){P(b)&&(b={link:b});b.restrict=b.restrict||"AC";return aa(b)}function Oc(b,a,c,d){function e(a,c){c=c?"-"+fb(c,"-"):"";d.removeClass(b,(a?qb:rb)+c);d.addClass(b,(a?rb:qb)+c)}var g=this,f=b.parent().controller("form")||sb,h=0,l=g.$error={},k=[];g.$name=a.name||a.ngForm;g.$dirty=!1;g.$pristine=!0;g.$valid=!0;g.$invalid=!1;f.$addControl(g);b.addClass(La);e(!0);g.$addControl=function(a){Aa(a.$name,"input");k.push(a);a.$name&&
(g[a.$name]=a)};g.$removeControl=function(a){a.$name&&g[a.$name]===a&&delete g[a.$name];q(l,function(b,c){g.$setValidity(c,!0,a)});Oa(k,a)};g.$setValidity=function(a,b,c){var d=l[a];if(b)d&&(Oa(d,c),d.length||(h--,h||(e(b),g.$valid=!0,g.$invalid=!1),l[a]=!1,e(!0,a),f.$setValidity(a,!0,g)));else{h||e(b);if(d){if(-1!=db(d,c))return}else l[a]=d=[],h++,e(!1,a),f.$setValidity(a,!1,g);d.push(c);g.$valid=!1;g.$invalid=!0}};g.$setDirty=function(){d.removeClass(b,La);d.addClass(b,tb);g.$dirty=!0;g.$pristine=
!1;f.$setDirty()};g.$setPristine=function(){d.removeClass(b,tb);d.addClass(b,La);g.$dirty=!1;g.$pristine=!0;q(k,function(a){a.$setPristine()})}}function pa(b,a,c,d){b.$setValidity(a,c);return c?d:s}function Je(b,a,c){var d=c.prop("validity");X(d)&&b.$parsers.push(function(c){if(b.$error[a]||!(d.badInput||d.customError||d.typeMismatch)||d.valueMissing)return c;b.$setValidity(a,!1)})}function ub(b,a,c,d,e,g){var f=a.prop("validity");if(!e.android){var h=!1;a.on("compositionstart",function(a){h=!0});
a.on("compositionend",function(){h=!1;l()})}var l=function(){if(!h){var e=a.val();Qa(c.ngTrim||"T")&&(e=ca(e));if(d.$viewValue!==e||f&&""===e&&!f.valueMissing)b.$$phase?d.$setViewValue(e):b.$apply(function(){d.$setViewValue(e)})}};if(e.hasEvent("input"))a.on("input",l);else{var k,m=function(){k||(k=g.defer(function(){l();k=null}))};a.on("keydown",function(a){a=a.keyCode;91===a||(15<a&&19>a||37<=a&&40>=a)||m()});if(e.hasEvent("paste"))a.on("paste cut",m)}a.on("change",l);d.$render=function(){a.val(d.$isEmpty(d.$viewValue)?
"":d.$viewValue)};var n=c.ngPattern;n&&((e=n.match(/^\/(.*)\/([gim]*)$/))?(n=RegExp(e[1],e[2]),e=function(a){return pa(d,"pattern",d.$isEmpty(a)||n.test(a),a)}):e=function(c){var e=b.$eval(n);if(!e||!e.test)throw t("ngPattern")("noregexp",n,e,ha(a));return pa(d,"pattern",d.$isEmpty(c)||e.test(c),c)},d.$formatters.push(e),d.$parsers.push(e));if(c.ngMinlength){var p=Y(c.ngMinlength);e=function(a){return pa(d,"minlength",d.$isEmpty(a)||a.length>=p,a)};d.$parsers.push(e);d.$formatters.push(e)}if(c.ngMaxlength){var r=
Y(c.ngMaxlength);e=function(a){return pa(d,"maxlength",d.$isEmpty(a)||a.length<=r,a)};d.$parsers.push(e);d.$formatters.push(e)}}function Pb(b,a){b="ngClass"+b;return["$animate",function(c){function d(a,b){var c=[],d=0;a:for(;d<a.length;d++){for(var e=a[d],m=0;m<b.length;m++)if(e==b[m])continue a;c.push(e)}return c}function e(a){if(!M(a)){if(w(a))return a.split(" ");if(X(a)){var b=[];q(a,function(a,c){a&&b.push(c)});return b}}return a}return{restrict:"AC",link:function(g,f,h){function l(a,b){var c=
f.data("$classCounts")||{},d=[];q(a,function(a){if(0<b||c[a])c[a]=(c[a]||0)+b,c[a]===+(0<b)&&d.push(a)});f.data("$classCounts",c);return d.join(" ")}function k(b){if(!0===a||g.$index%2===a){var k=e(b||[]);if(!m){var r=l(k,1);h.$addClass(r)}else if(!xa(b,m)){var q=e(m),r=d(k,q),k=d(q,k),k=l(k,-1),r=l(r,1);0===r.length?c.removeClass(f,k):0===k.length?c.addClass(f,r):c.setClass(f,r,k)}}m=ba(b)}var m;g.$watch(h[b],k,!0);h.$observe("class",function(a){k(g.$eval(h[b]))});"ngClass"!==b&&g.$watch("$index",
function(c,d){var f=c&1;if(f!==d&1){var k=e(g.$eval(h[b]));f===a?(f=l(k,1),h.$addClass(f)):(f=l(k,-1),h.$removeClass(f))}})}}}]}var K=function(b){return w(b)?b.toLowerCase():b},Fc=Object.prototype.hasOwnProperty,Fa=function(b){return w(b)?b.toUpperCase():b},S,y,Ga,ya=[].slice,Ke=[].push,wa=Object.prototype.toString,Pa=t("ng"),Ea=O.angular||(O.angular={}),Sa,Ka,ka=["0","0","0"];S=Y((/msie (\d+)/.exec(K(navigator.userAgent))||[])[1]);isNaN(S)&&(S=Y((/trident\/.*; rv:(\d+)/.exec(K(navigator.userAgent))||
[])[1]));C.$inject=[];Da.$inject=[];var ca=function(){return String.prototype.trim?function(b){return w(b)?b.trim():b}:function(b){return w(b)?b.replace(/^\s\s*/,"").replace(/\s\s*$/,""):b}}();Ka=9>S?function(b){b=b.nodeName?b:b[0];return b.scopeName&&"HTML"!=b.scopeName?Fa(b.scopeName+":"+b.nodeName):b.nodeName}:function(b){return b.nodeName?b.nodeName:b[0].nodeName};var Xc=/[A-Z]/g,$c={full:"1.2.16",major:1,minor:2,dot:16,codeName:"badger-enumeration"},Ua=N.cache={},gb=N.expando="ng-"+(new Date).getTime(),
me=1,Pc=O.document.addEventListener?function(b,a,c){b.addEventListener(a,c,!1)}:function(b,a,c){b.attachEvent("on"+a,c)},Fb=O.document.removeEventListener?function(b,a,c){b.removeEventListener(a,c,!1)}:function(b,a,c){b.detachEvent("on"+a,c)};N._data=function(b){return this.cache[b[this.expando]]||{}};var he=/([\:\-\_]+(.))/g,ie=/^moz([A-Z])/,Bb=t("jqLite"),je=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,Cb=/<|&#?\w+;/,ke=/<([\w:]+)/,le=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ea=
{option:[1,'<select multiple="multiple">',"</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ea.optgroup=ea.option;ea.tbody=ea.tfoot=ea.colgroup=ea.caption=ea.thead;ea.th=ea.td;var Ja=N.prototype={ready:function(b){function a(){c||(c=!0,b())}var c=!1;"complete"===U.readyState?setTimeout(a):(this.on("DOMContentLoaded",a),N(O).on("load",a))},toString:function(){var b=
[];q(this,function(a){b.push(""+a)});return"["+b.join(", ")+"]"},eq:function(b){return 0<=b?y(this[b]):y(this[this.length+b])},length:0,push:Ke,sort:[].sort,splice:[].splice},kb={};q("multiple selected checked disabled readOnly required open".split(" "),function(b){kb[K(b)]=b});var nc={};q("input select option textarea button form details".split(" "),function(b){nc[Fa(b)]=!0});q({data:jc,inheritedData:jb,scope:function(b){return y(b).data("$scope")||jb(b.parentNode||b,["$isolateScope","$scope"])},
isolateScope:function(b){return y(b).data("$isolateScope")||y(b).data("$isolateScopeNoTemplate")},controller:kc,injector:function(b){return jb(b,"$injector")},removeAttr:function(b,a){b.removeAttribute(a)},hasClass:Gb,css:function(b,a,c){a=Ta(a);if(B(c))b.style[a]=c;else{var d;8>=S&&(d=b.currentStyle&&b.currentStyle[a],""===d&&(d="auto"));d=d||b.style[a];8>=S&&(d=""===d?s:d);return d}},attr:function(b,a,c){var d=K(a);if(kb[d])if(B(c))c?(b[a]=!0,b.setAttribute(a,d)):(b[a]=!1,b.removeAttribute(d));
else return b[a]||(b.attributes.getNamedItem(a)||C).specified?d:s;else if(B(c))b.setAttribute(a,c);else if(b.getAttribute)return b=b.getAttribute(a,2),null===b?s:b},prop:function(b,a,c){if(B(c))b[a]=c;else return b[a]},text:function(){function b(b,d){var e=a[b.nodeType];if(E(d))return e?b[e]:"";b[e]=d}var a=[];9>S?(a[1]="innerText",a[3]="nodeValue"):a[1]=a[3]="textContent";b.$dv="";return b}(),val:function(b,a){if(E(a)){if("SELECT"===Ka(b)&&b.multiple){var c=[];q(b.options,function(a){a.selected&&
c.push(a.value||a.text)});return 0===c.length?null:c}return b.value}b.value=a},html:function(b,a){if(E(a))return b.innerHTML;for(var c=0,d=b.childNodes;c<d.length;c++)Ha(d[c]);b.innerHTML=a},empty:lc},function(b,a){N.prototype[a]=function(a,d){var e,g;if(b!==lc&&(2==b.length&&b!==Gb&&b!==kc?a:d)===s){if(X(a)){for(e=0;e<this.length;e++)if(b===jc)b(this[e],a);else for(g in a)b(this[e],g,a[g]);return this}e=b.$dv;g=e===s?Math.min(this.length,1):this.length;for(var f=0;f<g;f++){var h=b(this[f],a,d);e=
e?e+h:h}return e}for(e=0;e<this.length;e++)b(this[e],a,d);return this}});q({removeData:hc,dealoc:Ha,on:function a(c,d,e,g){if(B(g))throw Bb("onargs");var f=la(c,"events"),h=la(c,"handle");f||la(c,"events",f={});h||la(c,"handle",h=ne(c,f));q(d.split(" "),function(d){var g=f[d];if(!g){if("mouseenter"==d||"mouseleave"==d){var m=U.body.contains||U.body.compareDocumentPosition?function(a,c){var d=9===a.nodeType?a.documentElement:a,e=c&&c.parentNode;return a===e||!!(e&&1===e.nodeType&&(d.contains?d.contains(e):
a.compareDocumentPosition&&a.compareDocumentPosition(e)&16))}:function(a,c){if(c)for(;c=c.parentNode;)if(c===a)return!0;return!1};f[d]=[];a(c,{mouseleave:"mouseout",mouseenter:"mouseover"}[d],function(a){var c=a.relatedTarget;c&&(c===this||m(this,c))||h(a,d)})}else Pc(c,d,h),f[d]=[];g=f[d]}g.push(e)})},off:ic,one:function(a,c,d){a=y(a);a.on(c,function g(){a.off(c,d);a.off(c,g)});a.on(c,d)},replaceWith:function(a,c){var d,e=a.parentNode;Ha(a);q(new N(c),function(c){d?e.insertBefore(c,d.nextSibling):
e.replaceChild(c,a);d=c})},children:function(a){var c=[];q(a.childNodes,function(a){1===a.nodeType&&c.push(a)});return c},contents:function(a){return a.contentDocument||a.childNodes||[]},append:function(a,c){q(new N(c),function(c){1!==a.nodeType&&11!==a.nodeType||a.appendChild(c)})},prepend:function(a,c){if(1===a.nodeType){var d=a.firstChild;q(new N(c),function(c){a.insertBefore(c,d)})}},wrap:function(a,c){c=y(c)[0];var d=a.parentNode;d&&d.replaceChild(c,a);c.appendChild(a)},remove:function(a){Ha(a);
var c=a.parentNode;c&&c.removeChild(a)},after:function(a,c){var d=a,e=a.parentNode;q(new N(c),function(a){e.insertBefore(a,d.nextSibling);d=a})},addClass:ib,removeClass:hb,toggleClass:function(a,c,d){c&&q(c.split(" "),function(c){var g=d;E(g)&&(g=!Gb(a,c));(g?ib:hb)(a,c)})},parent:function(a){return(a=a.parentNode)&&11!==a.nodeType?a:null},next:function(a){if(a.nextElementSibling)return a.nextElementSibling;for(a=a.nextSibling;null!=a&&1!==a.nodeType;)a=a.nextSibling;return a},find:function(a,c){return a.getElementsByTagName?
a.getElementsByTagName(c):[]},clone:Eb,triggerHandler:function(a,c,d){c=(la(a,"events")||{})[c];d=d||[];var e=[{preventDefault:C,stopPropagation:C}];q(c,function(c){c.apply(a,e.concat(d))})}},function(a,c){N.prototype[c]=function(c,e,g){for(var f,h=0;h<this.length;h++)E(f)?(f=a(this[h],c,e,g),B(f)&&(f=y(f))):Db(f,a(this[h],c,e,g));return B(f)?f:this};N.prototype.bind=N.prototype.on;N.prototype.unbind=N.prototype.off});Va.prototype={put:function(a,c){this[Ia(a)]=c},get:function(a){return this[Ia(a)]},
remove:function(a){var c=this[a=Ia(a)];delete this[a];return c}};var pe=/^function\s*[^\(]*\(\s*([^\)]*)\)/m,qe=/,/,re=/^\s*(_?)(\S+?)\1\s*$/,oe=/((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg,Wa=t("$injector"),Le=t("$animate"),Ld=["$provide",function(a){this.$$selectors={};this.register=function(c,d){var e=c+"-animation";if(c&&"."!=c.charAt(0))throw Le("notcsel",c);this.$$selectors[c.substr(1)]=e;a.factory(e,d)};this.classNameFilter=function(a){1===arguments.length&&(this.$$classNameFilter=a instanceof RegExp?
a:null);return this.$$classNameFilter};this.$get=["$timeout","$$asyncCallback",function(a,d){return{enter:function(a,c,f,h){f?f.after(a):(c&&c[0]||(c=f.parent()),c.append(a));h&&d(h)},leave:function(a,c){a.remove();c&&d(c)},move:function(a,c,d,h){this.enter(a,c,d,h)},addClass:function(a,c,f){c=w(c)?c:M(c)?c.join(" "):"";q(a,function(a){ib(a,c)});f&&d(f)},removeClass:function(a,c,f){c=w(c)?c:M(c)?c.join(" "):"";q(a,function(a){hb(a,c)});f&&d(f)},setClass:function(a,c,f,h){q(a,function(a){ib(a,c);hb(a,
f)});h&&d(h)},enabled:C}}]}],ja=t("$compile");cc.$inject=["$provide","$$sanitizeUriProvider"];var te=/^(x[\:\-_]|data[\:\-_])/i,vc=t("$interpolate"),Me=/^([^\?#]*)(\?([^#]*))?(#(.*))?$/,we={http:80,https:443,ftp:21},Kb=t("$location");Ac.prototype=Lb.prototype=zc.prototype={$$html5:!1,$$replace:!1,absUrl:nb("$$absUrl"),url:function(a,c){if(E(a))return this.$$url;var d=Me.exec(a);d[1]&&this.path(decodeURIComponent(d[1]));(d[2]||d[1])&&this.search(d[3]||"");this.hash(d[5]||"",c);return this},protocol:nb("$$protocol"),
host:nb("$$host"),port:nb("$$port"),path:Bc("$$path",function(a){return"/"==a.charAt(0)?a:"/"+a}),search:function(a,c){switch(arguments.length){case 0:return this.$$search;case 1:if(w(a))this.$$search=Yb(a);else if(X(a))this.$$search=a;else throw Kb("isrcharg");break;default:E(c)||null===c?delete this.$$search[a]:this.$$search[a]=c}this.$$compose();return this},hash:Bc("$$hash",Da),replace:function(){this.$$replace=!0;return this}};var Ba=t("$parse"),Ec={},ta,Ma={"null":function(){return null},"true":function(){return!0},
"false":function(){return!1},undefined:C,"+":function(a,c,d,e){d=d(a,c);e=e(a,c);return B(d)?B(e)?d+e:d:B(e)?e:s},"-":function(a,c,d,e){d=d(a,c);e=e(a,c);return(B(d)?d:0)-(B(e)?e:0)},"*":function(a,c,d,e){return d(a,c)*e(a,c)},"/":function(a,c,d,e){return d(a,c)/e(a,c)},"%":function(a,c,d,e){return d(a,c)%e(a,c)},"^":function(a,c,d,e){return d(a,c)^e(a,c)},"=":C,"===":function(a,c,d,e){return d(a,c)===e(a,c)},"!==":function(a,c,d,e){return d(a,c)!==e(a,c)},"==":function(a,c,d,e){return d(a,c)==e(a,
c)},"!=":function(a,c,d,e){return d(a,c)!=e(a,c)},"<":function(a,c,d,e){return d(a,c)<e(a,c)},">":function(a,c,d,e){return d(a,c)>e(a,c)},"<=":function(a,c,d,e){return d(a,c)<=e(a,c)},">=":function(a,c,d,e){return d(a,c)>=e(a,c)},"&&":function(a,c,d,e){return d(a,c)&&e(a,c)},"||":function(a,c,d,e){return d(a,c)||e(a,c)},"&":function(a,c,d,e){return d(a,c)&e(a,c)},"|":function(a,c,d,e){return e(a,c)(a,c,d(a,c))},"!":function(a,c,d){return!d(a,c)}},Ne={n:"\n",f:"\f",r:"\r",t:"\t",v:"\v","'":"'",'"':'"'},
Nb=function(a){this.options=a};Nb.prototype={constructor:Nb,lex:function(a){this.text=a;this.index=0;this.ch=s;this.lastCh=":";this.tokens=[];var c;for(a=[];this.index<this.text.length;){this.ch=this.text.charAt(this.index);if(this.is("\"'"))this.readString(this.ch);else if(this.isNumber(this.ch)||this.is(".")&&this.isNumber(this.peek()))this.readNumber();else if(this.isIdent(this.ch))this.readIdent(),this.was("{,")&&("{"===a[0]&&(c=this.tokens[this.tokens.length-1]))&&(c.json=-1===c.text.indexOf("."));
else if(this.is("(){}[].,;:?"))this.tokens.push({index:this.index,text:this.ch,json:this.was(":[,")&&this.is("{[")||this.is("}]:,")}),this.is("{[")&&a.unshift(this.ch),this.is("}]")&&a.shift(),this.index++;else if(this.isWhitespace(this.ch)){this.index++;continue}else{var d=this.ch+this.peek(),e=d+this.peek(2),g=Ma[this.ch],f=Ma[d],h=Ma[e];h?(this.tokens.push({index:this.index,text:e,fn:h}),this.index+=3):f?(this.tokens.push({index:this.index,text:d,fn:f}),this.index+=2):g?(this.tokens.push({index:this.index,
text:this.ch,fn:g,json:this.was("[,:")&&this.is("+-")}),this.index+=1):this.throwError("Unexpected next character ",this.index,this.index+1)}this.lastCh=this.ch}return this.tokens},is:function(a){return-1!==a.indexOf(this.ch)},was:function(a){return-1!==a.indexOf(this.lastCh)},peek:function(a){a=a||1;return this.index+a<this.text.length?this.text.charAt(this.index+a):!1},isNumber:function(a){return"0"<=a&&"9">=a},isWhitespace:function(a){return" "===a||"\r"===a||"\t"===a||"\n"===a||"\v"===a||"\u00a0"===
a},isIdent:function(a){return"a"<=a&&"z">=a||"A"<=a&&"Z">=a||"_"===a||"$"===a},isExpOperator:function(a){return"-"===a||"+"===a||this.isNumber(a)},throwError:function(a,c,d){d=d||this.index;c=B(c)?"s "+c+"-"+this.index+" ["+this.text.substring(c,d)+"]":" "+d;throw Ba("lexerr",a,c,this.text);},readNumber:function(){for(var a="",c=this.index;this.index<this.text.length;){var d=K(this.text.charAt(this.index));if("."==d||this.isNumber(d))a+=d;else{var e=this.peek();if("e"==d&&this.isExpOperator(e))a+=
d;else if(this.isExpOperator(d)&&e&&this.isNumber(e)&&"e"==a.charAt(a.length-1))a+=d;else if(!this.isExpOperator(d)||e&&this.isNumber(e)||"e"!=a.charAt(a.length-1))break;else this.throwError("Invalid exponent")}this.index++}a*=1;this.tokens.push({index:c,text:a,json:!0,fn:function(){return a}})},readIdent:function(){for(var a=this,c="",d=this.index,e,g,f,h;this.index<this.text.length;){h=this.text.charAt(this.index);if("."===h||this.isIdent(h)||this.isNumber(h))"."===h&&(e=this.index),c+=h;else break;
this.index++}if(e)for(g=this.index;g<this.text.length;){h=this.text.charAt(g);if("("===h){f=c.substr(e-d+1);c=c.substr(0,e-d);this.index=g;break}if(this.isWhitespace(h))g++;else break}d={index:d,text:c};if(Ma.hasOwnProperty(c))d.fn=Ma[c],d.json=Ma[c];else{var l=Dc(c,this.options,this.text);d.fn=D(function(a,c){return l(a,c)},{assign:function(d,e){return ob(d,c,e,a.text,a.options)}})}this.tokens.push(d);f&&(this.tokens.push({index:e,text:".",json:!1}),this.tokens.push({index:e+1,text:f,json:!1}))},
readString:function(a){var c=this.index;this.index++;for(var d="",e=a,g=!1;this.index<this.text.length;){var f=this.text.charAt(this.index),e=e+f;if(g)"u"===f?(f=this.text.substring(this.index+1,this.index+5),f.match(/[\da-f]{4}/i)||this.throwError("Invalid unicode escape [\\u"+f+"]"),this.index+=4,d+=String.fromCharCode(parseInt(f,16))):d=(g=Ne[f])?d+g:d+f,g=!1;else if("\\"===f)g=!0;else{if(f===a){this.index++;this.tokens.push({index:c,text:e,string:d,json:!0,fn:function(){return d}});return}d+=
f}this.index++}this.throwError("Unterminated quote",c)}};var $a=function(a,c,d){this.lexer=a;this.$filter=c;this.options=d};$a.ZERO=D(function(){return 0},{constant:!0});$a.prototype={constructor:$a,parse:function(a,c){this.text=a;this.json=c;this.tokens=this.lexer.lex(a);c&&(this.assignment=this.logicalOR,this.functionCall=this.fieldAccess=this.objectIndex=this.filterChain=function(){this.throwError("is not valid json",{text:a,index:0})});var d=c?this.primary():this.statements();0!==this.tokens.length&&
this.throwError("is an unexpected token",this.tokens[0]);d.literal=!!d.literal;d.constant=!!d.constant;return d},primary:function(){var a;if(this.expect("("))a=this.filterChain(),this.consume(")");else if(this.expect("["))a=this.arrayDeclaration();else if(this.expect("{"))a=this.object();else{var c=this.expect();(a=c.fn)||this.throwError("not a primary expression",c);c.json&&(a.constant=!0,a.literal=!0)}for(var d;c=this.expect("(","[",".");)"("===c.text?(a=this.functionCall(a,d),d=null):"["===c.text?
(d=a,a=this.objectIndex(a)):"."===c.text?(d=a,a=this.fieldAccess(a)):this.throwError("IMPOSSIBLE");return a},throwError:function(a,c){throw Ba("syntax",c.text,a,c.index+1,this.text,this.text.substring(c.index));},peekToken:function(){if(0===this.tokens.length)throw Ba("ueoe",this.text);return this.tokens[0]},peek:function(a,c,d,e){if(0<this.tokens.length){var g=this.tokens[0],f=g.text;if(f===a||f===c||f===d||f===e||!(a||c||d||e))return g}return!1},expect:function(a,c,d,e){return(a=this.peek(a,c,d,
e))?(this.json&&!a.json&&this.throwError("is not valid json",a),this.tokens.shift(),a):!1},consume:function(a){this.expect(a)||this.throwError("is unexpected, expecting ["+a+"]",this.peek())},unaryFn:function(a,c){return D(function(d,e){return a(d,e,c)},{constant:c.constant})},ternaryFn:function(a,c,d){return D(function(e,g){return a(e,g)?c(e,g):d(e,g)},{constant:a.constant&&c.constant&&d.constant})},binaryFn:function(a,c,d){return D(function(e,g){return c(e,g,a,d)},{constant:a.constant&&d.constant})},
statements:function(){for(var a=[];;)if(0<this.tokens.length&&!this.peek("}",")",";","]")&&a.push(this.filterChain()),!this.expect(";"))return 1===a.length?a[0]:function(c,d){for(var e,g=0;g<a.length;g++){var f=a[g];f&&(e=f(c,d))}return e}},filterChain:function(){for(var a=this.expression(),c;;)if(c=this.expect("|"))a=this.binaryFn(a,c.fn,this.filter());else return a},filter:function(){for(var a=this.expect(),c=this.$filter(a.text),d=[];;)if(a=this.expect(":"))d.push(this.expression());else{var e=
function(a,e,h){h=[h];for(var l=0;l<d.length;l++)h.push(d[l](a,e));return c.apply(a,h)};return function(){return e}}},expression:function(){return this.assignment()},assignment:function(){var a=this.ternary(),c,d;return(d=this.expect("="))?(a.assign||this.throwError("implies assignment but ["+this.text.substring(0,d.index)+"] can not be assigned to",d),c=this.ternary(),function(d,g){return a.assign(d,c(d,g),g)}):a},ternary:function(){var a=this.logicalOR(),c,d;if(this.expect("?")){c=this.ternary();
if(d=this.expect(":"))return this.ternaryFn(a,c,this.ternary());this.throwError("expected :",d)}else return a},logicalOR:function(){for(var a=this.logicalAND(),c;;)if(c=this.expect("||"))a=this.binaryFn(a,c.fn,this.logicalAND());else return a},logicalAND:function(){var a=this.equality(),c;if(c=this.expect("&&"))a=this.binaryFn(a,c.fn,this.logicalAND());return a},equality:function(){var a=this.relational(),c;if(c=this.expect("==","!=","===","!=="))a=this.binaryFn(a,c.fn,this.equality());return a},
relational:function(){var a=this.additive(),c;if(c=this.expect("<",">","<=",">="))a=this.binaryFn(a,c.fn,this.relational());return a},additive:function(){for(var a=this.multiplicative(),c;c=this.expect("+","-");)a=this.binaryFn(a,c.fn,this.multiplicative());return a},multiplicative:function(){for(var a=this.unary(),c;c=this.expect("*","/","%");)a=this.binaryFn(a,c.fn,this.unary());return a},unary:function(){var a;return this.expect("+")?this.primary():(a=this.expect("-"))?this.binaryFn($a.ZERO,a.fn,
this.unary()):(a=this.expect("!"))?this.unaryFn(a.fn,this.unary()):this.primary()},fieldAccess:function(a){var c=this,d=this.expect().text,e=Dc(d,this.options,this.text);return D(function(c,d,h){return e(h||a(c,d))},{assign:function(e,f,h){return ob(a(e,h),d,f,c.text,c.options)}})},objectIndex:function(a){var c=this,d=this.expression();this.consume("]");return D(function(e,g){var f=a(e,g),h=d(e,g),l;if(!f)return s;(f=Za(f[h],c.text))&&(f.then&&c.options.unwrapPromises)&&(l=f,"$$v"in f||(l.$$v=s,l.then(function(a){l.$$v=
a})),f=f.$$v);return f},{assign:function(e,g,f){var h=d(e,f);return Za(a(e,f),c.text)[h]=g}})},functionCall:function(a,c){var d=[];if(")"!==this.peekToken().text){do d.push(this.expression());while(this.expect(","))}this.consume(")");var e=this;return function(g,f){for(var h=[],l=c?c(g,f):g,k=0;k<d.length;k++)h.push(d[k](g,f));k=a(g,f,l)||C;Za(l,e.text);Za(k,e.text);h=k.apply?k.apply(l,h):k(h[0],h[1],h[2],h[3],h[4]);return Za(h,e.text)}},arrayDeclaration:function(){var a=[],c=!0;if("]"!==this.peekToken().text){do{if(this.peek("]"))break;
var d=this.expression();a.push(d);d.constant||(c=!1)}while(this.expect(","))}this.consume("]");return D(function(c,d){for(var f=[],h=0;h<a.length;h++)f.push(a[h](c,d));return f},{literal:!0,constant:c})},object:function(){var a=[],c=!0;if("}"!==this.peekToken().text){do{if(this.peek("}"))break;var d=this.expect(),d=d.string||d.text;this.consume(":");var e=this.expression();a.push({key:d,value:e});e.constant||(c=!1)}while(this.expect(","))}this.consume("}");return D(function(c,d){for(var e={},l=0;l<
a.length;l++){var k=a[l];e[k.key]=k.value(c,d)}return e},{literal:!0,constant:c})}};var Mb={},ua=t("$sce"),ga={HTML:"html",CSS:"css",URL:"url",RESOURCE_URL:"resourceUrl",JS:"js"},W=U.createElement("a"),Hc=sa(O.location.href,!0);gc.$inject=["$provide"];Ic.$inject=["$locale"];Kc.$inject=["$locale"];var Nc=".",Ie={yyyy:$("FullYear",4),yy:$("FullYear",2,0,!0),y:$("FullYear",1),MMMM:pb("Month"),MMM:pb("Month",!0),MM:$("Month",2,1),M:$("Month",1,1),dd:$("Date",2),d:$("Date",1),HH:$("Hours",2),H:$("Hours",
1),hh:$("Hours",2,-12),h:$("Hours",1,-12),mm:$("Minutes",2),m:$("Minutes",1),ss:$("Seconds",2),s:$("Seconds",1),sss:$("Milliseconds",3),EEEE:pb("Day"),EEE:pb("Day",!0),a:function(a,c){return 12>a.getHours()?c.AMPMS[0]:c.AMPMS[1]},Z:function(a){a=-1*a.getTimezoneOffset();return a=(0<=a?"+":"")+(Ob(Math[0<a?"floor":"ceil"](a/60),2)+Ob(Math.abs(a%60),2))}},He=/((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,Ge=/^\-?\d+$/;Jc.$inject=["$locale"];var Ee=aa(K),Fe=aa(Fa);Lc.$inject=
["$parse"];var cd=aa({restrict:"E",compile:function(a,c){8>=S&&(c.href||c.name||c.$set("href",""),a.append(U.createComment("IE fix")));if(!c.href&&!c.xlinkHref&&!c.name)return function(a,c){var g="[object SVGAnimatedString]"===wa.call(c.prop("href"))?"xlink:href":"href";c.on("click",function(a){c.attr(g)||a.preventDefault()})}}}),zb={};q(kb,function(a,c){if("multiple"!=a){var d=na("ng-"+c);zb[d]=function(){return{priority:100,link:function(a,g,f){a.$watch(f[d],function(a){f.$set(c,!!a)})}}}}});q(["src",
"srcset","href"],function(a){var c=na("ng-"+a);zb[c]=function(){return{priority:99,link:function(d,e,g){var f=a,h=a;"href"===a&&"[object SVGAnimatedString]"===wa.call(e.prop("href"))&&(h="xlinkHref",g.$attr[h]="xlink:href",f=null);g.$observe(c,function(a){a&&(g.$set(h,a),S&&f&&e.prop(f,g[h]))})}}}});var sb={$addControl:C,$removeControl:C,$setValidity:C,$setDirty:C,$setPristine:C};Oc.$inject=["$element","$attrs","$scope","$animate"];var Qc=function(a){return["$timeout",function(c){return{name:"form",
restrict:a?"EAC":"E",controller:Oc,compile:function(){return{pre:function(a,e,g,f){if(!g.action){var h=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1};Pc(e[0],"submit",h);e.on("$destroy",function(){c(function(){Fb(e[0],"submit",h)},0,!1)})}var l=e.parent().controller("form"),k=g.name||g.ngForm;k&&ob(a,k,f,k);if(l)e.on("$destroy",function(){l.$removeControl(f);k&&ob(a,k,s,k);D(f,sb)})}}}}}]},dd=Qc(),qd=Qc(!0),Oe=/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
Pe=/^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,Qe=/^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,Rc={text:ub,number:function(a,c,d,e,g,f){ub(a,c,d,e,g,f);e.$parsers.push(function(a){var c=e.$isEmpty(a);if(c||Qe.test(a))return e.$setValidity("number",!0),""===a?null:c?a:parseFloat(a);e.$setValidity("number",!1);return s});Je(e,"number",c);e.$formatters.push(function(a){return e.$isEmpty(a)?"":""+a});d.min&&(a=function(a){var c=parseFloat(d.min);return pa(e,"min",e.$isEmpty(a)||a>=c,a)},e.$parsers.push(a),
e.$formatters.push(a));d.max&&(a=function(a){var c=parseFloat(d.max);return pa(e,"max",e.$isEmpty(a)||a<=c,a)},e.$parsers.push(a),e.$formatters.push(a));e.$formatters.push(function(a){return pa(e,"number",e.$isEmpty(a)||vb(a),a)})},url:function(a,c,d,e,g,f){ub(a,c,d,e,g,f);a=function(a){return pa(e,"url",e.$isEmpty(a)||Oe.test(a),a)};e.$formatters.push(a);e.$parsers.push(a)},email:function(a,c,d,e,g,f){ub(a,c,d,e,g,f);a=function(a){return pa(e,"email",e.$isEmpty(a)||Pe.test(a),a)};e.$formatters.push(a);
e.$parsers.push(a)},radio:function(a,c,d,e){E(d.name)&&c.attr("name",bb());c.on("click",function(){c[0].checked&&a.$apply(function(){e.$setViewValue(d.value)})});e.$render=function(){c[0].checked=d.value==e.$viewValue};d.$observe("value",e.$render)},checkbox:function(a,c,d,e){var g=d.ngTrueValue,f=d.ngFalseValue;w(g)||(g=!0);w(f)||(f=!1);c.on("click",function(){a.$apply(function(){e.$setViewValue(c[0].checked)})});e.$render=function(){c[0].checked=e.$viewValue};e.$isEmpty=function(a){return a!==g};
e.$formatters.push(function(a){return a===g});e.$parsers.push(function(a){return a?g:f})},hidden:C,button:C,submit:C,reset:C,file:C},dc=["$browser","$sniffer",function(a,c){return{restrict:"E",require:"?ngModel",link:function(d,e,g,f){f&&(Rc[K(g.type)]||Rc.text)(d,e,g,f,c,a)}}}],rb="ng-valid",qb="ng-invalid",La="ng-pristine",tb="ng-dirty",Re=["$scope","$exceptionHandler","$attrs","$element","$parse","$animate",function(a,c,d,e,g,f){function h(a,c){c=c?"-"+fb(c,"-"):"";f.removeClass(e,(a?qb:rb)+c);
f.addClass(e,(a?rb:qb)+c)}this.$modelValue=this.$viewValue=Number.NaN;this.$parsers=[];this.$formatters=[];this.$viewChangeListeners=[];this.$pristine=!0;this.$dirty=!1;this.$valid=!0;this.$invalid=!1;this.$name=d.name;var l=g(d.ngModel),k=l.assign;if(!k)throw t("ngModel")("nonassign",d.ngModel,ha(e));this.$render=C;this.$isEmpty=function(a){return E(a)||""===a||null===a||a!==a};var m=e.inheritedData("$formController")||sb,n=0,p=this.$error={};e.addClass(La);h(!0);this.$setValidity=function(a,c){p[a]!==
!c&&(c?(p[a]&&n--,n||(h(!0),this.$valid=!0,this.$invalid=!1)):(h(!1),this.$invalid=!0,this.$valid=!1,n++),p[a]=!c,h(c,a),m.$setValidity(a,c,this))};this.$setPristine=function(){this.$dirty=!1;this.$pristine=!0;f.removeClass(e,tb);f.addClass(e,La)};this.$setViewValue=function(d){this.$viewValue=d;this.$pristine&&(this.$dirty=!0,this.$pristine=!1,f.removeClass(e,La),f.addClass(e,tb),m.$setDirty());q(this.$parsers,function(a){d=a(d)});this.$modelValue!==d&&(this.$modelValue=d,k(a,d),q(this.$viewChangeListeners,
function(a){try{a()}catch(d){c(d)}}))};var r=this;a.$watch(function(){var c=l(a);if(r.$modelValue!==c){var d=r.$formatters,e=d.length;for(r.$modelValue=c;e--;)c=d[e](c);r.$viewValue!==c&&(r.$viewValue=c,r.$render())}return c})}],Fd=function(){return{require:["ngModel","^?form"],controller:Re,link:function(a,c,d,e){var g=e[0],f=e[1]||sb;f.$addControl(g);a.$on("$destroy",function(){f.$removeControl(g)})}}},Hd=aa({require:"ngModel",link:function(a,c,d,e){e.$viewChangeListeners.push(function(){a.$eval(d.ngChange)})}}),
ec=function(){return{require:"?ngModel",link:function(a,c,d,e){if(e){d.required=!0;var g=function(a){if(d.required&&e.$isEmpty(a))e.$setValidity("required",!1);else return e.$setValidity("required",!0),a};e.$formatters.push(g);e.$parsers.unshift(g);d.$observe("required",function(){g(e.$viewValue)})}}}},Gd=function(){return{require:"ngModel",link:function(a,c,d,e){var g=(a=/\/(.*)\//.exec(d.ngList))&&RegExp(a[1])||d.ngList||",";e.$parsers.push(function(a){if(!E(a)){var c=[];a&&q(a.split(g),function(a){a&&
c.push(ca(a))});return c}});e.$formatters.push(function(a){return M(a)?a.join(", "):s});e.$isEmpty=function(a){return!a||!a.length}}}},Se=/^(true|false|\d+)$/,Id=function(){return{priority:100,compile:function(a,c){return Se.test(c.ngValue)?function(a,c,g){g.$set("value",a.$eval(g.ngValue))}:function(a,c,g){a.$watch(g.ngValue,function(a){g.$set("value",a)})}}}},id=va(function(a,c,d){c.addClass("ng-binding").data("$binding",d.ngBind);a.$watch(d.ngBind,function(a){c.text(a==s?"":a)})}),kd=["$interpolate",
function(a){return function(c,d,e){c=a(d.attr(e.$attr.ngBindTemplate));d.addClass("ng-binding").data("$binding",c);e.$observe("ngBindTemplate",function(a){d.text(a)})}}],jd=["$sce","$parse",function(a,c){return function(d,e,g){e.addClass("ng-binding").data("$binding",g.ngBindHtml);var f=c(g.ngBindHtml);d.$watch(function(){return(f(d)||"").toString()},function(c){e.html(a.getTrustedHtml(f(d))||"")})}}],ld=Pb("",!0),nd=Pb("Odd",0),md=Pb("Even",1),od=va({compile:function(a,c){c.$set("ngCloak",s);a.removeClass("ng-cloak")}}),
pd=[function(){return{scope:!0,controller:"@",priority:500}}],fc={};q("click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste".split(" "),function(a){var c=na("ng-"+a);fc[c]=["$parse",function(d){return{compile:function(e,g){var f=d(g[c]);return function(c,d,e){d.on(K(a),function(a){c.$apply(function(){f(c,{$event:a})})})}}}}]});var sd=["$animate",function(a){return{transclude:"element",priority:600,terminal:!0,restrict:"A",
$$tlb:!0,link:function(c,d,e,g,f){var h,l,k;c.$watch(e.ngIf,function(g){Qa(g)?l||(l=c.$new(),f(l,function(c){c[c.length++]=U.createComment(" end ngIf: "+e.ngIf+" ");h={clone:c};a.enter(c,d.parent(),d)})):(k&&(k.remove(),k=null),l&&(l.$destroy(),l=null),h&&(k=yb(h.clone),a.leave(k,function(){k=null}),h=null))})}}}],td=["$http","$templateCache","$anchorScroll","$animate","$sce",function(a,c,d,e,g){return{restrict:"ECA",priority:400,terminal:!0,transclude:"element",controller:Ea.noop,compile:function(f,
h){var l=h.ngInclude||h.src,k=h.onload||"",m=h.autoscroll;return function(f,h,q,s,u){var F=0,v,y,A,x=function(){y&&(y.remove(),y=null);v&&(v.$destroy(),v=null);A&&(e.leave(A,function(){y=null}),y=A,A=null)};f.$watch(g.parseAsResourceUrl(l),function(g){var l=function(){!B(m)||m&&!f.$eval(m)||d()},q=++F;g?(a.get(g,{cache:c}).success(function(a){if(q===F){var c=f.$new();s.template=a;a=u(c,function(a){x();e.enter(a,null,h,l)});v=c;A=a;v.$emit("$includeContentLoaded");f.$eval(k)}}).error(function(){q===
F&&x()}),f.$emit("$includeContentRequested")):(x(),s.template=null)})}}}}],Jd=["$compile",function(a){return{restrict:"ECA",priority:-400,require:"ngInclude",link:function(c,d,e,g){d.html(g.template);a(d.contents())(c)}}}],ud=va({priority:450,compile:function(){return{pre:function(a,c,d){a.$eval(d.ngInit)}}}}),vd=va({terminal:!0,priority:1E3}),wd=["$locale","$interpolate",function(a,c){var d=/{}/g;return{restrict:"EA",link:function(e,g,f){var h=f.count,l=f.$attr.when&&g.attr(f.$attr.when),k=f.offset||
0,m=e.$eval(l)||{},n={},p=c.startSymbol(),r=c.endSymbol(),s=/^when(Minus)?(.+)$/;q(f,function(a,c){s.test(c)&&(m[K(c.replace("when","").replace("Minus","-"))]=g.attr(f.$attr[c]))});q(m,function(a,e){n[e]=c(a.replace(d,p+h+"-"+k+r))});e.$watch(function(){var c=parseFloat(e.$eval(h));if(isNaN(c))return"";c in m||(c=a.pluralCat(c-k));return n[c](e,g,!0)},function(a){g.text(a)})}}}],xd=["$parse","$animate",function(a,c){var d=t("ngRepeat");return{transclude:"element",priority:1E3,terminal:!0,$$tlb:!0,
link:function(e,g,f,h,l){var k=f.ngRepeat,m=k.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/),n,p,r,s,u,F,v={$id:Ia};if(!m)throw d("iexp",k);f=m[1];h=m[2];(m=m[3])?(n=a(m),p=function(a,c,d){F&&(v[F]=a);v[u]=c;v.$index=d;return n(e,v)}):(r=function(a,c){return Ia(c)},s=function(a){return a});m=f.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);if(!m)throw d("iidexp",f);u=m[3]||m[1];F=m[2];var B={};e.$watchCollection(h,function(a){var f,h,m=g[0],n,v={},H,R,w,C,T,t,
E=[];if(ab(a))T=a,n=p||r;else{n=p||s;T=[];for(w in a)a.hasOwnProperty(w)&&"$"!=w.charAt(0)&&T.push(w);T.sort()}H=T.length;h=E.length=T.length;for(f=0;f<h;f++)if(w=a===T?f:T[f],C=a[w],C=n(w,C,f),Aa(C,"`track by` id"),B.hasOwnProperty(C))t=B[C],delete B[C],v[C]=t,E[f]=t;else{if(v.hasOwnProperty(C))throw q(E,function(a){a&&a.scope&&(B[a.id]=a)}),d("dupes",k,C);E[f]={id:C};v[C]=!1}for(w in B)B.hasOwnProperty(w)&&(t=B[w],f=yb(t.clone),c.leave(f),q(f,function(a){a.$$NG_REMOVED=!0}),t.scope.$destroy());
f=0;for(h=T.length;f<h;f++){w=a===T?f:T[f];C=a[w];t=E[f];E[f-1]&&(m=E[f-1].clone[E[f-1].clone.length-1]);if(t.scope){R=t.scope;n=m;do n=n.nextSibling;while(n&&n.$$NG_REMOVED);t.clone[0]!=n&&c.move(yb(t.clone),null,y(m));m=t.clone[t.clone.length-1]}else R=e.$new();R[u]=C;F&&(R[F]=w);R.$index=f;R.$first=0===f;R.$last=f===H-1;R.$middle=!(R.$first||R.$last);R.$odd=!(R.$even=0===(f&1));t.scope||l(R,function(a){a[a.length++]=U.createComment(" end ngRepeat: "+k+" ");c.enter(a,null,y(m));m=a;t.scope=R;t.clone=
a;v[t.id]=t})}B=v})}}}],yd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngShow,function(c){a[Qa(c)?"removeClass":"addClass"](d,"ng-hide")})}}],rd=["$animate",function(a){return function(c,d,e){c.$watch(e.ngHide,function(c){a[Qa(c)?"addClass":"removeClass"](d,"ng-hide")})}}],zd=va(function(a,c,d){a.$watch(d.ngStyle,function(a,d){d&&a!==d&&q(d,function(a,d){c.css(d,"")});a&&c.css(a)},!0)}),Ad=["$animate",function(a){return{restrict:"EA",require:"ngSwitch",controller:["$scope",function(){this.cases=
{}}],link:function(c,d,e,g){var f,h,l,k=[];c.$watch(e.ngSwitch||e.on,function(d){var n,p=k.length;if(0<p){if(l){for(n=0;n<p;n++)l[n].remove();l=null}l=[];for(n=0;n<p;n++){var r=h[n];k[n].$destroy();l[n]=r;a.leave(r,function(){l.splice(n,1);0===l.length&&(l=null)})}}h=[];k=[];if(f=g.cases["!"+d]||g.cases["?"])c.$eval(e.change),q(f,function(d){var e=c.$new();k.push(e);d.transclude(e,function(c){var e=d.element;h.push(c);a.enter(c,e.parent(),e)})})})}}}],Bd=va({transclude:"element",priority:800,require:"^ngSwitch",
link:function(a,c,d,e,g){e.cases["!"+d.ngSwitchWhen]=e.cases["!"+d.ngSwitchWhen]||[];e.cases["!"+d.ngSwitchWhen].push({transclude:g,element:c})}}),Cd=va({transclude:"element",priority:800,require:"^ngSwitch",link:function(a,c,d,e,g){e.cases["?"]=e.cases["?"]||[];e.cases["?"].push({transclude:g,element:c})}}),Ed=va({link:function(a,c,d,e,g){if(!g)throw t("ngTransclude")("orphan",ha(c));g(function(a){c.empty();c.append(a)})}}),ed=["$templateCache",function(a){return{restrict:"E",terminal:!0,compile:function(c,
d){"text/ng-template"==d.type&&a.put(d.id,c[0].text)}}}],Te=t("ngOptions"),Dd=aa({terminal:!0}),fd=["$compile","$parse",function(a,c){var d=/^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,e={$setViewValue:C};return{restrict:"E",require:["select","?ngModel"],controller:["$element","$scope","$attrs",function(a,c,d){var l=this,k={},m=e,n;l.databound=
d.ngModel;l.init=function(a,c,d){m=a;n=d};l.addOption=function(c){Aa(c,'"option value"');k[c]=!0;m.$viewValue==c&&(a.val(c),n.parent()&&n.remove())};l.removeOption=function(a){this.hasOption(a)&&(delete k[a],m.$viewValue==a&&this.renderUnknownOption(a))};l.renderUnknownOption=function(c){c="? "+Ia(c)+" ?";n.val(c);a.prepend(n);a.val(c);n.prop("selected",!0)};l.hasOption=function(a){return k.hasOwnProperty(a)};c.$on("$destroy",function(){l.renderUnknownOption=C})}],link:function(e,f,h,l){function k(a,
c,d,e){d.$render=function(){var a=d.$viewValue;e.hasOption(a)?(A.parent()&&A.remove(),c.val(a),""===a&&w.prop("selected",!0)):E(a)&&w?c.val(""):e.renderUnknownOption(a)};c.on("change",function(){a.$apply(function(){A.parent()&&A.remove();d.$setViewValue(c.val())})})}function m(a,c,d){var e;d.$render=function(){var a=new Va(d.$viewValue);q(c.find("option"),function(c){c.selected=B(a.get(c.value))})};a.$watch(function(){xa(e,d.$viewValue)||(e=ba(d.$viewValue),d.$render())});c.on("change",function(){a.$apply(function(){var a=
[];q(c.find("option"),function(c){c.selected&&a.push(c.value)});d.$setViewValue(a)})})}function n(e,f,g){function h(){var a={"":[]},c=[""],d,k,s,t,z;t=g.$modelValue;z=y(e)||[];var E=n?Qb(z):z,F,I,A;I={};s=!1;var D,H;if(r)if(w&&M(t))for(s=new Va([]),A=0;A<t.length;A++)I[m]=t[A],s.put(w(e,I),t[A]);else s=new Va(t);for(A=0;F=E.length,A<F;A++){k=A;if(n){k=E[A];if("$"===k.charAt(0))continue;I[n]=k}I[m]=z[k];d=p(e,I)||"";(k=a[d])||(k=a[d]=[],c.push(d));r?d=B(s.remove(w?w(e,I):q(e,I))):(w?(d={},d[m]=t,d=
w(e,d)===w(e,I)):d=t===q(e,I),s=s||d);D=l(e,I);D=B(D)?D:"";k.push({id:w?w(e,I):n?E[A]:A,label:D,selected:d})}r||(u||null===t?a[""].unshift({id:"",label:"",selected:!s}):s||a[""].unshift({id:"?",label:"",selected:!0}));I=0;for(E=c.length;I<E;I++){d=c[I];k=a[d];x.length<=I?(t={element:C.clone().attr("label",d),label:k.label},z=[t],x.push(z),f.append(t.element)):(z=x[I],t=z[0],t.label!=d&&t.element.attr("label",t.label=d));D=null;A=0;for(F=k.length;A<F;A++)s=k[A],(d=z[A+1])?(D=d.element,d.label!==s.label&&
D.text(d.label=s.label),d.id!==s.id&&D.val(d.id=s.id),d.selected!==s.selected&&D.prop("selected",d.selected=s.selected)):(""===s.id&&u?H=u:(H=v.clone()).val(s.id).attr("selected",s.selected).text(s.label),z.push({element:H,label:s.label,id:s.id,selected:s.selected}),D?D.after(H):t.element.append(H),D=H);for(A++;z.length>A;)z.pop().element.remove()}for(;x.length>I;)x.pop()[0].element.remove()}var k;if(!(k=t.match(d)))throw Te("iexp",t,ha(f));var l=c(k[2]||k[1]),m=k[4]||k[6],n=k[5],p=c(k[3]||""),q=
c(k[2]?k[1]:m),y=c(k[7]),w=k[8]?c(k[8]):null,x=[[{element:f,label:""}]];u&&(a(u)(e),u.removeClass("ng-scope"),u.remove());f.empty();f.on("change",function(){e.$apply(function(){var a,c=y(e)||[],d={},h,k,l,p,t,v,u;if(r)for(k=[],p=0,v=x.length;p<v;p++)for(a=x[p],l=1,t=a.length;l<t;l++){if((h=a[l].element)[0].selected){h=h.val();n&&(d[n]=h);if(w)for(u=0;u<c.length&&(d[m]=c[u],w(e,d)!=h);u++);else d[m]=c[h];k.push(q(e,d))}}else{h=f.val();if("?"==h)k=s;else if(""===h)k=null;else if(w)for(u=0;u<c.length;u++){if(d[m]=
c[u],w(e,d)==h){k=q(e,d);break}}else d[m]=c[h],n&&(d[n]=h),k=q(e,d);1<x[0].length&&x[0][1].id!==h&&(x[0][1].selected=!1)}g.$setViewValue(k)})});g.$render=h;e.$watch(h)}if(l[1]){var p=l[0];l=l[1];var r=h.multiple,t=h.ngOptions,u=!1,w,v=y(U.createElement("option")),C=y(U.createElement("optgroup")),A=v.clone();h=0;for(var x=f.children(),D=x.length;h<D;h++)if(""===x[h].value){w=u=x.eq(h);break}p.init(l,u,A);r&&(l.$isEmpty=function(a){return!a||0===a.length});t?n(e,f,l):r?m(e,f,l):k(e,f,l,p)}}}}],hd=["$interpolate",
function(a){var c={addOption:C,removeOption:C};return{restrict:"E",priority:100,compile:function(d,e){if(E(e.value)){var g=a(d.text(),!0);g||e.$set("value",d.text())}return function(a,d,e){var k=d.parent(),m=k.data("$selectController")||k.parent().data("$selectController");m&&m.databound?d.prop("selected",!1):m=c;g?a.$watch(g,function(a,c){e.$set("value",a);a!==c&&m.removeOption(c);m.addOption(a)}):m.addOption(e.value);d.on("$destroy",function(){m.removeOption(e.value)})}}}}],gd=aa({restrict:"E",
terminal:!0});O.angular.bootstrap?console.log("WARNING: Tried to load angular more than once."):((Ga=O.jQuery)?(y=Ga,D(Ga.fn,{scope:Ja.scope,isolateScope:Ja.isolateScope,controller:Ja.controller,injector:Ja.injector,inheritedData:Ja.inheritedData}),Ab("remove",!0,!0,!1),Ab("empty",!1,!1,!1),Ab("html",!1,!1,!0)):y=N,Ea.element=y,Zc(Ea),y(U).ready(function(){Wc(U,$b)}))})(window,document);!angular.$$csp()&&angular.element(document).find("head").prepend('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}.ng-animate-block-transitions{transition:0s all!important;-webkit-transition:0s all!important;}</style>');
//# sourceMappingURL=angular.min.js.map

},{}],3:[function(require,module,exports){
/*! Socket.IO.js build:0.9.17, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */

var io = ('undefined' === typeof module ? {} : module.exports);
(function() {

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, global) {

  /**
   * IO namespace.
   *
   * @namespace
   */

  var io = exports;

  /**
   * Socket.IO version
   *
   * @api public
   */

  io.version = '0.9.17';

  /**
   * Protocol implemented.
   *
   * @api public
   */

  io.protocol = 1;

  /**
   * Available transports, these will be populated with the available transports
   *
   * @api public
   */

  io.transports = [];

  /**
   * Keep track of jsonp callbacks.
   *
   * @api private
   */

  io.j = [];

  /**
   * Keep track of our io.Sockets
   *
   * @api private
   */
  io.sockets = {};


  /**
   * Manages connections to hosts.
   *
   * @param {String} uri
   * @Param {Boolean} force creation of new socket (defaults to false)
   * @api public
   */

  io.connect = function (host, details) {
    var uri = io.util.parseUri(host)
      , uuri
      , socket;

    if (global && global.location) {
      uri.protocol = uri.protocol || global.location.protocol.slice(0, -1);
      uri.host = uri.host || (global.document
        ? global.document.domain : global.location.hostname);
      uri.port = uri.port || global.location.port;
    }

    uuri = io.util.uniqueUri(uri);

    var options = {
        host: uri.host
      , secure: 'https' == uri.protocol
      , port: uri.port || ('https' == uri.protocol ? 443 : 80)
      , query: uri.query || ''
    };

    io.util.merge(options, details);

    if (options['force new connection'] || !io.sockets[uuri]) {
      socket = new io.Socket(options);
    }

    if (!options['force new connection'] && socket) {
      io.sockets[uuri] = socket;
    }

    socket = socket || io.sockets[uuri];

    // if path is different from '' or /
    return socket.of(uri.path.length > 1 ? uri.path : '');
  };

})('object' === typeof module ? module.exports : (this.io = {}), this);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, global) {

  /**
   * Utilities namespace.
   *
   * @namespace
   */

  var util = exports.util = {};

  /**
   * Parses an URI
   *
   * @author Steven Levithan <stevenlevithan.com> (MIT license)
   * @api public
   */

  var re = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

  var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password',
               'host', 'port', 'relative', 'path', 'directory', 'file', 'query',
               'anchor'];

  util.parseUri = function (str) {
    var m = re.exec(str || '')
      , uri = {}
      , i = 14;

    while (i--) {
      uri[parts[i]] = m[i] || '';
    }

    return uri;
  };

  /**
   * Produces a unique url that identifies a Socket.IO connection.
   *
   * @param {Object} uri
   * @api public
   */

  util.uniqueUri = function (uri) {
    var protocol = uri.protocol
      , host = uri.host
      , port = uri.port;

    if ('document' in global) {
      host = host || document.domain;
      port = port || (protocol == 'https'
        && document.location.protocol !== 'https:' ? 443 : document.location.port);
    } else {
      host = host || 'localhost';

      if (!port && protocol == 'https') {
        port = 443;
      }
    }

    return (protocol || 'http') + '://' + host + ':' + (port || 80);
  };

  /**
   * Mergest 2 query strings in to once unique query string
   *
   * @param {String} base
   * @param {String} addition
   * @api public
   */

  util.query = function (base, addition) {
    var query = util.chunkQuery(base || '')
      , components = [];

    util.merge(query, util.chunkQuery(addition || ''));
    for (var part in query) {
      if (query.hasOwnProperty(part)) {
        components.push(part + '=' + query[part]);
      }
    }

    return components.length ? '?' + components.join('&') : '';
  };

  /**
   * Transforms a querystring in to an object
   *
   * @param {String} qs
   * @api public
   */

  util.chunkQuery = function (qs) {
    var query = {}
      , params = qs.split('&')
      , i = 0
      , l = params.length
      , kv;

    for (; i < l; ++i) {
      kv = params[i].split('=');
      if (kv[0]) {
        query[kv[0]] = kv[1];
      }
    }

    return query;
  };

  /**
   * Executes the given function when the page is loaded.
   *
   *     io.util.load(function () { console.log('page loaded'); });
   *
   * @param {Function} fn
   * @api public
   */

  var pageLoaded = false;

  util.load = function (fn) {
    if ('document' in global && document.readyState === 'complete' || pageLoaded) {
      return fn();
    }

    util.on(global, 'load', fn, false);
  };

  /**
   * Adds an event.
   *
   * @api private
   */

  util.on = function (element, event, fn, capture) {
    if (element.attachEvent) {
      element.attachEvent('on' + event, fn);
    } else if (element.addEventListener) {
      element.addEventListener(event, fn, capture);
    }
  };

  /**
   * Generates the correct `XMLHttpRequest` for regular and cross domain requests.
   *
   * @param {Boolean} [xdomain] Create a request that can be used cross domain.
   * @returns {XMLHttpRequest|false} If we can create a XMLHttpRequest.
   * @api private
   */

  util.request = function (xdomain) {

    if (xdomain && 'undefined' != typeof XDomainRequest && !util.ua.hasCORS) {
      return new XDomainRequest();
    }

    if ('undefined' != typeof XMLHttpRequest && (!xdomain || util.ua.hasCORS)) {
      return new XMLHttpRequest();
    }

    if (!xdomain) {
      try {
        return new window[(['Active'].concat('Object').join('X'))]('Microsoft.XMLHTTP');
      } catch(e) { }
    }

    return null;
  };

  /**
   * XHR based transport constructor.
   *
   * @constructor
   * @api public
   */

  /**
   * Change the internal pageLoaded value.
   */

  if ('undefined' != typeof window) {
    util.load(function () {
      pageLoaded = true;
    });
  }

  /**
   * Defers a function to ensure a spinner is not displayed by the browser
   *
   * @param {Function} fn
   * @api public
   */

  util.defer = function (fn) {
    if (!util.ua.webkit || 'undefined' != typeof importScripts) {
      return fn();
    }

    util.load(function () {
      setTimeout(fn, 100);
    });
  };

  /**
   * Merges two objects.
   *
   * @api public
   */

  util.merge = function merge (target, additional, deep, lastseen) {
    var seen = lastseen || []
      , depth = typeof deep == 'undefined' ? 2 : deep
      , prop;

    for (prop in additional) {
      if (additional.hasOwnProperty(prop) && util.indexOf(seen, prop) < 0) {
        if (typeof target[prop] !== 'object' || !depth) {
          target[prop] = additional[prop];
          seen.push(additional[prop]);
        } else {
          util.merge(target[prop], additional[prop], depth - 1, seen);
        }
      }
    }

    return target;
  };

  /**
   * Merges prototypes from objects
   *
   * @api public
   */

  util.mixin = function (ctor, ctor2) {
    util.merge(ctor.prototype, ctor2.prototype);
  };

  /**
   * Shortcut for prototypical and static inheritance.
   *
   * @api private
   */

  util.inherit = function (ctor, ctor2) {
    function f() {};
    f.prototype = ctor2.prototype;
    ctor.prototype = new f;
  };

  /**
   * Checks if the given object is an Array.
   *
   *     io.util.isArray([]); // true
   *     io.util.isArray({}); // false
   *
   * @param Object obj
   * @api public
   */

  util.isArray = Array.isArray || function (obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
  };

  /**
   * Intersects values of two arrays into a third
   *
   * @api public
   */

  util.intersect = function (arr, arr2) {
    var ret = []
      , longest = arr.length > arr2.length ? arr : arr2
      , shortest = arr.length > arr2.length ? arr2 : arr;

    for (var i = 0, l = shortest.length; i < l; i++) {
      if (~util.indexOf(longest, shortest[i]))
        ret.push(shortest[i]);
    }

    return ret;
  };

  /**
   * Array indexOf compatibility.
   *
   * @see bit.ly/a5Dxa2
   * @api public
   */

  util.indexOf = function (arr, o, i) {

    for (var j = arr.length, i = i < 0 ? i + j < 0 ? 0 : i + j : i || 0;
         i < j && arr[i] !== o; i++) {}

    return j <= i ? -1 : i;
  };

  /**
   * Converts enumerables to array.
   *
   * @api public
   */

  util.toArray = function (enu) {
    var arr = [];

    for (var i = 0, l = enu.length; i < l; i++)
      arr.push(enu[i]);

    return arr;
  };

  /**
   * UA / engines detection namespace.
   *
   * @namespace
   */

  util.ua = {};

  /**
   * Whether the UA supports CORS for XHR.
   *
   * @api public
   */

  util.ua.hasCORS = 'undefined' != typeof XMLHttpRequest && (function () {
    try {
      var a = new XMLHttpRequest();
    } catch (e) {
      return false;
    }

    return a.withCredentials != undefined;
  })();

  /**
   * Detect webkit.
   *
   * @api public
   */

  util.ua.webkit = 'undefined' != typeof navigator
    && /webkit/i.test(navigator.userAgent);

   /**
   * Detect iPad/iPhone/iPod.
   *
   * @api public
   */

  util.ua.iDevice = 'undefined' != typeof navigator
      && /iPad|iPhone|iPod/i.test(navigator.userAgent);

})('undefined' != typeof io ? io : module.exports, this);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.EventEmitter = EventEmitter;

  /**
   * Event emitter constructor.
   *
   * @api public.
   */

  function EventEmitter () {};

  /**
   * Adds a listener
   *
   * @api public
   */

  EventEmitter.prototype.on = function (name, fn) {
    if (!this.$events) {
      this.$events = {};
    }

    if (!this.$events[name]) {
      this.$events[name] = fn;
    } else if (io.util.isArray(this.$events[name])) {
      this.$events[name].push(fn);
    } else {
      this.$events[name] = [this.$events[name], fn];
    }

    return this;
  };

  EventEmitter.prototype.addListener = EventEmitter.prototype.on;

  /**
   * Adds a volatile listener.
   *
   * @api public
   */

  EventEmitter.prototype.once = function (name, fn) {
    var self = this;

    function on () {
      self.removeListener(name, on);
      fn.apply(this, arguments);
    };

    on.listener = fn;
    this.on(name, on);

    return this;
  };

  /**
   * Removes a listener.
   *
   * @api public
   */

  EventEmitter.prototype.removeListener = function (name, fn) {
    if (this.$events && this.$events[name]) {
      var list = this.$events[name];

      if (io.util.isArray(list)) {
        var pos = -1;

        for (var i = 0, l = list.length; i < l; i++) {
          if (list[i] === fn || (list[i].listener && list[i].listener === fn)) {
            pos = i;
            break;
          }
        }

        if (pos < 0) {
          return this;
        }

        list.splice(pos, 1);

        if (!list.length) {
          delete this.$events[name];
        }
      } else if (list === fn || (list.listener && list.listener === fn)) {
        delete this.$events[name];
      }
    }

    return this;
  };

  /**
   * Removes all listeners for an event.
   *
   * @api public
   */

  EventEmitter.prototype.removeAllListeners = function (name) {
    if (name === undefined) {
      this.$events = {};
      return this;
    }

    if (this.$events && this.$events[name]) {
      this.$events[name] = null;
    }

    return this;
  };

  /**
   * Gets all listeners for a certain event.
   *
   * @api publci
   */

  EventEmitter.prototype.listeners = function (name) {
    if (!this.$events) {
      this.$events = {};
    }

    if (!this.$events[name]) {
      this.$events[name] = [];
    }

    if (!io.util.isArray(this.$events[name])) {
      this.$events[name] = [this.$events[name]];
    }

    return this.$events[name];
  };

  /**
   * Emits an event.
   *
   * @api public
   */

  EventEmitter.prototype.emit = function (name) {
    if (!this.$events) {
      return false;
    }

    var handler = this.$events[name];

    if (!handler) {
      return false;
    }

    var args = Array.prototype.slice.call(arguments, 1);

    if ('function' == typeof handler) {
      handler.apply(this, args);
    } else if (io.util.isArray(handler)) {
      var listeners = handler.slice();

      for (var i = 0, l = listeners.length; i < l; i++) {
        listeners[i].apply(this, args);
      }
    } else {
      return false;
    }

    return true;
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Based on JSON2 (http://www.JSON.org/js.html).
 */

(function (exports, nativeJSON) {
  "use strict";

  // use native JSON if it's available
  if (nativeJSON && nativeJSON.parse){
    return exports.JSON = {
      parse: nativeJSON.parse
    , stringify: nativeJSON.stringify
    };
  }

  var JSON = exports.JSON = {};

  function f(n) {
      // Format integers to have at least two digits.
      return n < 10 ? '0' + n : n;
  }

  function date(d, key) {
    return isFinite(d.valueOf()) ?
        d.getUTCFullYear()     + '-' +
        f(d.getUTCMonth() + 1) + '-' +
        f(d.getUTCDate())      + 'T' +
        f(d.getUTCHours())     + ':' +
        f(d.getUTCMinutes())   + ':' +
        f(d.getUTCSeconds())   + 'Z' : null;
  };

  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
      gap,
      indent,
      meta = {    // table of character substitutions
          '\b': '\\b',
          '\t': '\\t',
          '\n': '\\n',
          '\f': '\\f',
          '\r': '\\r',
          '"' : '\\"',
          '\\': '\\\\'
      },
      rep;


  function quote(string) {

// If the string contains no control characters, no quote characters, and no
// backslash characters, then we can safely slap some quotes around it.
// Otherwise we must also replace the offending characters with safe escape
// sequences.

      escapable.lastIndex = 0;
      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
          var c = meta[a];
          return typeof c === 'string' ? c :
              '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
      }) + '"' : '"' + string + '"';
  }


  function str(key, holder) {

// Produce a string from holder[key].

      var i,          // The loop counter.
          k,          // The member key.
          v,          // The member value.
          length,
          mind = gap,
          partial,
          value = holder[key];

// If the value has a toJSON method, call it to obtain a replacement value.

      if (value instanceof Date) {
          value = date(key);
      }

// If we were called with a replacer function, then call the replacer to
// obtain a replacement value.

      if (typeof rep === 'function') {
          value = rep.call(holder, key, value);
      }

// What happens next depends on the value's type.

      switch (typeof value) {
      case 'string':
          return quote(value);

      case 'number':

// JSON numbers must be finite. Encode non-finite numbers as null.

          return isFinite(value) ? String(value) : 'null';

      case 'boolean':
      case 'null':

// If the value is a boolean or null, convert it to a string. Note:
// typeof null does not produce 'null'. The case is included here in
// the remote chance that this gets fixed someday.

          return String(value);

// If the type is 'object', we might be dealing with an object or an array or
// null.

      case 'object':

// Due to a specification blunder in ECMAScript, typeof null is 'object',
// so watch out for that case.

          if (!value) {
              return 'null';
          }

// Make an array to hold the partial results of stringifying this object value.

          gap += indent;
          partial = [];

// Is the value an array?

          if (Object.prototype.toString.apply(value) === '[object Array]') {

// The value is an array. Stringify every element. Use null as a placeholder
// for non-JSON values.

              length = value.length;
              for (i = 0; i < length; i += 1) {
                  partial[i] = str(i, value) || 'null';
              }

// Join all of the elements together, separated with commas, and wrap them in
// brackets.

              v = partial.length === 0 ? '[]' : gap ?
                  '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' :
                  '[' + partial.join(',') + ']';
              gap = mind;
              return v;
          }

// If the replacer is an array, use it to select the members to be stringified.

          if (rep && typeof rep === 'object') {
              length = rep.length;
              for (i = 0; i < length; i += 1) {
                  if (typeof rep[i] === 'string') {
                      k = rep[i];
                      v = str(k, value);
                      if (v) {
                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
                      }
                  }
              }
          } else {

// Otherwise, iterate through all of the keys in the object.

              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = str(k, value);
                      if (v) {
                          partial.push(quote(k) + (gap ? ': ' : ':') + v);
                      }
                  }
              }
          }

// Join all of the member texts together, separated with commas,
// and wrap them in braces.

          v = partial.length === 0 ? '{}' : gap ?
              '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' :
              '{' + partial.join(',') + '}';
          gap = mind;
          return v;
      }
  }

// If the JSON object does not yet have a stringify method, give it one.

  JSON.stringify = function (value, replacer, space) {

// The stringify method takes a value and an optional replacer, and an optional
// space parameter, and returns a JSON text. The replacer can be a function
// that can replace values, or an array of strings that will select the keys.
// A default replacer method can be provided. Use of the space parameter can
// produce text that is more easily readable.

      var i;
      gap = '';
      indent = '';

// If the space parameter is a number, make an indent string containing that
// many spaces.

      if (typeof space === 'number') {
          for (i = 0; i < space; i += 1) {
              indent += ' ';
          }

// If the space parameter is a string, it will be used as the indent string.

      } else if (typeof space === 'string') {
          indent = space;
      }

// If there is a replacer, it must be a function or an array.
// Otherwise, throw an error.

      rep = replacer;
      if (replacer && typeof replacer !== 'function' &&
              (typeof replacer !== 'object' ||
              typeof replacer.length !== 'number')) {
          throw new Error('JSON.stringify');
      }

// Make a fake root object containing our value under the key of ''.
// Return the result of stringifying the value.

      return str('', {'': value});
  };

// If the JSON object does not yet have a parse method, give it one.

  JSON.parse = function (text, reviver) {
  // The parse method takes a text and an optional reviver function, and returns
  // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {

  // The walk method is used to recursively walk the resulting structure so
  // that modifications can be made.

          var k, v, value = holder[key];
          if (value && typeof value === 'object') {
              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = walk(value, k);
                      if (v !== undefined) {
                          value[k] = v;
                      } else {
                          delete value[k];
                      }
                  }
              }
          }
          return reviver.call(holder, key, value);
      }


  // Parsing happens in four stages. In the first stage, we replace certain
  // Unicode characters with escape sequences. JavaScript handles many characters
  // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      cx.lastIndex = 0;
      if (cx.test(text)) {
          text = text.replace(cx, function (a) {
              return '\\u' +
                  ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
          });
      }

  // In the second stage, we run the text against regular expressions that look
  // for non-JSON patterns. We are especially concerned with '()' and 'new'
  // because they can cause invocation, and '=' because it can cause mutation.
  // But just to be safe, we want to reject all unexpected forms.

  // We split the second stage into 4 regexp operations in order to work around
  // crippling inefficiencies in IE's and Safari's regexp engines. First we
  // replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
  // replace all simple value tokens with ']' characters. Third, we delete all
  // open brackets that follow a colon or comma or that begin the text. Finally,
  // we look to see that the remaining characters are only whitespace or ']' or
  // ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

      if (/^[\],:{}\s]*$/
              .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {

  // In the third stage we use the eval function to compile the text into a
  // JavaScript structure. The '{' operator is subject to a syntactic ambiguity
  // in JavaScript: it can begin a block or an object literal. We wrap the text
  // in parens to eliminate the ambiguity.

          j = eval('(' + text + ')');

  // In the optional fourth stage, we recursively walk the new structure, passing
  // each name/value pair to a reviver function for possible transformation.

          return typeof reviver === 'function' ?
              walk({'': j}, '') : j;
      }

  // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError('JSON.parse');
  };

})(
    'undefined' != typeof io ? io : module.exports
  , typeof JSON !== 'undefined' ? JSON : undefined
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Parser namespace.
   *
   * @namespace
   */

  var parser = exports.parser = {};

  /**
   * Packet types.
   */

  var packets = parser.packets = [
      'disconnect'
    , 'connect'
    , 'heartbeat'
    , 'message'
    , 'json'
    , 'event'
    , 'ack'
    , 'error'
    , 'noop'
  ];

  /**
   * Errors reasons.
   */

  var reasons = parser.reasons = [
      'transport not supported'
    , 'client not handshaken'
    , 'unauthorized'
  ];

  /**
   * Errors advice.
   */

  var advice = parser.advice = [
      'reconnect'
  ];

  /**
   * Shortcuts.
   */

  var JSON = io.JSON
    , indexOf = io.util.indexOf;

  /**
   * Encodes a packet.
   *
   * @api private
   */

  parser.encodePacket = function (packet) {
    var type = indexOf(packets, packet.type)
      , id = packet.id || ''
      , endpoint = packet.endpoint || ''
      , ack = packet.ack
      , data = null;

    switch (packet.type) {
      case 'error':
        var reason = packet.reason ? indexOf(reasons, packet.reason) : ''
          , adv = packet.advice ? indexOf(advice, packet.advice) : '';

        if (reason !== '' || adv !== '')
          data = reason + (adv !== '' ? ('+' + adv) : '');

        break;

      case 'message':
        if (packet.data !== '')
          data = packet.data;
        break;

      case 'event':
        var ev = { name: packet.name };

        if (packet.args && packet.args.length) {
          ev.args = packet.args;
        }

        data = JSON.stringify(ev);
        break;

      case 'json':
        data = JSON.stringify(packet.data);
        break;

      case 'connect':
        if (packet.qs)
          data = packet.qs;
        break;

      case 'ack':
        data = packet.ackId
          + (packet.args && packet.args.length
              ? '+' + JSON.stringify(packet.args) : '');
        break;
    }

    // construct packet with required fragments
    var encoded = [
        type
      , id + (ack == 'data' ? '+' : '')
      , endpoint
    ];

    // data fragment is optional
    if (data !== null && data !== undefined)
      encoded.push(data);

    return encoded.join(':');
  };

  /**
   * Encodes multiple messages (payload).
   *
   * @param {Array} messages
   * @api private
   */

  parser.encodePayload = function (packets) {
    var decoded = '';

    if (packets.length == 1)
      return packets[0];

    for (var i = 0, l = packets.length; i < l; i++) {
      var packet = packets[i];
      decoded += '\ufffd' + packet.length + '\ufffd' + packets[i];
    }

    return decoded;
  };

  /**
   * Decodes a packet
   *
   * @api private
   */

  var regexp = /([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;

  parser.decodePacket = function (data) {
    var pieces = data.match(regexp);

    if (!pieces) return {};

    var id = pieces[2] || ''
      , data = pieces[5] || ''
      , packet = {
            type: packets[pieces[1]]
          , endpoint: pieces[4] || ''
        };

    // whether we need to acknowledge the packet
    if (id) {
      packet.id = id;
      if (pieces[3])
        packet.ack = 'data';
      else
        packet.ack = true;
    }

    // handle different packet types
    switch (packet.type) {
      case 'error':
        var pieces = data.split('+');
        packet.reason = reasons[pieces[0]] || '';
        packet.advice = advice[pieces[1]] || '';
        break;

      case 'message':
        packet.data = data || '';
        break;

      case 'event':
        try {
          var opts = JSON.parse(data);
          packet.name = opts.name;
          packet.args = opts.args;
        } catch (e) { }

        packet.args = packet.args || [];
        break;

      case 'json':
        try {
          packet.data = JSON.parse(data);
        } catch (e) { }
        break;

      case 'connect':
        packet.qs = data || '';
        break;

      case 'ack':
        var pieces = data.match(/^([0-9]+)(\+)?(.*)/);
        if (pieces) {
          packet.ackId = pieces[1];
          packet.args = [];

          if (pieces[3]) {
            try {
              packet.args = pieces[3] ? JSON.parse(pieces[3]) : [];
            } catch (e) { }
          }
        }
        break;

      case 'disconnect':
      case 'heartbeat':
        break;
    };

    return packet;
  };

  /**
   * Decodes data payload. Detects multiple messages
   *
   * @return {Array} messages
   * @api public
   */

  parser.decodePayload = function (data) {
    // IE doesn't like data[i] for unicode chars, charAt works fine
    if (data.charAt(0) == '\ufffd') {
      var ret = [];

      for (var i = 1, length = ''; i < data.length; i++) {
        if (data.charAt(i) == '\ufffd') {
          ret.push(parser.decodePacket(data.substr(i + 1).substr(0, length)));
          i += Number(length) + 1;
          length = '';
        } else {
          length += data.charAt(i);
        }
      }

      return ret;
    } else {
      return [parser.decodePacket(data)];
    }
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.Transport = Transport;

  /**
   * This is the transport template for all supported transport methods.
   *
   * @constructor
   * @api public
   */

  function Transport (socket, sessid) {
    this.socket = socket;
    this.sessid = sessid;
  };

  /**
   * Apply EventEmitter mixin.
   */

  io.util.mixin(Transport, io.EventEmitter);


  /**
   * Indicates whether heartbeats is enabled for this transport
   *
   * @api private
   */

  Transport.prototype.heartbeats = function () {
    return true;
  };

  /**
   * Handles the response from the server. When a new response is received
   * it will automatically update the timeout, decode the message and
   * forwards the response to the onMessage function for further processing.
   *
   * @param {String} data Response from the server.
   * @api private
   */

  Transport.prototype.onData = function (data) {
    this.clearCloseTimeout();

    // If the connection in currently open (or in a reopening state) reset the close
    // timeout since we have just received data. This check is necessary so
    // that we don't reset the timeout on an explicitly disconnected connection.
    if (this.socket.connected || this.socket.connecting || this.socket.reconnecting) {
      this.setCloseTimeout();
    }

    if (data !== '') {
      // todo: we should only do decodePayload for xhr transports
      var msgs = io.parser.decodePayload(data);

      if (msgs && msgs.length) {
        for (var i = 0, l = msgs.length; i < l; i++) {
          this.onPacket(msgs[i]);
        }
      }
    }

    return this;
  };

  /**
   * Handles packets.
   *
   * @api private
   */

  Transport.prototype.onPacket = function (packet) {
    this.socket.setHeartbeatTimeout();

    if (packet.type == 'heartbeat') {
      return this.onHeartbeat();
    }

    if (packet.type == 'connect' && packet.endpoint == '') {
      this.onConnect();
    }

    if (packet.type == 'error' && packet.advice == 'reconnect') {
      this.isOpen = false;
    }

    this.socket.onPacket(packet);

    return this;
  };

  /**
   * Sets close timeout
   *
   * @api private
   */

  Transport.prototype.setCloseTimeout = function () {
    if (!this.closeTimeout) {
      var self = this;

      this.closeTimeout = setTimeout(function () {
        self.onDisconnect();
      }, this.socket.closeTimeout);
    }
  };

  /**
   * Called when transport disconnects.
   *
   * @api private
   */

  Transport.prototype.onDisconnect = function () {
    if (this.isOpen) this.close();
    this.clearTimeouts();
    this.socket.onDisconnect();
    return this;
  };

  /**
   * Called when transport connects
   *
   * @api private
   */

  Transport.prototype.onConnect = function () {
    this.socket.onConnect();
    return this;
  };

  /**
   * Clears close timeout
   *
   * @api private
   */

  Transport.prototype.clearCloseTimeout = function () {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  };

  /**
   * Clear timeouts
   *
   * @api private
   */

  Transport.prototype.clearTimeouts = function () {
    this.clearCloseTimeout();

    if (this.reopenTimeout) {
      clearTimeout(this.reopenTimeout);
    }
  };

  /**
   * Sends a packet
   *
   * @param {Object} packet object.
   * @api private
   */

  Transport.prototype.packet = function (packet) {
    this.send(io.parser.encodePacket(packet));
  };

  /**
   * Send the received heartbeat message back to server. So the server
   * knows we are still connected.
   *
   * @param {String} heartbeat Heartbeat response from the server.
   * @api private
   */

  Transport.prototype.onHeartbeat = function (heartbeat) {
    this.packet({ type: 'heartbeat' });
  };

  /**
   * Called when the transport opens.
   *
   * @api private
   */

  Transport.prototype.onOpen = function () {
    this.isOpen = true;
    this.clearCloseTimeout();
    this.socket.onOpen();
  };

  /**
   * Notifies the base when the connection with the Socket.IO server
   * has been disconnected.
   *
   * @api private
   */

  Transport.prototype.onClose = function () {
    var self = this;

    /* FIXME: reopen delay causing a infinit loop
    this.reopenTimeout = setTimeout(function () {
      self.open();
    }, this.socket.options['reopen delay']);*/

    this.isOpen = false;
    this.socket.onClose();
    this.onDisconnect();
  };

  /**
   * Generates a connection url based on the Socket.IO URL Protocol.
   * See <https://github.com/learnboost/socket.io-node/> for more details.
   *
   * @returns {String} Connection url
   * @api private
   */

  Transport.prototype.prepareUrl = function () {
    var options = this.socket.options;

    return this.scheme() + '://'
      + options.host + ':' + options.port + '/'
      + options.resource + '/' + io.protocol
      + '/' + this.name + '/' + this.sessid;
  };

  /**
   * Checks if the transport is ready to start a connection.
   *
   * @param {Socket} socket The socket instance that needs a transport
   * @param {Function} fn The callback
   * @api private
   */

  Transport.prototype.ready = function (socket, fn) {
    fn.call(this);
  };
})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {

  /**
   * Expose constructor.
   */

  exports.Socket = Socket;

  /**
   * Create a new `Socket.IO client` which can establish a persistent
   * connection with a Socket.IO enabled server.
   *
   * @api public
   */

  function Socket (options) {
    this.options = {
        port: 80
      , secure: false
      , document: 'document' in global ? document : false
      , resource: 'socket.io'
      , transports: io.transports
      , 'connect timeout': 10000
      , 'try multiple transports': true
      , 'reconnect': true
      , 'reconnection delay': 500
      , 'reconnection limit': Infinity
      , 'reopen delay': 3000
      , 'max reconnection attempts': 10
      , 'sync disconnect on unload': false
      , 'auto connect': true
      , 'flash policy port': 10843
      , 'manualFlush': false
    };

    io.util.merge(this.options, options);

    this.connected = false;
    this.open = false;
    this.connecting = false;
    this.reconnecting = false;
    this.namespaces = {};
    this.buffer = [];
    this.doBuffer = false;

    if (this.options['sync disconnect on unload'] &&
        (!this.isXDomain() || io.util.ua.hasCORS)) {
      var self = this;
      io.util.on(global, 'beforeunload', function () {
        self.disconnectSync();
      }, false);
    }

    if (this.options['auto connect']) {
      this.connect();
    }
};

  /**
   * Apply EventEmitter mixin.
   */

  io.util.mixin(Socket, io.EventEmitter);

  /**
   * Returns a namespace listener/emitter for this socket
   *
   * @api public
   */

  Socket.prototype.of = function (name) {
    if (!this.namespaces[name]) {
      this.namespaces[name] = new io.SocketNamespace(this, name);

      if (name !== '') {
        this.namespaces[name].packet({ type: 'connect' });
      }
    }

    return this.namespaces[name];
  };

  /**
   * Emits the given event to the Socket and all namespaces
   *
   * @api private
   */

  Socket.prototype.publish = function () {
    this.emit.apply(this, arguments);

    var nsp;

    for (var i in this.namespaces) {
      if (this.namespaces.hasOwnProperty(i)) {
        nsp = this.of(i);
        nsp.$emit.apply(nsp, arguments);
      }
    }
  };

  /**
   * Performs the handshake
   *
   * @api private
   */

  function empty () { };

  Socket.prototype.handshake = function (fn) {
    var self = this
      , options = this.options;

    function complete (data) {
      if (data instanceof Error) {
        self.connecting = false;
        self.onError(data.message);
      } else {
        fn.apply(null, data.split(':'));
      }
    };

    var url = [
          'http' + (options.secure ? 's' : '') + ':/'
        , options.host + ':' + options.port
        , options.resource
        , io.protocol
        , io.util.query(this.options.query, 't=' + +new Date)
      ].join('/');

    if (this.isXDomain() && !io.util.ua.hasCORS) {
      var insertAt = document.getElementsByTagName('script')[0]
        , script = document.createElement('script');

      script.src = url + '&jsonp=' + io.j.length;
      insertAt.parentNode.insertBefore(script, insertAt);

      io.j.push(function (data) {
        complete(data);
        script.parentNode.removeChild(script);
      });
    } else {
      var xhr = io.util.request();

      xhr.open('GET', url, true);
      if (this.isXDomain()) {
        xhr.withCredentials = true;
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
          xhr.onreadystatechange = empty;

          if (xhr.status == 200) {
            complete(xhr.responseText);
          } else if (xhr.status == 403) {
            self.onError(xhr.responseText);
          } else {
            self.connecting = false;            
            !self.reconnecting && self.onError(xhr.responseText);
          }
        }
      };
      xhr.send(null);
    }
  };

  /**
   * Find an available transport based on the options supplied in the constructor.
   *
   * @api private
   */

  Socket.prototype.getTransport = function (override) {
    var transports = override || this.transports, match;

    for (var i = 0, transport; transport = transports[i]; i++) {
      if (io.Transport[transport]
        && io.Transport[transport].check(this)
        && (!this.isXDomain() || io.Transport[transport].xdomainCheck(this))) {
        return new io.Transport[transport](this, this.sessionid);
      }
    }

    return null;
  };

  /**
   * Connects to the server.
   *
   * @param {Function} [fn] Callback.
   * @returns {io.Socket}
   * @api public
   */

  Socket.prototype.connect = function (fn) {
    if (this.connecting) {
      return this;
    }

    var self = this;
    self.connecting = true;
    
    this.handshake(function (sid, heartbeat, close, transports) {
      self.sessionid = sid;
      self.closeTimeout = close * 1000;
      self.heartbeatTimeout = heartbeat * 1000;
      if(!self.transports)
          self.transports = self.origTransports = (transports ? io.util.intersect(
              transports.split(',')
            , self.options.transports
          ) : self.options.transports);

      self.setHeartbeatTimeout();

      function connect (transports){
        if (self.transport) self.transport.clearTimeouts();

        self.transport = self.getTransport(transports);
        if (!self.transport) return self.publish('connect_failed');

        // once the transport is ready
        self.transport.ready(self, function () {
          self.connecting = true;
          self.publish('connecting', self.transport.name);
          self.transport.open();

          if (self.options['connect timeout']) {
            self.connectTimeoutTimer = setTimeout(function () {
              if (!self.connected) {
                self.connecting = false;

                if (self.options['try multiple transports']) {
                  var remaining = self.transports;

                  while (remaining.length > 0 && remaining.splice(0,1)[0] !=
                         self.transport.name) {}

                    if (remaining.length){
                      connect(remaining);
                    } else {
                      self.publish('connect_failed');
                    }
                }
              }
            }, self.options['connect timeout']);
          }
        });
      }

      connect(self.transports);

      self.once('connect', function (){
        clearTimeout(self.connectTimeoutTimer);

        fn && typeof fn == 'function' && fn();
      });
    });

    return this;
  };

  /**
   * Clears and sets a new heartbeat timeout using the value given by the
   * server during the handshake.
   *
   * @api private
   */

  Socket.prototype.setHeartbeatTimeout = function () {
    clearTimeout(this.heartbeatTimeoutTimer);
    if(this.transport && !this.transport.heartbeats()) return;

    var self = this;
    this.heartbeatTimeoutTimer = setTimeout(function () {
      self.transport.onClose();
    }, this.heartbeatTimeout);
  };

  /**
   * Sends a message.
   *
   * @param {Object} data packet.
   * @returns {io.Socket}
   * @api public
   */

  Socket.prototype.packet = function (data) {
    if (this.connected && !this.doBuffer) {
      this.transport.packet(data);
    } else {
      this.buffer.push(data);
    }

    return this;
  };

  /**
   * Sets buffer state
   *
   * @api private
   */

  Socket.prototype.setBuffer = function (v) {
    this.doBuffer = v;

    if (!v && this.connected && this.buffer.length) {
      if (!this.options['manualFlush']) {
        this.flushBuffer();
      }
    }
  };

  /**
   * Flushes the buffer data over the wire.
   * To be invoked manually when 'manualFlush' is set to true.
   *
   * @api public
   */

  Socket.prototype.flushBuffer = function() {
    this.transport.payload(this.buffer);
    this.buffer = [];
  };
  

  /**
   * Disconnect the established connect.
   *
   * @returns {io.Socket}
   * @api public
   */

  Socket.prototype.disconnect = function () {
    if (this.connected || this.connecting) {
      if (this.open) {
        this.of('').packet({ type: 'disconnect' });
      }

      // handle disconnection immediately
      this.onDisconnect('booted');
    }

    return this;
  };

  /**
   * Disconnects the socket with a sync XHR.
   *
   * @api private
   */

  Socket.prototype.disconnectSync = function () {
    // ensure disconnection
    var xhr = io.util.request();
    var uri = [
        'http' + (this.options.secure ? 's' : '') + ':/'
      , this.options.host + ':' + this.options.port
      , this.options.resource
      , io.protocol
      , ''
      , this.sessionid
    ].join('/') + '/?disconnect=1';

    xhr.open('GET', uri, false);
    xhr.send(null);

    // handle disconnection immediately
    this.onDisconnect('booted');
  };

  /**
   * Check if we need to use cross domain enabled transports. Cross domain would
   * be a different port or different domain name.
   *
   * @returns {Boolean}
   * @api private
   */

  Socket.prototype.isXDomain = function () {

    var port = global.location.port ||
      ('https:' == global.location.protocol ? 443 : 80);

    return this.options.host !== global.location.hostname 
      || this.options.port != port;
  };

  /**
   * Called upon handshake.
   *
   * @api private
   */

  Socket.prototype.onConnect = function () {
    if (!this.connected) {
      this.connected = true;
      this.connecting = false;
      if (!this.doBuffer) {
        // make sure to flush the buffer
        this.setBuffer(false);
      }
      this.emit('connect');
    }
  };

  /**
   * Called when the transport opens
   *
   * @api private
   */

  Socket.prototype.onOpen = function () {
    this.open = true;
  };

  /**
   * Called when the transport closes.
   *
   * @api private
   */

  Socket.prototype.onClose = function () {
    this.open = false;
    clearTimeout(this.heartbeatTimeoutTimer);
  };

  /**
   * Called when the transport first opens a connection
   *
   * @param text
   */

  Socket.prototype.onPacket = function (packet) {
    this.of(packet.endpoint).onPacket(packet);
  };

  /**
   * Handles an error.
   *
   * @api private
   */

  Socket.prototype.onError = function (err) {
    if (err && err.advice) {
      if (err.advice === 'reconnect' && (this.connected || this.connecting)) {
        this.disconnect();
        if (this.options.reconnect) {
          this.reconnect();
        }
      }
    }

    this.publish('error', err && err.reason ? err.reason : err);
  };

  /**
   * Called when the transport disconnects.
   *
   * @api private
   */

  Socket.prototype.onDisconnect = function (reason) {
    var wasConnected = this.connected
      , wasConnecting = this.connecting;

    this.connected = false;
    this.connecting = false;
    this.open = false;

    if (wasConnected || wasConnecting) {
      this.transport.close();
      this.transport.clearTimeouts();
      if (wasConnected) {
        this.publish('disconnect', reason);

        if ('booted' != reason && this.options.reconnect && !this.reconnecting) {
          this.reconnect();
        }
      }
    }
  };

  /**
   * Called upon reconnection.
   *
   * @api private
   */

  Socket.prototype.reconnect = function () {
    this.reconnecting = true;
    this.reconnectionAttempts = 0;
    this.reconnectionDelay = this.options['reconnection delay'];

    var self = this
      , maxAttempts = this.options['max reconnection attempts']
      , tryMultiple = this.options['try multiple transports']
      , limit = this.options['reconnection limit'];

    function reset () {
      if (self.connected) {
        for (var i in self.namespaces) {
          if (self.namespaces.hasOwnProperty(i) && '' !== i) {
              self.namespaces[i].packet({ type: 'connect' });
          }
        }
        self.publish('reconnect', self.transport.name, self.reconnectionAttempts);
      }

      clearTimeout(self.reconnectionTimer);

      self.removeListener('connect_failed', maybeReconnect);
      self.removeListener('connect', maybeReconnect);

      self.reconnecting = false;

      delete self.reconnectionAttempts;
      delete self.reconnectionDelay;
      delete self.reconnectionTimer;
      delete self.redoTransports;

      self.options['try multiple transports'] = tryMultiple;
    };

    function maybeReconnect () {
      if (!self.reconnecting) {
        return;
      }

      if (self.connected) {
        return reset();
      };

      if (self.connecting && self.reconnecting) {
        return self.reconnectionTimer = setTimeout(maybeReconnect, 1000);
      }

      if (self.reconnectionAttempts++ >= maxAttempts) {
        if (!self.redoTransports) {
          self.on('connect_failed', maybeReconnect);
          self.options['try multiple transports'] = true;
          self.transports = self.origTransports;
          self.transport = self.getTransport();
          self.redoTransports = true;
          self.connect();
        } else {
          self.publish('reconnect_failed');
          reset();
        }
      } else {
        if (self.reconnectionDelay < limit) {
          self.reconnectionDelay *= 2; // exponential back off
        }

        self.connect();
        self.publish('reconnecting', self.reconnectionDelay, self.reconnectionAttempts);
        self.reconnectionTimer = setTimeout(maybeReconnect, self.reconnectionDelay);
      }
    };

    this.options['try multiple transports'] = false;
    this.reconnectionTimer = setTimeout(maybeReconnect, this.reconnectionDelay);

    this.on('connect', maybeReconnect);
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.SocketNamespace = SocketNamespace;

  /**
   * Socket namespace constructor.
   *
   * @constructor
   * @api public
   */

  function SocketNamespace (socket, name) {
    this.socket = socket;
    this.name = name || '';
    this.flags = {};
    this.json = new Flag(this, 'json');
    this.ackPackets = 0;
    this.acks = {};
  };

  /**
   * Apply EventEmitter mixin.
   */

  io.util.mixin(SocketNamespace, io.EventEmitter);

  /**
   * Copies emit since we override it
   *
   * @api private
   */

  SocketNamespace.prototype.$emit = io.EventEmitter.prototype.emit;

  /**
   * Creates a new namespace, by proxying the request to the socket. This
   * allows us to use the synax as we do on the server.
   *
   * @api public
   */

  SocketNamespace.prototype.of = function () {
    return this.socket.of.apply(this.socket, arguments);
  };

  /**
   * Sends a packet.
   *
   * @api private
   */

  SocketNamespace.prototype.packet = function (packet) {
    packet.endpoint = this.name;
    this.socket.packet(packet);
    this.flags = {};
    return this;
  };

  /**
   * Sends a message
   *
   * @api public
   */

  SocketNamespace.prototype.send = function (data, fn) {
    var packet = {
        type: this.flags.json ? 'json' : 'message'
      , data: data
    };

    if ('function' == typeof fn) {
      packet.id = ++this.ackPackets;
      packet.ack = true;
      this.acks[packet.id] = fn;
    }

    return this.packet(packet);
  };

  /**
   * Emits an event
   *
   * @api public
   */
  
  SocketNamespace.prototype.emit = function (name) {
    var args = Array.prototype.slice.call(arguments, 1)
      , lastArg = args[args.length - 1]
      , packet = {
            type: 'event'
          , name: name
        };

    if ('function' == typeof lastArg) {
      packet.id = ++this.ackPackets;
      packet.ack = 'data';
      this.acks[packet.id] = lastArg;
      args = args.slice(0, args.length - 1);
    }

    packet.args = args;

    return this.packet(packet);
  };

  /**
   * Disconnects the namespace
   *
   * @api private
   */

  SocketNamespace.prototype.disconnect = function () {
    if (this.name === '') {
      this.socket.disconnect();
    } else {
      this.packet({ type: 'disconnect' });
      this.$emit('disconnect');
    }

    return this;
  };

  /**
   * Handles a packet
   *
   * @api private
   */

  SocketNamespace.prototype.onPacket = function (packet) {
    var self = this;

    function ack () {
      self.packet({
          type: 'ack'
        , args: io.util.toArray(arguments)
        , ackId: packet.id
      });
    };

    switch (packet.type) {
      case 'connect':
        this.$emit('connect');
        break;

      case 'disconnect':
        if (this.name === '') {
          this.socket.onDisconnect(packet.reason || 'booted');
        } else {
          this.$emit('disconnect', packet.reason);
        }
        break;

      case 'message':
      case 'json':
        var params = ['message', packet.data];

        if (packet.ack == 'data') {
          params.push(ack);
        } else if (packet.ack) {
          this.packet({ type: 'ack', ackId: packet.id });
        }

        this.$emit.apply(this, params);
        break;

      case 'event':
        var params = [packet.name].concat(packet.args);

        if (packet.ack == 'data')
          params.push(ack);

        this.$emit.apply(this, params);
        break;

      case 'ack':
        if (this.acks[packet.ackId]) {
          this.acks[packet.ackId].apply(this, packet.args);
          delete this.acks[packet.ackId];
        }
        break;

      case 'error':
        if (packet.advice){
          this.socket.onError(packet);
        } else {
          if (packet.reason == 'unauthorized') {
            this.$emit('connect_failed', packet.reason);
          } else {
            this.$emit('error', packet.reason);
          }
        }
        break;
    }
  };

  /**
   * Flag interface.
   *
   * @api private
   */

  function Flag (nsp, name) {
    this.namespace = nsp;
    this.name = name;
  };

  /**
   * Send a message
   *
   * @api public
   */

  Flag.prototype.send = function () {
    this.namespace.flags[this.name] = true;
    this.namespace.send.apply(this.namespace, arguments);
  };

  /**
   * Emit an event
   *
   * @api public
   */

  Flag.prototype.emit = function () {
    this.namespace.flags[this.name] = true;
    this.namespace.emit.apply(this.namespace, arguments);
  };

})(
    'undefined' != typeof io ? io : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {

  /**
   * Expose constructor.
   */

  exports.websocket = WS;

  /**
   * The WebSocket transport uses the HTML5 WebSocket API to establish an
   * persistent connection with the Socket.IO server. This transport will also
   * be inherited by the FlashSocket fallback as it provides a API compatible
   * polyfill for the WebSockets.
   *
   * @constructor
   * @extends {io.Transport}
   * @api public
   */

  function WS (socket) {
    io.Transport.apply(this, arguments);
  };

  /**
   * Inherits from Transport.
   */

  io.util.inherit(WS, io.Transport);

  /**
   * Transport name
   *
   * @api public
   */

  WS.prototype.name = 'websocket';

  /**
   * Initializes a new `WebSocket` connection with the Socket.IO server. We attach
   * all the appropriate listeners to handle the responses from the server.
   *
   * @returns {Transport}
   * @api public
   */

  WS.prototype.open = function () {
    var query = io.util.query(this.socket.options.query)
      , self = this
      , Socket


    if (!Socket) {
      Socket = global.MozWebSocket || global.WebSocket;
    }

    this.websocket = new Socket(this.prepareUrl() + query);

    this.websocket.onopen = function () {
      self.onOpen();
      self.socket.setBuffer(false);
    };
    this.websocket.onmessage = function (ev) {
      self.onData(ev.data);
    };
    this.websocket.onclose = function () {
      self.onClose();
      self.socket.setBuffer(true);
    };
    this.websocket.onerror = function (e) {
      self.onError(e);
    };

    return this;
  };

  /**
   * Send a message to the Socket.IO server. The message will automatically be
   * encoded in the correct message format.
   *
   * @returns {Transport}
   * @api public
   */

  // Do to a bug in the current IDevices browser, we need to wrap the send in a 
  // setTimeout, when they resume from sleeping the browser will crash if 
  // we don't allow the browser time to detect the socket has been closed
  if (io.util.ua.iDevice) {
    WS.prototype.send = function (data) {
      var self = this;
      setTimeout(function() {
         self.websocket.send(data);
      },0);
      return this;
    };
  } else {
    WS.prototype.send = function (data) {
      this.websocket.send(data);
      return this;
    };
  }

  /**
   * Payload
   *
   * @api private
   */

  WS.prototype.payload = function (arr) {
    for (var i = 0, l = arr.length; i < l; i++) {
      this.packet(arr[i]);
    }
    return this;
  };

  /**
   * Disconnect the established `WebSocket` connection.
   *
   * @returns {Transport}
   * @api public
   */

  WS.prototype.close = function () {
    this.websocket.close();
    return this;
  };

  /**
   * Handle the errors that `WebSocket` might be giving when we
   * are attempting to connect or send messages.
   *
   * @param {Error} e The error.
   * @api private
   */

  WS.prototype.onError = function (e) {
    this.socket.onError(e);
  };

  /**
   * Returns the appropriate scheme for the URI generation.
   *
   * @api private
   */
  WS.prototype.scheme = function () {
    return this.socket.options.secure ? 'wss' : 'ws';
  };

  /**
   * Checks if the browser has support for native `WebSockets` and that
   * it's not the polyfill created for the FlashSocket transport.
   *
   * @return {Boolean}
   * @api public
   */

  WS.check = function () {
    return ('WebSocket' in global && !('__addTask' in WebSocket))
          || 'MozWebSocket' in global;
  };

  /**
   * Check if the `WebSocket` transport support cross domain communications.
   *
   * @returns {Boolean}
   * @api public
   */

  WS.xdomainCheck = function () {
    return true;
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('websocket');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.flashsocket = Flashsocket;

  /**
   * The FlashSocket transport. This is a API wrapper for the HTML5 WebSocket
   * specification. It uses a .swf file to communicate with the server. If you want
   * to serve the .swf file from a other server than where the Socket.IO script is
   * coming from you need to use the insecure version of the .swf. More information
   * about this can be found on the github page.
   *
   * @constructor
   * @extends {io.Transport.websocket}
   * @api public
   */

  function Flashsocket () {
    io.Transport.websocket.apply(this, arguments);
  };

  /**
   * Inherits from Transport.
   */

  io.util.inherit(Flashsocket, io.Transport.websocket);

  /**
   * Transport name
   *
   * @api public
   */

  Flashsocket.prototype.name = 'flashsocket';

  /**
   * Disconnect the established `FlashSocket` connection. This is done by adding a 
   * new task to the FlashSocket. The rest will be handled off by the `WebSocket` 
   * transport.
   *
   * @returns {Transport}
   * @api public
   */

  Flashsocket.prototype.open = function () {
    var self = this
      , args = arguments;

    WebSocket.__addTask(function () {
      io.Transport.websocket.prototype.open.apply(self, args);
    });
    return this;
  };
  
  /**
   * Sends a message to the Socket.IO server. This is done by adding a new
   * task to the FlashSocket. The rest will be handled off by the `WebSocket` 
   * transport.
   *
   * @returns {Transport}
   * @api public
   */

  Flashsocket.prototype.send = function () {
    var self = this, args = arguments;
    WebSocket.__addTask(function () {
      io.Transport.websocket.prototype.send.apply(self, args);
    });
    return this;
  };

  /**
   * Disconnects the established `FlashSocket` connection.
   *
   * @returns {Transport}
   * @api public
   */

  Flashsocket.prototype.close = function () {
    WebSocket.__tasks.length = 0;
    io.Transport.websocket.prototype.close.call(this);
    return this;
  };

  /**
   * The WebSocket fall back needs to append the flash container to the body
   * element, so we need to make sure we have access to it. Or defer the call
   * until we are sure there is a body element.
   *
   * @param {Socket} socket The socket instance that needs a transport
   * @param {Function} fn The callback
   * @api private
   */

  Flashsocket.prototype.ready = function (socket, fn) {
    function init () {
      var options = socket.options
        , port = options['flash policy port']
        , path = [
              'http' + (options.secure ? 's' : '') + ':/'
            , options.host + ':' + options.port
            , options.resource
            , 'static/flashsocket'
            , 'WebSocketMain' + (socket.isXDomain() ? 'Insecure' : '') + '.swf'
          ];

      // Only start downloading the swf file when the checked that this browser
      // actually supports it
      if (!Flashsocket.loaded) {
        if (typeof WEB_SOCKET_SWF_LOCATION === 'undefined') {
          // Set the correct file based on the XDomain settings
          WEB_SOCKET_SWF_LOCATION = path.join('/');
        }

        if (port !== 843) {
          WebSocket.loadFlashPolicyFile('xmlsocket://' + options.host + ':' + port);
        }

        WebSocket.__initialize();
        Flashsocket.loaded = true;
      }

      fn.call(self);
    }

    var self = this;
    if (document.body) return init();

    io.util.load(init);
  };

  /**
   * Check if the FlashSocket transport is supported as it requires that the Adobe
   * Flash Player plug-in version `10.0.0` or greater is installed. And also check if
   * the polyfill is correctly loaded.
   *
   * @returns {Boolean}
   * @api public
   */

  Flashsocket.check = function () {
    if (
        typeof WebSocket == 'undefined'
      || !('__initialize' in WebSocket) || !swfobject
    ) return false;

    return swfobject.getFlashPlayerVersion().major >= 10;
  };

  /**
   * Check if the FlashSocket transport can be used as cross domain / cross origin 
   * transport. Because we can't see which type (secure or insecure) of .swf is used
   * we will just return true.
   *
   * @returns {Boolean}
   * @api public
   */

  Flashsocket.xdomainCheck = function () {
    return true;
  };

  /**
   * Disable AUTO_INITIALIZATION
   */

  if (typeof window != 'undefined') {
    WEB_SOCKET_DISABLE_AUTO_INITIALIZATION = true;
  }

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('flashsocket');
})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);
/*	SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/
if ('undefined' != typeof window) {
var swfobject=function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O[(['Active'].concat('Object').join('X'))]!=D){try{var ad=new window[(['Active'].concat('Object').join('X'))](W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?(['Active'].concat('').join('X')):"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject){swfobject[X]=null}swfobject=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();
}
// Copyright: Hiroshi Ichikawa <http://gimite.net/en/>
// License: New BSD License
// Reference: http://dev.w3.org/html5/websockets/
// Reference: http://tools.ietf.org/html/draft-hixie-thewebsocketprotocol

(function() {
  
  if ('undefined' == typeof window || window.WebSocket) return;

  var console = window.console;
  if (!console || !console.log || !console.error) {
    console = {log: function(){ }, error: function(){ }};
  }
  
  if (!swfobject.hasFlashPlayerVersion("10.0.0")) {
    console.error("Flash Player >= 10.0.0 is required.");
    return;
  }
  if (location.protocol == "file:") {
    console.error(
      "WARNING: web-socket-js doesn't work in file:///... URL " +
      "unless you set Flash Security Settings properly. " +
      "Open the page via Web server i.e. http://...");
  }

  /**
   * This class represents a faux web socket.
   * @param {string} url
   * @param {array or string} protocols
   * @param {string} proxyHost
   * @param {int} proxyPort
   * @param {string} headers
   */
  WebSocket = function(url, protocols, proxyHost, proxyPort, headers) {
    var self = this;
    self.__id = WebSocket.__nextId++;
    WebSocket.__instances[self.__id] = self;
    self.readyState = WebSocket.CONNECTING;
    self.bufferedAmount = 0;
    self.__events = {};
    if (!protocols) {
      protocols = [];
    } else if (typeof protocols == "string") {
      protocols = [protocols];
    }
    // Uses setTimeout() to make sure __createFlash() runs after the caller sets ws.onopen etc.
    // Otherwise, when onopen fires immediately, onopen is called before it is set.
    setTimeout(function() {
      WebSocket.__addTask(function() {
        WebSocket.__flash.create(
            self.__id, url, protocols, proxyHost || null, proxyPort || 0, headers || null);
      });
    }, 0);
  };

  /**
   * Send data to the web socket.
   * @param {string} data  The data to send to the socket.
   * @return {boolean}  True for success, false for failure.
   */
  WebSocket.prototype.send = function(data) {
    if (this.readyState == WebSocket.CONNECTING) {
      throw "INVALID_STATE_ERR: Web Socket connection has not been established";
    }
    // We use encodeURIComponent() here, because FABridge doesn't work if
    // the argument includes some characters. We don't use escape() here
    // because of this:
    // https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Functions#escape_and_unescape_Functions
    // But it looks decodeURIComponent(encodeURIComponent(s)) doesn't
    // preserve all Unicode characters either e.g. "\uffff" in Firefox.
    // Note by wtritch: Hopefully this will not be necessary using ExternalInterface.  Will require
    // additional testing.
    var result = WebSocket.__flash.send(this.__id, encodeURIComponent(data));
    if (result < 0) { // success
      return true;
    } else {
      this.bufferedAmount += result;
      return false;
    }
  };

  /**
   * Close this web socket gracefully.
   */
  WebSocket.prototype.close = function() {
    if (this.readyState == WebSocket.CLOSED || this.readyState == WebSocket.CLOSING) {
      return;
    }
    this.readyState = WebSocket.CLOSING;
    WebSocket.__flash.close(this.__id);
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {string} type
   * @param {function} listener
   * @param {boolean} useCapture
   * @return void
   */
  WebSocket.prototype.addEventListener = function(type, listener, useCapture) {
    if (!(type in this.__events)) {
      this.__events[type] = [];
    }
    this.__events[type].push(listener);
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {string} type
   * @param {function} listener
   * @param {boolean} useCapture
   * @return void
   */
  WebSocket.prototype.removeEventListener = function(type, listener, useCapture) {
    if (!(type in this.__events)) return;
    var events = this.__events[type];
    for (var i = events.length - 1; i >= 0; --i) {
      if (events[i] === listener) {
        events.splice(i, 1);
        break;
      }
    }
  };

  /**
   * Implementation of {@link <a href="http://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-registration">DOM 2 EventTarget Interface</a>}
   *
   * @param {Event} event
   * @return void
   */
  WebSocket.prototype.dispatchEvent = function(event) {
    var events = this.__events[event.type] || [];
    for (var i = 0; i < events.length; ++i) {
      events[i](event);
    }
    var handler = this["on" + event.type];
    if (handler) handler(event);
  };

  /**
   * Handles an event from Flash.
   * @param {Object} flashEvent
   */
  WebSocket.prototype.__handleEvent = function(flashEvent) {
    if ("readyState" in flashEvent) {
      this.readyState = flashEvent.readyState;
    }
    if ("protocol" in flashEvent) {
      this.protocol = flashEvent.protocol;
    }
    
    var jsEvent;
    if (flashEvent.type == "open" || flashEvent.type == "error") {
      jsEvent = this.__createSimpleEvent(flashEvent.type);
    } else if (flashEvent.type == "close") {
      // TODO implement jsEvent.wasClean
      jsEvent = this.__createSimpleEvent("close");
    } else if (flashEvent.type == "message") {
      var data = decodeURIComponent(flashEvent.message);
      jsEvent = this.__createMessageEvent("message", data);
    } else {
      throw "unknown event type: " + flashEvent.type;
    }
    
    this.dispatchEvent(jsEvent);
  };
  
  WebSocket.prototype.__createSimpleEvent = function(type) {
    if (document.createEvent && window.Event) {
      var event = document.createEvent("Event");
      event.initEvent(type, false, false);
      return event;
    } else {
      return {type: type, bubbles: false, cancelable: false};
    }
  };
  
  WebSocket.prototype.__createMessageEvent = function(type, data) {
    if (document.createEvent && window.MessageEvent && !window.opera) {
      var event = document.createEvent("MessageEvent");
      event.initMessageEvent("message", false, false, data, null, null, window, null);
      return event;
    } else {
      // IE and Opera, the latter one truncates the data parameter after any 0x00 bytes.
      return {type: type, data: data, bubbles: false, cancelable: false};
    }
  };
  
  /**
   * Define the WebSocket readyState enumeration.
   */
  WebSocket.CONNECTING = 0;
  WebSocket.OPEN = 1;
  WebSocket.CLOSING = 2;
  WebSocket.CLOSED = 3;

  WebSocket.__flash = null;
  WebSocket.__instances = {};
  WebSocket.__tasks = [];
  WebSocket.__nextId = 0;
  
  /**
   * Load a new flash security policy file.
   * @param {string} url
   */
  WebSocket.loadFlashPolicyFile = function(url){
    WebSocket.__addTask(function() {
      WebSocket.__flash.loadManualPolicyFile(url);
    });
  };

  /**
   * Loads WebSocketMain.swf and creates WebSocketMain object in Flash.
   */
  WebSocket.__initialize = function() {
    if (WebSocket.__flash) return;
    
    if (WebSocket.__swfLocation) {
      // For backword compatibility.
      window.WEB_SOCKET_SWF_LOCATION = WebSocket.__swfLocation;
    }
    if (!window.WEB_SOCKET_SWF_LOCATION) {
      console.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");
      return;
    }
    var container = document.createElement("div");
    container.id = "webSocketContainer";
    // Hides Flash box. We cannot use display: none or visibility: hidden because it prevents
    // Flash from loading at least in IE. So we move it out of the screen at (-100, -100).
    // But this even doesn't work with Flash Lite (e.g. in Droid Incredible). So with Flash
    // Lite, we put it at (0, 0). This shows 1x1 box visible at left-top corner but this is
    // the best we can do as far as we know now.
    container.style.position = "absolute";
    if (WebSocket.__isFlashLite()) {
      container.style.left = "0px";
      container.style.top = "0px";
    } else {
      container.style.left = "-100px";
      container.style.top = "-100px";
    }
    var holder = document.createElement("div");
    holder.id = "webSocketFlash";
    container.appendChild(holder);
    document.body.appendChild(container);
    // See this article for hasPriority:
    // http://help.adobe.com/en_US/as3/mobile/WS4bebcd66a74275c36cfb8137124318eebc6-7ffd.html
    swfobject.embedSWF(
      WEB_SOCKET_SWF_LOCATION,
      "webSocketFlash",
      "1" /* width */,
      "1" /* height */,
      "10.0.0" /* SWF version */,
      null,
      null,
      {hasPriority: true, swliveconnect : true, allowScriptAccess: "always"},
      null,
      function(e) {
        if (!e.success) {
          console.error("[WebSocket] swfobject.embedSWF failed");
        }
      });
  };
  
  /**
   * Called by Flash to notify JS that it's fully loaded and ready
   * for communication.
   */
  WebSocket.__onFlashInitialized = function() {
    // We need to set a timeout here to avoid round-trip calls
    // to flash during the initialization process.
    setTimeout(function() {
      WebSocket.__flash = document.getElementById("webSocketFlash");
      WebSocket.__flash.setCallerUrl(location.href);
      WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);
      for (var i = 0; i < WebSocket.__tasks.length; ++i) {
        WebSocket.__tasks[i]();
      }
      WebSocket.__tasks = [];
    }, 0);
  };
  
  /**
   * Called by Flash to notify WebSockets events are fired.
   */
  WebSocket.__onFlashEvent = function() {
    setTimeout(function() {
      try {
        // Gets events using receiveEvents() instead of getting it from event object
        // of Flash event. This is to make sure to keep message order.
        // It seems sometimes Flash events don't arrive in the same order as they are sent.
        var events = WebSocket.__flash.receiveEvents();
        for (var i = 0; i < events.length; ++i) {
          WebSocket.__instances[events[i].webSocketId].__handleEvent(events[i]);
        }
      } catch (e) {
        console.error(e);
      }
    }, 0);
    return true;
  };
  
  // Called by Flash.
  WebSocket.__log = function(message) {
    console.log(decodeURIComponent(message));
  };
  
  // Called by Flash.
  WebSocket.__error = function(message) {
    console.error(decodeURIComponent(message));
  };
  
  WebSocket.__addTask = function(task) {
    if (WebSocket.__flash) {
      task();
    } else {
      WebSocket.__tasks.push(task);
    }
  };
  
  /**
   * Test if the browser is running flash lite.
   * @return {boolean} True if flash lite is running, false otherwise.
   */
  WebSocket.__isFlashLite = function() {
    if (!window.navigator || !window.navigator.mimeTypes) {
      return false;
    }
    var mimeType = window.navigator.mimeTypes["application/x-shockwave-flash"];
    if (!mimeType || !mimeType.enabledPlugin || !mimeType.enabledPlugin.filename) {
      return false;
    }
    return mimeType.enabledPlugin.filename.match(/flashlite/i) ? true : false;
  };
  
  if (!window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION) {
    if (window.addEventListener) {
      window.addEventListener("load", function(){
        WebSocket.__initialize();
      }, false);
    } else {
      window.attachEvent("onload", function(){
        WebSocket.__initialize();
      });
    }
  }
  
})();

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {

  /**
   * Expose constructor.
   *
   * @api public
   */

  exports.XHR = XHR;

  /**
   * XHR constructor
   *
   * @costructor
   * @api public
   */

  function XHR (socket) {
    if (!socket) return;

    io.Transport.apply(this, arguments);
    this.sendBuffer = [];
  };

  /**
   * Inherits from Transport.
   */

  io.util.inherit(XHR, io.Transport);

  /**
   * Establish a connection
   *
   * @returns {Transport}
   * @api public
   */

  XHR.prototype.open = function () {
    this.socket.setBuffer(false);
    this.onOpen();
    this.get();

    // we need to make sure the request succeeds since we have no indication
    // whether the request opened or not until it succeeded.
    this.setCloseTimeout();

    return this;
  };

  /**
   * Check if we need to send data to the Socket.IO server, if we have data in our
   * buffer we encode it and forward it to the `post` method.
   *
   * @api private
   */

  XHR.prototype.payload = function (payload) {
    var msgs = [];

    for (var i = 0, l = payload.length; i < l; i++) {
      msgs.push(io.parser.encodePacket(payload[i]));
    }

    this.send(io.parser.encodePayload(msgs));
  };

  /**
   * Send data to the Socket.IO server.
   *
   * @param data The message
   * @returns {Transport}
   * @api public
   */

  XHR.prototype.send = function (data) {
    this.post(data);
    return this;
  };

  /**
   * Posts a encoded message to the Socket.IO server.
   *
   * @param {String} data A encoded message.
   * @api private
   */

  function empty () { };

  XHR.prototype.post = function (data) {
    var self = this;
    this.socket.setBuffer(true);

    function stateChange () {
      if (this.readyState == 4) {
        this.onreadystatechange = empty;
        self.posting = false;

        if (this.status == 200){
          self.socket.setBuffer(false);
        } else {
          self.onClose();
        }
      }
    }

    function onload () {
      this.onload = empty;
      self.socket.setBuffer(false);
    };

    this.sendXHR = this.request('POST');

    if (global.XDomainRequest && this.sendXHR instanceof XDomainRequest) {
      this.sendXHR.onload = this.sendXHR.onerror = onload;
    } else {
      this.sendXHR.onreadystatechange = stateChange;
    }

    this.sendXHR.send(data);
  };

  /**
   * Disconnects the established `XHR` connection.
   *
   * @returns {Transport}
   * @api public
   */

  XHR.prototype.close = function () {
    this.onClose();
    return this;
  };

  /**
   * Generates a configured XHR request
   *
   * @param {String} url The url that needs to be requested.
   * @param {String} method The method the request should use.
   * @returns {XMLHttpRequest}
   * @api private
   */

  XHR.prototype.request = function (method) {
    var req = io.util.request(this.socket.isXDomain())
      , query = io.util.query(this.socket.options.query, 't=' + +new Date);

    req.open(method || 'GET', this.prepareUrl() + query, true);

    if (method == 'POST') {
      try {
        if (req.setRequestHeader) {
          req.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        } else {
          // XDomainRequest
          req.contentType = 'text/plain';
        }
      } catch (e) {}
    }

    return req;
  };

  /**
   * Returns the scheme to use for the transport URLs.
   *
   * @api private
   */

  XHR.prototype.scheme = function () {
    return this.socket.options.secure ? 'https' : 'http';
  };

  /**
   * Check if the XHR transports are supported
   *
   * @param {Boolean} xdomain Check if we support cross domain requests.
   * @returns {Boolean}
   * @api public
   */

  XHR.check = function (socket, xdomain) {
    try {
      var request = io.util.request(xdomain),
          usesXDomReq = (global.XDomainRequest && request instanceof XDomainRequest),
          socketProtocol = (socket && socket.options && socket.options.secure ? 'https:' : 'http:'),
          isXProtocol = (global.location && socketProtocol != global.location.protocol);
      if (request && !(usesXDomReq && isXProtocol)) {
        return true;
      }
    } catch(e) {}

    return false;
  };

  /**
   * Check if the XHR transport supports cross domain requests.
   *
   * @returns {Boolean}
   * @api public
   */

  XHR.xdomainCheck = function (socket) {
    return XHR.check(socket, true);
  };

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);
/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io) {

  /**
   * Expose constructor.
   */

  exports.htmlfile = HTMLFile;

  /**
   * The HTMLFile transport creates a `forever iframe` based transport
   * for Internet Explorer. Regular forever iframe implementations will 
   * continuously trigger the browsers buzy indicators. If the forever iframe
   * is created inside a `htmlfile` these indicators will not be trigged.
   *
   * @constructor
   * @extends {io.Transport.XHR}
   * @api public
   */

  function HTMLFile (socket) {
    io.Transport.XHR.apply(this, arguments);
  };

  /**
   * Inherits from XHR transport.
   */

  io.util.inherit(HTMLFile, io.Transport.XHR);

  /**
   * Transport name
   *
   * @api public
   */

  HTMLFile.prototype.name = 'htmlfile';

  /**
   * Creates a new Ac...eX `htmlfile` with a forever loading iframe
   * that can be used to listen to messages. Inside the generated
   * `htmlfile` a reference will be made to the HTMLFile transport.
   *
   * @api private
   */

  HTMLFile.prototype.get = function () {
    this.doc = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
    this.doc.open();
    this.doc.write('<html></html>');
    this.doc.close();
    this.doc.parentWindow.s = this;

    var iframeC = this.doc.createElement('div');
    iframeC.className = 'socketio';

    this.doc.body.appendChild(iframeC);
    this.iframe = this.doc.createElement('iframe');

    iframeC.appendChild(this.iframe);

    var self = this
      , query = io.util.query(this.socket.options.query, 't='+ +new Date);

    this.iframe.src = this.prepareUrl() + query;

    io.util.on(window, 'unload', function () {
      self.destroy();
    });
  };

  /**
   * The Socket.IO server will write script tags inside the forever
   * iframe, this function will be used as callback for the incoming
   * information.
   *
   * @param {String} data The message
   * @param {document} doc Reference to the context
   * @api private
   */

  HTMLFile.prototype._ = function (data, doc) {
    // unescape all forward slashes. see GH-1251
    data = data.replace(/\\\//g, '/');
    this.onData(data);
    try {
      var script = doc.getElementsByTagName('script')[0];
      script.parentNode.removeChild(script);
    } catch (e) { }
  };

  /**
   * Destroy the established connection, iframe and `htmlfile`.
   * And calls the `CollectGarbage` function of Internet Explorer
   * to release the memory.
   *
   * @api private
   */

  HTMLFile.prototype.destroy = function () {
    if (this.iframe){
      try {
        this.iframe.src = 'about:blank';
      } catch(e){}

      this.doc = null;
      this.iframe.parentNode.removeChild(this.iframe);
      this.iframe = null;

      CollectGarbage();
    }
  };

  /**
   * Disconnects the established connection.
   *
   * @returns {Transport} Chaining.
   * @api public
   */

  HTMLFile.prototype.close = function () {
    this.destroy();
    return io.Transport.XHR.prototype.close.call(this);
  };

  /**
   * Checks if the browser supports this transport. The browser
   * must have an `Ac...eXObject` implementation.
   *
   * @return {Boolean}
   * @api public
   */

  HTMLFile.check = function (socket) {
    if (typeof window != "undefined" && (['Active'].concat('Object').join('X')) in window){
      try {
        var a = new window[(['Active'].concat('Object').join('X'))]('htmlfile');
        return a && io.Transport.XHR.check(socket);
      } catch(e){}
    }
    return false;
  };

  /**
   * Check if cross domain requests are supported.
   *
   * @returns {Boolean}
   * @api public
   */

  HTMLFile.xdomainCheck = function () {
    // we can probably do handling for sub-domains, we should
    // test that it's cross domain but a subdomain here
    return false;
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('htmlfile');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {

  /**
   * Expose constructor.
   */

  exports['xhr-polling'] = XHRPolling;

  /**
   * The XHR-polling transport uses long polling XHR requests to create a
   * "persistent" connection with the server.
   *
   * @constructor
   * @api public
   */

  function XHRPolling () {
    io.Transport.XHR.apply(this, arguments);
  };

  /**
   * Inherits from XHR transport.
   */

  io.util.inherit(XHRPolling, io.Transport.XHR);

  /**
   * Merge the properties from XHR transport
   */

  io.util.merge(XHRPolling, io.Transport.XHR);

  /**
   * Transport name
   *
   * @api public
   */

  XHRPolling.prototype.name = 'xhr-polling';

  /**
   * Indicates whether heartbeats is enabled for this transport
   *
   * @api private
   */

  XHRPolling.prototype.heartbeats = function () {
    return false;
  };

  /** 
   * Establish a connection, for iPhone and Android this will be done once the page
   * is loaded.
   *
   * @returns {Transport} Chaining.
   * @api public
   */

  XHRPolling.prototype.open = function () {
    var self = this;

    io.Transport.XHR.prototype.open.call(self);
    return false;
  };

  /**
   * Starts a XHR request to wait for incoming messages.
   *
   * @api private
   */

  function empty () {};

  XHRPolling.prototype.get = function () {
    if (!this.isOpen) return;

    var self = this;

    function stateChange () {
      if (this.readyState == 4) {
        this.onreadystatechange = empty;

        if (this.status == 200) {
          self.onData(this.responseText);
          self.get();
        } else {
          self.onClose();
        }
      }
    };

    function onload () {
      this.onload = empty;
      this.onerror = empty;
      self.retryCounter = 1;
      self.onData(this.responseText);
      self.get();
    };

    function onerror () {
      self.retryCounter ++;
      if(!self.retryCounter || self.retryCounter > 3) {
        self.onClose();  
      } else {
        self.get();
      }
    };

    this.xhr = this.request();

    if (global.XDomainRequest && this.xhr instanceof XDomainRequest) {
      this.xhr.onload = onload;
      this.xhr.onerror = onerror;
    } else {
      this.xhr.onreadystatechange = stateChange;
    }

    this.xhr.send(null);
  };

  /**
   * Handle the unclean close behavior.
   *
   * @api private
   */

  XHRPolling.prototype.onClose = function () {
    io.Transport.XHR.prototype.onClose.call(this);

    if (this.xhr) {
      this.xhr.onreadystatechange = this.xhr.onload = this.xhr.onerror = empty;
      try {
        this.xhr.abort();
      } catch(e){}
      this.xhr = null;
    }
  };

  /**
   * Webkit based browsers show a infinit spinner when you start a XHR request
   * before the browsers onload event is called so we need to defer opening of
   * the transport until the onload event is called. Wrapping the cb in our
   * defer method solve this.
   *
   * @param {Socket} socket The socket instance that needs a transport
   * @param {Function} fn The callback
   * @api private
   */

  XHRPolling.prototype.ready = function (socket, fn) {
    var self = this;

    io.util.defer(function () {
      fn.call(self);
    });
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('xhr-polling');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);

/**
 * socket.io
 * Copyright(c) 2011 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

(function (exports, io, global) {
  /**
   * There is a way to hide the loading indicator in Firefox. If you create and
   * remove a iframe it will stop showing the current loading indicator.
   * Unfortunately we can't feature detect that and UA sniffing is evil.
   *
   * @api private
   */

  var indicator = global.document && "MozAppearance" in
    global.document.documentElement.style;

  /**
   * Expose constructor.
   */

  exports['jsonp-polling'] = JSONPPolling;

  /**
   * The JSONP transport creates an persistent connection by dynamically
   * inserting a script tag in the page. This script tag will receive the
   * information of the Socket.IO server. When new information is received
   * it creates a new script tag for the new data stream.
   *
   * @constructor
   * @extends {io.Transport.xhr-polling}
   * @api public
   */

  function JSONPPolling (socket) {
    io.Transport['xhr-polling'].apply(this, arguments);

    this.index = io.j.length;

    var self = this;

    io.j.push(function (msg) {
      self._(msg);
    });
  };

  /**
   * Inherits from XHR polling transport.
   */

  io.util.inherit(JSONPPolling, io.Transport['xhr-polling']);

  /**
   * Transport name
   *
   * @api public
   */

  JSONPPolling.prototype.name = 'jsonp-polling';

  /**
   * Posts a encoded message to the Socket.IO server using an iframe.
   * The iframe is used because script tags can create POST based requests.
   * The iframe is positioned outside of the view so the user does not
   * notice it's existence.
   *
   * @param {String} data A encoded message.
   * @api private
   */

  JSONPPolling.prototype.post = function (data) {
    var self = this
      , query = io.util.query(
             this.socket.options.query
          , 't='+ (+new Date) + '&i=' + this.index
        );

    if (!this.form) {
      var form = document.createElement('form')
        , area = document.createElement('textarea')
        , id = this.iframeId = 'socketio_iframe_' + this.index
        , iframe;

      form.className = 'socketio';
      form.style.position = 'absolute';
      form.style.top = '0px';
      form.style.left = '0px';
      form.style.display = 'none';
      form.target = id;
      form.method = 'POST';
      form.setAttribute('accept-charset', 'utf-8');
      area.name = 'd';
      form.appendChild(area);
      document.body.appendChild(form);

      this.form = form;
      this.area = area;
    }

    this.form.action = this.prepareUrl() + query;

    function complete () {
      initIframe();
      self.socket.setBuffer(false);
    };

    function initIframe () {
      if (self.iframe) {
        self.form.removeChild(self.iframe);
      }

      try {
        // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
        iframe = document.createElement('<iframe name="'+ self.iframeId +'">');
      } catch (e) {
        iframe = document.createElement('iframe');
        iframe.name = self.iframeId;
      }

      iframe.id = self.iframeId;

      self.form.appendChild(iframe);
      self.iframe = iframe;
    };

    initIframe();

    // we temporarily stringify until we figure out how to prevent
    // browsers from turning `\n` into `\r\n` in form inputs
    this.area.value = io.JSON.stringify(data);

    try {
      this.form.submit();
    } catch(e) {}

    if (this.iframe.attachEvent) {
      iframe.onreadystatechange = function () {
        if (self.iframe.readyState == 'complete') {
          complete();
        }
      };
    } else {
      this.iframe.onload = complete;
    }

    this.socket.setBuffer(true);
  };

  /**
   * Creates a new JSONP poll that can be used to listen
   * for messages from the Socket.IO server.
   *
   * @api private
   */

  JSONPPolling.prototype.get = function () {
    var self = this
      , script = document.createElement('script')
      , query = io.util.query(
             this.socket.options.query
          , 't='+ (+new Date) + '&i=' + this.index
        );

    if (this.script) {
      this.script.parentNode.removeChild(this.script);
      this.script = null;
    }

    script.async = true;
    script.src = this.prepareUrl() + query;
    script.onerror = function () {
      self.onClose();
    };

    var insertAt = document.getElementsByTagName('script')[0];
    insertAt.parentNode.insertBefore(script, insertAt);
    this.script = script;

    if (indicator) {
      setTimeout(function () {
        var iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        document.body.removeChild(iframe);
      }, 100);
    }
  };

  /**
   * Callback function for the incoming message stream from the Socket.IO server.
   *
   * @param {String} data The message
   * @api private
   */

  JSONPPolling.prototype._ = function (msg) {
    this.onData(msg);
    if (this.isOpen) {
      this.get();
    }
    return this;
  };

  /**
   * The indicator hack only works after onload
   *
   * @param {Socket} socket The socket instance that needs a transport
   * @param {Function} fn The callback
   * @api private
   */

  JSONPPolling.prototype.ready = function (socket, fn) {
    var self = this;
    if (!indicator) return fn.call(this);

    io.util.load(function () {
      fn.call(self);
    });
  };

  /**
   * Checks if browser supports this transport.
   *
   * @return {Boolean}
   * @api public
   */

  JSONPPolling.check = function () {
    return 'document' in global;
  };

  /**
   * Check if cross domain requests are supported
   *
   * @returns {Boolean}
   * @api public
   */

  JSONPPolling.xdomainCheck = function () {
    return true;
  };

  /**
   * Add the transport to your public io.transports array.
   *
   * @api private
   */

  io.transports.push('jsonp-polling');

})(
    'undefined' != typeof io ? io.Transport : module.exports
  , 'undefined' != typeof io ? io : module.parent.exports
  , this
);

if (typeof define === "function" && define.amd) {
  define([], function () { return io; });
}
})();
},{}],4:[function(require,module,exports){
// Generated by CoffeeScript 1.4.0
(function() {
  var format, lookup, resolve,
    __slice = [].slice;

  format = String.prototype.format = function() {
    var args, explicit, idx, implicit, message,
      _this = this;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (args.length === 0) {
      return function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return _this.format.apply(_this, args);
      };
    }
    idx = 0;
    explicit = implicit = false;
    message = 'cannot switch from {} to {} numbering'.format();
    return this.replace(/([{}])\1|[{](.*?)(?:!(.+?))?[}]/g, function(match, literal, key, transformer) {
      var fn, value, _ref, _ref1, _ref2;
      if (literal) {
        return literal;
      }
      if (key.length) {
        explicit = true;
        if (implicit) {
          throw new Error(message('implicit', 'explicit'));
        }
        value = (_ref = lookup(args, key)) != null ? _ref : '';
      } else {
        implicit = true;
        if (explicit) {
          throw new Error(message('explicit', 'implicit'));
        }
        value = (_ref1 = args[idx++]) != null ? _ref1 : '';
      }
      value = value.toString();
      if (fn = format.transformers[transformer]) {
        return (_ref2 = fn.call(value)) != null ? _ref2 : '';
      } else {
        return value;
      }
    });
  };

  lookup = function(object, key) {
    var match;
    if (!/^(\d+)([.]|$)/.test(key)) {
      key = '0.' + key;
    }
    while (match = /(.+?)[.](.+)/.exec(key)) {
      object = resolve(object, match[1]);
      key = match[2];
    }
    return resolve(object, key);
  };

  resolve = function(object, key) {
    var value;
    value = object[key];
    if (typeof value === 'function') {
      return value.call(object);
    } else {
      return value;
    }
  };

  format.transformers = {};

  format.version = '0.2.1';

}).call(this);

},{}],5:[function(require,module,exports){
var angular = require('angular');
var sf = require('string-format');
var io = require('socket.io-client');

var app = angular.module('app', []);

app.directive('ngEnter', function() {
	return function(scope, element, attrs) {
		element.bind("keydown keypress", function(event) {
			if (event.which === 13) {
				scope.$apply(function() {
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});

app.controller("Controller", ["$scope", "$http",
	function($scope, $http) {

		$scope.screenshots = {}

		var socket = io.connect('/client');

		socket.on('connect', function() {
			console.log('connected');

			socket.on('done', function(data) {
				var title = '{name}({version}-{os})'.format(data.browser);
				openScreenshot(title, data.screenshot);
			});


			socket.on('complete', function(data) {

			})
			socket.on('disconnect', function() {

			});

		});

		$scope.test = function(url) {
			if (url === 'reload') {
				socket.emit('reload');
				return;
			}
			if (!isValidUrl(url)) {
				alert('invalid url');
				return;
			}
			console.log(url);
			socket.emit('test', {
				url: url,
				requirement: {
					name: '',
					version: '*',
					screenshot: true
				}
			});
		}

		$http.get('/api/worker').success(function(data) {
			$scope.workers = data;
		})

		function openScreenshot(title, screenshot) {
			var doc = window.open('_blank').document;
			var html = '<html><body>' + screenshot + '</body></html>';
			doc.write(html);
			doc.title = title;
		}

		function isValidUrl(url) {
			return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
		}

	}
]);
},{"angular":1,"socket.io-client":3,"string-format":4}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvYW5ndWxhci9pbmRleC1icm93c2VyaWZ5LmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIvbGliL2FuZ3VsYXIubWluLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvZGlzdC9zb2NrZXQuaW8uanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvc3RyaW5nLWZvcm1hdC9saWIvc3RyaW5nLWZvcm1hdC5qcyIsIi9Vc2Vycy9sdGViZWFuL0Rlc2t0b3Avbm9kZWpzIHdvcmtzcGFjZS9icm93c2VybWFuL3B1YmxpYy9kZXYvanMvZmFrZV8xYTMyNzFkOS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaHlIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInJlcXVpcmUoJy4vbGliL2FuZ3VsYXIubWluLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcbiIsIi8qXG4gQW5ndWxhckpTIHYxLjIuMTZcbiAoYykgMjAxMC0yMDE0IEdvb2dsZSwgSW5jLiBodHRwOi8vYW5ndWxhcmpzLm9yZ1xuIExpY2Vuc2U6IE1JVFxuKi9cbihmdW5jdGlvbihPLFUscyl7J3VzZSBzdHJpY3QnO2Z1bmN0aW9uIHQoYil7cmV0dXJuIGZ1bmN0aW9uKCl7dmFyIGE9YXJndW1lbnRzWzBdLGMsYT1cIltcIisoYj9iK1wiOlwiOlwiXCIpK2ErXCJdIGh0dHA6Ly9lcnJvcnMuYW5ndWxhcmpzLm9yZy8xLjIuMTYvXCIrKGI/YitcIi9cIjpcIlwiKSthO2ZvcihjPTE7Yzxhcmd1bWVudHMubGVuZ3RoO2MrKylhPWErKDE9PWM/XCI/XCI6XCImXCIpK1wicFwiKyhjLTEpK1wiPVwiK2VuY29kZVVSSUNvbXBvbmVudChcImZ1bmN0aW9uXCI9PXR5cGVvZiBhcmd1bWVudHNbY10/YXJndW1lbnRzW2NdLnRvU3RyaW5nKCkucmVwbGFjZSgvIFxce1tcXHNcXFNdKiQvLFwiXCIpOlwidW5kZWZpbmVkXCI9PXR5cGVvZiBhcmd1bWVudHNbY10/XCJ1bmRlZmluZWRcIjpcInN0cmluZ1wiIT10eXBlb2YgYXJndW1lbnRzW2NdP0pTT04uc3RyaW5naWZ5KGFyZ3VtZW50c1tjXSk6YXJndW1lbnRzW2NdKTtyZXR1cm4gRXJyb3IoYSl9fWZ1bmN0aW9uIGFiKGIpe2lmKG51bGw9PWJ8fENhKGIpKXJldHVybiExO1xudmFyIGE9Yi5sZW5ndGg7cmV0dXJuIDE9PT1iLm5vZGVUeXBlJiZhPyEwOncoYil8fE0oYil8fDA9PT1hfHxcIm51bWJlclwiPT09dHlwZW9mIGEmJjA8YSYmYS0xIGluIGJ9ZnVuY3Rpb24gcShiLGEsYyl7dmFyIGQ7aWYoYilpZihQKGIpKWZvcihkIGluIGIpXCJwcm90b3R5cGVcIj09ZHx8KFwibGVuZ3RoXCI9PWR8fFwibmFtZVwiPT1kfHxiLmhhc093blByb3BlcnR5JiYhYi5oYXNPd25Qcm9wZXJ0eShkKSl8fGEuY2FsbChjLGJbZF0sZCk7ZWxzZSBpZihiLmZvckVhY2gmJmIuZm9yRWFjaCE9PXEpYi5mb3JFYWNoKGEsYyk7ZWxzZSBpZihhYihiKSlmb3IoZD0wO2Q8Yi5sZW5ndGg7ZCsrKWEuY2FsbChjLGJbZF0sZCk7ZWxzZSBmb3IoZCBpbiBiKWIuaGFzT3duUHJvcGVydHkoZCkmJmEuY2FsbChjLGJbZF0sZCk7cmV0dXJuIGJ9ZnVuY3Rpb24gUWIoYil7dmFyIGE9W10sYztmb3IoYyBpbiBiKWIuaGFzT3duUHJvcGVydHkoYykmJmEucHVzaChjKTtyZXR1cm4gYS5zb3J0KCl9ZnVuY3Rpb24gU2MoYixcbmEsYyl7Zm9yKHZhciBkPVFiKGIpLGU9MDtlPGQubGVuZ3RoO2UrKylhLmNhbGwoYyxiW2RbZV1dLGRbZV0pO3JldHVybiBkfWZ1bmN0aW9uIFJiKGIpe3JldHVybiBmdW5jdGlvbihhLGMpe2IoYyxhKX19ZnVuY3Rpb24gYmIoKXtmb3IodmFyIGI9a2EubGVuZ3RoLGE7Yjspe2ItLTthPWthW2JdLmNoYXJDb2RlQXQoMCk7aWYoNTc9PWEpcmV0dXJuIGthW2JdPVwiQVwiLGthLmpvaW4oXCJcIik7aWYoOTA9PWEpa2FbYl09XCIwXCI7ZWxzZSByZXR1cm4ga2FbYl09U3RyaW5nLmZyb21DaGFyQ29kZShhKzEpLGthLmpvaW4oXCJcIil9a2EudW5zaGlmdChcIjBcIik7cmV0dXJuIGthLmpvaW4oXCJcIil9ZnVuY3Rpb24gU2IoYixhKXthP2IuJCRoYXNoS2V5PWE6ZGVsZXRlIGIuJCRoYXNoS2V5fWZ1bmN0aW9uIEQoYil7dmFyIGE9Yi4kJGhhc2hLZXk7cShhcmd1bWVudHMsZnVuY3Rpb24oYSl7YSE9PWImJnEoYSxmdW5jdGlvbihhLGMpe2JbY109YX0pfSk7U2IoYixhKTtyZXR1cm4gYn1mdW5jdGlvbiBZKGIpe3JldHVybiBwYXJzZUludChiLFxuMTApfWZ1bmN0aW9uIFRiKGIsYSl7cmV0dXJuIEQobmV3IChEKGZ1bmN0aW9uKCl7fSx7cHJvdG90eXBlOmJ9KSksYSl9ZnVuY3Rpb24gQygpe31mdW5jdGlvbiBEYShiKXtyZXR1cm4gYn1mdW5jdGlvbiBhYShiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gYn19ZnVuY3Rpb24gRShiKXtyZXR1cm5cInVuZGVmaW5lZFwiPT09dHlwZW9mIGJ9ZnVuY3Rpb24gQihiKXtyZXR1cm5cInVuZGVmaW5lZFwiIT09dHlwZW9mIGJ9ZnVuY3Rpb24gWChiKXtyZXR1cm4gbnVsbCE9YiYmXCJvYmplY3RcIj09PXR5cGVvZiBifWZ1bmN0aW9uIHcoYil7cmV0dXJuXCJzdHJpbmdcIj09PXR5cGVvZiBifWZ1bmN0aW9uIHZiKGIpe3JldHVyblwibnVtYmVyXCI9PT10eXBlb2YgYn1mdW5jdGlvbiBOYShiKXtyZXR1cm5cIltvYmplY3QgRGF0ZV1cIj09PXdhLmNhbGwoYil9ZnVuY3Rpb24gTShiKXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT13YS5jYWxsKGIpfWZ1bmN0aW9uIFAoYil7cmV0dXJuXCJmdW5jdGlvblwiPT09dHlwZW9mIGJ9XG5mdW5jdGlvbiBjYihiKXtyZXR1cm5cIltvYmplY3QgUmVnRXhwXVwiPT09d2EuY2FsbChiKX1mdW5jdGlvbiBDYShiKXtyZXR1cm4gYiYmYi5kb2N1bWVudCYmYi5sb2NhdGlvbiYmYi5hbGVydCYmYi5zZXRJbnRlcnZhbH1mdW5jdGlvbiBUYyhiKXtyZXR1cm4hKCFifHwhKGIubm9kZU5hbWV8fGIucHJvcCYmYi5hdHRyJiZiLmZpbmQpKX1mdW5jdGlvbiBVYyhiLGEsYyl7dmFyIGQ9W107cShiLGZ1bmN0aW9uKGIsZyxmKXtkLnB1c2goYS5jYWxsKGMsYixnLGYpKX0pO3JldHVybiBkfWZ1bmN0aW9uIGRiKGIsYSl7aWYoYi5pbmRleE9mKXJldHVybiBiLmluZGV4T2YoYSk7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDtjKyspaWYoYT09PWJbY10pcmV0dXJuIGM7cmV0dXJuLTF9ZnVuY3Rpb24gT2EoYixhKXt2YXIgYz1kYihiLGEpOzA8PWMmJmIuc3BsaWNlKGMsMSk7cmV0dXJuIGF9ZnVuY3Rpb24gYmEoYixhKXtpZihDYShiKXx8YiYmYi4kZXZhbEFzeW5jJiZiLiR3YXRjaCl0aHJvdyBQYShcImNwd3NcIik7XG5pZihhKXtpZihiPT09YSl0aHJvdyBQYShcImNwaVwiKTtpZihNKGIpKWZvcih2YXIgYz1hLmxlbmd0aD0wO2M8Yi5sZW5ndGg7YysrKWEucHVzaChiYShiW2NdKSk7ZWxzZXtjPWEuJCRoYXNoS2V5O3EoYSxmdW5jdGlvbihiLGMpe2RlbGV0ZSBhW2NdfSk7Zm9yKHZhciBkIGluIGIpYVtkXT1iYShiW2RdKTtTYihhLGMpfX1lbHNlKGE9YikmJihNKGIpP2E9YmEoYixbXSk6TmEoYik/YT1uZXcgRGF0ZShiLmdldFRpbWUoKSk6Y2IoYik/YT1SZWdFeHAoYi5zb3VyY2UpOlgoYikmJihhPWJhKGIse30pKSk7cmV0dXJuIGF9ZnVuY3Rpb24gVWIoYixhKXthPWF8fHt9O2Zvcih2YXIgYyBpbiBiKSFiLmhhc093blByb3BlcnR5KGMpfHxcIiRcIj09PWMuY2hhckF0KDApJiZcIiRcIj09PWMuY2hhckF0KDEpfHwoYVtjXT1iW2NdKTtyZXR1cm4gYX1mdW5jdGlvbiB4YShiLGEpe2lmKGI9PT1hKXJldHVybiEwO2lmKG51bGw9PT1ifHxudWxsPT09YSlyZXR1cm4hMTtpZihiIT09YiYmYSE9PWEpcmV0dXJuITA7XG52YXIgYz10eXBlb2YgYixkO2lmKGM9PXR5cGVvZiBhJiZcIm9iamVjdFwiPT1jKWlmKE0oYikpe2lmKCFNKGEpKXJldHVybiExO2lmKChjPWIubGVuZ3RoKT09YS5sZW5ndGgpe2ZvcihkPTA7ZDxjO2QrKylpZigheGEoYltkXSxhW2RdKSlyZXR1cm4hMTtyZXR1cm4hMH19ZWxzZXtpZihOYShiKSlyZXR1cm4gTmEoYSkmJmIuZ2V0VGltZSgpPT1hLmdldFRpbWUoKTtpZihjYihiKSYmY2IoYSkpcmV0dXJuIGIudG9TdHJpbmcoKT09YS50b1N0cmluZygpO2lmKGImJmIuJGV2YWxBc3luYyYmYi4kd2F0Y2h8fGEmJmEuJGV2YWxBc3luYyYmYS4kd2F0Y2h8fENhKGIpfHxDYShhKXx8TShhKSlyZXR1cm4hMTtjPXt9O2ZvcihkIGluIGIpaWYoXCIkXCIhPT1kLmNoYXJBdCgwKSYmIVAoYltkXSkpe2lmKCF4YShiW2RdLGFbZF0pKXJldHVybiExO2NbZF09ITB9Zm9yKGQgaW4gYSlpZighYy5oYXNPd25Qcm9wZXJ0eShkKSYmXCIkXCIhPT1kLmNoYXJBdCgwKSYmYVtkXSE9PXMmJiFQKGFbZF0pKXJldHVybiExO1xucmV0dXJuITB9cmV0dXJuITF9ZnVuY3Rpb24gVmIoKXtyZXR1cm4gVS5zZWN1cml0eVBvbGljeSYmVS5zZWN1cml0eVBvbGljeS5pc0FjdGl2ZXx8VS5xdWVyeVNlbGVjdG9yJiYhKCFVLnF1ZXJ5U2VsZWN0b3IoXCJbbmctY3NwXVwiKSYmIVUucXVlcnlTZWxlY3RvcihcIltkYXRhLW5nLWNzcF1cIikpfWZ1bmN0aW9uIGViKGIsYSl7dmFyIGM9Mjxhcmd1bWVudHMubGVuZ3RoP3lhLmNhbGwoYXJndW1lbnRzLDIpOltdO3JldHVybiFQKGEpfHxhIGluc3RhbmNlb2YgUmVnRXhwP2E6Yy5sZW5ndGg/ZnVuY3Rpb24oKXtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD9hLmFwcGx5KGIsYy5jb25jYXQoeWEuY2FsbChhcmd1bWVudHMsMCkpKTphLmFwcGx5KGIsYyl9OmZ1bmN0aW9uKCl7cmV0dXJuIGFyZ3VtZW50cy5sZW5ndGg/YS5hcHBseShiLGFyZ3VtZW50cyk6YS5jYWxsKGIpfX1mdW5jdGlvbiBWYyhiLGEpe3ZhciBjPWE7XCJzdHJpbmdcIj09PXR5cGVvZiBiJiZcIiRcIj09PWIuY2hhckF0KDApP2M9XG5zOkNhKGEpP2M9XCIkV0lORE9XXCI6YSYmVT09PWE/Yz1cIiRET0NVTUVOVFwiOmEmJihhLiRldmFsQXN5bmMmJmEuJHdhdGNoKSYmKGM9XCIkU0NPUEVcIik7cmV0dXJuIGN9ZnVuY3Rpb24gcWEoYixhKXtyZXR1cm5cInVuZGVmaW5lZFwiPT09dHlwZW9mIGI/czpKU09OLnN0cmluZ2lmeShiLFZjLGE/XCIgIFwiOm51bGwpfWZ1bmN0aW9uIFdiKGIpe3JldHVybiB3KGIpP0pTT04ucGFyc2UoYik6Yn1mdW5jdGlvbiBRYShiKXtcImZ1bmN0aW9uXCI9PT10eXBlb2YgYj9iPSEwOmImJjAhPT1iLmxlbmd0aD8oYj1LKFwiXCIrYiksYj0hKFwiZlwiPT1ifHxcIjBcIj09Ynx8XCJmYWxzZVwiPT1ifHxcIm5vXCI9PWJ8fFwiblwiPT1ifHxcIltdXCI9PWIpKTpiPSExO3JldHVybiBifWZ1bmN0aW9uIGhhKGIpe2I9eShiKS5jbG9uZSgpO3RyeXtiLmVtcHR5KCl9Y2F0Y2goYSl7fXZhciBjPXkoXCI8ZGl2PlwiKS5hcHBlbmQoYikuaHRtbCgpO3RyeXtyZXR1cm4gMz09PWJbMF0ubm9kZVR5cGU/SyhjKTpjLm1hdGNoKC9eKDxbXj5dKz4pLylbMV0ucmVwbGFjZSgvXjwoW1xcd1xcLV0rKS8sXG5mdW5jdGlvbihhLGIpe3JldHVyblwiPFwiK0soYil9KX1jYXRjaChkKXtyZXR1cm4gSyhjKX19ZnVuY3Rpb24gWGIoYil7dHJ5e3JldHVybiBkZWNvZGVVUklDb21wb25lbnQoYil9Y2F0Y2goYSl7fX1mdW5jdGlvbiBZYihiKXt2YXIgYT17fSxjLGQ7cSgoYnx8XCJcIikuc3BsaXQoXCImXCIpLGZ1bmN0aW9uKGIpe2ImJihjPWIuc3BsaXQoXCI9XCIpLGQ9WGIoY1swXSksQihkKSYmKGI9QihjWzFdKT9YYihjWzFdKTohMCxhW2RdP00oYVtkXSk/YVtkXS5wdXNoKGIpOmFbZF09W2FbZF0sYl06YVtkXT1iKSl9KTtyZXR1cm4gYX1mdW5jdGlvbiBaYihiKXt2YXIgYT1bXTtxKGIsZnVuY3Rpb24oYixkKXtNKGIpP3EoYixmdW5jdGlvbihiKXthLnB1c2goemEoZCwhMCkrKCEwPT09Yj9cIlwiOlwiPVwiK3phKGIsITApKSl9KTphLnB1c2goemEoZCwhMCkrKCEwPT09Yj9cIlwiOlwiPVwiK3phKGIsITApKSl9KTtyZXR1cm4gYS5sZW5ndGg/YS5qb2luKFwiJlwiKTpcIlwifWZ1bmN0aW9uIHdiKGIpe3JldHVybiB6YShiLFxuITApLnJlcGxhY2UoLyUyNi9naSxcIiZcIikucmVwbGFjZSgvJTNEL2dpLFwiPVwiKS5yZXBsYWNlKC8lMkIvZ2ksXCIrXCIpfWZ1bmN0aW9uIHphKGIsYSl7cmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChiKS5yZXBsYWNlKC8lNDAvZ2ksXCJAXCIpLnJlcGxhY2UoLyUzQS9naSxcIjpcIikucmVwbGFjZSgvJTI0L2csXCIkXCIpLnJlcGxhY2UoLyUyQy9naSxcIixcIikucmVwbGFjZSgvJTIwL2csYT9cIiUyMFwiOlwiK1wiKX1mdW5jdGlvbiBXYyhiLGEpe2Z1bmN0aW9uIGMoYSl7YSYmZC5wdXNoKGEpfXZhciBkPVtiXSxlLGcsZj1bXCJuZzphcHBcIixcIm5nLWFwcFwiLFwieC1uZy1hcHBcIixcImRhdGEtbmctYXBwXCJdLGg9L1xcc25nWzpcXC1dYXBwKDpcXHMqKFtcXHdcXGRfXSspOz8pP1xccy87cShmLGZ1bmN0aW9uKGEpe2ZbYV09ITA7YyhVLmdldEVsZW1lbnRCeUlkKGEpKTthPWEucmVwbGFjZShcIjpcIixcIlxcXFw6XCIpO2IucXVlcnlTZWxlY3RvckFsbCYmKHEoYi5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK2EpLGMpLHEoYi5xdWVyeVNlbGVjdG9yQWxsKFwiLlwiK1xuYStcIlxcXFw6XCIpLGMpLHEoYi5xdWVyeVNlbGVjdG9yQWxsKFwiW1wiK2ErXCJdXCIpLGMpKX0pO3EoZCxmdW5jdGlvbihhKXtpZighZSl7dmFyIGI9aC5leGVjKFwiIFwiK2EuY2xhc3NOYW1lK1wiIFwiKTtiPyhlPWEsZz0oYlsyXXx8XCJcIikucmVwbGFjZSgvXFxzKy9nLFwiLFwiKSk6cShhLmF0dHJpYnV0ZXMsZnVuY3Rpb24oYil7IWUmJmZbYi5uYW1lXSYmKGU9YSxnPWIudmFsdWUpfSl9fSk7ZSYmYShlLGc/W2ddOltdKX1mdW5jdGlvbiAkYihiLGEpe3ZhciBjPWZ1bmN0aW9uKCl7Yj15KGIpO2lmKGIuaW5qZWN0b3IoKSl7dmFyIGM9YlswXT09PVU/XCJkb2N1bWVudFwiOmhhKGIpO3Rocm93IFBhKFwiYnRzdHJwZFwiLGMpO31hPWF8fFtdO2EudW5zaGlmdChbXCIkcHJvdmlkZVwiLGZ1bmN0aW9uKGEpe2EudmFsdWUoXCIkcm9vdEVsZW1lbnRcIixiKX1dKTthLnVuc2hpZnQoXCJuZ1wiKTtjPWFjKGEpO2MuaW52b2tlKFtcIiRyb290U2NvcGVcIixcIiRyb290RWxlbWVudFwiLFwiJGNvbXBpbGVcIixcIiRpbmplY3RvclwiLFwiJGFuaW1hdGVcIixcbmZ1bmN0aW9uKGEsYixjLGQsZSl7YS4kYXBwbHkoZnVuY3Rpb24oKXtiLmRhdGEoXCIkaW5qZWN0b3JcIixkKTtjKGIpKGEpfSl9XSk7cmV0dXJuIGN9LGQ9L15OR19ERUZFUl9CT09UU1RSQVAhLztpZihPJiYhZC50ZXN0KE8ubmFtZSkpcmV0dXJuIGMoKTtPLm5hbWU9Ty5uYW1lLnJlcGxhY2UoZCxcIlwiKTtFYS5yZXN1bWVCb290c3RyYXA9ZnVuY3Rpb24oYil7cShiLGZ1bmN0aW9uKGIpe2EucHVzaChiKX0pO2MoKX19ZnVuY3Rpb24gZmIoYixhKXthPWF8fFwiX1wiO3JldHVybiBiLnJlcGxhY2UoWGMsZnVuY3Rpb24oYixkKXtyZXR1cm4oZD9hOlwiXCIpK2IudG9Mb3dlckNhc2UoKX0pfWZ1bmN0aW9uIHhiKGIsYSxjKXtpZighYil0aHJvdyBQYShcImFyZXFcIixhfHxcIj9cIixjfHxcInJlcXVpcmVkXCIpO3JldHVybiBifWZ1bmN0aW9uIFJhKGIsYSxjKXtjJiZNKGIpJiYoYj1iW2IubGVuZ3RoLTFdKTt4YihQKGIpLGEsXCJub3QgYSBmdW5jdGlvbiwgZ290IFwiKyhiJiZcIm9iamVjdFwiPT10eXBlb2YgYj9cbmIuY29uc3RydWN0b3IubmFtZXx8XCJPYmplY3RcIjp0eXBlb2YgYikpO3JldHVybiBifWZ1bmN0aW9uIEFhKGIsYSl7aWYoXCJoYXNPd25Qcm9wZXJ0eVwiPT09Yil0aHJvdyBQYShcImJhZG5hbWVcIixhKTt9ZnVuY3Rpb24gYmMoYixhLGMpe2lmKCFhKXJldHVybiBiO2E9YS5zcGxpdChcIi5cIik7Zm9yKHZhciBkLGU9YixnPWEubGVuZ3RoLGY9MDtmPGc7ZisrKWQ9YVtmXSxiJiYoYj0oZT1iKVtkXSk7cmV0dXJuIWMmJlAoYik/ZWIoZSxiKTpifWZ1bmN0aW9uIHliKGIpe3ZhciBhPWJbMF07Yj1iW2IubGVuZ3RoLTFdO2lmKGE9PT1iKXJldHVybiB5KGEpO3ZhciBjPVthXTtkb3thPWEubmV4dFNpYmxpbmc7aWYoIWEpYnJlYWs7Yy5wdXNoKGEpfXdoaWxlKGEhPT1iKTtyZXR1cm4geShjKX1mdW5jdGlvbiBZYyhiKXt2YXIgYT10KFwiJGluamVjdG9yXCIpLGM9dChcIm5nXCIpO2I9Yi5hbmd1bGFyfHwoYi5hbmd1bGFyPXt9KTtiLiQkbWluRXJyPWIuJCRtaW5FcnJ8fHQ7cmV0dXJuIGIubW9kdWxlfHxcbihiLm1vZHVsZT1mdW5jdGlvbigpe3ZhciBiPXt9O3JldHVybiBmdW5jdGlvbihlLGcsZil7aWYoXCJoYXNPd25Qcm9wZXJ0eVwiPT09ZSl0aHJvdyBjKFwiYmFkbmFtZVwiLFwibW9kdWxlXCIpO2cmJmIuaGFzT3duUHJvcGVydHkoZSkmJihiW2VdPW51bGwpO3JldHVybiBiW2VdfHwoYltlXT1mdW5jdGlvbigpe2Z1bmN0aW9uIGIoYSxkLGUpe3JldHVybiBmdW5jdGlvbigpe2NbZXx8XCJwdXNoXCJdKFthLGQsYXJndW1lbnRzXSk7cmV0dXJuIG59fWlmKCFnKXRocm93IGEoXCJub21vZFwiLGUpO3ZhciBjPVtdLGQ9W10sbT1iKFwiJGluamVjdG9yXCIsXCJpbnZva2VcIiksbj17X2ludm9rZVF1ZXVlOmMsX3J1bkJsb2NrczpkLHJlcXVpcmVzOmcsbmFtZTplLHByb3ZpZGVyOmIoXCIkcHJvdmlkZVwiLFwicHJvdmlkZXJcIiksZmFjdG9yeTpiKFwiJHByb3ZpZGVcIixcImZhY3RvcnlcIiksc2VydmljZTpiKFwiJHByb3ZpZGVcIixcInNlcnZpY2VcIiksdmFsdWU6YihcIiRwcm92aWRlXCIsXCJ2YWx1ZVwiKSxjb25zdGFudDpiKFwiJHByb3ZpZGVcIixcblwiY29uc3RhbnRcIixcInVuc2hpZnRcIiksYW5pbWF0aW9uOmIoXCIkYW5pbWF0ZVByb3ZpZGVyXCIsXCJyZWdpc3RlclwiKSxmaWx0ZXI6YihcIiRmaWx0ZXJQcm92aWRlclwiLFwicmVnaXN0ZXJcIiksY29udHJvbGxlcjpiKFwiJGNvbnRyb2xsZXJQcm92aWRlclwiLFwicmVnaXN0ZXJcIiksZGlyZWN0aXZlOmIoXCIkY29tcGlsZVByb3ZpZGVyXCIsXCJkaXJlY3RpdmVcIiksY29uZmlnOm0scnVuOmZ1bmN0aW9uKGEpe2QucHVzaChhKTtyZXR1cm4gdGhpc319O2YmJm0oZik7cmV0dXJuIG59KCkpfX0oKSl9ZnVuY3Rpb24gWmMoYil7RChiLHtib290c3RyYXA6JGIsY29weTpiYSxleHRlbmQ6RCxlcXVhbHM6eGEsZWxlbWVudDp5LGZvckVhY2g6cSxpbmplY3RvcjphYyxub29wOkMsYmluZDplYix0b0pzb246cWEsZnJvbUpzb246V2IsaWRlbnRpdHk6RGEsaXNVbmRlZmluZWQ6RSxpc0RlZmluZWQ6Qixpc1N0cmluZzp3LGlzRnVuY3Rpb246UCxpc09iamVjdDpYLGlzTnVtYmVyOnZiLGlzRWxlbWVudDpUYyxpc0FycmF5Ok0sXG52ZXJzaW9uOiRjLGlzRGF0ZTpOYSxsb3dlcmNhc2U6Syx1cHBlcmNhc2U6RmEsY2FsbGJhY2tzOntjb3VudGVyOjB9LCQkbWluRXJyOnQsJCRjc3A6VmJ9KTtTYT1ZYyhPKTt0cnl7U2EoXCJuZ0xvY2FsZVwiKX1jYXRjaChhKXtTYShcIm5nTG9jYWxlXCIsW10pLnByb3ZpZGVyKFwiJGxvY2FsZVwiLGFkKX1TYShcIm5nXCIsW1wibmdMb2NhbGVcIl0sW1wiJHByb3ZpZGVcIixmdW5jdGlvbihhKXthLnByb3ZpZGVyKHskJHNhbml0aXplVXJpOmJkfSk7YS5wcm92aWRlcihcIiRjb21waWxlXCIsY2MpLmRpcmVjdGl2ZSh7YTpjZCxpbnB1dDpkYyx0ZXh0YXJlYTpkYyxmb3JtOmRkLHNjcmlwdDplZCxzZWxlY3Q6ZmQsc3R5bGU6Z2Qsb3B0aW9uOmhkLG5nQmluZDppZCxuZ0JpbmRIdG1sOmpkLG5nQmluZFRlbXBsYXRlOmtkLG5nQ2xhc3M6bGQsbmdDbGFzc0V2ZW46bWQsbmdDbGFzc09kZDpuZCxuZ0Nsb2FrOm9kLG5nQ29udHJvbGxlcjpwZCxuZ0Zvcm06cWQsbmdIaWRlOnJkLG5nSWY6c2QsbmdJbmNsdWRlOnRkLFxubmdJbml0OnVkLG5nTm9uQmluZGFibGU6dmQsbmdQbHVyYWxpemU6d2QsbmdSZXBlYXQ6eGQsbmdTaG93OnlkLG5nU3R5bGU6emQsbmdTd2l0Y2g6QWQsbmdTd2l0Y2hXaGVuOkJkLG5nU3dpdGNoRGVmYXVsdDpDZCxuZ09wdGlvbnM6RGQsbmdUcmFuc2NsdWRlOkVkLG5nTW9kZWw6RmQsbmdMaXN0OkdkLG5nQ2hhbmdlOkhkLHJlcXVpcmVkOmVjLG5nUmVxdWlyZWQ6ZWMsbmdWYWx1ZTpJZH0pLmRpcmVjdGl2ZSh7bmdJbmNsdWRlOkpkfSkuZGlyZWN0aXZlKHpiKS5kaXJlY3RpdmUoZmMpO2EucHJvdmlkZXIoeyRhbmNob3JTY3JvbGw6S2QsJGFuaW1hdGU6TGQsJGJyb3dzZXI6TWQsJGNhY2hlRmFjdG9yeTpOZCwkY29udHJvbGxlcjpPZCwkZG9jdW1lbnQ6UGQsJGV4Y2VwdGlvbkhhbmRsZXI6UWQsJGZpbHRlcjpnYywkaW50ZXJwb2xhdGU6UmQsJGludGVydmFsOlNkLCRodHRwOlRkLCRodHRwQmFja2VuZDpVZCwkbG9jYXRpb246VmQsJGxvZzpXZCwkcGFyc2U6WGQsJHJvb3RTY29wZTpZZCxcbiRxOlpkLCRzY2U6JGQsJHNjZURlbGVnYXRlOmFlLCRzbmlmZmVyOmJlLCR0ZW1wbGF0ZUNhY2hlOmNlLCR0aW1lb3V0OmRlLCR3aW5kb3c6ZWUsJCRyQUY6ZmUsJCRhc3luY0NhbGxiYWNrOmdlfSl9XSl9ZnVuY3Rpb24gVGEoYil7cmV0dXJuIGIucmVwbGFjZShoZSxmdW5jdGlvbihhLGIsZCxlKXtyZXR1cm4gZT9kLnRvVXBwZXJDYXNlKCk6ZH0pLnJlcGxhY2UoaWUsXCJNb3okMVwiKX1mdW5jdGlvbiBBYihiLGEsYyxkKXtmdW5jdGlvbiBlKGIpe3ZhciBlPWMmJmI/W3RoaXMuZmlsdGVyKGIpXTpbdGhpc10sbD1hLGssbSxuLHAscix6O2lmKCFkfHxudWxsIT1iKWZvcig7ZS5sZW5ndGg7KWZvcihrPWUuc2hpZnQoKSxtPTAsbj1rLmxlbmd0aDttPG47bSsrKWZvcihwPXkoa1ttXSksbD9wLnRyaWdnZXJIYW5kbGVyKFwiJGRlc3Ryb3lcIik6bD0hbCxyPTAscD0oej1wLmNoaWxkcmVuKCkpLmxlbmd0aDtyPHA7cisrKWUucHVzaChHYSh6W3JdKSk7cmV0dXJuIGcuYXBwbHkodGhpcyxhcmd1bWVudHMpfVxudmFyIGc9R2EuZm5bYl0sZz1nLiRvcmlnaW5hbHx8ZztlLiRvcmlnaW5hbD1nO0dhLmZuW2JdPWV9ZnVuY3Rpb24gTihiKXtpZihiIGluc3RhbmNlb2YgTilyZXR1cm4gYjt3KGIpJiYoYj1jYShiKSk7aWYoISh0aGlzIGluc3RhbmNlb2YgTikpe2lmKHcoYikmJlwiPFwiIT1iLmNoYXJBdCgwKSl0aHJvdyBCYihcIm5vc2VsXCIpO3JldHVybiBuZXcgTihiKX1pZih3KGIpKXt2YXIgYT1iO2I9VTt2YXIgYztpZihjPWplLmV4ZWMoYSkpYj1bYi5jcmVhdGVFbGVtZW50KGNbMV0pXTtlbHNle3ZhciBkPWIsZTtiPWQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2M9W107aWYoQ2IudGVzdChhKSl7ZD1iLmFwcGVuZENoaWxkKGQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7ZT0oa2UuZXhlYyhhKXx8W1wiXCIsXCJcIl0pWzFdLnRvTG93ZXJDYXNlKCk7ZT1lYVtlXXx8ZWEuX2RlZmF1bHQ7ZC5pbm5lckhUTUw9XCI8ZGl2PiYjMTYwOzwvZGl2PlwiK2VbMV0rYS5yZXBsYWNlKGxlLFwiPCQxPjwvJDI+XCIpK2VbMl07XG5kLnJlbW92ZUNoaWxkKGQuZmlyc3RDaGlsZCk7Zm9yKGE9ZVswXTthLS07KWQ9ZC5sYXN0Q2hpbGQ7YT0wO2ZvcihlPWQuY2hpbGROb2Rlcy5sZW5ndGg7YTxlOysrYSljLnB1c2goZC5jaGlsZE5vZGVzW2FdKTtkPWIuZmlyc3RDaGlsZDtkLnRleHRDb250ZW50PVwiXCJ9ZWxzZSBjLnB1c2goZC5jcmVhdGVUZXh0Tm9kZShhKSk7Yi50ZXh0Q29udGVudD1cIlwiO2IuaW5uZXJIVE1MPVwiXCI7Yj1jfURiKHRoaXMsYik7eShVLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKSkuYXBwZW5kKHRoaXMpfWVsc2UgRGIodGhpcyxiKX1mdW5jdGlvbiBFYihiKXtyZXR1cm4gYi5jbG9uZU5vZGUoITApfWZ1bmN0aW9uIEhhKGIpe2hjKGIpO3ZhciBhPTA7Zm9yKGI9Yi5jaGlsZE5vZGVzfHxbXTthPGIubGVuZ3RoO2ErKylIYShiW2FdKX1mdW5jdGlvbiBpYyhiLGEsYyxkKXtpZihCKGQpKXRocm93IEJiKFwib2ZmYXJnc1wiKTt2YXIgZT1sYShiLFwiZXZlbnRzXCIpO2xhKGIsXCJoYW5kbGVcIikmJihFKGEpP3EoZSxcbmZ1bmN0aW9uKGEsYyl7RmIoYixjLGEpO2RlbGV0ZSBlW2NdfSk6cShhLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihhKXtFKGMpPyhGYihiLGEsZVthXSksZGVsZXRlIGVbYV0pOk9hKGVbYV18fFtdLGMpfSkpfWZ1bmN0aW9uIGhjKGIsYSl7dmFyIGM9YltnYl0sZD1VYVtjXTtkJiYoYT9kZWxldGUgVWFbY10uZGF0YVthXTooZC5oYW5kbGUmJihkLmV2ZW50cy4kZGVzdHJveSYmZC5oYW5kbGUoe30sXCIkZGVzdHJveVwiKSxpYyhiKSksZGVsZXRlIFVhW2NdLGJbZ2JdPXMpKX1mdW5jdGlvbiBsYShiLGEsYyl7dmFyIGQ9YltnYl0sZD1VYVtkfHwtMV07aWYoQihjKSlkfHwoYltnYl09ZD0rK21lLGQ9VWFbZF09e30pLGRbYV09YztlbHNlIHJldHVybiBkJiZkW2FdfWZ1bmN0aW9uIGpjKGIsYSxjKXt2YXIgZD1sYShiLFwiZGF0YVwiKSxlPUIoYyksZz0hZSYmQihhKSxmPWcmJiFYKGEpO2R8fGZ8fGxhKGIsXCJkYXRhXCIsZD17fSk7aWYoZSlkW2FdPWM7ZWxzZSBpZihnKXtpZihmKXJldHVybiBkJiZkW2FdO1xuRChkLGEpfWVsc2UgcmV0dXJuIGR9ZnVuY3Rpb24gR2IoYixhKXtyZXR1cm4gYi5nZXRBdHRyaWJ1dGU/LTE8KFwiIFwiKyhiLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKStcIiBcIikucmVwbGFjZSgvW1xcblxcdF0vZyxcIiBcIikuaW5kZXhPZihcIiBcIithK1wiIFwiKTohMX1mdW5jdGlvbiBoYihiLGEpe2EmJmIuc2V0QXR0cmlidXRlJiZxKGEuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEpe2Iuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixjYSgoXCIgXCIrKGIuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCIpK1wiIFwiKS5yZXBsYWNlKC9bXFxuXFx0XS9nLFwiIFwiKS5yZXBsYWNlKFwiIFwiK2NhKGEpK1wiIFwiLFwiIFwiKSkpfSl9ZnVuY3Rpb24gaWIoYixhKXtpZihhJiZiLnNldEF0dHJpYnV0ZSl7dmFyIGM9KFwiIFwiKyhiLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfHxcIlwiKStcIiBcIikucmVwbGFjZSgvW1xcblxcdF0vZyxcIiBcIik7cShhLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihhKXthPWNhKGEpOy0xPT09Yy5pbmRleE9mKFwiIFwiK2ErXCIgXCIpJiZcbihjKz1hK1wiIFwiKX0pO2Iuc2V0QXR0cmlidXRlKFwiY2xhc3NcIixjYShjKSl9fWZ1bmN0aW9uIERiKGIsYSl7aWYoYSl7YT1hLm5vZGVOYW1lfHwhQihhLmxlbmd0aCl8fENhKGEpP1thXTphO2Zvcih2YXIgYz0wO2M8YS5sZW5ndGg7YysrKWIucHVzaChhW2NdKX19ZnVuY3Rpb24ga2MoYixhKXtyZXR1cm4gamIoYixcIiRcIisoYXx8XCJuZ0NvbnRyb2xsZXJcIikrXCJDb250cm9sbGVyXCIpfWZ1bmN0aW9uIGpiKGIsYSxjKXtiPXkoYik7OT09YlswXS5ub2RlVHlwZSYmKGI9Yi5maW5kKFwiaHRtbFwiKSk7Zm9yKGE9TShhKT9hOlthXTtiLmxlbmd0aDspe2Zvcih2YXIgZD1iWzBdLGU9MCxnPWEubGVuZ3RoO2U8ZztlKyspaWYoKGM9Yi5kYXRhKGFbZV0pKSE9PXMpcmV0dXJuIGM7Yj15KGQucGFyZW50Tm9kZXx8MTE9PT1kLm5vZGVUeXBlJiZkLmhvc3QpfX1mdW5jdGlvbiBsYyhiKXtmb3IodmFyIGE9MCxjPWIuY2hpbGROb2RlczthPGMubGVuZ3RoO2ErKylIYShjW2FdKTtmb3IoO2IuZmlyc3RDaGlsZDspYi5yZW1vdmVDaGlsZChiLmZpcnN0Q2hpbGQpfVxuZnVuY3Rpb24gbWMoYixhKXt2YXIgYz1rYlthLnRvTG93ZXJDYXNlKCldO3JldHVybiBjJiZuY1tiLm5vZGVOYW1lXSYmY31mdW5jdGlvbiBuZShiLGEpe3ZhciBjPWZ1bmN0aW9uKGMsZSl7Yy5wcmV2ZW50RGVmYXVsdHx8KGMucHJldmVudERlZmF1bHQ9ZnVuY3Rpb24oKXtjLnJldHVyblZhbHVlPSExfSk7Yy5zdG9wUHJvcGFnYXRpb258fChjLnN0b3BQcm9wYWdhdGlvbj1mdW5jdGlvbigpe2MuY2FuY2VsQnViYmxlPSEwfSk7Yy50YXJnZXR8fChjLnRhcmdldD1jLnNyY0VsZW1lbnR8fFUpO2lmKEUoYy5kZWZhdWx0UHJldmVudGVkKSl7dmFyIGc9Yy5wcmV2ZW50RGVmYXVsdDtjLnByZXZlbnREZWZhdWx0PWZ1bmN0aW9uKCl7Yy5kZWZhdWx0UHJldmVudGVkPSEwO2cuY2FsbChjKX07Yy5kZWZhdWx0UHJldmVudGVkPSExfWMuaXNEZWZhdWx0UHJldmVudGVkPWZ1bmN0aW9uKCl7cmV0dXJuIGMuZGVmYXVsdFByZXZlbnRlZHx8ITE9PT1jLnJldHVyblZhbHVlfTt2YXIgZj1VYihhW2V8fFxuYy50eXBlXXx8W10pO3EoZixmdW5jdGlvbihhKXthLmNhbGwoYixjKX0pOzg+PVM/KGMucHJldmVudERlZmF1bHQ9bnVsbCxjLnN0b3BQcm9wYWdhdGlvbj1udWxsLGMuaXNEZWZhdWx0UHJldmVudGVkPW51bGwpOihkZWxldGUgYy5wcmV2ZW50RGVmYXVsdCxkZWxldGUgYy5zdG9wUHJvcGFnYXRpb24sZGVsZXRlIGMuaXNEZWZhdWx0UHJldmVudGVkKX07Yy5lbGVtPWI7cmV0dXJuIGN9ZnVuY3Rpb24gSWEoYil7dmFyIGE9dHlwZW9mIGIsYztcIm9iamVjdFwiPT1hJiZudWxsIT09Yj9cImZ1bmN0aW9uXCI9PXR5cGVvZihjPWIuJCRoYXNoS2V5KT9jPWIuJCRoYXNoS2V5KCk6Yz09PXMmJihjPWIuJCRoYXNoS2V5PWJiKCkpOmM9YjtyZXR1cm4gYStcIjpcIitjfWZ1bmN0aW9uIFZhKGIpe3EoYix0aGlzLnB1dCx0aGlzKX1mdW5jdGlvbiBvYyhiKXt2YXIgYSxjO1wiZnVuY3Rpb25cIj09dHlwZW9mIGI/KGE9Yi4kaW5qZWN0KXx8KGE9W10sYi5sZW5ndGgmJihjPWIudG9TdHJpbmcoKS5yZXBsYWNlKG9lLFxuXCJcIiksYz1jLm1hdGNoKHBlKSxxKGNbMV0uc3BsaXQocWUpLGZ1bmN0aW9uKGIpe2IucmVwbGFjZShyZSxmdW5jdGlvbihiLGMsZCl7YS5wdXNoKGQpfSl9KSksYi4kaW5qZWN0PWEpOk0oYik/KGM9Yi5sZW5ndGgtMSxSYShiW2NdLFwiZm5cIiksYT1iLnNsaWNlKDAsYykpOlJhKGIsXCJmblwiLCEwKTtyZXR1cm4gYX1mdW5jdGlvbiBhYyhiKXtmdW5jdGlvbiBhKGEpe3JldHVybiBmdW5jdGlvbihiLGMpe2lmKFgoYikpcShiLFJiKGEpKTtlbHNlIHJldHVybiBhKGIsYyl9fWZ1bmN0aW9uIGMoYSxiKXtBYShhLFwic2VydmljZVwiKTtpZihQKGIpfHxNKGIpKWI9bi5pbnN0YW50aWF0ZShiKTtpZighYi4kZ2V0KXRocm93IFdhKFwicGdldFwiLGEpO3JldHVybiBtW2EraF09Yn1mdW5jdGlvbiBkKGEsYil7cmV0dXJuIGMoYSx7JGdldDpifSl9ZnVuY3Rpb24gZShhKXt2YXIgYj1bXSxjLGQsZyxoO3EoYSxmdW5jdGlvbihhKXtpZighay5nZXQoYSkpe2sucHV0KGEsITApO3RyeXtpZih3KGEpKWZvcihjPVxuU2EoYSksYj1iLmNvbmNhdChlKGMucmVxdWlyZXMpKS5jb25jYXQoYy5fcnVuQmxvY2tzKSxkPWMuX2ludm9rZVF1ZXVlLGc9MCxoPWQubGVuZ3RoO2c8aDtnKyspe3ZhciBmPWRbZ10sbD1uLmdldChmWzBdKTtsW2ZbMV1dLmFwcGx5KGwsZlsyXSl9ZWxzZSBQKGEpP2IucHVzaChuLmludm9rZShhKSk6TShhKT9iLnB1c2gobi5pbnZva2UoYSkpOlJhKGEsXCJtb2R1bGVcIil9Y2F0Y2gobSl7dGhyb3cgTShhKSYmKGE9YVthLmxlbmd0aC0xXSksbS5tZXNzYWdlJiYobS5zdGFjayYmLTE9PW0uc3RhY2suaW5kZXhPZihtLm1lc3NhZ2UpKSYmKG09bS5tZXNzYWdlK1wiXFxuXCIrbS5zdGFjayksV2EoXCJtb2R1bGVyclwiLGEsbS5zdGFja3x8bS5tZXNzYWdlfHxtKTt9fX0pO3JldHVybiBifWZ1bmN0aW9uIGcoYSxiKXtmdW5jdGlvbiBjKGQpe2lmKGEuaGFzT3duUHJvcGVydHkoZCkpe2lmKGFbZF09PT1mKXRocm93IFdhKFwiY2RlcFwiLGwuam9pbihcIiA8LSBcIikpO3JldHVybiBhW2RdfXRyeXtyZXR1cm4gbC51bnNoaWZ0KGQpLFxuYVtkXT1mLGFbZF09YihkKX1jYXRjaChlKXt0aHJvdyBhW2RdPT09ZiYmZGVsZXRlIGFbZF0sZTt9ZmluYWxseXtsLnNoaWZ0KCl9fWZ1bmN0aW9uIGQoYSxiLGUpe3ZhciBnPVtdLGg9b2MoYSksZixsLGs7bD0wO2ZvcihmPWgubGVuZ3RoO2w8ZjtsKyspe2s9aFtsXTtpZihcInN0cmluZ1wiIT09dHlwZW9mIGspdGhyb3cgV2EoXCJpdGtuXCIsayk7Zy5wdXNoKGUmJmUuaGFzT3duUHJvcGVydHkoayk/ZVtrXTpjKGspKX1hLiRpbmplY3R8fChhPWFbZl0pO3JldHVybiBhLmFwcGx5KGIsZyl9cmV0dXJue2ludm9rZTpkLGluc3RhbnRpYXRlOmZ1bmN0aW9uKGEsYil7dmFyIGM9ZnVuY3Rpb24oKXt9LGU7Yy5wcm90b3R5cGU9KE0oYSk/YVthLmxlbmd0aC0xXTphKS5wcm90b3R5cGU7Yz1uZXcgYztlPWQoYSxjLGIpO3JldHVybiBYKGUpfHxQKGUpP2U6Y30sZ2V0OmMsYW5ub3RhdGU6b2MsaGFzOmZ1bmN0aW9uKGIpe3JldHVybiBtLmhhc093blByb3BlcnR5KGIraCl8fGEuaGFzT3duUHJvcGVydHkoYil9fX1cbnZhciBmPXt9LGg9XCJQcm92aWRlclwiLGw9W10saz1uZXcgVmEsbT17JHByb3ZpZGU6e3Byb3ZpZGVyOmEoYyksZmFjdG9yeTphKGQpLHNlcnZpY2U6YShmdW5jdGlvbihhLGIpe3JldHVybiBkKGEsW1wiJGluamVjdG9yXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGEuaW5zdGFudGlhdGUoYil9XSl9KSx2YWx1ZTphKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGQoYSxhYShiKSl9KSxjb25zdGFudDphKGZ1bmN0aW9uKGEsYil7QWEoYSxcImNvbnN0YW50XCIpO21bYV09YjtwW2FdPWJ9KSxkZWNvcmF0b3I6ZnVuY3Rpb24oYSxiKXt2YXIgYz1uLmdldChhK2gpLGQ9Yy4kZ2V0O2MuJGdldD1mdW5jdGlvbigpe3ZhciBhPXIuaW52b2tlKGQsYyk7cmV0dXJuIHIuaW52b2tlKGIsbnVsbCx7JGRlbGVnYXRlOmF9KX19fX0sbj1tLiRpbmplY3Rvcj1nKG0sZnVuY3Rpb24oKXt0aHJvdyBXYShcInVucHJcIixsLmpvaW4oXCIgPC0gXCIpKTt9KSxwPXt9LHI9cC4kaW5qZWN0b3I9ZyhwLGZ1bmN0aW9uKGEpe2E9bi5nZXQoYStcbmgpO3JldHVybiByLmludm9rZShhLiRnZXQsYSl9KTtxKGUoYiksZnVuY3Rpb24oYSl7ci5pbnZva2UoYXx8Qyl9KTtyZXR1cm4gcn1mdW5jdGlvbiBLZCgpe3ZhciBiPSEwO3RoaXMuZGlzYWJsZUF1dG9TY3JvbGxpbmc9ZnVuY3Rpb24oKXtiPSExfTt0aGlzLiRnZXQ9W1wiJHdpbmRvd1wiLFwiJGxvY2F0aW9uXCIsXCIkcm9vdFNjb3BlXCIsZnVuY3Rpb24oYSxjLGQpe2Z1bmN0aW9uIGUoYSl7dmFyIGI9bnVsbDtxKGEsZnVuY3Rpb24oYSl7Ynx8XCJhXCIhPT1LKGEubm9kZU5hbWUpfHwoYj1hKX0pO3JldHVybiBifWZ1bmN0aW9uIGcoKXt2YXIgYj1jLmhhc2goKSxkO2I/KGQ9Zi5nZXRFbGVtZW50QnlJZChiKSk/ZC5zY3JvbGxJbnRvVmlldygpOihkPWUoZi5nZXRFbGVtZW50c0J5TmFtZShiKSkpP2Quc2Nyb2xsSW50b1ZpZXcoKTpcInRvcFwiPT09YiYmYS5zY3JvbGxUbygwLDApOmEuc2Nyb2xsVG8oMCwwKX12YXIgZj1hLmRvY3VtZW50O2ImJmQuJHdhdGNoKGZ1bmN0aW9uKCl7cmV0dXJuIGMuaGFzaCgpfSxcbmZ1bmN0aW9uKCl7ZC4kZXZhbEFzeW5jKGcpfSk7cmV0dXJuIGd9XX1mdW5jdGlvbiBnZSgpe3RoaXMuJGdldD1bXCIkJHJBRlwiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihiLGEpe3JldHVybiBiLnN1cHBvcnRlZD9mdW5jdGlvbihhKXtyZXR1cm4gYihhKX06ZnVuY3Rpb24oYil7cmV0dXJuIGEoYiwwLCExKX19XX1mdW5jdGlvbiBzZShiLGEsYyxkKXtmdW5jdGlvbiBlKGEpe3RyeXthLmFwcGx5KG51bGwseWEuY2FsbChhcmd1bWVudHMsMSkpfWZpbmFsbHl7aWYoei0tLDA9PT16KWZvcig7dS5sZW5ndGg7KXRyeXt1LnBvcCgpKCl9Y2F0Y2goYil7Yy5lcnJvcihiKX19fWZ1bmN0aW9uIGcoYSxiKXsoZnVuY3Rpb24gVCgpe3EoRixmdW5jdGlvbihhKXthKCl9KTt2PWIoVCxhKX0pKCl9ZnVuY3Rpb24gZigpe3g9bnVsbDtKIT1oLnVybCgpJiYoSj1oLnVybCgpLHEobWEsZnVuY3Rpb24oYSl7YShoLnVybCgpKX0pKX12YXIgaD10aGlzLGw9YVswXSxrPWIubG9jYXRpb24sbT1iLmhpc3RvcnksXG5uPWIuc2V0VGltZW91dCxwPWIuY2xlYXJUaW1lb3V0LHI9e307aC5pc01vY2s9ITE7dmFyIHo9MCx1PVtdO2guJCRjb21wbGV0ZU91dHN0YW5kaW5nUmVxdWVzdD1lO2guJCRpbmNPdXRzdGFuZGluZ1JlcXVlc3RDb3VudD1mdW5jdGlvbigpe3orK307aC5ub3RpZnlXaGVuTm9PdXRzdGFuZGluZ1JlcXVlc3RzPWZ1bmN0aW9uKGEpe3EoRixmdW5jdGlvbihhKXthKCl9KTswPT09ej9hKCk6dS5wdXNoKGEpfTt2YXIgRj1bXSx2O2guYWRkUG9sbEZuPWZ1bmN0aW9uKGEpe0UodikmJmcoMTAwLG4pO0YucHVzaChhKTtyZXR1cm4gYX07dmFyIEo9ay5ocmVmLEE9YS5maW5kKFwiYmFzZVwiKSx4PW51bGw7aC51cmw9ZnVuY3Rpb24oYSxjKXtrIT09Yi5sb2NhdGlvbiYmKGs9Yi5sb2NhdGlvbik7bSE9PWIuaGlzdG9yeSYmKG09Yi5oaXN0b3J5KTtpZihhKXtpZihKIT1hKXJldHVybiBKPWEsZC5oaXN0b3J5P2M/bS5yZXBsYWNlU3RhdGUobnVsbCxcIlwiLGEpOihtLnB1c2hTdGF0ZShudWxsLFwiXCIsXG5hKSxBLmF0dHIoXCJocmVmXCIsQS5hdHRyKFwiaHJlZlwiKSkpOih4PWEsYz9rLnJlcGxhY2UoYSk6ay5ocmVmPWEpLGh9ZWxzZSByZXR1cm4geHx8ay5ocmVmLnJlcGxhY2UoLyUyNy9nLFwiJ1wiKX07dmFyIG1hPVtdLEw9ITE7aC5vblVybENoYW5nZT1mdW5jdGlvbihhKXtpZighTCl7aWYoZC5oaXN0b3J5KXkoYikub24oXCJwb3BzdGF0ZVwiLGYpO2lmKGQuaGFzaGNoYW5nZSl5KGIpLm9uKFwiaGFzaGNoYW5nZVwiLGYpO2Vsc2UgaC5hZGRQb2xsRm4oZik7TD0hMH1tYS5wdXNoKGEpO3JldHVybiBhfTtoLmJhc2VIcmVmPWZ1bmN0aW9uKCl7dmFyIGE9QS5hdHRyKFwiaHJlZlwiKTtyZXR1cm4gYT9hLnJlcGxhY2UoL14oaHR0cHM/XFw6KT9cXC9cXC9bXlxcL10qLyxcIlwiKTpcIlwifTt2YXIgUT17fSxkYT1cIlwiLEg9aC5iYXNlSHJlZigpO2guY29va2llcz1mdW5jdGlvbihhLGIpe3ZhciBkLGUsZyxoO2lmKGEpYj09PXM/bC5jb29raWU9ZXNjYXBlKGEpK1wiPTtwYXRoPVwiK0grXCI7ZXhwaXJlcz1UaHUsIDAxIEphbiAxOTcwIDAwOjAwOjAwIEdNVFwiOlxudyhiKSYmKGQ9KGwuY29va2llPWVzY2FwZShhKStcIj1cIitlc2NhcGUoYikrXCI7cGF0aD1cIitIKS5sZW5ndGgrMSw0MDk2PGQmJmMud2FybihcIkNvb2tpZSAnXCIrYStcIicgcG9zc2libHkgbm90IHNldCBvciBvdmVyZmxvd2VkIGJlY2F1c2UgaXQgd2FzIHRvbyBsYXJnZSAoXCIrZCtcIiA+IDQwOTYgYnl0ZXMpIVwiKSk7ZWxzZXtpZihsLmNvb2tpZSE9PWRhKWZvcihkYT1sLmNvb2tpZSxkPWRhLnNwbGl0KFwiOyBcIiksUT17fSxnPTA7ZzxkLmxlbmd0aDtnKyspZT1kW2ddLGg9ZS5pbmRleE9mKFwiPVwiKSwwPGgmJihhPXVuZXNjYXBlKGUuc3Vic3RyaW5nKDAsaCkpLFFbYV09PT1zJiYoUVthXT11bmVzY2FwZShlLnN1YnN0cmluZyhoKzEpKSkpO3JldHVybiBRfX07aC5kZWZlcj1mdW5jdGlvbihhLGIpe3ZhciBjO3orKztjPW4oZnVuY3Rpb24oKXtkZWxldGUgcltjXTtlKGEpfSxifHwwKTtyW2NdPSEwO3JldHVybiBjfTtoLmRlZmVyLmNhbmNlbD1mdW5jdGlvbihhKXtyZXR1cm4gclthXT8oZGVsZXRlIHJbYV0sXG5wKGEpLGUoQyksITApOiExfX1mdW5jdGlvbiBNZCgpe3RoaXMuJGdldD1bXCIkd2luZG93XCIsXCIkbG9nXCIsXCIkc25pZmZlclwiLFwiJGRvY3VtZW50XCIsZnVuY3Rpb24oYixhLGMsZCl7cmV0dXJuIG5ldyBzZShiLGQsYSxjKX1dfWZ1bmN0aW9uIE5kKCl7dGhpcy4kZ2V0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYihiLGQpe2Z1bmN0aW9uIGUoYSl7YSE9biYmKHA/cD09YSYmKHA9YS5uKTpwPWEsZyhhLm4sYS5wKSxnKGEsbiksbj1hLG4ubj1udWxsKX1mdW5jdGlvbiBnKGEsYil7YSE9YiYmKGEmJihhLnA9YiksYiYmKGIubj1hKSl9aWYoYiBpbiBhKXRocm93IHQoXCIkY2FjaGVGYWN0b3J5XCIpKFwiaWlkXCIsYik7dmFyIGY9MCxoPUQoe30sZCx7aWQ6Yn0pLGw9e30saz1kJiZkLmNhcGFjaXR5fHxOdW1iZXIuTUFYX1ZBTFVFLG09e30sbj1udWxsLHA9bnVsbDtyZXR1cm4gYVtiXT17cHV0OmZ1bmN0aW9uKGEsYil7aWYoazxOdW1iZXIuTUFYX1ZBTFVFKXt2YXIgYz1tW2FdfHwobVthXT17a2V5OmF9KTtcbmUoYyl9aWYoIUUoYikpcmV0dXJuIGEgaW4gbHx8ZisrLGxbYV09YixmPmsmJnRoaXMucmVtb3ZlKHAua2V5KSxifSxnZXQ6ZnVuY3Rpb24oYSl7aWYoazxOdW1iZXIuTUFYX1ZBTFVFKXt2YXIgYj1tW2FdO2lmKCFiKXJldHVybjtlKGIpfXJldHVybiBsW2FdfSxyZW1vdmU6ZnVuY3Rpb24oYSl7aWYoazxOdW1iZXIuTUFYX1ZBTFVFKXt2YXIgYj1tW2FdO2lmKCFiKXJldHVybjtiPT1uJiYobj1iLnApO2I9PXAmJihwPWIubik7ZyhiLm4sYi5wKTtkZWxldGUgbVthXX1kZWxldGUgbFthXTtmLS19LHJlbW92ZUFsbDpmdW5jdGlvbigpe2w9e307Zj0wO209e307bj1wPW51bGx9LGRlc3Ryb3k6ZnVuY3Rpb24oKXttPWg9bD1udWxsO2RlbGV0ZSBhW2JdfSxpbmZvOmZ1bmN0aW9uKCl7cmV0dXJuIEQoe30saCx7c2l6ZTpmfSl9fX12YXIgYT17fTtiLmluZm89ZnVuY3Rpb24oKXt2YXIgYj17fTtxKGEsZnVuY3Rpb24oYSxlKXtiW2VdPWEuaW5mbygpfSk7cmV0dXJuIGJ9O2IuZ2V0PWZ1bmN0aW9uKGIpe3JldHVybiBhW2JdfTtcbnJldHVybiBifX1mdW5jdGlvbiBjZSgpe3RoaXMuJGdldD1bXCIkY2FjaGVGYWN0b3J5XCIsZnVuY3Rpb24oYil7cmV0dXJuIGIoXCJ0ZW1wbGF0ZXNcIil9XX1mdW5jdGlvbiBjYyhiLGEpe3ZhciBjPXt9LGQ9XCJEaXJlY3RpdmVcIixlPS9eXFxzKmRpcmVjdGl2ZVxcOlxccyooW1xcZFxcd1xcLV9dKylcXHMrKC4qKSQvLGc9LygoW1xcZFxcd1xcLV9dKykoPzpcXDooW147XSspKT87PykvLGY9L14ob25bYS16XSt8Zm9ybWFjdGlvbikkLzt0aGlzLmRpcmVjdGl2ZT1mdW5jdGlvbiBsKGEsZSl7QWEoYSxcImRpcmVjdGl2ZVwiKTt3KGEpPyh4YihlLFwiZGlyZWN0aXZlRmFjdG9yeVwiKSxjLmhhc093blByb3BlcnR5KGEpfHwoY1thXT1bXSxiLmZhY3RvcnkoYStkLFtcIiRpbmplY3RvclwiLFwiJGV4Y2VwdGlvbkhhbmRsZXJcIixmdW5jdGlvbihiLGQpe3ZhciBlPVtdO3EoY1thXSxmdW5jdGlvbihjLGcpe3RyeXt2YXIgZj1iLmludm9rZShjKTtQKGYpP2Y9e2NvbXBpbGU6YWEoZil9OiFmLmNvbXBpbGUmJmYubGluayYmKGYuY29tcGlsZT1cbmFhKGYubGluaykpO2YucHJpb3JpdHk9Zi5wcmlvcml0eXx8MDtmLmluZGV4PWc7Zi5uYW1lPWYubmFtZXx8YTtmLnJlcXVpcmU9Zi5yZXF1aXJlfHxmLmNvbnRyb2xsZXImJmYubmFtZTtmLnJlc3RyaWN0PWYucmVzdHJpY3R8fFwiQVwiO2UucHVzaChmKX1jYXRjaChsKXtkKGwpfX0pO3JldHVybiBlfV0pKSxjW2FdLnB1c2goZSkpOnEoYSxSYihsKSk7cmV0dXJuIHRoaXN9O3RoaXMuYUhyZWZTYW5pdGl6YXRpb25XaGl0ZWxpc3Q9ZnVuY3Rpb24oYil7cmV0dXJuIEIoYik/KGEuYUhyZWZTYW5pdGl6YXRpb25XaGl0ZWxpc3QoYiksdGhpcyk6YS5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdCgpfTt0aGlzLmltZ1NyY1Nhbml0aXphdGlvbldoaXRlbGlzdD1mdW5jdGlvbihiKXtyZXR1cm4gQihiKT8oYS5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoYiksdGhpcyk6YS5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3QoKX07dGhpcy4kZ2V0PVtcIiRpbmplY3RvclwiLFwiJGludGVycG9sYXRlXCIsXG5cIiRleGNlcHRpb25IYW5kbGVyXCIsXCIkaHR0cFwiLFwiJHRlbXBsYXRlQ2FjaGVcIixcIiRwYXJzZVwiLFwiJGNvbnRyb2xsZXJcIixcIiRyb290U2NvcGVcIixcIiRkb2N1bWVudFwiLFwiJHNjZVwiLFwiJGFuaW1hdGVcIixcIiQkc2FuaXRpemVVcmlcIixmdW5jdGlvbihhLGIsbSxuLHAscix6LHUsRix2LEosQSl7ZnVuY3Rpb24geChhLGIsYyxkLGUpe2EgaW5zdGFuY2VvZiB5fHwoYT15KGEpKTtxKGEsZnVuY3Rpb24oYixjKXszPT1iLm5vZGVUeXBlJiZiLm5vZGVWYWx1ZS5tYXRjaCgvXFxTKy8pJiYoYVtjXT15KGIpLndyYXAoXCI8c3Bhbj48L3NwYW4+XCIpLnBhcmVudCgpWzBdKX0pO3ZhciBnPUwoYSxiLGEsYyxkLGUpO21hKGEsXCJuZy1zY29wZVwiKTtyZXR1cm4gZnVuY3Rpb24oYixjLGQpe3hiKGIsXCJzY29wZVwiKTt2YXIgZT1jP0phLmNsb25lLmNhbGwoYSk6YTtxKGQsZnVuY3Rpb24oYSxiKXtlLmRhdGEoXCIkXCIrYitcIkNvbnRyb2xsZXJcIixhKX0pO2Q9MDtmb3IodmFyIGY9ZS5sZW5ndGg7ZDxmO2QrKyl7dmFyIGw9XG5lW2RdLm5vZGVUeXBlOzEhPT1sJiY5IT09bHx8ZS5lcShkKS5kYXRhKFwiJHNjb3BlXCIsYil9YyYmYyhlLGIpO2cmJmcoYixlLGUpO3JldHVybiBlfX1mdW5jdGlvbiBtYShhLGIpe3RyeXthLmFkZENsYXNzKGIpfWNhdGNoKGMpe319ZnVuY3Rpb24gTChhLGIsYyxkLGUsZyl7ZnVuY3Rpb24gZihhLGMsZCxlKXt2YXIgZyxrLG0scixuLHAsejtnPWMubGVuZ3RoO3ZhciBJPUFycmF5KGcpO2ZvcihuPTA7bjxnO24rKylJW25dPWNbbl07ej1uPTA7Zm9yKHA9bC5sZW5ndGg7bjxwO3orKylrPUlbel0sYz1sW24rK10sZz1sW24rK10sbT15KGspLGM/KGMuc2NvcGU/KHI9YS4kbmV3KCksbS5kYXRhKFwiJHNjb3BlXCIscikpOnI9YSwobT1jLnRyYW5zY2x1ZGUpfHwhZSYmYj9jKGcscixrLGQsUShhLG18fGIpKTpjKGcscixrLGQsZSkpOmcmJmcoYSxrLmNoaWxkTm9kZXMscyxlKX1mb3IodmFyIGw9W10sayxtLHIsbixwPTA7cDxhLmxlbmd0aDtwKyspaz1uZXcgSGIsbT1kYShhW3BdLFtdLGssXG4wPT09cD9kOnMsZSksKGc9bS5sZW5ndGg/aWEobSxhW3BdLGssYixjLG51bGwsW10sW10sZyk6bnVsbCkmJmcuc2NvcGUmJm1hKHkoYVtwXSksXCJuZy1zY29wZVwiKSxrPWcmJmcudGVybWluYWx8fCEocj1hW3BdLmNoaWxkTm9kZXMpfHwhci5sZW5ndGg/bnVsbDpMKHIsZz9nLnRyYW5zY2x1ZGU6YiksbC5wdXNoKGcsayksbj1ufHxnfHxrLGc9bnVsbDtyZXR1cm4gbj9mOm51bGx9ZnVuY3Rpb24gUShhLGIpe3JldHVybiBmdW5jdGlvbihjLGQsZSl7dmFyIGc9ITE7Y3x8KGM9YS4kbmV3KCksZz1jLiQkdHJhbnNjbHVkZWQ9ITApO2Q9YihjLGQsZSk7aWYoZylkLm9uKFwiJGRlc3Ryb3lcIixlYihjLGMuJGRlc3Ryb3kpKTtyZXR1cm4gZH19ZnVuY3Rpb24gZGEoYSxiLGMsZCxmKXt2YXIgaz1jLiRhdHRyLGw7c3dpdGNoKGEubm9kZVR5cGUpe2Nhc2UgMTpUKGIsbmEoS2EoYSkudG9Mb3dlckNhc2UoKSksXCJFXCIsZCxmKTt2YXIgbSxyLG47bD1hLmF0dHJpYnV0ZXM7Zm9yKHZhciBwPTAsej1cbmwmJmwubGVuZ3RoO3A8ejtwKyspe3ZhciB1PSExLEY9ITE7bT1sW3BdO2lmKCFTfHw4PD1TfHxtLnNwZWNpZmllZCl7cj1tLm5hbWU7bj1uYShyKTtXLnRlc3QobikmJihyPWZiKG4uc3Vic3RyKDYpLFwiLVwiKSk7dmFyIEo9bi5yZXBsYWNlKC8oU3RhcnR8RW5kKSQvLFwiXCIpO249PT1KK1wiU3RhcnRcIiYmKHU9cixGPXIuc3Vic3RyKDAsci5sZW5ndGgtNSkrXCJlbmRcIixyPXIuc3Vic3RyKDAsci5sZW5ndGgtNikpO249bmEoci50b0xvd2VyQ2FzZSgpKTtrW25dPXI7Y1tuXT1tPWNhKG0udmFsdWUpO21jKGEsbikmJihjW25dPSEwKTtOKGEsYixtLG4pO1QoYixuLFwiQVwiLGQsZix1LEYpfX1hPWEuY2xhc3NOYW1lO2lmKHcoYSkmJlwiXCIhPT1hKWZvcig7bD1nLmV4ZWMoYSk7KW49bmEobFsyXSksVChiLG4sXCJDXCIsZCxmKSYmKGNbbl09Y2EobFszXSkpLGE9YS5zdWJzdHIobC5pbmRleCtsWzBdLmxlbmd0aCk7YnJlYWs7Y2FzZSAzOnQoYixhLm5vZGVWYWx1ZSk7YnJlYWs7Y2FzZSA4OnRyeXtpZihsPVxuZS5leGVjKGEubm9kZVZhbHVlKSluPW5hKGxbMV0pLFQoYixuLFwiTVwiLGQsZikmJihjW25dPWNhKGxbMl0pKX1jYXRjaCh4KXt9fWIuc29ydChFKTtyZXR1cm4gYn1mdW5jdGlvbiBIKGEsYixjKXt2YXIgZD1bXSxlPTA7aWYoYiYmYS5oYXNBdHRyaWJ1dGUmJmEuaGFzQXR0cmlidXRlKGIpKXtkb3tpZighYSl0aHJvdyBqYShcInV0ZXJkaXJcIixiLGMpOzE9PWEubm9kZVR5cGUmJihhLmhhc0F0dHJpYnV0ZShiKSYmZSsrLGEuaGFzQXR0cmlidXRlKGMpJiZlLS0pO2QucHVzaChhKTthPWEubmV4dFNpYmxpbmd9d2hpbGUoMDxlKX1lbHNlIGQucHVzaChhKTtyZXR1cm4geShkKX1mdW5jdGlvbiBSKGEsYixjKXtyZXR1cm4gZnVuY3Rpb24oZCxlLGcsZixsKXtlPUgoZVswXSxiLGMpO3JldHVybiBhKGQsZSxnLGYsbCl9fWZ1bmN0aW9uIGlhKGEsYyxkLGUsZyxmLGwsbixwKXtmdW5jdGlvbiB1KGEsYixjLGQpe2lmKGEpe2MmJihhPVIoYSxjLGQpKTthLnJlcXVpcmU9Ry5yZXF1aXJlO2lmKFE9PT1cbkd8fEcuJCRpc29sYXRlU2NvcGUpYT1xYyhhLHtpc29sYXRlU2NvcGU6ITB9KTtsLnB1c2goYSl9aWYoYil7YyYmKGI9UihiLGMsZCkpO2IucmVxdWlyZT1HLnJlcXVpcmU7aWYoUT09PUd8fEcuJCRpc29sYXRlU2NvcGUpYj1xYyhiLHtpc29sYXRlU2NvcGU6ITB9KTtuLnB1c2goYil9fWZ1bmN0aW9uIEYoYSxiLGMpe3ZhciBkLGU9XCJkYXRhXCIsZz0hMTtpZih3KGEpKXtmb3IoO1wiXlwiPT0oZD1hLmNoYXJBdCgwKSl8fFwiP1wiPT1kOylhPWEuc3Vic3RyKDEpLFwiXlwiPT1kJiYoZT1cImluaGVyaXRlZERhdGFcIiksZz1nfHxcIj9cIj09ZDtkPW51bGw7YyYmXCJkYXRhXCI9PT1lJiYoZD1jW2FdKTtkPWR8fGJbZV0oXCIkXCIrYStcIkNvbnRyb2xsZXJcIik7aWYoIWQmJiFnKXRocm93IGphKFwiY3RyZXFcIixhLHQpO31lbHNlIE0oYSkmJihkPVtdLHEoYSxmdW5jdGlvbihhKXtkLnB1c2goRihhLGIsYykpfSkpO3JldHVybiBkfWZ1bmN0aW9uIEooYSxlLGcsZixwKXtmdW5jdGlvbiB1KGEsYil7dmFyIGM7Mj5hcmd1bWVudHMubGVuZ3RoJiZcbihiPWEsYT1zKTtEJiYoYz1sYik7cmV0dXJuIHAoYSxiLGMpfXZhciBJLHgsdixBLFIsSCxsYj17fSxkYTtJPWM9PT1nP2Q6VWIoZCxuZXcgSGIoeShnKSxkLiRhdHRyKSk7eD1JLiQkZWxlbWVudDtpZihRKXt2YXIgVD0vXlxccyooW0A9Jl0pKFxcPz8pXFxzKihcXHcqKVxccyokLztmPXkoZyk7SD1lLiRuZXcoITApO2lhJiZpYT09PVEuJCRvcmlnaW5hbERpcmVjdGl2ZT9mLmRhdGEoXCIkaXNvbGF0ZVNjb3BlXCIsSCk6Zi5kYXRhKFwiJGlzb2xhdGVTY29wZU5vVGVtcGxhdGVcIixIKTttYShmLFwibmctaXNvbGF0ZS1zY29wZVwiKTtxKFEuc2NvcGUsZnVuY3Rpb24oYSxjKXt2YXIgZD1hLm1hdGNoKFQpfHxbXSxnPWRbM118fGMsZj1cIj9cIj09ZFsyXSxkPWRbMV0sbCxtLG4scDtILiQkaXNvbGF0ZUJpbmRpbmdzW2NdPWQrZztzd2l0Y2goZCl7Y2FzZSBcIkBcIjpJLiRvYnNlcnZlKGcsZnVuY3Rpb24oYSl7SFtjXT1hfSk7SS4kJG9ic2VydmVyc1tnXS4kJHNjb3BlPWU7SVtnXSYmKEhbY109YihJW2ddKShlKSk7XG5icmVhaztjYXNlIFwiPVwiOmlmKGYmJiFJW2ddKWJyZWFrO209cihJW2ddKTtwPW0ubGl0ZXJhbD94YTpmdW5jdGlvbihhLGIpe3JldHVybiBhPT09Yn07bj1tLmFzc2lnbnx8ZnVuY3Rpb24oKXtsPUhbY109bShlKTt0aHJvdyBqYShcIm5vbmFzc2lnblwiLElbZ10sUS5uYW1lKTt9O2w9SFtjXT1tKGUpO0guJHdhdGNoKGZ1bmN0aW9uKCl7dmFyIGE9bShlKTtwKGEsSFtjXSl8fChwKGEsbCk/bihlLGE9SFtjXSk6SFtjXT1hKTtyZXR1cm4gbD1hfSxudWxsLG0ubGl0ZXJhbCk7YnJlYWs7Y2FzZSBcIiZcIjptPXIoSVtnXSk7SFtjXT1mdW5jdGlvbihhKXtyZXR1cm4gbShlLGEpfTticmVhaztkZWZhdWx0OnRocm93IGphKFwiaXNjcFwiLFEubmFtZSxjLGEpO319KX1kYT1wJiZ1O0wmJnEoTCxmdW5jdGlvbihhKXt2YXIgYj17JHNjb3BlOmE9PT1RfHxhLiQkaXNvbGF0ZVNjb3BlP0g6ZSwkZWxlbWVudDp4LCRhdHRyczpJLCR0cmFuc2NsdWRlOmRhfSxjO1I9YS5jb250cm9sbGVyO1wiQFwiPT1SJiYoUj1cbklbYS5uYW1lXSk7Yz16KFIsYik7bGJbYS5uYW1lXT1jO0R8fHguZGF0YShcIiRcIithLm5hbWUrXCJDb250cm9sbGVyXCIsYyk7YS5jb250cm9sbGVyQXMmJihiLiRzY29wZVthLmNvbnRyb2xsZXJBc109Yyl9KTtmPTA7Zm9yKHY9bC5sZW5ndGg7Zjx2O2YrKyl0cnl7QT1sW2ZdLEEoQS5pc29sYXRlU2NvcGU/SDplLHgsSSxBLnJlcXVpcmUmJkYoQS5yZXF1aXJlLHgsbGIpLGRhKX1jYXRjaChHKXttKEcsaGEoeCkpfWY9ZTtRJiYoUS50ZW1wbGF0ZXx8bnVsbD09PVEudGVtcGxhdGVVcmwpJiYoZj1IKTthJiZhKGYsZy5jaGlsZE5vZGVzLHMscCk7Zm9yKGY9bi5sZW5ndGgtMTswPD1mO2YtLSl0cnl7QT1uW2ZdLEEoQS5pc29sYXRlU2NvcGU/SDplLHgsSSxBLnJlcXVpcmUmJkYoQS5yZXF1aXJlLHgsbGIpLGRhKX1jYXRjaChCKXttKEIsaGEoeCkpfX1wPXB8fHt9O2Zvcih2YXIgdj0tTnVtYmVyLk1BWF9WQUxVRSxBLEw9cC5jb250cm9sbGVyRGlyZWN0aXZlcyxRPXAubmV3SXNvbGF0ZVNjb3BlRGlyZWN0aXZlLFxuaWE9cC50ZW1wbGF0ZURpcmVjdGl2ZSxUPXAubm9uVGxiVHJhbnNjbHVkZURpcmVjdGl2ZSxFPSExLEQ9cC5oYXNFbGVtZW50VHJhbnNjbHVkZURpcmVjdGl2ZSxaPWQuJCRlbGVtZW50PXkoYyksRyx0LFYsWGE9ZSxPLE49MCxTPWEubGVuZ3RoO048UztOKyspe0c9YVtOXTt2YXIgcmE9Ry4kJHN0YXJ0LFc9Ry4kJGVuZDtyYSYmKFo9SChjLHJhLFcpKTtWPXM7aWYodj5HLnByaW9yaXR5KWJyZWFrO2lmKFY9Ry5zY29wZSlBPUF8fEcsRy50ZW1wbGF0ZVVybHx8KEsoXCJuZXcvaXNvbGF0ZWQgc2NvcGVcIixRLEcsWiksWChWKSYmKFE9RykpO3Q9Ry5uYW1lOyFHLnRlbXBsYXRlVXJsJiZHLmNvbnRyb2xsZXImJihWPUcuY29udHJvbGxlcixMPUx8fHt9LEsoXCInXCIrdCtcIicgY29udHJvbGxlclwiLExbdF0sRyxaKSxMW3RdPUcpO2lmKFY9Ry50cmFuc2NsdWRlKUU9ITAsRy4kJHRsYnx8KEsoXCJ0cmFuc2NsdXNpb25cIixULEcsWiksVD1HKSxcImVsZW1lbnRcIj09Vj8oRD0hMCx2PUcucHJpb3JpdHksXG5WPUgoYyxyYSxXKSxaPWQuJCRlbGVtZW50PXkoVS5jcmVhdGVDb21tZW50KFwiIFwiK3QrXCI6IFwiK2RbdF0rXCIgXCIpKSxjPVpbMF0sbWIoZyx5KHlhLmNhbGwoViwwKSksYyksWGE9eChWLGUsdixmJiZmLm5hbWUse25vblRsYlRyYW5zY2x1ZGVEaXJlY3RpdmU6VH0pKTooVj15KEViKGMpKS5jb250ZW50cygpLFouZW1wdHkoKSxYYT14KFYsZSkpO2lmKEcudGVtcGxhdGUpaWYoSyhcInRlbXBsYXRlXCIsaWEsRyxaKSxpYT1HLFY9UChHLnRlbXBsYXRlKT9HLnRlbXBsYXRlKFosZCk6Ry50ZW1wbGF0ZSxWPVkoViksRy5yZXBsYWNlKXtmPUc7Vj1DYi50ZXN0KFYpP3koVik6W107Yz1WWzBdO2lmKDEhPVYubGVuZ3RofHwxIT09Yy5ub2RlVHlwZSl0aHJvdyBqYShcInRwbHJ0XCIsdCxcIlwiKTttYihnLFosYyk7Uz17JGF0dHI6e319O1Y9ZGEoYyxbXSxTKTt2YXIgJD1hLnNwbGljZShOKzEsYS5sZW5ndGgtKE4rMSkpO1EmJnBjKFYpO2E9YS5jb25jYXQoVikuY29uY2F0KCQpO0IoZCxTKTtTPWEubGVuZ3RofWVsc2UgWi5odG1sKFYpO1xuaWYoRy50ZW1wbGF0ZVVybClLKFwidGVtcGxhdGVcIixpYSxHLFopLGlhPUcsRy5yZXBsYWNlJiYoZj1HKSxKPUMoYS5zcGxpY2UoTixhLmxlbmd0aC1OKSxaLGQsZyxYYSxsLG4se2NvbnRyb2xsZXJEaXJlY3RpdmVzOkwsbmV3SXNvbGF0ZVNjb3BlRGlyZWN0aXZlOlEsdGVtcGxhdGVEaXJlY3RpdmU6aWEsbm9uVGxiVHJhbnNjbHVkZURpcmVjdGl2ZTpUfSksUz1hLmxlbmd0aDtlbHNlIGlmKEcuY29tcGlsZSl0cnl7Tz1HLmNvbXBpbGUoWixkLFhhKSxQKE8pP3UobnVsbCxPLHJhLFcpOk8mJnUoTy5wcmUsTy5wb3N0LHJhLFcpfWNhdGNoKGFhKXttKGFhLGhhKFopKX1HLnRlcm1pbmFsJiYoSi50ZXJtaW5hbD0hMCx2PU1hdGgubWF4KHYsRy5wcmlvcml0eSkpfUouc2NvcGU9QSYmITA9PT1BLnNjb3BlO0oudHJhbnNjbHVkZT1FJiZYYTtwLmhhc0VsZW1lbnRUcmFuc2NsdWRlRGlyZWN0aXZlPUQ7cmV0dXJuIEp9ZnVuY3Rpb24gcGMoYSl7Zm9yKHZhciBiPTAsYz1hLmxlbmd0aDtiPGM7YisrKWFbYl09XG5UYihhW2JdLHskJGlzb2xhdGVTY29wZTohMH0pfWZ1bmN0aW9uIFQoYixlLGcsZixrLG4scil7aWYoZT09PWspcmV0dXJuIG51bGw7az1udWxsO2lmKGMuaGFzT3duUHJvcGVydHkoZSkpe3ZhciBwO2U9YS5nZXQoZStkKTtmb3IodmFyIHo9MCx1PWUubGVuZ3RoO3o8dTt6KyspdHJ5e3A9ZVt6XSwoZj09PXN8fGY+cC5wcmlvcml0eSkmJi0xIT1wLnJlc3RyaWN0LmluZGV4T2YoZykmJihuJiYocD1UYihwLHskJHN0YXJ0Om4sJCRlbmQ6cn0pKSxiLnB1c2gocCksaz1wKX1jYXRjaChGKXttKEYpfX1yZXR1cm4ga31mdW5jdGlvbiBCKGEsYil7dmFyIGM9Yi4kYXR0cixkPWEuJGF0dHIsZT1hLiQkZWxlbWVudDtxKGEsZnVuY3Rpb24oZCxlKXtcIiRcIiE9ZS5jaGFyQXQoMCkmJihiW2VdJiYoZCs9KFwic3R5bGVcIj09PWU/XCI7XCI6XCIgXCIpK2JbZV0pLGEuJHNldChlLGQsITAsY1tlXSkpfSk7cShiLGZ1bmN0aW9uKGIsZyl7XCJjbGFzc1wiPT1nPyhtYShlLGIpLGFbXCJjbGFzc1wiXT0oYVtcImNsYXNzXCJdP1xuYVtcImNsYXNzXCJdK1wiIFwiOlwiXCIpK2IpOlwic3R5bGVcIj09Zz8oZS5hdHRyKFwic3R5bGVcIixlLmF0dHIoXCJzdHlsZVwiKStcIjtcIitiKSxhLnN0eWxlPShhLnN0eWxlP2Euc3R5bGUrXCI7XCI6XCJcIikrYik6XCIkXCI9PWcuY2hhckF0KDApfHxhLmhhc093blByb3BlcnR5KGcpfHwoYVtnXT1iLGRbZ109Y1tnXSl9KX1mdW5jdGlvbiBDKGEsYixjLGQsZSxnLGYsbCl7dmFyIGs9W10sbSxyLHo9YlswXSx1PWEuc2hpZnQoKSxGPUQoe30sdSx7dGVtcGxhdGVVcmw6bnVsbCx0cmFuc2NsdWRlOm51bGwscmVwbGFjZTpudWxsLCQkb3JpZ2luYWxEaXJlY3RpdmU6dX0pLHg9UCh1LnRlbXBsYXRlVXJsKT91LnRlbXBsYXRlVXJsKGIsYyk6dS50ZW1wbGF0ZVVybDtiLmVtcHR5KCk7bi5nZXQodi5nZXRUcnVzdGVkUmVzb3VyY2VVcmwoeCkse2NhY2hlOnB9KS5zdWNjZXNzKGZ1bmN0aW9uKG4pe3ZhciBwLEo7bj1ZKG4pO2lmKHUucmVwbGFjZSl7bj1DYi50ZXN0KG4pP3kobik6W107cD1uWzBdO2lmKDEhPW4ubGVuZ3RofHxcbjEhPT1wLm5vZGVUeXBlKXRocm93IGphKFwidHBscnRcIix1Lm5hbWUseCk7bj17JGF0dHI6e319O21iKGQsYixwKTt2YXIgdj1kYShwLFtdLG4pO1godS5zY29wZSkmJnBjKHYpO2E9di5jb25jYXQoYSk7QihjLG4pfWVsc2UgcD16LGIuaHRtbChuKTthLnVuc2hpZnQoRik7bT1pYShhLHAsYyxlLGIsdSxnLGYsbCk7cShkLGZ1bmN0aW9uKGEsYyl7YT09cCYmKGRbY109YlswXSl9KTtmb3Iocj1MKGJbMF0uY2hpbGROb2RlcyxlKTtrLmxlbmd0aDspe249ay5zaGlmdCgpO0o9ay5zaGlmdCgpO3ZhciBBPWsuc2hpZnQoKSxSPWsuc2hpZnQoKSx2PWJbMF07aWYoSiE9PXope3ZhciBIPUouY2xhc3NOYW1lO2wuaGFzRWxlbWVudFRyYW5zY2x1ZGVEaXJlY3RpdmUmJnUucmVwbGFjZXx8KHY9RWIocCkpO21iKEEseShKKSx2KTttYSh5KHYpLEgpfUo9bS50cmFuc2NsdWRlP1EobixtLnRyYW5zY2x1ZGUpOlI7bShyLG4sdixkLEopfWs9bnVsbH0pLmVycm9yKGZ1bmN0aW9uKGEsYixjLGQpe3Rocm93IGphKFwidHBsb2FkXCIsXG5kLnVybCk7fSk7cmV0dXJuIGZ1bmN0aW9uKGEsYixjLGQsZSl7az8oay5wdXNoKGIpLGsucHVzaChjKSxrLnB1c2goZCksay5wdXNoKGUpKTptKHIsYixjLGQsZSl9fWZ1bmN0aW9uIEUoYSxiKXt2YXIgYz1iLnByaW9yaXR5LWEucHJpb3JpdHk7cmV0dXJuIDAhPT1jP2M6YS5uYW1lIT09Yi5uYW1lP2EubmFtZTxiLm5hbWU/LTE6MTphLmluZGV4LWIuaW5kZXh9ZnVuY3Rpb24gSyhhLGIsYyxkKXtpZihiKXRocm93IGphKFwibXVsdGlkaXJcIixiLm5hbWUsYy5uYW1lLGEsaGEoZCkpO31mdW5jdGlvbiB0KGEsYyl7dmFyIGQ9YihjLCEwKTtkJiZhLnB1c2goe3ByaW9yaXR5OjAsY29tcGlsZTphYShmdW5jdGlvbihhLGIpe3ZhciBjPWIucGFyZW50KCksZT1jLmRhdGEoXCIkYmluZGluZ1wiKXx8W107ZS5wdXNoKGQpO21hKGMuZGF0YShcIiRiaW5kaW5nXCIsZSksXCJuZy1iaW5kaW5nXCIpO2EuJHdhdGNoKGQsZnVuY3Rpb24oYSl7YlswXS5ub2RlVmFsdWU9YX0pfSl9KX1mdW5jdGlvbiBPKGEsYil7aWYoXCJzcmNkb2NcIj09XG5iKXJldHVybiB2LkhUTUw7dmFyIGM9S2EoYSk7aWYoXCJ4bGlua0hyZWZcIj09Ynx8XCJGT1JNXCI9PWMmJlwiYWN0aW9uXCI9PWJ8fFwiSU1HXCIhPWMmJihcInNyY1wiPT1ifHxcIm5nU3JjXCI9PWIpKXJldHVybiB2LlJFU09VUkNFX1VSTH1mdW5jdGlvbiBOKGEsYyxkLGUpe3ZhciBnPWIoZCwhMCk7aWYoZyl7aWYoXCJtdWx0aXBsZVwiPT09ZSYmXCJTRUxFQ1RcIj09PUthKGEpKXRocm93IGphKFwic2VsbXVsdGlcIixoYShhKSk7Yy5wdXNoKHtwcmlvcml0eToxMDAsY29tcGlsZTpmdW5jdGlvbigpe3JldHVybntwcmU6ZnVuY3Rpb24oYyxkLGwpe2Q9bC4kJG9ic2VydmVyc3x8KGwuJCRvYnNlcnZlcnM9e30pO2lmKGYudGVzdChlKSl0aHJvdyBqYShcIm5vZG9tZXZlbnRzXCIpO2lmKGc9YihsW2VdLCEwLE8oYSxlKSkpbFtlXT1nKGMpLChkW2VdfHwoZFtlXT1bXSkpLiQkaW50ZXI9ITAsKGwuJCRvYnNlcnZlcnMmJmwuJCRvYnNlcnZlcnNbZV0uJCRzY29wZXx8YykuJHdhdGNoKGcsZnVuY3Rpb24oYSxiKXtcImNsYXNzXCI9PT1cbmUmJmEhPWI/bC4kdXBkYXRlQ2xhc3MoYSxiKTpsLiRzZXQoZSxhKX0pfX19fSl9fWZ1bmN0aW9uIG1iKGEsYixjKXt2YXIgZD1iWzBdLGU9Yi5sZW5ndGgsZz1kLnBhcmVudE5vZGUsZixsO2lmKGEpZm9yKGY9MCxsPWEubGVuZ3RoO2Y8bDtmKyspaWYoYVtmXT09ZCl7YVtmKytdPWM7bD1mK2UtMTtmb3IodmFyIGs9YS5sZW5ndGg7ZjxrO2YrKyxsKyspbDxrP2FbZl09YVtsXTpkZWxldGUgYVtmXTthLmxlbmd0aC09ZS0xO2JyZWFrfWcmJmcucmVwbGFjZUNoaWxkKGMsZCk7YT1VLmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTthLmFwcGVuZENoaWxkKGQpO2NbeS5leHBhbmRvXT1kW3kuZXhwYW5kb107ZD0xO2ZvcihlPWIubGVuZ3RoO2Q8ZTtkKyspZz1iW2RdLHkoZykucmVtb3ZlKCksYS5hcHBlbmRDaGlsZChnKSxkZWxldGUgYltkXTtiWzBdPWM7Yi5sZW5ndGg9MX1mdW5jdGlvbiBxYyhhLGIpe3JldHVybiBEKGZ1bmN0aW9uKCl7cmV0dXJuIGEuYXBwbHkobnVsbCxhcmd1bWVudHMpfSxcbmEsYil9dmFyIEhiPWZ1bmN0aW9uKGEsYil7dGhpcy4kJGVsZW1lbnQ9YTt0aGlzLiRhdHRyPWJ8fHt9fTtIYi5wcm90b3R5cGU9eyRub3JtYWxpemU6bmEsJGFkZENsYXNzOmZ1bmN0aW9uKGEpe2EmJjA8YS5sZW5ndGgmJkouYWRkQ2xhc3ModGhpcy4kJGVsZW1lbnQsYSl9LCRyZW1vdmVDbGFzczpmdW5jdGlvbihhKXthJiYwPGEubGVuZ3RoJiZKLnJlbW92ZUNsYXNzKHRoaXMuJCRlbGVtZW50LGEpfSwkdXBkYXRlQ2xhc3M6ZnVuY3Rpb24oYSxiKXt2YXIgYz1yYyhhLGIpLGQ9cmMoYixhKTswPT09Yy5sZW5ndGg/Si5yZW1vdmVDbGFzcyh0aGlzLiQkZWxlbWVudCxkKTowPT09ZC5sZW5ndGg/Si5hZGRDbGFzcyh0aGlzLiQkZWxlbWVudCxjKTpKLnNldENsYXNzKHRoaXMuJCRlbGVtZW50LGMsZCl9LCRzZXQ6ZnVuY3Rpb24oYSxiLGMsZCl7dmFyIGU9bWModGhpcy4kJGVsZW1lbnRbMF0sYSk7ZSYmKHRoaXMuJCRlbGVtZW50LnByb3AoYSxiKSxkPWUpO3RoaXNbYV09YjtkP3RoaXMuJGF0dHJbYV09XG5kOihkPXRoaXMuJGF0dHJbYV0pfHwodGhpcy4kYXR0clthXT1kPWZiKGEsXCItXCIpKTtlPUthKHRoaXMuJCRlbGVtZW50KTtpZihcIkFcIj09PWUmJlwiaHJlZlwiPT09YXx8XCJJTUdcIj09PWUmJlwic3JjXCI9PT1hKXRoaXNbYV09Yj1BKGIsXCJzcmNcIj09PWEpOyExIT09YyYmKG51bGw9PT1ifHxiPT09cz90aGlzLiQkZWxlbWVudC5yZW1vdmVBdHRyKGQpOnRoaXMuJCRlbGVtZW50LmF0dHIoZCxiKSk7KGM9dGhpcy4kJG9ic2VydmVycykmJnEoY1thXSxmdW5jdGlvbihhKXt0cnl7YShiKX1jYXRjaChjKXttKGMpfX0pfSwkb2JzZXJ2ZTpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMsZD1jLiQkb2JzZXJ2ZXJzfHwoYy4kJG9ic2VydmVycz17fSksZT1kW2FdfHwoZFthXT1bXSk7ZS5wdXNoKGIpO3UuJGV2YWxBc3luYyhmdW5jdGlvbigpe2UuJCRpbnRlcnx8YihjW2FdKX0pO3JldHVybiBifX07dmFyIFo9Yi5zdGFydFN5bWJvbCgpLHJhPWIuZW5kU3ltYm9sKCksWT1cInt7XCI9PVp8fFwifX1cIj09cmE/XG5EYTpmdW5jdGlvbihhKXtyZXR1cm4gYS5yZXBsYWNlKC9cXHtcXHsvZyxaKS5yZXBsYWNlKC99fS9nLHJhKX0sVz0vXm5nQXR0cltBLVpdLztyZXR1cm4geH1dfWZ1bmN0aW9uIG5hKGIpe3JldHVybiBUYShiLnJlcGxhY2UodGUsXCJcIikpfWZ1bmN0aW9uIHJjKGIsYSl7dmFyIGM9XCJcIixkPWIuc3BsaXQoL1xccysvKSxlPWEuc3BsaXQoL1xccysvKSxnPTA7YTpmb3IoO2c8ZC5sZW5ndGg7ZysrKXtmb3IodmFyIGY9ZFtnXSxoPTA7aDxlLmxlbmd0aDtoKyspaWYoZj09ZVtoXSljb250aW51ZSBhO2MrPSgwPGMubGVuZ3RoP1wiIFwiOlwiXCIpK2Z9cmV0dXJuIGN9ZnVuY3Rpb24gT2QoKXt2YXIgYj17fSxhPS9eKFxcUyspKFxccythc1xccysoXFx3KykpPyQvO3RoaXMucmVnaXN0ZXI9ZnVuY3Rpb24oYSxkKXtBYShhLFwiY29udHJvbGxlclwiKTtYKGEpP0QoYixhKTpiW2FdPWR9O3RoaXMuJGdldD1bXCIkaW5qZWN0b3JcIixcIiR3aW5kb3dcIixmdW5jdGlvbihjLGQpe3JldHVybiBmdW5jdGlvbihlLGcpe3ZhciBmLFxuaCxsO3coZSkmJihmPWUubWF0Y2goYSksaD1mWzFdLGw9ZlszXSxlPWIuaGFzT3duUHJvcGVydHkoaCk/YltoXTpiYyhnLiRzY29wZSxoLCEwKXx8YmMoZCxoLCEwKSxSYShlLGgsITApKTtmPWMuaW5zdGFudGlhdGUoZSxnKTtpZihsKXtpZighZ3x8XCJvYmplY3RcIiE9dHlwZW9mIGcuJHNjb3BlKXRocm93IHQoXCIkY29udHJvbGxlclwiKShcIm5vc2NwXCIsaHx8ZS5uYW1lLGwpO2cuJHNjb3BlW2xdPWZ9cmV0dXJuIGZ9fV19ZnVuY3Rpb24gUGQoKXt0aGlzLiRnZXQ9W1wiJHdpbmRvd1wiLGZ1bmN0aW9uKGIpe3JldHVybiB5KGIuZG9jdW1lbnQpfV19ZnVuY3Rpb24gUWQoKXt0aGlzLiRnZXQ9W1wiJGxvZ1wiLGZ1bmN0aW9uKGIpe3JldHVybiBmdW5jdGlvbihhLGMpe2IuZXJyb3IuYXBwbHkoYixhcmd1bWVudHMpfX1dfWZ1bmN0aW9uIHNjKGIpe3ZhciBhPXt9LGMsZCxlO2lmKCFiKXJldHVybiBhO3EoYi5zcGxpdChcIlxcblwiKSxmdW5jdGlvbihiKXtlPWIuaW5kZXhPZihcIjpcIik7Yz1LKGNhKGIuc3Vic3RyKDAsXG5lKSkpO2Q9Y2EoYi5zdWJzdHIoZSsxKSk7YyYmKGFbY109YVtjXT9hW2NdKyhcIiwgXCIrZCk6ZCl9KTtyZXR1cm4gYX1mdW5jdGlvbiB0YyhiKXt2YXIgYT1YKGIpP2I6cztyZXR1cm4gZnVuY3Rpb24oYyl7YXx8KGE9c2MoYikpO3JldHVybiBjP2FbSyhjKV18fG51bGw6YX19ZnVuY3Rpb24gdWMoYixhLGMpe2lmKFAoYykpcmV0dXJuIGMoYixhKTtxKGMsZnVuY3Rpb24oYyl7Yj1jKGIsYSl9KTtyZXR1cm4gYn1mdW5jdGlvbiBUZCgpe3ZhciBiPS9eXFxzKihcXFt8XFx7W15cXHtdKS8sYT0vW1xcfVxcXV1cXHMqJC8sYz0vXlxcKVxcXVxcfScsP1xcbi8sZD17XCJDb250ZW50LVR5cGVcIjpcImFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOFwifSxlPXRoaXMuZGVmYXVsdHM9e3RyYW5zZm9ybVJlc3BvbnNlOltmdW5jdGlvbihkKXt3KGQpJiYoZD1kLnJlcGxhY2UoYyxcIlwiKSxiLnRlc3QoZCkmJmEudGVzdChkKSYmKGQ9V2IoZCkpKTtyZXR1cm4gZH1dLHRyYW5zZm9ybVJlcXVlc3Q6W2Z1bmN0aW9uKGEpe3JldHVybiBYKGEpJiZcblwiW29iamVjdCBGaWxlXVwiIT09d2EuY2FsbChhKSYmXCJbb2JqZWN0IEJsb2JdXCIhPT13YS5jYWxsKGEpP3FhKGEpOmF9XSxoZWFkZXJzOntjb21tb246e0FjY2VwdDpcImFwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKlwifSxwb3N0OmJhKGQpLHB1dDpiYShkKSxwYXRjaDpiYShkKX0seHNyZkNvb2tpZU5hbWU6XCJYU1JGLVRPS0VOXCIseHNyZkhlYWRlck5hbWU6XCJYLVhTUkYtVE9LRU5cIn0sZz10aGlzLmludGVyY2VwdG9ycz1bXSxmPXRoaXMucmVzcG9uc2VJbnRlcmNlcHRvcnM9W107dGhpcy4kZ2V0PVtcIiRodHRwQmFja2VuZFwiLFwiJGJyb3dzZXJcIixcIiRjYWNoZUZhY3RvcnlcIixcIiRyb290U2NvcGVcIixcIiRxXCIsXCIkaW5qZWN0b3JcIixmdW5jdGlvbihhLGIsYyxkLG4scCl7ZnVuY3Rpb24gcihhKXtmdW5jdGlvbiBjKGEpe3ZhciBiPUQoe30sYSx7ZGF0YTp1YyhhLmRhdGEsYS5oZWFkZXJzLGQudHJhbnNmb3JtUmVzcG9uc2UpfSk7cmV0dXJuIDIwMDw9YS5zdGF0dXMmJjMwMD5hLnN0YXR1cz9cbmI6bi5yZWplY3QoYil9dmFyIGQ9e21ldGhvZDpcImdldFwiLHRyYW5zZm9ybVJlcXVlc3Q6ZS50cmFuc2Zvcm1SZXF1ZXN0LHRyYW5zZm9ybVJlc3BvbnNlOmUudHJhbnNmb3JtUmVzcG9uc2V9LGc9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihhKXt2YXIgYztxKGEsZnVuY3Rpb24oYixkKXtQKGIpJiYoYz1iKCksbnVsbCE9Yz9hW2RdPWM6ZGVsZXRlIGFbZF0pfSl9dmFyIGM9ZS5oZWFkZXJzLGQ9RCh7fSxhLmhlYWRlcnMpLGcsZixjPUQoe30sYy5jb21tb24sY1tLKGEubWV0aG9kKV0pO2IoYyk7YihkKTthOmZvcihnIGluIGMpe2E9SyhnKTtmb3IoZiBpbiBkKWlmKEsoZik9PT1hKWNvbnRpbnVlIGE7ZFtnXT1jW2ddfXJldHVybiBkfShhKTtEKGQsYSk7ZC5oZWFkZXJzPWc7ZC5tZXRob2Q9RmEoZC5tZXRob2QpOyhhPUliKGQudXJsKT9iLmNvb2tpZXMoKVtkLnhzcmZDb29raWVOYW1lfHxlLnhzcmZDb29raWVOYW1lXTpzKSYmKGdbZC54c3JmSGVhZGVyTmFtZXx8ZS54c3JmSGVhZGVyTmFtZV09XG5hKTt2YXIgZj1bZnVuY3Rpb24oYSl7Zz1hLmhlYWRlcnM7dmFyIGI9dWMoYS5kYXRhLHRjKGcpLGEudHJhbnNmb3JtUmVxdWVzdCk7RShhLmRhdGEpJiZxKGcsZnVuY3Rpb24oYSxiKXtcImNvbnRlbnQtdHlwZVwiPT09SyhiKSYmZGVsZXRlIGdbYl19KTtFKGEud2l0aENyZWRlbnRpYWxzKSYmIUUoZS53aXRoQ3JlZGVudGlhbHMpJiYoYS53aXRoQ3JlZGVudGlhbHM9ZS53aXRoQ3JlZGVudGlhbHMpO3JldHVybiB6KGEsYixnKS50aGVuKGMsYyl9LHNdLGg9bi53aGVuKGQpO2ZvcihxKHYsZnVuY3Rpb24oYSl7KGEucmVxdWVzdHx8YS5yZXF1ZXN0RXJyb3IpJiZmLnVuc2hpZnQoYS5yZXF1ZXN0LGEucmVxdWVzdEVycm9yKTsoYS5yZXNwb25zZXx8YS5yZXNwb25zZUVycm9yKSYmZi5wdXNoKGEucmVzcG9uc2UsYS5yZXNwb25zZUVycm9yKX0pO2YubGVuZ3RoOyl7YT1mLnNoaWZ0KCk7dmFyIGs9Zi5zaGlmdCgpLGg9aC50aGVuKGEsayl9aC5zdWNjZXNzPWZ1bmN0aW9uKGEpe2gudGhlbihmdW5jdGlvbihiKXthKGIuZGF0YSxcbmIuc3RhdHVzLGIuaGVhZGVycyxkKX0pO3JldHVybiBofTtoLmVycm9yPWZ1bmN0aW9uKGEpe2gudGhlbihudWxsLGZ1bmN0aW9uKGIpe2EoYi5kYXRhLGIuc3RhdHVzLGIuaGVhZGVycyxkKX0pO3JldHVybiBofTtyZXR1cm4gaH1mdW5jdGlvbiB6KGIsYyxnKXtmdW5jdGlvbiBmKGEsYixjLGUpe3YmJigyMDA8PWEmJjMwMD5hP3YucHV0KHMsW2EsYixzYyhjKSxlXSk6di5yZW1vdmUocykpO2woYixhLGMsZSk7ZC4kJHBoYXNlfHxkLiRhcHBseSgpfWZ1bmN0aW9uIGwoYSxjLGQsZSl7Yz1NYXRoLm1heChjLDApOygyMDA8PWMmJjMwMD5jP3AucmVzb2x2ZTpwLnJlamVjdCkoe2RhdGE6YSxzdGF0dXM6YyxoZWFkZXJzOnRjKGQpLGNvbmZpZzpiLHN0YXR1c1RleHQ6ZX0pfWZ1bmN0aW9uIGsoKXt2YXIgYT1kYihyLnBlbmRpbmdSZXF1ZXN0cyxiKTstMSE9PWEmJnIucGVuZGluZ1JlcXVlc3RzLnNwbGljZShhLDEpfXZhciBwPW4uZGVmZXIoKSx6PXAucHJvbWlzZSx2LHEscz11KGIudXJsLFxuYi5wYXJhbXMpO3IucGVuZGluZ1JlcXVlc3RzLnB1c2goYik7ei50aGVuKGssayk7KGIuY2FjaGV8fGUuY2FjaGUpJiYoITEhPT1iLmNhY2hlJiZcIkdFVFwiPT1iLm1ldGhvZCkmJih2PVgoYi5jYWNoZSk/Yi5jYWNoZTpYKGUuY2FjaGUpP2UuY2FjaGU6Rik7aWYodilpZihxPXYuZ2V0KHMpLEIocSkpe2lmKHEudGhlbilyZXR1cm4gcS50aGVuKGssaykscTtNKHEpP2wocVsxXSxxWzBdLGJhKHFbMl0pLHFbM10pOmwocSwyMDAse30sXCJPS1wiKX1lbHNlIHYucHV0KHMseik7RShxKSYmYShiLm1ldGhvZCxzLGMsZixnLGIudGltZW91dCxiLndpdGhDcmVkZW50aWFscyxiLnJlc3BvbnNlVHlwZSk7cmV0dXJuIHp9ZnVuY3Rpb24gdShhLGIpe2lmKCFiKXJldHVybiBhO3ZhciBjPVtdO1NjKGIsZnVuY3Rpb24oYSxiKXtudWxsPT09YXx8RShhKXx8KE0oYSl8fChhPVthXSkscShhLGZ1bmN0aW9uKGEpe1goYSkmJihhPXFhKGEpKTtjLnB1c2goemEoYikrXCI9XCIremEoYSkpfSkpfSk7MDxjLmxlbmd0aCYmXG4oYSs9KC0xPT1hLmluZGV4T2YoXCI/XCIpP1wiP1wiOlwiJlwiKStjLmpvaW4oXCImXCIpKTtyZXR1cm4gYX12YXIgRj1jKFwiJGh0dHBcIiksdj1bXTtxKGcsZnVuY3Rpb24oYSl7di51bnNoaWZ0KHcoYSk/cC5nZXQoYSk6cC5pbnZva2UoYSkpfSk7cShmLGZ1bmN0aW9uKGEsYil7dmFyIGM9dyhhKT9wLmdldChhKTpwLmludm9rZShhKTt2LnNwbGljZShiLDAse3Jlc3BvbnNlOmZ1bmN0aW9uKGEpe3JldHVybiBjKG4ud2hlbihhKSl9LHJlc3BvbnNlRXJyb3I6ZnVuY3Rpb24oYSl7cmV0dXJuIGMobi5yZWplY3QoYSkpfX0pfSk7ci5wZW5kaW5nUmVxdWVzdHM9W107KGZ1bmN0aW9uKGEpe3EoYXJndW1lbnRzLGZ1bmN0aW9uKGEpe3JbYV09ZnVuY3Rpb24oYixjKXtyZXR1cm4gcihEKGN8fHt9LHttZXRob2Q6YSx1cmw6Yn0pKX19KX0pKFwiZ2V0XCIsXCJkZWxldGVcIixcImhlYWRcIixcImpzb25wXCIpOyhmdW5jdGlvbihhKXtxKGFyZ3VtZW50cyxmdW5jdGlvbihhKXtyW2FdPWZ1bmN0aW9uKGIsYyxkKXtyZXR1cm4gcihEKGR8fFxue30se21ldGhvZDphLHVybDpiLGRhdGE6Y30pKX19KX0pKFwicG9zdFwiLFwicHV0XCIpO3IuZGVmYXVsdHM9ZTtyZXR1cm4gcn1dfWZ1bmN0aW9uIHVlKGIpe2lmKDg+PVMmJighYi5tYXRjaCgvXihnZXR8cG9zdHxoZWFkfHB1dHxkZWxldGV8b3B0aW9ucykkL2kpfHwhTy5YTUxIdHRwUmVxdWVzdCkpcmV0dXJuIG5ldyBPLkFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtpZihPLlhNTEh0dHBSZXF1ZXN0KXJldHVybiBuZXcgTy5YTUxIdHRwUmVxdWVzdDt0aHJvdyB0KFwiJGh0dHBCYWNrZW5kXCIpKFwibm94aHJcIik7fWZ1bmN0aW9uIFVkKCl7dGhpcy4kZ2V0PVtcIiRicm93c2VyXCIsXCIkd2luZG93XCIsXCIkZG9jdW1lbnRcIixmdW5jdGlvbihiLGEsYyl7cmV0dXJuIHZlKGIsdWUsYi5kZWZlcixhLmFuZ3VsYXIuY2FsbGJhY2tzLGNbMF0pfV19ZnVuY3Rpb24gdmUoYixhLGMsZCxlKXtmdW5jdGlvbiBnKGEsYil7dmFyIGM9ZS5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLGQ9ZnVuY3Rpb24oKXtjLm9ucmVhZHlzdGF0ZWNoYW5nZT1cbmMub25sb2FkPWMub25lcnJvcj1udWxsO2UuYm9keS5yZW1vdmVDaGlsZChjKTtiJiZiKCl9O2MudHlwZT1cInRleHQvamF2YXNjcmlwdFwiO2Muc3JjPWE7UyYmOD49Uz9jLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpey9sb2FkZWR8Y29tcGxldGUvLnRlc3QoYy5yZWFkeVN0YXRlKSYmZCgpfTpjLm9ubG9hZD1jLm9uZXJyb3I9ZnVuY3Rpb24oKXtkKCl9O2UuYm9keS5hcHBlbmRDaGlsZChjKTtyZXR1cm4gZH12YXIgZj0tMTtyZXR1cm4gZnVuY3Rpb24oZSxsLGssbSxuLHAscix6KXtmdW5jdGlvbiB1KCl7dj1mO0EmJkEoKTt4JiZ4LmFib3J0KCl9ZnVuY3Rpb24gRihhLGQsZSxnLGYpe0wmJmMuY2FuY2VsKEwpO0E9eD1udWxsOzA9PT1kJiYoZD1lPzIwMDpcImZpbGVcIj09c2EobCkucHJvdG9jb2w/NDA0OjApO2EoMTIyMz09PWQ/MjA0OmQsZSxnLGZ8fFwiXCIpO2IuJCRjb21wbGV0ZU91dHN0YW5kaW5nUmVxdWVzdChDKX12YXIgdjtiLiQkaW5jT3V0c3RhbmRpbmdSZXF1ZXN0Q291bnQoKTtcbmw9bHx8Yi51cmwoKTtpZihcImpzb25wXCI9PUsoZSkpe3ZhciBKPVwiX1wiKyhkLmNvdW50ZXIrKykudG9TdHJpbmcoMzYpO2RbSl09ZnVuY3Rpb24oYSl7ZFtKXS5kYXRhPWF9O3ZhciBBPWcobC5yZXBsYWNlKFwiSlNPTl9DQUxMQkFDS1wiLFwiYW5ndWxhci5jYWxsYmFja3MuXCIrSiksZnVuY3Rpb24oKXtkW0pdLmRhdGE/RihtLDIwMCxkW0pdLmRhdGEpOkYobSx2fHwtMik7ZFtKXT1FYS5ub29wfSl9ZWxzZXt2YXIgeD1hKGUpO3gub3BlbihlLGwsITApO3EobixmdW5jdGlvbihhLGIpe0IoYSkmJnguc2V0UmVxdWVzdEhlYWRlcihiLGEpfSk7eC5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtpZih4JiY0PT14LnJlYWR5U3RhdGUpe3ZhciBhPW51bGwsYj1udWxsO3YhPT1mJiYoYT14LmdldEFsbFJlc3BvbnNlSGVhZGVycygpLGI9XCJyZXNwb25zZVwiaW4geD94LnJlc3BvbnNlOngucmVzcG9uc2VUZXh0KTtGKG0sdnx8eC5zdGF0dXMsYixhLHguc3RhdHVzVGV4dHx8XCJcIil9fTtyJiYoeC53aXRoQ3JlZGVudGlhbHM9XG4hMCk7aWYoeil0cnl7eC5yZXNwb25zZVR5cGU9en1jYXRjaChzKXtpZihcImpzb25cIiE9PXopdGhyb3cgczt9eC5zZW5kKGt8fG51bGwpfWlmKDA8cCl2YXIgTD1jKHUscCk7ZWxzZSBwJiZwLnRoZW4mJnAudGhlbih1KX19ZnVuY3Rpb24gUmQoKXt2YXIgYj1cInt7XCIsYT1cIn19XCI7dGhpcy5zdGFydFN5bWJvbD1mdW5jdGlvbihhKXtyZXR1cm4gYT8oYj1hLHRoaXMpOmJ9O3RoaXMuZW5kU3ltYm9sPWZ1bmN0aW9uKGIpe3JldHVybiBiPyhhPWIsdGhpcyk6YX07dGhpcy4kZ2V0PVtcIiRwYXJzZVwiLFwiJGV4Y2VwdGlvbkhhbmRsZXJcIixcIiRzY2VcIixmdW5jdGlvbihjLGQsZSl7ZnVuY3Rpb24gZyhnLGssbSl7Zm9yKHZhciBuLHAscj0wLHo9W10sdT1nLmxlbmd0aCxGPSExLHY9W107cjx1OyktMSE9KG49Zy5pbmRleE9mKGIscikpJiYtMSE9KHA9Zy5pbmRleE9mKGEsbitmKSk/KHIhPW4mJnoucHVzaChnLnN1YnN0cmluZyhyLG4pKSx6LnB1c2gocj1jKEY9Zy5zdWJzdHJpbmcobitmLHApKSksXG5yLmV4cD1GLHI9cCtoLEY9ITApOihyIT11JiZ6LnB1c2goZy5zdWJzdHJpbmcocikpLHI9dSk7KHU9ei5sZW5ndGgpfHwoei5wdXNoKFwiXCIpLHU9MSk7aWYobSYmMTx6Lmxlbmd0aCl0aHJvdyB2YyhcIm5vY29uY2F0XCIsZyk7aWYoIWt8fEYpcmV0dXJuIHYubGVuZ3RoPXUscj1mdW5jdGlvbihhKXt0cnl7Zm9yKHZhciBiPTAsYz11LGY7YjxjO2IrKylcImZ1bmN0aW9uXCI9PXR5cGVvZihmPXpbYl0pJiYoZj1mKGEpLGY9bT9lLmdldFRydXN0ZWQobSxmKTplLnZhbHVlT2YoZiksbnVsbD09PWZ8fEUoZik/Zj1cIlwiOlwic3RyaW5nXCIhPXR5cGVvZiBmJiYoZj1xYShmKSkpLHZbYl09ZjtyZXR1cm4gdi5qb2luKFwiXCIpfWNhdGNoKGgpe2E9dmMoXCJpbnRlcnJcIixnLGgudG9TdHJpbmcoKSksZChhKX19LHIuZXhwPWcsci5wYXJ0cz16LHJ9dmFyIGY9Yi5sZW5ndGgsaD1hLmxlbmd0aDtnLnN0YXJ0U3ltYm9sPWZ1bmN0aW9uKCl7cmV0dXJuIGJ9O2cuZW5kU3ltYm9sPWZ1bmN0aW9uKCl7cmV0dXJuIGF9O1xucmV0dXJuIGd9XX1mdW5jdGlvbiBTZCgpe3RoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkd2luZG93XCIsXCIkcVwiLGZ1bmN0aW9uKGIsYSxjKXtmdW5jdGlvbiBkKGQsZixoLGwpe3ZhciBrPWEuc2V0SW50ZXJ2YWwsbT1hLmNsZWFySW50ZXJ2YWwsbj1jLmRlZmVyKCkscD1uLnByb21pc2Uscj0wLHo9QihsKSYmIWw7aD1CKGgpP2g6MDtwLnRoZW4obnVsbCxudWxsLGQpO3AuJCRpbnRlcnZhbElkPWsoZnVuY3Rpb24oKXtuLm5vdGlmeShyKyspOzA8aCYmcj49aCYmKG4ucmVzb2x2ZShyKSxtKHAuJCRpbnRlcnZhbElkKSxkZWxldGUgZVtwLiQkaW50ZXJ2YWxJZF0pO3p8fGIuJGFwcGx5KCl9LGYpO2VbcC4kJGludGVydmFsSWRdPW47cmV0dXJuIHB9dmFyIGU9e307ZC5jYW5jZWw9ZnVuY3Rpb24oYSl7cmV0dXJuIGEmJmEuJCRpbnRlcnZhbElkIGluIGU/KGVbYS4kJGludGVydmFsSWRdLnJlamVjdChcImNhbmNlbGVkXCIpLGNsZWFySW50ZXJ2YWwoYS4kJGludGVydmFsSWQpLGRlbGV0ZSBlW2EuJCRpbnRlcnZhbElkXSxcbiEwKTohMX07cmV0dXJuIGR9XX1mdW5jdGlvbiBhZCgpe3RoaXMuJGdldD1mdW5jdGlvbigpe3JldHVybntpZDpcImVuLXVzXCIsTlVNQkVSX0ZPUk1BVFM6e0RFQ0lNQUxfU0VQOlwiLlwiLEdST1VQX1NFUDpcIixcIixQQVRURVJOUzpbe21pbkludDoxLG1pbkZyYWM6MCxtYXhGcmFjOjMscG9zUHJlOlwiXCIscG9zU3VmOlwiXCIsbmVnUHJlOlwiLVwiLG5lZ1N1ZjpcIlwiLGdTaXplOjMsbGdTaXplOjN9LHttaW5JbnQ6MSxtaW5GcmFjOjIsbWF4RnJhYzoyLHBvc1ByZTpcIlxcdTAwYTRcIixwb3NTdWY6XCJcIixuZWdQcmU6XCIoXFx1MDBhNFwiLG5lZ1N1ZjpcIilcIixnU2l6ZTozLGxnU2l6ZTozfV0sQ1VSUkVOQ1lfU1lNOlwiJFwifSxEQVRFVElNRV9GT1JNQVRTOntNT05USDpcIkphbnVhcnkgRmVicnVhcnkgTWFyY2ggQXByaWwgTWF5IEp1bmUgSnVseSBBdWd1c3QgU2VwdGVtYmVyIE9jdG9iZXIgTm92ZW1iZXIgRGVjZW1iZXJcIi5zcGxpdChcIiBcIiksU0hPUlRNT05USDpcIkphbiBGZWIgTWFyIEFwciBNYXkgSnVuIEp1bCBBdWcgU2VwIE9jdCBOb3YgRGVjXCIuc3BsaXQoXCIgXCIpLFxuREFZOlwiU3VuZGF5IE1vbmRheSBUdWVzZGF5IFdlZG5lc2RheSBUaHVyc2RheSBGcmlkYXkgU2F0dXJkYXlcIi5zcGxpdChcIiBcIiksU0hPUlREQVk6XCJTdW4gTW9uIFR1ZSBXZWQgVGh1IEZyaSBTYXRcIi5zcGxpdChcIiBcIiksQU1QTVM6W1wiQU1cIixcIlBNXCJdLG1lZGl1bTpcIk1NTSBkLCB5IGg6bW06c3MgYVwiLFwic2hvcnRcIjpcIk0vZC95eSBoOm1tIGFcIixmdWxsRGF0ZTpcIkVFRUUsIE1NTU0gZCwgeVwiLGxvbmdEYXRlOlwiTU1NTSBkLCB5XCIsbWVkaXVtRGF0ZTpcIk1NTSBkLCB5XCIsc2hvcnREYXRlOlwiTS9kL3l5XCIsbWVkaXVtVGltZTpcImg6bW06c3MgYVwiLHNob3J0VGltZTpcImg6bW0gYVwifSxwbHVyYWxDYXQ6ZnVuY3Rpb24oYil7cmV0dXJuIDE9PT1iP1wib25lXCI6XCJvdGhlclwifX19fWZ1bmN0aW9uIHdjKGIpe2I9Yi5zcGxpdChcIi9cIik7Zm9yKHZhciBhPWIubGVuZ3RoO2EtLTspYlthXT13YihiW2FdKTtyZXR1cm4gYi5qb2luKFwiL1wiKX1mdW5jdGlvbiB4YyhiLGEsYyl7Yj1zYShiLGMpO2EuJCRwcm90b2NvbD1cbmIucHJvdG9jb2w7YS4kJGhvc3Q9Yi5ob3N0bmFtZTthLiQkcG9ydD1ZKGIucG9ydCl8fHdlW2IucHJvdG9jb2xdfHxudWxsfWZ1bmN0aW9uIHljKGIsYSxjKXt2YXIgZD1cIi9cIiE9PWIuY2hhckF0KDApO2QmJihiPVwiL1wiK2IpO2I9c2EoYixjKTthLiQkcGF0aD1kZWNvZGVVUklDb21wb25lbnQoZCYmXCIvXCI9PT1iLnBhdGhuYW1lLmNoYXJBdCgwKT9iLnBhdGhuYW1lLnN1YnN0cmluZygxKTpiLnBhdGhuYW1lKTthLiQkc2VhcmNoPVliKGIuc2VhcmNoKTthLiQkaGFzaD1kZWNvZGVVUklDb21wb25lbnQoYi5oYXNoKTthLiQkcGF0aCYmXCIvXCIhPWEuJCRwYXRoLmNoYXJBdCgwKSYmKGEuJCRwYXRoPVwiL1wiK2EuJCRwYXRoKX1mdW5jdGlvbiBvYShiLGEpe2lmKDA9PT1hLmluZGV4T2YoYikpcmV0dXJuIGEuc3Vic3RyKGIubGVuZ3RoKX1mdW5jdGlvbiBZYShiKXt2YXIgYT1iLmluZGV4T2YoXCIjXCIpO3JldHVybi0xPT1hP2I6Yi5zdWJzdHIoMCxhKX1mdW5jdGlvbiBKYihiKXtyZXR1cm4gYi5zdWJzdHIoMCxcbllhKGIpLmxhc3RJbmRleE9mKFwiL1wiKSsxKX1mdW5jdGlvbiB6YyhiLGEpe3RoaXMuJCRodG1sNT0hMDthPWF8fFwiXCI7dmFyIGM9SmIoYik7eGMoYix0aGlzLGIpO3RoaXMuJCRwYXJzZT1mdW5jdGlvbihhKXt2YXIgZT1vYShjLGEpO2lmKCF3KGUpKXRocm93IEtiKFwiaXB0aHByZnhcIixhLGMpO3ljKGUsdGhpcyxiKTt0aGlzLiQkcGF0aHx8KHRoaXMuJCRwYXRoPVwiL1wiKTt0aGlzLiQkY29tcG9zZSgpfTt0aGlzLiQkY29tcG9zZT1mdW5jdGlvbigpe3ZhciBhPVpiKHRoaXMuJCRzZWFyY2gpLGI9dGhpcy4kJGhhc2g/XCIjXCIrd2IodGhpcy4kJGhhc2gpOlwiXCI7dGhpcy4kJHVybD13Yyh0aGlzLiQkcGF0aCkrKGE/XCI/XCIrYTpcIlwiKStiO3RoaXMuJCRhYnNVcmw9Yyt0aGlzLiQkdXJsLnN1YnN0cigxKX07dGhpcy4kJHJld3JpdGU9ZnVuY3Rpb24oZCl7dmFyIGU7aWYoKGU9b2EoYixkKSkhPT1zKXJldHVybiBkPWUsKGU9b2EoYSxlKSkhPT1zP2MrKG9hKFwiL1wiLGUpfHxlKTpiK2Q7aWYoKGU9b2EoYyxcbmQpKSE9PXMpcmV0dXJuIGMrZTtpZihjPT1kK1wiL1wiKXJldHVybiBjfX1mdW5jdGlvbiBMYihiLGEpe3ZhciBjPUpiKGIpO3hjKGIsdGhpcyxiKTt0aGlzLiQkcGFyc2U9ZnVuY3Rpb24oZCl7dmFyIGU9b2EoYixkKXx8b2EoYyxkKSxlPVwiI1wiPT1lLmNoYXJBdCgwKT9vYShhLGUpOnRoaXMuJCRodG1sNT9lOlwiXCI7aWYoIXcoZSkpdGhyb3cgS2IoXCJpaHNocHJmeFwiLGQsYSk7eWMoZSx0aGlzLGIpO2Q9dGhpcy4kJHBhdGg7dmFyIGc9L15cXC8/Lio/OihcXC8uKikvOzA9PT1lLmluZGV4T2YoYikmJihlPWUucmVwbGFjZShiLFwiXCIpKTtnLmV4ZWMoZSl8fChkPShlPWcuZXhlYyhkKSk/ZVsxXTpkKTt0aGlzLiQkcGF0aD1kO3RoaXMuJCRjb21wb3NlKCl9O3RoaXMuJCRjb21wb3NlPWZ1bmN0aW9uKCl7dmFyIGM9WmIodGhpcy4kJHNlYXJjaCksZT10aGlzLiQkaGFzaD9cIiNcIit3Yih0aGlzLiQkaGFzaCk6XCJcIjt0aGlzLiQkdXJsPXdjKHRoaXMuJCRwYXRoKSsoYz9cIj9cIitjOlwiXCIpK2U7dGhpcy4kJGFic1VybD1cbmIrKHRoaXMuJCR1cmw/YSt0aGlzLiQkdXJsOlwiXCIpfTt0aGlzLiQkcmV3cml0ZT1mdW5jdGlvbihhKXtpZihZYShiKT09WWEoYSkpcmV0dXJuIGF9fWZ1bmN0aW9uIEFjKGIsYSl7dGhpcy4kJGh0bWw1PSEwO0xiLmFwcGx5KHRoaXMsYXJndW1lbnRzKTt2YXIgYz1KYihiKTt0aGlzLiQkcmV3cml0ZT1mdW5jdGlvbihkKXt2YXIgZTtpZihiPT1ZYShkKSlyZXR1cm4gZDtpZihlPW9hKGMsZCkpcmV0dXJuIGIrYStlO2lmKGM9PT1kK1wiL1wiKXJldHVybiBjfX1mdW5jdGlvbiBuYihiKXtyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gdGhpc1tiXX19ZnVuY3Rpb24gQmMoYixhKXtyZXR1cm4gZnVuY3Rpb24oYyl7aWYoRShjKSlyZXR1cm4gdGhpc1tiXTt0aGlzW2JdPWEoYyk7dGhpcy4kJGNvbXBvc2UoKTtyZXR1cm4gdGhpc319ZnVuY3Rpb24gVmQoKXt2YXIgYj1cIlwiLGE9ITE7dGhpcy5oYXNoUHJlZml4PWZ1bmN0aW9uKGEpe3JldHVybiBCKGEpPyhiPWEsdGhpcyk6Yn07dGhpcy5odG1sNU1vZGU9XG5mdW5jdGlvbihiKXtyZXR1cm4gQihiKT8oYT1iLHRoaXMpOmF9O3RoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkYnJvd3NlclwiLFwiJHNuaWZmZXJcIixcIiRyb290RWxlbWVudFwiLGZ1bmN0aW9uKGMsZCxlLGcpe2Z1bmN0aW9uIGYoYSl7Yy4kYnJvYWRjYXN0KFwiJGxvY2F0aW9uQ2hhbmdlU3VjY2Vzc1wiLGguYWJzVXJsKCksYSl9dmFyIGgsbD1kLmJhc2VIcmVmKCksaz1kLnVybCgpO2E/KGw9ay5zdWJzdHJpbmcoMCxrLmluZGV4T2YoXCIvXCIsay5pbmRleE9mKFwiLy9cIikrMikpKyhsfHxcIi9cIiksZT1lLmhpc3Rvcnk/emM6QWMpOihsPVlhKGspLGU9TGIpO2g9bmV3IGUobCxcIiNcIitiKTtoLiQkcGFyc2UoaC4kJHJld3JpdGUoaykpO2cub24oXCJjbGlja1wiLGZ1bmN0aW9uKGEpe2lmKCFhLmN0cmxLZXkmJiFhLm1ldGFLZXkmJjIhPWEud2hpY2gpe2Zvcih2YXIgYj15KGEudGFyZ2V0KTtcImFcIiE9PUsoYlswXS5ub2RlTmFtZSk7KWlmKGJbMF09PT1nWzBdfHwhKGI9Yi5wYXJlbnQoKSlbMF0pcmV0dXJuO1xudmFyIGU9Yi5wcm9wKFwiaHJlZlwiKTtYKGUpJiZcIltvYmplY3QgU1ZHQW5pbWF0ZWRTdHJpbmddXCI9PT1lLnRvU3RyaW5nKCkmJihlPXNhKGUuYW5pbVZhbCkuaHJlZik7dmFyIGY9aC4kJHJld3JpdGUoZSk7ZSYmKCFiLmF0dHIoXCJ0YXJnZXRcIikmJmYmJiFhLmlzRGVmYXVsdFByZXZlbnRlZCgpKSYmKGEucHJldmVudERlZmF1bHQoKSxmIT1kLnVybCgpJiYoaC4kJHBhcnNlKGYpLGMuJGFwcGx5KCksTy5hbmd1bGFyW1wiZmYtNjg0MjA4LXByZXZlbnREZWZhdWx0XCJdPSEwKSl9fSk7aC5hYnNVcmwoKSE9ayYmZC51cmwoaC5hYnNVcmwoKSwhMCk7ZC5vblVybENoYW5nZShmdW5jdGlvbihhKXtoLmFic1VybCgpIT1hJiYoYy4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7dmFyIGI9aC5hYnNVcmwoKTtoLiQkcGFyc2UoYSk7Yy4kYnJvYWRjYXN0KFwiJGxvY2F0aW9uQ2hhbmdlU3RhcnRcIixhLGIpLmRlZmF1bHRQcmV2ZW50ZWQ/KGguJCRwYXJzZShiKSxkLnVybChiKSk6ZihiKX0pLGMuJCRwaGFzZXx8XG5jLiRkaWdlc3QoKSl9KTt2YXIgbT0wO2MuJHdhdGNoKGZ1bmN0aW9uKCl7dmFyIGE9ZC51cmwoKSxiPWguJCRyZXBsYWNlO20mJmE9PWguYWJzVXJsKCl8fChtKyssYy4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7Yy4kYnJvYWRjYXN0KFwiJGxvY2F0aW9uQ2hhbmdlU3RhcnRcIixoLmFic1VybCgpLGEpLmRlZmF1bHRQcmV2ZW50ZWQ/aC4kJHBhcnNlKGEpOihkLnVybChoLmFic1VybCgpLGIpLGYoYSkpfSkpO2guJCRyZXBsYWNlPSExO3JldHVybiBtfSk7cmV0dXJuIGh9XX1mdW5jdGlvbiBXZCgpe3ZhciBiPSEwLGE9dGhpczt0aGlzLmRlYnVnRW5hYmxlZD1mdW5jdGlvbihhKXtyZXR1cm4gQihhKT8oYj1hLHRoaXMpOmJ9O3RoaXMuJGdldD1bXCIkd2luZG93XCIsZnVuY3Rpb24oYyl7ZnVuY3Rpb24gZChhKXthIGluc3RhbmNlb2YgRXJyb3ImJihhLnN0YWNrP2E9YS5tZXNzYWdlJiYtMT09PWEuc3RhY2suaW5kZXhPZihhLm1lc3NhZ2UpP1wiRXJyb3I6IFwiK2EubWVzc2FnZStcIlxcblwiK2Euc3RhY2s6XG5hLnN0YWNrOmEuc291cmNlVVJMJiYoYT1hLm1lc3NhZ2UrXCJcXG5cIithLnNvdXJjZVVSTCtcIjpcIithLmxpbmUpKTtyZXR1cm4gYX1mdW5jdGlvbiBlKGEpe3ZhciBiPWMuY29uc29sZXx8e30sZT1iW2FdfHxiLmxvZ3x8QzthPSExO3RyeXthPSEhZS5hcHBseX1jYXRjaChsKXt9cmV0dXJuIGE/ZnVuY3Rpb24oKXt2YXIgYT1bXTtxKGFyZ3VtZW50cyxmdW5jdGlvbihiKXthLnB1c2goZChiKSl9KTtyZXR1cm4gZS5hcHBseShiLGEpfTpmdW5jdGlvbihhLGIpe2UoYSxudWxsPT1iP1wiXCI6Yil9fXJldHVybntsb2c6ZShcImxvZ1wiKSxpbmZvOmUoXCJpbmZvXCIpLHdhcm46ZShcIndhcm5cIiksZXJyb3I6ZShcImVycm9yXCIpLGRlYnVnOmZ1bmN0aW9uKCl7dmFyIGM9ZShcImRlYnVnXCIpO3JldHVybiBmdW5jdGlvbigpe2ImJmMuYXBwbHkoYSxhcmd1bWVudHMpfX0oKX19XX1mdW5jdGlvbiBmYShiLGEpe2lmKFwiY29uc3RydWN0b3JcIj09PWIpdGhyb3cgQmEoXCJpc2VjZmxkXCIsYSk7cmV0dXJuIGJ9ZnVuY3Rpb24gWmEoYixcbmEpe2lmKGIpe2lmKGIuY29uc3RydWN0b3I9PT1iKXRocm93IEJhKFwiaXNlY2ZuXCIsYSk7aWYoYi5kb2N1bWVudCYmYi5sb2NhdGlvbiYmYi5hbGVydCYmYi5zZXRJbnRlcnZhbCl0aHJvdyBCYShcImlzZWN3aW5kb3dcIixhKTtpZihiLmNoaWxkcmVuJiYoYi5ub2RlTmFtZXx8Yi5wcm9wJiZiLmF0dHImJmIuZmluZCkpdGhyb3cgQmEoXCJpc2VjZG9tXCIsYSk7fXJldHVybiBifWZ1bmN0aW9uIG9iKGIsYSxjLGQsZSl7ZT1lfHx7fTthPWEuc3BsaXQoXCIuXCIpO2Zvcih2YXIgZyxmPTA7MTxhLmxlbmd0aDtmKyspe2c9ZmEoYS5zaGlmdCgpLGQpO3ZhciBoPWJbZ107aHx8KGg9e30sYltnXT1oKTtiPWg7Yi50aGVuJiZlLnVud3JhcFByb21pc2VzJiYodGEoZCksXCIkJHZcImluIGJ8fGZ1bmN0aW9uKGEpe2EudGhlbihmdW5jdGlvbihiKXthLiQkdj1ifSl9KGIpLGIuJCR2PT09cyYmKGIuJCR2PXt9KSxiPWIuJCR2KX1nPWZhKGEuc2hpZnQoKSxkKTtyZXR1cm4gYltnXT1jfWZ1bmN0aW9uIENjKGIsXG5hLGMsZCxlLGcsZil7ZmEoYixnKTtmYShhLGcpO2ZhKGMsZyk7ZmEoZCxnKTtmYShlLGcpO3JldHVybiBmLnVud3JhcFByb21pc2VzP2Z1bmN0aW9uKGYsbCl7dmFyIGs9bCYmbC5oYXNPd25Qcm9wZXJ0eShiKT9sOmYsbTtpZihudWxsPT1rKXJldHVybiBrOyhrPWtbYl0pJiZrLnRoZW4mJih0YShnKSxcIiQkdlwiaW4ga3x8KG09ayxtLiQkdj1zLG0udGhlbihmdW5jdGlvbihhKXttLiQkdj1hfSkpLGs9ay4kJHYpO2lmKCFhKXJldHVybiBrO2lmKG51bGw9PWspcmV0dXJuIHM7KGs9a1thXSkmJmsudGhlbiYmKHRhKGcpLFwiJCR2XCJpbiBrfHwobT1rLG0uJCR2PXMsbS50aGVuKGZ1bmN0aW9uKGEpe20uJCR2PWF9KSksaz1rLiQkdik7aWYoIWMpcmV0dXJuIGs7aWYobnVsbD09aylyZXR1cm4gczsoaz1rW2NdKSYmay50aGVuJiYodGEoZyksXCIkJHZcImluIGt8fChtPWssbS4kJHY9cyxtLnRoZW4oZnVuY3Rpb24oYSl7bS4kJHY9YX0pKSxrPWsuJCR2KTtpZighZClyZXR1cm4gaztpZihudWxsPT1cbmspcmV0dXJuIHM7KGs9a1tkXSkmJmsudGhlbiYmKHRhKGcpLFwiJCR2XCJpbiBrfHwobT1rLG0uJCR2PXMsbS50aGVuKGZ1bmN0aW9uKGEpe20uJCR2PWF9KSksaz1rLiQkdik7aWYoIWUpcmV0dXJuIGs7aWYobnVsbD09aylyZXR1cm4gczsoaz1rW2VdKSYmay50aGVuJiYodGEoZyksXCIkJHZcImluIGt8fChtPWssbS4kJHY9cyxtLnRoZW4oZnVuY3Rpb24oYSl7bS4kJHY9YX0pKSxrPWsuJCR2KTtyZXR1cm4ga306ZnVuY3Rpb24oZyxmKXt2YXIgaz1mJiZmLmhhc093blByb3BlcnR5KGIpP2Y6ZztpZihudWxsPT1rKXJldHVybiBrO2s9a1tiXTtpZighYSlyZXR1cm4gaztpZihudWxsPT1rKXJldHVybiBzO2s9a1thXTtpZighYylyZXR1cm4gaztpZihudWxsPT1rKXJldHVybiBzO2s9a1tjXTtpZighZClyZXR1cm4gaztpZihudWxsPT1rKXJldHVybiBzO2s9a1tkXTtyZXR1cm4gZT9udWxsPT1rP3M6az1rW2VdOmt9fWZ1bmN0aW9uIHhlKGIsYSl7ZmEoYixhKTtyZXR1cm4gZnVuY3Rpb24oYSxcbmQpe3JldHVybiBudWxsPT1hP3M6KGQmJmQuaGFzT3duUHJvcGVydHkoYik/ZDphKVtiXX19ZnVuY3Rpb24geWUoYixhLGMpe2ZhKGIsYyk7ZmEoYSxjKTtyZXR1cm4gZnVuY3Rpb24oYyxlKXtpZihudWxsPT1jKXJldHVybiBzO2M9KGUmJmUuaGFzT3duUHJvcGVydHkoYik/ZTpjKVtiXTtyZXR1cm4gbnVsbD09Yz9zOmNbYV19fWZ1bmN0aW9uIERjKGIsYSxjKXtpZihNYi5oYXNPd25Qcm9wZXJ0eShiKSlyZXR1cm4gTWJbYl07dmFyIGQ9Yi5zcGxpdChcIi5cIiksZT1kLmxlbmd0aCxnO2lmKGEudW53cmFwUHJvbWlzZXN8fDEhPT1lKWlmKGEudW53cmFwUHJvbWlzZXN8fDIhPT1lKWlmKGEuY3NwKWc9Nj5lP0NjKGRbMF0sZFsxXSxkWzJdLGRbM10sZFs0XSxjLGEpOmZ1bmN0aW9uKGIsZyl7dmFyIGY9MCxoO2RvIGg9Q2MoZFtmKytdLGRbZisrXSxkW2YrK10sZFtmKytdLGRbZisrXSxjLGEpKGIsZyksZz1zLGI9aDt3aGlsZShmPGUpO3JldHVybiBofTtlbHNle3ZhciBmPVwidmFyIHA7XFxuXCI7XG5xKGQsZnVuY3Rpb24oYixkKXtmYShiLGMpO2YrPVwiaWYocyA9PSBudWxsKSByZXR1cm4gdW5kZWZpbmVkO1xcbnM9XCIrKGQ/XCJzXCI6JygoayYmay5oYXNPd25Qcm9wZXJ0eShcIicrYisnXCIpKT9rOnMpJykrJ1tcIicrYisnXCJdO1xcbicrKGEudW53cmFwUHJvbWlzZXM/J2lmIChzICYmIHMudGhlbikge1xcbiBwdyhcIicrYy5yZXBsYWNlKC8oW1wiXFxyXFxuXSkvZyxcIlxcXFwkMVwiKSsnXCIpO1xcbiBpZiAoIShcIiQkdlwiIGluIHMpKSB7XFxuIHA9cztcXG4gcC4kJHYgPSB1bmRlZmluZWQ7XFxuIHAudGhlbihmdW5jdGlvbih2KSB7cC4kJHY9djt9KTtcXG59XFxuIHM9cy4kJHZcXG59XFxuJzpcIlwiKX0pO3ZhciBmPWYrXCJyZXR1cm4gcztcIixoPW5ldyBGdW5jdGlvbihcInNcIixcImtcIixcInB3XCIsZik7aC50b1N0cmluZz1hYShmKTtnPWEudW53cmFwUHJvbWlzZXM/ZnVuY3Rpb24oYSxiKXtyZXR1cm4gaChhLGIsdGEpfTpofWVsc2UgZz15ZShkWzBdLGRbMV0sYyk7ZWxzZSBnPXhlKGRbMF0sYyk7XCJoYXNPd25Qcm9wZXJ0eVwiIT09XG5iJiYoTWJbYl09Zyk7cmV0dXJuIGd9ZnVuY3Rpb24gWGQoKXt2YXIgYj17fSxhPXtjc3A6ITEsdW53cmFwUHJvbWlzZXM6ITEsbG9nUHJvbWlzZVdhcm5pbmdzOiEwfTt0aGlzLnVud3JhcFByb21pc2VzPWZ1bmN0aW9uKGIpe3JldHVybiBCKGIpPyhhLnVud3JhcFByb21pc2VzPSEhYix0aGlzKTphLnVud3JhcFByb21pc2VzfTt0aGlzLmxvZ1Byb21pc2VXYXJuaW5ncz1mdW5jdGlvbihiKXtyZXR1cm4gQihiKT8oYS5sb2dQcm9taXNlV2FybmluZ3M9Yix0aGlzKTphLmxvZ1Byb21pc2VXYXJuaW5nc307dGhpcy4kZ2V0PVtcIiRmaWx0ZXJcIixcIiRzbmlmZmVyXCIsXCIkbG9nXCIsZnVuY3Rpb24oYyxkLGUpe2EuY3NwPWQuY3NwO3RhPWZ1bmN0aW9uKGIpe2EubG9nUHJvbWlzZVdhcm5pbmdzJiYhRWMuaGFzT3duUHJvcGVydHkoYikmJihFY1tiXT0hMCxlLndhcm4oXCJbJHBhcnNlXSBQcm9taXNlIGZvdW5kIGluIHRoZSBleHByZXNzaW9uIGBcIitiK1wiYC4gQXV0b21hdGljIHVud3JhcHBpbmcgb2YgcHJvbWlzZXMgaW4gQW5ndWxhciBleHByZXNzaW9ucyBpcyBkZXByZWNhdGVkLlwiKSl9O1xucmV0dXJuIGZ1bmN0aW9uKGQpe3ZhciBlO3N3aXRjaCh0eXBlb2YgZCl7Y2FzZSBcInN0cmluZ1wiOmlmKGIuaGFzT3duUHJvcGVydHkoZCkpcmV0dXJuIGJbZF07ZT1uZXcgTmIoYSk7ZT0obmV3ICRhKGUsYyxhKSkucGFyc2UoZCwhMSk7XCJoYXNPd25Qcm9wZXJ0eVwiIT09ZCYmKGJbZF09ZSk7cmV0dXJuIGU7Y2FzZSBcImZ1bmN0aW9uXCI6cmV0dXJuIGQ7ZGVmYXVsdDpyZXR1cm4gQ319fV19ZnVuY3Rpb24gWmQoKXt0aGlzLiRnZXQ9W1wiJHJvb3RTY29wZVwiLFwiJGV4Y2VwdGlvbkhhbmRsZXJcIixmdW5jdGlvbihiLGEpe3JldHVybiB6ZShmdW5jdGlvbihhKXtiLiRldmFsQXN5bmMoYSl9LGEpfV19ZnVuY3Rpb24gemUoYixhKXtmdW5jdGlvbiBjKGEpe3JldHVybiBhfWZ1bmN0aW9uIGQoYSl7cmV0dXJuIGYoYSl9dmFyIGU9ZnVuY3Rpb24oKXt2YXIgZj1bXSxrLG07cmV0dXJuIG09e3Jlc29sdmU6ZnVuY3Rpb24oYSl7aWYoZil7dmFyIGM9ZjtmPXM7az1nKGEpO2MubGVuZ3RoJiZiKGZ1bmN0aW9uKCl7Zm9yKHZhciBhLFxuYj0wLGQ9Yy5sZW5ndGg7YjxkO2IrKylhPWNbYl0say50aGVuKGFbMF0sYVsxXSxhWzJdKX0pfX0scmVqZWN0OmZ1bmN0aW9uKGEpe20ucmVzb2x2ZShoKGEpKX0sbm90aWZ5OmZ1bmN0aW9uKGEpe2lmKGYpe3ZhciBjPWY7Zi5sZW5ndGgmJmIoZnVuY3Rpb24oKXtmb3IodmFyIGIsZD0wLGU9Yy5sZW5ndGg7ZDxlO2QrKyliPWNbZF0sYlsyXShhKX0pfX0scHJvbWlzZTp7dGhlbjpmdW5jdGlvbihiLGcsaCl7dmFyIG09ZSgpLHU9ZnVuY3Rpb24oZCl7dHJ5e20ucmVzb2x2ZSgoUChiKT9iOmMpKGQpKX1jYXRjaChlKXttLnJlamVjdChlKSxhKGUpfX0sRj1mdW5jdGlvbihiKXt0cnl7bS5yZXNvbHZlKChQKGcpP2c6ZCkoYikpfWNhdGNoKGMpe20ucmVqZWN0KGMpLGEoYyl9fSx2PWZ1bmN0aW9uKGIpe3RyeXttLm5vdGlmeSgoUChoKT9oOmMpKGIpKX1jYXRjaChkKXthKGQpfX07Zj9mLnB1c2goW3UsRix2XSk6ay50aGVuKHUsRix2KTtyZXR1cm4gbS5wcm9taXNlfSxcImNhdGNoXCI6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMudGhlbihudWxsLFxuYSl9LFwiZmluYWxseVwiOmZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGIoYSxjKXt2YXIgZD1lKCk7Yz9kLnJlc29sdmUoYSk6ZC5yZWplY3QoYSk7cmV0dXJuIGQucHJvbWlzZX1mdW5jdGlvbiBkKGUsZyl7dmFyIGY9bnVsbDt0cnl7Zj0oYXx8YykoKX1jYXRjaChoKXtyZXR1cm4gYihoLCExKX1yZXR1cm4gZiYmUChmLnRoZW4pP2YudGhlbihmdW5jdGlvbigpe3JldHVybiBiKGUsZyl9LGZ1bmN0aW9uKGEpe3JldHVybiBiKGEsITEpfSk6YihlLGcpfXJldHVybiB0aGlzLnRoZW4oZnVuY3Rpb24oYSl7cmV0dXJuIGQoYSwhMCl9LGZ1bmN0aW9uKGEpe3JldHVybiBkKGEsITEpfSl9fX19LGc9ZnVuY3Rpb24oYSl7cmV0dXJuIGEmJlAoYS50aGVuKT9hOnt0aGVuOmZ1bmN0aW9uKGMpe3ZhciBkPWUoKTtiKGZ1bmN0aW9uKCl7ZC5yZXNvbHZlKGMoYSkpfSk7cmV0dXJuIGQucHJvbWlzZX19fSxmPWZ1bmN0aW9uKGEpe3ZhciBiPWUoKTtiLnJlamVjdChhKTtyZXR1cm4gYi5wcm9taXNlfSxoPWZ1bmN0aW9uKGMpe3JldHVybnt0aGVuOmZ1bmN0aW9uKGcsXG5mKXt2YXIgaD1lKCk7YihmdW5jdGlvbigpe3RyeXtoLnJlc29sdmUoKFAoZik/ZjpkKShjKSl9Y2F0Y2goYil7aC5yZWplY3QoYiksYShiKX19KTtyZXR1cm4gaC5wcm9taXNlfX19O3JldHVybntkZWZlcjplLHJlamVjdDpmLHdoZW46ZnVuY3Rpb24oaCxrLG0sbil7dmFyIHA9ZSgpLHIsej1mdW5jdGlvbihiKXt0cnl7cmV0dXJuKFAoayk/azpjKShiKX1jYXRjaChkKXtyZXR1cm4gYShkKSxmKGQpfX0sdT1mdW5jdGlvbihiKXt0cnl7cmV0dXJuKFAobSk/bTpkKShiKX1jYXRjaChjKXtyZXR1cm4gYShjKSxmKGMpfX0sRj1mdW5jdGlvbihiKXt0cnl7cmV0dXJuKFAobik/bjpjKShiKX1jYXRjaChkKXthKGQpfX07YihmdW5jdGlvbigpe2coaCkudGhlbihmdW5jdGlvbihhKXtyfHwocj0hMCxwLnJlc29sdmUoZyhhKS50aGVuKHosdSxGKSkpfSxmdW5jdGlvbihhKXtyfHwocj0hMCxwLnJlc29sdmUodShhKSkpfSxmdW5jdGlvbihhKXtyfHxwLm5vdGlmeShGKGEpKX0pfSk7cmV0dXJuIHAucHJvbWlzZX0sXG5hbGw6ZnVuY3Rpb24oYSl7dmFyIGI9ZSgpLGM9MCxkPU0oYSk/W106e307cShhLGZ1bmN0aW9uKGEsZSl7YysrO2coYSkudGhlbihmdW5jdGlvbihhKXtkLmhhc093blByb3BlcnR5KGUpfHwoZFtlXT1hLC0tY3x8Yi5yZXNvbHZlKGQpKX0sZnVuY3Rpb24oYSl7ZC5oYXNPd25Qcm9wZXJ0eShlKXx8Yi5yZWplY3QoYSl9KX0pOzA9PT1jJiZiLnJlc29sdmUoZCk7cmV0dXJuIGIucHJvbWlzZX19fWZ1bmN0aW9uIGZlKCl7dGhpcy4kZ2V0PVtcIiR3aW5kb3dcIixcIiR0aW1lb3V0XCIsZnVuY3Rpb24oYixhKXt2YXIgYz1iLnJlcXVlc3RBbmltYXRpb25GcmFtZXx8Yi53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWV8fGIubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lLGQ9Yi5jYW5jZWxBbmltYXRpb25GcmFtZXx8Yi53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZXx8Yi5tb3pDYW5jZWxBbmltYXRpb25GcmFtZXx8Yi53ZWJraXRDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsZT0hIWMsZz1lP1xuZnVuY3Rpb24oYSl7dmFyIGI9YyhhKTtyZXR1cm4gZnVuY3Rpb24oKXtkKGIpfX06ZnVuY3Rpb24oYil7dmFyIGM9YShiLDE2LjY2LCExKTtyZXR1cm4gZnVuY3Rpb24oKXthLmNhbmNlbChjKX19O2cuc3VwcG9ydGVkPWU7cmV0dXJuIGd9XX1mdW5jdGlvbiBZZCgpe3ZhciBiPTEwLGE9dChcIiRyb290U2NvcGVcIiksYz1udWxsO3RoaXMuZGlnZXN0VHRsPWZ1bmN0aW9uKGEpe2FyZ3VtZW50cy5sZW5ndGgmJihiPWEpO3JldHVybiBifTt0aGlzLiRnZXQ9W1wiJGluamVjdG9yXCIsXCIkZXhjZXB0aW9uSGFuZGxlclwiLFwiJHBhcnNlXCIsXCIkYnJvd3NlclwiLGZ1bmN0aW9uKGQsZSxnLGYpe2Z1bmN0aW9uIGgoKXt0aGlzLiRpZD1iYigpO3RoaXMuJCRwaGFzZT10aGlzLiRwYXJlbnQ9dGhpcy4kJHdhdGNoZXJzPXRoaXMuJCRuZXh0U2libGluZz10aGlzLiQkcHJldlNpYmxpbmc9dGhpcy4kJGNoaWxkSGVhZD10aGlzLiQkY2hpbGRUYWlsPW51bGw7dGhpc1tcInRoaXNcIl09dGhpcy4kcm9vdD10aGlzO1xudGhpcy4kJGRlc3Ryb3llZD0hMTt0aGlzLiQkYXN5bmNRdWV1ZT1bXTt0aGlzLiQkcG9zdERpZ2VzdFF1ZXVlPVtdO3RoaXMuJCRsaXN0ZW5lcnM9e307dGhpcy4kJGxpc3RlbmVyQ291bnQ9e307dGhpcy4kJGlzb2xhdGVCaW5kaW5ncz17fX1mdW5jdGlvbiBsKGIpe2lmKHAuJCRwaGFzZSl0aHJvdyBhKFwiaW5wcm9nXCIscC4kJHBoYXNlKTtwLiQkcGhhc2U9Yn1mdW5jdGlvbiBrKGEsYil7dmFyIGM9ZyhhKTtSYShjLGIpO3JldHVybiBjfWZ1bmN0aW9uIG0oYSxiLGMpe2RvIGEuJCRsaXN0ZW5lckNvdW50W2NdLT1iLDA9PT1hLiQkbGlzdGVuZXJDb3VudFtjXSYmZGVsZXRlIGEuJCRsaXN0ZW5lckNvdW50W2NdO3doaWxlKGE9YS4kcGFyZW50KX1mdW5jdGlvbiBuKCl7fWgucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpoLCRuZXc6ZnVuY3Rpb24oYSl7YT8oYT1uZXcgaCxhLiRyb290PXRoaXMuJHJvb3QsYS4kJGFzeW5jUXVldWU9dGhpcy4kJGFzeW5jUXVldWUsYS4kJHBvc3REaWdlc3RRdWV1ZT1cbnRoaXMuJCRwb3N0RGlnZXN0UXVldWUpOihhPWZ1bmN0aW9uKCl7fSxhLnByb3RvdHlwZT10aGlzLGE9bmV3IGEsYS4kaWQ9YmIoKSk7YVtcInRoaXNcIl09YTthLiQkbGlzdGVuZXJzPXt9O2EuJCRsaXN0ZW5lckNvdW50PXt9O2EuJHBhcmVudD10aGlzO2EuJCR3YXRjaGVycz1hLiQkbmV4dFNpYmxpbmc9YS4kJGNoaWxkSGVhZD1hLiQkY2hpbGRUYWlsPW51bGw7YS4kJHByZXZTaWJsaW5nPXRoaXMuJCRjaGlsZFRhaWw7dGhpcy4kJGNoaWxkSGVhZD90aGlzLiQkY2hpbGRUYWlsPXRoaXMuJCRjaGlsZFRhaWwuJCRuZXh0U2libGluZz1hOnRoaXMuJCRjaGlsZEhlYWQ9dGhpcy4kJGNoaWxkVGFpbD1hO3JldHVybiBhfSwkd2F0Y2g6ZnVuY3Rpb24oYSxiLGQpe3ZhciBlPWsoYSxcIndhdGNoXCIpLGc9dGhpcy4kJHdhdGNoZXJzLGY9e2ZuOmIsbGFzdDpuLGdldDplLGV4cDphLGVxOiEhZH07Yz1udWxsO2lmKCFQKGIpKXt2YXIgaD1rKGJ8fEMsXCJsaXN0ZW5lclwiKTtmLmZuPWZ1bmN0aW9uKGEsXG5iLGMpe2goYyl9fWlmKFwic3RyaW5nXCI9PXR5cGVvZiBhJiZlLmNvbnN0YW50KXt2YXIgbD1mLmZuO2YuZm49ZnVuY3Rpb24oYSxiLGMpe2wuY2FsbCh0aGlzLGEsYixjKTtPYShnLGYpfX1nfHwoZz10aGlzLiQkd2F0Y2hlcnM9W10pO2cudW5zaGlmdChmKTtyZXR1cm4gZnVuY3Rpb24oKXtPYShnLGYpO2M9bnVsbH19LCR3YXRjaENvbGxlY3Rpb246ZnVuY3Rpb24oYSxiKXt2YXIgYz10aGlzLGQsZSxmLGg9MTxiLmxlbmd0aCxsPTAsaz1nKGEpLG09W10sbj17fSxwPSEwLHE9MDtyZXR1cm4gdGhpcy4kd2F0Y2goZnVuY3Rpb24oKXtkPWsoYyk7dmFyIGEsYjtpZihYKGQpKWlmKGFiKGQpKWZvcihlIT09bSYmKGU9bSxxPWUubGVuZ3RoPTAsbCsrKSxhPWQubGVuZ3RoLHEhPT1hJiYobCsrLGUubGVuZ3RoPXE9YSksYj0wO2I8YTtiKyspZVtiXSE9PWVbYl0mJmRbYl0hPT1kW2JdfHxlW2JdPT09ZFtiXXx8KGwrKyxlW2JdPWRbYl0pO2Vsc2V7ZSE9PW4mJihlPW49e30scT0wLGwrKyk7YT1cbjA7Zm9yKGIgaW4gZClkLmhhc093blByb3BlcnR5KGIpJiYoYSsrLGUuaGFzT3duUHJvcGVydHkoYik/ZVtiXSE9PWRbYl0mJihsKyssZVtiXT1kW2JdKToocSsrLGVbYl09ZFtiXSxsKyspKTtpZihxPmEpZm9yKGIgaW4gbCsrLGUpZS5oYXNPd25Qcm9wZXJ0eShiKSYmIWQuaGFzT3duUHJvcGVydHkoYikmJihxLS0sZGVsZXRlIGVbYl0pfWVsc2UgZSE9PWQmJihlPWQsbCsrKTtyZXR1cm4gbH0sZnVuY3Rpb24oKXtwPyhwPSExLGIoZCxkLGMpKTpiKGQsZixjKTtpZihoKWlmKFgoZCkpaWYoYWIoZCkpe2Y9QXJyYXkoZC5sZW5ndGgpO2Zvcih2YXIgYT0wO2E8ZC5sZW5ndGg7YSsrKWZbYV09ZFthXX1lbHNlIGZvcihhIGluIGY9e30sZClGYy5jYWxsKGQsYSkmJihmW2FdPWRbYV0pO2Vsc2UgZj1kfSl9LCRkaWdlc3Q6ZnVuY3Rpb24oKXt2YXIgZCxnLGYsaCxrPXRoaXMuJCRhc3luY1F1ZXVlLG09dGhpcy4kJHBvc3REaWdlc3RRdWV1ZSxxLHgscz1iLEwsUT1bXSx5LEgsUjtsKFwiJGRpZ2VzdFwiKTtcbmM9bnVsbDtkb3t4PSExO2ZvcihMPXRoaXM7ay5sZW5ndGg7KXt0cnl7Uj1rLnNoaWZ0KCksUi5zY29wZS4kZXZhbChSLmV4cHJlc3Npb24pfWNhdGNoKEIpe3AuJCRwaGFzZT1udWxsLGUoQil9Yz1udWxsfWE6ZG97aWYoaD1MLiQkd2F0Y2hlcnMpZm9yKHE9aC5sZW5ndGg7cS0tOyl0cnl7aWYoZD1oW3FdKWlmKChnPWQuZ2V0KEwpKSE9PShmPWQubGFzdCkmJiEoZC5lcT94YShnLGYpOlwibnVtYmVyXCI9PXR5cGVvZiBnJiZcIm51bWJlclwiPT10eXBlb2YgZiYmaXNOYU4oZykmJmlzTmFOKGYpKSl4PSEwLGM9ZCxkLmxhc3Q9ZC5lcT9iYShnKTpnLGQuZm4oZyxmPT09bj9nOmYsTCksNT5zJiYoeT00LXMsUVt5XXx8KFFbeV09W10pLEg9UChkLmV4cCk/XCJmbjogXCIrKGQuZXhwLm5hbWV8fGQuZXhwLnRvU3RyaW5nKCkpOmQuZXhwLEgrPVwiOyBuZXdWYWw6IFwiK3FhKGcpK1wiOyBvbGRWYWw6IFwiK3FhKGYpLFFbeV0ucHVzaChIKSk7ZWxzZSBpZihkPT09Yyl7eD0hMTticmVhayBhfX1jYXRjaCh3KXtwLiQkcGhhc2U9XG5udWxsLGUodyl9aWYoIShoPUwuJCRjaGlsZEhlYWR8fEwhPT10aGlzJiZMLiQkbmV4dFNpYmxpbmcpKWZvcig7TCE9PXRoaXMmJiEoaD1MLiQkbmV4dFNpYmxpbmcpOylMPUwuJHBhcmVudH13aGlsZShMPWgpO2lmKCh4fHxrLmxlbmd0aCkmJiFzLS0pdGhyb3cgcC4kJHBoYXNlPW51bGwsYShcImluZmRpZ1wiLGIscWEoUSkpO313aGlsZSh4fHxrLmxlbmd0aCk7Zm9yKHAuJCRwaGFzZT1udWxsO20ubGVuZ3RoOyl0cnl7bS5zaGlmdCgpKCl9Y2F0Y2goVCl7ZShUKX19LCRkZXN0cm95OmZ1bmN0aW9uKCl7aWYoIXRoaXMuJCRkZXN0cm95ZWQpe3ZhciBhPXRoaXMuJHBhcmVudDt0aGlzLiRicm9hZGNhc3QoXCIkZGVzdHJveVwiKTt0aGlzLiQkZGVzdHJveWVkPSEwO3RoaXMhPT1wJiYocSh0aGlzLiQkbGlzdGVuZXJDb3VudCxlYihudWxsLG0sdGhpcykpLGEuJCRjaGlsZEhlYWQ9PXRoaXMmJihhLiQkY2hpbGRIZWFkPXRoaXMuJCRuZXh0U2libGluZyksYS4kJGNoaWxkVGFpbD09dGhpcyYmXG4oYS4kJGNoaWxkVGFpbD10aGlzLiQkcHJldlNpYmxpbmcpLHRoaXMuJCRwcmV2U2libGluZyYmKHRoaXMuJCRwcmV2U2libGluZy4kJG5leHRTaWJsaW5nPXRoaXMuJCRuZXh0U2libGluZyksdGhpcy4kJG5leHRTaWJsaW5nJiYodGhpcy4kJG5leHRTaWJsaW5nLiQkcHJldlNpYmxpbmc9dGhpcy4kJHByZXZTaWJsaW5nKSx0aGlzLiRwYXJlbnQ9dGhpcy4kJG5leHRTaWJsaW5nPXRoaXMuJCRwcmV2U2libGluZz10aGlzLiQkY2hpbGRIZWFkPXRoaXMuJCRjaGlsZFRhaWw9dGhpcy4kcm9vdD1udWxsLHRoaXMuJCRsaXN0ZW5lcnM9e30sdGhpcy4kJHdhdGNoZXJzPXRoaXMuJCRhc3luY1F1ZXVlPXRoaXMuJCRwb3N0RGlnZXN0UXVldWU9W10sdGhpcy4kZGVzdHJveT10aGlzLiRkaWdlc3Q9dGhpcy4kYXBwbHk9Qyx0aGlzLiRvbj10aGlzLiR3YXRjaD1mdW5jdGlvbigpe3JldHVybiBDfSl9fSwkZXZhbDpmdW5jdGlvbihhLGIpe3JldHVybiBnKGEpKHRoaXMsYil9LCRldmFsQXN5bmM6ZnVuY3Rpb24oYSl7cC4kJHBoYXNlfHxcbnAuJCRhc3luY1F1ZXVlLmxlbmd0aHx8Zi5kZWZlcihmdW5jdGlvbigpe3AuJCRhc3luY1F1ZXVlLmxlbmd0aCYmcC4kZGlnZXN0KCl9KTt0aGlzLiQkYXN5bmNRdWV1ZS5wdXNoKHtzY29wZTp0aGlzLGV4cHJlc3Npb246YX0pfSwkJHBvc3REaWdlc3Q6ZnVuY3Rpb24oYSl7dGhpcy4kJHBvc3REaWdlc3RRdWV1ZS5wdXNoKGEpfSwkYXBwbHk6ZnVuY3Rpb24oYSl7dHJ5e3JldHVybiBsKFwiJGFwcGx5XCIpLHRoaXMuJGV2YWwoYSl9Y2F0Y2goYil7ZShiKX1maW5hbGx5e3AuJCRwaGFzZT1udWxsO3RyeXtwLiRkaWdlc3QoKX1jYXRjaChjKXt0aHJvdyBlKGMpLGM7fX19LCRvbjpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMuJCRsaXN0ZW5lcnNbYV07Y3x8KHRoaXMuJCRsaXN0ZW5lcnNbYV09Yz1bXSk7Yy5wdXNoKGIpO3ZhciBkPXRoaXM7ZG8gZC4kJGxpc3RlbmVyQ291bnRbYV18fChkLiQkbGlzdGVuZXJDb3VudFthXT0wKSxkLiQkbGlzdGVuZXJDb3VudFthXSsrO3doaWxlKGQ9ZC4kcGFyZW50KTtcbnZhciBlPXRoaXM7cmV0dXJuIGZ1bmN0aW9uKCl7Y1tkYihjLGIpXT1udWxsO20oZSwxLGEpfX0sJGVtaXQ6ZnVuY3Rpb24oYSxiKXt2YXIgYz1bXSxkLGc9dGhpcyxmPSExLGg9e25hbWU6YSx0YXJnZXRTY29wZTpnLHN0b3BQcm9wYWdhdGlvbjpmdW5jdGlvbigpe2Y9ITB9LHByZXZlbnREZWZhdWx0OmZ1bmN0aW9uKCl7aC5kZWZhdWx0UHJldmVudGVkPSEwfSxkZWZhdWx0UHJldmVudGVkOiExfSxsPVtoXS5jb25jYXQoeWEuY2FsbChhcmd1bWVudHMsMSkpLGssbTtkb3tkPWcuJCRsaXN0ZW5lcnNbYV18fGM7aC5jdXJyZW50U2NvcGU9ZztrPTA7Zm9yKG09ZC5sZW5ndGg7azxtO2srKylpZihkW2tdKXRyeXtkW2tdLmFwcGx5KG51bGwsbCl9Y2F0Y2gobil7ZShuKX1lbHNlIGQuc3BsaWNlKGssMSksay0tLG0tLTtpZihmKWJyZWFrO2c9Zy4kcGFyZW50fXdoaWxlKGcpO3JldHVybiBofSwkYnJvYWRjYXN0OmZ1bmN0aW9uKGEsYil7Zm9yKHZhciBjPXRoaXMsZD10aGlzLGc9e25hbWU6YSxcbnRhcmdldFNjb3BlOnRoaXMscHJldmVudERlZmF1bHQ6ZnVuY3Rpb24oKXtnLmRlZmF1bHRQcmV2ZW50ZWQ9ITB9LGRlZmF1bHRQcmV2ZW50ZWQ6ITF9LGY9W2ddLmNvbmNhdCh5YS5jYWxsKGFyZ3VtZW50cywxKSksaCxrO2M9ZDspe2cuY3VycmVudFNjb3BlPWM7ZD1jLiQkbGlzdGVuZXJzW2FdfHxbXTtoPTA7Zm9yKGs9ZC5sZW5ndGg7aDxrO2grKylpZihkW2hdKXRyeXtkW2hdLmFwcGx5KG51bGwsZil9Y2F0Y2gobCl7ZShsKX1lbHNlIGQuc3BsaWNlKGgsMSksaC0tLGstLTtpZighKGQ9Yy4kJGxpc3RlbmVyQ291bnRbYV0mJmMuJCRjaGlsZEhlYWR8fGMhPT10aGlzJiZjLiQkbmV4dFNpYmxpbmcpKWZvcig7YyE9PXRoaXMmJiEoZD1jLiQkbmV4dFNpYmxpbmcpOyljPWMuJHBhcmVudH1yZXR1cm4gZ319O3ZhciBwPW5ldyBoO3JldHVybiBwfV19ZnVuY3Rpb24gYmQoKXt2YXIgYj0vXlxccyooaHR0cHM/fGZ0cHxtYWlsdG98dGVsfGZpbGUpOi8sYT0vXlxccyooaHR0cHM/fGZ0cHxmaWxlKTp8ZGF0YTppbWFnZVxcLy87XG50aGlzLmFIcmVmU2FuaXRpemF0aW9uV2hpdGVsaXN0PWZ1bmN0aW9uKGEpe3JldHVybiBCKGEpPyhiPWEsdGhpcyk6Yn07dGhpcy5pbWdTcmNTYW5pdGl6YXRpb25XaGl0ZWxpc3Q9ZnVuY3Rpb24oYil7cmV0dXJuIEIoYik/KGE9Yix0aGlzKTphfTt0aGlzLiRnZXQ9ZnVuY3Rpb24oKXtyZXR1cm4gZnVuY3Rpb24oYyxkKXt2YXIgZT1kP2E6YixnO2lmKCFTfHw4PD1TKWlmKGc9c2EoYykuaHJlZixcIlwiIT09ZyYmIWcubWF0Y2goZSkpcmV0dXJuXCJ1bnNhZmU6XCIrZztyZXR1cm4gY319fWZ1bmN0aW9uIEFlKGIpe2lmKFwic2VsZlwiPT09YilyZXR1cm4gYjtpZih3KGIpKXtpZigtMTxiLmluZGV4T2YoXCIqKipcIikpdGhyb3cgdWEoXCJpd2NhcmRcIixiKTtiPWIucmVwbGFjZSgvKFstKClcXFtcXF17fSs/Ki4kXFxefCw6IzwhXFxcXF0pL2csXCJcXFxcJDFcIikucmVwbGFjZSgvXFx4MDgvZyxcIlxcXFx4MDhcIikucmVwbGFjZShcIlxcXFwqXFxcXCpcIixcIi4qXCIpLnJlcGxhY2UoXCJcXFxcKlwiLFwiW146Ly4/JjtdKlwiKTtyZXR1cm4gUmVnRXhwKFwiXlwiK1xuYitcIiRcIil9aWYoY2IoYikpcmV0dXJuIFJlZ0V4cChcIl5cIitiLnNvdXJjZStcIiRcIik7dGhyb3cgdWEoXCJpbWF0Y2hlclwiKTt9ZnVuY3Rpb24gR2MoYil7dmFyIGE9W107QihiKSYmcShiLGZ1bmN0aW9uKGIpe2EucHVzaChBZShiKSl9KTtyZXR1cm4gYX1mdW5jdGlvbiBhZSgpe3RoaXMuU0NFX0NPTlRFWFRTPWdhO3ZhciBiPVtcInNlbGZcIl0sYT1bXTt0aGlzLnJlc291cmNlVXJsV2hpdGVsaXN0PWZ1bmN0aW9uKGEpe2FyZ3VtZW50cy5sZW5ndGgmJihiPUdjKGEpKTtyZXR1cm4gYn07dGhpcy5yZXNvdXJjZVVybEJsYWNrbGlzdD1mdW5jdGlvbihiKXthcmd1bWVudHMubGVuZ3RoJiYoYT1HYyhiKSk7cmV0dXJuIGF9O3RoaXMuJGdldD1bXCIkaW5qZWN0b3JcIixmdW5jdGlvbihjKXtmdW5jdGlvbiBkKGEpe3ZhciBiPWZ1bmN0aW9uKGEpe3RoaXMuJCR1bndyYXBUcnVzdGVkVmFsdWU9ZnVuY3Rpb24oKXtyZXR1cm4gYX19O2EmJihiLnByb3RvdHlwZT1uZXcgYSk7Yi5wcm90b3R5cGUudmFsdWVPZj1cbmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuJCR1bndyYXBUcnVzdGVkVmFsdWUoKX07Yi5wcm90b3R5cGUudG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kJHVud3JhcFRydXN0ZWRWYWx1ZSgpLnRvU3RyaW5nKCl9O3JldHVybiBifXZhciBlPWZ1bmN0aW9uKGEpe3Rocm93IHVhKFwidW5zYWZlXCIpO307Yy5oYXMoXCIkc2FuaXRpemVcIikmJihlPWMuZ2V0KFwiJHNhbml0aXplXCIpKTt2YXIgZz1kKCksZj17fTtmW2dhLkhUTUxdPWQoZyk7ZltnYS5DU1NdPWQoZyk7ZltnYS5VUkxdPWQoZyk7ZltnYS5KU109ZChnKTtmW2dhLlJFU09VUkNFX1VSTF09ZChmW2dhLlVSTF0pO3JldHVybnt0cnVzdEFzOmZ1bmN0aW9uKGEsYil7dmFyIGM9Zi5oYXNPd25Qcm9wZXJ0eShhKT9mW2FdOm51bGw7aWYoIWMpdGhyb3cgdWEoXCJpY29udGV4dFwiLGEsYik7aWYobnVsbD09PWJ8fGI9PT1zfHxcIlwiPT09YilyZXR1cm4gYjtpZihcInN0cmluZ1wiIT09dHlwZW9mIGIpdGhyb3cgdWEoXCJpdHlwZVwiLGEpO3JldHVybiBuZXcgYyhiKX0sXG5nZXRUcnVzdGVkOmZ1bmN0aW9uKGMsZCl7aWYobnVsbD09PWR8fGQ9PT1zfHxcIlwiPT09ZClyZXR1cm4gZDt2YXIgZz1mLmhhc093blByb3BlcnR5KGMpP2ZbY106bnVsbDtpZihnJiZkIGluc3RhbmNlb2YgZylyZXR1cm4gZC4kJHVud3JhcFRydXN0ZWRWYWx1ZSgpO2lmKGM9PT1nYS5SRVNPVVJDRV9VUkwpe3ZhciBnPXNhKGQudG9TdHJpbmcoKSksbSxuLHA9ITE7bT0wO2ZvcihuPWIubGVuZ3RoO208bjttKyspaWYoXCJzZWxmXCI9PT1iW21dP0liKGcpOmJbbV0uZXhlYyhnLmhyZWYpKXtwPSEwO2JyZWFrfWlmKHApZm9yKG09MCxuPWEubGVuZ3RoO208bjttKyspaWYoXCJzZWxmXCI9PT1hW21dP0liKGcpOmFbbV0uZXhlYyhnLmhyZWYpKXtwPSExO2JyZWFrfWlmKHApcmV0dXJuIGQ7dGhyb3cgdWEoXCJpbnNlY3VybFwiLGQudG9TdHJpbmcoKSk7fWlmKGM9PT1nYS5IVE1MKXJldHVybiBlKGQpO3Rocm93IHVhKFwidW5zYWZlXCIpO30sdmFsdWVPZjpmdW5jdGlvbihhKXtyZXR1cm4gYSBpbnN0YW5jZW9mXG5nP2EuJCR1bndyYXBUcnVzdGVkVmFsdWUoKTphfX19XX1mdW5jdGlvbiAkZCgpe3ZhciBiPSEwO3RoaXMuZW5hYmxlZD1mdW5jdGlvbihhKXthcmd1bWVudHMubGVuZ3RoJiYoYj0hIWEpO3JldHVybiBifTt0aGlzLiRnZXQ9W1wiJHBhcnNlXCIsXCIkc25pZmZlclwiLFwiJHNjZURlbGVnYXRlXCIsZnVuY3Rpb24oYSxjLGQpe2lmKGImJmMubXNpZSYmOD5jLm1zaWVEb2N1bWVudE1vZGUpdGhyb3cgdWEoXCJpZXF1aXJrc1wiKTt2YXIgZT1iYShnYSk7ZS5pc0VuYWJsZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gYn07ZS50cnVzdEFzPWQudHJ1c3RBcztlLmdldFRydXN0ZWQ9ZC5nZXRUcnVzdGVkO2UudmFsdWVPZj1kLnZhbHVlT2Y7Ynx8KGUudHJ1c3RBcz1lLmdldFRydXN0ZWQ9ZnVuY3Rpb24oYSxiKXtyZXR1cm4gYn0sZS52YWx1ZU9mPURhKTtlLnBhcnNlQXM9ZnVuY3Rpb24oYixjKXt2YXIgZD1hKGMpO3JldHVybiBkLmxpdGVyYWwmJmQuY29uc3RhbnQ/ZDpmdW5jdGlvbihhLGMpe3JldHVybiBlLmdldFRydXN0ZWQoYixcbmQoYSxjKSl9fTt2YXIgZz1lLnBhcnNlQXMsZj1lLmdldFRydXN0ZWQsaD1lLnRydXN0QXM7cShnYSxmdW5jdGlvbihhLGIpe3ZhciBjPUsoYik7ZVtUYShcInBhcnNlX2FzX1wiK2MpXT1mdW5jdGlvbihiKXtyZXR1cm4gZyhhLGIpfTtlW1RhKFwiZ2V0X3RydXN0ZWRfXCIrYyldPWZ1bmN0aW9uKGIpe3JldHVybiBmKGEsYil9O2VbVGEoXCJ0cnVzdF9hc19cIitjKV09ZnVuY3Rpb24oYil7cmV0dXJuIGgoYSxiKX19KTtyZXR1cm4gZX1dfWZ1bmN0aW9uIGJlKCl7dGhpcy4kZ2V0PVtcIiR3aW5kb3dcIixcIiRkb2N1bWVudFwiLGZ1bmN0aW9uKGIsYSl7dmFyIGM9e30sZD1ZKCgvYW5kcm9pZCAoXFxkKykvLmV4ZWMoSygoYi5uYXZpZ2F0b3J8fHt9KS51c2VyQWdlbnQpKXx8W10pWzFdKSxlPS9Cb3hlZS9pLnRlc3QoKGIubmF2aWdhdG9yfHx7fSkudXNlckFnZW50KSxnPWFbMF18fHt9LGY9Zy5kb2N1bWVudE1vZGUsaCxsPS9eKE1venx3ZWJraXR8T3xtcykoPz1bQS1aXSkvLGs9Zy5ib2R5JiZnLmJvZHkuc3R5bGUsXG5tPSExLG49ITE7aWYoayl7Zm9yKHZhciBwIGluIGspaWYobT1sLmV4ZWMocCkpe2g9bVswXTtoPWguc3Vic3RyKDAsMSkudG9VcHBlckNhc2UoKStoLnN1YnN0cigxKTticmVha31ofHwoaD1cIldlYmtpdE9wYWNpdHlcImluIGsmJlwid2Via2l0XCIpO209ISEoXCJ0cmFuc2l0aW9uXCJpbiBrfHxoK1wiVHJhbnNpdGlvblwiaW4gayk7bj0hIShcImFuaW1hdGlvblwiaW4ga3x8aCtcIkFuaW1hdGlvblwiaW4gayk7IWR8fG0mJm58fChtPXcoZy5ib2R5LnN0eWxlLndlYmtpdFRyYW5zaXRpb24pLG49dyhnLmJvZHkuc3R5bGUud2Via2l0QW5pbWF0aW9uKSl9cmV0dXJue2hpc3Rvcnk6ISghYi5oaXN0b3J5fHwhYi5oaXN0b3J5LnB1c2hTdGF0ZXx8ND5kfHxlKSxoYXNoY2hhbmdlOlwib25oYXNoY2hhbmdlXCJpbiBiJiYoIWZ8fDc8ZiksaGFzRXZlbnQ6ZnVuY3Rpb24oYSl7aWYoXCJpbnB1dFwiPT1hJiY5PT1TKXJldHVybiExO2lmKEUoY1thXSkpe3ZhciBiPWcuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjW2FdPVwib25cIitcbmEgaW4gYn1yZXR1cm4gY1thXX0sY3NwOlZiKCksdmVuZG9yUHJlZml4OmgsdHJhbnNpdGlvbnM6bSxhbmltYXRpb25zOm4sYW5kcm9pZDpkLG1zaWU6Uyxtc2llRG9jdW1lbnRNb2RlOmZ9fV19ZnVuY3Rpb24gZGUoKXt0aGlzLiRnZXQ9W1wiJHJvb3RTY29wZVwiLFwiJGJyb3dzZXJcIixcIiRxXCIsXCIkZXhjZXB0aW9uSGFuZGxlclwiLGZ1bmN0aW9uKGIsYSxjLGQpe2Z1bmN0aW9uIGUoZSxoLGwpe3ZhciBrPWMuZGVmZXIoKSxtPWsucHJvbWlzZSxuPUIobCkmJiFsO2g9YS5kZWZlcihmdW5jdGlvbigpe3RyeXtrLnJlc29sdmUoZSgpKX1jYXRjaChhKXtrLnJlamVjdChhKSxkKGEpfWZpbmFsbHl7ZGVsZXRlIGdbbS4kJHRpbWVvdXRJZF19bnx8Yi4kYXBwbHkoKX0saCk7bS4kJHRpbWVvdXRJZD1oO2dbaF09aztyZXR1cm4gbX12YXIgZz17fTtlLmNhbmNlbD1mdW5jdGlvbihiKXtyZXR1cm4gYiYmYi4kJHRpbWVvdXRJZCBpbiBnPyhnW2IuJCR0aW1lb3V0SWRdLnJlamVjdChcImNhbmNlbGVkXCIpLFxuZGVsZXRlIGdbYi4kJHRpbWVvdXRJZF0sYS5kZWZlci5jYW5jZWwoYi4kJHRpbWVvdXRJZCkpOiExfTtyZXR1cm4gZX1dfWZ1bmN0aW9uIHNhKGIsYSl7dmFyIGM9YjtTJiYoVy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsYyksYz1XLmhyZWYpO1cuc2V0QXR0cmlidXRlKFwiaHJlZlwiLGMpO3JldHVybntocmVmOlcuaHJlZixwcm90b2NvbDpXLnByb3RvY29sP1cucHJvdG9jb2wucmVwbGFjZSgvOiQvLFwiXCIpOlwiXCIsaG9zdDpXLmhvc3Qsc2VhcmNoOlcuc2VhcmNoP1cuc2VhcmNoLnJlcGxhY2UoL15cXD8vLFwiXCIpOlwiXCIsaGFzaDpXLmhhc2g/Vy5oYXNoLnJlcGxhY2UoL14jLyxcIlwiKTpcIlwiLGhvc3RuYW1lOlcuaG9zdG5hbWUscG9ydDpXLnBvcnQscGF0aG5hbWU6XCIvXCI9PT1XLnBhdGhuYW1lLmNoYXJBdCgwKT9XLnBhdGhuYW1lOlwiL1wiK1cucGF0aG5hbWV9fWZ1bmN0aW9uIEliKGIpe2I9dyhiKT9zYShiKTpiO3JldHVybiBiLnByb3RvY29sPT09SGMucHJvdG9jb2wmJmIuaG9zdD09PUhjLmhvc3R9XG5mdW5jdGlvbiBlZSgpe3RoaXMuJGdldD1hYShPKX1mdW5jdGlvbiBnYyhiKXtmdW5jdGlvbiBhKGQsZSl7aWYoWChkKSl7dmFyIGc9e307cShkLGZ1bmN0aW9uKGIsYyl7Z1tjXT1hKGMsYil9KTtyZXR1cm4gZ31yZXR1cm4gYi5mYWN0b3J5KGQrYyxlKX12YXIgYz1cIkZpbHRlclwiO3RoaXMucmVnaXN0ZXI9YTt0aGlzLiRnZXQ9W1wiJGluamVjdG9yXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGIpe3JldHVybiBhLmdldChiK2MpfX1dO2EoXCJjdXJyZW5jeVwiLEljKTthKFwiZGF0ZVwiLEpjKTthKFwiZmlsdGVyXCIsQmUpO2EoXCJqc29uXCIsQ2UpO2EoXCJsaW1pdFRvXCIsRGUpO2EoXCJsb3dlcmNhc2VcIixFZSk7YShcIm51bWJlclwiLEtjKTthKFwib3JkZXJCeVwiLExjKTthKFwidXBwZXJjYXNlXCIsRmUpfWZ1bmN0aW9uIEJlKCl7cmV0dXJuIGZ1bmN0aW9uKGIsYSxjKXtpZighTShiKSlyZXR1cm4gYjt2YXIgZD10eXBlb2YgYyxlPVtdO2UuY2hlY2s9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPTA7YjxlLmxlbmd0aDtiKyspaWYoIWVbYl0oYSkpcmV0dXJuITE7XG5yZXR1cm4hMH07XCJmdW5jdGlvblwiIT09ZCYmKGM9XCJib29sZWFuXCI9PT1kJiZjP2Z1bmN0aW9uKGEsYil7cmV0dXJuIEVhLmVxdWFscyhhLGIpfTpmdW5jdGlvbihhLGIpe2lmKGEmJmImJlwib2JqZWN0XCI9PT10eXBlb2YgYSYmXCJvYmplY3RcIj09PXR5cGVvZiBiKXtmb3IodmFyIGQgaW4gYSlpZihcIiRcIiE9PWQuY2hhckF0KDApJiZGYy5jYWxsKGEsZCkmJmMoYVtkXSxiW2RdKSlyZXR1cm4hMDtyZXR1cm4hMX1iPShcIlwiK2IpLnRvTG93ZXJDYXNlKCk7cmV0dXJuLTE8KFwiXCIrYSkudG9Mb3dlckNhc2UoKS5pbmRleE9mKGIpfSk7dmFyIGc9ZnVuY3Rpb24oYSxiKXtpZihcInN0cmluZ1wiPT10eXBlb2YgYiYmXCIhXCI9PT1iLmNoYXJBdCgwKSlyZXR1cm4hZyhhLGIuc3Vic3RyKDEpKTtzd2l0Y2godHlwZW9mIGEpe2Nhc2UgXCJib29sZWFuXCI6Y2FzZSBcIm51bWJlclwiOmNhc2UgXCJzdHJpbmdcIjpyZXR1cm4gYyhhLGIpO2Nhc2UgXCJvYmplY3RcIjpzd2l0Y2godHlwZW9mIGIpe2Nhc2UgXCJvYmplY3RcIjpyZXR1cm4gYyhhLFxuYik7ZGVmYXVsdDpmb3IodmFyIGQgaW4gYSlpZihcIiRcIiE9PWQuY2hhckF0KDApJiZnKGFbZF0sYikpcmV0dXJuITB9cmV0dXJuITE7Y2FzZSBcImFycmF5XCI6Zm9yKGQ9MDtkPGEubGVuZ3RoO2QrKylpZihnKGFbZF0sYikpcmV0dXJuITA7cmV0dXJuITE7ZGVmYXVsdDpyZXR1cm4hMX19O3N3aXRjaCh0eXBlb2YgYSl7Y2FzZSBcImJvb2xlYW5cIjpjYXNlIFwibnVtYmVyXCI6Y2FzZSBcInN0cmluZ1wiOmE9eyQ6YX07Y2FzZSBcIm9iamVjdFwiOmZvcih2YXIgZiBpbiBhKShmdW5jdGlvbihiKXtcInVuZGVmaW5lZFwiIT10eXBlb2YgYVtiXSYmZS5wdXNoKGZ1bmN0aW9uKGMpe3JldHVybiBnKFwiJFwiPT1iP2M6YyYmY1tiXSxhW2JdKX0pfSkoZik7YnJlYWs7Y2FzZSBcImZ1bmN0aW9uXCI6ZS5wdXNoKGEpO2JyZWFrO2RlZmF1bHQ6cmV0dXJuIGJ9ZD1bXTtmb3IoZj0wO2Y8Yi5sZW5ndGg7ZisrKXt2YXIgaD1iW2ZdO2UuY2hlY2soaCkmJmQucHVzaChoKX1yZXR1cm4gZH19ZnVuY3Rpb24gSWMoYil7dmFyIGE9XG5iLk5VTUJFUl9GT1JNQVRTO3JldHVybiBmdW5jdGlvbihiLGQpe0UoZCkmJihkPWEuQ1VSUkVOQ1lfU1lNKTtyZXR1cm4gTWMoYixhLlBBVFRFUk5TWzFdLGEuR1JPVVBfU0VQLGEuREVDSU1BTF9TRVAsMikucmVwbGFjZSgvXFx1MDBBNC9nLGQpfX1mdW5jdGlvbiBLYyhiKXt2YXIgYT1iLk5VTUJFUl9GT1JNQVRTO3JldHVybiBmdW5jdGlvbihiLGQpe3JldHVybiBNYyhiLGEuUEFUVEVSTlNbMF0sYS5HUk9VUF9TRVAsYS5ERUNJTUFMX1NFUCxkKX19ZnVuY3Rpb24gTWMoYixhLGMsZCxlKXtpZihudWxsPT1ifHwhaXNGaW5pdGUoYil8fFgoYikpcmV0dXJuXCJcIjt2YXIgZz0wPmI7Yj1NYXRoLmFicyhiKTt2YXIgZj1iK1wiXCIsaD1cIlwiLGw9W10saz0hMTtpZigtMSE9PWYuaW5kZXhPZihcImVcIikpe3ZhciBtPWYubWF0Y2goLyhbXFxkXFwuXSspZSgtPykoXFxkKykvKTttJiZcIi1cIj09bVsyXSYmbVszXT5lKzE/Zj1cIjBcIjooaD1mLGs9ITApfWlmKGspMDxlJiYoLTE8YiYmMT5iKSYmKGg9Yi50b0ZpeGVkKGUpKTtcbmVsc2V7Zj0oZi5zcGxpdChOYylbMV18fFwiXCIpLmxlbmd0aDtFKGUpJiYoZT1NYXRoLm1pbihNYXRoLm1heChhLm1pbkZyYWMsZiksYS5tYXhGcmFjKSk7Zj1NYXRoLnBvdygxMCxlKTtiPU1hdGgucm91bmQoYipmKS9mO2I9KFwiXCIrYikuc3BsaXQoTmMpO2Y9YlswXTtiPWJbMV18fFwiXCI7dmFyIG09MCxuPWEubGdTaXplLHA9YS5nU2l6ZTtpZihmLmxlbmd0aD49bitwKWZvcihtPWYubGVuZ3RoLW4saz0wO2s8bTtrKyspMD09PShtLWspJXAmJjAhPT1rJiYoaCs9YyksaCs9Zi5jaGFyQXQoayk7Zm9yKGs9bTtrPGYubGVuZ3RoO2srKykwPT09KGYubGVuZ3RoLWspJW4mJjAhPT1rJiYoaCs9YyksaCs9Zi5jaGFyQXQoayk7Zm9yKDtiLmxlbmd0aDxlOyliKz1cIjBcIjtlJiZcIjBcIiE9PWUmJihoKz1kK2Iuc3Vic3RyKDAsZSkpfWwucHVzaChnP2EubmVnUHJlOmEucG9zUHJlKTtsLnB1c2goaCk7bC5wdXNoKGc/YS5uZWdTdWY6YS5wb3NTdWYpO3JldHVybiBsLmpvaW4oXCJcIil9ZnVuY3Rpb24gT2IoYixcbmEsYyl7dmFyIGQ9XCJcIjswPmImJihkPVwiLVwiLGI9LWIpO2ZvcihiPVwiXCIrYjtiLmxlbmd0aDxhOyliPVwiMFwiK2I7YyYmKGI9Yi5zdWJzdHIoYi5sZW5ndGgtYSkpO3JldHVybiBkK2J9ZnVuY3Rpb24gJChiLGEsYyxkKXtjPWN8fDA7cmV0dXJuIGZ1bmN0aW9uKGUpe2U9ZVtcImdldFwiK2JdKCk7aWYoMDxjfHxlPi1jKWUrPWM7MD09PWUmJi0xMj09YyYmKGU9MTIpO3JldHVybiBPYihlLGEsZCl9fWZ1bmN0aW9uIHBiKGIsYSl7cmV0dXJuIGZ1bmN0aW9uKGMsZCl7dmFyIGU9Y1tcImdldFwiK2JdKCksZz1GYShhP1wiU0hPUlRcIitiOmIpO3JldHVybiBkW2ddW2VdfX1mdW5jdGlvbiBKYyhiKXtmdW5jdGlvbiBhKGEpe3ZhciBiO2lmKGI9YS5tYXRjaChjKSl7YT1uZXcgRGF0ZSgwKTt2YXIgZz0wLGY9MCxoPWJbOF0/YS5zZXRVVENGdWxsWWVhcjphLnNldEZ1bGxZZWFyLGw9Yls4XT9hLnNldFVUQ0hvdXJzOmEuc2V0SG91cnM7Yls5XSYmKGc9WShiWzldK2JbMTBdKSxmPVkoYls5XStiWzExXSkpO1xuaC5jYWxsKGEsWShiWzFdKSxZKGJbMl0pLTEsWShiWzNdKSk7Zz1ZKGJbNF18fDApLWc7Zj1ZKGJbNV18fDApLWY7aD1ZKGJbNl18fDApO2I9TWF0aC5yb3VuZCgxRTMqcGFyc2VGbG9hdChcIjAuXCIrKGJbN118fDApKSk7bC5jYWxsKGEsZyxmLGgsYil9cmV0dXJuIGF9dmFyIGM9L14oXFxkezR9KS0/KFxcZFxcZCktPyhcXGRcXGQpKD86VChcXGRcXGQpKD86Oj8oXFxkXFxkKSg/Ojo/KFxcZFxcZCkoPzpcXC4oXFxkKykpPyk/KT8oWnwoWystXSkoXFxkXFxkKTo/KFxcZFxcZCkpPyk/JC87cmV0dXJuIGZ1bmN0aW9uKGMsZSl7dmFyIGc9XCJcIixmPVtdLGgsbDtlPWV8fFwibWVkaXVtRGF0ZVwiO2U9Yi5EQVRFVElNRV9GT1JNQVRTW2VdfHxlO3coYykmJihjPUdlLnRlc3QoYyk/WShjKTphKGMpKTt2YihjKSYmKGM9bmV3IERhdGUoYykpO2lmKCFOYShjKSlyZXR1cm4gYztmb3IoO2U7KShsPUhlLmV4ZWMoZSkpPyhmPWYuY29uY2F0KHlhLmNhbGwobCwxKSksZT1mLnBvcCgpKTooZi5wdXNoKGUpLGU9bnVsbCk7cShmLGZ1bmN0aW9uKGEpe2g9XG5JZVthXTtnKz1oP2goYyxiLkRBVEVUSU1FX0ZPUk1BVFMpOmEucmVwbGFjZSgvKF4nfCckKS9nLFwiXCIpLnJlcGxhY2UoLycnL2csXCInXCIpfSk7cmV0dXJuIGd9fWZ1bmN0aW9uIENlKCl7cmV0dXJuIGZ1bmN0aW9uKGIpe3JldHVybiBxYShiLCEwKX19ZnVuY3Rpb24gRGUoKXtyZXR1cm4gZnVuY3Rpb24oYixhKXtpZighTShiKSYmIXcoYikpcmV0dXJuIGI7YT1ZKGEpO2lmKHcoYikpcmV0dXJuIGE/MDw9YT9iLnNsaWNlKDAsYSk6Yi5zbGljZShhLGIubGVuZ3RoKTpcIlwiO3ZhciBjPVtdLGQsZTthPmIubGVuZ3RoP2E9Yi5sZW5ndGg6YTwtYi5sZW5ndGgmJihhPS1iLmxlbmd0aCk7MDxhPyhkPTAsZT1hKTooZD1iLmxlbmd0aCthLGU9Yi5sZW5ndGgpO2Zvcig7ZDxlO2QrKyljLnB1c2goYltkXSk7cmV0dXJuIGN9fWZ1bmN0aW9uIExjKGIpe3JldHVybiBmdW5jdGlvbihhLGMsZCl7ZnVuY3Rpb24gZShhLGIpe3JldHVybiBRYShiKT9mdW5jdGlvbihiLGMpe3JldHVybiBhKGMsYil9OmF9XG5mdW5jdGlvbiBnKGEsYil7dmFyIGM9dHlwZW9mIGEsZD10eXBlb2YgYjtyZXR1cm4gYz09ZD8oXCJzdHJpbmdcIj09YyYmKGE9YS50b0xvd2VyQ2FzZSgpLGI9Yi50b0xvd2VyQ2FzZSgpKSxhPT09Yj8wOmE8Yj8tMToxKTpjPGQ/LTE6MX1pZighTShhKXx8IWMpcmV0dXJuIGE7Yz1NKGMpP2M6W2NdO2M9VWMoYyxmdW5jdGlvbihhKXt2YXIgYz0hMSxkPWF8fERhO2lmKHcoYSkpe2lmKFwiK1wiPT1hLmNoYXJBdCgwKXx8XCItXCI9PWEuY2hhckF0KDApKWM9XCItXCI9PWEuY2hhckF0KDApLGE9YS5zdWJzdHJpbmcoMSk7ZD1iKGEpO2lmKGQuY29uc3RhbnQpe3ZhciBmPWQoKTtyZXR1cm4gZShmdW5jdGlvbihhLGIpe3JldHVybiBnKGFbZl0sYltmXSl9LGMpfX1yZXR1cm4gZShmdW5jdGlvbihhLGIpe3JldHVybiBnKGQoYSksZChiKSl9LGMpfSk7Zm9yKHZhciBmPVtdLGg9MDtoPGEubGVuZ3RoO2grKylmLnB1c2goYVtoXSk7cmV0dXJuIGYuc29ydChlKGZ1bmN0aW9uKGEsYil7Zm9yKHZhciBkPVxuMDtkPGMubGVuZ3RoO2QrKyl7dmFyIGU9Y1tkXShhLGIpO2lmKDAhPT1lKXJldHVybiBlfXJldHVybiAwfSxkKSl9fWZ1bmN0aW9uIHZhKGIpe1AoYikmJihiPXtsaW5rOmJ9KTtiLnJlc3RyaWN0PWIucmVzdHJpY3R8fFwiQUNcIjtyZXR1cm4gYWEoYil9ZnVuY3Rpb24gT2MoYixhLGMsZCl7ZnVuY3Rpb24gZShhLGMpe2M9Yz9cIi1cIitmYihjLFwiLVwiKTpcIlwiO2QucmVtb3ZlQ2xhc3MoYiwoYT9xYjpyYikrYyk7ZC5hZGRDbGFzcyhiLChhP3JiOnFiKStjKX12YXIgZz10aGlzLGY9Yi5wYXJlbnQoKS5jb250cm9sbGVyKFwiZm9ybVwiKXx8c2IsaD0wLGw9Zy4kZXJyb3I9e30saz1bXTtnLiRuYW1lPWEubmFtZXx8YS5uZ0Zvcm07Zy4kZGlydHk9ITE7Zy4kcHJpc3RpbmU9ITA7Zy4kdmFsaWQ9ITA7Zy4kaW52YWxpZD0hMTtmLiRhZGRDb250cm9sKGcpO2IuYWRkQ2xhc3MoTGEpO2UoITApO2cuJGFkZENvbnRyb2w9ZnVuY3Rpb24oYSl7QWEoYS4kbmFtZSxcImlucHV0XCIpO2sucHVzaChhKTthLiRuYW1lJiZcbihnW2EuJG5hbWVdPWEpfTtnLiRyZW1vdmVDb250cm9sPWZ1bmN0aW9uKGEpe2EuJG5hbWUmJmdbYS4kbmFtZV09PT1hJiZkZWxldGUgZ1thLiRuYW1lXTtxKGwsZnVuY3Rpb24oYixjKXtnLiRzZXRWYWxpZGl0eShjLCEwLGEpfSk7T2EoayxhKX07Zy4kc2V0VmFsaWRpdHk9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkPWxbYV07aWYoYilkJiYoT2EoZCxjKSxkLmxlbmd0aHx8KGgtLSxofHwoZShiKSxnLiR2YWxpZD0hMCxnLiRpbnZhbGlkPSExKSxsW2FdPSExLGUoITAsYSksZi4kc2V0VmFsaWRpdHkoYSwhMCxnKSkpO2Vsc2V7aHx8ZShiKTtpZihkKXtpZigtMSE9ZGIoZCxjKSlyZXR1cm59ZWxzZSBsW2FdPWQ9W10saCsrLGUoITEsYSksZi4kc2V0VmFsaWRpdHkoYSwhMSxnKTtkLnB1c2goYyk7Zy4kdmFsaWQ9ITE7Zy4kaW52YWxpZD0hMH19O2cuJHNldERpcnR5PWZ1bmN0aW9uKCl7ZC5yZW1vdmVDbGFzcyhiLExhKTtkLmFkZENsYXNzKGIsdGIpO2cuJGRpcnR5PSEwO2cuJHByaXN0aW5lPVxuITE7Zi4kc2V0RGlydHkoKX07Zy4kc2V0UHJpc3RpbmU9ZnVuY3Rpb24oKXtkLnJlbW92ZUNsYXNzKGIsdGIpO2QuYWRkQ2xhc3MoYixMYSk7Zy4kZGlydHk9ITE7Zy4kcHJpc3RpbmU9ITA7cShrLGZ1bmN0aW9uKGEpe2EuJHNldFByaXN0aW5lKCl9KX19ZnVuY3Rpb24gcGEoYixhLGMsZCl7Yi4kc2V0VmFsaWRpdHkoYSxjKTtyZXR1cm4gYz9kOnN9ZnVuY3Rpb24gSmUoYixhLGMpe3ZhciBkPWMucHJvcChcInZhbGlkaXR5XCIpO1goZCkmJmIuJHBhcnNlcnMucHVzaChmdW5jdGlvbihjKXtpZihiLiRlcnJvclthXXx8IShkLmJhZElucHV0fHxkLmN1c3RvbUVycm9yfHxkLnR5cGVNaXNtYXRjaCl8fGQudmFsdWVNaXNzaW5nKXJldHVybiBjO2IuJHNldFZhbGlkaXR5KGEsITEpfSl9ZnVuY3Rpb24gdWIoYixhLGMsZCxlLGcpe3ZhciBmPWEucHJvcChcInZhbGlkaXR5XCIpO2lmKCFlLmFuZHJvaWQpe3ZhciBoPSExO2Eub24oXCJjb21wb3NpdGlvbnN0YXJ0XCIsZnVuY3Rpb24oYSl7aD0hMH0pO1xuYS5vbihcImNvbXBvc2l0aW9uZW5kXCIsZnVuY3Rpb24oKXtoPSExO2woKX0pfXZhciBsPWZ1bmN0aW9uKCl7aWYoIWgpe3ZhciBlPWEudmFsKCk7UWEoYy5uZ1RyaW18fFwiVFwiKSYmKGU9Y2EoZSkpO2lmKGQuJHZpZXdWYWx1ZSE9PWV8fGYmJlwiXCI9PT1lJiYhZi52YWx1ZU1pc3NpbmcpYi4kJHBoYXNlP2QuJHNldFZpZXdWYWx1ZShlKTpiLiRhcHBseShmdW5jdGlvbigpe2QuJHNldFZpZXdWYWx1ZShlKX0pfX07aWYoZS5oYXNFdmVudChcImlucHV0XCIpKWEub24oXCJpbnB1dFwiLGwpO2Vsc2V7dmFyIGssbT1mdW5jdGlvbigpe2t8fChrPWcuZGVmZXIoZnVuY3Rpb24oKXtsKCk7az1udWxsfSkpfTthLm9uKFwia2V5ZG93blwiLGZ1bmN0aW9uKGEpe2E9YS5rZXlDb2RlOzkxPT09YXx8KDE1PGEmJjE5PmF8fDM3PD1hJiY0MD49YSl8fG0oKX0pO2lmKGUuaGFzRXZlbnQoXCJwYXN0ZVwiKSlhLm9uKFwicGFzdGUgY3V0XCIsbSl9YS5vbihcImNoYW5nZVwiLGwpO2QuJHJlbmRlcj1mdW5jdGlvbigpe2EudmFsKGQuJGlzRW1wdHkoZC4kdmlld1ZhbHVlKT9cblwiXCI6ZC4kdmlld1ZhbHVlKX07dmFyIG49Yy5uZ1BhdHRlcm47biYmKChlPW4ubWF0Y2goL15cXC8oLiopXFwvKFtnaW1dKikkLykpPyhuPVJlZ0V4cChlWzFdLGVbMl0pLGU9ZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGQsXCJwYXR0ZXJuXCIsZC4kaXNFbXB0eShhKXx8bi50ZXN0KGEpLGEpfSk6ZT1mdW5jdGlvbihjKXt2YXIgZT1iLiRldmFsKG4pO2lmKCFlfHwhZS50ZXN0KXRocm93IHQoXCJuZ1BhdHRlcm5cIikoXCJub3JlZ2V4cFwiLG4sZSxoYShhKSk7cmV0dXJuIHBhKGQsXCJwYXR0ZXJuXCIsZC4kaXNFbXB0eShjKXx8ZS50ZXN0KGMpLGMpfSxkLiRmb3JtYXR0ZXJzLnB1c2goZSksZC4kcGFyc2Vycy5wdXNoKGUpKTtpZihjLm5nTWlubGVuZ3RoKXt2YXIgcD1ZKGMubmdNaW5sZW5ndGgpO2U9ZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGQsXCJtaW5sZW5ndGhcIixkLiRpc0VtcHR5KGEpfHxhLmxlbmd0aD49cCxhKX07ZC4kcGFyc2Vycy5wdXNoKGUpO2QuJGZvcm1hdHRlcnMucHVzaChlKX1pZihjLm5nTWF4bGVuZ3RoKXt2YXIgcj1cblkoYy5uZ01heGxlbmd0aCk7ZT1mdW5jdGlvbihhKXtyZXR1cm4gcGEoZCxcIm1heGxlbmd0aFwiLGQuJGlzRW1wdHkoYSl8fGEubGVuZ3RoPD1yLGEpfTtkLiRwYXJzZXJzLnB1c2goZSk7ZC4kZm9ybWF0dGVycy5wdXNoKGUpfX1mdW5jdGlvbiBQYihiLGEpe2I9XCJuZ0NsYXNzXCIrYjtyZXR1cm5bXCIkYW5pbWF0ZVwiLGZ1bmN0aW9uKGMpe2Z1bmN0aW9uIGQoYSxiKXt2YXIgYz1bXSxkPTA7YTpmb3IoO2Q8YS5sZW5ndGg7ZCsrKXtmb3IodmFyIGU9YVtkXSxtPTA7bTxiLmxlbmd0aDttKyspaWYoZT09YlttXSljb250aW51ZSBhO2MucHVzaChlKX1yZXR1cm4gY31mdW5jdGlvbiBlKGEpe2lmKCFNKGEpKXtpZih3KGEpKXJldHVybiBhLnNwbGl0KFwiIFwiKTtpZihYKGEpKXt2YXIgYj1bXTtxKGEsZnVuY3Rpb24oYSxjKXthJiZiLnB1c2goYyl9KTtyZXR1cm4gYn19cmV0dXJuIGF9cmV0dXJue3Jlc3RyaWN0OlwiQUNcIixsaW5rOmZ1bmN0aW9uKGcsZixoKXtmdW5jdGlvbiBsKGEsYil7dmFyIGM9XG5mLmRhdGEoXCIkY2xhc3NDb3VudHNcIil8fHt9LGQ9W107cShhLGZ1bmN0aW9uKGEpe2lmKDA8Ynx8Y1thXSljW2FdPShjW2FdfHwwKStiLGNbYV09PT0rKDA8YikmJmQucHVzaChhKX0pO2YuZGF0YShcIiRjbGFzc0NvdW50c1wiLGMpO3JldHVybiBkLmpvaW4oXCIgXCIpfWZ1bmN0aW9uIGsoYil7aWYoITA9PT1hfHxnLiRpbmRleCUyPT09YSl7dmFyIGs9ZShifHxbXSk7aWYoIW0pe3ZhciByPWwoaywxKTtoLiRhZGRDbGFzcyhyKX1lbHNlIGlmKCF4YShiLG0pKXt2YXIgcT1lKG0pLHI9ZChrLHEpLGs9ZChxLGspLGs9bChrLC0xKSxyPWwociwxKTswPT09ci5sZW5ndGg/Yy5yZW1vdmVDbGFzcyhmLGspOjA9PT1rLmxlbmd0aD9jLmFkZENsYXNzKGYscik6Yy5zZXRDbGFzcyhmLHIsayl9fW09YmEoYil9dmFyIG07Zy4kd2F0Y2goaFtiXSxrLCEwKTtoLiRvYnNlcnZlKFwiY2xhc3NcIixmdW5jdGlvbihhKXtrKGcuJGV2YWwoaFtiXSkpfSk7XCJuZ0NsYXNzXCIhPT1iJiZnLiR3YXRjaChcIiRpbmRleFwiLFxuZnVuY3Rpb24oYyxkKXt2YXIgZj1jJjE7aWYoZiE9PWQmMSl7dmFyIGs9ZShnLiRldmFsKGhbYl0pKTtmPT09YT8oZj1sKGssMSksaC4kYWRkQ2xhc3MoZikpOihmPWwoaywtMSksaC4kcmVtb3ZlQ2xhc3MoZikpfX0pfX19XX12YXIgSz1mdW5jdGlvbihiKXtyZXR1cm4gdyhiKT9iLnRvTG93ZXJDYXNlKCk6Yn0sRmM9T2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eSxGYT1mdW5jdGlvbihiKXtyZXR1cm4gdyhiKT9iLnRvVXBwZXJDYXNlKCk6Yn0sUyx5LEdhLHlhPVtdLnNsaWNlLEtlPVtdLnB1c2gsd2E9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyxQYT10KFwibmdcIiksRWE9Ty5hbmd1bGFyfHwoTy5hbmd1bGFyPXt9KSxTYSxLYSxrYT1bXCIwXCIsXCIwXCIsXCIwXCJdO1M9WSgoL21zaWUgKFxcZCspLy5leGVjKEsobmF2aWdhdG9yLnVzZXJBZ2VudCkpfHxbXSlbMV0pO2lzTmFOKFMpJiYoUz1ZKCgvdHJpZGVudFxcLy4qOyBydjooXFxkKykvLmV4ZWMoSyhuYXZpZ2F0b3IudXNlckFnZW50KSl8fFxuW10pWzFdKSk7Qy4kaW5qZWN0PVtdO0RhLiRpbmplY3Q9W107dmFyIGNhPWZ1bmN0aW9uKCl7cmV0dXJuIFN0cmluZy5wcm90b3R5cGUudHJpbT9mdW5jdGlvbihiKXtyZXR1cm4gdyhiKT9iLnRyaW0oKTpifTpmdW5jdGlvbihiKXtyZXR1cm4gdyhiKT9iLnJlcGxhY2UoL15cXHNcXHMqLyxcIlwiKS5yZXBsYWNlKC9cXHNcXHMqJC8sXCJcIik6Yn19KCk7S2E9OT5TP2Z1bmN0aW9uKGIpe2I9Yi5ub2RlTmFtZT9iOmJbMF07cmV0dXJuIGIuc2NvcGVOYW1lJiZcIkhUTUxcIiE9Yi5zY29wZU5hbWU/RmEoYi5zY29wZU5hbWUrXCI6XCIrYi5ub2RlTmFtZSk6Yi5ub2RlTmFtZX06ZnVuY3Rpb24oYil7cmV0dXJuIGIubm9kZU5hbWU/Yi5ub2RlTmFtZTpiWzBdLm5vZGVOYW1lfTt2YXIgWGM9L1tBLVpdL2csJGM9e2Z1bGw6XCIxLjIuMTZcIixtYWpvcjoxLG1pbm9yOjIsZG90OjE2LGNvZGVOYW1lOlwiYmFkZ2VyLWVudW1lcmF0aW9uXCJ9LFVhPU4uY2FjaGU9e30sZ2I9Ti5leHBhbmRvPVwibmctXCIrKG5ldyBEYXRlKS5nZXRUaW1lKCksXG5tZT0xLFBjPU8uZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcj9mdW5jdGlvbihiLGEsYyl7Yi5hZGRFdmVudExpc3RlbmVyKGEsYywhMSl9OmZ1bmN0aW9uKGIsYSxjKXtiLmF0dGFjaEV2ZW50KFwib25cIithLGMpfSxGYj1PLmRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXI/ZnVuY3Rpb24oYixhLGMpe2IucmVtb3ZlRXZlbnRMaXN0ZW5lcihhLGMsITEpfTpmdW5jdGlvbihiLGEsYyl7Yi5kZXRhY2hFdmVudChcIm9uXCIrYSxjKX07Ti5fZGF0YT1mdW5jdGlvbihiKXtyZXR1cm4gdGhpcy5jYWNoZVtiW3RoaXMuZXhwYW5kb11dfHx7fX07dmFyIGhlPS8oW1xcOlxcLVxcX10rKC4pKS9nLGllPS9ebW96KFtBLVpdKS8sQmI9dChcImpxTGl0ZVwiKSxqZT0vXjwoXFx3KylcXHMqXFwvPz4oPzo8XFwvXFwxPnwpJC8sQ2I9Lzx8JiM/XFx3KzsvLGtlPS88KFtcXHc6XSspLyxsZT0vPCg/IWFyZWF8YnJ8Y29sfGVtYmVkfGhyfGltZ3xpbnB1dHxsaW5rfG1ldGF8cGFyYW0pKChbXFx3Ol0rKVtePl0qKVxcLz4vZ2ksZWE9XG57b3B0aW9uOlsxLCc8c2VsZWN0IG11bHRpcGxlPVwibXVsdGlwbGVcIj4nLFwiPC9zZWxlY3Q+XCJdLHRoZWFkOlsxLFwiPHRhYmxlPlwiLFwiPC90YWJsZT5cIl0sY29sOlsyLFwiPHRhYmxlPjxjb2xncm91cD5cIixcIjwvY29sZ3JvdXA+PC90YWJsZT5cIl0sdHI6WzIsXCI8dGFibGU+PHRib2R5PlwiLFwiPC90Ym9keT48L3RhYmxlPlwiXSx0ZDpbMyxcIjx0YWJsZT48dGJvZHk+PHRyPlwiLFwiPC90cj48L3Rib2R5PjwvdGFibGU+XCJdLF9kZWZhdWx0OlswLFwiXCIsXCJcIl19O2VhLm9wdGdyb3VwPWVhLm9wdGlvbjtlYS50Ym9keT1lYS50Zm9vdD1lYS5jb2xncm91cD1lYS5jYXB0aW9uPWVhLnRoZWFkO2VhLnRoPWVhLnRkO3ZhciBKYT1OLnByb3RvdHlwZT17cmVhZHk6ZnVuY3Rpb24oYil7ZnVuY3Rpb24gYSgpe2N8fChjPSEwLGIoKSl9dmFyIGM9ITE7XCJjb21wbGV0ZVwiPT09VS5yZWFkeVN0YXRlP3NldFRpbWVvdXQoYSk6KHRoaXMub24oXCJET01Db250ZW50TG9hZGVkXCIsYSksTihPKS5vbihcImxvYWRcIixhKSl9LHRvU3RyaW5nOmZ1bmN0aW9uKCl7dmFyIGI9XG5bXTtxKHRoaXMsZnVuY3Rpb24oYSl7Yi5wdXNoKFwiXCIrYSl9KTtyZXR1cm5cIltcIitiLmpvaW4oXCIsIFwiKStcIl1cIn0sZXE6ZnVuY3Rpb24oYil7cmV0dXJuIDA8PWI/eSh0aGlzW2JdKTp5KHRoaXNbdGhpcy5sZW5ndGgrYl0pfSxsZW5ndGg6MCxwdXNoOktlLHNvcnQ6W10uc29ydCxzcGxpY2U6W10uc3BsaWNlfSxrYj17fTtxKFwibXVsdGlwbGUgc2VsZWN0ZWQgY2hlY2tlZCBkaXNhYmxlZCByZWFkT25seSByZXF1aXJlZCBvcGVuXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGIpe2tiW0soYildPWJ9KTt2YXIgbmM9e307cShcImlucHV0IHNlbGVjdCBvcHRpb24gdGV4dGFyZWEgYnV0dG9uIGZvcm0gZGV0YWlsc1wiLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihiKXtuY1tGYShiKV09ITB9KTtxKHtkYXRhOmpjLGluaGVyaXRlZERhdGE6amIsc2NvcGU6ZnVuY3Rpb24oYil7cmV0dXJuIHkoYikuZGF0YShcIiRzY29wZVwiKXx8amIoYi5wYXJlbnROb2RlfHxiLFtcIiRpc29sYXRlU2NvcGVcIixcIiRzY29wZVwiXSl9LFxuaXNvbGF0ZVNjb3BlOmZ1bmN0aW9uKGIpe3JldHVybiB5KGIpLmRhdGEoXCIkaXNvbGF0ZVNjb3BlXCIpfHx5KGIpLmRhdGEoXCIkaXNvbGF0ZVNjb3BlTm9UZW1wbGF0ZVwiKX0sY29udHJvbGxlcjprYyxpbmplY3RvcjpmdW5jdGlvbihiKXtyZXR1cm4gamIoYixcIiRpbmplY3RvclwiKX0scmVtb3ZlQXR0cjpmdW5jdGlvbihiLGEpe2IucmVtb3ZlQXR0cmlidXRlKGEpfSxoYXNDbGFzczpHYixjc3M6ZnVuY3Rpb24oYixhLGMpe2E9VGEoYSk7aWYoQihjKSliLnN0eWxlW2FdPWM7ZWxzZXt2YXIgZDs4Pj1TJiYoZD1iLmN1cnJlbnRTdHlsZSYmYi5jdXJyZW50U3R5bGVbYV0sXCJcIj09PWQmJihkPVwiYXV0b1wiKSk7ZD1kfHxiLnN0eWxlW2FdOzg+PVMmJihkPVwiXCI9PT1kP3M6ZCk7cmV0dXJuIGR9fSxhdHRyOmZ1bmN0aW9uKGIsYSxjKXt2YXIgZD1LKGEpO2lmKGtiW2RdKWlmKEIoYykpYz8oYlthXT0hMCxiLnNldEF0dHJpYnV0ZShhLGQpKTooYlthXT0hMSxiLnJlbW92ZUF0dHJpYnV0ZShkKSk7XG5lbHNlIHJldHVybiBiW2FdfHwoYi5hdHRyaWJ1dGVzLmdldE5hbWVkSXRlbShhKXx8Qykuc3BlY2lmaWVkP2Q6cztlbHNlIGlmKEIoYykpYi5zZXRBdHRyaWJ1dGUoYSxjKTtlbHNlIGlmKGIuZ2V0QXR0cmlidXRlKXJldHVybiBiPWIuZ2V0QXR0cmlidXRlKGEsMiksbnVsbD09PWI/czpifSxwcm9wOmZ1bmN0aW9uKGIsYSxjKXtpZihCKGMpKWJbYV09YztlbHNlIHJldHVybiBiW2FdfSx0ZXh0OmZ1bmN0aW9uKCl7ZnVuY3Rpb24gYihiLGQpe3ZhciBlPWFbYi5ub2RlVHlwZV07aWYoRShkKSlyZXR1cm4gZT9iW2VdOlwiXCI7YltlXT1kfXZhciBhPVtdOzk+Uz8oYVsxXT1cImlubmVyVGV4dFwiLGFbM109XCJub2RlVmFsdWVcIik6YVsxXT1hWzNdPVwidGV4dENvbnRlbnRcIjtiLiRkdj1cIlwiO3JldHVybiBifSgpLHZhbDpmdW5jdGlvbihiLGEpe2lmKEUoYSkpe2lmKFwiU0VMRUNUXCI9PT1LYShiKSYmYi5tdWx0aXBsZSl7dmFyIGM9W107cShiLm9wdGlvbnMsZnVuY3Rpb24oYSl7YS5zZWxlY3RlZCYmXG5jLnB1c2goYS52YWx1ZXx8YS50ZXh0KX0pO3JldHVybiAwPT09Yy5sZW5ndGg/bnVsbDpjfXJldHVybiBiLnZhbHVlfWIudmFsdWU9YX0saHRtbDpmdW5jdGlvbihiLGEpe2lmKEUoYSkpcmV0dXJuIGIuaW5uZXJIVE1MO2Zvcih2YXIgYz0wLGQ9Yi5jaGlsZE5vZGVzO2M8ZC5sZW5ndGg7YysrKUhhKGRbY10pO2IuaW5uZXJIVE1MPWF9LGVtcHR5OmxjfSxmdW5jdGlvbihiLGEpe04ucHJvdG90eXBlW2FdPWZ1bmN0aW9uKGEsZCl7dmFyIGUsZztpZihiIT09bGMmJigyPT1iLmxlbmd0aCYmYiE9PUdiJiZiIT09a2M/YTpkKT09PXMpe2lmKFgoYSkpe2ZvcihlPTA7ZTx0aGlzLmxlbmd0aDtlKyspaWYoYj09PWpjKWIodGhpc1tlXSxhKTtlbHNlIGZvcihnIGluIGEpYih0aGlzW2VdLGcsYVtnXSk7cmV0dXJuIHRoaXN9ZT1iLiRkdjtnPWU9PT1zP01hdGgubWluKHRoaXMubGVuZ3RoLDEpOnRoaXMubGVuZ3RoO2Zvcih2YXIgZj0wO2Y8ZztmKyspe3ZhciBoPWIodGhpc1tmXSxhLGQpO2U9XG5lP2UraDpofXJldHVybiBlfWZvcihlPTA7ZTx0aGlzLmxlbmd0aDtlKyspYih0aGlzW2VdLGEsZCk7cmV0dXJuIHRoaXN9fSk7cSh7cmVtb3ZlRGF0YTpoYyxkZWFsb2M6SGEsb246ZnVuY3Rpb24gYShjLGQsZSxnKXtpZihCKGcpKXRocm93IEJiKFwib25hcmdzXCIpO3ZhciBmPWxhKGMsXCJldmVudHNcIiksaD1sYShjLFwiaGFuZGxlXCIpO2Z8fGxhKGMsXCJldmVudHNcIixmPXt9KTtofHxsYShjLFwiaGFuZGxlXCIsaD1uZShjLGYpKTtxKGQuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGQpe3ZhciBnPWZbZF07aWYoIWcpe2lmKFwibW91c2VlbnRlclwiPT1kfHxcIm1vdXNlbGVhdmVcIj09ZCl7dmFyIG09VS5ib2R5LmNvbnRhaW5zfHxVLmJvZHkuY29tcGFyZURvY3VtZW50UG9zaXRpb24/ZnVuY3Rpb24oYSxjKXt2YXIgZD05PT09YS5ub2RlVHlwZT9hLmRvY3VtZW50RWxlbWVudDphLGU9YyYmYy5wYXJlbnROb2RlO3JldHVybiBhPT09ZXx8ISEoZSYmMT09PWUubm9kZVR5cGUmJihkLmNvbnRhaW5zP2QuY29udGFpbnMoZSk6XG5hLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uJiZhLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGUpJjE2KSl9OmZ1bmN0aW9uKGEsYyl7aWYoYylmb3IoO2M9Yy5wYXJlbnROb2RlOylpZihjPT09YSlyZXR1cm4hMDtyZXR1cm4hMX07ZltkXT1bXTthKGMse21vdXNlbGVhdmU6XCJtb3VzZW91dFwiLG1vdXNlZW50ZXI6XCJtb3VzZW92ZXJcIn1bZF0sZnVuY3Rpb24oYSl7dmFyIGM9YS5yZWxhdGVkVGFyZ2V0O2MmJihjPT09dGhpc3x8bSh0aGlzLGMpKXx8aChhLGQpfSl9ZWxzZSBQYyhjLGQsaCksZltkXT1bXTtnPWZbZF19Zy5wdXNoKGUpfSl9LG9mZjppYyxvbmU6ZnVuY3Rpb24oYSxjLGQpe2E9eShhKTthLm9uKGMsZnVuY3Rpb24gZygpe2Eub2ZmKGMsZCk7YS5vZmYoYyxnKX0pO2Eub24oYyxkKX0scmVwbGFjZVdpdGg6ZnVuY3Rpb24oYSxjKXt2YXIgZCxlPWEucGFyZW50Tm9kZTtIYShhKTtxKG5ldyBOKGMpLGZ1bmN0aW9uKGMpe2Q/ZS5pbnNlcnRCZWZvcmUoYyxkLm5leHRTaWJsaW5nKTpcbmUucmVwbGFjZUNoaWxkKGMsYSk7ZD1jfSl9LGNoaWxkcmVuOmZ1bmN0aW9uKGEpe3ZhciBjPVtdO3EoYS5jaGlsZE5vZGVzLGZ1bmN0aW9uKGEpezE9PT1hLm5vZGVUeXBlJiZjLnB1c2goYSl9KTtyZXR1cm4gY30sY29udGVudHM6ZnVuY3Rpb24oYSl7cmV0dXJuIGEuY29udGVudERvY3VtZW50fHxhLmNoaWxkTm9kZXN8fFtdfSxhcHBlbmQ6ZnVuY3Rpb24oYSxjKXtxKG5ldyBOKGMpLGZ1bmN0aW9uKGMpezEhPT1hLm5vZGVUeXBlJiYxMSE9PWEubm9kZVR5cGV8fGEuYXBwZW5kQ2hpbGQoYyl9KX0scHJlcGVuZDpmdW5jdGlvbihhLGMpe2lmKDE9PT1hLm5vZGVUeXBlKXt2YXIgZD1hLmZpcnN0Q2hpbGQ7cShuZXcgTihjKSxmdW5jdGlvbihjKXthLmluc2VydEJlZm9yZShjLGQpfSl9fSx3cmFwOmZ1bmN0aW9uKGEsYyl7Yz15KGMpWzBdO3ZhciBkPWEucGFyZW50Tm9kZTtkJiZkLnJlcGxhY2VDaGlsZChjLGEpO2MuYXBwZW5kQ2hpbGQoYSl9LHJlbW92ZTpmdW5jdGlvbihhKXtIYShhKTtcbnZhciBjPWEucGFyZW50Tm9kZTtjJiZjLnJlbW92ZUNoaWxkKGEpfSxhZnRlcjpmdW5jdGlvbihhLGMpe3ZhciBkPWEsZT1hLnBhcmVudE5vZGU7cShuZXcgTihjKSxmdW5jdGlvbihhKXtlLmluc2VydEJlZm9yZShhLGQubmV4dFNpYmxpbmcpO2Q9YX0pfSxhZGRDbGFzczppYixyZW1vdmVDbGFzczpoYix0b2dnbGVDbGFzczpmdW5jdGlvbihhLGMsZCl7YyYmcShjLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihjKXt2YXIgZz1kO0UoZykmJihnPSFHYihhLGMpKTsoZz9pYjpoYikoYSxjKX0pfSxwYXJlbnQ6ZnVuY3Rpb24oYSl7cmV0dXJuKGE9YS5wYXJlbnROb2RlKSYmMTEhPT1hLm5vZGVUeXBlP2E6bnVsbH0sbmV4dDpmdW5jdGlvbihhKXtpZihhLm5leHRFbGVtZW50U2libGluZylyZXR1cm4gYS5uZXh0RWxlbWVudFNpYmxpbmc7Zm9yKGE9YS5uZXh0U2libGluZztudWxsIT1hJiYxIT09YS5ub2RlVHlwZTspYT1hLm5leHRTaWJsaW5nO3JldHVybiBhfSxmaW5kOmZ1bmN0aW9uKGEsYyl7cmV0dXJuIGEuZ2V0RWxlbWVudHNCeVRhZ05hbWU/XG5hLmdldEVsZW1lbnRzQnlUYWdOYW1lKGMpOltdfSxjbG9uZTpFYix0cmlnZ2VySGFuZGxlcjpmdW5jdGlvbihhLGMsZCl7Yz0obGEoYSxcImV2ZW50c1wiKXx8e30pW2NdO2Q9ZHx8W107dmFyIGU9W3twcmV2ZW50RGVmYXVsdDpDLHN0b3BQcm9wYWdhdGlvbjpDfV07cShjLGZ1bmN0aW9uKGMpe2MuYXBwbHkoYSxlLmNvbmNhdChkKSl9KX19LGZ1bmN0aW9uKGEsYyl7Ti5wcm90b3R5cGVbY109ZnVuY3Rpb24oYyxlLGcpe2Zvcih2YXIgZixoPTA7aDx0aGlzLmxlbmd0aDtoKyspRShmKT8oZj1hKHRoaXNbaF0sYyxlLGcpLEIoZikmJihmPXkoZikpKTpEYihmLGEodGhpc1toXSxjLGUsZykpO3JldHVybiBCKGYpP2Y6dGhpc307Ti5wcm90b3R5cGUuYmluZD1OLnByb3RvdHlwZS5vbjtOLnByb3RvdHlwZS51bmJpbmQ9Ti5wcm90b3R5cGUub2ZmfSk7VmEucHJvdG90eXBlPXtwdXQ6ZnVuY3Rpb24oYSxjKXt0aGlzW0lhKGEpXT1jfSxnZXQ6ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXNbSWEoYSldfSxcbnJlbW92ZTpmdW5jdGlvbihhKXt2YXIgYz10aGlzW2E9SWEoYSldO2RlbGV0ZSB0aGlzW2FdO3JldHVybiBjfX07dmFyIHBlPS9eZnVuY3Rpb25cXHMqW15cXChdKlxcKFxccyooW15cXCldKilcXCkvbSxxZT0vLC8scmU9L15cXHMqKF8/KShcXFMrPylcXDFcXHMqJC8sb2U9LygoXFwvXFwvLiokKXwoXFwvXFwqW1xcc1xcU10qP1xcKlxcLykpL21nLFdhPXQoXCIkaW5qZWN0b3JcIiksTGU9dChcIiRhbmltYXRlXCIpLExkPVtcIiRwcm92aWRlXCIsZnVuY3Rpb24oYSl7dGhpcy4kJHNlbGVjdG9ycz17fTt0aGlzLnJlZ2lzdGVyPWZ1bmN0aW9uKGMsZCl7dmFyIGU9YytcIi1hbmltYXRpb25cIjtpZihjJiZcIi5cIiE9Yy5jaGFyQXQoMCkpdGhyb3cgTGUoXCJub3Rjc2VsXCIsYyk7dGhpcy4kJHNlbGVjdG9yc1tjLnN1YnN0cigxKV09ZTthLmZhY3RvcnkoZSxkKX07dGhpcy5jbGFzc05hbWVGaWx0ZXI9ZnVuY3Rpb24oYSl7MT09PWFyZ3VtZW50cy5sZW5ndGgmJih0aGlzLiQkY2xhc3NOYW1lRmlsdGVyPWEgaW5zdGFuY2VvZiBSZWdFeHA/XG5hOm51bGwpO3JldHVybiB0aGlzLiQkY2xhc3NOYW1lRmlsdGVyfTt0aGlzLiRnZXQ9W1wiJHRpbWVvdXRcIixcIiQkYXN5bmNDYWxsYmFja1wiLGZ1bmN0aW9uKGEsZCl7cmV0dXJue2VudGVyOmZ1bmN0aW9uKGEsYyxmLGgpe2Y/Zi5hZnRlcihhKTooYyYmY1swXXx8KGM9Zi5wYXJlbnQoKSksYy5hcHBlbmQoYSkpO2gmJmQoaCl9LGxlYXZlOmZ1bmN0aW9uKGEsYyl7YS5yZW1vdmUoKTtjJiZkKGMpfSxtb3ZlOmZ1bmN0aW9uKGEsYyxkLGgpe3RoaXMuZW50ZXIoYSxjLGQsaCl9LGFkZENsYXNzOmZ1bmN0aW9uKGEsYyxmKXtjPXcoYyk/YzpNKGMpP2Muam9pbihcIiBcIik6XCJcIjtxKGEsZnVuY3Rpb24oYSl7aWIoYSxjKX0pO2YmJmQoZil9LHJlbW92ZUNsYXNzOmZ1bmN0aW9uKGEsYyxmKXtjPXcoYyk/YzpNKGMpP2Muam9pbihcIiBcIik6XCJcIjtxKGEsZnVuY3Rpb24oYSl7aGIoYSxjKX0pO2YmJmQoZil9LHNldENsYXNzOmZ1bmN0aW9uKGEsYyxmLGgpe3EoYSxmdW5jdGlvbihhKXtpYihhLGMpO2hiKGEsXG5mKX0pO2gmJmQoaCl9LGVuYWJsZWQ6Q319XX1dLGphPXQoXCIkY29tcGlsZVwiKTtjYy4kaW5qZWN0PVtcIiRwcm92aWRlXCIsXCIkJHNhbml0aXplVXJpUHJvdmlkZXJcIl07dmFyIHRlPS9eKHhbXFw6XFwtX118ZGF0YVtcXDpcXC1fXSkvaSx2Yz10KFwiJGludGVycG9sYXRlXCIpLE1lPS9eKFteXFw/I10qKShcXD8oW14jXSopKT8oIyguKikpPyQvLHdlPXtodHRwOjgwLGh0dHBzOjQ0MyxmdHA6MjF9LEtiPXQoXCIkbG9jYXRpb25cIik7QWMucHJvdG90eXBlPUxiLnByb3RvdHlwZT16Yy5wcm90b3R5cGU9eyQkaHRtbDU6ITEsJCRyZXBsYWNlOiExLGFic1VybDpuYihcIiQkYWJzVXJsXCIpLHVybDpmdW5jdGlvbihhLGMpe2lmKEUoYSkpcmV0dXJuIHRoaXMuJCR1cmw7dmFyIGQ9TWUuZXhlYyhhKTtkWzFdJiZ0aGlzLnBhdGgoZGVjb2RlVVJJQ29tcG9uZW50KGRbMV0pKTsoZFsyXXx8ZFsxXSkmJnRoaXMuc2VhcmNoKGRbM118fFwiXCIpO3RoaXMuaGFzaChkWzVdfHxcIlwiLGMpO3JldHVybiB0aGlzfSxwcm90b2NvbDpuYihcIiQkcHJvdG9jb2xcIiksXG5ob3N0Om5iKFwiJCRob3N0XCIpLHBvcnQ6bmIoXCIkJHBvcnRcIikscGF0aDpCYyhcIiQkcGF0aFwiLGZ1bmN0aW9uKGEpe3JldHVyblwiL1wiPT1hLmNoYXJBdCgwKT9hOlwiL1wiK2F9KSxzZWFyY2g6ZnVuY3Rpb24oYSxjKXtzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAwOnJldHVybiB0aGlzLiQkc2VhcmNoO2Nhc2UgMTppZih3KGEpKXRoaXMuJCRzZWFyY2g9WWIoYSk7ZWxzZSBpZihYKGEpKXRoaXMuJCRzZWFyY2g9YTtlbHNlIHRocm93IEtiKFwiaXNyY2hhcmdcIik7YnJlYWs7ZGVmYXVsdDpFKGMpfHxudWxsPT09Yz9kZWxldGUgdGhpcy4kJHNlYXJjaFthXTp0aGlzLiQkc2VhcmNoW2FdPWN9dGhpcy4kJGNvbXBvc2UoKTtyZXR1cm4gdGhpc30saGFzaDpCYyhcIiQkaGFzaFwiLERhKSxyZXBsYWNlOmZ1bmN0aW9uKCl7dGhpcy4kJHJlcGxhY2U9ITA7cmV0dXJuIHRoaXN9fTt2YXIgQmE9dChcIiRwYXJzZVwiKSxFYz17fSx0YSxNYT17XCJudWxsXCI6ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH0sXCJ0cnVlXCI6ZnVuY3Rpb24oKXtyZXR1cm4hMH0sXG5cImZhbHNlXCI6ZnVuY3Rpb24oKXtyZXR1cm4hMX0sdW5kZWZpbmVkOkMsXCIrXCI6ZnVuY3Rpb24oYSxjLGQsZSl7ZD1kKGEsYyk7ZT1lKGEsYyk7cmV0dXJuIEIoZCk/QihlKT9kK2U6ZDpCKGUpP2U6c30sXCItXCI6ZnVuY3Rpb24oYSxjLGQsZSl7ZD1kKGEsYyk7ZT1lKGEsYyk7cmV0dXJuKEIoZCk/ZDowKS0oQihlKT9lOjApfSxcIipcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpKmUoYSxjKX0sXCIvXCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKS9lKGEsYyl9LFwiJVwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyklZShhLGMpfSxcIl5cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpXmUoYSxjKX0sXCI9XCI6QyxcIj09PVwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyk9PT1lKGEsYyl9LFwiIT09XCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKSE9PWUoYSxjKX0sXCI9PVwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyk9PWUoYSxcbmMpfSxcIiE9XCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKSE9ZShhLGMpfSxcIjxcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpPGUoYSxjKX0sXCI+XCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKT5lKGEsYyl9LFwiPD1cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpPD1lKGEsYyl9LFwiPj1cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpPj1lKGEsYyl9LFwiJiZcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpJiZlKGEsYyl9LFwifHxcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpfHxlKGEsYyl9LFwiJlwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYykmZShhLGMpfSxcInxcIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZShhLGMpKGEsYyxkKGEsYykpfSxcIiFcIjpmdW5jdGlvbihhLGMsZCl7cmV0dXJuIWQoYSxjKX19LE5lPXtuOlwiXFxuXCIsZjpcIlxcZlwiLHI6XCJcXHJcIix0OlwiXFx0XCIsdjpcIlxcdlwiLFwiJ1wiOlwiJ1wiLCdcIic6J1wiJ30sXG5OYj1mdW5jdGlvbihhKXt0aGlzLm9wdGlvbnM9YX07TmIucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjpOYixsZXg6ZnVuY3Rpb24oYSl7dGhpcy50ZXh0PWE7dGhpcy5pbmRleD0wO3RoaXMuY2g9czt0aGlzLmxhc3RDaD1cIjpcIjt0aGlzLnRva2Vucz1bXTt2YXIgYztmb3IoYT1bXTt0aGlzLmluZGV4PHRoaXMudGV4dC5sZW5ndGg7KXt0aGlzLmNoPXRoaXMudGV4dC5jaGFyQXQodGhpcy5pbmRleCk7aWYodGhpcy5pcyhcIlxcXCInXCIpKXRoaXMucmVhZFN0cmluZyh0aGlzLmNoKTtlbHNlIGlmKHRoaXMuaXNOdW1iZXIodGhpcy5jaCl8fHRoaXMuaXMoXCIuXCIpJiZ0aGlzLmlzTnVtYmVyKHRoaXMucGVlaygpKSl0aGlzLnJlYWROdW1iZXIoKTtlbHNlIGlmKHRoaXMuaXNJZGVudCh0aGlzLmNoKSl0aGlzLnJlYWRJZGVudCgpLHRoaXMud2FzKFwieyxcIikmJihcIntcIj09PWFbMF0mJihjPXRoaXMudG9rZW5zW3RoaXMudG9rZW5zLmxlbmd0aC0xXSkpJiYoYy5qc29uPS0xPT09Yy50ZXh0LmluZGV4T2YoXCIuXCIpKTtcbmVsc2UgaWYodGhpcy5pcyhcIigpe31bXS4sOzo/XCIpKXRoaXMudG9rZW5zLnB1c2goe2luZGV4OnRoaXMuaW5kZXgsdGV4dDp0aGlzLmNoLGpzb246dGhpcy53YXMoXCI6WyxcIikmJnRoaXMuaXMoXCJ7W1wiKXx8dGhpcy5pcyhcIn1dOixcIil9KSx0aGlzLmlzKFwie1tcIikmJmEudW5zaGlmdCh0aGlzLmNoKSx0aGlzLmlzKFwifV1cIikmJmEuc2hpZnQoKSx0aGlzLmluZGV4Kys7ZWxzZSBpZih0aGlzLmlzV2hpdGVzcGFjZSh0aGlzLmNoKSl7dGhpcy5pbmRleCsrO2NvbnRpbnVlfWVsc2V7dmFyIGQ9dGhpcy5jaCt0aGlzLnBlZWsoKSxlPWQrdGhpcy5wZWVrKDIpLGc9TWFbdGhpcy5jaF0sZj1NYVtkXSxoPU1hW2VdO2g/KHRoaXMudG9rZW5zLnB1c2goe2luZGV4OnRoaXMuaW5kZXgsdGV4dDplLGZuOmh9KSx0aGlzLmluZGV4Kz0zKTpmPyh0aGlzLnRva2Vucy5wdXNoKHtpbmRleDp0aGlzLmluZGV4LHRleHQ6ZCxmbjpmfSksdGhpcy5pbmRleCs9Mik6Zz8odGhpcy50b2tlbnMucHVzaCh7aW5kZXg6dGhpcy5pbmRleCxcbnRleHQ6dGhpcy5jaCxmbjpnLGpzb246dGhpcy53YXMoXCJbLDpcIikmJnRoaXMuaXMoXCIrLVwiKX0pLHRoaXMuaW5kZXgrPTEpOnRoaXMudGhyb3dFcnJvcihcIlVuZXhwZWN0ZWQgbmV4dCBjaGFyYWN0ZXIgXCIsdGhpcy5pbmRleCx0aGlzLmluZGV4KzEpfXRoaXMubGFzdENoPXRoaXMuY2h9cmV0dXJuIHRoaXMudG9rZW5zfSxpczpmdW5jdGlvbihhKXtyZXR1cm4tMSE9PWEuaW5kZXhPZih0aGlzLmNoKX0sd2FzOmZ1bmN0aW9uKGEpe3JldHVybi0xIT09YS5pbmRleE9mKHRoaXMubGFzdENoKX0scGVlazpmdW5jdGlvbihhKXthPWF8fDE7cmV0dXJuIHRoaXMuaW5kZXgrYTx0aGlzLnRleHQubGVuZ3RoP3RoaXMudGV4dC5jaGFyQXQodGhpcy5pbmRleCthKTohMX0saXNOdW1iZXI6ZnVuY3Rpb24oYSl7cmV0dXJuXCIwXCI8PWEmJlwiOVwiPj1hfSxpc1doaXRlc3BhY2U6ZnVuY3Rpb24oYSl7cmV0dXJuXCIgXCI9PT1hfHxcIlxcclwiPT09YXx8XCJcXHRcIj09PWF8fFwiXFxuXCI9PT1hfHxcIlxcdlwiPT09YXx8XCJcXHUwMGEwXCI9PT1cbmF9LGlzSWRlbnQ6ZnVuY3Rpb24oYSl7cmV0dXJuXCJhXCI8PWEmJlwielwiPj1hfHxcIkFcIjw9YSYmXCJaXCI+PWF8fFwiX1wiPT09YXx8XCIkXCI9PT1hfSxpc0V4cE9wZXJhdG9yOmZ1bmN0aW9uKGEpe3JldHVyblwiLVwiPT09YXx8XCIrXCI9PT1hfHx0aGlzLmlzTnVtYmVyKGEpfSx0aHJvd0Vycm9yOmZ1bmN0aW9uKGEsYyxkKXtkPWR8fHRoaXMuaW5kZXg7Yz1CKGMpP1wicyBcIitjK1wiLVwiK3RoaXMuaW5kZXgrXCIgW1wiK3RoaXMudGV4dC5zdWJzdHJpbmcoYyxkKStcIl1cIjpcIiBcIitkO3Rocm93IEJhKFwibGV4ZXJyXCIsYSxjLHRoaXMudGV4dCk7fSxyZWFkTnVtYmVyOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPVwiXCIsYz10aGlzLmluZGV4O3RoaXMuaW5kZXg8dGhpcy50ZXh0Lmxlbmd0aDspe3ZhciBkPUsodGhpcy50ZXh0LmNoYXJBdCh0aGlzLmluZGV4KSk7aWYoXCIuXCI9PWR8fHRoaXMuaXNOdW1iZXIoZCkpYSs9ZDtlbHNle3ZhciBlPXRoaXMucGVlaygpO2lmKFwiZVwiPT1kJiZ0aGlzLmlzRXhwT3BlcmF0b3IoZSkpYSs9XG5kO2Vsc2UgaWYodGhpcy5pc0V4cE9wZXJhdG9yKGQpJiZlJiZ0aGlzLmlzTnVtYmVyKGUpJiZcImVcIj09YS5jaGFyQXQoYS5sZW5ndGgtMSkpYSs9ZDtlbHNlIGlmKCF0aGlzLmlzRXhwT3BlcmF0b3IoZCl8fGUmJnRoaXMuaXNOdW1iZXIoZSl8fFwiZVwiIT1hLmNoYXJBdChhLmxlbmd0aC0xKSlicmVhaztlbHNlIHRoaXMudGhyb3dFcnJvcihcIkludmFsaWQgZXhwb25lbnRcIil9dGhpcy5pbmRleCsrfWEqPTE7dGhpcy50b2tlbnMucHVzaCh7aW5kZXg6Yyx0ZXh0OmEsanNvbjohMCxmbjpmdW5jdGlvbigpe3JldHVybiBhfX0pfSxyZWFkSWRlbnQ6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcyxjPVwiXCIsZD10aGlzLmluZGV4LGUsZyxmLGg7dGhpcy5pbmRleDx0aGlzLnRleHQubGVuZ3RoOyl7aD10aGlzLnRleHQuY2hhckF0KHRoaXMuaW5kZXgpO2lmKFwiLlwiPT09aHx8dGhpcy5pc0lkZW50KGgpfHx0aGlzLmlzTnVtYmVyKGgpKVwiLlwiPT09aCYmKGU9dGhpcy5pbmRleCksYys9aDtlbHNlIGJyZWFrO1xudGhpcy5pbmRleCsrfWlmKGUpZm9yKGc9dGhpcy5pbmRleDtnPHRoaXMudGV4dC5sZW5ndGg7KXtoPXRoaXMudGV4dC5jaGFyQXQoZyk7aWYoXCIoXCI9PT1oKXtmPWMuc3Vic3RyKGUtZCsxKTtjPWMuc3Vic3RyKDAsZS1kKTt0aGlzLmluZGV4PWc7YnJlYWt9aWYodGhpcy5pc1doaXRlc3BhY2UoaCkpZysrO2Vsc2UgYnJlYWt9ZD17aW5kZXg6ZCx0ZXh0OmN9O2lmKE1hLmhhc093blByb3BlcnR5KGMpKWQuZm49TWFbY10sZC5qc29uPU1hW2NdO2Vsc2V7dmFyIGw9RGMoYyx0aGlzLm9wdGlvbnMsdGhpcy50ZXh0KTtkLmZuPUQoZnVuY3Rpb24oYSxjKXtyZXR1cm4gbChhLGMpfSx7YXNzaWduOmZ1bmN0aW9uKGQsZSl7cmV0dXJuIG9iKGQsYyxlLGEudGV4dCxhLm9wdGlvbnMpfX0pfXRoaXMudG9rZW5zLnB1c2goZCk7ZiYmKHRoaXMudG9rZW5zLnB1c2goe2luZGV4OmUsdGV4dDpcIi5cIixqc29uOiExfSksdGhpcy50b2tlbnMucHVzaCh7aW5kZXg6ZSsxLHRleHQ6Zixqc29uOiExfSkpfSxcbnJlYWRTdHJpbmc6ZnVuY3Rpb24oYSl7dmFyIGM9dGhpcy5pbmRleDt0aGlzLmluZGV4Kys7Zm9yKHZhciBkPVwiXCIsZT1hLGc9ITE7dGhpcy5pbmRleDx0aGlzLnRleHQubGVuZ3RoOyl7dmFyIGY9dGhpcy50ZXh0LmNoYXJBdCh0aGlzLmluZGV4KSxlPWUrZjtpZihnKVwidVwiPT09Zj8oZj10aGlzLnRleHQuc3Vic3RyaW5nKHRoaXMuaW5kZXgrMSx0aGlzLmluZGV4KzUpLGYubWF0Y2goL1tcXGRhLWZdezR9L2kpfHx0aGlzLnRocm93RXJyb3IoXCJJbnZhbGlkIHVuaWNvZGUgZXNjYXBlIFtcXFxcdVwiK2YrXCJdXCIpLHRoaXMuaW5kZXgrPTQsZCs9U3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChmLDE2KSkpOmQ9KGc9TmVbZl0pP2QrZzpkK2YsZz0hMTtlbHNlIGlmKFwiXFxcXFwiPT09ZilnPSEwO2Vsc2V7aWYoZj09PWEpe3RoaXMuaW5kZXgrKzt0aGlzLnRva2Vucy5wdXNoKHtpbmRleDpjLHRleHQ6ZSxzdHJpbmc6ZCxqc29uOiEwLGZuOmZ1bmN0aW9uKCl7cmV0dXJuIGR9fSk7cmV0dXJufWQrPVxuZn10aGlzLmluZGV4Kyt9dGhpcy50aHJvd0Vycm9yKFwiVW50ZXJtaW5hdGVkIHF1b3RlXCIsYyl9fTt2YXIgJGE9ZnVuY3Rpb24oYSxjLGQpe3RoaXMubGV4ZXI9YTt0aGlzLiRmaWx0ZXI9Yzt0aGlzLm9wdGlvbnM9ZH07JGEuWkVSTz1EKGZ1bmN0aW9uKCl7cmV0dXJuIDB9LHtjb25zdGFudDohMH0pOyRhLnByb3RvdHlwZT17Y29uc3RydWN0b3I6JGEscGFyc2U6ZnVuY3Rpb24oYSxjKXt0aGlzLnRleHQ9YTt0aGlzLmpzb249Yzt0aGlzLnRva2Vucz10aGlzLmxleGVyLmxleChhKTtjJiYodGhpcy5hc3NpZ25tZW50PXRoaXMubG9naWNhbE9SLHRoaXMuZnVuY3Rpb25DYWxsPXRoaXMuZmllbGRBY2Nlc3M9dGhpcy5vYmplY3RJbmRleD10aGlzLmZpbHRlckNoYWluPWZ1bmN0aW9uKCl7dGhpcy50aHJvd0Vycm9yKFwiaXMgbm90IHZhbGlkIGpzb25cIix7dGV4dDphLGluZGV4OjB9KX0pO3ZhciBkPWM/dGhpcy5wcmltYXJ5KCk6dGhpcy5zdGF0ZW1lbnRzKCk7MCE9PXRoaXMudG9rZW5zLmxlbmd0aCYmXG50aGlzLnRocm93RXJyb3IoXCJpcyBhbiB1bmV4cGVjdGVkIHRva2VuXCIsdGhpcy50b2tlbnNbMF0pO2QubGl0ZXJhbD0hIWQubGl0ZXJhbDtkLmNvbnN0YW50PSEhZC5jb25zdGFudDtyZXR1cm4gZH0scHJpbWFyeTpmdW5jdGlvbigpe3ZhciBhO2lmKHRoaXMuZXhwZWN0KFwiKFwiKSlhPXRoaXMuZmlsdGVyQ2hhaW4oKSx0aGlzLmNvbnN1bWUoXCIpXCIpO2Vsc2UgaWYodGhpcy5leHBlY3QoXCJbXCIpKWE9dGhpcy5hcnJheURlY2xhcmF0aW9uKCk7ZWxzZSBpZih0aGlzLmV4cGVjdChcIntcIikpYT10aGlzLm9iamVjdCgpO2Vsc2V7dmFyIGM9dGhpcy5leHBlY3QoKTsoYT1jLmZuKXx8dGhpcy50aHJvd0Vycm9yKFwibm90IGEgcHJpbWFyeSBleHByZXNzaW9uXCIsYyk7Yy5qc29uJiYoYS5jb25zdGFudD0hMCxhLmxpdGVyYWw9ITApfWZvcih2YXIgZDtjPXRoaXMuZXhwZWN0KFwiKFwiLFwiW1wiLFwiLlwiKTspXCIoXCI9PT1jLnRleHQ/KGE9dGhpcy5mdW5jdGlvbkNhbGwoYSxkKSxkPW51bGwpOlwiW1wiPT09Yy50ZXh0P1xuKGQ9YSxhPXRoaXMub2JqZWN0SW5kZXgoYSkpOlwiLlwiPT09Yy50ZXh0PyhkPWEsYT10aGlzLmZpZWxkQWNjZXNzKGEpKTp0aGlzLnRocm93RXJyb3IoXCJJTVBPU1NJQkxFXCIpO3JldHVybiBhfSx0aHJvd0Vycm9yOmZ1bmN0aW9uKGEsYyl7dGhyb3cgQmEoXCJzeW50YXhcIixjLnRleHQsYSxjLmluZGV4KzEsdGhpcy50ZXh0LHRoaXMudGV4dC5zdWJzdHJpbmcoYy5pbmRleCkpO30scGVla1Rva2VuOmZ1bmN0aW9uKCl7aWYoMD09PXRoaXMudG9rZW5zLmxlbmd0aCl0aHJvdyBCYShcInVlb2VcIix0aGlzLnRleHQpO3JldHVybiB0aGlzLnRva2Vuc1swXX0scGVlazpmdW5jdGlvbihhLGMsZCxlKXtpZigwPHRoaXMudG9rZW5zLmxlbmd0aCl7dmFyIGc9dGhpcy50b2tlbnNbMF0sZj1nLnRleHQ7aWYoZj09PWF8fGY9PT1jfHxmPT09ZHx8Zj09PWV8fCEoYXx8Y3x8ZHx8ZSkpcmV0dXJuIGd9cmV0dXJuITF9LGV4cGVjdDpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4oYT10aGlzLnBlZWsoYSxjLGQsXG5lKSk/KHRoaXMuanNvbiYmIWEuanNvbiYmdGhpcy50aHJvd0Vycm9yKFwiaXMgbm90IHZhbGlkIGpzb25cIixhKSx0aGlzLnRva2Vucy5zaGlmdCgpLGEpOiExfSxjb25zdW1lOmZ1bmN0aW9uKGEpe3RoaXMuZXhwZWN0KGEpfHx0aGlzLnRocm93RXJyb3IoXCJpcyB1bmV4cGVjdGVkLCBleHBlY3RpbmcgW1wiK2ErXCJdXCIsdGhpcy5wZWVrKCkpfSx1bmFyeUZuOmZ1bmN0aW9uKGEsYyl7cmV0dXJuIEQoZnVuY3Rpb24oZCxlKXtyZXR1cm4gYShkLGUsYyl9LHtjb25zdGFudDpjLmNvbnN0YW50fSl9LHRlcm5hcnlGbjpmdW5jdGlvbihhLGMsZCl7cmV0dXJuIEQoZnVuY3Rpb24oZSxnKXtyZXR1cm4gYShlLGcpP2MoZSxnKTpkKGUsZyl9LHtjb25zdGFudDphLmNvbnN0YW50JiZjLmNvbnN0YW50JiZkLmNvbnN0YW50fSl9LGJpbmFyeUZuOmZ1bmN0aW9uKGEsYyxkKXtyZXR1cm4gRChmdW5jdGlvbihlLGcpe3JldHVybiBjKGUsZyxhLGQpfSx7Y29uc3RhbnQ6YS5jb25zdGFudCYmZC5jb25zdGFudH0pfSxcbnN0YXRlbWVudHM6ZnVuY3Rpb24oKXtmb3IodmFyIGE9W107OylpZigwPHRoaXMudG9rZW5zLmxlbmd0aCYmIXRoaXMucGVlayhcIn1cIixcIilcIixcIjtcIixcIl1cIikmJmEucHVzaCh0aGlzLmZpbHRlckNoYWluKCkpLCF0aGlzLmV4cGVjdChcIjtcIikpcmV0dXJuIDE9PT1hLmxlbmd0aD9hWzBdOmZ1bmN0aW9uKGMsZCl7Zm9yKHZhciBlLGc9MDtnPGEubGVuZ3RoO2crKyl7dmFyIGY9YVtnXTtmJiYoZT1mKGMsZCkpfXJldHVybiBlfX0sZmlsdGVyQ2hhaW46ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5leHByZXNzaW9uKCksYzs7KWlmKGM9dGhpcy5leHBlY3QoXCJ8XCIpKWE9dGhpcy5iaW5hcnlGbihhLGMuZm4sdGhpcy5maWx0ZXIoKSk7ZWxzZSByZXR1cm4gYX0sZmlsdGVyOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMuZXhwZWN0KCksYz10aGlzLiRmaWx0ZXIoYS50ZXh0KSxkPVtdOzspaWYoYT10aGlzLmV4cGVjdChcIjpcIikpZC5wdXNoKHRoaXMuZXhwcmVzc2lvbigpKTtlbHNle3ZhciBlPVxuZnVuY3Rpb24oYSxlLGgpe2g9W2hdO2Zvcih2YXIgbD0wO2w8ZC5sZW5ndGg7bCsrKWgucHVzaChkW2xdKGEsZSkpO3JldHVybiBjLmFwcGx5KGEsaCl9O3JldHVybiBmdW5jdGlvbigpe3JldHVybiBlfX19LGV4cHJlc3Npb246ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5hc3NpZ25tZW50KCl9LGFzc2lnbm1lbnQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnRlcm5hcnkoKSxjLGQ7cmV0dXJuKGQ9dGhpcy5leHBlY3QoXCI9XCIpKT8oYS5hc3NpZ258fHRoaXMudGhyb3dFcnJvcihcImltcGxpZXMgYXNzaWdubWVudCBidXQgW1wiK3RoaXMudGV4dC5zdWJzdHJpbmcoMCxkLmluZGV4KStcIl0gY2FuIG5vdCBiZSBhc3NpZ25lZCB0b1wiLGQpLGM9dGhpcy50ZXJuYXJ5KCksZnVuY3Rpb24oZCxnKXtyZXR1cm4gYS5hc3NpZ24oZCxjKGQsZyksZyl9KTphfSx0ZXJuYXJ5OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5sb2dpY2FsT1IoKSxjLGQ7aWYodGhpcy5leHBlY3QoXCI/XCIpKXtjPXRoaXMudGVybmFyeSgpO1xuaWYoZD10aGlzLmV4cGVjdChcIjpcIikpcmV0dXJuIHRoaXMudGVybmFyeUZuKGEsYyx0aGlzLnRlcm5hcnkoKSk7dGhpcy50aHJvd0Vycm9yKFwiZXhwZWN0ZWQgOlwiLGQpfWVsc2UgcmV0dXJuIGF9LGxvZ2ljYWxPUjpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLmxvZ2ljYWxBTkQoKSxjOzspaWYoYz10aGlzLmV4cGVjdChcInx8XCIpKWE9dGhpcy5iaW5hcnlGbihhLGMuZm4sdGhpcy5sb2dpY2FsQU5EKCkpO2Vsc2UgcmV0dXJuIGF9LGxvZ2ljYWxBTkQ6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmVxdWFsaXR5KCksYztpZihjPXRoaXMuZXhwZWN0KFwiJiZcIikpYT10aGlzLmJpbmFyeUZuKGEsYy5mbix0aGlzLmxvZ2ljYWxBTkQoKSk7cmV0dXJuIGF9LGVxdWFsaXR5OmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5yZWxhdGlvbmFsKCksYztpZihjPXRoaXMuZXhwZWN0KFwiPT1cIixcIiE9XCIsXCI9PT1cIixcIiE9PVwiKSlhPXRoaXMuYmluYXJ5Rm4oYSxjLmZuLHRoaXMuZXF1YWxpdHkoKSk7cmV0dXJuIGF9LFxucmVsYXRpb25hbDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuYWRkaXRpdmUoKSxjO2lmKGM9dGhpcy5leHBlY3QoXCI8XCIsXCI+XCIsXCI8PVwiLFwiPj1cIikpYT10aGlzLmJpbmFyeUZuKGEsYy5mbix0aGlzLnJlbGF0aW9uYWwoKSk7cmV0dXJuIGF9LGFkZGl0aXZlOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMubXVsdGlwbGljYXRpdmUoKSxjO2M9dGhpcy5leHBlY3QoXCIrXCIsXCItXCIpOylhPXRoaXMuYmluYXJ5Rm4oYSxjLmZuLHRoaXMubXVsdGlwbGljYXRpdmUoKSk7cmV0dXJuIGF9LG11bHRpcGxpY2F0aXZlOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMudW5hcnkoKSxjO2M9dGhpcy5leHBlY3QoXCIqXCIsXCIvXCIsXCIlXCIpOylhPXRoaXMuYmluYXJ5Rm4oYSxjLmZuLHRoaXMudW5hcnkoKSk7cmV0dXJuIGF9LHVuYXJ5OmZ1bmN0aW9uKCl7dmFyIGE7cmV0dXJuIHRoaXMuZXhwZWN0KFwiK1wiKT90aGlzLnByaW1hcnkoKTooYT10aGlzLmV4cGVjdChcIi1cIikpP3RoaXMuYmluYXJ5Rm4oJGEuWkVSTyxhLmZuLFxudGhpcy51bmFyeSgpKTooYT10aGlzLmV4cGVjdChcIiFcIikpP3RoaXMudW5hcnlGbihhLmZuLHRoaXMudW5hcnkoKSk6dGhpcy5wcmltYXJ5KCl9LGZpZWxkQWNjZXNzOmZ1bmN0aW9uKGEpe3ZhciBjPXRoaXMsZD10aGlzLmV4cGVjdCgpLnRleHQsZT1EYyhkLHRoaXMub3B0aW9ucyx0aGlzLnRleHQpO3JldHVybiBEKGZ1bmN0aW9uKGMsZCxoKXtyZXR1cm4gZShofHxhKGMsZCkpfSx7YXNzaWduOmZ1bmN0aW9uKGUsZixoKXtyZXR1cm4gb2IoYShlLGgpLGQsZixjLnRleHQsYy5vcHRpb25zKX19KX0sb2JqZWN0SW5kZXg6ZnVuY3Rpb24oYSl7dmFyIGM9dGhpcyxkPXRoaXMuZXhwcmVzc2lvbigpO3RoaXMuY29uc3VtZShcIl1cIik7cmV0dXJuIEQoZnVuY3Rpb24oZSxnKXt2YXIgZj1hKGUsZyksaD1kKGUsZyksbDtpZighZilyZXR1cm4gczsoZj1aYShmW2hdLGMudGV4dCkpJiYoZi50aGVuJiZjLm9wdGlvbnMudW53cmFwUHJvbWlzZXMpJiYobD1mLFwiJCR2XCJpbiBmfHwobC4kJHY9cyxsLnRoZW4oZnVuY3Rpb24oYSl7bC4kJHY9XG5hfSkpLGY9Zi4kJHYpO3JldHVybiBmfSx7YXNzaWduOmZ1bmN0aW9uKGUsZyxmKXt2YXIgaD1kKGUsZik7cmV0dXJuIFphKGEoZSxmKSxjLnRleHQpW2hdPWd9fSl9LGZ1bmN0aW9uQ2FsbDpmdW5jdGlvbihhLGMpe3ZhciBkPVtdO2lmKFwiKVwiIT09dGhpcy5wZWVrVG9rZW4oKS50ZXh0KXtkbyBkLnB1c2godGhpcy5leHByZXNzaW9uKCkpO3doaWxlKHRoaXMuZXhwZWN0KFwiLFwiKSl9dGhpcy5jb25zdW1lKFwiKVwiKTt2YXIgZT10aGlzO3JldHVybiBmdW5jdGlvbihnLGYpe2Zvcih2YXIgaD1bXSxsPWM/YyhnLGYpOmcsaz0wO2s8ZC5sZW5ndGg7aysrKWgucHVzaChkW2tdKGcsZikpO2s9YShnLGYsbCl8fEM7WmEobCxlLnRleHQpO1phKGssZS50ZXh0KTtoPWsuYXBwbHk/ay5hcHBseShsLGgpOmsoaFswXSxoWzFdLGhbMl0saFszXSxoWzRdKTtyZXR1cm4gWmEoaCxlLnRleHQpfX0sYXJyYXlEZWNsYXJhdGlvbjpmdW5jdGlvbigpe3ZhciBhPVtdLGM9ITA7aWYoXCJdXCIhPT10aGlzLnBlZWtUb2tlbigpLnRleHQpe2Rve2lmKHRoaXMucGVlayhcIl1cIikpYnJlYWs7XG52YXIgZD10aGlzLmV4cHJlc3Npb24oKTthLnB1c2goZCk7ZC5jb25zdGFudHx8KGM9ITEpfXdoaWxlKHRoaXMuZXhwZWN0KFwiLFwiKSl9dGhpcy5jb25zdW1lKFwiXVwiKTtyZXR1cm4gRChmdW5jdGlvbihjLGQpe2Zvcih2YXIgZj1bXSxoPTA7aDxhLmxlbmd0aDtoKyspZi5wdXNoKGFbaF0oYyxkKSk7cmV0dXJuIGZ9LHtsaXRlcmFsOiEwLGNvbnN0YW50OmN9KX0sb2JqZWN0OmZ1bmN0aW9uKCl7dmFyIGE9W10sYz0hMDtpZihcIn1cIiE9PXRoaXMucGVla1Rva2VuKCkudGV4dCl7ZG97aWYodGhpcy5wZWVrKFwifVwiKSlicmVhazt2YXIgZD10aGlzLmV4cGVjdCgpLGQ9ZC5zdHJpbmd8fGQudGV4dDt0aGlzLmNvbnN1bWUoXCI6XCIpO3ZhciBlPXRoaXMuZXhwcmVzc2lvbigpO2EucHVzaCh7a2V5OmQsdmFsdWU6ZX0pO2UuY29uc3RhbnR8fChjPSExKX13aGlsZSh0aGlzLmV4cGVjdChcIixcIikpfXRoaXMuY29uc3VtZShcIn1cIik7cmV0dXJuIEQoZnVuY3Rpb24oYyxkKXtmb3IodmFyIGU9e30sbD0wO2w8XG5hLmxlbmd0aDtsKyspe3ZhciBrPWFbbF07ZVtrLmtleV09ay52YWx1ZShjLGQpfXJldHVybiBlfSx7bGl0ZXJhbDohMCxjb25zdGFudDpjfSl9fTt2YXIgTWI9e30sdWE9dChcIiRzY2VcIiksZ2E9e0hUTUw6XCJodG1sXCIsQ1NTOlwiY3NzXCIsVVJMOlwidXJsXCIsUkVTT1VSQ0VfVVJMOlwicmVzb3VyY2VVcmxcIixKUzpcImpzXCJ9LFc9VS5jcmVhdGVFbGVtZW50KFwiYVwiKSxIYz1zYShPLmxvY2F0aW9uLmhyZWYsITApO2djLiRpbmplY3Q9W1wiJHByb3ZpZGVcIl07SWMuJGluamVjdD1bXCIkbG9jYWxlXCJdO0tjLiRpbmplY3Q9W1wiJGxvY2FsZVwiXTt2YXIgTmM9XCIuXCIsSWU9e3l5eXk6JChcIkZ1bGxZZWFyXCIsNCkseXk6JChcIkZ1bGxZZWFyXCIsMiwwLCEwKSx5OiQoXCJGdWxsWWVhclwiLDEpLE1NTU06cGIoXCJNb250aFwiKSxNTU06cGIoXCJNb250aFwiLCEwKSxNTTokKFwiTW9udGhcIiwyLDEpLE06JChcIk1vbnRoXCIsMSwxKSxkZDokKFwiRGF0ZVwiLDIpLGQ6JChcIkRhdGVcIiwxKSxISDokKFwiSG91cnNcIiwyKSxIOiQoXCJIb3Vyc1wiLFxuMSksaGg6JChcIkhvdXJzXCIsMiwtMTIpLGg6JChcIkhvdXJzXCIsMSwtMTIpLG1tOiQoXCJNaW51dGVzXCIsMiksbTokKFwiTWludXRlc1wiLDEpLHNzOiQoXCJTZWNvbmRzXCIsMiksczokKFwiU2Vjb25kc1wiLDEpLHNzczokKFwiTWlsbGlzZWNvbmRzXCIsMyksRUVFRTpwYihcIkRheVwiKSxFRUU6cGIoXCJEYXlcIiwhMCksYTpmdW5jdGlvbihhLGMpe3JldHVybiAxMj5hLmdldEhvdXJzKCk/Yy5BTVBNU1swXTpjLkFNUE1TWzFdfSxaOmZ1bmN0aW9uKGEpe2E9LTEqYS5nZXRUaW1lem9uZU9mZnNldCgpO3JldHVybiBhPSgwPD1hP1wiK1wiOlwiXCIpKyhPYihNYXRoWzA8YT9cImZsb29yXCI6XCJjZWlsXCJdKGEvNjApLDIpK09iKE1hdGguYWJzKGElNjApLDIpKX19LEhlPS8oKD86W155TWRIaG1zYVpFJ10rKXwoPzonKD86W14nXXwnJykqJyl8KD86RSt8eSt8TSt8ZCt8SCt8aCt8bSt8cyt8YXxaKSkoLiopLyxHZT0vXlxcLT9cXGQrJC87SmMuJGluamVjdD1bXCIkbG9jYWxlXCJdO3ZhciBFZT1hYShLKSxGZT1hYShGYSk7TGMuJGluamVjdD1cbltcIiRwYXJzZVwiXTt2YXIgY2Q9YWEoe3Jlc3RyaWN0OlwiRVwiLGNvbXBpbGU6ZnVuY3Rpb24oYSxjKXs4Pj1TJiYoYy5ocmVmfHxjLm5hbWV8fGMuJHNldChcImhyZWZcIixcIlwiKSxhLmFwcGVuZChVLmNyZWF0ZUNvbW1lbnQoXCJJRSBmaXhcIikpKTtpZighYy5ocmVmJiYhYy54bGlua0hyZWYmJiFjLm5hbWUpcmV0dXJuIGZ1bmN0aW9uKGEsYyl7dmFyIGc9XCJbb2JqZWN0IFNWR0FuaW1hdGVkU3RyaW5nXVwiPT09d2EuY2FsbChjLnByb3AoXCJocmVmXCIpKT9cInhsaW5rOmhyZWZcIjpcImhyZWZcIjtjLm9uKFwiY2xpY2tcIixmdW5jdGlvbihhKXtjLmF0dHIoZyl8fGEucHJldmVudERlZmF1bHQoKX0pfX19KSx6Yj17fTtxKGtiLGZ1bmN0aW9uKGEsYyl7aWYoXCJtdWx0aXBsZVwiIT1hKXt2YXIgZD1uYShcIm5nLVwiK2MpO3piW2RdPWZ1bmN0aW9uKCl7cmV0dXJue3ByaW9yaXR5OjEwMCxsaW5rOmZ1bmN0aW9uKGEsZyxmKXthLiR3YXRjaChmW2RdLGZ1bmN0aW9uKGEpe2YuJHNldChjLCEhYSl9KX19fX19KTtxKFtcInNyY1wiLFxuXCJzcmNzZXRcIixcImhyZWZcIl0sZnVuY3Rpb24oYSl7dmFyIGM9bmEoXCJuZy1cIithKTt6YltjXT1mdW5jdGlvbigpe3JldHVybntwcmlvcml0eTo5OSxsaW5rOmZ1bmN0aW9uKGQsZSxnKXt2YXIgZj1hLGg9YTtcImhyZWZcIj09PWEmJlwiW29iamVjdCBTVkdBbmltYXRlZFN0cmluZ11cIj09PXdhLmNhbGwoZS5wcm9wKFwiaHJlZlwiKSkmJihoPVwieGxpbmtIcmVmXCIsZy4kYXR0cltoXT1cInhsaW5rOmhyZWZcIixmPW51bGwpO2cuJG9ic2VydmUoYyxmdW5jdGlvbihhKXthJiYoZy4kc2V0KGgsYSksUyYmZiYmZS5wcm9wKGYsZ1toXSkpfSl9fX19KTt2YXIgc2I9eyRhZGRDb250cm9sOkMsJHJlbW92ZUNvbnRyb2w6Qywkc2V0VmFsaWRpdHk6Qywkc2V0RGlydHk6Qywkc2V0UHJpc3RpbmU6Q307T2MuJGluamVjdD1bXCIkZWxlbWVudFwiLFwiJGF0dHJzXCIsXCIkc2NvcGVcIixcIiRhbmltYXRlXCJdO3ZhciBRYz1mdW5jdGlvbihhKXtyZXR1cm5bXCIkdGltZW91dFwiLGZ1bmN0aW9uKGMpe3JldHVybntuYW1lOlwiZm9ybVwiLFxucmVzdHJpY3Q6YT9cIkVBQ1wiOlwiRVwiLGNvbnRyb2xsZXI6T2MsY29tcGlsZTpmdW5jdGlvbigpe3JldHVybntwcmU6ZnVuY3Rpb24oYSxlLGcsZil7aWYoIWcuYWN0aW9uKXt2YXIgaD1mdW5jdGlvbihhKXthLnByZXZlbnREZWZhdWx0P2EucHJldmVudERlZmF1bHQoKTphLnJldHVyblZhbHVlPSExfTtQYyhlWzBdLFwic3VibWl0XCIsaCk7ZS5vbihcIiRkZXN0cm95XCIsZnVuY3Rpb24oKXtjKGZ1bmN0aW9uKCl7RmIoZVswXSxcInN1Ym1pdFwiLGgpfSwwLCExKX0pfXZhciBsPWUucGFyZW50KCkuY29udHJvbGxlcihcImZvcm1cIiksaz1nLm5hbWV8fGcubmdGb3JtO2smJm9iKGEsayxmLGspO2lmKGwpZS5vbihcIiRkZXN0cm95XCIsZnVuY3Rpb24oKXtsLiRyZW1vdmVDb250cm9sKGYpO2smJm9iKGEsayxzLGspO0QoZixzYil9KX19fX19XX0sZGQ9UWMoKSxxZD1RYyghMCksT2U9L14oZnRwfGh0dHB8aHR0cHMpOlxcL1xcLyhcXHcrOnswLDF9XFx3KkApPyhcXFMrKSg6WzAtOV0rKT8oXFwvfFxcLyhbXFx3IyE6Lj8rPSYlQCFcXC1cXC9dKSk/JC8sXG5QZT0vXlthLXowLTkhIyQlJicqKy89P15fYHt8fX4uLV0rQFthLXowLTktXSsoXFwuW2EtejAtOS1dKykqJC9pLFFlPS9eXFxzKihcXC18XFwrKT8oXFxkK3woXFxkKihcXC5cXGQqKSkpXFxzKiQvLFJjPXt0ZXh0OnViLG51bWJlcjpmdW5jdGlvbihhLGMsZCxlLGcsZil7dWIoYSxjLGQsZSxnLGYpO2UuJHBhcnNlcnMucHVzaChmdW5jdGlvbihhKXt2YXIgYz1lLiRpc0VtcHR5KGEpO2lmKGN8fFFlLnRlc3QoYSkpcmV0dXJuIGUuJHNldFZhbGlkaXR5KFwibnVtYmVyXCIsITApLFwiXCI9PT1hP251bGw6Yz9hOnBhcnNlRmxvYXQoYSk7ZS4kc2V0VmFsaWRpdHkoXCJudW1iZXJcIiwhMSk7cmV0dXJuIHN9KTtKZShlLFwibnVtYmVyXCIsYyk7ZS4kZm9ybWF0dGVycy5wdXNoKGZ1bmN0aW9uKGEpe3JldHVybiBlLiRpc0VtcHR5KGEpP1wiXCI6XCJcIithfSk7ZC5taW4mJihhPWZ1bmN0aW9uKGEpe3ZhciBjPXBhcnNlRmxvYXQoZC5taW4pO3JldHVybiBwYShlLFwibWluXCIsZS4kaXNFbXB0eShhKXx8YT49YyxhKX0sZS4kcGFyc2Vycy5wdXNoKGEpLFxuZS4kZm9ybWF0dGVycy5wdXNoKGEpKTtkLm1heCYmKGE9ZnVuY3Rpb24oYSl7dmFyIGM9cGFyc2VGbG9hdChkLm1heCk7cmV0dXJuIHBhKGUsXCJtYXhcIixlLiRpc0VtcHR5KGEpfHxhPD1jLGEpfSxlLiRwYXJzZXJzLnB1c2goYSksZS4kZm9ybWF0dGVycy5wdXNoKGEpKTtlLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGUsXCJudW1iZXJcIixlLiRpc0VtcHR5KGEpfHx2YihhKSxhKX0pfSx1cmw6ZnVuY3Rpb24oYSxjLGQsZSxnLGYpe3ViKGEsYyxkLGUsZyxmKTthPWZ1bmN0aW9uKGEpe3JldHVybiBwYShlLFwidXJsXCIsZS4kaXNFbXB0eShhKXx8T2UudGVzdChhKSxhKX07ZS4kZm9ybWF0dGVycy5wdXNoKGEpO2UuJHBhcnNlcnMucHVzaChhKX0sZW1haWw6ZnVuY3Rpb24oYSxjLGQsZSxnLGYpe3ViKGEsYyxkLGUsZyxmKTthPWZ1bmN0aW9uKGEpe3JldHVybiBwYShlLFwiZW1haWxcIixlLiRpc0VtcHR5KGEpfHxQZS50ZXN0KGEpLGEpfTtlLiRmb3JtYXR0ZXJzLnB1c2goYSk7XG5lLiRwYXJzZXJzLnB1c2goYSl9LHJhZGlvOmZ1bmN0aW9uKGEsYyxkLGUpe0UoZC5uYW1lKSYmYy5hdHRyKFwibmFtZVwiLGJiKCkpO2Mub24oXCJjbGlja1wiLGZ1bmN0aW9uKCl7Y1swXS5jaGVja2VkJiZhLiRhcHBseShmdW5jdGlvbigpe2UuJHNldFZpZXdWYWx1ZShkLnZhbHVlKX0pfSk7ZS4kcmVuZGVyPWZ1bmN0aW9uKCl7Y1swXS5jaGVja2VkPWQudmFsdWU9PWUuJHZpZXdWYWx1ZX07ZC4kb2JzZXJ2ZShcInZhbHVlXCIsZS4kcmVuZGVyKX0sY2hlY2tib3g6ZnVuY3Rpb24oYSxjLGQsZSl7dmFyIGc9ZC5uZ1RydWVWYWx1ZSxmPWQubmdGYWxzZVZhbHVlO3coZyl8fChnPSEwKTt3KGYpfHwoZj0hMSk7Yy5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXthLiRhcHBseShmdW5jdGlvbigpe2UuJHNldFZpZXdWYWx1ZShjWzBdLmNoZWNrZWQpfSl9KTtlLiRyZW5kZXI9ZnVuY3Rpb24oKXtjWzBdLmNoZWNrZWQ9ZS4kdmlld1ZhbHVlfTtlLiRpc0VtcHR5PWZ1bmN0aW9uKGEpe3JldHVybiBhIT09Z307XG5lLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT1nfSk7ZS4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKGEpe3JldHVybiBhP2c6Zn0pfSxoaWRkZW46QyxidXR0b246QyxzdWJtaXQ6QyxyZXNldDpDLGZpbGU6Q30sZGM9W1wiJGJyb3dzZXJcIixcIiRzbmlmZmVyXCIsZnVuY3Rpb24oYSxjKXtyZXR1cm57cmVzdHJpY3Q6XCJFXCIscmVxdWlyZTpcIj9uZ01vZGVsXCIsbGluazpmdW5jdGlvbihkLGUsZyxmKXtmJiYoUmNbSyhnLnR5cGUpXXx8UmMudGV4dCkoZCxlLGcsZixjLGEpfX19XSxyYj1cIm5nLXZhbGlkXCIscWI9XCJuZy1pbnZhbGlkXCIsTGE9XCJuZy1wcmlzdGluZVwiLHRiPVwibmctZGlydHlcIixSZT1bXCIkc2NvcGVcIixcIiRleGNlcHRpb25IYW5kbGVyXCIsXCIkYXR0cnNcIixcIiRlbGVtZW50XCIsXCIkcGFyc2VcIixcIiRhbmltYXRlXCIsZnVuY3Rpb24oYSxjLGQsZSxnLGYpe2Z1bmN0aW9uIGgoYSxjKXtjPWM/XCItXCIrZmIoYyxcIi1cIik6XCJcIjtmLnJlbW92ZUNsYXNzKGUsKGE/cWI6cmIpK2MpO1xuZi5hZGRDbGFzcyhlLChhP3JiOnFiKStjKX10aGlzLiRtb2RlbFZhbHVlPXRoaXMuJHZpZXdWYWx1ZT1OdW1iZXIuTmFOO3RoaXMuJHBhcnNlcnM9W107dGhpcy4kZm9ybWF0dGVycz1bXTt0aGlzLiR2aWV3Q2hhbmdlTGlzdGVuZXJzPVtdO3RoaXMuJHByaXN0aW5lPSEwO3RoaXMuJGRpcnR5PSExO3RoaXMuJHZhbGlkPSEwO3RoaXMuJGludmFsaWQ9ITE7dGhpcy4kbmFtZT1kLm5hbWU7dmFyIGw9ZyhkLm5nTW9kZWwpLGs9bC5hc3NpZ247aWYoIWspdGhyb3cgdChcIm5nTW9kZWxcIikoXCJub25hc3NpZ25cIixkLm5nTW9kZWwsaGEoZSkpO3RoaXMuJHJlbmRlcj1DO3RoaXMuJGlzRW1wdHk9ZnVuY3Rpb24oYSl7cmV0dXJuIEUoYSl8fFwiXCI9PT1hfHxudWxsPT09YXx8YSE9PWF9O3ZhciBtPWUuaW5oZXJpdGVkRGF0YShcIiRmb3JtQ29udHJvbGxlclwiKXx8c2Isbj0wLHA9dGhpcy4kZXJyb3I9e307ZS5hZGRDbGFzcyhMYSk7aCghMCk7dGhpcy4kc2V0VmFsaWRpdHk9ZnVuY3Rpb24oYSxjKXtwW2FdIT09XG4hYyYmKGM/KHBbYV0mJm4tLSxufHwoaCghMCksdGhpcy4kdmFsaWQ9ITAsdGhpcy4kaW52YWxpZD0hMSkpOihoKCExKSx0aGlzLiRpbnZhbGlkPSEwLHRoaXMuJHZhbGlkPSExLG4rKykscFthXT0hYyxoKGMsYSksbS4kc2V0VmFsaWRpdHkoYSxjLHRoaXMpKX07dGhpcy4kc2V0UHJpc3RpbmU9ZnVuY3Rpb24oKXt0aGlzLiRkaXJ0eT0hMTt0aGlzLiRwcmlzdGluZT0hMDtmLnJlbW92ZUNsYXNzKGUsdGIpO2YuYWRkQ2xhc3MoZSxMYSl9O3RoaXMuJHNldFZpZXdWYWx1ZT1mdW5jdGlvbihkKXt0aGlzLiR2aWV3VmFsdWU9ZDt0aGlzLiRwcmlzdGluZSYmKHRoaXMuJGRpcnR5PSEwLHRoaXMuJHByaXN0aW5lPSExLGYucmVtb3ZlQ2xhc3MoZSxMYSksZi5hZGRDbGFzcyhlLHRiKSxtLiRzZXREaXJ0eSgpKTtxKHRoaXMuJHBhcnNlcnMsZnVuY3Rpb24oYSl7ZD1hKGQpfSk7dGhpcy4kbW9kZWxWYWx1ZSE9PWQmJih0aGlzLiRtb2RlbFZhbHVlPWQsayhhLGQpLHEodGhpcy4kdmlld0NoYW5nZUxpc3RlbmVycyxcbmZ1bmN0aW9uKGEpe3RyeXthKCl9Y2F0Y2goZCl7YyhkKX19KSl9O3ZhciByPXRoaXM7YS4kd2F0Y2goZnVuY3Rpb24oKXt2YXIgYz1sKGEpO2lmKHIuJG1vZGVsVmFsdWUhPT1jKXt2YXIgZD1yLiRmb3JtYXR0ZXJzLGU9ZC5sZW5ndGg7Zm9yKHIuJG1vZGVsVmFsdWU9YztlLS07KWM9ZFtlXShjKTtyLiR2aWV3VmFsdWUhPT1jJiYoci4kdmlld1ZhbHVlPWMsci4kcmVuZGVyKCkpfXJldHVybiBjfSl9XSxGZD1mdW5jdGlvbigpe3JldHVybntyZXF1aXJlOltcIm5nTW9kZWxcIixcIl4/Zm9ybVwiXSxjb250cm9sbGVyOlJlLGxpbms6ZnVuY3Rpb24oYSxjLGQsZSl7dmFyIGc9ZVswXSxmPWVbMV18fHNiO2YuJGFkZENvbnRyb2woZyk7YS4kb24oXCIkZGVzdHJveVwiLGZ1bmN0aW9uKCl7Zi4kcmVtb3ZlQ29udHJvbChnKX0pfX19LEhkPWFhKHtyZXF1aXJlOlwibmdNb2RlbFwiLGxpbms6ZnVuY3Rpb24oYSxjLGQsZSl7ZS4kdmlld0NoYW5nZUxpc3RlbmVycy5wdXNoKGZ1bmN0aW9uKCl7YS4kZXZhbChkLm5nQ2hhbmdlKX0pfX0pLFxuZWM9ZnVuY3Rpb24oKXtyZXR1cm57cmVxdWlyZTpcIj9uZ01vZGVsXCIsbGluazpmdW5jdGlvbihhLGMsZCxlKXtpZihlKXtkLnJlcXVpcmVkPSEwO3ZhciBnPWZ1bmN0aW9uKGEpe2lmKGQucmVxdWlyZWQmJmUuJGlzRW1wdHkoYSkpZS4kc2V0VmFsaWRpdHkoXCJyZXF1aXJlZFwiLCExKTtlbHNlIHJldHVybiBlLiRzZXRWYWxpZGl0eShcInJlcXVpcmVkXCIsITApLGF9O2UuJGZvcm1hdHRlcnMucHVzaChnKTtlLiRwYXJzZXJzLnVuc2hpZnQoZyk7ZC4kb2JzZXJ2ZShcInJlcXVpcmVkXCIsZnVuY3Rpb24oKXtnKGUuJHZpZXdWYWx1ZSl9KX19fX0sR2Q9ZnVuY3Rpb24oKXtyZXR1cm57cmVxdWlyZTpcIm5nTW9kZWxcIixsaW5rOmZ1bmN0aW9uKGEsYyxkLGUpe3ZhciBnPShhPS9cXC8oLiopXFwvLy5leGVjKGQubmdMaXN0KSkmJlJlZ0V4cChhWzFdKXx8ZC5uZ0xpc3R8fFwiLFwiO2UuJHBhcnNlcnMucHVzaChmdW5jdGlvbihhKXtpZighRShhKSl7dmFyIGM9W107YSYmcShhLnNwbGl0KGcpLGZ1bmN0aW9uKGEpe2EmJlxuYy5wdXNoKGNhKGEpKX0pO3JldHVybiBjfX0pO2UuJGZvcm1hdHRlcnMucHVzaChmdW5jdGlvbihhKXtyZXR1cm4gTShhKT9hLmpvaW4oXCIsIFwiKTpzfSk7ZS4kaXNFbXB0eT1mdW5jdGlvbihhKXtyZXR1cm4hYXx8IWEubGVuZ3RofX19fSxTZT0vXih0cnVlfGZhbHNlfFxcZCspJC8sSWQ9ZnVuY3Rpb24oKXtyZXR1cm57cHJpb3JpdHk6MTAwLGNvbXBpbGU6ZnVuY3Rpb24oYSxjKXtyZXR1cm4gU2UudGVzdChjLm5nVmFsdWUpP2Z1bmN0aW9uKGEsYyxnKXtnLiRzZXQoXCJ2YWx1ZVwiLGEuJGV2YWwoZy5uZ1ZhbHVlKSl9OmZ1bmN0aW9uKGEsYyxnKXthLiR3YXRjaChnLm5nVmFsdWUsZnVuY3Rpb24oYSl7Zy4kc2V0KFwidmFsdWVcIixhKX0pfX19fSxpZD12YShmdW5jdGlvbihhLGMsZCl7Yy5hZGRDbGFzcyhcIm5nLWJpbmRpbmdcIikuZGF0YShcIiRiaW5kaW5nXCIsZC5uZ0JpbmQpO2EuJHdhdGNoKGQubmdCaW5kLGZ1bmN0aW9uKGEpe2MudGV4dChhPT1zP1wiXCI6YSl9KX0pLGtkPVtcIiRpbnRlcnBvbGF0ZVwiLFxuZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXtjPWEoZC5hdHRyKGUuJGF0dHIubmdCaW5kVGVtcGxhdGUpKTtkLmFkZENsYXNzKFwibmctYmluZGluZ1wiKS5kYXRhKFwiJGJpbmRpbmdcIixjKTtlLiRvYnNlcnZlKFwibmdCaW5kVGVtcGxhdGVcIixmdW5jdGlvbihhKXtkLnRleHQoYSl9KX19XSxqZD1bXCIkc2NlXCIsXCIkcGFyc2VcIixmdW5jdGlvbihhLGMpe3JldHVybiBmdW5jdGlvbihkLGUsZyl7ZS5hZGRDbGFzcyhcIm5nLWJpbmRpbmdcIikuZGF0YShcIiRiaW5kaW5nXCIsZy5uZ0JpbmRIdG1sKTt2YXIgZj1jKGcubmdCaW5kSHRtbCk7ZC4kd2F0Y2goZnVuY3Rpb24oKXtyZXR1cm4oZihkKXx8XCJcIikudG9TdHJpbmcoKX0sZnVuY3Rpb24oYyl7ZS5odG1sKGEuZ2V0VHJ1c3RlZEh0bWwoZihkKSl8fFwiXCIpfSl9fV0sbGQ9UGIoXCJcIiwhMCksbmQ9UGIoXCJPZGRcIiwwKSxtZD1QYihcIkV2ZW5cIiwxKSxvZD12YSh7Y29tcGlsZTpmdW5jdGlvbihhLGMpe2MuJHNldChcIm5nQ2xvYWtcIixzKTthLnJlbW92ZUNsYXNzKFwibmctY2xvYWtcIil9fSksXG5wZD1bZnVuY3Rpb24oKXtyZXR1cm57c2NvcGU6ITAsY29udHJvbGxlcjpcIkBcIixwcmlvcml0eTo1MDB9fV0sZmM9e307cShcImNsaWNrIGRibGNsaWNrIG1vdXNlZG93biBtb3VzZXVwIG1vdXNlb3ZlciBtb3VzZW91dCBtb3VzZW1vdmUgbW91c2VlbnRlciBtb3VzZWxlYXZlIGtleWRvd24ga2V5dXAga2V5cHJlc3Mgc3VibWl0IGZvY3VzIGJsdXIgY29weSBjdXQgcGFzdGVcIi5zcGxpdChcIiBcIiksZnVuY3Rpb24oYSl7dmFyIGM9bmEoXCJuZy1cIithKTtmY1tjXT1bXCIkcGFyc2VcIixmdW5jdGlvbihkKXtyZXR1cm57Y29tcGlsZTpmdW5jdGlvbihlLGcpe3ZhciBmPWQoZ1tjXSk7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXtkLm9uKEsoYSksZnVuY3Rpb24oYSl7Yy4kYXBwbHkoZnVuY3Rpb24oKXtmKGMseyRldmVudDphfSl9KX0pfX19fV19KTt2YXIgc2Q9W1wiJGFuaW1hdGVcIixmdW5jdGlvbihhKXtyZXR1cm57dHJhbnNjbHVkZTpcImVsZW1lbnRcIixwcmlvcml0eTo2MDAsdGVybWluYWw6ITAscmVzdHJpY3Q6XCJBXCIsXG4kJHRsYjohMCxsaW5rOmZ1bmN0aW9uKGMsZCxlLGcsZil7dmFyIGgsbCxrO2MuJHdhdGNoKGUubmdJZixmdW5jdGlvbihnKXtRYShnKT9sfHwobD1jLiRuZXcoKSxmKGwsZnVuY3Rpb24oYyl7Y1tjLmxlbmd0aCsrXT1VLmNyZWF0ZUNvbW1lbnQoXCIgZW5kIG5nSWY6IFwiK2UubmdJZitcIiBcIik7aD17Y2xvbmU6Y307YS5lbnRlcihjLGQucGFyZW50KCksZCl9KSk6KGsmJihrLnJlbW92ZSgpLGs9bnVsbCksbCYmKGwuJGRlc3Ryb3koKSxsPW51bGwpLGgmJihrPXliKGguY2xvbmUpLGEubGVhdmUoayxmdW5jdGlvbigpe2s9bnVsbH0pLGg9bnVsbCkpfSl9fX1dLHRkPVtcIiRodHRwXCIsXCIkdGVtcGxhdGVDYWNoZVwiLFwiJGFuY2hvclNjcm9sbFwiLFwiJGFuaW1hdGVcIixcIiRzY2VcIixmdW5jdGlvbihhLGMsZCxlLGcpe3JldHVybntyZXN0cmljdDpcIkVDQVwiLHByaW9yaXR5OjQwMCx0ZXJtaW5hbDohMCx0cmFuc2NsdWRlOlwiZWxlbWVudFwiLGNvbnRyb2xsZXI6RWEubm9vcCxjb21waWxlOmZ1bmN0aW9uKGYsXG5oKXt2YXIgbD1oLm5nSW5jbHVkZXx8aC5zcmMsaz1oLm9ubG9hZHx8XCJcIixtPWguYXV0b3Njcm9sbDtyZXR1cm4gZnVuY3Rpb24oZixoLHEscyx1KXt2YXIgRj0wLHYseSxBLHg9ZnVuY3Rpb24oKXt5JiYoeS5yZW1vdmUoKSx5PW51bGwpO3YmJih2LiRkZXN0cm95KCksdj1udWxsKTtBJiYoZS5sZWF2ZShBLGZ1bmN0aW9uKCl7eT1udWxsfSkseT1BLEE9bnVsbCl9O2YuJHdhdGNoKGcucGFyc2VBc1Jlc291cmNlVXJsKGwpLGZ1bmN0aW9uKGcpe3ZhciBsPWZ1bmN0aW9uKCl7IUIobSl8fG0mJiFmLiRldmFsKG0pfHxkKCl9LHE9KytGO2c/KGEuZ2V0KGcse2NhY2hlOmN9KS5zdWNjZXNzKGZ1bmN0aW9uKGEpe2lmKHE9PT1GKXt2YXIgYz1mLiRuZXcoKTtzLnRlbXBsYXRlPWE7YT11KGMsZnVuY3Rpb24oYSl7eCgpO2UuZW50ZXIoYSxudWxsLGgsbCl9KTt2PWM7QT1hO3YuJGVtaXQoXCIkaW5jbHVkZUNvbnRlbnRMb2FkZWRcIik7Zi4kZXZhbChrKX19KS5lcnJvcihmdW5jdGlvbigpe3E9PT1cbkYmJngoKX0pLGYuJGVtaXQoXCIkaW5jbHVkZUNvbnRlbnRSZXF1ZXN0ZWRcIikpOih4KCkscy50ZW1wbGF0ZT1udWxsKX0pfX19fV0sSmQ9W1wiJGNvbXBpbGVcIixmdW5jdGlvbihhKXtyZXR1cm57cmVzdHJpY3Q6XCJFQ0FcIixwcmlvcml0eTotNDAwLHJlcXVpcmU6XCJuZ0luY2x1ZGVcIixsaW5rOmZ1bmN0aW9uKGMsZCxlLGcpe2QuaHRtbChnLnRlbXBsYXRlKTthKGQuY29udGVudHMoKSkoYyl9fX1dLHVkPXZhKHtwcmlvcml0eTo0NTAsY29tcGlsZTpmdW5jdGlvbigpe3JldHVybntwcmU6ZnVuY3Rpb24oYSxjLGQpe2EuJGV2YWwoZC5uZ0luaXQpfX19fSksdmQ9dmEoe3Rlcm1pbmFsOiEwLHByaW9yaXR5OjFFM30pLHdkPVtcIiRsb2NhbGVcIixcIiRpbnRlcnBvbGF0ZVwiLGZ1bmN0aW9uKGEsYyl7dmFyIGQ9L3t9L2c7cmV0dXJue3Jlc3RyaWN0OlwiRUFcIixsaW5rOmZ1bmN0aW9uKGUsZyxmKXt2YXIgaD1mLmNvdW50LGw9Zi4kYXR0ci53aGVuJiZnLmF0dHIoZi4kYXR0ci53aGVuKSxrPWYub2Zmc2V0fHxcbjAsbT1lLiRldmFsKGwpfHx7fSxuPXt9LHA9Yy5zdGFydFN5bWJvbCgpLHI9Yy5lbmRTeW1ib2woKSxzPS9ed2hlbihNaW51cyk/KC4rKSQvO3EoZixmdW5jdGlvbihhLGMpe3MudGVzdChjKSYmKG1bSyhjLnJlcGxhY2UoXCJ3aGVuXCIsXCJcIikucmVwbGFjZShcIk1pbnVzXCIsXCItXCIpKV09Zy5hdHRyKGYuJGF0dHJbY10pKX0pO3EobSxmdW5jdGlvbihhLGUpe25bZV09YyhhLnJlcGxhY2UoZCxwK2grXCItXCIraytyKSl9KTtlLiR3YXRjaChmdW5jdGlvbigpe3ZhciBjPXBhcnNlRmxvYXQoZS4kZXZhbChoKSk7aWYoaXNOYU4oYykpcmV0dXJuXCJcIjtjIGluIG18fChjPWEucGx1cmFsQ2F0KGMtaykpO3JldHVybiBuW2NdKGUsZywhMCl9LGZ1bmN0aW9uKGEpe2cudGV4dChhKX0pfX19XSx4ZD1bXCIkcGFyc2VcIixcIiRhbmltYXRlXCIsZnVuY3Rpb24oYSxjKXt2YXIgZD10KFwibmdSZXBlYXRcIik7cmV0dXJue3RyYW5zY2x1ZGU6XCJlbGVtZW50XCIscHJpb3JpdHk6MUUzLHRlcm1pbmFsOiEwLCQkdGxiOiEwLFxubGluazpmdW5jdGlvbihlLGcsZixoLGwpe3ZhciBrPWYubmdSZXBlYXQsbT1rLm1hdGNoKC9eXFxzKihbXFxzXFxTXSs/KVxccytpblxccysoW1xcc1xcU10rPykoPzpcXHMrdHJhY2tcXHMrYnlcXHMrKFtcXHNcXFNdKz8pKT9cXHMqJC8pLG4scCxyLHMsdSxGLHY9eyRpZDpJYX07aWYoIW0pdGhyb3cgZChcImlleHBcIixrKTtmPW1bMV07aD1tWzJdOyhtPW1bM10pPyhuPWEobSkscD1mdW5jdGlvbihhLGMsZCl7RiYmKHZbRl09YSk7dlt1XT1jO3YuJGluZGV4PWQ7cmV0dXJuIG4oZSx2KX0pOihyPWZ1bmN0aW9uKGEsYyl7cmV0dXJuIElhKGMpfSxzPWZ1bmN0aW9uKGEpe3JldHVybiBhfSk7bT1mLm1hdGNoKC9eKD86KFtcXCRcXHddKyl8XFwoKFtcXCRcXHddKylcXHMqLFxccyooW1xcJFxcd10rKVxcKSkkLyk7aWYoIW0pdGhyb3cgZChcImlpZGV4cFwiLGYpO3U9bVszXXx8bVsxXTtGPW1bMl07dmFyIEI9e307ZS4kd2F0Y2hDb2xsZWN0aW9uKGgsZnVuY3Rpb24oYSl7dmFyIGYsaCxtPWdbMF0sbix2PXt9LEgsUix3LEMsVCx0LFxuRT1bXTtpZihhYihhKSlUPWEsbj1wfHxyO2Vsc2V7bj1wfHxzO1Q9W107Zm9yKHcgaW4gYSlhLmhhc093blByb3BlcnR5KHcpJiZcIiRcIiE9dy5jaGFyQXQoMCkmJlQucHVzaCh3KTtULnNvcnQoKX1IPVQubGVuZ3RoO2g9RS5sZW5ndGg9VC5sZW5ndGg7Zm9yKGY9MDtmPGg7ZisrKWlmKHc9YT09PVQ/ZjpUW2ZdLEM9YVt3XSxDPW4odyxDLGYpLEFhKEMsXCJgdHJhY2sgYnlgIGlkXCIpLEIuaGFzT3duUHJvcGVydHkoQykpdD1CW0NdLGRlbGV0ZSBCW0NdLHZbQ109dCxFW2ZdPXQ7ZWxzZXtpZih2Lmhhc093blByb3BlcnR5KEMpKXRocm93IHEoRSxmdW5jdGlvbihhKXthJiZhLnNjb3BlJiYoQlthLmlkXT1hKX0pLGQoXCJkdXBlc1wiLGssQyk7RVtmXT17aWQ6Q307dltDXT0hMX1mb3IodyBpbiBCKUIuaGFzT3duUHJvcGVydHkodykmJih0PUJbd10sZj15Yih0LmNsb25lKSxjLmxlYXZlKGYpLHEoZixmdW5jdGlvbihhKXthLiQkTkdfUkVNT1ZFRD0hMH0pLHQuc2NvcGUuJGRlc3Ryb3koKSk7XG5mPTA7Zm9yKGg9VC5sZW5ndGg7ZjxoO2YrKyl7dz1hPT09VD9mOlRbZl07Qz1hW3ddO3Q9RVtmXTtFW2YtMV0mJihtPUVbZi0xXS5jbG9uZVtFW2YtMV0uY2xvbmUubGVuZ3RoLTFdKTtpZih0LnNjb3BlKXtSPXQuc2NvcGU7bj1tO2RvIG49bi5uZXh0U2libGluZzt3aGlsZShuJiZuLiQkTkdfUkVNT1ZFRCk7dC5jbG9uZVswXSE9biYmYy5tb3ZlKHliKHQuY2xvbmUpLG51bGwseShtKSk7bT10LmNsb25lW3QuY2xvbmUubGVuZ3RoLTFdfWVsc2UgUj1lLiRuZXcoKTtSW3VdPUM7RiYmKFJbRl09dyk7Ui4kaW5kZXg9ZjtSLiRmaXJzdD0wPT09ZjtSLiRsYXN0PWY9PT1ILTE7Ui4kbWlkZGxlPSEoUi4kZmlyc3R8fFIuJGxhc3QpO1IuJG9kZD0hKFIuJGV2ZW49MD09PShmJjEpKTt0LnNjb3BlfHxsKFIsZnVuY3Rpb24oYSl7YVthLmxlbmd0aCsrXT1VLmNyZWF0ZUNvbW1lbnQoXCIgZW5kIG5nUmVwZWF0OiBcIitrK1wiIFwiKTtjLmVudGVyKGEsbnVsbCx5KG0pKTttPWE7dC5zY29wZT1SO3QuY2xvbmU9XG5hO3ZbdC5pZF09dH0pfUI9dn0pfX19XSx5ZD1bXCIkYW5pbWF0ZVwiLGZ1bmN0aW9uKGEpe3JldHVybiBmdW5jdGlvbihjLGQsZSl7Yy4kd2F0Y2goZS5uZ1Nob3csZnVuY3Rpb24oYyl7YVtRYShjKT9cInJlbW92ZUNsYXNzXCI6XCJhZGRDbGFzc1wiXShkLFwibmctaGlkZVwiKX0pfX1dLHJkPVtcIiRhbmltYXRlXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXtjLiR3YXRjaChlLm5nSGlkZSxmdW5jdGlvbihjKXthW1FhKGMpP1wiYWRkQ2xhc3NcIjpcInJlbW92ZUNsYXNzXCJdKGQsXCJuZy1oaWRlXCIpfSl9fV0semQ9dmEoZnVuY3Rpb24oYSxjLGQpe2EuJHdhdGNoKGQubmdTdHlsZSxmdW5jdGlvbihhLGQpe2QmJmEhPT1kJiZxKGQsZnVuY3Rpb24oYSxkKXtjLmNzcyhkLFwiXCIpfSk7YSYmYy5jc3MoYSl9LCEwKX0pLEFkPVtcIiRhbmltYXRlXCIsZnVuY3Rpb24oYSl7cmV0dXJue3Jlc3RyaWN0OlwiRUFcIixyZXF1aXJlOlwibmdTd2l0Y2hcIixjb250cm9sbGVyOltcIiRzY29wZVwiLGZ1bmN0aW9uKCl7dGhpcy5jYXNlcz1cbnt9fV0sbGluazpmdW5jdGlvbihjLGQsZSxnKXt2YXIgZixoLGwsaz1bXTtjLiR3YXRjaChlLm5nU3dpdGNofHxlLm9uLGZ1bmN0aW9uKGQpe3ZhciBuLHA9ay5sZW5ndGg7aWYoMDxwKXtpZihsKXtmb3Iobj0wO248cDtuKyspbFtuXS5yZW1vdmUoKTtsPW51bGx9bD1bXTtmb3Iobj0wO248cDtuKyspe3ZhciByPWhbbl07a1tuXS4kZGVzdHJveSgpO2xbbl09cjthLmxlYXZlKHIsZnVuY3Rpb24oKXtsLnNwbGljZShuLDEpOzA9PT1sLmxlbmd0aCYmKGw9bnVsbCl9KX19aD1bXTtrPVtdO2lmKGY9Zy5jYXNlc1tcIiFcIitkXXx8Zy5jYXNlc1tcIj9cIl0pYy4kZXZhbChlLmNoYW5nZSkscShmLGZ1bmN0aW9uKGQpe3ZhciBlPWMuJG5ldygpO2sucHVzaChlKTtkLnRyYW5zY2x1ZGUoZSxmdW5jdGlvbihjKXt2YXIgZT1kLmVsZW1lbnQ7aC5wdXNoKGMpO2EuZW50ZXIoYyxlLnBhcmVudCgpLGUpfSl9KX0pfX19XSxCZD12YSh7dHJhbnNjbHVkZTpcImVsZW1lbnRcIixwcmlvcml0eTo4MDAscmVxdWlyZTpcIl5uZ1N3aXRjaFwiLFxubGluazpmdW5jdGlvbihhLGMsZCxlLGcpe2UuY2FzZXNbXCIhXCIrZC5uZ1N3aXRjaFdoZW5dPWUuY2FzZXNbXCIhXCIrZC5uZ1N3aXRjaFdoZW5dfHxbXTtlLmNhc2VzW1wiIVwiK2QubmdTd2l0Y2hXaGVuXS5wdXNoKHt0cmFuc2NsdWRlOmcsZWxlbWVudDpjfSl9fSksQ2Q9dmEoe3RyYW5zY2x1ZGU6XCJlbGVtZW50XCIscHJpb3JpdHk6ODAwLHJlcXVpcmU6XCJebmdTd2l0Y2hcIixsaW5rOmZ1bmN0aW9uKGEsYyxkLGUsZyl7ZS5jYXNlc1tcIj9cIl09ZS5jYXNlc1tcIj9cIl18fFtdO2UuY2FzZXNbXCI/XCJdLnB1c2goe3RyYW5zY2x1ZGU6ZyxlbGVtZW50OmN9KX19KSxFZD12YSh7bGluazpmdW5jdGlvbihhLGMsZCxlLGcpe2lmKCFnKXRocm93IHQoXCJuZ1RyYW5zY2x1ZGVcIikoXCJvcnBoYW5cIixoYShjKSk7ZyhmdW5jdGlvbihhKXtjLmVtcHR5KCk7Yy5hcHBlbmQoYSl9KX19KSxlZD1bXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGEpe3JldHVybntyZXN0cmljdDpcIkVcIix0ZXJtaW5hbDohMCxjb21waWxlOmZ1bmN0aW9uKGMsXG5kKXtcInRleHQvbmctdGVtcGxhdGVcIj09ZC50eXBlJiZhLnB1dChkLmlkLGNbMF0udGV4dCl9fX1dLFRlPXQoXCJuZ09wdGlvbnNcIiksRGQ9YWEoe3Rlcm1pbmFsOiEwfSksZmQ9W1wiJGNvbXBpbGVcIixcIiRwYXJzZVwiLGZ1bmN0aW9uKGEsYyl7dmFyIGQ9L15cXHMqKFtcXHNcXFNdKz8pKD86XFxzK2FzXFxzKyhbXFxzXFxTXSs/KSk/KD86XFxzK2dyb3VwXFxzK2J5XFxzKyhbXFxzXFxTXSs/KSk/XFxzK2ZvclxccysoPzooW1xcJFxcd11bXFwkXFx3XSopfCg/OlxcKFxccyooW1xcJFxcd11bXFwkXFx3XSopXFxzKixcXHMqKFtcXCRcXHddW1xcJFxcd10qKVxccypcXCkpKVxccytpblxccysoW1xcc1xcU10rPykoPzpcXHMrdHJhY2tcXHMrYnlcXHMrKFtcXHNcXFNdKz8pKT8kLyxlPXskc2V0Vmlld1ZhbHVlOkN9O3JldHVybntyZXN0cmljdDpcIkVcIixyZXF1aXJlOltcInNlbGVjdFwiLFwiP25nTW9kZWxcIl0sY29udHJvbGxlcjpbXCIkZWxlbWVudFwiLFwiJHNjb3BlXCIsXCIkYXR0cnNcIixmdW5jdGlvbihhLGMsZCl7dmFyIGw9dGhpcyxrPXt9LG09ZSxuO2wuZGF0YWJvdW5kPVxuZC5uZ01vZGVsO2wuaW5pdD1mdW5jdGlvbihhLGMsZCl7bT1hO249ZH07bC5hZGRPcHRpb249ZnVuY3Rpb24oYyl7QWEoYywnXCJvcHRpb24gdmFsdWVcIicpO2tbY109ITA7bS4kdmlld1ZhbHVlPT1jJiYoYS52YWwoYyksbi5wYXJlbnQoKSYmbi5yZW1vdmUoKSl9O2wucmVtb3ZlT3B0aW9uPWZ1bmN0aW9uKGEpe3RoaXMuaGFzT3B0aW9uKGEpJiYoZGVsZXRlIGtbYV0sbS4kdmlld1ZhbHVlPT1hJiZ0aGlzLnJlbmRlclVua25vd25PcHRpb24oYSkpfTtsLnJlbmRlclVua25vd25PcHRpb249ZnVuY3Rpb24oYyl7Yz1cIj8gXCIrSWEoYykrXCIgP1wiO24udmFsKGMpO2EucHJlcGVuZChuKTthLnZhbChjKTtuLnByb3AoXCJzZWxlY3RlZFwiLCEwKX07bC5oYXNPcHRpb249ZnVuY3Rpb24oYSl7cmV0dXJuIGsuaGFzT3duUHJvcGVydHkoYSl9O2MuJG9uKFwiJGRlc3Ryb3lcIixmdW5jdGlvbigpe2wucmVuZGVyVW5rbm93bk9wdGlvbj1DfSl9XSxsaW5rOmZ1bmN0aW9uKGUsZixoLGwpe2Z1bmN0aW9uIGsoYSxcbmMsZCxlKXtkLiRyZW5kZXI9ZnVuY3Rpb24oKXt2YXIgYT1kLiR2aWV3VmFsdWU7ZS5oYXNPcHRpb24oYSk/KEEucGFyZW50KCkmJkEucmVtb3ZlKCksYy52YWwoYSksXCJcIj09PWEmJncucHJvcChcInNlbGVjdGVkXCIsITApKTpFKGEpJiZ3P2MudmFsKFwiXCIpOmUucmVuZGVyVW5rbm93bk9wdGlvbihhKX07Yy5vbihcImNoYW5nZVwiLGZ1bmN0aW9uKCl7YS4kYXBwbHkoZnVuY3Rpb24oKXtBLnBhcmVudCgpJiZBLnJlbW92ZSgpO2QuJHNldFZpZXdWYWx1ZShjLnZhbCgpKX0pfSl9ZnVuY3Rpb24gbShhLGMsZCl7dmFyIGU7ZC4kcmVuZGVyPWZ1bmN0aW9uKCl7dmFyIGE9bmV3IFZhKGQuJHZpZXdWYWx1ZSk7cShjLmZpbmQoXCJvcHRpb25cIiksZnVuY3Rpb24oYyl7Yy5zZWxlY3RlZD1CKGEuZ2V0KGMudmFsdWUpKX0pfTthLiR3YXRjaChmdW5jdGlvbigpe3hhKGUsZC4kdmlld1ZhbHVlKXx8KGU9YmEoZC4kdmlld1ZhbHVlKSxkLiRyZW5kZXIoKSl9KTtjLm9uKFwiY2hhbmdlXCIsZnVuY3Rpb24oKXthLiRhcHBseShmdW5jdGlvbigpe3ZhciBhPVxuW107cShjLmZpbmQoXCJvcHRpb25cIiksZnVuY3Rpb24oYyl7Yy5zZWxlY3RlZCYmYS5wdXNoKGMudmFsdWUpfSk7ZC4kc2V0Vmlld1ZhbHVlKGEpfSl9KX1mdW5jdGlvbiBuKGUsZixnKXtmdW5jdGlvbiBoKCl7dmFyIGE9e1wiXCI6W119LGM9W1wiXCJdLGQsayxzLHQsejt0PWcuJG1vZGVsVmFsdWU7ej15KGUpfHxbXTt2YXIgRT1uP1FiKHopOnosRixJLEE7ST17fTtzPSExO3ZhciBELEg7aWYocilpZih3JiZNKHQpKWZvcihzPW5ldyBWYShbXSksQT0wO0E8dC5sZW5ndGg7QSsrKUlbbV09dFtBXSxzLnB1dCh3KGUsSSksdFtBXSk7ZWxzZSBzPW5ldyBWYSh0KTtmb3IoQT0wO0Y9RS5sZW5ndGgsQTxGO0ErKyl7az1BO2lmKG4pe2s9RVtBXTtpZihcIiRcIj09PWsuY2hhckF0KDApKWNvbnRpbnVlO0lbbl09a31JW21dPXpba107ZD1wKGUsSSl8fFwiXCI7KGs9YVtkXSl8fChrPWFbZF09W10sYy5wdXNoKGQpKTtyP2Q9QihzLnJlbW92ZSh3P3coZSxJKTpxKGUsSSkpKToodz8oZD17fSxkW21dPXQsZD1cbncoZSxkKT09PXcoZSxJKSk6ZD10PT09cShlLEkpLHM9c3x8ZCk7RD1sKGUsSSk7RD1CKEQpP0Q6XCJcIjtrLnB1c2goe2lkOnc/dyhlLEkpOm4/RVtBXTpBLGxhYmVsOkQsc2VsZWN0ZWQ6ZH0pfXJ8fCh1fHxudWxsPT09dD9hW1wiXCJdLnVuc2hpZnQoe2lkOlwiXCIsbGFiZWw6XCJcIixzZWxlY3RlZDohc30pOnN8fGFbXCJcIl0udW5zaGlmdCh7aWQ6XCI/XCIsbGFiZWw6XCJcIixzZWxlY3RlZDohMH0pKTtJPTA7Zm9yKEU9Yy5sZW5ndGg7STxFO0krKyl7ZD1jW0ldO2s9YVtkXTt4Lmxlbmd0aDw9ST8odD17ZWxlbWVudDpDLmNsb25lKCkuYXR0cihcImxhYmVsXCIsZCksbGFiZWw6ay5sYWJlbH0sej1bdF0seC5wdXNoKHopLGYuYXBwZW5kKHQuZWxlbWVudCkpOih6PXhbSV0sdD16WzBdLHQubGFiZWwhPWQmJnQuZWxlbWVudC5hdHRyKFwibGFiZWxcIix0LmxhYmVsPWQpKTtEPW51bGw7QT0wO2ZvcihGPWsubGVuZ3RoO0E8RjtBKyspcz1rW0FdLChkPXpbQSsxXSk/KEQ9ZC5lbGVtZW50LGQubGFiZWwhPT1zLmxhYmVsJiZcbkQudGV4dChkLmxhYmVsPXMubGFiZWwpLGQuaWQhPT1zLmlkJiZELnZhbChkLmlkPXMuaWQpLGQuc2VsZWN0ZWQhPT1zLnNlbGVjdGVkJiZELnByb3AoXCJzZWxlY3RlZFwiLGQuc2VsZWN0ZWQ9cy5zZWxlY3RlZCkpOihcIlwiPT09cy5pZCYmdT9IPXU6KEg9di5jbG9uZSgpKS52YWwocy5pZCkuYXR0cihcInNlbGVjdGVkXCIscy5zZWxlY3RlZCkudGV4dChzLmxhYmVsKSx6LnB1c2goe2VsZW1lbnQ6SCxsYWJlbDpzLmxhYmVsLGlkOnMuaWQsc2VsZWN0ZWQ6cy5zZWxlY3RlZH0pLEQ/RC5hZnRlcihIKTp0LmVsZW1lbnQuYXBwZW5kKEgpLEQ9SCk7Zm9yKEErKzt6Lmxlbmd0aD5BOyl6LnBvcCgpLmVsZW1lbnQucmVtb3ZlKCl9Zm9yKDt4Lmxlbmd0aD5JOyl4LnBvcCgpWzBdLmVsZW1lbnQucmVtb3ZlKCl9dmFyIGs7aWYoIShrPXQubWF0Y2goZCkpKXRocm93IFRlKFwiaWV4cFwiLHQsaGEoZikpO3ZhciBsPWMoa1syXXx8a1sxXSksbT1rWzRdfHxrWzZdLG49a1s1XSxwPWMoa1szXXx8XCJcIikscT1cbmMoa1syXT9rWzFdOm0pLHk9YyhrWzddKSx3PWtbOF0/YyhrWzhdKTpudWxsLHg9W1t7ZWxlbWVudDpmLGxhYmVsOlwiXCJ9XV07dSYmKGEodSkoZSksdS5yZW1vdmVDbGFzcyhcIm5nLXNjb3BlXCIpLHUucmVtb3ZlKCkpO2YuZW1wdHkoKTtmLm9uKFwiY2hhbmdlXCIsZnVuY3Rpb24oKXtlLiRhcHBseShmdW5jdGlvbigpe3ZhciBhLGM9eShlKXx8W10sZD17fSxoLGssbCxwLHQsdix1O2lmKHIpZm9yKGs9W10scD0wLHY9eC5sZW5ndGg7cDx2O3ArKylmb3IoYT14W3BdLGw9MSx0PWEubGVuZ3RoO2w8dDtsKyspe2lmKChoPWFbbF0uZWxlbWVudClbMF0uc2VsZWN0ZWQpe2g9aC52YWwoKTtuJiYoZFtuXT1oKTtpZih3KWZvcih1PTA7dTxjLmxlbmd0aCYmKGRbbV09Y1t1XSx3KGUsZCkhPWgpO3UrKyk7ZWxzZSBkW21dPWNbaF07ay5wdXNoKHEoZSxkKSl9fWVsc2V7aD1mLnZhbCgpO2lmKFwiP1wiPT1oKWs9cztlbHNlIGlmKFwiXCI9PT1oKWs9bnVsbDtlbHNlIGlmKHcpZm9yKHU9MDt1PGMubGVuZ3RoO3UrKyl7aWYoZFttXT1cbmNbdV0sdyhlLGQpPT1oKXtrPXEoZSxkKTticmVha319ZWxzZSBkW21dPWNbaF0sbiYmKGRbbl09aCksaz1xKGUsZCk7MTx4WzBdLmxlbmd0aCYmeFswXVsxXS5pZCE9PWgmJih4WzBdWzFdLnNlbGVjdGVkPSExKX1nLiRzZXRWaWV3VmFsdWUoayl9KX0pO2cuJHJlbmRlcj1oO2UuJHdhdGNoKGgpfWlmKGxbMV0pe3ZhciBwPWxbMF07bD1sWzFdO3ZhciByPWgubXVsdGlwbGUsdD1oLm5nT3B0aW9ucyx1PSExLHcsdj15KFUuY3JlYXRlRWxlbWVudChcIm9wdGlvblwiKSksQz15KFUuY3JlYXRlRWxlbWVudChcIm9wdGdyb3VwXCIpKSxBPXYuY2xvbmUoKTtoPTA7Zm9yKHZhciB4PWYuY2hpbGRyZW4oKSxEPXgubGVuZ3RoO2g8RDtoKyspaWYoXCJcIj09PXhbaF0udmFsdWUpe3c9dT14LmVxKGgpO2JyZWFrfXAuaW5pdChsLHUsQSk7ciYmKGwuJGlzRW1wdHk9ZnVuY3Rpb24oYSl7cmV0dXJuIWF8fDA9PT1hLmxlbmd0aH0pO3Q/bihlLGYsbCk6cj9tKGUsZixsKTprKGUsZixsLHApfX19fV0saGQ9W1wiJGludGVycG9sYXRlXCIsXG5mdW5jdGlvbihhKXt2YXIgYz17YWRkT3B0aW9uOkMscmVtb3ZlT3B0aW9uOkN9O3JldHVybntyZXN0cmljdDpcIkVcIixwcmlvcml0eToxMDAsY29tcGlsZTpmdW5jdGlvbihkLGUpe2lmKEUoZS52YWx1ZSkpe3ZhciBnPWEoZC50ZXh0KCksITApO2d8fGUuJHNldChcInZhbHVlXCIsZC50ZXh0KCkpfXJldHVybiBmdW5jdGlvbihhLGQsZSl7dmFyIGs9ZC5wYXJlbnQoKSxtPWsuZGF0YShcIiRzZWxlY3RDb250cm9sbGVyXCIpfHxrLnBhcmVudCgpLmRhdGEoXCIkc2VsZWN0Q29udHJvbGxlclwiKTttJiZtLmRhdGFib3VuZD9kLnByb3AoXCJzZWxlY3RlZFwiLCExKTptPWM7Zz9hLiR3YXRjaChnLGZ1bmN0aW9uKGEsYyl7ZS4kc2V0KFwidmFsdWVcIixhKTthIT09YyYmbS5yZW1vdmVPcHRpb24oYyk7bS5hZGRPcHRpb24oYSl9KTptLmFkZE9wdGlvbihlLnZhbHVlKTtkLm9uKFwiJGRlc3Ryb3lcIixmdW5jdGlvbigpe20ucmVtb3ZlT3B0aW9uKGUudmFsdWUpfSl9fX19XSxnZD1hYSh7cmVzdHJpY3Q6XCJFXCIsXG50ZXJtaW5hbDohMH0pO08uYW5ndWxhci5ib290c3RyYXA/Y29uc29sZS5sb2coXCJXQVJOSU5HOiBUcmllZCB0byBsb2FkIGFuZ3VsYXIgbW9yZSB0aGFuIG9uY2UuXCIpOigoR2E9Ty5qUXVlcnkpPyh5PUdhLEQoR2EuZm4se3Njb3BlOkphLnNjb3BlLGlzb2xhdGVTY29wZTpKYS5pc29sYXRlU2NvcGUsY29udHJvbGxlcjpKYS5jb250cm9sbGVyLGluamVjdG9yOkphLmluamVjdG9yLGluaGVyaXRlZERhdGE6SmEuaW5oZXJpdGVkRGF0YX0pLEFiKFwicmVtb3ZlXCIsITAsITAsITEpLEFiKFwiZW1wdHlcIiwhMSwhMSwhMSksQWIoXCJodG1sXCIsITEsITEsITApKTp5PU4sRWEuZWxlbWVudD15LFpjKEVhKSx5KFUpLnJlYWR5KGZ1bmN0aW9uKCl7V2MoVSwkYil9KSl9KSh3aW5kb3csZG9jdW1lbnQpOyFhbmd1bGFyLiQkY3NwKCkmJmFuZ3VsYXIuZWxlbWVudChkb2N1bWVudCkuZmluZChcImhlYWRcIikucHJlcGVuZCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPkBjaGFyc2V0IFwiVVRGLThcIjtbbmdcXFxcOmNsb2FrXSxbbmctY2xvYWtdLFtkYXRhLW5nLWNsb2FrXSxbeC1uZy1jbG9ha10sLm5nLWNsb2FrLC54LW5nLWNsb2FrLC5uZy1oaWRle2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50O31uZ1xcXFw6Zm9ybXtkaXNwbGF5OmJsb2NrO30ubmctYW5pbWF0ZS1ibG9jay10cmFuc2l0aW9uc3t0cmFuc2l0aW9uOjBzIGFsbCFpbXBvcnRhbnQ7LXdlYmtpdC10cmFuc2l0aW9uOjBzIGFsbCFpbXBvcnRhbnQ7fTwvc3R5bGU+Jyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1hbmd1bGFyLm1pbi5qcy5tYXBcbiIsIi8qISBTb2NrZXQuSU8uanMgYnVpbGQ6MC45LjE3LCBkZXZlbG9wbWVudC4gQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPiBNSVQgTGljZW5zZWQgKi9cblxudmFyIGlvID0gKCd1bmRlZmluZWQnID09PSB0eXBlb2YgbW9kdWxlID8ge30gOiBtb2R1bGUuZXhwb3J0cyk7XG4oZnVuY3Rpb24oKSB7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGdsb2JhbCkge1xuXG4gIC8qKlxuICAgKiBJTyBuYW1lc3BhY2UuXG4gICAqXG4gICAqIEBuYW1lc3BhY2VcbiAgICovXG5cbiAgdmFyIGlvID0gZXhwb3J0cztcblxuICAvKipcbiAgICogU29ja2V0LklPIHZlcnNpb25cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgaW8udmVyc2lvbiA9ICcwLjkuMTcnO1xuXG4gIC8qKlxuICAgKiBQcm90b2NvbCBpbXBsZW1lbnRlZC5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgaW8ucHJvdG9jb2wgPSAxO1xuXG4gIC8qKlxuICAgKiBBdmFpbGFibGUgdHJhbnNwb3J0cywgdGhlc2Ugd2lsbCBiZSBwb3B1bGF0ZWQgd2l0aCB0aGUgYXZhaWxhYmxlIHRyYW5zcG9ydHNcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgaW8udHJhbnNwb3J0cyA9IFtdO1xuXG4gIC8qKlxuICAgKiBLZWVwIHRyYWNrIG9mIGpzb25wIGNhbGxiYWNrcy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLmogPSBbXTtcblxuICAvKipcbiAgICogS2VlcCB0cmFjayBvZiBvdXIgaW8uU29ja2V0c1xuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIGlvLnNvY2tldHMgPSB7fTtcblxuXG4gIC8qKlxuICAgKiBNYW5hZ2VzIGNvbm5lY3Rpb25zIHRvIGhvc3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJpXG4gICAqIEBQYXJhbSB7Qm9vbGVhbn0gZm9yY2UgY3JlYXRpb24gb2YgbmV3IHNvY2tldCAoZGVmYXVsdHMgdG8gZmFsc2UpXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGlvLmNvbm5lY3QgPSBmdW5jdGlvbiAoaG9zdCwgZGV0YWlscykge1xuICAgIHZhciB1cmkgPSBpby51dGlsLnBhcnNlVXJpKGhvc3QpXG4gICAgICAsIHV1cmlcbiAgICAgICwgc29ja2V0O1xuXG4gICAgaWYgKGdsb2JhbCAmJiBnbG9iYWwubG9jYXRpb24pIHtcbiAgICAgIHVyaS5wcm90b2NvbCA9IHVyaS5wcm90b2NvbCB8fCBnbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc2xpY2UoMCwgLTEpO1xuICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdCB8fCAoZ2xvYmFsLmRvY3VtZW50XG4gICAgICAgID8gZ2xvYmFsLmRvY3VtZW50LmRvbWFpbiA6IGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSk7XG4gICAgICB1cmkucG9ydCA9IHVyaS5wb3J0IHx8IGdsb2JhbC5sb2NhdGlvbi5wb3J0O1xuICAgIH1cblxuICAgIHV1cmkgPSBpby51dGlsLnVuaXF1ZVVyaSh1cmkpO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGhvc3Q6IHVyaS5ob3N0XG4gICAgICAsIHNlY3VyZTogJ2h0dHBzJyA9PSB1cmkucHJvdG9jb2xcbiAgICAgICwgcG9ydDogdXJpLnBvcnQgfHwgKCdodHRwcycgPT0gdXJpLnByb3RvY29sID8gNDQzIDogODApXG4gICAgICAsIHF1ZXJ5OiB1cmkucXVlcnkgfHwgJydcbiAgICB9O1xuXG4gICAgaW8udXRpbC5tZXJnZShvcHRpb25zLCBkZXRhaWxzKTtcblxuICAgIGlmIChvcHRpb25zWydmb3JjZSBuZXcgY29ubmVjdGlvbiddIHx8ICFpby5zb2NrZXRzW3V1cmldKSB7XG4gICAgICBzb2NrZXQgPSBuZXcgaW8uU29ja2V0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9uc1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSAmJiBzb2NrZXQpIHtcbiAgICAgIGlvLnNvY2tldHNbdXVyaV0gPSBzb2NrZXQ7XG4gICAgfVxuXG4gICAgc29ja2V0ID0gc29ja2V0IHx8IGlvLnNvY2tldHNbdXVyaV07XG5cbiAgICAvLyBpZiBwYXRoIGlzIGRpZmZlcmVudCBmcm9tICcnIG9yIC9cbiAgICByZXR1cm4gc29ja2V0Lm9mKHVyaS5wYXRoLmxlbmd0aCA+IDEgPyB1cmkucGF0aCA6ICcnKTtcbiAgfTtcblxufSkoJ29iamVjdCcgPT09IHR5cGVvZiBtb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6ICh0aGlzLmlvID0ge30pLCB0aGlzKTtcbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGdsb2JhbCkge1xuXG4gIC8qKlxuICAgKiBVdGlsaXRpZXMgbmFtZXNwYWNlLlxuICAgKlxuICAgKiBAbmFtZXNwYWNlXG4gICAqL1xuXG4gIHZhciB1dGlsID0gZXhwb3J0cy51dGlsID0ge307XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbiBVUklcbiAgICpcbiAgICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB2YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87XG5cbiAgdmFyIHBhcnRzID0gWydzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgJ2hvc3QnLCAncG9ydCcsICdyZWxhdGl2ZScsICdwYXRoJywgJ2RpcmVjdG9yeScsICdmaWxlJywgJ3F1ZXJ5JyxcbiAgICAgICAgICAgICAgICdhbmNob3InXTtcblxuICB1dGlsLnBhcnNlVXJpID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBtID0gcmUuZXhlYyhzdHIgfHwgJycpXG4gICAgICAsIHVyaSA9IHt9XG4gICAgICAsIGkgPSAxNDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cblxuICAgIHJldHVybiB1cmk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFByb2R1Y2VzIGEgdW5pcXVlIHVybCB0aGF0IGlkZW50aWZpZXMgYSBTb2NrZXQuSU8gY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHVyaVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnVuaXF1ZVVyaSA9IGZ1bmN0aW9uICh1cmkpIHtcbiAgICB2YXIgcHJvdG9jb2wgPSB1cmkucHJvdG9jb2xcbiAgICAgICwgaG9zdCA9IHVyaS5ob3N0XG4gICAgICAsIHBvcnQgPSB1cmkucG9ydDtcblxuICAgIGlmICgnZG9jdW1lbnQnIGluIGdsb2JhbCkge1xuICAgICAgaG9zdCA9IGhvc3QgfHwgZG9jdW1lbnQuZG9tYWluO1xuICAgICAgcG9ydCA9IHBvcnQgfHwgKHByb3RvY29sID09ICdodHRwcydcbiAgICAgICAgJiYgZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgIT09ICdodHRwczonID8gNDQzIDogZG9jdW1lbnQubG9jYXRpb24ucG9ydCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhvc3QgPSBob3N0IHx8ICdsb2NhbGhvc3QnO1xuXG4gICAgICBpZiAoIXBvcnQgJiYgcHJvdG9jb2wgPT0gJ2h0dHBzJykge1xuICAgICAgICBwb3J0ID0gNDQzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAocHJvdG9jb2wgfHwgJ2h0dHAnKSArICc6Ly8nICsgaG9zdCArICc6JyArIChwb3J0IHx8IDgwKTtcbiAgfTtcblxuICAvKipcbiAgICogTWVyZ2VzdCAyIHF1ZXJ5IHN0cmluZ3MgaW4gdG8gb25jZSB1bmlxdWUgcXVlcnkgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhZGRpdGlvblxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnF1ZXJ5ID0gZnVuY3Rpb24gKGJhc2UsIGFkZGl0aW9uKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdXRpbC5jaHVua1F1ZXJ5KGJhc2UgfHwgJycpXG4gICAgICAsIGNvbXBvbmVudHMgPSBbXTtcblxuICAgIHV0aWwubWVyZ2UocXVlcnksIHV0aWwuY2h1bmtRdWVyeShhZGRpdGlvbiB8fCAnJykpO1xuICAgIGZvciAodmFyIHBhcnQgaW4gcXVlcnkpIHtcbiAgICAgIGlmIChxdWVyeS5oYXNPd25Qcm9wZXJ0eShwYXJ0KSkge1xuICAgICAgICBjb21wb25lbnRzLnB1c2gocGFydCArICc9JyArIHF1ZXJ5W3BhcnRdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcG9uZW50cy5sZW5ndGggPyAnPycgKyBjb21wb25lbnRzLmpvaW4oJyYnKSA6ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIGEgcXVlcnlzdHJpbmcgaW4gdG8gYW4gb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLmNodW5rUXVlcnkgPSBmdW5jdGlvbiAocXMpIHtcbiAgICB2YXIgcXVlcnkgPSB7fVxuICAgICAgLCBwYXJhbXMgPSBxcy5zcGxpdCgnJicpXG4gICAgICAsIGkgPSAwXG4gICAgICAsIGwgPSBwYXJhbXMubGVuZ3RoXG4gICAgICAsIGt2O1xuXG4gICAgZm9yICg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGt2ID0gcGFyYW1zW2ldLnNwbGl0KCc9Jyk7XG4gICAgICBpZiAoa3ZbMF0pIHtcbiAgICAgICAgcXVlcnlba3ZbMF1dID0ga3ZbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2hlbiB0aGUgcGFnZSBpcyBsb2FkZWQuXG4gICAqXG4gICAqICAgICBpby51dGlsLmxvYWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygncGFnZSBsb2FkZWQnKTsgfSk7XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHZhciBwYWdlTG9hZGVkID0gZmFsc2U7XG5cbiAgdXRpbC5sb2FkID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKCdkb2N1bWVudCcgaW4gZ2xvYmFsICYmIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgfHwgcGFnZUxvYWRlZCkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuXG4gICAgdXRpbC5vbihnbG9iYWwsICdsb2FkJywgZm4sIGZhbHNlKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhbiBldmVudC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHV0aWwub24gPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQsIGZuLCBjYXB0dXJlKSB7XG4gICAgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmbik7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZm4sIGNhcHR1cmUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIHRoZSBjb3JyZWN0IGBYTUxIdHRwUmVxdWVzdGAgZm9yIHJlZ3VsYXIgYW5kIGNyb3NzIGRvbWFpbiByZXF1ZXN0cy5cbiAgICpcbiAgICogQHBhcmFtIHtCb29sZWFufSBbeGRvbWFpbl0gQ3JlYXRlIGEgcmVxdWVzdCB0aGF0IGNhbiBiZSB1c2VkIGNyb3NzIGRvbWFpbi5cbiAgICogQHJldHVybnMge1hNTEh0dHBSZXF1ZXN0fGZhbHNlfSBJZiB3ZSBjYW4gY3JlYXRlIGEgWE1MSHR0cFJlcXVlc3QuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICB1dGlsLnJlcXVlc3QgPSBmdW5jdGlvbiAoeGRvbWFpbikge1xuXG4gICAgaWYgKHhkb21haW4gJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhEb21haW5SZXF1ZXN0ICYmICF1dGlsLnVhLmhhc0NPUlMpIHtcbiAgICAgIHJldHVybiBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCB1dGlsLnVhLmhhc0NPUlMpKSB7XG4gICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF4ZG9tYWluKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IHdpbmRvd1soWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKSldKCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgICAgfSBjYXRjaChlKSB7IH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogWEhSIGJhc2VkIHRyYW5zcG9ydCBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIGludGVybmFsIHBhZ2VMb2FkZWQgdmFsdWUuXG4gICAqL1xuXG4gIGlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2Ygd2luZG93KSB7XG4gICAgdXRpbC5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHBhZ2VMb2FkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmVycyBhIGZ1bmN0aW9uIHRvIGVuc3VyZSBhIHNwaW5uZXIgaXMgbm90IGRpc3BsYXllZCBieSB0aGUgYnJvd3NlclxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLmRlZmVyID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKCF1dGlsLnVhLndlYmtpdCB8fCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW1wb3J0U2NyaXB0cykge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuXG4gICAgdXRpbC5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFRpbWVvdXQoZm4sIDEwMCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1lcmdlcyB0d28gb2JqZWN0cy5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlICh0YXJnZXQsIGFkZGl0aW9uYWwsIGRlZXAsIGxhc3RzZWVuKSB7XG4gICAgdmFyIHNlZW4gPSBsYXN0c2VlbiB8fCBbXVxuICAgICAgLCBkZXB0aCA9IHR5cGVvZiBkZWVwID09ICd1bmRlZmluZWQnID8gMiA6IGRlZXBcbiAgICAgICwgcHJvcDtcblxuICAgIGZvciAocHJvcCBpbiBhZGRpdGlvbmFsKSB7XG4gICAgICBpZiAoYWRkaXRpb25hbC5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiB1dGlsLmluZGV4T2Yoc2VlbiwgcHJvcCkgPCAwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdICE9PSAnb2JqZWN0JyB8fCAhZGVwdGgpIHtcbiAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBhZGRpdGlvbmFsW3Byb3BdO1xuICAgICAgICAgIHNlZW4ucHVzaChhZGRpdGlvbmFsW3Byb3BdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1dGlsLm1lcmdlKHRhcmdldFtwcm9wXSwgYWRkaXRpb25hbFtwcm9wXSwgZGVwdGggLSAxLCBzZWVuKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1lcmdlcyBwcm90b3R5cGVzIGZyb20gb2JqZWN0c1xuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLm1peGluID0gZnVuY3Rpb24gKGN0b3IsIGN0b3IyKSB7XG4gICAgdXRpbC5tZXJnZShjdG9yLnByb3RvdHlwZSwgY3RvcjIucHJvdG90eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogU2hvcnRjdXQgZm9yIHByb3RvdHlwaWNhbCBhbmQgc3RhdGljIGluaGVyaXRhbmNlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgdXRpbC5pbmhlcml0ID0gZnVuY3Rpb24gKGN0b3IsIGN0b3IyKSB7XG4gICAgZnVuY3Rpb24gZigpIHt9O1xuICAgIGYucHJvdG90eXBlID0gY3RvcjIucHJvdG90eXBlO1xuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IGY7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGFuIEFycmF5LlxuICAgKlxuICAgKiAgICAgaW8udXRpbC5pc0FycmF5KFtdKTsgLy8gdHJ1ZVxuICAgKiAgICAgaW8udXRpbC5pc0FycmF5KHt9KTsgLy8gZmFsc2VcbiAgICpcbiAgICogQHBhcmFtIE9iamVjdCBvYmpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbnRlcnNlY3RzIHZhbHVlcyBvZiB0d28gYXJyYXlzIGludG8gYSB0aGlyZFxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLmludGVyc2VjdCA9IGZ1bmN0aW9uIChhcnIsIGFycjIpIHtcbiAgICB2YXIgcmV0ID0gW11cbiAgICAgICwgbG9uZ2VzdCA9IGFyci5sZW5ndGggPiBhcnIyLmxlbmd0aCA/IGFyciA6IGFycjJcbiAgICAgICwgc2hvcnRlc3QgPSBhcnIubGVuZ3RoID4gYXJyMi5sZW5ndGggPyBhcnIyIDogYXJyO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzaG9ydGVzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmICh+dXRpbC5pbmRleE9mKGxvbmdlc3QsIHNob3J0ZXN0W2ldKSlcbiAgICAgICAgcmV0LnB1c2goc2hvcnRlc3RbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFycmF5IGluZGV4T2YgY29tcGF0aWJpbGl0eS5cbiAgICpcbiAgICogQHNlZSBiaXQubHkvYTVEeGEyXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwuaW5kZXhPZiA9IGZ1bmN0aW9uIChhcnIsIG8sIGkpIHtcblxuICAgIGZvciAodmFyIGogPSBhcnIubGVuZ3RoLCBpID0gaSA8IDAgPyBpICsgaiA8IDAgPyAwIDogaSArIGogOiBpIHx8IDA7XG4gICAgICAgICBpIDwgaiAmJiBhcnJbaV0gIT09IG87IGkrKykge31cblxuICAgIHJldHVybiBqIDw9IGkgPyAtMSA6IGk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGVudW1lcmFibGVzIHRvIGFycmF5LlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnRvQXJyYXkgPSBmdW5jdGlvbiAoZW51KSB7XG4gICAgdmFyIGFyciA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbnUubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgYXJyLnB1c2goZW51W2ldKTtcblxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVBIC8gZW5naW5lcyBkZXRlY3Rpb24gbmFtZXNwYWNlLlxuICAgKlxuICAgKiBAbmFtZXNwYWNlXG4gICAqL1xuXG4gIHV0aWwudWEgPSB7fTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgVUEgc3VwcG9ydHMgQ09SUyBmb3IgWEhSLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnVhLmhhc0NPUlMgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgJiYgKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGEud2l0aENyZWRlbnRpYWxzICE9IHVuZGVmaW5lZDtcbiAgfSkoKTtcblxuICAvKipcbiAgICogRGV0ZWN0IHdlYmtpdC5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC51YS53ZWJraXQgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yXG4gICAgJiYgL3dlYmtpdC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgIC8qKlxuICAgKiBEZXRlY3QgaVBhZC9pUGhvbmUvaVBvZC5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC51YS5pRGV2aWNlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIG5hdmlnYXRvclxuICAgICAgJiYgL2lQYWR8aVBob25lfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG59KSgndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzLCB0aGlzKTtcbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZXIgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBhcGkgcHVibGljLlxuICAgKi9cblxuICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIgKCkge307XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBsaXN0ZW5lclxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgaWYgKCF0aGlzLiRldmVudHMpIHtcbiAgICAgIHRoaXMuJGV2ZW50cyA9IHt9O1xuICAgIH1cblxuICAgIGlmICghdGhpcy4kZXZlbnRzW25hbWVdKSB7XG4gICAgICB0aGlzLiRldmVudHNbbmFtZV0gPSBmbjtcbiAgICB9IGVsc2UgaWYgKGlvLnV0aWwuaXNBcnJheSh0aGlzLiRldmVudHNbbmFtZV0pKSB7XG4gICAgICB0aGlzLiRldmVudHNbbmFtZV0ucHVzaChmbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXSA9IFt0aGlzLiRldmVudHNbbmFtZV0sIGZuXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuICAvKipcbiAgICogQWRkcyBhIHZvbGF0aWxlIGxpc3RlbmVyLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBvbiAoKSB7XG4gICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKG5hbWUsIG9uKTtcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIG9uLmxpc3RlbmVyID0gZm47XG4gICAgdGhpcy5vbihuYW1lLCBvbik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGxpc3RlbmVyLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRoaXMuJGV2ZW50cyAmJiB0aGlzLiRldmVudHNbbmFtZV0pIHtcbiAgICAgIHZhciBsaXN0ID0gdGhpcy4kZXZlbnRzW25hbWVdO1xuXG4gICAgICBpZiAoaW8udXRpbC5pc0FycmF5KGxpc3QpKSB7XG4gICAgICAgIHZhciBwb3MgPSAtMTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGZuIHx8IChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGZuKSkge1xuICAgICAgICAgICAgcG9zID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3MgPCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnNwbGljZShwb3MsIDEpO1xuXG4gICAgICAgIGlmICghbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy4kZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGxpc3QgPT09IGZuIHx8IChsaXN0Lmxpc3RlbmVyICYmIGxpc3QubGlzdGVuZXIgPT09IGZuKSkge1xuICAgICAgICBkZWxldGUgdGhpcy4kZXZlbnRzW25hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZm9yIGFuIGV2ZW50LlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy4kZXZlbnRzID0ge307XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kZXZlbnRzICYmIHRoaXMuJGV2ZW50c1tuYW1lXSkge1xuICAgICAgdGhpcy4kZXZlbnRzW25hbWVdID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogR2V0cyBhbGwgbGlzdGVuZXJzIGZvciBhIGNlcnRhaW4gZXZlbnQuXG4gICAqXG4gICAqIEBhcGkgcHVibGNpXG4gICAqL1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuJGV2ZW50cykge1xuICAgICAgdGhpcy4kZXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLiRldmVudHNbbmFtZV0pIHtcbiAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGlmICghaW8udXRpbC5pc0FycmF5KHRoaXMuJGV2ZW50c1tuYW1lXSkpIHtcbiAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXSA9IFt0aGlzLiRldmVudHNbbmFtZV1dO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLiRldmVudHNbbmFtZV07XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50LlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghdGhpcy4kZXZlbnRzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzLiRldmVudHNbbmFtZV07XG5cbiAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgaGFuZGxlcikge1xuICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGVsc2UgaWYgKGlvLnV0aWwuaXNBcnJheShoYW5kbGVyKSkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbik7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqIEJhc2VkIG9uIEpTT04yIChodHRwOi8vd3d3LkpTT04ub3JnL2pzLmh0bWwpLlxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgbmF0aXZlSlNPTikge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyB1c2UgbmF0aXZlIEpTT04gaWYgaXQncyBhdmFpbGFibGVcbiAgaWYgKG5hdGl2ZUpTT04gJiYgbmF0aXZlSlNPTi5wYXJzZSl7XG4gICAgcmV0dXJuIGV4cG9ydHMuSlNPTiA9IHtcbiAgICAgIHBhcnNlOiBuYXRpdmVKU09OLnBhcnNlXG4gICAgLCBzdHJpbmdpZnk6IG5hdGl2ZUpTT04uc3RyaW5naWZ5XG4gICAgfTtcbiAgfVxuXG4gIHZhciBKU09OID0gZXhwb3J0cy5KU09OID0ge307XG5cbiAgZnVuY3Rpb24gZihuKSB7XG4gICAgICAvLyBGb3JtYXQgaW50ZWdlcnMgdG8gaGF2ZSBhdCBsZWFzdCB0d28gZGlnaXRzLlxuICAgICAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4gOiBuO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0ZShkLCBrZXkpIHtcbiAgICByZXR1cm4gaXNGaW5pdGUoZC52YWx1ZU9mKCkpID9cbiAgICAgICAgZC5nZXRVVENGdWxsWWVhcigpICAgICArICctJyArXG4gICAgICAgIGYoZC5nZXRVVENNb250aCgpICsgMSkgKyAnLScgK1xuICAgICAgICBmKGQuZ2V0VVRDRGF0ZSgpKSAgICAgICsgJ1QnICtcbiAgICAgICAgZihkLmdldFVUQ0hvdXJzKCkpICAgICArICc6JyArXG4gICAgICAgIGYoZC5nZXRVVENNaW51dGVzKCkpICAgKyAnOicgK1xuICAgICAgICBmKGQuZ2V0VVRDU2Vjb25kcygpKSAgICsgJ1onIDogbnVsbDtcbiAgfTtcblxuICB2YXIgY3ggPSAvW1xcdTAwMDBcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICAgIGVzY2FwYWJsZSA9IC9bXFxcXFxcXCJcXHgwMC1cXHgxZlxceDdmLVxceDlmXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csXG4gICAgICBnYXAsXG4gICAgICBpbmRlbnQsXG4gICAgICBtZXRhID0geyAgICAvLyB0YWJsZSBvZiBjaGFyYWN0ZXIgc3Vic3RpdHV0aW9uc1xuICAgICAgICAgICdcXGInOiAnXFxcXGInLFxuICAgICAgICAgICdcXHQnOiAnXFxcXHQnLFxuICAgICAgICAgICdcXG4nOiAnXFxcXG4nLFxuICAgICAgICAgICdcXGYnOiAnXFxcXGYnLFxuICAgICAgICAgICdcXHInOiAnXFxcXHInLFxuICAgICAgICAgICdcIicgOiAnXFxcXFwiJyxcbiAgICAgICAgICAnXFxcXCc6ICdcXFxcXFxcXCdcbiAgICAgIH0sXG4gICAgICByZXA7XG5cblxuICBmdW5jdGlvbiBxdW90ZShzdHJpbmcpIHtcblxuLy8gSWYgdGhlIHN0cmluZyBjb250YWlucyBubyBjb250cm9sIGNoYXJhY3RlcnMsIG5vIHF1b3RlIGNoYXJhY3RlcnMsIGFuZCBub1xuLy8gYmFja3NsYXNoIGNoYXJhY3RlcnMsIHRoZW4gd2UgY2FuIHNhZmVseSBzbGFwIHNvbWUgcXVvdGVzIGFyb3VuZCBpdC5cbi8vIE90aGVyd2lzZSB3ZSBtdXN0IGFsc28gcmVwbGFjZSB0aGUgb2ZmZW5kaW5nIGNoYXJhY3RlcnMgd2l0aCBzYWZlIGVzY2FwZVxuLy8gc2VxdWVuY2VzLlxuXG4gICAgICBlc2NhcGFibGUubGFzdEluZGV4ID0gMDtcbiAgICAgIHJldHVybiBlc2NhcGFibGUudGVzdChzdHJpbmcpID8gJ1wiJyArIHN0cmluZy5yZXBsYWNlKGVzY2FwYWJsZSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICB2YXIgYyA9IG1ldGFbYV07XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBjID09PSAnc3RyaW5nJyA/IGMgOlxuICAgICAgICAgICAgICAnXFxcXHUnICsgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KTtcbiAgICAgIH0pICsgJ1wiJyA6ICdcIicgKyBzdHJpbmcgKyAnXCInO1xuICB9XG5cblxuICBmdW5jdGlvbiBzdHIoa2V5LCBob2xkZXIpIHtcblxuLy8gUHJvZHVjZSBhIHN0cmluZyBmcm9tIGhvbGRlcltrZXldLlxuXG4gICAgICB2YXIgaSwgICAgICAgICAgLy8gVGhlIGxvb3AgY291bnRlci5cbiAgICAgICAgICBrLCAgICAgICAgICAvLyBUaGUgbWVtYmVyIGtleS5cbiAgICAgICAgICB2LCAgICAgICAgICAvLyBUaGUgbWVtYmVyIHZhbHVlLlxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBtaW5kID0gZ2FwLFxuICAgICAgICAgIHBhcnRpYWwsXG4gICAgICAgICAgdmFsdWUgPSBob2xkZXJba2V5XTtcblxuLy8gSWYgdGhlIHZhbHVlIGhhcyBhIHRvSlNPTiBtZXRob2QsIGNhbGwgaXQgdG8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG5cbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGRhdGUoa2V5KTtcbiAgICAgIH1cblxuLy8gSWYgd2Ugd2VyZSBjYWxsZWQgd2l0aCBhIHJlcGxhY2VyIGZ1bmN0aW9uLCB0aGVuIGNhbGwgdGhlIHJlcGxhY2VyIHRvXG4vLyBvYnRhaW4gYSByZXBsYWNlbWVudCB2YWx1ZS5cblxuICAgICAgaWYgKHR5cGVvZiByZXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YWx1ZSA9IHJlcC5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgICB9XG5cbi8vIFdoYXQgaGFwcGVucyBuZXh0IGRlcGVuZHMgb24gdGhlIHZhbHVlJ3MgdHlwZS5cblxuICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgcmV0dXJuIHF1b3RlKHZhbHVlKTtcblxuICAgICAgY2FzZSAnbnVtYmVyJzpcblxuLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBFbmNvZGUgbm9uLWZpbml0ZSBudW1iZXJzIGFzIG51bGwuXG5cbiAgICAgICAgICByZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gU3RyaW5nKHZhbHVlKSA6ICdudWxsJztcblxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdudWxsJzpcblxuLy8gSWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbiBvciBudWxsLCBjb252ZXJ0IGl0IHRvIGEgc3RyaW5nLiBOb3RlOlxuLy8gdHlwZW9mIG51bGwgZG9lcyBub3QgcHJvZHVjZSAnbnVsbCcuIFRoZSBjYXNlIGlzIGluY2x1ZGVkIGhlcmUgaW5cbi8vIHRoZSByZW1vdGUgY2hhbmNlIHRoYXQgdGhpcyBnZXRzIGZpeGVkIHNvbWVkYXkuXG5cbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcblxuLy8gSWYgdGhlIHR5cGUgaXMgJ29iamVjdCcsIHdlIG1pZ2h0IGJlIGRlYWxpbmcgd2l0aCBhbiBvYmplY3Qgb3IgYW4gYXJyYXkgb3Jcbi8vIG51bGwuXG5cbiAgICAgIGNhc2UgJ29iamVjdCc6XG5cbi8vIER1ZSB0byBhIHNwZWNpZmljYXRpb24gYmx1bmRlciBpbiBFQ01BU2NyaXB0LCB0eXBlb2YgbnVsbCBpcyAnb2JqZWN0Jyxcbi8vIHNvIHdhdGNoIG91dCBmb3IgdGhhdCBjYXNlLlxuXG4gICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgICAgIH1cblxuLy8gTWFrZSBhbiBhcnJheSB0byBob2xkIHRoZSBwYXJ0aWFsIHJlc3VsdHMgb2Ygc3RyaW5naWZ5aW5nIHRoaXMgb2JqZWN0IHZhbHVlLlxuXG4gICAgICAgICAgZ2FwICs9IGluZGVudDtcbiAgICAgICAgICBwYXJ0aWFsID0gW107XG5cbi8vIElzIHRoZSB2YWx1ZSBhbiBhcnJheT9cblxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuXG4vLyBUaGUgdmFsdWUgaXMgYW4gYXJyYXkuIFN0cmluZ2lmeSBldmVyeSBlbGVtZW50LiBVc2UgbnVsbCBhcyBhIHBsYWNlaG9sZGVyXG4vLyBmb3Igbm9uLUpTT04gdmFsdWVzLlxuXG4gICAgICAgICAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICBwYXJ0aWFsW2ldID0gc3RyKGksIHZhbHVlKSB8fCAnbnVsbCc7XG4gICAgICAgICAgICAgIH1cblxuLy8gSm9pbiBhbGwgb2YgdGhlIGVsZW1lbnRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsIGFuZCB3cmFwIHRoZW0gaW5cbi8vIGJyYWNrZXRzLlxuXG4gICAgICAgICAgICAgIHYgPSBwYXJ0aWFsLmxlbmd0aCA9PT0gMCA/ICdbXScgOiBnYXAgP1xuICAgICAgICAgICAgICAgICAgJ1tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnXScgOlxuICAgICAgICAgICAgICAgICAgJ1snICsgcGFydGlhbC5qb2luKCcsJykgKyAnXSc7XG4gICAgICAgICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgIH1cblxuLy8gSWYgdGhlIHJlcGxhY2VyIGlzIGFuIGFycmF5LCB1c2UgaXQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlIHN0cmluZ2lmaWVkLlxuXG4gICAgICAgICAgaWYgKHJlcCAmJiB0eXBlb2YgcmVwID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICBsZW5ndGggPSByZXAubGVuZ3RoO1xuICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVwW2ldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgIGsgPSByZXBbaV07XG4gICAgICAgICAgICAgICAgICAgICAgdiA9IHN0cihrLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGlhbC5wdXNoKHF1b3RlKGspICsgKGdhcCA/ICc6ICcgOiAnOicpICsgdik7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcblxuLy8gT3RoZXJ3aXNlLCBpdGVyYXRlIHRocm91Z2ggYWxsIG9mIHRoZSBrZXlzIGluIHRoZSBvYmplY3QuXG5cbiAgICAgICAgICAgICAgZm9yIChrIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpYWwucHVzaChxdW90ZShrKSArIChnYXAgPyAnOiAnIDogJzonKSArIHYpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuLy8gSm9pbiBhbGwgb2YgdGhlIG1lbWJlciB0ZXh0cyB0b2dldGhlciwgc2VwYXJhdGVkIHdpdGggY29tbWFzLFxuLy8gYW5kIHdyYXAgdGhlbSBpbiBicmFjZXMuXG5cbiAgICAgICAgICB2ID0gcGFydGlhbC5sZW5ndGggPT09IDAgPyAne30nIDogZ2FwID9cbiAgICAgICAgICAgICAgJ3tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnfScgOlxuICAgICAgICAgICAgICAneycgKyBwYXJ0aWFsLmpvaW4oJywnKSArICd9JztcbiAgICAgICAgICBnYXAgPSBtaW5kO1xuICAgICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICB9XG5cbi8vIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCB5ZXQgaGF2ZSBhIHN0cmluZ2lmeSBtZXRob2QsIGdpdmUgaXQgb25lLlxuXG4gIEpTT04uc3RyaW5naWZ5ID0gZnVuY3Rpb24gKHZhbHVlLCByZXBsYWNlciwgc3BhY2UpIHtcblxuLy8gVGhlIHN0cmluZ2lmeSBtZXRob2QgdGFrZXMgYSB2YWx1ZSBhbmQgYW4gb3B0aW9uYWwgcmVwbGFjZXIsIGFuZCBhbiBvcHRpb25hbFxuLy8gc3BhY2UgcGFyYW1ldGVyLCBhbmQgcmV0dXJucyBhIEpTT04gdGV4dC4gVGhlIHJlcGxhY2VyIGNhbiBiZSBhIGZ1bmN0aW9uXG4vLyB0aGF0IGNhbiByZXBsYWNlIHZhbHVlcywgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncyB0aGF0IHdpbGwgc2VsZWN0IHRoZSBrZXlzLlxuLy8gQSBkZWZhdWx0IHJlcGxhY2VyIG1ldGhvZCBjYW4gYmUgcHJvdmlkZWQuIFVzZSBvZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGNhblxuLy8gcHJvZHVjZSB0ZXh0IHRoYXQgaXMgbW9yZSBlYXNpbHkgcmVhZGFibGUuXG5cbiAgICAgIHZhciBpO1xuICAgICAgZ2FwID0gJyc7XG4gICAgICBpbmRlbnQgPSAnJztcblxuLy8gSWYgdGhlIHNwYWNlIHBhcmFtZXRlciBpcyBhIG51bWJlciwgbWFrZSBhbiBpbmRlbnQgc3RyaW5nIGNvbnRhaW5pbmcgdGhhdFxuLy8gbWFueSBzcGFjZXMuXG5cbiAgICAgIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNwYWNlOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaW5kZW50ICs9ICcgJztcbiAgICAgICAgICB9XG5cbi8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcsIGl0IHdpbGwgYmUgdXNlZCBhcyB0aGUgaW5kZW50IHN0cmluZy5cblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaW5kZW50ID0gc3BhY2U7XG4gICAgICB9XG5cbi8vIElmIHRoZXJlIGlzIGEgcmVwbGFjZXIsIGl0IG11c3QgYmUgYSBmdW5jdGlvbiBvciBhbiBhcnJheS5cbi8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3IuXG5cbiAgICAgIHJlcCA9IHJlcGxhY2VyO1xuICAgICAgaWYgKHJlcGxhY2VyICYmIHR5cGVvZiByZXBsYWNlciAhPT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICAgICAodHlwZW9mIHJlcGxhY2VyICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICAgICAgICB0eXBlb2YgcmVwbGFjZXIubGVuZ3RoICE9PSAnbnVtYmVyJykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pTT04uc3RyaW5naWZ5Jyk7XG4gICAgICB9XG5cbi8vIE1ha2UgYSBmYWtlIHJvb3Qgb2JqZWN0IGNvbnRhaW5pbmcgb3VyIHZhbHVlIHVuZGVyIHRoZSBrZXkgb2YgJycuXG4vLyBSZXR1cm4gdGhlIHJlc3VsdCBvZiBzdHJpbmdpZnlpbmcgdGhlIHZhbHVlLlxuXG4gICAgICByZXR1cm4gc3RyKCcnLCB7Jyc6IHZhbHVlfSk7XG4gIH07XG5cbi8vIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCB5ZXQgaGF2ZSBhIHBhcnNlIG1ldGhvZCwgZ2l2ZSBpdCBvbmUuXG5cbiAgSlNPTi5wYXJzZSA9IGZ1bmN0aW9uICh0ZXh0LCByZXZpdmVyKSB7XG4gIC8vIFRoZSBwYXJzZSBtZXRob2QgdGFrZXMgYSB0ZXh0IGFuZCBhbiBvcHRpb25hbCByZXZpdmVyIGZ1bmN0aW9uLCBhbmQgcmV0dXJuc1xuICAvLyBhIEphdmFTY3JpcHQgdmFsdWUgaWYgdGhlIHRleHQgaXMgYSB2YWxpZCBKU09OIHRleHQuXG5cbiAgICAgIHZhciBqO1xuXG4gICAgICBmdW5jdGlvbiB3YWxrKGhvbGRlciwga2V5KSB7XG5cbiAgLy8gVGhlIHdhbGsgbWV0aG9kIGlzIHVzZWQgdG8gcmVjdXJzaXZlbHkgd2FsayB0aGUgcmVzdWx0aW5nIHN0cnVjdHVyZSBzb1xuICAvLyB0aGF0IG1vZGlmaWNhdGlvbnMgY2FuIGJlIG1hZGUuXG5cbiAgICAgICAgICB2YXIgaywgdiwgdmFsdWUgPSBob2xkZXJba2V5XTtcbiAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdiA9IHdhbGsodmFsdWUsIGspO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSB2O1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtrXTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldml2ZXIuY2FsbChob2xkZXIsIGtleSwgdmFsdWUpO1xuICAgICAgfVxuXG5cbiAgLy8gUGFyc2luZyBoYXBwZW5zIGluIGZvdXIgc3RhZ2VzLiBJbiB0aGUgZmlyc3Qgc3RhZ2UsIHdlIHJlcGxhY2UgY2VydGFpblxuICAvLyBVbmljb2RlIGNoYXJhY3RlcnMgd2l0aCBlc2NhcGUgc2VxdWVuY2VzLiBKYXZhU2NyaXB0IGhhbmRsZXMgbWFueSBjaGFyYWN0ZXJzXG4gIC8vIGluY29ycmVjdGx5LCBlaXRoZXIgc2lsZW50bHkgZGVsZXRpbmcgdGhlbSwgb3IgdHJlYXRpbmcgdGhlbSBhcyBsaW5lIGVuZGluZ3MuXG5cbiAgICAgIHRleHQgPSBTdHJpbmcodGV4dCk7XG4gICAgICBjeC5sYXN0SW5kZXggPSAwO1xuICAgICAgaWYgKGN4LnRlc3QodGV4dCkpIHtcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGN4LCBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ1xcXFx1JyArXG4gICAgICAgICAgICAgICAgICAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gIC8vIEluIHRoZSBzZWNvbmQgc3RhZ2UsIHdlIHJ1biB0aGUgdGV4dCBhZ2FpbnN0IHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCBsb29rXG4gIC8vIGZvciBub24tSlNPTiBwYXR0ZXJucy4gV2UgYXJlIGVzcGVjaWFsbHkgY29uY2VybmVkIHdpdGggJygpJyBhbmQgJ25ldydcbiAgLy8gYmVjYXVzZSB0aGV5IGNhbiBjYXVzZSBpbnZvY2F0aW9uLCBhbmQgJz0nIGJlY2F1c2UgaXQgY2FuIGNhdXNlIG11dGF0aW9uLlxuICAvLyBCdXQganVzdCB0byBiZSBzYWZlLCB3ZSB3YW50IHRvIHJlamVjdCBhbGwgdW5leHBlY3RlZCBmb3Jtcy5cblxuICAvLyBXZSBzcGxpdCB0aGUgc2Vjb25kIHN0YWdlIGludG8gNCByZWdleHAgb3BlcmF0aW9ucyBpbiBvcmRlciB0byB3b3JrIGFyb3VuZFxuICAvLyBjcmlwcGxpbmcgaW5lZmZpY2llbmNpZXMgaW4gSUUncyBhbmQgU2FmYXJpJ3MgcmVnZXhwIGVuZ2luZXMuIEZpcnN0IHdlXG4gIC8vIHJlcGxhY2UgdGhlIEpTT04gYmFja3NsYXNoIHBhaXJzIHdpdGggJ0AnIChhIG5vbi1KU09OIGNoYXJhY3RlcikuIFNlY29uZCwgd2VcbiAgLy8gcmVwbGFjZSBhbGwgc2ltcGxlIHZhbHVlIHRva2VucyB3aXRoICddJyBjaGFyYWN0ZXJzLiBUaGlyZCwgd2UgZGVsZXRlIGFsbFxuICAvLyBvcGVuIGJyYWNrZXRzIHRoYXQgZm9sbG93IGEgY29sb24gb3IgY29tbWEgb3IgdGhhdCBiZWdpbiB0aGUgdGV4dC4gRmluYWxseSxcbiAgLy8gd2UgbG9vayB0byBzZWUgdGhhdCB0aGUgcmVtYWluaW5nIGNoYXJhY3RlcnMgYXJlIG9ubHkgd2hpdGVzcGFjZSBvciAnXScgb3JcbiAgLy8gJywnIG9yICc6JyBvciAneycgb3IgJ30nLiBJZiB0aGF0IGlzIHNvLCB0aGVuIHRoZSB0ZXh0IGlzIHNhZmUgZm9yIGV2YWwuXG5cbiAgICAgIGlmICgvXltcXF0sOnt9XFxzXSokL1xuICAgICAgICAgICAgICAudGVzdCh0ZXh0LnJlcGxhY2UoL1xcXFwoPzpbXCJcXFxcXFwvYmZucnRdfHVbMC05YS1mQS1GXXs0fSkvZywgJ0AnKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1wiW15cIlxcXFxcXG5cXHJdKlwifHRydWV8ZmFsc2V8bnVsbHwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPy9nLCAnXScpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKD86Xnw6fCwpKD86XFxzKlxcWykrL2csICcnKSkpIHtcblxuICAvLyBJbiB0aGUgdGhpcmQgc3RhZ2Ugd2UgdXNlIHRoZSBldmFsIGZ1bmN0aW9uIHRvIGNvbXBpbGUgdGhlIHRleHQgaW50byBhXG4gIC8vIEphdmFTY3JpcHQgc3RydWN0dXJlLiBUaGUgJ3snIG9wZXJhdG9yIGlzIHN1YmplY3QgdG8gYSBzeW50YWN0aWMgYW1iaWd1aXR5XG4gIC8vIGluIEphdmFTY3JpcHQ6IGl0IGNhbiBiZWdpbiBhIGJsb2NrIG9yIGFuIG9iamVjdCBsaXRlcmFsLiBXZSB3cmFwIHRoZSB0ZXh0XG4gIC8vIGluIHBhcmVucyB0byBlbGltaW5hdGUgdGhlIGFtYmlndWl0eS5cblxuICAgICAgICAgIGogPSBldmFsKCcoJyArIHRleHQgKyAnKScpO1xuXG4gIC8vIEluIHRoZSBvcHRpb25hbCBmb3VydGggc3RhZ2UsIHdlIHJlY3Vyc2l2ZWx5IHdhbGsgdGhlIG5ldyBzdHJ1Y3R1cmUsIHBhc3NpbmdcbiAgLy8gZWFjaCBuYW1lL3ZhbHVlIHBhaXIgdG8gYSByZXZpdmVyIGZ1bmN0aW9uIGZvciBwb3NzaWJsZSB0cmFuc2Zvcm1hdGlvbi5cblxuICAgICAgICAgIHJldHVybiB0eXBlb2YgcmV2aXZlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICAgIHdhbGsoeycnOiBqfSwgJycpIDogajtcbiAgICAgIH1cblxuICAvLyBJZiB0aGUgdGV4dCBpcyBub3QgSlNPTiBwYXJzZWFibGUsIHRoZW4gYSBTeW50YXhFcnJvciBpcyB0aHJvd24uXG5cbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignSlNPTi5wYXJzZScpO1xuICB9O1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzXG4gICwgdHlwZW9mIEpTT04gIT09ICd1bmRlZmluZWQnID8gSlNPTiA6IHVuZGVmaW5lZFxuKTtcblxuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8pIHtcblxuICAvKipcbiAgICogUGFyc2VyIG5hbWVzcGFjZS5cbiAgICpcbiAgICogQG5hbWVzcGFjZVxuICAgKi9cblxuICB2YXIgcGFyc2VyID0gZXhwb3J0cy5wYXJzZXIgPSB7fTtcblxuICAvKipcbiAgICogUGFja2V0IHR5cGVzLlxuICAgKi9cblxuICB2YXIgcGFja2V0cyA9IHBhcnNlci5wYWNrZXRzID0gW1xuICAgICAgJ2Rpc2Nvbm5lY3QnXG4gICAgLCAnY29ubmVjdCdcbiAgICAsICdoZWFydGJlYXQnXG4gICAgLCAnbWVzc2FnZSdcbiAgICAsICdqc29uJ1xuICAgICwgJ2V2ZW50J1xuICAgICwgJ2FjaydcbiAgICAsICdlcnJvcidcbiAgICAsICdub29wJ1xuICBdO1xuXG4gIC8qKlxuICAgKiBFcnJvcnMgcmVhc29ucy5cbiAgICovXG5cbiAgdmFyIHJlYXNvbnMgPSBwYXJzZXIucmVhc29ucyA9IFtcbiAgICAgICd0cmFuc3BvcnQgbm90IHN1cHBvcnRlZCdcbiAgICAsICdjbGllbnQgbm90IGhhbmRzaGFrZW4nXG4gICAgLCAndW5hdXRob3JpemVkJ1xuICBdO1xuXG4gIC8qKlxuICAgKiBFcnJvcnMgYWR2aWNlLlxuICAgKi9cblxuICB2YXIgYWR2aWNlID0gcGFyc2VyLmFkdmljZSA9IFtcbiAgICAgICdyZWNvbm5lY3QnXG4gIF07XG5cbiAgLyoqXG4gICAqIFNob3J0Y3V0cy5cbiAgICovXG5cbiAgdmFyIEpTT04gPSBpby5KU09OXG4gICAgLCBpbmRleE9mID0gaW8udXRpbC5pbmRleE9mO1xuXG4gIC8qKlxuICAgKiBFbmNvZGVzIGEgcGFja2V0LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgcGFyc2VyLmVuY29kZVBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICB2YXIgdHlwZSA9IGluZGV4T2YocGFja2V0cywgcGFja2V0LnR5cGUpXG4gICAgICAsIGlkID0gcGFja2V0LmlkIHx8ICcnXG4gICAgICAsIGVuZHBvaW50ID0gcGFja2V0LmVuZHBvaW50IHx8ICcnXG4gICAgICAsIGFjayA9IHBhY2tldC5hY2tcbiAgICAgICwgZGF0YSA9IG51bGw7XG5cbiAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIHZhciByZWFzb24gPSBwYWNrZXQucmVhc29uID8gaW5kZXhPZihyZWFzb25zLCBwYWNrZXQucmVhc29uKSA6ICcnXG4gICAgICAgICAgLCBhZHYgPSBwYWNrZXQuYWR2aWNlID8gaW5kZXhPZihhZHZpY2UsIHBhY2tldC5hZHZpY2UpIDogJyc7XG5cbiAgICAgICAgaWYgKHJlYXNvbiAhPT0gJycgfHwgYWR2ICE9PSAnJylcbiAgICAgICAgICBkYXRhID0gcmVhc29uICsgKGFkdiAhPT0gJycgPyAoJysnICsgYWR2KSA6ICcnKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIGlmIChwYWNrZXQuZGF0YSAhPT0gJycpXG4gICAgICAgICAgZGF0YSA9IHBhY2tldC5kYXRhO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXZlbnQnOlxuICAgICAgICB2YXIgZXYgPSB7IG5hbWU6IHBhY2tldC5uYW1lIH07XG5cbiAgICAgICAgaWYgKHBhY2tldC5hcmdzICYmIHBhY2tldC5hcmdzLmxlbmd0aCkge1xuICAgICAgICAgIGV2LmFyZ3MgPSBwYWNrZXQuYXJncztcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShldik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHBhY2tldC5kYXRhKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Nvbm5lY3QnOlxuICAgICAgICBpZiAocGFja2V0LnFzKVxuICAgICAgICAgIGRhdGEgPSBwYWNrZXQucXM7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdhY2snOlxuICAgICAgICBkYXRhID0gcGFja2V0LmFja0lkXG4gICAgICAgICAgKyAocGFja2V0LmFyZ3MgJiYgcGFja2V0LmFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgID8gJysnICsgSlNPTi5zdHJpbmdpZnkocGFja2V0LmFyZ3MpIDogJycpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgcGFja2V0IHdpdGggcmVxdWlyZWQgZnJhZ21lbnRzXG4gICAgdmFyIGVuY29kZWQgPSBbXG4gICAgICAgIHR5cGVcbiAgICAgICwgaWQgKyAoYWNrID09ICdkYXRhJyA/ICcrJyA6ICcnKVxuICAgICAgLCBlbmRwb2ludFxuICAgIF07XG5cbiAgICAvLyBkYXRhIGZyYWdtZW50IGlzIG9wdGlvbmFsXG4gICAgaWYgKGRhdGEgIT09IG51bGwgJiYgZGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgZW5jb2RlZC5wdXNoKGRhdGEpO1xuXG4gICAgcmV0dXJuIGVuY29kZWQuam9pbignOicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gbWVzc2FnZXNcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHBhcnNlci5lbmNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgICB2YXIgZGVjb2RlZCA9ICcnO1xuXG4gICAgaWYgKHBhY2tldHMubGVuZ3RoID09IDEpXG4gICAgICByZXR1cm4gcGFja2V0c1swXTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gcGFja2V0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBwYWNrZXQgPSBwYWNrZXRzW2ldO1xuICAgICAgZGVjb2RlZCArPSAnXFx1ZmZmZCcgKyBwYWNrZXQubGVuZ3RoICsgJ1xcdWZmZmQnICsgcGFja2V0c1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVjb2RlZDtcbiAgfTtcblxuICAvKipcbiAgICogRGVjb2RlcyBhIHBhY2tldFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgdmFyIHJlZ2V4cCA9IC8oW146XSspOihbMC05XSspPyhcXCspPzooW146XSspPzo/KFtcXHNcXFNdKik/LztcblxuICBwYXJzZXIuZGVjb2RlUGFja2V0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgcGllY2VzID0gZGF0YS5tYXRjaChyZWdleHApO1xuXG4gICAgaWYgKCFwaWVjZXMpIHJldHVybiB7fTtcblxuICAgIHZhciBpZCA9IHBpZWNlc1syXSB8fCAnJ1xuICAgICAgLCBkYXRhID0gcGllY2VzWzVdIHx8ICcnXG4gICAgICAsIHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHBhY2tldHNbcGllY2VzWzFdXVxuICAgICAgICAgICwgZW5kcG9pbnQ6IHBpZWNlc1s0XSB8fCAnJ1xuICAgICAgICB9O1xuXG4gICAgLy8gd2hldGhlciB3ZSBuZWVkIHRvIGFja25vd2xlZGdlIHRoZSBwYWNrZXRcbiAgICBpZiAoaWQpIHtcbiAgICAgIHBhY2tldC5pZCA9IGlkO1xuICAgICAgaWYgKHBpZWNlc1szXSlcbiAgICAgICAgcGFja2V0LmFjayA9ICdkYXRhJztcbiAgICAgIGVsc2VcbiAgICAgICAgcGFja2V0LmFjayA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGRpZmZlcmVudCBwYWNrZXQgdHlwZXNcbiAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIHZhciBwaWVjZXMgPSBkYXRhLnNwbGl0KCcrJyk7XG4gICAgICAgIHBhY2tldC5yZWFzb24gPSByZWFzb25zW3BpZWNlc1swXV0gfHwgJyc7XG4gICAgICAgIHBhY2tldC5hZHZpY2UgPSBhZHZpY2VbcGllY2VzWzFdXSB8fCAnJztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICBwYWNrZXQuZGF0YSA9IGRhdGEgfHwgJyc7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdldmVudCc6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIG9wdHMgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgIHBhY2tldC5uYW1lID0gb3B0cy5uYW1lO1xuICAgICAgICAgIHBhY2tldC5hcmdzID0gb3B0cy5hcmdzO1xuICAgICAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgICAgICBwYWNrZXQuYXJncyA9IHBhY2tldC5hcmdzIHx8IFtdO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcGFja2V0LmRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Nvbm5lY3QnOlxuICAgICAgICBwYWNrZXQucXMgPSBkYXRhIHx8ICcnO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYWNrJzpcbiAgICAgICAgdmFyIHBpZWNlcyA9IGRhdGEubWF0Y2goL14oWzAtOV0rKShcXCspPyguKikvKTtcbiAgICAgICAgaWYgKHBpZWNlcykge1xuICAgICAgICAgIHBhY2tldC5hY2tJZCA9IHBpZWNlc1sxXTtcbiAgICAgICAgICBwYWNrZXQuYXJncyA9IFtdO1xuXG4gICAgICAgICAgaWYgKHBpZWNlc1szXSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcGFja2V0LmFyZ3MgPSBwaWVjZXNbM10gPyBKU09OLnBhcnNlKHBpZWNlc1szXSkgOiBbXTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZGlzY29ubmVjdCc6XG4gICAgICBjYXNlICdoZWFydGJlYXQnOlxuICAgICAgICBicmVhaztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHBhY2tldDtcbiAgfTtcblxuICAvKipcbiAgICogRGVjb2RlcyBkYXRhIHBheWxvYWQuIERldGVjdHMgbXVsdGlwbGUgbWVzc2FnZXNcbiAgICpcbiAgICogQHJldHVybiB7QXJyYXl9IG1lc3NhZ2VzXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHBhcnNlci5kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAvLyBJRSBkb2Vzbid0IGxpa2UgZGF0YVtpXSBmb3IgdW5pY29kZSBjaGFycywgY2hhckF0IHdvcmtzIGZpbmVcbiAgICBpZiAoZGF0YS5jaGFyQXQoMCkgPT0gJ1xcdWZmZmQnKSB7XG4gICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSAnJzsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGRhdGEuY2hhckF0KGkpID09ICdcXHVmZmZkJykge1xuICAgICAgICAgIHJldC5wdXNoKHBhcnNlci5kZWNvZGVQYWNrZXQoZGF0YS5zdWJzdHIoaSArIDEpLnN1YnN0cigwLCBsZW5ndGgpKSk7XG4gICAgICAgICAgaSArPSBOdW1iZXIobGVuZ3RoKSArIDE7XG4gICAgICAgICAgbGVuZ3RoID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGVuZ3RoICs9IGRhdGEuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbcGFyc2VyLmRlY29kZVBhY2tldChkYXRhKV07XG4gICAgfVxuICB9O1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbik7XG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMuVHJhbnNwb3J0ID0gVHJhbnNwb3J0O1xuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSB0cmFuc3BvcnQgdGVtcGxhdGUgZm9yIGFsbCBzdXBwb3J0ZWQgdHJhbnNwb3J0IG1ldGhvZHMuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBUcmFuc3BvcnQgKHNvY2tldCwgc2Vzc2lkKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgdGhpcy5zZXNzaWQgPSBzZXNzaWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGx5IEV2ZW50RW1pdHRlciBtaXhpbi5cbiAgICovXG5cbiAgaW8udXRpbC5taXhpbihUcmFuc3BvcnQsIGlvLkV2ZW50RW1pdHRlcik7XG5cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgaGVhcnRiZWF0cyBpcyBlbmFibGVkIGZvciB0aGlzIHRyYW5zcG9ydFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5oZWFydGJlYXRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuIFdoZW4gYSBuZXcgcmVzcG9uc2UgaXMgcmVjZWl2ZWRcbiAgICogaXQgd2lsbCBhdXRvbWF0aWNhbGx5IHVwZGF0ZSB0aGUgdGltZW91dCwgZGVjb2RlIHRoZSBtZXNzYWdlIGFuZFxuICAgKiBmb3J3YXJkcyB0aGUgcmVzcG9uc2UgdG8gdGhlIG9uTWVzc2FnZSBmdW5jdGlvbiBmb3IgZnVydGhlciBwcm9jZXNzaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBSZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5jbGVhckNsb3NlVGltZW91dCgpO1xuXG4gICAgLy8gSWYgdGhlIGNvbm5lY3Rpb24gaW4gY3VycmVudGx5IG9wZW4gKG9yIGluIGEgcmVvcGVuaW5nIHN0YXRlKSByZXNldCB0aGUgY2xvc2VcbiAgICAvLyB0aW1lb3V0IHNpbmNlIHdlIGhhdmUganVzdCByZWNlaXZlZCBkYXRhLiBUaGlzIGNoZWNrIGlzIG5lY2Vzc2FyeSBzb1xuICAgIC8vIHRoYXQgd2UgZG9uJ3QgcmVzZXQgdGhlIHRpbWVvdXQgb24gYW4gZXhwbGljaXRseSBkaXNjb25uZWN0ZWQgY29ubmVjdGlvbi5cbiAgICBpZiAodGhpcy5zb2NrZXQuY29ubmVjdGVkIHx8IHRoaXMuc29ja2V0LmNvbm5lY3RpbmcgfHwgdGhpcy5zb2NrZXQucmVjb25uZWN0aW5nKSB7XG4gICAgICB0aGlzLnNldENsb3NlVGltZW91dCgpO1xuICAgIH1cblxuICAgIGlmIChkYXRhICE9PSAnJykge1xuICAgICAgLy8gdG9kbzogd2Ugc2hvdWxkIG9ubHkgZG8gZGVjb2RlUGF5bG9hZCBmb3IgeGhyIHRyYW5zcG9ydHNcbiAgICAgIHZhciBtc2dzID0gaW8ucGFyc2VyLmRlY29kZVBheWxvYWQoZGF0YSk7XG5cbiAgICAgIGlmIChtc2dzICYmIG1zZ3MubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbXNncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB0aGlzLm9uUGFja2V0KG1zZ3NbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFja2V0cy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgdGhpcy5zb2NrZXQuc2V0SGVhcnRiZWF0VGltZW91dCgpO1xuXG4gICAgaWYgKHBhY2tldC50eXBlID09ICdoZWFydGJlYXQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vbkhlYXJ0YmVhdCgpO1xuICAgIH1cblxuICAgIGlmIChwYWNrZXQudHlwZSA9PSAnY29ubmVjdCcgJiYgcGFja2V0LmVuZHBvaW50ID09ICcnKSB7XG4gICAgICB0aGlzLm9uQ29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmIChwYWNrZXQudHlwZSA9PSAnZXJyb3InICYmIHBhY2tldC5hZHZpY2UgPT0gJ3JlY29ubmVjdCcpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5zb2NrZXQub25QYWNrZXQocGFja2V0KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIGNsb3NlIHRpbWVvdXRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUuc2V0Q2xvc2VUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5jbG9zZVRpbWVvdXQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5jbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5vbkRpc2Nvbm5lY3QoKTtcbiAgICAgIH0sIHRoaXMuc29ja2V0LmNsb3NlVGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0cmFuc3BvcnQgZGlzY29ubmVjdHMuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uRGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4pIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLmNsZWFyVGltZW91dHMoKTtcbiAgICB0aGlzLnNvY2tldC5vbkRpc2Nvbm5lY3QoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdHJhbnNwb3J0IGNvbm5lY3RzXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uQ29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNvY2tldC5vbkNvbm5lY3QoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXJzIGNsb3NlIHRpbWVvdXRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUuY2xlYXJDbG9zZVRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY2xvc2VUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVvdXQpO1xuICAgICAgdGhpcy5jbG9zZVRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXIgdGltZW91dHNcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUuY2xlYXJUaW1lb3V0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCk7XG5cbiAgICBpZiAodGhpcy5yZW9wZW5UaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5yZW9wZW5UaW1lb3V0KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgcGFja2V0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgb2JqZWN0LlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgdGhpcy5zZW5kKGlvLnBhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0KSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmQgdGhlIHJlY2VpdmVkIGhlYXJ0YmVhdCBtZXNzYWdlIGJhY2sgdG8gc2VydmVyLiBTbyB0aGUgc2VydmVyXG4gICAqIGtub3dzIHdlIGFyZSBzdGlsbCBjb25uZWN0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFydGJlYXQgSGVhcnRiZWF0IHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25IZWFydGJlYXQgPSBmdW5jdGlvbiAoaGVhcnRiZWF0KSB7XG4gICAgdGhpcy5wYWNrZXQoeyB0eXBlOiAnaGVhcnRiZWF0JyB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBvcGVucy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCk7XG4gICAgdGhpcy5zb2NrZXQub25PcGVuKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHRoZSBiYXNlIHdoZW4gdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgU29ja2V0LklPIHNlcnZlclxuICAgKiBoYXMgYmVlbiBkaXNjb25uZWN0ZWQuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLyogRklYTUU6IHJlb3BlbiBkZWxheSBjYXVzaW5nIGEgaW5maW5pdCBsb29wXG4gICAgdGhpcy5yZW9wZW5UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9wZW4oKTtcbiAgICB9LCB0aGlzLnNvY2tldC5vcHRpb25zWydyZW9wZW4gZGVsYXknXSk7Ki9cblxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5zb2NrZXQub25DbG9zZSgpO1xuICAgIHRoaXMub25EaXNjb25uZWN0KCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIGNvbm5lY3Rpb24gdXJsIGJhc2VkIG9uIHRoZSBTb2NrZXQuSU8gVVJMIFByb3RvY29sLlxuICAgKiBTZWUgPGh0dHBzOi8vZ2l0aHViLmNvbS9sZWFybmJvb3N0L3NvY2tldC5pby1ub2RlLz4gZm9yIG1vcmUgZGV0YWlscy5cbiAgICpcbiAgICogQHJldHVybnMge1N0cmluZ30gQ29ubmVjdGlvbiB1cmxcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUucHJlcGFyZVVybCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMuc29ja2V0Lm9wdGlvbnM7XG5cbiAgICByZXR1cm4gdGhpcy5zY2hlbWUoKSArICc6Ly8nXG4gICAgICArIG9wdGlvbnMuaG9zdCArICc6JyArIG9wdGlvbnMucG9ydCArICcvJ1xuICAgICAgKyBvcHRpb25zLnJlc291cmNlICsgJy8nICsgaW8ucHJvdG9jb2xcbiAgICAgICsgJy8nICsgdGhpcy5uYW1lICsgJy8nICsgdGhpcy5zZXNzaWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgdHJhbnNwb3J0IGlzIHJlYWR5IHRvIHN0YXJ0IGEgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldCBUaGUgc29ja2V0IGluc3RhbmNlIHRoYXQgbmVlZHMgYSB0cmFuc3BvcnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24gKHNvY2tldCwgZm4pIHtcbiAgICBmbi5jYWxsKHRoaXMpO1xuICB9O1xufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4pO1xuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8sIGdsb2JhbCkge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMuU29ja2V0ID0gU29ja2V0O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYFNvY2tldC5JTyBjbGllbnRgIHdoaWNoIGNhbiBlc3RhYmxpc2ggYSBwZXJzaXN0ZW50XG4gICAqIGNvbm5lY3Rpb24gd2l0aCBhIFNvY2tldC5JTyBlbmFibGVkIHNlcnZlci5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gU29ja2V0IChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICBwb3J0OiA4MFxuICAgICAgLCBzZWN1cmU6IGZhbHNlXG4gICAgICAsIGRvY3VtZW50OiAnZG9jdW1lbnQnIGluIGdsb2JhbCA/IGRvY3VtZW50IDogZmFsc2VcbiAgICAgICwgcmVzb3VyY2U6ICdzb2NrZXQuaW8nXG4gICAgICAsIHRyYW5zcG9ydHM6IGlvLnRyYW5zcG9ydHNcbiAgICAgICwgJ2Nvbm5lY3QgdGltZW91dCc6IDEwMDAwXG4gICAgICAsICd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyc6IHRydWVcbiAgICAgICwgJ3JlY29ubmVjdCc6IHRydWVcbiAgICAgICwgJ3JlY29ubmVjdGlvbiBkZWxheSc6IDUwMFxuICAgICAgLCAncmVjb25uZWN0aW9uIGxpbWl0JzogSW5maW5pdHlcbiAgICAgICwgJ3Jlb3BlbiBkZWxheSc6IDMwMDBcbiAgICAgICwgJ21heCByZWNvbm5lY3Rpb24gYXR0ZW1wdHMnOiAxMFxuICAgICAgLCAnc3luYyBkaXNjb25uZWN0IG9uIHVubG9hZCc6IGZhbHNlXG4gICAgICAsICdhdXRvIGNvbm5lY3QnOiB0cnVlXG4gICAgICAsICdmbGFzaCBwb2xpY3kgcG9ydCc6IDEwODQzXG4gICAgICAsICdtYW51YWxGbHVzaCc6IGZhbHNlXG4gICAgfTtcblxuICAgIGlvLnV0aWwubWVyZ2UodGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm5hbWVzcGFjZXMgPSB7fTtcbiAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgIHRoaXMuZG9CdWZmZXIgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnNbJ3N5bmMgZGlzY29ubmVjdCBvbiB1bmxvYWQnXSAmJlxuICAgICAgICAoIXRoaXMuaXNYRG9tYWluKCkgfHwgaW8udXRpbC51YS5oYXNDT1JTKSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgaW8udXRpbC5vbihnbG9iYWwsICdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuZGlzY29ubmVjdFN5bmMoKTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zWydhdXRvIGNvbm5lY3QnXSkge1xuICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgfVxufTtcblxuICAvKipcbiAgICogQXBwbHkgRXZlbnRFbWl0dGVyIG1peGluLlxuICAgKi9cblxuICBpby51dGlsLm1peGluKFNvY2tldCwgaW8uRXZlbnRFbWl0dGVyKTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIG5hbWVzcGFjZSBsaXN0ZW5lci9lbWl0dGVyIGZvciB0aGlzIHNvY2tldFxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMubmFtZXNwYWNlc1tuYW1lXSkge1xuICAgICAgdGhpcy5uYW1lc3BhY2VzW25hbWVdID0gbmV3IGlvLlNvY2tldE5hbWVzcGFjZSh0aGlzLCBuYW1lKTtcblxuICAgICAgaWYgKG5hbWUgIT09ICcnKSB7XG4gICAgICAgIHRoaXMubmFtZXNwYWNlc1tuYW1lXS5wYWNrZXQoeyB0eXBlOiAnY29ubmVjdCcgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubmFtZXNwYWNlc1tuYW1lXTtcbiAgfTtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIGdpdmVuIGV2ZW50IHRvIHRoZSBTb2NrZXQgYW5kIGFsbCBuYW1lc3BhY2VzXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLnB1Ymxpc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgbnNwO1xuXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLm5hbWVzcGFjZXMpIHtcbiAgICAgIGlmICh0aGlzLm5hbWVzcGFjZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgbnNwID0gdGhpcy5vZihpKTtcbiAgICAgICAgbnNwLiRlbWl0LmFwcGx5KG5zcCwgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHRoZSBoYW5kc2hha2VcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVtcHR5ICgpIHsgfTtcblxuICBTb2NrZXQucHJvdG90eXBlLmhhbmRzaGFrZSA9IGZ1bmN0aW9uIChmbikge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgZnVuY3Rpb24gY29tcGxldGUgKGRhdGEpIHtcbiAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgc2VsZi5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHNlbGYub25FcnJvcihkYXRhLm1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4uYXBwbHkobnVsbCwgZGF0YS5zcGxpdCgnOicpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHVybCA9IFtcbiAgICAgICAgICAnaHR0cCcgKyAob3B0aW9ucy5zZWN1cmUgPyAncycgOiAnJykgKyAnOi8nXG4gICAgICAgICwgb3B0aW9ucy5ob3N0ICsgJzonICsgb3B0aW9ucy5wb3J0XG4gICAgICAgICwgb3B0aW9ucy5yZXNvdXJjZVxuICAgICAgICAsIGlvLnByb3RvY29sXG4gICAgICAgICwgaW8udXRpbC5xdWVyeSh0aGlzLm9wdGlvbnMucXVlcnksICd0PScgKyArbmV3IERhdGUpXG4gICAgICBdLmpvaW4oJy8nKTtcblxuICAgIGlmICh0aGlzLmlzWERvbWFpbigpICYmICFpby51dGlsLnVhLmhhc0NPUlMpIHtcbiAgICAgIHZhciBpbnNlcnRBdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXVxuICAgICAgICAsIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICBzY3JpcHQuc3JjID0gdXJsICsgJyZqc29ucD0nICsgaW8uai5sZW5ndGg7XG4gICAgICBpbnNlcnRBdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIGluc2VydEF0KTtcblxuICAgICAgaW8uai5wdXNoKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGNvbXBsZXRlKGRhdGEpO1xuICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB4aHIgPSBpby51dGlsLnJlcXVlc3QoKTtcblxuICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICBpZiAodGhpcy5pc1hEb21haW4oKSkge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuXG4gICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICBjb21wbGV0ZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPT0gNDAzKSB7XG4gICAgICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuY29ubmVjdGluZyA9IGZhbHNlOyAgICAgICAgICAgIFxuICAgICAgICAgICAgIXNlbGYucmVjb25uZWN0aW5nICYmIHNlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB4aHIuc2VuZChudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgYW4gYXZhaWxhYmxlIHRyYW5zcG9ydCBiYXNlZCBvbiB0aGUgb3B0aW9ucyBzdXBwbGllZCBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLmdldFRyYW5zcG9ydCA9IGZ1bmN0aW9uIChvdmVycmlkZSkge1xuICAgIHZhciB0cmFuc3BvcnRzID0gb3ZlcnJpZGUgfHwgdGhpcy50cmFuc3BvcnRzLCBtYXRjaDtcblxuICAgIGZvciAodmFyIGkgPSAwLCB0cmFuc3BvcnQ7IHRyYW5zcG9ydCA9IHRyYW5zcG9ydHNbaV07IGkrKykge1xuICAgICAgaWYgKGlvLlRyYW5zcG9ydFt0cmFuc3BvcnRdXG4gICAgICAgICYmIGlvLlRyYW5zcG9ydFt0cmFuc3BvcnRdLmNoZWNrKHRoaXMpXG4gICAgICAgICYmICghdGhpcy5pc1hEb21haW4oKSB8fCBpby5UcmFuc3BvcnRbdHJhbnNwb3J0XS54ZG9tYWluQ2hlY2sodGhpcykpKSB7XG4gICAgICAgIHJldHVybiBuZXcgaW8uVHJhbnNwb3J0W3RyYW5zcG9ydF0odGhpcywgdGhpcy5zZXNzaW9uaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dIENhbGxiYWNrLlxuICAgKiBAcmV0dXJucyB7aW8uU29ja2V0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAodGhpcy5jb25uZWN0aW5nKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb25uZWN0aW5nID0gdHJ1ZTtcbiAgICBcbiAgICB0aGlzLmhhbmRzaGFrZShmdW5jdGlvbiAoc2lkLCBoZWFydGJlYXQsIGNsb3NlLCB0cmFuc3BvcnRzKSB7XG4gICAgICBzZWxmLnNlc3Npb25pZCA9IHNpZDtcbiAgICAgIHNlbGYuY2xvc2VUaW1lb3V0ID0gY2xvc2UgKiAxMDAwO1xuICAgICAgc2VsZi5oZWFydGJlYXRUaW1lb3V0ID0gaGVhcnRiZWF0ICogMTAwMDtcbiAgICAgIGlmKCFzZWxmLnRyYW5zcG9ydHMpXG4gICAgICAgICAgc2VsZi50cmFuc3BvcnRzID0gc2VsZi5vcmlnVHJhbnNwb3J0cyA9ICh0cmFuc3BvcnRzID8gaW8udXRpbC5pbnRlcnNlY3QoXG4gICAgICAgICAgICAgIHRyYW5zcG9ydHMuc3BsaXQoJywnKVxuICAgICAgICAgICAgLCBzZWxmLm9wdGlvbnMudHJhbnNwb3J0c1xuICAgICAgICAgICkgOiBzZWxmLm9wdGlvbnMudHJhbnNwb3J0cyk7XG5cbiAgICAgIHNlbGYuc2V0SGVhcnRiZWF0VGltZW91dCgpO1xuXG4gICAgICBmdW5jdGlvbiBjb25uZWN0ICh0cmFuc3BvcnRzKXtcbiAgICAgICAgaWYgKHNlbGYudHJhbnNwb3J0KSBzZWxmLnRyYW5zcG9ydC5jbGVhclRpbWVvdXRzKCk7XG5cbiAgICAgICAgc2VsZi50cmFuc3BvcnQgPSBzZWxmLmdldFRyYW5zcG9ydCh0cmFuc3BvcnRzKTtcbiAgICAgICAgaWYgKCFzZWxmLnRyYW5zcG9ydCkgcmV0dXJuIHNlbGYucHVibGlzaCgnY29ubmVjdF9mYWlsZWQnKTtcblxuICAgICAgICAvLyBvbmNlIHRoZSB0cmFuc3BvcnQgaXMgcmVhZHlcbiAgICAgICAgc2VsZi50cmFuc3BvcnQucmVhZHkoc2VsZiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYuY29ubmVjdGluZyA9IHRydWU7XG4gICAgICAgICAgc2VsZi5wdWJsaXNoKCdjb25uZWN0aW5nJywgc2VsZi50cmFuc3BvcnQubmFtZSk7XG4gICAgICAgICAgc2VsZi50cmFuc3BvcnQub3BlbigpO1xuXG4gICAgICAgICAgaWYgKHNlbGYub3B0aW9uc1snY29ubmVjdCB0aW1lb3V0J10pIHtcbiAgICAgICAgICAgIHNlbGYuY29ubmVjdFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoIXNlbGYuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25uZWN0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zWyd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyddKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVtYWluaW5nID0gc2VsZi50cmFuc3BvcnRzO1xuXG4gICAgICAgICAgICAgICAgICB3aGlsZSAocmVtYWluaW5nLmxlbmd0aCA+IDAgJiYgcmVtYWluaW5nLnNwbGljZSgwLDEpWzBdICE9XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFuc3BvcnQubmFtZSkge31cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgY29ubmVjdChyZW1haW5pbmcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYucHVibGlzaCgnY29ubmVjdF9mYWlsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgc2VsZi5vcHRpb25zWydjb25uZWN0IHRpbWVvdXQnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29ubmVjdChzZWxmLnRyYW5zcG9ydHMpO1xuXG4gICAgICBzZWxmLm9uY2UoJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuY29ubmVjdFRpbWVvdXRUaW1lcik7XG5cbiAgICAgICAgZm4gJiYgdHlwZW9mIGZuID09ICdmdW5jdGlvbicgJiYgZm4oKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbmQgc2V0cyBhIG5ldyBoZWFydGJlYXQgdGltZW91dCB1c2luZyB0aGUgdmFsdWUgZ2l2ZW4gYnkgdGhlXG4gICAqIHNlcnZlciBkdXJpbmcgdGhlIGhhbmRzaGFrZS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuc2V0SGVhcnRiZWF0VGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpO1xuICAgIGlmKHRoaXMudHJhbnNwb3J0ICYmICF0aGlzLnRyYW5zcG9ydC5oZWFydGJlYXRzKCkpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi50cmFuc3BvcnQub25DbG9zZSgpO1xuICAgIH0sIHRoaXMuaGVhcnRiZWF0VGltZW91dCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgcGFja2V0LlxuICAgKiBAcmV0dXJucyB7aW8uU29ja2V0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKHRoaXMuY29ubmVjdGVkICYmICF0aGlzLmRvQnVmZmVyKSB7XG4gICAgICB0aGlzLnRyYW5zcG9ydC5wYWNrZXQoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVmZmVyLnB1c2goZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgYnVmZmVyIHN0YXRlXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLnNldEJ1ZmZlciA9IGZ1bmN0aW9uICh2KSB7XG4gICAgdGhpcy5kb0J1ZmZlciA9IHY7XG5cbiAgICBpZiAoIXYgJiYgdGhpcy5jb25uZWN0ZWQgJiYgdGhpcy5idWZmZXIubGVuZ3RoKSB7XG4gICAgICBpZiAoIXRoaXMub3B0aW9uc1snbWFudWFsRmx1c2gnXSkge1xuICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGbHVzaGVzIHRoZSBidWZmZXIgZGF0YSBvdmVyIHRoZSB3aXJlLlxuICAgKiBUbyBiZSBpbnZva2VkIG1hbnVhbGx5IHdoZW4gJ21hbnVhbEZsdXNoJyBpcyBzZXQgdG8gdHJ1ZS5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5mbHVzaEJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHJhbnNwb3J0LnBheWxvYWQodGhpcy5idWZmZXIpO1xuICAgIHRoaXMuYnVmZmVyID0gW107XG4gIH07XG4gIFxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0IHRoZSBlc3RhYmxpc2hlZCBjb25uZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7aW8uU29ja2V0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY29ubmVjdGVkIHx8IHRoaXMuY29ubmVjdGluZykge1xuICAgICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgICB0aGlzLm9mKCcnKS5wYWNrZXQoeyB0eXBlOiAnZGlzY29ubmVjdCcgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGhhbmRsZSBkaXNjb25uZWN0aW9uIGltbWVkaWF0ZWx5XG4gICAgICB0aGlzLm9uRGlzY29ubmVjdCgnYm9vdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgd2l0aCBhIHN5bmMgWEhSLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5kaXNjb25uZWN0U3luYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlbnN1cmUgZGlzY29ubmVjdGlvblxuICAgIHZhciB4aHIgPSBpby51dGlsLnJlcXVlc3QoKTtcbiAgICB2YXIgdXJpID0gW1xuICAgICAgICAnaHR0cCcgKyAodGhpcy5vcHRpb25zLnNlY3VyZSA/ICdzJyA6ICcnKSArICc6LydcbiAgICAgICwgdGhpcy5vcHRpb25zLmhvc3QgKyAnOicgKyB0aGlzLm9wdGlvbnMucG9ydFxuICAgICAgLCB0aGlzLm9wdGlvbnMucmVzb3VyY2VcbiAgICAgICwgaW8ucHJvdG9jb2xcbiAgICAgICwgJydcbiAgICAgICwgdGhpcy5zZXNzaW9uaWRcbiAgICBdLmpvaW4oJy8nKSArICcvP2Rpc2Nvbm5lY3Q9MSc7XG5cbiAgICB4aHIub3BlbignR0VUJywgdXJpLCBmYWxzZSk7XG4gICAgeGhyLnNlbmQobnVsbCk7XG5cbiAgICAvLyBoYW5kbGUgZGlzY29ubmVjdGlvbiBpbW1lZGlhdGVseVxuICAgIHRoaXMub25EaXNjb25uZWN0KCdib290ZWQnKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgd2UgbmVlZCB0byB1c2UgY3Jvc3MgZG9tYWluIGVuYWJsZWQgdHJhbnNwb3J0cy4gQ3Jvc3MgZG9tYWluIHdvdWxkXG4gICAqIGJlIGEgZGlmZmVyZW50IHBvcnQgb3IgZGlmZmVyZW50IGRvbWFpbiBuYW1lLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuaXNYRG9tYWluID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHBvcnQgPSBnbG9iYWwubG9jYXRpb24ucG9ydCB8fFxuICAgICAgKCdodHRwczonID09IGdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbCA/IDQ0MyA6IDgwKTtcblxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaG9zdCAhPT0gZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lIFxuICAgICAgfHwgdGhpcy5vcHRpb25zLnBvcnQgIT0gcG9ydDtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5vbkNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICBpZiAoIXRoaXMuZG9CdWZmZXIpIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRvIGZsdXNoIHRoZSBidWZmZXJcbiAgICAgICAgdGhpcy5zZXRCdWZmZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5lbWl0KCdjb25uZWN0Jyk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdHJhbnNwb3J0IG9wZW5zXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdHJhbnNwb3J0IGNsb3Nlcy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdHJhbnNwb3J0IGZpcnN0IG9wZW5zIGEgY29ubmVjdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdGV4dFxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgIHRoaXMub2YocGFja2V0LmVuZHBvaW50KS5vblBhY2tldChwYWNrZXQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGVycm9yLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIgJiYgZXJyLmFkdmljZSkge1xuICAgICAgaWYgKGVyci5hZHZpY2UgPT09ICdyZWNvbm5lY3QnICYmICh0aGlzLmNvbm5lY3RlZCB8fCB0aGlzLmNvbm5lY3RpbmcpKSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlY29ubmVjdCkge1xuICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnB1Ymxpc2goJ2Vycm9yJywgZXJyICYmIGVyci5yZWFzb24gPyBlcnIucmVhc29uIDogZXJyKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBkaXNjb25uZWN0cy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUub25EaXNjb25uZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHZhciB3YXNDb25uZWN0ZWQgPSB0aGlzLmNvbm5lY3RlZFxuICAgICAgLCB3YXNDb25uZWN0aW5nID0gdGhpcy5jb25uZWN0aW5nO1xuXG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcblxuICAgIGlmICh3YXNDb25uZWN0ZWQgfHwgd2FzQ29ubmVjdGluZykge1xuICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgIHRoaXMudHJhbnNwb3J0LmNsZWFyVGltZW91dHMoKTtcbiAgICAgIGlmICh3YXNDb25uZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCdkaXNjb25uZWN0JywgcmVhc29uKTtcblxuICAgICAgICBpZiAoJ2Jvb3RlZCcgIT0gcmVhc29uICYmIHRoaXMub3B0aW9ucy5yZWNvbm5lY3QgJiYgIXRoaXMucmVjb25uZWN0aW5nKSB7XG4gICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHVwb24gcmVjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5yZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMgPSAwO1xuICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXkgPSB0aGlzLm9wdGlvbnNbJ3JlY29ubmVjdGlvbiBkZWxheSddO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAsIG1heEF0dGVtcHRzID0gdGhpcy5vcHRpb25zWydtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzJ11cbiAgICAgICwgdHJ5TXVsdGlwbGUgPSB0aGlzLm9wdGlvbnNbJ3RyeSBtdWx0aXBsZSB0cmFuc3BvcnRzJ11cbiAgICAgICwgbGltaXQgPSB0aGlzLm9wdGlvbnNbJ3JlY29ubmVjdGlvbiBsaW1pdCddO1xuXG4gICAgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgICAgaWYgKHNlbGYuY29ubmVjdGVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gc2VsZi5uYW1lc3BhY2VzKSB7XG4gICAgICAgICAgaWYgKHNlbGYubmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiAnJyAhPT0gaSkge1xuICAgICAgICAgICAgICBzZWxmLm5hbWVzcGFjZXNbaV0ucGFja2V0KHsgdHlwZTogJ2Nvbm5lY3QnIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLnB1Ymxpc2goJ3JlY29ubmVjdCcsIHNlbGYudHJhbnNwb3J0Lm5hbWUsIHNlbGYucmVjb25uZWN0aW9uQXR0ZW1wdHMpO1xuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi5yZWNvbm5lY3Rpb25UaW1lcik7XG5cbiAgICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3RfZmFpbGVkJywgbWF5YmVSZWNvbm5lY3QpO1xuICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcignY29ubmVjdCcsIG1heWJlUmVjb25uZWN0KTtcblxuICAgICAgc2VsZi5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcblxuICAgICAgZGVsZXRlIHNlbGYucmVjb25uZWN0aW9uQXR0ZW1wdHM7XG4gICAgICBkZWxldGUgc2VsZi5yZWNvbm5lY3Rpb25EZWxheTtcbiAgICAgIGRlbGV0ZSBzZWxmLnJlY29ubmVjdGlvblRpbWVyO1xuICAgICAgZGVsZXRlIHNlbGYucmVkb1RyYW5zcG9ydHM7XG5cbiAgICAgIHNlbGYub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXSA9IHRyeU11bHRpcGxlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYXliZVJlY29ubmVjdCAoKSB7XG4gICAgICBpZiAoIXNlbGYucmVjb25uZWN0aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGYuY29ubmVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZXNldCgpO1xuICAgICAgfTtcblxuICAgICAgaWYgKHNlbGYuY29ubmVjdGluZyAmJiBzZWxmLnJlY29ubmVjdGluZykge1xuICAgICAgICByZXR1cm4gc2VsZi5yZWNvbm5lY3Rpb25UaW1lciA9IHNldFRpbWVvdXQobWF5YmVSZWNvbm5lY3QsIDEwMDApO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZi5yZWNvbm5lY3Rpb25BdHRlbXB0cysrID49IG1heEF0dGVtcHRzKSB7XG4gICAgICAgIGlmICghc2VsZi5yZWRvVHJhbnNwb3J0cykge1xuICAgICAgICAgIHNlbGYub24oJ2Nvbm5lY3RfZmFpbGVkJywgbWF5YmVSZWNvbm5lY3QpO1xuICAgICAgICAgIHNlbGYub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXSA9IHRydWU7XG4gICAgICAgICAgc2VsZi50cmFuc3BvcnRzID0gc2VsZi5vcmlnVHJhbnNwb3J0cztcbiAgICAgICAgICBzZWxmLnRyYW5zcG9ydCA9IHNlbGYuZ2V0VHJhbnNwb3J0KCk7XG4gICAgICAgICAgc2VsZi5yZWRvVHJhbnNwb3J0cyA9IHRydWU7XG4gICAgICAgICAgc2VsZi5jb25uZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5wdWJsaXNoKCdyZWNvbm5lY3RfZmFpbGVkJyk7XG4gICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNlbGYucmVjb25uZWN0aW9uRGVsYXkgPCBsaW1pdCkge1xuICAgICAgICAgIHNlbGYucmVjb25uZWN0aW9uRGVsYXkgKj0gMjsgLy8gZXhwb25lbnRpYWwgYmFjayBvZmZcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuY29ubmVjdCgpO1xuICAgICAgICBzZWxmLnB1Ymxpc2goJ3JlY29ubmVjdGluZycsIHNlbGYucmVjb25uZWN0aW9uRGVsYXksIHNlbGYucmVjb25uZWN0aW9uQXR0ZW1wdHMpO1xuICAgICAgICBzZWxmLnJlY29ubmVjdGlvblRpbWVyID0gc2V0VGltZW91dChtYXliZVJlY29ubmVjdCwgc2VsZi5yZWNvbm5lY3Rpb25EZWxheSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXSA9IGZhbHNlO1xuICAgIHRoaXMucmVjb25uZWN0aW9uVGltZXIgPSBzZXRUaW1lb3V0KG1heWJlUmVjb25uZWN0LCB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KTtcblxuICAgIHRoaXMub24oJ2Nvbm5lY3QnLCBtYXliZVJlY29ubmVjdCk7XG4gIH07XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuICAsIHRoaXNcbik7XG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMuU29ja2V0TmFtZXNwYWNlID0gU29ja2V0TmFtZXNwYWNlO1xuXG4gIC8qKlxuICAgKiBTb2NrZXQgbmFtZXNwYWNlIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gU29ja2V0TmFtZXNwYWNlIChzb2NrZXQsIG5hbWUpIHtcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lIHx8ICcnO1xuICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICB0aGlzLmpzb24gPSBuZXcgRmxhZyh0aGlzLCAnanNvbicpO1xuICAgIHRoaXMuYWNrUGFja2V0cyA9IDA7XG4gICAgdGhpcy5hY2tzID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGx5IEV2ZW50RW1pdHRlciBtaXhpbi5cbiAgICovXG5cbiAgaW8udXRpbC5taXhpbihTb2NrZXROYW1lc3BhY2UsIGlvLkV2ZW50RW1pdHRlcik7XG5cbiAgLyoqXG4gICAqIENvcGllcyBlbWl0IHNpbmNlIHdlIG92ZXJyaWRlIGl0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLiRlbWl0ID0gaW8uRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IG5hbWVzcGFjZSwgYnkgcHJveHlpbmcgdGhlIHJlcXVlc3QgdG8gdGhlIHNvY2tldC4gVGhpc1xuICAgKiBhbGxvd3MgdXMgdG8gdXNlIHRoZSBzeW5heCBhcyB3ZSBkbyBvbiB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLm9mID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5vZi5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvKipcbiAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICBwYWNrZXQuZW5kcG9pbnQgPSB0aGlzLm5hbWU7XG4gICAgdGhpcy5zb2NrZXQucGFja2V0KHBhY2tldCk7XG4gICAgdGhpcy5mbGFncyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2VcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XG4gICAgdmFyIHBhY2tldCA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5mbGFncy5qc29uID8gJ2pzb24nIDogJ21lc3NhZ2UnXG4gICAgICAsIGRhdGE6IGRhdGFcbiAgICB9O1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGZuKSB7XG4gICAgICBwYWNrZXQuaWQgPSArK3RoaXMuYWNrUGFja2V0cztcbiAgICAgIHBhY2tldC5hY2sgPSB0cnVlO1xuICAgICAgdGhpcy5hY2tzW3BhY2tldC5pZF0gPSBmbjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgfTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnRcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG4gIFxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICAgLCBsYXN0QXJnID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICAsIHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdldmVudCdcbiAgICAgICAgICAsIG5hbWU6IG5hbWVcbiAgICAgICAgfTtcblxuICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBsYXN0QXJnKSB7XG4gICAgICBwYWNrZXQuaWQgPSArK3RoaXMuYWNrUGFja2V0cztcbiAgICAgIHBhY2tldC5hY2sgPSAnZGF0YSc7XG4gICAgICB0aGlzLmFja3NbcGFja2V0LmlkXSA9IGxhc3RBcmc7XG4gICAgICBhcmdzID0gYXJncy5zbGljZSgwLCBhcmdzLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIHBhY2tldC5hcmdzID0gYXJncztcblxuICAgIHJldHVybiB0aGlzLnBhY2tldChwYWNrZXQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgbmFtZXNwYWNlXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMubmFtZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiAnZGlzY29ubmVjdCcgfSk7XG4gICAgICB0aGlzLiRlbWl0KCdkaXNjb25uZWN0Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBwYWNrZXRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gYWNrICgpIHtcbiAgICAgIHNlbGYucGFja2V0KHtcbiAgICAgICAgICB0eXBlOiAnYWNrJ1xuICAgICAgICAsIGFyZ3M6IGlvLnV0aWwudG9BcnJheShhcmd1bWVudHMpXG4gICAgICAgICwgYWNrSWQ6IHBhY2tldC5pZFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Nvbm5lY3QnOlxuICAgICAgICB0aGlzLiRlbWl0KCdjb25uZWN0Jyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdkaXNjb25uZWN0JzpcbiAgICAgICAgaWYgKHRoaXMubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICB0aGlzLnNvY2tldC5vbkRpc2Nvbm5lY3QocGFja2V0LnJlYXNvbiB8fCAnYm9vdGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy4kZW1pdCgnZGlzY29ubmVjdCcsIHBhY2tldC5yZWFzb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICB2YXIgcGFyYW1zID0gWydtZXNzYWdlJywgcGFja2V0LmRhdGFdO1xuXG4gICAgICAgIGlmIChwYWNrZXQuYWNrID09ICdkYXRhJykge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKGFjayk7XG4gICAgICAgIH0gZWxzZSBpZiAocGFja2V0LmFjaykge1xuICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogJ2FjaycsIGFja0lkOiBwYWNrZXQuaWQgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRlbWl0LmFwcGx5KHRoaXMsIHBhcmFtcyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdldmVudCc6XG4gICAgICAgIHZhciBwYXJhbXMgPSBbcGFja2V0Lm5hbWVdLmNvbmNhdChwYWNrZXQuYXJncyk7XG5cbiAgICAgICAgaWYgKHBhY2tldC5hY2sgPT0gJ2RhdGEnKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGFjayk7XG5cbiAgICAgICAgdGhpcy4kZW1pdC5hcHBseSh0aGlzLCBwYXJhbXMpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYWNrJzpcbiAgICAgICAgaWYgKHRoaXMuYWNrc1twYWNrZXQuYWNrSWRdKSB7XG4gICAgICAgICAgdGhpcy5hY2tzW3BhY2tldC5hY2tJZF0uYXBwbHkodGhpcywgcGFja2V0LmFyZ3MpO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmFja0lkXTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICBpZiAocGFja2V0LmFkdmljZSl7XG4gICAgICAgICAgdGhpcy5zb2NrZXQub25FcnJvcihwYWNrZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwYWNrZXQucmVhc29uID09ICd1bmF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjb25uZWN0X2ZhaWxlZCcsIHBhY2tldC5yZWFzb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdlcnJvcicsIHBhY2tldC5yZWFzb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZsYWcgaW50ZXJmYWNlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gRmxhZyAobnNwLCBuYW1lKSB7XG4gICAgdGhpcy5uYW1lc3BhY2UgPSBuc3A7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfTtcblxuICAvKipcbiAgICogU2VuZCBhIG1lc3NhZ2VcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhZy5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm5hbWVzcGFjZS5mbGFnc1t0aGlzLm5hbWVdID0gdHJ1ZTtcbiAgICB0aGlzLm5hbWVzcGFjZS5zZW5kLmFwcGx5KHRoaXMubmFtZXNwYWNlLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0IGFuIGV2ZW50XG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYWcucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5uYW1lc3BhY2UuZmxhZ3NbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgdGhpcy5uYW1lc3BhY2UuZW1pdC5hcHBseSh0aGlzLm5hbWVzcGFjZSwgYXJndW1lbnRzKTtcbiAgfTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4pO1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbywgZ2xvYmFsKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy53ZWJzb2NrZXQgPSBXUztcblxuICAvKipcbiAgICogVGhlIFdlYlNvY2tldCB0cmFuc3BvcnQgdXNlcyB0aGUgSFRNTDUgV2ViU29ja2V0IEFQSSB0byBlc3RhYmxpc2ggYW5cbiAgICogcGVyc2lzdGVudCBjb25uZWN0aW9uIHdpdGggdGhlIFNvY2tldC5JTyBzZXJ2ZXIuIFRoaXMgdHJhbnNwb3J0IHdpbGwgYWxzb1xuICAgKiBiZSBpbmhlcml0ZWQgYnkgdGhlIEZsYXNoU29ja2V0IGZhbGxiYWNrIGFzIGl0IHByb3ZpZGVzIGEgQVBJIGNvbXBhdGlibGVcbiAgICogcG9seWZpbGwgZm9yIHRoZSBXZWJTb2NrZXRzLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGV4dGVuZHMge2lvLlRyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gV1MgKHNvY2tldCkge1xuICAgIGlvLlRyYW5zcG9ydC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAgICovXG5cbiAgaW8udXRpbC5pbmhlcml0KFdTLCBpby5UcmFuc3BvcnQpO1xuXG4gIC8qKlxuICAgKiBUcmFuc3BvcnQgbmFtZVxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBXUy5wcm90b3R5cGUubmFtZSA9ICd3ZWJzb2NrZXQnO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBhIG5ldyBgV2ViU29ja2V0YCBjb25uZWN0aW9uIHdpdGggdGhlIFNvY2tldC5JTyBzZXJ2ZXIuIFdlIGF0dGFjaFxuICAgKiBhbGwgdGhlIGFwcHJvcHJpYXRlIGxpc3RlbmVycyB0byBoYW5kbGUgdGhlIHJlc3BvbnNlcyBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFdTLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBxdWVyeSA9IGlvLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSlcbiAgICAgICwgc2VsZiA9IHRoaXNcbiAgICAgICwgU29ja2V0XG5cblxuICAgIGlmICghU29ja2V0KSB7XG4gICAgICBTb2NrZXQgPSBnbG9iYWwuTW96V2ViU29ja2V0IHx8IGdsb2JhbC5XZWJTb2NrZXQ7XG4gICAgfVxuXG4gICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgU29ja2V0KHRoaXMucHJlcGFyZVVybCgpICsgcXVlcnkpO1xuXG4gICAgdGhpcy53ZWJzb2NrZXQub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5vbk9wZW4oKTtcbiAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcihmYWxzZSk7XG4gICAgfTtcbiAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgIHNlbGYub25EYXRhKGV2LmRhdGEpO1xuICAgIH07XG4gICAgdGhpcy53ZWJzb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgICAgc2VsZi5zb2NrZXQuc2V0QnVmZmVyKHRydWUpO1xuICAgIH07XG4gICAgdGhpcy53ZWJzb2NrZXQub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBzZWxmLm9uRXJyb3IoZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kIGEgbWVzc2FnZSB0byB0aGUgU29ja2V0LklPIHNlcnZlci4gVGhlIG1lc3NhZ2Ugd2lsbCBhdXRvbWF0aWNhbGx5IGJlXG4gICAqIGVuY29kZWQgaW4gdGhlIGNvcnJlY3QgbWVzc2FnZSBmb3JtYXQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIC8vIERvIHRvIGEgYnVnIGluIHRoZSBjdXJyZW50IElEZXZpY2VzIGJyb3dzZXIsIHdlIG5lZWQgdG8gd3JhcCB0aGUgc2VuZCBpbiBhIFxuICAvLyBzZXRUaW1lb3V0LCB3aGVuIHRoZXkgcmVzdW1lIGZyb20gc2xlZXBpbmcgdGhlIGJyb3dzZXIgd2lsbCBjcmFzaCBpZiBcbiAgLy8gd2UgZG9uJ3QgYWxsb3cgdGhlIGJyb3dzZXIgdGltZSB0byBkZXRlY3QgdGhlIHNvY2tldCBoYXMgYmVlbiBjbG9zZWRcbiAgaWYgKGlvLnV0aWwudWEuaURldmljZSkge1xuICAgIFdTLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICBzZWxmLndlYnNvY2tldC5zZW5kKGRhdGEpO1xuICAgICAgfSwwKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgV1MucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdGhpcy53ZWJzb2NrZXQuc2VuZChkYXRhKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUGF5bG9hZFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgV1MucHJvdG90eXBlLnBheWxvYWQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0aGlzLnBhY2tldChhcnJbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgZXN0YWJsaXNoZWQgYFdlYlNvY2tldGAgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgV1MucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgZXJyb3JzIHRoYXQgYFdlYlNvY2tldGAgbWlnaHQgYmUgZ2l2aW5nIHdoZW4gd2VcbiAgICogYXJlIGF0dGVtcHRpbmcgdG8gY29ubmVjdCBvciBzZW5kIG1lc3NhZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Vycm9yfSBlIFRoZSBlcnJvci5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFdTLnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLnNvY2tldC5vbkVycm9yKGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSBzY2hlbWUgZm9yIHRoZSBVUkkgZ2VuZXJhdGlvbi5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBXUy5wcm90b3R5cGUuc2NoZW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5vcHRpb25zLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBicm93c2VyIGhhcyBzdXBwb3J0IGZvciBuYXRpdmUgYFdlYlNvY2tldHNgIGFuZCB0aGF0XG4gICAqIGl0J3Mgbm90IHRoZSBwb2x5ZmlsbCBjcmVhdGVkIGZvciB0aGUgRmxhc2hTb2NrZXQgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBXUy5jaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKCdXZWJTb2NrZXQnIGluIGdsb2JhbCAmJiAhKCdfX2FkZFRhc2snIGluIFdlYlNvY2tldCkpXG4gICAgICAgICAgfHwgJ01veldlYlNvY2tldCcgaW4gZ2xvYmFsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgYFdlYlNvY2tldGAgdHJhbnNwb3J0IHN1cHBvcnQgY3Jvc3MgZG9tYWluIGNvbW11bmljYXRpb25zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgV1MueGRvbWFpbkNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgdGhlIHRyYW5zcG9ydCB0byB5b3VyIHB1YmxpYyBpby50cmFuc3BvcnRzIGFycmF5LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgaW8udHJhbnNwb3J0cy5wdXNoKCd3ZWJzb2NrZXQnKTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8uVHJhbnNwb3J0IDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuICAsIHRoaXNcbik7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy5mbGFzaHNvY2tldCA9IEZsYXNoc29ja2V0O1xuXG4gIC8qKlxuICAgKiBUaGUgRmxhc2hTb2NrZXQgdHJhbnNwb3J0LiBUaGlzIGlzIGEgQVBJIHdyYXBwZXIgZm9yIHRoZSBIVE1MNSBXZWJTb2NrZXRcbiAgICogc3BlY2lmaWNhdGlvbi4gSXQgdXNlcyBhIC5zd2YgZmlsZSB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBzZXJ2ZXIuIElmIHlvdSB3YW50XG4gICAqIHRvIHNlcnZlIHRoZSAuc3dmIGZpbGUgZnJvbSBhIG90aGVyIHNlcnZlciB0aGFuIHdoZXJlIHRoZSBTb2NrZXQuSU8gc2NyaXB0IGlzXG4gICAqIGNvbWluZyBmcm9tIHlvdSBuZWVkIHRvIHVzZSB0aGUgaW5zZWN1cmUgdmVyc2lvbiBvZiB0aGUgLnN3Zi4gTW9yZSBpbmZvcm1hdGlvblxuICAgKiBhYm91dCB0aGlzIGNhbiBiZSBmb3VuZCBvbiB0aGUgZ2l0aHViIHBhZ2UuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAZXh0ZW5kcyB7aW8uVHJhbnNwb3J0LndlYnNvY2tldH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gRmxhc2hzb2NrZXQgKCkge1xuICAgIGlvLlRyYW5zcG9ydC53ZWJzb2NrZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvKipcbiAgICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gICAqL1xuXG4gIGlvLnV0aWwuaW5oZXJpdChGbGFzaHNvY2tldCwgaW8uVHJhbnNwb3J0LndlYnNvY2tldCk7XG5cbiAgLyoqXG4gICAqIFRyYW5zcG9ydCBuYW1lXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYXNoc29ja2V0LnByb3RvdHlwZS5uYW1lID0gJ2ZsYXNoc29ja2V0JztcblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgZXN0YWJsaXNoZWQgYEZsYXNoU29ja2V0YCBjb25uZWN0aW9uLiBUaGlzIGlzIGRvbmUgYnkgYWRkaW5nIGEgXG4gICAqIG5ldyB0YXNrIHRvIHRoZSBGbGFzaFNvY2tldC4gVGhlIHJlc3Qgd2lsbCBiZSBoYW5kbGVkIG9mZiBieSB0aGUgYFdlYlNvY2tldGAgXG4gICAqIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICBXZWJTb2NrZXQuX19hZGRUYXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlvLlRyYW5zcG9ydC53ZWJzb2NrZXQucHJvdG90eXBlLm9wZW4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBTb2NrZXQuSU8gc2VydmVyLiBUaGlzIGlzIGRvbmUgYnkgYWRkaW5nIGEgbmV3XG4gICAqIHRhc2sgdG8gdGhlIEZsYXNoU29ja2V0LiBUaGUgcmVzdCB3aWxsIGJlIGhhbmRsZWQgb2ZmIGJ5IHRoZSBgV2ViU29ja2V0YCBcbiAgICogdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFzaHNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgV2ViU29ja2V0Ll9fYWRkVGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICBpby5UcmFuc3BvcnQud2Vic29ja2V0LnByb3RvdHlwZS5zZW5kLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgZXN0YWJsaXNoZWQgYEZsYXNoU29ja2V0YCBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFzaHNvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgV2ViU29ja2V0Ll9fdGFza3MubGVuZ3RoID0gMDtcbiAgICBpby5UcmFuc3BvcnQud2Vic29ja2V0LnByb3RvdHlwZS5jbG9zZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgV2ViU29ja2V0IGZhbGwgYmFjayBuZWVkcyB0byBhcHBlbmQgdGhlIGZsYXNoIGNvbnRhaW5lciB0byB0aGUgYm9keVxuICAgKiBlbGVtZW50LCBzbyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSBoYXZlIGFjY2VzcyB0byBpdC4gT3IgZGVmZXIgdGhlIGNhbGxcbiAgICogdW50aWwgd2UgYXJlIHN1cmUgdGhlcmUgaXMgYSBib2R5IGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXQgVGhlIHNvY2tldCBpbnN0YW5jZSB0aGF0IG5lZWRzIGEgdHJhbnNwb3J0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFja1xuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24gKHNvY2tldCwgZm4pIHtcbiAgICBmdW5jdGlvbiBpbml0ICgpIHtcbiAgICAgIHZhciBvcHRpb25zID0gc29ja2V0Lm9wdGlvbnNcbiAgICAgICAgLCBwb3J0ID0gb3B0aW9uc1snZmxhc2ggcG9saWN5IHBvcnQnXVxuICAgICAgICAsIHBhdGggPSBbXG4gICAgICAgICAgICAgICdodHRwJyArIChvcHRpb25zLnNlY3VyZSA/ICdzJyA6ICcnKSArICc6LydcbiAgICAgICAgICAgICwgb3B0aW9ucy5ob3N0ICsgJzonICsgb3B0aW9ucy5wb3J0XG4gICAgICAgICAgICAsIG9wdGlvbnMucmVzb3VyY2VcbiAgICAgICAgICAgICwgJ3N0YXRpYy9mbGFzaHNvY2tldCdcbiAgICAgICAgICAgICwgJ1dlYlNvY2tldE1haW4nICsgKHNvY2tldC5pc1hEb21haW4oKSA/ICdJbnNlY3VyZScgOiAnJykgKyAnLnN3ZidcbiAgICAgICAgICBdO1xuXG4gICAgICAvLyBPbmx5IHN0YXJ0IGRvd25sb2FkaW5nIHRoZSBzd2YgZmlsZSB3aGVuIHRoZSBjaGVja2VkIHRoYXQgdGhpcyBicm93c2VyXG4gICAgICAvLyBhY3R1YWxseSBzdXBwb3J0cyBpdFxuICAgICAgaWYgKCFGbGFzaHNvY2tldC5sb2FkZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBXRUJfU09DS0VUX1NXRl9MT0NBVElPTiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBTZXQgdGhlIGNvcnJlY3QgZmlsZSBiYXNlZCBvbiB0aGUgWERvbWFpbiBzZXR0aW5nc1xuICAgICAgICAgIFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OID0gcGF0aC5qb2luKCcvJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9ydCAhPT0gODQzKSB7XG4gICAgICAgICAgV2ViU29ja2V0LmxvYWRGbGFzaFBvbGljeUZpbGUoJ3htbHNvY2tldDovLycgKyBvcHRpb25zLmhvc3QgKyAnOicgKyBwb3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIFdlYlNvY2tldC5fX2luaXRpYWxpemUoKTtcbiAgICAgICAgRmxhc2hzb2NrZXQubG9hZGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZm4uY2FsbChzZWxmKTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHJldHVybiBpbml0KCk7XG5cbiAgICBpby51dGlsLmxvYWQoaW5pdCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBGbGFzaFNvY2tldCB0cmFuc3BvcnQgaXMgc3VwcG9ydGVkIGFzIGl0IHJlcXVpcmVzIHRoYXQgdGhlIEFkb2JlXG4gICAqIEZsYXNoIFBsYXllciBwbHVnLWluIHZlcnNpb24gYDEwLjAuMGAgb3IgZ3JlYXRlciBpcyBpbnN0YWxsZWQuIEFuZCBhbHNvIGNoZWNrIGlmXG4gICAqIHRoZSBwb2x5ZmlsbCBpcyBjb3JyZWN0bHkgbG9hZGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQuY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFxuICAgICAgICB0eXBlb2YgV2ViU29ja2V0ID09ICd1bmRlZmluZWQnXG4gICAgICB8fCAhKCdfX2luaXRpYWxpemUnIGluIFdlYlNvY2tldCkgfHwgIXN3Zm9iamVjdFxuICAgICkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHN3Zm9iamVjdC5nZXRGbGFzaFBsYXllclZlcnNpb24oKS5tYWpvciA+PSAxMDtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIEZsYXNoU29ja2V0IHRyYW5zcG9ydCBjYW4gYmUgdXNlZCBhcyBjcm9zcyBkb21haW4gLyBjcm9zcyBvcmlnaW4gXG4gICAqIHRyYW5zcG9ydC4gQmVjYXVzZSB3ZSBjYW4ndCBzZWUgd2hpY2ggdHlwZSAoc2VjdXJlIG9yIGluc2VjdXJlKSBvZiAuc3dmIGlzIHVzZWRcbiAgICogd2Ugd2lsbCBqdXN0IHJldHVybiB0cnVlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQueGRvbWFpbkNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNhYmxlIEFVVE9fSU5JVElBTElaQVRJT05cbiAgICovXG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBXRUJfU09DS0VUX0RJU0FCTEVfQVVUT19JTklUSUFMSVpBVElPTiA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSB0cmFuc3BvcnQgdG8geW91ciBwdWJsaWMgaW8udHJhbnNwb3J0cyBhcnJheS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLnRyYW5zcG9ydHMucHVzaCgnZmxhc2hzb2NrZXQnKTtcbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvLlRyYW5zcG9ydCA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbik7XG4vKlx0U1dGT2JqZWN0IHYyLjIgPGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9zd2ZvYmplY3QvPiBcblx0aXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIDxodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocD4gXG4qL1xuaWYgKCd1bmRlZmluZWQnICE9IHR5cGVvZiB3aW5kb3cpIHtcbnZhciBzd2ZvYmplY3Q9ZnVuY3Rpb24oKXt2YXIgRD1cInVuZGVmaW5lZFwiLHI9XCJvYmplY3RcIixTPVwiU2hvY2t3YXZlIEZsYXNoXCIsVz1cIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoXCIscT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIsUj1cIlNXRk9iamVjdEV4cHJJbnN0XCIseD1cIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLE89d2luZG93LGo9ZG9jdW1lbnQsdD1uYXZpZ2F0b3IsVD1mYWxzZSxVPVtoXSxvPVtdLE49W10sST1bXSxsLFEsRSxCLEo9ZmFsc2UsYT1mYWxzZSxuLEcsbT10cnVlLE09ZnVuY3Rpb24oKXt2YXIgYWE9dHlwZW9mIGouZ2V0RWxlbWVudEJ5SWQhPUQmJnR5cGVvZiBqLmdldEVsZW1lbnRzQnlUYWdOYW1lIT1EJiZ0eXBlb2Ygai5jcmVhdGVFbGVtZW50IT1ELGFoPXQudXNlckFnZW50LnRvTG93ZXJDYXNlKCksWT10LnBsYXRmb3JtLnRvTG93ZXJDYXNlKCksYWU9WT8vd2luLy50ZXN0KFkpOi93aW4vLnRlc3QoYWgpLGFjPVk/L21hYy8udGVzdChZKTovbWFjLy50ZXN0KGFoKSxhZj0vd2Via2l0Ly50ZXN0KGFoKT9wYXJzZUZsb2F0KGFoLnJlcGxhY2UoL14uKndlYmtpdFxcLyhcXGQrKFxcLlxcZCspPykuKiQvLFwiJDFcIikpOmZhbHNlLFg9IStcIlxcdjFcIixhZz1bMCwwLDBdLGFiPW51bGw7aWYodHlwZW9mIHQucGx1Z2lucyE9RCYmdHlwZW9mIHQucGx1Z2luc1tTXT09cil7YWI9dC5wbHVnaW5zW1NdLmRlc2NyaXB0aW9uO2lmKGFiJiYhKHR5cGVvZiB0Lm1pbWVUeXBlcyE9RCYmdC5taW1lVHlwZXNbcV0mJiF0Lm1pbWVUeXBlc1txXS5lbmFibGVkUGx1Z2luKSl7VD10cnVlO1g9ZmFsc2U7YWI9YWIucmVwbGFjZSgvXi4qXFxzKyhcXFMrXFxzK1xcUyskKS8sXCIkMVwiKTthZ1swXT1wYXJzZUludChhYi5yZXBsYWNlKC9eKC4qKVxcLi4qJC8sXCIkMVwiKSwxMCk7YWdbMV09cGFyc2VJbnQoYWIucmVwbGFjZSgvXi4qXFwuKC4qKVxccy4qJC8sXCIkMVwiKSwxMCk7YWdbMl09L1thLXpBLVpdLy50ZXN0KGFiKT9wYXJzZUludChhYi5yZXBsYWNlKC9eLipbYS16QS1aXSsoLiopJC8sXCIkMVwiKSwxMCk6MH19ZWxzZXtpZih0eXBlb2YgT1soWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKSldIT1EKXt0cnl7dmFyIGFkPW5ldyB3aW5kb3dbKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpXShXKTtpZihhZCl7YWI9YWQuR2V0VmFyaWFibGUoXCIkdmVyc2lvblwiKTtpZihhYil7WD10cnVlO2FiPWFiLnNwbGl0KFwiIFwiKVsxXS5zcGxpdChcIixcIik7YWc9W3BhcnNlSW50KGFiWzBdLDEwKSxwYXJzZUludChhYlsxXSwxMCkscGFyc2VJbnQoYWJbMl0sMTApXX19fWNhdGNoKFope319fXJldHVybnt3MzphYSxwdjphZyx3azphZixpZTpYLHdpbjphZSxtYWM6YWN9fSgpLGs9ZnVuY3Rpb24oKXtpZighTS53Myl7cmV0dXJufWlmKCh0eXBlb2Ygai5yZWFkeVN0YXRlIT1EJiZqLnJlYWR5U3RhdGU9PVwiY29tcGxldGVcIil8fCh0eXBlb2Ygai5yZWFkeVN0YXRlPT1EJiYoai5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF18fGouYm9keSkpKXtmKCl9aWYoIUope2lmKHR5cGVvZiBqLmFkZEV2ZW50TGlzdGVuZXIhPUQpe2ouYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixmLGZhbHNlKX1pZihNLmllJiZNLndpbil7ai5hdHRhY2hFdmVudCh4LGZ1bmN0aW9uKCl7aWYoai5yZWFkeVN0YXRlPT1cImNvbXBsZXRlXCIpe2ouZGV0YWNoRXZlbnQoeCxhcmd1bWVudHMuY2FsbGVlKTtmKCl9fSk7aWYoTz09dG9wKXsoZnVuY3Rpb24oKXtpZihKKXtyZXR1cm59dHJ5e2ouZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsKFwibGVmdFwiKX1jYXRjaChYKXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMCk7cmV0dXJufWYoKX0pKCl9fWlmKE0ud2speyhmdW5jdGlvbigpe2lmKEope3JldHVybn1pZighL2xvYWRlZHxjb21wbGV0ZS8udGVzdChqLnJlYWR5U3RhdGUpKXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMCk7cmV0dXJufWYoKX0pKCl9cyhmKX19KCk7ZnVuY3Rpb24gZigpe2lmKEope3JldHVybn10cnl7dmFyIFo9ai5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uYXBwZW5kQ2hpbGQoQyhcInNwYW5cIikpO1oucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChaKX1jYXRjaChhYSl7cmV0dXJufUo9dHJ1ZTt2YXIgWD1VLmxlbmd0aDtmb3IodmFyIFk9MDtZPFg7WSsrKXtVW1ldKCl9fWZ1bmN0aW9uIEsoWCl7aWYoSil7WCgpfWVsc2V7VVtVLmxlbmd0aF09WH19ZnVuY3Rpb24gcyhZKXtpZih0eXBlb2YgTy5hZGRFdmVudExpc3RlbmVyIT1EKXtPLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsWSxmYWxzZSl9ZWxzZXtpZih0eXBlb2Ygai5hZGRFdmVudExpc3RlbmVyIT1EKXtqLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsWSxmYWxzZSl9ZWxzZXtpZih0eXBlb2YgTy5hdHRhY2hFdmVudCE9RCl7aShPLFwib25sb2FkXCIsWSl9ZWxzZXtpZih0eXBlb2YgTy5vbmxvYWQ9PVwiZnVuY3Rpb25cIil7dmFyIFg9Ty5vbmxvYWQ7Ty5vbmxvYWQ9ZnVuY3Rpb24oKXtYKCk7WSgpfX1lbHNle08ub25sb2FkPVl9fX19fWZ1bmN0aW9uIGgoKXtpZihUKXtWKCl9ZWxzZXtIKCl9fWZ1bmN0aW9uIFYoKXt2YXIgWD1qLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXTt2YXIgYWE9QyhyKTthYS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIscSk7dmFyIFo9WC5hcHBlbmRDaGlsZChhYSk7aWYoWil7dmFyIFk9MDsoZnVuY3Rpb24oKXtpZih0eXBlb2YgWi5HZXRWYXJpYWJsZSE9RCl7dmFyIGFiPVouR2V0VmFyaWFibGUoXCIkdmVyc2lvblwiKTtpZihhYil7YWI9YWIuc3BsaXQoXCIgXCIpWzFdLnNwbGl0KFwiLFwiKTtNLnB2PVtwYXJzZUludChhYlswXSwxMCkscGFyc2VJbnQoYWJbMV0sMTApLHBhcnNlSW50KGFiWzJdLDEwKV19fWVsc2V7aWYoWTwxMCl7WSsrO3NldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCk7cmV0dXJufX1YLnJlbW92ZUNoaWxkKGFhKTtaPW51bGw7SCgpfSkoKX1lbHNle0goKX19ZnVuY3Rpb24gSCgpe3ZhciBhZz1vLmxlbmd0aDtpZihhZz4wKXtmb3IodmFyIGFmPTA7YWY8YWc7YWYrKyl7dmFyIFk9b1thZl0uaWQ7dmFyIGFiPW9bYWZdLmNhbGxiYWNrRm47dmFyIGFhPXtzdWNjZXNzOmZhbHNlLGlkOll9O2lmKE0ucHZbMF0+MCl7dmFyIGFlPWMoWSk7aWYoYWUpe2lmKEYob1thZl0uc3dmVmVyc2lvbikmJiEoTS53ayYmTS53azwzMTIpKXt3KFksdHJ1ZSk7aWYoYWIpe2FhLnN1Y2Nlc3M9dHJ1ZTthYS5yZWY9eihZKTthYihhYSl9fWVsc2V7aWYob1thZl0uZXhwcmVzc0luc3RhbGwmJkEoKSl7dmFyIGFpPXt9O2FpLmRhdGE9b1thZl0uZXhwcmVzc0luc3RhbGw7YWkud2lkdGg9YWUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIil8fFwiMFwiO2FpLmhlaWdodD1hZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIil8fFwiMFwiO2lmKGFlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpKXthaS5zdHlsZWNsYXNzPWFlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfWlmKGFlLmdldEF0dHJpYnV0ZShcImFsaWduXCIpKXthaS5hbGlnbj1hZS5nZXRBdHRyaWJ1dGUoXCJhbGlnblwiKX12YXIgYWg9e307dmFyIFg9YWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwYXJhbVwiKTt2YXIgYWM9WC5sZW5ndGg7Zm9yKHZhciBhZD0wO2FkPGFjO2FkKyspe2lmKFhbYWRdLmdldEF0dHJpYnV0ZShcIm5hbWVcIikudG9Mb3dlckNhc2UoKSE9XCJtb3ZpZVwiKXthaFtYW2FkXS5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpXT1YW2FkXS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKX19UChhaSxhaCxZLGFiKX1lbHNle3AoYWUpO2lmKGFiKXthYihhYSl9fX19fWVsc2V7dyhZLHRydWUpO2lmKGFiKXt2YXIgWj16KFkpO2lmKFomJnR5cGVvZiBaLlNldFZhcmlhYmxlIT1EKXthYS5zdWNjZXNzPXRydWU7YWEucmVmPVp9YWIoYWEpfX19fX1mdW5jdGlvbiB6KGFhKXt2YXIgWD1udWxsO3ZhciBZPWMoYWEpO2lmKFkmJlkubm9kZU5hbWU9PVwiT0JKRUNUXCIpe2lmKHR5cGVvZiBZLlNldFZhcmlhYmxlIT1EKXtYPVl9ZWxzZXt2YXIgWj1ZLmdldEVsZW1lbnRzQnlUYWdOYW1lKHIpWzBdO2lmKFope1g9Wn19fXJldHVybiBYfWZ1bmN0aW9uIEEoKXtyZXR1cm4gIWEmJkYoXCI2LjAuNjVcIikmJihNLndpbnx8TS5tYWMpJiYhKE0ud2smJk0ud2s8MzEyKX1mdW5jdGlvbiBQKGFhLGFiLFgsWil7YT10cnVlO0U9Wnx8bnVsbDtCPXtzdWNjZXNzOmZhbHNlLGlkOlh9O3ZhciBhZT1jKFgpO2lmKGFlKXtpZihhZS5ub2RlTmFtZT09XCJPQkpFQ1RcIil7bD1nKGFlKTtRPW51bGx9ZWxzZXtsPWFlO1E9WH1hYS5pZD1SO2lmKHR5cGVvZiBhYS53aWR0aD09RHx8KCEvJSQvLnRlc3QoYWEud2lkdGgpJiZwYXJzZUludChhYS53aWR0aCwxMCk8MzEwKSl7YWEud2lkdGg9XCIzMTBcIn1pZih0eXBlb2YgYWEuaGVpZ2h0PT1EfHwoIS8lJC8udGVzdChhYS5oZWlnaHQpJiZwYXJzZUludChhYS5oZWlnaHQsMTApPDEzNykpe2FhLmhlaWdodD1cIjEzN1wifWoudGl0bGU9ai50aXRsZS5zbGljZSgwLDQ3KStcIiAtIEZsYXNoIFBsYXllciBJbnN0YWxsYXRpb25cIjt2YXIgYWQ9TS5pZSYmTS53aW4/KFsnQWN0aXZlJ10uY29uY2F0KCcnKS5qb2luKCdYJykpOlwiUGx1Z0luXCIsYWM9XCJNTXJlZGlyZWN0VVJMPVwiK08ubG9jYXRpb24udG9TdHJpbmcoKS5yZXBsYWNlKC8mL2csXCIlMjZcIikrXCImTU1wbGF5ZXJUeXBlPVwiK2FkK1wiJk1NZG9jdGl0bGU9XCIrai50aXRsZTtpZih0eXBlb2YgYWIuZmxhc2h2YXJzIT1EKXthYi5mbGFzaHZhcnMrPVwiJlwiK2FjfWVsc2V7YWIuZmxhc2h2YXJzPWFjfWlmKE0uaWUmJk0ud2luJiZhZS5yZWFkeVN0YXRlIT00KXt2YXIgWT1DKFwiZGl2XCIpO1grPVwiU1dGT2JqZWN0TmV3XCI7WS5zZXRBdHRyaWJ1dGUoXCJpZFwiLFgpO2FlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFksYWUpO2FlLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7KGZ1bmN0aW9uKCl7aWYoYWUucmVhZHlTdGF0ZT09NCl7YWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhZSl9ZWxzZXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMTApfX0pKCl9dShhYSxhYixYKX19ZnVuY3Rpb24gcChZKXtpZihNLmllJiZNLndpbiYmWS5yZWFkeVN0YXRlIT00KXt2YXIgWD1DKFwiZGl2XCIpO1kucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoWCxZKTtYLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGcoWSksWCk7WS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiOyhmdW5jdGlvbigpe2lmKFkucmVhZHlTdGF0ZT09NCl7WS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKFkpfWVsc2V7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKX19KSgpfWVsc2V7WS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChnKFkpLFkpfX1mdW5jdGlvbiBnKGFiKXt2YXIgYWE9QyhcImRpdlwiKTtpZihNLndpbiYmTS5pZSl7YWEuaW5uZXJIVE1MPWFiLmlubmVySFRNTH1lbHNle3ZhciBZPWFiLmdldEVsZW1lbnRzQnlUYWdOYW1lKHIpWzBdO2lmKFkpe3ZhciBhZD1ZLmNoaWxkTm9kZXM7aWYoYWQpe3ZhciBYPWFkLmxlbmd0aDtmb3IodmFyIFo9MDtaPFg7WisrKXtpZighKGFkW1pdLm5vZGVUeXBlPT0xJiZhZFtaXS5ub2RlTmFtZT09XCJQQVJBTVwiKSYmIShhZFtaXS5ub2RlVHlwZT09OCkpe2FhLmFwcGVuZENoaWxkKGFkW1pdLmNsb25lTm9kZSh0cnVlKSl9fX19fXJldHVybiBhYX1mdW5jdGlvbiB1KGFpLGFnLFkpe3ZhciBYLGFhPWMoWSk7aWYoTS53ayYmTS53azwzMTIpe3JldHVybiBYfWlmKGFhKXtpZih0eXBlb2YgYWkuaWQ9PUQpe2FpLmlkPVl9aWYoTS5pZSYmTS53aW4pe3ZhciBhaD1cIlwiO2Zvcih2YXIgYWUgaW4gYWkpe2lmKGFpW2FlXSE9T2JqZWN0LnByb3RvdHlwZVthZV0pe2lmKGFlLnRvTG93ZXJDYXNlKCk9PVwiZGF0YVwiKXthZy5tb3ZpZT1haVthZV19ZWxzZXtpZihhZS50b0xvd2VyQ2FzZSgpPT1cInN0eWxlY2xhc3NcIil7YWgrPScgY2xhc3M9XCInK2FpW2FlXSsnXCInfWVsc2V7aWYoYWUudG9Mb3dlckNhc2UoKSE9XCJjbGFzc2lkXCIpe2FoKz1cIiBcIithZSsnPVwiJythaVthZV0rJ1wiJ319fX19dmFyIGFmPVwiXCI7Zm9yKHZhciBhZCBpbiBhZyl7aWYoYWdbYWRdIT1PYmplY3QucHJvdG90eXBlW2FkXSl7YWYrPSc8cGFyYW0gbmFtZT1cIicrYWQrJ1wiIHZhbHVlPVwiJythZ1thZF0rJ1wiIC8+J319YWEub3V0ZXJIVE1MPSc8b2JqZWN0IGNsYXNzaWQ9XCJjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDBcIicrYWgrXCI+XCIrYWYrXCI8L29iamVjdD5cIjtOW04ubGVuZ3RoXT1haS5pZDtYPWMoYWkuaWQpfWVsc2V7dmFyIFo9QyhyKTtaLnNldEF0dHJpYnV0ZShcInR5cGVcIixxKTtmb3IodmFyIGFjIGluIGFpKXtpZihhaVthY10hPU9iamVjdC5wcm90b3R5cGVbYWNdKXtpZihhYy50b0xvd2VyQ2FzZSgpPT1cInN0eWxlY2xhc3NcIil7Wi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGFpW2FjXSl9ZWxzZXtpZihhYy50b0xvd2VyQ2FzZSgpIT1cImNsYXNzaWRcIil7Wi5zZXRBdHRyaWJ1dGUoYWMsYWlbYWNdKX19fX1mb3IodmFyIGFiIGluIGFnKXtpZihhZ1thYl0hPU9iamVjdC5wcm90b3R5cGVbYWJdJiZhYi50b0xvd2VyQ2FzZSgpIT1cIm1vdmllXCIpe2UoWixhYixhZ1thYl0pfX1hYS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChaLGFhKTtYPVp9fXJldHVybiBYfWZ1bmN0aW9uIGUoWixYLFkpe3ZhciBhYT1DKFwicGFyYW1cIik7YWEuc2V0QXR0cmlidXRlKFwibmFtZVwiLFgpO2FhLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsWSk7Wi5hcHBlbmRDaGlsZChhYSl9ZnVuY3Rpb24geShZKXt2YXIgWD1jKFkpO2lmKFgmJlgubm9kZU5hbWU9PVwiT0JKRUNUXCIpe2lmKE0uaWUmJk0ud2luKXtYLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7KGZ1bmN0aW9uKCl7aWYoWC5yZWFkeVN0YXRlPT00KXtiKFkpfWVsc2V7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKX19KSgpfWVsc2V7WC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKFgpfX19ZnVuY3Rpb24gYihaKXt2YXIgWT1jKFopO2lmKFkpe2Zvcih2YXIgWCBpbiBZKXtpZih0eXBlb2YgWVtYXT09XCJmdW5jdGlvblwiKXtZW1hdPW51bGx9fVkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChZKX19ZnVuY3Rpb24gYyhaKXt2YXIgWD1udWxsO3RyeXtYPWouZ2V0RWxlbWVudEJ5SWQoWil9Y2F0Y2goWSl7fXJldHVybiBYfWZ1bmN0aW9uIEMoWCl7cmV0dXJuIGouY3JlYXRlRWxlbWVudChYKX1mdW5jdGlvbiBpKFosWCxZKXtaLmF0dGFjaEV2ZW50KFgsWSk7SVtJLmxlbmd0aF09W1osWCxZXX1mdW5jdGlvbiBGKFope3ZhciBZPU0ucHYsWD1aLnNwbGl0KFwiLlwiKTtYWzBdPXBhcnNlSW50KFhbMF0sMTApO1hbMV09cGFyc2VJbnQoWFsxXSwxMCl8fDA7WFsyXT1wYXJzZUludChYWzJdLDEwKXx8MDtyZXR1cm4oWVswXT5YWzBdfHwoWVswXT09WFswXSYmWVsxXT5YWzFdKXx8KFlbMF09PVhbMF0mJllbMV09PVhbMV0mJllbMl0+PVhbMl0pKT90cnVlOmZhbHNlfWZ1bmN0aW9uIHYoYWMsWSxhZCxhYil7aWYoTS5pZSYmTS5tYWMpe3JldHVybn12YXIgYWE9ai5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07aWYoIWFhKXtyZXR1cm59dmFyIFg9KGFkJiZ0eXBlb2YgYWQ9PVwic3RyaW5nXCIpP2FkOlwic2NyZWVuXCI7aWYoYWIpe249bnVsbDtHPW51bGx9aWYoIW58fEchPVgpe3ZhciBaPUMoXCJzdHlsZVwiKTtaLnNldEF0dHJpYnV0ZShcInR5cGVcIixcInRleHQvY3NzXCIpO1ouc2V0QXR0cmlidXRlKFwibWVkaWFcIixYKTtuPWFhLmFwcGVuZENoaWxkKFopO2lmKE0uaWUmJk0ud2luJiZ0eXBlb2Ygai5zdHlsZVNoZWV0cyE9RCYmai5zdHlsZVNoZWV0cy5sZW5ndGg+MCl7bj1qLnN0eWxlU2hlZXRzW2ouc3R5bGVTaGVldHMubGVuZ3RoLTFdfUc9WH1pZihNLmllJiZNLndpbil7aWYobiYmdHlwZW9mIG4uYWRkUnVsZT09cil7bi5hZGRSdWxlKGFjLFkpfX1lbHNle2lmKG4mJnR5cGVvZiBqLmNyZWF0ZVRleHROb2RlIT1EKXtuLmFwcGVuZENoaWxkKGouY3JlYXRlVGV4dE5vZGUoYWMrXCIge1wiK1krXCJ9XCIpKX19fWZ1bmN0aW9uIHcoWixYKXtpZighbSl7cmV0dXJufXZhciBZPVg/XCJ2aXNpYmxlXCI6XCJoaWRkZW5cIjtpZihKJiZjKFopKXtjKFopLnN0eWxlLnZpc2liaWxpdHk9WX1lbHNle3YoXCIjXCIrWixcInZpc2liaWxpdHk6XCIrWSl9fWZ1bmN0aW9uIEwoWSl7dmFyIFo9L1tcXFxcXFxcIjw+XFwuO10vO3ZhciBYPVouZXhlYyhZKSE9bnVsbDtyZXR1cm4gWCYmdHlwZW9mIGVuY29kZVVSSUNvbXBvbmVudCE9RD9lbmNvZGVVUklDb21wb25lbnQoWSk6WX12YXIgZD1mdW5jdGlvbigpe2lmKE0uaWUmJk0ud2luKXt3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbnVubG9hZFwiLGZ1bmN0aW9uKCl7dmFyIGFjPUkubGVuZ3RoO2Zvcih2YXIgYWI9MDthYjxhYzthYisrKXtJW2FiXVswXS5kZXRhY2hFdmVudChJW2FiXVsxXSxJW2FiXVsyXSl9dmFyIFo9Ti5sZW5ndGg7Zm9yKHZhciBhYT0wO2FhPFo7YWErKyl7eShOW2FhXSl9Zm9yKHZhciBZIGluIE0pe01bWV09bnVsbH1NPW51bGw7Zm9yKHZhciBYIGluIHN3Zm9iamVjdCl7c3dmb2JqZWN0W1hdPW51bGx9c3dmb2JqZWN0PW51bGx9KX19KCk7cmV0dXJue3JlZ2lzdGVyT2JqZWN0OmZ1bmN0aW9uKGFiLFgsYWEsWil7aWYoTS53MyYmYWImJlgpe3ZhciBZPXt9O1kuaWQ9YWI7WS5zd2ZWZXJzaW9uPVg7WS5leHByZXNzSW5zdGFsbD1hYTtZLmNhbGxiYWNrRm49WjtvW28ubGVuZ3RoXT1ZO3coYWIsZmFsc2UpfWVsc2V7aWYoWil7Wih7c3VjY2VzczpmYWxzZSxpZDphYn0pfX19LGdldE9iamVjdEJ5SWQ6ZnVuY3Rpb24oWCl7aWYoTS53Myl7cmV0dXJuIHooWCl9fSxlbWJlZFNXRjpmdW5jdGlvbihhYixhaCxhZSxhZyxZLGFhLFosYWQsYWYsYWMpe3ZhciBYPXtzdWNjZXNzOmZhbHNlLGlkOmFofTtpZihNLnczJiYhKE0ud2smJk0ud2s8MzEyKSYmYWImJmFoJiZhZSYmYWcmJlkpe3coYWgsZmFsc2UpO0soZnVuY3Rpb24oKXthZSs9XCJcIjthZys9XCJcIjt2YXIgYWo9e307aWYoYWYmJnR5cGVvZiBhZj09PXIpe2Zvcih2YXIgYWwgaW4gYWYpe2FqW2FsXT1hZlthbF19fWFqLmRhdGE9YWI7YWoud2lkdGg9YWU7YWouaGVpZ2h0PWFnO3ZhciBhbT17fTtpZihhZCYmdHlwZW9mIGFkPT09cil7Zm9yKHZhciBhayBpbiBhZCl7YW1bYWtdPWFkW2FrXX19aWYoWiYmdHlwZW9mIFo9PT1yKXtmb3IodmFyIGFpIGluIFope2lmKHR5cGVvZiBhbS5mbGFzaHZhcnMhPUQpe2FtLmZsYXNodmFycys9XCImXCIrYWkrXCI9XCIrWlthaV19ZWxzZXthbS5mbGFzaHZhcnM9YWkrXCI9XCIrWlthaV19fX1pZihGKFkpKXt2YXIgYW49dShhaixhbSxhaCk7aWYoYWouaWQ9PWFoKXt3KGFoLHRydWUpfVguc3VjY2Vzcz10cnVlO1gucmVmPWFufWVsc2V7aWYoYWEmJkEoKSl7YWouZGF0YT1hYTtQKGFqLGFtLGFoLGFjKTtyZXR1cm59ZWxzZXt3KGFoLHRydWUpfX1pZihhYyl7YWMoWCl9fSl9ZWxzZXtpZihhYyl7YWMoWCl9fX0sc3dpdGNoT2ZmQXV0b0hpZGVTaG93OmZ1bmN0aW9uKCl7bT1mYWxzZX0sdWE6TSxnZXRGbGFzaFBsYXllclZlcnNpb246ZnVuY3Rpb24oKXtyZXR1cm57bWFqb3I6TS5wdlswXSxtaW5vcjpNLnB2WzFdLHJlbGVhc2U6TS5wdlsyXX19LGhhc0ZsYXNoUGxheWVyVmVyc2lvbjpGLGNyZWF0ZVNXRjpmdW5jdGlvbihaLFksWCl7aWYoTS53Myl7cmV0dXJuIHUoWixZLFgpfWVsc2V7cmV0dXJuIHVuZGVmaW5lZH19LHNob3dFeHByZXNzSW5zdGFsbDpmdW5jdGlvbihaLGFhLFgsWSl7aWYoTS53MyYmQSgpKXtQKFosYWEsWCxZKX19LHJlbW92ZVNXRjpmdW5jdGlvbihYKXtpZihNLnczKXt5KFgpfX0sY3JlYXRlQ1NTOmZ1bmN0aW9uKGFhLFosWSxYKXtpZihNLnczKXt2KGFhLFosWSxYKX19LGFkZERvbUxvYWRFdmVudDpLLGFkZExvYWRFdmVudDpzLGdldFF1ZXJ5UGFyYW1WYWx1ZTpmdW5jdGlvbihhYSl7dmFyIFo9ai5sb2NhdGlvbi5zZWFyY2h8fGoubG9jYXRpb24uaGFzaDtpZihaKXtpZigvXFw/Ly50ZXN0KFopKXtaPVouc3BsaXQoXCI/XCIpWzFdfWlmKGFhPT1udWxsKXtyZXR1cm4gTChaKX12YXIgWT1aLnNwbGl0KFwiJlwiKTtmb3IodmFyIFg9MDtYPFkubGVuZ3RoO1grKyl7aWYoWVtYXS5zdWJzdHJpbmcoMCxZW1hdLmluZGV4T2YoXCI9XCIpKT09YWEpe3JldHVybiBMKFlbWF0uc3Vic3RyaW5nKChZW1hdLmluZGV4T2YoXCI9XCIpKzEpKSl9fX1yZXR1cm5cIlwifSxleHByZXNzSW5zdGFsbENhbGxiYWNrOmZ1bmN0aW9uKCl7aWYoYSl7dmFyIFg9YyhSKTtpZihYJiZsKXtYLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGwsWCk7aWYoUSl7dyhRLHRydWUpO2lmKE0uaWUmJk0ud2luKXtsLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wifX1pZihFKXtFKEIpfX1hPWZhbHNlfX19fSgpO1xufVxuLy8gQ29weXJpZ2h0OiBIaXJvc2hpIEljaGlrYXdhIDxodHRwOi8vZ2ltaXRlLm5ldC9lbi8+XG4vLyBMaWNlbnNlOiBOZXcgQlNEIExpY2Vuc2Vcbi8vIFJlZmVyZW5jZTogaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2Vic29ja2V0cy9cbi8vIFJlZmVyZW5jZTogaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtaGl4aWUtdGhld2Vic29ja2V0cHJvdG9jb2xcblxuKGZ1bmN0aW9uKCkge1xuICBcbiAgaWYgKCd1bmRlZmluZWQnID09IHR5cGVvZiB3aW5kb3cgfHwgd2luZG93LldlYlNvY2tldCkgcmV0dXJuO1xuXG4gIHZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4gIGlmICghY29uc29sZSB8fCAhY29uc29sZS5sb2cgfHwgIWNvbnNvbGUuZXJyb3IpIHtcbiAgICBjb25zb2xlID0ge2xvZzogZnVuY3Rpb24oKXsgfSwgZXJyb3I6IGZ1bmN0aW9uKCl7IH19O1xuICB9XG4gIFxuICBpZiAoIXN3Zm9iamVjdC5oYXNGbGFzaFBsYXllclZlcnNpb24oXCIxMC4wLjBcIikpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmxhc2ggUGxheWVyID49IDEwLjAuMCBpcyByZXF1aXJlZC5cIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChsb2NhdGlvbi5wcm90b2NvbCA9PSBcImZpbGU6XCIpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgXCJXQVJOSU5HOiB3ZWItc29ja2V0LWpzIGRvZXNuJ3Qgd29yayBpbiBmaWxlOi8vLy4uLiBVUkwgXCIgK1xuICAgICAgXCJ1bmxlc3MgeW91IHNldCBGbGFzaCBTZWN1cml0eSBTZXR0aW5ncyBwcm9wZXJseS4gXCIgK1xuICAgICAgXCJPcGVuIHRoZSBwYWdlIHZpYSBXZWIgc2VydmVyIGkuZS4gaHR0cDovLy4uLlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBmYXV4IHdlYiBzb2NrZXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICogQHBhcmFtIHthcnJheSBvciBzdHJpbmd9IHByb3RvY29sc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJveHlIb3N0XG4gICAqIEBwYXJhbSB7aW50fSBwcm94eVBvcnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlcnNcbiAgICovXG4gIFdlYlNvY2tldCA9IGZ1bmN0aW9uKHVybCwgcHJvdG9jb2xzLCBwcm94eUhvc3QsIHByb3h5UG9ydCwgaGVhZGVycykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLl9faWQgPSBXZWJTb2NrZXQuX19uZXh0SWQrKztcbiAgICBXZWJTb2NrZXQuX19pbnN0YW5jZXNbc2VsZi5fX2lkXSA9IHNlbGY7XG4gICAgc2VsZi5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNPTk5FQ1RJTkc7XG4gICAgc2VsZi5idWZmZXJlZEFtb3VudCA9IDA7XG4gICAgc2VsZi5fX2V2ZW50cyA9IHt9O1xuICAgIGlmICghcHJvdG9jb2xzKSB7XG4gICAgICBwcm90b2NvbHMgPSBbXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm90b2NvbHMgPT0gXCJzdHJpbmdcIikge1xuICAgICAgcHJvdG9jb2xzID0gW3Byb3RvY29sc107XG4gICAgfVxuICAgIC8vIFVzZXMgc2V0VGltZW91dCgpIHRvIG1ha2Ugc3VyZSBfX2NyZWF0ZUZsYXNoKCkgcnVucyBhZnRlciB0aGUgY2FsbGVyIHNldHMgd3Mub25vcGVuIGV0Yy5cbiAgICAvLyBPdGhlcndpc2UsIHdoZW4gb25vcGVuIGZpcmVzIGltbWVkaWF0ZWx5LCBvbm9wZW4gaXMgY2FsbGVkIGJlZm9yZSBpdCBpcyBzZXQuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIFdlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24oKSB7XG4gICAgICAgIFdlYlNvY2tldC5fX2ZsYXNoLmNyZWF0ZShcbiAgICAgICAgICAgIHNlbGYuX19pZCwgdXJsLCBwcm90b2NvbHMsIHByb3h5SG9zdCB8fCBudWxsLCBwcm94eVBvcnQgfHwgMCwgaGVhZGVycyB8fCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH0sIDApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgdG8gdGhlIHdlYiBzb2NrZXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhICBUaGUgZGF0YSB0byBzZW5kIHRvIHRoZSBzb2NrZXQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIGZvciBzdWNjZXNzLCBmYWxzZSBmb3IgZmFpbHVyZS5cbiAgICovXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICB0aHJvdyBcIklOVkFMSURfU1RBVEVfRVJSOiBXZWIgU29ja2V0IGNvbm5lY3Rpb24gaGFzIG5vdCBiZWVuIGVzdGFibGlzaGVkXCI7XG4gICAgfVxuICAgIC8vIFdlIHVzZSBlbmNvZGVVUklDb21wb25lbnQoKSBoZXJlLCBiZWNhdXNlIEZBQnJpZGdlIGRvZXNuJ3Qgd29yayBpZlxuICAgIC8vIHRoZSBhcmd1bWVudCBpbmNsdWRlcyBzb21lIGNoYXJhY3RlcnMuIFdlIGRvbid0IHVzZSBlc2NhcGUoKSBoZXJlXG4gICAgLy8gYmVjYXVzZSBvZiB0aGlzOlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0NvcmVfSmF2YVNjcmlwdF8xLjVfR3VpZGUvRnVuY3Rpb25zI2VzY2FwZV9hbmRfdW5lc2NhcGVfRnVuY3Rpb25zXG4gICAgLy8gQnV0IGl0IGxvb2tzIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQocykpIGRvZXNuJ3RcbiAgICAvLyBwcmVzZXJ2ZSBhbGwgVW5pY29kZSBjaGFyYWN0ZXJzIGVpdGhlciBlLmcuIFwiXFx1ZmZmZlwiIGluIEZpcmVmb3guXG4gICAgLy8gTm90ZSBieSB3dHJpdGNoOiBIb3BlZnVsbHkgdGhpcyB3aWxsIG5vdCBiZSBuZWNlc3NhcnkgdXNpbmcgRXh0ZXJuYWxJbnRlcmZhY2UuICBXaWxsIHJlcXVpcmVcbiAgICAvLyBhZGRpdGlvbmFsIHRlc3RpbmcuXG4gICAgdmFyIHJlc3VsdCA9IFdlYlNvY2tldC5fX2ZsYXNoLnNlbmQodGhpcy5fX2lkLCBlbmNvZGVVUklDb21wb25lbnQoZGF0YSkpO1xuICAgIGlmIChyZXN1bHQgPCAwKSB7IC8vIHN1Y2Nlc3NcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1ZmZlcmVkQW1vdW50ICs9IHJlc3VsdDtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoaXMgd2ViIHNvY2tldCBncmFjZWZ1bGx5LlxuICAgKi9cbiAgV2ViU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0LkNMT1NFRCB8fCB0aGlzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0LkNMT1NJTkcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG4gICAgV2ViU29ja2V0Ll9fZmxhc2guY2xvc2UodGhpcy5fX2lkKTtcbiAgfTtcblxuICAvKipcbiAgICogSW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1FdmVudHMvZXZlbnRzLmh0bWwjRXZlbnRzLXJlZ2lzdHJhdGlvblwiPkRPTSAyIEV2ZW50VGFyZ2V0IEludGVyZmFjZTwvYT59XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlQ2FwdHVyZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLl9fZXZlbnRzKSkge1xuICAgICAgdGhpcy5fX2V2ZW50c1t0eXBlXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLl9fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgPGEgaHJlZj1cImh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUV2ZW50cy9ldmVudHMuaHRtbCNFdmVudHMtcmVnaXN0cmF0aW9uXCI+RE9NIDIgRXZlbnRUYXJnZXQgSW50ZXJmYWNlPC9hPn1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHBhcmFtIHtib29sZWFufSB1c2VDYXB0dXJlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgV2ViU29ja2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuX19ldmVudHMpKSByZXR1cm47XG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX19ldmVudHNbdHlwZV07XG4gICAgZm9yICh2YXIgaSA9IGV2ZW50cy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgaWYgKGV2ZW50c1tpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgZXZlbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgPGEgaHJlZj1cImh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUV2ZW50cy9ldmVudHMuaHRtbCNFdmVudHMtcmVnaXN0cmF0aW9uXCI+RE9NIDIgRXZlbnRUYXJnZXQgSW50ZXJmYWNlPC9hPn1cbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBXZWJTb2NrZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBldmVudHMgPSB0aGlzLl9fZXZlbnRzW2V2ZW50LnR5cGVdIHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBldmVudHNbaV0oZXZlbnQpO1xuICAgIH1cbiAgICB2YXIgaGFuZGxlciA9IHRoaXNbXCJvblwiICsgZXZlbnQudHlwZV07XG4gICAgaWYgKGhhbmRsZXIpIGhhbmRsZXIoZXZlbnQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGV2ZW50IGZyb20gRmxhc2guXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmbGFzaEV2ZW50XG4gICAqL1xuICBXZWJTb2NrZXQucHJvdG90eXBlLl9faGFuZGxlRXZlbnQgPSBmdW5jdGlvbihmbGFzaEV2ZW50KSB7XG4gICAgaWYgKFwicmVhZHlTdGF0ZVwiIGluIGZsYXNoRXZlbnQpIHtcbiAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IGZsYXNoRXZlbnQucmVhZHlTdGF0ZTtcbiAgICB9XG4gICAgaWYgKFwicHJvdG9jb2xcIiBpbiBmbGFzaEV2ZW50KSB7XG4gICAgICB0aGlzLnByb3RvY29sID0gZmxhc2hFdmVudC5wcm90b2NvbDtcbiAgICB9XG4gICAgXG4gICAgdmFyIGpzRXZlbnQ7XG4gICAgaWYgKGZsYXNoRXZlbnQudHlwZSA9PSBcIm9wZW5cIiB8fCBmbGFzaEV2ZW50LnR5cGUgPT0gXCJlcnJvclwiKSB7XG4gICAgICBqc0V2ZW50ID0gdGhpcy5fX2NyZWF0ZVNpbXBsZUV2ZW50KGZsYXNoRXZlbnQudHlwZSk7XG4gICAgfSBlbHNlIGlmIChmbGFzaEV2ZW50LnR5cGUgPT0gXCJjbG9zZVwiKSB7XG4gICAgICAvLyBUT0RPIGltcGxlbWVudCBqc0V2ZW50Lndhc0NsZWFuXG4gICAgICBqc0V2ZW50ID0gdGhpcy5fX2NyZWF0ZVNpbXBsZUV2ZW50KFwiY2xvc2VcIik7XG4gICAgfSBlbHNlIGlmIChmbGFzaEV2ZW50LnR5cGUgPT0gXCJtZXNzYWdlXCIpIHtcbiAgICAgIHZhciBkYXRhID0gZGVjb2RlVVJJQ29tcG9uZW50KGZsYXNoRXZlbnQubWVzc2FnZSk7XG4gICAgICBqc0V2ZW50ID0gdGhpcy5fX2NyZWF0ZU1lc3NhZ2VFdmVudChcIm1lc3NhZ2VcIiwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IFwidW5rbm93biBldmVudCB0eXBlOiBcIiArIGZsYXNoRXZlbnQudHlwZTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGpzRXZlbnQpO1xuICB9O1xuICBcbiAgV2ViU29ja2V0LnByb3RvdHlwZS5fX2NyZWF0ZVNpbXBsZUV2ZW50ID0gZnVuY3Rpb24odHlwZSkge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCAmJiB3aW5kb3cuRXZlbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XG4gICAgICBldmVudC5pbml0RXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHt0eXBlOiB0eXBlLCBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2V9O1xuICAgIH1cbiAgfTtcbiAgXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuX19jcmVhdGVNZXNzYWdlRXZlbnQgPSBmdW5jdGlvbih0eXBlLCBkYXRhKSB7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50ICYmIHdpbmRvdy5NZXNzYWdlRXZlbnQgJiYgIXdpbmRvdy5vcGVyYSkge1xuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNZXNzYWdlRXZlbnRcIik7XG4gICAgICBldmVudC5pbml0TWVzc2FnZUV2ZW50KFwibWVzc2FnZVwiLCBmYWxzZSwgZmFsc2UsIGRhdGEsIG51bGwsIG51bGwsIHdpbmRvdywgbnVsbCk7XG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElFIGFuZCBPcGVyYSwgdGhlIGxhdHRlciBvbmUgdHJ1bmNhdGVzIHRoZSBkYXRhIHBhcmFtZXRlciBhZnRlciBhbnkgMHgwMCBieXRlcy5cbiAgICAgIHJldHVybiB7dHlwZTogdHlwZSwgZGF0YTogZGF0YSwgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlfTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogRGVmaW5lIHRoZSBXZWJTb2NrZXQgcmVhZHlTdGF0ZSBlbnVtZXJhdGlvbi5cbiAgICovXG4gIFdlYlNvY2tldC5DT05ORUNUSU5HID0gMDtcbiAgV2ViU29ja2V0Lk9QRU4gPSAxO1xuICBXZWJTb2NrZXQuQ0xPU0lORyA9IDI7XG4gIFdlYlNvY2tldC5DTE9TRUQgPSAzO1xuXG4gIFdlYlNvY2tldC5fX2ZsYXNoID0gbnVsbDtcbiAgV2ViU29ja2V0Ll9faW5zdGFuY2VzID0ge307XG4gIFdlYlNvY2tldC5fX3Rhc2tzID0gW107XG4gIFdlYlNvY2tldC5fX25leHRJZCA9IDA7XG4gIFxuICAvKipcbiAgICogTG9hZCBhIG5ldyBmbGFzaCBzZWN1cml0eSBwb2xpY3kgZmlsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgV2ViU29ja2V0LmxvYWRGbGFzaFBvbGljeUZpbGUgPSBmdW5jdGlvbih1cmwpe1xuICAgIFdlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24oKSB7XG4gICAgICBXZWJTb2NrZXQuX19mbGFzaC5sb2FkTWFudWFsUG9saWN5RmlsZSh1cmwpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb2FkcyBXZWJTb2NrZXRNYWluLnN3ZiBhbmQgY3JlYXRlcyBXZWJTb2NrZXRNYWluIG9iamVjdCBpbiBGbGFzaC5cbiAgICovXG4gIFdlYlNvY2tldC5fX2luaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoV2ViU29ja2V0Ll9fZmxhc2gpIHJldHVybjtcbiAgICBcbiAgICBpZiAoV2ViU29ja2V0Ll9fc3dmTG9jYXRpb24pIHtcbiAgICAgIC8vIEZvciBiYWNrd29yZCBjb21wYXRpYmlsaXR5LlxuICAgICAgd2luZG93LldFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OID0gV2ViU29ja2V0Ll9fc3dmTG9jYXRpb247XG4gICAgfVxuICAgIGlmICghd2luZG93LldFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiW1dlYlNvY2tldF0gc2V0IFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OIHRvIGxvY2F0aW9uIG9mIFdlYlNvY2tldE1haW4uc3dmXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXIuaWQgPSBcIndlYlNvY2tldENvbnRhaW5lclwiO1xuICAgIC8vIEhpZGVzIEZsYXNoIGJveC4gV2UgY2Fubm90IHVzZSBkaXNwbGF5OiBub25lIG9yIHZpc2liaWxpdHk6IGhpZGRlbiBiZWNhdXNlIGl0IHByZXZlbnRzXG4gICAgLy8gRmxhc2ggZnJvbSBsb2FkaW5nIGF0IGxlYXN0IGluIElFLiBTbyB3ZSBtb3ZlIGl0IG91dCBvZiB0aGUgc2NyZWVuIGF0ICgtMTAwLCAtMTAwKS5cbiAgICAvLyBCdXQgdGhpcyBldmVuIGRvZXNuJ3Qgd29yayB3aXRoIEZsYXNoIExpdGUgKGUuZy4gaW4gRHJvaWQgSW5jcmVkaWJsZSkuIFNvIHdpdGggRmxhc2hcbiAgICAvLyBMaXRlLCB3ZSBwdXQgaXQgYXQgKDAsIDApLiBUaGlzIHNob3dzIDF4MSBib3ggdmlzaWJsZSBhdCBsZWZ0LXRvcCBjb3JuZXIgYnV0IHRoaXMgaXNcbiAgICAvLyB0aGUgYmVzdCB3ZSBjYW4gZG8gYXMgZmFyIGFzIHdlIGtub3cgbm93LlxuICAgIGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBpZiAoV2ViU29ja2V0Ll9faXNGbGFzaExpdGUoKSkge1xuICAgICAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gXCItMTAwcHhcIjtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSBcIi0xMDBweFwiO1xuICAgIH1cbiAgICB2YXIgaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBob2xkZXIuaWQgPSBcIndlYlNvY2tldEZsYXNoXCI7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhvbGRlcik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIC8vIFNlZSB0aGlzIGFydGljbGUgZm9yIGhhc1ByaW9yaXR5OlxuICAgIC8vIGh0dHA6Ly9oZWxwLmFkb2JlLmNvbS9lbl9VUy9hczMvbW9iaWxlL1dTNGJlYmNkNjZhNzQyNzVjMzZjZmI4MTM3MTI0MzE4ZWViYzYtN2ZmZC5odG1sXG4gICAgc3dmb2JqZWN0LmVtYmVkU1dGKFxuICAgICAgV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04sXG4gICAgICBcIndlYlNvY2tldEZsYXNoXCIsXG4gICAgICBcIjFcIiAvKiB3aWR0aCAqLyxcbiAgICAgIFwiMVwiIC8qIGhlaWdodCAqLyxcbiAgICAgIFwiMTAuMC4wXCIgLyogU1dGIHZlcnNpb24gKi8sXG4gICAgICBudWxsLFxuICAgICAgbnVsbCxcbiAgICAgIHtoYXNQcmlvcml0eTogdHJ1ZSwgc3dsaXZlY29ubmVjdCA6IHRydWUsIGFsbG93U2NyaXB0QWNjZXNzOiBcImFsd2F5c1wifSxcbiAgICAgIG51bGwsXG4gICAgICBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghZS5zdWNjZXNzKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIltXZWJTb2NrZXRdIHN3Zm9iamVjdC5lbWJlZFNXRiBmYWlsZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIENhbGxlZCBieSBGbGFzaCB0byBub3RpZnkgSlMgdGhhdCBpdCdzIGZ1bGx5IGxvYWRlZCBhbmQgcmVhZHlcbiAgICogZm9yIGNvbW11bmljYXRpb24uXG4gICAqL1xuICBXZWJTb2NrZXQuX19vbkZsYXNoSW5pdGlhbGl6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBXZSBuZWVkIHRvIHNldCBhIHRpbWVvdXQgaGVyZSB0byBhdm9pZCByb3VuZC10cmlwIGNhbGxzXG4gICAgLy8gdG8gZmxhc2ggZHVyaW5nIHRoZSBpbml0aWFsaXphdGlvbiBwcm9jZXNzLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBXZWJTb2NrZXQuX19mbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2ViU29ja2V0Rmxhc2hcIik7XG4gICAgICBXZWJTb2NrZXQuX19mbGFzaC5zZXRDYWxsZXJVcmwobG9jYXRpb24uaHJlZik7XG4gICAgICBXZWJTb2NrZXQuX19mbGFzaC5zZXREZWJ1ZyghIXdpbmRvdy5XRUJfU09DS0VUX0RFQlVHKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgV2ViU29ja2V0Ll9fdGFza3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgV2ViU29ja2V0Ll9fdGFza3NbaV0oKTtcbiAgICAgIH1cbiAgICAgIFdlYlNvY2tldC5fX3Rhc2tzID0gW107XG4gICAgfSwgMCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogQ2FsbGVkIGJ5IEZsYXNoIHRvIG5vdGlmeSBXZWJTb2NrZXRzIGV2ZW50cyBhcmUgZmlyZWQuXG4gICAqL1xuICBXZWJTb2NrZXQuX19vbkZsYXNoRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gR2V0cyBldmVudHMgdXNpbmcgcmVjZWl2ZUV2ZW50cygpIGluc3RlYWQgb2YgZ2V0dGluZyBpdCBmcm9tIGV2ZW50IG9iamVjdFxuICAgICAgICAvLyBvZiBGbGFzaCBldmVudC4gVGhpcyBpcyB0byBtYWtlIHN1cmUgdG8ga2VlcCBtZXNzYWdlIG9yZGVyLlxuICAgICAgICAvLyBJdCBzZWVtcyBzb21ldGltZXMgRmxhc2ggZXZlbnRzIGRvbid0IGFycml2ZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGV5IGFyZSBzZW50LlxuICAgICAgICB2YXIgZXZlbnRzID0gV2ViU29ja2V0Ll9fZmxhc2gucmVjZWl2ZUV2ZW50cygpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIFdlYlNvY2tldC5fX2luc3RhbmNlc1tldmVudHNbaV0ud2ViU29ja2V0SWRdLl9faGFuZGxlRXZlbnQoZXZlbnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBcbiAgLy8gQ2FsbGVkIGJ5IEZsYXNoLlxuICBXZWJTb2NrZXQuX19sb2cgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2coZGVjb2RlVVJJQ29tcG9uZW50KG1lc3NhZ2UpKTtcbiAgfTtcbiAgXG4gIC8vIENhbGxlZCBieSBGbGFzaC5cbiAgV2ViU29ja2V0Ll9fZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc29sZS5lcnJvcihkZWNvZGVVUklDb21wb25lbnQobWVzc2FnZSkpO1xuICB9O1xuICBcbiAgV2ViU29ja2V0Ll9fYWRkVGFzayA9IGZ1bmN0aW9uKHRhc2spIHtcbiAgICBpZiAoV2ViU29ja2V0Ll9fZmxhc2gpIHtcbiAgICAgIHRhc2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgV2ViU29ja2V0Ll9fdGFza3MucHVzaCh0YXNrKTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogVGVzdCBpZiB0aGUgYnJvd3NlciBpcyBydW5uaW5nIGZsYXNoIGxpdGUuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgZmxhc2ggbGl0ZSBpcyBydW5uaW5nLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBXZWJTb2NrZXQuX19pc0ZsYXNoTGl0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghd2luZG93Lm5hdmlnYXRvciB8fCAhd2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG1pbWVUeXBlID0gd2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXNbXCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiXTtcbiAgICBpZiAoIW1pbWVUeXBlIHx8ICFtaW1lVHlwZS5lbmFibGVkUGx1Z2luIHx8ICFtaW1lVHlwZS5lbmFibGVkUGx1Z2luLmZpbGVuYW1lKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBtaW1lVHlwZS5lbmFibGVkUGx1Z2luLmZpbGVuYW1lLm1hdGNoKC9mbGFzaGxpdGUvaSkgPyB0cnVlIDogZmFsc2U7XG4gIH07XG4gIFxuICBpZiAoIXdpbmRvdy5XRUJfU09DS0VUX0RJU0FCTEVfQVVUT19JTklUSUFMSVpBVElPTikge1xuICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIFdlYlNvY2tldC5fX2luaXRpYWxpemUoKTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25sb2FkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIFdlYlNvY2tldC5fX2luaXRpYWxpemUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBcbn0pKCk7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvLCBnbG9iYWwpIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBleHBvcnRzLlhIUiA9IFhIUjtcblxuICAvKipcbiAgICogWEhSIGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBjb3N0cnVjdG9yXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFhIUiAoc29ja2V0KSB7XG4gICAgaWYgKCFzb2NrZXQpIHJldHVybjtcblxuICAgIGlvLlRyYW5zcG9ydC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAgICovXG5cbiAgaW8udXRpbC5pbmhlcml0KFhIUiwgaW8uVHJhbnNwb3J0KTtcblxuICAvKipcbiAgICogRXN0YWJsaXNoIGEgY29ubmVjdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFIucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zb2NrZXQuc2V0QnVmZmVyKGZhbHNlKTtcbiAgICB0aGlzLm9uT3BlbigpO1xuICAgIHRoaXMuZ2V0KCk7XG5cbiAgICAvLyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgcmVxdWVzdCBzdWNjZWVkcyBzaW5jZSB3ZSBoYXZlIG5vIGluZGljYXRpb25cbiAgICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IG9wZW5lZCBvciBub3QgdW50aWwgaXQgc3VjY2VlZGVkLlxuICAgIHRoaXMuc2V0Q2xvc2VUaW1lb3V0KCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgd2UgbmVlZCB0byBzZW5kIGRhdGEgdG8gdGhlIFNvY2tldC5JTyBzZXJ2ZXIsIGlmIHdlIGhhdmUgZGF0YSBpbiBvdXJcbiAgICogYnVmZmVyIHdlIGVuY29kZSBpdCBhbmQgZm9yd2FyZCBpdCB0byB0aGUgYHBvc3RgIG1ldGhvZC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFhIUi5wcm90b3R5cGUucGF5bG9hZCA9IGZ1bmN0aW9uIChwYXlsb2FkKSB7XG4gICAgdmFyIG1zZ3MgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gcGF5bG9hZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG1zZ3MucHVzaChpby5wYXJzZXIuZW5jb2RlUGFja2V0KHBheWxvYWRbaV0pKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbmQoaW8ucGFyc2VyLmVuY29kZVBheWxvYWQobXNncykpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgdG8gdGhlIFNvY2tldC5JTyBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBtZXNzYWdlXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFhIUi5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5wb3N0KGRhdGEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3N0cyBhIGVuY29kZWQgbWVzc2FnZSB0byB0aGUgU29ja2V0LklPIHNlcnZlci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgQSBlbmNvZGVkIG1lc3NhZ2UuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBmdW5jdGlvbiBlbXB0eSAoKSB7IH07XG5cbiAgWEhSLnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5zb2NrZXQuc2V0QnVmZmVyKHRydWUpO1xuXG4gICAgZnVuY3Rpb24gc3RhdGVDaGFuZ2UgKCkge1xuICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgIHRoaXMub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7XG4gICAgICAgIHNlbGYucG9zdGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcihmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbmxvYWQgKCkge1xuICAgICAgdGhpcy5vbmxvYWQgPSBlbXB0eTtcbiAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcihmYWxzZSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2VuZFhIUiA9IHRoaXMucmVxdWVzdCgnUE9TVCcpO1xuXG4gICAgaWYgKGdsb2JhbC5YRG9tYWluUmVxdWVzdCAmJiB0aGlzLnNlbmRYSFIgaW5zdGFuY2VvZiBYRG9tYWluUmVxdWVzdCkge1xuICAgICAgdGhpcy5zZW5kWEhSLm9ubG9hZCA9IHRoaXMuc2VuZFhIUi5vbmVycm9yID0gb25sb2FkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRYSFIub25yZWFkeXN0YXRlY2hhbmdlID0gc3RhdGVDaGFuZ2U7XG4gICAgfVxuXG4gICAgdGhpcy5zZW5kWEhSLnNlbmQoZGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBlc3RhYmxpc2hlZCBgWEhSYCBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFIucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub25DbG9zZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBjb25maWd1cmVkIFhIUiByZXF1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIHVybCB0aGF0IG5lZWRzIHRvIGJlIHJlcXVlc3RlZC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBUaGUgbWV0aG9kIHRoZSByZXF1ZXN0IHNob3VsZCB1c2UuXG4gICAqIEByZXR1cm5zIHtYTUxIdHRwUmVxdWVzdH1cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFhIUi5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICB2YXIgcmVxID0gaW8udXRpbC5yZXF1ZXN0KHRoaXMuc29ja2V0LmlzWERvbWFpbigpKVxuICAgICAgLCBxdWVyeSA9IGlvLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSwgJ3Q9JyArICtuZXcgRGF0ZSk7XG5cbiAgICByZXEub3BlbihtZXRob2QgfHwgJ0dFVCcsIHRoaXMucHJlcGFyZVVybCgpICsgcXVlcnksIHRydWUpO1xuXG4gICAgaWYgKG1ldGhvZCA9PSAnUE9TVCcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChyZXEuc2V0UmVxdWVzdEhlYWRlcikge1xuICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gWERvbWFpblJlcXVlc3RcbiAgICAgICAgICByZXEuY29udGVudFR5cGUgPSAndGV4dC9wbGFpbic7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2NoZW1lIHRvIHVzZSBmb3IgdGhlIHRyYW5zcG9ydCBVUkxzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgWEhSLnByb3RvdHlwZS5zY2hlbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0Lm9wdGlvbnMuc2VjdXJlID8gJ2h0dHBzJyA6ICdodHRwJztcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIFhIUiB0cmFuc3BvcnRzIGFyZSBzdXBwb3J0ZWRcbiAgICpcbiAgICogQHBhcmFtIHtCb29sZWFufSB4ZG9tYWluIENoZWNrIGlmIHdlIHN1cHBvcnQgY3Jvc3MgZG9tYWluIHJlcXVlc3RzLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWEhSLmNoZWNrID0gZnVuY3Rpb24gKHNvY2tldCwgeGRvbWFpbikge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IGlvLnV0aWwucmVxdWVzdCh4ZG9tYWluKSxcbiAgICAgICAgICB1c2VzWERvbVJlcSA9IChnbG9iYWwuWERvbWFpblJlcXVlc3QgJiYgcmVxdWVzdCBpbnN0YW5jZW9mIFhEb21haW5SZXF1ZXN0KSxcbiAgICAgICAgICBzb2NrZXRQcm90b2NvbCA9IChzb2NrZXQgJiYgc29ja2V0Lm9wdGlvbnMgJiYgc29ja2V0Lm9wdGlvbnMuc2VjdXJlID8gJ2h0dHBzOicgOiAnaHR0cDonKSxcbiAgICAgICAgICBpc1hQcm90b2NvbCA9IChnbG9iYWwubG9jYXRpb24gJiYgc29ja2V0UHJvdG9jb2wgIT0gZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sKTtcbiAgICAgIGlmIChyZXF1ZXN0ICYmICEodXNlc1hEb21SZXEgJiYgaXNYUHJvdG9jb2wpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge31cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIFhIUiB0cmFuc3BvcnQgc3VwcG9ydHMgY3Jvc3MgZG9tYWluIHJlcXVlc3RzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWEhSLnhkb21haW5DaGVjayA9IGZ1bmN0aW9uIChzb2NrZXQpIHtcbiAgICByZXR1cm4gWEhSLmNoZWNrKHNvY2tldCwgdHJ1ZSk7XG4gIH07XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvLlRyYW5zcG9ydCA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbiAgLCB0aGlzXG4pO1xuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8pIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzLmh0bWxmaWxlID0gSFRNTEZpbGU7XG5cbiAgLyoqXG4gICAqIFRoZSBIVE1MRmlsZSB0cmFuc3BvcnQgY3JlYXRlcyBhIGBmb3JldmVyIGlmcmFtZWAgYmFzZWQgdHJhbnNwb3J0XG4gICAqIGZvciBJbnRlcm5ldCBFeHBsb3Jlci4gUmVndWxhciBmb3JldmVyIGlmcmFtZSBpbXBsZW1lbnRhdGlvbnMgd2lsbCBcbiAgICogY29udGludW91c2x5IHRyaWdnZXIgdGhlIGJyb3dzZXJzIGJ1enkgaW5kaWNhdG9ycy4gSWYgdGhlIGZvcmV2ZXIgaWZyYW1lXG4gICAqIGlzIGNyZWF0ZWQgaW5zaWRlIGEgYGh0bWxmaWxlYCB0aGVzZSBpbmRpY2F0b3JzIHdpbGwgbm90IGJlIHRyaWdnZWQuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAZXh0ZW5kcyB7aW8uVHJhbnNwb3J0LlhIUn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gSFRNTEZpbGUgKHNvY2tldCkge1xuICAgIGlvLlRyYW5zcG9ydC5YSFIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvKipcbiAgICogSW5oZXJpdHMgZnJvbSBYSFIgdHJhbnNwb3J0LlxuICAgKi9cblxuICBpby51dGlsLmluaGVyaXQoSFRNTEZpbGUsIGlvLlRyYW5zcG9ydC5YSFIpO1xuXG4gIC8qKlxuICAgKiBUcmFuc3BvcnQgbmFtZVxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBIVE1MRmlsZS5wcm90b3R5cGUubmFtZSA9ICdodG1sZmlsZSc7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQWMuLi5lWCBgaHRtbGZpbGVgIHdpdGggYSBmb3JldmVyIGxvYWRpbmcgaWZyYW1lXG4gICAqIHRoYXQgY2FuIGJlIHVzZWQgdG8gbGlzdGVuIHRvIG1lc3NhZ2VzLiBJbnNpZGUgdGhlIGdlbmVyYXRlZFxuICAgKiBgaHRtbGZpbGVgIGEgcmVmZXJlbmNlIHdpbGwgYmUgbWFkZSB0byB0aGUgSFRNTEZpbGUgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgSFRNTEZpbGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRvYyA9IG5ldyB3aW5kb3dbKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpXSgnaHRtbGZpbGUnKTtcbiAgICB0aGlzLmRvYy5vcGVuKCk7XG4gICAgdGhpcy5kb2Mud3JpdGUoJzxodG1sPjwvaHRtbD4nKTtcbiAgICB0aGlzLmRvYy5jbG9zZSgpO1xuICAgIHRoaXMuZG9jLnBhcmVudFdpbmRvdy5zID0gdGhpcztcblxuICAgIHZhciBpZnJhbWVDID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaWZyYW1lQy5jbGFzc05hbWUgPSAnc29ja2V0aW8nO1xuXG4gICAgdGhpcy5kb2MuYm9keS5hcHBlbmRDaGlsZChpZnJhbWVDKTtcbiAgICB0aGlzLmlmcmFtZSA9IHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXG4gICAgaWZyYW1lQy5hcHBlbmRDaGlsZCh0aGlzLmlmcmFtZSk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgcXVlcnkgPSBpby51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnksICd0PScrICtuZXcgRGF0ZSk7XG5cbiAgICB0aGlzLmlmcmFtZS5zcmMgPSB0aGlzLnByZXBhcmVVcmwoKSArIHF1ZXJ5O1xuXG4gICAgaW8udXRpbC5vbih3aW5kb3csICd1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVGhlIFNvY2tldC5JTyBzZXJ2ZXIgd2lsbCB3cml0ZSBzY3JpcHQgdGFncyBpbnNpZGUgdGhlIGZvcmV2ZXJcbiAgICogaWZyYW1lLCB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCBhcyBjYWxsYmFjayBmb3IgdGhlIGluY29taW5nXG4gICAqIGluZm9ybWF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBUaGUgbWVzc2FnZVxuICAgKiBAcGFyYW0ge2RvY3VtZW50fSBkb2MgUmVmZXJlbmNlIHRvIHRoZSBjb250ZXh0XG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBIVE1MRmlsZS5wcm90b3R5cGUuXyA9IGZ1bmN0aW9uIChkYXRhLCBkb2MpIHtcbiAgICAvLyB1bmVzY2FwZSBhbGwgZm9yd2FyZCBzbGFzaGVzLiBzZWUgR0gtMTI1MVxuICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL1xcXFxcXC8vZywgJy8nKTtcbiAgICB0aGlzLm9uRGF0YShkYXRhKTtcbiAgICB0cnkge1xuICAgICAgdmFyIHNjcmlwdCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBlc3RhYmxpc2hlZCBjb25uZWN0aW9uLCBpZnJhbWUgYW5kIGBodG1sZmlsZWAuXG4gICAqIEFuZCBjYWxscyB0aGUgYENvbGxlY3RHYXJiYWdlYCBmdW5jdGlvbiBvZiBJbnRlcm5ldCBFeHBsb3JlclxuICAgKiB0byByZWxlYXNlIHRoZSBtZW1vcnkuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBIVE1MRmlsZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pZnJhbWUpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3JjID0gJ2Fib3V0OmJsYW5rJztcbiAgICAgIH0gY2F0Y2goZSl7fVxuXG4gICAgICB0aGlzLmRvYyA9IG51bGw7XG4gICAgICB0aGlzLmlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaWZyYW1lKTtcbiAgICAgIHRoaXMuaWZyYW1lID0gbnVsbDtcblxuICAgICAgQ29sbGVjdEdhcmJhZ2UoKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBlc3RhYmxpc2hlZCBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fSBDaGFpbmluZy5cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSFRNTEZpbGUucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIHJldHVybiBpby5UcmFuc3BvcnQuWEhSLnByb3RvdHlwZS5jbG9zZS5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhpcyB0cmFuc3BvcnQuIFRoZSBicm93c2VyXG4gICAqIG11c3QgaGF2ZSBhbiBgQWMuLi5lWE9iamVjdGAgaW1wbGVtZW50YXRpb24uXG4gICAqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEhUTUxGaWxlLmNoZWNrID0gZnVuY3Rpb24gKHNvY2tldCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9IFwidW5kZWZpbmVkXCIgJiYgKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpIGluIHdpbmRvdyl7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgYSA9IG5ldyB3aW5kb3dbKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpXSgnaHRtbGZpbGUnKTtcbiAgICAgICAgcmV0dXJuIGEgJiYgaW8uVHJhbnNwb3J0LlhIUi5jaGVjayhzb2NrZXQpO1xuICAgICAgfSBjYXRjaChlKXt9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgY3Jvc3MgZG9tYWluIHJlcXVlc3RzIGFyZSBzdXBwb3J0ZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBIVE1MRmlsZS54ZG9tYWluQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gd2UgY2FuIHByb2JhYmx5IGRvIGhhbmRsaW5nIGZvciBzdWItZG9tYWlucywgd2Ugc2hvdWxkXG4gICAgLy8gdGVzdCB0aGF0IGl0J3MgY3Jvc3MgZG9tYWluIGJ1dCBhIHN1YmRvbWFpbiBoZXJlXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgdGhlIHRyYW5zcG9ydCB0byB5b3VyIHB1YmxpYyBpby50cmFuc3BvcnRzIGFycmF5LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgaW8udHJhbnNwb3J0cy5wdXNoKCdodG1sZmlsZScpO1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpby5UcmFuc3BvcnQgOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4pO1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbywgZ2xvYmFsKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0c1sneGhyLXBvbGxpbmcnXSA9IFhIUlBvbGxpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBYSFItcG9sbGluZyB0cmFuc3BvcnQgdXNlcyBsb25nIHBvbGxpbmcgWEhSIHJlcXVlc3RzIHRvIGNyZWF0ZSBhXG4gICAqIFwicGVyc2lzdGVudFwiIGNvbm5lY3Rpb24gd2l0aCB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gWEhSUG9sbGluZyAoKSB7XG4gICAgaW8uVHJhbnNwb3J0LlhIUi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFhIUiB0cmFuc3BvcnQuXG4gICAqL1xuXG4gIGlvLnV0aWwuaW5oZXJpdChYSFJQb2xsaW5nLCBpby5UcmFuc3BvcnQuWEhSKTtcblxuICAvKipcbiAgICogTWVyZ2UgdGhlIHByb3BlcnRpZXMgZnJvbSBYSFIgdHJhbnNwb3J0XG4gICAqL1xuXG4gIGlvLnV0aWwubWVyZ2UoWEhSUG9sbGluZywgaW8uVHJhbnNwb3J0LlhIUik7XG5cbiAgLyoqXG4gICAqIFRyYW5zcG9ydCBuYW1lXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFhIUlBvbGxpbmcucHJvdG90eXBlLm5hbWUgPSAneGhyLXBvbGxpbmcnO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBoZWFydGJlYXRzIGlzIGVuYWJsZWQgZm9yIHRoaXMgdHJhbnNwb3J0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBYSFJQb2xsaW5nLnByb3RvdHlwZS5oZWFydGJlYXRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvKiogXG4gICAqIEVzdGFibGlzaCBhIGNvbm5lY3Rpb24sIGZvciBpUGhvbmUgYW5kIEFuZHJvaWQgdGhpcyB3aWxsIGJlIGRvbmUgb25jZSB0aGUgcGFnZVxuICAgKiBpcyBsb2FkZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9IENoYWluaW5nLlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFJQb2xsaW5nLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlvLlRyYW5zcG9ydC5YSFIucHJvdG90eXBlLm9wZW4uY2FsbChzZWxmKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIFhIUiByZXF1ZXN0IHRvIHdhaXQgZm9yIGluY29taW5nIG1lc3NhZ2VzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gZW1wdHkgKCkge307XG5cbiAgWEhSUG9sbGluZy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4pIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHN0YXRlQ2hhbmdlICgpIHtcbiAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICB0aGlzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICBzZWxmLm9uRGF0YSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgc2VsZi5nZXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBvbmxvYWQgKCkge1xuICAgICAgdGhpcy5vbmxvYWQgPSBlbXB0eTtcbiAgICAgIHRoaXMub25lcnJvciA9IGVtcHR5O1xuICAgICAgc2VsZi5yZXRyeUNvdW50ZXIgPSAxO1xuICAgICAgc2VsZi5vbkRhdGEodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgc2VsZi5nZXQoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gb25lcnJvciAoKSB7XG4gICAgICBzZWxmLnJldHJ5Q291bnRlciArKztcbiAgICAgIGlmKCFzZWxmLnJldHJ5Q291bnRlciB8fCBzZWxmLnJldHJ5Q291bnRlciA+IDMpIHtcbiAgICAgICAgc2VsZi5vbkNsb3NlKCk7ICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuZ2V0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMueGhyID0gdGhpcy5yZXF1ZXN0KCk7XG5cbiAgICBpZiAoZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmIHRoaXMueGhyIGluc3RhbmNlb2YgWERvbWFpblJlcXVlc3QpIHtcbiAgICAgIHRoaXMueGhyLm9ubG9hZCA9IG9ubG9hZDtcbiAgICAgIHRoaXMueGhyLm9uZXJyb3IgPSBvbmVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBzdGF0ZUNoYW5nZTtcbiAgICB9XG5cbiAgICB0aGlzLnhoci5zZW5kKG51bGwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGUgdGhlIHVuY2xlYW4gY2xvc2UgYmVoYXZpb3IuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBYSFJQb2xsaW5nLnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIGlvLlRyYW5zcG9ydC5YSFIucHJvdG90eXBlLm9uQ2xvc2UuY2FsbCh0aGlzKTtcblxuICAgIGlmICh0aGlzLnhocikge1xuICAgICAgdGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gdGhpcy54aHIub25sb2FkID0gdGhpcy54aHIub25lcnJvciA9IGVtcHR5O1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy54aHIuYWJvcnQoKTtcbiAgICAgIH0gY2F0Y2goZSl7fVxuICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogV2Via2l0IGJhc2VkIGJyb3dzZXJzIHNob3cgYSBpbmZpbml0IHNwaW5uZXIgd2hlbiB5b3Ugc3RhcnQgYSBYSFIgcmVxdWVzdFxuICAgKiBiZWZvcmUgdGhlIGJyb3dzZXJzIG9ubG9hZCBldmVudCBpcyBjYWxsZWQgc28gd2UgbmVlZCB0byBkZWZlciBvcGVuaW5nIG9mXG4gICAqIHRoZSB0cmFuc3BvcnQgdW50aWwgdGhlIG9ubG9hZCBldmVudCBpcyBjYWxsZWQuIFdyYXBwaW5nIHRoZSBjYiBpbiBvdXJcbiAgICogZGVmZXIgbWV0aG9kIHNvbHZlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXQgVGhlIHNvY2tldCBpbnN0YW5jZSB0aGF0IG5lZWRzIGEgdHJhbnNwb3J0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFja1xuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgWEhSUG9sbGluZy5wcm90b3R5cGUucmVhZHkgPSBmdW5jdGlvbiAoc29ja2V0LCBmbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlvLnV0aWwuZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgZm4uY2FsbChzZWxmKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIHRoZSB0cmFuc3BvcnQgdG8geW91ciBwdWJsaWMgaW8udHJhbnNwb3J0cyBhcnJheS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLnRyYW5zcG9ydHMucHVzaCgneGhyLXBvbGxpbmcnKTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8uVHJhbnNwb3J0IDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuICAsIHRoaXNcbik7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvLCBnbG9iYWwpIHtcbiAgLyoqXG4gICAqIFRoZXJlIGlzIGEgd2F5IHRvIGhpZGUgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIGluIEZpcmVmb3guIElmIHlvdSBjcmVhdGUgYW5kXG4gICAqIHJlbW92ZSBhIGlmcmFtZSBpdCB3aWxsIHN0b3Agc2hvd2luZyB0aGUgY3VycmVudCBsb2FkaW5nIGluZGljYXRvci5cbiAgICogVW5mb3J0dW5hdGVseSB3ZSBjYW4ndCBmZWF0dXJlIGRldGVjdCB0aGF0IGFuZCBVQSBzbmlmZmluZyBpcyBldmlsLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgdmFyIGluZGljYXRvciA9IGdsb2JhbC5kb2N1bWVudCAmJiBcIk1vekFwcGVhcmFuY2VcIiBpblxuICAgIGdsb2JhbC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0c1snanNvbnAtcG9sbGluZyddID0gSlNPTlBQb2xsaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgSlNPTlAgdHJhbnNwb3J0IGNyZWF0ZXMgYW4gcGVyc2lzdGVudCBjb25uZWN0aW9uIGJ5IGR5bmFtaWNhbGx5XG4gICAqIGluc2VydGluZyBhIHNjcmlwdCB0YWcgaW4gdGhlIHBhZ2UuIFRoaXMgc2NyaXB0IHRhZyB3aWxsIHJlY2VpdmUgdGhlXG4gICAqIGluZm9ybWF0aW9uIG9mIHRoZSBTb2NrZXQuSU8gc2VydmVyLiBXaGVuIG5ldyBpbmZvcm1hdGlvbiBpcyByZWNlaXZlZFxuICAgKiBpdCBjcmVhdGVzIGEgbmV3IHNjcmlwdCB0YWcgZm9yIHRoZSBuZXcgZGF0YSBzdHJlYW0uXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAZXh0ZW5kcyB7aW8uVHJhbnNwb3J0Lnhoci1wb2xsaW5nfVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBKU09OUFBvbGxpbmcgKHNvY2tldCkge1xuICAgIGlvLlRyYW5zcG9ydFsneGhyLXBvbGxpbmcnXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5pbmRleCA9IGlvLmoubGVuZ3RoO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaW8uai5wdXNoKGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIHNlbGYuXyhtc2cpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFhIUiBwb2xsaW5nIHRyYW5zcG9ydC5cbiAgICovXG5cbiAgaW8udXRpbC5pbmhlcml0KEpTT05QUG9sbGluZywgaW8uVHJhbnNwb3J0Wyd4aHItcG9sbGluZyddKTtcblxuICAvKipcbiAgICogVHJhbnNwb3J0IG5hbWVcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5uYW1lID0gJ2pzb25wLXBvbGxpbmcnO1xuXG4gIC8qKlxuICAgKiBQb3N0cyBhIGVuY29kZWQgbWVzc2FnZSB0byB0aGUgU29ja2V0LklPIHNlcnZlciB1c2luZyBhbiBpZnJhbWUuXG4gICAqIFRoZSBpZnJhbWUgaXMgdXNlZCBiZWNhdXNlIHNjcmlwdCB0YWdzIGNhbiBjcmVhdGUgUE9TVCBiYXNlZCByZXF1ZXN0cy5cbiAgICogVGhlIGlmcmFtZSBpcyBwb3NpdGlvbmVkIG91dHNpZGUgb2YgdGhlIHZpZXcgc28gdGhlIHVzZXIgZG9lcyBub3RcbiAgICogbm90aWNlIGl0J3MgZXhpc3RlbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBBIGVuY29kZWQgbWVzc2FnZS5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEpTT05QUG9sbGluZy5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAsIHF1ZXJ5ID0gaW8udXRpbC5xdWVyeShcbiAgICAgICAgICAgICB0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5XG4gICAgICAgICAgLCAndD0nKyAoK25ldyBEYXRlKSArICcmaT0nICsgdGhpcy5pbmRleFxuICAgICAgICApO1xuXG4gICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpXG4gICAgICAgICwgYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcbiAgICAgICAgLCBpZCA9IHRoaXMuaWZyYW1lSWQgPSAnc29ja2V0aW9faWZyYW1lXycgKyB0aGlzLmluZGV4XG4gICAgICAgICwgaWZyYW1lO1xuXG4gICAgICBmb3JtLmNsYXNzTmFtZSA9ICdzb2NrZXRpbyc7XG4gICAgICBmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGZvcm0uc3R5bGUudG9wID0gJzBweCc7XG4gICAgICBmb3JtLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGZvcm0udGFyZ2V0ID0gaWQ7XG4gICAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY2NlcHQtY2hhcnNldCcsICd1dGYtOCcpO1xuICAgICAgYXJlYS5uYW1lID0gJ2QnO1xuICAgICAgZm9ybS5hcHBlbmRDaGlsZChhcmVhKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICAgIH1cblxuICAgIHRoaXMuZm9ybS5hY3Rpb24gPSB0aGlzLnByZXBhcmVVcmwoKSArIHF1ZXJ5O1xuXG4gICAgZnVuY3Rpb24gY29tcGxldGUgKCkge1xuICAgICAgaW5pdElmcmFtZSgpO1xuICAgICAgc2VsZi5zb2NrZXQuc2V0QnVmZmVyKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdElmcmFtZSAoKSB7XG4gICAgICBpZiAoc2VsZi5pZnJhbWUpIHtcbiAgICAgICAgc2VsZi5mb3JtLnJlbW92ZUNoaWxkKHNlbGYuaWZyYW1lKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG4gICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJzxpZnJhbWUgbmFtZT1cIicrIHNlbGYuaWZyYW1lSWQgKydcIj4nKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIGlmcmFtZS5uYW1lID0gc2VsZi5pZnJhbWVJZDtcbiAgICAgIH1cblxuICAgICAgaWZyYW1lLmlkID0gc2VsZi5pZnJhbWVJZDtcblxuICAgICAgc2VsZi5mb3JtLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICBzZWxmLmlmcmFtZSA9IGlmcmFtZTtcbiAgICB9O1xuXG4gICAgaW5pdElmcmFtZSgpO1xuXG4gICAgLy8gd2UgdGVtcG9yYXJpbHkgc3RyaW5naWZ5IHVudGlsIHdlIGZpZ3VyZSBvdXQgaG93IHRvIHByZXZlbnRcbiAgICAvLyBicm93c2VycyBmcm9tIHR1cm5pbmcgYFxcbmAgaW50byBgXFxyXFxuYCBpbiBmb3JtIGlucHV0c1xuICAgIHRoaXMuYXJlYS52YWx1ZSA9IGlvLkpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcbiAgICB9IGNhdGNoKGUpIHt9XG5cbiAgICBpZiAodGhpcy5pZnJhbWUuYXR0YWNoRXZlbnQpIHtcbiAgICAgIGlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzZWxmLmlmcmFtZS5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlmcmFtZS5vbmxvYWQgPSBjb21wbGV0ZTtcbiAgICB9XG5cbiAgICB0aGlzLnNvY2tldC5zZXRCdWZmZXIodHJ1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgSlNPTlAgcG9sbCB0aGF0IGNhbiBiZSB1c2VkIHRvIGxpc3RlblxuICAgKiBmb3IgbWVzc2FnZXMgZnJvbSB0aGUgU29ja2V0LklPIHNlcnZlci5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEpTT05QUG9sbGluZy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgICAgLCBxdWVyeSA9IGlvLnV0aWwucXVlcnkoXG4gICAgICAgICAgICAgdGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeVxuICAgICAgICAgICwgJ3Q9JysgKCtuZXcgRGF0ZSkgKyAnJmk9JyArIHRoaXMuaW5kZXhcbiAgICAgICAgKTtcblxuICAgIGlmICh0aGlzLnNjcmlwdCkge1xuICAgICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gICAgfVxuXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQuc3JjID0gdGhpcy5wcmVwYXJlVXJsKCkgKyBxdWVyeTtcbiAgICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgIH07XG5cbiAgICB2YXIgaW5zZXJ0QXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgaW5zZXJ0QXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBpbnNlcnRBdCk7XG4gICAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICBpZiAoaW5kaWNhdG9yKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgIH0sIDEwMCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhlIGluY29taW5nIG1lc3NhZ2Ugc3RyZWFtIGZyb20gdGhlIFNvY2tldC5JTyBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIFRoZSBtZXNzYWdlXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBKU09OUFBvbGxpbmcucHJvdG90eXBlLl8gPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgdGhpcy5vbkRhdGEobXNnKTtcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuZ2V0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kaWNhdG9yIGhhY2sgb25seSB3b3JrcyBhZnRlciBvbmxvYWRcbiAgICpcbiAgICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldCBUaGUgc29ja2V0IGluc3RhbmNlIHRoYXQgbmVlZHMgYSB0cmFuc3BvcnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBKU09OUFBvbGxpbmcucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24gKHNvY2tldCwgZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFpbmRpY2F0b3IpIHJldHVybiBmbi5jYWxsKHRoaXMpO1xuXG4gICAgaW8udXRpbC5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZuLmNhbGwoc2VsZik7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBicm93c2VyIHN1cHBvcnRzIHRoaXMgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBKU09OUFBvbGxpbmcuY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICdkb2N1bWVudCcgaW4gZ2xvYmFsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBjcm9zcyBkb21haW4gcmVxdWVzdHMgYXJlIHN1cHBvcnRlZFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSlNPTlBQb2xsaW5nLnhkb21haW5DaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIHRoZSB0cmFuc3BvcnQgdG8geW91ciBwdWJsaWMgaW8udHJhbnNwb3J0cyBhcnJheS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLnRyYW5zcG9ydHMucHVzaCgnanNvbnAtcG9sbGluZycpO1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpby5UcmFuc3BvcnQgOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4gICwgdGhpc1xuKTtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gaW87IH0pO1xufVxufSkoKTsiLCIvLyBHZW5lcmF0ZWQgYnkgQ29mZmVlU2NyaXB0IDEuNC4wXG4oZnVuY3Rpb24oKSB7XG4gIHZhciBmb3JtYXQsIGxvb2t1cCwgcmVzb2x2ZSxcbiAgICBfX3NsaWNlID0gW10uc2xpY2U7XG5cbiAgZm9ybWF0ID0gU3RyaW5nLnByb3RvdHlwZS5mb3JtYXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZXhwbGljaXQsIGlkeCwgaW1wbGljaXQsIG1lc3NhZ2UsXG4gICAgICBfdGhpcyA9IHRoaXM7XG4gICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IF9fc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzO1xuICAgICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgICAgcmV0dXJuIF90aGlzLmZvcm1hdC5hcHBseShfdGhpcywgYXJncyk7XG4gICAgICB9O1xuICAgIH1cbiAgICBpZHggPSAwO1xuICAgIGV4cGxpY2l0ID0gaW1wbGljaXQgPSBmYWxzZTtcbiAgICBtZXNzYWdlID0gJ2Nhbm5vdCBzd2l0Y2ggZnJvbSB7fSB0byB7fSBudW1iZXJpbmcnLmZvcm1hdCgpO1xuICAgIHJldHVybiB0aGlzLnJlcGxhY2UoLyhbe31dKVxcMXxbe10oLio/KSg/OiEoLis/KSk/W31dL2csIGZ1bmN0aW9uKG1hdGNoLCBsaXRlcmFsLCBrZXksIHRyYW5zZm9ybWVyKSB7XG4gICAgICB2YXIgZm4sIHZhbHVlLCBfcmVmLCBfcmVmMSwgX3JlZjI7XG4gICAgICBpZiAobGl0ZXJhbCkge1xuICAgICAgICByZXR1cm4gbGl0ZXJhbDtcbiAgICAgIH1cbiAgICAgIGlmIChrZXkubGVuZ3RoKSB7XG4gICAgICAgIGV4cGxpY2l0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKGltcGxpY2l0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UoJ2ltcGxpY2l0JywgJ2V4cGxpY2l0JykpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gKF9yZWYgPSBsb29rdXAoYXJncywga2V5KSkgIT0gbnVsbCA/IF9yZWYgOiAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltcGxpY2l0ID0gdHJ1ZTtcbiAgICAgICAgaWYgKGV4cGxpY2l0KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UoJ2V4cGxpY2l0JywgJ2ltcGxpY2l0JykpO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gKF9yZWYxID0gYXJnc1tpZHgrK10pICE9IG51bGwgPyBfcmVmMSA6ICcnO1xuICAgICAgfVxuICAgICAgdmFsdWUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgaWYgKGZuID0gZm9ybWF0LnRyYW5zZm9ybWVyc1t0cmFuc2Zvcm1lcl0pIHtcbiAgICAgICAgcmV0dXJuIChfcmVmMiA9IGZuLmNhbGwodmFsdWUpKSAhPSBudWxsID8gX3JlZjIgOiAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBsb29rdXAgPSBmdW5jdGlvbihvYmplY3QsIGtleSkge1xuICAgIHZhciBtYXRjaDtcbiAgICBpZiAoIS9eKFxcZCspKFsuXXwkKS8udGVzdChrZXkpKSB7XG4gICAgICBrZXkgPSAnMC4nICsga2V5O1xuICAgIH1cbiAgICB3aGlsZSAobWF0Y2ggPSAvKC4rPylbLl0oLispLy5leGVjKGtleSkpIHtcbiAgICAgIG9iamVjdCA9IHJlc29sdmUob2JqZWN0LCBtYXRjaFsxXSk7XG4gICAgICBrZXkgPSBtYXRjaFsyXTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc29sdmUob2JqZWN0LCBrZXkpO1xuICB9O1xuXG4gIHJlc29sdmUgPSBmdW5jdGlvbihvYmplY3QsIGtleSkge1xuICAgIHZhciB2YWx1ZTtcbiAgICB2YWx1ZSA9IG9iamVjdFtrZXldO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5jYWxsKG9iamVjdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH07XG5cbiAgZm9ybWF0LnRyYW5zZm9ybWVycyA9IHt9O1xuXG4gIGZvcm1hdC52ZXJzaW9uID0gJzAuMi4xJztcblxufSkuY2FsbCh0aGlzKTtcbiIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xudmFyIHNmID0gcmVxdWlyZSgnc3RyaW5nLWZvcm1hdCcpO1xudmFyIGlvID0gcmVxdWlyZSgnc29ja2V0LmlvLWNsaWVudCcpO1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtdKTtcblxuYXBwLmRpcmVjdGl2ZSgnbmdFbnRlcicsIGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cdFx0ZWxlbWVudC5iaW5kKFwia2V5ZG93biBrZXlwcmVzc1wiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0aWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuXHRcdFx0XHRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2NvcGUuJGV2YWwoYXR0cnMubmdFbnRlcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xufSk7XG5cbmFwcC5jb250cm9sbGVyKFwiQ29udHJvbGxlclwiLCBbXCIkc2NvcGVcIiwgXCIkaHR0cFwiLFxuXHRmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG5cblx0XHQkc2NvcGUuc2NyZWVuc2hvdHMgPSB7fVxuXG5cdFx0dmFyIHNvY2tldCA9IGlvLmNvbm5lY3QoJy9jbGllbnQnKTtcblxuXHRcdHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29uc29sZS5sb2coJ2Nvbm5lY3RlZCcpO1xuXG5cdFx0XHRzb2NrZXQub24oJ2RvbmUnLCBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRcdHZhciB0aXRsZSA9ICd7bmFtZX0oe3ZlcnNpb259LXtvc30pJy5mb3JtYXQoZGF0YS5icm93c2VyKTtcblx0XHRcdFx0b3BlblNjcmVlbnNob3QodGl0bGUsIGRhdGEuc2NyZWVuc2hvdCk7XG5cdFx0XHR9KTtcblxuXG5cdFx0XHRzb2NrZXQub24oJ2NvbXBsZXRlJywgZnVuY3Rpb24oZGF0YSkge1xuXG5cdFx0XHR9KVxuXHRcdFx0c29ja2V0Lm9uKCdkaXNjb25uZWN0JywgZnVuY3Rpb24oKSB7XG5cblx0XHRcdH0pO1xuXG5cdFx0fSk7XG5cblx0XHQkc2NvcGUudGVzdCA9IGZ1bmN0aW9uKHVybCkge1xuXHRcdFx0aWYgKHVybCA9PT0gJ3JlbG9hZCcpIHtcblx0XHRcdFx0c29ja2V0LmVtaXQoJ3JlbG9hZCcpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWlzVmFsaWRVcmwodXJsKSkge1xuXHRcdFx0XHRhbGVydCgnaW52YWxpZCB1cmwnKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc29sZS5sb2codXJsKTtcblx0XHRcdHNvY2tldC5lbWl0KCd0ZXN0Jywge1xuXHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0cmVxdWlyZW1lbnQ6IHtcblx0XHRcdFx0XHRuYW1lOiAnJyxcblx0XHRcdFx0XHR2ZXJzaW9uOiAnKicsXG5cdFx0XHRcdFx0c2NyZWVuc2hvdDogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkaHR0cC5nZXQoJy9hcGkvd29ya2VyJykuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHQkc2NvcGUud29ya2VycyA9IGRhdGE7XG5cdFx0fSlcblxuXHRcdGZ1bmN0aW9uIG9wZW5TY3JlZW5zaG90KHRpdGxlLCBzY3JlZW5zaG90KSB7XG5cdFx0XHR2YXIgZG9jID0gd2luZG93Lm9wZW4oJ19ibGFuaycpLmRvY3VtZW50O1xuXHRcdFx0dmFyIGh0bWwgPSAnPGh0bWw+PGJvZHk+JyArIHNjcmVlbnNob3QgKyAnPC9ib2R5PjwvaHRtbD4nO1xuXHRcdFx0ZG9jLndyaXRlKGh0bWwpO1xuXHRcdFx0ZG9jLnRpdGxlID0gdGl0bGU7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gaXNWYWxpZFVybCh1cmwpIHtcblx0XHRcdHJldHVybiAvKGZ0cHxodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdypAKT8oXFxTKykoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJUAhXFwtXFwvXSkpPy8udGVzdCh1cmwpO1xuXHRcdH1cblxuXHR9XG5dKTsiXX0=
