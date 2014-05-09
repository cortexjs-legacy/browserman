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
},{}],3:[function(require,module,exports){
var io = require('socket.io-client');
var browser = require('bowser').browser;
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
	var jobId = node.getAttribute('data-jobid');
	var screenshot = node.getAttribute('data-screenshot');

	var connected = false;
	var completed = false;

	var self = this;

	if (!jobId) {
		return;
	}

	// init reporter
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
			completed = true;
		}
	});

	// connect to server
	var socket = io.connect('http://' + server + '/tester');
	socket.on('connect', function() {
		connected = true;
	});
	
	// when connected and completed, send result to server
	var interval = setInterval(function() {
		if (!connected || !completed) {
			return;
		}
		if (screenshot == "true") {
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
},{"./lib/canvas2image":4,"./lib/html2canvas":5,"./reporter/mocha":6,"./reporter/plain":7,"bowser":1,"socket.io-client":2}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
exports.run = function(options) {
	var doNothing = function() {};
	var pass = options.pass || doNothing;
	var fail = options.fail || doNothing;
	var end = options.end || doNothing;
	var mocha = options.instance;
	
	window.onerror = function(error, url, line) {
		fail({
			title: error,
			fullTitle: error,
			duration: 0,
			err: {
				message: 'URL:' + url + ' LINE:' + line,
				stack: ''
			}
		})
	};

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
				err: {
					message: err.message,
					stack: err.stack
				}
			});
		});

		runner.on('end', function() {
			end();
		});
	}

	mocha.reporter(Reporter);
	//mocha.run();
}
},{}],7:[function(require,module,exports){
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
			err: {
				message: 'URL:' + url + ' LINE:' + line,
				stack: ''
			}
		})
	};

	setTimeout(function() {
		end();
	}, 5000);
}
},{}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvYm93c2VyL2Jvd3Nlci5qcyIsIi9Vc2Vycy9sdGViZWFuL0Rlc2t0b3Avbm9kZWpzIHdvcmtzcGFjZS9icm93c2VybWFuL25vZGVfbW9kdWxlcy9zb2NrZXQuaW8tY2xpZW50L2Rpc3Qvc29ja2V0LmlvLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9mYWtlX2E2NWY2YzJmLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9saWIvY2FudmFzMmltYWdlLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9saWIvaHRtbDJjYW52YXMuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9wdWJsaWMvanMvZGV2L3JlcG9ydGVyL21vY2hhLmpzIiwiL1VzZXJzL2x0ZWJlYW4vRGVza3RvcC9ub2RlanMgd29ya3NwYWNlL2Jyb3dzZXJtYW4vcHVibGljL2pzL2Rldi9yZXBvcnRlci9wbGFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2h5SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdnpGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyohXG4gICogQm93c2VyIC0gYSBicm93c2VyIGRldGVjdG9yXG4gICogaHR0cHM6Ly9naXRodWIuY29tL2RlZC9ib3dzZXJcbiAgKiBNSVQgTGljZW5zZSB8IChjKSBEdXN0aW4gRGlheiAyMDE0XG4gICovXG5cbiFmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbikge1xuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHNbJ2Jyb3dzZXInXSA9IGRlZmluaXRpb24oKVxuICBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicpIGRlZmluZShkZWZpbml0aW9uKVxuICBlbHNlIHRoaXNbbmFtZV0gPSBkZWZpbml0aW9uKClcbn0oJ2Jvd3NlcicsIGZ1bmN0aW9uICgpIHtcbiAgLyoqXG4gICAgKiBTZWUgdXNlcmFnZW50cy5qcyBmb3IgZXhhbXBsZXMgb2YgbmF2aWdhdG9yLnVzZXJBZ2VudFxuICAgICovXG5cbiAgdmFyIHQgPSB0cnVlXG5cbiAgZnVuY3Rpb24gZGV0ZWN0KHVhKSB7XG5cbiAgICBmdW5jdGlvbiBnZXRGaXJzdE1hdGNoKHJlZ2V4KSB7XG4gICAgICB2YXIgbWF0Y2ggPSB1YS5tYXRjaChyZWdleCk7XG4gICAgICByZXR1cm4gKG1hdGNoICYmIG1hdGNoLmxlbmd0aCA+IDEgJiYgbWF0Y2hbMV0pIHx8ICcnO1xuICAgIH1cblxuICAgIHZhciBpb3NkZXZpY2UgPSBnZXRGaXJzdE1hdGNoKC8oaXBvZHxpcGhvbmV8aXBhZCkvaSkudG9Mb3dlckNhc2UoKVxuICAgICAgLCBsaWtlQW5kcm9pZCA9IC9saWtlIGFuZHJvaWQvaS50ZXN0KHVhKVxuICAgICAgLCBhbmRyb2lkID0gIWxpa2VBbmRyb2lkICYmIC9hbmRyb2lkL2kudGVzdCh1YSlcbiAgICAgICwgdmVyc2lvbklkZW50aWZpZXIgPSBnZXRGaXJzdE1hdGNoKC92ZXJzaW9uXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgLCB0YWJsZXQgPSAvdGFibGV0L2kudGVzdCh1YSlcbiAgICAgICwgbW9iaWxlID0gIXRhYmxldCAmJiAvW14tXW1vYmkvaS50ZXN0KHVhKVxuICAgICAgLCByZXN1bHRcblxuICAgIGlmICgvb3BlcmF8b3ByL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ09wZXJhJ1xuICAgICAgLCBvcGVyYTogdFxuICAgICAgLCB2ZXJzaW9uOiB2ZXJzaW9uSWRlbnRpZmllciB8fCBnZXRGaXJzdE1hdGNoKC8oPzpvcGVyYXxvcHIpW1xcc1xcL10oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC93aW5kb3dzIHBob25lL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1dpbmRvd3MgUGhvbmUnXG4gICAgICAsIHdpbmRvd3NwaG9uZTogdFxuICAgICAgLCBtc2llOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL2llbW9iaWxlXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvbXNpZXx0cmlkZW50L2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0ludGVybmV0IEV4cGxvcmVyJ1xuICAgICAgLCBtc2llOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goLyg/Om1zaWUgfHJ2OikoXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9jaHJvbWV8Y3Jpb3N8Y3Jtby9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdDaHJvbWUnXG4gICAgICAsIGNocm9tZTogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzpjaHJvbWV8Y3Jpb3N8Y3JtbylcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlvc2RldmljZSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lIDogaW9zZGV2aWNlID09ICdpcGhvbmUnID8gJ2lQaG9uZScgOiBpb3NkZXZpY2UgPT0gJ2lwYWQnID8gJ2lQYWQnIDogJ2lQb2QnXG4gICAgICB9XG4gICAgICAvLyBXVEY6IHZlcnNpb24gaXMgbm90IHBhcnQgb2YgdXNlciBhZ2VudCBpbiB3ZWIgYXBwc1xuICAgICAgaWYgKHZlcnNpb25JZGVudGlmaWVyKSB7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3NhaWxmaXNoL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1NhaWxmaXNoJ1xuICAgICAgLCBzYWlsZmlzaDogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC9zYWlsZmlzaFxccz9icm93c2VyXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmICgvc2VhbW9ua2V5XFwvL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1NlYU1vbmtleSdcbiAgICAgICwgc2VhbW9ua2V5OiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3NlYW1vbmtleVxcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2ZpcmVmb3h8aWNld2Vhc2VsL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0ZpcmVmb3gnXG4gICAgICAsIGZpcmVmb3g6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvKD86ZmlyZWZveHxpY2V3ZWFzZWwpWyBcXC9dKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfVxuICAgICAgaWYgKC9cXCgobW9iaWxlfHRhYmxldCk7W15cXCldKnJ2OltcXGRcXC5dK1xcKS9pLnRlc3QodWEpKSB7XG4gICAgICAgIHJlc3VsdC5maXJlZm94b3MgPSB0XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC9zaWxrL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9ICB7XG4gICAgICAgIG5hbWU6ICdBbWF6b24gU2lsaydcbiAgICAgICwgc2lsazogdFxuICAgICAgLCB2ZXJzaW9uIDogZ2V0Rmlyc3RNYXRjaCgvc2lsa1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoYW5kcm9pZCkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnQW5kcm9pZCdcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXJcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL3BoYW50b20vaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0ID0ge1xuICAgICAgICBuYW1lOiAnUGhhbnRvbUpTJ1xuICAgICAgLCBwaGFudG9tOiB0XG4gICAgICAsIHZlcnNpb246IGdldEZpcnN0TWF0Y2goL3BoYW50b21qc1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoL2JsYWNrYmVycnl8XFxiYmJcXGQrL2kudGVzdCh1YSkgfHwgL3JpbVxcc3RhYmxldC9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdCbGFja0JlcnJ5J1xuICAgICAgLCBibGFja2JlcnJ5OiB0XG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyIHx8IGdldEZpcnN0TWF0Y2goL2JsYWNrYmVycnlbXFxkXStcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKC8od2VifGhwdylvcy9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQgPSB7XG4gICAgICAgIG5hbWU6ICdXZWJPUydcbiAgICAgICwgd2Vib3M6IHRcbiAgICAgICwgdmVyc2lvbjogdmVyc2lvbklkZW50aWZpZXIgfHwgZ2V0Rmlyc3RNYXRjaCgvdyg/OmViKT9vc2Jyb3dzZXJcXC8oXFxkKyhcXC5cXGQrKT8pL2kpXG4gICAgICB9O1xuICAgICAgL3RvdWNocGFkXFwvL2kudGVzdCh1YSkgJiYgKHJlc3VsdC50b3VjaHBhZCA9IHQpXG4gICAgfVxuICAgIGVsc2UgaWYgKC9iYWRhL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ0JhZGEnXG4gICAgICAsIGJhZGE6IHRcbiAgICAgICwgdmVyc2lvbjogZ2V0Rmlyc3RNYXRjaCgvZG9sZmluXFwvKFxcZCsoXFwuXFxkKyk/KS9pKVxuICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoL3RpemVuL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1RpemVuJ1xuICAgICAgLCB0aXplbjogdFxuICAgICAgLCB2ZXJzaW9uOiBnZXRGaXJzdE1hdGNoKC8oPzp0aXplblxccz8pP2Jyb3dzZXJcXC8oXFxkKyhcXC5cXGQrKT8pL2kpIHx8IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIGlmICgvc2FmYXJpL2kudGVzdCh1YSkpIHtcbiAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgbmFtZTogJ1NhZmFyaSdcbiAgICAgICwgc2FmYXJpOiB0XG4gICAgICAsIHZlcnNpb246IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgcmVzdWx0ID0ge31cblxuICAgIC8vIHNldCB3ZWJraXQgb3IgZ2Vja28gZmxhZyBmb3IgYnJvd3NlcnMgYmFzZWQgb24gdGhlc2UgZW5naW5lc1xuICAgIGlmICgvKGFwcGxlKT93ZWJraXQvaS50ZXN0KHVhKSkge1xuICAgICAgcmVzdWx0Lm5hbWUgPSByZXN1bHQubmFtZSB8fCBcIldlYmtpdFwiXG4gICAgICByZXN1bHQud2Via2l0ID0gdFxuICAgICAgaWYgKCFyZXN1bHQudmVyc2lvbiAmJiB2ZXJzaW9uSWRlbnRpZmllcikge1xuICAgICAgICByZXN1bHQudmVyc2lvbiA9IHZlcnNpb25JZGVudGlmaWVyXG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghcmVzdWx0Lm9wZXJhICYmIC9nZWNrb1xcLy9pLnRlc3QodWEpKSB7XG4gICAgICByZXN1bHQubmFtZSA9IHJlc3VsdC5uYW1lIHx8IFwiR2Vja29cIlxuICAgICAgcmVzdWx0LmdlY2tvID0gdFxuICAgICAgcmVzdWx0LnZlcnNpb24gPSByZXN1bHQudmVyc2lvbiB8fCBnZXRGaXJzdE1hdGNoKC9nZWNrb1xcLyhcXGQrKFxcLlxcZCspPykvaSlcbiAgICB9XG5cbiAgICAvLyBzZXQgT1MgZmxhZ3MgZm9yIHBsYXRmb3JtcyB0aGF0IGhhdmUgbXVsdGlwbGUgYnJvd3NlcnNcbiAgICBpZiAoYW5kcm9pZCB8fCByZXN1bHQuc2lsaykge1xuICAgICAgcmVzdWx0LmFuZHJvaWQgPSB0XG4gICAgfSBlbHNlIGlmIChpb3NkZXZpY2UpIHtcbiAgICAgIHJlc3VsdFtpb3NkZXZpY2VdID0gdFxuICAgICAgcmVzdWx0LmlvcyA9IHRcbiAgICB9XG5cbiAgICAvLyBPUyB2ZXJzaW9uIGV4dHJhY3Rpb25cbiAgICB2YXIgb3NWZXJzaW9uID0gJyc7XG4gICAgaWYgKGlvc2RldmljZSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvb3MgKFxcZCsoW19cXHNdXFxkKykqKSBsaWtlIG1hYyBvcyB4L2kpO1xuICAgICAgb3NWZXJzaW9uID0gb3NWZXJzaW9uLnJlcGxhY2UoL1tfXFxzXS9nLCAnLicpO1xuICAgIH0gZWxzZSBpZiAoYW5kcm9pZCkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvYW5kcm9pZFsgXFwvLV0oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LndpbmRvd3NwaG9uZSkge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvd2luZG93cyBwaG9uZSAoPzpvcyk/XFxzPyhcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfSBlbHNlIGlmIChyZXN1bHQud2Vib3MpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goLyg/OndlYnxocHcpb3NcXC8oXFxkKyhcXC5cXGQrKSopL2kpO1xuICAgIH0gZWxzZSBpZiAocmVzdWx0LmJsYWNrYmVycnkpIHtcbiAgICAgIG9zVmVyc2lvbiA9IGdldEZpcnN0TWF0Y2goL3JpbVxcc3RhYmxldFxcc29zXFxzKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC5iYWRhKSB7XG4gICAgICBvc1ZlcnNpb24gPSBnZXRGaXJzdE1hdGNoKC9iYWRhXFwvKFxcZCsoXFwuXFxkKykqKS9pKTtcbiAgICB9IGVsc2UgaWYgKHJlc3VsdC50aXplbikge1xuICAgICAgb3NWZXJzaW9uID0gZ2V0Rmlyc3RNYXRjaCgvdGl6ZW5bXFwvXFxzXShcXGQrKFxcLlxcZCspKikvaSk7XG4gICAgfVxuICAgIGlmIChvc1ZlcnNpb24pIHtcbiAgICAgIHJlc3VsdC5vc3ZlcnNpb24gPSBvc1ZlcnNpb247XG4gICAgfVxuXG4gICAgLy8gZGV2aWNlIHR5cGUgZXh0cmFjdGlvblxuICAgIHZhciBvc01ham9yVmVyc2lvbiA9IG9zVmVyc2lvbi5zcGxpdCgnLicpWzBdO1xuICAgIGlmICh0YWJsZXQgfHwgaW9zZGV2aWNlID09ICdpcGFkJyB8fCAoYW5kcm9pZCAmJiAob3NNYWpvclZlcnNpb24gPT0gMyB8fCAob3NNYWpvclZlcnNpb24gPT0gNCAmJiAhbW9iaWxlKSkpIHx8IHJlc3VsdC5zaWxrKSB7XG4gICAgICByZXN1bHQudGFibGV0ID0gdFxuICAgIH0gZWxzZSBpZiAobW9iaWxlIHx8IGlvc2RldmljZSA9PSAnaXBob25lJyB8fCBpb3NkZXZpY2UgPT0gJ2lwb2QnIHx8IGFuZHJvaWQgfHwgcmVzdWx0LmJsYWNrYmVycnkgfHwgcmVzdWx0LndlYm9zIHx8IHJlc3VsdC5iYWRhKSB7XG4gICAgICByZXN1bHQubW9iaWxlID0gdFxuICAgIH1cblxuICAgIC8vIEdyYWRlZCBCcm93c2VyIFN1cHBvcnRcbiAgICAvLyBodHRwOi8vZGV2ZWxvcGVyLnlhaG9vLmNvbS95dWkvYXJ0aWNsZXMvZ2JzXG4gICAgaWYgKChyZXN1bHQubXNpZSAmJiByZXN1bHQudmVyc2lvbiA+PSAxMCkgfHxcbiAgICAgICAgKHJlc3VsdC5jaHJvbWUgJiYgcmVzdWx0LnZlcnNpb24gPj0gMjApIHx8XG4gICAgICAgIChyZXN1bHQuZmlyZWZveCAmJiByZXN1bHQudmVyc2lvbiA+PSAyMC4wKSB8fFxuICAgICAgICAocmVzdWx0LnNhZmFyaSAmJiByZXN1bHQudmVyc2lvbiA+PSA2KSB8fFxuICAgICAgICAocmVzdWx0Lm9wZXJhICYmIHJlc3VsdC52ZXJzaW9uID49IDEwLjApIHx8XG4gICAgICAgIChyZXN1bHQuaW9zICYmIHJlc3VsdC5vc3ZlcnNpb24gJiYgcmVzdWx0Lm9zdmVyc2lvbi5zcGxpdChcIi5cIilbMF0gPj0gNilcbiAgICAgICAgKSB7XG4gICAgICByZXN1bHQuYSA9IHQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKChyZXN1bHQubXNpZSAmJiByZXN1bHQudmVyc2lvbiA8IDEwKSB8fFxuICAgICAgICAocmVzdWx0LmNocm9tZSAmJiByZXN1bHQudmVyc2lvbiA8IDIwKSB8fFxuICAgICAgICAocmVzdWx0LmZpcmVmb3ggJiYgcmVzdWx0LnZlcnNpb24gPCAyMC4wKSB8fFxuICAgICAgICAocmVzdWx0LnNhZmFyaSAmJiByZXN1bHQudmVyc2lvbiA8IDYpIHx8XG4gICAgICAgIChyZXN1bHQub3BlcmEgJiYgcmVzdWx0LnZlcnNpb24gPCAxMC4wKSB8fFxuICAgICAgICAocmVzdWx0LmlvcyAmJiByZXN1bHQub3N2ZXJzaW9uICYmIHJlc3VsdC5vc3ZlcnNpb24uc3BsaXQoXCIuXCIpWzBdIDwgNilcbiAgICAgICAgKSB7XG4gICAgICByZXN1bHQuYyA9IHRcbiAgICB9IGVsc2UgcmVzdWx0LnggPSB0XG5cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICB2YXIgYm93c2VyID0gZGV0ZWN0KHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnID8gbmF2aWdhdG9yLnVzZXJBZ2VudCA6ICcnKVxuXG5cbiAgLypcbiAgICogU2V0IG91ciBkZXRlY3QgbWV0aG9kIHRvIHRoZSBtYWluIGJvd3NlciBvYmplY3Qgc28gd2UgY2FuXG4gICAqIHJldXNlIGl0IHRvIHRlc3Qgb3RoZXIgdXNlciBhZ2VudHMuXG4gICAqIFRoaXMgaXMgbmVlZGVkIHRvIGltcGxlbWVudCBmdXR1cmUgdGVzdHMuXG4gICAqL1xuICBib3dzZXIuX2RldGVjdCA9IGRldGVjdDtcblxuICByZXR1cm4gYm93c2VyXG59KTtcbiIsIi8qISBTb2NrZXQuSU8uanMgYnVpbGQ6MC45LjE2LCBkZXZlbG9wbWVudC4gQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPiBNSVQgTGljZW5zZWQgKi9cblxudmFyIGlvID0gKCd1bmRlZmluZWQnID09PSB0eXBlb2YgbW9kdWxlID8ge30gOiBtb2R1bGUuZXhwb3J0cyk7XG4oZnVuY3Rpb24oKSB7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGdsb2JhbCkge1xuXG4gIC8qKlxuICAgKiBJTyBuYW1lc3BhY2UuXG4gICAqXG4gICAqIEBuYW1lc3BhY2VcbiAgICovXG5cbiAgdmFyIGlvID0gZXhwb3J0cztcblxuICAvKipcbiAgICogU29ja2V0LklPIHZlcnNpb25cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgaW8udmVyc2lvbiA9ICcwLjkuMTYnO1xuXG4gIC8qKlxuICAgKiBQcm90b2NvbCBpbXBsZW1lbnRlZC5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgaW8ucHJvdG9jb2wgPSAxO1xuXG4gIC8qKlxuICAgKiBBdmFpbGFibGUgdHJhbnNwb3J0cywgdGhlc2Ugd2lsbCBiZSBwb3B1bGF0ZWQgd2l0aCB0aGUgYXZhaWxhYmxlIHRyYW5zcG9ydHNcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgaW8udHJhbnNwb3J0cyA9IFtdO1xuXG4gIC8qKlxuICAgKiBLZWVwIHRyYWNrIG9mIGpzb25wIGNhbGxiYWNrcy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLmogPSBbXTtcblxuICAvKipcbiAgICogS2VlcCB0cmFjayBvZiBvdXIgaW8uU29ja2V0c1xuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG4gIGlvLnNvY2tldHMgPSB7fTtcblxuXG4gIC8qKlxuICAgKiBNYW5hZ2VzIGNvbm5lY3Rpb25zIHRvIGhvc3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gdXJpXG4gICAqIEBQYXJhbSB7Qm9vbGVhbn0gZm9yY2UgY3JlYXRpb24gb2YgbmV3IHNvY2tldCAoZGVmYXVsdHMgdG8gZmFsc2UpXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGlvLmNvbm5lY3QgPSBmdW5jdGlvbiAoaG9zdCwgZGV0YWlscykge1xuICAgIHZhciB1cmkgPSBpby51dGlsLnBhcnNlVXJpKGhvc3QpXG4gICAgICAsIHV1cmlcbiAgICAgICwgc29ja2V0O1xuXG4gICAgaWYgKGdsb2JhbCAmJiBnbG9iYWwubG9jYXRpb24pIHtcbiAgICAgIHVyaS5wcm90b2NvbCA9IHVyaS5wcm90b2NvbCB8fCBnbG9iYWwubG9jYXRpb24ucHJvdG9jb2wuc2xpY2UoMCwgLTEpO1xuICAgICAgdXJpLmhvc3QgPSB1cmkuaG9zdCB8fCAoZ2xvYmFsLmRvY3VtZW50XG4gICAgICAgID8gZ2xvYmFsLmRvY3VtZW50LmRvbWFpbiA6IGdsb2JhbC5sb2NhdGlvbi5ob3N0bmFtZSk7XG4gICAgICB1cmkucG9ydCA9IHVyaS5wb3J0IHx8IGdsb2JhbC5sb2NhdGlvbi5wb3J0O1xuICAgIH1cblxuICAgIHV1cmkgPSBpby51dGlsLnVuaXF1ZVVyaSh1cmkpO1xuXG4gICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgIGhvc3Q6IHVyaS5ob3N0XG4gICAgICAsIHNlY3VyZTogJ2h0dHBzJyA9PSB1cmkucHJvdG9jb2xcbiAgICAgICwgcG9ydDogdXJpLnBvcnQgfHwgKCdodHRwcycgPT0gdXJpLnByb3RvY29sID8gNDQzIDogODApXG4gICAgICAsIHF1ZXJ5OiB1cmkucXVlcnkgfHwgJydcbiAgICB9O1xuXG4gICAgaW8udXRpbC5tZXJnZShvcHRpb25zLCBkZXRhaWxzKTtcblxuICAgIGlmIChvcHRpb25zWydmb3JjZSBuZXcgY29ubmVjdGlvbiddIHx8ICFpby5zb2NrZXRzW3V1cmldKSB7XG4gICAgICBzb2NrZXQgPSBuZXcgaW8uU29ja2V0KG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmICghb3B0aW9uc1snZm9yY2UgbmV3IGNvbm5lY3Rpb24nXSAmJiBzb2NrZXQpIHtcbiAgICAgIGlvLnNvY2tldHNbdXVyaV0gPSBzb2NrZXQ7XG4gICAgfVxuXG4gICAgc29ja2V0ID0gc29ja2V0IHx8IGlvLnNvY2tldHNbdXVyaV07XG5cbiAgICAvLyBpZiBwYXRoIGlzIGRpZmZlcmVudCBmcm9tICcnIG9yIC9cbiAgICByZXR1cm4gc29ja2V0Lm9mKHVyaS5wYXRoLmxlbmd0aCA+IDEgPyB1cmkucGF0aCA6ICcnKTtcbiAgfTtcblxufSkoJ29iamVjdCcgPT09IHR5cGVvZiBtb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6ICh0aGlzLmlvID0ge30pLCB0aGlzKTtcbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGdsb2JhbCkge1xuXG4gIC8qKlxuICAgKiBVdGlsaXRpZXMgbmFtZXNwYWNlLlxuICAgKlxuICAgKiBAbmFtZXNwYWNlXG4gICAqL1xuXG4gIHZhciB1dGlsID0gZXhwb3J0cy51dGlsID0ge307XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbiBVUklcbiAgICpcbiAgICogQGF1dGhvciBTdGV2ZW4gTGV2aXRoYW4gPHN0ZXZlbmxldml0aGFuLmNvbT4gKE1JVCBsaWNlbnNlKVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB2YXIgcmUgPSAvXig/Oig/IVteOkBdKzpbXjpAXFwvXSpAKShbXjpcXC8/Iy5dKyk6KT8oPzpcXC9cXC8pPygoPzooKFteOkBdKikoPzo6KFteOkBdKikpPyk/QCk/KFteOlxcLz8jXSopKD86OihcXGQqKSk/KSgoKFxcLyg/OltePyNdKD8hW14/I1xcL10qXFwuW14/I1xcLy5dKyg/Ols/I118JCkpKSpcXC8/KT8oW14/I1xcL10qKSkoPzpcXD8oW14jXSopKT8oPzojKC4qKSk/KS87XG5cbiAgdmFyIHBhcnRzID0gWydzb3VyY2UnLCAncHJvdG9jb2wnLCAnYXV0aG9yaXR5JywgJ3VzZXJJbmZvJywgJ3VzZXInLCAncGFzc3dvcmQnLFxuICAgICAgICAgICAgICAgJ2hvc3QnLCAncG9ydCcsICdyZWxhdGl2ZScsICdwYXRoJywgJ2RpcmVjdG9yeScsICdmaWxlJywgJ3F1ZXJ5JyxcbiAgICAgICAgICAgICAgICdhbmNob3InXTtcblxuICB1dGlsLnBhcnNlVXJpID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHZhciBtID0gcmUuZXhlYyhzdHIgfHwgJycpXG4gICAgICAsIHVyaSA9IHt9XG4gICAgICAsIGkgPSAxNDtcblxuICAgIHdoaWxlIChpLS0pIHtcbiAgICAgIHVyaVtwYXJ0c1tpXV0gPSBtW2ldIHx8ICcnO1xuICAgIH1cblxuICAgIHJldHVybiB1cmk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFByb2R1Y2VzIGEgdW5pcXVlIHVybCB0aGF0IGlkZW50aWZpZXMgYSBTb2NrZXQuSU8gY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IHVyaVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnVuaXF1ZVVyaSA9IGZ1bmN0aW9uICh1cmkpIHtcbiAgICB2YXIgcHJvdG9jb2wgPSB1cmkucHJvdG9jb2xcbiAgICAgICwgaG9zdCA9IHVyaS5ob3N0XG4gICAgICAsIHBvcnQgPSB1cmkucG9ydDtcblxuICAgIGlmICgnZG9jdW1lbnQnIGluIGdsb2JhbCkge1xuICAgICAgaG9zdCA9IGhvc3QgfHwgZG9jdW1lbnQuZG9tYWluO1xuICAgICAgcG9ydCA9IHBvcnQgfHwgKHByb3RvY29sID09ICdodHRwcydcbiAgICAgICAgJiYgZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgIT09ICdodHRwczonID8gNDQzIDogZG9jdW1lbnQubG9jYXRpb24ucG9ydCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhvc3QgPSBob3N0IHx8ICdsb2NhbGhvc3QnO1xuXG4gICAgICBpZiAoIXBvcnQgJiYgcHJvdG9jb2wgPT0gJ2h0dHBzJykge1xuICAgICAgICBwb3J0ID0gNDQzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAocHJvdG9jb2wgfHwgJ2h0dHAnKSArICc6Ly8nICsgaG9zdCArICc6JyArIChwb3J0IHx8IDgwKTtcbiAgfTtcblxuICAvKipcbiAgICogTWVyZ2VzdCAyIHF1ZXJ5IHN0cmluZ3MgaW4gdG8gb25jZSB1bmlxdWUgcXVlcnkgc3RyaW5nXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhZGRpdGlvblxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnF1ZXJ5ID0gZnVuY3Rpb24gKGJhc2UsIGFkZGl0aW9uKSB7XG4gICAgdmFyIHF1ZXJ5ID0gdXRpbC5jaHVua1F1ZXJ5KGJhc2UgfHwgJycpXG4gICAgICAsIGNvbXBvbmVudHMgPSBbXTtcblxuICAgIHV0aWwubWVyZ2UocXVlcnksIHV0aWwuY2h1bmtRdWVyeShhZGRpdGlvbiB8fCAnJykpO1xuICAgIGZvciAodmFyIHBhcnQgaW4gcXVlcnkpIHtcbiAgICAgIGlmIChxdWVyeS5oYXNPd25Qcm9wZXJ0eShwYXJ0KSkge1xuICAgICAgICBjb21wb25lbnRzLnB1c2gocGFydCArICc9JyArIHF1ZXJ5W3BhcnRdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29tcG9uZW50cy5sZW5ndGggPyAnPycgKyBjb21wb25lbnRzLmpvaW4oJyYnKSA6ICcnO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUcmFuc2Zvcm1zIGEgcXVlcnlzdHJpbmcgaW4gdG8gYW4gb2JqZWN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBxc1xuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLmNodW5rUXVlcnkgPSBmdW5jdGlvbiAocXMpIHtcbiAgICB2YXIgcXVlcnkgPSB7fVxuICAgICAgLCBwYXJhbXMgPSBxcy5zcGxpdCgnJicpXG4gICAgICAsIGkgPSAwXG4gICAgICAsIGwgPSBwYXJhbXMubGVuZ3RoXG4gICAgICAsIGt2O1xuXG4gICAgZm9yICg7IGkgPCBsOyArK2kpIHtcbiAgICAgIGt2ID0gcGFyYW1zW2ldLnNwbGl0KCc9Jyk7XG4gICAgICBpZiAoa3ZbMF0pIHtcbiAgICAgICAgcXVlcnlba3ZbMF1dID0ga3ZbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHF1ZXJ5O1xuICB9O1xuXG4gIC8qKlxuICAgKiBFeGVjdXRlcyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2hlbiB0aGUgcGFnZSBpcyBsb2FkZWQuXG4gICAqXG4gICAqICAgICBpby51dGlsLmxvYWQoZnVuY3Rpb24gKCkgeyBjb25zb2xlLmxvZygncGFnZSBsb2FkZWQnKTsgfSk7XG4gICAqXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHZhciBwYWdlTG9hZGVkID0gZmFsc2U7XG5cbiAgdXRpbC5sb2FkID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKCdkb2N1bWVudCcgaW4gZ2xvYmFsICYmIGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScgfHwgcGFnZUxvYWRlZCkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuXG4gICAgdXRpbC5vbihnbG9iYWwsICdsb2FkJywgZm4sIGZhbHNlKTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkcyBhbiBldmVudC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHV0aWwub24gPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQsIGZuLCBjYXB0dXJlKSB7XG4gICAgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICAgIGVsZW1lbnQuYXR0YWNoRXZlbnQoJ29uJyArIGV2ZW50LCBmbik7XG4gICAgfSBlbHNlIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgZm4sIGNhcHR1cmUpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogR2VuZXJhdGVzIHRoZSBjb3JyZWN0IGBYTUxIdHRwUmVxdWVzdGAgZm9yIHJlZ3VsYXIgYW5kIGNyb3NzIGRvbWFpbiByZXF1ZXN0cy5cbiAgICpcbiAgICogQHBhcmFtIHtCb29sZWFufSBbeGRvbWFpbl0gQ3JlYXRlIGEgcmVxdWVzdCB0aGF0IGNhbiBiZSB1c2VkIGNyb3NzIGRvbWFpbi5cbiAgICogQHJldHVybnMge1hNTEh0dHBSZXF1ZXN0fGZhbHNlfSBJZiB3ZSBjYW4gY3JlYXRlIGEgWE1MSHR0cFJlcXVlc3QuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICB1dGlsLnJlcXVlc3QgPSBmdW5jdGlvbiAoeGRvbWFpbikge1xuXG4gICAgaWYgKHhkb21haW4gJiYgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhEb21haW5SZXF1ZXN0ICYmICF1dGlsLnVhLmhhc0NPUlMpIHtcbiAgICAgIHJldHVybiBuZXcgWERvbWFpblJlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBpZiAoJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICYmICgheGRvbWFpbiB8fCB1dGlsLnVhLmhhc0NPUlMpKSB7XG4gICAgICByZXR1cm4gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgaWYgKCF4ZG9tYWluKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IHdpbmRvd1soWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKSldKCdNaWNyb3NvZnQuWE1MSFRUUCcpO1xuICAgICAgfSBjYXRjaChlKSB7IH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICAvKipcbiAgICogWEhSIGJhc2VkIHRyYW5zcG9ydCBjb25zdHJ1Y3Rvci5cbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIC8qKlxuICAgKiBDaGFuZ2UgdGhlIGludGVybmFsIHBhZ2VMb2FkZWQgdmFsdWUuXG4gICAqL1xuXG4gIGlmICgndW5kZWZpbmVkJyAhPSB0eXBlb2Ygd2luZG93KSB7XG4gICAgdXRpbC5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHBhZ2VMb2FkZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERlZmVycyBhIGZ1bmN0aW9uIHRvIGVuc3VyZSBhIHNwaW5uZXIgaXMgbm90IGRpc3BsYXllZCBieSB0aGUgYnJvd3NlclxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLmRlZmVyID0gZnVuY3Rpb24gKGZuKSB7XG4gICAgaWYgKCF1dGlsLnVhLndlYmtpdCB8fCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW1wb3J0U2NyaXB0cykge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuXG4gICAgdXRpbC5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgIHNldFRpbWVvdXQoZm4sIDEwMCk7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1lcmdlcyB0d28gb2JqZWN0cy5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5tZXJnZSA9IGZ1bmN0aW9uIG1lcmdlICh0YXJnZXQsIGFkZGl0aW9uYWwsIGRlZXAsIGxhc3RzZWVuKSB7XG4gICAgdmFyIHNlZW4gPSBsYXN0c2VlbiB8fCBbXVxuICAgICAgLCBkZXB0aCA9IHR5cGVvZiBkZWVwID09ICd1bmRlZmluZWQnID8gMiA6IGRlZXBcbiAgICAgICwgcHJvcDtcblxuICAgIGZvciAocHJvcCBpbiBhZGRpdGlvbmFsKSB7XG4gICAgICBpZiAoYWRkaXRpb25hbC5oYXNPd25Qcm9wZXJ0eShwcm9wKSAmJiB1dGlsLmluZGV4T2Yoc2VlbiwgcHJvcCkgPCAwKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdICE9PSAnb2JqZWN0JyB8fCAhZGVwdGgpIHtcbiAgICAgICAgICB0YXJnZXRbcHJvcF0gPSBhZGRpdGlvbmFsW3Byb3BdO1xuICAgICAgICAgIHNlZW4ucHVzaChhZGRpdGlvbmFsW3Byb3BdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1dGlsLm1lcmdlKHRhcmdldFtwcm9wXSwgYWRkaXRpb25hbFtwcm9wXSwgZGVwdGggLSAxLCBzZWVuKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0YXJnZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIE1lcmdlcyBwcm90b3R5cGVzIGZyb20gb2JqZWN0c1xuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLm1peGluID0gZnVuY3Rpb24gKGN0b3IsIGN0b3IyKSB7XG4gICAgdXRpbC5tZXJnZShjdG9yLnByb3RvdHlwZSwgY3RvcjIucHJvdG90eXBlKTtcbiAgfTtcblxuICAvKipcbiAgICogU2hvcnRjdXQgZm9yIHByb3RvdHlwaWNhbCBhbmQgc3RhdGljIGluaGVyaXRhbmNlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgdXRpbC5pbmhlcml0ID0gZnVuY3Rpb24gKGN0b3IsIGN0b3IyKSB7XG4gICAgZnVuY3Rpb24gZigpIHt9O1xuICAgIGYucHJvdG90eXBlID0gY3RvcjIucHJvdG90eXBlO1xuICAgIGN0b3IucHJvdG90eXBlID0gbmV3IGY7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gb2JqZWN0IGlzIGFuIEFycmF5LlxuICAgKlxuICAgKiAgICAgaW8udXRpbC5pc0FycmF5KFtdKTsgLy8gdHJ1ZVxuICAgKiAgICAgaW8udXRpbC5pc0FycmF5KHt9KTsgLy8gZmFsc2VcbiAgICpcbiAgICogQHBhcmFtIE9iamVjdCBvYmpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC5pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbnRlcnNlY3RzIHZhbHVlcyBvZiB0d28gYXJyYXlzIGludG8gYSB0aGlyZFxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLmludGVyc2VjdCA9IGZ1bmN0aW9uIChhcnIsIGFycjIpIHtcbiAgICB2YXIgcmV0ID0gW11cbiAgICAgICwgbG9uZ2VzdCA9IGFyci5sZW5ndGggPiBhcnIyLmxlbmd0aCA/IGFyciA6IGFycjJcbiAgICAgICwgc2hvcnRlc3QgPSBhcnIubGVuZ3RoID4gYXJyMi5sZW5ndGggPyBhcnIyIDogYXJyO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBzaG9ydGVzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGlmICh+dXRpbC5pbmRleE9mKGxvbmdlc3QsIHNob3J0ZXN0W2ldKSlcbiAgICAgICAgcmV0LnB1c2goc2hvcnRlc3RbaV0pO1xuICAgIH1cblxuICAgIHJldHVybiByZXQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFycmF5IGluZGV4T2YgY29tcGF0aWJpbGl0eS5cbiAgICpcbiAgICogQHNlZSBiaXQubHkvYTVEeGEyXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHV0aWwuaW5kZXhPZiA9IGZ1bmN0aW9uIChhcnIsIG8sIGkpIHtcblxuICAgIGZvciAodmFyIGogPSBhcnIubGVuZ3RoLCBpID0gaSA8IDAgPyBpICsgaiA8IDAgPyAwIDogaSArIGogOiBpIHx8IDA7XG4gICAgICAgICBpIDwgaiAmJiBhcnJbaV0gIT09IG87IGkrKykge31cblxuICAgIHJldHVybiBqIDw9IGkgPyAtMSA6IGk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbnZlcnRzIGVudW1lcmFibGVzIHRvIGFycmF5LlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnRvQXJyYXkgPSBmdW5jdGlvbiAoZW51KSB7XG4gICAgdmFyIGFyciA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBlbnUubGVuZ3RoOyBpIDwgbDsgaSsrKVxuICAgICAgYXJyLnB1c2goZW51W2ldKTtcblxuICAgIHJldHVybiBhcnI7XG4gIH07XG5cbiAgLyoqXG4gICAqIFVBIC8gZW5naW5lcyBkZXRlY3Rpb24gbmFtZXNwYWNlLlxuICAgKlxuICAgKiBAbmFtZXNwYWNlXG4gICAqL1xuXG4gIHV0aWwudWEgPSB7fTtcblxuICAvKipcbiAgICogV2hldGhlciB0aGUgVUEgc3VwcG9ydHMgQ09SUyBmb3IgWEhSLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICB1dGlsLnVhLmhhc0NPUlMgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgWE1MSHR0cFJlcXVlc3QgJiYgKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgdmFyIGEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGEud2l0aENyZWRlbnRpYWxzICE9IHVuZGVmaW5lZDtcbiAgfSkoKTtcblxuICAvKipcbiAgICogRGV0ZWN0IHdlYmtpdC5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC51YS53ZWJraXQgPSAndW5kZWZpbmVkJyAhPSB0eXBlb2YgbmF2aWdhdG9yXG4gICAgJiYgL3dlYmtpdC9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG5cbiAgIC8qKlxuICAgKiBEZXRlY3QgaVBhZC9pUGhvbmUvaVBvZC5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgdXRpbC51YS5pRGV2aWNlID0gJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIG5hdmlnYXRvclxuICAgICAgJiYgL2lQYWR8aVBob25lfGlQb2QvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG59KSgndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzLCB0aGlzKTtcbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbiAgLyoqXG4gICAqIEV2ZW50IGVtaXR0ZXIgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBhcGkgcHVibGljLlxuICAgKi9cblxuICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIgKCkge307XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBsaXN0ZW5lclxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgaWYgKCF0aGlzLiRldmVudHMpIHtcbiAgICAgIHRoaXMuJGV2ZW50cyA9IHt9O1xuICAgIH1cblxuICAgIGlmICghdGhpcy4kZXZlbnRzW25hbWVdKSB7XG4gICAgICB0aGlzLiRldmVudHNbbmFtZV0gPSBmbjtcbiAgICB9IGVsc2UgaWYgKGlvLnV0aWwuaXNBcnJheSh0aGlzLiRldmVudHNbbmFtZV0pKSB7XG4gICAgICB0aGlzLiRldmVudHNbbmFtZV0ucHVzaChmbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXSA9IFt0aGlzLiRldmVudHNbbmFtZV0sIGZuXTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuICAvKipcbiAgICogQWRkcyBhIHZvbGF0aWxlIGxpc3RlbmVyLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uY2UgPSBmdW5jdGlvbiAobmFtZSwgZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICBmdW5jdGlvbiBvbiAoKSB7XG4gICAgICBzZWxmLnJlbW92ZUxpc3RlbmVyKG5hbWUsIG9uKTtcbiAgICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIG9uLmxpc3RlbmVyID0gZm47XG4gICAgdGhpcy5vbihuYW1lLCBvbik7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogUmVtb3ZlcyBhIGxpc3RlbmVyLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gICAgaWYgKHRoaXMuJGV2ZW50cyAmJiB0aGlzLiRldmVudHNbbmFtZV0pIHtcbiAgICAgIHZhciBsaXN0ID0gdGhpcy4kZXZlbnRzW25hbWVdO1xuXG4gICAgICBpZiAoaW8udXRpbC5pc0FycmF5KGxpc3QpKSB7XG4gICAgICAgIHZhciBwb3MgPSAtMTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGxpc3RbaV0gPT09IGZuIHx8IChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGZuKSkge1xuICAgICAgICAgICAgcG9zID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChwb3MgPCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICBsaXN0LnNwbGljZShwb3MsIDEpO1xuXG4gICAgICAgIGlmICghbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICBkZWxldGUgdGhpcy4kZXZlbnRzW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGxpc3QgPT09IGZuIHx8IChsaXN0Lmxpc3RlbmVyICYmIGxpc3QubGlzdGVuZXIgPT09IGZuKSkge1xuICAgICAgICBkZWxldGUgdGhpcy4kZXZlbnRzW25hbWVdO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZm9yIGFuIGV2ZW50LlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy4kZXZlbnRzID0ge307XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBpZiAodGhpcy4kZXZlbnRzICYmIHRoaXMuJGV2ZW50c1tuYW1lXSkge1xuICAgICAgdGhpcy4kZXZlbnRzW25hbWVdID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogR2V0cyBhbGwgbGlzdGVuZXJzIGZvciBhIGNlcnRhaW4gZXZlbnQuXG4gICAqXG4gICAqIEBhcGkgcHVibGNpXG4gICAqL1xuXG4gIEV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMuJGV2ZW50cykge1xuICAgICAgdGhpcy4kZXZlbnRzID0ge307XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLiRldmVudHNbbmFtZV0pIHtcbiAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXSA9IFtdO1xuICAgIH1cblxuICAgIGlmICghaW8udXRpbC5pc0FycmF5KHRoaXMuJGV2ZW50c1tuYW1lXSkpIHtcbiAgICAgIHRoaXMuJGV2ZW50c1tuYW1lXSA9IFt0aGlzLiRldmVudHNbbmFtZV1dO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLiRldmVudHNbbmFtZV07XG4gIH07XG5cbiAgLyoqXG4gICAqIEVtaXRzIGFuIGV2ZW50LlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIGlmICghdGhpcy4kZXZlbnRzKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGhhbmRsZXIgPSB0aGlzLiRldmVudHNbbmFtZV07XG5cbiAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgaGFuZGxlcikge1xuICAgICAgaGFuZGxlci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9IGVsc2UgaWYgKGlvLnV0aWwuaXNBcnJheShoYW5kbGVyKSkge1xuICAgICAgdmFyIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0ZW5lcnMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbik7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4vKipcbiAqIEJhc2VkIG9uIEpTT04yIChodHRwOi8vd3d3LkpTT04ub3JnL2pzLmh0bWwpLlxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgbmF0aXZlSlNPTikge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICAvLyB1c2UgbmF0aXZlIEpTT04gaWYgaXQncyBhdmFpbGFibGVcbiAgaWYgKG5hdGl2ZUpTT04gJiYgbmF0aXZlSlNPTi5wYXJzZSl7XG4gICAgcmV0dXJuIGV4cG9ydHMuSlNPTiA9IHtcbiAgICAgIHBhcnNlOiBuYXRpdmVKU09OLnBhcnNlXG4gICAgLCBzdHJpbmdpZnk6IG5hdGl2ZUpTT04uc3RyaW5naWZ5XG4gICAgfTtcbiAgfVxuXG4gIHZhciBKU09OID0gZXhwb3J0cy5KU09OID0ge307XG5cbiAgZnVuY3Rpb24gZihuKSB7XG4gICAgICAvLyBGb3JtYXQgaW50ZWdlcnMgdG8gaGF2ZSBhdCBsZWFzdCB0d28gZGlnaXRzLlxuICAgICAgcmV0dXJuIG4gPCAxMCA/ICcwJyArIG4gOiBuO1xuICB9XG5cbiAgZnVuY3Rpb24gZGF0ZShkLCBrZXkpIHtcbiAgICByZXR1cm4gaXNGaW5pdGUoZC52YWx1ZU9mKCkpID9cbiAgICAgICAgZC5nZXRVVENGdWxsWWVhcigpICAgICArICctJyArXG4gICAgICAgIGYoZC5nZXRVVENNb250aCgpICsgMSkgKyAnLScgK1xuICAgICAgICBmKGQuZ2V0VVRDRGF0ZSgpKSAgICAgICsgJ1QnICtcbiAgICAgICAgZihkLmdldFVUQ0hvdXJzKCkpICAgICArICc6JyArXG4gICAgICAgIGYoZC5nZXRVVENNaW51dGVzKCkpICAgKyAnOicgK1xuICAgICAgICBmKGQuZ2V0VVRDU2Vjb25kcygpKSAgICsgJ1onIDogbnVsbDtcbiAgfTtcblxuICB2YXIgY3ggPSAvW1xcdTAwMDBcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZyxcbiAgICAgIGVzY2FwYWJsZSA9IC9bXFxcXFxcXCJcXHgwMC1cXHgxZlxceDdmLVxceDlmXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2csXG4gICAgICBnYXAsXG4gICAgICBpbmRlbnQsXG4gICAgICBtZXRhID0geyAgICAvLyB0YWJsZSBvZiBjaGFyYWN0ZXIgc3Vic3RpdHV0aW9uc1xuICAgICAgICAgICdcXGInOiAnXFxcXGInLFxuICAgICAgICAgICdcXHQnOiAnXFxcXHQnLFxuICAgICAgICAgICdcXG4nOiAnXFxcXG4nLFxuICAgICAgICAgICdcXGYnOiAnXFxcXGYnLFxuICAgICAgICAgICdcXHInOiAnXFxcXHInLFxuICAgICAgICAgICdcIicgOiAnXFxcXFwiJyxcbiAgICAgICAgICAnXFxcXCc6ICdcXFxcXFxcXCdcbiAgICAgIH0sXG4gICAgICByZXA7XG5cblxuICBmdW5jdGlvbiBxdW90ZShzdHJpbmcpIHtcblxuLy8gSWYgdGhlIHN0cmluZyBjb250YWlucyBubyBjb250cm9sIGNoYXJhY3RlcnMsIG5vIHF1b3RlIGNoYXJhY3RlcnMsIGFuZCBub1xuLy8gYmFja3NsYXNoIGNoYXJhY3RlcnMsIHRoZW4gd2UgY2FuIHNhZmVseSBzbGFwIHNvbWUgcXVvdGVzIGFyb3VuZCBpdC5cbi8vIE90aGVyd2lzZSB3ZSBtdXN0IGFsc28gcmVwbGFjZSB0aGUgb2ZmZW5kaW5nIGNoYXJhY3RlcnMgd2l0aCBzYWZlIGVzY2FwZVxuLy8gc2VxdWVuY2VzLlxuXG4gICAgICBlc2NhcGFibGUubGFzdEluZGV4ID0gMDtcbiAgICAgIHJldHVybiBlc2NhcGFibGUudGVzdChzdHJpbmcpID8gJ1wiJyArIHN0cmluZy5yZXBsYWNlKGVzY2FwYWJsZSwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICB2YXIgYyA9IG1ldGFbYV07XG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiBjID09PSAnc3RyaW5nJyA/IGMgOlxuICAgICAgICAgICAgICAnXFxcXHUnICsgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KTtcbiAgICAgIH0pICsgJ1wiJyA6ICdcIicgKyBzdHJpbmcgKyAnXCInO1xuICB9XG5cblxuICBmdW5jdGlvbiBzdHIoa2V5LCBob2xkZXIpIHtcblxuLy8gUHJvZHVjZSBhIHN0cmluZyBmcm9tIGhvbGRlcltrZXldLlxuXG4gICAgICB2YXIgaSwgICAgICAgICAgLy8gVGhlIGxvb3AgY291bnRlci5cbiAgICAgICAgICBrLCAgICAgICAgICAvLyBUaGUgbWVtYmVyIGtleS5cbiAgICAgICAgICB2LCAgICAgICAgICAvLyBUaGUgbWVtYmVyIHZhbHVlLlxuICAgICAgICAgIGxlbmd0aCxcbiAgICAgICAgICBtaW5kID0gZ2FwLFxuICAgICAgICAgIHBhcnRpYWwsXG4gICAgICAgICAgdmFsdWUgPSBob2xkZXJba2V5XTtcblxuLy8gSWYgdGhlIHZhbHVlIGhhcyBhIHRvSlNPTiBtZXRob2QsIGNhbGwgaXQgdG8gb2J0YWluIGEgcmVwbGFjZW1lbnQgdmFsdWUuXG5cbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAgICAgICB2YWx1ZSA9IGRhdGUoa2V5KTtcbiAgICAgIH1cblxuLy8gSWYgd2Ugd2VyZSBjYWxsZWQgd2l0aCBhIHJlcGxhY2VyIGZ1bmN0aW9uLCB0aGVuIGNhbGwgdGhlIHJlcGxhY2VyIHRvXG4vLyBvYnRhaW4gYSByZXBsYWNlbWVudCB2YWx1ZS5cblxuICAgICAgaWYgKHR5cGVvZiByZXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YWx1ZSA9IHJlcC5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgICB9XG5cbi8vIFdoYXQgaGFwcGVucyBuZXh0IGRlcGVuZHMgb24gdGhlIHZhbHVlJ3MgdHlwZS5cblxuICAgICAgc3dpdGNoICh0eXBlb2YgdmFsdWUpIHtcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgcmV0dXJuIHF1b3RlKHZhbHVlKTtcblxuICAgICAgY2FzZSAnbnVtYmVyJzpcblxuLy8gSlNPTiBudW1iZXJzIG11c3QgYmUgZmluaXRlLiBFbmNvZGUgbm9uLWZpbml0ZSBudW1iZXJzIGFzIG51bGwuXG5cbiAgICAgICAgICByZXR1cm4gaXNGaW5pdGUodmFsdWUpID8gU3RyaW5nKHZhbHVlKSA6ICdudWxsJztcblxuICAgICAgY2FzZSAnYm9vbGVhbic6XG4gICAgICBjYXNlICdudWxsJzpcblxuLy8gSWYgdGhlIHZhbHVlIGlzIGEgYm9vbGVhbiBvciBudWxsLCBjb252ZXJ0IGl0IHRvIGEgc3RyaW5nLiBOb3RlOlxuLy8gdHlwZW9mIG51bGwgZG9lcyBub3QgcHJvZHVjZSAnbnVsbCcuIFRoZSBjYXNlIGlzIGluY2x1ZGVkIGhlcmUgaW5cbi8vIHRoZSByZW1vdGUgY2hhbmNlIHRoYXQgdGhpcyBnZXRzIGZpeGVkIHNvbWVkYXkuXG5cbiAgICAgICAgICByZXR1cm4gU3RyaW5nKHZhbHVlKTtcblxuLy8gSWYgdGhlIHR5cGUgaXMgJ29iamVjdCcsIHdlIG1pZ2h0IGJlIGRlYWxpbmcgd2l0aCBhbiBvYmplY3Qgb3IgYW4gYXJyYXkgb3Jcbi8vIG51bGwuXG5cbiAgICAgIGNhc2UgJ29iamVjdCc6XG5cbi8vIER1ZSB0byBhIHNwZWNpZmljYXRpb24gYmx1bmRlciBpbiBFQ01BU2NyaXB0LCB0eXBlb2YgbnVsbCBpcyAnb2JqZWN0Jyxcbi8vIHNvIHdhdGNoIG91dCBmb3IgdGhhdCBjYXNlLlxuXG4gICAgICAgICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgICAgIH1cblxuLy8gTWFrZSBhbiBhcnJheSB0byBob2xkIHRoZSBwYXJ0aWFsIHJlc3VsdHMgb2Ygc3RyaW5naWZ5aW5nIHRoaXMgb2JqZWN0IHZhbHVlLlxuXG4gICAgICAgICAgZ2FwICs9IGluZGVudDtcbiAgICAgICAgICBwYXJ0aWFsID0gW107XG5cbi8vIElzIHRoZSB2YWx1ZSBhbiBhcnJheT9cblxuICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJykge1xuXG4vLyBUaGUgdmFsdWUgaXMgYW4gYXJyYXkuIFN0cmluZ2lmeSBldmVyeSBlbGVtZW50LiBVc2UgbnVsbCBhcyBhIHBsYWNlaG9sZGVyXG4vLyBmb3Igbm9uLUpTT04gdmFsdWVzLlxuXG4gICAgICAgICAgICAgIGxlbmd0aCA9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAgICAgICBwYXJ0aWFsW2ldID0gc3RyKGksIHZhbHVlKSB8fCAnbnVsbCc7XG4gICAgICAgICAgICAgIH1cblxuLy8gSm9pbiBhbGwgb2YgdGhlIGVsZW1lbnRzIHRvZ2V0aGVyLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMsIGFuZCB3cmFwIHRoZW0gaW5cbi8vIGJyYWNrZXRzLlxuXG4gICAgICAgICAgICAgIHYgPSBwYXJ0aWFsLmxlbmd0aCA9PT0gMCA/ICdbXScgOiBnYXAgP1xuICAgICAgICAgICAgICAgICAgJ1tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnXScgOlxuICAgICAgICAgICAgICAgICAgJ1snICsgcGFydGlhbC5qb2luKCcsJykgKyAnXSc7XG4gICAgICAgICAgICAgIGdhcCA9IG1pbmQ7XG4gICAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICAgIH1cblxuLy8gSWYgdGhlIHJlcGxhY2VyIGlzIGFuIGFycmF5LCB1c2UgaXQgdG8gc2VsZWN0IHRoZSBtZW1iZXJzIHRvIGJlIHN0cmluZ2lmaWVkLlxuXG4gICAgICAgICAgaWYgKHJlcCAmJiB0eXBlb2YgcmVwID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICBsZW5ndGggPSByZXAubGVuZ3RoO1xuICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVwW2ldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgIGsgPSByZXBbaV07XG4gICAgICAgICAgICAgICAgICAgICAgdiA9IHN0cihrLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGFydGlhbC5wdXNoKHF1b3RlKGspICsgKGdhcCA/ICc6ICcgOiAnOicpICsgdik7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcblxuLy8gT3RoZXJ3aXNlLCBpdGVyYXRlIHRocm91Z2ggYWxsIG9mIHRoZSBrZXlzIGluIHRoZSBvYmplY3QuXG5cbiAgICAgICAgICAgICAgZm9yIChrIGluIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHYgPSBzdHIoaywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh2KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRpYWwucHVzaChxdW90ZShrKSArIChnYXAgPyAnOiAnIDogJzonKSArIHYpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuLy8gSm9pbiBhbGwgb2YgdGhlIG1lbWJlciB0ZXh0cyB0b2dldGhlciwgc2VwYXJhdGVkIHdpdGggY29tbWFzLFxuLy8gYW5kIHdyYXAgdGhlbSBpbiBicmFjZXMuXG5cbiAgICAgICAgICB2ID0gcGFydGlhbC5sZW5ndGggPT09IDAgPyAne30nIDogZ2FwID9cbiAgICAgICAgICAgICAgJ3tcXG4nICsgZ2FwICsgcGFydGlhbC5qb2luKCcsXFxuJyArIGdhcCkgKyAnXFxuJyArIG1pbmQgKyAnfScgOlxuICAgICAgICAgICAgICAneycgKyBwYXJ0aWFsLmpvaW4oJywnKSArICd9JztcbiAgICAgICAgICBnYXAgPSBtaW5kO1xuICAgICAgICAgIHJldHVybiB2O1xuICAgICAgfVxuICB9XG5cbi8vIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCB5ZXQgaGF2ZSBhIHN0cmluZ2lmeSBtZXRob2QsIGdpdmUgaXQgb25lLlxuXG4gIEpTT04uc3RyaW5naWZ5ID0gZnVuY3Rpb24gKHZhbHVlLCByZXBsYWNlciwgc3BhY2UpIHtcblxuLy8gVGhlIHN0cmluZ2lmeSBtZXRob2QgdGFrZXMgYSB2YWx1ZSBhbmQgYW4gb3B0aW9uYWwgcmVwbGFjZXIsIGFuZCBhbiBvcHRpb25hbFxuLy8gc3BhY2UgcGFyYW1ldGVyLCBhbmQgcmV0dXJucyBhIEpTT04gdGV4dC4gVGhlIHJlcGxhY2VyIGNhbiBiZSBhIGZ1bmN0aW9uXG4vLyB0aGF0IGNhbiByZXBsYWNlIHZhbHVlcywgb3IgYW4gYXJyYXkgb2Ygc3RyaW5ncyB0aGF0IHdpbGwgc2VsZWN0IHRoZSBrZXlzLlxuLy8gQSBkZWZhdWx0IHJlcGxhY2VyIG1ldGhvZCBjYW4gYmUgcHJvdmlkZWQuIFVzZSBvZiB0aGUgc3BhY2UgcGFyYW1ldGVyIGNhblxuLy8gcHJvZHVjZSB0ZXh0IHRoYXQgaXMgbW9yZSBlYXNpbHkgcmVhZGFibGUuXG5cbiAgICAgIHZhciBpO1xuICAgICAgZ2FwID0gJyc7XG4gICAgICBpbmRlbnQgPSAnJztcblxuLy8gSWYgdGhlIHNwYWNlIHBhcmFtZXRlciBpcyBhIG51bWJlciwgbWFrZSBhbiBpbmRlbnQgc3RyaW5nIGNvbnRhaW5pbmcgdGhhdFxuLy8gbWFueSBzcGFjZXMuXG5cbiAgICAgIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNwYWNlOyBpICs9IDEpIHtcbiAgICAgICAgICAgICAgaW5kZW50ICs9ICcgJztcbiAgICAgICAgICB9XG5cbi8vIElmIHRoZSBzcGFjZSBwYXJhbWV0ZXIgaXMgYSBzdHJpbmcsIGl0IHdpbGwgYmUgdXNlZCBhcyB0aGUgaW5kZW50IHN0cmluZy5cblxuICAgICAgfSBlbHNlIGlmICh0eXBlb2Ygc3BhY2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaW5kZW50ID0gc3BhY2U7XG4gICAgICB9XG5cbi8vIElmIHRoZXJlIGlzIGEgcmVwbGFjZXIsIGl0IG11c3QgYmUgYSBmdW5jdGlvbiBvciBhbiBhcnJheS5cbi8vIE90aGVyd2lzZSwgdGhyb3cgYW4gZXJyb3IuXG5cbiAgICAgIHJlcCA9IHJlcGxhY2VyO1xuICAgICAgaWYgKHJlcGxhY2VyICYmIHR5cGVvZiByZXBsYWNlciAhPT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgICAgICAgICAodHlwZW9mIHJlcGxhY2VyICE9PSAnb2JqZWN0JyB8fFxuICAgICAgICAgICAgICB0eXBlb2YgcmVwbGFjZXIubGVuZ3RoICE9PSAnbnVtYmVyJykpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0pTT04uc3RyaW5naWZ5Jyk7XG4gICAgICB9XG5cbi8vIE1ha2UgYSBmYWtlIHJvb3Qgb2JqZWN0IGNvbnRhaW5pbmcgb3VyIHZhbHVlIHVuZGVyIHRoZSBrZXkgb2YgJycuXG4vLyBSZXR1cm4gdGhlIHJlc3VsdCBvZiBzdHJpbmdpZnlpbmcgdGhlIHZhbHVlLlxuXG4gICAgICByZXR1cm4gc3RyKCcnLCB7Jyc6IHZhbHVlfSk7XG4gIH07XG5cbi8vIElmIHRoZSBKU09OIG9iamVjdCBkb2VzIG5vdCB5ZXQgaGF2ZSBhIHBhcnNlIG1ldGhvZCwgZ2l2ZSBpdCBvbmUuXG5cbiAgSlNPTi5wYXJzZSA9IGZ1bmN0aW9uICh0ZXh0LCByZXZpdmVyKSB7XG4gIC8vIFRoZSBwYXJzZSBtZXRob2QgdGFrZXMgYSB0ZXh0IGFuZCBhbiBvcHRpb25hbCByZXZpdmVyIGZ1bmN0aW9uLCBhbmQgcmV0dXJuc1xuICAvLyBhIEphdmFTY3JpcHQgdmFsdWUgaWYgdGhlIHRleHQgaXMgYSB2YWxpZCBKU09OIHRleHQuXG5cbiAgICAgIHZhciBqO1xuXG4gICAgICBmdW5jdGlvbiB3YWxrKGhvbGRlciwga2V5KSB7XG5cbiAgLy8gVGhlIHdhbGsgbWV0aG9kIGlzIHVzZWQgdG8gcmVjdXJzaXZlbHkgd2FsayB0aGUgcmVzdWx0aW5nIHN0cnVjdHVyZSBzb1xuICAvLyB0aGF0IG1vZGlmaWNhdGlvbnMgY2FuIGJlIG1hZGUuXG5cbiAgICAgICAgICB2YXIgaywgdiwgdmFsdWUgPSBob2xkZXJba2V5XTtcbiAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdiA9IHdhbGsodmFsdWUsIGspO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSB2O1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtrXTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldml2ZXIuY2FsbChob2xkZXIsIGtleSwgdmFsdWUpO1xuICAgICAgfVxuXG5cbiAgLy8gUGFyc2luZyBoYXBwZW5zIGluIGZvdXIgc3RhZ2VzLiBJbiB0aGUgZmlyc3Qgc3RhZ2UsIHdlIHJlcGxhY2UgY2VydGFpblxuICAvLyBVbmljb2RlIGNoYXJhY3RlcnMgd2l0aCBlc2NhcGUgc2VxdWVuY2VzLiBKYXZhU2NyaXB0IGhhbmRsZXMgbWFueSBjaGFyYWN0ZXJzXG4gIC8vIGluY29ycmVjdGx5LCBlaXRoZXIgc2lsZW50bHkgZGVsZXRpbmcgdGhlbSwgb3IgdHJlYXRpbmcgdGhlbSBhcyBsaW5lIGVuZGluZ3MuXG5cbiAgICAgIHRleHQgPSBTdHJpbmcodGV4dCk7XG4gICAgICBjeC5sYXN0SW5kZXggPSAwO1xuICAgICAgaWYgKGN4LnRlc3QodGV4dCkpIHtcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGN4LCBmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgICByZXR1cm4gJ1xcXFx1JyArXG4gICAgICAgICAgICAgICAgICAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gIC8vIEluIHRoZSBzZWNvbmQgc3RhZ2UsIHdlIHJ1biB0aGUgdGV4dCBhZ2FpbnN0IHJlZ3VsYXIgZXhwcmVzc2lvbnMgdGhhdCBsb29rXG4gIC8vIGZvciBub24tSlNPTiBwYXR0ZXJucy4gV2UgYXJlIGVzcGVjaWFsbHkgY29uY2VybmVkIHdpdGggJygpJyBhbmQgJ25ldydcbiAgLy8gYmVjYXVzZSB0aGV5IGNhbiBjYXVzZSBpbnZvY2F0aW9uLCBhbmQgJz0nIGJlY2F1c2UgaXQgY2FuIGNhdXNlIG11dGF0aW9uLlxuICAvLyBCdXQganVzdCB0byBiZSBzYWZlLCB3ZSB3YW50IHRvIHJlamVjdCBhbGwgdW5leHBlY3RlZCBmb3Jtcy5cblxuICAvLyBXZSBzcGxpdCB0aGUgc2Vjb25kIHN0YWdlIGludG8gNCByZWdleHAgb3BlcmF0aW9ucyBpbiBvcmRlciB0byB3b3JrIGFyb3VuZFxuICAvLyBjcmlwcGxpbmcgaW5lZmZpY2llbmNpZXMgaW4gSUUncyBhbmQgU2FmYXJpJ3MgcmVnZXhwIGVuZ2luZXMuIEZpcnN0IHdlXG4gIC8vIHJlcGxhY2UgdGhlIEpTT04gYmFja3NsYXNoIHBhaXJzIHdpdGggJ0AnIChhIG5vbi1KU09OIGNoYXJhY3RlcikuIFNlY29uZCwgd2VcbiAgLy8gcmVwbGFjZSBhbGwgc2ltcGxlIHZhbHVlIHRva2VucyB3aXRoICddJyBjaGFyYWN0ZXJzLiBUaGlyZCwgd2UgZGVsZXRlIGFsbFxuICAvLyBvcGVuIGJyYWNrZXRzIHRoYXQgZm9sbG93IGEgY29sb24gb3IgY29tbWEgb3IgdGhhdCBiZWdpbiB0aGUgdGV4dC4gRmluYWxseSxcbiAgLy8gd2UgbG9vayB0byBzZWUgdGhhdCB0aGUgcmVtYWluaW5nIGNoYXJhY3RlcnMgYXJlIG9ubHkgd2hpdGVzcGFjZSBvciAnXScgb3JcbiAgLy8gJywnIG9yICc6JyBvciAneycgb3IgJ30nLiBJZiB0aGF0IGlzIHNvLCB0aGVuIHRoZSB0ZXh0IGlzIHNhZmUgZm9yIGV2YWwuXG5cbiAgICAgIGlmICgvXltcXF0sOnt9XFxzXSokL1xuICAgICAgICAgICAgICAudGVzdCh0ZXh0LnJlcGxhY2UoL1xcXFwoPzpbXCJcXFxcXFwvYmZucnRdfHVbMC05YS1mQS1GXXs0fSkvZywgJ0AnKVxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1wiW15cIlxcXFxcXG5cXHJdKlwifHRydWV8ZmFsc2V8bnVsbHwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPy9nLCAnXScpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKD86Xnw6fCwpKD86XFxzKlxcWykrL2csICcnKSkpIHtcblxuICAvLyBJbiB0aGUgdGhpcmQgc3RhZ2Ugd2UgdXNlIHRoZSBldmFsIGZ1bmN0aW9uIHRvIGNvbXBpbGUgdGhlIHRleHQgaW50byBhXG4gIC8vIEphdmFTY3JpcHQgc3RydWN0dXJlLiBUaGUgJ3snIG9wZXJhdG9yIGlzIHN1YmplY3QgdG8gYSBzeW50YWN0aWMgYW1iaWd1aXR5XG4gIC8vIGluIEphdmFTY3JpcHQ6IGl0IGNhbiBiZWdpbiBhIGJsb2NrIG9yIGFuIG9iamVjdCBsaXRlcmFsLiBXZSB3cmFwIHRoZSB0ZXh0XG4gIC8vIGluIHBhcmVucyB0byBlbGltaW5hdGUgdGhlIGFtYmlndWl0eS5cblxuICAgICAgICAgIGogPSBldmFsKCcoJyArIHRleHQgKyAnKScpO1xuXG4gIC8vIEluIHRoZSBvcHRpb25hbCBmb3VydGggc3RhZ2UsIHdlIHJlY3Vyc2l2ZWx5IHdhbGsgdGhlIG5ldyBzdHJ1Y3R1cmUsIHBhc3NpbmdcbiAgLy8gZWFjaCBuYW1lL3ZhbHVlIHBhaXIgdG8gYSByZXZpdmVyIGZ1bmN0aW9uIGZvciBwb3NzaWJsZSB0cmFuc2Zvcm1hdGlvbi5cblxuICAgICAgICAgIHJldHVybiB0eXBlb2YgcmV2aXZlciA9PT0gJ2Z1bmN0aW9uJyA/XG4gICAgICAgICAgICAgIHdhbGsoeycnOiBqfSwgJycpIDogajtcbiAgICAgIH1cblxuICAvLyBJZiB0aGUgdGV4dCBpcyBub3QgSlNPTiBwYXJzZWFibGUsIHRoZW4gYSBTeW50YXhFcnJvciBpcyB0aHJvd24uXG5cbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignSlNPTi5wYXJzZScpO1xuICB9O1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzXG4gICwgdHlwZW9mIEpTT04gIT09ICd1bmRlZmluZWQnID8gSlNPTiA6IHVuZGVmaW5lZFxuKTtcblxuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8pIHtcblxuICAvKipcbiAgICogUGFyc2VyIG5hbWVzcGFjZS5cbiAgICpcbiAgICogQG5hbWVzcGFjZVxuICAgKi9cblxuICB2YXIgcGFyc2VyID0gZXhwb3J0cy5wYXJzZXIgPSB7fTtcblxuICAvKipcbiAgICogUGFja2V0IHR5cGVzLlxuICAgKi9cblxuICB2YXIgcGFja2V0cyA9IHBhcnNlci5wYWNrZXRzID0gW1xuICAgICAgJ2Rpc2Nvbm5lY3QnXG4gICAgLCAnY29ubmVjdCdcbiAgICAsICdoZWFydGJlYXQnXG4gICAgLCAnbWVzc2FnZSdcbiAgICAsICdqc29uJ1xuICAgICwgJ2V2ZW50J1xuICAgICwgJ2FjaydcbiAgICAsICdlcnJvcidcbiAgICAsICdub29wJ1xuICBdO1xuXG4gIC8qKlxuICAgKiBFcnJvcnMgcmVhc29ucy5cbiAgICovXG5cbiAgdmFyIHJlYXNvbnMgPSBwYXJzZXIucmVhc29ucyA9IFtcbiAgICAgICd0cmFuc3BvcnQgbm90IHN1cHBvcnRlZCdcbiAgICAsICdjbGllbnQgbm90IGhhbmRzaGFrZW4nXG4gICAgLCAndW5hdXRob3JpemVkJ1xuICBdO1xuXG4gIC8qKlxuICAgKiBFcnJvcnMgYWR2aWNlLlxuICAgKi9cblxuICB2YXIgYWR2aWNlID0gcGFyc2VyLmFkdmljZSA9IFtcbiAgICAgICdyZWNvbm5lY3QnXG4gIF07XG5cbiAgLyoqXG4gICAqIFNob3J0Y3V0cy5cbiAgICovXG5cbiAgdmFyIEpTT04gPSBpby5KU09OXG4gICAgLCBpbmRleE9mID0gaW8udXRpbC5pbmRleE9mO1xuXG4gIC8qKlxuICAgKiBFbmNvZGVzIGEgcGFja2V0LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgcGFyc2VyLmVuY29kZVBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICB2YXIgdHlwZSA9IGluZGV4T2YocGFja2V0cywgcGFja2V0LnR5cGUpXG4gICAgICAsIGlkID0gcGFja2V0LmlkIHx8ICcnXG4gICAgICAsIGVuZHBvaW50ID0gcGFja2V0LmVuZHBvaW50IHx8ICcnXG4gICAgICAsIGFjayA9IHBhY2tldC5hY2tcbiAgICAgICwgZGF0YSA9IG51bGw7XG5cbiAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIHZhciByZWFzb24gPSBwYWNrZXQucmVhc29uID8gaW5kZXhPZihyZWFzb25zLCBwYWNrZXQucmVhc29uKSA6ICcnXG4gICAgICAgICAgLCBhZHYgPSBwYWNrZXQuYWR2aWNlID8gaW5kZXhPZihhZHZpY2UsIHBhY2tldC5hZHZpY2UpIDogJyc7XG5cbiAgICAgICAgaWYgKHJlYXNvbiAhPT0gJycgfHwgYWR2ICE9PSAnJylcbiAgICAgICAgICBkYXRhID0gcmVhc29uICsgKGFkdiAhPT0gJycgPyAoJysnICsgYWR2KSA6ICcnKTtcblxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnbWVzc2FnZSc6XG4gICAgICAgIGlmIChwYWNrZXQuZGF0YSAhPT0gJycpXG4gICAgICAgICAgZGF0YSA9IHBhY2tldC5kYXRhO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXZlbnQnOlxuICAgICAgICB2YXIgZXYgPSB7IG5hbWU6IHBhY2tldC5uYW1lIH07XG5cbiAgICAgICAgaWYgKHBhY2tldC5hcmdzICYmIHBhY2tldC5hcmdzLmxlbmd0aCkge1xuICAgICAgICAgIGV2LmFyZ3MgPSBwYWNrZXQuYXJncztcbiAgICAgICAgfVxuXG4gICAgICAgIGRhdGEgPSBKU09OLnN0cmluZ2lmeShldik7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdqc29uJzpcbiAgICAgICAgZGF0YSA9IEpTT04uc3RyaW5naWZ5KHBhY2tldC5kYXRhKTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Nvbm5lY3QnOlxuICAgICAgICBpZiAocGFja2V0LnFzKVxuICAgICAgICAgIGRhdGEgPSBwYWNrZXQucXM7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdhY2snOlxuICAgICAgICBkYXRhID0gcGFja2V0LmFja0lkXG4gICAgICAgICAgKyAocGFja2V0LmFyZ3MgJiYgcGFja2V0LmFyZ3MubGVuZ3RoXG4gICAgICAgICAgICAgID8gJysnICsgSlNPTi5zdHJpbmdpZnkocGFja2V0LmFyZ3MpIDogJycpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBjb25zdHJ1Y3QgcGFja2V0IHdpdGggcmVxdWlyZWQgZnJhZ21lbnRzXG4gICAgdmFyIGVuY29kZWQgPSBbXG4gICAgICAgIHR5cGVcbiAgICAgICwgaWQgKyAoYWNrID09ICdkYXRhJyA/ICcrJyA6ICcnKVxuICAgICAgLCBlbmRwb2ludFxuICAgIF07XG5cbiAgICAvLyBkYXRhIGZyYWdtZW50IGlzIG9wdGlvbmFsXG4gICAgaWYgKGRhdGEgIT09IG51bGwgJiYgZGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgZW5jb2RlZC5wdXNoKGRhdGEpO1xuXG4gICAgcmV0dXJuIGVuY29kZWQuam9pbignOicpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbmNvZGVzIG11bHRpcGxlIG1lc3NhZ2VzIChwYXlsb2FkKS5cbiAgICpcbiAgICogQHBhcmFtIHtBcnJheX0gbWVzc2FnZXNcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIHBhcnNlci5lbmNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKHBhY2tldHMpIHtcbiAgICB2YXIgZGVjb2RlZCA9ICcnO1xuXG4gICAgaWYgKHBhY2tldHMubGVuZ3RoID09IDEpXG4gICAgICByZXR1cm4gcGFja2V0c1swXTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gcGFja2V0cy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIHZhciBwYWNrZXQgPSBwYWNrZXRzW2ldO1xuICAgICAgZGVjb2RlZCArPSAnXFx1ZmZmZCcgKyBwYWNrZXQubGVuZ3RoICsgJ1xcdWZmZmQnICsgcGFja2V0c1tpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZGVjb2RlZDtcbiAgfTtcblxuICAvKipcbiAgICogRGVjb2RlcyBhIHBhY2tldFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgdmFyIHJlZ2V4cCA9IC8oW146XSspOihbMC05XSspPyhcXCspPzooW146XSspPzo/KFtcXHNcXFNdKik/LztcblxuICBwYXJzZXIuZGVjb2RlUGFja2V0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgcGllY2VzID0gZGF0YS5tYXRjaChyZWdleHApO1xuXG4gICAgaWYgKCFwaWVjZXMpIHJldHVybiB7fTtcblxuICAgIHZhciBpZCA9IHBpZWNlc1syXSB8fCAnJ1xuICAgICAgLCBkYXRhID0gcGllY2VzWzVdIHx8ICcnXG4gICAgICAsIHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6IHBhY2tldHNbcGllY2VzWzFdXVxuICAgICAgICAgICwgZW5kcG9pbnQ6IHBpZWNlc1s0XSB8fCAnJ1xuICAgICAgICB9O1xuXG4gICAgLy8gd2hldGhlciB3ZSBuZWVkIHRvIGFja25vd2xlZGdlIHRoZSBwYWNrZXRcbiAgICBpZiAoaWQpIHtcbiAgICAgIHBhY2tldC5pZCA9IGlkO1xuICAgICAgaWYgKHBpZWNlc1szXSlcbiAgICAgICAgcGFja2V0LmFjayA9ICdkYXRhJztcbiAgICAgIGVsc2VcbiAgICAgICAgcGFja2V0LmFjayA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gaGFuZGxlIGRpZmZlcmVudCBwYWNrZXQgdHlwZXNcbiAgICBzd2l0Y2ggKHBhY2tldC50eXBlKSB7XG4gICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgIHZhciBwaWVjZXMgPSBkYXRhLnNwbGl0KCcrJyk7XG4gICAgICAgIHBhY2tldC5yZWFzb24gPSByZWFzb25zW3BpZWNlc1swXV0gfHwgJyc7XG4gICAgICAgIHBhY2tldC5hZHZpY2UgPSBhZHZpY2VbcGllY2VzWzFdXSB8fCAnJztcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ21lc3NhZ2UnOlxuICAgICAgICBwYWNrZXQuZGF0YSA9IGRhdGEgfHwgJyc7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdldmVudCc6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIG9wdHMgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICAgIHBhY2tldC5uYW1lID0gb3B0cy5uYW1lO1xuICAgICAgICAgIHBhY2tldC5hcmdzID0gb3B0cy5hcmdzO1xuICAgICAgICB9IGNhdGNoIChlKSB7IH1cblxuICAgICAgICBwYWNrZXQuYXJncyA9IHBhY2tldC5hcmdzIHx8IFtdO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnanNvbic6XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcGFja2V0LmRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgICB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgJ2Nvbm5lY3QnOlxuICAgICAgICBwYWNrZXQucXMgPSBkYXRhIHx8ICcnO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYWNrJzpcbiAgICAgICAgdmFyIHBpZWNlcyA9IGRhdGEubWF0Y2goL14oWzAtOV0rKShcXCspPyguKikvKTtcbiAgICAgICAgaWYgKHBpZWNlcykge1xuICAgICAgICAgIHBhY2tldC5hY2tJZCA9IHBpZWNlc1sxXTtcbiAgICAgICAgICBwYWNrZXQuYXJncyA9IFtdO1xuXG4gICAgICAgICAgaWYgKHBpZWNlc1szXSkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgcGFja2V0LmFyZ3MgPSBwaWVjZXNbM10gPyBKU09OLnBhcnNlKHBpZWNlc1szXSkgOiBbXTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZGlzY29ubmVjdCc6XG4gICAgICBjYXNlICdoZWFydGJlYXQnOlxuICAgICAgICBicmVhaztcbiAgICB9O1xuXG4gICAgcmV0dXJuIHBhY2tldDtcbiAgfTtcblxuICAvKipcbiAgICogRGVjb2RlcyBkYXRhIHBheWxvYWQuIERldGVjdHMgbXVsdGlwbGUgbWVzc2FnZXNcbiAgICpcbiAgICogQHJldHVybiB7QXJyYXl9IG1lc3NhZ2VzXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIHBhcnNlci5kZWNvZGVQYXlsb2FkID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAvLyBJRSBkb2Vzbid0IGxpa2UgZGF0YVtpXSBmb3IgdW5pY29kZSBjaGFycywgY2hhckF0IHdvcmtzIGZpbmVcbiAgICBpZiAoZGF0YS5jaGFyQXQoMCkgPT0gJ1xcdWZmZmQnKSB7XG4gICAgICB2YXIgcmV0ID0gW107XG5cbiAgICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSAnJzsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGRhdGEuY2hhckF0KGkpID09ICdcXHVmZmZkJykge1xuICAgICAgICAgIHJldC5wdXNoKHBhcnNlci5kZWNvZGVQYWNrZXQoZGF0YS5zdWJzdHIoaSArIDEpLnN1YnN0cigwLCBsZW5ndGgpKSk7XG4gICAgICAgICAgaSArPSBOdW1iZXIobGVuZ3RoKSArIDE7XG4gICAgICAgICAgbGVuZ3RoID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGVuZ3RoICs9IGRhdGEuY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbcGFyc2VyLmRlY29kZVBhY2tldChkYXRhKV07XG4gICAgfVxuICB9O1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbik7XG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMuVHJhbnNwb3J0ID0gVHJhbnNwb3J0O1xuXG4gIC8qKlxuICAgKiBUaGlzIGlzIHRoZSB0cmFuc3BvcnQgdGVtcGxhdGUgZm9yIGFsbCBzdXBwb3J0ZWQgdHJhbnNwb3J0IG1ldGhvZHMuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBUcmFuc3BvcnQgKHNvY2tldCwgc2Vzc2lkKSB7XG4gICAgdGhpcy5zb2NrZXQgPSBzb2NrZXQ7XG4gICAgdGhpcy5zZXNzaWQgPSBzZXNzaWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGx5IEV2ZW50RW1pdHRlciBtaXhpbi5cbiAgICovXG5cbiAgaW8udXRpbC5taXhpbihUcmFuc3BvcnQsIGlvLkV2ZW50RW1pdHRlcik7XG5cblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgaGVhcnRiZWF0cyBpcyBlbmFibGVkIGZvciB0aGlzIHRyYW5zcG9ydFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5oZWFydGJlYXRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSByZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuIFdoZW4gYSBuZXcgcmVzcG9uc2UgaXMgcmVjZWl2ZWRcbiAgICogaXQgd2lsbCBhdXRvbWF0aWNhbGx5IHVwZGF0ZSB0aGUgdGltZW91dCwgZGVjb2RlIHRoZSBtZXNzYWdlIGFuZFxuICAgKiBmb3J3YXJkcyB0aGUgcmVzcG9uc2UgdG8gdGhlIG9uTWVzc2FnZSBmdW5jdGlvbiBmb3IgZnVydGhlciBwcm9jZXNzaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBSZXNwb25zZSBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5jbGVhckNsb3NlVGltZW91dCgpO1xuXG4gICAgLy8gSWYgdGhlIGNvbm5lY3Rpb24gaW4gY3VycmVudGx5IG9wZW4gKG9yIGluIGEgcmVvcGVuaW5nIHN0YXRlKSByZXNldCB0aGUgY2xvc2VcbiAgICAvLyB0aW1lb3V0IHNpbmNlIHdlIGhhdmUganVzdCByZWNlaXZlZCBkYXRhLiBUaGlzIGNoZWNrIGlzIG5lY2Vzc2FyeSBzb1xuICAgIC8vIHRoYXQgd2UgZG9uJ3QgcmVzZXQgdGhlIHRpbWVvdXQgb24gYW4gZXhwbGljaXRseSBkaXNjb25uZWN0ZWQgY29ubmVjdGlvbi5cbiAgICBpZiAodGhpcy5zb2NrZXQuY29ubmVjdGVkIHx8IHRoaXMuc29ja2V0LmNvbm5lY3RpbmcgfHwgdGhpcy5zb2NrZXQucmVjb25uZWN0aW5nKSB7XG4gICAgICB0aGlzLnNldENsb3NlVGltZW91dCgpO1xuICAgIH1cblxuICAgIGlmIChkYXRhICE9PSAnJykge1xuICAgICAgLy8gdG9kbzogd2Ugc2hvdWxkIG9ubHkgZG8gZGVjb2RlUGF5bG9hZCBmb3IgeGhyIHRyYW5zcG9ydHNcbiAgICAgIHZhciBtc2dzID0gaW8ucGFyc2VyLmRlY29kZVBheWxvYWQoZGF0YSk7XG5cbiAgICAgIGlmIChtc2dzICYmIG1zZ3MubGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbXNncy5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICB0aGlzLm9uUGFja2V0KG1zZ3NbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgcGFja2V0cy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgdGhpcy5zb2NrZXQuc2V0SGVhcnRiZWF0VGltZW91dCgpO1xuXG4gICAgaWYgKHBhY2tldC50eXBlID09ICdoZWFydGJlYXQnKSB7XG4gICAgICByZXR1cm4gdGhpcy5vbkhlYXJ0YmVhdCgpO1xuICAgIH1cblxuICAgIGlmIChwYWNrZXQudHlwZSA9PSAnY29ubmVjdCcgJiYgcGFja2V0LmVuZHBvaW50ID09ICcnKSB7XG4gICAgICB0aGlzLm9uQ29ubmVjdCgpO1xuICAgIH1cblxuICAgIGlmIChwYWNrZXQudHlwZSA9PSAnZXJyb3InICYmIHBhY2tldC5hZHZpY2UgPT0gJ3JlY29ubmVjdCcpIHtcbiAgICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy5zb2NrZXQub25QYWNrZXQocGFja2V0KTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZXRzIGNsb3NlIHRpbWVvdXRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUuc2V0Q2xvc2VUaW1lb3V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5jbG9zZVRpbWVvdXQpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgICAgdGhpcy5jbG9zZVRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2VsZi5vbkRpc2Nvbm5lY3QoKTtcbiAgICAgIH0sIHRoaXMuc29ja2V0LmNsb3NlVGltZW91dCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0cmFuc3BvcnQgZGlzY29ubmVjdHMuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uRGlzY29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pc09wZW4pIHRoaXMuY2xvc2UoKTtcbiAgICB0aGlzLmNsZWFyVGltZW91dHMoKTtcbiAgICB0aGlzLnNvY2tldC5vbkRpc2Nvbm5lY3QoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdHJhbnNwb3J0IGNvbm5lY3RzXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uQ29ubmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNvY2tldC5vbkNvbm5lY3QoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXJzIGNsb3NlIHRpbWVvdXRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUuY2xlYXJDbG9zZVRpbWVvdXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY2xvc2VUaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5jbG9zZVRpbWVvdXQpO1xuICAgICAgdGhpcy5jbG9zZVRpbWVvdXQgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2xlYXIgdGltZW91dHNcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUuY2xlYXJUaW1lb3V0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCk7XG5cbiAgICBpZiAodGhpcy5yZW9wZW5UaW1lb3V0KSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5yZW9wZW5UaW1lb3V0KTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgcGFja2V0XG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYWNrZXQgb2JqZWN0LlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgVHJhbnNwb3J0LnByb3RvdHlwZS5wYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgdGhpcy5zZW5kKGlvLnBhcnNlci5lbmNvZGVQYWNrZXQocGFja2V0KSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmQgdGhlIHJlY2VpdmVkIGhlYXJ0YmVhdCBtZXNzYWdlIGJhY2sgdG8gc2VydmVyLiBTbyB0aGUgc2VydmVyXG4gICAqIGtub3dzIHdlIGFyZSBzdGlsbCBjb25uZWN0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBoZWFydGJlYXQgSGVhcnRiZWF0IHJlc3BvbnNlIGZyb20gdGhlIHNlcnZlci5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25IZWFydGJlYXQgPSBmdW5jdGlvbiAoaGVhcnRiZWF0KSB7XG4gICAgdGhpcy5wYWNrZXQoeyB0eXBlOiAnaGVhcnRiZWF0JyB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBvcGVucy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUub25PcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaXNPcGVuID0gdHJ1ZTtcbiAgICB0aGlzLmNsZWFyQ2xvc2VUaW1lb3V0KCk7XG4gICAgdGhpcy5zb2NrZXQub25PcGVuKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIE5vdGlmaWVzIHRoZSBiYXNlIHdoZW4gdGhlIGNvbm5lY3Rpb24gd2l0aCB0aGUgU29ja2V0LklPIHNlcnZlclxuICAgKiBoYXMgYmVlbiBkaXNjb25uZWN0ZWQuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLm9uQ2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgLyogRklYTUU6IHJlb3BlbiBkZWxheSBjYXVzaW5nIGEgaW5maW5pdCBsb29wXG4gICAgdGhpcy5yZW9wZW5UaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLm9wZW4oKTtcbiAgICB9LCB0aGlzLnNvY2tldC5vcHRpb25zWydyZW9wZW4gZGVsYXknXSk7Ki9cblxuICAgIHRoaXMuaXNPcGVuID0gZmFsc2U7XG4gICAgdGhpcy5zb2NrZXQub25DbG9zZSgpO1xuICAgIHRoaXMub25EaXNjb25uZWN0KCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIGNvbm5lY3Rpb24gdXJsIGJhc2VkIG9uIHRoZSBTb2NrZXQuSU8gVVJMIFByb3RvY29sLlxuICAgKiBTZWUgPGh0dHBzOi8vZ2l0aHViLmNvbS9sZWFybmJvb3N0L3NvY2tldC5pby1ub2RlLz4gZm9yIG1vcmUgZGV0YWlscy5cbiAgICpcbiAgICogQHJldHVybnMge1N0cmluZ30gQ29ubmVjdGlvbiB1cmxcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFRyYW5zcG9ydC5wcm90b3R5cGUucHJlcGFyZVVybCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHRoaXMuc29ja2V0Lm9wdGlvbnM7XG5cbiAgICByZXR1cm4gdGhpcy5zY2hlbWUoKSArICc6Ly8nXG4gICAgICArIG9wdGlvbnMuaG9zdCArICc6JyArIG9wdGlvbnMucG9ydCArICcvJ1xuICAgICAgKyBvcHRpb25zLnJlc291cmNlICsgJy8nICsgaW8ucHJvdG9jb2xcbiAgICAgICsgJy8nICsgdGhpcy5uYW1lICsgJy8nICsgdGhpcy5zZXNzaWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiB0aGUgdHJhbnNwb3J0IGlzIHJlYWR5IHRvIHN0YXJ0IGEgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldCBUaGUgc29ja2V0IGluc3RhbmNlIHRoYXQgbmVlZHMgYSB0cmFuc3BvcnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBUcmFuc3BvcnQucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24gKHNvY2tldCwgZm4pIHtcbiAgICBmbi5jYWxsKHRoaXMpO1xuICB9O1xufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4pO1xuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8sIGdsb2JhbCkge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMuU29ja2V0ID0gU29ja2V0O1xuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBuZXcgYFNvY2tldC5JTyBjbGllbnRgIHdoaWNoIGNhbiBlc3RhYmxpc2ggYSBwZXJzaXN0ZW50XG4gICAqIGNvbm5lY3Rpb24gd2l0aCBhIFNvY2tldC5JTyBlbmFibGVkIHNlcnZlci5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gU29ja2V0IChvcHRpb25zKSB7XG4gICAgdGhpcy5vcHRpb25zID0ge1xuICAgICAgICBwb3J0OiA4MFxuICAgICAgLCBzZWN1cmU6IGZhbHNlXG4gICAgICAsIGRvY3VtZW50OiAnZG9jdW1lbnQnIGluIGdsb2JhbCA/IGRvY3VtZW50IDogZmFsc2VcbiAgICAgICwgcmVzb3VyY2U6ICdzb2NrZXQuaW8nXG4gICAgICAsIHRyYW5zcG9ydHM6IGlvLnRyYW5zcG9ydHNcbiAgICAgICwgJ2Nvbm5lY3QgdGltZW91dCc6IDEwMDAwXG4gICAgICAsICd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyc6IHRydWVcbiAgICAgICwgJ3JlY29ubmVjdCc6IHRydWVcbiAgICAgICwgJ3JlY29ubmVjdGlvbiBkZWxheSc6IDUwMFxuICAgICAgLCAncmVjb25uZWN0aW9uIGxpbWl0JzogSW5maW5pdHlcbiAgICAgICwgJ3Jlb3BlbiBkZWxheSc6IDMwMDBcbiAgICAgICwgJ21heCByZWNvbm5lY3Rpb24gYXR0ZW1wdHMnOiAxMFxuICAgICAgLCAnc3luYyBkaXNjb25uZWN0IG9uIHVubG9hZCc6IGZhbHNlXG4gICAgICAsICdhdXRvIGNvbm5lY3QnOiB0cnVlXG4gICAgICAsICdmbGFzaCBwb2xpY3kgcG9ydCc6IDEwODQzXG4gICAgICAsICdtYW51YWxGbHVzaCc6IGZhbHNlXG4gICAgfTtcblxuICAgIGlvLnV0aWwubWVyZ2UodGhpcy5vcHRpb25zLCBvcHRpb25zKTtcblxuICAgIHRoaXMuY29ubmVjdGVkID0gZmFsc2U7XG4gICAgdGhpcy5vcGVuID0gZmFsc2U7XG4gICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm5hbWVzcGFjZXMgPSB7fTtcbiAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgIHRoaXMuZG9CdWZmZXIgPSBmYWxzZTtcblxuICAgIGlmICh0aGlzLm9wdGlvbnNbJ3N5bmMgZGlzY29ubmVjdCBvbiB1bmxvYWQnXSAmJlxuICAgICAgICAoIXRoaXMuaXNYRG9tYWluKCkgfHwgaW8udXRpbC51YS5oYXNDT1JTKSkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgaW8udXRpbC5vbihnbG9iYWwsICdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNlbGYuZGlzY29ubmVjdFN5bmMoKTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zWydhdXRvIGNvbm5lY3QnXSkge1xuICAgICAgdGhpcy5jb25uZWN0KCk7XG4gICAgfVxufTtcblxuICAvKipcbiAgICogQXBwbHkgRXZlbnRFbWl0dGVyIG1peGluLlxuICAgKi9cblxuICBpby51dGlsLm1peGluKFNvY2tldCwgaW8uRXZlbnRFbWl0dGVyKTtcblxuICAvKipcbiAgICogUmV0dXJucyBhIG5hbWVzcGFjZSBsaXN0ZW5lci9lbWl0dGVyIGZvciB0aGlzIHNvY2tldFxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9mID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBpZiAoIXRoaXMubmFtZXNwYWNlc1tuYW1lXSkge1xuICAgICAgdGhpcy5uYW1lc3BhY2VzW25hbWVdID0gbmV3IGlvLlNvY2tldE5hbWVzcGFjZSh0aGlzLCBuYW1lKTtcblxuICAgICAgaWYgKG5hbWUgIT09ICcnKSB7XG4gICAgICAgIHRoaXMubmFtZXNwYWNlc1tuYW1lXS5wYWNrZXQoeyB0eXBlOiAnY29ubmVjdCcgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMubmFtZXNwYWNlc1tuYW1lXTtcbiAgfTtcblxuICAvKipcbiAgICogRW1pdHMgdGhlIGdpdmVuIGV2ZW50IHRvIHRoZSBTb2NrZXQgYW5kIGFsbCBuYW1lc3BhY2VzXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLnB1Ymxpc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICB2YXIgbnNwO1xuXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLm5hbWVzcGFjZXMpIHtcbiAgICAgIGlmICh0aGlzLm5hbWVzcGFjZXMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgbnNwID0gdGhpcy5vZihpKTtcbiAgICAgICAgbnNwLiRlbWl0LmFwcGx5KG5zcCwgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIFBlcmZvcm1zIHRoZSBoYW5kc2hha2VcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGZ1bmN0aW9uIGVtcHR5ICgpIHsgfTtcblxuICBTb2NrZXQucHJvdG90eXBlLmhhbmRzaGFrZSA9IGZ1bmN0aW9uIChmbikge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBvcHRpb25zID0gdGhpcy5vcHRpb25zO1xuXG4gICAgZnVuY3Rpb24gY29tcGxldGUgKGRhdGEpIHtcbiAgICAgIGlmIChkYXRhIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgc2VsZi5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICAgIHNlbGYub25FcnJvcihkYXRhLm1lc3NhZ2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4uYXBwbHkobnVsbCwgZGF0YS5zcGxpdCgnOicpKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHVybCA9IFtcbiAgICAgICAgICAnaHR0cCcgKyAob3B0aW9ucy5zZWN1cmUgPyAncycgOiAnJykgKyAnOi8nXG4gICAgICAgICwgb3B0aW9ucy5ob3N0ICsgJzonICsgb3B0aW9ucy5wb3J0XG4gICAgICAgICwgb3B0aW9ucy5yZXNvdXJjZVxuICAgICAgICAsIGlvLnByb3RvY29sXG4gICAgICAgICwgaW8udXRpbC5xdWVyeSh0aGlzLm9wdGlvbnMucXVlcnksICd0PScgKyArbmV3IERhdGUpXG4gICAgICBdLmpvaW4oJy8nKTtcblxuICAgIGlmICh0aGlzLmlzWERvbWFpbigpICYmICFpby51dGlsLnVhLmhhc0NPUlMpIHtcbiAgICAgIHZhciBpbnNlcnRBdCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXVxuICAgICAgICAsIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpO1xuXG4gICAgICBzY3JpcHQuc3JjID0gdXJsICsgJyZqc29ucD0nICsgaW8uai5sZW5ndGg7XG4gICAgICBpbnNlcnRBdC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShzY3JpcHQsIGluc2VydEF0KTtcblxuICAgICAgaW8uai5wdXNoKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGNvbXBsZXRlKGRhdGEpO1xuICAgICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB4aHIgPSBpby51dGlsLnJlcXVlc3QoKTtcblxuICAgICAgeGhyLm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSk7XG4gICAgICBpZiAodGhpcy5pc1hEb21haW4oKSkge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh4aHIucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgICAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuXG4gICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgICAgICBjb21wbGV0ZSh4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHhoci5zdGF0dXMgPT0gNDAzKSB7XG4gICAgICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuY29ubmVjdGluZyA9IGZhbHNlOyAgICAgICAgICAgIFxuICAgICAgICAgICAgIXNlbGYucmVjb25uZWN0aW5nICYmIHNlbGYub25FcnJvcih4aHIucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB4aHIuc2VuZChudWxsKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbmQgYW4gYXZhaWxhYmxlIHRyYW5zcG9ydCBiYXNlZCBvbiB0aGUgb3B0aW9ucyBzdXBwbGllZCBpbiB0aGUgY29uc3RydWN0b3IuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLmdldFRyYW5zcG9ydCA9IGZ1bmN0aW9uIChvdmVycmlkZSkge1xuICAgIHZhciB0cmFuc3BvcnRzID0gb3ZlcnJpZGUgfHwgdGhpcy50cmFuc3BvcnRzLCBtYXRjaDtcblxuICAgIGZvciAodmFyIGkgPSAwLCB0cmFuc3BvcnQ7IHRyYW5zcG9ydCA9IHRyYW5zcG9ydHNbaV07IGkrKykge1xuICAgICAgaWYgKGlvLlRyYW5zcG9ydFt0cmFuc3BvcnRdXG4gICAgICAgICYmIGlvLlRyYW5zcG9ydFt0cmFuc3BvcnRdLmNoZWNrKHRoaXMpXG4gICAgICAgICYmICghdGhpcy5pc1hEb21haW4oKSB8fCBpby5UcmFuc3BvcnRbdHJhbnNwb3J0XS54ZG9tYWluQ2hlY2sodGhpcykpKSB7XG4gICAgICAgIHJldHVybiBuZXcgaW8uVHJhbnNwb3J0W3RyYW5zcG9ydF0odGhpcywgdGhpcy5zZXNzaW9uaWQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0byB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dIENhbGxiYWNrLlxuICAgKiBAcmV0dXJucyB7aW8uU29ja2V0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLmNvbm5lY3QgPSBmdW5jdGlvbiAoZm4pIHtcbiAgICBpZiAodGhpcy5jb25uZWN0aW5nKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgc2VsZi5jb25uZWN0aW5nID0gdHJ1ZTtcbiAgICBcbiAgICB0aGlzLmhhbmRzaGFrZShmdW5jdGlvbiAoc2lkLCBoZWFydGJlYXQsIGNsb3NlLCB0cmFuc3BvcnRzKSB7XG4gICAgICBzZWxmLnNlc3Npb25pZCA9IHNpZDtcbiAgICAgIHNlbGYuY2xvc2VUaW1lb3V0ID0gY2xvc2UgKiAxMDAwO1xuICAgICAgc2VsZi5oZWFydGJlYXRUaW1lb3V0ID0gaGVhcnRiZWF0ICogMTAwMDtcbiAgICAgIGlmKCFzZWxmLnRyYW5zcG9ydHMpXG4gICAgICAgICAgc2VsZi50cmFuc3BvcnRzID0gc2VsZi5vcmlnVHJhbnNwb3J0cyA9ICh0cmFuc3BvcnRzID8gaW8udXRpbC5pbnRlcnNlY3QoXG4gICAgICAgICAgICAgIHRyYW5zcG9ydHMuc3BsaXQoJywnKVxuICAgICAgICAgICAgLCBzZWxmLm9wdGlvbnMudHJhbnNwb3J0c1xuICAgICAgICAgICkgOiBzZWxmLm9wdGlvbnMudHJhbnNwb3J0cyk7XG5cbiAgICAgIHNlbGYuc2V0SGVhcnRiZWF0VGltZW91dCgpO1xuXG4gICAgICBmdW5jdGlvbiBjb25uZWN0ICh0cmFuc3BvcnRzKXtcbiAgICAgICAgaWYgKHNlbGYudHJhbnNwb3J0KSBzZWxmLnRyYW5zcG9ydC5jbGVhclRpbWVvdXRzKCk7XG5cbiAgICAgICAgc2VsZi50cmFuc3BvcnQgPSBzZWxmLmdldFRyYW5zcG9ydCh0cmFuc3BvcnRzKTtcbiAgICAgICAgaWYgKCFzZWxmLnRyYW5zcG9ydCkgcmV0dXJuIHNlbGYucHVibGlzaCgnY29ubmVjdF9mYWlsZWQnKTtcblxuICAgICAgICAvLyBvbmNlIHRoZSB0cmFuc3BvcnQgaXMgcmVhZHlcbiAgICAgICAgc2VsZi50cmFuc3BvcnQucmVhZHkoc2VsZiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHNlbGYuY29ubmVjdGluZyA9IHRydWU7XG4gICAgICAgICAgc2VsZi5wdWJsaXNoKCdjb25uZWN0aW5nJywgc2VsZi50cmFuc3BvcnQubmFtZSk7XG4gICAgICAgICAgc2VsZi50cmFuc3BvcnQub3BlbigpO1xuXG4gICAgICAgICAgaWYgKHNlbGYub3B0aW9uc1snY29ubmVjdCB0aW1lb3V0J10pIHtcbiAgICAgICAgICAgIHNlbGYuY29ubmVjdFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoIXNlbGYuY29ubmVjdGVkKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5jb25uZWN0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5vcHRpb25zWyd0cnkgbXVsdGlwbGUgdHJhbnNwb3J0cyddKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcmVtYWluaW5nID0gc2VsZi50cmFuc3BvcnRzO1xuXG4gICAgICAgICAgICAgICAgICB3aGlsZSAocmVtYWluaW5nLmxlbmd0aCA+IDAgJiYgcmVtYWluaW5nLnNwbGljZSgwLDEpWzBdICE9XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi50cmFuc3BvcnQubmFtZSkge31cblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVtYWluaW5nLmxlbmd0aCl7XG4gICAgICAgICAgICAgICAgICAgICAgY29ubmVjdChyZW1haW5pbmcpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIHNlbGYucHVibGlzaCgnY29ubmVjdF9mYWlsZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgc2VsZi5vcHRpb25zWydjb25uZWN0IHRpbWVvdXQnXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29ubmVjdChzZWxmLnRyYW5zcG9ydHMpO1xuXG4gICAgICBzZWxmLm9uY2UoJ2Nvbm5lY3QnLCBmdW5jdGlvbiAoKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuY29ubmVjdFRpbWVvdXRUaW1lcik7XG5cbiAgICAgICAgZm4gJiYgdHlwZW9mIGZuID09ICdmdW5jdGlvbicgJiYgZm4oKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIENsZWFycyBhbmQgc2V0cyBhIG5ldyBoZWFydGJlYXQgdGltZW91dCB1c2luZyB0aGUgdmFsdWUgZ2l2ZW4gYnkgdGhlXG4gICAqIHNlcnZlciBkdXJpbmcgdGhlIGhhbmRzaGFrZS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuc2V0SGVhcnRiZWF0VGltZW91dCA9IGZ1bmN0aW9uICgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpO1xuICAgIGlmKHRoaXMudHJhbnNwb3J0ICYmICF0aGlzLnRyYW5zcG9ydC5oZWFydGJlYXRzKCkpIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB0aGlzLmhlYXJ0YmVhdFRpbWVvdXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi50cmFuc3BvcnQub25DbG9zZSgpO1xuICAgIH0sIHRoaXMuaGVhcnRiZWF0VGltZW91dCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNlbmRzIGEgbWVzc2FnZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGRhdGEgcGFja2V0LlxuICAgKiBAcmV0dXJucyB7aW8uU29ja2V0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgaWYgKHRoaXMuY29ubmVjdGVkICYmICF0aGlzLmRvQnVmZmVyKSB7XG4gICAgICB0aGlzLnRyYW5zcG9ydC5wYWNrZXQoZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYnVmZmVyLnB1c2goZGF0YSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldHMgYnVmZmVyIHN0YXRlXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLnNldEJ1ZmZlciA9IGZ1bmN0aW9uICh2KSB7XG4gICAgdGhpcy5kb0J1ZmZlciA9IHY7XG5cbiAgICBpZiAoIXYgJiYgdGhpcy5jb25uZWN0ZWQgJiYgdGhpcy5idWZmZXIubGVuZ3RoKSB7XG4gICAgICBpZiAoIXRoaXMub3B0aW9uc1snbWFudWFsRmx1c2gnXSkge1xuICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBGbHVzaGVzIHRoZSBidWZmZXIgZGF0YSBvdmVyIHRoZSB3aXJlLlxuICAgKiBUbyBiZSBpbnZva2VkIG1hbnVhbGx5IHdoZW4gJ21hbnVhbEZsdXNoJyBpcyBzZXQgdG8gdHJ1ZS5cbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5mbHVzaEJ1ZmZlciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHJhbnNwb3J0LnBheWxvYWQodGhpcy5idWZmZXIpO1xuICAgIHRoaXMuYnVmZmVyID0gW107XG4gIH07XG4gIFxuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0IHRoZSBlc3RhYmxpc2hlZCBjb25uZWN0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7aW8uU29ja2V0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMuY29ubmVjdGVkIHx8IHRoaXMuY29ubmVjdGluZykge1xuICAgICAgaWYgKHRoaXMub3Blbikge1xuICAgICAgICB0aGlzLm9mKCcnKS5wYWNrZXQoeyB0eXBlOiAnZGlzY29ubmVjdCcgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIGhhbmRsZSBkaXNjb25uZWN0aW9uIGltbWVkaWF0ZWx5XG4gICAgICB0aGlzLm9uRGlzY29ubmVjdCgnYm9vdGVkJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzb2NrZXQgd2l0aCBhIHN5bmMgWEhSLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5kaXNjb25uZWN0U3luYyA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBlbnN1cmUgZGlzY29ubmVjdGlvblxuICAgIHZhciB4aHIgPSBpby51dGlsLnJlcXVlc3QoKTtcbiAgICB2YXIgdXJpID0gW1xuICAgICAgICAnaHR0cCcgKyAodGhpcy5vcHRpb25zLnNlY3VyZSA/ICdzJyA6ICcnKSArICc6LydcbiAgICAgICwgdGhpcy5vcHRpb25zLmhvc3QgKyAnOicgKyB0aGlzLm9wdGlvbnMucG9ydFxuICAgICAgLCB0aGlzLm9wdGlvbnMucmVzb3VyY2VcbiAgICAgICwgaW8ucHJvdG9jb2xcbiAgICAgICwgJydcbiAgICAgICwgdGhpcy5zZXNzaW9uaWRcbiAgICBdLmpvaW4oJy8nKSArICcvP2Rpc2Nvbm5lY3Q9MSc7XG5cbiAgICB4aHIub3BlbignR0VUJywgdXJpLCBmYWxzZSk7XG4gICAgeGhyLnNlbmQobnVsbCk7XG5cbiAgICAvLyBoYW5kbGUgZGlzY29ubmVjdGlvbiBpbW1lZGlhdGVseVxuICAgIHRoaXMub25EaXNjb25uZWN0KCdib290ZWQnKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgd2UgbmVlZCB0byB1c2UgY3Jvc3MgZG9tYWluIGVuYWJsZWQgdHJhbnNwb3J0cy4gQ3Jvc3MgZG9tYWluIHdvdWxkXG4gICAqIGJlIGEgZGlmZmVyZW50IHBvcnQgb3IgZGlmZmVyZW50IGRvbWFpbiBuYW1lLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUuaXNYRG9tYWluID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIHBvcnQgPSBnbG9iYWwubG9jYXRpb24ucG9ydCB8fFxuICAgICAgKCdodHRwczonID09IGdsb2JhbC5sb2NhdGlvbi5wcm90b2NvbCA/IDQ0MyA6IDgwKTtcblxuICAgIHJldHVybiB0aGlzLm9wdGlvbnMuaG9zdCAhPT0gZ2xvYmFsLmxvY2F0aW9uLmhvc3RuYW1lIFxuICAgICAgfHwgdGhpcy5vcHRpb25zLnBvcnQgIT0gcG9ydDtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHVwb24gaGFuZHNoYWtlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5vbkNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmNvbm5lY3RlZCkge1xuICAgICAgdGhpcy5jb25uZWN0ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5jb25uZWN0aW5nID0gZmFsc2U7XG4gICAgICBpZiAoIXRoaXMuZG9CdWZmZXIpIHtcbiAgICAgICAgLy8gbWFrZSBzdXJlIHRvIGZsdXNoIHRoZSBidWZmZXJcbiAgICAgICAgdGhpcy5zZXRCdWZmZXIoZmFsc2UpO1xuICAgICAgfVxuICAgICAgdGhpcy5lbWl0KCdjb25uZWN0Jyk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdHJhbnNwb3J0IG9wZW5zXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9uT3BlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wZW4gPSB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdHJhbnNwb3J0IGNsb3Nlcy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUub25DbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5oZWFydGJlYXRUaW1lb3V0VGltZXIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgdHJhbnNwb3J0IGZpcnN0IG9wZW5zIGEgY29ubmVjdGlvblxuICAgKlxuICAgKiBAcGFyYW0gdGV4dFxuICAgKi9cblxuICBTb2NrZXQucHJvdG90eXBlLm9uUGFja2V0ID0gZnVuY3Rpb24gKHBhY2tldCkge1xuICAgIHRoaXMub2YocGFja2V0LmVuZHBvaW50KS5vblBhY2tldChwYWNrZXQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGVycm9yLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKGVycikge1xuICAgIGlmIChlcnIgJiYgZXJyLmFkdmljZSkge1xuICAgICAgaWYgKGVyci5hZHZpY2UgPT09ICdyZWNvbm5lY3QnICYmICh0aGlzLmNvbm5lY3RlZCB8fCB0aGlzLmNvbm5lY3RpbmcpKSB7XG4gICAgICAgIHRoaXMuZGlzY29ubmVjdCgpO1xuICAgICAgICBpZiAodGhpcy5vcHRpb25zLnJlY29ubmVjdCkge1xuICAgICAgICAgIHRoaXMucmVjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnB1Ymxpc2goJ2Vycm9yJywgZXJyICYmIGVyci5yZWFzb24gPyBlcnIucmVhc29uIDogZXJyKTtcbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHdoZW4gdGhlIHRyYW5zcG9ydCBkaXNjb25uZWN0cy5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldC5wcm90b3R5cGUub25EaXNjb25uZWN0ID0gZnVuY3Rpb24gKHJlYXNvbikge1xuICAgIHZhciB3YXNDb25uZWN0ZWQgPSB0aGlzLmNvbm5lY3RlZFxuICAgICAgLCB3YXNDb25uZWN0aW5nID0gdGhpcy5jb25uZWN0aW5nO1xuXG4gICAgdGhpcy5jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmNvbm5lY3RpbmcgPSBmYWxzZTtcbiAgICB0aGlzLm9wZW4gPSBmYWxzZTtcblxuICAgIGlmICh3YXNDb25uZWN0ZWQgfHwgd2FzQ29ubmVjdGluZykge1xuICAgICAgdGhpcy50cmFuc3BvcnQuY2xvc2UoKTtcbiAgICAgIHRoaXMudHJhbnNwb3J0LmNsZWFyVGltZW91dHMoKTtcbiAgICAgIGlmICh3YXNDb25uZWN0ZWQpIHtcbiAgICAgICAgdGhpcy5wdWJsaXNoKCdkaXNjb25uZWN0JywgcmVhc29uKTtcblxuICAgICAgICBpZiAoJ2Jvb3RlZCcgIT0gcmVhc29uICYmIHRoaXMub3B0aW9ucy5yZWNvbm5lY3QgJiYgIXRoaXMucmVjb25uZWN0aW5nKSB7XG4gICAgICAgICAgdGhpcy5yZWNvbm5lY3QoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ2FsbGVkIHVwb24gcmVjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgU29ja2V0LnByb3RvdHlwZS5yZWNvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5yZWNvbm5lY3RpbmcgPSB0cnVlO1xuICAgIHRoaXMucmVjb25uZWN0aW9uQXR0ZW1wdHMgPSAwO1xuICAgIHRoaXMucmVjb25uZWN0aW9uRGVsYXkgPSB0aGlzLm9wdGlvbnNbJ3JlY29ubmVjdGlvbiBkZWxheSddO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAsIG1heEF0dGVtcHRzID0gdGhpcy5vcHRpb25zWydtYXggcmVjb25uZWN0aW9uIGF0dGVtcHRzJ11cbiAgICAgICwgdHJ5TXVsdGlwbGUgPSB0aGlzLm9wdGlvbnNbJ3RyeSBtdWx0aXBsZSB0cmFuc3BvcnRzJ11cbiAgICAgICwgbGltaXQgPSB0aGlzLm9wdGlvbnNbJ3JlY29ubmVjdGlvbiBsaW1pdCddO1xuXG4gICAgZnVuY3Rpb24gcmVzZXQgKCkge1xuICAgICAgaWYgKHNlbGYuY29ubmVjdGVkKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gc2VsZi5uYW1lc3BhY2VzKSB7XG4gICAgICAgICAgaWYgKHNlbGYubmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShpKSAmJiAnJyAhPT0gaSkge1xuICAgICAgICAgICAgICBzZWxmLm5hbWVzcGFjZXNbaV0ucGFja2V0KHsgdHlwZTogJ2Nvbm5lY3QnIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxmLnB1Ymxpc2goJ3JlY29ubmVjdCcsIHNlbGYudHJhbnNwb3J0Lm5hbWUsIHNlbGYucmVjb25uZWN0aW9uQXR0ZW1wdHMpO1xuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi5yZWNvbm5lY3Rpb25UaW1lcik7XG5cbiAgICAgIHNlbGYucmVtb3ZlTGlzdGVuZXIoJ2Nvbm5lY3RfZmFpbGVkJywgbWF5YmVSZWNvbm5lY3QpO1xuICAgICAgc2VsZi5yZW1vdmVMaXN0ZW5lcignY29ubmVjdCcsIG1heWJlUmVjb25uZWN0KTtcblxuICAgICAgc2VsZi5yZWNvbm5lY3RpbmcgPSBmYWxzZTtcblxuICAgICAgZGVsZXRlIHNlbGYucmVjb25uZWN0aW9uQXR0ZW1wdHM7XG4gICAgICBkZWxldGUgc2VsZi5yZWNvbm5lY3Rpb25EZWxheTtcbiAgICAgIGRlbGV0ZSBzZWxmLnJlY29ubmVjdGlvblRpbWVyO1xuICAgICAgZGVsZXRlIHNlbGYucmVkb1RyYW5zcG9ydHM7XG5cbiAgICAgIHNlbGYub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXSA9IHRyeU11bHRpcGxlO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYXliZVJlY29ubmVjdCAoKSB7XG4gICAgICBpZiAoIXNlbGYucmVjb25uZWN0aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNlbGYuY29ubmVjdGVkKSB7XG4gICAgICAgIHJldHVybiByZXNldCgpO1xuICAgICAgfTtcblxuICAgICAgaWYgKHNlbGYuY29ubmVjdGluZyAmJiBzZWxmLnJlY29ubmVjdGluZykge1xuICAgICAgICByZXR1cm4gc2VsZi5yZWNvbm5lY3Rpb25UaW1lciA9IHNldFRpbWVvdXQobWF5YmVSZWNvbm5lY3QsIDEwMDApO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2VsZi5yZWNvbm5lY3Rpb25BdHRlbXB0cysrID49IG1heEF0dGVtcHRzKSB7XG4gICAgICAgIGlmICghc2VsZi5yZWRvVHJhbnNwb3J0cykge1xuICAgICAgICAgIHNlbGYub24oJ2Nvbm5lY3RfZmFpbGVkJywgbWF5YmVSZWNvbm5lY3QpO1xuICAgICAgICAgIHNlbGYub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXSA9IHRydWU7XG4gICAgICAgICAgc2VsZi50cmFuc3BvcnRzID0gc2VsZi5vcmlnVHJhbnNwb3J0cztcbiAgICAgICAgICBzZWxmLnRyYW5zcG9ydCA9IHNlbGYuZ2V0VHJhbnNwb3J0KCk7XG4gICAgICAgICAgc2VsZi5yZWRvVHJhbnNwb3J0cyA9IHRydWU7XG4gICAgICAgICAgc2VsZi5jb25uZWN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5wdWJsaXNoKCdyZWNvbm5lY3RfZmFpbGVkJyk7XG4gICAgICAgICAgcmVzZXQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNlbGYucmVjb25uZWN0aW9uRGVsYXkgPCBsaW1pdCkge1xuICAgICAgICAgIHNlbGYucmVjb25uZWN0aW9uRGVsYXkgKj0gMjsgLy8gZXhwb25lbnRpYWwgYmFjayBvZmZcbiAgICAgICAgfVxuXG4gICAgICAgIHNlbGYuY29ubmVjdCgpO1xuICAgICAgICBzZWxmLnB1Ymxpc2goJ3JlY29ubmVjdGluZycsIHNlbGYucmVjb25uZWN0aW9uRGVsYXksIHNlbGYucmVjb25uZWN0aW9uQXR0ZW1wdHMpO1xuICAgICAgICBzZWxmLnJlY29ubmVjdGlvblRpbWVyID0gc2V0VGltZW91dChtYXliZVJlY29ubmVjdCwgc2VsZi5yZWNvbm5lY3Rpb25EZWxheSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMub3B0aW9uc1sndHJ5IG11bHRpcGxlIHRyYW5zcG9ydHMnXSA9IGZhbHNlO1xuICAgIHRoaXMucmVjb25uZWN0aW9uVGltZXIgPSBzZXRUaW1lb3V0KG1heWJlUmVjb25uZWN0LCB0aGlzLnJlY29ubmVjdGlvbkRlbGF5KTtcblxuICAgIHRoaXMub24oJ2Nvbm5lY3QnLCBtYXliZVJlY29ubmVjdCk7XG4gIH07XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuICAsIHRoaXNcbik7XG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbykge1xuXG4gIC8qKlxuICAgKiBFeHBvc2UgY29uc3RydWN0b3IuXG4gICAqL1xuXG4gIGV4cG9ydHMuU29ja2V0TmFtZXNwYWNlID0gU29ja2V0TmFtZXNwYWNlO1xuXG4gIC8qKlxuICAgKiBTb2NrZXQgbmFtZXNwYWNlIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gU29ja2V0TmFtZXNwYWNlIChzb2NrZXQsIG5hbWUpIHtcbiAgICB0aGlzLnNvY2tldCA9IHNvY2tldDtcbiAgICB0aGlzLm5hbWUgPSBuYW1lIHx8ICcnO1xuICAgIHRoaXMuZmxhZ3MgPSB7fTtcbiAgICB0aGlzLmpzb24gPSBuZXcgRmxhZyh0aGlzLCAnanNvbicpO1xuICAgIHRoaXMuYWNrUGFja2V0cyA9IDA7XG4gICAgdGhpcy5hY2tzID0ge307XG4gIH07XG5cbiAgLyoqXG4gICAqIEFwcGx5IEV2ZW50RW1pdHRlciBtaXhpbi5cbiAgICovXG5cbiAgaW8udXRpbC5taXhpbihTb2NrZXROYW1lc3BhY2UsIGlvLkV2ZW50RW1pdHRlcik7XG5cbiAgLyoqXG4gICAqIENvcGllcyBlbWl0IHNpbmNlIHdlIG92ZXJyaWRlIGl0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLiRlbWl0ID0gaW8uRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgbmV3IG5hbWVzcGFjZSwgYnkgcHJveHlpbmcgdGhlIHJlcXVlc3QgdG8gdGhlIHNvY2tldC4gVGhpc1xuICAgKiBhbGxvd3MgdXMgdG8gdXNlIHRoZSBzeW5heCBhcyB3ZSBkbyBvbiB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLm9mID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5vZi5hcHBseSh0aGlzLnNvY2tldCwgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvKipcbiAgICogU2VuZHMgYSBwYWNrZXQuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLnBhY2tldCA9IGZ1bmN0aW9uIChwYWNrZXQpIHtcbiAgICBwYWNrZXQuZW5kcG9pbnQgPSB0aGlzLm5hbWU7XG4gICAgdGhpcy5zb2NrZXQucGFja2V0KHBhY2tldCk7XG4gICAgdGhpcy5mbGFncyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kcyBhIG1lc3NhZ2VcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgU29ja2V0TmFtZXNwYWNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEsIGZuKSB7XG4gICAgdmFyIHBhY2tldCA9IHtcbiAgICAgICAgdHlwZTogdGhpcy5mbGFncy5qc29uID8gJ2pzb24nIDogJ21lc3NhZ2UnXG4gICAgICAsIGRhdGE6IGRhdGFcbiAgICB9O1xuXG4gICAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGZuKSB7XG4gICAgICBwYWNrZXQuaWQgPSArK3RoaXMuYWNrUGFja2V0cztcbiAgICAgIHBhY2tldC5hY2sgPSB0cnVlO1xuICAgICAgdGhpcy5hY2tzW3BhY2tldC5pZF0gPSBmbjtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5wYWNrZXQocGFja2V0KTtcbiAgfTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnRcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG4gIFxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKVxuICAgICAgLCBsYXN0QXJnID0gYXJnc1thcmdzLmxlbmd0aCAtIDFdXG4gICAgICAsIHBhY2tldCA9IHtcbiAgICAgICAgICAgIHR5cGU6ICdldmVudCdcbiAgICAgICAgICAsIG5hbWU6IG5hbWVcbiAgICAgICAgfTtcblxuICAgIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBsYXN0QXJnKSB7XG4gICAgICBwYWNrZXQuaWQgPSArK3RoaXMuYWNrUGFja2V0cztcbiAgICAgIHBhY2tldC5hY2sgPSAnZGF0YSc7XG4gICAgICB0aGlzLmFja3NbcGFja2V0LmlkXSA9IGxhc3RBcmc7XG4gICAgICBhcmdzID0gYXJncy5zbGljZSgwLCBhcmdzLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIHBhY2tldC5hcmdzID0gYXJncztcblxuICAgIHJldHVybiB0aGlzLnBhY2tldChwYWNrZXQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgbmFtZXNwYWNlXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBTb2NrZXROYW1lc3BhY2UucHJvdG90eXBlLmRpc2Nvbm5lY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKHRoaXMubmFtZSA9PT0gJycpIHtcbiAgICAgIHRoaXMuc29ja2V0LmRpc2Nvbm5lY3QoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYWNrZXQoeyB0eXBlOiAnZGlzY29ubmVjdCcgfSk7XG4gICAgICB0aGlzLiRlbWl0KCdkaXNjb25uZWN0Jyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZXMgYSBwYWNrZXRcbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFNvY2tldE5hbWVzcGFjZS5wcm90b3R5cGUub25QYWNrZXQgPSBmdW5jdGlvbiAocGFja2V0KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgZnVuY3Rpb24gYWNrICgpIHtcbiAgICAgIHNlbGYucGFja2V0KHtcbiAgICAgICAgICB0eXBlOiAnYWNrJ1xuICAgICAgICAsIGFyZ3M6IGlvLnV0aWwudG9BcnJheShhcmd1bWVudHMpXG4gICAgICAgICwgYWNrSWQ6IHBhY2tldC5pZFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIHN3aXRjaCAocGFja2V0LnR5cGUpIHtcbiAgICAgIGNhc2UgJ2Nvbm5lY3QnOlxuICAgICAgICB0aGlzLiRlbWl0KCdjb25uZWN0Jyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdkaXNjb25uZWN0JzpcbiAgICAgICAgaWYgKHRoaXMubmFtZSA9PT0gJycpIHtcbiAgICAgICAgICB0aGlzLnNvY2tldC5vbkRpc2Nvbm5lY3QocGFja2V0LnJlYXNvbiB8fCAnYm9vdGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy4kZW1pdCgnZGlzY29ubmVjdCcsIHBhY2tldC5yZWFzb24pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdtZXNzYWdlJzpcbiAgICAgIGNhc2UgJ2pzb24nOlxuICAgICAgICB2YXIgcGFyYW1zID0gWydtZXNzYWdlJywgcGFja2V0LmRhdGFdO1xuXG4gICAgICAgIGlmIChwYWNrZXQuYWNrID09ICdkYXRhJykge1xuICAgICAgICAgIHBhcmFtcy5wdXNoKGFjayk7XG4gICAgICAgIH0gZWxzZSBpZiAocGFja2V0LmFjaykge1xuICAgICAgICAgIHRoaXMucGFja2V0KHsgdHlwZTogJ2FjaycsIGFja0lkOiBwYWNrZXQuaWQgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLiRlbWl0LmFwcGx5KHRoaXMsIHBhcmFtcyk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICBjYXNlICdldmVudCc6XG4gICAgICAgIHZhciBwYXJhbXMgPSBbcGFja2V0Lm5hbWVdLmNvbmNhdChwYWNrZXQuYXJncyk7XG5cbiAgICAgICAgaWYgKHBhY2tldC5hY2sgPT0gJ2RhdGEnKVxuICAgICAgICAgIHBhcmFtcy5wdXNoKGFjayk7XG5cbiAgICAgICAgdGhpcy4kZW1pdC5hcHBseSh0aGlzLCBwYXJhbXMpO1xuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnYWNrJzpcbiAgICAgICAgaWYgKHRoaXMuYWNrc1twYWNrZXQuYWNrSWRdKSB7XG4gICAgICAgICAgdGhpcy5hY2tzW3BhY2tldC5hY2tJZF0uYXBwbHkodGhpcywgcGFja2V0LmFyZ3MpO1xuICAgICAgICAgIGRlbGV0ZSB0aGlzLmFja3NbcGFja2V0LmFja0lkXTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICBpZiAocGFja2V0LmFkdmljZSl7XG4gICAgICAgICAgdGhpcy5zb2NrZXQub25FcnJvcihwYWNrZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChwYWNrZXQucmVhc29uID09ICd1bmF1dGhvcml6ZWQnKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdjb25uZWN0X2ZhaWxlZCcsIHBhY2tldC5yZWFzb24pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdlcnJvcicsIHBhY2tldC5yZWFzb24pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZsYWcgaW50ZXJmYWNlLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gRmxhZyAobnNwLCBuYW1lKSB7XG4gICAgdGhpcy5uYW1lc3BhY2UgPSBuc3A7XG4gICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgfTtcblxuICAvKipcbiAgICogU2VuZCBhIG1lc3NhZ2VcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhZy5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm5hbWVzcGFjZS5mbGFnc1t0aGlzLm5hbWVdID0gdHJ1ZTtcbiAgICB0aGlzLm5hbWVzcGFjZS5zZW5kLmFwcGx5KHRoaXMubmFtZXNwYWNlLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBFbWl0IGFuIGV2ZW50XG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYWcucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5uYW1lc3BhY2UuZmxhZ3NbdGhpcy5uYW1lXSA9IHRydWU7XG4gICAgdGhpcy5uYW1lc3BhY2UuZW1pdC5hcHBseSh0aGlzLm5hbWVzcGFjZSwgYXJndW1lbnRzKTtcbiAgfTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4pO1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbywgZ2xvYmFsKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy53ZWJzb2NrZXQgPSBXUztcblxuICAvKipcbiAgICogVGhlIFdlYlNvY2tldCB0cmFuc3BvcnQgdXNlcyB0aGUgSFRNTDUgV2ViU29ja2V0IEFQSSB0byBlc3RhYmxpc2ggYW5cbiAgICogcGVyc2lzdGVudCBjb25uZWN0aW9uIHdpdGggdGhlIFNvY2tldC5JTyBzZXJ2ZXIuIFRoaXMgdHJhbnNwb3J0IHdpbGwgYWxzb1xuICAgKiBiZSBpbmhlcml0ZWQgYnkgdGhlIEZsYXNoU29ja2V0IGZhbGxiYWNrIGFzIGl0IHByb3ZpZGVzIGEgQVBJIGNvbXBhdGlibGVcbiAgICogcG9seWZpbGwgZm9yIHRoZSBXZWJTb2NrZXRzLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGV4dGVuZHMge2lvLlRyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gV1MgKHNvY2tldCkge1xuICAgIGlvLlRyYW5zcG9ydC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAgICovXG5cbiAgaW8udXRpbC5pbmhlcml0KFdTLCBpby5UcmFuc3BvcnQpO1xuXG4gIC8qKlxuICAgKiBUcmFuc3BvcnQgbmFtZVxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBXUy5wcm90b3R5cGUubmFtZSA9ICd3ZWJzb2NrZXQnO1xuXG4gIC8qKlxuICAgKiBJbml0aWFsaXplcyBhIG5ldyBgV2ViU29ja2V0YCBjb25uZWN0aW9uIHdpdGggdGhlIFNvY2tldC5JTyBzZXJ2ZXIuIFdlIGF0dGFjaFxuICAgKiBhbGwgdGhlIGFwcHJvcHJpYXRlIGxpc3RlbmVycyB0byBoYW5kbGUgdGhlIHJlc3BvbnNlcyBmcm9tIHRoZSBzZXJ2ZXIuXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFdTLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBxdWVyeSA9IGlvLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSlcbiAgICAgICwgc2VsZiA9IHRoaXNcbiAgICAgICwgU29ja2V0XG5cblxuICAgIGlmICghU29ja2V0KSB7XG4gICAgICBTb2NrZXQgPSBnbG9iYWwuTW96V2ViU29ja2V0IHx8IGdsb2JhbC5XZWJTb2NrZXQ7XG4gICAgfVxuXG4gICAgdGhpcy53ZWJzb2NrZXQgPSBuZXcgU29ja2V0KHRoaXMucHJlcGFyZVVybCgpICsgcXVlcnkpO1xuXG4gICAgdGhpcy53ZWJzb2NrZXQub25vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgc2VsZi5vbk9wZW4oKTtcbiAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcihmYWxzZSk7XG4gICAgfTtcbiAgICB0aGlzLndlYnNvY2tldC5vbm1lc3NhZ2UgPSBmdW5jdGlvbiAoZXYpIHtcbiAgICAgIHNlbGYub25EYXRhKGV2LmRhdGEpO1xuICAgIH07XG4gICAgdGhpcy53ZWJzb2NrZXQub25jbG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgICAgc2VsZi5zb2NrZXQuc2V0QnVmZmVyKHRydWUpO1xuICAgIH07XG4gICAgdGhpcy53ZWJzb2NrZXQub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBzZWxmLm9uRXJyb3IoZSk7XG4gICAgfTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kIGEgbWVzc2FnZSB0byB0aGUgU29ja2V0LklPIHNlcnZlci4gVGhlIG1lc3NhZ2Ugd2lsbCBhdXRvbWF0aWNhbGx5IGJlXG4gICAqIGVuY29kZWQgaW4gdGhlIGNvcnJlY3QgbWVzc2FnZSBmb3JtYXQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIC8vIERvIHRvIGEgYnVnIGluIHRoZSBjdXJyZW50IElEZXZpY2VzIGJyb3dzZXIsIHdlIG5lZWQgdG8gd3JhcCB0aGUgc2VuZCBpbiBhIFxuICAvLyBzZXRUaW1lb3V0LCB3aGVuIHRoZXkgcmVzdW1lIGZyb20gc2xlZXBpbmcgdGhlIGJyb3dzZXIgd2lsbCBjcmFzaCBpZiBcbiAgLy8gd2UgZG9uJ3QgYWxsb3cgdGhlIGJyb3dzZXIgdGltZSB0byBkZXRlY3QgdGhlIHNvY2tldCBoYXMgYmVlbiBjbG9zZWRcbiAgaWYgKGlvLnV0aWwudWEuaURldmljZSkge1xuICAgIFdTLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICBzZWxmLndlYnNvY2tldC5zZW5kKGRhdGEpO1xuICAgICAgfSwwKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgV1MucHJvdG90eXBlLnNlbmQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgdGhpcy53ZWJzb2NrZXQuc2VuZChkYXRhKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUGF5bG9hZFxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgV1MucHJvdG90eXBlLnBheWxvYWQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGwgPSBhcnIubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICB0aGlzLnBhY2tldChhcnJbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgZXN0YWJsaXNoZWQgYFdlYlNvY2tldGAgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgV1MucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMud2Vic29ja2V0LmNsb3NlKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEhhbmRsZSB0aGUgZXJyb3JzIHRoYXQgYFdlYlNvY2tldGAgbWlnaHQgYmUgZ2l2aW5nIHdoZW4gd2VcbiAgICogYXJlIGF0dGVtcHRpbmcgdG8gY29ubmVjdCBvciBzZW5kIG1lc3NhZ2VzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Vycm9yfSBlIFRoZSBlcnJvci5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFdTLnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgICB0aGlzLnNvY2tldC5vbkVycm9yKGUpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBhcHByb3ByaWF0ZSBzY2hlbWUgZm9yIHRoZSBVUkkgZ2VuZXJhdGlvbi5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuICBXUy5wcm90b3R5cGUuc2NoZW1lID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnNvY2tldC5vcHRpb25zLnNlY3VyZSA/ICd3c3MnIDogJ3dzJztcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBicm93c2VyIGhhcyBzdXBwb3J0IGZvciBuYXRpdmUgYFdlYlNvY2tldHNgIGFuZCB0aGF0XG4gICAqIGl0J3Mgbm90IHRoZSBwb2x5ZmlsbCBjcmVhdGVkIGZvciB0aGUgRmxhc2hTb2NrZXQgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBXUy5jaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKCdXZWJTb2NrZXQnIGluIGdsb2JhbCAmJiAhKCdfX2FkZFRhc2snIGluIFdlYlNvY2tldCkpXG4gICAgICAgICAgfHwgJ01veldlYlNvY2tldCcgaW4gZ2xvYmFsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiB0aGUgYFdlYlNvY2tldGAgdHJhbnNwb3J0IHN1cHBvcnQgY3Jvc3MgZG9tYWluIGNvbW11bmljYXRpb25zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgV1MueGRvbWFpbkNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgdGhlIHRyYW5zcG9ydCB0byB5b3VyIHB1YmxpYyBpby50cmFuc3BvcnRzIGFycmF5LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgaW8udHJhbnNwb3J0cy5wdXNoKCd3ZWJzb2NrZXQnKTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8uVHJhbnNwb3J0IDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuICAsIHRoaXNcbik7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0cy5mbGFzaHNvY2tldCA9IEZsYXNoc29ja2V0O1xuXG4gIC8qKlxuICAgKiBUaGUgRmxhc2hTb2NrZXQgdHJhbnNwb3J0LiBUaGlzIGlzIGEgQVBJIHdyYXBwZXIgZm9yIHRoZSBIVE1MNSBXZWJTb2NrZXRcbiAgICogc3BlY2lmaWNhdGlvbi4gSXQgdXNlcyBhIC5zd2YgZmlsZSB0byBjb21tdW5pY2F0ZSB3aXRoIHRoZSBzZXJ2ZXIuIElmIHlvdSB3YW50XG4gICAqIHRvIHNlcnZlIHRoZSAuc3dmIGZpbGUgZnJvbSBhIG90aGVyIHNlcnZlciB0aGFuIHdoZXJlIHRoZSBTb2NrZXQuSU8gc2NyaXB0IGlzXG4gICAqIGNvbWluZyBmcm9tIHlvdSBuZWVkIHRvIHVzZSB0aGUgaW5zZWN1cmUgdmVyc2lvbiBvZiB0aGUgLnN3Zi4gTW9yZSBpbmZvcm1hdGlvblxuICAgKiBhYm91dCB0aGlzIGNhbiBiZSBmb3VuZCBvbiB0aGUgZ2l0aHViIHBhZ2UuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAZXh0ZW5kcyB7aW8uVHJhbnNwb3J0LndlYnNvY2tldH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gRmxhc2hzb2NrZXQgKCkge1xuICAgIGlvLlRyYW5zcG9ydC53ZWJzb2NrZXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvKipcbiAgICogSW5oZXJpdHMgZnJvbSBUcmFuc3BvcnQuXG4gICAqL1xuXG4gIGlvLnV0aWwuaW5oZXJpdChGbGFzaHNvY2tldCwgaW8uVHJhbnNwb3J0LndlYnNvY2tldCk7XG5cbiAgLyoqXG4gICAqIFRyYW5zcG9ydCBuYW1lXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEZsYXNoc29ja2V0LnByb3RvdHlwZS5uYW1lID0gJ2ZsYXNoc29ja2V0JztcblxuICAvKipcbiAgICogRGlzY29ubmVjdCB0aGUgZXN0YWJsaXNoZWQgYEZsYXNoU29ja2V0YCBjb25uZWN0aW9uLiBUaGlzIGlzIGRvbmUgYnkgYWRkaW5nIGEgXG4gICAqIG5ldyB0YXNrIHRvIHRoZSBGbGFzaFNvY2tldC4gVGhlIHJlc3Qgd2lsbCBiZSBoYW5kbGVkIG9mZiBieSB0aGUgYFdlYlNvY2tldGAgXG4gICAqIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1RyYW5zcG9ydH1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICBXZWJTb2NrZXQuX19hZGRUYXNrKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlvLlRyYW5zcG9ydC53ZWJzb2NrZXQucHJvdG90eXBlLm9wZW4uYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIFxuICAvKipcbiAgICogU2VuZHMgYSBtZXNzYWdlIHRvIHRoZSBTb2NrZXQuSU8gc2VydmVyLiBUaGlzIGlzIGRvbmUgYnkgYWRkaW5nIGEgbmV3XG4gICAqIHRhc2sgdG8gdGhlIEZsYXNoU29ja2V0LiBUaGUgcmVzdCB3aWxsIGJlIGhhbmRsZWQgb2ZmIGJ5IHRoZSBgV2ViU29ja2V0YCBcbiAgICogdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFzaHNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgV2ViU29ja2V0Ll9fYWRkVGFzayhmdW5jdGlvbiAoKSB7XG4gICAgICBpby5UcmFuc3BvcnQud2Vic29ja2V0LnByb3RvdHlwZS5zZW5kLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH0pO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgZXN0YWJsaXNoZWQgYEZsYXNoU29ja2V0YCBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBGbGFzaHNvY2tldC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgV2ViU29ja2V0Ll9fdGFza3MubGVuZ3RoID0gMDtcbiAgICBpby5UcmFuc3BvcnQud2Vic29ja2V0LnByb3RvdHlwZS5jbG9zZS5jYWxsKHRoaXMpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgV2ViU29ja2V0IGZhbGwgYmFjayBuZWVkcyB0byBhcHBlbmQgdGhlIGZsYXNoIGNvbnRhaW5lciB0byB0aGUgYm9keVxuICAgKiBlbGVtZW50LCBzbyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSBoYXZlIGFjY2VzcyB0byBpdC4gT3IgZGVmZXIgdGhlIGNhbGxcbiAgICogdW50aWwgd2UgYXJlIHN1cmUgdGhlcmUgaXMgYSBib2R5IGVsZW1lbnQuXG4gICAqXG4gICAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXQgVGhlIHNvY2tldCBpbnN0YW5jZSB0aGF0IG5lZWRzIGEgdHJhbnNwb3J0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFja1xuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24gKHNvY2tldCwgZm4pIHtcbiAgICBmdW5jdGlvbiBpbml0ICgpIHtcbiAgICAgIHZhciBvcHRpb25zID0gc29ja2V0Lm9wdGlvbnNcbiAgICAgICAgLCBwb3J0ID0gb3B0aW9uc1snZmxhc2ggcG9saWN5IHBvcnQnXVxuICAgICAgICAsIHBhdGggPSBbXG4gICAgICAgICAgICAgICdodHRwJyArIChvcHRpb25zLnNlY3VyZSA/ICdzJyA6ICcnKSArICc6LydcbiAgICAgICAgICAgICwgb3B0aW9ucy5ob3N0ICsgJzonICsgb3B0aW9ucy5wb3J0XG4gICAgICAgICAgICAsIG9wdGlvbnMucmVzb3VyY2VcbiAgICAgICAgICAgICwgJ3N0YXRpYy9mbGFzaHNvY2tldCdcbiAgICAgICAgICAgICwgJ1dlYlNvY2tldE1haW4nICsgKHNvY2tldC5pc1hEb21haW4oKSA/ICdJbnNlY3VyZScgOiAnJykgKyAnLnN3ZidcbiAgICAgICAgICBdO1xuXG4gICAgICAvLyBPbmx5IHN0YXJ0IGRvd25sb2FkaW5nIHRoZSBzd2YgZmlsZSB3aGVuIHRoZSBjaGVja2VkIHRoYXQgdGhpcyBicm93c2VyXG4gICAgICAvLyBhY3R1YWxseSBzdXBwb3J0cyBpdFxuICAgICAgaWYgKCFGbGFzaHNvY2tldC5sb2FkZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBXRUJfU09DS0VUX1NXRl9MT0NBVElPTiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBTZXQgdGhlIGNvcnJlY3QgZmlsZSBiYXNlZCBvbiB0aGUgWERvbWFpbiBzZXR0aW5nc1xuICAgICAgICAgIFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OID0gcGF0aC5qb2luKCcvJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocG9ydCAhPT0gODQzKSB7XG4gICAgICAgICAgV2ViU29ja2V0LmxvYWRGbGFzaFBvbGljeUZpbGUoJ3htbHNvY2tldDovLycgKyBvcHRpb25zLmhvc3QgKyAnOicgKyBwb3J0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIFdlYlNvY2tldC5fX2luaXRpYWxpemUoKTtcbiAgICAgICAgRmxhc2hzb2NrZXQubG9hZGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgZm4uY2FsbChzZWxmKTtcbiAgICB9XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKGRvY3VtZW50LmJvZHkpIHJldHVybiBpbml0KCk7XG5cbiAgICBpby51dGlsLmxvYWQoaW5pdCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrIGlmIHRoZSBGbGFzaFNvY2tldCB0cmFuc3BvcnQgaXMgc3VwcG9ydGVkIGFzIGl0IHJlcXVpcmVzIHRoYXQgdGhlIEFkb2JlXG4gICAqIEZsYXNoIFBsYXllciBwbHVnLWluIHZlcnNpb24gYDEwLjAuMGAgb3IgZ3JlYXRlciBpcyBpbnN0YWxsZWQuIEFuZCBhbHNvIGNoZWNrIGlmXG4gICAqIHRoZSBwb2x5ZmlsbCBpcyBjb3JyZWN0bHkgbG9hZGVkLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQuY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFxuICAgICAgICB0eXBlb2YgV2ViU29ja2V0ID09ICd1bmRlZmluZWQnXG4gICAgICB8fCAhKCdfX2luaXRpYWxpemUnIGluIFdlYlNvY2tldCkgfHwgIXN3Zm9iamVjdFxuICAgICkgcmV0dXJuIGZhbHNlO1xuXG4gICAgcmV0dXJuIHN3Zm9iamVjdC5nZXRGbGFzaFBsYXllclZlcnNpb24oKS5tYWpvciA+PSAxMDtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIEZsYXNoU29ja2V0IHRyYW5zcG9ydCBjYW4gYmUgdXNlZCBhcyBjcm9zcyBkb21haW4gLyBjcm9zcyBvcmlnaW4gXG4gICAqIHRyYW5zcG9ydC4gQmVjYXVzZSB3ZSBjYW4ndCBzZWUgd2hpY2ggdHlwZSAoc2VjdXJlIG9yIGluc2VjdXJlKSBvZiAuc3dmIGlzIHVzZWRcbiAgICogd2Ugd2lsbCBqdXN0IHJldHVybiB0cnVlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgRmxhc2hzb2NrZXQueGRvbWFpbkNoZWNrID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBEaXNhYmxlIEFVVE9fSU5JVElBTElaQVRJT05cbiAgICovXG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBXRUJfU09DS0VUX0RJU0FCTEVfQVVUT19JTklUSUFMSVpBVElPTiA9IHRydWU7XG4gIH1cblxuICAvKipcbiAgICogQWRkIHRoZSB0cmFuc3BvcnQgdG8geW91ciBwdWJsaWMgaW8udHJhbnNwb3J0cyBhcnJheS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLnRyYW5zcG9ydHMucHVzaCgnZmxhc2hzb2NrZXQnKTtcbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvLlRyYW5zcG9ydCA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbik7XG4vKlx0U1dGT2JqZWN0IHYyLjIgPGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9zd2ZvYmplY3QvPiBcblx0aXMgcmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlIDxodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocD4gXG4qL1xuaWYgKCd1bmRlZmluZWQnICE9IHR5cGVvZiB3aW5kb3cpIHtcbnZhciBzd2ZvYmplY3Q9ZnVuY3Rpb24oKXt2YXIgRD1cInVuZGVmaW5lZFwiLHI9XCJvYmplY3RcIixTPVwiU2hvY2t3YXZlIEZsYXNoXCIsVz1cIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoXCIscT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCIsUj1cIlNXRk9iamVjdEV4cHJJbnN0XCIseD1cIm9ucmVhZHlzdGF0ZWNoYW5nZVwiLE89d2luZG93LGo9ZG9jdW1lbnQsdD1uYXZpZ2F0b3IsVD1mYWxzZSxVPVtoXSxvPVtdLE49W10sST1bXSxsLFEsRSxCLEo9ZmFsc2UsYT1mYWxzZSxuLEcsbT10cnVlLE09ZnVuY3Rpb24oKXt2YXIgYWE9dHlwZW9mIGouZ2V0RWxlbWVudEJ5SWQhPUQmJnR5cGVvZiBqLmdldEVsZW1lbnRzQnlUYWdOYW1lIT1EJiZ0eXBlb2Ygai5jcmVhdGVFbGVtZW50IT1ELGFoPXQudXNlckFnZW50LnRvTG93ZXJDYXNlKCksWT10LnBsYXRmb3JtLnRvTG93ZXJDYXNlKCksYWU9WT8vd2luLy50ZXN0KFkpOi93aW4vLnRlc3QoYWgpLGFjPVk/L21hYy8udGVzdChZKTovbWFjLy50ZXN0KGFoKSxhZj0vd2Via2l0Ly50ZXN0KGFoKT9wYXJzZUZsb2F0KGFoLnJlcGxhY2UoL14uKndlYmtpdFxcLyhcXGQrKFxcLlxcZCspPykuKiQvLFwiJDFcIikpOmZhbHNlLFg9IStcIlxcdjFcIixhZz1bMCwwLDBdLGFiPW51bGw7aWYodHlwZW9mIHQucGx1Z2lucyE9RCYmdHlwZW9mIHQucGx1Z2luc1tTXT09cil7YWI9dC5wbHVnaW5zW1NdLmRlc2NyaXB0aW9uO2lmKGFiJiYhKHR5cGVvZiB0Lm1pbWVUeXBlcyE9RCYmdC5taW1lVHlwZXNbcV0mJiF0Lm1pbWVUeXBlc1txXS5lbmFibGVkUGx1Z2luKSl7VD10cnVlO1g9ZmFsc2U7YWI9YWIucmVwbGFjZSgvXi4qXFxzKyhcXFMrXFxzK1xcUyskKS8sXCIkMVwiKTthZ1swXT1wYXJzZUludChhYi5yZXBsYWNlKC9eKC4qKVxcLi4qJC8sXCIkMVwiKSwxMCk7YWdbMV09cGFyc2VJbnQoYWIucmVwbGFjZSgvXi4qXFwuKC4qKVxccy4qJC8sXCIkMVwiKSwxMCk7YWdbMl09L1thLXpBLVpdLy50ZXN0KGFiKT9wYXJzZUludChhYi5yZXBsYWNlKC9eLipbYS16QS1aXSsoLiopJC8sXCIkMVwiKSwxMCk6MH19ZWxzZXtpZih0eXBlb2YgT1soWydBY3RpdmUnXS5jb25jYXQoJ09iamVjdCcpLmpvaW4oJ1gnKSldIT1EKXt0cnl7dmFyIGFkPW5ldyB3aW5kb3dbKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpXShXKTtpZihhZCl7YWI9YWQuR2V0VmFyaWFibGUoXCIkdmVyc2lvblwiKTtpZihhYil7WD10cnVlO2FiPWFiLnNwbGl0KFwiIFwiKVsxXS5zcGxpdChcIixcIik7YWc9W3BhcnNlSW50KGFiWzBdLDEwKSxwYXJzZUludChhYlsxXSwxMCkscGFyc2VJbnQoYWJbMl0sMTApXX19fWNhdGNoKFope319fXJldHVybnt3MzphYSxwdjphZyx3azphZixpZTpYLHdpbjphZSxtYWM6YWN9fSgpLGs9ZnVuY3Rpb24oKXtpZighTS53Myl7cmV0dXJufWlmKCh0eXBlb2Ygai5yZWFkeVN0YXRlIT1EJiZqLnJlYWR5U3RhdGU9PVwiY29tcGxldGVcIil8fCh0eXBlb2Ygai5yZWFkeVN0YXRlPT1EJiYoai5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF18fGouYm9keSkpKXtmKCl9aWYoIUope2lmKHR5cGVvZiBqLmFkZEV2ZW50TGlzdGVuZXIhPUQpe2ouYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIixmLGZhbHNlKX1pZihNLmllJiZNLndpbil7ai5hdHRhY2hFdmVudCh4LGZ1bmN0aW9uKCl7aWYoai5yZWFkeVN0YXRlPT1cImNvbXBsZXRlXCIpe2ouZGV0YWNoRXZlbnQoeCxhcmd1bWVudHMuY2FsbGVlKTtmKCl9fSk7aWYoTz09dG9wKXsoZnVuY3Rpb24oKXtpZihKKXtyZXR1cm59dHJ5e2ouZG9jdW1lbnRFbGVtZW50LmRvU2Nyb2xsKFwibGVmdFwiKX1jYXRjaChYKXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMCk7cmV0dXJufWYoKX0pKCl9fWlmKE0ud2speyhmdW5jdGlvbigpe2lmKEope3JldHVybn1pZighL2xvYWRlZHxjb21wbGV0ZS8udGVzdChqLnJlYWR5U3RhdGUpKXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMCk7cmV0dXJufWYoKX0pKCl9cyhmKX19KCk7ZnVuY3Rpb24gZigpe2lmKEope3JldHVybn10cnl7dmFyIFo9ai5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJvZHlcIilbMF0uYXBwZW5kQ2hpbGQoQyhcInNwYW5cIikpO1oucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChaKX1jYXRjaChhYSl7cmV0dXJufUo9dHJ1ZTt2YXIgWD1VLmxlbmd0aDtmb3IodmFyIFk9MDtZPFg7WSsrKXtVW1ldKCl9fWZ1bmN0aW9uIEsoWCl7aWYoSil7WCgpfWVsc2V7VVtVLmxlbmd0aF09WH19ZnVuY3Rpb24gcyhZKXtpZih0eXBlb2YgTy5hZGRFdmVudExpc3RlbmVyIT1EKXtPLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsWSxmYWxzZSl9ZWxzZXtpZih0eXBlb2Ygai5hZGRFdmVudExpc3RlbmVyIT1EKXtqLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsWSxmYWxzZSl9ZWxzZXtpZih0eXBlb2YgTy5hdHRhY2hFdmVudCE9RCl7aShPLFwib25sb2FkXCIsWSl9ZWxzZXtpZih0eXBlb2YgTy5vbmxvYWQ9PVwiZnVuY3Rpb25cIil7dmFyIFg9Ty5vbmxvYWQ7Ty5vbmxvYWQ9ZnVuY3Rpb24oKXtYKCk7WSgpfX1lbHNle08ub25sb2FkPVl9fX19fWZ1bmN0aW9uIGgoKXtpZihUKXtWKCl9ZWxzZXtIKCl9fWZ1bmN0aW9uIFYoKXt2YXIgWD1qLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYm9keVwiKVswXTt2YXIgYWE9QyhyKTthYS5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIscSk7dmFyIFo9WC5hcHBlbmRDaGlsZChhYSk7aWYoWil7dmFyIFk9MDsoZnVuY3Rpb24oKXtpZih0eXBlb2YgWi5HZXRWYXJpYWJsZSE9RCl7dmFyIGFiPVouR2V0VmFyaWFibGUoXCIkdmVyc2lvblwiKTtpZihhYil7YWI9YWIuc3BsaXQoXCIgXCIpWzFdLnNwbGl0KFwiLFwiKTtNLnB2PVtwYXJzZUludChhYlswXSwxMCkscGFyc2VJbnQoYWJbMV0sMTApLHBhcnNlSW50KGFiWzJdLDEwKV19fWVsc2V7aWYoWTwxMCl7WSsrO3NldFRpbWVvdXQoYXJndW1lbnRzLmNhbGxlZSwxMCk7cmV0dXJufX1YLnJlbW92ZUNoaWxkKGFhKTtaPW51bGw7SCgpfSkoKX1lbHNle0goKX19ZnVuY3Rpb24gSCgpe3ZhciBhZz1vLmxlbmd0aDtpZihhZz4wKXtmb3IodmFyIGFmPTA7YWY8YWc7YWYrKyl7dmFyIFk9b1thZl0uaWQ7dmFyIGFiPW9bYWZdLmNhbGxiYWNrRm47dmFyIGFhPXtzdWNjZXNzOmZhbHNlLGlkOll9O2lmKE0ucHZbMF0+MCl7dmFyIGFlPWMoWSk7aWYoYWUpe2lmKEYob1thZl0uc3dmVmVyc2lvbikmJiEoTS53ayYmTS53azwzMTIpKXt3KFksdHJ1ZSk7aWYoYWIpe2FhLnN1Y2Nlc3M9dHJ1ZTthYS5yZWY9eihZKTthYihhYSl9fWVsc2V7aWYob1thZl0uZXhwcmVzc0luc3RhbGwmJkEoKSl7dmFyIGFpPXt9O2FpLmRhdGE9b1thZl0uZXhwcmVzc0luc3RhbGw7YWkud2lkdGg9YWUuZ2V0QXR0cmlidXRlKFwid2lkdGhcIil8fFwiMFwiO2FpLmhlaWdodD1hZS5nZXRBdHRyaWJ1dGUoXCJoZWlnaHRcIil8fFwiMFwiO2lmKGFlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpKXthaS5zdHlsZWNsYXNzPWFlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpfWlmKGFlLmdldEF0dHJpYnV0ZShcImFsaWduXCIpKXthaS5hbGlnbj1hZS5nZXRBdHRyaWJ1dGUoXCJhbGlnblwiKX12YXIgYWg9e307dmFyIFg9YWUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJwYXJhbVwiKTt2YXIgYWM9WC5sZW5ndGg7Zm9yKHZhciBhZD0wO2FkPGFjO2FkKyspe2lmKFhbYWRdLmdldEF0dHJpYnV0ZShcIm5hbWVcIikudG9Mb3dlckNhc2UoKSE9XCJtb3ZpZVwiKXthaFtYW2FkXS5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpXT1YW2FkXS5nZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiKX19UChhaSxhaCxZLGFiKX1lbHNle3AoYWUpO2lmKGFiKXthYihhYSl9fX19fWVsc2V7dyhZLHRydWUpO2lmKGFiKXt2YXIgWj16KFkpO2lmKFomJnR5cGVvZiBaLlNldFZhcmlhYmxlIT1EKXthYS5zdWNjZXNzPXRydWU7YWEucmVmPVp9YWIoYWEpfX19fX1mdW5jdGlvbiB6KGFhKXt2YXIgWD1udWxsO3ZhciBZPWMoYWEpO2lmKFkmJlkubm9kZU5hbWU9PVwiT0JKRUNUXCIpe2lmKHR5cGVvZiBZLlNldFZhcmlhYmxlIT1EKXtYPVl9ZWxzZXt2YXIgWj1ZLmdldEVsZW1lbnRzQnlUYWdOYW1lKHIpWzBdO2lmKFope1g9Wn19fXJldHVybiBYfWZ1bmN0aW9uIEEoKXtyZXR1cm4gIWEmJkYoXCI2LjAuNjVcIikmJihNLndpbnx8TS5tYWMpJiYhKE0ud2smJk0ud2s8MzEyKX1mdW5jdGlvbiBQKGFhLGFiLFgsWil7YT10cnVlO0U9Wnx8bnVsbDtCPXtzdWNjZXNzOmZhbHNlLGlkOlh9O3ZhciBhZT1jKFgpO2lmKGFlKXtpZihhZS5ub2RlTmFtZT09XCJPQkpFQ1RcIil7bD1nKGFlKTtRPW51bGx9ZWxzZXtsPWFlO1E9WH1hYS5pZD1SO2lmKHR5cGVvZiBhYS53aWR0aD09RHx8KCEvJSQvLnRlc3QoYWEud2lkdGgpJiZwYXJzZUludChhYS53aWR0aCwxMCk8MzEwKSl7YWEud2lkdGg9XCIzMTBcIn1pZih0eXBlb2YgYWEuaGVpZ2h0PT1EfHwoIS8lJC8udGVzdChhYS5oZWlnaHQpJiZwYXJzZUludChhYS5oZWlnaHQsMTApPDEzNykpe2FhLmhlaWdodD1cIjEzN1wifWoudGl0bGU9ai50aXRsZS5zbGljZSgwLDQ3KStcIiAtIEZsYXNoIFBsYXllciBJbnN0YWxsYXRpb25cIjt2YXIgYWQ9TS5pZSYmTS53aW4/KFsnQWN0aXZlJ10uY29uY2F0KCcnKS5qb2luKCdYJykpOlwiUGx1Z0luXCIsYWM9XCJNTXJlZGlyZWN0VVJMPVwiK08ubG9jYXRpb24udG9TdHJpbmcoKS5yZXBsYWNlKC8mL2csXCIlMjZcIikrXCImTU1wbGF5ZXJUeXBlPVwiK2FkK1wiJk1NZG9jdGl0bGU9XCIrai50aXRsZTtpZih0eXBlb2YgYWIuZmxhc2h2YXJzIT1EKXthYi5mbGFzaHZhcnMrPVwiJlwiK2FjfWVsc2V7YWIuZmxhc2h2YXJzPWFjfWlmKE0uaWUmJk0ud2luJiZhZS5yZWFkeVN0YXRlIT00KXt2YXIgWT1DKFwiZGl2XCIpO1grPVwiU1dGT2JqZWN0TmV3XCI7WS5zZXRBdHRyaWJ1dGUoXCJpZFwiLFgpO2FlLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKFksYWUpO2FlLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7KGZ1bmN0aW9uKCl7aWYoYWUucmVhZHlTdGF0ZT09NCl7YWUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChhZSl9ZWxzZXtzZXRUaW1lb3V0KGFyZ3VtZW50cy5jYWxsZWUsMTApfX0pKCl9dShhYSxhYixYKX19ZnVuY3Rpb24gcChZKXtpZihNLmllJiZNLndpbiYmWS5yZWFkeVN0YXRlIT00KXt2YXIgWD1DKFwiZGl2XCIpO1kucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoWCxZKTtYLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGcoWSksWCk7WS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiOyhmdW5jdGlvbigpe2lmKFkucmVhZHlTdGF0ZT09NCl7WS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKFkpfWVsc2V7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKX19KSgpfWVsc2V7WS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChnKFkpLFkpfX1mdW5jdGlvbiBnKGFiKXt2YXIgYWE9QyhcImRpdlwiKTtpZihNLndpbiYmTS5pZSl7YWEuaW5uZXJIVE1MPWFiLmlubmVySFRNTH1lbHNle3ZhciBZPWFiLmdldEVsZW1lbnRzQnlUYWdOYW1lKHIpWzBdO2lmKFkpe3ZhciBhZD1ZLmNoaWxkTm9kZXM7aWYoYWQpe3ZhciBYPWFkLmxlbmd0aDtmb3IodmFyIFo9MDtaPFg7WisrKXtpZighKGFkW1pdLm5vZGVUeXBlPT0xJiZhZFtaXS5ub2RlTmFtZT09XCJQQVJBTVwiKSYmIShhZFtaXS5ub2RlVHlwZT09OCkpe2FhLmFwcGVuZENoaWxkKGFkW1pdLmNsb25lTm9kZSh0cnVlKSl9fX19fXJldHVybiBhYX1mdW5jdGlvbiB1KGFpLGFnLFkpe3ZhciBYLGFhPWMoWSk7aWYoTS53ayYmTS53azwzMTIpe3JldHVybiBYfWlmKGFhKXtpZih0eXBlb2YgYWkuaWQ9PUQpe2FpLmlkPVl9aWYoTS5pZSYmTS53aW4pe3ZhciBhaD1cIlwiO2Zvcih2YXIgYWUgaW4gYWkpe2lmKGFpW2FlXSE9T2JqZWN0LnByb3RvdHlwZVthZV0pe2lmKGFlLnRvTG93ZXJDYXNlKCk9PVwiZGF0YVwiKXthZy5tb3ZpZT1haVthZV19ZWxzZXtpZihhZS50b0xvd2VyQ2FzZSgpPT1cInN0eWxlY2xhc3NcIil7YWgrPScgY2xhc3M9XCInK2FpW2FlXSsnXCInfWVsc2V7aWYoYWUudG9Mb3dlckNhc2UoKSE9XCJjbGFzc2lkXCIpe2FoKz1cIiBcIithZSsnPVwiJythaVthZV0rJ1wiJ319fX19dmFyIGFmPVwiXCI7Zm9yKHZhciBhZCBpbiBhZyl7aWYoYWdbYWRdIT1PYmplY3QucHJvdG90eXBlW2FkXSl7YWYrPSc8cGFyYW0gbmFtZT1cIicrYWQrJ1wiIHZhbHVlPVwiJythZ1thZF0rJ1wiIC8+J319YWEub3V0ZXJIVE1MPSc8b2JqZWN0IGNsYXNzaWQ9XCJjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDBcIicrYWgrXCI+XCIrYWYrXCI8L29iamVjdD5cIjtOW04ubGVuZ3RoXT1haS5pZDtYPWMoYWkuaWQpfWVsc2V7dmFyIFo9QyhyKTtaLnNldEF0dHJpYnV0ZShcInR5cGVcIixxKTtmb3IodmFyIGFjIGluIGFpKXtpZihhaVthY10hPU9iamVjdC5wcm90b3R5cGVbYWNdKXtpZihhYy50b0xvd2VyQ2FzZSgpPT1cInN0eWxlY2xhc3NcIil7Wi5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLGFpW2FjXSl9ZWxzZXtpZihhYy50b0xvd2VyQ2FzZSgpIT1cImNsYXNzaWRcIil7Wi5zZXRBdHRyaWJ1dGUoYWMsYWlbYWNdKX19fX1mb3IodmFyIGFiIGluIGFnKXtpZihhZ1thYl0hPU9iamVjdC5wcm90b3R5cGVbYWJdJiZhYi50b0xvd2VyQ2FzZSgpIT1cIm1vdmllXCIpe2UoWixhYixhZ1thYl0pfX1hYS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChaLGFhKTtYPVp9fXJldHVybiBYfWZ1bmN0aW9uIGUoWixYLFkpe3ZhciBhYT1DKFwicGFyYW1cIik7YWEuc2V0QXR0cmlidXRlKFwibmFtZVwiLFgpO2FhLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsWSk7Wi5hcHBlbmRDaGlsZChhYSl9ZnVuY3Rpb24geShZKXt2YXIgWD1jKFkpO2lmKFgmJlgubm9kZU5hbWU9PVwiT0JKRUNUXCIpe2lmKE0uaWUmJk0ud2luKXtYLnN0eWxlLmRpc3BsYXk9XCJub25lXCI7KGZ1bmN0aW9uKCl7aWYoWC5yZWFkeVN0YXRlPT00KXtiKFkpfWVsc2V7c2V0VGltZW91dChhcmd1bWVudHMuY2FsbGVlLDEwKX19KSgpfWVsc2V7WC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKFgpfX19ZnVuY3Rpb24gYihaKXt2YXIgWT1jKFopO2lmKFkpe2Zvcih2YXIgWCBpbiBZKXtpZih0eXBlb2YgWVtYXT09XCJmdW5jdGlvblwiKXtZW1hdPW51bGx9fVkucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChZKX19ZnVuY3Rpb24gYyhaKXt2YXIgWD1udWxsO3RyeXtYPWouZ2V0RWxlbWVudEJ5SWQoWil9Y2F0Y2goWSl7fXJldHVybiBYfWZ1bmN0aW9uIEMoWCl7cmV0dXJuIGouY3JlYXRlRWxlbWVudChYKX1mdW5jdGlvbiBpKFosWCxZKXtaLmF0dGFjaEV2ZW50KFgsWSk7SVtJLmxlbmd0aF09W1osWCxZXX1mdW5jdGlvbiBGKFope3ZhciBZPU0ucHYsWD1aLnNwbGl0KFwiLlwiKTtYWzBdPXBhcnNlSW50KFhbMF0sMTApO1hbMV09cGFyc2VJbnQoWFsxXSwxMCl8fDA7WFsyXT1wYXJzZUludChYWzJdLDEwKXx8MDtyZXR1cm4oWVswXT5YWzBdfHwoWVswXT09WFswXSYmWVsxXT5YWzFdKXx8KFlbMF09PVhbMF0mJllbMV09PVhbMV0mJllbMl0+PVhbMl0pKT90cnVlOmZhbHNlfWZ1bmN0aW9uIHYoYWMsWSxhZCxhYil7aWYoTS5pZSYmTS5tYWMpe3JldHVybn12YXIgYWE9ai5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07aWYoIWFhKXtyZXR1cm59dmFyIFg9KGFkJiZ0eXBlb2YgYWQ9PVwic3RyaW5nXCIpP2FkOlwic2NyZWVuXCI7aWYoYWIpe249bnVsbDtHPW51bGx9aWYoIW58fEchPVgpe3ZhciBaPUMoXCJzdHlsZVwiKTtaLnNldEF0dHJpYnV0ZShcInR5cGVcIixcInRleHQvY3NzXCIpO1ouc2V0QXR0cmlidXRlKFwibWVkaWFcIixYKTtuPWFhLmFwcGVuZENoaWxkKFopO2lmKE0uaWUmJk0ud2luJiZ0eXBlb2Ygai5zdHlsZVNoZWV0cyE9RCYmai5zdHlsZVNoZWV0cy5sZW5ndGg+MCl7bj1qLnN0eWxlU2hlZXRzW2ouc3R5bGVTaGVldHMubGVuZ3RoLTFdfUc9WH1pZihNLmllJiZNLndpbil7aWYobiYmdHlwZW9mIG4uYWRkUnVsZT09cil7bi5hZGRSdWxlKGFjLFkpfX1lbHNle2lmKG4mJnR5cGVvZiBqLmNyZWF0ZVRleHROb2RlIT1EKXtuLmFwcGVuZENoaWxkKGouY3JlYXRlVGV4dE5vZGUoYWMrXCIge1wiK1krXCJ9XCIpKX19fWZ1bmN0aW9uIHcoWixYKXtpZighbSl7cmV0dXJufXZhciBZPVg/XCJ2aXNpYmxlXCI6XCJoaWRkZW5cIjtpZihKJiZjKFopKXtjKFopLnN0eWxlLnZpc2liaWxpdHk9WX1lbHNle3YoXCIjXCIrWixcInZpc2liaWxpdHk6XCIrWSl9fWZ1bmN0aW9uIEwoWSl7dmFyIFo9L1tcXFxcXFxcIjw+XFwuO10vO3ZhciBYPVouZXhlYyhZKSE9bnVsbDtyZXR1cm4gWCYmdHlwZW9mIGVuY29kZVVSSUNvbXBvbmVudCE9RD9lbmNvZGVVUklDb21wb25lbnQoWSk6WX12YXIgZD1mdW5jdGlvbigpe2lmKE0uaWUmJk0ud2luKXt3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbnVubG9hZFwiLGZ1bmN0aW9uKCl7dmFyIGFjPUkubGVuZ3RoO2Zvcih2YXIgYWI9MDthYjxhYzthYisrKXtJW2FiXVswXS5kZXRhY2hFdmVudChJW2FiXVsxXSxJW2FiXVsyXSl9dmFyIFo9Ti5sZW5ndGg7Zm9yKHZhciBhYT0wO2FhPFo7YWErKyl7eShOW2FhXSl9Zm9yKHZhciBZIGluIE0pe01bWV09bnVsbH1NPW51bGw7Zm9yKHZhciBYIGluIHN3Zm9iamVjdCl7c3dmb2JqZWN0W1hdPW51bGx9c3dmb2JqZWN0PW51bGx9KX19KCk7cmV0dXJue3JlZ2lzdGVyT2JqZWN0OmZ1bmN0aW9uKGFiLFgsYWEsWil7aWYoTS53MyYmYWImJlgpe3ZhciBZPXt9O1kuaWQ9YWI7WS5zd2ZWZXJzaW9uPVg7WS5leHByZXNzSW5zdGFsbD1hYTtZLmNhbGxiYWNrRm49WjtvW28ubGVuZ3RoXT1ZO3coYWIsZmFsc2UpfWVsc2V7aWYoWil7Wih7c3VjY2VzczpmYWxzZSxpZDphYn0pfX19LGdldE9iamVjdEJ5SWQ6ZnVuY3Rpb24oWCl7aWYoTS53Myl7cmV0dXJuIHooWCl9fSxlbWJlZFNXRjpmdW5jdGlvbihhYixhaCxhZSxhZyxZLGFhLFosYWQsYWYsYWMpe3ZhciBYPXtzdWNjZXNzOmZhbHNlLGlkOmFofTtpZihNLnczJiYhKE0ud2smJk0ud2s8MzEyKSYmYWImJmFoJiZhZSYmYWcmJlkpe3coYWgsZmFsc2UpO0soZnVuY3Rpb24oKXthZSs9XCJcIjthZys9XCJcIjt2YXIgYWo9e307aWYoYWYmJnR5cGVvZiBhZj09PXIpe2Zvcih2YXIgYWwgaW4gYWYpe2FqW2FsXT1hZlthbF19fWFqLmRhdGE9YWI7YWoud2lkdGg9YWU7YWouaGVpZ2h0PWFnO3ZhciBhbT17fTtpZihhZCYmdHlwZW9mIGFkPT09cil7Zm9yKHZhciBhayBpbiBhZCl7YW1bYWtdPWFkW2FrXX19aWYoWiYmdHlwZW9mIFo9PT1yKXtmb3IodmFyIGFpIGluIFope2lmKHR5cGVvZiBhbS5mbGFzaHZhcnMhPUQpe2FtLmZsYXNodmFycys9XCImXCIrYWkrXCI9XCIrWlthaV19ZWxzZXthbS5mbGFzaHZhcnM9YWkrXCI9XCIrWlthaV19fX1pZihGKFkpKXt2YXIgYW49dShhaixhbSxhaCk7aWYoYWouaWQ9PWFoKXt3KGFoLHRydWUpfVguc3VjY2Vzcz10cnVlO1gucmVmPWFufWVsc2V7aWYoYWEmJkEoKSl7YWouZGF0YT1hYTtQKGFqLGFtLGFoLGFjKTtyZXR1cm59ZWxzZXt3KGFoLHRydWUpfX1pZihhYyl7YWMoWCl9fSl9ZWxzZXtpZihhYyl7YWMoWCl9fX0sc3dpdGNoT2ZmQXV0b0hpZGVTaG93OmZ1bmN0aW9uKCl7bT1mYWxzZX0sdWE6TSxnZXRGbGFzaFBsYXllclZlcnNpb246ZnVuY3Rpb24oKXtyZXR1cm57bWFqb3I6TS5wdlswXSxtaW5vcjpNLnB2WzFdLHJlbGVhc2U6TS5wdlsyXX19LGhhc0ZsYXNoUGxheWVyVmVyc2lvbjpGLGNyZWF0ZVNXRjpmdW5jdGlvbihaLFksWCl7aWYoTS53Myl7cmV0dXJuIHUoWixZLFgpfWVsc2V7cmV0dXJuIHVuZGVmaW5lZH19LHNob3dFeHByZXNzSW5zdGFsbDpmdW5jdGlvbihaLGFhLFgsWSl7aWYoTS53MyYmQSgpKXtQKFosYWEsWCxZKX19LHJlbW92ZVNXRjpmdW5jdGlvbihYKXtpZihNLnczKXt5KFgpfX0sY3JlYXRlQ1NTOmZ1bmN0aW9uKGFhLFosWSxYKXtpZihNLnczKXt2KGFhLFosWSxYKX19LGFkZERvbUxvYWRFdmVudDpLLGFkZExvYWRFdmVudDpzLGdldFF1ZXJ5UGFyYW1WYWx1ZTpmdW5jdGlvbihhYSl7dmFyIFo9ai5sb2NhdGlvbi5zZWFyY2h8fGoubG9jYXRpb24uaGFzaDtpZihaKXtpZigvXFw/Ly50ZXN0KFopKXtaPVouc3BsaXQoXCI/XCIpWzFdfWlmKGFhPT1udWxsKXtyZXR1cm4gTChaKX12YXIgWT1aLnNwbGl0KFwiJlwiKTtmb3IodmFyIFg9MDtYPFkubGVuZ3RoO1grKyl7aWYoWVtYXS5zdWJzdHJpbmcoMCxZW1hdLmluZGV4T2YoXCI9XCIpKT09YWEpe3JldHVybiBMKFlbWF0uc3Vic3RyaW5nKChZW1hdLmluZGV4T2YoXCI9XCIpKzEpKSl9fX1yZXR1cm5cIlwifSxleHByZXNzSW5zdGFsbENhbGxiYWNrOmZ1bmN0aW9uKCl7aWYoYSl7dmFyIFg9YyhSKTtpZihYJiZsKXtYLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGwsWCk7aWYoUSl7dyhRLHRydWUpO2lmKE0uaWUmJk0ud2luKXtsLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wifX1pZihFKXtFKEIpfX1hPWZhbHNlfX19fSgpO1xufVxuLy8gQ29weXJpZ2h0OiBIaXJvc2hpIEljaGlrYXdhIDxodHRwOi8vZ2ltaXRlLm5ldC9lbi8+XG4vLyBMaWNlbnNlOiBOZXcgQlNEIExpY2Vuc2Vcbi8vIFJlZmVyZW5jZTogaHR0cDovL2Rldi53My5vcmcvaHRtbDUvd2Vic29ja2V0cy9cbi8vIFJlZmVyZW5jZTogaHR0cDovL3Rvb2xzLmlldGYub3JnL2h0bWwvZHJhZnQtaGl4aWUtdGhld2Vic29ja2V0cHJvdG9jb2xcblxuKGZ1bmN0aW9uKCkge1xuICBcbiAgaWYgKCd1bmRlZmluZWQnID09IHR5cGVvZiB3aW5kb3cgfHwgd2luZG93LldlYlNvY2tldCkgcmV0dXJuO1xuXG4gIHZhciBjb25zb2xlID0gd2luZG93LmNvbnNvbGU7XG4gIGlmICghY29uc29sZSB8fCAhY29uc29sZS5sb2cgfHwgIWNvbnNvbGUuZXJyb3IpIHtcbiAgICBjb25zb2xlID0ge2xvZzogZnVuY3Rpb24oKXsgfSwgZXJyb3I6IGZ1bmN0aW9uKCl7IH19O1xuICB9XG4gIFxuICBpZiAoIXN3Zm9iamVjdC5oYXNGbGFzaFBsYXllclZlcnNpb24oXCIxMC4wLjBcIikpIHtcbiAgICBjb25zb2xlLmVycm9yKFwiRmxhc2ggUGxheWVyID49IDEwLjAuMCBpcyByZXF1aXJlZC5cIik7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChsb2NhdGlvbi5wcm90b2NvbCA9PSBcImZpbGU6XCIpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgXCJXQVJOSU5HOiB3ZWItc29ja2V0LWpzIGRvZXNuJ3Qgd29yayBpbiBmaWxlOi8vLy4uLiBVUkwgXCIgK1xuICAgICAgXCJ1bmxlc3MgeW91IHNldCBGbGFzaCBTZWN1cml0eSBTZXR0aW5ncyBwcm9wZXJseS4gXCIgK1xuICAgICAgXCJPcGVuIHRoZSBwYWdlIHZpYSBXZWIgc2VydmVyIGkuZS4gaHR0cDovLy4uLlwiKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIGNsYXNzIHJlcHJlc2VudHMgYSBmYXV4IHdlYiBzb2NrZXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICogQHBhcmFtIHthcnJheSBvciBzdHJpbmd9IHByb3RvY29sc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJveHlIb3N0XG4gICAqIEBwYXJhbSB7aW50fSBwcm94eVBvcnRcbiAgICogQHBhcmFtIHtzdHJpbmd9IGhlYWRlcnNcbiAgICovXG4gIFdlYlNvY2tldCA9IGZ1bmN0aW9uKHVybCwgcHJvdG9jb2xzLCBwcm94eUhvc3QsIHByb3h5UG9ydCwgaGVhZGVycykge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBzZWxmLl9faWQgPSBXZWJTb2NrZXQuX19uZXh0SWQrKztcbiAgICBXZWJTb2NrZXQuX19pbnN0YW5jZXNbc2VsZi5fX2lkXSA9IHNlbGY7XG4gICAgc2VsZi5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNPTk5FQ1RJTkc7XG4gICAgc2VsZi5idWZmZXJlZEFtb3VudCA9IDA7XG4gICAgc2VsZi5fX2V2ZW50cyA9IHt9O1xuICAgIGlmICghcHJvdG9jb2xzKSB7XG4gICAgICBwcm90b2NvbHMgPSBbXTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBwcm90b2NvbHMgPT0gXCJzdHJpbmdcIikge1xuICAgICAgcHJvdG9jb2xzID0gW3Byb3RvY29sc107XG4gICAgfVxuICAgIC8vIFVzZXMgc2V0VGltZW91dCgpIHRvIG1ha2Ugc3VyZSBfX2NyZWF0ZUZsYXNoKCkgcnVucyBhZnRlciB0aGUgY2FsbGVyIHNldHMgd3Mub25vcGVuIGV0Yy5cbiAgICAvLyBPdGhlcndpc2UsIHdoZW4gb25vcGVuIGZpcmVzIGltbWVkaWF0ZWx5LCBvbm9wZW4gaXMgY2FsbGVkIGJlZm9yZSBpdCBpcyBzZXQuXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIFdlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24oKSB7XG4gICAgICAgIFdlYlNvY2tldC5fX2ZsYXNoLmNyZWF0ZShcbiAgICAgICAgICAgIHNlbGYuX19pZCwgdXJsLCBwcm90b2NvbHMsIHByb3h5SG9zdCB8fCBudWxsLCBwcm94eVBvcnQgfHwgMCwgaGVhZGVycyB8fCBudWxsKTtcbiAgICAgIH0pO1xuICAgIH0sIDApO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgdG8gdGhlIHdlYiBzb2NrZXQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBkYXRhICBUaGUgZGF0YSB0byBzZW5kIHRvIHRoZSBzb2NrZXQuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59ICBUcnVlIGZvciBzdWNjZXNzLCBmYWxzZSBmb3IgZmFpbHVyZS5cbiAgICovXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICBpZiAodGhpcy5yZWFkeVN0YXRlID09IFdlYlNvY2tldC5DT05ORUNUSU5HKSB7XG4gICAgICB0aHJvdyBcIklOVkFMSURfU1RBVEVfRVJSOiBXZWIgU29ja2V0IGNvbm5lY3Rpb24gaGFzIG5vdCBiZWVuIGVzdGFibGlzaGVkXCI7XG4gICAgfVxuICAgIC8vIFdlIHVzZSBlbmNvZGVVUklDb21wb25lbnQoKSBoZXJlLCBiZWNhdXNlIEZBQnJpZGdlIGRvZXNuJ3Qgd29yayBpZlxuICAgIC8vIHRoZSBhcmd1bWVudCBpbmNsdWRlcyBzb21lIGNoYXJhY3RlcnMuIFdlIGRvbid0IHVzZSBlc2NhcGUoKSBoZXJlXG4gICAgLy8gYmVjYXVzZSBvZiB0aGlzOlxuICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0NvcmVfSmF2YVNjcmlwdF8xLjVfR3VpZGUvRnVuY3Rpb25zI2VzY2FwZV9hbmRfdW5lc2NhcGVfRnVuY3Rpb25zXG4gICAgLy8gQnV0IGl0IGxvb2tzIGRlY29kZVVSSUNvbXBvbmVudChlbmNvZGVVUklDb21wb25lbnQocykpIGRvZXNuJ3RcbiAgICAvLyBwcmVzZXJ2ZSBhbGwgVW5pY29kZSBjaGFyYWN0ZXJzIGVpdGhlciBlLmcuIFwiXFx1ZmZmZlwiIGluIEZpcmVmb3guXG4gICAgLy8gTm90ZSBieSB3dHJpdGNoOiBIb3BlZnVsbHkgdGhpcyB3aWxsIG5vdCBiZSBuZWNlc3NhcnkgdXNpbmcgRXh0ZXJuYWxJbnRlcmZhY2UuICBXaWxsIHJlcXVpcmVcbiAgICAvLyBhZGRpdGlvbmFsIHRlc3RpbmcuXG4gICAgdmFyIHJlc3VsdCA9IFdlYlNvY2tldC5fX2ZsYXNoLnNlbmQodGhpcy5fX2lkLCBlbmNvZGVVUklDb21wb25lbnQoZGF0YSkpO1xuICAgIGlmIChyZXN1bHQgPCAwKSB7IC8vIHN1Y2Nlc3NcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmJ1ZmZlcmVkQW1vdW50ICs9IHJlc3VsdDtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIENsb3NlIHRoaXMgd2ViIHNvY2tldCBncmFjZWZ1bGx5LlxuICAgKi9cbiAgV2ViU29ja2V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0LkNMT1NFRCB8fCB0aGlzLnJlYWR5U3RhdGUgPT0gV2ViU29ja2V0LkNMT1NJTkcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5yZWFkeVN0YXRlID0gV2ViU29ja2V0LkNMT1NJTkc7XG4gICAgV2ViU29ja2V0Ll9fZmxhc2guY2xvc2UodGhpcy5fX2lkKTtcbiAgfTtcblxuICAvKipcbiAgICogSW1wbGVtZW50YXRpb24gb2Yge0BsaW5rIDxhIGhyZWY9XCJodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMi1FdmVudHMvZXZlbnRzLmh0bWwjRXZlbnRzLXJlZ2lzdHJhdGlvblwiPkRPTSAyIEV2ZW50VGFyZ2V0IEludGVyZmFjZTwvYT59XG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IGxpc3RlbmVyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gdXNlQ2FwdHVyZVxuICAgKiBAcmV0dXJuIHZvaWRcbiAgICovXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyLCB1c2VDYXB0dXJlKSB7XG4gICAgaWYgKCEodHlwZSBpbiB0aGlzLl9fZXZlbnRzKSkge1xuICAgICAgdGhpcy5fX2V2ZW50c1t0eXBlXSA9IFtdO1xuICAgIH1cbiAgICB0aGlzLl9fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgPGEgaHJlZj1cImh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUV2ZW50cy9ldmVudHMuaHRtbCNFdmVudHMtcmVnaXN0cmF0aW9uXCI+RE9NIDIgRXZlbnRUYXJnZXQgSW50ZXJmYWNlPC9hPn1cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gbGlzdGVuZXJcbiAgICogQHBhcmFtIHtib29sZWFufSB1c2VDYXB0dXJlXG4gICAqIEByZXR1cm4gdm9pZFxuICAgKi9cbiAgV2ViU29ja2V0LnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIsIHVzZUNhcHR1cmUpIHtcbiAgICBpZiAoISh0eXBlIGluIHRoaXMuX19ldmVudHMpKSByZXR1cm47XG4gICAgdmFyIGV2ZW50cyA9IHRoaXMuX19ldmVudHNbdHlwZV07XG4gICAgZm9yICh2YXIgaSA9IGV2ZW50cy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgaWYgKGV2ZW50c1tpXSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgZXZlbnRzLnNwbGljZShpLCAxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbXBsZW1lbnRhdGlvbiBvZiB7QGxpbmsgPGEgaHJlZj1cImh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0yLUV2ZW50cy9ldmVudHMuaHRtbCNFdmVudHMtcmVnaXN0cmF0aW9uXCI+RE9NIDIgRXZlbnRUYXJnZXQgSW50ZXJmYWNlPC9hPn1cbiAgICpcbiAgICogQHBhcmFtIHtFdmVudH0gZXZlbnRcbiAgICogQHJldHVybiB2b2lkXG4gICAqL1xuICBXZWJTb2NrZXQucHJvdG90eXBlLmRpc3BhdGNoRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciBldmVudHMgPSB0aGlzLl9fZXZlbnRzW2V2ZW50LnR5cGVdIHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICBldmVudHNbaV0oZXZlbnQpO1xuICAgIH1cbiAgICB2YXIgaGFuZGxlciA9IHRoaXNbXCJvblwiICsgZXZlbnQudHlwZV07XG4gICAgaWYgKGhhbmRsZXIpIGhhbmRsZXIoZXZlbnQpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGVzIGFuIGV2ZW50IGZyb20gRmxhc2guXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmbGFzaEV2ZW50XG4gICAqL1xuICBXZWJTb2NrZXQucHJvdG90eXBlLl9faGFuZGxlRXZlbnQgPSBmdW5jdGlvbihmbGFzaEV2ZW50KSB7XG4gICAgaWYgKFwicmVhZHlTdGF0ZVwiIGluIGZsYXNoRXZlbnQpIHtcbiAgICAgIHRoaXMucmVhZHlTdGF0ZSA9IGZsYXNoRXZlbnQucmVhZHlTdGF0ZTtcbiAgICB9XG4gICAgaWYgKFwicHJvdG9jb2xcIiBpbiBmbGFzaEV2ZW50KSB7XG4gICAgICB0aGlzLnByb3RvY29sID0gZmxhc2hFdmVudC5wcm90b2NvbDtcbiAgICB9XG4gICAgXG4gICAgdmFyIGpzRXZlbnQ7XG4gICAgaWYgKGZsYXNoRXZlbnQudHlwZSA9PSBcIm9wZW5cIiB8fCBmbGFzaEV2ZW50LnR5cGUgPT0gXCJlcnJvclwiKSB7XG4gICAgICBqc0V2ZW50ID0gdGhpcy5fX2NyZWF0ZVNpbXBsZUV2ZW50KGZsYXNoRXZlbnQudHlwZSk7XG4gICAgfSBlbHNlIGlmIChmbGFzaEV2ZW50LnR5cGUgPT0gXCJjbG9zZVwiKSB7XG4gICAgICAvLyBUT0RPIGltcGxlbWVudCBqc0V2ZW50Lndhc0NsZWFuXG4gICAgICBqc0V2ZW50ID0gdGhpcy5fX2NyZWF0ZVNpbXBsZUV2ZW50KFwiY2xvc2VcIik7XG4gICAgfSBlbHNlIGlmIChmbGFzaEV2ZW50LnR5cGUgPT0gXCJtZXNzYWdlXCIpIHtcbiAgICAgIHZhciBkYXRhID0gZGVjb2RlVVJJQ29tcG9uZW50KGZsYXNoRXZlbnQubWVzc2FnZSk7XG4gICAgICBqc0V2ZW50ID0gdGhpcy5fX2NyZWF0ZU1lc3NhZ2VFdmVudChcIm1lc3NhZ2VcIiwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IFwidW5rbm93biBldmVudCB0eXBlOiBcIiArIGZsYXNoRXZlbnQudHlwZTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5kaXNwYXRjaEV2ZW50KGpzRXZlbnQpO1xuICB9O1xuICBcbiAgV2ViU29ja2V0LnByb3RvdHlwZS5fX2NyZWF0ZVNpbXBsZUV2ZW50ID0gZnVuY3Rpb24odHlwZSkge1xuICAgIGlmIChkb2N1bWVudC5jcmVhdGVFdmVudCAmJiB3aW5kb3cuRXZlbnQpIHtcbiAgICAgIHZhciBldmVudCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XG4gICAgICBldmVudC5pbml0RXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlKTtcbiAgICAgIHJldHVybiBldmVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHt0eXBlOiB0eXBlLCBidWJibGVzOiBmYWxzZSwgY2FuY2VsYWJsZTogZmFsc2V9O1xuICAgIH1cbiAgfTtcbiAgXG4gIFdlYlNvY2tldC5wcm90b3R5cGUuX19jcmVhdGVNZXNzYWdlRXZlbnQgPSBmdW5jdGlvbih0eXBlLCBkYXRhKSB7XG4gICAgaWYgKGRvY3VtZW50LmNyZWF0ZUV2ZW50ICYmIHdpbmRvdy5NZXNzYWdlRXZlbnQgJiYgIXdpbmRvdy5vcGVyYSkge1xuICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJNZXNzYWdlRXZlbnRcIik7XG4gICAgICBldmVudC5pbml0TWVzc2FnZUV2ZW50KFwibWVzc2FnZVwiLCBmYWxzZSwgZmFsc2UsIGRhdGEsIG51bGwsIG51bGwsIHdpbmRvdywgbnVsbCk7XG4gICAgICByZXR1cm4gZXZlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElFIGFuZCBPcGVyYSwgdGhlIGxhdHRlciBvbmUgdHJ1bmNhdGVzIHRoZSBkYXRhIHBhcmFtZXRlciBhZnRlciBhbnkgMHgwMCBieXRlcy5cbiAgICAgIHJldHVybiB7dHlwZTogdHlwZSwgZGF0YTogZGF0YSwgYnViYmxlczogZmFsc2UsIGNhbmNlbGFibGU6IGZhbHNlfTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogRGVmaW5lIHRoZSBXZWJTb2NrZXQgcmVhZHlTdGF0ZSBlbnVtZXJhdGlvbi5cbiAgICovXG4gIFdlYlNvY2tldC5DT05ORUNUSU5HID0gMDtcbiAgV2ViU29ja2V0Lk9QRU4gPSAxO1xuICBXZWJTb2NrZXQuQ0xPU0lORyA9IDI7XG4gIFdlYlNvY2tldC5DTE9TRUQgPSAzO1xuXG4gIFdlYlNvY2tldC5fX2ZsYXNoID0gbnVsbDtcbiAgV2ViU29ja2V0Ll9faW5zdGFuY2VzID0ge307XG4gIFdlYlNvY2tldC5fX3Rhc2tzID0gW107XG4gIFdlYlNvY2tldC5fX25leHRJZCA9IDA7XG4gIFxuICAvKipcbiAgICogTG9hZCBhIG5ldyBmbGFzaCBzZWN1cml0eSBwb2xpY3kgZmlsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgKi9cbiAgV2ViU29ja2V0LmxvYWRGbGFzaFBvbGljeUZpbGUgPSBmdW5jdGlvbih1cmwpe1xuICAgIFdlYlNvY2tldC5fX2FkZFRhc2soZnVuY3Rpb24oKSB7XG4gICAgICBXZWJTb2NrZXQuX19mbGFzaC5sb2FkTWFudWFsUG9saWN5RmlsZSh1cmwpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBMb2FkcyBXZWJTb2NrZXRNYWluLnN3ZiBhbmQgY3JlYXRlcyBXZWJTb2NrZXRNYWluIG9iamVjdCBpbiBGbGFzaC5cbiAgICovXG4gIFdlYlNvY2tldC5fX2luaXRpYWxpemUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoV2ViU29ja2V0Ll9fZmxhc2gpIHJldHVybjtcbiAgICBcbiAgICBpZiAoV2ViU29ja2V0Ll9fc3dmTG9jYXRpb24pIHtcbiAgICAgIC8vIEZvciBiYWNrd29yZCBjb21wYXRpYmlsaXR5LlxuICAgICAgd2luZG93LldFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OID0gV2ViU29ja2V0Ll9fc3dmTG9jYXRpb247XG4gICAgfVxuICAgIGlmICghd2luZG93LldFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OKSB7XG4gICAgICBjb25zb2xlLmVycm9yKFwiW1dlYlNvY2tldF0gc2V0IFdFQl9TT0NLRVRfU1dGX0xPQ0FUSU9OIHRvIGxvY2F0aW9uIG9mIFdlYlNvY2tldE1haW4uc3dmXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb250YWluZXIuaWQgPSBcIndlYlNvY2tldENvbnRhaW5lclwiO1xuICAgIC8vIEhpZGVzIEZsYXNoIGJveC4gV2UgY2Fubm90IHVzZSBkaXNwbGF5OiBub25lIG9yIHZpc2liaWxpdHk6IGhpZGRlbiBiZWNhdXNlIGl0IHByZXZlbnRzXG4gICAgLy8gRmxhc2ggZnJvbSBsb2FkaW5nIGF0IGxlYXN0IGluIElFLiBTbyB3ZSBtb3ZlIGl0IG91dCBvZiB0aGUgc2NyZWVuIGF0ICgtMTAwLCAtMTAwKS5cbiAgICAvLyBCdXQgdGhpcyBldmVuIGRvZXNuJ3Qgd29yayB3aXRoIEZsYXNoIExpdGUgKGUuZy4gaW4gRHJvaWQgSW5jcmVkaWJsZSkuIFNvIHdpdGggRmxhc2hcbiAgICAvLyBMaXRlLCB3ZSBwdXQgaXQgYXQgKDAsIDApLiBUaGlzIHNob3dzIDF4MSBib3ggdmlzaWJsZSBhdCBsZWZ0LXRvcCBjb3JuZXIgYnV0IHRoaXMgaXNcbiAgICAvLyB0aGUgYmVzdCB3ZSBjYW4gZG8gYXMgZmFyIGFzIHdlIGtub3cgbm93LlxuICAgIGNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcbiAgICBpZiAoV2ViU29ja2V0Ll9faXNGbGFzaExpdGUoKSkge1xuICAgICAgY29udGFpbmVyLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xuICAgICAgY29udGFpbmVyLnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gXCItMTAwcHhcIjtcbiAgICAgIGNvbnRhaW5lci5zdHlsZS50b3AgPSBcIi0xMDBweFwiO1xuICAgIH1cbiAgICB2YXIgaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBob2xkZXIuaWQgPSBcIndlYlNvY2tldEZsYXNoXCI7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGhvbGRlcik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIC8vIFNlZSB0aGlzIGFydGljbGUgZm9yIGhhc1ByaW9yaXR5OlxuICAgIC8vIGh0dHA6Ly9oZWxwLmFkb2JlLmNvbS9lbl9VUy9hczMvbW9iaWxlL1dTNGJlYmNkNjZhNzQyNzVjMzZjZmI4MTM3MTI0MzE4ZWViYzYtN2ZmZC5odG1sXG4gICAgc3dmb2JqZWN0LmVtYmVkU1dGKFxuICAgICAgV0VCX1NPQ0tFVF9TV0ZfTE9DQVRJT04sXG4gICAgICBcIndlYlNvY2tldEZsYXNoXCIsXG4gICAgICBcIjFcIiAvKiB3aWR0aCAqLyxcbiAgICAgIFwiMVwiIC8qIGhlaWdodCAqLyxcbiAgICAgIFwiMTAuMC4wXCIgLyogU1dGIHZlcnNpb24gKi8sXG4gICAgICBudWxsLFxuICAgICAgbnVsbCxcbiAgICAgIHtoYXNQcmlvcml0eTogdHJ1ZSwgc3dsaXZlY29ubmVjdCA6IHRydWUsIGFsbG93U2NyaXB0QWNjZXNzOiBcImFsd2F5c1wifSxcbiAgICAgIG51bGwsXG4gICAgICBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghZS5zdWNjZXNzKSB7XG4gICAgICAgICAgY29uc29sZS5lcnJvcihcIltXZWJTb2NrZXRdIHN3Zm9iamVjdC5lbWJlZFNXRiBmYWlsZWRcIik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9O1xuICBcbiAgLyoqXG4gICAqIENhbGxlZCBieSBGbGFzaCB0byBub3RpZnkgSlMgdGhhdCBpdCdzIGZ1bGx5IGxvYWRlZCBhbmQgcmVhZHlcbiAgICogZm9yIGNvbW11bmljYXRpb24uXG4gICAqL1xuICBXZWJTb2NrZXQuX19vbkZsYXNoSW5pdGlhbGl6ZWQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBXZSBuZWVkIHRvIHNldCBhIHRpbWVvdXQgaGVyZSB0byBhdm9pZCByb3VuZC10cmlwIGNhbGxzXG4gICAgLy8gdG8gZmxhc2ggZHVyaW5nIHRoZSBpbml0aWFsaXphdGlvbiBwcm9jZXNzLlxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICBXZWJTb2NrZXQuX19mbGFzaCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2ViU29ja2V0Rmxhc2hcIik7XG4gICAgICBXZWJTb2NrZXQuX19mbGFzaC5zZXRDYWxsZXJVcmwobG9jYXRpb24uaHJlZik7XG4gICAgICBXZWJTb2NrZXQuX19mbGFzaC5zZXREZWJ1ZyghIXdpbmRvdy5XRUJfU09DS0VUX0RFQlVHKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgV2ViU29ja2V0Ll9fdGFza3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgV2ViU29ja2V0Ll9fdGFza3NbaV0oKTtcbiAgICAgIH1cbiAgICAgIFdlYlNvY2tldC5fX3Rhc2tzID0gW107XG4gICAgfSwgMCk7XG4gIH07XG4gIFxuICAvKipcbiAgICogQ2FsbGVkIGJ5IEZsYXNoIHRvIG5vdGlmeSBXZWJTb2NrZXRzIGV2ZW50cyBhcmUgZmlyZWQuXG4gICAqL1xuICBXZWJTb2NrZXQuX19vbkZsYXNoRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gR2V0cyBldmVudHMgdXNpbmcgcmVjZWl2ZUV2ZW50cygpIGluc3RlYWQgb2YgZ2V0dGluZyBpdCBmcm9tIGV2ZW50IG9iamVjdFxuICAgICAgICAvLyBvZiBGbGFzaCBldmVudC4gVGhpcyBpcyB0byBtYWtlIHN1cmUgdG8ga2VlcCBtZXNzYWdlIG9yZGVyLlxuICAgICAgICAvLyBJdCBzZWVtcyBzb21ldGltZXMgRmxhc2ggZXZlbnRzIGRvbid0IGFycml2ZSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGV5IGFyZSBzZW50LlxuICAgICAgICB2YXIgZXZlbnRzID0gV2ViU29ja2V0Ll9fZmxhc2gucmVjZWl2ZUV2ZW50cygpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIFdlYlNvY2tldC5fX2luc3RhbmNlc1tldmVudHNbaV0ud2ViU29ja2V0SWRdLl9faGFuZGxlRXZlbnQoZXZlbnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgICAgfVxuICAgIH0sIDApO1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuICBcbiAgLy8gQ2FsbGVkIGJ5IEZsYXNoLlxuICBXZWJTb2NrZXQuX19sb2cgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc29sZS5sb2coZGVjb2RlVVJJQ29tcG9uZW50KG1lc3NhZ2UpKTtcbiAgfTtcbiAgXG4gIC8vIENhbGxlZCBieSBGbGFzaC5cbiAgV2ViU29ja2V0Ll9fZXJyb3IgPSBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgY29uc29sZS5lcnJvcihkZWNvZGVVUklDb21wb25lbnQobWVzc2FnZSkpO1xuICB9O1xuICBcbiAgV2ViU29ja2V0Ll9fYWRkVGFzayA9IGZ1bmN0aW9uKHRhc2spIHtcbiAgICBpZiAoV2ViU29ja2V0Ll9fZmxhc2gpIHtcbiAgICAgIHRhc2soKTtcbiAgICB9IGVsc2Uge1xuICAgICAgV2ViU29ja2V0Ll9fdGFza3MucHVzaCh0YXNrKTtcbiAgICB9XG4gIH07XG4gIFxuICAvKipcbiAgICogVGVzdCBpZiB0aGUgYnJvd3NlciBpcyBydW5uaW5nIGZsYXNoIGxpdGUuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgZmxhc2ggbGl0ZSBpcyBydW5uaW5nLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqL1xuICBXZWJTb2NrZXQuX19pc0ZsYXNoTGl0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghd2luZG93Lm5hdmlnYXRvciB8fCAhd2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIG1pbWVUeXBlID0gd2luZG93Lm5hdmlnYXRvci5taW1lVHlwZXNbXCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiXTtcbiAgICBpZiAoIW1pbWVUeXBlIHx8ICFtaW1lVHlwZS5lbmFibGVkUGx1Z2luIHx8ICFtaW1lVHlwZS5lbmFibGVkUGx1Z2luLmZpbGVuYW1lKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBtaW1lVHlwZS5lbmFibGVkUGx1Z2luLmZpbGVuYW1lLm1hdGNoKC9mbGFzaGxpdGUvaSkgPyB0cnVlIDogZmFsc2U7XG4gIH07XG4gIFxuICBpZiAoIXdpbmRvdy5XRUJfU09DS0VUX0RJU0FCTEVfQVVUT19JTklUSUFMSVpBVElPTikge1xuICAgIGlmICh3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIFdlYlNvY2tldC5fX2luaXRpYWxpemUoKTtcbiAgICAgIH0sIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25sb2FkXCIsIGZ1bmN0aW9uKCl7XG4gICAgICAgIFdlYlNvY2tldC5fX2luaXRpYWxpemUoKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBcbn0pKCk7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvLCBnbG9iYWwpIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBleHBvcnRzLlhIUiA9IFhIUjtcblxuICAvKipcbiAgICogWEhSIGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBjb3N0cnVjdG9yXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIGZ1bmN0aW9uIFhIUiAoc29ja2V0KSB7XG4gICAgaWYgKCFzb2NrZXQpIHJldHVybjtcblxuICAgIGlvLlRyYW5zcG9ydC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuc2VuZEJ1ZmZlciA9IFtdO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFRyYW5zcG9ydC5cbiAgICovXG5cbiAgaW8udXRpbC5pbmhlcml0KFhIUiwgaW8uVHJhbnNwb3J0KTtcblxuICAvKipcbiAgICogRXN0YWJsaXNoIGEgY29ubmVjdGlvblxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFIucHJvdG90eXBlLm9wZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5zb2NrZXQuc2V0QnVmZmVyKGZhbHNlKTtcbiAgICB0aGlzLm9uT3BlbigpO1xuICAgIHRoaXMuZ2V0KCk7XG5cbiAgICAvLyB3ZSBuZWVkIHRvIG1ha2Ugc3VyZSB0aGUgcmVxdWVzdCBzdWNjZWVkcyBzaW5jZSB3ZSBoYXZlIG5vIGluZGljYXRpb25cbiAgICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IG9wZW5lZCBvciBub3QgdW50aWwgaXQgc3VjY2VlZGVkLlxuICAgIHRoaXMuc2V0Q2xvc2VUaW1lb3V0KCk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgd2UgbmVlZCB0byBzZW5kIGRhdGEgdG8gdGhlIFNvY2tldC5JTyBzZXJ2ZXIsIGlmIHdlIGhhdmUgZGF0YSBpbiBvdXJcbiAgICogYnVmZmVyIHdlIGVuY29kZSBpdCBhbmQgZm9yd2FyZCBpdCB0byB0aGUgYHBvc3RgIG1ldGhvZC5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFhIUi5wcm90b3R5cGUucGF5bG9hZCA9IGZ1bmN0aW9uIChwYXlsb2FkKSB7XG4gICAgdmFyIG1zZ3MgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwLCBsID0gcGF5bG9hZC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIG1zZ3MucHVzaChpby5wYXJzZXIuZW5jb2RlUGFja2V0KHBheWxvYWRbaV0pKTtcbiAgICB9XG5cbiAgICB0aGlzLnNlbmQoaW8ucGFyc2VyLmVuY29kZVBheWxvYWQobXNncykpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTZW5kIGRhdGEgdG8gdGhlIFNvY2tldC5JTyBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhIFRoZSBtZXNzYWdlXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFhIUi5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdGhpcy5wb3N0KGRhdGEpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBQb3N0cyBhIGVuY29kZWQgbWVzc2FnZSB0byB0aGUgU29ja2V0LklPIHNlcnZlci5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGRhdGEgQSBlbmNvZGVkIG1lc3NhZ2UuXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBmdW5jdGlvbiBlbXB0eSAoKSB7IH07XG5cbiAgWEhSLnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5zb2NrZXQuc2V0QnVmZmVyKHRydWUpO1xuXG4gICAgZnVuY3Rpb24gc3RhdGVDaGFuZ2UgKCkge1xuICAgICAgaWYgKHRoaXMucmVhZHlTdGF0ZSA9PSA0KSB7XG4gICAgICAgIHRoaXMub25yZWFkeXN0YXRlY2hhbmdlID0gZW1wdHk7XG4gICAgICAgIHNlbGYucG9zdGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApe1xuICAgICAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcihmYWxzZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2VsZi5vbkNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvbmxvYWQgKCkge1xuICAgICAgdGhpcy5vbmxvYWQgPSBlbXB0eTtcbiAgICAgIHNlbGYuc29ja2V0LnNldEJ1ZmZlcihmYWxzZSk7XG4gICAgfTtcblxuICAgIHRoaXMuc2VuZFhIUiA9IHRoaXMucmVxdWVzdCgnUE9TVCcpO1xuXG4gICAgaWYgKGdsb2JhbC5YRG9tYWluUmVxdWVzdCAmJiB0aGlzLnNlbmRYSFIgaW5zdGFuY2VvZiBYRG9tYWluUmVxdWVzdCkge1xuICAgICAgdGhpcy5zZW5kWEhSLm9ubG9hZCA9IHRoaXMuc2VuZFhIUi5vbmVycm9yID0gb25sb2FkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNlbmRYSFIub25yZWFkeXN0YXRlY2hhbmdlID0gc3RhdGVDaGFuZ2U7XG4gICAgfVxuXG4gICAgdGhpcy5zZW5kWEhSLnNlbmQoZGF0YSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBlc3RhYmxpc2hlZCBgWEhSYCBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFIucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub25DbG9zZSgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYSBjb25maWd1cmVkIFhIUiByZXF1ZXN0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIHVybCB0aGF0IG5lZWRzIHRvIGJlIHJlcXVlc3RlZC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBUaGUgbWV0aG9kIHRoZSByZXF1ZXN0IHNob3VsZCB1c2UuXG4gICAqIEByZXR1cm5zIHtYTUxIdHRwUmVxdWVzdH1cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIFhIUi5wcm90b3R5cGUucmVxdWVzdCA9IGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICB2YXIgcmVxID0gaW8udXRpbC5yZXF1ZXN0KHRoaXMuc29ja2V0LmlzWERvbWFpbigpKVxuICAgICAgLCBxdWVyeSA9IGlvLnV0aWwucXVlcnkodGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeSwgJ3Q9JyArICtuZXcgRGF0ZSk7XG5cbiAgICByZXEub3BlbihtZXRob2QgfHwgJ0dFVCcsIHRoaXMucHJlcGFyZVVybCgpICsgcXVlcnksIHRydWUpO1xuXG4gICAgaWYgKG1ldGhvZCA9PSAnUE9TVCcpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChyZXEuc2V0UmVxdWVzdEhlYWRlcikge1xuICAgICAgICAgIHJlcS5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gWERvbWFpblJlcXVlc3RcbiAgICAgICAgICByZXEuY29udGVudFR5cGUgPSAndGV4dC9wbGFpbic7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlcTtcbiAgfTtcblxuICAvKipcbiAgICogUmV0dXJucyB0aGUgc2NoZW1lIHRvIHVzZSBmb3IgdGhlIHRyYW5zcG9ydCBVUkxzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgWEhSLnByb3RvdHlwZS5zY2hlbWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc29ja2V0Lm9wdGlvbnMuc2VjdXJlID8gJ2h0dHBzJyA6ICdodHRwJztcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIFhIUiB0cmFuc3BvcnRzIGFyZSBzdXBwb3J0ZWRcbiAgICpcbiAgICogQHBhcmFtIHtCb29sZWFufSB4ZG9tYWluIENoZWNrIGlmIHdlIHN1cHBvcnQgY3Jvc3MgZG9tYWluIHJlcXVlc3RzLlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWEhSLmNoZWNrID0gZnVuY3Rpb24gKHNvY2tldCwgeGRvbWFpbikge1xuICAgIHRyeSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IGlvLnV0aWwucmVxdWVzdCh4ZG9tYWluKSxcbiAgICAgICAgICB1c2VzWERvbVJlcSA9IChnbG9iYWwuWERvbWFpblJlcXVlc3QgJiYgcmVxdWVzdCBpbnN0YW5jZW9mIFhEb21haW5SZXF1ZXN0KSxcbiAgICAgICAgICBzb2NrZXRQcm90b2NvbCA9IChzb2NrZXQgJiYgc29ja2V0Lm9wdGlvbnMgJiYgc29ja2V0Lm9wdGlvbnMuc2VjdXJlID8gJ2h0dHBzOicgOiAnaHR0cDonKSxcbiAgICAgICAgICBpc1hQcm90b2NvbCA9IChnbG9iYWwubG9jYXRpb24gJiYgc29ja2V0UHJvdG9jb2wgIT0gZ2xvYmFsLmxvY2F0aW9uLnByb3RvY29sKTtcbiAgICAgIGlmIChyZXF1ZXN0ICYmICEodXNlc1hEb21SZXEgJiYgaXNYUHJvdG9jb2wpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge31cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgdGhlIFhIUiB0cmFuc3BvcnQgc3VwcG9ydHMgY3Jvc3MgZG9tYWluIHJlcXVlc3RzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgWEhSLnhkb21haW5DaGVjayA9IGZ1bmN0aW9uIChzb2NrZXQpIHtcbiAgICByZXR1cm4gWEhSLmNoZWNrKHNvY2tldCwgdHJ1ZSk7XG4gIH07XG5cbn0pKFxuICAgICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvLlRyYW5zcG9ydCA6IG1vZHVsZS5leHBvcnRzXG4gICwgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8gOiBtb2R1bGUucGFyZW50LmV4cG9ydHNcbiAgLCB0aGlzXG4pO1xuLyoqXG4gKiBzb2NrZXQuaW9cbiAqIENvcHlyaWdodChjKSAyMDExIExlYXJuQm9vc3QgPGRldkBsZWFybmJvb3N0LmNvbT5cbiAqIE1JVCBMaWNlbnNlZFxuICovXG5cbihmdW5jdGlvbiAoZXhwb3J0cywgaW8pIHtcblxuICAvKipcbiAgICogRXhwb3NlIGNvbnN0cnVjdG9yLlxuICAgKi9cblxuICBleHBvcnRzLmh0bWxmaWxlID0gSFRNTEZpbGU7XG5cbiAgLyoqXG4gICAqIFRoZSBIVE1MRmlsZSB0cmFuc3BvcnQgY3JlYXRlcyBhIGBmb3JldmVyIGlmcmFtZWAgYmFzZWQgdHJhbnNwb3J0XG4gICAqIGZvciBJbnRlcm5ldCBFeHBsb3Jlci4gUmVndWxhciBmb3JldmVyIGlmcmFtZSBpbXBsZW1lbnRhdGlvbnMgd2lsbCBcbiAgICogY29udGludW91c2x5IHRyaWdnZXIgdGhlIGJyb3dzZXJzIGJ1enkgaW5kaWNhdG9ycy4gSWYgdGhlIGZvcmV2ZXIgaWZyYW1lXG4gICAqIGlzIGNyZWF0ZWQgaW5zaWRlIGEgYGh0bWxmaWxlYCB0aGVzZSBpbmRpY2F0b3JzIHdpbGwgbm90IGJlIHRyaWdnZWQuXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAZXh0ZW5kcyB7aW8uVHJhbnNwb3J0LlhIUn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gSFRNTEZpbGUgKHNvY2tldCkge1xuICAgIGlvLlRyYW5zcG9ydC5YSFIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcblxuICAvKipcbiAgICogSW5oZXJpdHMgZnJvbSBYSFIgdHJhbnNwb3J0LlxuICAgKi9cblxuICBpby51dGlsLmluaGVyaXQoSFRNTEZpbGUsIGlvLlRyYW5zcG9ydC5YSFIpO1xuXG4gIC8qKlxuICAgKiBUcmFuc3BvcnQgbmFtZVxuICAgKlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBIVE1MRmlsZS5wcm90b3R5cGUubmFtZSA9ICdodG1sZmlsZSc7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgQWMuLi5lWCBgaHRtbGZpbGVgIHdpdGggYSBmb3JldmVyIGxvYWRpbmcgaWZyYW1lXG4gICAqIHRoYXQgY2FuIGJlIHVzZWQgdG8gbGlzdGVuIHRvIG1lc3NhZ2VzLiBJbnNpZGUgdGhlIGdlbmVyYXRlZFxuICAgKiBgaHRtbGZpbGVgIGEgcmVmZXJlbmNlIHdpbGwgYmUgbWFkZSB0byB0aGUgSFRNTEZpbGUgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgSFRNTEZpbGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmRvYyA9IG5ldyB3aW5kb3dbKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpXSgnaHRtbGZpbGUnKTtcbiAgICB0aGlzLmRvYy5vcGVuKCk7XG4gICAgdGhpcy5kb2Mud3JpdGUoJzxodG1sPjwvaHRtbD4nKTtcbiAgICB0aGlzLmRvYy5jbG9zZSgpO1xuICAgIHRoaXMuZG9jLnBhcmVudFdpbmRvdy5zID0gdGhpcztcblxuICAgIHZhciBpZnJhbWVDID0gdGhpcy5kb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaWZyYW1lQy5jbGFzc05hbWUgPSAnc29ja2V0aW8nO1xuXG4gICAgdGhpcy5kb2MuYm9keS5hcHBlbmRDaGlsZChpZnJhbWVDKTtcbiAgICB0aGlzLmlmcmFtZSA9IHRoaXMuZG9jLmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuXG4gICAgaWZyYW1lQy5hcHBlbmRDaGlsZCh0aGlzLmlmcmFtZSk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXNcbiAgICAgICwgcXVlcnkgPSBpby51dGlsLnF1ZXJ5KHRoaXMuc29ja2V0Lm9wdGlvbnMucXVlcnksICd0PScrICtuZXcgRGF0ZSk7XG5cbiAgICB0aGlzLmlmcmFtZS5zcmMgPSB0aGlzLnByZXBhcmVVcmwoKSArIHF1ZXJ5O1xuXG4gICAgaW8udXRpbC5vbih3aW5kb3csICd1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBzZWxmLmRlc3Ryb3koKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogVGhlIFNvY2tldC5JTyBzZXJ2ZXIgd2lsbCB3cml0ZSBzY3JpcHQgdGFncyBpbnNpZGUgdGhlIGZvcmV2ZXJcbiAgICogaWZyYW1lLCB0aGlzIGZ1bmN0aW9uIHdpbGwgYmUgdXNlZCBhcyBjYWxsYmFjayBmb3IgdGhlIGluY29taW5nXG4gICAqIGluZm9ybWF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBUaGUgbWVzc2FnZVxuICAgKiBAcGFyYW0ge2RvY3VtZW50fSBkb2MgUmVmZXJlbmNlIHRvIHRoZSBjb250ZXh0XG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBIVE1MRmlsZS5wcm90b3R5cGUuXyA9IGZ1bmN0aW9uIChkYXRhLCBkb2MpIHtcbiAgICAvLyB1bmVzY2FwZSBhbGwgZm9yd2FyZCBzbGFzaGVzLiBzZWUgR0gtMTI1MVxuICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UoL1xcXFxcXC8vZywgJy8nKTtcbiAgICB0aGlzLm9uRGF0YShkYXRhKTtcbiAgICB0cnkge1xuICAgICAgdmFyIHNjcmlwdCA9IGRvYy5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgIH0gY2F0Y2ggKGUpIHsgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBEZXN0cm95IHRoZSBlc3RhYmxpc2hlZCBjb25uZWN0aW9uLCBpZnJhbWUgYW5kIGBodG1sZmlsZWAuXG4gICAqIEFuZCBjYWxscyB0aGUgYENvbGxlY3RHYXJiYWdlYCBmdW5jdGlvbiBvZiBJbnRlcm5ldCBFeHBsb3JlclxuICAgKiB0byByZWxlYXNlIHRoZSBtZW1vcnkuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBIVE1MRmlsZS5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5pZnJhbWUpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5pZnJhbWUuc3JjID0gJ2Fib3V0OmJsYW5rJztcbiAgICAgIH0gY2F0Y2goZSl7fVxuXG4gICAgICB0aGlzLmRvYyA9IG51bGw7XG4gICAgICB0aGlzLmlmcmFtZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuaWZyYW1lKTtcbiAgICAgIHRoaXMuaWZyYW1lID0gbnVsbDtcblxuICAgICAgQ29sbGVjdEdhcmJhZ2UoKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBlc3RhYmxpc2hlZCBjb25uZWN0aW9uLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VHJhbnNwb3J0fSBDaGFpbmluZy5cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSFRNTEZpbGUucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZGVzdHJveSgpO1xuICAgIHJldHVybiBpby5UcmFuc3BvcnQuWEhSLnByb3RvdHlwZS5jbG9zZS5jYWxsKHRoaXMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhpcyB0cmFuc3BvcnQuIFRoZSBicm93c2VyXG4gICAqIG11c3QgaGF2ZSBhbiBgQWMuLi5lWE9iamVjdGAgaW1wbGVtZW50YXRpb24uXG4gICAqXG4gICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIEhUTUxGaWxlLmNoZWNrID0gZnVuY3Rpb24gKHNvY2tldCkge1xuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9IFwidW5kZWZpbmVkXCIgJiYgKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpIGluIHdpbmRvdyl7XG4gICAgICB0cnkge1xuICAgICAgICB2YXIgYSA9IG5ldyB3aW5kb3dbKFsnQWN0aXZlJ10uY29uY2F0KCdPYmplY3QnKS5qb2luKCdYJykpXSgnaHRtbGZpbGUnKTtcbiAgICAgICAgcmV0dXJuIGEgJiYgaW8uVHJhbnNwb3J0LlhIUi5jaGVjayhzb2NrZXQpO1xuICAgICAgfSBjYXRjaChlKXt9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvKipcbiAgICogQ2hlY2sgaWYgY3Jvc3MgZG9tYWluIHJlcXVlc3RzIGFyZSBzdXBwb3J0ZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBIVE1MRmlsZS54ZG9tYWluQ2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gd2UgY2FuIHByb2JhYmx5IGRvIGhhbmRsaW5nIGZvciBzdWItZG9tYWlucywgd2Ugc2hvdWxkXG4gICAgLy8gdGVzdCB0aGF0IGl0J3MgY3Jvc3MgZG9tYWluIGJ1dCBhIHN1YmRvbWFpbiBoZXJlXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9O1xuXG4gIC8qKlxuICAgKiBBZGQgdGhlIHRyYW5zcG9ydCB0byB5b3VyIHB1YmxpYyBpby50cmFuc3BvcnRzIGFycmF5LlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgaW8udHJhbnNwb3J0cy5wdXNoKCdodG1sZmlsZScpO1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpby5UcmFuc3BvcnQgOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4pO1xuXG4vKipcbiAqIHNvY2tldC5pb1xuICogQ29weXJpZ2h0KGMpIDIwMTEgTGVhcm5Cb29zdCA8ZGV2QGxlYXJuYm9vc3QuY29tPlxuICogTUlUIExpY2Vuc2VkXG4gKi9cblxuKGZ1bmN0aW9uIChleHBvcnRzLCBpbywgZ2xvYmFsKSB7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0c1sneGhyLXBvbGxpbmcnXSA9IFhIUlBvbGxpbmc7XG5cbiAgLyoqXG4gICAqIFRoZSBYSFItcG9sbGluZyB0cmFuc3BvcnQgdXNlcyBsb25nIHBvbGxpbmcgWEhSIHJlcXVlc3RzIHRvIGNyZWF0ZSBhXG4gICAqIFwicGVyc2lzdGVudFwiIGNvbm5lY3Rpb24gd2l0aCB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgZnVuY3Rpb24gWEhSUG9sbGluZyAoKSB7XG4gICAgaW8uVHJhbnNwb3J0LlhIUi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFhIUiB0cmFuc3BvcnQuXG4gICAqL1xuXG4gIGlvLnV0aWwuaW5oZXJpdChYSFJQb2xsaW5nLCBpby5UcmFuc3BvcnQuWEhSKTtcblxuICAvKipcbiAgICogTWVyZ2UgdGhlIHByb3BlcnRpZXMgZnJvbSBYSFIgdHJhbnNwb3J0XG4gICAqL1xuXG4gIGlvLnV0aWwubWVyZ2UoWEhSUG9sbGluZywgaW8uVHJhbnNwb3J0LlhIUik7XG5cbiAgLyoqXG4gICAqIFRyYW5zcG9ydCBuYW1lXG4gICAqXG4gICAqIEBhcGkgcHVibGljXG4gICAqL1xuXG4gIFhIUlBvbGxpbmcucHJvdG90eXBlLm5hbWUgPSAneGhyLXBvbGxpbmcnO1xuXG4gIC8qKlxuICAgKiBJbmRpY2F0ZXMgd2hldGhlciBoZWFydGJlYXRzIGlzIGVuYWJsZWQgZm9yIHRoaXMgdHJhbnNwb3J0XG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBYSFJQb2xsaW5nLnByb3RvdHlwZS5oZWFydGJlYXRzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfTtcblxuICAvKiogXG4gICAqIEVzdGFibGlzaCBhIGNvbm5lY3Rpb24sIGZvciBpUGhvbmUgYW5kIEFuZHJvaWQgdGhpcyB3aWxsIGJlIGRvbmUgb25jZSB0aGUgcGFnZVxuICAgKiBpcyBsb2FkZWQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtUcmFuc3BvcnR9IENoYWluaW5nLlxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBYSFJQb2xsaW5nLnByb3RvdHlwZS5vcGVuID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlvLlRyYW5zcG9ydC5YSFIucHJvdG90eXBlLm9wZW4uY2FsbChzZWxmKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH07XG5cbiAgLyoqXG4gICAqIFN0YXJ0cyBhIFhIUiByZXF1ZXN0IHRvIHdhaXQgZm9yIGluY29taW5nIG1lc3NhZ2VzLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgZnVuY3Rpb24gZW1wdHkgKCkge307XG5cbiAgWEhSUG9sbGluZy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIGlmICghdGhpcy5pc09wZW4pIHJldHVybjtcblxuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGZ1bmN0aW9uIHN0YXRlQ2hhbmdlICgpIHtcbiAgICAgIGlmICh0aGlzLnJlYWR5U3RhdGUgPT0gNCkge1xuICAgICAgICB0aGlzLm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGVtcHR5O1xuXG4gICAgICAgIGlmICh0aGlzLnN0YXR1cyA9PSAyMDApIHtcbiAgICAgICAgICBzZWxmLm9uRGF0YSh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICAgICAgc2VsZi5nZXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZWxmLm9uQ2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBvbmxvYWQgKCkge1xuICAgICAgdGhpcy5vbmxvYWQgPSBlbXB0eTtcbiAgICAgIHRoaXMub25lcnJvciA9IGVtcHR5O1xuICAgICAgc2VsZi5yZXRyeUNvdW50ZXIgPSAxO1xuICAgICAgc2VsZi5vbkRhdGEodGhpcy5yZXNwb25zZVRleHQpO1xuICAgICAgc2VsZi5nZXQoKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gb25lcnJvciAoKSB7XG4gICAgICBzZWxmLnJldHJ5Q291bnRlciArKztcbiAgICAgIGlmKCFzZWxmLnJldHJ5Q291bnRlciB8fCBzZWxmLnJldHJ5Q291bnRlciA+IDMpIHtcbiAgICAgICAgc2VsZi5vbkNsb3NlKCk7ICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuZ2V0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMueGhyID0gdGhpcy5yZXF1ZXN0KCk7XG5cbiAgICBpZiAoZ2xvYmFsLlhEb21haW5SZXF1ZXN0ICYmIHRoaXMueGhyIGluc3RhbmNlb2YgWERvbWFpblJlcXVlc3QpIHtcbiAgICAgIHRoaXMueGhyLm9ubG9hZCA9IG9ubG9hZDtcbiAgICAgIHRoaXMueGhyLm9uZXJyb3IgPSBvbmVycm9yO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnhoci5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBzdGF0ZUNoYW5nZTtcbiAgICB9XG5cbiAgICB0aGlzLnhoci5zZW5kKG51bGwpO1xuICB9O1xuXG4gIC8qKlxuICAgKiBIYW5kbGUgdGhlIHVuY2xlYW4gY2xvc2UgYmVoYXZpb3IuXG4gICAqXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBYSFJQb2xsaW5nLnByb3RvdHlwZS5vbkNsb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIGlvLlRyYW5zcG9ydC5YSFIucHJvdG90eXBlLm9uQ2xvc2UuY2FsbCh0aGlzKTtcblxuICAgIGlmICh0aGlzLnhocikge1xuICAgICAgdGhpcy54aHIub25yZWFkeXN0YXRlY2hhbmdlID0gdGhpcy54aHIub25sb2FkID0gdGhpcy54aHIub25lcnJvciA9IGVtcHR5O1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy54aHIuYWJvcnQoKTtcbiAgICAgIH0gY2F0Y2goZSl7fVxuICAgICAgdGhpcy54aHIgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogV2Via2l0IGJhc2VkIGJyb3dzZXJzIHNob3cgYSBpbmZpbml0IHNwaW5uZXIgd2hlbiB5b3Ugc3RhcnQgYSBYSFIgcmVxdWVzdFxuICAgKiBiZWZvcmUgdGhlIGJyb3dzZXJzIG9ubG9hZCBldmVudCBpcyBjYWxsZWQgc28gd2UgbmVlZCB0byBkZWZlciBvcGVuaW5nIG9mXG4gICAqIHRoZSB0cmFuc3BvcnQgdW50aWwgdGhlIG9ubG9hZCBldmVudCBpcyBjYWxsZWQuIFdyYXBwaW5nIHRoZSBjYiBpbiBvdXJcbiAgICogZGVmZXIgbWV0aG9kIHNvbHZlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7U29ja2V0fSBzb2NrZXQgVGhlIHNvY2tldCBpbnN0YW5jZSB0aGF0IG5lZWRzIGEgdHJhbnNwb3J0XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBjYWxsYmFja1xuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgWEhSUG9sbGluZy5wcm90b3R5cGUucmVhZHkgPSBmdW5jdGlvbiAoc29ja2V0LCBmbikge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIGlvLnV0aWwuZGVmZXIoZnVuY3Rpb24gKCkge1xuICAgICAgZm4uY2FsbChzZWxmKTtcbiAgICB9KTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIHRoZSB0cmFuc3BvcnQgdG8geW91ciBwdWJsaWMgaW8udHJhbnNwb3J0cyBhcnJheS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLnRyYW5zcG9ydHMucHVzaCgneGhyLXBvbGxpbmcnKTtcblxufSkoXG4gICAgJ3VuZGVmaW5lZCcgIT0gdHlwZW9mIGlvID8gaW8uVHJhbnNwb3J0IDogbW9kdWxlLmV4cG9ydHNcbiAgLCAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpbyA6IG1vZHVsZS5wYXJlbnQuZXhwb3J0c1xuICAsIHRoaXNcbik7XG5cbi8qKlxuICogc29ja2V0LmlvXG4gKiBDb3B5cmlnaHQoYykgMjAxMSBMZWFybkJvb3N0IDxkZXZAbGVhcm5ib29zdC5jb20+XG4gKiBNSVQgTGljZW5zZWRcbiAqL1xuXG4oZnVuY3Rpb24gKGV4cG9ydHMsIGlvLCBnbG9iYWwpIHtcbiAgLyoqXG4gICAqIFRoZXJlIGlzIGEgd2F5IHRvIGhpZGUgdGhlIGxvYWRpbmcgaW5kaWNhdG9yIGluIEZpcmVmb3guIElmIHlvdSBjcmVhdGUgYW5kXG4gICAqIHJlbW92ZSBhIGlmcmFtZSBpdCB3aWxsIHN0b3Agc2hvd2luZyB0aGUgY3VycmVudCBsb2FkaW5nIGluZGljYXRvci5cbiAgICogVW5mb3J0dW5hdGVseSB3ZSBjYW4ndCBmZWF0dXJlIGRldGVjdCB0aGF0IGFuZCBVQSBzbmlmZmluZyBpcyBldmlsLlxuICAgKlxuICAgKiBAYXBpIHByaXZhdGVcbiAgICovXG5cbiAgdmFyIGluZGljYXRvciA9IGdsb2JhbC5kb2N1bWVudCAmJiBcIk1vekFwcGVhcmFuY2VcIiBpblxuICAgIGdsb2JhbC5kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cbiAgLyoqXG4gICAqIEV4cG9zZSBjb25zdHJ1Y3Rvci5cbiAgICovXG5cbiAgZXhwb3J0c1snanNvbnAtcG9sbGluZyddID0gSlNPTlBQb2xsaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgSlNPTlAgdHJhbnNwb3J0IGNyZWF0ZXMgYW4gcGVyc2lzdGVudCBjb25uZWN0aW9uIGJ5IGR5bmFtaWNhbGx5XG4gICAqIGluc2VydGluZyBhIHNjcmlwdCB0YWcgaW4gdGhlIHBhZ2UuIFRoaXMgc2NyaXB0IHRhZyB3aWxsIHJlY2VpdmUgdGhlXG4gICAqIGluZm9ybWF0aW9uIG9mIHRoZSBTb2NrZXQuSU8gc2VydmVyLiBXaGVuIG5ldyBpbmZvcm1hdGlvbiBpcyByZWNlaXZlZFxuICAgKiBpdCBjcmVhdGVzIGEgbmV3IHNjcmlwdCB0YWcgZm9yIHRoZSBuZXcgZGF0YSBzdHJlYW0uXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAZXh0ZW5kcyB7aW8uVHJhbnNwb3J0Lnhoci1wb2xsaW5nfVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBmdW5jdGlvbiBKU09OUFBvbGxpbmcgKHNvY2tldCkge1xuICAgIGlvLlRyYW5zcG9ydFsneGhyLXBvbGxpbmcnXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgdGhpcy5pbmRleCA9IGlvLmoubGVuZ3RoO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuXG4gICAgaW8uai5wdXNoKGZ1bmN0aW9uIChtc2cpIHtcbiAgICAgIHNlbGYuXyhtc2cpO1xuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBJbmhlcml0cyBmcm9tIFhIUiBwb2xsaW5nIHRyYW5zcG9ydC5cbiAgICovXG5cbiAgaW8udXRpbC5pbmhlcml0KEpTT05QUG9sbGluZywgaW8uVHJhbnNwb3J0Wyd4aHItcG9sbGluZyddKTtcblxuICAvKipcbiAgICogVHJhbnNwb3J0IG5hbWVcbiAgICpcbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSlNPTlBQb2xsaW5nLnByb3RvdHlwZS5uYW1lID0gJ2pzb25wLXBvbGxpbmcnO1xuXG4gIC8qKlxuICAgKiBQb3N0cyBhIGVuY29kZWQgbWVzc2FnZSB0byB0aGUgU29ja2V0LklPIHNlcnZlciB1c2luZyBhbiBpZnJhbWUuXG4gICAqIFRoZSBpZnJhbWUgaXMgdXNlZCBiZWNhdXNlIHNjcmlwdCB0YWdzIGNhbiBjcmVhdGUgUE9TVCBiYXNlZCByZXF1ZXN0cy5cbiAgICogVGhlIGlmcmFtZSBpcyBwb3NpdGlvbmVkIG91dHNpZGUgb2YgdGhlIHZpZXcgc28gdGhlIHVzZXIgZG9lcyBub3RcbiAgICogbm90aWNlIGl0J3MgZXhpc3RlbmNlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGF0YSBBIGVuY29kZWQgbWVzc2FnZS5cbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEpTT05QUG9sbGluZy5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzXG4gICAgICAsIHF1ZXJ5ID0gaW8udXRpbC5xdWVyeShcbiAgICAgICAgICAgICB0aGlzLnNvY2tldC5vcHRpb25zLnF1ZXJ5XG4gICAgICAgICAgLCAndD0nKyAoK25ldyBEYXRlKSArICcmaT0nICsgdGhpcy5pbmRleFxuICAgICAgICApO1xuXG4gICAgaWYgKCF0aGlzLmZvcm0pIHtcbiAgICAgIHZhciBmb3JtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZm9ybScpXG4gICAgICAgICwgYXJlYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RleHRhcmVhJylcbiAgICAgICAgLCBpZCA9IHRoaXMuaWZyYW1lSWQgPSAnc29ja2V0aW9faWZyYW1lXycgKyB0aGlzLmluZGV4XG4gICAgICAgICwgaWZyYW1lO1xuXG4gICAgICBmb3JtLmNsYXNzTmFtZSA9ICdzb2NrZXRpbyc7XG4gICAgICBmb3JtLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIGZvcm0uc3R5bGUudG9wID0gJzBweCc7XG4gICAgICBmb3JtLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICAgIGZvcm0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGZvcm0udGFyZ2V0ID0gaWQ7XG4gICAgICBmb3JtLm1ldGhvZCA9ICdQT1NUJztcbiAgICAgIGZvcm0uc2V0QXR0cmlidXRlKCdhY2NlcHQtY2hhcnNldCcsICd1dGYtOCcpO1xuICAgICAgYXJlYS5uYW1lID0gJ2QnO1xuICAgICAgZm9ybS5hcHBlbmRDaGlsZChhcmVhKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZm9ybSk7XG5cbiAgICAgIHRoaXMuZm9ybSA9IGZvcm07XG4gICAgICB0aGlzLmFyZWEgPSBhcmVhO1xuICAgIH1cblxuICAgIHRoaXMuZm9ybS5hY3Rpb24gPSB0aGlzLnByZXBhcmVVcmwoKSArIHF1ZXJ5O1xuXG4gICAgZnVuY3Rpb24gY29tcGxldGUgKCkge1xuICAgICAgaW5pdElmcmFtZSgpO1xuICAgICAgc2VsZi5zb2NrZXQuc2V0QnVmZmVyKGZhbHNlKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaW5pdElmcmFtZSAoKSB7XG4gICAgICBpZiAoc2VsZi5pZnJhbWUpIHtcbiAgICAgICAgc2VsZi5mb3JtLnJlbW92ZUNoaWxkKHNlbGYuaWZyYW1lKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gaWU2IGR5bmFtaWMgaWZyYW1lcyB3aXRoIHRhcmdldD1cIlwiIHN1cHBvcnQgKHRoYW5rcyBDaHJpcyBMYW1iYWNoZXIpXG4gICAgICAgIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJzxpZnJhbWUgbmFtZT1cIicrIHNlbGYuaWZyYW1lSWQgKydcIj4nKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgaWZyYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaWZyYW1lJyk7XG4gICAgICAgIGlmcmFtZS5uYW1lID0gc2VsZi5pZnJhbWVJZDtcbiAgICAgIH1cblxuICAgICAgaWZyYW1lLmlkID0gc2VsZi5pZnJhbWVJZDtcblxuICAgICAgc2VsZi5mb3JtLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICBzZWxmLmlmcmFtZSA9IGlmcmFtZTtcbiAgICB9O1xuXG4gICAgaW5pdElmcmFtZSgpO1xuXG4gICAgLy8gd2UgdGVtcG9yYXJpbHkgc3RyaW5naWZ5IHVudGlsIHdlIGZpZ3VyZSBvdXQgaG93IHRvIHByZXZlbnRcbiAgICAvLyBicm93c2VycyBmcm9tIHR1cm5pbmcgYFxcbmAgaW50byBgXFxyXFxuYCBpbiBmb3JtIGlucHV0c1xuICAgIHRoaXMuYXJlYS52YWx1ZSA9IGlvLkpTT04uc3RyaW5naWZ5KGRhdGEpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuZm9ybS5zdWJtaXQoKTtcbiAgICB9IGNhdGNoKGUpIHt9XG5cbiAgICBpZiAodGhpcy5pZnJhbWUuYXR0YWNoRXZlbnQpIHtcbiAgICAgIGlmcmFtZS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzZWxmLmlmcmFtZS5yZWFkeVN0YXRlID09ICdjb21wbGV0ZScpIHtcbiAgICAgICAgICBjb21wbGV0ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlmcmFtZS5vbmxvYWQgPSBjb21wbGV0ZTtcbiAgICB9XG5cbiAgICB0aGlzLnNvY2tldC5zZXRCdWZmZXIodHJ1ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBuZXcgSlNPTlAgcG9sbCB0aGF0IGNhbiBiZSB1c2VkIHRvIGxpc3RlblxuICAgKiBmb3IgbWVzc2FnZXMgZnJvbSB0aGUgU29ja2V0LklPIHNlcnZlci5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIEpTT05QUG9sbGluZy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpc1xuICAgICAgLCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKVxuICAgICAgLCBxdWVyeSA9IGlvLnV0aWwucXVlcnkoXG4gICAgICAgICAgICAgdGhpcy5zb2NrZXQub3B0aW9ucy5xdWVyeVxuICAgICAgICAgICwgJ3Q9JysgKCtuZXcgRGF0ZSkgKyAnJmk9JyArIHRoaXMuaW5kZXhcbiAgICAgICAgKTtcblxuICAgIGlmICh0aGlzLnNjcmlwdCkge1xuICAgICAgdGhpcy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLnNjcmlwdCk7XG4gICAgICB0aGlzLnNjcmlwdCA9IG51bGw7XG4gICAgfVxuXG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQuc3JjID0gdGhpcy5wcmVwYXJlVXJsKCkgKyBxdWVyeTtcbiAgICBzY3JpcHQub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHNlbGYub25DbG9zZSgpO1xuICAgIH07XG5cbiAgICB2YXIgaW5zZXJ0QXQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07XG4gICAgaW5zZXJ0QXQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoc2NyaXB0LCBpbnNlcnRBdCk7XG4gICAgdGhpcy5zY3JpcHQgPSBzY3JpcHQ7XG5cbiAgICBpZiAoaW5kaWNhdG9yKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGlmcmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lmcmFtZScpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgICAgIH0sIDEwMCk7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBmdW5jdGlvbiBmb3IgdGhlIGluY29taW5nIG1lc3NhZ2Ugc3RyZWFtIGZyb20gdGhlIFNvY2tldC5JTyBzZXJ2ZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBkYXRhIFRoZSBtZXNzYWdlXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBKU09OUFBvbGxpbmcucHJvdG90eXBlLl8gPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgdGhpcy5vbkRhdGEobXNnKTtcbiAgICBpZiAodGhpcy5pc09wZW4pIHtcbiAgICAgIHRoaXMuZ2V0KCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBUaGUgaW5kaWNhdG9yIGhhY2sgb25seSB3b3JrcyBhZnRlciBvbmxvYWRcbiAgICpcbiAgICogQHBhcmFtIHtTb2NrZXR9IHNvY2tldCBUaGUgc29ja2V0IGluc3RhbmNlIHRoYXQgbmVlZHMgYSB0cmFuc3BvcnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGNhbGxiYWNrXG4gICAqIEBhcGkgcHJpdmF0ZVxuICAgKi9cblxuICBKU09OUFBvbGxpbmcucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24gKHNvY2tldCwgZm4pIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFpbmRpY2F0b3IpIHJldHVybiBmbi5jYWxsKHRoaXMpO1xuXG4gICAgaW8udXRpbC5sb2FkKGZ1bmN0aW9uICgpIHtcbiAgICAgIGZuLmNhbGwoc2VsZik7XG4gICAgfSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENoZWNrcyBpZiBicm93c2VyIHN1cHBvcnRzIHRoaXMgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgKiBAYXBpIHB1YmxpY1xuICAgKi9cblxuICBKU09OUFBvbGxpbmcuY2hlY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICdkb2N1bWVudCcgaW4gZ2xvYmFsO1xuICB9O1xuXG4gIC8qKlxuICAgKiBDaGVjayBpZiBjcm9zcyBkb21haW4gcmVxdWVzdHMgYXJlIHN1cHBvcnRlZFxuICAgKlxuICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICogQGFwaSBwdWJsaWNcbiAgICovXG5cbiAgSlNPTlBQb2xsaW5nLnhkb21haW5DaGVjayA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICAvKipcbiAgICogQWRkIHRoZSB0cmFuc3BvcnQgdG8geW91ciBwdWJsaWMgaW8udHJhbnNwb3J0cyBhcnJheS5cbiAgICpcbiAgICogQGFwaSBwcml2YXRlXG4gICAqL1xuXG4gIGlvLnRyYW5zcG9ydHMucHVzaCgnanNvbnAtcG9sbGluZycpO1xuXG59KShcbiAgICAndW5kZWZpbmVkJyAhPSB0eXBlb2YgaW8gPyBpby5UcmFuc3BvcnQgOiBtb2R1bGUuZXhwb3J0c1xuICAsICd1bmRlZmluZWQnICE9IHR5cGVvZiBpbyA/IGlvIDogbW9kdWxlLnBhcmVudC5leHBvcnRzXG4gICwgdGhpc1xuKTtcblxuaWYgKHR5cGVvZiBkZWZpbmUgPT09IFwiZnVuY3Rpb25cIiAmJiBkZWZpbmUuYW1kKSB7XG4gIGRlZmluZShbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gaW87IH0pO1xufVxufSkoKTsiLCJ2YXIgaW8gPSByZXF1aXJlKCdzb2NrZXQuaW8tY2xpZW50Jyk7XG52YXIgYnJvd3NlciA9IHJlcXVpcmUoJ2Jvd3NlcicpLmJyb3dzZXI7XG52YXIgaHRtbDJjYW52YXMgPSByZXF1aXJlKCcuL2xpYi9odG1sMmNhbnZhcycpO1xudmFyIGNhbnZhczJpbWFnZSA9IHJlcXVpcmUoJy4vbGliL2NhbnZhczJpbWFnZScpO1xuXG4vL3N1cHBvcnQgc29ja2V0LmlvIGpzb25wXG53aW5kb3cuaW8gPSBpbztcblxuZnVuY3Rpb24gQnJvd3Nlcm1hbihvcHRpb25zKSB7XG5cdHZhciBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblx0dGhpcy50eXBlID0gb3B0aW9ucy50eXBlIHx8ICdtb2NoYScsXG5cdHRoaXMuaW5zdGFuY2UgPSBvcHRpb25zLmluc3RhbmNlIHx8IG1vY2hhO1xuXHR0aGlzLnJlcG9ydGVyID0ge1xuXHRcdCdtb2NoYSc6IHJlcXVpcmUoJy4vcmVwb3J0ZXIvbW9jaGEnKSxcblx0XHQncGxhaW4nOiByZXF1aXJlKCcuL3JlcG9ydGVyL3BsYWluJylcblx0fVxufVxuXG5Ccm93c2VybWFuLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciBub2RlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jyb3dzZXJtYW4nKTtcblxuXHR2YXIgc2VydmVyID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VydmVyJyk7XG5cdHZhciBqb2JJZCA9IG5vZGUuZ2V0QXR0cmlidXRlKCdkYXRhLWpvYmlkJyk7XG5cdHZhciBzY3JlZW5zaG90ID0gbm9kZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2NyZWVuc2hvdCcpO1xuXG5cdHZhciBjb25uZWN0ZWQgPSBmYWxzZTtcblx0dmFyIGNvbXBsZXRlZCA9IGZhbHNlO1xuXG5cdHZhciBzZWxmID0gdGhpcztcblxuXHRpZiAoIWpvYklkKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gaW5pdCByZXBvcnRlclxuXHR2YXIgcmVzdWx0ID0ge1xuXHRcdGpvYklkOiBqb2JJZCxcblx0XHRicm93c2VyOiB7XG5cdFx0XHRuYW1lOiBicm93c2VyLm5hbWUudG9Mb3dlckNhc2UoKSxcblx0XHRcdHZlcnNpb246IGJyb3dzZXIudmVyc2lvbiArICcuMCcsXG5cdFx0XHRvczogZ2V0T1MoKVxuXHRcdH0sXG5cdFx0ZGF0YToge1xuXHRcdFx0cGFzc2VzOiBbXSxcblx0XHRcdGZhaWx1cmVzOiBbXVxuXHRcdH1cblx0fTtcblxuXHRzZWxmLnJlcG9ydGVyW3NlbGYudHlwZV0ucnVuKHtcblx0XHRpbnN0YW5jZTogc2VsZi5pbnN0YW5jZSxcblx0XHRwYXNzOiBmdW5jdGlvbihkYXRhKSB7XG5cdFx0XHRyZXN1bHQuZGF0YS5wYXNzZXMucHVzaChkYXRhKTtcblx0XHR9LFxuXHRcdGZhaWw6IGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRcdHJlc3VsdC5kYXRhLmZhaWx1cmVzLnB1c2goZGF0YSk7XG5cdFx0fSxcblx0XHRlbmQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0Y29tcGxldGVkID0gdHJ1ZTtcblx0XHR9XG5cdH0pO1xuXG5cdC8vIGNvbm5lY3QgdG8gc2VydmVyXG5cdHZhciBzb2NrZXQgPSBpby5jb25uZWN0KCdodHRwOi8vJyArIHNlcnZlciArICcvdGVzdGVyJyk7XG5cdHNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uKCkge1xuXHRcdGNvbm5lY3RlZCA9IHRydWU7XG5cdH0pO1xuXHRcblx0Ly8gd2hlbiBjb25uZWN0ZWQgYW5kIGNvbXBsZXRlZCwgc2VuZCByZXN1bHQgdG8gc2VydmVyXG5cdHZhciBpbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuXHRcdGlmICghY29ubmVjdGVkIHx8ICFjb21wbGV0ZWQpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYgKHNjcmVlbnNob3QgPT0gXCJ0cnVlXCIpIHtcblx0XHRcdGh0bWwyY2FudmFzKGRvY3VtZW50LmJvZHksIHtcblx0XHRcdFx0b25yZW5kZXJlZDogZnVuY3Rpb24oY2FudmFzKSB7XG5cdFx0XHRcdFx0dmFyIGltZyA9IGNhbnZhczJpbWFnZS5zYXZlQXNKUEVHKGNhbnZhcywgdHJ1ZSk7XG5cdFx0XHRcdFx0cmVzdWx0LnNjcmVlbnNob3QgPSBpbWcub3V0ZXJIVE1MO1xuXHRcdFx0XHRcdHNvY2tldC5lbWl0KCdkb25lJywgcmVzdWx0KTtcblx0XHRcdFx0XHRzZXRUaW1lb3V0KHdpbmRvdy5jbG9zZSwgNTAwKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNvY2tldC5lbWl0KCdkb25lJywgcmVzdWx0KTtcblx0XHRcdHNldFRpbWVvdXQod2luZG93LmNsb3NlLCA1MDApO1xuXHRcdH1cblx0XHRjbGVhckludGVydmFsKGludGVydmFsKTtcblx0fSwgMjAwKTtcblxufTtcblxuZnVuY3Rpb24gZ2V0T1MoKSB7XG5cdHZhciBvcyA9IFwiVW5rbm93biBPU1wiO1xuXHRpZiAobmF2aWdhdG9yLmFwcFZlcnNpb24uaW5kZXhPZihcIldpblwiKSAhPSAtMSkgb3MgPSBcIndpbmRvd3NcIjtcblx0aWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJNYWNcIikgIT0gLTEpIG9zID0gXCJtYWNcIjtcblx0aWYgKG5hdmlnYXRvci5hcHBWZXJzaW9uLmluZGV4T2YoXCJYMTFcIikgIT0gLTEpIG9zID0gXCJ1bml4XCI7XG5cdGlmIChuYXZpZ2F0b3IuYXBwVmVyc2lvbi5pbmRleE9mKFwiTGludXhcIikgIT0gLTEpIG9zID0gXCJsaW51eFwiO1xuXHRyZXR1cm4gb3M7XG59XG5cbmlmICh3aW5kb3cubW9jaGEpIHtcblx0bmV3IEJyb3dzZXJtYW4oe1xuXHRcdHR5cGU6ICdtb2NoYScsXG5cdFx0aW5zdGFuY2U6IHdpbmRvdy5tb2NoYVxuXHR9KS5pbml0KCk7XG59IGVsc2Uge1xuXHRuZXcgQnJvd3Nlcm1hbih7XG5cdFx0dHlwZTogJ3BsYWluJyxcblx0XHRpbnN0YW5jZTogd2luZG93XG5cdH0pLmluaXQoKTtcbn0iLCIvKlxuICogQ2FudmFzMkltYWdlIHYwLjFcbiAqIENvcHlyaWdodCAoYykgMjAwOCBKYWNvYiBTZWlkZWxpbiwganNlaWRlbGluQG5paGlsb2dpYy5ka1xuICogTUlUIExpY2Vuc2UgW2h0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXVxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xuXG5cdC8vIGNoZWNrIGlmIHdlIGhhdmUgY2FudmFzIHN1cHBvcnRcblx0dmFyIGJIYXNDYW52YXMgPSBmYWxzZTtcblx0dmFyIG9DYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuXHRcblx0aWYgKG9DYW52YXMuZ2V0Q29udGV4dCAmJiBvQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKSkge1xuXHRcdGJIYXNDYW52YXMgPSB0cnVlO1xuXHR9XG5cblx0Ly8gbm8gY2FudmFzLCBiYWlsIG91dC5cblx0aWYgKCFiSGFzQ2FudmFzKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHNhdmVBc0JNUCA6IGZ1bmN0aW9uKCl7fSxcblx0XHRcdHNhdmVBc1BORyA6IGZ1bmN0aW9uKCl7fSxcblx0XHRcdHNhdmVBc0pQRUcgOiBmdW5jdGlvbigpe31cblx0XHR9XG5cdH1cblxuXHR2YXIgYkhhc0ltYWdlRGF0YSA9ICEhKG9DYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLmdldEltYWdlRGF0YSk7XG5cdHZhciBiSGFzRGF0YVVSTCA9ICEhKG9DYW52YXMudG9EYXRhVVJMKTtcblx0dmFyIGJIYXNCYXNlNjQgPSAhISh3aW5kb3cuYnRvYSk7XG5cblx0dmFyIHN0ckRvd25sb2FkTWltZSA9IFwiaW1hZ2Uvb2N0ZXQtc3RyZWFtXCI7XG5cblx0Ly8gb2ssIHdlJ3JlIGdvb2Rcblx0dmFyIHJlYWRDYW52YXNEYXRhID0gZnVuY3Rpb24ob0NhbnZhcykge1xuXHRcdHZhciBpV2lkdGggPSBwYXJzZUludChvQ2FudmFzLndpZHRoKTtcblx0XHR2YXIgaUhlaWdodCA9IHBhcnNlSW50KG9DYW52YXMuaGVpZ2h0KTtcblx0XHRyZXR1cm4gb0NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIikuZ2V0SW1hZ2VEYXRhKDAsMCxpV2lkdGgsaUhlaWdodCk7XG5cdH1cblxuXHQvLyBiYXNlNjQgZW5jb2RlcyBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2YgY2hhcmNvZGVzXG5cdHZhciBlbmNvZGVEYXRhID0gZnVuY3Rpb24oZGF0YSkge1xuXHRcdHZhciBzdHJEYXRhID0gXCJcIjtcblx0XHRpZiAodHlwZW9mIGRhdGEgPT0gXCJzdHJpbmdcIikge1xuXHRcdFx0c3RyRGF0YSA9IGRhdGE7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBhRGF0YSA9IGRhdGE7XG5cdFx0XHRmb3IgKHZhciBpPTA7aTxhRGF0YS5sZW5ndGg7aSsrKSB7XG5cdFx0XHRcdHN0ckRhdGEgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhRGF0YVtpXSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBidG9hKHN0ckRhdGEpO1xuXHR9XG5cblx0Ly8gY3JlYXRlcyBhIGJhc2U2NCBlbmNvZGVkIHN0cmluZyBjb250YWluaW5nIEJNUCBkYXRhXG5cdC8vIHRha2VzIGFuIGltYWdlZGF0YSBvYmplY3QgYXMgYXJndW1lbnRcblx0dmFyIGNyZWF0ZUJNUCA9IGZ1bmN0aW9uKG9EYXRhKSB7XG5cdFx0dmFyIGFIZWFkZXIgPSBbXTtcblx0XG5cdFx0dmFyIGlXaWR0aCA9IG9EYXRhLndpZHRoO1xuXHRcdHZhciBpSGVpZ2h0ID0gb0RhdGEuaGVpZ2h0O1xuXG5cdFx0YUhlYWRlci5wdXNoKDB4NDIpOyAvLyBtYWdpYyAxXG5cdFx0YUhlYWRlci5wdXNoKDB4NEQpOyBcblx0XG5cdFx0dmFyIGlGaWxlU2l6ZSA9IGlXaWR0aCppSGVpZ2h0KjMgKyA1NDsgLy8gdG90YWwgaGVhZGVyIHNpemUgPSA1NCBieXRlc1xuXHRcdGFIZWFkZXIucHVzaChpRmlsZVNpemUgJSAyNTYpOyBpRmlsZVNpemUgPSBNYXRoLmZsb29yKGlGaWxlU2l6ZSAvIDI1Nik7XG5cdFx0YUhlYWRlci5wdXNoKGlGaWxlU2l6ZSAlIDI1Nik7IGlGaWxlU2l6ZSA9IE1hdGguZmxvb3IoaUZpbGVTaXplIC8gMjU2KTtcblx0XHRhSGVhZGVyLnB1c2goaUZpbGVTaXplICUgMjU2KTsgaUZpbGVTaXplID0gTWF0aC5mbG9vcihpRmlsZVNpemUgLyAyNTYpO1xuXHRcdGFIZWFkZXIucHVzaChpRmlsZVNpemUgJSAyNTYpO1xuXG5cdFx0YUhlYWRlci5wdXNoKDApOyAvLyByZXNlcnZlZFxuXHRcdGFIZWFkZXIucHVzaCgwKTtcblx0XHRhSGVhZGVyLnB1c2goMCk7IC8vIHJlc2VydmVkXG5cdFx0YUhlYWRlci5wdXNoKDApO1xuXG5cdFx0YUhlYWRlci5wdXNoKDU0KTsgLy8gZGF0YW9mZnNldFxuXHRcdGFIZWFkZXIucHVzaCgwKTtcblx0XHRhSGVhZGVyLnB1c2goMCk7XG5cdFx0YUhlYWRlci5wdXNoKDApO1xuXG5cdFx0dmFyIGFJbmZvSGVhZGVyID0gW107XG5cdFx0YUluZm9IZWFkZXIucHVzaCg0MCk7IC8vIGluZm8gaGVhZGVyIHNpemVcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblxuXHRcdHZhciBpSW1hZ2VXaWR0aCA9IGlXaWR0aDtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZVdpZHRoICUgMjU2KTsgaUltYWdlV2lkdGggPSBNYXRoLmZsb29yKGlJbWFnZVdpZHRoIC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZVdpZHRoICUgMjU2KTsgaUltYWdlV2lkdGggPSBNYXRoLmZsb29yKGlJbWFnZVdpZHRoIC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZVdpZHRoICUgMjU2KTsgaUltYWdlV2lkdGggPSBNYXRoLmZsb29yKGlJbWFnZVdpZHRoIC8gMjU2KTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKGlJbWFnZVdpZHRoICUgMjU2KTtcblx0XG5cdFx0dmFyIGlJbWFnZUhlaWdodCA9IGlIZWlnaHQ7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VIZWlnaHQgJSAyNTYpOyBpSW1hZ2VIZWlnaHQgPSBNYXRoLmZsb29yKGlJbWFnZUhlaWdodCAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VIZWlnaHQgJSAyNTYpOyBpSW1hZ2VIZWlnaHQgPSBNYXRoLmZsb29yKGlJbWFnZUhlaWdodCAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VIZWlnaHQgJSAyNTYpOyBpSW1hZ2VIZWlnaHQgPSBNYXRoLmZsb29yKGlJbWFnZUhlaWdodCAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpSW1hZ2VIZWlnaHQgJSAyNTYpO1xuXHRcblx0XHRhSW5mb0hlYWRlci5wdXNoKDEpOyAvLyBudW0gb2YgcGxhbmVzXG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblx0XG5cdFx0YUluZm9IZWFkZXIucHVzaCgyNCk7IC8vIG51bSBvZiBiaXRzIHBlciBwaXhlbFxuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFxuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7IC8vIGNvbXByZXNzaW9uID0gbm9uZVxuXHRcdGFJbmZvSGVhZGVyLnB1c2goMCk7XG5cdFx0YUluZm9IZWFkZXIucHVzaCgwKTtcblx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1xuXHRcblx0XHR2YXIgaURhdGFTaXplID0gaVdpZHRoKmlIZWlnaHQqMzsgXG5cdFx0YUluZm9IZWFkZXIucHVzaChpRGF0YVNpemUgJSAyNTYpOyBpRGF0YVNpemUgPSBNYXRoLmZsb29yKGlEYXRhU2l6ZSAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpRGF0YVNpemUgJSAyNTYpOyBpRGF0YVNpemUgPSBNYXRoLmZsb29yKGlEYXRhU2l6ZSAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpRGF0YVNpemUgJSAyNTYpOyBpRGF0YVNpemUgPSBNYXRoLmZsb29yKGlEYXRhU2l6ZSAvIDI1Nik7XG5cdFx0YUluZm9IZWFkZXIucHVzaChpRGF0YVNpemUgJSAyNTYpOyBcblx0XG5cdFx0Zm9yICh2YXIgaT0wO2k8MTY7aSsrKSB7XG5cdFx0XHRhSW5mb0hlYWRlci5wdXNoKDApO1x0Ly8gdGhlc2UgYnl0ZXMgbm90IHVzZWRcblx0XHR9XG5cdFxuXHRcdHZhciBpUGFkZGluZyA9ICg0IC0gKChpV2lkdGggKiAzKSAlIDQpKSAlIDQ7XG5cblx0XHR2YXIgYUltZ0RhdGEgPSBvRGF0YS5kYXRhO1xuXG5cdFx0dmFyIHN0clBpeGVsRGF0YSA9IFwiXCI7XG5cdFx0dmFyIHkgPSBpSGVpZ2h0O1xuXHRcdGRvIHtcblx0XHRcdHZhciBpT2Zmc2V0WSA9IGlXaWR0aCooeS0xKSo0O1xuXHRcdFx0dmFyIHN0clBpeGVsUm93ID0gXCJcIjtcblx0XHRcdGZvciAodmFyIHg9MDt4PGlXaWR0aDt4KyspIHtcblx0XHRcdFx0dmFyIGlPZmZzZXRYID0gNCp4O1xuXG5cdFx0XHRcdHN0clBpeGVsUm93ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYUltZ0RhdGFbaU9mZnNldFkraU9mZnNldFgrMl0pO1xuXHRcdFx0XHRzdHJQaXhlbFJvdyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGFJbWdEYXRhW2lPZmZzZXRZK2lPZmZzZXRYKzFdKTtcblx0XHRcdFx0c3RyUGl4ZWxSb3cgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShhSW1nRGF0YVtpT2Zmc2V0WStpT2Zmc2V0WF0pO1xuXHRcdFx0fVxuXHRcdFx0Zm9yICh2YXIgYz0wO2M8aVBhZGRpbmc7YysrKSB7XG5cdFx0XHRcdHN0clBpeGVsUm93ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoMCk7XG5cdFx0XHR9XG5cdFx0XHRzdHJQaXhlbERhdGEgKz0gc3RyUGl4ZWxSb3c7XG5cdFx0fSB3aGlsZSAoLS15KTtcblxuXHRcdHZhciBzdHJFbmNvZGVkID0gZW5jb2RlRGF0YShhSGVhZGVyLmNvbmNhdChhSW5mb0hlYWRlcikpICsgZW5jb2RlRGF0YShzdHJQaXhlbERhdGEpO1xuXG5cdFx0cmV0dXJuIHN0ckVuY29kZWQ7XG5cdH1cblxuXG5cdC8vIHNlbmRzIHRoZSBnZW5lcmF0ZWQgZmlsZSB0byB0aGUgY2xpZW50XG5cdHZhciBzYXZlRmlsZSA9IGZ1bmN0aW9uKHN0ckRhdGEpIHtcblx0XHRkb2N1bWVudC5sb2NhdGlvbi5ocmVmID0gc3RyRGF0YTtcblx0fVxuXG5cdHZhciBtYWtlRGF0YVVSSSA9IGZ1bmN0aW9uKHN0ckRhdGEsIHN0ck1pbWUpIHtcblx0XHRyZXR1cm4gXCJkYXRhOlwiICsgc3RyTWltZSArIFwiO2Jhc2U2NCxcIiArIHN0ckRhdGE7XG5cdH1cblxuXHQvLyBnZW5lcmF0ZXMgYSA8aW1nPiBvYmplY3QgY29udGFpbmluZyB0aGUgaW1hZ2VkYXRhXG5cdHZhciBtYWtlSW1hZ2VPYmplY3QgPSBmdW5jdGlvbihzdHJTb3VyY2UpIHtcblx0XHR2YXIgb0ltZ0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO1xuXHRcdG9JbWdFbGVtZW50LnNyYyA9IHN0clNvdXJjZTtcblx0XHRyZXR1cm4gb0ltZ0VsZW1lbnQ7XG5cdH1cblxuXHR2YXIgc2NhbGVDYW52YXMgPSBmdW5jdGlvbihvQ2FudmFzLCBpV2lkdGgsIGlIZWlnaHQpIHtcblx0XHRpZiAoaVdpZHRoICYmIGlIZWlnaHQpIHtcblx0XHRcdHZhciBvU2F2ZUNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG5cdFx0XHRvU2F2ZUNhbnZhcy53aWR0aCA9IGlXaWR0aDtcblx0XHRcdG9TYXZlQ2FudmFzLmhlaWdodCA9IGlIZWlnaHQ7XG5cdFx0XHRvU2F2ZUNhbnZhcy5zdHlsZS53aWR0aCA9IGlXaWR0aCtcInB4XCI7XG5cdFx0XHRvU2F2ZUNhbnZhcy5zdHlsZS5oZWlnaHQgPSBpSGVpZ2h0K1wicHhcIjtcblxuXHRcdFx0dmFyIG9TYXZlQ3R4ID0gb1NhdmVDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG5cdFx0XHRvU2F2ZUN0eC5kcmF3SW1hZ2Uob0NhbnZhcywgMCwgMCwgb0NhbnZhcy53aWR0aCwgb0NhbnZhcy5oZWlnaHQsIDAsIDAsIGlXaWR0aCwgaUhlaWdodCk7XG5cdFx0XHRyZXR1cm4gb1NhdmVDYW52YXM7XG5cdFx0fVxuXHRcdHJldHVybiBvQ2FudmFzO1xuXHR9XG5cblx0cmV0dXJuIHtcblxuXHRcdHNhdmVBc1BORyA6IGZ1bmN0aW9uKG9DYW52YXMsIGJSZXR1cm5JbWcsIGlXaWR0aCwgaUhlaWdodCkge1xuXHRcdFx0aWYgKCFiSGFzRGF0YVVSTCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHR2YXIgb1NjYWxlZENhbnZhcyA9IHNjYWxlQ2FudmFzKG9DYW52YXMsIGlXaWR0aCwgaUhlaWdodCk7XG5cdFx0XHR2YXIgc3RyRGF0YSA9IG9TY2FsZWRDYW52YXMudG9EYXRhVVJMKFwiaW1hZ2UvcG5nXCIpO1xuXHRcdFx0aWYgKGJSZXR1cm5JbWcpIHtcblx0XHRcdFx0cmV0dXJuIG1ha2VJbWFnZU9iamVjdChzdHJEYXRhKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNhdmVGaWxlKHN0ckRhdGEucmVwbGFjZShcImltYWdlL3BuZ1wiLCBzdHJEb3dubG9hZE1pbWUpKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRzYXZlQXNKUEVHIDogZnVuY3Rpb24ob0NhbnZhcywgYlJldHVybkltZywgaVdpZHRoLCBpSGVpZ2h0KSB7XG5cdFx0XHRpZiAoIWJIYXNEYXRhVVJMKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG9TY2FsZWRDYW52YXMgPSBzY2FsZUNhbnZhcyhvQ2FudmFzLCBpV2lkdGgsIGlIZWlnaHQpO1xuXHRcdFx0dmFyIHN0ck1pbWUgPSBcImltYWdlL2pwZWdcIjtcblx0XHRcdHZhciBzdHJEYXRhID0gb1NjYWxlZENhbnZhcy50b0RhdGFVUkwoc3RyTWltZSk7XG5cdFxuXHRcdFx0Ly8gY2hlY2sgaWYgYnJvd3NlciBhY3R1YWxseSBzdXBwb3J0cyBqcGVnIGJ5IGxvb2tpbmcgZm9yIHRoZSBtaW1lIHR5cGUgaW4gdGhlIGRhdGEgdXJpLlxuXHRcdFx0Ly8gaWYgbm90LCByZXR1cm4gZmFsc2Vcblx0XHRcdGlmIChzdHJEYXRhLmluZGV4T2Yoc3RyTWltZSkgIT0gNSkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChiUmV0dXJuSW1nKSB7XG5cdFx0XHRcdHJldHVybiBtYWtlSW1hZ2VPYmplY3Qoc3RyRGF0YSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzYXZlRmlsZShzdHJEYXRhLnJlcGxhY2Uoc3RyTWltZSwgc3RyRG93bmxvYWRNaW1lKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9LFxuXG5cdFx0c2F2ZUFzQk1QIDogZnVuY3Rpb24ob0NhbnZhcywgYlJldHVybkltZywgaVdpZHRoLCBpSGVpZ2h0KSB7XG5cdFx0XHRpZiAoIShiSGFzSW1hZ2VEYXRhICYmIGJIYXNCYXNlNjQpKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIG9TY2FsZWRDYW52YXMgPSBzY2FsZUNhbnZhcyhvQ2FudmFzLCBpV2lkdGgsIGlIZWlnaHQpO1xuXG5cdFx0XHR2YXIgb0RhdGEgPSByZWFkQ2FudmFzRGF0YShvU2NhbGVkQ2FudmFzKTtcblx0XHRcdHZhciBzdHJJbWdEYXRhID0gY3JlYXRlQk1QKG9EYXRhKTtcblx0XHRcdGlmIChiUmV0dXJuSW1nKSB7XG5cdFx0XHRcdHJldHVybiBtYWtlSW1hZ2VPYmplY3QobWFrZURhdGFVUkkoc3RySW1nRGF0YSwgXCJpbWFnZS9ibXBcIikpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2F2ZUZpbGUobWFrZURhdGFVUkkoc3RySW1nRGF0YSwgc3RyRG93bmxvYWRNaW1lKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH07XG5cbn0pKCk7IiwiLypcbiAgaHRtbDJjYW52YXMgMC40LjEgPGh0dHA6Ly9odG1sMmNhbnZhcy5oZXJ0emVuLmNvbT5cbiAgQ29weXJpZ2h0IChjKSAyMDEzIE5pa2xhcyB2b24gSGVydHplblxuXG4gIFJlbGVhc2VkIHVuZGVyIE1JVCBMaWNlbnNlXG4qL1xuXG4oZnVuY3Rpb24od2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkKXtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaHRtbDJjYW52YXMgPSB7fSxcbnByZXZpb3VzRWxlbWVudCxcbmNvbXB1dGVkQ1NTLFxuaHRtbDJjYW52YXM7XG5cbl9odG1sMmNhbnZhcy5VdGlsID0ge307XG5cbl9odG1sMmNhbnZhcy5VdGlsLmxvZyA9IGZ1bmN0aW9uKGEpIHtcbiAgaWYgKF9odG1sMmNhbnZhcy5sb2dnaW5nICYmIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xuICAgIHdpbmRvdy5jb25zb2xlLmxvZyhhKTtcbiAgfVxufTtcblxuX2h0bWwyY2FudmFzLlV0aWwudHJpbVRleHQgPSAoZnVuY3Rpb24oaXNOYXRpdmUpe1xuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpIHtcbiAgICByZXR1cm4gaXNOYXRpdmUgPyBpc05hdGl2ZS5hcHBseShpbnB1dCkgOiAoKGlucHV0IHx8ICcnKSArICcnKS5yZXBsYWNlKCAvXlxccyt8XFxzKyQvZyAsICcnICk7XG4gIH07XG59KShTdHJpbmcucHJvdG90eXBlLnRyaW0pO1xuXG5faHRtbDJjYW52YXMuVXRpbC5hc0Zsb2F0ID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gcGFyc2VGbG9hdCh2KTtcbn07XG5cbihmdW5jdGlvbigpIHtcbiAgLy8gVE9ETzogc3VwcG9ydCBhbGwgcG9zc2libGUgbGVuZ3RoIHZhbHVlc1xuICB2YXIgVEVYVF9TSEFET1dfUFJPUEVSVFkgPSAvKChyZ2JhfHJnYilcXChbXlxcKV0rXFwpKFxccy0/XFxkK3B4KXswLH0pL2c7XG4gIHZhciBURVhUX1NIQURPV19WQUxVRVMgPSAvKC0/XFxkK3B4KXwoIy4rKXwocmdiXFwoLitcXCkpfChyZ2JhXFwoLitcXCkpL2c7XG4gIF9odG1sMmNhbnZhcy5VdGlsLnBhcnNlVGV4dFNoYWRvd3MgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlIHx8IHZhbHVlID09PSAnbm9uZScpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBmaW5kIG11bHRpcGxlIHNoYWRvdyBkZWNsYXJhdGlvbnNcbiAgICB2YXIgc2hhZG93cyA9IHZhbHVlLm1hdGNoKFRFWFRfU0hBRE9XX1BST1BFUlRZKSxcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgc2hhZG93cyAmJiAoaSA8IHNoYWRvd3MubGVuZ3RoKTsgaSsrKSB7XG4gICAgICB2YXIgcyA9IHNoYWRvd3NbaV0ubWF0Y2goVEVYVF9TSEFET1dfVkFMVUVTKTtcbiAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgIGNvbG9yOiBzWzBdLFxuICAgICAgICBvZmZzZXRYOiBzWzFdID8gc1sxXS5yZXBsYWNlKCdweCcsICcnKSA6IDAsXG4gICAgICAgIG9mZnNldFk6IHNbMl0gPyBzWzJdLnJlcGxhY2UoJ3B4JywgJycpIDogMCxcbiAgICAgICAgYmx1cjogc1szXSA/IHNbM10ucmVwbGFjZSgncHgnLCAnJykgOiAwXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH07XG59KSgpO1xuXG5cbl9odG1sMmNhbnZhcy5VdGlsLnBhcnNlQmFja2dyb3VuZEltYWdlID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdmFyIHdoaXRlc3BhY2UgPSAnIFxcclxcblxcdCcsXG4gICAgICAgIG1ldGhvZCwgZGVmaW5pdGlvbiwgcHJlZml4LCBwcmVmaXhfaSwgYmxvY2ssIHJlc3VsdHMgPSBbXSxcbiAgICAgICAgYywgbW9kZSA9IDAsIG51bVBhcmVuID0gMCwgcXVvdGUsIGFyZ3M7XG5cbiAgICB2YXIgYXBwZW5kUmVzdWx0ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYobWV0aG9kKSB7XG4gICAgICAgICAgICBpZihkZWZpbml0aW9uLnN1YnN0ciggMCwgMSApID09PSAnXCInKSB7XG4gICAgICAgICAgICAgICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24uc3Vic3RyKCAxLCBkZWZpbml0aW9uLmxlbmd0aCAtIDIgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGRlZmluaXRpb24pIHtcbiAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGVmaW5pdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihtZXRob2Quc3Vic3RyKCAwLCAxICkgPT09ICctJyAmJlxuICAgICAgICAgICAgICAgICAgICAocHJlZml4X2kgPSBtZXRob2QuaW5kZXhPZiggJy0nLCAxICkgKyAxKSA+IDApIHtcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBtZXRob2Quc3Vic3RyKCAwLCBwcmVmaXhfaSk7XG4gICAgICAgICAgICAgICAgbWV0aG9kID0gbWV0aG9kLnN1YnN0ciggcHJlZml4X2kgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgcHJlZml4OiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogYmxvY2ssXG4gICAgICAgICAgICAgICAgYXJnczogYXJnc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgYXJncyA9IFtdOyAvL2ZvciBzb21lIG9kZCByZWFzb24sIHNldHRpbmcgLmxlbmd0aCA9IDAgZGlkbid0IHdvcmsgaW4gc2FmYXJpXG4gICAgICAgIG1ldGhvZCA9XG4gICAgICAgICAgICBwcmVmaXggPVxuICAgICAgICAgICAgZGVmaW5pdGlvbiA9XG4gICAgICAgICAgICBibG9jayA9ICcnO1xuICAgIH07XG5cbiAgICBhcHBlbmRSZXN1bHQoKTtcbiAgICBmb3IodmFyIGkgPSAwLCBpaSA9IHZhbHVlLmxlbmd0aDsgaTxpaTsgaSsrKSB7XG4gICAgICAgIGMgPSB2YWx1ZVtpXTtcbiAgICAgICAgaWYobW9kZSA9PT0gMCAmJiB3aGl0ZXNwYWNlLmluZGV4T2YoIGMgKSA+IC0xKXtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaChjKSB7XG4gICAgICAgICAgICBjYXNlICdcIic6XG4gICAgICAgICAgICAgICAgaWYoIXF1b3RlKSB7XG4gICAgICAgICAgICAgICAgICAgIHF1b3RlID0gYztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihxdW90ZSA9PT0gYykge1xuICAgICAgICAgICAgICAgICAgICBxdW90ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICcoJzpcbiAgICAgICAgICAgICAgICBpZihxdW90ZSkgeyBicmVhazsgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYobW9kZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtb2RlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2sgKz0gYztcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtUGFyZW4rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJyknOlxuICAgICAgICAgICAgICAgIGlmKHF1b3RlKSB7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihtb2RlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG51bVBhcmVuID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrICs9IGM7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcHBlbmRSZXN1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbnVtUGFyZW4tLTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnLCc6XG4gICAgICAgICAgICAgICAgaWYocXVvdGUpIHsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKG1vZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgYXBwZW5kUmVzdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtb2RlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG51bVBhcmVuID09PSAwICYmICFtZXRob2QubWF0Y2goL151cmwkL2kpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmdzLnB1c2goZGVmaW5pdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZpbml0aW9uID0gJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBibG9jayArPSBjO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBibG9jayArPSBjO1xuICAgICAgICBpZihtb2RlID09PSAwKSB7IG1ldGhvZCArPSBjOyB9XG4gICAgICAgIGVsc2UgeyBkZWZpbml0aW9uICs9IGM7IH1cbiAgICB9XG4gICAgYXBwZW5kUmVzdWx0KCk7XG5cbiAgICByZXR1cm4gcmVzdWx0cztcbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLkJvdW5kcyA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gIHZhciBjbGllbnRSZWN0LCBib3VuZHMgPSB7fTtcblxuICBpZiAoZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3Qpe1xuICAgIGNsaWVudFJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgLy8gVE9ETyBhZGQgc2Nyb2xsIHBvc2l0aW9uIHRvIGJvdW5kcywgc28gbm8gc2Nyb2xsaW5nIG9mIHdpbmRvdyBuZWNlc3NhcnlcbiAgICBib3VuZHMudG9wID0gY2xpZW50UmVjdC50b3A7XG4gICAgYm91bmRzLmJvdHRvbSA9IGNsaWVudFJlY3QuYm90dG9tIHx8IChjbGllbnRSZWN0LnRvcCArIGNsaWVudFJlY3QuaGVpZ2h0KTtcbiAgICBib3VuZHMubGVmdCA9IGNsaWVudFJlY3QubGVmdDtcblxuICAgIGJvdW5kcy53aWR0aCA9IGVsZW1lbnQub2Zmc2V0V2lkdGg7XG4gICAgYm91bmRzLmhlaWdodCA9IGVsZW1lbnQub2Zmc2V0SGVpZ2h0O1xuICB9XG5cbiAgcmV0dXJuIGJvdW5kcztcbn07XG5cbi8vIFRPRE8gaWRlYWxseSwgd2UnZCB3YW50IGV2ZXJ5dGhpbmcgdG8gZ28gdGhyb3VnaCB0aGlzIGZ1bmN0aW9uIGluc3RlYWQgb2YgVXRpbC5Cb3VuZHMsXG4vLyBidXQgd291bGQgcmVxdWlyZSBmdXJ0aGVyIHdvcmsgdG8gY2FsY3VsYXRlIHRoZSBjb3JyZWN0IHBvc2l0aW9ucyBmb3IgZWxlbWVudHMgd2l0aCBvZmZzZXRQYXJlbnRzXG5faHRtbDJjYW52YXMuVXRpbC5PZmZzZXRCb3VuZHMgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICB2YXIgcGFyZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQgPyBfaHRtbDJjYW52YXMuVXRpbC5PZmZzZXRCb3VuZHMoZWxlbWVudC5vZmZzZXRQYXJlbnQpIDoge3RvcDogMCwgbGVmdDogMH07XG5cbiAgcmV0dXJuIHtcbiAgICB0b3A6IGVsZW1lbnQub2Zmc2V0VG9wICsgcGFyZW50LnRvcCxcbiAgICBib3R0b206IGVsZW1lbnQub2Zmc2V0VG9wICsgZWxlbWVudC5vZmZzZXRIZWlnaHQgKyBwYXJlbnQudG9wLFxuICAgIGxlZnQ6IGVsZW1lbnQub2Zmc2V0TGVmdCArIHBhcmVudC5sZWZ0LFxuICAgIHdpZHRoOiBlbGVtZW50Lm9mZnNldFdpZHRoLFxuICAgIGhlaWdodDogZWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIHRvUFgoZWxlbWVudCwgYXR0cmlidXRlLCB2YWx1ZSApIHtcbiAgICB2YXIgcnNMZWZ0ID0gZWxlbWVudC5ydW50aW1lU3R5bGUgJiYgZWxlbWVudC5ydW50aW1lU3R5bGVbYXR0cmlidXRlXSxcbiAgICAgICAgbGVmdCxcbiAgICAgICAgc3R5bGUgPSBlbGVtZW50LnN0eWxlO1xuXG4gICAgLy8gQ2hlY2sgaWYgd2UgYXJlIG5vdCBkZWFsaW5nIHdpdGggcGl4ZWxzLCAoT3BlcmEgaGFzIGlzc3VlcyB3aXRoIHRoaXMpXG4gICAgLy8gUG9ydGVkIGZyb20galF1ZXJ5IGNzcy5qc1xuICAgIC8vIEZyb20gdGhlIGF3ZXNvbWUgaGFjayBieSBEZWFuIEVkd2FyZHNcbiAgICAvLyBodHRwOi8vZXJpay5lYWUubmV0L2FyY2hpdmVzLzIwMDcvMDcvMjcvMTguNTQuMTUvI2NvbW1lbnQtMTAyMjkxXG5cbiAgICAvLyBJZiB3ZSdyZSBub3QgZGVhbGluZyB3aXRoIGEgcmVndWxhciBwaXhlbCBudW1iZXJcbiAgICAvLyBidXQgYSBudW1iZXIgdGhhdCBoYXMgYSB3ZWlyZCBlbmRpbmcsIHdlIG5lZWQgdG8gY29udmVydCBpdCB0byBwaXhlbHNcblxuICAgIGlmICggIS9eLT9bMC05XStcXC4/WzAtOV0qKD86cHgpPyQvaS50ZXN0KCB2YWx1ZSApICYmIC9eLT9cXGQvLnRlc3QodmFsdWUpICkge1xuICAgICAgICAvLyBSZW1lbWJlciB0aGUgb3JpZ2luYWwgdmFsdWVzXG4gICAgICAgIGxlZnQgPSBzdHlsZS5sZWZ0O1xuXG4gICAgICAgIC8vIFB1dCBpbiB0aGUgbmV3IHZhbHVlcyB0byBnZXQgYSBjb21wdXRlZCB2YWx1ZSBvdXRcbiAgICAgICAgaWYgKHJzTGVmdCkge1xuICAgICAgICAgICAgZWxlbWVudC5ydW50aW1lU3R5bGUubGVmdCA9IGVsZW1lbnQuY3VycmVudFN0eWxlLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGUubGVmdCA9IGF0dHJpYnV0ZSA9PT0gXCJmb250U2l6ZVwiID8gXCIxZW1cIiA6ICh2YWx1ZSB8fCAwKTtcbiAgICAgICAgdmFsdWUgPSBzdHlsZS5waXhlbExlZnQgKyBcInB4XCI7XG5cbiAgICAgICAgLy8gUmV2ZXJ0IHRoZSBjaGFuZ2VkIHZhbHVlc1xuICAgICAgICBzdHlsZS5sZWZ0ID0gbGVmdDtcbiAgICAgICAgaWYgKHJzTGVmdCkge1xuICAgICAgICAgICAgZWxlbWVudC5ydW50aW1lU3R5bGUubGVmdCA9IHJzTGVmdDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghL14odGhpbnxtZWRpdW18dGhpY2spJC9pLnRlc3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKHBhcnNlRmxvYXQodmFsdWUpKSArIFwicHhcIjtcbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGFzSW50KHZhbCkge1xuICAgIHJldHVybiBwYXJzZUludCh2YWwsIDEwKTtcbn1cblxuZnVuY3Rpb24gcGFyc2VCYWNrZ3JvdW5kU2l6ZVBvc2l0aW9uKHZhbHVlLCBlbGVtZW50LCBhdHRyaWJ1dGUsIGluZGV4KSB7XG4gICAgdmFsdWUgPSAodmFsdWUgfHwgJycpLnNwbGl0KCcsJyk7XG4gICAgdmFsdWUgPSB2YWx1ZVtpbmRleCB8fCAwXSB8fCB2YWx1ZVswXSB8fCAnYXV0byc7XG4gICAgdmFsdWUgPSBfaHRtbDJjYW52YXMuVXRpbC50cmltVGV4dCh2YWx1ZSkuc3BsaXQoJyAnKTtcblxuICAgIGlmKGF0dHJpYnV0ZSA9PT0gJ2JhY2tncm91bmRTaXplJyAmJiAoIXZhbHVlWzBdIHx8IHZhbHVlWzBdLm1hdGNoKC9jb3Zlcnxjb250YWlufGF1dG8vKSkpIHtcbiAgICAgICAgLy90aGVzZSB2YWx1ZXMgd2lsbCBiZSBoYW5kbGVkIGluIHRoZSBwYXJlbnQgZnVuY3Rpb25cbiAgICB9IGVsc2Uge1xuICAgICAgICB2YWx1ZVswXSA9ICh2YWx1ZVswXS5pbmRleE9mKCBcIiVcIiApID09PSAtMSkgPyB0b1BYKGVsZW1lbnQsIGF0dHJpYnV0ZSArIFwiWFwiLCB2YWx1ZVswXSkgOiB2YWx1ZVswXTtcbiAgICAgICAgaWYodmFsdWVbMV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoYXR0cmlidXRlID09PSAnYmFja2dyb3VuZFNpemUnKSB7XG4gICAgICAgICAgICAgICAgdmFsdWVbMV0gPSAnYXV0byc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBJRSA5IGRvZXNuJ3QgcmV0dXJuIGRvdWJsZSBkaWdpdCBhbHdheXNcbiAgICAgICAgICAgICAgICB2YWx1ZVsxXSA9IHZhbHVlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhbHVlWzFdID0gKHZhbHVlWzFdLmluZGV4T2YoXCIlXCIpID09PSAtMSkgPyB0b1BYKGVsZW1lbnQsIGF0dHJpYnV0ZSArIFwiWVwiLCB2YWx1ZVsxXSkgOiB2YWx1ZVsxXTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuXG5faHRtbDJjYW52YXMuVXRpbC5nZXRDU1MgPSBmdW5jdGlvbiAoZWxlbWVudCwgYXR0cmlidXRlLCBpbmRleCkge1xuICAgIGlmIChwcmV2aW91c0VsZW1lbnQgIT09IGVsZW1lbnQpIHtcbiAgICAgIGNvbXB1dGVkQ1NTID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKTtcbiAgICB9XG5cbiAgICB2YXIgdmFsdWUgPSBjb21wdXRlZENTU1thdHRyaWJ1dGVdO1xuXG4gICAgaWYgKC9eYmFja2dyb3VuZChTaXplfFBvc2l0aW9uKSQvLnRlc3QoYXR0cmlidXRlKSkge1xuICAgICAgICByZXR1cm4gcGFyc2VCYWNrZ3JvdW5kU2l6ZVBvc2l0aW9uKHZhbHVlLCBlbGVtZW50LCBhdHRyaWJ1dGUsIGluZGV4KTtcbiAgICB9IGVsc2UgaWYgKC9ib3JkZXIoVG9wfEJvdHRvbSkoTGVmdHxSaWdodClSYWRpdXMvLnRlc3QoYXR0cmlidXRlKSkge1xuICAgICAgdmFyIGFyciA9IHZhbHVlLnNwbGl0KFwiIFwiKTtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDw9IDEpIHtcbiAgICAgICAgICBhcnJbMV0gPSBhcnJbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gYXJyLm1hcChhc0ludCk7XG4gICAgfVxuXG4gIHJldHVybiB2YWx1ZTtcbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLnJlc2l6ZUJvdW5kcyA9IGZ1bmN0aW9uKCBjdXJyZW50X3dpZHRoLCBjdXJyZW50X2hlaWdodCwgdGFyZ2V0X3dpZHRoLCB0YXJnZXRfaGVpZ2h0LCBzdHJldGNoX21vZGUgKXtcbiAgdmFyIHRhcmdldF9yYXRpbyA9IHRhcmdldF93aWR0aCAvIHRhcmdldF9oZWlnaHQsXG4gICAgY3VycmVudF9yYXRpbyA9IGN1cnJlbnRfd2lkdGggLyBjdXJyZW50X2hlaWdodCxcbiAgICBvdXRwdXRfd2lkdGgsIG91dHB1dF9oZWlnaHQ7XG5cbiAgaWYoIXN0cmV0Y2hfbW9kZSB8fCBzdHJldGNoX21vZGUgPT09ICdhdXRvJykge1xuICAgIG91dHB1dF93aWR0aCA9IHRhcmdldF93aWR0aDtcbiAgICBvdXRwdXRfaGVpZ2h0ID0gdGFyZ2V0X2hlaWdodDtcbiAgfSBlbHNlIGlmKHRhcmdldF9yYXRpbyA8IGN1cnJlbnRfcmF0aW8gXiBzdHJldGNoX21vZGUgPT09ICdjb250YWluJykge1xuICAgIG91dHB1dF9oZWlnaHQgPSB0YXJnZXRfaGVpZ2h0O1xuICAgIG91dHB1dF93aWR0aCA9IHRhcmdldF9oZWlnaHQgKiBjdXJyZW50X3JhdGlvO1xuICB9IGVsc2Uge1xuICAgIG91dHB1dF93aWR0aCA9IHRhcmdldF93aWR0aDtcbiAgICBvdXRwdXRfaGVpZ2h0ID0gdGFyZ2V0X3dpZHRoIC8gY3VycmVudF9yYXRpbztcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgd2lkdGg6IG91dHB1dF93aWR0aCxcbiAgICBoZWlnaHQ6IG91dHB1dF9oZWlnaHRcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGJhY2tncm91bmRCb3VuZHNGYWN0b3J5KCBwcm9wLCBlbCwgYm91bmRzLCBpbWFnZSwgaW1hZ2VJbmRleCwgYmFja2dyb3VuZFNpemUgKSB7XG4gICAgdmFyIGJncG9zaXRpb24gPSAgX2h0bWwyY2FudmFzLlV0aWwuZ2V0Q1NTKCBlbCwgcHJvcCwgaW1hZ2VJbmRleCApICxcbiAgICB0b3BQb3MsXG4gICAgbGVmdCxcbiAgICBwZXJjZW50YWdlLFxuICAgIHZhbDtcblxuICAgIGlmIChiZ3Bvc2l0aW9uLmxlbmd0aCA9PT0gMSl7XG4gICAgICB2YWwgPSBiZ3Bvc2l0aW9uWzBdO1xuXG4gICAgICBiZ3Bvc2l0aW9uID0gW107XG5cbiAgICAgIGJncG9zaXRpb25bMF0gPSB2YWw7XG4gICAgICBiZ3Bvc2l0aW9uWzFdID0gdmFsO1xuICAgIH1cblxuICAgIGlmIChiZ3Bvc2l0aW9uWzBdLnRvU3RyaW5nKCkuaW5kZXhPZihcIiVcIikgIT09IC0xKXtcbiAgICAgIHBlcmNlbnRhZ2UgPSAocGFyc2VGbG9hdChiZ3Bvc2l0aW9uWzBdKS8xMDApO1xuICAgICAgbGVmdCA9IGJvdW5kcy53aWR0aCAqIHBlcmNlbnRhZ2U7XG4gICAgICBpZihwcm9wICE9PSAnYmFja2dyb3VuZFNpemUnKSB7XG4gICAgICAgIGxlZnQgLT0gKGJhY2tncm91bmRTaXplIHx8IGltYWdlKS53aWR0aCpwZXJjZW50YWdlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZihwcm9wID09PSAnYmFja2dyb3VuZFNpemUnKSB7XG4gICAgICAgIGlmKGJncG9zaXRpb25bMF0gPT09ICdhdXRvJykge1xuICAgICAgICAgIGxlZnQgPSBpbWFnZS53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoL2NvbnRhaW58Y292ZXIvLnRlc3QoYmdwb3NpdGlvblswXSkpIHtcbiAgICAgICAgICAgIHZhciByZXNpemVkID0gX2h0bWwyY2FudmFzLlV0aWwucmVzaXplQm91bmRzKGltYWdlLndpZHRoLCBpbWFnZS5oZWlnaHQsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCwgYmdwb3NpdGlvblswXSk7XG4gICAgICAgICAgICBsZWZ0ID0gcmVzaXplZC53aWR0aDtcbiAgICAgICAgICAgIHRvcFBvcyA9IHJlc2l6ZWQuaGVpZ2h0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZWZ0ID0gcGFyc2VJbnQoYmdwb3NpdGlvblswXSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGVmdCA9IHBhcnNlSW50KCBiZ3Bvc2l0aW9uWzBdLCAxMCk7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBpZihiZ3Bvc2l0aW9uWzFdID09PSAnYXV0bycpIHtcbiAgICAgIHRvcFBvcyA9IGxlZnQgLyBpbWFnZS53aWR0aCAqIGltYWdlLmhlaWdodDtcbiAgICB9IGVsc2UgaWYgKGJncG9zaXRpb25bMV0udG9TdHJpbmcoKS5pbmRleE9mKFwiJVwiKSAhPT0gLTEpe1xuICAgICAgcGVyY2VudGFnZSA9IChwYXJzZUZsb2F0KGJncG9zaXRpb25bMV0pLzEwMCk7XG4gICAgICB0b3BQb3MgPSAgYm91bmRzLmhlaWdodCAqIHBlcmNlbnRhZ2U7XG4gICAgICBpZihwcm9wICE9PSAnYmFja2dyb3VuZFNpemUnKSB7XG4gICAgICAgIHRvcFBvcyAtPSAoYmFja2dyb3VuZFNpemUgfHwgaW1hZ2UpLmhlaWdodCAqIHBlcmNlbnRhZ2U7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgdG9wUG9zID0gcGFyc2VJbnQoYmdwb3NpdGlvblsxXSwxMCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtsZWZ0LCB0b3BQb3NdO1xufVxuXG5faHRtbDJjYW52YXMuVXRpbC5CYWNrZ3JvdW5kUG9zaXRpb24gPSBmdW5jdGlvbiggZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXgsIGJhY2tncm91bmRTaXplICkge1xuICAgIHZhciByZXN1bHQgPSBiYWNrZ3JvdW5kQm91bmRzRmFjdG9yeSggJ2JhY2tncm91bmRQb3NpdGlvbicsIGVsLCBib3VuZHMsIGltYWdlLCBpbWFnZUluZGV4LCBiYWNrZ3JvdW5kU2l6ZSApO1xuICAgIHJldHVybiB7IGxlZnQ6IHJlc3VsdFswXSwgdG9wOiByZXN1bHRbMV0gfTtcbn07XG5cbl9odG1sMmNhbnZhcy5VdGlsLkJhY2tncm91bmRTaXplID0gZnVuY3Rpb24oIGVsLCBib3VuZHMsIGltYWdlLCBpbWFnZUluZGV4ICkge1xuICAgIHZhciByZXN1bHQgPSBiYWNrZ3JvdW5kQm91bmRzRmFjdG9yeSggJ2JhY2tncm91bmRTaXplJywgZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXggKTtcbiAgICByZXR1cm4geyB3aWR0aDogcmVzdWx0WzBdLCBoZWlnaHQ6IHJlc3VsdFsxXSB9O1xufTtcblxuX2h0bWwyY2FudmFzLlV0aWwuRXh0ZW5kID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRlZmF1bHRzKSB7XG4gIGZvciAodmFyIGtleSBpbiBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgZGVmYXVsdHNba2V5XSA9IG9wdGlvbnNba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGRlZmF1bHRzO1xufTtcblxuXG4vKlxuICogRGVyaXZlZCBmcm9tIGpRdWVyeS5jb250ZW50cygpXG4gKiBDb3B5cmlnaHQgMjAxMCwgSm9obiBSZXNpZ1xuICogRHVhbCBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIG9yIEdQTCBWZXJzaW9uIDIgbGljZW5zZXMuXG4gKiBodHRwOi8vanF1ZXJ5Lm9yZy9saWNlbnNlXG4gKi9cbl9odG1sMmNhbnZhcy5VdGlsLkNoaWxkcmVuID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBjaGlsZHJlbjtcbiAgdHJ5IHtcbiAgICBjaGlsZHJlbiA9IChlbGVtLm5vZGVOYW1lICYmIGVsZW0ubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJJRlJBTUVcIikgPyBlbGVtLmNvbnRlbnREb2N1bWVudCB8fCBlbGVtLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQgOiAoZnVuY3Rpb24oYXJyYXkpIHtcbiAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgIGlmIChhcnJheSAhPT0gbnVsbCkge1xuICAgICAgICAoZnVuY3Rpb24oZmlyc3QsIHNlY29uZCApIHtcbiAgICAgICAgICB2YXIgaSA9IGZpcnN0Lmxlbmd0aCxcbiAgICAgICAgICBqID0gMDtcblxuICAgICAgICAgIGlmICh0eXBlb2Ygc2Vjb25kLmxlbmd0aCA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgZm9yICh2YXIgbCA9IHNlY29uZC5sZW5ndGg7IGogPCBsOyBqKyspIHtcbiAgICAgICAgICAgICAgZmlyc3RbaSsrXSA9IHNlY29uZFtqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd2hpbGUgKHNlY29uZFtqXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgIGZpcnN0W2krK10gPSBzZWNvbmRbaisrXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmaXJzdC5sZW5ndGggPSBpO1xuXG4gICAgICAgICAgcmV0dXJuIGZpcnN0O1xuICAgICAgICB9KShyZXQsIGFycmF5KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfSkoZWxlbS5jaGlsZE5vZGVzKTtcblxuICB9IGNhdGNoIChleCkge1xuICAgIF9odG1sMmNhbnZhcy5VdGlsLmxvZyhcImh0bWwyY2FudmFzLlV0aWwuQ2hpbGRyZW4gZmFpbGVkIHdpdGggZXhjZXB0aW9uOiBcIiArIGV4Lm1lc3NhZ2UpO1xuICAgIGNoaWxkcmVuID0gW107XG4gIH1cbiAgcmV0dXJuIGNoaWxkcmVuO1xufTtcblxuX2h0bWwyY2FudmFzLlV0aWwuaXNUcmFuc3BhcmVudCA9IGZ1bmN0aW9uKGJhY2tncm91bmRDb2xvcikge1xuICByZXR1cm4gKGJhY2tncm91bmRDb2xvciA9PT0gXCJ0cmFuc3BhcmVudFwiIHx8IGJhY2tncm91bmRDb2xvciA9PT0gXCJyZ2JhKDAsIDAsIDAsIDApXCIpO1xufTtcbl9odG1sMmNhbnZhcy5VdGlsLkZvbnQgPSAoZnVuY3Rpb24gKCkge1xuXG4gIHZhciBmb250RGF0YSA9IHt9O1xuXG4gIHJldHVybiBmdW5jdGlvbihmb250LCBmb250U2l6ZSwgZG9jKSB7XG4gICAgaWYgKGZvbnREYXRhW2ZvbnQgKyBcIi1cIiArIGZvbnRTaXplXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gZm9udERhdGFbZm9udCArIFwiLVwiICsgZm9udFNpemVdO1xuICAgIH1cblxuICAgIHZhciBjb250YWluZXIgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2JyksXG4gICAgaW1nID0gZG9jLmNyZWF0ZUVsZW1lbnQoJ2ltZycpLFxuICAgIHNwYW4gPSBkb2MuY3JlYXRlRWxlbWVudCgnc3BhbicpLFxuICAgIHNhbXBsZVRleHQgPSAnSGlkZGVuIFRleHQnLFxuICAgIGJhc2VsaW5lLFxuICAgIG1pZGRsZSxcbiAgICBtZXRyaWNzT2JqO1xuXG4gICAgY29udGFpbmVyLnN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgIGNvbnRhaW5lci5zdHlsZS5mb250RmFtaWx5ID0gZm9udDtcbiAgICBjb250YWluZXIuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZTtcbiAgICBjb250YWluZXIuc3R5bGUubWFyZ2luID0gMDtcbiAgICBjb250YWluZXIuc3R5bGUucGFkZGluZyA9IDA7XG5cbiAgICBkb2MuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuXG4gICAgLy8gaHR0cDovL3Byb2JhYmx5cHJvZ3JhbW1pbmcuY29tLzIwMDkvMDMvMTUvdGhlLXRpbmllc3QtZ2lmLWV2ZXIgKGhhbmR0aW55d2hpdGUuZ2lmKVxuICAgIGltZy5zcmMgPSBcImRhdGE6aW1hZ2UvZ2lmO2Jhc2U2NCxSMGxHT0RsaEFRQUJBSUFCQVAvLy93QUFBQ3dBQUFBQUFRQUJBQUFDQWtRQkFEcz1cIjtcbiAgICBpbWcud2lkdGggPSAxO1xuICAgIGltZy5oZWlnaHQgPSAxO1xuXG4gICAgaW1nLnN0eWxlLm1hcmdpbiA9IDA7XG4gICAgaW1nLnN0eWxlLnBhZGRpbmcgPSAwO1xuICAgIGltZy5zdHlsZS52ZXJ0aWNhbEFsaWduID0gXCJiYXNlbGluZVwiO1xuXG4gICAgc3Bhbi5zdHlsZS5mb250RmFtaWx5ID0gZm9udDtcbiAgICBzcGFuLnN0eWxlLmZvbnRTaXplID0gZm9udFNpemU7XG4gICAgc3Bhbi5zdHlsZS5tYXJnaW4gPSAwO1xuICAgIHNwYW4uc3R5bGUucGFkZGluZyA9IDA7XG5cbiAgICBzcGFuLmFwcGVuZENoaWxkKGRvYy5jcmVhdGVUZXh0Tm9kZShzYW1wbGVUZXh0KSk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNwYW4pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChpbWcpO1xuICAgIGJhc2VsaW5lID0gKGltZy5vZmZzZXRUb3AgLSBzcGFuLm9mZnNldFRvcCkgKyAxO1xuXG4gICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKHNwYW4pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUoc2FtcGxlVGV4dCkpO1xuXG4gICAgY29udGFpbmVyLnN0eWxlLmxpbmVIZWlnaHQgPSBcIm5vcm1hbFwiO1xuICAgIGltZy5zdHlsZS52ZXJ0aWNhbEFsaWduID0gXCJzdXBlclwiO1xuXG4gICAgbWlkZGxlID0gKGltZy5vZmZzZXRUb3AtY29udGFpbmVyLm9mZnNldFRvcCkgKyAxO1xuICAgIG1ldHJpY3NPYmogPSB7XG4gICAgICBiYXNlbGluZTogYmFzZWxpbmUsXG4gICAgICBsaW5lV2lkdGg6IDEsXG4gICAgICBtaWRkbGU6IG1pZGRsZVxuICAgIH07XG5cbiAgICBmb250RGF0YVtmb250ICsgXCItXCIgKyBmb250U2l6ZV0gPSBtZXRyaWNzT2JqO1xuXG4gICAgZG9jLmJvZHkucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcblxuICAgIHJldHVybiBtZXRyaWNzT2JqO1xuICB9O1xufSkoKTtcblxuKGZ1bmN0aW9uKCl7XG4gIHZhciBVdGlsID0gX2h0bWwyY2FudmFzLlV0aWwsXG4gICAgR2VuZXJhdGUgPSB7fTtcblxuICBfaHRtbDJjYW52YXMuR2VuZXJhdGUgPSBHZW5lcmF0ZTtcblxuICB2YXIgcmVHcmFkaWVudHMgPSBbXG4gIC9eKC13ZWJraXQtbGluZWFyLWdyYWRpZW50KVxcKChbYS16XFxzXSspKFtcXHdcXGRcXC5cXHMsJVxcKFxcKV0rKVxcKSQvLFxuICAvXigtby1saW5lYXItZ3JhZGllbnQpXFwoKFthLXpcXHNdKykoW1xcd1xcZFxcLlxccywlXFwoXFwpXSspXFwpJC8sXG4gIC9eKC13ZWJraXQtZ3JhZGllbnQpXFwoKGxpbmVhcnxyYWRpYWwpLFxccygoPzpcXGR7MSwzfSU/KVxccyg/OlxcZHsxLDN9JT8pLFxccyg/OlxcZHsxLDN9JT8pXFxzKD86XFxkezEsM30lPykpKFtcXHdcXGRcXC5cXHMsJVxcKFxcKVxcLV0rKVxcKSQvLFxuICAvXigtbW96LWxpbmVhci1ncmFkaWVudClcXCgoKD86XFxkezEsM30lPylcXHMoPzpcXGR7MSwzfSU/KSkoW1xcd1xcZFxcLlxccywlXFwoXFwpXSspXFwpJC8sXG4gIC9eKC13ZWJraXQtcmFkaWFsLWdyYWRpZW50KVxcKCgoPzpcXGR7MSwzfSU/KVxccyg/OlxcZHsxLDN9JT8pKSxcXHMoXFx3KylcXHMoW2EtelxcLV0rKShbXFx3XFxkXFwuXFxzLCVcXChcXCldKylcXCkkLyxcbiAgL14oLW1vei1yYWRpYWwtZ3JhZGllbnQpXFwoKCg/OlxcZHsxLDN9JT8pXFxzKD86XFxkezEsM30lPykpLFxccyhcXHcrKVxccz8oW2EtelxcLV0qKShbXFx3XFxkXFwuXFxzLCVcXChcXCldKylcXCkkLyxcbiAgL14oLW8tcmFkaWFsLWdyYWRpZW50KVxcKCgoPzpcXGR7MSwzfSU/KVxccyg/OlxcZHsxLDN9JT8pKSxcXHMoXFx3KylcXHMoW2EtelxcLV0rKShbXFx3XFxkXFwuXFxzLCVcXChcXCldKylcXCkkL1xuICBdO1xuXG4gIC8qXG4gKiBUT0RPOiBBZGQgSUUxMCB2ZW5kb3IgcHJlZml4ICgtbXMpIHN1cHBvcnRcbiAqIFRPRE86IEFkZCBXM0MgZ3JhZGllbnQgKGxpbmVhci1ncmFkaWVudCkgc3VwcG9ydFxuICogVE9ETzogQWRkIG9sZCBXZWJraXQgLXdlYmtpdC1ncmFkaWVudChyYWRpYWwsIC4uLikgc3VwcG9ydFxuICogVE9ETzogTWF5YmUgc29tZSBSZWdFeHAgb3B0aW1pemF0aW9ucyBhcmUgcG9zc2libGUgO28pXG4gKi9cbiAgR2VuZXJhdGUucGFyc2VHcmFkaWVudCA9IGZ1bmN0aW9uKGNzcywgYm91bmRzKSB7XG4gICAgdmFyIGdyYWRpZW50LCBpLCBsZW4gPSByZUdyYWRpZW50cy5sZW5ndGgsIG0xLCBzdG9wLCBtMiwgbTJMZW4sIHN0ZXAsIG0zLCB0bCx0cixicixibDtcblxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSs9MSl7XG4gICAgICBtMSA9IGNzcy5tYXRjaChyZUdyYWRpZW50c1tpXSk7XG4gICAgICBpZihtMSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZihtMSkge1xuICAgICAgc3dpdGNoKG0xWzFdKSB7XG4gICAgICAgIGNhc2UgJy13ZWJraXQtbGluZWFyLWdyYWRpZW50JzpcbiAgICAgICAgY2FzZSAnLW8tbGluZWFyLWdyYWRpZW50JzpcblxuICAgICAgICAgIGdyYWRpZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICB4MDogbnVsbCxcbiAgICAgICAgICAgIHkwOiBudWxsLFxuICAgICAgICAgICAgeDE6IG51bGwsXG4gICAgICAgICAgICB5MTogbnVsbCxcbiAgICAgICAgICAgIGNvbG9yU3RvcHM6IFtdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGdldCBjb29yZGluYXRlc1xuICAgICAgICAgIG0yID0gbTFbMl0ubWF0Y2goL1xcdysvZyk7XG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgbTJMZW4gPSBtMi5sZW5ndGg7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBtMkxlbjsgaSs9MSl7XG4gICAgICAgICAgICAgIHN3aXRjaChtMltpXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC55MCA9IDA7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC55MSA9IGJvdW5kcy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0JzpcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngwID0gYm91bmRzLndpZHRoO1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgPSAwO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTAgPSBib3VuZHMuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTEgPSAwO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdsZWZ0JzpcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngwID0gMDtcbiAgICAgICAgICAgICAgICAgIGdyYWRpZW50LngxID0gYm91bmRzLndpZHRoO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoZ3JhZGllbnQueDAgPT09IG51bGwgJiYgZ3JhZGllbnQueDEgPT09IG51bGwpeyAvLyBjZW50ZXJcbiAgICAgICAgICAgIGdyYWRpZW50LngwID0gZ3JhZGllbnQueDEgPSBib3VuZHMud2lkdGggLyAyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZihncmFkaWVudC55MCA9PT0gbnVsbCAmJiBncmFkaWVudC55MSA9PT0gbnVsbCl7IC8vIGNlbnRlclxuICAgICAgICAgICAgZ3JhZGllbnQueTAgPSBncmFkaWVudC55MSA9IGJvdW5kcy5oZWlnaHQgLyAyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGdldCBjb2xvcnMgYW5kIHN0b3BzXG4gICAgICAgICAgbTIgPSBtMVszXS5tYXRjaCgvKCg/OnJnYnxyZ2JhKVxcKFxcZHsxLDN9LFxcc1xcZHsxLDN9LFxcc1xcZHsxLDN9KD86LFxcc1swLTlcXC5dKyk/XFwpKD86XFxzXFxkezEsM30oPzolfHB4KSk/KSsvZyk7XG4gICAgICAgICAgaWYobTIpe1xuICAgICAgICAgICAgbTJMZW4gPSBtMi5sZW5ndGg7XG4gICAgICAgICAgICBzdGVwID0gMSAvIE1hdGgubWF4KG0yTGVuIC0gMSwgMSk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBtMkxlbjsgaSs9MSl7XG4gICAgICAgICAgICAgIG0zID0gbTJbaV0ubWF0Y2goLygoPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKSlcXHMqKFxcZHsxLDN9KT8oJXxweCk/Lyk7XG4gICAgICAgICAgICAgIGlmKG0zWzJdKXtcbiAgICAgICAgICAgICAgICBzdG9wID0gcGFyc2VGbG9hdChtM1syXSk7XG4gICAgICAgICAgICAgICAgaWYobTNbM10gPT09ICclJyl7XG4gICAgICAgICAgICAgICAgICBzdG9wIC89IDEwMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAvLyBweCAtIHN0dXBpZCBvcGVyYVxuICAgICAgICAgICAgICAgICAgc3RvcCAvPSBib3VuZHMud2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3AgPSBpICogc3RlcDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbG9yOiBtM1sxXSxcbiAgICAgICAgICAgICAgICBzdG9wOiBzdG9wXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICctd2Via2l0LWdyYWRpZW50JzpcblxuICAgICAgICAgIGdyYWRpZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogbTFbMl0gPT09ICdyYWRpYWwnID8gJ2NpcmNsZScgOiBtMVsyXSwgLy8gVE9ETzogQWRkIHJhZGlhbCBncmFkaWVudCBzdXBwb3J0IGZvciBvbGRlciBtb3ppbGxhIGRlZmluaXRpb25zXG4gICAgICAgICAgICB4MDogMCxcbiAgICAgICAgICAgIHkwOiAwLFxuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIGNvbG9yU3RvcHM6IFtdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGdldCBjb29yZGluYXRlc1xuICAgICAgICAgIG0yID0gbTFbM10ubWF0Y2goLyhcXGR7MSwzfSklP1xccyhcXGR7MSwzfSklPyxcXHMoXFxkezEsM30pJT9cXHMoXFxkezEsM30pJT8vKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBncmFkaWVudC54MCA9IChtMlsxXSAqIGJvdW5kcy53aWR0aCkgLyAxMDA7XG4gICAgICAgICAgICBncmFkaWVudC55MCA9IChtMlsyXSAqIGJvdW5kcy5oZWlnaHQpIC8gMTAwO1xuICAgICAgICAgICAgZ3JhZGllbnQueDEgPSAobTJbM10gKiBib3VuZHMud2lkdGgpIC8gMTAwO1xuICAgICAgICAgICAgZ3JhZGllbnQueTEgPSAobTJbNF0gKiBib3VuZHMuaGVpZ2h0KSAvIDEwMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBnZXQgY29sb3JzIGFuZCBzdG9wc1xuICAgICAgICAgIG0yID0gbTFbNF0ubWF0Y2goLygoPzpmcm9tfHRvfGNvbG9yLXN0b3ApXFwoKD86WzAtOVxcLl0rLFxccyk/KD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXClcXCkpKy9nKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBtMkxlbiA9IG0yLmxlbmd0aDtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IG0yTGVuOyBpKz0xKXtcbiAgICAgICAgICAgICAgbTMgPSBtMltpXS5tYXRjaCgvKGZyb218dG98Y29sb3Itc3RvcClcXCgoWzAtOVxcLl0rKT8oPzosXFxzKT8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkpXFwpLyk7XG4gICAgICAgICAgICAgIHN0b3AgPSBwYXJzZUZsb2F0KG0zWzJdKTtcbiAgICAgICAgICAgICAgaWYobTNbMV0gPT09ICdmcm9tJykge1xuICAgICAgICAgICAgICAgIHN0b3AgPSAwLjA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYobTNbMV0gPT09ICd0bycpIHtcbiAgICAgICAgICAgICAgICBzdG9wID0gMS4wO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGdyYWRpZW50LmNvbG9yU3RvcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgY29sb3I6IG0zWzNdLFxuICAgICAgICAgICAgICAgIHN0b3A6IHN0b3BcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJy1tb3otbGluZWFyLWdyYWRpZW50JzpcblxuICAgICAgICAgIGdyYWRpZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICB4MDogMCxcbiAgICAgICAgICAgIHkwOiAwLFxuICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIGNvbG9yU3RvcHM6IFtdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIC8vIGdldCBjb29yZGluYXRlc1xuICAgICAgICAgIG0yID0gbTFbMl0ubWF0Y2goLyhcXGR7MSwzfSklP1xccyhcXGR7MSwzfSklPy8pO1xuXG4gICAgICAgICAgLy8gbTJbMV0gPT0gMCUgICAtPiBsZWZ0XG4gICAgICAgICAgLy8gbTJbMV0gPT0gNTAlICAtPiBjZW50ZXJcbiAgICAgICAgICAvLyBtMlsxXSA9PSAxMDAlIC0+IHJpZ2h0XG5cbiAgICAgICAgICAvLyBtMlsyXSA9PSAwJSAgIC0+IHRvcFxuICAgICAgICAgIC8vIG0yWzJdID09IDUwJSAgLT4gY2VudGVyXG4gICAgICAgICAgLy8gbTJbMl0gPT0gMTAwJSAtPiBib3R0b21cblxuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIGdyYWRpZW50LngwID0gKG0yWzFdICogYm91bmRzLndpZHRoKSAvIDEwMDtcbiAgICAgICAgICAgIGdyYWRpZW50LnkwID0gKG0yWzJdICogYm91bmRzLmhlaWdodCkgLyAxMDA7XG4gICAgICAgICAgICBncmFkaWVudC54MSA9IGJvdW5kcy53aWR0aCAtIGdyYWRpZW50LngwO1xuICAgICAgICAgICAgZ3JhZGllbnQueTEgPSBib3VuZHMuaGVpZ2h0IC0gZ3JhZGllbnQueTA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZ2V0IGNvbG9ycyBhbmQgc3RvcHNcbiAgICAgICAgICBtMiA9IG0xWzNdLm1hdGNoKC8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkoPzpcXHNcXGR7MSwzfSUpPykrL2cpO1xuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIG0yTGVuID0gbTIubGVuZ3RoO1xuICAgICAgICAgICAgc3RlcCA9IDEgLyBNYXRoLm1heChtMkxlbiAtIDEsIDEpO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbTJMZW47IGkrPTEpe1xuICAgICAgICAgICAgICBtMyA9IG0yW2ldLm1hdGNoKC8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkpXFxzKihcXGR7MSwzfSk/KCUpPy8pO1xuICAgICAgICAgICAgICBpZihtM1syXSl7XG4gICAgICAgICAgICAgICAgc3RvcCA9IHBhcnNlRmxvYXQobTNbMl0pO1xuICAgICAgICAgICAgICAgIGlmKG0zWzNdKXsgLy8gcGVyY2VudGFnZVxuICAgICAgICAgICAgICAgICAgc3RvcCAvPSAxMDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0b3AgPSBpICogc3RlcDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLnB1c2goe1xuICAgICAgICAgICAgICAgIGNvbG9yOiBtM1sxXSxcbiAgICAgICAgICAgICAgICBzdG9wOiBzdG9wXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICctd2Via2l0LXJhZGlhbC1ncmFkaWVudCc6XG4gICAgICAgIGNhc2UgJy1tb3otcmFkaWFsLWdyYWRpZW50JzpcbiAgICAgICAgY2FzZSAnLW8tcmFkaWFsLWdyYWRpZW50JzpcblxuICAgICAgICAgIGdyYWRpZW50ID0ge1xuICAgICAgICAgICAgdHlwZTogJ2NpcmNsZScsXG4gICAgICAgICAgICB4MDogMCxcbiAgICAgICAgICAgIHkwOiAwLFxuICAgICAgICAgICAgeDE6IGJvdW5kcy53aWR0aCxcbiAgICAgICAgICAgIHkxOiBib3VuZHMuaGVpZ2h0LFxuICAgICAgICAgICAgY3g6IDAsXG4gICAgICAgICAgICBjeTogMCxcbiAgICAgICAgICAgIHJ4OiAwLFxuICAgICAgICAgICAgcnk6IDAsXG4gICAgICAgICAgICBjb2xvclN0b3BzOiBbXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBjZW50ZXJcbiAgICAgICAgICBtMiA9IG0xWzJdLm1hdGNoKC8oXFxkezEsM30pJT9cXHMoXFxkezEsM30pJT8vKTtcbiAgICAgICAgICBpZihtMil7XG4gICAgICAgICAgICBncmFkaWVudC5jeCA9IChtMlsxXSAqIGJvdW5kcy53aWR0aCkgLyAxMDA7XG4gICAgICAgICAgICBncmFkaWVudC5jeSA9IChtMlsyXSAqIGJvdW5kcy5oZWlnaHQpIC8gMTAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIHNpemVcbiAgICAgICAgICBtMiA9IG0xWzNdLm1hdGNoKC9cXHcrLyk7XG4gICAgICAgICAgbTMgPSBtMVs0XS5tYXRjaCgvW2EtelxcLV0qLyk7XG4gICAgICAgICAgaWYobTIgJiYgbTMpe1xuICAgICAgICAgICAgc3dpdGNoKG0zWzBdKXtcbiAgICAgICAgICAgICAgY2FzZSAnZmFydGhlc3QtY29ybmVyJzpcbiAgICAgICAgICAgICAgY2FzZSAnY292ZXInOiAvLyBpcyBlcXVpdmFsZW50IHRvIGZhcnRoZXN0LWNvcm5lclxuICAgICAgICAgICAgICBjYXNlICcnOiAvLyBtb3ppbGxhIHJlbW92ZXMgXCJjb3ZlclwiIGZyb20gZGVmaW5pdGlvbiA6KFxuICAgICAgICAgICAgICAgIHRsID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LmN4LCAyKSArIE1hdGgucG93KGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgdHIgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIGJyID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIGJsID0gTWF0aC5zcXJ0KE1hdGgucG93KGdyYWRpZW50LngxIC0gZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IGdyYWRpZW50LnJ5ID0gTWF0aC5tYXgodGwsIHRyLCBiciwgYmwpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdjbG9zZXN0LWNvcm5lcic6XG4gICAgICAgICAgICAgICAgdGwgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQuY3gsIDIpICsgTWF0aC5wb3coZ3JhZGllbnQuY3ksIDIpKTtcbiAgICAgICAgICAgICAgICB0ciA9IE1hdGguc3FydChNYXRoLnBvdyhncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC55MSAtIGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgYnIgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC55MSAtIGdyYWRpZW50LmN5LCAyKSk7XG4gICAgICAgICAgICAgICAgYmwgPSBNYXRoLnNxcnQoTWF0aC5wb3coZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCwgMikgKyBNYXRoLnBvdyhncmFkaWVudC5jeSwgMikpO1xuICAgICAgICAgICAgICAgIGdyYWRpZW50LnJ4ID0gZ3JhZGllbnQucnkgPSBNYXRoLm1pbih0bCwgdHIsIGJyLCBibCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2ZhcnRoZXN0LXNpZGUnOlxuICAgICAgICAgICAgICAgIGlmKG0yWzBdID09PSAnY2lyY2xlJyl7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IGdyYWRpZW50LnJ5ID0gTWF0aC5tYXgoXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN4LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeSxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGVsbGlwc2VcblxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQudHlwZSA9IG0yWzBdO1xuXG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IE1hdGgubWF4KFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQucnkgPSBNYXRoLm1heChcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3ksXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3lcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgJ2Nsb3Nlc3Qtc2lkZSc6XG4gICAgICAgICAgICAgIGNhc2UgJ2NvbnRhaW4nOiAvLyBpcyBlcXVpdmFsZW50IHRvIGNsb3Nlc3Qtc2lkZVxuICAgICAgICAgICAgICAgIGlmKG0yWzBdID09PSAnY2lyY2xlJyl7XG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IGdyYWRpZW50LnJ5ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LmN4LFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeSxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueTEgLSBncmFkaWVudC5jeVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7IC8vIGVsbGlwc2VcblxuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQudHlwZSA9IG0yWzBdO1xuXG4gICAgICAgICAgICAgICAgICBncmFkaWVudC5yeCA9IE1hdGgubWluKFxuICAgICAgICAgICAgICAgICAgICBncmFkaWVudC5jeCxcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQueDEgLSBncmFkaWVudC5jeFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgZ3JhZGllbnQucnkgPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnQuY3ksXG4gICAgICAgICAgICAgICAgICAgIGdyYWRpZW50LnkxIC0gZ3JhZGllbnQuY3lcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBcIjMwcHggNDBweFwiIHNpemVzICh3ZWJraXQgb25seSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjb2xvciBzdG9wc1xuICAgICAgICAgIG0yID0gbTFbNV0ubWF0Y2goLygoPzpyZ2J8cmdiYSlcXChcXGR7MSwzfSxcXHNcXGR7MSwzfSxcXHNcXGR7MSwzfSg/OixcXHNbMC05XFwuXSspP1xcKSg/Olxcc1xcZHsxLDN9KD86JXxweCkpPykrL2cpO1xuICAgICAgICAgIGlmKG0yKXtcbiAgICAgICAgICAgIG0yTGVuID0gbTIubGVuZ3RoO1xuICAgICAgICAgICAgc3RlcCA9IDEgLyBNYXRoLm1heChtMkxlbiAtIDEsIDEpO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbTJMZW47IGkrPTEpe1xuICAgICAgICAgICAgICBtMyA9IG0yW2ldLm1hdGNoKC8oKD86cmdifHJnYmEpXFwoXFxkezEsM30sXFxzXFxkezEsM30sXFxzXFxkezEsM30oPzosXFxzWzAtOVxcLl0rKT9cXCkpXFxzKihcXGR7MSwzfSk/KCV8cHgpPy8pO1xuICAgICAgICAgICAgICBpZihtM1syXSl7XG4gICAgICAgICAgICAgICAgc3RvcCA9IHBhcnNlRmxvYXQobTNbMl0pO1xuICAgICAgICAgICAgICAgIGlmKG0zWzNdID09PSAnJScpe1xuICAgICAgICAgICAgICAgICAgc3RvcCAvPSAxMDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gcHggLSBzdHVwaWQgb3BlcmFcbiAgICAgICAgICAgICAgICAgIHN0b3AgLz0gYm91bmRzLndpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9wID0gaSAqIHN0ZXA7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZ3JhZGllbnQuY29sb3JTdG9wcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBjb2xvcjogbTNbMV0sXG4gICAgICAgICAgICAgICAgc3RvcDogc3RvcFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyYWRpZW50O1xuICB9O1xuXG4gIGZ1bmN0aW9uIGFkZFNjcm9sbFN0b3BzKGdyYWQpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY29sb3JTdG9wKSB7XG4gICAgICB0cnkge1xuICAgICAgICBncmFkLmFkZENvbG9yU3RvcChjb2xvclN0b3Auc3RvcCwgY29sb3JTdG9wLmNvbG9yKTtcbiAgICAgIH1cbiAgICAgIGNhdGNoKGUpIHtcbiAgICAgICAgVXRpbC5sb2coWydmYWlsZWQgdG8gYWRkIGNvbG9yIHN0b3A6ICcsIGUsICc7IHRyaWVkIHRvIGFkZDogJywgY29sb3JTdG9wXSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIEdlbmVyYXRlLkdyYWRpZW50ID0gZnVuY3Rpb24oc3JjLCBib3VuZHMpIHtcbiAgICBpZihib3VuZHMud2lkdGggPT09IDAgfHwgYm91bmRzLmhlaWdodCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSxcbiAgICBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSxcbiAgICBncmFkaWVudCwgZ3JhZDtcblxuICAgIGNhbnZhcy53aWR0aCA9IGJvdW5kcy53aWR0aDtcbiAgICBjYW52YXMuaGVpZ2h0ID0gYm91bmRzLmhlaWdodDtcblxuICAgIC8vIFRPRE86IGFkZCBzdXBwb3J0IGZvciBtdWx0aSBkZWZpbmVkIGJhY2tncm91bmQgZ3JhZGllbnRzXG4gICAgZ3JhZGllbnQgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUucGFyc2VHcmFkaWVudChzcmMsIGJvdW5kcyk7XG5cbiAgICBpZihncmFkaWVudCkge1xuICAgICAgc3dpdGNoKGdyYWRpZW50LnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbGluZWFyJzpcbiAgICAgICAgICBncmFkID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KGdyYWRpZW50LngwLCBncmFkaWVudC55MCwgZ3JhZGllbnQueDEsIGdyYWRpZW50LnkxKTtcbiAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLmZvckVhY2goYWRkU2Nyb2xsU3RvcHMoZ3JhZCkpO1xuICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBncmFkO1xuICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ2NpcmNsZSc6XG4gICAgICAgICAgZ3JhZCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudChncmFkaWVudC5jeCwgZ3JhZGllbnQuY3ksIDAsIGdyYWRpZW50LmN4LCBncmFkaWVudC5jeSwgZ3JhZGllbnQucngpO1xuICAgICAgICAgIGdyYWRpZW50LmNvbG9yU3RvcHMuZm9yRWFjaChhZGRTY3JvbGxTdG9wcyhncmFkKSk7XG4gICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGdyYWQ7XG4gICAgICAgICAgY3R4LmZpbGxSZWN0KDAsIDAsIGJvdW5kcy53aWR0aCwgYm91bmRzLmhlaWdodCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAnZWxsaXBzZSc6XG4gICAgICAgICAgdmFyIGNhbnZhc1JhZGlhbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLFxuICAgICAgICAgICAgY3R4UmFkaWFsID0gY2FudmFzUmFkaWFsLmdldENvbnRleHQoJzJkJyksXG4gICAgICAgICAgICByaSA9IE1hdGgubWF4KGdyYWRpZW50LnJ4LCBncmFkaWVudC5yeSksXG4gICAgICAgICAgICBkaSA9IHJpICogMjtcblxuICAgICAgICAgIGNhbnZhc1JhZGlhbC53aWR0aCA9IGNhbnZhc1JhZGlhbC5oZWlnaHQgPSBkaTtcblxuICAgICAgICAgIGdyYWQgPSBjdHhSYWRpYWwuY3JlYXRlUmFkaWFsR3JhZGllbnQoZ3JhZGllbnQucngsIGdyYWRpZW50LnJ5LCAwLCBncmFkaWVudC5yeCwgZ3JhZGllbnQucnksIHJpKTtcbiAgICAgICAgICBncmFkaWVudC5jb2xvclN0b3BzLmZvckVhY2goYWRkU2Nyb2xsU3RvcHMoZ3JhZCkpO1xuXG4gICAgICAgICAgY3R4UmFkaWFsLmZpbGxTdHlsZSA9IGdyYWQ7XG4gICAgICAgICAgY3R4UmFkaWFsLmZpbGxSZWN0KDAsIDAsIGRpLCBkaSk7XG5cbiAgICAgICAgICBjdHguZmlsbFN0eWxlID0gZ3JhZGllbnQuY29sb3JTdG9wc1tncmFkaWVudC5jb2xvclN0b3BzLmxlbmd0aCAtIDFdLmNvbG9yO1xuICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoY2FudmFzUmFkaWFsLCBncmFkaWVudC5jeCAtIGdyYWRpZW50LnJ4LCBncmFkaWVudC5jeSAtIGdyYWRpZW50LnJ5LCAyICogZ3JhZGllbnQucngsIDIgKiBncmFkaWVudC5yeSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfTtcblxuICBHZW5lcmF0ZS5MaXN0QWxwaGEgPSBmdW5jdGlvbihudW1iZXIpIHtcbiAgICB2YXIgdG1wID0gXCJcIixcbiAgICBtb2R1bHVzO1xuXG4gICAgZG8ge1xuICAgICAgbW9kdWx1cyA9IG51bWJlciAlIDI2O1xuICAgICAgdG1wID0gU3RyaW5nLmZyb21DaGFyQ29kZSgobW9kdWx1cykgKyA2NCkgKyB0bXA7XG4gICAgICBudW1iZXIgPSBudW1iZXIgLyAyNjtcbiAgICB9d2hpbGUoKG51bWJlcioyNikgPiAyNik7XG5cbiAgICByZXR1cm4gdG1wO1xuICB9O1xuXG4gIEdlbmVyYXRlLkxpc3RSb21hbiA9IGZ1bmN0aW9uKG51bWJlcikge1xuICAgIHZhciByb21hbkFycmF5ID0gW1wiTVwiLCBcIkNNXCIsIFwiRFwiLCBcIkNEXCIsIFwiQ1wiLCBcIlhDXCIsIFwiTFwiLCBcIlhMXCIsIFwiWFwiLCBcIklYXCIsIFwiVlwiLCBcIklWXCIsIFwiSVwiXSxcbiAgICBkZWNpbWFsID0gWzEwMDAsIDkwMCwgNTAwLCA0MDAsIDEwMCwgOTAsIDUwLCA0MCwgMTAsIDksIDUsIDQsIDFdLFxuICAgIHJvbWFuID0gXCJcIixcbiAgICB2LFxuICAgIGxlbiA9IHJvbWFuQXJyYXkubGVuZ3RoO1xuXG4gICAgaWYgKG51bWJlciA8PSAwIHx8IG51bWJlciA+PSA0MDAwKSB7XG4gICAgICByZXR1cm4gbnVtYmVyO1xuICAgIH1cblxuICAgIGZvciAodj0wOyB2IDwgbGVuOyB2Kz0xKSB7XG4gICAgICB3aGlsZSAobnVtYmVyID49IGRlY2ltYWxbdl0pIHtcbiAgICAgICAgbnVtYmVyIC09IGRlY2ltYWxbdl07XG4gICAgICAgIHJvbWFuICs9IHJvbWFuQXJyYXlbdl07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvbWFuO1xuICB9O1xufSkoKTtcbmZ1bmN0aW9uIGgyY1JlbmRlckNvbnRleHQod2lkdGgsIGhlaWdodCkge1xuICB2YXIgc3RvcmFnZSA9IFtdO1xuICByZXR1cm4ge1xuICAgIHN0b3JhZ2U6IHN0b3JhZ2UsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIGNsaXA6IGZ1bmN0aW9uKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImNsaXBcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICB0cmFuc2xhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcInRyYW5zbGF0ZVwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZpbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImZpbGxcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBzYXZlOiBmdW5jdGlvbigpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJzYXZlXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVzdG9yZTogZnVuY3Rpb24oKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwicmVzdG9yZVwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZpbGxSZWN0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwiZmlsbFJlY3RcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBjcmVhdGVQYXR0ZXJuOiBmdW5jdGlvbigpIHtcbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJjcmVhdGVQYXR0ZXJuXCIsXG4gICAgICAgICdhcmd1bWVudHMnOiBhcmd1bWVudHNcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZHJhd1NoYXBlOiBmdW5jdGlvbigpIHtcblxuICAgICAgdmFyIHNoYXBlID0gW107XG5cbiAgICAgIHN0b3JhZ2UucHVzaCh7XG4gICAgICAgIHR5cGU6IFwiZnVuY3Rpb25cIixcbiAgICAgICAgbmFtZTogXCJkcmF3U2hhcGVcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IHNoYXBlXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW92ZVRvOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICBzaGFwZS5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IFwibW92ZVRvXCIsXG4gICAgICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxpbmVUbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcGUucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImxpbmVUb1wiLFxuICAgICAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBhcmNUbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgc2hhcGUucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBcImFyY1RvXCIsXG4gICAgICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGJlemllckN1cnZlVG86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXBlLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJiZXppZXJDdXJ2ZVRvXCIsXG4gICAgICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIHF1YWRyYXRpY0N1cnZlVG86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHNoYXBlLnB1c2goe1xuICAgICAgICAgICAgbmFtZTogXCJxdWFkcmF0aWNDdXJ2ZVRvXCIsXG4gICAgICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICB9LFxuICAgIGRyYXdJbWFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJmdW5jdGlvblwiLFxuICAgICAgICBuYW1lOiBcImRyYXdJbWFnZVwiLFxuICAgICAgICAnYXJndW1lbnRzJzogYXJndW1lbnRzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIGZpbGxUZXh0OiBmdW5jdGlvbiAoKSB7XG4gICAgICBzdG9yYWdlLnB1c2goe1xuICAgICAgICB0eXBlOiBcImZ1bmN0aW9uXCIsXG4gICAgICAgIG5hbWU6IFwiZmlsbFRleHRcIixcbiAgICAgICAgJ2FyZ3VtZW50cyc6IGFyZ3VtZW50c1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBzZXRWYXJpYWJsZTogZnVuY3Rpb24gKHZhcmlhYmxlLCB2YWx1ZSkge1xuICAgICAgc3RvcmFnZS5wdXNoKHtcbiAgICAgICAgdHlwZTogXCJ2YXJpYWJsZVwiLFxuICAgICAgICBuYW1lOiB2YXJpYWJsZSxcbiAgICAgICAgJ2FyZ3VtZW50cyc6IHZhbHVlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gIH07XG59XG5faHRtbDJjYW52YXMuUGFyc2UgPSBmdW5jdGlvbiAoaW1hZ2VzLCBvcHRpb25zKSB7XG4gIHdpbmRvdy5zY3JvbGwoMCwwKTtcblxuICB2YXIgZWxlbWVudCA9ICgoIG9wdGlvbnMuZWxlbWVudHMgPT09IHVuZGVmaW5lZCApID8gZG9jdW1lbnQuYm9keSA6IG9wdGlvbnMuZWxlbWVudHNbMF0pLCAvLyBzZWxlY3QgYm9keSBieSBkZWZhdWx0XG4gIG51bURyYXdzID0gMCxcbiAgZG9jID0gZWxlbWVudC5vd25lckRvY3VtZW50LFxuICBVdGlsID0gX2h0bWwyY2FudmFzLlV0aWwsXG4gIHN1cHBvcnQgPSBVdGlsLlN1cHBvcnQob3B0aW9ucywgZG9jKSxcbiAgaWdub3JlRWxlbWVudHNSZWdFeHAgPSBuZXcgUmVnRXhwKFwiKFwiICsgb3B0aW9ucy5pZ25vcmVFbGVtZW50cyArIFwiKVwiKSxcbiAgYm9keSA9IGRvYy5ib2R5LFxuICBnZXRDU1MgPSBVdGlsLmdldENTUyxcbiAgcHNldWRvSGlkZSA9IFwiX19faHRtbDJjYW52YXNfX19wc2V1ZG9lbGVtZW50XCIsXG4gIGhpZGVQc2V1ZG9FbGVtZW50cyA9IGRvYy5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuXG4gIGhpZGVQc2V1ZG9FbGVtZW50cy5pbm5lckhUTUwgPSAnLicgKyBwc2V1ZG9IaWRlICsgJy1iZWZvcmU6YmVmb3JlIHsgY29udGVudDogXCJcIiAhaW1wb3J0YW50OyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0nICtcbiAgJy4nICsgcHNldWRvSGlkZSArICctYWZ0ZXI6YWZ0ZXIgeyBjb250ZW50OiBcIlwiICFpbXBvcnRhbnQ7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsgfSc7XG5cbiAgYm9keS5hcHBlbmRDaGlsZChoaWRlUHNldWRvRWxlbWVudHMpO1xuXG4gIGltYWdlcyA9IGltYWdlcyB8fCB7fTtcblxuICBmdW5jdGlvbiBkb2N1bWVudFdpZHRoICgpIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5zY3JvbGxXaWR0aCwgZG9jLmRvY3VtZW50RWxlbWVudC5zY3JvbGxXaWR0aCksXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5vZmZzZXRXaWR0aCwgZG9jLmRvY3VtZW50RWxlbWVudC5vZmZzZXRXaWR0aCksXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5jbGllbnRXaWR0aCwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aClcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBkb2N1bWVudEhlaWdodCAoKSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KFxuICAgICAgTWF0aC5tYXgoZG9jLmJvZHkuc2Nyb2xsSGVpZ2h0LCBkb2MuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCksXG4gICAgICBNYXRoLm1heChkb2MuYm9keS5vZmZzZXRIZWlnaHQsIGRvYy5kb2N1bWVudEVsZW1lbnQub2Zmc2V0SGVpZ2h0KSxcbiAgICAgIE1hdGgubWF4KGRvYy5ib2R5LmNsaWVudEhlaWdodCwgZG9jLmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQpXG4gICAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q1NTSW50KGVsZW1lbnQsIGF0dHJpYnV0ZSkge1xuICAgIHZhciB2YWwgPSBwYXJzZUludChnZXRDU1MoZWxlbWVudCwgYXR0cmlidXRlKSwgMTApO1xuICAgIHJldHVybiAoaXNOYU4odmFsKSkgPyAwIDogdmFsOyAvLyBib3JkZXJzIGluIG9sZCBJRSBhcmUgdGhyb3dpbmcgJ21lZGl1bScgZm9yIGRlbW8uaHRtbFxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyUmVjdCAoY3R4LCB4LCB5LCB3LCBoLCBiZ2NvbG9yKSB7XG4gICAgaWYgKGJnY29sb3IgIT09IFwidHJhbnNwYXJlbnRcIil7XG4gICAgICBjdHguc2V0VmFyaWFibGUoXCJmaWxsU3R5bGVcIiwgYmdjb2xvcik7XG4gICAgICBjdHguZmlsbFJlY3QoeCwgeSwgdywgaCk7XG4gICAgICBudW1EcmF3cys9MTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjYXBpdGFsaXplKG0sIHAxLCBwMikge1xuICAgIGlmIChtLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBwMSArIHAyLnRvVXBwZXJDYXNlKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdGV4dFRyYW5zZm9ybSAodGV4dCwgdHJhbnNmb3JtKSB7XG4gICAgc3dpdGNoKHRyYW5zZm9ybSl7XG4gICAgICBjYXNlIFwibG93ZXJjYXNlXCI6XG4gICAgICAgIHJldHVybiB0ZXh0LnRvTG93ZXJDYXNlKCk7XG4gICAgICBjYXNlIFwiY2FwaXRhbGl6ZVwiOlxuICAgICAgICByZXR1cm4gdGV4dC5yZXBsYWNlKCAvKF58XFxzfDp8LXxcXCh8XFwpKShbYS16XSkvZywgY2FwaXRhbGl6ZSk7XG4gICAgICBjYXNlIFwidXBwZXJjYXNlXCI6XG4gICAgICAgIHJldHVybiB0ZXh0LnRvVXBwZXJDYXNlKCk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gdGV4dDtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBub0xldHRlclNwYWNpbmcobGV0dGVyX3NwYWNpbmcpIHtcbiAgICByZXR1cm4gKC9eKG5vcm1hbHxub25lfDBweCkkLy50ZXN0KGxldHRlcl9zcGFjaW5nKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3VGV4dChjdXJyZW50VGV4dCwgeCwgeSwgY3R4KXtcbiAgICBpZiAoY3VycmVudFRleHQgIT09IG51bGwgJiYgVXRpbC50cmltVGV4dChjdXJyZW50VGV4dCkubGVuZ3RoID4gMCkge1xuICAgICAgY3R4LmZpbGxUZXh0KGN1cnJlbnRUZXh0LCB4LCB5KTtcbiAgICAgIG51bURyYXdzKz0xO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldFRleHRWYXJpYWJsZXMoY3R4LCBlbCwgdGV4dF9kZWNvcmF0aW9uLCBjb2xvcikge1xuICAgIHZhciBhbGlnbiA9IGZhbHNlLFxuICAgIGJvbGQgPSBnZXRDU1MoZWwsIFwiZm9udFdlaWdodFwiKSxcbiAgICBmYW1pbHkgPSBnZXRDU1MoZWwsIFwiZm9udEZhbWlseVwiKSxcbiAgICBzaXplID0gZ2V0Q1NTKGVsLCBcImZvbnRTaXplXCIpLFxuICAgIHNoYWRvd3MgPSBVdGlsLnBhcnNlVGV4dFNoYWRvd3MoZ2V0Q1NTKGVsLCBcInRleHRTaGFkb3dcIikpO1xuXG4gICAgc3dpdGNoKHBhcnNlSW50KGJvbGQsIDEwKSl7XG4gICAgICBjYXNlIDQwMTpcbiAgICAgICAgYm9sZCA9IFwiYm9sZFwiO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgNDAwOlxuICAgICAgICBib2xkID0gXCJub3JtYWxcIjtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY3R4LnNldFZhcmlhYmxlKFwiZmlsbFN0eWxlXCIsIGNvbG9yKTtcbiAgICBjdHguc2V0VmFyaWFibGUoXCJmb250XCIsIFtnZXRDU1MoZWwsIFwiZm9udFN0eWxlXCIpLCBnZXRDU1MoZWwsIFwiZm9udFZhcmlhbnRcIiksIGJvbGQsIHNpemUsIGZhbWlseV0uam9pbihcIiBcIikpO1xuICAgIGN0eC5zZXRWYXJpYWJsZShcInRleHRBbGlnblwiLCAoYWxpZ24pID8gXCJyaWdodFwiIDogXCJsZWZ0XCIpO1xuXG4gICAgaWYgKHNoYWRvd3MubGVuZ3RoKSB7XG4gICAgICAvLyBUT0RPOiBzdXBwb3J0IG11bHRpcGxlIHRleHQgc2hhZG93c1xuICAgICAgLy8gYXBwbHkgdGhlIGZpcnN0IHRleHQgc2hhZG93XG4gICAgICBjdHguc2V0VmFyaWFibGUoXCJzaGFkb3dDb2xvclwiLCBzaGFkb3dzWzBdLmNvbG9yKTtcbiAgICAgIGN0eC5zZXRWYXJpYWJsZShcInNoYWRvd09mZnNldFhcIiwgc2hhZG93c1swXS5vZmZzZXRYKTtcbiAgICAgIGN0eC5zZXRWYXJpYWJsZShcInNoYWRvd09mZnNldFlcIiwgc2hhZG93c1swXS5vZmZzZXRZKTtcbiAgICAgIGN0eC5zZXRWYXJpYWJsZShcInNoYWRvd0JsdXJcIiwgc2hhZG93c1swXS5ibHVyKTtcbiAgICB9XG5cbiAgICBpZiAodGV4dF9kZWNvcmF0aW9uICE9PSBcIm5vbmVcIil7XG4gICAgICByZXR1cm4gVXRpbC5Gb250KGZhbWlseSwgc2l6ZSwgZG9jKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJUZXh0RGVjb3JhdGlvbihjdHgsIHRleHRfZGVjb3JhdGlvbiwgYm91bmRzLCBtZXRyaWNzLCBjb2xvcikge1xuICAgIHN3aXRjaCh0ZXh0X2RlY29yYXRpb24pIHtcbiAgICAgIGNhc2UgXCJ1bmRlcmxpbmVcIjpcbiAgICAgICAgLy8gRHJhd3MgYSBsaW5lIGF0IHRoZSBiYXNlbGluZSBvZiB0aGUgZm9udFxuICAgICAgICAvLyBUT0RPIEFzIHNvbWUgYnJvd3NlcnMgZGlzcGxheSB0aGUgbGluZSBhcyBtb3JlIHRoYW4gMXB4IGlmIHRoZSBmb250LXNpemUgaXMgYmlnLCBuZWVkIHRvIHRha2UgdGhhdCBpbnRvIGFjY291bnQgYm90aCBpbiBwb3NpdGlvbiBhbmQgc2l6ZVxuICAgICAgICByZW5kZXJSZWN0KGN0eCwgYm91bmRzLmxlZnQsIE1hdGgucm91bmQoYm91bmRzLnRvcCArIG1ldHJpY3MuYmFzZWxpbmUgKyBtZXRyaWNzLmxpbmVXaWR0aCksIGJvdW5kcy53aWR0aCwgMSwgY29sb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJvdmVybGluZVwiOlxuICAgICAgICByZW5kZXJSZWN0KGN0eCwgYm91bmRzLmxlZnQsIE1hdGgucm91bmQoYm91bmRzLnRvcCksIGJvdW5kcy53aWR0aCwgMSwgY29sb3IpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJsaW5lLXRocm91Z2hcIjpcbiAgICAgICAgLy8gVE9ETyB0cnkgYW5kIGZpbmQgZXhhY3QgcG9zaXRpb24gZm9yIGxpbmUtdGhyb3VnaFxuICAgICAgICByZW5kZXJSZWN0KGN0eCwgYm91bmRzLmxlZnQsIE1hdGguY2VpbChib3VuZHMudG9wICsgbWV0cmljcy5taWRkbGUgKyBtZXRyaWNzLmxpbmVXaWR0aCksIGJvdW5kcy53aWR0aCwgMSwgY29sb3IpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUZXh0Qm91bmRzKHN0YXRlLCB0ZXh0LCB0ZXh0RGVjb3JhdGlvbiwgaXNMYXN0LCB0cmFuc2Zvcm0pIHtcbiAgICB2YXIgYm91bmRzO1xuICAgIGlmIChzdXBwb3J0LnJhbmdlQm91bmRzICYmICF0cmFuc2Zvcm0pIHtcbiAgICAgIGlmICh0ZXh0RGVjb3JhdGlvbiAhPT0gXCJub25lXCIgfHwgVXRpbC50cmltVGV4dCh0ZXh0KS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgYm91bmRzID0gdGV4dFJhbmdlQm91bmRzKHRleHQsIHN0YXRlLm5vZGUsIHN0YXRlLnRleHRPZmZzZXQpO1xuICAgICAgfVxuICAgICAgc3RhdGUudGV4dE9mZnNldCArPSB0ZXh0Lmxlbmd0aDtcbiAgICB9IGVsc2UgaWYgKHN0YXRlLm5vZGUgJiYgdHlwZW9mIHN0YXRlLm5vZGUubm9kZVZhbHVlID09PSBcInN0cmluZ1wiICl7XG4gICAgICB2YXIgbmV3VGV4dE5vZGUgPSAoaXNMYXN0KSA/IHN0YXRlLm5vZGUuc3BsaXRUZXh0KHRleHQubGVuZ3RoKSA6IG51bGw7XG4gICAgICBib3VuZHMgPSB0ZXh0V3JhcHBlckJvdW5kcyhzdGF0ZS5ub2RlLCB0cmFuc2Zvcm0pO1xuICAgICAgc3RhdGUubm9kZSA9IG5ld1RleHROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gdGV4dFJhbmdlQm91bmRzKHRleHQsIHRleHROb2RlLCB0ZXh0T2Zmc2V0KSB7XG4gICAgdmFyIHJhbmdlID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgcmFuZ2Uuc2V0U3RhcnQodGV4dE5vZGUsIHRleHRPZmZzZXQpO1xuICAgIHJhbmdlLnNldEVuZCh0ZXh0Tm9kZSwgdGV4dE9mZnNldCArIHRleHQubGVuZ3RoKTtcbiAgICByZXR1cm4gcmFuZ2UuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIH1cblxuICBmdW5jdGlvbiB0ZXh0V3JhcHBlckJvdW5kcyhvbGRUZXh0Tm9kZSwgdHJhbnNmb3JtKSB7XG4gICAgdmFyIHBhcmVudCA9IG9sZFRleHROb2RlLnBhcmVudE5vZGUsXG4gICAgd3JhcEVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnd3JhcHBlcicpLFxuICAgIGJhY2t1cFRleHQgPSBvbGRUZXh0Tm9kZS5jbG9uZU5vZGUodHJ1ZSk7XG5cbiAgICB3cmFwRWxlbWVudC5hcHBlbmRDaGlsZChvbGRUZXh0Tm9kZS5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgIHBhcmVudC5yZXBsYWNlQ2hpbGQod3JhcEVsZW1lbnQsIG9sZFRleHROb2RlKTtcblxuICAgIHZhciBib3VuZHMgPSB0cmFuc2Zvcm0gPyBVdGlsLk9mZnNldEJvdW5kcyh3cmFwRWxlbWVudCkgOiBVdGlsLkJvdW5kcyh3cmFwRWxlbWVudCk7XG4gICAgcGFyZW50LnJlcGxhY2VDaGlsZChiYWNrdXBUZXh0LCB3cmFwRWxlbWVudCk7XG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclRleHQoZWwsIHRleHROb2RlLCBzdGFjaykge1xuICAgIHZhciBjdHggPSBzdGFjay5jdHgsXG4gICAgY29sb3IgPSBnZXRDU1MoZWwsIFwiY29sb3JcIiksXG4gICAgdGV4dERlY29yYXRpb24gPSBnZXRDU1MoZWwsIFwidGV4dERlY29yYXRpb25cIiksXG4gICAgdGV4dEFsaWduID0gZ2V0Q1NTKGVsLCBcInRleHRBbGlnblwiKSxcbiAgICBtZXRyaWNzLFxuICAgIHRleHRMaXN0LFxuICAgIHN0YXRlID0ge1xuICAgICAgbm9kZTogdGV4dE5vZGUsXG4gICAgICB0ZXh0T2Zmc2V0OiAwXG4gICAgfTtcblxuICAgIGlmIChVdGlsLnRyaW1UZXh0KHRleHROb2RlLm5vZGVWYWx1ZSkubGVuZ3RoID4gMCkge1xuICAgICAgdGV4dE5vZGUubm9kZVZhbHVlID0gdGV4dFRyYW5zZm9ybSh0ZXh0Tm9kZS5ub2RlVmFsdWUsIGdldENTUyhlbCwgXCJ0ZXh0VHJhbnNmb3JtXCIpKTtcbiAgICAgIHRleHRBbGlnbiA9IHRleHRBbGlnbi5yZXBsYWNlKFtcIi13ZWJraXQtYXV0b1wiXSxbXCJhdXRvXCJdKTtcblxuICAgICAgdGV4dExpc3QgPSAoIW9wdGlvbnMubGV0dGVyUmVuZGVyaW5nICYmIC9eKGxlZnR8cmlnaHR8anVzdGlmeXxhdXRvKSQvLnRlc3QodGV4dEFsaWduKSAmJiBub0xldHRlclNwYWNpbmcoZ2V0Q1NTKGVsLCBcImxldHRlclNwYWNpbmdcIikpKSA/XG4gICAgICB0ZXh0Tm9kZS5ub2RlVmFsdWUuc3BsaXQoLyhcXGJ8ICkvKVxuICAgICAgOiB0ZXh0Tm9kZS5ub2RlVmFsdWUuc3BsaXQoXCJcIik7XG5cbiAgICAgIG1ldHJpY3MgPSBzZXRUZXh0VmFyaWFibGVzKGN0eCwgZWwsIHRleHREZWNvcmF0aW9uLCBjb2xvcik7XG5cbiAgICAgIGlmIChvcHRpb25zLmNoaW5lc2UpIHtcbiAgICAgICAgdGV4dExpc3QuZm9yRWFjaChmdW5jdGlvbih3b3JkLCBpbmRleCkge1xuICAgICAgICAgIGlmICgvLipbXFx1NEUwMC1cXHU5RkE1XS4qJC8udGVzdCh3b3JkKSkge1xuICAgICAgICAgICAgd29yZCA9IHdvcmQuc3BsaXQoXCJcIik7XG4gICAgICAgICAgICB3b3JkLnVuc2hpZnQoaW5kZXgsIDEpO1xuICAgICAgICAgICAgdGV4dExpc3Quc3BsaWNlLmFwcGx5KHRleHRMaXN0LCB3b3JkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB0ZXh0TGlzdC5mb3JFYWNoKGZ1bmN0aW9uKHRleHQsIGluZGV4KSB7XG4gICAgICAgIHZhciBib3VuZHMgPSBnZXRUZXh0Qm91bmRzKHN0YXRlLCB0ZXh0LCB0ZXh0RGVjb3JhdGlvbiwgKGluZGV4IDwgdGV4dExpc3QubGVuZ3RoIC0gMSksIHN0YWNrLnRyYW5zZm9ybS5tYXRyaXgpO1xuICAgICAgICBpZiAoYm91bmRzKSB7XG4gICAgICAgICAgZHJhd1RleHQodGV4dCwgYm91bmRzLmxlZnQsIGJvdW5kcy5ib3R0b20sIGN0eCk7XG4gICAgICAgICAgcmVuZGVyVGV4dERlY29yYXRpb24oY3R4LCB0ZXh0RGVjb3JhdGlvbiwgYm91bmRzLCBtZXRyaWNzLCBjb2xvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RQb3NpdGlvbiAoZWxlbWVudCwgdmFsKSB7XG4gICAgdmFyIGJvdW5kRWxlbWVudCA9IGRvYy5jcmVhdGVFbGVtZW50KCBcImJvdW5kZWxlbWVudFwiICksXG4gICAgb3JpZ2luYWxUeXBlLFxuICAgIGJvdW5kcztcblxuICAgIGJvdW5kRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJpbmxpbmVcIjtcblxuICAgIG9yaWdpbmFsVHlwZSA9IGVsZW1lbnQuc3R5bGUubGlzdFN0eWxlVHlwZTtcbiAgICBlbGVtZW50LnN0eWxlLmxpc3RTdHlsZVR5cGUgPSBcIm5vbmVcIjtcblxuICAgIGJvdW5kRWxlbWVudC5hcHBlbmRDaGlsZChkb2MuY3JlYXRlVGV4dE5vZGUodmFsKSk7XG5cbiAgICBlbGVtZW50Lmluc2VydEJlZm9yZShib3VuZEVsZW1lbnQsIGVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cbiAgICBib3VuZHMgPSBVdGlsLkJvdW5kcyhib3VuZEVsZW1lbnQpO1xuICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoYm91bmRFbGVtZW50KTtcbiAgICBlbGVtZW50LnN0eWxlLmxpc3RTdHlsZVR5cGUgPSBvcmlnaW5hbFR5cGU7XG4gICAgcmV0dXJuIGJvdW5kcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGVsZW1lbnRJbmRleChlbCkge1xuICAgIHZhciBpID0gLTEsXG4gICAgY291bnQgPSAxLFxuICAgIGNoaWxkcyA9IGVsLnBhcmVudE5vZGUuY2hpbGROb2RlcztcblxuICAgIGlmIChlbC5wYXJlbnROb2RlKSB7XG4gICAgICB3aGlsZShjaGlsZHNbKytpXSAhPT0gZWwpIHtcbiAgICAgICAgaWYgKGNoaWxkc1tpXS5ub2RlVHlwZSA9PT0gMSkge1xuICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjb3VudDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxpc3RJdGVtVGV4dChlbGVtZW50LCB0eXBlKSB7XG4gICAgdmFyIGN1cnJlbnRJbmRleCA9IGVsZW1lbnRJbmRleChlbGVtZW50KSwgdGV4dDtcbiAgICBzd2l0Y2godHlwZSl7XG4gICAgICBjYXNlIFwiZGVjaW1hbFwiOlxuICAgICAgICB0ZXh0ID0gY3VycmVudEluZGV4O1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJkZWNpbWFsLWxlYWRpbmctemVyb1wiOlxuICAgICAgICB0ZXh0ID0gKGN1cnJlbnRJbmRleC50b1N0cmluZygpLmxlbmd0aCA9PT0gMSkgPyBjdXJyZW50SW5kZXggPSBcIjBcIiArIGN1cnJlbnRJbmRleC50b1N0cmluZygpIDogY3VycmVudEluZGV4LnRvU3RyaW5nKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcInVwcGVyLXJvbWFuXCI6XG4gICAgICAgIHRleHQgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUuTGlzdFJvbWFuKCBjdXJyZW50SW5kZXggKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwibG93ZXItcm9tYW5cIjpcbiAgICAgICAgdGV4dCA9IF9odG1sMmNhbnZhcy5HZW5lcmF0ZS5MaXN0Um9tYW4oIGN1cnJlbnRJbmRleCApLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImxvd2VyLWFscGhhXCI6XG4gICAgICAgIHRleHQgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUuTGlzdEFscGhhKCBjdXJyZW50SW5kZXggKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJ1cHBlci1hbHBoYVwiOlxuICAgICAgICB0ZXh0ID0gX2h0bWwyY2FudmFzLkdlbmVyYXRlLkxpc3RBbHBoYSggY3VycmVudEluZGV4ICk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0ICsgXCIuIFwiO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyTGlzdEl0ZW0oZWxlbWVudCwgc3RhY2ssIGVsQm91bmRzKSB7XG4gICAgdmFyIHgsXG4gICAgdGV4dCxcbiAgICBjdHggPSBzdGFjay5jdHgsXG4gICAgdHlwZSA9IGdldENTUyhlbGVtZW50LCBcImxpc3RTdHlsZVR5cGVcIiksXG4gICAgbGlzdEJvdW5kcztcblxuICAgIGlmICgvXihkZWNpbWFsfGRlY2ltYWwtbGVhZGluZy16ZXJvfHVwcGVyLWFscGhhfHVwcGVyLWxhdGlufHVwcGVyLXJvbWFufGxvd2VyLWFscGhhfGxvd2VyLWdyZWVrfGxvd2VyLWxhdGlufGxvd2VyLXJvbWFuKSQvaS50ZXN0KHR5cGUpKSB7XG4gICAgICB0ZXh0ID0gbGlzdEl0ZW1UZXh0KGVsZW1lbnQsIHR5cGUpO1xuICAgICAgbGlzdEJvdW5kcyA9IGxpc3RQb3NpdGlvbihlbGVtZW50LCB0ZXh0KTtcbiAgICAgIHNldFRleHRWYXJpYWJsZXMoY3R4LCBlbGVtZW50LCBcIm5vbmVcIiwgZ2V0Q1NTKGVsZW1lbnQsIFwiY29sb3JcIikpO1xuXG4gICAgICBpZiAoZ2V0Q1NTKGVsZW1lbnQsIFwibGlzdFN0eWxlUG9zaXRpb25cIikgPT09IFwiaW5zaWRlXCIpIHtcbiAgICAgICAgY3R4LnNldFZhcmlhYmxlKFwidGV4dEFsaWduXCIsIFwibGVmdFwiKTtcbiAgICAgICAgeCA9IGVsQm91bmRzLmxlZnQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGRyYXdUZXh0KHRleHQsIHgsIGxpc3RCb3VuZHMuYm90dG9tLCBjdHgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRJbWFnZSAoc3JjKXtcbiAgICB2YXIgaW1nID0gaW1hZ2VzW3NyY107XG4gICAgcmV0dXJuIChpbWcgJiYgaW1nLnN1Y2NlZWRlZCA9PT0gdHJ1ZSkgPyBpbWcuaW1nIDogZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBjbGlwQm91bmRzKHNyYywgZHN0KXtcbiAgICB2YXIgeCA9IE1hdGgubWF4KHNyYy5sZWZ0LCBkc3QubGVmdCksXG4gICAgeSA9IE1hdGgubWF4KHNyYy50b3AsIGRzdC50b3ApLFxuICAgIHgyID0gTWF0aC5taW4oKHNyYy5sZWZ0ICsgc3JjLndpZHRoKSwgKGRzdC5sZWZ0ICsgZHN0LndpZHRoKSksXG4gICAgeTIgPSBNYXRoLm1pbigoc3JjLnRvcCArIHNyYy5oZWlnaHQpLCAoZHN0LnRvcCArIGRzdC5oZWlnaHQpKTtcblxuICAgIHJldHVybiB7XG4gICAgICBsZWZ0OngsXG4gICAgICB0b3A6eSxcbiAgICAgIHdpZHRoOngyLXgsXG4gICAgICBoZWlnaHQ6eTIteVxuICAgIH07XG4gIH1cblxuICBmdW5jdGlvbiBzZXRaKGVsZW1lbnQsIHN0YWNrLCBwYXJlbnRTdGFjayl7XG4gICAgdmFyIG5ld0NvbnRleHQsXG4gICAgaXNQb3NpdGlvbmVkID0gc3RhY2suY3NzUG9zaXRpb24gIT09ICdzdGF0aWMnLFxuICAgIHpJbmRleCA9IGlzUG9zaXRpb25lZCA/IGdldENTUyhlbGVtZW50LCAnekluZGV4JykgOiAnYXV0bycsXG4gICAgb3BhY2l0eSA9IGdldENTUyhlbGVtZW50LCAnb3BhY2l0eScpLFxuICAgIGlzRmxvYXRlZCA9IGdldENTUyhlbGVtZW50LCAnY3NzRmxvYXQnKSAhPT0gJ25vbmUnO1xuXG4gICAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvR3VpZGUvQ1NTL1VuZGVyc3RhbmRpbmdfel9pbmRleC9UaGVfc3RhY2tpbmdfY29udGV4dFxuICAgIC8vIFdoZW4gYSBuZXcgc3RhY2tpbmcgY29udGV4dCBzaG91bGQgYmUgY3JlYXRlZDpcbiAgICAvLyB0aGUgcm9vdCBlbGVtZW50IChIVE1MKSxcbiAgICAvLyBwb3NpdGlvbmVkIChhYnNvbHV0ZWx5IG9yIHJlbGF0aXZlbHkpIHdpdGggYSB6LWluZGV4IHZhbHVlIG90aGVyIHRoYW4gXCJhdXRvXCIsXG4gICAgLy8gZWxlbWVudHMgd2l0aCBhbiBvcGFjaXR5IHZhbHVlIGxlc3MgdGhhbiAxLiAoU2VlIHRoZSBzcGVjaWZpY2F0aW9uIGZvciBvcGFjaXR5KSxcbiAgICAvLyBvbiBtb2JpbGUgV2ViS2l0IGFuZCBDaHJvbWUgMjIrLCBwb3NpdGlvbjogZml4ZWQgYWx3YXlzIGNyZWF0ZXMgYSBuZXcgc3RhY2tpbmcgY29udGV4dCwgZXZlbiB3aGVuIHotaW5kZXggaXMgXCJhdXRvXCIgKFNlZSB0aGlzIHBvc3QpXG5cbiAgICBzdGFjay56SW5kZXggPSBuZXdDb250ZXh0ID0gaDJjekNvbnRleHQoekluZGV4KTtcbiAgICBuZXdDb250ZXh0LmlzUG9zaXRpb25lZCA9IGlzUG9zaXRpb25lZDtcbiAgICBuZXdDb250ZXh0LmlzRmxvYXRlZCA9IGlzRmxvYXRlZDtcbiAgICBuZXdDb250ZXh0Lm9wYWNpdHkgPSBvcGFjaXR5O1xuICAgIG5ld0NvbnRleHQub3duU3RhY2tpbmcgPSAoekluZGV4ICE9PSAnYXV0bycgfHwgb3BhY2l0eSA8IDEpO1xuXG4gICAgaWYgKHBhcmVudFN0YWNrKSB7XG4gICAgICBwYXJlbnRTdGFjay56SW5kZXguY2hpbGRyZW4ucHVzaChzdGFjayk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVySW1hZ2UoY3R4LCBlbGVtZW50LCBpbWFnZSwgYm91bmRzLCBib3JkZXJzKSB7XG5cbiAgICB2YXIgcGFkZGluZ0xlZnQgPSBnZXRDU1NJbnQoZWxlbWVudCwgJ3BhZGRpbmdMZWZ0JyksXG4gICAgcGFkZGluZ1RvcCA9IGdldENTU0ludChlbGVtZW50LCAncGFkZGluZ1RvcCcpLFxuICAgIHBhZGRpbmdSaWdodCA9IGdldENTU0ludChlbGVtZW50LCAncGFkZGluZ1JpZ2h0JyksXG4gICAgcGFkZGluZ0JvdHRvbSA9IGdldENTU0ludChlbGVtZW50LCAncGFkZGluZ0JvdHRvbScpO1xuXG4gICAgZHJhd0ltYWdlKFxuICAgICAgY3R4LFxuICAgICAgaW1hZ2UsXG4gICAgICAwLCAvL3N4XG4gICAgICAwLCAvL3N5XG4gICAgICBpbWFnZS53aWR0aCwgLy9zd1xuICAgICAgaW1hZ2UuaGVpZ2h0LCAvL3NoXG4gICAgICBib3VuZHMubGVmdCArIHBhZGRpbmdMZWZ0ICsgYm9yZGVyc1szXS53aWR0aCwgLy9keFxuICAgICAgYm91bmRzLnRvcCArIHBhZGRpbmdUb3AgKyBib3JkZXJzWzBdLndpZHRoLCAvLyBkeVxuICAgICAgYm91bmRzLndpZHRoIC0gKGJvcmRlcnNbMV0ud2lkdGggKyBib3JkZXJzWzNdLndpZHRoICsgcGFkZGluZ0xlZnQgKyBwYWRkaW5nUmlnaHQpLCAvL2R3XG4gICAgICBib3VuZHMuaGVpZ2h0IC0gKGJvcmRlcnNbMF0ud2lkdGggKyBib3JkZXJzWzJdLndpZHRoICsgcGFkZGluZ1RvcCArIHBhZGRpbmdCb3R0b20pIC8vZGhcbiAgICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCb3JkZXJEYXRhKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gW1wiVG9wXCIsIFwiUmlnaHRcIiwgXCJCb3R0b21cIiwgXCJMZWZ0XCJdLm1hcChmdW5jdGlvbihzaWRlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB3aWR0aDogZ2V0Q1NTSW50KGVsZW1lbnQsICdib3JkZXInICsgc2lkZSArICdXaWR0aCcpLFxuICAgICAgICBjb2xvcjogZ2V0Q1NTKGVsZW1lbnQsICdib3JkZXInICsgc2lkZSArICdDb2xvcicpXG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm9yZGVyUmFkaXVzRGF0YShlbGVtZW50KSB7XG4gICAgcmV0dXJuIFtcIlRvcExlZnRcIiwgXCJUb3BSaWdodFwiLCBcIkJvdHRvbVJpZ2h0XCIsIFwiQm90dG9tTGVmdFwiXS5tYXAoZnVuY3Rpb24oc2lkZSkge1xuICAgICAgcmV0dXJuIGdldENTUyhlbGVtZW50LCAnYm9yZGVyJyArIHNpZGUgKyAnUmFkaXVzJyk7XG4gICAgfSk7XG4gIH1cblxuICB2YXIgZ2V0Q3VydmVQb2ludHMgPSAoZnVuY3Rpb24oa2FwcGEpIHtcblxuICAgIHJldHVybiBmdW5jdGlvbih4LCB5LCByMSwgcjIpIHtcbiAgICAgIHZhciBveCA9IChyMSkgKiBrYXBwYSwgLy8gY29udHJvbCBwb2ludCBvZmZzZXQgaG9yaXpvbnRhbFxuICAgICAgb3kgPSAocjIpICoga2FwcGEsIC8vIGNvbnRyb2wgcG9pbnQgb2Zmc2V0IHZlcnRpY2FsXG4gICAgICB4bSA9IHggKyByMSwgLy8geC1taWRkbGVcbiAgICAgIHltID0geSArIHIyOyAvLyB5LW1pZGRsZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9wTGVmdDogYmV6aWVyQ3VydmUoe1xuICAgICAgICAgIHg6eCxcbiAgICAgICAgICB5OnltXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OngsXG4gICAgICAgICAgeTp5bSAtIG95XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtIC0gb3gsXG4gICAgICAgICAgeTp5XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtLFxuICAgICAgICAgIHk6eVxuICAgICAgICB9KSxcbiAgICAgICAgdG9wUmlnaHQ6IGJlemllckN1cnZlKHtcbiAgICAgICAgICB4OngsXG4gICAgICAgICAgeTp5XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnggKyBveCxcbiAgICAgICAgICB5OnlcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eG0sXG4gICAgICAgICAgeTp5bSAtIG95XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtLFxuICAgICAgICAgIHk6eW1cbiAgICAgICAgfSksXG4gICAgICAgIGJvdHRvbVJpZ2h0OiBiZXppZXJDdXJ2ZSh7XG4gICAgICAgICAgeDp4bSxcbiAgICAgICAgICB5OnlcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eG0sXG4gICAgICAgICAgeTp5ICsgb3lcbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eCArIG94LFxuICAgICAgICAgIHk6eW1cbiAgICAgICAgfSwge1xuICAgICAgICAgIHg6eCxcbiAgICAgICAgICB5OnltXG4gICAgICAgIH0pLFxuICAgICAgICBib3R0b21MZWZ0OiBiZXppZXJDdXJ2ZSh7XG4gICAgICAgICAgeDp4bSxcbiAgICAgICAgICB5OnltXG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OnhtIC0gb3gsXG4gICAgICAgICAgeTp5bVxuICAgICAgICB9LCB7XG4gICAgICAgICAgeDp4LFxuICAgICAgICAgIHk6eSArIG95XG4gICAgICAgIH0sIHtcbiAgICAgICAgICB4OngsXG4gICAgICAgICAgeTp5XG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgIH07XG4gIH0pKDQgKiAoKE1hdGguc3FydCgyKSAtIDEpIC8gMykpO1xuXG4gIGZ1bmN0aW9uIGJlemllckN1cnZlKHN0YXJ0LCBzdGFydENvbnRyb2wsIGVuZENvbnRyb2wsIGVuZCkge1xuXG4gICAgdmFyIGxlcnAgPSBmdW5jdGlvbiAoYSwgYiwgdCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDphLnggKyAoYi54IC0gYS54KSAqIHQsXG4gICAgICAgIHk6YS55ICsgKGIueSAtIGEueSkgKiB0XG4gICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgc3RhcnRDb250cm9sOiBzdGFydENvbnRyb2wsXG4gICAgICBlbmRDb250cm9sOiBlbmRDb250cm9sLFxuICAgICAgZW5kOiBlbmQsXG4gICAgICBzdWJkaXZpZGU6IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgdmFyIGFiID0gbGVycChzdGFydCwgc3RhcnRDb250cm9sLCB0KSxcbiAgICAgICAgYmMgPSBsZXJwKHN0YXJ0Q29udHJvbCwgZW5kQ29udHJvbCwgdCksXG4gICAgICAgIGNkID0gbGVycChlbmRDb250cm9sLCBlbmQsIHQpLFxuICAgICAgICBhYmJjID0gbGVycChhYiwgYmMsIHQpLFxuICAgICAgICBiY2NkID0gbGVycChiYywgY2QsIHQpLFxuICAgICAgICBkZXN0ID0gbGVycChhYmJjLCBiY2NkLCB0KTtcbiAgICAgICAgcmV0dXJuIFtiZXppZXJDdXJ2ZShzdGFydCwgYWIsIGFiYmMsIGRlc3QpLCBiZXppZXJDdXJ2ZShkZXN0LCBiY2NkLCBjZCwgZW5kKV07XG4gICAgICB9LFxuICAgICAgY3VydmVUbzogZnVuY3Rpb24oYm9yZGVyQXJncykge1xuICAgICAgICBib3JkZXJBcmdzLnB1c2goW1wiYmV6aWVyQ3VydmVcIiwgc3RhcnRDb250cm9sLngsIHN0YXJ0Q29udHJvbC55LCBlbmRDb250cm9sLngsIGVuZENvbnRyb2wueSwgZW5kLngsIGVuZC55XSk7XG4gICAgICB9LFxuICAgICAgY3VydmVUb1JldmVyc2VkOiBmdW5jdGlvbihib3JkZXJBcmdzKSB7XG4gICAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJiZXppZXJDdXJ2ZVwiLCBlbmRDb250cm9sLngsIGVuZENvbnRyb2wueSwgc3RhcnRDb250cm9sLngsIHN0YXJ0Q29udHJvbC55LCBzdGFydC54LCBzdGFydC55XSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1czEsIHJhZGl1czIsIGNvcm5lcjEsIGNvcm5lcjIsIHgsIHkpIHtcbiAgICBpZiAocmFkaXVzMVswXSA+IDAgfHwgcmFkaXVzMVsxXSA+IDApIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGNvcm5lcjFbMF0uc3RhcnQueCwgY29ybmVyMVswXS5zdGFydC55XSk7XG4gICAgICBjb3JuZXIxWzBdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgICBjb3JuZXIxWzFdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIHgsIHldKTtcbiAgICB9XG5cbiAgICBpZiAocmFkaXVzMlswXSA+IDAgfHwgcmFkaXVzMlsxXSA+IDApIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIGNvcm5lcjJbMF0uc3RhcnQueCwgY29ybmVyMlswXS5zdGFydC55XSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZHJhd1NpZGUoYm9yZGVyRGF0YSwgcmFkaXVzMSwgcmFkaXVzMiwgb3V0ZXIxLCBpbm5lcjEsIG91dGVyMiwgaW5uZXIyKSB7XG4gICAgdmFyIGJvcmRlckFyZ3MgPSBbXTtcblxuICAgIGlmIChyYWRpdXMxWzBdID4gMCB8fCByYWRpdXMxWzFdID4gMCkge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFtcImxpbmVcIiwgb3V0ZXIxWzFdLnN0YXJ0LngsIG91dGVyMVsxXS5zdGFydC55XSk7XG4gICAgICBvdXRlcjFbMV0uY3VydmVUbyhib3JkZXJBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFsgXCJsaW5lXCIsIGJvcmRlckRhdGEuYzFbMF0sIGJvcmRlckRhdGEuYzFbMV1dKTtcbiAgICB9XG5cbiAgICBpZiAocmFkaXVzMlswXSA+IDAgfHwgcmFkaXVzMlsxXSA+IDApIHtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbXCJsaW5lXCIsIG91dGVyMlswXS5zdGFydC54LCBvdXRlcjJbMF0uc3RhcnQueV0pO1xuICAgICAgb3V0ZXIyWzBdLmN1cnZlVG8oYm9yZGVyQXJncyk7XG4gICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBpbm5lcjJbMF0uZW5kLngsIGlubmVyMlswXS5lbmQueV0pO1xuICAgICAgaW5uZXIyWzBdLmN1cnZlVG9SZXZlcnNlZChib3JkZXJBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFsgXCJsaW5lXCIsIGJvcmRlckRhdGEuYzJbMF0sIGJvcmRlckRhdGEuYzJbMV1dKTtcbiAgICAgIGJvcmRlckFyZ3MucHVzaChbIFwibGluZVwiLCBib3JkZXJEYXRhLmMzWzBdLCBib3JkZXJEYXRhLmMzWzFdXSk7XG4gICAgfVxuXG4gICAgaWYgKHJhZGl1czFbMF0gPiAwIHx8IHJhZGl1czFbMV0gPiAwKSB7XG4gICAgICBib3JkZXJBcmdzLnB1c2goW1wibGluZVwiLCBpbm5lcjFbMV0uZW5kLngsIGlubmVyMVsxXS5lbmQueV0pO1xuICAgICAgaW5uZXIxWzFdLmN1cnZlVG9SZXZlcnNlZChib3JkZXJBcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYm9yZGVyQXJncy5wdXNoKFsgXCJsaW5lXCIsIGJvcmRlckRhdGEuYzRbMF0sIGJvcmRlckRhdGEuYzRbMV1dKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYm9yZGVyQXJncztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbGN1bGF0ZUN1cnZlUG9pbnRzKGJvdW5kcywgYm9yZGVyUmFkaXVzLCBib3JkZXJzKSB7XG5cbiAgICB2YXIgeCA9IGJvdW5kcy5sZWZ0LFxuICAgIHkgPSBib3VuZHMudG9wLFxuICAgIHdpZHRoID0gYm91bmRzLndpZHRoLFxuICAgIGhlaWdodCA9IGJvdW5kcy5oZWlnaHQsXG5cbiAgICB0bGggPSBib3JkZXJSYWRpdXNbMF1bMF0sXG4gICAgdGx2ID0gYm9yZGVyUmFkaXVzWzBdWzFdLFxuICAgIHRyaCA9IGJvcmRlclJhZGl1c1sxXVswXSxcbiAgICB0cnYgPSBib3JkZXJSYWRpdXNbMV1bMV0sXG4gICAgYnJoID0gYm9yZGVyUmFkaXVzWzJdWzBdLFxuICAgIGJydiA9IGJvcmRlclJhZGl1c1syXVsxXSxcbiAgICBibGggPSBib3JkZXJSYWRpdXNbM11bMF0sXG4gICAgYmx2ID0gYm9yZGVyUmFkaXVzWzNdWzFdLFxuXG4gICAgdG9wV2lkdGggPSB3aWR0aCAtIHRyaCxcbiAgICByaWdodEhlaWdodCA9IGhlaWdodCAtIGJydixcbiAgICBib3R0b21XaWR0aCA9IHdpZHRoIC0gYnJoLFxuICAgIGxlZnRIZWlnaHQgPSBoZWlnaHQgLSBibHY7XG5cbiAgICByZXR1cm4ge1xuICAgICAgdG9wTGVmdE91dGVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCxcbiAgICAgICAgeSxcbiAgICAgICAgdGxoLFxuICAgICAgICB0bHZcbiAgICAgICAgKS50b3BMZWZ0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICB0b3BMZWZ0SW5uZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgYm9yZGVyc1szXS53aWR0aCxcbiAgICAgICAgeSArIGJvcmRlcnNbMF0ud2lkdGgsXG4gICAgICAgIE1hdGgubWF4KDAsIHRsaCAtIGJvcmRlcnNbM10ud2lkdGgpLFxuICAgICAgICBNYXRoLm1heCgwLCB0bHYgLSBib3JkZXJzWzBdLndpZHRoKVxuICAgICAgICApLnRvcExlZnQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIHRvcFJpZ2h0T3V0ZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgdG9wV2lkdGgsXG4gICAgICAgIHksXG4gICAgICAgIHRyaCxcbiAgICAgICAgdHJ2XG4gICAgICAgICkudG9wUmlnaHQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIHRvcFJpZ2h0SW5uZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgTWF0aC5taW4odG9wV2lkdGgsIHdpZHRoICsgYm9yZGVyc1szXS53aWR0aCksXG4gICAgICAgIHkgKyBib3JkZXJzWzBdLndpZHRoLFxuICAgICAgICAodG9wV2lkdGggPiB3aWR0aCArIGJvcmRlcnNbM10ud2lkdGgpID8gMCA6dHJoIC0gYm9yZGVyc1szXS53aWR0aCxcbiAgICAgICAgdHJ2IC0gYm9yZGVyc1swXS53aWR0aFxuICAgICAgICApLnRvcFJpZ2h0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICBib3R0b21SaWdodE91dGVyOiBnZXRDdXJ2ZVBvaW50cyhcbiAgICAgICAgeCArIGJvdHRvbVdpZHRoLFxuICAgICAgICB5ICsgcmlnaHRIZWlnaHQsXG4gICAgICAgIGJyaCxcbiAgICAgICAgYnJ2XG4gICAgICAgICkuYm90dG9tUmlnaHQuc3ViZGl2aWRlKDAuNSksXG5cbiAgICAgIGJvdHRvbVJpZ2h0SW5uZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgTWF0aC5taW4oYm90dG9tV2lkdGgsIHdpZHRoICsgYm9yZGVyc1szXS53aWR0aCksXG4gICAgICAgIHkgKyBNYXRoLm1pbihyaWdodEhlaWdodCwgaGVpZ2h0ICsgYm9yZGVyc1swXS53aWR0aCksXG4gICAgICAgIE1hdGgubWF4KDAsIGJyaCAtIGJvcmRlcnNbMV0ud2lkdGgpLFxuICAgICAgICBNYXRoLm1heCgwLCBicnYgLSBib3JkZXJzWzJdLndpZHRoKVxuICAgICAgICApLmJvdHRvbVJpZ2h0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICBib3R0b21MZWZ0T3V0ZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4LFxuICAgICAgICB5ICsgbGVmdEhlaWdodCxcbiAgICAgICAgYmxoLFxuICAgICAgICBibHZcbiAgICAgICAgKS5ib3R0b21MZWZ0LnN1YmRpdmlkZSgwLjUpLFxuXG4gICAgICBib3R0b21MZWZ0SW5uZXI6IGdldEN1cnZlUG9pbnRzKFxuICAgICAgICB4ICsgYm9yZGVyc1szXS53aWR0aCxcbiAgICAgICAgeSArIGxlZnRIZWlnaHQsXG4gICAgICAgIE1hdGgubWF4KDAsIGJsaCAtIGJvcmRlcnNbM10ud2lkdGgpLFxuICAgICAgICBNYXRoLm1heCgwLCBibHYgLSBib3JkZXJzWzJdLndpZHRoKVxuICAgICAgICApLmJvdHRvbUxlZnQuc3ViZGl2aWRlKDAuNSlcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Qm9yZGVyQ2xpcChlbGVtZW50LCBib3JkZXJQb2ludHMsIGJvcmRlcnMsIHJhZGl1cywgYm91bmRzKSB7XG4gICAgdmFyIGJhY2tncm91bmRDbGlwID0gZ2V0Q1NTKGVsZW1lbnQsICdiYWNrZ3JvdW5kQ2xpcCcpLFxuICAgIGJvcmRlckFyZ3MgPSBbXTtcblxuICAgIHN3aXRjaChiYWNrZ3JvdW5kQ2xpcCkge1xuICAgICAgY2FzZSBcImNvbnRlbnQtYm94XCI6XG4gICAgICBjYXNlIFwicGFkZGluZy1ib3hcIjpcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzBdLCByYWRpdXNbMV0sIGJvcmRlclBvaW50cy50b3BMZWZ0SW5uZXIsIGJvcmRlclBvaW50cy50b3BSaWdodElubmVyLCBib3VuZHMubGVmdCArIGJvcmRlcnNbM10ud2lkdGgsIGJvdW5kcy50b3AgKyBib3JkZXJzWzBdLndpZHRoKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzFdLCByYWRpdXNbMl0sIGJvcmRlclBvaW50cy50b3BSaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRJbm5lciwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggLSBib3JkZXJzWzFdLndpZHRoLCBib3VuZHMudG9wICsgYm9yZGVyc1swXS53aWR0aCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1syXSwgcmFkaXVzWzNdLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRJbm5lciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lciwgYm91bmRzLmxlZnQgKyBib3VuZHMud2lkdGggLSBib3JkZXJzWzFdLndpZHRoLCBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCAtIGJvcmRlcnNbMl0ud2lkdGgpO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbM10sIHJhZGl1c1swXSwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lciwgYm9yZGVyUG9pbnRzLnRvcExlZnRJbm5lciwgYm91bmRzLmxlZnQgKyBib3JkZXJzWzNdLndpZHRoLCBib3VuZHMudG9wICsgYm91bmRzLmhlaWdodCAtIGJvcmRlcnNbMl0ud2lkdGgpO1xuICAgICAgICBicmVhaztcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzBdLCByYWRpdXNbMV0sIGJvcmRlclBvaW50cy50b3BMZWZ0T3V0ZXIsIGJvcmRlclBvaW50cy50b3BSaWdodE91dGVyLCBib3VuZHMubGVmdCwgYm91bmRzLnRvcCk7XG4gICAgICAgIHBhcnNlQ29ybmVyKGJvcmRlckFyZ3MsIHJhZGl1c1sxXSwgcmFkaXVzWzJdLCBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0T3V0ZXIsIGJvdW5kcy5sZWZ0ICsgYm91bmRzLndpZHRoLCBib3VuZHMudG9wKTtcbiAgICAgICAgcGFyc2VDb3JuZXIoYm9yZGVyQXJncywgcmFkaXVzWzJdLCByYWRpdXNbM10sIGJvcmRlclBvaW50cy5ib3R0b21SaWdodE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdE91dGVyLCBib3VuZHMubGVmdCArIGJvdW5kcy53aWR0aCwgYm91bmRzLnRvcCArIGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICBwYXJzZUNvcm5lcihib3JkZXJBcmdzLCByYWRpdXNbM10sIHJhZGl1c1swXSwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcExlZnRPdXRlciwgYm91bmRzLmxlZnQsIGJvdW5kcy50b3AgKyBib3VuZHMuaGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvcmRlckFyZ3M7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUJvcmRlcnMoZWxlbWVudCwgYm91bmRzLCBib3JkZXJzKXtcbiAgICB2YXIgeCA9IGJvdW5kcy5sZWZ0LFxuICAgIHkgPSBib3VuZHMudG9wLFxuICAgIHdpZHRoID0gYm91bmRzLndpZHRoLFxuICAgIGhlaWdodCA9IGJvdW5kcy5oZWlnaHQsXG4gICAgYm9yZGVyU2lkZSxcbiAgICBieCxcbiAgICBieSxcbiAgICBidyxcbiAgICBiaCxcbiAgICBib3JkZXJBcmdzLFxuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtYmFja2dyb3VuZC8jdGhlLWJvcmRlci1yYWRpdXNcbiAgICBib3JkZXJSYWRpdXMgPSBnZXRCb3JkZXJSYWRpdXNEYXRhKGVsZW1lbnQpLFxuICAgIGJvcmRlclBvaW50cyA9IGNhbGN1bGF0ZUN1cnZlUG9pbnRzKGJvdW5kcywgYm9yZGVyUmFkaXVzLCBib3JkZXJzKSxcbiAgICBib3JkZXJEYXRhID0ge1xuICAgICAgY2xpcDogZ2V0Qm9yZGVyQ2xpcChlbGVtZW50LCBib3JkZXJQb2ludHMsIGJvcmRlcnMsIGJvcmRlclJhZGl1cywgYm91bmRzKSxcbiAgICAgIGJvcmRlcnM6IFtdXG4gICAgfTtcblxuICAgIGZvciAoYm9yZGVyU2lkZSA9IDA7IGJvcmRlclNpZGUgPCA0OyBib3JkZXJTaWRlKyspIHtcblxuICAgICAgaWYgKGJvcmRlcnNbYm9yZGVyU2lkZV0ud2lkdGggPiAwKSB7XG4gICAgICAgIGJ4ID0geDtcbiAgICAgICAgYnkgPSB5O1xuICAgICAgICBidyA9IHdpZHRoO1xuICAgICAgICBiaCA9IGhlaWdodCAtIChib3JkZXJzWzJdLndpZHRoKTtcblxuICAgICAgICBzd2l0Y2goYm9yZGVyU2lkZSkge1xuICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIC8vIHRvcCBib3JkZXJcbiAgICAgICAgICAgIGJoID0gYm9yZGVyc1swXS53aWR0aDtcblxuICAgICAgICAgICAgYm9yZGVyQXJncyA9IGRyYXdTaWRlKHtcbiAgICAgICAgICAgICAgYzE6IFtieCwgYnldLFxuICAgICAgICAgICAgICBjMjogW2J4ICsgYncsIGJ5XSxcbiAgICAgICAgICAgICAgYzM6IFtieCArIGJ3IC0gYm9yZGVyc1sxXS53aWR0aCwgYnkgKyBiaF0sXG4gICAgICAgICAgICAgIGM0OiBbYnggKyBib3JkZXJzWzNdLndpZHRoLCBieSArIGJoXVxuICAgICAgICAgICAgfSwgYm9yZGVyUmFkaXVzWzBdLCBib3JkZXJSYWRpdXNbMV0sXG4gICAgICAgICAgICBib3JkZXJQb2ludHMudG9wTGVmdE91dGVyLCBib3JkZXJQb2ludHMudG9wTGVmdElubmVyLCBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0SW5uZXIpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgLy8gcmlnaHQgYm9yZGVyXG4gICAgICAgICAgICBieCA9IHggKyB3aWR0aCAtIChib3JkZXJzWzFdLndpZHRoKTtcbiAgICAgICAgICAgIGJ3ID0gYm9yZGVyc1sxXS53aWR0aDtcblxuICAgICAgICAgICAgYm9yZGVyQXJncyA9IGRyYXdTaWRlKHtcbiAgICAgICAgICAgICAgYzE6IFtieCArIGJ3LCBieV0sXG4gICAgICAgICAgICAgIGMyOiBbYnggKyBidywgYnkgKyBiaCArIGJvcmRlcnNbMl0ud2lkdGhdLFxuICAgICAgICAgICAgICBjMzogW2J4LCBieSArIGJoXSxcbiAgICAgICAgICAgICAgYzQ6IFtieCwgYnkgKyBib3JkZXJzWzBdLndpZHRoXVxuICAgICAgICAgICAgfSwgYm9yZGVyUmFkaXVzWzFdLCBib3JkZXJSYWRpdXNbMl0sXG4gICAgICAgICAgICBib3JkZXJQb2ludHMudG9wUmlnaHRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcFJpZ2h0SW5uZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tUmlnaHRJbm5lcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAvLyBib3R0b20gYm9yZGVyXG4gICAgICAgICAgICBieSA9IChieSArIGhlaWdodCkgLSAoYm9yZGVyc1syXS53aWR0aCk7XG4gICAgICAgICAgICBiaCA9IGJvcmRlcnNbMl0ud2lkdGg7XG5cbiAgICAgICAgICAgIGJvcmRlckFyZ3MgPSBkcmF3U2lkZSh7XG4gICAgICAgICAgICAgIGMxOiBbYnggKyBidywgYnkgKyBiaF0sXG4gICAgICAgICAgICAgIGMyOiBbYngsIGJ5ICsgYmhdLFxuICAgICAgICAgICAgICBjMzogW2J4ICsgYm9yZGVyc1szXS53aWR0aCwgYnldLFxuICAgICAgICAgICAgICBjNDogW2J4ICsgYncgLSBib3JkZXJzWzNdLndpZHRoLCBieV1cbiAgICAgICAgICAgIH0sIGJvcmRlclJhZGl1c1syXSwgYm9yZGVyUmFkaXVzWzNdLFxuICAgICAgICAgICAgYm9yZGVyUG9pbnRzLmJvdHRvbVJpZ2h0T3V0ZXIsIGJvcmRlclBvaW50cy5ib3R0b21SaWdodElubmVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdE91dGVyLCBib3JkZXJQb2ludHMuYm90dG9tTGVmdElubmVyKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIC8vIGxlZnQgYm9yZGVyXG4gICAgICAgICAgICBidyA9IGJvcmRlcnNbM10ud2lkdGg7XG5cbiAgICAgICAgICAgIGJvcmRlckFyZ3MgPSBkcmF3U2lkZSh7XG4gICAgICAgICAgICAgIGMxOiBbYngsIGJ5ICsgYmggKyBib3JkZXJzWzJdLndpZHRoXSxcbiAgICAgICAgICAgICAgYzI6IFtieCwgYnldLFxuICAgICAgICAgICAgICBjMzogW2J4ICsgYncsIGJ5ICsgYm9yZGVyc1swXS53aWR0aF0sXG4gICAgICAgICAgICAgIGM0OiBbYnggKyBidywgYnkgKyBiaF1cbiAgICAgICAgICAgIH0sIGJvcmRlclJhZGl1c1szXSwgYm9yZGVyUmFkaXVzWzBdLFxuICAgICAgICAgICAgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRPdXRlciwgYm9yZGVyUG9pbnRzLmJvdHRvbUxlZnRJbm5lciwgYm9yZGVyUG9pbnRzLnRvcExlZnRPdXRlciwgYm9yZGVyUG9pbnRzLnRvcExlZnRJbm5lcik7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGJvcmRlckRhdGEuYm9yZGVycy5wdXNoKHtcbiAgICAgICAgICBhcmdzOiBib3JkZXJBcmdzLFxuICAgICAgICAgIGNvbG9yOiBib3JkZXJzW2JvcmRlclNpZGVdLmNvbG9yXG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvcmRlckRhdGE7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZShjdHgsIGFyZ3MpIHtcbiAgICB2YXIgc2hhcGUgPSBjdHguZHJhd1NoYXBlKCk7XG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGJvcmRlciwgaW5kZXgpIHtcbiAgICAgIHNoYXBlWyhpbmRleCA9PT0gMCkgPyBcIm1vdmVUb1wiIDogYm9yZGVyWzBdICsgXCJUb1wiIF0uYXBwbHkobnVsbCwgYm9yZGVyLnNsaWNlKDEpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2hhcGU7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJCb3JkZXJzKGN0eCwgYm9yZGVyQXJncywgY29sb3IpIHtcbiAgICBpZiAoY29sb3IgIT09IFwidHJhbnNwYXJlbnRcIikge1xuICAgICAgY3R4LnNldFZhcmlhYmxlKCBcImZpbGxTdHlsZVwiLCBjb2xvcik7XG4gICAgICBjcmVhdGVTaGFwZShjdHgsIGJvcmRlckFyZ3MpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIG51bURyYXdzKz0xO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckZvcm1WYWx1ZSAoZWwsIGJvdW5kcywgc3RhY2spe1xuXG4gICAgdmFyIHZhbHVlV3JhcCA9IGRvYy5jcmVhdGVFbGVtZW50KCd2YWx1ZXdyYXAnKSxcbiAgICBjc3NQcm9wZXJ0eUFycmF5ID0gWydsaW5lSGVpZ2h0JywndGV4dEFsaWduJywnZm9udEZhbWlseScsJ2NvbG9yJywnZm9udFNpemUnLCdwYWRkaW5nTGVmdCcsJ3BhZGRpbmdUb3AnLCd3aWR0aCcsJ2hlaWdodCcsJ2JvcmRlcicsJ2JvcmRlckxlZnRXaWR0aCcsJ2JvcmRlclRvcFdpZHRoJ10sXG4gICAgdGV4dFZhbHVlLFxuICAgIHRleHROb2RlO1xuXG4gICAgY3NzUHJvcGVydHlBcnJheS5mb3JFYWNoKGZ1bmN0aW9uKHByb3BlcnR5KSB7XG4gICAgICB0cnkge1xuICAgICAgICB2YWx1ZVdyYXAuc3R5bGVbcHJvcGVydHldID0gZ2V0Q1NTKGVsLCBwcm9wZXJ0eSk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgLy8gT2xkZXIgSUUgaGFzIGlzc3VlcyB3aXRoIFwiYm9yZGVyXCJcbiAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogUGFyc2U6IEV4Y2VwdGlvbiBjYXVnaHQgaW4gcmVuZGVyRm9ybVZhbHVlOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YWx1ZVdyYXAuc3R5bGUuYm9yZGVyQ29sb3IgPSBcImJsYWNrXCI7XG4gICAgdmFsdWVXcmFwLnN0eWxlLmJvcmRlclN0eWxlID0gXCJzb2xpZFwiO1xuICAgIHZhbHVlV3JhcC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIHZhbHVlV3JhcC5zdHlsZS5wb3NpdGlvbiA9IFwiYWJzb2x1dGVcIjtcblxuICAgIGlmICgvXihzdWJtaXR8cmVzZXR8YnV0dG9ufHRleHR8cGFzc3dvcmQpJC8udGVzdChlbC50eXBlKSB8fCBlbC5ub2RlTmFtZSA9PT0gXCJTRUxFQ1RcIil7XG4gICAgICB2YWx1ZVdyYXAuc3R5bGUubGluZUhlaWdodCA9IGdldENTUyhlbCwgXCJoZWlnaHRcIik7XG4gICAgfVxuXG4gICAgdmFsdWVXcmFwLnN0eWxlLnRvcCA9IGJvdW5kcy50b3AgKyBcInB4XCI7XG4gICAgdmFsdWVXcmFwLnN0eWxlLmxlZnQgPSBib3VuZHMubGVmdCArIFwicHhcIjtcblxuICAgIHRleHRWYWx1ZSA9IChlbC5ub2RlTmFtZSA9PT0gXCJTRUxFQ1RcIikgPyAoZWwub3B0aW9uc1tlbC5zZWxlY3RlZEluZGV4XSB8fCAwKS50ZXh0IDogZWwudmFsdWU7XG4gICAgaWYoIXRleHRWYWx1ZSkge1xuICAgICAgdGV4dFZhbHVlID0gZWwucGxhY2Vob2xkZXI7XG4gICAgfVxuXG4gICAgdGV4dE5vZGUgPSBkb2MuY3JlYXRlVGV4dE5vZGUodGV4dFZhbHVlKTtcblxuICAgIHZhbHVlV3JhcC5hcHBlbmRDaGlsZCh0ZXh0Tm9kZSk7XG4gICAgYm9keS5hcHBlbmRDaGlsZCh2YWx1ZVdyYXApO1xuXG4gICAgcmVuZGVyVGV4dChlbCwgdGV4dE5vZGUsIHN0YWNrKTtcbiAgICBib2R5LnJlbW92ZUNoaWxkKHZhbHVlV3JhcCk7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3SW1hZ2UgKGN0eCkge1xuICAgIGN0eC5kcmF3SW1hZ2UuYXBwbHkoY3R4LCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICBudW1EcmF3cys9MTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFBzZXVkb0VsZW1lbnQoZWwsIHdoaWNoKSB7XG4gICAgdmFyIGVsU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgd2hpY2gpO1xuICAgIGlmKCFlbFN0eWxlIHx8ICFlbFN0eWxlLmNvbnRlbnQgfHwgZWxTdHlsZS5jb250ZW50ID09PSBcIm5vbmVcIiB8fCBlbFN0eWxlLmNvbnRlbnQgPT09IFwiLW1vei1hbHQtY29udGVudFwiIHx8IGVsU3R5bGUuZGlzcGxheSA9PT0gXCJub25lXCIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGNvbnRlbnQgPSBlbFN0eWxlLmNvbnRlbnQgKyAnJyxcbiAgICBmaXJzdCA9IGNvbnRlbnQuc3Vic3RyKCAwLCAxICk7XG4gICAgLy9zdHJpcHMgcXVvdGVzXG4gICAgaWYoZmlyc3QgPT09IGNvbnRlbnQuc3Vic3RyKCBjb250ZW50Lmxlbmd0aCAtIDEgKSAmJiBmaXJzdC5tYXRjaCgvJ3xcIi8pKSB7XG4gICAgICBjb250ZW50ID0gY29udGVudC5zdWJzdHIoIDEsIGNvbnRlbnQubGVuZ3RoIC0gMiApO1xuICAgIH1cblxuICAgIHZhciBpc0ltYWdlID0gY29udGVudC5zdWJzdHIoIDAsIDMgKSA9PT0gJ3VybCcsXG4gICAgZWxwcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIGlzSW1hZ2UgPyAnaW1nJyA6ICdzcGFuJyApO1xuXG4gICAgZWxwcy5jbGFzc05hbWUgPSBwc2V1ZG9IaWRlICsgXCItYmVmb3JlIFwiICsgcHNldWRvSGlkZSArIFwiLWFmdGVyXCI7XG5cbiAgICBPYmplY3Qua2V5cyhlbFN0eWxlKS5maWx0ZXIoaW5kZXhlZFByb3BlcnR5KS5mb3JFYWNoKGZ1bmN0aW9uKHByb3ApIHtcbiAgICAgIC8vIFByZXZlbnQgYXNzaWduaW5nIG9mIHJlYWQgb25seSBDU1MgUnVsZXMsIGV4LiBsZW5ndGgsIHBhcmVudFJ1bGVcbiAgICAgIHRyeSB7XG4gICAgICAgIGVscHMuc3R5bGVbcHJvcF0gPSBlbFN0eWxlW3Byb3BdO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBVdGlsLmxvZyhbJ1RyaWVkIHRvIGFzc2lnbiByZWFkb25seSBwcm9wZXJ0eSAnLCBwcm9wLCAnRXJyb3I6JywgZV0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYoaXNJbWFnZSkge1xuICAgICAgZWxwcy5zcmMgPSBVdGlsLnBhcnNlQmFja2dyb3VuZEltYWdlKGNvbnRlbnQpWzBdLmFyZ3NbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGVscHMuaW5uZXJIVE1MID0gY29udGVudDtcbiAgICB9XG4gICAgcmV0dXJuIGVscHM7XG4gIH1cblxuICBmdW5jdGlvbiBpbmRleGVkUHJvcGVydHkocHJvcGVydHkpIHtcbiAgICByZXR1cm4gKGlzTmFOKHdpbmRvdy5wYXJzZUludChwcm9wZXJ0eSwgMTApKSk7XG4gIH1cblxuICBmdW5jdGlvbiBpbmplY3RQc2V1ZG9FbGVtZW50cyhlbCwgc3RhY2spIHtcbiAgICB2YXIgYmVmb3JlID0gZ2V0UHNldWRvRWxlbWVudChlbCwgJzpiZWZvcmUnKSxcbiAgICBhZnRlciA9IGdldFBzZXVkb0VsZW1lbnQoZWwsICc6YWZ0ZXInKTtcbiAgICBpZighYmVmb3JlICYmICFhZnRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKGJlZm9yZSkge1xuICAgICAgZWwuY2xhc3NOYW1lICs9IFwiIFwiICsgcHNldWRvSGlkZSArIFwiLWJlZm9yZVwiO1xuICAgICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoYmVmb3JlLCBlbCk7XG4gICAgICBwYXJzZUVsZW1lbnQoYmVmb3JlLCBzdGFjaywgdHJ1ZSk7XG4gICAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGJlZm9yZSk7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShwc2V1ZG9IaWRlICsgXCItYmVmb3JlXCIsIFwiXCIpLnRyaW0oKTtcbiAgICB9XG5cbiAgICBpZiAoYWZ0ZXIpIHtcbiAgICAgIGVsLmNsYXNzTmFtZSArPSBcIiBcIiArIHBzZXVkb0hpZGUgKyBcIi1hZnRlclwiO1xuICAgICAgZWwuYXBwZW5kQ2hpbGQoYWZ0ZXIpO1xuICAgICAgcGFyc2VFbGVtZW50KGFmdGVyLCBzdGFjaywgdHJ1ZSk7XG4gICAgICBlbC5yZW1vdmVDaGlsZChhZnRlcik7XG4gICAgICBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShwc2V1ZG9IaWRlICsgXCItYWZ0ZXJcIiwgXCJcIikudHJpbSgpO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQmFja2dyb3VuZFJlcGVhdChjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIGJvdW5kcykge1xuICAgIHZhciBvZmZzZXRYID0gTWF0aC5yb3VuZChib3VuZHMubGVmdCArIGJhY2tncm91bmRQb3NpdGlvbi5sZWZ0KSxcbiAgICBvZmZzZXRZID0gTWF0aC5yb3VuZChib3VuZHMudG9wICsgYmFja2dyb3VuZFBvc2l0aW9uLnRvcCk7XG5cbiAgICBjdHguY3JlYXRlUGF0dGVybihpbWFnZSk7XG4gICAgY3R4LnRyYW5zbGF0ZShvZmZzZXRYLCBvZmZzZXRZKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC50cmFuc2xhdGUoLW9mZnNldFgsIC1vZmZzZXRZKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJhY2tncm91bmRSZXBlYXRTaGFwZShjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIGJvdW5kcywgbGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBhcmdzLnB1c2goW1wibGluZVwiLCBNYXRoLnJvdW5kKGxlZnQpLCBNYXRoLnJvdW5kKHRvcCldKTtcbiAgICBhcmdzLnB1c2goW1wibGluZVwiLCBNYXRoLnJvdW5kKGxlZnQgKyB3aWR0aCksIE1hdGgucm91bmQodG9wKV0pO1xuICAgIGFyZ3MucHVzaChbXCJsaW5lXCIsIE1hdGgucm91bmQobGVmdCArIHdpZHRoKSwgTWF0aC5yb3VuZChoZWlnaHQgKyB0b3ApXSk7XG4gICAgYXJncy5wdXNoKFtcImxpbmVcIiwgTWF0aC5yb3VuZChsZWZ0KSwgTWF0aC5yb3VuZChoZWlnaHQgKyB0b3ApXSk7XG4gICAgY3JlYXRlU2hhcGUoY3R4LCBhcmdzKTtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5jbGlwKCk7XG4gICAgcmVuZGVyQmFja2dyb3VuZFJlcGVhdChjdHgsIGltYWdlLCBiYWNrZ3JvdW5kUG9zaXRpb24sIGJvdW5kcyk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlckJhY2tncm91bmRDb2xvcihjdHgsIGJhY2tncm91bmRCb3VuZHMsIGJnY29sb3IpIHtcbiAgICByZW5kZXJSZWN0KFxuICAgICAgY3R4LFxuICAgICAgYmFja2dyb3VuZEJvdW5kcy5sZWZ0LFxuICAgICAgYmFja2dyb3VuZEJvdW5kcy50b3AsXG4gICAgICBiYWNrZ3JvdW5kQm91bmRzLndpZHRoLFxuICAgICAgYmFja2dyb3VuZEJvdW5kcy5oZWlnaHQsXG4gICAgICBiZ2NvbG9yXG4gICAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQmFja2dyb3VuZFJlcGVhdGluZyhlbCwgYm91bmRzLCBjdHgsIGltYWdlLCBpbWFnZUluZGV4KSB7XG4gICAgdmFyIGJhY2tncm91bmRTaXplID0gVXRpbC5CYWNrZ3JvdW5kU2l6ZShlbCwgYm91bmRzLCBpbWFnZSwgaW1hZ2VJbmRleCksXG4gICAgYmFja2dyb3VuZFBvc2l0aW9uID0gVXRpbC5CYWNrZ3JvdW5kUG9zaXRpb24oZWwsIGJvdW5kcywgaW1hZ2UsIGltYWdlSW5kZXgsIGJhY2tncm91bmRTaXplKSxcbiAgICBiYWNrZ3JvdW5kUmVwZWF0ID0gZ2V0Q1NTKGVsLCBcImJhY2tncm91bmRSZXBlYXRcIikuc3BsaXQoXCIsXCIpLm1hcChVdGlsLnRyaW1UZXh0KTtcblxuICAgIGltYWdlID0gcmVzaXplSW1hZ2UoaW1hZ2UsIGJhY2tncm91bmRTaXplKTtcblxuICAgIGJhY2tncm91bmRSZXBlYXQgPSBiYWNrZ3JvdW5kUmVwZWF0W2ltYWdlSW5kZXhdIHx8IGJhY2tncm91bmRSZXBlYXRbMF07XG5cbiAgICBzd2l0Y2ggKGJhY2tncm91bmRSZXBlYXQpIHtcbiAgICAgIGNhc2UgXCJyZXBlYXQteFwiOlxuICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0U2hhcGUoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCBib3VuZHMsXG4gICAgICAgICAgYm91bmRzLmxlZnQsIGJvdW5kcy50b3AgKyBiYWNrZ3JvdW5kUG9zaXRpb24udG9wLCA5OTk5OSwgaW1hZ2UuaGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJyZXBlYXQteVwiOlxuICAgICAgICBiYWNrZ3JvdW5kUmVwZWF0U2hhcGUoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCBib3VuZHMsXG4gICAgICAgICAgYm91bmRzLmxlZnQgKyBiYWNrZ3JvdW5kUG9zaXRpb24ubGVmdCwgYm91bmRzLnRvcCwgaW1hZ2Uud2lkdGgsIDk5OTk5KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGNhc2UgXCJuby1yZXBlYXRcIjpcbiAgICAgICAgYmFja2dyb3VuZFJlcGVhdFNoYXBlKGN0eCwgaW1hZ2UsIGJhY2tncm91bmRQb3NpdGlvbiwgYm91bmRzLFxuICAgICAgICAgIGJvdW5kcy5sZWZ0ICsgYmFja2dyb3VuZFBvc2l0aW9uLmxlZnQsIGJvdW5kcy50b3AgKyBiYWNrZ3JvdW5kUG9zaXRpb24udG9wLCBpbWFnZS53aWR0aCwgaW1hZ2UuaGVpZ2h0KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJlbmRlckJhY2tncm91bmRSZXBlYXQoY3R4LCBpbWFnZSwgYmFja2dyb3VuZFBvc2l0aW9uLCB7XG4gICAgICAgICAgdG9wOiBib3VuZHMudG9wLFxuICAgICAgICAgIGxlZnQ6IGJvdW5kcy5sZWZ0LFxuICAgICAgICAgIHdpZHRoOiBpbWFnZS53aWR0aCxcbiAgICAgICAgICBoZWlnaHQ6IGltYWdlLmhlaWdodFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyQmFja2dyb3VuZEltYWdlKGVsZW1lbnQsIGJvdW5kcywgY3R4KSB7XG4gICAgdmFyIGJhY2tncm91bmRJbWFnZSA9IGdldENTUyhlbGVtZW50LCBcImJhY2tncm91bmRJbWFnZVwiKSxcbiAgICBiYWNrZ3JvdW5kSW1hZ2VzID0gVXRpbC5wYXJzZUJhY2tncm91bmRJbWFnZShiYWNrZ3JvdW5kSW1hZ2UpLFxuICAgIGltYWdlLFxuICAgIGltYWdlSW5kZXggPSBiYWNrZ3JvdW5kSW1hZ2VzLmxlbmd0aDtcblxuICAgIHdoaWxlKGltYWdlSW5kZXgtLSkge1xuICAgICAgYmFja2dyb3VuZEltYWdlID0gYmFja2dyb3VuZEltYWdlc1tpbWFnZUluZGV4XTtcblxuICAgICAgaWYgKCFiYWNrZ3JvdW5kSW1hZ2UuYXJncyB8fCBiYWNrZ3JvdW5kSW1hZ2UuYXJncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBrZXkgPSBiYWNrZ3JvdW5kSW1hZ2UubWV0aG9kID09PSAndXJsJyA/XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2UuYXJnc1swXSA6XG4gICAgICBiYWNrZ3JvdW5kSW1hZ2UudmFsdWU7XG5cbiAgICAgIGltYWdlID0gbG9hZEltYWdlKGtleSk7XG5cbiAgICAgIC8vIFRPRE8gYWRkIHN1cHBvcnQgZm9yIGJhY2tncm91bmQtb3JpZ2luXG4gICAgICBpZiAoaW1hZ2UpIHtcbiAgICAgICAgcmVuZGVyQmFja2dyb3VuZFJlcGVhdGluZyhlbGVtZW50LCBib3VuZHMsIGN0eCwgaW1hZ2UsIGltYWdlSW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogRXJyb3IgbG9hZGluZyBiYWNrZ3JvdW5kOlwiLCBiYWNrZ3JvdW5kSW1hZ2UpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2l6ZUltYWdlKGltYWdlLCBib3VuZHMpIHtcbiAgICBpZihpbWFnZS53aWR0aCA9PT0gYm91bmRzLndpZHRoICYmIGltYWdlLmhlaWdodCA9PT0gYm91bmRzLmhlaWdodCkge1xuICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH1cblxuICAgIHZhciBjdHgsIGNhbnZhcyA9IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjYW52YXMud2lkdGggPSBib3VuZHMud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGJvdW5kcy5oZWlnaHQ7XG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBkcmF3SW1hZ2UoY3R4LCBpbWFnZSwgMCwgMCwgaW1hZ2Uud2lkdGgsIGltYWdlLmhlaWdodCwgMCwgMCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0ICk7XG4gICAgcmV0dXJuIGNhbnZhcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldE9wYWNpdHkoY3R4LCBlbGVtZW50LCBwYXJlbnRTdGFjaykge1xuICAgIHJldHVybiBjdHguc2V0VmFyaWFibGUoXCJnbG9iYWxBbHBoYVwiLCBnZXRDU1MoZWxlbWVudCwgXCJvcGFjaXR5XCIpICogKChwYXJlbnRTdGFjaykgPyBwYXJlbnRTdGFjay5vcGFjaXR5IDogMSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlUHgoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKFwicHhcIiwgXCJcIik7XG4gIH1cblxuICB2YXIgdHJhbnNmb3JtUmVnRXhwID0gLyhtYXRyaXgpXFwoKC4rKVxcKS87XG5cbiAgZnVuY3Rpb24gZ2V0VHJhbnNmb3JtKGVsZW1lbnQsIHBhcmVudFN0YWNrKSB7XG4gICAgdmFyIHRyYW5zZm9ybSA9IGdldENTUyhlbGVtZW50LCBcInRyYW5zZm9ybVwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItd2Via2l0LXRyYW5zZm9ybVwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItbW96LXRyYW5zZm9ybVwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItbXMtdHJhbnNmb3JtXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi1vLXRyYW5zZm9ybVwiKTtcbiAgICB2YXIgdHJhbnNmb3JtT3JpZ2luID0gZ2V0Q1NTKGVsZW1lbnQsIFwidHJhbnNmb3JtLW9yaWdpblwiKSB8fCBnZXRDU1MoZWxlbWVudCwgXCItd2Via2l0LXRyYW5zZm9ybS1vcmlnaW5cIikgfHwgZ2V0Q1NTKGVsZW1lbnQsIFwiLW1vei10cmFuc2Zvcm0tb3JpZ2luXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi1tcy10cmFuc2Zvcm0tb3JpZ2luXCIpIHx8IGdldENTUyhlbGVtZW50LCBcIi1vLXRyYW5zZm9ybS1vcmlnaW5cIikgfHwgXCIwcHggMHB4XCI7XG5cbiAgICB0cmFuc2Zvcm1PcmlnaW4gPSB0cmFuc2Zvcm1PcmlnaW4uc3BsaXQoXCIgXCIpLm1hcChyZW1vdmVQeCkubWFwKFV0aWwuYXNGbG9hdCk7XG5cbiAgICB2YXIgbWF0cml4O1xuICAgIGlmICh0cmFuc2Zvcm0gJiYgdHJhbnNmb3JtICE9PSBcIm5vbmVcIikge1xuICAgICAgdmFyIG1hdGNoID0gdHJhbnNmb3JtLm1hdGNoKHRyYW5zZm9ybVJlZ0V4cCk7XG4gICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgc3dpdGNoKG1hdGNoWzFdKSB7XG4gICAgICAgICAgY2FzZSBcIm1hdHJpeFwiOlxuICAgICAgICAgICAgbWF0cml4ID0gbWF0Y2hbMl0uc3BsaXQoXCIsXCIpLm1hcChVdGlsLnRyaW1UZXh0KS5tYXAoVXRpbC5hc0Zsb2F0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG9yaWdpbjogdHJhbnNmb3JtT3JpZ2luLFxuICAgICAgbWF0cml4OiBtYXRyaXhcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3RhY2soZWxlbWVudCwgcGFyZW50U3RhY2ssIGJvdW5kcywgdHJhbnNmb3JtKSB7XG4gICAgdmFyIGN0eCA9IGgyY1JlbmRlckNvbnRleHQoKCFwYXJlbnRTdGFjaykgPyBkb2N1bWVudFdpZHRoKCkgOiBib3VuZHMud2lkdGggLCAoIXBhcmVudFN0YWNrKSA/IGRvY3VtZW50SGVpZ2h0KCkgOiBib3VuZHMuaGVpZ2h0KSxcbiAgICBzdGFjayA9IHtcbiAgICAgIGN0eDogY3R4LFxuICAgICAgb3BhY2l0eTogc2V0T3BhY2l0eShjdHgsIGVsZW1lbnQsIHBhcmVudFN0YWNrKSxcbiAgICAgIGNzc1Bvc2l0aW9uOiBnZXRDU1MoZWxlbWVudCwgXCJwb3NpdGlvblwiKSxcbiAgICAgIGJvcmRlcnM6IGdldEJvcmRlckRhdGEoZWxlbWVudCksXG4gICAgICB0cmFuc2Zvcm06IHRyYW5zZm9ybSxcbiAgICAgIGNsaXA6IChwYXJlbnRTdGFjayAmJiBwYXJlbnRTdGFjay5jbGlwKSA/IFV0aWwuRXh0ZW5kKCB7fSwgcGFyZW50U3RhY2suY2xpcCApIDogbnVsbFxuICAgIH07XG5cbiAgICBzZXRaKGVsZW1lbnQsIHN0YWNrLCBwYXJlbnRTdGFjayk7XG5cbiAgICAvLyBUT0RPIGNvcnJlY3Qgb3ZlcmZsb3cgZm9yIGFic29sdXRlIGNvbnRlbnQgcmVzaWRpbmcgdW5kZXIgYSBzdGF0aWMgcG9zaXRpb25cbiAgICBpZiAob3B0aW9ucy51c2VPdmVyZmxvdyA9PT0gdHJ1ZSAmJiAvKGhpZGRlbnxzY3JvbGx8YXV0bykvLnRlc3QoZ2V0Q1NTKGVsZW1lbnQsIFwib3ZlcmZsb3dcIikpID09PSB0cnVlICYmIC8oQk9EWSkvaS50ZXN0KGVsZW1lbnQubm9kZU5hbWUpID09PSBmYWxzZSl7XG4gICAgICBzdGFjay5jbGlwID0gKHN0YWNrLmNsaXApID8gY2xpcEJvdW5kcyhzdGFjay5jbGlwLCBib3VuZHMpIDogYm91bmRzO1xuICAgIH1cblxuICAgIHJldHVybiBzdGFjaztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJhY2tncm91bmRCb3VuZHMoYm9yZGVycywgYm91bmRzLCBjbGlwKSB7XG4gICAgdmFyIGJhY2tncm91bmRCb3VuZHMgPSB7XG4gICAgICBsZWZ0OiBib3VuZHMubGVmdCArIGJvcmRlcnNbM10ud2lkdGgsXG4gICAgICB0b3A6IGJvdW5kcy50b3AgKyBib3JkZXJzWzBdLndpZHRoLFxuICAgICAgd2lkdGg6IGJvdW5kcy53aWR0aCAtIChib3JkZXJzWzFdLndpZHRoICsgYm9yZGVyc1szXS53aWR0aCksXG4gICAgICBoZWlnaHQ6IGJvdW5kcy5oZWlnaHQgLSAoYm9yZGVyc1swXS53aWR0aCArIGJvcmRlcnNbMl0ud2lkdGgpXG4gICAgfTtcblxuICAgIGlmIChjbGlwKSB7XG4gICAgICBiYWNrZ3JvdW5kQm91bmRzID0gY2xpcEJvdW5kcyhiYWNrZ3JvdW5kQm91bmRzLCBjbGlwKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYmFja2dyb3VuZEJvdW5kcztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEJvdW5kcyhlbGVtZW50LCB0cmFuc2Zvcm0pIHtcbiAgICB2YXIgYm91bmRzID0gKHRyYW5zZm9ybS5tYXRyaXgpID8gVXRpbC5PZmZzZXRCb3VuZHMoZWxlbWVudCkgOiBVdGlsLkJvdW5kcyhlbGVtZW50KTtcbiAgICB0cmFuc2Zvcm0ub3JpZ2luWzBdICs9IGJvdW5kcy5sZWZ0O1xuICAgIHRyYW5zZm9ybS5vcmlnaW5bMV0gKz0gYm91bmRzLnRvcDtcbiAgICByZXR1cm4gYm91bmRzO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVuZGVyRWxlbWVudChlbGVtZW50LCBwYXJlbnRTdGFjaywgcHNldWRvRWxlbWVudCwgaWdub3JlQmFja2dyb3VuZCkge1xuICAgIHZhciB0cmFuc2Zvcm0gPSBnZXRUcmFuc2Zvcm0oZWxlbWVudCwgcGFyZW50U3RhY2spLFxuICAgIGJvdW5kcyA9IGdldEJvdW5kcyhlbGVtZW50LCB0cmFuc2Zvcm0pLFxuICAgIGltYWdlLFxuICAgIHN0YWNrID0gY3JlYXRlU3RhY2soZWxlbWVudCwgcGFyZW50U3RhY2ssIGJvdW5kcywgdHJhbnNmb3JtKSxcbiAgICBib3JkZXJzID0gc3RhY2suYm9yZGVycyxcbiAgICBjdHggPSBzdGFjay5jdHgsXG4gICAgYmFja2dyb3VuZEJvdW5kcyA9IGdldEJhY2tncm91bmRCb3VuZHMoYm9yZGVycywgYm91bmRzLCBzdGFjay5jbGlwKSxcbiAgICBib3JkZXJEYXRhID0gcGFyc2VCb3JkZXJzKGVsZW1lbnQsIGJvdW5kcywgYm9yZGVycyksXG4gICAgYmFja2dyb3VuZENvbG9yID0gKGlnbm9yZUVsZW1lbnRzUmVnRXhwLnRlc3QoZWxlbWVudC5ub2RlTmFtZSkpID8gXCIjZWZlZmVmXCIgOiBnZXRDU1MoZWxlbWVudCwgXCJiYWNrZ3JvdW5kQ29sb3JcIik7XG5cblxuICAgIGNyZWF0ZVNoYXBlKGN0eCwgYm9yZGVyRGF0YS5jbGlwKTtcblxuICAgIGN0eC5zYXZlKCk7XG4gICAgY3R4LmNsaXAoKTtcblxuICAgIGlmIChiYWNrZ3JvdW5kQm91bmRzLmhlaWdodCA+IDAgJiYgYmFja2dyb3VuZEJvdW5kcy53aWR0aCA+IDAgJiYgIWlnbm9yZUJhY2tncm91bmQpIHtcbiAgICAgIHJlbmRlckJhY2tncm91bmRDb2xvcihjdHgsIGJvdW5kcywgYmFja2dyb3VuZENvbG9yKTtcbiAgICAgIHJlbmRlckJhY2tncm91bmRJbWFnZShlbGVtZW50LCBiYWNrZ3JvdW5kQm91bmRzLCBjdHgpO1xuICAgIH0gZWxzZSBpZiAoaWdub3JlQmFja2dyb3VuZCkge1xuICAgICAgc3RhY2suYmFja2dyb3VuZENvbG9yID0gIGJhY2tncm91bmRDb2xvcjtcbiAgICB9XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuXG4gICAgYm9yZGVyRGF0YS5ib3JkZXJzLmZvckVhY2goZnVuY3Rpb24oYm9yZGVyKSB7XG4gICAgICByZW5kZXJCb3JkZXJzKGN0eCwgYm9yZGVyLmFyZ3MsIGJvcmRlci5jb2xvcik7XG4gICAgfSk7XG5cbiAgICBpZiAoIXBzZXVkb0VsZW1lbnQpIHtcbiAgICAgIGluamVjdFBzZXVkb0VsZW1lbnRzKGVsZW1lbnQsIHN0YWNrKTtcbiAgICB9XG5cbiAgICBzd2l0Y2goZWxlbWVudC5ub2RlTmFtZSl7XG4gICAgICBjYXNlIFwiSU1HXCI6XG4gICAgICAgIGlmICgoaW1hZ2UgPSBsb2FkSW1hZ2UoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3NyYycpKSkpIHtcbiAgICAgICAgICByZW5kZXJJbWFnZShjdHgsIGVsZW1lbnQsIGltYWdlLCBib3VuZHMsIGJvcmRlcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IEVycm9yIGxvYWRpbmcgPGltZz46XCIgKyBlbGVtZW50LmdldEF0dHJpYnV0ZSgnc3JjJykpO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIklOUFVUXCI6XG4gICAgICAgIC8vIFRPRE8gYWRkIGFsbCByZWxldmFudCB0eXBlJ3MsIGkuZS4gSFRNTDUgbmV3IHN0dWZmXG4gICAgICAgIC8vIHRvZG8gYWRkIHN1cHBvcnQgZm9yIHBsYWNlaG9sZGVyIGF0dHJpYnV0ZSBmb3IgYnJvd3NlcnMgd2hpY2ggc3VwcG9ydCBpdFxuICAgICAgICBpZiAoL14odGV4dHx1cmx8ZW1haWx8c3VibWl0fGJ1dHRvbnxyZXNldCkkLy50ZXN0KGVsZW1lbnQudHlwZSkgJiYgKGVsZW1lbnQudmFsdWUgfHwgZWxlbWVudC5wbGFjZWhvbGRlciB8fCBcIlwiKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICByZW5kZXJGb3JtVmFsdWUoZWxlbWVudCwgYm91bmRzLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiVEVYVEFSRUFcIjpcbiAgICAgICAgaWYgKChlbGVtZW50LnZhbHVlIHx8IGVsZW1lbnQucGxhY2Vob2xkZXIgfHwgXCJcIikubGVuZ3RoID4gMCl7XG4gICAgICAgICAgcmVuZGVyRm9ybVZhbHVlKGVsZW1lbnQsIGJvdW5kcywgc3RhY2spO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcIlNFTEVDVFwiOlxuICAgICAgICBpZiAoKGVsZW1lbnQub3B0aW9uc3x8ZWxlbWVudC5wbGFjZWhvbGRlciB8fCBcIlwiKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICByZW5kZXJGb3JtVmFsdWUoZWxlbWVudCwgYm91bmRzLCBzdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwiTElcIjpcbiAgICAgICAgcmVuZGVyTGlzdEl0ZW0oZWxlbWVudCwgc3RhY2ssIGJhY2tncm91bmRCb3VuZHMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgXCJDQU5WQVNcIjpcbiAgICAgICAgcmVuZGVySW1hZ2UoY3R4LCBlbGVtZW50LCBlbGVtZW50LCBib3VuZHMsIGJvcmRlcnMpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gc3RhY2s7XG4gIH1cblxuICBmdW5jdGlvbiBpc0VsZW1lbnRWaXNpYmxlKGVsZW1lbnQpIHtcbiAgICByZXR1cm4gKGdldENTUyhlbGVtZW50LCAnZGlzcGxheScpICE9PSBcIm5vbmVcIiAmJiBnZXRDU1MoZWxlbWVudCwgJ3Zpc2liaWxpdHknKSAhPT0gXCJoaWRkZW5cIiAmJiAhZWxlbWVudC5oYXNBdHRyaWJ1dGUoXCJkYXRhLWh0bWwyY2FudmFzLWlnbm9yZVwiKSk7XG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUVsZW1lbnQgKGVsZW1lbnQsIHN0YWNrLCBwc2V1ZG9FbGVtZW50KSB7XG4gICAgaWYgKGlzRWxlbWVudFZpc2libGUoZWxlbWVudCkpIHtcbiAgICAgIHN0YWNrID0gcmVuZGVyRWxlbWVudChlbGVtZW50LCBzdGFjaywgcHNldWRvRWxlbWVudCwgZmFsc2UpIHx8IHN0YWNrO1xuICAgICAgaWYgKCFpZ25vcmVFbGVtZW50c1JlZ0V4cC50ZXN0KGVsZW1lbnQubm9kZU5hbWUpKSB7XG4gICAgICAgIHBhcnNlQ2hpbGRyZW4oZWxlbWVudCwgc3RhY2ssIHBzZXVkb0VsZW1lbnQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlQ2hpbGRyZW4oZWxlbWVudCwgc3RhY2ssIHBzZXVkb0VsZW1lbnQpIHtcbiAgICBVdGlsLkNoaWxkcmVuKGVsZW1lbnQpLmZvckVhY2goZnVuY3Rpb24obm9kZSkge1xuICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAgIHBhcnNlRWxlbWVudChub2RlLCBzdGFjaywgcHNldWRvRWxlbWVudCk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZVR5cGUgPT09IG5vZGUuVEVYVF9OT0RFKSB7XG4gICAgICAgIHJlbmRlclRleHQoZWxlbWVudCwgbm9kZSwgc3RhY2spO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICB2YXIgYmFja2dyb3VuZCA9IGdldENTUyhkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIFwiYmFja2dyb3VuZENvbG9yXCIpLFxuICAgICAgdHJhbnNwYXJlbnRCYWNrZ3JvdW5kID0gKFV0aWwuaXNUcmFuc3BhcmVudChiYWNrZ3JvdW5kKSAmJiBlbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSxcbiAgICAgIHN0YWNrID0gcmVuZGVyRWxlbWVudChlbGVtZW50LCBudWxsLCBmYWxzZSwgdHJhbnNwYXJlbnRCYWNrZ3JvdW5kKTtcbiAgICBwYXJzZUNoaWxkcmVuKGVsZW1lbnQsIHN0YWNrKTtcblxuICAgIGlmICh0cmFuc3BhcmVudEJhY2tncm91bmQpIHtcbiAgICAgIGJhY2tncm91bmQgPSBzdGFjay5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgfVxuXG4gICAgYm9keS5yZW1vdmVDaGlsZChoaWRlUHNldWRvRWxlbWVudHMpO1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmQsXG4gICAgICBzdGFjazogc3RhY2tcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGluaXQoKTtcbn07XG5cbmZ1bmN0aW9uIGgyY3pDb250ZXh0KHppbmRleCkge1xuICByZXR1cm4ge1xuICAgIHppbmRleDogemluZGV4LFxuICAgIGNoaWxkcmVuOiBbXVxuICB9O1xufVxuXG5faHRtbDJjYW52YXMuUHJlbG9hZCA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXG4gIHZhciBpbWFnZXMgPSB7XG4gICAgbnVtTG9hZGVkOiAwLCAgIC8vIGFsc28gZmFpbGVkIGFyZSBjb3VudGVkIGhlcmVcbiAgICBudW1GYWlsZWQ6IDAsXG4gICAgbnVtVG90YWw6IDAsXG4gICAgY2xlYW51cERvbmU6IGZhbHNlXG4gIH0sXG4gIHBhZ2VPcmlnaW4sXG4gIFV0aWwgPSBfaHRtbDJjYW52YXMuVXRpbCxcbiAgbWV0aG9kcyxcbiAgaSxcbiAgY291bnQgPSAwLFxuICBlbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50c1swXSB8fCBkb2N1bWVudC5ib2R5LFxuICBkb2MgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQsXG4gIGRvbUltYWdlcyA9IGVsZW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2ltZycpLCAvLyBGZXRjaCBpbWFnZXMgb2YgdGhlIHByZXNlbnQgZWxlbWVudCBvbmx5XG4gIGltZ0xlbiA9IGRvbUltYWdlcy5sZW5ndGgsXG4gIGxpbmsgPSBkb2MuY3JlYXRlRWxlbWVudChcImFcIiksXG4gIHN1cHBvcnRDT1JTID0gKGZ1bmN0aW9uKCBpbWcgKXtcbiAgICByZXR1cm4gKGltZy5jcm9zc09yaWdpbiAhPT0gdW5kZWZpbmVkKTtcbiAgfSkobmV3IEltYWdlKCkpLFxuICB0aW1lb3V0VGltZXI7XG5cbiAgbGluay5ocmVmID0gd2luZG93LmxvY2F0aW9uLmhyZWY7XG4gIHBhZ2VPcmlnaW4gID0gbGluay5wcm90b2NvbCArIGxpbmsuaG9zdDtcblxuICBmdW5jdGlvbiBpc1NhbWVPcmlnaW4odXJsKXtcbiAgICBsaW5rLmhyZWYgPSB1cmw7XG4gICAgbGluay5ocmVmID0gbGluay5ocmVmOyAvLyBZRVMsIEJFTElFVkUgSVQgT1IgTk9ULCB0aGF0IGlzIHJlcXVpcmVkIGZvciBJRTkgLSBodHRwOi8vanNmaWRkbGUubmV0L25pa2xhc3ZoLzJlNDhiL1xuICAgIHZhciBvcmlnaW4gPSBsaW5rLnByb3RvY29sICsgbGluay5ob3N0O1xuICAgIHJldHVybiAob3JpZ2luID09PSBwYWdlT3JpZ2luKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHN0YXJ0KCl7XG4gICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogc3RhcnQ6IGltYWdlczogXCIgKyBpbWFnZXMubnVtTG9hZGVkICsgXCIgLyBcIiArIGltYWdlcy5udW1Ub3RhbCArIFwiIChmYWlsZWQ6IFwiICsgaW1hZ2VzLm51bUZhaWxlZCArIFwiKVwiKTtcbiAgICBpZiAoIWltYWdlcy5maXJzdFJ1biAmJiBpbWFnZXMubnVtTG9hZGVkID49IGltYWdlcy5udW1Ub3RhbCl7XG4gICAgICBVdGlsLmxvZyhcIkZpbmlzaGVkIGxvYWRpbmcgaW1hZ2VzOiAjIFwiICsgaW1hZ2VzLm51bVRvdGFsICsgXCIgKGZhaWxlZDogXCIgKyBpbWFnZXMubnVtRmFpbGVkICsgXCIpXCIpO1xuXG4gICAgICBpZiAodHlwZW9mIG9wdGlvbnMuY29tcGxldGUgPT09IFwiZnVuY3Rpb25cIil7XG4gICAgICAgIG9wdGlvbnMuY29tcGxldGUoaW1hZ2VzKTtcbiAgICAgIH1cblxuICAgIH1cbiAgfVxuXG4gIC8vIFRPRE8gbW9kaWZ5IHByb3h5IHRvIHNlcnZlIGltYWdlcyB3aXRoIENPUlMgZW5hYmxlZCwgd2hlcmUgYXZhaWxhYmxlXG4gIGZ1bmN0aW9uIHByb3h5R2V0SW1hZ2UodXJsLCBpbWcsIGltYWdlT2JqKXtcbiAgICB2YXIgY2FsbGJhY2tfbmFtZSxcbiAgICBzY3JpcHRVcmwgPSBvcHRpb25zLnByb3h5LFxuICAgIHNjcmlwdDtcblxuICAgIGxpbmsuaHJlZiA9IHVybDtcbiAgICB1cmwgPSBsaW5rLmhyZWY7IC8vIHdvcmsgYXJvdW5kIGZvciBwYWdlcyB3aXRoIGJhc2UgaHJlZj1cIlwiIHNldCAtIFdBUk5JTkc6IHRoaXMgbWF5IGNoYW5nZSB0aGUgdXJsXG5cbiAgICBjYWxsYmFja19uYW1lID0gJ2h0bWwyY2FudmFzXycgKyAoY291bnQrKyk7XG4gICAgaW1hZ2VPYmouY2FsbGJhY2tuYW1lID0gY2FsbGJhY2tfbmFtZTtcblxuICAgIGlmIChzY3JpcHRVcmwuaW5kZXhPZihcIj9cIikgPiAtMSkge1xuICAgICAgc2NyaXB0VXJsICs9IFwiJlwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY3JpcHRVcmwgKz0gXCI/XCI7XG4gICAgfVxuICAgIHNjcmlwdFVybCArPSAndXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQodXJsKSArICcmY2FsbGJhY2s9JyArIGNhbGxiYWNrX25hbWU7XG4gICAgc2NyaXB0ID0gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7XG5cbiAgICB3aW5kb3dbY2FsbGJhY2tfbmFtZV0gPSBmdW5jdGlvbihhKXtcbiAgICAgIGlmIChhLnN1YnN0cmluZygwLDYpID09PSBcImVycm9yOlwiKXtcbiAgICAgICAgaW1hZ2VPYmouc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICAgIGltYWdlcy5udW1Mb2FkZWQrKztcbiAgICAgICAgaW1hZ2VzLm51bUZhaWxlZCsrO1xuICAgICAgICBzdGFydCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0SW1hZ2VMb2FkSGFuZGxlcnMoaW1nLCBpbWFnZU9iaik7XG4gICAgICAgIGltZy5zcmMgPSBhO1xuICAgICAgfVxuICAgICAgd2luZG93W2NhbGxiYWNrX25hbWVdID0gdW5kZWZpbmVkOyAvLyB0byB3b3JrIHdpdGggSUU8OSAgLy8gTk9URTogdGhhdCB0aGUgdW5kZWZpbmVkIGNhbGxiYWNrIHByb3BlcnR5LW5hbWUgc3RpbGwgZXhpc3RzIG9uIHRoZSB3aW5kb3cgb2JqZWN0IChmb3IgSUU8OSlcbiAgICAgIHRyeSB7XG4gICAgICAgIGRlbGV0ZSB3aW5kb3dbY2FsbGJhY2tfbmFtZV07ICAvLyBmb3IgYWxsIGJyb3dzZXIgdGhhdCBzdXBwb3J0IHRoaXNcbiAgICAgIH0gY2F0Y2goZXgpIHt9XG4gICAgICBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgc2NyaXB0ID0gbnVsbDtcbiAgICAgIGRlbGV0ZSBpbWFnZU9iai5zY3JpcHQ7XG4gICAgICBkZWxldGUgaW1hZ2VPYmouY2FsbGJhY2tuYW1lO1xuICAgIH07XG5cbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwidHlwZVwiLCBcInRleHQvamF2YXNjcmlwdFwiKTtcbiAgICBzY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNjcmlwdFVybCk7XG4gICAgaW1hZ2VPYmouc2NyaXB0ID0gc2NyaXB0O1xuICAgIHdpbmRvdy5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcmlwdCk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRQc2V1ZG9FbGVtZW50KGVsZW1lbnQsIHR5cGUpIHtcbiAgICB2YXIgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCB0eXBlKSxcbiAgICBjb250ZW50ID0gc3R5bGUuY29udGVudDtcbiAgICBpZiAoY29udGVudC5zdWJzdHIoMCwgMykgPT09ICd1cmwnKSB7XG4gICAgICBtZXRob2RzLmxvYWRJbWFnZShfaHRtbDJjYW52YXMuVXRpbC5wYXJzZUJhY2tncm91bmRJbWFnZShjb250ZW50KVswXS5hcmdzWzBdKTtcbiAgICB9XG4gICAgbG9hZEJhY2tncm91bmRJbWFnZXMoc3R5bGUuYmFja2dyb3VuZEltYWdlLCBlbGVtZW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvYWRQc2V1ZG9FbGVtZW50SW1hZ2VzKGVsZW1lbnQpIHtcbiAgICBsb2FkUHNldWRvRWxlbWVudChlbGVtZW50LCBcIjpiZWZvcmVcIik7XG4gICAgbG9hZFBzZXVkb0VsZW1lbnQoZWxlbWVudCwgXCI6YWZ0ZXJcIik7XG4gIH1cblxuICBmdW5jdGlvbiBsb2FkR3JhZGllbnRJbWFnZShiYWNrZ3JvdW5kSW1hZ2UsIGJvdW5kcykge1xuICAgIHZhciBpbWcgPSBfaHRtbDJjYW52YXMuR2VuZXJhdGUuR3JhZGllbnQoYmFja2dyb3VuZEltYWdlLCBib3VuZHMpO1xuXG4gICAgaWYgKGltZyAhPT0gdW5kZWZpbmVkKXtcbiAgICAgIGltYWdlc1tiYWNrZ3JvdW5kSW1hZ2VdID0ge1xuICAgICAgICBpbWc6IGltZyxcbiAgICAgICAgc3VjY2VlZGVkOiB0cnVlXG4gICAgICB9O1xuICAgICAgaW1hZ2VzLm51bVRvdGFsKys7XG4gICAgICBpbWFnZXMubnVtTG9hZGVkKys7XG4gICAgICBzdGFydCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGludmFsaWRCYWNrZ3JvdW5kcyhiYWNrZ3JvdW5kX2ltYWdlKSB7XG4gICAgcmV0dXJuIChiYWNrZ3JvdW5kX2ltYWdlICYmIGJhY2tncm91bmRfaW1hZ2UubWV0aG9kICYmIGJhY2tncm91bmRfaW1hZ2UuYXJncyAmJiBiYWNrZ3JvdW5kX2ltYWdlLmFyZ3MubGVuZ3RoID4gMCApO1xuICB9XG5cbiAgZnVuY3Rpb24gbG9hZEJhY2tncm91bmRJbWFnZXMoYmFja2dyb3VuZF9pbWFnZSwgZWwpIHtcbiAgICB2YXIgYm91bmRzO1xuXG4gICAgX2h0bWwyY2FudmFzLlV0aWwucGFyc2VCYWNrZ3JvdW5kSW1hZ2UoYmFja2dyb3VuZF9pbWFnZSkuZmlsdGVyKGludmFsaWRCYWNrZ3JvdW5kcykuZm9yRWFjaChmdW5jdGlvbihiYWNrZ3JvdW5kX2ltYWdlKSB7XG4gICAgICBpZiAoYmFja2dyb3VuZF9pbWFnZS5tZXRob2QgPT09ICd1cmwnKSB7XG4gICAgICAgIG1ldGhvZHMubG9hZEltYWdlKGJhY2tncm91bmRfaW1hZ2UuYXJnc1swXSk7XG4gICAgICB9IGVsc2UgaWYoYmFja2dyb3VuZF9pbWFnZS5tZXRob2QubWF0Y2goL1xcLT9ncmFkaWVudCQvKSkge1xuICAgICAgICBpZihib3VuZHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJvdW5kcyA9IF9odG1sMmNhbnZhcy5VdGlsLkJvdW5kcyhlbCk7XG4gICAgICAgIH1cbiAgICAgICAgbG9hZEdyYWRpZW50SW1hZ2UoYmFja2dyb3VuZF9pbWFnZS52YWx1ZSwgYm91bmRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEltYWdlcyAoZWwpIHtcbiAgICB2YXIgZWxOb2RlVHlwZSA9IGZhbHNlO1xuXG4gICAgLy8gRmlyZWZveCBmYWlscyB3aXRoIHBlcm1pc3Npb24gZGVuaWVkIG9uIHBhZ2VzIHdpdGggaWZyYW1lc1xuICAgIHRyeSB7XG4gICAgICBVdGlsLkNoaWxkcmVuKGVsKS5mb3JFYWNoKGdldEltYWdlcyk7XG4gICAgfVxuICAgIGNhdGNoKCBlICkge31cblxuICAgIHRyeSB7XG4gICAgICBlbE5vZGVUeXBlID0gZWwubm9kZVR5cGU7XG4gICAgfSBjYXRjaCAoZXgpIHtcbiAgICAgIGVsTm9kZVR5cGUgPSBmYWxzZTtcbiAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IGZhaWxlZCB0byBhY2Nlc3Mgc29tZSBlbGVtZW50J3Mgbm9kZVR5cGUgLSBFeGNlcHRpb246IFwiICsgZXgubWVzc2FnZSk7XG4gICAgfVxuXG4gICAgaWYgKGVsTm9kZVR5cGUgPT09IDEgfHwgZWxOb2RlVHlwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBsb2FkUHNldWRvRWxlbWVudEltYWdlcyhlbCk7XG4gICAgICB0cnkge1xuICAgICAgICBsb2FkQmFja2dyb3VuZEltYWdlcyhVdGlsLmdldENTUyhlbCwgJ2JhY2tncm91bmRJbWFnZScpLCBlbCk7XG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogZmFpbGVkIHRvIGdldCBiYWNrZ3JvdW5kLWltYWdlIC0gRXhjZXB0aW9uOiBcIiArIGUubWVzc2FnZSk7XG4gICAgICB9XG4gICAgICBsb2FkQmFja2dyb3VuZEltYWdlcyhlbCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2V0SW1hZ2VMb2FkSGFuZGxlcnMoaW1nLCBpbWFnZU9iaikge1xuICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICggaW1hZ2VPYmoudGltZXIgIT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgLy8gQ09SUyBzdWNjZWVkZWRcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCggaW1hZ2VPYmoudGltZXIgKTtcbiAgICAgIH1cblxuICAgICAgaW1hZ2VzLm51bUxvYWRlZCsrO1xuICAgICAgaW1hZ2VPYmouc3VjY2VlZGVkID0gdHJ1ZTtcbiAgICAgIGltZy5vbmVycm9yID0gaW1nLm9ubG9hZCA9IG51bGw7XG4gICAgICBzdGFydCgpO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChpbWcuY3Jvc3NPcmlnaW4gPT09IFwiYW5vbnltb3VzXCIpIHtcbiAgICAgICAgLy8gQ09SUyBmYWlsZWRcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCggaW1hZ2VPYmoudGltZXIgKTtcblxuICAgICAgICAvLyBsZXQncyB0cnkgd2l0aCBwcm94eSBpbnN0ZWFkXG4gICAgICAgIGlmICggb3B0aW9ucy5wcm94eSApIHtcbiAgICAgICAgICB2YXIgc3JjID0gaW1nLnNyYztcbiAgICAgICAgICBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICBpbWFnZU9iai5pbWcgPSBpbWc7XG4gICAgICAgICAgaW1nLnNyYyA9IHNyYztcblxuICAgICAgICAgIHByb3h5R2V0SW1hZ2UoIGltZy5zcmMsIGltZywgaW1hZ2VPYmogKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaW1hZ2VzLm51bUxvYWRlZCsrO1xuICAgICAgaW1hZ2VzLm51bUZhaWxlZCsrO1xuICAgICAgaW1hZ2VPYmouc3VjY2VlZGVkID0gZmFsc2U7XG4gICAgICBpbWcub25lcnJvciA9IGltZy5vbmxvYWQgPSBudWxsO1xuICAgICAgc3RhcnQoKTtcbiAgICB9O1xuICB9XG5cbiAgbWV0aG9kcyA9IHtcbiAgICBsb2FkSW1hZ2U6IGZ1bmN0aW9uKCBzcmMgKSB7XG4gICAgICB2YXIgaW1nLCBpbWFnZU9iajtcbiAgICAgIGlmICggc3JjICYmIGltYWdlc1tzcmNdID09PSB1bmRlZmluZWQgKSB7XG4gICAgICAgIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBpZiAoIHNyYy5tYXRjaCgvZGF0YTppbWFnZVxcLy4qO2Jhc2U2NCwvaSkgKSB7XG4gICAgICAgICAgaW1nLnNyYyA9IHNyYy5yZXBsYWNlKC91cmxcXChbJ1wiXXswLH18WydcIl17MCx9XFwpJC9pZywgJycpO1xuICAgICAgICAgIGltYWdlT2JqID0gaW1hZ2VzW3NyY10gPSB7XG4gICAgICAgICAgICBpbWc6IGltZ1xuICAgICAgICAgIH07XG4gICAgICAgICAgaW1hZ2VzLm51bVRvdGFsKys7XG4gICAgICAgICAgc2V0SW1hZ2VMb2FkSGFuZGxlcnMoaW1nLCBpbWFnZU9iaik7XG4gICAgICAgIH0gZWxzZSBpZiAoIGlzU2FtZU9yaWdpbiggc3JjICkgfHwgb3B0aW9ucy5hbGxvd1RhaW50ID09PSAgdHJ1ZSApIHtcbiAgICAgICAgICBpbWFnZU9iaiA9IGltYWdlc1tzcmNdID0ge1xuICAgICAgICAgICAgaW1nOiBpbWdcbiAgICAgICAgICB9O1xuICAgICAgICAgIGltYWdlcy5udW1Ub3RhbCsrO1xuICAgICAgICAgIHNldEltYWdlTG9hZEhhbmRsZXJzKGltZywgaW1hZ2VPYmopO1xuICAgICAgICAgIGltZy5zcmMgPSBzcmM7XG4gICAgICAgIH0gZWxzZSBpZiAoIHN1cHBvcnRDT1JTICYmICFvcHRpb25zLmFsbG93VGFpbnQgJiYgb3B0aW9ucy51c2VDT1JTICkge1xuICAgICAgICAgIC8vIGF0dGVtcHQgdG8gbG9hZCB3aXRoIENPUlNcblxuICAgICAgICAgIGltZy5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCI7XG4gICAgICAgICAgaW1hZ2VPYmogPSBpbWFnZXNbc3JjXSA9IHtcbiAgICAgICAgICAgIGltZzogaW1nXG4gICAgICAgICAgfTtcbiAgICAgICAgICBpbWFnZXMubnVtVG90YWwrKztcbiAgICAgICAgICBzZXRJbWFnZUxvYWRIYW5kbGVycyhpbWcsIGltYWdlT2JqKTtcbiAgICAgICAgICBpbWcuc3JjID0gc3JjO1xuICAgICAgICB9IGVsc2UgaWYgKCBvcHRpb25zLnByb3h5ICkge1xuICAgICAgICAgIGltYWdlT2JqID0gaW1hZ2VzW3NyY10gPSB7XG4gICAgICAgICAgICBpbWc6IGltZ1xuICAgICAgICAgIH07XG4gICAgICAgICAgaW1hZ2VzLm51bVRvdGFsKys7XG4gICAgICAgICAgcHJveHlHZXRJbWFnZSggc3JjLCBpbWcsIGltYWdlT2JqICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0sXG4gICAgY2xlYW51cERPTTogZnVuY3Rpb24oY2F1c2UpIHtcbiAgICAgIHZhciBpbWcsIHNyYztcbiAgICAgIGlmICghaW1hZ2VzLmNsZWFudXBEb25lKSB7XG4gICAgICAgIGlmIChjYXVzZSAmJiB0eXBlb2YgY2F1c2UgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBDbGVhbnVwIGJlY2F1c2U6IFwiICsgY2F1c2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFV0aWwubG9nKFwiaHRtbDJjYW52YXM6IENsZWFudXAgYWZ0ZXIgdGltZW91dDogXCIgKyBvcHRpb25zLnRpbWVvdXQgKyBcIiBtcy5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHNyYyBpbiBpbWFnZXMpIHtcbiAgICAgICAgICBpZiAoaW1hZ2VzLmhhc093blByb3BlcnR5KHNyYykpIHtcbiAgICAgICAgICAgIGltZyA9IGltYWdlc1tzcmNdO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbWcgPT09IFwib2JqZWN0XCIgJiYgaW1nLmNhbGxiYWNrbmFtZSAmJiBpbWcuc3VjY2VlZGVkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgLy8gY2FuY2VsIHByb3h5IGltYWdlIHJlcXVlc3RcbiAgICAgICAgICAgICAgd2luZG93W2ltZy5jYWxsYmFja25hbWVdID0gdW5kZWZpbmVkOyAvLyB0byB3b3JrIHdpdGggSUU8OSAgLy8gTk9URTogdGhhdCB0aGUgdW5kZWZpbmVkIGNhbGxiYWNrIHByb3BlcnR5LW5hbWUgc3RpbGwgZXhpc3RzIG9uIHRoZSB3aW5kb3cgb2JqZWN0IChmb3IgSUU8OSlcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBkZWxldGUgd2luZG93W2ltZy5jYWxsYmFja25hbWVdOyAgLy8gZm9yIGFsbCBicm93c2VyIHRoYXQgc3VwcG9ydCB0aGlzXG4gICAgICAgICAgICAgIH0gY2F0Y2goZXgpIHt9XG4gICAgICAgICAgICAgIGlmIChpbWcuc2NyaXB0ICYmIGltZy5zY3JpcHQucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIGltZy5zY3JpcHQuc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiYWJvdXQ6YmxhbmtcIik7ICAvLyB0cnkgdG8gY2FuY2VsIHJ1bm5pbmcgcmVxdWVzdFxuICAgICAgICAgICAgICAgIGltZy5zY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChpbWcuc2NyaXB0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbWFnZXMubnVtTG9hZGVkKys7XG4gICAgICAgICAgICAgIGltYWdlcy5udW1GYWlsZWQrKztcbiAgICAgICAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogQ2xlYW5lZCB1cCBmYWlsZWQgaW1nOiAnXCIgKyBzcmMgKyBcIicgU3RlcHM6IFwiICsgaW1hZ2VzLm51bUxvYWRlZCArIFwiIC8gXCIgKyBpbWFnZXMubnVtVG90YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbmNlbCBhbnkgcGVuZGluZyByZXF1ZXN0c1xuICAgICAgICBpZih3aW5kb3cuc3RvcCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgd2luZG93LnN0b3AoKTtcbiAgICAgICAgfSBlbHNlIGlmKGRvY3VtZW50LmV4ZWNDb21tYW5kICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkb2N1bWVudC5leGVjQ29tbWFuZChcIlN0b3BcIiwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb2N1bWVudC5jbG9zZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZG9jdW1lbnQuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgICBpbWFnZXMuY2xlYW51cERvbmUgPSB0cnVlO1xuICAgICAgICBpZiAoIShjYXVzZSAmJiB0eXBlb2YgY2F1c2UgPT09IFwic3RyaW5nXCIpKSB7XG4gICAgICAgICAgc3RhcnQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXJpbmdEb25lOiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aW1lb3V0VGltZXIpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dCh0aW1lb3V0VGltZXIpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBpZiAob3B0aW9ucy50aW1lb3V0ID4gMCkge1xuICAgIHRpbWVvdXRUaW1lciA9IHdpbmRvdy5zZXRUaW1lb3V0KG1ldGhvZHMuY2xlYW51cERPTSwgb3B0aW9ucy50aW1lb3V0KTtcbiAgfVxuXG4gIFV0aWwubG9nKCdodG1sMmNhbnZhczogUHJlbG9hZCBzdGFydHM6IGZpbmRpbmcgYmFja2dyb3VuZC1pbWFnZXMnKTtcbiAgaW1hZ2VzLmZpcnN0UnVuID0gdHJ1ZTtcblxuICBnZXRJbWFnZXMoZWxlbWVudCk7XG5cbiAgVXRpbC5sb2coJ2h0bWwyY2FudmFzOiBQcmVsb2FkOiBGaW5kaW5nIGltYWdlcycpO1xuICAvLyBsb2FkIDxpbWc+IGltYWdlc1xuICBmb3IgKGkgPSAwOyBpIDwgaW1nTGVuOyBpKz0xKXtcbiAgICBtZXRob2RzLmxvYWRJbWFnZSggZG9tSW1hZ2VzW2ldLmdldEF0dHJpYnV0ZSggXCJzcmNcIiApICk7XG4gIH1cblxuICBpbWFnZXMuZmlyc3RSdW4gPSBmYWxzZTtcbiAgVXRpbC5sb2coJ2h0bWwyY2FudmFzOiBQcmVsb2FkOiBEb25lLicpO1xuICBpZiAoaW1hZ2VzLm51bVRvdGFsID09PSBpbWFnZXMubnVtTG9hZGVkKSB7XG4gICAgc3RhcnQoKTtcbiAgfVxuXG4gIHJldHVybiBtZXRob2RzO1xufTtcblxuX2h0bWwyY2FudmFzLlJlbmRlcmVyID0gZnVuY3Rpb24ocGFyc2VRdWV1ZSwgb3B0aW9ucyl7XG5cbiAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvQ1NTMjEvemluZGV4Lmh0bWxcbiAgZnVuY3Rpb24gY3JlYXRlUmVuZGVyUXVldWUocGFyc2VRdWV1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFtdLFxuICAgIHJvb3RDb250ZXh0O1xuXG4gICAgcm9vdENvbnRleHQgPSAoZnVuY3Rpb24gYnVpbGRTdGFja2luZ0NvbnRleHQocm9vdE5vZGUpIHtcbiAgICAgIHZhciByb290Q29udGV4dCA9IHt9O1xuICAgICAgZnVuY3Rpb24gaW5zZXJ0KGNvbnRleHQsIG5vZGUsIHNwZWNpYWxQYXJlbnQpIHtcbiAgICAgICAgdmFyIHppID0gKG5vZGUuekluZGV4LnppbmRleCA9PT0gJ2F1dG8nKSA/IDAgOiBOdW1iZXIobm9kZS56SW5kZXguemluZGV4KSxcbiAgICAgICAgY29udGV4dEZvckNoaWxkcmVuID0gY29udGV4dCwgLy8gdGhlIHN0YWNraW5nIGNvbnRleHQgZm9yIGNoaWxkcmVuXG4gICAgICAgIGlzUG9zaXRpb25lZCA9IG5vZGUuekluZGV4LmlzUG9zaXRpb25lZCxcbiAgICAgICAgaXNGbG9hdGVkID0gbm9kZS56SW5kZXguaXNGbG9hdGVkLFxuICAgICAgICBzdHViID0ge25vZGU6IG5vZGV9LFxuICAgICAgICBjaGlsZHJlbkRlc3QgPSBzcGVjaWFsUGFyZW50OyAvLyB3aGVyZSBjaGlsZHJlbiB3aXRob3V0IHotaW5kZXggc2hvdWxkIGJlIHB1c2hlZCBpbnRvXG5cbiAgICAgICAgaWYgKG5vZGUuekluZGV4Lm93blN0YWNraW5nKSB7XG4gICAgICAgICAgLy8gJyEnIGNvbWVzIGJlZm9yZSBudW1iZXJzIGluIHNvcnRlZCBhcnJheVxuICAgICAgICAgIGNvbnRleHRGb3JDaGlsZHJlbiA9IHN0dWIuY29udGV4dCA9IHsgJyEnOiBbe25vZGU6bm9kZSwgY2hpbGRyZW46IFtdfV19O1xuICAgICAgICAgIGNoaWxkcmVuRGVzdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIGlmIChpc1Bvc2l0aW9uZWQgfHwgaXNGbG9hdGVkKSB7XG4gICAgICAgICAgY2hpbGRyZW5EZXN0ID0gc3R1Yi5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHppID09PSAwICYmIHNwZWNpYWxQYXJlbnQpIHtcbiAgICAgICAgICBzcGVjaWFsUGFyZW50LnB1c2goc3R1Yik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFjb250ZXh0W3ppXSkgeyBjb250ZXh0W3ppXSA9IFtdOyB9XG4gICAgICAgICAgY29udGV4dFt6aV0ucHVzaChzdHViKTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUuekluZGV4LmNoaWxkcmVuLmZvckVhY2goZnVuY3Rpb24oY2hpbGROb2RlKSB7XG4gICAgICAgICAgaW5zZXJ0KGNvbnRleHRGb3JDaGlsZHJlbiwgY2hpbGROb2RlLCBjaGlsZHJlbkRlc3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGluc2VydChyb290Q29udGV4dCwgcm9vdE5vZGUpO1xuICAgICAgcmV0dXJuIHJvb3RDb250ZXh0O1xuICAgIH0pKHBhcnNlUXVldWUpO1xuXG4gICAgZnVuY3Rpb24gc29ydFooY29udGV4dCkge1xuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkuc29ydCgpLmZvckVhY2goZnVuY3Rpb24oemkpIHtcbiAgICAgICAgdmFyIG5vblBvc2l0aW9uZWQgPSBbXSxcbiAgICAgICAgZmxvYXRlZCA9IFtdLFxuICAgICAgICBwb3NpdGlvbmVkID0gW10sXG4gICAgICAgIGxpc3QgPSBbXTtcblxuICAgICAgICAvLyBwb3NpdGlvbmVkIGFmdGVyIHN0YXRpY1xuICAgICAgICBjb250ZXh0W3ppXS5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICBpZiAodi5ub2RlLnpJbmRleC5pc1Bvc2l0aW9uZWQgfHwgdi5ub2RlLnpJbmRleC5vcGFjaXR5IDwgMSkge1xuICAgICAgICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8jdHJhbnNwYXJlbmN5XG4gICAgICAgICAgICAvLyBub24tcG9zaXRpb25lZCBlbGVtZW50IHdpdGggb3BhY3RpeSA8IDEgc2hvdWxkIGJlIHN0YWNrZWQgYXMgaWYgaXQgd2VyZSBhIHBvc2l0aW9uZWQgZWxlbWVudCB3aXRoIOKAmHotaW5kZXg6IDDigJkgYW5kIOKAmG9wYWNpdHk6IDHigJkuXG4gICAgICAgICAgICBwb3NpdGlvbmVkLnB1c2godik7XG4gICAgICAgICAgfSBlbHNlIGlmICh2Lm5vZGUuekluZGV4LmlzRmxvYXRlZCkge1xuICAgICAgICAgICAgZmxvYXRlZC5wdXNoKHYpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBub25Qb3NpdGlvbmVkLnB1c2godik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAoZnVuY3Rpb24gd2FsayhhcnIpIHtcbiAgICAgICAgICBhcnIuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICBsaXN0LnB1c2godik7XG4gICAgICAgICAgICBpZiAodi5jaGlsZHJlbikgeyB3YWxrKHYuY2hpbGRyZW4pOyB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pKG5vblBvc2l0aW9uZWQuY29uY2F0KGZsb2F0ZWQsIHBvc2l0aW9uZWQpKTtcblxuICAgICAgICBsaXN0LmZvckVhY2goZnVuY3Rpb24odikge1xuICAgICAgICAgIGlmICh2LmNvbnRleHQpIHtcbiAgICAgICAgICAgIHNvcnRaKHYuY29udGV4dCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHF1ZXVlLnB1c2godi5ub2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgc29ydFoocm9vdENvbnRleHQpO1xuXG4gICAgcmV0dXJuIHF1ZXVlO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UmVuZGVyZXIocmVuZGVyZXJOYW1lKSB7XG4gICAgdmFyIHJlbmRlcmVyO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLnJlbmRlcmVyID09PSBcInN0cmluZ1wiICYmIF9odG1sMmNhbnZhcy5SZW5kZXJlcltyZW5kZXJlck5hbWVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlbmRlcmVyID0gX2h0bWwyY2FudmFzLlJlbmRlcmVyW3JlbmRlcmVyTmFtZV0ob3B0aW9ucyk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgcmVuZGVyZXJOYW1lID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIHJlbmRlcmVyID0gcmVuZGVyZXJOYW1lKG9wdGlvbnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmtub3duIHJlbmRlcmVyXCIpO1xuICAgIH1cblxuICAgIGlmICggdHlwZW9mIHJlbmRlcmVyICE9PSBcImZ1bmN0aW9uXCIgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIHJlbmRlcmVyIGRlZmluZWRcIik7XG4gICAgfVxuICAgIHJldHVybiByZW5kZXJlcjtcbiAgfVxuXG4gIHJldHVybiBnZXRSZW5kZXJlcihvcHRpb25zLnJlbmRlcmVyKShwYXJzZVF1ZXVlLCBvcHRpb25zLCBkb2N1bWVudCwgY3JlYXRlUmVuZGVyUXVldWUocGFyc2VRdWV1ZS5zdGFjayksIF9odG1sMmNhbnZhcyk7XG59O1xuXG5faHRtbDJjYW52YXMuVXRpbC5TdXBwb3J0ID0gZnVuY3Rpb24gKG9wdGlvbnMsIGRvYykge1xuXG4gIGZ1bmN0aW9uIHN1cHBvcnRTVkdSZW5kZXJpbmcoKSB7XG4gICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpLFxuICAgIGNhbnZhcyA9IGRvYy5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFxuICAgIGN0eCA9IChjYW52YXMuZ2V0Q29udGV4dCA9PT0gdW5kZWZpbmVkKSA/IGZhbHNlIDogY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICBpZiAoY3R4ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjYW52YXMud2lkdGggPSBjYW52YXMuaGVpZ2h0ID0gMTA7XG4gICAgaW1nLnNyYyA9IFtcbiAgICBcImRhdGE6aW1hZ2Uvc3ZnK3htbCxcIixcbiAgICBcIjxzdmcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB3aWR0aD0nMTAnIGhlaWdodD0nMTAnPlwiLFxuICAgIFwiPGZvcmVpZ25PYmplY3Qgd2lkdGg9JzEwJyBoZWlnaHQ9JzEwJz5cIixcbiAgICBcIjxkaXYgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWwnIHN0eWxlPSd3aWR0aDoxMDtoZWlnaHQ6MTA7Jz5cIixcbiAgICBcInN1cFwiLFxuICAgIFwiPC9kaXY+XCIsXG4gICAgXCI8L2ZvcmVpZ25PYmplY3Q+XCIsXG4gICAgXCI8L3N2Zz5cIlxuICAgIF0uam9pbihcIlwiKTtcbiAgICB0cnkge1xuICAgICAgY3R4LmRyYXdJbWFnZShpbWcsIDAsIDApO1xuICAgICAgY2FudmFzLnRvRGF0YVVSTCgpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBfaHRtbDJjYW52YXMuVXRpbC5sb2coJ2h0bWwyY2FudmFzOiBQYXJzZTogU1ZHIHBvd2VyZWQgcmVuZGVyaW5nIGF2YWlsYWJsZScpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gVGVzdCB3aGV0aGVyIHdlIGNhbiB1c2UgcmFuZ2VzIHRvIG1lYXN1cmUgYm91bmRpbmcgYm94ZXNcbiAgLy8gT3BlcmEgZG9lc24ndCBwcm92aWRlIHZhbGlkIGJvdW5kcy5oZWlnaHQvYm90dG9tIGV2ZW4gdGhvdWdoIGl0IHN1cHBvcnRzIHRoZSBtZXRob2QuXG5cbiAgZnVuY3Rpb24gc3VwcG9ydFJhbmdlQm91bmRzKCkge1xuICAgIHZhciByLCB0ZXN0RWxlbWVudCwgcmFuZ2VCb3VuZHMsIHJhbmdlSGVpZ2h0LCBzdXBwb3J0ID0gZmFsc2U7XG5cbiAgICBpZiAoZG9jLmNyZWF0ZVJhbmdlKSB7XG4gICAgICByID0gZG9jLmNyZWF0ZVJhbmdlKCk7XG4gICAgICBpZiAoci5nZXRCb3VuZGluZ0NsaWVudFJlY3QpIHtcbiAgICAgICAgdGVzdEVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnYm91bmR0ZXN0Jyk7XG4gICAgICAgIHRlc3RFbGVtZW50LnN0eWxlLmhlaWdodCA9IFwiMTIzcHhcIjtcbiAgICAgICAgdGVzdEVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgZG9jLmJvZHkuYXBwZW5kQ2hpbGQodGVzdEVsZW1lbnQpO1xuXG4gICAgICAgIHIuc2VsZWN0Tm9kZSh0ZXN0RWxlbWVudCk7XG4gICAgICAgIHJhbmdlQm91bmRzID0gci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgcmFuZ2VIZWlnaHQgPSByYW5nZUJvdW5kcy5oZWlnaHQ7XG5cbiAgICAgICAgaWYgKHJhbmdlSGVpZ2h0ID09PSAxMjMpIHtcbiAgICAgICAgICBzdXBwb3J0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBkb2MuYm9keS5yZW1vdmVDaGlsZCh0ZXN0RWxlbWVudCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1cHBvcnQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHJhbmdlQm91bmRzOiBzdXBwb3J0UmFuZ2VCb3VuZHMoKSxcbiAgICBzdmdSZW5kZXJpbmc6IG9wdGlvbnMuc3ZnUmVuZGVyaW5nICYmIHN1cHBvcnRTVkdSZW5kZXJpbmcoKVxuICB9O1xufTtcblxud2luZG93Lmh0bWwyY2FudmFzPWZ1bmN0aW9uKGVsZW1lbnRzLCBvcHRzKSB7XG4gIGVsZW1lbnRzID0gKGVsZW1lbnRzLmxlbmd0aCkgPyBlbGVtZW50cyA6IFtlbGVtZW50c107XG4gIHZhciBxdWV1ZSxcbiAgY2FudmFzLFxuICBvcHRpb25zID0ge1xuICAgIC8vIGdlbmVyYWxcbiAgICBsb2dnaW5nOiBmYWxzZSxcbiAgICBlbGVtZW50czogZWxlbWVudHMsXG4gICAgYmFja2dyb3VuZDogXCIjZmZmXCIsXG5cbiAgICAvLyBwcmVsb2FkIG9wdGlvbnNcbiAgICBwcm94eTogbnVsbCxcbiAgICB0aW1lb3V0OiAwLCAgICAvLyBubyB0aW1lb3V0XG4gICAgdXNlQ09SUzogZmFsc2UsIC8vIHRyeSB0byBsb2FkIGltYWdlcyBhcyBDT1JTICh3aGVyZSBhdmFpbGFibGUpLCBiZWZvcmUgZmFsbGluZyBiYWNrIHRvIHByb3h5XG4gICAgYWxsb3dUYWludDogZmFsc2UsIC8vIHdoZXRoZXIgdG8gYWxsb3cgaW1hZ2VzIHRvIHRhaW50IHRoZSBjYW52YXMsIHdvbid0IG5lZWQgcHJveHkgaWYgc2V0IHRvIHRydWVcblxuICAgIC8vIHBhcnNlIG9wdGlvbnNcbiAgICBzdmdSZW5kZXJpbmc6IGZhbHNlLCAvLyB1c2Ugc3ZnIHBvd2VyZWQgcmVuZGVyaW5nIHdoZXJlIGF2YWlsYWJsZSAoRkYxMSspXG4gICAgaWdub3JlRWxlbWVudHM6IFwiSUZSQU1FfE9CSkVDVHxQQVJBTVwiLFxuICAgIHVzZU92ZXJmbG93OiB0cnVlLFxuICAgIGxldHRlclJlbmRlcmluZzogZmFsc2UsXG4gICAgY2hpbmVzZTogZmFsc2UsXG5cbiAgICAvLyByZW5kZXIgb3B0aW9uc1xuXG4gICAgd2lkdGg6IG51bGwsXG4gICAgaGVpZ2h0OiBudWxsLFxuICAgIHRhaW50VGVzdDogdHJ1ZSwgLy8gZG8gYSB0YWludCB0ZXN0IHdpdGggYWxsIGltYWdlcyBiZWZvcmUgYXBwbHlpbmcgdG8gY2FudmFzXG4gICAgcmVuZGVyZXI6IFwiQ2FudmFzXCJcbiAgfTtcblxuICBvcHRpb25zID0gX2h0bWwyY2FudmFzLlV0aWwuRXh0ZW5kKG9wdHMsIG9wdGlvbnMpO1xuXG4gIF9odG1sMmNhbnZhcy5sb2dnaW5nID0gb3B0aW9ucy5sb2dnaW5nO1xuICBvcHRpb25zLmNvbXBsZXRlID0gZnVuY3Rpb24oIGltYWdlcyApIHtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vbnByZWxvYWRlZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAoIG9wdGlvbnMub25wcmVsb2FkZWQoIGltYWdlcyApID09PSBmYWxzZSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZSA9IF9odG1sMmNhbnZhcy5QYXJzZSggaW1hZ2VzLCBvcHRpb25zICk7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMub25wYXJzZWQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgaWYgKCBvcHRpb25zLm9ucGFyc2VkKCBxdWV1ZSApID09PSBmYWxzZSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNhbnZhcyA9IF9odG1sMmNhbnZhcy5SZW5kZXJlciggcXVldWUsIG9wdGlvbnMgKTtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5vbnJlbmRlcmVkID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgIG9wdGlvbnMub25yZW5kZXJlZCggY2FudmFzICk7XG4gICAgfVxuXG5cbiAgfTtcblxuICAvLyBmb3IgcGFnZXMgd2l0aG91dCBpbWFnZXMsIHdlIHN0aWxsIHdhbnQgdGhpcyB0byBiZSBhc3luYywgaS5lLiByZXR1cm4gbWV0aG9kcyBiZWZvcmUgZXhlY3V0aW5nXG4gIHdpbmRvdy5zZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgIF9odG1sMmNhbnZhcy5QcmVsb2FkKCBvcHRpb25zICk7XG4gIH0sIDAgKTtcblxuICByZXR1cm4ge1xuICAgIHJlbmRlcjogZnVuY3Rpb24oIHF1ZXVlLCBvcHRzICkge1xuICAgICAgcmV0dXJuIF9odG1sMmNhbnZhcy5SZW5kZXJlciggcXVldWUsIF9odG1sMmNhbnZhcy5VdGlsLkV4dGVuZChvcHRzLCBvcHRpb25zKSApO1xuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uKCBpbWFnZXMsIG9wdHMgKSB7XG4gICAgICByZXR1cm4gX2h0bWwyY2FudmFzLlBhcnNlKCBpbWFnZXMsIF9odG1sMmNhbnZhcy5VdGlsLkV4dGVuZChvcHRzLCBvcHRpb25zKSApO1xuICAgIH0sXG4gICAgcHJlbG9hZDogZnVuY3Rpb24oIG9wdHMgKSB7XG4gICAgICByZXR1cm4gX2h0bWwyY2FudmFzLlByZWxvYWQoIF9odG1sMmNhbnZhcy5VdGlsLkV4dGVuZChvcHRzLCBvcHRpb25zKSApO1xuICAgIH0sXG4gICAgbG9nOiBfaHRtbDJjYW52YXMuVXRpbC5sb2dcbiAgfTtcbn07XG5cbndpbmRvdy5odG1sMmNhbnZhcy5sb2cgPSBfaHRtbDJjYW52YXMuVXRpbC5sb2c7IC8vIGZvciByZW5kZXJlcnNcbndpbmRvdy5odG1sMmNhbnZhcy5SZW5kZXJlciA9IHtcbiAgQ2FudmFzOiB1bmRlZmluZWQgLy8gV2UgYXJlIGFzc3VtaW5nIHRoaXMgd2lsbCBiZSB1c2VkXG59O1xuXG5tb2R1bGUuZXhwb3J0cz13aW5kb3cuaHRtbDJjYW52YXM7XG5cbl9odG1sMmNhbnZhcy5SZW5kZXJlci5DYW52YXMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBkb2MgPSBkb2N1bWVudCxcbiAgc2FmZUltYWdlcyA9IFtdLFxuICB0ZXN0Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxcbiAgdGVzdGN0eCA9IHRlc3RDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLFxuICBVdGlsID0gX2h0bWwyY2FudmFzLlV0aWwsXG4gIGNhbnZhcyA9IG9wdGlvbnMuY2FudmFzIHx8IGRvYy5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICBmdW5jdGlvbiBjcmVhdGVTaGFwZShjdHgsIGFyZ3MpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgYXJncy5mb3JFYWNoKGZ1bmN0aW9uKGFyZykge1xuICAgICAgY3R4W2FyZy5uYW1lXS5hcHBseShjdHgsIGFyZ1snYXJndW1lbnRzJ10pO1xuICAgIH0pO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNhZmVJbWFnZShpdGVtKSB7XG4gICAgaWYgKHNhZmVJbWFnZXMuaW5kZXhPZihpdGVtWydhcmd1bWVudHMnXVswXS5zcmMgKSA9PT0gLTEpIHtcbiAgICAgIHRlc3RjdHguZHJhd0ltYWdlKGl0ZW1bJ2FyZ3VtZW50cyddWzBdLCAwLCAwKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRlc3RjdHguZ2V0SW1hZ2VEYXRhKDAsIDAsIDEsIDEpO1xuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHRlc3RDYW52YXMgPSBkb2MuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgdGVzdGN0eCA9IHRlc3RDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBzYWZlSW1hZ2VzLnB1c2goaXRlbVsnYXJndW1lbnRzJ11bMF0uc3JjKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJJdGVtKGN0eCwgaXRlbSkge1xuICAgIHN3aXRjaChpdGVtLnR5cGUpe1xuICAgICAgY2FzZSBcInZhcmlhYmxlXCI6XG4gICAgICAgIGN0eFtpdGVtLm5hbWVdID0gaXRlbVsnYXJndW1lbnRzJ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImZ1bmN0aW9uXCI6XG4gICAgICAgIHN3aXRjaChpdGVtLm5hbWUpIHtcbiAgICAgICAgICBjYXNlIFwiY3JlYXRlUGF0dGVyblwiOlxuICAgICAgICAgICAgaWYgKGl0ZW1bJ2FyZ3VtZW50cyddWzBdLndpZHRoID4gMCAmJiBpdGVtWydhcmd1bWVudHMnXVswXS5oZWlnaHQgPiAwKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGN0eC5jcmVhdGVQYXR0ZXJuKGl0ZW1bJ2FyZ3VtZW50cyddWzBdLCBcInJlcGVhdFwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgVXRpbC5sb2coXCJodG1sMmNhbnZhczogUmVuZGVyZXI6IEVycm9yIGNyZWF0aW5nIHBhdHRlcm5cIiwgZS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBcImRyYXdTaGFwZVwiOlxuICAgICAgICAgICAgY3JlYXRlU2hhcGUoY3R4LCBpdGVtWydhcmd1bWVudHMnXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIFwiZHJhd0ltYWdlXCI6XG4gICAgICAgICAgICBpZiAoaXRlbVsnYXJndW1lbnRzJ11bOF0gPiAwICYmIGl0ZW1bJ2FyZ3VtZW50cyddWzddID4gMCkge1xuICAgICAgICAgICAgICBpZiAoIW9wdGlvbnMudGFpbnRUZXN0IHx8IChvcHRpb25zLnRhaW50VGVzdCAmJiBzYWZlSW1hZ2UoaXRlbSkpKSB7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZS5hcHBseSggY3R4LCBpdGVtWydhcmd1bWVudHMnXSApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY3R4W2l0ZW0ubmFtZV0uYXBwbHkoY3R4LCBpdGVtWydhcmd1bWVudHMnXSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHBhcnNlZERhdGEsIG9wdGlvbnMsIGRvY3VtZW50LCBxdWV1ZSwgX2h0bWwyY2FudmFzKSB7XG4gICAgdmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksXG4gICAgbmV3Q2FudmFzLFxuICAgIGJvdW5kcyxcbiAgICBmc3R5bGUsXG4gICAgelN0YWNrID0gcGFyc2VkRGF0YS5zdGFjaztcblxuICAgIGNhbnZhcy53aWR0aCA9IGNhbnZhcy5zdHlsZS53aWR0aCA9ICBvcHRpb25zLndpZHRoIHx8IHpTdGFjay5jdHgud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBvcHRpb25zLmhlaWdodCB8fCB6U3RhY2suY3R4LmhlaWdodDtcblxuICAgIGZzdHlsZSA9IGN0eC5maWxsU3R5bGU7XG4gICAgY3R4LmZpbGxTdHlsZSA9IChVdGlsLmlzVHJhbnNwYXJlbnQoelN0YWNrLmJhY2tncm91bmRDb2xvcikgJiYgb3B0aW9ucy5iYWNrZ3JvdW5kICE9PSB1bmRlZmluZWQpID8gb3B0aW9ucy5iYWNrZ3JvdW5kIDogcGFyc2VkRGF0YS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgY3R4LmZpbGxTdHlsZSA9IGZzdHlsZTtcblxuICAgIHF1ZXVlLmZvckVhY2goZnVuY3Rpb24oc3RvcmFnZUNvbnRleHQpIHtcbiAgICAgIC8vIHNldCBjb21tb24gc2V0dGluZ3MgZm9yIGNhbnZhc1xuICAgICAgY3R4LnRleHRCYXNlbGluZSA9IFwiYm90dG9tXCI7XG4gICAgICBjdHguc2F2ZSgpO1xuXG4gICAgICBpZiAoc3RvcmFnZUNvbnRleHQudHJhbnNmb3JtLm1hdHJpeCkge1xuICAgICAgICBjdHgudHJhbnNsYXRlKHN0b3JhZ2VDb250ZXh0LnRyYW5zZm9ybS5vcmlnaW5bMF0sIHN0b3JhZ2VDb250ZXh0LnRyYW5zZm9ybS5vcmlnaW5bMV0pO1xuICAgICAgICBjdHgudHJhbnNmb3JtLmFwcGx5KGN0eCwgc3RvcmFnZUNvbnRleHQudHJhbnNmb3JtLm1hdHJpeCk7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoLXN0b3JhZ2VDb250ZXh0LnRyYW5zZm9ybS5vcmlnaW5bMF0sIC1zdG9yYWdlQ29udGV4dC50cmFuc2Zvcm0ub3JpZ2luWzFdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0b3JhZ2VDb250ZXh0LmNsaXApe1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGN0eC5yZWN0KHN0b3JhZ2VDb250ZXh0LmNsaXAubGVmdCwgc3RvcmFnZUNvbnRleHQuY2xpcC50b3AsIHN0b3JhZ2VDb250ZXh0LmNsaXAud2lkdGgsIHN0b3JhZ2VDb250ZXh0LmNsaXAuaGVpZ2h0KTtcbiAgICAgICAgY3R4LmNsaXAoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0b3JhZ2VDb250ZXh0LmN0eC5zdG9yYWdlKSB7XG4gICAgICAgIHN0b3JhZ2VDb250ZXh0LmN0eC5zdG9yYWdlLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJlbmRlckl0ZW0oY3R4LCBpdGVtKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfSk7XG5cbiAgICBVdGlsLmxvZyhcImh0bWwyY2FudmFzOiBSZW5kZXJlcjogQ2FudmFzIHJlbmRlcmVyIGRvbmUgLSByZXR1cm5pbmcgY2FudmFzIG9ialwiKTtcblxuICAgIGlmIChvcHRpb25zLmVsZW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLmVsZW1lbnRzWzBdID09PSBcIm9iamVjdFwiICYmIG9wdGlvbnMuZWxlbWVudHNbMF0ubm9kZU5hbWUgIT09IFwiQk9EWVwiKSB7XG4gICAgICAgIC8vIGNyb3AgaW1hZ2UgdG8gdGhlIGJvdW5kcyBvZiBzZWxlY3RlZCAoc2luZ2xlKSBlbGVtZW50XG4gICAgICAgIGJvdW5kcyA9IF9odG1sMmNhbnZhcy5VdGlsLkJvdW5kcyhvcHRpb25zLmVsZW1lbnRzWzBdKTtcbiAgICAgICAgbmV3Q2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIG5ld0NhbnZhcy53aWR0aCA9IE1hdGguY2VpbChib3VuZHMud2lkdGgpO1xuICAgICAgICBuZXdDYW52YXMuaGVpZ2h0ID0gTWF0aC5jZWlsKGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICBjdHggPSBuZXdDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoY2FudmFzLCBib3VuZHMubGVmdCwgYm91bmRzLnRvcCwgYm91bmRzLndpZHRoLCBib3VuZHMuaGVpZ2h0LCAwLCAwLCBib3VuZHMud2lkdGgsIGJvdW5kcy5oZWlnaHQpO1xuICAgICAgICBjYW52YXMgPSBudWxsO1xuICAgICAgICByZXR1cm4gbmV3Q2FudmFzO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBjYW52YXM7XG4gIH07XG59O1xufSkod2luZG93LGRvY3VtZW50KTsiLCJleHBvcnRzLnJ1biA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcblx0dmFyIGRvTm90aGluZyA9IGZ1bmN0aW9uKCkge307XG5cdHZhciBwYXNzID0gb3B0aW9ucy5wYXNzIHx8IGRvTm90aGluZztcblx0dmFyIGZhaWwgPSBvcHRpb25zLmZhaWwgfHwgZG9Ob3RoaW5nO1xuXHR2YXIgZW5kID0gb3B0aW9ucy5lbmQgfHwgZG9Ob3RoaW5nO1xuXHR2YXIgbW9jaGEgPSBvcHRpb25zLmluc3RhbmNlO1xuXHRcblx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvciwgdXJsLCBsaW5lKSB7XG5cdFx0ZmFpbCh7XG5cdFx0XHR0aXRsZTogZXJyb3IsXG5cdFx0XHRmdWxsVGl0bGU6IGVycm9yLFxuXHRcdFx0ZHVyYXRpb246IDAsXG5cdFx0XHRlcnI6IHtcblx0XHRcdFx0bWVzc2FnZTogJ1VSTDonICsgdXJsICsgJyBMSU5FOicgKyBsaW5lLFxuXHRcdFx0XHRzdGFjazogJydcblx0XHRcdH1cblx0XHR9KVxuXHR9O1xuXG5cdGZ1bmN0aW9uIFJlcG9ydGVyKHJ1bm5lcikge1xuXG5cdFx0cnVubmVyLm9uKCdwYXNzJywgZnVuY3Rpb24odGVzdCkge1xuXHRcdFx0cGFzcyh7XG5cdFx0XHRcdHRpdGxlOiB0ZXN0LnRpdGxlLFxuXHRcdFx0XHRmdWxsVGl0bGU6IHRlc3QuZnVsbFRpdGxlKCksXG5cdFx0XHRcdGR1cmF0aW9uOiB0ZXN0LmR1cmF0aW9uXG5cdFx0XHR9KVxuXHRcdH0pO1xuXG5cdFx0cnVubmVyLm9uKCdmYWlsJywgZnVuY3Rpb24odGVzdCwgZXJyKSB7XG5cdFx0XHRmYWlsKHtcblx0XHRcdFx0dGl0bGU6IHRlc3QudGl0bGUsXG5cdFx0XHRcdGZ1bGxUaXRsZTogdGVzdC5mdWxsVGl0bGUoKSxcblx0XHRcdFx0ZHVyYXRpb246IHRlc3QuZHVyYXRpb24sXG5cdFx0XHRcdGVycjoge1xuXHRcdFx0XHRcdG1lc3NhZ2U6IGVyci5tZXNzYWdlLFxuXHRcdFx0XHRcdHN0YWNrOiBlcnIuc3RhY2tcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cblx0XHRydW5uZXIub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0ZW5kKCk7XG5cdFx0fSk7XG5cdH1cblxuXHRtb2NoYS5yZXBvcnRlcihSZXBvcnRlcik7XG5cdC8vbW9jaGEucnVuKCk7XG59IiwiZXhwb3J0cy5ydW4gPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cdHZhciBkb05vdGhpbmcgPSBmdW5jdGlvbigpIHt9O1xuXHR2YXIgcGFzcyA9IG9wdGlvbnMucGFzcyB8fCBkb05vdGhpbmc7XG5cdHZhciBmYWlsID0gb3B0aW9ucy5mYWlsIHx8IGRvTm90aGluZztcblx0dmFyIGVuZCA9IG9wdGlvbnMuZW5kIHx8IGRvTm90aGluZztcblx0dmFyIHdpbmRvdyA9IG9wdGlvbnMuaW5zdGFuY2U7XG5cblx0d2luZG93Lm9uZXJyb3IgPSBmdW5jdGlvbihlcnJvciwgdXJsLCBsaW5lKSB7XG5cdFx0ZmFpbCh7XG5cdFx0XHR0aXRsZTogZXJyb3IsXG5cdFx0XHRmdWxsVGl0bGU6IGVycm9yLFxuXHRcdFx0ZHVyYXRpb246IDAsXG5cdFx0XHRlcnI6IHtcblx0XHRcdFx0bWVzc2FnZTogJ1VSTDonICsgdXJsICsgJyBMSU5FOicgKyBsaW5lLFxuXHRcdFx0XHRzdGFjazogJydcblx0XHRcdH1cblx0XHR9KVxuXHR9O1xuXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0ZW5kKCk7XG5cdH0sIDUwMDApO1xufSJdfQ==
