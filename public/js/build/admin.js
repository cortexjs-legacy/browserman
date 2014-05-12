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
/*! Socket.IO.js build:0.9.16, development. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */

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

  io.version = '0.9.16';

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
var sf=require('string-format');
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

		$scope.screenshots={}

		var socket = io.connect('/client');

		socket.on('connect', function() {
			console.log('connected');

			socket.on('done', function(data) {
				var title='{name}({version}-{os})'.format(data.browser);
				openScreenshot(title,data.screenshot);
			});


			socket.on('complete', function(data) {

			})
			socket.on('disconnect', function() {

			});

		});

		$scope.test = function(url) {
			if(url==='reload'){
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

		function openScreenshot(title,screenshot){
			var doc=window.open('_blank').document;
			var html='<html><body>'+screenshot+'</body></html>';
			doc.write(html);
			doc.title=title;
		}

		function isValidUrl(url) {
			return /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url);
		}

	}
]);
},{"angular":1,"socket.io-client":3,"string-format":4}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvYW5ndWxhci9pbmRleC1icm93c2VyaWZ5LmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vbm9kZV9tb2R1bGVzL2FuZ3VsYXIvbGliL2FuZ3VsYXIubWluLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vbm9kZV9tb2R1bGVzL3NvY2tldC5pby1jbGllbnQvZGlzdC9zb2NrZXQuaW8uanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvc3RyaW5nLWZvcm1hdC9saWIvc3RyaW5nLWZvcm1hdC5qcyIsIi9Vc2Vycy9sdGViZWFuL0Rlc2t0b3Avbm9kZWpzIHdvcmtzcGFjZS9icm93c2VybWFuL3B1YmxpYy9qcy9kZXYvZmFrZV80MmFjMWFkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoeUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwicmVxdWlyZSgnLi9saWIvYW5ndWxhci5taW4uanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuIiwiLypcbiBBbmd1bGFySlMgdjEuMi4xNlxuIChjKSAyMDEwLTIwMTQgR29vZ2xlLCBJbmMuIGh0dHA6Ly9hbmd1bGFyanMub3JnXG4gTGljZW5zZTogTUlUXG4qL1xuKGZ1bmN0aW9uKE8sVSxzKXsndXNlIHN0cmljdCc7ZnVuY3Rpb24gdChiKXtyZXR1cm4gZnVuY3Rpb24oKXt2YXIgYT1hcmd1bWVudHNbMF0sYyxhPVwiW1wiKyhiP2IrXCI6XCI6XCJcIikrYStcIl0gaHR0cDovL2Vycm9ycy5hbmd1bGFyanMub3JnLzEuMi4xNi9cIisoYj9iK1wiL1wiOlwiXCIpK2E7Zm9yKGM9MTtjPGFyZ3VtZW50cy5sZW5ndGg7YysrKWE9YSsoMT09Yz9cIj9cIjpcIiZcIikrXCJwXCIrKGMtMSkrXCI9XCIrZW5jb2RlVVJJQ29tcG9uZW50KFwiZnVuY3Rpb25cIj09dHlwZW9mIGFyZ3VtZW50c1tjXT9hcmd1bWVudHNbY10udG9TdHJpbmcoKS5yZXBsYWNlKC8gXFx7W1xcc1xcU10qJC8sXCJcIik6XCJ1bmRlZmluZWRcIj09dHlwZW9mIGFyZ3VtZW50c1tjXT9cInVuZGVmaW5lZFwiOlwic3RyaW5nXCIhPXR5cGVvZiBhcmd1bWVudHNbY10/SlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzW2NdKTphcmd1bWVudHNbY10pO3JldHVybiBFcnJvcihhKX19ZnVuY3Rpb24gYWIoYil7aWYobnVsbD09Ynx8Q2EoYikpcmV0dXJuITE7XG52YXIgYT1iLmxlbmd0aDtyZXR1cm4gMT09PWIubm9kZVR5cGUmJmE/ITA6dyhiKXx8TShiKXx8MD09PWF8fFwibnVtYmVyXCI9PT10eXBlb2YgYSYmMDxhJiZhLTEgaW4gYn1mdW5jdGlvbiBxKGIsYSxjKXt2YXIgZDtpZihiKWlmKFAoYikpZm9yKGQgaW4gYilcInByb3RvdHlwZVwiPT1kfHwoXCJsZW5ndGhcIj09ZHx8XCJuYW1lXCI9PWR8fGIuaGFzT3duUHJvcGVydHkmJiFiLmhhc093blByb3BlcnR5KGQpKXx8YS5jYWxsKGMsYltkXSxkKTtlbHNlIGlmKGIuZm9yRWFjaCYmYi5mb3JFYWNoIT09cSliLmZvckVhY2goYSxjKTtlbHNlIGlmKGFiKGIpKWZvcihkPTA7ZDxiLmxlbmd0aDtkKyspYS5jYWxsKGMsYltkXSxkKTtlbHNlIGZvcihkIGluIGIpYi5oYXNPd25Qcm9wZXJ0eShkKSYmYS5jYWxsKGMsYltkXSxkKTtyZXR1cm4gYn1mdW5jdGlvbiBRYihiKXt2YXIgYT1bXSxjO2ZvcihjIGluIGIpYi5oYXNPd25Qcm9wZXJ0eShjKSYmYS5wdXNoKGMpO3JldHVybiBhLnNvcnQoKX1mdW5jdGlvbiBTYyhiLFxuYSxjKXtmb3IodmFyIGQ9UWIoYiksZT0wO2U8ZC5sZW5ndGg7ZSsrKWEuY2FsbChjLGJbZFtlXV0sZFtlXSk7cmV0dXJuIGR9ZnVuY3Rpb24gUmIoYil7cmV0dXJuIGZ1bmN0aW9uKGEsYyl7YihjLGEpfX1mdW5jdGlvbiBiYigpe2Zvcih2YXIgYj1rYS5sZW5ndGgsYTtiOyl7Yi0tO2E9a2FbYl0uY2hhckNvZGVBdCgwKTtpZig1Nz09YSlyZXR1cm4ga2FbYl09XCJBXCIsa2Euam9pbihcIlwiKTtpZig5MD09YSlrYVtiXT1cIjBcIjtlbHNlIHJldHVybiBrYVtiXT1TdHJpbmcuZnJvbUNoYXJDb2RlKGErMSksa2Euam9pbihcIlwiKX1rYS51bnNoaWZ0KFwiMFwiKTtyZXR1cm4ga2Euam9pbihcIlwiKX1mdW5jdGlvbiBTYihiLGEpe2E/Yi4kJGhhc2hLZXk9YTpkZWxldGUgYi4kJGhhc2hLZXl9ZnVuY3Rpb24gRChiKXt2YXIgYT1iLiQkaGFzaEtleTtxKGFyZ3VtZW50cyxmdW5jdGlvbihhKXthIT09YiYmcShhLGZ1bmN0aW9uKGEsYyl7YltjXT1hfSl9KTtTYihiLGEpO3JldHVybiBifWZ1bmN0aW9uIFkoYil7cmV0dXJuIHBhcnNlSW50KGIsXG4xMCl9ZnVuY3Rpb24gVGIoYixhKXtyZXR1cm4gRChuZXcgKEQoZnVuY3Rpb24oKXt9LHtwcm90b3R5cGU6Yn0pKSxhKX1mdW5jdGlvbiBDKCl7fWZ1bmN0aW9uIERhKGIpe3JldHVybiBifWZ1bmN0aW9uIGFhKGIpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBifX1mdW5jdGlvbiBFKGIpe3JldHVyblwidW5kZWZpbmVkXCI9PT10eXBlb2YgYn1mdW5jdGlvbiBCKGIpe3JldHVyblwidW5kZWZpbmVkXCIhPT10eXBlb2YgYn1mdW5jdGlvbiBYKGIpe3JldHVybiBudWxsIT1iJiZcIm9iamVjdFwiPT09dHlwZW9mIGJ9ZnVuY3Rpb24gdyhiKXtyZXR1cm5cInN0cmluZ1wiPT09dHlwZW9mIGJ9ZnVuY3Rpb24gdmIoYil7cmV0dXJuXCJudW1iZXJcIj09PXR5cGVvZiBifWZ1bmN0aW9uIE5hKGIpe3JldHVyblwiW29iamVjdCBEYXRlXVwiPT09d2EuY2FsbChiKX1mdW5jdGlvbiBNKGIpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PXdhLmNhbGwoYil9ZnVuY3Rpb24gUChiKXtyZXR1cm5cImZ1bmN0aW9uXCI9PT10eXBlb2YgYn1cbmZ1bmN0aW9uIGNiKGIpe3JldHVyblwiW29iamVjdCBSZWdFeHBdXCI9PT13YS5jYWxsKGIpfWZ1bmN0aW9uIENhKGIpe3JldHVybiBiJiZiLmRvY3VtZW50JiZiLmxvY2F0aW9uJiZiLmFsZXJ0JiZiLnNldEludGVydmFsfWZ1bmN0aW9uIFRjKGIpe3JldHVybiEoIWJ8fCEoYi5ub2RlTmFtZXx8Yi5wcm9wJiZiLmF0dHImJmIuZmluZCkpfWZ1bmN0aW9uIFVjKGIsYSxjKXt2YXIgZD1bXTtxKGIsZnVuY3Rpb24oYixnLGYpe2QucHVzaChhLmNhbGwoYyxiLGcsZikpfSk7cmV0dXJuIGR9ZnVuY3Rpb24gZGIoYixhKXtpZihiLmluZGV4T2YpcmV0dXJuIGIuaW5kZXhPZihhKTtmb3IodmFyIGM9MDtjPGIubGVuZ3RoO2MrKylpZihhPT09YltjXSlyZXR1cm4gYztyZXR1cm4tMX1mdW5jdGlvbiBPYShiLGEpe3ZhciBjPWRiKGIsYSk7MDw9YyYmYi5zcGxpY2UoYywxKTtyZXR1cm4gYX1mdW5jdGlvbiBiYShiLGEpe2lmKENhKGIpfHxiJiZiLiRldmFsQXN5bmMmJmIuJHdhdGNoKXRocm93IFBhKFwiY3B3c1wiKTtcbmlmKGEpe2lmKGI9PT1hKXRocm93IFBhKFwiY3BpXCIpO2lmKE0oYikpZm9yKHZhciBjPWEubGVuZ3RoPTA7YzxiLmxlbmd0aDtjKyspYS5wdXNoKGJhKGJbY10pKTtlbHNle2M9YS4kJGhhc2hLZXk7cShhLGZ1bmN0aW9uKGIsYyl7ZGVsZXRlIGFbY119KTtmb3IodmFyIGQgaW4gYilhW2RdPWJhKGJbZF0pO1NiKGEsYyl9fWVsc2UoYT1iKSYmKE0oYik/YT1iYShiLFtdKTpOYShiKT9hPW5ldyBEYXRlKGIuZ2V0VGltZSgpKTpjYihiKT9hPVJlZ0V4cChiLnNvdXJjZSk6WChiKSYmKGE9YmEoYix7fSkpKTtyZXR1cm4gYX1mdW5jdGlvbiBVYihiLGEpe2E9YXx8e307Zm9yKHZhciBjIGluIGIpIWIuaGFzT3duUHJvcGVydHkoYyl8fFwiJFwiPT09Yy5jaGFyQXQoMCkmJlwiJFwiPT09Yy5jaGFyQXQoMSl8fChhW2NdPWJbY10pO3JldHVybiBhfWZ1bmN0aW9uIHhhKGIsYSl7aWYoYj09PWEpcmV0dXJuITA7aWYobnVsbD09PWJ8fG51bGw9PT1hKXJldHVybiExO2lmKGIhPT1iJiZhIT09YSlyZXR1cm4hMDtcbnZhciBjPXR5cGVvZiBiLGQ7aWYoYz09dHlwZW9mIGEmJlwib2JqZWN0XCI9PWMpaWYoTShiKSl7aWYoIU0oYSkpcmV0dXJuITE7aWYoKGM9Yi5sZW5ndGgpPT1hLmxlbmd0aCl7Zm9yKGQ9MDtkPGM7ZCsrKWlmKCF4YShiW2RdLGFbZF0pKXJldHVybiExO3JldHVybiEwfX1lbHNle2lmKE5hKGIpKXJldHVybiBOYShhKSYmYi5nZXRUaW1lKCk9PWEuZ2V0VGltZSgpO2lmKGNiKGIpJiZjYihhKSlyZXR1cm4gYi50b1N0cmluZygpPT1hLnRvU3RyaW5nKCk7aWYoYiYmYi4kZXZhbEFzeW5jJiZiLiR3YXRjaHx8YSYmYS4kZXZhbEFzeW5jJiZhLiR3YXRjaHx8Q2EoYil8fENhKGEpfHxNKGEpKXJldHVybiExO2M9e307Zm9yKGQgaW4gYilpZihcIiRcIiE9PWQuY2hhckF0KDApJiYhUChiW2RdKSl7aWYoIXhhKGJbZF0sYVtkXSkpcmV0dXJuITE7Y1tkXT0hMH1mb3IoZCBpbiBhKWlmKCFjLmhhc093blByb3BlcnR5KGQpJiZcIiRcIiE9PWQuY2hhckF0KDApJiZhW2RdIT09cyYmIVAoYVtkXSkpcmV0dXJuITE7XG5yZXR1cm4hMH1yZXR1cm4hMX1mdW5jdGlvbiBWYigpe3JldHVybiBVLnNlY3VyaXR5UG9saWN5JiZVLnNlY3VyaXR5UG9saWN5LmlzQWN0aXZlfHxVLnF1ZXJ5U2VsZWN0b3ImJiEoIVUucXVlcnlTZWxlY3RvcihcIltuZy1jc3BdXCIpJiYhVS5xdWVyeVNlbGVjdG9yKFwiW2RhdGEtbmctY3NwXVwiKSl9ZnVuY3Rpb24gZWIoYixhKXt2YXIgYz0yPGFyZ3VtZW50cy5sZW5ndGg/eWEuY2FsbChhcmd1bWVudHMsMik6W107cmV0dXJuIVAoYSl8fGEgaW5zdGFuY2VvZiBSZWdFeHA/YTpjLmxlbmd0aD9mdW5jdGlvbigpe3JldHVybiBhcmd1bWVudHMubGVuZ3RoP2EuYXBwbHkoYixjLmNvbmNhdCh5YS5jYWxsKGFyZ3VtZW50cywwKSkpOmEuYXBwbHkoYixjKX06ZnVuY3Rpb24oKXtyZXR1cm4gYXJndW1lbnRzLmxlbmd0aD9hLmFwcGx5KGIsYXJndW1lbnRzKTphLmNhbGwoYil9fWZ1bmN0aW9uIFZjKGIsYSl7dmFyIGM9YTtcInN0cmluZ1wiPT09dHlwZW9mIGImJlwiJFwiPT09Yi5jaGFyQXQoMCk/Yz1cbnM6Q2EoYSk/Yz1cIiRXSU5ET1dcIjphJiZVPT09YT9jPVwiJERPQ1VNRU5UXCI6YSYmKGEuJGV2YWxBc3luYyYmYS4kd2F0Y2gpJiYoYz1cIiRTQ09QRVwiKTtyZXR1cm4gY31mdW5jdGlvbiBxYShiLGEpe3JldHVyblwidW5kZWZpbmVkXCI9PT10eXBlb2YgYj9zOkpTT04uc3RyaW5naWZ5KGIsVmMsYT9cIiAgXCI6bnVsbCl9ZnVuY3Rpb24gV2IoYil7cmV0dXJuIHcoYik/SlNPTi5wYXJzZShiKTpifWZ1bmN0aW9uIFFhKGIpe1wiZnVuY3Rpb25cIj09PXR5cGVvZiBiP2I9ITA6YiYmMCE9PWIubGVuZ3RoPyhiPUsoXCJcIitiKSxiPSEoXCJmXCI9PWJ8fFwiMFwiPT1ifHxcImZhbHNlXCI9PWJ8fFwibm9cIj09Ynx8XCJuXCI9PWJ8fFwiW11cIj09YikpOmI9ITE7cmV0dXJuIGJ9ZnVuY3Rpb24gaGEoYil7Yj15KGIpLmNsb25lKCk7dHJ5e2IuZW1wdHkoKX1jYXRjaChhKXt9dmFyIGM9eShcIjxkaXY+XCIpLmFwcGVuZChiKS5odG1sKCk7dHJ5e3JldHVybiAzPT09YlswXS5ub2RlVHlwZT9LKGMpOmMubWF0Y2goL14oPFtePl0rPikvKVsxXS5yZXBsYWNlKC9ePChbXFx3XFwtXSspLyxcbmZ1bmN0aW9uKGEsYil7cmV0dXJuXCI8XCIrSyhiKX0pfWNhdGNoKGQpe3JldHVybiBLKGMpfX1mdW5jdGlvbiBYYihiKXt0cnl7cmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChiKX1jYXRjaChhKXt9fWZ1bmN0aW9uIFliKGIpe3ZhciBhPXt9LGMsZDtxKChifHxcIlwiKS5zcGxpdChcIiZcIiksZnVuY3Rpb24oYil7YiYmKGM9Yi5zcGxpdChcIj1cIiksZD1YYihjWzBdKSxCKGQpJiYoYj1CKGNbMV0pP1hiKGNbMV0pOiEwLGFbZF0/TShhW2RdKT9hW2RdLnB1c2goYik6YVtkXT1bYVtkXSxiXTphW2RdPWIpKX0pO3JldHVybiBhfWZ1bmN0aW9uIFpiKGIpe3ZhciBhPVtdO3EoYixmdW5jdGlvbihiLGQpe00oYik/cShiLGZ1bmN0aW9uKGIpe2EucHVzaCh6YShkLCEwKSsoITA9PT1iP1wiXCI6XCI9XCIremEoYiwhMCkpKX0pOmEucHVzaCh6YShkLCEwKSsoITA9PT1iP1wiXCI6XCI9XCIremEoYiwhMCkpKX0pO3JldHVybiBhLmxlbmd0aD9hLmpvaW4oXCImXCIpOlwiXCJ9ZnVuY3Rpb24gd2IoYil7cmV0dXJuIHphKGIsXG4hMCkucmVwbGFjZSgvJTI2L2dpLFwiJlwiKS5yZXBsYWNlKC8lM0QvZ2ksXCI9XCIpLnJlcGxhY2UoLyUyQi9naSxcIitcIil9ZnVuY3Rpb24gemEoYixhKXtyZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGIpLnJlcGxhY2UoLyU0MC9naSxcIkBcIikucmVwbGFjZSgvJTNBL2dpLFwiOlwiKS5yZXBsYWNlKC8lMjQvZyxcIiRcIikucmVwbGFjZSgvJTJDL2dpLFwiLFwiKS5yZXBsYWNlKC8lMjAvZyxhP1wiJTIwXCI6XCIrXCIpfWZ1bmN0aW9uIFdjKGIsYSl7ZnVuY3Rpb24gYyhhKXthJiZkLnB1c2goYSl9dmFyIGQ9W2JdLGUsZyxmPVtcIm5nOmFwcFwiLFwibmctYXBwXCIsXCJ4LW5nLWFwcFwiLFwiZGF0YS1uZy1hcHBcIl0saD0vXFxzbmdbOlxcLV1hcHAoOlxccyooW1xcd1xcZF9dKyk7Pyk/XFxzLztxKGYsZnVuY3Rpb24oYSl7ZlthXT0hMDtjKFUuZ2V0RWxlbWVudEJ5SWQoYSkpO2E9YS5yZXBsYWNlKFwiOlwiLFwiXFxcXDpcIik7Yi5xdWVyeVNlbGVjdG9yQWxsJiYocShiLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrYSksYykscShiLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrXG5hK1wiXFxcXDpcIiksYykscShiLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbXCIrYStcIl1cIiksYykpfSk7cShkLGZ1bmN0aW9uKGEpe2lmKCFlKXt2YXIgYj1oLmV4ZWMoXCIgXCIrYS5jbGFzc05hbWUrXCIgXCIpO2I/KGU9YSxnPShiWzJdfHxcIlwiKS5yZXBsYWNlKC9cXHMrL2csXCIsXCIpKTpxKGEuYXR0cmlidXRlcyxmdW5jdGlvbihiKXshZSYmZltiLm5hbWVdJiYoZT1hLGc9Yi52YWx1ZSl9KX19KTtlJiZhKGUsZz9bZ106W10pfWZ1bmN0aW9uICRiKGIsYSl7dmFyIGM9ZnVuY3Rpb24oKXtiPXkoYik7aWYoYi5pbmplY3RvcigpKXt2YXIgYz1iWzBdPT09VT9cImRvY3VtZW50XCI6aGEoYik7dGhyb3cgUGEoXCJidHN0cnBkXCIsYyk7fWE9YXx8W107YS51bnNoaWZ0KFtcIiRwcm92aWRlXCIsZnVuY3Rpb24oYSl7YS52YWx1ZShcIiRyb290RWxlbWVudFwiLGIpfV0pO2EudW5zaGlmdChcIm5nXCIpO2M9YWMoYSk7Yy5pbnZva2UoW1wiJHJvb3RTY29wZVwiLFwiJHJvb3RFbGVtZW50XCIsXCIkY29tcGlsZVwiLFwiJGluamVjdG9yXCIsXCIkYW5pbWF0ZVwiLFxuZnVuY3Rpb24oYSxiLGMsZCxlKXthLiRhcHBseShmdW5jdGlvbigpe2IuZGF0YShcIiRpbmplY3RvclwiLGQpO2MoYikoYSl9KX1dKTtyZXR1cm4gY30sZD0vXk5HX0RFRkVSX0JPT1RTVFJBUCEvO2lmKE8mJiFkLnRlc3QoTy5uYW1lKSlyZXR1cm4gYygpO08ubmFtZT1PLm5hbWUucmVwbGFjZShkLFwiXCIpO0VhLnJlc3VtZUJvb3RzdHJhcD1mdW5jdGlvbihiKXtxKGIsZnVuY3Rpb24oYil7YS5wdXNoKGIpfSk7YygpfX1mdW5jdGlvbiBmYihiLGEpe2E9YXx8XCJfXCI7cmV0dXJuIGIucmVwbGFjZShYYyxmdW5jdGlvbihiLGQpe3JldHVybihkP2E6XCJcIikrYi50b0xvd2VyQ2FzZSgpfSl9ZnVuY3Rpb24geGIoYixhLGMpe2lmKCFiKXRocm93IFBhKFwiYXJlcVwiLGF8fFwiP1wiLGN8fFwicmVxdWlyZWRcIik7cmV0dXJuIGJ9ZnVuY3Rpb24gUmEoYixhLGMpe2MmJk0oYikmJihiPWJbYi5sZW5ndGgtMV0pO3hiKFAoYiksYSxcIm5vdCBhIGZ1bmN0aW9uLCBnb3QgXCIrKGImJlwib2JqZWN0XCI9PXR5cGVvZiBiP1xuYi5jb25zdHJ1Y3Rvci5uYW1lfHxcIk9iamVjdFwiOnR5cGVvZiBiKSk7cmV0dXJuIGJ9ZnVuY3Rpb24gQWEoYixhKXtpZihcImhhc093blByb3BlcnR5XCI9PT1iKXRocm93IFBhKFwiYmFkbmFtZVwiLGEpO31mdW5jdGlvbiBiYyhiLGEsYyl7aWYoIWEpcmV0dXJuIGI7YT1hLnNwbGl0KFwiLlwiKTtmb3IodmFyIGQsZT1iLGc9YS5sZW5ndGgsZj0wO2Y8ZztmKyspZD1hW2ZdLGImJihiPShlPWIpW2RdKTtyZXR1cm4hYyYmUChiKT9lYihlLGIpOmJ9ZnVuY3Rpb24geWIoYil7dmFyIGE9YlswXTtiPWJbYi5sZW5ndGgtMV07aWYoYT09PWIpcmV0dXJuIHkoYSk7dmFyIGM9W2FdO2Rve2E9YS5uZXh0U2libGluZztpZighYSlicmVhaztjLnB1c2goYSl9d2hpbGUoYSE9PWIpO3JldHVybiB5KGMpfWZ1bmN0aW9uIFljKGIpe3ZhciBhPXQoXCIkaW5qZWN0b3JcIiksYz10KFwibmdcIik7Yj1iLmFuZ3VsYXJ8fChiLmFuZ3VsYXI9e30pO2IuJCRtaW5FcnI9Yi4kJG1pbkVycnx8dDtyZXR1cm4gYi5tb2R1bGV8fFxuKGIubW9kdWxlPWZ1bmN0aW9uKCl7dmFyIGI9e307cmV0dXJuIGZ1bmN0aW9uKGUsZyxmKXtpZihcImhhc093blByb3BlcnR5XCI9PT1lKXRocm93IGMoXCJiYWRuYW1lXCIsXCJtb2R1bGVcIik7ZyYmYi5oYXNPd25Qcm9wZXJ0eShlKSYmKGJbZV09bnVsbCk7cmV0dXJuIGJbZV18fChiW2VdPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYihhLGQsZSl7cmV0dXJuIGZ1bmN0aW9uKCl7Y1tlfHxcInB1c2hcIl0oW2EsZCxhcmd1bWVudHNdKTtyZXR1cm4gbn19aWYoIWcpdGhyb3cgYShcIm5vbW9kXCIsZSk7dmFyIGM9W10sZD1bXSxtPWIoXCIkaW5qZWN0b3JcIixcImludm9rZVwiKSxuPXtfaW52b2tlUXVldWU6YyxfcnVuQmxvY2tzOmQscmVxdWlyZXM6ZyxuYW1lOmUscHJvdmlkZXI6YihcIiRwcm92aWRlXCIsXCJwcm92aWRlclwiKSxmYWN0b3J5OmIoXCIkcHJvdmlkZVwiLFwiZmFjdG9yeVwiKSxzZXJ2aWNlOmIoXCIkcHJvdmlkZVwiLFwic2VydmljZVwiKSx2YWx1ZTpiKFwiJHByb3ZpZGVcIixcInZhbHVlXCIpLGNvbnN0YW50OmIoXCIkcHJvdmlkZVwiLFxuXCJjb25zdGFudFwiLFwidW5zaGlmdFwiKSxhbmltYXRpb246YihcIiRhbmltYXRlUHJvdmlkZXJcIixcInJlZ2lzdGVyXCIpLGZpbHRlcjpiKFwiJGZpbHRlclByb3ZpZGVyXCIsXCJyZWdpc3RlclwiKSxjb250cm9sbGVyOmIoXCIkY29udHJvbGxlclByb3ZpZGVyXCIsXCJyZWdpc3RlclwiKSxkaXJlY3RpdmU6YihcIiRjb21waWxlUHJvdmlkZXJcIixcImRpcmVjdGl2ZVwiKSxjb25maWc6bSxydW46ZnVuY3Rpb24oYSl7ZC5wdXNoKGEpO3JldHVybiB0aGlzfX07ZiYmbShmKTtyZXR1cm4gbn0oKSl9fSgpKX1mdW5jdGlvbiBaYyhiKXtEKGIse2Jvb3RzdHJhcDokYixjb3B5OmJhLGV4dGVuZDpELGVxdWFsczp4YSxlbGVtZW50OnksZm9yRWFjaDpxLGluamVjdG9yOmFjLG5vb3A6QyxiaW5kOmViLHRvSnNvbjpxYSxmcm9tSnNvbjpXYixpZGVudGl0eTpEYSxpc1VuZGVmaW5lZDpFLGlzRGVmaW5lZDpCLGlzU3RyaW5nOncsaXNGdW5jdGlvbjpQLGlzT2JqZWN0OlgsaXNOdW1iZXI6dmIsaXNFbGVtZW50OlRjLGlzQXJyYXk6TSxcbnZlcnNpb246JGMsaXNEYXRlOk5hLGxvd2VyY2FzZTpLLHVwcGVyY2FzZTpGYSxjYWxsYmFja3M6e2NvdW50ZXI6MH0sJCRtaW5FcnI6dCwkJGNzcDpWYn0pO1NhPVljKE8pO3RyeXtTYShcIm5nTG9jYWxlXCIpfWNhdGNoKGEpe1NhKFwibmdMb2NhbGVcIixbXSkucHJvdmlkZXIoXCIkbG9jYWxlXCIsYWQpfVNhKFwibmdcIixbXCJuZ0xvY2FsZVwiXSxbXCIkcHJvdmlkZVwiLGZ1bmN0aW9uKGEpe2EucHJvdmlkZXIoeyQkc2FuaXRpemVVcmk6YmR9KTthLnByb3ZpZGVyKFwiJGNvbXBpbGVcIixjYykuZGlyZWN0aXZlKHthOmNkLGlucHV0OmRjLHRleHRhcmVhOmRjLGZvcm06ZGQsc2NyaXB0OmVkLHNlbGVjdDpmZCxzdHlsZTpnZCxvcHRpb246aGQsbmdCaW5kOmlkLG5nQmluZEh0bWw6amQsbmdCaW5kVGVtcGxhdGU6a2QsbmdDbGFzczpsZCxuZ0NsYXNzRXZlbjptZCxuZ0NsYXNzT2RkOm5kLG5nQ2xvYWs6b2QsbmdDb250cm9sbGVyOnBkLG5nRm9ybTpxZCxuZ0hpZGU6cmQsbmdJZjpzZCxuZ0luY2x1ZGU6dGQsXG5uZ0luaXQ6dWQsbmdOb25CaW5kYWJsZTp2ZCxuZ1BsdXJhbGl6ZTp3ZCxuZ1JlcGVhdDp4ZCxuZ1Nob3c6eWQsbmdTdHlsZTp6ZCxuZ1N3aXRjaDpBZCxuZ1N3aXRjaFdoZW46QmQsbmdTd2l0Y2hEZWZhdWx0OkNkLG5nT3B0aW9uczpEZCxuZ1RyYW5zY2x1ZGU6RWQsbmdNb2RlbDpGZCxuZ0xpc3Q6R2QsbmdDaGFuZ2U6SGQscmVxdWlyZWQ6ZWMsbmdSZXF1aXJlZDplYyxuZ1ZhbHVlOklkfSkuZGlyZWN0aXZlKHtuZ0luY2x1ZGU6SmR9KS5kaXJlY3RpdmUoemIpLmRpcmVjdGl2ZShmYyk7YS5wcm92aWRlcih7JGFuY2hvclNjcm9sbDpLZCwkYW5pbWF0ZTpMZCwkYnJvd3NlcjpNZCwkY2FjaGVGYWN0b3J5Ok5kLCRjb250cm9sbGVyOk9kLCRkb2N1bWVudDpQZCwkZXhjZXB0aW9uSGFuZGxlcjpRZCwkZmlsdGVyOmdjLCRpbnRlcnBvbGF0ZTpSZCwkaW50ZXJ2YWw6U2QsJGh0dHA6VGQsJGh0dHBCYWNrZW5kOlVkLCRsb2NhdGlvbjpWZCwkbG9nOldkLCRwYXJzZTpYZCwkcm9vdFNjb3BlOllkLFxuJHE6WmQsJHNjZTokZCwkc2NlRGVsZWdhdGU6YWUsJHNuaWZmZXI6YmUsJHRlbXBsYXRlQ2FjaGU6Y2UsJHRpbWVvdXQ6ZGUsJHdpbmRvdzplZSwkJHJBRjpmZSwkJGFzeW5jQ2FsbGJhY2s6Z2V9KX1dKX1mdW5jdGlvbiBUYShiKXtyZXR1cm4gYi5yZXBsYWNlKGhlLGZ1bmN0aW9uKGEsYixkLGUpe3JldHVybiBlP2QudG9VcHBlckNhc2UoKTpkfSkucmVwbGFjZShpZSxcIk1veiQxXCIpfWZ1bmN0aW9uIEFiKGIsYSxjLGQpe2Z1bmN0aW9uIGUoYil7dmFyIGU9YyYmYj9bdGhpcy5maWx0ZXIoYildOlt0aGlzXSxsPWEsayxtLG4scCxyLHo7aWYoIWR8fG51bGwhPWIpZm9yKDtlLmxlbmd0aDspZm9yKGs9ZS5zaGlmdCgpLG09MCxuPWsubGVuZ3RoO208bjttKyspZm9yKHA9eShrW21dKSxsP3AudHJpZ2dlckhhbmRsZXIoXCIkZGVzdHJveVwiKTpsPSFsLHI9MCxwPSh6PXAuY2hpbGRyZW4oKSkubGVuZ3RoO3I8cDtyKyspZS5wdXNoKEdhKHpbcl0pKTtyZXR1cm4gZy5hcHBseSh0aGlzLGFyZ3VtZW50cyl9XG52YXIgZz1HYS5mbltiXSxnPWcuJG9yaWdpbmFsfHxnO2UuJG9yaWdpbmFsPWc7R2EuZm5bYl09ZX1mdW5jdGlvbiBOKGIpe2lmKGIgaW5zdGFuY2VvZiBOKXJldHVybiBiO3coYikmJihiPWNhKGIpKTtpZighKHRoaXMgaW5zdGFuY2VvZiBOKSl7aWYodyhiKSYmXCI8XCIhPWIuY2hhckF0KDApKXRocm93IEJiKFwibm9zZWxcIik7cmV0dXJuIG5ldyBOKGIpfWlmKHcoYikpe3ZhciBhPWI7Yj1VO3ZhciBjO2lmKGM9amUuZXhlYyhhKSliPVtiLmNyZWF0ZUVsZW1lbnQoY1sxXSldO2Vsc2V7dmFyIGQ9YixlO2I9ZC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7Yz1bXTtpZihDYi50ZXN0KGEpKXtkPWIuYXBwZW5kQ2hpbGQoZC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtlPShrZS5leGVjKGEpfHxbXCJcIixcIlwiXSlbMV0udG9Mb3dlckNhc2UoKTtlPWVhW2VdfHxlYS5fZGVmYXVsdDtkLmlubmVySFRNTD1cIjxkaXY+JiMxNjA7PC9kaXY+XCIrZVsxXSthLnJlcGxhY2UobGUsXCI8JDE+PC8kMj5cIikrZVsyXTtcbmQucmVtb3ZlQ2hpbGQoZC5maXJzdENoaWxkKTtmb3IoYT1lWzBdO2EtLTspZD1kLmxhc3RDaGlsZDthPTA7Zm9yKGU9ZC5jaGlsZE5vZGVzLmxlbmd0aDthPGU7KythKWMucHVzaChkLmNoaWxkTm9kZXNbYV0pO2Q9Yi5maXJzdENoaWxkO2QudGV4dENvbnRlbnQ9XCJcIn1lbHNlIGMucHVzaChkLmNyZWF0ZVRleHROb2RlKGEpKTtiLnRleHRDb250ZW50PVwiXCI7Yi5pbm5lckhUTUw9XCJcIjtiPWN9RGIodGhpcyxiKTt5KFUuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpKS5hcHBlbmQodGhpcyl9ZWxzZSBEYih0aGlzLGIpfWZ1bmN0aW9uIEViKGIpe3JldHVybiBiLmNsb25lTm9kZSghMCl9ZnVuY3Rpb24gSGEoYil7aGMoYik7dmFyIGE9MDtmb3IoYj1iLmNoaWxkTm9kZXN8fFtdO2E8Yi5sZW5ndGg7YSsrKUhhKGJbYV0pfWZ1bmN0aW9uIGljKGIsYSxjLGQpe2lmKEIoZCkpdGhyb3cgQmIoXCJvZmZhcmdzXCIpO3ZhciBlPWxhKGIsXCJldmVudHNcIik7bGEoYixcImhhbmRsZVwiKSYmKEUoYSk/cShlLFxuZnVuY3Rpb24oYSxjKXtGYihiLGMsYSk7ZGVsZXRlIGVbY119KTpxKGEuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEpe0UoYyk/KEZiKGIsYSxlW2FdKSxkZWxldGUgZVthXSk6T2EoZVthXXx8W10sYyl9KSl9ZnVuY3Rpb24gaGMoYixhKXt2YXIgYz1iW2diXSxkPVVhW2NdO2QmJihhP2RlbGV0ZSBVYVtjXS5kYXRhW2FdOihkLmhhbmRsZSYmKGQuZXZlbnRzLiRkZXN0cm95JiZkLmhhbmRsZSh7fSxcIiRkZXN0cm95XCIpLGljKGIpKSxkZWxldGUgVWFbY10sYltnYl09cykpfWZ1bmN0aW9uIGxhKGIsYSxjKXt2YXIgZD1iW2diXSxkPVVhW2R8fC0xXTtpZihCKGMpKWR8fChiW2diXT1kPSsrbWUsZD1VYVtkXT17fSksZFthXT1jO2Vsc2UgcmV0dXJuIGQmJmRbYV19ZnVuY3Rpb24gamMoYixhLGMpe3ZhciBkPWxhKGIsXCJkYXRhXCIpLGU9QihjKSxnPSFlJiZCKGEpLGY9ZyYmIVgoYSk7ZHx8Znx8bGEoYixcImRhdGFcIixkPXt9KTtpZihlKWRbYV09YztlbHNlIGlmKGcpe2lmKGYpcmV0dXJuIGQmJmRbYV07XG5EKGQsYSl9ZWxzZSByZXR1cm4gZH1mdW5jdGlvbiBHYihiLGEpe3JldHVybiBiLmdldEF0dHJpYnV0ZT8tMTwoXCIgXCIrKGIuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCIpK1wiIFwiKS5yZXBsYWNlKC9bXFxuXFx0XS9nLFwiIFwiKS5pbmRleE9mKFwiIFwiK2ErXCIgXCIpOiExfWZ1bmN0aW9uIGhiKGIsYSl7YSYmYi5zZXRBdHRyaWJ1dGUmJnEoYS5zcGxpdChcIiBcIiksZnVuY3Rpb24oYSl7Yi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGNhKChcIiBcIisoYi5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKXx8XCJcIikrXCIgXCIpLnJlcGxhY2UoL1tcXG5cXHRdL2csXCIgXCIpLnJlcGxhY2UoXCIgXCIrY2EoYSkrXCIgXCIsXCIgXCIpKSl9KX1mdW5jdGlvbiBpYihiLGEpe2lmKGEmJmIuc2V0QXR0cmlidXRlKXt2YXIgYz0oXCIgXCIrKGIuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil8fFwiXCIpK1wiIFwiKS5yZXBsYWNlKC9bXFxuXFx0XS9nLFwiIFwiKTtxKGEuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGEpe2E9Y2EoYSk7LTE9PT1jLmluZGV4T2YoXCIgXCIrYStcIiBcIikmJlxuKGMrPWErXCIgXCIpfSk7Yi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGNhKGMpKX19ZnVuY3Rpb24gRGIoYixhKXtpZihhKXthPWEubm9kZU5hbWV8fCFCKGEubGVuZ3RoKXx8Q2EoYSk/W2FdOmE7Zm9yKHZhciBjPTA7YzxhLmxlbmd0aDtjKyspYi5wdXNoKGFbY10pfX1mdW5jdGlvbiBrYyhiLGEpe3JldHVybiBqYihiLFwiJFwiKyhhfHxcIm5nQ29udHJvbGxlclwiKStcIkNvbnRyb2xsZXJcIil9ZnVuY3Rpb24gamIoYixhLGMpe2I9eShiKTs5PT1iWzBdLm5vZGVUeXBlJiYoYj1iLmZpbmQoXCJodG1sXCIpKTtmb3IoYT1NKGEpP2E6W2FdO2IubGVuZ3RoOyl7Zm9yKHZhciBkPWJbMF0sZT0wLGc9YS5sZW5ndGg7ZTxnO2UrKylpZigoYz1iLmRhdGEoYVtlXSkpIT09cylyZXR1cm4gYztiPXkoZC5wYXJlbnROb2RlfHwxMT09PWQubm9kZVR5cGUmJmQuaG9zdCl9fWZ1bmN0aW9uIGxjKGIpe2Zvcih2YXIgYT0wLGM9Yi5jaGlsZE5vZGVzO2E8Yy5sZW5ndGg7YSsrKUhhKGNbYV0pO2Zvcig7Yi5maXJzdENoaWxkOyliLnJlbW92ZUNoaWxkKGIuZmlyc3RDaGlsZCl9XG5mdW5jdGlvbiBtYyhiLGEpe3ZhciBjPWtiW2EudG9Mb3dlckNhc2UoKV07cmV0dXJuIGMmJm5jW2Iubm9kZU5hbWVdJiZjfWZ1bmN0aW9uIG5lKGIsYSl7dmFyIGM9ZnVuY3Rpb24oYyxlKXtjLnByZXZlbnREZWZhdWx0fHwoYy5wcmV2ZW50RGVmYXVsdD1mdW5jdGlvbigpe2MucmV0dXJuVmFsdWU9ITF9KTtjLnN0b3BQcm9wYWdhdGlvbnx8KGMuc3RvcFByb3BhZ2F0aW9uPWZ1bmN0aW9uKCl7Yy5jYW5jZWxCdWJibGU9ITB9KTtjLnRhcmdldHx8KGMudGFyZ2V0PWMuc3JjRWxlbWVudHx8VSk7aWYoRShjLmRlZmF1bHRQcmV2ZW50ZWQpKXt2YXIgZz1jLnByZXZlbnREZWZhdWx0O2MucHJldmVudERlZmF1bHQ9ZnVuY3Rpb24oKXtjLmRlZmF1bHRQcmV2ZW50ZWQ9ITA7Zy5jYWxsKGMpfTtjLmRlZmF1bHRQcmV2ZW50ZWQ9ITF9Yy5pc0RlZmF1bHRQcmV2ZW50ZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gYy5kZWZhdWx0UHJldmVudGVkfHwhMT09PWMucmV0dXJuVmFsdWV9O3ZhciBmPVViKGFbZXx8XG5jLnR5cGVdfHxbXSk7cShmLGZ1bmN0aW9uKGEpe2EuY2FsbChiLGMpfSk7OD49Uz8oYy5wcmV2ZW50RGVmYXVsdD1udWxsLGMuc3RvcFByb3BhZ2F0aW9uPW51bGwsYy5pc0RlZmF1bHRQcmV2ZW50ZWQ9bnVsbCk6KGRlbGV0ZSBjLnByZXZlbnREZWZhdWx0LGRlbGV0ZSBjLnN0b3BQcm9wYWdhdGlvbixkZWxldGUgYy5pc0RlZmF1bHRQcmV2ZW50ZWQpfTtjLmVsZW09YjtyZXR1cm4gY31mdW5jdGlvbiBJYShiKXt2YXIgYT10eXBlb2YgYixjO1wib2JqZWN0XCI9PWEmJm51bGwhPT1iP1wiZnVuY3Rpb25cIj09dHlwZW9mKGM9Yi4kJGhhc2hLZXkpP2M9Yi4kJGhhc2hLZXkoKTpjPT09cyYmKGM9Yi4kJGhhc2hLZXk9YmIoKSk6Yz1iO3JldHVybiBhK1wiOlwiK2N9ZnVuY3Rpb24gVmEoYil7cShiLHRoaXMucHV0LHRoaXMpfWZ1bmN0aW9uIG9jKGIpe3ZhciBhLGM7XCJmdW5jdGlvblwiPT10eXBlb2YgYj8oYT1iLiRpbmplY3QpfHwoYT1bXSxiLmxlbmd0aCYmKGM9Yi50b1N0cmluZygpLnJlcGxhY2Uob2UsXG5cIlwiKSxjPWMubWF0Y2gocGUpLHEoY1sxXS5zcGxpdChxZSksZnVuY3Rpb24oYil7Yi5yZXBsYWNlKHJlLGZ1bmN0aW9uKGIsYyxkKXthLnB1c2goZCl9KX0pKSxiLiRpbmplY3Q9YSk6TShiKT8oYz1iLmxlbmd0aC0xLFJhKGJbY10sXCJmblwiKSxhPWIuc2xpY2UoMCxjKSk6UmEoYixcImZuXCIsITApO3JldHVybiBhfWZ1bmN0aW9uIGFjKGIpe2Z1bmN0aW9uIGEoYSl7cmV0dXJuIGZ1bmN0aW9uKGIsYyl7aWYoWChiKSlxKGIsUmIoYSkpO2Vsc2UgcmV0dXJuIGEoYixjKX19ZnVuY3Rpb24gYyhhLGIpe0FhKGEsXCJzZXJ2aWNlXCIpO2lmKFAoYil8fE0oYikpYj1uLmluc3RhbnRpYXRlKGIpO2lmKCFiLiRnZXQpdGhyb3cgV2EoXCJwZ2V0XCIsYSk7cmV0dXJuIG1bYStoXT1ifWZ1bmN0aW9uIGQoYSxiKXtyZXR1cm4gYyhhLHskZ2V0OmJ9KX1mdW5jdGlvbiBlKGEpe3ZhciBiPVtdLGMsZCxnLGg7cShhLGZ1bmN0aW9uKGEpe2lmKCFrLmdldChhKSl7ay5wdXQoYSwhMCk7dHJ5e2lmKHcoYSkpZm9yKGM9XG5TYShhKSxiPWIuY29uY2F0KGUoYy5yZXF1aXJlcykpLmNvbmNhdChjLl9ydW5CbG9ja3MpLGQ9Yy5faW52b2tlUXVldWUsZz0wLGg9ZC5sZW5ndGg7ZzxoO2crKyl7dmFyIGY9ZFtnXSxsPW4uZ2V0KGZbMF0pO2xbZlsxXV0uYXBwbHkobCxmWzJdKX1lbHNlIFAoYSk/Yi5wdXNoKG4uaW52b2tlKGEpKTpNKGEpP2IucHVzaChuLmludm9rZShhKSk6UmEoYSxcIm1vZHVsZVwiKX1jYXRjaChtKXt0aHJvdyBNKGEpJiYoYT1hW2EubGVuZ3RoLTFdKSxtLm1lc3NhZ2UmJihtLnN0YWNrJiYtMT09bS5zdGFjay5pbmRleE9mKG0ubWVzc2FnZSkpJiYobT1tLm1lc3NhZ2UrXCJcXG5cIittLnN0YWNrKSxXYShcIm1vZHVsZXJyXCIsYSxtLnN0YWNrfHxtLm1lc3NhZ2V8fG0pO319fSk7cmV0dXJuIGJ9ZnVuY3Rpb24gZyhhLGIpe2Z1bmN0aW9uIGMoZCl7aWYoYS5oYXNPd25Qcm9wZXJ0eShkKSl7aWYoYVtkXT09PWYpdGhyb3cgV2EoXCJjZGVwXCIsbC5qb2luKFwiIDwtIFwiKSk7cmV0dXJuIGFbZF19dHJ5e3JldHVybiBsLnVuc2hpZnQoZCksXG5hW2RdPWYsYVtkXT1iKGQpfWNhdGNoKGUpe3Rocm93IGFbZF09PT1mJiZkZWxldGUgYVtkXSxlO31maW5hbGx5e2wuc2hpZnQoKX19ZnVuY3Rpb24gZChhLGIsZSl7dmFyIGc9W10saD1vYyhhKSxmLGwsaztsPTA7Zm9yKGY9aC5sZW5ndGg7bDxmO2wrKyl7az1oW2xdO2lmKFwic3RyaW5nXCIhPT10eXBlb2Ygayl0aHJvdyBXYShcIml0a25cIixrKTtnLnB1c2goZSYmZS5oYXNPd25Qcm9wZXJ0eShrKT9lW2tdOmMoaykpfWEuJGluamVjdHx8KGE9YVtmXSk7cmV0dXJuIGEuYXBwbHkoYixnKX1yZXR1cm57aW52b2tlOmQsaW5zdGFudGlhdGU6ZnVuY3Rpb24oYSxiKXt2YXIgYz1mdW5jdGlvbigpe30sZTtjLnByb3RvdHlwZT0oTShhKT9hW2EubGVuZ3RoLTFdOmEpLnByb3RvdHlwZTtjPW5ldyBjO2U9ZChhLGMsYik7cmV0dXJuIFgoZSl8fFAoZSk/ZTpjfSxnZXQ6Yyxhbm5vdGF0ZTpvYyxoYXM6ZnVuY3Rpb24oYil7cmV0dXJuIG0uaGFzT3duUHJvcGVydHkoYitoKXx8YS5oYXNPd25Qcm9wZXJ0eShiKX19fVxudmFyIGY9e30saD1cIlByb3ZpZGVyXCIsbD1bXSxrPW5ldyBWYSxtPXskcHJvdmlkZTp7cHJvdmlkZXI6YShjKSxmYWN0b3J5OmEoZCksc2VydmljZTphKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGQoYSxbXCIkaW5qZWN0b3JcIixmdW5jdGlvbihhKXtyZXR1cm4gYS5pbnN0YW50aWF0ZShiKX1dKX0pLHZhbHVlOmEoZnVuY3Rpb24oYSxiKXtyZXR1cm4gZChhLGFhKGIpKX0pLGNvbnN0YW50OmEoZnVuY3Rpb24oYSxiKXtBYShhLFwiY29uc3RhbnRcIik7bVthXT1iO3BbYV09Yn0pLGRlY29yYXRvcjpmdW5jdGlvbihhLGIpe3ZhciBjPW4uZ2V0KGEraCksZD1jLiRnZXQ7Yy4kZ2V0PWZ1bmN0aW9uKCl7dmFyIGE9ci5pbnZva2UoZCxjKTtyZXR1cm4gci5pbnZva2UoYixudWxsLHskZGVsZWdhdGU6YX0pfX19fSxuPW0uJGluamVjdG9yPWcobSxmdW5jdGlvbigpe3Rocm93IFdhKFwidW5wclwiLGwuam9pbihcIiA8LSBcIikpO30pLHA9e30scj1wLiRpbmplY3Rvcj1nKHAsZnVuY3Rpb24oYSl7YT1uLmdldChhK1xuaCk7cmV0dXJuIHIuaW52b2tlKGEuJGdldCxhKX0pO3EoZShiKSxmdW5jdGlvbihhKXtyLmludm9rZShhfHxDKX0pO3JldHVybiByfWZ1bmN0aW9uIEtkKCl7dmFyIGI9ITA7dGhpcy5kaXNhYmxlQXV0b1Njcm9sbGluZz1mdW5jdGlvbigpe2I9ITF9O3RoaXMuJGdldD1bXCIkd2luZG93XCIsXCIkbG9jYXRpb25cIixcIiRyb290U2NvcGVcIixmdW5jdGlvbihhLGMsZCl7ZnVuY3Rpb24gZShhKXt2YXIgYj1udWxsO3EoYSxmdW5jdGlvbihhKXtifHxcImFcIiE9PUsoYS5ub2RlTmFtZSl8fChiPWEpfSk7cmV0dXJuIGJ9ZnVuY3Rpb24gZygpe3ZhciBiPWMuaGFzaCgpLGQ7Yj8oZD1mLmdldEVsZW1lbnRCeUlkKGIpKT9kLnNjcm9sbEludG9WaWV3KCk6KGQ9ZShmLmdldEVsZW1lbnRzQnlOYW1lKGIpKSk/ZC5zY3JvbGxJbnRvVmlldygpOlwidG9wXCI9PT1iJiZhLnNjcm9sbFRvKDAsMCk6YS5zY3JvbGxUbygwLDApfXZhciBmPWEuZG9jdW1lbnQ7YiYmZC4kd2F0Y2goZnVuY3Rpb24oKXtyZXR1cm4gYy5oYXNoKCl9LFxuZnVuY3Rpb24oKXtkLiRldmFsQXN5bmMoZyl9KTtyZXR1cm4gZ31dfWZ1bmN0aW9uIGdlKCl7dGhpcy4kZ2V0PVtcIiQkckFGXCIsXCIkdGltZW91dFwiLGZ1bmN0aW9uKGIsYSl7cmV0dXJuIGIuc3VwcG9ydGVkP2Z1bmN0aW9uKGEpe3JldHVybiBiKGEpfTpmdW5jdGlvbihiKXtyZXR1cm4gYShiLDAsITEpfX1dfWZ1bmN0aW9uIHNlKGIsYSxjLGQpe2Z1bmN0aW9uIGUoYSl7dHJ5e2EuYXBwbHkobnVsbCx5YS5jYWxsKGFyZ3VtZW50cywxKSl9ZmluYWxseXtpZih6LS0sMD09PXopZm9yKDt1Lmxlbmd0aDspdHJ5e3UucG9wKCkoKX1jYXRjaChiKXtjLmVycm9yKGIpfX19ZnVuY3Rpb24gZyhhLGIpeyhmdW5jdGlvbiBUKCl7cShGLGZ1bmN0aW9uKGEpe2EoKX0pO3Y9YihULGEpfSkoKX1mdW5jdGlvbiBmKCl7eD1udWxsO0ohPWgudXJsKCkmJihKPWgudXJsKCkscShtYSxmdW5jdGlvbihhKXthKGgudXJsKCkpfSkpfXZhciBoPXRoaXMsbD1hWzBdLGs9Yi5sb2NhdGlvbixtPWIuaGlzdG9yeSxcbm49Yi5zZXRUaW1lb3V0LHA9Yi5jbGVhclRpbWVvdXQscj17fTtoLmlzTW9jaz0hMTt2YXIgej0wLHU9W107aC4kJGNvbXBsZXRlT3V0c3RhbmRpbmdSZXF1ZXN0PWU7aC4kJGluY091dHN0YW5kaW5nUmVxdWVzdENvdW50PWZ1bmN0aW9uKCl7eisrfTtoLm5vdGlmeVdoZW5Ob091dHN0YW5kaW5nUmVxdWVzdHM9ZnVuY3Rpb24oYSl7cShGLGZ1bmN0aW9uKGEpe2EoKX0pOzA9PT16P2EoKTp1LnB1c2goYSl9O3ZhciBGPVtdLHY7aC5hZGRQb2xsRm49ZnVuY3Rpb24oYSl7RSh2KSYmZygxMDAsbik7Ri5wdXNoKGEpO3JldHVybiBhfTt2YXIgSj1rLmhyZWYsQT1hLmZpbmQoXCJiYXNlXCIpLHg9bnVsbDtoLnVybD1mdW5jdGlvbihhLGMpe2shPT1iLmxvY2F0aW9uJiYoaz1iLmxvY2F0aW9uKTttIT09Yi5oaXN0b3J5JiYobT1iLmhpc3RvcnkpO2lmKGEpe2lmKEohPWEpcmV0dXJuIEo9YSxkLmhpc3Rvcnk/Yz9tLnJlcGxhY2VTdGF0ZShudWxsLFwiXCIsYSk6KG0ucHVzaFN0YXRlKG51bGwsXCJcIixcbmEpLEEuYXR0cihcImhyZWZcIixBLmF0dHIoXCJocmVmXCIpKSk6KHg9YSxjP2sucmVwbGFjZShhKTprLmhyZWY9YSksaH1lbHNlIHJldHVybiB4fHxrLmhyZWYucmVwbGFjZSgvJTI3L2csXCInXCIpfTt2YXIgbWE9W10sTD0hMTtoLm9uVXJsQ2hhbmdlPWZ1bmN0aW9uKGEpe2lmKCFMKXtpZihkLmhpc3RvcnkpeShiKS5vbihcInBvcHN0YXRlXCIsZik7aWYoZC5oYXNoY2hhbmdlKXkoYikub24oXCJoYXNoY2hhbmdlXCIsZik7ZWxzZSBoLmFkZFBvbGxGbihmKTtMPSEwfW1hLnB1c2goYSk7cmV0dXJuIGF9O2guYmFzZUhyZWY9ZnVuY3Rpb24oKXt2YXIgYT1BLmF0dHIoXCJocmVmXCIpO3JldHVybiBhP2EucmVwbGFjZSgvXihodHRwcz9cXDopP1xcL1xcL1teXFwvXSovLFwiXCIpOlwiXCJ9O3ZhciBRPXt9LGRhPVwiXCIsSD1oLmJhc2VIcmVmKCk7aC5jb29raWVzPWZ1bmN0aW9uKGEsYil7dmFyIGQsZSxnLGg7aWYoYSliPT09cz9sLmNvb2tpZT1lc2NhcGUoYSkrXCI9O3BhdGg9XCIrSCtcIjtleHBpcmVzPVRodSwgMDEgSmFuIDE5NzAgMDA6MDA6MDAgR01UXCI6XG53KGIpJiYoZD0obC5jb29raWU9ZXNjYXBlKGEpK1wiPVwiK2VzY2FwZShiKStcIjtwYXRoPVwiK0gpLmxlbmd0aCsxLDQwOTY8ZCYmYy53YXJuKFwiQ29va2llICdcIithK1wiJyBwb3NzaWJseSBub3Qgc2V0IG9yIG92ZXJmbG93ZWQgYmVjYXVzZSBpdCB3YXMgdG9vIGxhcmdlIChcIitkK1wiID4gNDA5NiBieXRlcykhXCIpKTtlbHNle2lmKGwuY29va2llIT09ZGEpZm9yKGRhPWwuY29va2llLGQ9ZGEuc3BsaXQoXCI7IFwiKSxRPXt9LGc9MDtnPGQubGVuZ3RoO2crKyllPWRbZ10saD1lLmluZGV4T2YoXCI9XCIpLDA8aCYmKGE9dW5lc2NhcGUoZS5zdWJzdHJpbmcoMCxoKSksUVthXT09PXMmJihRW2FdPXVuZXNjYXBlKGUuc3Vic3RyaW5nKGgrMSkpKSk7cmV0dXJuIFF9fTtoLmRlZmVyPWZ1bmN0aW9uKGEsYil7dmFyIGM7eisrO2M9bihmdW5jdGlvbigpe2RlbGV0ZSByW2NdO2UoYSl9LGJ8fDApO3JbY109ITA7cmV0dXJuIGN9O2guZGVmZXIuY2FuY2VsPWZ1bmN0aW9uKGEpe3JldHVybiByW2FdPyhkZWxldGUgclthXSxcbnAoYSksZShDKSwhMCk6ITF9fWZ1bmN0aW9uIE1kKCl7dGhpcy4kZ2V0PVtcIiR3aW5kb3dcIixcIiRsb2dcIixcIiRzbmlmZmVyXCIsXCIkZG9jdW1lbnRcIixmdW5jdGlvbihiLGEsYyxkKXtyZXR1cm4gbmV3IHNlKGIsZCxhLGMpfV19ZnVuY3Rpb24gTmQoKXt0aGlzLiRnZXQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBiKGIsZCl7ZnVuY3Rpb24gZShhKXthIT1uJiYocD9wPT1hJiYocD1hLm4pOnA9YSxnKGEubixhLnApLGcoYSxuKSxuPWEsbi5uPW51bGwpfWZ1bmN0aW9uIGcoYSxiKXthIT1iJiYoYSYmKGEucD1iKSxiJiYoYi5uPWEpKX1pZihiIGluIGEpdGhyb3cgdChcIiRjYWNoZUZhY3RvcnlcIikoXCJpaWRcIixiKTt2YXIgZj0wLGg9RCh7fSxkLHtpZDpifSksbD17fSxrPWQmJmQuY2FwYWNpdHl8fE51bWJlci5NQVhfVkFMVUUsbT17fSxuPW51bGwscD1udWxsO3JldHVybiBhW2JdPXtwdXQ6ZnVuY3Rpb24oYSxiKXtpZihrPE51bWJlci5NQVhfVkFMVUUpe3ZhciBjPW1bYV18fChtW2FdPXtrZXk6YX0pO1xuZShjKX1pZighRShiKSlyZXR1cm4gYSBpbiBsfHxmKyssbFthXT1iLGY+ayYmdGhpcy5yZW1vdmUocC5rZXkpLGJ9LGdldDpmdW5jdGlvbihhKXtpZihrPE51bWJlci5NQVhfVkFMVUUpe3ZhciBiPW1bYV07aWYoIWIpcmV0dXJuO2UoYil9cmV0dXJuIGxbYV19LHJlbW92ZTpmdW5jdGlvbihhKXtpZihrPE51bWJlci5NQVhfVkFMVUUpe3ZhciBiPW1bYV07aWYoIWIpcmV0dXJuO2I9PW4mJihuPWIucCk7Yj09cCYmKHA9Yi5uKTtnKGIubixiLnApO2RlbGV0ZSBtW2FdfWRlbGV0ZSBsW2FdO2YtLX0scmVtb3ZlQWxsOmZ1bmN0aW9uKCl7bD17fTtmPTA7bT17fTtuPXA9bnVsbH0sZGVzdHJveTpmdW5jdGlvbigpe209aD1sPW51bGw7ZGVsZXRlIGFbYl19LGluZm86ZnVuY3Rpb24oKXtyZXR1cm4gRCh7fSxoLHtzaXplOmZ9KX19fXZhciBhPXt9O2IuaW5mbz1mdW5jdGlvbigpe3ZhciBiPXt9O3EoYSxmdW5jdGlvbihhLGUpe2JbZV09YS5pbmZvKCl9KTtyZXR1cm4gYn07Yi5nZXQ9ZnVuY3Rpb24oYil7cmV0dXJuIGFbYl19O1xucmV0dXJuIGJ9fWZ1bmN0aW9uIGNlKCl7dGhpcy4kZ2V0PVtcIiRjYWNoZUZhY3RvcnlcIixmdW5jdGlvbihiKXtyZXR1cm4gYihcInRlbXBsYXRlc1wiKX1dfWZ1bmN0aW9uIGNjKGIsYSl7dmFyIGM9e30sZD1cIkRpcmVjdGl2ZVwiLGU9L15cXHMqZGlyZWN0aXZlXFw6XFxzKihbXFxkXFx3XFwtX10rKVxccysoLiopJC8sZz0vKChbXFxkXFx3XFwtX10rKSg/OlxcOihbXjtdKykpPzs/KS8sZj0vXihvblthLXpdK3xmb3JtYWN0aW9uKSQvO3RoaXMuZGlyZWN0aXZlPWZ1bmN0aW9uIGwoYSxlKXtBYShhLFwiZGlyZWN0aXZlXCIpO3coYSk/KHhiKGUsXCJkaXJlY3RpdmVGYWN0b3J5XCIpLGMuaGFzT3duUHJvcGVydHkoYSl8fChjW2FdPVtdLGIuZmFjdG9yeShhK2QsW1wiJGluamVjdG9yXCIsXCIkZXhjZXB0aW9uSGFuZGxlclwiLGZ1bmN0aW9uKGIsZCl7dmFyIGU9W107cShjW2FdLGZ1bmN0aW9uKGMsZyl7dHJ5e3ZhciBmPWIuaW52b2tlKGMpO1AoZik/Zj17Y29tcGlsZTphYShmKX06IWYuY29tcGlsZSYmZi5saW5rJiYoZi5jb21waWxlPVxuYWEoZi5saW5rKSk7Zi5wcmlvcml0eT1mLnByaW9yaXR5fHwwO2YuaW5kZXg9ZztmLm5hbWU9Zi5uYW1lfHxhO2YucmVxdWlyZT1mLnJlcXVpcmV8fGYuY29udHJvbGxlciYmZi5uYW1lO2YucmVzdHJpY3Q9Zi5yZXN0cmljdHx8XCJBXCI7ZS5wdXNoKGYpfWNhdGNoKGwpe2QobCl9fSk7cmV0dXJuIGV9XSkpLGNbYV0ucHVzaChlKSk6cShhLFJiKGwpKTtyZXR1cm4gdGhpc307dGhpcy5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdD1mdW5jdGlvbihiKXtyZXR1cm4gQihiKT8oYS5hSHJlZlNhbml0aXphdGlvbldoaXRlbGlzdChiKSx0aGlzKTphLmFIcmVmU2FuaXRpemF0aW9uV2hpdGVsaXN0KCl9O3RoaXMuaW1nU3JjU2FuaXRpemF0aW9uV2hpdGVsaXN0PWZ1bmN0aW9uKGIpe3JldHVybiBCKGIpPyhhLmltZ1NyY1Nhbml0aXphdGlvbldoaXRlbGlzdChiKSx0aGlzKTphLmltZ1NyY1Nhbml0aXphdGlvbldoaXRlbGlzdCgpfTt0aGlzLiRnZXQ9W1wiJGluamVjdG9yXCIsXCIkaW50ZXJwb2xhdGVcIixcblwiJGV4Y2VwdGlvbkhhbmRsZXJcIixcIiRodHRwXCIsXCIkdGVtcGxhdGVDYWNoZVwiLFwiJHBhcnNlXCIsXCIkY29udHJvbGxlclwiLFwiJHJvb3RTY29wZVwiLFwiJGRvY3VtZW50XCIsXCIkc2NlXCIsXCIkYW5pbWF0ZVwiLFwiJCRzYW5pdGl6ZVVyaVwiLGZ1bmN0aW9uKGEsYixtLG4scCxyLHosdSxGLHYsSixBKXtmdW5jdGlvbiB4KGEsYixjLGQsZSl7YSBpbnN0YW5jZW9mIHl8fChhPXkoYSkpO3EoYSxmdW5jdGlvbihiLGMpezM9PWIubm9kZVR5cGUmJmIubm9kZVZhbHVlLm1hdGNoKC9cXFMrLykmJihhW2NdPXkoYikud3JhcChcIjxzcGFuPjwvc3Bhbj5cIikucGFyZW50KClbMF0pfSk7dmFyIGc9TChhLGIsYSxjLGQsZSk7bWEoYSxcIm5nLXNjb3BlXCIpO3JldHVybiBmdW5jdGlvbihiLGMsZCl7eGIoYixcInNjb3BlXCIpO3ZhciBlPWM/SmEuY2xvbmUuY2FsbChhKTphO3EoZCxmdW5jdGlvbihhLGIpe2UuZGF0YShcIiRcIitiK1wiQ29udHJvbGxlclwiLGEpfSk7ZD0wO2Zvcih2YXIgZj1lLmxlbmd0aDtkPGY7ZCsrKXt2YXIgbD1cbmVbZF0ubm9kZVR5cGU7MSE9PWwmJjkhPT1sfHxlLmVxKGQpLmRhdGEoXCIkc2NvcGVcIixiKX1jJiZjKGUsYik7ZyYmZyhiLGUsZSk7cmV0dXJuIGV9fWZ1bmN0aW9uIG1hKGEsYil7dHJ5e2EuYWRkQ2xhc3MoYil9Y2F0Y2goYyl7fX1mdW5jdGlvbiBMKGEsYixjLGQsZSxnKXtmdW5jdGlvbiBmKGEsYyxkLGUpe3ZhciBnLGssbSxyLG4scCx6O2c9Yy5sZW5ndGg7dmFyIEk9QXJyYXkoZyk7Zm9yKG49MDtuPGc7bisrKUlbbl09Y1tuXTt6PW49MDtmb3IocD1sLmxlbmd0aDtuPHA7eisrKWs9SVt6XSxjPWxbbisrXSxnPWxbbisrXSxtPXkoayksYz8oYy5zY29wZT8ocj1hLiRuZXcoKSxtLmRhdGEoXCIkc2NvcGVcIixyKSk6cj1hLChtPWMudHJhbnNjbHVkZSl8fCFlJiZiP2MoZyxyLGssZCxRKGEsbXx8YikpOmMoZyxyLGssZCxlKSk6ZyYmZyhhLGsuY2hpbGROb2RlcyxzLGUpfWZvcih2YXIgbD1bXSxrLG0scixuLHA9MDtwPGEubGVuZ3RoO3ArKylrPW5ldyBIYixtPWRhKGFbcF0sW10sayxcbjA9PT1wP2Q6cyxlKSwoZz1tLmxlbmd0aD9pYShtLGFbcF0sayxiLGMsbnVsbCxbXSxbXSxnKTpudWxsKSYmZy5zY29wZSYmbWEoeShhW3BdKSxcIm5nLXNjb3BlXCIpLGs9ZyYmZy50ZXJtaW5hbHx8IShyPWFbcF0uY2hpbGROb2Rlcyl8fCFyLmxlbmd0aD9udWxsOkwocixnP2cudHJhbnNjbHVkZTpiKSxsLnB1c2goZyxrKSxuPW58fGd8fGssZz1udWxsO3JldHVybiBuP2Y6bnVsbH1mdW5jdGlvbiBRKGEsYil7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXt2YXIgZz0hMTtjfHwoYz1hLiRuZXcoKSxnPWMuJCR0cmFuc2NsdWRlZD0hMCk7ZD1iKGMsZCxlKTtpZihnKWQub24oXCIkZGVzdHJveVwiLGViKGMsYy4kZGVzdHJveSkpO3JldHVybiBkfX1mdW5jdGlvbiBkYShhLGIsYyxkLGYpe3ZhciBrPWMuJGF0dHIsbDtzd2l0Y2goYS5ub2RlVHlwZSl7Y2FzZSAxOlQoYixuYShLYShhKS50b0xvd2VyQ2FzZSgpKSxcIkVcIixkLGYpO3ZhciBtLHIsbjtsPWEuYXR0cmlidXRlcztmb3IodmFyIHA9MCx6PVxubCYmbC5sZW5ndGg7cDx6O3ArKyl7dmFyIHU9ITEsRj0hMTttPWxbcF07aWYoIVN8fDg8PVN8fG0uc3BlY2lmaWVkKXtyPW0ubmFtZTtuPW5hKHIpO1cudGVzdChuKSYmKHI9ZmIobi5zdWJzdHIoNiksXCItXCIpKTt2YXIgSj1uLnJlcGxhY2UoLyhTdGFydHxFbmQpJC8sXCJcIik7bj09PUorXCJTdGFydFwiJiYodT1yLEY9ci5zdWJzdHIoMCxyLmxlbmd0aC01KStcImVuZFwiLHI9ci5zdWJzdHIoMCxyLmxlbmd0aC02KSk7bj1uYShyLnRvTG93ZXJDYXNlKCkpO2tbbl09cjtjW25dPW09Y2EobS52YWx1ZSk7bWMoYSxuKSYmKGNbbl09ITApO04oYSxiLG0sbik7VChiLG4sXCJBXCIsZCxmLHUsRil9fWE9YS5jbGFzc05hbWU7aWYodyhhKSYmXCJcIiE9PWEpZm9yKDtsPWcuZXhlYyhhKTspbj1uYShsWzJdKSxUKGIsbixcIkNcIixkLGYpJiYoY1tuXT1jYShsWzNdKSksYT1hLnN1YnN0cihsLmluZGV4K2xbMF0ubGVuZ3RoKTticmVhaztjYXNlIDM6dChiLGEubm9kZVZhbHVlKTticmVhaztjYXNlIDg6dHJ5e2lmKGw9XG5lLmV4ZWMoYS5ub2RlVmFsdWUpKW49bmEobFsxXSksVChiLG4sXCJNXCIsZCxmKSYmKGNbbl09Y2EobFsyXSkpfWNhdGNoKHgpe319Yi5zb3J0KEUpO3JldHVybiBifWZ1bmN0aW9uIEgoYSxiLGMpe3ZhciBkPVtdLGU9MDtpZihiJiZhLmhhc0F0dHJpYnV0ZSYmYS5oYXNBdHRyaWJ1dGUoYikpe2Rve2lmKCFhKXRocm93IGphKFwidXRlcmRpclwiLGIsYyk7MT09YS5ub2RlVHlwZSYmKGEuaGFzQXR0cmlidXRlKGIpJiZlKyssYS5oYXNBdHRyaWJ1dGUoYykmJmUtLSk7ZC5wdXNoKGEpO2E9YS5uZXh0U2libGluZ313aGlsZSgwPGUpfWVsc2UgZC5wdXNoKGEpO3JldHVybiB5KGQpfWZ1bmN0aW9uIFIoYSxiLGMpe3JldHVybiBmdW5jdGlvbihkLGUsZyxmLGwpe2U9SChlWzBdLGIsYyk7cmV0dXJuIGEoZCxlLGcsZixsKX19ZnVuY3Rpb24gaWEoYSxjLGQsZSxnLGYsbCxuLHApe2Z1bmN0aW9uIHUoYSxiLGMsZCl7aWYoYSl7YyYmKGE9UihhLGMsZCkpO2EucmVxdWlyZT1HLnJlcXVpcmU7aWYoUT09PVxuR3x8Ry4kJGlzb2xhdGVTY29wZSlhPXFjKGEse2lzb2xhdGVTY29wZTohMH0pO2wucHVzaChhKX1pZihiKXtjJiYoYj1SKGIsYyxkKSk7Yi5yZXF1aXJlPUcucmVxdWlyZTtpZihRPT09R3x8Ry4kJGlzb2xhdGVTY29wZSliPXFjKGIse2lzb2xhdGVTY29wZTohMH0pO24ucHVzaChiKX19ZnVuY3Rpb24gRihhLGIsYyl7dmFyIGQsZT1cImRhdGFcIixnPSExO2lmKHcoYSkpe2Zvcig7XCJeXCI9PShkPWEuY2hhckF0KDApKXx8XCI/XCI9PWQ7KWE9YS5zdWJzdHIoMSksXCJeXCI9PWQmJihlPVwiaW5oZXJpdGVkRGF0YVwiKSxnPWd8fFwiP1wiPT1kO2Q9bnVsbDtjJiZcImRhdGFcIj09PWUmJihkPWNbYV0pO2Q9ZHx8YltlXShcIiRcIithK1wiQ29udHJvbGxlclwiKTtpZighZCYmIWcpdGhyb3cgamEoXCJjdHJlcVwiLGEsdCk7fWVsc2UgTShhKSYmKGQ9W10scShhLGZ1bmN0aW9uKGEpe2QucHVzaChGKGEsYixjKSl9KSk7cmV0dXJuIGR9ZnVuY3Rpb24gSihhLGUsZyxmLHApe2Z1bmN0aW9uIHUoYSxiKXt2YXIgYzsyPmFyZ3VtZW50cy5sZW5ndGgmJlxuKGI9YSxhPXMpO0QmJihjPWxiKTtyZXR1cm4gcChhLGIsYyl9dmFyIEkseCx2LEEsUixILGxiPXt9LGRhO0k9Yz09PWc/ZDpVYihkLG5ldyBIYih5KGcpLGQuJGF0dHIpKTt4PUkuJCRlbGVtZW50O2lmKFEpe3ZhciBUPS9eXFxzKihbQD0mXSkoXFw/PylcXHMqKFxcdyopXFxzKiQvO2Y9eShnKTtIPWUuJG5ldyghMCk7aWEmJmlhPT09US4kJG9yaWdpbmFsRGlyZWN0aXZlP2YuZGF0YShcIiRpc29sYXRlU2NvcGVcIixIKTpmLmRhdGEoXCIkaXNvbGF0ZVNjb3BlTm9UZW1wbGF0ZVwiLEgpO21hKGYsXCJuZy1pc29sYXRlLXNjb3BlXCIpO3EoUS5zY29wZSxmdW5jdGlvbihhLGMpe3ZhciBkPWEubWF0Y2goVCl8fFtdLGc9ZFszXXx8YyxmPVwiP1wiPT1kWzJdLGQ9ZFsxXSxsLG0sbixwO0guJCRpc29sYXRlQmluZGluZ3NbY109ZCtnO3N3aXRjaChkKXtjYXNlIFwiQFwiOkkuJG9ic2VydmUoZyxmdW5jdGlvbihhKXtIW2NdPWF9KTtJLiQkb2JzZXJ2ZXJzW2ddLiQkc2NvcGU9ZTtJW2ddJiYoSFtjXT1iKElbZ10pKGUpKTtcbmJyZWFrO2Nhc2UgXCI9XCI6aWYoZiYmIUlbZ10pYnJlYWs7bT1yKElbZ10pO3A9bS5saXRlcmFsP3hhOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGE9PT1ifTtuPW0uYXNzaWdufHxmdW5jdGlvbigpe2w9SFtjXT1tKGUpO3Rocm93IGphKFwibm9uYXNzaWduXCIsSVtnXSxRLm5hbWUpO307bD1IW2NdPW0oZSk7SC4kd2F0Y2goZnVuY3Rpb24oKXt2YXIgYT1tKGUpO3AoYSxIW2NdKXx8KHAoYSxsKT9uKGUsYT1IW2NdKTpIW2NdPWEpO3JldHVybiBsPWF9LG51bGwsbS5saXRlcmFsKTticmVhaztjYXNlIFwiJlwiOm09cihJW2ddKTtIW2NdPWZ1bmN0aW9uKGEpe3JldHVybiBtKGUsYSl9O2JyZWFrO2RlZmF1bHQ6dGhyb3cgamEoXCJpc2NwXCIsUS5uYW1lLGMsYSk7fX0pfWRhPXAmJnU7TCYmcShMLGZ1bmN0aW9uKGEpe3ZhciBiPXskc2NvcGU6YT09PVF8fGEuJCRpc29sYXRlU2NvcGU/SDplLCRlbGVtZW50OngsJGF0dHJzOkksJHRyYW5zY2x1ZGU6ZGF9LGM7Uj1hLmNvbnRyb2xsZXI7XCJAXCI9PVImJihSPVxuSVthLm5hbWVdKTtjPXooUixiKTtsYlthLm5hbWVdPWM7RHx8eC5kYXRhKFwiJFwiK2EubmFtZStcIkNvbnRyb2xsZXJcIixjKTthLmNvbnRyb2xsZXJBcyYmKGIuJHNjb3BlW2EuY29udHJvbGxlckFzXT1jKX0pO2Y9MDtmb3Iodj1sLmxlbmd0aDtmPHY7ZisrKXRyeXtBPWxbZl0sQShBLmlzb2xhdGVTY29wZT9IOmUseCxJLEEucmVxdWlyZSYmRihBLnJlcXVpcmUseCxsYiksZGEpfWNhdGNoKEcpe20oRyxoYSh4KSl9Zj1lO1EmJihRLnRlbXBsYXRlfHxudWxsPT09US50ZW1wbGF0ZVVybCkmJihmPUgpO2EmJmEoZixnLmNoaWxkTm9kZXMscyxwKTtmb3IoZj1uLmxlbmd0aC0xOzA8PWY7Zi0tKXRyeXtBPW5bZl0sQShBLmlzb2xhdGVTY29wZT9IOmUseCxJLEEucmVxdWlyZSYmRihBLnJlcXVpcmUseCxsYiksZGEpfWNhdGNoKEIpe20oQixoYSh4KSl9fXA9cHx8e307Zm9yKHZhciB2PS1OdW1iZXIuTUFYX1ZBTFVFLEEsTD1wLmNvbnRyb2xsZXJEaXJlY3RpdmVzLFE9cC5uZXdJc29sYXRlU2NvcGVEaXJlY3RpdmUsXG5pYT1wLnRlbXBsYXRlRGlyZWN0aXZlLFQ9cC5ub25UbGJUcmFuc2NsdWRlRGlyZWN0aXZlLEU9ITEsRD1wLmhhc0VsZW1lbnRUcmFuc2NsdWRlRGlyZWN0aXZlLFo9ZC4kJGVsZW1lbnQ9eShjKSxHLHQsVixYYT1lLE8sTj0wLFM9YS5sZW5ndGg7TjxTO04rKyl7Rz1hW05dO3ZhciByYT1HLiQkc3RhcnQsVz1HLiQkZW5kO3JhJiYoWj1IKGMscmEsVykpO1Y9cztpZih2PkcucHJpb3JpdHkpYnJlYWs7aWYoVj1HLnNjb3BlKUE9QXx8RyxHLnRlbXBsYXRlVXJsfHwoSyhcIm5ldy9pc29sYXRlZCBzY29wZVwiLFEsRyxaKSxYKFYpJiYoUT1HKSk7dD1HLm5hbWU7IUcudGVtcGxhdGVVcmwmJkcuY29udHJvbGxlciYmKFY9Ry5jb250cm9sbGVyLEw9THx8e30sSyhcIidcIit0K1wiJyBjb250cm9sbGVyXCIsTFt0XSxHLFopLExbdF09Ryk7aWYoVj1HLnRyYW5zY2x1ZGUpRT0hMCxHLiQkdGxifHwoSyhcInRyYW5zY2x1c2lvblwiLFQsRyxaKSxUPUcpLFwiZWxlbWVudFwiPT1WPyhEPSEwLHY9Ry5wcmlvcml0eSxcblY9SChjLHJhLFcpLFo9ZC4kJGVsZW1lbnQ9eShVLmNyZWF0ZUNvbW1lbnQoXCIgXCIrdCtcIjogXCIrZFt0XStcIiBcIikpLGM9WlswXSxtYihnLHkoeWEuY2FsbChWLDApKSxjKSxYYT14KFYsZSx2LGYmJmYubmFtZSx7bm9uVGxiVHJhbnNjbHVkZURpcmVjdGl2ZTpUfSkpOihWPXkoRWIoYykpLmNvbnRlbnRzKCksWi5lbXB0eSgpLFhhPXgoVixlKSk7aWYoRy50ZW1wbGF0ZSlpZihLKFwidGVtcGxhdGVcIixpYSxHLFopLGlhPUcsVj1QKEcudGVtcGxhdGUpP0cudGVtcGxhdGUoWixkKTpHLnRlbXBsYXRlLFY9WShWKSxHLnJlcGxhY2Upe2Y9RztWPUNiLnRlc3QoVik/eShWKTpbXTtjPVZbMF07aWYoMSE9Vi5sZW5ndGh8fDEhPT1jLm5vZGVUeXBlKXRocm93IGphKFwidHBscnRcIix0LFwiXCIpO21iKGcsWixjKTtTPXskYXR0cjp7fX07Vj1kYShjLFtdLFMpO3ZhciAkPWEuc3BsaWNlKE4rMSxhLmxlbmd0aC0oTisxKSk7USYmcGMoVik7YT1hLmNvbmNhdChWKS5jb25jYXQoJCk7QihkLFMpO1M9YS5sZW5ndGh9ZWxzZSBaLmh0bWwoVik7XG5pZihHLnRlbXBsYXRlVXJsKUsoXCJ0ZW1wbGF0ZVwiLGlhLEcsWiksaWE9RyxHLnJlcGxhY2UmJihmPUcpLEo9QyhhLnNwbGljZShOLGEubGVuZ3RoLU4pLFosZCxnLFhhLGwsbix7Y29udHJvbGxlckRpcmVjdGl2ZXM6TCxuZXdJc29sYXRlU2NvcGVEaXJlY3RpdmU6USx0ZW1wbGF0ZURpcmVjdGl2ZTppYSxub25UbGJUcmFuc2NsdWRlRGlyZWN0aXZlOlR9KSxTPWEubGVuZ3RoO2Vsc2UgaWYoRy5jb21waWxlKXRyeXtPPUcuY29tcGlsZShaLGQsWGEpLFAoTyk/dShudWxsLE8scmEsVyk6TyYmdShPLnByZSxPLnBvc3QscmEsVyl9Y2F0Y2goYWEpe20oYWEsaGEoWikpfUcudGVybWluYWwmJihKLnRlcm1pbmFsPSEwLHY9TWF0aC5tYXgodixHLnByaW9yaXR5KSl9Si5zY29wZT1BJiYhMD09PUEuc2NvcGU7Si50cmFuc2NsdWRlPUUmJlhhO3AuaGFzRWxlbWVudFRyYW5zY2x1ZGVEaXJlY3RpdmU9RDtyZXR1cm4gSn1mdW5jdGlvbiBwYyhhKXtmb3IodmFyIGI9MCxjPWEubGVuZ3RoO2I8YztiKyspYVtiXT1cblRiKGFbYl0seyQkaXNvbGF0ZVNjb3BlOiEwfSl9ZnVuY3Rpb24gVChiLGUsZyxmLGssbixyKXtpZihlPT09aylyZXR1cm4gbnVsbDtrPW51bGw7aWYoYy5oYXNPd25Qcm9wZXJ0eShlKSl7dmFyIHA7ZT1hLmdldChlK2QpO2Zvcih2YXIgej0wLHU9ZS5sZW5ndGg7ejx1O3orKyl0cnl7cD1lW3pdLChmPT09c3x8Zj5wLnByaW9yaXR5KSYmLTEhPXAucmVzdHJpY3QuaW5kZXhPZihnKSYmKG4mJihwPVRiKHAseyQkc3RhcnQ6biwkJGVuZDpyfSkpLGIucHVzaChwKSxrPXApfWNhdGNoKEYpe20oRil9fXJldHVybiBrfWZ1bmN0aW9uIEIoYSxiKXt2YXIgYz1iLiRhdHRyLGQ9YS4kYXR0cixlPWEuJCRlbGVtZW50O3EoYSxmdW5jdGlvbihkLGUpe1wiJFwiIT1lLmNoYXJBdCgwKSYmKGJbZV0mJihkKz0oXCJzdHlsZVwiPT09ZT9cIjtcIjpcIiBcIikrYltlXSksYS4kc2V0KGUsZCwhMCxjW2VdKSl9KTtxKGIsZnVuY3Rpb24oYixnKXtcImNsYXNzXCI9PWc/KG1hKGUsYiksYVtcImNsYXNzXCJdPShhW1wiY2xhc3NcIl0/XG5hW1wiY2xhc3NcIl0rXCIgXCI6XCJcIikrYik6XCJzdHlsZVwiPT1nPyhlLmF0dHIoXCJzdHlsZVwiLGUuYXR0cihcInN0eWxlXCIpK1wiO1wiK2IpLGEuc3R5bGU9KGEuc3R5bGU/YS5zdHlsZStcIjtcIjpcIlwiKStiKTpcIiRcIj09Zy5jaGFyQXQoMCl8fGEuaGFzT3duUHJvcGVydHkoZyl8fChhW2ddPWIsZFtnXT1jW2ddKX0pfWZ1bmN0aW9uIEMoYSxiLGMsZCxlLGcsZixsKXt2YXIgaz1bXSxtLHIsej1iWzBdLHU9YS5zaGlmdCgpLEY9RCh7fSx1LHt0ZW1wbGF0ZVVybDpudWxsLHRyYW5zY2x1ZGU6bnVsbCxyZXBsYWNlOm51bGwsJCRvcmlnaW5hbERpcmVjdGl2ZTp1fSkseD1QKHUudGVtcGxhdGVVcmwpP3UudGVtcGxhdGVVcmwoYixjKTp1LnRlbXBsYXRlVXJsO2IuZW1wdHkoKTtuLmdldCh2LmdldFRydXN0ZWRSZXNvdXJjZVVybCh4KSx7Y2FjaGU6cH0pLnN1Y2Nlc3MoZnVuY3Rpb24obil7dmFyIHAsSjtuPVkobik7aWYodS5yZXBsYWNlKXtuPUNiLnRlc3Qobik/eShuKTpbXTtwPW5bMF07aWYoMSE9bi5sZW5ndGh8fFxuMSE9PXAubm9kZVR5cGUpdGhyb3cgamEoXCJ0cGxydFwiLHUubmFtZSx4KTtuPXskYXR0cjp7fX07bWIoZCxiLHApO3ZhciB2PWRhKHAsW10sbik7WCh1LnNjb3BlKSYmcGModik7YT12LmNvbmNhdChhKTtCKGMsbil9ZWxzZSBwPXosYi5odG1sKG4pO2EudW5zaGlmdChGKTttPWlhKGEscCxjLGUsYix1LGcsZixsKTtxKGQsZnVuY3Rpb24oYSxjKXthPT1wJiYoZFtjXT1iWzBdKX0pO2ZvcihyPUwoYlswXS5jaGlsZE5vZGVzLGUpO2subGVuZ3RoOyl7bj1rLnNoaWZ0KCk7Sj1rLnNoaWZ0KCk7dmFyIEE9ay5zaGlmdCgpLFI9ay5zaGlmdCgpLHY9YlswXTtpZihKIT09eil7dmFyIEg9Si5jbGFzc05hbWU7bC5oYXNFbGVtZW50VHJhbnNjbHVkZURpcmVjdGl2ZSYmdS5yZXBsYWNlfHwodj1FYihwKSk7bWIoQSx5KEopLHYpO21hKHkodiksSCl9Sj1tLnRyYW5zY2x1ZGU/UShuLG0udHJhbnNjbHVkZSk6UjttKHIsbix2LGQsSil9az1udWxsfSkuZXJyb3IoZnVuY3Rpb24oYSxiLGMsZCl7dGhyb3cgamEoXCJ0cGxvYWRcIixcbmQudXJsKTt9KTtyZXR1cm4gZnVuY3Rpb24oYSxiLGMsZCxlKXtrPyhrLnB1c2goYiksay5wdXNoKGMpLGsucHVzaChkKSxrLnB1c2goZSkpOm0ocixiLGMsZCxlKX19ZnVuY3Rpb24gRShhLGIpe3ZhciBjPWIucHJpb3JpdHktYS5wcmlvcml0eTtyZXR1cm4gMCE9PWM/YzphLm5hbWUhPT1iLm5hbWU/YS5uYW1lPGIubmFtZT8tMToxOmEuaW5kZXgtYi5pbmRleH1mdW5jdGlvbiBLKGEsYixjLGQpe2lmKGIpdGhyb3cgamEoXCJtdWx0aWRpclwiLGIubmFtZSxjLm5hbWUsYSxoYShkKSk7fWZ1bmN0aW9uIHQoYSxjKXt2YXIgZD1iKGMsITApO2QmJmEucHVzaCh7cHJpb3JpdHk6MCxjb21waWxlOmFhKGZ1bmN0aW9uKGEsYil7dmFyIGM9Yi5wYXJlbnQoKSxlPWMuZGF0YShcIiRiaW5kaW5nXCIpfHxbXTtlLnB1c2goZCk7bWEoYy5kYXRhKFwiJGJpbmRpbmdcIixlKSxcIm5nLWJpbmRpbmdcIik7YS4kd2F0Y2goZCxmdW5jdGlvbihhKXtiWzBdLm5vZGVWYWx1ZT1hfSl9KX0pfWZ1bmN0aW9uIE8oYSxiKXtpZihcInNyY2RvY1wiPT1cbmIpcmV0dXJuIHYuSFRNTDt2YXIgYz1LYShhKTtpZihcInhsaW5rSHJlZlwiPT1ifHxcIkZPUk1cIj09YyYmXCJhY3Rpb25cIj09Ynx8XCJJTUdcIiE9YyYmKFwic3JjXCI9PWJ8fFwibmdTcmNcIj09YikpcmV0dXJuIHYuUkVTT1VSQ0VfVVJMfWZ1bmN0aW9uIE4oYSxjLGQsZSl7dmFyIGc9YihkLCEwKTtpZihnKXtpZihcIm11bHRpcGxlXCI9PT1lJiZcIlNFTEVDVFwiPT09S2EoYSkpdGhyb3cgamEoXCJzZWxtdWx0aVwiLGhhKGEpKTtjLnB1c2goe3ByaW9yaXR5OjEwMCxjb21waWxlOmZ1bmN0aW9uKCl7cmV0dXJue3ByZTpmdW5jdGlvbihjLGQsbCl7ZD1sLiQkb2JzZXJ2ZXJzfHwobC4kJG9ic2VydmVycz17fSk7aWYoZi50ZXN0KGUpKXRocm93IGphKFwibm9kb21ldmVudHNcIik7aWYoZz1iKGxbZV0sITAsTyhhLGUpKSlsW2VdPWcoYyksKGRbZV18fChkW2VdPVtdKSkuJCRpbnRlcj0hMCwobC4kJG9ic2VydmVycyYmbC4kJG9ic2VydmVyc1tlXS4kJHNjb3BlfHxjKS4kd2F0Y2goZyxmdW5jdGlvbihhLGIpe1wiY2xhc3NcIj09PVxuZSYmYSE9Yj9sLiR1cGRhdGVDbGFzcyhhLGIpOmwuJHNldChlLGEpfSl9fX19KX19ZnVuY3Rpb24gbWIoYSxiLGMpe3ZhciBkPWJbMF0sZT1iLmxlbmd0aCxnPWQucGFyZW50Tm9kZSxmLGw7aWYoYSlmb3IoZj0wLGw9YS5sZW5ndGg7ZjxsO2YrKylpZihhW2ZdPT1kKXthW2YrK109YztsPWYrZS0xO2Zvcih2YXIgaz1hLmxlbmd0aDtmPGs7ZisrLGwrKylsPGs/YVtmXT1hW2xdOmRlbGV0ZSBhW2ZdO2EubGVuZ3RoLT1lLTE7YnJlYWt9ZyYmZy5yZXBsYWNlQ2hpbGQoYyxkKTthPVUuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2EuYXBwZW5kQ2hpbGQoZCk7Y1t5LmV4cGFuZG9dPWRbeS5leHBhbmRvXTtkPTE7Zm9yKGU9Yi5sZW5ndGg7ZDxlO2QrKylnPWJbZF0seShnKS5yZW1vdmUoKSxhLmFwcGVuZENoaWxkKGcpLGRlbGV0ZSBiW2RdO2JbMF09YztiLmxlbmd0aD0xfWZ1bmN0aW9uIHFjKGEsYil7cmV0dXJuIEQoZnVuY3Rpb24oKXtyZXR1cm4gYS5hcHBseShudWxsLGFyZ3VtZW50cyl9LFxuYSxiKX12YXIgSGI9ZnVuY3Rpb24oYSxiKXt0aGlzLiQkZWxlbWVudD1hO3RoaXMuJGF0dHI9Ynx8e319O0hiLnByb3RvdHlwZT17JG5vcm1hbGl6ZTpuYSwkYWRkQ2xhc3M6ZnVuY3Rpb24oYSl7YSYmMDxhLmxlbmd0aCYmSi5hZGRDbGFzcyh0aGlzLiQkZWxlbWVudCxhKX0sJHJlbW92ZUNsYXNzOmZ1bmN0aW9uKGEpe2EmJjA8YS5sZW5ndGgmJkoucmVtb3ZlQ2xhc3ModGhpcy4kJGVsZW1lbnQsYSl9LCR1cGRhdGVDbGFzczpmdW5jdGlvbihhLGIpe3ZhciBjPXJjKGEsYiksZD1yYyhiLGEpOzA9PT1jLmxlbmd0aD9KLnJlbW92ZUNsYXNzKHRoaXMuJCRlbGVtZW50LGQpOjA9PT1kLmxlbmd0aD9KLmFkZENsYXNzKHRoaXMuJCRlbGVtZW50LGMpOkouc2V0Q2xhc3ModGhpcy4kJGVsZW1lbnQsYyxkKX0sJHNldDpmdW5jdGlvbihhLGIsYyxkKXt2YXIgZT1tYyh0aGlzLiQkZWxlbWVudFswXSxhKTtlJiYodGhpcy4kJGVsZW1lbnQucHJvcChhLGIpLGQ9ZSk7dGhpc1thXT1iO2Q/dGhpcy4kYXR0clthXT1cbmQ6KGQ9dGhpcy4kYXR0clthXSl8fCh0aGlzLiRhdHRyW2FdPWQ9ZmIoYSxcIi1cIikpO2U9S2EodGhpcy4kJGVsZW1lbnQpO2lmKFwiQVwiPT09ZSYmXCJocmVmXCI9PT1hfHxcIklNR1wiPT09ZSYmXCJzcmNcIj09PWEpdGhpc1thXT1iPUEoYixcInNyY1wiPT09YSk7ITEhPT1jJiYobnVsbD09PWJ8fGI9PT1zP3RoaXMuJCRlbGVtZW50LnJlbW92ZUF0dHIoZCk6dGhpcy4kJGVsZW1lbnQuYXR0cihkLGIpKTsoYz10aGlzLiQkb2JzZXJ2ZXJzKSYmcShjW2FdLGZ1bmN0aW9uKGEpe3RyeXthKGIpfWNhdGNoKGMpe20oYyl9fSl9LCRvYnNlcnZlOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcyxkPWMuJCRvYnNlcnZlcnN8fChjLiQkb2JzZXJ2ZXJzPXt9KSxlPWRbYV18fChkW2FdPVtdKTtlLnB1c2goYik7dS4kZXZhbEFzeW5jKGZ1bmN0aW9uKCl7ZS4kJGludGVyfHxiKGNbYV0pfSk7cmV0dXJuIGJ9fTt2YXIgWj1iLnN0YXJ0U3ltYm9sKCkscmE9Yi5lbmRTeW1ib2woKSxZPVwie3tcIj09Wnx8XCJ9fVwiPT1yYT9cbkRhOmZ1bmN0aW9uKGEpe3JldHVybiBhLnJlcGxhY2UoL1xce1xcey9nLFopLnJlcGxhY2UoL319L2cscmEpfSxXPS9ebmdBdHRyW0EtWl0vO3JldHVybiB4fV19ZnVuY3Rpb24gbmEoYil7cmV0dXJuIFRhKGIucmVwbGFjZSh0ZSxcIlwiKSl9ZnVuY3Rpb24gcmMoYixhKXt2YXIgYz1cIlwiLGQ9Yi5zcGxpdCgvXFxzKy8pLGU9YS5zcGxpdCgvXFxzKy8pLGc9MDthOmZvcig7ZzxkLmxlbmd0aDtnKyspe2Zvcih2YXIgZj1kW2ddLGg9MDtoPGUubGVuZ3RoO2grKylpZihmPT1lW2hdKWNvbnRpbnVlIGE7Yys9KDA8Yy5sZW5ndGg/XCIgXCI6XCJcIikrZn1yZXR1cm4gY31mdW5jdGlvbiBPZCgpe3ZhciBiPXt9LGE9L14oXFxTKykoXFxzK2FzXFxzKyhcXHcrKSk/JC87dGhpcy5yZWdpc3Rlcj1mdW5jdGlvbihhLGQpe0FhKGEsXCJjb250cm9sbGVyXCIpO1goYSk/RChiLGEpOmJbYV09ZH07dGhpcy4kZ2V0PVtcIiRpbmplY3RvclwiLFwiJHdpbmRvd1wiLGZ1bmN0aW9uKGMsZCl7cmV0dXJuIGZ1bmN0aW9uKGUsZyl7dmFyIGYsXG5oLGw7dyhlKSYmKGY9ZS5tYXRjaChhKSxoPWZbMV0sbD1mWzNdLGU9Yi5oYXNPd25Qcm9wZXJ0eShoKT9iW2hdOmJjKGcuJHNjb3BlLGgsITApfHxiYyhkLGgsITApLFJhKGUsaCwhMCkpO2Y9Yy5pbnN0YW50aWF0ZShlLGcpO2lmKGwpe2lmKCFnfHxcIm9iamVjdFwiIT10eXBlb2YgZy4kc2NvcGUpdGhyb3cgdChcIiRjb250cm9sbGVyXCIpKFwibm9zY3BcIixofHxlLm5hbWUsbCk7Zy4kc2NvcGVbbF09Zn1yZXR1cm4gZn19XX1mdW5jdGlvbiBQZCgpe3RoaXMuJGdldD1bXCIkd2luZG93XCIsZnVuY3Rpb24oYil7cmV0dXJuIHkoYi5kb2N1bWVudCl9XX1mdW5jdGlvbiBRZCgpe3RoaXMuJGdldD1bXCIkbG9nXCIsZnVuY3Rpb24oYil7cmV0dXJuIGZ1bmN0aW9uKGEsYyl7Yi5lcnJvci5hcHBseShiLGFyZ3VtZW50cyl9fV19ZnVuY3Rpb24gc2MoYil7dmFyIGE9e30sYyxkLGU7aWYoIWIpcmV0dXJuIGE7cShiLnNwbGl0KFwiXFxuXCIpLGZ1bmN0aW9uKGIpe2U9Yi5pbmRleE9mKFwiOlwiKTtjPUsoY2EoYi5zdWJzdHIoMCxcbmUpKSk7ZD1jYShiLnN1YnN0cihlKzEpKTtjJiYoYVtjXT1hW2NdP2FbY10rKFwiLCBcIitkKTpkKX0pO3JldHVybiBhfWZ1bmN0aW9uIHRjKGIpe3ZhciBhPVgoYik/YjpzO3JldHVybiBmdW5jdGlvbihjKXthfHwoYT1zYyhiKSk7cmV0dXJuIGM/YVtLKGMpXXx8bnVsbDphfX1mdW5jdGlvbiB1YyhiLGEsYyl7aWYoUChjKSlyZXR1cm4gYyhiLGEpO3EoYyxmdW5jdGlvbihjKXtiPWMoYixhKX0pO3JldHVybiBifWZ1bmN0aW9uIFRkKCl7dmFyIGI9L15cXHMqKFxcW3xcXHtbXlxce10pLyxhPS9bXFx9XFxdXVxccyokLyxjPS9eXFwpXFxdXFx9Jyw/XFxuLyxkPXtcIkNvbnRlbnQtVHlwZVwiOlwiYXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04XCJ9LGU9dGhpcy5kZWZhdWx0cz17dHJhbnNmb3JtUmVzcG9uc2U6W2Z1bmN0aW9uKGQpe3coZCkmJihkPWQucmVwbGFjZShjLFwiXCIpLGIudGVzdChkKSYmYS50ZXN0KGQpJiYoZD1XYihkKSkpO3JldHVybiBkfV0sdHJhbnNmb3JtUmVxdWVzdDpbZnVuY3Rpb24oYSl7cmV0dXJuIFgoYSkmJlxuXCJbb2JqZWN0IEZpbGVdXCIhPT13YS5jYWxsKGEpJiZcIltvYmplY3QgQmxvYl1cIiE9PXdhLmNhbGwoYSk/cWEoYSk6YX1dLGhlYWRlcnM6e2NvbW1vbjp7QWNjZXB0OlwiYXBwbGljYXRpb24vanNvbiwgdGV4dC9wbGFpbiwgKi8qXCJ9LHBvc3Q6YmEoZCkscHV0OmJhKGQpLHBhdGNoOmJhKGQpfSx4c3JmQ29va2llTmFtZTpcIlhTUkYtVE9LRU5cIix4c3JmSGVhZGVyTmFtZTpcIlgtWFNSRi1UT0tFTlwifSxnPXRoaXMuaW50ZXJjZXB0b3JzPVtdLGY9dGhpcy5yZXNwb25zZUludGVyY2VwdG9ycz1bXTt0aGlzLiRnZXQ9W1wiJGh0dHBCYWNrZW5kXCIsXCIkYnJvd3NlclwiLFwiJGNhY2hlRmFjdG9yeVwiLFwiJHJvb3RTY29wZVwiLFwiJHFcIixcIiRpbmplY3RvclwiLGZ1bmN0aW9uKGEsYixjLGQsbixwKXtmdW5jdGlvbiByKGEpe2Z1bmN0aW9uIGMoYSl7dmFyIGI9RCh7fSxhLHtkYXRhOnVjKGEuZGF0YSxhLmhlYWRlcnMsZC50cmFuc2Zvcm1SZXNwb25zZSl9KTtyZXR1cm4gMjAwPD1hLnN0YXR1cyYmMzAwPmEuc3RhdHVzP1xuYjpuLnJlamVjdChiKX12YXIgZD17bWV0aG9kOlwiZ2V0XCIsdHJhbnNmb3JtUmVxdWVzdDplLnRyYW5zZm9ybVJlcXVlc3QsdHJhbnNmb3JtUmVzcG9uc2U6ZS50cmFuc2Zvcm1SZXNwb25zZX0sZz1mdW5jdGlvbihhKXtmdW5jdGlvbiBiKGEpe3ZhciBjO3EoYSxmdW5jdGlvbihiLGQpe1AoYikmJihjPWIoKSxudWxsIT1jP2FbZF09YzpkZWxldGUgYVtkXSl9KX12YXIgYz1lLmhlYWRlcnMsZD1EKHt9LGEuaGVhZGVycyksZyxmLGM9RCh7fSxjLmNvbW1vbixjW0soYS5tZXRob2QpXSk7YihjKTtiKGQpO2E6Zm9yKGcgaW4gYyl7YT1LKGcpO2ZvcihmIGluIGQpaWYoSyhmKT09PWEpY29udGludWUgYTtkW2ddPWNbZ119cmV0dXJuIGR9KGEpO0QoZCxhKTtkLmhlYWRlcnM9ZztkLm1ldGhvZD1GYShkLm1ldGhvZCk7KGE9SWIoZC51cmwpP2IuY29va2llcygpW2QueHNyZkNvb2tpZU5hbWV8fGUueHNyZkNvb2tpZU5hbWVdOnMpJiYoZ1tkLnhzcmZIZWFkZXJOYW1lfHxlLnhzcmZIZWFkZXJOYW1lXT1cbmEpO3ZhciBmPVtmdW5jdGlvbihhKXtnPWEuaGVhZGVyczt2YXIgYj11YyhhLmRhdGEsdGMoZyksYS50cmFuc2Zvcm1SZXF1ZXN0KTtFKGEuZGF0YSkmJnEoZyxmdW5jdGlvbihhLGIpe1wiY29udGVudC10eXBlXCI9PT1LKGIpJiZkZWxldGUgZ1tiXX0pO0UoYS53aXRoQ3JlZGVudGlhbHMpJiYhRShlLndpdGhDcmVkZW50aWFscykmJihhLndpdGhDcmVkZW50aWFscz1lLndpdGhDcmVkZW50aWFscyk7cmV0dXJuIHooYSxiLGcpLnRoZW4oYyxjKX0sc10saD1uLndoZW4oZCk7Zm9yKHEodixmdW5jdGlvbihhKXsoYS5yZXF1ZXN0fHxhLnJlcXVlc3RFcnJvcikmJmYudW5zaGlmdChhLnJlcXVlc3QsYS5yZXF1ZXN0RXJyb3IpOyhhLnJlc3BvbnNlfHxhLnJlc3BvbnNlRXJyb3IpJiZmLnB1c2goYS5yZXNwb25zZSxhLnJlc3BvbnNlRXJyb3IpfSk7Zi5sZW5ndGg7KXthPWYuc2hpZnQoKTt2YXIgaz1mLnNoaWZ0KCksaD1oLnRoZW4oYSxrKX1oLnN1Y2Nlc3M9ZnVuY3Rpb24oYSl7aC50aGVuKGZ1bmN0aW9uKGIpe2EoYi5kYXRhLFxuYi5zdGF0dXMsYi5oZWFkZXJzLGQpfSk7cmV0dXJuIGh9O2guZXJyb3I9ZnVuY3Rpb24oYSl7aC50aGVuKG51bGwsZnVuY3Rpb24oYil7YShiLmRhdGEsYi5zdGF0dXMsYi5oZWFkZXJzLGQpfSk7cmV0dXJuIGh9O3JldHVybiBofWZ1bmN0aW9uIHooYixjLGcpe2Z1bmN0aW9uIGYoYSxiLGMsZSl7diYmKDIwMDw9YSYmMzAwPmE/di5wdXQocyxbYSxiLHNjKGMpLGVdKTp2LnJlbW92ZShzKSk7bChiLGEsYyxlKTtkLiQkcGhhc2V8fGQuJGFwcGx5KCl9ZnVuY3Rpb24gbChhLGMsZCxlKXtjPU1hdGgubWF4KGMsMCk7KDIwMDw9YyYmMzAwPmM/cC5yZXNvbHZlOnAucmVqZWN0KSh7ZGF0YTphLHN0YXR1czpjLGhlYWRlcnM6dGMoZCksY29uZmlnOmIsc3RhdHVzVGV4dDplfSl9ZnVuY3Rpb24gaygpe3ZhciBhPWRiKHIucGVuZGluZ1JlcXVlc3RzLGIpOy0xIT09YSYmci5wZW5kaW5nUmVxdWVzdHMuc3BsaWNlKGEsMSl9dmFyIHA9bi5kZWZlcigpLHo9cC5wcm9taXNlLHYscSxzPXUoYi51cmwsXG5iLnBhcmFtcyk7ci5wZW5kaW5nUmVxdWVzdHMucHVzaChiKTt6LnRoZW4oayxrKTsoYi5jYWNoZXx8ZS5jYWNoZSkmJighMSE9PWIuY2FjaGUmJlwiR0VUXCI9PWIubWV0aG9kKSYmKHY9WChiLmNhY2hlKT9iLmNhY2hlOlgoZS5jYWNoZSk/ZS5jYWNoZTpGKTtpZih2KWlmKHE9di5nZXQocyksQihxKSl7aWYocS50aGVuKXJldHVybiBxLnRoZW4oayxrKSxxO00ocSk/bChxWzFdLHFbMF0sYmEocVsyXSkscVszXSk6bChxLDIwMCx7fSxcIk9LXCIpfWVsc2Ugdi5wdXQocyx6KTtFKHEpJiZhKGIubWV0aG9kLHMsYyxmLGcsYi50aW1lb3V0LGIud2l0aENyZWRlbnRpYWxzLGIucmVzcG9uc2VUeXBlKTtyZXR1cm4gen1mdW5jdGlvbiB1KGEsYil7aWYoIWIpcmV0dXJuIGE7dmFyIGM9W107U2MoYixmdW5jdGlvbihhLGIpe251bGw9PT1hfHxFKGEpfHwoTShhKXx8KGE9W2FdKSxxKGEsZnVuY3Rpb24oYSl7WChhKSYmKGE9cWEoYSkpO2MucHVzaCh6YShiKStcIj1cIit6YShhKSl9KSl9KTswPGMubGVuZ3RoJiZcbihhKz0oLTE9PWEuaW5kZXhPZihcIj9cIik/XCI/XCI6XCImXCIpK2Muam9pbihcIiZcIikpO3JldHVybiBhfXZhciBGPWMoXCIkaHR0cFwiKSx2PVtdO3EoZyxmdW5jdGlvbihhKXt2LnVuc2hpZnQodyhhKT9wLmdldChhKTpwLmludm9rZShhKSl9KTtxKGYsZnVuY3Rpb24oYSxiKXt2YXIgYz13KGEpP3AuZ2V0KGEpOnAuaW52b2tlKGEpO3Yuc3BsaWNlKGIsMCx7cmVzcG9uc2U6ZnVuY3Rpb24oYSl7cmV0dXJuIGMobi53aGVuKGEpKX0scmVzcG9uc2VFcnJvcjpmdW5jdGlvbihhKXtyZXR1cm4gYyhuLnJlamVjdChhKSl9fSl9KTtyLnBlbmRpbmdSZXF1ZXN0cz1bXTsoZnVuY3Rpb24oYSl7cShhcmd1bWVudHMsZnVuY3Rpb24oYSl7clthXT1mdW5jdGlvbihiLGMpe3JldHVybiByKEQoY3x8e30se21ldGhvZDphLHVybDpifSkpfX0pfSkoXCJnZXRcIixcImRlbGV0ZVwiLFwiaGVhZFwiLFwianNvbnBcIik7KGZ1bmN0aW9uKGEpe3EoYXJndW1lbnRzLGZ1bmN0aW9uKGEpe3JbYV09ZnVuY3Rpb24oYixjLGQpe3JldHVybiByKEQoZHx8XG57fSx7bWV0aG9kOmEsdXJsOmIsZGF0YTpjfSkpfX0pfSkoXCJwb3N0XCIsXCJwdXRcIik7ci5kZWZhdWx0cz1lO3JldHVybiByfV19ZnVuY3Rpb24gdWUoYil7aWYoOD49UyYmKCFiLm1hdGNoKC9eKGdldHxwb3N0fGhlYWR8cHV0fGRlbGV0ZXxvcHRpb25zKSQvaSl8fCFPLlhNTEh0dHBSZXF1ZXN0KSlyZXR1cm4gbmV3IE8uQWN0aXZlWE9iamVjdChcIk1pY3Jvc29mdC5YTUxIVFRQXCIpO2lmKE8uWE1MSHR0cFJlcXVlc3QpcmV0dXJuIG5ldyBPLlhNTEh0dHBSZXF1ZXN0O3Rocm93IHQoXCIkaHR0cEJhY2tlbmRcIikoXCJub3hoclwiKTt9ZnVuY3Rpb24gVWQoKXt0aGlzLiRnZXQ9W1wiJGJyb3dzZXJcIixcIiR3aW5kb3dcIixcIiRkb2N1bWVudFwiLGZ1bmN0aW9uKGIsYSxjKXtyZXR1cm4gdmUoYix1ZSxiLmRlZmVyLGEuYW5ndWxhci5jYWxsYmFja3MsY1swXSl9XX1mdW5jdGlvbiB2ZShiLGEsYyxkLGUpe2Z1bmN0aW9uIGcoYSxiKXt2YXIgYz1lLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksZD1mdW5jdGlvbigpe2Mub25yZWFkeXN0YXRlY2hhbmdlPVxuYy5vbmxvYWQ9Yy5vbmVycm9yPW51bGw7ZS5ib2R5LnJlbW92ZUNoaWxkKGMpO2ImJmIoKX07Yy50eXBlPVwidGV4dC9qYXZhc2NyaXB0XCI7Yy5zcmM9YTtTJiY4Pj1TP2Mub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7L2xvYWRlZHxjb21wbGV0ZS8udGVzdChjLnJlYWR5U3RhdGUpJiZkKCl9OmMub25sb2FkPWMub25lcnJvcj1mdW5jdGlvbigpe2QoKX07ZS5ib2R5LmFwcGVuZENoaWxkKGMpO3JldHVybiBkfXZhciBmPS0xO3JldHVybiBmdW5jdGlvbihlLGwsayxtLG4scCxyLHope2Z1bmN0aW9uIHUoKXt2PWY7QSYmQSgpO3gmJnguYWJvcnQoKX1mdW5jdGlvbiBGKGEsZCxlLGcsZil7TCYmYy5jYW5jZWwoTCk7QT14PW51bGw7MD09PWQmJihkPWU/MjAwOlwiZmlsZVwiPT1zYShsKS5wcm90b2NvbD80MDQ6MCk7YSgxMjIzPT09ZD8yMDQ6ZCxlLGcsZnx8XCJcIik7Yi4kJGNvbXBsZXRlT3V0c3RhbmRpbmdSZXF1ZXN0KEMpfXZhciB2O2IuJCRpbmNPdXRzdGFuZGluZ1JlcXVlc3RDb3VudCgpO1xubD1sfHxiLnVybCgpO2lmKFwianNvbnBcIj09SyhlKSl7dmFyIEo9XCJfXCIrKGQuY291bnRlcisrKS50b1N0cmluZygzNik7ZFtKXT1mdW5jdGlvbihhKXtkW0pdLmRhdGE9YX07dmFyIEE9ZyhsLnJlcGxhY2UoXCJKU09OX0NBTExCQUNLXCIsXCJhbmd1bGFyLmNhbGxiYWNrcy5cIitKKSxmdW5jdGlvbigpe2RbSl0uZGF0YT9GKG0sMjAwLGRbSl0uZGF0YSk6RihtLHZ8fC0yKTtkW0pdPUVhLm5vb3B9KX1lbHNle3ZhciB4PWEoZSk7eC5vcGVuKGUsbCwhMCk7cShuLGZ1bmN0aW9uKGEsYil7QihhKSYmeC5zZXRSZXF1ZXN0SGVhZGVyKGIsYSl9KTt4Lm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2lmKHgmJjQ9PXgucmVhZHlTdGF0ZSl7dmFyIGE9bnVsbCxiPW51bGw7diE9PWYmJihhPXguZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCksYj1cInJlc3BvbnNlXCJpbiB4P3gucmVzcG9uc2U6eC5yZXNwb25zZVRleHQpO0YobSx2fHx4LnN0YXR1cyxiLGEseC5zdGF0dXNUZXh0fHxcIlwiKX19O3ImJih4LndpdGhDcmVkZW50aWFscz1cbiEwKTtpZih6KXRyeXt4LnJlc3BvbnNlVHlwZT16fWNhdGNoKHMpe2lmKFwianNvblwiIT09eil0aHJvdyBzO314LnNlbmQoa3x8bnVsbCl9aWYoMDxwKXZhciBMPWModSxwKTtlbHNlIHAmJnAudGhlbiYmcC50aGVuKHUpfX1mdW5jdGlvbiBSZCgpe3ZhciBiPVwie3tcIixhPVwifX1cIjt0aGlzLnN0YXJ0U3ltYm9sPWZ1bmN0aW9uKGEpe3JldHVybiBhPyhiPWEsdGhpcyk6Yn07dGhpcy5lbmRTeW1ib2w9ZnVuY3Rpb24oYil7cmV0dXJuIGI/KGE9Yix0aGlzKTphfTt0aGlzLiRnZXQ9W1wiJHBhcnNlXCIsXCIkZXhjZXB0aW9uSGFuZGxlclwiLFwiJHNjZVwiLGZ1bmN0aW9uKGMsZCxlKXtmdW5jdGlvbiBnKGcsayxtKXtmb3IodmFyIG4scCxyPTAsej1bXSx1PWcubGVuZ3RoLEY9ITEsdj1bXTtyPHU7KS0xIT0obj1nLmluZGV4T2YoYixyKSkmJi0xIT0ocD1nLmluZGV4T2YoYSxuK2YpKT8ociE9biYmei5wdXNoKGcuc3Vic3RyaW5nKHIsbikpLHoucHVzaChyPWMoRj1nLnN1YnN0cmluZyhuK2YscCkpKSxcbnIuZXhwPUYscj1wK2gsRj0hMCk6KHIhPXUmJnoucHVzaChnLnN1YnN0cmluZyhyKSkscj11KTsodT16Lmxlbmd0aCl8fCh6LnB1c2goXCJcIiksdT0xKTtpZihtJiYxPHoubGVuZ3RoKXRocm93IHZjKFwibm9jb25jYXRcIixnKTtpZigha3x8RilyZXR1cm4gdi5sZW5ndGg9dSxyPWZ1bmN0aW9uKGEpe3RyeXtmb3IodmFyIGI9MCxjPXUsZjtiPGM7YisrKVwiZnVuY3Rpb25cIj09dHlwZW9mKGY9eltiXSkmJihmPWYoYSksZj1tP2UuZ2V0VHJ1c3RlZChtLGYpOmUudmFsdWVPZihmKSxudWxsPT09Znx8RShmKT9mPVwiXCI6XCJzdHJpbmdcIiE9dHlwZW9mIGYmJihmPXFhKGYpKSksdltiXT1mO3JldHVybiB2LmpvaW4oXCJcIil9Y2F0Y2goaCl7YT12YyhcImludGVyclwiLGcsaC50b1N0cmluZygpKSxkKGEpfX0sci5leHA9ZyxyLnBhcnRzPXoscn12YXIgZj1iLmxlbmd0aCxoPWEubGVuZ3RoO2cuc3RhcnRTeW1ib2w9ZnVuY3Rpb24oKXtyZXR1cm4gYn07Zy5lbmRTeW1ib2w9ZnVuY3Rpb24oKXtyZXR1cm4gYX07XG5yZXR1cm4gZ31dfWZ1bmN0aW9uIFNkKCl7dGhpcy4kZ2V0PVtcIiRyb290U2NvcGVcIixcIiR3aW5kb3dcIixcIiRxXCIsZnVuY3Rpb24oYixhLGMpe2Z1bmN0aW9uIGQoZCxmLGgsbCl7dmFyIGs9YS5zZXRJbnRlcnZhbCxtPWEuY2xlYXJJbnRlcnZhbCxuPWMuZGVmZXIoKSxwPW4ucHJvbWlzZSxyPTAsej1CKGwpJiYhbDtoPUIoaCk/aDowO3AudGhlbihudWxsLG51bGwsZCk7cC4kJGludGVydmFsSWQ9ayhmdW5jdGlvbigpe24ubm90aWZ5KHIrKyk7MDxoJiZyPj1oJiYobi5yZXNvbHZlKHIpLG0ocC4kJGludGVydmFsSWQpLGRlbGV0ZSBlW3AuJCRpbnRlcnZhbElkXSk7enx8Yi4kYXBwbHkoKX0sZik7ZVtwLiQkaW50ZXJ2YWxJZF09bjtyZXR1cm4gcH12YXIgZT17fTtkLmNhbmNlbD1mdW5jdGlvbihhKXtyZXR1cm4gYSYmYS4kJGludGVydmFsSWQgaW4gZT8oZVthLiQkaW50ZXJ2YWxJZF0ucmVqZWN0KFwiY2FuY2VsZWRcIiksY2xlYXJJbnRlcnZhbChhLiQkaW50ZXJ2YWxJZCksZGVsZXRlIGVbYS4kJGludGVydmFsSWRdLFxuITApOiExfTtyZXR1cm4gZH1dfWZ1bmN0aW9uIGFkKCl7dGhpcy4kZ2V0PWZ1bmN0aW9uKCl7cmV0dXJue2lkOlwiZW4tdXNcIixOVU1CRVJfRk9STUFUUzp7REVDSU1BTF9TRVA6XCIuXCIsR1JPVVBfU0VQOlwiLFwiLFBBVFRFUk5TOlt7bWluSW50OjEsbWluRnJhYzowLG1heEZyYWM6Myxwb3NQcmU6XCJcIixwb3NTdWY6XCJcIixuZWdQcmU6XCItXCIsbmVnU3VmOlwiXCIsZ1NpemU6MyxsZ1NpemU6M30se21pbkludDoxLG1pbkZyYWM6MixtYXhGcmFjOjIscG9zUHJlOlwiXFx1MDBhNFwiLHBvc1N1ZjpcIlwiLG5lZ1ByZTpcIihcXHUwMGE0XCIsbmVnU3VmOlwiKVwiLGdTaXplOjMsbGdTaXplOjN9XSxDVVJSRU5DWV9TWU06XCIkXCJ9LERBVEVUSU1FX0ZPUk1BVFM6e01PTlRIOlwiSmFudWFyeSBGZWJydWFyeSBNYXJjaCBBcHJpbCBNYXkgSnVuZSBKdWx5IEF1Z3VzdCBTZXB0ZW1iZXIgT2N0b2JlciBOb3ZlbWJlciBEZWNlbWJlclwiLnNwbGl0KFwiIFwiKSxTSE9SVE1PTlRIOlwiSmFuIEZlYiBNYXIgQXByIE1heSBKdW4gSnVsIEF1ZyBTZXAgT2N0IE5vdiBEZWNcIi5zcGxpdChcIiBcIiksXG5EQVk6XCJTdW5kYXkgTW9uZGF5IFR1ZXNkYXkgV2VkbmVzZGF5IFRodXJzZGF5IEZyaWRheSBTYXR1cmRheVwiLnNwbGl0KFwiIFwiKSxTSE9SVERBWTpcIlN1biBNb24gVHVlIFdlZCBUaHUgRnJpIFNhdFwiLnNwbGl0KFwiIFwiKSxBTVBNUzpbXCJBTVwiLFwiUE1cIl0sbWVkaXVtOlwiTU1NIGQsIHkgaDptbTpzcyBhXCIsXCJzaG9ydFwiOlwiTS9kL3l5IGg6bW0gYVwiLGZ1bGxEYXRlOlwiRUVFRSwgTU1NTSBkLCB5XCIsbG9uZ0RhdGU6XCJNTU1NIGQsIHlcIixtZWRpdW1EYXRlOlwiTU1NIGQsIHlcIixzaG9ydERhdGU6XCJNL2QveXlcIixtZWRpdW1UaW1lOlwiaDptbTpzcyBhXCIsc2hvcnRUaW1lOlwiaDptbSBhXCJ9LHBsdXJhbENhdDpmdW5jdGlvbihiKXtyZXR1cm4gMT09PWI/XCJvbmVcIjpcIm90aGVyXCJ9fX19ZnVuY3Rpb24gd2MoYil7Yj1iLnNwbGl0KFwiL1wiKTtmb3IodmFyIGE9Yi5sZW5ndGg7YS0tOyliW2FdPXdiKGJbYV0pO3JldHVybiBiLmpvaW4oXCIvXCIpfWZ1bmN0aW9uIHhjKGIsYSxjKXtiPXNhKGIsYyk7YS4kJHByb3RvY29sPVxuYi5wcm90b2NvbDthLiQkaG9zdD1iLmhvc3RuYW1lO2EuJCRwb3J0PVkoYi5wb3J0KXx8d2VbYi5wcm90b2NvbF18fG51bGx9ZnVuY3Rpb24geWMoYixhLGMpe3ZhciBkPVwiL1wiIT09Yi5jaGFyQXQoMCk7ZCYmKGI9XCIvXCIrYik7Yj1zYShiLGMpO2EuJCRwYXRoPWRlY29kZVVSSUNvbXBvbmVudChkJiZcIi9cIj09PWIucGF0aG5hbWUuY2hhckF0KDApP2IucGF0aG5hbWUuc3Vic3RyaW5nKDEpOmIucGF0aG5hbWUpO2EuJCRzZWFyY2g9WWIoYi5zZWFyY2gpO2EuJCRoYXNoPWRlY29kZVVSSUNvbXBvbmVudChiLmhhc2gpO2EuJCRwYXRoJiZcIi9cIiE9YS4kJHBhdGguY2hhckF0KDApJiYoYS4kJHBhdGg9XCIvXCIrYS4kJHBhdGgpfWZ1bmN0aW9uIG9hKGIsYSl7aWYoMD09PWEuaW5kZXhPZihiKSlyZXR1cm4gYS5zdWJzdHIoYi5sZW5ndGgpfWZ1bmN0aW9uIFlhKGIpe3ZhciBhPWIuaW5kZXhPZihcIiNcIik7cmV0dXJuLTE9PWE/YjpiLnN1YnN0cigwLGEpfWZ1bmN0aW9uIEpiKGIpe3JldHVybiBiLnN1YnN0cigwLFxuWWEoYikubGFzdEluZGV4T2YoXCIvXCIpKzEpfWZ1bmN0aW9uIHpjKGIsYSl7dGhpcy4kJGh0bWw1PSEwO2E9YXx8XCJcIjt2YXIgYz1KYihiKTt4YyhiLHRoaXMsYik7dGhpcy4kJHBhcnNlPWZ1bmN0aW9uKGEpe3ZhciBlPW9hKGMsYSk7aWYoIXcoZSkpdGhyb3cgS2IoXCJpcHRocHJmeFwiLGEsYyk7eWMoZSx0aGlzLGIpO3RoaXMuJCRwYXRofHwodGhpcy4kJHBhdGg9XCIvXCIpO3RoaXMuJCRjb21wb3NlKCl9O3RoaXMuJCRjb21wb3NlPWZ1bmN0aW9uKCl7dmFyIGE9WmIodGhpcy4kJHNlYXJjaCksYj10aGlzLiQkaGFzaD9cIiNcIit3Yih0aGlzLiQkaGFzaCk6XCJcIjt0aGlzLiQkdXJsPXdjKHRoaXMuJCRwYXRoKSsoYT9cIj9cIithOlwiXCIpK2I7dGhpcy4kJGFic1VybD1jK3RoaXMuJCR1cmwuc3Vic3RyKDEpfTt0aGlzLiQkcmV3cml0ZT1mdW5jdGlvbihkKXt2YXIgZTtpZigoZT1vYShiLGQpKSE9PXMpcmV0dXJuIGQ9ZSwoZT1vYShhLGUpKSE9PXM/Yysob2EoXCIvXCIsZSl8fGUpOmIrZDtpZigoZT1vYShjLFxuZCkpIT09cylyZXR1cm4gYytlO2lmKGM9PWQrXCIvXCIpcmV0dXJuIGN9fWZ1bmN0aW9uIExiKGIsYSl7dmFyIGM9SmIoYik7eGMoYix0aGlzLGIpO3RoaXMuJCRwYXJzZT1mdW5jdGlvbihkKXt2YXIgZT1vYShiLGQpfHxvYShjLGQpLGU9XCIjXCI9PWUuY2hhckF0KDApP29hKGEsZSk6dGhpcy4kJGh0bWw1P2U6XCJcIjtpZighdyhlKSl0aHJvdyBLYihcImloc2hwcmZ4XCIsZCxhKTt5YyhlLHRoaXMsYik7ZD10aGlzLiQkcGF0aDt2YXIgZz0vXlxcLz8uKj86KFxcLy4qKS87MD09PWUuaW5kZXhPZihiKSYmKGU9ZS5yZXBsYWNlKGIsXCJcIikpO2cuZXhlYyhlKXx8KGQ9KGU9Zy5leGVjKGQpKT9lWzFdOmQpO3RoaXMuJCRwYXRoPWQ7dGhpcy4kJGNvbXBvc2UoKX07dGhpcy4kJGNvbXBvc2U9ZnVuY3Rpb24oKXt2YXIgYz1aYih0aGlzLiQkc2VhcmNoKSxlPXRoaXMuJCRoYXNoP1wiI1wiK3diKHRoaXMuJCRoYXNoKTpcIlwiO3RoaXMuJCR1cmw9d2ModGhpcy4kJHBhdGgpKyhjP1wiP1wiK2M6XCJcIikrZTt0aGlzLiQkYWJzVXJsPVxuYisodGhpcy4kJHVybD9hK3RoaXMuJCR1cmw6XCJcIil9O3RoaXMuJCRyZXdyaXRlPWZ1bmN0aW9uKGEpe2lmKFlhKGIpPT1ZYShhKSlyZXR1cm4gYX19ZnVuY3Rpb24gQWMoYixhKXt0aGlzLiQkaHRtbDU9ITA7TGIuYXBwbHkodGhpcyxhcmd1bWVudHMpO3ZhciBjPUpiKGIpO3RoaXMuJCRyZXdyaXRlPWZ1bmN0aW9uKGQpe3ZhciBlO2lmKGI9PVlhKGQpKXJldHVybiBkO2lmKGU9b2EoYyxkKSlyZXR1cm4gYithK2U7aWYoYz09PWQrXCIvXCIpcmV0dXJuIGN9fWZ1bmN0aW9uIG5iKGIpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0aGlzW2JdfX1mdW5jdGlvbiBCYyhiLGEpe3JldHVybiBmdW5jdGlvbihjKXtpZihFKGMpKXJldHVybiB0aGlzW2JdO3RoaXNbYl09YShjKTt0aGlzLiQkY29tcG9zZSgpO3JldHVybiB0aGlzfX1mdW5jdGlvbiBWZCgpe3ZhciBiPVwiXCIsYT0hMTt0aGlzLmhhc2hQcmVmaXg9ZnVuY3Rpb24oYSl7cmV0dXJuIEIoYSk/KGI9YSx0aGlzKTpifTt0aGlzLmh0bWw1TW9kZT1cbmZ1bmN0aW9uKGIpe3JldHVybiBCKGIpPyhhPWIsdGhpcyk6YX07dGhpcy4kZ2V0PVtcIiRyb290U2NvcGVcIixcIiRicm93c2VyXCIsXCIkc25pZmZlclwiLFwiJHJvb3RFbGVtZW50XCIsZnVuY3Rpb24oYyxkLGUsZyl7ZnVuY3Rpb24gZihhKXtjLiRicm9hZGNhc3QoXCIkbG9jYXRpb25DaGFuZ2VTdWNjZXNzXCIsaC5hYnNVcmwoKSxhKX12YXIgaCxsPWQuYmFzZUhyZWYoKSxrPWQudXJsKCk7YT8obD1rLnN1YnN0cmluZygwLGsuaW5kZXhPZihcIi9cIixrLmluZGV4T2YoXCIvL1wiKSsyKSkrKGx8fFwiL1wiKSxlPWUuaGlzdG9yeT96YzpBYyk6KGw9WWEoayksZT1MYik7aD1uZXcgZShsLFwiI1wiK2IpO2guJCRwYXJzZShoLiQkcmV3cml0ZShrKSk7Zy5vbihcImNsaWNrXCIsZnVuY3Rpb24oYSl7aWYoIWEuY3RybEtleSYmIWEubWV0YUtleSYmMiE9YS53aGljaCl7Zm9yKHZhciBiPXkoYS50YXJnZXQpO1wiYVwiIT09SyhiWzBdLm5vZGVOYW1lKTspaWYoYlswXT09PWdbMF18fCEoYj1iLnBhcmVudCgpKVswXSlyZXR1cm47XG52YXIgZT1iLnByb3AoXCJocmVmXCIpO1goZSkmJlwiW29iamVjdCBTVkdBbmltYXRlZFN0cmluZ11cIj09PWUudG9TdHJpbmcoKSYmKGU9c2EoZS5hbmltVmFsKS5ocmVmKTt2YXIgZj1oLiQkcmV3cml0ZShlKTtlJiYoIWIuYXR0cihcInRhcmdldFwiKSYmZiYmIWEuaXNEZWZhdWx0UHJldmVudGVkKCkpJiYoYS5wcmV2ZW50RGVmYXVsdCgpLGYhPWQudXJsKCkmJihoLiQkcGFyc2UoZiksYy4kYXBwbHkoKSxPLmFuZ3VsYXJbXCJmZi02ODQyMDgtcHJldmVudERlZmF1bHRcIl09ITApKX19KTtoLmFic1VybCgpIT1rJiZkLnVybChoLmFic1VybCgpLCEwKTtkLm9uVXJsQ2hhbmdlKGZ1bmN0aW9uKGEpe2guYWJzVXJsKCkhPWEmJihjLiRldmFsQXN5bmMoZnVuY3Rpb24oKXt2YXIgYj1oLmFic1VybCgpO2guJCRwYXJzZShhKTtjLiRicm9hZGNhc3QoXCIkbG9jYXRpb25DaGFuZ2VTdGFydFwiLGEsYikuZGVmYXVsdFByZXZlbnRlZD8oaC4kJHBhcnNlKGIpLGQudXJsKGIpKTpmKGIpfSksYy4kJHBoYXNlfHxcbmMuJGRpZ2VzdCgpKX0pO3ZhciBtPTA7Yy4kd2F0Y2goZnVuY3Rpb24oKXt2YXIgYT1kLnVybCgpLGI9aC4kJHJlcGxhY2U7bSYmYT09aC5hYnNVcmwoKXx8KG0rKyxjLiRldmFsQXN5bmMoZnVuY3Rpb24oKXtjLiRicm9hZGNhc3QoXCIkbG9jYXRpb25DaGFuZ2VTdGFydFwiLGguYWJzVXJsKCksYSkuZGVmYXVsdFByZXZlbnRlZD9oLiQkcGFyc2UoYSk6KGQudXJsKGguYWJzVXJsKCksYiksZihhKSl9KSk7aC4kJHJlcGxhY2U9ITE7cmV0dXJuIG19KTtyZXR1cm4gaH1dfWZ1bmN0aW9uIFdkKCl7dmFyIGI9ITAsYT10aGlzO3RoaXMuZGVidWdFbmFibGVkPWZ1bmN0aW9uKGEpe3JldHVybiBCKGEpPyhiPWEsdGhpcyk6Yn07dGhpcy4kZ2V0PVtcIiR3aW5kb3dcIixmdW5jdGlvbihjKXtmdW5jdGlvbiBkKGEpe2EgaW5zdGFuY2VvZiBFcnJvciYmKGEuc3RhY2s/YT1hLm1lc3NhZ2UmJi0xPT09YS5zdGFjay5pbmRleE9mKGEubWVzc2FnZSk/XCJFcnJvcjogXCIrYS5tZXNzYWdlK1wiXFxuXCIrYS5zdGFjazpcbmEuc3RhY2s6YS5zb3VyY2VVUkwmJihhPWEubWVzc2FnZStcIlxcblwiK2Euc291cmNlVVJMK1wiOlwiK2EubGluZSkpO3JldHVybiBhfWZ1bmN0aW9uIGUoYSl7dmFyIGI9Yy5jb25zb2xlfHx7fSxlPWJbYV18fGIubG9nfHxDO2E9ITE7dHJ5e2E9ISFlLmFwcGx5fWNhdGNoKGwpe31yZXR1cm4gYT9mdW5jdGlvbigpe3ZhciBhPVtdO3EoYXJndW1lbnRzLGZ1bmN0aW9uKGIpe2EucHVzaChkKGIpKX0pO3JldHVybiBlLmFwcGx5KGIsYSl9OmZ1bmN0aW9uKGEsYil7ZShhLG51bGw9PWI/XCJcIjpiKX19cmV0dXJue2xvZzplKFwibG9nXCIpLGluZm86ZShcImluZm9cIiksd2FybjplKFwid2FyblwiKSxlcnJvcjplKFwiZXJyb3JcIiksZGVidWc6ZnVuY3Rpb24oKXt2YXIgYz1lKFwiZGVidWdcIik7cmV0dXJuIGZ1bmN0aW9uKCl7YiYmYy5hcHBseShhLGFyZ3VtZW50cyl9fSgpfX1dfWZ1bmN0aW9uIGZhKGIsYSl7aWYoXCJjb25zdHJ1Y3RvclwiPT09Yil0aHJvdyBCYShcImlzZWNmbGRcIixhKTtyZXR1cm4gYn1mdW5jdGlvbiBaYShiLFxuYSl7aWYoYil7aWYoYi5jb25zdHJ1Y3Rvcj09PWIpdGhyb3cgQmEoXCJpc2VjZm5cIixhKTtpZihiLmRvY3VtZW50JiZiLmxvY2F0aW9uJiZiLmFsZXJ0JiZiLnNldEludGVydmFsKXRocm93IEJhKFwiaXNlY3dpbmRvd1wiLGEpO2lmKGIuY2hpbGRyZW4mJihiLm5vZGVOYW1lfHxiLnByb3AmJmIuYXR0ciYmYi5maW5kKSl0aHJvdyBCYShcImlzZWNkb21cIixhKTt9cmV0dXJuIGJ9ZnVuY3Rpb24gb2IoYixhLGMsZCxlKXtlPWV8fHt9O2E9YS5zcGxpdChcIi5cIik7Zm9yKHZhciBnLGY9MDsxPGEubGVuZ3RoO2YrKyl7Zz1mYShhLnNoaWZ0KCksZCk7dmFyIGg9YltnXTtofHwoaD17fSxiW2ddPWgpO2I9aDtiLnRoZW4mJmUudW53cmFwUHJvbWlzZXMmJih0YShkKSxcIiQkdlwiaW4gYnx8ZnVuY3Rpb24oYSl7YS50aGVuKGZ1bmN0aW9uKGIpe2EuJCR2PWJ9KX0oYiksYi4kJHY9PT1zJiYoYi4kJHY9e30pLGI9Yi4kJHYpfWc9ZmEoYS5zaGlmdCgpLGQpO3JldHVybiBiW2ddPWN9ZnVuY3Rpb24gQ2MoYixcbmEsYyxkLGUsZyxmKXtmYShiLGcpO2ZhKGEsZyk7ZmEoYyxnKTtmYShkLGcpO2ZhKGUsZyk7cmV0dXJuIGYudW53cmFwUHJvbWlzZXM/ZnVuY3Rpb24oZixsKXt2YXIgaz1sJiZsLmhhc093blByb3BlcnR5KGIpP2w6ZixtO2lmKG51bGw9PWspcmV0dXJuIGs7KGs9a1tiXSkmJmsudGhlbiYmKHRhKGcpLFwiJCR2XCJpbiBrfHwobT1rLG0uJCR2PXMsbS50aGVuKGZ1bmN0aW9uKGEpe20uJCR2PWF9KSksaz1rLiQkdik7aWYoIWEpcmV0dXJuIGs7aWYobnVsbD09aylyZXR1cm4gczsoaz1rW2FdKSYmay50aGVuJiYodGEoZyksXCIkJHZcImluIGt8fChtPWssbS4kJHY9cyxtLnRoZW4oZnVuY3Rpb24oYSl7bS4kJHY9YX0pKSxrPWsuJCR2KTtpZighYylyZXR1cm4gaztpZihudWxsPT1rKXJldHVybiBzOyhrPWtbY10pJiZrLnRoZW4mJih0YShnKSxcIiQkdlwiaW4ga3x8KG09ayxtLiQkdj1zLG0udGhlbihmdW5jdGlvbihhKXttLiQkdj1hfSkpLGs9ay4kJHYpO2lmKCFkKXJldHVybiBrO2lmKG51bGw9PVxuaylyZXR1cm4gczsoaz1rW2RdKSYmay50aGVuJiYodGEoZyksXCIkJHZcImluIGt8fChtPWssbS4kJHY9cyxtLnRoZW4oZnVuY3Rpb24oYSl7bS4kJHY9YX0pKSxrPWsuJCR2KTtpZighZSlyZXR1cm4gaztpZihudWxsPT1rKXJldHVybiBzOyhrPWtbZV0pJiZrLnRoZW4mJih0YShnKSxcIiQkdlwiaW4ga3x8KG09ayxtLiQkdj1zLG0udGhlbihmdW5jdGlvbihhKXttLiQkdj1hfSkpLGs9ay4kJHYpO3JldHVybiBrfTpmdW5jdGlvbihnLGYpe3ZhciBrPWYmJmYuaGFzT3duUHJvcGVydHkoYik/ZjpnO2lmKG51bGw9PWspcmV0dXJuIGs7az1rW2JdO2lmKCFhKXJldHVybiBrO2lmKG51bGw9PWspcmV0dXJuIHM7az1rW2FdO2lmKCFjKXJldHVybiBrO2lmKG51bGw9PWspcmV0dXJuIHM7az1rW2NdO2lmKCFkKXJldHVybiBrO2lmKG51bGw9PWspcmV0dXJuIHM7az1rW2RdO3JldHVybiBlP251bGw9PWs/czprPWtbZV06a319ZnVuY3Rpb24geGUoYixhKXtmYShiLGEpO3JldHVybiBmdW5jdGlvbihhLFxuZCl7cmV0dXJuIG51bGw9PWE/czooZCYmZC5oYXNPd25Qcm9wZXJ0eShiKT9kOmEpW2JdfX1mdW5jdGlvbiB5ZShiLGEsYyl7ZmEoYixjKTtmYShhLGMpO3JldHVybiBmdW5jdGlvbihjLGUpe2lmKG51bGw9PWMpcmV0dXJuIHM7Yz0oZSYmZS5oYXNPd25Qcm9wZXJ0eShiKT9lOmMpW2JdO3JldHVybiBudWxsPT1jP3M6Y1thXX19ZnVuY3Rpb24gRGMoYixhLGMpe2lmKE1iLmhhc093blByb3BlcnR5KGIpKXJldHVybiBNYltiXTt2YXIgZD1iLnNwbGl0KFwiLlwiKSxlPWQubGVuZ3RoLGc7aWYoYS51bndyYXBQcm9taXNlc3x8MSE9PWUpaWYoYS51bndyYXBQcm9taXNlc3x8MiE9PWUpaWYoYS5jc3ApZz02PmU/Q2MoZFswXSxkWzFdLGRbMl0sZFszXSxkWzRdLGMsYSk6ZnVuY3Rpb24oYixnKXt2YXIgZj0wLGg7ZG8gaD1DYyhkW2YrK10sZFtmKytdLGRbZisrXSxkW2YrK10sZFtmKytdLGMsYSkoYixnKSxnPXMsYj1oO3doaWxlKGY8ZSk7cmV0dXJuIGh9O2Vsc2V7dmFyIGY9XCJ2YXIgcDtcXG5cIjtcbnEoZCxmdW5jdGlvbihiLGQpe2ZhKGIsYyk7Zis9XCJpZihzID09IG51bGwpIHJldHVybiB1bmRlZmluZWQ7XFxucz1cIisoZD9cInNcIjonKChrJiZrLmhhc093blByb3BlcnR5KFwiJytiKydcIikpP2s6cyknKSsnW1wiJytiKydcIl07XFxuJysoYS51bndyYXBQcm9taXNlcz8naWYgKHMgJiYgcy50aGVuKSB7XFxuIHB3KFwiJytjLnJlcGxhY2UoLyhbXCJcXHJcXG5dKS9nLFwiXFxcXCQxXCIpKydcIik7XFxuIGlmICghKFwiJCR2XCIgaW4gcykpIHtcXG4gcD1zO1xcbiBwLiQkdiA9IHVuZGVmaW5lZDtcXG4gcC50aGVuKGZ1bmN0aW9uKHYpIHtwLiQkdj12O30pO1xcbn1cXG4gcz1zLiQkdlxcbn1cXG4nOlwiXCIpfSk7dmFyIGY9ZitcInJldHVybiBzO1wiLGg9bmV3IEZ1bmN0aW9uKFwic1wiLFwia1wiLFwicHdcIixmKTtoLnRvU3RyaW5nPWFhKGYpO2c9YS51bndyYXBQcm9taXNlcz9mdW5jdGlvbihhLGIpe3JldHVybiBoKGEsYix0YSl9Omh9ZWxzZSBnPXllKGRbMF0sZFsxXSxjKTtlbHNlIGc9eGUoZFswXSxjKTtcImhhc093blByb3BlcnR5XCIhPT1cbmImJihNYltiXT1nKTtyZXR1cm4gZ31mdW5jdGlvbiBYZCgpe3ZhciBiPXt9LGE9e2NzcDohMSx1bndyYXBQcm9taXNlczohMSxsb2dQcm9taXNlV2FybmluZ3M6ITB9O3RoaXMudW53cmFwUHJvbWlzZXM9ZnVuY3Rpb24oYil7cmV0dXJuIEIoYik/KGEudW53cmFwUHJvbWlzZXM9ISFiLHRoaXMpOmEudW53cmFwUHJvbWlzZXN9O3RoaXMubG9nUHJvbWlzZVdhcm5pbmdzPWZ1bmN0aW9uKGIpe3JldHVybiBCKGIpPyhhLmxvZ1Byb21pc2VXYXJuaW5ncz1iLHRoaXMpOmEubG9nUHJvbWlzZVdhcm5pbmdzfTt0aGlzLiRnZXQ9W1wiJGZpbHRlclwiLFwiJHNuaWZmZXJcIixcIiRsb2dcIixmdW5jdGlvbihjLGQsZSl7YS5jc3A9ZC5jc3A7dGE9ZnVuY3Rpb24oYil7YS5sb2dQcm9taXNlV2FybmluZ3MmJiFFYy5oYXNPd25Qcm9wZXJ0eShiKSYmKEVjW2JdPSEwLGUud2FybihcIlskcGFyc2VdIFByb21pc2UgZm91bmQgaW4gdGhlIGV4cHJlc3Npb24gYFwiK2IrXCJgLiBBdXRvbWF0aWMgdW53cmFwcGluZyBvZiBwcm9taXNlcyBpbiBBbmd1bGFyIGV4cHJlc3Npb25zIGlzIGRlcHJlY2F0ZWQuXCIpKX07XG5yZXR1cm4gZnVuY3Rpb24oZCl7dmFyIGU7c3dpdGNoKHR5cGVvZiBkKXtjYXNlIFwic3RyaW5nXCI6aWYoYi5oYXNPd25Qcm9wZXJ0eShkKSlyZXR1cm4gYltkXTtlPW5ldyBOYihhKTtlPShuZXcgJGEoZSxjLGEpKS5wYXJzZShkLCExKTtcImhhc093blByb3BlcnR5XCIhPT1kJiYoYltkXT1lKTtyZXR1cm4gZTtjYXNlIFwiZnVuY3Rpb25cIjpyZXR1cm4gZDtkZWZhdWx0OnJldHVybiBDfX19XX1mdW5jdGlvbiBaZCgpe3RoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkZXhjZXB0aW9uSGFuZGxlclwiLGZ1bmN0aW9uKGIsYSl7cmV0dXJuIHplKGZ1bmN0aW9uKGEpe2IuJGV2YWxBc3luYyhhKX0sYSl9XX1mdW5jdGlvbiB6ZShiLGEpe2Z1bmN0aW9uIGMoYSl7cmV0dXJuIGF9ZnVuY3Rpb24gZChhKXtyZXR1cm4gZihhKX12YXIgZT1mdW5jdGlvbigpe3ZhciBmPVtdLGssbTtyZXR1cm4gbT17cmVzb2x2ZTpmdW5jdGlvbihhKXtpZihmKXt2YXIgYz1mO2Y9cztrPWcoYSk7Yy5sZW5ndGgmJmIoZnVuY3Rpb24oKXtmb3IodmFyIGEsXG5iPTAsZD1jLmxlbmd0aDtiPGQ7YisrKWE9Y1tiXSxrLnRoZW4oYVswXSxhWzFdLGFbMl0pfSl9fSxyZWplY3Q6ZnVuY3Rpb24oYSl7bS5yZXNvbHZlKGgoYSkpfSxub3RpZnk6ZnVuY3Rpb24oYSl7aWYoZil7dmFyIGM9ZjtmLmxlbmd0aCYmYihmdW5jdGlvbigpe2Zvcih2YXIgYixkPTAsZT1jLmxlbmd0aDtkPGU7ZCsrKWI9Y1tkXSxiWzJdKGEpfSl9fSxwcm9taXNlOnt0aGVuOmZ1bmN0aW9uKGIsZyxoKXt2YXIgbT1lKCksdT1mdW5jdGlvbihkKXt0cnl7bS5yZXNvbHZlKChQKGIpP2I6YykoZCkpfWNhdGNoKGUpe20ucmVqZWN0KGUpLGEoZSl9fSxGPWZ1bmN0aW9uKGIpe3RyeXttLnJlc29sdmUoKFAoZyk/ZzpkKShiKSl9Y2F0Y2goYyl7bS5yZWplY3QoYyksYShjKX19LHY9ZnVuY3Rpb24oYil7dHJ5e20ubm90aWZ5KChQKGgpP2g6YykoYikpfWNhdGNoKGQpe2EoZCl9fTtmP2YucHVzaChbdSxGLHZdKTprLnRoZW4odSxGLHYpO3JldHVybiBtLnByb21pc2V9LFwiY2F0Y2hcIjpmdW5jdGlvbihhKXtyZXR1cm4gdGhpcy50aGVuKG51bGwsXG5hKX0sXCJmaW5hbGx5XCI6ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gYihhLGMpe3ZhciBkPWUoKTtjP2QucmVzb2x2ZShhKTpkLnJlamVjdChhKTtyZXR1cm4gZC5wcm9taXNlfWZ1bmN0aW9uIGQoZSxnKXt2YXIgZj1udWxsO3RyeXtmPShhfHxjKSgpfWNhdGNoKGgpe3JldHVybiBiKGgsITEpfXJldHVybiBmJiZQKGYudGhlbik/Zi50aGVuKGZ1bmN0aW9uKCl7cmV0dXJuIGIoZSxnKX0sZnVuY3Rpb24oYSl7cmV0dXJuIGIoYSwhMSl9KTpiKGUsZyl9cmV0dXJuIHRoaXMudGhlbihmdW5jdGlvbihhKXtyZXR1cm4gZChhLCEwKX0sZnVuY3Rpb24oYSl7cmV0dXJuIGQoYSwhMSl9KX19fX0sZz1mdW5jdGlvbihhKXtyZXR1cm4gYSYmUChhLnRoZW4pP2E6e3RoZW46ZnVuY3Rpb24oYyl7dmFyIGQ9ZSgpO2IoZnVuY3Rpb24oKXtkLnJlc29sdmUoYyhhKSl9KTtyZXR1cm4gZC5wcm9taXNlfX19LGY9ZnVuY3Rpb24oYSl7dmFyIGI9ZSgpO2IucmVqZWN0KGEpO3JldHVybiBiLnByb21pc2V9LGg9ZnVuY3Rpb24oYyl7cmV0dXJue3RoZW46ZnVuY3Rpb24oZyxcbmYpe3ZhciBoPWUoKTtiKGZ1bmN0aW9uKCl7dHJ5e2gucmVzb2x2ZSgoUChmKT9mOmQpKGMpKX1jYXRjaChiKXtoLnJlamVjdChiKSxhKGIpfX0pO3JldHVybiBoLnByb21pc2V9fX07cmV0dXJue2RlZmVyOmUscmVqZWN0OmYsd2hlbjpmdW5jdGlvbihoLGssbSxuKXt2YXIgcD1lKCkscix6PWZ1bmN0aW9uKGIpe3RyeXtyZXR1cm4oUChrKT9rOmMpKGIpfWNhdGNoKGQpe3JldHVybiBhKGQpLGYoZCl9fSx1PWZ1bmN0aW9uKGIpe3RyeXtyZXR1cm4oUChtKT9tOmQpKGIpfWNhdGNoKGMpe3JldHVybiBhKGMpLGYoYyl9fSxGPWZ1bmN0aW9uKGIpe3RyeXtyZXR1cm4oUChuKT9uOmMpKGIpfWNhdGNoKGQpe2EoZCl9fTtiKGZ1bmN0aW9uKCl7ZyhoKS50aGVuKGZ1bmN0aW9uKGEpe3J8fChyPSEwLHAucmVzb2x2ZShnKGEpLnRoZW4oeix1LEYpKSl9LGZ1bmN0aW9uKGEpe3J8fChyPSEwLHAucmVzb2x2ZSh1KGEpKSl9LGZ1bmN0aW9uKGEpe3J8fHAubm90aWZ5KEYoYSkpfSl9KTtyZXR1cm4gcC5wcm9taXNlfSxcbmFsbDpmdW5jdGlvbihhKXt2YXIgYj1lKCksYz0wLGQ9TShhKT9bXTp7fTtxKGEsZnVuY3Rpb24oYSxlKXtjKys7ZyhhKS50aGVuKGZ1bmN0aW9uKGEpe2QuaGFzT3duUHJvcGVydHkoZSl8fChkW2VdPWEsLS1jfHxiLnJlc29sdmUoZCkpfSxmdW5jdGlvbihhKXtkLmhhc093blByb3BlcnR5KGUpfHxiLnJlamVjdChhKX0pfSk7MD09PWMmJmIucmVzb2x2ZShkKTtyZXR1cm4gYi5wcm9taXNlfX19ZnVuY3Rpb24gZmUoKXt0aGlzLiRnZXQ9W1wiJHdpbmRvd1wiLFwiJHRpbWVvdXRcIixmdW5jdGlvbihiLGEpe3ZhciBjPWIucmVxdWVzdEFuaW1hdGlvbkZyYW1lfHxiLndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZXx8Yi5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWUsZD1iLmNhbmNlbEFuaW1hdGlvbkZyYW1lfHxiLndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lfHxiLm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lfHxiLndlYmtpdENhbmNlbFJlcXVlc3RBbmltYXRpb25GcmFtZSxlPSEhYyxnPWU/XG5mdW5jdGlvbihhKXt2YXIgYj1jKGEpO3JldHVybiBmdW5jdGlvbigpe2QoYil9fTpmdW5jdGlvbihiKXt2YXIgYz1hKGIsMTYuNjYsITEpO3JldHVybiBmdW5jdGlvbigpe2EuY2FuY2VsKGMpfX07Zy5zdXBwb3J0ZWQ9ZTtyZXR1cm4gZ31dfWZ1bmN0aW9uIFlkKCl7dmFyIGI9MTAsYT10KFwiJHJvb3RTY29wZVwiKSxjPW51bGw7dGhpcy5kaWdlc3RUdGw9ZnVuY3Rpb24oYSl7YXJndW1lbnRzLmxlbmd0aCYmKGI9YSk7cmV0dXJuIGJ9O3RoaXMuJGdldD1bXCIkaW5qZWN0b3JcIixcIiRleGNlcHRpb25IYW5kbGVyXCIsXCIkcGFyc2VcIixcIiRicm93c2VyXCIsZnVuY3Rpb24oZCxlLGcsZil7ZnVuY3Rpb24gaCgpe3RoaXMuJGlkPWJiKCk7dGhpcy4kJHBoYXNlPXRoaXMuJHBhcmVudD10aGlzLiQkd2F0Y2hlcnM9dGhpcy4kJG5leHRTaWJsaW5nPXRoaXMuJCRwcmV2U2libGluZz10aGlzLiQkY2hpbGRIZWFkPXRoaXMuJCRjaGlsZFRhaWw9bnVsbDt0aGlzW1widGhpc1wiXT10aGlzLiRyb290PXRoaXM7XG50aGlzLiQkZGVzdHJveWVkPSExO3RoaXMuJCRhc3luY1F1ZXVlPVtdO3RoaXMuJCRwb3N0RGlnZXN0UXVldWU9W107dGhpcy4kJGxpc3RlbmVycz17fTt0aGlzLiQkbGlzdGVuZXJDb3VudD17fTt0aGlzLiQkaXNvbGF0ZUJpbmRpbmdzPXt9fWZ1bmN0aW9uIGwoYil7aWYocC4kJHBoYXNlKXRocm93IGEoXCJpbnByb2dcIixwLiQkcGhhc2UpO3AuJCRwaGFzZT1ifWZ1bmN0aW9uIGsoYSxiKXt2YXIgYz1nKGEpO1JhKGMsYik7cmV0dXJuIGN9ZnVuY3Rpb24gbShhLGIsYyl7ZG8gYS4kJGxpc3RlbmVyQ291bnRbY10tPWIsMD09PWEuJCRsaXN0ZW5lckNvdW50W2NdJiZkZWxldGUgYS4kJGxpc3RlbmVyQ291bnRbY107d2hpbGUoYT1hLiRwYXJlbnQpfWZ1bmN0aW9uIG4oKXt9aC5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOmgsJG5ldzpmdW5jdGlvbihhKXthPyhhPW5ldyBoLGEuJHJvb3Q9dGhpcy4kcm9vdCxhLiQkYXN5bmNRdWV1ZT10aGlzLiQkYXN5bmNRdWV1ZSxhLiQkcG9zdERpZ2VzdFF1ZXVlPVxudGhpcy4kJHBvc3REaWdlc3RRdWV1ZSk6KGE9ZnVuY3Rpb24oKXt9LGEucHJvdG90eXBlPXRoaXMsYT1uZXcgYSxhLiRpZD1iYigpKTthW1widGhpc1wiXT1hO2EuJCRsaXN0ZW5lcnM9e307YS4kJGxpc3RlbmVyQ291bnQ9e307YS4kcGFyZW50PXRoaXM7YS4kJHdhdGNoZXJzPWEuJCRuZXh0U2libGluZz1hLiQkY2hpbGRIZWFkPWEuJCRjaGlsZFRhaWw9bnVsbDthLiQkcHJldlNpYmxpbmc9dGhpcy4kJGNoaWxkVGFpbDt0aGlzLiQkY2hpbGRIZWFkP3RoaXMuJCRjaGlsZFRhaWw9dGhpcy4kJGNoaWxkVGFpbC4kJG5leHRTaWJsaW5nPWE6dGhpcy4kJGNoaWxkSGVhZD10aGlzLiQkY2hpbGRUYWlsPWE7cmV0dXJuIGF9LCR3YXRjaDpmdW5jdGlvbihhLGIsZCl7dmFyIGU9ayhhLFwid2F0Y2hcIiksZz10aGlzLiQkd2F0Y2hlcnMsZj17Zm46YixsYXN0Om4sZ2V0OmUsZXhwOmEsZXE6ISFkfTtjPW51bGw7aWYoIVAoYikpe3ZhciBoPWsoYnx8QyxcImxpc3RlbmVyXCIpO2YuZm49ZnVuY3Rpb24oYSxcbmIsYyl7aChjKX19aWYoXCJzdHJpbmdcIj09dHlwZW9mIGEmJmUuY29uc3RhbnQpe3ZhciBsPWYuZm47Zi5mbj1mdW5jdGlvbihhLGIsYyl7bC5jYWxsKHRoaXMsYSxiLGMpO09hKGcsZil9fWd8fChnPXRoaXMuJCR3YXRjaGVycz1bXSk7Zy51bnNoaWZ0KGYpO3JldHVybiBmdW5jdGlvbigpe09hKGcsZik7Yz1udWxsfX0sJHdhdGNoQ29sbGVjdGlvbjpmdW5jdGlvbihhLGIpe3ZhciBjPXRoaXMsZCxlLGYsaD0xPGIubGVuZ3RoLGw9MCxrPWcoYSksbT1bXSxuPXt9LHA9ITAscT0wO3JldHVybiB0aGlzLiR3YXRjaChmdW5jdGlvbigpe2Q9ayhjKTt2YXIgYSxiO2lmKFgoZCkpaWYoYWIoZCkpZm9yKGUhPT1tJiYoZT1tLHE9ZS5sZW5ndGg9MCxsKyspLGE9ZC5sZW5ndGgscSE9PWEmJihsKyssZS5sZW5ndGg9cT1hKSxiPTA7YjxhO2IrKyllW2JdIT09ZVtiXSYmZFtiXSE9PWRbYl18fGVbYl09PT1kW2JdfHwobCsrLGVbYl09ZFtiXSk7ZWxzZXtlIT09biYmKGU9bj17fSxxPTAsbCsrKTthPVxuMDtmb3IoYiBpbiBkKWQuaGFzT3duUHJvcGVydHkoYikmJihhKyssZS5oYXNPd25Qcm9wZXJ0eShiKT9lW2JdIT09ZFtiXSYmKGwrKyxlW2JdPWRbYl0pOihxKyssZVtiXT1kW2JdLGwrKykpO2lmKHE+YSlmb3IoYiBpbiBsKyssZSllLmhhc093blByb3BlcnR5KGIpJiYhZC5oYXNPd25Qcm9wZXJ0eShiKSYmKHEtLSxkZWxldGUgZVtiXSl9ZWxzZSBlIT09ZCYmKGU9ZCxsKyspO3JldHVybiBsfSxmdW5jdGlvbigpe3A/KHA9ITEsYihkLGQsYykpOmIoZCxmLGMpO2lmKGgpaWYoWChkKSlpZihhYihkKSl7Zj1BcnJheShkLmxlbmd0aCk7Zm9yKHZhciBhPTA7YTxkLmxlbmd0aDthKyspZlthXT1kW2FdfWVsc2UgZm9yKGEgaW4gZj17fSxkKUZjLmNhbGwoZCxhKSYmKGZbYV09ZFthXSk7ZWxzZSBmPWR9KX0sJGRpZ2VzdDpmdW5jdGlvbigpe3ZhciBkLGcsZixoLGs9dGhpcy4kJGFzeW5jUXVldWUsbT10aGlzLiQkcG9zdERpZ2VzdFF1ZXVlLHEseCxzPWIsTCxRPVtdLHksSCxSO2woXCIkZGlnZXN0XCIpO1xuYz1udWxsO2Rve3g9ITE7Zm9yKEw9dGhpcztrLmxlbmd0aDspe3RyeXtSPWsuc2hpZnQoKSxSLnNjb3BlLiRldmFsKFIuZXhwcmVzc2lvbil9Y2F0Y2goQil7cC4kJHBoYXNlPW51bGwsZShCKX1jPW51bGx9YTpkb3tpZihoPUwuJCR3YXRjaGVycylmb3IocT1oLmxlbmd0aDtxLS07KXRyeXtpZihkPWhbcV0paWYoKGc9ZC5nZXQoTCkpIT09KGY9ZC5sYXN0KSYmIShkLmVxP3hhKGcsZik6XCJudW1iZXJcIj09dHlwZW9mIGcmJlwibnVtYmVyXCI9PXR5cGVvZiBmJiZpc05hTihnKSYmaXNOYU4oZikpKXg9ITAsYz1kLGQubGFzdD1kLmVxP2JhKGcpOmcsZC5mbihnLGY9PT1uP2c6ZixMKSw1PnMmJih5PTQtcyxRW3ldfHwoUVt5XT1bXSksSD1QKGQuZXhwKT9cImZuOiBcIisoZC5leHAubmFtZXx8ZC5leHAudG9TdHJpbmcoKSk6ZC5leHAsSCs9XCI7IG5ld1ZhbDogXCIrcWEoZykrXCI7IG9sZFZhbDogXCIrcWEoZiksUVt5XS5wdXNoKEgpKTtlbHNlIGlmKGQ9PT1jKXt4PSExO2JyZWFrIGF9fWNhdGNoKHcpe3AuJCRwaGFzZT1cbm51bGwsZSh3KX1pZighKGg9TC4kJGNoaWxkSGVhZHx8TCE9PXRoaXMmJkwuJCRuZXh0U2libGluZykpZm9yKDtMIT09dGhpcyYmIShoPUwuJCRuZXh0U2libGluZyk7KUw9TC4kcGFyZW50fXdoaWxlKEw9aCk7aWYoKHh8fGsubGVuZ3RoKSYmIXMtLSl0aHJvdyBwLiQkcGhhc2U9bnVsbCxhKFwiaW5mZGlnXCIsYixxYShRKSk7fXdoaWxlKHh8fGsubGVuZ3RoKTtmb3IocC4kJHBoYXNlPW51bGw7bS5sZW5ndGg7KXRyeXttLnNoaWZ0KCkoKX1jYXRjaChUKXtlKFQpfX0sJGRlc3Ryb3k6ZnVuY3Rpb24oKXtpZighdGhpcy4kJGRlc3Ryb3llZCl7dmFyIGE9dGhpcy4kcGFyZW50O3RoaXMuJGJyb2FkY2FzdChcIiRkZXN0cm95XCIpO3RoaXMuJCRkZXN0cm95ZWQ9ITA7dGhpcyE9PXAmJihxKHRoaXMuJCRsaXN0ZW5lckNvdW50LGViKG51bGwsbSx0aGlzKSksYS4kJGNoaWxkSGVhZD09dGhpcyYmKGEuJCRjaGlsZEhlYWQ9dGhpcy4kJG5leHRTaWJsaW5nKSxhLiQkY2hpbGRUYWlsPT10aGlzJiZcbihhLiQkY2hpbGRUYWlsPXRoaXMuJCRwcmV2U2libGluZyksdGhpcy4kJHByZXZTaWJsaW5nJiYodGhpcy4kJHByZXZTaWJsaW5nLiQkbmV4dFNpYmxpbmc9dGhpcy4kJG5leHRTaWJsaW5nKSx0aGlzLiQkbmV4dFNpYmxpbmcmJih0aGlzLiQkbmV4dFNpYmxpbmcuJCRwcmV2U2libGluZz10aGlzLiQkcHJldlNpYmxpbmcpLHRoaXMuJHBhcmVudD10aGlzLiQkbmV4dFNpYmxpbmc9dGhpcy4kJHByZXZTaWJsaW5nPXRoaXMuJCRjaGlsZEhlYWQ9dGhpcy4kJGNoaWxkVGFpbD10aGlzLiRyb290PW51bGwsdGhpcy4kJGxpc3RlbmVycz17fSx0aGlzLiQkd2F0Y2hlcnM9dGhpcy4kJGFzeW5jUXVldWU9dGhpcy4kJHBvc3REaWdlc3RRdWV1ZT1bXSx0aGlzLiRkZXN0cm95PXRoaXMuJGRpZ2VzdD10aGlzLiRhcHBseT1DLHRoaXMuJG9uPXRoaXMuJHdhdGNoPWZ1bmN0aW9uKCl7cmV0dXJuIEN9KX19LCRldmFsOmZ1bmN0aW9uKGEsYil7cmV0dXJuIGcoYSkodGhpcyxiKX0sJGV2YWxBc3luYzpmdW5jdGlvbihhKXtwLiQkcGhhc2V8fFxucC4kJGFzeW5jUXVldWUubGVuZ3RofHxmLmRlZmVyKGZ1bmN0aW9uKCl7cC4kJGFzeW5jUXVldWUubGVuZ3RoJiZwLiRkaWdlc3QoKX0pO3RoaXMuJCRhc3luY1F1ZXVlLnB1c2goe3Njb3BlOnRoaXMsZXhwcmVzc2lvbjphfSl9LCQkcG9zdERpZ2VzdDpmdW5jdGlvbihhKXt0aGlzLiQkcG9zdERpZ2VzdFF1ZXVlLnB1c2goYSl9LCRhcHBseTpmdW5jdGlvbihhKXt0cnl7cmV0dXJuIGwoXCIkYXBwbHlcIiksdGhpcy4kZXZhbChhKX1jYXRjaChiKXtlKGIpfWZpbmFsbHl7cC4kJHBoYXNlPW51bGw7dHJ5e3AuJGRpZ2VzdCgpfWNhdGNoKGMpe3Rocm93IGUoYyksYzt9fX0sJG9uOmZ1bmN0aW9uKGEsYil7dmFyIGM9dGhpcy4kJGxpc3RlbmVyc1thXTtjfHwodGhpcy4kJGxpc3RlbmVyc1thXT1jPVtdKTtjLnB1c2goYik7dmFyIGQ9dGhpcztkbyBkLiQkbGlzdGVuZXJDb3VudFthXXx8KGQuJCRsaXN0ZW5lckNvdW50W2FdPTApLGQuJCRsaXN0ZW5lckNvdW50W2FdKys7d2hpbGUoZD1kLiRwYXJlbnQpO1xudmFyIGU9dGhpcztyZXR1cm4gZnVuY3Rpb24oKXtjW2RiKGMsYildPW51bGw7bShlLDEsYSl9fSwkZW1pdDpmdW5jdGlvbihhLGIpe3ZhciBjPVtdLGQsZz10aGlzLGY9ITEsaD17bmFtZTphLHRhcmdldFNjb3BlOmcsc3RvcFByb3BhZ2F0aW9uOmZ1bmN0aW9uKCl7Zj0hMH0scHJldmVudERlZmF1bHQ6ZnVuY3Rpb24oKXtoLmRlZmF1bHRQcmV2ZW50ZWQ9ITB9LGRlZmF1bHRQcmV2ZW50ZWQ6ITF9LGw9W2hdLmNvbmNhdCh5YS5jYWxsKGFyZ3VtZW50cywxKSksayxtO2Rve2Q9Zy4kJGxpc3RlbmVyc1thXXx8YztoLmN1cnJlbnRTY29wZT1nO2s9MDtmb3IobT1kLmxlbmd0aDtrPG07aysrKWlmKGRba10pdHJ5e2Rba10uYXBwbHkobnVsbCxsKX1jYXRjaChuKXtlKG4pfWVsc2UgZC5zcGxpY2UoaywxKSxrLS0sbS0tO2lmKGYpYnJlYWs7Zz1nLiRwYXJlbnR9d2hpbGUoZyk7cmV0dXJuIGh9LCRicm9hZGNhc3Q6ZnVuY3Rpb24oYSxiKXtmb3IodmFyIGM9dGhpcyxkPXRoaXMsZz17bmFtZTphLFxudGFyZ2V0U2NvcGU6dGhpcyxwcmV2ZW50RGVmYXVsdDpmdW5jdGlvbigpe2cuZGVmYXVsdFByZXZlbnRlZD0hMH0sZGVmYXVsdFByZXZlbnRlZDohMX0sZj1bZ10uY29uY2F0KHlhLmNhbGwoYXJndW1lbnRzLDEpKSxoLGs7Yz1kOyl7Zy5jdXJyZW50U2NvcGU9YztkPWMuJCRsaXN0ZW5lcnNbYV18fFtdO2g9MDtmb3Ioaz1kLmxlbmd0aDtoPGs7aCsrKWlmKGRbaF0pdHJ5e2RbaF0uYXBwbHkobnVsbCxmKX1jYXRjaChsKXtlKGwpfWVsc2UgZC5zcGxpY2UoaCwxKSxoLS0say0tO2lmKCEoZD1jLiQkbGlzdGVuZXJDb3VudFthXSYmYy4kJGNoaWxkSGVhZHx8YyE9PXRoaXMmJmMuJCRuZXh0U2libGluZykpZm9yKDtjIT09dGhpcyYmIShkPWMuJCRuZXh0U2libGluZyk7KWM9Yy4kcGFyZW50fXJldHVybiBnfX07dmFyIHA9bmV3IGg7cmV0dXJuIHB9XX1mdW5jdGlvbiBiZCgpe3ZhciBiPS9eXFxzKihodHRwcz98ZnRwfG1haWx0b3x0ZWx8ZmlsZSk6LyxhPS9eXFxzKihodHRwcz98ZnRwfGZpbGUpOnxkYXRhOmltYWdlXFwvLztcbnRoaXMuYUhyZWZTYW5pdGl6YXRpb25XaGl0ZWxpc3Q9ZnVuY3Rpb24oYSl7cmV0dXJuIEIoYSk/KGI9YSx0aGlzKTpifTt0aGlzLmltZ1NyY1Nhbml0aXphdGlvbldoaXRlbGlzdD1mdW5jdGlvbihiKXtyZXR1cm4gQihiKT8oYT1iLHRoaXMpOmF9O3RoaXMuJGdldD1mdW5jdGlvbigpe3JldHVybiBmdW5jdGlvbihjLGQpe3ZhciBlPWQ/YTpiLGc7aWYoIVN8fDg8PVMpaWYoZz1zYShjKS5ocmVmLFwiXCIhPT1nJiYhZy5tYXRjaChlKSlyZXR1cm5cInVuc2FmZTpcIitnO3JldHVybiBjfX19ZnVuY3Rpb24gQWUoYil7aWYoXCJzZWxmXCI9PT1iKXJldHVybiBiO2lmKHcoYikpe2lmKC0xPGIuaW5kZXhPZihcIioqKlwiKSl0aHJvdyB1YShcIml3Y2FyZFwiLGIpO2I9Yi5yZXBsYWNlKC8oWy0oKVxcW1xcXXt9Kz8qLiRcXF58LDojPCFcXFxcXSkvZyxcIlxcXFwkMVwiKS5yZXBsYWNlKC9cXHgwOC9nLFwiXFxcXHgwOFwiKS5yZXBsYWNlKFwiXFxcXCpcXFxcKlwiLFwiLipcIikucmVwbGFjZShcIlxcXFwqXCIsXCJbXjovLj8mO10qXCIpO3JldHVybiBSZWdFeHAoXCJeXCIrXG5iK1wiJFwiKX1pZihjYihiKSlyZXR1cm4gUmVnRXhwKFwiXlwiK2Iuc291cmNlK1wiJFwiKTt0aHJvdyB1YShcImltYXRjaGVyXCIpO31mdW5jdGlvbiBHYyhiKXt2YXIgYT1bXTtCKGIpJiZxKGIsZnVuY3Rpb24oYil7YS5wdXNoKEFlKGIpKX0pO3JldHVybiBhfWZ1bmN0aW9uIGFlKCl7dGhpcy5TQ0VfQ09OVEVYVFM9Z2E7dmFyIGI9W1wic2VsZlwiXSxhPVtdO3RoaXMucmVzb3VyY2VVcmxXaGl0ZWxpc3Q9ZnVuY3Rpb24oYSl7YXJndW1lbnRzLmxlbmd0aCYmKGI9R2MoYSkpO3JldHVybiBifTt0aGlzLnJlc291cmNlVXJsQmxhY2tsaXN0PWZ1bmN0aW9uKGIpe2FyZ3VtZW50cy5sZW5ndGgmJihhPUdjKGIpKTtyZXR1cm4gYX07dGhpcy4kZ2V0PVtcIiRpbmplY3RvclwiLGZ1bmN0aW9uKGMpe2Z1bmN0aW9uIGQoYSl7dmFyIGI9ZnVuY3Rpb24oYSl7dGhpcy4kJHVud3JhcFRydXN0ZWRWYWx1ZT1mdW5jdGlvbigpe3JldHVybiBhfX07YSYmKGIucHJvdG90eXBlPW5ldyBhKTtiLnByb3RvdHlwZS52YWx1ZU9mPVxuZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kJHVud3JhcFRydXN0ZWRWYWx1ZSgpfTtiLnByb3RvdHlwZS50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiQkdW53cmFwVHJ1c3RlZFZhbHVlKCkudG9TdHJpbmcoKX07cmV0dXJuIGJ9dmFyIGU9ZnVuY3Rpb24oYSl7dGhyb3cgdWEoXCJ1bnNhZmVcIik7fTtjLmhhcyhcIiRzYW5pdGl6ZVwiKSYmKGU9Yy5nZXQoXCIkc2FuaXRpemVcIikpO3ZhciBnPWQoKSxmPXt9O2ZbZ2EuSFRNTF09ZChnKTtmW2dhLkNTU109ZChnKTtmW2dhLlVSTF09ZChnKTtmW2dhLkpTXT1kKGcpO2ZbZ2EuUkVTT1VSQ0VfVVJMXT1kKGZbZ2EuVVJMXSk7cmV0dXJue3RydXN0QXM6ZnVuY3Rpb24oYSxiKXt2YXIgYz1mLmhhc093blByb3BlcnR5KGEpP2ZbYV06bnVsbDtpZighYyl0aHJvdyB1YShcImljb250ZXh0XCIsYSxiKTtpZihudWxsPT09Ynx8Yj09PXN8fFwiXCI9PT1iKXJldHVybiBiO2lmKFwic3RyaW5nXCIhPT10eXBlb2YgYil0aHJvdyB1YShcIml0eXBlXCIsYSk7cmV0dXJuIG5ldyBjKGIpfSxcbmdldFRydXN0ZWQ6ZnVuY3Rpb24oYyxkKXtpZihudWxsPT09ZHx8ZD09PXN8fFwiXCI9PT1kKXJldHVybiBkO3ZhciBnPWYuaGFzT3duUHJvcGVydHkoYyk/ZltjXTpudWxsO2lmKGcmJmQgaW5zdGFuY2VvZiBnKXJldHVybiBkLiQkdW53cmFwVHJ1c3RlZFZhbHVlKCk7aWYoYz09PWdhLlJFU09VUkNFX1VSTCl7dmFyIGc9c2EoZC50b1N0cmluZygpKSxtLG4scD0hMTttPTA7Zm9yKG49Yi5sZW5ndGg7bTxuO20rKylpZihcInNlbGZcIj09PWJbbV0/SWIoZyk6YlttXS5leGVjKGcuaHJlZikpe3A9ITA7YnJlYWt9aWYocClmb3IobT0wLG49YS5sZW5ndGg7bTxuO20rKylpZihcInNlbGZcIj09PWFbbV0/SWIoZyk6YVttXS5leGVjKGcuaHJlZikpe3A9ITE7YnJlYWt9aWYocClyZXR1cm4gZDt0aHJvdyB1YShcImluc2VjdXJsXCIsZC50b1N0cmluZygpKTt9aWYoYz09PWdhLkhUTUwpcmV0dXJuIGUoZCk7dGhyb3cgdWEoXCJ1bnNhZmVcIik7fSx2YWx1ZU9mOmZ1bmN0aW9uKGEpe3JldHVybiBhIGluc3RhbmNlb2Zcbmc/YS4kJHVud3JhcFRydXN0ZWRWYWx1ZSgpOmF9fX1dfWZ1bmN0aW9uICRkKCl7dmFyIGI9ITA7dGhpcy5lbmFibGVkPWZ1bmN0aW9uKGEpe2FyZ3VtZW50cy5sZW5ndGgmJihiPSEhYSk7cmV0dXJuIGJ9O3RoaXMuJGdldD1bXCIkcGFyc2VcIixcIiRzbmlmZmVyXCIsXCIkc2NlRGVsZWdhdGVcIixmdW5jdGlvbihhLGMsZCl7aWYoYiYmYy5tc2llJiY4PmMubXNpZURvY3VtZW50TW9kZSl0aHJvdyB1YShcImllcXVpcmtzXCIpO3ZhciBlPWJhKGdhKTtlLmlzRW5hYmxlZD1mdW5jdGlvbigpe3JldHVybiBifTtlLnRydXN0QXM9ZC50cnVzdEFzO2UuZ2V0VHJ1c3RlZD1kLmdldFRydXN0ZWQ7ZS52YWx1ZU9mPWQudmFsdWVPZjtifHwoZS50cnVzdEFzPWUuZ2V0VHJ1c3RlZD1mdW5jdGlvbihhLGIpe3JldHVybiBifSxlLnZhbHVlT2Y9RGEpO2UucGFyc2VBcz1mdW5jdGlvbihiLGMpe3ZhciBkPWEoYyk7cmV0dXJuIGQubGl0ZXJhbCYmZC5jb25zdGFudD9kOmZ1bmN0aW9uKGEsYyl7cmV0dXJuIGUuZ2V0VHJ1c3RlZChiLFxuZChhLGMpKX19O3ZhciBnPWUucGFyc2VBcyxmPWUuZ2V0VHJ1c3RlZCxoPWUudHJ1c3RBcztxKGdhLGZ1bmN0aW9uKGEsYil7dmFyIGM9SyhiKTtlW1RhKFwicGFyc2VfYXNfXCIrYyldPWZ1bmN0aW9uKGIpe3JldHVybiBnKGEsYil9O2VbVGEoXCJnZXRfdHJ1c3RlZF9cIitjKV09ZnVuY3Rpb24oYil7cmV0dXJuIGYoYSxiKX07ZVtUYShcInRydXN0X2FzX1wiK2MpXT1mdW5jdGlvbihiKXtyZXR1cm4gaChhLGIpfX0pO3JldHVybiBlfV19ZnVuY3Rpb24gYmUoKXt0aGlzLiRnZXQ9W1wiJHdpbmRvd1wiLFwiJGRvY3VtZW50XCIsZnVuY3Rpb24oYixhKXt2YXIgYz17fSxkPVkoKC9hbmRyb2lkIChcXGQrKS8uZXhlYyhLKChiLm5hdmlnYXRvcnx8e30pLnVzZXJBZ2VudCkpfHxbXSlbMV0pLGU9L0JveGVlL2kudGVzdCgoYi5uYXZpZ2F0b3J8fHt9KS51c2VyQWdlbnQpLGc9YVswXXx8e30sZj1nLmRvY3VtZW50TW9kZSxoLGw9L14oTW96fHdlYmtpdHxPfG1zKSg/PVtBLVpdKS8saz1nLmJvZHkmJmcuYm9keS5zdHlsZSxcbm09ITEsbj0hMTtpZihrKXtmb3IodmFyIHAgaW4gaylpZihtPWwuZXhlYyhwKSl7aD1tWzBdO2g9aC5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpK2guc3Vic3RyKDEpO2JyZWFrfWh8fChoPVwiV2Via2l0T3BhY2l0eVwiaW4gayYmXCJ3ZWJraXRcIik7bT0hIShcInRyYW5zaXRpb25cImluIGt8fGgrXCJUcmFuc2l0aW9uXCJpbiBrKTtuPSEhKFwiYW5pbWF0aW9uXCJpbiBrfHxoK1wiQW5pbWF0aW9uXCJpbiBrKTshZHx8bSYmbnx8KG09dyhnLmJvZHkuc3R5bGUud2Via2l0VHJhbnNpdGlvbiksbj13KGcuYm9keS5zdHlsZS53ZWJraXRBbmltYXRpb24pKX1yZXR1cm57aGlzdG9yeTohKCFiLmhpc3Rvcnl8fCFiLmhpc3RvcnkucHVzaFN0YXRlfHw0PmR8fGUpLGhhc2hjaGFuZ2U6XCJvbmhhc2hjaGFuZ2VcImluIGImJighZnx8NzxmKSxoYXNFdmVudDpmdW5jdGlvbihhKXtpZihcImlucHV0XCI9PWEmJjk9PVMpcmV0dXJuITE7aWYoRShjW2FdKSl7dmFyIGI9Zy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2NbYV09XCJvblwiK1xuYSBpbiBifXJldHVybiBjW2FdfSxjc3A6VmIoKSx2ZW5kb3JQcmVmaXg6aCx0cmFuc2l0aW9uczptLGFuaW1hdGlvbnM6bixhbmRyb2lkOmQsbXNpZTpTLG1zaWVEb2N1bWVudE1vZGU6Zn19XX1mdW5jdGlvbiBkZSgpe3RoaXMuJGdldD1bXCIkcm9vdFNjb3BlXCIsXCIkYnJvd3NlclwiLFwiJHFcIixcIiRleGNlcHRpb25IYW5kbGVyXCIsZnVuY3Rpb24oYixhLGMsZCl7ZnVuY3Rpb24gZShlLGgsbCl7dmFyIGs9Yy5kZWZlcigpLG09ay5wcm9taXNlLG49QihsKSYmIWw7aD1hLmRlZmVyKGZ1bmN0aW9uKCl7dHJ5e2sucmVzb2x2ZShlKCkpfWNhdGNoKGEpe2sucmVqZWN0KGEpLGQoYSl9ZmluYWxseXtkZWxldGUgZ1ttLiQkdGltZW91dElkXX1ufHxiLiRhcHBseSgpfSxoKTttLiQkdGltZW91dElkPWg7Z1toXT1rO3JldHVybiBtfXZhciBnPXt9O2UuY2FuY2VsPWZ1bmN0aW9uKGIpe3JldHVybiBiJiZiLiQkdGltZW91dElkIGluIGc/KGdbYi4kJHRpbWVvdXRJZF0ucmVqZWN0KFwiY2FuY2VsZWRcIiksXG5kZWxldGUgZ1tiLiQkdGltZW91dElkXSxhLmRlZmVyLmNhbmNlbChiLiQkdGltZW91dElkKSk6ITF9O3JldHVybiBlfV19ZnVuY3Rpb24gc2EoYixhKXt2YXIgYz1iO1MmJihXLnNldEF0dHJpYnV0ZShcImhyZWZcIixjKSxjPVcuaHJlZik7Vy5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsYyk7cmV0dXJue2hyZWY6Vy5ocmVmLHByb3RvY29sOlcucHJvdG9jb2w/Vy5wcm90b2NvbC5yZXBsYWNlKC86JC8sXCJcIik6XCJcIixob3N0OlcuaG9zdCxzZWFyY2g6Vy5zZWFyY2g/Vy5zZWFyY2gucmVwbGFjZSgvXlxcPy8sXCJcIik6XCJcIixoYXNoOlcuaGFzaD9XLmhhc2gucmVwbGFjZSgvXiMvLFwiXCIpOlwiXCIsaG9zdG5hbWU6Vy5ob3N0bmFtZSxwb3J0OlcucG9ydCxwYXRobmFtZTpcIi9cIj09PVcucGF0aG5hbWUuY2hhckF0KDApP1cucGF0aG5hbWU6XCIvXCIrVy5wYXRobmFtZX19ZnVuY3Rpb24gSWIoYil7Yj13KGIpP3NhKGIpOmI7cmV0dXJuIGIucHJvdG9jb2w9PT1IYy5wcm90b2NvbCYmYi5ob3N0PT09SGMuaG9zdH1cbmZ1bmN0aW9uIGVlKCl7dGhpcy4kZ2V0PWFhKE8pfWZ1bmN0aW9uIGdjKGIpe2Z1bmN0aW9uIGEoZCxlKXtpZihYKGQpKXt2YXIgZz17fTtxKGQsZnVuY3Rpb24oYixjKXtnW2NdPWEoYyxiKX0pO3JldHVybiBnfXJldHVybiBiLmZhY3RvcnkoZCtjLGUpfXZhciBjPVwiRmlsdGVyXCI7dGhpcy5yZWdpc3Rlcj1hO3RoaXMuJGdldD1bXCIkaW5qZWN0b3JcIixmdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYil7cmV0dXJuIGEuZ2V0KGIrYyl9fV07YShcImN1cnJlbmN5XCIsSWMpO2EoXCJkYXRlXCIsSmMpO2EoXCJmaWx0ZXJcIixCZSk7YShcImpzb25cIixDZSk7YShcImxpbWl0VG9cIixEZSk7YShcImxvd2VyY2FzZVwiLEVlKTthKFwibnVtYmVyXCIsS2MpO2EoXCJvcmRlckJ5XCIsTGMpO2EoXCJ1cHBlcmNhc2VcIixGZSl9ZnVuY3Rpb24gQmUoKXtyZXR1cm4gZnVuY3Rpb24oYixhLGMpe2lmKCFNKGIpKXJldHVybiBiO3ZhciBkPXR5cGVvZiBjLGU9W107ZS5jaGVjaz1mdW5jdGlvbihhKXtmb3IodmFyIGI9MDtiPGUubGVuZ3RoO2IrKylpZighZVtiXShhKSlyZXR1cm4hMTtcbnJldHVybiEwfTtcImZ1bmN0aW9uXCIhPT1kJiYoYz1cImJvb2xlYW5cIj09PWQmJmM/ZnVuY3Rpb24oYSxiKXtyZXR1cm4gRWEuZXF1YWxzKGEsYil9OmZ1bmN0aW9uKGEsYil7aWYoYSYmYiYmXCJvYmplY3RcIj09PXR5cGVvZiBhJiZcIm9iamVjdFwiPT09dHlwZW9mIGIpe2Zvcih2YXIgZCBpbiBhKWlmKFwiJFwiIT09ZC5jaGFyQXQoMCkmJkZjLmNhbGwoYSxkKSYmYyhhW2RdLGJbZF0pKXJldHVybiEwO3JldHVybiExfWI9KFwiXCIrYikudG9Mb3dlckNhc2UoKTtyZXR1cm4tMTwoXCJcIithKS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoYil9KTt2YXIgZz1mdW5jdGlvbihhLGIpe2lmKFwic3RyaW5nXCI9PXR5cGVvZiBiJiZcIiFcIj09PWIuY2hhckF0KDApKXJldHVybiFnKGEsYi5zdWJzdHIoMSkpO3N3aXRjaCh0eXBlb2YgYSl7Y2FzZSBcImJvb2xlYW5cIjpjYXNlIFwibnVtYmVyXCI6Y2FzZSBcInN0cmluZ1wiOnJldHVybiBjKGEsYik7Y2FzZSBcIm9iamVjdFwiOnN3aXRjaCh0eXBlb2YgYil7Y2FzZSBcIm9iamVjdFwiOnJldHVybiBjKGEsXG5iKTtkZWZhdWx0OmZvcih2YXIgZCBpbiBhKWlmKFwiJFwiIT09ZC5jaGFyQXQoMCkmJmcoYVtkXSxiKSlyZXR1cm4hMH1yZXR1cm4hMTtjYXNlIFwiYXJyYXlcIjpmb3IoZD0wO2Q8YS5sZW5ndGg7ZCsrKWlmKGcoYVtkXSxiKSlyZXR1cm4hMDtyZXR1cm4hMTtkZWZhdWx0OnJldHVybiExfX07c3dpdGNoKHR5cGVvZiBhKXtjYXNlIFwiYm9vbGVhblwiOmNhc2UgXCJudW1iZXJcIjpjYXNlIFwic3RyaW5nXCI6YT17JDphfTtjYXNlIFwib2JqZWN0XCI6Zm9yKHZhciBmIGluIGEpKGZ1bmN0aW9uKGIpe1widW5kZWZpbmVkXCIhPXR5cGVvZiBhW2JdJiZlLnB1c2goZnVuY3Rpb24oYyl7cmV0dXJuIGcoXCIkXCI9PWI/YzpjJiZjW2JdLGFbYl0pfSl9KShmKTticmVhaztjYXNlIFwiZnVuY3Rpb25cIjplLnB1c2goYSk7YnJlYWs7ZGVmYXVsdDpyZXR1cm4gYn1kPVtdO2ZvcihmPTA7ZjxiLmxlbmd0aDtmKyspe3ZhciBoPWJbZl07ZS5jaGVjayhoKSYmZC5wdXNoKGgpfXJldHVybiBkfX1mdW5jdGlvbiBJYyhiKXt2YXIgYT1cbmIuTlVNQkVSX0ZPUk1BVFM7cmV0dXJuIGZ1bmN0aW9uKGIsZCl7RShkKSYmKGQ9YS5DVVJSRU5DWV9TWU0pO3JldHVybiBNYyhiLGEuUEFUVEVSTlNbMV0sYS5HUk9VUF9TRVAsYS5ERUNJTUFMX1NFUCwyKS5yZXBsYWNlKC9cXHUwMEE0L2csZCl9fWZ1bmN0aW9uIEtjKGIpe3ZhciBhPWIuTlVNQkVSX0ZPUk1BVFM7cmV0dXJuIGZ1bmN0aW9uKGIsZCl7cmV0dXJuIE1jKGIsYS5QQVRURVJOU1swXSxhLkdST1VQX1NFUCxhLkRFQ0lNQUxfU0VQLGQpfX1mdW5jdGlvbiBNYyhiLGEsYyxkLGUpe2lmKG51bGw9PWJ8fCFpc0Zpbml0ZShiKXx8WChiKSlyZXR1cm5cIlwiO3ZhciBnPTA+YjtiPU1hdGguYWJzKGIpO3ZhciBmPWIrXCJcIixoPVwiXCIsbD1bXSxrPSExO2lmKC0xIT09Zi5pbmRleE9mKFwiZVwiKSl7dmFyIG09Zi5tYXRjaCgvKFtcXGRcXC5dKyllKC0/KShcXGQrKS8pO20mJlwiLVwiPT1tWzJdJiZtWzNdPmUrMT9mPVwiMFwiOihoPWYsaz0hMCl9aWYoaykwPGUmJigtMTxiJiYxPmIpJiYoaD1iLnRvRml4ZWQoZSkpO1xuZWxzZXtmPShmLnNwbGl0KE5jKVsxXXx8XCJcIikubGVuZ3RoO0UoZSkmJihlPU1hdGgubWluKE1hdGgubWF4KGEubWluRnJhYyxmKSxhLm1heEZyYWMpKTtmPU1hdGgucG93KDEwLGUpO2I9TWF0aC5yb3VuZChiKmYpL2Y7Yj0oXCJcIitiKS5zcGxpdChOYyk7Zj1iWzBdO2I9YlsxXXx8XCJcIjt2YXIgbT0wLG49YS5sZ1NpemUscD1hLmdTaXplO2lmKGYubGVuZ3RoPj1uK3ApZm9yKG09Zi5sZW5ndGgtbixrPTA7azxtO2srKykwPT09KG0tayklcCYmMCE9PWsmJihoKz1jKSxoKz1mLmNoYXJBdChrKTtmb3Ioaz1tO2s8Zi5sZW5ndGg7aysrKTA9PT0oZi5sZW5ndGgtayklbiYmMCE9PWsmJihoKz1jKSxoKz1mLmNoYXJBdChrKTtmb3IoO2IubGVuZ3RoPGU7KWIrPVwiMFwiO2UmJlwiMFwiIT09ZSYmKGgrPWQrYi5zdWJzdHIoMCxlKSl9bC5wdXNoKGc/YS5uZWdQcmU6YS5wb3NQcmUpO2wucHVzaChoKTtsLnB1c2goZz9hLm5lZ1N1ZjphLnBvc1N1Zik7cmV0dXJuIGwuam9pbihcIlwiKX1mdW5jdGlvbiBPYihiLFxuYSxjKXt2YXIgZD1cIlwiOzA+YiYmKGQ9XCItXCIsYj0tYik7Zm9yKGI9XCJcIitiO2IubGVuZ3RoPGE7KWI9XCIwXCIrYjtjJiYoYj1iLnN1YnN0cihiLmxlbmd0aC1hKSk7cmV0dXJuIGQrYn1mdW5jdGlvbiAkKGIsYSxjLGQpe2M9Y3x8MDtyZXR1cm4gZnVuY3Rpb24oZSl7ZT1lW1wiZ2V0XCIrYl0oKTtpZigwPGN8fGU+LWMpZSs9YzswPT09ZSYmLTEyPT1jJiYoZT0xMik7cmV0dXJuIE9iKGUsYSxkKX19ZnVuY3Rpb24gcGIoYixhKXtyZXR1cm4gZnVuY3Rpb24oYyxkKXt2YXIgZT1jW1wiZ2V0XCIrYl0oKSxnPUZhKGE/XCJTSE9SVFwiK2I6Yik7cmV0dXJuIGRbZ11bZV19fWZ1bmN0aW9uIEpjKGIpe2Z1bmN0aW9uIGEoYSl7dmFyIGI7aWYoYj1hLm1hdGNoKGMpKXthPW5ldyBEYXRlKDApO3ZhciBnPTAsZj0wLGg9Yls4XT9hLnNldFVUQ0Z1bGxZZWFyOmEuc2V0RnVsbFllYXIsbD1iWzhdP2Euc2V0VVRDSG91cnM6YS5zZXRIb3VycztiWzldJiYoZz1ZKGJbOV0rYlsxMF0pLGY9WShiWzldK2JbMTFdKSk7XG5oLmNhbGwoYSxZKGJbMV0pLFkoYlsyXSktMSxZKGJbM10pKTtnPVkoYls0XXx8MCktZztmPVkoYls1XXx8MCktZjtoPVkoYls2XXx8MCk7Yj1NYXRoLnJvdW5kKDFFMypwYXJzZUZsb2F0KFwiMC5cIisoYls3XXx8MCkpKTtsLmNhbGwoYSxnLGYsaCxiKX1yZXR1cm4gYX12YXIgYz0vXihcXGR7NH0pLT8oXFxkXFxkKS0/KFxcZFxcZCkoPzpUKFxcZFxcZCkoPzo6PyhcXGRcXGQpKD86Oj8oXFxkXFxkKSg/OlxcLihcXGQrKSk/KT8pPyhafChbKy1dKShcXGRcXGQpOj8oXFxkXFxkKSk/KT8kLztyZXR1cm4gZnVuY3Rpb24oYyxlKXt2YXIgZz1cIlwiLGY9W10saCxsO2U9ZXx8XCJtZWRpdW1EYXRlXCI7ZT1iLkRBVEVUSU1FX0ZPUk1BVFNbZV18fGU7dyhjKSYmKGM9R2UudGVzdChjKT9ZKGMpOmEoYykpO3ZiKGMpJiYoYz1uZXcgRGF0ZShjKSk7aWYoIU5hKGMpKXJldHVybiBjO2Zvcig7ZTspKGw9SGUuZXhlYyhlKSk/KGY9Zi5jb25jYXQoeWEuY2FsbChsLDEpKSxlPWYucG9wKCkpOihmLnB1c2goZSksZT1udWxsKTtxKGYsZnVuY3Rpb24oYSl7aD1cbkllW2FdO2crPWg/aChjLGIuREFURVRJTUVfRk9STUFUUyk6YS5yZXBsYWNlKC8oXid8JyQpL2csXCJcIikucmVwbGFjZSgvJycvZyxcIidcIil9KTtyZXR1cm4gZ319ZnVuY3Rpb24gQ2UoKXtyZXR1cm4gZnVuY3Rpb24oYil7cmV0dXJuIHFhKGIsITApfX1mdW5jdGlvbiBEZSgpe3JldHVybiBmdW5jdGlvbihiLGEpe2lmKCFNKGIpJiYhdyhiKSlyZXR1cm4gYjthPVkoYSk7aWYodyhiKSlyZXR1cm4gYT8wPD1hP2Iuc2xpY2UoMCxhKTpiLnNsaWNlKGEsYi5sZW5ndGgpOlwiXCI7dmFyIGM9W10sZCxlO2E+Yi5sZW5ndGg/YT1iLmxlbmd0aDphPC1iLmxlbmd0aCYmKGE9LWIubGVuZ3RoKTswPGE/KGQ9MCxlPWEpOihkPWIubGVuZ3RoK2EsZT1iLmxlbmd0aCk7Zm9yKDtkPGU7ZCsrKWMucHVzaChiW2RdKTtyZXR1cm4gY319ZnVuY3Rpb24gTGMoYil7cmV0dXJuIGZ1bmN0aW9uKGEsYyxkKXtmdW5jdGlvbiBlKGEsYil7cmV0dXJuIFFhKGIpP2Z1bmN0aW9uKGIsYyl7cmV0dXJuIGEoYyxiKX06YX1cbmZ1bmN0aW9uIGcoYSxiKXt2YXIgYz10eXBlb2YgYSxkPXR5cGVvZiBiO3JldHVybiBjPT1kPyhcInN0cmluZ1wiPT1jJiYoYT1hLnRvTG93ZXJDYXNlKCksYj1iLnRvTG93ZXJDYXNlKCkpLGE9PT1iPzA6YTxiPy0xOjEpOmM8ZD8tMToxfWlmKCFNKGEpfHwhYylyZXR1cm4gYTtjPU0oYyk/YzpbY107Yz1VYyhjLGZ1bmN0aW9uKGEpe3ZhciBjPSExLGQ9YXx8RGE7aWYodyhhKSl7aWYoXCIrXCI9PWEuY2hhckF0KDApfHxcIi1cIj09YS5jaGFyQXQoMCkpYz1cIi1cIj09YS5jaGFyQXQoMCksYT1hLnN1YnN0cmluZygxKTtkPWIoYSk7aWYoZC5jb25zdGFudCl7dmFyIGY9ZCgpO3JldHVybiBlKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGcoYVtmXSxiW2ZdKX0sYyl9fXJldHVybiBlKGZ1bmN0aW9uKGEsYil7cmV0dXJuIGcoZChhKSxkKGIpKX0sYyl9KTtmb3IodmFyIGY9W10saD0wO2g8YS5sZW5ndGg7aCsrKWYucHVzaChhW2hdKTtyZXR1cm4gZi5zb3J0KGUoZnVuY3Rpb24oYSxiKXtmb3IodmFyIGQ9XG4wO2Q8Yy5sZW5ndGg7ZCsrKXt2YXIgZT1jW2RdKGEsYik7aWYoMCE9PWUpcmV0dXJuIGV9cmV0dXJuIDB9LGQpKX19ZnVuY3Rpb24gdmEoYil7UChiKSYmKGI9e2xpbms6Yn0pO2IucmVzdHJpY3Q9Yi5yZXN0cmljdHx8XCJBQ1wiO3JldHVybiBhYShiKX1mdW5jdGlvbiBPYyhiLGEsYyxkKXtmdW5jdGlvbiBlKGEsYyl7Yz1jP1wiLVwiK2ZiKGMsXCItXCIpOlwiXCI7ZC5yZW1vdmVDbGFzcyhiLChhP3FiOnJiKStjKTtkLmFkZENsYXNzKGIsKGE/cmI6cWIpK2MpfXZhciBnPXRoaXMsZj1iLnBhcmVudCgpLmNvbnRyb2xsZXIoXCJmb3JtXCIpfHxzYixoPTAsbD1nLiRlcnJvcj17fSxrPVtdO2cuJG5hbWU9YS5uYW1lfHxhLm5nRm9ybTtnLiRkaXJ0eT0hMTtnLiRwcmlzdGluZT0hMDtnLiR2YWxpZD0hMDtnLiRpbnZhbGlkPSExO2YuJGFkZENvbnRyb2woZyk7Yi5hZGRDbGFzcyhMYSk7ZSghMCk7Zy4kYWRkQ29udHJvbD1mdW5jdGlvbihhKXtBYShhLiRuYW1lLFwiaW5wdXRcIik7ay5wdXNoKGEpO2EuJG5hbWUmJlxuKGdbYS4kbmFtZV09YSl9O2cuJHJlbW92ZUNvbnRyb2w9ZnVuY3Rpb24oYSl7YS4kbmFtZSYmZ1thLiRuYW1lXT09PWEmJmRlbGV0ZSBnW2EuJG5hbWVdO3EobCxmdW5jdGlvbihiLGMpe2cuJHNldFZhbGlkaXR5KGMsITAsYSl9KTtPYShrLGEpfTtnLiRzZXRWYWxpZGl0eT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ9bFthXTtpZihiKWQmJihPYShkLGMpLGQubGVuZ3RofHwoaC0tLGh8fChlKGIpLGcuJHZhbGlkPSEwLGcuJGludmFsaWQ9ITEpLGxbYV09ITEsZSghMCxhKSxmLiRzZXRWYWxpZGl0eShhLCEwLGcpKSk7ZWxzZXtofHxlKGIpO2lmKGQpe2lmKC0xIT1kYihkLGMpKXJldHVybn1lbHNlIGxbYV09ZD1bXSxoKyssZSghMSxhKSxmLiRzZXRWYWxpZGl0eShhLCExLGcpO2QucHVzaChjKTtnLiR2YWxpZD0hMTtnLiRpbnZhbGlkPSEwfX07Zy4kc2V0RGlydHk9ZnVuY3Rpb24oKXtkLnJlbW92ZUNsYXNzKGIsTGEpO2QuYWRkQ2xhc3MoYix0Yik7Zy4kZGlydHk9ITA7Zy4kcHJpc3RpbmU9XG4hMTtmLiRzZXREaXJ0eSgpfTtnLiRzZXRQcmlzdGluZT1mdW5jdGlvbigpe2QucmVtb3ZlQ2xhc3MoYix0Yik7ZC5hZGRDbGFzcyhiLExhKTtnLiRkaXJ0eT0hMTtnLiRwcmlzdGluZT0hMDtxKGssZnVuY3Rpb24oYSl7YS4kc2V0UHJpc3RpbmUoKX0pfX1mdW5jdGlvbiBwYShiLGEsYyxkKXtiLiRzZXRWYWxpZGl0eShhLGMpO3JldHVybiBjP2Q6c31mdW5jdGlvbiBKZShiLGEsYyl7dmFyIGQ9Yy5wcm9wKFwidmFsaWRpdHlcIik7WChkKSYmYi4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKGMpe2lmKGIuJGVycm9yW2FdfHwhKGQuYmFkSW5wdXR8fGQuY3VzdG9tRXJyb3J8fGQudHlwZU1pc21hdGNoKXx8ZC52YWx1ZU1pc3NpbmcpcmV0dXJuIGM7Yi4kc2V0VmFsaWRpdHkoYSwhMSl9KX1mdW5jdGlvbiB1YihiLGEsYyxkLGUsZyl7dmFyIGY9YS5wcm9wKFwidmFsaWRpdHlcIik7aWYoIWUuYW5kcm9pZCl7dmFyIGg9ITE7YS5vbihcImNvbXBvc2l0aW9uc3RhcnRcIixmdW5jdGlvbihhKXtoPSEwfSk7XG5hLm9uKFwiY29tcG9zaXRpb25lbmRcIixmdW5jdGlvbigpe2g9ITE7bCgpfSl9dmFyIGw9ZnVuY3Rpb24oKXtpZighaCl7dmFyIGU9YS52YWwoKTtRYShjLm5nVHJpbXx8XCJUXCIpJiYoZT1jYShlKSk7aWYoZC4kdmlld1ZhbHVlIT09ZXx8ZiYmXCJcIj09PWUmJiFmLnZhbHVlTWlzc2luZyliLiQkcGhhc2U/ZC4kc2V0Vmlld1ZhbHVlKGUpOmIuJGFwcGx5KGZ1bmN0aW9uKCl7ZC4kc2V0Vmlld1ZhbHVlKGUpfSl9fTtpZihlLmhhc0V2ZW50KFwiaW5wdXRcIikpYS5vbihcImlucHV0XCIsbCk7ZWxzZXt2YXIgayxtPWZ1bmN0aW9uKCl7a3x8KGs9Zy5kZWZlcihmdW5jdGlvbigpe2woKTtrPW51bGx9KSl9O2Eub24oXCJrZXlkb3duXCIsZnVuY3Rpb24oYSl7YT1hLmtleUNvZGU7OTE9PT1hfHwoMTU8YSYmMTk+YXx8Mzc8PWEmJjQwPj1hKXx8bSgpfSk7aWYoZS5oYXNFdmVudChcInBhc3RlXCIpKWEub24oXCJwYXN0ZSBjdXRcIixtKX1hLm9uKFwiY2hhbmdlXCIsbCk7ZC4kcmVuZGVyPWZ1bmN0aW9uKCl7YS52YWwoZC4kaXNFbXB0eShkLiR2aWV3VmFsdWUpP1xuXCJcIjpkLiR2aWV3VmFsdWUpfTt2YXIgbj1jLm5nUGF0dGVybjtuJiYoKGU9bi5tYXRjaCgvXlxcLyguKilcXC8oW2dpbV0qKSQvKSk/KG49UmVnRXhwKGVbMV0sZVsyXSksZT1mdW5jdGlvbihhKXtyZXR1cm4gcGEoZCxcInBhdHRlcm5cIixkLiRpc0VtcHR5KGEpfHxuLnRlc3QoYSksYSl9KTplPWZ1bmN0aW9uKGMpe3ZhciBlPWIuJGV2YWwobik7aWYoIWV8fCFlLnRlc3QpdGhyb3cgdChcIm5nUGF0dGVyblwiKShcIm5vcmVnZXhwXCIsbixlLGhhKGEpKTtyZXR1cm4gcGEoZCxcInBhdHRlcm5cIixkLiRpc0VtcHR5KGMpfHxlLnRlc3QoYyksYyl9LGQuJGZvcm1hdHRlcnMucHVzaChlKSxkLiRwYXJzZXJzLnB1c2goZSkpO2lmKGMubmdNaW5sZW5ndGgpe3ZhciBwPVkoYy5uZ01pbmxlbmd0aCk7ZT1mdW5jdGlvbihhKXtyZXR1cm4gcGEoZCxcIm1pbmxlbmd0aFwiLGQuJGlzRW1wdHkoYSl8fGEubGVuZ3RoPj1wLGEpfTtkLiRwYXJzZXJzLnB1c2goZSk7ZC4kZm9ybWF0dGVycy5wdXNoKGUpfWlmKGMubmdNYXhsZW5ndGgpe3ZhciByPVxuWShjLm5nTWF4bGVuZ3RoKTtlPWZ1bmN0aW9uKGEpe3JldHVybiBwYShkLFwibWF4bGVuZ3RoXCIsZC4kaXNFbXB0eShhKXx8YS5sZW5ndGg8PXIsYSl9O2QuJHBhcnNlcnMucHVzaChlKTtkLiRmb3JtYXR0ZXJzLnB1c2goZSl9fWZ1bmN0aW9uIFBiKGIsYSl7Yj1cIm5nQ2xhc3NcIitiO3JldHVybltcIiRhbmltYXRlXCIsZnVuY3Rpb24oYyl7ZnVuY3Rpb24gZChhLGIpe3ZhciBjPVtdLGQ9MDthOmZvcig7ZDxhLmxlbmd0aDtkKyspe2Zvcih2YXIgZT1hW2RdLG09MDttPGIubGVuZ3RoO20rKylpZihlPT1iW21dKWNvbnRpbnVlIGE7Yy5wdXNoKGUpfXJldHVybiBjfWZ1bmN0aW9uIGUoYSl7aWYoIU0oYSkpe2lmKHcoYSkpcmV0dXJuIGEuc3BsaXQoXCIgXCIpO2lmKFgoYSkpe3ZhciBiPVtdO3EoYSxmdW5jdGlvbihhLGMpe2EmJmIucHVzaChjKX0pO3JldHVybiBifX1yZXR1cm4gYX1yZXR1cm57cmVzdHJpY3Q6XCJBQ1wiLGxpbms6ZnVuY3Rpb24oZyxmLGgpe2Z1bmN0aW9uIGwoYSxiKXt2YXIgYz1cbmYuZGF0YShcIiRjbGFzc0NvdW50c1wiKXx8e30sZD1bXTtxKGEsZnVuY3Rpb24oYSl7aWYoMDxifHxjW2FdKWNbYV09KGNbYV18fDApK2IsY1thXT09PSsoMDxiKSYmZC5wdXNoKGEpfSk7Zi5kYXRhKFwiJGNsYXNzQ291bnRzXCIsYyk7cmV0dXJuIGQuam9pbihcIiBcIil9ZnVuY3Rpb24gayhiKXtpZighMD09PWF8fGcuJGluZGV4JTI9PT1hKXt2YXIgaz1lKGJ8fFtdKTtpZighbSl7dmFyIHI9bChrLDEpO2guJGFkZENsYXNzKHIpfWVsc2UgaWYoIXhhKGIsbSkpe3ZhciBxPWUobSkscj1kKGsscSksaz1kKHEsayksaz1sKGssLTEpLHI9bChyLDEpOzA9PT1yLmxlbmd0aD9jLnJlbW92ZUNsYXNzKGYsayk6MD09PWsubGVuZ3RoP2MuYWRkQ2xhc3MoZixyKTpjLnNldENsYXNzKGYscixrKX19bT1iYShiKX12YXIgbTtnLiR3YXRjaChoW2JdLGssITApO2guJG9ic2VydmUoXCJjbGFzc1wiLGZ1bmN0aW9uKGEpe2soZy4kZXZhbChoW2JdKSl9KTtcIm5nQ2xhc3NcIiE9PWImJmcuJHdhdGNoKFwiJGluZGV4XCIsXG5mdW5jdGlvbihjLGQpe3ZhciBmPWMmMTtpZihmIT09ZCYxKXt2YXIgaz1lKGcuJGV2YWwoaFtiXSkpO2Y9PT1hPyhmPWwoaywxKSxoLiRhZGRDbGFzcyhmKSk6KGY9bChrLC0xKSxoLiRyZW1vdmVDbGFzcyhmKSl9fSl9fX1dfXZhciBLPWZ1bmN0aW9uKGIpe3JldHVybiB3KGIpP2IudG9Mb3dlckNhc2UoKTpifSxGYz1PYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LEZhPWZ1bmN0aW9uKGIpe3JldHVybiB3KGIpP2IudG9VcHBlckNhc2UoKTpifSxTLHksR2EseWE9W10uc2xpY2UsS2U9W10ucHVzaCx3YT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFBhPXQoXCJuZ1wiKSxFYT1PLmFuZ3VsYXJ8fChPLmFuZ3VsYXI9e30pLFNhLEthLGthPVtcIjBcIixcIjBcIixcIjBcIl07Uz1ZKCgvbXNpZSAoXFxkKykvLmV4ZWMoSyhuYXZpZ2F0b3IudXNlckFnZW50KSl8fFtdKVsxXSk7aXNOYU4oUykmJihTPVkoKC90cmlkZW50XFwvLio7IHJ2OihcXGQrKS8uZXhlYyhLKG5hdmlnYXRvci51c2VyQWdlbnQpKXx8XG5bXSlbMV0pKTtDLiRpbmplY3Q9W107RGEuJGluamVjdD1bXTt2YXIgY2E9ZnVuY3Rpb24oKXtyZXR1cm4gU3RyaW5nLnByb3RvdHlwZS50cmltP2Z1bmN0aW9uKGIpe3JldHVybiB3KGIpP2IudHJpbSgpOmJ9OmZ1bmN0aW9uKGIpe3JldHVybiB3KGIpP2IucmVwbGFjZSgvXlxcc1xccyovLFwiXCIpLnJlcGxhY2UoL1xcc1xccyokLyxcIlwiKTpifX0oKTtLYT05PlM/ZnVuY3Rpb24oYil7Yj1iLm5vZGVOYW1lP2I6YlswXTtyZXR1cm4gYi5zY29wZU5hbWUmJlwiSFRNTFwiIT1iLnNjb3BlTmFtZT9GYShiLnNjb3BlTmFtZStcIjpcIitiLm5vZGVOYW1lKTpiLm5vZGVOYW1lfTpmdW5jdGlvbihiKXtyZXR1cm4gYi5ub2RlTmFtZT9iLm5vZGVOYW1lOmJbMF0ubm9kZU5hbWV9O3ZhciBYYz0vW0EtWl0vZywkYz17ZnVsbDpcIjEuMi4xNlwiLG1ham9yOjEsbWlub3I6Mixkb3Q6MTYsY29kZU5hbWU6XCJiYWRnZXItZW51bWVyYXRpb25cIn0sVWE9Ti5jYWNoZT17fSxnYj1OLmV4cGFuZG89XCJuZy1cIisobmV3IERhdGUpLmdldFRpbWUoKSxcbm1lPTEsUGM9Ty5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyP2Z1bmN0aW9uKGIsYSxjKXtiLmFkZEV2ZW50TGlzdGVuZXIoYSxjLCExKX06ZnVuY3Rpb24oYixhLGMpe2IuYXR0YWNoRXZlbnQoXCJvblwiK2EsYyl9LEZiPU8uZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcj9mdW5jdGlvbihiLGEsYyl7Yi5yZW1vdmVFdmVudExpc3RlbmVyKGEsYywhMSl9OmZ1bmN0aW9uKGIsYSxjKXtiLmRldGFjaEV2ZW50KFwib25cIithLGMpfTtOLl9kYXRhPWZ1bmN0aW9uKGIpe3JldHVybiB0aGlzLmNhY2hlW2JbdGhpcy5leHBhbmRvXV18fHt9fTt2YXIgaGU9LyhbXFw6XFwtXFxfXSsoLikpL2csaWU9L15tb3ooW0EtWl0pLyxCYj10KFwianFMaXRlXCIpLGplPS9ePChcXHcrKVxccypcXC8/Pig/OjxcXC9cXDE+fCkkLyxDYj0vPHwmIz9cXHcrOy8sa2U9LzwoW1xcdzpdKykvLGxlPS88KD8hYXJlYXxicnxjb2x8ZW1iZWR8aHJ8aW1nfGlucHV0fGxpbmt8bWV0YXxwYXJhbSkoKFtcXHc6XSspW14+XSopXFwvPi9naSxlYT1cbntvcHRpb246WzEsJzxzZWxlY3QgbXVsdGlwbGU9XCJtdWx0aXBsZVwiPicsXCI8L3NlbGVjdD5cIl0sdGhlYWQ6WzEsXCI8dGFibGU+XCIsXCI8L3RhYmxlPlwiXSxjb2w6WzIsXCI8dGFibGU+PGNvbGdyb3VwPlwiLFwiPC9jb2xncm91cD48L3RhYmxlPlwiXSx0cjpbMixcIjx0YWJsZT48dGJvZHk+XCIsXCI8L3Rib2R5PjwvdGFibGU+XCJdLHRkOlszLFwiPHRhYmxlPjx0Ym9keT48dHI+XCIsXCI8L3RyPjwvdGJvZHk+PC90YWJsZT5cIl0sX2RlZmF1bHQ6WzAsXCJcIixcIlwiXX07ZWEub3B0Z3JvdXA9ZWEub3B0aW9uO2VhLnRib2R5PWVhLnRmb290PWVhLmNvbGdyb3VwPWVhLmNhcHRpb249ZWEudGhlYWQ7ZWEudGg9ZWEudGQ7dmFyIEphPU4ucHJvdG90eXBlPXtyZWFkeTpmdW5jdGlvbihiKXtmdW5jdGlvbiBhKCl7Y3x8KGM9ITAsYigpKX12YXIgYz0hMTtcImNvbXBsZXRlXCI9PT1VLnJlYWR5U3RhdGU/c2V0VGltZW91dChhKToodGhpcy5vbihcIkRPTUNvbnRlbnRMb2FkZWRcIixhKSxOKE8pLm9uKFwibG9hZFwiLGEpKX0sdG9TdHJpbmc6ZnVuY3Rpb24oKXt2YXIgYj1cbltdO3EodGhpcyxmdW5jdGlvbihhKXtiLnB1c2goXCJcIithKX0pO3JldHVyblwiW1wiK2Iuam9pbihcIiwgXCIpK1wiXVwifSxlcTpmdW5jdGlvbihiKXtyZXR1cm4gMDw9Yj95KHRoaXNbYl0pOnkodGhpc1t0aGlzLmxlbmd0aCtiXSl9LGxlbmd0aDowLHB1c2g6S2Usc29ydDpbXS5zb3J0LHNwbGljZTpbXS5zcGxpY2V9LGtiPXt9O3EoXCJtdWx0aXBsZSBzZWxlY3RlZCBjaGVja2VkIGRpc2FibGVkIHJlYWRPbmx5IHJlcXVpcmVkIG9wZW5cIi5zcGxpdChcIiBcIiksZnVuY3Rpb24oYil7a2JbSyhiKV09Yn0pO3ZhciBuYz17fTtxKFwiaW5wdXQgc2VsZWN0IG9wdGlvbiB0ZXh0YXJlYSBidXR0b24gZm9ybSBkZXRhaWxzXCIuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGIpe25jW0ZhKGIpXT0hMH0pO3Eoe2RhdGE6amMsaW5oZXJpdGVkRGF0YTpqYixzY29wZTpmdW5jdGlvbihiKXtyZXR1cm4geShiKS5kYXRhKFwiJHNjb3BlXCIpfHxqYihiLnBhcmVudE5vZGV8fGIsW1wiJGlzb2xhdGVTY29wZVwiLFwiJHNjb3BlXCJdKX0sXG5pc29sYXRlU2NvcGU6ZnVuY3Rpb24oYil7cmV0dXJuIHkoYikuZGF0YShcIiRpc29sYXRlU2NvcGVcIil8fHkoYikuZGF0YShcIiRpc29sYXRlU2NvcGVOb1RlbXBsYXRlXCIpfSxjb250cm9sbGVyOmtjLGluamVjdG9yOmZ1bmN0aW9uKGIpe3JldHVybiBqYihiLFwiJGluamVjdG9yXCIpfSxyZW1vdmVBdHRyOmZ1bmN0aW9uKGIsYSl7Yi5yZW1vdmVBdHRyaWJ1dGUoYSl9LGhhc0NsYXNzOkdiLGNzczpmdW5jdGlvbihiLGEsYyl7YT1UYShhKTtpZihCKGMpKWIuc3R5bGVbYV09YztlbHNle3ZhciBkOzg+PVMmJihkPWIuY3VycmVudFN0eWxlJiZiLmN1cnJlbnRTdHlsZVthXSxcIlwiPT09ZCYmKGQ9XCJhdXRvXCIpKTtkPWR8fGIuc3R5bGVbYV07OD49UyYmKGQ9XCJcIj09PWQ/czpkKTtyZXR1cm4gZH19LGF0dHI6ZnVuY3Rpb24oYixhLGMpe3ZhciBkPUsoYSk7aWYoa2JbZF0paWYoQihjKSljPyhiW2FdPSEwLGIuc2V0QXR0cmlidXRlKGEsZCkpOihiW2FdPSExLGIucmVtb3ZlQXR0cmlidXRlKGQpKTtcbmVsc2UgcmV0dXJuIGJbYV18fChiLmF0dHJpYnV0ZXMuZ2V0TmFtZWRJdGVtKGEpfHxDKS5zcGVjaWZpZWQ/ZDpzO2Vsc2UgaWYoQihjKSliLnNldEF0dHJpYnV0ZShhLGMpO2Vsc2UgaWYoYi5nZXRBdHRyaWJ1dGUpcmV0dXJuIGI9Yi5nZXRBdHRyaWJ1dGUoYSwyKSxudWxsPT09Yj9zOmJ9LHByb3A6ZnVuY3Rpb24oYixhLGMpe2lmKEIoYykpYlthXT1jO2Vsc2UgcmV0dXJuIGJbYV19LHRleHQ6ZnVuY3Rpb24oKXtmdW5jdGlvbiBiKGIsZCl7dmFyIGU9YVtiLm5vZGVUeXBlXTtpZihFKGQpKXJldHVybiBlP2JbZV06XCJcIjtiW2VdPWR9dmFyIGE9W107OT5TPyhhWzFdPVwiaW5uZXJUZXh0XCIsYVszXT1cIm5vZGVWYWx1ZVwiKTphWzFdPWFbM109XCJ0ZXh0Q29udGVudFwiO2IuJGR2PVwiXCI7cmV0dXJuIGJ9KCksdmFsOmZ1bmN0aW9uKGIsYSl7aWYoRShhKSl7aWYoXCJTRUxFQ1RcIj09PUthKGIpJiZiLm11bHRpcGxlKXt2YXIgYz1bXTtxKGIub3B0aW9ucyxmdW5jdGlvbihhKXthLnNlbGVjdGVkJiZcbmMucHVzaChhLnZhbHVlfHxhLnRleHQpfSk7cmV0dXJuIDA9PT1jLmxlbmd0aD9udWxsOmN9cmV0dXJuIGIudmFsdWV9Yi52YWx1ZT1hfSxodG1sOmZ1bmN0aW9uKGIsYSl7aWYoRShhKSlyZXR1cm4gYi5pbm5lckhUTUw7Zm9yKHZhciBjPTAsZD1iLmNoaWxkTm9kZXM7YzxkLmxlbmd0aDtjKyspSGEoZFtjXSk7Yi5pbm5lckhUTUw9YX0sZW1wdHk6bGN9LGZ1bmN0aW9uKGIsYSl7Ti5wcm90b3R5cGVbYV09ZnVuY3Rpb24oYSxkKXt2YXIgZSxnO2lmKGIhPT1sYyYmKDI9PWIubGVuZ3RoJiZiIT09R2ImJmIhPT1rYz9hOmQpPT09cyl7aWYoWChhKSl7Zm9yKGU9MDtlPHRoaXMubGVuZ3RoO2UrKylpZihiPT09amMpYih0aGlzW2VdLGEpO2Vsc2UgZm9yKGcgaW4gYSliKHRoaXNbZV0sZyxhW2ddKTtyZXR1cm4gdGhpc31lPWIuJGR2O2c9ZT09PXM/TWF0aC5taW4odGhpcy5sZW5ndGgsMSk6dGhpcy5sZW5ndGg7Zm9yKHZhciBmPTA7ZjxnO2YrKyl7dmFyIGg9Yih0aGlzW2ZdLGEsZCk7ZT1cbmU/ZStoOmh9cmV0dXJuIGV9Zm9yKGU9MDtlPHRoaXMubGVuZ3RoO2UrKyliKHRoaXNbZV0sYSxkKTtyZXR1cm4gdGhpc319KTtxKHtyZW1vdmVEYXRhOmhjLGRlYWxvYzpIYSxvbjpmdW5jdGlvbiBhKGMsZCxlLGcpe2lmKEIoZykpdGhyb3cgQmIoXCJvbmFyZ3NcIik7dmFyIGY9bGEoYyxcImV2ZW50c1wiKSxoPWxhKGMsXCJoYW5kbGVcIik7Znx8bGEoYyxcImV2ZW50c1wiLGY9e30pO2h8fGxhKGMsXCJoYW5kbGVcIixoPW5lKGMsZikpO3EoZC5zcGxpdChcIiBcIiksZnVuY3Rpb24oZCl7dmFyIGc9ZltkXTtpZighZyl7aWYoXCJtb3VzZWVudGVyXCI9PWR8fFwibW91c2VsZWF2ZVwiPT1kKXt2YXIgbT1VLmJvZHkuY29udGFpbnN8fFUuYm9keS5jb21wYXJlRG9jdW1lbnRQb3NpdGlvbj9mdW5jdGlvbihhLGMpe3ZhciBkPTk9PT1hLm5vZGVUeXBlP2EuZG9jdW1lbnRFbGVtZW50OmEsZT1jJiZjLnBhcmVudE5vZGU7cmV0dXJuIGE9PT1lfHwhIShlJiYxPT09ZS5ub2RlVHlwZSYmKGQuY29udGFpbnM/ZC5jb250YWlucyhlKTpcbmEuY29tcGFyZURvY3VtZW50UG9zaXRpb24mJmEuY29tcGFyZURvY3VtZW50UG9zaXRpb24oZSkmMTYpKX06ZnVuY3Rpb24oYSxjKXtpZihjKWZvcig7Yz1jLnBhcmVudE5vZGU7KWlmKGM9PT1hKXJldHVybiEwO3JldHVybiExfTtmW2RdPVtdO2EoYyx7bW91c2VsZWF2ZTpcIm1vdXNlb3V0XCIsbW91c2VlbnRlcjpcIm1vdXNlb3ZlclwifVtkXSxmdW5jdGlvbihhKXt2YXIgYz1hLnJlbGF0ZWRUYXJnZXQ7YyYmKGM9PT10aGlzfHxtKHRoaXMsYykpfHxoKGEsZCl9KX1lbHNlIFBjKGMsZCxoKSxmW2RdPVtdO2c9ZltkXX1nLnB1c2goZSl9KX0sb2ZmOmljLG9uZTpmdW5jdGlvbihhLGMsZCl7YT15KGEpO2Eub24oYyxmdW5jdGlvbiBnKCl7YS5vZmYoYyxkKTthLm9mZihjLGcpfSk7YS5vbihjLGQpfSxyZXBsYWNlV2l0aDpmdW5jdGlvbihhLGMpe3ZhciBkLGU9YS5wYXJlbnROb2RlO0hhKGEpO3EobmV3IE4oYyksZnVuY3Rpb24oYyl7ZD9lLmluc2VydEJlZm9yZShjLGQubmV4dFNpYmxpbmcpOlxuZS5yZXBsYWNlQ2hpbGQoYyxhKTtkPWN9KX0sY2hpbGRyZW46ZnVuY3Rpb24oYSl7dmFyIGM9W107cShhLmNoaWxkTm9kZXMsZnVuY3Rpb24oYSl7MT09PWEubm9kZVR5cGUmJmMucHVzaChhKX0pO3JldHVybiBjfSxjb250ZW50czpmdW5jdGlvbihhKXtyZXR1cm4gYS5jb250ZW50RG9jdW1lbnR8fGEuY2hpbGROb2Rlc3x8W119LGFwcGVuZDpmdW5jdGlvbihhLGMpe3EobmV3IE4oYyksZnVuY3Rpb24oYyl7MSE9PWEubm9kZVR5cGUmJjExIT09YS5ub2RlVHlwZXx8YS5hcHBlbmRDaGlsZChjKX0pfSxwcmVwZW5kOmZ1bmN0aW9uKGEsYyl7aWYoMT09PWEubm9kZVR5cGUpe3ZhciBkPWEuZmlyc3RDaGlsZDtxKG5ldyBOKGMpLGZ1bmN0aW9uKGMpe2EuaW5zZXJ0QmVmb3JlKGMsZCl9KX19LHdyYXA6ZnVuY3Rpb24oYSxjKXtjPXkoYylbMF07dmFyIGQ9YS5wYXJlbnROb2RlO2QmJmQucmVwbGFjZUNoaWxkKGMsYSk7Yy5hcHBlbmRDaGlsZChhKX0scmVtb3ZlOmZ1bmN0aW9uKGEpe0hhKGEpO1xudmFyIGM9YS5wYXJlbnROb2RlO2MmJmMucmVtb3ZlQ2hpbGQoYSl9LGFmdGVyOmZ1bmN0aW9uKGEsYyl7dmFyIGQ9YSxlPWEucGFyZW50Tm9kZTtxKG5ldyBOKGMpLGZ1bmN0aW9uKGEpe2UuaW5zZXJ0QmVmb3JlKGEsZC5uZXh0U2libGluZyk7ZD1hfSl9LGFkZENsYXNzOmliLHJlbW92ZUNsYXNzOmhiLHRvZ2dsZUNsYXNzOmZ1bmN0aW9uKGEsYyxkKXtjJiZxKGMuc3BsaXQoXCIgXCIpLGZ1bmN0aW9uKGMpe3ZhciBnPWQ7RShnKSYmKGc9IUdiKGEsYykpOyhnP2liOmhiKShhLGMpfSl9LHBhcmVudDpmdW5jdGlvbihhKXtyZXR1cm4oYT1hLnBhcmVudE5vZGUpJiYxMSE9PWEubm9kZVR5cGU/YTpudWxsfSxuZXh0OmZ1bmN0aW9uKGEpe2lmKGEubmV4dEVsZW1lbnRTaWJsaW5nKXJldHVybiBhLm5leHRFbGVtZW50U2libGluZztmb3IoYT1hLm5leHRTaWJsaW5nO251bGwhPWEmJjEhPT1hLm5vZGVUeXBlOylhPWEubmV4dFNpYmxpbmc7cmV0dXJuIGF9LGZpbmQ6ZnVuY3Rpb24oYSxjKXtyZXR1cm4gYS5nZXRFbGVtZW50c0J5VGFnTmFtZT9cbmEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYyk6W119LGNsb25lOkViLHRyaWdnZXJIYW5kbGVyOmZ1bmN0aW9uKGEsYyxkKXtjPShsYShhLFwiZXZlbnRzXCIpfHx7fSlbY107ZD1kfHxbXTt2YXIgZT1be3ByZXZlbnREZWZhdWx0OkMsc3RvcFByb3BhZ2F0aW9uOkN9XTtxKGMsZnVuY3Rpb24oYyl7Yy5hcHBseShhLGUuY29uY2F0KGQpKX0pfX0sZnVuY3Rpb24oYSxjKXtOLnByb3RvdHlwZVtjXT1mdW5jdGlvbihjLGUsZyl7Zm9yKHZhciBmLGg9MDtoPHRoaXMubGVuZ3RoO2grKylFKGYpPyhmPWEodGhpc1toXSxjLGUsZyksQihmKSYmKGY9eShmKSkpOkRiKGYsYSh0aGlzW2hdLGMsZSxnKSk7cmV0dXJuIEIoZik/Zjp0aGlzfTtOLnByb3RvdHlwZS5iaW5kPU4ucHJvdG90eXBlLm9uO04ucHJvdG90eXBlLnVuYmluZD1OLnByb3RvdHlwZS5vZmZ9KTtWYS5wcm90b3R5cGU9e3B1dDpmdW5jdGlvbihhLGMpe3RoaXNbSWEoYSldPWN9LGdldDpmdW5jdGlvbihhKXtyZXR1cm4gdGhpc1tJYShhKV19LFxucmVtb3ZlOmZ1bmN0aW9uKGEpe3ZhciBjPXRoaXNbYT1JYShhKV07ZGVsZXRlIHRoaXNbYV07cmV0dXJuIGN9fTt2YXIgcGU9L15mdW5jdGlvblxccypbXlxcKF0qXFwoXFxzKihbXlxcKV0qKVxcKS9tLHFlPS8sLyxyZT0vXlxccyooXz8pKFxcUys/KVxcMVxccyokLyxvZT0vKChcXC9cXC8uKiQpfChcXC9cXCpbXFxzXFxTXSo/XFwqXFwvKSkvbWcsV2E9dChcIiRpbmplY3RvclwiKSxMZT10KFwiJGFuaW1hdGVcIiksTGQ9W1wiJHByb3ZpZGVcIixmdW5jdGlvbihhKXt0aGlzLiQkc2VsZWN0b3JzPXt9O3RoaXMucmVnaXN0ZXI9ZnVuY3Rpb24oYyxkKXt2YXIgZT1jK1wiLWFuaW1hdGlvblwiO2lmKGMmJlwiLlwiIT1jLmNoYXJBdCgwKSl0aHJvdyBMZShcIm5vdGNzZWxcIixjKTt0aGlzLiQkc2VsZWN0b3JzW2Muc3Vic3RyKDEpXT1lO2EuZmFjdG9yeShlLGQpfTt0aGlzLmNsYXNzTmFtZUZpbHRlcj1mdW5jdGlvbihhKXsxPT09YXJndW1lbnRzLmxlbmd0aCYmKHRoaXMuJCRjbGFzc05hbWVGaWx0ZXI9YSBpbnN0YW5jZW9mIFJlZ0V4cD9cbmE6bnVsbCk7cmV0dXJuIHRoaXMuJCRjbGFzc05hbWVGaWx0ZXJ9O3RoaXMuJGdldD1bXCIkdGltZW91dFwiLFwiJCRhc3luY0NhbGxiYWNrXCIsZnVuY3Rpb24oYSxkKXtyZXR1cm57ZW50ZXI6ZnVuY3Rpb24oYSxjLGYsaCl7Zj9mLmFmdGVyKGEpOihjJiZjWzBdfHwoYz1mLnBhcmVudCgpKSxjLmFwcGVuZChhKSk7aCYmZChoKX0sbGVhdmU6ZnVuY3Rpb24oYSxjKXthLnJlbW92ZSgpO2MmJmQoYyl9LG1vdmU6ZnVuY3Rpb24oYSxjLGQsaCl7dGhpcy5lbnRlcihhLGMsZCxoKX0sYWRkQ2xhc3M6ZnVuY3Rpb24oYSxjLGYpe2M9dyhjKT9jOk0oYyk/Yy5qb2luKFwiIFwiKTpcIlwiO3EoYSxmdW5jdGlvbihhKXtpYihhLGMpfSk7ZiYmZChmKX0scmVtb3ZlQ2xhc3M6ZnVuY3Rpb24oYSxjLGYpe2M9dyhjKT9jOk0oYyk/Yy5qb2luKFwiIFwiKTpcIlwiO3EoYSxmdW5jdGlvbihhKXtoYihhLGMpfSk7ZiYmZChmKX0sc2V0Q2xhc3M6ZnVuY3Rpb24oYSxjLGYsaCl7cShhLGZ1bmN0aW9uKGEpe2liKGEsYyk7aGIoYSxcbmYpfSk7aCYmZChoKX0sZW5hYmxlZDpDfX1dfV0samE9dChcIiRjb21waWxlXCIpO2NjLiRpbmplY3Q9W1wiJHByb3ZpZGVcIixcIiQkc2FuaXRpemVVcmlQcm92aWRlclwiXTt2YXIgdGU9L14oeFtcXDpcXC1fXXxkYXRhW1xcOlxcLV9dKS9pLHZjPXQoXCIkaW50ZXJwb2xhdGVcIiksTWU9L14oW15cXD8jXSopKFxcPyhbXiNdKikpPygjKC4qKSk/JC8sd2U9e2h0dHA6ODAsaHR0cHM6NDQzLGZ0cDoyMX0sS2I9dChcIiRsb2NhdGlvblwiKTtBYy5wcm90b3R5cGU9TGIucHJvdG90eXBlPXpjLnByb3RvdHlwZT17JCRodG1sNTohMSwkJHJlcGxhY2U6ITEsYWJzVXJsOm5iKFwiJCRhYnNVcmxcIiksdXJsOmZ1bmN0aW9uKGEsYyl7aWYoRShhKSlyZXR1cm4gdGhpcy4kJHVybDt2YXIgZD1NZS5leGVjKGEpO2RbMV0mJnRoaXMucGF0aChkZWNvZGVVUklDb21wb25lbnQoZFsxXSkpOyhkWzJdfHxkWzFdKSYmdGhpcy5zZWFyY2goZFszXXx8XCJcIik7dGhpcy5oYXNoKGRbNV18fFwiXCIsYyk7cmV0dXJuIHRoaXN9LHByb3RvY29sOm5iKFwiJCRwcm90b2NvbFwiKSxcbmhvc3Q6bmIoXCIkJGhvc3RcIikscG9ydDpuYihcIiQkcG9ydFwiKSxwYXRoOkJjKFwiJCRwYXRoXCIsZnVuY3Rpb24oYSl7cmV0dXJuXCIvXCI9PWEuY2hhckF0KDApP2E6XCIvXCIrYX0pLHNlYXJjaDpmdW5jdGlvbihhLGMpe3N3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtjYXNlIDA6cmV0dXJuIHRoaXMuJCRzZWFyY2g7Y2FzZSAxOmlmKHcoYSkpdGhpcy4kJHNlYXJjaD1ZYihhKTtlbHNlIGlmKFgoYSkpdGhpcy4kJHNlYXJjaD1hO2Vsc2UgdGhyb3cgS2IoXCJpc3JjaGFyZ1wiKTticmVhaztkZWZhdWx0OkUoYyl8fG51bGw9PT1jP2RlbGV0ZSB0aGlzLiQkc2VhcmNoW2FdOnRoaXMuJCRzZWFyY2hbYV09Y310aGlzLiQkY29tcG9zZSgpO3JldHVybiB0aGlzfSxoYXNoOkJjKFwiJCRoYXNoXCIsRGEpLHJlcGxhY2U6ZnVuY3Rpb24oKXt0aGlzLiQkcmVwbGFjZT0hMDtyZXR1cm4gdGhpc319O3ZhciBCYT10KFwiJHBhcnNlXCIpLEVjPXt9LHRhLE1hPXtcIm51bGxcIjpmdW5jdGlvbigpe3JldHVybiBudWxsfSxcInRydWVcIjpmdW5jdGlvbigpe3JldHVybiEwfSxcblwiZmFsc2VcIjpmdW5jdGlvbigpe3JldHVybiExfSx1bmRlZmluZWQ6QyxcIitcIjpmdW5jdGlvbihhLGMsZCxlKXtkPWQoYSxjKTtlPWUoYSxjKTtyZXR1cm4gQihkKT9CKGUpP2QrZTpkOkIoZSk/ZTpzfSxcIi1cIjpmdW5jdGlvbihhLGMsZCxlKXtkPWQoYSxjKTtlPWUoYSxjKTtyZXR1cm4oQihkKT9kOjApLShCKGUpP2U6MCl9LFwiKlwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYykqZShhLGMpfSxcIi9cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpL2UoYSxjKX0sXCIlXCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKSVlKGEsYyl9LFwiXlwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyleZShhLGMpfSxcIj1cIjpDLFwiPT09XCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKT09PWUoYSxjKX0sXCIhPT1cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpIT09ZShhLGMpfSxcIj09XCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKT09ZShhLFxuYyl9LFwiIT1cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpIT1lKGEsYyl9LFwiPFwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyk8ZShhLGMpfSxcIj5cIjpmdW5jdGlvbihhLGMsZCxlKXtyZXR1cm4gZChhLGMpPmUoYSxjKX0sXCI8PVwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyk8PWUoYSxjKX0sXCI+PVwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyk+PWUoYSxjKX0sXCImJlwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYykmJmUoYSxjKX0sXCJ8fFwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBkKGEsYyl8fGUoYSxjKX0sXCImXCI6ZnVuY3Rpb24oYSxjLGQsZSl7cmV0dXJuIGQoYSxjKSZlKGEsYyl9LFwifFwiOmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybiBlKGEsYykoYSxjLGQoYSxjKSl9LFwiIVwiOmZ1bmN0aW9uKGEsYyxkKXtyZXR1cm4hZChhLGMpfX0sTmU9e246XCJcXG5cIixmOlwiXFxmXCIscjpcIlxcclwiLHQ6XCJcXHRcIix2OlwiXFx2XCIsXCInXCI6XCInXCIsJ1wiJzonXCInfSxcbk5iPWZ1bmN0aW9uKGEpe3RoaXMub3B0aW9ucz1hfTtOYi5wcm90b3R5cGU9e2NvbnN0cnVjdG9yOk5iLGxleDpmdW5jdGlvbihhKXt0aGlzLnRleHQ9YTt0aGlzLmluZGV4PTA7dGhpcy5jaD1zO3RoaXMubGFzdENoPVwiOlwiO3RoaXMudG9rZW5zPVtdO3ZhciBjO2ZvcihhPVtdO3RoaXMuaW5kZXg8dGhpcy50ZXh0Lmxlbmd0aDspe3RoaXMuY2g9dGhpcy50ZXh0LmNoYXJBdCh0aGlzLmluZGV4KTtpZih0aGlzLmlzKFwiXFxcIidcIikpdGhpcy5yZWFkU3RyaW5nKHRoaXMuY2gpO2Vsc2UgaWYodGhpcy5pc051bWJlcih0aGlzLmNoKXx8dGhpcy5pcyhcIi5cIikmJnRoaXMuaXNOdW1iZXIodGhpcy5wZWVrKCkpKXRoaXMucmVhZE51bWJlcigpO2Vsc2UgaWYodGhpcy5pc0lkZW50KHRoaXMuY2gpKXRoaXMucmVhZElkZW50KCksdGhpcy53YXMoXCJ7LFwiKSYmKFwie1wiPT09YVswXSYmKGM9dGhpcy50b2tlbnNbdGhpcy50b2tlbnMubGVuZ3RoLTFdKSkmJihjLmpzb249LTE9PT1jLnRleHQuaW5kZXhPZihcIi5cIikpO1xuZWxzZSBpZih0aGlzLmlzKFwiKCl7fVtdLiw7Oj9cIikpdGhpcy50b2tlbnMucHVzaCh7aW5kZXg6dGhpcy5pbmRleCx0ZXh0OnRoaXMuY2gsanNvbjp0aGlzLndhcyhcIjpbLFwiKSYmdGhpcy5pcyhcIntbXCIpfHx0aGlzLmlzKFwifV06LFwiKX0pLHRoaXMuaXMoXCJ7W1wiKSYmYS51bnNoaWZ0KHRoaXMuY2gpLHRoaXMuaXMoXCJ9XVwiKSYmYS5zaGlmdCgpLHRoaXMuaW5kZXgrKztlbHNlIGlmKHRoaXMuaXNXaGl0ZXNwYWNlKHRoaXMuY2gpKXt0aGlzLmluZGV4Kys7Y29udGludWV9ZWxzZXt2YXIgZD10aGlzLmNoK3RoaXMucGVlaygpLGU9ZCt0aGlzLnBlZWsoMiksZz1NYVt0aGlzLmNoXSxmPU1hW2RdLGg9TWFbZV07aD8odGhpcy50b2tlbnMucHVzaCh7aW5kZXg6dGhpcy5pbmRleCx0ZXh0OmUsZm46aH0pLHRoaXMuaW5kZXgrPTMpOmY/KHRoaXMudG9rZW5zLnB1c2goe2luZGV4OnRoaXMuaW5kZXgsdGV4dDpkLGZuOmZ9KSx0aGlzLmluZGV4Kz0yKTpnPyh0aGlzLnRva2Vucy5wdXNoKHtpbmRleDp0aGlzLmluZGV4LFxudGV4dDp0aGlzLmNoLGZuOmcsanNvbjp0aGlzLndhcyhcIlssOlwiKSYmdGhpcy5pcyhcIistXCIpfSksdGhpcy5pbmRleCs9MSk6dGhpcy50aHJvd0Vycm9yKFwiVW5leHBlY3RlZCBuZXh0IGNoYXJhY3RlciBcIix0aGlzLmluZGV4LHRoaXMuaW5kZXgrMSl9dGhpcy5sYXN0Q2g9dGhpcy5jaH1yZXR1cm4gdGhpcy50b2tlbnN9LGlzOmZ1bmN0aW9uKGEpe3JldHVybi0xIT09YS5pbmRleE9mKHRoaXMuY2gpfSx3YXM6ZnVuY3Rpb24oYSl7cmV0dXJuLTEhPT1hLmluZGV4T2YodGhpcy5sYXN0Q2gpfSxwZWVrOmZ1bmN0aW9uKGEpe2E9YXx8MTtyZXR1cm4gdGhpcy5pbmRleCthPHRoaXMudGV4dC5sZW5ndGg/dGhpcy50ZXh0LmNoYXJBdCh0aGlzLmluZGV4K2EpOiExfSxpc051bWJlcjpmdW5jdGlvbihhKXtyZXR1cm5cIjBcIjw9YSYmXCI5XCI+PWF9LGlzV2hpdGVzcGFjZTpmdW5jdGlvbihhKXtyZXR1cm5cIiBcIj09PWF8fFwiXFxyXCI9PT1hfHxcIlxcdFwiPT09YXx8XCJcXG5cIj09PWF8fFwiXFx2XCI9PT1hfHxcIlxcdTAwYTBcIj09PVxuYX0saXNJZGVudDpmdW5jdGlvbihhKXtyZXR1cm5cImFcIjw9YSYmXCJ6XCI+PWF8fFwiQVwiPD1hJiZcIlpcIj49YXx8XCJfXCI9PT1hfHxcIiRcIj09PWF9LGlzRXhwT3BlcmF0b3I6ZnVuY3Rpb24oYSl7cmV0dXJuXCItXCI9PT1hfHxcIitcIj09PWF8fHRoaXMuaXNOdW1iZXIoYSl9LHRocm93RXJyb3I6ZnVuY3Rpb24oYSxjLGQpe2Q9ZHx8dGhpcy5pbmRleDtjPUIoYyk/XCJzIFwiK2MrXCItXCIrdGhpcy5pbmRleCtcIiBbXCIrdGhpcy50ZXh0LnN1YnN0cmluZyhjLGQpK1wiXVwiOlwiIFwiK2Q7dGhyb3cgQmEoXCJsZXhlcnJcIixhLGMsdGhpcy50ZXh0KTt9LHJlYWROdW1iZXI6ZnVuY3Rpb24oKXtmb3IodmFyIGE9XCJcIixjPXRoaXMuaW5kZXg7dGhpcy5pbmRleDx0aGlzLnRleHQubGVuZ3RoOyl7dmFyIGQ9Syh0aGlzLnRleHQuY2hhckF0KHRoaXMuaW5kZXgpKTtpZihcIi5cIj09ZHx8dGhpcy5pc051bWJlcihkKSlhKz1kO2Vsc2V7dmFyIGU9dGhpcy5wZWVrKCk7aWYoXCJlXCI9PWQmJnRoaXMuaXNFeHBPcGVyYXRvcihlKSlhKz1cbmQ7ZWxzZSBpZih0aGlzLmlzRXhwT3BlcmF0b3IoZCkmJmUmJnRoaXMuaXNOdW1iZXIoZSkmJlwiZVwiPT1hLmNoYXJBdChhLmxlbmd0aC0xKSlhKz1kO2Vsc2UgaWYoIXRoaXMuaXNFeHBPcGVyYXRvcihkKXx8ZSYmdGhpcy5pc051bWJlcihlKXx8XCJlXCIhPWEuY2hhckF0KGEubGVuZ3RoLTEpKWJyZWFrO2Vsc2UgdGhpcy50aHJvd0Vycm9yKFwiSW52YWxpZCBleHBvbmVudFwiKX10aGlzLmluZGV4Kyt9YSo9MTt0aGlzLnRva2Vucy5wdXNoKHtpbmRleDpjLHRleHQ6YSxqc29uOiEwLGZuOmZ1bmN0aW9uKCl7cmV0dXJuIGF9fSl9LHJlYWRJZGVudDpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLGM9XCJcIixkPXRoaXMuaW5kZXgsZSxnLGYsaDt0aGlzLmluZGV4PHRoaXMudGV4dC5sZW5ndGg7KXtoPXRoaXMudGV4dC5jaGFyQXQodGhpcy5pbmRleCk7aWYoXCIuXCI9PT1ofHx0aGlzLmlzSWRlbnQoaCl8fHRoaXMuaXNOdW1iZXIoaCkpXCIuXCI9PT1oJiYoZT10aGlzLmluZGV4KSxjKz1oO2Vsc2UgYnJlYWs7XG50aGlzLmluZGV4Kyt9aWYoZSlmb3IoZz10aGlzLmluZGV4O2c8dGhpcy50ZXh0Lmxlbmd0aDspe2g9dGhpcy50ZXh0LmNoYXJBdChnKTtpZihcIihcIj09PWgpe2Y9Yy5zdWJzdHIoZS1kKzEpO2M9Yy5zdWJzdHIoMCxlLWQpO3RoaXMuaW5kZXg9ZzticmVha31pZih0aGlzLmlzV2hpdGVzcGFjZShoKSlnKys7ZWxzZSBicmVha31kPXtpbmRleDpkLHRleHQ6Y307aWYoTWEuaGFzT3duUHJvcGVydHkoYykpZC5mbj1NYVtjXSxkLmpzb249TWFbY107ZWxzZXt2YXIgbD1EYyhjLHRoaXMub3B0aW9ucyx0aGlzLnRleHQpO2QuZm49RChmdW5jdGlvbihhLGMpe3JldHVybiBsKGEsYyl9LHthc3NpZ246ZnVuY3Rpb24oZCxlKXtyZXR1cm4gb2IoZCxjLGUsYS50ZXh0LGEub3B0aW9ucyl9fSl9dGhpcy50b2tlbnMucHVzaChkKTtmJiYodGhpcy50b2tlbnMucHVzaCh7aW5kZXg6ZSx0ZXh0OlwiLlwiLGpzb246ITF9KSx0aGlzLnRva2Vucy5wdXNoKHtpbmRleDplKzEsdGV4dDpmLGpzb246ITF9KSl9LFxucmVhZFN0cmluZzpmdW5jdGlvbihhKXt2YXIgYz10aGlzLmluZGV4O3RoaXMuaW5kZXgrKztmb3IodmFyIGQ9XCJcIixlPWEsZz0hMTt0aGlzLmluZGV4PHRoaXMudGV4dC5sZW5ndGg7KXt2YXIgZj10aGlzLnRleHQuY2hhckF0KHRoaXMuaW5kZXgpLGU9ZStmO2lmKGcpXCJ1XCI9PT1mPyhmPXRoaXMudGV4dC5zdWJzdHJpbmcodGhpcy5pbmRleCsxLHRoaXMuaW5kZXgrNSksZi5tYXRjaCgvW1xcZGEtZl17NH0vaSl8fHRoaXMudGhyb3dFcnJvcihcIkludmFsaWQgdW5pY29kZSBlc2NhcGUgW1xcXFx1XCIrZitcIl1cIiksdGhpcy5pbmRleCs9NCxkKz1TdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGYsMTYpKSk6ZD0oZz1OZVtmXSk/ZCtnOmQrZixnPSExO2Vsc2UgaWYoXCJcXFxcXCI9PT1mKWc9ITA7ZWxzZXtpZihmPT09YSl7dGhpcy5pbmRleCsrO3RoaXMudG9rZW5zLnB1c2goe2luZGV4OmMsdGV4dDplLHN0cmluZzpkLGpzb246ITAsZm46ZnVuY3Rpb24oKXtyZXR1cm4gZH19KTtyZXR1cm59ZCs9XG5mfXRoaXMuaW5kZXgrK310aGlzLnRocm93RXJyb3IoXCJVbnRlcm1pbmF0ZWQgcXVvdGVcIixjKX19O3ZhciAkYT1mdW5jdGlvbihhLGMsZCl7dGhpcy5sZXhlcj1hO3RoaXMuJGZpbHRlcj1jO3RoaXMub3B0aW9ucz1kfTskYS5aRVJPPUQoZnVuY3Rpb24oKXtyZXR1cm4gMH0se2NvbnN0YW50OiEwfSk7JGEucHJvdG90eXBlPXtjb25zdHJ1Y3RvcjokYSxwYXJzZTpmdW5jdGlvbihhLGMpe3RoaXMudGV4dD1hO3RoaXMuanNvbj1jO3RoaXMudG9rZW5zPXRoaXMubGV4ZXIubGV4KGEpO2MmJih0aGlzLmFzc2lnbm1lbnQ9dGhpcy5sb2dpY2FsT1IsdGhpcy5mdW5jdGlvbkNhbGw9dGhpcy5maWVsZEFjY2Vzcz10aGlzLm9iamVjdEluZGV4PXRoaXMuZmlsdGVyQ2hhaW49ZnVuY3Rpb24oKXt0aGlzLnRocm93RXJyb3IoXCJpcyBub3QgdmFsaWQganNvblwiLHt0ZXh0OmEsaW5kZXg6MH0pfSk7dmFyIGQ9Yz90aGlzLnByaW1hcnkoKTp0aGlzLnN0YXRlbWVudHMoKTswIT09dGhpcy50b2tlbnMubGVuZ3RoJiZcbnRoaXMudGhyb3dFcnJvcihcImlzIGFuIHVuZXhwZWN0ZWQgdG9rZW5cIix0aGlzLnRva2Vuc1swXSk7ZC5saXRlcmFsPSEhZC5saXRlcmFsO2QuY29uc3RhbnQ9ISFkLmNvbnN0YW50O3JldHVybiBkfSxwcmltYXJ5OmZ1bmN0aW9uKCl7dmFyIGE7aWYodGhpcy5leHBlY3QoXCIoXCIpKWE9dGhpcy5maWx0ZXJDaGFpbigpLHRoaXMuY29uc3VtZShcIilcIik7ZWxzZSBpZih0aGlzLmV4cGVjdChcIltcIikpYT10aGlzLmFycmF5RGVjbGFyYXRpb24oKTtlbHNlIGlmKHRoaXMuZXhwZWN0KFwie1wiKSlhPXRoaXMub2JqZWN0KCk7ZWxzZXt2YXIgYz10aGlzLmV4cGVjdCgpOyhhPWMuZm4pfHx0aGlzLnRocm93RXJyb3IoXCJub3QgYSBwcmltYXJ5IGV4cHJlc3Npb25cIixjKTtjLmpzb24mJihhLmNvbnN0YW50PSEwLGEubGl0ZXJhbD0hMCl9Zm9yKHZhciBkO2M9dGhpcy5leHBlY3QoXCIoXCIsXCJbXCIsXCIuXCIpOylcIihcIj09PWMudGV4dD8oYT10aGlzLmZ1bmN0aW9uQ2FsbChhLGQpLGQ9bnVsbCk6XCJbXCI9PT1jLnRleHQ/XG4oZD1hLGE9dGhpcy5vYmplY3RJbmRleChhKSk6XCIuXCI9PT1jLnRleHQ/KGQ9YSxhPXRoaXMuZmllbGRBY2Nlc3MoYSkpOnRoaXMudGhyb3dFcnJvcihcIklNUE9TU0lCTEVcIik7cmV0dXJuIGF9LHRocm93RXJyb3I6ZnVuY3Rpb24oYSxjKXt0aHJvdyBCYShcInN5bnRheFwiLGMudGV4dCxhLGMuaW5kZXgrMSx0aGlzLnRleHQsdGhpcy50ZXh0LnN1YnN0cmluZyhjLmluZGV4KSk7fSxwZWVrVG9rZW46ZnVuY3Rpb24oKXtpZigwPT09dGhpcy50b2tlbnMubGVuZ3RoKXRocm93IEJhKFwidWVvZVwiLHRoaXMudGV4dCk7cmV0dXJuIHRoaXMudG9rZW5zWzBdfSxwZWVrOmZ1bmN0aW9uKGEsYyxkLGUpe2lmKDA8dGhpcy50b2tlbnMubGVuZ3RoKXt2YXIgZz10aGlzLnRva2Vuc1swXSxmPWcudGV4dDtpZihmPT09YXx8Zj09PWN8fGY9PT1kfHxmPT09ZXx8IShhfHxjfHxkfHxlKSlyZXR1cm4gZ31yZXR1cm4hMX0sZXhwZWN0OmZ1bmN0aW9uKGEsYyxkLGUpe3JldHVybihhPXRoaXMucGVlayhhLGMsZCxcbmUpKT8odGhpcy5qc29uJiYhYS5qc29uJiZ0aGlzLnRocm93RXJyb3IoXCJpcyBub3QgdmFsaWQganNvblwiLGEpLHRoaXMudG9rZW5zLnNoaWZ0KCksYSk6ITF9LGNvbnN1bWU6ZnVuY3Rpb24oYSl7dGhpcy5leHBlY3QoYSl8fHRoaXMudGhyb3dFcnJvcihcImlzIHVuZXhwZWN0ZWQsIGV4cGVjdGluZyBbXCIrYStcIl1cIix0aGlzLnBlZWsoKSl9LHVuYXJ5Rm46ZnVuY3Rpb24oYSxjKXtyZXR1cm4gRChmdW5jdGlvbihkLGUpe3JldHVybiBhKGQsZSxjKX0se2NvbnN0YW50OmMuY29uc3RhbnR9KX0sdGVybmFyeUZuOmZ1bmN0aW9uKGEsYyxkKXtyZXR1cm4gRChmdW5jdGlvbihlLGcpe3JldHVybiBhKGUsZyk/YyhlLGcpOmQoZSxnKX0se2NvbnN0YW50OmEuY29uc3RhbnQmJmMuY29uc3RhbnQmJmQuY29uc3RhbnR9KX0sYmluYXJ5Rm46ZnVuY3Rpb24oYSxjLGQpe3JldHVybiBEKGZ1bmN0aW9uKGUsZyl7cmV0dXJuIGMoZSxnLGEsZCl9LHtjb25zdGFudDphLmNvbnN0YW50JiZkLmNvbnN0YW50fSl9LFxuc3RhdGVtZW50czpmdW5jdGlvbigpe2Zvcih2YXIgYT1bXTs7KWlmKDA8dGhpcy50b2tlbnMubGVuZ3RoJiYhdGhpcy5wZWVrKFwifVwiLFwiKVwiLFwiO1wiLFwiXVwiKSYmYS5wdXNoKHRoaXMuZmlsdGVyQ2hhaW4oKSksIXRoaXMuZXhwZWN0KFwiO1wiKSlyZXR1cm4gMT09PWEubGVuZ3RoP2FbMF06ZnVuY3Rpb24oYyxkKXtmb3IodmFyIGUsZz0wO2c8YS5sZW5ndGg7ZysrKXt2YXIgZj1hW2ddO2YmJihlPWYoYyxkKSl9cmV0dXJuIGV9fSxmaWx0ZXJDaGFpbjpmdW5jdGlvbigpe2Zvcih2YXIgYT10aGlzLmV4cHJlc3Npb24oKSxjOzspaWYoYz10aGlzLmV4cGVjdChcInxcIikpYT10aGlzLmJpbmFyeUZuKGEsYy5mbix0aGlzLmZpbHRlcigpKTtlbHNlIHJldHVybiBhfSxmaWx0ZXI6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5leHBlY3QoKSxjPXRoaXMuJGZpbHRlcihhLnRleHQpLGQ9W107OylpZihhPXRoaXMuZXhwZWN0KFwiOlwiKSlkLnB1c2godGhpcy5leHByZXNzaW9uKCkpO2Vsc2V7dmFyIGU9XG5mdW5jdGlvbihhLGUsaCl7aD1baF07Zm9yKHZhciBsPTA7bDxkLmxlbmd0aDtsKyspaC5wdXNoKGRbbF0oYSxlKSk7cmV0dXJuIGMuYXBwbHkoYSxoKX07cmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGV9fX0sZXhwcmVzc2lvbjpmdW5jdGlvbigpe3JldHVybiB0aGlzLmFzc2lnbm1lbnQoKX0sYXNzaWdubWVudDpmdW5jdGlvbigpe3ZhciBhPXRoaXMudGVybmFyeSgpLGMsZDtyZXR1cm4oZD10aGlzLmV4cGVjdChcIj1cIikpPyhhLmFzc2lnbnx8dGhpcy50aHJvd0Vycm9yKFwiaW1wbGllcyBhc3NpZ25tZW50IGJ1dCBbXCIrdGhpcy50ZXh0LnN1YnN0cmluZygwLGQuaW5kZXgpK1wiXSBjYW4gbm90IGJlIGFzc2lnbmVkIHRvXCIsZCksYz10aGlzLnRlcm5hcnkoKSxmdW5jdGlvbihkLGcpe3JldHVybiBhLmFzc2lnbihkLGMoZCxnKSxnKX0pOmF9LHRlcm5hcnk6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLmxvZ2ljYWxPUigpLGMsZDtpZih0aGlzLmV4cGVjdChcIj9cIikpe2M9dGhpcy50ZXJuYXJ5KCk7XG5pZihkPXRoaXMuZXhwZWN0KFwiOlwiKSlyZXR1cm4gdGhpcy50ZXJuYXJ5Rm4oYSxjLHRoaXMudGVybmFyeSgpKTt0aGlzLnRocm93RXJyb3IoXCJleHBlY3RlZCA6XCIsZCl9ZWxzZSByZXR1cm4gYX0sbG9naWNhbE9SOmZ1bmN0aW9uKCl7Zm9yKHZhciBhPXRoaXMubG9naWNhbEFORCgpLGM7OylpZihjPXRoaXMuZXhwZWN0KFwifHxcIikpYT10aGlzLmJpbmFyeUZuKGEsYy5mbix0aGlzLmxvZ2ljYWxBTkQoKSk7ZWxzZSByZXR1cm4gYX0sbG9naWNhbEFORDpmdW5jdGlvbigpe3ZhciBhPXRoaXMuZXF1YWxpdHkoKSxjO2lmKGM9dGhpcy5leHBlY3QoXCImJlwiKSlhPXRoaXMuYmluYXJ5Rm4oYSxjLmZuLHRoaXMubG9naWNhbEFORCgpKTtyZXR1cm4gYX0sZXF1YWxpdHk6ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnJlbGF0aW9uYWwoKSxjO2lmKGM9dGhpcy5leHBlY3QoXCI9PVwiLFwiIT1cIixcIj09PVwiLFwiIT09XCIpKWE9dGhpcy5iaW5hcnlGbihhLGMuZm4sdGhpcy5lcXVhbGl0eSgpKTtyZXR1cm4gYX0sXG5yZWxhdGlvbmFsOmZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5hZGRpdGl2ZSgpLGM7aWYoYz10aGlzLmV4cGVjdChcIjxcIixcIj5cIixcIjw9XCIsXCI+PVwiKSlhPXRoaXMuYmluYXJ5Rm4oYSxjLmZuLHRoaXMucmVsYXRpb25hbCgpKTtyZXR1cm4gYX0sYWRkaXRpdmU6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy5tdWx0aXBsaWNhdGl2ZSgpLGM7Yz10aGlzLmV4cGVjdChcIitcIixcIi1cIik7KWE9dGhpcy5iaW5hcnlGbihhLGMuZm4sdGhpcy5tdWx0aXBsaWNhdGl2ZSgpKTtyZXR1cm4gYX0sbXVsdGlwbGljYXRpdmU6ZnVuY3Rpb24oKXtmb3IodmFyIGE9dGhpcy51bmFyeSgpLGM7Yz10aGlzLmV4cGVjdChcIipcIixcIi9cIixcIiVcIik7KWE9dGhpcy5iaW5hcnlGbihhLGMuZm4sdGhpcy51bmFyeSgpKTtyZXR1cm4gYX0sdW5hcnk6ZnVuY3Rpb24oKXt2YXIgYTtyZXR1cm4gdGhpcy5leHBlY3QoXCIrXCIpP3RoaXMucHJpbWFyeSgpOihhPXRoaXMuZXhwZWN0KFwiLVwiKSk/dGhpcy5iaW5hcnlGbigkYS5aRVJPLGEuZm4sXG50aGlzLnVuYXJ5KCkpOihhPXRoaXMuZXhwZWN0KFwiIVwiKSk/dGhpcy51bmFyeUZuKGEuZm4sdGhpcy51bmFyeSgpKTp0aGlzLnByaW1hcnkoKX0sZmllbGRBY2Nlc3M6ZnVuY3Rpb24oYSl7dmFyIGM9dGhpcyxkPXRoaXMuZXhwZWN0KCkudGV4dCxlPURjKGQsdGhpcy5vcHRpb25zLHRoaXMudGV4dCk7cmV0dXJuIEQoZnVuY3Rpb24oYyxkLGgpe3JldHVybiBlKGh8fGEoYyxkKSl9LHthc3NpZ246ZnVuY3Rpb24oZSxmLGgpe3JldHVybiBvYihhKGUsaCksZCxmLGMudGV4dCxjLm9wdGlvbnMpfX0pfSxvYmplY3RJbmRleDpmdW5jdGlvbihhKXt2YXIgYz10aGlzLGQ9dGhpcy5leHByZXNzaW9uKCk7dGhpcy5jb25zdW1lKFwiXVwiKTtyZXR1cm4gRChmdW5jdGlvbihlLGcpe3ZhciBmPWEoZSxnKSxoPWQoZSxnKSxsO2lmKCFmKXJldHVybiBzOyhmPVphKGZbaF0sYy50ZXh0KSkmJihmLnRoZW4mJmMub3B0aW9ucy51bndyYXBQcm9taXNlcykmJihsPWYsXCIkJHZcImluIGZ8fChsLiQkdj1zLGwudGhlbihmdW5jdGlvbihhKXtsLiQkdj1cbmF9KSksZj1mLiQkdik7cmV0dXJuIGZ9LHthc3NpZ246ZnVuY3Rpb24oZSxnLGYpe3ZhciBoPWQoZSxmKTtyZXR1cm4gWmEoYShlLGYpLGMudGV4dClbaF09Z319KX0sZnVuY3Rpb25DYWxsOmZ1bmN0aW9uKGEsYyl7dmFyIGQ9W107aWYoXCIpXCIhPT10aGlzLnBlZWtUb2tlbigpLnRleHQpe2RvIGQucHVzaCh0aGlzLmV4cHJlc3Npb24oKSk7d2hpbGUodGhpcy5leHBlY3QoXCIsXCIpKX10aGlzLmNvbnN1bWUoXCIpXCIpO3ZhciBlPXRoaXM7cmV0dXJuIGZ1bmN0aW9uKGcsZil7Zm9yKHZhciBoPVtdLGw9Yz9jKGcsZik6ZyxrPTA7azxkLmxlbmd0aDtrKyspaC5wdXNoKGRba10oZyxmKSk7az1hKGcsZixsKXx8QztaYShsLGUudGV4dCk7WmEoayxlLnRleHQpO2g9ay5hcHBseT9rLmFwcGx5KGwsaCk6ayhoWzBdLGhbMV0saFsyXSxoWzNdLGhbNF0pO3JldHVybiBaYShoLGUudGV4dCl9fSxhcnJheURlY2xhcmF0aW9uOmZ1bmN0aW9uKCl7dmFyIGE9W10sYz0hMDtpZihcIl1cIiE9PXRoaXMucGVla1Rva2VuKCkudGV4dCl7ZG97aWYodGhpcy5wZWVrKFwiXVwiKSlicmVhaztcbnZhciBkPXRoaXMuZXhwcmVzc2lvbigpO2EucHVzaChkKTtkLmNvbnN0YW50fHwoYz0hMSl9d2hpbGUodGhpcy5leHBlY3QoXCIsXCIpKX10aGlzLmNvbnN1bWUoXCJdXCIpO3JldHVybiBEKGZ1bmN0aW9uKGMsZCl7Zm9yKHZhciBmPVtdLGg9MDtoPGEubGVuZ3RoO2grKylmLnB1c2goYVtoXShjLGQpKTtyZXR1cm4gZn0se2xpdGVyYWw6ITAsY29uc3RhbnQ6Y30pfSxvYmplY3Q6ZnVuY3Rpb24oKXt2YXIgYT1bXSxjPSEwO2lmKFwifVwiIT09dGhpcy5wZWVrVG9rZW4oKS50ZXh0KXtkb3tpZih0aGlzLnBlZWsoXCJ9XCIpKWJyZWFrO3ZhciBkPXRoaXMuZXhwZWN0KCksZD1kLnN0cmluZ3x8ZC50ZXh0O3RoaXMuY29uc3VtZShcIjpcIik7dmFyIGU9dGhpcy5leHByZXNzaW9uKCk7YS5wdXNoKHtrZXk6ZCx2YWx1ZTplfSk7ZS5jb25zdGFudHx8KGM9ITEpfXdoaWxlKHRoaXMuZXhwZWN0KFwiLFwiKSl9dGhpcy5jb25zdW1lKFwifVwiKTtyZXR1cm4gRChmdW5jdGlvbihjLGQpe2Zvcih2YXIgZT17fSxsPTA7bDxcbmEubGVuZ3RoO2wrKyl7dmFyIGs9YVtsXTtlW2sua2V5XT1rLnZhbHVlKGMsZCl9cmV0dXJuIGV9LHtsaXRlcmFsOiEwLGNvbnN0YW50OmN9KX19O3ZhciBNYj17fSx1YT10KFwiJHNjZVwiKSxnYT17SFRNTDpcImh0bWxcIixDU1M6XCJjc3NcIixVUkw6XCJ1cmxcIixSRVNPVVJDRV9VUkw6XCJyZXNvdXJjZVVybFwiLEpTOlwianNcIn0sVz1VLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLEhjPXNhKE8ubG9jYXRpb24uaHJlZiwhMCk7Z2MuJGluamVjdD1bXCIkcHJvdmlkZVwiXTtJYy4kaW5qZWN0PVtcIiRsb2NhbGVcIl07S2MuJGluamVjdD1bXCIkbG9jYWxlXCJdO3ZhciBOYz1cIi5cIixJZT17eXl5eTokKFwiRnVsbFllYXJcIiw0KSx5eTokKFwiRnVsbFllYXJcIiwyLDAsITApLHk6JChcIkZ1bGxZZWFyXCIsMSksTU1NTTpwYihcIk1vbnRoXCIpLE1NTTpwYihcIk1vbnRoXCIsITApLE1NOiQoXCJNb250aFwiLDIsMSksTTokKFwiTW9udGhcIiwxLDEpLGRkOiQoXCJEYXRlXCIsMiksZDokKFwiRGF0ZVwiLDEpLEhIOiQoXCJIb3Vyc1wiLDIpLEg6JChcIkhvdXJzXCIsXG4xKSxoaDokKFwiSG91cnNcIiwyLC0xMiksaDokKFwiSG91cnNcIiwxLC0xMiksbW06JChcIk1pbnV0ZXNcIiwyKSxtOiQoXCJNaW51dGVzXCIsMSksc3M6JChcIlNlY29uZHNcIiwyKSxzOiQoXCJTZWNvbmRzXCIsMSksc3NzOiQoXCJNaWxsaXNlY29uZHNcIiwzKSxFRUVFOnBiKFwiRGF5XCIpLEVFRTpwYihcIkRheVwiLCEwKSxhOmZ1bmN0aW9uKGEsYyl7cmV0dXJuIDEyPmEuZ2V0SG91cnMoKT9jLkFNUE1TWzBdOmMuQU1QTVNbMV19LFo6ZnVuY3Rpb24oYSl7YT0tMSphLmdldFRpbWV6b25lT2Zmc2V0KCk7cmV0dXJuIGE9KDA8PWE/XCIrXCI6XCJcIikrKE9iKE1hdGhbMDxhP1wiZmxvb3JcIjpcImNlaWxcIl0oYS82MCksMikrT2IoTWF0aC5hYnMoYSU2MCksMikpfX0sSGU9LygoPzpbXnlNZEhobXNhWkUnXSspfCg/OicoPzpbXiddfCcnKSonKXwoPzpFK3x5K3xNK3xkK3xIK3xoK3xtK3xzK3xhfFopKSguKikvLEdlPS9eXFwtP1xcZCskLztKYy4kaW5qZWN0PVtcIiRsb2NhbGVcIl07dmFyIEVlPWFhKEspLEZlPWFhKEZhKTtMYy4kaW5qZWN0PVxuW1wiJHBhcnNlXCJdO3ZhciBjZD1hYSh7cmVzdHJpY3Q6XCJFXCIsY29tcGlsZTpmdW5jdGlvbihhLGMpezg+PVMmJihjLmhyZWZ8fGMubmFtZXx8Yy4kc2V0KFwiaHJlZlwiLFwiXCIpLGEuYXBwZW5kKFUuY3JlYXRlQ29tbWVudChcIklFIGZpeFwiKSkpO2lmKCFjLmhyZWYmJiFjLnhsaW5rSHJlZiYmIWMubmFtZSlyZXR1cm4gZnVuY3Rpb24oYSxjKXt2YXIgZz1cIltvYmplY3QgU1ZHQW5pbWF0ZWRTdHJpbmddXCI9PT13YS5jYWxsKGMucHJvcChcImhyZWZcIikpP1wieGxpbms6aHJlZlwiOlwiaHJlZlwiO2Mub24oXCJjbGlja1wiLGZ1bmN0aW9uKGEpe2MuYXR0cihnKXx8YS5wcmV2ZW50RGVmYXVsdCgpfSl9fX0pLHpiPXt9O3Eoa2IsZnVuY3Rpb24oYSxjKXtpZihcIm11bHRpcGxlXCIhPWEpe3ZhciBkPW5hKFwibmctXCIrYyk7emJbZF09ZnVuY3Rpb24oKXtyZXR1cm57cHJpb3JpdHk6MTAwLGxpbms6ZnVuY3Rpb24oYSxnLGYpe2EuJHdhdGNoKGZbZF0sZnVuY3Rpb24oYSl7Zi4kc2V0KGMsISFhKX0pfX19fX0pO3EoW1wic3JjXCIsXG5cInNyY3NldFwiLFwiaHJlZlwiXSxmdW5jdGlvbihhKXt2YXIgYz1uYShcIm5nLVwiK2EpO3piW2NdPWZ1bmN0aW9uKCl7cmV0dXJue3ByaW9yaXR5Ojk5LGxpbms6ZnVuY3Rpb24oZCxlLGcpe3ZhciBmPWEsaD1hO1wiaHJlZlwiPT09YSYmXCJbb2JqZWN0IFNWR0FuaW1hdGVkU3RyaW5nXVwiPT09d2EuY2FsbChlLnByb3AoXCJocmVmXCIpKSYmKGg9XCJ4bGlua0hyZWZcIixnLiRhdHRyW2hdPVwieGxpbms6aHJlZlwiLGY9bnVsbCk7Zy4kb2JzZXJ2ZShjLGZ1bmN0aW9uKGEpe2EmJihnLiRzZXQoaCxhKSxTJiZmJiZlLnByb3AoZixnW2hdKSl9KX19fX0pO3ZhciBzYj17JGFkZENvbnRyb2w6QywkcmVtb3ZlQ29udHJvbDpDLCRzZXRWYWxpZGl0eTpDLCRzZXREaXJ0eTpDLCRzZXRQcmlzdGluZTpDfTtPYy4kaW5qZWN0PVtcIiRlbGVtZW50XCIsXCIkYXR0cnNcIixcIiRzY29wZVwiLFwiJGFuaW1hdGVcIl07dmFyIFFjPWZ1bmN0aW9uKGEpe3JldHVybltcIiR0aW1lb3V0XCIsZnVuY3Rpb24oYyl7cmV0dXJue25hbWU6XCJmb3JtXCIsXG5yZXN0cmljdDphP1wiRUFDXCI6XCJFXCIsY29udHJvbGxlcjpPYyxjb21waWxlOmZ1bmN0aW9uKCl7cmV0dXJue3ByZTpmdW5jdGlvbihhLGUsZyxmKXtpZighZy5hY3Rpb24pe3ZhciBoPWZ1bmN0aW9uKGEpe2EucHJldmVudERlZmF1bHQ/YS5wcmV2ZW50RGVmYXVsdCgpOmEucmV0dXJuVmFsdWU9ITF9O1BjKGVbMF0sXCJzdWJtaXRcIixoKTtlLm9uKFwiJGRlc3Ryb3lcIixmdW5jdGlvbigpe2MoZnVuY3Rpb24oKXtGYihlWzBdLFwic3VibWl0XCIsaCl9LDAsITEpfSl9dmFyIGw9ZS5wYXJlbnQoKS5jb250cm9sbGVyKFwiZm9ybVwiKSxrPWcubmFtZXx8Zy5uZ0Zvcm07ayYmb2IoYSxrLGYsayk7aWYobCllLm9uKFwiJGRlc3Ryb3lcIixmdW5jdGlvbigpe2wuJHJlbW92ZUNvbnRyb2woZik7ayYmb2IoYSxrLHMsayk7RChmLHNiKX0pfX19fX1dfSxkZD1RYygpLHFkPVFjKCEwKSxPZT0vXihmdHB8aHR0cHxodHRwcyk6XFwvXFwvKFxcdys6ezAsMX1cXHcqQCk/KFxcUyspKDpbMC05XSspPyhcXC98XFwvKFtcXHcjITouPys9JiVAIVxcLVxcL10pKT8kLyxcblBlPS9eW2EtejAtOSEjJCUmJyorLz0/Xl9ge3x9fi4tXStAW2EtejAtOS1dKyhcXC5bYS16MC05LV0rKSokL2ksUWU9L15cXHMqKFxcLXxcXCspPyhcXGQrfChcXGQqKFxcLlxcZCopKSlcXHMqJC8sUmM9e3RleHQ6dWIsbnVtYmVyOmZ1bmN0aW9uKGEsYyxkLGUsZyxmKXt1YihhLGMsZCxlLGcsZik7ZS4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKGEpe3ZhciBjPWUuJGlzRW1wdHkoYSk7aWYoY3x8UWUudGVzdChhKSlyZXR1cm4gZS4kc2V0VmFsaWRpdHkoXCJudW1iZXJcIiwhMCksXCJcIj09PWE/bnVsbDpjP2E6cGFyc2VGbG9hdChhKTtlLiRzZXRWYWxpZGl0eShcIm51bWJlclwiLCExKTtyZXR1cm4gc30pO0plKGUsXCJudW1iZXJcIixjKTtlLiRmb3JtYXR0ZXJzLnB1c2goZnVuY3Rpb24oYSl7cmV0dXJuIGUuJGlzRW1wdHkoYSk/XCJcIjpcIlwiK2F9KTtkLm1pbiYmKGE9ZnVuY3Rpb24oYSl7dmFyIGM9cGFyc2VGbG9hdChkLm1pbik7cmV0dXJuIHBhKGUsXCJtaW5cIixlLiRpc0VtcHR5KGEpfHxhPj1jLGEpfSxlLiRwYXJzZXJzLnB1c2goYSksXG5lLiRmb3JtYXR0ZXJzLnB1c2goYSkpO2QubWF4JiYoYT1mdW5jdGlvbihhKXt2YXIgYz1wYXJzZUZsb2F0KGQubWF4KTtyZXR1cm4gcGEoZSxcIm1heFwiLGUuJGlzRW1wdHkoYSl8fGE8PWMsYSl9LGUuJHBhcnNlcnMucHVzaChhKSxlLiRmb3JtYXR0ZXJzLnB1c2goYSkpO2UuJGZvcm1hdHRlcnMucHVzaChmdW5jdGlvbihhKXtyZXR1cm4gcGEoZSxcIm51bWJlclwiLGUuJGlzRW1wdHkoYSl8fHZiKGEpLGEpfSl9LHVybDpmdW5jdGlvbihhLGMsZCxlLGcsZil7dWIoYSxjLGQsZSxnLGYpO2E9ZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGUsXCJ1cmxcIixlLiRpc0VtcHR5KGEpfHxPZS50ZXN0KGEpLGEpfTtlLiRmb3JtYXR0ZXJzLnB1c2goYSk7ZS4kcGFyc2Vycy5wdXNoKGEpfSxlbWFpbDpmdW5jdGlvbihhLGMsZCxlLGcsZil7dWIoYSxjLGQsZSxnLGYpO2E9ZnVuY3Rpb24oYSl7cmV0dXJuIHBhKGUsXCJlbWFpbFwiLGUuJGlzRW1wdHkoYSl8fFBlLnRlc3QoYSksYSl9O2UuJGZvcm1hdHRlcnMucHVzaChhKTtcbmUuJHBhcnNlcnMucHVzaChhKX0scmFkaW86ZnVuY3Rpb24oYSxjLGQsZSl7RShkLm5hbWUpJiZjLmF0dHIoXCJuYW1lXCIsYmIoKSk7Yy5vbihcImNsaWNrXCIsZnVuY3Rpb24oKXtjWzBdLmNoZWNrZWQmJmEuJGFwcGx5KGZ1bmN0aW9uKCl7ZS4kc2V0Vmlld1ZhbHVlKGQudmFsdWUpfSl9KTtlLiRyZW5kZXI9ZnVuY3Rpb24oKXtjWzBdLmNoZWNrZWQ9ZC52YWx1ZT09ZS4kdmlld1ZhbHVlfTtkLiRvYnNlcnZlKFwidmFsdWVcIixlLiRyZW5kZXIpfSxjaGVja2JveDpmdW5jdGlvbihhLGMsZCxlKXt2YXIgZz1kLm5nVHJ1ZVZhbHVlLGY9ZC5uZ0ZhbHNlVmFsdWU7dyhnKXx8KGc9ITApO3coZil8fChmPSExKTtjLm9uKFwiY2xpY2tcIixmdW5jdGlvbigpe2EuJGFwcGx5KGZ1bmN0aW9uKCl7ZS4kc2V0Vmlld1ZhbHVlKGNbMF0uY2hlY2tlZCl9KX0pO2UuJHJlbmRlcj1mdW5jdGlvbigpe2NbMF0uY2hlY2tlZD1lLiR2aWV3VmFsdWV9O2UuJGlzRW1wdHk9ZnVuY3Rpb24oYSl7cmV0dXJuIGEhPT1nfTtcbmUuJGZvcm1hdHRlcnMucHVzaChmdW5jdGlvbihhKXtyZXR1cm4gYT09PWd9KTtlLiRwYXJzZXJzLnB1c2goZnVuY3Rpb24oYSl7cmV0dXJuIGE/ZzpmfSl9LGhpZGRlbjpDLGJ1dHRvbjpDLHN1Ym1pdDpDLHJlc2V0OkMsZmlsZTpDfSxkYz1bXCIkYnJvd3NlclwiLFwiJHNuaWZmZXJcIixmdW5jdGlvbihhLGMpe3JldHVybntyZXN0cmljdDpcIkVcIixyZXF1aXJlOlwiP25nTW9kZWxcIixsaW5rOmZ1bmN0aW9uKGQsZSxnLGYpe2YmJihSY1tLKGcudHlwZSldfHxSYy50ZXh0KShkLGUsZyxmLGMsYSl9fX1dLHJiPVwibmctdmFsaWRcIixxYj1cIm5nLWludmFsaWRcIixMYT1cIm5nLXByaXN0aW5lXCIsdGI9XCJuZy1kaXJ0eVwiLFJlPVtcIiRzY29wZVwiLFwiJGV4Y2VwdGlvbkhhbmRsZXJcIixcIiRhdHRyc1wiLFwiJGVsZW1lbnRcIixcIiRwYXJzZVwiLFwiJGFuaW1hdGVcIixmdW5jdGlvbihhLGMsZCxlLGcsZil7ZnVuY3Rpb24gaChhLGMpe2M9Yz9cIi1cIitmYihjLFwiLVwiKTpcIlwiO2YucmVtb3ZlQ2xhc3MoZSwoYT9xYjpyYikrYyk7XG5mLmFkZENsYXNzKGUsKGE/cmI6cWIpK2MpfXRoaXMuJG1vZGVsVmFsdWU9dGhpcy4kdmlld1ZhbHVlPU51bWJlci5OYU47dGhpcy4kcGFyc2Vycz1bXTt0aGlzLiRmb3JtYXR0ZXJzPVtdO3RoaXMuJHZpZXdDaGFuZ2VMaXN0ZW5lcnM9W107dGhpcy4kcHJpc3RpbmU9ITA7dGhpcy4kZGlydHk9ITE7dGhpcy4kdmFsaWQ9ITA7dGhpcy4kaW52YWxpZD0hMTt0aGlzLiRuYW1lPWQubmFtZTt2YXIgbD1nKGQubmdNb2RlbCksaz1sLmFzc2lnbjtpZighayl0aHJvdyB0KFwibmdNb2RlbFwiKShcIm5vbmFzc2lnblwiLGQubmdNb2RlbCxoYShlKSk7dGhpcy4kcmVuZGVyPUM7dGhpcy4kaXNFbXB0eT1mdW5jdGlvbihhKXtyZXR1cm4gRShhKXx8XCJcIj09PWF8fG51bGw9PT1hfHxhIT09YX07dmFyIG09ZS5pbmhlcml0ZWREYXRhKFwiJGZvcm1Db250cm9sbGVyXCIpfHxzYixuPTAscD10aGlzLiRlcnJvcj17fTtlLmFkZENsYXNzKExhKTtoKCEwKTt0aGlzLiRzZXRWYWxpZGl0eT1mdW5jdGlvbihhLGMpe3BbYV0hPT1cbiFjJiYoYz8ocFthXSYmbi0tLG58fChoKCEwKSx0aGlzLiR2YWxpZD0hMCx0aGlzLiRpbnZhbGlkPSExKSk6KGgoITEpLHRoaXMuJGludmFsaWQ9ITAsdGhpcy4kdmFsaWQ9ITEsbisrKSxwW2FdPSFjLGgoYyxhKSxtLiRzZXRWYWxpZGl0eShhLGMsdGhpcykpfTt0aGlzLiRzZXRQcmlzdGluZT1mdW5jdGlvbigpe3RoaXMuJGRpcnR5PSExO3RoaXMuJHByaXN0aW5lPSEwO2YucmVtb3ZlQ2xhc3MoZSx0Yik7Zi5hZGRDbGFzcyhlLExhKX07dGhpcy4kc2V0Vmlld1ZhbHVlPWZ1bmN0aW9uKGQpe3RoaXMuJHZpZXdWYWx1ZT1kO3RoaXMuJHByaXN0aW5lJiYodGhpcy4kZGlydHk9ITAsdGhpcy4kcHJpc3RpbmU9ITEsZi5yZW1vdmVDbGFzcyhlLExhKSxmLmFkZENsYXNzKGUsdGIpLG0uJHNldERpcnR5KCkpO3EodGhpcy4kcGFyc2VycyxmdW5jdGlvbihhKXtkPWEoZCl9KTt0aGlzLiRtb2RlbFZhbHVlIT09ZCYmKHRoaXMuJG1vZGVsVmFsdWU9ZCxrKGEsZCkscSh0aGlzLiR2aWV3Q2hhbmdlTGlzdGVuZXJzLFxuZnVuY3Rpb24oYSl7dHJ5e2EoKX1jYXRjaChkKXtjKGQpfX0pKX07dmFyIHI9dGhpczthLiR3YXRjaChmdW5jdGlvbigpe3ZhciBjPWwoYSk7aWYoci4kbW9kZWxWYWx1ZSE9PWMpe3ZhciBkPXIuJGZvcm1hdHRlcnMsZT1kLmxlbmd0aDtmb3Ioci4kbW9kZWxWYWx1ZT1jO2UtLTspYz1kW2VdKGMpO3IuJHZpZXdWYWx1ZSE9PWMmJihyLiR2aWV3VmFsdWU9YyxyLiRyZW5kZXIoKSl9cmV0dXJuIGN9KX1dLEZkPWZ1bmN0aW9uKCl7cmV0dXJue3JlcXVpcmU6W1wibmdNb2RlbFwiLFwiXj9mb3JtXCJdLGNvbnRyb2xsZXI6UmUsbGluazpmdW5jdGlvbihhLGMsZCxlKXt2YXIgZz1lWzBdLGY9ZVsxXXx8c2I7Zi4kYWRkQ29udHJvbChnKTthLiRvbihcIiRkZXN0cm95XCIsZnVuY3Rpb24oKXtmLiRyZW1vdmVDb250cm9sKGcpfSl9fX0sSGQ9YWEoe3JlcXVpcmU6XCJuZ01vZGVsXCIsbGluazpmdW5jdGlvbihhLGMsZCxlKXtlLiR2aWV3Q2hhbmdlTGlzdGVuZXJzLnB1c2goZnVuY3Rpb24oKXthLiRldmFsKGQubmdDaGFuZ2UpfSl9fSksXG5lYz1mdW5jdGlvbigpe3JldHVybntyZXF1aXJlOlwiP25nTW9kZWxcIixsaW5rOmZ1bmN0aW9uKGEsYyxkLGUpe2lmKGUpe2QucmVxdWlyZWQ9ITA7dmFyIGc9ZnVuY3Rpb24oYSl7aWYoZC5yZXF1aXJlZCYmZS4kaXNFbXB0eShhKSllLiRzZXRWYWxpZGl0eShcInJlcXVpcmVkXCIsITEpO2Vsc2UgcmV0dXJuIGUuJHNldFZhbGlkaXR5KFwicmVxdWlyZWRcIiwhMCksYX07ZS4kZm9ybWF0dGVycy5wdXNoKGcpO2UuJHBhcnNlcnMudW5zaGlmdChnKTtkLiRvYnNlcnZlKFwicmVxdWlyZWRcIixmdW5jdGlvbigpe2coZS4kdmlld1ZhbHVlKX0pfX19fSxHZD1mdW5jdGlvbigpe3JldHVybntyZXF1aXJlOlwibmdNb2RlbFwiLGxpbms6ZnVuY3Rpb24oYSxjLGQsZSl7dmFyIGc9KGE9L1xcLyguKilcXC8vLmV4ZWMoZC5uZ0xpc3QpKSYmUmVnRXhwKGFbMV0pfHxkLm5nTGlzdHx8XCIsXCI7ZS4kcGFyc2Vycy5wdXNoKGZ1bmN0aW9uKGEpe2lmKCFFKGEpKXt2YXIgYz1bXTthJiZxKGEuc3BsaXQoZyksZnVuY3Rpb24oYSl7YSYmXG5jLnB1c2goY2EoYSkpfSk7cmV0dXJuIGN9fSk7ZS4kZm9ybWF0dGVycy5wdXNoKGZ1bmN0aW9uKGEpe3JldHVybiBNKGEpP2Euam9pbihcIiwgXCIpOnN9KTtlLiRpc0VtcHR5PWZ1bmN0aW9uKGEpe3JldHVybiFhfHwhYS5sZW5ndGh9fX19LFNlPS9eKHRydWV8ZmFsc2V8XFxkKykkLyxJZD1mdW5jdGlvbigpe3JldHVybntwcmlvcml0eToxMDAsY29tcGlsZTpmdW5jdGlvbihhLGMpe3JldHVybiBTZS50ZXN0KGMubmdWYWx1ZSk/ZnVuY3Rpb24oYSxjLGcpe2cuJHNldChcInZhbHVlXCIsYS4kZXZhbChnLm5nVmFsdWUpKX06ZnVuY3Rpb24oYSxjLGcpe2EuJHdhdGNoKGcubmdWYWx1ZSxmdW5jdGlvbihhKXtnLiRzZXQoXCJ2YWx1ZVwiLGEpfSl9fX19LGlkPXZhKGZ1bmN0aW9uKGEsYyxkKXtjLmFkZENsYXNzKFwibmctYmluZGluZ1wiKS5kYXRhKFwiJGJpbmRpbmdcIixkLm5nQmluZCk7YS4kd2F0Y2goZC5uZ0JpbmQsZnVuY3Rpb24oYSl7Yy50ZXh0KGE9PXM/XCJcIjphKX0pfSksa2Q9W1wiJGludGVycG9sYXRlXCIsXG5mdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYyxkLGUpe2M9YShkLmF0dHIoZS4kYXR0ci5uZ0JpbmRUZW1wbGF0ZSkpO2QuYWRkQ2xhc3MoXCJuZy1iaW5kaW5nXCIpLmRhdGEoXCIkYmluZGluZ1wiLGMpO2UuJG9ic2VydmUoXCJuZ0JpbmRUZW1wbGF0ZVwiLGZ1bmN0aW9uKGEpe2QudGV4dChhKX0pfX1dLGpkPVtcIiRzY2VcIixcIiRwYXJzZVwiLGZ1bmN0aW9uKGEsYyl7cmV0dXJuIGZ1bmN0aW9uKGQsZSxnKXtlLmFkZENsYXNzKFwibmctYmluZGluZ1wiKS5kYXRhKFwiJGJpbmRpbmdcIixnLm5nQmluZEh0bWwpO3ZhciBmPWMoZy5uZ0JpbmRIdG1sKTtkLiR3YXRjaChmdW5jdGlvbigpe3JldHVybihmKGQpfHxcIlwiKS50b1N0cmluZygpfSxmdW5jdGlvbihjKXtlLmh0bWwoYS5nZXRUcnVzdGVkSHRtbChmKGQpKXx8XCJcIil9KX19XSxsZD1QYihcIlwiLCEwKSxuZD1QYihcIk9kZFwiLDApLG1kPVBiKFwiRXZlblwiLDEpLG9kPXZhKHtjb21waWxlOmZ1bmN0aW9uKGEsYyl7Yy4kc2V0KFwibmdDbG9ha1wiLHMpO2EucmVtb3ZlQ2xhc3MoXCJuZy1jbG9ha1wiKX19KSxcbnBkPVtmdW5jdGlvbigpe3JldHVybntzY29wZTohMCxjb250cm9sbGVyOlwiQFwiLHByaW9yaXR5OjUwMH19XSxmYz17fTtxKFwiY2xpY2sgZGJsY2xpY2sgbW91c2Vkb3duIG1vdXNldXAgbW91c2VvdmVyIG1vdXNlb3V0IG1vdXNlbW92ZSBtb3VzZWVudGVyIG1vdXNlbGVhdmUga2V5ZG93biBrZXl1cCBrZXlwcmVzcyBzdWJtaXQgZm9jdXMgYmx1ciBjb3B5IGN1dCBwYXN0ZVwiLnNwbGl0KFwiIFwiKSxmdW5jdGlvbihhKXt2YXIgYz1uYShcIm5nLVwiK2EpO2ZjW2NdPVtcIiRwYXJzZVwiLGZ1bmN0aW9uKGQpe3JldHVybntjb21waWxlOmZ1bmN0aW9uKGUsZyl7dmFyIGY9ZChnW2NdKTtyZXR1cm4gZnVuY3Rpb24oYyxkLGUpe2Qub24oSyhhKSxmdW5jdGlvbihhKXtjLiRhcHBseShmdW5jdGlvbigpe2YoYyx7JGV2ZW50OmF9KX0pfSl9fX19XX0pO3ZhciBzZD1bXCIkYW5pbWF0ZVwiLGZ1bmN0aW9uKGEpe3JldHVybnt0cmFuc2NsdWRlOlwiZWxlbWVudFwiLHByaW9yaXR5OjYwMCx0ZXJtaW5hbDohMCxyZXN0cmljdDpcIkFcIixcbiQkdGxiOiEwLGxpbms6ZnVuY3Rpb24oYyxkLGUsZyxmKXt2YXIgaCxsLGs7Yy4kd2F0Y2goZS5uZ0lmLGZ1bmN0aW9uKGcpe1FhKGcpP2x8fChsPWMuJG5ldygpLGYobCxmdW5jdGlvbihjKXtjW2MubGVuZ3RoKytdPVUuY3JlYXRlQ29tbWVudChcIiBlbmQgbmdJZjogXCIrZS5uZ0lmK1wiIFwiKTtoPXtjbG9uZTpjfTthLmVudGVyKGMsZC5wYXJlbnQoKSxkKX0pKTooayYmKGsucmVtb3ZlKCksaz1udWxsKSxsJiYobC4kZGVzdHJveSgpLGw9bnVsbCksaCYmKGs9eWIoaC5jbG9uZSksYS5sZWF2ZShrLGZ1bmN0aW9uKCl7az1udWxsfSksaD1udWxsKSl9KX19fV0sdGQ9W1wiJGh0dHBcIixcIiR0ZW1wbGF0ZUNhY2hlXCIsXCIkYW5jaG9yU2Nyb2xsXCIsXCIkYW5pbWF0ZVwiLFwiJHNjZVwiLGZ1bmN0aW9uKGEsYyxkLGUsZyl7cmV0dXJue3Jlc3RyaWN0OlwiRUNBXCIscHJpb3JpdHk6NDAwLHRlcm1pbmFsOiEwLHRyYW5zY2x1ZGU6XCJlbGVtZW50XCIsY29udHJvbGxlcjpFYS5ub29wLGNvbXBpbGU6ZnVuY3Rpb24oZixcbmgpe3ZhciBsPWgubmdJbmNsdWRlfHxoLnNyYyxrPWgub25sb2FkfHxcIlwiLG09aC5hdXRvc2Nyb2xsO3JldHVybiBmdW5jdGlvbihmLGgscSxzLHUpe3ZhciBGPTAsdix5LEEseD1mdW5jdGlvbigpe3kmJih5LnJlbW92ZSgpLHk9bnVsbCk7diYmKHYuJGRlc3Ryb3koKSx2PW51bGwpO0EmJihlLmxlYXZlKEEsZnVuY3Rpb24oKXt5PW51bGx9KSx5PUEsQT1udWxsKX07Zi4kd2F0Y2goZy5wYXJzZUFzUmVzb3VyY2VVcmwobCksZnVuY3Rpb24oZyl7dmFyIGw9ZnVuY3Rpb24oKXshQihtKXx8bSYmIWYuJGV2YWwobSl8fGQoKX0scT0rK0Y7Zz8oYS5nZXQoZyx7Y2FjaGU6Y30pLnN1Y2Nlc3MoZnVuY3Rpb24oYSl7aWYocT09PUYpe3ZhciBjPWYuJG5ldygpO3MudGVtcGxhdGU9YTthPXUoYyxmdW5jdGlvbihhKXt4KCk7ZS5lbnRlcihhLG51bGwsaCxsKX0pO3Y9YztBPWE7di4kZW1pdChcIiRpbmNsdWRlQ29udGVudExvYWRlZFwiKTtmLiRldmFsKGspfX0pLmVycm9yKGZ1bmN0aW9uKCl7cT09PVxuRiYmeCgpfSksZi4kZW1pdChcIiRpbmNsdWRlQ29udGVudFJlcXVlc3RlZFwiKSk6KHgoKSxzLnRlbXBsYXRlPW51bGwpfSl9fX19XSxKZD1bXCIkY29tcGlsZVwiLGZ1bmN0aW9uKGEpe3JldHVybntyZXN0cmljdDpcIkVDQVwiLHByaW9yaXR5Oi00MDAscmVxdWlyZTpcIm5nSW5jbHVkZVwiLGxpbms6ZnVuY3Rpb24oYyxkLGUsZyl7ZC5odG1sKGcudGVtcGxhdGUpO2EoZC5jb250ZW50cygpKShjKX19fV0sdWQ9dmEoe3ByaW9yaXR5OjQ1MCxjb21waWxlOmZ1bmN0aW9uKCl7cmV0dXJue3ByZTpmdW5jdGlvbihhLGMsZCl7YS4kZXZhbChkLm5nSW5pdCl9fX19KSx2ZD12YSh7dGVybWluYWw6ITAscHJpb3JpdHk6MUUzfSksd2Q9W1wiJGxvY2FsZVwiLFwiJGludGVycG9sYXRlXCIsZnVuY3Rpb24oYSxjKXt2YXIgZD0ve30vZztyZXR1cm57cmVzdHJpY3Q6XCJFQVwiLGxpbms6ZnVuY3Rpb24oZSxnLGYpe3ZhciBoPWYuY291bnQsbD1mLiRhdHRyLndoZW4mJmcuYXR0cihmLiRhdHRyLndoZW4pLGs9Zi5vZmZzZXR8fFxuMCxtPWUuJGV2YWwobCl8fHt9LG49e30scD1jLnN0YXJ0U3ltYm9sKCkscj1jLmVuZFN5bWJvbCgpLHM9L153aGVuKE1pbnVzKT8oLispJC87cShmLGZ1bmN0aW9uKGEsYyl7cy50ZXN0KGMpJiYobVtLKGMucmVwbGFjZShcIndoZW5cIixcIlwiKS5yZXBsYWNlKFwiTWludXNcIixcIi1cIikpXT1nLmF0dHIoZi4kYXR0cltjXSkpfSk7cShtLGZ1bmN0aW9uKGEsZSl7bltlXT1jKGEucmVwbGFjZShkLHAraCtcIi1cIitrK3IpKX0pO2UuJHdhdGNoKGZ1bmN0aW9uKCl7dmFyIGM9cGFyc2VGbG9hdChlLiRldmFsKGgpKTtpZihpc05hTihjKSlyZXR1cm5cIlwiO2MgaW4gbXx8KGM9YS5wbHVyYWxDYXQoYy1rKSk7cmV0dXJuIG5bY10oZSxnLCEwKX0sZnVuY3Rpb24oYSl7Zy50ZXh0KGEpfSl9fX1dLHhkPVtcIiRwYXJzZVwiLFwiJGFuaW1hdGVcIixmdW5jdGlvbihhLGMpe3ZhciBkPXQoXCJuZ1JlcGVhdFwiKTtyZXR1cm57dHJhbnNjbHVkZTpcImVsZW1lbnRcIixwcmlvcml0eToxRTMsdGVybWluYWw6ITAsJCR0bGI6ITAsXG5saW5rOmZ1bmN0aW9uKGUsZyxmLGgsbCl7dmFyIGs9Zi5uZ1JlcGVhdCxtPWsubWF0Y2goL15cXHMqKFtcXHNcXFNdKz8pXFxzK2luXFxzKyhbXFxzXFxTXSs/KSg/Olxccyt0cmFja1xccytieVxccysoW1xcc1xcU10rPykpP1xccyokLyksbixwLHIscyx1LEYsdj17JGlkOklhfTtpZighbSl0aHJvdyBkKFwiaWV4cFwiLGspO2Y9bVsxXTtoPW1bMl07KG09bVszXSk/KG49YShtKSxwPWZ1bmN0aW9uKGEsYyxkKXtGJiYodltGXT1hKTt2W3VdPWM7di4kaW5kZXg9ZDtyZXR1cm4gbihlLHYpfSk6KHI9ZnVuY3Rpb24oYSxjKXtyZXR1cm4gSWEoYyl9LHM9ZnVuY3Rpb24oYSl7cmV0dXJuIGF9KTttPWYubWF0Y2goL14oPzooW1xcJFxcd10rKXxcXCgoW1xcJFxcd10rKVxccyosXFxzKihbXFwkXFx3XSspXFwpKSQvKTtpZighbSl0aHJvdyBkKFwiaWlkZXhwXCIsZik7dT1tWzNdfHxtWzFdO0Y9bVsyXTt2YXIgQj17fTtlLiR3YXRjaENvbGxlY3Rpb24oaCxmdW5jdGlvbihhKXt2YXIgZixoLG09Z1swXSxuLHY9e30sSCxSLHcsQyxULHQsXG5FPVtdO2lmKGFiKGEpKVQ9YSxuPXB8fHI7ZWxzZXtuPXB8fHM7VD1bXTtmb3IodyBpbiBhKWEuaGFzT3duUHJvcGVydHkodykmJlwiJFwiIT13LmNoYXJBdCgwKSYmVC5wdXNoKHcpO1Quc29ydCgpfUg9VC5sZW5ndGg7aD1FLmxlbmd0aD1ULmxlbmd0aDtmb3IoZj0wO2Y8aDtmKyspaWYodz1hPT09VD9mOlRbZl0sQz1hW3ddLEM9bih3LEMsZiksQWEoQyxcImB0cmFjayBieWAgaWRcIiksQi5oYXNPd25Qcm9wZXJ0eShDKSl0PUJbQ10sZGVsZXRlIEJbQ10sdltDXT10LEVbZl09dDtlbHNle2lmKHYuaGFzT3duUHJvcGVydHkoQykpdGhyb3cgcShFLGZ1bmN0aW9uKGEpe2EmJmEuc2NvcGUmJihCW2EuaWRdPWEpfSksZChcImR1cGVzXCIsayxDKTtFW2ZdPXtpZDpDfTt2W0NdPSExfWZvcih3IGluIEIpQi5oYXNPd25Qcm9wZXJ0eSh3KSYmKHQ9Qlt3XSxmPXliKHQuY2xvbmUpLGMubGVhdmUoZikscShmLGZ1bmN0aW9uKGEpe2EuJCROR19SRU1PVkVEPSEwfSksdC5zY29wZS4kZGVzdHJveSgpKTtcbmY9MDtmb3IoaD1ULmxlbmd0aDtmPGg7ZisrKXt3PWE9PT1UP2Y6VFtmXTtDPWFbd107dD1FW2ZdO0VbZi0xXSYmKG09RVtmLTFdLmNsb25lW0VbZi0xXS5jbG9uZS5sZW5ndGgtMV0pO2lmKHQuc2NvcGUpe1I9dC5zY29wZTtuPW07ZG8gbj1uLm5leHRTaWJsaW5nO3doaWxlKG4mJm4uJCROR19SRU1PVkVEKTt0LmNsb25lWzBdIT1uJiZjLm1vdmUoeWIodC5jbG9uZSksbnVsbCx5KG0pKTttPXQuY2xvbmVbdC5jbG9uZS5sZW5ndGgtMV19ZWxzZSBSPWUuJG5ldygpO1JbdV09QztGJiYoUltGXT13KTtSLiRpbmRleD1mO1IuJGZpcnN0PTA9PT1mO1IuJGxhc3Q9Zj09PUgtMTtSLiRtaWRkbGU9IShSLiRmaXJzdHx8Ui4kbGFzdCk7Ui4kb2RkPSEoUi4kZXZlbj0wPT09KGYmMSkpO3Quc2NvcGV8fGwoUixmdW5jdGlvbihhKXthW2EubGVuZ3RoKytdPVUuY3JlYXRlQ29tbWVudChcIiBlbmQgbmdSZXBlYXQ6IFwiK2srXCIgXCIpO2MuZW50ZXIoYSxudWxsLHkobSkpO209YTt0LnNjb3BlPVI7dC5jbG9uZT1cbmE7dlt0LmlkXT10fSl9Qj12fSl9fX1dLHlkPVtcIiRhbmltYXRlXCIsZnVuY3Rpb24oYSl7cmV0dXJuIGZ1bmN0aW9uKGMsZCxlKXtjLiR3YXRjaChlLm5nU2hvdyxmdW5jdGlvbihjKXthW1FhKGMpP1wicmVtb3ZlQ2xhc3NcIjpcImFkZENsYXNzXCJdKGQsXCJuZy1oaWRlXCIpfSl9fV0scmQ9W1wiJGFuaW1hdGVcIixmdW5jdGlvbihhKXtyZXR1cm4gZnVuY3Rpb24oYyxkLGUpe2MuJHdhdGNoKGUubmdIaWRlLGZ1bmN0aW9uKGMpe2FbUWEoYyk/XCJhZGRDbGFzc1wiOlwicmVtb3ZlQ2xhc3NcIl0oZCxcIm5nLWhpZGVcIil9KX19XSx6ZD12YShmdW5jdGlvbihhLGMsZCl7YS4kd2F0Y2goZC5uZ1N0eWxlLGZ1bmN0aW9uKGEsZCl7ZCYmYSE9PWQmJnEoZCxmdW5jdGlvbihhLGQpe2MuY3NzKGQsXCJcIil9KTthJiZjLmNzcyhhKX0sITApfSksQWQ9W1wiJGFuaW1hdGVcIixmdW5jdGlvbihhKXtyZXR1cm57cmVzdHJpY3Q6XCJFQVwiLHJlcXVpcmU6XCJuZ1N3aXRjaFwiLGNvbnRyb2xsZXI6W1wiJHNjb3BlXCIsZnVuY3Rpb24oKXt0aGlzLmNhc2VzPVxue319XSxsaW5rOmZ1bmN0aW9uKGMsZCxlLGcpe3ZhciBmLGgsbCxrPVtdO2MuJHdhdGNoKGUubmdTd2l0Y2h8fGUub24sZnVuY3Rpb24oZCl7dmFyIG4scD1rLmxlbmd0aDtpZigwPHApe2lmKGwpe2ZvcihuPTA7bjxwO24rKylsW25dLnJlbW92ZSgpO2w9bnVsbH1sPVtdO2ZvcihuPTA7bjxwO24rKyl7dmFyIHI9aFtuXTtrW25dLiRkZXN0cm95KCk7bFtuXT1yO2EubGVhdmUocixmdW5jdGlvbigpe2wuc3BsaWNlKG4sMSk7MD09PWwubGVuZ3RoJiYobD1udWxsKX0pfX1oPVtdO2s9W107aWYoZj1nLmNhc2VzW1wiIVwiK2RdfHxnLmNhc2VzW1wiP1wiXSljLiRldmFsKGUuY2hhbmdlKSxxKGYsZnVuY3Rpb24oZCl7dmFyIGU9Yy4kbmV3KCk7ay5wdXNoKGUpO2QudHJhbnNjbHVkZShlLGZ1bmN0aW9uKGMpe3ZhciBlPWQuZWxlbWVudDtoLnB1c2goYyk7YS5lbnRlcihjLGUucGFyZW50KCksZSl9KX0pfSl9fX1dLEJkPXZhKHt0cmFuc2NsdWRlOlwiZWxlbWVudFwiLHByaW9yaXR5OjgwMCxyZXF1aXJlOlwiXm5nU3dpdGNoXCIsXG5saW5rOmZ1bmN0aW9uKGEsYyxkLGUsZyl7ZS5jYXNlc1tcIiFcIitkLm5nU3dpdGNoV2hlbl09ZS5jYXNlc1tcIiFcIitkLm5nU3dpdGNoV2hlbl18fFtdO2UuY2FzZXNbXCIhXCIrZC5uZ1N3aXRjaFdoZW5dLnB1c2goe3RyYW5zY2x1ZGU6ZyxlbGVtZW50OmN9KX19KSxDZD12YSh7dHJhbnNjbHVkZTpcImVsZW1lbnRcIixwcmlvcml0eTo4MDAscmVxdWlyZTpcIl5uZ1N3aXRjaFwiLGxpbms6ZnVuY3Rpb24oYSxjLGQsZSxnKXtlLmNhc2VzW1wiP1wiXT1lLmNhc2VzW1wiP1wiXXx8W107ZS5jYXNlc1tcIj9cIl0ucHVzaCh7dHJhbnNjbHVkZTpnLGVsZW1lbnQ6Y30pfX0pLEVkPXZhKHtsaW5rOmZ1bmN0aW9uKGEsYyxkLGUsZyl7aWYoIWcpdGhyb3cgdChcIm5nVHJhbnNjbHVkZVwiKShcIm9ycGhhblwiLGhhKGMpKTtnKGZ1bmN0aW9uKGEpe2MuZW1wdHkoKTtjLmFwcGVuZChhKX0pfX0pLGVkPVtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYSl7cmV0dXJue3Jlc3RyaWN0OlwiRVwiLHRlcm1pbmFsOiEwLGNvbXBpbGU6ZnVuY3Rpb24oYyxcbmQpe1widGV4dC9uZy10ZW1wbGF0ZVwiPT1kLnR5cGUmJmEucHV0KGQuaWQsY1swXS50ZXh0KX19fV0sVGU9dChcIm5nT3B0aW9uc1wiKSxEZD1hYSh7dGVybWluYWw6ITB9KSxmZD1bXCIkY29tcGlsZVwiLFwiJHBhcnNlXCIsZnVuY3Rpb24oYSxjKXt2YXIgZD0vXlxccyooW1xcc1xcU10rPykoPzpcXHMrYXNcXHMrKFtcXHNcXFNdKz8pKT8oPzpcXHMrZ3JvdXBcXHMrYnlcXHMrKFtcXHNcXFNdKz8pKT9cXHMrZm9yXFxzKyg/OihbXFwkXFx3XVtcXCRcXHddKil8KD86XFwoXFxzKihbXFwkXFx3XVtcXCRcXHddKilcXHMqLFxccyooW1xcJFxcd11bXFwkXFx3XSopXFxzKlxcKSkpXFxzK2luXFxzKyhbXFxzXFxTXSs/KSg/Olxccyt0cmFja1xccytieVxccysoW1xcc1xcU10rPykpPyQvLGU9eyRzZXRWaWV3VmFsdWU6Q307cmV0dXJue3Jlc3RyaWN0OlwiRVwiLHJlcXVpcmU6W1wic2VsZWN0XCIsXCI/bmdNb2RlbFwiXSxjb250cm9sbGVyOltcIiRlbGVtZW50XCIsXCIkc2NvcGVcIixcIiRhdHRyc1wiLGZ1bmN0aW9uKGEsYyxkKXt2YXIgbD10aGlzLGs9e30sbT1lLG47bC5kYXRhYm91bmQ9XG5kLm5nTW9kZWw7bC5pbml0PWZ1bmN0aW9uKGEsYyxkKXttPWE7bj1kfTtsLmFkZE9wdGlvbj1mdW5jdGlvbihjKXtBYShjLCdcIm9wdGlvbiB2YWx1ZVwiJyk7a1tjXT0hMDttLiR2aWV3VmFsdWU9PWMmJihhLnZhbChjKSxuLnBhcmVudCgpJiZuLnJlbW92ZSgpKX07bC5yZW1vdmVPcHRpb249ZnVuY3Rpb24oYSl7dGhpcy5oYXNPcHRpb24oYSkmJihkZWxldGUga1thXSxtLiR2aWV3VmFsdWU9PWEmJnRoaXMucmVuZGVyVW5rbm93bk9wdGlvbihhKSl9O2wucmVuZGVyVW5rbm93bk9wdGlvbj1mdW5jdGlvbihjKXtjPVwiPyBcIitJYShjKStcIiA/XCI7bi52YWwoYyk7YS5wcmVwZW5kKG4pO2EudmFsKGMpO24ucHJvcChcInNlbGVjdGVkXCIsITApfTtsLmhhc09wdGlvbj1mdW5jdGlvbihhKXtyZXR1cm4gay5oYXNPd25Qcm9wZXJ0eShhKX07Yy4kb24oXCIkZGVzdHJveVwiLGZ1bmN0aW9uKCl7bC5yZW5kZXJVbmtub3duT3B0aW9uPUN9KX1dLGxpbms6ZnVuY3Rpb24oZSxmLGgsbCl7ZnVuY3Rpb24gayhhLFxuYyxkLGUpe2QuJHJlbmRlcj1mdW5jdGlvbigpe3ZhciBhPWQuJHZpZXdWYWx1ZTtlLmhhc09wdGlvbihhKT8oQS5wYXJlbnQoKSYmQS5yZW1vdmUoKSxjLnZhbChhKSxcIlwiPT09YSYmdy5wcm9wKFwic2VsZWN0ZWRcIiwhMCkpOkUoYSkmJnc/Yy52YWwoXCJcIik6ZS5yZW5kZXJVbmtub3duT3B0aW9uKGEpfTtjLm9uKFwiY2hhbmdlXCIsZnVuY3Rpb24oKXthLiRhcHBseShmdW5jdGlvbigpe0EucGFyZW50KCkmJkEucmVtb3ZlKCk7ZC4kc2V0Vmlld1ZhbHVlKGMudmFsKCkpfSl9KX1mdW5jdGlvbiBtKGEsYyxkKXt2YXIgZTtkLiRyZW5kZXI9ZnVuY3Rpb24oKXt2YXIgYT1uZXcgVmEoZC4kdmlld1ZhbHVlKTtxKGMuZmluZChcIm9wdGlvblwiKSxmdW5jdGlvbihjKXtjLnNlbGVjdGVkPUIoYS5nZXQoYy52YWx1ZSkpfSl9O2EuJHdhdGNoKGZ1bmN0aW9uKCl7eGEoZSxkLiR2aWV3VmFsdWUpfHwoZT1iYShkLiR2aWV3VmFsdWUpLGQuJHJlbmRlcigpKX0pO2Mub24oXCJjaGFuZ2VcIixmdW5jdGlvbigpe2EuJGFwcGx5KGZ1bmN0aW9uKCl7dmFyIGE9XG5bXTtxKGMuZmluZChcIm9wdGlvblwiKSxmdW5jdGlvbihjKXtjLnNlbGVjdGVkJiZhLnB1c2goYy52YWx1ZSl9KTtkLiRzZXRWaWV3VmFsdWUoYSl9KX0pfWZ1bmN0aW9uIG4oZSxmLGcpe2Z1bmN0aW9uIGgoKXt2YXIgYT17XCJcIjpbXX0sYz1bXCJcIl0sZCxrLHMsdCx6O3Q9Zy4kbW9kZWxWYWx1ZTt6PXkoZSl8fFtdO3ZhciBFPW4/UWIoeik6eixGLEksQTtJPXt9O3M9ITE7dmFyIEQsSDtpZihyKWlmKHcmJk0odCkpZm9yKHM9bmV3IFZhKFtdKSxBPTA7QTx0Lmxlbmd0aDtBKyspSVttXT10W0FdLHMucHV0KHcoZSxJKSx0W0FdKTtlbHNlIHM9bmV3IFZhKHQpO2ZvcihBPTA7Rj1FLmxlbmd0aCxBPEY7QSsrKXtrPUE7aWYobil7az1FW0FdO2lmKFwiJFwiPT09ay5jaGFyQXQoMCkpY29udGludWU7SVtuXT1rfUlbbV09eltrXTtkPXAoZSxJKXx8XCJcIjsoaz1hW2RdKXx8KGs9YVtkXT1bXSxjLnB1c2goZCkpO3I/ZD1CKHMucmVtb3ZlKHc/dyhlLEkpOnEoZSxJKSkpOih3PyhkPXt9LGRbbV09dCxkPVxudyhlLGQpPT09dyhlLEkpKTpkPXQ9PT1xKGUsSSkscz1zfHxkKTtEPWwoZSxJKTtEPUIoRCk/RDpcIlwiO2sucHVzaCh7aWQ6dz93KGUsSSk6bj9FW0FdOkEsbGFiZWw6RCxzZWxlY3RlZDpkfSl9cnx8KHV8fG51bGw9PT10P2FbXCJcIl0udW5zaGlmdCh7aWQ6XCJcIixsYWJlbDpcIlwiLHNlbGVjdGVkOiFzfSk6c3x8YVtcIlwiXS51bnNoaWZ0KHtpZDpcIj9cIixsYWJlbDpcIlwiLHNlbGVjdGVkOiEwfSkpO0k9MDtmb3IoRT1jLmxlbmd0aDtJPEU7SSsrKXtkPWNbSV07az1hW2RdO3gubGVuZ3RoPD1JPyh0PXtlbGVtZW50OkMuY2xvbmUoKS5hdHRyKFwibGFiZWxcIixkKSxsYWJlbDprLmxhYmVsfSx6PVt0XSx4LnB1c2goeiksZi5hcHBlbmQodC5lbGVtZW50KSk6KHo9eFtJXSx0PXpbMF0sdC5sYWJlbCE9ZCYmdC5lbGVtZW50LmF0dHIoXCJsYWJlbFwiLHQubGFiZWw9ZCkpO0Q9bnVsbDtBPTA7Zm9yKEY9ay5sZW5ndGg7QTxGO0ErKylzPWtbQV0sKGQ9eltBKzFdKT8oRD1kLmVsZW1lbnQsZC5sYWJlbCE9PXMubGFiZWwmJlxuRC50ZXh0KGQubGFiZWw9cy5sYWJlbCksZC5pZCE9PXMuaWQmJkQudmFsKGQuaWQ9cy5pZCksZC5zZWxlY3RlZCE9PXMuc2VsZWN0ZWQmJkQucHJvcChcInNlbGVjdGVkXCIsZC5zZWxlY3RlZD1zLnNlbGVjdGVkKSk6KFwiXCI9PT1zLmlkJiZ1P0g9dTooSD12LmNsb25lKCkpLnZhbChzLmlkKS5hdHRyKFwic2VsZWN0ZWRcIixzLnNlbGVjdGVkKS50ZXh0KHMubGFiZWwpLHoucHVzaCh7ZWxlbWVudDpILGxhYmVsOnMubGFiZWwsaWQ6cy5pZCxzZWxlY3RlZDpzLnNlbGVjdGVkfSksRD9ELmFmdGVyKEgpOnQuZWxlbWVudC5hcHBlbmQoSCksRD1IKTtmb3IoQSsrO3oubGVuZ3RoPkE7KXoucG9wKCkuZWxlbWVudC5yZW1vdmUoKX1mb3IoO3gubGVuZ3RoPkk7KXgucG9wKClbMF0uZWxlbWVudC5yZW1vdmUoKX12YXIgaztpZighKGs9dC5tYXRjaChkKSkpdGhyb3cgVGUoXCJpZXhwXCIsdCxoYShmKSk7dmFyIGw9YyhrWzJdfHxrWzFdKSxtPWtbNF18fGtbNl0sbj1rWzVdLHA9YyhrWzNdfHxcIlwiKSxxPVxuYyhrWzJdP2tbMV06bSkseT1jKGtbN10pLHc9a1s4XT9jKGtbOF0pOm51bGwseD1bW3tlbGVtZW50OmYsbGFiZWw6XCJcIn1dXTt1JiYoYSh1KShlKSx1LnJlbW92ZUNsYXNzKFwibmctc2NvcGVcIiksdS5yZW1vdmUoKSk7Zi5lbXB0eSgpO2Yub24oXCJjaGFuZ2VcIixmdW5jdGlvbigpe2UuJGFwcGx5KGZ1bmN0aW9uKCl7dmFyIGEsYz15KGUpfHxbXSxkPXt9LGgsayxsLHAsdCx2LHU7aWYocilmb3Ioaz1bXSxwPTAsdj14Lmxlbmd0aDtwPHY7cCsrKWZvcihhPXhbcF0sbD0xLHQ9YS5sZW5ndGg7bDx0O2wrKyl7aWYoKGg9YVtsXS5lbGVtZW50KVswXS5zZWxlY3RlZCl7aD1oLnZhbCgpO24mJihkW25dPWgpO2lmKHcpZm9yKHU9MDt1PGMubGVuZ3RoJiYoZFttXT1jW3VdLHcoZSxkKSE9aCk7dSsrKTtlbHNlIGRbbV09Y1toXTtrLnB1c2gocShlLGQpKX19ZWxzZXtoPWYudmFsKCk7aWYoXCI/XCI9PWgpaz1zO2Vsc2UgaWYoXCJcIj09PWgpaz1udWxsO2Vsc2UgaWYodylmb3IodT0wO3U8Yy5sZW5ndGg7dSsrKXtpZihkW21dPVxuY1t1XSx3KGUsZCk9PWgpe2s9cShlLGQpO2JyZWFrfX1lbHNlIGRbbV09Y1toXSxuJiYoZFtuXT1oKSxrPXEoZSxkKTsxPHhbMF0ubGVuZ3RoJiZ4WzBdWzFdLmlkIT09aCYmKHhbMF1bMV0uc2VsZWN0ZWQ9ITEpfWcuJHNldFZpZXdWYWx1ZShrKX0pfSk7Zy4kcmVuZGVyPWg7ZS4kd2F0Y2goaCl9aWYobFsxXSl7dmFyIHA9bFswXTtsPWxbMV07dmFyIHI9aC5tdWx0aXBsZSx0PWgubmdPcHRpb25zLHU9ITEsdyx2PXkoVS5jcmVhdGVFbGVtZW50KFwib3B0aW9uXCIpKSxDPXkoVS5jcmVhdGVFbGVtZW50KFwib3B0Z3JvdXBcIikpLEE9di5jbG9uZSgpO2g9MDtmb3IodmFyIHg9Zi5jaGlsZHJlbigpLEQ9eC5sZW5ndGg7aDxEO2grKylpZihcIlwiPT09eFtoXS52YWx1ZSl7dz11PXguZXEoaCk7YnJlYWt9cC5pbml0KGwsdSxBKTtyJiYobC4kaXNFbXB0eT1mdW5jdGlvbihhKXtyZXR1cm4hYXx8MD09PWEubGVuZ3RofSk7dD9uKGUsZixsKTpyP20oZSxmLGwpOmsoZSxmLGwscCl9fX19XSxoZD1bXCIkaW50ZXJwb2xhdGVcIixcbmZ1bmN0aW9uKGEpe3ZhciBjPXthZGRPcHRpb246QyxyZW1vdmVPcHRpb246Q307cmV0dXJue3Jlc3RyaWN0OlwiRVwiLHByaW9yaXR5OjEwMCxjb21waWxlOmZ1bmN0aW9uKGQsZSl7aWYoRShlLnZhbHVlKSl7dmFyIGc9YShkLnRleHQoKSwhMCk7Z3x8ZS4kc2V0KFwidmFsdWVcIixkLnRleHQoKSl9cmV0dXJuIGZ1bmN0aW9uKGEsZCxlKXt2YXIgaz1kLnBhcmVudCgpLG09ay5kYXRhKFwiJHNlbGVjdENvbnRyb2xsZXJcIil8fGsucGFyZW50KCkuZGF0YShcIiRzZWxlY3RDb250cm9sbGVyXCIpO20mJm0uZGF0YWJvdW5kP2QucHJvcChcInNlbGVjdGVkXCIsITEpOm09YztnP2EuJHdhdGNoKGcsZnVuY3Rpb24oYSxjKXtlLiRzZXQoXCJ2YWx1ZVwiLGEpO2EhPT1jJiZtLnJlbW92ZU9wdGlvbihjKTttLmFkZE9wdGlvbihhKX0pOm0uYWRkT3B0aW9uKGUudmFsdWUpO2Qub24oXCIkZGVzdHJveVwiLGZ1bmN0aW9uKCl7bS5yZW1vdmVPcHRpb24oZS52YWx1ZSl9KX19fX1dLGdkPWFhKHtyZXN0cmljdDpcIkVcIixcbnRlcm1pbmFsOiEwfSk7Ty5hbmd1bGFyLmJvb3RzdHJhcD9jb25zb2xlLmxvZyhcIldBUk5JTkc6IFRyaWVkIHRvIGxvYWQgYW5ndWxhciBtb3JlIHRoYW4gb25jZS5cIik6KChHYT1PLmpRdWVyeSk/KHk9R2EsRChHYS5mbix7c2NvcGU6SmEuc2NvcGUsaXNvbGF0ZVNjb3BlOkphLmlzb2xhdGVTY29wZSxjb250cm9sbGVyOkphLmNvbnRyb2xsZXIsaW5qZWN0b3I6SmEuaW5qZWN0b3IsaW5oZXJpdGVkRGF0YTpKYS5pbmhlcml0ZWREYXRhfSksQWIoXCJyZW1vdmVcIiwhMCwhMCwhMSksQWIoXCJlbXB0eVwiLCExLCExLCExKSxBYihcImh0bWxcIiwhMSwhMSwhMCkpOnk9TixFYS5lbGVtZW50PXksWmMoRWEpLHkoVSkucmVhZHkoZnVuY3Rpb24oKXtXYyhVLCRiKX0pKX0pKHdpbmRvdyxkb2N1bWVudCk7IWFuZ3VsYXIuJCRjc3AoKSYmYW5ndWxhci5lbGVtZW50KGRvY3VtZW50KS5maW5kKFwiaGVhZFwiKS5wcmVwZW5kKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+QGNoYXJzZXQgXCJVVEYtOFwiO1tuZ1xcXFw6Y2xvYWtdLFtuZy1jbG9ha10sW2RhdGEtbmctY2xvYWtdLFt4LW5nLWNsb2FrXSwubmctY2xvYWssLngtbmctY2xvYWssLm5nLWhpZGV7ZGlzcGxheTpub25lICFpbXBvcnRhbnQ7fW5nXFxcXDpmb3Jte2Rpc3BsYXk6YmxvY2s7fS5uZy1hbmltYXRlLWJsb2NrLXRyYW5zaXRpb25ze3RyYW5zaXRpb246MHMgYWxsIWltcG9ydGFudDstd2Via2l0LXRyYW5zaXRpb246MHMgYWxsIWltcG9ydGFudDt9PC9zdHlsZT4nKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFuZ3VsYXIubWluLmpzLm1hcFxuIiwiLyohIFNvY2tldC5JTy5qcyBidWlsZDowLjkuMTYsIGRldmVsb3BtZW50LiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+IE1JVCBMaWNlbnNlZCAqL1xuXG52YXIgaW8gPSAoJ3VuZGVmaW5lZCcgPT09IHR5cGVvZiBtb2R1bGUgPyB7fSA6IG1vZHVsZS5leHBvcnRzKTtcbihmdW5jdGlvbigpIHtcblxuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgZ2xvYmFsKSB7XG5cbiAgLyoqXG4gICAqIElPIG5hbWVzcGFjZS5cbiAgICpcbiAgICogQG5hbWVzcGFjZVxuICAgKi9cblxuICB2YXIgaW8gPSBleHBvcnRzO1xuXG4gIC8qKlxuICAgKiBTb2NrZXQuSU8gdmVyc2lvblxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBpby52ZXJzaW9uID0gJzAuOS4xNic7XG5cbiAgLyoqXG4gICAqIFByb3RvY29sIGltcGxlbWVudGVkLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBpby5wcm90b2NvbCA9IDE7XG5cbiAgLyoqXG4gICAqIEF2YWlsYWJsZSB0cmFuc3BvcnRzLCB0aGVzZSB3aWxsIGJlIHBvcHVsYXRlZCB3aXRoIHRoZSBhdmFpbGFibGUgdHJhbnNwb3J0c1xuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBpby50cmFuc3BvcnRzID0gW107XG5cbiAgLyoqXG4gICAqIEtlZXAgdHJhY2sgb2YganNvbnAgY2FsbGJhY2tzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgaW8uaiA9IFtdO1xuXG4gIC8qKlxuICAgKiBLZWVwIHRyYWNrIG9mIG91ciBpby5Tb2NrZXRzXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cbiAgaW8uc29ja2V0cyA9IHt9O1xuXG5cbiAgLyoqXG4gICAqIE1hbmFnZXMgY29ubmVjdGlvbnMgdG8gaG9zdHMuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmlcbiAgICogQFBhcmFtIHtCb29sZWFufSBmb3JjZSBjcmVhdGlvbiBvZiBuZXcgc29ja2V0IChkZWZhdWx0cyB0byBmYWxzZSlcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgaW8uY29ubmVjdCA9IGZ1bmN0aW9uIChob3N0LCBkZXRhaWxzKSB7XG4gICAgdmFyIHVyaSA9IGlvLnV0aWwucGFyc2VVcmkoaG9zdClcbiAgICAgICwgdXVyaVxuICAgICAgLCBzb2NrZXQ7XG5cbiAgICBpZiAoZ2xvYmFsICYmIGdsb2JhbC5sb2NhdGlvbikge1xuICAgICAgdXJpLnByb3RvY29sID0gdXJpLnByb3RvY29sIHx8IGdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbC5zbGljZSgwLCAtMSk7XG4gICAgICB1cmkuaG9zdCA9IHVyaS5ob3N0IHx8IChnbG9iYWwuZG9jdW1lbnRcbiAgICAgICAgPyBnbG9iYWwuZG9jdW1lbnQuZG9tYWluIDogZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lKTtcbiAgICAgIHVyaS5wb3J0ID0gdXJpLnBvcnQgfHwgZ2xvYmFsLmxvY2F0aW9uLnBvcnQ7XG4gICAgfVxuXG4gICAgdXVyaSA9IGlvLnV0aWwudW5pcXVlVXJpKHVyaSk7XG5cbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgaG9zdDogdXJpLmhvc3RcbiAgICAgICwgc2VjdXJlOiAnaHR0cHMnID09IHVyaS5wcm90b2NvbFxuICAgICAgLCBwb3J0OiB1cmkucG9ydCB8fCAoJ2h0dHBzJyA9PSB1cmkucHJvdG9jb2wgPyA0NDMgOiA4MClcbiAgICAgICwgcXVlcnk6IHVyaS5xdWVyeSB8fCAnJ1xuICAgIH07XG5cbiAgICBpby51dGlsLm1lcmdlKG9wdGlvbnMsIGRldGFpbHMpO1xuXG4gICAgaWYgKG9wdGlvbnNbJ2ZvcmNlIG5ldyBjb25uZWN0aW9uJ10gfHwgIWlvLnNvY2tldHNbdXVyaV0pIHtcbiAgICAgIHNvY2tldCA9IG5ldyBpby5Tb2NrZXQob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zWydmb3JjZSBuZXcgY29ubmVjdGlvbiddICYmIHNvY2tldCkge1xuICAgICAgaW8uc29ja2V0c1t1dXJpXSA9IHNvY2tldDtcbiAgICB9XG5cbiAgICBzb2NrZXQgPSBzb2NrZXQgfHwgaW8uc29ja2V0c1t1dXJpXTtcblxuICAgIC8vIGlmIHBhdGggaXMgZGlmZmVyZW50IGZyb20gJycgb3IgL1xuICAgIHJldHVybiBzb2NrZXQub2YodXJpLnBhdGgubGVuZ3RoID4gMSA/IHVyaS5wYXRoIDogJycpO1xuICB9O1xuXG59KSgnb2JqZWN0JyA9PT0gdHlwZW9mIG1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDogKHRoaXMuaW8gPSB7fSksIHRoaXMpO1xuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgZ2xvYmFsKSB7XG5cbiAgLyoqXG4gICAqIFV0aWxpdGllcyBuYW1lc3BhY2UuXG4gICAqXG4gICAqIEBuYW1lc3BhY2VcbiAgICovXG5cbiAgdmFyIHV0aWwgPSBleHBvcnRzLnV0aWwgPSB7fTtcblxuICAvKipcbiAgICogUGFyc2VzIGFuIFVSSVxuICAgKlxuICAgKiBAYXV0aG9yIFN0ZXZlbiBMZXZpdGhhbiA8c3RldmVubGV2aXRoYW4uY29tPiAoTUlUIGxpY2Vuc2UpXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHZhciByZSA9IC9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKFteOlxcLz8jLl0rKTopPyg/OlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oW146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLztcblxuICB2YXIgcGFydHMgPSBbJ3NvdXJjZScsICdwcm90b2NvbCcsICdhdXRob3JpdHknLCAndXNlckluZm8nLCAndXNlcicsICdwYXNzd29yZCcsXG4gICAgICAgICAgICAgICAnaG9zdCcsICdwb3J0JywgJ3JlbGF0aXZlJywgJ3BhdGgnLCAnZGlyZWN0b3J5JywgJ2ZpbGUnLCAncXVlcnknLFxuICAgICAgICAgICAgICAgJ2FuY2hvciddO1xuXG4gIHV0aWwucGFyc2VVcmkgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgdmFyIG0gPSByZS5leGVjKHN0ciB8fCAnJylcbiAgICAgICwgdXJpID0ge31cbiAgICAgICwgaSA9IDE0O1xuXG4gICAgd2hpbGUgKGktLSkge1xuICAgICAgdXJpW3BhcnRzW2ldXSA9IG1baV0gfHwgJyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVyaTtcbiAgfTtcblxuICAvKipcbiAgICogUHJvZHVjZXMgYSB1bmlxdWUgdXJsIHRoYXQgaWRlbnRpZmllcyBhIFNvY2tldC5JTyBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gdXJpXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwudW5pcXVlVXJpID0gZnVuY3Rpb24gKHVyaSkge1xuICAgIHZhciBwcm90b2NvbCA9IHVyaS5wcm90b2NvbFxuICAgICAgLCBob3N0ID0gdXJpLmhvc3RcbiAgICAgICwgcG9ydCA9IHVyaS5wb3J0O1xuXG4gICAgaWYgKCdkb2N1bWVudCcgaW4gZ2xvYmFsKSB7XG4gICAgICBob3N0ID0gaG9zdCB8fCBkb2N1bWVudC5kb21haW47XG4gICAgICBwb3J0ID0gcG9ydCB8fCAocHJvdG9jb2wgPT0gJ2h0dHBzJ1xuICAgICAgICAmJiBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCAhPT0gJ2h0dHBzOicgPyA0NDMgOiBkb2N1bWVudC5sb2NhdGlvbi5wb3J0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaG9zdCA9IGhvc3QgfHwgJ2xvY2FsaG9zdCc7XG5cbiAgICAgIGlmICghcG9ydCAmJiBwcm90b2NvbCA9PSAnaHR0cHMnKSB7XG4gICAgICAgIHBvcnQgPSA0NDM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIChwcm90b2NvbCB8fCAnaHR0cCcpICsgJzovLycgKyBob3N0ICsgJzonICsgKHBvcnQgfHwgODApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNZXJnZXN0IDIgcXVlcnkgc3RyaW5ncyBpbiB0byBvbmNlIHVuaXF1ZSBxdWVyeSBzdHJpbmdcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGJhc2VcbiAgICogQHBhcmFtIHtTdHJpbmd9IGFkZGl0aW9uXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwucXVlcnkgPSBmdW5jdGlvbiAoYmFzZSwgYWRkaXRpb24pIHtcbiAgICB2YXIgcXVlcnkgPSB1dGlsLmNodW5rUXVlcnkoYmFzZSB8fCAnJylcbiAgICAgICwgY29tcG9uZW50cyA9IFtdO1xuXG4gICAgdXRpbC5tZXJnZShxdWVyeSwgdXRpbC5jaHVua1F1ZXJ5KGFkZGl0aW9uIHx8ICcnKSk7XG4gICAgZm9yICh2YXIgcGFydCBpbiBxdWVyeSkge1xuICAgICAgaWYgKHF1ZXJ5Lmhhc093blByb3BlcnR5KHBhcnQpKSB7XG4gICAgICAgIGNvbXBvbmVudHMucHVzaChwYXJ0ICsgJz0nICsgcXVlcnlbcGFydF0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjb21wb25lbnRzLmxlbmd0aCA/ICc/JyArIGNvbXBvbmVudHMuam9pbignJicpIDogJyc7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybXMgYSBxdWVyeXN0cmluZyBpbiB0byBhbiBvYmplY3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHFzXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwuY2h1bmtRdWVyeSA9IGZ1bmN0aW9uIChxcykge1xuICAgIHZhciBxdWVyeSA9IHt9XG4gICAgICAsIHBhcmFtcyA9IHFzLnNwbGl0KCcmJylcbiAgICAgICwgaSA9IDBcbiAgICAgICwgbCA9IHBhcmFtcy5sZW5ndGhcbiAgICAgICwga3Y7XG5cbiAgICBmb3IgKDsgaSA8IGw7ICsraSkge1xuICAgICAga3YgPSBwYXJhbXNbaV0uc3BsaXQoJz0nKTtcbiAgICAgIGlmIChrdlswXSkge1xuICAgICAgICBxdWVyeVtrdlswXV0gPSBrdlsxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcXVlcnk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEV4ZWN1dGVzIHRoZSBnaXZlbiBmdW5jdGlvbiB3aGVuIHRoZSBwYWdlIGlzIGxvYWRlZC5cbiAgICpcbiAgICogICAgIGlvLnV0aWwubG9hZChmdW5jdGlvbiAoKSB7IGNvbnNvbGUubG9nKCdwYWdlIGxvYWRlZCcpOyB9KTtcbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdmFyIHBhZ2VMb2FkZWQgPSBmYWxzZTtcblxuICB1dGlsLmxvYWQgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAoJ2RvY3VtZW50JyBpbiBnbG9iYWwgJiYgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyB8fCBwYWdlTG9hZGVkKSB7XG4gICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG5cbiAgICB1dGlsLm9uKGdsb2JhbCwgJ2xvYWQnLCBmbiwgZmFsc2UpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGV2ZW50LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgdXRpbC5vbiA9IGZ1bmN0aW9uIChlbGVtZW50LCBldmVudCwgZm4sIGNhcHR1cmUpIHtcbiAgICBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuICAgICAgZWxlbWVudC5hdHRhY2hFdmVudCgnb24nICsgZXZlbnQsIGZuKTtcbiAgICB9IGVsc2UgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBmbiwgY2FwdHVyZSk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIGNvcnJlY3QgYFhNTEh0dHBSZXF1ZXN0YCBmb3IgcmVndWxhciBhbmQgY3Jvc3MgZG9tYWluIHJlcXVlc3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IFt4ZG9tYWluXSBDcmVhdGUgYSByZXF1ZXN0IHRoYXQgY2FuIGJlIHVzZWQgY3Jvc3MgZG9tYWluLlxuICAgKiBAcmV0dXJucyB7WE1MSHR0cFJlcXVlc3R8ZmFsc2V9IElmIHdlIGNhbiBjcmVhdGUgYSBYTUxIdHRwUmVxdWVzdC5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHV0aWwucmVxdWVzdCA9IGZ1bmN0aW9uICh4ZG9tYWluKSB7XG5cbiAgICBpZiAoeGRvbWFpbiAmJiAndW5kZWZpbmVkJyAhPSB0eXBlb2YgWERvbWFpblJlcXVlc3QgJiYgIXV0aWwudWEuaGFzQ09SUykge1xuICAgICAgcmV0dXJuIG5ldyBYRG9tYWluUmVxdWVzdCgpO1xuICAgIH1cblxuICAgIGlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgJiYgKCF4ZG9tYWluIHx8IHV0aWwudWEuaGFzQ09SUykpIHtcbiAgICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBpZiAoIXhkb21haW4pIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBuZXcgd2luZG93WyhbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpKV0oJ01pY3Jvc29mdC5YTUxIVFRQJyk7XG4gICAgICB9IGNhdGNoKGUpIHsgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBYSFIgYmFzZWQgdHJhbnNwb3J0IGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgLyoqXG4gICAqIENoYW5nZSB0aGUgaW50ZXJuYWwgcGFnZUxvYWRlZCB2YWx1ZS5cbiAgICovXG5cbiAgaWYgKCd1bmRlZmluZWQnICE9IHR5cGVvZiB3aW5kb3cpIHtcbiAgICB1dGlsLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgcGFnZUxvYWRlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogRGVmZXJzIGEgZnVuY3Rpb24gdG8gZW5zdXJlIGEgc3Bpbm5lciBpcyBub3QgZGlzcGxheWVkIGJ5IHRoZSBicm93c2VyXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwuZGVmZXIgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAoIXV0aWwudWEud2Via2l0IHx8ICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbXBvcnRTY3JpcHRzKSB7XG4gICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG5cbiAgICB1dGlsLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgc2V0VGltZW91dChmbiwgMTAwKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogTWVyZ2VzIHR3byBvYmplY3RzLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UgKHRhcmdldCwgYWRkaXRpb25hbCwgZGVlcCwgbGFzdHNlZW4pIHtcbiAgICB2YXIgc2VlbiA9IGxhc3RzZWVuIHx8IFtdXG4gICAgICAsIGRlcHRoID0gdHlwZW9mIGRlZXAgPT0gJ3VuZGVmaW5lZCcgPyAyIDogZGVlcFxuICAgICAgLCBwcm9wO1xuXG4gICAgZm9yIChwcm9wIGluIGFkZGl0aW9uYWwpIHtcbiAgICAgIGlmIChhZGRpdGlvbmFsLmhhc093blByb3BlcnR5KHByb3ApICYmIHV0aWwuaW5kZXhPZihzZWVuLCBwcm9wKSA8IDApIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRbcHJvcF0gIT09ICdvYmplY3QnIHx8ICFkZXB0aCkge1xuICAgICAgICAgIHRhcmdldFtwcm9wXSA9IGFkZGl0aW9uYWxbcHJvcF07XG4gICAgICAgICAgc2Vlbi5wdXNoKGFkZGl0aW9uYWxbcHJvcF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHV0aWwubWVyZ2UodGFyZ2V0W3Byb3BdLCBhZGRpdGlvbmFsW3Byb3BdLCBkZXB0aCAtIDEsIHNlZW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfTtcblxuICAvKipcbiAgICogTWVyZ2VzIHByb3RvdHlwZXMgZnJvbSBvYmplY3RzXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwubWl4aW4gPSBmdW5jdGlvbiAoY3RvciwgY3RvcjIpIHtcbiAgICB1dGlsLm1lcmdlKGN0b3IucHJvdG90eXBlLCBjdG9yMi5wcm90b3R5cGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTaG9ydGN1dCBmb3IgcHJvdG90eXBpY2FsIGFuZCBzdGF0aWMgaW5oZXJpdGFuY2UuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICB1dGlsLmluaGVyaXQgPSBmdW5jdGlvbiAoY3RvciwgY3RvcjIpIHtcbiAgICBmdW5jdGlvbiBmKCkge307XG4gICAgZi5wcm90b3R5cGUgPSBjdG9yMi5wcm90b3R5cGU7XG4gICAgY3Rvci5wcm90b3R5cGUgPSBuZXcgZjtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBvYmplY3QgaXMgYW4gQXJyYXkuXG4gICAqXG4gICAqICAgICBpby51dGlsLmlzQXJyYXkoW10pOyAvLyB0cnVlXG4gICAqICAgICBpby51dGlsLmlzQXJyYXkoe30pOyAvLyBmYWxzZVxuICAgKlxuICAgKiBAcGFyYW0gT2JqZWN0IG9ialxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLmlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH07XG5cbiAgLyoqXG4gICAqIEludGVyc2VjdHMgdmFsdWVzIG9mIHR3byBhcnJheXMgaW50byBhIHRoaXJkXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwuaW50ZXJzZWN0ID0gZnVuY3Rpb24gKGFyciwgYXJyMikge1xuICAgIHZhciByZXQgPSBbXVxuICAgICAgLCBsb25nZXN0ID0gYXJyLmxlbmd0aCA+IGFycjIubGVuZ3RoID8gYXJyIDogYXJyMlxuICAgICAgLCBzaG9ydGVzdCA9IGFyci5sZW5ndGggPiBhcnIyLmxlbmd0aCA/IGFycjIgOiBhcnI7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IHNob3J0ZXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgaWYgKH51dGlsLmluZGV4T2YobG9uZ2VzdCwgc2hvcnRlc3RbaV0pKVxuICAgICAgICByZXQucHVzaChzaG9ydGVzdFtpXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJldDtcbiAgfTtcblxuICAvKipcbiAgICogQXJyYXkgaW5kZXhPZiBjb21wYXRpYmlsaXR5LlxuICAgKlxuICAgKiBAc2VlIGJpdC5seS9hNUR4YTJcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5pbmRleE9mID0gZnVuY3Rpb24gKGFyciwgbywgaSkge1xuXG4gICAgZm9yICh2YXIgaiA9IGFyci5sZW5ndGgsIGkgPSBpIDwgMCA/IGkgKyBqIDwgMCA/IDAgOiBpICsgaiA6IGkgfHwgMDtcbiAgICAgICAgIGkgPCBqICYmIGFycltpXSAhPT0gbzsgaSsrKSB7fVxuXG4gICAgcmV0dXJuIGogPD0gaSA/IC0xIDogaTtcbiAgfTtcblxuICAvKipcbiAgICogQ29udmVydHMgZW51bWVyYWJsZXMgdG8gYXJyYXkuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwudG9BcnJheSA9IGZ1bmN0aW9uIChlbnUpIHtcbiAgICB2YXIgYXJyID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGVudS5sZW5ndGg7IGkgPCBsOyBpKyspXG4gICAgICBhcnIucHVzaChlbnVbaV0pO1xuXG4gICAgcmV0dXJuIGFycjtcbiAgfTtcblxuICAvKipcbiAgICogVUEgLyBlbmdpbmVzIGRldGVjdGlvbiBuYW1lc3BhY2UuXG4gICAqXG4gICAqIEBuYW1lc3BhY2VcbiAgICovXG5cbiAgdXRpbC51YSA9IHt9O1xuXG4gIC8qKlxuICAgKiBXaGV0aGVyIHRoZSBVQSBzdXBwb3J0cyBDT1JTIGZvciBYSFIuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwudWEuaGFzQ09SUyA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBYTUxIdHRwUmVxdWVzdCAmJiAoZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICB2YXIgYSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gYS53aXRoQ3JlZGVudGlhbHMgIT0gdW5kZWZpbmVkO1xuICB9KSgpO1xuXG4gIC8qKlxuICAgKiBEZXRlY3Qgd2Via2l0LlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnVhLndlYmtpdCA9ICd1bmRlZmluZWQnICE9IHR5cGVvZiBuYXZpZ2F0b3JcbiAgICAmJiAvd2Via2l0L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuICAgLyoqXG4gICAqIERldGVjdCBpUGFkL2lQaG9uZS9pUG9kLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnVhLmlEZXZpY2UgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yXG4gICAgICAmJiAvaVBhZHxpUGhvbmV8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbn0pKCd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHMsIHRoaXMpO1xuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8pIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuICAvKipcbiAgICogRXZlbnQgZW1pdHRlciBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQGFwaSBwdWJsaWMuXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEV2ZW50RW1pdHRlciAoKSB7fTtcblxuICAvKipcbiAgICogQWRkcyBhIGxpc3RlbmVyXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgICBpZiAoIXRoaXMuJGV2ZW50cykge1xuICAgICAgdGhpcy4kZXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLiRldmVudHNbbmFtZV0pIHtcbiAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXSA9IGZuO1xuICAgIH0gZWxzZSBpZiAoaW8udXRpbC5pc0FycmF5KHRoaXMuJGV2ZW50c1tuYW1lXSkpIHtcbiAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXS5wdXNoKGZuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy4kZXZlbnRzW25hbWVdID0gW3RoaXMuJGV2ZW50c1tuYW1lXSwgZm5dO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXIgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uO1xuXG4gIC8qKlxuICAgKiBBZGRzIGEgdm9sYXRpbGUgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIG9uICgpIHtcbiAgICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIobmFtZSwgb24pO1xuICAgICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9O1xuXG4gICAgb24ubGlzdGVuZXIgPSBmbjtcbiAgICB0aGlzLm9uKG5hbWUsIG9uKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgbGlzdGVuZXIuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgICBpZiAodGhpcy4kZXZlbnRzICYmIHRoaXMuJGV2ZW50c1tuYW1lXSkge1xuICAgICAgdmFyIGxpc3QgPSB0aGlzLiRldmVudHNbbmFtZV07XG5cbiAgICAgIGlmIChpby51dGlsLmlzQXJyYXkobGlzdCkpIHtcbiAgICAgICAgdmFyIHBvcyA9IC0xO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICBpZiAobGlzdFtpXSA9PT0gZm4gfHwgKGxpc3RbaV0ubGlzdGVuZXIgJiYgbGlzdFtpXS5saXN0ZW5lciA9PT0gZm4pKSB7XG4gICAgICAgICAgICBwb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBvcyA8IDApIHtcbiAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIGxpc3Quc3BsaWNlKHBvcywgMSk7XG5cbiAgICAgICAgaWYgKCFsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLiRldmVudHNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobGlzdCA9PT0gZm4gfHwgKGxpc3QubGlzdGVuZXIgJiYgbGlzdC5saXN0ZW5lciA9PT0gZm4pKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLiRldmVudHNbbmFtZV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgYWxsIGxpc3RlbmVycyBmb3IgYW4gZXZlbnQuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLiRldmVudHMgPSB7fTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGlmICh0aGlzLiRldmVudHMgJiYgdGhpcy4kZXZlbnRzW25hbWVdKSB7XG4gICAgICB0aGlzLiRldmVudHNbbmFtZV0gPSBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCBsaXN0ZW5lcnMgZm9yIGEgY2VydGFpbiBldmVudC5cbiAgICpcbiAgICogQGFwaSBwdWJsY2lcbiAgICovXG5cbiAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghdGhpcy4kZXZlbnRzKSB7XG4gICAgICB0aGlzLiRldmVudHMgPSB7fTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuJGV2ZW50c1tuYW1lXSkge1xuICAgICAgdGhpcy4kZXZlbnRzW25hbWVdID0gW107XG4gICAgfVxuXG4gICAgaWYgKCFpby51dGlsLmlzQXJyYXkodGhpcy4kZXZlbnRzW25hbWVdKSkge1xuICAgICAgdGhpcy4kZXZlbnRzW25hbWVdID0gW3RoaXMuJGV2ZW50c1tuYW1lXV07XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuJGV2ZW50c1tuYW1lXTtcbiAgfTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKCF0aGlzLiRldmVudHMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlciA9IHRoaXMuJGV2ZW50c1tuYW1lXTtcblxuICAgIGlmICghaGFuZGxlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBoYW5kbGVyKSB7XG4gICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0gZWxzZSBpZiAoaW8udXRpbC5pc0FycmF5KGhhbmRsZXIpKSB7XG4gICAgICB2YXIgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuKTtcblxuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbi8qKlxuICogQmFzZWQgb24gSlNPTjIgKGh0dHA6Ly93d3cuSlNPTi5vcmcvanMuaHRtbCkuXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBuYXRpdmVKU09OKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIC8vIHVzZSBuYXRpdmUgSlNPTiBpZiBpdCdzIGF2YWlsYWJsZVxuICBpZiAobmF0aXZlSlNPTiAmJiBuYXRpdmVKU09OLnBhcnNlKXtcbiAgICByZXR1cm4gZXhwb3J0cy5KU09OID0ge1xuICAgICAgcGFyc2U6IG5hdGl2ZUpTT04ucGFyc2VcbiAgICAsIHN0cmluZ2lmeTogbmF0aXZlSlNPTi5zdHJpbmdpZnlcbiAgICB9O1xuICB9XG5cbiAgdmFyIEpTT04gPSBleHBvcnRzLkpTT04gPSB7fTtcblxuICBmdW5jdGlvbiBmKG4pIHtcbiAgICAgIC8vIEZvcm1hdCBpbnRlZ2VycyB0byBoYXZlIGF0IGxlYXN0IHR3byBkaWdpdHMuXG4gICAgICByZXR1cm4gbiA8IDEwID8gJzAnICsgbiA6IG47XG4gIH1cblxuICBmdW5jdGlvbiBkYXRlKGQsIGtleSkge1xuICAgIHJldHVybiBpc0Zpbml0ZShkLnZhbHVlT2YoKSkgP1xuICAgICAgICBkLmdldFVUQ0Z1bGxZZWFyKCkgICAgICsgJy0nICtcbiAgICAgICAgZihkLmdldFVUQ01vbnRoKCkgKyAxKSArICctJyArXG4gICAgICAgIGYoZC5nZXRVVENEYXRlKCkpICAgICAgKyAnVCcgK1xuICAgICAgICBmKGQuZ2V0VVRDSG91cnMoKSkgICAgICsgJzonICtcbiAgICAgICAgZihkLmdldFVUQ01pbnV0ZXMoKSkgICArICc6JyArXG4gICAgICAgIGYoZC5nZXRVVENTZWNvbmRzKCkpICAgKyAnWicgOiBudWxsO1xuICB9O1xuXG4gIHZhciBjeCA9IC9bXFx1MDAwMFxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nLFxuICAgICAgZXNjYXBhYmxlID0gL1tcXFxcXFxcIlxceDAwLVxceDFmXFx4N2YtXFx4OWZcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICAgIGdhcCxcbiAgICAgIGluZGVudCxcbiAgICAgIG1ldGEgPSB7ICAgIC8vIHRhYmxlIG9mIGNoYXJhY3RlciBzdWJzdGl0dXRpb25zXG4gICAgICAgICAgJ1xcYic6ICdcXFxcYicsXG4gICAgICAgICAgJ1xcdCc6ICdcXFxcdCcsXG4gICAgICAgICAgJ1xcbic6ICdcXFxcbicsXG4gICAgICAgICAgJ1xcZic6ICdcXFxcZicsXG4gICAgICAgICAgJ1xccic6ICdcXFxccicsXG4gICAgICAgICAgJ1wiJyA6ICdcXFxcXCInLFxuICAgICAgICAgICdcXFxcJzogJ1xcXFxcXFxcJ1xuICAgICAgfSxcbiAgICAgIHJlcDtcblxuXG4gIGZ1bmN0aW9uIHF1b3RlKHN0cmluZykge1xuXG4vLyBJZiB0aGUgc3RyaW5nIGNvbnRhaW5zIG5vIGNvbnRyb2wgY2hhcmFjdGVycywgbm8gcXVvdGUgY2hhcmFjdGVycywgYW5kIG5vXG4vLyBiYWNrc2xhc2ggY2hhcmFjdGVycywgdGhlbiB3ZSBjYW4gc2FmZWx5IHNsYXAgc29tZSBxdW90ZXMgYXJvdW5kIGl0LlxuLy8gT3RoZXJ3aXNlIHdlIG11c3QgYWxzbyByZXBsYWNlIHRoZSBvZmZlbmRpbmcgY2hhcmFjdGVycyB3aXRoIHNhZmUgZXNjYXBlXG4vLyBzZXF1ZW5jZXMuXG5cbiAgICAgIGVzY2FwYWJsZS5sYXN0SW5kZXggPSAwO1xuICAgICAgcmV0dXJuIGVzY2FwYWJsZS50ZXN0KHN0cmluZykgPyAnXCInICsgc3RyaW5nLnJlcGxhY2UoZXNjYXBhYmxlLCBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgIHZhciBjID0gbWV0YVthXTtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIGMgPT09ICdzdHJpbmcnID8gYyA6XG4gICAgICAgICAgICAgICdcXFxcdScgKyAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xuICAgICAgfSkgKyAnXCInIDogJ1wiJyArIHN0cmluZyArICdcIic7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN0cihrZXksIGhvbGRlcikge1xuXG4vLyBQcm9kdWNlIGEgc3RyaW5nIGZyb20gaG9sZGVyW2tleV0uXG5cbiAgICAgIHZhciBpLCAgICAgICAgICAvLyBUaGUgbG9vcCBjb3VudGVyLlxuICAgICAgICAgIGssICAgICAgICAgIC8vIFRoZSBtZW1iZXIga2V5LlxuICAgICAgICAgIHYsICAgICAgICAgIC8vIFRoZSBtZW1iZXIgdmFsdWUuXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG1pbmQgPSBnYXAsXG4gICAgICAgICAgcGFydGlhbCxcbiAgICAgICAgICB2YWx1ZSA9IGhvbGRlcltrZXldO1xuXG4vLyBJZiB0aGUgdmFsdWUgaGFzIGEgdG9KU09OIG1ldGhvZCwgY2FsbCBpdCB0byBvYnRhaW4gYSByZXBsYWNlbWVudCB2YWx1ZS5cblxuICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgIHZhbHVlID0gZGF0ZShrZXkpO1xuICAgICAgfVxuXG4vLyBJZiB3ZSB3ZXJlIGNhbGxlZCB3aXRoIGEgcmVwbGFjZXIgZnVuY3Rpb24sIHRoZW4gY2FsbCB0aGUgcmVwbGFjZXIgdG9cbi8vIG9idGFpbiBhIHJlcGxhY2VtZW50IHZhbHVlLlxuXG4gICAgICBpZiAodHlwZW9mIHJlcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhbHVlID0gcmVwLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcbiAgICAgIH1cblxuLy8gV2hhdCBoYXBwZW5zIG5leHQgZGVwZW5kcyBvbiB0aGUgdmFsdWUncyB0eXBlLlxuXG4gICAgICBzd2l0Y2ggKHR5cGVvZiB2YWx1ZSkge1xuICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICByZXR1cm4gcXVvdGUodmFsdWUpO1xuXG4gICAgICBjYXNlICdudW1iZXInOlxuXG4vLyBKU09OIG51bWJlcnMgbXVzdCBiZSBmaW5pdGUuIEVuY29kZSBub24tZmluaXRlIG51bWJlcnMgYXMgbnVsbC5cblxuICAgICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWx1ZSkgPyBTdHJpbmcodmFsdWUpIDogJ251bGwnO1xuXG4gICAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIGNhc2UgJ251bGwnOlxuXG4vLyBJZiB0aGUgdmFsdWUgaXMgYSBib29sZWFuIG9yIG51bGwsIGNvbnZlcnQgaXQgdG8gYSBzdHJpbmcuIE5vdGU6XG4vLyB0eXBlb2YgbnVsbCBkb2VzIG5vdCBwcm9kdWNlICdudWxsJy4gVGhlIGNhc2UgaXMgaW5jbHVkZWQgaGVyZSBpblxuLy8gdGhlIHJlbW90ZSBjaGFuY2UgdGhhdCB0aGlzIGdldHMgZml4ZWQgc29tZWRheS5cblxuICAgICAgICAgIHJldHVybiBTdHJpbmcodmFsdWUpO1xuXG4vLyBJZiB0aGUgdHlwZSBpcyAnb2JqZWN0Jywgd2UgbWlnaHQgYmUgZGVhbGluZyB3aXRoIGFuIG9iamVjdCBvciBhbiBhcnJheSBvclxuLy8gbnVsbC5cblxuICAgICAgY2FzZSAnb2JqZWN0JzpcblxuLy8gRHVlIHRvIGEgc3BlY2lmaWNhdGlvbiBibHVuZGVyIGluIEVDTUFTY3JpcHQsIHR5cGVvZiBudWxsIGlzICdvYmplY3QnLFxuLy8gc28gd2F0Y2ggb3V0IGZvciB0aGF0IGNhc2UuXG5cbiAgICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnbnVsbCc7XG4gICAgICAgICAgfVxuXG4vLyBNYWtlIGFuIGFycmF5IHRvIGhvbGQgdGhlIHBhcnRpYWwgcmVzdWx0cyBvZiBzdHJpbmdpZnlpbmcgdGhpcyBvYmplY3QgdmFsdWUuXG5cbiAgICAgICAgICBnYXAgKz0gaW5kZW50O1xuICAgICAgICAgIHBhcnRpYWwgPSBbXTtcblxuLy8gSXMgdGhlIHZhbHVlIGFuIGFycmF5P1xuXG4gICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkodmFsdWUpID09PSAnW29iamVjdCBBcnJheV0nKSB7XG5cbi8vIFRoZSB2YWx1ZSBpcyBhbiBhcnJheS4gU3RyaW5naWZ5IGV2ZXJ5IGVsZW1lbnQuIFVzZSBudWxsIGFzIGEgcGxhY2Vob2xkZXJcbi8vIGZvciBub24tSlNPTiB2YWx1ZXMuXG5cbiAgICAgICAgICAgICAgbGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgIHBhcnRpYWxbaV0gPSBzdHIoaSwgdmFsdWUpIHx8ICdudWxsJztcbiAgICAgICAgICAgICAgfVxuXG4vLyBKb2luIGFsbCBvZiB0aGUgZWxlbWVudHMgdG9nZXRoZXIsIHNlcGFyYXRlZCB3aXRoIGNvbW1hcywgYW5kIHdyYXAgdGhlbSBpblxuLy8gYnJhY2tldHMuXG5cbiAgICAgICAgICAgICAgdiA9IHBhcnRpYWwubGVuZ3RoID09PSAwID8gJ1tdJyA6IGdhcCA/XG4gICAgICAgICAgICAgICAgICAnW1xcbicgKyBnYXAgKyBwYXJ0aWFsLmpvaW4oJyxcXG4nICsgZ2FwKSArICdcXG4nICsgbWluZCArICddJyA6XG4gICAgICAgICAgICAgICAgICAnWycgKyBwYXJ0aWFsLmpvaW4oJywnKSArICddJztcbiAgICAgICAgICAgICAgZ2FwID0gbWluZDtcbiAgICAgICAgICAgICAgcmV0dXJuIHY7XG4gICAgICAgICAgfVxuXG4vLyBJZiB0aGUgcmVwbGFjZXIgaXMgYW4gYXJyYXksIHVzZSBpdCB0byBzZWxlY3QgdGhlIG1lbWJlcnMgdG8gYmUgc3RyaW5naWZpZWQuXG5cbiAgICAgICAgICBpZiAocmVwICYmIHR5cGVvZiByZXAgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgIGxlbmd0aCA9IHJlcC5sZW5ndGg7XG4gICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXBbaV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgayA9IHJlcFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICB2ID0gc3RyKGssIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0aWFsLnB1c2gocXVvdGUoaykgKyAoZ2FwID8gJzogJyA6ICc6JykgKyB2KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuXG4vLyBPdGhlcndpc2UsIGl0ZXJhdGUgdGhyb3VnaCBhbGwgb2YgdGhlIGtleXMgaW4gdGhlIG9iamVjdC5cblxuICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdiA9IHN0cihrLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGlhbC5wdXNoKHF1b3RlKGspICsgKGdhcCA/ICc6ICcgOiAnOicpICsgdik7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4vLyBKb2luIGFsbCBvZiB0aGUgbWVtYmVyIHRleHRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsXG4vLyBhbmQgd3JhcCB0aGVtIGluIGJyYWNlcy5cblxuICAgICAgICAgIHYgPSBwYXJ0aWFsLmxlbmd0aCA9PT0gMCA/ICd7fScgOiBnYXAgP1xuICAgICAgICAgICAgICAne1xcbicgKyBnYXAgKyBwYXJ0aWFsLmpvaW4oJyxcXG4nICsgZ2FwKSArICdcXG4nICsgbWluZCArICd9JyA6XG4gICAgICAgICAgICAgICd7JyArIHBhcnRpYWwuam9pbignLCcpICsgJ30nO1xuICAgICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgICAgcmV0dXJuIHY7XG4gICAgICB9XG4gIH1cblxuLy8gSWYgdGhlIEpTT04gb2JqZWN0IGRvZXMgbm90IHlldCBoYXZlIGEgc3RyaW5naWZ5IG1ldGhvZCwgZ2l2ZSBpdCBvbmUuXG5cbiAgSlNPTi5zdHJpbmdpZnkgPSBmdW5jdGlvbiAodmFsdWUsIHJlcGxhY2VyLCBzcGFjZSkge1xuXG4vLyBUaGUgc3RyaW5naWZ5IG1ldGhvZCB0YWtlcyBhIHZhbHVlIGFuZCBhbiBvcHRpb25hbCByZXBsYWNlciwgYW5kIGFuIG9wdGlvbmFsXG4vLyBzcGFjZSBwYXJhbWV0ZXIsIGFuZCByZXR1cm5zIGEgSlNPTiB0ZXh0LiBUaGUgcmVwbGFjZXIgY2FuIGJlIGEgZnVuY3Rpb25cbi8vIHRoYXQgY2FuIHJlcGxhY2UgdmFsdWVzLCBvciBhbiBhcnJheSBvZiBzdHJpbmdzIHRoYXQgd2lsbCBzZWxlY3QgdGhlIGtleXMuXG4vLyBBIGRlZmF1bHQgcmVwbGFjZXIgbWV0aG9kIGNhbiBiZSBwcm92aWRlZC4gVXNlIG9mIHRoZSBzcGFjZSBwYXJhbWV0ZXIgY2FuXG4vLyBwcm9kdWNlIHRleHQgdGhhdCBpcyBtb3JlIGVhc2lseSByZWFkYWJsZS5cblxuICAgICAgdmFyIGk7XG4gICAgICBnYXAgPSAnJztcbiAgICAgIGluZGVudCA9ICcnO1xuXG4vLyBJZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGlzIGEgbnVtYmVyLCBtYWtlIGFuIGluZGVudCBzdHJpbmcgY29udGFpbmluZyB0aGF0XG4vLyBtYW55IHNwYWNlcy5cblxuICAgICAgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3BhY2U7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBpbmRlbnQgKz0gJyAnO1xuICAgICAgICAgIH1cblxuLy8gSWYgdGhlIHNwYWNlIHBhcmFtZXRlciBpcyBhIHN0cmluZywgaXQgd2lsbCBiZSB1c2VkIGFzIHRoZSBpbmRlbnQgc3RyaW5nLlxuXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzcGFjZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpbmRlbnQgPSBzcGFjZTtcbiAgICAgIH1cblxuLy8gSWYgdGhlcmUgaXMgYSByZXBsYWNlciwgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uIG9yIGFuIGFycmF5LlxuLy8gT3RoZXJ3aXNlLCB0aHJvdyBhbiBlcnJvci5cblxuICAgICAgcmVwID0gcmVwbGFjZXI7XG4gICAgICBpZiAocmVwbGFjZXIgJiYgdHlwZW9mIHJlcGxhY2VyICE9PSAnZnVuY3Rpb24nICYmXG4gICAgICAgICAgICAgICh0eXBlb2YgcmVwbGFjZXIgIT09ICdvYmplY3QnIHx8XG4gICAgICAgICAgICAgIHR5cGVvZiByZXBsYWNlci5sZW5ndGggIT09ICdudW1iZXInKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSlNPTi5zdHJpbmdpZnknKTtcbiAgICAgIH1cblxuLy8gTWFrZSBhIGZha2Ugcm9vdCBvYmplY3QgY29udGFpbmluZyBvdXIgdmFsdWUgdW5kZXIgdGhlIGtleSBvZiAnJy5cbi8vIFJldHVybiB0aGUgcmVzdWx0IG9mIHN0cmluZ2lmeWluZyB0aGUgdmFsdWUuXG5cbiAgICAgIHJldHVybiBzdHIoJycsIHsnJzogdmFsdWV9KTtcbiAgfTtcblxuLy8gSWYgdGhlIEpTT04gb2JqZWN0IGRvZXMgbm90IHlldCBoYXZlIGEgcGFyc2UgbWV0aG9kLCBnaXZlIGl0IG9uZS5cblxuICBKU09OLnBhcnNlID0gZnVuY3Rpb24gKHRleHQsIHJldml2ZXIpIHtcbiAgLy8gVGhlIHBhcnNlIG1ldGhvZCB0YWtlcyBhIHRleHQgYW5kIGFuIG9wdGlvbmFsIHJldml2ZXIgZnVuY3Rpb24sIGFuZCByZXR1cm5zXG4gIC8vIGEgSmF2YVNjcmlwdCB2YWx1ZSBpZiB0aGUgdGV4dCBpcyBhIHZhbGlkIEpTT04gdGV4dC5cblxuICAgICAgdmFyIGo7XG5cbiAgICAgIGZ1bmN0aW9uIHdhbGsoaG9sZGVyLCBrZXkpIHtcblxuICAvLyBUaGUgd2FsayBtZXRob2QgaXMgdXNlZCB0byByZWN1cnNpdmVseSB3YWxrIHRoZSByZXN1bHRpbmcgc3RydWN0dXJlIHNvXG4gIC8vIHRoYXQgbW9kaWZpY2F0aW9ucyBjYW4gYmUgbWFkZS5cblxuICAgICAgICAgIHZhciBrLCB2LCB2YWx1ZSA9IGhvbGRlcltrZXldO1xuICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2ID0gd2Fsayh2YWx1ZSwgayk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IHY7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2tdO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV2aXZlci5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgICB9XG5cblxuICAvLyBQYXJzaW5nIGhhcHBlbnMgaW4gZm91ciBzdGFnZXMuIEluIHRoZSBmaXJzdCBzdGFnZSwgd2UgcmVwbGFjZSBjZXJ0YWluXG4gIC8vIFVuaWNvZGUgY2hhcmFjdGVycyB3aXRoIGVzY2FwZSBzZXF1ZW5jZXMuIEphdmFTY3JpcHQgaGFuZGxlcyBtYW55IGNoYXJhY3RlcnNcbiAgLy8gaW5jb3JyZWN0bHksIGVpdGhlciBzaWxlbnRseSBkZWxldGluZyB0aGVtLCBvciB0cmVhdGluZyB0aGVtIGFzIGxpbmUgZW5kaW5ncy5cblxuICAgICAgdGV4dCA9IFN0cmluZyh0ZXh0KTtcbiAgICAgIGN4Lmxhc3RJbmRleCA9IDA7XG4gICAgICBpZiAoY3gudGVzdCh0ZXh0KSkge1xuICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoY3gsIGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnXFxcXHUnICtcbiAgICAgICAgICAgICAgICAgICgnMDAwMCcgKyBhLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCk7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgLy8gSW4gdGhlIHNlY29uZCBzdGFnZSwgd2UgcnVuIHRoZSB0ZXh0IGFnYWluc3QgcmVndWxhciBleHByZXNzaW9ucyB0aGF0IGxvb2tcbiAgLy8gZm9yIG5vbi1KU09OIHBhdHRlcm5zLiBXZSBhcmUgZXNwZWNpYWxseSBjb25jZXJuZWQgd2l0aCAnKCknIGFuZCAnbmV3J1xuICAvLyBiZWNhdXNlIHRoZXkgY2FuIGNhdXNlIGludm9jYXRpb24sIGFuZCAnPScgYmVjYXVzZSBpdCBjYW4gY2F1c2UgbXV0YXRpb24uXG4gIC8vIEJ1dCBqdXN0IHRvIGJlIHNhZmUsIHdlIHdhbnQgdG8gcmVqZWN0IGFsbCB1bmV4cGVjdGVkIGZvcm1zLlxuXG4gIC8vIFdlIHNwbGl0IHRoZSBzZWNvbmQgc3RhZ2UgaW50byA0IHJlZ2V4cCBvcGVyYXRpb25zIGluIG9yZGVyIHRvIHdvcmsgYXJvdW5kXG4gIC8vIGNyaXBwbGluZyBpbmVmZmljaWVuY2llcyBpbiBJRSdzIGFuZCBTYWZhcmkncyByZWdleHAgZW5naW5lcy4gRmlyc3Qgd2VcbiAgLy8gcmVwbGFjZSB0aGUgSlNPTiBiYWNrc2xhc2ggcGFpcnMgd2l0aCAnQCcgKGEgbm9uLUpTT04gY2hhcmFjdGVyKS4gU2Vjb25kLCB3ZVxuICAvLyByZXBsYWNlIGFsbCBzaW1wbGUgdmFsdWUgdG9rZW5zIHdpdGggJ10nIGNoYXJhY3RlcnMuIFRoaXJkLCB3ZSBkZWxldGUgYWxsXG4gIC8vIG9wZW4gYnJhY2tldHMgdGhhdCBmb2xsb3cgYSBjb2xvbiBvciBjb21tYSBvciB0aGF0IGJlZ2luIHRoZSB0ZXh0LiBGaW5hbGx5LFxuICAvLyB3ZSBsb29rIHRvIHNlZSB0aGF0IHRoZSByZW1haW5pbmcgY2hhcmFjdGVycyBhcmUgb25seSB3aGl0ZXNwYWNlIG9yICddJyBvclxuICAvLyAnLCcgb3IgJzonIG9yICd7JyBvciAnfScuIElmIHRoYXQgaXMgc28sIHRoZW4gdGhlIHRleHQgaXMgc2FmZSBmb3IgZXZhbC5cblxuICAgICAgaWYgKC9eW1xcXSw6e31cXHNdKiQvXG4gICAgICAgICAgICAgIC50ZXN0KHRleHQucmVwbGFjZSgvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9nLCAnQCcpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2csICddJylcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZywgJycpKSkge1xuXG4gIC8vIEluIHRoZSB0aGlyZCBzdGFnZSB3ZSB1c2UgdGhlIGV2YWwgZnVuY3Rpb24gdG8gY29tcGlsZSB0aGUgdGV4dCBpbnRvIGFcbiAgLy8gSmF2YVNjcmlwdCBzdHJ1Y3R1cmUuIFRoZSAneycgb3BlcmF0b3IgaXMgc3ViamVjdCB0byBhIHN5bnRhY3RpYyBhbWJpZ3VpdHlcbiAgLy8gaW4gSmF2YVNjcmlwdDogaXQgY2FuIGJlZ2luIGEgYmxvY2sgb3IgYW4gb2JqZWN0IGxpdGVyYWwuIFdlIHdyYXAgdGhlIHRleHRcbiAgLy8gaW4gcGFyZW5zIHRvIGVsaW1pbmF0ZSB0aGUgYW1iaWd1aXR5LlxuXG4gICAgICAgICAgaiA9IGV2YWwoJygnICsgdGV4dCArICcpJyk7XG5cbiAgLy8gSW4gdGhlIG9wdGlvbmFsIGZvdXJ0aCBzdGFnZSwgd2UgcmVjdXJzaXZlbHkgd2FsayB0aGUgbmV3IHN0cnVjdHVyZSwgcGFzc2luZ1xuICAvLyBlYWNoIG5hbWUvdmFsdWUgcGFpciB0byBhIHJldml2ZXIgZnVuY3Rpb24gZm9yIHBvc3NpYmxlIHRyYW5zZm9ybWF0aW9uLlxuXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nID9cbiAgICAgICAgICAgICAgd2Fsayh7Jyc6IGp9LCAnJykgOiBqO1xuICAgICAgfVxuXG4gIC8vIElmIHRoZSB0ZXh0IGlzIG5vdCBKU09OIHBhcnNlYWJsZSwgdGhlbiBhIFN5bnRheEVycm9yIGlzIHRocm93bi5cblxuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdKU09OLnBhcnNlJyk7XG4gIH07XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcbiAgLCB0eXBlb2YgSlNPTiAhPT0gJ3VuZGVmaW5lZCcgPyBKU09OIDogdW5kZWZpbmVkXG4pO1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xuXG4gIC8qKlxuICAgKiBQYXJzZXIgbmFtZXNwYWNlLlxuICAgKlxuICAgKiBAbmFtZXNwYWNlXG4gICAqL1xuXG4gIHZhciBwYXJzZXIgPSBleHBvcnRzLnBhcnNlciA9IHt9O1xuXG4gIC8qKlxuICAgKiBQYWNrZXQgdHlwZXMuXG4gICAqL1xuXG4gIHZhciBwYWNrZXRzID0gcGFyc2VyLnBhY2tldHMgPSBbXG4gICAgICAnZGlzY29ubmVjdCdcbiAgICAsICdjb25uZWN0J1xuICAgICwgJ2hlYXJ0YmVhdCdcbiAgICAsICdtZXNzYWdlJ1xuICAgICwgJ2pzb24nXG4gICAgLCAnZXZlbnQnXG4gICAgLCAnYWNrJ1xuICAgICwgJ2Vycm9yJ1xuICAgICwgJ25vb3AnXG4gIF07XG5cbiAgLyoqXG4gICAqIEVycm9ycyByZWFzb25zLlxuICAgKi9cblxuICB2YXIgcmVhc29ucyA9IHBhcnNlci5yZWFzb25zID0gW1xuICAgICAgJ3RyYW5zcG9ydCBub3Qgc3VwcG9ydGVkJ1xuICAgICwgJ2NsaWVudCBub3QgaGFuZHNoYWtlbidcbiAgICAsICd1bmF1dGhvcml6ZWQnXG4gIF07XG5cbiAgLyoqXG4gICAqIEVycm9ycyBhZHZpY2UuXG4gICAqL1xuXG4gIHZhciBhZHZpY2UgPSBwYXJzZXIuYWR2aWNlID0gW1xuICAgICAgJ3JlY29ubmVjdCdcbiAgXTtcblxuICAvKipcbiAgICogU2hvcnRjdXRzLlxuICAgKi9cblxuICB2YXIgSlNPTiA9IGlvLkpTT05cbiAgICAsIGluZGV4T2YgPSBpby51dGlsLmluZGV4T2Y7XG5cbiAgLyoqXG4gICAqIEVuY29kZXMgYSBwYWNrZXQuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBwYXJzZXIuZW5jb2RlUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgIHZhciB0eXBlID0gaW5kZXhPZihwYWNrZXRzLCBwYWNrZXQudHlwZSlcbiAgICAgICwgaWQgPSBwYWNrZXQuaWQgfHwgJydcbiAgICAgICwgZW5kcG9pbnQgPSBwYWNrZXQuZW5kcG9pbnQgfHwgJydcbiAgICAgICwgYWNrID0gcGFja2V0LmFja1xuICAgICAgLCBkYXRhID0gbnVsbDtcblxuICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgdmFyIHJlYXNvbiA9IHBhY2tldC5yZWFzb24gPyBpbmRleE9mKHJlYXNvbnMsIHBhY2tldC5yZWFzb24pIDogJydcbiAgICAgICAgICAsIGFkdiA9IHBhY2tldC5hZHZpY2UgPyBpbmRleE9mKGFkdmljZSwgcGFja2V0LmFkdmljZSkgOiAnJztcblxuICAgICAgICBpZiAocmVhc29uICE9PSAnJyB8fCBhZHYgIT09ICcnKVxuICAgICAgICAgIGRhdGEgPSByZWFzb24gKyAoYWR2ICE9PSAnJyA/ICgnKycgKyBhZHYpIDogJycpO1xuXG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgICAgaWYgKHBhY2tldC5kYXRhICE9PSAnJylcbiAgICAgICAgICBkYXRhID0gcGFja2V0LmRhdGE7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdldmVudCc6XG4gICAgICAgIHZhciBldiA9IHsgbmFtZTogcGFja2V0Lm5hbWUgfTtcblxuICAgICAgICBpZiAocGFja2V0LmFyZ3MgJiYgcGFja2V0LmFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgZXYuYXJncyA9IHBhY2tldC5hcmdzO1xuICAgICAgICB9XG5cbiAgICAgICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KGV2KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICBkYXRhID0gSlNPTi5zdHJpbmdpZnkocGFja2V0LmRhdGEpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnY29ubmVjdCc6XG4gICAgICAgIGlmIChwYWNrZXQucXMpXG4gICAgICAgICAgZGF0YSA9IHBhY2tldC5xcztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Fjayc6XG4gICAgICAgIGRhdGEgPSBwYWNrZXQuYWNrSWRcbiAgICAgICAgICArIChwYWNrZXQuYXJncyAmJiBwYWNrZXQuYXJncy5sZW5ndGhcbiAgICAgICAgICAgICAgPyAnKycgKyBKU09OLnN0cmluZ2lmeShwYWNrZXQuYXJncykgOiAnJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIGNvbnN0cnVjdCBwYWNrZXQgd2l0aCByZXF1aXJlZCBmcmFnbWVudHNcbiAgICB2YXIgZW5jb2RlZCA9IFtcbiAgICAgICAgdHlwZVxuICAgICAgLCBpZCArIChhY2sgPT0gJ2RhdGEnID8gJysnIDogJycpXG4gICAgICAsIGVuZHBvaW50XG4gICAgXTtcblxuICAgIC8vIGRhdGEgZnJhZ21lbnQgaXMgb3B0aW9uYWxcbiAgICBpZiAoZGF0YSAhPT0gbnVsbCAmJiBkYXRhICE9PSB1bmRlZmluZWQpXG4gICAgICBlbmNvZGVkLnB1c2goZGF0YSk7XG5cbiAgICByZXR1cm4gZW5jb2RlZC5qb2luKCc6Jyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEVuY29kZXMgbXVsdGlwbGUgbWVzc2FnZXMgKHBheWxvYWQpLlxuICAgKlxuICAgKiBAcGFyYW0ge0FycmF5fSBtZXNzYWdlc1xuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgcGFyc2VyLmVuY29kZVBheWxvYWQgPSBmdW5jdGlvbiAocGFja2V0cykge1xuICAgIHZhciBkZWNvZGVkID0gJyc7XG5cbiAgICBpZiAocGFja2V0cy5sZW5ndGggPT0gMSlcbiAgICAgIHJldHVybiBwYWNrZXRzWzBdO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYWNrZXRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgdmFyIHBhY2tldCA9IHBhY2tldHNbaV07XG4gICAgICBkZWNvZGVkICs9ICdcXHVmZmZkJyArIHBhY2tldC5sZW5ndGggKyAnXFx1ZmZmZCcgKyBwYWNrZXRzW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBkZWNvZGVkO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWNvZGVzIGEgcGFja2V0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICB2YXIgcmVnZXhwID0gLyhbXjpdKyk6KFswLTldKyk/KFxcKyk/OihbXjpdKyk/Oj8oW1xcc1xcU10qKT8vO1xuXG4gIHBhcnNlci5kZWNvZGVQYWNrZXQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBwaWVjZXMgPSBkYXRhLm1hdGNoKHJlZ2V4cCk7XG5cbiAgICBpZiAoIXBpZWNlcykgcmV0dXJuIHt9O1xuXG4gICAgdmFyIGlkID0gcGllY2VzWzJdIHx8ICcnXG4gICAgICAsIGRhdGEgPSBwaWVjZXNbNV0gfHwgJydcbiAgICAgICwgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogcGFja2V0c1twaWVjZXNbMV1dXG4gICAgICAgICAgLCBlbmRwb2ludDogcGllY2VzWzRdIHx8ICcnXG4gICAgICAgIH07XG5cbiAgICAvLyB3aGV0aGVyIHdlIG5lZWQgdG8gYWNrbm93bGVkZ2UgdGhlIHBhY2tldFxuICAgIGlmIChpZCkge1xuICAgICAgcGFja2V0LmlkID0gaWQ7XG4gICAgICBpZiAocGllY2VzWzNdKVxuICAgICAgICBwYWNrZXQuYWNrID0gJ2RhdGEnO1xuICAgICAgZWxzZVxuICAgICAgICBwYWNrZXQuYWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBoYW5kbGUgZGlmZmVyZW50IHBhY2tldCB0eXBlc1xuICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgdmFyIHBpZWNlcyA9IGRhdGEuc3BsaXQoJysnKTtcbiAgICAgICAgcGFja2V0LnJlYXNvbiA9IHJlYXNvbnNbcGllY2VzWzBdXSB8fCAnJztcbiAgICAgICAgcGFja2V0LmFkdmljZSA9IGFkdmljZVtwaWVjZXNbMV1dIHx8ICcnO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIHBhY2tldC5kYXRhID0gZGF0YSB8fCAnJztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2V2ZW50JzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YXIgb3B0cyA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgcGFja2V0Lm5hbWUgPSBvcHRzLm5hbWU7XG4gICAgICAgICAgcGFja2V0LmFyZ3MgPSBvcHRzLmFyZ3M7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuXG4gICAgICAgIHBhY2tldC5hcmdzID0gcGFja2V0LmFyZ3MgfHwgW107XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBwYWNrZXQuZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnY29ubmVjdCc6XG4gICAgICAgIHBhY2tldC5xcyA9IGRhdGEgfHwgJyc7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdhY2snOlxuICAgICAgICB2YXIgcGllY2VzID0gZGF0YS5tYXRjaCgvXihbMC05XSspKFxcKyk/KC4qKS8pO1xuICAgICAgICBpZiAocGllY2VzKSB7XG4gICAgICAgICAgcGFja2V0LmFja0lkID0gcGllY2VzWzFdO1xuICAgICAgICAgIHBhY2tldC5hcmdzID0gW107XG5cbiAgICAgICAgICBpZiAocGllY2VzWzNdKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBwYWNrZXQuYXJncyA9IHBpZWNlc1szXSA/IEpTT04ucGFyc2UocGllY2VzWzNdKSA6IFtdO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdkaXNjb25uZWN0JzpcbiAgICAgIGNhc2UgJ2hlYXJ0YmVhdCc6XG4gICAgICAgIGJyZWFrO1xuICAgIH07XG5cbiAgICByZXR1cm4gcGFja2V0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBEZWNvZGVzIGRhdGEgcGF5bG9hZC4gRGV0ZWN0cyBtdWx0aXBsZSBtZXNzYWdlc1xuICAgKlxuICAgKiBAcmV0dXJuIHtBcnJheX0gbWVzc2FnZXNcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgcGFyc2VyLmRlY29kZVBheWxvYWQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIC8vIElFIGRvZXNuJ3QgbGlrZSBkYXRhW2ldIGZvciB1bmljb2RlIGNoYXJzLCBjaGFyQXQgd29ya3MgZmluZVxuICAgIGlmIChkYXRhLmNoYXJBdCgwKSA9PSAnXFx1ZmZmZCcpIHtcbiAgICAgIHZhciByZXQgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDEsIGxlbmd0aCA9ICcnOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoZGF0YS5jaGFyQXQoaSkgPT0gJ1xcdWZmZmQnKSB7XG4gICAgICAgICAgcmV0LnB1c2gocGFyc2VyLmRlY29kZVBhY2tldChkYXRhLnN1YnN0cihpICsgMSkuc3Vic3RyKDAsIGxlbmd0aCkpKTtcbiAgICAgICAgICBpICs9IE51bWJlcihsZW5ndGgpICsgMTtcbiAgICAgICAgICBsZW5ndGggPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsZW5ndGggKz0gZGF0YS5jaGFyQXQoaSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIFtwYXJzZXIuZGVjb2RlUGFja2V0KGRhdGEpXTtcbiAgICB9XG4gIH07XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuKTtcbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy5UcmFuc3BvcnQgPSBUcmFuc3BvcnQ7XG5cbiAgLyoqXG4gICAqIFRoaXMgaXMgdGhlIHRyYW5zcG9ydCB0ZW1wbGF0ZSBmb3IgYWxsIHN1cHBvcnRlZCB0cmFuc3BvcnQgbWV0aG9kcy5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFRyYW5zcG9ydCAoc29ja2V0LCBzZXNzaWQpIHtcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICB0aGlzLnNlc3NpZCA9IHNlc3NpZDtcbiAgfTtcblxuICAvKipcbiAgICogQXBwbHkgRXZlbnRFbWl0dGVyIG1peGluLlxuICAgKi9cblxuICBpby51dGlsLm1peGluKFRyYW5zcG9ydCwgaW8uRXZlbnRFbWl0dGVyKTtcblxuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBoZWFydGJlYXRzIGlzIGVuYWJsZWQgZm9yIHRoaXMgdHJhbnNwb3J0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLmhlYXJ0YmVhdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci4gV2hlbiBhIG5ldyByZXNwb25zZSBpcyByZWNlaXZlZFxuICAgKiBpdCB3aWxsIGF1dG9tYXRpY2FsbHkgdXBkYXRlIHRoZSB0aW1lb3V0LCBkZWNvZGUgdGhlIG1lc3NhZ2UgYW5kXG4gICAqIGZvcndhcmRzIHRoZSByZXNwb25zZSB0byB0aGUgb25NZXNzYWdlIGZ1bmN0aW9uIGZvciBmdXJ0aGVyIHByb2Nlc3NpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIFJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25EYXRhID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCk7XG5cbiAgICAvLyBJZiB0aGUgY29ubmVjdGlvbiBpbiBjdXJyZW50bHkgb3BlbiAob3IgaW4gYSByZW9wZW5pbmcgc3RhdGUpIHJlc2V0IHRoZSBjbG9zZVxuICAgIC8vIHRpbWVvdXQgc2luY2Ugd2UgaGF2ZSBqdXN0IHJlY2VpdmVkIGRhdGEuIFRoaXMgY2hlY2sgaXMgbmVjZXNzYXJ5IHNvXG4gICAgLy8gdGhhdCB3ZSBkb24ndCByZXNldCB0aGUgdGltZW91dCBvbiBhbiBleHBsaWNpdGx5IGRpc2Nvbm5lY3RlZCBjb25uZWN0aW9uLlxuICAgIGlmICh0aGlzLnNvY2tldC5jb25uZWN0ZWQgfHwgdGhpcy5zb2NrZXQuY29ubmVjdGluZyB8fCB0aGlzLnNvY2tldC5yZWNvbm5lY3RpbmcpIHtcbiAgICAgIHRoaXMuc2V0Q2xvc2VUaW1lb3V0KCk7XG4gICAgfVxuXG4gICAgaWYgKGRhdGEgIT09ICcnKSB7XG4gICAgICAvLyB0b2RvOiB3ZSBzaG91bGQgb25seSBkbyBkZWNvZGVQYXlsb2FkIGZvciB4aHIgdHJhbnNwb3J0c1xuICAgICAgdmFyIG1zZ3MgPSBpby5wYXJzZXIuZGVjb2RlUGF5bG9hZChkYXRhKTtcblxuICAgICAgaWYgKG1zZ3MgJiYgbXNncy5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBtc2dzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgIHRoaXMub25QYWNrZXQobXNnc1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBwYWNrZXRzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICB0aGlzLnNvY2tldC5zZXRIZWFydGJlYXRUaW1lb3V0KCk7XG5cbiAgICBpZiAocGFja2V0LnR5cGUgPT0gJ2hlYXJ0YmVhdCcpIHtcbiAgICAgIHJldHVybiB0aGlzLm9uSGVhcnRiZWF0KCk7XG4gICAgfVxuXG4gICAgaWYgKHBhY2tldC50eXBlID09ICdjb25uZWN0JyAmJiBwYWNrZXQuZW5kcG9pbnQgPT0gJycpIHtcbiAgICAgIHRoaXMub25Db25uZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKHBhY2tldC50eXBlID09ICdlcnJvcicgJiYgcGFja2V0LmFkdmljZSA9PSAncmVjb25uZWN0Jykge1xuICAgICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnNvY2tldC5vblBhY2tldChwYWNrZXQpO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgY2xvc2UgdGltZW91dFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5zZXRDbG9zZVRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmNsb3NlVGltZW91dCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgICB0aGlzLmNsb3NlVGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBzZWxmLm9uRGlzY29ubmVjdCgpO1xuICAgICAgfSwgdGhpcy5zb2NrZXQuY2xvc2VUaW1lb3V0KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRyYW5zcG9ydCBkaXNjb25uZWN0cy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25EaXNjb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlzT3BlbikgdGhpcy5jbG9zZSgpO1xuICAgIHRoaXMuY2xlYXJUaW1lb3V0cygpO1xuICAgIHRoaXMuc29ja2V0Lm9uRGlzY29ubmVjdCgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0cmFuc3BvcnQgY29ubmVjdHNcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25Db25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc29ja2V0Lm9uQ29ubmVjdCgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhcnMgY2xvc2UgdGltZW91dFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5jbGVhckNsb3NlVGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5jbG9zZVRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZW91dCk7XG4gICAgICB0aGlzLmNsb3NlVGltZW91dCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDbGVhciB0aW1lb3V0c1xuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5jbGVhclRpbWVvdXRzID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuY2xlYXJDbG9zZVRpbWVvdXQoKTtcblxuICAgIGlmICh0aGlzLnJlb3BlblRpbWVvdXQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlb3BlblRpbWVvdXQpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogU2VuZHMgYSBwYWNrZXRcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHBhY2tldCBvYmplY3QuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICB0aGlzLnNlbmQoaW8ucGFyc2VyLmVuY29kZVBhY2tldChwYWNrZXQpKTtcbiAgfTtcblxuICAvKipcbiAgICogU2VuZCB0aGUgcmVjZWl2ZWQgaGVhcnRiZWF0IG1lc3NhZ2UgYmFjayB0byBzZXJ2ZXIuIFNvIHRoZSBzZXJ2ZXJcbiAgICoga25vd3Mgd2UgYXJlIHN0aWxsIGNvbm5lY3RlZC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGhlYXJ0YmVhdCBIZWFydGJlYXQgcmVzcG9uc2UgZnJvbSB0aGUgc2VydmVyLlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbkhlYXJ0YmVhdCA9IGZ1bmN0aW9uIChoZWFydGJlYXQpIHtcbiAgICB0aGlzLnBhY2tldCh7IHR5cGU6ICdoZWFydGJlYXQnIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdHJhbnNwb3J0IG9wZW5zLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5vbk9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pc09wZW4gPSB0cnVlO1xuICAgIHRoaXMuY2xlYXJDbG9zZVRpbWVvdXQoKTtcbiAgICB0aGlzLnNvY2tldC5vbk9wZW4oKTtcbiAgfTtcblxuICAvKipcbiAgICogTm90aWZpZXMgdGhlIGJhc2Ugd2hlbiB0aGUgY29ubmVjdGlvbiB3aXRoIHRoZSBTb2NrZXQuSU8gc2VydmVyXG4gICAqIGhhcyBiZWVuIGRpc2Nvbm5lY3RlZC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICAvKiBGSVhNRTogcmVvcGVuIGRlbGF5IGNhdXNpbmcgYSBpbmZpbml0IGxvb3BcbiAgICB0aGlzLnJlb3BlblRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYub3BlbigpO1xuICAgIH0sIHRoaXMuc29ja2V0Lm9wdGlvbnNbJ3Jlb3BlbiBkZWxheSddKTsqL1xuXG4gICAgdGhpcy5pc09wZW4gPSBmYWxzZTtcbiAgICB0aGlzLnNvY2tldC5vbkNsb3NlKCk7XG4gICAgdGhpcy5vbkRpc2Nvbm5lY3QoKTtcbiAgfTtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIGEgY29ubmVjdGlvbiB1cmwgYmFzZWQgb24gdGhlIFNvY2tldC5JTyBVUkwgUHJvdG9jb2wuXG4gICAqIFNlZSA8aHR0cHM6Ly9naXRodWIuY29tL2xlYXJuYm9vc3Qvc29ja2V0LmlvLW5vZGUvPiBmb3IgbW9yZSBkZXRhaWxzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7U3RyaW5nfSBDb25uZWN0aW9uIHVybFxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5wcmVwYXJlVXJsID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5zb2NrZXQub3B0aW9ucztcblxuICAgIHJldHVybiB0aGlzLnNjaGVtZSgpICsgJzovLydcbiAgICAgICsgb3B0aW9ucy5ob3N0ICsgJzonICsgb3B0aW9ucy5wb3J0ICsgJy8nXG4gICAgICArIG9wdGlvbnMucmVzb3VyY2UgKyAnLycgKyBpby5wcm90b2NvbFxuICAgICAgKyAnLycgKyB0aGlzLm5hbWUgKyAnLycgKyB0aGlzLnNlc3NpZDtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSB0cmFuc3BvcnQgaXMgcmVhZHkgdG8gc3RhcnQgYSBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0IFRoZSBzb2NrZXQgaW5zdGFuY2UgdGhhdCBuZWVkcyBhIHRyYW5zcG9ydFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2tcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUucmVhZHkgPSBmdW5jdGlvbiAoc29ja2V0LCBmbikge1xuICAgIGZuLmNhbGwodGhpcyk7XG4gIH07XG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbik7XG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbywgZ2xvYmFsKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy5Tb2NrZXQgPSBTb2NrZXQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBhIG5ldyBgU29ja2V0LklPIGNsaWVudGAgd2hpY2ggY2FuIGVzdGFibGlzaCBhIHBlcnNpc3RlbnRcbiAgICogY29ubmVjdGlvbiB3aXRoIGEgU29ja2V0LklPIGVuYWJsZWQgc2VydmVyLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBTb2NrZXQgKG9wdGlvbnMpIHtcbiAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgIHBvcnQ6IDgwXG4gICAgICAsIHNlY3VyZTogZmFsc2VcbiAgICAgICwgZG9jdW1lbnQ6ICdkb2N1bWVudCcgaW4gZ2xvYmFsID8gZG9jdW1lbnQgOiBmYWxzZVxuICAgICAgLCByZXNvdXJjZTogJ3NvY2tldC5pbydcbiAgICAgICwgdHJhbnNwb3J0czogaW8udHJhbnNwb3J0c1xuICAgICAgLCAnY29ubmVjdCB0aW1lb3V0JzogMTAwMDBcbiAgICAgICwgJ3RyeSBtdWx0aXBsZSB0cmFuc3BvcnRzJzogdHJ1ZVxuICAgICAgLCAncmVjb25uZWN0JzogdHJ1ZVxuICAgICAgLCAncmVjb25uZWN0aW9uIGRlbGF5JzogNTAwXG4gICAgICAsICdyZWNvbm5lY3Rpb24gbGltaXQnOiBJbmZpbml0eVxuICAgICAgLCAncmVvcGVuIGRlbGF5JzogMzAwMFxuICAgICAgLCAnbWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0cyc6IDEwXG4gICAgICAsICdzeW5jIGRpc2Nvbm5lY3Qgb24gdW5sb2FkJzogZmFsc2VcbiAgICAgICwgJ2F1dG8gY29ubmVjdCc6IHRydWVcbiAgICAgICwgJ2ZsYXNoIHBvbGljeSBwb3J0JzogMTA4NDNcbiAgICAgICwgJ21hbnVhbEZsdXNoJzogZmFsc2VcbiAgICB9O1xuXG4gICAgaW8udXRpbC5tZXJnZSh0aGlzLm9wdGlvbnMsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMubmFtZXNwYWNlcyA9IHt9O1xuICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgdGhpcy5kb0J1ZmZlciA9IGZhbHNlO1xuXG4gICAgaWYgKHRoaXMub3B0aW9uc1snc3luYyBkaXNjb25uZWN0IG9uIHVubG9hZCddICYmXG4gICAgICAgICghdGhpcy5pc1hEb21haW4oKSB8fCBpby51dGlsLnVhLmhhc0NPUlMpKSB7XG4gICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICBpby51dGlsLm9uKGdsb2JhbCwgJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5kaXNjb25uZWN0U3luYygpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm9wdGlvbnNbJ2F1dG8gY29ubmVjdCddKSB7XG4gICAgICB0aGlzLmNvbm5lY3QoKTtcbiAgICB9XG59O1xuXG4gIC8qKlxuICAgKiBBcHBseSBFdmVudEVtaXR0ZXIgbWl4aW4uXG4gICAqL1xuXG4gIGlvLnV0aWwubWl4aW4oU29ja2V0LCBpby5FdmVudEVtaXR0ZXIpO1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGEgbmFtZXNwYWNlIGxpc3RlbmVyL2VtaXR0ZXIgZm9yIHRoaXMgc29ja2V0XG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUub2YgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghdGhpcy5uYW1lc3BhY2VzW25hbWVdKSB7XG4gICAgICB0aGlzLm5hbWVzcGFjZXNbbmFtZV0gPSBuZXcgaW8uU29ja2V0TmFtZXNwYWNlKHRoaXMsIG5hbWUpO1xuXG4gICAgICBpZiAobmFtZSAhPT0gJycpIHtcbiAgICAgICAgdGhpcy5uYW1lc3BhY2VzW25hbWVdLnBhY2tldCh7IHR5cGU6ICdjb25uZWN0JyB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5uYW1lc3BhY2VzW25hbWVdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0cyB0aGUgZ2l2ZW4gZXZlbnQgdG8gdGhlIFNvY2tldCBhbmQgYWxsIG5hbWVzcGFjZXNcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUucHVibGlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIHZhciBuc3A7XG5cbiAgICBmb3IgKHZhciBpIGluIHRoaXMubmFtZXNwYWNlcykge1xuICAgICAgaWYgKHRoaXMubmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICBuc3AgPSB0aGlzLm9mKGkpO1xuICAgICAgICBuc3AuJGVtaXQuYXBwbHkobnNwLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogUGVyZm9ybXMgdGhlIGhhbmRzaGFrZVxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gZW1wdHkgKCkgeyB9O1xuXG4gIFNvY2tldC5wcm90b3R5cGUuaGFuZHNoYWtlID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAsIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnM7XG5cbiAgICBmdW5jdGlvbiBjb21wbGV0ZSAoZGF0YSkge1xuICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBzZWxmLmNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgICAgc2VsZi5vbkVycm9yKGRhdGEubWVzc2FnZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmbi5hcHBseShudWxsLCBkYXRhLnNwbGl0KCc6JykpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgdXJsID0gW1xuICAgICAgICAgICdodHRwJyArIChvcHRpb25zLnNlY3VyZSA/ICdzJyA6ICcnKSArICc6LydcbiAgICAgICAgLCBvcHRpb25zLmhvc3QgKyAnOicgKyBvcHRpb25zLnBvcnRcbiAgICAgICAgLCBvcHRpb25zLnJlc291cmNlXG4gICAgICAgICwgaW8ucHJvdG9jb2xcbiAgICAgICAgLCBpby51dGlsLnF1ZXJ5KHRoaXMub3B0aW9ucy5xdWVyeSwgJ3Q9JyArICtuZXcgRGF0ZSlcbiAgICAgIF0uam9pbignLycpO1xuXG4gICAgaWYgKHRoaXMuaXNYRG9tYWluKCkgJiYgIWlvLnV0aWwudWEuaGFzQ09SUykge1xuICAgICAgdmFyIGluc2VydEF0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdXG4gICAgICAgICwgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cbiAgICAgIHNjcmlwdC5zcmMgPSB1cmwgKyAnJmpzb25wPScgKyBpby5qLmxlbmd0aDtcbiAgICAgIGluc2VydEF0LnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHNjcmlwdCwgaW5zZXJ0QXQpO1xuXG4gICAgICBpby5qLnB1c2goZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY29tcGxldGUoZGF0YSk7XG4gICAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHhociA9IGlvLnV0aWwucmVxdWVzdCgpO1xuXG4gICAgICB4aHIub3BlbignR0VUJywgdXJsLCB0cnVlKTtcbiAgICAgIGlmICh0aGlzLmlzWERvbWFpbigpKSB7XG4gICAgICAgIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuICAgICAgfVxuICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHhoci5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7XG5cbiAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICAgIGNvbXBsZXRlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoeGhyLnN0YXR1cyA9PSA0MDMpIHtcbiAgICAgICAgICAgIHNlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5jb25uZWN0aW5nID0gZmFsc2U7ICAgICAgICAgICAgXG4gICAgICAgICAgICAhc2VsZi5yZWNvbm5lY3RpbmcgJiYgc2VsZi5vbkVycm9yKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHhoci5zZW5kKG51bGwpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRmluZCBhbiBhdmFpbGFibGUgdHJhbnNwb3J0IGJhc2VkIG9uIHRoZSBvcHRpb25zIHN1cHBsaWVkIGluIHRoZSBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuZ2V0VHJhbnNwb3J0ID0gZnVuY3Rpb24gKG92ZXJyaWRlKSB7XG4gICAgdmFyIHRyYW5zcG9ydHMgPSBvdmVycmlkZSB8fCB0aGlzLnRyYW5zcG9ydHMsIG1hdGNoO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIHRyYW5zcG9ydDsgdHJhbnNwb3J0ID0gdHJhbnNwb3J0c1tpXTsgaSsrKSB7XG4gICAgICBpZiAoaW8uVHJhbnNwb3J0W3RyYW5zcG9ydF1cbiAgICAgICAgJiYgaW8uVHJhbnNwb3J0W3RyYW5zcG9ydF0uY2hlY2sodGhpcylcbiAgICAgICAgJiYgKCF0aGlzLmlzWERvbWFpbigpIHx8IGlvLlRyYW5zcG9ydFt0cmFuc3BvcnRdLnhkb21haW5DaGVjayh0aGlzKSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBpby5UcmFuc3BvcnRbdHJhbnNwb3J0XSh0aGlzLCB0aGlzLnNlc3Npb25pZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRvIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl0gQ2FsbGJhY2suXG4gICAqIEByZXR1cm5zIHtpby5Tb2NrZXR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuY29ubmVjdCA9IGZ1bmN0aW9uIChmbikge1xuICAgIGlmICh0aGlzLmNvbm5lY3RpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLmNvbm5lY3RpbmcgPSB0cnVlO1xuICAgIFxuICAgIHRoaXMuaGFuZHNoYWtlKGZ1bmN0aW9uIChzaWQsIGhlYXJ0YmVhdCwgY2xvc2UsIHRyYW5zcG9ydHMpIHtcbiAgICAgIHNlbGYuc2Vzc2lvbmlkID0gc2lkO1xuICAgICAgc2VsZi5jbG9zZVRpbWVvdXQgPSBjbG9zZSAqIDEwMDA7XG4gICAgICBzZWxmLmhlYXJ0YmVhdFRpbWVvdXQgPSBoZWFydGJlYXQgKiAxMDAwO1xuICAgICAgaWYoIXNlbGYudHJhbnNwb3J0cylcbiAgICAgICAgICBzZWxmLnRyYW5zcG9ydHMgPSBzZWxmLm9yaWdUcmFuc3BvcnRzID0gKHRyYW5zcG9ydHMgPyBpby51dGlsLmludGVyc2VjdChcbiAgICAgICAgICAgICAgdHJhbnNwb3J0cy5zcGxpdCgnLCcpXG4gICAgICAgICAgICAsIHNlbGYub3B0aW9ucy50cmFuc3BvcnRzXG4gICAgICAgICAgKSA6IHNlbGYub3B0aW9ucy50cmFuc3BvcnRzKTtcblxuICAgICAgc2VsZi5zZXRIZWFydGJlYXRUaW1lb3V0KCk7XG5cbiAgICAgIGZ1bmN0aW9uIGNvbm5lY3QgKHRyYW5zcG9ydHMpe1xuICAgICAgICBpZiAoc2VsZi50cmFuc3BvcnQpIHNlbGYudHJhbnNwb3J0LmNsZWFyVGltZW91dHMoKTtcblxuICAgICAgICBzZWxmLnRyYW5zcG9ydCA9IHNlbGYuZ2V0VHJhbnNwb3J0KHRyYW5zcG9ydHMpO1xuICAgICAgICBpZiAoIXNlbGYudHJhbnNwb3J0KSByZXR1cm4gc2VsZi5wdWJsaXNoKCdjb25uZWN0X2ZhaWxlZCcpO1xuXG4gICAgICAgIC8vIG9uY2UgdGhlIHRyYW5zcG9ydCBpcyByZWFkeVxuICAgICAgICBzZWxmLnRyYW5zcG9ydC5yZWFkeShzZWxmLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc2VsZi5jb25uZWN0aW5nID0gdHJ1ZTtcbiAgICAgICAgICBzZWxmLnB1Ymxpc2goJ2Nvbm5lY3RpbmcnLCBzZWxmLnRyYW5zcG9ydC5uYW1lKTtcbiAgICAgICAgICBzZWxmLnRyYW5zcG9ydC5vcGVuKCk7XG5cbiAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zWydjb25uZWN0IHRpbWVvdXQnXSkge1xuICAgICAgICAgICAgc2VsZi5jb25uZWN0VGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmICghc2VsZi5jb25uZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmNvbm5lY3RpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmIChzZWxmLm9wdGlvbnNbJ3RyeSBtdWx0aXBsZSB0cmFuc3BvcnRzJ10pIHtcbiAgICAgICAgICAgICAgICAgIHZhciByZW1haW5pbmcgPSBzZWxmLnRyYW5zcG9ydHM7XG5cbiAgICAgICAgICAgICAgICAgIHdoaWxlIChyZW1haW5pbmcubGVuZ3RoID4gMCAmJiByZW1haW5pbmcuc3BsaWNlKDAsMSlbMF0gIT1cbiAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnRyYW5zcG9ydC5uYW1lKSB7fVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZW1haW5pbmcubGVuZ3RoKXtcbiAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0KHJlbWFpbmluZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2VsZi5wdWJsaXNoKCdjb25uZWN0X2ZhaWxlZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCBzZWxmLm9wdGlvbnNbJ2Nvbm5lY3QgdGltZW91dCddKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25uZWN0KHNlbGYudHJhbnNwb3J0cyk7XG5cbiAgICAgIHNlbGYub25jZSgnY29ubmVjdCcsIGZ1bmN0aW9uICgpe1xuICAgICAgICBjbGVhclRpbWVvdXQoc2VsZi5jb25uZWN0VGltZW91dFRpbWVyKTtcblxuICAgICAgICBmbiAmJiB0eXBlb2YgZm4gPT0gJ2Z1bmN0aW9uJyAmJiBmbigpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXJzIGFuZCBzZXRzIGEgbmV3IGhlYXJ0YmVhdCB0aW1lb3V0IHVzaW5nIHRoZSB2YWx1ZSBnaXZlbiBieSB0aGVcbiAgICogc2VydmVyIGR1cmluZyB0aGUgaGFuZHNoYWtlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5zZXRIZWFydGJlYXRUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lcik7XG4gICAgaWYodGhpcy50cmFuc3BvcnQgJiYgIXRoaXMudHJhbnNwb3J0LmhlYXJ0YmVhdHMoKSkgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLnRyYW5zcG9ydC5vbkNsb3NlKCk7XG4gICAgfSwgdGhpcy5oZWFydGJlYXRUaW1lb3V0KTtcbiAgfTtcblxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZGF0YSBwYWNrZXQuXG4gICAqIEByZXR1cm5zIHtpby5Tb2NrZXR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBpZiAodGhpcy5jb25uZWN0ZWQgJiYgIXRoaXMuZG9CdWZmZXIpIHtcbiAgICAgIHRoaXMudHJhbnNwb3J0LnBhY2tldChkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5idWZmZXIucHVzaChkYXRhKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogU2V0cyBidWZmZXIgc3RhdGVcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuc2V0QnVmZmVyID0gZnVuY3Rpb24gKHYpIHtcbiAgICB0aGlzLmRvQnVmZmVyID0gdjtcblxuICAgIGlmICghdiAmJiB0aGlzLmNvbm5lY3RlZCAmJiB0aGlzLmJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIGlmICghdGhpcy5vcHRpb25zWydtYW51YWxGbHVzaCddKSB7XG4gICAgICAgIHRoaXMuZmx1c2hCdWZmZXIoKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZsdXNoZXMgdGhlIGJ1ZmZlciBkYXRhIG92ZXIgdGhlIHdpcmUuXG4gICAqIFRvIGJlIGludm9rZWQgbWFudWFsbHkgd2hlbiAnbWFudWFsRmx1c2gnIGlzIHNldCB0byB0cnVlLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLmZsdXNoQnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50cmFuc3BvcnQucGF5bG9hZCh0aGlzLmJ1ZmZlcik7XG4gICAgdGhpcy5idWZmZXIgPSBbXTtcbiAgfTtcbiAgXG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3QgdGhlIGVzdGFibGlzaGVkIGNvbm5lY3QuXG4gICAqXG4gICAqIEByZXR1cm5zIHtpby5Tb2NrZXR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5jb25uZWN0ZWQgfHwgdGhpcy5jb25uZWN0aW5nKSB7XG4gICAgICBpZiAodGhpcy5vcGVuKSB7XG4gICAgICAgIHRoaXMub2YoJycpLnBhY2tldCh7IHR5cGU6ICdkaXNjb25uZWN0JyB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gaGFuZGxlIGRpc2Nvbm5lY3Rpb24gaW1tZWRpYXRlbHlcbiAgICAgIHRoaXMub25EaXNjb25uZWN0KCdib290ZWQnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIHNvY2tldCB3aXRoIGEgc3luYyBYSFIuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3RTeW5jID0gZnVuY3Rpb24gKCkge1xuICAgIC8vIGVuc3VyZSBkaXNjb25uZWN0aW9uXG4gICAgdmFyIHhociA9IGlvLnV0aWwucmVxdWVzdCgpO1xuICAgIHZhciB1cmkgPSBbXG4gICAgICAgICdodHRwJyArICh0aGlzLm9wdGlvbnMuc2VjdXJlID8gJ3MnIDogJycpICsgJzovJ1xuICAgICAgLCB0aGlzLm9wdGlvbnMuaG9zdCArICc6JyArIHRoaXMub3B0aW9ucy5wb3J0XG4gICAgICAsIHRoaXMub3B0aW9ucy5yZXNvdXJjZVxuICAgICAgLCBpby5wcm90b2NvbFxuICAgICAgLCAnJ1xuICAgICAgLCB0aGlzLnNlc3Npb25pZFxuICAgIF0uam9pbignLycpICsgJy8/ZGlzY29ubmVjdD0xJztcblxuICAgIHhoci5vcGVuKCdHRVQnLCB1cmksIGZhbHNlKTtcbiAgICB4aHIuc2VuZChudWxsKTtcblxuICAgIC8vIGhhbmRsZSBkaXNjb25uZWN0aW9uIGltbWVkaWF0ZWx5XG4gICAgdGhpcy5vbkRpc2Nvbm5lY3QoJ2Jvb3RlZCcpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB3ZSBuZWVkIHRvIHVzZSBjcm9zcyBkb21haW4gZW5hYmxlZCB0cmFuc3BvcnRzLiBDcm9zcyBkb21haW4gd291bGRcbiAgICogYmUgYSBkaWZmZXJlbnQgcG9ydCBvciBkaWZmZXJlbnQgZG9tYWluIG5hbWUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5pc1hEb21haW4gPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgcG9ydCA9IGdsb2JhbC5sb2NhdGlvbi5wb3J0IHx8XG4gICAgICAoJ2h0dHBzOicgPT0gZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sID8gNDQzIDogODApO1xuXG4gICAgcmV0dXJuIHRoaXMub3B0aW9ucy5ob3N0ICE9PSBnbG9iYWwubG9jYXRpb24uaG9zdG5hbWUgXG4gICAgICB8fCB0aGlzLm9wdGlvbnMucG9ydCAhPSBwb3J0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgdXBvbiBoYW5kc2hha2UuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9uQ29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuY29ubmVjdGVkKSB7XG4gICAgICB0aGlzLmNvbm5lY3RlZCA9IHRydWU7XG4gICAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICAgIGlmICghdGhpcy5kb0J1ZmZlcikge1xuICAgICAgICAvLyBtYWtlIHN1cmUgdG8gZmx1c2ggdGhlIGJ1ZmZlclxuICAgICAgICB0aGlzLnNldEJ1ZmZlcihmYWxzZSk7XG4gICAgICB9XG4gICAgICB0aGlzLmVtaXQoJ2Nvbm5lY3QnKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB0cmFuc3BvcnQgb3BlbnNcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3BlbiA9IHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB0cmFuc3BvcnQgY2xvc2VzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lcik7XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSB0cmFuc3BvcnQgZmlyc3Qgb3BlbnMgYSBjb25uZWN0aW9uXG4gICAqXG4gICAqIEBwYXJhbSB0ZXh0XG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgdGhpcy5vZihwYWNrZXQuZW5kcG9pbnQpLm9uUGFja2V0KHBhY2tldCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYW4gZXJyb3IuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG4gICAgaWYgKGVyciAmJiBlcnIuYWR2aWNlKSB7XG4gICAgICBpZiAoZXJyLmFkdmljZSA9PT0gJ3JlY29ubmVjdCcgJiYgKHRoaXMuY29ubmVjdGVkIHx8IHRoaXMuY29ubmVjdGluZykpIHtcbiAgICAgICAgdGhpcy5kaXNjb25uZWN0KCk7XG4gICAgICAgIGlmICh0aGlzLm9wdGlvbnMucmVjb25uZWN0KSB7XG4gICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMucHVibGlzaCgnZXJyb3InLCBlcnIgJiYgZXJyLnJlYXNvbiA/IGVyci5yZWFzb24gOiBlcnIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdHJhbnNwb3J0IGRpc2Nvbm5lY3RzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5vbkRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAocmVhc29uKSB7XG4gICAgdmFyIHdhc0Nvbm5lY3RlZCA9IHRoaXMuY29ubmVjdGVkXG4gICAgICAsIHdhc0Nvbm5lY3RpbmcgPSB0aGlzLmNvbm5lY3Rpbmc7XG5cbiAgICB0aGlzLmNvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuY29ubmVjdGluZyA9IGZhbHNlO1xuICAgIHRoaXMub3BlbiA9IGZhbHNlO1xuXG4gICAgaWYgKHdhc0Nvbm5lY3RlZCB8fCB3YXNDb25uZWN0aW5nKSB7XG4gICAgICB0aGlzLnRyYW5zcG9ydC5jbG9zZSgpO1xuICAgICAgdGhpcy50cmFuc3BvcnQuY2xlYXJUaW1lb3V0cygpO1xuICAgICAgaWYgKHdhc0Nvbm5lY3RlZCkge1xuICAgICAgICB0aGlzLnB1Ymxpc2goJ2Rpc2Nvbm5lY3QnLCByZWFzb24pO1xuXG4gICAgICAgIGlmICgnYm9vdGVkJyAhPSByZWFzb24gJiYgdGhpcy5vcHRpb25zLnJlY29ubmVjdCAmJiAhdGhpcy5yZWNvbm5lY3RpbmcpIHtcbiAgICAgICAgICB0aGlzLnJlY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgdXBvbiByZWNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLnJlY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnJlY29ubmVjdGluZyA9IHRydWU7XG4gICAgdGhpcy5yZWNvbm5lY3Rpb25BdHRlbXB0cyA9IDA7XG4gICAgdGhpcy5yZWNvbm5lY3Rpb25EZWxheSA9IHRoaXMub3B0aW9uc1sncmVjb25uZWN0aW9uIGRlbGF5J107XG5cbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgbWF4QXR0ZW1wdHMgPSB0aGlzLm9wdGlvbnNbJ21heCByZWNvbm5lY3Rpb24gYXR0ZW1wdHMnXVxuICAgICAgLCB0cnlNdWx0aXBsZSA9IHRoaXMub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXVxuICAgICAgLCBsaW1pdCA9IHRoaXMub3B0aW9uc1sncmVjb25uZWN0aW9uIGxpbWl0J107XG5cbiAgICBmdW5jdGlvbiByZXNldCAoKSB7XG4gICAgICBpZiAoc2VsZi5jb25uZWN0ZWQpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBzZWxmLm5hbWVzcGFjZXMpIHtcbiAgICAgICAgICBpZiAoc2VsZi5uYW1lc3BhY2VzLmhhc093blByb3BlcnR5KGkpICYmICcnICE9PSBpKSB7XG4gICAgICAgICAgICAgIHNlbGYubmFtZXNwYWNlc1tpXS5wYWNrZXQoeyB0eXBlOiAnY29ubmVjdCcgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNlbGYucHVibGlzaCgncmVjb25uZWN0Jywgc2VsZi50cmFuc3BvcnQubmFtZSwgc2VsZi5yZWNvbm5lY3Rpb25BdHRlbXB0cyk7XG4gICAgICB9XG5cbiAgICAgIGNsZWFyVGltZW91dChzZWxmLnJlY29ubmVjdGlvblRpbWVyKTtcblxuICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcignY29ubmVjdF9mYWlsZWQnLCBtYXliZVJlY29ubmVjdCk7XG4gICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKCdjb25uZWN0JywgbWF5YmVSZWNvbm5lY3QpO1xuXG4gICAgICBzZWxmLnJlY29ubmVjdGluZyA9IGZhbHNlO1xuXG4gICAgICBkZWxldGUgc2VsZi5yZWNvbm5lY3Rpb25BdHRlbXB0cztcbiAgICAgIGRlbGV0ZSBzZWxmLnJlY29ubmVjdGlvbkRlbGF5O1xuICAgICAgZGVsZXRlIHNlbGYucmVjb25uZWN0aW9uVGltZXI7XG4gICAgICBkZWxldGUgc2VsZi5yZWRvVHJhbnNwb3J0cztcblxuICAgICAgc2VsZi5vcHRpb25zWyd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyddID0gdHJ5TXVsdGlwbGU7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1heWJlUmVjb25uZWN0ICgpIHtcbiAgICAgIGlmICghc2VsZi5yZWNvbm5lY3RpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZi5jb25uZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlc2V0KCk7XG4gICAgICB9O1xuXG4gICAgICBpZiAoc2VsZi5jb25uZWN0aW5nICYmIHNlbGYucmVjb25uZWN0aW5nKSB7XG4gICAgICAgIHJldHVybiBzZWxmLnJlY29ubmVjdGlvblRpbWVyID0gc2V0VGltZW91dChtYXliZVJlY29ubmVjdCwgMTAwMCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzZWxmLnJlY29ubmVjdGlvbkF0dGVtcHRzKysgPj0gbWF4QXR0ZW1wdHMpIHtcbiAgICAgICAgaWYgKCFzZWxmLnJlZG9UcmFuc3BvcnRzKSB7XG4gICAgICAgICAgc2VsZi5vbignY29ubmVjdF9mYWlsZWQnLCBtYXliZVJlY29ubmVjdCk7XG4gICAgICAgICAgc2VsZi5vcHRpb25zWyd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyddID0gdHJ1ZTtcbiAgICAgICAgICBzZWxmLnRyYW5zcG9ydHMgPSBzZWxmLm9yaWdUcmFuc3BvcnRzO1xuICAgICAgICAgIHNlbGYudHJhbnNwb3J0ID0gc2VsZi5nZXRUcmFuc3BvcnQoKTtcbiAgICAgICAgICBzZWxmLnJlZG9UcmFuc3BvcnRzID0gdHJ1ZTtcbiAgICAgICAgICBzZWxmLmNvbm5lY3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLnB1Ymxpc2goJ3JlY29ubmVjdF9mYWlsZWQnKTtcbiAgICAgICAgICByZXNldCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2VsZi5yZWNvbm5lY3Rpb25EZWxheSA8IGxpbWl0KSB7XG4gICAgICAgICAgc2VsZi5yZWNvbm5lY3Rpb25EZWxheSAqPSAyOyAvLyBleHBvbmVudGlhbCBiYWNrIG9mZlxuICAgICAgICB9XG5cbiAgICAgICAgc2VsZi5jb25uZWN0KCk7XG4gICAgICAgIHNlbGYucHVibGlzaCgncmVjb25uZWN0aW5nJywgc2VsZi5yZWNvbm5lY3Rpb25EZWxheSwgc2VsZi5yZWNvbm5lY3Rpb25BdHRlbXB0cyk7XG4gICAgICAgIHNlbGYucmVjb25uZWN0aW9uVGltZXIgPSBzZXRUaW1lb3V0KG1heWJlUmVjb25uZWN0LCBzZWxmLnJlY29ubmVjdGlvbkRlbGF5KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5vcHRpb25zWyd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyddID0gZmFsc2U7XG4gICAgdGhpcy5yZWNvbm5lY3Rpb25UaW1lciA9IHNldFRpbWVvdXQobWF5YmVSZWNvbm5lY3QsIHRoaXMucmVjb25uZWN0aW9uRGVsYXkpO1xuXG4gICAgdGhpcy5vbignY29ubmVjdCcsIG1heWJlUmVjb25uZWN0KTtcbiAgfTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4gICwgdGhpc1xuKTtcbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy5Tb2NrZXROYW1lc3BhY2UgPSBTb2NrZXROYW1lc3BhY2U7XG5cbiAgLyoqXG4gICAqIFNvY2tldCBuYW1lc3BhY2UgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBTb2NrZXROYW1lc3BhY2UgKHNvY2tldCwgbmFtZSkge1xuICAgIHRoaXMuc29ja2V0ID0gc29ja2V0O1xuICAgIHRoaXMubmFtZSA9IG5hbWUgfHwgJyc7XG4gICAgdGhpcy5mbGFncyA9IHt9O1xuICAgIHRoaXMuanNvbiA9IG5ldyBGbGFnKHRoaXMsICdqc29uJyk7XG4gICAgdGhpcy5hY2tQYWNrZXRzID0gMDtcbiAgICB0aGlzLmFja3MgPSB7fTtcbiAgfTtcblxuICAvKipcbiAgICogQXBwbHkgRXZlbnRFbWl0dGVyIG1peGluLlxuICAgKi9cblxuICBpby51dGlsLm1peGluKFNvY2tldE5hbWVzcGFjZSwgaW8uRXZlbnRFbWl0dGVyKTtcblxuICAvKipcbiAgICogQ29waWVzIGVtaXQgc2luY2Ugd2Ugb3ZlcnJpZGUgaXRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUuJGVtaXQgPSBpby5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQ7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgbmFtZXNwYWNlLCBieSBwcm94eWluZyB0aGUgcmVxdWVzdCB0byB0aGUgc29ja2V0LiBUaGlzXG4gICAqIGFsbG93cyB1cyB0byB1c2UgdGhlIHN5bmF4IGFzIHdlIGRvIG9uIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUub2YgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0Lm9mLmFwcGx5KHRoaXMuc29ja2V0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kcyBhIHBhY2tldC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUucGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgIHBhY2tldC5lbmRwb2ludCA9IHRoaXMubmFtZTtcbiAgICB0aGlzLnNvY2tldC5wYWNrZXQocGFja2V0KTtcbiAgICB0aGlzLmZsYWdzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZVxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSwgZm4pIHtcbiAgICB2YXIgcGFja2V0ID0ge1xuICAgICAgICB0eXBlOiB0aGlzLmZsYWdzLmpzb24gPyAnanNvbicgOiAnbWVzc2FnZSdcbiAgICAgICwgZGF0YTogZGF0YVxuICAgIH07XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZm4pIHtcbiAgICAgIHBhY2tldC5pZCA9ICsrdGhpcy5hY2tQYWNrZXRzO1xuICAgICAgcGFja2V0LmFjayA9IHRydWU7XG4gICAgICB0aGlzLmFja3NbcGFja2V0LmlkXSA9IGZuO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnBhY2tldChwYWNrZXQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0cyBhbiBldmVudFxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cbiAgXG4gIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXG4gICAgICAsIGxhc3RBcmcgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cbiAgICAgICwgcGFja2V0ID0ge1xuICAgICAgICAgICAgdHlwZTogJ2V2ZW50J1xuICAgICAgICAgICwgbmFtZTogbmFtZVxuICAgICAgICB9O1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGxhc3RBcmcpIHtcbiAgICAgIHBhY2tldC5pZCA9ICsrdGhpcy5hY2tQYWNrZXRzO1xuICAgICAgcGFja2V0LmFjayA9ICdkYXRhJztcbiAgICAgIHRoaXMuYWNrc1twYWNrZXQuaWRdID0gbGFzdEFyZztcbiAgICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDAsIGFyZ3MubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgcGFja2V0LmFyZ3MgPSBhcmdzO1xuXG4gICAgcmV0dXJuIHRoaXMucGFja2V0KHBhY2tldCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBuYW1lc3BhY2VcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUuZGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5uYW1lID09PSAnJykge1xuICAgICAgdGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhY2tldCh7IHR5cGU6ICdkaXNjb25uZWN0JyB9KTtcbiAgICAgIHRoaXMuJGVtaXQoJ2Rpc2Nvbm5lY3QnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlcyBhIHBhY2tldFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS5vblBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBhY2sgKCkge1xuICAgICAgc2VsZi5wYWNrZXQoe1xuICAgICAgICAgIHR5cGU6ICdhY2snXG4gICAgICAgICwgYXJnczogaW8udXRpbC50b0FycmF5KGFyZ3VtZW50cylcbiAgICAgICAgLCBhY2tJZDogcGFja2V0LmlkXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgc3dpdGNoIChwYWNrZXQudHlwZSkge1xuICAgICAgY2FzZSAnY29ubmVjdCc6XG4gICAgICAgIHRoaXMuJGVtaXQoJ2Nvbm5lY3QnKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Rpc2Nvbm5lY3QnOlxuICAgICAgICBpZiAodGhpcy5uYW1lID09PSAnJykge1xuICAgICAgICAgIHRoaXMuc29ja2V0Lm9uRGlzY29ubmVjdChwYWNrZXQucmVhc29uIHx8ICdib290ZWQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLiRlbWl0KCdkaXNjb25uZWN0JywgcGFja2V0LnJlYXNvbik7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIHZhciBwYXJhbXMgPSBbJ21lc3NhZ2UnLCBwYWNrZXQuZGF0YV07XG5cbiAgICAgICAgaWYgKHBhY2tldC5hY2sgPT0gJ2RhdGEnKSB7XG4gICAgICAgICAgcGFyYW1zLnB1c2goYWNrKTtcbiAgICAgICAgfSBlbHNlIGlmIChwYWNrZXQuYWNrKSB7XG4gICAgICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiAnYWNrJywgYWNrSWQ6IHBhY2tldC5pZCB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuJGVtaXQuYXBwbHkodGhpcywgcGFyYW1zKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2V2ZW50JzpcbiAgICAgICAgdmFyIHBhcmFtcyA9IFtwYWNrZXQubmFtZV0uY29uY2F0KHBhY2tldC5hcmdzKTtcblxuICAgICAgICBpZiAocGFja2V0LmFjayA9PSAnZGF0YScpXG4gICAgICAgICAgcGFyYW1zLnB1c2goYWNrKTtcblxuICAgICAgICB0aGlzLiRlbWl0LmFwcGx5KHRoaXMsIHBhcmFtcyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdhY2snOlxuICAgICAgICBpZiAodGhpcy5hY2tzW3BhY2tldC5hY2tJZF0pIHtcbiAgICAgICAgICB0aGlzLmFja3NbcGFja2V0LmFja0lkXS5hcHBseSh0aGlzLCBwYWNrZXQuYXJncyk7XG4gICAgICAgICAgZGVsZXRlIHRoaXMuYWNrc1twYWNrZXQuYWNrSWRdO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIGlmIChwYWNrZXQuYWR2aWNlKXtcbiAgICAgICAgICB0aGlzLnNvY2tldC5vbkVycm9yKHBhY2tldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHBhY2tldC5yZWFzb24gPT0gJ3VuYXV0aG9yaXplZCcpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Nvbm5lY3RfZmFpbGVkJywgcGFja2V0LnJlYXNvbik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Vycm9yJywgcGFja2V0LnJlYXNvbik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRmxhZyBpbnRlcmZhY2UuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBmdW5jdGlvbiBGbGFnIChuc3AsIG5hbWUpIHtcbiAgICB0aGlzLm5hbWVzcGFjZSA9IG5zcDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kIGEgbWVzc2FnZVxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFnLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMubmFtZXNwYWNlLmZsYWdzW3RoaXMubmFtZV0gPSB0cnVlO1xuICAgIHRoaXMubmFtZXNwYWNlLnNlbmQuYXBwbHkodGhpcy5uYW1lc3BhY2UsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXQgYW4gZXZlbnRcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhZy5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm5hbWVzcGFjZS5mbGFnc1t0aGlzLm5hbWVdID0gdHJ1ZTtcbiAgICB0aGlzLm5hbWVzcGFjZS5lbWl0LmFwcGx5KHRoaXMubmFtZXNwYWNlLCBhcmd1bWVudHMpO1xuICB9O1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbik7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvLCBnbG9iYWwpIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzLndlYnNvY2tldCA9IFdTO1xuXG4gIC8qKlxuICAgKiBUaGUgV2ViU29ja2V0IHRyYW5zcG9ydCB1c2VzIHRoZSBIVE1MNSBXZWJTb2NrZXQgQVBJIHRvIGVzdGFibGlzaCBhblxuICAgKiBwZXJzaXN0ZW50IGNvbm5lY3Rpb24gd2l0aCB0aGUgU29ja2V0LklPIHNlcnZlci4gVGhpcyB0cmFuc3BvcnQgd2lsbCBhbHNvXG4gICAqIGJlIGluaGVyaXRlZCBieSB0aGUgRmxhc2hTb2NrZXQgZmFsbGJhY2sgYXMgaXQgcHJvdmlkZXMgYSBBUEkgY29tcGF0aWJsZVxuICAgKiBwb2x5ZmlsbCBmb3IgdGhlIFdlYlNvY2tldHMuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAZXh0ZW5kcyB7aW8uVHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBXUyAoc29ja2V0KSB7XG4gICAgaW8uVHJhbnNwb3J0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICAgKi9cblxuICBpby51dGlsLmluaGVyaXQoV1MsIGlvLlRyYW5zcG9ydCk7XG5cbiAgLyoqXG4gICAqIFRyYW5zcG9ydCBuYW1lXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFdTLnByb3RvdHlwZS5uYW1lID0gJ3dlYnNvY2tldCc7XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemVzIGEgbmV3IGBXZWJTb2NrZXRgIGNvbm5lY3Rpb24gd2l0aCB0aGUgU29ja2V0LklPIHNlcnZlci4gV2UgYXR0YWNoXG4gICAqIGFsbCB0aGUgYXBwcm9wcmlhdGUgbGlzdGVuZXJzIHRvIGhhbmRsZSB0aGUgcmVzcG9uc2VzIGZyb20gdGhlIHNlcnZlci5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgV1MucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHF1ZXJ5ID0gaW8udXRpbC5xdWVyeSh0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5KVxuICAgICAgLCBzZWxmID0gdGhpc1xuICAgICAgLCBTb2NrZXRcblxuXG4gICAgaWYgKCFTb2NrZXQpIHtcbiAgICAgIFNvY2tldCA9IGdsb2JhbC5Nb3pXZWJTb2NrZXQgfHwgZ2xvYmFsLldlYlNvY2tldDtcbiAgICB9XG5cbiAgICB0aGlzLndlYnNvY2tldCA9IG5ldyBTb2NrZXQodGhpcy5wcmVwYXJlVXJsKCkgKyBxdWVyeSk7XG5cbiAgICB0aGlzLndlYnNvY2tldC5vbm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9uT3BlbigpO1xuICAgICAgc2VsZi5zb2NrZXQuc2V0QnVmZmVyKGZhbHNlKTtcbiAgICB9O1xuICAgIHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZSA9IGZ1bmN0aW9uIChldikge1xuICAgICAgc2VsZi5vbkRhdGEoZXYuZGF0YSk7XG4gICAgfTtcbiAgICB0aGlzLndlYnNvY2tldC5vbmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgICBzZWxmLnNvY2tldC5zZXRCdWZmZXIodHJ1ZSk7XG4gICAgfTtcbiAgICB0aGlzLndlYnNvY2tldC5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIHNlbGYub25FcnJvcihlKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmQgYSBtZXNzYWdlIHRvIHRoZSBTb2NrZXQuSU8gc2VydmVyLiBUaGUgbWVzc2FnZSB3aWxsIGF1dG9tYXRpY2FsbHkgYmVcbiAgICogZW5jb2RlZCBpbiB0aGUgY29ycmVjdCBtZXNzYWdlIGZvcm1hdC5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgLy8gRG8gdG8gYSBidWcgaW4gdGhlIGN1cnJlbnQgSURldmljZXMgYnJvd3Nlciwgd2UgbmVlZCB0byB3cmFwIHRoZSBzZW5kIGluIGEgXG4gIC8vIHNldFRpbWVvdXQsIHdoZW4gdGhleSByZXN1bWUgZnJvbSBzbGVlcGluZyB0aGUgYnJvd3NlciB3aWxsIGNyYXNoIGlmIFxuICAvLyB3ZSBkb24ndCBhbGxvdyB0aGUgYnJvd3NlciB0aW1lIHRvIGRldGVjdCB0aGUgc29ja2V0IGhhcyBiZWVuIGNsb3NlZFxuICBpZiAoaW8udXRpbC51YS5pRGV2aWNlKSB7XG4gICAgV1MucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgIHNlbGYud2Vic29ja2V0LnNlbmQoZGF0YSk7XG4gICAgICB9LDApO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICBXUy5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICB0aGlzLndlYnNvY2tldC5zZW5kKGRhdGEpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQYXlsb2FkXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBXUy5wcm90b3R5cGUucGF5bG9hZCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IGFyci5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHRoaXMucGFja2V0KGFycltpXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0IHRoZSBlc3RhYmxpc2hlZCBgV2ViU29ja2V0YCBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBXUy5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy53ZWJzb2NrZXQuY2xvc2UoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogSGFuZGxlIHRoZSBlcnJvcnMgdGhhdCBgV2ViU29ja2V0YCBtaWdodCBiZSBnaXZpbmcgd2hlbiB3ZVxuICAgKiBhcmUgYXR0ZW1wdGluZyB0byBjb25uZWN0IG9yIHNlbmQgbWVzc2FnZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7RXJyb3J9IGUgVGhlIGVycm9yLlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgV1MucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbiAoZSkge1xuICAgIHRoaXMuc29ja2V0Lm9uRXJyb3IoZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGFwcHJvcHJpYXRlIHNjaGVtZSBmb3IgdGhlIFVSSSBnZW5lcmF0aW9uLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIFdTLnByb3RvdHlwZS5zY2hlbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0Lm9wdGlvbnMuc2VjdXJlID8gJ3dzcycgOiAnd3MnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGJyb3dzZXIgaGFzIHN1cHBvcnQgZm9yIG5hdGl2ZSBgV2ViU29ja2V0c2AgYW5kIHRoYXRcbiAgICogaXQncyBub3QgdGhlIHBvbHlmaWxsIGNyZWF0ZWQgZm9yIHRoZSBGbGFzaFNvY2tldCB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFdTLmNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAoJ1dlYlNvY2tldCcgaW4gZ2xvYmFsICYmICEoJ19fYWRkVGFzaycgaW4gV2ViU29ja2V0KSlcbiAgICAgICAgICB8fCAnTW96V2ViU29ja2V0JyBpbiBnbG9iYWw7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBgV2ViU29ja2V0YCB0cmFuc3BvcnQgc3VwcG9ydCBjcm9zcyBkb21haW4gY29tbXVuaWNhdGlvbnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBXUy54ZG9tYWluQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgdHJhbnNwb3J0IHRvIHlvdXIgcHVibGljIGlvLnRyYW5zcG9ydHMgYXJyYXkuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBpby50cmFuc3BvcnRzLnB1c2goJ3dlYnNvY2tldCcpO1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpby5UcmFuc3BvcnQgOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4gICwgdGhpc1xuKTtcblxuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8pIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzLmZsYXNoc29ja2V0ID0gRmxhc2hzb2NrZXQ7XG5cbiAgLyoqXG4gICAqIFRoZSBGbGFzaFNvY2tldCB0cmFuc3BvcnQuIFRoaXMgaXMgYSBBUEkgd3JhcHBlciBmb3IgdGhlIEhUTUw1IFdlYlNvY2tldFxuICAgKiBzcGVjaWZpY2F0aW9uLiBJdCB1c2VzIGEgLnN3ZiBmaWxlIHRvIGNvbW11bmljYXRlIHdpdGggdGhlIHNlcnZlci4gSWYgeW91IHdhbnRcbiAgICogdG8gc2VydmUgdGhlIC5zd2YgZmlsZSBmcm9tIGEgb3RoZXIgc2VydmVyIHRoYW4gd2hlcmUgdGhlIFNvY2tldC5JTyBzY3JpcHQgaXNcbiAgICogY29taW5nIGZyb20geW91IG5lZWQgdG8gdXNlIHRoZSBpbnNlY3VyZSB2ZXJzaW9uIG9mIHRoZSAuc3dmLiBNb3JlIGluZm9ybWF0aW9uXG4gICAqIGFib3V0IHRoaXMgY2FuIGJlIGZvdW5kIG9uIHRoZSBnaXRodWIgcGFnZS5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBleHRlbmRzIHtpby5UcmFuc3BvcnQud2Vic29ja2V0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBGbGFzaHNvY2tldCAoKSB7XG4gICAgaW8uVHJhbnNwb3J0LndlYnNvY2tldC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAgICovXG5cbiAgaW8udXRpbC5pbmhlcml0KEZsYXNoc29ja2V0LCBpby5UcmFuc3BvcnQud2Vic29ja2V0KTtcblxuICAvKipcbiAgICogVHJhbnNwb3J0IG5hbWVcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQucHJvdG90eXBlLm5hbWUgPSAnZmxhc2hzb2NrZXQnO1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0IHRoZSBlc3RhYmxpc2hlZCBgRmxhc2hTb2NrZXRgIGNvbm5lY3Rpb24uIFRoaXMgaXMgZG9uZSBieSBhZGRpbmcgYSBcbiAgICogbmV3IHRhc2sgdG8gdGhlIEZsYXNoU29ja2V0LiBUaGUgcmVzdCB3aWxsIGJlIGhhbmRsZWQgb2ZmIGJ5IHRoZSBgV2ViU29ja2V0YCBcbiAgICogdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFzaHNvY2tldC5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIFdlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24gKCkge1xuICAgICAgaW8uVHJhbnNwb3J0LndlYnNvY2tldC5wcm90b3R5cGUub3Blbi5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2UgdG8gdGhlIFNvY2tldC5JTyBzZXJ2ZXIuIFRoaXMgaXMgZG9uZSBieSBhZGRpbmcgYSBuZXdcbiAgICogdGFzayB0byB0aGUgRmxhc2hTb2NrZXQuIFRoZSByZXN0IHdpbGwgYmUgaGFuZGxlZCBvZmYgYnkgdGhlIGBXZWJTb2NrZXRgIFxuICAgKiB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYXNoc29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICBXZWJTb2NrZXQuX19hZGRUYXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlvLlRyYW5zcG9ydC53ZWJzb2NrZXQucHJvdG90eXBlLnNlbmQuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBlc3RhYmxpc2hlZCBgRmxhc2hTb2NrZXRgIGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYXNoc29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBXZWJTb2NrZXQuX190YXNrcy5sZW5ndGggPSAwO1xuICAgIGlvLlRyYW5zcG9ydC53ZWJzb2NrZXQucHJvdG90eXBlLmNsb3NlLmNhbGwodGhpcyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBXZWJTb2NrZXQgZmFsbCBiYWNrIG5lZWRzIHRvIGFwcGVuZCB0aGUgZmxhc2ggY29udGFpbmVyIHRvIHRoZSBib2R5XG4gICAqIGVsZW1lbnQsIHNvIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGhhdmUgYWNjZXNzIHRvIGl0LiBPciBkZWZlciB0aGUgY2FsbFxuICAgKiB1bnRpbCB3ZSBhcmUgc3VyZSB0aGVyZSBpcyBhIGJvZHkgZWxlbWVudC5cbiAgICpcbiAgICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldCBUaGUgc29ja2V0IGluc3RhbmNlIHRoYXQgbmVlZHMgYSB0cmFuc3BvcnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBGbGFzaHNvY2tldC5wcm90b3R5cGUucmVhZHkgPSBmdW5jdGlvbiAoc29ja2V0LCBmbikge1xuICAgIGZ1bmN0aW9uIGluaXQgKCkge1xuICAgICAgdmFyIG9wdGlvbnMgPSBzb2NrZXQub3B0aW9uc1xuICAgICAgICAsIHBvcnQgPSBvcHRpb25zWydmbGFzaCBwb2xpY3kgcG9ydCddXG4gICAgICAgICwgcGF0aCA9IFtcbiAgICAgICAgICAgICAgJ2h0dHAnICsgKG9wdGlvbnMuc2VjdXJlID8gJ3MnIDogJycpICsgJzovJ1xuICAgICAgICAgICAgLCBvcHRpb25zLmhvc3QgKyAnOicgKyBvcHRpb25zLnBvcnRcbiAgICAgICAgICAgICwgb3B0aW9ucy5yZXNvdXJjZVxuICAgICAgICAgICAgLCAnc3RhdGljL2ZsYXNoc29ja2V0J1xuICAgICAgICAgICAgLCAnV2ViU29ja2V0TWFpbicgKyAoc29ja2V0LmlzWERvbWFpbigpID8gJ0luc2VjdXJlJyA6ICcnKSArICcuc3dmJ1xuICAgICAgICAgIF07XG5cbiAgICAgIC8vIE9ubHkgc3RhcnQgZG93bmxvYWRpbmcgdGhlIHN3ZiBmaWxlIHdoZW4gdGhlIGNoZWNrZWQgdGhhdCB0aGlzIGJyb3dzZXJcbiAgICAgIC8vIGFjdHVhbGx5IHN1cHBvcnRzIGl0XG4gICAgICBpZiAoIUZsYXNoc29ja2V0LmxvYWRlZCkge1xuICAgICAgICBpZiAodHlwZW9mIFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIFNldCB0aGUgY29ycmVjdCBmaWxlIGJhc2VkIG9uIHRoZSBYRG9tYWluIHNldHRpbmdzXG4gICAgICAgICAgV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04gPSBwYXRoLmpvaW4oJy8nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3J0ICE9PSA4NDMpIHtcbiAgICAgICAgICBXZWJTb2NrZXQubG9hZEZsYXNoUG9saWN5RmlsZSgneG1sc29ja2V0Oi8vJyArIG9wdGlvbnMuaG9zdCArICc6JyArIHBvcnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgV2ViU29ja2V0Ll9faW5pdGlhbGl6ZSgpO1xuICAgICAgICBGbGFzaHNvY2tldC5sb2FkZWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBmbi5jYWxsKHNlbGYpO1xuICAgIH1cblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAoZG9jdW1lbnQuYm9keSkgcmV0dXJuIGluaXQoKTtcblxuICAgIGlvLnV0aWwubG9hZChpbml0KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIEZsYXNoU29ja2V0IHRyYW5zcG9ydCBpcyBzdXBwb3J0ZWQgYXMgaXQgcmVxdWlyZXMgdGhhdCB0aGUgQWRvYmVcbiAgICogRmxhc2ggUGxheWVyIHBsdWctaW4gdmVyc2lvbiBgMTAuMC4wYCBvciBncmVhdGVyIGlzIGluc3RhbGxlZC4gQW5kIGFsc28gY2hlY2sgaWZcbiAgICogdGhlIHBvbHlmaWxsIGlzIGNvcnJlY3RseSBsb2FkZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFzaHNvY2tldC5jaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoXG4gICAgICAgIHR5cGVvZiBXZWJTb2NrZXQgPT0gJ3VuZGVmaW5lZCdcbiAgICAgIHx8ICEoJ19faW5pdGlhbGl6ZScgaW4gV2ViU29ja2V0KSB8fCAhc3dmb2JqZWN0XG4gICAgKSByZXR1cm4gZmFsc2U7XG5cbiAgICByZXR1cm4gc3dmb2JqZWN0LmdldEZsYXNoUGxheWVyVmVyc2lvbigpLm1ham9yID49IDEwO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgRmxhc2hTb2NrZXQgdHJhbnNwb3J0IGNhbiBiZSB1c2VkIGFzIGNyb3NzIGRvbWFpbiAvIGNyb3NzIG9yaWdpbiBcbiAgICogdHJhbnNwb3J0LiBCZWNhdXNlIHdlIGNhbid0IHNlZSB3aGljaCB0eXBlIChzZWN1cmUgb3IgaW5zZWN1cmUpIG9mIC5zd2YgaXMgdXNlZFxuICAgKiB3ZSB3aWxsIGp1c3QgcmV0dXJuIHRydWUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFzaHNvY2tldC54ZG9tYWluQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2FibGUgQVVUT19JTklUSUFMSVpBVElPTlxuICAgKi9cblxuICBpZiAodHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJykge1xuICAgIFdFQl9TT0NLRVRfRElTQUJMRV9BVVRPX0lOSVRJQUxJWkFUSU9OID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgdGhlIHRyYW5zcG9ydCB0byB5b3VyIHB1YmxpYyBpby50cmFuc3BvcnRzIGFycmF5LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgaW8udHJhbnNwb3J0cy5wdXNoKCdmbGFzaHNvY2tldCcpO1xufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8uVHJhbnNwb3J0IDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuKTtcbi8qXHRTV0ZPYmplY3QgdjIuMiA8aHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL3N3Zm9iamVjdC8+IFxuXHRpcyByZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UgPGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwPiBcbiovXG5pZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIHdpbmRvdykge1xudmFyIHN3Zm9iamVjdD1mdW5jdGlvbigpe3ZhciBEPVwidW5kZWZpbmVkXCIscj1cIm9iamVjdFwiLFM9XCJTaG9ja3dhdmUgRmxhc2hcIixXPVwiU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2hcIixxPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIixSPVwiU1dGT2JqZWN0RXhwckluc3RcIix4PVwib25yZWFkeXN0YXRlY2hhbmdlXCIsTz13aW5kb3csaj1kb2N1bWVudCx0PW5hdmlnYXRvcixUPWZhbHNlLFU9W2hdLG89W10sTj1bXSxJPVtdLGwsUSxFLEIsSj1mYWxzZSxhPWZhbHNlLG4sRyxtPXRydWUsTT1mdW5jdGlvbigpe3ZhciBhYT10eXBlb2Ygai5nZXRFbGVtZW50QnlJZCE9RCYmdHlwZW9mIGouZ2V0RWxlbWVudHNCeVRhZ05hbWUhPUQmJnR5cGVvZiBqLmNyZWF0ZUVsZW1lbnQhPUQsYWg9dC51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSxZPXQucGxhdGZvcm0udG9Mb3dlckNhc2UoKSxhZT1ZPy93aW4vLnRlc3QoWSk6L3dpbi8udGVzdChhaCksYWM9WT8vbWFjLy50ZXN0KFkpOi9tYWMvLnRlc3QoYWgpLGFmPS93ZWJraXQvLnRlc3QoYWgpP3BhcnNlRmxvYXQoYWgucmVwbGFjZSgvXi4qd2Via2l0XFwvKFxcZCsoXFwuXFxkKyk/KS4qJC8sXCIkMVwiKSk6ZmFsc2UsWD0hK1wiXFx2MVwiLGFnPVswLDAsMF0sYWI9bnVsbDtpZih0eXBlb2YgdC5wbHVnaW5zIT1EJiZ0eXBlb2YgdC5wbHVnaW5zW1NdPT1yKXthYj10LnBsdWdpbnNbU10uZGVzY3JpcHRpb247aWYoYWImJiEodHlwZW9mIHQubWltZVR5cGVzIT1EJiZ0Lm1pbWVUeXBlc1txXSYmIXQubWltZVR5cGVzW3FdLmVuYWJsZWRQbHVnaW4pKXtUPXRydWU7WD1mYWxzZTthYj1hYi5yZXBsYWNlKC9eLipcXHMrKFxcUytcXHMrXFxTKyQpLyxcIiQxXCIpO2FnWzBdPXBhcnNlSW50KGFiLnJlcGxhY2UoL14oLiopXFwuLiokLyxcIiQxXCIpLDEwKTthZ1sxXT1wYXJzZUludChhYi5yZXBsYWNlKC9eLipcXC4oLiopXFxzLiokLyxcIiQxXCIpLDEwKTthZ1syXT0vW2EtekEtWl0vLnRlc3QoYWIpP3BhcnNlSW50KGFiLnJlcGxhY2UoL14uKlthLXpBLVpdKyguKikkLyxcIiQxXCIpLDEwKTowfX1lbHNle2lmKHR5cGVvZiBPWyhbJ0FjdGl2ZSddLmNvbmNhdCgnT2JqZWN0Jykuam9pbignWCcpKV0hPUQpe3RyeXt2YXIgYWQ9bmV3IHdpbmRvd1soWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKSldKFcpO2lmKGFkKXthYj1hZC5HZXRWYXJpYWJsZShcIiR2ZXJzaW9uXCIpO2lmKGFiKXtYPXRydWU7YWI9YWIuc3BsaXQoXCIgXCIpWzFdLnNwbGl0KFwiLFwiKTthZz1bcGFyc2VJbnQoYWJbMF0sMTApLHBhcnNlSW50KGFiWzFdLDEwKSxwYXJzZUludChhYlsyXSwxMCldfX19Y2F0Y2goWil7fX19cmV0dXJue3czOmFhLHB2OmFnLHdrOmFmLGllOlgsd2luOmFlLG1hYzphY319KCksaz1mdW5jdGlvbigpe2lmKCFNLnczKXtyZXR1cm59aWYoKHR5cGVvZiBqLnJlYWR5U3RhdGUhPUQmJmoucmVhZHlTdGF0ZT09XCJjb21wbGV0ZVwiKXx8KHR5cGVvZiBqLnJlYWR5U3RhdGU9PUQmJihqLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXXx8ai5ib2R5KSkpe2YoKX1pZighSil7aWYodHlwZW9mIGouYWRkRXZlbnRMaXN0ZW5lciE9RCl7ai5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLGYsZmFsc2UpfWlmKE0uaWUmJk0ud2luKXtqLmF0dGFjaEV2ZW50KHgsZnVuY3Rpb24oKXtpZihqLnJlYWR5U3RhdGU9PVwiY29tcGxldGVcIil7ai5kZXRhY2hFdmVudCh4LGFyZ3VtZW50cy5jYWxsZWUpO2YoKX19KTtpZihPPT10b3ApeyhmdW5jdGlvbigpe2lmKEope3JldHVybn10cnl7ai5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGwoXCJsZWZ0XCIpfWNhdGNoKFgpe3NldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwwKTtyZXR1cm59ZigpfSkoKX19aWYoTS53ayl7KGZ1bmN0aW9uKCl7aWYoSil7cmV0dXJufWlmKCEvbG9hZGVkfGNvbXBsZXRlLy50ZXN0KGoucmVhZHlTdGF0ZSkpe3NldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwwKTtyZXR1cm59ZigpfSkoKX1zKGYpfX0oKTtmdW5jdGlvbiBmKCl7aWYoSil7cmV0dXJufXRyeXt2YXIgWj1qLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXS5hcHBlbmRDaGlsZChDKFwic3BhblwiKSk7Wi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKFopfWNhdGNoKGFhKXtyZXR1cm59Sj10cnVlO3ZhciBYPVUubGVuZ3RoO2Zvcih2YXIgWT0wO1k8WDtZKyspe1VbWV0oKX19ZnVuY3Rpb24gSyhYKXtpZihKKXtYKCl9ZWxzZXtVW1UubGVuZ3RoXT1YfX1mdW5jdGlvbiBzKFkpe2lmKHR5cGVvZiBPLmFkZEV2ZW50TGlzdGVuZXIhPUQpe08uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixZLGZhbHNlKX1lbHNle2lmKHR5cGVvZiBqLmFkZEV2ZW50TGlzdGVuZXIhPUQpe2ouYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixZLGZhbHNlKX1lbHNle2lmKHR5cGVvZiBPLmF0dGFjaEV2ZW50IT1EKXtpKE8sXCJvbmxvYWRcIixZKX1lbHNle2lmKHR5cGVvZiBPLm9ubG9hZD09XCJmdW5jdGlvblwiKXt2YXIgWD1PLm9ubG9hZDtPLm9ubG9hZD1mdW5jdGlvbigpe1goKTtZKCl9fWVsc2V7Ty5vbmxvYWQ9WX19fX19ZnVuY3Rpb24gaCgpe2lmKFQpe1YoKX1lbHNle0goKX19ZnVuY3Rpb24gVigpe3ZhciBYPWouZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdO3ZhciBhYT1DKHIpO2FhLnNldEF0dHJpYnV0ZShcInR5cGVcIixxKTt2YXIgWj1YLmFwcGVuZENoaWxkKGFhKTtpZihaKXt2YXIgWT0wOyhmdW5jdGlvbigpe2lmKHR5cGVvZiBaLkdldFZhcmlhYmxlIT1EKXt2YXIgYWI9Wi5HZXRWYXJpYWJsZShcIiR2ZXJzaW9uXCIpO2lmKGFiKXthYj1hYi5zcGxpdChcIiBcIilbMV0uc3BsaXQoXCIsXCIpO00ucHY9W3BhcnNlSW50KGFiWzBdLDEwKSxwYXJzZUludChhYlsxXSwxMCkscGFyc2VJbnQoYWJbMl0sMTApXX19ZWxzZXtpZihZPDEwKXtZKys7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKTtyZXR1cm59fVgucmVtb3ZlQ2hpbGQoYWEpO1o9bnVsbDtIKCl9KSgpfWVsc2V7SCgpfX1mdW5jdGlvbiBIKCl7dmFyIGFnPW8ubGVuZ3RoO2lmKGFnPjApe2Zvcih2YXIgYWY9MDthZjxhZzthZisrKXt2YXIgWT1vW2FmXS5pZDt2YXIgYWI9b1thZl0uY2FsbGJhY2tGbjt2YXIgYWE9e3N1Y2Nlc3M6ZmFsc2UsaWQ6WX07aWYoTS5wdlswXT4wKXt2YXIgYWU9YyhZKTtpZihhZSl7aWYoRihvW2FmXS5zd2ZWZXJzaW9uKSYmIShNLndrJiZNLndrPDMxMikpe3coWSx0cnVlKTtpZihhYil7YWEuc3VjY2Vzcz10cnVlO2FhLnJlZj16KFkpO2FiKGFhKX19ZWxzZXtpZihvW2FmXS5leHByZXNzSW5zdGFsbCYmQSgpKXt2YXIgYWk9e307YWkuZGF0YT1vW2FmXS5leHByZXNzSW5zdGFsbDthaS53aWR0aD1hZS5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKXx8XCIwXCI7YWkuaGVpZ2h0PWFlLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKXx8XCIwXCI7aWYoYWUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikpe2FpLnN0eWxlY2xhc3M9YWUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIil9aWYoYWUuZ2V0QXR0cmlidXRlKFwiYWxpZ25cIikpe2FpLmFsaWduPWFlLmdldEF0dHJpYnV0ZShcImFsaWduXCIpfXZhciBhaD17fTt2YXIgWD1hZS5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBhcmFtXCIpO3ZhciBhYz1YLmxlbmd0aDtmb3IodmFyIGFkPTA7YWQ8YWM7YWQrKyl7aWYoWFthZF0uZ2V0QXR0cmlidXRlKFwibmFtZVwiKS50b0xvd2VyQ2FzZSgpIT1cIm1vdmllXCIpe2FoW1hbYWRdLmdldEF0dHJpYnV0ZShcIm5hbWVcIildPVhbYWRdLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpfX1QKGFpLGFoLFksYWIpfWVsc2V7cChhZSk7aWYoYWIpe2FiKGFhKX19fX19ZWxzZXt3KFksdHJ1ZSk7aWYoYWIpe3ZhciBaPXooWSk7aWYoWiYmdHlwZW9mIFouU2V0VmFyaWFibGUhPUQpe2FhLnN1Y2Nlc3M9dHJ1ZTthYS5yZWY9Wn1hYihhYSl9fX19fWZ1bmN0aW9uIHooYWEpe3ZhciBYPW51bGw7dmFyIFk9YyhhYSk7aWYoWSYmWS5ub2RlTmFtZT09XCJPQkpFQ1RcIil7aWYodHlwZW9mIFkuU2V0VmFyaWFibGUhPUQpe1g9WX1lbHNle3ZhciBaPVkuZ2V0RWxlbWVudHNCeVRhZ05hbWUocilbMF07aWYoWil7WD1afX19cmV0dXJuIFh9ZnVuY3Rpb24gQSgpe3JldHVybiAhYSYmRihcIjYuMC42NVwiKSYmKE0ud2lufHxNLm1hYykmJiEoTS53ayYmTS53azwzMTIpfWZ1bmN0aW9uIFAoYWEsYWIsWCxaKXthPXRydWU7RT1afHxudWxsO0I9e3N1Y2Nlc3M6ZmFsc2UsaWQ6WH07dmFyIGFlPWMoWCk7aWYoYWUpe2lmKGFlLm5vZGVOYW1lPT1cIk9CSkVDVFwiKXtsPWcoYWUpO1E9bnVsbH1lbHNle2w9YWU7UT1YfWFhLmlkPVI7aWYodHlwZW9mIGFhLndpZHRoPT1EfHwoIS8lJC8udGVzdChhYS53aWR0aCkmJnBhcnNlSW50KGFhLndpZHRoLDEwKTwzMTApKXthYS53aWR0aD1cIjMxMFwifWlmKHR5cGVvZiBhYS5oZWlnaHQ9PUR8fCghLyUkLy50ZXN0KGFhLmhlaWdodCkmJnBhcnNlSW50KGFhLmhlaWdodCwxMCk8MTM3KSl7YWEuaGVpZ2h0PVwiMTM3XCJ9ai50aXRsZT1qLnRpdGxlLnNsaWNlKDAsNDcpK1wiIC0gRmxhc2ggUGxheWVyIEluc3RhbGxhdGlvblwiO3ZhciBhZD1NLmllJiZNLndpbj8oWydBY3RpdmUnXS5jb25jYXQoJycpLmpvaW4oJ1gnKSk6XCJQbHVnSW5cIixhYz1cIk1NcmVkaXJlY3RVUkw9XCIrTy5sb2NhdGlvbi50b1N0cmluZygpLnJlcGxhY2UoLyYvZyxcIiUyNlwiKStcIiZNTXBsYXllclR5cGU9XCIrYWQrXCImTU1kb2N0aXRsZT1cIitqLnRpdGxlO2lmKHR5cGVvZiBhYi5mbGFzaHZhcnMhPUQpe2FiLmZsYXNodmFycys9XCImXCIrYWN9ZWxzZXthYi5mbGFzaHZhcnM9YWN9aWYoTS5pZSYmTS53aW4mJmFlLnJlYWR5U3RhdGUhPTQpe3ZhciBZPUMoXCJkaXZcIik7WCs9XCJTV0ZPYmplY3ROZXdcIjtZLnNldEF0dHJpYnV0ZShcImlkXCIsWCk7YWUucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoWSxhZSk7YWUuc3R5bGUuZGlzcGxheT1cIm5vbmVcIjsoZnVuY3Rpb24oKXtpZihhZS5yZWFkeVN0YXRlPT00KXthZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGFlKX1lbHNle3NldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCl9fSkoKX11KGFhLGFiLFgpfX1mdW5jdGlvbiBwKFkpe2lmKE0uaWUmJk0ud2luJiZZLnJlYWR5U3RhdGUhPTQpe3ZhciBYPUMoXCJkaXZcIik7WS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShYLFkpO1gucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoZyhZKSxYKTtZLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7KGZ1bmN0aW9uKCl7aWYoWS5yZWFkeVN0YXRlPT00KXtZLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoWSl9ZWxzZXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMTApfX0pKCl9ZWxzZXtZLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGcoWSksWSl9fWZ1bmN0aW9uIGcoYWIpe3ZhciBhYT1DKFwiZGl2XCIpO2lmKE0ud2luJiZNLmllKXthYS5pbm5lckhUTUw9YWIuaW5uZXJIVE1MfWVsc2V7dmFyIFk9YWIuZ2V0RWxlbWVudHNCeVRhZ05hbWUocilbMF07aWYoWSl7dmFyIGFkPVkuY2hpbGROb2RlcztpZihhZCl7dmFyIFg9YWQubGVuZ3RoO2Zvcih2YXIgWj0wO1o8WDtaKyspe2lmKCEoYWRbWl0ubm9kZVR5cGU9PTEmJmFkW1pdLm5vZGVOYW1lPT1cIlBBUkFNXCIpJiYhKGFkW1pdLm5vZGVUeXBlPT04KSl7YWEuYXBwZW5kQ2hpbGQoYWRbWl0uY2xvbmVOb2RlKHRydWUpKX19fX19cmV0dXJuIGFhfWZ1bmN0aW9uIHUoYWksYWcsWSl7dmFyIFgsYWE9YyhZKTtpZihNLndrJiZNLndrPDMxMil7cmV0dXJuIFh9aWYoYWEpe2lmKHR5cGVvZiBhaS5pZD09RCl7YWkuaWQ9WX1pZihNLmllJiZNLndpbil7dmFyIGFoPVwiXCI7Zm9yKHZhciBhZSBpbiBhaSl7aWYoYWlbYWVdIT1PYmplY3QucHJvdG90eXBlW2FlXSl7aWYoYWUudG9Mb3dlckNhc2UoKT09XCJkYXRhXCIpe2FnLm1vdmllPWFpW2FlXX1lbHNle2lmKGFlLnRvTG93ZXJDYXNlKCk9PVwic3R5bGVjbGFzc1wiKXthaCs9JyBjbGFzcz1cIicrYWlbYWVdKydcIid9ZWxzZXtpZihhZS50b0xvd2VyQ2FzZSgpIT1cImNsYXNzaWRcIil7YWgrPVwiIFwiK2FlKyc9XCInK2FpW2FlXSsnXCInfX19fX12YXIgYWY9XCJcIjtmb3IodmFyIGFkIGluIGFnKXtpZihhZ1thZF0hPU9iamVjdC5wcm90b3R5cGVbYWRdKXthZis9JzxwYXJhbSBuYW1lPVwiJythZCsnXCIgdmFsdWU9XCInK2FnW2FkXSsnXCIgLz4nfX1hYS5vdXRlckhUTUw9JzxvYmplY3QgY2xhc3NpZD1cImNsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMFwiJythaCtcIj5cIithZitcIjwvb2JqZWN0PlwiO05bTi5sZW5ndGhdPWFpLmlkO1g9YyhhaS5pZCl9ZWxzZXt2YXIgWj1DKHIpO1ouc2V0QXR0cmlidXRlKFwidHlwZVwiLHEpO2Zvcih2YXIgYWMgaW4gYWkpe2lmKGFpW2FjXSE9T2JqZWN0LnByb3RvdHlwZVthY10pe2lmKGFjLnRvTG93ZXJDYXNlKCk9PVwic3R5bGVjbGFzc1wiKXtaLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsYWlbYWNdKX1lbHNle2lmKGFjLnRvTG93ZXJDYXNlKCkhPVwiY2xhc3NpZFwiKXtaLnNldEF0dHJpYnV0ZShhYyxhaVthY10pfX19fWZvcih2YXIgYWIgaW4gYWcpe2lmKGFnW2FiXSE9T2JqZWN0LnByb3RvdHlwZVthYl0mJmFiLnRvTG93ZXJDYXNlKCkhPVwibW92aWVcIil7ZShaLGFiLGFnW2FiXSl9fWFhLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKFosYWEpO1g9Wn19cmV0dXJuIFh9ZnVuY3Rpb24gZShaLFgsWSl7dmFyIGFhPUMoXCJwYXJhbVwiKTthYS5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsWCk7YWEuc2V0QXR0cmlidXRlKFwidmFsdWVcIixZKTtaLmFwcGVuZENoaWxkKGFhKX1mdW5jdGlvbiB5KFkpe3ZhciBYPWMoWSk7aWYoWCYmWC5ub2RlTmFtZT09XCJPQkpFQ1RcIil7aWYoTS5pZSYmTS53aW4pe1guc3R5bGUuZGlzcGxheT1cIm5vbmVcIjsoZnVuY3Rpb24oKXtpZihYLnJlYWR5U3RhdGU9PTQpe2IoWSl9ZWxzZXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMTApfX0pKCl9ZWxzZXtYLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoWCl9fX1mdW5jdGlvbiBiKFope3ZhciBZPWMoWik7aWYoWSl7Zm9yKHZhciBYIGluIFkpe2lmKHR5cGVvZiBZW1hdPT1cImZ1bmN0aW9uXCIpe1lbWF09bnVsbH19WS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKFkpfX1mdW5jdGlvbiBjKFope3ZhciBYPW51bGw7dHJ5e1g9ai5nZXRFbGVtZW50QnlJZChaKX1jYXRjaChZKXt9cmV0dXJuIFh9ZnVuY3Rpb24gQyhYKXtyZXR1cm4gai5jcmVhdGVFbGVtZW50KFgpfWZ1bmN0aW9uIGkoWixYLFkpe1ouYXR0YWNoRXZlbnQoWCxZKTtJW0kubGVuZ3RoXT1bWixYLFldfWZ1bmN0aW9uIEYoWil7dmFyIFk9TS5wdixYPVouc3BsaXQoXCIuXCIpO1hbMF09cGFyc2VJbnQoWFswXSwxMCk7WFsxXT1wYXJzZUludChYWzFdLDEwKXx8MDtYWzJdPXBhcnNlSW50KFhbMl0sMTApfHwwO3JldHVybihZWzBdPlhbMF18fChZWzBdPT1YWzBdJiZZWzFdPlhbMV0pfHwoWVswXT09WFswXSYmWVsxXT09WFsxXSYmWVsyXT49WFsyXSkpP3RydWU6ZmFsc2V9ZnVuY3Rpb24gdihhYyxZLGFkLGFiKXtpZihNLmllJiZNLm1hYyl7cmV0dXJufXZhciBhYT1qLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtpZighYWEpe3JldHVybn12YXIgWD0oYWQmJnR5cGVvZiBhZD09XCJzdHJpbmdcIik/YWQ6XCJzY3JlZW5cIjtpZihhYil7bj1udWxsO0c9bnVsbH1pZighbnx8RyE9WCl7dmFyIFo9QyhcInN0eWxlXCIpO1ouc2V0QXR0cmlidXRlKFwidHlwZVwiLFwidGV4dC9jc3NcIik7Wi5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLFgpO249YWEuYXBwZW5kQ2hpbGQoWik7aWYoTS5pZSYmTS53aW4mJnR5cGVvZiBqLnN0eWxlU2hlZXRzIT1EJiZqLnN0eWxlU2hlZXRzLmxlbmd0aD4wKXtuPWouc3R5bGVTaGVldHNbai5zdHlsZVNoZWV0cy5sZW5ndGgtMV19Rz1YfWlmKE0uaWUmJk0ud2luKXtpZihuJiZ0eXBlb2Ygbi5hZGRSdWxlPT1yKXtuLmFkZFJ1bGUoYWMsWSl9fWVsc2V7aWYobiYmdHlwZW9mIGouY3JlYXRlVGV4dE5vZGUhPUQpe24uYXBwZW5kQ2hpbGQoai5jcmVhdGVUZXh0Tm9kZShhYytcIiB7XCIrWStcIn1cIikpfX19ZnVuY3Rpb24gdyhaLFgpe2lmKCFtKXtyZXR1cm59dmFyIFk9WD9cInZpc2libGVcIjpcImhpZGRlblwiO2lmKEomJmMoWikpe2MoWikuc3R5bGUudmlzaWJpbGl0eT1ZfWVsc2V7dihcIiNcIitaLFwidmlzaWJpbGl0eTpcIitZKX19ZnVuY3Rpb24gTChZKXt2YXIgWj0vW1xcXFxcXFwiPD5cXC47XS87dmFyIFg9Wi5leGVjKFkpIT1udWxsO3JldHVybiBYJiZ0eXBlb2YgZW5jb2RlVVJJQ29tcG9uZW50IT1EP2VuY29kZVVSSUNvbXBvbmVudChZKTpZfXZhciBkPWZ1bmN0aW9uKCl7aWYoTS5pZSYmTS53aW4pe3dpbmRvdy5hdHRhY2hFdmVudChcIm9udW5sb2FkXCIsZnVuY3Rpb24oKXt2YXIgYWM9SS5sZW5ndGg7Zm9yKHZhciBhYj0wO2FiPGFjO2FiKyspe0lbYWJdWzBdLmRldGFjaEV2ZW50KElbYWJdWzFdLElbYWJdWzJdKX12YXIgWj1OLmxlbmd0aDtmb3IodmFyIGFhPTA7YWE8WjthYSsrKXt5KE5bYWFdKX1mb3IodmFyIFkgaW4gTSl7TVtZXT1udWxsfU09bnVsbDtmb3IodmFyIFggaW4gc3dmb2JqZWN0KXtzd2ZvYmplY3RbWF09bnVsbH1zd2ZvYmplY3Q9bnVsbH0pfX0oKTtyZXR1cm57cmVnaXN0ZXJPYmplY3Q6ZnVuY3Rpb24oYWIsWCxhYSxaKXtpZihNLnczJiZhYiYmWCl7dmFyIFk9e307WS5pZD1hYjtZLnN3ZlZlcnNpb249WDtZLmV4cHJlc3NJbnN0YWxsPWFhO1kuY2FsbGJhY2tGbj1aO29bby5sZW5ndGhdPVk7dyhhYixmYWxzZSl9ZWxzZXtpZihaKXtaKHtzdWNjZXNzOmZhbHNlLGlkOmFifSl9fX0sZ2V0T2JqZWN0QnlJZDpmdW5jdGlvbihYKXtpZihNLnczKXtyZXR1cm4geihYKX19LGVtYmVkU1dGOmZ1bmN0aW9uKGFiLGFoLGFlLGFnLFksYWEsWixhZCxhZixhYyl7dmFyIFg9e3N1Y2Nlc3M6ZmFsc2UsaWQ6YWh9O2lmKE0udzMmJiEoTS53ayYmTS53azwzMTIpJiZhYiYmYWgmJmFlJiZhZyYmWSl7dyhhaCxmYWxzZSk7SyhmdW5jdGlvbigpe2FlKz1cIlwiO2FnKz1cIlwiO3ZhciBhaj17fTtpZihhZiYmdHlwZW9mIGFmPT09cil7Zm9yKHZhciBhbCBpbiBhZil7YWpbYWxdPWFmW2FsXX19YWouZGF0YT1hYjthai53aWR0aD1hZTthai5oZWlnaHQ9YWc7dmFyIGFtPXt9O2lmKGFkJiZ0eXBlb2YgYWQ9PT1yKXtmb3IodmFyIGFrIGluIGFkKXthbVtha109YWRbYWtdfX1pZihaJiZ0eXBlb2YgWj09PXIpe2Zvcih2YXIgYWkgaW4gWil7aWYodHlwZW9mIGFtLmZsYXNodmFycyE9RCl7YW0uZmxhc2h2YXJzKz1cIiZcIithaStcIj1cIitaW2FpXX1lbHNle2FtLmZsYXNodmFycz1haStcIj1cIitaW2FpXX19fWlmKEYoWSkpe3ZhciBhbj11KGFqLGFtLGFoKTtpZihhai5pZD09YWgpe3coYWgsdHJ1ZSl9WC5zdWNjZXNzPXRydWU7WC5yZWY9YW59ZWxzZXtpZihhYSYmQSgpKXthai5kYXRhPWFhO1AoYWosYW0sYWgsYWMpO3JldHVybn1lbHNle3coYWgsdHJ1ZSl9fWlmKGFjKXthYyhYKX19KX1lbHNle2lmKGFjKXthYyhYKX19fSxzd2l0Y2hPZmZBdXRvSGlkZVNob3c6ZnVuY3Rpb24oKXttPWZhbHNlfSx1YTpNLGdldEZsYXNoUGxheWVyVmVyc2lvbjpmdW5jdGlvbigpe3JldHVybnttYWpvcjpNLnB2WzBdLG1pbm9yOk0ucHZbMV0scmVsZWFzZTpNLnB2WzJdfX0saGFzRmxhc2hQbGF5ZXJWZXJzaW9uOkYsY3JlYXRlU1dGOmZ1bmN0aW9uKFosWSxYKXtpZihNLnczKXtyZXR1cm4gdShaLFksWCl9ZWxzZXtyZXR1cm4gdW5kZWZpbmVkfX0sc2hvd0V4cHJlc3NJbnN0YWxsOmZ1bmN0aW9uKFosYWEsWCxZKXtpZihNLnczJiZBKCkpe1AoWixhYSxYLFkpfX0scmVtb3ZlU1dGOmZ1bmN0aW9uKFgpe2lmKE0udzMpe3koWCl9fSxjcmVhdGVDU1M6ZnVuY3Rpb24oYWEsWixZLFgpe2lmKE0udzMpe3YoYWEsWixZLFgpfX0sYWRkRG9tTG9hZEV2ZW50OkssYWRkTG9hZEV2ZW50OnMsZ2V0UXVlcnlQYXJhbVZhbHVlOmZ1bmN0aW9uKGFhKXt2YXIgWj1qLmxvY2F0aW9uLnNlYXJjaHx8ai5sb2NhdGlvbi5oYXNoO2lmKFope2lmKC9cXD8vLnRlc3QoWikpe1o9Wi5zcGxpdChcIj9cIilbMV19aWYoYWE9PW51bGwpe3JldHVybiBMKFopfXZhciBZPVouc3BsaXQoXCImXCIpO2Zvcih2YXIgWD0wO1g8WS5sZW5ndGg7WCsrKXtpZihZW1hdLnN1YnN0cmluZygwLFlbWF0uaW5kZXhPZihcIj1cIikpPT1hYSl7cmV0dXJuIEwoWVtYXS5zdWJzdHJpbmcoKFlbWF0uaW5kZXhPZihcIj1cIikrMSkpKX19fXJldHVyblwiXCJ9LGV4cHJlc3NJbnN0YWxsQ2FsbGJhY2s6ZnVuY3Rpb24oKXtpZihhKXt2YXIgWD1jKFIpO2lmKFgmJmwpe1gucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobCxYKTtpZihRKXt3KFEsdHJ1ZSk7aWYoTS5pZSYmTS53aW4pe2wuc3R5bGUuZGlzcGxheT1cImJsb2NrXCJ9fWlmKEUpe0UoQil9fWE9ZmFsc2V9fX19KCk7XG59XG4vLyBDb3B5cmlnaHQ6IEhpcm9zaGkgSWNoaWthd2EgPGh0dHA6Ly9naW1pdGUubmV0L2VuLz5cbi8vIExpY2Vuc2U6IE5ldyBCU0QgTGljZW5zZVxuLy8gUmVmZXJlbmNlOiBodHRwOi8vZGV2LnczLm9yZy9odG1sNS93ZWJzb2NrZXRzL1xuLy8gUmVmZXJlbmNlOiBodHRwOi8vdG9vbHMuaWV0Zi5vcmcvaHRtbC9kcmFmdC1oaXhpZS10aGV3ZWJzb2NrZXRwcm90b2NvbFxuXG4oZnVuY3Rpb24oKSB7XG4gIFxuICBpZiAoJ3VuZGVmaW5lZCcgPT0gdHlwZW9mIHdpbmRvdyB8fCB3aW5kb3cuV2ViU29ja2V0KSByZXR1cm47XG5cbiAgdmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbiAgaWYgKCFjb25zb2xlIHx8ICFjb25zb2xlLmxvZyB8fCAhY29uc29sZS5lcnJvcikge1xuICAgIGNvbnNvbGUgPSB7bG9nOiBmdW5jdGlvbigpeyB9LCBlcnJvcjogZnVuY3Rpb24oKXsgfX07XG4gIH1cbiAgXG4gIGlmICghc3dmb2JqZWN0Lmhhc0ZsYXNoUGxheWVyVmVyc2lvbihcIjEwLjAuMFwiKSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJGbGFzaCBQbGF5ZXIgPj0gMTAuMC4wIGlzIHJlcXVpcmVkLlwiKTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGxvY2F0aW9uLnByb3RvY29sID09IFwiZmlsZTpcIikge1xuICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICBcIldBUk5JTkc6IHdlYi1zb2NrZXQtanMgZG9lc24ndCB3b3JrIGluIGZpbGU6Ly8vLi4uIFVSTCBcIiArXG4gICAgICBcInVubGVzcyB5b3Ugc2V0IEZsYXNoIFNlY3VyaXR5IFNldHRpbmdzIHByb3Blcmx5LiBcIiArXG4gICAgICBcIk9wZW4gdGhlIHBhZ2UgdmlhIFdlYiBzZXJ2ZXIgaS5lLiBodHRwOi8vLi4uXCIpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgY2xhc3MgcmVwcmVzZW50cyBhIGZhdXggd2ViIHNvY2tldC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKiBAcGFyYW0ge2FycmF5IG9yIHN0cmluZ30gcHJvdG9jb2xzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm94eUhvc3RcbiAgICogQHBhcmFtIHtpbnR9IHByb3h5UG9ydFxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyc1xuICAgKi9cbiAgV2ViU29ja2V0ID0gZnVuY3Rpb24odXJsLCBwcm90b2NvbHMsIHByb3h5SG9zdCwgcHJveHlQb3J0LCBoZWFkZXJzKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYuX19pZCA9IFdlYlNvY2tldC5fX25leHRJZCsrO1xuICAgIFdlYlNvY2tldC5fX2luc3RhbmNlc1tzZWxmLl9faWRdID0gc2VsZjtcbiAgICBzZWxmLnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ09OTkVDVElORztcbiAgICBzZWxmLmJ1ZmZlcmVkQW1vdW50ID0gMDtcbiAgICBzZWxmLl9fZXZlbnRzID0ge307XG4gICAgaWYgKCFwcm90b2NvbHMpIHtcbiAgICAgIHByb3RvY29scyA9IFtdO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHByb3RvY29scyA9PSBcInN0cmluZ1wiKSB7XG4gICAgICBwcm90b2NvbHMgPSBbcHJvdG9jb2xzXTtcbiAgICB9XG4gICAgLy8gVXNlcyBzZXRUaW1lb3V0KCkgdG8gbWFrZSBzdXJlIF9fY3JlYXRlRmxhc2goKSBydW5zIGFmdGVyIHRoZSBjYWxsZXIgc2V0cyB3cy5vbm9wZW4gZXRjLlxuICAgIC8vIE90aGVyd2lzZSwgd2hlbiBvbm9wZW4gZmlyZXMgaW1tZWRpYXRlbHksIG9ub3BlbiBpcyBjYWxsZWQgYmVmb3JlIGl0IGlzIHNldC5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgV2ViU29ja2V0Ll9fYWRkVGFzayhmdW5jdGlvbigpIHtcbiAgICAgICAgV2ViU29ja2V0Ll9fZmxhc2guY3JlYXRlKFxuICAgICAgICAgICAgc2VsZi5fX2lkLCB1cmwsIHByb3RvY29scywgcHJveHlIb3N0IHx8IG51bGwsIHByb3h5UG9ydCB8fCAwLCBoZWFkZXJzIHx8IG51bGwpO1xuICAgICAgfSk7XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmQgZGF0YSB0byB0aGUgd2ViIHNvY2tldC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IGRhdGEgIFRoZSBkYXRhIHRvIHNlbmQgdG8gdGhlIHNvY2tldC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gIFRydWUgZm9yIHN1Y2Nlc3MsIGZhbHNlIGZvciBmYWlsdXJlLlxuICAgKi9cbiAgV2ViU29ja2V0LnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0LkNPTk5FQ1RJTkcpIHtcbiAgICAgIHRocm93IFwiSU5WQUxJRF9TVEFURV9FUlI6IFdlYiBTb2NrZXQgY29ubmVjdGlvbiBoYXMgbm90IGJlZW4gZXN0YWJsaXNoZWRcIjtcbiAgICB9XG4gICAgLy8gV2UgdXNlIGVuY29kZVVSSUNvbXBvbmVudCgpIGhlcmUsIGJlY2F1c2UgRkFCcmlkZ2UgZG9lc24ndCB3b3JrIGlmXG4gICAgLy8gdGhlIGFyZ3VtZW50IGluY2x1ZGVzIHNvbWUgY2hhcmFjdGVycy4gV2UgZG9uJ3QgdXNlIGVzY2FwZSgpIGhlcmVcbiAgICAvLyBiZWNhdXNlIG9mIHRoaXM6XG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vQ29yZV9KYXZhU2NyaXB0XzEuNV9HdWlkZS9GdW5jdGlvbnMjZXNjYXBlX2FuZF91bmVzY2FwZV9GdW5jdGlvbnNcbiAgICAvLyBCdXQgaXQgbG9va3MgZGVjb2RlVVJJQ29tcG9uZW50KGVuY29kZVVSSUNvbXBvbmVudChzKSkgZG9lc24ndFxuICAgIC8vIHByZXNlcnZlIGFsbCBVbmljb2RlIGNoYXJhY3RlcnMgZWl0aGVyIGUuZy4gXCJcXHVmZmZmXCIgaW4gRmlyZWZveC5cbiAgICAvLyBOb3RlIGJ5IHd0cml0Y2g6IEhvcGVmdWxseSB0aGlzIHdpbGwgbm90IGJlIG5lY2Vzc2FyeSB1c2luZyBFeHRlcm5hbEludGVyZmFjZS4gIFdpbGwgcmVxdWlyZVxuICAgIC8vIGFkZGl0aW9uYWwgdGVzdGluZy5cbiAgICB2YXIgcmVzdWx0ID0gV2ViU29ja2V0Ll9fZmxhc2guc2VuZCh0aGlzLl9faWQsIGVuY29kZVVSSUNvbXBvbmVudChkYXRhKSk7XG4gICAgaWYgKHJlc3VsdCA8IDApIHsgLy8gc3VjY2Vzc1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVmZmVyZWRBbW91bnQgKz0gcmVzdWx0O1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xvc2UgdGhpcyB3ZWIgc29ja2V0IGdyYWNlZnVsbHkuXG4gICAqL1xuICBXZWJTb2NrZXQucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuQ0xPU0VEIHx8IHRoaXMucmVhZHlTdGF0ZSA9PSBXZWJTb2NrZXQuQ0xPU0lORykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnJlYWR5U3RhdGUgPSBXZWJTb2NrZXQuQ0xPU0lORztcbiAgICBXZWJTb2NrZXQuX19mbGFzaC5jbG9zZSh0aGlzLl9faWQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgPGEgaHJlZj1cImh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUV2ZW50cy9ldmVudHMuaHRtbCNFdmVudHMtcmVnaXN0cmF0aW9uXCI+RE9NIDIgRXZlbnRUYXJnZXQgSW50ZXJmYWNlPC9hPn1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHBhcmFtIHtib29sZWFufSB1c2VDYXB0dXJlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgV2ViU29ja2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuX19ldmVudHMpKSB7XG4gICAgICB0aGlzLl9fZXZlbnRzW3R5cGVdID0gW107XG4gICAgfVxuICAgIHRoaXMuX19ldmVudHNbdHlwZV0ucHVzaChsaXN0ZW5lcik7XG4gIH07XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGF0aW9uIG9mIHtAbGluayA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTItRXZlbnRzL2V2ZW50cy5odG1sI0V2ZW50cy1yZWdpc3RyYXRpb25cIj5ET00gMiBFdmVudFRhcmdldCBJbnRlcmZhY2U8L2E+fVxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBsaXN0ZW5lclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHVzZUNhcHR1cmVcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBXZWJTb2NrZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lciwgdXNlQ2FwdHVyZSkge1xuICAgIGlmICghKHR5cGUgaW4gdGhpcy5fX2V2ZW50cykpIHJldHVybjtcbiAgICB2YXIgZXZlbnRzID0gdGhpcy5fX2V2ZW50c1t0eXBlXTtcbiAgICBmb3IgKHZhciBpID0gZXZlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICBpZiAoZXZlbnRzW2ldID09PSBsaXN0ZW5lcikge1xuICAgICAgICBldmVudHMuc3BsaWNlKGksIDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEltcGxlbWVudGF0aW9uIG9mIHtAbGluayA8YSBocmVmPVwiaHR0cDovL3d3dy53My5vcmcvVFIvRE9NLUxldmVsLTItRXZlbnRzL2V2ZW50cy5odG1sI0V2ZW50cy1yZWdpc3RyYXRpb25cIj5ET00gMiBFdmVudFRhcmdldCBJbnRlcmZhY2U8L2E+fVxuICAgKlxuICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudFxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX19ldmVudHNbZXZlbnQudHlwZV0gfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyArK2kpIHtcbiAgICAgIGV2ZW50c1tpXShldmVudCk7XG4gICAgfVxuICAgIHZhciBoYW5kbGVyID0gdGhpc1tcIm9uXCIgKyBldmVudC50eXBlXTtcbiAgICBpZiAoaGFuZGxlcikgaGFuZGxlcihldmVudCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYW4gZXZlbnQgZnJvbSBGbGFzaC5cbiAgICogQHBhcmFtIHtPYmplY3R9IGZsYXNoRXZlbnRcbiAgICovXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuX19oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKGZsYXNoRXZlbnQpIHtcbiAgICBpZiAoXCJyZWFkeVN0YXRlXCIgaW4gZmxhc2hFdmVudCkge1xuICAgICAgdGhpcy5yZWFkeVN0YXRlID0gZmxhc2hFdmVudC5yZWFkeVN0YXRlO1xuICAgIH1cbiAgICBpZiAoXCJwcm90b2NvbFwiIGluIGZsYXNoRXZlbnQpIHtcbiAgICAgIHRoaXMucHJvdG9jb2wgPSBmbGFzaEV2ZW50LnByb3RvY29sO1xuICAgIH1cbiAgICBcbiAgICB2YXIganNFdmVudDtcbiAgICBpZiAoZmxhc2hFdmVudC50eXBlID09IFwib3BlblwiIHx8IGZsYXNoRXZlbnQudHlwZSA9PSBcImVycm9yXCIpIHtcbiAgICAgIGpzRXZlbnQgPSB0aGlzLl9fY3JlYXRlU2ltcGxlRXZlbnQoZmxhc2hFdmVudC50eXBlKTtcbiAgICB9IGVsc2UgaWYgKGZsYXNoRXZlbnQudHlwZSA9PSBcImNsb3NlXCIpIHtcbiAgICAgIC8vIFRPRE8gaW1wbGVtZW50IGpzRXZlbnQud2FzQ2xlYW5cbiAgICAgIGpzRXZlbnQgPSB0aGlzLl9fY3JlYXRlU2ltcGxlRXZlbnQoXCJjbG9zZVwiKTtcbiAgICB9IGVsc2UgaWYgKGZsYXNoRXZlbnQudHlwZSA9PSBcIm1lc3NhZ2VcIikge1xuICAgICAgdmFyIGRhdGEgPSBkZWNvZGVVUklDb21wb25lbnQoZmxhc2hFdmVudC5tZXNzYWdlKTtcbiAgICAgIGpzRXZlbnQgPSB0aGlzLl9fY3JlYXRlTWVzc2FnZUV2ZW50KFwibWVzc2FnZVwiLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgXCJ1bmtub3duIGV2ZW50IHR5cGU6IFwiICsgZmxhc2hFdmVudC50eXBlO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLmRpc3BhdGNoRXZlbnQoanNFdmVudCk7XG4gIH07XG4gIFxuICBXZWJTb2NrZXQucHJvdG90eXBlLl9fY3JlYXRlU2ltcGxlRXZlbnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50ICYmIHdpbmRvdy5FdmVudCkge1xuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudFwiKTtcbiAgICAgIGV2ZW50LmluaXRFdmVudCh0eXBlLCBmYWxzZSwgZmFsc2UpO1xuICAgICAgcmV0dXJuIGV2ZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge3R5cGU6IHR5cGUsIGJ1YmJsZXM6IGZhbHNlLCBjYW5jZWxhYmxlOiBmYWxzZX07XG4gICAgfVxuICB9O1xuICBcbiAgV2ViU29ja2V0LnByb3RvdHlwZS5fX2NyZWF0ZU1lc3NhZ2VFdmVudCA9IGZ1bmN0aW9uKHR5cGUsIGRhdGEpIHtcbiAgICBpZiAoZG9jdW1lbnQuY3JlYXRlRXZlbnQgJiYgd2luZG93Lk1lc3NhZ2VFdmVudCAmJiAhd2luZG93Lm9wZXJhKSB7XG4gICAgICB2YXIgZXZlbnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudChcIk1lc3NhZ2VFdmVudFwiKTtcbiAgICAgIGV2ZW50LmluaXRNZXNzYWdlRXZlbnQoXCJtZXNzYWdlXCIsIGZhbHNlLCBmYWxzZSwgZGF0YSwgbnVsbCwgbnVsbCwgd2luZG93LCBudWxsKTtcbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUUgYW5kIE9wZXJhLCB0aGUgbGF0dGVyIG9uZSB0cnVuY2F0ZXMgdGhlIGRhdGEgcGFyYW1ldGVyIGFmdGVyIGFueSAweDAwIGJ5dGVzLlxuICAgICAgcmV0dXJuIHt0eXBlOiB0eXBlLCBkYXRhOiBkYXRhLCBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2V9O1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBEZWZpbmUgdGhlIFdlYlNvY2tldCByZWFkeVN0YXRlIGVudW1lcmF0aW9uLlxuICAgKi9cbiAgV2ViU29ja2V0LkNPTk5FQ1RJTkcgPSAwO1xuICBXZWJTb2NrZXQuT1BFTiA9IDE7XG4gIFdlYlNvY2tldC5DTE9TSU5HID0gMjtcbiAgV2ViU29ja2V0LkNMT1NFRCA9IDM7XG5cbiAgV2ViU29ja2V0Ll9fZmxhc2ggPSBudWxsO1xuICBXZWJTb2NrZXQuX19pbnN0YW5jZXMgPSB7fTtcbiAgV2ViU29ja2V0Ll9fdGFza3MgPSBbXTtcbiAgV2ViU29ja2V0Ll9fbmV4dElkID0gMDtcbiAgXG4gIC8qKlxuICAgKiBMb2FkIGEgbmV3IGZsYXNoIHNlY3VyaXR5IHBvbGljeSBmaWxlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAqL1xuICBXZWJTb2NrZXQubG9hZEZsYXNoUG9saWN5RmlsZSA9IGZ1bmN0aW9uKHVybCl7XG4gICAgV2ViU29ja2V0Ll9fYWRkVGFzayhmdW5jdGlvbigpIHtcbiAgICAgIFdlYlNvY2tldC5fX2ZsYXNoLmxvYWRNYW51YWxQb2xpY3lGaWxlKHVybCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIExvYWRzIFdlYlNvY2tldE1haW4uc3dmIGFuZCBjcmVhdGVzIFdlYlNvY2tldE1haW4gb2JqZWN0IGluIEZsYXNoLlxuICAgKi9cbiAgV2ViU29ja2V0Ll9faW5pdGlhbGl6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmIChXZWJTb2NrZXQuX19mbGFzaCkgcmV0dXJuO1xuICAgIFxuICAgIGlmIChXZWJTb2NrZXQuX19zd2ZMb2NhdGlvbikge1xuICAgICAgLy8gRm9yIGJhY2t3b3JkIGNvbXBhdGliaWxpdHkuXG4gICAgICB3aW5kb3cuV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04gPSBXZWJTb2NrZXQuX19zd2ZMb2NhdGlvbjtcbiAgICB9XG4gICAgaWYgKCF3aW5kb3cuV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04pIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoXCJbV2ViU29ja2V0XSBzZXQgV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04gdG8gbG9jYXRpb24gb2YgV2ViU29ja2V0TWFpbi5zd2ZcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGNvbnRhaW5lci5pZCA9IFwid2ViU29ja2V0Q29udGFpbmVyXCI7XG4gICAgLy8gSGlkZXMgRmxhc2ggYm94LiBXZSBjYW5ub3QgdXNlIGRpc3BsYXk6IG5vbmUgb3IgdmlzaWJpbGl0eTogaGlkZGVuIGJlY2F1c2UgaXQgcHJldmVudHNcbiAgICAvLyBGbGFzaCBmcm9tIGxvYWRpbmcgYXQgbGVhc3QgaW4gSUUuIFNvIHdlIG1vdmUgaXQgb3V0IG9mIHRoZSBzY3JlZW4gYXQgKC0xMDAsIC0xMDApLlxuICAgIC8vIEJ1dCB0aGlzIGV2ZW4gZG9lc24ndCB3b3JrIHdpdGggRmxhc2ggTGl0ZSAoZS5nLiBpbiBEcm9pZCBJbmNyZWRpYmxlKS4gU28gd2l0aCBGbGFzaFxuICAgIC8vIExpdGUsIHdlIHB1dCBpdCBhdCAoMCwgMCkuIFRoaXMgc2hvd3MgMXgxIGJveCB2aXNpYmxlIGF0IGxlZnQtdG9wIGNvcm5lciBidXQgdGhpcyBpc1xuICAgIC8vIHRoZSBiZXN0IHdlIGNhbiBkbyBhcyBmYXIgYXMgd2Uga25vdyBub3cuXG4gICAgY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuICAgIGlmIChXZWJTb2NrZXQuX19pc0ZsYXNoTGl0ZSgpKSB7XG4gICAgICBjb250YWluZXIuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgICBjb250YWluZXIuc3R5bGUudG9wID0gXCIwcHhcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSBcIi0xMDBweFwiO1xuICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IFwiLTEwMHB4XCI7XG4gICAgfVxuICAgIHZhciBob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGhvbGRlci5pZCA9IFwid2ViU29ja2V0Rmxhc2hcIjtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaG9sZGVyKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgLy8gU2VlIHRoaXMgYXJ0aWNsZSBmb3IgaGFzUHJpb3JpdHk6XG4gICAgLy8gaHR0cDovL2hlbHAuYWRvYmUuY29tL2VuX1VTL2FzMy9tb2JpbGUvV1M0YmViY2Q2NmE3NDI3NWMzNmNmYjgxMzcxMjQzMThlZWJjNi03ZmZkLmh0bWxcbiAgICBzd2ZvYmplY3QuZW1iZWRTV0YoXG4gICAgICBXRUJfU09DS0VUX1NXRl9MT0NBVElPTixcbiAgICAgIFwid2ViU29ja2V0Rmxhc2hcIixcbiAgICAgIFwiMVwiIC8qIHdpZHRoICovLFxuICAgICAgXCIxXCIgLyogaGVpZ2h0ICovLFxuICAgICAgXCIxMC4wLjBcIiAvKiBTV0YgdmVyc2lvbiAqLyxcbiAgICAgIG51bGwsXG4gICAgICBudWxsLFxuICAgICAge2hhc1ByaW9yaXR5OiB0cnVlLCBzd2xpdmVjb25uZWN0IDogdHJ1ZSwgYWxsb3dTY3JpcHRBY2Nlc3M6IFwiYWx3YXlzXCJ9LFxuICAgICAgbnVsbCxcbiAgICAgIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKFwiW1dlYlNvY2tldF0gc3dmb2JqZWN0LmVtYmVkU1dGIGZhaWxlZFwiKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH07XG4gIFxuICAvKipcbiAgICogQ2FsbGVkIGJ5IEZsYXNoIHRvIG5vdGlmeSBKUyB0aGF0IGl0J3MgZnVsbHkgbG9hZGVkIGFuZCByZWFkeVxuICAgKiBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICovXG4gIFdlYlNvY2tldC5fX29uRmxhc2hJbml0aWFsaXplZCA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIFdlIG5lZWQgdG8gc2V0IGEgdGltZW91dCBoZXJlIHRvIGF2b2lkIHJvdW5kLXRyaXAgY2FsbHNcbiAgICAvLyB0byBmbGFzaCBkdXJpbmcgdGhlIGluaXRpYWxpemF0aW9uIHByb2Nlc3MuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIFdlYlNvY2tldC5fX2ZsYXNoID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWJTb2NrZXRGbGFzaFwiKTtcbiAgICAgIFdlYlNvY2tldC5fX2ZsYXNoLnNldENhbGxlclVybChsb2NhdGlvbi5ocmVmKTtcbiAgICAgIFdlYlNvY2tldC5fX2ZsYXNoLnNldERlYnVnKCEhd2luZG93LldFQl9TT0NLRVRfREVCVUcpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBXZWJTb2NrZXQuX190YXNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgICBXZWJTb2NrZXQuX190YXNrc1tpXSgpO1xuICAgICAgfVxuICAgICAgV2ViU29ja2V0Ll9fdGFza3MgPSBbXTtcbiAgICB9LCAwKTtcbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBDYWxsZWQgYnkgRmxhc2ggdG8gbm90aWZ5IFdlYlNvY2tldHMgZXZlbnRzIGFyZSBmaXJlZC5cbiAgICovXG4gIFdlYlNvY2tldC5fX29uRmxhc2hFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBHZXRzIGV2ZW50cyB1c2luZyByZWNlaXZlRXZlbnRzKCkgaW5zdGVhZCBvZiBnZXR0aW5nIGl0IGZyb20gZXZlbnQgb2JqZWN0XG4gICAgICAgIC8vIG9mIEZsYXNoIGV2ZW50LiBUaGlzIGlzIHRvIG1ha2Ugc3VyZSB0byBrZWVwIG1lc3NhZ2Ugb3JkZXIuXG4gICAgICAgIC8vIEl0IHNlZW1zIHNvbWV0aW1lcyBGbGFzaCBldmVudHMgZG9uJ3QgYXJyaXZlIGluIHRoZSBzYW1lIG9yZGVyIGFzIHRoZXkgYXJlIHNlbnQuXG4gICAgICAgIHZhciBldmVudHMgPSBXZWJTb2NrZXQuX19mbGFzaC5yZWNlaXZlRXZlbnRzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgV2ViU29ja2V0Ll9faW5zdGFuY2VzW2V2ZW50c1tpXS53ZWJTb2NrZXRJZF0uX19oYW5kbGVFdmVudChldmVudHNbaV0pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIFxuICAvLyBDYWxsZWQgYnkgRmxhc2guXG4gIFdlYlNvY2tldC5fX2xvZyA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmxvZyhkZWNvZGVVUklDb21wb25lbnQobWVzc2FnZSkpO1xuICB9O1xuICBcbiAgLy8gQ2FsbGVkIGJ5IEZsYXNoLlxuICBXZWJTb2NrZXQuX19lcnJvciA9IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICBjb25zb2xlLmVycm9yKGRlY29kZVVSSUNvbXBvbmVudChtZXNzYWdlKSk7XG4gIH07XG4gIFxuICBXZWJTb2NrZXQuX19hZGRUYXNrID0gZnVuY3Rpb24odGFzaykge1xuICAgIGlmIChXZWJTb2NrZXQuX19mbGFzaCkge1xuICAgICAgdGFzaygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBXZWJTb2NrZXQuX190YXNrcy5wdXNoKHRhc2spO1xuICAgIH1cbiAgfTtcbiAgXG4gIC8qKlxuICAgKiBUZXN0IGlmIHRoZSBicm93c2VyIGlzIHJ1bm5pbmcgZmxhc2ggbGl0ZS5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBmbGFzaCBsaXRlIGlzIHJ1bm5pbmcsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG4gIFdlYlNvY2tldC5fX2lzRmxhc2hMaXRlID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCF3aW5kb3cubmF2aWdhdG9yIHx8ICF3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbWltZVR5cGUgPSB3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlc1tcImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCJdO1xuICAgIGlmICghbWltZVR5cGUgfHwgIW1pbWVUeXBlLmVuYWJsZWRQbHVnaW4gfHwgIW1pbWVUeXBlLmVuYWJsZWRQbHVnaW4uZmlsZW5hbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIG1pbWVUeXBlLmVuYWJsZWRQbHVnaW4uZmlsZW5hbWUubWF0Y2goL2ZsYXNobGl0ZS9pKSA/IHRydWUgOiBmYWxzZTtcbiAgfTtcbiAgXG4gIGlmICghd2luZG93LldFQl9TT0NLRVRfRElTQUJMRV9BVVRPX0lOSVRJQUxJWkFUSU9OKSB7XG4gICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgV2ViU29ja2V0Ll9faW5pdGlhbGl6ZSgpO1xuICAgICAgfSwgZmFsc2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgV2ViU29ja2V0Ll9faW5pdGlhbGl6ZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIFxufSkoKTtcblxuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8sIGdsb2JhbCkge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGV4cG9ydHMuWEhSID0gWEhSO1xuXG4gIC8qKlxuICAgKiBYSFIgY29uc3RydWN0b3JcbiAgICpcbiAgICogQGNvc3RydWN0b3JcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gWEhSIChzb2NrZXQpIHtcbiAgICBpZiAoIXNvY2tldCkgcmV0dXJuO1xuXG4gICAgaW8uVHJhbnNwb3J0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5zZW5kQnVmZmVyID0gW107XG4gIH07XG5cbiAgLyoqXG4gICAqIEluaGVyaXRzIGZyb20gVHJhbnNwb3J0LlxuICAgKi9cblxuICBpby51dGlsLmluaGVyaXQoWEhSLCBpby5UcmFuc3BvcnQpO1xuXG4gIC8qKlxuICAgKiBFc3RhYmxpc2ggYSBjb25uZWN0aW9uXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFhIUi5wcm90b3R5cGUub3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNvY2tldC5zZXRCdWZmZXIoZmFsc2UpO1xuICAgIHRoaXMub25PcGVuKCk7XG4gICAgdGhpcy5nZXQoKTtcblxuICAgIC8vIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHRoZSByZXF1ZXN0IHN1Y2NlZWRzIHNpbmNlIHdlIGhhdmUgbm8gaW5kaWNhdGlvblxuICAgIC8vIHdoZXRoZXIgdGhlIHJlcXVlc3Qgb3BlbmVkIG9yIG5vdCB1bnRpbCBpdCBzdWNjZWVkZWQuXG4gICAgdGhpcy5zZXRDbG9zZVRpbWVvdXQoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB3ZSBuZWVkIHRvIHNlbmQgZGF0YSB0byB0aGUgU29ja2V0LklPIHNlcnZlciwgaWYgd2UgaGF2ZSBkYXRhIGluIG91clxuICAgKiBidWZmZXIgd2UgZW5jb2RlIGl0IGFuZCBmb3J3YXJkIGl0IHRvIHRoZSBgcG9zdGAgbWV0aG9kLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgWEhSLnByb3RvdHlwZS5wYXlsb2FkID0gZnVuY3Rpb24gKHBheWxvYWQpIHtcbiAgICB2YXIgbXNncyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBwYXlsb2FkLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgbXNncy5wdXNoKGlvLnBhcnNlci5lbmNvZGVQYWNrZXQocGF5bG9hZFtpXSkpO1xuICAgIH1cblxuICAgIHRoaXMuc2VuZChpby5wYXJzZXIuZW5jb2RlUGF5bG9hZChtc2dzKSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmQgZGF0YSB0byB0aGUgU29ja2V0LklPIHNlcnZlci5cbiAgICpcbiAgICogQHBhcmFtIGRhdGEgVGhlIG1lc3NhZ2VcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWEhSLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB0aGlzLnBvc3QoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBvc3RzIGEgZW5jb2RlZCBtZXNzYWdlIHRvIHRoZSBTb2NrZXQuSU8gc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBBIGVuY29kZWQgbWVzc2FnZS5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVtcHR5ICgpIHsgfTtcblxuICBYSFIucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLnNvY2tldC5zZXRCdWZmZXIodHJ1ZSk7XG5cbiAgICBmdW5jdGlvbiBzdGF0ZUNoYW5nZSAoKSB7XG4gICAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IDQpIHtcbiAgICAgICAgdGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBlbXB0eTtcbiAgICAgICAgc2VsZi5wb3N0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCl7XG4gICAgICAgICAgc2VsZi5zb2NrZXQuc2V0QnVmZmVyKGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9ubG9hZCAoKSB7XG4gICAgICB0aGlzLm9ubG9hZCA9IGVtcHR5O1xuICAgICAgc2VsZi5zb2NrZXQuc2V0QnVmZmVyKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgdGhpcy5zZW5kWEhSID0gdGhpcy5yZXF1ZXN0KCdQT1NUJyk7XG5cbiAgICBpZiAoZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmIHRoaXMuc2VuZFhIUiBpbnN0YW5jZW9mIFhEb21haW5SZXF1ZXN0KSB7XG4gICAgICB0aGlzLnNlbmRYSFIub25sb2FkID0gdGhpcy5zZW5kWEhSLm9uZXJyb3IgPSBvbmxvYWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2VuZFhIUi5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBzdGF0ZUNoYW5nZTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbmRYSFIuc2VuZChkYXRhKTtcbiAgfTtcblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIGVzdGFibGlzaGVkIGBYSFJgIGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFhIUi5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vbkNsb3NlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIGNvbmZpZ3VyZWQgWEhSIHJlcXVlc3RcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHVybCBUaGUgdXJsIHRoYXQgbmVlZHMgdG8gYmUgcmVxdWVzdGVkLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kIFRoZSBtZXRob2QgdGhlIHJlcXVlc3Qgc2hvdWxkIHVzZS5cbiAgICogQHJldHVybnMge1hNTEh0dHBSZXF1ZXN0fVxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgWEhSLnByb3RvdHlwZS5yZXF1ZXN0ID0gZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgIHZhciByZXEgPSBpby51dGlsLnJlcXVlc3QodGhpcy5zb2NrZXQuaXNYRG9tYWluKCkpXG4gICAgICAsIHF1ZXJ5ID0gaW8udXRpbC5xdWVyeSh0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5LCAndD0nICsgK25ldyBEYXRlKTtcblxuICAgIHJlcS5vcGVuKG1ldGhvZCB8fCAnR0VUJywgdGhpcy5wcmVwYXJlVXJsKCkgKyBxdWVyeSwgdHJ1ZSk7XG5cbiAgICBpZiAobWV0aG9kID09ICdQT1NUJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHJlcS5zZXRSZXF1ZXN0SGVhZGVyKSB7XG4gICAgICAgICAgcmVxLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBYRG9tYWluUmVxdWVzdFxuICAgICAgICAgIHJlcS5jb250ZW50VHlwZSA9ICd0ZXh0L3BsYWluJztcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG5cbiAgICByZXR1cm4gcmVxO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBzY2hlbWUgdG8gdXNlIGZvciB0aGUgdHJhbnNwb3J0IFVSTHMuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBYSFIucHJvdG90eXBlLnNjaGVtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zb2NrZXQub3B0aW9ucy5zZWN1cmUgPyAnaHR0cHMnIDogJ2h0dHAnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgWEhSIHRyYW5zcG9ydHMgYXJlIHN1cHBvcnRlZFxuICAgKlxuICAgKiBAcGFyYW0ge0Jvb2xlYW59IHhkb21haW4gQ2hlY2sgaWYgd2Ugc3VwcG9ydCBjcm9zcyBkb21haW4gcmVxdWVzdHMuXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFIuY2hlY2sgPSBmdW5jdGlvbiAoc29ja2V0LCB4ZG9tYWluKSB7XG4gICAgdHJ5IHtcbiAgICAgIHZhciByZXF1ZXN0ID0gaW8udXRpbC5yZXF1ZXN0KHhkb21haW4pLFxuICAgICAgICAgIHVzZXNYRG9tUmVxID0gKGdsb2JhbC5YRG9tYWluUmVxdWVzdCAmJiByZXF1ZXN0IGluc3RhbmNlb2YgWERvbWFpblJlcXVlc3QpLFxuICAgICAgICAgIHNvY2tldFByb3RvY29sID0gKHNvY2tldCAmJiBzb2NrZXQub3B0aW9ucyAmJiBzb2NrZXQub3B0aW9ucy5zZWN1cmUgPyAnaHR0cHM6JyA6ICdodHRwOicpLFxuICAgICAgICAgIGlzWFByb3RvY29sID0gKGdsb2JhbC5sb2NhdGlvbiAmJiBzb2NrZXRQcm90b2NvbCAhPSBnbG9iYWwubG9jYXRpb24ucHJvdG9jb2wpO1xuICAgICAgaWYgKHJlcXVlc3QgJiYgISh1c2VzWERvbVJlcSAmJiBpc1hQcm90b2NvbCkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7fVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgWEhSIHRyYW5zcG9ydCBzdXBwb3J0cyBjcm9zcyBkb21haW4gcmVxdWVzdHMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFIueGRvbWFpbkNoZWNrID0gZnVuY3Rpb24gKHNvY2tldCkge1xuICAgIHJldHVybiBYSFIuY2hlY2soc29ja2V0LCB0cnVlKTtcbiAgfTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8uVHJhbnNwb3J0IDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuICAsIHRoaXNcbik7XG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMuaHRtbGZpbGUgPSBIVE1MRmlsZTtcblxuICAvKipcbiAgICogVGhlIEhUTUxGaWxlIHRyYW5zcG9ydCBjcmVhdGVzIGEgYGZvcmV2ZXIgaWZyYW1lYCBiYXNlZCB0cmFuc3BvcnRcbiAgICogZm9yIEludGVybmV0IEV4cGxvcmVyLiBSZWd1bGFyIGZvcmV2ZXIgaWZyYW1lIGltcGxlbWVudGF0aW9ucyB3aWxsIFxuICAgKiBjb250aW51b3VzbHkgdHJpZ2dlciB0aGUgYnJvd3NlcnMgYnV6eSBpbmRpY2F0b3JzLiBJZiB0aGUgZm9yZXZlciBpZnJhbWVcbiAgICogaXMgY3JlYXRlZCBpbnNpZGUgYSBgaHRtbGZpbGVgIHRoZXNlIGluZGljYXRvcnMgd2lsbCBub3QgYmUgdHJpZ2dlZC5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBleHRlbmRzIHtpby5UcmFuc3BvcnQuWEhSfVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBIVE1MRmlsZSAoc29ja2V0KSB7XG4gICAgaW8uVHJhbnNwb3J0LlhIUi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFhIUiB0cmFuc3BvcnQuXG4gICAqL1xuXG4gIGlvLnV0aWwuaW5oZXJpdChIVE1MRmlsZSwgaW8uVHJhbnNwb3J0LlhIUik7XG5cbiAgLyoqXG4gICAqIFRyYW5zcG9ydCBuYW1lXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEhUTUxGaWxlLnByb3RvdHlwZS5uYW1lID0gJ2h0bWxmaWxlJztcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBBYy4uLmVYIGBodG1sZmlsZWAgd2l0aCBhIGZvcmV2ZXIgbG9hZGluZyBpZnJhbWVcbiAgICogdGhhdCBjYW4gYmUgdXNlZCB0byBsaXN0ZW4gdG8gbWVzc2FnZXMuIEluc2lkZSB0aGUgZ2VuZXJhdGVkXG4gICAqIGBodG1sZmlsZWAgYSByZWZlcmVuY2Ugd2lsbCBiZSBtYWRlIHRvIHRoZSBIVE1MRmlsZSB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBIVE1MRmlsZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZG9jID0gbmV3IHdpbmRvd1soWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKSldKCdodG1sZmlsZScpO1xuICAgIHRoaXMuZG9jLm9wZW4oKTtcbiAgICB0aGlzLmRvYy53cml0ZSgnPGh0bWw+PC9odG1sPicpO1xuICAgIHRoaXMuZG9jLmNsb3NlKCk7XG4gICAgdGhpcy5kb2MucGFyZW50V2luZG93LnMgPSB0aGlzO1xuXG4gICAgdmFyIGlmcmFtZUMgPSB0aGlzLmRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpZnJhbWVDLmNsYXNzTmFtZSA9ICdzb2NrZXRpbyc7XG5cbiAgICB0aGlzLmRvYy5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZUMpO1xuICAgIHRoaXMuaWZyYW1lID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG5cbiAgICBpZnJhbWVDLmFwcGVuZENoaWxkKHRoaXMuaWZyYW1lKTtcblxuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBxdWVyeSA9IGlvLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSwgJ3Q9JysgK25ldyBEYXRlKTtcblxuICAgIHRoaXMuaWZyYW1lLnNyYyA9IHRoaXMucHJlcGFyZVVybCgpICsgcXVlcnk7XG5cbiAgICBpby51dGlsLm9uKHdpbmRvdywgJ3VubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYuZGVzdHJveSgpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgU29ja2V0LklPIHNlcnZlciB3aWxsIHdyaXRlIHNjcmlwdCB0YWdzIGluc2lkZSB0aGUgZm9yZXZlclxuICAgKiBpZnJhbWUsIHRoaXMgZnVuY3Rpb24gd2lsbCBiZSB1c2VkIGFzIGNhbGxiYWNrIGZvciB0aGUgaW5jb21pbmdcbiAgICogaW5mb3JtYXRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIFRoZSBtZXNzYWdlXG4gICAqIEBwYXJhbSB7ZG9jdW1lbnR9IGRvYyBSZWZlcmVuY2UgdG8gdGhlIGNvbnRleHRcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEhUTUxGaWxlLnByb3RvdHlwZS5fID0gZnVuY3Rpb24gKGRhdGEsIGRvYykge1xuICAgIC8vIHVuZXNjYXBlIGFsbCBmb3J3YXJkIHNsYXNoZXMuIHNlZSBHSC0xMjUxXG4gICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXFxcXFxcLy9nLCAnLycpO1xuICAgIHRoaXMub25EYXRhKGRhdGEpO1xuICAgIHRyeSB7XG4gICAgICB2YXIgc2NyaXB0ID0gZG9jLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgfSBjYXRjaCAoZSkgeyB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgdGhlIGVzdGFibGlzaGVkIGNvbm5lY3Rpb24sIGlmcmFtZSBhbmQgYGh0bWxmaWxlYC5cbiAgICogQW5kIGNhbGxzIHRoZSBgQ29sbGVjdEdhcmJhZ2VgIGZ1bmN0aW9uIG9mIEludGVybmV0IEV4cGxvcmVyXG4gICAqIHRvIHJlbGVhc2UgdGhlIG1lbW9yeS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEhUTUxGaWxlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICh0aGlzLmlmcmFtZSl7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLmlmcmFtZS5zcmMgPSAnYWJvdXQ6YmxhbmsnO1xuICAgICAgfSBjYXRjaChlKXt9XG5cbiAgICAgIHRoaXMuZG9jID0gbnVsbDtcbiAgICAgIHRoaXMuaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5pZnJhbWUpO1xuICAgICAgdGhpcy5pZnJhbWUgPSBudWxsO1xuXG4gICAgICBDb2xsZWN0R2FyYmFnZSgpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIGVzdGFibGlzaGVkIGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9IENoYWluaW5nLlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBIVE1MRmlsZS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5kZXN0cm95KCk7XG4gICAgcmV0dXJuIGlvLlRyYW5zcG9ydC5YSFIucHJvdG90eXBlLmNsb3NlLmNhbGwodGhpcyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGlzIHRyYW5zcG9ydC4gVGhlIGJyb3dzZXJcbiAgICogbXVzdCBoYXZlIGFuIGBBYy4uLmVYT2JqZWN0YCBpbXBsZW1lbnRhdGlvbi5cbiAgICpcbiAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSFRNTEZpbGUuY2hlY2sgPSBmdW5jdGlvbiAoc29ja2V0KSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT0gXCJ1bmRlZmluZWRcIiAmJiAoWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKSkgaW4gd2luZG93KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciBhID0gbmV3IHdpbmRvd1soWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKSldKCdodG1sZmlsZScpO1xuICAgICAgICByZXR1cm4gYSAmJiBpby5UcmFuc3BvcnQuWEhSLmNoZWNrKHNvY2tldCk7XG4gICAgICB9IGNhdGNoKGUpe31cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBjcm9zcyBkb21haW4gcmVxdWVzdHMgYXJlIHN1cHBvcnRlZC5cbiAgICpcbiAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEhUTUxGaWxlLnhkb21haW5DaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyB3ZSBjYW4gcHJvYmFibHkgZG8gaGFuZGxpbmcgZm9yIHN1Yi1kb21haW5zLCB3ZSBzaG91bGRcbiAgICAvLyB0ZXN0IHRoYXQgaXQncyBjcm9zcyBkb21haW4gYnV0IGEgc3ViZG9tYWluIGhlcmVcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFkZCB0aGUgdHJhbnNwb3J0IHRvIHlvdXIgcHVibGljIGlvLnRyYW5zcG9ydHMgYXJyYXkuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBpby50cmFuc3BvcnRzLnB1c2goJ2h0bWxmaWxlJyk7XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvLlRyYW5zcG9ydCA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbik7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvLCBnbG9iYWwpIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzWyd4aHItcG9sbGluZyddID0gWEhSUG9sbGluZztcblxuICAvKipcbiAgICogVGhlIFhIUi1wb2xsaW5nIHRyYW5zcG9ydCB1c2VzIGxvbmcgcG9sbGluZyBYSFIgcmVxdWVzdHMgdG8gY3JlYXRlIGFcbiAgICogXCJwZXJzaXN0ZW50XCIgY29ubmVjdGlvbiB3aXRoIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBYSFJQb2xsaW5nICgpIHtcbiAgICBpby5UcmFuc3BvcnQuWEhSLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEluaGVyaXRzIGZyb20gWEhSIHRyYW5zcG9ydC5cbiAgICovXG5cbiAgaW8udXRpbC5pbmhlcml0KFhIUlBvbGxpbmcsIGlvLlRyYW5zcG9ydC5YSFIpO1xuXG4gIC8qKlxuICAgKiBNZXJnZSB0aGUgcHJvcGVydGllcyBmcm9tIFhIUiB0cmFuc3BvcnRcbiAgICovXG5cbiAgaW8udXRpbC5tZXJnZShYSFJQb2xsaW5nLCBpby5UcmFuc3BvcnQuWEhSKTtcblxuICAvKipcbiAgICogVHJhbnNwb3J0IG5hbWVcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWEhSUG9sbGluZy5wcm90b3R5cGUubmFtZSA9ICd4aHItcG9sbGluZyc7XG5cbiAgLyoqXG4gICAqIEluZGljYXRlcyB3aGV0aGVyIGhlYXJ0YmVhdHMgaXMgZW5hYmxlZCBmb3IgdGhpcyB0cmFuc3BvcnRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFhIUlBvbGxpbmcucHJvdG90eXBlLmhlYXJ0YmVhdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8qKiBcbiAgICogRXN0YWJsaXNoIGEgY29ubmVjdGlvbiwgZm9yIGlQaG9uZSBhbmQgQW5kcm9pZCB0aGlzIHdpbGwgYmUgZG9uZSBvbmNlIHRoZSBwYWdlXG4gICAqIGlzIGxvYWRlZC5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH0gQ2hhaW5pbmcuXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFhIUlBvbGxpbmcucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaW8uVHJhbnNwb3J0LlhIUi5wcm90b3R5cGUub3Blbi5jYWxsKHNlbGYpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvKipcbiAgICogU3RhcnRzIGEgWEhSIHJlcXVlc3QgdG8gd2FpdCBmb3IgaW5jb21pbmcgbWVzc2FnZXMuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBmdW5jdGlvbiBlbXB0eSAoKSB7fTtcblxuICBYSFJQb2xsaW5nLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmlzT3BlbikgcmV0dXJuO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gc3RhdGVDaGFuZ2UgKCkge1xuICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgIHRoaXMub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdHVzID09IDIwMCkge1xuICAgICAgICAgIHNlbGYub25EYXRhKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICBzZWxmLmdldCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG9ubG9hZCAoKSB7XG4gICAgICB0aGlzLm9ubG9hZCA9IGVtcHR5O1xuICAgICAgdGhpcy5vbmVycm9yID0gZW1wdHk7XG4gICAgICBzZWxmLnJldHJ5Q291bnRlciA9IDE7XG4gICAgICBzZWxmLm9uRGF0YSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICBzZWxmLmdldCgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBvbmVycm9yICgpIHtcbiAgICAgIHNlbGYucmV0cnlDb3VudGVyICsrO1xuICAgICAgaWYoIXNlbGYucmV0cnlDb3VudGVyIHx8IHNlbGYucmV0cnlDb3VudGVyID4gMykge1xuICAgICAgICBzZWxmLm9uQ2xvc2UoKTsgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2VsZi5nZXQoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy54aHIgPSB0aGlzLnJlcXVlc3QoKTtcblxuICAgIGlmIChnbG9iYWwuWERvbWFpblJlcXVlc3QgJiYgdGhpcy54aHIgaW5zdGFuY2VvZiBYRG9tYWluUmVxdWVzdCkge1xuICAgICAgdGhpcy54aHIub25sb2FkID0gb25sb2FkO1xuICAgICAgdGhpcy54aHIub25lcnJvciA9IG9uZXJyb3I7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IHN0YXRlQ2hhbmdlO1xuICAgIH1cblxuICAgIHRoaXMueGhyLnNlbmQobnVsbCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgdW5jbGVhbiBjbG9zZSBiZWhhdmlvci5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFhIUlBvbGxpbmcucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgaW8uVHJhbnNwb3J0LlhIUi5wcm90b3R5cGUub25DbG9zZS5jYWxsKHRoaXMpO1xuXG4gICAgaWYgKHRoaXMueGhyKSB7XG4gICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSB0aGlzLnhoci5vbmxvYWQgPSB0aGlzLnhoci5vbmVycm9yID0gZW1wdHk7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnhoci5hYm9ydCgpO1xuICAgICAgfSBjYXRjaChlKXt9XG4gICAgICB0aGlzLnhociA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBXZWJraXQgYmFzZWQgYnJvd3NlcnMgc2hvdyBhIGluZmluaXQgc3Bpbm5lciB3aGVuIHlvdSBzdGFydCBhIFhIUiByZXF1ZXN0XG4gICAqIGJlZm9yZSB0aGUgYnJvd3NlcnMgb25sb2FkIGV2ZW50IGlzIGNhbGxlZCBzbyB3ZSBuZWVkIHRvIGRlZmVyIG9wZW5pbmcgb2ZcbiAgICogdGhlIHRyYW5zcG9ydCB1bnRpbCB0aGUgb25sb2FkIGV2ZW50IGlzIGNhbGxlZC4gV3JhcHBpbmcgdGhlIGNiIGluIG91clxuICAgKiBkZWZlciBtZXRob2Qgc29sdmUgdGhpcy5cbiAgICpcbiAgICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldCBUaGUgc29ja2V0IGluc3RhbmNlIHRoYXQgbmVlZHMgYSB0cmFuc3BvcnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBYSFJQb2xsaW5nLnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uIChzb2NrZXQsIGZuKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaW8udXRpbC5kZWZlcihmdW5jdGlvbiAoKSB7XG4gICAgICBmbi5jYWxsKHNlbGYpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgdGhlIHRyYW5zcG9ydCB0byB5b3VyIHB1YmxpYyBpby50cmFuc3BvcnRzIGFycmF5LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgaW8udHJhbnNwb3J0cy5wdXNoKCd4aHItcG9sbGluZycpO1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpby5UcmFuc3BvcnQgOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4gICwgdGhpc1xuKTtcblxuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8sIGdsb2JhbCkge1xuICAvKipcbiAgICogVGhlcmUgaXMgYSB3YXkgdG8gaGlkZSB0aGUgbG9hZGluZyBpbmRpY2F0b3IgaW4gRmlyZWZveC4gSWYgeW91IGNyZWF0ZSBhbmRcbiAgICogcmVtb3ZlIGEgaWZyYW1lIGl0IHdpbGwgc3RvcCBzaG93aW5nIHRoZSBjdXJyZW50IGxvYWRpbmcgaW5kaWNhdG9yLlxuICAgKiBVbmZvcnR1bmF0ZWx5IHdlIGNhbid0IGZlYXR1cmUgZGV0ZWN0IHRoYXQgYW5kIFVBIHNuaWZmaW5nIGlzIGV2aWwuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICB2YXIgaW5kaWNhdG9yID0gZ2xvYmFsLmRvY3VtZW50ICYmIFwiTW96QXBwZWFyYW5jZVwiIGluXG4gICAgZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzWydqc29ucC1wb2xsaW5nJ10gPSBKU09OUFBvbGxpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBKU09OUCB0cmFuc3BvcnQgY3JlYXRlcyBhbiBwZXJzaXN0ZW50IGNvbm5lY3Rpb24gYnkgZHluYW1pY2FsbHlcbiAgICogaW5zZXJ0aW5nIGEgc2NyaXB0IHRhZyBpbiB0aGUgcGFnZS4gVGhpcyBzY3JpcHQgdGFnIHdpbGwgcmVjZWl2ZSB0aGVcbiAgICogaW5mb3JtYXRpb24gb2YgdGhlIFNvY2tldC5JTyBzZXJ2ZXIuIFdoZW4gbmV3IGluZm9ybWF0aW9uIGlzIHJlY2VpdmVkXG4gICAqIGl0IGNyZWF0ZXMgYSBuZXcgc2NyaXB0IHRhZyBmb3IgdGhlIG5ldyBkYXRhIHN0cmVhbS5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBleHRlbmRzIHtpby5UcmFuc3BvcnQueGhyLXBvbGxpbmd9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIEpTT05QUG9sbGluZyAoc29ja2V0KSB7XG4gICAgaW8uVHJhbnNwb3J0Wyd4aHItcG9sbGluZyddLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB0aGlzLmluZGV4ID0gaW8uai5sZW5ndGg7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBpby5qLnB1c2goZnVuY3Rpb24gKG1zZykge1xuICAgICAgc2VsZi5fKG1zZyk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEluaGVyaXRzIGZyb20gWEhSIHBvbGxpbmcgdHJhbnNwb3J0LlxuICAgKi9cblxuICBpby51dGlsLmluaGVyaXQoSlNPTlBQb2xsaW5nLCBpby5UcmFuc3BvcnRbJ3hoci1wb2xsaW5nJ10pO1xuXG4gIC8qKlxuICAgKiBUcmFuc3BvcnQgbmFtZVxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBKU09OUFBvbGxpbmcucHJvdG90eXBlLm5hbWUgPSAnanNvbnAtcG9sbGluZyc7XG5cbiAgLyoqXG4gICAqIFBvc3RzIGEgZW5jb2RlZCBtZXNzYWdlIHRvIHRoZSBTb2NrZXQuSU8gc2VydmVyIHVzaW5nIGFuIGlmcmFtZS5cbiAgICogVGhlIGlmcmFtZSBpcyB1c2VkIGJlY2F1c2Ugc2NyaXB0IHRhZ3MgY2FuIGNyZWF0ZSBQT1NUIGJhc2VkIHJlcXVlc3RzLlxuICAgKiBUaGUgaWZyYW1lIGlzIHBvc2l0aW9uZWQgb3V0c2lkZSBvZiB0aGUgdmlldyBzbyB0aGUgdXNlciBkb2VzIG5vdFxuICAgKiBub3RpY2UgaXQncyBleGlzdGVuY2UuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIEEgZW5jb2RlZCBtZXNzYWdlLlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgcXVlcnkgPSBpby51dGlsLnF1ZXJ5KFxuICAgICAgICAgICAgIHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnlcbiAgICAgICAgICAsICd0PScrICgrbmV3IERhdGUpICsgJyZpPScgKyB0aGlzLmluZGV4XG4gICAgICAgICk7XG5cbiAgICBpZiAoIXRoaXMuZm9ybSkge1xuICAgICAgdmFyIGZvcm0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmb3JtJylcbiAgICAgICAgLCBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGV4dGFyZWEnKVxuICAgICAgICAsIGlkID0gdGhpcy5pZnJhbWVJZCA9ICdzb2NrZXRpb19pZnJhbWVfJyArIHRoaXMuaW5kZXhcbiAgICAgICAgLCBpZnJhbWU7XG5cbiAgICAgIGZvcm0uY2xhc3NOYW1lID0gJ3NvY2tldGlvJztcbiAgICAgIGZvcm0uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgICAgZm9ybS5zdHlsZS50b3AgPSAnMHB4JztcbiAgICAgIGZvcm0uc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgICAgZm9ybS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZm9ybS50YXJnZXQgPSBpZDtcbiAgICAgIGZvcm0ubWV0aG9kID0gJ1BPU1QnO1xuICAgICAgZm9ybS5zZXRBdHRyaWJ1dGUoJ2FjY2VwdC1jaGFyc2V0JywgJ3V0Zi04Jyk7XG4gICAgICBhcmVhLm5hbWUgPSAnZCc7XG4gICAgICBmb3JtLmFwcGVuZENoaWxkKGFyZWEpO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb3JtKTtcblxuICAgICAgdGhpcy5mb3JtID0gZm9ybTtcbiAgICAgIHRoaXMuYXJlYSA9IGFyZWE7XG4gICAgfVxuXG4gICAgdGhpcy5mb3JtLmFjdGlvbiA9IHRoaXMucHJlcGFyZVVybCgpICsgcXVlcnk7XG5cbiAgICBmdW5jdGlvbiBjb21wbGV0ZSAoKSB7XG4gICAgICBpbml0SWZyYW1lKCk7XG4gICAgICBzZWxmLnNvY2tldC5zZXRCdWZmZXIoZmFsc2UpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0SWZyYW1lICgpIHtcbiAgICAgIGlmIChzZWxmLmlmcmFtZSkge1xuICAgICAgICBzZWxmLmZvcm0ucmVtb3ZlQ2hpbGQoc2VsZi5pZnJhbWUpO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBpZTYgZHluYW1pYyBpZnJhbWVzIHdpdGggdGFyZ2V0PVwiXCIgc3VwcG9ydCAodGhhbmtzIENocmlzIExhbWJhY2hlcilcbiAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnPGlmcmFtZSBuYW1lPVwiJysgc2VsZi5pZnJhbWVJZCArJ1wiPicpO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBpZnJhbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpZnJhbWUnKTtcbiAgICAgICAgaWZyYW1lLm5hbWUgPSBzZWxmLmlmcmFtZUlkO1xuICAgICAgfVxuXG4gICAgICBpZnJhbWUuaWQgPSBzZWxmLmlmcmFtZUlkO1xuXG4gICAgICBzZWxmLmZvcm0uYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgIHNlbGYuaWZyYW1lID0gaWZyYW1lO1xuICAgIH07XG5cbiAgICBpbml0SWZyYW1lKCk7XG5cbiAgICAvLyB3ZSB0ZW1wb3JhcmlseSBzdHJpbmdpZnkgdW50aWwgd2UgZmlndXJlIG91dCBob3cgdG8gcHJldmVudFxuICAgIC8vIGJyb3dzZXJzIGZyb20gdHVybmluZyBgXFxuYCBpbnRvIGBcXHJcXG5gIGluIGZvcm0gaW5wdXRzXG4gICAgdGhpcy5hcmVhLnZhbHVlID0gaW8uSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy5mb3JtLnN1Ym1pdCgpO1xuICAgIH0gY2F0Y2goZSkge31cblxuICAgIGlmICh0aGlzLmlmcmFtZS5hdHRhY2hFdmVudCkge1xuICAgICAgaWZyYW1lLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHNlbGYuaWZyYW1lLnJlYWR5U3RhdGUgPT0gJ2NvbXBsZXRlJykge1xuICAgICAgICAgIGNvbXBsZXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaWZyYW1lLm9ubG9hZCA9IGNvbXBsZXRlO1xuICAgIH1cblxuICAgIHRoaXMuc29ja2V0LnNldEJ1ZmZlcih0cnVlKTtcbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBKU09OUCBwb2xsIHRoYXQgY2FuIGJlIHVzZWQgdG8gbGlzdGVuXG4gICAqIGZvciBtZXNzYWdlcyBmcm9tIHRoZSBTb2NrZXQuSU8gc2VydmVyLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAsIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpXG4gICAgICAsIHF1ZXJ5ID0gaW8udXRpbC5xdWVyeShcbiAgICAgICAgICAgICB0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5XG4gICAgICAgICAgLCAndD0nKyAoK25ldyBEYXRlKSArICcmaT0nICsgdGhpcy5pbmRleFxuICAgICAgICApO1xuXG4gICAgaWYgKHRoaXMuc2NyaXB0KSB7XG4gICAgICB0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KTtcbiAgICAgIHRoaXMuc2NyaXB0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBzY3JpcHQuYXN5bmMgPSB0cnVlO1xuICAgIHNjcmlwdC5zcmMgPSB0aGlzLnByZXBhcmVVcmwoKSArIHF1ZXJ5O1xuICAgIHNjcmlwdC5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgfTtcblxuICAgIHZhciBpbnNlcnRBdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTtcbiAgICBpbnNlcnRBdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIGluc2VydEF0KTtcbiAgICB0aGlzLnNjcmlwdCA9IHNjcmlwdDtcblxuICAgIGlmIChpbmRpY2F0b3IpIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICAgICAgfSwgMTAwKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENhbGxiYWNrIGZ1bmN0aW9uIGZvciB0aGUgaW5jb21pbmcgbWVzc2FnZSBzdHJlYW0gZnJvbSB0aGUgU29ja2V0LklPIHNlcnZlci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgVGhlIG1lc3NhZ2VcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEpTT05QUG9sbGluZy5wcm90b3R5cGUuXyA9IGZ1bmN0aW9uIChtc2cpIHtcbiAgICB0aGlzLm9uRGF0YShtc2cpO1xuICAgIGlmICh0aGlzLmlzT3Blbikge1xuICAgICAgdGhpcy5nZXQoKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFRoZSBpbmRpY2F0b3IgaGFjayBvbmx5IHdvcmtzIGFmdGVyIG9ubG9hZFxuICAgKlxuICAgKiBAcGFyYW0ge1NvY2tldH0gc29ja2V0IFRoZSBzb2NrZXQgaW5zdGFuY2UgdGhhdCBuZWVkcyBhIHRyYW5zcG9ydFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2tcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEpTT05QUG9sbGluZy5wcm90b3R5cGUucmVhZHkgPSBmdW5jdGlvbiAoc29ja2V0LCBmbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAoIWluZGljYXRvcikgcmV0dXJuIGZuLmNhbGwodGhpcyk7XG5cbiAgICBpby51dGlsLmxvYWQoZnVuY3Rpb24gKCkge1xuICAgICAgZm4uY2FsbChzZWxmKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIGJyb3dzZXIgc3VwcG9ydHMgdGhpcyB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEpTT05QUG9sbGluZy5jaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJ2RvY3VtZW50JyBpbiBnbG9iYWw7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIGNyb3NzIGRvbWFpbiByZXF1ZXN0cyBhcmUgc3VwcG9ydGVkXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBKU09OUFBvbGxpbmcueGRvbWFpbkNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgdGhlIHRyYW5zcG9ydCB0byB5b3VyIHB1YmxpYyBpby50cmFuc3BvcnRzIGFycmF5LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgaW8udHJhbnNwb3J0cy5wdXNoKCdqc29ucC1wb2xsaW5nJyk7XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvLlRyYW5zcG9ydCA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbiAgLCB0aGlzXG4pO1xuXG5pZiAodHlwZW9mIGRlZmluZSA9PT0gXCJmdW5jdGlvblwiICYmIGRlZmluZS5hbWQpIHtcbiAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBpbzsgfSk7XG59XG59KSgpOyIsIi8vIEdlbmVyYXRlZCBieSBDb2ZmZWVTY3JpcHQgMS40LjBcbihmdW5jdGlvbigpIHtcbiAgdmFyIGZvcm1hdCwgbG9va3VwLCByZXNvbHZlLFxuICAgIF9fc2xpY2UgPSBbXS5zbGljZTtcblxuICBmb3JtYXQgPSBTdHJpbmcucHJvdG90eXBlLmZvcm1hdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBleHBsaWNpdCwgaWR4LCBpbXBsaWNpdCwgbWVzc2FnZSxcbiAgICAgIF90aGlzID0gdGhpcztcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gX19zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3M7XG4gICAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBfX3NsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICByZXR1cm4gX3RoaXMuZm9ybWF0LmFwcGx5KF90aGlzLCBhcmdzKTtcbiAgICAgIH07XG4gICAgfVxuICAgIGlkeCA9IDA7XG4gICAgZXhwbGljaXQgPSBpbXBsaWNpdCA9IGZhbHNlO1xuICAgIG1lc3NhZ2UgPSAnY2Fubm90IHN3aXRjaCBmcm9tIHt9IHRvIHt9IG51bWJlcmluZycuZm9ybWF0KCk7XG4gICAgcmV0dXJuIHRoaXMucmVwbGFjZSgvKFt7fV0pXFwxfFt7XSguKj8pKD86ISguKz8pKT9bfV0vZywgZnVuY3Rpb24obWF0Y2gsIGxpdGVyYWwsIGtleSwgdHJhbnNmb3JtZXIpIHtcbiAgICAgIHZhciBmbiwgdmFsdWUsIF9yZWYsIF9yZWYxLCBfcmVmMjtcbiAgICAgIGlmIChsaXRlcmFsKSB7XG4gICAgICAgIHJldHVybiBsaXRlcmFsO1xuICAgICAgfVxuICAgICAgaWYgKGtleS5sZW5ndGgpIHtcbiAgICAgICAgZXhwbGljaXQgPSB0cnVlO1xuICAgICAgICBpZiAoaW1wbGljaXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSgnaW1wbGljaXQnLCAnZXhwbGljaXQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSAoX3JlZiA9IGxvb2t1cChhcmdzLCBrZXkpKSAhPSBudWxsID8gX3JlZiA6ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1wbGljaXQgPSB0cnVlO1xuICAgICAgICBpZiAoZXhwbGljaXQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSgnZXhwbGljaXQnLCAnaW1wbGljaXQnKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWUgPSAoX3JlZjEgPSBhcmdzW2lkeCsrXSkgIT0gbnVsbCA/IF9yZWYxIDogJyc7XG4gICAgICB9XG4gICAgICB2YWx1ZSA9IHZhbHVlLnRvU3RyaW5nKCk7XG4gICAgICBpZiAoZm4gPSBmb3JtYXQudHJhbnNmb3JtZXJzW3RyYW5zZm9ybWVyXSkge1xuICAgICAgICByZXR1cm4gKF9yZWYyID0gZm4uY2FsbCh2YWx1ZSkpICE9IG51bGwgPyBfcmVmMiA6ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIGxvb2t1cCA9IGZ1bmN0aW9uKG9iamVjdCwga2V5KSB7XG4gICAgdmFyIG1hdGNoO1xuICAgIGlmICghL14oXFxkKykoWy5dfCQpLy50ZXN0KGtleSkpIHtcbiAgICAgIGtleSA9ICcwLicgKyBrZXk7XG4gICAgfVxuICAgIHdoaWxlIChtYXRjaCA9IC8oLis/KVsuXSguKykvLmV4ZWMoa2V5KSkge1xuICAgICAgb2JqZWN0ID0gcmVzb2x2ZShvYmplY3QsIG1hdGNoWzFdKTtcbiAgICAgIGtleSA9IG1hdGNoWzJdO1xuICAgIH1cbiAgICByZXR1cm4gcmVzb2x2ZShvYmplY3QsIGtleSk7XG4gIH07XG5cbiAgcmVzb2x2ZSA9IGZ1bmN0aW9uKG9iamVjdCwga2V5KSB7XG4gICAgdmFyIHZhbHVlO1xuICAgIHZhbHVlID0gb2JqZWN0W2tleV07XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIHZhbHVlLmNhbGwob2JqZWN0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfTtcblxuICBmb3JtYXQudHJhbnNmb3JtZXJzID0ge307XG5cbiAgZm9ybWF0LnZlcnNpb24gPSAnMC4yLjEnO1xuXG59KS5jYWxsKHRoaXMpO1xuIiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyJyk7XG52YXIgc2Y9cmVxdWlyZSgnc3RyaW5nLWZvcm1hdCcpO1xudmFyIGlvID0gcmVxdWlyZSgnc29ja2V0LmlvLWNsaWVudCcpO1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsIFtdKTtcblxuYXBwLmRpcmVjdGl2ZSgnbmdFbnRlcicsIGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG5cdFx0ZWxlbWVudC5iaW5kKFwia2V5ZG93biBrZXlwcmVzc1wiLCBmdW5jdGlvbihldmVudCkge1xuXHRcdFx0aWYgKGV2ZW50LndoaWNoID09PSAxMykge1xuXHRcdFx0XHRzY29wZS4kYXBwbHkoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0c2NvcGUuJGV2YWwoYXR0cnMubmdFbnRlcik7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9O1xufSk7XG5cbmFwcC5jb250cm9sbGVyKFwiQ29udHJvbGxlclwiLCBbXCIkc2NvcGVcIiwgXCIkaHR0cFwiLFxuXHRmdW5jdGlvbigkc2NvcGUsICRodHRwKSB7XG5cblx0XHQkc2NvcGUuc2NyZWVuc2hvdHM9e31cblxuXHRcdHZhciBzb2NrZXQgPSBpby5jb25uZWN0KCcvY2xpZW50Jyk7XG5cblx0XHRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpIHtcblx0XHRcdGNvbnNvbGUubG9nKCdjb25uZWN0ZWQnKTtcblxuXHRcdFx0c29ja2V0Lm9uKCdkb25lJywgZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0XHR2YXIgdGl0bGU9J3tuYW1lfSh7dmVyc2lvbn0te29zfSknLmZvcm1hdChkYXRhLmJyb3dzZXIpO1xuXHRcdFx0XHRvcGVuU2NyZWVuc2hvdCh0aXRsZSxkYXRhLnNjcmVlbnNob3QpO1xuXHRcdFx0fSk7XG5cblxuXHRcdFx0c29ja2V0Lm9uKCdjb21wbGV0ZScsIGZ1bmN0aW9uKGRhdGEpIHtcblxuXHRcdFx0fSlcblx0XHRcdHNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uKCkge1xuXG5cdFx0XHR9KTtcblxuXHRcdH0pO1xuXG5cdFx0JHNjb3BlLnRlc3QgPSBmdW5jdGlvbih1cmwpIHtcblx0XHRcdGlmKHVybD09PSdyZWxvYWQnKXtcblx0XHRcdFx0c29ja2V0LmVtaXQoJ3JlbG9hZCcpO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWlzVmFsaWRVcmwodXJsKSkge1xuXHRcdFx0XHRhbGVydCgnaW52YWxpZCB1cmwnKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0Y29uc29sZS5sb2codXJsKTtcblx0XHRcdHNvY2tldC5lbWl0KCd0ZXN0Jywge1xuXHRcdFx0XHR1cmw6IHVybCxcblx0XHRcdFx0cmVxdWlyZW1lbnQ6IHtcblx0XHRcdFx0XHRuYW1lOiAnJyxcblx0XHRcdFx0XHR2ZXJzaW9uOiAnKicsXG5cdFx0XHRcdFx0c2NyZWVuc2hvdDogdHJ1ZVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQkaHR0cC5nZXQoJy9hcGkvd29ya2VyJykuc3VjY2VzcyhmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHQkc2NvcGUud29ya2VycyA9IGRhdGE7XG5cdFx0fSlcblxuXHRcdGZ1bmN0aW9uIG9wZW5TY3JlZW5zaG90KHRpdGxlLHNjcmVlbnNob3Qpe1xuXHRcdFx0dmFyIGRvYz13aW5kb3cub3BlbignX2JsYW5rJykuZG9jdW1lbnQ7XG5cdFx0XHR2YXIgaHRtbD0nPGh0bWw+PGJvZHk+JytzY3JlZW5zaG90Kyc8L2JvZHk+PC9odG1sPic7XG5cdFx0XHRkb2Mud3JpdGUoaHRtbCk7XG5cdFx0XHRkb2MudGl0bGU9dGl0bGU7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gaXNWYWxpZFVybCh1cmwpIHtcblx0XHRcdHJldHVybiAvKGZ0cHxodHRwfGh0dHBzKTpcXC9cXC8oXFx3Kzp7MCwxfVxcdypAKT8oXFxTKykoOlswLTldKyk/KFxcL3xcXC8oW1xcdyMhOi4/Kz0mJUAhXFwtXFwvXSkpPy8udGVzdCh1cmwpO1xuXHRcdH1cblxuXHR9XG5dKTsiXX0=
