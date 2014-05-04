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
			version: browser.version
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

var server=document.getElementById('browserman').getAttribute('data-server');
if (window.mocha) {
	new Browserman({
		type: 'mocha',
		instance: window.mocha,
		server:	server

	}).init()
} else {
	new Browserman({
		type: 'plain',
		instance: window,
		server:server
	}).init()
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

	console.log('hahaha')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvYm93c2VyL2Jvd3Nlci5qcyIsIi9Vc2Vycy9sdGViZWFuL0Rlc2t0b3Avbm9kZWpzIHdvcmtzcGFjZS9icm93c2VybWFuL25vZGVfbW9kdWxlcy9ndWxwLWJyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL3F1ZXJ5c3RyaW5nLWVzMy9kZWNvZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZy1lczMvZW5jb2RlLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vbm9kZV9tb2R1bGVzL2d1bHAtYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvcXVlcnlzdHJpbmctZXMzL2luZGV4LmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9mYWtlXzJkNTM2ZTMxLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9saWIvY2FudmFzMmltYWdlLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9saWIvaHRtbDJjYW52YXMuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9wdWJsaWMvanMvZGV2L2xpYi9zb2NrZXQuaW8uanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9wdWJsaWMvanMvZGV2L3JlcG9ydGVyL21vY2hhLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9yZXBvcnRlci9wbGFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3Z6RkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAgKiBCb3dzZXIgLSBhIGJyb3dzZXIgZGV0ZWN0b3JcbiAgKiBodHRwczovL2dpdGh1Yi5jb20vZGVkL2Jvd3NlclxuICAqIE1JVCBMaWNlbnNlIHwgKGMpIER1c3RpbiBEaWF6IDIwMTRcbiAgKi9cblxuIWZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uKSB7XG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0c1snYnJvd3NlciddID0gZGVmaW5pdGlvbigpXG4gIGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJykgZGVmaW5lKGRlZmluaXRpb24pXG4gIGVsc2UgdGhpc1tuYW1lXSA9IGRlZmluaXRpb24oKVxufSgnYm93c2VyJywgZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICAqIFNlZSB1c2VyYWdlbnRzLmpzIGZvciBleGFtcGxlcyBvZiBuYXZpZ2F0b3IudXNlckFnZW50XG4gICAgKi9cblxuICB2YXIgdCA9IHRydWVcblxuICBmdW5jdGlvbiBkZXRlY3QodWEpIHtcblxuICAgIGZ1bmN0aW9uIGdldEZpcnN0TWF0Y2gocmVnZXgpIHtcbiAgICAgIHZhciBtYXRjaCA9IHVhLm1hdGNoKHJlZ2V4KTtcbiAgICAgIHJldHVybiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID4gMSAmJiBtYXRjaFsxXSkgfHwgJyc7XG4gICAgfVxuXG4gICAgdmFyIGlvc2RldmljZSA9IGdldEZpcnN0TWF0Y2goLyhpcG9kfGlwaG9uZXxpcGFkKS9pKS50b0xvd2VyQ2FzZSgpXG4gICAgICAsIGxpa2VBbmRyb2lkID0gL2xpa2UgYW5kcm9pZC9pLnRlc3QodWEpXG4gICAgICAsIGFuZHJvaWQgPSAhbGlrZUFuZHJvaWQgJiYgL2FuZHJvaWQvaS50ZXN0KHVhKVxuICAgICAgLCB2ZXJzaW9uSWRlbnRpZmllciA9IGdldEZpcnN0TWF0Y2goL3ZlcnNpb25cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICAsIHRhYmxldCA9IC90YWJsZXQvaS50ZXN0KHVhKVxuICAgICAgLCBtb2JpbGUgPSAhdGFibGV0ICYmIC9bXi1dbW9iaS9pLnRlc3QodWEpXG4gICAgICAsIHJlc3VsdFxuXG4gICAgaWYgKC9vcGVyYXxvcHIvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnT3BlcmEnXG4gICAgICAsIG9wZXJhOiB0XG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyIHx8IGdldEZpcnN0TWF0Y2goLyg/Om9wZXJhfG9wcilbXFxzXFwvXShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3dpbmRvd3MgcGhvbmUvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnV2luZG93cyBQaG9uZSdcbiAgICAgICwgd2luZG93c3Bob25lOiB0XG4gICAgICAsIG1zaWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvaWVtb2JpbGVcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9tc2llfHRyaWRlbnQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnSW50ZXJuZXQgRXhwbG9yZXInXG4gICAgICAsIG1zaWU6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86bXNpZSB8cnY6KShcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2Nocm9tZXxjcmlvc3xjcm1vL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0Nocm9tZSdcbiAgICAgICwgY2hyb21lOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OmNocm9tZXxjcmlvc3xjcm1vKVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWUgOiBpb3NkZXZpY2UgPT0gJ2lwaG9uZScgPyAnaVBob25lJyA6IGlvc2RldmljZSA9PSAnaXBhZCcgPyAnaVBhZCcgOiAnaVBvZCdcbiAgICAgIH1cbiAgICAgIC8vIFdURjogdmVyc2lvbiBpcyBub3QgcGFydCBvZiB1c2VyIGFnZW50IGluIHdlYiBhcHBzXG4gICAgICBpZiAodmVyc2lvbklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVzdWx0LnZlcnNpb24gPSB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2FpbGZpc2gvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FpbGZpc2gnXG4gICAgICAsIHNhaWxmaXNoOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3NhaWxmaXNoXFxzP2Jyb3dzZXJcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zZWFtb25rZXlcXC8vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2VhTW9ua2V5J1xuICAgICAgLCBzZWFtb25rZXk6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvc2VhbW9ua2V5XFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvZmlyZWZveHxpY2V3ZWFzZWwvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnRmlyZWZveCdcbiAgICAgICwgZmlyZWZveDogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpmaXJlZm94fGljZXdlYXNlbClbIFxcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgICBpZiAoL1xcKChtb2JpbGV8dGFibGV0KTtbXlxcKV0qcnY6W1xcZFxcLl0rXFwpL2kudGVzdCh1YSkpIHtcbiAgICAgICAgcmVzdWx0LmZpcmVmb3hvcyA9IHRcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NpbGsvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0gIHtcbiAgICAgICAgbmFtZTogJ0FtYXpvbiBTaWxrJ1xuICAgICAgLCBzaWxrOiB0XG4gICAgICAsIHZlcnNpb24gOiBnZXRGaXJzdE1hdGNoKC9zaWxrXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdBbmRyb2lkJ1xuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllclxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvcGhhbnRvbS9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdQaGFudG9tSlMnXG4gICAgICAsIHBoYW50b206IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvcGhhbnRvbWpzXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvYmxhY2tiZXJyeXxcXGJiYlxcZCsvaS50ZXN0KHVhKSB8fCAvcmltXFxzdGFibGV0L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0JsYWNrQmVycnknXG4gICAgICAsIGJsYWNrYmVycnk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvYmxhY2tiZXJyeVtcXGRdK1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoLyh3ZWJ8aHB3KW9zL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dlYk9TJ1xuICAgICAgLCB3ZWJvczogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC93KD86ZWIpP29zYnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH07XG4gICAgICAvdG91Y2hwYWRcXC8vaS50ZXN0KHVhKSAmJiAocmVzdWx0LnRvdWNocGFkID0gdClcbiAgICB9XG4gICAgZWxzZSBpZiAoL2JhZGEvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQmFkYSdcbiAgICAgICwgYmFkYTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9kb2xmaW5cXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICgvdGl6ZW4vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnVGl6ZW4nXG4gICAgICAsIHRpemVuOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/OnRpemVuXFxzPyk/YnJvd3NlclxcLyhcXGQrKFxcLlxcZCspPykvaSkgfHwgdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH07XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zYWZhcmkvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnU2FmYXJpJ1xuICAgICAgLCBzYWZhcmk6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSByZXN1bHQgPSB7fVxuXG4gICAgLy8gc2V0IHdlYmtpdCBvciBnZWNrbyBmbGFnIGZvciBicm93c2VycyBiYXNlZCBvbiB0aGVzZSBlbmdpbmVzXG4gICAgaWYgKC8oYXBwbGUpP3dlYmtpdC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQubmFtZSA9IHJlc3VsdC5uYW1lIHx8IFwiV2Via2l0XCJcbiAgICAgIHJlc3VsdC53ZWJraXQgPSB0XG4gICAgICBpZiAoIXJlc3VsdC52ZXJzaW9uICYmIHZlcnNpb25JZGVudGlmaWVyKSB7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFyZXN1bHQub3BlcmEgJiYgL2dlY2tvXFwvL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdC5uYW1lID0gcmVzdWx0Lm5hbWUgfHwgXCJHZWNrb1wiXG4gICAgICByZXN1bHQuZ2Vja28gPSB0XG4gICAgICByZXN1bHQudmVyc2lvbiA9IHJlc3VsdC52ZXJzaW9uIHx8IGdldEZpcnN0TWF0Y2goL2dlY2tvXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgIH1cblxuICAgIC8vIHNldCBPUyBmbGFncyBmb3IgcGxhdGZvcm1zIHRoYXQgaGF2ZSBtdWx0aXBsZSBicm93c2Vyc1xuICAgIGlmIChhbmRyb2lkIHx8IHJlc3VsdC5zaWxrKSB7XG4gICAgICByZXN1bHQuYW5kcm9pZCA9IHRcbiAgICB9IGVsc2UgaWYgKGlvc2RldmljZSkge1xuICAgICAgcmVzdWx0W2lvc2RldmljZV0gPSB0XG4gICAgICByZXN1bHQuaW9zID0gdFxuICAgIH1cblxuICAgIC8vIE9TIHZlcnNpb24gZXh0cmFjdGlvblxuICAgIHZhciBvc1ZlcnNpb24gPSAnJztcbiAgICBpZiAoaW9zZGV2aWNlKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9vcyAoXFxkKyhbX1xcc11cXGQrKSopIGxpa2UgbWFjIG9zIHgvaSk7XG4gICAgICBvc1ZlcnNpb24gPSBvc1ZlcnNpb24ucmVwbGFjZSgvW19cXHNdL2csICcuJyk7XG4gICAgfSBlbHNlIGlmIChhbmRyb2lkKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9hbmRyb2lkWyBcXC8tXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQud2luZG93c3Bob25lKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC93aW5kb3dzIHBob25lICg/Om9zKT9cXHM/KFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC53ZWJvcykge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvKD86d2VifGhwdylvc1xcLyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQuYmxhY2tiZXJyeSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvcmltXFxzdGFibGV0XFxzb3NcXHMoXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LmJhZGEpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL2JhZGFcXC8oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LnRpemVuKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC90aXplbltcXC9cXHNdKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9XG4gICAgaWYgKG9zVmVyc2lvbikge1xuICAgICAgcmVzdWx0Lm9zdmVyc2lvbiA9IG9zVmVyc2lvbjtcbiAgICB9XG5cbiAgICAvLyBkZXZpY2UgdHlwZSBleHRyYWN0aW9uXG4gICAgdmFyIG9zTWFqb3JWZXJzaW9uID0gb3NWZXJzaW9uLnNwbGl0KCcuJylbMF07XG4gICAgaWYgKHRhYmxldCB8fCBpb3NkZXZpY2UgPT0gJ2lwYWQnIHx8IChhbmRyb2lkICYmIChvc01ham9yVmVyc2lvbiA9PSAzIHx8IChvc01ham9yVmVyc2lvbiA9PSA0ICYmICFtb2JpbGUpKSkgfHwgcmVzdWx0LnNpbGspIHtcbiAgICAgIHJlc3VsdC50YWJsZXQgPSB0XG4gICAgfSBlbHNlIGlmIChtb2JpbGUgfHwgaW9zZGV2aWNlID09ICdpcGhvbmUnIHx8IGlvc2RldmljZSA9PSAnaXBvZCcgfHwgYW5kcm9pZCB8fCByZXN1bHQuYmxhY2tiZXJyeSB8fCByZXN1bHQud2Vib3MgfHwgcmVzdWx0LmJhZGEpIHtcbiAgICAgIHJlc3VsdC5tb2JpbGUgPSB0XG4gICAgfVxuXG4gICAgLy8gR3JhZGVkIEJyb3dzZXIgU3VwcG9ydFxuICAgIC8vIGh0dHA6Ly9kZXZlbG9wZXIueWFob28uY29tL3l1aS9hcnRpY2xlcy9nYnNcbiAgICBpZiAoKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uID49IDEwKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA+PSAyMCkgfHxcbiAgICAgICAgKHJlc3VsdC5maXJlZm94ICYmIHJlc3VsdC52ZXJzaW9uID49IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uID49IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPj0gMTAuMCkgfHxcbiAgICAgICAgKHJlc3VsdC5pb3MgJiYgcmVzdWx0Lm9zdmVyc2lvbiAmJiByZXN1bHQub3N2ZXJzaW9uLnNwbGl0KFwiLlwiKVswXSA+PSA2KVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5hID0gdDtcbiAgICB9XG4gICAgZWxzZSBpZiAoKHJlc3VsdC5tc2llICYmIHJlc3VsdC52ZXJzaW9uIDwgMTApIHx8XG4gICAgICAgIChyZXN1bHQuY2hyb21lICYmIHJlc3VsdC52ZXJzaW9uIDwgMjApIHx8XG4gICAgICAgIChyZXN1bHQuZmlyZWZveCAmJiByZXN1bHQudmVyc2lvbiA8IDIwLjApIHx8XG4gICAgICAgIChyZXN1bHQuc2FmYXJpICYmIHJlc3VsdC52ZXJzaW9uIDwgNikgfHxcbiAgICAgICAgKHJlc3VsdC5vcGVyYSAmJiByZXN1bHQudmVyc2lvbiA8IDEwLjApIHx8XG4gICAgICAgIChyZXN1bHQuaW9zICYmIHJlc3VsdC5vc3ZlcnNpb24gJiYgcmVzdWx0Lm9zdmVyc2lvbi5zcGxpdChcIi5cIilbMF0gPCA2KVxuICAgICAgICApIHtcbiAgICAgIHJlc3VsdC5jID0gdFxuICAgIH0gZWxzZSByZXN1bHQueCA9IHRcblxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIHZhciBib3dzZXIgPSBkZXRlY3QodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgPyBuYXZpZ2F0b3IudXNlckFnZW50IDogJycpXG5cblxuICAvKlxuICAgKiBTZXQgb3VyIGRldGVjdCBtZXRob2QgdG8gdGhlIG1haW4gYm93c2VyIG9iamVjdCBzbyB3ZSBjYW5cbiAgICogcmV1c2UgaXQgdG8gdGVzdCBvdGhlciB1c2VyIGFnZW50cy5cbiAgICogVGhpcyBpcyBuZWVkZWQgdG8gaW1wbGVtZW50IGZ1dHVyZSB0ZXN0cy5cbiAgICovXG4gIGJvd3Nlci5fZGV0ZWN0ID0gZGV0ZWN0O1xuXG4gIHJldHVybiBib3dzZXJcbn0pO1xuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gSWYgb2JqLmhhc093blByb3BlcnR5IGhhcyBiZWVuIG92ZXJyaWRkZW4sIHRoZW4gY2FsbGluZ1xuLy8gb2JqLmhhc093blByb3BlcnR5KHByb3ApIHdpbGwgYnJlYWsuXG4vLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qb3llbnQvbm9kZS9pc3N1ZXMvMTcwN1xuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihxcywgc2VwLCBlcSwgb3B0aW9ucykge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgdmFyIG9iaiA9IHt9O1xuXG4gIGlmICh0eXBlb2YgcXMgIT09ICdzdHJpbmcnIHx8IHFzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBvYmo7XG4gIH1cblxuICB2YXIgcmVnZXhwID0gL1xcKy9nO1xuICBxcyA9IHFzLnNwbGl0KHNlcCk7XG5cbiAgdmFyIG1heEtleXMgPSAxMDAwO1xuICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5tYXhLZXlzID09PSAnbnVtYmVyJykge1xuICAgIG1heEtleXMgPSBvcHRpb25zLm1heEtleXM7XG4gIH1cblxuICB2YXIgbGVuID0gcXMubGVuZ3RoO1xuICAvLyBtYXhLZXlzIDw9IDAgbWVhbnMgdGhhdCB3ZSBzaG91bGQgbm90IGxpbWl0IGtleXMgY291bnRcbiAgaWYgKG1heEtleXMgPiAwICYmIGxlbiA+IG1heEtleXMpIHtcbiAgICBsZW4gPSBtYXhLZXlzO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIHZhciB4ID0gcXNbaV0ucmVwbGFjZShyZWdleHAsICclMjAnKSxcbiAgICAgICAgaWR4ID0geC5pbmRleE9mKGVxKSxcbiAgICAgICAga3N0ciwgdnN0ciwgaywgdjtcblxuICAgIGlmIChpZHggPj0gMCkge1xuICAgICAga3N0ciA9IHguc3Vic3RyKDAsIGlkeCk7XG4gICAgICB2c3RyID0geC5zdWJzdHIoaWR4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGtzdHIgPSB4O1xuICAgICAgdnN0ciA9ICcnO1xuICAgIH1cblxuICAgIGsgPSBkZWNvZGVVUklDb21wb25lbnQoa3N0cik7XG4gICAgdiA9IGRlY29kZVVSSUNvbXBvbmVudCh2c3RyKTtcblxuICAgIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBrKSkge1xuICAgICAgb2JqW2tdID0gdjtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgb2JqW2tdLnB1c2godik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtrXSA9IFtvYmpba10sIHZdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHhzKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeHMpID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnlQcmltaXRpdmUgPSBmdW5jdGlvbih2KSB7XG4gIHN3aXRjaCAodHlwZW9mIHYpIHtcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgcmV0dXJuIHY7XG5cbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiB2ID8gJ3RydWUnIDogJ2ZhbHNlJztcblxuICAgIGNhc2UgJ251bWJlcic6XG4gICAgICByZXR1cm4gaXNGaW5pdGUodikgPyB2IDogJyc7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuICcnO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iaiwgc2VwLCBlcSwgbmFtZSkge1xuICBzZXAgPSBzZXAgfHwgJyYnO1xuICBlcSA9IGVxIHx8ICc9JztcbiAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgIG9iaiA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2Ygb2JqID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBtYXAob2JqZWN0S2V5cyhvYmopLCBmdW5jdGlvbihrKSB7XG4gICAgICB2YXIga3MgPSBlbmNvZGVVUklDb21wb25lbnQoc3RyaW5naWZ5UHJpbWl0aXZlKGspKSArIGVxO1xuICAgICAgaWYgKGlzQXJyYXkob2JqW2tdKSkge1xuICAgICAgICByZXR1cm4gb2JqW2tdLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgcmV0dXJuIGtzICsgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZSh2KSk7XG4gICAgICAgIH0pLmpvaW4oc2VwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrcyArIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUob2JqW2tdKSk7XG4gICAgICB9XG4gICAgfSkuam9pbihzZXApO1xuXG4gIH1cblxuICBpZiAoIW5hbWUpIHJldHVybiAnJztcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChzdHJpbmdpZnlQcmltaXRpdmUobmFtZSkpICsgZXEgK1xuICAgICAgICAgZW5jb2RlVVJJQ29tcG9uZW50KHN0cmluZ2lmeVByaW1pdGl2ZShvYmopKTtcbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoeHMpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4cykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5mdW5jdGlvbiBtYXAgKHhzLCBmKSB7XG4gIGlmICh4cy5tYXApIHJldHVybiB4cy5tYXAoZik7XG4gIHZhciByZXMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB4cy5sZW5ndGg7IGkrKykge1xuICAgIHJlcy5wdXNoKGYoeHNbaV0sIGkpKTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG52YXIgb2JqZWN0S2V5cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIChvYmopIHtcbiAgdmFyIHJlcyA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHJlcy5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlcztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuZGVjb2RlID0gZXhwb3J0cy5wYXJzZSA9IHJlcXVpcmUoJy4vZGVjb2RlJyk7XG5leHBvcnRzLmVuY29kZSA9IGV4cG9ydHMuc3RyaW5naWZ5ID0gcmVxdWlyZSgnLi9lbmNvZGUnKTtcbiIsInZhciBpbyA9IHJlcXVpcmUoJy4vbGliL3NvY2tldC5pbycpO1xudmFyIGJyb3dzZXIgPSByZXF1aXJlKCdib3dzZXInKS5icm93c2VyO1xudmFyIHF1ZXJ5c3RyaW5nID0gcmVxdWlyZSgncXVlcnlzdHJpbmcnKTtcbnZhciBodG1sMmNhbnZhcyA9IHJlcXVpcmUoJy4vbGliL2h0bWwyY2FudmFzJyk7XG52YXIgY2FudmFzMmltYWdlID0gcmVxdWlyZSgnLi9saWIvY2FudmFzMmltYWdlJyk7XG5cbmZ1bmN0aW9uIEJyb3dzZXJtYW4ob3B0aW9ucykge1xuXHRjb25zb2xlLmxvZyhvcHRpb25zKTtcblx0dmFyIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXHR0aGlzLnR5cGUgPSBvcHRpb25zLnR5cGUgfHwgJ21vY2hhJyxcblx0dGhpcy5pbnN0YW5jZSA9IG9wdGlvbnMuaW5zdGFuY2UgfHwgbW9jaGE7XG5cdHRoaXMuc2VydmVyID0gb3B0aW9ucy5zZXJ2ZXIgfHwgJ2xvY2FsaG9zdDo5MDAwJztcblx0dGhpcy5yZXBvcnRlciA9IHtcblx0XHQnbW9jaGEnOiByZXF1aXJlKCcuL3JlcG9ydGVyL21vY2hhJyksXG5cdFx0J3BsYWluJzogcmVxdWlyZSgnLi9yZXBvcnRlci9wbGFpbicpXG5cdH1cbn1cblxuQnJvd3Nlcm1hbi5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCkge1xuXG5cdGNvbnNvbGUubG9nKCdpbml0IGJyb3dzZXJtYW4nKTtcblxuXHR2YXIgcXVlcnkgPSBxdWVyeXN0cmluZy5wYXJzZShsb2NhdGlvbi5zZWFyY2gucmVwbGFjZSgnPycsICcnKSk7XG5cdHZhciBqb2JJZCA9IHF1ZXJ5LmJyb3dzZXJtYW5fam9iaWQ7XG5cdHZhciBuZWVkc1NjZWVuc2hvdCA9IHF1ZXJ5LmJyb3dzZXJtYW5fc2NyZWVuc2hvdD09J2ZhbHNlJz9mYWxzZTp0cnVlO1xuXHR2YXIgY29ubmVjdGVkID0gZmFsc2U7XG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRpZiAoIWpvYklkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIHNvY2tldCA9IGlvLmNvbm5lY3QoJ2h0dHA6Ly8nICsgdGhpcy5zZXJ2ZXIgKyAnL3Rlc3RlcicpO1xuXHRzb2NrZXQub24oJ2Nvbm5lY3QnLCBmdW5jdGlvbigpIHtcblx0XHRjb25uZWN0ZWQgPSB0cnVlO1xuXHRcdGNvbnNvbGUubG9nKCdjb25uZWN0ZWQgdG8gc2VydmVyJyk7XG5cdH0pO1xuXHR2YXIgcmVzdWx0ID0ge1xuXHRcdGpvYklkOiBqb2JJZCxcblx0XHRicm93c2VyOiB7XG5cdFx0XHRuYW1lOiBicm93c2VyLm5hbWUudG9Mb3dlckNhc2UoKSxcblx0XHRcdHZlcnNpb246IGJyb3dzZXIudmVyc2lvblxuXHRcdH0sXG5cdFx0ZGF0YToge1xuXHRcdFx0cGFzc2VzOiBbXSxcblx0XHRcdGZhaWx1cmVzOiBbXVxuXHRcdH1cblx0fTtcblx0c2VsZi5yZXBvcnRlcltzZWxmLnR5cGVdLnJ1bih7XG5cdFx0aW5zdGFuY2U6IHNlbGYuaW5zdGFuY2UsXG5cdFx0cGFzczogZnVuY3Rpb24oZGF0YSkge1xuXHRcdFx0cmVzdWx0LmRhdGEucGFzc2VzLnB1c2goZGF0YSk7XG5cdFx0fSxcblx0XHRmYWlsOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRyZXN1bHQuZGF0YS5mYWlsdXJlcy5wdXNoKGRhdGEpO1xuXHRcdH0sXG5cdFx0ZW5kOiBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRpZiAoIWNvbm5lY3RlZCkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAobmVlZHNTY2VlbnNob3QpIHtcblx0XHRcdFx0XHRodG1sMmNhbnZhcyhkb2N1bWVudC5ib2R5LCB7XG5cdFx0XHRcdFx0XHRvbnJlbmRlcmVkOiBmdW5jdGlvbihjYW52YXMpIHtcblx0XHRcdFx0XHRcdFx0dmFyIGltZyA9IGNhbnZhczJpbWFnZS5zYXZlQXNKUEVHKGNhbnZhcywgdHJ1ZSk7XG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5zY3JlZW5zaG90ID0gaW1nLm91dGVySFRNTDtcblx0XHRcdFx0XHRcdFx0c29ja2V0LmVtaXQoJ2RvbmUnLCByZXN1bHQpO1xuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KHdpbmRvdy5jbG9zZSwgNTAwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRzb2NrZXQuZW1pdCgnZG9uZScsIHJlc3VsdCk7XG5cdFx0XHRcdFx0Ly9zZXRUaW1lb3V0KHdpbmRvdy5jbG9zZSwgNTAwKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcblx0XHRcdH0sIDIwMCk7XG5cdFx0fVxuXHR9KTtcbn07XG5cbnZhciBzZXJ2ZXI9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jyb3dzZXJtYW4nKS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VydmVyJyk7XG5pZiAod2luZG93Lm1vY2hhKSB7XG5cdG5ldyBCcm93c2VybWFuKHtcblx0XHR0eXBlOiAnbW9jaGEnLFxuXHRcdGluc3RhbmNlOiB3aW5kb3cubW9jaGEsXG5cdFx0c2VydmVyOlx0c2VydmVyXG5cblx0fSkuaW5pdCgpXG59IGVsc2Uge1xuXHRuZXcgQnJvd3Nlcm1hbih7XG5cdFx0dHlwZTogJ3BsYWluJyxcblx0XHRpbnN0YW5jZTogd2luZG93LFxuXHRcdHNlcnZlcjpzZXJ2ZXJcblx0fSkuaW5pdCgpXG59IiwiLypcbiAqIENhbnZhczJJbWFnZSB2MC4xXG4gKiBDb3B5cmlnaHQgKGMpIDIwMDggSmFjb2IgU2VpZGVsaW4sIGpzZWlkZWxpbkBuaWhpbG9naWMuZGtcbiAqIE1JVCBMaWNlbnNlIFtodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocF1cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcblxuXHQvLyBjaGVjayBpZiB3ZSBoYXZlIGNhbnZhcyBzdXBwb3J0XG5cdHZhciBiSGFzQ2FudmFzID0gZmFsc2U7XG5cdHZhciBvQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblx0aWYgKG9DYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpKSB7XG5cdFx0Ykhhc0NhbnZhcyA9IHRydWU7XG5cdH1cblxuXHQvLyBubyBjYW52YXMsIGJhaWwgb3V0LlxuXHRpZiAoIWJIYXNDYW52YXMpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2F2ZUFzQk1QIDogZnVuY3Rpb24oKXt9LFxuXHRcdFx0c2F2ZUFzUE5HIDogZnVuY3Rpb24oKXt9LFxuXHRcdFx0c2F2ZUFzSlBFRyA6IGZ1bmN0aW9uKCl7fVxuXHRcdH1cblx0fVxuXG5cdHZhciBiSGFzSW1hZ2VEYXRhID0gISEob0NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikuZ2V0SW1hZ2VEYXRhKTtcblx0dmFyIGJIYXNEYXRhVVJMID0gISEob0NhbnZhcy50b0RhdGFVUkwpO1xuXHR2YXIgYkhhc0Jhc2U2NCA9ICEhKHdpbmRvdy5idG9hKTtcblxuXHR2YXIgc3RyRG93bmxvYWRNaW1lID0gXCJpbWFnZS9vY3RldC1zdHJlYW1cIjtcblxuXHQvLyBvaywgd2UncmUgZ29vZFxuXHR2YXIgcmVhZENhbnZhc0RhdGEgPSBmdW5jdGlvbihvQ2FudmFzKSB7XG5cdFx0dmFyIGlXaWR0aCA9IHBhcnNlSW50KG9DYW52YXMud2lkdGgpO1xuXHRcdHZhciBpSGVpZ2h0ID0gcGFyc2VJbnQob0NhbnZhcy5oZWlnaHQpO1xuXHRcdHJldHVybiBvQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKS5nZXRJbWFnZURhdGEoMCwwLGlXaWR0aCxpSGVpZ2h0KTtcblx0fVxuXG5cdC8vIGJhc2U2NCBlbmNvZGVzIGVpdGhlciBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBjaGFyY29kZXNcblx0dmFyIGVuY29kZURhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG5cdFx0dmFyIHN0ckRhdGEgPSBcIlwiO1xuXHRcdGlmICh0eXBlb2YgZGF0YSA9PSBcInN0cmluZ1wiKSB7XG5cdFx0XHRzdHJEYXRhID0gZGF0YTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIGFEYXRhID0gZGF0YTtcblx0XHRcdGZvciAodmFyIGk9MDtpPGFEYXRhLmxlbmd0aDtpKyspIHtcblx0XHRcdFx0c3RyRGF0YSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGFEYXRhW2ldKTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGJ0b2Eoc3RyRGF0YSk7XG5cdH1cblxuXHQvLyBjcmVhdGVzIGEgYmFzZTY0IGVuY29kZWQgc3RyaW5nIGNvbnRhaW5pbmcgQk1QIGRhdGFcblx0Ly8gdGFrZXMgYW4gaW1hZ2VkYXRhIG9iamVjdCBhcyBhcmd1bWVudFxuXHR2YXIgY3JlYXRlQk1QID0gZnVuY3Rpb24ob0RhdGEpIHtcblx0XHR2YXIgYUhlYWRlciA9IFtdO1xuXHRcblx0XHR2YXIgaVdpZHRoID0gb0RhdGEud2lkdGg7XG5cdFx0dmFyIGlIZWlnaHQgPSBvRGF0YS5oZWlnaHQ7XG5cblx0XHRhSGVhZGVyLnB1c2goMHg0Mik7IC8vIG1hZ2ljIDFcblx0XHRhSGVhZGVyLnB1c2goMHg0RCk7IFxuXHRcblx0XHR2YXIgaUZpbGVTaXplID0gaVdpZHRoKmlIZWlnaHQqMyArIDU0OyAvLyB0b3RhbCBoZWFkZXIgc2l6ZSA9IDU0IGJ5dGVzXG5cdFx0YUhlYWRlci5wdXNoKGlGaWxlU2l6ZSAlIDI1Nik7IGlGaWxlU2l6ZSA9IE1hdGguZmxvb3IoaUZpbGVTaXplIC8gMjU2KTtcblx0XHRhSGVhZGVyLnB1c2goaUZpbGVTaXplICUgMjU2KTsgaUZpbGVTaXplID0gTWF0aC5mbG9vcihpRmlsZVNpemUgLyAyNTYpO1xuXHRcdGFIZWFkZXIucHVzaChpRmlsZVNpemUgJSAyNTYpOyBpRmlsZVNpemUgPSBNYXRoLmZsb29yKGlGaWxlU2l6ZSAvIDI1Nik7XG5cdFx0YUhlYWRlci5wdXNoKGlGaWxlU2l6ZSAlIDI1Nik7XG5cblx0XHRhSGVhZGVyLnB1c2goMCk7IC8vIHJlc2VydmVkXG5cdFx0YUhlYWRlci5wdXNoKDApO1xuXHRcdGFIZWFkZXIucHVzaCgwKTsgLy8gcmVzZXJ2ZWRcblx0XHRhSGVhZGVyLnB1c2goMCk7XG5cblx0XHRhSGVhZGVyLnB1c2goNTQpOyAvLyBkYXRhb2Zmc2V0XG5cdFx0YUhlYWRlci5wdXNoKDApO1xuXHRcdGFIZWFkZXIucHVzaCgwKTtcblx0XHRhSGVhZGVyLnB1c2goMCk7XG5cblx0XHR2YXIgYUluZm9IZWFkZXIgPSBbXTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKDQwKTsgLy8gaW5mbyBoZWFkZXIgc2l6ZVxuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXG5cdFx0dmFyIGlJbWFnZVdpZHRoID0gaVdpZHRoO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaUltYWdlV2lkdGggJSAyNTYpOyBpSW1hZ2VXaWR0aCA9IE1hdGguZmxvb3IoaUltYWdlV2lkdGggLyAyNTYpO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaUltYWdlV2lkdGggJSAyNTYpOyBpSW1hZ2VXaWR0aCA9IE1hdGguZmxvb3IoaUltYWdlV2lkdGggLyAyNTYpO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaUltYWdlV2lkdGggJSAyNTYpOyBpSW1hZ2VXaWR0aCA9IE1hdGguZmxvb3IoaUltYWdlV2lkdGggLyAyNTYpO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goaUltYWdlV2lkdGggJSAyNTYpO1xuXHRcblx0XHR2YXIgaUltYWdlSGVpZ2h0ID0gaUhlaWdodDtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZUhlaWdodCAlIDI1Nik7IGlJbWFnZUhlaWdodCA9IE1hdGguZmxvb3IoaUltYWdlSGVpZ2h0IC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZUhlaWdodCAlIDI1Nik7IGlJbWFnZUhlaWdodCA9IE1hdGguZmxvb3IoaUltYWdlSGVpZ2h0IC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZUhlaWdodCAlIDI1Nik7IGlJbWFnZUhlaWdodCA9IE1hdGguZmxvb3IoaUltYWdlSGVpZ2h0IC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZUhlaWdodCAlIDI1Nik7XG5cdFxuXHRcdGFJbmZvSGVhZGVyLnB1c2goMSk7IC8vIG51bSBvZiBwbGFuZXNcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXHRcblx0XHRhSW5mb0hlYWRlci5wdXNoKDI0KTsgLy8gbnVtIG9mIGJpdHMgcGVyIHBpeGVsXG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblx0XG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTsgLy8gY29tcHJlc3Npb24gPSBub25lXG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFxuXHRcdHZhciBpRGF0YVNpemUgPSBpV2lkdGgqaUhlaWdodCozOyBcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlEYXRhU2l6ZSAlIDI1Nik7IGlEYXRhU2l6ZSA9IE1hdGguZmxvb3IoaURhdGFTaXplIC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlEYXRhU2l6ZSAlIDI1Nik7IGlEYXRhU2l6ZSA9IE1hdGguZmxvb3IoaURhdGFTaXplIC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlEYXRhU2l6ZSAlIDI1Nik7IGlEYXRhU2l6ZSA9IE1hdGguZmxvb3IoaURhdGFTaXplIC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlEYXRhU2l6ZSAlIDI1Nik7IFxuXHRcblx0XHRmb3IgKHZhciBpPTA7aTwxNjtpKyspIHtcblx0XHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XHQvLyB0aGVzZSBieXRlcyBub3QgdXNlZFxuXHRcdH1cblx0XG5cdFx0dmFyIGlQYWRkaW5nID0gKDQgLSAoKGlXaWR0aCAqIDMpICUgNCkpICUgNDtcblxuXHRcdHZhciBhSW1nRGF0YSA9IG9EYXRhLmRhdGE7XG5cblx0XHR2YXIgc3RyUGl4ZWxEYXRhID0gXCJcIjtcblx0XHR2YXIgeSA9IGlIZWlnaHQ7XG5cdFx0ZG8ge1xuXHRcdFx0dmFyIGlPZmZzZXRZID0gaVdpZHRoKih5LTEpKjQ7XG5cdFx0XHR2YXIgc3RyUGl4ZWxSb3cgPSBcIlwiO1xuXHRcdFx0Zm9yICh2YXIgeD0wO3g8aVdpZHRoO3grKykge1xuXHRcdFx0XHR2YXIgaU9mZnNldFggPSA0Kng7XG5cblx0XHRcdFx0c3RyUGl4ZWxSb3cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhSW1nRGF0YVtpT2Zmc2V0WStpT2Zmc2V0WCsyXSk7XG5cdFx0XHRcdHN0clBpeGVsUm93ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYUltZ0RhdGFbaU9mZnNldFkraU9mZnNldFgrMV0pO1xuXHRcdFx0XHRzdHJQaXhlbFJvdyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGFJbWdEYXRhW2lPZmZzZXRZK2lPZmZzZXRYXSk7XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBjPTA7YzxpUGFkZGluZztjKyspIHtcblx0XHRcdFx0c3RyUGl4ZWxSb3cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZSgwKTtcblx0XHRcdH1cblx0XHRcdHN0clBpeGVsRGF0YSArPSBzdHJQaXhlbFJvdztcblx0XHR9IHdoaWxlICgtLXkpO1xuXG5cdFx0dmFyIHN0ckVuY29kZWQgPSBlbmNvZGVEYXRhKGFIZWFkZXIuY29uY2F0KGFJbmZvSGVhZGVyKSkgKyBlbmNvZGVEYXRhKHN0clBpeGVsRGF0YSk7XG5cblx0XHRyZXR1cm4gc3RyRW5jb2RlZDtcblx0fVxuXG5cblx0Ly8gc2VuZHMgdGhlIGdlbmVyYXRlZCBmaWxlIHRvIHRoZSBjbGllbnRcblx0dmFyIHNhdmVGaWxlID0gZnVuY3Rpb24oc3RyRGF0YSkge1xuXHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBzdHJEYXRhO1xuXHR9XG5cblx0dmFyIG1ha2VEYXRhVVJJID0gZnVuY3Rpb24oc3RyRGF0YSwgc3RyTWltZSkge1xuXHRcdHJldHVybiBcImRhdGE6XCIgKyBzdHJNaW1lICsgXCI7YmFzZTY0LFwiICsgc3RyRGF0YTtcblx0fVxuXG5cdC8vIGdlbmVyYXRlcyBhIDxpbWc+IG9iamVjdCBjb250YWluaW5nIHRoZSBpbWFnZWRhdGFcblx0dmFyIG1ha2VJbWFnZU9iamVjdCA9IGZ1bmN0aW9uKHN0clNvdXJjZSkge1xuXHRcdHZhciBvSW1nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XG5cdFx0b0ltZ0VsZW1lbnQuc3JjID0gc3RyU291cmNlO1xuXHRcdHJldHVybiBvSW1nRWxlbWVudDtcblx0fVxuXG5cdHZhciBzY2FsZUNhbnZhcyA9IGZ1bmN0aW9uKG9DYW52YXMsIGlXaWR0aCwgaUhlaWdodCkge1xuXHRcdGlmIChpV2lkdGggJiYgaUhlaWdodCkge1xuXHRcdFx0dmFyIG9TYXZlQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcblx0XHRcdG9TYXZlQ2FudmFzLndpZHRoID0gaVdpZHRoO1xuXHRcdFx0b1NhdmVDYW52YXMuaGVpZ2h0ID0gaUhlaWdodDtcblx0XHRcdG9TYXZlQ2FudmFzLnN0eWxlLndpZHRoID0gaVdpZHRoK1wicHhcIjtcblx0XHRcdG9TYXZlQ2FudmFzLnN0eWxlLmhlaWdodCA9IGlIZWlnaHQrXCJweFwiO1xuXG5cdFx0XHR2YXIgb1NhdmVDdHggPSBvU2F2ZUNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cblx0XHRcdG9TYXZlQ3R4LmRyYXdJbWFnZShvQ2FudmFzLCAwLCAwLCBvQ2FudmFzLndpZHRoLCBvQ2FudmFzLmhlaWdodCwgMCwgMCwgaVdpZHRoLCBpSGVpZ2h0KTtcblx0XHRcdHJldHVybiBvU2F2ZUNhbnZhcztcblx0XHR9XG5cdFx0cmV0dXJuIG9DYW52YXM7XG5cdH1cblxuXHRyZXR1cm4ge1xuXG5cdFx0c2F2ZUFzUE5HIDogZnVuY3Rpb24ob0NhbnZhcywgYlJldHVybkltZywgaVdpZHRoLCBpSGVpZ2h0KSB7XG5cdFx0XHRpZiAoIWJIYXNEYXRhVVJMKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHRcdHZhciBvU2NhbGVkQ2FudmFzID0gc2NhbGVDYW52YXMob0NhbnZhcywgaVdpZHRoLCBpSGVpZ2h0KTtcblx0XHRcdHZhciBzdHJEYXRhID0gb1NjYWxlZENhbnZhcy50b0RhdGFVUkwoXCJpbWFnZS9wbmdcIik7XG5cdFx0XHRpZiAoYlJldHVybkltZykge1xuXHRcdFx0XHRyZXR1cm4gbWFrZUltYWdlT2JqZWN0KHN0ckRhdGEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2F2ZUZpbGUoc3RyRGF0YS5yZXBsYWNlKFwiaW1hZ2UvcG5nXCIsIHN0ckRvd25sb2FkTWltZSkpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblxuXHRcdHNhdmVBc0pQRUcgOiBmdW5jdGlvbihvQ2FudmFzLCBiUmV0dXJuSW1nLCBpV2lkdGgsIGlIZWlnaHQpIHtcblx0XHRcdGlmICghYkhhc0RhdGFVUkwpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb1NjYWxlZENhbnZhcyA9IHNjYWxlQ2FudmFzKG9DYW52YXMsIGlXaWR0aCwgaUhlaWdodCk7XG5cdFx0XHR2YXIgc3RyTWltZSA9IFwiaW1hZ2UvanBlZ1wiO1xuXHRcdFx0dmFyIHN0ckRhdGEgPSBvU2NhbGVkQ2FudmFzLnRvRGF0YVVSTChzdHJNaW1lKTtcblx0XG5cdFx0XHQvLyBjaGVjayBpZiBicm93c2VyIGFjdHVhbGx5IHN1cHBvcnRzIGpwZWcgYnkgbG9va2luZyBmb3IgdGhlIG1pbWUgdHlwZSBpbiB0aGUgZGF0YSB1cmkuXG5cdFx0XHQvLyBpZiBub3QsIHJldHVybiBmYWxzZVxuXHRcdFx0aWYgKHN0ckRhdGEuaW5kZXhPZihzdHJNaW1lKSAhPSA1KSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGJSZXR1cm5JbWcpIHtcblx0XHRcdFx0cmV0dXJuIG1ha2VJbWFnZU9iamVjdChzdHJEYXRhKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNhdmVGaWxlKHN0ckRhdGEucmVwbGFjZShzdHJNaW1lLCBzdHJEb3dubG9hZE1pbWUpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRzYXZlQXNCTVAgOiBmdW5jdGlvbihvQ2FudmFzLCBiUmV0dXJuSW1nLCBpV2lkdGgsIGlIZWlnaHQpIHtcblx0XHRcdGlmICghKGJIYXNJbWFnZURhdGEgJiYgYkhhc0Jhc2U2NCkpIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb1NjYWxlZENhbnZhcyA9IHNjYWxlQ2FudmFzKG9DYW52YXMsIGlXaWR0aCwgaUhlaWdodCk7XG5cblx0XHRcdHZhciBvRGF0YSA9IHJlYWRDYW52YXNEYXRhKG9TY2FsZWRDYW52YXMpO1xuXHRcdFx0dmFyIHN0ckltZ0RhdGEgPSBjcmVhdGVCTVAob0RhdGEpO1xuXHRcdFx0aWYgKGJSZXR1cm5JbWcpIHtcblx0XHRcdFx0cmV0dXJuIG1ha2VJbWFnZU9iamVjdChtYWtlRGF0YVVSSShzdHJJbWdEYXRhLCBcImltYWdlL2JtcFwiKSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzYXZlRmlsZShtYWtlRGF0YVVSSShzdHJJbWdEYXRhLCBzdHJEb3dubG9hZE1pbWUpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0fTtcblxufSkoKTsiLCIvKlxuICBodG1sMmNhbnZhcyAwLjQuMSA8aHR0cDovL2h0bWwyY2FudmFzLmhlcnR6ZW4uY29tPlxuICBDb3B5cmlnaHQgKGMpIDIwMTMgTmlrbGFzIHZvbiBIZXJ0emVuXG5cbiAgUmVsZWFzZWQgdW5kZXIgTUlUIExpY2Vuc2VcbiovXG5cbihmdW5jdGlvbih3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQpe1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIF9odG1sMmNhbnZhcyA9IHt9LFxucHJldmlvdXNFbGVtZW50LFxuY29tcHV0ZWRDU1MsXG5odG1sMmNhbnZhcztcblxuX2h0bWwyY2FudmFzLlV0aWwgPSB7fTtcblxuX2h0bWwyY2FudmFzLlV0aWwubG9nID0gZnVuY3Rpb24oYSkge1xuICBpZiAoX2h0bWwyY2FudmFzLmxvZ2dpbmcgJiYgd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nKSB7XG4gICAgd2luZG93LmNvbnNvbGUubG9nKGEpO1xuICB9XG59O1xuXG5faHRtbDJjYW52YXMuVXRpbC50cmltVGV4dCA9IChmdW5jdGlvbihpc05hdGl2ZSl7XG4gIHJldHVybiBmdW5jdGlvbihpbnB1dCkge1xuICAgIHJldHVybiBpc05hdGl2ZSA/IGlzTmF0aXZlLmFwcGx5KGlucHV0KSA6ICgoaW5wdXQgfHwgJycpICsgJycpLnJlcGxhY2UoIC9eXFxzK3xcXHMrJC9nICwgJycgKTtcbiAgfTtcbn0pKFN0cmluZy5wcm90b3R5cGUudHJpbSk7XG5cbl9odG1sMmNhbnZhcy5VdGlsLmFzRmxvYXQgPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiBwYXJzZUZsb2F0KHYpO1xufTtcblxuKGZ1bmN0aW9uKCkge1xuICAvLyBUT0RPOiBzdXBwb3J0IGFsbCBwb3NzaWJsZSBsZW5ndGggdmFsdWVzXG4gIHZhciBURVhUX1NIQURPV19QUk9QRVJUWSA9IC8oKHJnYmF8cmdiKVxcKFteXFwpXStcXCkoXFxzLT9cXGQrcHgpezAsfSkvZztcbiAgdmFyIFRFWFRfU0hBRE9XX1ZBTFVFUyA9IC8oLT9cXGQrcHgpfCgjLispfChyZ2JcXCguK1xcKSl8KHJnYmFcXCguK1xcKSkvZztcbiAgX2h0bWwyY2FudmFzLlV0aWwucGFyc2VUZXh0U2hhZG93cyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIGlmICghdmFsdWUgfHwgdmFsdWUgPT09ICdub25lJykge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIC8vIGZpbmQgbXVsdGlwbGUgc2hhZG93IGRlY2xhcmF0aW9uc1xuICAgIHZhciBzaGFkb3dzID0gdmFsdWUubWF0Y2goVEVYVF9TSEFET1dfUFJPUEVSVFkpLFxuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBzaGFkb3dzICYmIChpIDwgc2hhZG93cy5sZW5ndGgpOyBpKyspIHtcbiAgICAgIHZhciBzID0gc2hhZG93c1tpXS5tYXRjaChURVhUX1NIQURPV19WQUxVRVMpO1xuICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgY29sb3I6IHNbMF0sXG4gICAgICAgIG9mZnNldFg6IHNbMV0gPyBzWzFdLnJlcGxhY2UoJ3B4JywgJycpIDogMCxcbiAgICAgICAgb2Zmc2V0WTogc1syXSA/IHNbMl0ucmVwbGFjZSgncHgnLCAnJykgOiAwLFxuICAgICAgICBibHVyOiBzWzNdID8gc1szXS5yZXBsYWNlKCdweCcsICcnKSA6IDBcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfTtcbn0pKCk7XG5cblxuX2h0bWwyY2FudmFzLlV0aWwucGFyc2VCYWNrZ3JvdW5kSW1hZ2UgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICB2YXIgd2hpdGVzcGFjZSA9ICcgXFxyXFxuXFx0JyxcbiAgICAgICAgbWV0aG9kLCBkZWZpbml0aW9uLCBwcmVmaXgsIHByZWZpeF9pLCBibG9jaywgcmVzdWx0cyA9IFtdLFxuICAgICAgICBjLCBtb2RlID0gMCwgbnVtUGFyZW4gPSAwLCBxdW90ZSwgYXJncztcblxuICAgIHZhciBhcHBlbmRSZXN1bHQgPSBmdW5jdGlvbigpe1xuICAgICAgICBpZihtZXRob2QpIHtcbiAgICAgICAgICAgIGlmKGRlZmluaXRpb24uc3Vic3RyKCAwLCAxICkgPT09ICdcIicpIHtcbiAgICAgICAgICAgICAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbi5zdWJzdHIoIDEsIGRlZmluaXRpb24ubGVuZ3RoIC0gMiApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGVmaW5pdGlvbikge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkZWZpbml0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKG1ldGhvZC5zdWJzdHIoIDAsIDEgKSA9PT0gJy0nICYmXG4gICAgICAgICAgICAgICAgICAgIChwcmVmaXhfaSA9IG1ldGhvZC5pbmRleE9mKCAnLScsIDEgKSArIDEpID4gMCkge1xuICAgICAgICAgICAgICAgIHByZWZpeCA9IG1ldGhvZC5zdWJzdHIoIDAsIHByZWZpeF9pKTtcbiAgICAgICAgICAgICAgICBtZXRob2QgPSBtZXRob2Quc3Vic3RyKCBwcmVmaXhfaSApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICBwcmVmaXg6IHByZWZpeCxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IG1ldGhvZC50b0xvd2VyQ2FzZSgpLFxuICAgICAgICAgICAgICAgIHZhbHVlOiBibG9jayxcbiAgICAgICAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBhcmdzID0gW107IC8vZm9yIHNvbWUgb2RkIHJlYXNvbiwgc2V0dGluZyAubGVuZ3RoID0gMCBkaWRuJ3Qgd29yayBpbiBzYWZhcmlcbiAgICAgICAgbWV0aG9kID1cbiAgICAgICAgICAgIHByZWZpeCA9XG4gICAgICAgICAgICBkZWZpbml0aW9uID1cbiAgICAgICAgICAgIGJsb2NrID0gJyc7XG4gICAgfTtcblxuICAgIGFwcGVuZFJlc3VsdCgpO1xuICAgIGZvcih2YXIgaSA9IDAsIGlpID0gdmFsdWUubGVuZ3RoOyBpPGlpOyBpKyspIHtcbiAgICAgICAgYyA9IHZhbHVlW2ldO1xuICAgICAgICBpZihtb2RlID09PSAwICYmIHdoaXRlc3BhY2UuaW5kZXhPZiggYyApID4gLTEpe1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoKGMpIHtcbiAgICAgICAgICAgIGNhc2UgJ1wiJzpcbiAgICAgICAgICAgICAgICBpZighcXVvdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcXVvdGUgPSBjO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHF1b3RlID09PSBjKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1b3RlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJygnOlxuICAgICAgICAgICAgICAgIGlmKHF1b3RlKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihtb2RlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vZGUgPSAxO1xuICAgICAgICAgICAgICAgICAgICBibG9jayArPSBjO1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBudW1QYXJlbisrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnKSc6XG4gICAgICAgICAgICAgICAgaWYocXVvdGUpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKG1vZGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobnVtUGFyZW4gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2sgKz0gYztcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcGVuZFJlc3VsdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBudW1QYXJlbi0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcsJzpcbiAgICAgICAgICAgICAgICBpZihxdW90ZSkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYobW9kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBhcHBlbmRSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1vZGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobnVtUGFyZW4gPT09IDAgJiYgIW1ldGhvZC5tYXRjaCgvXnVybCQvaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZ3MucHVzaChkZWZpbml0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmluaXRpb24gPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrICs9IGM7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJsb2NrICs9IGM7XG4gICAgICAgIGlmKG1vZGUgPT09IDApIHsgbWV0aG9kICs9IGM7IH1cbiAgICAgICAgZWxzZSB7IGRlZmluaXRpb24gKz0gYzsgfVxuICAgIH1cbiAgICBhcHBlbmRSZXN1bHQoKTtcblxuICAgIHJldHVybiByZXN1bHRzO1xufTtcblxuX2h0bWwyY2FudmFzLlV0aWwuQm91bmRzID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgdmFyIGNsaWVudFJlY3QsIGJvdW5kcyA9IHt9O1xuXG4gIGlmIChlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCl7XG4gICAgY2xpZW50UmVjdCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAvLyBUT0RPIGFkZCBzY3JvbGwgcG9zaXRpb24gdG8gYm91bmRzLCBzbyBubyBzY3JvbGxpbmcgb2Ygd2luZG93IG5lY2Vzc2FyeVxuICAgIGJvdW5kcy50b3AgPSBjbGllbnRSZWN0LnRvcDtcbiAgICBib3VuZHMuYm90dG9tID0gY2xpZW50UmVjdC5ib3R0b20gfHwgKGNsaWVudFJlY3QudG9wICsgY2xpZW50UmVjdC5oZWlnaHQpO1xuICAgIGJvdW5kcy5sZWZ0ID0gY2xpZW50UmVjdC5sZWZ0O1xuXG4gICAgYm91bmRzLndpZHRoID0gZWxlbWVudC5vZmZzZXRXaWR0aDtcbiAgICBib3VuZHMuaGVpZ2h0ID0gZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gIH1cblxuICByZXR1cm4gYm91bmRzO1xufTtcblxuLy8gVE9ETyBpZGVhbGx5LCB3ZSdkIHdhbnQgZXZlcnl0aGluZyB0byBnbyB0aHJvdWdoIHRoaXMgZnVuY3Rpb24gaW5zdGVhZCBvZiBVdGlsLkJvdW5kcyxcbi8vIGJ1dCB3b3VsZCByZXF1aXJlIGZ1cnRoZXIgd29yayB0byBjYWxjdWxhdGUgdGhlIGNvcnJlY3QgcG9zaXRpb25zIGZvciBlbGVtZW50cyB3aXRoIG9mZnNldFBhcmVudHNcbl9odG1sMmNhbnZhcy5VdGlsLk9mZnNldEJvdW5kcyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHZhciBwYXJlbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCA/IF9odG1sMmNhbnZhcy5VdGlsLk9mZnNldEJvdW5kcyhlbGVtZW50Lm9mZnNldFBhcmVudCkgOiB7dG9wOiAwLCBsZWZ0OiAwfTtcblxuICByZXR1cm4ge1xuICAgIHRvcDogZWxlbWVudC5vZmZzZXRUb3AgKyBwYXJlbnQudG9wLFxuICAgIGJvdHRvbTogZWxlbWVudC5vZmZzZXRUb3AgKyBlbGVtZW50Lm9mZnNldEhlaWdodCArIHBhcmVudC50b3AsXG4gICAgbGVmdDogZWxlbWVudC5vZmZzZXRMZWZ0ICsgcGFyZW50LmxlZnQsXG4gICAgd2lkdGg6IGVsZW1lbnQub2Zmc2V0V2lkdGgsXG4gICAgaGVpZ2h0OiBlbGVtZW50Lm9mZnNldEhlaWdodFxuICB9O1xufTtcblxuZnVuY3Rpb24gdG9QWChlbGVtZW50LCBhdHRyaWJ1dGUsIHZhbHVlICkge1xuICAgIHZhciByc0xlZnQgPSBlbGVtZW50LnJ1bnRpbWVTdHlsZSAmJiBlbGVtZW50LnJ1bnRpbWVTdHlsZVthdHRyaWJ1dGVdLFxuICAgICAgICBsZWZ0LFxuICAgICAgICBzdHlsZSA9IGVsZW1lbnQuc3R5bGU7XG5cbiAgICAvLyBDaGVjayBpZiB3ZSBhcmUgbm90IGRlYWxpbmcgd2l0aCBwaXhlbHMsIChPcGVyYSBoYXMgaXNzdWVzIHdpdGggdGhpcylcbiAgICAvLyBQb3J0ZWQgZnJvbSBqUXVlcnkgY3NzLmpzXG4gICAgLy8gRnJvbSB0aGUgYXdlc29tZSBoYWNrIGJ5IERlYW4gRWR3YXJkc1xuICAgIC8vIGh0dHA6Ly9lcmlrLmVhZS5uZXQvYXJjaGl2ZXMvMjAwNy8wNy8yNy8xOC41NC4xNS8jY29tbWVudC0xMDIyOTFcblxuICAgIC8vIElmIHdlJ3JlIG5vdCBkZWFsaW5nIHdpdGggYSByZWd1bGFyIHBpeGVsIG51bWJlclxuICAgIC8vIGJ1dCBhIG51bWJlciB0aGF0IGhhcyBhIHdlaXJkIGVuZGluZywgd2UgbmVlZCB0byBjb252ZXJ0IGl0IHRvIHBpeGVsc1xuXG4gICAgaWYgKCAhL14tP1swLTldK1xcLj9bMC05XSooPzpweCk/JC9pLnRlc3QoIHZhbHVlICkgJiYgL14tP1xcZC8udGVzdCh2YWx1ZSkgKSB7XG4gICAgICAgIC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCB2YWx1ZXNcbiAgICAgICAgbGVmdCA9IHN0eWxlLmxlZnQ7XG5cbiAgICAgICAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuICAgICAgICBpZiAocnNMZWZ0KSB7XG4gICAgICAgICAgICBlbGVtZW50LnJ1bnRpbWVTdHlsZS5sZWZ0ID0gZWxlbWVudC5jdXJyZW50U3R5bGUubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBzdHlsZS5sZWZ0ID0gYXR0cmlidXRlID09PSBcImZvbnRTaXplXCIgPyBcIjFlbVwiIDogKHZhbHVlIHx8IDApO1xuICAgICAgICB2YWx1ZSA9IHN0eWxlLnBpeGVsTGVmdCArIFwicHhcIjtcblxuICAgICAgICAvLyBSZXZlcnQgdGhlIGNoYW5nZWQgdmFsdWVzXG4gICAgICAgIHN0eWxlLmxlZnQgPSBsZWZ0O1xuICAgICAgICBpZiAocnNMZWZ0KSB7XG4gICAgICAgICAgICBlbGVtZW50LnJ1bnRpbWVTdHlsZS5sZWZ0ID0gcnNMZWZ0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCEvXih0aGlufG1lZGl1bXx0aGljaykkL2kudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQocGFyc2VGbG9hdCh2YWx1ZSkpICsgXCJweFwiO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gYXNJbnQodmFsKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbCwgMTApO1xufVxuXG5mdW5jdGlvbiBwYXJzZUJhY2tncm91bmRTaXplUG9zaXRpb24odmFsdWUsIGVsZW1lbnQsIGF0dHJpYnV0ZSwgaW5kZXgpIHtcbiAgICB2YWx1ZSA9ICh2YWx1ZSB8fCAnJykuc3BsaXQoJywnKTtcbiAgICB2YWx1ZSA9IHZhbHVlW2luZGV4IHx8IDBdIHx8IHZhbHVlWzBdIHx8ICdhdXRvJztcbiAgICB2YWx1ZSA9IF9odG1sMmNhbnZhcy5VdGlsLnRyaW1UZXh0KHZhbHVlKS5zcGxpdCgnICcpO1xuXG4gICAgaWYoYXR0cmlidXRlID09PSAnYmFja2dyb3VuZFNpemUnICYmICghdmFsdWVbMF0gfHwgdmFsdWVbMF0ubWF0Y2goL2NvdmVyfGNvbnRhaW58YXV0by8pKSkge1xuICAgICAgICAvL3RoZXNlIHZhbHVlcyB3aWxsIGJlIGhhbmRsZWQgaW4gdGhlIHBhcmVudCBmdW5jdGlvblxuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlWzBdID0gKHZhbHVlWzBdLmluZGV4T2YoIFwiJVwiICkgPT09IC0xKSA/IHRvUFgoZWxlbWVudCwgYXR0cmlidXRlICsgXCJYXCIsIHZhbHVlWzBdKSA6IHZhbHVlWzBdO1xuICAgICAgICBpZih2YWx1ZVsxXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihhdHRyaWJ1dGUgPT09ICdiYWNrZ3JvdW5kU2l6ZScpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVsxXSA9ICdhdXRvJztcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIElFIDkgZG9lc24ndCByZXR1cm4gZG91YmxlIGRpZ2l0IGFsd2F5c1xuICAgICAgICAgICAgICAgIHZhbHVlWzFdID0gdmFsdWVbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFsdWVbMV0gPSAodmFsdWVbMV0uaW5kZXhPZihcIiVcIikgPT09IC0xKSA/IHRvUFgoZWxlbWVudCwgYXR0cmlidXRlICsgXCJZXCIsIHZhbHVlWzFdKSA6IHZhbHVlWzFdO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbl9odG1sMmNhbnZhcy5VdGlsLmdldENTUyA9IGZ1bmN0aW9uIChlbGVtZW50LCBhdHRyaWJ1dGUsIGluZGV4KSB7XG4gICAgaWYgKHByZXZpb3VzRWxlbWVudCAhPT0gZWxlbWVudCkge1xuICAgICAgY29tcHV0ZWRDU1MgPSBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIG51bGwpO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZSA9IGNvbXB1dGVkQ1NTW2F0dHJpYnV0ZV07XG5cbiAgICBpZiAoL15iYWNrZ3JvdW5kKFNpemV8UG9zaXRpb24pJC8udGVzdChhdHRyaWJ1dGUpKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUJhY2tncm91bmRTaXplUG9zaXRpb24odmFsdWUsIGVsZW1lbnQsIGF0dHJpYnV0ZSwgaW5kZXgpO1xuICAgIH0gZWxzZSBpZiAoL2JvcmRlcihUb3B8Qm90dG9tKShMZWZ0fFJpZ2h0KVJhZGl1cy8udGVzdChhdHRyaWJ1dGUpKSB7XG4gICAgICB2YXIgYXJyID0gdmFsdWUuc3BsaXQoXCIgXCIpO1xuICAgICAgaWYgKGFyci5sZW5ndGggPD0gMSkge1xuICAgICAgICAgIGFyclsxXSA9IGFyclswXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnIubWFwKGFzSW50KTtcbiAgICB9XG5cbiAgcmV0dXJuIHZhbHVlO1xufTtcblxuX2h0bWwyY2FudmFzLlV0aWwucmVzaXplQm91bmRzID0gZnVuY3Rpb24oIGN1cnJlbnRfd2lkdGgsIGN1cnJlbnRfaGVpZ2h0LCB0YXJnZXRfd2lkdGgsIHRhcmdldF9oZWlnaHQsIHN0cmV0Y2hfbW9kZSApe1xuICB2YXIgdGFyZ2V0X3JhdGlvID0gdGFyZ2V0X3dpZHRoIC8gdGFyZ2V0X2hlaWdodCxcbiAgICBjdXJyZW50X3JhdGlvID0gY3VycmVudF93aWR0aCAvIGN1cnJlbnRfaGVpZ2h0LFxuICAgIG91dHB1dF93aWR0aCwgb3V0cHV0X2hlaWdodDtcblxuICBpZighc3RyZXRjaF9tb2RlIHx8IHN0cmV0Y2hfbW9kZSA9PT0gJ2F1dG8nKSB7XG4gICAgb3V0cHV0X3dpZHRoID0gdGFyZ2V0X3dpZHRoO1xuICAgIG91dHB1dF9oZWlnaHQgPSB0YXJnZXRfaGVpZ2h0O1xuICB9IGVsc2UgaWYodGFyZ2V0X3JhdGlvIDwgY3VycmVudF9yYXRpbyBeIHN0cmV0Y2hfbW9kZSA9PT0gJ2NvbnRhaW4nKSB7XG4gICAgb3V0cHV0X2hlaWdodCA9IHRhcmdldF9oZWlnaHQ7XG4gICAgb3V0cHV0X3dpZHRoID0gdGFyZ2V0X2hlaWdodCAqIGN1cnJlbnRfcmF0aW87XG4gIH0gZWxzZSB7XG4gICAgb3V0cHV0X3dpZHRoID0gdGFyZ2V0X3dpZHRoO1xuICAgIG91dHB1dF9oZWlnaHQgPSB0YXJnZXRfd2lkdGggLyBjdXJyZW50X3JhdGlvO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogb3V0cHV0X3dpZHRoLFxuICAgIGhlaWdodDogb3V0cHV0X2hlaWdodFxuICB9O1xufTtcblxuZnVuY3Rpb24gYmFja2dyb3VuZEJvdW5kc0ZhY3RvcnkoIHByb3AsIGVsLCBib3VuZHMsIGltYWdlLCBpbWFnZUluZGV4LCBiYWNrZ3JvdW5kU2l6ZSApIHtcbiAgICB2YXIgYmdwb3NpdGlvbiA9ICBfaHRtbDJjYW52YXMuVXRpbC5nZXRDU1MoIGVsLCBwcm9wLCBpbWFnZUluZGV4ICkgLFxuICAgIHRvcFBvcyxcbiAgICBsZWZ0LFxuICAgIHBlcmNlbnRhZ2UsXG4gICAgdmFsO1xuXG4gICAgaWYgKGJncG9zaXRpb24ubGVuZ3RoID09PSAxKXtcbiAgICAgIHZhbCA9IGJncG9zaXRpb25bMF07XG5cbiAgICAgIGJncG9zaXRpb24gPSBbXTtcblxuICAgICAgYmdwb3NpdGlvblswXSA9IHZhbDtcbiAgICAgIGJncG9zaXRpb25bMV0gPSB2YWw7XG4gICAgfVxuXG4gICAgaWYgKGJncG9zaXRpb25bMF0udG9TdHJpbmcoKS5pbmRleE9mKFwiJVwiKSAhPT0gLTEpe1xuICAgICAgcGVyY2VudGFnZSA9IChwYXJzZUZsb2F0KGJncG9zaXRpb25bMF0pLzEwMCk7XG4gICAgICBsZWZ0ID0gYm91bmRzLndpZHRoICogcGVyY2VudGFnZTtcbiAgICAgIGlmKHByb3AgIT09ICdiYWNrZ3JvdW5kU2l6ZScpIHtcbiAgICAgICAgbGVmdCAtPSAoYmFja2dyb3VuZFNpemUgfHwgaW1hZ2UpLndpZHRoKnBlcmNlbnRhZ2U7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKHByb3AgPT09ICdiYWNrZ3JvdW5kU2l6ZScpIHtcbiAgICAgICAgaWYoYmdwb3NpdGlvblswXSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgbGVmdCA9IGltYWdlLndpZHRoO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICgvY29udGFpbnxjb3Zlci8udGVzdChiZ3Bvc2l0aW9uWzBdKSkge1xuICAgICAgICAgICAgdmFyIHJlc2l6ZWQgPSBfaHRtbDJjYW52YXMuVXRpbC5yZXNpemVCb3VuZHMoaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0LCBiZ3Bvc2l0aW9uWzBdKTtcbiAgICAgICAgICAgIGxlZnQgPSByZXNpemVkLndpZHRoO1xuICAgICAgICAgICAgdG9wUG9zID0gcmVzaXplZC5oZWlnaHQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlZnQgPSBwYXJzZUludChiZ3Bvc2l0aW9uWzBdLCAxMCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZWZ0ID0gcGFyc2VJbnQoIGJncG9zaXRpb25bMF0sIDEwKTtcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGlmKGJncG9zaXRpb25bMV0gPT09ICdhdXRvJykge1xuICAgICAgdG9wUG9zID0gbGVmdCAvIGltYWdlLndpZHRoICogaW1hZ2UuaGVpZ2h0O1xuICAgIH0gZWxzZSBpZiAoYmdwb3NpdGlvblsxXS50b1N0cmluZygpLmluZGV4T2YoXCIlXCIpICE9PSAtMSl7XG4gICAgICBwZXJjZW50YWdlID0gKHBhcnNlRmxvYXQoYmdwb3NpdGlvblsxXSkvMTAwKTtcbiAgICAgIHRvcFBvcyA9ICBib3VuZHMuaGVpZ2h0ICogcGVyY2VudGFnZTtcbiAgICAgIGlmKHByb3AgIT09ICdiYWNrZ3JvdW5kU2l6ZScpIHtcbiAgICAgICAgdG9wUG9zIC09IChiYWNrZ3JvdW5kU2l6ZSB8fCBpbWFnZSkuaGVpZ2h0ICogcGVyY2VudGFnZTtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICB0b3BQb3MgPSBwYXJzZUludChiZ3Bvc2l0aW9uWzFdLDEwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gW2xlZnQsIHRvcFBvc107XG59XG5cbl9odG1sMmNhbnZhcy5VdGlsLkJhY2tncm91bmRQb3NpdGlvbiA9IGZ1bmN0aW9uKCBlbCwgYm91bmRzLCBpbWFnZSwgaW1hZ2VJbmRleCwgYmFja2dyb3VuZFNpemUgKSB7XG4gICAgdmFyIHJlc3VsdCA9IGJhY2tncm91bmRCb3VuZHNGYWN0b3J5KCAnYmFja2dyb3VuZFBvc2l0aW9uJywgZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXgsIGJhY2tncm91bmRTaXplICk7XG4gICAgcmV0dXJuIHsgbGVmdDogcmVzdWx0WzBdLCB0b3A6IHJlc3VsdFsxXSB9O1xufTtcblxuX2h0bWwyY2FudmFzLlV0aWwuQmFja2dyb3VuZFNpemUgPSBmdW5jdGlvbiggZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXggKSB7XG4gICAgdmFyIHJlc3VsdCA9IGJhY2tncm91bmRCb3VuZHNGYWN0b3J5KCAnYmFja2dyb3VuZFNpemUnLCBlbCwgYm91bmRzLCBpbWFnZSwgaW1hZ2VJbmRleCApO1xuICAgIHJldHVybiB7IHdpZHRoOiByZXN1bHRbMF0sIGhlaWdodDogcmVzdWx0WzFdIH07XG59O1xuXG5faHRtbDJjYW52YXMuVXRpbC5FeHRlbmQgPSBmdW5jdGlvbiAob3B0aW9ucywgZGVmYXVsdHMpIHtcbiAgZm9yICh2YXIga2V5IGluIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICBkZWZhdWx0c1trZXldID0gb3B0aW9uc1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZGVmYXVsdHM7XG59O1xuXG5cbi8qXG4gKiBEZXJpdmVkIGZyb20galF1ZXJ5LmNvbnRlbnRzKClcbiAqIENvcHlyaWdodCAyMDEwLCBKb2huIFJlc2lnXG4gKiBEdWFsIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgb3IgR1BMIFZlcnNpb24gMiBsaWNlbnNlcy5cbiAqIGh0dHA6Ly9qcXVlcnkub3JnL2xpY2Vuc2VcbiAqL1xuX2h0bWwyY2FudmFzLlV0aWwuQ2hpbGRyZW4gPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIGNoaWxkcmVuO1xuICB0cnkge1xuICAgIGNoaWxkcmVuID0gKGVsZW0ubm9kZU5hbWUgJiYgZWxlbS5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09PSBcIklGUkFNRVwiKSA/IGVsZW0uY29udGVudERvY3VtZW50IHx8IGVsZW0uY29udGVudFdpbmRvdy5kb2N1bWVudCA6IChmdW5jdGlvbihhcnJheSkge1xuICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgaWYgKGFycmF5ICE9PSBudWxsKSB7XG4gICAgICAgIChmdW5jdGlvbihmaXJzdCwgc2Vjb25kICkge1xuICAgICAgICAgIHZhciBpID0gZmlyc3QubGVuZ3RoLFxuICAgICAgICAgIGogPSAwO1xuXG4gICAgICAgICAgaWYgKHR5cGVvZiBzZWNvbmQubGVuZ3RoID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBsID0gc2Vjb25kLmxlbmd0aDsgaiA8IGw7IGorKykge1xuICAgICAgICAgICAgICBmaXJzdFtpKytdID0gc2Vjb25kW2pdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aGlsZSAoc2Vjb25kW2pdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgZmlyc3RbaSsrXSA9IHNlY29uZFtqKytdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGZpcnN0Lmxlbmd0aCA9IGk7XG5cbiAgICAgICAgICByZXR1cm4gZmlyc3Q7XG4gICAgICAgIH0pKHJldCwgYXJyYXkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9KShlbGVtLmNoaWxkTm9kZXMpO1xuXG4gIH0gY2F0Y2ggKGV4KSB7XG4gICAgX2h0bWwyY2FudmFzLlV0aWwubG9nKFwiaHRtbDJjYW52YXMuVXRpbC5DaGlsZHJlbiBmYWlsZWQgd2l0aCBleGNlcHRpb246IFwiICsgZXgubWVzc2FnZSk7XG4gICAgY2hpbGRyZW4gPSBbXTtcbiAgfVxuICByZXR1cm4gY2hpbGRyZW47XG59O1xuXG5faHRtbDJjYW52YXMuVXRpbC5pc1RyYW5zcGFyZW50ID0gZnVuY3Rpb24oYmFja2dyb3VuZENvbG9yKSB7XG4gIHJldHVybiAoYmFja2dyb3VuZENvbG9yID09PSBcInRyYW5zcGFyZW50XCIgfHwgYmFja2dyb3VuZENvbG9yID09PSBcInJnYmEoMCwgMCwgMCwgMClcIik7XG59O1xuX2h0bWwyY2FudmFzLlV0aWwuRm9udCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgdmFyIGZvbnREYXRhID0ge307XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGZvbnQsIGZvbnRTaXplLCBkb2MpIHtcbiAgICBpZiAoZm9udERhdGFbZm9udCArIFwiLVwiICsgZm9udFNpemVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBmb250RGF0YVtmb250ICsgXCItXCIgKyBmb250U2l6ZV07XG4gICAgfVxuXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICBpbWcgPSBkb2MuY3JlYXRlRWxlbWVudCgnaW1nJyksXG4gICAgc3BhbiA9IGRvYy5jcmVhdGVFbGVtZW50KCdzcGFuJyksXG4gICAgc2FtcGxlVGV4dCA9ICdIaWRkZW4gVGV4dCcsXG4gICAgYmFzZWxpbmUsXG4gICAgbWlkZGxlLFxuICAgIG1ldHJpY3NPYmo7XG5cbiAgICBjb250YWluZXIuc3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgY29udGFpbmVyLnN0eWxlLmZvbnRGYW1pbHkgPSBmb250O1xuICAgIGNvbnRhaW5lci5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplO1xuICAgIGNvbnRhaW5lci5zdHlsZS5tYXJnaW4gPSAwO1xuICAgIGNvbnRhaW5lci5zdHlsZS5wYWRkaW5nID0gMDtcblxuICAgIGRvYy5ib2R5LmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG5cbiAgICAvLyBodHRwOi8vcHJvYmFibHlwcm9ncmFtbWluZy5jb20vMjAwOS8wMy8xNS90aGUtdGluaWVzdC1naWYtZXZlciAoaGFuZHRpbnl3aGl0ZS5naWYpXG4gICAgaW1nLnNyYyA9IFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFJQUJBUC8vL3dBQUFDd0FBQUFBQVFBQkFBQUNBa1FCQURzPVwiO1xuICAgIGltZy53aWR0aCA9IDE7XG4gICAgaW1nLmhlaWdodCA9IDE7XG5cbiAgICBpbWcuc3R5bGUubWFyZ2luID0gMDtcbiAgICBpbWcuc3R5bGUucGFkZGluZyA9IDA7XG4gICAgaW1nLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcImJhc2VsaW5lXCI7XG5cbiAgICBzcGFuLnN0eWxlLmZvbnRGYW1pbHkgPSBmb250O1xuICAgIHNwYW4uc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZTtcbiAgICBzcGFuLnN0eWxlLm1hcmdpbiA9IDA7XG4gICAgc3Bhbi5zdHlsZS5wYWRkaW5nID0gMDtcblxuICAgIHNwYW4uYXBwZW5kQ2hpbGQoZG9jLmNyZWF0ZVRleHROb2RlKHNhbXBsZVRleHQpKTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc3Bhbik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGltZyk7XG4gICAgYmFzZWxpbmUgPSAoaW1nLm9mZnNldFRvcCAtIHNwYW4ub2Zmc2V0VG9wKSArIDE7XG5cbiAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoc3Bhbik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShzYW1wbGVUZXh0KSk7XG5cbiAgICBjb250YWluZXIuc3R5bGUubGluZUhlaWdodCA9IFwibm9ybWFsXCI7XG4gICAgaW1nLnN0eWxlLnZlcnRpY2FsQWxpZ24gPSBcInN1cGVyXCI7XG5cbiAgICBtaWRkbGUgPSAoaW1nLm9mZnNldFRvcC1jb250YWluZXIub2Zmc2V0VG9wKSArIDE7XG4gICAgbWV0cmljc09iaiA9IHtcbiAgICAgIGJhc2VsaW5lOiBiYXNlbGluZSxcbiAgICAgIGxpbmVXaWR0aDogMSxcbiAgICAgIG1pZGRsZTogbWlkZGxlXG4gICAgfTtcblxuICAgIGZvbnREYXRhW2ZvbnQgKyBcIi1cIiArIGZvbnRTaXplXSA9IG1ldHJpY3NPYmo7XG5cbiAgICBkb2MuYm9keS5yZW1vdmVDaGlsZChjb250YWluZXIpO1xuXG4gICAgcmV0dXJuIG1ldHJpY3NPYmo7XG4gIH07XG59KSgpO1xuXG4oZnVuY3Rpb24oKXtcbiAgdmFyIFV0aWwgPSBfaHRtbDJjYW52YXMuVXRpbCxcbiAgICBHZW5lcmF0ZSA9IHt9O1xuXG4gIF9odG1sMmNhbnZhcy5HZW5lcmF0ZSA9IEdlbmVyYXRlO1xuXG4gIHZhciByZUdyYWRpZW50cyA9IFtcbiAgL14oLXdlYmtpdC1saW5lYXItZ3JhZGllbnQpXFwoKFthLXpcXHNdKykoW1xcd1xcZFxcLlxccywlXFwoXFwpXSspXFwpJC8sXG4gIC9eKC1vLWxpbmVhci1ncmFkaWVudClcXCgoW2Etelxcc10rKShbXFx3XFxkXFwuXFxzLCVcXChcXCldKylcXCkkLyxcbiAgL14oLXdlYmtpdC1ncmFkaWVudClcXCgobGluZWFyfHJhZGlhbCksXFxzKCg/OlxcZHsxLDN9JT8pXFxzKD86XFxkezEsM30lPyksXFxzKD86XFxkezEsM30lPylcXHMoPzpcXGR7MSwzfSU/KSkoW1xcd1xcZFxcLlxccywlXFwoXFwpXFwtXSspXFwpJC8sXG4gIC9eKC1tb3otbGluZWFyLWdyYWRpZW50KVxcKCgoPzpcXGR7MSwzfSU/KVxccyg/OlxcZHsxLDN9JT8pKShbXFx3XFxkXFwuXFxzLCVcXChcXCldKylcXCkkLyxcbiAgL14oLXdlYmtpdC1yYWRpYWwtZ3JhZGllbnQpXFwoKCg/OlxcZHsxLDN9JT8pXFxzKD86XFxkezEsM30lPykpLFxccyhcXHcrKVxccyhbYS16XFwtXSspKFtcXHdcXGRcXC5cXHMsJVxcKFxcKV0rKVxcKSQvLFxuICAvXigtbW96LXJhZGlhbC1ncmFkaWVudClcXCgoKD86XFxkezEsM30lPylcXHMoPzpcXGR7MSwzfSU/KSksXFxzKFxcdyspXFxzPyhbYS16XFwtXSopKFtcXHdcXGRcXC5cXHMsJVxcKFxcKV0rKVxcKSQvLFxuICAvXigtby1yYWRpYWwtZ3JhZGllbnQpXFwoKCg/OlxcZHsxLDN9JT8pXFxzKD86XFxkezEsM30lPykpLFxccyhcXHcrKVxccyhbYS16XFwtXSspKFtcXHdcXGRcXC5cXHMsJVxcKFxcKV0rKVxcKSQvXG4gIF07XG5cbiAgLypcbiAqIFRPRE86IEFkZCBJRTEwIHZlbmRvciBwcmVmaXggKC1tcykgc3VwcG9ydFxuICogVE9ETzogQWRkIFczQyBncmFkaWVudCAobGluZWFyLWdyYWRpZW50KSBzdXBwb3J0XG4gKiBUT0RPOiBBZGQgb2xkIFdlYmtpdCAtd2Via2l0LWdyYWRpZW50KHJhZGlhbCwgLi4uKSBzdXBwb3J0XG4gKiBUT0RPOiBNYXliZSBzb21lIFJlZ0V4cCBvcHRpbWl6YXRpb25zIGFyZSBwb3NzaWJsZSA7bylcbiAqL1xuICBHZW5lcmF0ZS5wYXJzZUdyYWRpZW50ID0gZnVuY3Rpb24oY3NzLCBib3VuZHMpIHtcbiAgICB2YXIgZ3JhZGllbnQsIGksIGxlbiA9IHJlR3JhZGllbnRzLmxlbmd0aCwgbTEsIHN0b3AsIG0yLCBtMkxlbiwgc3RlcCwgbTMsIHRsLHRyLGJyLGJsO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKz0xKXtcbiAgICAgIG0xID0gY3NzLm1hdGNoKHJlR3JhZGllbnRzW2ldKTtcbiAgICAgIGlmKG0xKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKG0xKSB7XG4gICAgICBzd2l0Y2gobTFbMV0pIHtcbiAgICAgICAgY2FzZSAnLXdlYmtpdC1saW5lYXItZ3JhZGllbnQnOlxuICAgICAgICBjYXNlICctby1saW5lYXItZ3JhZGllbnQnOlxuXG4gICAgICAgICAgZ3JhZGllbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgIHgwOiBudWxsLFxuICAgICAgICAgICAgeTA6IG51bGwsXG4gICAgICAgICAgICB4MTogbnVsbCxcbiAgICAgICAgICAgIHkxOiBudWxsLFxuICAgICAgICAgICAgY29sb3JTdG9wczogW11cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gZ2V0IGNvb3JkaW5hdGVzXG4gICAgICAgICAgbTIgPSBtMVsyXS5tYXRjaCgvXFx3Ky9nKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBtMkxlbiA9IG0yLmxlbmd0aDtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IG0yTGVuOyBpKz0xKXtcbiAgICAgICAgICAgICAgc3dpdGNoKG0yW2ldKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAndG9wJzpcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkwID0gMDtcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkxID0gYm91bmRzLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDAgPSBib3VuZHMud2lkdGg7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC54MSA9IDA7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2JvdHRvbSc6XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC55MCA9IGJvdW5kcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC55MSA9IDA7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnQnOlxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDAgPSAwO1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgPSBib3VuZHMud2lkdGg7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZihncmFkaWVudC54MCA9PT0gbnVsbCAmJiBncmFkaWVudC54MSA9PT0gbnVsbCl7IC8vIGNlbnRlclxuICAgICAgICAgICAgZ3JhZGllbnQueDAgPSBncmFkaWVudC54MSA9IGJvdW5kcy53aWR0aCAvIDI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKGdyYWRpZW50LnkwID09PSBudWxsICYmIGdyYWRpZW50LnkxID09PSBudWxsKXsgLy8gY2VudGVyXG4gICAgICAgICAgICBncmFkaWVudC55MCA9IGdyYWRpZW50LnkxID0gYm91bmRzLmhlaWdodCAvIDI7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZ2V0IGNvbG9ycyBhbmQgc3RvcHNcbiAgICAgICAgICBtMiA9IG0xWzNdLm1hdGNoKC8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkoPzpcXHNcXGR7MSwzfSg/OiV8cHgpKT8pKy9nKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBtMkxlbiA9IG0yLmxlbmd0aDtcbiAgICAgICAgICAgIHN0ZXAgPSAxIC8gTWF0aC5tYXgobTJMZW4gLSAxLCAxKTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IG0yTGVuOyBpKz0xKXtcbiAgICAgICAgICAgICAgbTMgPSBtMltpXS5tYXRjaCgvKCg/OnJnYnxyZ2JhKVxcKFxcZHsxLDN9LFxcc1xcZHsxLDN9LFxcc1xcZHsxLDN9KD86LFxcc1swLTlcXC5dKyk/XFwpKVxccyooXFxkezEsM30pPyglfHB4KT8vKTtcbiAgICAgICAgICAgICAgaWYobTNbMl0pe1xuICAgICAgICAgICAgICAgIHN0b3AgPSBwYXJzZUZsb2F0KG0zWzJdKTtcbiAgICAgICAgICAgICAgICBpZihtM1szXSA9PT0gJyUnKXtcbiAgICAgICAgICAgICAgICAgIHN0b3AgLz0gMTAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIHB4IC0gc3R1cGlkIG9wZXJhXG4gICAgICAgICAgICAgICAgICBzdG9wIC89IGJvdW5kcy53aWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcCA9IGkgKiBzdGVwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGdyYWRpZW50LmNvbG9yU3RvcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IG0zWzFdLFxuICAgICAgICAgICAgICAgIHN0b3A6IHN0b3BcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJy13ZWJraXQtZ3JhZGllbnQnOlxuXG4gICAgICAgICAgZ3JhZGllbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiBtMVsyXSA9PT0gJ3JhZGlhbCcgPyAnY2lyY2xlJyA6IG0xWzJdLCAvLyBUT0RPOiBBZGQgcmFkaWFsIGdyYWRpZW50IHN1cHBvcnQgZm9yIG9sZGVyIG1vemlsbGEgZGVmaW5pdGlvbnNcbiAgICAgICAgICAgIHgwOiAwLFxuICAgICAgICAgICAgeTA6IDAsXG4gICAgICAgICAgICB4MTogMCxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgY29sb3JTdG9wczogW11cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gZ2V0IGNvb3JkaW5hdGVzXG4gICAgICAgICAgbTIgPSBtMVszXS5tYXRjaCgvKFxcZHsxLDN9KSU/XFxzKFxcZHsxLDN9KSU/LFxccyhcXGR7MSwzfSklP1xccyhcXGR7MSwzfSklPy8pO1xuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIGdyYWRpZW50LngwID0gKG0yWzFdICogYm91bmRzLndpZHRoKSAvIDEwMDtcbiAgICAgICAgICAgIGdyYWRpZW50LnkwID0gKG0yWzJdICogYm91bmRzLmhlaWdodCkgLyAxMDA7XG4gICAgICAgICAgICBncmFkaWVudC54MSA9IChtMlszXSAqIGJvdW5kcy53aWR0aCkgLyAxMDA7XG4gICAgICAgICAgICBncmFkaWVudC55MSA9IChtMls0XSAqIGJvdW5kcy5oZWlnaHQpIC8gMTAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGdldCBjb2xvcnMgYW5kIHN0b3BzXG4gICAgICAgICAgbTIgPSBtMVs0XS5tYXRjaCgvKCg/OmZyb218dG98Y29sb3Itc3RvcClcXCgoPzpbMC05XFwuXSssXFxzKT8oPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKVxcKSkrL2cpO1xuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIG0yTGVuID0gbTIubGVuZ3RoO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbTJMZW47IGkrPTEpe1xuICAgICAgICAgICAgICBtMyA9IG0yW2ldLm1hdGNoKC8oZnJvbXx0b3xjb2xvci1zdG9wKVxcKChbMC05XFwuXSspPyg/OixcXHMpPygoPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKSlcXCkvKTtcbiAgICAgICAgICAgICAgc3RvcCA9IHBhcnNlRmxvYXQobTNbMl0pO1xuICAgICAgICAgICAgICBpZihtM1sxXSA9PT0gJ2Zyb20nKSB7XG4gICAgICAgICAgICAgICAgc3RvcCA9IDAuMDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZihtM1sxXSA9PT0gJ3RvJykge1xuICAgICAgICAgICAgICAgIHN0b3AgPSAxLjA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZ3JhZGllbnQuY29sb3JTdG9wcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbTNbM10sXG4gICAgICAgICAgICAgICAgc3RvcDogc3RvcFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnLW1vei1saW5lYXItZ3JhZGllbnQnOlxuXG4gICAgICAgICAgZ3JhZGllbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgICAgICAgIHgwOiAwLFxuICAgICAgICAgICAgeTA6IDAsXG4gICAgICAgICAgICB4MTogMCxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgY29sb3JTdG9wczogW11cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgLy8gZ2V0IGNvb3JkaW5hdGVzXG4gICAgICAgICAgbTIgPSBtMVsyXS5tYXRjaCgvKFxcZHsxLDN9KSU/XFxzKFxcZHsxLDN9KSU/Lyk7XG5cbiAgICAgICAgICAvLyBtMlsxXSA9PSAwJSAgIC0+IGxlZnRcbiAgICAgICAgICAvLyBtMlsxXSA9PSA1MCUgIC0+IGNlbnRlclxuICAgICAgICAgIC8vIG0yWzFdID09IDEwMCUgLT4gcmlnaHRcblxuICAgICAgICAgIC8vIG0yWzJdID09IDAlICAgLT4gdG9wXG4gICAgICAgICAgLy8gbTJbMl0gPT0gNTAlICAtPiBjZW50ZXJcbiAgICAgICAgICAvLyBtMlsyXSA9PSAxMDAlIC0+IGJvdHRvbVxuXG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgZ3JhZGllbnQueDAgPSAobTJbMV0gKiBib3VuZHMud2lkdGgpIC8gMTAwO1xuICAgICAgICAgICAgZ3JhZGllbnQueTAgPSAobTJbMl0gKiBib3VuZHMuaGVpZ2h0KSAvIDEwMDtcbiAgICAgICAgICAgIGdyYWRpZW50LngxID0gYm91bmRzLndpZHRoIC0gZ3JhZGllbnQueDA7XG4gICAgICAgICAgICBncmFkaWVudC55MSA9IGJvdW5kcy5oZWlnaHQgLSBncmFkaWVudC55MDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBnZXQgY29sb3JzIGFuZCBzdG9wc1xuICAgICAgICAgIG0yID0gbTFbM10ubWF0Y2goLygoPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKSg/Olxcc1xcZHsxLDN9JSk/KSsvZyk7XG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgbTJMZW4gPSBtMi5sZW5ndGg7XG4gICAgICAgICAgICBzdGVwID0gMSAvIE1hdGgubWF4KG0yTGVuIC0gMSwgMSk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBtMkxlbjsgaSs9MSl7XG4gICAgICAgICAgICAgIG0zID0gbTJbaV0ubWF0Y2goLygoPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKSlcXHMqKFxcZHsxLDN9KT8oJSk/Lyk7XG4gICAgICAgICAgICAgIGlmKG0zWzJdKXtcbiAgICAgICAgICAgICAgICBzdG9wID0gcGFyc2VGbG9hdChtM1syXSk7XG4gICAgICAgICAgICAgICAgaWYobTNbM10peyAvLyBwZXJjZW50YWdlXG4gICAgICAgICAgICAgICAgICBzdG9wIC89IDEwMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3RvcCA9IGkgKiBzdGVwO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGdyYWRpZW50LmNvbG9yU3RvcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IG0zWzFdLFxuICAgICAgICAgICAgICAgIHN0b3A6IHN0b3BcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJy13ZWJraXQtcmFkaWFsLWdyYWRpZW50JzpcbiAgICAgICAgY2FzZSAnLW1vei1yYWRpYWwtZ3JhZGllbnQnOlxuICAgICAgICBjYXNlICctby1yYWRpYWwtZ3JhZGllbnQnOlxuXG4gICAgICAgICAgZ3JhZGllbnQgPSB7XG4gICAgICAgICAgICB0eXBlOiAnY2lyY2xlJyxcbiAgICAgICAgICAgIHgwOiAwLFxuICAgICAgICAgICAgeTA6IDAsXG4gICAgICAgICAgICB4MTogYm91bmRzLndpZHRoLFxuICAgICAgICAgICAgeTE6IGJvdW5kcy5oZWlnaHQsXG4gICAgICAgICAgICBjeDogMCxcbiAgICAgICAgICAgIGN5OiAwLFxuICAgICAgICAgICAgcng6IDAsXG4gICAgICAgICAgICByeTogMCxcbiAgICAgICAgICAgIGNvbG9yU3RvcHM6IFtdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGNlbnRlclxuICAgICAgICAgIG0yID0gbTFbMl0ubWF0Y2goLyhcXGR7MSwzfSklP1xccyhcXGR7MSwzfSklPy8pO1xuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIGdyYWRpZW50LmN4ID0gKG0yWzFdICogYm91bmRzLndpZHRoKSAvIDEwMDtcbiAgICAgICAgICAgIGdyYWRpZW50LmN5ID0gKG0yWzJdICogYm91bmRzLmhlaWdodCkgLyAxMDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gc2l6ZVxuICAgICAgICAgIG0yID0gbTFbM10ubWF0Y2goL1xcdysvKTtcbiAgICAgICAgICBtMyA9IG0xWzRdLm1hdGNoKC9bYS16XFwtXSovKTtcbiAgICAgICAgICBpZihtMiAmJiBtMyl7XG4gICAgICAgICAgICBzd2l0Y2gobTNbMF0pe1xuICAgICAgICAgICAgICBjYXNlICdmYXJ0aGVzdC1jb3JuZXInOlxuICAgICAgICAgICAgICBjYXNlICdjb3Zlcic6IC8vIGlzIGVxdWl2YWxlbnQgdG8gZmFydGhlc3QtY29ybmVyXG4gICAgICAgICAgICAgIGNhc2UgJyc6IC8vIG1vemlsbGEgcmVtb3ZlcyBcImNvdmVyXCIgZnJvbSBkZWZpbml0aW9uIDooXG4gICAgICAgICAgICAgICAgdGwgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICB0ciA9IE1hdGguc3FydChNYXRoLnBvdyhncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC55MSAtIGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgYnIgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC55MSAtIGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgYmwgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIGdyYWRpZW50LnJ4ID0gZ3JhZGllbnQucnkgPSBNYXRoLm1heCh0bCwgdHIsIGJyLCBibCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2Nsb3Nlc3QtY29ybmVyJzpcbiAgICAgICAgICAgICAgICB0bCA9IE1hdGguc3FydChNYXRoLnBvdyhncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIHRyID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LmN4LCAyKSArIE1hdGgucG93KGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICBiciA9IE1hdGguc3FydChNYXRoLnBvdyhncmFkaWVudC54MSAtIGdyYWRpZW50LmN4LCAyKSArIE1hdGgucG93KGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICBibCA9IE1hdGguc3FydChNYXRoLnBvdyhncmFkaWVudC54MSAtIGdyYWRpZW50LmN4LCAyKSArIE1hdGgucG93KGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgZ3JhZGllbnQucnggPSBncmFkaWVudC5yeSA9IE1hdGgubWluKHRsLCB0ciwgYnIsIGJsKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnZmFydGhlc3Qtc2lkZSc6XG4gICAgICAgICAgICAgICAgaWYobTJbMF0gPT09ICdjaXJjbGUnKXtcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnJ4ID0gZ3JhZGllbnQucnkgPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3gsXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN5LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC54MSAtIGdyYWRpZW50LmN4LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC55MSAtIGdyYWRpZW50LmN5XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gZWxsaXBzZVxuXG4gICAgICAgICAgICAgICAgICBncmFkaWVudC50eXBlID0gbTJbMF07XG5cbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnJ4ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN4LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC54MSAtIGdyYWRpZW50LmN4XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeSA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeSxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnY2xvc2VzdC1zaWRlJzpcbiAgICAgICAgICAgICAgY2FzZSAnY29udGFpbic6IC8vIGlzIGVxdWl2YWxlbnQgdG8gY2xvc2VzdC1zaWRlXG4gICAgICAgICAgICAgICAgaWYobTJbMF0gPT09ICdjaXJjbGUnKXtcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnJ4ID0gZ3JhZGllbnQucnkgPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3gsXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN5LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC54MSAtIGdyYWRpZW50LmN4LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC55MSAtIGdyYWRpZW50LmN5XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gZWxsaXBzZVxuXG4gICAgICAgICAgICAgICAgICBncmFkaWVudC50eXBlID0gbTJbMF07XG5cbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnJ4ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN4LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC54MSAtIGdyYWRpZW50LmN4XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeSA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeSxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy8gVE9ETzogYWRkIHN1cHBvcnQgZm9yIFwiMzBweCA0MHB4XCIgc2l6ZXMgKHdlYmtpdCBvbmx5KVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNvbG9yIHN0b3BzXG4gICAgICAgICAgbTIgPSBtMVs1XS5tYXRjaCgvKCg/OnJnYnxyZ2JhKVxcKFxcZHsxLDN9LFxcc1xcZHsxLDN9LFxcc1xcZHsxLDN9KD86LFxcc1swLTlcXC5dKyk/XFwpKD86XFxzXFxkezEsM30oPzolfHB4KSk/KSsvZyk7XG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgbTJMZW4gPSBtMi5sZW5ndGg7XG4gICAgICAgICAgICBzdGVwID0gMSAvIE1hdGgubWF4KG0yTGVuIC0gMSwgMSk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBtMkxlbjsgaSs9MSl7XG4gICAgICAgICAgICAgIG0zID0gbTJbaV0ubWF0Y2goLygoPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKSlcXHMqKFxcZHsxLDN9KT8oJXxweCk/Lyk7XG4gICAgICAgICAgICAgIGlmKG0zWzJdKXtcbiAgICAgICAgICAgICAgICBzdG9wID0gcGFyc2VGbG9hdChtM1syXSk7XG4gICAgICAgICAgICAgICAgaWYobTNbM10gPT09ICclJyl7XG4gICAgICAgICAgICAgICAgICBzdG9wIC89IDEwMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBweCAtIHN0dXBpZCBvcGVyYVxuICAgICAgICAgICAgICAgICAgc3RvcCAvPSBib3VuZHMud2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3AgPSBpICogc3RlcDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbG9yOiBtM1sxXSxcbiAgICAgICAgICAgICAgICBzdG9wOiBzdG9wXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZ3JhZGllbnQ7XG4gIH07XG5cbiAgZnVuY3Rpb24gYWRkU2Nyb2xsU3RvcHMoZ3JhZCkge1xuICAgIHJldHVybiBmdW5jdGlvbihjb2xvclN0b3ApIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGdyYWQuYWRkQ29sb3JTdG9wKGNvbG9yU3RvcC5zdG9wLCBjb2xvclN0b3AuY29sb3IpO1xuICAgICAgfVxuICAgICAgY2F0Y2goZSkge1xuICAgICAgICBVdGlsLmxvZyhbJ2ZhaWxlZCB0byBhZGQgY29sb3Igc3RvcDogJywgZSwgJzsgdHJpZWQgdG8gYWRkOiAnLCBjb2xvclN0b3BdKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgR2VuZXJhdGUuR3JhZGllbnQgPSBmdW5jdGlvbihzcmMsIGJvdW5kcykge1xuICAgIGlmKGJvdW5kcy53aWR0aCA9PT0gMCB8fCBib3VuZHMuaGVpZ2h0ID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLFxuICAgIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuICAgIGdyYWRpZW50LCBncmFkO1xuXG4gICAgY2FudmFzLndpZHRoID0gYm91bmRzLndpZHRoO1xuICAgIGNhbnZhcy5oZWlnaHQgPSBib3VuZHMuaGVpZ2h0O1xuXG4gICAgLy8gVE9ETzogYWRkIHN1cHBvcnQgZm9yIG11bHRpIGRlZmluZWQgYmFja2dyb3VuZCBncmFkaWVudHNcbiAgICBncmFkaWVudCA9IF9odG1sMmNhbnZhcy5HZW5lcmF0ZS5wYXJzZUdyYWRpZW50KHNyYywgYm91bmRzKTtcblxuICAgIGlmKGdyYWRpZW50KSB7XG4gICAgICBzd2l0Y2goZ3JhZGllbnQudHlwZSkge1xuICAgICAgICBjYXNlICdsaW5lYXInOlxuICAgICAgICAgIGdyYWQgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoZ3JhZGllbnQueDAsIGdyYWRpZW50LnkwLCBncmFkaWVudC54MSwgZ3JhZGllbnQueTEpO1xuICAgICAgICAgIGdyYWRpZW50LmNvbG9yU3RvcHMuZm9yRWFjaChhZGRTY3JvbGxTdG9wcyhncmFkKSk7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWQ7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnY2lyY2xlJzpcbiAgICAgICAgICBncmFkID0gY3R4LmNyZWF0ZVJhZGlhbEdyYWRpZW50KGdyYWRpZW50LmN4LCBncmFkaWVudC5jeSwgMCwgZ3JhZGllbnQuY3gsIGdyYWRpZW50LmN5LCBncmFkaWVudC5yeCk7XG4gICAgICAgICAgZ3JhZGllbnQuY29sb3JTdG9wcy5mb3JFYWNoKGFkZFNjcm9sbFN0b3BzKGdyYWQpKTtcbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZDtcbiAgICAgICAgICBjdHguZmlsbFJlY3QoMCwgMCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdlbGxpcHNlJzpcbiAgICAgICAgICB2YXIgY2FudmFzUmFkaWFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyksXG4gICAgICAgICAgICBjdHhSYWRpYWwgPSBjYW52YXNSYWRpYWwuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICAgICAgICAgIHJpID0gTWF0aC5tYXgoZ3JhZGllbnQucngsIGdyYWRpZW50LnJ5KSxcbiAgICAgICAgICAgIGRpID0gcmkgKiAyO1xuXG4gICAgICAgICAgY2FudmFzUmFkaWFsLndpZHRoID0gY2FudmFzUmFkaWFsLmhlaWdodCA9IGRpO1xuXG4gICAgICAgICAgZ3JhZCA9IGN0eFJhZGlhbC5jcmVhdGVSYWRpYWxHcmFkaWVudChncmFkaWVudC5yeCwgZ3JhZGllbnQucnksIDAsIGdyYWRpZW50LnJ4LCBncmFkaWVudC5yeSwgcmkpO1xuICAgICAgICAgIGdyYWRpZW50LmNvbG9yU3RvcHMuZm9yRWFjaChhZGRTY3JvbGxTdG9wcyhncmFkKSk7XG5cbiAgICAgICAgICBjdHhSYWRpYWwuZmlsbFN0eWxlID0gZ3JhZDtcbiAgICAgICAgICBjdHhSYWRpYWwuZmlsbFJlY3QoMCwgMCwgZGksIGRpKTtcblxuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkaWVudC5jb2xvclN0b3BzW2dyYWRpZW50LmNvbG9yU3RvcHMubGVuZ3RoIC0gMV0uY29sb3I7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgICAgY3R4LmRyYXdJbWFnZShjYW52YXNSYWRpYWwsIGdyYWRpZW50LmN4IC0gZ3JhZGllbnQucngsIGdyYWRpZW50LmN5IC0gZ3JhZGllbnQucnksIDIgKiBncmFkaWVudC5yeCwgMiAqIGdyYWRpZW50LnJ5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY2FudmFzO1xuICB9O1xuXG4gIEdlbmVyYXRlLkxpc3RBbHBoYSA9IGZ1bmN0aW9uKG51bWJlcikge1xuICAgIHZhciB0bXAgPSBcIlwiLFxuICAgIG1vZHVsdXM7XG5cbiAgICBkbyB7XG4gICAgICBtb2R1bHVzID0gbnVtYmVyICUgMjY7XG4gICAgICB0bXAgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKChtb2R1bHVzKSArIDY0KSArIHRtcDtcbiAgICAgIG51bWJlciA9IG51bWJlciAvIDI2O1xuICAgIH13aGlsZSgobnVtYmVyKjI2KSA+IDI2KTtcblxuICAgIHJldHVybiB0bXA7XG4gIH07XG5cbiAgR2VuZXJhdGUuTGlzdFJvbWFuID0gZnVuY3Rpb24obnVtYmVyKSB7XG4gICAgdmFyIHJvbWFuQXJyYXkgPSBbXCJNXCIsIFwiQ01cIiwgXCJEXCIsIFwiQ0RcIiwgXCJDXCIsIFwiWENcIiwgXCJMXCIsIFwiWExcIiwgXCJYXCIsIFwiSVhcIiwgXCJWXCIsIFwiSVZcIiwgXCJJXCJdLFxuICAgIGRlY2ltYWwgPSBbMTAwMCwgOTAwLCA1MDAsIDQwMCwgMTAwLCA5MCwgNTAsIDQwLCAxMCwgOSwgNSwgNCwgMV0sXG4gICAgcm9tYW4gPSBcIlwiLFxuICAgIHYsXG4gICAgbGVuID0gcm9tYW5BcnJheS5sZW5ndGg7XG5cbiAgICBpZiAobnVtYmVyIDw9IDAgfHwgbnVtYmVyID49IDQwMDApIHtcbiAgICAgIHJldHVybiBudW1iZXI7XG4gICAgfVxuXG4gICAgZm9yICh2PTA7IHYgPCBsZW47IHYrPTEpIHtcbiAgICAgIHdoaWxlIChudW1iZXIgPj0gZGVjaW1hbFt2XSkge1xuICAgICAgICBudW1iZXIgLT0gZGVjaW1hbFt2XTtcbiAgICAgICAgcm9tYW4gKz0gcm9tYW5BcnJheVt2XTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcm9tYW47XG4gIH07XG59KSgpO1xuZnVuY3Rpb24gaDJjUmVuZGVyQ29udGV4dCh3aWR0aCwgaGVpZ2h0KSB7XG4gIHZhciBzdG9yYWdlID0gW107XG4gIHJldHVybiB7XG4gICAgc3RvcmFnZTogc3RvcmFnZSxcbiAgICB3aWR0aDogd2lkdGgsXG4gICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgY2xpcDogZnVuY3Rpb24oKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwiY2xpcFwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHRyYW5zbGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwidHJhbnNsYXRlXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZmlsbDogZnVuY3Rpb24oKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwiZmlsbFwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHNhdmU6IGZ1bmN0aW9uKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcInNhdmVcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICByZXN0b3JlOiBmdW5jdGlvbigpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJyZXN0b3JlXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZmlsbFJlY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJmaWxsUmVjdFwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGNyZWF0ZVBhdHRlcm46IGZ1bmN0aW9uKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImNyZWF0ZVBhdHRlcm5cIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBkcmF3U2hhcGU6IGZ1bmN0aW9uKCkge1xuXG4gICAgICB2YXIgc2hhcGUgPSBbXTtcblxuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImRyYXdTaGFwZVwiLFxuICAgICAgICAnYXJndW1lbnRzJzogc2hhcGVcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb3ZlVG86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXBlLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJtb3ZlVG9cIixcbiAgICAgICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgbGluZVRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzaGFwZS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwibGluZVRvXCIsXG4gICAgICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGFyY1RvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzaGFwZS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwiYXJjVG9cIixcbiAgICAgICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgYmV6aWVyQ3VydmVUbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcGUucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImJlemllckN1cnZlVG9cIixcbiAgICAgICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgcXVhZHJhdGljQ3VydmVUbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcGUucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcInF1YWRyYXRpY0N1cnZlVG9cIixcbiAgICAgICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgIH0sXG4gICAgZHJhd0ltYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwiZHJhd0ltYWdlXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZmlsbFRleHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJmaWxsVGV4dFwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHNldFZhcmlhYmxlOiBmdW5jdGlvbiAodmFyaWFibGUsIHZhbHVlKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcInZhcmlhYmxlXCIsXG4gICAgICAgIG5hbWU6IHZhcmlhYmxlLFxuICAgICAgICAnYXJndW1lbnRzJzogdmFsdWVcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgfTtcbn1cbl9odG1sMmNhbnZhcy5QYXJzZSA9IGZ1bmN0aW9uIChpbWFnZXMsIG9wdGlvbnMpIHtcbiAgd2luZG93LnNjcm9sbCgwLDApO1xuXG4gIHZhciBlbGVtZW50ID0gKCggb3B0aW9ucy5lbGVtZW50cyA9PT0gdW5kZWZpbmVkICkgPyBkb2N1bWVudC5ib2R5IDogb3B0aW9ucy5lbGVtZW50c1swXSksIC8vIHNlbGVjdCBib2R5IGJ5IGRlZmF1bHRcbiAgbnVtRHJhd3MgPSAwLFxuICBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQsXG4gIFV0aWwgPSBfaHRtbDJjYW52YXMuVXRpbCxcbiAgc3VwcG9ydCA9IFV0aWwuU3VwcG9ydChvcHRpb25zLCBkb2MpLFxuICBpZ25vcmVFbGVtZW50c1JlZ0V4cCA9IG5ldyBSZWdFeHAoXCIoXCIgKyBvcHRpb25zLmlnbm9yZUVsZW1lbnRzICsgXCIpXCIpLFxuICBib2R5ID0gZG9jLmJvZHksXG4gIGdldENTUyA9IFV0aWwuZ2V0Q1NTLFxuICBwc2V1ZG9IaWRlID0gXCJfX19odG1sMmNhbnZhc19fX3BzZXVkb2VsZW1lbnRcIixcbiAgaGlkZVBzZXVkb0VsZW1lbnRzID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyk7XG5cbiAgaGlkZVBzZXVkb0VsZW1lbnRzLmlubmVySFRNTCA9ICcuJyArIHBzZXVkb0hpZGUgKyAnLWJlZm9yZTpiZWZvcmUgeyBjb250ZW50OiBcIlwiICFpbXBvcnRhbnQ7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfScgK1xuICAnLicgKyBwc2V1ZG9IaWRlICsgJy1hZnRlcjphZnRlciB7IGNvbnRlbnQ6IFwiXCIgIWltcG9ydGFudDsgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OyB9JztcblxuICBib2R5LmFwcGVuZENoaWxkKGhpZGVQc2V1ZG9FbGVtZW50cyk7XG5cbiAgaW1hZ2VzID0gaW1hZ2VzIHx8IHt9O1xuXG4gIGZ1bmN0aW9uIGRvY3VtZW50V2lkdGggKCkge1xuICAgIHJldHVybiBNYXRoLm1heChcbiAgICAgIE1hdGgubWF4KGRvYy5ib2R5LnNjcm9sbFdpZHRoLCBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFdpZHRoKSxcbiAgICAgIE1hdGgubWF4KGRvYy5ib2R5Lm9mZnNldFdpZHRoLCBkb2MuZG9jdW1lbnRFbGVtZW50Lm9mZnNldFdpZHRoKSxcbiAgICAgIE1hdGgubWF4KGRvYy5ib2R5LmNsaWVudFdpZHRoLCBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoKVxuICAgICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRvY3VtZW50SGVpZ2h0ICgpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5zY3JvbGxIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0KSxcbiAgICAgIE1hdGgubWF4KGRvYy5ib2R5Lm9mZnNldEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5vZmZzZXRIZWlnaHQpLFxuICAgICAgTWF0aC5tYXgoZG9jLmJvZHkuY2xpZW50SGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodClcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRDU1NJbnQoZWxlbWVudCwgYXR0cmlidXRlKSB7XG4gICAgdmFyIHZhbCA9IHBhcnNlSW50KGdldENTUyhlbGVtZW50LCBhdHRyaWJ1dGUpLCAxMCk7XG4gICAgcmV0dXJuIChpc05hTih2YWwpKSA/IDAgOiB2YWw7IC8vIGJvcmRlcnMgaW4gb2xkIElFIGFyZSB0aHJvd2luZyAnbWVkaXVtJyBmb3IgZGVtby5odG1sXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJSZWN0IChjdHgsIHgsIHksIHcsIGgsIGJnY29sb3IpIHtcbiAgICBpZiAoYmdjb2xvciAhPT0gXCJ0cmFuc3BhcmVudFwiKXtcbiAgICAgIGN0eC5zZXRWYXJpYWJsZShcImZpbGxTdHlsZVwiLCBiZ2NvbG9yKTtcbiAgICAgIGN0eC5maWxsUmVjdCh4LCB5LCB3LCBoKTtcbiAgICAgIG51bURyYXdzKz0xO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNhcGl0YWxpemUobSwgcDEsIHAyKSB7XG4gICAgaWYgKG0ubGVuZ3RoID4gMCkge1xuICAgICAgcmV0dXJuIHAxICsgcDIudG9VcHBlckNhc2UoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0ZXh0VHJhbnNmb3JtICh0ZXh0LCB0cmFuc2Zvcm0pIHtcbiAgICBzd2l0Y2godHJhbnNmb3JtKXtcbiAgICAgIGNhc2UgXCJsb3dlcmNhc2VcIjpcbiAgICAgICAgcmV0dXJuIHRleHQudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNhc2UgXCJjYXBpdGFsaXplXCI6XG4gICAgICAgIHJldHVybiB0ZXh0LnJlcGxhY2UoIC8oXnxcXHN8OnwtfFxcKHxcXCkpKFthLXpdKS9nLCBjYXBpdGFsaXplKTtcbiAgICAgIGNhc2UgXCJ1cHBlcmNhc2VcIjpcbiAgICAgICAgcmV0dXJuIHRleHQudG9VcHBlckNhc2UoKTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vTGV0dGVyU3BhY2luZyhsZXR0ZXJfc3BhY2luZykge1xuICAgIHJldHVybiAoL14obm9ybWFsfG5vbmV8MHB4KSQvLnRlc3QobGV0dGVyX3NwYWNpbmcpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdUZXh0KGN1cnJlbnRUZXh0LCB4LCB5LCBjdHgpe1xuICAgIGlmIChjdXJyZW50VGV4dCAhPT0gbnVsbCAmJiBVdGlsLnRyaW1UZXh0KGN1cnJlbnRUZXh0KS5sZW5ndGggPiAwKSB7XG4gICAgICBjdHguZmlsbFRleHQoY3VycmVudFRleHQsIHgsIHkpO1xuICAgICAgbnVtRHJhd3MrPTE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0VGV4dFZhcmlhYmxlcyhjdHgsIGVsLCB0ZXh0X2RlY29yYXRpb24sIGNvbG9yKSB7XG4gICAgdmFyIGFsaWduID0gZmFsc2UsXG4gICAgYm9sZCA9IGdldENTUyhlbCwgXCJmb250V2VpZ2h0XCIpLFxuICAgIGZhbWlseSA9IGdldENTUyhlbCwgXCJmb250RmFtaWx5XCIpLFxuICAgIHNpemUgPSBnZXRDU1MoZWwsIFwiZm9udFNpemVcIiksXG4gICAgc2hhZG93cyA9IFV0aWwucGFyc2VUZXh0U2hhZG93cyhnZXRDU1MoZWwsIFwidGV4dFNoYWRvd1wiKSk7XG5cbiAgICBzd2l0Y2gocGFyc2VJbnQoYm9sZCwgMTApKXtcbiAgICAgIGNhc2UgNDAxOlxuICAgICAgICBib2xkID0gXCJib2xkXCI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSA0MDA6XG4gICAgICAgIGJvbGQgPSBcIm5vcm1hbFwiO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjdHguc2V0VmFyaWFibGUoXCJmaWxsU3R5bGVcIiwgY29sb3IpO1xuICAgIGN0eC5zZXRWYXJpYWJsZShcImZvbnRcIiwgW2dldENTUyhlbCwgXCJmb250U3R5bGVcIiksIGdldENTUyhlbCwgXCJmb250VmFyaWFudFwiKSwgYm9sZCwgc2l6ZSwgZmFtaWx5XS5qb2luKFwiIFwiKSk7XG4gICAgY3R4LnNldFZhcmlhYmxlKFwidGV4dEFsaWduXCIsIChhbGlnbikgPyBcInJpZ2h0XCIgOiBcImxlZnRcIik7XG5cbiAgICBpZiAoc2hhZG93cy5sZW5ndGgpIHtcbiAgICAgIC8vIFRPRE86IHN1cHBvcnQgbXVsdGlwbGUgdGV4dCBzaGFkb3dzXG4gICAgICAvLyBhcHBseSB0aGUgZmlyc3QgdGV4dCBzaGFkb3dcbiAgICAgIGN0eC5zZXRWYXJpYWJsZShcInNoYWRvd0NvbG9yXCIsIHNoYWRvd3NbMF0uY29sb3IpO1xuICAgICAgY3R4LnNldFZhcmlhYmxlKFwic2hhZG93T2Zmc2V0WFwiLCBzaGFkb3dzWzBdLm9mZnNldFgpO1xuICAgICAgY3R4LnNldFZhcmlhYmxlKFwic2hhZG93T2Zmc2V0WVwiLCBzaGFkb3dzWzBdLm9mZnNldFkpO1xuICAgICAgY3R4LnNldFZhcmlhYmxlKFwic2hhZG93Qmx1clwiLCBzaGFkb3dzWzBdLmJsdXIpO1xuICAgIH1cblxuICAgIGlmICh0ZXh0X2RlY29yYXRpb24gIT09IFwibm9uZVwiKXtcbiAgICAgIHJldHVybiBVdGlsLkZvbnQoZmFtaWx5LCBzaXplLCBkb2MpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclRleHREZWNvcmF0aW9uKGN0eCwgdGV4dF9kZWNvcmF0aW9uLCBib3VuZHMsIG1ldHJpY3MsIGNvbG9yKSB7XG4gICAgc3dpdGNoKHRleHRfZGVjb3JhdGlvbikge1xuICAgICAgY2FzZSBcInVuZGVybGluZVwiOlxuICAgICAgICAvLyBEcmF3cyBhIGxpbmUgYXQgdGhlIGJhc2VsaW5lIG9mIHRoZSBmb250XG4gICAgICAgIC8vIFRPRE8gQXMgc29tZSBicm93c2VycyBkaXNwbGF5IHRoZSBsaW5lIGFzIG1vcmUgdGhhbiAxcHggaWYgdGhlIGZvbnQtc2l6ZSBpcyBiaWcsIG5lZWQgdG8gdGFrZSB0aGF0IGludG8gYWNjb3VudCBib3RoIGluIHBvc2l0aW9uIGFuZCBzaXplXG4gICAgICAgIHJlbmRlclJlY3QoY3R4LCBib3VuZHMubGVmdCwgTWF0aC5yb3VuZChib3VuZHMudG9wICsgbWV0cmljcy5iYXNlbGluZSArIG1ldHJpY3MubGluZVdpZHRoKSwgYm91bmRzLndpZHRoLCAxLCBjb2xvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIm92ZXJsaW5lXCI6XG4gICAgICAgIHJlbmRlclJlY3QoY3R4LCBib3VuZHMubGVmdCwgTWF0aC5yb3VuZChib3VuZHMudG9wKSwgYm91bmRzLndpZHRoLCAxLCBjb2xvcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxpbmUtdGhyb3VnaFwiOlxuICAgICAgICAvLyBUT0RPIHRyeSBhbmQgZmluZCBleGFjdCBwb3NpdGlvbiBmb3IgbGluZS10aHJvdWdoXG4gICAgICAgIHJlbmRlclJlY3QoY3R4LCBib3VuZHMubGVmdCwgTWF0aC5jZWlsKGJvdW5kcy50b3AgKyBtZXRyaWNzLm1pZGRsZSArIG1ldHJpY3MubGluZVdpZHRoKSwgYm91bmRzLndpZHRoLCAxLCBjb2xvcik7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFRleHRCb3VuZHMoc3RhdGUsIHRleHQsIHRleHREZWNvcmF0aW9uLCBpc0xhc3QsIHRyYW5zZm9ybSkge1xuICAgIHZhciBib3VuZHM7XG4gICAgaWYgKHN1cHBvcnQucmFuZ2VCb3VuZHMgJiYgIXRyYW5zZm9ybSkge1xuICAgICAgaWYgKHRleHREZWNvcmF0aW9uICE9PSBcIm5vbmVcIiB8fCBVdGlsLnRyaW1UZXh0KHRleHQpLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBib3VuZHMgPSB0ZXh0UmFuZ2VCb3VuZHModGV4dCwgc3RhdGUubm9kZSwgc3RhdGUudGV4dE9mZnNldCk7XG4gICAgICB9XG4gICAgICBzdGF0ZS50ZXh0T2Zmc2V0ICs9IHRleHQubGVuZ3RoO1xuICAgIH0gZWxzZSBpZiAoc3RhdGUubm9kZSAmJiB0eXBlb2Ygc3RhdGUubm9kZS5ub2RlVmFsdWUgPT09IFwic3RyaW5nXCIgKXtcbiAgICAgIHZhciBuZXdUZXh0Tm9kZSA9IChpc0xhc3QpID8gc3RhdGUubm9kZS5zcGxpdFRleHQodGV4dC5sZW5ndGgpIDogbnVsbDtcbiAgICAgIGJvdW5kcyA9IHRleHRXcmFwcGVyQm91bmRzKHN0YXRlLm5vZGUsIHRyYW5zZm9ybSk7XG4gICAgICBzdGF0ZS5ub2RlID0gbmV3VGV4dE5vZGU7XG4gICAgfVxuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBmdW5jdGlvbiB0ZXh0UmFuZ2VCb3VuZHModGV4dCwgdGV4dE5vZGUsIHRleHRPZmZzZXQpIHtcbiAgICB2YXIgcmFuZ2UgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZXRTdGFydCh0ZXh0Tm9kZSwgdGV4dE9mZnNldCk7XG4gICAgcmFuZ2Uuc2V0RW5kKHRleHROb2RlLCB0ZXh0T2Zmc2V0ICsgdGV4dC5sZW5ndGgpO1xuICAgIHJldHVybiByYW5nZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRleHRXcmFwcGVyQm91bmRzKG9sZFRleHROb2RlLCB0cmFuc2Zvcm0pIHtcbiAgICB2YXIgcGFyZW50ID0gb2xkVGV4dE5vZGUucGFyZW50Tm9kZSxcbiAgICB3cmFwRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCd3cmFwcGVyJyksXG4gICAgYmFja3VwVGV4dCA9IG9sZFRleHROb2RlLmNsb25lTm9kZSh0cnVlKTtcblxuICAgIHdyYXBFbGVtZW50LmFwcGVuZENoaWxkKG9sZFRleHROb2RlLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZCh3cmFwRWxlbWVudCwgb2xkVGV4dE5vZGUpO1xuXG4gICAgdmFyIGJvdW5kcyA9IHRyYW5zZm9ybSA/IFV0aWwuT2Zmc2V0Qm91bmRzKHdyYXBFbGVtZW50KSA6IFV0aWwuQm91bmRzKHdyYXBFbGVtZW50KTtcbiAgICBwYXJlbnQucmVwbGFjZUNoaWxkKGJhY2t1cFRleHQsIHdyYXBFbGVtZW50KTtcbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyVGV4dChlbCwgdGV4dE5vZGUsIHN0YWNrKSB7XG4gICAgdmFyIGN0eCA9IHN0YWNrLmN0eCxcbiAgICBjb2xvciA9IGdldENTUyhlbCwgXCJjb2xvclwiKSxcbiAgICB0ZXh0RGVjb3JhdGlvbiA9IGdldENTUyhlbCwgXCJ0ZXh0RGVjb3JhdGlvblwiKSxcbiAgICB0ZXh0QWxpZ24gPSBnZXRDU1MoZWwsIFwidGV4dEFsaWduXCIpLFxuICAgIG1ldHJpY3MsXG4gICAgdGV4dExpc3QsXG4gICAgc3RhdGUgPSB7XG4gICAgICBub2RlOiB0ZXh0Tm9kZSxcbiAgICAgIHRleHRPZmZzZXQ6IDBcbiAgICB9O1xuXG4gICAgaWYgKFV0aWwudHJpbVRleHQodGV4dE5vZGUubm9kZVZhbHVlKS5sZW5ndGggPiAwKSB7XG4gICAgICB0ZXh0Tm9kZS5ub2RlVmFsdWUgPSB0ZXh0VHJhbnNmb3JtKHRleHROb2RlLm5vZGVWYWx1ZSwgZ2V0Q1NTKGVsLCBcInRleHRUcmFuc2Zvcm1cIikpO1xuICAgICAgdGV4dEFsaWduID0gdGV4dEFsaWduLnJlcGxhY2UoW1wiLXdlYmtpdC1hdXRvXCJdLFtcImF1dG9cIl0pO1xuXG4gICAgICB0ZXh0TGlzdCA9ICghb3B0aW9ucy5sZXR0ZXJSZW5kZXJpbmcgJiYgL14obGVmdHxyaWdodHxqdXN0aWZ5fGF1dG8pJC8udGVzdCh0ZXh0QWxpZ24pICYmIG5vTGV0dGVyU3BhY2luZyhnZXRDU1MoZWwsIFwibGV0dGVyU3BhY2luZ1wiKSkpID9cbiAgICAgIHRleHROb2RlLm5vZGVWYWx1ZS5zcGxpdCgvKFxcYnwgKS8pXG4gICAgICA6IHRleHROb2RlLm5vZGVWYWx1ZS5zcGxpdChcIlwiKTtcblxuICAgICAgbWV0cmljcyA9IHNldFRleHRWYXJpYWJsZXMoY3R4LCBlbCwgdGV4dERlY29yYXRpb24sIGNvbG9yKTtcblxuICAgICAgaWYgKG9wdGlvbnMuY2hpbmVzZSkge1xuICAgICAgICB0ZXh0TGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHdvcmQsIGluZGV4KSB7XG4gICAgICAgICAgaWYgKC8uKltcXHU0RTAwLVxcdTlGQTVdLiokLy50ZXN0KHdvcmQpKSB7XG4gICAgICAgICAgICB3b3JkID0gd29yZC5zcGxpdChcIlwiKTtcbiAgICAgICAgICAgIHdvcmQudW5zaGlmdChpbmRleCwgMSk7XG4gICAgICAgICAgICB0ZXh0TGlzdC5zcGxpY2UuYXBwbHkodGV4dExpc3QsIHdvcmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHRleHRMaXN0LmZvckVhY2goZnVuY3Rpb24odGV4dCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGJvdW5kcyA9IGdldFRleHRCb3VuZHMoc3RhdGUsIHRleHQsIHRleHREZWNvcmF0aW9uLCAoaW5kZXggPCB0ZXh0TGlzdC5sZW5ndGggLSAxKSwgc3RhY2sudHJhbnNmb3JtLm1hdHJpeCk7XG4gICAgICAgIGlmIChib3VuZHMpIHtcbiAgICAgICAgICBkcmF3VGV4dCh0ZXh0LCBib3VuZHMubGVmdCwgYm91bmRzLmJvdHRvbSwgY3R4KTtcbiAgICAgICAgICByZW5kZXJUZXh0RGVjb3JhdGlvbihjdHgsIHRleHREZWNvcmF0aW9uLCBib3VuZHMsIG1ldHJpY3MsIGNvbG9yKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbGlzdFBvc2l0aW9uIChlbGVtZW50LCB2YWwpIHtcbiAgICB2YXIgYm91bmRFbGVtZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQoIFwiYm91bmRlbGVtZW50XCIgKSxcbiAgICBvcmlnaW5hbFR5cGUsXG4gICAgYm91bmRzO1xuXG4gICAgYm91bmRFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcImlubGluZVwiO1xuXG4gICAgb3JpZ2luYWxUeXBlID0gZWxlbWVudC5zdHlsZS5saXN0U3R5bGVUeXBlO1xuICAgIGVsZW1lbnQuc3R5bGUubGlzdFN0eWxlVHlwZSA9IFwibm9uZVwiO1xuXG4gICAgYm91bmRFbGVtZW50LmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZSh2YWwpKTtcblxuICAgIGVsZW1lbnQuaW5zZXJ0QmVmb3JlKGJvdW5kRWxlbWVudCwgZWxlbWVudC5maXJzdENoaWxkKTtcblxuICAgIGJvdW5kcyA9IFV0aWwuQm91bmRzKGJvdW5kRWxlbWVudCk7XG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChib3VuZEVsZW1lbnQpO1xuICAgIGVsZW1lbnQuc3R5bGUubGlzdFN0eWxlVHlwZSA9IG9yaWdpbmFsVHlwZTtcbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gZWxlbWVudEluZGV4KGVsKSB7XG4gICAgdmFyIGkgPSAtMSxcbiAgICBjb3VudCA9IDEsXG4gICAgY2hpbGRzID0gZWwucGFyZW50Tm9kZS5jaGlsZE5vZGVzO1xuXG4gICAgaWYgKGVsLnBhcmVudE5vZGUpIHtcbiAgICAgIHdoaWxlKGNoaWxkc1srK2ldICE9PSBlbCkge1xuICAgICAgICBpZiAoY2hpbGRzW2ldLm5vZGVUeXBlID09PSAxKSB7XG4gICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGNvdW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbGlzdEl0ZW1UZXh0KGVsZW1lbnQsIHR5cGUpIHtcbiAgICB2YXIgY3VycmVudEluZGV4ID0gZWxlbWVudEluZGV4KGVsZW1lbnQpLCB0ZXh0O1xuICAgIHN3aXRjaCh0eXBlKXtcbiAgICAgIGNhc2UgXCJkZWNpbWFsXCI6XG4gICAgICAgIHRleHQgPSBjdXJyZW50SW5kZXg7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRlY2ltYWwtbGVhZGluZy16ZXJvXCI6XG4gICAgICAgIHRleHQgPSAoY3VycmVudEluZGV4LnRvU3RyaW5nKCkubGVuZ3RoID09PSAxKSA/IGN1cnJlbnRJbmRleCA9IFwiMFwiICsgY3VycmVudEluZGV4LnRvU3RyaW5nKCkgOiBjdXJyZW50SW5kZXgudG9TdHJpbmcoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwidXBwZXItcm9tYW5cIjpcbiAgICAgICAgdGV4dCA9IF9odG1sMmNhbnZhcy5HZW5lcmF0ZS5MaXN0Um9tYW4oIGN1cnJlbnRJbmRleCApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsb3dlci1yb21hblwiOlxuICAgICAgICB0ZXh0ID0gX2h0bWwyY2FudmFzLkdlbmVyYXRlLkxpc3RSb21hbiggY3VycmVudEluZGV4ICkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibG93ZXItYWxwaGFcIjpcbiAgICAgICAgdGV4dCA9IF9odG1sMmNhbnZhcy5HZW5lcmF0ZS5MaXN0QWxwaGEoIGN1cnJlbnRJbmRleCApLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInVwcGVyLWFscGhhXCI6XG4gICAgICAgIHRleHQgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUuTGlzdEFscGhhKCBjdXJyZW50SW5kZXggKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHQgKyBcIi4gXCI7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJMaXN0SXRlbShlbGVtZW50LCBzdGFjaywgZWxCb3VuZHMpIHtcbiAgICB2YXIgeCxcbiAgICB0ZXh0LFxuICAgIGN0eCA9IHN0YWNrLmN0eCxcbiAgICB0eXBlID0gZ2V0Q1NTKGVsZW1lbnQsIFwibGlzdFN0eWxlVHlwZVwiKSxcbiAgICBsaXN0Qm91bmRzO1xuXG4gICAgaWYgKC9eKGRlY2ltYWx8ZGVjaW1hbC1sZWFkaW5nLXplcm98dXBwZXItYWxwaGF8dXBwZXItbGF0aW58dXBwZXItcm9tYW58bG93ZXItYWxwaGF8bG93ZXItZ3JlZWt8bG93ZXItbGF0aW58bG93ZXItcm9tYW4pJC9pLnRlc3QodHlwZSkpIHtcbiAgICAgIHRleHQgPSBsaXN0SXRlbVRleHQoZWxlbWVudCwgdHlwZSk7XG4gICAgICBsaXN0Qm91bmRzID0gbGlzdFBvc2l0aW9uKGVsZW1lbnQsIHRleHQpO1xuICAgICAgc2V0VGV4dFZhcmlhYmxlcyhjdHgsIGVsZW1lbnQsIFwibm9uZVwiLCBnZXRDU1MoZWxlbWVudCwgXCJjb2xvclwiKSk7XG5cbiAgICAgIGlmIChnZXRDU1MoZWxlbWVudCwgXCJsaXN0U3R5bGVQb3NpdGlvblwiKSA9PT0gXCJpbnNpZGVcIikge1xuICAgICAgICBjdHguc2V0VmFyaWFibGUoXCJ0ZXh0QWxpZ25cIiwgXCJsZWZ0XCIpO1xuICAgICAgICB4ID0gZWxCb3VuZHMubGVmdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZHJhd1RleHQodGV4dCwgeCwgbGlzdEJvdW5kcy5ib3R0b20sIGN0eCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbG9hZEltYWdlIChzcmMpe1xuICAgIHZhciBpbWcgPSBpbWFnZXNbc3JjXTtcbiAgICByZXR1cm4gKGltZyAmJiBpbWcuc3VjY2VlZGVkID09PSB0cnVlKSA/IGltZy5pbWcgOiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsaXBCb3VuZHMoc3JjLCBkc3Qpe1xuICAgIHZhciB4ID0gTWF0aC5tYXgoc3JjLmxlZnQsIGRzdC5sZWZ0KSxcbiAgICB5ID0gTWF0aC5tYXgoc3JjLnRvcCwgZHN0LnRvcCksXG4gICAgeDIgPSBNYXRoLm1pbigoc3JjLmxlZnQgKyBzcmMud2lkdGgpLCAoZHN0LmxlZnQgKyBkc3Qud2lkdGgpKSxcbiAgICB5MiA9IE1hdGgubWluKChzcmMudG9wICsgc3JjLmhlaWdodCksIChkc3QudG9wICsgZHN0LmhlaWdodCkpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6eCxcbiAgICAgIHRvcDp5LFxuICAgICAgd2lkdGg6eDIteCxcbiAgICAgIGhlaWdodDp5Mi15XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFooZWxlbWVudCwgc3RhY2ssIHBhcmVudFN0YWNrKXtcbiAgICB2YXIgbmV3Q29udGV4dCxcbiAgICBpc1Bvc2l0aW9uZWQgPSBzdGFjay5jc3NQb3NpdGlvbiAhPT0gJ3N0YXRpYycsXG4gICAgekluZGV4ID0gaXNQb3NpdGlvbmVkID8gZ2V0Q1NTKGVsZW1lbnQsICd6SW5kZXgnKSA6ICdhdXRvJyxcbiAgICBvcGFjaXR5ID0gZ2V0Q1NTKGVsZW1lbnQsICdvcGFjaXR5JyksXG4gICAgaXNGbG9hdGVkID0gZ2V0Q1NTKGVsZW1lbnQsICdjc3NGbG9hdCcpICE9PSAnbm9uZSc7XG5cbiAgICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9HdWlkZS9DU1MvVW5kZXJzdGFuZGluZ196X2luZGV4L1RoZV9zdGFja2luZ19jb250ZXh0XG4gICAgLy8gV2hlbiBhIG5ldyBzdGFja2luZyBjb250ZXh0IHNob3VsZCBiZSBjcmVhdGVkOlxuICAgIC8vIHRoZSByb290IGVsZW1lbnQgKEhUTUwpLFxuICAgIC8vIHBvc2l0aW9uZWQgKGFic29sdXRlbHkgb3IgcmVsYXRpdmVseSkgd2l0aCBhIHotaW5kZXggdmFsdWUgb3RoZXIgdGhhbiBcImF1dG9cIixcbiAgICAvLyBlbGVtZW50cyB3aXRoIGFuIG9wYWNpdHkgdmFsdWUgbGVzcyB0aGFuIDEuIChTZWUgdGhlIHNwZWNpZmljYXRpb24gZm9yIG9wYWNpdHkpLFxuICAgIC8vIG9uIG1vYmlsZSBXZWJLaXQgYW5kIENocm9tZSAyMissIHBvc2l0aW9uOiBmaXhlZCBhbHdheXMgY3JlYXRlcyBhIG5ldyBzdGFja2luZyBjb250ZXh0LCBldmVuIHdoZW4gei1pbmRleCBpcyBcImF1dG9cIiAoU2VlIHRoaXMgcG9zdClcblxuICAgIHN0YWNrLnpJbmRleCA9IG5ld0NvbnRleHQgPSBoMmN6Q29udGV4dCh6SW5kZXgpO1xuICAgIG5ld0NvbnRleHQuaXNQb3NpdGlvbmVkID0gaXNQb3NpdGlvbmVkO1xuICAgIG5ld0NvbnRleHQuaXNGbG9hdGVkID0gaXNGbG9hdGVkO1xuICAgIG5ld0NvbnRleHQub3BhY2l0eSA9IG9wYWNpdHk7XG4gICAgbmV3Q29udGV4dC5vd25TdGFja2luZyA9ICh6SW5kZXggIT09ICdhdXRvJyB8fCBvcGFjaXR5IDwgMSk7XG5cbiAgICBpZiAocGFyZW50U3RhY2spIHtcbiAgICAgIHBhcmVudFN0YWNrLnpJbmRleC5jaGlsZHJlbi5wdXNoKHN0YWNrKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJJbWFnZShjdHgsIGVsZW1lbnQsIGltYWdlLCBib3VuZHMsIGJvcmRlcnMpIHtcblxuICAgIHZhciBwYWRkaW5nTGVmdCA9IGdldENTU0ludChlbGVtZW50LCAncGFkZGluZ0xlZnQnKSxcbiAgICBwYWRkaW5nVG9wID0gZ2V0Q1NTSW50KGVsZW1lbnQsICdwYWRkaW5nVG9wJyksXG4gICAgcGFkZGluZ1JpZ2h0ID0gZ2V0Q1NTSW50KGVsZW1lbnQsICdwYWRkaW5nUmlnaHQnKSxcbiAgICBwYWRkaW5nQm90dG9tID0gZ2V0Q1NTSW50KGVsZW1lbnQsICdwYWRkaW5nQm90dG9tJyk7XG5cbiAgICBkcmF3SW1hZ2UoXG4gICAgICBjdHgsXG4gICAgICBpbWFnZSxcbiAgICAgIDAsIC8vc3hcbiAgICAgIDAsIC8vc3lcbiAgICAgIGltYWdlLndpZHRoLCAvL3N3XG4gICAgICBpbWFnZS5oZWlnaHQsIC8vc2hcbiAgICAgIGJvdW5kcy5sZWZ0ICsgcGFkZGluZ0xlZnQgKyBib3JkZXJzWzNdLndpZHRoLCAvL2R4XG4gICAgICBib3VuZHMudG9wICsgcGFkZGluZ1RvcCArIGJvcmRlcnNbMF0ud2lkdGgsIC8vIGR5XG4gICAgICBib3VuZHMud2lkdGggLSAoYm9yZGVyc1sxXS53aWR0aCArIGJvcmRlcnNbM10ud2lkdGggKyBwYWRkaW5nTGVmdCArIHBhZGRpbmdSaWdodCksIC8vZHdcbiAgICAgIGJvdW5kcy5oZWlnaHQgLSAoYm9yZGVyc1swXS53aWR0aCArIGJvcmRlcnNbMl0ud2lkdGggKyBwYWRkaW5nVG9wICsgcGFkZGluZ0JvdHRvbSkgLy9kaFxuICAgICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvcmRlckRhdGEoZWxlbWVudCkge1xuICAgIHJldHVybiBbXCJUb3BcIiwgXCJSaWdodFwiLCBcIkJvdHRvbVwiLCBcIkxlZnRcIl0ubWFwKGZ1bmN0aW9uKHNpZGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHdpZHRoOiBnZXRDU1NJbnQoZWxlbWVudCwgJ2JvcmRlcicgKyBzaWRlICsgJ1dpZHRoJyksXG4gICAgICAgIGNvbG9yOiBnZXRDU1MoZWxlbWVudCwgJ2JvcmRlcicgKyBzaWRlICsgJ0NvbG9yJylcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb3JkZXJSYWRpdXNEYXRhKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gW1wiVG9wTGVmdFwiLCBcIlRvcFJpZ2h0XCIsIFwiQm90dG9tUmlnaHRcIiwgXCJCb3R0b21MZWZ0XCJdLm1hcChmdW5jdGlvbihzaWRlKSB7XG4gICAgICByZXR1cm4gZ2V0Q1NTKGVsZW1lbnQsICdib3JkZXInICsgc2lkZSArICdSYWRpdXMnKTtcbiAgICB9KTtcbiAgfVxuXG4gIHZhciBnZXRDdXJ2ZVBvaW50cyA9IChmdW5jdGlvbihrYXBwYSkge1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKHgsIHksIHIxLCByMikge1xuICAgICAgdmFyIG94ID0gKHIxKSAqIGthcHBhLCAvLyBjb250cm9sIHBvaW50IG9mZnNldCBob3Jpem9udGFsXG4gICAgICBveSA9IChyMikgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgdmVydGljYWxcbiAgICAgIHhtID0geCArIHIxLCAvLyB4LW1pZGRsZVxuICAgICAgeW0gPSB5ICsgcjI7IC8vIHktbWlkZGxlXG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b3BMZWZ0OiBiZXppZXJDdXJ2ZSh7XG4gICAgICAgICAgeDp4LFxuICAgICAgICAgIHk6eW1cbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eCxcbiAgICAgICAgICB5OnltIC0gb3lcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eG0gLSBveCxcbiAgICAgICAgICB5OnlcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eG0sXG4gICAgICAgICAgeTp5XG4gICAgICAgIH0pLFxuICAgICAgICB0b3BSaWdodDogYmV6aWVyQ3VydmUoe1xuICAgICAgICAgIHg6eCxcbiAgICAgICAgICB5OnlcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eCArIG94LFxuICAgICAgICAgIHk6eVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4bSxcbiAgICAgICAgICB5OnltIC0gb3lcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eG0sXG4gICAgICAgICAgeTp5bVxuICAgICAgICB9KSxcbiAgICAgICAgYm90dG9tUmlnaHQ6IGJlemllckN1cnZlKHtcbiAgICAgICAgICB4OnhtLFxuICAgICAgICAgIHk6eVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4bSxcbiAgICAgICAgICB5OnkgKyBveVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4ICsgb3gsXG4gICAgICAgICAgeTp5bVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4LFxuICAgICAgICAgIHk6eW1cbiAgICAgICAgfSksXG4gICAgICAgIGJvdHRvbUxlZnQ6IGJlemllckN1cnZlKHtcbiAgICAgICAgICB4OnhtLFxuICAgICAgICAgIHk6eW1cbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eG0gLSBveCxcbiAgICAgICAgICB5OnltXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OngsXG4gICAgICAgICAgeTp5ICsgb3lcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eCxcbiAgICAgICAgICB5OnlcbiAgICAgICAgfSlcbiAgICAgIH07XG4gICAgfTtcbiAgfSkoNCAqICgoTWF0aC5zcXJ0KDIpIC0gMSkgLyAzKSk7XG5cbiAgZnVuY3Rpb24gYmV6aWVyQ3VydmUoc3RhcnQsIHN0YXJ0Q29udHJvbCwgZW5kQ29udHJvbCwgZW5kKSB7XG5cbiAgICB2YXIgbGVycCA9IGZ1bmN0aW9uIChhLCBiLCB0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OmEueCArIChiLnggLSBhLngpICogdCxcbiAgICAgICAgeTphLnkgKyAoYi55IC0gYS55KSAqIHRcbiAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICBzdGFydDogc3RhcnQsXG4gICAgICBzdGFydENvbnRyb2w6IHN0YXJ0Q29udHJvbCxcbiAgICAgIGVuZENvbnRyb2w6IGVuZENvbnRyb2wsXG4gICAgICBlbmQ6IGVuZCxcbiAgICAgIHN1YmRpdmlkZTogZnVuY3Rpb24odCkge1xuICAgICAgICB2YXIgYWIgPSBsZXJwKHN0YXJ0LCBzdGFydENvbnRyb2wsIHQpLFxuICAgICAgICBiYyA9IGxlcnAoc3RhcnRDb250cm9sLCBlbmRDb250cm9sLCB0KSxcbiAgICAgICAgY2QgPSBsZXJwKGVuZENvbnRyb2wsIGVuZCwgdCksXG4gICAgICAgIGFiYmMgPSBsZXJwKGFiLCBiYywgdCksXG4gICAgICAgIGJjY2QgPSBsZXJwKGJjLCBjZCwgdCksXG4gICAgICAgIGRlc3QgPSBsZXJwKGFiYmMsIGJjY2QsIHQpO1xuICAgICAgICByZXR1cm4gW2JlemllckN1cnZlKHN0YXJ0LCBhYiwgYWJiYywgZGVzdCksIGJlemllckN1cnZlKGRlc3QsIGJjY2QsIGNkLCBlbmQpXTtcbiAgICAgIH0sXG4gICAgICBjdXJ2ZVRvOiBmdW5jdGlvbihib3JkZXJBcmdzKSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJiZXppZXJDdXJ2ZVwiLCBzdGFydENvbnRyb2wueCwgc3RhcnRDb250cm9sLnksIGVuZENvbnRyb2wueCwgZW5kQ29udHJvbC55LCBlbmQueCwgZW5kLnldKTtcbiAgICAgIH0sXG4gICAgICBjdXJ2ZVRvUmV2ZXJzZWQ6IGZ1bmN0aW9uKGJvcmRlckFyZ3MpIHtcbiAgICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImJlemllckN1cnZlXCIsIGVuZENvbnRyb2wueCwgZW5kQ29udHJvbC55LCBzdGFydENvbnRyb2wueCwgc3RhcnRDb250cm9sLnksIHN0YXJ0LngsIHN0YXJ0LnldKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzMSwgcmFkaXVzMiwgY29ybmVyMSwgY29ybmVyMiwgeCwgeSkge1xuICAgIGlmIChyYWRpdXMxWzBdID4gMCB8fCByYWRpdXMxWzFdID4gMCkge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgY29ybmVyMVswXS5zdGFydC54LCBjb3JuZXIxWzBdLnN0YXJ0LnldKTtcbiAgICAgIGNvcm5lcjFbMF0uY3VydmVUbyhib3JkZXJBcmdzKTtcbiAgICAgIGNvcm5lcjFbMV0uY3VydmVUbyhib3JkZXJBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgeCwgeV0pO1xuICAgIH1cblxuICAgIGlmIChyYWRpdXMyWzBdID4gMCB8fCByYWRpdXMyWzFdID4gMCkge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgY29ybmVyMlswXS5zdGFydC54LCBjb3JuZXIyWzBdLnN0YXJ0LnldKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3U2lkZShib3JkZXJEYXRhLCByYWRpdXMxLCByYWRpdXMyLCBvdXRlcjEsIGlubmVyMSwgb3V0ZXIyLCBpbm5lcjIpIHtcbiAgICB2YXIgYm9yZGVyQXJncyA9IFtdO1xuXG4gICAgaWYgKHJhZGl1czFbMF0gPiAwIHx8IHJhZGl1czFbMV0gPiAwKSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBvdXRlcjFbMV0uc3RhcnQueCwgb3V0ZXIxWzFdLnN0YXJ0LnldKTtcbiAgICAgIG91dGVyMVsxXS5jdXJ2ZVRvKGJvcmRlckFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goWyBcImxpbmVcIiwgYm9yZGVyRGF0YS5jMVswXSwgYm9yZGVyRGF0YS5jMVsxXV0pO1xuICAgIH1cblxuICAgIGlmIChyYWRpdXMyWzBdID4gMCB8fCByYWRpdXMyWzFdID4gMCkge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgb3V0ZXIyWzBdLnN0YXJ0LngsIG91dGVyMlswXS5zdGFydC55XSk7XG4gICAgICBvdXRlcjJbMF0uY3VydmVUbyhib3JkZXJBcmdzKTtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGlubmVyMlswXS5lbmQueCwgaW5uZXIyWzBdLmVuZC55XSk7XG4gICAgICBpbm5lcjJbMF0uY3VydmVUb1JldmVyc2VkKGJvcmRlckFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goWyBcImxpbmVcIiwgYm9yZGVyRGF0YS5jMlswXSwgYm9yZGVyRGF0YS5jMlsxXV0pO1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFsgXCJsaW5lXCIsIGJvcmRlckRhdGEuYzNbMF0sIGJvcmRlckRhdGEuYzNbMV1dKTtcbiAgICB9XG5cbiAgICBpZiAocmFkaXVzMVswXSA+IDAgfHwgcmFkaXVzMVsxXSA+IDApIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGlubmVyMVsxXS5lbmQueCwgaW5uZXIxWzFdLmVuZC55XSk7XG4gICAgICBpbm5lcjFbMV0uY3VydmVUb1JldmVyc2VkKGJvcmRlckFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goWyBcImxpbmVcIiwgYm9yZGVyRGF0YS5jNFswXSwgYm9yZGVyRGF0YS5jNFsxXV0pO1xuICAgIH1cblxuICAgIHJldHVybiBib3JkZXJBcmdzO1xuICB9XG5cbiAgZnVuY3Rpb24gY2FsY3VsYXRlQ3VydmVQb2ludHMoYm91bmRzLCBib3JkZXJSYWRpdXMsIGJvcmRlcnMpIHtcblxuICAgIHZhciB4ID0gYm91bmRzLmxlZnQsXG4gICAgeSA9IGJvdW5kcy50b3AsXG4gICAgd2lkdGggPSBib3VuZHMud2lkdGgsXG4gICAgaGVpZ2h0ID0gYm91bmRzLmhlaWdodCxcblxuICAgIHRsaCA9IGJvcmRlclJhZGl1c1swXVswXSxcbiAgICB0bHYgPSBib3JkZXJSYWRpdXNbMF1bMV0sXG4gICAgdHJoID0gYm9yZGVyUmFkaXVzWzFdWzBdLFxuICAgIHRydiA9IGJvcmRlclJhZGl1c1sxXVsxXSxcbiAgICBicmggPSBib3JkZXJSYWRpdXNbMl1bMF0sXG4gICAgYnJ2ID0gYm9yZGVyUmFkaXVzWzJdWzFdLFxuICAgIGJsaCA9IGJvcmRlclJhZGl1c1szXVswXSxcbiAgICBibHYgPSBib3JkZXJSYWRpdXNbM11bMV0sXG5cbiAgICB0b3BXaWR0aCA9IHdpZHRoIC0gdHJoLFxuICAgIHJpZ2h0SGVpZ2h0ID0gaGVpZ2h0IC0gYnJ2LFxuICAgIGJvdHRvbVdpZHRoID0gd2lkdGggLSBicmgsXG4gICAgbGVmdEhlaWdodCA9IGhlaWdodCAtIGJsdjtcblxuICAgIHJldHVybiB7XG4gICAgICB0b3BMZWZ0T3V0ZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICB0bGgsXG4gICAgICAgIHRsdlxuICAgICAgICApLnRvcExlZnQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIHRvcExlZnRJbm5lcjogZ2V0Q3VydmVQb2ludHMoXG4gICAgICAgIHggKyBib3JkZXJzWzNdLndpZHRoLFxuICAgICAgICB5ICsgYm9yZGVyc1swXS53aWR0aCxcbiAgICAgICAgTWF0aC5tYXgoMCwgdGxoIC0gYm9yZGVyc1szXS53aWR0aCksXG4gICAgICAgIE1hdGgubWF4KDAsIHRsdiAtIGJvcmRlcnNbMF0ud2lkdGgpXG4gICAgICAgICkudG9wTGVmdC5zdWJkaXZpZGUoMC41KSxcblxuICAgICAgdG9wUmlnaHRPdXRlcjogZ2V0Q3VydmVQb2ludHMoXG4gICAgICAgIHggKyB0b3BXaWR0aCxcbiAgICAgICAgeSxcbiAgICAgICAgdHJoLFxuICAgICAgICB0cnZcbiAgICAgICAgKS50b3BSaWdodC5zdWJkaXZpZGUoMC41KSxcblxuICAgICAgdG9wUmlnaHRJbm5lcjogZ2V0Q3VydmVQb2ludHMoXG4gICAgICAgIHggKyBNYXRoLm1pbih0b3BXaWR0aCwgd2lkdGggKyBib3JkZXJzWzNdLndpZHRoKSxcbiAgICAgICAgeSArIGJvcmRlcnNbMF0ud2lkdGgsXG4gICAgICAgICh0b3BXaWR0aCA+IHdpZHRoICsgYm9yZGVyc1szXS53aWR0aCkgPyAwIDp0cmggLSBib3JkZXJzWzNdLndpZHRoLFxuICAgICAgICB0cnYgLSBib3JkZXJzWzBdLndpZHRoXG4gICAgICAgICkudG9wUmlnaHQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIGJvdHRvbVJpZ2h0T3V0ZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgYm90dG9tV2lkdGgsXG4gICAgICAgIHkgKyByaWdodEhlaWdodCxcbiAgICAgICAgYnJoLFxuICAgICAgICBicnZcbiAgICAgICAgKS5ib3R0b21SaWdodC5zdWJkaXZpZGUoMC41KSxcblxuICAgICAgYm90dG9tUmlnaHRJbm5lcjogZ2V0Q3VydmVQb2ludHMoXG4gICAgICAgIHggKyBNYXRoLm1pbihib3R0b21XaWR0aCwgd2lkdGggKyBib3JkZXJzWzNdLndpZHRoKSxcbiAgICAgICAgeSArIE1hdGgubWluKHJpZ2h0SGVpZ2h0LCBoZWlnaHQgKyBib3JkZXJzWzBdLndpZHRoKSxcbiAgICAgICAgTWF0aC5tYXgoMCwgYnJoIC0gYm9yZGVyc1sxXS53aWR0aCksXG4gICAgICAgIE1hdGgubWF4KDAsIGJydiAtIGJvcmRlcnNbMl0ud2lkdGgpXG4gICAgICAgICkuYm90dG9tUmlnaHQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIGJvdHRvbUxlZnRPdXRlcjogZ2V0Q3VydmVQb2ludHMoXG4gICAgICAgIHgsXG4gICAgICAgIHkgKyBsZWZ0SGVpZ2h0LFxuICAgICAgICBibGgsXG4gICAgICAgIGJsdlxuICAgICAgICApLmJvdHRvbUxlZnQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIGJvdHRvbUxlZnRJbm5lcjogZ2V0Q3VydmVQb2ludHMoXG4gICAgICAgIHggKyBib3JkZXJzWzNdLndpZHRoLFxuICAgICAgICB5ICsgbGVmdEhlaWdodCxcbiAgICAgICAgTWF0aC5tYXgoMCwgYmxoIC0gYm9yZGVyc1szXS53aWR0aCksXG4gICAgICAgIE1hdGgubWF4KDAsIGJsdiAtIGJvcmRlcnNbMl0ud2lkdGgpXG4gICAgICAgICkuYm90dG9tTGVmdC5zdWJkaXZpZGUoMC41KVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb3JkZXJDbGlwKGVsZW1lbnQsIGJvcmRlclBvaW50cywgYm9yZGVycywgcmFkaXVzLCBib3VuZHMpIHtcbiAgICB2YXIgYmFja2dyb3VuZENsaXAgPSBnZXRDU1MoZWxlbWVudCwgJ2JhY2tncm91bmRDbGlwJyksXG4gICAgYm9yZGVyQXJncyA9IFtdO1xuXG4gICAgc3dpdGNoKGJhY2tncm91bmRDbGlwKSB7XG4gICAgICBjYXNlIFwiY29udGVudC1ib3hcIjpcbiAgICAgIGNhc2UgXCJwYWRkaW5nLWJveFwiOlxuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbMF0sIHJhZGl1c1sxXSwgYm9yZGVyUG9pbnRzLnRvcExlZnRJbm5lciwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0SW5uZXIsIGJvdW5kcy5sZWZ0ICsgYm9yZGVyc1szXS53aWR0aCwgYm91bmRzLnRvcCArIGJvcmRlcnNbMF0ud2lkdGgpO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbMV0sIHJhZGl1c1syXSwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0SW5uZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodElubmVyLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCAtIGJvcmRlcnNbMV0ud2lkdGgsIGJvdW5kcy50b3AgKyBib3JkZXJzWzBdLndpZHRoKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzJdLCByYWRpdXNbM10sIGJvcmRlclBvaW50cy5ib3R0b21SaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdElubmVyLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCAtIGJvcmRlcnNbMV0ud2lkdGgsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0IC0gYm9yZGVyc1syXS53aWR0aCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1szXSwgcmFkaXVzWzBdLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdElubmVyLCBib3JkZXJQb2ludHMudG9wTGVmdElubmVyLCBib3VuZHMubGVmdCArIGJvcmRlcnNbM10ud2lkdGgsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0IC0gYm9yZGVyc1syXS53aWR0aCk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbMF0sIHJhZGl1c1sxXSwgYm9yZGVyUG9pbnRzLnRvcExlZnRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0T3V0ZXIsIGJvdW5kcy5sZWZ0LCBib3VuZHMudG9wKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzFdLCByYWRpdXNbMl0sIGJvcmRlclBvaW50cy50b3BSaWdodE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRPdXRlciwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGgsIGJvdW5kcy50b3ApO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbMl0sIHJhZGl1c1szXSwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0T3V0ZXIsIGJvdW5kcy5sZWZ0ICsgYm91bmRzLndpZHRoLCBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1szXSwgcmFkaXVzWzBdLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdE91dGVyLCBib3JkZXJQb2ludHMudG9wTGVmdE91dGVyLCBib3VuZHMubGVmdCwgYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gYm9yZGVyQXJncztcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQm9yZGVycyhlbGVtZW50LCBib3VuZHMsIGJvcmRlcnMpe1xuICAgIHZhciB4ID0gYm91bmRzLmxlZnQsXG4gICAgeSA9IGJvdW5kcy50b3AsXG4gICAgd2lkdGggPSBib3VuZHMud2lkdGgsXG4gICAgaGVpZ2h0ID0gYm91bmRzLmhlaWdodCxcbiAgICBib3JkZXJTaWRlLFxuICAgIGJ4LFxuICAgIGJ5LFxuICAgIGJ3LFxuICAgIGJoLFxuICAgIGJvcmRlckFyZ3MsXG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1iYWNrZ3JvdW5kLyN0aGUtYm9yZGVyLXJhZGl1c1xuICAgIGJvcmRlclJhZGl1cyA9IGdldEJvcmRlclJhZGl1c0RhdGEoZWxlbWVudCksXG4gICAgYm9yZGVyUG9pbnRzID0gY2FsY3VsYXRlQ3VydmVQb2ludHMoYm91bmRzLCBib3JkZXJSYWRpdXMsIGJvcmRlcnMpLFxuICAgIGJvcmRlckRhdGEgPSB7XG4gICAgICBjbGlwOiBnZXRCb3JkZXJDbGlwKGVsZW1lbnQsIGJvcmRlclBvaW50cywgYm9yZGVycywgYm9yZGVyUmFkaXVzLCBib3VuZHMpLFxuICAgICAgYm9yZGVyczogW11cbiAgICB9O1xuXG4gICAgZm9yIChib3JkZXJTaWRlID0gMDsgYm9yZGVyU2lkZSA8IDQ7IGJvcmRlclNpZGUrKykge1xuXG4gICAgICBpZiAoYm9yZGVyc1tib3JkZXJTaWRlXS53aWR0aCA+IDApIHtcbiAgICAgICAgYnggPSB4O1xuICAgICAgICBieSA9IHk7XG4gICAgICAgIGJ3ID0gd2lkdGg7XG4gICAgICAgIGJoID0gaGVpZ2h0IC0gKGJvcmRlcnNbMl0ud2lkdGgpO1xuXG4gICAgICAgIHN3aXRjaChib3JkZXJTaWRlKSB7XG4gICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgLy8gdG9wIGJvcmRlclxuICAgICAgICAgICAgYmggPSBib3JkZXJzWzBdLndpZHRoO1xuXG4gICAgICAgICAgICBib3JkZXJBcmdzID0gZHJhd1NpZGUoe1xuICAgICAgICAgICAgICBjMTogW2J4LCBieV0sXG4gICAgICAgICAgICAgIGMyOiBbYnggKyBidywgYnldLFxuICAgICAgICAgICAgICBjMzogW2J4ICsgYncgLSBib3JkZXJzWzFdLndpZHRoLCBieSArIGJoXSxcbiAgICAgICAgICAgICAgYzQ6IFtieCArIGJvcmRlcnNbM10ud2lkdGgsIGJ5ICsgYmhdXG4gICAgICAgICAgICB9LCBib3JkZXJSYWRpdXNbMF0sIGJvcmRlclJhZGl1c1sxXSxcbiAgICAgICAgICAgIGJvcmRlclBvaW50cy50b3BMZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BMZWZ0SW5uZXIsIGJvcmRlclBvaW50cy50b3BSaWdodE91dGVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRJbm5lcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAvLyByaWdodCBib3JkZXJcbiAgICAgICAgICAgIGJ4ID0geCArIHdpZHRoIC0gKGJvcmRlcnNbMV0ud2lkdGgpO1xuICAgICAgICAgICAgYncgPSBib3JkZXJzWzFdLndpZHRoO1xuXG4gICAgICAgICAgICBib3JkZXJBcmdzID0gZHJhd1NpZGUoe1xuICAgICAgICAgICAgICBjMTogW2J4ICsgYncsIGJ5XSxcbiAgICAgICAgICAgICAgYzI6IFtieCArIGJ3LCBieSArIGJoICsgYm9yZGVyc1syXS53aWR0aF0sXG4gICAgICAgICAgICAgIGMzOiBbYngsIGJ5ICsgYmhdLFxuICAgICAgICAgICAgICBjNDogW2J4LCBieSArIGJvcmRlcnNbMF0ud2lkdGhdXG4gICAgICAgICAgICB9LCBib3JkZXJSYWRpdXNbMV0sIGJvcmRlclJhZGl1c1syXSxcbiAgICAgICAgICAgIGJvcmRlclBvaW50cy50b3BSaWdodE91dGVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRJbm5lciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodElubmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIC8vIGJvdHRvbSBib3JkZXJcbiAgICAgICAgICAgIGJ5ID0gKGJ5ICsgaGVpZ2h0KSAtIChib3JkZXJzWzJdLndpZHRoKTtcbiAgICAgICAgICAgIGJoID0gYm9yZGVyc1syXS53aWR0aDtcblxuICAgICAgICAgICAgYm9yZGVyQXJncyA9IGRyYXdTaWRlKHtcbiAgICAgICAgICAgICAgYzE6IFtieCArIGJ3LCBieSArIGJoXSxcbiAgICAgICAgICAgICAgYzI6IFtieCwgYnkgKyBiaF0sXG4gICAgICAgICAgICAgIGMzOiBbYnggKyBib3JkZXJzWzNdLndpZHRoLCBieV0sXG4gICAgICAgICAgICAgIGM0OiBbYnggKyBidyAtIGJvcmRlcnNbM10ud2lkdGgsIGJ5XVxuICAgICAgICAgICAgfSwgYm9yZGVyUmFkaXVzWzJdLCBib3JkZXJSYWRpdXNbM10sXG4gICAgICAgICAgICBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0SW5uZXIsIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21MZWZ0SW5uZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgLy8gbGVmdCBib3JkZXJcbiAgICAgICAgICAgIGJ3ID0gYm9yZGVyc1szXS53aWR0aDtcblxuICAgICAgICAgICAgYm9yZGVyQXJncyA9IGRyYXdTaWRlKHtcbiAgICAgICAgICAgICAgYzE6IFtieCwgYnkgKyBiaCArIGJvcmRlcnNbMl0ud2lkdGhdLFxuICAgICAgICAgICAgICBjMjogW2J4LCBieV0sXG4gICAgICAgICAgICAgIGMzOiBbYnggKyBidywgYnkgKyBib3JkZXJzWzBdLndpZHRoXSxcbiAgICAgICAgICAgICAgYzQ6IFtieCArIGJ3LCBieSArIGJoXVxuICAgICAgICAgICAgfSwgYm9yZGVyUmFkaXVzWzNdLCBib3JkZXJSYWRpdXNbMF0sXG4gICAgICAgICAgICBib3JkZXJQb2ludHMuYm90dG9tTGVmdE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdElubmVyLCBib3JkZXJQb2ludHMudG9wTGVmdE91dGVyLCBib3JkZXJQb2ludHMudG9wTGVmdElubmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYm9yZGVyRGF0YS5ib3JkZXJzLnB1c2goe1xuICAgICAgICAgIGFyZ3M6IGJvcmRlckFyZ3MsXG4gICAgICAgICAgY29sb3I6IGJvcmRlcnNbYm9yZGVyU2lkZV0uY29sb3JcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYm9yZGVyRGF0YTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlKGN0eCwgYXJncykge1xuICAgIHZhciBzaGFwZSA9IGN0eC5kcmF3U2hhcGUoKTtcbiAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24oYm9yZGVyLCBpbmRleCkge1xuICAgICAgc2hhcGVbKGluZGV4ID09PSAwKSA/IFwibW92ZVRvXCIgOiBib3JkZXJbMF0gKyBcIlRvXCIgXS5hcHBseShudWxsLCBib3JkZXIuc2xpY2UoMSkpO1xuICAgIH0pO1xuICAgIHJldHVybiBzaGFwZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJvcmRlcnMoY3R4LCBib3JkZXJBcmdzLCBjb2xvcikge1xuICAgIGlmIChjb2xvciAhPT0gXCJ0cmFuc3BhcmVudFwiKSB7XG4gICAgICBjdHguc2V0VmFyaWFibGUoIFwiZmlsbFN0eWxlXCIsIGNvbG9yKTtcbiAgICAgIGNyZWF0ZVNoYXBlKGN0eCwgYm9yZGVyQXJncyk7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgbnVtRHJhd3MrPTE7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRm9ybVZhbHVlIChlbCwgYm91bmRzLCBzdGFjayl7XG5cbiAgICB2YXIgdmFsdWVXcmFwID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ3ZhbHVld3JhcCcpLFxuICAgIGNzc1Byb3BlcnR5QXJyYXkgPSBbJ2xpbmVIZWlnaHQnLCd0ZXh0QWxpZ24nLCdmb250RmFtaWx5JywnY29sb3InLCdmb250U2l6ZScsJ3BhZGRpbmdMZWZ0JywncGFkZGluZ1RvcCcsJ3dpZHRoJywnaGVpZ2h0JywnYm9yZGVyJywnYm9yZGVyTGVmdFdpZHRoJywnYm9yZGVyVG9wV2lkdGgnXSxcbiAgICB0ZXh0VmFsdWUsXG4gICAgdGV4dE5vZGU7XG5cbiAgICBjc3NQcm9wZXJ0eUFycmF5LmZvckVhY2goZnVuY3Rpb24ocHJvcGVydHkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHZhbHVlV3JhcC5zdHlsZVtwcm9wZXJ0eV0gPSBnZXRDU1MoZWwsIHByb3BlcnR5KTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAvLyBPbGRlciBJRSBoYXMgaXNzdWVzIHdpdGggXCJib3JkZXJcIlxuICAgICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBQYXJzZTogRXhjZXB0aW9uIGNhdWdodCBpbiByZW5kZXJGb3JtVmFsdWU6IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhbHVlV3JhcC5zdHlsZS5ib3JkZXJDb2xvciA9IFwiYmxhY2tcIjtcbiAgICB2YWx1ZVdyYXAuc3R5bGUuYm9yZGVyU3R5bGUgPSBcInNvbGlkXCI7XG4gICAgdmFsdWVXcmFwLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgdmFsdWVXcmFwLnN0eWxlLnBvc2l0aW9uID0gXCJhYnNvbHV0ZVwiO1xuXG4gICAgaWYgKC9eKHN1Ym1pdHxyZXNldHxidXR0b258dGV4dHxwYXNzd29yZCkkLy50ZXN0KGVsLnR5cGUpIHx8IGVsLm5vZGVOYW1lID09PSBcIlNFTEVDVFwiKXtcbiAgICAgIHZhbHVlV3JhcC5zdHlsZS5saW5lSGVpZ2h0ID0gZ2V0Q1NTKGVsLCBcImhlaWdodFwiKTtcbiAgICB9XG5cbiAgICB2YWx1ZVdyYXAuc3R5bGUudG9wID0gYm91bmRzLnRvcCArIFwicHhcIjtcbiAgICB2YWx1ZVdyYXAuc3R5bGUubGVmdCA9IGJvdW5kcy5sZWZ0ICsgXCJweFwiO1xuXG4gICAgdGV4dFZhbHVlID0gKGVsLm5vZGVOYW1lID09PSBcIlNFTEVDVFwiKSA/IChlbC5vcHRpb25zW2VsLnNlbGVjdGVkSW5kZXhdIHx8IDApLnRleHQgOiBlbC52YWx1ZTtcbiAgICBpZighdGV4dFZhbHVlKSB7XG4gICAgICB0ZXh0VmFsdWUgPSBlbC5wbGFjZWhvbGRlcjtcbiAgICB9XG5cbiAgICB0ZXh0Tm9kZSA9IGRvYy5jcmVhdGVUZXh0Tm9kZSh0ZXh0VmFsdWUpO1xuXG4gICAgdmFsdWVXcmFwLmFwcGVuZENoaWxkKHRleHROb2RlKTtcbiAgICBib2R5LmFwcGVuZENoaWxkKHZhbHVlV3JhcCk7XG5cbiAgICByZW5kZXJUZXh0KGVsLCB0ZXh0Tm9kZSwgc3RhY2spO1xuICAgIGJvZHkucmVtb3ZlQ2hpbGQodmFsdWVXcmFwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdJbWFnZSAoY3R4KSB7XG4gICAgY3R4LmRyYXdJbWFnZS5hcHBseShjdHgsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgIG51bURyYXdzKz0xO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHNldWRvRWxlbWVudChlbCwgd2hpY2gpIHtcbiAgICB2YXIgZWxTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCB3aGljaCk7XG4gICAgaWYoIWVsU3R5bGUgfHwgIWVsU3R5bGUuY29udGVudCB8fCBlbFN0eWxlLmNvbnRlbnQgPT09IFwibm9uZVwiIHx8IGVsU3R5bGUuY29udGVudCA9PT0gXCItbW96LWFsdC1jb250ZW50XCIgfHwgZWxTdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY29udGVudCA9IGVsU3R5bGUuY29udGVudCArICcnLFxuICAgIGZpcnN0ID0gY29udGVudC5zdWJzdHIoIDAsIDEgKTtcbiAgICAvL3N0cmlwcyBxdW90ZXNcbiAgICBpZihmaXJzdCA9PT0gY29udGVudC5zdWJzdHIoIGNvbnRlbnQubGVuZ3RoIC0gMSApICYmIGZpcnN0Lm1hdGNoKC8nfFwiLykpIHtcbiAgICAgIGNvbnRlbnQgPSBjb250ZW50LnN1YnN0ciggMSwgY29udGVudC5sZW5ndGggLSAyICk7XG4gICAgfVxuXG4gICAgdmFyIGlzSW1hZ2UgPSBjb250ZW50LnN1YnN0ciggMCwgMyApID09PSAndXJsJyxcbiAgICBlbHBzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggaXNJbWFnZSA/ICdpbWcnIDogJ3NwYW4nICk7XG5cbiAgICBlbHBzLmNsYXNzTmFtZSA9IHBzZXVkb0hpZGUgKyBcIi1iZWZvcmUgXCIgKyBwc2V1ZG9IaWRlICsgXCItYWZ0ZXJcIjtcblxuICAgIE9iamVjdC5rZXlzKGVsU3R5bGUpLmZpbHRlcihpbmRleGVkUHJvcGVydHkpLmZvckVhY2goZnVuY3Rpb24ocHJvcCkge1xuICAgICAgLy8gUHJldmVudCBhc3NpZ25pbmcgb2YgcmVhZCBvbmx5IENTUyBSdWxlcywgZXguIGxlbmd0aCwgcGFyZW50UnVsZVxuICAgICAgdHJ5IHtcbiAgICAgICAgZWxwcy5zdHlsZVtwcm9wXSA9IGVsU3R5bGVbcHJvcF07XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIFV0aWwubG9nKFsnVHJpZWQgdG8gYXNzaWduIHJlYWRvbmx5IHByb3BlcnR5ICcsIHByb3AsICdFcnJvcjonLCBlXSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZihpc0ltYWdlKSB7XG4gICAgICBlbHBzLnNyYyA9IFV0aWwucGFyc2VCYWNrZ3JvdW5kSW1hZ2UoY29udGVudClbMF0uYXJnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxwcy5pbm5lckhUTUwgPSBjb250ZW50O1xuICAgIH1cbiAgICByZXR1cm4gZWxwcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGluZGV4ZWRQcm9wZXJ0eShwcm9wZXJ0eSkge1xuICAgIHJldHVybiAoaXNOYU4od2luZG93LnBhcnNlSW50KHByb3BlcnR5LCAxMCkpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluamVjdFBzZXVkb0VsZW1lbnRzKGVsLCBzdGFjaykge1xuICAgIHZhciBiZWZvcmUgPSBnZXRQc2V1ZG9FbGVtZW50KGVsLCAnOmJlZm9yZScpLFxuICAgIGFmdGVyID0gZ2V0UHNldWRvRWxlbWVudChlbCwgJzphZnRlcicpO1xuICAgIGlmKCFiZWZvcmUgJiYgIWFmdGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYoYmVmb3JlKSB7XG4gICAgICBlbC5jbGFzc05hbWUgKz0gXCIgXCIgKyBwc2V1ZG9IaWRlICsgXCItYmVmb3JlXCI7XG4gICAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShiZWZvcmUsIGVsKTtcbiAgICAgIHBhcnNlRWxlbWVudChiZWZvcmUsIHN0YWNrLCB0cnVlKTtcbiAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoYmVmb3JlKTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKHBzZXVkb0hpZGUgKyBcIi1iZWZvcmVcIiwgXCJcIikudHJpbSgpO1xuICAgIH1cblxuICAgIGlmIChhZnRlcikge1xuICAgICAgZWwuY2xhc3NOYW1lICs9IFwiIFwiICsgcHNldWRvSGlkZSArIFwiLWFmdGVyXCI7XG4gICAgICBlbC5hcHBlbmRDaGlsZChhZnRlcik7XG4gICAgICBwYXJzZUVsZW1lbnQoYWZ0ZXIsIHN0YWNrLCB0cnVlKTtcbiAgICAgIGVsLnJlbW92ZUNoaWxkKGFmdGVyKTtcbiAgICAgIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKHBzZXVkb0hpZGUgKyBcIi1hZnRlclwiLCBcIlwiKS50cmltKCk7XG4gICAgfVxuXG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJCYWNrZ3JvdW5kUmVwZWF0KGN0eCwgaW1hZ2UsIGJhY2tncm91bmRQb3NpdGlvbiwgYm91bmRzKSB7XG4gICAgdmFyIG9mZnNldFggPSBNYXRoLnJvdW5kKGJvdW5kcy5sZWZ0ICsgYmFja2dyb3VuZFBvc2l0aW9uLmxlZnQpLFxuICAgIG9mZnNldFkgPSBNYXRoLnJvdW5kKGJvdW5kcy50b3AgKyBiYWNrZ3JvdW5kUG9zaXRpb24udG9wKTtcblxuICAgIGN0eC5jcmVhdGVQYXR0ZXJuKGltYWdlKTtcbiAgICBjdHgudHJhbnNsYXRlKG9mZnNldFgsIG9mZnNldFkpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgY3R4LnRyYW5zbGF0ZSgtb2Zmc2V0WCwgLW9mZnNldFkpO1xuICB9XG5cbiAgZnVuY3Rpb24gYmFja2dyb3VuZFJlcGVhdFNoYXBlKGN0eCwgaW1hZ2UsIGJhY2tncm91bmRQb3NpdGlvbiwgYm91bmRzLCBsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGFyZ3MucHVzaChbXCJsaW5lXCIsIE1hdGgucm91bmQobGVmdCksIE1hdGgucm91bmQodG9wKV0pO1xuICAgIGFyZ3MucHVzaChbXCJsaW5lXCIsIE1hdGgucm91bmQobGVmdCArIHdpZHRoKSwgTWF0aC5yb3VuZCh0b3ApXSk7XG4gICAgYXJncy5wdXNoKFtcImxpbmVcIiwgTWF0aC5yb3VuZChsZWZ0ICsgd2lkdGgpLCBNYXRoLnJvdW5kKGhlaWdodCArIHRvcCldKTtcbiAgICBhcmdzLnB1c2goW1wibGluZVwiLCBNYXRoLnJvdW5kKGxlZnQpLCBNYXRoLnJvdW5kKGhlaWdodCArIHRvcCldKTtcbiAgICBjcmVhdGVTaGFwZShjdHgsIGFyZ3MpO1xuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmNsaXAoKTtcbiAgICByZW5kZXJCYWNrZ3JvdW5kUmVwZWF0KGN0eCwgaW1hZ2UsIGJhY2tncm91bmRQb3NpdGlvbiwgYm91bmRzKTtcbiAgICBjdHgucmVzdG9yZSgpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQmFja2dyb3VuZENvbG9yKGN0eCwgYmFja2dyb3VuZEJvdW5kcywgYmdjb2xvcikge1xuICAgIHJlbmRlclJlY3QoXG4gICAgICBjdHgsXG4gICAgICBiYWNrZ3JvdW5kQm91bmRzLmxlZnQsXG4gICAgICBiYWNrZ3JvdW5kQm91bmRzLnRvcCxcbiAgICAgIGJhY2tncm91bmRCb3VuZHMud2lkdGgsXG4gICAgICBiYWNrZ3JvdW5kQm91bmRzLmhlaWdodCxcbiAgICAgIGJnY29sb3JcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJCYWNrZ3JvdW5kUmVwZWF0aW5nKGVsLCBib3VuZHMsIGN0eCwgaW1hZ2UsIGltYWdlSW5kZXgpIHtcbiAgICB2YXIgYmFja2dyb3VuZFNpemUgPSBVdGlsLkJhY2tncm91bmRTaXplKGVsLCBib3VuZHMsIGltYWdlLCBpbWFnZUluZGV4KSxcbiAgICBiYWNrZ3JvdW5kUG9zaXRpb24gPSBVdGlsLkJhY2tncm91bmRQb3NpdGlvbihlbCwgYm91bmRzLCBpbWFnZSwgaW1hZ2VJbmRleCwgYmFja2dyb3VuZFNpemUpLFxuICAgIGJhY2tncm91bmRSZXBlYXQgPSBnZXRDU1MoZWwsIFwiYmFja2dyb3VuZFJlcGVhdFwiKS5zcGxpdChcIixcIikubWFwKFV0aWwudHJpbVRleHQpO1xuXG4gICAgaW1hZ2UgPSByZXNpemVJbWFnZShpbWFnZSwgYmFja2dyb3VuZFNpemUpO1xuXG4gICAgYmFja2dyb3VuZFJlcGVhdCA9IGJhY2tncm91bmRSZXBlYXRbaW1hZ2VJbmRleF0gfHwgYmFja2dyb3VuZFJlcGVhdFswXTtcblxuICAgIHN3aXRjaCAoYmFja2dyb3VuZFJlcGVhdCkge1xuICAgICAgY2FzZSBcInJlcGVhdC14XCI6XG4gICAgICAgIGJhY2tncm91bmRSZXBlYXRTaGFwZShjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIGJvdW5kcyxcbiAgICAgICAgICBib3VuZHMubGVmdCwgYm91bmRzLnRvcCArIGJhY2tncm91bmRQb3NpdGlvbi50b3AsIDk5OTk5LCBpbWFnZS5oZWlnaHQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcInJlcGVhdC15XCI6XG4gICAgICAgIGJhY2tncm91bmRSZXBlYXRTaGFwZShjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIGJvdW5kcyxcbiAgICAgICAgICBib3VuZHMubGVmdCArIGJhY2tncm91bmRQb3NpdGlvbi5sZWZ0LCBib3VuZHMudG9wLCBpbWFnZS53aWR0aCwgOTk5OTkpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSBcIm5vLXJlcGVhdFwiOlxuICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0U2hhcGUoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCBib3VuZHMsXG4gICAgICAgICAgYm91bmRzLmxlZnQgKyBiYWNrZ3JvdW5kUG9zaXRpb24ubGVmdCwgYm91bmRzLnRvcCArIGJhY2tncm91bmRQb3NpdGlvbi50b3AsIGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmVuZGVyQmFja2dyb3VuZFJlcGVhdChjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIHtcbiAgICAgICAgICB0b3A6IGJvdW5kcy50b3AsXG4gICAgICAgICAgbGVmdDogYm91bmRzLmxlZnQsXG4gICAgICAgICAgd2lkdGg6IGltYWdlLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogaW1hZ2UuaGVpZ2h0XG4gICAgICAgIH0pO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJCYWNrZ3JvdW5kSW1hZ2UoZWxlbWVudCwgYm91bmRzLCBjdHgpIHtcbiAgICB2YXIgYmFja2dyb3VuZEltYWdlID0gZ2V0Q1NTKGVsZW1lbnQsIFwiYmFja2dyb3VuZEltYWdlXCIpLFxuICAgIGJhY2tncm91bmRJbWFnZXMgPSBVdGlsLnBhcnNlQmFja2dyb3VuZEltYWdlKGJhY2tncm91bmRJbWFnZSksXG4gICAgaW1hZ2UsXG4gICAgaW1hZ2VJbmRleCA9IGJhY2tncm91bmRJbWFnZXMubGVuZ3RoO1xuXG4gICAgd2hpbGUoaW1hZ2VJbmRleC0tKSB7XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2UgPSBiYWNrZ3JvdW5kSW1hZ2VzW2ltYWdlSW5kZXhdO1xuXG4gICAgICBpZiAoIWJhY2tncm91bmRJbWFnZS5hcmdzIHx8IGJhY2tncm91bmRJbWFnZS5hcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGtleSA9IGJhY2tncm91bmRJbWFnZS5tZXRob2QgPT09ICd1cmwnID9cbiAgICAgIGJhY2tncm91bmRJbWFnZS5hcmdzWzBdIDpcbiAgICAgIGJhY2tncm91bmRJbWFnZS52YWx1ZTtcblxuICAgICAgaW1hZ2UgPSBsb2FkSW1hZ2Uoa2V5KTtcblxuICAgICAgLy8gVE9ETyBhZGQgc3VwcG9ydCBmb3IgYmFja2dyb3VuZC1vcmlnaW5cbiAgICAgIGlmIChpbWFnZSkge1xuICAgICAgICByZW5kZXJCYWNrZ3JvdW5kUmVwZWF0aW5nKGVsZW1lbnQsIGJvdW5kcywgY3R4LCBpbWFnZSwgaW1hZ2VJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBFcnJvciBsb2FkaW5nIGJhY2tncm91bmQ6XCIsIGJhY2tncm91bmRJbWFnZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVzaXplSW1hZ2UoaW1hZ2UsIGJvdW5kcykge1xuICAgIGlmKGltYWdlLndpZHRoID09PSBib3VuZHMud2lkdGggJiYgaW1hZ2UuaGVpZ2h0ID09PSBib3VuZHMuaGVpZ2h0KSB7XG4gICAgICByZXR1cm4gaW1hZ2U7XG4gICAgfVxuXG4gICAgdmFyIGN0eCwgY2FudmFzID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IGJvdW5kcy53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gYm91bmRzLmhlaWdodDtcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGRyYXdJbWFnZShjdHgsIGltYWdlLCAwLCAwLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0LCAwLCAwLCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQgKTtcbiAgICByZXR1cm4gY2FudmFzO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0T3BhY2l0eShjdHgsIGVsZW1lbnQsIHBhcmVudFN0YWNrKSB7XG4gICAgcmV0dXJuIGN0eC5zZXRWYXJpYWJsZShcImdsb2JhbEFscGhhXCIsIGdldENTUyhlbGVtZW50LCBcIm9wYWNpdHlcIikgKiAoKHBhcmVudFN0YWNrKSA/IHBhcmVudFN0YWNrLm9wYWNpdHkgOiAxKSk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVQeChzdHIpIHtcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UoXCJweFwiLCBcIlwiKTtcbiAgfVxuXG4gIHZhciB0cmFuc2Zvcm1SZWdFeHAgPSAvKG1hdHJpeClcXCgoLispXFwpLztcblxuICBmdW5jdGlvbiBnZXRUcmFuc2Zvcm0oZWxlbWVudCwgcGFyZW50U3RhY2spIHtcbiAgICB2YXIgdHJhbnNmb3JtID0gZ2V0Q1NTKGVsZW1lbnQsIFwidHJhbnNmb3JtXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi13ZWJraXQtdHJhbnNmb3JtXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi1tb3otdHJhbnNmb3JtXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi1tcy10cmFuc2Zvcm1cIikgfHwgZ2V0Q1NTKGVsZW1lbnQsIFwiLW8tdHJhbnNmb3JtXCIpO1xuICAgIHZhciB0cmFuc2Zvcm1PcmlnaW4gPSBnZXRDU1MoZWxlbWVudCwgXCJ0cmFuc2Zvcm0tb3JpZ2luXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi13ZWJraXQtdHJhbnNmb3JtLW9yaWdpblwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItbW96LXRyYW5zZm9ybS1vcmlnaW5cIikgfHwgZ2V0Q1NTKGVsZW1lbnQsIFwiLW1zLXRyYW5zZm9ybS1vcmlnaW5cIikgfHwgZ2V0Q1NTKGVsZW1lbnQsIFwiLW8tdHJhbnNmb3JtLW9yaWdpblwiKSB8fCBcIjBweCAwcHhcIjtcblxuICAgIHRyYW5zZm9ybU9yaWdpbiA9IHRyYW5zZm9ybU9yaWdpbi5zcGxpdChcIiBcIikubWFwKHJlbW92ZVB4KS5tYXAoVXRpbC5hc0Zsb2F0KTtcblxuICAgIHZhciBtYXRyaXg7XG4gICAgaWYgKHRyYW5zZm9ybSAmJiB0cmFuc2Zvcm0gIT09IFwibm9uZVwiKSB7XG4gICAgICB2YXIgbWF0Y2ggPSB0cmFuc2Zvcm0ubWF0Y2godHJhbnNmb3JtUmVnRXhwKTtcbiAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICBzd2l0Y2gobWF0Y2hbMV0pIHtcbiAgICAgICAgICBjYXNlIFwibWF0cml4XCI6XG4gICAgICAgICAgICBtYXRyaXggPSBtYXRjaFsyXS5zcGxpdChcIixcIikubWFwKFV0aWwudHJpbVRleHQpLm1hcChVdGlsLmFzRmxvYXQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgb3JpZ2luOiB0cmFuc2Zvcm1PcmlnaW4sXG4gICAgICBtYXRyaXg6IG1hdHJpeFxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTdGFjayhlbGVtZW50LCBwYXJlbnRTdGFjaywgYm91bmRzLCB0cmFuc2Zvcm0pIHtcbiAgICB2YXIgY3R4ID0gaDJjUmVuZGVyQ29udGV4dCgoIXBhcmVudFN0YWNrKSA/IGRvY3VtZW50V2lkdGgoKSA6IGJvdW5kcy53aWR0aCAsICghcGFyZW50U3RhY2spID8gZG9jdW1lbnRIZWlnaHQoKSA6IGJvdW5kcy5oZWlnaHQpLFxuICAgIHN0YWNrID0ge1xuICAgICAgY3R4OiBjdHgsXG4gICAgICBvcGFjaXR5OiBzZXRPcGFjaXR5KGN0eCwgZWxlbWVudCwgcGFyZW50U3RhY2spLFxuICAgICAgY3NzUG9zaXRpb246IGdldENTUyhlbGVtZW50LCBcInBvc2l0aW9uXCIpLFxuICAgICAgYm9yZGVyczogZ2V0Qm9yZGVyRGF0YShlbGVtZW50KSxcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgICAgY2xpcDogKHBhcmVudFN0YWNrICYmIHBhcmVudFN0YWNrLmNsaXApID8gVXRpbC5FeHRlbmQoIHt9LCBwYXJlbnRTdGFjay5jbGlwICkgOiBudWxsXG4gICAgfTtcblxuICAgIHNldFooZWxlbWVudCwgc3RhY2ssIHBhcmVudFN0YWNrKTtcblxuICAgIC8vIFRPRE8gY29ycmVjdCBvdmVyZmxvdyBmb3IgYWJzb2x1dGUgY29udGVudCByZXNpZGluZyB1bmRlciBhIHN0YXRpYyBwb3NpdGlvblxuICAgIGlmIChvcHRpb25zLnVzZU92ZXJmbG93ID09PSB0cnVlICYmIC8oaGlkZGVufHNjcm9sbHxhdXRvKS8udGVzdChnZXRDU1MoZWxlbWVudCwgXCJvdmVyZmxvd1wiKSkgPT09IHRydWUgJiYgLyhCT0RZKS9pLnRlc3QoZWxlbWVudC5ub2RlTmFtZSkgPT09IGZhbHNlKXtcbiAgICAgIHN0YWNrLmNsaXAgPSAoc3RhY2suY2xpcCkgPyBjbGlwQm91bmRzKHN0YWNrLmNsaXAsIGJvdW5kcykgOiBib3VuZHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN0YWNrO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0QmFja2dyb3VuZEJvdW5kcyhib3JkZXJzLCBib3VuZHMsIGNsaXApIHtcbiAgICB2YXIgYmFja2dyb3VuZEJvdW5kcyA9IHtcbiAgICAgIGxlZnQ6IGJvdW5kcy5sZWZ0ICsgYm9yZGVyc1szXS53aWR0aCxcbiAgICAgIHRvcDogYm91bmRzLnRvcCArIGJvcmRlcnNbMF0ud2lkdGgsXG4gICAgICB3aWR0aDogYm91bmRzLndpZHRoIC0gKGJvcmRlcnNbMV0ud2lkdGggKyBib3JkZXJzWzNdLndpZHRoKSxcbiAgICAgIGhlaWdodDogYm91bmRzLmhlaWdodCAtIChib3JkZXJzWzBdLndpZHRoICsgYm9yZGVyc1syXS53aWR0aClcbiAgICB9O1xuXG4gICAgaWYgKGNsaXApIHtcbiAgICAgIGJhY2tncm91bmRCb3VuZHMgPSBjbGlwQm91bmRzKGJhY2tncm91bmRCb3VuZHMsIGNsaXApO1xuICAgIH1cblxuICAgIHJldHVybiBiYWNrZ3JvdW5kQm91bmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm91bmRzKGVsZW1lbnQsIHRyYW5zZm9ybSkge1xuICAgIHZhciBib3VuZHMgPSAodHJhbnNmb3JtLm1hdHJpeCkgPyBVdGlsLk9mZnNldEJvdW5kcyhlbGVtZW50KSA6IFV0aWwuQm91bmRzKGVsZW1lbnQpO1xuICAgIHRyYW5zZm9ybS5vcmlnaW5bMF0gKz0gYm91bmRzLmxlZnQ7XG4gICAgdHJhbnNmb3JtLm9yaWdpblsxXSArPSBib3VuZHMudG9wO1xuICAgIHJldHVybiBib3VuZHM7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJFbGVtZW50KGVsZW1lbnQsIHBhcmVudFN0YWNrLCBwc2V1ZG9FbGVtZW50LCBpZ25vcmVCYWNrZ3JvdW5kKSB7XG4gICAgdmFyIHRyYW5zZm9ybSA9IGdldFRyYW5zZm9ybShlbGVtZW50LCBwYXJlbnRTdGFjayksXG4gICAgYm91bmRzID0gZ2V0Qm91bmRzKGVsZW1lbnQsIHRyYW5zZm9ybSksXG4gICAgaW1hZ2UsXG4gICAgc3RhY2sgPSBjcmVhdGVTdGFjayhlbGVtZW50LCBwYXJlbnRTdGFjaywgYm91bmRzLCB0cmFuc2Zvcm0pLFxuICAgIGJvcmRlcnMgPSBzdGFjay5ib3JkZXJzLFxuICAgIGN0eCA9IHN0YWNrLmN0eCxcbiAgICBiYWNrZ3JvdW5kQm91bmRzID0gZ2V0QmFja2dyb3VuZEJvdW5kcyhib3JkZXJzLCBib3VuZHMsIHN0YWNrLmNsaXApLFxuICAgIGJvcmRlckRhdGEgPSBwYXJzZUJvcmRlcnMoZWxlbWVudCwgYm91bmRzLCBib3JkZXJzKSxcbiAgICBiYWNrZ3JvdW5kQ29sb3IgPSAoaWdub3JlRWxlbWVudHNSZWdFeHAudGVzdChlbGVtZW50Lm5vZGVOYW1lKSkgPyBcIiNlZmVmZWZcIiA6IGdldENTUyhlbGVtZW50LCBcImJhY2tncm91bmRDb2xvclwiKTtcblxuXG4gICAgY3JlYXRlU2hhcGUoY3R4LCBib3JkZXJEYXRhLmNsaXApO1xuXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguY2xpcCgpO1xuXG4gICAgaWYgKGJhY2tncm91bmRCb3VuZHMuaGVpZ2h0ID4gMCAmJiBiYWNrZ3JvdW5kQm91bmRzLndpZHRoID4gMCAmJiAhaWdub3JlQmFja2dyb3VuZCkge1xuICAgICAgcmVuZGVyQmFja2dyb3VuZENvbG9yKGN0eCwgYm91bmRzLCBiYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgcmVuZGVyQmFja2dyb3VuZEltYWdlKGVsZW1lbnQsIGJhY2tncm91bmRCb3VuZHMsIGN0eCk7XG4gICAgfSBlbHNlIGlmIChpZ25vcmVCYWNrZ3JvdW5kKSB7XG4gICAgICBzdGFjay5iYWNrZ3JvdW5kQ29sb3IgPSAgYmFja2dyb3VuZENvbG9yO1xuICAgIH1cblxuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICBib3JkZXJEYXRhLmJvcmRlcnMuZm9yRWFjaChmdW5jdGlvbihib3JkZXIpIHtcbiAgICAgIHJlbmRlckJvcmRlcnMoY3R4LCBib3JkZXIuYXJncywgYm9yZGVyLmNvbG9yKTtcbiAgICB9KTtcblxuICAgIGlmICghcHNldWRvRWxlbWVudCkge1xuICAgICAgaW5qZWN0UHNldWRvRWxlbWVudHMoZWxlbWVudCwgc3RhY2spO1xuICAgIH1cblxuICAgIHN3aXRjaChlbGVtZW50Lm5vZGVOYW1lKXtcbiAgICAgIGNhc2UgXCJJTUdcIjpcbiAgICAgICAgaWYgKChpbWFnZSA9IGxvYWRJbWFnZShlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykpKSkge1xuICAgICAgICAgIHJlbmRlckltYWdlKGN0eCwgZWxlbWVudCwgaW1hZ2UsIGJvdW5kcywgYm9yZGVycyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogRXJyb3IgbG9hZGluZyA8aW1nPjpcIiArIGVsZW1lbnQuZ2V0QXR0cmlidXRlKCdzcmMnKSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiSU5QVVRcIjpcbiAgICAgICAgLy8gVE9ETyBhZGQgYWxsIHJlbGV2YW50IHR5cGUncywgaS5lLiBIVE1MNSBuZXcgc3R1ZmZcbiAgICAgICAgLy8gdG9kbyBhZGQgc3VwcG9ydCBmb3IgcGxhY2Vob2xkZXIgYXR0cmlidXRlIGZvciBicm93c2VycyB3aGljaCBzdXBwb3J0IGl0XG4gICAgICAgIGlmICgvXih0ZXh0fHVybHxlbWFpbHxzdWJtaXR8YnV0dG9ufHJlc2V0KSQvLnRlc3QoZWxlbWVudC50eXBlKSAmJiAoZWxlbWVudC52YWx1ZSB8fCBlbGVtZW50LnBsYWNlaG9sZGVyIHx8IFwiXCIpLmxlbmd0aCA+IDApe1xuICAgICAgICAgIHJlbmRlckZvcm1WYWx1ZShlbGVtZW50LCBib3VuZHMsIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJURVhUQVJFQVwiOlxuICAgICAgICBpZiAoKGVsZW1lbnQudmFsdWUgfHwgZWxlbWVudC5wbGFjZWhvbGRlciB8fCBcIlwiKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICByZW5kZXJGb3JtVmFsdWUoZWxlbWVudCwgYm91bmRzLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiU0VMRUNUXCI6XG4gICAgICAgIGlmICgoZWxlbWVudC5vcHRpb25zfHxlbGVtZW50LnBsYWNlaG9sZGVyIHx8IFwiXCIpLmxlbmd0aCA+IDApe1xuICAgICAgICAgIHJlbmRlckZvcm1WYWx1ZShlbGVtZW50LCBib3VuZHMsIHN0YWNrKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJMSVwiOlxuICAgICAgICByZW5kZXJMaXN0SXRlbShlbGVtZW50LCBzdGFjaywgYmFja2dyb3VuZEJvdW5kcyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIkNBTlZBU1wiOlxuICAgICAgICByZW5kZXJJbWFnZShjdHgsIGVsZW1lbnQsIGVsZW1lbnQsIGJvdW5kcywgYm9yZGVycyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFjaztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRWxlbWVudFZpc2libGUoZWxlbWVudCkge1xuICAgIHJldHVybiAoZ2V0Q1NTKGVsZW1lbnQsICdkaXNwbGF5JykgIT09IFwibm9uZVwiICYmIGdldENTUyhlbGVtZW50LCAndmlzaWJpbGl0eScpICE9PSBcImhpZGRlblwiICYmICFlbGVtZW50Lmhhc0F0dHJpYnV0ZShcImRhdGEtaHRtbDJjYW52YXMtaWdub3JlXCIpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlRWxlbWVudCAoZWxlbWVudCwgc3RhY2ssIHBzZXVkb0VsZW1lbnQpIHtcbiAgICBpZiAoaXNFbGVtZW50VmlzaWJsZShlbGVtZW50KSkge1xuICAgICAgc3RhY2sgPSByZW5kZXJFbGVtZW50KGVsZW1lbnQsIHN0YWNrLCBwc2V1ZG9FbGVtZW50LCBmYWxzZSkgfHwgc3RhY2s7XG4gICAgICBpZiAoIWlnbm9yZUVsZW1lbnRzUmVnRXhwLnRlc3QoZWxlbWVudC5ub2RlTmFtZSkpIHtcbiAgICAgICAgcGFyc2VDaGlsZHJlbihlbGVtZW50LCBzdGFjaywgcHNldWRvRWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VDaGlsZHJlbihlbGVtZW50LCBzdGFjaywgcHNldWRvRWxlbWVudCkge1xuICAgIFV0aWwuQ2hpbGRyZW4oZWxlbWVudCkuZm9yRWFjaChmdW5jdGlvbihub2RlKSB7XG4gICAgICBpZiAobm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgICAgcGFyc2VFbGVtZW50KG5vZGUsIHN0YWNrLCBwc2V1ZG9FbGVtZW50KTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZS5ub2RlVHlwZSA9PT0gbm9kZS5URVhUX05PREUpIHtcbiAgICAgICAgcmVuZGVyVGV4dChlbGVtZW50LCBub2RlLCBzdGFjayk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBiYWNrZ3JvdW5kID0gZ2V0Q1NTKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgXCJiYWNrZ3JvdW5kQ29sb3JcIiksXG4gICAgICB0cmFuc3BhcmVudEJhY2tncm91bmQgPSAoVXRpbC5pc1RyYW5zcGFyZW50KGJhY2tncm91bmQpICYmIGVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpLFxuICAgICAgc3RhY2sgPSByZW5kZXJFbGVtZW50KGVsZW1lbnQsIG51bGwsIGZhbHNlLCB0cmFuc3BhcmVudEJhY2tncm91bmQpO1xuICAgIHBhcnNlQ2hpbGRyZW4oZWxlbWVudCwgc3RhY2spO1xuXG4gICAgaWYgKHRyYW5zcGFyZW50QmFja2dyb3VuZCkge1xuICAgICAgYmFja2dyb3VuZCA9IHN0YWNrLmJhY2tncm91bmRDb2xvcjtcbiAgICB9XG5cbiAgICBib2R5LnJlbW92ZUNoaWxkKGhpZGVQc2V1ZG9FbGVtZW50cyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZCxcbiAgICAgIHN0YWNrOiBzdGFja1xuICAgIH07XG4gIH1cblxuICByZXR1cm4gaW5pdCgpO1xufTtcblxuZnVuY3Rpb24gaDJjekNvbnRleHQoemluZGV4KSB7XG4gIHJldHVybiB7XG4gICAgemluZGV4OiB6aW5kZXgsXG4gICAgY2hpbGRyZW46IFtdXG4gIH07XG59XG5cbl9odG1sMmNhbnZhcy5QcmVsb2FkID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cbiAgdmFyIGltYWdlcyA9IHtcbiAgICBudW1Mb2FkZWQ6IDAsICAgLy8gYWxzbyBmYWlsZWQgYXJlIGNvdW50ZWQgaGVyZVxuICAgIG51bUZhaWxlZDogMCxcbiAgICBudW1Ub3RhbDogMCxcbiAgICBjbGVhbnVwRG9uZTogZmFsc2VcbiAgfSxcbiAgcGFnZU9yaWdpbixcbiAgVXRpbCA9IF9odG1sMmNhbnZhcy5VdGlsLFxuICBtZXRob2RzLFxuICBpLFxuICBjb3VudCA9IDAsXG4gIGVsZW1lbnQgPSBvcHRpb25zLmVsZW1lbnRzWzBdIHx8IGRvY3VtZW50LmJvZHksXG4gIGRvYyA9IGVsZW1lbnQub3duZXJEb2N1bWVudCxcbiAgZG9tSW1hZ2VzID0gZWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1nJyksIC8vIEZldGNoIGltYWdlcyBvZiB0aGUgcHJlc2VudCBlbGVtZW50IG9ubHlcbiAgaW1nTGVuID0gZG9tSW1hZ2VzLmxlbmd0aCxcbiAgbGluayA9IGRvYy5jcmVhdGVFbGVtZW50KFwiYVwiKSxcbiAgc3VwcG9ydENPUlMgPSAoZnVuY3Rpb24oIGltZyApe1xuICAgIHJldHVybiAoaW1nLmNyb3NzT3JpZ2luICE9PSB1bmRlZmluZWQpO1xuICB9KShuZXcgSW1hZ2UoKSksXG4gIHRpbWVvdXRUaW1lcjtcblxuICBsaW5rLmhyZWYgPSB3aW5kb3cubG9jYXRpb24uaHJlZjtcbiAgcGFnZU9yaWdpbiAgPSBsaW5rLnByb3RvY29sICsgbGluay5ob3N0O1xuXG4gIGZ1bmN0aW9uIGlzU2FtZU9yaWdpbih1cmwpe1xuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICBsaW5rLmhyZWYgPSBsaW5rLmhyZWY7IC8vIFlFUywgQkVMSUVWRSBJVCBPUiBOT1QsIHRoYXQgaXMgcmVxdWlyZWQgZm9yIElFOSAtIGh0dHA6Ly9qc2ZpZGRsZS5uZXQvbmlrbGFzdmgvMmU0OGIvXG4gICAgdmFyIG9yaWdpbiA9IGxpbmsucHJvdG9jb2wgKyBsaW5rLmhvc3Q7XG4gICAgcmV0dXJuIChvcmlnaW4gPT09IHBhZ2VPcmlnaW4pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoKXtcbiAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBzdGFydDogaW1hZ2VzOiBcIiArIGltYWdlcy5udW1Mb2FkZWQgKyBcIiAvIFwiICsgaW1hZ2VzLm51bVRvdGFsICsgXCIgKGZhaWxlZDogXCIgKyBpbWFnZXMubnVtRmFpbGVkICsgXCIpXCIpO1xuICAgIGlmICghaW1hZ2VzLmZpcnN0UnVuICYmIGltYWdlcy5udW1Mb2FkZWQgPj0gaW1hZ2VzLm51bVRvdGFsKXtcbiAgICAgIFV0aWwubG9nKFwiRmluaXNoZWQgbG9hZGluZyBpbWFnZXM6ICMgXCIgKyBpbWFnZXMubnVtVG90YWwgKyBcIiAoZmFpbGVkOiBcIiArIGltYWdlcy5udW1GYWlsZWQgKyBcIilcIik7XG5cbiAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5jb21wbGV0ZSA9PT0gXCJmdW5jdGlvblwiKXtcbiAgICAgICAgb3B0aW9ucy5jb21wbGV0ZShpbWFnZXMpO1xuICAgICAgfVxuXG4gICAgfVxuICB9XG5cbiAgLy8gVE9ETyBtb2RpZnkgcHJveHkgdG8gc2VydmUgaW1hZ2VzIHdpdGggQ09SUyBlbmFibGVkLCB3aGVyZSBhdmFpbGFibGVcbiAgZnVuY3Rpb24gcHJveHlHZXRJbWFnZSh1cmwsIGltZywgaW1hZ2VPYmope1xuICAgIHZhciBjYWxsYmFja19uYW1lLFxuICAgIHNjcmlwdFVybCA9IG9wdGlvbnMucHJveHksXG4gICAgc2NyaXB0O1xuXG4gICAgbGluay5ocmVmID0gdXJsO1xuICAgIHVybCA9IGxpbmsuaHJlZjsgLy8gd29yayBhcm91bmQgZm9yIHBhZ2VzIHdpdGggYmFzZSBocmVmPVwiXCIgc2V0IC0gV0FSTklORzogdGhpcyBtYXkgY2hhbmdlIHRoZSB1cmxcblxuICAgIGNhbGxiYWNrX25hbWUgPSAnaHRtbDJjYW52YXNfJyArIChjb3VudCsrKTtcbiAgICBpbWFnZU9iai5jYWxsYmFja25hbWUgPSBjYWxsYmFja19uYW1lO1xuXG4gICAgaWYgKHNjcmlwdFVybC5pbmRleE9mKFwiP1wiKSA+IC0xKSB7XG4gICAgICBzY3JpcHRVcmwgKz0gXCImXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjcmlwdFVybCArPSBcIj9cIjtcbiAgICB9XG4gICAgc2NyaXB0VXJsICs9ICd1cmw9JyArIGVuY29kZVVSSUNvbXBvbmVudCh1cmwpICsgJyZjYWxsYmFjaz0nICsgY2FsbGJhY2tfbmFtZTtcbiAgICBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcblxuICAgIHdpbmRvd1tjYWxsYmFja19uYW1lXSA9IGZ1bmN0aW9uKGEpe1xuICAgICAgaWYgKGEuc3Vic3RyaW5nKDAsNikgPT09IFwiZXJyb3I6XCIpe1xuICAgICAgICBpbWFnZU9iai5zdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgICAgaW1hZ2VzLm51bUxvYWRlZCsrO1xuICAgICAgICBpbWFnZXMubnVtRmFpbGVkKys7XG4gICAgICAgIHN0YXJ0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRJbWFnZUxvYWRIYW5kbGVycyhpbWcsIGltYWdlT2JqKTtcbiAgICAgICAgaW1nLnNyYyA9IGE7XG4gICAgICB9XG4gICAgICB3aW5kb3dbY2FsbGJhY2tfbmFtZV0gPSB1bmRlZmluZWQ7IC8vIHRvIHdvcmsgd2l0aCBJRTw5ICAvLyBOT1RFOiB0aGF0IHRoZSB1bmRlZmluZWQgY2FsbGJhY2sgcHJvcGVydHktbmFtZSBzdGlsbCBleGlzdHMgb24gdGhlIHdpbmRvdyBvYmplY3QgKGZvciBJRTw5KVxuICAgICAgdHJ5IHtcbiAgICAgICAgZGVsZXRlIHdpbmRvd1tjYWxsYmFja19uYW1lXTsgIC8vIGZvciBhbGwgYnJvd3NlciB0aGF0IHN1cHBvcnQgdGhpc1xuICAgICAgfSBjYXRjaChleCkge31cbiAgICAgIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG4gICAgICBzY3JpcHQgPSBudWxsO1xuICAgICAgZGVsZXRlIGltYWdlT2JqLnNjcmlwdDtcbiAgICAgIGRlbGV0ZSBpbWFnZU9iai5jYWxsYmFja25hbWU7XG4gICAgfTtcblxuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwidGV4dC9qYXZhc2NyaXB0XCIpO1xuICAgIHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc2NyaXB0VXJsKTtcbiAgICBpbWFnZU9iai5zY3JpcHQgPSBzY3JpcHQ7XG4gICAgd2luZG93LmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFBzZXVkb0VsZW1lbnQoZWxlbWVudCwgdHlwZSkge1xuICAgIHZhciBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsIHR5cGUpLFxuICAgIGNvbnRlbnQgPSBzdHlsZS5jb250ZW50O1xuICAgIGlmIChjb250ZW50LnN1YnN0cigwLCAzKSA9PT0gJ3VybCcpIHtcbiAgICAgIG1ldGhvZHMubG9hZEltYWdlKF9odG1sMmNhbnZhcy5VdGlsLnBhcnNlQmFja2dyb3VuZEltYWdlKGNvbnRlbnQpWzBdLmFyZ3NbMF0pO1xuICAgIH1cbiAgICBsb2FkQmFja2dyb3VuZEltYWdlcyhzdHlsZS5iYWNrZ3JvdW5kSW1hZ2UsIGVsZW1lbnQpO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZFBzZXVkb0VsZW1lbnRJbWFnZXMoZWxlbWVudCkge1xuICAgIGxvYWRQc2V1ZG9FbGVtZW50KGVsZW1lbnQsIFwiOmJlZm9yZVwiKTtcbiAgICBsb2FkUHNldWRvRWxlbWVudChlbGVtZW50LCBcIjphZnRlclwiKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRHcmFkaWVudEltYWdlKGJhY2tncm91bmRJbWFnZSwgYm91bmRzKSB7XG4gICAgdmFyIGltZyA9IF9odG1sMmNhbnZhcy5HZW5lcmF0ZS5HcmFkaWVudChiYWNrZ3JvdW5kSW1hZ2UsIGJvdW5kcyk7XG5cbiAgICBpZiAoaW1nICE9PSB1bmRlZmluZWQpe1xuICAgICAgaW1hZ2VzW2JhY2tncm91bmRJbWFnZV0gPSB7XG4gICAgICAgIGltZzogaW1nLFxuICAgICAgICBzdWNjZWVkZWQ6IHRydWVcbiAgICAgIH07XG4gICAgICBpbWFnZXMubnVtVG90YWwrKztcbiAgICAgIGltYWdlcy5udW1Mb2FkZWQrKztcbiAgICAgIHN0YXJ0KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaW52YWxpZEJhY2tncm91bmRzKGJhY2tncm91bmRfaW1hZ2UpIHtcbiAgICByZXR1cm4gKGJhY2tncm91bmRfaW1hZ2UgJiYgYmFja2dyb3VuZF9pbWFnZS5tZXRob2QgJiYgYmFja2dyb3VuZF9pbWFnZS5hcmdzICYmIGJhY2tncm91bmRfaW1hZ2UuYXJncy5sZW5ndGggPiAwICk7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkQmFja2dyb3VuZEltYWdlcyhiYWNrZ3JvdW5kX2ltYWdlLCBlbCkge1xuICAgIHZhciBib3VuZHM7XG5cbiAgICBfaHRtbDJjYW52YXMuVXRpbC5wYXJzZUJhY2tncm91bmRJbWFnZShiYWNrZ3JvdW5kX2ltYWdlKS5maWx0ZXIoaW52YWxpZEJhY2tncm91bmRzKS5mb3JFYWNoKGZ1bmN0aW9uKGJhY2tncm91bmRfaW1hZ2UpIHtcbiAgICAgIGlmIChiYWNrZ3JvdW5kX2ltYWdlLm1ldGhvZCA9PT0gJ3VybCcpIHtcbiAgICAgICAgbWV0aG9kcy5sb2FkSW1hZ2UoYmFja2dyb3VuZF9pbWFnZS5hcmdzWzBdKTtcbiAgICAgIH0gZWxzZSBpZihiYWNrZ3JvdW5kX2ltYWdlLm1ldGhvZC5tYXRjaCgvXFwtP2dyYWRpZW50JC8pKSB7XG4gICAgICAgIGlmKGJvdW5kcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgYm91bmRzID0gX2h0bWwyY2FudmFzLlV0aWwuQm91bmRzKGVsKTtcbiAgICAgICAgfVxuICAgICAgICBsb2FkR3JhZGllbnRJbWFnZShiYWNrZ3JvdW5kX2ltYWdlLnZhbHVlLCBib3VuZHMpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SW1hZ2VzIChlbCkge1xuICAgIHZhciBlbE5vZGVUeXBlID0gZmFsc2U7XG5cbiAgICAvLyBGaXJlZm94IGZhaWxzIHdpdGggcGVybWlzc2lvbiBkZW5pZWQgb24gcGFnZXMgd2l0aCBpZnJhbWVzXG4gICAgdHJ5IHtcbiAgICAgIFV0aWwuQ2hpbGRyZW4oZWwpLmZvckVhY2goZ2V0SW1hZ2VzKTtcbiAgICB9XG4gICAgY2F0Y2goIGUgKSB7fVxuXG4gICAgdHJ5IHtcbiAgICAgIGVsTm9kZVR5cGUgPSBlbC5ub2RlVHlwZTtcbiAgICB9IGNhdGNoIChleCkge1xuICAgICAgZWxOb2RlVHlwZSA9IGZhbHNlO1xuICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogZmFpbGVkIHRvIGFjY2VzcyBzb21lIGVsZW1lbnQncyBub2RlVHlwZSAtIEV4Y2VwdGlvbjogXCIgKyBleC5tZXNzYWdlKTtcbiAgICB9XG5cbiAgICBpZiAoZWxOb2RlVHlwZSA9PT0gMSB8fCBlbE5vZGVUeXBlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxvYWRQc2V1ZG9FbGVtZW50SW1hZ2VzKGVsKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGxvYWRCYWNrZ3JvdW5kSW1hZ2VzKFV0aWwuZ2V0Q1NTKGVsLCAnYmFja2dyb3VuZEltYWdlJyksIGVsKTtcbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBmYWlsZWQgdG8gZ2V0IGJhY2tncm91bmQtaW1hZ2UgLSBFeGNlcHRpb246IFwiICsgZS5tZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIGxvYWRCYWNrZ3JvdW5kSW1hZ2VzKGVsKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRJbWFnZUxvYWRIYW5kbGVycyhpbWcsIGltYWdlT2JqKSB7XG4gICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCBpbWFnZU9iai50aW1lciAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAvLyBDT1JTIHN1Y2NlZWRlZFxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCBpbWFnZU9iai50aW1lciApO1xuICAgICAgfVxuXG4gICAgICBpbWFnZXMubnVtTG9hZGVkKys7XG4gICAgICBpbWFnZU9iai5zdWNjZWVkZWQgPSB0cnVlO1xuICAgICAgaW1nLm9uZXJyb3IgPSBpbWcub25sb2FkID0gbnVsbDtcbiAgICAgIHN0YXJ0KCk7XG4gICAgfTtcbiAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGltZy5jcm9zc09yaWdpbiA9PT0gXCJhbm9ueW1vdXNcIikge1xuICAgICAgICAvLyBDT1JTIGZhaWxlZFxuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KCBpbWFnZU9iai50aW1lciApO1xuXG4gICAgICAgIC8vIGxldCdzIHRyeSB3aXRoIHByb3h5IGluc3RlYWRcbiAgICAgICAgaWYgKCBvcHRpb25zLnByb3h5ICkge1xuICAgICAgICAgIHZhciBzcmMgPSBpbWcuc3JjO1xuICAgICAgICAgIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgIGltYWdlT2JqLmltZyA9IGltZztcbiAgICAgICAgICBpbWcuc3JjID0gc3JjO1xuXG4gICAgICAgICAgcHJveHlHZXRJbWFnZSggaW1nLnNyYywgaW1nLCBpbWFnZU9iaiApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpbWFnZXMubnVtTG9hZGVkKys7XG4gICAgICBpbWFnZXMubnVtRmFpbGVkKys7XG4gICAgICBpbWFnZU9iai5zdWNjZWVkZWQgPSBmYWxzZTtcbiAgICAgIGltZy5vbmVycm9yID0gaW1nLm9ubG9hZCA9IG51bGw7XG4gICAgICBzdGFydCgpO1xuICAgIH07XG4gIH1cblxuICBtZXRob2RzID0ge1xuICAgIGxvYWRJbWFnZTogZnVuY3Rpb24oIHNyYyApIHtcbiAgICAgIHZhciBpbWcsIGltYWdlT2JqO1xuICAgICAgaWYgKCBzcmMgJiYgaW1hZ2VzW3NyY10gPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgIGlmICggc3JjLm1hdGNoKC9kYXRhOmltYWdlXFwvLio7YmFzZTY0LC9pKSApIHtcbiAgICAgICAgICBpbWcuc3JjID0gc3JjLnJlcGxhY2UoL3VybFxcKFsnXCJdezAsfXxbJ1wiXXswLH1cXCkkL2lnLCAnJyk7XG4gICAgICAgICAgaW1hZ2VPYmogPSBpbWFnZXNbc3JjXSA9IHtcbiAgICAgICAgICAgIGltZzogaW1nXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbWFnZXMubnVtVG90YWwrKztcbiAgICAgICAgICBzZXRJbWFnZUxvYWRIYW5kbGVycyhpbWcsIGltYWdlT2JqKTtcbiAgICAgICAgfSBlbHNlIGlmICggaXNTYW1lT3JpZ2luKCBzcmMgKSB8fCBvcHRpb25zLmFsbG93VGFpbnQgPT09ICB0cnVlICkge1xuICAgICAgICAgIGltYWdlT2JqID0gaW1hZ2VzW3NyY10gPSB7XG4gICAgICAgICAgICBpbWc6IGltZ1xuICAgICAgICAgIH07XG4gICAgICAgICAgaW1hZ2VzLm51bVRvdGFsKys7XG4gICAgICAgICAgc2V0SW1hZ2VMb2FkSGFuZGxlcnMoaW1nLCBpbWFnZU9iaik7XG4gICAgICAgICAgaW1nLnNyYyA9IHNyYztcbiAgICAgICAgfSBlbHNlIGlmICggc3VwcG9ydENPUlMgJiYgIW9wdGlvbnMuYWxsb3dUYWludCAmJiBvcHRpb25zLnVzZUNPUlMgKSB7XG4gICAgICAgICAgLy8gYXR0ZW1wdCB0byBsb2FkIHdpdGggQ09SU1xuXG4gICAgICAgICAgaW1nLmNyb3NzT3JpZ2luID0gXCJhbm9ueW1vdXNcIjtcbiAgICAgICAgICBpbWFnZU9iaiA9IGltYWdlc1tzcmNdID0ge1xuICAgICAgICAgICAgaW1nOiBpbWdcbiAgICAgICAgICB9O1xuICAgICAgICAgIGltYWdlcy5udW1Ub3RhbCsrO1xuICAgICAgICAgIHNldEltYWdlTG9hZEhhbmRsZXJzKGltZywgaW1hZ2VPYmopO1xuICAgICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdGlvbnMucHJveHkgKSB7XG4gICAgICAgICAgaW1hZ2VPYmogPSBpbWFnZXNbc3JjXSA9IHtcbiAgICAgICAgICAgIGltZzogaW1nXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbWFnZXMubnVtVG90YWwrKztcbiAgICAgICAgICBwcm94eUdldEltYWdlKCBzcmMsIGltZywgaW1hZ2VPYmogKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSxcbiAgICBjbGVhbnVwRE9NOiBmdW5jdGlvbihjYXVzZSkge1xuICAgICAgdmFyIGltZywgc3JjO1xuICAgICAgaWYgKCFpbWFnZXMuY2xlYW51cERvbmUpIHtcbiAgICAgICAgaWYgKGNhdXNlICYmIHR5cGVvZiBjYXVzZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IENsZWFudXAgYmVjYXVzZTogXCIgKyBjYXVzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogQ2xlYW51cCBhZnRlciB0aW1lb3V0OiBcIiArIG9wdGlvbnMudGltZW91dCArIFwiIG1zLlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoc3JjIGluIGltYWdlcykge1xuICAgICAgICAgIGlmIChpbWFnZXMuaGFzT3duUHJvcGVydHkoc3JjKSkge1xuICAgICAgICAgICAgaW1nID0gaW1hZ2VzW3NyY107XG4gICAgICAgICAgICBpZiAodHlwZW9mIGltZyA9PT0gXCJvYmplY3RcIiAmJiBpbWcuY2FsbGJhY2tuYW1lICYmIGltZy5zdWNjZWVkZWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAvLyBjYW5jZWwgcHJveHkgaW1hZ2UgcmVxdWVzdFxuICAgICAgICAgICAgICB3aW5kb3dbaW1nLmNhbGxiYWNrbmFtZV0gPSB1bmRlZmluZWQ7IC8vIHRvIHdvcmsgd2l0aCBJRTw5ICAvLyBOT1RFOiB0aGF0IHRoZSB1bmRlZmluZWQgY2FsbGJhY2sgcHJvcGVydHktbmFtZSBzdGlsbCBleGlzdHMgb24gdGhlIHdpbmRvdyBvYmplY3QgKGZvciBJRTw5KVxuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB3aW5kb3dbaW1nLmNhbGxiYWNrbmFtZV07ICAvLyBmb3IgYWxsIGJyb3dzZXIgdGhhdCBzdXBwb3J0IHRoaXNcbiAgICAgICAgICAgICAgfSBjYXRjaChleCkge31cbiAgICAgICAgICAgICAgaWYgKGltZy5zY3JpcHQgJiYgaW1nLnNjcmlwdC5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgaW1nLnNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgXCJhYm91dDpibGFua1wiKTsgIC8vIHRyeSB0byBjYW5jZWwgcnVubmluZyByZXF1ZXN0XG4gICAgICAgICAgICAgICAgaW1nLnNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGltZy5zY3JpcHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGltYWdlcy5udW1Mb2FkZWQrKztcbiAgICAgICAgICAgICAgaW1hZ2VzLm51bUZhaWxlZCsrO1xuICAgICAgICAgICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBDbGVhbmVkIHVwIGZhaWxlZCBpbWc6ICdcIiArIHNyYyArIFwiJyBTdGVwczogXCIgKyBpbWFnZXMubnVtTG9hZGVkICsgXCIgLyBcIiArIGltYWdlcy5udW1Ub3RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FuY2VsIGFueSBwZW5kaW5nIHJlcXVlc3RzXG4gICAgICAgIGlmKHdpbmRvdy5zdG9wICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICB3aW5kb3cuc3RvcCgpO1xuICAgICAgICB9IGVsc2UgaWYoZG9jdW1lbnQuZXhlY0NvbW1hbmQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGRvY3VtZW50LmV4ZWNDb21tYW5kKFwiU3RvcFwiLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvY3VtZW50LmNsb3NlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkb2N1bWVudC5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgICAgIGltYWdlcy5jbGVhbnVwRG9uZSA9IHRydWU7XG4gICAgICAgIGlmICghKGNhdXNlICYmIHR5cGVvZiBjYXVzZSA9PT0gXCJzdHJpbmdcIikpIHtcbiAgICAgICAgICBzdGFydCgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHJlbmRlcmluZ0RvbmU6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRpbWVvdXRUaW1lcikge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHRpbWVvdXRUaW1lcik7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGlmIChvcHRpb25zLnRpbWVvdXQgPiAwKSB7XG4gICAgdGltZW91dFRpbWVyID0gd2luZG93LnNldFRpbWVvdXQobWV0aG9kcy5jbGVhbnVwRE9NLCBvcHRpb25zLnRpbWVvdXQpO1xuICB9XG5cbiAgVXRpbC5sb2coJ2h0bWwyY2FudmFzOiBQcmVsb2FkIHN0YXJ0czogZmluZGluZyBiYWNrZ3JvdW5kLWltYWdlcycpO1xuICBpbWFnZXMuZmlyc3RSdW4gPSB0cnVlO1xuXG4gIGdldEltYWdlcyhlbGVtZW50KTtcblxuICBVdGlsLmxvZygnaHRtbDJjYW52YXM6IFByZWxvYWQ6IEZpbmRpbmcgaW1hZ2VzJyk7XG4gIC8vIGxvYWQgPGltZz4gaW1hZ2VzXG4gIGZvciAoaSA9IDA7IGkgPCBpbWdMZW47IGkrPTEpe1xuICAgIG1ldGhvZHMubG9hZEltYWdlKCBkb21JbWFnZXNbaV0uZ2V0QXR0cmlidXRlKCBcInNyY1wiICkgKTtcbiAgfVxuXG4gIGltYWdlcy5maXJzdFJ1biA9IGZhbHNlO1xuICBVdGlsLmxvZygnaHRtbDJjYW52YXM6IFByZWxvYWQ6IERvbmUuJyk7XG4gIGlmIChpbWFnZXMubnVtVG90YWwgPT09IGltYWdlcy5udW1Mb2FkZWQpIHtcbiAgICBzdGFydCgpO1xuICB9XG5cbiAgcmV0dXJuIG1ldGhvZHM7XG59O1xuXG5faHRtbDJjYW52YXMuUmVuZGVyZXIgPSBmdW5jdGlvbihwYXJzZVF1ZXVlLCBvcHRpb25zKXtcblxuICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9DU1MyMS96aW5kZXguaHRtbFxuICBmdW5jdGlvbiBjcmVhdGVSZW5kZXJRdWV1ZShwYXJzZVF1ZXVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW10sXG4gICAgcm9vdENvbnRleHQ7XG5cbiAgICByb290Q29udGV4dCA9IChmdW5jdGlvbiBidWlsZFN0YWNraW5nQ29udGV4dChyb290Tm9kZSkge1xuICAgICAgdmFyIHJvb3RDb250ZXh0ID0ge307XG4gICAgICBmdW5jdGlvbiBpbnNlcnQoY29udGV4dCwgbm9kZSwgc3BlY2lhbFBhcmVudCkge1xuICAgICAgICB2YXIgemkgPSAobm9kZS56SW5kZXguemluZGV4ID09PSAnYXV0bycpID8gMCA6IE51bWJlcihub2RlLnpJbmRleC56aW5kZXgpLFxuICAgICAgICBjb250ZXh0Rm9yQ2hpbGRyZW4gPSBjb250ZXh0LCAvLyB0aGUgc3RhY2tpbmcgY29udGV4dCBmb3IgY2hpbGRyZW5cbiAgICAgICAgaXNQb3NpdGlvbmVkID0gbm9kZS56SW5kZXguaXNQb3NpdGlvbmVkLFxuICAgICAgICBpc0Zsb2F0ZWQgPSBub2RlLnpJbmRleC5pc0Zsb2F0ZWQsXG4gICAgICAgIHN0dWIgPSB7bm9kZTogbm9kZX0sXG4gICAgICAgIGNoaWxkcmVuRGVzdCA9IHNwZWNpYWxQYXJlbnQ7IC8vIHdoZXJlIGNoaWxkcmVuIHdpdGhvdXQgei1pbmRleCBzaG91bGQgYmUgcHVzaGVkIGludG9cblxuICAgICAgICBpZiAobm9kZS56SW5kZXgub3duU3RhY2tpbmcpIHtcbiAgICAgICAgICAvLyAnIScgY29tZXMgYmVmb3JlIG51bWJlcnMgaW4gc29ydGVkIGFycmF5XG4gICAgICAgICAgY29udGV4dEZvckNoaWxkcmVuID0gc3R1Yi5jb250ZXh0ID0geyAnISc6IFt7bm9kZTpub2RlLCBjaGlsZHJlbjogW119XX07XG4gICAgICAgICAgY2hpbGRyZW5EZXN0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2UgaWYgKGlzUG9zaXRpb25lZCB8fCBpc0Zsb2F0ZWQpIHtcbiAgICAgICAgICBjaGlsZHJlbkRlc3QgPSBzdHViLmNoaWxkcmVuID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoemkgPT09IDAgJiYgc3BlY2lhbFBhcmVudCkge1xuICAgICAgICAgIHNwZWNpYWxQYXJlbnQucHVzaChzdHViKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWNvbnRleHRbemldKSB7IGNvbnRleHRbemldID0gW107IH1cbiAgICAgICAgICBjb250ZXh0W3ppXS5wdXNoKHN0dWIpO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS56SW5kZXguY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihjaGlsZE5vZGUpIHtcbiAgICAgICAgICBpbnNlcnQoY29udGV4dEZvckNoaWxkcmVuLCBjaGlsZE5vZGUsIGNoaWxkcmVuRGVzdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaW5zZXJ0KHJvb3RDb250ZXh0LCByb290Tm9kZSk7XG4gICAgICByZXR1cm4gcm9vdENvbnRleHQ7XG4gICAgfSkocGFyc2VRdWV1ZSk7XG5cbiAgICBmdW5jdGlvbiBzb3J0Wihjb250ZXh0KSB7XG4gICAgICBPYmplY3Qua2V5cyhjb250ZXh0KS5zb3J0KCkuZm9yRWFjaChmdW5jdGlvbih6aSkge1xuICAgICAgICB2YXIgbm9uUG9zaXRpb25lZCA9IFtdLFxuICAgICAgICBmbG9hdGVkID0gW10sXG4gICAgICAgIHBvc2l0aW9uZWQgPSBbXSxcbiAgICAgICAgbGlzdCA9IFtdO1xuXG4gICAgICAgIC8vIHBvc2l0aW9uZWQgYWZ0ZXIgc3RhdGljXG4gICAgICAgIGNvbnRleHRbemldLmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgIGlmICh2Lm5vZGUuekluZGV4LmlzUG9zaXRpb25lZCB8fCB2Lm5vZGUuekluZGV4Lm9wYWNpdHkgPCAxKSB7XG4gICAgICAgICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLWNvbG9yLyN0cmFuc3BhcmVuY3lcbiAgICAgICAgICAgIC8vIG5vbi1wb3NpdGlvbmVkIGVsZW1lbnQgd2l0aCBvcGFjdGl5IDwgMSBzaG91bGQgYmUgc3RhY2tlZCBhcyBpZiBpdCB3ZXJlIGEgcG9zaXRpb25lZCBlbGVtZW50IHdpdGgg4oCYei1pbmRleDogMOKAmSBhbmQg4oCYb3BhY2l0eTogMeKAmS5cbiAgICAgICAgICAgIHBvc2l0aW9uZWQucHVzaCh2KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHYubm9kZS56SW5kZXguaXNGbG9hdGVkKSB7XG4gICAgICAgICAgICBmbG9hdGVkLnB1c2godik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vblBvc2l0aW9uZWQucHVzaCh2KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIChmdW5jdGlvbiB3YWxrKGFycikge1xuICAgICAgICAgIGFyci5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgIGxpc3QucHVzaCh2KTtcbiAgICAgICAgICAgIGlmICh2LmNoaWxkcmVuKSB7IHdhbGsodi5jaGlsZHJlbik7IH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSkobm9uUG9zaXRpb25lZC5jb25jYXQoZmxvYXRlZCwgcG9zaXRpb25lZCkpO1xuXG4gICAgICAgIGxpc3QuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgaWYgKHYuY29udGV4dCkge1xuICAgICAgICAgICAgc29ydFoodi5jb250ZXh0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcXVldWUucHVzaCh2Lm5vZGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBzb3J0Wihyb290Q29udGV4dCk7XG5cbiAgICByZXR1cm4gcXVldWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRSZW5kZXJlcihyZW5kZXJlck5hbWUpIHtcbiAgICB2YXIgcmVuZGVyZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMucmVuZGVyZXIgPT09IFwic3RyaW5nXCIgJiYgX2h0bWwyY2FudmFzLlJlbmRlcmVyW3JlbmRlcmVyTmFtZV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVuZGVyZXIgPSBfaHRtbDJjYW52YXMuUmVuZGVyZXJbcmVuZGVyZXJOYW1lXShvcHRpb25zKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiByZW5kZXJlck5hbWUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgcmVuZGVyZXIgPSByZW5kZXJlck5hbWUob3B0aW9ucyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIlVua25vd24gcmVuZGVyZXJcIik7XG4gICAgfVxuXG4gICAgaWYgKCB0eXBlb2YgcmVuZGVyZXIgIT09IFwiZnVuY3Rpb25cIiApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmVuZGVyZXIgZGVmaW5lZFwiKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlbmRlcmVyO1xuICB9XG5cbiAgcmV0dXJuIGdldFJlbmRlcmVyKG9wdGlvbnMucmVuZGVyZXIpKHBhcnNlUXVldWUsIG9wdGlvbnMsIGRvY3VtZW50LCBjcmVhdGVSZW5kZXJRdWV1ZShwYXJzZVF1ZXVlLnN0YWNrKSwgX2h0bWwyY2FudmFzKTtcbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLlN1cHBvcnQgPSBmdW5jdGlvbiAob3B0aW9ucywgZG9jKSB7XG5cbiAgZnVuY3Rpb24gc3VwcG9ydFNWR1JlbmRlcmluZygpIHtcbiAgICB2YXIgaW1nID0gbmV3IEltYWdlKCksXG4gICAgY2FudmFzID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksXG4gICAgY3R4ID0gKGNhbnZhcy5nZXRDb250ZXh0ID09PSB1bmRlZmluZWQpID8gZmFsc2UgOiBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgIGlmIChjdHggPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5oZWlnaHQgPSAxMDtcbiAgICBpbWcuc3JjID0gW1xuICAgIFwiZGF0YTppbWFnZS9zdmcreG1sLFwiLFxuICAgIFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+XCIsXG4gICAgXCI8Zm9yZWlnbk9iamVjdCB3aWR0aD0nMTAnIGhlaWdodD0nMTAnPlwiLFxuICAgIFwiPGRpdiB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCcgc3R5bGU9J3dpZHRoOjEwO2hlaWdodDoxMDsnPlwiLFxuICAgIFwic3VwXCIsXG4gICAgXCI8L2Rpdj5cIixcbiAgICBcIjwvZm9yZWlnbk9iamVjdD5cIixcbiAgICBcIjwvc3ZnPlwiXG4gICAgXS5qb2luKFwiXCIpO1xuICAgIHRyeSB7XG4gICAgICBjdHguZHJhd0ltYWdlKGltZywgMCwgMCk7XG4gICAgICBjYW52YXMudG9EYXRhVVJMKCk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIF9odG1sMmNhbnZhcy5VdGlsLmxvZygnaHRtbDJjYW52YXM6IFBhcnNlOiBTVkcgcG93ZXJlZCByZW5kZXJpbmcgYXZhaWxhYmxlJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBUZXN0IHdoZXRoZXIgd2UgY2FuIHVzZSByYW5nZXMgdG8gbWVhc3VyZSBib3VuZGluZyBib3hlc1xuICAvLyBPcGVyYSBkb2Vzbid0IHByb3ZpZGUgdmFsaWQgYm91bmRzLmhlaWdodC9ib3R0b20gZXZlbiB0aG91Z2ggaXQgc3VwcG9ydHMgdGhlIG1ldGhvZC5cblxuICBmdW5jdGlvbiBzdXBwb3J0UmFuZ2VCb3VuZHMoKSB7XG4gICAgdmFyIHIsIHRlc3RFbGVtZW50LCByYW5nZUJvdW5kcywgcmFuZ2VIZWlnaHQsIHN1cHBvcnQgPSBmYWxzZTtcblxuICAgIGlmIChkb2MuY3JlYXRlUmFuZ2UpIHtcbiAgICAgIHIgPSBkb2MuY3JlYXRlUmFuZ2UoKTtcbiAgICAgIGlmIChyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCkge1xuICAgICAgICB0ZXN0RWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCdib3VuZHRlc3QnKTtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuaGVpZ2h0ID0gXCIxMjNweFwiO1xuICAgICAgICB0ZXN0RWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBkb2MuYm9keS5hcHBlbmRDaGlsZCh0ZXN0RWxlbWVudCk7XG5cbiAgICAgICAgci5zZWxlY3ROb2RlKHRlc3RFbGVtZW50KTtcbiAgICAgICAgcmFuZ2VCb3VuZHMgPSByLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICByYW5nZUhlaWdodCA9IHJhbmdlQm91bmRzLmhlaWdodDtcblxuICAgICAgICBpZiAocmFuZ2VIZWlnaHQgPT09IDEyMykge1xuICAgICAgICAgIHN1cHBvcnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGRvYy5ib2R5LnJlbW92ZUNoaWxkKHRlc3RFbGVtZW50KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3VwcG9ydDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcmFuZ2VCb3VuZHM6IHN1cHBvcnRSYW5nZUJvdW5kcygpLFxuICAgIHN2Z1JlbmRlcmluZzogb3B0aW9ucy5zdmdSZW5kZXJpbmcgJiYgc3VwcG9ydFNWR1JlbmRlcmluZygpXG4gIH07XG59O1xuXG53aW5kb3cuaHRtbDJjYW52YXM9ZnVuY3Rpb24oZWxlbWVudHMsIG9wdHMpIHtcbiAgZWxlbWVudHMgPSAoZWxlbWVudHMubGVuZ3RoKSA/IGVsZW1lbnRzIDogW2VsZW1lbnRzXTtcbiAgdmFyIHF1ZXVlLFxuICBjYW52YXMsXG4gIG9wdGlvbnMgPSB7XG4gICAgLy8gZ2VuZXJhbFxuICAgIGxvZ2dpbmc6IGZhbHNlLFxuICAgIGVsZW1lbnRzOiBlbGVtZW50cyxcbiAgICBiYWNrZ3JvdW5kOiBcIiNmZmZcIixcblxuICAgIC8vIHByZWxvYWQgb3B0aW9uc1xuICAgIHByb3h5OiBudWxsLFxuICAgIHRpbWVvdXQ6IDAsICAgIC8vIG5vIHRpbWVvdXRcbiAgICB1c2VDT1JTOiBmYWxzZSwgLy8gdHJ5IHRvIGxvYWQgaW1hZ2VzIGFzIENPUlMgKHdoZXJlIGF2YWlsYWJsZSksIGJlZm9yZSBmYWxsaW5nIGJhY2sgdG8gcHJveHlcbiAgICBhbGxvd1RhaW50OiBmYWxzZSwgLy8gd2hldGhlciB0byBhbGxvdyBpbWFnZXMgdG8gdGFpbnQgdGhlIGNhbnZhcywgd29uJ3QgbmVlZCBwcm94eSBpZiBzZXQgdG8gdHJ1ZVxuXG4gICAgLy8gcGFyc2Ugb3B0aW9uc1xuICAgIHN2Z1JlbmRlcmluZzogZmFsc2UsIC8vIHVzZSBzdmcgcG93ZXJlZCByZW5kZXJpbmcgd2hlcmUgYXZhaWxhYmxlIChGRjExKylcbiAgICBpZ25vcmVFbGVtZW50czogXCJJRlJBTUV8T0JKRUNUfFBBUkFNXCIsXG4gICAgdXNlT3ZlcmZsb3c6IHRydWUsXG4gICAgbGV0dGVyUmVuZGVyaW5nOiBmYWxzZSxcbiAgICBjaGluZXNlOiBmYWxzZSxcblxuICAgIC8vIHJlbmRlciBvcHRpb25zXG5cbiAgICB3aWR0aDogbnVsbCxcbiAgICBoZWlnaHQ6IG51bGwsXG4gICAgdGFpbnRUZXN0OiB0cnVlLCAvLyBkbyBhIHRhaW50IHRlc3Qgd2l0aCBhbGwgaW1hZ2VzIGJlZm9yZSBhcHBseWluZyB0byBjYW52YXNcbiAgICByZW5kZXJlcjogXCJDYW52YXNcIlxuICB9O1xuXG4gIG9wdGlvbnMgPSBfaHRtbDJjYW52YXMuVXRpbC5FeHRlbmQob3B0cywgb3B0aW9ucyk7XG5cbiAgX2h0bWwyY2FudmFzLmxvZ2dpbmcgPSBvcHRpb25zLmxvZ2dpbmc7XG4gIG9wdGlvbnMuY29tcGxldGUgPSBmdW5jdGlvbiggaW1hZ2VzICkge1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm9ucHJlbG9hZGVkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIGlmICggb3B0aW9ucy5vbnByZWxvYWRlZCggaW1hZ2VzICkgPT09IGZhbHNlICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICAgIHF1ZXVlID0gX2h0bWwyY2FudmFzLlBhcnNlKCBpbWFnZXMsIG9wdGlvbnMgKTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vbnBhcnNlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAoIG9wdGlvbnMub25wYXJzZWQoIHF1ZXVlICkgPT09IGZhbHNlICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgY2FudmFzID0gX2h0bWwyY2FudmFzLlJlbmRlcmVyKCBxdWV1ZSwgb3B0aW9ucyApO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLm9ucmVuZGVyZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgb3B0aW9ucy5vbnJlbmRlcmVkKCBjYW52YXMgKTtcbiAgICB9XG5cblxuICB9O1xuXG4gIC8vIGZvciBwYWdlcyB3aXRob3V0IGltYWdlcywgd2Ugc3RpbGwgd2FudCB0aGlzIHRvIGJlIGFzeW5jLCBpLmUuIHJldHVybiBtZXRob2RzIGJlZm9yZSBleGVjdXRpbmdcbiAgd2luZG93LnNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgX2h0bWwyY2FudmFzLlByZWxvYWQoIG9wdGlvbnMgKTtcbiAgfSwgMCApO1xuXG4gIHJldHVybiB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbiggcXVldWUsIG9wdHMgKSB7XG4gICAgICByZXR1cm4gX2h0bWwyY2FudmFzLlJlbmRlcmVyKCBxdWV1ZSwgX2h0bWwyY2FudmFzLlV0aWwuRXh0ZW5kKG9wdHMsIG9wdGlvbnMpICk7XG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24oIGltYWdlcywgb3B0cyApIHtcbiAgICAgIHJldHVybiBfaHRtbDJjYW52YXMuUGFyc2UoIGltYWdlcywgX2h0bWwyY2FudmFzLlV0aWwuRXh0ZW5kKG9wdHMsIG9wdGlvbnMpICk7XG4gICAgfSxcbiAgICBwcmVsb2FkOiBmdW5jdGlvbiggb3B0cyApIHtcbiAgICAgIHJldHVybiBfaHRtbDJjYW52YXMuUHJlbG9hZCggX2h0bWwyY2FudmFzLlV0aWwuRXh0ZW5kKG9wdHMsIG9wdGlvbnMpICk7XG4gICAgfSxcbiAgICBsb2c6IF9odG1sMmNhbnZhcy5VdGlsLmxvZ1xuICB9O1xufTtcblxud2luZG93Lmh0bWwyY2FudmFzLmxvZyA9IF9odG1sMmNhbnZhcy5VdGlsLmxvZzsgLy8gZm9yIHJlbmRlcmVyc1xud2luZG93Lmh0bWwyY2FudmFzLlJlbmRlcmVyID0ge1xuICBDYW52YXM6IHVuZGVmaW5lZCAvLyBXZSBhcmUgYXNzdW1pbmcgdGhpcyB3aWxsIGJlIHVzZWRcbn07XG5cbm1vZHVsZS5leHBvcnRzPXdpbmRvdy5odG1sMmNhbnZhcztcblxuX2h0bWwyY2FudmFzLlJlbmRlcmVyLkNhbnZhcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGRvYyA9IGRvY3VtZW50LFxuICBzYWZlSW1hZ2VzID0gW10sXG4gIHRlc3RDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxuICB0ZXN0Y3R4ID0gdGVzdENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXG4gIFV0aWwgPSBfaHRtbDJjYW52YXMuVXRpbCxcbiAgY2FudmFzID0gb3B0aW9ucy5jYW52YXMgfHwgZG9jLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuXG4gIGZ1bmN0aW9uIGNyZWF0ZVNoYXBlKGN0eCwgYXJncykge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBhcmdzLmZvckVhY2goZnVuY3Rpb24oYXJnKSB7XG4gICAgICBjdHhbYXJnLm5hbWVdLmFwcGx5KGN0eCwgYXJnWydhcmd1bWVudHMnXSk7XG4gICAgfSk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gc2FmZUltYWdlKGl0ZW0pIHtcbiAgICBpZiAoc2FmZUltYWdlcy5pbmRleE9mKGl0ZW1bJ2FyZ3VtZW50cyddWzBdLnNyYyApID09PSAtMSkge1xuICAgICAgdGVzdGN0eC5kcmF3SW1hZ2UoaXRlbVsnYXJndW1lbnRzJ11bMF0sIDAsIDApO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGVzdGN0eC5nZXRJbWFnZURhdGEoMCwgMCwgMSwgMSk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgdGVzdENhbnZhcyA9IGRvYy5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICB0ZXN0Y3R4ID0gdGVzdENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHNhZmVJbWFnZXMucHVzaChpdGVtWydhcmd1bWVudHMnXVswXS5zcmMpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckl0ZW0oY3R4LCBpdGVtKSB7XG4gICAgc3dpdGNoKGl0ZW0udHlwZSl7XG4gICAgICBjYXNlIFwidmFyaWFibGVcIjpcbiAgICAgICAgY3R4W2l0ZW0ubmFtZV0gPSBpdGVtWydhcmd1bWVudHMnXTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgICAgc3dpdGNoKGl0ZW0ubmFtZSkge1xuICAgICAgICAgIGNhc2UgXCJjcmVhdGVQYXR0ZXJuXCI6XG4gICAgICAgICAgICBpZiAoaXRlbVsnYXJndW1lbnRzJ11bMF0ud2lkdGggPiAwICYmIGl0ZW1bJ2FyZ3VtZW50cyddWzBdLmhlaWdodCA+IDApIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gY3R4LmNyZWF0ZVBhdHRlcm4oaXRlbVsnYXJndW1lbnRzJ11bMF0sIFwicmVwZWF0XCIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgICAgICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBSZW5kZXJlcjogRXJyb3IgY3JlYXRpbmcgcGF0dGVyblwiLCBlLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiZHJhd1NoYXBlXCI6XG4gICAgICAgICAgICBjcmVhdGVTaGFwZShjdHgsIGl0ZW1bJ2FyZ3VtZW50cyddKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgXCJkcmF3SW1hZ2VcIjpcbiAgICAgICAgICAgIGlmIChpdGVtWydhcmd1bWVudHMnXVs4XSA+IDAgJiYgaXRlbVsnYXJndW1lbnRzJ11bN10gPiAwKSB7XG4gICAgICAgICAgICAgIGlmICghb3B0aW9ucy50YWludFRlc3QgfHwgKG9wdGlvbnMudGFpbnRUZXN0ICYmIHNhZmVJbWFnZShpdGVtKSkpIHtcbiAgICAgICAgICAgICAgICBjdHguZHJhd0ltYWdlLmFwcGx5KCBjdHgsIGl0ZW1bJ2FyZ3VtZW50cyddICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjdHhbaXRlbS5uYW1lXS5hcHBseShjdHgsIGl0ZW1bJ2FyZ3VtZW50cyddKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24ocGFyc2VkRGF0YSwgb3B0aW9ucywgZG9jdW1lbnQsIHF1ZXVlLCBfaHRtbDJjYW52YXMpIHtcbiAgICB2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxcbiAgICBuZXdDYW52YXMsXG4gICAgYm91bmRzLFxuICAgIGZzdHlsZSxcbiAgICB6U3RhY2sgPSBwYXJzZWREYXRhLnN0YWNrO1xuXG4gICAgY2FudmFzLndpZHRoID0gY2FudmFzLnN0eWxlLndpZHRoID0gIG9wdGlvbnMud2lkdGggfHwgelN0YWNrLmN0eC53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gY2FudmFzLnN0eWxlLmhlaWdodCA9IG9wdGlvbnMuaGVpZ2h0IHx8IHpTdGFjay5jdHguaGVpZ2h0O1xuXG4gICAgZnN0eWxlID0gY3R4LmZpbGxTdHlsZTtcbiAgICBjdHguZmlsbFN0eWxlID0gKFV0aWwuaXNUcmFuc3BhcmVudCh6U3RhY2suYmFja2dyb3VuZENvbG9yKSAmJiBvcHRpb25zLmJhY2tncm91bmQgIT09IHVuZGVmaW5lZCkgPyBvcHRpb25zLmJhY2tncm91bmQgOiBwYXJzZWREYXRhLmJhY2tncm91bmRDb2xvcjtcbiAgICBjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjdHguZmlsbFN0eWxlID0gZnN0eWxlO1xuXG4gICAgcXVldWUuZm9yRWFjaChmdW5jdGlvbihzdG9yYWdlQ29udGV4dCkge1xuICAgICAgLy8gc2V0IGNvbW1vbiBzZXR0aW5ncyBmb3IgY2FudmFzXG4gICAgICBjdHgudGV4dEJhc2VsaW5lID0gXCJib3R0b21cIjtcbiAgICAgIGN0eC5zYXZlKCk7XG5cbiAgICAgIGlmIChzdG9yYWdlQ29udGV4dC50cmFuc2Zvcm0ubWF0cml4KSB7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoc3RvcmFnZUNvbnRleHQudHJhbnNmb3JtLm9yaWdpblswXSwgc3RvcmFnZUNvbnRleHQudHJhbnNmb3JtLm9yaWdpblsxXSk7XG4gICAgICAgIGN0eC50cmFuc2Zvcm0uYXBwbHkoY3R4LCBzdG9yYWdlQ29udGV4dC50cmFuc2Zvcm0ubWF0cml4KTtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSgtc3RvcmFnZUNvbnRleHQudHJhbnNmb3JtLm9yaWdpblswXSwgLXN0b3JhZ2VDb250ZXh0LnRyYW5zZm9ybS5vcmlnaW5bMV0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RvcmFnZUNvbnRleHQuY2xpcCl7XG4gICAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgICAgY3R4LnJlY3Qoc3RvcmFnZUNvbnRleHQuY2xpcC5sZWZ0LCBzdG9yYWdlQ29udGV4dC5jbGlwLnRvcCwgc3RvcmFnZUNvbnRleHQuY2xpcC53aWR0aCwgc3RvcmFnZUNvbnRleHQuY2xpcC5oZWlnaHQpO1xuICAgICAgICBjdHguY2xpcCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RvcmFnZUNvbnRleHQuY3R4LnN0b3JhZ2UpIHtcbiAgICAgICAgc3RvcmFnZUNvbnRleHQuY3R4LnN0b3JhZ2UuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgcmVuZGVySXRlbShjdHgsIGl0ZW0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9KTtcblxuICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IFJlbmRlcmVyOiBDYW52YXMgcmVuZGVyZXIgZG9uZSAtIHJldHVybmluZyBjYW52YXMgb2JqXCIpO1xuXG4gICAgaWYgKG9wdGlvbnMuZWxlbWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuZWxlbWVudHNbMF0gPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5lbGVtZW50c1swXS5ub2RlTmFtZSAhPT0gXCJCT0RZXCIpIHtcbiAgICAgICAgLy8gY3JvcCBpbWFnZSB0byB0aGUgYm91bmRzIG9mIHNlbGVjdGVkIChzaW5nbGUpIGVsZW1lbnRcbiAgICAgICAgYm91bmRzID0gX2h0bWwyY2FudmFzLlV0aWwuQm91bmRzKG9wdGlvbnMuZWxlbWVudHNbMF0pO1xuICAgICAgICBuZXdDYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgbmV3Q2FudmFzLndpZHRoID0gTWF0aC5jZWlsKGJvdW5kcy53aWR0aCk7XG4gICAgICAgIG5ld0NhbnZhcy5oZWlnaHQgPSBNYXRoLmNlaWwoYm91bmRzLmhlaWdodCk7XG4gICAgICAgIGN0eCA9IG5ld0NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG5cbiAgICAgICAgY3R4LmRyYXdJbWFnZShjYW52YXMsIGJvdW5kcy5sZWZ0LCBib3VuZHMudG9wLCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQsIDAsIDAsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCk7XG4gICAgICAgIGNhbnZhcyA9IG51bGw7XG4gICAgICAgIHJldHVybiBuZXdDYW52YXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfTtcbn07XG59KSh3aW5kb3csZG9jdW1lbnQpOyIsIi8qISBTb2NrZXQuSU8ubWluLmpzIGJ1aWxkOjAuOS4xNiwgcHJvZHVjdGlvbi4gQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPiBNSVQgTGljZW5zZWQgKi9cbnZhciBpbz1cInVuZGVmaW5lZFwiPT10eXBlb2YgbW9kdWxlP3t9Om1vZHVsZS5leHBvcnRzOyhmdW5jdGlvbigpeyhmdW5jdGlvbihhLGIpe3ZhciBjPWE7Yy52ZXJzaW9uPVwiMC45LjE2XCIsYy5wcm90b2NvbD0xLGMudHJhbnNwb3J0cz1bXSxjLmo9W10sYy5zb2NrZXRzPXt9LGMuY29ubmVjdD1mdW5jdGlvbihhLGQpe3ZhciBlPWMudXRpbC5wYXJzZVVyaShhKSxmLGc7YiYmYi5sb2NhdGlvbiYmKGUucHJvdG9jb2w9ZS5wcm90b2NvbHx8Yi5sb2NhdGlvbi5wcm90b2NvbC5zbGljZSgwLC0xKSxlLmhvc3Q9ZS5ob3N0fHwoYi5kb2N1bWVudD9iLmRvY3VtZW50LmRvbWFpbjpiLmxvY2F0aW9uLmhvc3RuYW1lKSxlLnBvcnQ9ZS5wb3J0fHxiLmxvY2F0aW9uLnBvcnQpLGY9Yy51dGlsLnVuaXF1ZVVyaShlKTt2YXIgaD17aG9zdDplLmhvc3Qsc2VjdXJlOlwiaHR0cHNcIj09ZS5wcm90b2NvbCxwb3J0OmUucG9ydHx8KFwiaHR0cHNcIj09ZS5wcm90b2NvbD80NDM6ODApLHF1ZXJ5OmUucXVlcnl8fFwiXCJ9O2MudXRpbC5tZXJnZShoLGQpO2lmKGhbXCJmb3JjZSBuZXcgY29ubmVjdGlvblwiXXx8IWMuc29ja2V0c1tmXSlnPW5ldyBjLlNvY2tldChoKTtyZXR1cm4haFtcImZvcmNlIG5ldyBjb25uZWN0aW9uXCJdJiZnJiYoYy5zb2NrZXRzW2ZdPWcpLGc9Z3x8Yy5zb2NrZXRzW2ZdLGcub2YoZS5wYXRoLmxlbmd0aD4xP2UucGF0aDpcIlwiKX19KShcIm9iamVjdFwiPT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzOnRoaXMuaW89e30sdGhpcyksZnVuY3Rpb24oYSxiKXt2YXIgYz1hLnV0aWw9e30sZD0vXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS8sZT1bXCJzb3VyY2VcIixcInByb3RvY29sXCIsXCJhdXRob3JpdHlcIixcInVzZXJJbmZvXCIsXCJ1c2VyXCIsXCJwYXNzd29yZFwiLFwiaG9zdFwiLFwicG9ydFwiLFwicmVsYXRpdmVcIixcInBhdGhcIixcImRpcmVjdG9yeVwiLFwiZmlsZVwiLFwicXVlcnlcIixcImFuY2hvclwiXTtjLnBhcnNlVXJpPWZ1bmN0aW9uKGEpe3ZhciBiPWQuZXhlYyhhfHxcIlwiKSxjPXt9LGY9MTQ7d2hpbGUoZi0tKWNbZVtmXV09YltmXXx8XCJcIjtyZXR1cm4gY30sYy51bmlxdWVVcmk9ZnVuY3Rpb24oYSl7dmFyIGM9YS5wcm90b2NvbCxkPWEuaG9zdCxlPWEucG9ydDtyZXR1cm5cImRvY3VtZW50XCJpbiBiPyhkPWR8fGRvY3VtZW50LmRvbWFpbixlPWV8fChjPT1cImh0dHBzXCImJmRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sIT09XCJodHRwczpcIj80NDM6ZG9jdW1lbnQubG9jYXRpb24ucG9ydCkpOihkPWR8fFwibG9jYWxob3N0XCIsIWUmJmM9PVwiaHR0cHNcIiYmKGU9NDQzKSksKGN8fFwiaHR0cFwiKStcIjovL1wiK2QrXCI6XCIrKGV8fDgwKX0sYy5xdWVyeT1mdW5jdGlvbihhLGIpe3ZhciBkPWMuY2h1bmtRdWVyeShhfHxcIlwiKSxlPVtdO2MubWVyZ2UoZCxjLmNodW5rUXVlcnkoYnx8XCJcIikpO2Zvcih2YXIgZiBpbiBkKWQuaGFzT3duUHJvcGVydHkoZikmJmUucHVzaChmK1wiPVwiK2RbZl0pO3JldHVybiBlLmxlbmd0aD9cIj9cIitlLmpvaW4oXCImXCIpOlwiXCJ9LGMuY2h1bmtRdWVyeT1mdW5jdGlvbihhKXt2YXIgYj17fSxjPWEuc3BsaXQoXCImXCIpLGQ9MCxlPWMubGVuZ3RoLGY7Zm9yKDtkPGU7KytkKWY9Y1tkXS5zcGxpdChcIj1cIiksZlswXSYmKGJbZlswXV09ZlsxXSk7cmV0dXJuIGJ9O3ZhciBmPSExO2MubG9hZD1mdW5jdGlvbihhKXtpZihcImRvY3VtZW50XCJpbiBiJiZkb2N1bWVudC5yZWFkeVN0YXRlPT09XCJjb21wbGV0ZVwifHxmKXJldHVybiBhKCk7Yy5vbihiLFwibG9hZFwiLGEsITEpfSxjLm9uPWZ1bmN0aW9uKGEsYixjLGQpe2EuYXR0YWNoRXZlbnQ/YS5hdHRhY2hFdmVudChcIm9uXCIrYixjKTphLmFkZEV2ZW50TGlzdGVuZXImJmEuYWRkRXZlbnRMaXN0ZW5lcihiLGMsZCl9LGMucmVxdWVzdD1mdW5jdGlvbihhKXtpZihhJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgWERvbWFpblJlcXVlc3QmJiFjLnVhLmhhc0NPUlMpcmV0dXJuIG5ldyBYRG9tYWluUmVxdWVzdDtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgWE1MSHR0cFJlcXVlc3QmJighYXx8Yy51YS5oYXNDT1JTKSlyZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0O2lmKCFhKXRyeXtyZXR1cm4gbmV3KHdpbmRvd1tbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpXSkoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKX1jYXRjaChiKXt9cmV0dXJuIG51bGx9LFwidW5kZWZpbmVkXCIhPXR5cGVvZiB3aW5kb3cmJmMubG9hZChmdW5jdGlvbigpe2Y9ITB9KSxjLmRlZmVyPWZ1bmN0aW9uKGEpe2lmKCFjLnVhLndlYmtpdHx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGltcG9ydFNjcmlwdHMpcmV0dXJuIGEoKTtjLmxvYWQoZnVuY3Rpb24oKXtzZXRUaW1lb3V0KGEsMTAwKX0pfSxjLm1lcmdlPWZ1bmN0aW9uKGIsZCxlLGYpe3ZhciBnPWZ8fFtdLGg9dHlwZW9mIGU9PVwidW5kZWZpbmVkXCI/MjplLGk7Zm9yKGkgaW4gZClkLmhhc093blByb3BlcnR5KGkpJiZjLmluZGV4T2YoZyxpKTwwJiYodHlwZW9mIGJbaV0hPVwib2JqZWN0XCJ8fCFoPyhiW2ldPWRbaV0sZy5wdXNoKGRbaV0pKTpjLm1lcmdlKGJbaV0sZFtpXSxoLTEsZykpO3JldHVybiBifSxjLm1peGluPWZ1bmN0aW9uKGEsYil7Yy5tZXJnZShhLnByb3RvdHlwZSxiLnByb3RvdHlwZSl9LGMuaW5oZXJpdD1mdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoKXt9Yy5wcm90b3R5cGU9Yi5wcm90b3R5cGUsYS5wcm90b3R5cGU9bmV3IGN9LGMuaXNBcnJheT1BcnJheS5pc0FycmF5fHxmdW5jdGlvbihhKXtyZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGEpPT09XCJbb2JqZWN0IEFycmF5XVwifSxjLmludGVyc2VjdD1mdW5jdGlvbihhLGIpe3ZhciBkPVtdLGU9YS5sZW5ndGg+Yi5sZW5ndGg/YTpiLGY9YS5sZW5ndGg+Yi5sZW5ndGg/YjphO2Zvcih2YXIgZz0wLGg9Zi5sZW5ndGg7ZzxoO2crKyl+Yy5pbmRleE9mKGUsZltnXSkmJmQucHVzaChmW2ddKTtyZXR1cm4gZH0sYy5pbmRleE9mPWZ1bmN0aW9uKGEsYixjKXtmb3IodmFyIGQ9YS5sZW5ndGgsYz1jPDA/YytkPDA/MDpjK2Q6Y3x8MDtjPGQmJmFbY10hPT1iO2MrKyk7cmV0dXJuIGQ8PWM/LTE6Y30sYy50b0FycmF5PWZ1bmN0aW9uKGEpe3ZhciBiPVtdO2Zvcih2YXIgYz0wLGQ9YS5sZW5ndGg7YzxkO2MrKyliLnB1c2goYVtjXSk7cmV0dXJuIGJ9LGMudWE9e30sYy51YS5oYXNDT1JTPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBYTUxIdHRwUmVxdWVzdCYmZnVuY3Rpb24oKXt0cnl7dmFyIGE9bmV3IFhNTEh0dHBSZXF1ZXN0fWNhdGNoKGIpe3JldHVybiExfXJldHVybiBhLndpdGhDcmVkZW50aWFscyE9dW5kZWZpbmVkfSgpLGMudWEud2Via2l0PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBuYXZpZ2F0b3ImJi93ZWJraXQvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpLGMudWEuaURldmljZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgbmF2aWdhdG9yJiYvaVBhZHxpUGhvbmV8aVBvZC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCl9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUuZXhwb3J0cyx0aGlzKSxmdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoKXt9YS5FdmVudEVtaXR0ZXI9YyxjLnByb3RvdHlwZS5vbj1mdW5jdGlvbihhLGMpe3JldHVybiB0aGlzLiRldmVudHN8fCh0aGlzLiRldmVudHM9e30pLHRoaXMuJGV2ZW50c1thXT9iLnV0aWwuaXNBcnJheSh0aGlzLiRldmVudHNbYV0pP3RoaXMuJGV2ZW50c1thXS5wdXNoKGMpOnRoaXMuJGV2ZW50c1thXT1bdGhpcy4kZXZlbnRzW2FdLGNdOnRoaXMuJGV2ZW50c1thXT1jLHRoaXN9LGMucHJvdG90eXBlLmFkZExpc3RlbmVyPWMucHJvdG90eXBlLm9uLGMucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBkKCl7Yy5yZW1vdmVMaXN0ZW5lcihhLGQpLGIuYXBwbHkodGhpcyxhcmd1bWVudHMpfXZhciBjPXRoaXM7cmV0dXJuIGQubGlzdGVuZXI9Yix0aGlzLm9uKGEsZCksdGhpc30sYy5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24oYSxjKXtpZih0aGlzLiRldmVudHMmJnRoaXMuJGV2ZW50c1thXSl7dmFyIGQ9dGhpcy4kZXZlbnRzW2FdO2lmKGIudXRpbC5pc0FycmF5KGQpKXt2YXIgZT0tMTtmb3IodmFyIGY9MCxnPWQubGVuZ3RoO2Y8ZztmKyspaWYoZFtmXT09PWN8fGRbZl0ubGlzdGVuZXImJmRbZl0ubGlzdGVuZXI9PT1jKXtlPWY7YnJlYWt9aWYoZTwwKXJldHVybiB0aGlzO2Quc3BsaWNlKGUsMSksZC5sZW5ndGh8fGRlbGV0ZSB0aGlzLiRldmVudHNbYV19ZWxzZShkPT09Y3x8ZC5saXN0ZW5lciYmZC5saXN0ZW5lcj09PWMpJiZkZWxldGUgdGhpcy4kZXZlbnRzW2FdfXJldHVybiB0aGlzfSxjLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24oYSl7cmV0dXJuIGE9PT11bmRlZmluZWQ/KHRoaXMuJGV2ZW50cz17fSx0aGlzKToodGhpcy4kZXZlbnRzJiZ0aGlzLiRldmVudHNbYV0mJih0aGlzLiRldmVudHNbYV09bnVsbCksdGhpcyl9LGMucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbihhKXtyZXR1cm4gdGhpcy4kZXZlbnRzfHwodGhpcy4kZXZlbnRzPXt9KSx0aGlzLiRldmVudHNbYV18fCh0aGlzLiRldmVudHNbYV09W10pLGIudXRpbC5pc0FycmF5KHRoaXMuJGV2ZW50c1thXSl8fCh0aGlzLiRldmVudHNbYV09W3RoaXMuJGV2ZW50c1thXV0pLHRoaXMuJGV2ZW50c1thXX0sYy5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbihhKXtpZighdGhpcy4kZXZlbnRzKXJldHVybiExO3ZhciBjPXRoaXMuJGV2ZW50c1thXTtpZighYylyZXR1cm4hMTt2YXIgZD1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgYyljLmFwcGx5KHRoaXMsZCk7ZWxzZXtpZighYi51dGlsLmlzQXJyYXkoYykpcmV0dXJuITE7dmFyIGU9Yy5zbGljZSgpO2Zvcih2YXIgZj0wLGc9ZS5sZW5ndGg7ZjxnO2YrKyllW2ZdLmFwcGx5KHRoaXMsZCl9cmV0dXJuITB9fShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyksZnVuY3Rpb24oZXhwb3J0cyxuYXRpdmVKU09OKXtmdW5jdGlvbiBmKGEpe3JldHVybiBhPDEwP1wiMFwiK2E6YX1mdW5jdGlvbiBkYXRlKGEsYil7cmV0dXJuIGlzRmluaXRlKGEudmFsdWVPZigpKT9hLmdldFVUQ0Z1bGxZZWFyKCkrXCItXCIrZihhLmdldFVUQ01vbnRoKCkrMSkrXCItXCIrZihhLmdldFVUQ0RhdGUoKSkrXCJUXCIrZihhLmdldFVUQ0hvdXJzKCkpK1wiOlwiK2YoYS5nZXRVVENNaW51dGVzKCkpK1wiOlwiK2YoYS5nZXRVVENTZWNvbmRzKCkpK1wiWlwiOm51bGx9ZnVuY3Rpb24gcXVvdGUoYSl7cmV0dXJuIGVzY2FwYWJsZS5sYXN0SW5kZXg9MCxlc2NhcGFibGUudGVzdChhKT8nXCInK2EucmVwbGFjZShlc2NhcGFibGUsZnVuY3Rpb24oYSl7dmFyIGI9bWV0YVthXTtyZXR1cm4gdHlwZW9mIGI9PVwic3RyaW5nXCI/YjpcIlxcXFx1XCIrKFwiMDAwMFwiK2EuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KX0pKydcIic6J1wiJythKydcIid9ZnVuY3Rpb24gc3RyKGEsYil7dmFyIGMsZCxlLGYsZz1nYXAsaCxpPWJbYV07aSBpbnN0YW5jZW9mIERhdGUmJihpPWRhdGUoYSkpLHR5cGVvZiByZXA9PVwiZnVuY3Rpb25cIiYmKGk9cmVwLmNhbGwoYixhLGkpKTtzd2l0Y2godHlwZW9mIGkpe2Nhc2VcInN0cmluZ1wiOnJldHVybiBxdW90ZShpKTtjYXNlXCJudW1iZXJcIjpyZXR1cm4gaXNGaW5pdGUoaSk/U3RyaW5nKGkpOlwibnVsbFwiO2Nhc2VcImJvb2xlYW5cIjpjYXNlXCJudWxsXCI6cmV0dXJuIFN0cmluZyhpKTtjYXNlXCJvYmplY3RcIjppZighaSlyZXR1cm5cIm51bGxcIjtnYXArPWluZGVudCxoPVtdO2lmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkoaSk9PT1cIltvYmplY3QgQXJyYXldXCIpe2Y9aS5sZW5ndGg7Zm9yKGM9MDtjPGY7Yys9MSloW2NdPXN0cihjLGkpfHxcIm51bGxcIjtyZXR1cm4gZT1oLmxlbmd0aD09PTA/XCJbXVwiOmdhcD9cIltcXG5cIitnYXAraC5qb2luKFwiLFxcblwiK2dhcCkrXCJcXG5cIitnK1wiXVwiOlwiW1wiK2guam9pbihcIixcIikrXCJdXCIsZ2FwPWcsZX1pZihyZXAmJnR5cGVvZiByZXA9PVwib2JqZWN0XCIpe2Y9cmVwLmxlbmd0aDtmb3IoYz0wO2M8ZjtjKz0xKXR5cGVvZiByZXBbY109PVwic3RyaW5nXCImJihkPXJlcFtjXSxlPXN0cihkLGkpLGUmJmgucHVzaChxdW90ZShkKSsoZ2FwP1wiOiBcIjpcIjpcIikrZSkpfWVsc2UgZm9yKGQgaW4gaSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoaSxkKSYmKGU9c3RyKGQsaSksZSYmaC5wdXNoKHF1b3RlKGQpKyhnYXA/XCI6IFwiOlwiOlwiKStlKSk7cmV0dXJuIGU9aC5sZW5ndGg9PT0wP1wie31cIjpnYXA/XCJ7XFxuXCIrZ2FwK2guam9pbihcIixcXG5cIitnYXApK1wiXFxuXCIrZytcIn1cIjpcIntcIitoLmpvaW4oXCIsXCIpK1wifVwiLGdhcD1nLGV9fVwidXNlIHN0cmljdFwiO2lmKG5hdGl2ZUpTT04mJm5hdGl2ZUpTT04ucGFyc2UpcmV0dXJuIGV4cG9ydHMuSlNPTj17cGFyc2U6bmF0aXZlSlNPTi5wYXJzZSxzdHJpbmdpZnk6bmF0aXZlSlNPTi5zdHJpbmdpZnl9O3ZhciBKU09OPWV4cG9ydHMuSlNPTj17fSxjeD0vW1xcdTAwMDBcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxlc2NhcGFibGU9L1tcXFxcXFxcIlxceDAwLVxceDFmXFx4N2YtXFx4OWZcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxnYXAsaW5kZW50LG1ldGE9e1wiXFxiXCI6XCJcXFxcYlwiLFwiXFx0XCI6XCJcXFxcdFwiLFwiXFxuXCI6XCJcXFxcblwiLFwiXFxmXCI6XCJcXFxcZlwiLFwiXFxyXCI6XCJcXFxcclwiLCdcIic6J1xcXFxcIicsXCJcXFxcXCI6XCJcXFxcXFxcXFwifSxyZXA7SlNPTi5zdHJpbmdpZnk9ZnVuY3Rpb24oYSxiLGMpe3ZhciBkO2dhcD1cIlwiLGluZGVudD1cIlwiO2lmKHR5cGVvZiBjPT1cIm51bWJlclwiKWZvcihkPTA7ZDxjO2QrPTEpaW5kZW50Kz1cIiBcIjtlbHNlIHR5cGVvZiBjPT1cInN0cmluZ1wiJiYoaW5kZW50PWMpO3JlcD1iO2lmKCFifHx0eXBlb2YgYj09XCJmdW5jdGlvblwifHx0eXBlb2YgYj09XCJvYmplY3RcIiYmdHlwZW9mIGIubGVuZ3RoPT1cIm51bWJlclwiKXJldHVybiBzdHIoXCJcIix7XCJcIjphfSk7dGhyb3cgbmV3IEVycm9yKFwiSlNPTi5zdHJpbmdpZnlcIil9LEpTT04ucGFyc2U9ZnVuY3Rpb24odGV4dCxyZXZpdmVyKXtmdW5jdGlvbiB3YWxrKGEsYil7dmFyIGMsZCxlPWFbYl07aWYoZSYmdHlwZW9mIGU9PVwib2JqZWN0XCIpZm9yKGMgaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxjKSYmKGQ9d2FsayhlLGMpLGQhPT11bmRlZmluZWQ/ZVtjXT1kOmRlbGV0ZSBlW2NdKTtyZXR1cm4gcmV2aXZlci5jYWxsKGEsYixlKX12YXIgajt0ZXh0PVN0cmluZyh0ZXh0KSxjeC5sYXN0SW5kZXg9MCxjeC50ZXN0KHRleHQpJiYodGV4dD10ZXh0LnJlcGxhY2UoY3gsZnVuY3Rpb24oYSl7cmV0dXJuXCJcXFxcdVwiKyhcIjAwMDBcIithLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCl9KSk7aWYoL15bXFxdLDp7fVxcc10qJC8udGVzdCh0ZXh0LnJlcGxhY2UoL1xcXFwoPzpbXCJcXFxcXFwvYmZucnRdfHVbMC05YS1mQS1GXXs0fSkvZyxcIkBcIikucmVwbGFjZSgvXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2csXCJdXCIpLnJlcGxhY2UoLyg/Ol58OnwsKSg/OlxccypcXFspKy9nLFwiXCIpKSlyZXR1cm4gaj1ldmFsKFwiKFwiK3RleHQrXCIpXCIpLHR5cGVvZiByZXZpdmVyPT1cImZ1bmN0aW9uXCI/d2Fsayh7XCJcIjpqfSxcIlwiKTpqO3Rocm93IG5ldyBTeW50YXhFcnJvcihcIkpTT04ucGFyc2VcIil9fShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLmV4cG9ydHMsdHlwZW9mIEpTT04hPVwidW5kZWZpbmVkXCI/SlNPTjp1bmRlZmluZWQpLGZ1bmN0aW9uKGEsYil7dmFyIGM9YS5wYXJzZXI9e30sZD1jLnBhY2tldHM9W1wiZGlzY29ubmVjdFwiLFwiY29ubmVjdFwiLFwiaGVhcnRiZWF0XCIsXCJtZXNzYWdlXCIsXCJqc29uXCIsXCJldmVudFwiLFwiYWNrXCIsXCJlcnJvclwiLFwibm9vcFwiXSxlPWMucmVhc29ucz1bXCJ0cmFuc3BvcnQgbm90IHN1cHBvcnRlZFwiLFwiY2xpZW50IG5vdCBoYW5kc2hha2VuXCIsXCJ1bmF1dGhvcml6ZWRcIl0sZj1jLmFkdmljZT1bXCJyZWNvbm5lY3RcIl0sZz1iLkpTT04saD1iLnV0aWwuaW5kZXhPZjtjLmVuY29kZVBhY2tldD1mdW5jdGlvbihhKXt2YXIgYj1oKGQsYS50eXBlKSxjPWEuaWR8fFwiXCIsaT1hLmVuZHBvaW50fHxcIlwiLGo9YS5hY2ssaz1udWxsO3N3aXRjaChhLnR5cGUpe2Nhc2VcImVycm9yXCI6dmFyIGw9YS5yZWFzb24/aChlLGEucmVhc29uKTpcIlwiLG09YS5hZHZpY2U/aChmLGEuYWR2aWNlKTpcIlwiO2lmKGwhPT1cIlwifHxtIT09XCJcIilrPWwrKG0hPT1cIlwiP1wiK1wiK206XCJcIik7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmEuZGF0YSE9PVwiXCImJihrPWEuZGF0YSk7YnJlYWs7Y2FzZVwiZXZlbnRcIjp2YXIgbj17bmFtZTphLm5hbWV9O2EuYXJncyYmYS5hcmdzLmxlbmd0aCYmKG4uYXJncz1hLmFyZ3MpLGs9Zy5zdHJpbmdpZnkobik7YnJlYWs7Y2FzZVwianNvblwiOms9Zy5zdHJpbmdpZnkoYS5kYXRhKTticmVhaztjYXNlXCJjb25uZWN0XCI6YS5xcyYmKGs9YS5xcyk7YnJlYWs7Y2FzZVwiYWNrXCI6az1hLmFja0lkKyhhLmFyZ3MmJmEuYXJncy5sZW5ndGg/XCIrXCIrZy5zdHJpbmdpZnkoYS5hcmdzKTpcIlwiKX12YXIgbz1bYixjKyhqPT1cImRhdGFcIj9cIitcIjpcIlwiKSxpXTtyZXR1cm4gayE9PW51bGwmJmshPT11bmRlZmluZWQmJm8ucHVzaChrKSxvLmpvaW4oXCI6XCIpfSxjLmVuY29kZVBheWxvYWQ9ZnVuY3Rpb24oYSl7dmFyIGI9XCJcIjtpZihhLmxlbmd0aD09MSlyZXR1cm4gYVswXTtmb3IodmFyIGM9MCxkPWEubGVuZ3RoO2M8ZDtjKyspe3ZhciBlPWFbY107Yis9XCJcXHVmZmZkXCIrZS5sZW5ndGgrXCJcXHVmZmZkXCIrYVtjXX1yZXR1cm4gYn07dmFyIGk9LyhbXjpdKyk6KFswLTldKyk/KFxcKyk/OihbXjpdKyk/Oj8oW1xcc1xcU10qKT8vO2MuZGVjb2RlUGFja2V0PWZ1bmN0aW9uKGEpe3ZhciBiPWEubWF0Y2goaSk7aWYoIWIpcmV0dXJue307dmFyIGM9YlsyXXx8XCJcIixhPWJbNV18fFwiXCIsaD17dHlwZTpkW2JbMV1dLGVuZHBvaW50OmJbNF18fFwiXCJ9O2MmJihoLmlkPWMsYlszXT9oLmFjaz1cImRhdGFcIjpoLmFjaz0hMCk7c3dpdGNoKGgudHlwZSl7Y2FzZVwiZXJyb3JcIjp2YXIgYj1hLnNwbGl0KFwiK1wiKTtoLnJlYXNvbj1lW2JbMF1dfHxcIlwiLGguYWR2aWNlPWZbYlsxXV18fFwiXCI7YnJlYWs7Y2FzZVwibWVzc2FnZVwiOmguZGF0YT1hfHxcIlwiO2JyZWFrO2Nhc2VcImV2ZW50XCI6dHJ5e3ZhciBqPWcucGFyc2UoYSk7aC5uYW1lPWoubmFtZSxoLmFyZ3M9ai5hcmdzfWNhdGNoKGspe31oLmFyZ3M9aC5hcmdzfHxbXTticmVhaztjYXNlXCJqc29uXCI6dHJ5e2guZGF0YT1nLnBhcnNlKGEpfWNhdGNoKGspe31icmVhaztjYXNlXCJjb25uZWN0XCI6aC5xcz1hfHxcIlwiO2JyZWFrO2Nhc2VcImFja1wiOnZhciBiPWEubWF0Y2goL14oWzAtOV0rKShcXCspPyguKikvKTtpZihiKXtoLmFja0lkPWJbMV0saC5hcmdzPVtdO2lmKGJbM10pdHJ5e2guYXJncz1iWzNdP2cucGFyc2UoYlszXSk6W119Y2F0Y2goayl7fX1icmVhaztjYXNlXCJkaXNjb25uZWN0XCI6Y2FzZVwiaGVhcnRiZWF0XCI6fXJldHVybiBofSxjLmRlY29kZVBheWxvYWQ9ZnVuY3Rpb24oYSl7aWYoYS5jaGFyQXQoMCk9PVwiXFx1ZmZmZFwiKXt2YXIgYj1bXTtmb3IodmFyIGQ9MSxlPVwiXCI7ZDxhLmxlbmd0aDtkKyspYS5jaGFyQXQoZCk9PVwiXFx1ZmZmZFwiPyhiLnB1c2goYy5kZWNvZGVQYWNrZXQoYS5zdWJzdHIoZCsxKS5zdWJzdHIoMCxlKSkpLGQrPU51bWJlcihlKSsxLGU9XCJcIik6ZSs9YS5jaGFyQXQoZCk7cmV0dXJuIGJ9cmV0dXJuW2MuZGVjb2RlUGFja2V0KGEpXX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzKSxmdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoYSxiKXt0aGlzLnNvY2tldD1hLHRoaXMuc2Vzc2lkPWJ9YS5UcmFuc3BvcnQ9YyxiLnV0aWwubWl4aW4oYyxiLkV2ZW50RW1pdHRlciksYy5wcm90b3R5cGUuaGVhcnRiZWF0cz1mdW5jdGlvbigpe3JldHVybiEwfSxjLnByb3RvdHlwZS5vbkRhdGE9ZnVuY3Rpb24oYSl7dGhpcy5jbGVhckNsb3NlVGltZW91dCgpLCh0aGlzLnNvY2tldC5jb25uZWN0ZWR8fHRoaXMuc29ja2V0LmNvbm5lY3Rpbmd8fHRoaXMuc29ja2V0LnJlY29ubmVjdGluZykmJnRoaXMuc2V0Q2xvc2VUaW1lb3V0KCk7aWYoYSE9PVwiXCIpe3ZhciBjPWIucGFyc2VyLmRlY29kZVBheWxvYWQoYSk7aWYoYyYmYy5sZW5ndGgpZm9yKHZhciBkPTAsZT1jLmxlbmd0aDtkPGU7ZCsrKXRoaXMub25QYWNrZXQoY1tkXSl9cmV0dXJuIHRoaXN9LGMucHJvdG90eXBlLm9uUGFja2V0PWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnNvY2tldC5zZXRIZWFydGJlYXRUaW1lb3V0KCksYS50eXBlPT1cImhlYXJ0YmVhdFwiP3RoaXMub25IZWFydGJlYXQoKTooYS50eXBlPT1cImNvbm5lY3RcIiYmYS5lbmRwb2ludD09XCJcIiYmdGhpcy5vbkNvbm5lY3QoKSxhLnR5cGU9PVwiZXJyb3JcIiYmYS5hZHZpY2U9PVwicmVjb25uZWN0XCImJih0aGlzLmlzT3Blbj0hMSksdGhpcy5zb2NrZXQub25QYWNrZXQoYSksdGhpcyl9LGMucHJvdG90eXBlLnNldENsb3NlVGltZW91dD1mdW5jdGlvbigpe2lmKCF0aGlzLmNsb3NlVGltZW91dCl7dmFyIGE9dGhpczt0aGlzLmNsb3NlVGltZW91dD1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7YS5vbkRpc2Nvbm5lY3QoKX0sdGhpcy5zb2NrZXQuY2xvc2VUaW1lb3V0KX19LGMucHJvdG90eXBlLm9uRGlzY29ubmVjdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmlzT3BlbiYmdGhpcy5jbG9zZSgpLHRoaXMuY2xlYXJUaW1lb3V0cygpLHRoaXMuc29ja2V0Lm9uRGlzY29ubmVjdCgpLHRoaXN9LGMucHJvdG90eXBlLm9uQ29ubmVjdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLnNvY2tldC5vbkNvbm5lY3QoKSx0aGlzfSxjLnByb3RvdHlwZS5jbGVhckNsb3NlVGltZW91dD1mdW5jdGlvbigpe3RoaXMuY2xvc2VUaW1lb3V0JiYoY2xlYXJUaW1lb3V0KHRoaXMuY2xvc2VUaW1lb3V0KSx0aGlzLmNsb3NlVGltZW91dD1udWxsKX0sYy5wcm90b3R5cGUuY2xlYXJUaW1lb3V0cz1mdW5jdGlvbigpe3RoaXMuY2xlYXJDbG9zZVRpbWVvdXQoKSx0aGlzLnJlb3BlblRpbWVvdXQmJmNsZWFyVGltZW91dCh0aGlzLnJlb3BlblRpbWVvdXQpfSxjLnByb3RvdHlwZS5wYWNrZXQ9ZnVuY3Rpb24oYSl7dGhpcy5zZW5kKGIucGFyc2VyLmVuY29kZVBhY2tldChhKSl9LGMucHJvdG90eXBlLm9uSGVhcnRiZWF0PWZ1bmN0aW9uKGEpe3RoaXMucGFja2V0KHt0eXBlOlwiaGVhcnRiZWF0XCJ9KX0sYy5wcm90b3R5cGUub25PcGVuPWZ1bmN0aW9uKCl7dGhpcy5pc09wZW49ITAsdGhpcy5jbGVhckNsb3NlVGltZW91dCgpLHRoaXMuc29ja2V0Lm9uT3BlbigpfSxjLnByb3RvdHlwZS5vbkNsb3NlPWZ1bmN0aW9uKCl7dmFyIGE9dGhpczt0aGlzLmlzT3Blbj0hMSx0aGlzLnNvY2tldC5vbkNsb3NlKCksdGhpcy5vbkRpc2Nvbm5lY3QoKX0sYy5wcm90b3R5cGUucHJlcGFyZVVybD1mdW5jdGlvbigpe3ZhciBhPXRoaXMuc29ja2V0Lm9wdGlvbnM7cmV0dXJuIHRoaXMuc2NoZW1lKCkrXCI6Ly9cIithLmhvc3QrXCI6XCIrYS5wb3J0K1wiL1wiK2EucmVzb3VyY2UrXCIvXCIrYi5wcm90b2NvbCtcIi9cIit0aGlzLm5hbWUrXCIvXCIrdGhpcy5zZXNzaWR9LGMucHJvdG90eXBlLnJlYWR5PWZ1bmN0aW9uKGEsYil7Yi5jYWxsKHRoaXMpfX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMpLGZ1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKGEpe3RoaXMub3B0aW9ucz17cG9ydDo4MCxzZWN1cmU6ITEsZG9jdW1lbnQ6XCJkb2N1bWVudFwiaW4gYz9kb2N1bWVudDohMSxyZXNvdXJjZTpcInNvY2tldC5pb1wiLHRyYW5zcG9ydHM6Yi50cmFuc3BvcnRzLFwiY29ubmVjdCB0aW1lb3V0XCI6MWU0LFwidHJ5IG11bHRpcGxlIHRyYW5zcG9ydHNcIjohMCxyZWNvbm5lY3Q6ITAsXCJyZWNvbm5lY3Rpb24gZGVsYXlcIjo1MDAsXCJyZWNvbm5lY3Rpb24gbGltaXRcIjpJbmZpbml0eSxcInJlb3BlbiBkZWxheVwiOjNlMyxcIm1heCByZWNvbm5lY3Rpb24gYXR0ZW1wdHNcIjoxMCxcInN5bmMgZGlzY29ubmVjdCBvbiB1bmxvYWRcIjohMSxcImF1dG8gY29ubmVjdFwiOiEwLFwiZmxhc2ggcG9saWN5IHBvcnRcIjoxMDg0MyxtYW51YWxGbHVzaDohMX0sYi51dGlsLm1lcmdlKHRoaXMub3B0aW9ucyxhKSx0aGlzLmNvbm5lY3RlZD0hMSx0aGlzLm9wZW49ITEsdGhpcy5jb25uZWN0aW5nPSExLHRoaXMucmVjb25uZWN0aW5nPSExLHRoaXMubmFtZXNwYWNlcz17fSx0aGlzLmJ1ZmZlcj1bXSx0aGlzLmRvQnVmZmVyPSExO2lmKHRoaXMub3B0aW9uc1tcInN5bmMgZGlzY29ubmVjdCBvbiB1bmxvYWRcIl0mJighdGhpcy5pc1hEb21haW4oKXx8Yi51dGlsLnVhLmhhc0NPUlMpKXt2YXIgZD10aGlzO2IudXRpbC5vbihjLFwiYmVmb3JldW5sb2FkXCIsZnVuY3Rpb24oKXtkLmRpc2Nvbm5lY3RTeW5jKCl9LCExKX10aGlzLm9wdGlvbnNbXCJhdXRvIGNvbm5lY3RcIl0mJnRoaXMuY29ubmVjdCgpfWZ1bmN0aW9uIGUoKXt9YS5Tb2NrZXQ9ZCxiLnV0aWwubWl4aW4oZCxiLkV2ZW50RW1pdHRlciksZC5wcm90b3R5cGUub2Y9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMubmFtZXNwYWNlc1thXXx8KHRoaXMubmFtZXNwYWNlc1thXT1uZXcgYi5Tb2NrZXROYW1lc3BhY2UodGhpcyxhKSxhIT09XCJcIiYmdGhpcy5uYW1lc3BhY2VzW2FdLnBhY2tldCh7dHlwZTpcImNvbm5lY3RcIn0pKSx0aGlzLm5hbWVzcGFjZXNbYV19LGQucHJvdG90eXBlLnB1Ymxpc2g9ZnVuY3Rpb24oKXt0aGlzLmVtaXQuYXBwbHkodGhpcyxhcmd1bWVudHMpO3ZhciBhO2Zvcih2YXIgYiBpbiB0aGlzLm5hbWVzcGFjZXMpdGhpcy5uYW1lc3BhY2VzLmhhc093blByb3BlcnR5KGIpJiYoYT10aGlzLm9mKGIpLGEuJGVtaXQuYXBwbHkoYSxhcmd1bWVudHMpKX0sZC5wcm90b3R5cGUuaGFuZHNoYWtlPWZ1bmN0aW9uKGEpe2Z1bmN0aW9uIGYoYil7YiBpbnN0YW5jZW9mIEVycm9yPyhjLmNvbm5lY3Rpbmc9ITEsYy5vbkVycm9yKGIubWVzc2FnZSkpOmEuYXBwbHkobnVsbCxiLnNwbGl0KFwiOlwiKSl9dmFyIGM9dGhpcyxkPXRoaXMub3B0aW9ucyxnPVtcImh0dHBcIisoZC5zZWN1cmU/XCJzXCI6XCJcIikrXCI6L1wiLGQuaG9zdCtcIjpcIitkLnBvcnQsZC5yZXNvdXJjZSxiLnByb3RvY29sLGIudXRpbC5xdWVyeSh0aGlzLm9wdGlvbnMucXVlcnksXCJ0PVwiKyArKG5ldyBEYXRlKSldLmpvaW4oXCIvXCIpO2lmKHRoaXMuaXNYRG9tYWluKCkmJiFiLnV0aWwudWEuaGFzQ09SUyl7dmFyIGg9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIilbMF0saT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO2kuc3JjPWcrXCImanNvbnA9XCIrYi5qLmxlbmd0aCxoLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGksaCksYi5qLnB1c2goZnVuY3Rpb24oYSl7ZihhKSxpLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoaSl9KX1lbHNle3ZhciBqPWIudXRpbC5yZXF1ZXN0KCk7ai5vcGVuKFwiR0VUXCIsZywhMCksdGhpcy5pc1hEb21haW4oKSYmKGoud2l0aENyZWRlbnRpYWxzPSEwKSxqLm9ucmVhZHlzdGF0ZWNoYW5nZT1mdW5jdGlvbigpe2oucmVhZHlTdGF0ZT09NCYmKGoub25yZWFkeXN0YXRlY2hhbmdlPWUsai5zdGF0dXM9PTIwMD9mKGoucmVzcG9uc2VUZXh0KTpqLnN0YXR1cz09NDAzP2Mub25FcnJvcihqLnJlc3BvbnNlVGV4dCk6KGMuY29ubmVjdGluZz0hMSwhYy5yZWNvbm5lY3RpbmcmJmMub25FcnJvcihqLnJlc3BvbnNlVGV4dCkpKX0sai5zZW5kKG51bGwpfX0sZC5wcm90b3R5cGUuZ2V0VHJhbnNwb3J0PWZ1bmN0aW9uKGEpe3ZhciBjPWF8fHRoaXMudHJhbnNwb3J0cyxkO2Zvcih2YXIgZT0wLGY7Zj1jW2VdO2UrKylpZihiLlRyYW5zcG9ydFtmXSYmYi5UcmFuc3BvcnRbZl0uY2hlY2sodGhpcykmJighdGhpcy5pc1hEb21haW4oKXx8Yi5UcmFuc3BvcnRbZl0ueGRvbWFpbkNoZWNrKHRoaXMpKSlyZXR1cm4gbmV3IGIuVHJhbnNwb3J0W2ZdKHRoaXMsdGhpcy5zZXNzaW9uaWQpO3JldHVybiBudWxsfSxkLnByb3RvdHlwZS5jb25uZWN0PWZ1bmN0aW9uKGEpe2lmKHRoaXMuY29ubmVjdGluZylyZXR1cm4gdGhpczt2YXIgYz10aGlzO3JldHVybiBjLmNvbm5lY3Rpbmc9ITAsdGhpcy5oYW5kc2hha2UoZnVuY3Rpb24oZCxlLGYsZyl7ZnVuY3Rpb24gaChhKXtjLnRyYW5zcG9ydCYmYy50cmFuc3BvcnQuY2xlYXJUaW1lb3V0cygpLGMudHJhbnNwb3J0PWMuZ2V0VHJhbnNwb3J0KGEpO2lmKCFjLnRyYW5zcG9ydClyZXR1cm4gYy5wdWJsaXNoKFwiY29ubmVjdF9mYWlsZWRcIik7Yy50cmFuc3BvcnQucmVhZHkoYyxmdW5jdGlvbigpe2MuY29ubmVjdGluZz0hMCxjLnB1Ymxpc2goXCJjb25uZWN0aW5nXCIsYy50cmFuc3BvcnQubmFtZSksYy50cmFuc3BvcnQub3BlbigpLGMub3B0aW9uc1tcImNvbm5lY3QgdGltZW91dFwiXSYmKGMuY29ubmVjdFRpbWVvdXRUaW1lcj1zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aWYoIWMuY29ubmVjdGVkKXtjLmNvbm5lY3Rpbmc9ITE7aWYoYy5vcHRpb25zW1widHJ5IG11bHRpcGxlIHRyYW5zcG9ydHNcIl0pe3ZhciBhPWMudHJhbnNwb3J0czt3aGlsZShhLmxlbmd0aD4wJiZhLnNwbGljZSgwLDEpWzBdIT1jLnRyYW5zcG9ydC5uYW1lKTthLmxlbmd0aD9oKGEpOmMucHVibGlzaChcImNvbm5lY3RfZmFpbGVkXCIpfX19LGMub3B0aW9uc1tcImNvbm5lY3QgdGltZW91dFwiXSkpfSl9Yy5zZXNzaW9uaWQ9ZCxjLmNsb3NlVGltZW91dD1mKjFlMyxjLmhlYXJ0YmVhdFRpbWVvdXQ9ZSoxZTMsYy50cmFuc3BvcnRzfHwoYy50cmFuc3BvcnRzPWMub3JpZ1RyYW5zcG9ydHM9Zz9iLnV0aWwuaW50ZXJzZWN0KGcuc3BsaXQoXCIsXCIpLGMub3B0aW9ucy50cmFuc3BvcnRzKTpjLm9wdGlvbnMudHJhbnNwb3J0cyksYy5zZXRIZWFydGJlYXRUaW1lb3V0KCksaChjLnRyYW5zcG9ydHMpLGMub25jZShcImNvbm5lY3RcIixmdW5jdGlvbigpe2NsZWFyVGltZW91dChjLmNvbm5lY3RUaW1lb3V0VGltZXIpLGEmJnR5cGVvZiBhPT1cImZ1bmN0aW9uXCImJmEoKX0pfSksdGhpc30sZC5wcm90b3R5cGUuc2V0SGVhcnRiZWF0VGltZW91dD1mdW5jdGlvbigpe2NsZWFyVGltZW91dCh0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lcik7aWYodGhpcy50cmFuc3BvcnQmJiF0aGlzLnRyYW5zcG9ydC5oZWFydGJlYXRzKCkpcmV0dXJuO3ZhciBhPXRoaXM7dGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXI9c2V0VGltZW91dChmdW5jdGlvbigpe2EudHJhbnNwb3J0Lm9uQ2xvc2UoKX0sdGhpcy5oZWFydGJlYXRUaW1lb3V0KX0sZC5wcm90b3R5cGUucGFja2V0PWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLmNvbm5lY3RlZCYmIXRoaXMuZG9CdWZmZXI/dGhpcy50cmFuc3BvcnQucGFja2V0KGEpOnRoaXMuYnVmZmVyLnB1c2goYSksdGhpc30sZC5wcm90b3R5cGUuc2V0QnVmZmVyPWZ1bmN0aW9uKGEpe3RoaXMuZG9CdWZmZXI9YSwhYSYmdGhpcy5jb25uZWN0ZWQmJnRoaXMuYnVmZmVyLmxlbmd0aCYmKHRoaXMub3B0aW9ucy5tYW51YWxGbHVzaHx8dGhpcy5mbHVzaEJ1ZmZlcigpKX0sZC5wcm90b3R5cGUuZmx1c2hCdWZmZXI9ZnVuY3Rpb24oKXt0aGlzLnRyYW5zcG9ydC5wYXlsb2FkKHRoaXMuYnVmZmVyKSx0aGlzLmJ1ZmZlcj1bXX0sZC5wcm90b3R5cGUuZGlzY29ubmVjdD1mdW5jdGlvbigpe2lmKHRoaXMuY29ubmVjdGVkfHx0aGlzLmNvbm5lY3RpbmcpdGhpcy5vcGVuJiZ0aGlzLm9mKFwiXCIpLnBhY2tldCh7dHlwZTpcImRpc2Nvbm5lY3RcIn0pLHRoaXMub25EaXNjb25uZWN0KFwiYm9vdGVkXCIpO3JldHVybiB0aGlzfSxkLnByb3RvdHlwZS5kaXNjb25uZWN0U3luYz1mdW5jdGlvbigpe3ZhciBhPWIudXRpbC5yZXF1ZXN0KCksYz1bXCJodHRwXCIrKHRoaXMub3B0aW9ucy5zZWN1cmU/XCJzXCI6XCJcIikrXCI6L1wiLHRoaXMub3B0aW9ucy5ob3N0K1wiOlwiK3RoaXMub3B0aW9ucy5wb3J0LHRoaXMub3B0aW9ucy5yZXNvdXJjZSxiLnByb3RvY29sLFwiXCIsdGhpcy5zZXNzaW9uaWRdLmpvaW4oXCIvXCIpK1wiLz9kaXNjb25uZWN0PTFcIjthLm9wZW4oXCJHRVRcIixjLCExKSxhLnNlbmQobnVsbCksdGhpcy5vbkRpc2Nvbm5lY3QoXCJib290ZWRcIil9LGQucHJvdG90eXBlLmlzWERvbWFpbj1mdW5jdGlvbigpe3ZhciBhPWMubG9jYXRpb24ucG9ydHx8KFwiaHR0cHM6XCI9PWMubG9jYXRpb24ucHJvdG9jb2w/NDQzOjgwKTtyZXR1cm4gdGhpcy5vcHRpb25zLmhvc3QhPT1jLmxvY2F0aW9uLmhvc3RuYW1lfHx0aGlzLm9wdGlvbnMucG9ydCE9YX0sZC5wcm90b3R5cGUub25Db25uZWN0PWZ1bmN0aW9uKCl7dGhpcy5jb25uZWN0ZWR8fCh0aGlzLmNvbm5lY3RlZD0hMCx0aGlzLmNvbm5lY3Rpbmc9ITEsdGhpcy5kb0J1ZmZlcnx8dGhpcy5zZXRCdWZmZXIoITEpLHRoaXMuZW1pdChcImNvbm5lY3RcIikpfSxkLnByb3RvdHlwZS5vbk9wZW49ZnVuY3Rpb24oKXt0aGlzLm9wZW49ITB9LGQucHJvdG90eXBlLm9uQ2xvc2U9ZnVuY3Rpb24oKXt0aGlzLm9wZW49ITEsY2xlYXJUaW1lb3V0KHRoaXMuaGVhcnRiZWF0VGltZW91dFRpbWVyKX0sZC5wcm90b3R5cGUub25QYWNrZXQ9ZnVuY3Rpb24oYSl7dGhpcy5vZihhLmVuZHBvaW50KS5vblBhY2tldChhKX0sZC5wcm90b3R5cGUub25FcnJvcj1mdW5jdGlvbihhKXthJiZhLmFkdmljZSYmYS5hZHZpY2U9PT1cInJlY29ubmVjdFwiJiYodGhpcy5jb25uZWN0ZWR8fHRoaXMuY29ubmVjdGluZykmJih0aGlzLmRpc2Nvbm5lY3QoKSx0aGlzLm9wdGlvbnMucmVjb25uZWN0JiZ0aGlzLnJlY29ubmVjdCgpKSx0aGlzLnB1Ymxpc2goXCJlcnJvclwiLGEmJmEucmVhc29uP2EucmVhc29uOmEpfSxkLnByb3RvdHlwZS5vbkRpc2Nvbm5lY3Q9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5jb25uZWN0ZWQsYz10aGlzLmNvbm5lY3Rpbmc7dGhpcy5jb25uZWN0ZWQ9ITEsdGhpcy5jb25uZWN0aW5nPSExLHRoaXMub3Blbj0hMTtpZihifHxjKXRoaXMudHJhbnNwb3J0LmNsb3NlKCksdGhpcy50cmFuc3BvcnQuY2xlYXJUaW1lb3V0cygpLGImJih0aGlzLnB1Ymxpc2goXCJkaXNjb25uZWN0XCIsYSksXCJib290ZWRcIiE9YSYmdGhpcy5vcHRpb25zLnJlY29ubmVjdCYmIXRoaXMucmVjb25uZWN0aW5nJiZ0aGlzLnJlY29ubmVjdCgpKX0sZC5wcm90b3R5cGUucmVjb25uZWN0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSgpe2lmKGEuY29ubmVjdGVkKXtmb3IodmFyIGIgaW4gYS5uYW1lc3BhY2VzKWEubmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShiKSYmXCJcIiE9PWImJmEubmFtZXNwYWNlc1tiXS5wYWNrZXQoe3R5cGU6XCJjb25uZWN0XCJ9KTthLnB1Ymxpc2goXCJyZWNvbm5lY3RcIixhLnRyYW5zcG9ydC5uYW1lLGEucmVjb25uZWN0aW9uQXR0ZW1wdHMpfWNsZWFyVGltZW91dChhLnJlY29ubmVjdGlvblRpbWVyKSxhLnJlbW92ZUxpc3RlbmVyKFwiY29ubmVjdF9mYWlsZWRcIixmKSxhLnJlbW92ZUxpc3RlbmVyKFwiY29ubmVjdFwiLGYpLGEucmVjb25uZWN0aW5nPSExLGRlbGV0ZSBhLnJlY29ubmVjdGlvbkF0dGVtcHRzLGRlbGV0ZSBhLnJlY29ubmVjdGlvbkRlbGF5LGRlbGV0ZSBhLnJlY29ubmVjdGlvblRpbWVyLGRlbGV0ZSBhLnJlZG9UcmFuc3BvcnRzLGEub3B0aW9uc1tcInRyeSBtdWx0aXBsZSB0cmFuc3BvcnRzXCJdPWN9ZnVuY3Rpb24gZigpe2lmKCFhLnJlY29ubmVjdGluZylyZXR1cm47aWYoYS5jb25uZWN0ZWQpcmV0dXJuIGUoKTtpZihhLmNvbm5lY3RpbmcmJmEucmVjb25uZWN0aW5nKXJldHVybiBhLnJlY29ubmVjdGlvblRpbWVyPXNldFRpbWVvdXQoZiwxZTMpO2EucmVjb25uZWN0aW9uQXR0ZW1wdHMrKz49Yj9hLnJlZG9UcmFuc3BvcnRzPyhhLnB1Ymxpc2goXCJyZWNvbm5lY3RfZmFpbGVkXCIpLGUoKSk6KGEub24oXCJjb25uZWN0X2ZhaWxlZFwiLGYpLGEub3B0aW9uc1tcInRyeSBtdWx0aXBsZSB0cmFuc3BvcnRzXCJdPSEwLGEudHJhbnNwb3J0cz1hLm9yaWdUcmFuc3BvcnRzLGEudHJhbnNwb3J0PWEuZ2V0VHJhbnNwb3J0KCksYS5yZWRvVHJhbnNwb3J0cz0hMCxhLmNvbm5lY3QoKSk6KGEucmVjb25uZWN0aW9uRGVsYXk8ZCYmKGEucmVjb25uZWN0aW9uRGVsYXkqPTIpLGEuY29ubmVjdCgpLGEucHVibGlzaChcInJlY29ubmVjdGluZ1wiLGEucmVjb25uZWN0aW9uRGVsYXksYS5yZWNvbm5lY3Rpb25BdHRlbXB0cyksYS5yZWNvbm5lY3Rpb25UaW1lcj1zZXRUaW1lb3V0KGYsYS5yZWNvbm5lY3Rpb25EZWxheSkpfXRoaXMucmVjb25uZWN0aW5nPSEwLHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHM9MCx0aGlzLnJlY29ubmVjdGlvbkRlbGF5PXRoaXMub3B0aW9uc1tcInJlY29ubmVjdGlvbiBkZWxheVwiXTt2YXIgYT10aGlzLGI9dGhpcy5vcHRpb25zW1wibWF4IHJlY29ubmVjdGlvbiBhdHRlbXB0c1wiXSxjPXRoaXMub3B0aW9uc1tcInRyeSBtdWx0aXBsZSB0cmFuc3BvcnRzXCJdLGQ9dGhpcy5vcHRpb25zW1wicmVjb25uZWN0aW9uIGxpbWl0XCJdO3RoaXMub3B0aW9uc1tcInRyeSBtdWx0aXBsZSB0cmFuc3BvcnRzXCJdPSExLHRoaXMucmVjb25uZWN0aW9uVGltZXI9c2V0VGltZW91dChmLHRoaXMucmVjb25uZWN0aW9uRGVsYXkpLHRoaXMub24oXCJjb25uZWN0XCIsZil9fShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyx0aGlzKSxmdW5jdGlvbihhLGIpe2Z1bmN0aW9uIGMoYSxiKXt0aGlzLnNvY2tldD1hLHRoaXMubmFtZT1ifHxcIlwiLHRoaXMuZmxhZ3M9e30sdGhpcy5qc29uPW5ldyBkKHRoaXMsXCJqc29uXCIpLHRoaXMuYWNrUGFja2V0cz0wLHRoaXMuYWNrcz17fX1mdW5jdGlvbiBkKGEsYil7dGhpcy5uYW1lc3BhY2U9YSx0aGlzLm5hbWU9Yn1hLlNvY2tldE5hbWVzcGFjZT1jLGIudXRpbC5taXhpbihjLGIuRXZlbnRFbWl0dGVyKSxjLnByb3RvdHlwZS4kZW1pdD1iLkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCxjLnByb3RvdHlwZS5vZj1mdW5jdGlvbigpe3JldHVybiB0aGlzLnNvY2tldC5vZi5hcHBseSh0aGlzLnNvY2tldCxhcmd1bWVudHMpfSxjLnByb3RvdHlwZS5wYWNrZXQ9ZnVuY3Rpb24oYSl7cmV0dXJuIGEuZW5kcG9pbnQ9dGhpcy5uYW1lLHRoaXMuc29ja2V0LnBhY2tldChhKSx0aGlzLmZsYWdzPXt9LHRoaXN9LGMucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oYSxiKXt2YXIgYz17dHlwZTp0aGlzLmZsYWdzLmpzb24/XCJqc29uXCI6XCJtZXNzYWdlXCIsZGF0YTphfTtyZXR1cm5cImZ1bmN0aW9uXCI9PXR5cGVvZiBiJiYoYy5pZD0rK3RoaXMuYWNrUGFja2V0cyxjLmFjaz0hMCx0aGlzLmFja3NbYy5pZF09YiksdGhpcy5wYWNrZXQoYyl9LGMucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oYSl7dmFyIGI9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLGM9YltiLmxlbmd0aC0xXSxkPXt0eXBlOlwiZXZlbnRcIixuYW1lOmF9O3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIGMmJihkLmlkPSsrdGhpcy5hY2tQYWNrZXRzLGQuYWNrPVwiZGF0YVwiLHRoaXMuYWNrc1tkLmlkXT1jLGI9Yi5zbGljZSgwLGIubGVuZ3RoLTEpKSxkLmFyZ3M9Yix0aGlzLnBhY2tldChkKX0sYy5wcm90b3R5cGUuZGlzY29ubmVjdD1mdW5jdGlvbigpe3JldHVybiB0aGlzLm5hbWU9PT1cIlwiP3RoaXMuc29ja2V0LmRpc2Nvbm5lY3QoKToodGhpcy5wYWNrZXQoe3R5cGU6XCJkaXNjb25uZWN0XCJ9KSx0aGlzLiRlbWl0KFwiZGlzY29ubmVjdFwiKSksdGhpc30sYy5wcm90b3R5cGUub25QYWNrZXQ9ZnVuY3Rpb24oYSl7ZnVuY3Rpb24gZCgpe2MucGFja2V0KHt0eXBlOlwiYWNrXCIsYXJnczpiLnV0aWwudG9BcnJheShhcmd1bWVudHMpLGFja0lkOmEuaWR9KX12YXIgYz10aGlzO3N3aXRjaChhLnR5cGUpe2Nhc2VcImNvbm5lY3RcIjp0aGlzLiRlbWl0KFwiY29ubmVjdFwiKTticmVhaztjYXNlXCJkaXNjb25uZWN0XCI6dGhpcy5uYW1lPT09XCJcIj90aGlzLnNvY2tldC5vbkRpc2Nvbm5lY3QoYS5yZWFzb258fFwiYm9vdGVkXCIpOnRoaXMuJGVtaXQoXCJkaXNjb25uZWN0XCIsYS5yZWFzb24pO2JyZWFrO2Nhc2VcIm1lc3NhZ2VcIjpjYXNlXCJqc29uXCI6dmFyIGU9W1wibWVzc2FnZVwiLGEuZGF0YV07YS5hY2s9PVwiZGF0YVwiP2UucHVzaChkKTphLmFjayYmdGhpcy5wYWNrZXQoe3R5cGU6XCJhY2tcIixhY2tJZDphLmlkfSksdGhpcy4kZW1pdC5hcHBseSh0aGlzLGUpO2JyZWFrO2Nhc2VcImV2ZW50XCI6dmFyIGU9W2EubmFtZV0uY29uY2F0KGEuYXJncyk7YS5hY2s9PVwiZGF0YVwiJiZlLnB1c2goZCksdGhpcy4kZW1pdC5hcHBseSh0aGlzLGUpO2JyZWFrO2Nhc2VcImFja1wiOnRoaXMuYWNrc1thLmFja0lkXSYmKHRoaXMuYWNrc1thLmFja0lkXS5hcHBseSh0aGlzLGEuYXJncyksZGVsZXRlIHRoaXMuYWNrc1thLmFja0lkXSk7YnJlYWs7Y2FzZVwiZXJyb3JcIjphLmFkdmljZT90aGlzLnNvY2tldC5vbkVycm9yKGEpOmEucmVhc29uPT1cInVuYXV0aG9yaXplZFwiP3RoaXMuJGVtaXQoXCJjb25uZWN0X2ZhaWxlZFwiLGEucmVhc29uKTp0aGlzLiRlbWl0KFwiZXJyb3JcIixhLnJlYXNvbil9fSxkLnByb3RvdHlwZS5zZW5kPWZ1bmN0aW9uKCl7dGhpcy5uYW1lc3BhY2UuZmxhZ3NbdGhpcy5uYW1lXT0hMCx0aGlzLm5hbWVzcGFjZS5zZW5kLmFwcGx5KHRoaXMubmFtZXNwYWNlLGFyZ3VtZW50cyl9LGQucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oKXt0aGlzLm5hbWVzcGFjZS5mbGFnc1t0aGlzLm5hbWVdPSEwLHRoaXMubmFtZXNwYWNlLmVtaXQuYXBwbHkodGhpcy5uYW1lc3BhY2UsYXJndW1lbnRzKX19KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzKSxmdW5jdGlvbihhLGIsYyl7ZnVuY3Rpb24gZChhKXtiLlRyYW5zcG9ydC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9YS53ZWJzb2NrZXQ9ZCxiLnV0aWwuaW5oZXJpdChkLGIuVHJhbnNwb3J0KSxkLnByb3RvdHlwZS5uYW1lPVwid2Vic29ja2V0XCIsZC5wcm90b3R5cGUub3Blbj1mdW5jdGlvbigpe3ZhciBhPWIudXRpbC5xdWVyeSh0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5KSxkPXRoaXMsZTtyZXR1cm4gZXx8KGU9Yy5Nb3pXZWJTb2NrZXR8fGMuV2ViU29ja2V0KSx0aGlzLndlYnNvY2tldD1uZXcgZSh0aGlzLnByZXBhcmVVcmwoKSthKSx0aGlzLndlYnNvY2tldC5vbm9wZW49ZnVuY3Rpb24oKXtkLm9uT3BlbigpLGQuc29ja2V0LnNldEJ1ZmZlcighMSl9LHRoaXMud2Vic29ja2V0Lm9ubWVzc2FnZT1mdW5jdGlvbihhKXtkLm9uRGF0YShhLmRhdGEpfSx0aGlzLndlYnNvY2tldC5vbmNsb3NlPWZ1bmN0aW9uKCl7ZC5vbkNsb3NlKCksZC5zb2NrZXQuc2V0QnVmZmVyKCEwKX0sdGhpcy53ZWJzb2NrZXQub25lcnJvcj1mdW5jdGlvbihhKXtkLm9uRXJyb3IoYSl9LHRoaXN9LGIudXRpbC51YS5pRGV2aWNlP2QucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcztyZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbigpe2Iud2Vic29ja2V0LnNlbmQoYSl9LDApLHRoaXN9OmQucHJvdG90eXBlLnNlbmQ9ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMud2Vic29ja2V0LnNlbmQoYSksdGhpc30sZC5wcm90b3R5cGUucGF5bG9hZD1mdW5jdGlvbihhKXtmb3IodmFyIGI9MCxjPWEubGVuZ3RoO2I8YztiKyspdGhpcy5wYWNrZXQoYVtiXSk7cmV0dXJuIHRoaXN9LGQucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMud2Vic29ja2V0LmNsb3NlKCksdGhpc30sZC5wcm90b3R5cGUub25FcnJvcj1mdW5jdGlvbihhKXt0aGlzLnNvY2tldC5vbkVycm9yKGEpfSxkLnByb3RvdHlwZS5zY2hlbWU9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zb2NrZXQub3B0aW9ucy5zZWN1cmU/XCJ3c3NcIjpcIndzXCJ9LGQuY2hlY2s9ZnVuY3Rpb24oKXtyZXR1cm5cIldlYlNvY2tldFwiaW4gYyYmIShcIl9fYWRkVGFza1wiaW4gV2ViU29ja2V0KXx8XCJNb3pXZWJTb2NrZXRcImluIGN9LGQueGRvbWFpbkNoZWNrPWZ1bmN0aW9uKCl7cmV0dXJuITB9LGIudHJhbnNwb3J0cy5wdXNoKFwid2Vic29ja2V0XCIpfShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW8uVHJhbnNwb3J0Om1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMsdGhpcyksZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKCl7Yi5UcmFuc3BvcnQud2Vic29ja2V0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX1hLmZsYXNoc29ja2V0PWMsYi51dGlsLmluaGVyaXQoYyxiLlRyYW5zcG9ydC53ZWJzb2NrZXQpLGMucHJvdG90eXBlLm5hbWU9XCJmbGFzaHNvY2tldFwiLGMucHJvdG90eXBlLm9wZW49ZnVuY3Rpb24oKXt2YXIgYT10aGlzLGM9YXJndW1lbnRzO3JldHVybiBXZWJTb2NrZXQuX19hZGRUYXNrKGZ1bmN0aW9uKCl7Yi5UcmFuc3BvcnQud2Vic29ja2V0LnByb3RvdHlwZS5vcGVuLmFwcGx5KGEsYyl9KSx0aGlzfSxjLnByb3RvdHlwZS5zZW5kPWZ1bmN0aW9uKCl7dmFyIGE9dGhpcyxjPWFyZ3VtZW50cztyZXR1cm4gV2ViU29ja2V0Ll9fYWRkVGFzayhmdW5jdGlvbigpe2IuVHJhbnNwb3J0LndlYnNvY2tldC5wcm90b3R5cGUuc2VuZC5hcHBseShhLGMpfSksdGhpc30sYy5wcm90b3R5cGUuY2xvc2U9ZnVuY3Rpb24oKXtyZXR1cm4gV2ViU29ja2V0Ll9fdGFza3MubGVuZ3RoPTAsYi5UcmFuc3BvcnQud2Vic29ja2V0LnByb3RvdHlwZS5jbG9zZS5jYWxsKHRoaXMpLHRoaXN9LGMucHJvdG90eXBlLnJlYWR5PWZ1bmN0aW9uKGEsZCl7ZnVuY3Rpb24gZSgpe3ZhciBiPWEub3B0aW9ucyxlPWJbXCJmbGFzaCBwb2xpY3kgcG9ydFwiXSxnPVtcImh0dHBcIisoYi5zZWN1cmU/XCJzXCI6XCJcIikrXCI6L1wiLGIuaG9zdCtcIjpcIitiLnBvcnQsYi5yZXNvdXJjZSxcInN0YXRpYy9mbGFzaHNvY2tldFwiLFwiV2ViU29ja2V0TWFpblwiKyhhLmlzWERvbWFpbigpP1wiSW5zZWN1cmVcIjpcIlwiKStcIi5zd2ZcIl07Yy5sb2FkZWR8fCh0eXBlb2YgV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT049PVwidW5kZWZpbmVkXCImJihXRUJfU09DS0VUX1NXRl9MT0NBVElPTj1nLmpvaW4oXCIvXCIpKSxlIT09ODQzJiZXZWJTb2NrZXQubG9hZEZsYXNoUG9saWN5RmlsZShcInhtbHNvY2tldDovL1wiK2IuaG9zdCtcIjpcIitlKSxXZWJTb2NrZXQuX19pbml0aWFsaXplKCksYy5sb2FkZWQ9ITApLGQuY2FsbChmKX12YXIgZj10aGlzO2lmKGRvY3VtZW50LmJvZHkpcmV0dXJuIGUoKTtiLnV0aWwubG9hZChlKX0sYy5jaGVjaz1mdW5jdGlvbigpe3JldHVybiB0eXBlb2YgV2ViU29ja2V0IT1cInVuZGVmaW5lZFwiJiZcIl9faW5pdGlhbGl6ZVwiaW4gV2ViU29ja2V0JiYhIXN3Zm9iamVjdD9zd2ZvYmplY3QuZ2V0Rmxhc2hQbGF5ZXJWZXJzaW9uKCkubWFqb3I+PTEwOiExfSxjLnhkb21haW5DaGVjaz1mdW5jdGlvbigpe3JldHVybiEwfSx0eXBlb2Ygd2luZG93IT1cInVuZGVmaW5lZFwiJiYoV0VCX1NPQ0tFVF9ESVNBQkxFX0FVVE9fSU5JVElBTElaQVRJT049ITApLGIudHJhbnNwb3J0cy5wdXNoKFwiZmxhc2hzb2NrZXRcIil9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pby5UcmFuc3BvcnQ6bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyk7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIHdpbmRvdyl2YXIgc3dmb2JqZWN0PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gQSgpe2lmKHQpcmV0dXJuO3RyeXt2YXIgYT1pLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXS5hcHBlbmRDaGlsZChRKFwic3BhblwiKSk7YS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGEpfWNhdGNoKGIpe3JldHVybn10PSEwO3ZhciBjPWwubGVuZ3RoO2Zvcih2YXIgZD0wO2Q8YztkKyspbFtkXSgpfWZ1bmN0aW9uIEIoYSl7dD9hKCk6bFtsLmxlbmd0aF09YX1mdW5jdGlvbiBDKGIpe2lmKHR5cGVvZiBoLmFkZEV2ZW50TGlzdGVuZXIhPWEpaC5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGIsITEpO2Vsc2UgaWYodHlwZW9mIGkuYWRkRXZlbnRMaXN0ZW5lciE9YSlpLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsYiwhMSk7ZWxzZSBpZih0eXBlb2YgaC5hdHRhY2hFdmVudCE9YSlSKGgsXCJvbmxvYWRcIixiKTtlbHNlIGlmKHR5cGVvZiBoLm9ubG9hZD09XCJmdW5jdGlvblwiKXt2YXIgYz1oLm9ubG9hZDtoLm9ubG9hZD1mdW5jdGlvbigpe2MoKSxiKCl9fWVsc2UgaC5vbmxvYWQ9Yn1mdW5jdGlvbiBEKCl7az9FKCk6RigpfWZ1bmN0aW9uIEUoKXt2YXIgYz1pLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXSxkPVEoYik7ZC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsZSk7dmFyIGY9Yy5hcHBlbmRDaGlsZChkKTtpZihmKXt2YXIgZz0wOyhmdW5jdGlvbigpe2lmKHR5cGVvZiBmLkdldFZhcmlhYmxlIT1hKXt2YXIgYj1mLkdldFZhcmlhYmxlKFwiJHZlcnNpb25cIik7YiYmKGI9Yi5zcGxpdChcIiBcIilbMV0uc3BsaXQoXCIsXCIpLHkucHY9W3BhcnNlSW50KGJbMF0sMTApLHBhcnNlSW50KGJbMV0sMTApLHBhcnNlSW50KGJbMl0sMTApXSl9ZWxzZSBpZihnPDEwKXtnKyssc2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKTtyZXR1cm59Yy5yZW1vdmVDaGlsZChkKSxmPW51bGwsRigpfSkoKX1lbHNlIEYoKX1mdW5jdGlvbiBGKCl7dmFyIGI9bS5sZW5ndGg7aWYoYj4wKWZvcih2YXIgYz0wO2M8YjtjKyspe3ZhciBkPW1bY10uaWQsZT1tW2NdLmNhbGxiYWNrRm4sZj17c3VjY2VzczohMSxpZDpkfTtpZih5LnB2WzBdPjApe3ZhciBnPVAoZCk7aWYoZylpZihTKG1bY10uc3dmVmVyc2lvbikmJiEoeS53ayYmeS53azwzMTIpKVUoZCwhMCksZSYmKGYuc3VjY2Vzcz0hMCxmLnJlZj1HKGQpLGUoZikpO2Vsc2UgaWYobVtjXS5leHByZXNzSW5zdGFsbCYmSCgpKXt2YXIgaD17fTtoLmRhdGE9bVtjXS5leHByZXNzSW5zdGFsbCxoLndpZHRoPWcuZ2V0QXR0cmlidXRlKFwid2lkdGhcIil8fFwiMFwiLGguaGVpZ2h0PWcuZ2V0QXR0cmlidXRlKFwiaGVpZ2h0XCIpfHxcIjBcIixnLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpJiYoaC5zdHlsZWNsYXNzPWcuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikpLGcuZ2V0QXR0cmlidXRlKFwiYWxpZ25cIikmJihoLmFsaWduPWcuZ2V0QXR0cmlidXRlKFwiYWxpZ25cIikpO3ZhciBpPXt9LGo9Zy5nZXRFbGVtZW50c0J5VGFnTmFtZShcInBhcmFtXCIpLGs9ai5sZW5ndGg7Zm9yKHZhciBsPTA7bDxrO2wrKylqW2xdLmdldEF0dHJpYnV0ZShcIm5hbWVcIikudG9Mb3dlckNhc2UoKSE9XCJtb3ZpZVwiJiYoaVtqW2xdLmdldEF0dHJpYnV0ZShcIm5hbWVcIildPWpbbF0uZ2V0QXR0cmlidXRlKFwidmFsdWVcIikpO0koaCxpLGQsZSl9ZWxzZSBKKGcpLGUmJmUoZil9ZWxzZXtVKGQsITApO2lmKGUpe3ZhciBuPUcoZCk7biYmdHlwZW9mIG4uU2V0VmFyaWFibGUhPWEmJihmLnN1Y2Nlc3M9ITAsZi5yZWY9biksZShmKX19fX1mdW5jdGlvbiBHKGMpe3ZhciBkPW51bGwsZT1QKGMpO2lmKGUmJmUubm9kZU5hbWU9PVwiT0JKRUNUXCIpaWYodHlwZW9mIGUuU2V0VmFyaWFibGUhPWEpZD1lO2Vsc2V7dmFyIGY9ZS5nZXRFbGVtZW50c0J5VGFnTmFtZShiKVswXTtmJiYoZD1mKX1yZXR1cm4gZH1mdW5jdGlvbiBIKCl7cmV0dXJuIXUmJlMoXCI2LjAuNjVcIikmJih5Lndpbnx8eS5tYWMpJiYhKHkud2smJnkud2s8MzEyKX1mdW5jdGlvbiBJKGIsYyxkLGUpe3U9ITAscj1lfHxudWxsLHM9e3N1Y2Nlc3M6ITEsaWQ6ZH07dmFyIGc9UChkKTtpZihnKXtnLm5vZGVOYW1lPT1cIk9CSkVDVFwiPyhwPUsoZykscT1udWxsKToocD1nLHE9ZCksYi5pZD1mO2lmKHR5cGVvZiBiLndpZHRoPT1hfHwhLyUkLy50ZXN0KGIud2lkdGgpJiZwYXJzZUludChiLndpZHRoLDEwKTwzMTApYi53aWR0aD1cIjMxMFwiO2lmKHR5cGVvZiBiLmhlaWdodD09YXx8IS8lJC8udGVzdChiLmhlaWdodCkmJnBhcnNlSW50KGIuaGVpZ2h0LDEwKTwxMzcpYi5oZWlnaHQ9XCIxMzdcIjtpLnRpdGxlPWkudGl0bGUuc2xpY2UoMCw0NykrXCIgLSBGbGFzaCBQbGF5ZXIgSW5zdGFsbGF0aW9uXCI7dmFyIGo9eS5pZSYmeS53aW4/W1wiQWN0aXZlXCJdLmNvbmNhdChcIlwiKS5qb2luKFwiWFwiKTpcIlBsdWdJblwiLGs9XCJNTXJlZGlyZWN0VVJMPVwiK2gubG9jYXRpb24udG9TdHJpbmcoKS5yZXBsYWNlKC8mL2csXCIlMjZcIikrXCImTU1wbGF5ZXJUeXBlPVwiK2orXCImTU1kb2N0aXRsZT1cIitpLnRpdGxlO3R5cGVvZiBjLmZsYXNodmFycyE9YT9jLmZsYXNodmFycys9XCImXCIrazpjLmZsYXNodmFycz1rO2lmKHkuaWUmJnkud2luJiZnLnJlYWR5U3RhdGUhPTQpe3ZhciBsPVEoXCJkaXZcIik7ZCs9XCJTV0ZPYmplY3ROZXdcIixsLnNldEF0dHJpYnV0ZShcImlkXCIsZCksZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShsLGcpLGcuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixmdW5jdGlvbigpe2cucmVhZHlTdGF0ZT09ND9nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZyk6c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKX0oKX1MKGIsYyxkKX19ZnVuY3Rpb24gSihhKXtpZih5LmllJiZ5LndpbiYmYS5yZWFkeVN0YXRlIT00KXt2YXIgYj1RKFwiZGl2XCIpO2EucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYixhKSxiLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKEsoYSksYiksYS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGZ1bmN0aW9uKCl7YS5yZWFkeVN0YXRlPT00P2EucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhKTpzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMTApfSgpfWVsc2UgYS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChLKGEpLGEpfWZ1bmN0aW9uIEsoYSl7dmFyIGM9UShcImRpdlwiKTtpZih5LndpbiYmeS5pZSljLmlubmVySFRNTD1hLmlubmVySFRNTDtlbHNle3ZhciBkPWEuZ2V0RWxlbWVudHNCeVRhZ05hbWUoYilbMF07aWYoZCl7dmFyIGU9ZC5jaGlsZE5vZGVzO2lmKGUpe3ZhciBmPWUubGVuZ3RoO2Zvcih2YXIgZz0wO2c8ZjtnKyspKGVbZ10ubm9kZVR5cGUhPTF8fGVbZ10ubm9kZU5hbWUhPVwiUEFSQU1cIikmJmVbZ10ubm9kZVR5cGUhPTgmJmMuYXBwZW5kQ2hpbGQoZVtnXS5jbG9uZU5vZGUoITApKX19fXJldHVybiBjfWZ1bmN0aW9uIEwoYyxkLGYpe3ZhciBnLGg9UChmKTtpZih5LndrJiZ5LndrPDMxMilyZXR1cm4gZztpZihoKXt0eXBlb2YgYy5pZD09YSYmKGMuaWQ9Zik7aWYoeS5pZSYmeS53aW4pe3ZhciBpPVwiXCI7Zm9yKHZhciBqIGluIGMpY1tqXSE9T2JqZWN0LnByb3RvdHlwZVtqXSYmKGoudG9Mb3dlckNhc2UoKT09XCJkYXRhXCI/ZC5tb3ZpZT1jW2pdOmoudG9Mb3dlckNhc2UoKT09XCJzdHlsZWNsYXNzXCI/aSs9JyBjbGFzcz1cIicrY1tqXSsnXCInOmoudG9Mb3dlckNhc2UoKSE9XCJjbGFzc2lkXCImJihpKz1cIiBcIitqKyc9XCInK2Nbal0rJ1wiJykpO3ZhciBrPVwiXCI7Zm9yKHZhciBsIGluIGQpZFtsXSE9T2JqZWN0LnByb3RvdHlwZVtsXSYmKGsrPSc8cGFyYW0gbmFtZT1cIicrbCsnXCIgdmFsdWU9XCInK2RbbF0rJ1wiIC8+Jyk7aC5vdXRlckhUTUw9JzxvYmplY3QgY2xhc3NpZD1cImNsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMFwiJytpK1wiPlwiK2srXCI8L29iamVjdD5cIixuW24ubGVuZ3RoXT1jLmlkLGc9UChjLmlkKX1lbHNle3ZhciBtPVEoYik7bS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsZSk7Zm9yKHZhciBvIGluIGMpY1tvXSE9T2JqZWN0LnByb3RvdHlwZVtvXSYmKG8udG9Mb3dlckNhc2UoKT09XCJzdHlsZWNsYXNzXCI/bS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGNbb10pOm8udG9Mb3dlckNhc2UoKSE9XCJjbGFzc2lkXCImJm0uc2V0QXR0cmlidXRlKG8sY1tvXSkpO2Zvcih2YXIgcCBpbiBkKWRbcF0hPU9iamVjdC5wcm90b3R5cGVbcF0mJnAudG9Mb3dlckNhc2UoKSE9XCJtb3ZpZVwiJiZNKG0scCxkW3BdKTtoLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG0saCksZz1tfX1yZXR1cm4gZ31mdW5jdGlvbiBNKGEsYixjKXt2YXIgZD1RKFwicGFyYW1cIik7ZC5zZXRBdHRyaWJ1dGUoXCJuYW1lXCIsYiksZC5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLGMpLGEuYXBwZW5kQ2hpbGQoZCl9ZnVuY3Rpb24gTihhKXt2YXIgYj1QKGEpO2ImJmIubm9kZU5hbWU9PVwiT0JKRUNUXCImJih5LmllJiZ5Lndpbj8oYi5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGZ1bmN0aW9uKCl7Yi5yZWFkeVN0YXRlPT00P08oYSk6c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKX0oKSk6Yi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGIpKX1mdW5jdGlvbiBPKGEpe3ZhciBiPVAoYSk7aWYoYil7Zm9yKHZhciBjIGluIGIpdHlwZW9mIGJbY109PVwiZnVuY3Rpb25cIiYmKGJbY109bnVsbCk7Yi5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGIpfX1mdW5jdGlvbiBQKGEpe3ZhciBiPW51bGw7dHJ5e2I9aS5nZXRFbGVtZW50QnlJZChhKX1jYXRjaChjKXt9cmV0dXJuIGJ9ZnVuY3Rpb24gUShhKXtyZXR1cm4gaS5jcmVhdGVFbGVtZW50KGEpfWZ1bmN0aW9uIFIoYSxiLGMpe2EuYXR0YWNoRXZlbnQoYixjKSxvW28ubGVuZ3RoXT1bYSxiLGNdfWZ1bmN0aW9uIFMoYSl7dmFyIGI9eS5wdixjPWEuc3BsaXQoXCIuXCIpO3JldHVybiBjWzBdPXBhcnNlSW50KGNbMF0sMTApLGNbMV09cGFyc2VJbnQoY1sxXSwxMCl8fDAsY1syXT1wYXJzZUludChjWzJdLDEwKXx8MCxiWzBdPmNbMF18fGJbMF09PWNbMF0mJmJbMV0+Y1sxXXx8YlswXT09Y1swXSYmYlsxXT09Y1sxXSYmYlsyXT49Y1syXT8hMDohMX1mdW5jdGlvbiBUKGMsZCxlLGYpe2lmKHkuaWUmJnkubWFjKXJldHVybjt2YXIgZz1pLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtpZighZylyZXR1cm47dmFyIGg9ZSYmdHlwZW9mIGU9PVwic3RyaW5nXCI/ZTpcInNjcmVlblwiO2YmJih2PW51bGwsdz1udWxsKTtpZighdnx8dyE9aCl7dmFyIGo9UShcInN0eWxlXCIpO2ouc2V0QXR0cmlidXRlKFwidHlwZVwiLFwidGV4dC9jc3NcIiksai5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLGgpLHY9Zy5hcHBlbmRDaGlsZChqKSx5LmllJiZ5LndpbiYmdHlwZW9mIGkuc3R5bGVTaGVldHMhPWEmJmkuc3R5bGVTaGVldHMubGVuZ3RoPjAmJih2PWkuc3R5bGVTaGVldHNbaS5zdHlsZVNoZWV0cy5sZW5ndGgtMV0pLHc9aH15LmllJiZ5Lndpbj92JiZ0eXBlb2Ygdi5hZGRSdWxlPT1iJiZ2LmFkZFJ1bGUoYyxkKTp2JiZ0eXBlb2YgaS5jcmVhdGVUZXh0Tm9kZSE9YSYmdi5hcHBlbmRDaGlsZChpLmNyZWF0ZVRleHROb2RlKGMrXCIge1wiK2QrXCJ9XCIpKX1mdW5jdGlvbiBVKGEsYil7aWYoIXgpcmV0dXJuO3ZhciBjPWI/XCJ2aXNpYmxlXCI6XCJoaWRkZW5cIjt0JiZQKGEpP1AoYSkuc3R5bGUudmlzaWJpbGl0eT1jOlQoXCIjXCIrYSxcInZpc2liaWxpdHk6XCIrYyl9ZnVuY3Rpb24gVihiKXt2YXIgYz0vW1xcXFxcXFwiPD5cXC47XS8sZD1jLmV4ZWMoYikhPW51bGw7cmV0dXJuIGQmJnR5cGVvZiBlbmNvZGVVUklDb21wb25lbnQhPWE/ZW5jb2RlVVJJQ29tcG9uZW50KGIpOmJ9dmFyIGE9XCJ1bmRlZmluZWRcIixiPVwib2JqZWN0XCIsYz1cIlNob2Nrd2F2ZSBGbGFzaFwiLGQ9XCJTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaFwiLGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiLGY9XCJTV0ZPYmplY3RFeHBySW5zdFwiLGc9XCJvbnJlYWR5c3RhdGVjaGFuZ2VcIixoPXdpbmRvdyxpPWRvY3VtZW50LGo9bmF2aWdhdG9yLGs9ITEsbD1bRF0sbT1bXSxuPVtdLG89W10scCxxLHIscyx0PSExLHU9ITEsdix3LHg9ITAseT1mdW5jdGlvbigpe3ZhciBmPXR5cGVvZiBpLmdldEVsZW1lbnRCeUlkIT1hJiZ0eXBlb2YgaS5nZXRFbGVtZW50c0J5VGFnTmFtZSE9YSYmdHlwZW9mIGkuY3JlYXRlRWxlbWVudCE9YSxnPWoudXNlckFnZW50LnRvTG93ZXJDYXNlKCksbD1qLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCksbT1sPy93aW4vLnRlc3QobCk6L3dpbi8udGVzdChnKSxuPWw/L21hYy8udGVzdChsKTovbWFjLy50ZXN0KGcpLG89L3dlYmtpdC8udGVzdChnKT9wYXJzZUZsb2F0KGcucmVwbGFjZSgvXi4qd2Via2l0XFwvKFxcZCsoXFwuXFxkKyk/KS4qJC8sXCIkMVwiKSk6ITEscD0hMSxxPVswLDAsMF0scj1udWxsO2lmKHR5cGVvZiBqLnBsdWdpbnMhPWEmJnR5cGVvZiBqLnBsdWdpbnNbY109PWIpcj1qLnBsdWdpbnNbY10uZGVzY3JpcHRpb24sciYmKHR5cGVvZiBqLm1pbWVUeXBlcz09YXx8IWoubWltZVR5cGVzW2VdfHwhIWoubWltZVR5cGVzW2VdLmVuYWJsZWRQbHVnaW4pJiYoaz0hMCxwPSExLHI9ci5yZXBsYWNlKC9eLipcXHMrKFxcUytcXHMrXFxTKyQpLyxcIiQxXCIpLHFbMF09cGFyc2VJbnQoci5yZXBsYWNlKC9eKC4qKVxcLi4qJC8sXCIkMVwiKSwxMCkscVsxXT1wYXJzZUludChyLnJlcGxhY2UoL14uKlxcLiguKilcXHMuKiQvLFwiJDFcIiksMTApLHFbMl09L1thLXpBLVpdLy50ZXN0KHIpP3BhcnNlSW50KHIucmVwbGFjZSgvXi4qW2EtekEtWl0rKC4qKSQvLFwiJDFcIiksMTApOjApO2Vsc2UgaWYodHlwZW9mIGhbW1wiQWN0aXZlXCJdLmNvbmNhdChcIk9iamVjdFwiKS5qb2luKFwiWFwiKV0hPWEpdHJ5e3ZhciBzPW5ldyh3aW5kb3dbW1wiQWN0aXZlXCJdLmNvbmNhdChcIk9iamVjdFwiKS5qb2luKFwiWFwiKV0pKGQpO3MmJihyPXMuR2V0VmFyaWFibGUoXCIkdmVyc2lvblwiKSxyJiYocD0hMCxyPXIuc3BsaXQoXCIgXCIpWzFdLnNwbGl0KFwiLFwiKSxxPVtwYXJzZUludChyWzBdLDEwKSxwYXJzZUludChyWzFdLDEwKSxwYXJzZUludChyWzJdLDEwKV0pKX1jYXRjaCh0KXt9cmV0dXJue3czOmYscHY6cSx3azpvLGllOnAsd2luOm0sbWFjOm59fSgpLHo9ZnVuY3Rpb24oKXtpZigheS53MylyZXR1cm47KHR5cGVvZiBpLnJlYWR5U3RhdGUhPWEmJmkucmVhZHlTdGF0ZT09XCJjb21wbGV0ZVwifHx0eXBlb2YgaS5yZWFkeVN0YXRlPT1hJiYoaS5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF18fGkuYm9keSkpJiZBKCksdHx8KHR5cGVvZiBpLmFkZEV2ZW50TGlzdGVuZXIhPWEmJmkuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixBLCExKSx5LmllJiZ5LndpbiYmKGkuYXR0YWNoRXZlbnQoZyxmdW5jdGlvbigpe2kucmVhZHlTdGF0ZT09XCJjb21wbGV0ZVwiJiYoaS5kZXRhY2hFdmVudChnLGFyZ3VtZW50cy5jYWxsZWUpLEEoKSl9KSxoPT10b3AmJmZ1bmN0aW9uKCl7aWYodClyZXR1cm47dHJ5e2kuZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsKFwibGVmdFwiKX1jYXRjaChhKXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMCk7cmV0dXJufUEoKX0oKSkseS53ayYmZnVuY3Rpb24oKXtpZih0KXJldHVybjtpZighL2xvYWRlZHxjb21wbGV0ZS8udGVzdChpLnJlYWR5U3RhdGUpKXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMCk7cmV0dXJufUEoKX0oKSxDKEEpKX0oKSxXPWZ1bmN0aW9uKCl7eS5pZSYmeS53aW4mJndpbmRvdy5hdHRhY2hFdmVudChcIm9udW5sb2FkXCIsZnVuY3Rpb24oKXt2YXIgYT1vLmxlbmd0aDtmb3IodmFyIGI9MDtiPGE7YisrKW9bYl1bMF0uZGV0YWNoRXZlbnQob1tiXVsxXSxvW2JdWzJdKTt2YXIgYz1uLmxlbmd0aDtmb3IodmFyIGQ9MDtkPGM7ZCsrKU4obltkXSk7Zm9yKHZhciBlIGluIHkpeVtlXT1udWxsO3k9bnVsbDtmb3IodmFyIGYgaW4gc3dmb2JqZWN0KXN3Zm9iamVjdFtmXT1udWxsO3N3Zm9iamVjdD1udWxsfSl9KCk7cmV0dXJue3JlZ2lzdGVyT2JqZWN0OmZ1bmN0aW9uKGEsYixjLGQpe2lmKHkudzMmJmEmJmIpe3ZhciBlPXt9O2UuaWQ9YSxlLnN3ZlZlcnNpb249YixlLmV4cHJlc3NJbnN0YWxsPWMsZS5jYWxsYmFja0ZuPWQsbVttLmxlbmd0aF09ZSxVKGEsITEpfWVsc2UgZCYmZCh7c3VjY2VzczohMSxpZDphfSl9LGdldE9iamVjdEJ5SWQ6ZnVuY3Rpb24oYSl7aWYoeS53MylyZXR1cm4gRyhhKX0sZW1iZWRTV0Y6ZnVuY3Rpb24oYyxkLGUsZixnLGgsaSxqLGssbCl7dmFyIG09e3N1Y2Nlc3M6ITEsaWQ6ZH07eS53MyYmISh5LndrJiZ5LndrPDMxMikmJmMmJmQmJmUmJmYmJmc/KFUoZCwhMSksQihmdW5jdGlvbigpe2UrPVwiXCIsZis9XCJcIjt2YXIgbj17fTtpZihrJiZ0eXBlb2Ygaz09PWIpZm9yKHZhciBvIGluIGspbltvXT1rW29dO24uZGF0YT1jLG4ud2lkdGg9ZSxuLmhlaWdodD1mO3ZhciBwPXt9O2lmKGomJnR5cGVvZiBqPT09Yilmb3IodmFyIHEgaW4gailwW3FdPWpbcV07aWYoaSYmdHlwZW9mIGk9PT1iKWZvcih2YXIgciBpbiBpKXR5cGVvZiBwLmZsYXNodmFycyE9YT9wLmZsYXNodmFycys9XCImXCIrcitcIj1cIitpW3JdOnAuZmxhc2h2YXJzPXIrXCI9XCIraVtyXTtpZihTKGcpKXt2YXIgcz1MKG4scCxkKTtuLmlkPT1kJiZVKGQsITApLG0uc3VjY2Vzcz0hMCxtLnJlZj1zfWVsc2V7aWYoaCYmSCgpKXtuLmRhdGE9aCxJKG4scCxkLGwpO3JldHVybn1VKGQsITApfWwmJmwobSl9KSk6bCYmbChtKX0sc3dpdGNoT2ZmQXV0b0hpZGVTaG93OmZ1bmN0aW9uKCl7eD0hMX0sdWE6eSxnZXRGbGFzaFBsYXllclZlcnNpb246ZnVuY3Rpb24oKXtyZXR1cm57bWFqb3I6eS5wdlswXSxtaW5vcjp5LnB2WzFdLHJlbGVhc2U6eS5wdlsyXX19LGhhc0ZsYXNoUGxheWVyVmVyc2lvbjpTLGNyZWF0ZVNXRjpmdW5jdGlvbihhLGIsYyl7cmV0dXJuIHkudzM/TChhLGIsYyk6dW5kZWZpbmVkfSxzaG93RXhwcmVzc0luc3RhbGw6ZnVuY3Rpb24oYSxiLGMsZCl7eS53MyYmSCgpJiZJKGEsYixjLGQpfSxyZW1vdmVTV0Y6ZnVuY3Rpb24oYSl7eS53MyYmTihhKX0sY3JlYXRlQ1NTOmZ1bmN0aW9uKGEsYixjLGQpe3kudzMmJlQoYSxiLGMsZCl9LGFkZERvbUxvYWRFdmVudDpCLGFkZExvYWRFdmVudDpDLGdldFF1ZXJ5UGFyYW1WYWx1ZTpmdW5jdGlvbihhKXt2YXIgYj1pLmxvY2F0aW9uLnNlYXJjaHx8aS5sb2NhdGlvbi5oYXNoO2lmKGIpey9cXD8vLnRlc3QoYikmJihiPWIuc3BsaXQoXCI/XCIpWzFdKTtpZihhPT1udWxsKXJldHVybiBWKGIpO3ZhciBjPWIuc3BsaXQoXCImXCIpO2Zvcih2YXIgZD0wO2Q8Yy5sZW5ndGg7ZCsrKWlmKGNbZF0uc3Vic3RyaW5nKDAsY1tkXS5pbmRleE9mKFwiPVwiKSk9PWEpcmV0dXJuIFYoY1tkXS5zdWJzdHJpbmcoY1tkXS5pbmRleE9mKFwiPVwiKSsxKSl9cmV0dXJuXCJcIn0sZXhwcmVzc0luc3RhbGxDYWxsYmFjazpmdW5jdGlvbigpe2lmKHUpe3ZhciBhPVAoZik7YSYmcCYmKGEucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQocCxhKSxxJiYoVShxLCEwKSx5LmllJiZ5LndpbiYmKHAuc3R5bGUuZGlzcGxheT1cImJsb2NrXCIpKSxyJiZyKHMpKSx1PSExfX19fSgpOyhmdW5jdGlvbigpe2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiB3aW5kb3d8fHdpbmRvdy5XZWJTb2NrZXQpcmV0dXJuO3ZhciBhPXdpbmRvdy5jb25zb2xlO2lmKCFhfHwhYS5sb2d8fCFhLmVycm9yKWE9e2xvZzpmdW5jdGlvbigpe30sZXJyb3I6ZnVuY3Rpb24oKXt9fTtpZighc3dmb2JqZWN0Lmhhc0ZsYXNoUGxheWVyVmVyc2lvbihcIjEwLjAuMFwiKSl7YS5lcnJvcihcIkZsYXNoIFBsYXllciA+PSAxMC4wLjAgaXMgcmVxdWlyZWQuXCIpO3JldHVybn1sb2NhdGlvbi5wcm90b2NvbD09XCJmaWxlOlwiJiZhLmVycm9yKFwiV0FSTklORzogd2ViLXNvY2tldC1qcyBkb2Vzbid0IHdvcmsgaW4gZmlsZTovLy8uLi4gVVJMIHVubGVzcyB5b3Ugc2V0IEZsYXNoIFNlY3VyaXR5IFNldHRpbmdzIHByb3Blcmx5LiBPcGVuIHRoZSBwYWdlIHZpYSBXZWIgc2VydmVyIGkuZS4gaHR0cDovLy4uLlwiKSxXZWJTb2NrZXQ9ZnVuY3Rpb24oYSxiLGMsZCxlKXt2YXIgZj10aGlzO2YuX19pZD1XZWJTb2NrZXQuX19uZXh0SWQrKyxXZWJTb2NrZXQuX19pbnN0YW5jZXNbZi5fX2lkXT1mLGYucmVhZHlTdGF0ZT1XZWJTb2NrZXQuQ09OTkVDVElORyxmLmJ1ZmZlcmVkQW1vdW50PTAsZi5fX2V2ZW50cz17fSxiP3R5cGVvZiBiPT1cInN0cmluZ1wiJiYoYj1bYl0pOmI9W10sc2V0VGltZW91dChmdW5jdGlvbigpe1dlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24oKXtXZWJTb2NrZXQuX19mbGFzaC5jcmVhdGUoZi5fX2lkLGEsYixjfHxudWxsLGR8fDAsZXx8bnVsbCl9KX0sMCl9LFdlYlNvY2tldC5wcm90b3R5cGUuc2VuZD1mdW5jdGlvbihhKXtpZih0aGlzLnJlYWR5U3RhdGU9PVdlYlNvY2tldC5DT05ORUNUSU5HKXRocm93XCJJTlZBTElEX1NUQVRFX0VSUjogV2ViIFNvY2tldCBjb25uZWN0aW9uIGhhcyBub3QgYmVlbiBlc3RhYmxpc2hlZFwiO3ZhciBiPVdlYlNvY2tldC5fX2ZsYXNoLnNlbmQodGhpcy5fX2lkLGVuY29kZVVSSUNvbXBvbmVudChhKSk7cmV0dXJuIGI8MD8hMDoodGhpcy5idWZmZXJlZEFtb3VudCs9YiwhMSl9LFdlYlNvY2tldC5wcm90b3R5cGUuY2xvc2U9ZnVuY3Rpb24oKXtpZih0aGlzLnJlYWR5U3RhdGU9PVdlYlNvY2tldC5DTE9TRUR8fHRoaXMucmVhZHlTdGF0ZT09V2ViU29ja2V0LkNMT1NJTkcpcmV0dXJuO3RoaXMucmVhZHlTdGF0ZT1XZWJTb2NrZXQuQ0xPU0lORyxXZWJTb2NrZXQuX19mbGFzaC5jbG9zZSh0aGlzLl9faWQpfSxXZWJTb2NrZXQucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXI9ZnVuY3Rpb24oYSxiLGMpe2EgaW4gdGhpcy5fX2V2ZW50c3x8KHRoaXMuX19ldmVudHNbYV09W10pLHRoaXMuX19ldmVudHNbYV0ucHVzaChiKX0sV2ViU29ja2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyPWZ1bmN0aW9uKGEsYixjKXtpZighKGEgaW4gdGhpcy5fX2V2ZW50cykpcmV0dXJuO3ZhciBkPXRoaXMuX19ldmVudHNbYV07Zm9yKHZhciBlPWQubGVuZ3RoLTE7ZT49MDstLWUpaWYoZFtlXT09PWIpe2Quc3BsaWNlKGUsMSk7YnJlYWt9fSxXZWJTb2NrZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQ9ZnVuY3Rpb24oYSl7dmFyIGI9dGhpcy5fX2V2ZW50c1thLnR5cGVdfHxbXTtmb3IodmFyIGM9MDtjPGIubGVuZ3RoOysrYyliW2NdKGEpO3ZhciBkPXRoaXNbXCJvblwiK2EudHlwZV07ZCYmZChhKX0sV2ViU29ja2V0LnByb3RvdHlwZS5fX2hhbmRsZUV2ZW50PWZ1bmN0aW9uKGEpe1wicmVhZHlTdGF0ZVwiaW4gYSYmKHRoaXMucmVhZHlTdGF0ZT1hLnJlYWR5U3RhdGUpLFwicHJvdG9jb2xcImluIGEmJih0aGlzLnByb3RvY29sPWEucHJvdG9jb2wpO3ZhciBiO2lmKGEudHlwZT09XCJvcGVuXCJ8fGEudHlwZT09XCJlcnJvclwiKWI9dGhpcy5fX2NyZWF0ZVNpbXBsZUV2ZW50KGEudHlwZSk7ZWxzZSBpZihhLnR5cGU9PVwiY2xvc2VcIiliPXRoaXMuX19jcmVhdGVTaW1wbGVFdmVudChcImNsb3NlXCIpO2Vsc2V7aWYoYS50eXBlIT1cIm1lc3NhZ2VcIil0aHJvd1widW5rbm93biBldmVudCB0eXBlOiBcIithLnR5cGU7dmFyIGM9ZGVjb2RlVVJJQ29tcG9uZW50KGEubWVzc2FnZSk7Yj10aGlzLl9fY3JlYXRlTWVzc2FnZUV2ZW50KFwibWVzc2FnZVwiLGMpfXRoaXMuZGlzcGF0Y2hFdmVudChiKX0sV2ViU29ja2V0LnByb3RvdHlwZS5fX2NyZWF0ZVNpbXBsZUV2ZW50PWZ1bmN0aW9uKGEpe2lmKGRvY3VtZW50LmNyZWF0ZUV2ZW50JiZ3aW5kb3cuRXZlbnQpe3ZhciBiPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7cmV0dXJuIGIuaW5pdEV2ZW50KGEsITEsITEpLGJ9cmV0dXJue3R5cGU6YSxidWJibGVzOiExLGNhbmNlbGFibGU6ITF9fSxXZWJTb2NrZXQucHJvdG90eXBlLl9fY3JlYXRlTWVzc2FnZUV2ZW50PWZ1bmN0aW9uKGEsYil7aWYoZG9jdW1lbnQuY3JlYXRlRXZlbnQmJndpbmRvdy5NZXNzYWdlRXZlbnQmJiF3aW5kb3cub3BlcmEpe3ZhciBjPWRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiTWVzc2FnZUV2ZW50XCIpO3JldHVybiBjLmluaXRNZXNzYWdlRXZlbnQoXCJtZXNzYWdlXCIsITEsITEsYixudWxsLG51bGwsd2luZG93LG51bGwpLGN9cmV0dXJue3R5cGU6YSxkYXRhOmIsYnViYmxlczohMSxjYW5jZWxhYmxlOiExfX0sV2ViU29ja2V0LkNPTk5FQ1RJTkc9MCxXZWJTb2NrZXQuT1BFTj0xLFdlYlNvY2tldC5DTE9TSU5HPTIsV2ViU29ja2V0LkNMT1NFRD0zLFdlYlNvY2tldC5fX2ZsYXNoPW51bGwsV2ViU29ja2V0Ll9faW5zdGFuY2VzPXt9LFdlYlNvY2tldC5fX3Rhc2tzPVtdLFdlYlNvY2tldC5fX25leHRJZD0wLFdlYlNvY2tldC5sb2FkRmxhc2hQb2xpY3lGaWxlPWZ1bmN0aW9uKGEpe1dlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24oKXtXZWJTb2NrZXQuX19mbGFzaC5sb2FkTWFudWFsUG9saWN5RmlsZShhKX0pfSxXZWJTb2NrZXQuX19pbml0aWFsaXplPWZ1bmN0aW9uKCl7aWYoV2ViU29ja2V0Ll9fZmxhc2gpcmV0dXJuO1dlYlNvY2tldC5fX3N3ZkxvY2F0aW9uJiYod2luZG93LldFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OPVdlYlNvY2tldC5fX3N3ZkxvY2F0aW9uKTtpZighd2luZG93LldFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OKXthLmVycm9yKFwiW1dlYlNvY2tldF0gc2V0IFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OIHRvIGxvY2F0aW9uIG9mIFdlYlNvY2tldE1haW4uc3dmXCIpO3JldHVybn12YXIgYj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2IuaWQ9XCJ3ZWJTb2NrZXRDb250YWluZXJcIixiLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIixXZWJTb2NrZXQuX19pc0ZsYXNoTGl0ZSgpPyhiLnN0eWxlLmxlZnQ9XCIwcHhcIixiLnN0eWxlLnRvcD1cIjBweFwiKTooYi5zdHlsZS5sZWZ0PVwiLTEwMHB4XCIsYi5zdHlsZS50b3A9XCItMTAwcHhcIik7dmFyIGM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtjLmlkPVwid2ViU29ja2V0Rmxhc2hcIixiLmFwcGVuZENoaWxkKGMpLGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoYiksc3dmb2JqZWN0LmVtYmVkU1dGKFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OLFwid2ViU29ja2V0Rmxhc2hcIixcIjFcIixcIjFcIixcIjEwLjAuMFwiLG51bGwsbnVsbCx7aGFzUHJpb3JpdHk6ITAsc3dsaXZlY29ubmVjdDohMCxhbGxvd1NjcmlwdEFjY2VzczpcImFsd2F5c1wifSxudWxsLGZ1bmN0aW9uKGIpe2Iuc3VjY2Vzc3x8YS5lcnJvcihcIltXZWJTb2NrZXRdIHN3Zm9iamVjdC5lbWJlZFNXRiBmYWlsZWRcIil9KX0sV2ViU29ja2V0Ll9fb25GbGFzaEluaXRpYWxpemVkPWZ1bmN0aW9uKCl7c2V0VGltZW91dChmdW5jdGlvbigpe1dlYlNvY2tldC5fX2ZsYXNoPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2ViU29ja2V0Rmxhc2hcIiksV2ViU29ja2V0Ll9fZmxhc2guc2V0Q2FsbGVyVXJsKGxvY2F0aW9uLmhyZWYpLFdlYlNvY2tldC5fX2ZsYXNoLnNldERlYnVnKCEhd2luZG93LldFQl9TT0NLRVRfREVCVUcpO2Zvcih2YXIgYT0wO2E8V2ViU29ja2V0Ll9fdGFza3MubGVuZ3RoOysrYSlXZWJTb2NrZXQuX190YXNrc1thXSgpO1dlYlNvY2tldC5fX3Rhc2tzPVtdfSwwKX0sV2ViU29ja2V0Ll9fb25GbGFzaEV2ZW50PWZ1bmN0aW9uKCl7cmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24oKXt0cnl7dmFyIGI9V2ViU29ja2V0Ll9fZmxhc2gucmVjZWl2ZUV2ZW50cygpO2Zvcih2YXIgYz0wO2M8Yi5sZW5ndGg7KytjKVdlYlNvY2tldC5fX2luc3RhbmNlc1tiW2NdLndlYlNvY2tldElkXS5fX2hhbmRsZUV2ZW50KGJbY10pfWNhdGNoKGQpe2EuZXJyb3IoZCl9fSwwKSwhMH0sV2ViU29ja2V0Ll9fbG9nPWZ1bmN0aW9uKGIpe2EubG9nKGRlY29kZVVSSUNvbXBvbmVudChiKSl9LFdlYlNvY2tldC5fX2Vycm9yPWZ1bmN0aW9uKGIpe2EuZXJyb3IoZGVjb2RlVVJJQ29tcG9uZW50KGIpKX0sV2ViU29ja2V0Ll9fYWRkVGFzaz1mdW5jdGlvbihhKXtXZWJTb2NrZXQuX19mbGFzaD9hKCk6V2ViU29ja2V0Ll9fdGFza3MucHVzaChhKX0sV2ViU29ja2V0Ll9faXNGbGFzaExpdGU9ZnVuY3Rpb24oKXtpZighd2luZG93Lm5hdmlnYXRvcnx8IXdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzKXJldHVybiExO3ZhciBhPXdpbmRvdy5uYXZpZ2F0b3IubWltZVR5cGVzW1wiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIl07cmV0dXJuIWF8fCFhLmVuYWJsZWRQbHVnaW58fCFhLmVuYWJsZWRQbHVnaW4uZmlsZW5hbWU/ITE6YS5lbmFibGVkUGx1Z2luLmZpbGVuYW1lLm1hdGNoKC9mbGFzaGxpdGUvaSk/ITA6ITF9LHdpbmRvdy5XRUJfU09DS0VUX0RJU0FCTEVfQVVUT19JTklUSUFMSVpBVElPTnx8KHdpbmRvdy5hZGRFdmVudExpc3RlbmVyP3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLGZ1bmN0aW9uKCl7V2ViU29ja2V0Ll9faW5pdGlhbGl6ZSgpfSwhMSk6d2luZG93LmF0dGFjaEV2ZW50KFwib25sb2FkXCIsZnVuY3Rpb24oKXtXZWJTb2NrZXQuX19pbml0aWFsaXplKCl9KSl9KSgpLGZ1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKGEpe2lmKCFhKXJldHVybjtiLlRyYW5zcG9ydC5hcHBseSh0aGlzLGFyZ3VtZW50cyksdGhpcy5zZW5kQnVmZmVyPVtdfWZ1bmN0aW9uIGUoKXt9YS5YSFI9ZCxiLnV0aWwuaW5oZXJpdChkLGIuVHJhbnNwb3J0KSxkLnByb3RvdHlwZS5vcGVuPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc29ja2V0LnNldEJ1ZmZlcighMSksdGhpcy5vbk9wZW4oKSx0aGlzLmdldCgpLHRoaXMuc2V0Q2xvc2VUaW1lb3V0KCksdGhpc30sZC5wcm90b3R5cGUucGF5bG9hZD1mdW5jdGlvbihhKXt2YXIgYz1bXTtmb3IodmFyIGQ9MCxlPWEubGVuZ3RoO2Q8ZTtkKyspYy5wdXNoKGIucGFyc2VyLmVuY29kZVBhY2tldChhW2RdKSk7dGhpcy5zZW5kKGIucGFyc2VyLmVuY29kZVBheWxvYWQoYykpfSxkLnByb3RvdHlwZS5zZW5kPWZ1bmN0aW9uKGEpe3JldHVybiB0aGlzLnBvc3QoYSksdGhpc30sZC5wcm90b3R5cGUucG9zdD1mdW5jdGlvbihhKXtmdW5jdGlvbiBkKCl7dGhpcy5yZWFkeVN0YXRlPT00JiYodGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2U9ZSxiLnBvc3Rpbmc9ITEsdGhpcy5zdGF0dXM9PTIwMD9iLnNvY2tldC5zZXRCdWZmZXIoITEpOmIub25DbG9zZSgpKX1mdW5jdGlvbiBmKCl7dGhpcy5vbmxvYWQ9ZSxiLnNvY2tldC5zZXRCdWZmZXIoITEpfXZhciBiPXRoaXM7dGhpcy5zb2NrZXQuc2V0QnVmZmVyKCEwKSx0aGlzLnNlbmRYSFI9dGhpcy5yZXF1ZXN0KFwiUE9TVFwiKSxjLlhEb21haW5SZXF1ZXN0JiZ0aGlzLnNlbmRYSFIgaW5zdGFuY2VvZiBYRG9tYWluUmVxdWVzdD90aGlzLnNlbmRYSFIub25sb2FkPXRoaXMuc2VuZFhIUi5vbmVycm9yPWY6dGhpcy5zZW5kWEhSLm9ucmVhZHlzdGF0ZWNoYW5nZT1kLHRoaXMuc2VuZFhIUi5zZW5kKGEpfSxkLnByb3RvdHlwZS5jbG9zZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLm9uQ2xvc2UoKSx0aGlzfSxkLnByb3RvdHlwZS5yZXF1ZXN0PWZ1bmN0aW9uKGEpe3ZhciBjPWIudXRpbC5yZXF1ZXN0KHRoaXMuc29ja2V0LmlzWERvbWFpbigpKSxkPWIudXRpbC5xdWVyeSh0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5LFwidD1cIisgKyhuZXcgRGF0ZSkpO2Mub3BlbihhfHxcIkdFVFwiLHRoaXMucHJlcGFyZVVybCgpK2QsITApO2lmKGE9PVwiUE9TVFwiKXRyeXtjLnNldFJlcXVlc3RIZWFkZXI/Yy5zZXRSZXF1ZXN0SGVhZGVyKFwiQ29udGVudC10eXBlXCIsXCJ0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLThcIik6Yy5jb250ZW50VHlwZT1cInRleHQvcGxhaW5cIn1jYXRjaChlKXt9cmV0dXJuIGN9LGQucHJvdG90eXBlLnNjaGVtZT1mdW5jdGlvbigpe3JldHVybiB0aGlzLnNvY2tldC5vcHRpb25zLnNlY3VyZT9cImh0dHBzXCI6XCJodHRwXCJ9LGQuY2hlY2s9ZnVuY3Rpb24oYSxkKXt0cnl7dmFyIGU9Yi51dGlsLnJlcXVlc3QoZCksZj1jLlhEb21haW5SZXF1ZXN0JiZlIGluc3RhbmNlb2YgWERvbWFpblJlcXVlc3QsZz1hJiZhLm9wdGlvbnMmJmEub3B0aW9ucy5zZWN1cmU/XCJodHRwczpcIjpcImh0dHA6XCIsaD1jLmxvY2F0aW9uJiZnIT1jLmxvY2F0aW9uLnByb3RvY29sO2lmKGUmJighZnx8IWgpKXJldHVybiEwfWNhdGNoKGkpe31yZXR1cm4hMX0sZC54ZG9tYWluQ2hlY2s9ZnVuY3Rpb24oYSl7cmV0dXJuIGQuY2hlY2soYSwhMCl9fShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW8uVHJhbnNwb3J0Om1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMsdGhpcyksZnVuY3Rpb24oYSxiKXtmdW5jdGlvbiBjKGEpe2IuVHJhbnNwb3J0LlhIUi5hcHBseSh0aGlzLGFyZ3VtZW50cyl9YS5odG1sZmlsZT1jLGIudXRpbC5pbmhlcml0KGMsYi5UcmFuc3BvcnQuWEhSKSxjLnByb3RvdHlwZS5uYW1lPVwiaHRtbGZpbGVcIixjLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oKXt0aGlzLmRvYz1uZXcod2luZG93W1tcIkFjdGl2ZVwiXS5jb25jYXQoXCJPYmplY3RcIikuam9pbihcIlhcIildKShcImh0bWxmaWxlXCIpLHRoaXMuZG9jLm9wZW4oKSx0aGlzLmRvYy53cml0ZShcIjxodG1sPjwvaHRtbD5cIiksdGhpcy5kb2MuY2xvc2UoKSx0aGlzLmRvYy5wYXJlbnRXaW5kb3cucz10aGlzO3ZhciBhPXRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7YS5jbGFzc05hbWU9XCJzb2NrZXRpb1wiLHRoaXMuZG9jLmJvZHkuYXBwZW5kQ2hpbGQoYSksdGhpcy5pZnJhbWU9dGhpcy5kb2MuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKSxhLmFwcGVuZENoaWxkKHRoaXMuaWZyYW1lKTt2YXIgYz10aGlzLGQ9Yi51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnksXCJ0PVwiKyArKG5ldyBEYXRlKSk7dGhpcy5pZnJhbWUuc3JjPXRoaXMucHJlcGFyZVVybCgpK2QsYi51dGlsLm9uKHdpbmRvdyxcInVubG9hZFwiLGZ1bmN0aW9uKCl7Yy5kZXN0cm95KCl9KX0sYy5wcm90b3R5cGUuXz1mdW5jdGlvbihhLGIpe2E9YS5yZXBsYWNlKC9cXFxcXFwvL2csXCIvXCIpLHRoaXMub25EYXRhKGEpO3RyeXt2YXIgYz1iLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpWzBdO2MucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjKX1jYXRjaChkKXt9fSxjLnByb3RvdHlwZS5kZXN0cm95PWZ1bmN0aW9uKCl7aWYodGhpcy5pZnJhbWUpe3RyeXt0aGlzLmlmcmFtZS5zcmM9XCJhYm91dDpibGFua1wifWNhdGNoKGEpe310aGlzLmRvYz1udWxsLHRoaXMuaWZyYW1lLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5pZnJhbWUpLHRoaXMuaWZyYW1lPW51bGwsQ29sbGVjdEdhcmJhZ2UoKX19LGMucHJvdG90eXBlLmNsb3NlPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZGVzdHJveSgpLGIuVHJhbnNwb3J0LlhIUi5wcm90b3R5cGUuY2xvc2UuY2FsbCh0aGlzKX0sYy5jaGVjaz1mdW5jdGlvbihhKXtpZih0eXBlb2Ygd2luZG93IT1cInVuZGVmaW5lZFwiJiZbXCJBY3RpdmVcIl0uY29uY2F0KFwiT2JqZWN0XCIpLmpvaW4oXCJYXCIpaW4gd2luZG93KXRyeXt2YXIgYz1uZXcod2luZG93W1tcIkFjdGl2ZVwiXS5jb25jYXQoXCJPYmplY3RcIikuam9pbihcIlhcIildKShcImh0bWxmaWxlXCIpO3JldHVybiBjJiZiLlRyYW5zcG9ydC5YSFIuY2hlY2soYSl9Y2F0Y2goZCl7fXJldHVybiExfSxjLnhkb21haW5DaGVjaz1mdW5jdGlvbigpe3JldHVybiExfSxiLnRyYW5zcG9ydHMucHVzaChcImh0bWxmaWxlXCIpfShcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW8uVHJhbnNwb3J0Om1vZHVsZS5leHBvcnRzLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pbzptb2R1bGUucGFyZW50LmV4cG9ydHMpLGZ1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBkKCl7Yi5UcmFuc3BvcnQuWEhSLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1mdW5jdGlvbiBlKCl7fWFbXCJ4aHItcG9sbGluZ1wiXT1kLGIudXRpbC5pbmhlcml0KGQsYi5UcmFuc3BvcnQuWEhSKSxiLnV0aWwubWVyZ2UoZCxiLlRyYW5zcG9ydC5YSFIpLGQucHJvdG90eXBlLm5hbWU9XCJ4aHItcG9sbGluZ1wiLGQucHJvdG90eXBlLmhlYXJ0YmVhdHM9ZnVuY3Rpb24oKXtyZXR1cm4hMX0sZC5wcm90b3R5cGUub3Blbj1mdW5jdGlvbigpe3ZhciBhPXRoaXM7cmV0dXJuIGIuVHJhbnNwb3J0LlhIUi5wcm90b3R5cGUub3Blbi5jYWxsKGEpLCExfSxkLnByb3RvdHlwZS5nZXQ9ZnVuY3Rpb24oKXtmdW5jdGlvbiBiKCl7dGhpcy5yZWFkeVN0YXRlPT00JiYodGhpcy5vbnJlYWR5c3RhdGVjaGFuZ2U9ZSx0aGlzLnN0YXR1cz09MjAwPyhhLm9uRGF0YSh0aGlzLnJlc3BvbnNlVGV4dCksYS5nZXQoKSk6YS5vbkNsb3NlKCkpfWZ1bmN0aW9uIGQoKXt0aGlzLm9ubG9hZD1lLHRoaXMub25lcnJvcj1lLGEucmV0cnlDb3VudGVyPTEsYS5vbkRhdGEodGhpcy5yZXNwb25zZVRleHQpLGEuZ2V0KCl9ZnVuY3Rpb24gZigpe2EucmV0cnlDb3VudGVyKyssIWEucmV0cnlDb3VudGVyfHxhLnJldHJ5Q291bnRlcj4zP2Eub25DbG9zZSgpOmEuZ2V0KCl9aWYoIXRoaXMuaXNPcGVuKXJldHVybjt2YXIgYT10aGlzO3RoaXMueGhyPXRoaXMucmVxdWVzdCgpLGMuWERvbWFpblJlcXVlc3QmJnRoaXMueGhyIGluc3RhbmNlb2YgWERvbWFpblJlcXVlc3Q/KHRoaXMueGhyLm9ubG9hZD1kLHRoaXMueGhyLm9uZXJyb3I9Zik6dGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlPWIsdGhpcy54aHIuc2VuZChudWxsKX0sZC5wcm90b3R5cGUub25DbG9zZT1mdW5jdGlvbigpe2IuVHJhbnNwb3J0LlhIUi5wcm90b3R5cGUub25DbG9zZS5jYWxsKHRoaXMpO2lmKHRoaXMueGhyKXt0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2U9dGhpcy54aHIub25sb2FkPXRoaXMueGhyLm9uZXJyb3I9ZTt0cnl7dGhpcy54aHIuYWJvcnQoKX1jYXRjaChhKXt9dGhpcy54aHI9bnVsbH19LGQucHJvdG90eXBlLnJlYWR5PWZ1bmN0aW9uKGEsYyl7dmFyIGQ9dGhpcztiLnV0aWwuZGVmZXIoZnVuY3Rpb24oKXtjLmNhbGwoZCl9KX0sYi50cmFuc3BvcnRzLnB1c2goXCJ4aHItcG9sbGluZ1wiKX0oXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvLlRyYW5zcG9ydDptb2R1bGUuZXhwb3J0cyxcInVuZGVmaW5lZFwiIT10eXBlb2YgaW8/aW86bW9kdWxlLnBhcmVudC5leHBvcnRzLHRoaXMpLGZ1bmN0aW9uKGEsYixjKXtmdW5jdGlvbiBlKGEpe2IuVHJhbnNwb3J0W1wieGhyLXBvbGxpbmdcIl0uYXBwbHkodGhpcyxhcmd1bWVudHMpLHRoaXMuaW5kZXg9Yi5qLmxlbmd0aDt2YXIgYz10aGlzO2Iuai5wdXNoKGZ1bmN0aW9uKGEpe2MuXyhhKX0pfXZhciBkPWMuZG9jdW1lbnQmJlwiTW96QXBwZWFyYW5jZVwiaW4gYy5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7YVtcImpzb25wLXBvbGxpbmdcIl09ZSxiLnV0aWwuaW5oZXJpdChlLGIuVHJhbnNwb3J0W1wieGhyLXBvbGxpbmdcIl0pLGUucHJvdG90eXBlLm5hbWU9XCJqc29ucC1wb2xsaW5nXCIsZS5wcm90b3R5cGUucG9zdD1mdW5jdGlvbihhKXtmdW5jdGlvbiBpKCl7aigpLGMuc29ja2V0LnNldEJ1ZmZlcighMSl9ZnVuY3Rpb24gaigpe2MuaWZyYW1lJiZjLmZvcm0ucmVtb3ZlQ2hpbGQoYy5pZnJhbWUpO3RyeXtoPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJzxpZnJhbWUgbmFtZT1cIicrYy5pZnJhbWVJZCsnXCI+Jyl9Y2F0Y2goYSl7aD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpLGgubmFtZT1jLmlmcmFtZUlkfWguaWQ9Yy5pZnJhbWVJZCxjLmZvcm0uYXBwZW5kQ2hpbGQoaCksYy5pZnJhbWU9aH12YXIgYz10aGlzLGQ9Yi51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnksXCJ0PVwiKyArKG5ldyBEYXRlKStcIiZpPVwiK3RoaXMuaW5kZXgpO2lmKCF0aGlzLmZvcm0pe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmb3JtXCIpLGY9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpLGc9dGhpcy5pZnJhbWVJZD1cInNvY2tldGlvX2lmcmFtZV9cIit0aGlzLmluZGV4LGg7ZS5jbGFzc05hbWU9XCJzb2NrZXRpb1wiLGUuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLGUuc3R5bGUudG9wPVwiMHB4XCIsZS5zdHlsZS5sZWZ0PVwiMHB4XCIsZS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGUudGFyZ2V0PWcsZS5tZXRob2Q9XCJQT1NUXCIsZS5zZXRBdHRyaWJ1dGUoXCJhY2NlcHQtY2hhcnNldFwiLFwidXRmLThcIiksZi5uYW1lPVwiZFwiLGUuYXBwZW5kQ2hpbGQoZiksZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlKSx0aGlzLmZvcm09ZSx0aGlzLmFyZWE9Zn10aGlzLmZvcm0uYWN0aW9uPXRoaXMucHJlcGFyZVVybCgpK2QsaigpLHRoaXMuYXJlYS52YWx1ZT1iLkpTT04uc3RyaW5naWZ5KGEpO3RyeXt0aGlzLmZvcm0uc3VibWl0KCl9Y2F0Y2goayl7fXRoaXMuaWZyYW1lLmF0dGFjaEV2ZW50P2gub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7Yy5pZnJhbWUucmVhZHlTdGF0ZT09XCJjb21wbGV0ZVwiJiZpKCl9OnRoaXMuaWZyYW1lLm9ubG9hZD1pLHRoaXMuc29ja2V0LnNldEJ1ZmZlcighMCl9LGUucHJvdG90eXBlLmdldD1mdW5jdGlvbigpe3ZhciBhPXRoaXMsYz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpLGU9Yi51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnksXCJ0PVwiKyArKG5ldyBEYXRlKStcIiZpPVwiK3RoaXMuaW5kZXgpO3RoaXMuc2NyaXB0JiYodGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCksdGhpcy5zY3JpcHQ9bnVsbCksYy5hc3luYz0hMCxjLnNyYz10aGlzLnByZXBhcmVVcmwoKStlLGMub25lcnJvcj1mdW5jdGlvbigpe2Eub25DbG9zZSgpfTt2YXIgZj1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKVswXTtmLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGMsZiksdGhpcy5zY3JpcHQ9YyxkJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7dmFyIGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGEpLGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoYSl9LDEwMCl9LGUucHJvdG90eXBlLl89ZnVuY3Rpb24oYSl7cmV0dXJuIHRoaXMub25EYXRhKGEpLHRoaXMuaXNPcGVuJiZ0aGlzLmdldCgpLHRoaXN9LGUucHJvdG90eXBlLnJlYWR5PWZ1bmN0aW9uKGEsYyl7dmFyIGU9dGhpcztpZighZClyZXR1cm4gYy5jYWxsKHRoaXMpO2IudXRpbC5sb2FkKGZ1bmN0aW9uKCl7Yy5jYWxsKGUpfSl9LGUuY2hlY2s9ZnVuY3Rpb24oKXtyZXR1cm5cImRvY3VtZW50XCJpbiBjfSxlLnhkb21haW5DaGVjaz1mdW5jdGlvbigpe3JldHVybiEwfSxiLnRyYW5zcG9ydHMucHVzaChcImpzb25wLXBvbGxpbmdcIil9KFwidW5kZWZpbmVkXCIhPXR5cGVvZiBpbz9pby5UcmFuc3BvcnQ6bW9kdWxlLmV4cG9ydHMsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGlvP2lvOm1vZHVsZS5wYXJlbnQuZXhwb3J0cyx0aGlzKSx0eXBlb2YgZGVmaW5lPT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQmJmRlZmluZShbXSxmdW5jdGlvbigpe3JldHVybiBpb30pfSkoKSIsImV4cG9ydHMucnVuID0gZnVuY3Rpb24ob3B0aW9ucykge1xuXHR2YXIgZG9Ob3RoaW5nPWZ1bmN0aW9uKCl7fTtcblx0dmFyIHBhc3MgPSBvcHRpb25zLnBhc3N8fGRvTm90aGluZztcblx0dmFyIGZhaWwgPSBvcHRpb25zLmZhaWx8fGRvTm90aGluZztcblx0dmFyIGVuZCA9IG9wdGlvbnMuZW5kfHxkb05vdGhpbmc7XG5cdHZhciBtb2NoYSA9IG9wdGlvbnMuaW5zdGFuY2U7XG5cblx0ZnVuY3Rpb24gUmVwb3J0ZXIocnVubmVyKSB7XG5cblx0XHRydW5uZXIub24oJ3Bhc3MnLCBmdW5jdGlvbih0ZXN0KSB7XG5cdFx0XHRwYXNzKHtcblx0XHRcdFx0dGl0bGU6IHRlc3QudGl0bGUsXG5cdFx0XHRcdGZ1bGxUaXRsZTogdGVzdC5mdWxsVGl0bGUoKSxcblx0XHRcdFx0ZHVyYXRpb246IHRlc3QuZHVyYXRpb24sXG5cdFx0XHR9KVxuXHRcdH0pO1xuXG5cdFx0cnVubmVyLm9uKCdmYWlsJywgZnVuY3Rpb24odGVzdCwgZXJyKSB7XG5cdFx0XHRmYWlsKHtcblx0XHRcdFx0dGl0bGU6IHRlc3QudGl0bGUsXG5cdFx0XHRcdGZ1bGxUaXRsZTogdGVzdC5mdWxsVGl0bGUoKSxcblx0XHRcdFx0ZHVyYXRpb246IHRlc3QuZHVyYXRpb24sXG5cdFx0XHRcdGVycm9yOiBlcnIubWVzc2FnZVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRydW5uZXIub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZW5kKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRjb25zb2xlLmxvZygnaGFoYWhhJylcblx0bW9jaGEucmVwb3J0ZXIoUmVwb3J0ZXIpO1xuXHRtb2NoYS5ydW4oKTtcbn0iLCJleHBvcnRzLnJ1biA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0dmFyIGRvTm90aGluZyA9IGZ1bmN0aW9uKCkge307XG5cdHZhciBwYXNzID0gb3B0aW9ucy5wYXNzIHx8IGRvTm90aGluZztcblx0dmFyIGZhaWwgPSBvcHRpb25zLmZhaWwgfHwgZG9Ob3RoaW5nO1xuXHR2YXIgZW5kID0gb3B0aW9ucy5lbmQgfHwgZG9Ob3RoaW5nO1xuXHR2YXIgd2luZG93ID0gb3B0aW9ucy5pbnN0YW5jZTtcblxuXHR3aW5kb3cub25lcnJvciA9IGZ1bmN0aW9uKGVycm9yLCB1cmwsIGxpbmUpIHtcblx0XHRmYWlsKHtcblx0XHRcdHRpdGxlOiBlcnJvcixcblx0XHRcdGZ1bGxUaXRsZTogZXJyb3IsXG5cdFx0XHRkdXJhdGlvbjogMCxcblx0XHRcdGVycm9yOiAnRVJSOicgKyBlcnJvciArICcgTElORTonICsgbGluZVxuXHRcdH0pXG5cdH07XG5cblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRlbmQoKTtcblx0fSwgNTAwMCk7XG59Il19
