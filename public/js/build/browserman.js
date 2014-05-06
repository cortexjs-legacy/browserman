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

//support socket.io jsonp
window.io = io;

function Browserman(options) {
	var options = options || {};
	this.type = options.type || 'mocha',
	this.instance = options.instance || mocha;
	this.reporter = {
		'mocha': require('./reporter/mocha'),
		'plain': require('./reporter/plain')
	}
}

Browserman.prototype.init = function() {
	var node = document.getElementById('browserman');
	var server = node.getAttribute('data-server');
	var query = querystring.parse(location.search.replace('?', ''));
	var jobId = node.getAttribute('data-jobid') || query.browserman_jobid;
	var needsSceenshot = (!query.browserman_screenshot || query.browserman_screenshot== 'false') ? false : true;
	
	var connected = false;
	
	var self = this;

	if (!jobId) {
		return;
	}

	var socket = io.connect('http://' + server + '/tester');
	socket.on('connect', function() {
		connected = true;
	});
	var result = {
		jobId: jobId,
		browser: {
			name: browser.name.toLowerCase(),
			version: browser.version + '.0',
			os: getOS()
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
					//setTimeout(window.close, 500);
				}
				clearInterval(interval);
			}, 200);
		}
	});
};

function getOS() {
	var os = "Unknown OS";
	if (navigator.appVersion.indexOf("Win") != -1) os = "windows";
	if (navigator.appVersion.indexOf("Mac") != -1) os = "mac";
	if (navigator.appVersion.indexOf("X11") != -1) os = "unix";
	if (navigator.appVersion.indexOf("Linux") != -1) os = "linux";
	return os;
}

if (window.mocha) {
	new Browserman({
		type: 'mocha',
		instance: window.mocha
	}).init();
} else {
	new Browserman({
		type: 'plain',
		instance: window
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
	
	if (oCanvas.getContext && oCanvas.getContext("2d")) {
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
				duration: test.duration
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvYm93c2VyL2Jvd3Nlci5qcyIsIi9Vc2Vycy9sdGViZWFuL0Rlc2t0b3Avbm9kZWpzIHdvcmtzcGFjZS9icm93c2VybWFuL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9mYWtlX2JiMjAxMWUzLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9saWIvY2FudmFzMmltYWdlLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9saWIvaHRtbDJjYW52YXMuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9wdWJsaWMvanMvZGV2L2xpYi9zb2NrZXQuaW8uanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9wdWJsaWMvanMvZGV2L3JlcG9ydGVyL21vY2hhLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9yZXBvcnRlci9wbGFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2ekZBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAgKiBCb3dzZXIgLSBhIGJyb3dzZXIgZGV0ZWN0b3JcbiAgKiBodHRwczovL2dpdGh1Yi5jb20vZGVkL2Jvd3NlclxuICAqIE1JVCBMaWNlbnNlIHwgKGMpIER1c3RpbiBEaWF6IDIwMTRcbiAgKi9cblxuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0c1snYnJvd3NlciddID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxufSgnYm93c2VyJywgZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICAqIFNlZSB1c2VyYWdlbnRzLmpzIGZvciBleGFtcGxlcyBvZiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgKi9cblxuICB2YXIgdCA9IHRydWVcblxuICBmdW5jdGlvbiBkZXRlY3QodWEpIHtcblxuICAgIGZ1bmN0aW9uIGdldEZpcnN0TWF0Y2gocmVnZXgpIHtcbiAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKHJlZ2V4KTtcbiAgICAgIHJldHVybiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaFsxXSkgfHwgJyc7XG4gICAgfVxuXG4gICAgdmFyIGlvc2RldmljZSA9IGdldEZpcnN0TWF0Y2goLyhpcG9kfGlwaG9uZXxpcGFkKS9pKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGxpa2VBbmRyb2lkID0gL2xpa2UgYW5kcm9pZC9pLnRlc3QodWEpXG4gICAgICAsIGFuZHJvaWQgPSAhbGlrZUFuZHJvaWQgJiYgL2FuZHJvaWQvaS50ZXN0KHVhKVxuICAgICAgLCB2ZXJzaW9uSWRlbnRpZmllciA9IGdldEZpcnN0TWF0Y2goL3ZlcnNpb25cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICAsIHRhYmxldCA9IC90YWJsZXQvaS50ZXN0KHVhKVxuICAgICAgLCBtb2JpbGUgPSAhdGFibGV0ICYmIC9bXi1dbW9iaS9pLnRlc3QodWEpXG4gICAgICAsIHJlc3VsdFxuXG4gICAgaWYgKC9vcGVyYXxvcHIvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnT3BlcmEnXG4gICAgICAsIG9wZXJhOiB0XG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyIHx8IGdldEZpcnN0TWF0Y2goLyg/Om9wZXJhfG9wcilbXFxzXFwvXShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3dpbmRvd3MgcGhvbmUvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnV2luZG93cyBQaG9uZSdcbiAgICAgICwgd2luZG93c3Bob25lOiB0XG4gICAgICAsIG1zaWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvaWVtb2JpbGVcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9tc2llfHRyaWRlbnQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgICAsIG1zaWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86bXNpZSB8cnY6KShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2Nocm9tZXxjcmlvc3xjcm1vL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZSdcbiAgICAgICwgY2hyb21lOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OmNocm9tZXxjcmlvc3xjcm1vKVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWUgOiBpb3NkZXZpY2UgPT0gJ2lwaG9uZScgPyAnaVBob25lJyA6IGlvc2RldmljZSA9PSAnaXBhZCcgPyAnaVBhZCcgOiAnaVBvZCdcbiAgICAgIH1cbiAgICAgIC8vIFdURjogdmVyc2lvbiBpcyBub3QgcGFydCBvZiB1c2VyIGFnZW50IGluIHdlYiBhcHBzXG4gICAgICBpZiAodmVyc2lvbklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2FpbGZpc2gvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FpbGZpc2gnXG4gICAgICAsIHNhaWxmaXNoOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3NhaWxmaXNoXFxzP2Jyb3dzZXJcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zZWFtb25rZXlcXC8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2VhTW9ua2V5J1xuICAgICAgLCBzZWFtb25rZXk6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvc2VhbW9ua2V5XFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvZmlyZWZveHxpY2V3ZWFzZWwvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnRmlyZWZveCdcbiAgICAgICwgZmlyZWZveDogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpmaXJlZm94fGljZXdlYXNlbClbIFxcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgICBpZiAoL1xcKChtb2JpbGV8dGFibGV0KTtbXlxcKV0qcnY6W1xcZFxcLl0rXFwpL2kudGVzdCh1YSkpIHtcbiAgICAgICAgcmVzdWx0LmZpcmVmb3hvcyA9IHRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NpbGsvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0gIHtcbiAgICAgICAgbmFtZTogJ0FtYXpvbiBTaWxrJ1xuICAgICAgLCBzaWxrOiB0XG4gICAgICAsIHZlcnNpb24gOiBnZXRGaXJzdE1hdGNoKC9zaWxrXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJ1xuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvcGhhbnRvbS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdQaGFudG9tSlMnXG4gICAgICAsIHBoYW50b206IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvcGhhbnRvbWpzXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvYmxhY2tiZXJyeXxcXGJiYlxcZCsvaS50ZXN0KHVhKSB8fCAvcmltXFxzdGFibGV0L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0JsYWNrQmVycnknXG4gICAgICAsIGJsYWNrYmVycnk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvYmxhY2tiZXJyeVtcXGRdK1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoLyh3ZWJ8aHB3KW9zL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dlYk9TJ1xuICAgICAgLCB3ZWJvczogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC93KD86ZWIpP29zYnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH07XG4gICAgICAvdG91Y2hwYWRcXC8vaS50ZXN0KHVhKSAmJiAocmVzdWx0LnRvdWNocGFkID0gdClcbiAgICB9XG4gICAgZWxzZSBpZiAoL2JhZGEvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmFkYSdcbiAgICAgICwgYmFkYTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9kb2xmaW5cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICgvdGl6ZW4vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnVGl6ZW4nXG4gICAgICAsIHRpemVuOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OnRpemVuXFxzPyk/YnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSkgfHwgdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zYWZhcmkvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FmYXJpJ1xuICAgICAgLCBzYWZhcmk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSByZXN1bHQgPSB7fVxuXG4gICAgLy8gc2V0IHdlYmtpdCBvciBnZWNrbyBmbGFnIGZvciBicm93c2VycyBiYXNlZCBvbiB0aGVzZSBlbmdpbmVzXG4gICAgaWYgKC8oYXBwbGUpP3dlYmtpdC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQubmFtZSA9IHJlc3VsdC5uYW1lIHx8IFwiV2Via2l0XCJcbiAgICAgIHJlc3VsdC53ZWJraXQgPSB0XG4gICAgICBpZiAoIXJlc3VsdC52ZXJzaW9uICYmIHZlcnNpb25JZGVudGlmaWVyKSB7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFyZXN1bHQub3BlcmEgJiYgL2dlY2tvXFwvL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUgfHwgXCJHZWNrb1wiXG4gICAgICByZXN1bHQuZ2Vja28gPSB0XG4gICAgICByZXN1bHQudmVyc2lvbiA9IHJlc3VsdC52ZXJzaW9uIHx8IGdldEZpcnN0TWF0Y2goL2dlY2tvXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgIH1cblxuICAgIC8vIHNldCBPUyBmbGFncyBmb3IgcGxhdGZvcm1zIHRoYXQgaGF2ZSBtdWx0aXBsZSBicm93c2Vyc1xuICAgIGlmIChhbmRyb2lkIHx8IHJlc3VsdC5zaWxrKSB7XG4gICAgICByZXN1bHQuYW5kcm9pZCA9IHRcbiAgICB9IGVsc2UgaWYgKGlvc2RldmljZSkge1xuICAgICAgcmVzdWx0W2lvc2RldmljZV0gPSB0XG4gICAgICByZXN1bHQuaW9zID0gdFxuICAgIH1cblxuICAgIC8vIE9TIHZlcnNpb24gZXh0cmFjdGlvblxuICAgIHZhciBvc1ZlcnNpb24gPSAnJztcbiAgICBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9vcyAoXFxkKyhbX1xcc11cXGQrKSopIGxpa2UgbWFjIG9zIHgvaSk7XG4gICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24ucmVwbGFjZSgvW19cXHNdL2csICcuJyk7XG4gICAgfSBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9hbmRyb2lkWyBcXC8tXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQud2luZG93c3Bob25lKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC93aW5kb3dzIHBob25lICg/Om9zKT9cXHM/KFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC53ZWJvcykge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvKD86d2VifGhwdylvc1xcLyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQuYmxhY2tiZXJyeSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvcmltXFxzdGFibGV0XFxzb3NcXHMoXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LmJhZGEpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL2JhZGFcXC8oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LnRpemVuKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC90aXplbltcXC9cXHNdKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9XG4gICAgaWYgKG9zVmVyc2lvbikge1xuICAgICAgcmVzdWx0Lm9zdmVyc2lvbiA9IG9zVmVyc2lvbjtcbiAgICB9XG5cbiAgICAvLyBkZXZpY2UgdHlwZSBleHRyYWN0aW9uXG4gICAgdmFyIG9zTWFqb3JWZXJzaW9uID0gb3NWZXJzaW9uLnNwbGl0KCcuJylbMF07XG4gICAgaWYgKHRhYmxldCB8fCBpb3NkZXZpY2UgPT0gJ2lwYWQnIHx8IChhbmRyb2lkICYmIChvc01ham9yVmVyc2lvbiA9PSAzIHx8IChvc01ham9yVmVyc2lvbiA9PSA0ICYmICFtb2JpbGUpKSkgfHwgcmVzdWx0LnNpbGspIHtcbiAgICAgIHJlc3VsdC50YWJsZXQgPSB0XG4gICAgfSBlbHNlIGlmIChtb2JpbGUgfHwgaW9zZGV2aWNlID09ICdpcGhvbmUnIHx8IGlvc2RldmljZSA9PSAnaXBvZCcgfHwgYW5kcm9pZCB8fCByZXN1bHQuYmxhY2tiZXJyeSB8fCByZXN1bHQud2Vib3MgfHwgcmVzdWx0LmJhZGEpIHtcbiAgICAgIHJlc3VsdC5tb2JpbGUgPSB0XG4gICAgfVxuXG4gICAgLy8gR3JhZGVkIEJyb3dzZXIgU3VwcG9ydFxuICAgIC8vIGh0dHA6Ly9kZXZlbG9wZXIueWFob28uY29tL3l1aS9hcnRpY2xlcy9nYnNcbiAgICBpZiAoKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uID49IDEwKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA+PSAyMCkgfHxcbiAgICAgICAgKHJlc3VsdC5maXJlZm94ICYmIHJlc3VsdC52ZXJzaW9uID49IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uID49IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5pb3MgJiYgcmVzdWx0Lm9zdmVyc2lvbiAmJiByZXN1bHQub3N2ZXJzaW9uLnNwbGl0KFwiLlwiKVswXSA+PSA2KVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5hID0gdDtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uIDwgMTApIHx8XG4gICAgICAgIChyZXN1bHQuY2hyb21lICYmIHJlc3VsdC52ZXJzaW9uIDwgMjApIHx8XG4gICAgICAgIChyZXN1bHQuZmlyZWZveCAmJiByZXN1bHQudmVyc2lvbiA8IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uIDwgNikgfHxcbiAgICAgICAgKHJlc3VsdC5vcGVyYSAmJiByZXN1bHQudmVyc2lvbiA8IDEwLjApIHx8XG4gICAgICAgIChyZXN1bHQuaW9zICYmIHJlc3VsdC5vc3ZlcnNpb24gJiYgcmVzdWx0Lm9zdmVyc2lvbi5zcGxpdChcIi5cIilbMF0gPCA2KVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5jID0gdFxuICAgIH0gZWxzZSByZXN1bHQueCA9IHRcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHZhciBib3dzZXIgPSBkZXRlY3QodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogJycpXG5cblxuICAvKlxuICAgKiBTZXQgb3VyIGRldGVjdCBtZXRob2QgdG8gdGhlIG1haW4gYm93c2VyIG9iamVjdCBzbyB3ZSBjYW5cbiAgICogcmV1c2UgaXQgdG8gdGVzdCBvdGhlciB1c2VyIGFnZW50cy5cbiAgICogVGhpcyBpcyBuZWVkZWQgdG8gaW1wbGVtZW50IGZ1dHVyZSB0ZXN0cy5cbiAgICovXG4gIGJvd3Nlci5fZGV0ZWN0ID0gZGV0ZWN0O1xuXG4gIHJldHVybiBib3dzZXJcbn0pO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tdLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsInZhciBpbyA9IHJlcXVpcmUoJy4vbGliL3NvY2tldC5pbycpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCdib3dzZXInKS5icm93c2VyO1xudmFyIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcbnZhciBodG1sMmNhbnZhcyA9IHJlcXVpcmUoJy4vbGliL2h0bWwyY2FudmFzJyk7XG52YXIgY2FudmFzMmltYWdlID0gcmVxdWlyZSgnLi9saWIvY2FudmFzMmltYWdlJyk7XG5cbi8vc3VwcG9ydCBzb2NrZXQuaW8ganNvbnBcbndpbmRvdy5pbyA9IGlvO1xuXG5mdW5jdGlvbiBCcm93c2VybWFuKG9wdGlvbnMpIHtcblx0dmFyIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ21vY2hhJyxcblx0dGhpcy5pbnN0YW5jZSA9IG9wdGlvbnMuaW5zdGFuY2UgfHwgbW9jaGE7XG5cdHRoaXMucmVwb3J0ZXIgPSB7XG5cdFx0J21vY2hhJzogcmVxdWlyZSgnLi9yZXBvcnRlci9tb2NoYScpLFxuXHRcdCdwbGFpbic6IHJlcXVpcmUoJy4vcmVwb3J0ZXIvcGxhaW4nKVxuXHR9XG59XG5cbkJyb3dzZXJtYW4ucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcblx0dmFyIG5vZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnJvd3Nlcm1hbicpO1xuXHR2YXIgc2VydmVyID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VydmVyJyk7XG5cdHZhciBxdWVyeSA9IHF1ZXJ5c3RyaW5nLnBhcnNlKGxvY2F0aW9uLnNlYXJjaC5yZXBsYWNlKCc/JywgJycpKTtcblx0dmFyIGpvYklkID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtam9iaWQnKSB8fCBxdWVyeS5icm93c2VybWFuX2pvYmlkO1xuXHR2YXIgbmVlZHNTY2VlbnNob3QgPSAoIXF1ZXJ5LmJyb3dzZXJtYW5fc2NyZWVuc2hvdCB8fCBxdWVyeS5icm93c2VybWFuX3NjcmVlbnNob3Q9PSAnZmFsc2UnKSA/IGZhbHNlIDogdHJ1ZTtcblx0XG5cdHZhciBjb25uZWN0ZWQgPSBmYWxzZTtcblx0XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRpZiAoIWpvYklkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIHNvY2tldCA9IGlvLmNvbm5lY3QoJ2h0dHA6Ly8nICsgc2VydmVyICsgJy90ZXN0ZXInKTtcblx0c29ja2V0Lm9uKCdjb25uZWN0JywgZnVuY3Rpb24oKSB7XG5cdFx0Y29ubmVjdGVkID0gdHJ1ZTtcblx0fSk7XG5cdHZhciByZXN1bHQgPSB7XG5cdFx0am9iSWQ6IGpvYklkLFxuXHRcdGJyb3dzZXI6IHtcblx0XHRcdG5hbWU6IGJyb3dzZXIubmFtZS50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0dmVyc2lvbjogYnJvd3Nlci52ZXJzaW9uICsgJy4wJyxcblx0XHRcdG9zOiBnZXRPUygpXG5cdFx0fSxcblx0XHRkYXRhOiB7XG5cdFx0XHRwYXNzZXM6IFtdLFxuXHRcdFx0ZmFpbHVyZXM6IFtdXG5cdFx0fVxuXHR9O1xuXHRzZWxmLnJlcG9ydGVyW3NlbGYudHlwZV0ucnVuKHtcblx0XHRpbnN0YW5jZTogc2VsZi5pbnN0YW5jZSxcblx0XHRwYXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRyZXN1bHQuZGF0YS5wYXNzZXMucHVzaChkYXRhKTtcblx0XHR9LFxuXHRcdGZhaWw6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdHJlc3VsdC5kYXRhLmZhaWx1cmVzLnB1c2goZGF0YSk7XG5cdFx0fSxcblx0XHRlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICghY29ubmVjdGVkKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChuZWVkc1NjZWVuc2hvdCkge1xuXHRcdFx0XHRcdGh0bWwyY2FudmFzKGRvY3VtZW50LmJvZHksIHtcblx0XHRcdFx0XHRcdG9ucmVuZGVyZWQ6IGZ1bmN0aW9uKGNhbnZhcykge1xuXHRcdFx0XHRcdFx0XHR2YXIgaW1nID0gY2FudmFzMmltYWdlLnNhdmVBc0pQRUcoY2FudmFzLCB0cnVlKTtcblx0XHRcdFx0XHRcdFx0cmVzdWx0LnNjcmVlbnNob3QgPSBpbWcub3V0ZXJIVE1MO1xuXHRcdFx0XHRcdFx0XHRzb2NrZXQuZW1pdCgnZG9uZScsIHJlc3VsdCk7XG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQod2luZG93LmNsb3NlLCA1MDApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHNvY2tldC5lbWl0KCdkb25lJywgcmVzdWx0KTtcblx0XHRcdFx0XHQvL3NldFRpbWVvdXQod2luZG93LmNsb3NlLCA1MDApO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuXHRcdFx0fSwgMjAwKTtcblx0XHR9XG5cdH0pO1xufTtcblxuZnVuY3Rpb24gZ2V0T1MoKSB7XG5cdHZhciBvcyA9IFwiVW5rbm93biBPU1wiO1xuXHRpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIldpblwiKSAhPSAtMSkgb3MgPSBcIndpbmRvd3NcIjtcblx0aWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJNYWNcIikgIT0gLTEpIG9zID0gXCJtYWNcIjtcblx0aWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJYMTFcIikgIT0gLTEpIG9zID0gXCJ1bml4XCI7XG5cdGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTGludXhcIikgIT0gLTEpIG9zID0gXCJsaW51eFwiO1xuXHRyZXR1cm4gb3M7XG59XG5cbmlmICh3aW5kb3cubW9jaGEpIHtcblx0bmV3IEJyb3dzZXJtYW4oe1xuXHRcdHR5cGU6ICdtb2NoYScsXG5cdFx0aW5zdGFuY2U6IHdpbmRvdy5tb2NoYVxuXHR9KS5pbml0KCk7XG59IGVsc2Uge1xuXHRuZXcgQnJvd3Nlcm1hbih7XG5cdFx0dHlwZTogJ3BsYWluJyxcblx0XHRpbnN0YW5jZTogd2luZG93XG5cdH0pLmluaXQoKTtcbn0iLCIvKlxuICogQ2FudmFzMkltYWdlIHYwLjFcbiAqIENvcHlyaWdodCAoYykgMjAwOCBKYWNvYiBTZWlkZWxpbiwganNlaWRlbGluQG5paGlsb2dpYy5ka1xuICogTUlUIExpY2Vuc2UgW2h0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuXG5cdC8vIGNoZWNrIGlmIHdlIGhhdmUgY2FudmFzIHN1cHBvcnRcblx0dmFyIGJIYXNDYW52YXMgPSBmYWxzZTtcblx0dmFyIG9DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXHRcblx0aWYgKG9DYW52YXMuZ2V0Q29udGV4dCAmJiBvQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKSkge1xuXHRcdGJIYXNDYW52YXMgPSB0cnVlO1xuXHR9XG5cblx0Ly8gbm8gY2FudmFzLCBiYWlsIG91dC5cblx0aWYgKCFiSGFzQ2FudmFzKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNhdmVBc0JNUCA6IGZ1bmN0aW9uKCl7fSxcblx0XHRcdHNhdmVBc1BORyA6IGZ1bmN0aW9uKCl7fSxcblx0XHRcdHNhdmVBc0pQRUcgOiBmdW5jdGlvbigpe31cblx0XHR9XG5cdH1cblxuXHR2YXIgYkhhc0ltYWdlRGF0YSA9ICEhKG9DYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLmdldEltYWdlRGF0YSk7XG5cdHZhciBiSGFzRGF0YVVSTCA9ICEhKG9DYW52YXMudG9EYXRhVVJMKTtcblx0dmFyIGJIYXNCYXNlNjQgPSAhISh3aW5kb3cuYnRvYSk7XG5cblx0dmFyIHN0ckRvd25sb2FkTWltZSA9IFwiaW1hZ2Uvb2N0ZXQtc3RyZWFtXCI7XG5cblx0Ly8gb2ssIHdlJ3JlIGdvb2Rcblx0dmFyIHJlYWRDYW52YXNEYXRhID0gZnVuY3Rpb24ob0NhbnZhcykge1xuXHRcdHZhciBpV2lkdGggPSBwYXJzZUludChvQ2FudmFzLndpZHRoKTtcblx0XHR2YXIgaUhlaWdodCA9IHBhcnNlSW50KG9DYW52YXMuaGVpZ2h0KTtcblx0XHRyZXR1cm4gb0NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikuZ2V0SW1hZ2VEYXRhKDAsMCxpV2lkdGgsaUhlaWdodCk7XG5cdH1cblxuXHQvLyBiYXNlNjQgZW5jb2RlcyBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2YgY2hhcmNvZGVzXG5cdHZhciBlbmNvZGVEYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdHZhciBzdHJEYXRhID0gXCJcIjtcblx0XHRpZiAodHlwZW9mIGRhdGEgPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0c3RyRGF0YSA9IGRhdGE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBhRGF0YSA9IGRhdGE7XG5cdFx0XHRmb3IgKHZhciBpPTA7aTxhRGF0YS5sZW5ndGg7aSsrKSB7XG5cdFx0XHRcdHN0ckRhdGEgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhRGF0YVtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBidG9hKHN0ckRhdGEpO1xuXHR9XG5cblx0Ly8gY3JlYXRlcyBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZyBjb250YWluaW5nIEJNUCBkYXRhXG5cdC8vIHRha2VzIGFuIGltYWdlZGF0YSBvYmplY3QgYXMgYXJndW1lbnRcblx0dmFyIGNyZWF0ZUJNUCA9IGZ1bmN0aW9uKG9EYXRhKSB7XG5cdFx0dmFyIGFIZWFkZXIgPSBbXTtcblx0XG5cdFx0dmFyIGlXaWR0aCA9IG9EYXRhLndpZHRoO1xuXHRcdHZhciBpSGVpZ2h0ID0gb0RhdGEuaGVpZ2h0O1xuXG5cdFx0YUhlYWRlci5wdXNoKDB4NDIpOyAvLyBtYWdpYyAxXG5cdFx0YUhlYWRlci5wdXNoKDB4NEQpOyBcblx0XG5cdFx0dmFyIGlGaWxlU2l6ZSA9IGlXaWR0aCppSGVpZ2h0KjMgKyA1NDsgLy8gdG90YWwgaGVhZGVyIHNpemUgPSA1NCBieXRlc1xuXHRcdGFIZWFkZXIucHVzaChpRmlsZVNpemUgJSAyNTYpOyBpRmlsZVNpemUgPSBNYXRoLmZsb29yKGlGaWxlU2l6ZSAvIDI1Nik7XG5cdFx0YUhlYWRlci5wdXNoKGlGaWxlU2l6ZSAlIDI1Nik7IGlGaWxlU2l6ZSA9IE1hdGguZmxvb3IoaUZpbGVTaXplIC8gMjU2KTtcblx0XHRhSGVhZGVyLnB1c2goaUZpbGVTaXplICUgMjU2KTsgaUZpbGVTaXplID0gTWF0aC5mbG9vcihpRmlsZVNpemUgLyAyNTYpO1xuXHRcdGFIZWFkZXIucHVzaChpRmlsZVNpemUgJSAyNTYpO1xuXG5cdFx0YUhlYWRlci5wdXNoKDApOyAvLyByZXNlcnZlZFxuXHRcdGFIZWFkZXIucHVzaCgwKTtcblx0XHRhSGVhZGVyLnB1c2goMCk7IC8vIHJlc2VydmVkXG5cdFx0YUhlYWRlci5wdXNoKDApO1xuXG5cdFx0YUhlYWRlci5wdXNoKDU0KTsgLy8gZGF0YW9mZnNldFxuXHRcdGFIZWFkZXIucHVzaCgwKTtcblx0XHRhSGVhZGVyLnB1c2goMCk7XG5cdFx0YUhlYWRlci5wdXNoKDApO1xuXG5cdFx0dmFyIGFJbmZvSGVhZGVyID0gW107XG5cdFx0YUluZm9IZWFkZXIucHVzaCg0MCk7IC8vIGluZm8gaGVhZGVyIHNpemVcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblxuXHRcdHZhciBpSW1hZ2VXaWR0aCA9IGlXaWR0aDtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZVdpZHRoICUgMjU2KTsgaUltYWdlV2lkdGggPSBNYXRoLmZsb29yKGlJbWFnZVdpZHRoIC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZVdpZHRoICUgMjU2KTsgaUltYWdlV2lkdGggPSBNYXRoLmZsb29yKGlJbWFnZVdpZHRoIC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZVdpZHRoICUgMjU2KTsgaUltYWdlV2lkdGggPSBNYXRoLmZsb29yKGlJbWFnZVdpZHRoIC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZVdpZHRoICUgMjU2KTtcblx0XG5cdFx0dmFyIGlJbWFnZUhlaWdodCA9IGlIZWlnaHQ7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VIZWlnaHQgJSAyNTYpOyBpSW1hZ2VIZWlnaHQgPSBNYXRoLmZsb29yKGlJbWFnZUhlaWdodCAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VIZWlnaHQgJSAyNTYpOyBpSW1hZ2VIZWlnaHQgPSBNYXRoLmZsb29yKGlJbWFnZUhlaWdodCAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VIZWlnaHQgJSAyNTYpOyBpSW1hZ2VIZWlnaHQgPSBNYXRoLmZsb29yKGlJbWFnZUhlaWdodCAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VIZWlnaHQgJSAyNTYpO1xuXHRcblx0XHRhSW5mb0hlYWRlci5wdXNoKDEpOyAvLyBudW0gb2YgcGxhbmVzXG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblx0XG5cdFx0YUluZm9IZWFkZXIucHVzaCgyNCk7IC8vIG51bSBvZiBiaXRzIHBlciBwaXhlbFxuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFxuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7IC8vIGNvbXByZXNzaW9uID0gbm9uZVxuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXHRcblx0XHR2YXIgaURhdGFTaXplID0gaVdpZHRoKmlIZWlnaHQqMzsgXG5cdFx0YUluZm9IZWFkZXIucHVzaChpRGF0YVNpemUgJSAyNTYpOyBpRGF0YVNpemUgPSBNYXRoLmZsb29yKGlEYXRhU2l6ZSAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpRGF0YVNpemUgJSAyNTYpOyBpRGF0YVNpemUgPSBNYXRoLmZsb29yKGlEYXRhU2l6ZSAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpRGF0YVNpemUgJSAyNTYpOyBpRGF0YVNpemUgPSBNYXRoLmZsb29yKGlEYXRhU2l6ZSAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpRGF0YVNpemUgJSAyNTYpOyBcblx0XG5cdFx0Zm9yICh2YXIgaT0wO2k8MTY7aSsrKSB7XG5cdFx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1x0Ly8gdGhlc2UgYnl0ZXMgbm90IHVzZWRcblx0XHR9XG5cdFxuXHRcdHZhciBpUGFkZGluZyA9ICg0IC0gKChpV2lkdGggKiAzKSAlIDQpKSAlIDQ7XG5cblx0XHR2YXIgYUltZ0RhdGEgPSBvRGF0YS5kYXRhO1xuXG5cdFx0dmFyIHN0clBpeGVsRGF0YSA9IFwiXCI7XG5cdFx0dmFyIHkgPSBpSGVpZ2h0O1xuXHRcdGRvIHtcblx0XHRcdHZhciBpT2Zmc2V0WSA9IGlXaWR0aCooeS0xKSo0O1xuXHRcdFx0dmFyIHN0clBpeGVsUm93ID0gXCJcIjtcblx0XHRcdGZvciAodmFyIHg9MDt4PGlXaWR0aDt4KyspIHtcblx0XHRcdFx0dmFyIGlPZmZzZXRYID0gNCp4O1xuXG5cdFx0XHRcdHN0clBpeGVsUm93ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYUltZ0RhdGFbaU9mZnNldFkraU9mZnNldFgrMl0pO1xuXHRcdFx0XHRzdHJQaXhlbFJvdyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGFJbWdEYXRhW2lPZmZzZXRZK2lPZmZzZXRYKzFdKTtcblx0XHRcdFx0c3RyUGl4ZWxSb3cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhSW1nRGF0YVtpT2Zmc2V0WStpT2Zmc2V0WF0pO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgYz0wO2M8aVBhZGRpbmc7YysrKSB7XG5cdFx0XHRcdHN0clBpeGVsUm93ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMCk7XG5cdFx0XHR9XG5cdFx0XHRzdHJQaXhlbERhdGEgKz0gc3RyUGl4ZWxSb3c7XG5cdFx0fSB3aGlsZSAoLS15KTtcblxuXHRcdHZhciBzdHJFbmNvZGVkID0gZW5jb2RlRGF0YShhSGVhZGVyLmNvbmNhdChhSW5mb0hlYWRlcikpICsgZW5jb2RlRGF0YShzdHJQaXhlbERhdGEpO1xuXG5cdFx0cmV0dXJuIHN0ckVuY29kZWQ7XG5cdH1cblxuXG5cdC8vIHNlbmRzIHRoZSBnZW5lcmF0ZWQgZmlsZSB0byB0aGUgY2xpZW50XG5cdHZhciBzYXZlRmlsZSA9IGZ1bmN0aW9uKHN0ckRhdGEpIHtcblx0XHRkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gc3RyRGF0YTtcblx0fVxuXG5cdHZhciBtYWtlRGF0YVVSSSA9IGZ1bmN0aW9uKHN0ckRhdGEsIHN0ck1pbWUpIHtcblx0XHRyZXR1cm4gXCJkYXRhOlwiICsgc3RyTWltZSArIFwiO2Jhc2U2NCxcIiArIHN0ckRhdGE7XG5cdH1cblxuXHQvLyBnZW5lcmF0ZXMgYSA8aW1nPiBvYmplY3QgY29udGFpbmluZyB0aGUgaW1hZ2VkYXRhXG5cdHZhciBtYWtlSW1hZ2VPYmplY3QgPSBmdW5jdGlvbihzdHJTb3VyY2UpIHtcblx0XHR2YXIgb0ltZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdG9JbWdFbGVtZW50LnNyYyA9IHN0clNvdXJjZTtcblx0XHRyZXR1cm4gb0ltZ0VsZW1lbnQ7XG5cdH1cblxuXHR2YXIgc2NhbGVDYW52YXMgPSBmdW5jdGlvbihvQ2FudmFzLCBpV2lkdGgsIGlIZWlnaHQpIHtcblx0XHRpZiAoaVdpZHRoICYmIGlIZWlnaHQpIHtcblx0XHRcdHZhciBvU2F2ZUNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cdFx0XHRvU2F2ZUNhbnZhcy53aWR0aCA9IGlXaWR0aDtcblx0XHRcdG9TYXZlQ2FudmFzLmhlaWdodCA9IGlIZWlnaHQ7XG5cdFx0XHRvU2F2ZUNhbnZhcy5zdHlsZS53aWR0aCA9IGlXaWR0aCtcInB4XCI7XG5cdFx0XHRvU2F2ZUNhbnZhcy5zdHlsZS5oZWlnaHQgPSBpSGVpZ2h0K1wicHhcIjtcblxuXHRcdFx0dmFyIG9TYXZlQ3R4ID0gb1NhdmVDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5cdFx0XHRvU2F2ZUN0eC5kcmF3SW1hZ2Uob0NhbnZhcywgMCwgMCwgb0NhbnZhcy53aWR0aCwgb0NhbnZhcy5oZWlnaHQsIDAsIDAsIGlXaWR0aCwgaUhlaWdodCk7XG5cdFx0XHRyZXR1cm4gb1NhdmVDYW52YXM7XG5cdFx0fVxuXHRcdHJldHVybiBvQ2FudmFzO1xuXHR9XG5cblx0cmV0dXJuIHtcblxuXHRcdHNhdmVBc1BORyA6IGZ1bmN0aW9uKG9DYW52YXMsIGJSZXR1cm5JbWcsIGlXaWR0aCwgaUhlaWdodCkge1xuXHRcdFx0aWYgKCFiSGFzRGF0YVVSTCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR2YXIgb1NjYWxlZENhbnZhcyA9IHNjYWxlQ2FudmFzKG9DYW52YXMsIGlXaWR0aCwgaUhlaWdodCk7XG5cdFx0XHR2YXIgc3RyRGF0YSA9IG9TY2FsZWRDYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuXHRcdFx0aWYgKGJSZXR1cm5JbWcpIHtcblx0XHRcdFx0cmV0dXJuIG1ha2VJbWFnZU9iamVjdChzdHJEYXRhKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNhdmVGaWxlKHN0ckRhdGEucmVwbGFjZShcImltYWdlL3BuZ1wiLCBzdHJEb3dubG9hZE1pbWUpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRzYXZlQXNKUEVHIDogZnVuY3Rpb24ob0NhbnZhcywgYlJldHVybkltZywgaVdpZHRoLCBpSGVpZ2h0KSB7XG5cdFx0XHRpZiAoIWJIYXNEYXRhVVJMKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG9TY2FsZWRDYW52YXMgPSBzY2FsZUNhbnZhcyhvQ2FudmFzLCBpV2lkdGgsIGlIZWlnaHQpO1xuXHRcdFx0dmFyIHN0ck1pbWUgPSBcImltYWdlL2pwZWdcIjtcblx0XHRcdHZhciBzdHJEYXRhID0gb1NjYWxlZENhbnZhcy50b0RhdGFVUkwoc3RyTWltZSk7XG5cdFxuXHRcdFx0Ly8gY2hlY2sgaWYgYnJvd3NlciBhY3R1YWxseSBzdXBwb3J0cyBqcGVnIGJ5IGxvb2tpbmcgZm9yIHRoZSBtaW1lIHR5cGUgaW4gdGhlIGRhdGEgdXJpLlxuXHRcdFx0Ly8gaWYgbm90LCByZXR1cm4gZmFsc2Vcblx0XHRcdGlmIChzdHJEYXRhLmluZGV4T2Yoc3RyTWltZSkgIT0gNSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChiUmV0dXJuSW1nKSB7XG5cdFx0XHRcdHJldHVybiBtYWtlSW1hZ2VPYmplY3Qoc3RyRGF0YSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzYXZlRmlsZShzdHJEYXRhLnJlcGxhY2Uoc3RyTWltZSwgc3RyRG93bmxvYWRNaW1lKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0c2F2ZUFzQk1QIDogZnVuY3Rpb24ob0NhbnZhcywgYlJldHVybkltZywgaVdpZHRoLCBpSGVpZ2h0KSB7XG5cdFx0XHRpZiAoIShiSGFzSW1hZ2VEYXRhICYmIGJIYXNCYXNlNjQpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG9TY2FsZWRDYW52YXMgPSBzY2FsZUNhbnZhcyhvQ2FudmFzLCBpV2lkdGgsIGlIZWlnaHQpO1xuXG5cdFx0XHR2YXIgb0RhdGEgPSByZWFkQ2FudmFzRGF0YShvU2NhbGVkQ2FudmFzKTtcblx0XHRcdHZhciBzdHJJbWdEYXRhID0gY3JlYXRlQk1QKG9EYXRhKTtcblx0XHRcdGlmIChiUmV0dXJuSW1nKSB7XG5cdFx0XHRcdHJldHVybiBtYWtlSW1hZ2VPYmplY3QobWFrZURhdGFVUkkoc3RySW1nRGF0YSwgXCJpbWFnZS9ibXBcIikpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2F2ZUZpbGUobWFrZURhdGFVUkkoc3RySW1nRGF0YSwgc3RyRG93bmxvYWRNaW1lKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH07XG5cbn0pKCk7IiwiLypcbiAgaHRtbDJjYW52YXMgMC40LjEgPGh0dHA6Ly9odG1sMmNhbnZhcy5oZXJ0emVuLmNvbT5cbiAgQ29weXJpZ2h0IChjKSAyMDEzIE5pa2xhcyB2b24gSGVydHplblxuXG4gIFJlbGVhc2VkIHVuZGVyIE1JVCBMaWNlbnNlXG4qL1xuXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKXtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaHRtbDJjYW52YXMgPSB7fSxcbnByZXZpb3VzRWxlbWVudCxcbmNvbXB1dGVkQ1NTLFxuaHRtbDJjYW52YXM7XG5cbl9odG1sMmNhbnZhcy5VdGlsID0ge307XG5cbl9odG1sMmNhbnZhcy5VdGlsLmxvZyA9IGZ1bmN0aW9uKGEpIHtcbiAgaWYgKF9odG1sMmNhbnZhcy5sb2dnaW5nICYmIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xuICAgIHdpbmRvdy5jb25zb2xlLmxvZyhhKTtcbiAgfVxufTtcblxuX2h0bWwyY2FudmFzLlV0aWwudHJpbVRleHQgPSAoZnVuY3Rpb24oaXNOYXRpdmUpe1xuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICByZXR1cm4gaXNOYXRpdmUgPyBpc05hdGl2ZS5hcHBseShpbnB1dCkgOiAoKGlucHV0IHx8ICcnKSArICcnKS5yZXBsYWNlKCAvXlxccyt8XFxzKyQvZyAsICcnICk7XG4gIH07XG59KShTdHJpbmcucHJvdG90eXBlLnRyaW0pO1xuXG5faHRtbDJjYW52YXMuVXRpbC5hc0Zsb2F0ID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gcGFyc2VGbG9hdCh2KTtcbn07XG5cbihmdW5jdGlvbigpIHtcbiAgLy8gVE9ETzogc3VwcG9ydCBhbGwgcG9zc2libGUgbGVuZ3RoIHZhbHVlc1xuICB2YXIgVEVYVF9TSEFET1dfUFJPUEVSVFkgPSAvKChyZ2JhfHJnYilcXChbXlxcKV0rXFwpKFxccy0/XFxkK3B4KXswLH0pL2c7XG4gIHZhciBURVhUX1NIQURPV19WQUxVRVMgPSAvKC0/XFxkK3B4KXwoIy4rKXwocmdiXFwoLitcXCkpfChyZ2JhXFwoLitcXCkpL2c7XG4gIF9odG1sMmNhbnZhcy5VdGlsLnBhcnNlVGV4dFNoYWRvd3MgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSAnbm9uZScpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBmaW5kIG11bHRpcGxlIHNoYWRvdyBkZWNsYXJhdGlvbnNcbiAgICB2YXIgc2hhZG93cyA9IHZhbHVlLm1hdGNoKFRFWFRfU0hBRE9XX1BST1BFUlRZKSxcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgc2hhZG93cyAmJiAoaSA8IHNoYWRvd3MubGVuZ3RoKTsgaSsrKSB7XG4gICAgICB2YXIgcyA9IHNoYWRvd3NbaV0ubWF0Y2goVEVYVF9TSEFET1dfVkFMVUVTKTtcbiAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgIGNvbG9yOiBzWzBdLFxuICAgICAgICBvZmZzZXRYOiBzWzFdID8gc1sxXS5yZXBsYWNlKCdweCcsICcnKSA6IDAsXG4gICAgICAgIG9mZnNldFk6IHNbMl0gPyBzWzJdLnJlcGxhY2UoJ3B4JywgJycpIDogMCxcbiAgICAgICAgYmx1cjogc1szXSA/IHNbM10ucmVwbGFjZSgncHgnLCAnJykgOiAwXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG59KSgpO1xuXG5cbl9odG1sMmNhbnZhcy5VdGlsLnBhcnNlQmFja2dyb3VuZEltYWdlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIHdoaXRlc3BhY2UgPSAnIFxcclxcblxcdCcsXG4gICAgICAgIG1ldGhvZCwgZGVmaW5pdGlvbiwgcHJlZml4LCBwcmVmaXhfaSwgYmxvY2ssIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgYywgbW9kZSA9IDAsIG51bVBhcmVuID0gMCwgcXVvdGUsIGFyZ3M7XG5cbiAgICB2YXIgYXBwZW5kUmVzdWx0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYobWV0aG9kKSB7XG4gICAgICAgICAgICBpZihkZWZpbml0aW9uLnN1YnN0ciggMCwgMSApID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24uc3Vic3RyKCAxLCBkZWZpbml0aW9uLmxlbmd0aCAtIDIgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGRlZmluaXRpb24pIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGVmaW5pdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihtZXRob2Quc3Vic3RyKCAwLCAxICkgPT09ICctJyAmJlxuICAgICAgICAgICAgICAgICAgICAocHJlZml4X2kgPSBtZXRob2QuaW5kZXhPZiggJy0nLCAxICkgKyAxKSA+IDApIHtcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBtZXRob2Quc3Vic3RyKCAwLCBwcmVmaXhfaSk7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gbWV0aG9kLnN1YnN0ciggcHJlZml4X2kgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgcHJlZml4OiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYmxvY2ssXG4gICAgICAgICAgICAgICAgYXJnczogYXJnc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYXJncyA9IFtdOyAvL2ZvciBzb21lIG9kZCByZWFzb24sIHNldHRpbmcgLmxlbmd0aCA9IDAgZGlkbid0IHdvcmsgaW4gc2FmYXJpXG4gICAgICAgIG1ldGhvZCA9XG4gICAgICAgICAgICBwcmVmaXggPVxuICAgICAgICAgICAgZGVmaW5pdGlvbiA9XG4gICAgICAgICAgICBibG9jayA9ICcnO1xuICAgIH07XG5cbiAgICBhcHBlbmRSZXN1bHQoKTtcbiAgICBmb3IodmFyIGkgPSAwLCBpaSA9IHZhbHVlLmxlbmd0aDsgaTxpaTsgaSsrKSB7XG4gICAgICAgIGMgPSB2YWx1ZVtpXTtcbiAgICAgICAgaWYobW9kZSA9PT0gMCAmJiB3aGl0ZXNwYWNlLmluZGV4T2YoIGMgKSA+IC0xKXtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaChjKSB7XG4gICAgICAgICAgICBjYXNlICdcIic6XG4gICAgICAgICAgICAgICAgaWYoIXF1b3RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1b3RlID0gYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihxdW90ZSA9PT0gYykge1xuICAgICAgICAgICAgICAgICAgICBxdW90ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcoJzpcbiAgICAgICAgICAgICAgICBpZihxdW90ZSkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYobW9kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtb2RlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2sgKz0gYztcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtUGFyZW4rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJyknOlxuICAgICAgICAgICAgICAgIGlmKHF1b3RlKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihtb2RlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG51bVBhcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrICs9IGM7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtUGFyZW4tLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnLCc6XG4gICAgICAgICAgICAgICAgaWYocXVvdGUpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKG1vZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtb2RlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG51bVBhcmVuID09PSAwICYmICFtZXRob2QubWF0Y2goL151cmwkL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGVmaW5pdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jayArPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBibG9jayArPSBjO1xuICAgICAgICBpZihtb2RlID09PSAwKSB7IG1ldGhvZCArPSBjOyB9XG4gICAgICAgIGVsc2UgeyBkZWZpbml0aW9uICs9IGM7IH1cbiAgICB9XG4gICAgYXBwZW5kUmVzdWx0KCk7XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLkJvdW5kcyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0LCBib3VuZHMgPSB7fTtcblxuICBpZiAoZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3Qpe1xuICAgIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gVE9ETyBhZGQgc2Nyb2xsIHBvc2l0aW9uIHRvIGJvdW5kcywgc28gbm8gc2Nyb2xsaW5nIG9mIHdpbmRvdyBuZWNlc3NhcnlcbiAgICBib3VuZHMudG9wID0gY2xpZW50UmVjdC50b3A7XG4gICAgYm91bmRzLmJvdHRvbSA9IGNsaWVudFJlY3QuYm90dG9tIHx8IChjbGllbnRSZWN0LnRvcCArIGNsaWVudFJlY3QuaGVpZ2h0KTtcbiAgICBib3VuZHMubGVmdCA9IGNsaWVudFJlY3QubGVmdDtcblxuICAgIGJvdW5kcy53aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgYm91bmRzLmhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cbi8vIFRPRE8gaWRlYWxseSwgd2UnZCB3YW50IGV2ZXJ5dGhpbmcgdG8gZ28gdGhyb3VnaCB0aGlzIGZ1bmN0aW9uIGluc3RlYWQgb2YgVXRpbC5Cb3VuZHMsXG4vLyBidXQgd291bGQgcmVxdWlyZSBmdXJ0aGVyIHdvcmsgdG8gY2FsY3VsYXRlIHRoZSBjb3JyZWN0IHBvc2l0aW9ucyBmb3IgZWxlbWVudHMgd2l0aCBvZmZzZXRQYXJlbnRzXG5faHRtbDJjYW52YXMuVXRpbC5PZmZzZXRCb3VuZHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgcGFyZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQgPyBfaHRtbDJjYW52YXMuVXRpbC5PZmZzZXRCb3VuZHMoZWxlbWVudC5vZmZzZXRQYXJlbnQpIDoge3RvcDogMCwgbGVmdDogMH07XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IGVsZW1lbnQub2Zmc2V0VG9wICsgcGFyZW50LnRvcCxcbiAgICBib3R0b206IGVsZW1lbnQub2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBwYXJlbnQudG9wLFxuICAgIGxlZnQ6IGVsZW1lbnQub2Zmc2V0TGVmdCArIHBhcmVudC5sZWZ0LFxuICAgIHdpZHRoOiBlbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgIGhlaWdodDogZWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHRvUFgoZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSApIHtcbiAgICB2YXIgcnNMZWZ0ID0gZWxlbWVudC5ydW50aW1lU3R5bGUgJiYgZWxlbWVudC5ydW50aW1lU3R5bGVbYXR0cmlidXRlXSxcbiAgICAgICAgbGVmdCxcbiAgICAgICAgc3R5bGUgPSBlbGVtZW50LnN0eWxlO1xuXG4gICAgLy8gQ2hlY2sgaWYgd2UgYXJlIG5vdCBkZWFsaW5nIHdpdGggcGl4ZWxzLCAoT3BlcmEgaGFzIGlzc3VlcyB3aXRoIHRoaXMpXG4gICAgLy8gUG9ydGVkIGZyb20galF1ZXJ5IGNzcy5qc1xuICAgIC8vIEZyb20gdGhlIGF3ZXNvbWUgaGFjayBieSBEZWFuIEVkd2FyZHNcbiAgICAvLyBodHRwOi8vZXJpay5lYWUubmV0L2FyY2hpdmVzLzIwMDcvMDcvMjcvMTguNTQuMTUvI2NvbW1lbnQtMTAyMjkxXG5cbiAgICAvLyBJZiB3ZSdyZSBub3QgZGVhbGluZyB3aXRoIGEgcmVndWxhciBwaXhlbCBudW1iZXJcbiAgICAvLyBidXQgYSBudW1iZXIgdGhhdCBoYXMgYSB3ZWlyZCBlbmRpbmcsIHdlIG5lZWQgdG8gY29udmVydCBpdCB0byBwaXhlbHNcblxuICAgIGlmICggIS9eLT9bMC05XStcXC4/WzAtOV0qKD86cHgpPyQvaS50ZXN0KCB2YWx1ZSApICYmIC9eLT9cXGQvLnRlc3QodmFsdWUpICkge1xuICAgICAgICAvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG4gICAgICAgIGxlZnQgPSBzdHlsZS5sZWZ0O1xuXG4gICAgICAgIC8vIFB1dCBpbiB0aGUgbmV3IHZhbHVlcyB0byBnZXQgYSBjb21wdXRlZCB2YWx1ZSBvdXRcbiAgICAgICAgaWYgKHJzTGVmdCkge1xuICAgICAgICAgICAgZWxlbWVudC5ydW50aW1lU3R5bGUubGVmdCA9IGVsZW1lbnQuY3VycmVudFN0eWxlLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGUubGVmdCA9IGF0dHJpYnV0ZSA9PT0gXCJmb250U2l6ZVwiID8gXCIxZW1cIiA6ICh2YWx1ZSB8fCAwKTtcbiAgICAgICAgdmFsdWUgPSBzdHlsZS5waXhlbExlZnQgKyBcInB4XCI7XG5cbiAgICAgICAgLy8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuICAgICAgICBzdHlsZS5sZWZ0ID0gbGVmdDtcbiAgICAgICAgaWYgKHJzTGVmdCkge1xuICAgICAgICAgICAgZWxlbWVudC5ydW50aW1lU3R5bGUubGVmdCA9IHJzTGVmdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghL14odGhpbnxtZWRpdW18dGhpY2spJC9pLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodmFsdWUpKSArIFwicHhcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGFzSW50KHZhbCkge1xuICAgIHJldHVybiBwYXJzZUludCh2YWwsIDEwKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VCYWNrZ3JvdW5kU2l6ZVBvc2l0aW9uKHZhbHVlLCBlbGVtZW50LCBhdHRyaWJ1dGUsIGluZGV4KSB7XG4gICAgdmFsdWUgPSAodmFsdWUgfHwgJycpLnNwbGl0KCcsJyk7XG4gICAgdmFsdWUgPSB2YWx1ZVtpbmRleCB8fCAwXSB8fCB2YWx1ZVswXSB8fCAnYXV0byc7XG4gICAgdmFsdWUgPSBfaHRtbDJjYW52YXMuVXRpbC50cmltVGV4dCh2YWx1ZSkuc3BsaXQoJyAnKTtcblxuICAgIGlmKGF0dHJpYnV0ZSA9PT0gJ2JhY2tncm91bmRTaXplJyAmJiAoIXZhbHVlWzBdIHx8IHZhbHVlWzBdLm1hdGNoKC9jb3Zlcnxjb250YWlufGF1dG8vKSkpIHtcbiAgICAgICAgLy90aGVzZSB2YWx1ZXMgd2lsbCBiZSBoYW5kbGVkIGluIHRoZSBwYXJlbnQgZnVuY3Rpb25cbiAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZVswXSA9ICh2YWx1ZVswXS5pbmRleE9mKCBcIiVcIiApID09PSAtMSkgPyB0b1BYKGVsZW1lbnQsIGF0dHJpYnV0ZSArIFwiWFwiLCB2YWx1ZVswXSkgOiB2YWx1ZVswXTtcbiAgICAgICAgaWYodmFsdWVbMV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoYXR0cmlidXRlID09PSAnYmFja2dyb3VuZFNpemUnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVbMV0gPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJRSA5IGRvZXNuJ3QgcmV0dXJuIGRvdWJsZSBkaWdpdCBhbHdheXNcbiAgICAgICAgICAgICAgICB2YWx1ZVsxXSA9IHZhbHVlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhbHVlWzFdID0gKHZhbHVlWzFdLmluZGV4T2YoXCIlXCIpID09PSAtMSkgPyB0b1BYKGVsZW1lbnQsIGF0dHJpYnV0ZSArIFwiWVwiLCB2YWx1ZVsxXSkgOiB2YWx1ZVsxXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5faHRtbDJjYW52YXMuVXRpbC5nZXRDU1MgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cmlidXRlLCBpbmRleCkge1xuICAgIGlmIChwcmV2aW91c0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgIGNvbXB1dGVkQ1NTID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWUgPSBjb21wdXRlZENTU1thdHRyaWJ1dGVdO1xuXG4gICAgaWYgKC9eYmFja2dyb3VuZChTaXplfFBvc2l0aW9uKSQvLnRlc3QoYXR0cmlidXRlKSkge1xuICAgICAgICByZXR1cm4gcGFyc2VCYWNrZ3JvdW5kU2l6ZVBvc2l0aW9uKHZhbHVlLCBlbGVtZW50LCBhdHRyaWJ1dGUsIGluZGV4KTtcbiAgICB9IGVsc2UgaWYgKC9ib3JkZXIoVG9wfEJvdHRvbSkoTGVmdHxSaWdodClSYWRpdXMvLnRlc3QoYXR0cmlidXRlKSkge1xuICAgICAgdmFyIGFyciA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICBhcnJbMV0gPSBhcnJbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyLm1hcChhc0ludCk7XG4gICAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLnJlc2l6ZUJvdW5kcyA9IGZ1bmN0aW9uKCBjdXJyZW50X3dpZHRoLCBjdXJyZW50X2hlaWdodCwgdGFyZ2V0X3dpZHRoLCB0YXJnZXRfaGVpZ2h0LCBzdHJldGNoX21vZGUgKXtcbiAgdmFyIHRhcmdldF9yYXRpbyA9IHRhcmdldF93aWR0aCAvIHRhcmdldF9oZWlnaHQsXG4gICAgY3VycmVudF9yYXRpbyA9IGN1cnJlbnRfd2lkdGggLyBjdXJyZW50X2hlaWdodCxcbiAgICBvdXRwdXRfd2lkdGgsIG91dHB1dF9oZWlnaHQ7XG5cbiAgaWYoIXN0cmV0Y2hfbW9kZSB8fCBzdHJldGNoX21vZGUgPT09ICdhdXRvJykge1xuICAgIG91dHB1dF93aWR0aCA9IHRhcmdldF93aWR0aDtcbiAgICBvdXRwdXRfaGVpZ2h0ID0gdGFyZ2V0X2hlaWdodDtcbiAgfSBlbHNlIGlmKHRhcmdldF9yYXRpbyA8IGN1cnJlbnRfcmF0aW8gXiBzdHJldGNoX21vZGUgPT09ICdjb250YWluJykge1xuICAgIG91dHB1dF9oZWlnaHQgPSB0YXJnZXRfaGVpZ2h0O1xuICAgIG91dHB1dF93aWR0aCA9IHRhcmdldF9oZWlnaHQgKiBjdXJyZW50X3JhdGlvO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dF93aWR0aCA9IHRhcmdldF93aWR0aDtcbiAgICBvdXRwdXRfaGVpZ2h0ID0gdGFyZ2V0X3dpZHRoIC8gY3VycmVudF9yYXRpbztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IG91dHB1dF93aWR0aCxcbiAgICBoZWlnaHQ6IG91dHB1dF9oZWlnaHRcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGJhY2tncm91bmRCb3VuZHNGYWN0b3J5KCBwcm9wLCBlbCwgYm91bmRzLCBpbWFnZSwgaW1hZ2VJbmRleCwgYmFja2dyb3VuZFNpemUgKSB7XG4gICAgdmFyIGJncG9zaXRpb24gPSAgX2h0bWwyY2FudmFzLlV0aWwuZ2V0Q1NTKCBlbCwgcHJvcCwgaW1hZ2VJbmRleCApICxcbiAgICB0b3BQb3MsXG4gICAgbGVmdCxcbiAgICBwZXJjZW50YWdlLFxuICAgIHZhbDtcblxuICAgIGlmIChiZ3Bvc2l0aW9uLmxlbmd0aCA9PT0gMSl7XG4gICAgICB2YWwgPSBiZ3Bvc2l0aW9uWzBdO1xuXG4gICAgICBiZ3Bvc2l0aW9uID0gW107XG5cbiAgICAgIGJncG9zaXRpb25bMF0gPSB2YWw7XG4gICAgICBiZ3Bvc2l0aW9uWzFdID0gdmFsO1xuICAgIH1cblxuICAgIGlmIChiZ3Bvc2l0aW9uWzBdLnRvU3RyaW5nKCkuaW5kZXhPZihcIiVcIikgIT09IC0xKXtcbiAgICAgIHBlcmNlbnRhZ2UgPSAocGFyc2VGbG9hdChiZ3Bvc2l0aW9uWzBdKS8xMDApO1xuICAgICAgbGVmdCA9IGJvdW5kcy53aWR0aCAqIHBlcmNlbnRhZ2U7XG4gICAgICBpZihwcm9wICE9PSAnYmFja2dyb3VuZFNpemUnKSB7XG4gICAgICAgIGxlZnQgLT0gKGJhY2tncm91bmRTaXplIHx8IGltYWdlKS53aWR0aCpwZXJjZW50YWdlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZihwcm9wID09PSAnYmFja2dyb3VuZFNpemUnKSB7XG4gICAgICAgIGlmKGJncG9zaXRpb25bMF0gPT09ICdhdXRvJykge1xuICAgICAgICAgIGxlZnQgPSBpbWFnZS53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoL2NvbnRhaW58Y292ZXIvLnRlc3QoYmdwb3NpdGlvblswXSkpIHtcbiAgICAgICAgICAgIHZhciByZXNpemVkID0gX2h0bWwyY2FudmFzLlV0aWwucmVzaXplQm91bmRzKGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCwgYmdwb3NpdGlvblswXSk7XG4gICAgICAgICAgICBsZWZ0ID0gcmVzaXplZC53aWR0aDtcbiAgICAgICAgICAgIHRvcFBvcyA9IHJlc2l6ZWQuaGVpZ2h0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZWZ0ID0gcGFyc2VJbnQoYmdwb3NpdGlvblswXSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVmdCA9IHBhcnNlSW50KCBiZ3Bvc2l0aW9uWzBdLCAxMCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBpZihiZ3Bvc2l0aW9uWzFdID09PSAnYXV0bycpIHtcbiAgICAgIHRvcFBvcyA9IGxlZnQgLyBpbWFnZS53aWR0aCAqIGltYWdlLmhlaWdodDtcbiAgICB9IGVsc2UgaWYgKGJncG9zaXRpb25bMV0udG9TdHJpbmcoKS5pbmRleE9mKFwiJVwiKSAhPT0gLTEpe1xuICAgICAgcGVyY2VudGFnZSA9IChwYXJzZUZsb2F0KGJncG9zaXRpb25bMV0pLzEwMCk7XG4gICAgICB0b3BQb3MgPSAgYm91bmRzLmhlaWdodCAqIHBlcmNlbnRhZ2U7XG4gICAgICBpZihwcm9wICE9PSAnYmFja2dyb3VuZFNpemUnKSB7XG4gICAgICAgIHRvcFBvcyAtPSAoYmFja2dyb3VuZFNpemUgfHwgaW1hZ2UpLmhlaWdodCAqIHBlcmNlbnRhZ2U7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdG9wUG9zID0gcGFyc2VJbnQoYmdwb3NpdGlvblsxXSwxMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtsZWZ0LCB0b3BQb3NdO1xufVxuXG5faHRtbDJjYW52YXMuVXRpbC5CYWNrZ3JvdW5kUG9zaXRpb24gPSBmdW5jdGlvbiggZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXgsIGJhY2tncm91bmRTaXplICkge1xuICAgIHZhciByZXN1bHQgPSBiYWNrZ3JvdW5kQm91bmRzRmFjdG9yeSggJ2JhY2tncm91bmRQb3NpdGlvbicsIGVsLCBib3VuZHMsIGltYWdlLCBpbWFnZUluZGV4LCBiYWNrZ3JvdW5kU2l6ZSApO1xuICAgIHJldHVybiB7IGxlZnQ6IHJlc3VsdFswXSwgdG9wOiByZXN1bHRbMV0gfTtcbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLkJhY2tncm91bmRTaXplID0gZnVuY3Rpb24oIGVsLCBib3VuZHMsIGltYWdlLCBpbWFnZUluZGV4ICkge1xuICAgIHZhciByZXN1bHQgPSBiYWNrZ3JvdW5kQm91bmRzRmFjdG9yeSggJ2JhY2tncm91bmRTaXplJywgZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXggKTtcbiAgICByZXR1cm4geyB3aWR0aDogcmVzdWx0WzBdLCBoZWlnaHQ6IHJlc3VsdFsxXSB9O1xufTtcblxuX2h0bWwyY2FudmFzLlV0aWwuRXh0ZW5kID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRlZmF1bHRzKSB7XG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgZGVmYXVsdHNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRzO1xufTtcblxuXG4vKlxuICogRGVyaXZlZCBmcm9tIGpRdWVyeS5jb250ZW50cygpXG4gKiBDb3B5cmlnaHQgMjAxMCwgSm9obiBSZXNpZ1xuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIG9yIEdQTCBWZXJzaW9uIDIgbGljZW5zZXMuXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKi9cbl9odG1sMmNhbnZhcy5VdGlsLkNoaWxkcmVuID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBjaGlsZHJlbjtcbiAgdHJ5IHtcbiAgICBjaGlsZHJlbiA9IChlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJRlJBTUVcIikgPyBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBlbGVtLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQgOiAoZnVuY3Rpb24oYXJyYXkpIHtcbiAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgIGlmIChhcnJheSAhPT0gbnVsbCkge1xuICAgICAgICAoZnVuY3Rpb24oZmlyc3QsIHNlY29uZCApIHtcbiAgICAgICAgICB2YXIgaSA9IGZpcnN0Lmxlbmd0aCxcbiAgICAgICAgICBqID0gMDtcblxuICAgICAgICAgIGlmICh0eXBlb2Ygc2Vjb25kLmxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZm9yICh2YXIgbCA9IHNlY29uZC5sZW5ndGg7IGogPCBsOyBqKyspIHtcbiAgICAgICAgICAgICAgZmlyc3RbaSsrXSA9IHNlY29uZFtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKHNlY29uZFtqXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGZpcnN0W2krK10gPSBzZWNvbmRbaisrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmaXJzdC5sZW5ndGggPSBpO1xuXG4gICAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgICAgICB9KShyZXQsIGFycmF5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSkoZWxlbS5jaGlsZE5vZGVzKTtcblxuICB9IGNhdGNoIChleCkge1xuICAgIF9odG1sMmNhbnZhcy5VdGlsLmxvZyhcImh0bWwyY2FudmFzLlV0aWwuQ2hpbGRyZW4gZmFpbGVkIHdpdGggZXhjZXB0aW9uOiBcIiArIGV4Lm1lc3NhZ2UpO1xuICAgIGNoaWxkcmVuID0gW107XG4gIH1cbiAgcmV0dXJuIGNoaWxkcmVuO1xufTtcblxuX2h0bWwyY2FudmFzLlV0aWwuaXNUcmFuc3BhcmVudCA9IGZ1bmN0aW9uKGJhY2tncm91bmRDb2xvcikge1xuICByZXR1cm4gKGJhY2tncm91bmRDb2xvciA9PT0gXCJ0cmFuc3BhcmVudFwiIHx8IGJhY2tncm91bmRDb2xvciA9PT0gXCJyZ2JhKDAsIDAsIDAsIDApXCIpO1xufTtcbl9odG1sMmNhbnZhcy5VdGlsLkZvbnQgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBmb250RGF0YSA9IHt9O1xuXG4gIHJldHVybiBmdW5jdGlvbihmb250LCBmb250U2l6ZSwgZG9jKSB7XG4gICAgaWYgKGZvbnREYXRhW2ZvbnQgKyBcIi1cIiArIGZvbnRTaXplXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZm9udERhdGFbZm9udCArIFwiLVwiICsgZm9udFNpemVdO1xuICAgIH1cblxuICAgIHZhciBjb250YWluZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgaW1nID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpLFxuICAgIHNwYW4gPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpLFxuICAgIHNhbXBsZVRleHQgPSAnSGlkZGVuIFRleHQnLFxuICAgIGJhc2VsaW5lLFxuICAgIG1pZGRsZSxcbiAgICBtZXRyaWNzT2JqO1xuXG4gICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGNvbnRhaW5lci5zdHlsZS5mb250RmFtaWx5ID0gZm9udDtcbiAgICBjb250YWluZXIuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZTtcbiAgICBjb250YWluZXIuc3R5bGUubWFyZ2luID0gMDtcbiAgICBjb250YWluZXIuc3R5bGUucGFkZGluZyA9IDA7XG5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gICAgLy8gaHR0cDovL3Byb2JhYmx5cHJvZ3JhbW1pbmcuY29tLzIwMDkvMDMvMTUvdGhlLXRpbmllc3QtZ2lmLWV2ZXIgKGhhbmR0aW55d2hpdGUuZ2lmKVxuICAgIGltZy5zcmMgPSBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFCQVAvLy93QUFBQ3dBQUFBQUFRQUJBQUFDQWtRQkFEcz1cIjtcbiAgICBpbWcud2lkdGggPSAxO1xuICAgIGltZy5oZWlnaHQgPSAxO1xuXG4gICAgaW1nLnN0eWxlLm1hcmdpbiA9IDA7XG4gICAgaW1nLnN0eWxlLnBhZGRpbmcgPSAwO1xuICAgIGltZy5zdHlsZS52ZXJ0aWNhbEFsaWduID0gXCJiYXNlbGluZVwiO1xuXG4gICAgc3Bhbi5zdHlsZS5mb250RmFtaWx5ID0gZm9udDtcbiAgICBzcGFuLnN0eWxlLmZvbnRTaXplID0gZm9udFNpemU7XG4gICAgc3Bhbi5zdHlsZS5tYXJnaW4gPSAwO1xuICAgIHNwYW4uc3R5bGUucGFkZGluZyA9IDA7XG5cbiAgICBzcGFuLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShzYW1wbGVUZXh0KSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbWcpO1xuICAgIGJhc2VsaW5lID0gKGltZy5vZmZzZXRUb3AgLSBzcGFuLm9mZnNldFRvcCkgKyAxO1xuXG4gICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHNwYW4pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoc2FtcGxlVGV4dCkpO1xuXG4gICAgY29udGFpbmVyLnN0eWxlLmxpbmVIZWlnaHQgPSBcIm5vcm1hbFwiO1xuICAgIGltZy5zdHlsZS52ZXJ0aWNhbEFsaWduID0gXCJzdXBlclwiO1xuXG4gICAgbWlkZGxlID0gKGltZy5vZmZzZXRUb3AtY29udGFpbmVyLm9mZnNldFRvcCkgKyAxO1xuICAgIG1ldHJpY3NPYmogPSB7XG4gICAgICBiYXNlbGluZTogYmFzZWxpbmUsXG4gICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICBtaWRkbGU6IG1pZGRsZVxuICAgIH07XG5cbiAgICBmb250RGF0YVtmb250ICsgXCItXCIgKyBmb250U2l6ZV0gPSBtZXRyaWNzT2JqO1xuXG4gICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIHJldHVybiBtZXRyaWNzT2JqO1xuICB9O1xufSkoKTtcblxuKGZ1bmN0aW9uKCl7XG4gIHZhciBVdGlsID0gX2h0bWwyY2FudmFzLlV0aWwsXG4gICAgR2VuZXJhdGUgPSB7fTtcblxuICBfaHRtbDJjYW52YXMuR2VuZXJhdGUgPSBHZW5lcmF0ZTtcblxuICB2YXIgcmVHcmFkaWVudHMgPSBbXG4gIC9eKC13ZWJraXQtbGluZWFyLWdyYWRpZW50KVxcKChbYS16XFxzXSspKFtcXHdcXGRcXC5cXHMsJVxcKFxcKV0rKVxcKSQvLFxuICAvXigtby1saW5lYXItZ3JhZGllbnQpXFwoKFthLXpcXHNdKykoW1xcd1xcZFxcLlxccywlXFwoXFwpXSspXFwpJC8sXG4gIC9eKC13ZWJraXQtZ3JhZGllbnQpXFwoKGxpbmVhcnxyYWRpYWwpLFxccygoPzpcXGR7MSwzfSU/KVxccyg/OlxcZHsxLDN9JT8pLFxccyg/OlxcZHsxLDN9JT8pXFxzKD86XFxkezEsM30lPykpKFtcXHdcXGRcXC5cXHMsJVxcKFxcKVxcLV0rKVxcKSQvLFxuICAvXigtbW96LWxpbmVhci1ncmFkaWVudClcXCgoKD86XFxkezEsM30lPylcXHMoPzpcXGR7MSwzfSU/KSkoW1xcd1xcZFxcLlxccywlXFwoXFwpXSspXFwpJC8sXG4gIC9eKC13ZWJraXQtcmFkaWFsLWdyYWRpZW50KVxcKCgoPzpcXGR7MSwzfSU/KVxccyg/OlxcZHsxLDN9JT8pKSxcXHMoXFx3KylcXHMoW2EtelxcLV0rKShbXFx3XFxkXFwuXFxzLCVcXChcXCldKylcXCkkLyxcbiAgL14oLW1vei1yYWRpYWwtZ3JhZGllbnQpXFwoKCg/OlxcZHsxLDN9JT8pXFxzKD86XFxkezEsM30lPykpLFxccyhcXHcrKVxccz8oW2EtelxcLV0qKShbXFx3XFxkXFwuXFxzLCVcXChcXCldKylcXCkkLyxcbiAgL14oLW8tcmFkaWFsLWdyYWRpZW50KVxcKCgoPzpcXGR7MSwzfSU/KVxccyg/OlxcZHsxLDN9JT8pKSxcXHMoXFx3KylcXHMoW2EtelxcLV0rKShbXFx3XFxkXFwuXFxzLCVcXChcXCldKylcXCkkL1xuICBdO1xuXG4gIC8qXG4gKiBUT0RPOiBBZGQgSUUxMCB2ZW5kb3IgcHJlZml4ICgtbXMpIHN1cHBvcnRcbiAqIFRPRE86IEFkZCBXM0MgZ3JhZGllbnQgKGxpbmVhci1ncmFkaWVudCkgc3VwcG9ydFxuICogVE9ETzogQWRkIG9sZCBXZWJraXQgLXdlYmtpdC1ncmFkaWVudChyYWRpYWwsIC4uLikgc3VwcG9ydFxuICogVE9ETzogTWF5YmUgc29tZSBSZWdFeHAgb3B0aW1pemF0aW9ucyBhcmUgcG9zc2libGUgO28pXG4gKi9cbiAgR2VuZXJhdGUucGFyc2VHcmFkaWVudCA9IGZ1bmN0aW9uKGNzcywgYm91bmRzKSB7XG4gICAgdmFyIGdyYWRpZW50LCBpLCBsZW4gPSByZUdyYWRpZW50cy5sZW5ndGgsIG0xLCBzdG9wLCBtMiwgbTJMZW4sIHN0ZXAsIG0zLCB0bCx0cixicixibDtcblxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSs9MSl7XG4gICAgICBtMSA9IGNzcy5tYXRjaChyZUdyYWRpZW50c1tpXSk7XG4gICAgICBpZihtMSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihtMSkge1xuICAgICAgc3dpdGNoKG0xWzFdKSB7XG4gICAgICAgIGNhc2UgJy13ZWJraXQtbGluZWFyLWdyYWRpZW50JzpcbiAgICAgICAgY2FzZSAnLW8tbGluZWFyLWdyYWRpZW50JzpcblxuICAgICAgICAgIGdyYWRpZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICB4MDogbnVsbCxcbiAgICAgICAgICAgIHkwOiBudWxsLFxuICAgICAgICAgICAgeDE6IG51bGwsXG4gICAgICAgICAgICB5MTogbnVsbCxcbiAgICAgICAgICAgIGNvbG9yU3RvcHM6IFtdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGdldCBjb29yZGluYXRlc1xuICAgICAgICAgIG0yID0gbTFbMl0ubWF0Y2goL1xcdysvZyk7XG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgbTJMZW4gPSBtMi5sZW5ndGg7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBtMkxlbjsgaSs9MSl7XG4gICAgICAgICAgICAgIHN3aXRjaChtMltpXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC55MCA9IDA7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC55MSA9IGJvdW5kcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngwID0gYm91bmRzLndpZHRoO1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgPSAwO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTAgPSBib3VuZHMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTEgPSAwO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngwID0gMDtcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngxID0gYm91bmRzLndpZHRoO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoZ3JhZGllbnQueDAgPT09IG51bGwgJiYgZ3JhZGllbnQueDEgPT09IG51bGwpeyAvLyBjZW50ZXJcbiAgICAgICAgICAgIGdyYWRpZW50LngwID0gZ3JhZGllbnQueDEgPSBib3VuZHMud2lkdGggLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihncmFkaWVudC55MCA9PT0gbnVsbCAmJiBncmFkaWVudC55MSA9PT0gbnVsbCl7IC8vIGNlbnRlclxuICAgICAgICAgICAgZ3JhZGllbnQueTAgPSBncmFkaWVudC55MSA9IGJvdW5kcy5oZWlnaHQgLyAyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGdldCBjb2xvcnMgYW5kIHN0b3BzXG4gICAgICAgICAgbTIgPSBtMVszXS5tYXRjaCgvKCg/OnJnYnxyZ2JhKVxcKFxcZHsxLDN9LFxcc1xcZHsxLDN9LFxcc1xcZHsxLDN9KD86LFxcc1swLTlcXC5dKyk/XFwpKD86XFxzXFxkezEsM30oPzolfHB4KSk/KSsvZyk7XG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgbTJMZW4gPSBtMi5sZW5ndGg7XG4gICAgICAgICAgICBzdGVwID0gMSAvIE1hdGgubWF4KG0yTGVuIC0gMSwgMSk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBtMkxlbjsgaSs9MSl7XG4gICAgICAgICAgICAgIG0zID0gbTJbaV0ubWF0Y2goLygoPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKSlcXHMqKFxcZHsxLDN9KT8oJXxweCk/Lyk7XG4gICAgICAgICAgICAgIGlmKG0zWzJdKXtcbiAgICAgICAgICAgICAgICBzdG9wID0gcGFyc2VGbG9hdChtM1syXSk7XG4gICAgICAgICAgICAgICAgaWYobTNbM10gPT09ICclJyl7XG4gICAgICAgICAgICAgICAgICBzdG9wIC89IDEwMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBweCAtIHN0dXBpZCBvcGVyYVxuICAgICAgICAgICAgICAgICAgc3RvcCAvPSBib3VuZHMud2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3AgPSBpICogc3RlcDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbG9yOiBtM1sxXSxcbiAgICAgICAgICAgICAgICBzdG9wOiBzdG9wXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICctd2Via2l0LWdyYWRpZW50JzpcblxuICAgICAgICAgIGdyYWRpZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogbTFbMl0gPT09ICdyYWRpYWwnID8gJ2NpcmNsZScgOiBtMVsyXSwgLy8gVE9ETzogQWRkIHJhZGlhbCBncmFkaWVudCBzdXBwb3J0IGZvciBvbGRlciBtb3ppbGxhIGRlZmluaXRpb25zXG4gICAgICAgICAgICB4MDogMCxcbiAgICAgICAgICAgIHkwOiAwLFxuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIGNvbG9yU3RvcHM6IFtdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGdldCBjb29yZGluYXRlc1xuICAgICAgICAgIG0yID0gbTFbM10ubWF0Y2goLyhcXGR7MSwzfSklP1xccyhcXGR7MSwzfSklPyxcXHMoXFxkezEsM30pJT9cXHMoXFxkezEsM30pJT8vKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBncmFkaWVudC54MCA9IChtMlsxXSAqIGJvdW5kcy53aWR0aCkgLyAxMDA7XG4gICAgICAgICAgICBncmFkaWVudC55MCA9IChtMlsyXSAqIGJvdW5kcy5oZWlnaHQpIC8gMTAwO1xuICAgICAgICAgICAgZ3JhZGllbnQueDEgPSAobTJbM10gKiBib3VuZHMud2lkdGgpIC8gMTAwO1xuICAgICAgICAgICAgZ3JhZGllbnQueTEgPSAobTJbNF0gKiBib3VuZHMuaGVpZ2h0KSAvIDEwMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBnZXQgY29sb3JzIGFuZCBzdG9wc1xuICAgICAgICAgIG0yID0gbTFbNF0ubWF0Y2goLygoPzpmcm9tfHRvfGNvbG9yLXN0b3ApXFwoKD86WzAtOVxcLl0rLFxccyk/KD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXClcXCkpKy9nKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBtMkxlbiA9IG0yLmxlbmd0aDtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IG0yTGVuOyBpKz0xKXtcbiAgICAgICAgICAgICAgbTMgPSBtMltpXS5tYXRjaCgvKGZyb218dG98Y29sb3Itc3RvcClcXCgoWzAtOVxcLl0rKT8oPzosXFxzKT8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkpXFwpLyk7XG4gICAgICAgICAgICAgIHN0b3AgPSBwYXJzZUZsb2F0KG0zWzJdKTtcbiAgICAgICAgICAgICAgaWYobTNbMV0gPT09ICdmcm9tJykge1xuICAgICAgICAgICAgICAgIHN0b3AgPSAwLjA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYobTNbMV0gPT09ICd0bycpIHtcbiAgICAgICAgICAgICAgICBzdG9wID0gMS4wO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGdyYWRpZW50LmNvbG9yU3RvcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IG0zWzNdLFxuICAgICAgICAgICAgICAgIHN0b3A6IHN0b3BcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJy1tb3otbGluZWFyLWdyYWRpZW50JzpcblxuICAgICAgICAgIGdyYWRpZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICB4MDogMCxcbiAgICAgICAgICAgIHkwOiAwLFxuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIGNvbG9yU3RvcHM6IFtdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGdldCBjb29yZGluYXRlc1xuICAgICAgICAgIG0yID0gbTFbMl0ubWF0Y2goLyhcXGR7MSwzfSklP1xccyhcXGR7MSwzfSklPy8pO1xuXG4gICAgICAgICAgLy8gbTJbMV0gPT0gMCUgICAtPiBsZWZ0XG4gICAgICAgICAgLy8gbTJbMV0gPT0gNTAlICAtPiBjZW50ZXJcbiAgICAgICAgICAvLyBtMlsxXSA9PSAxMDAlIC0+IHJpZ2h0XG5cbiAgICAgICAgICAvLyBtMlsyXSA9PSAwJSAgIC0+IHRvcFxuICAgICAgICAgIC8vIG0yWzJdID09IDUwJSAgLT4gY2VudGVyXG4gICAgICAgICAgLy8gbTJbMl0gPT0gMTAwJSAtPiBib3R0b21cblxuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIGdyYWRpZW50LngwID0gKG0yWzFdICogYm91bmRzLndpZHRoKSAvIDEwMDtcbiAgICAgICAgICAgIGdyYWRpZW50LnkwID0gKG0yWzJdICogYm91bmRzLmhlaWdodCkgLyAxMDA7XG4gICAgICAgICAgICBncmFkaWVudC54MSA9IGJvdW5kcy53aWR0aCAtIGdyYWRpZW50LngwO1xuICAgICAgICAgICAgZ3JhZGllbnQueTEgPSBib3VuZHMuaGVpZ2h0IC0gZ3JhZGllbnQueTA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZ2V0IGNvbG9ycyBhbmQgc3RvcHNcbiAgICAgICAgICBtMiA9IG0xWzNdLm1hdGNoKC8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkoPzpcXHNcXGR7MSwzfSUpPykrL2cpO1xuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIG0yTGVuID0gbTIubGVuZ3RoO1xuICAgICAgICAgICAgc3RlcCA9IDEgLyBNYXRoLm1heChtMkxlbiAtIDEsIDEpO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbTJMZW47IGkrPTEpe1xuICAgICAgICAgICAgICBtMyA9IG0yW2ldLm1hdGNoKC8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkpXFxzKihcXGR7MSwzfSk/KCUpPy8pO1xuICAgICAgICAgICAgICBpZihtM1syXSl7XG4gICAgICAgICAgICAgICAgc3RvcCA9IHBhcnNlRmxvYXQobTNbMl0pO1xuICAgICAgICAgICAgICAgIGlmKG0zWzNdKXsgLy8gcGVyY2VudGFnZVxuICAgICAgICAgICAgICAgICAgc3RvcCAvPSAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3AgPSBpICogc3RlcDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbG9yOiBtM1sxXSxcbiAgICAgICAgICAgICAgICBzdG9wOiBzdG9wXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICctd2Via2l0LXJhZGlhbC1ncmFkaWVudCc6XG4gICAgICAgIGNhc2UgJy1tb3otcmFkaWFsLWdyYWRpZW50JzpcbiAgICAgICAgY2FzZSAnLW8tcmFkaWFsLWdyYWRpZW50JzpcblxuICAgICAgICAgIGdyYWRpZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogJ2NpcmNsZScsXG4gICAgICAgICAgICB4MDogMCxcbiAgICAgICAgICAgIHkwOiAwLFxuICAgICAgICAgICAgeDE6IGJvdW5kcy53aWR0aCxcbiAgICAgICAgICAgIHkxOiBib3VuZHMuaGVpZ2h0LFxuICAgICAgICAgICAgY3g6IDAsXG4gICAgICAgICAgICBjeTogMCxcbiAgICAgICAgICAgIHJ4OiAwLFxuICAgICAgICAgICAgcnk6IDAsXG4gICAgICAgICAgICBjb2xvclN0b3BzOiBbXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBjZW50ZXJcbiAgICAgICAgICBtMiA9IG0xWzJdLm1hdGNoKC8oXFxkezEsM30pJT9cXHMoXFxkezEsM30pJT8vKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBncmFkaWVudC5jeCA9IChtMlsxXSAqIGJvdW5kcy53aWR0aCkgLyAxMDA7XG4gICAgICAgICAgICBncmFkaWVudC5jeSA9IChtMlsyXSAqIGJvdW5kcy5oZWlnaHQpIC8gMTAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNpemVcbiAgICAgICAgICBtMiA9IG0xWzNdLm1hdGNoKC9cXHcrLyk7XG4gICAgICAgICAgbTMgPSBtMVs0XS5tYXRjaCgvW2EtelxcLV0qLyk7XG4gICAgICAgICAgaWYobTIgJiYgbTMpe1xuICAgICAgICAgICAgc3dpdGNoKG0zWzBdKXtcbiAgICAgICAgICAgICAgY2FzZSAnZmFydGhlc3QtY29ybmVyJzpcbiAgICAgICAgICAgICAgY2FzZSAnY292ZXInOiAvLyBpcyBlcXVpdmFsZW50IHRvIGZhcnRoZXN0LWNvcm5lclxuICAgICAgICAgICAgICBjYXNlICcnOiAvLyBtb3ppbGxhIHJlbW92ZXMgXCJjb3ZlclwiIGZyb20gZGVmaW5pdGlvbiA6KFxuICAgICAgICAgICAgICAgIHRsID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LmN4LCAyKSArIE1hdGgucG93KGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgdHIgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIGJyID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIGJsID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IGdyYWRpZW50LnJ5ID0gTWF0aC5tYXgodGwsIHRyLCBiciwgYmwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdjbG9zZXN0LWNvcm5lcic6XG4gICAgICAgICAgICAgICAgdGwgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICB0ciA9IE1hdGguc3FydChNYXRoLnBvdyhncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC55MSAtIGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgYnIgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC55MSAtIGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgYmwgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIGdyYWRpZW50LnJ4ID0gZ3JhZGllbnQucnkgPSBNYXRoLm1pbih0bCwgdHIsIGJyLCBibCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2ZhcnRoZXN0LXNpZGUnOlxuICAgICAgICAgICAgICAgIGlmKG0yWzBdID09PSAnY2lyY2xlJyl7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IGdyYWRpZW50LnJ5ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN4LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeSxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGVsbGlwc2VcblxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQudHlwZSA9IG0yWzBdO1xuXG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQucnkgPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3ksXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3lcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2Nsb3Nlc3Qtc2lkZSc6XG4gICAgICAgICAgICAgIGNhc2UgJ2NvbnRhaW4nOiAvLyBpcyBlcXVpdmFsZW50IHRvIGNsb3Nlc3Qtc2lkZVxuICAgICAgICAgICAgICAgIGlmKG0yWzBdID09PSAnY2lyY2xlJyl7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IGdyYWRpZW50LnJ5ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN4LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeSxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGVsbGlwc2VcblxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQudHlwZSA9IG0yWzBdO1xuXG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQucnkgPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3ksXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3lcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBcIjMwcHggNDBweFwiIHNpemVzICh3ZWJraXQgb25seSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjb2xvciBzdG9wc1xuICAgICAgICAgIG0yID0gbTFbNV0ubWF0Y2goLygoPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKSg/Olxcc1xcZHsxLDN9KD86JXxweCkpPykrL2cpO1xuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIG0yTGVuID0gbTIubGVuZ3RoO1xuICAgICAgICAgICAgc3RlcCA9IDEgLyBNYXRoLm1heChtMkxlbiAtIDEsIDEpO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbTJMZW47IGkrPTEpe1xuICAgICAgICAgICAgICBtMyA9IG0yW2ldLm1hdGNoKC8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkpXFxzKihcXGR7MSwzfSk/KCV8cHgpPy8pO1xuICAgICAgICAgICAgICBpZihtM1syXSl7XG4gICAgICAgICAgICAgICAgc3RvcCA9IHBhcnNlRmxvYXQobTNbMl0pO1xuICAgICAgICAgICAgICAgIGlmKG0zWzNdID09PSAnJScpe1xuICAgICAgICAgICAgICAgICAgc3RvcCAvPSAxMDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gcHggLSBzdHVwaWQgb3BlcmFcbiAgICAgICAgICAgICAgICAgIHN0b3AgLz0gYm91bmRzLndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9wID0gaSAqIHN0ZXA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZ3JhZGllbnQuY29sb3JTdG9wcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbTNbMV0sXG4gICAgICAgICAgICAgICAgc3RvcDogc3RvcFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyYWRpZW50O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGFkZFNjcm9sbFN0b3BzKGdyYWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY29sb3JTdG9wKSB7XG4gICAgICB0cnkge1xuICAgICAgICBncmFkLmFkZENvbG9yU3RvcChjb2xvclN0b3Auc3RvcCwgY29sb3JTdG9wLmNvbG9yKTtcbiAgICAgIH1cbiAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgVXRpbC5sb2coWydmYWlsZWQgdG8gYWRkIGNvbG9yIHN0b3A6ICcsIGUsICc7IHRyaWVkIHRvIGFkZDogJywgY29sb3JTdG9wXSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIEdlbmVyYXRlLkdyYWRpZW50ID0gZnVuY3Rpb24oc3JjLCBib3VuZHMpIHtcbiAgICBpZihib3VuZHMud2lkdGggPT09IDAgfHwgYm91bmRzLmhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSxcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICBncmFkaWVudCwgZ3JhZDtcblxuICAgIGNhbnZhcy53aWR0aCA9IGJvdW5kcy53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gYm91bmRzLmhlaWdodDtcblxuICAgIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBtdWx0aSBkZWZpbmVkIGJhY2tncm91bmQgZ3JhZGllbnRzXG4gICAgZ3JhZGllbnQgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUucGFyc2VHcmFkaWVudChzcmMsIGJvdW5kcyk7XG5cbiAgICBpZihncmFkaWVudCkge1xuICAgICAgc3dpdGNoKGdyYWRpZW50LnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGluZWFyJzpcbiAgICAgICAgICBncmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KGdyYWRpZW50LngwLCBncmFkaWVudC55MCwgZ3JhZGllbnQueDEsIGdyYWRpZW50LnkxKTtcbiAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLmZvckVhY2goYWRkU2Nyb2xsU3RvcHMoZ3JhZCkpO1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkO1xuICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2NpcmNsZSc6XG4gICAgICAgICAgZ3JhZCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChncmFkaWVudC5jeCwgZ3JhZGllbnQuY3ksIDAsIGdyYWRpZW50LmN4LCBncmFkaWVudC5jeSwgZ3JhZGllbnQucngpO1xuICAgICAgICAgIGdyYWRpZW50LmNvbG9yU3RvcHMuZm9yRWFjaChhZGRTY3JvbGxTdG9wcyhncmFkKSk7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWQ7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZWxsaXBzZSc6XG4gICAgICAgICAgdmFyIGNhbnZhc1JhZGlhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLFxuICAgICAgICAgICAgY3R4UmFkaWFsID0gY2FudmFzUmFkaWFsLmdldENvbnRleHQoJzJkJyksXG4gICAgICAgICAgICByaSA9IE1hdGgubWF4KGdyYWRpZW50LnJ4LCBncmFkaWVudC5yeSksXG4gICAgICAgICAgICBkaSA9IHJpICogMjtcblxuICAgICAgICAgIGNhbnZhc1JhZGlhbC53aWR0aCA9IGNhbnZhc1JhZGlhbC5oZWlnaHQgPSBkaTtcblxuICAgICAgICAgIGdyYWQgPSBjdHhSYWRpYWwuY3JlYXRlUmFkaWFsR3JhZGllbnQoZ3JhZGllbnQucngsIGdyYWRpZW50LnJ5LCAwLCBncmFkaWVudC5yeCwgZ3JhZGllbnQucnksIHJpKTtcbiAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLmZvckVhY2goYWRkU2Nyb2xsU3RvcHMoZ3JhZCkpO1xuXG4gICAgICAgICAgY3R4UmFkaWFsLmZpbGxTdHlsZSA9IGdyYWQ7XG4gICAgICAgICAgY3R4UmFkaWFsLmZpbGxSZWN0KDAsIDAsIGRpLCBkaSk7XG5cbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQuY29sb3JTdG9wc1tncmFkaWVudC5jb2xvclN0b3BzLmxlbmd0aCAtIDFdLmNvbG9yO1xuICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoY2FudmFzUmFkaWFsLCBncmFkaWVudC5jeCAtIGdyYWRpZW50LnJ4LCBncmFkaWVudC5jeSAtIGdyYWRpZW50LnJ5LCAyICogZ3JhZGllbnQucngsIDIgKiBncmFkaWVudC5yeSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfTtcblxuICBHZW5lcmF0ZS5MaXN0QWxwaGEgPSBmdW5jdGlvbihudW1iZXIpIHtcbiAgICB2YXIgdG1wID0gXCJcIixcbiAgICBtb2R1bHVzO1xuXG4gICAgZG8ge1xuICAgICAgbW9kdWx1cyA9IG51bWJlciAlIDI2O1xuICAgICAgdG1wID0gU3RyaW5nLmZyb21DaGFyQ29kZSgobW9kdWx1cykgKyA2NCkgKyB0bXA7XG4gICAgICBudW1iZXIgPSBudW1iZXIgLyAyNjtcbiAgICB9d2hpbGUoKG51bWJlcioyNikgPiAyNik7XG5cbiAgICByZXR1cm4gdG1wO1xuICB9O1xuXG4gIEdlbmVyYXRlLkxpc3RSb21hbiA9IGZ1bmN0aW9uKG51bWJlcikge1xuICAgIHZhciByb21hbkFycmF5ID0gW1wiTVwiLCBcIkNNXCIsIFwiRFwiLCBcIkNEXCIsIFwiQ1wiLCBcIlhDXCIsIFwiTFwiLCBcIlhMXCIsIFwiWFwiLCBcIklYXCIsIFwiVlwiLCBcIklWXCIsIFwiSVwiXSxcbiAgICBkZWNpbWFsID0gWzEwMDAsIDkwMCwgNTAwLCA0MDAsIDEwMCwgOTAsIDUwLCA0MCwgMTAsIDksIDUsIDQsIDFdLFxuICAgIHJvbWFuID0gXCJcIixcbiAgICB2LFxuICAgIGxlbiA9IHJvbWFuQXJyYXkubGVuZ3RoO1xuXG4gICAgaWYgKG51bWJlciA8PSAwIHx8IG51bWJlciA+PSA0MDAwKSB7XG4gICAgICByZXR1cm4gbnVtYmVyO1xuICAgIH1cblxuICAgIGZvciAodj0wOyB2IDwgbGVuOyB2Kz0xKSB7XG4gICAgICB3aGlsZSAobnVtYmVyID49IGRlY2ltYWxbdl0pIHtcbiAgICAgICAgbnVtYmVyIC09IGRlY2ltYWxbdl07XG4gICAgICAgIHJvbWFuICs9IHJvbWFuQXJyYXlbdl07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvbWFuO1xuICB9O1xufSkoKTtcbmZ1bmN0aW9uIGgyY1JlbmRlckNvbnRleHQod2lkdGgsIGhlaWdodCkge1xuICB2YXIgc3RvcmFnZSA9IFtdO1xuICByZXR1cm4ge1xuICAgIHN0b3JhZ2U6IHN0b3JhZ2UsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIGNsaXA6IGZ1bmN0aW9uKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImNsaXBcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcInRyYW5zbGF0ZVwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZpbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImZpbGxcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBzYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJzYXZlXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVzdG9yZTogZnVuY3Rpb24oKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwicmVzdG9yZVwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZpbGxSZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwiZmlsbFJlY3RcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBjcmVhdGVQYXR0ZXJuOiBmdW5jdGlvbigpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJjcmVhdGVQYXR0ZXJuXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZHJhd1NoYXBlOiBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIHNoYXBlID0gW107XG5cbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJkcmF3U2hhcGVcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IHNoYXBlXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW92ZVRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzaGFwZS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwibW92ZVRvXCIsXG4gICAgICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxpbmVUbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcGUucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImxpbmVUb1wiLFxuICAgICAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhcmNUbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcGUucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImFyY1RvXCIsXG4gICAgICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJlemllckN1cnZlVG86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXBlLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJiZXppZXJDdXJ2ZVRvXCIsXG4gICAgICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHF1YWRyYXRpY0N1cnZlVG86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXBlLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJxdWFkcmF0aWNDdXJ2ZVRvXCIsXG4gICAgICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICB9LFxuICAgIGRyYXdJbWFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImRyYXdJbWFnZVwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZpbGxUZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwiZmlsbFRleHRcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBzZXRWYXJpYWJsZTogZnVuY3Rpb24gKHZhcmlhYmxlLCB2YWx1ZSkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJ2YXJpYWJsZVwiLFxuICAgICAgICBuYW1lOiB2YXJpYWJsZSxcbiAgICAgICAgJ2FyZ3VtZW50cyc6IHZhbHVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH07XG59XG5faHRtbDJjYW52YXMuUGFyc2UgPSBmdW5jdGlvbiAoaW1hZ2VzLCBvcHRpb25zKSB7XG4gIHdpbmRvdy5zY3JvbGwoMCwwKTtcblxuICB2YXIgZWxlbWVudCA9ICgoIG9wdGlvbnMuZWxlbWVudHMgPT09IHVuZGVmaW5lZCApID8gZG9jdW1lbnQuYm9keSA6IG9wdGlvbnMuZWxlbWVudHNbMF0pLCAvLyBzZWxlY3QgYm9keSBieSBkZWZhdWx0XG4gIG51bURyYXdzID0gMCxcbiAgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50LFxuICBVdGlsID0gX2h0bWwyY2FudmFzLlV0aWwsXG4gIHN1cHBvcnQgPSBVdGlsLlN1cHBvcnQob3B0aW9ucywgZG9jKSxcbiAgaWdub3JlRWxlbWVudHNSZWdFeHAgPSBuZXcgUmVnRXhwKFwiKFwiICsgb3B0aW9ucy5pZ25vcmVFbGVtZW50cyArIFwiKVwiKSxcbiAgYm9keSA9IGRvYy5ib2R5LFxuICBnZXRDU1MgPSBVdGlsLmdldENTUyxcbiAgcHNldWRvSGlkZSA9IFwiX19faHRtbDJjYW52YXNfX19wc2V1ZG9lbGVtZW50XCIsXG4gIGhpZGVQc2V1ZG9FbGVtZW50cyA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIGhpZGVQc2V1ZG9FbGVtZW50cy5pbm5lckhUTUwgPSAnLicgKyBwc2V1ZG9IaWRlICsgJy1iZWZvcmU6YmVmb3JlIHsgY29udGVudDogXCJcIiAhaW1wb3J0YW50OyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0nICtcbiAgJy4nICsgcHNldWRvSGlkZSArICctYWZ0ZXI6YWZ0ZXIgeyBjb250ZW50OiBcIlwiICFpbXBvcnRhbnQ7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfSc7XG5cbiAgYm9keS5hcHBlbmRDaGlsZChoaWRlUHNldWRvRWxlbWVudHMpO1xuXG4gIGltYWdlcyA9IGltYWdlcyB8fCB7fTtcblxuICBmdW5jdGlvbiBkb2N1bWVudFdpZHRoICgpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5zY3JvbGxXaWR0aCwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCksXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5vZmZzZXRXaWR0aCwgZG9jLmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aCksXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5jbGllbnRXaWR0aCwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aClcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBkb2N1bWVudEhlaWdodCAoKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgTWF0aC5tYXgoZG9jLmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCksXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5vZmZzZXRIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSxcbiAgICAgIE1hdGgubWF4KGRvYy5ib2R5LmNsaWVudEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpXG4gICAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q1NTSW50KGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgIHZhciB2YWwgPSBwYXJzZUludChnZXRDU1MoZWxlbWVudCwgYXR0cmlidXRlKSwgMTApO1xuICAgIHJldHVybiAoaXNOYU4odmFsKSkgPyAwIDogdmFsOyAvLyBib3JkZXJzIGluIG9sZCBJRSBhcmUgdGhyb3dpbmcgJ21lZGl1bScgZm9yIGRlbW8uaHRtbFxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyUmVjdCAoY3R4LCB4LCB5LCB3LCBoLCBiZ2NvbG9yKSB7XG4gICAgaWYgKGJnY29sb3IgIT09IFwidHJhbnNwYXJlbnRcIil7XG4gICAgICBjdHguc2V0VmFyaWFibGUoXCJmaWxsU3R5bGVcIiwgYmdjb2xvcik7XG4gICAgICBjdHguZmlsbFJlY3QoeCwgeSwgdywgaCk7XG4gICAgICBudW1EcmF3cys9MTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYXBpdGFsaXplKG0sIHAxLCBwMikge1xuICAgIGlmIChtLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBwMSArIHAyLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdGV4dFRyYW5zZm9ybSAodGV4dCwgdHJhbnNmb3JtKSB7XG4gICAgc3dpdGNoKHRyYW5zZm9ybSl7XG4gICAgICBjYXNlIFwibG93ZXJjYXNlXCI6XG4gICAgICAgIHJldHVybiB0ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgICBjYXNlIFwiY2FwaXRhbGl6ZVwiOlxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKCAvKF58XFxzfDp8LXxcXCh8XFwpKShbYS16XSkvZywgY2FwaXRhbGl6ZSk7XG4gICAgICBjYXNlIFwidXBwZXJjYXNlXCI6XG4gICAgICAgIHJldHVybiB0ZXh0LnRvVXBwZXJDYXNlKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBub0xldHRlclNwYWNpbmcobGV0dGVyX3NwYWNpbmcpIHtcbiAgICByZXR1cm4gKC9eKG5vcm1hbHxub25lfDBweCkkLy50ZXN0KGxldHRlcl9zcGFjaW5nKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3VGV4dChjdXJyZW50VGV4dCwgeCwgeSwgY3R4KXtcbiAgICBpZiAoY3VycmVudFRleHQgIT09IG51bGwgJiYgVXRpbC50cmltVGV4dChjdXJyZW50VGV4dCkubGVuZ3RoID4gMCkge1xuICAgICAgY3R4LmZpbGxUZXh0KGN1cnJlbnRUZXh0LCB4LCB5KTtcbiAgICAgIG51bURyYXdzKz0xO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFRleHRWYXJpYWJsZXMoY3R4LCBlbCwgdGV4dF9kZWNvcmF0aW9uLCBjb2xvcikge1xuICAgIHZhciBhbGlnbiA9IGZhbHNlLFxuICAgIGJvbGQgPSBnZXRDU1MoZWwsIFwiZm9udFdlaWdodFwiKSxcbiAgICBmYW1pbHkgPSBnZXRDU1MoZWwsIFwiZm9udEZhbWlseVwiKSxcbiAgICBzaXplID0gZ2V0Q1NTKGVsLCBcImZvbnRTaXplXCIpLFxuICAgIHNoYWRvd3MgPSBVdGlsLnBhcnNlVGV4dFNoYWRvd3MoZ2V0Q1NTKGVsLCBcInRleHRTaGFkb3dcIikpO1xuXG4gICAgc3dpdGNoKHBhcnNlSW50KGJvbGQsIDEwKSl7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgYm9sZCA9IFwiYm9sZFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAwOlxuICAgICAgICBib2xkID0gXCJub3JtYWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY3R4LnNldFZhcmlhYmxlKFwiZmlsbFN0eWxlXCIsIGNvbG9yKTtcbiAgICBjdHguc2V0VmFyaWFibGUoXCJmb250XCIsIFtnZXRDU1MoZWwsIFwiZm9udFN0eWxlXCIpLCBnZXRDU1MoZWwsIFwiZm9udFZhcmlhbnRcIiksIGJvbGQsIHNpemUsIGZhbWlseV0uam9pbihcIiBcIikpO1xuICAgIGN0eC5zZXRWYXJpYWJsZShcInRleHRBbGlnblwiLCAoYWxpZ24pID8gXCJyaWdodFwiIDogXCJsZWZ0XCIpO1xuXG4gICAgaWYgKHNoYWRvd3MubGVuZ3RoKSB7XG4gICAgICAvLyBUT0RPOiBzdXBwb3J0IG11bHRpcGxlIHRleHQgc2hhZG93c1xuICAgICAgLy8gYXBwbHkgdGhlIGZpcnN0IHRleHQgc2hhZG93XG4gICAgICBjdHguc2V0VmFyaWFibGUoXCJzaGFkb3dDb2xvclwiLCBzaGFkb3dzWzBdLmNvbG9yKTtcbiAgICAgIGN0eC5zZXRWYXJpYWJsZShcInNoYWRvd09mZnNldFhcIiwgc2hhZG93c1swXS5vZmZzZXRYKTtcbiAgICAgIGN0eC5zZXRWYXJpYWJsZShcInNoYWRvd09mZnNldFlcIiwgc2hhZG93c1swXS5vZmZzZXRZKTtcbiAgICAgIGN0eC5zZXRWYXJpYWJsZShcInNoYWRvd0JsdXJcIiwgc2hhZG93c1swXS5ibHVyKTtcbiAgICB9XG5cbiAgICBpZiAodGV4dF9kZWNvcmF0aW9uICE9PSBcIm5vbmVcIil7XG4gICAgICByZXR1cm4gVXRpbC5Gb250KGZhbWlseSwgc2l6ZSwgZG9jKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJUZXh0RGVjb3JhdGlvbihjdHgsIHRleHRfZGVjb3JhdGlvbiwgYm91bmRzLCBtZXRyaWNzLCBjb2xvcikge1xuICAgIHN3aXRjaCh0ZXh0X2RlY29yYXRpb24pIHtcbiAgICAgIGNhc2UgXCJ1bmRlcmxpbmVcIjpcbiAgICAgICAgLy8gRHJhd3MgYSBsaW5lIGF0IHRoZSBiYXNlbGluZSBvZiB0aGUgZm9udFxuICAgICAgICAvLyBUT0RPIEFzIHNvbWUgYnJvd3NlcnMgZGlzcGxheSB0aGUgbGluZSBhcyBtb3JlIHRoYW4gMXB4IGlmIHRoZSBmb250LXNpemUgaXMgYmlnLCBuZWVkIHRvIHRha2UgdGhhdCBpbnRvIGFjY291bnQgYm90aCBpbiBwb3NpdGlvbiBhbmQgc2l6ZVxuICAgICAgICByZW5kZXJSZWN0KGN0eCwgYm91bmRzLmxlZnQsIE1hdGgucm91bmQoYm91bmRzLnRvcCArIG1ldHJpY3MuYmFzZWxpbmUgKyBtZXRyaWNzLmxpbmVXaWR0aCksIGJvdW5kcy53aWR0aCwgMSwgY29sb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJvdmVybGluZVwiOlxuICAgICAgICByZW5kZXJSZWN0KGN0eCwgYm91bmRzLmxlZnQsIE1hdGgucm91bmQoYm91bmRzLnRvcCksIGJvdW5kcy53aWR0aCwgMSwgY29sb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsaW5lLXRocm91Z2hcIjpcbiAgICAgICAgLy8gVE9ETyB0cnkgYW5kIGZpbmQgZXhhY3QgcG9zaXRpb24gZm9yIGxpbmUtdGhyb3VnaFxuICAgICAgICByZW5kZXJSZWN0KGN0eCwgYm91bmRzLmxlZnQsIE1hdGguY2VpbChib3VuZHMudG9wICsgbWV0cmljcy5taWRkbGUgKyBtZXRyaWNzLmxpbmVXaWR0aCksIGJvdW5kcy53aWR0aCwgMSwgY29sb3IpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUZXh0Qm91bmRzKHN0YXRlLCB0ZXh0LCB0ZXh0RGVjb3JhdGlvbiwgaXNMYXN0LCB0cmFuc2Zvcm0pIHtcbiAgICB2YXIgYm91bmRzO1xuICAgIGlmIChzdXBwb3J0LnJhbmdlQm91bmRzICYmICF0cmFuc2Zvcm0pIHtcbiAgICAgIGlmICh0ZXh0RGVjb3JhdGlvbiAhPT0gXCJub25lXCIgfHwgVXRpbC50cmltVGV4dCh0ZXh0KS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgYm91bmRzID0gdGV4dFJhbmdlQm91bmRzKHRleHQsIHN0YXRlLm5vZGUsIHN0YXRlLnRleHRPZmZzZXQpO1xuICAgICAgfVxuICAgICAgc3RhdGUudGV4dE9mZnNldCArPSB0ZXh0Lmxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLm5vZGUgJiYgdHlwZW9mIHN0YXRlLm5vZGUubm9kZVZhbHVlID09PSBcInN0cmluZ1wiICl7XG4gICAgICB2YXIgbmV3VGV4dE5vZGUgPSAoaXNMYXN0KSA/IHN0YXRlLm5vZGUuc3BsaXRUZXh0KHRleHQubGVuZ3RoKSA6IG51bGw7XG4gICAgICBib3VuZHMgPSB0ZXh0V3JhcHBlckJvdW5kcyhzdGF0ZS5ub2RlLCB0cmFuc2Zvcm0pO1xuICAgICAgc3RhdGUubm9kZSA9IG5ld1RleHROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gdGV4dFJhbmdlQm91bmRzKHRleHQsIHRleHROb2RlLCB0ZXh0T2Zmc2V0KSB7XG4gICAgdmFyIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2V0U3RhcnQodGV4dE5vZGUsIHRleHRPZmZzZXQpO1xuICAgIHJhbmdlLnNldEVuZCh0ZXh0Tm9kZSwgdGV4dE9mZnNldCArIHRleHQubGVuZ3RoKTtcbiAgICByZXR1cm4gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICBmdW5jdGlvbiB0ZXh0V3JhcHBlckJvdW5kcyhvbGRUZXh0Tm9kZSwgdHJhbnNmb3JtKSB7XG4gICAgdmFyIHBhcmVudCA9IG9sZFRleHROb2RlLnBhcmVudE5vZGUsXG4gICAgd3JhcEVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnd3JhcHBlcicpLFxuICAgIGJhY2t1cFRleHQgPSBvbGRUZXh0Tm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICB3cmFwRWxlbWVudC5hcHBlbmRDaGlsZChvbGRUZXh0Tm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQod3JhcEVsZW1lbnQsIG9sZFRleHROb2RlKTtcblxuICAgIHZhciBib3VuZHMgPSB0cmFuc2Zvcm0gPyBVdGlsLk9mZnNldEJvdW5kcyh3cmFwRWxlbWVudCkgOiBVdGlsLkJvdW5kcyh3cmFwRWxlbWVudCk7XG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZChiYWNrdXBUZXh0LCB3cmFwRWxlbWVudCk7XG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclRleHQoZWwsIHRleHROb2RlLCBzdGFjaykge1xuICAgIHZhciBjdHggPSBzdGFjay5jdHgsXG4gICAgY29sb3IgPSBnZXRDU1MoZWwsIFwiY29sb3JcIiksXG4gICAgdGV4dERlY29yYXRpb24gPSBnZXRDU1MoZWwsIFwidGV4dERlY29yYXRpb25cIiksXG4gICAgdGV4dEFsaWduID0gZ2V0Q1NTKGVsLCBcInRleHRBbGlnblwiKSxcbiAgICBtZXRyaWNzLFxuICAgIHRleHRMaXN0LFxuICAgIHN0YXRlID0ge1xuICAgICAgbm9kZTogdGV4dE5vZGUsXG4gICAgICB0ZXh0T2Zmc2V0OiAwXG4gICAgfTtcblxuICAgIGlmIChVdGlsLnRyaW1UZXh0KHRleHROb2RlLm5vZGVWYWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgdGV4dE5vZGUubm9kZVZhbHVlID0gdGV4dFRyYW5zZm9ybSh0ZXh0Tm9kZS5ub2RlVmFsdWUsIGdldENTUyhlbCwgXCJ0ZXh0VHJhbnNmb3JtXCIpKTtcbiAgICAgIHRleHRBbGlnbiA9IHRleHRBbGlnbi5yZXBsYWNlKFtcIi13ZWJraXQtYXV0b1wiXSxbXCJhdXRvXCJdKTtcblxuICAgICAgdGV4dExpc3QgPSAoIW9wdGlvbnMubGV0dGVyUmVuZGVyaW5nICYmIC9eKGxlZnR8cmlnaHR8anVzdGlmeXxhdXRvKSQvLnRlc3QodGV4dEFsaWduKSAmJiBub0xldHRlclNwYWNpbmcoZ2V0Q1NTKGVsLCBcImxldHRlclNwYWNpbmdcIikpKSA/XG4gICAgICB0ZXh0Tm9kZS5ub2RlVmFsdWUuc3BsaXQoLyhcXGJ8ICkvKVxuICAgICAgOiB0ZXh0Tm9kZS5ub2RlVmFsdWUuc3BsaXQoXCJcIik7XG5cbiAgICAgIG1ldHJpY3MgPSBzZXRUZXh0VmFyaWFibGVzKGN0eCwgZWwsIHRleHREZWNvcmF0aW9uLCBjb2xvcik7XG5cbiAgICAgIGlmIChvcHRpb25zLmNoaW5lc2UpIHtcbiAgICAgICAgdGV4dExpc3QuZm9yRWFjaChmdW5jdGlvbih3b3JkLCBpbmRleCkge1xuICAgICAgICAgIGlmICgvLipbXFx1NEUwMC1cXHU5RkE1XS4qJC8udGVzdCh3b3JkKSkge1xuICAgICAgICAgICAgd29yZCA9IHdvcmQuc3BsaXQoXCJcIik7XG4gICAgICAgICAgICB3b3JkLnVuc2hpZnQoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGV4dExpc3Quc3BsaWNlLmFwcGx5KHRleHRMaXN0LCB3b3JkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0ZXh0TGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHRleHQsIGluZGV4KSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBnZXRUZXh0Qm91bmRzKHN0YXRlLCB0ZXh0LCB0ZXh0RGVjb3JhdGlvbiwgKGluZGV4IDwgdGV4dExpc3QubGVuZ3RoIC0gMSksIHN0YWNrLnRyYW5zZm9ybS5tYXRyaXgpO1xuICAgICAgICBpZiAoYm91bmRzKSB7XG4gICAgICAgICAgZHJhd1RleHQodGV4dCwgYm91bmRzLmxlZnQsIGJvdW5kcy5ib3R0b20sIGN0eCk7XG4gICAgICAgICAgcmVuZGVyVGV4dERlY29yYXRpb24oY3R4LCB0ZXh0RGVjb3JhdGlvbiwgYm91bmRzLCBtZXRyaWNzLCBjb2xvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RQb3NpdGlvbiAoZWxlbWVudCwgdmFsKSB7XG4gICAgdmFyIGJvdW5kRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCBcImJvdW5kZWxlbWVudFwiICksXG4gICAgb3JpZ2luYWxUeXBlLFxuICAgIGJvdW5kcztcblxuICAgIGJvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcblxuICAgIG9yaWdpbmFsVHlwZSA9IGVsZW1lbnQuc3R5bGUubGlzdFN0eWxlVHlwZTtcbiAgICBlbGVtZW50LnN0eWxlLmxpc3RTdHlsZVR5cGUgPSBcIm5vbmVcIjtcblxuICAgIGJvdW5kRWxlbWVudC5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUodmFsKSk7XG5cbiAgICBlbGVtZW50Lmluc2VydEJlZm9yZShib3VuZEVsZW1lbnQsIGVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cbiAgICBib3VuZHMgPSBVdGlsLkJvdW5kcyhib3VuZEVsZW1lbnQpO1xuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoYm91bmRFbGVtZW50KTtcbiAgICBlbGVtZW50LnN0eWxlLmxpc3RTdHlsZVR5cGUgPSBvcmlnaW5hbFR5cGU7XG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVsZW1lbnRJbmRleChlbCkge1xuICAgIHZhciBpID0gLTEsXG4gICAgY291bnQgPSAxLFxuICAgIGNoaWxkcyA9IGVsLnBhcmVudE5vZGUuY2hpbGROb2RlcztcblxuICAgIGlmIChlbC5wYXJlbnROb2RlKSB7XG4gICAgICB3aGlsZShjaGlsZHNbKytpXSAhPT0gZWwpIHtcbiAgICAgICAgaWYgKGNoaWxkc1tpXS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb3VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RJdGVtVGV4dChlbGVtZW50LCB0eXBlKSB7XG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IGVsZW1lbnRJbmRleChlbGVtZW50KSwgdGV4dDtcbiAgICBzd2l0Y2godHlwZSl7XG4gICAgICBjYXNlIFwiZGVjaW1hbFwiOlxuICAgICAgICB0ZXh0ID0gY3VycmVudEluZGV4O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkZWNpbWFsLWxlYWRpbmctemVyb1wiOlxuICAgICAgICB0ZXh0ID0gKGN1cnJlbnRJbmRleC50b1N0cmluZygpLmxlbmd0aCA9PT0gMSkgPyBjdXJyZW50SW5kZXggPSBcIjBcIiArIGN1cnJlbnRJbmRleC50b1N0cmluZygpIDogY3VycmVudEluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInVwcGVyLXJvbWFuXCI6XG4gICAgICAgIHRleHQgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUuTGlzdFJvbWFuKCBjdXJyZW50SW5kZXggKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibG93ZXItcm9tYW5cIjpcbiAgICAgICAgdGV4dCA9IF9odG1sMmNhbnZhcy5HZW5lcmF0ZS5MaXN0Um9tYW4oIGN1cnJlbnRJbmRleCApLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxvd2VyLWFscGhhXCI6XG4gICAgICAgIHRleHQgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUuTGlzdEFscGhhKCBjdXJyZW50SW5kZXggKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cHBlci1hbHBoYVwiOlxuICAgICAgICB0ZXh0ID0gX2h0bWwyY2FudmFzLkdlbmVyYXRlLkxpc3RBbHBoYSggY3VycmVudEluZGV4ICk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0ICsgXCIuIFwiO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyTGlzdEl0ZW0oZWxlbWVudCwgc3RhY2ssIGVsQm91bmRzKSB7XG4gICAgdmFyIHgsXG4gICAgdGV4dCxcbiAgICBjdHggPSBzdGFjay5jdHgsXG4gICAgdHlwZSA9IGdldENTUyhlbGVtZW50LCBcImxpc3RTdHlsZVR5cGVcIiksXG4gICAgbGlzdEJvdW5kcztcblxuICAgIGlmICgvXihkZWNpbWFsfGRlY2ltYWwtbGVhZGluZy16ZXJvfHVwcGVyLWFscGhhfHVwcGVyLWxhdGlufHVwcGVyLXJvbWFufGxvd2VyLWFscGhhfGxvd2VyLWdyZWVrfGxvd2VyLWxhdGlufGxvd2VyLXJvbWFuKSQvaS50ZXN0KHR5cGUpKSB7XG4gICAgICB0ZXh0ID0gbGlzdEl0ZW1UZXh0KGVsZW1lbnQsIHR5cGUpO1xuICAgICAgbGlzdEJvdW5kcyA9IGxpc3RQb3NpdGlvbihlbGVtZW50LCB0ZXh0KTtcbiAgICAgIHNldFRleHRWYXJpYWJsZXMoY3R4LCBlbGVtZW50LCBcIm5vbmVcIiwgZ2V0Q1NTKGVsZW1lbnQsIFwiY29sb3JcIikpO1xuXG4gICAgICBpZiAoZ2V0Q1NTKGVsZW1lbnQsIFwibGlzdFN0eWxlUG9zaXRpb25cIikgPT09IFwiaW5zaWRlXCIpIHtcbiAgICAgICAgY3R4LnNldFZhcmlhYmxlKFwidGV4dEFsaWduXCIsIFwibGVmdFwiKTtcbiAgICAgICAgeCA9IGVsQm91bmRzLmxlZnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRyYXdUZXh0KHRleHQsIHgsIGxpc3RCb3VuZHMuYm90dG9tLCBjdHgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRJbWFnZSAoc3JjKXtcbiAgICB2YXIgaW1nID0gaW1hZ2VzW3NyY107XG4gICAgcmV0dXJuIChpbWcgJiYgaW1nLnN1Y2NlZWRlZCA9PT0gdHJ1ZSkgPyBpbWcuaW1nIDogZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBjbGlwQm91bmRzKHNyYywgZHN0KXtcbiAgICB2YXIgeCA9IE1hdGgubWF4KHNyYy5sZWZ0LCBkc3QubGVmdCksXG4gICAgeSA9IE1hdGgubWF4KHNyYy50b3AsIGRzdC50b3ApLFxuICAgIHgyID0gTWF0aC5taW4oKHNyYy5sZWZ0ICsgc3JjLndpZHRoKSwgKGRzdC5sZWZ0ICsgZHN0LndpZHRoKSksXG4gICAgeTIgPSBNYXRoLm1pbigoc3JjLnRvcCArIHNyYy5oZWlnaHQpLCAoZHN0LnRvcCArIGRzdC5oZWlnaHQpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBsZWZ0OngsXG4gICAgICB0b3A6eSxcbiAgICAgIHdpZHRoOngyLXgsXG4gICAgICBoZWlnaHQ6eTIteVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzZXRaKGVsZW1lbnQsIHN0YWNrLCBwYXJlbnRTdGFjayl7XG4gICAgdmFyIG5ld0NvbnRleHQsXG4gICAgaXNQb3NpdGlvbmVkID0gc3RhY2suY3NzUG9zaXRpb24gIT09ICdzdGF0aWMnLFxuICAgIHpJbmRleCA9IGlzUG9zaXRpb25lZCA/IGdldENTUyhlbGVtZW50LCAnekluZGV4JykgOiAnYXV0bycsXG4gICAgb3BhY2l0eSA9IGdldENTUyhlbGVtZW50LCAnb3BhY2l0eScpLFxuICAgIGlzRmxvYXRlZCA9IGdldENTUyhlbGVtZW50LCAnY3NzRmxvYXQnKSAhPT0gJ25vbmUnO1xuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvR3VpZGUvQ1NTL1VuZGVyc3RhbmRpbmdfel9pbmRleC9UaGVfc3RhY2tpbmdfY29udGV4dFxuICAgIC8vIFdoZW4gYSBuZXcgc3RhY2tpbmcgY29udGV4dCBzaG91bGQgYmUgY3JlYXRlZDpcbiAgICAvLyB0aGUgcm9vdCBlbGVtZW50IChIVE1MKSxcbiAgICAvLyBwb3NpdGlvbmVkIChhYnNvbHV0ZWx5IG9yIHJlbGF0aXZlbHkpIHdpdGggYSB6LWluZGV4IHZhbHVlIG90aGVyIHRoYW4gXCJhdXRvXCIsXG4gICAgLy8gZWxlbWVudHMgd2l0aCBhbiBvcGFjaXR5IHZhbHVlIGxlc3MgdGhhbiAxLiAoU2VlIHRoZSBzcGVjaWZpY2F0aW9uIGZvciBvcGFjaXR5KSxcbiAgICAvLyBvbiBtb2JpbGUgV2ViS2l0IGFuZCBDaHJvbWUgMjIrLCBwb3NpdGlvbjogZml4ZWQgYWx3YXlzIGNyZWF0ZXMgYSBuZXcgc3RhY2tpbmcgY29udGV4dCwgZXZlbiB3aGVuIHotaW5kZXggaXMgXCJhdXRvXCIgKFNlZSB0aGlzIHBvc3QpXG5cbiAgICBzdGFjay56SW5kZXggPSBuZXdDb250ZXh0ID0gaDJjekNvbnRleHQoekluZGV4KTtcbiAgICBuZXdDb250ZXh0LmlzUG9zaXRpb25lZCA9IGlzUG9zaXRpb25lZDtcbiAgICBuZXdDb250ZXh0LmlzRmxvYXRlZCA9IGlzRmxvYXRlZDtcbiAgICBuZXdDb250ZXh0Lm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgIG5ld0NvbnRleHQub3duU3RhY2tpbmcgPSAoekluZGV4ICE9PSAnYXV0bycgfHwgb3BhY2l0eSA8IDEpO1xuXG4gICAgaWYgKHBhcmVudFN0YWNrKSB7XG4gICAgICBwYXJlbnRTdGFjay56SW5kZXguY2hpbGRyZW4ucHVzaChzdGFjayk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySW1hZ2UoY3R4LCBlbGVtZW50LCBpbWFnZSwgYm91bmRzLCBib3JkZXJzKSB7XG5cbiAgICB2YXIgcGFkZGluZ0xlZnQgPSBnZXRDU1NJbnQoZWxlbWVudCwgJ3BhZGRpbmdMZWZ0JyksXG4gICAgcGFkZGluZ1RvcCA9IGdldENTU0ludChlbGVtZW50LCAncGFkZGluZ1RvcCcpLFxuICAgIHBhZGRpbmdSaWdodCA9IGdldENTU0ludChlbGVtZW50LCAncGFkZGluZ1JpZ2h0JyksXG4gICAgcGFkZGluZ0JvdHRvbSA9IGdldENTU0ludChlbGVtZW50LCAncGFkZGluZ0JvdHRvbScpO1xuXG4gICAgZHJhd0ltYWdlKFxuICAgICAgY3R4LFxuICAgICAgaW1hZ2UsXG4gICAgICAwLCAvL3N4XG4gICAgICAwLCAvL3N5XG4gICAgICBpbWFnZS53aWR0aCwgLy9zd1xuICAgICAgaW1hZ2UuaGVpZ2h0LCAvL3NoXG4gICAgICBib3VuZHMubGVmdCArIHBhZGRpbmdMZWZ0ICsgYm9yZGVyc1szXS53aWR0aCwgLy9keFxuICAgICAgYm91bmRzLnRvcCArIHBhZGRpbmdUb3AgKyBib3JkZXJzWzBdLndpZHRoLCAvLyBkeVxuICAgICAgYm91bmRzLndpZHRoIC0gKGJvcmRlcnNbMV0ud2lkdGggKyBib3JkZXJzWzNdLndpZHRoICsgcGFkZGluZ0xlZnQgKyBwYWRkaW5nUmlnaHQpLCAvL2R3XG4gICAgICBib3VuZHMuaGVpZ2h0IC0gKGJvcmRlcnNbMF0ud2lkdGggKyBib3JkZXJzWzJdLndpZHRoICsgcGFkZGluZ1RvcCArIHBhZGRpbmdCb3R0b20pIC8vZGhcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb3JkZXJEYXRhKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gW1wiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCJdLm1hcChmdW5jdGlvbihzaWRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3aWR0aDogZ2V0Q1NTSW50KGVsZW1lbnQsICdib3JkZXInICsgc2lkZSArICdXaWR0aCcpLFxuICAgICAgICBjb2xvcjogZ2V0Q1NTKGVsZW1lbnQsICdib3JkZXInICsgc2lkZSArICdDb2xvcicpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm9yZGVyUmFkaXVzRGF0YShlbGVtZW50KSB7XG4gICAgcmV0dXJuIFtcIlRvcExlZnRcIiwgXCJUb3BSaWdodFwiLCBcIkJvdHRvbVJpZ2h0XCIsIFwiQm90dG9tTGVmdFwiXS5tYXAoZnVuY3Rpb24oc2lkZSkge1xuICAgICAgcmV0dXJuIGdldENTUyhlbGVtZW50LCAnYm9yZGVyJyArIHNpZGUgKyAnUmFkaXVzJyk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgZ2V0Q3VydmVQb2ludHMgPSAoZnVuY3Rpb24oa2FwcGEpIHtcblxuICAgIHJldHVybiBmdW5jdGlvbih4LCB5LCByMSwgcjIpIHtcbiAgICAgIHZhciBveCA9IChyMSkgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgaG9yaXpvbnRhbFxuICAgICAgb3kgPSAocjIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IHZlcnRpY2FsXG4gICAgICB4bSA9IHggKyByMSwgLy8geC1taWRkbGVcbiAgICAgIHltID0geSArIHIyOyAvLyB5LW1pZGRsZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9wTGVmdDogYmV6aWVyQ3VydmUoe1xuICAgICAgICAgIHg6eCxcbiAgICAgICAgICB5OnltXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OngsXG4gICAgICAgICAgeTp5bSAtIG95XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtIC0gb3gsXG4gICAgICAgICAgeTp5XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtLFxuICAgICAgICAgIHk6eVxuICAgICAgICB9KSxcbiAgICAgICAgdG9wUmlnaHQ6IGJlemllckN1cnZlKHtcbiAgICAgICAgICB4OngsXG4gICAgICAgICAgeTp5XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnggKyBveCxcbiAgICAgICAgICB5OnlcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eG0sXG4gICAgICAgICAgeTp5bSAtIG95XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtLFxuICAgICAgICAgIHk6eW1cbiAgICAgICAgfSksXG4gICAgICAgIGJvdHRvbVJpZ2h0OiBiZXppZXJDdXJ2ZSh7XG4gICAgICAgICAgeDp4bSxcbiAgICAgICAgICB5OnlcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eG0sXG4gICAgICAgICAgeTp5ICsgb3lcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eCArIG94LFxuICAgICAgICAgIHk6eW1cbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eCxcbiAgICAgICAgICB5OnltXG4gICAgICAgIH0pLFxuICAgICAgICBib3R0b21MZWZ0OiBiZXppZXJDdXJ2ZSh7XG4gICAgICAgICAgeDp4bSxcbiAgICAgICAgICB5OnltXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtIC0gb3gsXG4gICAgICAgICAgeTp5bVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4LFxuICAgICAgICAgIHk6eSArIG95XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OngsXG4gICAgICAgICAgeTp5XG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgIH07XG4gIH0pKDQgKiAoKE1hdGguc3FydCgyKSAtIDEpIC8gMykpO1xuXG4gIGZ1bmN0aW9uIGJlemllckN1cnZlKHN0YXJ0LCBzdGFydENvbnRyb2wsIGVuZENvbnRyb2wsIGVuZCkge1xuXG4gICAgdmFyIGxlcnAgPSBmdW5jdGlvbiAoYSwgYiwgdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDphLnggKyAoYi54IC0gYS54KSAqIHQsXG4gICAgICAgIHk6YS55ICsgKGIueSAtIGEueSkgKiB0XG4gICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgc3RhcnRDb250cm9sOiBzdGFydENvbnRyb2wsXG4gICAgICBlbmRDb250cm9sOiBlbmRDb250cm9sLFxuICAgICAgZW5kOiBlbmQsXG4gICAgICBzdWJkaXZpZGU6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgdmFyIGFiID0gbGVycChzdGFydCwgc3RhcnRDb250cm9sLCB0KSxcbiAgICAgICAgYmMgPSBsZXJwKHN0YXJ0Q29udHJvbCwgZW5kQ29udHJvbCwgdCksXG4gICAgICAgIGNkID0gbGVycChlbmRDb250cm9sLCBlbmQsIHQpLFxuICAgICAgICBhYmJjID0gbGVycChhYiwgYmMsIHQpLFxuICAgICAgICBiY2NkID0gbGVycChiYywgY2QsIHQpLFxuICAgICAgICBkZXN0ID0gbGVycChhYmJjLCBiY2NkLCB0KTtcbiAgICAgICAgcmV0dXJuIFtiZXppZXJDdXJ2ZShzdGFydCwgYWIsIGFiYmMsIGRlc3QpLCBiZXppZXJDdXJ2ZShkZXN0LCBiY2NkLCBjZCwgZW5kKV07XG4gICAgICB9LFxuICAgICAgY3VydmVUbzogZnVuY3Rpb24oYm9yZGVyQXJncykge1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wiYmV6aWVyQ3VydmVcIiwgc3RhcnRDb250cm9sLngsIHN0YXJ0Q29udHJvbC55LCBlbmRDb250cm9sLngsIGVuZENvbnRyb2wueSwgZW5kLngsIGVuZC55XSk7XG4gICAgICB9LFxuICAgICAgY3VydmVUb1JldmVyc2VkOiBmdW5jdGlvbihib3JkZXJBcmdzKSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJiZXppZXJDdXJ2ZVwiLCBlbmRDb250cm9sLngsIGVuZENvbnRyb2wueSwgc3RhcnRDb250cm9sLngsIHN0YXJ0Q29udHJvbC55LCBzdGFydC54LCBzdGFydC55XSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1czEsIHJhZGl1czIsIGNvcm5lcjEsIGNvcm5lcjIsIHgsIHkpIHtcbiAgICBpZiAocmFkaXVzMVswXSA+IDAgfHwgcmFkaXVzMVsxXSA+IDApIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGNvcm5lcjFbMF0uc3RhcnQueCwgY29ybmVyMVswXS5zdGFydC55XSk7XG4gICAgICBjb3JuZXIxWzBdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgICBjb3JuZXIxWzFdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIHgsIHldKTtcbiAgICB9XG5cbiAgICBpZiAocmFkaXVzMlswXSA+IDAgfHwgcmFkaXVzMlsxXSA+IDApIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGNvcm5lcjJbMF0uc3RhcnQueCwgY29ybmVyMlswXS5zdGFydC55XSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZHJhd1NpZGUoYm9yZGVyRGF0YSwgcmFkaXVzMSwgcmFkaXVzMiwgb3V0ZXIxLCBpbm5lcjEsIG91dGVyMiwgaW5uZXIyKSB7XG4gICAgdmFyIGJvcmRlckFyZ3MgPSBbXTtcblxuICAgIGlmIChyYWRpdXMxWzBdID4gMCB8fCByYWRpdXMxWzFdID4gMCkge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgb3V0ZXIxWzFdLnN0YXJ0LngsIG91dGVyMVsxXS5zdGFydC55XSk7XG4gICAgICBvdXRlcjFbMV0uY3VydmVUbyhib3JkZXJBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFsgXCJsaW5lXCIsIGJvcmRlckRhdGEuYzFbMF0sIGJvcmRlckRhdGEuYzFbMV1dKTtcbiAgICB9XG5cbiAgICBpZiAocmFkaXVzMlswXSA+IDAgfHwgcmFkaXVzMlsxXSA+IDApIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIG91dGVyMlswXS5zdGFydC54LCBvdXRlcjJbMF0uc3RhcnQueV0pO1xuICAgICAgb3V0ZXIyWzBdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBpbm5lcjJbMF0uZW5kLngsIGlubmVyMlswXS5lbmQueV0pO1xuICAgICAgaW5uZXIyWzBdLmN1cnZlVG9SZXZlcnNlZChib3JkZXJBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFsgXCJsaW5lXCIsIGJvcmRlckRhdGEuYzJbMF0sIGJvcmRlckRhdGEuYzJbMV1dKTtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbIFwibGluZVwiLCBib3JkZXJEYXRhLmMzWzBdLCBib3JkZXJEYXRhLmMzWzFdXSk7XG4gICAgfVxuXG4gICAgaWYgKHJhZGl1czFbMF0gPiAwIHx8IHJhZGl1czFbMV0gPiAwKSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBpbm5lcjFbMV0uZW5kLngsIGlubmVyMVsxXS5lbmQueV0pO1xuICAgICAgaW5uZXIxWzFdLmN1cnZlVG9SZXZlcnNlZChib3JkZXJBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFsgXCJsaW5lXCIsIGJvcmRlckRhdGEuYzRbMF0sIGJvcmRlckRhdGEuYzRbMV1dKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9yZGVyQXJncztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUN1cnZlUG9pbnRzKGJvdW5kcywgYm9yZGVyUmFkaXVzLCBib3JkZXJzKSB7XG5cbiAgICB2YXIgeCA9IGJvdW5kcy5sZWZ0LFxuICAgIHkgPSBib3VuZHMudG9wLFxuICAgIHdpZHRoID0gYm91bmRzLndpZHRoLFxuICAgIGhlaWdodCA9IGJvdW5kcy5oZWlnaHQsXG5cbiAgICB0bGggPSBib3JkZXJSYWRpdXNbMF1bMF0sXG4gICAgdGx2ID0gYm9yZGVyUmFkaXVzWzBdWzFdLFxuICAgIHRyaCA9IGJvcmRlclJhZGl1c1sxXVswXSxcbiAgICB0cnYgPSBib3JkZXJSYWRpdXNbMV1bMV0sXG4gICAgYnJoID0gYm9yZGVyUmFkaXVzWzJdWzBdLFxuICAgIGJydiA9IGJvcmRlclJhZGl1c1syXVsxXSxcbiAgICBibGggPSBib3JkZXJSYWRpdXNbM11bMF0sXG4gICAgYmx2ID0gYm9yZGVyUmFkaXVzWzNdWzFdLFxuXG4gICAgdG9wV2lkdGggPSB3aWR0aCAtIHRyaCxcbiAgICByaWdodEhlaWdodCA9IGhlaWdodCAtIGJydixcbiAgICBib3R0b21XaWR0aCA9IHdpZHRoIC0gYnJoLFxuICAgIGxlZnRIZWlnaHQgPSBoZWlnaHQgLSBibHY7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wTGVmdE91dGVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdGxoLFxuICAgICAgICB0bHZcbiAgICAgICAgKS50b3BMZWZ0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICB0b3BMZWZ0SW5uZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgYm9yZGVyc1szXS53aWR0aCxcbiAgICAgICAgeSArIGJvcmRlcnNbMF0ud2lkdGgsXG4gICAgICAgIE1hdGgubWF4KDAsIHRsaCAtIGJvcmRlcnNbM10ud2lkdGgpLFxuICAgICAgICBNYXRoLm1heCgwLCB0bHYgLSBib3JkZXJzWzBdLndpZHRoKVxuICAgICAgICApLnRvcExlZnQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIHRvcFJpZ2h0T3V0ZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgdG9wV2lkdGgsXG4gICAgICAgIHksXG4gICAgICAgIHRyaCxcbiAgICAgICAgdHJ2XG4gICAgICAgICkudG9wUmlnaHQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIHRvcFJpZ2h0SW5uZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgTWF0aC5taW4odG9wV2lkdGgsIHdpZHRoICsgYm9yZGVyc1szXS53aWR0aCksXG4gICAgICAgIHkgKyBib3JkZXJzWzBdLndpZHRoLFxuICAgICAgICAodG9wV2lkdGggPiB3aWR0aCArIGJvcmRlcnNbM10ud2lkdGgpID8gMCA6dHJoIC0gYm9yZGVyc1szXS53aWR0aCxcbiAgICAgICAgdHJ2IC0gYm9yZGVyc1swXS53aWR0aFxuICAgICAgICApLnRvcFJpZ2h0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICBib3R0b21SaWdodE91dGVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCArIGJvdHRvbVdpZHRoLFxuICAgICAgICB5ICsgcmlnaHRIZWlnaHQsXG4gICAgICAgIGJyaCxcbiAgICAgICAgYnJ2XG4gICAgICAgICkuYm90dG9tUmlnaHQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIGJvdHRvbVJpZ2h0SW5uZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgTWF0aC5taW4oYm90dG9tV2lkdGgsIHdpZHRoICsgYm9yZGVyc1szXS53aWR0aCksXG4gICAgICAgIHkgKyBNYXRoLm1pbihyaWdodEhlaWdodCwgaGVpZ2h0ICsgYm9yZGVyc1swXS53aWR0aCksXG4gICAgICAgIE1hdGgubWF4KDAsIGJyaCAtIGJvcmRlcnNbMV0ud2lkdGgpLFxuICAgICAgICBNYXRoLm1heCgwLCBicnYgLSBib3JkZXJzWzJdLndpZHRoKVxuICAgICAgICApLmJvdHRvbVJpZ2h0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICBib3R0b21MZWZ0T3V0ZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4LFxuICAgICAgICB5ICsgbGVmdEhlaWdodCxcbiAgICAgICAgYmxoLFxuICAgICAgICBibHZcbiAgICAgICAgKS5ib3R0b21MZWZ0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICBib3R0b21MZWZ0SW5uZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgYm9yZGVyc1szXS53aWR0aCxcbiAgICAgICAgeSArIGxlZnRIZWlnaHQsXG4gICAgICAgIE1hdGgubWF4KDAsIGJsaCAtIGJvcmRlcnNbM10ud2lkdGgpLFxuICAgICAgICBNYXRoLm1heCgwLCBibHYgLSBib3JkZXJzWzJdLndpZHRoKVxuICAgICAgICApLmJvdHRvbUxlZnQuc3ViZGl2aWRlKDAuNSlcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm9yZGVyQ2xpcChlbGVtZW50LCBib3JkZXJQb2ludHMsIGJvcmRlcnMsIHJhZGl1cywgYm91bmRzKSB7XG4gICAgdmFyIGJhY2tncm91bmRDbGlwID0gZ2V0Q1NTKGVsZW1lbnQsICdiYWNrZ3JvdW5kQ2xpcCcpLFxuICAgIGJvcmRlckFyZ3MgPSBbXTtcblxuICAgIHN3aXRjaChiYWNrZ3JvdW5kQ2xpcCkge1xuICAgICAgY2FzZSBcImNvbnRlbnQtYm94XCI6XG4gICAgICBjYXNlIFwicGFkZGluZy1ib3hcIjpcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzBdLCByYWRpdXNbMV0sIGJvcmRlclBvaW50cy50b3BMZWZ0SW5uZXIsIGJvcmRlclBvaW50cy50b3BSaWdodElubmVyLCBib3VuZHMubGVmdCArIGJvcmRlcnNbM10ud2lkdGgsIGJvdW5kcy50b3AgKyBib3JkZXJzWzBdLndpZHRoKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzFdLCByYWRpdXNbMl0sIGJvcmRlclBvaW50cy50b3BSaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRJbm5lciwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggLSBib3JkZXJzWzFdLndpZHRoLCBib3VuZHMudG9wICsgYm9yZGVyc1swXS53aWR0aCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1syXSwgcmFkaXVzWzNdLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRJbm5lciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lciwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggLSBib3JkZXJzWzFdLndpZHRoLCBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCAtIGJvcmRlcnNbMl0ud2lkdGgpO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbM10sIHJhZGl1c1swXSwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lciwgYm9yZGVyUG9pbnRzLnRvcExlZnRJbm5lciwgYm91bmRzLmxlZnQgKyBib3JkZXJzWzNdLndpZHRoLCBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCAtIGJvcmRlcnNbMl0ud2lkdGgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzBdLCByYWRpdXNbMV0sIGJvcmRlclBvaW50cy50b3BMZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BSaWdodE91dGVyLCBib3VuZHMubGVmdCwgYm91bmRzLnRvcCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1sxXSwgcmFkaXVzWzJdLCBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0T3V0ZXIsIGJvdW5kcy5sZWZ0ICsgYm91bmRzLndpZHRoLCBib3VuZHMudG9wKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzJdLCByYWRpdXNbM10sIGJvcmRlclBvaW50cy5ib3R0b21SaWdodE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdE91dGVyLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCwgYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbM10sIHJhZGl1c1swXSwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcExlZnRPdXRlciwgYm91bmRzLmxlZnQsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvcmRlckFyZ3M7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUJvcmRlcnMoZWxlbWVudCwgYm91bmRzLCBib3JkZXJzKXtcbiAgICB2YXIgeCA9IGJvdW5kcy5sZWZ0LFxuICAgIHkgPSBib3VuZHMudG9wLFxuICAgIHdpZHRoID0gYm91bmRzLndpZHRoLFxuICAgIGhlaWdodCA9IGJvdW5kcy5oZWlnaHQsXG4gICAgYm9yZGVyU2lkZSxcbiAgICBieCxcbiAgICBieSxcbiAgICBidyxcbiAgICBiaCxcbiAgICBib3JkZXJBcmdzLFxuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtYmFja2dyb3VuZC8jdGhlLWJvcmRlci1yYWRpdXNcbiAgICBib3JkZXJSYWRpdXMgPSBnZXRCb3JkZXJSYWRpdXNEYXRhKGVsZW1lbnQpLFxuICAgIGJvcmRlclBvaW50cyA9IGNhbGN1bGF0ZUN1cnZlUG9pbnRzKGJvdW5kcywgYm9yZGVyUmFkaXVzLCBib3JkZXJzKSxcbiAgICBib3JkZXJEYXRhID0ge1xuICAgICAgY2xpcDogZ2V0Qm9yZGVyQ2xpcChlbGVtZW50LCBib3JkZXJQb2ludHMsIGJvcmRlcnMsIGJvcmRlclJhZGl1cywgYm91bmRzKSxcbiAgICAgIGJvcmRlcnM6IFtdXG4gICAgfTtcblxuICAgIGZvciAoYm9yZGVyU2lkZSA9IDA7IGJvcmRlclNpZGUgPCA0OyBib3JkZXJTaWRlKyspIHtcblxuICAgICAgaWYgKGJvcmRlcnNbYm9yZGVyU2lkZV0ud2lkdGggPiAwKSB7XG4gICAgICAgIGJ4ID0geDtcbiAgICAgICAgYnkgPSB5O1xuICAgICAgICBidyA9IHdpZHRoO1xuICAgICAgICBiaCA9IGhlaWdodCAtIChib3JkZXJzWzJdLndpZHRoKTtcblxuICAgICAgICBzd2l0Y2goYm9yZGVyU2lkZSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIC8vIHRvcCBib3JkZXJcbiAgICAgICAgICAgIGJoID0gYm9yZGVyc1swXS53aWR0aDtcblxuICAgICAgICAgICAgYm9yZGVyQXJncyA9IGRyYXdTaWRlKHtcbiAgICAgICAgICAgICAgYzE6IFtieCwgYnldLFxuICAgICAgICAgICAgICBjMjogW2J4ICsgYncsIGJ5XSxcbiAgICAgICAgICAgICAgYzM6IFtieCArIGJ3IC0gYm9yZGVyc1sxXS53aWR0aCwgYnkgKyBiaF0sXG4gICAgICAgICAgICAgIGM0OiBbYnggKyBib3JkZXJzWzNdLndpZHRoLCBieSArIGJoXVxuICAgICAgICAgICAgfSwgYm9yZGVyUmFkaXVzWzBdLCBib3JkZXJSYWRpdXNbMV0sXG4gICAgICAgICAgICBib3JkZXJQb2ludHMudG9wTGVmdE91dGVyLCBib3JkZXJQb2ludHMudG9wTGVmdElubmVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0SW5uZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgLy8gcmlnaHQgYm9yZGVyXG4gICAgICAgICAgICBieCA9IHggKyB3aWR0aCAtIChib3JkZXJzWzFdLndpZHRoKTtcbiAgICAgICAgICAgIGJ3ID0gYm9yZGVyc1sxXS53aWR0aDtcblxuICAgICAgICAgICAgYm9yZGVyQXJncyA9IGRyYXdTaWRlKHtcbiAgICAgICAgICAgICAgYzE6IFtieCArIGJ3LCBieV0sXG4gICAgICAgICAgICAgIGMyOiBbYnggKyBidywgYnkgKyBiaCArIGJvcmRlcnNbMl0ud2lkdGhdLFxuICAgICAgICAgICAgICBjMzogW2J4LCBieSArIGJoXSxcbiAgICAgICAgICAgICAgYzQ6IFtieCwgYnkgKyBib3JkZXJzWzBdLndpZHRoXVxuICAgICAgICAgICAgfSwgYm9yZGVyUmFkaXVzWzFdLCBib3JkZXJSYWRpdXNbMl0sXG4gICAgICAgICAgICBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0SW5uZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRJbm5lcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAvLyBib3R0b20gYm9yZGVyXG4gICAgICAgICAgICBieSA9IChieSArIGhlaWdodCkgLSAoYm9yZGVyc1syXS53aWR0aCk7XG4gICAgICAgICAgICBiaCA9IGJvcmRlcnNbMl0ud2lkdGg7XG5cbiAgICAgICAgICAgIGJvcmRlckFyZ3MgPSBkcmF3U2lkZSh7XG4gICAgICAgICAgICAgIGMxOiBbYnggKyBidywgYnkgKyBiaF0sXG4gICAgICAgICAgICAgIGMyOiBbYngsIGJ5ICsgYmhdLFxuICAgICAgICAgICAgICBjMzogW2J4ICsgYm9yZGVyc1szXS53aWR0aCwgYnldLFxuICAgICAgICAgICAgICBjNDogW2J4ICsgYncgLSBib3JkZXJzWzNdLndpZHRoLCBieV1cbiAgICAgICAgICAgIH0sIGJvcmRlclJhZGl1c1syXSwgYm9yZGVyUmFkaXVzWzNdLFxuICAgICAgICAgICAgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdElubmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIC8vIGxlZnQgYm9yZGVyXG4gICAgICAgICAgICBidyA9IGJvcmRlcnNbM10ud2lkdGg7XG5cbiAgICAgICAgICAgIGJvcmRlckFyZ3MgPSBkcmF3U2lkZSh7XG4gICAgICAgICAgICAgIGMxOiBbYngsIGJ5ICsgYmggKyBib3JkZXJzWzJdLndpZHRoXSxcbiAgICAgICAgICAgICAgYzI6IFtieCwgYnldLFxuICAgICAgICAgICAgICBjMzogW2J4ICsgYncsIGJ5ICsgYm9yZGVyc1swXS53aWR0aF0sXG4gICAgICAgICAgICAgIGM0OiBbYnggKyBidywgYnkgKyBiaF1cbiAgICAgICAgICAgIH0sIGJvcmRlclJhZGl1c1szXSwgYm9yZGVyUmFkaXVzWzBdLFxuICAgICAgICAgICAgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lciwgYm9yZGVyUG9pbnRzLnRvcExlZnRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcExlZnRJbm5lcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJvcmRlckRhdGEuYm9yZGVycy5wdXNoKHtcbiAgICAgICAgICBhcmdzOiBib3JkZXJBcmdzLFxuICAgICAgICAgIGNvbG9yOiBib3JkZXJzW2JvcmRlclNpZGVdLmNvbG9yXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvcmRlckRhdGE7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZShjdHgsIGFyZ3MpIHtcbiAgICB2YXIgc2hhcGUgPSBjdHguZHJhd1NoYXBlKCk7XG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGJvcmRlciwgaW5kZXgpIHtcbiAgICAgIHNoYXBlWyhpbmRleCA9PT0gMCkgPyBcIm1vdmVUb1wiIDogYm9yZGVyWzBdICsgXCJUb1wiIF0uYXBwbHkobnVsbCwgYm9yZGVyLnNsaWNlKDEpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2hhcGU7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJCb3JkZXJzKGN0eCwgYm9yZGVyQXJncywgY29sb3IpIHtcbiAgICBpZiAoY29sb3IgIT09IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgY3R4LnNldFZhcmlhYmxlKCBcImZpbGxTdHlsZVwiLCBjb2xvcik7XG4gICAgICBjcmVhdGVTaGFwZShjdHgsIGJvcmRlckFyZ3MpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIG51bURyYXdzKz0xO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckZvcm1WYWx1ZSAoZWwsIGJvdW5kcywgc3RhY2spe1xuXG4gICAgdmFyIHZhbHVlV3JhcCA9IGRvYy5jcmVhdGVFbGVtZW50KCd2YWx1ZXdyYXAnKSxcbiAgICBjc3NQcm9wZXJ0eUFycmF5ID0gWydsaW5lSGVpZ2h0JywndGV4dEFsaWduJywnZm9udEZhbWlseScsJ2NvbG9yJywnZm9udFNpemUnLCdwYWRkaW5nTGVmdCcsJ3BhZGRpbmdUb3AnLCd3aWR0aCcsJ2hlaWdodCcsJ2JvcmRlcicsJ2JvcmRlckxlZnRXaWR0aCcsJ2JvcmRlclRvcFdpZHRoJ10sXG4gICAgdGV4dFZhbHVlLFxuICAgIHRleHROb2RlO1xuXG4gICAgY3NzUHJvcGVydHlBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YWx1ZVdyYXAuc3R5bGVbcHJvcGVydHldID0gZ2V0Q1NTKGVsLCBwcm9wZXJ0eSk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgLy8gT2xkZXIgSUUgaGFzIGlzc3VlcyB3aXRoIFwiYm9yZGVyXCJcbiAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogUGFyc2U6IEV4Y2VwdGlvbiBjYXVnaHQgaW4gcmVuZGVyRm9ybVZhbHVlOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YWx1ZVdyYXAuc3R5bGUuYm9yZGVyQ29sb3IgPSBcImJsYWNrXCI7XG4gICAgdmFsdWVXcmFwLnN0eWxlLmJvcmRlclN0eWxlID0gXCJzb2xpZFwiO1xuICAgIHZhbHVlV3JhcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIHZhbHVlV3JhcC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblxuICAgIGlmICgvXihzdWJtaXR8cmVzZXR8YnV0dG9ufHRleHR8cGFzc3dvcmQpJC8udGVzdChlbC50eXBlKSB8fCBlbC5ub2RlTmFtZSA9PT0gXCJTRUxFQ1RcIil7XG4gICAgICB2YWx1ZVdyYXAuc3R5bGUubGluZUhlaWdodCA9IGdldENTUyhlbCwgXCJoZWlnaHRcIik7XG4gICAgfVxuXG4gICAgdmFsdWVXcmFwLnN0eWxlLnRvcCA9IGJvdW5kcy50b3AgKyBcInB4XCI7XG4gICAgdmFsdWVXcmFwLnN0eWxlLmxlZnQgPSBib3VuZHMubGVmdCArIFwicHhcIjtcblxuICAgIHRleHRWYWx1ZSA9IChlbC5ub2RlTmFtZSA9PT0gXCJTRUxFQ1RcIikgPyAoZWwub3B0aW9uc1tlbC5zZWxlY3RlZEluZGV4XSB8fCAwKS50ZXh0IDogZWwudmFsdWU7XG4gICAgaWYoIXRleHRWYWx1ZSkge1xuICAgICAgdGV4dFZhbHVlID0gZWwucGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgdGV4dE5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUodGV4dFZhbHVlKTtcblxuICAgIHZhbHVlV3JhcC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZCh2YWx1ZVdyYXApO1xuXG4gICAgcmVuZGVyVGV4dChlbCwgdGV4dE5vZGUsIHN0YWNrKTtcbiAgICBib2R5LnJlbW92ZUNoaWxkKHZhbHVlV3JhcCk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3SW1hZ2UgKGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UuYXBwbHkoY3R4LCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICBudW1EcmF3cys9MTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBzZXVkb0VsZW1lbnQoZWwsIHdoaWNoKSB7XG4gICAgdmFyIGVsU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgd2hpY2gpO1xuICAgIGlmKCFlbFN0eWxlIHx8ICFlbFN0eWxlLmNvbnRlbnQgfHwgZWxTdHlsZS5jb250ZW50ID09PSBcIm5vbmVcIiB8fCBlbFN0eWxlLmNvbnRlbnQgPT09IFwiLW1vei1hbHQtY29udGVudFwiIHx8IGVsU3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNvbnRlbnQgPSBlbFN0eWxlLmNvbnRlbnQgKyAnJyxcbiAgICBmaXJzdCA9IGNvbnRlbnQuc3Vic3RyKCAwLCAxICk7XG4gICAgLy9zdHJpcHMgcXVvdGVzXG4gICAgaWYoZmlyc3QgPT09IGNvbnRlbnQuc3Vic3RyKCBjb250ZW50Lmxlbmd0aCAtIDEgKSAmJiBmaXJzdC5tYXRjaCgvJ3xcIi8pKSB7XG4gICAgICBjb250ZW50ID0gY29udGVudC5zdWJzdHIoIDEsIGNvbnRlbnQubGVuZ3RoIC0gMiApO1xuICAgIH1cblxuICAgIHZhciBpc0ltYWdlID0gY29udGVudC5zdWJzdHIoIDAsIDMgKSA9PT0gJ3VybCcsXG4gICAgZWxwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIGlzSW1hZ2UgPyAnaW1nJyA6ICdzcGFuJyApO1xuXG4gICAgZWxwcy5jbGFzc05hbWUgPSBwc2V1ZG9IaWRlICsgXCItYmVmb3JlIFwiICsgcHNldWRvSGlkZSArIFwiLWFmdGVyXCI7XG5cbiAgICBPYmplY3Qua2V5cyhlbFN0eWxlKS5maWx0ZXIoaW5kZXhlZFByb3BlcnR5KS5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIC8vIFByZXZlbnQgYXNzaWduaW5nIG9mIHJlYWQgb25seSBDU1MgUnVsZXMsIGV4LiBsZW5ndGgsIHBhcmVudFJ1bGVcbiAgICAgIHRyeSB7XG4gICAgICAgIGVscHMuc3R5bGVbcHJvcF0gPSBlbFN0eWxlW3Byb3BdO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBVdGlsLmxvZyhbJ1RyaWVkIHRvIGFzc2lnbiByZWFkb25seSBwcm9wZXJ0eSAnLCBwcm9wLCAnRXJyb3I6JywgZV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYoaXNJbWFnZSkge1xuICAgICAgZWxwcy5zcmMgPSBVdGlsLnBhcnNlQmFja2dyb3VuZEltYWdlKGNvbnRlbnQpWzBdLmFyZ3NbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGVscHMuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuIGVscHM7XG4gIH1cblxuICBmdW5jdGlvbiBpbmRleGVkUHJvcGVydHkocHJvcGVydHkpIHtcbiAgICByZXR1cm4gKGlzTmFOKHdpbmRvdy5wYXJzZUludChwcm9wZXJ0eSwgMTApKSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbmplY3RQc2V1ZG9FbGVtZW50cyhlbCwgc3RhY2spIHtcbiAgICB2YXIgYmVmb3JlID0gZ2V0UHNldWRvRWxlbWVudChlbCwgJzpiZWZvcmUnKSxcbiAgICBhZnRlciA9IGdldFBzZXVkb0VsZW1lbnQoZWwsICc6YWZ0ZXInKTtcbiAgICBpZighYmVmb3JlICYmICFhZnRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKGJlZm9yZSkge1xuICAgICAgZWwuY2xhc3NOYW1lICs9IFwiIFwiICsgcHNldWRvSGlkZSArIFwiLWJlZm9yZVwiO1xuICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYmVmb3JlLCBlbCk7XG4gICAgICBwYXJzZUVsZW1lbnQoYmVmb3JlLCBzdGFjaywgdHJ1ZSk7XG4gICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJlZm9yZSk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShwc2V1ZG9IaWRlICsgXCItYmVmb3JlXCIsIFwiXCIpLnRyaW0oKTtcbiAgICB9XG5cbiAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSBcIiBcIiArIHBzZXVkb0hpZGUgKyBcIi1hZnRlclwiO1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoYWZ0ZXIpO1xuICAgICAgcGFyc2VFbGVtZW50KGFmdGVyLCBzdGFjaywgdHJ1ZSk7XG4gICAgICBlbC5yZW1vdmVDaGlsZChhZnRlcik7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShwc2V1ZG9IaWRlICsgXCItYWZ0ZXJcIiwgXCJcIikudHJpbSgpO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQmFja2dyb3VuZFJlcGVhdChjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIGJvdW5kcykge1xuICAgIHZhciBvZmZzZXRYID0gTWF0aC5yb3VuZChib3VuZHMubGVmdCArIGJhY2tncm91bmRQb3NpdGlvbi5sZWZ0KSxcbiAgICBvZmZzZXRZID0gTWF0aC5yb3VuZChib3VuZHMudG9wICsgYmFja2dyb3VuZFBvc2l0aW9uLnRvcCk7XG5cbiAgICBjdHguY3JlYXRlUGF0dGVybihpbWFnZSk7XG4gICAgY3R4LnRyYW5zbGF0ZShvZmZzZXRYLCBvZmZzZXRZKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC50cmFuc2xhdGUoLW9mZnNldFgsIC1vZmZzZXRZKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhY2tncm91bmRSZXBlYXRTaGFwZShjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIGJvdW5kcywgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBhcmdzLnB1c2goW1wibGluZVwiLCBNYXRoLnJvdW5kKGxlZnQpLCBNYXRoLnJvdW5kKHRvcCldKTtcbiAgICBhcmdzLnB1c2goW1wibGluZVwiLCBNYXRoLnJvdW5kKGxlZnQgKyB3aWR0aCksIE1hdGgucm91bmQodG9wKV0pO1xuICAgIGFyZ3MucHVzaChbXCJsaW5lXCIsIE1hdGgucm91bmQobGVmdCArIHdpZHRoKSwgTWF0aC5yb3VuZChoZWlnaHQgKyB0b3ApXSk7XG4gICAgYXJncy5wdXNoKFtcImxpbmVcIiwgTWF0aC5yb3VuZChsZWZ0KSwgTWF0aC5yb3VuZChoZWlnaHQgKyB0b3ApXSk7XG4gICAgY3JlYXRlU2hhcGUoY3R4LCBhcmdzKTtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5jbGlwKCk7XG4gICAgcmVuZGVyQmFja2dyb3VuZFJlcGVhdChjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIGJvdW5kcyk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJhY2tncm91bmRDb2xvcihjdHgsIGJhY2tncm91bmRCb3VuZHMsIGJnY29sb3IpIHtcbiAgICByZW5kZXJSZWN0KFxuICAgICAgY3R4LFxuICAgICAgYmFja2dyb3VuZEJvdW5kcy5sZWZ0LFxuICAgICAgYmFja2dyb3VuZEJvdW5kcy50b3AsXG4gICAgICBiYWNrZ3JvdW5kQm91bmRzLndpZHRoLFxuICAgICAgYmFja2dyb3VuZEJvdW5kcy5oZWlnaHQsXG4gICAgICBiZ2NvbG9yXG4gICAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQmFja2dyb3VuZFJlcGVhdGluZyhlbCwgYm91bmRzLCBjdHgsIGltYWdlLCBpbWFnZUluZGV4KSB7XG4gICAgdmFyIGJhY2tncm91bmRTaXplID0gVXRpbC5CYWNrZ3JvdW5kU2l6ZShlbCwgYm91bmRzLCBpbWFnZSwgaW1hZ2VJbmRleCksXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uID0gVXRpbC5CYWNrZ3JvdW5kUG9zaXRpb24oZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXgsIGJhY2tncm91bmRTaXplKSxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0ID0gZ2V0Q1NTKGVsLCBcImJhY2tncm91bmRSZXBlYXRcIikuc3BsaXQoXCIsXCIpLm1hcChVdGlsLnRyaW1UZXh0KTtcblxuICAgIGltYWdlID0gcmVzaXplSW1hZ2UoaW1hZ2UsIGJhY2tncm91bmRTaXplKTtcblxuICAgIGJhY2tncm91bmRSZXBlYXQgPSBiYWNrZ3JvdW5kUmVwZWF0W2ltYWdlSW5kZXhdIHx8IGJhY2tncm91bmRSZXBlYXRbMF07XG5cbiAgICBzd2l0Y2ggKGJhY2tncm91bmRSZXBlYXQpIHtcbiAgICAgIGNhc2UgXCJyZXBlYXQteFwiOlxuICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0U2hhcGUoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCBib3VuZHMsXG4gICAgICAgICAgYm91bmRzLmxlZnQsIGJvdW5kcy50b3AgKyBiYWNrZ3JvdW5kUG9zaXRpb24udG9wLCA5OTk5OSwgaW1hZ2UuaGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJyZXBlYXQteVwiOlxuICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0U2hhcGUoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCBib3VuZHMsXG4gICAgICAgICAgYm91bmRzLmxlZnQgKyBiYWNrZ3JvdW5kUG9zaXRpb24ubGVmdCwgYm91bmRzLnRvcCwgaW1hZ2Uud2lkdGgsIDk5OTk5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJuby1yZXBlYXRcIjpcbiAgICAgICAgYmFja2dyb3VuZFJlcGVhdFNoYXBlKGN0eCwgaW1hZ2UsIGJhY2tncm91bmRQb3NpdGlvbiwgYm91bmRzLFxuICAgICAgICAgIGJvdW5kcy5sZWZ0ICsgYmFja2dyb3VuZFBvc2l0aW9uLmxlZnQsIGJvdW5kcy50b3AgKyBiYWNrZ3JvdW5kUG9zaXRpb24udG9wLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlbmRlckJhY2tncm91bmRSZXBlYXQoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCB7XG4gICAgICAgICAgdG9wOiBib3VuZHMudG9wLFxuICAgICAgICAgIGxlZnQ6IGJvdW5kcy5sZWZ0LFxuICAgICAgICAgIHdpZHRoOiBpbWFnZS53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGltYWdlLmhlaWdodFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQmFja2dyb3VuZEltYWdlKGVsZW1lbnQsIGJvdW5kcywgY3R4KSB7XG4gICAgdmFyIGJhY2tncm91bmRJbWFnZSA9IGdldENTUyhlbGVtZW50LCBcImJhY2tncm91bmRJbWFnZVwiKSxcbiAgICBiYWNrZ3JvdW5kSW1hZ2VzID0gVXRpbC5wYXJzZUJhY2tncm91bmRJbWFnZShiYWNrZ3JvdW5kSW1hZ2UpLFxuICAgIGltYWdlLFxuICAgIGltYWdlSW5kZXggPSBiYWNrZ3JvdW5kSW1hZ2VzLmxlbmd0aDtcblxuICAgIHdoaWxlKGltYWdlSW5kZXgtLSkge1xuICAgICAgYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZEltYWdlc1tpbWFnZUluZGV4XTtcblxuICAgICAgaWYgKCFiYWNrZ3JvdW5kSW1hZ2UuYXJncyB8fCBiYWNrZ3JvdW5kSW1hZ2UuYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBrZXkgPSBiYWNrZ3JvdW5kSW1hZ2UubWV0aG9kID09PSAndXJsJyA/XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2UuYXJnc1swXSA6XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2UudmFsdWU7XG5cbiAgICAgIGltYWdlID0gbG9hZEltYWdlKGtleSk7XG5cbiAgICAgIC8vIFRPRE8gYWRkIHN1cHBvcnQgZm9yIGJhY2tncm91bmQtb3JpZ2luXG4gICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgcmVuZGVyQmFja2dyb3VuZFJlcGVhdGluZyhlbGVtZW50LCBib3VuZHMsIGN0eCwgaW1hZ2UsIGltYWdlSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogRXJyb3IgbG9hZGluZyBiYWNrZ3JvdW5kOlwiLCBiYWNrZ3JvdW5kSW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2l6ZUltYWdlKGltYWdlLCBib3VuZHMpIHtcbiAgICBpZihpbWFnZS53aWR0aCA9PT0gYm91bmRzLndpZHRoICYmIGltYWdlLmhlaWdodCA9PT0gYm91bmRzLmhlaWdodCkge1xuICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH1cblxuICAgIHZhciBjdHgsIGNhbnZhcyA9IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBib3VuZHMud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGJvdW5kcy5oZWlnaHQ7XG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBkcmF3SW1hZ2UoY3R4LCBpbWFnZSwgMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCwgMCwgMCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0ICk7XG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE9wYWNpdHkoY3R4LCBlbGVtZW50LCBwYXJlbnRTdGFjaykge1xuICAgIHJldHVybiBjdHguc2V0VmFyaWFibGUoXCJnbG9iYWxBbHBoYVwiLCBnZXRDU1MoZWxlbWVudCwgXCJvcGFjaXR5XCIpICogKChwYXJlbnRTdGFjaykgPyBwYXJlbnRTdGFjay5vcGFjaXR5IDogMSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUHgoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKFwicHhcIiwgXCJcIik7XG4gIH1cblxuICB2YXIgdHJhbnNmb3JtUmVnRXhwID0gLyhtYXRyaXgpXFwoKC4rKVxcKS87XG5cbiAgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKGVsZW1lbnQsIHBhcmVudFN0YWNrKSB7XG4gICAgdmFyIHRyYW5zZm9ybSA9IGdldENTUyhlbGVtZW50LCBcInRyYW5zZm9ybVwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItd2Via2l0LXRyYW5zZm9ybVwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItbW96LXRyYW5zZm9ybVwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItbXMtdHJhbnNmb3JtXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi1vLXRyYW5zZm9ybVwiKTtcbiAgICB2YXIgdHJhbnNmb3JtT3JpZ2luID0gZ2V0Q1NTKGVsZW1lbnQsIFwidHJhbnNmb3JtLW9yaWdpblwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItd2Via2l0LXRyYW5zZm9ybS1vcmlnaW5cIikgfHwgZ2V0Q1NTKGVsZW1lbnQsIFwiLW1vei10cmFuc2Zvcm0tb3JpZ2luXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi1tcy10cmFuc2Zvcm0tb3JpZ2luXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi1vLXRyYW5zZm9ybS1vcmlnaW5cIikgfHwgXCIwcHggMHB4XCI7XG5cbiAgICB0cmFuc2Zvcm1PcmlnaW4gPSB0cmFuc2Zvcm1PcmlnaW4uc3BsaXQoXCIgXCIpLm1hcChyZW1vdmVQeCkubWFwKFV0aWwuYXNGbG9hdCk7XG5cbiAgICB2YXIgbWF0cml4O1xuICAgIGlmICh0cmFuc2Zvcm0gJiYgdHJhbnNmb3JtICE9PSBcIm5vbmVcIikge1xuICAgICAgdmFyIG1hdGNoID0gdHJhbnNmb3JtLm1hdGNoKHRyYW5zZm9ybVJlZ0V4cCk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgc3dpdGNoKG1hdGNoWzFdKSB7XG4gICAgICAgICAgY2FzZSBcIm1hdHJpeFwiOlxuICAgICAgICAgICAgbWF0cml4ID0gbWF0Y2hbMl0uc3BsaXQoXCIsXCIpLm1hcChVdGlsLnRyaW1UZXh0KS5tYXAoVXRpbC5hc0Zsb2F0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG9yaWdpbjogdHJhbnNmb3JtT3JpZ2luLFxuICAgICAgbWF0cml4OiBtYXRyaXhcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RhY2soZWxlbWVudCwgcGFyZW50U3RhY2ssIGJvdW5kcywgdHJhbnNmb3JtKSB7XG4gICAgdmFyIGN0eCA9IGgyY1JlbmRlckNvbnRleHQoKCFwYXJlbnRTdGFjaykgPyBkb2N1bWVudFdpZHRoKCkgOiBib3VuZHMud2lkdGggLCAoIXBhcmVudFN0YWNrKSA/IGRvY3VtZW50SGVpZ2h0KCkgOiBib3VuZHMuaGVpZ2h0KSxcbiAgICBzdGFjayA9IHtcbiAgICAgIGN0eDogY3R4LFxuICAgICAgb3BhY2l0eTogc2V0T3BhY2l0eShjdHgsIGVsZW1lbnQsIHBhcmVudFN0YWNrKSxcbiAgICAgIGNzc1Bvc2l0aW9uOiBnZXRDU1MoZWxlbWVudCwgXCJwb3NpdGlvblwiKSxcbiAgICAgIGJvcmRlcnM6IGdldEJvcmRlckRhdGEoZWxlbWVudCksXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgIGNsaXA6IChwYXJlbnRTdGFjayAmJiBwYXJlbnRTdGFjay5jbGlwKSA/IFV0aWwuRXh0ZW5kKCB7fSwgcGFyZW50U3RhY2suY2xpcCApIDogbnVsbFxuICAgIH07XG5cbiAgICBzZXRaKGVsZW1lbnQsIHN0YWNrLCBwYXJlbnRTdGFjayk7XG5cbiAgICAvLyBUT0RPIGNvcnJlY3Qgb3ZlcmZsb3cgZm9yIGFic29sdXRlIGNvbnRlbnQgcmVzaWRpbmcgdW5kZXIgYSBzdGF0aWMgcG9zaXRpb25cbiAgICBpZiAob3B0aW9ucy51c2VPdmVyZmxvdyA9PT0gdHJ1ZSAmJiAvKGhpZGRlbnxzY3JvbGx8YXV0bykvLnRlc3QoZ2V0Q1NTKGVsZW1lbnQsIFwib3ZlcmZsb3dcIikpID09PSB0cnVlICYmIC8oQk9EWSkvaS50ZXN0KGVsZW1lbnQubm9kZU5hbWUpID09PSBmYWxzZSl7XG4gICAgICBzdGFjay5jbGlwID0gKHN0YWNrLmNsaXApID8gY2xpcEJvdW5kcyhzdGFjay5jbGlwLCBib3VuZHMpIDogYm91bmRzO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFjaztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJhY2tncm91bmRCb3VuZHMoYm9yZGVycywgYm91bmRzLCBjbGlwKSB7XG4gICAgdmFyIGJhY2tncm91bmRCb3VuZHMgPSB7XG4gICAgICBsZWZ0OiBib3VuZHMubGVmdCArIGJvcmRlcnNbM10ud2lkdGgsXG4gICAgICB0b3A6IGJvdW5kcy50b3AgKyBib3JkZXJzWzBdLndpZHRoLFxuICAgICAgd2lkdGg6IGJvdW5kcy53aWR0aCAtIChib3JkZXJzWzFdLndpZHRoICsgYm9yZGVyc1szXS53aWR0aCksXG4gICAgICBoZWlnaHQ6IGJvdW5kcy5oZWlnaHQgLSAoYm9yZGVyc1swXS53aWR0aCArIGJvcmRlcnNbMl0ud2lkdGgpXG4gICAgfTtcblxuICAgIGlmIChjbGlwKSB7XG4gICAgICBiYWNrZ3JvdW5kQm91bmRzID0gY2xpcEJvdW5kcyhiYWNrZ3JvdW5kQm91bmRzLCBjbGlwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmFja2dyb3VuZEJvdW5kcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvdW5kcyhlbGVtZW50LCB0cmFuc2Zvcm0pIHtcbiAgICB2YXIgYm91bmRzID0gKHRyYW5zZm9ybS5tYXRyaXgpID8gVXRpbC5PZmZzZXRCb3VuZHMoZWxlbWVudCkgOiBVdGlsLkJvdW5kcyhlbGVtZW50KTtcbiAgICB0cmFuc2Zvcm0ub3JpZ2luWzBdICs9IGJvdW5kcy5sZWZ0O1xuICAgIHRyYW5zZm9ybS5vcmlnaW5bMV0gKz0gYm91bmRzLnRvcDtcbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRWxlbWVudChlbGVtZW50LCBwYXJlbnRTdGFjaywgcHNldWRvRWxlbWVudCwgaWdub3JlQmFja2dyb3VuZCkge1xuICAgIHZhciB0cmFuc2Zvcm0gPSBnZXRUcmFuc2Zvcm0oZWxlbWVudCwgcGFyZW50U3RhY2spLFxuICAgIGJvdW5kcyA9IGdldEJvdW5kcyhlbGVtZW50LCB0cmFuc2Zvcm0pLFxuICAgIGltYWdlLFxuICAgIHN0YWNrID0gY3JlYXRlU3RhY2soZWxlbWVudCwgcGFyZW50U3RhY2ssIGJvdW5kcywgdHJhbnNmb3JtKSxcbiAgICBib3JkZXJzID0gc3RhY2suYm9yZGVycyxcbiAgICBjdHggPSBzdGFjay5jdHgsXG4gICAgYmFja2dyb3VuZEJvdW5kcyA9IGdldEJhY2tncm91bmRCb3VuZHMoYm9yZGVycywgYm91bmRzLCBzdGFjay5jbGlwKSxcbiAgICBib3JkZXJEYXRhID0gcGFyc2VCb3JkZXJzKGVsZW1lbnQsIGJvdW5kcywgYm9yZGVycyksXG4gICAgYmFja2dyb3VuZENvbG9yID0gKGlnbm9yZUVsZW1lbnRzUmVnRXhwLnRlc3QoZWxlbWVudC5ub2RlTmFtZSkpID8gXCIjZWZlZmVmXCIgOiBnZXRDU1MoZWxlbWVudCwgXCJiYWNrZ3JvdW5kQ29sb3JcIik7XG5cblxuICAgIGNyZWF0ZVNoYXBlKGN0eCwgYm9yZGVyRGF0YS5jbGlwKTtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmNsaXAoKTtcblxuICAgIGlmIChiYWNrZ3JvdW5kQm91bmRzLmhlaWdodCA+IDAgJiYgYmFja2dyb3VuZEJvdW5kcy53aWR0aCA+IDAgJiYgIWlnbm9yZUJhY2tncm91bmQpIHtcbiAgICAgIHJlbmRlckJhY2tncm91bmRDb2xvcihjdHgsIGJvdW5kcywgYmFja2dyb3VuZENvbG9yKTtcbiAgICAgIHJlbmRlckJhY2tncm91bmRJbWFnZShlbGVtZW50LCBiYWNrZ3JvdW5kQm91bmRzLCBjdHgpO1xuICAgIH0gZWxzZSBpZiAoaWdub3JlQmFja2dyb3VuZCkge1xuICAgICAgc3RhY2suYmFja2dyb3VuZENvbG9yID0gIGJhY2tncm91bmRDb2xvcjtcbiAgICB9XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgYm9yZGVyRGF0YS5ib3JkZXJzLmZvckVhY2goZnVuY3Rpb24oYm9yZGVyKSB7XG4gICAgICByZW5kZXJCb3JkZXJzKGN0eCwgYm9yZGVyLmFyZ3MsIGJvcmRlci5jb2xvcik7XG4gICAgfSk7XG5cbiAgICBpZiAoIXBzZXVkb0VsZW1lbnQpIHtcbiAgICAgIGluamVjdFBzZXVkb0VsZW1lbnRzKGVsZW1lbnQsIHN0YWNrKTtcbiAgICB9XG5cbiAgICBzd2l0Y2goZWxlbWVudC5ub2RlTmFtZSl7XG4gICAgICBjYXNlIFwiSU1HXCI6XG4gICAgICAgIGlmICgoaW1hZ2UgPSBsb2FkSW1hZ2UoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSkpIHtcbiAgICAgICAgICByZW5kZXJJbWFnZShjdHgsIGVsZW1lbnQsIGltYWdlLCBib3VuZHMsIGJvcmRlcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IEVycm9yIGxvYWRpbmcgPGltZz46XCIgKyBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIklOUFVUXCI6XG4gICAgICAgIC8vIFRPRE8gYWRkIGFsbCByZWxldmFudCB0eXBlJ3MsIGkuZS4gSFRNTDUgbmV3IHN0dWZmXG4gICAgICAgIC8vIHRvZG8gYWRkIHN1cHBvcnQgZm9yIHBsYWNlaG9sZGVyIGF0dHJpYnV0ZSBmb3IgYnJvd3NlcnMgd2hpY2ggc3VwcG9ydCBpdFxuICAgICAgICBpZiAoL14odGV4dHx1cmx8ZW1haWx8c3VibWl0fGJ1dHRvbnxyZXNldCkkLy50ZXN0KGVsZW1lbnQudHlwZSkgJiYgKGVsZW1lbnQudmFsdWUgfHwgZWxlbWVudC5wbGFjZWhvbGRlciB8fCBcIlwiKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICByZW5kZXJGb3JtVmFsdWUoZWxlbWVudCwgYm91bmRzLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiVEVYVEFSRUFcIjpcbiAgICAgICAgaWYgKChlbGVtZW50LnZhbHVlIHx8IGVsZW1lbnQucGxhY2Vob2xkZXIgfHwgXCJcIikubGVuZ3RoID4gMCl7XG4gICAgICAgICAgcmVuZGVyRm9ybVZhbHVlKGVsZW1lbnQsIGJvdW5kcywgc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlNFTEVDVFwiOlxuICAgICAgICBpZiAoKGVsZW1lbnQub3B0aW9uc3x8ZWxlbWVudC5wbGFjZWhvbGRlciB8fCBcIlwiKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICByZW5kZXJGb3JtVmFsdWUoZWxlbWVudCwgYm91bmRzLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiTElcIjpcbiAgICAgICAgcmVuZGVyTGlzdEl0ZW0oZWxlbWVudCwgc3RhY2ssIGJhY2tncm91bmRCb3VuZHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJDQU5WQVNcIjpcbiAgICAgICAgcmVuZGVySW1hZ2UoY3R4LCBlbGVtZW50LCBlbGVtZW50LCBib3VuZHMsIGJvcmRlcnMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH1cblxuICBmdW5jdGlvbiBpc0VsZW1lbnRWaXNpYmxlKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gKGdldENTUyhlbGVtZW50LCAnZGlzcGxheScpICE9PSBcIm5vbmVcIiAmJiBnZXRDU1MoZWxlbWVudCwgJ3Zpc2liaWxpdHknKSAhPT0gXCJoaWRkZW5cIiAmJiAhZWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJkYXRhLWh0bWwyY2FudmFzLWlnbm9yZVwiKSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUVsZW1lbnQgKGVsZW1lbnQsIHN0YWNrLCBwc2V1ZG9FbGVtZW50KSB7XG4gICAgaWYgKGlzRWxlbWVudFZpc2libGUoZWxlbWVudCkpIHtcbiAgICAgIHN0YWNrID0gcmVuZGVyRWxlbWVudChlbGVtZW50LCBzdGFjaywgcHNldWRvRWxlbWVudCwgZmFsc2UpIHx8IHN0YWNrO1xuICAgICAgaWYgKCFpZ25vcmVFbGVtZW50c1JlZ0V4cC50ZXN0KGVsZW1lbnQubm9kZU5hbWUpKSB7XG4gICAgICAgIHBhcnNlQ2hpbGRyZW4oZWxlbWVudCwgc3RhY2ssIHBzZXVkb0VsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQ2hpbGRyZW4oZWxlbWVudCwgc3RhY2ssIHBzZXVkb0VsZW1lbnQpIHtcbiAgICBVdGlsLkNoaWxkcmVuKGVsZW1lbnQpLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgIHBhcnNlRWxlbWVudChub2RlLCBzdGFjaywgcHNldWRvRWxlbWVudCk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgIHJlbmRlclRleHQoZWxlbWVudCwgbm9kZSwgc3RhY2spO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgYmFja2dyb3VuZCA9IGdldENTUyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIFwiYmFja2dyb3VuZENvbG9yXCIpLFxuICAgICAgdHJhbnNwYXJlbnRCYWNrZ3JvdW5kID0gKFV0aWwuaXNUcmFuc3BhcmVudChiYWNrZ3JvdW5kKSAmJiBlbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSxcbiAgICAgIHN0YWNrID0gcmVuZGVyRWxlbWVudChlbGVtZW50LCBudWxsLCBmYWxzZSwgdHJhbnNwYXJlbnRCYWNrZ3JvdW5kKTtcbiAgICBwYXJzZUNoaWxkcmVuKGVsZW1lbnQsIHN0YWNrKTtcblxuICAgIGlmICh0cmFuc3BhcmVudEJhY2tncm91bmQpIHtcbiAgICAgIGJhY2tncm91bmQgPSBzdGFjay5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuXG4gICAgYm9keS5yZW1vdmVDaGlsZChoaWRlUHNldWRvRWxlbWVudHMpO1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmQsXG4gICAgICBzdGFjazogc3RhY2tcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGluaXQoKTtcbn07XG5cbmZ1bmN0aW9uIGgyY3pDb250ZXh0KHppbmRleCkge1xuICByZXR1cm4ge1xuICAgIHppbmRleDogemluZGV4LFxuICAgIGNoaWxkcmVuOiBbXVxuICB9O1xufVxuXG5faHRtbDJjYW52YXMuUHJlbG9hZCA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG4gIHZhciBpbWFnZXMgPSB7XG4gICAgbnVtTG9hZGVkOiAwLCAgIC8vIGFsc28gZmFpbGVkIGFyZSBjb3VudGVkIGhlcmVcbiAgICBudW1GYWlsZWQ6IDAsXG4gICAgbnVtVG90YWw6IDAsXG4gICAgY2xlYW51cERvbmU6IGZhbHNlXG4gIH0sXG4gIHBhZ2VPcmlnaW4sXG4gIFV0aWwgPSBfaHRtbDJjYW52YXMuVXRpbCxcbiAgbWV0aG9kcyxcbiAgaSxcbiAgY291bnQgPSAwLFxuICBlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50c1swXSB8fCBkb2N1bWVudC5ib2R5LFxuICBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQsXG4gIGRvbUltYWdlcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpLCAvLyBGZXRjaCBpbWFnZXMgb2YgdGhlIHByZXNlbnQgZWxlbWVudCBvbmx5XG4gIGltZ0xlbiA9IGRvbUltYWdlcy5sZW5ndGgsXG4gIGxpbmsgPSBkb2MuY3JlYXRlRWxlbWVudChcImFcIiksXG4gIHN1cHBvcnRDT1JTID0gKGZ1bmN0aW9uKCBpbWcgKXtcbiAgICByZXR1cm4gKGltZy5jcm9zc09yaWdpbiAhPT0gdW5kZWZpbmVkKTtcbiAgfSkobmV3IEltYWdlKCkpLFxuICB0aW1lb3V0VGltZXI7XG5cbiAgbGluay5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIHBhZ2VPcmlnaW4gID0gbGluay5wcm90b2NvbCArIGxpbmsuaG9zdDtcblxuICBmdW5jdGlvbiBpc1NhbWVPcmlnaW4odXJsKXtcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgbGluay5ocmVmID0gbGluay5ocmVmOyAvLyBZRVMsIEJFTElFVkUgSVQgT1IgTk9ULCB0aGF0IGlzIHJlcXVpcmVkIGZvciBJRTkgLSBodHRwOi8vanNmaWRkbGUubmV0L25pa2xhc3ZoLzJlNDhiL1xuICAgIHZhciBvcmlnaW4gPSBsaW5rLnByb3RvY29sICsgbGluay5ob3N0O1xuICAgIHJldHVybiAob3JpZ2luID09PSBwYWdlT3JpZ2luKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KCl7XG4gICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogc3RhcnQ6IGltYWdlczogXCIgKyBpbWFnZXMubnVtTG9hZGVkICsgXCIgLyBcIiArIGltYWdlcy5udW1Ub3RhbCArIFwiIChmYWlsZWQ6IFwiICsgaW1hZ2VzLm51bUZhaWxlZCArIFwiKVwiKTtcbiAgICBpZiAoIWltYWdlcy5maXJzdFJ1biAmJiBpbWFnZXMubnVtTG9hZGVkID49IGltYWdlcy5udW1Ub3RhbCl7XG4gICAgICBVdGlsLmxvZyhcIkZpbmlzaGVkIGxvYWRpbmcgaW1hZ2VzOiAjIFwiICsgaW1hZ2VzLm51bVRvdGFsICsgXCIgKGZhaWxlZDogXCIgKyBpbWFnZXMubnVtRmFpbGVkICsgXCIpXCIpO1xuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY29tcGxldGUgPT09IFwiZnVuY3Rpb25cIil7XG4gICAgICAgIG9wdGlvbnMuY29tcGxldGUoaW1hZ2VzKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8gbW9kaWZ5IHByb3h5IHRvIHNlcnZlIGltYWdlcyB3aXRoIENPUlMgZW5hYmxlZCwgd2hlcmUgYXZhaWxhYmxlXG4gIGZ1bmN0aW9uIHByb3h5R2V0SW1hZ2UodXJsLCBpbWcsIGltYWdlT2JqKXtcbiAgICB2YXIgY2FsbGJhY2tfbmFtZSxcbiAgICBzY3JpcHRVcmwgPSBvcHRpb25zLnByb3h5LFxuICAgIHNjcmlwdDtcblxuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICB1cmwgPSBsaW5rLmhyZWY7IC8vIHdvcmsgYXJvdW5kIGZvciBwYWdlcyB3aXRoIGJhc2UgaHJlZj1cIlwiIHNldCAtIFdBUk5JTkc6IHRoaXMgbWF5IGNoYW5nZSB0aGUgdXJsXG5cbiAgICBjYWxsYmFja19uYW1lID0gJ2h0bWwyY2FudmFzXycgKyAoY291bnQrKyk7XG4gICAgaW1hZ2VPYmouY2FsbGJhY2tuYW1lID0gY2FsbGJhY2tfbmFtZTtcblxuICAgIGlmIChzY3JpcHRVcmwuaW5kZXhPZihcIj9cIikgPiAtMSkge1xuICAgICAgc2NyaXB0VXJsICs9IFwiJlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY3JpcHRVcmwgKz0gXCI/XCI7XG4gICAgfVxuICAgIHNjcmlwdFVybCArPSAndXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKSArICcmY2FsbGJhY2s9JyArIGNhbGxiYWNrX25hbWU7XG4gICAgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG5cbiAgICB3aW5kb3dbY2FsbGJhY2tfbmFtZV0gPSBmdW5jdGlvbihhKXtcbiAgICAgIGlmIChhLnN1YnN0cmluZygwLDYpID09PSBcImVycm9yOlwiKXtcbiAgICAgICAgaW1hZ2VPYmouc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICAgIGltYWdlcy5udW1Mb2FkZWQrKztcbiAgICAgICAgaW1hZ2VzLm51bUZhaWxlZCsrO1xuICAgICAgICBzdGFydCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SW1hZ2VMb2FkSGFuZGxlcnMoaW1nLCBpbWFnZU9iaik7XG4gICAgICAgIGltZy5zcmMgPSBhO1xuICAgICAgfVxuICAgICAgd2luZG93W2NhbGxiYWNrX25hbWVdID0gdW5kZWZpbmVkOyAvLyB0byB3b3JrIHdpdGggSUU8OSAgLy8gTk9URTogdGhhdCB0aGUgdW5kZWZpbmVkIGNhbGxiYWNrIHByb3BlcnR5LW5hbWUgc3RpbGwgZXhpc3RzIG9uIHRoZSB3aW5kb3cgb2JqZWN0IChmb3IgSUU8OSlcbiAgICAgIHRyeSB7XG4gICAgICAgIGRlbGV0ZSB3aW5kb3dbY2FsbGJhY2tfbmFtZV07ICAvLyBmb3IgYWxsIGJyb3dzZXIgdGhhdCBzdXBwb3J0IHRoaXNcbiAgICAgIH0gY2F0Y2goZXgpIHt9XG4gICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgIGRlbGV0ZSBpbWFnZU9iai5zY3JpcHQ7XG4gICAgICBkZWxldGUgaW1hZ2VPYmouY2FsbGJhY2tuYW1lO1xuICAgIH07XG5cbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKTtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNjcmlwdFVybCk7XG4gICAgaW1hZ2VPYmouc2NyaXB0ID0gc2NyaXB0O1xuICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRQc2V1ZG9FbGVtZW50KGVsZW1lbnQsIHR5cGUpIHtcbiAgICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCB0eXBlKSxcbiAgICBjb250ZW50ID0gc3R5bGUuY29udGVudDtcbiAgICBpZiAoY29udGVudC5zdWJzdHIoMCwgMykgPT09ICd1cmwnKSB7XG4gICAgICBtZXRob2RzLmxvYWRJbWFnZShfaHRtbDJjYW52YXMuVXRpbC5wYXJzZUJhY2tncm91bmRJbWFnZShjb250ZW50KVswXS5hcmdzWzBdKTtcbiAgICB9XG4gICAgbG9hZEJhY2tncm91bmRJbWFnZXMoc3R5bGUuYmFja2dyb3VuZEltYWdlLCBlbGVtZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRQc2V1ZG9FbGVtZW50SW1hZ2VzKGVsZW1lbnQpIHtcbiAgICBsb2FkUHNldWRvRWxlbWVudChlbGVtZW50LCBcIjpiZWZvcmVcIik7XG4gICAgbG9hZFBzZXVkb0VsZW1lbnQoZWxlbWVudCwgXCI6YWZ0ZXJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkR3JhZGllbnRJbWFnZShiYWNrZ3JvdW5kSW1hZ2UsIGJvdW5kcykge1xuICAgIHZhciBpbWcgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUuR3JhZGllbnQoYmFja2dyb3VuZEltYWdlLCBib3VuZHMpO1xuXG4gICAgaWYgKGltZyAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIGltYWdlc1tiYWNrZ3JvdW5kSW1hZ2VdID0ge1xuICAgICAgICBpbWc6IGltZyxcbiAgICAgICAgc3VjY2VlZGVkOiB0cnVlXG4gICAgICB9O1xuICAgICAgaW1hZ2VzLm51bVRvdGFsKys7XG4gICAgICBpbWFnZXMubnVtTG9hZGVkKys7XG4gICAgICBzdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGludmFsaWRCYWNrZ3JvdW5kcyhiYWNrZ3JvdW5kX2ltYWdlKSB7XG4gICAgcmV0dXJuIChiYWNrZ3JvdW5kX2ltYWdlICYmIGJhY2tncm91bmRfaW1hZ2UubWV0aG9kICYmIGJhY2tncm91bmRfaW1hZ2UuYXJncyAmJiBiYWNrZ3JvdW5kX2ltYWdlLmFyZ3MubGVuZ3RoID4gMCApO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZEJhY2tncm91bmRJbWFnZXMoYmFja2dyb3VuZF9pbWFnZSwgZWwpIHtcbiAgICB2YXIgYm91bmRzO1xuXG4gICAgX2h0bWwyY2FudmFzLlV0aWwucGFyc2VCYWNrZ3JvdW5kSW1hZ2UoYmFja2dyb3VuZF9pbWFnZSkuZmlsdGVyKGludmFsaWRCYWNrZ3JvdW5kcykuZm9yRWFjaChmdW5jdGlvbihiYWNrZ3JvdW5kX2ltYWdlKSB7XG4gICAgICBpZiAoYmFja2dyb3VuZF9pbWFnZS5tZXRob2QgPT09ICd1cmwnKSB7XG4gICAgICAgIG1ldGhvZHMubG9hZEltYWdlKGJhY2tncm91bmRfaW1hZ2UuYXJnc1swXSk7XG4gICAgICB9IGVsc2UgaWYoYmFja2dyb3VuZF9pbWFnZS5tZXRob2QubWF0Y2goL1xcLT9ncmFkaWVudCQvKSkge1xuICAgICAgICBpZihib3VuZHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJvdW5kcyA9IF9odG1sMmNhbnZhcy5VdGlsLkJvdW5kcyhlbCk7XG4gICAgICAgIH1cbiAgICAgICAgbG9hZEdyYWRpZW50SW1hZ2UoYmFja2dyb3VuZF9pbWFnZS52YWx1ZSwgYm91bmRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEltYWdlcyAoZWwpIHtcbiAgICB2YXIgZWxOb2RlVHlwZSA9IGZhbHNlO1xuXG4gICAgLy8gRmlyZWZveCBmYWlscyB3aXRoIHBlcm1pc3Npb24gZGVuaWVkIG9uIHBhZ2VzIHdpdGggaWZyYW1lc1xuICAgIHRyeSB7XG4gICAgICBVdGlsLkNoaWxkcmVuKGVsKS5mb3JFYWNoKGdldEltYWdlcyk7XG4gICAgfVxuICAgIGNhdGNoKCBlICkge31cblxuICAgIHRyeSB7XG4gICAgICBlbE5vZGVUeXBlID0gZWwubm9kZVR5cGU7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGVsTm9kZVR5cGUgPSBmYWxzZTtcbiAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IGZhaWxlZCB0byBhY2Nlc3Mgc29tZSBlbGVtZW50J3Mgbm9kZVR5cGUgLSBFeGNlcHRpb246IFwiICsgZXgubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaWYgKGVsTm9kZVR5cGUgPT09IDEgfHwgZWxOb2RlVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsb2FkUHNldWRvRWxlbWVudEltYWdlcyhlbCk7XG4gICAgICB0cnkge1xuICAgICAgICBsb2FkQmFja2dyb3VuZEltYWdlcyhVdGlsLmdldENTUyhlbCwgJ2JhY2tncm91bmRJbWFnZScpLCBlbCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogZmFpbGVkIHRvIGdldCBiYWNrZ3JvdW5kLWltYWdlIC0gRXhjZXB0aW9uOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBsb2FkQmFja2dyb3VuZEltYWdlcyhlbCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SW1hZ2VMb2FkSGFuZGxlcnMoaW1nLCBpbWFnZU9iaikge1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICggaW1hZ2VPYmoudGltZXIgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgLy8gQ09SUyBzdWNjZWVkZWRcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCggaW1hZ2VPYmoudGltZXIgKTtcbiAgICAgIH1cblxuICAgICAgaW1hZ2VzLm51bUxvYWRlZCsrO1xuICAgICAgaW1hZ2VPYmouc3VjY2VlZGVkID0gdHJ1ZTtcbiAgICAgIGltZy5vbmVycm9yID0gaW1nLm9ubG9hZCA9IG51bGw7XG4gICAgICBzdGFydCgpO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbWcuY3Jvc3NPcmlnaW4gPT09IFwiYW5vbnltb3VzXCIpIHtcbiAgICAgICAgLy8gQ09SUyBmYWlsZWRcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCggaW1hZ2VPYmoudGltZXIgKTtcblxuICAgICAgICAvLyBsZXQncyB0cnkgd2l0aCBwcm94eSBpbnN0ZWFkXG4gICAgICAgIGlmICggb3B0aW9ucy5wcm94eSApIHtcbiAgICAgICAgICB2YXIgc3JjID0gaW1nLnNyYztcbiAgICAgICAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICBpbWFnZU9iai5pbWcgPSBpbWc7XG4gICAgICAgICAgaW1nLnNyYyA9IHNyYztcblxuICAgICAgICAgIHByb3h5R2V0SW1hZ2UoIGltZy5zcmMsIGltZywgaW1hZ2VPYmogKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW1hZ2VzLm51bUxvYWRlZCsrO1xuICAgICAgaW1hZ2VzLm51bUZhaWxlZCsrO1xuICAgICAgaW1hZ2VPYmouc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICBpbWcub25lcnJvciA9IGltZy5vbmxvYWQgPSBudWxsO1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBsb2FkSW1hZ2U6IGZ1bmN0aW9uKCBzcmMgKSB7XG4gICAgICB2YXIgaW1nLCBpbWFnZU9iajtcbiAgICAgIGlmICggc3JjICYmIGltYWdlc1tzcmNdID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpZiAoIHNyYy5tYXRjaCgvZGF0YTppbWFnZVxcLy4qO2Jhc2U2NCwvaSkgKSB7XG4gICAgICAgICAgaW1nLnNyYyA9IHNyYy5yZXBsYWNlKC91cmxcXChbJ1wiXXswLH18WydcIl17MCx9XFwpJC9pZywgJycpO1xuICAgICAgICAgIGltYWdlT2JqID0gaW1hZ2VzW3NyY10gPSB7XG4gICAgICAgICAgICBpbWc6IGltZ1xuICAgICAgICAgIH07XG4gICAgICAgICAgaW1hZ2VzLm51bVRvdGFsKys7XG4gICAgICAgICAgc2V0SW1hZ2VMb2FkSGFuZGxlcnMoaW1nLCBpbWFnZU9iaik7XG4gICAgICAgIH0gZWxzZSBpZiAoIGlzU2FtZU9yaWdpbiggc3JjICkgfHwgb3B0aW9ucy5hbGxvd1RhaW50ID09PSAgdHJ1ZSApIHtcbiAgICAgICAgICBpbWFnZU9iaiA9IGltYWdlc1tzcmNdID0ge1xuICAgICAgICAgICAgaW1nOiBpbWdcbiAgICAgICAgICB9O1xuICAgICAgICAgIGltYWdlcy5udW1Ub3RhbCsrO1xuICAgICAgICAgIHNldEltYWdlTG9hZEhhbmRsZXJzKGltZywgaW1hZ2VPYmopO1xuICAgICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgIH0gZWxzZSBpZiAoIHN1cHBvcnRDT1JTICYmICFvcHRpb25zLmFsbG93VGFpbnQgJiYgb3B0aW9ucy51c2VDT1JTICkge1xuICAgICAgICAgIC8vIGF0dGVtcHQgdG8gbG9hZCB3aXRoIENPUlNcblxuICAgICAgICAgIGltZy5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCI7XG4gICAgICAgICAgaW1hZ2VPYmogPSBpbWFnZXNbc3JjXSA9IHtcbiAgICAgICAgICAgIGltZzogaW1nXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbWFnZXMubnVtVG90YWwrKztcbiAgICAgICAgICBzZXRJbWFnZUxvYWRIYW5kbGVycyhpbWcsIGltYWdlT2JqKTtcbiAgICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLnByb3h5ICkge1xuICAgICAgICAgIGltYWdlT2JqID0gaW1hZ2VzW3NyY10gPSB7XG4gICAgICAgICAgICBpbWc6IGltZ1xuICAgICAgICAgIH07XG4gICAgICAgICAgaW1hZ2VzLm51bVRvdGFsKys7XG4gICAgICAgICAgcHJveHlHZXRJbWFnZSggc3JjLCBpbWcsIGltYWdlT2JqICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0sXG4gICAgY2xlYW51cERPTTogZnVuY3Rpb24oY2F1c2UpIHtcbiAgICAgIHZhciBpbWcsIHNyYztcbiAgICAgIGlmICghaW1hZ2VzLmNsZWFudXBEb25lKSB7XG4gICAgICAgIGlmIChjYXVzZSAmJiB0eXBlb2YgY2F1c2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBDbGVhbnVwIGJlY2F1c2U6IFwiICsgY2F1c2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IENsZWFudXAgYWZ0ZXIgdGltZW91dDogXCIgKyBvcHRpb25zLnRpbWVvdXQgKyBcIiBtcy5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHNyYyBpbiBpbWFnZXMpIHtcbiAgICAgICAgICBpZiAoaW1hZ2VzLmhhc093blByb3BlcnR5KHNyYykpIHtcbiAgICAgICAgICAgIGltZyA9IGltYWdlc1tzcmNdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWcgPT09IFwib2JqZWN0XCIgJiYgaW1nLmNhbGxiYWNrbmFtZSAmJiBpbWcuc3VjY2VlZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gY2FuY2VsIHByb3h5IGltYWdlIHJlcXVlc3RcbiAgICAgICAgICAgICAgd2luZG93W2ltZy5jYWxsYmFja25hbWVdID0gdW5kZWZpbmVkOyAvLyB0byB3b3JrIHdpdGggSUU8OSAgLy8gTk9URTogdGhhdCB0aGUgdW5kZWZpbmVkIGNhbGxiYWNrIHByb3BlcnR5LW5hbWUgc3RpbGwgZXhpc3RzIG9uIHRoZSB3aW5kb3cgb2JqZWN0IChmb3IgSUU8OSlcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkZWxldGUgd2luZG93W2ltZy5jYWxsYmFja25hbWVdOyAgLy8gZm9yIGFsbCBicm93c2VyIHRoYXQgc3VwcG9ydCB0aGlzXG4gICAgICAgICAgICAgIH0gY2F0Y2goZXgpIHt9XG4gICAgICAgICAgICAgIGlmIChpbWcuc2NyaXB0ICYmIGltZy5zY3JpcHQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIGltZy5zY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYWJvdXQ6YmxhbmtcIik7ICAvLyB0cnkgdG8gY2FuY2VsIHJ1bm5pbmcgcmVxdWVzdFxuICAgICAgICAgICAgICAgIGltZy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWcuc2NyaXB0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbWFnZXMubnVtTG9hZGVkKys7XG4gICAgICAgICAgICAgIGltYWdlcy5udW1GYWlsZWQrKztcbiAgICAgICAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogQ2xlYW5lZCB1cCBmYWlsZWQgaW1nOiAnXCIgKyBzcmMgKyBcIicgU3RlcHM6IFwiICsgaW1hZ2VzLm51bUxvYWRlZCArIFwiIC8gXCIgKyBpbWFnZXMubnVtVG90YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbmNlbCBhbnkgcGVuZGluZyByZXF1ZXN0c1xuICAgICAgICBpZih3aW5kb3cuc3RvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgd2luZG93LnN0b3AoKTtcbiAgICAgICAgfSBlbHNlIGlmKGRvY3VtZW50LmV4ZWNDb21tYW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcIlN0b3BcIiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb2N1bWVudC5jbG9zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZG9jdW1lbnQuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpbWFnZXMuY2xlYW51cERvbmUgPSB0cnVlO1xuICAgICAgICBpZiAoIShjYXVzZSAmJiB0eXBlb2YgY2F1c2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXJpbmdEb25lOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aW1lb3V0VGltZXIpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBpZiAob3B0aW9ucy50aW1lb3V0ID4gMCkge1xuICAgIHRpbWVvdXRUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KG1ldGhvZHMuY2xlYW51cERPTSwgb3B0aW9ucy50aW1lb3V0KTtcbiAgfVxuXG4gIFV0aWwubG9nKCdodG1sMmNhbnZhczogUHJlbG9hZCBzdGFydHM6IGZpbmRpbmcgYmFja2dyb3VuZC1pbWFnZXMnKTtcbiAgaW1hZ2VzLmZpcnN0UnVuID0gdHJ1ZTtcblxuICBnZXRJbWFnZXMoZWxlbWVudCk7XG5cbiAgVXRpbC5sb2coJ2h0bWwyY2FudmFzOiBQcmVsb2FkOiBGaW5kaW5nIGltYWdlcycpO1xuICAvLyBsb2FkIDxpbWc+IGltYWdlc1xuICBmb3IgKGkgPSAwOyBpIDwgaW1nTGVuOyBpKz0xKXtcbiAgICBtZXRob2RzLmxvYWRJbWFnZSggZG9tSW1hZ2VzW2ldLmdldEF0dHJpYnV0ZSggXCJzcmNcIiApICk7XG4gIH1cblxuICBpbWFnZXMuZmlyc3RSdW4gPSBmYWxzZTtcbiAgVXRpbC5sb2coJ2h0bWwyY2FudmFzOiBQcmVsb2FkOiBEb25lLicpO1xuICBpZiAoaW1hZ2VzLm51bVRvdGFsID09PSBpbWFnZXMubnVtTG9hZGVkKSB7XG4gICAgc3RhcnQoKTtcbiAgfVxuXG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuX2h0bWwyY2FudmFzLlJlbmRlcmVyID0gZnVuY3Rpb24ocGFyc2VRdWV1ZSwgb3B0aW9ucyl7XG5cbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvemluZGV4Lmh0bWxcbiAgZnVuY3Rpb24gY3JlYXRlUmVuZGVyUXVldWUocGFyc2VRdWV1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFtdLFxuICAgIHJvb3RDb250ZXh0O1xuXG4gICAgcm9vdENvbnRleHQgPSAoZnVuY3Rpb24gYnVpbGRTdGFja2luZ0NvbnRleHQocm9vdE5vZGUpIHtcbiAgICAgIHZhciByb290Q29udGV4dCA9IHt9O1xuICAgICAgZnVuY3Rpb24gaW5zZXJ0KGNvbnRleHQsIG5vZGUsIHNwZWNpYWxQYXJlbnQpIHtcbiAgICAgICAgdmFyIHppID0gKG5vZGUuekluZGV4LnppbmRleCA9PT0gJ2F1dG8nKSA/IDAgOiBOdW1iZXIobm9kZS56SW5kZXguemluZGV4KSxcbiAgICAgICAgY29udGV4dEZvckNoaWxkcmVuID0gY29udGV4dCwgLy8gdGhlIHN0YWNraW5nIGNvbnRleHQgZm9yIGNoaWxkcmVuXG4gICAgICAgIGlzUG9zaXRpb25lZCA9IG5vZGUuekluZGV4LmlzUG9zaXRpb25lZCxcbiAgICAgICAgaXNGbG9hdGVkID0gbm9kZS56SW5kZXguaXNGbG9hdGVkLFxuICAgICAgICBzdHViID0ge25vZGU6IG5vZGV9LFxuICAgICAgICBjaGlsZHJlbkRlc3QgPSBzcGVjaWFsUGFyZW50OyAvLyB3aGVyZSBjaGlsZHJlbiB3aXRob3V0IHotaW5kZXggc2hvdWxkIGJlIHB1c2hlZCBpbnRvXG5cbiAgICAgICAgaWYgKG5vZGUuekluZGV4Lm93blN0YWNraW5nKSB7XG4gICAgICAgICAgLy8gJyEnIGNvbWVzIGJlZm9yZSBudW1iZXJzIGluIHNvcnRlZCBhcnJheVxuICAgICAgICAgIGNvbnRleHRGb3JDaGlsZHJlbiA9IHN0dWIuY29udGV4dCA9IHsgJyEnOiBbe25vZGU6bm9kZSwgY2hpbGRyZW46IFtdfV19O1xuICAgICAgICAgIGNoaWxkcmVuRGVzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIGlmIChpc1Bvc2l0aW9uZWQgfHwgaXNGbG9hdGVkKSB7XG4gICAgICAgICAgY2hpbGRyZW5EZXN0ID0gc3R1Yi5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHppID09PSAwICYmIHNwZWNpYWxQYXJlbnQpIHtcbiAgICAgICAgICBzcGVjaWFsUGFyZW50LnB1c2goc3R1Yik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFjb250ZXh0W3ppXSkgeyBjb250ZXh0W3ppXSA9IFtdOyB9XG4gICAgICAgICAgY29udGV4dFt6aV0ucHVzaChzdHViKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUuekluZGV4LmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGROb2RlKSB7XG4gICAgICAgICAgaW5zZXJ0KGNvbnRleHRGb3JDaGlsZHJlbiwgY2hpbGROb2RlLCBjaGlsZHJlbkRlc3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGluc2VydChyb290Q29udGV4dCwgcm9vdE5vZGUpO1xuICAgICAgcmV0dXJuIHJvb3RDb250ZXh0O1xuICAgIH0pKHBhcnNlUXVldWUpO1xuXG4gICAgZnVuY3Rpb24gc29ydFooY29udGV4dCkge1xuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24oemkpIHtcbiAgICAgICAgdmFyIG5vblBvc2l0aW9uZWQgPSBbXSxcbiAgICAgICAgZmxvYXRlZCA9IFtdLFxuICAgICAgICBwb3NpdGlvbmVkID0gW10sXG4gICAgICAgIGxpc3QgPSBbXTtcblxuICAgICAgICAvLyBwb3NpdGlvbmVkIGFmdGVyIHN0YXRpY1xuICAgICAgICBjb250ZXh0W3ppXS5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICBpZiAodi5ub2RlLnpJbmRleC5pc1Bvc2l0aW9uZWQgfHwgdi5ub2RlLnpJbmRleC5vcGFjaXR5IDwgMSkge1xuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8jdHJhbnNwYXJlbmN5XG4gICAgICAgICAgICAvLyBub24tcG9zaXRpb25lZCBlbGVtZW50IHdpdGggb3BhY3RpeSA8IDEgc2hvdWxkIGJlIHN0YWNrZWQgYXMgaWYgaXQgd2VyZSBhIHBvc2l0aW9uZWQgZWxlbWVudCB3aXRoIOKAmHotaW5kZXg6IDDigJkgYW5kIOKAmG9wYWNpdHk6IDHigJkuXG4gICAgICAgICAgICBwb3NpdGlvbmVkLnB1c2godik7XG4gICAgICAgICAgfSBlbHNlIGlmICh2Lm5vZGUuekluZGV4LmlzRmxvYXRlZCkge1xuICAgICAgICAgICAgZmxvYXRlZC5wdXNoKHYpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub25Qb3NpdGlvbmVkLnB1c2godik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAoZnVuY3Rpb24gd2FsayhhcnIpIHtcbiAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICBsaXN0LnB1c2godik7XG4gICAgICAgICAgICBpZiAodi5jaGlsZHJlbikgeyB3YWxrKHYuY2hpbGRyZW4pOyB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKG5vblBvc2l0aW9uZWQuY29uY2F0KGZsb2F0ZWQsIHBvc2l0aW9uZWQpKTtcblxuICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgIGlmICh2LmNvbnRleHQpIHtcbiAgICAgICAgICAgIHNvcnRaKHYuY29udGV4dCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2godi5ub2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc29ydFoocm9vdENvbnRleHQpO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UmVuZGVyZXIocmVuZGVyZXJOYW1lKSB7XG4gICAgdmFyIHJlbmRlcmVyO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnJlbmRlcmVyID09PSBcInN0cmluZ1wiICYmIF9odG1sMmNhbnZhcy5SZW5kZXJlcltyZW5kZXJlck5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbmRlcmVyID0gX2h0bWwyY2FudmFzLlJlbmRlcmVyW3JlbmRlcmVyTmFtZV0ob3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVuZGVyZXJOYW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJlbmRlcmVyID0gcmVuZGVyZXJOYW1lKG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHJlbmRlcmVyXCIpO1xuICAgIH1cblxuICAgIGlmICggdHlwZW9mIHJlbmRlcmVyICE9PSBcImZ1bmN0aW9uXCIgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJlbmRlcmVyIGRlZmluZWRcIik7XG4gICAgfVxuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG4gIHJldHVybiBnZXRSZW5kZXJlcihvcHRpb25zLnJlbmRlcmVyKShwYXJzZVF1ZXVlLCBvcHRpb25zLCBkb2N1bWVudCwgY3JlYXRlUmVuZGVyUXVldWUocGFyc2VRdWV1ZS5zdGFjayksIF9odG1sMmNhbnZhcyk7XG59O1xuXG5faHRtbDJjYW52YXMuVXRpbC5TdXBwb3J0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRvYykge1xuXG4gIGZ1bmN0aW9uIHN1cHBvcnRTVkdSZW5kZXJpbmcoKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpLFxuICAgIGNhbnZhcyA9IGRvYy5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxuICAgIGN0eCA9IChjYW52YXMuZ2V0Q29udGV4dCA9PT0gdW5kZWZpbmVkKSA/IGZhbHNlIDogY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBpZiAoY3R4ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMuaGVpZ2h0ID0gMTA7XG4gICAgaW1nLnNyYyA9IFtcbiAgICBcImRhdGE6aW1hZ2Uvc3ZnK3htbCxcIixcbiAgICBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnPlwiLFxuICAgIFwiPGZvcmVpZ25PYmplY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJz5cIixcbiAgICBcIjxkaXYgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnIHN0eWxlPSd3aWR0aDoxMDtoZWlnaHQ6MTA7Jz5cIixcbiAgICBcInN1cFwiLFxuICAgIFwiPC9kaXY+XCIsXG4gICAgXCI8L2ZvcmVpZ25PYmplY3Q+XCIsXG4gICAgXCI8L3N2Zz5cIlxuICAgIF0uam9pbihcIlwiKTtcbiAgICB0cnkge1xuICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgICAgY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfaHRtbDJjYW52YXMuVXRpbC5sb2coJ2h0bWwyY2FudmFzOiBQYXJzZTogU1ZHIHBvd2VyZWQgcmVuZGVyaW5nIGF2YWlsYWJsZScpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVGVzdCB3aGV0aGVyIHdlIGNhbiB1c2UgcmFuZ2VzIHRvIG1lYXN1cmUgYm91bmRpbmcgYm94ZXNcbiAgLy8gT3BlcmEgZG9lc24ndCBwcm92aWRlIHZhbGlkIGJvdW5kcy5oZWlnaHQvYm90dG9tIGV2ZW4gdGhvdWdoIGl0IHN1cHBvcnRzIHRoZSBtZXRob2QuXG5cbiAgZnVuY3Rpb24gc3VwcG9ydFJhbmdlQm91bmRzKCkge1xuICAgIHZhciByLCB0ZXN0RWxlbWVudCwgcmFuZ2VCb3VuZHMsIHJhbmdlSGVpZ2h0LCBzdXBwb3J0ID0gZmFsc2U7XG5cbiAgICBpZiAoZG9jLmNyZWF0ZVJhbmdlKSB7XG4gICAgICByID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICBpZiAoci5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgdGVzdEVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYm91bmR0ZXN0Jyk7XG4gICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTIzcHhcIjtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQodGVzdEVsZW1lbnQpO1xuXG4gICAgICAgIHIuc2VsZWN0Tm9kZSh0ZXN0RWxlbWVudCk7XG4gICAgICAgIHJhbmdlQm91bmRzID0gci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmFuZ2VIZWlnaHQgPSByYW5nZUJvdW5kcy5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKHJhbmdlSGVpZ2h0ID09PSAxMjMpIHtcbiAgICAgICAgICBzdXBwb3J0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBkb2MuYm9keS5yZW1vdmVDaGlsZCh0ZXN0RWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cHBvcnQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJhbmdlQm91bmRzOiBzdXBwb3J0UmFuZ2VCb3VuZHMoKSxcbiAgICBzdmdSZW5kZXJpbmc6IG9wdGlvbnMuc3ZnUmVuZGVyaW5nICYmIHN1cHBvcnRTVkdSZW5kZXJpbmcoKVxuICB9O1xufTtcblxud2luZG93Lmh0bWwyY2FudmFzPWZ1bmN0aW9uKGVsZW1lbnRzLCBvcHRzKSB7XG4gIGVsZW1lbnRzID0gKGVsZW1lbnRzLmxlbmd0aCkgPyBlbGVtZW50cyA6IFtlbGVtZW50c107XG4gIHZhciBxdWV1ZSxcbiAgY2FudmFzLFxuICBvcHRpb25zID0ge1xuICAgIC8vIGdlbmVyYWxcbiAgICBsb2dnaW5nOiBmYWxzZSxcbiAgICBlbGVtZW50czogZWxlbWVudHMsXG4gICAgYmFja2dyb3VuZDogXCIjZmZmXCIsXG5cbiAgICAvLyBwcmVsb2FkIG9wdGlvbnNcbiAgICBwcm94eTogbnVsbCxcbiAgICB0aW1lb3V0OiAwLCAgICAvLyBubyB0aW1lb3V0XG4gICAgdXNlQ09SUzogZmFsc2UsIC8vIHRyeSB0byBsb2FkIGltYWdlcyBhcyBDT1JTICh3aGVyZSBhdmFpbGFibGUpLCBiZWZvcmUgZmFsbGluZyBiYWNrIHRvIHByb3h5XG4gICAgYWxsb3dUYWludDogZmFsc2UsIC8vIHdoZXRoZXIgdG8gYWxsb3cgaW1hZ2VzIHRvIHRhaW50IHRoZSBjYW52YXMsIHdvbid0IG5lZWQgcHJveHkgaWYgc2V0IHRvIHRydWVcblxuICAgIC8vIHBhcnNlIG9wdGlvbnNcbiAgICBzdmdSZW5kZXJpbmc6IGZhbHNlLCAvLyB1c2Ugc3ZnIHBvd2VyZWQgcmVuZGVyaW5nIHdoZXJlIGF2YWlsYWJsZSAoRkYxMSspXG4gICAgaWdub3JlRWxlbWVudHM6IFwiSUZSQU1FfE9CSkVDVHxQQVJBTVwiLFxuICAgIHVzZU92ZXJmbG93OiB0cnVlLFxuICAgIGxldHRlclJlbmRlcmluZzogZmFsc2UsXG4gICAgY2hpbmVzZTogZmFsc2UsXG5cbiAgICAvLyByZW5kZXIgb3B0aW9uc1xuXG4gICAgd2lkdGg6IG51bGwsXG4gICAgaGVpZ2h0OiBudWxsLFxuICAgIHRhaW50VGVzdDogdHJ1ZSwgLy8gZG8gYSB0YWludCB0ZXN0IHdpdGggYWxsIGltYWdlcyBiZWZvcmUgYXBwbHlpbmcgdG8gY2FudmFzXG4gICAgcmVuZGVyZXI6IFwiQ2FudmFzXCJcbiAgfTtcblxuICBvcHRpb25zID0gX2h0bWwyY2FudmFzLlV0aWwuRXh0ZW5kKG9wdHMsIG9wdGlvbnMpO1xuXG4gIF9odG1sMmNhbnZhcy5sb2dnaW5nID0gb3B0aW9ucy5sb2dnaW5nO1xuICBvcHRpb25zLmNvbXBsZXRlID0gZnVuY3Rpb24oIGltYWdlcyApIHtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vbnByZWxvYWRlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAoIG9wdGlvbnMub25wcmVsb2FkZWQoIGltYWdlcyApID09PSBmYWxzZSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZSA9IF9odG1sMmNhbnZhcy5QYXJzZSggaW1hZ2VzLCBvcHRpb25zICk7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMub25wYXJzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKCBvcHRpb25zLm9ucGFyc2VkKCBxdWV1ZSApID09PSBmYWxzZSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNhbnZhcyA9IF9odG1sMmNhbnZhcy5SZW5kZXJlciggcXVldWUsIG9wdGlvbnMgKTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vbnJlbmRlcmVkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIG9wdGlvbnMub25yZW5kZXJlZCggY2FudmFzICk7XG4gICAgfVxuXG5cbiAgfTtcblxuICAvLyBmb3IgcGFnZXMgd2l0aG91dCBpbWFnZXMsIHdlIHN0aWxsIHdhbnQgdGhpcyB0byBiZSBhc3luYywgaS5lLiByZXR1cm4gbWV0aG9kcyBiZWZvcmUgZXhlY3V0aW5nXG4gIHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgIF9odG1sMmNhbnZhcy5QcmVsb2FkKCBvcHRpb25zICk7XG4gIH0sIDAgKTtcblxuICByZXR1cm4ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oIHF1ZXVlLCBvcHRzICkge1xuICAgICAgcmV0dXJuIF9odG1sMmNhbnZhcy5SZW5kZXJlciggcXVldWUsIF9odG1sMmNhbnZhcy5VdGlsLkV4dGVuZChvcHRzLCBvcHRpb25zKSApO1xuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uKCBpbWFnZXMsIG9wdHMgKSB7XG4gICAgICByZXR1cm4gX2h0bWwyY2FudmFzLlBhcnNlKCBpbWFnZXMsIF9odG1sMmNhbnZhcy5VdGlsLkV4dGVuZChvcHRzLCBvcHRpb25zKSApO1xuICAgIH0sXG4gICAgcHJlbG9hZDogZnVuY3Rpb24oIG9wdHMgKSB7XG4gICAgICByZXR1cm4gX2h0bWwyY2FudmFzLlByZWxvYWQoIF9odG1sMmNhbnZhcy5VdGlsLkV4dGVuZChvcHRzLCBvcHRpb25zKSApO1xuICAgIH0sXG4gICAgbG9nOiBfaHRtbDJjYW52YXMuVXRpbC5sb2dcbiAgfTtcbn07XG5cbndpbmRvdy5odG1sMmNhbnZhcy5sb2cgPSBfaHRtbDJjYW52YXMuVXRpbC5sb2c7IC8vIGZvciByZW5kZXJlcnNcbndpbmRvdy5odG1sMmNhbnZhcy5SZW5kZXJlciA9IHtcbiAgQ2FudmFzOiB1bmRlZmluZWQgLy8gV2UgYXJlIGFzc3VtaW5nIHRoaXMgd2lsbCBiZSB1c2VkXG59O1xuXG5tb2R1bGUuZXhwb3J0cz13aW5kb3cuaHRtbDJjYW52YXM7XG5cbl9odG1sMmNhbnZhcy5SZW5kZXJlci5DYW52YXMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgc2FmZUltYWdlcyA9IFtdLFxuICB0ZXN0Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcbiAgdGVzdGN0eCA9IHRlc3RDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxuICBVdGlsID0gX2h0bWwyY2FudmFzLlV0aWwsXG4gIGNhbnZhcyA9IG9wdGlvbnMuY2FudmFzIHx8IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZShjdHgsIGFyZ3MpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGFyZykge1xuICAgICAgY3R4W2FyZy5uYW1lXS5hcHBseShjdHgsIGFyZ1snYXJndW1lbnRzJ10pO1xuICAgIH0pO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhZmVJbWFnZShpdGVtKSB7XG4gICAgaWYgKHNhZmVJbWFnZXMuaW5kZXhPZihpdGVtWydhcmd1bWVudHMnXVswXS5zcmMgKSA9PT0gLTEpIHtcbiAgICAgIHRlc3RjdHguZHJhd0ltYWdlKGl0ZW1bJ2FyZ3VtZW50cyddWzBdLCAwLCAwKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRlc3RjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIDEsIDEpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHRlc3RDYW52YXMgPSBkb2MuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGVzdGN0eCA9IHRlc3RDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBzYWZlSW1hZ2VzLnB1c2goaXRlbVsnYXJndW1lbnRzJ11bMF0uc3JjKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJJdGVtKGN0eCwgaXRlbSkge1xuICAgIHN3aXRjaChpdGVtLnR5cGUpe1xuICAgICAgY2FzZSBcInZhcmlhYmxlXCI6XG4gICAgICAgIGN0eFtpdGVtLm5hbWVdID0gaXRlbVsnYXJndW1lbnRzJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHN3aXRjaChpdGVtLm5hbWUpIHtcbiAgICAgICAgICBjYXNlIFwiY3JlYXRlUGF0dGVyblwiOlxuICAgICAgICAgICAgaWYgKGl0ZW1bJ2FyZ3VtZW50cyddWzBdLndpZHRoID4gMCAmJiBpdGVtWydhcmd1bWVudHMnXVswXS5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGN0eC5jcmVhdGVQYXR0ZXJuKGl0ZW1bJ2FyZ3VtZW50cyddWzBdLCBcInJlcGVhdFwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogUmVuZGVyZXI6IEVycm9yIGNyZWF0aW5nIHBhdHRlcm5cIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcImRyYXdTaGFwZVwiOlxuICAgICAgICAgICAgY3JlYXRlU2hhcGUoY3R4LCBpdGVtWydhcmd1bWVudHMnXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiZHJhd0ltYWdlXCI6XG4gICAgICAgICAgICBpZiAoaXRlbVsnYXJndW1lbnRzJ11bOF0gPiAwICYmIGl0ZW1bJ2FyZ3VtZW50cyddWzddID4gMCkge1xuICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMudGFpbnRUZXN0IHx8IChvcHRpb25zLnRhaW50VGVzdCAmJiBzYWZlSW1hZ2UoaXRlbSkpKSB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZS5hcHBseSggY3R4LCBpdGVtWydhcmd1bWVudHMnXSApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY3R4W2l0ZW0ubmFtZV0uYXBwbHkoY3R4LCBpdGVtWydhcmd1bWVudHMnXSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHBhcnNlZERhdGEsIG9wdGlvbnMsIGRvY3VtZW50LCBxdWV1ZSwgX2h0bWwyY2FudmFzKSB7XG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgbmV3Q2FudmFzLFxuICAgIGJvdW5kcyxcbiAgICBmc3R5bGUsXG4gICAgelN0YWNrID0gcGFyc2VkRGF0YS5zdGFjaztcblxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5zdHlsZS53aWR0aCA9ICBvcHRpb25zLndpZHRoIHx8IHpTdGFjay5jdHgud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCB6U3RhY2suY3R4LmhlaWdodDtcblxuICAgIGZzdHlsZSA9IGN0eC5maWxsU3R5bGU7XG4gICAgY3R4LmZpbGxTdHlsZSA9IChVdGlsLmlzVHJhbnNwYXJlbnQoelN0YWNrLmJhY2tncm91bmRDb2xvcikgJiYgb3B0aW9ucy5iYWNrZ3JvdW5kICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5iYWNrZ3JvdW5kIDogcGFyc2VkRGF0YS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGZzdHlsZTtcblxuICAgIHF1ZXVlLmZvckVhY2goZnVuY3Rpb24oc3RvcmFnZUNvbnRleHQpIHtcbiAgICAgIC8vIHNldCBjb21tb24gc2V0dGluZ3MgZm9yIGNhbnZhc1xuICAgICAgY3R4LnRleHRCYXNlbGluZSA9IFwiYm90dG9tXCI7XG4gICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICBpZiAoc3RvcmFnZUNvbnRleHQudHJhbnNmb3JtLm1hdHJpeCkge1xuICAgICAgICBjdHgudHJhbnNsYXRlKHN0b3JhZ2VDb250ZXh0LnRyYW5zZm9ybS5vcmlnaW5bMF0sIHN0b3JhZ2VDb250ZXh0LnRyYW5zZm9ybS5vcmlnaW5bMV0pO1xuICAgICAgICBjdHgudHJhbnNmb3JtLmFwcGx5KGN0eCwgc3RvcmFnZUNvbnRleHQudHJhbnNmb3JtLm1hdHJpeCk7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoLXN0b3JhZ2VDb250ZXh0LnRyYW5zZm9ybS5vcmlnaW5bMF0sIC1zdG9yYWdlQ29udGV4dC50cmFuc2Zvcm0ub3JpZ2luWzFdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0b3JhZ2VDb250ZXh0LmNsaXApe1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KHN0b3JhZ2VDb250ZXh0LmNsaXAubGVmdCwgc3RvcmFnZUNvbnRleHQuY2xpcC50b3AsIHN0b3JhZ2VDb250ZXh0LmNsaXAud2lkdGgsIHN0b3JhZ2VDb250ZXh0LmNsaXAuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmNsaXAoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0b3JhZ2VDb250ZXh0LmN0eC5zdG9yYWdlKSB7XG4gICAgICAgIHN0b3JhZ2VDb250ZXh0LmN0eC5zdG9yYWdlLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJlbmRlckl0ZW0oY3R4LCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBSZW5kZXJlcjogQ2FudmFzIHJlbmRlcmVyIGRvbmUgLSByZXR1cm5pbmcgY2FudmFzIG9ialwiKTtcblxuICAgIGlmIChvcHRpb25zLmVsZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmVsZW1lbnRzWzBdID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuZWxlbWVudHNbMF0ubm9kZU5hbWUgIT09IFwiQk9EWVwiKSB7XG4gICAgICAgIC8vIGNyb3AgaW1hZ2UgdG8gdGhlIGJvdW5kcyBvZiBzZWxlY3RlZCAoc2luZ2xlKSBlbGVtZW50XG4gICAgICAgIGJvdW5kcyA9IF9odG1sMmNhbnZhcy5VdGlsLkJvdW5kcyhvcHRpb25zLmVsZW1lbnRzWzBdKTtcbiAgICAgICAgbmV3Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIG5ld0NhbnZhcy53aWR0aCA9IE1hdGguY2VpbChib3VuZHMud2lkdGgpO1xuICAgICAgICBuZXdDYW52YXMuaGVpZ2h0ID0gTWF0aC5jZWlsKGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICBjdHggPSBuZXdDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoY2FudmFzLCBib3VuZHMubGVmdCwgYm91bmRzLnRvcCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0LCAwLCAwLCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICBjYW52YXMgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3Q2FudmFzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYW52YXM7XG4gIH07XG59O1xufSkod2luZG93LGRvY3VtZW50KTsiLCIvKiEgU29ja2V0LklPLm1pbi5qcyBidWlsZDowLjkuMTYsIHByb2R1Y3Rpb24uIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT4gTUlUIExpY2Vuc2VkICovXG52YXIgaW89XCJ1bmRlZmluZWRcIj09dHlwZW9mIG1vZHVsZT97fTptb2R1bGUuZXhwb3J0czsoZnVuY3Rpb24oKXsoZnVuY3Rpb24oYSxiKXt2YXIgYz1hO2MudmVyc2lvbj1cIjAuOS4xNlwiLGMucHJvdG9jb2w9MSxjLnRyYW5zcG9ydHM9W10sYy5qPVtdLGMuc29ja2V0cz17fSxjLmNvbm5lY3Q9ZnVuY3Rpb24oYSxkKXt2YXIgZT1jLnV0aWwucGFyc2VVcmkoYSksZixnO2ImJmIubG9jYXRpb24mJihlLnByb3RvY29sPWUucHJvdG9jb2x8fGIubG9jYXRpb24ucHJvdG9jb2wuc2xpY2UoMCwtMSksZS5ob3N0PWUuaG9zdHx8KGIuZG9jdW1lbnQ/Yi5kb2N1bWVudC5kb21haW46Yi5sb2NhdGlvbi5ob3N0bmFtZSksZS5wb3J0PWUucG9ydHx8Yi5sb2NhdGlvbi5wb3J0KSxmPWMudXRpbC51bmlxdWVVcmkoZSk7dmFyIGg9e2hvc3Q6ZS5ob3N0LHNlY3VyZTpcImh0dHBzXCI9PWUucHJvdG9jb2wscG9ydDplLnBvcnR8fChcImh0dHBzXCI9PWUucHJvdG9jb2w/NDQzOjgwKSxxdWVyeTplLnF1ZXJ5fHxcIlwifTtjLnV0aWwubWVyZ2UoaCxkKTtpZihoW1wiZm9yY2UgbmV3IGNvbm5lY3Rpb25cIl18fCFjLnNvY2tldHNbZl0pZz1uZXcgYy5Tb2NrZXQoaCk7cmV0dXJuIWhbXCJmb3JjZSBuZXcgY29ubmVjdGlvblwiXSYmZyYmKGMuc29ja2V0c1tmXT1nKSxnPWd8fGMuc29ja2V0c1tmXSxnLm9mKGUucGF0aC5sZW5ndGg+MT9lLnBhdGg6XCJcIil9fSkoXCJvYmplY3RcIj09dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0czp0aGlzLmlvPXt9LHRoaXMpLGZ1bmN0aW9uKGEsYil7dmFyIGM9YS51dGlsPXt9LGQ9L14oPzooPyFbXjpAXSs6W146QFxcL10qQCkoW146XFwvPyMuXSspOik/KD86XFwvXFwvKT8oKD86KChbXjpAXSopKD86OihbXjpAXSopKT8pP0ApPyhbXjpcXC8/I10qKSg/OjooXFxkKikpPykoKChcXC8oPzpbXj8jXSg/IVtePyNcXC9dKlxcLltePyNcXC8uXSsoPzpbPyNdfCQpKSkqXFwvPyk/KFtePyNcXC9dKikpKD86XFw/KFteI10qKSk/KD86IyguKikpPykvLGU9W1wic291cmNlXCIsXCJwcm90b2NvbFwiLFwiYXV0aG9yaXR5XCIsXCJ1c2VySW5mb1wiLFwidXNlclwiLFwicGFzc3dvcmRcIixcImhvc3RcIixcInBvcnRcIixcInJlbGF0aXZlXCIsXCJwYXRoXCIsXCJkaXJlY3RvcnlcIixcImZpbGVcIixcInF1ZXJ5XCIsXCJhbmNob3JcIl07Yy5wYXJzZVVyaT1mdW5jdGlvbihhKXt2YXIgYj1kLmV4ZWMoYXx8XCJcIiksYz17fSxmPTE0O3doaWxlKGYtLSljW2VbZl1dPWJbZl18fFwiXCI7cmV0dXJuIGN9LGMudW5pcXVlVXJpPWZ1bmN0aW9uKGEpe3ZhciBjPWEucHJvdG9jb2wsZD1hLmhvc3QsZT1hLnBvcnQ7cmV0dXJuXCJkb2N1bWVudFwiaW4gYj8oZD1kfHxkb2N1bWVudC5kb21haW4sZT1lfHwoYz09XCJodHRwc1wiJiZkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCE9PVwiaHR0cHM6XCI/NDQzOmRvY3VtZW50LmxvY2F0aW9uLnBvcnQpKTooZD1kfHxcImxvY2FsaG9zdFwiLCFlJiZjPT1cImh0dHBzXCImJihlPTQ0MykpLChjfHxcImh0dHBcIikrXCI6Ly9cIitkK1wiOlwiKyhlfHw4MCl9LGMucXVlcnk9ZnVuY3Rpb24oYSxiKXt2YXIgZD1jLmNodW5rUXVlcnkoYXx8XCJcIiksZT1bXTtjLm1lcmdlKGQsYy5jaHVua1F1ZXJ5KGJ8fFwiXCIpKTtmb3IodmFyIGYgaW4gZClkLmhhc093blByb3BlcnR5KGYpJiZlLnB1c2goZitcIj1cIitkW2ZdKTtyZXR1cm4gZS5sZW5ndGg/XCI/XCIrZS5qb2luKFwiJlwiKTpcIlwifSxjLmNodW5rUXVlcnk9ZnVuY3Rpb24oYSl7dmFyIGI9e30sYz1hLnNwbGl0KFwiJlwiKSxkPTAsZT1jLmxlbmd0aCxmO2Zvcig7ZDxlOysrZClmPWNbZF0uc3BsaXQoXCI9XCIpLGZbMF0mJihiW2ZbMF1dPWZbMV0pO3JldHVybiBifTt2YXIgZj0hMTtjLmxvYWQ9ZnVuY3Rpb24oYSl7aWYoXCJkb2N1bWVudFwiaW4gYiYmZG9jdW1lbnQucmVhZHlTdGF0ZT09PVwiY29tcGxldGVcInx8ZilyZXR1cm4gYSgpO2Mub24oYixcImxvYWRcIixhLCExKX0sYy5vbj1mdW5jdGlvbihhLGIsYyxkKXthLmF0dGFjaEV2ZW50P2EuYXR0YWNoRXZlbnQoXCJvblwiK2IsYyk6YS5hZGRFdmVudExpc3RlbmVyJiZhLmFkZEV2ZW50TGlzdGVuZXIoYixjLGQpfSxjLnJlcXVlc3Q9ZnVuY3Rpb24oYSl7aWYoYSYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFhEb21haW5SZXF1ZXN0JiYhYy51YS5oYXNDT1JTKXJldHVybiBuZXcgWERvbWFpblJlcXVlc3Q7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIFhNTEh0dHBSZXF1ZXN0JiYoIWF8fGMudWEuaGFzQ09SUykpcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtpZighYSl0cnl7cmV0dXJuIG5ldyh3aW5kb3dbW1wiQWN0aXZlXCJdLmNvbmNhdChcIk9iamVjdFwiKS5qb2luKFwiWFwiKV0pKFwiTWljcm9zb2Z0LlhNTEhUVFBcIil9Y2F0Y2goYil7fXJldHVybiBudWxsfSxcInVuZGVmaW5lZFwiIT10eXBlb2Ygd2luZG93JiZjLmxvYWQoZnVuY3Rpb24oKXtmPSEwfSksYy5kZWZlcj1mdW5jdGlvbihhKXtpZighYy51YS53ZWJraXR8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbXBvcnRTY3JpcHRzKXJldHVybiBhKCk7Yy5sb2FkKGZ1bmN0aW9uKCl7c2V0VGltZW91dChhLDEwMCl9KX0sYy5tZXJnZT1mdW5jdGlvbihiLGQsZSxmKXt2YXIgZz1mfHxbXSxoPXR5cGVvZiBlPT1cInVuZGVmaW5lZFwiPzI6ZSxpO2ZvcihpIGluIGQpZC5oYXNPd25Qcm9wZXJ0eShpKSYmYy5pbmRleE9mKGcsaSk8MCYmKHR5cGVvZiBiW2ldIT1cIm9iamVjdFwifHwhaD8oYltpXT1kW2ldLGcucHVzaChkW2ldKSk6Yy5tZXJnZShiW2ldLGRbaV0saC0xLGcpKTtyZXR1cm4gYn0sYy5taXhpbj1mdW5jdGlvbihhLGIpe2MubWVyZ2UoYS5wcm90b3R5cGUsYi5wcm90b3R5cGUpfSxjLmluaGVyaXQ9ZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKCl7fWMucHJvdG90eXBlPWIucHJvdG90eXBlLGEucHJvdG90eXBlPW5ldyBjfSxjLmlzQXJyYXk9QXJyYXkuaXNBcnJheXx8ZnVuY3Rpb24oYSl7cmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhKT09PVwiW29iamVjdCBBcnJheV1cIn0sYy5pbnRlcnNlY3Q9ZnVuY3Rpb24oYSxiKXt2YXIgZD1bXSxlPWEubGVuZ3RoPmIubGVuZ3RoP2E6YixmPWEubGVuZ3RoPmIubGVuZ3RoP2I6YTtmb3IodmFyIGc9MCxoPWYubGVuZ3RoO2c8aDtnKyspfmMuaW5kZXhPZihlLGZbZ10pJiZkLnB1c2goZltnXSk7cmV0dXJuIGR9LGMuaW5kZXhPZj1mdW5jdGlvbihhLGIsYyl7Zm9yKHZhciBkPWEubGVuZ3RoLGM9YzwwP2MrZDwwPzA6YytkOmN8fDA7YzxkJiZhW2NdIT09YjtjKyspO3JldHVybiBkPD1jPy0xOmN9LGMudG9BcnJheT1mdW5jdGlvbihhKXt2YXIgYj1bXTtmb3IodmFyIGM9MCxkPWEubGVuZ3RoO2M8ZDtjKyspYi5wdXNoKGFbY10pO3JldHVybiBifSxjLnVhPXt9LGMudWEuaGFzQ09SUz1cInVuZGVmaW5lZFwiIT10eXBlb2YgWE1MSHR0cFJlcXVlc3QmJmZ1bmN0aW9uKCl7dHJ5e3ZhciBhPW5ldyBYTUxIdHRwUmVxdWVzdH1jYXRjaChiKXtyZXR1cm4hMX1yZXR1cm4gYS53aXRoQ3JlZGVudGlhbHMhPXVuZGVmaW5lZH0oKSxjLnVhLndlYmtpdD1cInVuZGVmaW5lZFwiIT10eXBlb2YgbmF2aWdhdG9yJiYvd2Via2l0L2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSxjLnVhLmlEZXZpY2U9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIG5hdmlnYXRvciYmL2lQYWR8aVBob25lfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpfShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLmV4cG9ydHMsdGhpcyksZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKCl7fWEuRXZlbnRFbWl0dGVyPWMsYy5wcm90b3R5cGUub249ZnVuY3Rpb24oYSxjKXtyZXR1cm4gdGhpcy4kZXZlbnRzfHwodGhpcy4kZXZlbnRzPXt9KSx0aGlzLiRldmVudHNbYV0/Yi51dGlsLmlzQXJyYXkodGhpcy4kZXZlbnRzW2FdKT90aGlzLiRldmVudHNbYV0ucHVzaChjKTp0aGlzLiRldmVudHNbYV09W3RoaXMuJGV2ZW50c1thXSxjXTp0aGlzLiRldmVudHNbYV09Yyx0aGlzfSxjLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1jLnByb3RvdHlwZS5vbixjLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gZCgpe2MucmVtb3ZlTGlzdGVuZXIoYSxkKSxiLmFwcGx5KHRoaXMsYXJndW1lbnRzKX12YXIgYz10aGlzO3JldHVybiBkLmxpc3RlbmVyPWIsdGhpcy5vbihhLGQpLHRoaXN9LGMucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKGEsYyl7aWYodGhpcy4kZXZlbnRzJiZ0aGlzLiRldmVudHNbYV0pe3ZhciBkPXRoaXMuJGV2ZW50c1thXTtpZihiLnV0aWwuaXNBcnJheShkKSl7dmFyIGU9LTE7Zm9yKHZhciBmPTAsZz1kLmxlbmd0aDtmPGc7ZisrKWlmKGRbZl09PT1jfHxkW2ZdLmxpc3RlbmVyJiZkW2ZdLmxpc3RlbmVyPT09Yyl7ZT1mO2JyZWFrfWlmKGU8MClyZXR1cm4gdGhpcztkLnNwbGljZShlLDEpLGQubGVuZ3RofHxkZWxldGUgdGhpcy4kZXZlbnRzW2FdfWVsc2UoZD09PWN8fGQubGlzdGVuZXImJmQubGlzdGVuZXI9PT1jKSYmZGVsZXRlIHRoaXMuJGV2ZW50c1thXX1yZXR1cm4gdGhpc30sYy5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKGEpe3JldHVybiBhPT09dW5kZWZpbmVkPyh0aGlzLiRldmVudHM9e30sdGhpcyk6KHRoaXMuJGV2ZW50cyYmdGhpcy4kZXZlbnRzW2FdJiYodGhpcy4kZXZlbnRzW2FdPW51bGwpLHRoaXMpfSxjLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMuJGV2ZW50c3x8KHRoaXMuJGV2ZW50cz17fSksdGhpcy4kZXZlbnRzW2FdfHwodGhpcy4kZXZlbnRzW2FdPVtdKSxiLnV0aWwuaXNBcnJheSh0aGlzLiRldmVudHNbYV0pfHwodGhpcy4kZXZlbnRzW2FdPVt0aGlzLiRldmVudHNbYV1dKSx0aGlzLiRldmVudHNbYV19LGMucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oYSl7aWYoIXRoaXMuJGV2ZW50cylyZXR1cm4hMTt2YXIgYz10aGlzLiRldmVudHNbYV07aWYoIWMpcmV0dXJuITE7dmFyIGQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2lmKFwiZnVuY3Rpb25cIj09dHlwZW9mIGMpYy5hcHBseSh0aGlzLGQpO2Vsc2V7aWYoIWIudXRpbC5pc0FycmF5KGMpKXJldHVybiExO3ZhciBlPWMuc2xpY2UoKTtmb3IodmFyIGY9MCxnPWUubGVuZ3RoO2Y8ZztmKyspZVtmXS5hcHBseSh0aGlzLGQpfXJldHVybiEwfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMpLGZ1bmN0aW9uKGV4cG9ydHMsbmF0aXZlSlNPTil7ZnVuY3Rpb24gZihhKXtyZXR1cm4gYTwxMD9cIjBcIithOmF9ZnVuY3Rpb24gZGF0ZShhLGIpe3JldHVybiBpc0Zpbml0ZShhLnZhbHVlT2YoKSk/YS5nZXRVVENGdWxsWWVhcigpK1wiLVwiK2YoYS5nZXRVVENNb250aCgpKzEpK1wiLVwiK2YoYS5nZXRVVENEYXRlKCkpK1wiVFwiK2YoYS5nZXRVVENIb3VycygpKStcIjpcIitmKGEuZ2V0VVRDTWludXRlcygpKStcIjpcIitmKGEuZ2V0VVRDU2Vjb25kcygpKStcIlpcIjpudWxsfWZ1bmN0aW9uIHF1b3RlKGEpe3JldHVybiBlc2NhcGFibGUubGFzdEluZGV4PTAsZXNjYXBhYmxlLnRlc3QoYSk/J1wiJythLnJlcGxhY2UoZXNjYXBhYmxlLGZ1bmN0aW9uKGEpe3ZhciBiPW1ldGFbYV07cmV0dXJuIHR5cGVvZiBiPT1cInN0cmluZ1wiP2I6XCJcXFxcdVwiKyhcIjAwMDBcIithLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCl9KSsnXCInOidcIicrYSsnXCInfWZ1bmN0aW9uIHN0cihhLGIpe3ZhciBjLGQsZSxmLGc9Z2FwLGgsaT1iW2FdO2kgaW5zdGFuY2VvZiBEYXRlJiYoaT1kYXRlKGEpKSx0eXBlb2YgcmVwPT1cImZ1bmN0aW9uXCImJihpPXJlcC5jYWxsKGIsYSxpKSk7c3dpdGNoKHR5cGVvZiBpKXtjYXNlXCJzdHJpbmdcIjpyZXR1cm4gcXVvdGUoaSk7Y2FzZVwibnVtYmVyXCI6cmV0dXJuIGlzRmluaXRlKGkpP1N0cmluZyhpKTpcIm51bGxcIjtjYXNlXCJib29sZWFuXCI6Y2FzZVwibnVsbFwiOnJldHVybiBTdHJpbmcoaSk7Y2FzZVwib2JqZWN0XCI6aWYoIWkpcmV0dXJuXCJudWxsXCI7Z2FwKz1pbmRlbnQsaD1bXTtpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KGkpPT09XCJbb2JqZWN0IEFycmF5XVwiKXtmPWkubGVuZ3RoO2ZvcihjPTA7YzxmO2MrPTEpaFtjXT1zdHIoYyxpKXx8XCJudWxsXCI7cmV0dXJuIGU9aC5sZW5ndGg9PT0wP1wiW11cIjpnYXA/XCJbXFxuXCIrZ2FwK2guam9pbihcIixcXG5cIitnYXApK1wiXFxuXCIrZytcIl1cIjpcIltcIitoLmpvaW4oXCIsXCIpK1wiXVwiLGdhcD1nLGV9aWYocmVwJiZ0eXBlb2YgcmVwPT1cIm9iamVjdFwiKXtmPXJlcC5sZW5ndGg7Zm9yKGM9MDtjPGY7Yys9MSl0eXBlb2YgcmVwW2NdPT1cInN0cmluZ1wiJiYoZD1yZXBbY10sZT1zdHIoZCxpKSxlJiZoLnB1c2gocXVvdGUoZCkrKGdhcD9cIjogXCI6XCI6XCIpK2UpKX1lbHNlIGZvcihkIGluIGkpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGksZCkmJihlPXN0cihkLGkpLGUmJmgucHVzaChxdW90ZShkKSsoZ2FwP1wiOiBcIjpcIjpcIikrZSkpO3JldHVybiBlPWgubGVuZ3RoPT09MD9cInt9XCI6Z2FwP1wie1xcblwiK2dhcCtoLmpvaW4oXCIsXFxuXCIrZ2FwKStcIlxcblwiK2crXCJ9XCI6XCJ7XCIraC5qb2luKFwiLFwiKStcIn1cIixnYXA9ZyxlfX1cInVzZSBzdHJpY3RcIjtpZihuYXRpdmVKU09OJiZuYXRpdmVKU09OLnBhcnNlKXJldHVybiBleHBvcnRzLkpTT049e3BhcnNlOm5hdGl2ZUpTT04ucGFyc2Usc3RyaW5naWZ5Om5hdGl2ZUpTT04uc3RyaW5naWZ5fTt2YXIgSlNPTj1leHBvcnRzLkpTT049e30sY3g9L1tcXHUwMDAwXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csZXNjYXBhYmxlPS9bXFxcXFxcXCJcXHgwMC1cXHgxZlxceDdmLVxceDlmXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csZ2FwLGluZGVudCxtZXRhPXtcIlxcYlwiOlwiXFxcXGJcIixcIlxcdFwiOlwiXFxcXHRcIixcIlxcblwiOlwiXFxcXG5cIixcIlxcZlwiOlwiXFxcXGZcIixcIlxcclwiOlwiXFxcXHJcIiwnXCInOidcXFxcXCInLFwiXFxcXFwiOlwiXFxcXFxcXFxcIn0scmVwO0pTT04uc3RyaW5naWZ5PWZ1bmN0aW9uKGEsYixjKXt2YXIgZDtnYXA9XCJcIixpbmRlbnQ9XCJcIjtpZih0eXBlb2YgYz09XCJudW1iZXJcIilmb3IoZD0wO2Q8YztkKz0xKWluZGVudCs9XCIgXCI7ZWxzZSB0eXBlb2YgYz09XCJzdHJpbmdcIiYmKGluZGVudD1jKTtyZXA9YjtpZighYnx8dHlwZW9mIGI9PVwiZnVuY3Rpb25cInx8dHlwZW9mIGI9PVwib2JqZWN0XCImJnR5cGVvZiBiLmxlbmd0aD09XCJudW1iZXJcIilyZXR1cm4gc3RyKFwiXCIse1wiXCI6YX0pO3Rocm93IG5ldyBFcnJvcihcIkpTT04uc3RyaW5naWZ5XCIpfSxKU09OLnBhcnNlPWZ1bmN0aW9uKHRleHQscmV2aXZlcil7ZnVuY3Rpb24gd2FsayhhLGIpe3ZhciBjLGQsZT1hW2JdO2lmKGUmJnR5cGVvZiBlPT1cIm9iamVjdFwiKWZvcihjIGluIGUpT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUsYykmJihkPXdhbGsoZSxjKSxkIT09dW5kZWZpbmVkP2VbY109ZDpkZWxldGUgZVtjXSk7cmV0dXJuIHJldml2ZXIuY2FsbChhLGIsZSl9dmFyIGo7dGV4dD1TdHJpbmcodGV4dCksY3gubGFzdEluZGV4PTAsY3gudGVzdCh0ZXh0KSYmKHRleHQ9dGV4dC5yZXBsYWNlKGN4LGZ1bmN0aW9uKGEpe3JldHVyblwiXFxcXHVcIisoXCIwMDAwXCIrYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpfSkpO2lmKC9eW1xcXSw6e31cXHNdKiQvLnRlc3QodGV4dC5yZXBsYWNlKC9cXFxcKD86W1wiXFxcXFxcL2JmbnJ0XXx1WzAtOWEtZkEtRl17NH0pL2csXCJAXCIpLnJlcGxhY2UoL1wiW15cIlxcXFxcXG5cXHJdKlwifHRydWV8ZmFsc2V8bnVsbHwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPy9nLFwiXVwiKS5yZXBsYWNlKC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZyxcIlwiKSkpcmV0dXJuIGo9ZXZhbChcIihcIit0ZXh0K1wiKVwiKSx0eXBlb2YgcmV2aXZlcj09XCJmdW5jdGlvblwiP3dhbGsoe1wiXCI6an0sXCJcIik6ajt0aHJvdyBuZXcgU3ludGF4RXJyb3IoXCJKU09OLnBhcnNlXCIpfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5leHBvcnRzLHR5cGVvZiBKU09OIT1cInVuZGVmaW5lZFwiP0pTT046dW5kZWZpbmVkKSxmdW5jdGlvbihhLGIpe3ZhciBjPWEucGFyc2VyPXt9LGQ9Yy5wYWNrZXRzPVtcImRpc2Nvbm5lY3RcIixcImNvbm5lY3RcIixcImhlYXJ0YmVhdFwiLFwibWVzc2FnZVwiLFwianNvblwiLFwiZXZlbnRcIixcImFja1wiLFwiZXJyb3JcIixcIm5vb3BcIl0sZT1jLnJlYXNvbnM9W1widHJhbnNwb3J0IG5vdCBzdXBwb3J0ZWRcIixcImNsaWVudCBub3QgaGFuZHNoYWtlblwiLFwidW5hdXRob3JpemVkXCJdLGY9Yy5hZHZpY2U9W1wicmVjb25uZWN0XCJdLGc9Yi5KU09OLGg9Yi51dGlsLmluZGV4T2Y7Yy5lbmNvZGVQYWNrZXQ9ZnVuY3Rpb24oYSl7dmFyIGI9aChkLGEudHlwZSksYz1hLmlkfHxcIlwiLGk9YS5lbmRwb2ludHx8XCJcIixqPWEuYWNrLGs9bnVsbDtzd2l0Y2goYS50eXBlKXtjYXNlXCJlcnJvclwiOnZhciBsPWEucmVhc29uP2goZSxhLnJlYXNvbik6XCJcIixtPWEuYWR2aWNlP2goZixhLmFkdmljZSk6XCJcIjtpZihsIT09XCJcInx8bSE9PVwiXCIpaz1sKyhtIT09XCJcIj9cIitcIittOlwiXCIpO2JyZWFrO2Nhc2VcIm1lc3NhZ2VcIjphLmRhdGEhPT1cIlwiJiYoaz1hLmRhdGEpO2JyZWFrO2Nhc2VcImV2ZW50XCI6dmFyIG49e25hbWU6YS5uYW1lfTthLmFyZ3MmJmEuYXJncy5sZW5ndGgmJihuLmFyZ3M9YS5hcmdzKSxrPWcuc3RyaW5naWZ5KG4pO2JyZWFrO2Nhc2VcImpzb25cIjprPWcuc3RyaW5naWZ5KGEuZGF0YSk7YnJlYWs7Y2FzZVwiY29ubmVjdFwiOmEucXMmJihrPWEucXMpO2JyZWFrO2Nhc2VcImFja1wiOms9YS5hY2tJZCsoYS5hcmdzJiZhLmFyZ3MubGVuZ3RoP1wiK1wiK2cuc3RyaW5naWZ5KGEuYXJncyk6XCJcIil9dmFyIG89W2IsYysoaj09XCJkYXRhXCI/XCIrXCI6XCJcIiksaV07cmV0dXJuIGshPT1udWxsJiZrIT09dW5kZWZpbmVkJiZvLnB1c2goayksby5qb2luKFwiOlwiKX0sYy5lbmNvZGVQYXlsb2FkPWZ1bmN0aW9uKGEpe3ZhciBiPVwiXCI7aWYoYS5sZW5ndGg9PTEpcmV0dXJuIGFbMF07Zm9yKHZhciBjPTAsZD1hLmxlbmd0aDtjPGQ7YysrKXt2YXIgZT1hW2NdO2IrPVwiXFx1ZmZmZFwiK2UubGVuZ3RoK1wiXFx1ZmZmZFwiK2FbY119cmV0dXJuIGJ9O3ZhciBpPS8oW146XSspOihbMC05XSspPyhcXCspPzooW146XSspPzo/KFtcXHNcXFNdKik/LztjLmRlY29kZVBhY2tldD1mdW5jdGlvbihhKXt2YXIgYj1hLm1hdGNoKGkpO2lmKCFiKXJldHVybnt9O3ZhciBjPWJbMl18fFwiXCIsYT1iWzVdfHxcIlwiLGg9e3R5cGU6ZFtiWzFdXSxlbmRwb2ludDpiWzRdfHxcIlwifTtjJiYoaC5pZD1jLGJbM10/aC5hY2s9XCJkYXRhXCI6aC5hY2s9ITApO3N3aXRjaChoLnR5cGUpe2Nhc2VcImVycm9yXCI6dmFyIGI9YS5zcGxpdChcIitcIik7aC5yZWFzb249ZVtiWzBdXXx8XCJcIixoLmFkdmljZT1mW2JbMV1dfHxcIlwiO2JyZWFrO2Nhc2VcIm1lc3NhZ2VcIjpoLmRhdGE9YXx8XCJcIjticmVhaztjYXNlXCJldmVudFwiOnRyeXt2YXIgaj1nLnBhcnNlKGEpO2gubmFtZT1qLm5hbWUsaC5hcmdzPWouYXJnc31jYXRjaChrKXt9aC5hcmdzPWguYXJnc3x8W107YnJlYWs7Y2FzZVwianNvblwiOnRyeXtoLmRhdGE9Zy5wYXJzZShhKX1jYXRjaChrKXt9YnJlYWs7Y2FzZVwiY29ubmVjdFwiOmgucXM9YXx8XCJcIjticmVhaztjYXNlXCJhY2tcIjp2YXIgYj1hLm1hdGNoKC9eKFswLTldKykoXFwrKT8oLiopLyk7aWYoYil7aC5hY2tJZD1iWzFdLGguYXJncz1bXTtpZihiWzNdKXRyeXtoLmFyZ3M9YlszXT9nLnBhcnNlKGJbM10pOltdfWNhdGNoKGspe319YnJlYWs7Y2FzZVwiZGlzY29ubmVjdFwiOmNhc2VcImhlYXJ0YmVhdFwiOn1yZXR1cm4gaH0sYy5kZWNvZGVQYXlsb2FkPWZ1bmN0aW9uKGEpe2lmKGEuY2hhckF0KDApPT1cIlxcdWZmZmRcIil7dmFyIGI9W107Zm9yKHZhciBkPTEsZT1cIlwiO2Q8YS5sZW5ndGg7ZCsrKWEuY2hhckF0KGQpPT1cIlxcdWZmZmRcIj8oYi5wdXNoKGMuZGVjb2RlUGFja2V0KGEuc3Vic3RyKGQrMSkuc3Vic3RyKDAsZSkpKSxkKz1OdW1iZXIoZSkrMSxlPVwiXCIpOmUrPWEuY2hhckF0KGQpO3JldHVybiBifXJldHVybltjLmRlY29kZVBhY2tldChhKV19fShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyksZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKGEsYil7dGhpcy5zb2NrZXQ9YSx0aGlzLnNlc3NpZD1ifWEuVHJhbnNwb3J0PWMsYi51dGlsLm1peGluKGMsYi5FdmVudEVtaXR0ZXIpLGMucHJvdG90eXBlLmhlYXJ0YmVhdHM9ZnVuY3Rpb24oKXtyZXR1cm4hMH0sYy5wcm90b3R5cGUub25EYXRhPWZ1bmN0aW9uKGEpe3RoaXMuY2xlYXJDbG9zZVRpbWVvdXQoKSwodGhpcy5zb2NrZXQuY29ubmVjdGVkfHx0aGlzLnNvY2tldC5jb25uZWN0aW5nfHx0aGlzLnNvY2tldC5yZWNvbm5lY3RpbmcpJiZ0aGlzLnNldENsb3NlVGltZW91dCgpO2lmKGEhPT1cIlwiKXt2YXIgYz1iLnBhcnNlci5kZWNvZGVQYXlsb2FkKGEpO2lmKGMmJmMubGVuZ3RoKWZvcih2YXIgZD0wLGU9Yy5sZW5ndGg7ZDxlO2QrKyl0aGlzLm9uUGFja2V0KGNbZF0pfXJldHVybiB0aGlzfSxjLnByb3RvdHlwZS5vblBhY2tldD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5zb2NrZXQuc2V0SGVhcnRiZWF0VGltZW91dCgpLGEudHlwZT09XCJoZWFydGJlYXRcIj90aGlzLm9uSGVhcnRiZWF0KCk6KGEudHlwZT09XCJjb25uZWN0XCImJmEuZW5kcG9pbnQ9PVwiXCImJnRoaXMub25Db25uZWN0KCksYS50eXBlPT1cImVycm9yXCImJmEuYWR2aWNlPT1cInJlY29ubmVjdFwiJiYodGhpcy5pc09wZW49ITEpLHRoaXMuc29ja2V0Lm9uUGFja2V0KGEpLHRoaXMpfSxjLnByb3RvdHlwZS5zZXRDbG9zZVRpbWVvdXQ9ZnVuY3Rpb24oKXtpZighdGhpcy5jbG9zZVRpbWVvdXQpe3ZhciBhPXRoaXM7dGhpcy5jbG9zZVRpbWVvdXQ9c2V0VGltZW91dChmdW5jdGlvbigpe2Eub25EaXNjb25uZWN0KCl9LHRoaXMuc29ja2V0LmNsb3NlVGltZW91dCl9fSxjLnByb3RvdHlwZS5vbkRpc2Nvbm5lY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5pc09wZW4mJnRoaXMuY2xvc2UoKSx0aGlzLmNsZWFyVGltZW91dHMoKSx0aGlzLnNvY2tldC5vbkRpc2Nvbm5lY3QoKSx0aGlzfSxjLnByb3RvdHlwZS5vbkNvbm5lY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb2NrZXQub25Db25uZWN0KCksdGhpc30sYy5wcm90b3R5cGUuY2xlYXJDbG9zZVRpbWVvdXQ9ZnVuY3Rpb24oKXt0aGlzLmNsb3NlVGltZW91dCYmKGNsZWFyVGltZW91dCh0aGlzLmNsb3NlVGltZW91dCksdGhpcy5jbG9zZVRpbWVvdXQ9bnVsbCl9LGMucHJvdG90eXBlLmNsZWFyVGltZW91dHM9ZnVuY3Rpb24oKXt0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCksdGhpcy5yZW9wZW5UaW1lb3V0JiZjbGVhclRpbWVvdXQodGhpcy5yZW9wZW5UaW1lb3V0KX0sYy5wcm90b3R5cGUucGFja2V0PWZ1bmN0aW9uKGEpe3RoaXMuc2VuZChiLnBhcnNlci5lbmNvZGVQYWNrZXQoYSkpfSxjLnByb3RvdHlwZS5vbkhlYXJ0YmVhdD1mdW5jdGlvbihhKXt0aGlzLnBhY2tldCh7dHlwZTpcImhlYXJ0YmVhdFwifSl9LGMucHJvdG90eXBlLm9uT3Blbj1mdW5jdGlvbigpe3RoaXMuaXNPcGVuPSEwLHRoaXMuY2xlYXJDbG9zZVRpbWVvdXQoKSx0aGlzLnNvY2tldC5vbk9wZW4oKX0sYy5wcm90b3R5cGUub25DbG9zZT1mdW5jdGlvbigpe3ZhciBhPXRoaXM7dGhpcy5pc09wZW49ITEsdGhpcy5zb2NrZXQub25DbG9zZSgpLHRoaXMub25EaXNjb25uZWN0KCl9LGMucHJvdG90eXBlLnByZXBhcmVVcmw9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLnNvY2tldC5vcHRpb25zO3JldHVybiB0aGlzLnNjaGVtZSgpK1wiOi8vXCIrYS5ob3N0K1wiOlwiK2EucG9ydCtcIi9cIithLnJlc291cmNlK1wiL1wiK2IucHJvdG9jb2wrXCIvXCIrdGhpcy5uYW1lK1wiL1wiK3RoaXMuc2Vzc2lkfSxjLnByb3RvdHlwZS5yZWFkeT1mdW5jdGlvbihhLGIpe2IuY2FsbCh0aGlzKX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzKSxmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChhKXt0aGlzLm9wdGlvbnM9e3BvcnQ6ODAsc2VjdXJlOiExLGRvY3VtZW50OlwiZG9jdW1lbnRcImluIGM/ZG9jdW1lbnQ6ITEscmVzb3VyY2U6XCJzb2NrZXQuaW9cIix0cmFuc3BvcnRzOmIudHJhbnNwb3J0cyxcImNvbm5lY3QgdGltZW91dFwiOjFlNCxcInRyeSBtdWx0aXBsZSB0cmFuc3BvcnRzXCI6ITAscmVjb25uZWN0OiEwLFwicmVjb25uZWN0aW9uIGRlbGF5XCI6NTAwLFwicmVjb25uZWN0aW9uIGxpbWl0XCI6SW5maW5pdHksXCJyZW9wZW4gZGVsYXlcIjozZTMsXCJtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzXCI6MTAsXCJzeW5jIGRpc2Nvbm5lY3Qgb24gdW5sb2FkXCI6ITEsXCJhdXRvIGNvbm5lY3RcIjohMCxcImZsYXNoIHBvbGljeSBwb3J0XCI6MTA4NDMsbWFudWFsRmx1c2g6ITF9LGIudXRpbC5tZXJnZSh0aGlzLm9wdGlvbnMsYSksdGhpcy5jb25uZWN0ZWQ9ITEsdGhpcy5vcGVuPSExLHRoaXMuY29ubmVjdGluZz0hMSx0aGlzLnJlY29ubmVjdGluZz0hMSx0aGlzLm5hbWVzcGFjZXM9e30sdGhpcy5idWZmZXI9W10sdGhpcy5kb0J1ZmZlcj0hMTtpZih0aGlzLm9wdGlvbnNbXCJzeW5jIGRpc2Nvbm5lY3Qgb24gdW5sb2FkXCJdJiYoIXRoaXMuaXNYRG9tYWluKCl8fGIudXRpbC51YS5oYXNDT1JTKSl7dmFyIGQ9dGhpcztiLnV0aWwub24oYyxcImJlZm9yZXVubG9hZFwiLGZ1bmN0aW9uKCl7ZC5kaXNjb25uZWN0U3luYygpfSwhMSl9dGhpcy5vcHRpb25zW1wiYXV0byBjb25uZWN0XCJdJiZ0aGlzLmNvbm5lY3QoKX1mdW5jdGlvbiBlKCl7fWEuU29ja2V0PWQsYi51dGlsLm1peGluKGQsYi5FdmVudEVtaXR0ZXIpLGQucHJvdG90eXBlLm9mPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLm5hbWVzcGFjZXNbYV18fCh0aGlzLm5hbWVzcGFjZXNbYV09bmV3IGIuU29ja2V0TmFtZXNwYWNlKHRoaXMsYSksYSE9PVwiXCImJnRoaXMubmFtZXNwYWNlc1thXS5wYWNrZXQoe3R5cGU6XCJjb25uZWN0XCJ9KSksdGhpcy5uYW1lc3BhY2VzW2FdfSxkLnByb3RvdHlwZS5wdWJsaXNoPWZ1bmN0aW9uKCl7dGhpcy5lbWl0LmFwcGx5KHRoaXMsYXJndW1lbnRzKTt2YXIgYTtmb3IodmFyIGIgaW4gdGhpcy5uYW1lc3BhY2VzKXRoaXMubmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShiKSYmKGE9dGhpcy5vZihiKSxhLiRlbWl0LmFwcGx5KGEsYXJndW1lbnRzKSl9LGQucHJvdG90eXBlLmhhbmRzaGFrZT1mdW5jdGlvbihhKXtmdW5jdGlvbiBmKGIpe2IgaW5zdGFuY2VvZiBFcnJvcj8oYy5jb25uZWN0aW5nPSExLGMub25FcnJvcihiLm1lc3NhZ2UpKTphLmFwcGx5KG51bGwsYi5zcGxpdChcIjpcIikpfXZhciBjPXRoaXMsZD10aGlzLm9wdGlvbnMsZz1bXCJodHRwXCIrKGQuc2VjdXJlP1wic1wiOlwiXCIpK1wiOi9cIixkLmhvc3QrXCI6XCIrZC5wb3J0LGQucmVzb3VyY2UsYi5wcm90b2NvbCxiLnV0aWwucXVlcnkodGhpcy5vcHRpb25zLnF1ZXJ5LFwidD1cIisgKyhuZXcgRGF0ZSkpXS5qb2luKFwiL1wiKTtpZih0aGlzLmlzWERvbWFpbigpJiYhYi51dGlsLnVhLmhhc0NPUlMpe3ZhciBoPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdLGk9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtpLnNyYz1nK1wiJmpzb25wPVwiK2Iuai5sZW5ndGgsaC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShpLGgpLGIuai5wdXNoKGZ1bmN0aW9uKGEpe2YoYSksaS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGkpfSl9ZWxzZXt2YXIgaj1iLnV0aWwucmVxdWVzdCgpO2oub3BlbihcIkdFVFwiLGcsITApLHRoaXMuaXNYRG9tYWluKCkmJihqLndpdGhDcmVkZW50aWFscz0hMCksai5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtqLnJlYWR5U3RhdGU9PTQmJihqLm9ucmVhZHlzdGF0ZWNoYW5nZT1lLGouc3RhdHVzPT0yMDA/ZihqLnJlc3BvbnNlVGV4dCk6ai5zdGF0dXM9PTQwMz9jLm9uRXJyb3Ioai5yZXNwb25zZVRleHQpOihjLmNvbm5lY3Rpbmc9ITEsIWMucmVjb25uZWN0aW5nJiZjLm9uRXJyb3Ioai5yZXNwb25zZVRleHQpKSl9LGouc2VuZChudWxsKX19LGQucHJvdG90eXBlLmdldFRyYW5zcG9ydD1mdW5jdGlvbihhKXt2YXIgYz1hfHx0aGlzLnRyYW5zcG9ydHMsZDtmb3IodmFyIGU9MCxmO2Y9Y1tlXTtlKyspaWYoYi5UcmFuc3BvcnRbZl0mJmIuVHJhbnNwb3J0W2ZdLmNoZWNrKHRoaXMpJiYoIXRoaXMuaXNYRG9tYWluKCl8fGIuVHJhbnNwb3J0W2ZdLnhkb21haW5DaGVjayh0aGlzKSkpcmV0dXJuIG5ldyBiLlRyYW5zcG9ydFtmXSh0aGlzLHRoaXMuc2Vzc2lvbmlkKTtyZXR1cm4gbnVsbH0sZC5wcm90b3R5cGUuY29ubmVjdD1mdW5jdGlvbihhKXtpZih0aGlzLmNvbm5lY3RpbmcpcmV0dXJuIHRoaXM7dmFyIGM9dGhpcztyZXR1cm4gYy5jb25uZWN0aW5nPSEwLHRoaXMuaGFuZHNoYWtlKGZ1bmN0aW9uKGQsZSxmLGcpe2Z1bmN0aW9uIGgoYSl7Yy50cmFuc3BvcnQmJmMudHJhbnNwb3J0LmNsZWFyVGltZW91dHMoKSxjLnRyYW5zcG9ydD1jLmdldFRyYW5zcG9ydChhKTtpZighYy50cmFuc3BvcnQpcmV0dXJuIGMucHVibGlzaChcImNvbm5lY3RfZmFpbGVkXCIpO2MudHJhbnNwb3J0LnJlYWR5KGMsZnVuY3Rpb24oKXtjLmNvbm5lY3Rpbmc9ITAsYy5wdWJsaXNoKFwiY29ubmVjdGluZ1wiLGMudHJhbnNwb3J0Lm5hbWUpLGMudHJhbnNwb3J0Lm9wZW4oKSxjLm9wdGlvbnNbXCJjb25uZWN0IHRpbWVvdXRcIl0mJihjLmNvbm5lY3RUaW1lb3V0VGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe2lmKCFjLmNvbm5lY3RlZCl7Yy5jb25uZWN0aW5nPSExO2lmKGMub3B0aW9uc1tcInRyeSBtdWx0aXBsZSB0cmFuc3BvcnRzXCJdKXt2YXIgYT1jLnRyYW5zcG9ydHM7d2hpbGUoYS5sZW5ndGg+MCYmYS5zcGxpY2UoMCwxKVswXSE9Yy50cmFuc3BvcnQubmFtZSk7YS5sZW5ndGg/aChhKTpjLnB1Ymxpc2goXCJjb25uZWN0X2ZhaWxlZFwiKX19fSxjLm9wdGlvbnNbXCJjb25uZWN0IHRpbWVvdXRcIl0pKX0pfWMuc2Vzc2lvbmlkPWQsYy5jbG9zZVRpbWVvdXQ9ZioxZTMsYy5oZWFydGJlYXRUaW1lb3V0PWUqMWUzLGMudHJhbnNwb3J0c3x8KGMudHJhbnNwb3J0cz1jLm9yaWdUcmFuc3BvcnRzPWc/Yi51dGlsLmludGVyc2VjdChnLnNwbGl0KFwiLFwiKSxjLm9wdGlvbnMudHJhbnNwb3J0cyk6Yy5vcHRpb25zLnRyYW5zcG9ydHMpLGMuc2V0SGVhcnRiZWF0VGltZW91dCgpLGgoYy50cmFuc3BvcnRzKSxjLm9uY2UoXCJjb25uZWN0XCIsZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQoYy5jb25uZWN0VGltZW91dFRpbWVyKSxhJiZ0eXBlb2YgYT09XCJmdW5jdGlvblwiJiZhKCl9KX0pLHRoaXN9LGQucHJvdG90eXBlLnNldEhlYXJ0YmVhdFRpbWVvdXQ9ZnVuY3Rpb24oKXtjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpO2lmKHRoaXMudHJhbnNwb3J0JiYhdGhpcy50cmFuc3BvcnQuaGVhcnRiZWF0cygpKXJldHVybjt2YXIgYT10aGlzO3RoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyPXNldFRpbWVvdXQoZnVuY3Rpb24oKXthLnRyYW5zcG9ydC5vbkNsb3NlKCl9LHRoaXMuaGVhcnRiZWF0VGltZW91dCl9LGQucHJvdG90eXBlLnBhY2tldD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5jb25uZWN0ZWQmJiF0aGlzLmRvQnVmZmVyP3RoaXMudHJhbnNwb3J0LnBhY2tldChhKTp0aGlzLmJ1ZmZlci5wdXNoKGEpLHRoaXN9LGQucHJvdG90eXBlLnNldEJ1ZmZlcj1mdW5jdGlvbihhKXt0aGlzLmRvQnVmZmVyPWEsIWEmJnRoaXMuY29ubmVjdGVkJiZ0aGlzLmJ1ZmZlci5sZW5ndGgmJih0aGlzLm9wdGlvbnMubWFudWFsRmx1c2h8fHRoaXMuZmx1c2hCdWZmZXIoKSl9LGQucHJvdG90eXBlLmZsdXNoQnVmZmVyPWZ1bmN0aW9uKCl7dGhpcy50cmFuc3BvcnQucGF5bG9hZCh0aGlzLmJ1ZmZlciksdGhpcy5idWZmZXI9W119LGQucHJvdG90eXBlLmRpc2Nvbm5lY3Q9ZnVuY3Rpb24oKXtpZih0aGlzLmNvbm5lY3RlZHx8dGhpcy5jb25uZWN0aW5nKXRoaXMub3BlbiYmdGhpcy5vZihcIlwiKS5wYWNrZXQoe3R5cGU6XCJkaXNjb25uZWN0XCJ9KSx0aGlzLm9uRGlzY29ubmVjdChcImJvb3RlZFwiKTtyZXR1cm4gdGhpc30sZC5wcm90b3R5cGUuZGlzY29ubmVjdFN5bmM9ZnVuY3Rpb24oKXt2YXIgYT1iLnV0aWwucmVxdWVzdCgpLGM9W1wiaHR0cFwiKyh0aGlzLm9wdGlvbnMuc2VjdXJlP1wic1wiOlwiXCIpK1wiOi9cIix0aGlzLm9wdGlvbnMuaG9zdCtcIjpcIit0aGlzLm9wdGlvbnMucG9ydCx0aGlzLm9wdGlvbnMucmVzb3VyY2UsYi5wcm90b2NvbCxcIlwiLHRoaXMuc2Vzc2lvbmlkXS5qb2luKFwiL1wiKStcIi8/ZGlzY29ubmVjdD0xXCI7YS5vcGVuKFwiR0VUXCIsYywhMSksYS5zZW5kKG51bGwpLHRoaXMub25EaXNjb25uZWN0KFwiYm9vdGVkXCIpfSxkLnByb3RvdHlwZS5pc1hEb21haW49ZnVuY3Rpb24oKXt2YXIgYT1jLmxvY2F0aW9uLnBvcnR8fChcImh0dHBzOlwiPT1jLmxvY2F0aW9uLnByb3RvY29sPzQ0Mzo4MCk7cmV0dXJuIHRoaXMub3B0aW9ucy5ob3N0IT09Yy5sb2NhdGlvbi5ob3N0bmFtZXx8dGhpcy5vcHRpb25zLnBvcnQhPWF9LGQucHJvdG90eXBlLm9uQ29ubmVjdD1mdW5jdGlvbigpe3RoaXMuY29ubmVjdGVkfHwodGhpcy5jb25uZWN0ZWQ9ITAsdGhpcy5jb25uZWN0aW5nPSExLHRoaXMuZG9CdWZmZXJ8fHRoaXMuc2V0QnVmZmVyKCExKSx0aGlzLmVtaXQoXCJjb25uZWN0XCIpKX0sZC5wcm90b3R5cGUub25PcGVuPWZ1bmN0aW9uKCl7dGhpcy5vcGVuPSEwfSxkLnByb3RvdHlwZS5vbkNsb3NlPWZ1bmN0aW9uKCl7dGhpcy5vcGVuPSExLGNsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lcil9LGQucHJvdG90eXBlLm9uUGFja2V0PWZ1bmN0aW9uKGEpe3RoaXMub2YoYS5lbmRwb2ludCkub25QYWNrZXQoYSl9LGQucHJvdG90eXBlLm9uRXJyb3I9ZnVuY3Rpb24oYSl7YSYmYS5hZHZpY2UmJmEuYWR2aWNlPT09XCJyZWNvbm5lY3RcIiYmKHRoaXMuY29ubmVjdGVkfHx0aGlzLmNvbm5lY3RpbmcpJiYodGhpcy5kaXNjb25uZWN0KCksdGhpcy5vcHRpb25zLnJlY29ubmVjdCYmdGhpcy5yZWNvbm5lY3QoKSksdGhpcy5wdWJsaXNoKFwiZXJyb3JcIixhJiZhLnJlYXNvbj9hLnJlYXNvbjphKX0sZC5wcm90b3R5cGUub25EaXNjb25uZWN0PWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuY29ubmVjdGVkLGM9dGhpcy5jb25uZWN0aW5nO3RoaXMuY29ubmVjdGVkPSExLHRoaXMuY29ubmVjdGluZz0hMSx0aGlzLm9wZW49ITE7aWYoYnx8Yyl0aGlzLnRyYW5zcG9ydC5jbG9zZSgpLHRoaXMudHJhbnNwb3J0LmNsZWFyVGltZW91dHMoKSxiJiYodGhpcy5wdWJsaXNoKFwiZGlzY29ubmVjdFwiLGEpLFwiYm9vdGVkXCIhPWEmJnRoaXMub3B0aW9ucy5yZWNvbm5lY3QmJiF0aGlzLnJlY29ubmVjdGluZyYmdGhpcy5yZWNvbm5lY3QoKSl9LGQucHJvdG90eXBlLnJlY29ubmVjdD1mdW5jdGlvbigpe2Z1bmN0aW9uIGUoKXtpZihhLmNvbm5lY3RlZCl7Zm9yKHZhciBiIGluIGEubmFtZXNwYWNlcylhLm5hbWVzcGFjZXMuaGFzT3duUHJvcGVydHkoYikmJlwiXCIhPT1iJiZhLm5hbWVzcGFjZXNbYl0ucGFja2V0KHt0eXBlOlwiY29ubmVjdFwifSk7YS5wdWJsaXNoKFwicmVjb25uZWN0XCIsYS50cmFuc3BvcnQubmFtZSxhLnJlY29ubmVjdGlvbkF0dGVtcHRzKX1jbGVhclRpbWVvdXQoYS5yZWNvbm5lY3Rpb25UaW1lciksYS5yZW1vdmVMaXN0ZW5lcihcImNvbm5lY3RfZmFpbGVkXCIsZiksYS5yZW1vdmVMaXN0ZW5lcihcImNvbm5lY3RcIixmKSxhLnJlY29ubmVjdGluZz0hMSxkZWxldGUgYS5yZWNvbm5lY3Rpb25BdHRlbXB0cyxkZWxldGUgYS5yZWNvbm5lY3Rpb25EZWxheSxkZWxldGUgYS5yZWNvbm5lY3Rpb25UaW1lcixkZWxldGUgYS5yZWRvVHJhbnNwb3J0cyxhLm9wdGlvbnNbXCJ0cnkgbXVsdGlwbGUgdHJhbnNwb3J0c1wiXT1jfWZ1bmN0aW9uIGYoKXtpZighYS5yZWNvbm5lY3RpbmcpcmV0dXJuO2lmKGEuY29ubmVjdGVkKXJldHVybiBlKCk7aWYoYS5jb25uZWN0aW5nJiZhLnJlY29ubmVjdGluZylyZXR1cm4gYS5yZWNvbm5lY3Rpb25UaW1lcj1zZXRUaW1lb3V0KGYsMWUzKTthLnJlY29ubmVjdGlvbkF0dGVtcHRzKys+PWI/YS5yZWRvVHJhbnNwb3J0cz8oYS5wdWJsaXNoKFwicmVjb25uZWN0X2ZhaWxlZFwiKSxlKCkpOihhLm9uKFwiY29ubmVjdF9mYWlsZWRcIixmKSxhLm9wdGlvbnNbXCJ0cnkgbXVsdGlwbGUgdHJhbnNwb3J0c1wiXT0hMCxhLnRyYW5zcG9ydHM9YS5vcmlnVHJhbnNwb3J0cyxhLnRyYW5zcG9ydD1hLmdldFRyYW5zcG9ydCgpLGEucmVkb1RyYW5zcG9ydHM9ITAsYS5jb25uZWN0KCkpOihhLnJlY29ubmVjdGlvbkRlbGF5PGQmJihhLnJlY29ubmVjdGlvbkRlbGF5Kj0yKSxhLmNvbm5lY3QoKSxhLnB1Ymxpc2goXCJyZWNvbm5lY3RpbmdcIixhLnJlY29ubmVjdGlvbkRlbGF5LGEucmVjb25uZWN0aW9uQXR0ZW1wdHMpLGEucmVjb25uZWN0aW9uVGltZXI9c2V0VGltZW91dChmLGEucmVjb25uZWN0aW9uRGVsYXkpKX10aGlzLnJlY29ubmVjdGluZz0hMCx0aGlzLnJlY29ubmVjdGlvbkF0dGVtcHRzPTAsdGhpcy5yZWNvbm5lY3Rpb25EZWxheT10aGlzLm9wdGlvbnNbXCJyZWNvbm5lY3Rpb24gZGVsYXlcIl07dmFyIGE9dGhpcyxiPXRoaXMub3B0aW9uc1tcIm1heCByZWNvbm5lY3Rpb24gYXR0ZW1wdHNcIl0sYz10aGlzLm9wdGlvbnNbXCJ0cnkgbXVsdGlwbGUgdHJhbnNwb3J0c1wiXSxkPXRoaXMub3B0aW9uc1tcInJlY29ubmVjdGlvbiBsaW1pdFwiXTt0aGlzLm9wdGlvbnNbXCJ0cnkgbXVsdGlwbGUgdHJhbnNwb3J0c1wiXT0hMSx0aGlzLnJlY29ubmVjdGlvblRpbWVyPXNldFRpbWVvdXQoZix0aGlzLnJlY29ubmVjdGlvbkRlbGF5KSx0aGlzLm9uKFwiY29ubmVjdFwiLGYpfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMsdGhpcyksZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKGEsYil7dGhpcy5zb2NrZXQ9YSx0aGlzLm5hbWU9Ynx8XCJcIix0aGlzLmZsYWdzPXt9LHRoaXMuanNvbj1uZXcgZCh0aGlzLFwianNvblwiKSx0aGlzLmFja1BhY2tldHM9MCx0aGlzLmFja3M9e319ZnVuY3Rpb24gZChhLGIpe3RoaXMubmFtZXNwYWNlPWEsdGhpcy5uYW1lPWJ9YS5Tb2NrZXROYW1lc3BhY2U9YyxiLnV0aWwubWl4aW4oYyxiLkV2ZW50RW1pdHRlciksYy5wcm90b3R5cGUuJGVtaXQ9Yi5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQsYy5wcm90b3R5cGUub2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb2NrZXQub2YuYXBwbHkodGhpcy5zb2NrZXQsYXJndW1lbnRzKX0sYy5wcm90b3R5cGUucGFja2V0PWZ1bmN0aW9uKGEpe3JldHVybiBhLmVuZHBvaW50PXRoaXMubmFtZSx0aGlzLnNvY2tldC5wYWNrZXQoYSksdGhpcy5mbGFncz17fSx0aGlzfSxjLnByb3RvdHlwZS5zZW5kPWZ1bmN0aW9uKGEsYil7dmFyIGM9e3R5cGU6dGhpcy5mbGFncy5qc29uP1wianNvblwiOlwibWVzc2FnZVwiLGRhdGE6YX07cmV0dXJuXCJmdW5jdGlvblwiPT10eXBlb2YgYiYmKGMuaWQ9Kyt0aGlzLmFja1BhY2tldHMsYy5hY2s9ITAsdGhpcy5hY2tzW2MuaWRdPWIpLHRoaXMucGFja2V0KGMpfSxjLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKGEpe3ZhciBiPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSxjPWJbYi5sZW5ndGgtMV0sZD17dHlwZTpcImV2ZW50XCIsbmFtZTphfTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBjJiYoZC5pZD0rK3RoaXMuYWNrUGFja2V0cyxkLmFjaz1cImRhdGFcIix0aGlzLmFja3NbZC5pZF09YyxiPWIuc2xpY2UoMCxiLmxlbmd0aC0xKSksZC5hcmdzPWIsdGhpcy5wYWNrZXQoZCl9LGMucHJvdG90eXBlLmRpc2Nvbm5lY3Q9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5uYW1lPT09XCJcIj90aGlzLnNvY2tldC5kaXNjb25uZWN0KCk6KHRoaXMucGFja2V0KHt0eXBlOlwiZGlzY29ubmVjdFwifSksdGhpcy4kZW1pdChcImRpc2Nvbm5lY3RcIikpLHRoaXN9LGMucHJvdG90eXBlLm9uUGFja2V0PWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGQoKXtjLnBhY2tldCh7dHlwZTpcImFja1wiLGFyZ3M6Yi51dGlsLnRvQXJyYXkoYXJndW1lbnRzKSxhY2tJZDphLmlkfSl9dmFyIGM9dGhpcztzd2l0Y2goYS50eXBlKXtjYXNlXCJjb25uZWN0XCI6dGhpcy4kZW1pdChcImNvbm5lY3RcIik7YnJlYWs7Y2FzZVwiZGlzY29ubmVjdFwiOnRoaXMubmFtZT09PVwiXCI/dGhpcy5zb2NrZXQub25EaXNjb25uZWN0KGEucmVhc29ufHxcImJvb3RlZFwiKTp0aGlzLiRlbWl0KFwiZGlzY29ubmVjdFwiLGEucmVhc29uKTticmVhaztjYXNlXCJtZXNzYWdlXCI6Y2FzZVwianNvblwiOnZhciBlPVtcIm1lc3NhZ2VcIixhLmRhdGFdO2EuYWNrPT1cImRhdGFcIj9lLnB1c2goZCk6YS5hY2smJnRoaXMucGFja2V0KHt0eXBlOlwiYWNrXCIsYWNrSWQ6YS5pZH0pLHRoaXMuJGVtaXQuYXBwbHkodGhpcyxlKTticmVhaztjYXNlXCJldmVudFwiOnZhciBlPVthLm5hbWVdLmNvbmNhdChhLmFyZ3MpO2EuYWNrPT1cImRhdGFcIiYmZS5wdXNoKGQpLHRoaXMuJGVtaXQuYXBwbHkodGhpcyxlKTticmVhaztjYXNlXCJhY2tcIjp0aGlzLmFja3NbYS5hY2tJZF0mJih0aGlzLmFja3NbYS5hY2tJZF0uYXBwbHkodGhpcyxhLmFyZ3MpLGRlbGV0ZSB0aGlzLmFja3NbYS5hY2tJZF0pO2JyZWFrO2Nhc2VcImVycm9yXCI6YS5hZHZpY2U/dGhpcy5zb2NrZXQub25FcnJvcihhKTphLnJlYXNvbj09XCJ1bmF1dGhvcml6ZWRcIj90aGlzLiRlbWl0KFwiY29ubmVjdF9mYWlsZWRcIixhLnJlYXNvbik6dGhpcy4kZW1pdChcImVycm9yXCIsYS5yZWFzb24pfX0sZC5wcm90b3R5cGUuc2VuZD1mdW5jdGlvbigpe3RoaXMubmFtZXNwYWNlLmZsYWdzW3RoaXMubmFtZV09ITAsdGhpcy5uYW1lc3BhY2Uuc2VuZC5hcHBseSh0aGlzLm5hbWVzcGFjZSxhcmd1bWVudHMpfSxkLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKCl7dGhpcy5uYW1lc3BhY2UuZmxhZ3NbdGhpcy5uYW1lXT0hMCx0aGlzLm5hbWVzcGFjZS5lbWl0LmFwcGx5KHRoaXMubmFtZXNwYWNlLGFyZ3VtZW50cyl9fShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyksZnVuY3Rpb24oYSxiLGMpe2Z1bmN0aW9uIGQoYSl7Yi5UcmFuc3BvcnQuYXBwbHkodGhpcyxhcmd1bWVudHMpfWEud2Vic29ja2V0PWQsYi51dGlsLmluaGVyaXQoZCxiLlRyYW5zcG9ydCksZC5wcm90b3R5cGUubmFtZT1cIndlYnNvY2tldFwiLGQucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24oKXt2YXIgYT1iLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSksZD10aGlzLGU7cmV0dXJuIGV8fChlPWMuTW96V2ViU29ja2V0fHxjLldlYlNvY2tldCksdGhpcy53ZWJzb2NrZXQ9bmV3IGUodGhpcy5wcmVwYXJlVXJsKCkrYSksdGhpcy53ZWJzb2NrZXQub25vcGVuPWZ1bmN0aW9uKCl7ZC5vbk9wZW4oKSxkLnNvY2tldC5zZXRCdWZmZXIoITEpfSx0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2U9ZnVuY3Rpb24oYSl7ZC5vbkRhdGEoYS5kYXRhKX0sdGhpcy53ZWJzb2NrZXQub25jbG9zZT1mdW5jdGlvbigpe2Qub25DbG9zZSgpLGQuc29ja2V0LnNldEJ1ZmZlcighMCl9LHRoaXMud2Vic29ja2V0Lm9uZXJyb3I9ZnVuY3Rpb24oYSl7ZC5vbkVycm9yKGEpfSx0aGlzfSxiLnV0aWwudWEuaURldmljZT9kLnByb3RvdHlwZS5zZW5kPWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXM7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtiLndlYnNvY2tldC5zZW5kKGEpfSwwKSx0aGlzfTpkLnByb3RvdHlwZS5zZW5kPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLndlYnNvY2tldC5zZW5kKGEpLHRoaXN9LGQucHJvdG90eXBlLnBheWxvYWQ9ZnVuY3Rpb24oYSl7Zm9yKHZhciBiPTAsYz1hLmxlbmd0aDtiPGM7YisrKXRoaXMucGFja2V0KGFbYl0pO3JldHVybiB0aGlzfSxkLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLndlYnNvY2tldC5jbG9zZSgpLHRoaXN9LGQucHJvdG90eXBlLm9uRXJyb3I9ZnVuY3Rpb24oYSl7dGhpcy5zb2NrZXQub25FcnJvcihhKX0sZC5wcm90b3R5cGUuc2NoZW1lPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc29ja2V0Lm9wdGlvbnMuc2VjdXJlP1wid3NzXCI6XCJ3c1wifSxkLmNoZWNrPWZ1bmN0aW9uKCl7cmV0dXJuXCJXZWJTb2NrZXRcImluIGMmJiEoXCJfX2FkZFRhc2tcImluIFdlYlNvY2tldCl8fFwiTW96V2ViU29ja2V0XCJpbiBjfSxkLnhkb21haW5DaGVjaz1mdW5jdGlvbigpe3JldHVybiEwfSxiLnRyYW5zcG9ydHMucHVzaChcIndlYnNvY2tldFwiKX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvLlRyYW5zcG9ydDptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzLHRoaXMpLGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYygpe2IuVHJhbnNwb3J0LndlYnNvY2tldC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9YS5mbGFzaHNvY2tldD1jLGIudXRpbC5pbmhlcml0KGMsYi5UcmFuc3BvcnQud2Vic29ja2V0KSxjLnByb3RvdHlwZS5uYW1lPVwiZmxhc2hzb2NrZXRcIixjLnByb3RvdHlwZS5vcGVuPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxjPWFyZ3VtZW50cztyZXR1cm4gV2ViU29ja2V0Ll9fYWRkVGFzayhmdW5jdGlvbigpe2IuVHJhbnNwb3J0LndlYnNvY2tldC5wcm90b3R5cGUub3Blbi5hcHBseShhLGMpfSksdGhpc30sYy5wcm90b3R5cGUuc2VuZD1mdW5jdGlvbigpe3ZhciBhPXRoaXMsYz1hcmd1bWVudHM7cmV0dXJuIFdlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24oKXtiLlRyYW5zcG9ydC53ZWJzb2NrZXQucHJvdG90eXBlLnNlbmQuYXBwbHkoYSxjKX0pLHRoaXN9LGMucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7cmV0dXJuIFdlYlNvY2tldC5fX3Rhc2tzLmxlbmd0aD0wLGIuVHJhbnNwb3J0LndlYnNvY2tldC5wcm90b3R5cGUuY2xvc2UuY2FsbCh0aGlzKSx0aGlzfSxjLnByb3RvdHlwZS5yZWFkeT1mdW5jdGlvbihhLGQpe2Z1bmN0aW9uIGUoKXt2YXIgYj1hLm9wdGlvbnMsZT1iW1wiZmxhc2ggcG9saWN5IHBvcnRcIl0sZz1bXCJodHRwXCIrKGIuc2VjdXJlP1wic1wiOlwiXCIpK1wiOi9cIixiLmhvc3QrXCI6XCIrYi5wb3J0LGIucmVzb3VyY2UsXCJzdGF0aWMvZmxhc2hzb2NrZXRcIixcIldlYlNvY2tldE1haW5cIisoYS5pc1hEb21haW4oKT9cIkluc2VjdXJlXCI6XCJcIikrXCIuc3dmXCJdO2MubG9hZGVkfHwodHlwZW9mIFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OPT1cInVuZGVmaW5lZFwiJiYoV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT049Zy5qb2luKFwiL1wiKSksZSE9PTg0MyYmV2ViU29ja2V0LmxvYWRGbGFzaFBvbGljeUZpbGUoXCJ4bWxzb2NrZXQ6Ly9cIitiLmhvc3QrXCI6XCIrZSksV2ViU29ja2V0Ll9faW5pdGlhbGl6ZSgpLGMubG9hZGVkPSEwKSxkLmNhbGwoZil9dmFyIGY9dGhpcztpZihkb2N1bWVudC5ib2R5KXJldHVybiBlKCk7Yi51dGlsLmxvYWQoZSl9LGMuY2hlY2s9ZnVuY3Rpb24oKXtyZXR1cm4gdHlwZW9mIFdlYlNvY2tldCE9XCJ1bmRlZmluZWRcIiYmXCJfX2luaXRpYWxpemVcImluIFdlYlNvY2tldCYmISFzd2ZvYmplY3Q/c3dmb2JqZWN0LmdldEZsYXNoUGxheWVyVmVyc2lvbigpLm1ham9yPj0xMDohMX0sYy54ZG9tYWluQ2hlY2s9ZnVuY3Rpb24oKXtyZXR1cm4hMH0sdHlwZW9mIHdpbmRvdyE9XCJ1bmRlZmluZWRcIiYmKFdFQl9TT0NLRVRfRElTQUJMRV9BVVRPX0lOSVRJQUxJWkFUSU9OPSEwKSxiLnRyYW5zcG9ydHMucHVzaChcImZsYXNoc29ja2V0XCIpfShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW8uVHJhbnNwb3J0Om1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMpO2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cpdmFyIHN3Zm9iamVjdD1mdW5jdGlvbigpe2Z1bmN0aW9uIEEoKXtpZih0KXJldHVybjt0cnl7dmFyIGE9aS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uYXBwZW5kQ2hpbGQoUShcInNwYW5cIikpO2EucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhKX1jYXRjaChiKXtyZXR1cm59dD0hMDt2YXIgYz1sLmxlbmd0aDtmb3IodmFyIGQ9MDtkPGM7ZCsrKWxbZF0oKX1mdW5jdGlvbiBCKGEpe3Q/YSgpOmxbbC5sZW5ndGhdPWF9ZnVuY3Rpb24gQyhiKXtpZih0eXBlb2YgaC5hZGRFdmVudExpc3RlbmVyIT1hKWguYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixiLCExKTtlbHNlIGlmKHR5cGVvZiBpLmFkZEV2ZW50TGlzdGVuZXIhPWEpaS5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGIsITEpO2Vsc2UgaWYodHlwZW9mIGguYXR0YWNoRXZlbnQhPWEpUihoLFwib25sb2FkXCIsYik7ZWxzZSBpZih0eXBlb2YgaC5vbmxvYWQ9PVwiZnVuY3Rpb25cIil7dmFyIGM9aC5vbmxvYWQ7aC5vbmxvYWQ9ZnVuY3Rpb24oKXtjKCksYigpfX1lbHNlIGgub25sb2FkPWJ9ZnVuY3Rpb24gRCgpe2s/RSgpOkYoKX1mdW5jdGlvbiBFKCl7dmFyIGM9aS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0sZD1RKGIpO2Quc2V0QXR0cmlidXRlKFwidHlwZVwiLGUpO3ZhciBmPWMuYXBwZW5kQ2hpbGQoZCk7aWYoZil7dmFyIGc9MDsoZnVuY3Rpb24oKXtpZih0eXBlb2YgZi5HZXRWYXJpYWJsZSE9YSl7dmFyIGI9Zi5HZXRWYXJpYWJsZShcIiR2ZXJzaW9uXCIpO2ImJihiPWIuc3BsaXQoXCIgXCIpWzFdLnNwbGl0KFwiLFwiKSx5LnB2PVtwYXJzZUludChiWzBdLDEwKSxwYXJzZUludChiWzFdLDEwKSxwYXJzZUludChiWzJdLDEwKV0pfWVsc2UgaWYoZzwxMCl7ZysrLHNldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCk7cmV0dXJufWMucmVtb3ZlQ2hpbGQoZCksZj1udWxsLEYoKX0pKCl9ZWxzZSBGKCl9ZnVuY3Rpb24gRigpe3ZhciBiPW0ubGVuZ3RoO2lmKGI+MClmb3IodmFyIGM9MDtjPGI7YysrKXt2YXIgZD1tW2NdLmlkLGU9bVtjXS5jYWxsYmFja0ZuLGY9e3N1Y2Nlc3M6ITEsaWQ6ZH07aWYoeS5wdlswXT4wKXt2YXIgZz1QKGQpO2lmKGcpaWYoUyhtW2NdLnN3ZlZlcnNpb24pJiYhKHkud2smJnkud2s8MzEyKSlVKGQsITApLGUmJihmLnN1Y2Nlc3M9ITAsZi5yZWY9RyhkKSxlKGYpKTtlbHNlIGlmKG1bY10uZXhwcmVzc0luc3RhbGwmJkgoKSl7dmFyIGg9e307aC5kYXRhPW1bY10uZXhwcmVzc0luc3RhbGwsaC53aWR0aD1nLmdldEF0dHJpYnV0ZShcIndpZHRoXCIpfHxcIjBcIixoLmhlaWdodD1nLmdldEF0dHJpYnV0ZShcImhlaWdodFwiKXx8XCIwXCIsZy5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSYmKGguc3R5bGVjbGFzcz1nLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpKSxnLmdldEF0dHJpYnV0ZShcImFsaWduXCIpJiYoaC5hbGlnbj1nLmdldEF0dHJpYnV0ZShcImFsaWduXCIpKTt2YXIgaT17fSxqPWcuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwYXJhbVwiKSxrPWoubGVuZ3RoO2Zvcih2YXIgbD0wO2w8aztsKyspaltsXS5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpLnRvTG93ZXJDYXNlKCkhPVwibW92aWVcIiYmKGlbaltsXS5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpXT1qW2xdLmdldEF0dHJpYnV0ZShcInZhbHVlXCIpKTtJKGgsaSxkLGUpfWVsc2UgSihnKSxlJiZlKGYpfWVsc2V7VShkLCEwKTtpZihlKXt2YXIgbj1HKGQpO24mJnR5cGVvZiBuLlNldFZhcmlhYmxlIT1hJiYoZi5zdWNjZXNzPSEwLGYucmVmPW4pLGUoZil9fX19ZnVuY3Rpb24gRyhjKXt2YXIgZD1udWxsLGU9UChjKTtpZihlJiZlLm5vZGVOYW1lPT1cIk9CSkVDVFwiKWlmKHR5cGVvZiBlLlNldFZhcmlhYmxlIT1hKWQ9ZTtlbHNle3ZhciBmPWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYilbMF07ZiYmKGQ9Zil9cmV0dXJuIGR9ZnVuY3Rpb24gSCgpe3JldHVybiF1JiZTKFwiNi4wLjY1XCIpJiYoeS53aW58fHkubWFjKSYmISh5LndrJiZ5LndrPDMxMil9ZnVuY3Rpb24gSShiLGMsZCxlKXt1PSEwLHI9ZXx8bnVsbCxzPXtzdWNjZXNzOiExLGlkOmR9O3ZhciBnPVAoZCk7aWYoZyl7Zy5ub2RlTmFtZT09XCJPQkpFQ1RcIj8ocD1LKGcpLHE9bnVsbCk6KHA9ZyxxPWQpLGIuaWQ9ZjtpZih0eXBlb2YgYi53aWR0aD09YXx8IS8lJC8udGVzdChiLndpZHRoKSYmcGFyc2VJbnQoYi53aWR0aCwxMCk8MzEwKWIud2lkdGg9XCIzMTBcIjtpZih0eXBlb2YgYi5oZWlnaHQ9PWF8fCEvJSQvLnRlc3QoYi5oZWlnaHQpJiZwYXJzZUludChiLmhlaWdodCwxMCk8MTM3KWIuaGVpZ2h0PVwiMTM3XCI7aS50aXRsZT1pLnRpdGxlLnNsaWNlKDAsNDcpK1wiIC0gRmxhc2ggUGxheWVyIEluc3RhbGxhdGlvblwiO3ZhciBqPXkuaWUmJnkud2luP1tcIkFjdGl2ZVwiXS5jb25jYXQoXCJcIikuam9pbihcIlhcIik6XCJQbHVnSW5cIixrPVwiTU1yZWRpcmVjdFVSTD1cIitoLmxvY2F0aW9uLnRvU3RyaW5nKCkucmVwbGFjZSgvJi9nLFwiJTI2XCIpK1wiJk1NcGxheWVyVHlwZT1cIitqK1wiJk1NZG9jdGl0bGU9XCIraS50aXRsZTt0eXBlb2YgYy5mbGFzaHZhcnMhPWE/Yy5mbGFzaHZhcnMrPVwiJlwiK2s6Yy5mbGFzaHZhcnM9aztpZih5LmllJiZ5LndpbiYmZy5yZWFkeVN0YXRlIT00KXt2YXIgbD1RKFwiZGl2XCIpO2QrPVwiU1dGT2JqZWN0TmV3XCIsbC5zZXRBdHRyaWJ1dGUoXCJpZFwiLGQpLGcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobCxnKSxnLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsZnVuY3Rpb24oKXtnLnJlYWR5U3RhdGU9PTQ/Zy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGcpOnNldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCl9KCl9TChiLGMsZCl9fWZ1bmN0aW9uIEooYSl7aWYoeS5pZSYmeS53aW4mJmEucmVhZHlTdGF0ZSE9NCl7dmFyIGI9UShcImRpdlwiKTthLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGIsYSksYi5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChLKGEpLGIpLGEuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixmdW5jdGlvbigpe2EucmVhZHlTdGF0ZT09ND9hLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYSk6c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKX0oKX1lbHNlIGEucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoSyhhKSxhKX1mdW5jdGlvbiBLKGEpe3ZhciBjPVEoXCJkaXZcIik7aWYoeS53aW4mJnkuaWUpYy5pbm5lckhUTUw9YS5pbm5lckhUTUw7ZWxzZXt2YXIgZD1hLmdldEVsZW1lbnRzQnlUYWdOYW1lKGIpWzBdO2lmKGQpe3ZhciBlPWQuY2hpbGROb2RlcztpZihlKXt2YXIgZj1lLmxlbmd0aDtmb3IodmFyIGc9MDtnPGY7ZysrKShlW2ddLm5vZGVUeXBlIT0xfHxlW2ddLm5vZGVOYW1lIT1cIlBBUkFNXCIpJiZlW2ddLm5vZGVUeXBlIT04JiZjLmFwcGVuZENoaWxkKGVbZ10uY2xvbmVOb2RlKCEwKSl9fX1yZXR1cm4gY31mdW5jdGlvbiBMKGMsZCxmKXt2YXIgZyxoPVAoZik7aWYoeS53ayYmeS53azwzMTIpcmV0dXJuIGc7aWYoaCl7dHlwZW9mIGMuaWQ9PWEmJihjLmlkPWYpO2lmKHkuaWUmJnkud2luKXt2YXIgaT1cIlwiO2Zvcih2YXIgaiBpbiBjKWNbal0hPU9iamVjdC5wcm90b3R5cGVbal0mJihqLnRvTG93ZXJDYXNlKCk9PVwiZGF0YVwiP2QubW92aWU9Y1tqXTpqLnRvTG93ZXJDYXNlKCk9PVwic3R5bGVjbGFzc1wiP2krPScgY2xhc3M9XCInK2Nbal0rJ1wiJzpqLnRvTG93ZXJDYXNlKCkhPVwiY2xhc3NpZFwiJiYoaSs9XCIgXCIraisnPVwiJytjW2pdKydcIicpKTt2YXIgaz1cIlwiO2Zvcih2YXIgbCBpbiBkKWRbbF0hPU9iamVjdC5wcm90b3R5cGVbbF0mJihrKz0nPHBhcmFtIG5hbWU9XCInK2wrJ1wiIHZhbHVlPVwiJytkW2xdKydcIiAvPicpO2gub3V0ZXJIVE1MPSc8b2JqZWN0IGNsYXNzaWQ9XCJjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDBcIicraStcIj5cIitrK1wiPC9vYmplY3Q+XCIsbltuLmxlbmd0aF09Yy5pZCxnPVAoYy5pZCl9ZWxzZXt2YXIgbT1RKGIpO20uc2V0QXR0cmlidXRlKFwidHlwZVwiLGUpO2Zvcih2YXIgbyBpbiBjKWNbb10hPU9iamVjdC5wcm90b3R5cGVbb10mJihvLnRvTG93ZXJDYXNlKCk9PVwic3R5bGVjbGFzc1wiP20uc2V0QXR0cmlidXRlKFwiY2xhc3NcIixjW29dKTpvLnRvTG93ZXJDYXNlKCkhPVwiY2xhc3NpZFwiJiZtLnNldEF0dHJpYnV0ZShvLGNbb10pKTtmb3IodmFyIHAgaW4gZClkW3BdIT1PYmplY3QucHJvdG90eXBlW3BdJiZwLnRvTG93ZXJDYXNlKCkhPVwibW92aWVcIiYmTShtLHAsZFtwXSk7aC5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChtLGgpLGc9bX19cmV0dXJuIGd9ZnVuY3Rpb24gTShhLGIsYyl7dmFyIGQ9UShcInBhcmFtXCIpO2Quc2V0QXR0cmlidXRlKFwibmFtZVwiLGIpLGQuc2V0QXR0cmlidXRlKFwidmFsdWVcIixjKSxhLmFwcGVuZENoaWxkKGQpfWZ1bmN0aW9uIE4oYSl7dmFyIGI9UChhKTtiJiZiLm5vZGVOYW1lPT1cIk9CSkVDVFwiJiYoeS5pZSYmeS53aW4/KGIuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixmdW5jdGlvbigpe2IucmVhZHlTdGF0ZT09ND9PKGEpOnNldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCl9KCkpOmIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiKSl9ZnVuY3Rpb24gTyhhKXt2YXIgYj1QKGEpO2lmKGIpe2Zvcih2YXIgYyBpbiBiKXR5cGVvZiBiW2NdPT1cImZ1bmN0aW9uXCImJihiW2NdPW51bGwpO2IucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChiKX19ZnVuY3Rpb24gUChhKXt2YXIgYj1udWxsO3RyeXtiPWkuZ2V0RWxlbWVudEJ5SWQoYSl9Y2F0Y2goYyl7fXJldHVybiBifWZ1bmN0aW9uIFEoYSl7cmV0dXJuIGkuY3JlYXRlRWxlbWVudChhKX1mdW5jdGlvbiBSKGEsYixjKXthLmF0dGFjaEV2ZW50KGIsYyksb1tvLmxlbmd0aF09W2EsYixjXX1mdW5jdGlvbiBTKGEpe3ZhciBiPXkucHYsYz1hLnNwbGl0KFwiLlwiKTtyZXR1cm4gY1swXT1wYXJzZUludChjWzBdLDEwKSxjWzFdPXBhcnNlSW50KGNbMV0sMTApfHwwLGNbMl09cGFyc2VJbnQoY1syXSwxMCl8fDAsYlswXT5jWzBdfHxiWzBdPT1jWzBdJiZiWzFdPmNbMV18fGJbMF09PWNbMF0mJmJbMV09PWNbMV0mJmJbMl0+PWNbMl0/ITA6ITF9ZnVuY3Rpb24gVChjLGQsZSxmKXtpZih5LmllJiZ5Lm1hYylyZXR1cm47dmFyIGc9aS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07aWYoIWcpcmV0dXJuO3ZhciBoPWUmJnR5cGVvZiBlPT1cInN0cmluZ1wiP2U6XCJzY3JlZW5cIjtmJiYodj1udWxsLHc9bnVsbCk7aWYoIXZ8fHchPWgpe3ZhciBqPVEoXCJzdHlsZVwiKTtqLnNldEF0dHJpYnV0ZShcInR5cGVcIixcInRleHQvY3NzXCIpLGouc2V0QXR0cmlidXRlKFwibWVkaWFcIixoKSx2PWcuYXBwZW5kQ2hpbGQoaikseS5pZSYmeS53aW4mJnR5cGVvZiBpLnN0eWxlU2hlZXRzIT1hJiZpLnN0eWxlU2hlZXRzLmxlbmd0aD4wJiYodj1pLnN0eWxlU2hlZXRzW2kuc3R5bGVTaGVldHMubGVuZ3RoLTFdKSx3PWh9eS5pZSYmeS53aW4/diYmdHlwZW9mIHYuYWRkUnVsZT09YiYmdi5hZGRSdWxlKGMsZCk6diYmdHlwZW9mIGkuY3JlYXRlVGV4dE5vZGUhPWEmJnYuYXBwZW5kQ2hpbGQoaS5jcmVhdGVUZXh0Tm9kZShjK1wiIHtcIitkK1wifVwiKSl9ZnVuY3Rpb24gVShhLGIpe2lmKCF4KXJldHVybjt2YXIgYz1iP1widmlzaWJsZVwiOlwiaGlkZGVuXCI7dCYmUChhKT9QKGEpLnN0eWxlLnZpc2liaWxpdHk9YzpUKFwiI1wiK2EsXCJ2aXNpYmlsaXR5OlwiK2MpfWZ1bmN0aW9uIFYoYil7dmFyIGM9L1tcXFxcXFxcIjw+XFwuO10vLGQ9Yy5leGVjKGIpIT1udWxsO3JldHVybiBkJiZ0eXBlb2YgZW5jb2RlVVJJQ29tcG9uZW50IT1hP2VuY29kZVVSSUNvbXBvbmVudChiKTpifXZhciBhPVwidW5kZWZpbmVkXCIsYj1cIm9iamVjdFwiLGM9XCJTaG9ja3dhdmUgRmxhc2hcIixkPVwiU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2hcIixlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIixmPVwiU1dGT2JqZWN0RXhwckluc3RcIixnPVwib25yZWFkeXN0YXRlY2hhbmdlXCIsaD13aW5kb3csaT1kb2N1bWVudCxqPW5hdmlnYXRvcixrPSExLGw9W0RdLG09W10sbj1bXSxvPVtdLHAscSxyLHMsdD0hMSx1PSExLHYsdyx4PSEwLHk9ZnVuY3Rpb24oKXt2YXIgZj10eXBlb2YgaS5nZXRFbGVtZW50QnlJZCE9YSYmdHlwZW9mIGkuZ2V0RWxlbWVudHNCeVRhZ05hbWUhPWEmJnR5cGVvZiBpLmNyZWF0ZUVsZW1lbnQhPWEsZz1qLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLGw9ai5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLG09bD8vd2luLy50ZXN0KGwpOi93aW4vLnRlc3QoZyksbj1sPy9tYWMvLnRlc3QobCk6L21hYy8udGVzdChnKSxvPS93ZWJraXQvLnRlc3QoZyk/cGFyc2VGbG9hdChnLnJlcGxhY2UoL14uKndlYmtpdFxcLyhcXGQrKFxcLlxcZCspPykuKiQvLFwiJDFcIikpOiExLHA9ITEscT1bMCwwLDBdLHI9bnVsbDtpZih0eXBlb2Ygai5wbHVnaW5zIT1hJiZ0eXBlb2Ygai5wbHVnaW5zW2NdPT1iKXI9ai5wbHVnaW5zW2NdLmRlc2NyaXB0aW9uLHImJih0eXBlb2Ygai5taW1lVHlwZXM9PWF8fCFqLm1pbWVUeXBlc1tlXXx8ISFqLm1pbWVUeXBlc1tlXS5lbmFibGVkUGx1Z2luKSYmKGs9ITAscD0hMSxyPXIucmVwbGFjZSgvXi4qXFxzKyhcXFMrXFxzK1xcUyskKS8sXCIkMVwiKSxxWzBdPXBhcnNlSW50KHIucmVwbGFjZSgvXiguKilcXC4uKiQvLFwiJDFcIiksMTApLHFbMV09cGFyc2VJbnQoci5yZXBsYWNlKC9eLipcXC4oLiopXFxzLiokLyxcIiQxXCIpLDEwKSxxWzJdPS9bYS16QS1aXS8udGVzdChyKT9wYXJzZUludChyLnJlcGxhY2UoL14uKlthLXpBLVpdKyguKikkLyxcIiQxXCIpLDEwKTowKTtlbHNlIGlmKHR5cGVvZiBoW1tcIkFjdGl2ZVwiXS5jb25jYXQoXCJPYmplY3RcIikuam9pbihcIlhcIildIT1hKXRyeXt2YXIgcz1uZXcod2luZG93W1tcIkFjdGl2ZVwiXS5jb25jYXQoXCJPYmplY3RcIikuam9pbihcIlhcIildKShkKTtzJiYocj1zLkdldFZhcmlhYmxlKFwiJHZlcnNpb25cIiksciYmKHA9ITAscj1yLnNwbGl0KFwiIFwiKVsxXS5zcGxpdChcIixcIikscT1bcGFyc2VJbnQoclswXSwxMCkscGFyc2VJbnQoclsxXSwxMCkscGFyc2VJbnQoclsyXSwxMCldKSl9Y2F0Y2godCl7fXJldHVybnt3MzpmLHB2OnEsd2s6byxpZTpwLHdpbjptLG1hYzpufX0oKSx6PWZ1bmN0aW9uKCl7aWYoIXkudzMpcmV0dXJuOyh0eXBlb2YgaS5yZWFkeVN0YXRlIT1hJiZpLnJlYWR5U3RhdGU9PVwiY29tcGxldGVcInx8dHlwZW9mIGkucmVhZHlTdGF0ZT09YSYmKGkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJib2R5XCIpWzBdfHxpLmJvZHkpKSYmQSgpLHR8fCh0eXBlb2YgaS5hZGRFdmVudExpc3RlbmVyIT1hJiZpLmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsQSwhMSkseS5pZSYmeS53aW4mJihpLmF0dGFjaEV2ZW50KGcsZnVuY3Rpb24oKXtpLnJlYWR5U3RhdGU9PVwiY29tcGxldGVcIiYmKGkuZGV0YWNoRXZlbnQoZyxhcmd1bWVudHMuY2FsbGVlKSxBKCkpfSksaD09dG9wJiZmdW5jdGlvbigpe2lmKHQpcmV0dXJuO3RyeXtpLmRvY3VtZW50RWxlbWVudC5kb1Njcm9sbChcImxlZnRcIil9Y2F0Y2goYSl7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDApO3JldHVybn1BKCl9KCkpLHkud2smJmZ1bmN0aW9uKCl7aWYodClyZXR1cm47aWYoIS9sb2FkZWR8Y29tcGxldGUvLnRlc3QoaS5yZWFkeVN0YXRlKSl7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDApO3JldHVybn1BKCl9KCksQyhBKSl9KCksVz1mdW5jdGlvbigpe3kuaWUmJnkud2luJiZ3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbnVubG9hZFwiLGZ1bmN0aW9uKCl7dmFyIGE9by5sZW5ndGg7Zm9yKHZhciBiPTA7YjxhO2IrKylvW2JdWzBdLmRldGFjaEV2ZW50KG9bYl1bMV0sb1tiXVsyXSk7dmFyIGM9bi5sZW5ndGg7Zm9yKHZhciBkPTA7ZDxjO2QrKylOKG5bZF0pO2Zvcih2YXIgZSBpbiB5KXlbZV09bnVsbDt5PW51bGw7Zm9yKHZhciBmIGluIHN3Zm9iamVjdClzd2ZvYmplY3RbZl09bnVsbDtzd2ZvYmplY3Q9bnVsbH0pfSgpO3JldHVybntyZWdpc3Rlck9iamVjdDpmdW5jdGlvbihhLGIsYyxkKXtpZih5LnczJiZhJiZiKXt2YXIgZT17fTtlLmlkPWEsZS5zd2ZWZXJzaW9uPWIsZS5leHByZXNzSW5zdGFsbD1jLGUuY2FsbGJhY2tGbj1kLG1bbS5sZW5ndGhdPWUsVShhLCExKX1lbHNlIGQmJmQoe3N1Y2Nlc3M6ITEsaWQ6YX0pfSxnZXRPYmplY3RCeUlkOmZ1bmN0aW9uKGEpe2lmKHkudzMpcmV0dXJuIEcoYSl9LGVtYmVkU1dGOmZ1bmN0aW9uKGMsZCxlLGYsZyxoLGksaixrLGwpe3ZhciBtPXtzdWNjZXNzOiExLGlkOmR9O3kudzMmJiEoeS53ayYmeS53azwzMTIpJiZjJiZkJiZlJiZmJiZnPyhVKGQsITEpLEIoZnVuY3Rpb24oKXtlKz1cIlwiLGYrPVwiXCI7dmFyIG49e307aWYoayYmdHlwZW9mIGs9PT1iKWZvcih2YXIgbyBpbiBrKW5bb109a1tvXTtuLmRhdGE9YyxuLndpZHRoPWUsbi5oZWlnaHQ9Zjt2YXIgcD17fTtpZihqJiZ0eXBlb2Ygaj09PWIpZm9yKHZhciBxIGluIGopcFtxXT1qW3FdO2lmKGkmJnR5cGVvZiBpPT09Yilmb3IodmFyIHIgaW4gaSl0eXBlb2YgcC5mbGFzaHZhcnMhPWE/cC5mbGFzaHZhcnMrPVwiJlwiK3IrXCI9XCIraVtyXTpwLmZsYXNodmFycz1yK1wiPVwiK2lbcl07aWYoUyhnKSl7dmFyIHM9TChuLHAsZCk7bi5pZD09ZCYmVShkLCEwKSxtLnN1Y2Nlc3M9ITAsbS5yZWY9c31lbHNle2lmKGgmJkgoKSl7bi5kYXRhPWgsSShuLHAsZCxsKTtyZXR1cm59VShkLCEwKX1sJiZsKG0pfSkpOmwmJmwobSl9LHN3aXRjaE9mZkF1dG9IaWRlU2hvdzpmdW5jdGlvbigpe3g9ITF9LHVhOnksZ2V0Rmxhc2hQbGF5ZXJWZXJzaW9uOmZ1bmN0aW9uKCl7cmV0dXJue21ham9yOnkucHZbMF0sbWlub3I6eS5wdlsxXSxyZWxlYXNlOnkucHZbMl19fSxoYXNGbGFzaFBsYXllclZlcnNpb246UyxjcmVhdGVTV0Y6ZnVuY3Rpb24oYSxiLGMpe3JldHVybiB5LnczP0woYSxiLGMpOnVuZGVmaW5lZH0sc2hvd0V4cHJlc3NJbnN0YWxsOmZ1bmN0aW9uKGEsYixjLGQpe3kudzMmJkgoKSYmSShhLGIsYyxkKX0scmVtb3ZlU1dGOmZ1bmN0aW9uKGEpe3kudzMmJk4oYSl9LGNyZWF0ZUNTUzpmdW5jdGlvbihhLGIsYyxkKXt5LnczJiZUKGEsYixjLGQpfSxhZGREb21Mb2FkRXZlbnQ6QixhZGRMb2FkRXZlbnQ6QyxnZXRRdWVyeVBhcmFtVmFsdWU6ZnVuY3Rpb24oYSl7dmFyIGI9aS5sb2NhdGlvbi5zZWFyY2h8fGkubG9jYXRpb24uaGFzaDtpZihiKXsvXFw/Ly50ZXN0KGIpJiYoYj1iLnNwbGl0KFwiP1wiKVsxXSk7aWYoYT09bnVsbClyZXR1cm4gVihiKTt2YXIgYz1iLnNwbGl0KFwiJlwiKTtmb3IodmFyIGQ9MDtkPGMubGVuZ3RoO2QrKylpZihjW2RdLnN1YnN0cmluZygwLGNbZF0uaW5kZXhPZihcIj1cIikpPT1hKXJldHVybiBWKGNbZF0uc3Vic3RyaW5nKGNbZF0uaW5kZXhPZihcIj1cIikrMSkpfXJldHVyblwiXCJ9LGV4cHJlc3NJbnN0YWxsQ2FsbGJhY2s6ZnVuY3Rpb24oKXtpZih1KXt2YXIgYT1QKGYpO2EmJnAmJihhLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKHAsYSkscSYmKFUocSwhMCkseS5pZSYmeS53aW4mJihwLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wiKSksciYmcihzKSksdT0hMX19fX0oKTsoZnVuY3Rpb24oKXtpZihcInVuZGVmaW5lZFwiPT10eXBlb2Ygd2luZG93fHx3aW5kb3cuV2ViU29ja2V0KXJldHVybjt2YXIgYT13aW5kb3cuY29uc29sZTtpZighYXx8IWEubG9nfHwhYS5lcnJvcilhPXtsb2c6ZnVuY3Rpb24oKXt9LGVycm9yOmZ1bmN0aW9uKCl7fX07aWYoIXN3Zm9iamVjdC5oYXNGbGFzaFBsYXllclZlcnNpb24oXCIxMC4wLjBcIikpe2EuZXJyb3IoXCJGbGFzaCBQbGF5ZXIgPj0gMTAuMC4wIGlzIHJlcXVpcmVkLlwiKTtyZXR1cm59bG9jYXRpb24ucHJvdG9jb2w9PVwiZmlsZTpcIiYmYS5lcnJvcihcIldBUk5JTkc6IHdlYi1zb2NrZXQtanMgZG9lc24ndCB3b3JrIGluIGZpbGU6Ly8vLi4uIFVSTCB1bmxlc3MgeW91IHNldCBGbGFzaCBTZWN1cml0eSBTZXR0aW5ncyBwcm9wZXJseS4gT3BlbiB0aGUgcGFnZSB2aWEgV2ViIHNlcnZlciBpLmUuIGh0dHA6Ly8uLi5cIiksV2ViU29ja2V0PWZ1bmN0aW9uKGEsYixjLGQsZSl7dmFyIGY9dGhpcztmLl9faWQ9V2ViU29ja2V0Ll9fbmV4dElkKyssV2ViU29ja2V0Ll9faW5zdGFuY2VzW2YuX19pZF09ZixmLnJlYWR5U3RhdGU9V2ViU29ja2V0LkNPTk5FQ1RJTkcsZi5idWZmZXJlZEFtb3VudD0wLGYuX19ldmVudHM9e30sYj90eXBlb2YgYj09XCJzdHJpbmdcIiYmKGI9W2JdKTpiPVtdLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtXZWJTb2NrZXQuX19hZGRUYXNrKGZ1bmN0aW9uKCl7V2ViU29ja2V0Ll9fZmxhc2guY3JlYXRlKGYuX19pZCxhLGIsY3x8bnVsbCxkfHwwLGV8fG51bGwpfSl9LDApfSxXZWJTb2NrZXQucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oYSl7aWYodGhpcy5yZWFkeVN0YXRlPT1XZWJTb2NrZXQuQ09OTkVDVElORyl0aHJvd1wiSU5WQUxJRF9TVEFURV9FUlI6IFdlYiBTb2NrZXQgY29ubmVjdGlvbiBoYXMgbm90IGJlZW4gZXN0YWJsaXNoZWRcIjt2YXIgYj1XZWJTb2NrZXQuX19mbGFzaC5zZW5kKHRoaXMuX19pZCxlbmNvZGVVUklDb21wb25lbnQoYSkpO3JldHVybiBiPDA/ITA6KHRoaXMuYnVmZmVyZWRBbW91bnQrPWIsITEpfSxXZWJTb2NrZXQucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7aWYodGhpcy5yZWFkeVN0YXRlPT1XZWJTb2NrZXQuQ0xPU0VEfHx0aGlzLnJlYWR5U3RhdGU9PVdlYlNvY2tldC5DTE9TSU5HKXJldHVybjt0aGlzLnJlYWR5U3RhdGU9V2ViU29ja2V0LkNMT1NJTkcsV2ViU29ja2V0Ll9fZmxhc2guY2xvc2UodGhpcy5fX2lkKX0sV2ViU29ja2V0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyPWZ1bmN0aW9uKGEsYixjKXthIGluIHRoaXMuX19ldmVudHN8fCh0aGlzLl9fZXZlbnRzW2FdPVtdKSx0aGlzLl9fZXZlbnRzW2FdLnB1c2goYil9LFdlYlNvY2tldC5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lcj1mdW5jdGlvbihhLGIsYyl7aWYoIShhIGluIHRoaXMuX19ldmVudHMpKXJldHVybjt2YXIgZD10aGlzLl9fZXZlbnRzW2FdO2Zvcih2YXIgZT1kLmxlbmd0aC0xO2U+PTA7LS1lKWlmKGRbZV09PT1iKXtkLnNwbGljZShlLDEpO2JyZWFrfX0sV2ViU29ja2V0LnByb3RvdHlwZS5kaXNwYXRjaEV2ZW50PWZ1bmN0aW9uKGEpe3ZhciBiPXRoaXMuX19ldmVudHNbYS50eXBlXXx8W107Zm9yKHZhciBjPTA7YzxiLmxlbmd0aDsrK2MpYltjXShhKTt2YXIgZD10aGlzW1wib25cIithLnR5cGVdO2QmJmQoYSl9LFdlYlNvY2tldC5wcm90b3R5cGUuX19oYW5kbGVFdmVudD1mdW5jdGlvbihhKXtcInJlYWR5U3RhdGVcImluIGEmJih0aGlzLnJlYWR5U3RhdGU9YS5yZWFkeVN0YXRlKSxcInByb3RvY29sXCJpbiBhJiYodGhpcy5wcm90b2NvbD1hLnByb3RvY29sKTt2YXIgYjtpZihhLnR5cGU9PVwib3BlblwifHxhLnR5cGU9PVwiZXJyb3JcIiliPXRoaXMuX19jcmVhdGVTaW1wbGVFdmVudChhLnR5cGUpO2Vsc2UgaWYoYS50eXBlPT1cImNsb3NlXCIpYj10aGlzLl9fY3JlYXRlU2ltcGxlRXZlbnQoXCJjbG9zZVwiKTtlbHNle2lmKGEudHlwZSE9XCJtZXNzYWdlXCIpdGhyb3dcInVua25vd24gZXZlbnQgdHlwZTogXCIrYS50eXBlO3ZhciBjPWRlY29kZVVSSUNvbXBvbmVudChhLm1lc3NhZ2UpO2I9dGhpcy5fX2NyZWF0ZU1lc3NhZ2VFdmVudChcIm1lc3NhZ2VcIixjKX10aGlzLmRpc3BhdGNoRXZlbnQoYil9LFdlYlNvY2tldC5wcm90b3R5cGUuX19jcmVhdGVTaW1wbGVFdmVudD1mdW5jdGlvbihhKXtpZihkb2N1bWVudC5jcmVhdGVFdmVudCYmd2luZG93LkV2ZW50KXt2YXIgYj1kb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO3JldHVybiBiLmluaXRFdmVudChhLCExLCExKSxifXJldHVybnt0eXBlOmEsYnViYmxlczohMSxjYW5jZWxhYmxlOiExfX0sV2ViU29ja2V0LnByb3RvdHlwZS5fX2NyZWF0ZU1lc3NhZ2VFdmVudD1mdW5jdGlvbihhLGIpe2lmKGRvY3VtZW50LmNyZWF0ZUV2ZW50JiZ3aW5kb3cuTWVzc2FnZUV2ZW50JiYhd2luZG93Lm9wZXJhKXt2YXIgYz1kb2N1bWVudC5jcmVhdGVFdmVudChcIk1lc3NhZ2VFdmVudFwiKTtyZXR1cm4gYy5pbml0TWVzc2FnZUV2ZW50KFwibWVzc2FnZVwiLCExLCExLGIsbnVsbCxudWxsLHdpbmRvdyxudWxsKSxjfXJldHVybnt0eXBlOmEsZGF0YTpiLGJ1YmJsZXM6ITEsY2FuY2VsYWJsZTohMX19LFdlYlNvY2tldC5DT05ORUNUSU5HPTAsV2ViU29ja2V0Lk9QRU49MSxXZWJTb2NrZXQuQ0xPU0lORz0yLFdlYlNvY2tldC5DTE9TRUQ9MyxXZWJTb2NrZXQuX19mbGFzaD1udWxsLFdlYlNvY2tldC5fX2luc3RhbmNlcz17fSxXZWJTb2NrZXQuX190YXNrcz1bXSxXZWJTb2NrZXQuX19uZXh0SWQ9MCxXZWJTb2NrZXQubG9hZEZsYXNoUG9saWN5RmlsZT1mdW5jdGlvbihhKXtXZWJTb2NrZXQuX19hZGRUYXNrKGZ1bmN0aW9uKCl7V2ViU29ja2V0Ll9fZmxhc2gubG9hZE1hbnVhbFBvbGljeUZpbGUoYSl9KX0sV2ViU29ja2V0Ll9faW5pdGlhbGl6ZT1mdW5jdGlvbigpe2lmKFdlYlNvY2tldC5fX2ZsYXNoKXJldHVybjtXZWJTb2NrZXQuX19zd2ZMb2NhdGlvbiYmKHdpbmRvdy5XRUJfU09DS0VUX1NXRl9MT0NBVElPTj1XZWJTb2NrZXQuX19zd2ZMb2NhdGlvbik7aWYoIXdpbmRvdy5XRUJfU09DS0VUX1NXRl9MT0NBVElPTil7YS5lcnJvcihcIltXZWJTb2NrZXRdIHNldCBXRUJfU09DS0VUX1NXRl9MT0NBVElPTiB0byBsb2NhdGlvbiBvZiBXZWJTb2NrZXRNYWluLnN3ZlwiKTtyZXR1cm59dmFyIGI9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtiLmlkPVwid2ViU29ja2V0Q29udGFpbmVyXCIsYi5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsV2ViU29ja2V0Ll9faXNGbGFzaExpdGUoKT8oYi5zdHlsZS5sZWZ0PVwiMHB4XCIsYi5zdHlsZS50b3A9XCIwcHhcIik6KGIuc3R5bGUubGVmdD1cIi0xMDBweFwiLGIuc3R5bGUudG9wPVwiLTEwMHB4XCIpO3ZhciBjPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7Yy5pZD1cIndlYlNvY2tldEZsYXNoXCIsYi5hcHBlbmRDaGlsZChjKSxkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGIpLHN3Zm9iamVjdC5lbWJlZFNXRihXRUJfU09DS0VUX1NXRl9MT0NBVElPTixcIndlYlNvY2tldEZsYXNoXCIsXCIxXCIsXCIxXCIsXCIxMC4wLjBcIixudWxsLG51bGwse2hhc1ByaW9yaXR5OiEwLHN3bGl2ZWNvbm5lY3Q6ITAsYWxsb3dTY3JpcHRBY2Nlc3M6XCJhbHdheXNcIn0sbnVsbCxmdW5jdGlvbihiKXtiLnN1Y2Nlc3N8fGEuZXJyb3IoXCJbV2ViU29ja2V0XSBzd2ZvYmplY3QuZW1iZWRTV0YgZmFpbGVkXCIpfSl9LFdlYlNvY2tldC5fX29uRmxhc2hJbml0aWFsaXplZD1mdW5jdGlvbigpe3NldFRpbWVvdXQoZnVuY3Rpb24oKXtXZWJTb2NrZXQuX19mbGFzaD1kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIndlYlNvY2tldEZsYXNoXCIpLFdlYlNvY2tldC5fX2ZsYXNoLnNldENhbGxlclVybChsb2NhdGlvbi5ocmVmKSxXZWJTb2NrZXQuX19mbGFzaC5zZXREZWJ1ZyghIXdpbmRvdy5XRUJfU09DS0VUX0RFQlVHKTtmb3IodmFyIGE9MDthPFdlYlNvY2tldC5fX3Rhc2tzLmxlbmd0aDsrK2EpV2ViU29ja2V0Ll9fdGFza3NbYV0oKTtXZWJTb2NrZXQuX190YXNrcz1bXX0sMCl9LFdlYlNvY2tldC5fX29uRmxhc2hFdmVudD1mdW5jdGlvbigpe3JldHVybiBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dHJ5e3ZhciBiPVdlYlNvY2tldC5fX2ZsYXNoLnJlY2VpdmVFdmVudHMoKTtmb3IodmFyIGM9MDtjPGIubGVuZ3RoOysrYylXZWJTb2NrZXQuX19pbnN0YW5jZXNbYltjXS53ZWJTb2NrZXRJZF0uX19oYW5kbGVFdmVudChiW2NdKX1jYXRjaChkKXthLmVycm9yKGQpfX0sMCksITB9LFdlYlNvY2tldC5fX2xvZz1mdW5jdGlvbihiKXthLmxvZyhkZWNvZGVVUklDb21wb25lbnQoYikpfSxXZWJTb2NrZXQuX19lcnJvcj1mdW5jdGlvbihiKXthLmVycm9yKGRlY29kZVVSSUNvbXBvbmVudChiKSl9LFdlYlNvY2tldC5fX2FkZFRhc2s9ZnVuY3Rpb24oYSl7V2ViU29ja2V0Ll9fZmxhc2g/YSgpOldlYlNvY2tldC5fX3Rhc2tzLnB1c2goYSl9LFdlYlNvY2tldC5fX2lzRmxhc2hMaXRlPWZ1bmN0aW9uKCl7aWYoIXdpbmRvdy5uYXZpZ2F0b3J8fCF3aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlcylyZXR1cm4hMTt2YXIgYT13aW5kb3cubmF2aWdhdG9yLm1pbWVUeXBlc1tcImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCJdO3JldHVybiFhfHwhYS5lbmFibGVkUGx1Z2lufHwhYS5lbmFibGVkUGx1Z2luLmZpbGVuYW1lPyExOmEuZW5hYmxlZFBsdWdpbi5maWxlbmFtZS5tYXRjaCgvZmxhc2hsaXRlL2kpPyEwOiExfSx3aW5kb3cuV0VCX1NPQ0tFVF9ESVNBQkxFX0FVVE9fSU5JVElBTElaQVRJT058fCh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcj93aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixmdW5jdGlvbigpe1dlYlNvY2tldC5fX2luaXRpYWxpemUoKX0sITEpOndpbmRvdy5hdHRhY2hFdmVudChcIm9ubG9hZFwiLGZ1bmN0aW9uKCl7V2ViU29ja2V0Ll9faW5pdGlhbGl6ZSgpfSkpfSkoKSxmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChhKXtpZighYSlyZXR1cm47Yi5UcmFuc3BvcnQuYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuc2VuZEJ1ZmZlcj1bXX1mdW5jdGlvbiBlKCl7fWEuWEhSPWQsYi51dGlsLmluaGVyaXQoZCxiLlRyYW5zcG9ydCksZC5wcm90b3R5cGUub3Blbj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnNvY2tldC5zZXRCdWZmZXIoITEpLHRoaXMub25PcGVuKCksdGhpcy5nZXQoKSx0aGlzLnNldENsb3NlVGltZW91dCgpLHRoaXN9LGQucHJvdG90eXBlLnBheWxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGM9W107Zm9yKHZhciBkPTAsZT1hLmxlbmd0aDtkPGU7ZCsrKWMucHVzaChiLnBhcnNlci5lbmNvZGVQYWNrZXQoYVtkXSkpO3RoaXMuc2VuZChiLnBhcnNlci5lbmNvZGVQYXlsb2FkKGMpKX0sZC5wcm90b3R5cGUuc2VuZD1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy5wb3N0KGEpLHRoaXN9LGQucHJvdG90eXBlLnBvc3Q9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gZCgpe3RoaXMucmVhZHlTdGF0ZT09NCYmKHRoaXMub25yZWFkeXN0YXRlY2hhbmdlPWUsYi5wb3N0aW5nPSExLHRoaXMuc3RhdHVzPT0yMDA/Yi5zb2NrZXQuc2V0QnVmZmVyKCExKTpiLm9uQ2xvc2UoKSl9ZnVuY3Rpb24gZigpe3RoaXMub25sb2FkPWUsYi5zb2NrZXQuc2V0QnVmZmVyKCExKX12YXIgYj10aGlzO3RoaXMuc29ja2V0LnNldEJ1ZmZlcighMCksdGhpcy5zZW5kWEhSPXRoaXMucmVxdWVzdChcIlBPU1RcIiksYy5YRG9tYWluUmVxdWVzdCYmdGhpcy5zZW5kWEhSIGluc3RhbmNlb2YgWERvbWFpblJlcXVlc3Q/dGhpcy5zZW5kWEhSLm9ubG9hZD10aGlzLnNlbmRYSFIub25lcnJvcj1mOnRoaXMuc2VuZFhIUi5vbnJlYWR5c3RhdGVjaGFuZ2U9ZCx0aGlzLnNlbmRYSFIuc2VuZChhKX0sZC5wcm90b3R5cGUuY2xvc2U9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vbkNsb3NlKCksdGhpc30sZC5wcm90b3R5cGUucmVxdWVzdD1mdW5jdGlvbihhKXt2YXIgYz1iLnV0aWwucmVxdWVzdCh0aGlzLnNvY2tldC5pc1hEb21haW4oKSksZD1iLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSxcInQ9XCIrICsobmV3IERhdGUpKTtjLm9wZW4oYXx8XCJHRVRcIix0aGlzLnByZXBhcmVVcmwoKStkLCEwKTtpZihhPT1cIlBPU1RcIil0cnl7Yy5zZXRSZXF1ZXN0SGVhZGVyP2Muc2V0UmVxdWVzdEhlYWRlcihcIkNvbnRlbnQtdHlwZVwiLFwidGV4dC9wbGFpbjtjaGFyc2V0PVVURi04XCIpOmMuY29udGVudFR5cGU9XCJ0ZXh0L3BsYWluXCJ9Y2F0Y2goZSl7fXJldHVybiBjfSxkLnByb3RvdHlwZS5zY2hlbWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb2NrZXQub3B0aW9ucy5zZWN1cmU/XCJodHRwc1wiOlwiaHR0cFwifSxkLmNoZWNrPWZ1bmN0aW9uKGEsZCl7dHJ5e3ZhciBlPWIudXRpbC5yZXF1ZXN0KGQpLGY9Yy5YRG9tYWluUmVxdWVzdCYmZSBpbnN0YW5jZW9mIFhEb21haW5SZXF1ZXN0LGc9YSYmYS5vcHRpb25zJiZhLm9wdGlvbnMuc2VjdXJlP1wiaHR0cHM6XCI6XCJodHRwOlwiLGg9Yy5sb2NhdGlvbiYmZyE9Yy5sb2NhdGlvbi5wcm90b2NvbDtpZihlJiYoIWZ8fCFoKSlyZXR1cm4hMH1jYXRjaChpKXt9cmV0dXJuITF9LGQueGRvbWFpbkNoZWNrPWZ1bmN0aW9uKGEpe3JldHVybiBkLmNoZWNrKGEsITApfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvLlRyYW5zcG9ydDptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzLHRoaXMpLGZ1bmN0aW9uKGEsYil7ZnVuY3Rpb24gYyhhKXtiLlRyYW5zcG9ydC5YSFIuYXBwbHkodGhpcyxhcmd1bWVudHMpfWEuaHRtbGZpbGU9YyxiLnV0aWwuaW5oZXJpdChjLGIuVHJhbnNwb3J0LlhIUiksYy5wcm90b3R5cGUubmFtZT1cImh0bWxmaWxlXCIsYy5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKCl7dGhpcy5kb2M9bmV3KHdpbmRvd1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXSkoXCJodG1sZmlsZVwiKSx0aGlzLmRvYy5vcGVuKCksdGhpcy5kb2Mud3JpdGUoXCI8aHRtbD48L2h0bWw+XCIpLHRoaXMuZG9jLmNsb3NlKCksdGhpcy5kb2MucGFyZW50V2luZG93LnM9dGhpczt2YXIgYT10aGlzLmRvYy5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2EuY2xhc3NOYW1lPVwic29ja2V0aW9cIix0aGlzLmRvYy5ib2R5LmFwcGVuZENoaWxkKGEpLHRoaXMuaWZyYW1lPXRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIiksYS5hcHBlbmRDaGlsZCh0aGlzLmlmcmFtZSk7dmFyIGM9dGhpcyxkPWIudXRpbC5xdWVyeSh0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5LFwidD1cIisgKyhuZXcgRGF0ZSkpO3RoaXMuaWZyYW1lLnNyYz10aGlzLnByZXBhcmVVcmwoKStkLGIudXRpbC5vbih3aW5kb3csXCJ1bmxvYWRcIixmdW5jdGlvbigpe2MuZGVzdHJveSgpfSl9LGMucHJvdG90eXBlLl89ZnVuY3Rpb24oYSxiKXthPWEucmVwbGFjZSgvXFxcXFxcLy9nLFwiL1wiKSx0aGlzLm9uRGF0YShhKTt0cnl7dmFyIGM9Yi5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXTtjLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYyl9Y2F0Y2goZCl7fX0sYy5wcm90b3R5cGUuZGVzdHJveT1mdW5jdGlvbigpe2lmKHRoaXMuaWZyYW1lKXt0cnl7dGhpcy5pZnJhbWUuc3JjPVwiYWJvdXQ6YmxhbmtcIn1jYXRjaChhKXt9dGhpcy5kb2M9bnVsbCx0aGlzLmlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaWZyYW1lKSx0aGlzLmlmcmFtZT1udWxsLENvbGxlY3RHYXJiYWdlKCl9fSxjLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLmRlc3Ryb3koKSxiLlRyYW5zcG9ydC5YSFIucHJvdG90eXBlLmNsb3NlLmNhbGwodGhpcyl9LGMuY2hlY2s9ZnVuY3Rpb24oYSl7aWYodHlwZW9mIHdpbmRvdyE9XCJ1bmRlZmluZWRcIiYmW1wiQWN0aXZlXCJdLmNvbmNhdChcIk9iamVjdFwiKS5qb2luKFwiWFwiKWluIHdpbmRvdyl0cnl7dmFyIGM9bmV3KHdpbmRvd1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXSkoXCJodG1sZmlsZVwiKTtyZXR1cm4gYyYmYi5UcmFuc3BvcnQuWEhSLmNoZWNrKGEpfWNhdGNoKGQpe31yZXR1cm4hMX0sYy54ZG9tYWluQ2hlY2s9ZnVuY3Rpb24oKXtyZXR1cm4hMX0sYi50cmFuc3BvcnRzLnB1c2goXCJodG1sZmlsZVwiKX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvLlRyYW5zcG9ydDptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzKSxmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZCgpe2IuVHJhbnNwb3J0LlhIUi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9ZnVuY3Rpb24gZSgpe31hW1wieGhyLXBvbGxpbmdcIl09ZCxiLnV0aWwuaW5oZXJpdChkLGIuVHJhbnNwb3J0LlhIUiksYi51dGlsLm1lcmdlKGQsYi5UcmFuc3BvcnQuWEhSKSxkLnByb3RvdHlwZS5uYW1lPVwieGhyLXBvbGxpbmdcIixkLnByb3RvdHlwZS5oZWFydGJlYXRzPWZ1bmN0aW9uKCl7cmV0dXJuITF9LGQucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24oKXt2YXIgYT10aGlzO3JldHVybiBiLlRyYW5zcG9ydC5YSFIucHJvdG90eXBlLm9wZW4uY2FsbChhKSwhMX0sZC5wcm90b3R5cGUuZ2V0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gYigpe3RoaXMucmVhZHlTdGF0ZT09NCYmKHRoaXMub25yZWFkeXN0YXRlY2hhbmdlPWUsdGhpcy5zdGF0dXM9PTIwMD8oYS5vbkRhdGEodGhpcy5yZXNwb25zZVRleHQpLGEuZ2V0KCkpOmEub25DbG9zZSgpKX1mdW5jdGlvbiBkKCl7dGhpcy5vbmxvYWQ9ZSx0aGlzLm9uZXJyb3I9ZSxhLnJldHJ5Q291bnRlcj0xLGEub25EYXRhKHRoaXMucmVzcG9uc2VUZXh0KSxhLmdldCgpfWZ1bmN0aW9uIGYoKXthLnJldHJ5Q291bnRlcisrLCFhLnJldHJ5Q291bnRlcnx8YS5yZXRyeUNvdW50ZXI+Mz9hLm9uQ2xvc2UoKTphLmdldCgpfWlmKCF0aGlzLmlzT3BlbilyZXR1cm47dmFyIGE9dGhpczt0aGlzLnhocj10aGlzLnJlcXVlc3QoKSxjLlhEb21haW5SZXF1ZXN0JiZ0aGlzLnhociBpbnN0YW5jZW9mIFhEb21haW5SZXF1ZXN0Pyh0aGlzLnhoci5vbmxvYWQ9ZCx0aGlzLnhoci5vbmVycm9yPWYpOnRoaXMueGhyLm9ucmVhZHlzdGF0ZWNoYW5nZT1iLHRoaXMueGhyLnNlbmQobnVsbCl9LGQucHJvdG90eXBlLm9uQ2xvc2U9ZnVuY3Rpb24oKXtiLlRyYW5zcG9ydC5YSFIucHJvdG90eXBlLm9uQ2xvc2UuY2FsbCh0aGlzKTtpZih0aGlzLnhocil7dGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlPXRoaXMueGhyLm9ubG9hZD10aGlzLnhoci5vbmVycm9yPWU7dHJ5e3RoaXMueGhyLmFib3J0KCl9Y2F0Y2goYSl7fXRoaXMueGhyPW51bGx9fSxkLnByb3RvdHlwZS5yZWFkeT1mdW5jdGlvbihhLGMpe3ZhciBkPXRoaXM7Yi51dGlsLmRlZmVyKGZ1bmN0aW9uKCl7Yy5jYWxsKGQpfSl9LGIudHJhbnNwb3J0cy5wdXNoKFwieGhyLXBvbGxpbmdcIil9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pby5UcmFuc3BvcnQ6bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyx0aGlzKSxmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZShhKXtiLlRyYW5zcG9ydFtcInhoci1wb2xsaW5nXCJdLmFwcGx5KHRoaXMsYXJndW1lbnRzKSx0aGlzLmluZGV4PWIuai5sZW5ndGg7dmFyIGM9dGhpcztiLmoucHVzaChmdW5jdGlvbihhKXtjLl8oYSl9KX12YXIgZD1jLmRvY3VtZW50JiZcIk1vekFwcGVhcmFuY2VcImluIGMuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlO2FbXCJqc29ucC1wb2xsaW5nXCJdPWUsYi51dGlsLmluaGVyaXQoZSxiLlRyYW5zcG9ydFtcInhoci1wb2xsaW5nXCJdKSxlLnByb3RvdHlwZS5uYW1lPVwianNvbnAtcG9sbGluZ1wiLGUucHJvdG90eXBlLnBvc3Q9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gaSgpe2ooKSxjLnNvY2tldC5zZXRCdWZmZXIoITEpfWZ1bmN0aW9uIGooKXtjLmlmcmFtZSYmYy5mb3JtLnJlbW92ZUNoaWxkKGMuaWZyYW1lKTt0cnl7aD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8aWZyYW1lIG5hbWU9XCInK2MuaWZyYW1lSWQrJ1wiPicpfWNhdGNoKGEpe2g9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKSxoLm5hbWU9Yy5pZnJhbWVJZH1oLmlkPWMuaWZyYW1lSWQsYy5mb3JtLmFwcGVuZENoaWxkKGgpLGMuaWZyYW1lPWh9dmFyIGM9dGhpcyxkPWIudXRpbC5xdWVyeSh0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5LFwidD1cIisgKyhuZXcgRGF0ZSkrXCImaT1cIit0aGlzLmluZGV4KTtpZighdGhpcy5mb3JtKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZm9ybVwiKSxmPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0ZXh0YXJlYVwiKSxnPXRoaXMuaWZyYW1lSWQ9XCJzb2NrZXRpb19pZnJhbWVfXCIrdGhpcy5pbmRleCxoO2UuY2xhc3NOYW1lPVwic29ja2V0aW9cIixlLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIixlLnN0eWxlLnRvcD1cIjBweFwiLGUuc3R5bGUubGVmdD1cIjBweFwiLGUuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixlLnRhcmdldD1nLGUubWV0aG9kPVwiUE9TVFwiLGUuc2V0QXR0cmlidXRlKFwiYWNjZXB0LWNoYXJzZXRcIixcInV0Zi04XCIpLGYubmFtZT1cImRcIixlLmFwcGVuZENoaWxkKGYpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZSksdGhpcy5mb3JtPWUsdGhpcy5hcmVhPWZ9dGhpcy5mb3JtLmFjdGlvbj10aGlzLnByZXBhcmVVcmwoKStkLGooKSx0aGlzLmFyZWEudmFsdWU9Yi5KU09OLnN0cmluZ2lmeShhKTt0cnl7dGhpcy5mb3JtLnN1Ym1pdCgpfWNhdGNoKGspe310aGlzLmlmcmFtZS5hdHRhY2hFdmVudD9oLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2MuaWZyYW1lLnJlYWR5U3RhdGU9PVwiY29tcGxldGVcIiYmaSgpfTp0aGlzLmlmcmFtZS5vbmxvYWQ9aSx0aGlzLnNvY2tldC5zZXRCdWZmZXIoITApfSxlLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKSxlPWIudXRpbC5xdWVyeSh0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5LFwidD1cIisgKyhuZXcgRGF0ZSkrXCImaT1cIit0aGlzLmluZGV4KTt0aGlzLnNjcmlwdCYmKHRoaXMuc2NyaXB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zY3JpcHQpLHRoaXMuc2NyaXB0PW51bGwpLGMuYXN5bmM9ITAsYy5zcmM9dGhpcy5wcmVwYXJlVXJsKCkrZSxjLm9uZXJyb3I9ZnVuY3Rpb24oKXthLm9uQ2xvc2UoKX07dmFyIGY9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF07Zi5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjLGYpLHRoaXMuc2NyaXB0PWMsZCYmc2V0VGltZW91dChmdW5jdGlvbigpe3ZhciBhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7ZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChhKSxkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGEpfSwxMDApfSxlLnByb3RvdHlwZS5fPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLm9uRGF0YShhKSx0aGlzLmlzT3BlbiYmdGhpcy5nZXQoKSx0aGlzfSxlLnByb3RvdHlwZS5yZWFkeT1mdW5jdGlvbihhLGMpe3ZhciBlPXRoaXM7aWYoIWQpcmV0dXJuIGMuY2FsbCh0aGlzKTtiLnV0aWwubG9hZChmdW5jdGlvbigpe2MuY2FsbChlKX0pfSxlLmNoZWNrPWZ1bmN0aW9uKCl7cmV0dXJuXCJkb2N1bWVudFwiaW4gY30sZS54ZG9tYWluQ2hlY2s9ZnVuY3Rpb24oKXtyZXR1cm4hMH0sYi50cmFuc3BvcnRzLnB1c2goXCJqc29ucC1wb2xsaW5nXCIpfShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW8uVHJhbnNwb3J0Om1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMsdGhpcyksdHlwZW9mIGRlZmluZT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kJiZkZWZpbmUoW10sZnVuY3Rpb24oKXtyZXR1cm4gaW99KX0pKCkiLCJleHBvcnRzLnJ1biA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0dmFyIGRvTm90aGluZz1mdW5jdGlvbigpe307XG5cdHZhciBwYXNzID0gb3B0aW9ucy5wYXNzfHxkb05vdGhpbmc7XG5cdHZhciBmYWlsID0gb3B0aW9ucy5mYWlsfHxkb05vdGhpbmc7XG5cdHZhciBlbmQgPSBvcHRpb25zLmVuZHx8ZG9Ob3RoaW5nO1xuXHR2YXIgbW9jaGEgPSBvcHRpb25zLmluc3RhbmNlO1xuXG5cdGZ1bmN0aW9uIFJlcG9ydGVyKHJ1bm5lcikge1xuXG5cdFx0cnVubmVyLm9uKCdwYXNzJywgZnVuY3Rpb24odGVzdCkge1xuXHRcdFx0cGFzcyh7XG5cdFx0XHRcdHRpdGxlOiB0ZXN0LnRpdGxlLFxuXHRcdFx0XHRmdWxsVGl0bGU6IHRlc3QuZnVsbFRpdGxlKCksXG5cdFx0XHRcdGR1cmF0aW9uOiB0ZXN0LmR1cmF0aW9uXG5cdFx0XHR9KVxuXHRcdH0pO1xuXG5cdFx0cnVubmVyLm9uKCdmYWlsJywgZnVuY3Rpb24odGVzdCwgZXJyKSB7XG5cdFx0XHRmYWlsKHtcblx0XHRcdFx0dGl0bGU6IHRlc3QudGl0bGUsXG5cdFx0XHRcdGZ1bGxUaXRsZTogdGVzdC5mdWxsVGl0bGUoKSxcblx0XHRcdFx0ZHVyYXRpb246IHRlc3QuZHVyYXRpb24sXG5cdFx0XHRcdGVycm9yOiBlcnIubWVzc2FnZVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRydW5uZXIub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZW5kKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtb2NoYS5yZXBvcnRlcihSZXBvcnRlcik7XG59IiwiZXhwb3J0cy5ydW4gPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdHZhciBkb05vdGhpbmcgPSBmdW5jdGlvbigpIHt9O1xuXHR2YXIgcGFzcyA9IG9wdGlvbnMucGFzcyB8fCBkb05vdGhpbmc7XG5cdHZhciBmYWlsID0gb3B0aW9ucy5mYWlsIHx8IGRvTm90aGluZztcblx0dmFyIGVuZCA9IG9wdGlvbnMuZW5kIHx8IGRvTm90aGluZztcblx0dmFyIHdpbmRvdyA9IG9wdGlvbnMuaW5zdGFuY2U7XG5cblx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvciwgdXJsLCBsaW5lKSB7XG5cdFx0ZmFpbCh7XG5cdFx0XHR0aXRsZTogZXJyb3IsXG5cdFx0XHRmdWxsVGl0bGU6IGVycm9yLFxuXHRcdFx0ZHVyYXRpb246IDAsXG5cdFx0XHRlcnJvcjogJ0VSUjonICsgZXJyb3IgKyAnIExJTkU6JyArIGxpbmVcblx0XHR9KVxuXHR9O1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0ZW5kKCk7XG5cdH0sIDUwMDApO1xufSJdfQ==
