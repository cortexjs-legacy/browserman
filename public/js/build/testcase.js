(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// describe('Array', function() {
// 	describe('#indexOf()', function() {
// 		it('should return -1 when not present', function() {
// 			[1, 2, 3].indexOf(3).should.equal(-1);
// 		});
// 	});
// });

describe('Foobar', function() {
	describe('#sayHello()', function() {
		it('should return some text', function() {
			var foobar = {
				sayHello: function() {
					return 'Hello World!';
				}
			};

		})
	})
	describe('#runMethod()', function() {
		it('should run a method', function() {
			var foobar = {
				sayHello: function() {
					return 'Hello World!';
				}
			};

		})
	})
	describe('#convertText()', function() {
		it('should convert text', function() {
			var foobar = {
				sayHello: function() {
					return 'Hello World!';
				}
			};

		})
	})
})
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9wdWJsaWMvanMvZGV2L2Zha2VfOGZjNGNlNDcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLy8gZGVzY3JpYmUoJ0FycmF5JywgZnVuY3Rpb24oKSB7XG4vLyBcdGRlc2NyaWJlKCcjaW5kZXhPZigpJywgZnVuY3Rpb24oKSB7XG4vLyBcdFx0aXQoJ3Nob3VsZCByZXR1cm4gLTEgd2hlbiBub3QgcHJlc2VudCcsIGZ1bmN0aW9uKCkge1xuLy8gXHRcdFx0WzEsIDIsIDNdLmluZGV4T2YoMykuc2hvdWxkLmVxdWFsKC0xKTtcbi8vIFx0XHR9KTtcbi8vIFx0fSk7XG4vLyB9KTtcblxuZGVzY3JpYmUoJ0Zvb2JhcicsIGZ1bmN0aW9uKCkge1xuXHRkZXNjcmliZSgnI3NheUhlbGxvKCknLCBmdW5jdGlvbigpIHtcblx0XHRpdCgnc2hvdWxkIHJldHVybiBzb21lIHRleHQnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBmb29iYXIgPSB7XG5cdFx0XHRcdHNheUhlbGxvOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gJ0hlbGxvIFdvcmxkISc7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHR9KVxuXHR9KVxuXHRkZXNjcmliZSgnI3J1bk1ldGhvZCgpJywgZnVuY3Rpb24oKSB7XG5cdFx0aXQoJ3Nob3VsZCBydW4gYSBtZXRob2QnLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBmb29iYXIgPSB7XG5cdFx0XHRcdHNheUhlbGxvOiBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRyZXR1cm4gJ0hlbGxvIFdvcmxkISc7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHR9KVxuXHR9KVxuXHRkZXNjcmliZSgnI2NvbnZlcnRUZXh0KCknLCBmdW5jdGlvbigpIHtcblx0XHRpdCgnc2hvdWxkIGNvbnZlcnQgdGV4dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGZvb2JhciA9IHtcblx0XHRcdFx0c2F5SGVsbG86IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiAnSGVsbG8gV29ybGQhJztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdH0pXG5cdH0pXG59KSJdfQ==
