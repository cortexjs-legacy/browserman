(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*!
  * Bowser - a browser detector
  * https://github.com/ded/bowser
  * MIT License | (c) Dustin Diaz 2014
  */

!function (name, definition) {
  if (typeof module != 'undefined' && module.exports) module.exports['browser'] = definition()
  else if (typeof define == 'function') define(definition)
  else this[name] = definition()
}('bowser', function () {
  /**
    * See useragents.js for examples of navigator.userAgent
    */

  var t = true

  function detect(ua) {

    function getFirstMatch(regex) {
      var match = ua.match(regex);
      return (match && match.length > 1 && match[1]) || '';
    }

    var iosdevice = getFirstMatch(/(ipod|iphone|ipad)/i).toLowerCase()
      , likeAndroid = /like android/i.test(ua)
      , android = !likeAndroid && /android/i.test(ua)
      , versionIdentifier = getFirstMatch(/version\/(\d+(\.\d+)?)/i)
      , tablet = /tablet/i.test(ua)
      , mobile = !tablet && /[^-]mobi/i.test(ua)
      , result

    if (/opera|opr/i.test(ua)) {
      result = {
        name: 'Opera'
      , opera: t
      , version: versionIdentifier || getFirstMatch(/(?:opera|opr)[\s\/](\d+(\.\d+)?)/i)
      }
    }
    else if (/windows phone/i.test(ua)) {
      result = {
        name: 'Windows Phone'
      , windowsphone: t
      , msie: t
      , version: getFirstMatch(/iemobile\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/msie|trident/i.test(ua)) {
      result = {
        name: 'Internet Explorer'
      , msie: t
      , version: getFirstMatch(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      }
    }
    else if (/chrome|crios|crmo/i.test(ua)) {
      result = {
        name: 'Chrome'
      , chrome: t
      , version: getFirstMatch(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      }
    }
    else if (iosdevice) {
      result = {
        name : iosdevice == 'iphone' ? 'iPhone' : iosdevice == 'ipad' ? 'iPad' : 'iPod'
      }
      // WTF: version is not part of user agent in web apps
      if (versionIdentifier) {
        result.version = versionIdentifier
      }
    }
    else if (/sailfish/i.test(ua)) {
      result = {
        name: 'Sailfish'
      , sailfish: t
      , version: getFirstMatch(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/seamonkey\//i.test(ua)) {
      result = {
        name: 'SeaMonkey'
      , seamonkey: t
      , version: getFirstMatch(/seamonkey\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/firefox|iceweasel/i.test(ua)) {
      result = {
        name: 'Firefox'
      , firefox: t
      , version: getFirstMatch(/(?:firefox|iceweasel)[ \/](\d+(\.\d+)?)/i)
      }
      if (/\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(ua)) {
        result.firefoxos = t
      }
    }
    else if (/silk/i.test(ua)) {
      result =  {
        name: 'Amazon Silk'
      , silk: t
      , version : getFirstMatch(/silk\/(\d+(\.\d+)?)/i)
      }
    }
    else if (android) {
      result = {
        name: 'Android'
      , version: versionIdentifier
      }
    }
    else if (/phantom/i.test(ua)) {
      result = {
        name: 'PhantomJS'
      , phantom: t
      , version: getFirstMatch(/phantomjs\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/blackberry|\bbb\d+/i.test(ua) || /rim\stablet/i.test(ua)) {
      result = {
        name: 'BlackBerry'
      , blackberry: t
      , version: versionIdentifier || getFirstMatch(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      }
    }
    else if (/(web|hpw)os/i.test(ua)) {
      result = {
        name: 'WebOS'
      , webos: t
      , version: versionIdentifier || getFirstMatch(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      };
      /touchpad\//i.test(ua) && (result.touchpad = t)
    }
    else if (/bada/i.test(ua)) {
      result = {
        name: 'Bada'
      , bada: t
      , version: getFirstMatch(/dolfin\/(\d+(\.\d+)?)/i)
      };
    }
    else if (/tizen/i.test(ua)) {
      result = {
        name: 'Tizen'
      , tizen: t
      , version: getFirstMatch(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || versionIdentifier
      };
    }
    else if (/safari/i.test(ua)) {
      result = {
        name: 'Safari'
      , safari: t
      , version: versionIdentifier
      }
    }
    else result = {}

    // set webkit or gecko flag for browsers based on these engines
    if (/(apple)?webkit/i.test(ua)) {
      result.name = result.name || "Webkit"
      result.webkit = t
      if (!result.version && versionIdentifier) {
        result.version = versionIdentifier
      }
    } else if (!result.opera && /gecko\//i.test(ua)) {
      result.name = result.name || "Gecko"
      result.gecko = t
      result.version = result.version || getFirstMatch(/gecko\/(\d+(\.\d+)?)/i)
    }

    // set OS flags for platforms that have multiple browsers
    if (android || result.silk) {
      result.android = t
    } else if (iosdevice) {
      result[iosdevice] = t
      result.ios = t
    }

    // OS version extraction
    var osVersion = '';
    if (iosdevice) {
      osVersion = getFirstMatch(/os (\d+([_\s]\d+)*) like mac os x/i);
      osVersion = osVersion.replace(/[_\s]/g, '.');
    } else if (android) {
      osVersion = getFirstMatch(/android[ \/-](\d+(\.\d+)*)/i);
    } else if (result.windowsphone) {
      osVersion = getFirstMatch(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i);
    } else if (result.webos) {
      osVersion = getFirstMatch(/(?:web|hpw)os\/(\d+(\.\d+)*)/i);
    } else if (result.blackberry) {
      osVersion = getFirstMatch(/rim\stablet\sos\s(\d+(\.\d+)*)/i);
    } else if (result.bada) {
      osVersion = getFirstMatch(/bada\/(\d+(\.\d+)*)/i);
    } else if (result.tizen) {
      osVersion = getFirstMatch(/tizen[\/\s](\d+(\.\d+)*)/i);
    }
    if (osVersion) {
      result.osversion = osVersion;
    }

    // device type extraction
    var osMajorVersion = osVersion.split('.')[0];
    if (tablet || iosdevice == 'ipad' || (android && (osMajorVersion == 3 || (osMajorVersion == 4 && !mobile))) || result.silk) {
      result.tablet = t
    } else if (mobile || iosdevice == 'iphone' || iosdevice == 'ipod' || android || result.blackberry || result.webos || result.bada) {
      result.mobile = t
    }

    // Graded Browser Support
    // http://developer.yahoo.com/yui/articles/gbs
    if ((result.msie && result.version >= 10) ||
        (result.chrome && result.version >= 20) ||
        (result.firefox && result.version >= 20.0) ||
        (result.safari && result.version >= 6) ||
        (result.opera && result.version >= 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] >= 6)
        ) {
      result.a = t;
    }
    else if ((result.msie && result.version < 10) ||
        (result.chrome && result.version < 20) ||
        (result.firefox && result.version < 20.0) ||
        (result.safari && result.version < 6) ||
        (result.opera && result.version < 10.0) ||
        (result.ios && result.osversion && result.osversion.split(".")[0] < 6)
        ) {
      result.c = t
    } else result.x = t

    return result
  }

  var bowser = detect(typeof navigator !== 'undefined' ? navigator.userAgent : '')


  /*
   * Set our detect method to the main bowser object so we can
   * reuse it to test other user agents.
   * This is needed to implement future tests.
   */
  bowser._detect = detect;

  return bowser
});

},{}],2:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

// If obj.hasOwnProperty has been overridden, then calling
// obj.hasOwnProperty(prop) will break.
// See: https://github.com/joyent/node/issues/1707
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

module.exports = function(qs, sep, eq, options) {
  sep = sep || '&';
  eq = eq || '=';
  var obj = {};

  if (typeof qs !== 'string' || qs.length === 0) {
    return obj;
  }

  var regexp = /\+/g;
  qs = qs.split(sep);

  var maxKeys = 1000;
  if (options && typeof options.maxKeys === 'number') {
    maxKeys = options.maxKeys;
  }

  var len = qs.length;
  // maxKeys <= 0 means that we should not limit keys count
  if (maxKeys > 0 && len > maxKeys) {
    len = maxKeys;
  }

  for (var i = 0; i < len; ++i) {
    var x = qs[i].replace(regexp, '%20'),
        idx = x.indexOf(eq),
        kstr, vstr, k, v;

    if (idx >= 0) {
      kstr = x.substr(0, idx);
      vstr = x.substr(idx + 1);
    } else {
      kstr = x;
      vstr = '';
    }

    k = decodeURIComponent(kstr);
    v = decodeURIComponent(vstr);

    if (!hasOwnProperty(obj, k)) {
      obj[k] = v;
    } else if (isArray(obj[k])) {
      obj[k].push(v);
    } else {
      obj[k] = [obj[k], v];
    }
  }

  return obj;
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

},{}],3:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var stringifyPrimitive = function(v) {
  switch (typeof v) {
    case 'string':
      return v;

    case 'boolean':
      return v ? 'true' : 'false';

    case 'number':
      return isFinite(v) ? v : '';

    default:
      return '';
  }
};

module.exports = function(obj, sep, eq, name) {
  sep = sep || '&';
  eq = eq || '=';
  if (obj === null) {
    obj = undefined;
  }

  if (typeof obj === 'object') {
    return map(objectKeys(obj), function(k) {
      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
      if (isArray(obj[k])) {
        return obj[k].map(function(v) {
          return ks + encodeURIComponent(stringifyPrimitive(v));
        }).join(sep);
      } else {
        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
      }
    }).join(sep);

  }

  if (!name) return '';
  return encodeURIComponent(stringifyPrimitive(name)) + eq +
         encodeURIComponent(stringifyPrimitive(obj));
};

var isArray = Array.isArray || function (xs) {
  return Object.prototype.toString.call(xs) === '[object Array]';
};

function map (xs, f) {
  if (xs.map) return xs.map(f);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    res.push(f(xs[i], i));
  }
  return res;
}

var objectKeys = Object.keys || function (obj) {
  var res = [];
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) res.push(key);
  }
  return res;
};

},{}],4:[function(require,module,exports){
'use strict';

exports.decode = exports.parse = require('./decode');
exports.encode = exports.stringify = require('./encode');

},{"./decode":2,"./encode":3}],5:[function(require,module,exports){
var io = require('./lib/socket.io');
var browser = require('bowser').browser;
var querystring = require('querystring');
var html2canvas = require('./lib/html2canvas');
var canvas2image = require('./lib/canvas2image');

function Browserman(options) {
	console.log(options);
	var options = options || {};
	this.type = options.type || 'mocha',
	this.instance = options.instance || mocha;
	this.server = options.server || 'localhost:9000';
	this.reporter = {
		'mocha': require('./reporter/mocha'),
		'plain': require('./reporter/plain')
	}
}

Browserman.prototype.init = function() {

	console.log('init browserman');

	var query = querystring.parse(location.search.replace('?', ''));
	var jobId = query.browserman_jobid;
	var needsSceenshot = query.browserman_screenshot=='false'?false:true;
	var connected = false;
	var self = this;

	if (!jobId) {
		return;
	}

	var socket = io.connect('http://' + this.server + '/tester');
	socket.on('connect', function() {
		connected = true;
		console.log('connected to server');
	});
	var result = {
		jobId: jobId,
		browser: {
			name: browser.name.toLowerCase(),
			version: browser.version,
			os:getOS()
		},
		data: {
			passes: [],
			failures: []
		}
	};
	self.reporter[self.type].run({
		instance: self.instance,
		pass: function(data) {
			result.data.passes.push(data);
		},
		fail: function(data) {
			result.data.failures.push(data);
		},
		end: function() {
			var interval = setInterval(function() {
				if (!connected) {
					return;
				}
				if (needsSceenshot) {
					html2canvas(document.body, {
						onrendered: function(canvas) {
							var img = canvas2image.saveAsJPEG(canvas, true);
							result.screenshot = img.outerHTML;
							socket.emit('done', result);
							setTimeout(window.close, 500);
						}
					});
				} else {
					socket.emit('done', result);
					setTimeout(window.close, 500);
				}
				clearInterval(interval);
			}, 200);
		}
	});
};

function getOS() {
	var os = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) os = "window";
	if (navigator.appVersion.indexOf("Mac") != -1) os = "mac";
	if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
	if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
	return os;
} 

var server=document.getElementById('browserman').getAttribute('data-server');
if (window.mocha) {
	new Browserman({
		type: 'mocha',
		instance: window.mocha,
		server:	server

	}).init();
} else {
	new Browserman({
		type: 'plain',
		instance: window,
		server:server
	}).init();
}
},{"./lib/canvas2image":6,"./lib/html2canvas":7,"./lib/socket.io":8,"./reporter/mocha":9,"./reporter/plain":10,"bowser":1,"querystring":4}],6:[function(require,module,exports){
/*
 * Canvas2Image v0.1
 * Copyright (c) 2008 Jacob Seidelin, jseidelin@nihilogic.dk
 * MIT License [http://www.opensource.org/licenses/mit-license.php]
 */

module.exports = (function() {

	// check if we have canvas support
	var bHasCanvas = false;
	var oCanvas = document.createElement("canvas");
	if (oCanvas.getContext("2d")) {
		bHasCanvas = true;
	}

	// no canvas, bail out.
	if (!bHasCanvas) {
		return {
			saveAsBMP : function(){},
			saveAsPNG : function(){},
			saveAsJPEG : function(){}
		}
	}

	var bHasImageData = !!(oCanvas.getContext("2d").getImageData);
	var bHasDataURL = !!(oCanvas.toDataURL);
	var bHasBase64 = !!(window.btoa);

	var strDownloadMime = "image/octet-stream";

	// ok, we're good
	var readCanvasData = function(oCanvas) {
		var iWidth = parseInt(oCanvas.width);
		var iHeight = parseInt(oCanvas.height);
		return oCanvas.getContext("2d").getImageData(0,0,iWidth,iHeight);
	}

	// base64 encodes either a string or an array of charcodes
	var encodeData = function(data) {
		var strData = "";
		if (typeof data == "string") {
			strData = data;
		} else {
			var aData = data;
			for (var i=0;i<aData.length;i++) {
				strData += String.fromCharCode(aData[i]);
			}
		}
		return btoa(strData);
	}

	// creates a base64 encoded string containing BMP data
	// takes an imagedata object as argument
	var createBMP = function(oData) {
		var aHeader = [];
	
		var iWidth = oData.width;
		var iHeight = oData.height;

		aHeader.push(0x42); // magic 1
		aHeader.push(0x4D); 
	
		var iFileSize = iWidth*iHeight*3 + 54; // total header size = 54 bytes
		aHeader.push(iFileSize % 256); iFileSize = Math.floor(iFileSize / 256);
		aHeader.push(iFileSize % 256); iFileSize = Math.floor(iFileSize / 256);
		aHeader.push(iFileSize % 256); iFileSize = Math.floor(iFileSize / 256);
		aHeader.push(iFileSize % 256);

		aHeader.push(0); // reserved
		aHeader.push(0);
		aHeader.push(0); // reserved
		aHeader.push(0);

		aHeader.push(54); // dataoffset
		aHeader.push(0);
		aHeader.push(0);
		aHeader.push(0);

		var aInfoHeader = [];
		aInfoHeader.push(40); // info header size
		aInfoHeader.push(0);
		aInfoHeader.push(0);
		aInfoHeader.push(0);

		var iImageWidth = iWidth;
		aInfoHeader.push(iImageWidth % 256); iImageWidth = Math.floor(iImageWidth / 256);
		aInfoHeader.push(iImageWidth % 256); iImageWidth = Math.floor(iImageWidth / 256);
		aInfoHeader.push(iImageWidth % 256); iImageWidth = Math.floor(iImageWidth / 256);
		aInfoHeader.push(iImageWidth % 256);
	
		var iImageHeight = iHeight;
		aInfoHeader.push(iImageHeight % 256); iImageHeight = Math.floor(iImageHeight / 256);
		aInfoHeader.push(iImageHeight % 256); iImageHeight = Math.floor(iImageHeight / 256);
		aInfoHeader.push(iImageHeight % 256); iImageHeight = Math.floor(iImageHeight / 256);
		aInfoHeader.push(iImageHeight % 256);
	
		aInfoHeader.push(1); // num of planes
		aInfoHeader.push(0);
	
		aInfoHeader.push(24); // num of bits per pixel
		aInfoHeader.push(0);
	
		aInfoHeader.push(0); // compression = none
		aInfoHeader.push(0);
		aInfoHeader.push(0);
		aInfoHeader.push(0);
	
		var iDataSize = iWidth*iHeight*3; 
		aInfoHeader.push(iDataSize % 256); iDataSize = Math.floor(iDataSize / 256);
		aInfoHeader.push(iDataSize % 256); iDataSize = Math.floor(iDataSize / 256);
		aInfoHeader.push(iDataSize % 256); iDataSize = Math.floor(iDataSize / 256);
		aInfoHeader.push(iDataSize % 256); 
	
		for (var i=0;i<16;i++) {
			aInfoHeader.push(0);	// these bytes not used
		}
	
		var iPadding = (4 - ((iWidth * 3) % 4)) % 4;

		var aImgData = oData.data;

		var strPixelData = "";
		var y = iHeight;
		do {
			var iOffsetY = iWidth*(y-1)*4;
			var strPixelRow = "";
			for (var x=0;x<iWidth;x++) {
				var iOffsetX = 4*x;

				strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX+2]);
				strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX+1]);
				strPixelRow += String.fromCharCode(aImgData[iOffsetY+iOffsetX]);
			}
			for (var c=0;c<iPadding;c++) {
				strPixelRow += String.fromCharCode(0);
			}
			strPixelData += strPixelRow;
		} while (--y);

		var strEncoded = encodeData(aHeader.concat(aInfoHeader)) + encodeData(strPixelData);

		return strEncoded;
	}


	// sends the generated file to the client
	var saveFile = function(strData) {
		document.location.href = strData;
	}

	var makeDataURI = function(strData, strMime) {
		return "data:" + strMime + ";base64," + strData;
	}

	// generates a <img> object containing the imagedata
	var makeImageObject = function(strSource) {
		var oImgElement = document.createElement("img");
		oImgElement.src = strSource;
		return oImgElement;
	}

	var scaleCanvas = function(oCanvas, iWidth, iHeight) {
		if (iWidth && iHeight) {
			var oSaveCanvas = document.createElement("canvas");
			oSaveCanvas.width = iWidth;
			oSaveCanvas.height = iHeight;
			oSaveCanvas.style.width = iWidth+"px";
			oSaveCanvas.style.height = iHeight+"px";

			var oSaveCtx = oSaveCanvas.getContext("2d");

			oSaveCtx.drawImage(oCanvas, 0, 0, oCanvas.width, oCanvas.height, 0, 0, iWidth, iHeight);
			return oSaveCanvas;
		}
		return oCanvas;
	}

	return {

		saveAsPNG : function(oCanvas, bReturnImg, iWidth, iHeight) {
			if (!bHasDataURL) {
				return false;
			}
			var oScaledCanvas = scaleCanvas(oCanvas, iWidth, iHeight);
			var strData = oScaledCanvas.toDataURL("image/png");
			if (bReturnImg) {
				return makeImageObject(strData);
			} else {
				saveFile(strData.replace("image/png", strDownloadMime));
			}
			return true;
		},

		saveAsJPEG : function(oCanvas, bReturnImg, iWidth, iHeight) {
			if (!bHasDataURL) {
				return false;
			}

			var oScaledCanvas = scaleCanvas(oCanvas, iWidth, iHeight);
			var strMime = "image/jpeg";
			var strData = oScaledCanvas.toDataURL(strMime);
	
			// check if browser actually supports jpeg by looking for the mime type in the data uri.
			// if not, return false
			if (strData.indexOf(strMime) != 5) {
				return false;
			}

			if (bReturnImg) {
				return makeImageObject(strData);
			} else {
				saveFile(strData.replace(strMime, strDownloadMime));
			}
			return true;
		},

		saveAsBMP : function(oCanvas, bReturnImg, iWidth, iHeight) {
			if (!(bHasImageData && bHasBase64)) {
				return false;
			}

			var oScaledCanvas = scaleCanvas(oCanvas, iWidth, iHeight);

			var oData = readCanvasData(oScaledCanvas);
			var strImgData = createBMP(oData);
			if (bReturnImg) {
				return makeImageObject(makeDataURI(strImgData, "image/bmp"));
			} else {
				saveFile(makeDataURI(strImgData, strDownloadMime));
			}
			return true;
		}
	};

})();
},{}],7:[function(require,module,exports){
/*
  html2canvas 0.4.1 <http://html2canvas.hertzen.com>
  Copyright (c) 2013 Niklas von Hertzen

  Released under MIT License
*/

(function(window, document, undefined){

"use strict";

var _html2canvas = {},
previousElement,
computedCSS,
html2canvas;

_html2canvas.Util = {};

_html2canvas.Util.log = function(a) {
  if (_html2canvas.logging && window.console && window.console.log) {
    window.console.log(a);
  }
};

_html2canvas.Util.trimText = (function(isNative){
  return function(input) {
    return isNative ? isNative.apply(input) : ((input || '') + '').replace( /^\s+|\s+$/g , '' );
  };
})(String.prototype.trim);

_html2canvas.Util.asFloat = function(v) {
  return parseFloat(v);
};

(function() {
  // TODO: support all possible length values
  var TEXT_SHADOW_PROPERTY = /((rgba|rgb)\([^\)]+\)(\s-?\d+px){0,})/g;
  var TEXT_SHADOW_VALUES = /(-?\d+px)|(#.+)|(rgb\(.+\))|(rgba\(.+\))/g;
  _html2canvas.Util.parseTextShadows = function (value) {
    if (!value || value === 'none') {
      return [];
    }

    // find multiple shadow declarations
    var shadows = value.match(TEXT_SHADOW_PROPERTY),
      results = [];
    for (var i = 0; shadows && (i < shadows.length); i++) {
      var s = shadows[i].match(TEXT_SHADOW_VALUES);
      results.push({
        color: s[0],
        offsetX: s[1] ? s[1].replace('px', '') : 0,
        offsetY: s[2] ? s[2].replace('px', '') : 0,
        blur: s[3] ? s[3].replace('px', '') : 0
      });
    }
    return results;
  };
})();


_html2canvas.Util.parseBackgroundImage = function (value) {
    var whitespace = ' \r\n\t',
        method, definition, prefix, prefix_i, block, results = [],
        c, mode = 0, numParen = 0, quote, args;

    var appendResult = function(){
        if(method) {
            if(definition.substr( 0, 1 ) === '"') {
                definition = definition.substr( 1, definition.length - 2 );
            }
            if(definition) {
                args.push(definition);
            }
            if(method.substr( 0, 1 ) === '-' &&
                    (prefix_i = method.indexOf( '-', 1 ) + 1) > 0) {
                prefix = method.substr( 0, prefix_i);
                method = method.substr( prefix_i );
            }
            results.push({
                prefix: prefix,
                method: method.toLowerCase(),
                value: block,
                args: args
            });
        }
        args = []; //for some odd reason, setting .length = 0 didn't work in safari
        method =
            prefix =
            definition =
            block = '';
    };

    appendResult();
    for(var i = 0, ii = value.length; i<ii; i++) {
        c = value[i];
        if(mode === 0 && whitespace.indexOf( c ) > -1){
            continue;
        }
        switch(c) {
            case '"':
                if(!quote) {
                    quote = c;
                }
                else if(quote === c) {
                    quote = null;
                }
                break;

            case '(':
                if(quote) { break; }
                else if(mode === 0) {
                    mode = 1;
                    block += c;
                    continue;
                } else {
                    numParen++;
                }
                break;

            case ')':
                if(quote) { break; }
                else if(mode === 1) {
                    if(numParen === 0) {
                        mode = 0;
                        block += c;
                        appendResult();
                        continue;
                    } else {
                        numParen--;
                    }
                }
                break;

            case ',':
                if(quote) { break; }
                else if(mode === 0) {
                    appendResult();
                    continue;
                }
                else if (mode === 1) {
                    if(numParen === 0 && !method.match(/^url$/i)) {
                        args.push(definition);
                        definition = '';
                        block += c;
                        continue;
                    }
                }
                break;
        }

        block += c;
        if(mode === 0) { method += c; }
        else { definition += c; }
    }
    appendResult();

    return results;
};

_html2canvas.Util.Bounds = function (element) {
  var clientRect, bounds = {};

  if (element.getBoundingClientRect){
    clientRect = element.getBoundingClientRect();

    // TODO add scroll position to bounds, so no scrolling of window necessary
    bounds.top = clientRect.top;
    bounds.bottom = clientRect.bottom || (clientRect.top + clientRect.height);
    bounds.left = clientRect.left;

    bounds.width = element.offsetWidth;
    bounds.height = element.offsetHeight;
  }

  return bounds;
};

// TODO ideally, we'd want everything to go through this function instead of Util.Bounds,
// but would require further work to calculate the correct positions for elements with offsetParents
_html2canvas.Util.OffsetBounds = function (element) {
  var parent = element.offsetParent ? _html2canvas.Util.OffsetBounds(element.offsetParent) : {top: 0, left: 0};

  return {
    top: element.offsetTop + parent.top,
    bottom: element.offsetTop + element.offsetHeight + parent.top,
    left: element.offsetLeft + parent.left,
    width: element.offsetWidth,
    height: element.offsetHeight
  };
};

function toPX(element, attribute, value ) {
    var rsLeft = element.runtimeStyle && element.runtimeStyle[attribute],
        left,
        style = element.style;

    // Check if we are not dealing with pixels, (Opera has issues with this)
    // Ported from jQuery css.js
    // From the awesome hack by Dean Edwards
    // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

    // If we're not dealing with a regular pixel number
    // but a number that has a weird ending, we need to convert it to pixels

    if ( !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test( value ) && /^-?\d/.test(value) ) {
        // Remember the original values
        left = style.left;

        // Put in the new values to get a computed value out
        if (rsLeft) {
            element.runtimeStyle.left = element.currentStyle.left;
        }
        style.left = attribute === "fontSize" ? "1em" : (value || 0);
        value = style.pixelLeft + "px";

        // Revert the changed values
        style.left = left;
        if (rsLeft) {
            element.runtimeStyle.left = rsLeft;
        }
    }

    if (!/^(thin|medium|thick)$/i.test(value)) {
        return Math.round(parseFloat(value)) + "px";
    }

    return value;
}

function asInt(val) {
    return parseInt(val, 10);
}

function parseBackgroundSizePosition(value, element, attribute, index) {
    value = (value || '').split(',');
    value = value[index || 0] || value[0] || 'auto';
    value = _html2canvas.Util.trimText(value).split(' ');

    if(attribute === 'backgroundSize' && (!value[0] || value[0].match(/cover|contain|auto/))) {
        //these values will be handled in the parent function
    } else {
        value[0] = (value[0].indexOf( "%" ) === -1) ? toPX(element, attribute + "X", value[0]) : value[0];
        if(value[1] === undefined) {
            if(attribute === 'backgroundSize') {
                value[1] = 'auto';
                return value;
            } else {
                // IE 9 doesn't return double digit always
                value[1] = value[0];
            }
        }
        value[1] = (value[1].indexOf("%") === -1) ? toPX(element, attribute + "Y", value[1]) : value[1];
    }
    return value;
}

_html2canvas.Util.getCSS = function (element, attribute, index) {
    if (previousElement !== element) {
      computedCSS = document.defaultView.getComputedStyle(element, null);
    }

    var value = computedCSS[attribute];

    if (/^background(Size|Position)$/.test(attribute)) {
        return parseBackgroundSizePosition(value, element, attribute, index);
    } else if (/border(Top|Bottom)(Left|Right)Radius/.test(attribute)) {
      var arr = value.split(" ");
      if (arr.length <= 1) {
          arr[1] = arr[0];
      }
      return arr.map(asInt);
    }

  return value;
};

_html2canvas.Util.resizeBounds = function( current_width, current_height, target_width, target_height, stretch_mode ){
  var target_ratio = target_width / target_height,
    current_ratio = current_width / current_height,
    output_width, output_height;

  if(!stretch_mode || stretch_mode === 'auto') {
    output_width = target_width;
    output_height = target_height;
  } else if(target_ratio < current_ratio ^ stretch_mode === 'contain') {
    output_height = target_height;
    output_width = target_height * current_ratio;
  } else {
    output_width = target_width;
    output_height = target_width / current_ratio;
  }

  return {
    width: output_width,
    height: output_height
  };
};

function backgroundBoundsFactory( prop, el, bounds, image, imageIndex, backgroundSize ) {
    var bgposition =  _html2canvas.Util.getCSS( el, prop, imageIndex ) ,
    topPos,
    left,
    percentage,
    val;

    if (bgposition.length === 1){
      val = bgposition[0];

      bgposition = [];

      bgposition[0] = val;
      bgposition[1] = val;
    }

    if (bgposition[0].toString().indexOf("%") !== -1){
      percentage = (parseFloat(bgposition[0])/100);
      left = bounds.width * percentage;
      if(prop !== 'backgroundSize') {
        left -= (backgroundSize || image).width*percentage;
      }
    } else {
      if(prop === 'backgroundSize') {
        if(bgposition[0] === 'auto') {
          left = image.width;
        } else {
          if (/contain|cover/.test(bgposition[0])) {
            var resized = _html2canvas.Util.resizeBounds(image.width, image.height, bounds.width, bounds.height, bgposition[0]);
            left = resized.width;
            topPos = resized.height;
          } else {
            left = parseInt(bgposition[0], 10);
          }
        }
      } else {
        left = parseInt( bgposition[0], 10);
      }
    }


    if(bgposition[1] === 'auto') {
      topPos = left / image.width * image.height;
    } else if (bgposition[1].toString().indexOf("%") !== -1){
      percentage = (parseFloat(bgposition[1])/100);
      topPos =  bounds.height * percentage;
      if(prop !== 'backgroundSize') {
        topPos -= (backgroundSize || image).height * percentage;
      }

    } else {
      topPos = parseInt(bgposition[1],10);
    }

    return [left, topPos];
}

_html2canvas.Util.BackgroundPosition = function( el, bounds, image, imageIndex, backgroundSize ) {
    var result = backgroundBoundsFactory( 'backgroundPosition', el, bounds, image, imageIndex, backgroundSize );
    return { left: result[0], top: result[1] };
};

_html2canvas.Util.BackgroundSize = function( el, bounds, image, imageIndex ) {
    var result = backgroundBoundsFactory( 'backgroundSize', el, bounds, image, imageIndex );
    return { width: result[0], height: result[1] };
};

_html2canvas.Util.Extend = function (options, defaults) {
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      defaults[key] = options[key];
    }
  }
  return defaults;
};


/*
 * Derived from jQuery.contents()
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 */
_html2canvas.Util.Children = function( elem ) {
  var children;
  try {
    children = (elem.nodeName && elem.nodeName.toUpperCase() === "IFRAME") ? elem.contentDocument || elem.contentWindow.document : (function(array) {
      var ret = [];
      if (array !== null) {
        (function(first, second ) {
          var i = first.length,
          j = 0;

          if (typeof second.length === "number") {
            for (var l = second.length; j < l; j++) {
              first[i++] = second[j];
            }
          } else {
            while (second[j] !== undefined) {
              first[i++] = second[j++];
            }
          }

          first.length = i;

          return first;
        })(ret, array);
      }
      return ret;
    })(elem.childNodes);

  } catch (ex) {
    _html2canvas.Util.log("html2canvas.Util.Children failed with exception: " + ex.message);
    children = [];
  }
  return children;
};

_html2canvas.Util.isTransparent = function(backgroundColor) {
  return (backgroundColor === "transparent" || backgroundColor === "rgba(0, 0, 0, 0)");
};
_html2canvas.Util.Font = (function () {

  var fontData = {};

  return function(font, fontSize, doc) {
    if (fontData[font + "-" + fontSize] !== undefined) {
      return fontData[font + "-" + fontSize];
    }

    var container = doc.createElement('div'),
    img = doc.createElement('img'),
    span = doc.createElement('span'),
    sampleText = 'Hidden Text',
    baseline,
    middle,
    metricsObj;

    container.style.visibility = "hidden";
    container.style.fontFamily = font;
    container.style.fontSize = fontSize;
    container.style.margin = 0;
    container.style.padding = 0;

    doc.body.appendChild(container);

    // http://probablyprogramming.com/2009/03/15/the-tiniest-gif-ever (handtinywhite.gif)
    img.src = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACwAAAAAAQABAAACAkQBADs=";
    img.width = 1;
    img.height = 1;

    img.style.margin = 0;
    img.style.padding = 0;
    img.style.verticalAlign = "baseline";

    span.style.fontFamily = font;
    span.style.fontSize = fontSize;
    span.style.margin = 0;
    span.style.padding = 0;

    span.appendChild(doc.createTextNode(sampleText));
    container.appendChild(span);
    container.appendChild(img);
    baseline = (img.offsetTop - span.offsetTop) + 1;

    container.removeChild(span);
    container.appendChild(doc.createTextNode(sampleText));

    container.style.lineHeight = "normal";
    img.style.verticalAlign = "super";

    middle = (img.offsetTop-container.offsetTop) + 1;
    metricsObj = {
      baseline: baseline,
      lineWidth: 1,
      middle: middle
    };

    fontData[font + "-" + fontSize] = metricsObj;

    doc.body.removeChild(container);

    return metricsObj;
  };
})();

(function(){
  var Util = _html2canvas.Util,
    Generate = {};

  _html2canvas.Generate = Generate;

  var reGradients = [
  /^(-webkit-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-o-linear-gradient)\(([a-z\s]+)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-webkit-gradient)\((linear|radial),\s((?:\d{1,3}%?)\s(?:\d{1,3}%?),\s(?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)\-]+)\)$/,
  /^(-moz-linear-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?))([\w\d\.\s,%\(\)]+)\)$/,
  /^(-webkit-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-moz-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s?([a-z\-]*)([\w\d\.\s,%\(\)]+)\)$/,
  /^(-o-radial-gradient)\(((?:\d{1,3}%?)\s(?:\d{1,3}%?)),\s(\w+)\s([a-z\-]+)([\w\d\.\s,%\(\)]+)\)$/
  ];

  /*
 * TODO: Add IE10 vendor prefix (-ms) support
 * TODO: Add W3C gradient (linear-gradient) support
 * TODO: Add old Webkit -webkit-gradient(radial, ...) support
 * TODO: Maybe some RegExp optimizations are possible ;o)
 */
  Generate.parseGradient = function(css, bounds) {
    var gradient, i, len = reGradients.length, m1, stop, m2, m2Len, step, m3, tl,tr,br,bl;

    for(i = 0; i < len; i+=1){
      m1 = css.match(reGradients[i]);
      if(m1) {
        break;
      }
    }

    if(m1) {
      switch(m1[1]) {
        case '-webkit-linear-gradient':
        case '-o-linear-gradient':

          gradient = {
            type: 'linear',
            x0: null,
            y0: null,
            x1: null,
            y1: null,
            colorStops: []
          };

          // get coordinates
          m2 = m1[2].match(/\w+/g);
          if(m2){
            m2Len = m2.length;
            for(i = 0; i < m2Len; i+=1){
              switch(m2[i]) {
                case 'top':
                  gradient.y0 = 0;
                  gradient.y1 = bounds.height;
                  break;

                case 'right':
                  gradient.x0 = bounds.width;
                  gradient.x1 = 0;
                  break;

                case 'bottom':
                  gradient.y0 = bounds.height;
                  gradient.y1 = 0;
                  break;

                case 'left':
                  gradient.x0 = 0;
                  gradient.x1 = bounds.width;
                  break;
              }
            }
          }
          if(gradient.x0 === null && gradient.x1 === null){ // center
            gradient.x0 = gradient.x1 = bounds.width / 2;
          }
          if(gradient.y0 === null && gradient.y1 === null){ // center
            gradient.y0 = gradient.y1 = bounds.height / 2;
          }

          // get colors and stops
          m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
          if(m2){
            m2Len = m2.length;
            step = 1 / Math.max(m2Len - 1, 1);
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
              if(m3[2]){
                stop = parseFloat(m3[2]);
                if(m3[3] === '%'){
                  stop /= 100;
                } else { // px - stupid opera
                  stop /= bounds.width;
                }
              } else {
                stop = i * step;
              }
              gradient.colorStops.push({
                color: m3[1],
                stop: stop
              });
            }
          }
          break;

        case '-webkit-gradient':

          gradient = {
            type: m1[2] === 'radial' ? 'circle' : m1[2], // TODO: Add radial gradient support for older mozilla definitions
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            colorStops: []
          };

          // get coordinates
          m2 = m1[3].match(/(\d{1,3})%?\s(\d{1,3})%?,\s(\d{1,3})%?\s(\d{1,3})%?/);
          if(m2){
            gradient.x0 = (m2[1] * bounds.width) / 100;
            gradient.y0 = (m2[2] * bounds.height) / 100;
            gradient.x1 = (m2[3] * bounds.width) / 100;
            gradient.y1 = (m2[4] * bounds.height) / 100;
          }

          // get colors and stops
          m2 = m1[4].match(/((?:from|to|color-stop)\((?:[0-9\.]+,\s)?(?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)\))+/g);
          if(m2){
            m2Len = m2.length;
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/(from|to|color-stop)\(([0-9\.]+)?(?:,\s)?((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\)/);
              stop = parseFloat(m3[2]);
              if(m3[1] === 'from') {
                stop = 0.0;
              }
              if(m3[1] === 'to') {
                stop = 1.0;
              }
              gradient.colorStops.push({
                color: m3[3],
                stop: stop
              });
            }
          }
          break;

        case '-moz-linear-gradient':

          gradient = {
            type: 'linear',
            x0: 0,
            y0: 0,
            x1: 0,
            y1: 0,
            colorStops: []
          };

          // get coordinates
          m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);

          // m2[1] == 0%   -> left
          // m2[1] == 50%  -> center
          // m2[1] == 100% -> right

          // m2[2] == 0%   -> top
          // m2[2] == 50%  -> center
          // m2[2] == 100% -> bottom

          if(m2){
            gradient.x0 = (m2[1] * bounds.width) / 100;
            gradient.y0 = (m2[2] * bounds.height) / 100;
            gradient.x1 = bounds.width - gradient.x0;
            gradient.y1 = bounds.height - gradient.y0;
          }

          // get colors and stops
          m2 = m1[3].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}%)?)+/g);
          if(m2){
            m2Len = m2.length;
            step = 1 / Math.max(m2Len - 1, 1);
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%)?/);
              if(m3[2]){
                stop = parseFloat(m3[2]);
                if(m3[3]){ // percentage
                  stop /= 100;
                }
              } else {
                stop = i * step;
              }
              gradient.colorStops.push({
                color: m3[1],
                stop: stop
              });
            }
          }
          break;

        case '-webkit-radial-gradient':
        case '-moz-radial-gradient':
        case '-o-radial-gradient':

          gradient = {
            type: 'circle',
            x0: 0,
            y0: 0,
            x1: bounds.width,
            y1: bounds.height,
            cx: 0,
            cy: 0,
            rx: 0,
            ry: 0,
            colorStops: []
          };

          // center
          m2 = m1[2].match(/(\d{1,3})%?\s(\d{1,3})%?/);
          if(m2){
            gradient.cx = (m2[1] * bounds.width) / 100;
            gradient.cy = (m2[2] * bounds.height) / 100;
          }

          // size
          m2 = m1[3].match(/\w+/);
          m3 = m1[4].match(/[a-z\-]*/);
          if(m2 && m3){
            switch(m3[0]){
              case 'farthest-corner':
              case 'cover': // is equivalent to farthest-corner
              case '': // mozilla removes "cover" from definition :(
                tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
                tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
                gradient.rx = gradient.ry = Math.max(tl, tr, br, bl);
                break;
              case 'closest-corner':
                tl = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.cy, 2));
                tr = Math.sqrt(Math.pow(gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                br = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.y1 - gradient.cy, 2));
                bl = Math.sqrt(Math.pow(gradient.x1 - gradient.cx, 2) + Math.pow(gradient.cy, 2));
                gradient.rx = gradient.ry = Math.min(tl, tr, br, bl);
                break;
              case 'farthest-side':
                if(m2[0] === 'circle'){
                  gradient.rx = gradient.ry = Math.max(
                    gradient.cx,
                    gradient.cy,
                    gradient.x1 - gradient.cx,
                    gradient.y1 - gradient.cy
                    );
                } else { // ellipse

                  gradient.type = m2[0];

                  gradient.rx = Math.max(
                    gradient.cx,
                    gradient.x1 - gradient.cx
                    );
                  gradient.ry = Math.max(
                    gradient.cy,
                    gradient.y1 - gradient.cy
                    );
                }
                break;
              case 'closest-side':
              case 'contain': // is equivalent to closest-side
                if(m2[0] === 'circle'){
                  gradient.rx = gradient.ry = Math.min(
                    gradient.cx,
                    gradient.cy,
                    gradient.x1 - gradient.cx,
                    gradient.y1 - gradient.cy
                    );
                } else { // ellipse

                  gradient.type = m2[0];

                  gradient.rx = Math.min(
                    gradient.cx,
                    gradient.x1 - gradient.cx
                    );
                  gradient.ry = Math.min(
                    gradient.cy,
                    gradient.y1 - gradient.cy
                    );
                }
                break;

            // TODO: add support for "30px 40px" sizes (webkit only)
            }
          }

          // color stops
          m2 = m1[5].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\)(?:\s\d{1,3}(?:%|px))?)+/g);
          if(m2){
            m2Len = m2.length;
            step = 1 / Math.max(m2Len - 1, 1);
            for(i = 0; i < m2Len; i+=1){
              m3 = m2[i].match(/((?:rgb|rgba)\(\d{1,3},\s\d{1,3},\s\d{1,3}(?:,\s[0-9\.]+)?\))\s*(\d{1,3})?(%|px)?/);
              if(m3[2]){
                stop = parseFloat(m3[2]);
                if(m3[3] === '%'){
                  stop /= 100;
                } else { // px - stupid opera
                  stop /= bounds.width;
                }
              } else {
                stop = i * step;
              }
              gradient.colorStops.push({
                color: m3[1],
                stop: stop
              });
            }
          }
          break;
      }
    }

    return gradient;
  };

  function addScrollStops(grad) {
    return function(colorStop) {
      try {
        grad.addColorStop(colorStop.stop, colorStop.color);
      }
      catch(e) {
        Util.log(['failed to add color stop: ', e, '; tried to add: ', colorStop]);
      }
    };
  }

  Generate.Gradient = function(src, bounds) {
    if(bounds.width === 0 || bounds.height === 0) {
      return;
    }

    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    gradient, grad;

    canvas.width = bounds.width;
    canvas.height = bounds.height;

    // TODO: add support for multi defined background gradients
    gradient = _html2canvas.Generate.parseGradient(src, bounds);

    if(gradient) {
      switch(gradient.type) {
        case 'linear':
          grad = ctx.createLinearGradient(gradient.x0, gradient.y0, gradient.x1, gradient.y1);
          gradient.colorStops.forEach(addScrollStops(grad));
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, bounds.width, bounds.height);
          break;

        case 'circle':
          grad = ctx.createRadialGradient(gradient.cx, gradient.cy, 0, gradient.cx, gradient.cy, gradient.rx);
          gradient.colorStops.forEach(addScrollStops(grad));
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, bounds.width, bounds.height);
          break;

        case 'ellipse':
          var canvasRadial = document.createElement('canvas'),
            ctxRadial = canvasRadial.getContext('2d'),
            ri = Math.max(gradient.rx, gradient.ry),
            di = ri * 2;

          canvasRadial.width = canvasRadial.height = di;

          grad = ctxRadial.createRadialGradient(gradient.rx, gradient.ry, 0, gradient.rx, gradient.ry, ri);
          gradient.colorStops.forEach(addScrollStops(grad));

          ctxRadial.fillStyle = grad;
          ctxRadial.fillRect(0, 0, di, di);

          ctx.fillStyle = gradient.colorStops[gradient.colorStops.length - 1].color;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(canvasRadial, gradient.cx - gradient.rx, gradient.cy - gradient.ry, 2 * gradient.rx, 2 * gradient.ry);
          break;
      }
    }

    return canvas;
  };

  Generate.ListAlpha = function(number) {
    var tmp = "",
    modulus;

    do {
      modulus = number % 26;
      tmp = String.fromCharCode((modulus) + 64) + tmp;
      number = number / 26;
    }while((number*26) > 26);

    return tmp;
  };

  Generate.ListRoman = function(number) {
    var romanArray = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"],
    decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
    roman = "",
    v,
    len = romanArray.length;

    if (number <= 0 || number >= 4000) {
      return number;
    }

    for (v=0; v < len; v+=1) {
      while (number >= decimal[v]) {
        number -= decimal[v];
        roman += romanArray[v];
      }
    }

    return roman;
  };
})();
function h2cRenderContext(width, height) {
  var storage = [];
  return {
    storage: storage,
    width: width,
    height: height,
    clip: function() {
      storage.push({
        type: "function",
        name: "clip",
        'arguments': arguments
      });
    },
    translate: function() {
      storage.push({
        type: "function",
        name: "translate",
        'arguments': arguments
      });
    },
    fill: function() {
      storage.push({
        type: "function",
        name: "fill",
        'arguments': arguments
      });
    },
    save: function() {
      storage.push({
        type: "function",
        name: "save",
        'arguments': arguments
      });
    },
    restore: function() {
      storage.push({
        type: "function",
        name: "restore",
        'arguments': arguments
      });
    },
    fillRect: function () {
      storage.push({
        type: "function",
        name: "fillRect",
        'arguments': arguments
      });
    },
    createPattern: function() {
      storage.push({
        type: "function",
        name: "createPattern",
        'arguments': arguments
      });
    },
    drawShape: function() {

      var shape = [];

      storage.push({
        type: "function",
        name: "drawShape",
        'arguments': shape
      });

      return {
        moveTo: function() {
          shape.push({
            name: "moveTo",
            'arguments': arguments
          });
        },
        lineTo: function() {
          shape.push({
            name: "lineTo",
            'arguments': arguments
          });
        },
        arcTo: function() {
          shape.push({
            name: "arcTo",
            'arguments': arguments
          });
        },
        bezierCurveTo: function() {
          shape.push({
            name: "bezierCurveTo",
            'arguments': arguments
          });
        },
        quadraticCurveTo: function() {
          shape.push({
            name: "quadraticCurveTo",
            'arguments': arguments
          });
        }
      };

    },
    drawImage: function () {
      storage.push({
        type: "function",
        name: "drawImage",
        'arguments': arguments
      });
    },
    fillText: function () {
      storage.push({
        type: "function",
        name: "fillText",
        'arguments': arguments
      });
    },
    setVariable: function (variable, value) {
      storage.push({
        type: "variable",
        name: variable,
        'arguments': value
      });
      return value;
    }
  };
}
_html2canvas.Parse = function (images, options) {
  window.scroll(0,0);

  var element = (( options.elements === undefined ) ? document.body : options.elements[0]), // select body by default
  numDraws = 0,
  doc = element.ownerDocument,
  Util = _html2canvas.Util,
  support = Util.Support(options, doc),
  ignoreElementsRegExp = new RegExp("(" + options.ignoreElements + ")"),
  body = doc.body,
  getCSS = Util.getCSS,
  pseudoHide = "___html2canvas___pseudoelement",
  hidePseudoElements = doc.createElement('style');

  hidePseudoElements.innerHTML = '.' + pseudoHide + '-before:before { content: "" !important; display: none !important; }' +
  '.' + pseudoHide + '-after:after { content: "" !important; display: none !important; }';

  body.appendChild(hidePseudoElements);

  images = images || {};

  function documentWidth () {
    return Math.max(
      Math.max(doc.body.scrollWidth, doc.documentElement.scrollWidth),
      Math.max(doc.body.offsetWidth, doc.documentElement.offsetWidth),
      Math.max(doc.body.clientWidth, doc.documentElement.clientWidth)
      );
  }

  function documentHeight () {
    return Math.max(
      Math.max(doc.body.scrollHeight, doc.documentElement.scrollHeight),
      Math.max(doc.body.offsetHeight, doc.documentElement.offsetHeight),
      Math.max(doc.body.clientHeight, doc.documentElement.clientHeight)
      );
  }

  function getCSSInt(element, attribute) {
    var val = parseInt(getCSS(element, attribute), 10);
    return (isNaN(val)) ? 0 : val; // borders in old IE are throwing 'medium' for demo.html
  }

  function renderRect (ctx, x, y, w, h, bgcolor) {
    if (bgcolor !== "transparent"){
      ctx.setVariable("fillStyle", bgcolor);
      ctx.fillRect(x, y, w, h);
      numDraws+=1;
    }
  }

  function capitalize(m, p1, p2) {
    if (m.length > 0) {
      return p1 + p2.toUpperCase();
    }
  }

  function textTransform (text, transform) {
    switch(transform){
      case "lowercase":
        return text.toLowerCase();
      case "capitalize":
        return text.replace( /(^|\s|:|-|\(|\))([a-z])/g, capitalize);
      case "uppercase":
        return text.toUpperCase();
      default:
        return text;
    }
  }

  function noLetterSpacing(letter_spacing) {
    return (/^(normal|none|0px)$/.test(letter_spacing));
  }

  function drawText(currentText, x, y, ctx){
    if (currentText !== null && Util.trimText(currentText).length > 0) {
      ctx.fillText(currentText, x, y);
      numDraws+=1;
    }
  }

  function setTextVariables(ctx, el, text_decoration, color) {
    var align = false,
    bold = getCSS(el, "fontWeight"),
    family = getCSS(el, "fontFamily"),
    size = getCSS(el, "fontSize"),
    shadows = Util.parseTextShadows(getCSS(el, "textShadow"));

    switch(parseInt(bold, 10)){
      case 401:
        bold = "bold";
        break;
      case 400:
        bold = "normal";
        break;
    }

    ctx.setVariable("fillStyle", color);
    ctx.setVariable("font", [getCSS(el, "fontStyle"), getCSS(el, "fontVariant"), bold, size, family].join(" "));
    ctx.setVariable("textAlign", (align) ? "right" : "left");

    if (shadows.length) {
      // TODO: support multiple text shadows
      // apply the first text shadow
      ctx.setVariable("shadowColor", shadows[0].color);
      ctx.setVariable("shadowOffsetX", shadows[0].offsetX);
      ctx.setVariable("shadowOffsetY", shadows[0].offsetY);
      ctx.setVariable("shadowBlur", shadows[0].blur);
    }

    if (text_decoration !== "none"){
      return Util.Font(family, size, doc);
    }
  }

  function renderTextDecoration(ctx, text_decoration, bounds, metrics, color) {
    switch(text_decoration) {
      case "underline":
        // Draws a line at the baseline of the font
        // TODO As some browsers display the line as more than 1px if the font-size is big, need to take that into account both in position and size
        renderRect(ctx, bounds.left, Math.round(bounds.top + metrics.baseline + metrics.lineWidth), bounds.width, 1, color);
        break;
      case "overline":
        renderRect(ctx, bounds.left, Math.round(bounds.top), bounds.width, 1, color);
        break;
      case "line-through":
        // TODO try and find exact position for line-through
        renderRect(ctx, bounds.left, Math.ceil(bounds.top + metrics.middle + metrics.lineWidth), bounds.width, 1, color);
        break;
    }
  }

  function getTextBounds(state, text, textDecoration, isLast, transform) {
    var bounds;
    if (support.rangeBounds && !transform) {
      if (textDecoration !== "none" || Util.trimText(text).length !== 0) {
        bounds = textRangeBounds(text, state.node, state.textOffset);
      }
      state.textOffset += text.length;
    } else if (state.node && typeof state.node.nodeValue === "string" ){
      var newTextNode = (isLast) ? state.node.splitText(text.length) : null;
      bounds = textWrapperBounds(state.node, transform);
      state.node = newTextNode;
    }
    return bounds;
  }

  function textRangeBounds(text, textNode, textOffset) {
    var range = doc.createRange();
    range.setStart(textNode, textOffset);
    range.setEnd(textNode, textOffset + text.length);
    return range.getBoundingClientRect();
  }

  function textWrapperBounds(oldTextNode, transform) {
    var parent = oldTextNode.parentNode,
    wrapElement = doc.createElement('wrapper'),
    backupText = oldTextNode.cloneNode(true);

    wrapElement.appendChild(oldTextNode.cloneNode(true));
    parent.replaceChild(wrapElement, oldTextNode);

    var bounds = transform ? Util.OffsetBounds(wrapElement) : Util.Bounds(wrapElement);
    parent.replaceChild(backupText, wrapElement);
    return bounds;
  }

  function renderText(el, textNode, stack) {
    var ctx = stack.ctx,
    color = getCSS(el, "color"),
    textDecoration = getCSS(el, "textDecoration"),
    textAlign = getCSS(el, "textAlign"),
    metrics,
    textList,
    state = {
      node: textNode,
      textOffset: 0
    };

    if (Util.trimText(textNode.nodeValue).length > 0) {
      textNode.nodeValue = textTransform(textNode.nodeValue, getCSS(el, "textTransform"));
      textAlign = textAlign.replace(["-webkit-auto"],["auto"]);

      textList = (!options.letterRendering && /^(left|right|justify|auto)$/.test(textAlign) && noLetterSpacing(getCSS(el, "letterSpacing"))) ?
      textNode.nodeValue.split(/(\b| )/)
      : textNode.nodeValue.split("");

      metrics = setTextVariables(ctx, el, textDecoration, color);

      if (options.chinese) {
        textList.forEach(function(word, index) {
          if (/.*[\u4E00-\u9FA5].*$/.test(word)) {
            word = word.split("");
            word.unshift(index, 1);
            textList.splice.apply(textList, word);
          }
        });
      }

      textList.forEach(function(text, index) {
        var bounds = getTextBounds(state, text, textDecoration, (index < textList.length - 1), stack.transform.matrix);
        if (bounds) {
          drawText(text, bounds.left, bounds.bottom, ctx);
          renderTextDecoration(ctx, textDecoration, bounds, metrics, color);
        }
      });
    }
  }

  function listPosition (element, val) {
    var boundElement = doc.createElement( "boundelement" ),
    originalType,
    bounds;

    boundElement.style.display = "inline";

    originalType = element.style.listStyleType;
    element.style.listStyleType = "none";

    boundElement.appendChild(doc.createTextNode(val));

    element.insertBefore(boundElement, element.firstChild);

    bounds = Util.Bounds(boundElement);
    element.removeChild(boundElement);
    element.style.listStyleType = originalType;
    return bounds;
  }

  function elementIndex(el) {
    var i = -1,
    count = 1,
    childs = el.parentNode.childNodes;

    if (el.parentNode) {
      while(childs[++i] !== el) {
        if (childs[i].nodeType === 1) {
          count++;
        }
      }
      return count;
    } else {
      return -1;
    }
  }

  function listItemText(element, type) {
    var currentIndex = elementIndex(element), text;
    switch(type){
      case "decimal":
        text = currentIndex;
        break;
      case "decimal-leading-zero":
        text = (currentIndex.toString().length === 1) ? currentIndex = "0" + currentIndex.toString() : currentIndex.toString();
        break;
      case "upper-roman":
        text = _html2canvas.Generate.ListRoman( currentIndex );
        break;
      case "lower-roman":
        text = _html2canvas.Generate.ListRoman( currentIndex ).toLowerCase();
        break;
      case "lower-alpha":
        text = _html2canvas.Generate.ListAlpha( currentIndex ).toLowerCase();
        break;
      case "upper-alpha":
        text = _html2canvas.Generate.ListAlpha( currentIndex );
        break;
    }

    return text + ". ";
  }

  function renderListItem(element, stack, elBounds) {
    var x,
    text,
    ctx = stack.ctx,
    type = getCSS(element, "listStyleType"),
    listBounds;

    if (/^(decimal|decimal-leading-zero|upper-alpha|upper-latin|upper-roman|lower-alpha|lower-greek|lower-latin|lower-roman)$/i.test(type)) {
      text = listItemText(element, type);
      listBounds = listPosition(element, text);
      setTextVariables(ctx, element, "none", getCSS(element, "color"));

      if (getCSS(element, "listStylePosition") === "inside") {
        ctx.setVariable("textAlign", "left");
        x = elBounds.left;
      } else {
        return;
      }

      drawText(text, x, listBounds.bottom, ctx);
    }
  }

  function loadImage (src){
    var img = images[src];
    return (img && img.succeeded === true) ? img.img : false;
  }

  function clipBounds(src, dst){
    var x = Math.max(src.left, dst.left),
    y = Math.max(src.top, dst.top),
    x2 = Math.min((src.left + src.width), (dst.left + dst.width)),
    y2 = Math.min((src.top + src.height), (dst.top + dst.height));

    return {
      left:x,
      top:y,
      width:x2-x,
      height:y2-y
    };
  }

  function setZ(element, stack, parentStack){
    var newContext,
    isPositioned = stack.cssPosition !== 'static',
    zIndex = isPositioned ? getCSS(element, 'zIndex') : 'auto',
    opacity = getCSS(element, 'opacity'),
    isFloated = getCSS(element, 'cssFloat') !== 'none';

    // https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Understanding_z_index/The_stacking_context
    // When a new stacking context should be created:
    // the root element (HTML),
    // positioned (absolutely or relatively) with a z-index value other than "auto",
    // elements with an opacity value less than 1. (See the specification for opacity),
    // on mobile WebKit and Chrome 22+, position: fixed always creates a new stacking context, even when z-index is "auto" (See this post)

    stack.zIndex = newContext = h2czContext(zIndex);
    newContext.isPositioned = isPositioned;
    newContext.isFloated = isFloated;
    newContext.opacity = opacity;
    newContext.ownStacking = (zIndex !== 'auto' || opacity < 1);

    if (parentStack) {
      parentStack.zIndex.children.push(stack);
    }
  }

  function renderImage(ctx, element, image, bounds, borders) {

    var paddingLeft = getCSSInt(element, 'paddingLeft'),
    paddingTop = getCSSInt(element, 'paddingTop'),
    paddingRight = getCSSInt(element, 'paddingRight'),
    paddingBottom = getCSSInt(element, 'paddingBottom');

    drawImage(
      ctx,
      image,
      0, //sx
      0, //sy
      image.width, //sw
      image.height, //sh
      bounds.left + paddingLeft + borders[3].width, //dx
      bounds.top + paddingTop + borders[0].width, // dy
      bounds.width - (borders[1].width + borders[3].width + paddingLeft + paddingRight), //dw
      bounds.height - (borders[0].width + borders[2].width + paddingTop + paddingBottom) //dh
      );
  }

  function getBorderData(element) {
    return ["Top", "Right", "Bottom", "Left"].map(function(side) {
      return {
        width: getCSSInt(element, 'border' + side + 'Width'),
        color: getCSS(element, 'border' + side + 'Color')
      };
    });
  }

  function getBorderRadiusData(element) {
    return ["TopLeft", "TopRight", "BottomRight", "BottomLeft"].map(function(side) {
      return getCSS(element, 'border' + side + 'Radius');
    });
  }

  var getCurvePoints = (function(kappa) {

    return function(x, y, r1, r2) {
      var ox = (r1) * kappa, // control point offset horizontal
      oy = (r2) * kappa, // control point offset vertical
      xm = x + r1, // x-middle
      ym = y + r2; // y-middle
      return {
        topLeft: bezierCurve({
          x:x,
          y:ym
        }, {
          x:x,
          y:ym - oy
        }, {
          x:xm - ox,
          y:y
        }, {
          x:xm,
          y:y
        }),
        topRight: bezierCurve({
          x:x,
          y:y
        }, {
          x:x + ox,
          y:y
        }, {
          x:xm,
          y:ym - oy
        }, {
          x:xm,
          y:ym
        }),
        bottomRight: bezierCurve({
          x:xm,
          y:y
        }, {
          x:xm,
          y:y + oy
        }, {
          x:x + ox,
          y:ym
        }, {
          x:x,
          y:ym
        }),
        bottomLeft: bezierCurve({
          x:xm,
          y:ym
        }, {
          x:xm - ox,
          y:ym
        }, {
          x:x,
          y:y + oy
        }, {
          x:x,
          y:y
        })
      };
    };
  })(4 * ((Math.sqrt(2) - 1) / 3));

  function bezierCurve(start, startControl, endControl, end) {

    var lerp = function (a, b, t) {
      return {
        x:a.x + (b.x - a.x) * t,
        y:a.y + (b.y - a.y) * t
      };
    };

    return {
      start: start,
      startControl: startControl,
      endControl: endControl,
      end: end,
      subdivide: function(t) {
        var ab = lerp(start, startControl, t),
        bc = lerp(startControl, endControl, t),
        cd = lerp(endControl, end, t),
        abbc = lerp(ab, bc, t),
        bccd = lerp(bc, cd, t),
        dest = lerp(abbc, bccd, t);
        return [bezierCurve(start, ab, abbc, dest), bezierCurve(dest, bccd, cd, end)];
      },
      curveTo: function(borderArgs) {
        borderArgs.push(["bezierCurve", startControl.x, startControl.y, endControl.x, endControl.y, end.x, end.y]);
      },
      curveToReversed: function(borderArgs) {
        borderArgs.push(["bezierCurve", endControl.x, endControl.y, startControl.x, startControl.y, start.x, start.y]);
      }
    };
  }

  function parseCorner(borderArgs, radius1, radius2, corner1, corner2, x, y) {
    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", corner1[0].start.x, corner1[0].start.y]);
      corner1[0].curveTo(borderArgs);
      corner1[1].curveTo(borderArgs);
    } else {
      borderArgs.push(["line", x, y]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
      borderArgs.push(["line", corner2[0].start.x, corner2[0].start.y]);
    }
  }

  function drawSide(borderData, radius1, radius2, outer1, inner1, outer2, inner2) {
    var borderArgs = [];

    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", outer1[1].start.x, outer1[1].start.y]);
      outer1[1].curveTo(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c1[0], borderData.c1[1]]);
    }

    if (radius2[0] > 0 || radius2[1] > 0) {
      borderArgs.push(["line", outer2[0].start.x, outer2[0].start.y]);
      outer2[0].curveTo(borderArgs);
      borderArgs.push(["line", inner2[0].end.x, inner2[0].end.y]);
      inner2[0].curveToReversed(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c2[0], borderData.c2[1]]);
      borderArgs.push([ "line", borderData.c3[0], borderData.c3[1]]);
    }

    if (radius1[0] > 0 || radius1[1] > 0) {
      borderArgs.push(["line", inner1[1].end.x, inner1[1].end.y]);
      inner1[1].curveToReversed(borderArgs);
    } else {
      borderArgs.push([ "line", borderData.c4[0], borderData.c4[1]]);
    }

    return borderArgs;
  }

  function calculateCurvePoints(bounds, borderRadius, borders) {

    var x = bounds.left,
    y = bounds.top,
    width = bounds.width,
    height = bounds.height,

    tlh = borderRadius[0][0],
    tlv = borderRadius[0][1],
    trh = borderRadius[1][0],
    trv = borderRadius[1][1],
    brh = borderRadius[2][0],
    brv = borderRadius[2][1],
    blh = borderRadius[3][0],
    blv = borderRadius[3][1],

    topWidth = width - trh,
    rightHeight = height - brv,
    bottomWidth = width - brh,
    leftHeight = height - blv;

    return {
      topLeftOuter: getCurvePoints(
        x,
        y,
        tlh,
        tlv
        ).topLeft.subdivide(0.5),

      topLeftInner: getCurvePoints(
        x + borders[3].width,
        y + borders[0].width,
        Math.max(0, tlh - borders[3].width),
        Math.max(0, tlv - borders[0].width)
        ).topLeft.subdivide(0.5),

      topRightOuter: getCurvePoints(
        x + topWidth,
        y,
        trh,
        trv
        ).topRight.subdivide(0.5),

      topRightInner: getCurvePoints(
        x + Math.min(topWidth, width + borders[3].width),
        y + borders[0].width,
        (topWidth > width + borders[3].width) ? 0 :trh - borders[3].width,
        trv - borders[0].width
        ).topRight.subdivide(0.5),

      bottomRightOuter: getCurvePoints(
        x + bottomWidth,
        y + rightHeight,
        brh,
        brv
        ).bottomRight.subdivide(0.5),

      bottomRightInner: getCurvePoints(
        x + Math.min(bottomWidth, width + borders[3].width),
        y + Math.min(rightHeight, height + borders[0].width),
        Math.max(0, brh - borders[1].width),
        Math.max(0, brv - borders[2].width)
        ).bottomRight.subdivide(0.5),

      bottomLeftOuter: getCurvePoints(
        x,
        y + leftHeight,
        blh,
        blv
        ).bottomLeft.subdivide(0.5),

      bottomLeftInner: getCurvePoints(
        x + borders[3].width,
        y + leftHeight,
        Math.max(0, blh - borders[3].width),
        Math.max(0, blv - borders[2].width)
        ).bottomLeft.subdivide(0.5)
    };
  }

  function getBorderClip(element, borderPoints, borders, radius, bounds) {
    var backgroundClip = getCSS(element, 'backgroundClip'),
    borderArgs = [];

    switch(backgroundClip) {
      case "content-box":
      case "padding-box":
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftInner, borderPoints.topRightInner, bounds.left + borders[3].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightInner, borderPoints.bottomRightInner, bounds.left + bounds.width - borders[1].width, bounds.top + borders[0].width);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightInner, borderPoints.bottomLeftInner, bounds.left + bounds.width - borders[1].width, bounds.top + bounds.height - borders[2].width);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftInner, borderPoints.topLeftInner, bounds.left + borders[3].width, bounds.top + bounds.height - borders[2].width);
        break;

      default:
        parseCorner(borderArgs, radius[0], radius[1], borderPoints.topLeftOuter, borderPoints.topRightOuter, bounds.left, bounds.top);
        parseCorner(borderArgs, radius[1], radius[2], borderPoints.topRightOuter, borderPoints.bottomRightOuter, bounds.left + bounds.width, bounds.top);
        parseCorner(borderArgs, radius[2], radius[3], borderPoints.bottomRightOuter, borderPoints.bottomLeftOuter, bounds.left + bounds.width, bounds.top + bounds.height);
        parseCorner(borderArgs, radius[3], radius[0], borderPoints.bottomLeftOuter, borderPoints.topLeftOuter, bounds.left, bounds.top + bounds.height);
        break;
    }

    return borderArgs;
  }

  function parseBorders(element, bounds, borders){
    var x = bounds.left,
    y = bounds.top,
    width = bounds.width,
    height = bounds.height,
    borderSide,
    bx,
    by,
    bw,
    bh,
    borderArgs,
    // http://www.w3.org/TR/css3-background/#the-border-radius
    borderRadius = getBorderRadiusData(element),
    borderPoints = calculateCurvePoints(bounds, borderRadius, borders),
    borderData = {
      clip: getBorderClip(element, borderPoints, borders, borderRadius, bounds),
      borders: []
    };

    for (borderSide = 0; borderSide < 4; borderSide++) {

      if (borders[borderSide].width > 0) {
        bx = x;
        by = y;
        bw = width;
        bh = height - (borders[2].width);

        switch(borderSide) {
          case 0:
            // top border
            bh = borders[0].width;

            borderArgs = drawSide({
              c1: [bx, by],
              c2: [bx + bw, by],
              c3: [bx + bw - borders[1].width, by + bh],
              c4: [bx + borders[3].width, by + bh]
            }, borderRadius[0], borderRadius[1],
            borderPoints.topLeftOuter, borderPoints.topLeftInner, borderPoints.topRightOuter, borderPoints.topRightInner);
            break;
          case 1:
            // right border
            bx = x + width - (borders[1].width);
            bw = borders[1].width;

            borderArgs = drawSide({
              c1: [bx + bw, by],
              c2: [bx + bw, by + bh + borders[2].width],
              c3: [bx, by + bh],
              c4: [bx, by + borders[0].width]
            }, borderRadius[1], borderRadius[2],
            borderPoints.topRightOuter, borderPoints.topRightInner, borderPoints.bottomRightOuter, borderPoints.bottomRightInner);
            break;
          case 2:
            // bottom border
            by = (by + height) - (borders[2].width);
            bh = borders[2].width;

            borderArgs = drawSide({
              c1: [bx + bw, by + bh],
              c2: [bx, by + bh],
              c3: [bx + borders[3].width, by],
              c4: [bx + bw - borders[3].width, by]
            }, borderRadius[2], borderRadius[3],
            borderPoints.bottomRightOuter, borderPoints.bottomRightInner, borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner);
            break;
          case 3:
            // left border
            bw = borders[3].width;

            borderArgs = drawSide({
              c1: [bx, by + bh + borders[2].width],
              c2: [bx, by],
              c3: [bx + bw, by + borders[0].width],
              c4: [bx + bw, by + bh]
            }, borderRadius[3], borderRadius[0],
            borderPoints.bottomLeftOuter, borderPoints.bottomLeftInner, borderPoints.topLeftOuter, borderPoints.topLeftInner);
            break;
        }

        borderData.borders.push({
          args: borderArgs,
          color: borders[borderSide].color
        });

      }
    }

    return borderData;
  }

  function createShape(ctx, args) {
    var shape = ctx.drawShape();
    args.forEach(function(border, index) {
      shape[(index === 0) ? "moveTo" : border[0] + "To" ].apply(null, border.slice(1));
    });
    return shape;
  }

  function renderBorders(ctx, borderArgs, color) {
    if (color !== "transparent") {
      ctx.setVariable( "fillStyle", color);
      createShape(ctx, borderArgs);
      ctx.fill();
      numDraws+=1;
    }
  }

  function renderFormValue (el, bounds, stack){

    var valueWrap = doc.createElement('valuewrap'),
    cssPropertyArray = ['lineHeight','textAlign','fontFamily','color','fontSize','paddingLeft','paddingTop','width','height','border','borderLeftWidth','borderTopWidth'],
    textValue,
    textNode;

    cssPropertyArray.forEach(function(property) {
      try {
        valueWrap.style[property] = getCSS(el, property);
      } catch(e) {
        // Older IE has issues with "border"
        Util.log("html2canvas: Parse: Exception caught in renderFormValue: " + e.message);
      }
    });

    valueWrap.style.borderColor = "black";
    valueWrap.style.borderStyle = "solid";
    valueWrap.style.display = "block";
    valueWrap.style.position = "absolute";

    if (/^(submit|reset|button|text|password)$/.test(el.type) || el.nodeName === "SELECT"){
      valueWrap.style.lineHeight = getCSS(el, "height");
    }

    valueWrap.style.top = bounds.top + "px";
    valueWrap.style.left = bounds.left + "px";

    textValue = (el.nodeName === "SELECT") ? (el.options[el.selectedIndex] || 0).text : el.value;
    if(!textValue) {
      textValue = el.placeholder;
    }

    textNode = doc.createTextNode(textValue);

    valueWrap.appendChild(textNode);
    body.appendChild(valueWrap);

    renderText(el, textNode, stack);
    body.removeChild(valueWrap);
  }

  function drawImage (ctx) {
    ctx.drawImage.apply(ctx, Array.prototype.slice.call(arguments, 1));
    numDraws+=1;
  }

  function getPseudoElement(el, which) {
    var elStyle = window.getComputedStyle(el, which);
    if(!elStyle || !elStyle.content || elStyle.content === "none" || elStyle.content === "-moz-alt-content" || elStyle.display === "none") {
      return;
    }
    var content = elStyle.content + '',
    first = content.substr( 0, 1 );
    //strips quotes
    if(first === content.substr( content.length - 1 ) && first.match(/'|"/)) {
      content = content.substr( 1, content.length - 2 );
    }

    var isImage = content.substr( 0, 3 ) === 'url',
    elps = document.createElement( isImage ? 'img' : 'span' );

    elps.className = pseudoHide + "-before " + pseudoHide + "-after";

    Object.keys(elStyle).filter(indexedProperty).forEach(function(prop) {
      // Prevent assigning of read only CSS Rules, ex. length, parentRule
      try {
        elps.style[prop] = elStyle[prop];
      } catch (e) {
        Util.log(['Tried to assign readonly property ', prop, 'Error:', e]);
      }
    });

    if(isImage) {
      elps.src = Util.parseBackgroundImage(content)[0].args[0];
    } else {
      elps.innerHTML = content;
    }
    return elps;
  }

  function indexedProperty(property) {
    return (isNaN(window.parseInt(property, 10)));
  }

  function injectPseudoElements(el, stack) {
    var before = getPseudoElement(el, ':before'),
    after = getPseudoElement(el, ':after');
    if(!before && !after) {
      return;
    }

    if(before) {
      el.className += " " + pseudoHide + "-before";
      el.parentNode.insertBefore(before, el);
      parseElement(before, stack, true);
      el.parentNode.removeChild(before);
      el.className = el.className.replace(pseudoHide + "-before", "").trim();
    }

    if (after) {
      el.className += " " + pseudoHide + "-after";
      el.appendChild(after);
      parseElement(after, stack, true);
      el.removeChild(after);
      el.className = el.className.replace(pseudoHide + "-after", "").trim();
    }

  }

  function renderBackgroundRepeat(ctx, image, backgroundPosition, bounds) {
    var offsetX = Math.round(bounds.left + backgroundPosition.left),
    offsetY = Math.round(bounds.top + backgroundPosition.top);

    ctx.createPattern(image);
    ctx.translate(offsetX, offsetY);
    ctx.fill();
    ctx.translate(-offsetX, -offsetY);
  }

  function backgroundRepeatShape(ctx, image, backgroundPosition, bounds, left, top, width, height) {
    var args = [];
    args.push(["line", Math.round(left), Math.round(top)]);
    args.push(["line", Math.round(left + width), Math.round(top)]);
    args.push(["line", Math.round(left + width), Math.round(height + top)]);
    args.push(["line", Math.round(left), Math.round(height + top)]);
    createShape(ctx, args);
    ctx.save();
    ctx.clip();
    renderBackgroundRepeat(ctx, image, backgroundPosition, bounds);
    ctx.restore();
  }

  function renderBackgroundColor(ctx, backgroundBounds, bgcolor) {
    renderRect(
      ctx,
      backgroundBounds.left,
      backgroundBounds.top,
      backgroundBounds.width,
      backgroundBounds.height,
      bgcolor
      );
  }

  function renderBackgroundRepeating(el, bounds, ctx, image, imageIndex) {
    var backgroundSize = Util.BackgroundSize(el, bounds, image, imageIndex),
    backgroundPosition = Util.BackgroundPosition(el, bounds, image, imageIndex, backgroundSize),
    backgroundRepeat = getCSS(el, "backgroundRepeat").split(",").map(Util.trimText);

    image = resizeImage(image, backgroundSize);

    backgroundRepeat = backgroundRepeat[imageIndex] || backgroundRepeat[0];

    switch (backgroundRepeat) {
      case "repeat-x":
        backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
          bounds.left, bounds.top + backgroundPosition.top, 99999, image.height);
        break;

      case "repeat-y":
        backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
          bounds.left + backgroundPosition.left, bounds.top, image.width, 99999);
        break;

      case "no-repeat":
        backgroundRepeatShape(ctx, image, backgroundPosition, bounds,
          bounds.left + backgroundPosition.left, bounds.top + backgroundPosition.top, image.width, image.height);
        break;

      default:
        renderBackgroundRepeat(ctx, image, backgroundPosition, {
          top: bounds.top,
          left: bounds.left,
          width: image.width,
          height: image.height
        });
        break;
    }
  }

  function renderBackgroundImage(element, bounds, ctx) {
    var backgroundImage = getCSS(element, "backgroundImage"),
    backgroundImages = Util.parseBackgroundImage(backgroundImage),
    image,
    imageIndex = backgroundImages.length;

    while(imageIndex--) {
      backgroundImage = backgroundImages[imageIndex];

      if (!backgroundImage.args || backgroundImage.args.length === 0) {
        continue;
      }

      var key = backgroundImage.method === 'url' ?
      backgroundImage.args[0] :
      backgroundImage.value;

      image = loadImage(key);

      // TODO add support for background-origin
      if (image) {
        renderBackgroundRepeating(element, bounds, ctx, image, imageIndex);
      } else {
        Util.log("html2canvas: Error loading background:", backgroundImage);
      }
    }
  }

  function resizeImage(image, bounds) {
    if(image.width === bounds.width && image.height === bounds.height) {
      return image;
    }

    var ctx, canvas = doc.createElement('canvas');
    canvas.width = bounds.width;
    canvas.height = bounds.height;
    ctx = canvas.getContext("2d");
    drawImage(ctx, image, 0, 0, image.width, image.height, 0, 0, bounds.width, bounds.height );
    return canvas;
  }

  function setOpacity(ctx, element, parentStack) {
    return ctx.setVariable("globalAlpha", getCSS(element, "opacity") * ((parentStack) ? parentStack.opacity : 1));
  }

  function removePx(str) {
    return str.replace("px", "");
  }

  var transformRegExp = /(matrix)\((.+)\)/;

  function getTransform(element, parentStack) {
    var transform = getCSS(element, "transform") || getCSS(element, "-webkit-transform") || getCSS(element, "-moz-transform") || getCSS(element, "-ms-transform") || getCSS(element, "-o-transform");
    var transformOrigin = getCSS(element, "transform-origin") || getCSS(element, "-webkit-transform-origin") || getCSS(element, "-moz-transform-origin") || getCSS(element, "-ms-transform-origin") || getCSS(element, "-o-transform-origin") || "0px 0px";

    transformOrigin = transformOrigin.split(" ").map(removePx).map(Util.asFloat);

    var matrix;
    if (transform && transform !== "none") {
      var match = transform.match(transformRegExp);
      if (match) {
        switch(match[1]) {
          case "matrix":
            matrix = match[2].split(",").map(Util.trimText).map(Util.asFloat);
            break;
        }
      }
    }

    return {
      origin: transformOrigin,
      matrix: matrix
    };
  }

  function createStack(element, parentStack, bounds, transform) {
    var ctx = h2cRenderContext((!parentStack) ? documentWidth() : bounds.width , (!parentStack) ? documentHeight() : bounds.height),
    stack = {
      ctx: ctx,
      opacity: setOpacity(ctx, element, parentStack),
      cssPosition: getCSS(element, "position"),
      borders: getBorderData(element),
      transform: transform,
      clip: (parentStack && parentStack.clip) ? Util.Extend( {}, parentStack.clip ) : null
    };

    setZ(element, stack, parentStack);

    // TODO correct overflow for absolute content residing under a static position
    if (options.useOverflow === true && /(hidden|scroll|auto)/.test(getCSS(element, "overflow")) === true && /(BODY)/i.test(element.nodeName) === false){
      stack.clip = (stack.clip) ? clipBounds(stack.clip, bounds) : bounds;
    }

    return stack;
  }

  function getBackgroundBounds(borders, bounds, clip) {
    var backgroundBounds = {
      left: bounds.left + borders[3].width,
      top: bounds.top + borders[0].width,
      width: bounds.width - (borders[1].width + borders[3].width),
      height: bounds.height - (borders[0].width + borders[2].width)
    };

    if (clip) {
      backgroundBounds = clipBounds(backgroundBounds, clip);
    }

    return backgroundBounds;
  }

  function getBounds(element, transform) {
    var bounds = (transform.matrix) ? Util.OffsetBounds(element) : Util.Bounds(element);
    transform.origin[0] += bounds.left;
    transform.origin[1] += bounds.top;
    return bounds;
  }

  function renderElement(element, parentStack, pseudoElement, ignoreBackground) {
    var transform = getTransform(element, parentStack),
    bounds = getBounds(element, transform),
    image,
    stack = createStack(element, parentStack, bounds, transform),
    borders = stack.borders,
    ctx = stack.ctx,
    backgroundBounds = getBackgroundBounds(borders, bounds, stack.clip),
    borderData = parseBorders(element, bounds, borders),
    backgroundColor = (ignoreElementsRegExp.test(element.nodeName)) ? "#efefef" : getCSS(element, "backgroundColor");


    createShape(ctx, borderData.clip);

    ctx.save();
    ctx.clip();

    if (backgroundBounds.height > 0 && backgroundBounds.width > 0 && !ignoreBackground) {
      renderBackgroundColor(ctx, bounds, backgroundColor);
      renderBackgroundImage(element, backgroundBounds, ctx);
    } else if (ignoreBackground) {
      stack.backgroundColor =  backgroundColor;
    }

    ctx.restore();

    borderData.borders.forEach(function(border) {
      renderBorders(ctx, border.args, border.color);
    });

    if (!pseudoElement) {
      injectPseudoElements(element, stack);
    }

    switch(element.nodeName){
      case "IMG":
        if ((image = loadImage(element.getAttribute('src')))) {
          renderImage(ctx, element, image, bounds, borders);
        } else {
          Util.log("html2canvas: Error loading <img>:" + element.getAttribute('src'));
        }
        break;
      case "INPUT":
        // TODO add all relevant type's, i.e. HTML5 new stuff
        // todo add support for placeholder attribute for browsers which support it
        if (/^(text|url|email|submit|button|reset)$/.test(element.type) && (element.value || element.placeholder || "").length > 0){
          renderFormValue(element, bounds, stack);
        }
        break;
      case "TEXTAREA":
        if ((element.value || element.placeholder || "").length > 0){
          renderFormValue(element, bounds, stack);
        }
        break;
      case "SELECT":
        if ((element.options||element.placeholder || "").length > 0){
          renderFormValue(element, bounds, stack);
        }
        break;
      case "LI":
        renderListItem(element, stack, backgroundBounds);
        break;
      case "CANVAS":
        renderImage(ctx, element, element, bounds, borders);
        break;
    }

    return stack;
  }

  function isElementVisible(element) {
    return (getCSS(element, 'display') !== "none" && getCSS(element, 'visibility') !== "hidden" && !element.hasAttribute("data-html2canvas-ignore"));
  }

  function parseElement (element, stack, pseudoElement) {
    if (isElementVisible(element)) {
      stack = renderElement(element, stack, pseudoElement, false) || stack;
      if (!ignoreElementsRegExp.test(element.nodeName)) {
        parseChildren(element, stack, pseudoElement);
      }
    }
  }

  function parseChildren(element, stack, pseudoElement) {
    Util.Children(element).forEach(function(node) {
      if (node.nodeType === node.ELEMENT_NODE) {
        parseElement(node, stack, pseudoElement);
      } else if (node.nodeType === node.TEXT_NODE) {
        renderText(element, node, stack);
      }
    });
  }

  function init() {
    var background = getCSS(document.documentElement, "backgroundColor"),
      transparentBackground = (Util.isTransparent(background) && element === document.body),
      stack = renderElement(element, null, false, transparentBackground);
    parseChildren(element, stack);

    if (transparentBackground) {
      background = stack.backgroundColor;
    }

    body.removeChild(hidePseudoElements);
    return {
      backgroundColor: background,
      stack: stack
    };
  }

  return init();
};

function h2czContext(zindex) {
  return {
    zindex: zindex,
    children: []
  };
}

_html2canvas.Preload = function( options ) {

  var images = {
    numLoaded: 0,   // also failed are counted here
    numFailed: 0,
    numTotal: 0,
    cleanupDone: false
  },
  pageOrigin,
  Util = _html2canvas.Util,
  methods,
  i,
  count = 0,
  element = options.elements[0] || document.body,
  doc = element.ownerDocument,
  domImages = element.getElementsByTagName('img'), // Fetch images of the present element only
  imgLen = domImages.length,
  link = doc.createElement("a"),
  supportCORS = (function( img ){
    return (img.crossOrigin !== undefined);
  })(new Image()),
  timeoutTimer;

  link.href = window.location.href;
  pageOrigin  = link.protocol + link.host;

  function isSameOrigin(url){
    link.href = url;
    link.href = link.href; // YES, BELIEVE IT OR NOT, that is required for IE9 - http://jsfiddle.net/niklasvh/2e48b/
    var origin = link.protocol + link.host;
    return (origin === pageOrigin);
  }

  function start(){
    Util.log("html2canvas: start: images: " + images.numLoaded + " / " + images.numTotal + " (failed: " + images.numFailed + ")");
    if (!images.firstRun && images.numLoaded >= images.numTotal){
      Util.log("Finished loading images: # " + images.numTotal + " (failed: " + images.numFailed + ")");

      if (typeof options.complete === "function"){
        options.complete(images);
      }

    }
  }

  // TODO modify proxy to serve images with CORS enabled, where available
  function proxyGetImage(url, img, imageObj){
    var callback_name,
    scriptUrl = options.proxy,
    script;

    link.href = url;
    url = link.href; // work around for pages with base href="" set - WARNING: this may change the url

    callback_name = 'html2canvas_' + (count++);
    imageObj.callbackname = callback_name;

    if (scriptUrl.indexOf("?") > -1) {
      scriptUrl += "&";
    } else {
      scriptUrl += "?";
    }
    scriptUrl += 'url=' + encodeURIComponent(url) + '&callback=' + callback_name;
    script = doc.createElement("script");

    window[callback_name] = function(a){
      if (a.substring(0,6) === "error:"){
        imageObj.succeeded = false;
        images.numLoaded++;
        images.numFailed++;
        start();
      } else {
        setImageLoadHandlers(img, imageObj);
        img.src = a;
      }
      window[callback_name] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
      try {
        delete window[callback_name];  // for all browser that support this
      } catch(ex) {}
      script.parentNode.removeChild(script);
      script = null;
      delete imageObj.script;
      delete imageObj.callbackname;
    };

    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", scriptUrl);
    imageObj.script = script;
    window.document.body.appendChild(script);

  }

  function loadPseudoElement(element, type) {
    var style = window.getComputedStyle(element, type),
    content = style.content;
    if (content.substr(0, 3) === 'url') {
      methods.loadImage(_html2canvas.Util.parseBackgroundImage(content)[0].args[0]);
    }
    loadBackgroundImages(style.backgroundImage, element);
  }

  function loadPseudoElementImages(element) {
    loadPseudoElement(element, ":before");
    loadPseudoElement(element, ":after");
  }

  function loadGradientImage(backgroundImage, bounds) {
    var img = _html2canvas.Generate.Gradient(backgroundImage, bounds);

    if (img !== undefined){
      images[backgroundImage] = {
        img: img,
        succeeded: true
      };
      images.numTotal++;
      images.numLoaded++;
      start();
    }
  }

  function invalidBackgrounds(background_image) {
    return (background_image && background_image.method && background_image.args && background_image.args.length > 0 );
  }

  function loadBackgroundImages(background_image, el) {
    var bounds;

    _html2canvas.Util.parseBackgroundImage(background_image).filter(invalidBackgrounds).forEach(function(background_image) {
      if (background_image.method === 'url') {
        methods.loadImage(background_image.args[0]);
      } else if(background_image.method.match(/\-?gradient$/)) {
        if(bounds === undefined) {
          bounds = _html2canvas.Util.Bounds(el);
        }
        loadGradientImage(background_image.value, bounds);
      }
    });
  }

  function getImages (el) {
    var elNodeType = false;

    // Firefox fails with permission denied on pages with iframes
    try {
      Util.Children(el).forEach(getImages);
    }
    catch( e ) {}

    try {
      elNodeType = el.nodeType;
    } catch (ex) {
      elNodeType = false;
      Util.log("html2canvas: failed to access some element's nodeType - Exception: " + ex.message);
    }

    if (elNodeType === 1 || elNodeType === undefined) {
      loadPseudoElementImages(el);
      try {
        loadBackgroundImages(Util.getCSS(el, 'backgroundImage'), el);
      } catch(e) {
        Util.log("html2canvas: failed to get background-image - Exception: " + e.message);
      }
      loadBackgroundImages(el);
    }
  }

  function setImageLoadHandlers(img, imageObj) {
    img.onload = function() {
      if ( imageObj.timer !== undefined ) {
        // CORS succeeded
        window.clearTimeout( imageObj.timer );
      }

      images.numLoaded++;
      imageObj.succeeded = true;
      img.onerror = img.onload = null;
      start();
    };
    img.onerror = function() {
      if (img.crossOrigin === "anonymous") {
        // CORS failed
        window.clearTimeout( imageObj.timer );

        // let's try with proxy instead
        if ( options.proxy ) {
          var src = img.src;
          img = new Image();
          imageObj.img = img;
          img.src = src;

          proxyGetImage( img.src, img, imageObj );
          return;
        }
      }

      images.numLoaded++;
      images.numFailed++;
      imageObj.succeeded = false;
      img.onerror = img.onload = null;
      start();
    };
  }

  methods = {
    loadImage: function( src ) {
      var img, imageObj;
      if ( src && images[src] === undefined ) {
        img = new Image();
        if ( src.match(/data:image\/.*;base64,/i) ) {
          img.src = src.replace(/url\(['"]{0,}|['"]{0,}\)$/ig, '');
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          setImageLoadHandlers(img, imageObj);
        } else if ( isSameOrigin( src ) || options.allowTaint ===  true ) {
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          setImageLoadHandlers(img, imageObj);
          img.src = src;
        } else if ( supportCORS && !options.allowTaint && options.useCORS ) {
          // attempt to load with CORS

          img.crossOrigin = "anonymous";
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          setImageLoadHandlers(img, imageObj);
          img.src = src;
        } else if ( options.proxy ) {
          imageObj = images[src] = {
            img: img
          };
          images.numTotal++;
          proxyGetImage( src, img, imageObj );
        }
      }

    },
    cleanupDOM: function(cause) {
      var img, src;
      if (!images.cleanupDone) {
        if (cause && typeof cause === "string") {
          Util.log("html2canvas: Cleanup because: " + cause);
        } else {
          Util.log("html2canvas: Cleanup after timeout: " + options.timeout + " ms.");
        }

        for (src in images) {
          if (images.hasOwnProperty(src)) {
            img = images[src];
            if (typeof img === "object" && img.callbackname && img.succeeded === undefined) {
              // cancel proxy image request
              window[img.callbackname] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
              try {
                delete window[img.callbackname];  // for all browser that support this
              } catch(ex) {}
              if (img.script && img.script.parentNode) {
                img.script.setAttribute("src", "about:blank");  // try to cancel running request
                img.script.parentNode.removeChild(img.script);
              }
              images.numLoaded++;
              images.numFailed++;
              Util.log("html2canvas: Cleaned up failed img: '" + src + "' Steps: " + images.numLoaded + " / " + images.numTotal);
            }
          }
        }

        // cancel any pending requests
        if(window.stop !== undefined) {
          window.stop();
        } else if(document.execCommand !== undefined) {
          document.execCommand("Stop", false);
        }
        if (document.close !== undefined) {
          document.close();
        }
        images.cleanupDone = true;
        if (!(cause && typeof cause === "string")) {
          start();
        }
      }
    },

    renderingDone: function() {
      if (timeoutTimer) {
        window.clearTimeout(timeoutTimer);
      }
    }
  };

  if (options.timeout > 0) {
    timeoutTimer = window.setTimeout(methods.cleanupDOM, options.timeout);
  }

  Util.log('html2canvas: Preload starts: finding background-images');
  images.firstRun = true;

  getImages(element);

  Util.log('html2canvas: Preload: Finding images');
  // load <img> images
  for (i = 0; i < imgLen; i+=1){
    methods.loadImage( domImages[i].getAttribute( "src" ) );
  }

  images.firstRun = false;
  Util.log('html2canvas: Preload: Done.');
  if (images.numTotal === images.numLoaded) {
    start();
  }

  return methods;
};

_html2canvas.Renderer = function(parseQueue, options){

  // http://www.w3.org/TR/CSS21/zindex.html
  function createRenderQueue(parseQueue) {
    var queue = [],
    rootContext;

    rootContext = (function buildStackingContext(rootNode) {
      var rootContext = {};
      function insert(context, node, specialParent) {
        var zi = (node.zIndex.zindex === 'auto') ? 0 : Number(node.zIndex.zindex),
        contextForChildren = context, // the stacking context for children
        isPositioned = node.zIndex.isPositioned,
        isFloated = node.zIndex.isFloated,
        stub = {node: node},
        childrenDest = specialParent; // where children without z-index should be pushed into

        if (node.zIndex.ownStacking) {
          // '!' comes before numbers in sorted array
          contextForChildren = stub.context = { '!': [{node:node, children: []}]};
          childrenDest = undefined;
        } else if (isPositioned || isFloated) {
          childrenDest = stub.children = [];
        }

        if (zi === 0 && specialParent) {
          specialParent.push(stub);
        } else {
          if (!context[zi]) { context[zi] = []; }
          context[zi].push(stub);
        }

        node.zIndex.children.forEach(function(childNode) {
          insert(contextForChildren, childNode, childrenDest);
        });
      }
      insert(rootContext, rootNode);
      return rootContext;
    })(parseQueue);

    function sortZ(context) {
      Object.keys(context).sort().forEach(function(zi) {
        var nonPositioned = [],
        floated = [],
        positioned = [],
        list = [];

        // positioned after static
        context[zi].forEach(function(v) {
          if (v.node.zIndex.isPositioned || v.node.zIndex.opacity < 1) {
            // http://www.w3.org/TR/css3-color/#transparency
            // non-positioned element with opactiy < 1 should be stacked as if it were a positioned element with ‘z-index: 0’ and ‘opacity: 1’.
            positioned.push(v);
          } else if (v.node.zIndex.isFloated) {
            floated.push(v);
          } else {
            nonPositioned.push(v);
          }
        });

        (function walk(arr) {
          arr.forEach(function(v) {
            list.push(v);
            if (v.children) { walk(v.children); }
          });
        })(nonPositioned.concat(floated, positioned));

        list.forEach(function(v) {
          if (v.context) {
            sortZ(v.context);
          } else {
            queue.push(v.node);
          }
        });
      });
    }

    sortZ(rootContext);

    return queue;
  }

  function getRenderer(rendererName) {
    var renderer;

    if (typeof options.renderer === "string" && _html2canvas.Renderer[rendererName] !== undefined) {
      renderer = _html2canvas.Renderer[rendererName](options);
    } else if (typeof rendererName === "function") {
      renderer = rendererName(options);
    } else {
      throw new Error("Unknown renderer");
    }

    if ( typeof renderer !== "function" ) {
      throw new Error("Invalid renderer defined");
    }
    return renderer;
  }

  return getRenderer(options.renderer)(parseQueue, options, document, createRenderQueue(parseQueue.stack), _html2canvas);
};

_html2canvas.Util.Support = function (options, doc) {

  function supportSVGRendering() {
    var img = new Image(),
    canvas = doc.createElement("canvas"),
    ctx = (canvas.getContext === undefined) ? false : canvas.getContext("2d");
    if (ctx === false) {
      return false;
    }
    canvas.width = canvas.height = 10;
    img.src = [
    "data:image/svg+xml,",
    "<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'>",
    "<foreignObject width='10' height='10'>",
    "<div xmlns='http://www.w3.org/1999/xhtml' style='width:10;height:10;'>",
    "sup",
    "</div>",
    "</foreignObject>",
    "</svg>"
    ].join("");
    try {
      ctx.drawImage(img, 0, 0);
      canvas.toDataURL();
    } catch(e) {
      return false;
    }
    _html2canvas.Util.log('html2canvas: Parse: SVG powered rendering available');
    return true;
  }

  // Test whether we can use ranges to measure bounding boxes
  // Opera doesn't provide valid bounds.height/bottom even though it supports the method.

  function supportRangeBounds() {
    var r, testElement, rangeBounds, rangeHeight, support = false;

    if (doc.createRange) {
      r = doc.createRange();
      if (r.getBoundingClientRect) {
        testElement = doc.createElement('boundtest');
        testElement.style.height = "123px";
        testElement.style.display = "block";
        doc.body.appendChild(testElement);

        r.selectNode(testElement);
        rangeBounds = r.getBoundingClientRect();
        rangeHeight = rangeBounds.height;

        if (rangeHeight === 123) {
          support = true;
        }
        doc.body.removeChild(testElement);
      }
    }

    return support;
  }

  return {
    rangeBounds: supportRangeBounds(),
    svgRendering: options.svgRendering && supportSVGRendering()
  };
};

window.html2canvas=function(elements, opts) {
  elements = (elements.length) ? elements : [elements];
  var queue,
  canvas,
  options = {
    // general
    logging: false,
    elements: elements,
    background: "#fff",

    // preload options
    proxy: null,
    timeout: 0,    // no timeout
    useCORS: false, // try to load images as CORS (where available), before falling back to proxy
    allowTaint: false, // whether to allow images to taint the canvas, won't need proxy if set to true

    // parse options
    svgRendering: false, // use svg powered rendering where available (FF11+)
    ignoreElements: "IFRAME|OBJECT|PARAM",
    useOverflow: true,
    letterRendering: false,
    chinese: false,

    // render options

    width: null,
    height: null,
    taintTest: true, // do a taint test with all images before applying to canvas
    renderer: "Canvas"
  };

  options = _html2canvas.Util.Extend(opts, options);

  _html2canvas.logging = options.logging;
  options.complete = function( images ) {

    if (typeof options.onpreloaded === "function") {
      if ( options.onpreloaded( images ) === false ) {
        return;
      }
    }
    queue = _html2canvas.Parse( images, options );

    if (typeof options.onparsed === "function") {
      if ( options.onparsed( queue ) === false ) {
        return;
      }
    }

    canvas = _html2canvas.Renderer( queue, options );

    if (typeof options.onrendered === "function") {
      options.onrendered( canvas );
    }


  };

  // for pages without images, we still want this to be async, i.e. return methods before executing
  window.setTimeout( function(){
    _html2canvas.Preload( options );
  }, 0 );

  return {
    render: function( queue, opts ) {
      return _html2canvas.Renderer( queue, _html2canvas.Util.Extend(opts, options) );
    },
    parse: function( images, opts ) {
      return _html2canvas.Parse( images, _html2canvas.Util.Extend(opts, options) );
    },
    preload: function( opts ) {
      return _html2canvas.Preload( _html2canvas.Util.Extend(opts, options) );
    },
    log: _html2canvas.Util.log
  };
};

window.html2canvas.log = _html2canvas.Util.log; // for renderers
window.html2canvas.Renderer = {
  Canvas: undefined // We are assuming this will be used
};

module.exports=window.html2canvas;

_html2canvas.Renderer.Canvas = function(options) {
  options = options || {};

  var doc = document,
  safeImages = [],
  testCanvas = document.createElement("canvas"),
  testctx = testCanvas.getContext("2d"),
  Util = _html2canvas.Util,
  canvas = options.canvas || doc.createElement('canvas');

  function createShape(ctx, args) {
    ctx.beginPath();
    args.forEach(function(arg) {
      ctx[arg.name].apply(ctx, arg['arguments']);
    });
    ctx.closePath();
  }

  function safeImage(item) {
    if (safeImages.indexOf(item['arguments'][0].src ) === -1) {
      testctx.drawImage(item['arguments'][0], 0, 0);
      try {
        testctx.getImageData(0, 0, 1, 1);
      } catch(e) {
        testCanvas = doc.createElement("canvas");
        testctx = testCanvas.getContext("2d");
        return false;
      }
      safeImages.push(item['arguments'][0].src);
    }
    return true;
  }

  function renderItem(ctx, item) {
    switch(item.type){
      case "variable":
        ctx[item.name] = item['arguments'];
        break;
      case "function":
        switch(item.name) {
          case "createPattern":
            if (item['arguments'][0].width > 0 && item['arguments'][0].height > 0) {
              try {
                ctx.fillStyle = ctx.createPattern(item['arguments'][0], "repeat");
              }
              catch(e) {
                Util.log("html2canvas: Renderer: Error creating pattern", e.message);
              }
            }
            break;
          case "drawShape":
            createShape(ctx, item['arguments']);
            break;
          case "drawImage":
            if (item['arguments'][8] > 0 && item['arguments'][7] > 0) {
              if (!options.taintTest || (options.taintTest && safeImage(item))) {
                ctx.drawImage.apply( ctx, item['arguments'] );
              }
            }
            break;
          default:
            ctx[item.name].apply(ctx, item['arguments']);
        }
        break;
    }
  }

  return function(parsedData, options, document, queue, _html2canvas) {
    var ctx = canvas.getContext("2d"),
    newCanvas,
    bounds,
    fstyle,
    zStack = parsedData.stack;

    canvas.width = canvas.style.width =  options.width || zStack.ctx.width;
    canvas.height = canvas.style.height = options.height || zStack.ctx.height;

    fstyle = ctx.fillStyle;
    ctx.fillStyle = (Util.isTransparent(zStack.backgroundColor) && options.background !== undefined) ? options.background : parsedData.backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = fstyle;

    queue.forEach(function(storageContext) {
      // set common settings for canvas
      ctx.textBaseline = "bottom";
      ctx.save();

      if (storageContext.transform.matrix) {
        ctx.translate(storageContext.transform.origin[0], storageContext.transform.origin[1]);
        ctx.transform.apply(ctx, storageContext.transform.matrix);
        ctx.translate(-storageContext.transform.origin[0], -storageContext.transform.origin[1]);
      }

      if (storageContext.clip){
        ctx.beginPath();
        ctx.rect(storageContext.clip.left, storageContext.clip.top, storageContext.clip.width, storageContext.clip.height);
        ctx.clip();
      }

      if (storageContext.ctx.storage) {
        storageContext.ctx.storage.forEach(function(item) {
          renderItem(ctx, item);
        });
      }

      ctx.restore();
    });

    Util.log("html2canvas: Renderer: Canvas renderer done - returning canvas obj");

    if (options.elements.length === 1) {
      if (typeof options.elements[0] === "object" && options.elements[0].nodeName !== "BODY") {
        // crop image to the bounds of selected (single) element
        bounds = _html2canvas.Util.Bounds(options.elements[0]);
        newCanvas = document.createElement('canvas');
        newCanvas.width = Math.ceil(bounds.width);
        newCanvas.height = Math.ceil(bounds.height);
        ctx = newCanvas.getContext("2d");

        ctx.drawImage(canvas, bounds.left, bounds.top, bounds.width, bounds.height, 0, 0, bounds.width, bounds.height);
        canvas = null;
        return newCanvas;
      }
    }

    return canvas;
  };
};
})(window,document);
},{}],8:[function(require,module,exports){
/*! Socket.IO.min.js build:0.9.16, production. Copyright(c) 2011 LearnBoost <dev@learnboost.com> MIT Licensed */
var io="undefined"==typeof module?{}:module.exports;(function(){(function(a,b){var c=a;c.version="0.9.16",c.protocol=1,c.transports=[],c.j=[],c.sockets={},c.connect=function(a,d){var e=c.util.parseUri(a),f,g;b&&b.location&&(e.protocol=e.protocol||b.location.protocol.slice(0,-1),e.host=e.host||(b.document?b.document.domain:b.location.hostname),e.port=e.port||b.location.port),f=c.util.uniqueUri(e);var h={host:e.host,secure:"https"==e.protocol,port:e.port||("https"==e.protocol?443:80),query:e.query||""};c.util.merge(h,d);if(h["force new connection"]||!c.sockets[f])g=new c.Socket(h);return!h["force new connection"]&&g&&(c.sockets[f]=g),g=g||c.sockets[f],g.of(e.path.length>1?e.path:"")}})("object"==typeof module?module.exports:this.io={},this),function(a,b){var c=a.util={},d=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,e=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"];c.parseUri=function(a){var b=d.exec(a||""),c={},f=14;while(f--)c[e[f]]=b[f]||"";return c},c.uniqueUri=function(a){var c=a.protocol,d=a.host,e=a.port;return"document"in b?(d=d||document.domain,e=e||(c=="https"&&document.location.protocol!=="https:"?443:document.location.port)):(d=d||"localhost",!e&&c=="https"&&(e=443)),(c||"http")+"://"+d+":"+(e||80)},c.query=function(a,b){var d=c.chunkQuery(a||""),e=[];c.merge(d,c.chunkQuery(b||""));for(var f in d)d.hasOwnProperty(f)&&e.push(f+"="+d[f]);return e.length?"?"+e.join("&"):""},c.chunkQuery=function(a){var b={},c=a.split("&"),d=0,e=c.length,f;for(;d<e;++d)f=c[d].split("="),f[0]&&(b[f[0]]=f[1]);return b};var f=!1;c.load=function(a){if("document"in b&&document.readyState==="complete"||f)return a();c.on(b,"load",a,!1)},c.on=function(a,b,c,d){a.attachEvent?a.attachEvent("on"+b,c):a.addEventListener&&a.addEventListener(b,c,d)},c.request=function(a){if(a&&"undefined"!=typeof XDomainRequest&&!c.ua.hasCORS)return new XDomainRequest;if("undefined"!=typeof XMLHttpRequest&&(!a||c.ua.hasCORS))return new XMLHttpRequest;if(!a)try{return new(window[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")}catch(b){}return null},"undefined"!=typeof window&&c.load(function(){f=!0}),c.defer=function(a){if(!c.ua.webkit||"undefined"!=typeof importScripts)return a();c.load(function(){setTimeout(a,100)})},c.merge=function(b,d,e,f){var g=f||[],h=typeof e=="undefined"?2:e,i;for(i in d)d.hasOwnProperty(i)&&c.indexOf(g,i)<0&&(typeof b[i]!="object"||!h?(b[i]=d[i],g.push(d[i])):c.merge(b[i],d[i],h-1,g));return b},c.mixin=function(a,b){c.merge(a.prototype,b.prototype)},c.inherit=function(a,b){function c(){}c.prototype=b.prototype,a.prototype=new c},c.isArray=Array.isArray||function(a){return Object.prototype.toString.call(a)==="[object Array]"},c.intersect=function(a,b){var d=[],e=a.length>b.length?a:b,f=a.length>b.length?b:a;for(var g=0,h=f.length;g<h;g++)~c.indexOf(e,f[g])&&d.push(f[g]);return d},c.indexOf=function(a,b,c){for(var d=a.length,c=c<0?c+d<0?0:c+d:c||0;c<d&&a[c]!==b;c++);return d<=c?-1:c},c.toArray=function(a){var b=[];for(var c=0,d=a.length;c<d;c++)b.push(a[c]);return b},c.ua={},c.ua.hasCORS="undefined"!=typeof XMLHttpRequest&&function(){try{var a=new XMLHttpRequest}catch(b){return!1}return a.withCredentials!=undefined}(),c.ua.webkit="undefined"!=typeof navigator&&/webkit/i.test(navigator.userAgent),c.ua.iDevice="undefined"!=typeof navigator&&/iPad|iPhone|iPod/i.test(navigator.userAgent)}("undefined"!=typeof io?io:module.exports,this),function(a,b){function c(){}a.EventEmitter=c,c.prototype.on=function(a,c){return this.$events||(this.$events={}),this.$events[a]?b.util.isArray(this.$events[a])?this.$events[a].push(c):this.$events[a]=[this.$events[a],c]:this.$events[a]=c,this},c.prototype.addListener=c.prototype.on,c.prototype.once=function(a,b){function d(){c.removeListener(a,d),b.apply(this,arguments)}var c=this;return d.listener=b,this.on(a,d),this},c.prototype.removeListener=function(a,c){if(this.$events&&this.$events[a]){var d=this.$events[a];if(b.util.isArray(d)){var e=-1;for(var f=0,g=d.length;f<g;f++)if(d[f]===c||d[f].listener&&d[f].listener===c){e=f;break}if(e<0)return this;d.splice(e,1),d.length||delete this.$events[a]}else(d===c||d.listener&&d.listener===c)&&delete this.$events[a]}return this},c.prototype.removeAllListeners=function(a){return a===undefined?(this.$events={},this):(this.$events&&this.$events[a]&&(this.$events[a]=null),this)},c.prototype.listeners=function(a){return this.$events||(this.$events={}),this.$events[a]||(this.$events[a]=[]),b.util.isArray(this.$events[a])||(this.$events[a]=[this.$events[a]]),this.$events[a]},c.prototype.emit=function(a){if(!this.$events)return!1;var c=this.$events[a];if(!c)return!1;var d=Array.prototype.slice.call(arguments,1);if("function"==typeof c)c.apply(this,d);else{if(!b.util.isArray(c))return!1;var e=c.slice();for(var f=0,g=e.length;f<g;f++)e[f].apply(this,d)}return!0}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(exports,nativeJSON){function f(a){return a<10?"0"+a:a}function date(a,b){return isFinite(a.valueOf())?a.getUTCFullYear()+"-"+f(a.getUTCMonth()+1)+"-"+f(a.getUTCDate())+"T"+f(a.getUTCHours())+":"+f(a.getUTCMinutes())+":"+f(a.getUTCSeconds())+"Z":null}function quote(a){return escapable.lastIndex=0,escapable.test(a)?'"'+a.replace(escapable,function(a){var b=meta[a];return typeof b=="string"?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function str(a,b){var c,d,e,f,g=gap,h,i=b[a];i instanceof Date&&(i=date(a)),typeof rep=="function"&&(i=rep.call(b,a,i));switch(typeof i){case"string":return quote(i);case"number":return isFinite(i)?String(i):"null";case"boolean":case"null":return String(i);case"object":if(!i)return"null";gap+=indent,h=[];if(Object.prototype.toString.apply(i)==="[object Array]"){f=i.length;for(c=0;c<f;c+=1)h[c]=str(c,i)||"null";return e=h.length===0?"[]":gap?"[\n"+gap+h.join(",\n"+gap)+"\n"+g+"]":"["+h.join(",")+"]",gap=g,e}if(rep&&typeof rep=="object"){f=rep.length;for(c=0;c<f;c+=1)typeof rep[c]=="string"&&(d=rep[c],e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e))}else for(d in i)Object.prototype.hasOwnProperty.call(i,d)&&(e=str(d,i),e&&h.push(quote(d)+(gap?": ":":")+e));return e=h.length===0?"{}":gap?"{\n"+gap+h.join(",\n"+gap)+"\n"+g+"}":"{"+h.join(",")+"}",gap=g,e}}"use strict";if(nativeJSON&&nativeJSON.parse)return exports.JSON={parse:nativeJSON.parse,stringify:nativeJSON.stringify};var JSON=exports.JSON={},cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;JSON.stringify=function(a,b,c){var d;gap="",indent="";if(typeof c=="number")for(d=0;d<c;d+=1)indent+=" ";else typeof c=="string"&&(indent=c);rep=b;if(!b||typeof b=="function"||typeof b=="object"&&typeof b.length=="number")return str("",{"":a});throw new Error("JSON.stringify")},JSON.parse=function(text,reviver){function walk(a,b){var c,d,e=a[b];if(e&&typeof e=="object")for(c in e)Object.prototype.hasOwnProperty.call(e,c)&&(d=walk(e,c),d!==undefined?e[c]=d:delete e[c]);return reviver.call(a,b,e)}var j;text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)}));if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),typeof reviver=="function"?walk({"":j},""):j;throw new SyntaxError("JSON.parse")}}("undefined"!=typeof io?io:module.exports,typeof JSON!="undefined"?JSON:undefined),function(a,b){var c=a.parser={},d=c.packets=["disconnect","connect","heartbeat","message","json","event","ack","error","noop"],e=c.reasons=["transport not supported","client not handshaken","unauthorized"],f=c.advice=["reconnect"],g=b.JSON,h=b.util.indexOf;c.encodePacket=function(a){var b=h(d,a.type),c=a.id||"",i=a.endpoint||"",j=a.ack,k=null;switch(a.type){case"error":var l=a.reason?h(e,a.reason):"",m=a.advice?h(f,a.advice):"";if(l!==""||m!=="")k=l+(m!==""?"+"+m:"");break;case"message":a.data!==""&&(k=a.data);break;case"event":var n={name:a.name};a.args&&a.args.length&&(n.args=a.args),k=g.stringify(n);break;case"json":k=g.stringify(a.data);break;case"connect":a.qs&&(k=a.qs);break;case"ack":k=a.ackId+(a.args&&a.args.length?"+"+g.stringify(a.args):"")}var o=[b,c+(j=="data"?"+":""),i];return k!==null&&k!==undefined&&o.push(k),o.join(":")},c.encodePayload=function(a){var b="";if(a.length==1)return a[0];for(var c=0,d=a.length;c<d;c++){var e=a[c];b+="\ufffd"+e.length+"\ufffd"+a[c]}return b};var i=/([^:]+):([0-9]+)?(\+)?:([^:]+)?:?([\s\S]*)?/;c.decodePacket=function(a){var b=a.match(i);if(!b)return{};var c=b[2]||"",a=b[5]||"",h={type:d[b[1]],endpoint:b[4]||""};c&&(h.id=c,b[3]?h.ack="data":h.ack=!0);switch(h.type){case"error":var b=a.split("+");h.reason=e[b[0]]||"",h.advice=f[b[1]]||"";break;case"message":h.data=a||"";break;case"event":try{var j=g.parse(a);h.name=j.name,h.args=j.args}catch(k){}h.args=h.args||[];break;case"json":try{h.data=g.parse(a)}catch(k){}break;case"connect":h.qs=a||"";break;case"ack":var b=a.match(/^([0-9]+)(\+)?(.*)/);if(b){h.ackId=b[1],h.args=[];if(b[3])try{h.args=b[3]?g.parse(b[3]):[]}catch(k){}}break;case"disconnect":case"heartbeat":}return h},c.decodePayload=function(a){if(a.charAt(0)=="\ufffd"){var b=[];for(var d=1,e="";d<a.length;d++)a.charAt(d)=="\ufffd"?(b.push(c.decodePacket(a.substr(d+1).substr(0,e))),d+=Number(e)+1,e=""):e+=a.charAt(d);return b}return[c.decodePacket(a)]}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b){function c(a,b){this.socket=a,this.sessid=b}a.Transport=c,b.util.mixin(c,b.EventEmitter),c.prototype.heartbeats=function(){return!0},c.prototype.onData=function(a){this.clearCloseTimeout(),(this.socket.connected||this.socket.connecting||this.socket.reconnecting)&&this.setCloseTimeout();if(a!==""){var c=b.parser.decodePayload(a);if(c&&c.length)for(var d=0,e=c.length;d<e;d++)this.onPacket(c[d])}return this},c.prototype.onPacket=function(a){return this.socket.setHeartbeatTimeout(),a.type=="heartbeat"?this.onHeartbeat():(a.type=="connect"&&a.endpoint==""&&this.onConnect(),a.type=="error"&&a.advice=="reconnect"&&(this.isOpen=!1),this.socket.onPacket(a),this)},c.prototype.setCloseTimeout=function(){if(!this.closeTimeout){var a=this;this.closeTimeout=setTimeout(function(){a.onDisconnect()},this.socket.closeTimeout)}},c.prototype.onDisconnect=function(){return this.isOpen&&this.close(),this.clearTimeouts(),this.socket.onDisconnect(),this},c.prototype.onConnect=function(){return this.socket.onConnect(),this},c.prototype.clearCloseTimeout=function(){this.closeTimeout&&(clearTimeout(this.closeTimeout),this.closeTimeout=null)},c.prototype.clearTimeouts=function(){this.clearCloseTimeout(),this.reopenTimeout&&clearTimeout(this.reopenTimeout)},c.prototype.packet=function(a){this.send(b.parser.encodePacket(a))},c.prototype.onHeartbeat=function(a){this.packet({type:"heartbeat"})},c.prototype.onOpen=function(){this.isOpen=!0,this.clearCloseTimeout(),this.socket.onOpen()},c.prototype.onClose=function(){var a=this;this.isOpen=!1,this.socket.onClose(),this.onDisconnect()},c.prototype.prepareUrl=function(){var a=this.socket.options;return this.scheme()+"://"+a.host+":"+a.port+"/"+a.resource+"/"+b.protocol+"/"+this.name+"/"+this.sessid},c.prototype.ready=function(a,b){b.call(this)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(a){this.options={port:80,secure:!1,document:"document"in c?document:!1,resource:"socket.io",transports:b.transports,"connect timeout":1e4,"try multiple transports":!0,reconnect:!0,"reconnection delay":500,"reconnection limit":Infinity,"reopen delay":3e3,"max reconnection attempts":10,"sync disconnect on unload":!1,"auto connect":!0,"flash policy port":10843,manualFlush:!1},b.util.merge(this.options,a),this.connected=!1,this.open=!1,this.connecting=!1,this.reconnecting=!1,this.namespaces={},this.buffer=[],this.doBuffer=!1;if(this.options["sync disconnect on unload"]&&(!this.isXDomain()||b.util.ua.hasCORS)){var d=this;b.util.on(c,"beforeunload",function(){d.disconnectSync()},!1)}this.options["auto connect"]&&this.connect()}function e(){}a.Socket=d,b.util.mixin(d,b.EventEmitter),d.prototype.of=function(a){return this.namespaces[a]||(this.namespaces[a]=new b.SocketNamespace(this,a),a!==""&&this.namespaces[a].packet({type:"connect"})),this.namespaces[a]},d.prototype.publish=function(){this.emit.apply(this,arguments);var a;for(var b in this.namespaces)this.namespaces.hasOwnProperty(b)&&(a=this.of(b),a.$emit.apply(a,arguments))},d.prototype.handshake=function(a){function f(b){b instanceof Error?(c.connecting=!1,c.onError(b.message)):a.apply(null,b.split(":"))}var c=this,d=this.options,g=["http"+(d.secure?"s":"")+":/",d.host+":"+d.port,d.resource,b.protocol,b.util.query(this.options.query,"t="+ +(new Date))].join("/");if(this.isXDomain()&&!b.util.ua.hasCORS){var h=document.getElementsByTagName("script")[0],i=document.createElement("script");i.src=g+"&jsonp="+b.j.length,h.parentNode.insertBefore(i,h),b.j.push(function(a){f(a),i.parentNode.removeChild(i)})}else{var j=b.util.request();j.open("GET",g,!0),this.isXDomain()&&(j.withCredentials=!0),j.onreadystatechange=function(){j.readyState==4&&(j.onreadystatechange=e,j.status==200?f(j.responseText):j.status==403?c.onError(j.responseText):(c.connecting=!1,!c.reconnecting&&c.onError(j.responseText)))},j.send(null)}},d.prototype.getTransport=function(a){var c=a||this.transports,d;for(var e=0,f;f=c[e];e++)if(b.Transport[f]&&b.Transport[f].check(this)&&(!this.isXDomain()||b.Transport[f].xdomainCheck(this)))return new b.Transport[f](this,this.sessionid);return null},d.prototype.connect=function(a){if(this.connecting)return this;var c=this;return c.connecting=!0,this.handshake(function(d,e,f,g){function h(a){c.transport&&c.transport.clearTimeouts(),c.transport=c.getTransport(a);if(!c.transport)return c.publish("connect_failed");c.transport.ready(c,function(){c.connecting=!0,c.publish("connecting",c.transport.name),c.transport.open(),c.options["connect timeout"]&&(c.connectTimeoutTimer=setTimeout(function(){if(!c.connected){c.connecting=!1;if(c.options["try multiple transports"]){var a=c.transports;while(a.length>0&&a.splice(0,1)[0]!=c.transport.name);a.length?h(a):c.publish("connect_failed")}}},c.options["connect timeout"]))})}c.sessionid=d,c.closeTimeout=f*1e3,c.heartbeatTimeout=e*1e3,c.transports||(c.transports=c.origTransports=g?b.util.intersect(g.split(","),c.options.transports):c.options.transports),c.setHeartbeatTimeout(),h(c.transports),c.once("connect",function(){clearTimeout(c.connectTimeoutTimer),a&&typeof a=="function"&&a()})}),this},d.prototype.setHeartbeatTimeout=function(){clearTimeout(this.heartbeatTimeoutTimer);if(this.transport&&!this.transport.heartbeats())return;var a=this;this.heartbeatTimeoutTimer=setTimeout(function(){a.transport.onClose()},this.heartbeatTimeout)},d.prototype.packet=function(a){return this.connected&&!this.doBuffer?this.transport.packet(a):this.buffer.push(a),this},d.prototype.setBuffer=function(a){this.doBuffer=a,!a&&this.connected&&this.buffer.length&&(this.options.manualFlush||this.flushBuffer())},d.prototype.flushBuffer=function(){this.transport.payload(this.buffer),this.buffer=[]},d.prototype.disconnect=function(){if(this.connected||this.connecting)this.open&&this.of("").packet({type:"disconnect"}),this.onDisconnect("booted");return this},d.prototype.disconnectSync=function(){var a=b.util.request(),c=["http"+(this.options.secure?"s":"")+":/",this.options.host+":"+this.options.port,this.options.resource,b.protocol,"",this.sessionid].join("/")+"/?disconnect=1";a.open("GET",c,!1),a.send(null),this.onDisconnect("booted")},d.prototype.isXDomain=function(){var a=c.location.port||("https:"==c.location.protocol?443:80);return this.options.host!==c.location.hostname||this.options.port!=a},d.prototype.onConnect=function(){this.connected||(this.connected=!0,this.connecting=!1,this.doBuffer||this.setBuffer(!1),this.emit("connect"))},d.prototype.onOpen=function(){this.open=!0},d.prototype.onClose=function(){this.open=!1,clearTimeout(this.heartbeatTimeoutTimer)},d.prototype.onPacket=function(a){this.of(a.endpoint).onPacket(a)},d.prototype.onError=function(a){a&&a.advice&&a.advice==="reconnect"&&(this.connected||this.connecting)&&(this.disconnect(),this.options.reconnect&&this.reconnect()),this.publish("error",a&&a.reason?a.reason:a)},d.prototype.onDisconnect=function(a){var b=this.connected,c=this.connecting;this.connected=!1,this.connecting=!1,this.open=!1;if(b||c)this.transport.close(),this.transport.clearTimeouts(),b&&(this.publish("disconnect",a),"booted"!=a&&this.options.reconnect&&!this.reconnecting&&this.reconnect())},d.prototype.reconnect=function(){function e(){if(a.connected){for(var b in a.namespaces)a.namespaces.hasOwnProperty(b)&&""!==b&&a.namespaces[b].packet({type:"connect"});a.publish("reconnect",a.transport.name,a.reconnectionAttempts)}clearTimeout(a.reconnectionTimer),a.removeListener("connect_failed",f),a.removeListener("connect",f),a.reconnecting=!1,delete a.reconnectionAttempts,delete a.reconnectionDelay,delete a.reconnectionTimer,delete a.redoTransports,a.options["try multiple transports"]=c}function f(){if(!a.reconnecting)return;if(a.connected)return e();if(a.connecting&&a.reconnecting)return a.reconnectionTimer=setTimeout(f,1e3);a.reconnectionAttempts++>=b?a.redoTransports?(a.publish("reconnect_failed"),e()):(a.on("connect_failed",f),a.options["try multiple transports"]=!0,a.transports=a.origTransports,a.transport=a.getTransport(),a.redoTransports=!0,a.connect()):(a.reconnectionDelay<d&&(a.reconnectionDelay*=2),a.connect(),a.publish("reconnecting",a.reconnectionDelay,a.reconnectionAttempts),a.reconnectionTimer=setTimeout(f,a.reconnectionDelay))}this.reconnecting=!0,this.reconnectionAttempts=0,this.reconnectionDelay=this.options["reconnection delay"];var a=this,b=this.options["max reconnection attempts"],c=this.options["try multiple transports"],d=this.options["reconnection limit"];this.options["try multiple transports"]=!1,this.reconnectionTimer=setTimeout(f,this.reconnectionDelay),this.on("connect",f)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(a,b){this.socket=a,this.name=b||"",this.flags={},this.json=new d(this,"json"),this.ackPackets=0,this.acks={}}function d(a,b){this.namespace=a,this.name=b}a.SocketNamespace=c,b.util.mixin(c,b.EventEmitter),c.prototype.$emit=b.EventEmitter.prototype.emit,c.prototype.of=function(){return this.socket.of.apply(this.socket,arguments)},c.prototype.packet=function(a){return a.endpoint=this.name,this.socket.packet(a),this.flags={},this},c.prototype.send=function(a,b){var c={type:this.flags.json?"json":"message",data:a};return"function"==typeof b&&(c.id=++this.ackPackets,c.ack=!0,this.acks[c.id]=b),this.packet(c)},c.prototype.emit=function(a){var b=Array.prototype.slice.call(arguments,1),c=b[b.length-1],d={type:"event",name:a};return"function"==typeof c&&(d.id=++this.ackPackets,d.ack="data",this.acks[d.id]=c,b=b.slice(0,b.length-1)),d.args=b,this.packet(d)},c.prototype.disconnect=function(){return this.name===""?this.socket.disconnect():(this.packet({type:"disconnect"}),this.$emit("disconnect")),this},c.prototype.onPacket=function(a){function d(){c.packet({type:"ack",args:b.util.toArray(arguments),ackId:a.id})}var c=this;switch(a.type){case"connect":this.$emit("connect");break;case"disconnect":this.name===""?this.socket.onDisconnect(a.reason||"booted"):this.$emit("disconnect",a.reason);break;case"message":case"json":var e=["message",a.data];a.ack=="data"?e.push(d):a.ack&&this.packet({type:"ack",ackId:a.id}),this.$emit.apply(this,e);break;case"event":var e=[a.name].concat(a.args);a.ack=="data"&&e.push(d),this.$emit.apply(this,e);break;case"ack":this.acks[a.ackId]&&(this.acks[a.ackId].apply(this,a.args),delete this.acks[a.ackId]);break;case"error":a.advice?this.socket.onError(a):a.reason=="unauthorized"?this.$emit("connect_failed",a.reason):this.$emit("error",a.reason)}},d.prototype.send=function(){this.namespace.flags[this.name]=!0,this.namespace.send.apply(this.namespace,arguments)},d.prototype.emit=function(){this.namespace.flags[this.name]=!0,this.namespace.emit.apply(this.namespace,arguments)}}("undefined"!=typeof io?io:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(a){b.Transport.apply(this,arguments)}a.websocket=d,b.util.inherit(d,b.Transport),d.prototype.name="websocket",d.prototype.open=function(){var a=b.util.query(this.socket.options.query),d=this,e;return e||(e=c.MozWebSocket||c.WebSocket),this.websocket=new e(this.prepareUrl()+a),this.websocket.onopen=function(){d.onOpen(),d.socket.setBuffer(!1)},this.websocket.onmessage=function(a){d.onData(a.data)},this.websocket.onclose=function(){d.onClose(),d.socket.setBuffer(!0)},this.websocket.onerror=function(a){d.onError(a)},this},b.util.ua.iDevice?d.prototype.send=function(a){var b=this;return setTimeout(function(){b.websocket.send(a)},0),this}:d.prototype.send=function(a){return this.websocket.send(a),this},d.prototype.payload=function(a){for(var b=0,c=a.length;b<c;b++)this.packet(a[b]);return this},d.prototype.close=function(){return this.websocket.close(),this},d.prototype.onError=function(a){this.socket.onError(a)},d.prototype.scheme=function(){return this.socket.options.secure?"wss":"ws"},d.check=function(){return"WebSocket"in c&&!("__addTask"in WebSocket)||"MozWebSocket"in c},d.xdomainCheck=function(){return!0},b.transports.push("websocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(){b.Transport.websocket.apply(this,arguments)}a.flashsocket=c,b.util.inherit(c,b.Transport.websocket),c.prototype.name="flashsocket",c.prototype.open=function(){var a=this,c=arguments;return WebSocket.__addTask(function(){b.Transport.websocket.prototype.open.apply(a,c)}),this},c.prototype.send=function(){var a=this,c=arguments;return WebSocket.__addTask(function(){b.Transport.websocket.prototype.send.apply(a,c)}),this},c.prototype.close=function(){return WebSocket.__tasks.length=0,b.Transport.websocket.prototype.close.call(this),this},c.prototype.ready=function(a,d){function e(){var b=a.options,e=b["flash policy port"],g=["http"+(b.secure?"s":"")+":/",b.host+":"+b.port,b.resource,"static/flashsocket","WebSocketMain"+(a.isXDomain()?"Insecure":"")+".swf"];c.loaded||(typeof WEB_SOCKET_SWF_LOCATION=="undefined"&&(WEB_SOCKET_SWF_LOCATION=g.join("/")),e!==843&&WebSocket.loadFlashPolicyFile("xmlsocket://"+b.host+":"+e),WebSocket.__initialize(),c.loaded=!0),d.call(f)}var f=this;if(document.body)return e();b.util.load(e)},c.check=function(){return typeof WebSocket!="undefined"&&"__initialize"in WebSocket&&!!swfobject?swfobject.getFlashPlayerVersion().major>=10:!1},c.xdomainCheck=function(){return!0},typeof window!="undefined"&&(WEB_SOCKET_DISABLE_AUTO_INITIALIZATION=!0),b.transports.push("flashsocket")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports);if("undefined"!=typeof window)var swfobject=function(){function A(){if(t)return;try{var a=i.getElementsByTagName("body")[0].appendChild(Q("span"));a.parentNode.removeChild(a)}catch(b){return}t=!0;var c=l.length;for(var d=0;d<c;d++)l[d]()}function B(a){t?a():l[l.length]=a}function C(b){if(typeof h.addEventListener!=a)h.addEventListener("load",b,!1);else if(typeof i.addEventListener!=a)i.addEventListener("load",b,!1);else if(typeof h.attachEvent!=a)R(h,"onload",b);else if(typeof h.onload=="function"){var c=h.onload;h.onload=function(){c(),b()}}else h.onload=b}function D(){k?E():F()}function E(){var c=i.getElementsByTagName("body")[0],d=Q(b);d.setAttribute("type",e);var f=c.appendChild(d);if(f){var g=0;(function(){if(typeof f.GetVariable!=a){var b=f.GetVariable("$version");b&&(b=b.split(" ")[1].split(","),y.pv=[parseInt(b[0],10),parseInt(b[1],10),parseInt(b[2],10)])}else if(g<10){g++,setTimeout(arguments.callee,10);return}c.removeChild(d),f=null,F()})()}else F()}function F(){var b=m.length;if(b>0)for(var c=0;c<b;c++){var d=m[c].id,e=m[c].callbackFn,f={success:!1,id:d};if(y.pv[0]>0){var g=P(d);if(g)if(S(m[c].swfVersion)&&!(y.wk&&y.wk<312))U(d,!0),e&&(f.success=!0,f.ref=G(d),e(f));else if(m[c].expressInstall&&H()){var h={};h.data=m[c].expressInstall,h.width=g.getAttribute("width")||"0",h.height=g.getAttribute("height")||"0",g.getAttribute("class")&&(h.styleclass=g.getAttribute("class")),g.getAttribute("align")&&(h.align=g.getAttribute("align"));var i={},j=g.getElementsByTagName("param"),k=j.length;for(var l=0;l<k;l++)j[l].getAttribute("name").toLowerCase()!="movie"&&(i[j[l].getAttribute("name")]=j[l].getAttribute("value"));I(h,i,d,e)}else J(g),e&&e(f)}else{U(d,!0);if(e){var n=G(d);n&&typeof n.SetVariable!=a&&(f.success=!0,f.ref=n),e(f)}}}}function G(c){var d=null,e=P(c);if(e&&e.nodeName=="OBJECT")if(typeof e.SetVariable!=a)d=e;else{var f=e.getElementsByTagName(b)[0];f&&(d=f)}return d}function H(){return!u&&S("6.0.65")&&(y.win||y.mac)&&!(y.wk&&y.wk<312)}function I(b,c,d,e){u=!0,r=e||null,s={success:!1,id:d};var g=P(d);if(g){g.nodeName=="OBJECT"?(p=K(g),q=null):(p=g,q=d),b.id=f;if(typeof b.width==a||!/%$/.test(b.width)&&parseInt(b.width,10)<310)b.width="310";if(typeof b.height==a||!/%$/.test(b.height)&&parseInt(b.height,10)<137)b.height="137";i.title=i.title.slice(0,47)+" - Flash Player Installation";var j=y.ie&&y.win?["Active"].concat("").join("X"):"PlugIn",k="MMredirectURL="+h.location.toString().replace(/&/g,"%26")+"&MMplayerType="+j+"&MMdoctitle="+i.title;typeof c.flashvars!=a?c.flashvars+="&"+k:c.flashvars=k;if(y.ie&&y.win&&g.readyState!=4){var l=Q("div");d+="SWFObjectNew",l.setAttribute("id",d),g.parentNode.insertBefore(l,g),g.style.display="none",function(){g.readyState==4?g.parentNode.removeChild(g):setTimeout(arguments.callee,10)}()}L(b,c,d)}}function J(a){if(y.ie&&y.win&&a.readyState!=4){var b=Q("div");a.parentNode.insertBefore(b,a),b.parentNode.replaceChild(K(a),b),a.style.display="none",function(){a.readyState==4?a.parentNode.removeChild(a):setTimeout(arguments.callee,10)}()}else a.parentNode.replaceChild(K(a),a)}function K(a){var c=Q("div");if(y.win&&y.ie)c.innerHTML=a.innerHTML;else{var d=a.getElementsByTagName(b)[0];if(d){var e=d.childNodes;if(e){var f=e.length;for(var g=0;g<f;g++)(e[g].nodeType!=1||e[g].nodeName!="PARAM")&&e[g].nodeType!=8&&c.appendChild(e[g].cloneNode(!0))}}}return c}function L(c,d,f){var g,h=P(f);if(y.wk&&y.wk<312)return g;if(h){typeof c.id==a&&(c.id=f);if(y.ie&&y.win){var i="";for(var j in c)c[j]!=Object.prototype[j]&&(j.toLowerCase()=="data"?d.movie=c[j]:j.toLowerCase()=="styleclass"?i+=' class="'+c[j]+'"':j.toLowerCase()!="classid"&&(i+=" "+j+'="'+c[j]+'"'));var k="";for(var l in d)d[l]!=Object.prototype[l]&&(k+='<param name="'+l+'" value="'+d[l]+'" />');h.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+i+">"+k+"</object>",n[n.length]=c.id,g=P(c.id)}else{var m=Q(b);m.setAttribute("type",e);for(var o in c)c[o]!=Object.prototype[o]&&(o.toLowerCase()=="styleclass"?m.setAttribute("class",c[o]):o.toLowerCase()!="classid"&&m.setAttribute(o,c[o]));for(var p in d)d[p]!=Object.prototype[p]&&p.toLowerCase()!="movie"&&M(m,p,d[p]);h.parentNode.replaceChild(m,h),g=m}}return g}function M(a,b,c){var d=Q("param");d.setAttribute("name",b),d.setAttribute("value",c),a.appendChild(d)}function N(a){var b=P(a);b&&b.nodeName=="OBJECT"&&(y.ie&&y.win?(b.style.display="none",function(){b.readyState==4?O(a):setTimeout(arguments.callee,10)}()):b.parentNode.removeChild(b))}function O(a){var b=P(a);if(b){for(var c in b)typeof b[c]=="function"&&(b[c]=null);b.parentNode.removeChild(b)}}function P(a){var b=null;try{b=i.getElementById(a)}catch(c){}return b}function Q(a){return i.createElement(a)}function R(a,b,c){a.attachEvent(b,c),o[o.length]=[a,b,c]}function S(a){var b=y.pv,c=a.split(".");return c[0]=parseInt(c[0],10),c[1]=parseInt(c[1],10)||0,c[2]=parseInt(c[2],10)||0,b[0]>c[0]||b[0]==c[0]&&b[1]>c[1]||b[0]==c[0]&&b[1]==c[1]&&b[2]>=c[2]?!0:!1}function T(c,d,e,f){if(y.ie&&y.mac)return;var g=i.getElementsByTagName("head")[0];if(!g)return;var h=e&&typeof e=="string"?e:"screen";f&&(v=null,w=null);if(!v||w!=h){var j=Q("style");j.setAttribute("type","text/css"),j.setAttribute("media",h),v=g.appendChild(j),y.ie&&y.win&&typeof i.styleSheets!=a&&i.styleSheets.length>0&&(v=i.styleSheets[i.styleSheets.length-1]),w=h}y.ie&&y.win?v&&typeof v.addRule==b&&v.addRule(c,d):v&&typeof i.createTextNode!=a&&v.appendChild(i.createTextNode(c+" {"+d+"}"))}function U(a,b){if(!x)return;var c=b?"visible":"hidden";t&&P(a)?P(a).style.visibility=c:T("#"+a,"visibility:"+c)}function V(b){var c=/[\\\"<>\.;]/,d=c.exec(b)!=null;return d&&typeof encodeURIComponent!=a?encodeURIComponent(b):b}var a="undefined",b="object",c="Shockwave Flash",d="ShockwaveFlash.ShockwaveFlash",e="application/x-shockwave-flash",f="SWFObjectExprInst",g="onreadystatechange",h=window,i=document,j=navigator,k=!1,l=[D],m=[],n=[],o=[],p,q,r,s,t=!1,u=!1,v,w,x=!0,y=function(){var f=typeof i.getElementById!=a&&typeof i.getElementsByTagName!=a&&typeof i.createElement!=a,g=j.userAgent.toLowerCase(),l=j.platform.toLowerCase(),m=l?/win/.test(l):/win/.test(g),n=l?/mac/.test(l):/mac/.test(g),o=/webkit/.test(g)?parseFloat(g.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):!1,p=!1,q=[0,0,0],r=null;if(typeof j.plugins!=a&&typeof j.plugins[c]==b)r=j.plugins[c].description,r&&(typeof j.mimeTypes==a||!j.mimeTypes[e]||!!j.mimeTypes[e].enabledPlugin)&&(k=!0,p=!1,r=r.replace(/^.*\s+(\S+\s+\S+$)/,"$1"),q[0]=parseInt(r.replace(/^(.*)\..*$/,"$1"),10),q[1]=parseInt(r.replace(/^.*\.(.*)\s.*$/,"$1"),10),q[2]=/[a-zA-Z]/.test(r)?parseInt(r.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0);else if(typeof h[["Active"].concat("Object").join("X")]!=a)try{var s=new(window[["Active"].concat("Object").join("X")])(d);s&&(r=s.GetVariable("$version"),r&&(p=!0,r=r.split(" ")[1].split(","),q=[parseInt(r[0],10),parseInt(r[1],10),parseInt(r[2],10)]))}catch(t){}return{w3:f,pv:q,wk:o,ie:p,win:m,mac:n}}(),z=function(){if(!y.w3)return;(typeof i.readyState!=a&&i.readyState=="complete"||typeof i.readyState==a&&(i.getElementsByTagName("body")[0]||i.body))&&A(),t||(typeof i.addEventListener!=a&&i.addEventListener("DOMContentLoaded",A,!1),y.ie&&y.win&&(i.attachEvent(g,function(){i.readyState=="complete"&&(i.detachEvent(g,arguments.callee),A())}),h==top&&function(){if(t)return;try{i.documentElement.doScroll("left")}catch(a){setTimeout(arguments.callee,0);return}A()}()),y.wk&&function(){if(t)return;if(!/loaded|complete/.test(i.readyState)){setTimeout(arguments.callee,0);return}A()}(),C(A))}(),W=function(){y.ie&&y.win&&window.attachEvent("onunload",function(){var a=o.length;for(var b=0;b<a;b++)o[b][0].detachEvent(o[b][1],o[b][2]);var c=n.length;for(var d=0;d<c;d++)N(n[d]);for(var e in y)y[e]=null;y=null;for(var f in swfobject)swfobject[f]=null;swfobject=null})}();return{registerObject:function(a,b,c,d){if(y.w3&&a&&b){var e={};e.id=a,e.swfVersion=b,e.expressInstall=c,e.callbackFn=d,m[m.length]=e,U(a,!1)}else d&&d({success:!1,id:a})},getObjectById:function(a){if(y.w3)return G(a)},embedSWF:function(c,d,e,f,g,h,i,j,k,l){var m={success:!1,id:d};y.w3&&!(y.wk&&y.wk<312)&&c&&d&&e&&f&&g?(U(d,!1),B(function(){e+="",f+="";var n={};if(k&&typeof k===b)for(var o in k)n[o]=k[o];n.data=c,n.width=e,n.height=f;var p={};if(j&&typeof j===b)for(var q in j)p[q]=j[q];if(i&&typeof i===b)for(var r in i)typeof p.flashvars!=a?p.flashvars+="&"+r+"="+i[r]:p.flashvars=r+"="+i[r];if(S(g)){var s=L(n,p,d);n.id==d&&U(d,!0),m.success=!0,m.ref=s}else{if(h&&H()){n.data=h,I(n,p,d,l);return}U(d,!0)}l&&l(m)})):l&&l(m)},switchOffAutoHideShow:function(){x=!1},ua:y,getFlashPlayerVersion:function(){return{major:y.pv[0],minor:y.pv[1],release:y.pv[2]}},hasFlashPlayerVersion:S,createSWF:function(a,b,c){return y.w3?L(a,b,c):undefined},showExpressInstall:function(a,b,c,d){y.w3&&H()&&I(a,b,c,d)},removeSWF:function(a){y.w3&&N(a)},createCSS:function(a,b,c,d){y.w3&&T(a,b,c,d)},addDomLoadEvent:B,addLoadEvent:C,getQueryParamValue:function(a){var b=i.location.search||i.location.hash;if(b){/\?/.test(b)&&(b=b.split("?")[1]);if(a==null)return V(b);var c=b.split("&");for(var d=0;d<c.length;d++)if(c[d].substring(0,c[d].indexOf("="))==a)return V(c[d].substring(c[d].indexOf("=")+1))}return""},expressInstallCallback:function(){if(u){var a=P(f);a&&p&&(a.parentNode.replaceChild(p,a),q&&(U(q,!0),y.ie&&y.win&&(p.style.display="block")),r&&r(s)),u=!1}}}}();(function(){if("undefined"==typeof window||window.WebSocket)return;var a=window.console;if(!a||!a.log||!a.error)a={log:function(){},error:function(){}};if(!swfobject.hasFlashPlayerVersion("10.0.0")){a.error("Flash Player >= 10.0.0 is required.");return}location.protocol=="file:"&&a.error("WARNING: web-socket-js doesn't work in file:///... URL unless you set Flash Security Settings properly. Open the page via Web server i.e. http://..."),WebSocket=function(a,b,c,d,e){var f=this;f.__id=WebSocket.__nextId++,WebSocket.__instances[f.__id]=f,f.readyState=WebSocket.CONNECTING,f.bufferedAmount=0,f.__events={},b?typeof b=="string"&&(b=[b]):b=[],setTimeout(function(){WebSocket.__addTask(function(){WebSocket.__flash.create(f.__id,a,b,c||null,d||0,e||null)})},0)},WebSocket.prototype.send=function(a){if(this.readyState==WebSocket.CONNECTING)throw"INVALID_STATE_ERR: Web Socket connection has not been established";var b=WebSocket.__flash.send(this.__id,encodeURIComponent(a));return b<0?!0:(this.bufferedAmount+=b,!1)},WebSocket.prototype.close=function(){if(this.readyState==WebSocket.CLOSED||this.readyState==WebSocket.CLOSING)return;this.readyState=WebSocket.CLOSING,WebSocket.__flash.close(this.__id)},WebSocket.prototype.addEventListener=function(a,b,c){a in this.__events||(this.__events[a]=[]),this.__events[a].push(b)},WebSocket.prototype.removeEventListener=function(a,b,c){if(!(a in this.__events))return;var d=this.__events[a];for(var e=d.length-1;e>=0;--e)if(d[e]===b){d.splice(e,1);break}},WebSocket.prototype.dispatchEvent=function(a){var b=this.__events[a.type]||[];for(var c=0;c<b.length;++c)b[c](a);var d=this["on"+a.type];d&&d(a)},WebSocket.prototype.__handleEvent=function(a){"readyState"in a&&(this.readyState=a.readyState),"protocol"in a&&(this.protocol=a.protocol);var b;if(a.type=="open"||a.type=="error")b=this.__createSimpleEvent(a.type);else if(a.type=="close")b=this.__createSimpleEvent("close");else{if(a.type!="message")throw"unknown event type: "+a.type;var c=decodeURIComponent(a.message);b=this.__createMessageEvent("message",c)}this.dispatchEvent(b)},WebSocket.prototype.__createSimpleEvent=function(a){if(document.createEvent&&window.Event){var b=document.createEvent("Event");return b.initEvent(a,!1,!1),b}return{type:a,bubbles:!1,cancelable:!1}},WebSocket.prototype.__createMessageEvent=function(a,b){if(document.createEvent&&window.MessageEvent&&!window.opera){var c=document.createEvent("MessageEvent");return c.initMessageEvent("message",!1,!1,b,null,null,window,null),c}return{type:a,data:b,bubbles:!1,cancelable:!1}},WebSocket.CONNECTING=0,WebSocket.OPEN=1,WebSocket.CLOSING=2,WebSocket.CLOSED=3,WebSocket.__flash=null,WebSocket.__instances={},WebSocket.__tasks=[],WebSocket.__nextId=0,WebSocket.loadFlashPolicyFile=function(a){WebSocket.__addTask(function(){WebSocket.__flash.loadManualPolicyFile(a)})},WebSocket.__initialize=function(){if(WebSocket.__flash)return;WebSocket.__swfLocation&&(window.WEB_SOCKET_SWF_LOCATION=WebSocket.__swfLocation);if(!window.WEB_SOCKET_SWF_LOCATION){a.error("[WebSocket] set WEB_SOCKET_SWF_LOCATION to location of WebSocketMain.swf");return}var b=document.createElement("div");b.id="webSocketContainer",b.style.position="absolute",WebSocket.__isFlashLite()?(b.style.left="0px",b.style.top="0px"):(b.style.left="-100px",b.style.top="-100px");var c=document.createElement("div");c.id="webSocketFlash",b.appendChild(c),document.body.appendChild(b),swfobject.embedSWF(WEB_SOCKET_SWF_LOCATION,"webSocketFlash","1","1","10.0.0",null,null,{hasPriority:!0,swliveconnect:!0,allowScriptAccess:"always"},null,function(b){b.success||a.error("[WebSocket] swfobject.embedSWF failed")})},WebSocket.__onFlashInitialized=function(){setTimeout(function(){WebSocket.__flash=document.getElementById("webSocketFlash"),WebSocket.__flash.setCallerUrl(location.href),WebSocket.__flash.setDebug(!!window.WEB_SOCKET_DEBUG);for(var a=0;a<WebSocket.__tasks.length;++a)WebSocket.__tasks[a]();WebSocket.__tasks=[]},0)},WebSocket.__onFlashEvent=function(){return setTimeout(function(){try{var b=WebSocket.__flash.receiveEvents();for(var c=0;c<b.length;++c)WebSocket.__instances[b[c].webSocketId].__handleEvent(b[c])}catch(d){a.error(d)}},0),!0},WebSocket.__log=function(b){a.log(decodeURIComponent(b))},WebSocket.__error=function(b){a.error(decodeURIComponent(b))},WebSocket.__addTask=function(a){WebSocket.__flash?a():WebSocket.__tasks.push(a)},WebSocket.__isFlashLite=function(){if(!window.navigator||!window.navigator.mimeTypes)return!1;var a=window.navigator.mimeTypes["application/x-shockwave-flash"];return!a||!a.enabledPlugin||!a.enabledPlugin.filename?!1:a.enabledPlugin.filename.match(/flashlite/i)?!0:!1},window.WEB_SOCKET_DISABLE_AUTO_INITIALIZATION||(window.addEventListener?window.addEventListener("load",function(){WebSocket.__initialize()},!1):window.attachEvent("onload",function(){WebSocket.__initialize()}))})(),function(a,b,c){function d(a){if(!a)return;b.Transport.apply(this,arguments),this.sendBuffer=[]}function e(){}a.XHR=d,b.util.inherit(d,b.Transport),d.prototype.open=function(){return this.socket.setBuffer(!1),this.onOpen(),this.get(),this.setCloseTimeout(),this},d.prototype.payload=function(a){var c=[];for(var d=0,e=a.length;d<e;d++)c.push(b.parser.encodePacket(a[d]));this.send(b.parser.encodePayload(c))},d.prototype.send=function(a){return this.post(a),this},d.prototype.post=function(a){function d(){this.readyState==4&&(this.onreadystatechange=e,b.posting=!1,this.status==200?b.socket.setBuffer(!1):b.onClose())}function f(){this.onload=e,b.socket.setBuffer(!1)}var b=this;this.socket.setBuffer(!0),this.sendXHR=this.request("POST"),c.XDomainRequest&&this.sendXHR instanceof XDomainRequest?this.sendXHR.onload=this.sendXHR.onerror=f:this.sendXHR.onreadystatechange=d,this.sendXHR.send(a)},d.prototype.close=function(){return this.onClose(),this},d.prototype.request=function(a){var c=b.util.request(this.socket.isXDomain()),d=b.util.query(this.socket.options.query,"t="+ +(new Date));c.open(a||"GET",this.prepareUrl()+d,!0);if(a=="POST")try{c.setRequestHeader?c.setRequestHeader("Content-type","text/plain;charset=UTF-8"):c.contentType="text/plain"}catch(e){}return c},d.prototype.scheme=function(){return this.socket.options.secure?"https":"http"},d.check=function(a,d){try{var e=b.util.request(d),f=c.XDomainRequest&&e instanceof XDomainRequest,g=a&&a.options&&a.options.secure?"https:":"http:",h=c.location&&g!=c.location.protocol;if(e&&(!f||!h))return!0}catch(i){}return!1},d.xdomainCheck=function(a){return d.check(a,!0)}}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b){function c(a){b.Transport.XHR.apply(this,arguments)}a.htmlfile=c,b.util.inherit(c,b.Transport.XHR),c.prototype.name="htmlfile",c.prototype.get=function(){this.doc=new(window[["Active"].concat("Object").join("X")])("htmlfile"),this.doc.open(),this.doc.write("<html></html>"),this.doc.close(),this.doc.parentWindow.s=this;var a=this.doc.createElement("div");a.className="socketio",this.doc.body.appendChild(a),this.iframe=this.doc.createElement("iframe"),a.appendChild(this.iframe);var c=this,d=b.util.query(this.socket.options.query,"t="+ +(new Date));this.iframe.src=this.prepareUrl()+d,b.util.on(window,"unload",function(){c.destroy()})},c.prototype._=function(a,b){a=a.replace(/\\\//g,"/"),this.onData(a);try{var c=b.getElementsByTagName("script")[0];c.parentNode.removeChild(c)}catch(d){}},c.prototype.destroy=function(){if(this.iframe){try{this.iframe.src="about:blank"}catch(a){}this.doc=null,this.iframe.parentNode.removeChild(this.iframe),this.iframe=null,CollectGarbage()}},c.prototype.close=function(){return this.destroy(),b.Transport.XHR.prototype.close.call(this)},c.check=function(a){if(typeof window!="undefined"&&["Active"].concat("Object").join("X")in window)try{var c=new(window[["Active"].concat("Object").join("X")])("htmlfile");return c&&b.Transport.XHR.check(a)}catch(d){}return!1},c.xdomainCheck=function(){return!1},b.transports.push("htmlfile")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports),function(a,b,c){function d(){b.Transport.XHR.apply(this,arguments)}function e(){}a["xhr-polling"]=d,b.util.inherit(d,b.Transport.XHR),b.util.merge(d,b.Transport.XHR),d.prototype.name="xhr-polling",d.prototype.heartbeats=function(){return!1},d.prototype.open=function(){var a=this;return b.Transport.XHR.prototype.open.call(a),!1},d.prototype.get=function(){function b(){this.readyState==4&&(this.onreadystatechange=e,this.status==200?(a.onData(this.responseText),a.get()):a.onClose())}function d(){this.onload=e,this.onerror=e,a.retryCounter=1,a.onData(this.responseText),a.get()}function f(){a.retryCounter++,!a.retryCounter||a.retryCounter>3?a.onClose():a.get()}if(!this.isOpen)return;var a=this;this.xhr=this.request(),c.XDomainRequest&&this.xhr instanceof XDomainRequest?(this.xhr.onload=d,this.xhr.onerror=f):this.xhr.onreadystatechange=b,this.xhr.send(null)},d.prototype.onClose=function(){b.Transport.XHR.prototype.onClose.call(this);if(this.xhr){this.xhr.onreadystatechange=this.xhr.onload=this.xhr.onerror=e;try{this.xhr.abort()}catch(a){}this.xhr=null}},d.prototype.ready=function(a,c){var d=this;b.util.defer(function(){c.call(d)})},b.transports.push("xhr-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),function(a,b,c){function e(a){b.Transport["xhr-polling"].apply(this,arguments),this.index=b.j.length;var c=this;b.j.push(function(a){c._(a)})}var d=c.document&&"MozAppearance"in c.document.documentElement.style;a["jsonp-polling"]=e,b.util.inherit(e,b.Transport["xhr-polling"]),e.prototype.name="jsonp-polling",e.prototype.post=function(a){function i(){j(),c.socket.setBuffer(!1)}function j(){c.iframe&&c.form.removeChild(c.iframe);try{h=document.createElement('<iframe name="'+c.iframeId+'">')}catch(a){h=document.createElement("iframe"),h.name=c.iframeId}h.id=c.iframeId,c.form.appendChild(h),c.iframe=h}var c=this,d=b.util.query(this.socket.options.query,"t="+ +(new Date)+"&i="+this.index);if(!this.form){var e=document.createElement("form"),f=document.createElement("textarea"),g=this.iframeId="socketio_iframe_"+this.index,h;e.className="socketio",e.style.position="absolute",e.style.top="0px",e.style.left="0px",e.style.display="none",e.target=g,e.method="POST",e.setAttribute("accept-charset","utf-8"),f.name="d",e.appendChild(f),document.body.appendChild(e),this.form=e,this.area=f}this.form.action=this.prepareUrl()+d,j(),this.area.value=b.JSON.stringify(a);try{this.form.submit()}catch(k){}this.iframe.attachEvent?h.onreadystatechange=function(){c.iframe.readyState=="complete"&&i()}:this.iframe.onload=i,this.socket.setBuffer(!0)},e.prototype.get=function(){var a=this,c=document.createElement("script"),e=b.util.query(this.socket.options.query,"t="+ +(new Date)+"&i="+this.index);this.script&&(this.script.parentNode.removeChild(this.script),this.script=null),c.async=!0,c.src=this.prepareUrl()+e,c.onerror=function(){a.onClose()};var f=document.getElementsByTagName("script")[0];f.parentNode.insertBefore(c,f),this.script=c,d&&setTimeout(function(){var a=document.createElement("iframe");document.body.appendChild(a),document.body.removeChild(a)},100)},e.prototype._=function(a){return this.onData(a),this.isOpen&&this.get(),this},e.prototype.ready=function(a,c){var e=this;if(!d)return c.call(this);b.util.load(function(){c.call(e)})},e.check=function(){return"document"in c},e.xdomainCheck=function(){return!0},b.transports.push("jsonp-polling")}("undefined"!=typeof io?io.Transport:module.exports,"undefined"!=typeof io?io:module.parent.exports,this),typeof define=="function"&&define.amd&&define([],function(){return io})})()
},{}],9:[function(require,module,exports){
exports.run = function(options) {
	var doNothing=function(){};
	var pass = options.pass||doNothing;
	var fail = options.fail||doNothing;
	var end = options.end||doNothing;
	var mocha = options.instance;

	function Reporter(runner) {

		runner.on('pass', function(test) {
			pass({
				title: test.title,
				fullTitle: test.fullTitle(),
				duration: test.duration,
			})
		});

		runner.on('fail', function(test, err) {
			fail({
				title: test.title,
				fullTitle: test.fullTitle(),
				duration: test.duration,
				error: err.message
			});
		});

		runner.on('end', function() {
			end();
		});
	}

	mocha.reporter(Reporter);
	mocha.run();
}
},{}],10:[function(require,module,exports){
exports.run = function(options) {
	var doNothing = function() {};
	var pass = options.pass || doNothing;
	var fail = options.fail || doNothing;
	var end = options.end || doNothing;
	var window = options.instance;

	window.onerror = function(error, url, line) {
		fail({
			title: error,
			fullTitle: error,
			duration: 0,
			error: 'ERR:' + error + ' LINE:' + line
		})
	};

	setTimeout(function() {
		end();
	}, 5000);
}
},{}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvYm93c2VyL2Jvd3Nlci5qcyIsIi9Vc2Vycy9sdGViZWFuL0Rlc2t0b3Avbm9kZWpzIHdvcmtzcGFjZS9icm93c2VybWFuL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9mYWtlXzZlNjU3NTNmLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9saWIvY2FudmFzMmltYWdlLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9saWIvaHRtbDJjYW52YXMuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9wdWJsaWMvanMvZGV2L2xpYi9zb2NrZXQuaW8uanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9wdWJsaWMvanMvZGV2L3JlcG9ydGVyL21vY2hhLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9yZXBvcnRlci9wbGFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdnpGQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAgKiBCb3dzZXIgLSBhIGJyb3dzZXIgZGV0ZWN0b3JcbiAgKiBodHRwczovL2dpdGh1Yi5jb20vZGVkL2Jvd3NlclxuICAqIE1JVCBMaWNlbnNlIHwgKGMpIER1c3RpbiBEaWF6IDIwMTRcbiAgKi9cblxuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0c1snYnJvd3NlciddID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxufSgnYm93c2VyJywgZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICAqIFNlZSB1c2VyYWdlbnRzLmpzIGZvciBleGFtcGxlcyBvZiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgKi9cblxuICB2YXIgdCA9IHRydWVcblxuICBmdW5jdGlvbiBkZXRlY3QodWEpIHtcblxuICAgIGZ1bmN0aW9uIGdldEZpcnN0TWF0Y2gocmVnZXgpIHtcbiAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKHJlZ2V4KTtcbiAgICAgIHJldHVybiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaFsxXSkgfHwgJyc7XG4gICAgfVxuXG4gICAgdmFyIGlvc2RldmljZSA9IGdldEZpcnN0TWF0Y2goLyhpcG9kfGlwaG9uZXxpcGFkKS9pKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGxpa2VBbmRyb2lkID0gL2xpa2UgYW5kcm9pZC9pLnRlc3QodWEpXG4gICAgICAsIGFuZHJvaWQgPSAhbGlrZUFuZHJvaWQgJiYgL2FuZHJvaWQvaS50ZXN0KHVhKVxuICAgICAgLCB2ZXJzaW9uSWRlbnRpZmllciA9IGdldEZpcnN0TWF0Y2goL3ZlcnNpb25cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICAsIHRhYmxldCA9IC90YWJsZXQvaS50ZXN0KHVhKVxuICAgICAgLCBtb2JpbGUgPSAhdGFibGV0ICYmIC9bXi1dbW9iaS9pLnRlc3QodWEpXG4gICAgICAsIHJlc3VsdFxuXG4gICAgaWYgKC9vcGVyYXxvcHIvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnT3BlcmEnXG4gICAgICAsIG9wZXJhOiB0XG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyIHx8IGdldEZpcnN0TWF0Y2goLyg/Om9wZXJhfG9wcilbXFxzXFwvXShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3dpbmRvd3MgcGhvbmUvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnV2luZG93cyBQaG9uZSdcbiAgICAgICwgd2luZG93c3Bob25lOiB0XG4gICAgICAsIG1zaWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvaWVtb2JpbGVcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9tc2llfHRyaWRlbnQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgICAsIG1zaWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86bXNpZSB8cnY6KShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2Nocm9tZXxjcmlvc3xjcm1vL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZSdcbiAgICAgICwgY2hyb21lOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OmNocm9tZXxjcmlvc3xjcm1vKVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWUgOiBpb3NkZXZpY2UgPT0gJ2lwaG9uZScgPyAnaVBob25lJyA6IGlvc2RldmljZSA9PSAnaXBhZCcgPyAnaVBhZCcgOiAnaVBvZCdcbiAgICAgIH1cbiAgICAgIC8vIFdURjogdmVyc2lvbiBpcyBub3QgcGFydCBvZiB1c2VyIGFnZW50IGluIHdlYiBhcHBzXG4gICAgICBpZiAodmVyc2lvbklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2FpbGZpc2gvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FpbGZpc2gnXG4gICAgICAsIHNhaWxmaXNoOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3NhaWxmaXNoXFxzP2Jyb3dzZXJcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zZWFtb25rZXlcXC8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2VhTW9ua2V5J1xuICAgICAgLCBzZWFtb25rZXk6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvc2VhbW9ua2V5XFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvZmlyZWZveHxpY2V3ZWFzZWwvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnRmlyZWZveCdcbiAgICAgICwgZmlyZWZveDogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpmaXJlZm94fGljZXdlYXNlbClbIFxcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgICBpZiAoL1xcKChtb2JpbGV8dGFibGV0KTtbXlxcKV0qcnY6W1xcZFxcLl0rXFwpL2kudGVzdCh1YSkpIHtcbiAgICAgICAgcmVzdWx0LmZpcmVmb3hvcyA9IHRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NpbGsvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0gIHtcbiAgICAgICAgbmFtZTogJ0FtYXpvbiBTaWxrJ1xuICAgICAgLCBzaWxrOiB0XG4gICAgICAsIHZlcnNpb24gOiBnZXRGaXJzdE1hdGNoKC9zaWxrXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJ1xuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvcGhhbnRvbS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdQaGFudG9tSlMnXG4gICAgICAsIHBoYW50b206IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvcGhhbnRvbWpzXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvYmxhY2tiZXJyeXxcXGJiYlxcZCsvaS50ZXN0KHVhKSB8fCAvcmltXFxzdGFibGV0L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0JsYWNrQmVycnknXG4gICAgICAsIGJsYWNrYmVycnk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvYmxhY2tiZXJyeVtcXGRdK1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoLyh3ZWJ8aHB3KW9zL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dlYk9TJ1xuICAgICAgLCB3ZWJvczogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC93KD86ZWIpP29zYnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH07XG4gICAgICAvdG91Y2hwYWRcXC8vaS50ZXN0KHVhKSAmJiAocmVzdWx0LnRvdWNocGFkID0gdClcbiAgICB9XG4gICAgZWxzZSBpZiAoL2JhZGEvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmFkYSdcbiAgICAgICwgYmFkYTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9kb2xmaW5cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICgvdGl6ZW4vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnVGl6ZW4nXG4gICAgICAsIHRpemVuOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OnRpemVuXFxzPyk/YnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSkgfHwgdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zYWZhcmkvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FmYXJpJ1xuICAgICAgLCBzYWZhcmk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSByZXN1bHQgPSB7fVxuXG4gICAgLy8gc2V0IHdlYmtpdCBvciBnZWNrbyBmbGFnIGZvciBicm93c2VycyBiYXNlZCBvbiB0aGVzZSBlbmdpbmVzXG4gICAgaWYgKC8oYXBwbGUpP3dlYmtpdC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQubmFtZSA9IHJlc3VsdC5uYW1lIHx8IFwiV2Via2l0XCJcbiAgICAgIHJlc3VsdC53ZWJraXQgPSB0XG4gICAgICBpZiAoIXJlc3VsdC52ZXJzaW9uICYmIHZlcnNpb25JZGVudGlmaWVyKSB7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFyZXN1bHQub3BlcmEgJiYgL2dlY2tvXFwvL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUgfHwgXCJHZWNrb1wiXG4gICAgICByZXN1bHQuZ2Vja28gPSB0XG4gICAgICByZXN1bHQudmVyc2lvbiA9IHJlc3VsdC52ZXJzaW9uIHx8IGdldEZpcnN0TWF0Y2goL2dlY2tvXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgIH1cblxuICAgIC8vIHNldCBPUyBmbGFncyBmb3IgcGxhdGZvcm1zIHRoYXQgaGF2ZSBtdWx0aXBsZSBicm93c2Vyc1xuICAgIGlmIChhbmRyb2lkIHx8IHJlc3VsdC5zaWxrKSB7XG4gICAgICByZXN1bHQuYW5kcm9pZCA9IHRcbiAgICB9IGVsc2UgaWYgKGlvc2RldmljZSkge1xuICAgICAgcmVzdWx0W2lvc2RldmljZV0gPSB0XG4gICAgICByZXN1bHQuaW9zID0gdFxuICAgIH1cblxuICAgIC8vIE9TIHZlcnNpb24gZXh0cmFjdGlvblxuICAgIHZhciBvc1ZlcnNpb24gPSAnJztcbiAgICBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9vcyAoXFxkKyhbX1xcc11cXGQrKSopIGxpa2UgbWFjIG9zIHgvaSk7XG4gICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24ucmVwbGFjZSgvW19cXHNdL2csICcuJyk7XG4gICAgfSBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9hbmRyb2lkWyBcXC8tXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQud2luZG93c3Bob25lKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC93aW5kb3dzIHBob25lICg/Om9zKT9cXHM/KFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC53ZWJvcykge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvKD86d2VifGhwdylvc1xcLyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQuYmxhY2tiZXJyeSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvcmltXFxzdGFibGV0XFxzb3NcXHMoXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LmJhZGEpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL2JhZGFcXC8oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LnRpemVuKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC90aXplbltcXC9cXHNdKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9XG4gICAgaWYgKG9zVmVyc2lvbikge1xuICAgICAgcmVzdWx0Lm9zdmVyc2lvbiA9IG9zVmVyc2lvbjtcbiAgICB9XG5cbiAgICAvLyBkZXZpY2UgdHlwZSBleHRyYWN0aW9uXG4gICAgdmFyIG9zTWFqb3JWZXJzaW9uID0gb3NWZXJzaW9uLnNwbGl0KCcuJylbMF07XG4gICAgaWYgKHRhYmxldCB8fCBpb3NkZXZpY2UgPT0gJ2lwYWQnIHx8IChhbmRyb2lkICYmIChvc01ham9yVmVyc2lvbiA9PSAzIHx8IChvc01ham9yVmVyc2lvbiA9PSA0ICYmICFtb2JpbGUpKSkgfHwgcmVzdWx0LnNpbGspIHtcbiAgICAgIHJlc3VsdC50YWJsZXQgPSB0XG4gICAgfSBlbHNlIGlmIChtb2JpbGUgfHwgaW9zZGV2aWNlID09ICdpcGhvbmUnIHx8IGlvc2RldmljZSA9PSAnaXBvZCcgfHwgYW5kcm9pZCB8fCByZXN1bHQuYmxhY2tiZXJyeSB8fCByZXN1bHQud2Vib3MgfHwgcmVzdWx0LmJhZGEpIHtcbiAgICAgIHJlc3VsdC5tb2JpbGUgPSB0XG4gICAgfVxuXG4gICAgLy8gR3JhZGVkIEJyb3dzZXIgU3VwcG9ydFxuICAgIC8vIGh0dHA6Ly9kZXZlbG9wZXIueWFob28uY29tL3l1aS9hcnRpY2xlcy9nYnNcbiAgICBpZiAoKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uID49IDEwKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA+PSAyMCkgfHxcbiAgICAgICAgKHJlc3VsdC5maXJlZm94ICYmIHJlc3VsdC52ZXJzaW9uID49IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uID49IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5pb3MgJiYgcmVzdWx0Lm9zdmVyc2lvbiAmJiByZXN1bHQub3N2ZXJzaW9uLnNwbGl0KFwiLlwiKVswXSA+PSA2KVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5hID0gdDtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uIDwgMTApIHx8XG4gICAgICAgIChyZXN1bHQuY2hyb21lICYmIHJlc3VsdC52ZXJzaW9uIDwgMjApIHx8XG4gICAgICAgIChyZXN1bHQuZmlyZWZveCAmJiByZXN1bHQudmVyc2lvbiA8IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uIDwgNikgfHxcbiAgICAgICAgKHJlc3VsdC5vcGVyYSAmJiByZXN1bHQudmVyc2lvbiA8IDEwLjApIHx8XG4gICAgICAgIChyZXN1bHQuaW9zICYmIHJlc3VsdC5vc3ZlcnNpb24gJiYgcmVzdWx0Lm9zdmVyc2lvbi5zcGxpdChcIi5cIilbMF0gPCA2KVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5jID0gdFxuICAgIH0gZWxzZSByZXN1bHQueCA9IHRcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHZhciBib3dzZXIgPSBkZXRlY3QodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogJycpXG5cblxuICAvKlxuICAgKiBTZXQgb3VyIGRldGVjdCBtZXRob2QgdG8gdGhlIG1haW4gYm93c2VyIG9iamVjdCBzbyB3ZSBjYW5cbiAgICogcmV1c2UgaXQgdG8gdGVzdCBvdGhlciB1c2VyIGFnZW50cy5cbiAgICogVGhpcyBpcyBuZWVkZWQgdG8gaW1wbGVtZW50IGZ1dHVyZSB0ZXN0cy5cbiAgICovXG4gIGJvd3Nlci5fZGV0ZWN0ID0gZGV0ZWN0O1xuXG4gIHJldHVybiBib3dzZXJcbn0pO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tdLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsInZhciBpbyA9IHJlcXVpcmUoJy4vbGliL3NvY2tldC5pbycpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCdib3dzZXInKS5icm93c2VyO1xudmFyIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcbnZhciBodG1sMmNhbnZhcyA9IHJlcXVpcmUoJy4vbGliL2h0bWwyY2FudmFzJyk7XG52YXIgY2FudmFzMmltYWdlID0gcmVxdWlyZSgnLi9saWIvY2FudmFzMmltYWdlJyk7XG5cbmZ1bmN0aW9uIEJyb3dzZXJtYW4ob3B0aW9ucykge1xuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcblx0dmFyIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ21vY2hhJyxcblx0dGhpcy5pbnN0YW5jZSA9IG9wdGlvbnMuaW5zdGFuY2UgfHwgbW9jaGE7XG5cdHRoaXMuc2VydmVyID0gb3B0aW9ucy5zZXJ2ZXIgfHwgJ2xvY2FsaG9zdDo5MDAwJztcblx0dGhpcy5yZXBvcnRlciA9IHtcblx0XHQnbW9jaGEnOiByZXF1aXJlKCcuL3JlcG9ydGVyL21vY2hhJyksXG5cdFx0J3BsYWluJzogcmVxdWlyZSgnLi9yZXBvcnRlci9wbGFpbicpXG5cdH1cbn1cblxuQnJvd3Nlcm1hbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cdGNvbnNvbGUubG9nKCdpbml0IGJyb3dzZXJtYW4nKTtcblxuXHR2YXIgcXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZShsb2NhdGlvbi5zZWFyY2gucmVwbGFjZSgnPycsICcnKSk7XG5cdHZhciBqb2JJZCA9IHF1ZXJ5LmJyb3dzZXJtYW5fam9iaWQ7XG5cdHZhciBuZWVkc1NjZWVuc2hvdCA9IHF1ZXJ5LmJyb3dzZXJtYW5fc2NyZWVuc2hvdD09J2ZhbHNlJz9mYWxzZTp0cnVlO1xuXHR2YXIgY29ubmVjdGVkID0gZmFsc2U7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRpZiAoIWpvYklkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIHNvY2tldCA9IGlvLmNvbm5lY3QoJ2h0dHA6Ly8nICsgdGhpcy5zZXJ2ZXIgKyAnL3Rlc3RlcicpO1xuXHRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpIHtcblx0XHRjb25uZWN0ZWQgPSB0cnVlO1xuXHRcdGNvbnNvbGUubG9nKCdjb25uZWN0ZWQgdG8gc2VydmVyJyk7XG5cdH0pO1xuXHR2YXIgcmVzdWx0ID0ge1xuXHRcdGpvYklkOiBqb2JJZCxcblx0XHRicm93c2VyOiB7XG5cdFx0XHRuYW1lOiBicm93c2VyLm5hbWUudG9Mb3dlckNhc2UoKSxcblx0XHRcdHZlcnNpb246IGJyb3dzZXIudmVyc2lvbixcblx0XHRcdG9zOmdldE9TKClcblx0XHR9LFxuXHRcdGRhdGE6IHtcblx0XHRcdHBhc3NlczogW10sXG5cdFx0XHRmYWlsdXJlczogW11cblx0XHR9XG5cdH07XG5cdHNlbGYucmVwb3J0ZXJbc2VsZi50eXBlXS5ydW4oe1xuXHRcdGluc3RhbmNlOiBzZWxmLmluc3RhbmNlLFxuXHRcdHBhc3M6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdHJlc3VsdC5kYXRhLnBhc3Nlcy5wdXNoKGRhdGEpO1xuXHRcdH0sXG5cdFx0ZmFpbDogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0cmVzdWx0LmRhdGEuZmFpbHVyZXMucHVzaChkYXRhKTtcblx0XHR9LFxuXHRcdGVuZDogZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcblx0XHRcdFx0aWYgKCFjb25uZWN0ZWQpIHtcblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG5lZWRzU2NlZW5zaG90KSB7XG5cdFx0XHRcdFx0aHRtbDJjYW52YXMoZG9jdW1lbnQuYm9keSwge1xuXHRcdFx0XHRcdFx0b25yZW5kZXJlZDogZnVuY3Rpb24oY2FudmFzKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBpbWcgPSBjYW52YXMyaW1hZ2Uuc2F2ZUFzSlBFRyhjYW52YXMsIHRydWUpO1xuXHRcdFx0XHRcdFx0XHRyZXN1bHQuc2NyZWVuc2hvdCA9IGltZy5vdXRlckhUTUw7XG5cdFx0XHRcdFx0XHRcdHNvY2tldC5lbWl0KCdkb25lJywgcmVzdWx0KTtcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dCh3aW5kb3cuY2xvc2UsIDUwMCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0c29ja2V0LmVtaXQoJ2RvbmUnLCByZXN1bHQpO1xuXHRcdFx0XHRcdHNldFRpbWVvdXQod2luZG93LmNsb3NlLCA1MDApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXHRcdFx0fSwgMjAwKTtcblx0XHR9XG5cdH0pO1xufTtcblxuZnVuY3Rpb24gZ2V0T1MoKSB7XG5cdHZhciBvcyA9IFwiVW5rbm93biBPU1wiO1xuXHRpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIldpblwiKSAhPSAtMSkgb3MgPSBcIndpbmRvd1wiO1xuXHRpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIk1hY1wiKSAhPSAtMSkgb3MgPSBcIm1hY1wiO1xuXHRpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIlgxMVwiKSAhPSAtMSkgb3MgPSBcInVuaXhcIjtcblx0aWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJMaW51eFwiKSAhPSAtMSkgb3MgPSBcImxpbnV4XCI7XG5cdHJldHVybiBvcztcbn0gXG5cbnZhciBzZXJ2ZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jyb3dzZXJtYW4nKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VydmVyJyk7XG5pZiAod2luZG93Lm1vY2hhKSB7XG5cdG5ldyBCcm93c2VybWFuKHtcblx0XHR0eXBlOiAnbW9jaGEnLFxuXHRcdGluc3RhbmNlOiB3aW5kb3cubW9jaGEsXG5cdFx0c2VydmVyOlx0c2VydmVyXG5cblx0fSkuaW5pdCgpO1xufSBlbHNlIHtcblx0bmV3IEJyb3dzZXJtYW4oe1xuXHRcdHR5cGU6ICdwbGFpbicsXG5cdFx0aW5zdGFuY2U6IHdpbmRvdyxcblx0XHRzZXJ2ZXI6c2VydmVyXG5cdH0pLmluaXQoKTtcbn0iLCIvKlxuICogQ2FudmFzMkltYWdlIHYwLjFcbiAqIENvcHlyaWdodCAoYykgMjAwOCBKYWNvYiBTZWlkZWxpbiwganNlaWRlbGluQG5paGlsb2dpYy5ka1xuICogTUlUIExpY2Vuc2UgW2h0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuXG5cdC8vIGNoZWNrIGlmIHdlIGhhdmUgY2FudmFzIHN1cHBvcnRcblx0dmFyIGJIYXNDYW52YXMgPSBmYWxzZTtcblx0dmFyIG9DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXHRpZiAob0NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikpIHtcblx0XHRiSGFzQ2FudmFzID0gdHJ1ZTtcblx0fVxuXG5cdC8vIG5vIGNhbnZhcywgYmFpbCBvdXQuXG5cdGlmICghYkhhc0NhbnZhcykge1xuXHRcdHJldHVybiB7XG5cdFx0XHRzYXZlQXNCTVAgOiBmdW5jdGlvbigpe30sXG5cdFx0XHRzYXZlQXNQTkcgOiBmdW5jdGlvbigpe30sXG5cdFx0XHRzYXZlQXNKUEVHIDogZnVuY3Rpb24oKXt9XG5cdFx0fVxuXHR9XG5cblx0dmFyIGJIYXNJbWFnZURhdGEgPSAhIShvQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKS5nZXRJbWFnZURhdGEpO1xuXHR2YXIgYkhhc0RhdGFVUkwgPSAhIShvQ2FudmFzLnRvRGF0YVVSTCk7XG5cdHZhciBiSGFzQmFzZTY0ID0gISEod2luZG93LmJ0b2EpO1xuXG5cdHZhciBzdHJEb3dubG9hZE1pbWUgPSBcImltYWdlL29jdGV0LXN0cmVhbVwiO1xuXG5cdC8vIG9rLCB3ZSdyZSBnb29kXG5cdHZhciByZWFkQ2FudmFzRGF0YSA9IGZ1bmN0aW9uKG9DYW52YXMpIHtcblx0XHR2YXIgaVdpZHRoID0gcGFyc2VJbnQob0NhbnZhcy53aWR0aCk7XG5cdFx0dmFyIGlIZWlnaHQgPSBwYXJzZUludChvQ2FudmFzLmhlaWdodCk7XG5cdFx0cmV0dXJuIG9DYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLmdldEltYWdlRGF0YSgwLDAsaVdpZHRoLGlIZWlnaHQpO1xuXHR9XG5cblx0Ly8gYmFzZTY0IGVuY29kZXMgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIGNoYXJjb2Rlc1xuXHR2YXIgZW5jb2RlRGF0YSA9IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHR2YXIgc3RyRGF0YSA9IFwiXCI7XG5cdFx0aWYgKHR5cGVvZiBkYXRhID09IFwic3RyaW5nXCIpIHtcblx0XHRcdHN0ckRhdGEgPSBkYXRhO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgYURhdGEgPSBkYXRhO1xuXHRcdFx0Zm9yICh2YXIgaT0wO2k8YURhdGEubGVuZ3RoO2krKykge1xuXHRcdFx0XHRzdHJEYXRhICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYURhdGFbaV0pO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gYnRvYShzdHJEYXRhKTtcblx0fVxuXG5cdC8vIGNyZWF0ZXMgYSBiYXNlNjQgZW5jb2RlZCBzdHJpbmcgY29udGFpbmluZyBCTVAgZGF0YVxuXHQvLyB0YWtlcyBhbiBpbWFnZWRhdGEgb2JqZWN0IGFzIGFyZ3VtZW50XG5cdHZhciBjcmVhdGVCTVAgPSBmdW5jdGlvbihvRGF0YSkge1xuXHRcdHZhciBhSGVhZGVyID0gW107XG5cdFxuXHRcdHZhciBpV2lkdGggPSBvRGF0YS53aWR0aDtcblx0XHR2YXIgaUhlaWdodCA9IG9EYXRhLmhlaWdodDtcblxuXHRcdGFIZWFkZXIucHVzaCgweDQyKTsgLy8gbWFnaWMgMVxuXHRcdGFIZWFkZXIucHVzaCgweDREKTsgXG5cdFxuXHRcdHZhciBpRmlsZVNpemUgPSBpV2lkdGgqaUhlaWdodCozICsgNTQ7IC8vIHRvdGFsIGhlYWRlciBzaXplID0gNTQgYnl0ZXNcblx0XHRhSGVhZGVyLnB1c2goaUZpbGVTaXplICUgMjU2KTsgaUZpbGVTaXplID0gTWF0aC5mbG9vcihpRmlsZVNpemUgLyAyNTYpO1xuXHRcdGFIZWFkZXIucHVzaChpRmlsZVNpemUgJSAyNTYpOyBpRmlsZVNpemUgPSBNYXRoLmZsb29yKGlGaWxlU2l6ZSAvIDI1Nik7XG5cdFx0YUhlYWRlci5wdXNoKGlGaWxlU2l6ZSAlIDI1Nik7IGlGaWxlU2l6ZSA9IE1hdGguZmxvb3IoaUZpbGVTaXplIC8gMjU2KTtcblx0XHRhSGVhZGVyLnB1c2goaUZpbGVTaXplICUgMjU2KTtcblxuXHRcdGFIZWFkZXIucHVzaCgwKTsgLy8gcmVzZXJ2ZWRcblx0XHRhSGVhZGVyLnB1c2goMCk7XG5cdFx0YUhlYWRlci5wdXNoKDApOyAvLyByZXNlcnZlZFxuXHRcdGFIZWFkZXIucHVzaCgwKTtcblxuXHRcdGFIZWFkZXIucHVzaCg1NCk7IC8vIGRhdGFvZmZzZXRcblx0XHRhSGVhZGVyLnB1c2goMCk7XG5cdFx0YUhlYWRlci5wdXNoKDApO1xuXHRcdGFIZWFkZXIucHVzaCgwKTtcblxuXHRcdHZhciBhSW5mb0hlYWRlciA9IFtdO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goNDApOyAvLyBpbmZvIGhlYWRlciBzaXplXG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cblx0XHR2YXIgaUltYWdlV2lkdGggPSBpV2lkdGg7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VXaWR0aCAlIDI1Nik7IGlJbWFnZVdpZHRoID0gTWF0aC5mbG9vcihpSW1hZ2VXaWR0aCAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VXaWR0aCAlIDI1Nik7IGlJbWFnZVdpZHRoID0gTWF0aC5mbG9vcihpSW1hZ2VXaWR0aCAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VXaWR0aCAlIDI1Nik7IGlJbWFnZVdpZHRoID0gTWF0aC5mbG9vcihpSW1hZ2VXaWR0aCAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VXaWR0aCAlIDI1Nik7XG5cdFxuXHRcdHZhciBpSW1hZ2VIZWlnaHQgPSBpSGVpZ2h0O1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaUltYWdlSGVpZ2h0ICUgMjU2KTsgaUltYWdlSGVpZ2h0ID0gTWF0aC5mbG9vcihpSW1hZ2VIZWlnaHQgLyAyNTYpO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaUltYWdlSGVpZ2h0ICUgMjU2KTsgaUltYWdlSGVpZ2h0ID0gTWF0aC5mbG9vcihpSW1hZ2VIZWlnaHQgLyAyNTYpO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaUltYWdlSGVpZ2h0ICUgMjU2KTsgaUltYWdlSGVpZ2h0ID0gTWF0aC5mbG9vcihpSW1hZ2VIZWlnaHQgLyAyNTYpO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaUltYWdlSGVpZ2h0ICUgMjU2KTtcblx0XG5cdFx0YUluZm9IZWFkZXIucHVzaCgxKTsgLy8gbnVtIG9mIHBsYW5lc1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFxuXHRcdGFJbmZvSGVhZGVyLnB1c2goMjQpOyAvLyBudW0gb2YgYml0cyBwZXIgcGl4ZWxcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXHRcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApOyAvLyBjb21wcmVzc2lvbiA9IG5vbmVcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblx0XG5cdFx0dmFyIGlEYXRhU2l6ZSA9IGlXaWR0aCppSGVpZ2h0KjM7IFxuXHRcdGFJbmZvSGVhZGVyLnB1c2goaURhdGFTaXplICUgMjU2KTsgaURhdGFTaXplID0gTWF0aC5mbG9vcihpRGF0YVNpemUgLyAyNTYpO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaURhdGFTaXplICUgMjU2KTsgaURhdGFTaXplID0gTWF0aC5mbG9vcihpRGF0YVNpemUgLyAyNTYpO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaURhdGFTaXplICUgMjU2KTsgaURhdGFTaXplID0gTWF0aC5mbG9vcihpRGF0YVNpemUgLyAyNTYpO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaURhdGFTaXplICUgMjU2KTsgXG5cdFxuXHRcdGZvciAodmFyIGk9MDtpPDE2O2krKykge1xuXHRcdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcdC8vIHRoZXNlIGJ5dGVzIG5vdCB1c2VkXG5cdFx0fVxuXHRcblx0XHR2YXIgaVBhZGRpbmcgPSAoNCAtICgoaVdpZHRoICogMykgJSA0KSkgJSA0O1xuXG5cdFx0dmFyIGFJbWdEYXRhID0gb0RhdGEuZGF0YTtcblxuXHRcdHZhciBzdHJQaXhlbERhdGEgPSBcIlwiO1xuXHRcdHZhciB5ID0gaUhlaWdodDtcblx0XHRkbyB7XG5cdFx0XHR2YXIgaU9mZnNldFkgPSBpV2lkdGgqKHktMSkqNDtcblx0XHRcdHZhciBzdHJQaXhlbFJvdyA9IFwiXCI7XG5cdFx0XHRmb3IgKHZhciB4PTA7eDxpV2lkdGg7eCsrKSB7XG5cdFx0XHRcdHZhciBpT2Zmc2V0WCA9IDQqeDtcblxuXHRcdFx0XHRzdHJQaXhlbFJvdyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGFJbWdEYXRhW2lPZmZzZXRZK2lPZmZzZXRYKzJdKTtcblx0XHRcdFx0c3RyUGl4ZWxSb3cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhSW1nRGF0YVtpT2Zmc2V0WStpT2Zmc2V0WCsxXSk7XG5cdFx0XHRcdHN0clBpeGVsUm93ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYUltZ0RhdGFbaU9mZnNldFkraU9mZnNldFhdKTtcblx0XHRcdH1cblx0XHRcdGZvciAodmFyIGM9MDtjPGlQYWRkaW5nO2MrKykge1xuXHRcdFx0XHRzdHJQaXhlbFJvdyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKDApO1xuXHRcdFx0fVxuXHRcdFx0c3RyUGl4ZWxEYXRhICs9IHN0clBpeGVsUm93O1xuXHRcdH0gd2hpbGUgKC0teSk7XG5cblx0XHR2YXIgc3RyRW5jb2RlZCA9IGVuY29kZURhdGEoYUhlYWRlci5jb25jYXQoYUluZm9IZWFkZXIpKSArIGVuY29kZURhdGEoc3RyUGl4ZWxEYXRhKTtcblxuXHRcdHJldHVybiBzdHJFbmNvZGVkO1xuXHR9XG5cblxuXHQvLyBzZW5kcyB0aGUgZ2VuZXJhdGVkIGZpbGUgdG8gdGhlIGNsaWVudFxuXHR2YXIgc2F2ZUZpbGUgPSBmdW5jdGlvbihzdHJEYXRhKSB7XG5cdFx0ZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IHN0ckRhdGE7XG5cdH1cblxuXHR2YXIgbWFrZURhdGFVUkkgPSBmdW5jdGlvbihzdHJEYXRhLCBzdHJNaW1lKSB7XG5cdFx0cmV0dXJuIFwiZGF0YTpcIiArIHN0ck1pbWUgKyBcIjtiYXNlNjQsXCIgKyBzdHJEYXRhO1xuXHR9XG5cblx0Ly8gZ2VuZXJhdGVzIGEgPGltZz4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGltYWdlZGF0YVxuXHR2YXIgbWFrZUltYWdlT2JqZWN0ID0gZnVuY3Rpb24oc3RyU291cmNlKSB7XG5cdFx0dmFyIG9JbWdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcblx0XHRvSW1nRWxlbWVudC5zcmMgPSBzdHJTb3VyY2U7XG5cdFx0cmV0dXJuIG9JbWdFbGVtZW50O1xuXHR9XG5cblx0dmFyIHNjYWxlQ2FudmFzID0gZnVuY3Rpb24ob0NhbnZhcywgaVdpZHRoLCBpSGVpZ2h0KSB7XG5cdFx0aWYgKGlXaWR0aCAmJiBpSGVpZ2h0KSB7XG5cdFx0XHR2YXIgb1NhdmVDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXHRcdFx0b1NhdmVDYW52YXMud2lkdGggPSBpV2lkdGg7XG5cdFx0XHRvU2F2ZUNhbnZhcy5oZWlnaHQgPSBpSGVpZ2h0O1xuXHRcdFx0b1NhdmVDYW52YXMuc3R5bGUud2lkdGggPSBpV2lkdGgrXCJweFwiO1xuXHRcdFx0b1NhdmVDYW52YXMuc3R5bGUuaGVpZ2h0ID0gaUhlaWdodCtcInB4XCI7XG5cblx0XHRcdHZhciBvU2F2ZUN0eCA9IG9TYXZlQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuXHRcdFx0b1NhdmVDdHguZHJhd0ltYWdlKG9DYW52YXMsIDAsIDAsIG9DYW52YXMud2lkdGgsIG9DYW52YXMuaGVpZ2h0LCAwLCAwLCBpV2lkdGgsIGlIZWlnaHQpO1xuXHRcdFx0cmV0dXJuIG9TYXZlQ2FudmFzO1xuXHRcdH1cblx0XHRyZXR1cm4gb0NhbnZhcztcblx0fVxuXG5cdHJldHVybiB7XG5cblx0XHRzYXZlQXNQTkcgOiBmdW5jdGlvbihvQ2FudmFzLCBiUmV0dXJuSW1nLCBpV2lkdGgsIGlIZWlnaHQpIHtcblx0XHRcdGlmICghYkhhc0RhdGFVUkwpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0dmFyIG9TY2FsZWRDYW52YXMgPSBzY2FsZUNhbnZhcyhvQ2FudmFzLCBpV2lkdGgsIGlIZWlnaHQpO1xuXHRcdFx0dmFyIHN0ckRhdGEgPSBvU2NhbGVkQ2FudmFzLnRvRGF0YVVSTChcImltYWdlL3BuZ1wiKTtcblx0XHRcdGlmIChiUmV0dXJuSW1nKSB7XG5cdFx0XHRcdHJldHVybiBtYWtlSW1hZ2VPYmplY3Qoc3RyRGF0YSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzYXZlRmlsZShzdHJEYXRhLnJlcGxhY2UoXCJpbWFnZS9wbmdcIiwgc3RyRG93bmxvYWRNaW1lKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0c2F2ZUFzSlBFRyA6IGZ1bmN0aW9uKG9DYW52YXMsIGJSZXR1cm5JbWcsIGlXaWR0aCwgaUhlaWdodCkge1xuXHRcdFx0aWYgKCFiSGFzRGF0YVVSTCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBvU2NhbGVkQ2FudmFzID0gc2NhbGVDYW52YXMob0NhbnZhcywgaVdpZHRoLCBpSGVpZ2h0KTtcblx0XHRcdHZhciBzdHJNaW1lID0gXCJpbWFnZS9qcGVnXCI7XG5cdFx0XHR2YXIgc3RyRGF0YSA9IG9TY2FsZWRDYW52YXMudG9EYXRhVVJMKHN0ck1pbWUpO1xuXHRcblx0XHRcdC8vIGNoZWNrIGlmIGJyb3dzZXIgYWN0dWFsbHkgc3VwcG9ydHMganBlZyBieSBsb29raW5nIGZvciB0aGUgbWltZSB0eXBlIGluIHRoZSBkYXRhIHVyaS5cblx0XHRcdC8vIGlmIG5vdCwgcmV0dXJuIGZhbHNlXG5cdFx0XHRpZiAoc3RyRGF0YS5pbmRleE9mKHN0ck1pbWUpICE9IDUpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoYlJldHVybkltZykge1xuXHRcdFx0XHRyZXR1cm4gbWFrZUltYWdlT2JqZWN0KHN0ckRhdGEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2F2ZUZpbGUoc3RyRGF0YS5yZXBsYWNlKHN0ck1pbWUsIHN0ckRvd25sb2FkTWltZSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdHNhdmVBc0JNUCA6IGZ1bmN0aW9uKG9DYW52YXMsIGJSZXR1cm5JbWcsIGlXaWR0aCwgaUhlaWdodCkge1xuXHRcdFx0aWYgKCEoYkhhc0ltYWdlRGF0YSAmJiBiSGFzQmFzZTY0KSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdHZhciBvU2NhbGVkQ2FudmFzID0gc2NhbGVDYW52YXMob0NhbnZhcywgaVdpZHRoLCBpSGVpZ2h0KTtcblxuXHRcdFx0dmFyIG9EYXRhID0gcmVhZENhbnZhc0RhdGEob1NjYWxlZENhbnZhcyk7XG5cdFx0XHR2YXIgc3RySW1nRGF0YSA9IGNyZWF0ZUJNUChvRGF0YSk7XG5cdFx0XHRpZiAoYlJldHVybkltZykge1xuXHRcdFx0XHRyZXR1cm4gbWFrZUltYWdlT2JqZWN0KG1ha2VEYXRhVVJJKHN0ckltZ0RhdGEsIFwiaW1hZ2UvYm1wXCIpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNhdmVGaWxlKG1ha2VEYXRhVVJJKHN0ckltZ0RhdGEsIHN0ckRvd25sb2FkTWltZSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHR9O1xuXG59KSgpOyIsIi8qXG4gIGh0bWwyY2FudmFzIDAuNC4xIDxodHRwOi8vaHRtbDJjYW52YXMuaGVydHplbi5jb20+XG4gIENvcHlyaWdodCAoYykgMjAxMyBOaWtsYXMgdm9uIEhlcnR6ZW5cblxuICBSZWxlYXNlZCB1bmRlciBNSVQgTGljZW5zZVxuKi9cblxuKGZ1bmN0aW9uKHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCl7XG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgX2h0bWwyY2FudmFzID0ge30sXG5wcmV2aW91c0VsZW1lbnQsXG5jb21wdXRlZENTUyxcbmh0bWwyY2FudmFzO1xuXG5faHRtbDJjYW52YXMuVXRpbCA9IHt9O1xuXG5faHRtbDJjYW52YXMuVXRpbC5sb2cgPSBmdW5jdGlvbihhKSB7XG4gIGlmIChfaHRtbDJjYW52YXMubG9nZ2luZyAmJiB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS5sb2cpIHtcbiAgICB3aW5kb3cuY29uc29sZS5sb2coYSk7XG4gIH1cbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLnRyaW1UZXh0ID0gKGZ1bmN0aW9uKGlzTmF0aXZlKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgcmV0dXJuIGlzTmF0aXZlID8gaXNOYXRpdmUuYXBwbHkoaW5wdXQpIDogKChpbnB1dCB8fCAnJykgKyAnJykucmVwbGFjZSggL15cXHMrfFxccyskL2cgLCAnJyApO1xuICB9O1xufSkoU3RyaW5nLnByb3RvdHlwZS50cmltKTtcblxuX2h0bWwyY2FudmFzLlV0aWwuYXNGbG9hdCA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQodik7XG59O1xuXG4oZnVuY3Rpb24oKSB7XG4gIC8vIFRPRE86IHN1cHBvcnQgYWxsIHBvc3NpYmxlIGxlbmd0aCB2YWx1ZXNcbiAgdmFyIFRFWFRfU0hBRE9XX1BST1BFUlRZID0gLygocmdiYXxyZ2IpXFwoW15cXCldK1xcKShcXHMtP1xcZCtweCl7MCx9KS9nO1xuICB2YXIgVEVYVF9TSEFET1dfVkFMVUVTID0gLygtP1xcZCtweCl8KCMuKyl8KHJnYlxcKC4rXFwpKXwocmdiYVxcKC4rXFwpKS9nO1xuICBfaHRtbDJjYW52YXMuVXRpbC5wYXJzZVRleHRTaGFkb3dzID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSB8fCB2YWx1ZSA9PT0gJ25vbmUnKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgLy8gZmluZCBtdWx0aXBsZSBzaGFkb3cgZGVjbGFyYXRpb25zXG4gICAgdmFyIHNoYWRvd3MgPSB2YWx1ZS5tYXRjaChURVhUX1NIQURPV19QUk9QRVJUWSksXG4gICAgICByZXN1bHRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IHNoYWRvd3MgJiYgKGkgPCBzaGFkb3dzLmxlbmd0aCk7IGkrKykge1xuICAgICAgdmFyIHMgPSBzaGFkb3dzW2ldLm1hdGNoKFRFWFRfU0hBRE9XX1ZBTFVFUyk7XG4gICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICBjb2xvcjogc1swXSxcbiAgICAgICAgb2Zmc2V0WDogc1sxXSA/IHNbMV0ucmVwbGFjZSgncHgnLCAnJykgOiAwLFxuICAgICAgICBvZmZzZXRZOiBzWzJdID8gc1syXS5yZXBsYWNlKCdweCcsICcnKSA6IDAsXG4gICAgICAgIGJsdXI6IHNbM10gPyBzWzNdLnJlcGxhY2UoJ3B4JywgJycpIDogMFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9O1xufSkoKTtcblxuXG5faHRtbDJjYW52YXMuVXRpbC5wYXJzZUJhY2tncm91bmRJbWFnZSA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHZhciB3aGl0ZXNwYWNlID0gJyBcXHJcXG5cXHQnLFxuICAgICAgICBtZXRob2QsIGRlZmluaXRpb24sIHByZWZpeCwgcHJlZml4X2ksIGJsb2NrLCByZXN1bHRzID0gW10sXG4gICAgICAgIGMsIG1vZGUgPSAwLCBudW1QYXJlbiA9IDAsIHF1b3RlLCBhcmdzO1xuXG4gICAgdmFyIGFwcGVuZFJlc3VsdCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmKG1ldGhvZCkge1xuICAgICAgICAgICAgaWYoZGVmaW5pdGlvbi5zdWJzdHIoIDAsIDEgKSA9PT0gJ1wiJykge1xuICAgICAgICAgICAgICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uLnN1YnN0ciggMSwgZGVmaW5pdGlvbi5sZW5ndGggLSAyICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkZWZpbml0aW9uKSB7XG4gICAgICAgICAgICAgICAgYXJncy5wdXNoKGRlZmluaXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYobWV0aG9kLnN1YnN0ciggMCwgMSApID09PSAnLScgJiZcbiAgICAgICAgICAgICAgICAgICAgKHByZWZpeF9pID0gbWV0aG9kLmluZGV4T2YoICctJywgMSApICsgMSkgPiAwKSB7XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gbWV0aG9kLnN1YnN0ciggMCwgcHJlZml4X2kpO1xuICAgICAgICAgICAgICAgIG1ldGhvZCA9IG1ldGhvZC5zdWJzdHIoIHByZWZpeF9pICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLnRvTG93ZXJDYXNlKCksXG4gICAgICAgICAgICAgICAgdmFsdWU6IGJsb2NrLFxuICAgICAgICAgICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGFyZ3MgPSBbXTsgLy9mb3Igc29tZSBvZGQgcmVhc29uLCBzZXR0aW5nIC5sZW5ndGggPSAwIGRpZG4ndCB3b3JrIGluIHNhZmFyaVxuICAgICAgICBtZXRob2QgPVxuICAgICAgICAgICAgcHJlZml4ID1cbiAgICAgICAgICAgIGRlZmluaXRpb24gPVxuICAgICAgICAgICAgYmxvY2sgPSAnJztcbiAgICB9O1xuXG4gICAgYXBwZW5kUmVzdWx0KCk7XG4gICAgZm9yKHZhciBpID0gMCwgaWkgPSB2YWx1ZS5sZW5ndGg7IGk8aWk7IGkrKykge1xuICAgICAgICBjID0gdmFsdWVbaV07XG4gICAgICAgIGlmKG1vZGUgPT09IDAgJiYgd2hpdGVzcGFjZS5pbmRleE9mKCBjICkgPiAtMSl7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2goYykge1xuICAgICAgICAgICAgY2FzZSAnXCInOlxuICAgICAgICAgICAgICAgIGlmKCFxdW90ZSkge1xuICAgICAgICAgICAgICAgICAgICBxdW90ZSA9IGM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYocXVvdGUgPT09IGMpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVvdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnKCc6XG4gICAgICAgICAgICAgICAgaWYocXVvdGUpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKG1vZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrICs9IGM7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG51bVBhcmVuKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcpJzpcbiAgICAgICAgICAgICAgICBpZihxdW90ZSkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYobW9kZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZihudW1QYXJlbiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jayArPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgYXBwZW5kUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bVBhcmVuLS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJywnOlxuICAgICAgICAgICAgICAgIGlmKHF1b3RlKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihtb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGFwcGVuZFJlc3VsdCgpO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobW9kZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZihudW1QYXJlbiA9PT0gMCAmJiAhbWV0aG9kLm1hdGNoKC9edXJsJC9pKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5wdXNoKGRlZmluaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmaW5pdGlvbiA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2sgKz0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYmxvY2sgKz0gYztcbiAgICAgICAgaWYobW9kZSA9PT0gMCkgeyBtZXRob2QgKz0gYzsgfVxuICAgICAgICBlbHNlIHsgZGVmaW5pdGlvbiArPSBjOyB9XG4gICAgfVxuICAgIGFwcGVuZFJlc3VsdCgpO1xuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG59O1xuXG5faHRtbDJjYW52YXMuVXRpbC5Cb3VuZHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgY2xpZW50UmVjdCwgYm91bmRzID0ge307XG5cbiAgaWYgKGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KXtcbiAgICBjbGllbnRSZWN0ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIFRPRE8gYWRkIHNjcm9sbCBwb3NpdGlvbiB0byBib3VuZHMsIHNvIG5vIHNjcm9sbGluZyBvZiB3aW5kb3cgbmVjZXNzYXJ5XG4gICAgYm91bmRzLnRvcCA9IGNsaWVudFJlY3QudG9wO1xuICAgIGJvdW5kcy5ib3R0b20gPSBjbGllbnRSZWN0LmJvdHRvbSB8fCAoY2xpZW50UmVjdC50b3AgKyBjbGllbnRSZWN0LmhlaWdodCk7XG4gICAgYm91bmRzLmxlZnQgPSBjbGllbnRSZWN0LmxlZnQ7XG5cbiAgICBib3VuZHMud2lkdGggPSBlbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgIGJvdW5kcy5oZWlnaHQgPSBlbGVtZW50Lm9mZnNldEhlaWdodDtcbiAgfVxuXG4gIHJldHVybiBib3VuZHM7XG59O1xuXG4vLyBUT0RPIGlkZWFsbHksIHdlJ2Qgd2FudCBldmVyeXRoaW5nIHRvIGdvIHRocm91Z2ggdGhpcyBmdW5jdGlvbiBpbnN0ZWFkIG9mIFV0aWwuQm91bmRzLFxuLy8gYnV0IHdvdWxkIHJlcXVpcmUgZnVydGhlciB3b3JrIHRvIGNhbGN1bGF0ZSB0aGUgY29ycmVjdCBwb3NpdGlvbnMgZm9yIGVsZW1lbnRzIHdpdGggb2Zmc2V0UGFyZW50c1xuX2h0bWwyY2FudmFzLlV0aWwuT2Zmc2V0Qm91bmRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIHBhcmVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50ID8gX2h0bWwyY2FudmFzLlV0aWwuT2Zmc2V0Qm91bmRzKGVsZW1lbnQub2Zmc2V0UGFyZW50KSA6IHt0b3A6IDAsIGxlZnQ6IDB9O1xuXG4gIHJldHVybiB7XG4gICAgdG9wOiBlbGVtZW50Lm9mZnNldFRvcCArIHBhcmVudC50b3AsXG4gICAgYm90dG9tOiBlbGVtZW50Lm9mZnNldFRvcCArIGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgcGFyZW50LnRvcCxcbiAgICBsZWZ0OiBlbGVtZW50Lm9mZnNldExlZnQgKyBwYXJlbnQubGVmdCxcbiAgICB3aWR0aDogZWxlbWVudC5vZmZzZXRXaWR0aCxcbiAgICBoZWlnaHQ6IGVsZW1lbnQub2Zmc2V0SGVpZ2h0XG4gIH07XG59O1xuXG5mdW5jdGlvbiB0b1BYKGVsZW1lbnQsIGF0dHJpYnV0ZSwgdmFsdWUgKSB7XG4gICAgdmFyIHJzTGVmdCA9IGVsZW1lbnQucnVudGltZVN0eWxlICYmIGVsZW1lbnQucnVudGltZVN0eWxlW2F0dHJpYnV0ZV0sXG4gICAgICAgIGxlZnQsXG4gICAgICAgIHN0eWxlID0gZWxlbWVudC5zdHlsZTtcblxuICAgIC8vIENoZWNrIGlmIHdlIGFyZSBub3QgZGVhbGluZyB3aXRoIHBpeGVscywgKE9wZXJhIGhhcyBpc3N1ZXMgd2l0aCB0aGlzKVxuICAgIC8vIFBvcnRlZCBmcm9tIGpRdWVyeSBjc3MuanNcbiAgICAvLyBGcm9tIHRoZSBhd2Vzb21lIGhhY2sgYnkgRGVhbiBFZHdhcmRzXG4gICAgLy8gaHR0cDovL2VyaWsuZWFlLm5ldC9hcmNoaXZlcy8yMDA3LzA3LzI3LzE4LjU0LjE1LyNjb21tZW50LTEwMjI5MVxuXG4gICAgLy8gSWYgd2UncmUgbm90IGRlYWxpbmcgd2l0aCBhIHJlZ3VsYXIgcGl4ZWwgbnVtYmVyXG4gICAgLy8gYnV0IGEgbnVtYmVyIHRoYXQgaGFzIGEgd2VpcmQgZW5kaW5nLCB3ZSBuZWVkIHRvIGNvbnZlcnQgaXQgdG8gcGl4ZWxzXG5cbiAgICBpZiAoICEvXi0/WzAtOV0rXFwuP1swLTldKig/OnB4KT8kL2kudGVzdCggdmFsdWUgKSAmJiAvXi0/XFxkLy50ZXN0KHZhbHVlKSApIHtcbiAgICAgICAgLy8gUmVtZW1iZXIgdGhlIG9yaWdpbmFsIHZhbHVlc1xuICAgICAgICBsZWZ0ID0gc3R5bGUubGVmdDtcblxuICAgICAgICAvLyBQdXQgaW4gdGhlIG5ldyB2YWx1ZXMgdG8gZ2V0IGEgY29tcHV0ZWQgdmFsdWUgb3V0XG4gICAgICAgIGlmIChyc0xlZnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucnVudGltZVN0eWxlLmxlZnQgPSBlbGVtZW50LmN1cnJlbnRTdHlsZS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIHN0eWxlLmxlZnQgPSBhdHRyaWJ1dGUgPT09IFwiZm9udFNpemVcIiA/IFwiMWVtXCIgOiAodmFsdWUgfHwgMCk7XG4gICAgICAgIHZhbHVlID0gc3R5bGUucGl4ZWxMZWZ0ICsgXCJweFwiO1xuXG4gICAgICAgIC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcbiAgICAgICAgc3R5bGUubGVmdCA9IGxlZnQ7XG4gICAgICAgIGlmIChyc0xlZnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucnVudGltZVN0eWxlLmxlZnQgPSByc0xlZnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIS9eKHRoaW58bWVkaXVtfHRoaWNrKSQvaS50ZXN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChwYXJzZUZsb2F0KHZhbHVlKSkgKyBcInB4XCI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5mdW5jdGlvbiBhc0ludCh2YWwpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQodmFsLCAxMCk7XG59XG5cbmZ1bmN0aW9uIHBhcnNlQmFja2dyb3VuZFNpemVQb3NpdGlvbih2YWx1ZSwgZWxlbWVudCwgYXR0cmlidXRlLCBpbmRleCkge1xuICAgIHZhbHVlID0gKHZhbHVlIHx8ICcnKS5zcGxpdCgnLCcpO1xuICAgIHZhbHVlID0gdmFsdWVbaW5kZXggfHwgMF0gfHwgdmFsdWVbMF0gfHwgJ2F1dG8nO1xuICAgIHZhbHVlID0gX2h0bWwyY2FudmFzLlV0aWwudHJpbVRleHQodmFsdWUpLnNwbGl0KCcgJyk7XG5cbiAgICBpZihhdHRyaWJ1dGUgPT09ICdiYWNrZ3JvdW5kU2l6ZScgJiYgKCF2YWx1ZVswXSB8fCB2YWx1ZVswXS5tYXRjaCgvY292ZXJ8Y29udGFpbnxhdXRvLykpKSB7XG4gICAgICAgIC8vdGhlc2UgdmFsdWVzIHdpbGwgYmUgaGFuZGxlZCBpbiB0aGUgcGFyZW50IGZ1bmN0aW9uXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVbMF0gPSAodmFsdWVbMF0uaW5kZXhPZiggXCIlXCIgKSA9PT0gLTEpID8gdG9QWChlbGVtZW50LCBhdHRyaWJ1dGUgKyBcIlhcIiwgdmFsdWVbMF0pIDogdmFsdWVbMF07XG4gICAgICAgIGlmKHZhbHVlWzFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGF0dHJpYnV0ZSA9PT0gJ2JhY2tncm91bmRTaXplJykge1xuICAgICAgICAgICAgICAgIHZhbHVlWzFdID0gJ2F1dG8nO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSUUgOSBkb2Vzbid0IHJldHVybiBkb3VibGUgZGlnaXQgYWx3YXlzXG4gICAgICAgICAgICAgICAgdmFsdWVbMV0gPSB2YWx1ZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YWx1ZVsxXSA9ICh2YWx1ZVsxXS5pbmRleE9mKFwiJVwiKSA9PT0gLTEpID8gdG9QWChlbGVtZW50LCBhdHRyaWJ1dGUgKyBcIllcIiwgdmFsdWVbMV0pIDogdmFsdWVbMV07XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuX2h0bWwyY2FudmFzLlV0aWwuZ2V0Q1NTID0gZnVuY3Rpb24gKGVsZW1lbnQsIGF0dHJpYnV0ZSwgaW5kZXgpIHtcbiAgICBpZiAocHJldmlvdXNFbGVtZW50ICE9PSBlbGVtZW50KSB7XG4gICAgICBjb21wdXRlZENTUyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCk7XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlID0gY29tcHV0ZWRDU1NbYXR0cmlidXRlXTtcblxuICAgIGlmICgvXmJhY2tncm91bmQoU2l6ZXxQb3NpdGlvbikkLy50ZXN0KGF0dHJpYnV0ZSkpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlQmFja2dyb3VuZFNpemVQb3NpdGlvbih2YWx1ZSwgZWxlbWVudCwgYXR0cmlidXRlLCBpbmRleCk7XG4gICAgfSBlbHNlIGlmICgvYm9yZGVyKFRvcHxCb3R0b20pKExlZnR8UmlnaHQpUmFkaXVzLy50ZXN0KGF0dHJpYnV0ZSkpIHtcbiAgICAgIHZhciBhcnIgPSB2YWx1ZS5zcGxpdChcIiBcIik7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8PSAxKSB7XG4gICAgICAgICAgYXJyWzFdID0gYXJyWzBdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFyci5tYXAoYXNJbnQpO1xuICAgIH1cblxuICByZXR1cm4gdmFsdWU7XG59O1xuXG5faHRtbDJjYW52YXMuVXRpbC5yZXNpemVCb3VuZHMgPSBmdW5jdGlvbiggY3VycmVudF93aWR0aCwgY3VycmVudF9oZWlnaHQsIHRhcmdldF93aWR0aCwgdGFyZ2V0X2hlaWdodCwgc3RyZXRjaF9tb2RlICl7XG4gIHZhciB0YXJnZXRfcmF0aW8gPSB0YXJnZXRfd2lkdGggLyB0YXJnZXRfaGVpZ2h0LFxuICAgIGN1cnJlbnRfcmF0aW8gPSBjdXJyZW50X3dpZHRoIC8gY3VycmVudF9oZWlnaHQsXG4gICAgb3V0cHV0X3dpZHRoLCBvdXRwdXRfaGVpZ2h0O1xuXG4gIGlmKCFzdHJldGNoX21vZGUgfHwgc3RyZXRjaF9tb2RlID09PSAnYXV0bycpIHtcbiAgICBvdXRwdXRfd2lkdGggPSB0YXJnZXRfd2lkdGg7XG4gICAgb3V0cHV0X2hlaWdodCA9IHRhcmdldF9oZWlnaHQ7XG4gIH0gZWxzZSBpZih0YXJnZXRfcmF0aW8gPCBjdXJyZW50X3JhdGlvIF4gc3RyZXRjaF9tb2RlID09PSAnY29udGFpbicpIHtcbiAgICBvdXRwdXRfaGVpZ2h0ID0gdGFyZ2V0X2hlaWdodDtcbiAgICBvdXRwdXRfd2lkdGggPSB0YXJnZXRfaGVpZ2h0ICogY3VycmVudF9yYXRpbztcbiAgfSBlbHNlIHtcbiAgICBvdXRwdXRfd2lkdGggPSB0YXJnZXRfd2lkdGg7XG4gICAgb3V0cHV0X2hlaWdodCA9IHRhcmdldF93aWR0aCAvIGN1cnJlbnRfcmF0aW87XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiBvdXRwdXRfd2lkdGgsXG4gICAgaGVpZ2h0OiBvdXRwdXRfaGVpZ2h0XG4gIH07XG59O1xuXG5mdW5jdGlvbiBiYWNrZ3JvdW5kQm91bmRzRmFjdG9yeSggcHJvcCwgZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXgsIGJhY2tncm91bmRTaXplICkge1xuICAgIHZhciBiZ3Bvc2l0aW9uID0gIF9odG1sMmNhbnZhcy5VdGlsLmdldENTUyggZWwsIHByb3AsIGltYWdlSW5kZXggKSAsXG4gICAgdG9wUG9zLFxuICAgIGxlZnQsXG4gICAgcGVyY2VudGFnZSxcbiAgICB2YWw7XG5cbiAgICBpZiAoYmdwb3NpdGlvbi5sZW5ndGggPT09IDEpe1xuICAgICAgdmFsID0gYmdwb3NpdGlvblswXTtcblxuICAgICAgYmdwb3NpdGlvbiA9IFtdO1xuXG4gICAgICBiZ3Bvc2l0aW9uWzBdID0gdmFsO1xuICAgICAgYmdwb3NpdGlvblsxXSA9IHZhbDtcbiAgICB9XG5cbiAgICBpZiAoYmdwb3NpdGlvblswXS50b1N0cmluZygpLmluZGV4T2YoXCIlXCIpICE9PSAtMSl7XG4gICAgICBwZXJjZW50YWdlID0gKHBhcnNlRmxvYXQoYmdwb3NpdGlvblswXSkvMTAwKTtcbiAgICAgIGxlZnQgPSBib3VuZHMud2lkdGggKiBwZXJjZW50YWdlO1xuICAgICAgaWYocHJvcCAhPT0gJ2JhY2tncm91bmRTaXplJykge1xuICAgICAgICBsZWZ0IC09IChiYWNrZ3JvdW5kU2l6ZSB8fCBpbWFnZSkud2lkdGgqcGVyY2VudGFnZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYocHJvcCA9PT0gJ2JhY2tncm91bmRTaXplJykge1xuICAgICAgICBpZihiZ3Bvc2l0aW9uWzBdID09PSAnYXV0bycpIHtcbiAgICAgICAgICBsZWZ0ID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKC9jb250YWlufGNvdmVyLy50ZXN0KGJncG9zaXRpb25bMF0pKSB7XG4gICAgICAgICAgICB2YXIgcmVzaXplZCA9IF9odG1sMmNhbnZhcy5VdGlsLnJlc2l6ZUJvdW5kcyhpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQsIGJncG9zaXRpb25bMF0pO1xuICAgICAgICAgICAgbGVmdCA9IHJlc2l6ZWQud2lkdGg7XG4gICAgICAgICAgICB0b3BQb3MgPSByZXNpemVkLmhlaWdodDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGVmdCA9IHBhcnNlSW50KGJncG9zaXRpb25bMF0sIDEwKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxlZnQgPSBwYXJzZUludCggYmdwb3NpdGlvblswXSwgMTApO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgaWYoYmdwb3NpdGlvblsxXSA9PT0gJ2F1dG8nKSB7XG4gICAgICB0b3BQb3MgPSBsZWZ0IC8gaW1hZ2Uud2lkdGggKiBpbWFnZS5oZWlnaHQ7XG4gICAgfSBlbHNlIGlmIChiZ3Bvc2l0aW9uWzFdLnRvU3RyaW5nKCkuaW5kZXhPZihcIiVcIikgIT09IC0xKXtcbiAgICAgIHBlcmNlbnRhZ2UgPSAocGFyc2VGbG9hdChiZ3Bvc2l0aW9uWzFdKS8xMDApO1xuICAgICAgdG9wUG9zID0gIGJvdW5kcy5oZWlnaHQgKiBwZXJjZW50YWdlO1xuICAgICAgaWYocHJvcCAhPT0gJ2JhY2tncm91bmRTaXplJykge1xuICAgICAgICB0b3BQb3MgLT0gKGJhY2tncm91bmRTaXplIHx8IGltYWdlKS5oZWlnaHQgKiBwZXJjZW50YWdlO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIHRvcFBvcyA9IHBhcnNlSW50KGJncG9zaXRpb25bMV0sMTApO1xuICAgIH1cblxuICAgIHJldHVybiBbbGVmdCwgdG9wUG9zXTtcbn1cblxuX2h0bWwyY2FudmFzLlV0aWwuQmFja2dyb3VuZFBvc2l0aW9uID0gZnVuY3Rpb24oIGVsLCBib3VuZHMsIGltYWdlLCBpbWFnZUluZGV4LCBiYWNrZ3JvdW5kU2l6ZSApIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFja2dyb3VuZEJvdW5kc0ZhY3RvcnkoICdiYWNrZ3JvdW5kUG9zaXRpb24nLCBlbCwgYm91bmRzLCBpbWFnZSwgaW1hZ2VJbmRleCwgYmFja2dyb3VuZFNpemUgKTtcbiAgICByZXR1cm4geyBsZWZ0OiByZXN1bHRbMF0sIHRvcDogcmVzdWx0WzFdIH07XG59O1xuXG5faHRtbDJjYW52YXMuVXRpbC5CYWNrZ3JvdW5kU2l6ZSA9IGZ1bmN0aW9uKCBlbCwgYm91bmRzLCBpbWFnZSwgaW1hZ2VJbmRleCApIHtcbiAgICB2YXIgcmVzdWx0ID0gYmFja2dyb3VuZEJvdW5kc0ZhY3RvcnkoICdiYWNrZ3JvdW5kU2l6ZScsIGVsLCBib3VuZHMsIGltYWdlLCBpbWFnZUluZGV4ICk7XG4gICAgcmV0dXJuIHsgd2lkdGg6IHJlc3VsdFswXSwgaGVpZ2h0OiByZXN1bHRbMV0gfTtcbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLkV4dGVuZCA9IGZ1bmN0aW9uIChvcHRpb25zLCBkZWZhdWx0cykge1xuICBmb3IgKHZhciBrZXkgaW4gb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgIGRlZmF1bHRzW2tleV0gPSBvcHRpb25zW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBkZWZhdWx0cztcbn07XG5cblxuLypcbiAqIERlcml2ZWQgZnJvbSBqUXVlcnkuY29udGVudHMoKVxuICogQ29weXJpZ2h0IDIwMTAsIEpvaG4gUmVzaWdcbiAqIER1YWwgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBvciBHUEwgVmVyc2lvbiAyIGxpY2Vuc2VzLlxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICovXG5faHRtbDJjYW52YXMuVXRpbC5DaGlsZHJlbiA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgY2hpbGRyZW47XG4gIHRyeSB7XG4gICAgY2hpbGRyZW4gPSAoZWxlbS5ub2RlTmFtZSAmJiBlbGVtLm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgPT09IFwiSUZSQU1FXCIpID8gZWxlbS5jb250ZW50RG9jdW1lbnQgfHwgZWxlbS5jb250ZW50V2luZG93LmRvY3VtZW50IDogKGZ1bmN0aW9uKGFycmF5KSB7XG4gICAgICB2YXIgcmV0ID0gW107XG4gICAgICBpZiAoYXJyYXkgIT09IG51bGwpIHtcbiAgICAgICAgKGZ1bmN0aW9uKGZpcnN0LCBzZWNvbmQgKSB7XG4gICAgICAgICAgdmFyIGkgPSBmaXJzdC5sZW5ndGgsXG4gICAgICAgICAgaiA9IDA7XG5cbiAgICAgICAgICBpZiAodHlwZW9mIHNlY29uZC5sZW5ndGggPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGwgPSBzZWNvbmQubGVuZ3RoOyBqIDwgbDsgaisrKSB7XG4gICAgICAgICAgICAgIGZpcnN0W2krK10gPSBzZWNvbmRbal07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdoaWxlIChzZWNvbmRbal0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICBmaXJzdFtpKytdID0gc2Vjb25kW2orK107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmlyc3QubGVuZ3RoID0gaTtcblxuICAgICAgICAgIHJldHVybiBmaXJzdDtcbiAgICAgICAgfSkocmV0LCBhcnJheSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH0pKGVsZW0uY2hpbGROb2Rlcyk7XG5cbiAgfSBjYXRjaCAoZXgpIHtcbiAgICBfaHRtbDJjYW52YXMuVXRpbC5sb2coXCJodG1sMmNhbnZhcy5VdGlsLkNoaWxkcmVuIGZhaWxlZCB3aXRoIGV4Y2VwdGlvbjogXCIgKyBleC5tZXNzYWdlKTtcbiAgICBjaGlsZHJlbiA9IFtdO1xuICB9XG4gIHJldHVybiBjaGlsZHJlbjtcbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLmlzVHJhbnNwYXJlbnQgPSBmdW5jdGlvbihiYWNrZ3JvdW5kQ29sb3IpIHtcbiAgcmV0dXJuIChiYWNrZ3JvdW5kQ29sb3IgPT09IFwidHJhbnNwYXJlbnRcIiB8fCBiYWNrZ3JvdW5kQ29sb3IgPT09IFwicmdiYSgwLCAwLCAwLCAwKVwiKTtcbn07XG5faHRtbDJjYW52YXMuVXRpbC5Gb250ID0gKGZ1bmN0aW9uICgpIHtcblxuICB2YXIgZm9udERhdGEgPSB7fTtcblxuICByZXR1cm4gZnVuY3Rpb24oZm9udCwgZm9udFNpemUsIGRvYykge1xuICAgIGlmIChmb250RGF0YVtmb250ICsgXCItXCIgKyBmb250U2l6ZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZvbnREYXRhW2ZvbnQgKyBcIi1cIiArIGZvbnRTaXplXTtcbiAgICB9XG5cbiAgICB2YXIgY29udGFpbmVyID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2RpdicpLFxuICAgIGltZyA9IGRvYy5jcmVhdGVFbGVtZW50KCdpbWcnKSxcbiAgICBzcGFuID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKSxcbiAgICBzYW1wbGVUZXh0ID0gJ0hpZGRlbiBUZXh0JyxcbiAgICBiYXNlbGluZSxcbiAgICBtaWRkbGUsXG4gICAgbWV0cmljc09iajtcblxuICAgIGNvbnRhaW5lci5zdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICBjb250YWluZXIuc3R5bGUuZm9udEZhbWlseSA9IGZvbnQ7XG4gICAgY29udGFpbmVyLnN0eWxlLmZvbnRTaXplID0gZm9udFNpemU7XG4gICAgY29udGFpbmVyLnN0eWxlLm1hcmdpbiA9IDA7XG4gICAgY29udGFpbmVyLnN0eWxlLnBhZGRpbmcgPSAwO1xuXG4gICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIC8vIGh0dHA6Ly9wcm9iYWJseXByb2dyYW1taW5nLmNvbS8yMDA5LzAzLzE1L3RoZS10aW5pZXN0LWdpZi1ldmVyIChoYW5kdGlueXdoaXRlLmdpZilcbiAgICBpbWcuc3JjID0gXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsUjBsR09EbGhBUUFCQUlBQkFQLy8vd0FBQUN3QUFBQUFBUUFCQUFBQ0FrUUJBRHM9XCI7XG4gICAgaW1nLndpZHRoID0gMTtcbiAgICBpbWcuaGVpZ2h0ID0gMTtcblxuICAgIGltZy5zdHlsZS5tYXJnaW4gPSAwO1xuICAgIGltZy5zdHlsZS5wYWRkaW5nID0gMDtcbiAgICBpbWcuc3R5bGUudmVydGljYWxBbGlnbiA9IFwiYmFzZWxpbmVcIjtcblxuICAgIHNwYW4uc3R5bGUuZm9udEZhbWlseSA9IGZvbnQ7XG4gICAgc3Bhbi5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplO1xuICAgIHNwYW4uc3R5bGUubWFyZ2luID0gMDtcbiAgICBzcGFuLnN0eWxlLnBhZGRpbmcgPSAwO1xuXG4gICAgc3Bhbi5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoc2FtcGxlVGV4dCkpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzcGFuKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICBiYXNlbGluZSA9IChpbWcub2Zmc2V0VG9wIC0gc3Bhbi5vZmZzZXRUb3ApICsgMTtcblxuICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChzcGFuKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKHNhbXBsZVRleHQpKTtcblxuICAgIGNvbnRhaW5lci5zdHlsZS5saW5lSGVpZ2h0ID0gXCJub3JtYWxcIjtcbiAgICBpbWcuc3R5bGUudmVydGljYWxBbGlnbiA9IFwic3VwZXJcIjtcblxuICAgIG1pZGRsZSA9IChpbWcub2Zmc2V0VG9wLWNvbnRhaW5lci5vZmZzZXRUb3ApICsgMTtcbiAgICBtZXRyaWNzT2JqID0ge1xuICAgICAgYmFzZWxpbmU6IGJhc2VsaW5lLFxuICAgICAgbGluZVdpZHRoOiAxLFxuICAgICAgbWlkZGxlOiBtaWRkbGVcbiAgICB9O1xuXG4gICAgZm9udERhdGFbZm9udCArIFwiLVwiICsgZm9udFNpemVdID0gbWV0cmljc09iajtcblxuICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKGNvbnRhaW5lcik7XG5cbiAgICByZXR1cm4gbWV0cmljc09iajtcbiAgfTtcbn0pKCk7XG5cbihmdW5jdGlvbigpe1xuICB2YXIgVXRpbCA9IF9odG1sMmNhbnZhcy5VdGlsLFxuICAgIEdlbmVyYXRlID0ge307XG5cbiAgX2h0bWwyY2FudmFzLkdlbmVyYXRlID0gR2VuZXJhdGU7XG5cbiAgdmFyIHJlR3JhZGllbnRzID0gW1xuICAvXigtd2Via2l0LWxpbmVhci1ncmFkaWVudClcXCgoW2Etelxcc10rKShbXFx3XFxkXFwuXFxzLCVcXChcXCldKylcXCkkLyxcbiAgL14oLW8tbGluZWFyLWdyYWRpZW50KVxcKChbYS16XFxzXSspKFtcXHdcXGRcXC5cXHMsJVxcKFxcKV0rKVxcKSQvLFxuICAvXigtd2Via2l0LWdyYWRpZW50KVxcKChsaW5lYXJ8cmFkaWFsKSxcXHMoKD86XFxkezEsM30lPylcXHMoPzpcXGR7MSwzfSU/KSxcXHMoPzpcXGR7MSwzfSU/KVxccyg/OlxcZHsxLDN9JT8pKShbXFx3XFxkXFwuXFxzLCVcXChcXClcXC1dKylcXCkkLyxcbiAgL14oLW1vei1saW5lYXItZ3JhZGllbnQpXFwoKCg/OlxcZHsxLDN9JT8pXFxzKD86XFxkezEsM30lPykpKFtcXHdcXGRcXC5cXHMsJVxcKFxcKV0rKVxcKSQvLFxuICAvXigtd2Via2l0LXJhZGlhbC1ncmFkaWVudClcXCgoKD86XFxkezEsM30lPylcXHMoPzpcXGR7MSwzfSU/KSksXFxzKFxcdyspXFxzKFthLXpcXC1dKykoW1xcd1xcZFxcLlxccywlXFwoXFwpXSspXFwpJC8sXG4gIC9eKC1tb3otcmFkaWFsLWdyYWRpZW50KVxcKCgoPzpcXGR7MSwzfSU/KVxccyg/OlxcZHsxLDN9JT8pKSxcXHMoXFx3KylcXHM/KFthLXpcXC1dKikoW1xcd1xcZFxcLlxccywlXFwoXFwpXSspXFwpJC8sXG4gIC9eKC1vLXJhZGlhbC1ncmFkaWVudClcXCgoKD86XFxkezEsM30lPylcXHMoPzpcXGR7MSwzfSU/KSksXFxzKFxcdyspXFxzKFthLXpcXC1dKykoW1xcd1xcZFxcLlxccywlXFwoXFwpXSspXFwpJC9cbiAgXTtcblxuICAvKlxuICogVE9ETzogQWRkIElFMTAgdmVuZG9yIHByZWZpeCAoLW1zKSBzdXBwb3J0XG4gKiBUT0RPOiBBZGQgVzNDIGdyYWRpZW50IChsaW5lYXItZ3JhZGllbnQpIHN1cHBvcnRcbiAqIFRPRE86IEFkZCBvbGQgV2Via2l0IC13ZWJraXQtZ3JhZGllbnQocmFkaWFsLCAuLi4pIHN1cHBvcnRcbiAqIFRPRE86IE1heWJlIHNvbWUgUmVnRXhwIG9wdGltaXphdGlvbnMgYXJlIHBvc3NpYmxlIDtvKVxuICovXG4gIEdlbmVyYXRlLnBhcnNlR3JhZGllbnQgPSBmdW5jdGlvbihjc3MsIGJvdW5kcykge1xuICAgIHZhciBncmFkaWVudCwgaSwgbGVuID0gcmVHcmFkaWVudHMubGVuZ3RoLCBtMSwgc3RvcCwgbTIsIG0yTGVuLCBzdGVwLCBtMywgdGwsdHIsYnIsYmw7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrPTEpe1xuICAgICAgbTEgPSBjc3MubWF0Y2gocmVHcmFkaWVudHNbaV0pO1xuICAgICAgaWYobTEpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYobTEpIHtcbiAgICAgIHN3aXRjaChtMVsxXSkge1xuICAgICAgICBjYXNlICctd2Via2l0LWxpbmVhci1ncmFkaWVudCc6XG4gICAgICAgIGNhc2UgJy1vLWxpbmVhci1ncmFkaWVudCc6XG5cbiAgICAgICAgICBncmFkaWVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgeDA6IG51bGwsXG4gICAgICAgICAgICB5MDogbnVsbCxcbiAgICAgICAgICAgIHgxOiBudWxsLFxuICAgICAgICAgICAgeTE6IG51bGwsXG4gICAgICAgICAgICBjb2xvclN0b3BzOiBbXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBnZXQgY29vcmRpbmF0ZXNcbiAgICAgICAgICBtMiA9IG0xWzJdLm1hdGNoKC9cXHcrL2cpO1xuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIG0yTGVuID0gbTIubGVuZ3RoO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbTJMZW47IGkrPTEpe1xuICAgICAgICAgICAgICBzd2l0Y2gobTJbaV0pIHtcbiAgICAgICAgICAgICAgICBjYXNlICd0b3AnOlxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTAgPSAwO1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTEgPSBib3VuZHMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdyaWdodCc6XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC54MCA9IGJvdW5kcy53aWR0aDtcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngxID0gMDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkwID0gYm91bmRzLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkxID0gMDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC54MCA9IDA7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC54MSA9IGJvdW5kcy53aWR0aDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGdyYWRpZW50LngwID09PSBudWxsICYmIGdyYWRpZW50LngxID09PSBudWxsKXsgLy8gY2VudGVyXG4gICAgICAgICAgICBncmFkaWVudC54MCA9IGdyYWRpZW50LngxID0gYm91bmRzLndpZHRoIC8gMjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoZ3JhZGllbnQueTAgPT09IG51bGwgJiYgZ3JhZGllbnQueTEgPT09IG51bGwpeyAvLyBjZW50ZXJcbiAgICAgICAgICAgIGdyYWRpZW50LnkwID0gZ3JhZGllbnQueTEgPSBib3VuZHMuaGVpZ2h0IC8gMjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBnZXQgY29sb3JzIGFuZCBzdG9wc1xuICAgICAgICAgIG0yID0gbTFbM10ubWF0Y2goLygoPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKSg/Olxcc1xcZHsxLDN9KD86JXxweCkpPykrL2cpO1xuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIG0yTGVuID0gbTIubGVuZ3RoO1xuICAgICAgICAgICAgc3RlcCA9IDEgLyBNYXRoLm1heChtMkxlbiAtIDEsIDEpO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbTJMZW47IGkrPTEpe1xuICAgICAgICAgICAgICBtMyA9IG0yW2ldLm1hdGNoKC8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkpXFxzKihcXGR7MSwzfSk/KCV8cHgpPy8pO1xuICAgICAgICAgICAgICBpZihtM1syXSl7XG4gICAgICAgICAgICAgICAgc3RvcCA9IHBhcnNlRmxvYXQobTNbMl0pO1xuICAgICAgICAgICAgICAgIGlmKG0zWzNdID09PSAnJScpe1xuICAgICAgICAgICAgICAgICAgc3RvcCAvPSAxMDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gcHggLSBzdHVwaWQgb3BlcmFcbiAgICAgICAgICAgICAgICAgIHN0b3AgLz0gYm91bmRzLndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9wID0gaSAqIHN0ZXA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZ3JhZGllbnQuY29sb3JTdG9wcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbTNbMV0sXG4gICAgICAgICAgICAgICAgc3RvcDogc3RvcFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnLXdlYmtpdC1ncmFkaWVudCc6XG5cbiAgICAgICAgICBncmFkaWVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6IG0xWzJdID09PSAncmFkaWFsJyA/ICdjaXJjbGUnIDogbTFbMl0sIC8vIFRPRE86IEFkZCByYWRpYWwgZ3JhZGllbnQgc3VwcG9ydCBmb3Igb2xkZXIgbW96aWxsYSBkZWZpbml0aW9uc1xuICAgICAgICAgICAgeDA6IDAsXG4gICAgICAgICAgICB5MDogMCxcbiAgICAgICAgICAgIHgxOiAwLFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICBjb2xvclN0b3BzOiBbXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBnZXQgY29vcmRpbmF0ZXNcbiAgICAgICAgICBtMiA9IG0xWzNdLm1hdGNoKC8oXFxkezEsM30pJT9cXHMoXFxkezEsM30pJT8sXFxzKFxcZHsxLDN9KSU/XFxzKFxcZHsxLDN9KSU/Lyk7XG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgZ3JhZGllbnQueDAgPSAobTJbMV0gKiBib3VuZHMud2lkdGgpIC8gMTAwO1xuICAgICAgICAgICAgZ3JhZGllbnQueTAgPSAobTJbMl0gKiBib3VuZHMuaGVpZ2h0KSAvIDEwMDtcbiAgICAgICAgICAgIGdyYWRpZW50LngxID0gKG0yWzNdICogYm91bmRzLndpZHRoKSAvIDEwMDtcbiAgICAgICAgICAgIGdyYWRpZW50LnkxID0gKG0yWzRdICogYm91bmRzLmhlaWdodCkgLyAxMDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZ2V0IGNvbG9ycyBhbmQgc3RvcHNcbiAgICAgICAgICBtMiA9IG0xWzRdLm1hdGNoKC8oKD86ZnJvbXx0b3xjb2xvci1zdG9wKVxcKCg/OlswLTlcXC5dKyxcXHMpPyg/OnJnYnxyZ2JhKVxcKFxcZHsxLDN9LFxcc1xcZHsxLDN9LFxcc1xcZHsxLDN9KD86LFxcc1swLTlcXC5dKyk/XFwpXFwpKSsvZyk7XG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgbTJMZW4gPSBtMi5sZW5ndGg7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBtMkxlbjsgaSs9MSl7XG4gICAgICAgICAgICAgIG0zID0gbTJbaV0ubWF0Y2goLyhmcm9tfHRvfGNvbG9yLXN0b3ApXFwoKFswLTlcXC5dKyk/KD86LFxccyk/KCg/OnJnYnxyZ2JhKVxcKFxcZHsxLDN9LFxcc1xcZHsxLDN9LFxcc1xcZHsxLDN9KD86LFxcc1swLTlcXC5dKyk/XFwpKVxcKS8pO1xuICAgICAgICAgICAgICBzdG9wID0gcGFyc2VGbG9hdChtM1syXSk7XG4gICAgICAgICAgICAgIGlmKG0zWzFdID09PSAnZnJvbScpIHtcbiAgICAgICAgICAgICAgICBzdG9wID0gMC4wO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmKG0zWzFdID09PSAndG8nKSB7XG4gICAgICAgICAgICAgICAgc3RvcCA9IDEuMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbG9yOiBtM1szXSxcbiAgICAgICAgICAgICAgICBzdG9wOiBzdG9wXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICctbW96LWxpbmVhci1ncmFkaWVudCc6XG5cbiAgICAgICAgICBncmFkaWVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICAgICAgeDA6IDAsXG4gICAgICAgICAgICB5MDogMCxcbiAgICAgICAgICAgIHgxOiAwLFxuICAgICAgICAgICAgeTE6IDAsXG4gICAgICAgICAgICBjb2xvclN0b3BzOiBbXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBnZXQgY29vcmRpbmF0ZXNcbiAgICAgICAgICBtMiA9IG0xWzJdLm1hdGNoKC8oXFxkezEsM30pJT9cXHMoXFxkezEsM30pJT8vKTtcblxuICAgICAgICAgIC8vIG0yWzFdID09IDAlICAgLT4gbGVmdFxuICAgICAgICAgIC8vIG0yWzFdID09IDUwJSAgLT4gY2VudGVyXG4gICAgICAgICAgLy8gbTJbMV0gPT0gMTAwJSAtPiByaWdodFxuXG4gICAgICAgICAgLy8gbTJbMl0gPT0gMCUgICAtPiB0b3BcbiAgICAgICAgICAvLyBtMlsyXSA9PSA1MCUgIC0+IGNlbnRlclxuICAgICAgICAgIC8vIG0yWzJdID09IDEwMCUgLT4gYm90dG9tXG5cbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBncmFkaWVudC54MCA9IChtMlsxXSAqIGJvdW5kcy53aWR0aCkgLyAxMDA7XG4gICAgICAgICAgICBncmFkaWVudC55MCA9IChtMlsyXSAqIGJvdW5kcy5oZWlnaHQpIC8gMTAwO1xuICAgICAgICAgICAgZ3JhZGllbnQueDEgPSBib3VuZHMud2lkdGggLSBncmFkaWVudC54MDtcbiAgICAgICAgICAgIGdyYWRpZW50LnkxID0gYm91bmRzLmhlaWdodCAtIGdyYWRpZW50LnkwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGdldCBjb2xvcnMgYW5kIHN0b3BzXG4gICAgICAgICAgbTIgPSBtMVszXS5tYXRjaCgvKCg/OnJnYnxyZ2JhKVxcKFxcZHsxLDN9LFxcc1xcZHsxLDN9LFxcc1xcZHsxLDN9KD86LFxcc1swLTlcXC5dKyk/XFwpKD86XFxzXFxkezEsM30lKT8pKy9nKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBtMkxlbiA9IG0yLmxlbmd0aDtcbiAgICAgICAgICAgIHN0ZXAgPSAxIC8gTWF0aC5tYXgobTJMZW4gLSAxLCAxKTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IG0yTGVuOyBpKz0xKXtcbiAgICAgICAgICAgICAgbTMgPSBtMltpXS5tYXRjaCgvKCg/OnJnYnxyZ2JhKVxcKFxcZHsxLDN9LFxcc1xcZHsxLDN9LFxcc1xcZHsxLDN9KD86LFxcc1swLTlcXC5dKyk/XFwpKVxccyooXFxkezEsM30pPyglKT8vKTtcbiAgICAgICAgICAgICAgaWYobTNbMl0pe1xuICAgICAgICAgICAgICAgIHN0b3AgPSBwYXJzZUZsb2F0KG0zWzJdKTtcbiAgICAgICAgICAgICAgICBpZihtM1szXSl7IC8vIHBlcmNlbnRhZ2VcbiAgICAgICAgICAgICAgICAgIHN0b3AgLz0gMTAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9wID0gaSAqIHN0ZXA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZ3JhZGllbnQuY29sb3JTdG9wcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbTNbMV0sXG4gICAgICAgICAgICAgICAgc3RvcDogc3RvcFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnLXdlYmtpdC1yYWRpYWwtZ3JhZGllbnQnOlxuICAgICAgICBjYXNlICctbW96LXJhZGlhbC1ncmFkaWVudCc6XG4gICAgICAgIGNhc2UgJy1vLXJhZGlhbC1ncmFkaWVudCc6XG5cbiAgICAgICAgICBncmFkaWVudCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdjaXJjbGUnLFxuICAgICAgICAgICAgeDA6IDAsXG4gICAgICAgICAgICB5MDogMCxcbiAgICAgICAgICAgIHgxOiBib3VuZHMud2lkdGgsXG4gICAgICAgICAgICB5MTogYm91bmRzLmhlaWdodCxcbiAgICAgICAgICAgIGN4OiAwLFxuICAgICAgICAgICAgY3k6IDAsXG4gICAgICAgICAgICByeDogMCxcbiAgICAgICAgICAgIHJ5OiAwLFxuICAgICAgICAgICAgY29sb3JTdG9wczogW11cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gY2VudGVyXG4gICAgICAgICAgbTIgPSBtMVsyXS5tYXRjaCgvKFxcZHsxLDN9KSU/XFxzKFxcZHsxLDN9KSU/Lyk7XG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgZ3JhZGllbnQuY3ggPSAobTJbMV0gKiBib3VuZHMud2lkdGgpIC8gMTAwO1xuICAgICAgICAgICAgZ3JhZGllbnQuY3kgPSAobTJbMl0gKiBib3VuZHMuaGVpZ2h0KSAvIDEwMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzaXplXG4gICAgICAgICAgbTIgPSBtMVszXS5tYXRjaCgvXFx3Ky8pO1xuICAgICAgICAgIG0zID0gbTFbNF0ubWF0Y2goL1thLXpcXC1dKi8pO1xuICAgICAgICAgIGlmKG0yICYmIG0zKXtcbiAgICAgICAgICAgIHN3aXRjaChtM1swXSl7XG4gICAgICAgICAgICAgIGNhc2UgJ2ZhcnRoZXN0LWNvcm5lcic6XG4gICAgICAgICAgICAgIGNhc2UgJ2NvdmVyJzogLy8gaXMgZXF1aXZhbGVudCB0byBmYXJ0aGVzdC1jb3JuZXJcbiAgICAgICAgICAgICAgY2FzZSAnJzogLy8gbW96aWxsYSByZW1vdmVzIFwiY292ZXJcIiBmcm9tIGRlZmluaXRpb24gOihcbiAgICAgICAgICAgICAgICB0bCA9IE1hdGguc3FydChNYXRoLnBvdyhncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIHRyID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LmN4LCAyKSArIE1hdGgucG93KGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICBiciA9IE1hdGguc3FydChNYXRoLnBvdyhncmFkaWVudC54MSAtIGdyYWRpZW50LmN4LCAyKSArIE1hdGgucG93KGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICBibCA9IE1hdGguc3FydChNYXRoLnBvdyhncmFkaWVudC54MSAtIGdyYWRpZW50LmN4LCAyKSArIE1hdGgucG93KGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgZ3JhZGllbnQucnggPSBncmFkaWVudC5yeSA9IE1hdGgubWF4KHRsLCB0ciwgYnIsIGJsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnY2xvc2VzdC1jb3JuZXInOlxuICAgICAgICAgICAgICAgIHRsID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LmN4LCAyKSArIE1hdGgucG93KGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgdHIgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIGJyID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIGJsID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IGdyYWRpZW50LnJ5ID0gTWF0aC5taW4odGwsIHRyLCBiciwgYmwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdmYXJ0aGVzdC1zaWRlJzpcbiAgICAgICAgICAgICAgICBpZihtMlswXSA9PT0gJ2NpcmNsZScpe1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQucnggPSBncmFkaWVudC5yeSA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3ksXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3gsXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3lcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBlbGxpcHNlXG5cbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnR5cGUgPSBtMlswXTtcblxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQucnggPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3gsXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3hcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnJ5ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN5LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC55MSAtIGdyYWRpZW50LmN5XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdjbG9zZXN0LXNpZGUnOlxuICAgICAgICAgICAgICBjYXNlICdjb250YWluJzogLy8gaXMgZXF1aXZhbGVudCB0byBjbG9zZXN0LXNpZGVcbiAgICAgICAgICAgICAgICBpZihtMlswXSA9PT0gJ2NpcmNsZScpe1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQucnggPSBncmFkaWVudC5yeSA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3ksXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3gsXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3lcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBlbGxpcHNlXG5cbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnR5cGUgPSBtMlswXTtcblxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQucnggPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3gsXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3hcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnJ5ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN5LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC55MSAtIGdyYWRpZW50LmN5XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3IgXCIzMHB4IDQwcHhcIiBzaXplcyAod2Via2l0IG9ubHkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gY29sb3Igc3RvcHNcbiAgICAgICAgICBtMiA9IG0xWzVdLm1hdGNoKC8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkoPzpcXHNcXGR7MSwzfSg/OiV8cHgpKT8pKy9nKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBtMkxlbiA9IG0yLmxlbmd0aDtcbiAgICAgICAgICAgIHN0ZXAgPSAxIC8gTWF0aC5tYXgobTJMZW4gLSAxLCAxKTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IG0yTGVuOyBpKz0xKXtcbiAgICAgICAgICAgICAgbTMgPSBtMltpXS5tYXRjaCgvKCg/OnJnYnxyZ2JhKVxcKFxcZHsxLDN9LFxcc1xcZHsxLDN9LFxcc1xcZHsxLDN9KD86LFxcc1swLTlcXC5dKyk/XFwpKVxccyooXFxkezEsM30pPyglfHB4KT8vKTtcbiAgICAgICAgICAgICAgaWYobTNbMl0pe1xuICAgICAgICAgICAgICAgIHN0b3AgPSBwYXJzZUZsb2F0KG0zWzJdKTtcbiAgICAgICAgICAgICAgICBpZihtM1szXSA9PT0gJyUnKXtcbiAgICAgICAgICAgICAgICAgIHN0b3AgLz0gMTAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIHB4IC0gc3R1cGlkIG9wZXJhXG4gICAgICAgICAgICAgICAgICBzdG9wIC89IGJvdW5kcy53aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcCA9IGkgKiBzdGVwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGdyYWRpZW50LmNvbG9yU3RvcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IG0zWzFdLFxuICAgICAgICAgICAgICAgIHN0b3A6IHN0b3BcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBncmFkaWVudDtcbiAgfTtcblxuICBmdW5jdGlvbiBhZGRTY3JvbGxTdG9wcyhncmFkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9yU3RvcCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZ3JhZC5hZGRDb2xvclN0b3AoY29sb3JTdG9wLnN0b3AsIGNvbG9yU3RvcC5jb2xvcik7XG4gICAgICB9XG4gICAgICBjYXRjaChlKSB7XG4gICAgICAgIFV0aWwubG9nKFsnZmFpbGVkIHRvIGFkZCBjb2xvciBzdG9wOiAnLCBlLCAnOyB0cmllZCB0byBhZGQ6ICcsIGNvbG9yU3RvcF0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBHZW5lcmF0ZS5HcmFkaWVudCA9IGZ1bmN0aW9uKHNyYywgYm91bmRzKSB7XG4gICAgaWYoYm91bmRzLndpZHRoID09PSAwIHx8IGJvdW5kcy5oZWlnaHQgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyksXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyksXG4gICAgZ3JhZGllbnQsIGdyYWQ7XG5cbiAgICBjYW52YXMud2lkdGggPSBib3VuZHMud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGJvdW5kcy5oZWlnaHQ7XG5cbiAgICAvLyBUT0RPOiBhZGQgc3VwcG9ydCBmb3IgbXVsdGkgZGVmaW5lZCBiYWNrZ3JvdW5kIGdyYWRpZW50c1xuICAgIGdyYWRpZW50ID0gX2h0bWwyY2FudmFzLkdlbmVyYXRlLnBhcnNlR3JhZGllbnQoc3JjLCBib3VuZHMpO1xuXG4gICAgaWYoZ3JhZGllbnQpIHtcbiAgICAgIHN3aXRjaChncmFkaWVudC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ2xpbmVhcic6XG4gICAgICAgICAgZ3JhZCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChncmFkaWVudC54MCwgZ3JhZGllbnQueTAsIGdyYWRpZW50LngxLCBncmFkaWVudC55MSk7XG4gICAgICAgICAgZ3JhZGllbnQuY29sb3JTdG9wcy5mb3JFYWNoKGFkZFNjcm9sbFN0b3BzKGdyYWQpKTtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZDtcbiAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdjaXJjbGUnOlxuICAgICAgICAgIGdyYWQgPSBjdHguY3JlYXRlUmFkaWFsR3JhZGllbnQoZ3JhZGllbnQuY3gsIGdyYWRpZW50LmN5LCAwLCBncmFkaWVudC5jeCwgZ3JhZGllbnQuY3ksIGdyYWRpZW50LnJ4KTtcbiAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLmZvckVhY2goYWRkU2Nyb2xsU3RvcHMoZ3JhZCkpO1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkO1xuICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2VsbGlwc2UnOlxuICAgICAgICAgIHZhciBjYW52YXNSYWRpYWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSxcbiAgICAgICAgICAgIGN0eFJhZGlhbCA9IGNhbnZhc1JhZGlhbC5nZXRDb250ZXh0KCcyZCcpLFxuICAgICAgICAgICAgcmkgPSBNYXRoLm1heChncmFkaWVudC5yeCwgZ3JhZGllbnQucnkpLFxuICAgICAgICAgICAgZGkgPSByaSAqIDI7XG5cbiAgICAgICAgICBjYW52YXNSYWRpYWwud2lkdGggPSBjYW52YXNSYWRpYWwuaGVpZ2h0ID0gZGk7XG5cbiAgICAgICAgICBncmFkID0gY3R4UmFkaWFsLmNyZWF0ZVJhZGlhbEdyYWRpZW50KGdyYWRpZW50LnJ4LCBncmFkaWVudC5yeSwgMCwgZ3JhZGllbnQucngsIGdyYWRpZW50LnJ5LCByaSk7XG4gICAgICAgICAgZ3JhZGllbnQuY29sb3JTdG9wcy5mb3JFYWNoKGFkZFNjcm9sbFN0b3BzKGdyYWQpKTtcblxuICAgICAgICAgIGN0eFJhZGlhbC5maWxsU3R5bGUgPSBncmFkO1xuICAgICAgICAgIGN0eFJhZGlhbC5maWxsUmVjdCgwLCAwLCBkaSwgZGkpO1xuXG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWRpZW50LmNvbG9yU3RvcHNbZ3JhZGllbnQuY29sb3JTdG9wcy5sZW5ndGggLSAxXS5jb2xvcjtcbiAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICAgICAgICBjdHguZHJhd0ltYWdlKGNhbnZhc1JhZGlhbCwgZ3JhZGllbnQuY3ggLSBncmFkaWVudC5yeCwgZ3JhZGllbnQuY3kgLSBncmFkaWVudC5yeSwgMiAqIGdyYWRpZW50LnJ4LCAyICogZ3JhZGllbnQucnkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYW52YXM7XG4gIH07XG5cbiAgR2VuZXJhdGUuTGlzdEFscGhhID0gZnVuY3Rpb24obnVtYmVyKSB7XG4gICAgdmFyIHRtcCA9IFwiXCIsXG4gICAgbW9kdWx1cztcblxuICAgIGRvIHtcbiAgICAgIG1vZHVsdXMgPSBudW1iZXIgJSAyNjtcbiAgICAgIHRtcCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoKG1vZHVsdXMpICsgNjQpICsgdG1wO1xuICAgICAgbnVtYmVyID0gbnVtYmVyIC8gMjY7XG4gICAgfXdoaWxlKChudW1iZXIqMjYpID4gMjYpO1xuXG4gICAgcmV0dXJuIHRtcDtcbiAgfTtcblxuICBHZW5lcmF0ZS5MaXN0Um9tYW4gPSBmdW5jdGlvbihudW1iZXIpIHtcbiAgICB2YXIgcm9tYW5BcnJheSA9IFtcIk1cIiwgXCJDTVwiLCBcIkRcIiwgXCJDRFwiLCBcIkNcIiwgXCJYQ1wiLCBcIkxcIiwgXCJYTFwiLCBcIlhcIiwgXCJJWFwiLCBcIlZcIiwgXCJJVlwiLCBcIklcIl0sXG4gICAgZGVjaW1hbCA9IFsxMDAwLCA5MDAsIDUwMCwgNDAwLCAxMDAsIDkwLCA1MCwgNDAsIDEwLCA5LCA1LCA0LCAxXSxcbiAgICByb21hbiA9IFwiXCIsXG4gICAgdixcbiAgICBsZW4gPSByb21hbkFycmF5Lmxlbmd0aDtcblxuICAgIGlmIChudW1iZXIgPD0gMCB8fCBudW1iZXIgPj0gNDAwMCkge1xuICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9XG5cbiAgICBmb3IgKHY9MDsgdiA8IGxlbjsgdis9MSkge1xuICAgICAgd2hpbGUgKG51bWJlciA+PSBkZWNpbWFsW3ZdKSB7XG4gICAgICAgIG51bWJlciAtPSBkZWNpbWFsW3ZdO1xuICAgICAgICByb21hbiArPSByb21hbkFycmF5W3ZdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByb21hbjtcbiAgfTtcbn0pKCk7XG5mdW5jdGlvbiBoMmNSZW5kZXJDb250ZXh0KHdpZHRoLCBoZWlnaHQpIHtcbiAgdmFyIHN0b3JhZ2UgPSBbXTtcbiAgcmV0dXJuIHtcbiAgICBzdG9yYWdlOiBzdG9yYWdlLFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodCxcbiAgICBjbGlwOiBmdW5jdGlvbigpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJjbGlwXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgdHJhbnNsYXRlOiBmdW5jdGlvbigpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJ0cmFuc2xhdGVcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBmaWxsOiBmdW5jdGlvbigpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJmaWxsXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2F2ZTogZnVuY3Rpb24oKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwic2F2ZVwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHJlc3RvcmU6IGZ1bmN0aW9uKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcInJlc3RvcmVcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBmaWxsUmVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImZpbGxSZWN0XCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgY3JlYXRlUGF0dGVybjogZnVuY3Rpb24oKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwiY3JlYXRlUGF0dGVyblwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGRyYXdTaGFwZTogZnVuY3Rpb24oKSB7XG5cbiAgICAgIHZhciBzaGFwZSA9IFtdO1xuXG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwiZHJhd1NoYXBlXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBzaGFwZVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vdmVUbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcGUucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcIm1vdmVUb1wiLFxuICAgICAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBsaW5lVG86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXBlLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJsaW5lVG9cIixcbiAgICAgICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYXJjVG86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXBlLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJhcmNUb1wiLFxuICAgICAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBiZXppZXJDdXJ2ZVRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzaGFwZS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwiYmV6aWVyQ3VydmVUb1wiLFxuICAgICAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBxdWFkcmF0aWNDdXJ2ZVRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzaGFwZS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwicXVhZHJhdGljQ3VydmVUb1wiLFxuICAgICAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgfSxcbiAgICBkcmF3SW1hZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJkcmF3SW1hZ2VcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBmaWxsVGV4dDogZnVuY3Rpb24gKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImZpbGxUZXh0XCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgc2V0VmFyaWFibGU6IGZ1bmN0aW9uICh2YXJpYWJsZSwgdmFsdWUpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwidmFyaWFibGVcIixcbiAgICAgICAgbmFtZTogdmFyaWFibGUsXG4gICAgICAgICdhcmd1bWVudHMnOiB2YWx1ZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICB9O1xufVxuX2h0bWwyY2FudmFzLlBhcnNlID0gZnVuY3Rpb24gKGltYWdlcywgb3B0aW9ucykge1xuICB3aW5kb3cuc2Nyb2xsKDAsMCk7XG5cbiAgdmFyIGVsZW1lbnQgPSAoKCBvcHRpb25zLmVsZW1lbnRzID09PSB1bmRlZmluZWQgKSA/IGRvY3VtZW50LmJvZHkgOiBvcHRpb25zLmVsZW1lbnRzWzBdKSwgLy8gc2VsZWN0IGJvZHkgYnkgZGVmYXVsdFxuICBudW1EcmF3cyA9IDAsXG4gIGRvYyA9IGVsZW1lbnQub3duZXJEb2N1bWVudCxcbiAgVXRpbCA9IF9odG1sMmNhbnZhcy5VdGlsLFxuICBzdXBwb3J0ID0gVXRpbC5TdXBwb3J0KG9wdGlvbnMsIGRvYyksXG4gIGlnbm9yZUVsZW1lbnRzUmVnRXhwID0gbmV3IFJlZ0V4cChcIihcIiArIG9wdGlvbnMuaWdub3JlRWxlbWVudHMgKyBcIilcIiksXG4gIGJvZHkgPSBkb2MuYm9keSxcbiAgZ2V0Q1NTID0gVXRpbC5nZXRDU1MsXG4gIHBzZXVkb0hpZGUgPSBcIl9fX2h0bWwyY2FudmFzX19fcHNldWRvZWxlbWVudFwiLFxuICBoaWRlUHNldWRvRWxlbWVudHMgPSBkb2MuY3JlYXRlRWxlbWVudCgnc3R5bGUnKTtcblxuICBoaWRlUHNldWRvRWxlbWVudHMuaW5uZXJIVE1MID0gJy4nICsgcHNldWRvSGlkZSArICctYmVmb3JlOmJlZm9yZSB7IGNvbnRlbnQ6IFwiXCIgIWltcG9ydGFudDsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9JyArXG4gICcuJyArIHBzZXVkb0hpZGUgKyAnLWFmdGVyOmFmdGVyIHsgY29udGVudDogXCJcIiAhaW1wb3J0YW50OyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0nO1xuXG4gIGJvZHkuYXBwZW5kQ2hpbGQoaGlkZVBzZXVkb0VsZW1lbnRzKTtcblxuICBpbWFnZXMgPSBpbWFnZXMgfHwge307XG5cbiAgZnVuY3Rpb24gZG9jdW1lbnRXaWR0aCAoKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgTWF0aC5tYXgoZG9jLmJvZHkuc2Nyb2xsV2lkdGgsIGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsV2lkdGgpLFxuICAgICAgTWF0aC5tYXgoZG9jLmJvZHkub2Zmc2V0V2lkdGgsIGRvYy5kb2N1bWVudEVsZW1lbnQub2Zmc2V0V2lkdGgpLFxuICAgICAgTWF0aC5tYXgoZG9jLmJvZHkuY2xpZW50V2lkdGgsIGRvYy5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgpXG4gICAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gZG9jdW1lbnRIZWlnaHQgKCkge1xuICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgIE1hdGgubWF4KGRvYy5ib2R5LnNjcm9sbEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQpLFxuICAgICAgTWF0aC5tYXgoZG9jLmJvZHkub2Zmc2V0SGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCksXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5jbGllbnRIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0KVxuICAgICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENTU0ludChlbGVtZW50LCBhdHRyaWJ1dGUpIHtcbiAgICB2YXIgdmFsID0gcGFyc2VJbnQoZ2V0Q1NTKGVsZW1lbnQsIGF0dHJpYnV0ZSksIDEwKTtcbiAgICByZXR1cm4gKGlzTmFOKHZhbCkpID8gMCA6IHZhbDsgLy8gYm9yZGVycyBpbiBvbGQgSUUgYXJlIHRocm93aW5nICdtZWRpdW0nIGZvciBkZW1vLmh0bWxcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclJlY3QgKGN0eCwgeCwgeSwgdywgaCwgYmdjb2xvcikge1xuICAgIGlmIChiZ2NvbG9yICE9PSBcInRyYW5zcGFyZW50XCIpe1xuICAgICAgY3R4LnNldFZhcmlhYmxlKFwiZmlsbFN0eWxlXCIsIGJnY29sb3IpO1xuICAgICAgY3R4LmZpbGxSZWN0KHgsIHksIHcsIGgpO1xuICAgICAgbnVtRHJhd3MrPTE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2FwaXRhbGl6ZShtLCBwMSwgcDIpIHtcbiAgICBpZiAobS5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gcDEgKyBwMi50b1VwcGVyQ2FzZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRleHRUcmFuc2Zvcm0gKHRleHQsIHRyYW5zZm9ybSkge1xuICAgIHN3aXRjaCh0cmFuc2Zvcm0pe1xuICAgICAgY2FzZSBcImxvd2VyY2FzZVwiOlxuICAgICAgICByZXR1cm4gdGV4dC50b0xvd2VyQ2FzZSgpO1xuICAgICAgY2FzZSBcImNhcGl0YWxpemVcIjpcbiAgICAgICAgcmV0dXJuIHRleHQucmVwbGFjZSggLyhefFxcc3w6fC18XFwofFxcKSkoW2Etel0pL2csIGNhcGl0YWxpemUpO1xuICAgICAgY2FzZSBcInVwcGVyY2FzZVwiOlxuICAgICAgICByZXR1cm4gdGV4dC50b1VwcGVyQ2FzZSgpO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbm9MZXR0ZXJTcGFjaW5nKGxldHRlcl9zcGFjaW5nKSB7XG4gICAgcmV0dXJuICgvXihub3JtYWx8bm9uZXwwcHgpJC8udGVzdChsZXR0ZXJfc3BhY2luZykpO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd1RleHQoY3VycmVudFRleHQsIHgsIHksIGN0eCl7XG4gICAgaWYgKGN1cnJlbnRUZXh0ICE9PSBudWxsICYmIFV0aWwudHJpbVRleHQoY3VycmVudFRleHQpLmxlbmd0aCA+IDApIHtcbiAgICAgIGN0eC5maWxsVGV4dChjdXJyZW50VGV4dCwgeCwgeSk7XG4gICAgICBudW1EcmF3cys9MTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRUZXh0VmFyaWFibGVzKGN0eCwgZWwsIHRleHRfZGVjb3JhdGlvbiwgY29sb3IpIHtcbiAgICB2YXIgYWxpZ24gPSBmYWxzZSxcbiAgICBib2xkID0gZ2V0Q1NTKGVsLCBcImZvbnRXZWlnaHRcIiksXG4gICAgZmFtaWx5ID0gZ2V0Q1NTKGVsLCBcImZvbnRGYW1pbHlcIiksXG4gICAgc2l6ZSA9IGdldENTUyhlbCwgXCJmb250U2l6ZVwiKSxcbiAgICBzaGFkb3dzID0gVXRpbC5wYXJzZVRleHRTaGFkb3dzKGdldENTUyhlbCwgXCJ0ZXh0U2hhZG93XCIpKTtcblxuICAgIHN3aXRjaChwYXJzZUludChib2xkLCAxMCkpe1xuICAgICAgY2FzZSA0MDE6XG4gICAgICAgIGJvbGQgPSBcImJvbGRcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDQwMDpcbiAgICAgICAgYm9sZCA9IFwibm9ybWFsXCI7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGN0eC5zZXRWYXJpYWJsZShcImZpbGxTdHlsZVwiLCBjb2xvcik7XG4gICAgY3R4LnNldFZhcmlhYmxlKFwiZm9udFwiLCBbZ2V0Q1NTKGVsLCBcImZvbnRTdHlsZVwiKSwgZ2V0Q1NTKGVsLCBcImZvbnRWYXJpYW50XCIpLCBib2xkLCBzaXplLCBmYW1pbHldLmpvaW4oXCIgXCIpKTtcbiAgICBjdHguc2V0VmFyaWFibGUoXCJ0ZXh0QWxpZ25cIiwgKGFsaWduKSA/IFwicmlnaHRcIiA6IFwibGVmdFwiKTtcblxuICAgIGlmIChzaGFkb3dzLmxlbmd0aCkge1xuICAgICAgLy8gVE9ETzogc3VwcG9ydCBtdWx0aXBsZSB0ZXh0IHNoYWRvd3NcbiAgICAgIC8vIGFwcGx5IHRoZSBmaXJzdCB0ZXh0IHNoYWRvd1xuICAgICAgY3R4LnNldFZhcmlhYmxlKFwic2hhZG93Q29sb3JcIiwgc2hhZG93c1swXS5jb2xvcik7XG4gICAgICBjdHguc2V0VmFyaWFibGUoXCJzaGFkb3dPZmZzZXRYXCIsIHNoYWRvd3NbMF0ub2Zmc2V0WCk7XG4gICAgICBjdHguc2V0VmFyaWFibGUoXCJzaGFkb3dPZmZzZXRZXCIsIHNoYWRvd3NbMF0ub2Zmc2V0WSk7XG4gICAgICBjdHguc2V0VmFyaWFibGUoXCJzaGFkb3dCbHVyXCIsIHNoYWRvd3NbMF0uYmx1cik7XG4gICAgfVxuXG4gICAgaWYgKHRleHRfZGVjb3JhdGlvbiAhPT0gXCJub25lXCIpe1xuICAgICAgcmV0dXJuIFV0aWwuRm9udChmYW1pbHksIHNpemUsIGRvYyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyVGV4dERlY29yYXRpb24oY3R4LCB0ZXh0X2RlY29yYXRpb24sIGJvdW5kcywgbWV0cmljcywgY29sb3IpIHtcbiAgICBzd2l0Y2godGV4dF9kZWNvcmF0aW9uKSB7XG4gICAgICBjYXNlIFwidW5kZXJsaW5lXCI6XG4gICAgICAgIC8vIERyYXdzIGEgbGluZSBhdCB0aGUgYmFzZWxpbmUgb2YgdGhlIGZvbnRcbiAgICAgICAgLy8gVE9ETyBBcyBzb21lIGJyb3dzZXJzIGRpc3BsYXkgdGhlIGxpbmUgYXMgbW9yZSB0aGFuIDFweCBpZiB0aGUgZm9udC1zaXplIGlzIGJpZywgbmVlZCB0byB0YWtlIHRoYXQgaW50byBhY2NvdW50IGJvdGggaW4gcG9zaXRpb24gYW5kIHNpemVcbiAgICAgICAgcmVuZGVyUmVjdChjdHgsIGJvdW5kcy5sZWZ0LCBNYXRoLnJvdW5kKGJvdW5kcy50b3AgKyBtZXRyaWNzLmJhc2VsaW5lICsgbWV0cmljcy5saW5lV2lkdGgpLCBib3VuZHMud2lkdGgsIDEsIGNvbG9yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwib3ZlcmxpbmVcIjpcbiAgICAgICAgcmVuZGVyUmVjdChjdHgsIGJvdW5kcy5sZWZ0LCBNYXRoLnJvdW5kKGJvdW5kcy50b3ApLCBib3VuZHMud2lkdGgsIDEsIGNvbG9yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibGluZS10aHJvdWdoXCI6XG4gICAgICAgIC8vIFRPRE8gdHJ5IGFuZCBmaW5kIGV4YWN0IHBvc2l0aW9uIGZvciBsaW5lLXRocm91Z2hcbiAgICAgICAgcmVuZGVyUmVjdChjdHgsIGJvdW5kcy5sZWZ0LCBNYXRoLmNlaWwoYm91bmRzLnRvcCArIG1ldHJpY3MubWlkZGxlICsgbWV0cmljcy5saW5lV2lkdGgpLCBib3VuZHMud2lkdGgsIDEsIGNvbG9yKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VGV4dEJvdW5kcyhzdGF0ZSwgdGV4dCwgdGV4dERlY29yYXRpb24sIGlzTGFzdCwgdHJhbnNmb3JtKSB7XG4gICAgdmFyIGJvdW5kcztcbiAgICBpZiAoc3VwcG9ydC5yYW5nZUJvdW5kcyAmJiAhdHJhbnNmb3JtKSB7XG4gICAgICBpZiAodGV4dERlY29yYXRpb24gIT09IFwibm9uZVwiIHx8IFV0aWwudHJpbVRleHQodGV4dCkubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgIGJvdW5kcyA9IHRleHRSYW5nZUJvdW5kcyh0ZXh0LCBzdGF0ZS5ub2RlLCBzdGF0ZS50ZXh0T2Zmc2V0KTtcbiAgICAgIH1cbiAgICAgIHN0YXRlLnRleHRPZmZzZXQgKz0gdGV4dC5sZW5ndGg7XG4gICAgfSBlbHNlIGlmIChzdGF0ZS5ub2RlICYmIHR5cGVvZiBzdGF0ZS5ub2RlLm5vZGVWYWx1ZSA9PT0gXCJzdHJpbmdcIiApe1xuICAgICAgdmFyIG5ld1RleHROb2RlID0gKGlzTGFzdCkgPyBzdGF0ZS5ub2RlLnNwbGl0VGV4dCh0ZXh0Lmxlbmd0aCkgOiBudWxsO1xuICAgICAgYm91bmRzID0gdGV4dFdyYXBwZXJCb3VuZHMoc3RhdGUubm9kZSwgdHJhbnNmb3JtKTtcbiAgICAgIHN0YXRlLm5vZGUgPSBuZXdUZXh0Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHRleHRSYW5nZUJvdW5kcyh0ZXh0LCB0ZXh0Tm9kZSwgdGV4dE9mZnNldCkge1xuICAgIHZhciByYW5nZSA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgIHJhbmdlLnNldFN0YXJ0KHRleHROb2RlLCB0ZXh0T2Zmc2V0KTtcbiAgICByYW5nZS5zZXRFbmQodGV4dE5vZGUsIHRleHRPZmZzZXQgKyB0ZXh0Lmxlbmd0aCk7XG4gICAgcmV0dXJuIHJhbmdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGV4dFdyYXBwZXJCb3VuZHMob2xkVGV4dE5vZGUsIHRyYW5zZm9ybSkge1xuICAgIHZhciBwYXJlbnQgPSBvbGRUZXh0Tm9kZS5wYXJlbnROb2RlLFxuICAgIHdyYXBFbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3dyYXBwZXInKSxcbiAgICBiYWNrdXBUZXh0ID0gb2xkVGV4dE5vZGUuY2xvbmVOb2RlKHRydWUpO1xuXG4gICAgd3JhcEVsZW1lbnQuYXBwZW5kQ2hpbGQob2xkVGV4dE5vZGUuY2xvbmVOb2RlKHRydWUpKTtcbiAgICBwYXJlbnQucmVwbGFjZUNoaWxkKHdyYXBFbGVtZW50LCBvbGRUZXh0Tm9kZSk7XG5cbiAgICB2YXIgYm91bmRzID0gdHJhbnNmb3JtID8gVXRpbC5PZmZzZXRCb3VuZHMod3JhcEVsZW1lbnQpIDogVXRpbC5Cb3VuZHMod3JhcEVsZW1lbnQpO1xuICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQoYmFja3VwVGV4dCwgd3JhcEVsZW1lbnQpO1xuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJUZXh0KGVsLCB0ZXh0Tm9kZSwgc3RhY2spIHtcbiAgICB2YXIgY3R4ID0gc3RhY2suY3R4LFxuICAgIGNvbG9yID0gZ2V0Q1NTKGVsLCBcImNvbG9yXCIpLFxuICAgIHRleHREZWNvcmF0aW9uID0gZ2V0Q1NTKGVsLCBcInRleHREZWNvcmF0aW9uXCIpLFxuICAgIHRleHRBbGlnbiA9IGdldENTUyhlbCwgXCJ0ZXh0QWxpZ25cIiksXG4gICAgbWV0cmljcyxcbiAgICB0ZXh0TGlzdCxcbiAgICBzdGF0ZSA9IHtcbiAgICAgIG5vZGU6IHRleHROb2RlLFxuICAgICAgdGV4dE9mZnNldDogMFxuICAgIH07XG5cbiAgICBpZiAoVXRpbC50cmltVGV4dCh0ZXh0Tm9kZS5ub2RlVmFsdWUpLmxlbmd0aCA+IDApIHtcbiAgICAgIHRleHROb2RlLm5vZGVWYWx1ZSA9IHRleHRUcmFuc2Zvcm0odGV4dE5vZGUubm9kZVZhbHVlLCBnZXRDU1MoZWwsIFwidGV4dFRyYW5zZm9ybVwiKSk7XG4gICAgICB0ZXh0QWxpZ24gPSB0ZXh0QWxpZ24ucmVwbGFjZShbXCItd2Via2l0LWF1dG9cIl0sW1wiYXV0b1wiXSk7XG5cbiAgICAgIHRleHRMaXN0ID0gKCFvcHRpb25zLmxldHRlclJlbmRlcmluZyAmJiAvXihsZWZ0fHJpZ2h0fGp1c3RpZnl8YXV0bykkLy50ZXN0KHRleHRBbGlnbikgJiYgbm9MZXR0ZXJTcGFjaW5nKGdldENTUyhlbCwgXCJsZXR0ZXJTcGFjaW5nXCIpKSkgP1xuICAgICAgdGV4dE5vZGUubm9kZVZhbHVlLnNwbGl0KC8oXFxifCApLylcbiAgICAgIDogdGV4dE5vZGUubm9kZVZhbHVlLnNwbGl0KFwiXCIpO1xuXG4gICAgICBtZXRyaWNzID0gc2V0VGV4dFZhcmlhYmxlcyhjdHgsIGVsLCB0ZXh0RGVjb3JhdGlvbiwgY29sb3IpO1xuXG4gICAgICBpZiAob3B0aW9ucy5jaGluZXNlKSB7XG4gICAgICAgIHRleHRMaXN0LmZvckVhY2goZnVuY3Rpb24od29yZCwgaW5kZXgpIHtcbiAgICAgICAgICBpZiAoLy4qW1xcdTRFMDAtXFx1OUZBNV0uKiQvLnRlc3Qod29yZCkpIHtcbiAgICAgICAgICAgIHdvcmQgPSB3b3JkLnNwbGl0KFwiXCIpO1xuICAgICAgICAgICAgd29yZC51bnNoaWZ0KGluZGV4LCAxKTtcbiAgICAgICAgICAgIHRleHRMaXN0LnNwbGljZS5hcHBseSh0ZXh0TGlzdCwgd29yZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGV4dExpc3QuZm9yRWFjaChmdW5jdGlvbih0ZXh0LCBpbmRleCkge1xuICAgICAgICB2YXIgYm91bmRzID0gZ2V0VGV4dEJvdW5kcyhzdGF0ZSwgdGV4dCwgdGV4dERlY29yYXRpb24sIChpbmRleCA8IHRleHRMaXN0Lmxlbmd0aCAtIDEpLCBzdGFjay50cmFuc2Zvcm0ubWF0cml4KTtcbiAgICAgICAgaWYgKGJvdW5kcykge1xuICAgICAgICAgIGRyYXdUZXh0KHRleHQsIGJvdW5kcy5sZWZ0LCBib3VuZHMuYm90dG9tLCBjdHgpO1xuICAgICAgICAgIHJlbmRlclRleHREZWNvcmF0aW9uKGN0eCwgdGV4dERlY29yYXRpb24sIGJvdW5kcywgbWV0cmljcywgY29sb3IpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0UG9zaXRpb24gKGVsZW1lbnQsIHZhbCkge1xuICAgIHZhciBib3VuZEVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCggXCJib3VuZGVsZW1lbnRcIiApLFxuICAgIG9yaWdpbmFsVHlwZSxcbiAgICBib3VuZHM7XG5cbiAgICBib3VuZEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiaW5saW5lXCI7XG5cbiAgICBvcmlnaW5hbFR5cGUgPSBlbGVtZW50LnN0eWxlLmxpc3RTdHlsZVR5cGU7XG4gICAgZWxlbWVudC5zdHlsZS5saXN0U3R5bGVUeXBlID0gXCJub25lXCI7XG5cbiAgICBib3VuZEVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKHZhbCkpO1xuXG4gICAgZWxlbWVudC5pbnNlcnRCZWZvcmUoYm91bmRFbGVtZW50LCBlbGVtZW50LmZpcnN0Q2hpbGQpO1xuXG4gICAgYm91bmRzID0gVXRpbC5Cb3VuZHMoYm91bmRFbGVtZW50KTtcbiAgICBlbGVtZW50LnJlbW92ZUNoaWxkKGJvdW5kRWxlbWVudCk7XG4gICAgZWxlbWVudC5zdHlsZS5saXN0U3R5bGVUeXBlID0gb3JpZ2luYWxUeXBlO1xuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBmdW5jdGlvbiBlbGVtZW50SW5kZXgoZWwpIHtcbiAgICB2YXIgaSA9IC0xLFxuICAgIGNvdW50ID0gMSxcbiAgICBjaGlsZHMgPSBlbC5wYXJlbnROb2RlLmNoaWxkTm9kZXM7XG5cbiAgICBpZiAoZWwucGFyZW50Tm9kZSkge1xuICAgICAgd2hpbGUoY2hpbGRzWysraV0gIT09IGVsKSB7XG4gICAgICAgIGlmIChjaGlsZHNbaV0ubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gY291bnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsaXN0SXRlbVRleHQoZWxlbWVudCwgdHlwZSkge1xuICAgIHZhciBjdXJyZW50SW5kZXggPSBlbGVtZW50SW5kZXgoZWxlbWVudCksIHRleHQ7XG4gICAgc3dpdGNoKHR5cGUpe1xuICAgICAgY2FzZSBcImRlY2ltYWxcIjpcbiAgICAgICAgdGV4dCA9IGN1cnJlbnRJbmRleDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZGVjaW1hbC1sZWFkaW5nLXplcm9cIjpcbiAgICAgICAgdGV4dCA9IChjdXJyZW50SW5kZXgudG9TdHJpbmcoKS5sZW5ndGggPT09IDEpID8gY3VycmVudEluZGV4ID0gXCIwXCIgKyBjdXJyZW50SW5kZXgudG9TdHJpbmcoKSA6IGN1cnJlbnRJbmRleC50b1N0cmluZygpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cHBlci1yb21hblwiOlxuICAgICAgICB0ZXh0ID0gX2h0bWwyY2FudmFzLkdlbmVyYXRlLkxpc3RSb21hbiggY3VycmVudEluZGV4ICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxvd2VyLXJvbWFuXCI6XG4gICAgICAgIHRleHQgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUuTGlzdFJvbWFuKCBjdXJyZW50SW5kZXggKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsb3dlci1hbHBoYVwiOlxuICAgICAgICB0ZXh0ID0gX2h0bWwyY2FudmFzLkdlbmVyYXRlLkxpc3RBbHBoYSggY3VycmVudEluZGV4ICkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidXBwZXItYWxwaGFcIjpcbiAgICAgICAgdGV4dCA9IF9odG1sMmNhbnZhcy5HZW5lcmF0ZS5MaXN0QWxwaGEoIGN1cnJlbnRJbmRleCApO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dCArIFwiLiBcIjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckxpc3RJdGVtKGVsZW1lbnQsIHN0YWNrLCBlbEJvdW5kcykge1xuICAgIHZhciB4LFxuICAgIHRleHQsXG4gICAgY3R4ID0gc3RhY2suY3R4LFxuICAgIHR5cGUgPSBnZXRDU1MoZWxlbWVudCwgXCJsaXN0U3R5bGVUeXBlXCIpLFxuICAgIGxpc3RCb3VuZHM7XG5cbiAgICBpZiAoL14oZGVjaW1hbHxkZWNpbWFsLWxlYWRpbmctemVyb3x1cHBlci1hbHBoYXx1cHBlci1sYXRpbnx1cHBlci1yb21hbnxsb3dlci1hbHBoYXxsb3dlci1ncmVla3xsb3dlci1sYXRpbnxsb3dlci1yb21hbikkL2kudGVzdCh0eXBlKSkge1xuICAgICAgdGV4dCA9IGxpc3RJdGVtVGV4dChlbGVtZW50LCB0eXBlKTtcbiAgICAgIGxpc3RCb3VuZHMgPSBsaXN0UG9zaXRpb24oZWxlbWVudCwgdGV4dCk7XG4gICAgICBzZXRUZXh0VmFyaWFibGVzKGN0eCwgZWxlbWVudCwgXCJub25lXCIsIGdldENTUyhlbGVtZW50LCBcImNvbG9yXCIpKTtcblxuICAgICAgaWYgKGdldENTUyhlbGVtZW50LCBcImxpc3RTdHlsZVBvc2l0aW9uXCIpID09PSBcImluc2lkZVwiKSB7XG4gICAgICAgIGN0eC5zZXRWYXJpYWJsZShcInRleHRBbGlnblwiLCBcImxlZnRcIik7XG4gICAgICAgIHggPSBlbEJvdW5kcy5sZWZ0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBkcmF3VGV4dCh0ZXh0LCB4LCBsaXN0Qm91bmRzLmJvdHRvbSwgY3R4KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkSW1hZ2UgKHNyYyl7XG4gICAgdmFyIGltZyA9IGltYWdlc1tzcmNdO1xuICAgIHJldHVybiAoaW1nICYmIGltZy5zdWNjZWVkZWQgPT09IHRydWUpID8gaW1nLmltZyA6IGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xpcEJvdW5kcyhzcmMsIGRzdCl7XG4gICAgdmFyIHggPSBNYXRoLm1heChzcmMubGVmdCwgZHN0LmxlZnQpLFxuICAgIHkgPSBNYXRoLm1heChzcmMudG9wLCBkc3QudG9wKSxcbiAgICB4MiA9IE1hdGgubWluKChzcmMubGVmdCArIHNyYy53aWR0aCksIChkc3QubGVmdCArIGRzdC53aWR0aCkpLFxuICAgIHkyID0gTWF0aC5taW4oKHNyYy50b3AgKyBzcmMuaGVpZ2h0KSwgKGRzdC50b3AgKyBkc3QuaGVpZ2h0KSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDp4LFxuICAgICAgdG9wOnksXG4gICAgICB3aWR0aDp4Mi14LFxuICAgICAgaGVpZ2h0OnkyLXlcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0WihlbGVtZW50LCBzdGFjaywgcGFyZW50U3RhY2spe1xuICAgIHZhciBuZXdDb250ZXh0LFxuICAgIGlzUG9zaXRpb25lZCA9IHN0YWNrLmNzc1Bvc2l0aW9uICE9PSAnc3RhdGljJyxcbiAgICB6SW5kZXggPSBpc1Bvc2l0aW9uZWQgPyBnZXRDU1MoZWxlbWVudCwgJ3pJbmRleCcpIDogJ2F1dG8nLFxuICAgIG9wYWNpdHkgPSBnZXRDU1MoZWxlbWVudCwgJ29wYWNpdHknKSxcbiAgICBpc0Zsb2F0ZWQgPSBnZXRDU1MoZWxlbWVudCwgJ2Nzc0Zsb2F0JykgIT09ICdub25lJztcblxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0d1aWRlL0NTUy9VbmRlcnN0YW5kaW5nX3pfaW5kZXgvVGhlX3N0YWNraW5nX2NvbnRleHRcbiAgICAvLyBXaGVuIGEgbmV3IHN0YWNraW5nIGNvbnRleHQgc2hvdWxkIGJlIGNyZWF0ZWQ6XG4gICAgLy8gdGhlIHJvb3QgZWxlbWVudCAoSFRNTCksXG4gICAgLy8gcG9zaXRpb25lZCAoYWJzb2x1dGVseSBvciByZWxhdGl2ZWx5KSB3aXRoIGEgei1pbmRleCB2YWx1ZSBvdGhlciB0aGFuIFwiYXV0b1wiLFxuICAgIC8vIGVsZW1lbnRzIHdpdGggYW4gb3BhY2l0eSB2YWx1ZSBsZXNzIHRoYW4gMS4gKFNlZSB0aGUgc3BlY2lmaWNhdGlvbiBmb3Igb3BhY2l0eSksXG4gICAgLy8gb24gbW9iaWxlIFdlYktpdCBhbmQgQ2hyb21lIDIyKywgcG9zaXRpb246IGZpeGVkIGFsd2F5cyBjcmVhdGVzIGEgbmV3IHN0YWNraW5nIGNvbnRleHQsIGV2ZW4gd2hlbiB6LWluZGV4IGlzIFwiYXV0b1wiIChTZWUgdGhpcyBwb3N0KVxuXG4gICAgc3RhY2suekluZGV4ID0gbmV3Q29udGV4dCA9IGgyY3pDb250ZXh0KHpJbmRleCk7XG4gICAgbmV3Q29udGV4dC5pc1Bvc2l0aW9uZWQgPSBpc1Bvc2l0aW9uZWQ7XG4gICAgbmV3Q29udGV4dC5pc0Zsb2F0ZWQgPSBpc0Zsb2F0ZWQ7XG4gICAgbmV3Q29udGV4dC5vcGFjaXR5ID0gb3BhY2l0eTtcbiAgICBuZXdDb250ZXh0Lm93blN0YWNraW5nID0gKHpJbmRleCAhPT0gJ2F1dG8nIHx8IG9wYWNpdHkgPCAxKTtcblxuICAgIGlmIChwYXJlbnRTdGFjaykge1xuICAgICAgcGFyZW50U3RhY2suekluZGV4LmNoaWxkcmVuLnB1c2goc3RhY2spO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckltYWdlKGN0eCwgZWxlbWVudCwgaW1hZ2UsIGJvdW5kcywgYm9yZGVycykge1xuXG4gICAgdmFyIHBhZGRpbmdMZWZ0ID0gZ2V0Q1NTSW50KGVsZW1lbnQsICdwYWRkaW5nTGVmdCcpLFxuICAgIHBhZGRpbmdUb3AgPSBnZXRDU1NJbnQoZWxlbWVudCwgJ3BhZGRpbmdUb3AnKSxcbiAgICBwYWRkaW5nUmlnaHQgPSBnZXRDU1NJbnQoZWxlbWVudCwgJ3BhZGRpbmdSaWdodCcpLFxuICAgIHBhZGRpbmdCb3R0b20gPSBnZXRDU1NJbnQoZWxlbWVudCwgJ3BhZGRpbmdCb3R0b20nKTtcblxuICAgIGRyYXdJbWFnZShcbiAgICAgIGN0eCxcbiAgICAgIGltYWdlLFxuICAgICAgMCwgLy9zeFxuICAgICAgMCwgLy9zeVxuICAgICAgaW1hZ2Uud2lkdGgsIC8vc3dcbiAgICAgIGltYWdlLmhlaWdodCwgLy9zaFxuICAgICAgYm91bmRzLmxlZnQgKyBwYWRkaW5nTGVmdCArIGJvcmRlcnNbM10ud2lkdGgsIC8vZHhcbiAgICAgIGJvdW5kcy50b3AgKyBwYWRkaW5nVG9wICsgYm9yZGVyc1swXS53aWR0aCwgLy8gZHlcbiAgICAgIGJvdW5kcy53aWR0aCAtIChib3JkZXJzWzFdLndpZHRoICsgYm9yZGVyc1szXS53aWR0aCArIHBhZGRpbmdMZWZ0ICsgcGFkZGluZ1JpZ2h0KSwgLy9kd1xuICAgICAgYm91bmRzLmhlaWdodCAtIChib3JkZXJzWzBdLndpZHRoICsgYm9yZGVyc1syXS53aWR0aCArIHBhZGRpbmdUb3AgKyBwYWRkaW5nQm90dG9tKSAvL2RoXG4gICAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm9yZGVyRGF0YShlbGVtZW50KSB7XG4gICAgcmV0dXJuIFtcIlRvcFwiLCBcIlJpZ2h0XCIsIFwiQm90dG9tXCIsIFwiTGVmdFwiXS5tYXAoZnVuY3Rpb24oc2lkZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGg6IGdldENTU0ludChlbGVtZW50LCAnYm9yZGVyJyArIHNpZGUgKyAnV2lkdGgnKSxcbiAgICAgICAgY29sb3I6IGdldENTUyhlbGVtZW50LCAnYm9yZGVyJyArIHNpZGUgKyAnQ29sb3InKVxuICAgICAgfTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvcmRlclJhZGl1c0RhdGEoZWxlbWVudCkge1xuICAgIHJldHVybiBbXCJUb3BMZWZ0XCIsIFwiVG9wUmlnaHRcIiwgXCJCb3R0b21SaWdodFwiLCBcIkJvdHRvbUxlZnRcIl0ubWFwKGZ1bmN0aW9uKHNpZGUpIHtcbiAgICAgIHJldHVybiBnZXRDU1MoZWxlbWVudCwgJ2JvcmRlcicgKyBzaWRlICsgJ1JhZGl1cycpO1xuICAgIH0pO1xuICB9XG5cbiAgdmFyIGdldEN1cnZlUG9pbnRzID0gKGZ1bmN0aW9uKGthcHBhKSB7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24oeCwgeSwgcjEsIHIyKSB7XG4gICAgICB2YXIgb3ggPSAocjEpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IGhvcml6b250YWxcbiAgICAgIG95ID0gKHIyKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCB2ZXJ0aWNhbFxuICAgICAgeG0gPSB4ICsgcjEsIC8vIHgtbWlkZGxlXG4gICAgICB5bSA9IHkgKyByMjsgLy8geS1taWRkbGVcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcExlZnQ6IGJlemllckN1cnZlKHtcbiAgICAgICAgICB4OngsXG4gICAgICAgICAgeTp5bVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4LFxuICAgICAgICAgIHk6eW0gLSBveVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4bSAtIG94LFxuICAgICAgICAgIHk6eVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4bSxcbiAgICAgICAgICB5OnlcbiAgICAgICAgfSksXG4gICAgICAgIHRvcFJpZ2h0OiBiZXppZXJDdXJ2ZSh7XG4gICAgICAgICAgeDp4LFxuICAgICAgICAgIHk6eVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4ICsgb3gsXG4gICAgICAgICAgeTp5XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtLFxuICAgICAgICAgIHk6eW0gLSBveVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4bSxcbiAgICAgICAgICB5OnltXG4gICAgICAgIH0pLFxuICAgICAgICBib3R0b21SaWdodDogYmV6aWVyQ3VydmUoe1xuICAgICAgICAgIHg6eG0sXG4gICAgICAgICAgeTp5XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtLFxuICAgICAgICAgIHk6eSArIG95XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnggKyBveCxcbiAgICAgICAgICB5OnltXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OngsXG4gICAgICAgICAgeTp5bVxuICAgICAgICB9KSxcbiAgICAgICAgYm90dG9tTGVmdDogYmV6aWVyQ3VydmUoe1xuICAgICAgICAgIHg6eG0sXG4gICAgICAgICAgeTp5bVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4bSAtIG94LFxuICAgICAgICAgIHk6eW1cbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eCxcbiAgICAgICAgICB5OnkgKyBveVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4LFxuICAgICAgICAgIHk6eVxuICAgICAgICB9KVxuICAgICAgfTtcbiAgICB9O1xuICB9KSg0ICogKChNYXRoLnNxcnQoMikgLSAxKSAvIDMpKTtcblxuICBmdW5jdGlvbiBiZXppZXJDdXJ2ZShzdGFydCwgc3RhcnRDb250cm9sLCBlbmRDb250cm9sLCBlbmQpIHtcblxuICAgIHZhciBsZXJwID0gZnVuY3Rpb24gKGEsIGIsIHQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6YS54ICsgKGIueCAtIGEueCkgKiB0LFxuICAgICAgICB5OmEueSArIChiLnkgLSBhLnkpICogdFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgIHN0YXJ0Q29udHJvbDogc3RhcnRDb250cm9sLFxuICAgICAgZW5kQ29udHJvbDogZW5kQ29udHJvbCxcbiAgICAgIGVuZDogZW5kLFxuICAgICAgc3ViZGl2aWRlOiBmdW5jdGlvbih0KSB7XG4gICAgICAgIHZhciBhYiA9IGxlcnAoc3RhcnQsIHN0YXJ0Q29udHJvbCwgdCksXG4gICAgICAgIGJjID0gbGVycChzdGFydENvbnRyb2wsIGVuZENvbnRyb2wsIHQpLFxuICAgICAgICBjZCA9IGxlcnAoZW5kQ29udHJvbCwgZW5kLCB0KSxcbiAgICAgICAgYWJiYyA9IGxlcnAoYWIsIGJjLCB0KSxcbiAgICAgICAgYmNjZCA9IGxlcnAoYmMsIGNkLCB0KSxcbiAgICAgICAgZGVzdCA9IGxlcnAoYWJiYywgYmNjZCwgdCk7XG4gICAgICAgIHJldHVybiBbYmV6aWVyQ3VydmUoc3RhcnQsIGFiLCBhYmJjLCBkZXN0KSwgYmV6aWVyQ3VydmUoZGVzdCwgYmNjZCwgY2QsIGVuZCldO1xuICAgICAgfSxcbiAgICAgIGN1cnZlVG86IGZ1bmN0aW9uKGJvcmRlckFyZ3MpIHtcbiAgICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImJlemllckN1cnZlXCIsIHN0YXJ0Q29udHJvbC54LCBzdGFydENvbnRyb2wueSwgZW5kQ29udHJvbC54LCBlbmRDb250cm9sLnksIGVuZC54LCBlbmQueV0pO1xuICAgICAgfSxcbiAgICAgIGN1cnZlVG9SZXZlcnNlZDogZnVuY3Rpb24oYm9yZGVyQXJncykge1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wiYmV6aWVyQ3VydmVcIiwgZW5kQ29udHJvbC54LCBlbmRDb250cm9sLnksIHN0YXJ0Q29udHJvbC54LCBzdGFydENvbnRyb2wueSwgc3RhcnQueCwgc3RhcnQueV0pO1xuICAgICAgfVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXMxLCByYWRpdXMyLCBjb3JuZXIxLCBjb3JuZXIyLCB4LCB5KSB7XG4gICAgaWYgKHJhZGl1czFbMF0gPiAwIHx8IHJhZGl1czFbMV0gPiAwKSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBjb3JuZXIxWzBdLnN0YXJ0LngsIGNvcm5lcjFbMF0uc3RhcnQueV0pO1xuICAgICAgY29ybmVyMVswXS5jdXJ2ZVRvKGJvcmRlckFyZ3MpO1xuICAgICAgY29ybmVyMVsxXS5jdXJ2ZVRvKGJvcmRlckFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCB4LCB5XSk7XG4gICAgfVxuXG4gICAgaWYgKHJhZGl1czJbMF0gPiAwIHx8IHJhZGl1czJbMV0gPiAwKSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBjb3JuZXIyWzBdLnN0YXJ0LngsIGNvcm5lcjJbMF0uc3RhcnQueV0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdTaWRlKGJvcmRlckRhdGEsIHJhZGl1czEsIHJhZGl1czIsIG91dGVyMSwgaW5uZXIxLCBvdXRlcjIsIGlubmVyMikge1xuICAgIHZhciBib3JkZXJBcmdzID0gW107XG5cbiAgICBpZiAocmFkaXVzMVswXSA+IDAgfHwgcmFkaXVzMVsxXSA+IDApIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIG91dGVyMVsxXS5zdGFydC54LCBvdXRlcjFbMV0uc3RhcnQueV0pO1xuICAgICAgb3V0ZXIxWzFdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbIFwibGluZVwiLCBib3JkZXJEYXRhLmMxWzBdLCBib3JkZXJEYXRhLmMxWzFdXSk7XG4gICAgfVxuXG4gICAgaWYgKHJhZGl1czJbMF0gPiAwIHx8IHJhZGl1czJbMV0gPiAwKSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBvdXRlcjJbMF0uc3RhcnQueCwgb3V0ZXIyWzBdLnN0YXJ0LnldKTtcbiAgICAgIG91dGVyMlswXS5jdXJ2ZVRvKGJvcmRlckFyZ3MpO1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgaW5uZXIyWzBdLmVuZC54LCBpbm5lcjJbMF0uZW5kLnldKTtcbiAgICAgIGlubmVyMlswXS5jdXJ2ZVRvUmV2ZXJzZWQoYm9yZGVyQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbIFwibGluZVwiLCBib3JkZXJEYXRhLmMyWzBdLCBib3JkZXJEYXRhLmMyWzFdXSk7XG4gICAgICBib3JkZXJBcmdzLnB1c2goWyBcImxpbmVcIiwgYm9yZGVyRGF0YS5jM1swXSwgYm9yZGVyRGF0YS5jM1sxXV0pO1xuICAgIH1cblxuICAgIGlmIChyYWRpdXMxWzBdID4gMCB8fCByYWRpdXMxWzFdID4gMCkge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgaW5uZXIxWzFdLmVuZC54LCBpbm5lcjFbMV0uZW5kLnldKTtcbiAgICAgIGlubmVyMVsxXS5jdXJ2ZVRvUmV2ZXJzZWQoYm9yZGVyQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbIFwibGluZVwiLCBib3JkZXJEYXRhLmM0WzBdLCBib3JkZXJEYXRhLmM0WzFdXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvcmRlckFyZ3M7XG4gIH1cblxuICBmdW5jdGlvbiBjYWxjdWxhdGVDdXJ2ZVBvaW50cyhib3VuZHMsIGJvcmRlclJhZGl1cywgYm9yZGVycykge1xuXG4gICAgdmFyIHggPSBib3VuZHMubGVmdCxcbiAgICB5ID0gYm91bmRzLnRvcCxcbiAgICB3aWR0aCA9IGJvdW5kcy53aWR0aCxcbiAgICBoZWlnaHQgPSBib3VuZHMuaGVpZ2h0LFxuXG4gICAgdGxoID0gYm9yZGVyUmFkaXVzWzBdWzBdLFxuICAgIHRsdiA9IGJvcmRlclJhZGl1c1swXVsxXSxcbiAgICB0cmggPSBib3JkZXJSYWRpdXNbMV1bMF0sXG4gICAgdHJ2ID0gYm9yZGVyUmFkaXVzWzFdWzFdLFxuICAgIGJyaCA9IGJvcmRlclJhZGl1c1syXVswXSxcbiAgICBicnYgPSBib3JkZXJSYWRpdXNbMl1bMV0sXG4gICAgYmxoID0gYm9yZGVyUmFkaXVzWzNdWzBdLFxuICAgIGJsdiA9IGJvcmRlclJhZGl1c1szXVsxXSxcblxuICAgIHRvcFdpZHRoID0gd2lkdGggLSB0cmgsXG4gICAgcmlnaHRIZWlnaHQgPSBoZWlnaHQgLSBicnYsXG4gICAgYm90dG9tV2lkdGggPSB3aWR0aCAtIGJyaCxcbiAgICBsZWZ0SGVpZ2h0ID0gaGVpZ2h0IC0gYmx2O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcExlZnRPdXRlcjogZ2V0Q3VydmVQb2ludHMoXG4gICAgICAgIHgsXG4gICAgICAgIHksXG4gICAgICAgIHRsaCxcbiAgICAgICAgdGx2XG4gICAgICAgICkudG9wTGVmdC5zdWJkaXZpZGUoMC41KSxcblxuICAgICAgdG9wTGVmdElubmVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCArIGJvcmRlcnNbM10ud2lkdGgsXG4gICAgICAgIHkgKyBib3JkZXJzWzBdLndpZHRoLFxuICAgICAgICBNYXRoLm1heCgwLCB0bGggLSBib3JkZXJzWzNdLndpZHRoKSxcbiAgICAgICAgTWF0aC5tYXgoMCwgdGx2IC0gYm9yZGVyc1swXS53aWR0aClcbiAgICAgICAgKS50b3BMZWZ0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICB0b3BSaWdodE91dGVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCArIHRvcFdpZHRoLFxuICAgICAgICB5LFxuICAgICAgICB0cmgsXG4gICAgICAgIHRydlxuICAgICAgICApLnRvcFJpZ2h0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICB0b3BSaWdodElubmVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCArIE1hdGgubWluKHRvcFdpZHRoLCB3aWR0aCArIGJvcmRlcnNbM10ud2lkdGgpLFxuICAgICAgICB5ICsgYm9yZGVyc1swXS53aWR0aCxcbiAgICAgICAgKHRvcFdpZHRoID4gd2lkdGggKyBib3JkZXJzWzNdLndpZHRoKSA/IDAgOnRyaCAtIGJvcmRlcnNbM10ud2lkdGgsXG4gICAgICAgIHRydiAtIGJvcmRlcnNbMF0ud2lkdGhcbiAgICAgICAgKS50b3BSaWdodC5zdWJkaXZpZGUoMC41KSxcblxuICAgICAgYm90dG9tUmlnaHRPdXRlcjogZ2V0Q3VydmVQb2ludHMoXG4gICAgICAgIHggKyBib3R0b21XaWR0aCxcbiAgICAgICAgeSArIHJpZ2h0SGVpZ2h0LFxuICAgICAgICBicmgsXG4gICAgICAgIGJydlxuICAgICAgICApLmJvdHRvbVJpZ2h0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICBib3R0b21SaWdodElubmVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCArIE1hdGgubWluKGJvdHRvbVdpZHRoLCB3aWR0aCArIGJvcmRlcnNbM10ud2lkdGgpLFxuICAgICAgICB5ICsgTWF0aC5taW4ocmlnaHRIZWlnaHQsIGhlaWdodCArIGJvcmRlcnNbMF0ud2lkdGgpLFxuICAgICAgICBNYXRoLm1heCgwLCBicmggLSBib3JkZXJzWzFdLndpZHRoKSxcbiAgICAgICAgTWF0aC5tYXgoMCwgYnJ2IC0gYm9yZGVyc1syXS53aWR0aClcbiAgICAgICAgKS5ib3R0b21SaWdodC5zdWJkaXZpZGUoMC41KSxcblxuICAgICAgYm90dG9tTGVmdE91dGVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCxcbiAgICAgICAgeSArIGxlZnRIZWlnaHQsXG4gICAgICAgIGJsaCxcbiAgICAgICAgYmx2XG4gICAgICAgICkuYm90dG9tTGVmdC5zdWJkaXZpZGUoMC41KSxcblxuICAgICAgYm90dG9tTGVmdElubmVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCArIGJvcmRlcnNbM10ud2lkdGgsXG4gICAgICAgIHkgKyBsZWZ0SGVpZ2h0LFxuICAgICAgICBNYXRoLm1heCgwLCBibGggLSBib3JkZXJzWzNdLndpZHRoKSxcbiAgICAgICAgTWF0aC5tYXgoMCwgYmx2IC0gYm9yZGVyc1syXS53aWR0aClcbiAgICAgICAgKS5ib3R0b21MZWZ0LnN1YmRpdmlkZSgwLjUpXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvcmRlckNsaXAoZWxlbWVudCwgYm9yZGVyUG9pbnRzLCBib3JkZXJzLCByYWRpdXMsIGJvdW5kcykge1xuICAgIHZhciBiYWNrZ3JvdW5kQ2xpcCA9IGdldENTUyhlbGVtZW50LCAnYmFja2dyb3VuZENsaXAnKSxcbiAgICBib3JkZXJBcmdzID0gW107XG5cbiAgICBzd2l0Y2goYmFja2dyb3VuZENsaXApIHtcbiAgICAgIGNhc2UgXCJjb250ZW50LWJveFwiOlxuICAgICAgY2FzZSBcInBhZGRpbmctYm94XCI6XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1swXSwgcmFkaXVzWzFdLCBib3JkZXJQb2ludHMudG9wTGVmdElubmVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRJbm5lciwgYm91bmRzLmxlZnQgKyBib3JkZXJzWzNdLndpZHRoLCBib3VuZHMudG9wICsgYm9yZGVyc1swXS53aWR0aCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1sxXSwgcmFkaXVzWzJdLCBib3JkZXJQb2ludHMudG9wUmlnaHRJbm5lciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0SW5uZXIsIGJvdW5kcy5sZWZ0ICsgYm91bmRzLndpZHRoIC0gYm9yZGVyc1sxXS53aWR0aCwgYm91bmRzLnRvcCArIGJvcmRlcnNbMF0ud2lkdGgpO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbMl0sIHJhZGl1c1szXSwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0SW5uZXIsIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0SW5uZXIsIGJvdW5kcy5sZWZ0ICsgYm91bmRzLndpZHRoIC0gYm9yZGVyc1sxXS53aWR0aCwgYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQgLSBib3JkZXJzWzJdLndpZHRoKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzNdLCByYWRpdXNbMF0sIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0SW5uZXIsIGJvcmRlclBvaW50cy50b3BMZWZ0SW5uZXIsIGJvdW5kcy5sZWZ0ICsgYm9yZGVyc1szXS53aWR0aCwgYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQgLSBib3JkZXJzWzJdLndpZHRoKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1swXSwgcmFkaXVzWzFdLCBib3JkZXJQb2ludHMudG9wTGVmdE91dGVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm91bmRzLmxlZnQsIGJvdW5kcy50b3ApO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbMV0sIHJhZGl1c1syXSwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodE91dGVyLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCwgYm91bmRzLnRvcCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1syXSwgcmFkaXVzWzNdLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRPdXRlciwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGgsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzNdLCByYWRpdXNbMF0sIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BMZWZ0T3V0ZXIsIGJvdW5kcy5sZWZ0LCBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBib3JkZXJBcmdzO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VCb3JkZXJzKGVsZW1lbnQsIGJvdW5kcywgYm9yZGVycyl7XG4gICAgdmFyIHggPSBib3VuZHMubGVmdCxcbiAgICB5ID0gYm91bmRzLnRvcCxcbiAgICB3aWR0aCA9IGJvdW5kcy53aWR0aCxcbiAgICBoZWlnaHQgPSBib3VuZHMuaGVpZ2h0LFxuICAgIGJvcmRlclNpZGUsXG4gICAgYngsXG4gICAgYnksXG4gICAgYncsXG4gICAgYmgsXG4gICAgYm9yZGVyQXJncyxcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLWJhY2tncm91bmQvI3RoZS1ib3JkZXItcmFkaXVzXG4gICAgYm9yZGVyUmFkaXVzID0gZ2V0Qm9yZGVyUmFkaXVzRGF0YShlbGVtZW50KSxcbiAgICBib3JkZXJQb2ludHMgPSBjYWxjdWxhdGVDdXJ2ZVBvaW50cyhib3VuZHMsIGJvcmRlclJhZGl1cywgYm9yZGVycyksXG4gICAgYm9yZGVyRGF0YSA9IHtcbiAgICAgIGNsaXA6IGdldEJvcmRlckNsaXAoZWxlbWVudCwgYm9yZGVyUG9pbnRzLCBib3JkZXJzLCBib3JkZXJSYWRpdXMsIGJvdW5kcyksXG4gICAgICBib3JkZXJzOiBbXVxuICAgIH07XG5cbiAgICBmb3IgKGJvcmRlclNpZGUgPSAwOyBib3JkZXJTaWRlIDwgNDsgYm9yZGVyU2lkZSsrKSB7XG5cbiAgICAgIGlmIChib3JkZXJzW2JvcmRlclNpZGVdLndpZHRoID4gMCkge1xuICAgICAgICBieCA9IHg7XG4gICAgICAgIGJ5ID0geTtcbiAgICAgICAgYncgPSB3aWR0aDtcbiAgICAgICAgYmggPSBoZWlnaHQgLSAoYm9yZGVyc1syXS53aWR0aCk7XG5cbiAgICAgICAgc3dpdGNoKGJvcmRlclNpZGUpIHtcbiAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAvLyB0b3AgYm9yZGVyXG4gICAgICAgICAgICBiaCA9IGJvcmRlcnNbMF0ud2lkdGg7XG5cbiAgICAgICAgICAgIGJvcmRlckFyZ3MgPSBkcmF3U2lkZSh7XG4gICAgICAgICAgICAgIGMxOiBbYngsIGJ5XSxcbiAgICAgICAgICAgICAgYzI6IFtieCArIGJ3LCBieV0sXG4gICAgICAgICAgICAgIGMzOiBbYnggKyBidyAtIGJvcmRlcnNbMV0ud2lkdGgsIGJ5ICsgYmhdLFxuICAgICAgICAgICAgICBjNDogW2J4ICsgYm9yZGVyc1szXS53aWR0aCwgYnkgKyBiaF1cbiAgICAgICAgICAgIH0sIGJvcmRlclJhZGl1c1swXSwgYm9yZGVyUmFkaXVzWzFdLFxuICAgICAgICAgICAgYm9yZGVyUG9pbnRzLnRvcExlZnRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcExlZnRJbm5lciwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BSaWdodElubmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIC8vIHJpZ2h0IGJvcmRlclxuICAgICAgICAgICAgYnggPSB4ICsgd2lkdGggLSAoYm9yZGVyc1sxXS53aWR0aCk7XG4gICAgICAgICAgICBidyA9IGJvcmRlcnNbMV0ud2lkdGg7XG5cbiAgICAgICAgICAgIGJvcmRlckFyZ3MgPSBkcmF3U2lkZSh7XG4gICAgICAgICAgICAgIGMxOiBbYnggKyBidywgYnldLFxuICAgICAgICAgICAgICBjMjogW2J4ICsgYncsIGJ5ICsgYmggKyBib3JkZXJzWzJdLndpZHRoXSxcbiAgICAgICAgICAgICAgYzM6IFtieCwgYnkgKyBiaF0sXG4gICAgICAgICAgICAgIGM0OiBbYngsIGJ5ICsgYm9yZGVyc1swXS53aWR0aF1cbiAgICAgICAgICAgIH0sIGJvcmRlclJhZGl1c1sxXSwgYm9yZGVyUmFkaXVzWzJdLFxuICAgICAgICAgICAgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BSaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0SW5uZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgLy8gYm90dG9tIGJvcmRlclxuICAgICAgICAgICAgYnkgPSAoYnkgKyBoZWlnaHQpIC0gKGJvcmRlcnNbMl0ud2lkdGgpO1xuICAgICAgICAgICAgYmggPSBib3JkZXJzWzJdLndpZHRoO1xuXG4gICAgICAgICAgICBib3JkZXJBcmdzID0gZHJhd1NpZGUoe1xuICAgICAgICAgICAgICBjMTogW2J4ICsgYncsIGJ5ICsgYmhdLFxuICAgICAgICAgICAgICBjMjogW2J4LCBieSArIGJoXSxcbiAgICAgICAgICAgICAgYzM6IFtieCArIGJvcmRlcnNbM10ud2lkdGgsIGJ5XSxcbiAgICAgICAgICAgICAgYzQ6IFtieCArIGJ3IC0gYm9yZGVyc1szXS53aWR0aCwgYnldXG4gICAgICAgICAgICB9LCBib3JkZXJSYWRpdXNbMl0sIGJvcmRlclJhZGl1c1szXSxcbiAgICAgICAgICAgIGJvcmRlclBvaW50cy5ib3R0b21SaWdodE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRJbm5lciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAvLyBsZWZ0IGJvcmRlclxuICAgICAgICAgICAgYncgPSBib3JkZXJzWzNdLndpZHRoO1xuXG4gICAgICAgICAgICBib3JkZXJBcmdzID0gZHJhd1NpZGUoe1xuICAgICAgICAgICAgICBjMTogW2J4LCBieSArIGJoICsgYm9yZGVyc1syXS53aWR0aF0sXG4gICAgICAgICAgICAgIGMyOiBbYngsIGJ5XSxcbiAgICAgICAgICAgICAgYzM6IFtieCArIGJ3LCBieSArIGJvcmRlcnNbMF0ud2lkdGhdLFxuICAgICAgICAgICAgICBjNDogW2J4ICsgYncsIGJ5ICsgYmhdXG4gICAgICAgICAgICB9LCBib3JkZXJSYWRpdXNbM10sIGJvcmRlclJhZGl1c1swXSxcbiAgICAgICAgICAgIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0SW5uZXIsIGJvcmRlclBvaW50cy50b3BMZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BMZWZ0SW5uZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBib3JkZXJEYXRhLmJvcmRlcnMucHVzaCh7XG4gICAgICAgICAgYXJnczogYm9yZGVyQXJncyxcbiAgICAgICAgICBjb2xvcjogYm9yZGVyc1tib3JkZXJTaWRlXS5jb2xvclxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBib3JkZXJEYXRhO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGUoY3R4LCBhcmdzKSB7XG4gICAgdmFyIHNoYXBlID0gY3R4LmRyYXdTaGFwZSgpO1xuICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbihib3JkZXIsIGluZGV4KSB7XG4gICAgICBzaGFwZVsoaW5kZXggPT09IDApID8gXCJtb3ZlVG9cIiA6IGJvcmRlclswXSArIFwiVG9cIiBdLmFwcGx5KG51bGwsIGJvcmRlci5zbGljZSgxKSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNoYXBlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQm9yZGVycyhjdHgsIGJvcmRlckFyZ3MsIGNvbG9yKSB7XG4gICAgaWYgKGNvbG9yICE9PSBcInRyYW5zcGFyZW50XCIpIHtcbiAgICAgIGN0eC5zZXRWYXJpYWJsZSggXCJmaWxsU3R5bGVcIiwgY29sb3IpO1xuICAgICAgY3JlYXRlU2hhcGUoY3R4LCBib3JkZXJBcmdzKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBudW1EcmF3cys9MTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJGb3JtVmFsdWUgKGVsLCBib3VuZHMsIHN0YWNrKXtcblxuICAgIHZhciB2YWx1ZVdyYXAgPSBkb2MuY3JlYXRlRWxlbWVudCgndmFsdWV3cmFwJyksXG4gICAgY3NzUHJvcGVydHlBcnJheSA9IFsnbGluZUhlaWdodCcsJ3RleHRBbGlnbicsJ2ZvbnRGYW1pbHknLCdjb2xvcicsJ2ZvbnRTaXplJywncGFkZGluZ0xlZnQnLCdwYWRkaW5nVG9wJywnd2lkdGgnLCdoZWlnaHQnLCdib3JkZXInLCdib3JkZXJMZWZ0V2lkdGgnLCdib3JkZXJUb3BXaWR0aCddLFxuICAgIHRleHRWYWx1ZSxcbiAgICB0ZXh0Tm9kZTtcblxuICAgIGNzc1Byb3BlcnR5QXJyYXkuZm9yRWFjaChmdW5jdGlvbihwcm9wZXJ0eSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdmFsdWVXcmFwLnN0eWxlW3Byb3BlcnR5XSA9IGdldENTUyhlbCwgcHJvcGVydHkpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIC8vIE9sZGVyIElFIGhhcyBpc3N1ZXMgd2l0aCBcImJvcmRlclwiXG4gICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IFBhcnNlOiBFeGNlcHRpb24gY2F1Z2h0IGluIHJlbmRlckZvcm1WYWx1ZTogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFsdWVXcmFwLnN0eWxlLmJvcmRlckNvbG9yID0gXCJibGFja1wiO1xuICAgIHZhbHVlV3JhcC5zdHlsZS5ib3JkZXJTdHlsZSA9IFwic29saWRcIjtcbiAgICB2YWx1ZVdyYXAuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICB2YWx1ZVdyYXAuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XG5cbiAgICBpZiAoL14oc3VibWl0fHJlc2V0fGJ1dHRvbnx0ZXh0fHBhc3N3b3JkKSQvLnRlc3QoZWwudHlwZSkgfHwgZWwubm9kZU5hbWUgPT09IFwiU0VMRUNUXCIpe1xuICAgICAgdmFsdWVXcmFwLnN0eWxlLmxpbmVIZWlnaHQgPSBnZXRDU1MoZWwsIFwiaGVpZ2h0XCIpO1xuICAgIH1cblxuICAgIHZhbHVlV3JhcC5zdHlsZS50b3AgPSBib3VuZHMudG9wICsgXCJweFwiO1xuICAgIHZhbHVlV3JhcC5zdHlsZS5sZWZ0ID0gYm91bmRzLmxlZnQgKyBcInB4XCI7XG5cbiAgICB0ZXh0VmFsdWUgPSAoZWwubm9kZU5hbWUgPT09IFwiU0VMRUNUXCIpID8gKGVsLm9wdGlvbnNbZWwuc2VsZWN0ZWRJbmRleF0gfHwgMCkudGV4dCA6IGVsLnZhbHVlO1xuICAgIGlmKCF0ZXh0VmFsdWUpIHtcbiAgICAgIHRleHRWYWx1ZSA9IGVsLnBsYWNlaG9sZGVyO1xuICAgIH1cblxuICAgIHRleHROb2RlID0gZG9jLmNyZWF0ZVRleHROb2RlKHRleHRWYWx1ZSk7XG5cbiAgICB2YWx1ZVdyYXAuYXBwZW5kQ2hpbGQodGV4dE5vZGUpO1xuICAgIGJvZHkuYXBwZW5kQ2hpbGQodmFsdWVXcmFwKTtcblxuICAgIHJlbmRlclRleHQoZWwsIHRleHROb2RlLCBzdGFjayk7XG4gICAgYm9keS5yZW1vdmVDaGlsZCh2YWx1ZVdyYXApO1xuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0ltYWdlIChjdHgpIHtcbiAgICBjdHguZHJhd0ltYWdlLmFwcGx5KGN0eCwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgbnVtRHJhd3MrPTE7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQc2V1ZG9FbGVtZW50KGVsLCB3aGljaCkge1xuICAgIHZhciBlbFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIHdoaWNoKTtcbiAgICBpZighZWxTdHlsZSB8fCAhZWxTdHlsZS5jb250ZW50IHx8IGVsU3R5bGUuY29udGVudCA9PT0gXCJub25lXCIgfHwgZWxTdHlsZS5jb250ZW50ID09PSBcIi1tb3otYWx0LWNvbnRlbnRcIiB8fCBlbFN0eWxlLmRpc3BsYXkgPT09IFwibm9uZVwiKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjb250ZW50ID0gZWxTdHlsZS5jb250ZW50ICsgJycsXG4gICAgZmlyc3QgPSBjb250ZW50LnN1YnN0ciggMCwgMSApO1xuICAgIC8vc3RyaXBzIHF1b3Rlc1xuICAgIGlmKGZpcnN0ID09PSBjb250ZW50LnN1YnN0ciggY29udGVudC5sZW5ndGggLSAxICkgJiYgZmlyc3QubWF0Y2goLyd8XCIvKSkge1xuICAgICAgY29udGVudCA9IGNvbnRlbnQuc3Vic3RyKCAxLCBjb250ZW50Lmxlbmd0aCAtIDIgKTtcbiAgICB9XG5cbiAgICB2YXIgaXNJbWFnZSA9IGNvbnRlbnQuc3Vic3RyKCAwLCAzICkgPT09ICd1cmwnLFxuICAgIGVscHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBpc0ltYWdlID8gJ2ltZycgOiAnc3BhbicgKTtcblxuICAgIGVscHMuY2xhc3NOYW1lID0gcHNldWRvSGlkZSArIFwiLWJlZm9yZSBcIiArIHBzZXVkb0hpZGUgKyBcIi1hZnRlclwiO1xuXG4gICAgT2JqZWN0LmtleXMoZWxTdHlsZSkuZmlsdGVyKGluZGV4ZWRQcm9wZXJ0eSkuZm9yRWFjaChmdW5jdGlvbihwcm9wKSB7XG4gICAgICAvLyBQcmV2ZW50IGFzc2lnbmluZyBvZiByZWFkIG9ubHkgQ1NTIFJ1bGVzLCBleC4gbGVuZ3RoLCBwYXJlbnRSdWxlXG4gICAgICB0cnkge1xuICAgICAgICBlbHBzLnN0eWxlW3Byb3BdID0gZWxTdHlsZVtwcm9wXTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgVXRpbC5sb2coWydUcmllZCB0byBhc3NpZ24gcmVhZG9ubHkgcHJvcGVydHkgJywgcHJvcCwgJ0Vycm9yOicsIGVdKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmKGlzSW1hZ2UpIHtcbiAgICAgIGVscHMuc3JjID0gVXRpbC5wYXJzZUJhY2tncm91bmRJbWFnZShjb250ZW50KVswXS5hcmdzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbHBzLmlubmVySFRNTCA9IGNvbnRlbnQ7XG4gICAgfVxuICAgIHJldHVybiBlbHBzO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5kZXhlZFByb3BlcnR5KHByb3BlcnR5KSB7XG4gICAgcmV0dXJuIChpc05hTih3aW5kb3cucGFyc2VJbnQocHJvcGVydHksIDEwKSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5qZWN0UHNldWRvRWxlbWVudHMoZWwsIHN0YWNrKSB7XG4gICAgdmFyIGJlZm9yZSA9IGdldFBzZXVkb0VsZW1lbnQoZWwsICc6YmVmb3JlJyksXG4gICAgYWZ0ZXIgPSBnZXRQc2V1ZG9FbGVtZW50KGVsLCAnOmFmdGVyJyk7XG4gICAgaWYoIWJlZm9yZSAmJiAhYWZ0ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZihiZWZvcmUpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSBcIiBcIiArIHBzZXVkb0hpZGUgKyBcIi1iZWZvcmVcIjtcbiAgICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGJlZm9yZSwgZWwpO1xuICAgICAgcGFyc2VFbGVtZW50KGJlZm9yZSwgc3RhY2ssIHRydWUpO1xuICAgICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiZWZvcmUpO1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UocHNldWRvSGlkZSArIFwiLWJlZm9yZVwiLCBcIlwiKS50cmltKCk7XG4gICAgfVxuXG4gICAgaWYgKGFmdGVyKSB7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gXCIgXCIgKyBwc2V1ZG9IaWRlICsgXCItYWZ0ZXJcIjtcbiAgICAgIGVsLmFwcGVuZENoaWxkKGFmdGVyKTtcbiAgICAgIHBhcnNlRWxlbWVudChhZnRlciwgc3RhY2ssIHRydWUpO1xuICAgICAgZWwucmVtb3ZlQ2hpbGQoYWZ0ZXIpO1xuICAgICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UocHNldWRvSGlkZSArIFwiLWFmdGVyXCIsIFwiXCIpLnRyaW0oKTtcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJhY2tncm91bmRSZXBlYXQoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCBib3VuZHMpIHtcbiAgICB2YXIgb2Zmc2V0WCA9IE1hdGgucm91bmQoYm91bmRzLmxlZnQgKyBiYWNrZ3JvdW5kUG9zaXRpb24ubGVmdCksXG4gICAgb2Zmc2V0WSA9IE1hdGgucm91bmQoYm91bmRzLnRvcCArIGJhY2tncm91bmRQb3NpdGlvbi50b3ApO1xuXG4gICAgY3R4LmNyZWF0ZVBhdHRlcm4oaW1hZ2UpO1xuICAgIGN0eC50cmFuc2xhdGUob2Zmc2V0WCwgb2Zmc2V0WSk7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBjdHgudHJhbnNsYXRlKC1vZmZzZXRYLCAtb2Zmc2V0WSk7XG4gIH1cblxuICBmdW5jdGlvbiBiYWNrZ3JvdW5kUmVwZWF0U2hhcGUoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCBib3VuZHMsIGxlZnQsIHRvcCwgd2lkdGgsIGhlaWdodCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgYXJncy5wdXNoKFtcImxpbmVcIiwgTWF0aC5yb3VuZChsZWZ0KSwgTWF0aC5yb3VuZCh0b3ApXSk7XG4gICAgYXJncy5wdXNoKFtcImxpbmVcIiwgTWF0aC5yb3VuZChsZWZ0ICsgd2lkdGgpLCBNYXRoLnJvdW5kKHRvcCldKTtcbiAgICBhcmdzLnB1c2goW1wibGluZVwiLCBNYXRoLnJvdW5kKGxlZnQgKyB3aWR0aCksIE1hdGgucm91bmQoaGVpZ2h0ICsgdG9wKV0pO1xuICAgIGFyZ3MucHVzaChbXCJsaW5lXCIsIE1hdGgucm91bmQobGVmdCksIE1hdGgucm91bmQoaGVpZ2h0ICsgdG9wKV0pO1xuICAgIGNyZWF0ZVNoYXBlKGN0eCwgYXJncyk7XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguY2xpcCgpO1xuICAgIHJlbmRlckJhY2tncm91bmRSZXBlYXQoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCBib3VuZHMpO1xuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJCYWNrZ3JvdW5kQ29sb3IoY3R4LCBiYWNrZ3JvdW5kQm91bmRzLCBiZ2NvbG9yKSB7XG4gICAgcmVuZGVyUmVjdChcbiAgICAgIGN0eCxcbiAgICAgIGJhY2tncm91bmRCb3VuZHMubGVmdCxcbiAgICAgIGJhY2tncm91bmRCb3VuZHMudG9wLFxuICAgICAgYmFja2dyb3VuZEJvdW5kcy53aWR0aCxcbiAgICAgIGJhY2tncm91bmRCb3VuZHMuaGVpZ2h0LFxuICAgICAgYmdjb2xvclxuICAgICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJhY2tncm91bmRSZXBlYXRpbmcoZWwsIGJvdW5kcywgY3R4LCBpbWFnZSwgaW1hZ2VJbmRleCkge1xuICAgIHZhciBiYWNrZ3JvdW5kU2l6ZSA9IFV0aWwuQmFja2dyb3VuZFNpemUoZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXgpLFxuICAgIGJhY2tncm91bmRQb3NpdGlvbiA9IFV0aWwuQmFja2dyb3VuZFBvc2l0aW9uKGVsLCBib3VuZHMsIGltYWdlLCBpbWFnZUluZGV4LCBiYWNrZ3JvdW5kU2l6ZSksXG4gICAgYmFja2dyb3VuZFJlcGVhdCA9IGdldENTUyhlbCwgXCJiYWNrZ3JvdW5kUmVwZWF0XCIpLnNwbGl0KFwiLFwiKS5tYXAoVXRpbC50cmltVGV4dCk7XG5cbiAgICBpbWFnZSA9IHJlc2l6ZUltYWdlKGltYWdlLCBiYWNrZ3JvdW5kU2l6ZSk7XG5cbiAgICBiYWNrZ3JvdW5kUmVwZWF0ID0gYmFja2dyb3VuZFJlcGVhdFtpbWFnZUluZGV4XSB8fCBiYWNrZ3JvdW5kUmVwZWF0WzBdO1xuXG4gICAgc3dpdGNoIChiYWNrZ3JvdW5kUmVwZWF0KSB7XG4gICAgICBjYXNlIFwicmVwZWF0LXhcIjpcbiAgICAgICAgYmFja2dyb3VuZFJlcGVhdFNoYXBlKGN0eCwgaW1hZ2UsIGJhY2tncm91bmRQb3NpdGlvbiwgYm91bmRzLFxuICAgICAgICAgIGJvdW5kcy5sZWZ0LCBib3VuZHMudG9wICsgYmFja2dyb3VuZFBvc2l0aW9uLnRvcCwgOTk5OTksIGltYWdlLmhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwicmVwZWF0LXlcIjpcbiAgICAgICAgYmFja2dyb3VuZFJlcGVhdFNoYXBlKGN0eCwgaW1hZ2UsIGJhY2tncm91bmRQb3NpdGlvbiwgYm91bmRzLFxuICAgICAgICAgIGJvdW5kcy5sZWZ0ICsgYmFja2dyb3VuZFBvc2l0aW9uLmxlZnQsIGJvdW5kcy50b3AsIGltYWdlLndpZHRoLCA5OTk5OSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlIFwibm8tcmVwZWF0XCI6XG4gICAgICAgIGJhY2tncm91bmRSZXBlYXRTaGFwZShjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIGJvdW5kcyxcbiAgICAgICAgICBib3VuZHMubGVmdCArIGJhY2tncm91bmRQb3NpdGlvbi5sZWZ0LCBib3VuZHMudG9wICsgYmFja2dyb3VuZFBvc2l0aW9uLnRvcCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZW5kZXJCYWNrZ3JvdW5kUmVwZWF0KGN0eCwgaW1hZ2UsIGJhY2tncm91bmRQb3NpdGlvbiwge1xuICAgICAgICAgIHRvcDogYm91bmRzLnRvcCxcbiAgICAgICAgICBsZWZ0OiBib3VuZHMubGVmdCxcbiAgICAgICAgICB3aWR0aDogaW1hZ2Uud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBpbWFnZS5oZWlnaHRcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJhY2tncm91bmRJbWFnZShlbGVtZW50LCBib3VuZHMsIGN0eCkge1xuICAgIHZhciBiYWNrZ3JvdW5kSW1hZ2UgPSBnZXRDU1MoZWxlbWVudCwgXCJiYWNrZ3JvdW5kSW1hZ2VcIiksXG4gICAgYmFja2dyb3VuZEltYWdlcyA9IFV0aWwucGFyc2VCYWNrZ3JvdW5kSW1hZ2UoYmFja2dyb3VuZEltYWdlKSxcbiAgICBpbWFnZSxcbiAgICBpbWFnZUluZGV4ID0gYmFja2dyb3VuZEltYWdlcy5sZW5ndGg7XG5cbiAgICB3aGlsZShpbWFnZUluZGV4LS0pIHtcbiAgICAgIGJhY2tncm91bmRJbWFnZSA9IGJhY2tncm91bmRJbWFnZXNbaW1hZ2VJbmRleF07XG5cbiAgICAgIGlmICghYmFja2dyb3VuZEltYWdlLmFyZ3MgfHwgYmFja2dyb3VuZEltYWdlLmFyZ3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICB2YXIga2V5ID0gYmFja2dyb3VuZEltYWdlLm1ldGhvZCA9PT0gJ3VybCcgP1xuICAgICAgYmFja2dyb3VuZEltYWdlLmFyZ3NbMF0gOlxuICAgICAgYmFja2dyb3VuZEltYWdlLnZhbHVlO1xuXG4gICAgICBpbWFnZSA9IGxvYWRJbWFnZShrZXkpO1xuXG4gICAgICAvLyBUT0RPIGFkZCBzdXBwb3J0IGZvciBiYWNrZ3JvdW5kLW9yaWdpblxuICAgICAgaWYgKGltYWdlKSB7XG4gICAgICAgIHJlbmRlckJhY2tncm91bmRSZXBlYXRpbmcoZWxlbWVudCwgYm91bmRzLCBjdHgsIGltYWdlLCBpbWFnZUluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IEVycm9yIGxvYWRpbmcgYmFja2dyb3VuZDpcIiwgYmFja2dyb3VuZEltYWdlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNpemVJbWFnZShpbWFnZSwgYm91bmRzKSB7XG4gICAgaWYoaW1hZ2Uud2lkdGggPT09IGJvdW5kcy53aWR0aCAmJiBpbWFnZS5oZWlnaHQgPT09IGJvdW5kcy5oZWlnaHQpIHtcbiAgICAgIHJldHVybiBpbWFnZTtcbiAgICB9XG5cbiAgICB2YXIgY3R4LCBjYW52YXMgPSBkb2MuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgY2FudmFzLndpZHRoID0gYm91bmRzLndpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBib3VuZHMuaGVpZ2h0O1xuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgZHJhd0ltYWdlKGN0eCwgaW1hZ2UsIDAsIDAsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQsIDAsIDAsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCApO1xuICAgIHJldHVybiBjYW52YXM7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRPcGFjaXR5KGN0eCwgZWxlbWVudCwgcGFyZW50U3RhY2spIHtcbiAgICByZXR1cm4gY3R4LnNldFZhcmlhYmxlKFwiZ2xvYmFsQWxwaGFcIiwgZ2V0Q1NTKGVsZW1lbnQsIFwib3BhY2l0eVwiKSAqICgocGFyZW50U3RhY2spID8gcGFyZW50U3RhY2sub3BhY2l0eSA6IDEpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZVB4KHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZShcInB4XCIsIFwiXCIpO1xuICB9XG5cbiAgdmFyIHRyYW5zZm9ybVJlZ0V4cCA9IC8obWF0cml4KVxcKCguKylcXCkvO1xuXG4gIGZ1bmN0aW9uIGdldFRyYW5zZm9ybShlbGVtZW50LCBwYXJlbnRTdGFjaykge1xuICAgIHZhciB0cmFuc2Zvcm0gPSBnZXRDU1MoZWxlbWVudCwgXCJ0cmFuc2Zvcm1cIikgfHwgZ2V0Q1NTKGVsZW1lbnQsIFwiLXdlYmtpdC10cmFuc2Zvcm1cIikgfHwgZ2V0Q1NTKGVsZW1lbnQsIFwiLW1vei10cmFuc2Zvcm1cIikgfHwgZ2V0Q1NTKGVsZW1lbnQsIFwiLW1zLXRyYW5zZm9ybVwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItby10cmFuc2Zvcm1cIik7XG4gICAgdmFyIHRyYW5zZm9ybU9yaWdpbiA9IGdldENTUyhlbGVtZW50LCBcInRyYW5zZm9ybS1vcmlnaW5cIikgfHwgZ2V0Q1NTKGVsZW1lbnQsIFwiLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi1tb3otdHJhbnNmb3JtLW9yaWdpblwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItbXMtdHJhbnNmb3JtLW9yaWdpblwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItby10cmFuc2Zvcm0tb3JpZ2luXCIpIHx8IFwiMHB4IDBweFwiO1xuXG4gICAgdHJhbnNmb3JtT3JpZ2luID0gdHJhbnNmb3JtT3JpZ2luLnNwbGl0KFwiIFwiKS5tYXAocmVtb3ZlUHgpLm1hcChVdGlsLmFzRmxvYXQpO1xuXG4gICAgdmFyIG1hdHJpeDtcbiAgICBpZiAodHJhbnNmb3JtICYmIHRyYW5zZm9ybSAhPT0gXCJub25lXCIpIHtcbiAgICAgIHZhciBtYXRjaCA9IHRyYW5zZm9ybS5tYXRjaCh0cmFuc2Zvcm1SZWdFeHApO1xuICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgIHN3aXRjaChtYXRjaFsxXSkge1xuICAgICAgICAgIGNhc2UgXCJtYXRyaXhcIjpcbiAgICAgICAgICAgIG1hdHJpeCA9IG1hdGNoWzJdLnNwbGl0KFwiLFwiKS5tYXAoVXRpbC50cmltVGV4dCkubWFwKFV0aWwuYXNGbG9hdCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBvcmlnaW46IHRyYW5zZm9ybU9yaWdpbixcbiAgICAgIG1hdHJpeDogbWF0cml4XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVN0YWNrKGVsZW1lbnQsIHBhcmVudFN0YWNrLCBib3VuZHMsIHRyYW5zZm9ybSkge1xuICAgIHZhciBjdHggPSBoMmNSZW5kZXJDb250ZXh0KCghcGFyZW50U3RhY2spID8gZG9jdW1lbnRXaWR0aCgpIDogYm91bmRzLndpZHRoICwgKCFwYXJlbnRTdGFjaykgPyBkb2N1bWVudEhlaWdodCgpIDogYm91bmRzLmhlaWdodCksXG4gICAgc3RhY2sgPSB7XG4gICAgICBjdHg6IGN0eCxcbiAgICAgIG9wYWNpdHk6IHNldE9wYWNpdHkoY3R4LCBlbGVtZW50LCBwYXJlbnRTdGFjayksXG4gICAgICBjc3NQb3NpdGlvbjogZ2V0Q1NTKGVsZW1lbnQsIFwicG9zaXRpb25cIiksXG4gICAgICBib3JkZXJzOiBnZXRCb3JkZXJEYXRhKGVsZW1lbnQpLFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2Zvcm0sXG4gICAgICBjbGlwOiAocGFyZW50U3RhY2sgJiYgcGFyZW50U3RhY2suY2xpcCkgPyBVdGlsLkV4dGVuZCgge30sIHBhcmVudFN0YWNrLmNsaXAgKSA6IG51bGxcbiAgICB9O1xuXG4gICAgc2V0WihlbGVtZW50LCBzdGFjaywgcGFyZW50U3RhY2spO1xuXG4gICAgLy8gVE9ETyBjb3JyZWN0IG92ZXJmbG93IGZvciBhYnNvbHV0ZSBjb250ZW50IHJlc2lkaW5nIHVuZGVyIGEgc3RhdGljIHBvc2l0aW9uXG4gICAgaWYgKG9wdGlvbnMudXNlT3ZlcmZsb3cgPT09IHRydWUgJiYgLyhoaWRkZW58c2Nyb2xsfGF1dG8pLy50ZXN0KGdldENTUyhlbGVtZW50LCBcIm92ZXJmbG93XCIpKSA9PT0gdHJ1ZSAmJiAvKEJPRFkpL2kudGVzdChlbGVtZW50Lm5vZGVOYW1lKSA9PT0gZmFsc2Upe1xuICAgICAgc3RhY2suY2xpcCA9IChzdGFjay5jbGlwKSA/IGNsaXBCb3VuZHMoc3RhY2suY2xpcCwgYm91bmRzKSA6IGJvdW5kcztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCYWNrZ3JvdW5kQm91bmRzKGJvcmRlcnMsIGJvdW5kcywgY2xpcCkge1xuICAgIHZhciBiYWNrZ3JvdW5kQm91bmRzID0ge1xuICAgICAgbGVmdDogYm91bmRzLmxlZnQgKyBib3JkZXJzWzNdLndpZHRoLFxuICAgICAgdG9wOiBib3VuZHMudG9wICsgYm9yZGVyc1swXS53aWR0aCxcbiAgICAgIHdpZHRoOiBib3VuZHMud2lkdGggLSAoYm9yZGVyc1sxXS53aWR0aCArIGJvcmRlcnNbM10ud2lkdGgpLFxuICAgICAgaGVpZ2h0OiBib3VuZHMuaGVpZ2h0IC0gKGJvcmRlcnNbMF0ud2lkdGggKyBib3JkZXJzWzJdLndpZHRoKVxuICAgIH07XG5cbiAgICBpZiAoY2xpcCkge1xuICAgICAgYmFja2dyb3VuZEJvdW5kcyA9IGNsaXBCb3VuZHMoYmFja2dyb3VuZEJvdW5kcywgY2xpcCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhY2tncm91bmRCb3VuZHM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb3VuZHMoZWxlbWVudCwgdHJhbnNmb3JtKSB7XG4gICAgdmFyIGJvdW5kcyA9ICh0cmFuc2Zvcm0ubWF0cml4KSA/IFV0aWwuT2Zmc2V0Qm91bmRzKGVsZW1lbnQpIDogVXRpbC5Cb3VuZHMoZWxlbWVudCk7XG4gICAgdHJhbnNmb3JtLm9yaWdpblswXSArPSBib3VuZHMubGVmdDtcbiAgICB0cmFuc2Zvcm0ub3JpZ2luWzFdICs9IGJvdW5kcy50b3A7XG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckVsZW1lbnQoZWxlbWVudCwgcGFyZW50U3RhY2ssIHBzZXVkb0VsZW1lbnQsIGlnbm9yZUJhY2tncm91bmQpIHtcbiAgICB2YXIgdHJhbnNmb3JtID0gZ2V0VHJhbnNmb3JtKGVsZW1lbnQsIHBhcmVudFN0YWNrKSxcbiAgICBib3VuZHMgPSBnZXRCb3VuZHMoZWxlbWVudCwgdHJhbnNmb3JtKSxcbiAgICBpbWFnZSxcbiAgICBzdGFjayA9IGNyZWF0ZVN0YWNrKGVsZW1lbnQsIHBhcmVudFN0YWNrLCBib3VuZHMsIHRyYW5zZm9ybSksXG4gICAgYm9yZGVycyA9IHN0YWNrLmJvcmRlcnMsXG4gICAgY3R4ID0gc3RhY2suY3R4LFxuICAgIGJhY2tncm91bmRCb3VuZHMgPSBnZXRCYWNrZ3JvdW5kQm91bmRzKGJvcmRlcnMsIGJvdW5kcywgc3RhY2suY2xpcCksXG4gICAgYm9yZGVyRGF0YSA9IHBhcnNlQm9yZGVycyhlbGVtZW50LCBib3VuZHMsIGJvcmRlcnMpLFxuICAgIGJhY2tncm91bmRDb2xvciA9IChpZ25vcmVFbGVtZW50c1JlZ0V4cC50ZXN0KGVsZW1lbnQubm9kZU5hbWUpKSA/IFwiI2VmZWZlZlwiIDogZ2V0Q1NTKGVsZW1lbnQsIFwiYmFja2dyb3VuZENvbG9yXCIpO1xuXG5cbiAgICBjcmVhdGVTaGFwZShjdHgsIGJvcmRlckRhdGEuY2xpcCk7XG5cbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5jbGlwKCk7XG5cbiAgICBpZiAoYmFja2dyb3VuZEJvdW5kcy5oZWlnaHQgPiAwICYmIGJhY2tncm91bmRCb3VuZHMud2lkdGggPiAwICYmICFpZ25vcmVCYWNrZ3JvdW5kKSB7XG4gICAgICByZW5kZXJCYWNrZ3JvdW5kQ29sb3IoY3R4LCBib3VuZHMsIGJhY2tncm91bmRDb2xvcik7XG4gICAgICByZW5kZXJCYWNrZ3JvdW5kSW1hZ2UoZWxlbWVudCwgYmFja2dyb3VuZEJvdW5kcywgY3R4KTtcbiAgICB9IGVsc2UgaWYgKGlnbm9yZUJhY2tncm91bmQpIHtcbiAgICAgIHN0YWNrLmJhY2tncm91bmRDb2xvciA9ICBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuXG4gICAgY3R4LnJlc3RvcmUoKTtcblxuICAgIGJvcmRlckRhdGEuYm9yZGVycy5mb3JFYWNoKGZ1bmN0aW9uKGJvcmRlcikge1xuICAgICAgcmVuZGVyQm9yZGVycyhjdHgsIGJvcmRlci5hcmdzLCBib3JkZXIuY29sb3IpO1xuICAgIH0pO1xuXG4gICAgaWYgKCFwc2V1ZG9FbGVtZW50KSB7XG4gICAgICBpbmplY3RQc2V1ZG9FbGVtZW50cyhlbGVtZW50LCBzdGFjayk7XG4gICAgfVxuXG4gICAgc3dpdGNoKGVsZW1lbnQubm9kZU5hbWUpe1xuICAgICAgY2FzZSBcIklNR1wiOlxuICAgICAgICBpZiAoKGltYWdlID0gbG9hZEltYWdlKGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSkpKSB7XG4gICAgICAgICAgcmVuZGVySW1hZ2UoY3R4LCBlbGVtZW50LCBpbWFnZSwgYm91bmRzLCBib3JkZXJzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBFcnJvciBsb2FkaW5nIDxpbWc+OlwiICsgZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJJTlBVVFwiOlxuICAgICAgICAvLyBUT0RPIGFkZCBhbGwgcmVsZXZhbnQgdHlwZSdzLCBpLmUuIEhUTUw1IG5ldyBzdHVmZlxuICAgICAgICAvLyB0b2RvIGFkZCBzdXBwb3J0IGZvciBwbGFjZWhvbGRlciBhdHRyaWJ1dGUgZm9yIGJyb3dzZXJzIHdoaWNoIHN1cHBvcnQgaXRcbiAgICAgICAgaWYgKC9eKHRleHR8dXJsfGVtYWlsfHN1Ym1pdHxidXR0b258cmVzZXQpJC8udGVzdChlbGVtZW50LnR5cGUpICYmIChlbGVtZW50LnZhbHVlIHx8IGVsZW1lbnQucGxhY2Vob2xkZXIgfHwgXCJcIikubGVuZ3RoID4gMCl7XG4gICAgICAgICAgcmVuZGVyRm9ybVZhbHVlKGVsZW1lbnQsIGJvdW5kcywgc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlRFWFRBUkVBXCI6XG4gICAgICAgIGlmICgoZWxlbWVudC52YWx1ZSB8fCBlbGVtZW50LnBsYWNlaG9sZGVyIHx8IFwiXCIpLmxlbmd0aCA+IDApe1xuICAgICAgICAgIHJlbmRlckZvcm1WYWx1ZShlbGVtZW50LCBib3VuZHMsIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJTRUxFQ1RcIjpcbiAgICAgICAgaWYgKChlbGVtZW50Lm9wdGlvbnN8fGVsZW1lbnQucGxhY2Vob2xkZXIgfHwgXCJcIikubGVuZ3RoID4gMCl7XG4gICAgICAgICAgcmVuZGVyRm9ybVZhbHVlKGVsZW1lbnQsIGJvdW5kcywgc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkxJXCI6XG4gICAgICAgIHJlbmRlckxpc3RJdGVtKGVsZW1lbnQsIHN0YWNrLCBiYWNrZ3JvdW5kQm91bmRzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiQ0FOVkFTXCI6XG4gICAgICAgIHJlbmRlckltYWdlKGN0eCwgZWxlbWVudCwgZWxlbWVudCwgYm91bmRzLCBib3JkZXJzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YWNrO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNFbGVtZW50VmlzaWJsZShlbGVtZW50KSB7XG4gICAgcmV0dXJuIChnZXRDU1MoZWxlbWVudCwgJ2Rpc3BsYXknKSAhPT0gXCJub25lXCIgJiYgZ2V0Q1NTKGVsZW1lbnQsICd2aXNpYmlsaXR5JykgIT09IFwiaGlkZGVuXCIgJiYgIWVsZW1lbnQuaGFzQXR0cmlidXRlKFwiZGF0YS1odG1sMmNhbnZhcy1pZ25vcmVcIikpO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VFbGVtZW50IChlbGVtZW50LCBzdGFjaywgcHNldWRvRWxlbWVudCkge1xuICAgIGlmIChpc0VsZW1lbnRWaXNpYmxlKGVsZW1lbnQpKSB7XG4gICAgICBzdGFjayA9IHJlbmRlckVsZW1lbnQoZWxlbWVudCwgc3RhY2ssIHBzZXVkb0VsZW1lbnQsIGZhbHNlKSB8fCBzdGFjaztcbiAgICAgIGlmICghaWdub3JlRWxlbWVudHNSZWdFeHAudGVzdChlbGVtZW50Lm5vZGVOYW1lKSkge1xuICAgICAgICBwYXJzZUNoaWxkcmVuKGVsZW1lbnQsIHN0YWNrLCBwc2V1ZG9FbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUNoaWxkcmVuKGVsZW1lbnQsIHN0YWNrLCBwc2V1ZG9FbGVtZW50KSB7XG4gICAgVXRpbC5DaGlsZHJlbihlbGVtZW50KS5mb3JFYWNoKGZ1bmN0aW9uKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLkVMRU1FTlRfTk9ERSkge1xuICAgICAgICBwYXJzZUVsZW1lbnQobm9kZSwgc3RhY2ssIHBzZXVkb0VsZW1lbnQpO1xuICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSBub2RlLlRFWFRfTk9ERSkge1xuICAgICAgICByZW5kZXJUZXh0KGVsZW1lbnQsIG5vZGUsIHN0YWNrKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgdmFyIGJhY2tncm91bmQgPSBnZXRDU1MoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBcImJhY2tncm91bmRDb2xvclwiKSxcbiAgICAgIHRyYW5zcGFyZW50QmFja2dyb3VuZCA9IChVdGlsLmlzVHJhbnNwYXJlbnQoYmFja2dyb3VuZCkgJiYgZWxlbWVudCA9PT0gZG9jdW1lbnQuYm9keSksXG4gICAgICBzdGFjayA9IHJlbmRlckVsZW1lbnQoZWxlbWVudCwgbnVsbCwgZmFsc2UsIHRyYW5zcGFyZW50QmFja2dyb3VuZCk7XG4gICAgcGFyc2VDaGlsZHJlbihlbGVtZW50LCBzdGFjayk7XG5cbiAgICBpZiAodHJhbnNwYXJlbnRCYWNrZ3JvdW5kKSB7XG4gICAgICBiYWNrZ3JvdW5kID0gc3RhY2suYmFja2dyb3VuZENvbG9yO1xuICAgIH1cblxuICAgIGJvZHkucmVtb3ZlQ2hpbGQoaGlkZVBzZXVkb0VsZW1lbnRzKTtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kLFxuICAgICAgc3RhY2s6IHN0YWNrXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBpbml0KCk7XG59O1xuXG5mdW5jdGlvbiBoMmN6Q29udGV4dCh6aW5kZXgpIHtcbiAgcmV0dXJuIHtcbiAgICB6aW5kZXg6IHppbmRleCxcbiAgICBjaGlsZHJlbjogW11cbiAgfTtcbn1cblxuX2h0bWwyY2FudmFzLlByZWxvYWQgPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcblxuICB2YXIgaW1hZ2VzID0ge1xuICAgIG51bUxvYWRlZDogMCwgICAvLyBhbHNvIGZhaWxlZCBhcmUgY291bnRlZCBoZXJlXG4gICAgbnVtRmFpbGVkOiAwLFxuICAgIG51bVRvdGFsOiAwLFxuICAgIGNsZWFudXBEb25lOiBmYWxzZVxuICB9LFxuICBwYWdlT3JpZ2luLFxuICBVdGlsID0gX2h0bWwyY2FudmFzLlV0aWwsXG4gIG1ldGhvZHMsXG4gIGksXG4gIGNvdW50ID0gMCxcbiAgZWxlbWVudCA9IG9wdGlvbnMuZWxlbWVudHNbMF0gfHwgZG9jdW1lbnQuYm9keSxcbiAgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50LFxuICBkb21JbWFnZXMgPSBlbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpbWcnKSwgLy8gRmV0Y2ggaW1hZ2VzIG9mIHRoZSBwcmVzZW50IGVsZW1lbnQgb25seVxuICBpbWdMZW4gPSBkb21JbWFnZXMubGVuZ3RoLFxuICBsaW5rID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLFxuICBzdXBwb3J0Q09SUyA9IChmdW5jdGlvbiggaW1nICl7XG4gICAgcmV0dXJuIChpbWcuY3Jvc3NPcmlnaW4gIT09IHVuZGVmaW5lZCk7XG4gIH0pKG5ldyBJbWFnZSgpKSxcbiAgdGltZW91dFRpbWVyO1xuXG4gIGxpbmsuaHJlZiA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICBwYWdlT3JpZ2luICA9IGxpbmsucHJvdG9jb2wgKyBsaW5rLmhvc3Q7XG5cbiAgZnVuY3Rpb24gaXNTYW1lT3JpZ2luKHVybCl7XG4gICAgbGluay5ocmVmID0gdXJsO1xuICAgIGxpbmsuaHJlZiA9IGxpbmsuaHJlZjsgLy8gWUVTLCBCRUxJRVZFIElUIE9SIE5PVCwgdGhhdCBpcyByZXF1aXJlZCBmb3IgSUU5IC0gaHR0cDovL2pzZmlkZGxlLm5ldC9uaWtsYXN2aC8yZTQ4Yi9cbiAgICB2YXIgb3JpZ2luID0gbGluay5wcm90b2NvbCArIGxpbmsuaG9zdDtcbiAgICByZXR1cm4gKG9yaWdpbiA9PT0gcGFnZU9yaWdpbik7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydCgpe1xuICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IHN0YXJ0OiBpbWFnZXM6IFwiICsgaW1hZ2VzLm51bUxvYWRlZCArIFwiIC8gXCIgKyBpbWFnZXMubnVtVG90YWwgKyBcIiAoZmFpbGVkOiBcIiArIGltYWdlcy5udW1GYWlsZWQgKyBcIilcIik7XG4gICAgaWYgKCFpbWFnZXMuZmlyc3RSdW4gJiYgaW1hZ2VzLm51bUxvYWRlZCA+PSBpbWFnZXMubnVtVG90YWwpe1xuICAgICAgVXRpbC5sb2coXCJGaW5pc2hlZCBsb2FkaW5nIGltYWdlczogIyBcIiArIGltYWdlcy5udW1Ub3RhbCArIFwiIChmYWlsZWQ6IFwiICsgaW1hZ2VzLm51bUZhaWxlZCArIFwiKVwiKTtcblxuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmNvbXBsZXRlID09PSBcImZ1bmN0aW9uXCIpe1xuICAgICAgICBvcHRpb25zLmNvbXBsZXRlKGltYWdlcyk7XG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICAvLyBUT0RPIG1vZGlmeSBwcm94eSB0byBzZXJ2ZSBpbWFnZXMgd2l0aCBDT1JTIGVuYWJsZWQsIHdoZXJlIGF2YWlsYWJsZVxuICBmdW5jdGlvbiBwcm94eUdldEltYWdlKHVybCwgaW1nLCBpbWFnZU9iail7XG4gICAgdmFyIGNhbGxiYWNrX25hbWUsXG4gICAgc2NyaXB0VXJsID0gb3B0aW9ucy5wcm94eSxcbiAgICBzY3JpcHQ7XG5cbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgdXJsID0gbGluay5ocmVmOyAvLyB3b3JrIGFyb3VuZCBmb3IgcGFnZXMgd2l0aCBiYXNlIGhyZWY9XCJcIiBzZXQgLSBXQVJOSU5HOiB0aGlzIG1heSBjaGFuZ2UgdGhlIHVybFxuXG4gICAgY2FsbGJhY2tfbmFtZSA9ICdodG1sMmNhbnZhc18nICsgKGNvdW50KyspO1xuICAgIGltYWdlT2JqLmNhbGxiYWNrbmFtZSA9IGNhbGxiYWNrX25hbWU7XG5cbiAgICBpZiAoc2NyaXB0VXJsLmluZGV4T2YoXCI/XCIpID4gLTEpIHtcbiAgICAgIHNjcmlwdFVybCArPSBcIiZcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgc2NyaXB0VXJsICs9IFwiP1wiO1xuICAgIH1cbiAgICBzY3JpcHRVcmwgKz0gJ3VybD0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHVybCkgKyAnJmNhbGxiYWNrPScgKyBjYWxsYmFja19uYW1lO1xuICAgIHNjcmlwdCA9IGRvYy5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuXG4gICAgd2luZG93W2NhbGxiYWNrX25hbWVdID0gZnVuY3Rpb24oYSl7XG4gICAgICBpZiAoYS5zdWJzdHJpbmcoMCw2KSA9PT0gXCJlcnJvcjpcIil7XG4gICAgICAgIGltYWdlT2JqLnN1Y2NlZWRlZCA9IGZhbHNlO1xuICAgICAgICBpbWFnZXMubnVtTG9hZGVkKys7XG4gICAgICAgIGltYWdlcy5udW1GYWlsZWQrKztcbiAgICAgICAgc3RhcnQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEltYWdlTG9hZEhhbmRsZXJzKGltZywgaW1hZ2VPYmopO1xuICAgICAgICBpbWcuc3JjID0gYTtcbiAgICAgIH1cbiAgICAgIHdpbmRvd1tjYWxsYmFja19uYW1lXSA9IHVuZGVmaW5lZDsgLy8gdG8gd29yayB3aXRoIElFPDkgIC8vIE5PVEU6IHRoYXQgdGhlIHVuZGVmaW5lZCBjYWxsYmFjayBwcm9wZXJ0eS1uYW1lIHN0aWxsIGV4aXN0cyBvbiB0aGUgd2luZG93IG9iamVjdCAoZm9yIElFPDkpXG4gICAgICB0cnkge1xuICAgICAgICBkZWxldGUgd2luZG93W2NhbGxiYWNrX25hbWVdOyAgLy8gZm9yIGFsbCBicm93c2VyIHRoYXQgc3VwcG9ydCB0aGlzXG4gICAgICB9IGNhdGNoKGV4KSB7fVxuICAgICAgc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICBkZWxldGUgaW1hZ2VPYmouc2NyaXB0O1xuICAgICAgZGVsZXRlIGltYWdlT2JqLmNhbGxiYWNrbmFtZTtcbiAgICB9O1xuXG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJ0ZXh0L2phdmFzY3JpcHRcIik7XG4gICAgc2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBzY3JpcHRVcmwpO1xuICAgIGltYWdlT2JqLnNjcmlwdCA9IHNjcmlwdDtcbiAgICB3aW5kb3cuZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gIH1cblxuICBmdW5jdGlvbiBsb2FkUHNldWRvRWxlbWVudChlbGVtZW50LCB0eXBlKSB7XG4gICAgdmFyIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgdHlwZSksXG4gICAgY29udGVudCA9IHN0eWxlLmNvbnRlbnQ7XG4gICAgaWYgKGNvbnRlbnQuc3Vic3RyKDAsIDMpID09PSAndXJsJykge1xuICAgICAgbWV0aG9kcy5sb2FkSW1hZ2UoX2h0bWwyY2FudmFzLlV0aWwucGFyc2VCYWNrZ3JvdW5kSW1hZ2UoY29udGVudClbMF0uYXJnc1swXSk7XG4gICAgfVxuICAgIGxvYWRCYWNrZ3JvdW5kSW1hZ2VzKHN0eWxlLmJhY2tncm91bmRJbWFnZSwgZWxlbWVudCk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkUHNldWRvRWxlbWVudEltYWdlcyhlbGVtZW50KSB7XG4gICAgbG9hZFBzZXVkb0VsZW1lbnQoZWxlbWVudCwgXCI6YmVmb3JlXCIpO1xuICAgIGxvYWRQc2V1ZG9FbGVtZW50KGVsZW1lbnQsIFwiOmFmdGVyXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZEdyYWRpZW50SW1hZ2UoYmFja2dyb3VuZEltYWdlLCBib3VuZHMpIHtcbiAgICB2YXIgaW1nID0gX2h0bWwyY2FudmFzLkdlbmVyYXRlLkdyYWRpZW50KGJhY2tncm91bmRJbWFnZSwgYm91bmRzKTtcblxuICAgIGlmIChpbWcgIT09IHVuZGVmaW5lZCl7XG4gICAgICBpbWFnZXNbYmFja2dyb3VuZEltYWdlXSA9IHtcbiAgICAgICAgaW1nOiBpbWcsXG4gICAgICAgIHN1Y2NlZWRlZDogdHJ1ZVxuICAgICAgfTtcbiAgICAgIGltYWdlcy5udW1Ub3RhbCsrO1xuICAgICAgaW1hZ2VzLm51bUxvYWRlZCsrO1xuICAgICAgc3RhcnQoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBpbnZhbGlkQmFja2dyb3VuZHMoYmFja2dyb3VuZF9pbWFnZSkge1xuICAgIHJldHVybiAoYmFja2dyb3VuZF9pbWFnZSAmJiBiYWNrZ3JvdW5kX2ltYWdlLm1ldGhvZCAmJiBiYWNrZ3JvdW5kX2ltYWdlLmFyZ3MgJiYgYmFja2dyb3VuZF9pbWFnZS5hcmdzLmxlbmd0aCA+IDAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRCYWNrZ3JvdW5kSW1hZ2VzKGJhY2tncm91bmRfaW1hZ2UsIGVsKSB7XG4gICAgdmFyIGJvdW5kcztcblxuICAgIF9odG1sMmNhbnZhcy5VdGlsLnBhcnNlQmFja2dyb3VuZEltYWdlKGJhY2tncm91bmRfaW1hZ2UpLmZpbHRlcihpbnZhbGlkQmFja2dyb3VuZHMpLmZvckVhY2goZnVuY3Rpb24oYmFja2dyb3VuZF9pbWFnZSkge1xuICAgICAgaWYgKGJhY2tncm91bmRfaW1hZ2UubWV0aG9kID09PSAndXJsJykge1xuICAgICAgICBtZXRob2RzLmxvYWRJbWFnZShiYWNrZ3JvdW5kX2ltYWdlLmFyZ3NbMF0pO1xuICAgICAgfSBlbHNlIGlmKGJhY2tncm91bmRfaW1hZ2UubWV0aG9kLm1hdGNoKC9cXC0/Z3JhZGllbnQkLykpIHtcbiAgICAgICAgaWYoYm91bmRzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBib3VuZHMgPSBfaHRtbDJjYW52YXMuVXRpbC5Cb3VuZHMoZWwpO1xuICAgICAgICB9XG4gICAgICAgIGxvYWRHcmFkaWVudEltYWdlKGJhY2tncm91bmRfaW1hZ2UudmFsdWUsIGJvdW5kcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRJbWFnZXMgKGVsKSB7XG4gICAgdmFyIGVsTm9kZVR5cGUgPSBmYWxzZTtcblxuICAgIC8vIEZpcmVmb3ggZmFpbHMgd2l0aCBwZXJtaXNzaW9uIGRlbmllZCBvbiBwYWdlcyB3aXRoIGlmcmFtZXNcbiAgICB0cnkge1xuICAgICAgVXRpbC5DaGlsZHJlbihlbCkuZm9yRWFjaChnZXRJbWFnZXMpO1xuICAgIH1cbiAgICBjYXRjaCggZSApIHt9XG5cbiAgICB0cnkge1xuICAgICAgZWxOb2RlVHlwZSA9IGVsLm5vZGVUeXBlO1xuICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICBlbE5vZGVUeXBlID0gZmFsc2U7XG4gICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBmYWlsZWQgdG8gYWNjZXNzIHNvbWUgZWxlbWVudCdzIG5vZGVUeXBlIC0gRXhjZXB0aW9uOiBcIiArIGV4Lm1lc3NhZ2UpO1xuICAgIH1cblxuICAgIGlmIChlbE5vZGVUeXBlID09PSAxIHx8IGVsTm9kZVR5cGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgbG9hZFBzZXVkb0VsZW1lbnRJbWFnZXMoZWwpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgbG9hZEJhY2tncm91bmRJbWFnZXMoVXRpbC5nZXRDU1MoZWwsICdiYWNrZ3JvdW5kSW1hZ2UnKSwgZWwpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IGZhaWxlZCB0byBnZXQgYmFja2dyb3VuZC1pbWFnZSAtIEV4Y2VwdGlvbjogXCIgKyBlLm1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgbG9hZEJhY2tncm91bmRJbWFnZXMoZWwpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEltYWdlTG9hZEhhbmRsZXJzKGltZywgaW1hZ2VPYmopIHtcbiAgICBpbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIGltYWdlT2JqLnRpbWVyICE9PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIC8vIENPUlMgc3VjY2VlZGVkXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGltYWdlT2JqLnRpbWVyICk7XG4gICAgICB9XG5cbiAgICAgIGltYWdlcy5udW1Mb2FkZWQrKztcbiAgICAgIGltYWdlT2JqLnN1Y2NlZWRlZCA9IHRydWU7XG4gICAgICBpbWcub25lcnJvciA9IGltZy5vbmxvYWQgPSBudWxsO1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoaW1nLmNyb3NzT3JpZ2luID09PSBcImFub255bW91c1wiKSB7XG4gICAgICAgIC8vIENPUlMgZmFpbGVkXG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoIGltYWdlT2JqLnRpbWVyICk7XG5cbiAgICAgICAgLy8gbGV0J3MgdHJ5IHdpdGggcHJveHkgaW5zdGVhZFxuICAgICAgICBpZiAoIG9wdGlvbnMucHJveHkgKSB7XG4gICAgICAgICAgdmFyIHNyYyA9IGltZy5zcmM7XG4gICAgICAgICAgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgaW1hZ2VPYmouaW1nID0gaW1nO1xuICAgICAgICAgIGltZy5zcmMgPSBzcmM7XG5cbiAgICAgICAgICBwcm94eUdldEltYWdlKCBpbWcuc3JjLCBpbWcsIGltYWdlT2JqICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGltYWdlcy5udW1Mb2FkZWQrKztcbiAgICAgIGltYWdlcy5udW1GYWlsZWQrKztcbiAgICAgIGltYWdlT2JqLnN1Y2NlZWRlZCA9IGZhbHNlO1xuICAgICAgaW1nLm9uZXJyb3IgPSBpbWcub25sb2FkID0gbnVsbDtcbiAgICAgIHN0YXJ0KCk7XG4gICAgfTtcbiAgfVxuXG4gIG1ldGhvZHMgPSB7XG4gICAgbG9hZEltYWdlOiBmdW5jdGlvbiggc3JjICkge1xuICAgICAgdmFyIGltZywgaW1hZ2VPYmo7XG4gICAgICBpZiAoIHNyYyAmJiBpbWFnZXNbc3JjXSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgaWYgKCBzcmMubWF0Y2goL2RhdGE6aW1hZ2VcXC8uKjtiYXNlNjQsL2kpICkge1xuICAgICAgICAgIGltZy5zcmMgPSBzcmMucmVwbGFjZSgvdXJsXFwoWydcIl17MCx9fFsnXCJdezAsfVxcKSQvaWcsICcnKTtcbiAgICAgICAgICBpbWFnZU9iaiA9IGltYWdlc1tzcmNdID0ge1xuICAgICAgICAgICAgaW1nOiBpbWdcbiAgICAgICAgICB9O1xuICAgICAgICAgIGltYWdlcy5udW1Ub3RhbCsrO1xuICAgICAgICAgIHNldEltYWdlTG9hZEhhbmRsZXJzKGltZywgaW1hZ2VPYmopO1xuICAgICAgICB9IGVsc2UgaWYgKCBpc1NhbWVPcmlnaW4oIHNyYyApIHx8IG9wdGlvbnMuYWxsb3dUYWludCA9PT0gIHRydWUgKSB7XG4gICAgICAgICAgaW1hZ2VPYmogPSBpbWFnZXNbc3JjXSA9IHtcbiAgICAgICAgICAgIGltZzogaW1nXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbWFnZXMubnVtVG90YWwrKztcbiAgICAgICAgICBzZXRJbWFnZUxvYWRIYW5kbGVycyhpbWcsIGltYWdlT2JqKTtcbiAgICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICB9IGVsc2UgaWYgKCBzdXBwb3J0Q09SUyAmJiAhb3B0aW9ucy5hbGxvd1RhaW50ICYmIG9wdGlvbnMudXNlQ09SUyApIHtcbiAgICAgICAgICAvLyBhdHRlbXB0IHRvIGxvYWQgd2l0aCBDT1JTXG5cbiAgICAgICAgICBpbWcuY3Jvc3NPcmlnaW4gPSBcImFub255bW91c1wiO1xuICAgICAgICAgIGltYWdlT2JqID0gaW1hZ2VzW3NyY10gPSB7XG4gICAgICAgICAgICBpbWc6IGltZ1xuICAgICAgICAgIH07XG4gICAgICAgICAgaW1hZ2VzLm51bVRvdGFsKys7XG4gICAgICAgICAgc2V0SW1hZ2VMb2FkSGFuZGxlcnMoaW1nLCBpbWFnZU9iaik7XG4gICAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICAgICAgfSBlbHNlIGlmICggb3B0aW9ucy5wcm94eSApIHtcbiAgICAgICAgICBpbWFnZU9iaiA9IGltYWdlc1tzcmNdID0ge1xuICAgICAgICAgICAgaW1nOiBpbWdcbiAgICAgICAgICB9O1xuICAgICAgICAgIGltYWdlcy5udW1Ub3RhbCsrO1xuICAgICAgICAgIHByb3h5R2V0SW1hZ2UoIHNyYywgaW1nLCBpbWFnZU9iaiApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9LFxuICAgIGNsZWFudXBET006IGZ1bmN0aW9uKGNhdXNlKSB7XG4gICAgICB2YXIgaW1nLCBzcmM7XG4gICAgICBpZiAoIWltYWdlcy5jbGVhbnVwRG9uZSkge1xuICAgICAgICBpZiAoY2F1c2UgJiYgdHlwZW9mIGNhdXNlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogQ2xlYW51cCBiZWNhdXNlOiBcIiArIGNhdXNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBDbGVhbnVwIGFmdGVyIHRpbWVvdXQ6IFwiICsgb3B0aW9ucy50aW1lb3V0ICsgXCIgbXMuXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChzcmMgaW4gaW1hZ2VzKSB7XG4gICAgICAgICAgaWYgKGltYWdlcy5oYXNPd25Qcm9wZXJ0eShzcmMpKSB7XG4gICAgICAgICAgICBpbWcgPSBpbWFnZXNbc3JjXTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW1nID09PSBcIm9iamVjdFwiICYmIGltZy5jYWxsYmFja25hbWUgJiYgaW1nLnN1Y2NlZWRlZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIC8vIGNhbmNlbCBwcm94eSBpbWFnZSByZXF1ZXN0XG4gICAgICAgICAgICAgIHdpbmRvd1tpbWcuY2FsbGJhY2tuYW1lXSA9IHVuZGVmaW5lZDsgLy8gdG8gd29yayB3aXRoIElFPDkgIC8vIE5PVEU6IHRoYXQgdGhlIHVuZGVmaW5lZCBjYWxsYmFjayBwcm9wZXJ0eS1uYW1lIHN0aWxsIGV4aXN0cyBvbiB0aGUgd2luZG93IG9iamVjdCAoZm9yIElFPDkpXG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHdpbmRvd1tpbWcuY2FsbGJhY2tuYW1lXTsgIC8vIGZvciBhbGwgYnJvd3NlciB0aGF0IHN1cHBvcnQgdGhpc1xuICAgICAgICAgICAgICB9IGNhdGNoKGV4KSB7fVxuICAgICAgICAgICAgICBpZiAoaW1nLnNjcmlwdCAmJiBpbWcuc2NyaXB0LnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpbWcuc2NyaXB0LnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImFib3V0OmJsYW5rXCIpOyAgLy8gdHJ5IHRvIGNhbmNlbCBydW5uaW5nIHJlcXVlc3RcbiAgICAgICAgICAgICAgICBpbWcuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaW1nLnNjcmlwdCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaW1hZ2VzLm51bUxvYWRlZCsrO1xuICAgICAgICAgICAgICBpbWFnZXMubnVtRmFpbGVkKys7XG4gICAgICAgICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IENsZWFuZWQgdXAgZmFpbGVkIGltZzogJ1wiICsgc3JjICsgXCInIFN0ZXBzOiBcIiArIGltYWdlcy5udW1Mb2FkZWQgKyBcIiAvIFwiICsgaW1hZ2VzLm51bVRvdGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYW5jZWwgYW55IHBlbmRpbmcgcmVxdWVzdHNcbiAgICAgICAgaWYod2luZG93LnN0b3AgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHdpbmRvdy5zdG9wKCk7XG4gICAgICAgIH0gZWxzZSBpZihkb2N1bWVudC5leGVjQ29tbWFuZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoXCJTdG9wXCIsIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9jdW1lbnQuY2xvc2UgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRvY3VtZW50LmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaW1hZ2VzLmNsZWFudXBEb25lID0gdHJ1ZTtcbiAgICAgICAgaWYgKCEoY2F1c2UgJiYgdHlwZW9mIGNhdXNlID09PSBcInN0cmluZ1wiKSkge1xuICAgICAgICAgIHN0YXJ0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyaW5nRG9uZTogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGltZW91dFRpbWVyKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQodGltZW91dFRpbWVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgaWYgKG9wdGlvbnMudGltZW91dCA+IDApIHtcbiAgICB0aW1lb3V0VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChtZXRob2RzLmNsZWFudXBET00sIG9wdGlvbnMudGltZW91dCk7XG4gIH1cblxuICBVdGlsLmxvZygnaHRtbDJjYW52YXM6IFByZWxvYWQgc3RhcnRzOiBmaW5kaW5nIGJhY2tncm91bmQtaW1hZ2VzJyk7XG4gIGltYWdlcy5maXJzdFJ1biA9IHRydWU7XG5cbiAgZ2V0SW1hZ2VzKGVsZW1lbnQpO1xuXG4gIFV0aWwubG9nKCdodG1sMmNhbnZhczogUHJlbG9hZDogRmluZGluZyBpbWFnZXMnKTtcbiAgLy8gbG9hZCA8aW1nPiBpbWFnZXNcbiAgZm9yIChpID0gMDsgaSA8IGltZ0xlbjsgaSs9MSl7XG4gICAgbWV0aG9kcy5sb2FkSW1hZ2UoIGRvbUltYWdlc1tpXS5nZXRBdHRyaWJ1dGUoIFwic3JjXCIgKSApO1xuICB9XG5cbiAgaW1hZ2VzLmZpcnN0UnVuID0gZmFsc2U7XG4gIFV0aWwubG9nKCdodG1sMmNhbnZhczogUHJlbG9hZDogRG9uZS4nKTtcbiAgaWYgKGltYWdlcy5udW1Ub3RhbCA9PT0gaW1hZ2VzLm51bUxvYWRlZCkge1xuICAgIHN0YXJ0KCk7XG4gIH1cblxuICByZXR1cm4gbWV0aG9kcztcbn07XG5cbl9odG1sMmNhbnZhcy5SZW5kZXJlciA9IGZ1bmN0aW9uKHBhcnNlUXVldWUsIG9wdGlvbnMpe1xuXG4gIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL0NTUzIxL3ppbmRleC5odG1sXG4gIGZ1bmN0aW9uIGNyZWF0ZVJlbmRlclF1ZXVlKHBhcnNlUXVldWUpIHtcbiAgICB2YXIgcXVldWUgPSBbXSxcbiAgICByb290Q29udGV4dDtcblxuICAgIHJvb3RDb250ZXh0ID0gKGZ1bmN0aW9uIGJ1aWxkU3RhY2tpbmdDb250ZXh0KHJvb3ROb2RlKSB7XG4gICAgICB2YXIgcm9vdENvbnRleHQgPSB7fTtcbiAgICAgIGZ1bmN0aW9uIGluc2VydChjb250ZXh0LCBub2RlLCBzcGVjaWFsUGFyZW50KSB7XG4gICAgICAgIHZhciB6aSA9IChub2RlLnpJbmRleC56aW5kZXggPT09ICdhdXRvJykgPyAwIDogTnVtYmVyKG5vZGUuekluZGV4LnppbmRleCksXG4gICAgICAgIGNvbnRleHRGb3JDaGlsZHJlbiA9IGNvbnRleHQsIC8vIHRoZSBzdGFja2luZyBjb250ZXh0IGZvciBjaGlsZHJlblxuICAgICAgICBpc1Bvc2l0aW9uZWQgPSBub2RlLnpJbmRleC5pc1Bvc2l0aW9uZWQsXG4gICAgICAgIGlzRmxvYXRlZCA9IG5vZGUuekluZGV4LmlzRmxvYXRlZCxcbiAgICAgICAgc3R1YiA9IHtub2RlOiBub2RlfSxcbiAgICAgICAgY2hpbGRyZW5EZXN0ID0gc3BlY2lhbFBhcmVudDsgLy8gd2hlcmUgY2hpbGRyZW4gd2l0aG91dCB6LWluZGV4IHNob3VsZCBiZSBwdXNoZWQgaW50b1xuXG4gICAgICAgIGlmIChub2RlLnpJbmRleC5vd25TdGFja2luZykge1xuICAgICAgICAgIC8vICchJyBjb21lcyBiZWZvcmUgbnVtYmVycyBpbiBzb3J0ZWQgYXJyYXlcbiAgICAgICAgICBjb250ZXh0Rm9yQ2hpbGRyZW4gPSBzdHViLmNvbnRleHQgPSB7ICchJzogW3tub2RlOm5vZGUsIGNoaWxkcmVuOiBbXX1dfTtcbiAgICAgICAgICBjaGlsZHJlbkRlc3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNQb3NpdGlvbmVkIHx8IGlzRmxvYXRlZCkge1xuICAgICAgICAgIGNoaWxkcmVuRGVzdCA9IHN0dWIuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh6aSA9PT0gMCAmJiBzcGVjaWFsUGFyZW50KSB7XG4gICAgICAgICAgc3BlY2lhbFBhcmVudC5wdXNoKHN0dWIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghY29udGV4dFt6aV0pIHsgY29udGV4dFt6aV0gPSBbXTsgfVxuICAgICAgICAgIGNvbnRleHRbemldLnB1c2goc3R1Yik7XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLnpJbmRleC5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGNoaWxkTm9kZSkge1xuICAgICAgICAgIGluc2VydChjb250ZXh0Rm9yQ2hpbGRyZW4sIGNoaWxkTm9kZSwgY2hpbGRyZW5EZXN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpbnNlcnQocm9vdENvbnRleHQsIHJvb3ROb2RlKTtcbiAgICAgIHJldHVybiByb290Q29udGV4dDtcbiAgICB9KShwYXJzZVF1ZXVlKTtcblxuICAgIGZ1bmN0aW9uIHNvcnRaKGNvbnRleHQpIHtcbiAgICAgIE9iamVjdC5rZXlzKGNvbnRleHQpLnNvcnQoKS5mb3JFYWNoKGZ1bmN0aW9uKHppKSB7XG4gICAgICAgIHZhciBub25Qb3NpdGlvbmVkID0gW10sXG4gICAgICAgIGZsb2F0ZWQgPSBbXSxcbiAgICAgICAgcG9zaXRpb25lZCA9IFtdLFxuICAgICAgICBsaXN0ID0gW107XG5cbiAgICAgICAgLy8gcG9zaXRpb25lZCBhZnRlciBzdGF0aWNcbiAgICAgICAgY29udGV4dFt6aV0uZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgaWYgKHYubm9kZS56SW5kZXguaXNQb3NpdGlvbmVkIHx8IHYubm9kZS56SW5kZXgub3BhY2l0eSA8IDEpIHtcbiAgICAgICAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtY29sb3IvI3RyYW5zcGFyZW5jeVxuICAgICAgICAgICAgLy8gbm9uLXBvc2l0aW9uZWQgZWxlbWVudCB3aXRoIG9wYWN0aXkgPCAxIHNob3VsZCBiZSBzdGFja2VkIGFzIGlmIGl0IHdlcmUgYSBwb3NpdGlvbmVkIGVsZW1lbnQgd2l0aCDigJh6LWluZGV4OiAw4oCZIGFuZCDigJhvcGFjaXR5OiAx4oCZLlxuICAgICAgICAgICAgcG9zaXRpb25lZC5wdXNoKHYpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodi5ub2RlLnpJbmRleC5pc0Zsb2F0ZWQpIHtcbiAgICAgICAgICAgIGZsb2F0ZWQucHVzaCh2KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9uUG9zaXRpb25lZC5wdXNoKHYpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgKGZ1bmN0aW9uIHdhbGsoYXJyKSB7XG4gICAgICAgICAgYXJyLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgICAgbGlzdC5wdXNoKHYpO1xuICAgICAgICAgICAgaWYgKHYuY2hpbGRyZW4pIHsgd2Fsayh2LmNoaWxkcmVuKTsgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KShub25Qb3NpdGlvbmVkLmNvbmNhdChmbG9hdGVkLCBwb3NpdGlvbmVkKSk7XG5cbiAgICAgICAgbGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICBpZiAodi5jb250ZXh0KSB7XG4gICAgICAgICAgICBzb3J0Wih2LmNvbnRleHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBxdWV1ZS5wdXNoKHYubm9kZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNvcnRaKHJvb3RDb250ZXh0KTtcblxuICAgIHJldHVybiBxdWV1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFJlbmRlcmVyKHJlbmRlcmVyTmFtZSkge1xuICAgIHZhciByZW5kZXJlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5yZW5kZXJlciA9PT0gXCJzdHJpbmdcIiAmJiBfaHRtbDJjYW52YXMuUmVuZGVyZXJbcmVuZGVyZXJOYW1lXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZW5kZXJlciA9IF9odG1sMmNhbnZhcy5SZW5kZXJlcltyZW5kZXJlck5hbWVdKG9wdGlvbnMpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlbmRlcmVyTmFtZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICByZW5kZXJlciA9IHJlbmRlcmVyTmFtZShvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiVW5rbm93biByZW5kZXJlclwiKTtcbiAgICB9XG5cbiAgICBpZiAoIHR5cGVvZiByZW5kZXJlciAhPT0gXCJmdW5jdGlvblwiICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCByZW5kZXJlciBkZWZpbmVkXCIpO1xuICAgIH1cbiAgICByZXR1cm4gcmVuZGVyZXI7XG4gIH1cblxuICByZXR1cm4gZ2V0UmVuZGVyZXIob3B0aW9ucy5yZW5kZXJlcikocGFyc2VRdWV1ZSwgb3B0aW9ucywgZG9jdW1lbnQsIGNyZWF0ZVJlbmRlclF1ZXVlKHBhcnNlUXVldWUuc3RhY2spLCBfaHRtbDJjYW52YXMpO1xufTtcblxuX2h0bWwyY2FudmFzLlV0aWwuU3VwcG9ydCA9IGZ1bmN0aW9uIChvcHRpb25zLCBkb2MpIHtcblxuICBmdW5jdGlvbiBzdXBwb3J0U1ZHUmVuZGVyaW5nKCkge1xuICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKSxcbiAgICBjYW52YXMgPSBkb2MuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcbiAgICBjdHggPSAoY2FudmFzLmdldENvbnRleHQgPT09IHVuZGVmaW5lZCkgPyBmYWxzZSA6IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgaWYgKGN0eCA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLmhlaWdodCA9IDEwO1xuICAgIGltZy5zcmMgPSBbXG4gICAgXCJkYXRhOmltYWdlL3N2Zyt4bWwsXCIsXG4gICAgXCI8c3ZnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zycgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJz5cIixcbiAgICBcIjxmb3JlaWduT2JqZWN0IHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+XCIsXG4gICAgXCI8ZGl2IHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sJyBzdHlsZT0nd2lkdGg6MTA7aGVpZ2h0OjEwOyc+XCIsXG4gICAgXCJzdXBcIixcbiAgICBcIjwvZGl2PlwiLFxuICAgIFwiPC9mb3JlaWduT2JqZWN0PlwiLFxuICAgIFwiPC9zdmc+XCJcbiAgICBdLmpvaW4oXCJcIik7XG4gICAgdHJ5IHtcbiAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgIGNhbnZhcy50b0RhdGFVUkwoKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgX2h0bWwyY2FudmFzLlV0aWwubG9nKCdodG1sMmNhbnZhczogUGFyc2U6IFNWRyBwb3dlcmVkIHJlbmRlcmluZyBhdmFpbGFibGUnKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIFRlc3Qgd2hldGhlciB3ZSBjYW4gdXNlIHJhbmdlcyB0byBtZWFzdXJlIGJvdW5kaW5nIGJveGVzXG4gIC8vIE9wZXJhIGRvZXNuJ3QgcHJvdmlkZSB2YWxpZCBib3VuZHMuaGVpZ2h0L2JvdHRvbSBldmVuIHRob3VnaCBpdCBzdXBwb3J0cyB0aGUgbWV0aG9kLlxuXG4gIGZ1bmN0aW9uIHN1cHBvcnRSYW5nZUJvdW5kcygpIHtcbiAgICB2YXIgciwgdGVzdEVsZW1lbnQsIHJhbmdlQm91bmRzLCByYW5nZUhlaWdodCwgc3VwcG9ydCA9IGZhbHNlO1xuXG4gICAgaWYgKGRvYy5jcmVhdGVSYW5nZSkge1xuICAgICAgciA9IGRvYy5jcmVhdGVSYW5nZSgpO1xuICAgICAgaWYgKHIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KSB7XG4gICAgICAgIHRlc3RFbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2JvdW5kdGVzdCcpO1xuICAgICAgICB0ZXN0RWxlbWVudC5zdHlsZS5oZWlnaHQgPSBcIjEyM3B4XCI7XG4gICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKHRlc3RFbGVtZW50KTtcblxuICAgICAgICByLnNlbGVjdE5vZGUodGVzdEVsZW1lbnQpO1xuICAgICAgICByYW5nZUJvdW5kcyA9IHIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHJhbmdlSGVpZ2h0ID0gcmFuZ2VCb3VuZHMuaGVpZ2h0O1xuXG4gICAgICAgIGlmIChyYW5nZUhlaWdodCA9PT0gMTIzKSB7XG4gICAgICAgICAgc3VwcG9ydCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQodGVzdEVsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzdXBwb3J0O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByYW5nZUJvdW5kczogc3VwcG9ydFJhbmdlQm91bmRzKCksXG4gICAgc3ZnUmVuZGVyaW5nOiBvcHRpb25zLnN2Z1JlbmRlcmluZyAmJiBzdXBwb3J0U1ZHUmVuZGVyaW5nKClcbiAgfTtcbn07XG5cbndpbmRvdy5odG1sMmNhbnZhcz1mdW5jdGlvbihlbGVtZW50cywgb3B0cykge1xuICBlbGVtZW50cyA9IChlbGVtZW50cy5sZW5ndGgpID8gZWxlbWVudHMgOiBbZWxlbWVudHNdO1xuICB2YXIgcXVldWUsXG4gIGNhbnZhcyxcbiAgb3B0aW9ucyA9IHtcbiAgICAvLyBnZW5lcmFsXG4gICAgbG9nZ2luZzogZmFsc2UsXG4gICAgZWxlbWVudHM6IGVsZW1lbnRzLFxuICAgIGJhY2tncm91bmQ6IFwiI2ZmZlwiLFxuXG4gICAgLy8gcHJlbG9hZCBvcHRpb25zXG4gICAgcHJveHk6IG51bGwsXG4gICAgdGltZW91dDogMCwgICAgLy8gbm8gdGltZW91dFxuICAgIHVzZUNPUlM6IGZhbHNlLCAvLyB0cnkgdG8gbG9hZCBpbWFnZXMgYXMgQ09SUyAod2hlcmUgYXZhaWxhYmxlKSwgYmVmb3JlIGZhbGxpbmcgYmFjayB0byBwcm94eVxuICAgIGFsbG93VGFpbnQ6IGZhbHNlLCAvLyB3aGV0aGVyIHRvIGFsbG93IGltYWdlcyB0byB0YWludCB0aGUgY2FudmFzLCB3b24ndCBuZWVkIHByb3h5IGlmIHNldCB0byB0cnVlXG5cbiAgICAvLyBwYXJzZSBvcHRpb25zXG4gICAgc3ZnUmVuZGVyaW5nOiBmYWxzZSwgLy8gdXNlIHN2ZyBwb3dlcmVkIHJlbmRlcmluZyB3aGVyZSBhdmFpbGFibGUgKEZGMTErKVxuICAgIGlnbm9yZUVsZW1lbnRzOiBcIklGUkFNRXxPQkpFQ1R8UEFSQU1cIixcbiAgICB1c2VPdmVyZmxvdzogdHJ1ZSxcbiAgICBsZXR0ZXJSZW5kZXJpbmc6IGZhbHNlLFxuICAgIGNoaW5lc2U6IGZhbHNlLFxuXG4gICAgLy8gcmVuZGVyIG9wdGlvbnNcblxuICAgIHdpZHRoOiBudWxsLFxuICAgIGhlaWdodDogbnVsbCxcbiAgICB0YWludFRlc3Q6IHRydWUsIC8vIGRvIGEgdGFpbnQgdGVzdCB3aXRoIGFsbCBpbWFnZXMgYmVmb3JlIGFwcGx5aW5nIHRvIGNhbnZhc1xuICAgIHJlbmRlcmVyOiBcIkNhbnZhc1wiXG4gIH07XG5cbiAgb3B0aW9ucyA9IF9odG1sMmNhbnZhcy5VdGlsLkV4dGVuZChvcHRzLCBvcHRpb25zKTtcblxuICBfaHRtbDJjYW52YXMubG9nZ2luZyA9IG9wdGlvbnMubG9nZ2luZztcbiAgb3B0aW9ucy5jb21wbGV0ZSA9IGZ1bmN0aW9uKCBpbWFnZXMgKSB7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMub25wcmVsb2FkZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKCBvcHRpb25zLm9ucHJlbG9hZGVkKCBpbWFnZXMgKSA9PT0gZmFsc2UgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgcXVldWUgPSBfaHRtbDJjYW52YXMuUGFyc2UoIGltYWdlcywgb3B0aW9ucyApO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm9ucGFyc2VkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGlmICggb3B0aW9ucy5vbnBhcnNlZCggcXVldWUgKSA9PT0gZmFsc2UgKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjYW52YXMgPSBfaHRtbDJjYW52YXMuUmVuZGVyZXIoIHF1ZXVlLCBvcHRpb25zICk7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMub25yZW5kZXJlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBvcHRpb25zLm9ucmVuZGVyZWQoIGNhbnZhcyApO1xuICAgIH1cblxuXG4gIH07XG5cbiAgLy8gZm9yIHBhZ2VzIHdpdGhvdXQgaW1hZ2VzLCB3ZSBzdGlsbCB3YW50IHRoaXMgdG8gYmUgYXN5bmMsIGkuZS4gcmV0dXJuIG1ldGhvZHMgYmVmb3JlIGV4ZWN1dGluZ1xuICB3aW5kb3cuc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICBfaHRtbDJjYW52YXMuUHJlbG9hZCggb3B0aW9ucyApO1xuICB9LCAwICk7XG5cbiAgcmV0dXJuIHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uKCBxdWV1ZSwgb3B0cyApIHtcbiAgICAgIHJldHVybiBfaHRtbDJjYW52YXMuUmVuZGVyZXIoIHF1ZXVlLCBfaHRtbDJjYW52YXMuVXRpbC5FeHRlbmQob3B0cywgb3B0aW9ucykgKTtcbiAgICB9LFxuICAgIHBhcnNlOiBmdW5jdGlvbiggaW1hZ2VzLCBvcHRzICkge1xuICAgICAgcmV0dXJuIF9odG1sMmNhbnZhcy5QYXJzZSggaW1hZ2VzLCBfaHRtbDJjYW52YXMuVXRpbC5FeHRlbmQob3B0cywgb3B0aW9ucykgKTtcbiAgICB9LFxuICAgIHByZWxvYWQ6IGZ1bmN0aW9uKCBvcHRzICkge1xuICAgICAgcmV0dXJuIF9odG1sMmNhbnZhcy5QcmVsb2FkKCBfaHRtbDJjYW52YXMuVXRpbC5FeHRlbmQob3B0cywgb3B0aW9ucykgKTtcbiAgICB9LFxuICAgIGxvZzogX2h0bWwyY2FudmFzLlV0aWwubG9nXG4gIH07XG59O1xuXG53aW5kb3cuaHRtbDJjYW52YXMubG9nID0gX2h0bWwyY2FudmFzLlV0aWwubG9nOyAvLyBmb3IgcmVuZGVyZXJzXG53aW5kb3cuaHRtbDJjYW52YXMuUmVuZGVyZXIgPSB7XG4gIENhbnZhczogdW5kZWZpbmVkIC8vIFdlIGFyZSBhc3N1bWluZyB0aGlzIHdpbGwgYmUgdXNlZFxufTtcblxubW9kdWxlLmV4cG9ydHM9d2luZG93Lmh0bWwyY2FudmFzO1xuXG5faHRtbDJjYW52YXMuUmVuZGVyZXIuQ2FudmFzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgZG9jID0gZG9jdW1lbnQsXG4gIHNhZmVJbWFnZXMgPSBbXSxcbiAgdGVzdENhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksXG4gIHRlc3RjdHggPSB0ZXN0Q2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcbiAgVXRpbCA9IF9odG1sMmNhbnZhcy5VdGlsLFxuICBjYW52YXMgPSBvcHRpb25zLmNhbnZhcyB8fCBkb2MuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgZnVuY3Rpb24gY3JlYXRlU2hhcGUoY3R4LCBhcmdzKSB7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGFyZ3MuZm9yRWFjaChmdW5jdGlvbihhcmcpIHtcbiAgICAgIGN0eFthcmcubmFtZV0uYXBwbHkoY3R4LCBhcmdbJ2FyZ3VtZW50cyddKTtcbiAgICB9KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gIH1cblxuICBmdW5jdGlvbiBzYWZlSW1hZ2UoaXRlbSkge1xuICAgIGlmIChzYWZlSW1hZ2VzLmluZGV4T2YoaXRlbVsnYXJndW1lbnRzJ11bMF0uc3JjICkgPT09IC0xKSB7XG4gICAgICB0ZXN0Y3R4LmRyYXdJbWFnZShpdGVtWydhcmd1bWVudHMnXVswXSwgMCwgMCk7XG4gICAgICB0cnkge1xuICAgICAgICB0ZXN0Y3R4LmdldEltYWdlRGF0YSgwLCAwLCAxLCAxKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICB0ZXN0Q2FudmFzID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIHRlc3RjdHggPSB0ZXN0Q2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgc2FmZUltYWdlcy5wdXNoKGl0ZW1bJ2FyZ3VtZW50cyddWzBdLnNyYyk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySXRlbShjdHgsIGl0ZW0pIHtcbiAgICBzd2l0Y2goaXRlbS50eXBlKXtcbiAgICAgIGNhc2UgXCJ2YXJpYWJsZVwiOlxuICAgICAgICBjdHhbaXRlbS5uYW1lXSA9IGl0ZW1bJ2FyZ3VtZW50cyddO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgICBzd2l0Y2goaXRlbS5uYW1lKSB7XG4gICAgICAgICAgY2FzZSBcImNyZWF0ZVBhdHRlcm5cIjpcbiAgICAgICAgICAgIGlmIChpdGVtWydhcmd1bWVudHMnXVswXS53aWR0aCA+IDAgJiYgaXRlbVsnYXJndW1lbnRzJ11bMF0uaGVpZ2h0ID4gMCkge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjdHguY3JlYXRlUGF0dGVybihpdGVtWydhcmd1bWVudHMnXVswXSwgXCJyZXBlYXRcIik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY2F0Y2goZSkge1xuICAgICAgICAgICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IFJlbmRlcmVyOiBFcnJvciBjcmVhdGluZyBwYXR0ZXJuXCIsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJkcmF3U2hhcGVcIjpcbiAgICAgICAgICAgIGNyZWF0ZVNoYXBlKGN0eCwgaXRlbVsnYXJndW1lbnRzJ10pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcImRyYXdJbWFnZVwiOlxuICAgICAgICAgICAgaWYgKGl0ZW1bJ2FyZ3VtZW50cyddWzhdID4gMCAmJiBpdGVtWydhcmd1bWVudHMnXVs3XSA+IDApIHtcbiAgICAgICAgICAgICAgaWYgKCFvcHRpb25zLnRhaW50VGVzdCB8fCAob3B0aW9ucy50YWludFRlc3QgJiYgc2FmZUltYWdlKGl0ZW0pKSkge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UuYXBwbHkoIGN0eCwgaXRlbVsnYXJndW1lbnRzJ10gKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGN0eFtpdGVtLm5hbWVdLmFwcGx5KGN0eCwgaXRlbVsnYXJndW1lbnRzJ10pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihwYXJzZWREYXRhLCBvcHRpb25zLCBkb2N1bWVudCwgcXVldWUsIF9odG1sMmNhbnZhcykge1xuICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxuICAgIG5ld0NhbnZhcyxcbiAgICBib3VuZHMsXG4gICAgZnN0eWxlLFxuICAgIHpTdGFjayA9IHBhcnNlZERhdGEuc3RhY2s7XG5cbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMuc3R5bGUud2lkdGggPSAgb3B0aW9ucy53aWR0aCB8fCB6U3RhY2suY3R4LndpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gb3B0aW9ucy5oZWlnaHQgfHwgelN0YWNrLmN0eC5oZWlnaHQ7XG5cbiAgICBmc3R5bGUgPSBjdHguZmlsbFN0eWxlO1xuICAgIGN0eC5maWxsU3R5bGUgPSAoVXRpbC5pc1RyYW5zcGFyZW50KHpTdGFjay5iYWNrZ3JvdW5kQ29sb3IpICYmIG9wdGlvbnMuYmFja2dyb3VuZCAhPT0gdW5kZWZpbmVkKSA/IG9wdGlvbnMuYmFja2dyb3VuZCA6IHBhcnNlZERhdGEuYmFja2dyb3VuZENvbG9yO1xuICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgIGN0eC5maWxsU3R5bGUgPSBmc3R5bGU7XG5cbiAgICBxdWV1ZS5mb3JFYWNoKGZ1bmN0aW9uKHN0b3JhZ2VDb250ZXh0KSB7XG4gICAgICAvLyBzZXQgY29tbW9uIHNldHRpbmdzIGZvciBjYW52YXNcbiAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBcImJvdHRvbVwiO1xuICAgICAgY3R4LnNhdmUoKTtcblxuICAgICAgaWYgKHN0b3JhZ2VDb250ZXh0LnRyYW5zZm9ybS5tYXRyaXgpIHtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZShzdG9yYWdlQ29udGV4dC50cmFuc2Zvcm0ub3JpZ2luWzBdLCBzdG9yYWdlQ29udGV4dC50cmFuc2Zvcm0ub3JpZ2luWzFdKTtcbiAgICAgICAgY3R4LnRyYW5zZm9ybS5hcHBseShjdHgsIHN0b3JhZ2VDb250ZXh0LnRyYW5zZm9ybS5tYXRyaXgpO1xuICAgICAgICBjdHgudHJhbnNsYXRlKC1zdG9yYWdlQ29udGV4dC50cmFuc2Zvcm0ub3JpZ2luWzBdLCAtc3RvcmFnZUNvbnRleHQudHJhbnNmb3JtLm9yaWdpblsxXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdG9yYWdlQ29udGV4dC5jbGlwKXtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgucmVjdChzdG9yYWdlQ29udGV4dC5jbGlwLmxlZnQsIHN0b3JhZ2VDb250ZXh0LmNsaXAudG9wLCBzdG9yYWdlQ29udGV4dC5jbGlwLndpZHRoLCBzdG9yYWdlQ29udGV4dC5jbGlwLmhlaWdodCk7XG4gICAgICAgIGN0eC5jbGlwKCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdG9yYWdlQ29udGV4dC5jdHguc3RvcmFnZSkge1xuICAgICAgICBzdG9yYWdlQ29udGV4dC5jdHguc3RvcmFnZS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZW5kZXJJdGVtKGN0eCwgaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0pO1xuXG4gICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogUmVuZGVyZXI6IENhbnZhcyByZW5kZXJlciBkb25lIC0gcmV0dXJuaW5nIGNhbnZhcyBvYmpcIik7XG5cbiAgICBpZiAob3B0aW9ucy5lbGVtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5lbGVtZW50c1swXSA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmVsZW1lbnRzWzBdLm5vZGVOYW1lICE9PSBcIkJPRFlcIikge1xuICAgICAgICAvLyBjcm9wIGltYWdlIHRvIHRoZSBib3VuZHMgb2Ygc2VsZWN0ZWQgKHNpbmdsZSkgZWxlbWVudFxuICAgICAgICBib3VuZHMgPSBfaHRtbDJjYW52YXMuVXRpbC5Cb3VuZHMob3B0aW9ucy5lbGVtZW50c1swXSk7XG4gICAgICAgIG5ld0NhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBuZXdDYW52YXMud2lkdGggPSBNYXRoLmNlaWwoYm91bmRzLndpZHRoKTtcbiAgICAgICAgbmV3Q2FudmFzLmhlaWdodCA9IE1hdGguY2VpbChib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgY3R4ID0gbmV3Q2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICBjdHguZHJhd0ltYWdlKGNhbnZhcywgYm91bmRzLmxlZnQsIGJvdW5kcy50b3AsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCwgMCwgMCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgY2FudmFzID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIG5ld0NhbnZhcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FudmFzO1xuICB9O1xufTtcbn0pKHdpbmRvdyxkb2N1bWVudCk7IiwiLyohIFNvY2tldC5JTy5taW4uanMgYnVpbGQ6MC45LjE2LCBwcm9kdWN0aW9uLiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+IE1JVCBMaWNlbnNlZCAqL1xudmFyIGlvPVwidW5kZWZpbmVkXCI9PXR5cGVvZiBtb2R1bGU/e306bW9kdWxlLmV4cG9ydHM7KGZ1bmN0aW9uKCl7KGZ1bmN0aW9uKGEsYil7dmFyIGM9YTtjLnZlcnNpb249XCIwLjkuMTZcIixjLnByb3RvY29sPTEsYy50cmFuc3BvcnRzPVtdLGMuaj1bXSxjLnNvY2tldHM9e30sYy5jb25uZWN0PWZ1bmN0aW9uKGEsZCl7dmFyIGU9Yy51dGlsLnBhcnNlVXJpKGEpLGYsZztiJiZiLmxvY2F0aW9uJiYoZS5wcm90b2NvbD1lLnByb3RvY29sfHxiLmxvY2F0aW9uLnByb3RvY29sLnNsaWNlKDAsLTEpLGUuaG9zdD1lLmhvc3R8fChiLmRvY3VtZW50P2IuZG9jdW1lbnQuZG9tYWluOmIubG9jYXRpb24uaG9zdG5hbWUpLGUucG9ydD1lLnBvcnR8fGIubG9jYXRpb24ucG9ydCksZj1jLnV0aWwudW5pcXVlVXJpKGUpO3ZhciBoPXtob3N0OmUuaG9zdCxzZWN1cmU6XCJodHRwc1wiPT1lLnByb3RvY29sLHBvcnQ6ZS5wb3J0fHwoXCJodHRwc1wiPT1lLnByb3RvY29sPzQ0Mzo4MCkscXVlcnk6ZS5xdWVyeXx8XCJcIn07Yy51dGlsLm1lcmdlKGgsZCk7aWYoaFtcImZvcmNlIG5ldyBjb25uZWN0aW9uXCJdfHwhYy5zb2NrZXRzW2ZdKWc9bmV3IGMuU29ja2V0KGgpO3JldHVybiFoW1wiZm9yY2UgbmV3IGNvbm5lY3Rpb25cIl0mJmcmJihjLnNvY2tldHNbZl09ZyksZz1nfHxjLnNvY2tldHNbZl0sZy5vZihlLnBhdGgubGVuZ3RoPjE/ZS5wYXRoOlwiXCIpfX0pKFwib2JqZWN0XCI9PXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM6dGhpcy5pbz17fSx0aGlzKSxmdW5jdGlvbihhLGIpe3ZhciBjPWEudXRpbD17fSxkPS9eKD86KD8hW146QF0rOlteOkBcXC9dKkApKFteOlxcLz8jLl0rKTopPyg/OlxcL1xcLyk/KCg/OigoW146QF0qKSg/OjooW146QF0qKSk/KT9AKT8oW146XFwvPyNdKikoPzo6KFxcZCopKT8pKCgoXFwvKD86W14/I10oPyFbXj8jXFwvXSpcXC5bXj8jXFwvLl0rKD86Wz8jXXwkKSkpKlxcLz8pPyhbXj8jXFwvXSopKSg/OlxcPyhbXiNdKikpPyg/OiMoLiopKT8pLyxlPVtcInNvdXJjZVwiLFwicHJvdG9jb2xcIixcImF1dGhvcml0eVwiLFwidXNlckluZm9cIixcInVzZXJcIixcInBhc3N3b3JkXCIsXCJob3N0XCIsXCJwb3J0XCIsXCJyZWxhdGl2ZVwiLFwicGF0aFwiLFwiZGlyZWN0b3J5XCIsXCJmaWxlXCIsXCJxdWVyeVwiLFwiYW5jaG9yXCJdO2MucGFyc2VVcmk9ZnVuY3Rpb24oYSl7dmFyIGI9ZC5leGVjKGF8fFwiXCIpLGM9e30sZj0xNDt3aGlsZShmLS0pY1tlW2ZdXT1iW2ZdfHxcIlwiO3JldHVybiBjfSxjLnVuaXF1ZVVyaT1mdW5jdGlvbihhKXt2YXIgYz1hLnByb3RvY29sLGQ9YS5ob3N0LGU9YS5wb3J0O3JldHVyblwiZG9jdW1lbnRcImluIGI/KGQ9ZHx8ZG9jdW1lbnQuZG9tYWluLGU9ZXx8KGM9PVwiaHR0cHNcIiYmZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2whPT1cImh0dHBzOlwiPzQ0Mzpkb2N1bWVudC5sb2NhdGlvbi5wb3J0KSk6KGQ9ZHx8XCJsb2NhbGhvc3RcIiwhZSYmYz09XCJodHRwc1wiJiYoZT00NDMpKSwoY3x8XCJodHRwXCIpK1wiOi8vXCIrZCtcIjpcIisoZXx8ODApfSxjLnF1ZXJ5PWZ1bmN0aW9uKGEsYil7dmFyIGQ9Yy5jaHVua1F1ZXJ5KGF8fFwiXCIpLGU9W107Yy5tZXJnZShkLGMuY2h1bmtRdWVyeShifHxcIlwiKSk7Zm9yKHZhciBmIGluIGQpZC5oYXNPd25Qcm9wZXJ0eShmKSYmZS5wdXNoKGYrXCI9XCIrZFtmXSk7cmV0dXJuIGUubGVuZ3RoP1wiP1wiK2Uuam9pbihcIiZcIik6XCJcIn0sYy5jaHVua1F1ZXJ5PWZ1bmN0aW9uKGEpe3ZhciBiPXt9LGM9YS5zcGxpdChcIiZcIiksZD0wLGU9Yy5sZW5ndGgsZjtmb3IoO2Q8ZTsrK2QpZj1jW2RdLnNwbGl0KFwiPVwiKSxmWzBdJiYoYltmWzBdXT1mWzFdKTtyZXR1cm4gYn07dmFyIGY9ITE7Yy5sb2FkPWZ1bmN0aW9uKGEpe2lmKFwiZG9jdW1lbnRcImluIGImJmRvY3VtZW50LnJlYWR5U3RhdGU9PT1cImNvbXBsZXRlXCJ8fGYpcmV0dXJuIGEoKTtjLm9uKGIsXCJsb2FkXCIsYSwhMSl9LGMub249ZnVuY3Rpb24oYSxiLGMsZCl7YS5hdHRhY2hFdmVudD9hLmF0dGFjaEV2ZW50KFwib25cIitiLGMpOmEuYWRkRXZlbnRMaXN0ZW5lciYmYS5hZGRFdmVudExpc3RlbmVyKGIsYyxkKX0sYy5yZXF1ZXN0PWZ1bmN0aW9uKGEpe2lmKGEmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBYRG9tYWluUmVxdWVzdCYmIWMudWEuaGFzQ09SUylyZXR1cm4gbmV3IFhEb21haW5SZXF1ZXN0O2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBYTUxIdHRwUmVxdWVzdCYmKCFhfHxjLnVhLmhhc0NPUlMpKXJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7aWYoIWEpdHJ5e3JldHVybiBuZXcod2luZG93W1tcIkFjdGl2ZVwiXS5jb25jYXQoXCJPYmplY3RcIikuam9pbihcIlhcIildKShcIk1pY3Jvc29mdC5YTUxIVFRQXCIpfWNhdGNoKGIpe31yZXR1cm4gbnVsbH0sXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyYmYy5sb2FkKGZ1bmN0aW9uKCl7Zj0hMH0pLGMuZGVmZXI9ZnVuY3Rpb24oYSl7aWYoIWMudWEud2Via2l0fHxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW1wb3J0U2NyaXB0cylyZXR1cm4gYSgpO2MubG9hZChmdW5jdGlvbigpe3NldFRpbWVvdXQoYSwxMDApfSl9LGMubWVyZ2U9ZnVuY3Rpb24oYixkLGUsZil7dmFyIGc9Znx8W10saD10eXBlb2YgZT09XCJ1bmRlZmluZWRcIj8yOmUsaTtmb3IoaSBpbiBkKWQuaGFzT3duUHJvcGVydHkoaSkmJmMuaW5kZXhPZihnLGkpPDAmJih0eXBlb2YgYltpXSE9XCJvYmplY3RcInx8IWg/KGJbaV09ZFtpXSxnLnB1c2goZFtpXSkpOmMubWVyZ2UoYltpXSxkW2ldLGgtMSxnKSk7cmV0dXJuIGJ9LGMubWl4aW49ZnVuY3Rpb24oYSxiKXtjLm1lcmdlKGEucHJvdG90eXBlLGIucHJvdG90eXBlKX0sYy5pbmhlcml0PWZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYygpe31jLnByb3RvdHlwZT1iLnByb3RvdHlwZSxhLnByb3RvdHlwZT1uZXcgY30sYy5pc0FycmF5PUFycmF5LmlzQXJyYXl8fGZ1bmN0aW9uKGEpe3JldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYSk9PT1cIltvYmplY3QgQXJyYXldXCJ9LGMuaW50ZXJzZWN0PWZ1bmN0aW9uKGEsYil7dmFyIGQ9W10sZT1hLmxlbmd0aD5iLmxlbmd0aD9hOmIsZj1hLmxlbmd0aD5iLmxlbmd0aD9iOmE7Zm9yKHZhciBnPTAsaD1mLmxlbmd0aDtnPGg7ZysrKX5jLmluZGV4T2YoZSxmW2ddKSYmZC5wdXNoKGZbZ10pO3JldHVybiBkfSxjLmluZGV4T2Y9ZnVuY3Rpb24oYSxiLGMpe2Zvcih2YXIgZD1hLmxlbmd0aCxjPWM8MD9jK2Q8MD8wOmMrZDpjfHwwO2M8ZCYmYVtjXSE9PWI7YysrKTtyZXR1cm4gZDw9Yz8tMTpjfSxjLnRvQXJyYXk9ZnVuY3Rpb24oYSl7dmFyIGI9W107Zm9yKHZhciBjPTAsZD1hLmxlbmd0aDtjPGQ7YysrKWIucHVzaChhW2NdKTtyZXR1cm4gYn0sYy51YT17fSxjLnVhLmhhc0NPUlM9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFhNTEh0dHBSZXF1ZXN0JiZmdW5jdGlvbigpe3RyeXt2YXIgYT1uZXcgWE1MSHR0cFJlcXVlc3R9Y2F0Y2goYil7cmV0dXJuITF9cmV0dXJuIGEud2l0aENyZWRlbnRpYWxzIT11bmRlZmluZWR9KCksYy51YS53ZWJraXQ9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG5hdmlnYXRvciYmL3dlYmtpdC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCksYy51YS5pRGV2aWNlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBuYXZpZ2F0b3ImJi9pUGFkfGlQaG9uZXxpUG9kL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5leHBvcnRzLHRoaXMpLGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYygpe31hLkV2ZW50RW1pdHRlcj1jLGMucHJvdG90eXBlLm9uPWZ1bmN0aW9uKGEsYyl7cmV0dXJuIHRoaXMuJGV2ZW50c3x8KHRoaXMuJGV2ZW50cz17fSksdGhpcy4kZXZlbnRzW2FdP2IudXRpbC5pc0FycmF5KHRoaXMuJGV2ZW50c1thXSk/dGhpcy4kZXZlbnRzW2FdLnB1c2goYyk6dGhpcy4kZXZlbnRzW2FdPVt0aGlzLiRldmVudHNbYV0sY106dGhpcy4kZXZlbnRzW2FdPWMsdGhpc30sYy5wcm90b3R5cGUuYWRkTGlzdGVuZXI9Yy5wcm90b3R5cGUub24sYy5wcm90b3R5cGUub25jZT1mdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGQoKXtjLnJlbW92ZUxpc3RlbmVyKGEsZCksYi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9dmFyIGM9dGhpcztyZXR1cm4gZC5saXN0ZW5lcj1iLHRoaXMub24oYSxkKSx0aGlzfSxjLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbihhLGMpe2lmKHRoaXMuJGV2ZW50cyYmdGhpcy4kZXZlbnRzW2FdKXt2YXIgZD10aGlzLiRldmVudHNbYV07aWYoYi51dGlsLmlzQXJyYXkoZCkpe3ZhciBlPS0xO2Zvcih2YXIgZj0wLGc9ZC5sZW5ndGg7ZjxnO2YrKylpZihkW2ZdPT09Y3x8ZFtmXS5saXN0ZW5lciYmZFtmXS5saXN0ZW5lcj09PWMpe2U9ZjticmVha31pZihlPDApcmV0dXJuIHRoaXM7ZC5zcGxpY2UoZSwxKSxkLmxlbmd0aHx8ZGVsZXRlIHRoaXMuJGV2ZW50c1thXX1lbHNlKGQ9PT1jfHxkLmxpc3RlbmVyJiZkLmxpc3RlbmVyPT09YykmJmRlbGV0ZSB0aGlzLiRldmVudHNbYV19cmV0dXJuIHRoaXN9LGMucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1mdW5jdGlvbihhKXtyZXR1cm4gYT09PXVuZGVmaW5lZD8odGhpcy4kZXZlbnRzPXt9LHRoaXMpOih0aGlzLiRldmVudHMmJnRoaXMuJGV2ZW50c1thXSYmKHRoaXMuJGV2ZW50c1thXT1udWxsKSx0aGlzKX0sYy5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLiRldmVudHN8fCh0aGlzLiRldmVudHM9e30pLHRoaXMuJGV2ZW50c1thXXx8KHRoaXMuJGV2ZW50c1thXT1bXSksYi51dGlsLmlzQXJyYXkodGhpcy4kZXZlbnRzW2FdKXx8KHRoaXMuJGV2ZW50c1thXT1bdGhpcy4kZXZlbnRzW2FdXSksdGhpcy4kZXZlbnRzW2FdfSxjLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKGEpe2lmKCF0aGlzLiRldmVudHMpcmV0dXJuITE7dmFyIGM9dGhpcy4kZXZlbnRzW2FdO2lmKCFjKXJldHVybiExO3ZhciBkPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBjKWMuYXBwbHkodGhpcyxkKTtlbHNle2lmKCFiLnV0aWwuaXNBcnJheShjKSlyZXR1cm4hMTt2YXIgZT1jLnNsaWNlKCk7Zm9yKHZhciBmPTAsZz1lLmxlbmd0aDtmPGc7ZisrKWVbZl0uYXBwbHkodGhpcyxkKX1yZXR1cm4hMH19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzKSxmdW5jdGlvbihleHBvcnRzLG5hdGl2ZUpTT04pe2Z1bmN0aW9uIGYoYSl7cmV0dXJuIGE8MTA/XCIwXCIrYTphfWZ1bmN0aW9uIGRhdGUoYSxiKXtyZXR1cm4gaXNGaW5pdGUoYS52YWx1ZU9mKCkpP2EuZ2V0VVRDRnVsbFllYXIoKStcIi1cIitmKGEuZ2V0VVRDTW9udGgoKSsxKStcIi1cIitmKGEuZ2V0VVRDRGF0ZSgpKStcIlRcIitmKGEuZ2V0VVRDSG91cnMoKSkrXCI6XCIrZihhLmdldFVUQ01pbnV0ZXMoKSkrXCI6XCIrZihhLmdldFVUQ1NlY29uZHMoKSkrXCJaXCI6bnVsbH1mdW5jdGlvbiBxdW90ZShhKXtyZXR1cm4gZXNjYXBhYmxlLmxhc3RJbmRleD0wLGVzY2FwYWJsZS50ZXN0KGEpPydcIicrYS5yZXBsYWNlKGVzY2FwYWJsZSxmdW5jdGlvbihhKXt2YXIgYj1tZXRhW2FdO3JldHVybiB0eXBlb2YgYj09XCJzdHJpbmdcIj9iOlwiXFxcXHVcIisoXCIwMDAwXCIrYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpfSkrJ1wiJzonXCInK2ErJ1wiJ31mdW5jdGlvbiBzdHIoYSxiKXt2YXIgYyxkLGUsZixnPWdhcCxoLGk9YlthXTtpIGluc3RhbmNlb2YgRGF0ZSYmKGk9ZGF0ZShhKSksdHlwZW9mIHJlcD09XCJmdW5jdGlvblwiJiYoaT1yZXAuY2FsbChiLGEsaSkpO3N3aXRjaCh0eXBlb2YgaSl7Y2FzZVwic3RyaW5nXCI6cmV0dXJuIHF1b3RlKGkpO2Nhc2VcIm51bWJlclwiOnJldHVybiBpc0Zpbml0ZShpKT9TdHJpbmcoaSk6XCJudWxsXCI7Y2FzZVwiYm9vbGVhblwiOmNhc2VcIm51bGxcIjpyZXR1cm4gU3RyaW5nKGkpO2Nhc2VcIm9iamVjdFwiOmlmKCFpKXJldHVyblwibnVsbFwiO2dhcCs9aW5kZW50LGg9W107aWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5hcHBseShpKT09PVwiW29iamVjdCBBcnJheV1cIil7Zj1pLmxlbmd0aDtmb3IoYz0wO2M8ZjtjKz0xKWhbY109c3RyKGMsaSl8fFwibnVsbFwiO3JldHVybiBlPWgubGVuZ3RoPT09MD9cIltdXCI6Z2FwP1wiW1xcblwiK2dhcCtoLmpvaW4oXCIsXFxuXCIrZ2FwKStcIlxcblwiK2crXCJdXCI6XCJbXCIraC5qb2luKFwiLFwiKStcIl1cIixnYXA9ZyxlfWlmKHJlcCYmdHlwZW9mIHJlcD09XCJvYmplY3RcIil7Zj1yZXAubGVuZ3RoO2ZvcihjPTA7YzxmO2MrPTEpdHlwZW9mIHJlcFtjXT09XCJzdHJpbmdcIiYmKGQ9cmVwW2NdLGU9c3RyKGQsaSksZSYmaC5wdXNoKHF1b3RlKGQpKyhnYXA/XCI6IFwiOlwiOlwiKStlKSl9ZWxzZSBmb3IoZCBpbiBpKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChpLGQpJiYoZT1zdHIoZCxpKSxlJiZoLnB1c2gocXVvdGUoZCkrKGdhcD9cIjogXCI6XCI6XCIpK2UpKTtyZXR1cm4gZT1oLmxlbmd0aD09PTA/XCJ7fVwiOmdhcD9cIntcXG5cIitnYXAraC5qb2luKFwiLFxcblwiK2dhcCkrXCJcXG5cIitnK1wifVwiOlwie1wiK2guam9pbihcIixcIikrXCJ9XCIsZ2FwPWcsZX19XCJ1c2Ugc3RyaWN0XCI7aWYobmF0aXZlSlNPTiYmbmF0aXZlSlNPTi5wYXJzZSlyZXR1cm4gZXhwb3J0cy5KU09OPXtwYXJzZTpuYXRpdmVKU09OLnBhcnNlLHN0cmluZ2lmeTpuYXRpdmVKU09OLnN0cmluZ2lmeX07dmFyIEpTT049ZXhwb3J0cy5KU09OPXt9LGN4PS9bXFx1MDAwMFxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nLGVzY2FwYWJsZT0vW1xcXFxcXFwiXFx4MDAtXFx4MWZcXHg3Zi1cXHg5ZlxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nLGdhcCxpbmRlbnQsbWV0YT17XCJcXGJcIjpcIlxcXFxiXCIsXCJcXHRcIjpcIlxcXFx0XCIsXCJcXG5cIjpcIlxcXFxuXCIsXCJcXGZcIjpcIlxcXFxmXCIsXCJcXHJcIjpcIlxcXFxyXCIsJ1wiJzonXFxcXFwiJyxcIlxcXFxcIjpcIlxcXFxcXFxcXCJ9LHJlcDtKU09OLnN0cmluZ2lmeT1mdW5jdGlvbihhLGIsYyl7dmFyIGQ7Z2FwPVwiXCIsaW5kZW50PVwiXCI7aWYodHlwZW9mIGM9PVwibnVtYmVyXCIpZm9yKGQ9MDtkPGM7ZCs9MSlpbmRlbnQrPVwiIFwiO2Vsc2UgdHlwZW9mIGM9PVwic3RyaW5nXCImJihpbmRlbnQ9Yyk7cmVwPWI7aWYoIWJ8fHR5cGVvZiBiPT1cImZ1bmN0aW9uXCJ8fHR5cGVvZiBiPT1cIm9iamVjdFwiJiZ0eXBlb2YgYi5sZW5ndGg9PVwibnVtYmVyXCIpcmV0dXJuIHN0cihcIlwiLHtcIlwiOmF9KTt0aHJvdyBuZXcgRXJyb3IoXCJKU09OLnN0cmluZ2lmeVwiKX0sSlNPTi5wYXJzZT1mdW5jdGlvbih0ZXh0LHJldml2ZXIpe2Z1bmN0aW9uIHdhbGsoYSxiKXt2YXIgYyxkLGU9YVtiXTtpZihlJiZ0eXBlb2YgZT09XCJvYmplY3RcIilmb3IoYyBpbiBlKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLGMpJiYoZD13YWxrKGUsYyksZCE9PXVuZGVmaW5lZD9lW2NdPWQ6ZGVsZXRlIGVbY10pO3JldHVybiByZXZpdmVyLmNhbGwoYSxiLGUpfXZhciBqO3RleHQ9U3RyaW5nKHRleHQpLGN4Lmxhc3RJbmRleD0wLGN4LnRlc3QodGV4dCkmJih0ZXh0PXRleHQucmVwbGFjZShjeCxmdW5jdGlvbihhKXtyZXR1cm5cIlxcXFx1XCIrKFwiMDAwMFwiK2EuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KX0pKTtpZigvXltcXF0sOnt9XFxzXSokLy50ZXN0KHRleHQucmVwbGFjZSgvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9nLFwiQFwiKS5yZXBsYWNlKC9cIlteXCJcXFxcXFxuXFxyXSpcInx0cnVlfGZhbHNlfG51bGx8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8vZyxcIl1cIikucmVwbGFjZSgvKD86Xnw6fCwpKD86XFxzKlxcWykrL2csXCJcIikpKXJldHVybiBqPWV2YWwoXCIoXCIrdGV4dCtcIilcIiksdHlwZW9mIHJldml2ZXI9PVwiZnVuY3Rpb25cIj93YWxrKHtcIlwiOmp9LFwiXCIpOmo7dGhyb3cgbmV3IFN5bnRheEVycm9yKFwiSlNPTi5wYXJzZVwiKX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUuZXhwb3J0cyx0eXBlb2YgSlNPTiE9XCJ1bmRlZmluZWRcIj9KU09OOnVuZGVmaW5lZCksZnVuY3Rpb24oYSxiKXt2YXIgYz1hLnBhcnNlcj17fSxkPWMucGFja2V0cz1bXCJkaXNjb25uZWN0XCIsXCJjb25uZWN0XCIsXCJoZWFydGJlYXRcIixcIm1lc3NhZ2VcIixcImpzb25cIixcImV2ZW50XCIsXCJhY2tcIixcImVycm9yXCIsXCJub29wXCJdLGU9Yy5yZWFzb25zPVtcInRyYW5zcG9ydCBub3Qgc3VwcG9ydGVkXCIsXCJjbGllbnQgbm90IGhhbmRzaGFrZW5cIixcInVuYXV0aG9yaXplZFwiXSxmPWMuYWR2aWNlPVtcInJlY29ubmVjdFwiXSxnPWIuSlNPTixoPWIudXRpbC5pbmRleE9mO2MuZW5jb2RlUGFja2V0PWZ1bmN0aW9uKGEpe3ZhciBiPWgoZCxhLnR5cGUpLGM9YS5pZHx8XCJcIixpPWEuZW5kcG9pbnR8fFwiXCIsaj1hLmFjayxrPW51bGw7c3dpdGNoKGEudHlwZSl7Y2FzZVwiZXJyb3JcIjp2YXIgbD1hLnJlYXNvbj9oKGUsYS5yZWFzb24pOlwiXCIsbT1hLmFkdmljZT9oKGYsYS5hZHZpY2UpOlwiXCI7aWYobCE9PVwiXCJ8fG0hPT1cIlwiKWs9bCsobSE9PVwiXCI/XCIrXCIrbTpcIlwiKTticmVhaztjYXNlXCJtZXNzYWdlXCI6YS5kYXRhIT09XCJcIiYmKGs9YS5kYXRhKTticmVhaztjYXNlXCJldmVudFwiOnZhciBuPXtuYW1lOmEubmFtZX07YS5hcmdzJiZhLmFyZ3MubGVuZ3RoJiYobi5hcmdzPWEuYXJncyksaz1nLnN0cmluZ2lmeShuKTticmVhaztjYXNlXCJqc29uXCI6az1nLnN0cmluZ2lmeShhLmRhdGEpO2JyZWFrO2Nhc2VcImNvbm5lY3RcIjphLnFzJiYoaz1hLnFzKTticmVhaztjYXNlXCJhY2tcIjprPWEuYWNrSWQrKGEuYXJncyYmYS5hcmdzLmxlbmd0aD9cIitcIitnLnN0cmluZ2lmeShhLmFyZ3MpOlwiXCIpfXZhciBvPVtiLGMrKGo9PVwiZGF0YVwiP1wiK1wiOlwiXCIpLGldO3JldHVybiBrIT09bnVsbCYmayE9PXVuZGVmaW5lZCYmby5wdXNoKGspLG8uam9pbihcIjpcIil9LGMuZW5jb2RlUGF5bG9hZD1mdW5jdGlvbihhKXt2YXIgYj1cIlwiO2lmKGEubGVuZ3RoPT0xKXJldHVybiBhWzBdO2Zvcih2YXIgYz0wLGQ9YS5sZW5ndGg7YzxkO2MrKyl7dmFyIGU9YVtjXTtiKz1cIlxcdWZmZmRcIitlLmxlbmd0aCtcIlxcdWZmZmRcIithW2NdfXJldHVybiBifTt2YXIgaT0vKFteOl0rKTooWzAtOV0rKT8oXFwrKT86KFteOl0rKT86PyhbXFxzXFxTXSopPy87Yy5kZWNvZGVQYWNrZXQ9ZnVuY3Rpb24oYSl7dmFyIGI9YS5tYXRjaChpKTtpZighYilyZXR1cm57fTt2YXIgYz1iWzJdfHxcIlwiLGE9Yls1XXx8XCJcIixoPXt0eXBlOmRbYlsxXV0sZW5kcG9pbnQ6Yls0XXx8XCJcIn07YyYmKGguaWQ9YyxiWzNdP2guYWNrPVwiZGF0YVwiOmguYWNrPSEwKTtzd2l0Y2goaC50eXBlKXtjYXNlXCJlcnJvclwiOnZhciBiPWEuc3BsaXQoXCIrXCIpO2gucmVhc29uPWVbYlswXV18fFwiXCIsaC5hZHZpY2U9ZltiWzFdXXx8XCJcIjticmVhaztjYXNlXCJtZXNzYWdlXCI6aC5kYXRhPWF8fFwiXCI7YnJlYWs7Y2FzZVwiZXZlbnRcIjp0cnl7dmFyIGo9Zy5wYXJzZShhKTtoLm5hbWU9ai5uYW1lLGguYXJncz1qLmFyZ3N9Y2F0Y2goayl7fWguYXJncz1oLmFyZ3N8fFtdO2JyZWFrO2Nhc2VcImpzb25cIjp0cnl7aC5kYXRhPWcucGFyc2UoYSl9Y2F0Y2goayl7fWJyZWFrO2Nhc2VcImNvbm5lY3RcIjpoLnFzPWF8fFwiXCI7YnJlYWs7Y2FzZVwiYWNrXCI6dmFyIGI9YS5tYXRjaCgvXihbMC05XSspKFxcKyk/KC4qKS8pO2lmKGIpe2guYWNrSWQ9YlsxXSxoLmFyZ3M9W107aWYoYlszXSl0cnl7aC5hcmdzPWJbM10/Zy5wYXJzZShiWzNdKTpbXX1jYXRjaChrKXt9fWJyZWFrO2Nhc2VcImRpc2Nvbm5lY3RcIjpjYXNlXCJoZWFydGJlYXRcIjp9cmV0dXJuIGh9LGMuZGVjb2RlUGF5bG9hZD1mdW5jdGlvbihhKXtpZihhLmNoYXJBdCgwKT09XCJcXHVmZmZkXCIpe3ZhciBiPVtdO2Zvcih2YXIgZD0xLGU9XCJcIjtkPGEubGVuZ3RoO2QrKylhLmNoYXJBdChkKT09XCJcXHVmZmZkXCI/KGIucHVzaChjLmRlY29kZVBhY2tldChhLnN1YnN0cihkKzEpLnN1YnN0cigwLGUpKSksZCs9TnVtYmVyKGUpKzEsZT1cIlwiKTplKz1hLmNoYXJBdChkKTtyZXR1cm4gYn1yZXR1cm5bYy5kZWNvZGVQYWNrZXQoYSldfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMpLGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYyhhLGIpe3RoaXMuc29ja2V0PWEsdGhpcy5zZXNzaWQ9Yn1hLlRyYW5zcG9ydD1jLGIudXRpbC5taXhpbihjLGIuRXZlbnRFbWl0dGVyKSxjLnByb3RvdHlwZS5oZWFydGJlYXRzPWZ1bmN0aW9uKCl7cmV0dXJuITB9LGMucHJvdG90eXBlLm9uRGF0YT1mdW5jdGlvbihhKXt0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCksKHRoaXMuc29ja2V0LmNvbm5lY3RlZHx8dGhpcy5zb2NrZXQuY29ubmVjdGluZ3x8dGhpcy5zb2NrZXQucmVjb25uZWN0aW5nKSYmdGhpcy5zZXRDbG9zZVRpbWVvdXQoKTtpZihhIT09XCJcIil7dmFyIGM9Yi5wYXJzZXIuZGVjb2RlUGF5bG9hZChhKTtpZihjJiZjLmxlbmd0aClmb3IodmFyIGQ9MCxlPWMubGVuZ3RoO2Q8ZTtkKyspdGhpcy5vblBhY2tldChjW2RdKX1yZXR1cm4gdGhpc30sYy5wcm90b3R5cGUub25QYWNrZXQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuc29ja2V0LnNldEhlYXJ0YmVhdFRpbWVvdXQoKSxhLnR5cGU9PVwiaGVhcnRiZWF0XCI/dGhpcy5vbkhlYXJ0YmVhdCgpOihhLnR5cGU9PVwiY29ubmVjdFwiJiZhLmVuZHBvaW50PT1cIlwiJiZ0aGlzLm9uQ29ubmVjdCgpLGEudHlwZT09XCJlcnJvclwiJiZhLmFkdmljZT09XCJyZWNvbm5lY3RcIiYmKHRoaXMuaXNPcGVuPSExKSx0aGlzLnNvY2tldC5vblBhY2tldChhKSx0aGlzKX0sYy5wcm90b3R5cGUuc2V0Q2xvc2VUaW1lb3V0PWZ1bmN0aW9uKCl7aWYoIXRoaXMuY2xvc2VUaW1lb3V0KXt2YXIgYT10aGlzO3RoaXMuY2xvc2VUaW1lb3V0PXNldFRpbWVvdXQoZnVuY3Rpb24oKXthLm9uRGlzY29ubmVjdCgpfSx0aGlzLnNvY2tldC5jbG9zZVRpbWVvdXQpfX0sYy5wcm90b3R5cGUub25EaXNjb25uZWN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuaXNPcGVuJiZ0aGlzLmNsb3NlKCksdGhpcy5jbGVhclRpbWVvdXRzKCksdGhpcy5zb2NrZXQub25EaXNjb25uZWN0KCksdGhpc30sYy5wcm90b3R5cGUub25Db25uZWN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc29ja2V0Lm9uQ29ubmVjdCgpLHRoaXN9LGMucHJvdG90eXBlLmNsZWFyQ2xvc2VUaW1lb3V0PWZ1bmN0aW9uKCl7dGhpcy5jbG9zZVRpbWVvdXQmJihjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVvdXQpLHRoaXMuY2xvc2VUaW1lb3V0PW51bGwpfSxjLnByb3RvdHlwZS5jbGVhclRpbWVvdXRzPWZ1bmN0aW9uKCl7dGhpcy5jbGVhckNsb3NlVGltZW91dCgpLHRoaXMucmVvcGVuVGltZW91dCYmY2xlYXJUaW1lb3V0KHRoaXMucmVvcGVuVGltZW91dCl9LGMucHJvdG90eXBlLnBhY2tldD1mdW5jdGlvbihhKXt0aGlzLnNlbmQoYi5wYXJzZXIuZW5jb2RlUGFja2V0KGEpKX0sYy5wcm90b3R5cGUub25IZWFydGJlYXQ9ZnVuY3Rpb24oYSl7dGhpcy5wYWNrZXQoe3R5cGU6XCJoZWFydGJlYXRcIn0pfSxjLnByb3RvdHlwZS5vbk9wZW49ZnVuY3Rpb24oKXt0aGlzLmlzT3Blbj0hMCx0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCksdGhpcy5zb2NrZXQub25PcGVuKCl9LGMucHJvdG90eXBlLm9uQ2xvc2U9ZnVuY3Rpb24oKXt2YXIgYT10aGlzO3RoaXMuaXNPcGVuPSExLHRoaXMuc29ja2V0Lm9uQ2xvc2UoKSx0aGlzLm9uRGlzY29ubmVjdCgpfSxjLnByb3RvdHlwZS5wcmVwYXJlVXJsPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcy5zb2NrZXQub3B0aW9ucztyZXR1cm4gdGhpcy5zY2hlbWUoKStcIjovL1wiK2EuaG9zdCtcIjpcIithLnBvcnQrXCIvXCIrYS5yZXNvdXJjZStcIi9cIitiLnByb3RvY29sK1wiL1wiK3RoaXMubmFtZStcIi9cIit0aGlzLnNlc3NpZH0sYy5wcm90b3R5cGUucmVhZHk9ZnVuY3Rpb24oYSxiKXtiLmNhbGwodGhpcyl9fShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyksZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoYSl7dGhpcy5vcHRpb25zPXtwb3J0OjgwLHNlY3VyZTohMSxkb2N1bWVudDpcImRvY3VtZW50XCJpbiBjP2RvY3VtZW50OiExLHJlc291cmNlOlwic29ja2V0LmlvXCIsdHJhbnNwb3J0czpiLnRyYW5zcG9ydHMsXCJjb25uZWN0IHRpbWVvdXRcIjoxZTQsXCJ0cnkgbXVsdGlwbGUgdHJhbnNwb3J0c1wiOiEwLHJlY29ubmVjdDohMCxcInJlY29ubmVjdGlvbiBkZWxheVwiOjUwMCxcInJlY29ubmVjdGlvbiBsaW1pdFwiOkluZmluaXR5LFwicmVvcGVuIGRlbGF5XCI6M2UzLFwibWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0c1wiOjEwLFwic3luYyBkaXNjb25uZWN0IG9uIHVubG9hZFwiOiExLFwiYXV0byBjb25uZWN0XCI6ITAsXCJmbGFzaCBwb2xpY3kgcG9ydFwiOjEwODQzLG1hbnVhbEZsdXNoOiExfSxiLnV0aWwubWVyZ2UodGhpcy5vcHRpb25zLGEpLHRoaXMuY29ubmVjdGVkPSExLHRoaXMub3Blbj0hMSx0aGlzLmNvbm5lY3Rpbmc9ITEsdGhpcy5yZWNvbm5lY3Rpbmc9ITEsdGhpcy5uYW1lc3BhY2VzPXt9LHRoaXMuYnVmZmVyPVtdLHRoaXMuZG9CdWZmZXI9ITE7aWYodGhpcy5vcHRpb25zW1wic3luYyBkaXNjb25uZWN0IG9uIHVubG9hZFwiXSYmKCF0aGlzLmlzWERvbWFpbigpfHxiLnV0aWwudWEuaGFzQ09SUykpe3ZhciBkPXRoaXM7Yi51dGlsLm9uKGMsXCJiZWZvcmV1bmxvYWRcIixmdW5jdGlvbigpe2QuZGlzY29ubmVjdFN5bmMoKX0sITEpfXRoaXMub3B0aW9uc1tcImF1dG8gY29ubmVjdFwiXSYmdGhpcy5jb25uZWN0KCl9ZnVuY3Rpb24gZSgpe31hLlNvY2tldD1kLGIudXRpbC5taXhpbihkLGIuRXZlbnRFbWl0dGVyKSxkLnByb3RvdHlwZS5vZj1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5uYW1lc3BhY2VzW2FdfHwodGhpcy5uYW1lc3BhY2VzW2FdPW5ldyBiLlNvY2tldE5hbWVzcGFjZSh0aGlzLGEpLGEhPT1cIlwiJiZ0aGlzLm5hbWVzcGFjZXNbYV0ucGFja2V0KHt0eXBlOlwiY29ubmVjdFwifSkpLHRoaXMubmFtZXNwYWNlc1thXX0sZC5wcm90b3R5cGUucHVibGlzaD1mdW5jdGlvbigpe3RoaXMuZW1pdC5hcHBseSh0aGlzLGFyZ3VtZW50cyk7dmFyIGE7Zm9yKHZhciBiIGluIHRoaXMubmFtZXNwYWNlcyl0aGlzLm5hbWVzcGFjZXMuaGFzT3duUHJvcGVydHkoYikmJihhPXRoaXMub2YoYiksYS4kZW1pdC5hcHBseShhLGFyZ3VtZW50cykpfSxkLnByb3RvdHlwZS5oYW5kc2hha2U9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gZihiKXtiIGluc3RhbmNlb2YgRXJyb3I/KGMuY29ubmVjdGluZz0hMSxjLm9uRXJyb3IoYi5tZXNzYWdlKSk6YS5hcHBseShudWxsLGIuc3BsaXQoXCI6XCIpKX12YXIgYz10aGlzLGQ9dGhpcy5vcHRpb25zLGc9W1wiaHR0cFwiKyhkLnNlY3VyZT9cInNcIjpcIlwiKStcIjovXCIsZC5ob3N0K1wiOlwiK2QucG9ydCxkLnJlc291cmNlLGIucHJvdG9jb2wsYi51dGlsLnF1ZXJ5KHRoaXMub3B0aW9ucy5xdWVyeSxcInQ9XCIrICsobmV3IERhdGUpKV0uam9pbihcIi9cIik7aWYodGhpcy5pc1hEb21haW4oKSYmIWIudXRpbC51YS5oYXNDT1JTKXt2YXIgaD1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXSxpPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7aS5zcmM9ZytcIiZqc29ucD1cIitiLmoubGVuZ3RoLGgucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoaSxoKSxiLmoucHVzaChmdW5jdGlvbihhKXtmKGEpLGkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpKX0pfWVsc2V7dmFyIGo9Yi51dGlsLnJlcXVlc3QoKTtqLm9wZW4oXCJHRVRcIixnLCEwKSx0aGlzLmlzWERvbWFpbigpJiYoai53aXRoQ3JlZGVudGlhbHM9ITApLGoub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7ai5yZWFkeVN0YXRlPT00JiYoai5vbnJlYWR5c3RhdGVjaGFuZ2U9ZSxqLnN0YXR1cz09MjAwP2Yoai5yZXNwb25zZVRleHQpOmouc3RhdHVzPT00MDM/Yy5vbkVycm9yKGoucmVzcG9uc2VUZXh0KTooYy5jb25uZWN0aW5nPSExLCFjLnJlY29ubmVjdGluZyYmYy5vbkVycm9yKGoucmVzcG9uc2VUZXh0KSkpfSxqLnNlbmQobnVsbCl9fSxkLnByb3RvdHlwZS5nZXRUcmFuc3BvcnQ9ZnVuY3Rpb24oYSl7dmFyIGM9YXx8dGhpcy50cmFuc3BvcnRzLGQ7Zm9yKHZhciBlPTAsZjtmPWNbZV07ZSsrKWlmKGIuVHJhbnNwb3J0W2ZdJiZiLlRyYW5zcG9ydFtmXS5jaGVjayh0aGlzKSYmKCF0aGlzLmlzWERvbWFpbigpfHxiLlRyYW5zcG9ydFtmXS54ZG9tYWluQ2hlY2sodGhpcykpKXJldHVybiBuZXcgYi5UcmFuc3BvcnRbZl0odGhpcyx0aGlzLnNlc3Npb25pZCk7cmV0dXJuIG51bGx9LGQucHJvdG90eXBlLmNvbm5lY3Q9ZnVuY3Rpb24oYSl7aWYodGhpcy5jb25uZWN0aW5nKXJldHVybiB0aGlzO3ZhciBjPXRoaXM7cmV0dXJuIGMuY29ubmVjdGluZz0hMCx0aGlzLmhhbmRzaGFrZShmdW5jdGlvbihkLGUsZixnKXtmdW5jdGlvbiBoKGEpe2MudHJhbnNwb3J0JiZjLnRyYW5zcG9ydC5jbGVhclRpbWVvdXRzKCksYy50cmFuc3BvcnQ9Yy5nZXRUcmFuc3BvcnQoYSk7aWYoIWMudHJhbnNwb3J0KXJldHVybiBjLnB1Ymxpc2goXCJjb25uZWN0X2ZhaWxlZFwiKTtjLnRyYW5zcG9ydC5yZWFkeShjLGZ1bmN0aW9uKCl7Yy5jb25uZWN0aW5nPSEwLGMucHVibGlzaChcImNvbm5lY3RpbmdcIixjLnRyYW5zcG9ydC5uYW1lKSxjLnRyYW5zcG9ydC5vcGVuKCksYy5vcHRpb25zW1wiY29ubmVjdCB0aW1lb3V0XCJdJiYoYy5jb25uZWN0VGltZW91dFRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXtpZighYy5jb25uZWN0ZWQpe2MuY29ubmVjdGluZz0hMTtpZihjLm9wdGlvbnNbXCJ0cnkgbXVsdGlwbGUgdHJhbnNwb3J0c1wiXSl7dmFyIGE9Yy50cmFuc3BvcnRzO3doaWxlKGEubGVuZ3RoPjAmJmEuc3BsaWNlKDAsMSlbMF0hPWMudHJhbnNwb3J0Lm5hbWUpO2EubGVuZ3RoP2goYSk6Yy5wdWJsaXNoKFwiY29ubmVjdF9mYWlsZWRcIil9fX0sYy5vcHRpb25zW1wiY29ubmVjdCB0aW1lb3V0XCJdKSl9KX1jLnNlc3Npb25pZD1kLGMuY2xvc2VUaW1lb3V0PWYqMWUzLGMuaGVhcnRiZWF0VGltZW91dD1lKjFlMyxjLnRyYW5zcG9ydHN8fChjLnRyYW5zcG9ydHM9Yy5vcmlnVHJhbnNwb3J0cz1nP2IudXRpbC5pbnRlcnNlY3QoZy5zcGxpdChcIixcIiksYy5vcHRpb25zLnRyYW5zcG9ydHMpOmMub3B0aW9ucy50cmFuc3BvcnRzKSxjLnNldEhlYXJ0YmVhdFRpbWVvdXQoKSxoKGMudHJhbnNwb3J0cyksYy5vbmNlKFwiY29ubmVjdFwiLGZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KGMuY29ubmVjdFRpbWVvdXRUaW1lciksYSYmdHlwZW9mIGE9PVwiZnVuY3Rpb25cIiYmYSgpfSl9KSx0aGlzfSxkLnByb3RvdHlwZS5zZXRIZWFydGJlYXRUaW1lb3V0PWZ1bmN0aW9uKCl7Y2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyKTtpZih0aGlzLnRyYW5zcG9ydCYmIXRoaXMudHJhbnNwb3J0LmhlYXJ0YmVhdHMoKSlyZXR1cm47dmFyIGE9dGhpczt0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YS50cmFuc3BvcnQub25DbG9zZSgpfSx0aGlzLmhlYXJ0YmVhdFRpbWVvdXQpfSxkLnByb3RvdHlwZS5wYWNrZXQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuY29ubmVjdGVkJiYhdGhpcy5kb0J1ZmZlcj90aGlzLnRyYW5zcG9ydC5wYWNrZXQoYSk6dGhpcy5idWZmZXIucHVzaChhKSx0aGlzfSxkLnByb3RvdHlwZS5zZXRCdWZmZXI9ZnVuY3Rpb24oYSl7dGhpcy5kb0J1ZmZlcj1hLCFhJiZ0aGlzLmNvbm5lY3RlZCYmdGhpcy5idWZmZXIubGVuZ3RoJiYodGhpcy5vcHRpb25zLm1hbnVhbEZsdXNofHx0aGlzLmZsdXNoQnVmZmVyKCkpfSxkLnByb3RvdHlwZS5mbHVzaEJ1ZmZlcj1mdW5jdGlvbigpe3RoaXMudHJhbnNwb3J0LnBheWxvYWQodGhpcy5idWZmZXIpLHRoaXMuYnVmZmVyPVtdfSxkLnByb3RvdHlwZS5kaXNjb25uZWN0PWZ1bmN0aW9uKCl7aWYodGhpcy5jb25uZWN0ZWR8fHRoaXMuY29ubmVjdGluZyl0aGlzLm9wZW4mJnRoaXMub2YoXCJcIikucGFja2V0KHt0eXBlOlwiZGlzY29ubmVjdFwifSksdGhpcy5vbkRpc2Nvbm5lY3QoXCJib290ZWRcIik7cmV0dXJuIHRoaXN9LGQucHJvdG90eXBlLmRpc2Nvbm5lY3RTeW5jPWZ1bmN0aW9uKCl7dmFyIGE9Yi51dGlsLnJlcXVlc3QoKSxjPVtcImh0dHBcIisodGhpcy5vcHRpb25zLnNlY3VyZT9cInNcIjpcIlwiKStcIjovXCIsdGhpcy5vcHRpb25zLmhvc3QrXCI6XCIrdGhpcy5vcHRpb25zLnBvcnQsdGhpcy5vcHRpb25zLnJlc291cmNlLGIucHJvdG9jb2wsXCJcIix0aGlzLnNlc3Npb25pZF0uam9pbihcIi9cIikrXCIvP2Rpc2Nvbm5lY3Q9MVwiO2Eub3BlbihcIkdFVFwiLGMsITEpLGEuc2VuZChudWxsKSx0aGlzLm9uRGlzY29ubmVjdChcImJvb3RlZFwiKX0sZC5wcm90b3R5cGUuaXNYRG9tYWluPWZ1bmN0aW9uKCl7dmFyIGE9Yy5sb2NhdGlvbi5wb3J0fHwoXCJodHRwczpcIj09Yy5sb2NhdGlvbi5wcm90b2NvbD80NDM6ODApO3JldHVybiB0aGlzLm9wdGlvbnMuaG9zdCE9PWMubG9jYXRpb24uaG9zdG5hbWV8fHRoaXMub3B0aW9ucy5wb3J0IT1hfSxkLnByb3RvdHlwZS5vbkNvbm5lY3Q9ZnVuY3Rpb24oKXt0aGlzLmNvbm5lY3RlZHx8KHRoaXMuY29ubmVjdGVkPSEwLHRoaXMuY29ubmVjdGluZz0hMSx0aGlzLmRvQnVmZmVyfHx0aGlzLnNldEJ1ZmZlcighMSksdGhpcy5lbWl0KFwiY29ubmVjdFwiKSl9LGQucHJvdG90eXBlLm9uT3Blbj1mdW5jdGlvbigpe3RoaXMub3Blbj0hMH0sZC5wcm90b3R5cGUub25DbG9zZT1mdW5jdGlvbigpe3RoaXMub3Blbj0hMSxjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpfSxkLnByb3RvdHlwZS5vblBhY2tldD1mdW5jdGlvbihhKXt0aGlzLm9mKGEuZW5kcG9pbnQpLm9uUGFja2V0KGEpfSxkLnByb3RvdHlwZS5vbkVycm9yPWZ1bmN0aW9uKGEpe2EmJmEuYWR2aWNlJiZhLmFkdmljZT09PVwicmVjb25uZWN0XCImJih0aGlzLmNvbm5lY3RlZHx8dGhpcy5jb25uZWN0aW5nKSYmKHRoaXMuZGlzY29ubmVjdCgpLHRoaXMub3B0aW9ucy5yZWNvbm5lY3QmJnRoaXMucmVjb25uZWN0KCkpLHRoaXMucHVibGlzaChcImVycm9yXCIsYSYmYS5yZWFzb24/YS5yZWFzb246YSl9LGQucHJvdG90eXBlLm9uRGlzY29ubmVjdD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLmNvbm5lY3RlZCxjPXRoaXMuY29ubmVjdGluZzt0aGlzLmNvbm5lY3RlZD0hMSx0aGlzLmNvbm5lY3Rpbmc9ITEsdGhpcy5vcGVuPSExO2lmKGJ8fGMpdGhpcy50cmFuc3BvcnQuY2xvc2UoKSx0aGlzLnRyYW5zcG9ydC5jbGVhclRpbWVvdXRzKCksYiYmKHRoaXMucHVibGlzaChcImRpc2Nvbm5lY3RcIixhKSxcImJvb3RlZFwiIT1hJiZ0aGlzLm9wdGlvbnMucmVjb25uZWN0JiYhdGhpcy5yZWNvbm5lY3RpbmcmJnRoaXMucmVjb25uZWN0KCkpfSxkLnByb3RvdHlwZS5yZWNvbm5lY3Q9ZnVuY3Rpb24oKXtmdW5jdGlvbiBlKCl7aWYoYS5jb25uZWN0ZWQpe2Zvcih2YXIgYiBpbiBhLm5hbWVzcGFjZXMpYS5uYW1lc3BhY2VzLmhhc093blByb3BlcnR5KGIpJiZcIlwiIT09YiYmYS5uYW1lc3BhY2VzW2JdLnBhY2tldCh7dHlwZTpcImNvbm5lY3RcIn0pO2EucHVibGlzaChcInJlY29ubmVjdFwiLGEudHJhbnNwb3J0Lm5hbWUsYS5yZWNvbm5lY3Rpb25BdHRlbXB0cyl9Y2xlYXJUaW1lb3V0KGEucmVjb25uZWN0aW9uVGltZXIpLGEucmVtb3ZlTGlzdGVuZXIoXCJjb25uZWN0X2ZhaWxlZFwiLGYpLGEucmVtb3ZlTGlzdGVuZXIoXCJjb25uZWN0XCIsZiksYS5yZWNvbm5lY3Rpbmc9ITEsZGVsZXRlIGEucmVjb25uZWN0aW9uQXR0ZW1wdHMsZGVsZXRlIGEucmVjb25uZWN0aW9uRGVsYXksZGVsZXRlIGEucmVjb25uZWN0aW9uVGltZXIsZGVsZXRlIGEucmVkb1RyYW5zcG9ydHMsYS5vcHRpb25zW1widHJ5IG11bHRpcGxlIHRyYW5zcG9ydHNcIl09Y31mdW5jdGlvbiBmKCl7aWYoIWEucmVjb25uZWN0aW5nKXJldHVybjtpZihhLmNvbm5lY3RlZClyZXR1cm4gZSgpO2lmKGEuY29ubmVjdGluZyYmYS5yZWNvbm5lY3RpbmcpcmV0dXJuIGEucmVjb25uZWN0aW9uVGltZXI9c2V0VGltZW91dChmLDFlMyk7YS5yZWNvbm5lY3Rpb25BdHRlbXB0cysrPj1iP2EucmVkb1RyYW5zcG9ydHM/KGEucHVibGlzaChcInJlY29ubmVjdF9mYWlsZWRcIiksZSgpKTooYS5vbihcImNvbm5lY3RfZmFpbGVkXCIsZiksYS5vcHRpb25zW1widHJ5IG11bHRpcGxlIHRyYW5zcG9ydHNcIl09ITAsYS50cmFuc3BvcnRzPWEub3JpZ1RyYW5zcG9ydHMsYS50cmFuc3BvcnQ9YS5nZXRUcmFuc3BvcnQoKSxhLnJlZG9UcmFuc3BvcnRzPSEwLGEuY29ubmVjdCgpKTooYS5yZWNvbm5lY3Rpb25EZWxheTxkJiYoYS5yZWNvbm5lY3Rpb25EZWxheSo9MiksYS5jb25uZWN0KCksYS5wdWJsaXNoKFwicmVjb25uZWN0aW5nXCIsYS5yZWNvbm5lY3Rpb25EZWxheSxhLnJlY29ubmVjdGlvbkF0dGVtcHRzKSxhLnJlY29ubmVjdGlvblRpbWVyPXNldFRpbWVvdXQoZixhLnJlY29ubmVjdGlvbkRlbGF5KSl9dGhpcy5yZWNvbm5lY3Rpbmc9ITAsdGhpcy5yZWNvbm5lY3Rpb25BdHRlbXB0cz0wLHRoaXMucmVjb25uZWN0aW9uRGVsYXk9dGhpcy5vcHRpb25zW1wicmVjb25uZWN0aW9uIGRlbGF5XCJdO3ZhciBhPXRoaXMsYj10aGlzLm9wdGlvbnNbXCJtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzXCJdLGM9dGhpcy5vcHRpb25zW1widHJ5IG11bHRpcGxlIHRyYW5zcG9ydHNcIl0sZD10aGlzLm9wdGlvbnNbXCJyZWNvbm5lY3Rpb24gbGltaXRcIl07dGhpcy5vcHRpb25zW1widHJ5IG11bHRpcGxlIHRyYW5zcG9ydHNcIl09ITEsdGhpcy5yZWNvbm5lY3Rpb25UaW1lcj1zZXRUaW1lb3V0KGYsdGhpcy5yZWNvbm5lY3Rpb25EZWxheSksdGhpcy5vbihcImNvbm5lY3RcIixmKX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzLHRoaXMpLGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYyhhLGIpe3RoaXMuc29ja2V0PWEsdGhpcy5uYW1lPWJ8fFwiXCIsdGhpcy5mbGFncz17fSx0aGlzLmpzb249bmV3IGQodGhpcyxcImpzb25cIiksdGhpcy5hY2tQYWNrZXRzPTAsdGhpcy5hY2tzPXt9fWZ1bmN0aW9uIGQoYSxiKXt0aGlzLm5hbWVzcGFjZT1hLHRoaXMubmFtZT1ifWEuU29ja2V0TmFtZXNwYWNlPWMsYi51dGlsLm1peGluKGMsYi5FdmVudEVtaXR0ZXIpLGMucHJvdG90eXBlLiRlbWl0PWIuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0LGMucHJvdG90eXBlLm9mPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc29ja2V0Lm9mLmFwcGx5KHRoaXMuc29ja2V0LGFyZ3VtZW50cyl9LGMucHJvdG90eXBlLnBhY2tldD1mdW5jdGlvbihhKXtyZXR1cm4gYS5lbmRwb2ludD10aGlzLm5hbWUsdGhpcy5zb2NrZXQucGFja2V0KGEpLHRoaXMuZmxhZ3M9e30sdGhpc30sYy5wcm90b3R5cGUuc2VuZD1mdW5jdGlvbihhLGIpe3ZhciBjPXt0eXBlOnRoaXMuZmxhZ3MuanNvbj9cImpzb25cIjpcIm1lc3NhZ2VcIixkYXRhOmF9O3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGImJihjLmlkPSsrdGhpcy5hY2tQYWNrZXRzLGMuYWNrPSEwLHRoaXMuYWNrc1tjLmlkXT1iKSx0aGlzLnBhY2tldChjKX0sYy5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbihhKXt2YXIgYj1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSksYz1iW2IubGVuZ3RoLTFdLGQ9e3R5cGU6XCJldmVudFwiLG5hbWU6YX07cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgYyYmKGQuaWQ9Kyt0aGlzLmFja1BhY2tldHMsZC5hY2s9XCJkYXRhXCIsdGhpcy5hY2tzW2QuaWRdPWMsYj1iLnNsaWNlKDAsYi5sZW5ndGgtMSkpLGQuYXJncz1iLHRoaXMucGFja2V0KGQpfSxjLnByb3RvdHlwZS5kaXNjb25uZWN0PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMubmFtZT09PVwiXCI/dGhpcy5zb2NrZXQuZGlzY29ubmVjdCgpOih0aGlzLnBhY2tldCh7dHlwZTpcImRpc2Nvbm5lY3RcIn0pLHRoaXMuJGVtaXQoXCJkaXNjb25uZWN0XCIpKSx0aGlzfSxjLnByb3RvdHlwZS5vblBhY2tldD1mdW5jdGlvbihhKXtmdW5jdGlvbiBkKCl7Yy5wYWNrZXQoe3R5cGU6XCJhY2tcIixhcmdzOmIudXRpbC50b0FycmF5KGFyZ3VtZW50cyksYWNrSWQ6YS5pZH0pfXZhciBjPXRoaXM7c3dpdGNoKGEudHlwZSl7Y2FzZVwiY29ubmVjdFwiOnRoaXMuJGVtaXQoXCJjb25uZWN0XCIpO2JyZWFrO2Nhc2VcImRpc2Nvbm5lY3RcIjp0aGlzLm5hbWU9PT1cIlwiP3RoaXMuc29ja2V0Lm9uRGlzY29ubmVjdChhLnJlYXNvbnx8XCJib290ZWRcIik6dGhpcy4kZW1pdChcImRpc2Nvbm5lY3RcIixhLnJlYXNvbik7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmNhc2VcImpzb25cIjp2YXIgZT1bXCJtZXNzYWdlXCIsYS5kYXRhXTthLmFjaz09XCJkYXRhXCI/ZS5wdXNoKGQpOmEuYWNrJiZ0aGlzLnBhY2tldCh7dHlwZTpcImFja1wiLGFja0lkOmEuaWR9KSx0aGlzLiRlbWl0LmFwcGx5KHRoaXMsZSk7YnJlYWs7Y2FzZVwiZXZlbnRcIjp2YXIgZT1bYS5uYW1lXS5jb25jYXQoYS5hcmdzKTthLmFjaz09XCJkYXRhXCImJmUucHVzaChkKSx0aGlzLiRlbWl0LmFwcGx5KHRoaXMsZSk7YnJlYWs7Y2FzZVwiYWNrXCI6dGhpcy5hY2tzW2EuYWNrSWRdJiYodGhpcy5hY2tzW2EuYWNrSWRdLmFwcGx5KHRoaXMsYS5hcmdzKSxkZWxldGUgdGhpcy5hY2tzW2EuYWNrSWRdKTticmVhaztjYXNlXCJlcnJvclwiOmEuYWR2aWNlP3RoaXMuc29ja2V0Lm9uRXJyb3IoYSk6YS5yZWFzb249PVwidW5hdXRob3JpemVkXCI/dGhpcy4kZW1pdChcImNvbm5lY3RfZmFpbGVkXCIsYS5yZWFzb24pOnRoaXMuJGVtaXQoXCJlcnJvclwiLGEucmVhc29uKX19LGQucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oKXt0aGlzLm5hbWVzcGFjZS5mbGFnc1t0aGlzLm5hbWVdPSEwLHRoaXMubmFtZXNwYWNlLnNlbmQuYXBwbHkodGhpcy5uYW1lc3BhY2UsYXJndW1lbnRzKX0sZC5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbigpe3RoaXMubmFtZXNwYWNlLmZsYWdzW3RoaXMubmFtZV09ITAsdGhpcy5uYW1lc3BhY2UuZW1pdC5hcHBseSh0aGlzLm5hbWVzcGFjZSxhcmd1bWVudHMpfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMpLGZ1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKGEpe2IuVHJhbnNwb3J0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX1hLndlYnNvY2tldD1kLGIudXRpbC5pbmhlcml0KGQsYi5UcmFuc3BvcnQpLGQucHJvdG90eXBlLm5hbWU9XCJ3ZWJzb2NrZXRcIixkLnByb3RvdHlwZS5vcGVuPWZ1bmN0aW9uKCl7dmFyIGE9Yi51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnkpLGQ9dGhpcyxlO3JldHVybiBlfHwoZT1jLk1veldlYlNvY2tldHx8Yy5XZWJTb2NrZXQpLHRoaXMud2Vic29ja2V0PW5ldyBlKHRoaXMucHJlcGFyZVVybCgpK2EpLHRoaXMud2Vic29ja2V0Lm9ub3Blbj1mdW5jdGlvbigpe2Qub25PcGVuKCksZC5zb2NrZXQuc2V0QnVmZmVyKCExKX0sdGhpcy53ZWJzb2NrZXQub25tZXNzYWdlPWZ1bmN0aW9uKGEpe2Qub25EYXRhKGEuZGF0YSl9LHRoaXMud2Vic29ja2V0Lm9uY2xvc2U9ZnVuY3Rpb24oKXtkLm9uQ2xvc2UoKSxkLnNvY2tldC5zZXRCdWZmZXIoITApfSx0aGlzLndlYnNvY2tldC5vbmVycm9yPWZ1bmN0aW9uKGEpe2Qub25FcnJvcihhKX0sdGhpc30sYi51dGlsLnVhLmlEZXZpY2U/ZC5wcm90b3R5cGUuc2VuZD1mdW5jdGlvbihhKXt2YXIgYj10aGlzO3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Yi53ZWJzb2NrZXQuc2VuZChhKX0sMCksdGhpc306ZC5wcm90b3R5cGUuc2VuZD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy53ZWJzb2NrZXQuc2VuZChhKSx0aGlzfSxkLnByb3RvdHlwZS5wYXlsb2FkPWZ1bmN0aW9uKGEpe2Zvcih2YXIgYj0wLGM9YS5sZW5ndGg7YjxjO2IrKyl0aGlzLnBhY2tldChhW2JdKTtyZXR1cm4gdGhpc30sZC5wcm90b3R5cGUuY2xvc2U9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy53ZWJzb2NrZXQuY2xvc2UoKSx0aGlzfSxkLnByb3RvdHlwZS5vbkVycm9yPWZ1bmN0aW9uKGEpe3RoaXMuc29ja2V0Lm9uRXJyb3IoYSl9LGQucHJvdG90eXBlLnNjaGVtZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnNvY2tldC5vcHRpb25zLnNlY3VyZT9cIndzc1wiOlwid3NcIn0sZC5jaGVjaz1mdW5jdGlvbigpe3JldHVyblwiV2ViU29ja2V0XCJpbiBjJiYhKFwiX19hZGRUYXNrXCJpbiBXZWJTb2NrZXQpfHxcIk1veldlYlNvY2tldFwiaW4gY30sZC54ZG9tYWluQ2hlY2s9ZnVuY3Rpb24oKXtyZXR1cm4hMH0sYi50cmFuc3BvcnRzLnB1c2goXCJ3ZWJzb2NrZXRcIil9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pby5UcmFuc3BvcnQ6bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyx0aGlzKSxmdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoKXtiLlRyYW5zcG9ydC53ZWJzb2NrZXQuYXBwbHkodGhpcyxhcmd1bWVudHMpfWEuZmxhc2hzb2NrZXQ9YyxiLnV0aWwuaW5oZXJpdChjLGIuVHJhbnNwb3J0LndlYnNvY2tldCksYy5wcm90b3R5cGUubmFtZT1cImZsYXNoc29ja2V0XCIsYy5wcm90b3R5cGUub3Blbj1mdW5jdGlvbigpe3ZhciBhPXRoaXMsYz1hcmd1bWVudHM7cmV0dXJuIFdlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24oKXtiLlRyYW5zcG9ydC53ZWJzb2NrZXQucHJvdG90eXBlLm9wZW4uYXBwbHkoYSxjKX0pLHRoaXN9LGMucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGM9YXJndW1lbnRzO3JldHVybiBXZWJTb2NrZXQuX19hZGRUYXNrKGZ1bmN0aW9uKCl7Yi5UcmFuc3BvcnQud2Vic29ja2V0LnByb3RvdHlwZS5zZW5kLmFwcGx5KGEsYyl9KSx0aGlzfSxjLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe3JldHVybiBXZWJTb2NrZXQuX190YXNrcy5sZW5ndGg9MCxiLlRyYW5zcG9ydC53ZWJzb2NrZXQucHJvdG90eXBlLmNsb3NlLmNhbGwodGhpcyksdGhpc30sYy5wcm90b3R5cGUucmVhZHk9ZnVuY3Rpb24oYSxkKXtmdW5jdGlvbiBlKCl7dmFyIGI9YS5vcHRpb25zLGU9YltcImZsYXNoIHBvbGljeSBwb3J0XCJdLGc9W1wiaHR0cFwiKyhiLnNlY3VyZT9cInNcIjpcIlwiKStcIjovXCIsYi5ob3N0K1wiOlwiK2IucG9ydCxiLnJlc291cmNlLFwic3RhdGljL2ZsYXNoc29ja2V0XCIsXCJXZWJTb2NrZXRNYWluXCIrKGEuaXNYRG9tYWluKCk/XCJJbnNlY3VyZVwiOlwiXCIpK1wiLnN3ZlwiXTtjLmxvYWRlZHx8KHR5cGVvZiBXRUJfU09DS0VUX1NXRl9MT0NBVElPTj09XCJ1bmRlZmluZWRcIiYmKFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OPWcuam9pbihcIi9cIikpLGUhPT04NDMmJldlYlNvY2tldC5sb2FkRmxhc2hQb2xpY3lGaWxlKFwieG1sc29ja2V0Oi8vXCIrYi5ob3N0K1wiOlwiK2UpLFdlYlNvY2tldC5fX2luaXRpYWxpemUoKSxjLmxvYWRlZD0hMCksZC5jYWxsKGYpfXZhciBmPXRoaXM7aWYoZG9jdW1lbnQuYm9keSlyZXR1cm4gZSgpO2IudXRpbC5sb2FkKGUpfSxjLmNoZWNrPWZ1bmN0aW9uKCl7cmV0dXJuIHR5cGVvZiBXZWJTb2NrZXQhPVwidW5kZWZpbmVkXCImJlwiX19pbml0aWFsaXplXCJpbiBXZWJTb2NrZXQmJiEhc3dmb2JqZWN0P3N3Zm9iamVjdC5nZXRGbGFzaFBsYXllclZlcnNpb24oKS5tYWpvcj49MTA6ITF9LGMueGRvbWFpbkNoZWNrPWZ1bmN0aW9uKCl7cmV0dXJuITB9LHR5cGVvZiB3aW5kb3chPVwidW5kZWZpbmVkXCImJihXRUJfU09DS0VUX0RJU0FCTEVfQVVUT19JTklUSUFMSVpBVElPTj0hMCksYi50cmFuc3BvcnRzLnB1c2goXCJmbGFzaHNvY2tldFwiKX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvLlRyYW5zcG9ydDptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzKTtpZihcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93KXZhciBzd2ZvYmplY3Q9ZnVuY3Rpb24oKXtmdW5jdGlvbiBBKCl7aWYodClyZXR1cm47dHJ5e3ZhciBhPWkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLmFwcGVuZENoaWxkKFEoXCJzcGFuXCIpKTthLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYSl9Y2F0Y2goYil7cmV0dXJufXQ9ITA7dmFyIGM9bC5sZW5ndGg7Zm9yKHZhciBkPTA7ZDxjO2QrKylsW2RdKCl9ZnVuY3Rpb24gQihhKXt0P2EoKTpsW2wubGVuZ3RoXT1hfWZ1bmN0aW9uIEMoYil7aWYodHlwZW9mIGguYWRkRXZlbnRMaXN0ZW5lciE9YSloLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsYiwhMSk7ZWxzZSBpZih0eXBlb2YgaS5hZGRFdmVudExpc3RlbmVyIT1hKWkuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixiLCExKTtlbHNlIGlmKHR5cGVvZiBoLmF0dGFjaEV2ZW50IT1hKVIoaCxcIm9ubG9hZFwiLGIpO2Vsc2UgaWYodHlwZW9mIGgub25sb2FkPT1cImZ1bmN0aW9uXCIpe3ZhciBjPWgub25sb2FkO2gub25sb2FkPWZ1bmN0aW9uKCl7YygpLGIoKX19ZWxzZSBoLm9ubG9hZD1ifWZ1bmN0aW9uIEQoKXtrP0UoKTpGKCl9ZnVuY3Rpb24gRSgpe3ZhciBjPWkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdLGQ9UShiKTtkLnNldEF0dHJpYnV0ZShcInR5cGVcIixlKTt2YXIgZj1jLmFwcGVuZENoaWxkKGQpO2lmKGYpe3ZhciBnPTA7KGZ1bmN0aW9uKCl7aWYodHlwZW9mIGYuR2V0VmFyaWFibGUhPWEpe3ZhciBiPWYuR2V0VmFyaWFibGUoXCIkdmVyc2lvblwiKTtiJiYoYj1iLnNwbGl0KFwiIFwiKVsxXS5zcGxpdChcIixcIikseS5wdj1bcGFyc2VJbnQoYlswXSwxMCkscGFyc2VJbnQoYlsxXSwxMCkscGFyc2VJbnQoYlsyXSwxMCldKX1lbHNlIGlmKGc8MTApe2crKyxzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMTApO3JldHVybn1jLnJlbW92ZUNoaWxkKGQpLGY9bnVsbCxGKCl9KSgpfWVsc2UgRigpfWZ1bmN0aW9uIEYoKXt2YXIgYj1tLmxlbmd0aDtpZihiPjApZm9yKHZhciBjPTA7YzxiO2MrKyl7dmFyIGQ9bVtjXS5pZCxlPW1bY10uY2FsbGJhY2tGbixmPXtzdWNjZXNzOiExLGlkOmR9O2lmKHkucHZbMF0+MCl7dmFyIGc9UChkKTtpZihnKWlmKFMobVtjXS5zd2ZWZXJzaW9uKSYmISh5LndrJiZ5LndrPDMxMikpVShkLCEwKSxlJiYoZi5zdWNjZXNzPSEwLGYucmVmPUcoZCksZShmKSk7ZWxzZSBpZihtW2NdLmV4cHJlc3NJbnN0YWxsJiZIKCkpe3ZhciBoPXt9O2guZGF0YT1tW2NdLmV4cHJlc3NJbnN0YWxsLGgud2lkdGg9Zy5nZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiKXx8XCIwXCIsaC5oZWlnaHQ9Zy5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIil8fFwiMFwiLGcuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikmJihoLnN0eWxlY2xhc3M9Zy5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSksZy5nZXRBdHRyaWJ1dGUoXCJhbGlnblwiKSYmKGguYWxpZ249Zy5nZXRBdHRyaWJ1dGUoXCJhbGlnblwiKSk7dmFyIGk9e30saj1nLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwicGFyYW1cIiksaz1qLmxlbmd0aDtmb3IodmFyIGw9MDtsPGs7bCsrKWpbbF0uZ2V0QXR0cmlidXRlKFwibmFtZVwiKS50b0xvd2VyQ2FzZSgpIT1cIm1vdmllXCImJihpW2pbbF0uZ2V0QXR0cmlidXRlKFwibmFtZVwiKV09altsXS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKSk7SShoLGksZCxlKX1lbHNlIEooZyksZSYmZShmKX1lbHNle1UoZCwhMCk7aWYoZSl7dmFyIG49RyhkKTtuJiZ0eXBlb2Ygbi5TZXRWYXJpYWJsZSE9YSYmKGYuc3VjY2Vzcz0hMCxmLnJlZj1uKSxlKGYpfX19fWZ1bmN0aW9uIEcoYyl7dmFyIGQ9bnVsbCxlPVAoYyk7aWYoZSYmZS5ub2RlTmFtZT09XCJPQkpFQ1RcIilpZih0eXBlb2YgZS5TZXRWYXJpYWJsZSE9YSlkPWU7ZWxzZXt2YXIgZj1lLmdldEVsZW1lbnRzQnlUYWdOYW1lKGIpWzBdO2YmJihkPWYpfXJldHVybiBkfWZ1bmN0aW9uIEgoKXtyZXR1cm4hdSYmUyhcIjYuMC42NVwiKSYmKHkud2lufHx5Lm1hYykmJiEoeS53ayYmeS53azwzMTIpfWZ1bmN0aW9uIEkoYixjLGQsZSl7dT0hMCxyPWV8fG51bGwscz17c3VjY2VzczohMSxpZDpkfTt2YXIgZz1QKGQpO2lmKGcpe2cubm9kZU5hbWU9PVwiT0JKRUNUXCI/KHA9SyhnKSxxPW51bGwpOihwPWcscT1kKSxiLmlkPWY7aWYodHlwZW9mIGIud2lkdGg9PWF8fCEvJSQvLnRlc3QoYi53aWR0aCkmJnBhcnNlSW50KGIud2lkdGgsMTApPDMxMCliLndpZHRoPVwiMzEwXCI7aWYodHlwZW9mIGIuaGVpZ2h0PT1hfHwhLyUkLy50ZXN0KGIuaGVpZ2h0KSYmcGFyc2VJbnQoYi5oZWlnaHQsMTApPDEzNyliLmhlaWdodD1cIjEzN1wiO2kudGl0bGU9aS50aXRsZS5zbGljZSgwLDQ3KStcIiAtIEZsYXNoIFBsYXllciBJbnN0YWxsYXRpb25cIjt2YXIgaj15LmllJiZ5Lndpbj9bXCJBY3RpdmVcIl0uY29uY2F0KFwiXCIpLmpvaW4oXCJYXCIpOlwiUGx1Z0luXCIsaz1cIk1NcmVkaXJlY3RVUkw9XCIraC5sb2NhdGlvbi50b1N0cmluZygpLnJlcGxhY2UoLyYvZyxcIiUyNlwiKStcIiZNTXBsYXllclR5cGU9XCIraitcIiZNTWRvY3RpdGxlPVwiK2kudGl0bGU7dHlwZW9mIGMuZmxhc2h2YXJzIT1hP2MuZmxhc2h2YXJzKz1cIiZcIitrOmMuZmxhc2h2YXJzPWs7aWYoeS5pZSYmeS53aW4mJmcucmVhZHlTdGF0ZSE9NCl7dmFyIGw9UShcImRpdlwiKTtkKz1cIlNXRk9iamVjdE5ld1wiLGwuc2V0QXR0cmlidXRlKFwiaWRcIixkKSxnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGwsZyksZy5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGZ1bmN0aW9uKCl7Zy5yZWFkeVN0YXRlPT00P2cucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChnKTpzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMTApfSgpfUwoYixjLGQpfX1mdW5jdGlvbiBKKGEpe2lmKHkuaWUmJnkud2luJiZhLnJlYWR5U3RhdGUhPTQpe3ZhciBiPVEoXCJkaXZcIik7YS5wYXJlbnROb2RlLmluc2VydEJlZm9yZShiLGEpLGIucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoSyhhKSxiKSxhLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsZnVuY3Rpb24oKXthLnJlYWR5U3RhdGU9PTQ/YS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpOnNldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCl9KCl9ZWxzZSBhLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKEsoYSksYSl9ZnVuY3Rpb24gSyhhKXt2YXIgYz1RKFwiZGl2XCIpO2lmKHkud2luJiZ5LmllKWMuaW5uZXJIVE1MPWEuaW5uZXJIVE1MO2Vsc2V7dmFyIGQ9YS5nZXRFbGVtZW50c0J5VGFnTmFtZShiKVswXTtpZihkKXt2YXIgZT1kLmNoaWxkTm9kZXM7aWYoZSl7dmFyIGY9ZS5sZW5ndGg7Zm9yKHZhciBnPTA7ZzxmO2crKykoZVtnXS5ub2RlVHlwZSE9MXx8ZVtnXS5ub2RlTmFtZSE9XCJQQVJBTVwiKSYmZVtnXS5ub2RlVHlwZSE9OCYmYy5hcHBlbmRDaGlsZChlW2ddLmNsb25lTm9kZSghMCkpfX19cmV0dXJuIGN9ZnVuY3Rpb24gTChjLGQsZil7dmFyIGcsaD1QKGYpO2lmKHkud2smJnkud2s8MzEyKXJldHVybiBnO2lmKGgpe3R5cGVvZiBjLmlkPT1hJiYoYy5pZD1mKTtpZih5LmllJiZ5Lndpbil7dmFyIGk9XCJcIjtmb3IodmFyIGogaW4gYyljW2pdIT1PYmplY3QucHJvdG90eXBlW2pdJiYoai50b0xvd2VyQ2FzZSgpPT1cImRhdGFcIj9kLm1vdmllPWNbal06ai50b0xvd2VyQ2FzZSgpPT1cInN0eWxlY2xhc3NcIj9pKz0nIGNsYXNzPVwiJytjW2pdKydcIic6ai50b0xvd2VyQ2FzZSgpIT1cImNsYXNzaWRcIiYmKGkrPVwiIFwiK2orJz1cIicrY1tqXSsnXCInKSk7dmFyIGs9XCJcIjtmb3IodmFyIGwgaW4gZClkW2xdIT1PYmplY3QucHJvdG90eXBlW2xdJiYoays9JzxwYXJhbSBuYW1lPVwiJytsKydcIiB2YWx1ZT1cIicrZFtsXSsnXCIgLz4nKTtoLm91dGVySFRNTD0nPG9iamVjdCBjbGFzc2lkPVwiY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwXCInK2krXCI+XCIraytcIjwvb2JqZWN0PlwiLG5bbi5sZW5ndGhdPWMuaWQsZz1QKGMuaWQpfWVsc2V7dmFyIG09UShiKTttLnNldEF0dHJpYnV0ZShcInR5cGVcIixlKTtmb3IodmFyIG8gaW4gYyljW29dIT1PYmplY3QucHJvdG90eXBlW29dJiYoby50b0xvd2VyQ2FzZSgpPT1cInN0eWxlY2xhc3NcIj9tLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsY1tvXSk6by50b0xvd2VyQ2FzZSgpIT1cImNsYXNzaWRcIiYmbS5zZXRBdHRyaWJ1dGUobyxjW29dKSk7Zm9yKHZhciBwIGluIGQpZFtwXSE9T2JqZWN0LnByb3RvdHlwZVtwXSYmcC50b0xvd2VyQ2FzZSgpIT1cIm1vdmllXCImJk0obSxwLGRbcF0pO2gucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobSxoKSxnPW19fXJldHVybiBnfWZ1bmN0aW9uIE0oYSxiLGMpe3ZhciBkPVEoXCJwYXJhbVwiKTtkLnNldEF0dHJpYnV0ZShcIm5hbWVcIixiKSxkLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsYyksYS5hcHBlbmRDaGlsZChkKX1mdW5jdGlvbiBOKGEpe3ZhciBiPVAoYSk7YiYmYi5ub2RlTmFtZT09XCJPQkpFQ1RcIiYmKHkuaWUmJnkud2luPyhiLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsZnVuY3Rpb24oKXtiLnJlYWR5U3RhdGU9PTQ/TyhhKTpzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMTApfSgpKTpiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYikpfWZ1bmN0aW9uIE8oYSl7dmFyIGI9UChhKTtpZihiKXtmb3IodmFyIGMgaW4gYil0eXBlb2YgYltjXT09XCJmdW5jdGlvblwiJiYoYltjXT1udWxsKTtiLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYil9fWZ1bmN0aW9uIFAoYSl7dmFyIGI9bnVsbDt0cnl7Yj1pLmdldEVsZW1lbnRCeUlkKGEpfWNhdGNoKGMpe31yZXR1cm4gYn1mdW5jdGlvbiBRKGEpe3JldHVybiBpLmNyZWF0ZUVsZW1lbnQoYSl9ZnVuY3Rpb24gUihhLGIsYyl7YS5hdHRhY2hFdmVudChiLGMpLG9bby5sZW5ndGhdPVthLGIsY119ZnVuY3Rpb24gUyhhKXt2YXIgYj15LnB2LGM9YS5zcGxpdChcIi5cIik7cmV0dXJuIGNbMF09cGFyc2VJbnQoY1swXSwxMCksY1sxXT1wYXJzZUludChjWzFdLDEwKXx8MCxjWzJdPXBhcnNlSW50KGNbMl0sMTApfHwwLGJbMF0+Y1swXXx8YlswXT09Y1swXSYmYlsxXT5jWzFdfHxiWzBdPT1jWzBdJiZiWzFdPT1jWzFdJiZiWzJdPj1jWzJdPyEwOiExfWZ1bmN0aW9uIFQoYyxkLGUsZil7aWYoeS5pZSYmeS5tYWMpcmV0dXJuO3ZhciBnPWkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdO2lmKCFnKXJldHVybjt2YXIgaD1lJiZ0eXBlb2YgZT09XCJzdHJpbmdcIj9lOlwic2NyZWVuXCI7ZiYmKHY9bnVsbCx3PW51bGwpO2lmKCF2fHx3IT1oKXt2YXIgaj1RKFwic3R5bGVcIik7ai5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsXCJ0ZXh0L2Nzc1wiKSxqLnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsaCksdj1nLmFwcGVuZENoaWxkKGopLHkuaWUmJnkud2luJiZ0eXBlb2YgaS5zdHlsZVNoZWV0cyE9YSYmaS5zdHlsZVNoZWV0cy5sZW5ndGg+MCYmKHY9aS5zdHlsZVNoZWV0c1tpLnN0eWxlU2hlZXRzLmxlbmd0aC0xXSksdz1ofXkuaWUmJnkud2luP3YmJnR5cGVvZiB2LmFkZFJ1bGU9PWImJnYuYWRkUnVsZShjLGQpOnYmJnR5cGVvZiBpLmNyZWF0ZVRleHROb2RlIT1hJiZ2LmFwcGVuZENoaWxkKGkuY3JlYXRlVGV4dE5vZGUoYytcIiB7XCIrZCtcIn1cIikpfWZ1bmN0aW9uIFUoYSxiKXtpZigheClyZXR1cm47dmFyIGM9Yj9cInZpc2libGVcIjpcImhpZGRlblwiO3QmJlAoYSk/UChhKS5zdHlsZS52aXNpYmlsaXR5PWM6VChcIiNcIithLFwidmlzaWJpbGl0eTpcIitjKX1mdW5jdGlvbiBWKGIpe3ZhciBjPS9bXFxcXFxcXCI8PlxcLjtdLyxkPWMuZXhlYyhiKSE9bnVsbDtyZXR1cm4gZCYmdHlwZW9mIGVuY29kZVVSSUNvbXBvbmVudCE9YT9lbmNvZGVVUklDb21wb25lbnQoYik6Yn12YXIgYT1cInVuZGVmaW5lZFwiLGI9XCJvYmplY3RcIixjPVwiU2hvY2t3YXZlIEZsYXNoXCIsZD1cIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoXCIsZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIsZj1cIlNXRk9iamVjdEV4cHJJbnN0XCIsZz1cIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLGg9d2luZG93LGk9ZG9jdW1lbnQsaj1uYXZpZ2F0b3Isaz0hMSxsPVtEXSxtPVtdLG49W10sbz1bXSxwLHEscixzLHQ9ITEsdT0hMSx2LHcseD0hMCx5PWZ1bmN0aW9uKCl7dmFyIGY9dHlwZW9mIGkuZ2V0RWxlbWVudEJ5SWQhPWEmJnR5cGVvZiBpLmdldEVsZW1lbnRzQnlUYWdOYW1lIT1hJiZ0eXBlb2YgaS5jcmVhdGVFbGVtZW50IT1hLGc9ai51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSxsPWoucGxhdGZvcm0udG9Mb3dlckNhc2UoKSxtPWw/L3dpbi8udGVzdChsKTovd2luLy50ZXN0KGcpLG49bD8vbWFjLy50ZXN0KGwpOi9tYWMvLnRlc3QoZyksbz0vd2Via2l0Ly50ZXN0KGcpP3BhcnNlRmxvYXQoZy5yZXBsYWNlKC9eLip3ZWJraXRcXC8oXFxkKyhcXC5cXGQrKT8pLiokLyxcIiQxXCIpKTohMSxwPSExLHE9WzAsMCwwXSxyPW51bGw7aWYodHlwZW9mIGoucGx1Z2lucyE9YSYmdHlwZW9mIGoucGx1Z2luc1tjXT09YilyPWoucGx1Z2luc1tjXS5kZXNjcmlwdGlvbixyJiYodHlwZW9mIGoubWltZVR5cGVzPT1hfHwhai5taW1lVHlwZXNbZV18fCEhai5taW1lVHlwZXNbZV0uZW5hYmxlZFBsdWdpbikmJihrPSEwLHA9ITEscj1yLnJlcGxhY2UoL14uKlxccysoXFxTK1xccytcXFMrJCkvLFwiJDFcIikscVswXT1wYXJzZUludChyLnJlcGxhY2UoL14oLiopXFwuLiokLyxcIiQxXCIpLDEwKSxxWzFdPXBhcnNlSW50KHIucmVwbGFjZSgvXi4qXFwuKC4qKVxccy4qJC8sXCIkMVwiKSwxMCkscVsyXT0vW2EtekEtWl0vLnRlc3Qocik/cGFyc2VJbnQoci5yZXBsYWNlKC9eLipbYS16QS1aXSsoLiopJC8sXCIkMVwiKSwxMCk6MCk7ZWxzZSBpZih0eXBlb2YgaFtbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXSE9YSl0cnl7dmFyIHM9bmV3KHdpbmRvd1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXSkoZCk7cyYmKHI9cy5HZXRWYXJpYWJsZShcIiR2ZXJzaW9uXCIpLHImJihwPSEwLHI9ci5zcGxpdChcIiBcIilbMV0uc3BsaXQoXCIsXCIpLHE9W3BhcnNlSW50KHJbMF0sMTApLHBhcnNlSW50KHJbMV0sMTApLHBhcnNlSW50KHJbMl0sMTApXSkpfWNhdGNoKHQpe31yZXR1cm57dzM6ZixwdjpxLHdrOm8saWU6cCx3aW46bSxtYWM6bn19KCksej1mdW5jdGlvbigpe2lmKCF5LnczKXJldHVybjsodHlwZW9mIGkucmVhZHlTdGF0ZSE9YSYmaS5yZWFkeVN0YXRlPT1cImNvbXBsZXRlXCJ8fHR5cGVvZiBpLnJlYWR5U3RhdGU9PWEmJihpLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXXx8aS5ib2R5KSkmJkEoKSx0fHwodHlwZW9mIGkuYWRkRXZlbnRMaXN0ZW5lciE9YSYmaS5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLEEsITEpLHkuaWUmJnkud2luJiYoaS5hdHRhY2hFdmVudChnLGZ1bmN0aW9uKCl7aS5yZWFkeVN0YXRlPT1cImNvbXBsZXRlXCImJihpLmRldGFjaEV2ZW50KGcsYXJndW1lbnRzLmNhbGxlZSksQSgpKX0pLGg9PXRvcCYmZnVuY3Rpb24oKXtpZih0KXJldHVybjt0cnl7aS5kb2N1bWVudEVsZW1lbnQuZG9TY3JvbGwoXCJsZWZ0XCIpfWNhdGNoKGEpe3NldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwwKTtyZXR1cm59QSgpfSgpKSx5LndrJiZmdW5jdGlvbigpe2lmKHQpcmV0dXJuO2lmKCEvbG9hZGVkfGNvbXBsZXRlLy50ZXN0KGkucmVhZHlTdGF0ZSkpe3NldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwwKTtyZXR1cm59QSgpfSgpLEMoQSkpfSgpLFc9ZnVuY3Rpb24oKXt5LmllJiZ5LndpbiYmd2luZG93LmF0dGFjaEV2ZW50KFwib251bmxvYWRcIixmdW5jdGlvbigpe3ZhciBhPW8ubGVuZ3RoO2Zvcih2YXIgYj0wO2I8YTtiKyspb1tiXVswXS5kZXRhY2hFdmVudChvW2JdWzFdLG9bYl1bMl0pO3ZhciBjPW4ubGVuZ3RoO2Zvcih2YXIgZD0wO2Q8YztkKyspTihuW2RdKTtmb3IodmFyIGUgaW4geSl5W2VdPW51bGw7eT1udWxsO2Zvcih2YXIgZiBpbiBzd2ZvYmplY3Qpc3dmb2JqZWN0W2ZdPW51bGw7c3dmb2JqZWN0PW51bGx9KX0oKTtyZXR1cm57cmVnaXN0ZXJPYmplY3Q6ZnVuY3Rpb24oYSxiLGMsZCl7aWYoeS53MyYmYSYmYil7dmFyIGU9e307ZS5pZD1hLGUuc3dmVmVyc2lvbj1iLGUuZXhwcmVzc0luc3RhbGw9YyxlLmNhbGxiYWNrRm49ZCxtW20ubGVuZ3RoXT1lLFUoYSwhMSl9ZWxzZSBkJiZkKHtzdWNjZXNzOiExLGlkOmF9KX0sZ2V0T2JqZWN0QnlJZDpmdW5jdGlvbihhKXtpZih5LnczKXJldHVybiBHKGEpfSxlbWJlZFNXRjpmdW5jdGlvbihjLGQsZSxmLGcsaCxpLGosayxsKXt2YXIgbT17c3VjY2VzczohMSxpZDpkfTt5LnczJiYhKHkud2smJnkud2s8MzEyKSYmYyYmZCYmZSYmZiYmZz8oVShkLCExKSxCKGZ1bmN0aW9uKCl7ZSs9XCJcIixmKz1cIlwiO3ZhciBuPXt9O2lmKGsmJnR5cGVvZiBrPT09Yilmb3IodmFyIG8gaW4gayluW29dPWtbb107bi5kYXRhPWMsbi53aWR0aD1lLG4uaGVpZ2h0PWY7dmFyIHA9e307aWYoaiYmdHlwZW9mIGo9PT1iKWZvcih2YXIgcSBpbiBqKXBbcV09altxXTtpZihpJiZ0eXBlb2YgaT09PWIpZm9yKHZhciByIGluIGkpdHlwZW9mIHAuZmxhc2h2YXJzIT1hP3AuZmxhc2h2YXJzKz1cIiZcIityK1wiPVwiK2lbcl06cC5mbGFzaHZhcnM9citcIj1cIitpW3JdO2lmKFMoZykpe3ZhciBzPUwobixwLGQpO24uaWQ9PWQmJlUoZCwhMCksbS5zdWNjZXNzPSEwLG0ucmVmPXN9ZWxzZXtpZihoJiZIKCkpe24uZGF0YT1oLEkobixwLGQsbCk7cmV0dXJufVUoZCwhMCl9bCYmbChtKX0pKTpsJiZsKG0pfSxzd2l0Y2hPZmZBdXRvSGlkZVNob3c6ZnVuY3Rpb24oKXt4PSExfSx1YTp5LGdldEZsYXNoUGxheWVyVmVyc2lvbjpmdW5jdGlvbigpe3JldHVybnttYWpvcjp5LnB2WzBdLG1pbm9yOnkucHZbMV0scmVsZWFzZTp5LnB2WzJdfX0saGFzRmxhc2hQbGF5ZXJWZXJzaW9uOlMsY3JlYXRlU1dGOmZ1bmN0aW9uKGEsYixjKXtyZXR1cm4geS53Mz9MKGEsYixjKTp1bmRlZmluZWR9LHNob3dFeHByZXNzSW5zdGFsbDpmdW5jdGlvbihhLGIsYyxkKXt5LnczJiZIKCkmJkkoYSxiLGMsZCl9LHJlbW92ZVNXRjpmdW5jdGlvbihhKXt5LnczJiZOKGEpfSxjcmVhdGVDU1M6ZnVuY3Rpb24oYSxiLGMsZCl7eS53MyYmVChhLGIsYyxkKX0sYWRkRG9tTG9hZEV2ZW50OkIsYWRkTG9hZEV2ZW50OkMsZ2V0UXVlcnlQYXJhbVZhbHVlOmZ1bmN0aW9uKGEpe3ZhciBiPWkubG9jYXRpb24uc2VhcmNofHxpLmxvY2F0aW9uLmhhc2g7aWYoYil7L1xcPy8udGVzdChiKSYmKGI9Yi5zcGxpdChcIj9cIilbMV0pO2lmKGE9PW51bGwpcmV0dXJuIFYoYik7dmFyIGM9Yi5zcGxpdChcIiZcIik7Zm9yKHZhciBkPTA7ZDxjLmxlbmd0aDtkKyspaWYoY1tkXS5zdWJzdHJpbmcoMCxjW2RdLmluZGV4T2YoXCI9XCIpKT09YSlyZXR1cm4gVihjW2RdLnN1YnN0cmluZyhjW2RdLmluZGV4T2YoXCI9XCIpKzEpKX1yZXR1cm5cIlwifSxleHByZXNzSW5zdGFsbENhbGxiYWNrOmZ1bmN0aW9uKCl7aWYodSl7dmFyIGE9UChmKTthJiZwJiYoYS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChwLGEpLHEmJihVKHEsITApLHkuaWUmJnkud2luJiYocC5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIikpLHImJnIocykpLHU9ITF9fX19KCk7KGZ1bmN0aW9uKCl7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIHdpbmRvd3x8d2luZG93LldlYlNvY2tldClyZXR1cm47dmFyIGE9d2luZG93LmNvbnNvbGU7aWYoIWF8fCFhLmxvZ3x8IWEuZXJyb3IpYT17bG9nOmZ1bmN0aW9uKCl7fSxlcnJvcjpmdW5jdGlvbigpe319O2lmKCFzd2ZvYmplY3QuaGFzRmxhc2hQbGF5ZXJWZXJzaW9uKFwiMTAuMC4wXCIpKXthLmVycm9yKFwiRmxhc2ggUGxheWVyID49IDEwLjAuMCBpcyByZXF1aXJlZC5cIik7cmV0dXJufWxvY2F0aW9uLnByb3RvY29sPT1cImZpbGU6XCImJmEuZXJyb3IoXCJXQVJOSU5HOiB3ZWItc29ja2V0LWpzIGRvZXNuJ3Qgd29yayBpbiBmaWxlOi8vLy4uLiBVUkwgdW5sZXNzIHlvdSBzZXQgRmxhc2ggU2VjdXJpdHkgU2V0dGluZ3MgcHJvcGVybHkuIE9wZW4gdGhlIHBhZ2UgdmlhIFdlYiBzZXJ2ZXIgaS5lLiBodHRwOi8vLi4uXCIpLFdlYlNvY2tldD1mdW5jdGlvbihhLGIsYyxkLGUpe3ZhciBmPXRoaXM7Zi5fX2lkPVdlYlNvY2tldC5fX25leHRJZCsrLFdlYlNvY2tldC5fX2luc3RhbmNlc1tmLl9faWRdPWYsZi5yZWFkeVN0YXRlPVdlYlNvY2tldC5DT05ORUNUSU5HLGYuYnVmZmVyZWRBbW91bnQ9MCxmLl9fZXZlbnRzPXt9LGI/dHlwZW9mIGI9PVwic3RyaW5nXCImJihiPVtiXSk6Yj1bXSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7V2ViU29ja2V0Ll9fYWRkVGFzayhmdW5jdGlvbigpe1dlYlNvY2tldC5fX2ZsYXNoLmNyZWF0ZShmLl9faWQsYSxiLGN8fG51bGwsZHx8MCxlfHxudWxsKX0pfSwwKX0sV2ViU29ja2V0LnByb3RvdHlwZS5zZW5kPWZ1bmN0aW9uKGEpe2lmKHRoaXMucmVhZHlTdGF0ZT09V2ViU29ja2V0LkNPTk5FQ1RJTkcpdGhyb3dcIklOVkFMSURfU1RBVEVfRVJSOiBXZWIgU29ja2V0IGNvbm5lY3Rpb24gaGFzIG5vdCBiZWVuIGVzdGFibGlzaGVkXCI7dmFyIGI9V2ViU29ja2V0Ll9fZmxhc2guc2VuZCh0aGlzLl9faWQsZW5jb2RlVVJJQ29tcG9uZW50KGEpKTtyZXR1cm4gYjwwPyEwOih0aGlzLmJ1ZmZlcmVkQW1vdW50Kz1iLCExKX0sV2ViU29ja2V0LnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe2lmKHRoaXMucmVhZHlTdGF0ZT09V2ViU29ja2V0LkNMT1NFRHx8dGhpcy5yZWFkeVN0YXRlPT1XZWJTb2NrZXQuQ0xPU0lORylyZXR1cm47dGhpcy5yZWFkeVN0YXRlPVdlYlNvY2tldC5DTE9TSU5HLFdlYlNvY2tldC5fX2ZsYXNoLmNsb3NlKHRoaXMuX19pZCl9LFdlYlNvY2tldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihhLGIsYyl7YSBpbiB0aGlzLl9fZXZlbnRzfHwodGhpcy5fX2V2ZW50c1thXT1bXSksdGhpcy5fX2V2ZW50c1thXS5wdXNoKGIpfSxXZWJTb2NrZXQucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24oYSxiLGMpe2lmKCEoYSBpbiB0aGlzLl9fZXZlbnRzKSlyZXR1cm47dmFyIGQ9dGhpcy5fX2V2ZW50c1thXTtmb3IodmFyIGU9ZC5sZW5ndGgtMTtlPj0wOy0tZSlpZihkW2VdPT09Yil7ZC5zcGxpY2UoZSwxKTticmVha319LFdlYlNvY2tldC5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudD1mdW5jdGlvbihhKXt2YXIgYj10aGlzLl9fZXZlbnRzW2EudHlwZV18fFtdO2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7KytjKWJbY10oYSk7dmFyIGQ9dGhpc1tcIm9uXCIrYS50eXBlXTtkJiZkKGEpfSxXZWJTb2NrZXQucHJvdG90eXBlLl9faGFuZGxlRXZlbnQ9ZnVuY3Rpb24oYSl7XCJyZWFkeVN0YXRlXCJpbiBhJiYodGhpcy5yZWFkeVN0YXRlPWEucmVhZHlTdGF0ZSksXCJwcm90b2NvbFwiaW4gYSYmKHRoaXMucHJvdG9jb2w9YS5wcm90b2NvbCk7dmFyIGI7aWYoYS50eXBlPT1cIm9wZW5cInx8YS50eXBlPT1cImVycm9yXCIpYj10aGlzLl9fY3JlYXRlU2ltcGxlRXZlbnQoYS50eXBlKTtlbHNlIGlmKGEudHlwZT09XCJjbG9zZVwiKWI9dGhpcy5fX2NyZWF0ZVNpbXBsZUV2ZW50KFwiY2xvc2VcIik7ZWxzZXtpZihhLnR5cGUhPVwibWVzc2FnZVwiKXRocm93XCJ1bmtub3duIGV2ZW50IHR5cGU6IFwiK2EudHlwZTt2YXIgYz1kZWNvZGVVUklDb21wb25lbnQoYS5tZXNzYWdlKTtiPXRoaXMuX19jcmVhdGVNZXNzYWdlRXZlbnQoXCJtZXNzYWdlXCIsYyl9dGhpcy5kaXNwYXRjaEV2ZW50KGIpfSxXZWJTb2NrZXQucHJvdG90eXBlLl9fY3JlYXRlU2ltcGxlRXZlbnQ9ZnVuY3Rpb24oYSl7aWYoZG9jdW1lbnQuY3JlYXRlRXZlbnQmJndpbmRvdy5FdmVudCl7dmFyIGI9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJFdmVudFwiKTtyZXR1cm4gYi5pbml0RXZlbnQoYSwhMSwhMSksYn1yZXR1cm57dHlwZTphLGJ1YmJsZXM6ITEsY2FuY2VsYWJsZTohMX19LFdlYlNvY2tldC5wcm90b3R5cGUuX19jcmVhdGVNZXNzYWdlRXZlbnQ9ZnVuY3Rpb24oYSxiKXtpZihkb2N1bWVudC5jcmVhdGVFdmVudCYmd2luZG93Lk1lc3NhZ2VFdmVudCYmIXdpbmRvdy5vcGVyYSl7dmFyIGM9ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNZXNzYWdlRXZlbnRcIik7cmV0dXJuIGMuaW5pdE1lc3NhZ2VFdmVudChcIm1lc3NhZ2VcIiwhMSwhMSxiLG51bGwsbnVsbCx3aW5kb3csbnVsbCksY31yZXR1cm57dHlwZTphLGRhdGE6YixidWJibGVzOiExLGNhbmNlbGFibGU6ITF9fSxXZWJTb2NrZXQuQ09OTkVDVElORz0wLFdlYlNvY2tldC5PUEVOPTEsV2ViU29ja2V0LkNMT1NJTkc9MixXZWJTb2NrZXQuQ0xPU0VEPTMsV2ViU29ja2V0Ll9fZmxhc2g9bnVsbCxXZWJTb2NrZXQuX19pbnN0YW5jZXM9e30sV2ViU29ja2V0Ll9fdGFza3M9W10sV2ViU29ja2V0Ll9fbmV4dElkPTAsV2ViU29ja2V0LmxvYWRGbGFzaFBvbGljeUZpbGU9ZnVuY3Rpb24oYSl7V2ViU29ja2V0Ll9fYWRkVGFzayhmdW5jdGlvbigpe1dlYlNvY2tldC5fX2ZsYXNoLmxvYWRNYW51YWxQb2xpY3lGaWxlKGEpfSl9LFdlYlNvY2tldC5fX2luaXRpYWxpemU9ZnVuY3Rpb24oKXtpZihXZWJTb2NrZXQuX19mbGFzaClyZXR1cm47V2ViU29ja2V0Ll9fc3dmTG9jYXRpb24mJih3aW5kb3cuV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT049V2ViU29ja2V0Ll9fc3dmTG9jYXRpb24pO2lmKCF3aW5kb3cuV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04pe2EuZXJyb3IoXCJbV2ViU29ja2V0XSBzZXQgV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04gdG8gbG9jYXRpb24gb2YgV2ViU29ja2V0TWFpbi5zd2ZcIik7cmV0dXJufXZhciBiPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Yi5pZD1cIndlYlNvY2tldENvbnRhaW5lclwiLGIuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLFdlYlNvY2tldC5fX2lzRmxhc2hMaXRlKCk/KGIuc3R5bGUubGVmdD1cIjBweFwiLGIuc3R5bGUudG9wPVwiMHB4XCIpOihiLnN0eWxlLmxlZnQ9XCItMTAwcHhcIixiLnN0eWxlLnRvcD1cIi0xMDBweFwiKTt2YXIgYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2MuaWQ9XCJ3ZWJTb2NrZXRGbGFzaFwiLGIuYXBwZW5kQ2hpbGQoYyksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChiKSxzd2ZvYmplY3QuZW1iZWRTV0YoV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04sXCJ3ZWJTb2NrZXRGbGFzaFwiLFwiMVwiLFwiMVwiLFwiMTAuMC4wXCIsbnVsbCxudWxsLHtoYXNQcmlvcml0eTohMCxzd2xpdmVjb25uZWN0OiEwLGFsbG93U2NyaXB0QWNjZXNzOlwiYWx3YXlzXCJ9LG51bGwsZnVuY3Rpb24oYil7Yi5zdWNjZXNzfHxhLmVycm9yKFwiW1dlYlNvY2tldF0gc3dmb2JqZWN0LmVtYmVkU1dGIGZhaWxlZFwiKX0pfSxXZWJTb2NrZXQuX19vbkZsYXNoSW5pdGlhbGl6ZWQ9ZnVuY3Rpb24oKXtzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7V2ViU29ja2V0Ll9fZmxhc2g9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ3ZWJTb2NrZXRGbGFzaFwiKSxXZWJTb2NrZXQuX19mbGFzaC5zZXRDYWxsZXJVcmwobG9jYXRpb24uaHJlZiksV2ViU29ja2V0Ll9fZmxhc2guc2V0RGVidWcoISF3aW5kb3cuV0VCX1NPQ0tFVF9ERUJVRyk7Zm9yKHZhciBhPTA7YTxXZWJTb2NrZXQuX190YXNrcy5sZW5ndGg7KythKVdlYlNvY2tldC5fX3Rhc2tzW2FdKCk7V2ViU29ja2V0Ll9fdGFza3M9W119LDApfSxXZWJTb2NrZXQuX19vbkZsYXNoRXZlbnQ9ZnVuY3Rpb24oKXtyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe3RyeXt2YXIgYj1XZWJTb2NrZXQuX19mbGFzaC5yZWNlaXZlRXZlbnRzKCk7Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDsrK2MpV2ViU29ja2V0Ll9faW5zdGFuY2VzW2JbY10ud2ViU29ja2V0SWRdLl9faGFuZGxlRXZlbnQoYltjXSl9Y2F0Y2goZCl7YS5lcnJvcihkKX19LDApLCEwfSxXZWJTb2NrZXQuX19sb2c9ZnVuY3Rpb24oYil7YS5sb2coZGVjb2RlVVJJQ29tcG9uZW50KGIpKX0sV2ViU29ja2V0Ll9fZXJyb3I9ZnVuY3Rpb24oYil7YS5lcnJvcihkZWNvZGVVUklDb21wb25lbnQoYikpfSxXZWJTb2NrZXQuX19hZGRUYXNrPWZ1bmN0aW9uKGEpe1dlYlNvY2tldC5fX2ZsYXNoP2EoKTpXZWJTb2NrZXQuX190YXNrcy5wdXNoKGEpfSxXZWJTb2NrZXQuX19pc0ZsYXNoTGl0ZT1mdW5jdGlvbigpe2lmKCF3aW5kb3cubmF2aWdhdG9yfHwhd2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXMpcmV0dXJuITE7dmFyIGE9d2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXNbXCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiXTtyZXR1cm4hYXx8IWEuZW5hYmxlZFBsdWdpbnx8IWEuZW5hYmxlZFBsdWdpbi5maWxlbmFtZT8hMTphLmVuYWJsZWRQbHVnaW4uZmlsZW5hbWUubWF0Y2goL2ZsYXNobGl0ZS9pKT8hMDohMX0sd2luZG93LldFQl9TT0NLRVRfRElTQUJMRV9BVVRPX0lOSVRJQUxJWkFUSU9OfHwod2luZG93LmFkZEV2ZW50TGlzdGVuZXI/d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oKXtXZWJTb2NrZXQuX19pbml0aWFsaXplKCl9LCExKTp3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIixmdW5jdGlvbigpe1dlYlNvY2tldC5fX2luaXRpYWxpemUoKX0pKX0pKCksZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoYSl7aWYoIWEpcmV0dXJuO2IuVHJhbnNwb3J0LmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLnNlbmRCdWZmZXI9W119ZnVuY3Rpb24gZSgpe31hLlhIUj1kLGIudXRpbC5pbmhlcml0KGQsYi5UcmFuc3BvcnQpLGQucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb2NrZXQuc2V0QnVmZmVyKCExKSx0aGlzLm9uT3BlbigpLHRoaXMuZ2V0KCksdGhpcy5zZXRDbG9zZVRpbWVvdXQoKSx0aGlzfSxkLnByb3RvdHlwZS5wYXlsb2FkPWZ1bmN0aW9uKGEpe3ZhciBjPVtdO2Zvcih2YXIgZD0wLGU9YS5sZW5ndGg7ZDxlO2QrKyljLnB1c2goYi5wYXJzZXIuZW5jb2RlUGFja2V0KGFbZF0pKTt0aGlzLnNlbmQoYi5wYXJzZXIuZW5jb2RlUGF5bG9hZChjKSl9LGQucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMucG9zdChhKSx0aGlzfSxkLnByb3RvdHlwZS5wb3N0PWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGQoKXt0aGlzLnJlYWR5U3RhdGU9PTQmJih0aGlzLm9ucmVhZHlzdGF0ZWNoYW5nZT1lLGIucG9zdGluZz0hMSx0aGlzLnN0YXR1cz09MjAwP2Iuc29ja2V0LnNldEJ1ZmZlcighMSk6Yi5vbkNsb3NlKCkpfWZ1bmN0aW9uIGYoKXt0aGlzLm9ubG9hZD1lLGIuc29ja2V0LnNldEJ1ZmZlcighMSl9dmFyIGI9dGhpczt0aGlzLnNvY2tldC5zZXRCdWZmZXIoITApLHRoaXMuc2VuZFhIUj10aGlzLnJlcXVlc3QoXCJQT1NUXCIpLGMuWERvbWFpblJlcXVlc3QmJnRoaXMuc2VuZFhIUiBpbnN0YW5jZW9mIFhEb21haW5SZXF1ZXN0P3RoaXMuc2VuZFhIUi5vbmxvYWQ9dGhpcy5zZW5kWEhSLm9uZXJyb3I9Zjp0aGlzLnNlbmRYSFIub25yZWFkeXN0YXRlY2hhbmdlPWQsdGhpcy5zZW5kWEhSLnNlbmQoYSl9LGQucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMub25DbG9zZSgpLHRoaXN9LGQucHJvdG90eXBlLnJlcXVlc3Q9ZnVuY3Rpb24oYSl7dmFyIGM9Yi51dGlsLnJlcXVlc3QodGhpcy5zb2NrZXQuaXNYRG9tYWluKCkpLGQ9Yi51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnksXCJ0PVwiKyArKG5ldyBEYXRlKSk7Yy5vcGVuKGF8fFwiR0VUXCIsdGhpcy5wcmVwYXJlVXJsKCkrZCwhMCk7aWYoYT09XCJQT1NUXCIpdHJ5e2Muc2V0UmVxdWVzdEhlYWRlcj9jLnNldFJlcXVlc3RIZWFkZXIoXCJDb250ZW50LXR5cGVcIixcInRleHQvcGxhaW47Y2hhcnNldD1VVEYtOFwiKTpjLmNvbnRlbnRUeXBlPVwidGV4dC9wbGFpblwifWNhdGNoKGUpe31yZXR1cm4gY30sZC5wcm90b3R5cGUuc2NoZW1lPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc29ja2V0Lm9wdGlvbnMuc2VjdXJlP1wiaHR0cHNcIjpcImh0dHBcIn0sZC5jaGVjaz1mdW5jdGlvbihhLGQpe3RyeXt2YXIgZT1iLnV0aWwucmVxdWVzdChkKSxmPWMuWERvbWFpblJlcXVlc3QmJmUgaW5zdGFuY2VvZiBYRG9tYWluUmVxdWVzdCxnPWEmJmEub3B0aW9ucyYmYS5vcHRpb25zLnNlY3VyZT9cImh0dHBzOlwiOlwiaHR0cDpcIixoPWMubG9jYXRpb24mJmchPWMubG9jYXRpb24ucHJvdG9jb2w7aWYoZSYmKCFmfHwhaCkpcmV0dXJuITB9Y2F0Y2goaSl7fXJldHVybiExfSxkLnhkb21haW5DaGVjaz1mdW5jdGlvbihhKXtyZXR1cm4gZC5jaGVjayhhLCEwKX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pby5UcmFuc3BvcnQ6bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyx0aGlzKSxmdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoYSl7Yi5UcmFuc3BvcnQuWEhSLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1hLmh0bWxmaWxlPWMsYi51dGlsLmluaGVyaXQoYyxiLlRyYW5zcG9ydC5YSFIpLGMucHJvdG90eXBlLm5hbWU9XCJodG1sZmlsZVwiLGMucHJvdG90eXBlLmdldD1mdW5jdGlvbigpe3RoaXMuZG9jPW5ldyh3aW5kb3dbW1wiQWN0aXZlXCJdLmNvbmNhdChcIk9iamVjdFwiKS5qb2luKFwiWFwiKV0pKFwiaHRtbGZpbGVcIiksdGhpcy5kb2Mub3BlbigpLHRoaXMuZG9jLndyaXRlKFwiPGh0bWw+PC9odG1sPlwiKSx0aGlzLmRvYy5jbG9zZSgpLHRoaXMuZG9jLnBhcmVudFdpbmRvdy5zPXRoaXM7dmFyIGE9dGhpcy5kb2MuY3JlYXRlRWxlbWVudChcImRpdlwiKTthLmNsYXNzTmFtZT1cInNvY2tldGlvXCIsdGhpcy5kb2MuYm9keS5hcHBlbmRDaGlsZChhKSx0aGlzLmlmcmFtZT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpLGEuYXBwZW5kQ2hpbGQodGhpcy5pZnJhbWUpO3ZhciBjPXRoaXMsZD1iLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSxcInQ9XCIrICsobmV3IERhdGUpKTt0aGlzLmlmcmFtZS5zcmM9dGhpcy5wcmVwYXJlVXJsKCkrZCxiLnV0aWwub24od2luZG93LFwidW5sb2FkXCIsZnVuY3Rpb24oKXtjLmRlc3Ryb3koKX0pfSxjLnByb3RvdHlwZS5fPWZ1bmN0aW9uKGEsYil7YT1hLnJlcGxhY2UoL1xcXFxcXC8vZyxcIi9cIiksdGhpcy5vbkRhdGEoYSk7dHJ5e3ZhciBjPWIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF07Yy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGMpfWNhdGNoKGQpe319LGMucHJvdG90eXBlLmRlc3Ryb3k9ZnVuY3Rpb24oKXtpZih0aGlzLmlmcmFtZSl7dHJ5e3RoaXMuaWZyYW1lLnNyYz1cImFib3V0OmJsYW5rXCJ9Y2F0Y2goYSl7fXRoaXMuZG9jPW51bGwsdGhpcy5pZnJhbWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmlmcmFtZSksdGhpcy5pZnJhbWU9bnVsbCxDb2xsZWN0R2FyYmFnZSgpfX0sYy5wcm90b3R5cGUuY2xvc2U9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5kZXN0cm95KCksYi5UcmFuc3BvcnQuWEhSLnByb3RvdHlwZS5jbG9zZS5jYWxsKHRoaXMpfSxjLmNoZWNrPWZ1bmN0aW9uKGEpe2lmKHR5cGVvZiB3aW5kb3chPVwidW5kZWZpbmVkXCImJltcIkFjdGl2ZVwiXS5jb25jYXQoXCJPYmplY3RcIikuam9pbihcIlhcIilpbiB3aW5kb3cpdHJ5e3ZhciBjPW5ldyh3aW5kb3dbW1wiQWN0aXZlXCJdLmNvbmNhdChcIk9iamVjdFwiKS5qb2luKFwiWFwiKV0pKFwiaHRtbGZpbGVcIik7cmV0dXJuIGMmJmIuVHJhbnNwb3J0LlhIUi5jaGVjayhhKX1jYXRjaChkKXt9cmV0dXJuITF9LGMueGRvbWFpbkNoZWNrPWZ1bmN0aW9uKCl7cmV0dXJuITF9LGIudHJhbnNwb3J0cy5wdXNoKFwiaHRtbGZpbGVcIil9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pby5UcmFuc3BvcnQ6bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyksZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoKXtiLlRyYW5zcG9ydC5YSFIuYXBwbHkodGhpcyxhcmd1bWVudHMpfWZ1bmN0aW9uIGUoKXt9YVtcInhoci1wb2xsaW5nXCJdPWQsYi51dGlsLmluaGVyaXQoZCxiLlRyYW5zcG9ydC5YSFIpLGIudXRpbC5tZXJnZShkLGIuVHJhbnNwb3J0LlhIUiksZC5wcm90b3R5cGUubmFtZT1cInhoci1wb2xsaW5nXCIsZC5wcm90b3R5cGUuaGVhcnRiZWF0cz1mdW5jdGlvbigpe3JldHVybiExfSxkLnByb3RvdHlwZS5vcGVuPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcztyZXR1cm4gYi5UcmFuc3BvcnQuWEhSLnByb3RvdHlwZS5vcGVuLmNhbGwoYSksITF9LGQucHJvdG90eXBlLmdldD1mdW5jdGlvbigpe2Z1bmN0aW9uIGIoKXt0aGlzLnJlYWR5U3RhdGU9PTQmJih0aGlzLm9ucmVhZHlzdGF0ZWNoYW5nZT1lLHRoaXMuc3RhdHVzPT0yMDA/KGEub25EYXRhKHRoaXMucmVzcG9uc2VUZXh0KSxhLmdldCgpKTphLm9uQ2xvc2UoKSl9ZnVuY3Rpb24gZCgpe3RoaXMub25sb2FkPWUsdGhpcy5vbmVycm9yPWUsYS5yZXRyeUNvdW50ZXI9MSxhLm9uRGF0YSh0aGlzLnJlc3BvbnNlVGV4dCksYS5nZXQoKX1mdW5jdGlvbiBmKCl7YS5yZXRyeUNvdW50ZXIrKywhYS5yZXRyeUNvdW50ZXJ8fGEucmV0cnlDb3VudGVyPjM/YS5vbkNsb3NlKCk6YS5nZXQoKX1pZighdGhpcy5pc09wZW4pcmV0dXJuO3ZhciBhPXRoaXM7dGhpcy54aHI9dGhpcy5yZXF1ZXN0KCksYy5YRG9tYWluUmVxdWVzdCYmdGhpcy54aHIgaW5zdGFuY2VvZiBYRG9tYWluUmVxdWVzdD8odGhpcy54aHIub25sb2FkPWQsdGhpcy54aHIub25lcnJvcj1mKTp0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2U9Yix0aGlzLnhoci5zZW5kKG51bGwpfSxkLnByb3RvdHlwZS5vbkNsb3NlPWZ1bmN0aW9uKCl7Yi5UcmFuc3BvcnQuWEhSLnByb3RvdHlwZS5vbkNsb3NlLmNhbGwodGhpcyk7aWYodGhpcy54aHIpe3RoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZT10aGlzLnhoci5vbmxvYWQ9dGhpcy54aHIub25lcnJvcj1lO3RyeXt0aGlzLnhoci5hYm9ydCgpfWNhdGNoKGEpe310aGlzLnhocj1udWxsfX0sZC5wcm90b3R5cGUucmVhZHk9ZnVuY3Rpb24oYSxjKXt2YXIgZD10aGlzO2IudXRpbC5kZWZlcihmdW5jdGlvbigpe2MuY2FsbChkKX0pfSxiLnRyYW5zcG9ydHMucHVzaChcInhoci1wb2xsaW5nXCIpfShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW8uVHJhbnNwb3J0Om1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMsdGhpcyksZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGUoYSl7Yi5UcmFuc3BvcnRbXCJ4aHItcG9sbGluZ1wiXS5hcHBseSh0aGlzLGFyZ3VtZW50cyksdGhpcy5pbmRleD1iLmoubGVuZ3RoO3ZhciBjPXRoaXM7Yi5qLnB1c2goZnVuY3Rpb24oYSl7Yy5fKGEpfSl9dmFyIGQ9Yy5kb2N1bWVudCYmXCJNb3pBcHBlYXJhbmNlXCJpbiBjLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZTthW1wianNvbnAtcG9sbGluZ1wiXT1lLGIudXRpbC5pbmhlcml0KGUsYi5UcmFuc3BvcnRbXCJ4aHItcG9sbGluZ1wiXSksZS5wcm90b3R5cGUubmFtZT1cImpzb25wLXBvbGxpbmdcIixlLnByb3RvdHlwZS5wb3N0PWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGkoKXtqKCksYy5zb2NrZXQuc2V0QnVmZmVyKCExKX1mdW5jdGlvbiBqKCl7Yy5pZnJhbWUmJmMuZm9ybS5yZW1vdmVDaGlsZChjLmlmcmFtZSk7dHJ5e2g9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnPGlmcmFtZSBuYW1lPVwiJytjLmlmcmFtZUlkKydcIj4nKX1jYXRjaChhKXtoPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIiksaC5uYW1lPWMuaWZyYW1lSWR9aC5pZD1jLmlmcmFtZUlkLGMuZm9ybS5hcHBlbmRDaGlsZChoKSxjLmlmcmFtZT1ofXZhciBjPXRoaXMsZD1iLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSxcInQ9XCIrICsobmV3IERhdGUpK1wiJmk9XCIrdGhpcy5pbmRleCk7aWYoIXRoaXMuZm9ybSl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZvcm1cIiksZj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGV4dGFyZWFcIiksZz10aGlzLmlmcmFtZUlkPVwic29ja2V0aW9faWZyYW1lX1wiK3RoaXMuaW5kZXgsaDtlLmNsYXNzTmFtZT1cInNvY2tldGlvXCIsZS5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsZS5zdHlsZS50b3A9XCIwcHhcIixlLnN0eWxlLmxlZnQ9XCIwcHhcIixlLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsZS50YXJnZXQ9ZyxlLm1ldGhvZD1cIlBPU1RcIixlLnNldEF0dHJpYnV0ZShcImFjY2VwdC1jaGFyc2V0XCIsXCJ1dGYtOFwiKSxmLm5hbWU9XCJkXCIsZS5hcHBlbmRDaGlsZChmKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGUpLHRoaXMuZm9ybT1lLHRoaXMuYXJlYT1mfXRoaXMuZm9ybS5hY3Rpb249dGhpcy5wcmVwYXJlVXJsKCkrZCxqKCksdGhpcy5hcmVhLnZhbHVlPWIuSlNPTi5zdHJpbmdpZnkoYSk7dHJ5e3RoaXMuZm9ybS5zdWJtaXQoKX1jYXRjaChrKXt9dGhpcy5pZnJhbWUuYXR0YWNoRXZlbnQ/aC5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtjLmlmcmFtZS5yZWFkeVN0YXRlPT1cImNvbXBsZXRlXCImJmkoKX06dGhpcy5pZnJhbWUub25sb2FkPWksdGhpcy5zb2NrZXQuc2V0QnVmZmVyKCEwKX0sZS5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIiksZT1iLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSxcInQ9XCIrICsobmV3IERhdGUpK1wiJmk9XCIrdGhpcy5pbmRleCk7dGhpcy5zY3JpcHQmJih0aGlzLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuc2NyaXB0KSx0aGlzLnNjcmlwdD1udWxsKSxjLmFzeW5jPSEwLGMuc3JjPXRoaXMucHJlcGFyZVVybCgpK2UsYy5vbmVycm9yPWZ1bmN0aW9uKCl7YS5vbkNsb3NlKCl9O3ZhciBmPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdO2YucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYyxmKSx0aGlzLnNjcmlwdD1jLGQmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXt2YXIgYT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO2RvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYSksZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChhKX0sMTAwKX0sZS5wcm90b3R5cGUuXz1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5vbkRhdGEoYSksdGhpcy5pc09wZW4mJnRoaXMuZ2V0KCksdGhpc30sZS5wcm90b3R5cGUucmVhZHk9ZnVuY3Rpb24oYSxjKXt2YXIgZT10aGlzO2lmKCFkKXJldHVybiBjLmNhbGwodGhpcyk7Yi51dGlsLmxvYWQoZnVuY3Rpb24oKXtjLmNhbGwoZSl9KX0sZS5jaGVjaz1mdW5jdGlvbigpe3JldHVyblwiZG9jdW1lbnRcImluIGN9LGUueGRvbWFpbkNoZWNrPWZ1bmN0aW9uKCl7cmV0dXJuITB9LGIudHJhbnNwb3J0cy5wdXNoKFwianNvbnAtcG9sbGluZ1wiKX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvLlRyYW5zcG9ydDptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzLHRoaXMpLHR5cGVvZiBkZWZpbmU9PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCYmZGVmaW5lKFtdLGZ1bmN0aW9uKCl7cmV0dXJuIGlvfSl9KSgpIiwiZXhwb3J0cy5ydW4gPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdHZhciBkb05vdGhpbmc9ZnVuY3Rpb24oKXt9O1xuXHR2YXIgcGFzcyA9IG9wdGlvbnMucGFzc3x8ZG9Ob3RoaW5nO1xuXHR2YXIgZmFpbCA9IG9wdGlvbnMuZmFpbHx8ZG9Ob3RoaW5nO1xuXHR2YXIgZW5kID0gb3B0aW9ucy5lbmR8fGRvTm90aGluZztcblx0dmFyIG1vY2hhID0gb3B0aW9ucy5pbnN0YW5jZTtcblxuXHRmdW5jdGlvbiBSZXBvcnRlcihydW5uZXIpIHtcblxuXHRcdHJ1bm5lci5vbigncGFzcycsIGZ1bmN0aW9uKHRlc3QpIHtcblx0XHRcdHBhc3Moe1xuXHRcdFx0XHR0aXRsZTogdGVzdC50aXRsZSxcblx0XHRcdFx0ZnVsbFRpdGxlOiB0ZXN0LmZ1bGxUaXRsZSgpLFxuXHRcdFx0XHRkdXJhdGlvbjogdGVzdC5kdXJhdGlvbixcblx0XHRcdH0pXG5cdFx0fSk7XG5cblx0XHRydW5uZXIub24oJ2ZhaWwnLCBmdW5jdGlvbih0ZXN0LCBlcnIpIHtcblx0XHRcdGZhaWwoe1xuXHRcdFx0XHR0aXRsZTogdGVzdC50aXRsZSxcblx0XHRcdFx0ZnVsbFRpdGxlOiB0ZXN0LmZ1bGxUaXRsZSgpLFxuXHRcdFx0XHRkdXJhdGlvbjogdGVzdC5kdXJhdGlvbixcblx0XHRcdFx0ZXJyb3I6IGVyci5tZXNzYWdlXG5cdFx0XHR9KTtcblx0XHR9KTtcblxuXHRcdHJ1bm5lci5vbignZW5kJywgZnVuY3Rpb24oKSB7XG5cdFx0XHRlbmQoKTtcblx0XHR9KTtcblx0fVxuXG5cdG1vY2hhLnJlcG9ydGVyKFJlcG9ydGVyKTtcblx0bW9jaGEucnVuKCk7XG59IiwiZXhwb3J0cy5ydW4gPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdHZhciBkb05vdGhpbmcgPSBmdW5jdGlvbigpIHt9O1xuXHR2YXIgcGFzcyA9IG9wdGlvbnMucGFzcyB8fCBkb05vdGhpbmc7XG5cdHZhciBmYWlsID0gb3B0aW9ucy5mYWlsIHx8IGRvTm90aGluZztcblx0dmFyIGVuZCA9IG9wdGlvbnMuZW5kIHx8IGRvTm90aGluZztcblx0dmFyIHdpbmRvdyA9IG9wdGlvbnMuaW5zdGFuY2U7XG5cblx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvciwgdXJsLCBsaW5lKSB7XG5cdFx0ZmFpbCh7XG5cdFx0XHR0aXRsZTogZXJyb3IsXG5cdFx0XHRmdWxsVGl0bGU6IGVycm9yLFxuXHRcdFx0ZHVyYXRpb246IDAsXG5cdFx0XHRlcnJvcjogJ0VSUjonICsgZXJyb3IgKyAnIExJTkU6JyArIGxpbmVcblx0XHR9KVxuXHR9O1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0ZW5kKCk7XG5cdH0sIDUwMDApO1xufSJdfQ==
