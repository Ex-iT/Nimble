var Nimble = (function(elems){
	_globals = {
		isDomReady: false,
		collection: []
	};
	var Nimble = function(elems){
		return new DOMConstruct(elems);
	},
	DOMConstruct = function(elems) {
		_globals.collection = elems[1] ? (function(){
			var collection = [];
			for (var i = 0, l = elems.length; i < l; i++) {
				collection.push(elems[i]);
			}
			return collection;
		})() : [elems];

		return this;
	};
	Nimble.domReady = function(fn) {
		_globals.isDomReady = false;
		if (document.addEventListener) {
			window.addEventListener('load', function() { ready(fn); }, false);
		}
		else {
			window.attachEvent('onload', function() { ready(fn); });
			var top = false;
			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if (top && top.doScroll) {
				(function doScrollCheck() {
					if (!_globals.isDomReady) {
						try {
							top.doScroll('left');
						} catch(e) {
							return setTimeout(doScrollCheck, 50);
						}
						ready(fn);
					}
				})();
			}
		}

		var ready = function(fn) {
			_globals.isDomReady = true;
			fn();
		};
	};

	Nimble.fn = DOMConstruct.prototype = {
		forEach: function(fn) {
			var elems = _globals.collection;
			for (var i = 0, l = elems.length; i < l; i++) {
				fn(elems[i], i);
			}
			return this;
		},
		addEvent: function(event, fn){
			var elem = _globals.collection[0];
			if (elem.addEventListener) {
				elem.addEventListener(event, fn, false);
			} else if (elem.attachEvent) {
				elem.attachEvent('on' + event, fn);
			}
			return this;
		}
	};

	return Nimble;
})();

Nimble.domReady(function(){
	Nimble(document.getElementsByTagName('a')).forEach(function(elm){

		Nimble(elm).addEvent('click', function(e){
			console.log(e.target.innerHTML);

			return false;
		});

	});
});