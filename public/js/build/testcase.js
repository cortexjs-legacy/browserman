(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when not present', function() {
			[1, 2, 3].indexOf(3).should.equal(-1);
		});
	});
});

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9ub2RlX21vZHVsZXMvZ3VscC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvbHRlYmVhbi9EZXNrdG9wL25vZGVqcyB3b3Jrc3BhY2UvYnJvd3Nlcm1hbi9wdWJsaWMvanMvZGV2L2Zha2VfYmRiODJhZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJkZXNjcmliZSgnQXJyYXknLCBmdW5jdGlvbigpIHtcblx0ZGVzY3JpYmUoJyNpbmRleE9mKCknLCBmdW5jdGlvbigpIHtcblx0XHRpdCgnc2hvdWxkIHJldHVybiAtMSB3aGVuIG5vdCBwcmVzZW50JywgZnVuY3Rpb24oKSB7XG5cdFx0XHRbMSwgMiwgM10uaW5kZXhPZigzKS5zaG91bGQuZXF1YWwoLTEpO1xuXHRcdH0pO1xuXHR9KTtcbn0pO1xuXG5kZXNjcmliZSgnRm9vYmFyJywgZnVuY3Rpb24oKSB7XG5cdGRlc2NyaWJlKCcjc2F5SGVsbG8oKScsIGZ1bmN0aW9uKCkge1xuXHRcdGl0KCdzaG91bGQgcmV0dXJuIHNvbWUgdGV4dCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGZvb2JhciA9IHtcblx0XHRcdFx0c2F5SGVsbG86IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiAnSGVsbG8gV29ybGQhJztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdH0pXG5cdH0pXG5cdGRlc2NyaWJlKCcjcnVuTWV0aG9kKCknLCBmdW5jdGlvbigpIHtcblx0XHRpdCgnc2hvdWxkIHJ1biBhIG1ldGhvZCcsIGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGZvb2JhciA9IHtcblx0XHRcdFx0c2F5SGVsbG86IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHJldHVybiAnSGVsbG8gV29ybGQhJztcblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdH0pXG5cdH0pXG5cdGRlc2NyaWJlKCcjY29udmVydFRleHQoKScsIGZ1bmN0aW9uKCkge1xuXHRcdGl0KCdzaG91bGQgY29udmVydCB0ZXh0JywgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgZm9vYmFyID0ge1xuXHRcdFx0XHRzYXlIZWxsbzogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0cmV0dXJuICdIZWxsbyBXb3JsZCEnO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXG5cdFx0fSlcblx0fSlcbn0pIl19
