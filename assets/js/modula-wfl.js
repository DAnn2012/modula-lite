!(function (t, e) {
	t.jQueryBridget = e(t, t.jQuery);
})(window, function (t, e) {
	'use strict';
	var i = Array.prototype.slice,
		n = t.console,
		d =
			void 0 === n
				? function () {}
				: function (t) {
						n.error(t);
				  };
	function o(h, u, l) {
		(l = l || e || t.jQuery) &&
			(u.prototype.option ||
				(u.prototype.option = function (t) {
					l.isPlainObject(t) &&
						(this.options = l.extend(!0, this.options, t));
				}),
			(l.fn[h] = function (t) {
				var e, n, o, s, r, a;
				return 'string' == typeof t
					? ((e = i.call(arguments, 1)),
					  (o = e),
					  (r = '$().' + h + '("' + (n = t) + '")'),
					  (e = this).each(function (t, e) {
							var i,
								e = l.data(e, h);
							e
								? (i = e[n]) && '_' != n.charAt(0)
									? ((i = i.apply(e, o)),
									  (s = void 0 === s ? i : s))
									: d(r + ' is not a valid method')
								: d(
										h +
											' not initialized. Cannot call methods, i.e. ' +
											r
								  );
					  }),
					  void 0 !== s ? s : e)
					: ((a = t),
					  this.each(function (t, e) {
							var i = l.data(e, h);
							i
								? (i.option(a), i._init())
								: ((i = new u(e, a)), l.data(e, h, i));
					  }),
					  this);
			}),
			s(l));
	}
	function s(t) {
		t && !t.bridget && (t.bridget = o);
	}
	return s(e || t.jQuery), o;
}),
	(function (t) {
		function e() {}
		t.EvEmitter =
			(((t = e.prototype).on = function (t, e) {
				var i;
				if (t && e)
					return (
						-1 ==
							(i = (i = this._events = this._events || {})[t] =
								i[t] || []).indexOf(e) && i.push(e),
						this
					);
			}),
			(t.once = function (t, e) {
				var i;
				if (t && e)
					return (
						this.on(t, e),
						(((i = this._onceEvents = this._onceEvents || {})[t] =
							i[t] || {})[e] = !0),
						this
					);
			}),
			(t.off = function (t, e) {
				t = this._events && this._events[t];
				if (t && t.length)
					return -1 != (e = t.indexOf(e)) && t.splice(e, 1), this;
			}),
			(t.emitEvent = function (t, e) {
				var i = this._events && this._events[t];
				if (i && i.length) {
					(i = i.slice(0)), (e = e || []);
					for (
						var n = this._onceEvents && this._onceEvents[t], o = 0;
						o < i.length;
						o++
					) {
						var s = i[o];
						n && n[s] && (this.off(t, s), delete n[s]),
							s.apply(this, e);
					}
					return this;
				}
			}),
			(t.allOff = function () {
				delete this._events, delete this._onceEvents;
			}),
			e);
	})('undefined' != typeof window ? window : this),
	(window.getSize = (function () {
		'use strict';
		function y(t) {
			var e = parseFloat(t);
			var i = t.indexOf('%') == -1 && !isNaN(e);
			return i && e;
		}
		function t() {}
		var i =
			typeof console == 'undefined'
				? t
				: function (t) {
						console.error(t);
				  };
		var v = [
			'paddingLeft',
			'paddingRight',
			'paddingTop',
			'paddingBottom',
			'marginLeft',
			'marginRight',
			'marginTop',
			'marginBottom',
			'borderLeftWidth',
			'borderRightWidth',
			'borderTopWidth',
			'borderBottomWidth',
		];
		var _ = v.length;
		function I() {
			var t = {
				width: 0,
				height: 0,
				innerWidth: 0,
				innerHeight: 0,
				outerWidth: 0,
				outerHeight: 0,
			};
			for (var e = 0; e < _; e++) {
				var i = v[e];
				t[i] = 0;
			}
			return t;
		}
		function z(t) {
			var e = getComputedStyle(t);
			if (!e)
				i(
					'Style returned ' +
						e +
						'. Are you running this code in a hidden iframe on Firefox? ' +
						'See https://bit.ly/getsizebug1'
				);
			return e;
		}
		var n = false;
		var S;
		function E() {
			if (n) return;
			n = true;
			var t = document.createElement('div');
			t.style.width = '200px';
			t.style.padding = '1px 2px 3px 4px';
			t.style.borderStyle = 'solid';
			t.style.borderWidth = '1px 2px 3px 4px';
			t.style.boxSizing = 'border-box';
			var e = document.body || document.documentElement;
			e.appendChild(t);
			var i = z(t);
			S = Math.round(y(i.width)) == 200;
			o.isBoxSizeOuter = S;
			e.removeChild(t);
		}
		function o(t) {
			E();
			if (typeof t == 'string') t = document.querySelector(t);
			if (!t || typeof t != 'object' || !t.nodeType) return;
			var e = z(t);
			if (e.display == 'none') return I();
			var i = {};
			i.width = t.offsetWidth;
			i.height = t.offsetHeight;
			var n = (i.isBorderBox = e.boxSizing == 'border-box');
			for (var o = 0; o < _; o++) {
				var s = v[o];
				var r = e[s];
				var a = parseFloat(r);
				i[s] = !isNaN(a) ? a : 0;
			}
			var h = i.paddingLeft + i.paddingRight;
			var u = i.paddingTop + i.paddingBottom;
			var l = i.marginLeft + i.marginRight;
			var d = i.marginTop + i.marginBottom;
			var c = i.borderLeftWidth + i.borderRightWidth;
			var f = i.borderTopWidth + i.borderBottomWidth;
			var m = n && S;
			var p = y(e.width);
			if (p !== false) i.width = p + (m ? 0 : h + c);
			var g = y(e.height);
			if (g !== false) i.height = g + (m ? 0 : u + f);
			i.innerWidth = i.width - (h + c);
			i.innerHeight = i.height - (u + f);
			i.outerWidth = i.width + l;
			i.outerHeight = i.height + d;
			return i;
		}
		return o;
	})()),
	(window.matchesSelector = (function () {
		'use strict';
		var n = (function () {
			var t = window.Element.prototype;
			if (t.matches) return 'matches';
			if (t.matchesSelector) return 'matchesSelector';
			var e = ['webkit', 'moz', 'ms', 'o'];
			for (var i = 0; i < e.length; i++) {
				var n = e[i];
				var o = n + 'MatchesSelector';
				if (t[o]) return o;
			}
		})();
		return function t(e, i) {
			return e[n](i);
		};
	})()),
	(function (t, e) {
		t.fizzyUIUtils = e(t, t.matchesSelector);
	})(window, function (i, r) {
		var h = {},
			e =
				((h.extend = function (t, e) {
					for (var i in e) t[i] = e[i];
					return t;
				}),
				(h.modulo = function (t, e) {
					return ((t % e) + e) % e;
				}),
				Array.prototype.slice),
			u =
				((h.makeArray = function (t) {
					return Array.isArray(t)
						? t
						: null == t
						? []
						: 'object' == typeof t && 'number' == typeof t.length
						? e.call(t)
						: [t];
				}),
				(h.removeFrom = function (t, e) {
					e = t.indexOf(e);
					-1 != e && t.splice(e, 1);
				}),
				(h.getParent = function (t, e) {
					for (; t.parentNode && t != document.body; )
						if (((t = t.parentNode), r(t, e))) return t;
				}),
				(h.getQueryElement = function (t) {
					return 'string' == typeof t ? document.querySelector(t) : t;
				}),
				(h.handleEvent = function (t) {
					var e = 'on' + t.type;
					this[e] && this[e](t);
				}),
				(h.filterFindElements = function (t, o) {
					t = h.makeArray(t);
					var s = [];
					return (
						t.forEach(function (t) {
							var e;
							if (
								((e = t),
								'object' == typeof HTMLElement
									? e instanceof HTMLElement
									: e &&
									  'object' == typeof e &&
									  null !== e &&
									  1 === e.nodeType &&
									  'string' == typeof e.nodeName)
							)
								if (o) {
									r(t, o) && s.push(t);
									for (
										var i = t.querySelectorAll(o), n = 0;
										n < i.length;
										n++
									)
										s.push(i[n]);
								} else s.push(t);
						}),
						s
					);
				}),
				(h.debounceMethod = function (t, e, n) {
					n = n || 100;
					var o = t.prototype[e],
						s = e + 'Timeout';
					t.prototype[e] = function () {
						var t = this[s],
							e = (clearTimeout(t), arguments),
							i = this;
						this[s] = setTimeout(function () {
							o.apply(i, e), delete i[s];
						}, n);
					};
				}),
				(h.docReady = function (t) {
					var e = document.readyState;
					'complete' == e || 'interactive' == e
						? setTimeout(t)
						: document.addEventListener('DOMContentLoaded', t);
				}),
				(h.toDashed = function (t) {
					return t
						.replace(/(.)([A-Z])/g, function (t, e, i) {
							return e + '-' + i;
						})
						.toLowerCase();
				}),
				i.console);
		return (
			(h.htmlInit = function (r, a) {
				h.docReady(function () {
					var t = h.toDashed(a),
						n = 'data-' + t,
						e = document.querySelectorAll('[' + n + ']'),
						t = document.querySelectorAll('.js-' + t),
						e = h.makeArray(e).concat(h.makeArray(t)),
						o = n + '-options',
						s = i.jQuery;
					e.forEach(function (e) {
						var t,
							i = e.getAttribute(n) || e.getAttribute(o);
						try {
							t = i && JSON.parse(i);
						} catch (t) {
							return void (
								u &&
								u.error(
									'Error parsing ' +
										n +
										' on ' +
										e.className +
										': ' +
										t
								)
							);
						}
						i = new r(e, t);
						s && s.data(e, a, i);
					});
				});
			}),
			h
		);
	}),
	(function (t, e) {
		(t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize));
	})(window, function (t, e) {
		'use strict';
		var i = document.documentElement.style,
			n =
				'string' == typeof i.transition
					? 'transition'
					: 'WebkitTransition',
			i =
				'string' == typeof i.transform
					? 'transform'
					: 'WebkitTransform',
			o = {
				WebkitTransition: 'webkitTransitionEnd',
				transition: 'transitionend',
			}[n],
			s = {
				transform: i,
				transition: n,
				transitionDuration: n + 'Duration',
				transitionProperty: n + 'Property',
				transitionDelay: n + 'Delay',
			};
		function r(t, e) {
			t &&
				((this.element = t),
				(this.layout = e),
				(this.position = { x: 0, y: 0 }),
				this._create());
		}
		t = r.prototype = Object.create(t.prototype);
		(t.constructor = r),
			(t._create = function () {
				(this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
					this.css({ position: 'absolute' });
			}),
			(t.handleEvent = function (t) {
				var e = 'on' + t.type;
				this[e] && this[e](t);
			}),
			(t.getSize = function () {
				this.size = e(this.element);
			}),
			(t.css = function (t) {
				var e,
					i = this.element.style;
				for (e in t) i[s[e] || e] = t[e];
			}),
			(t.getPosition = function () {
				var t = getComputedStyle(this.element),
					e = this.layout._getOption('originLeft'),
					i = this.layout._getOption('originTop'),
					n = t[e ? 'left' : 'right'],
					t = t[i ? 'top' : 'bottom'],
					o = parseFloat(n),
					s = parseFloat(t),
					r = this.layout.size;
				-1 != n.indexOf('%') && (o = (o / 100) * r.width),
					-1 != t.indexOf('%') && (s = (s / 100) * r.height),
					(o = isNaN(o) ? 0 : o),
					(s = isNaN(s) ? 0 : s),
					(o -= e ? r.paddingLeft : r.paddingRight),
					(s -= i ? r.paddingTop : r.paddingBottom),
					(this.position.x = o),
					(this.position.y = s);
			}),
			(t.layoutPosition = function () {
				var t = this.layout.size,
					e = {},
					i = this.layout._getOption('originLeft'),
					n = this.layout._getOption('originTop'),
					o = i ? 'right' : 'left',
					s = this.position.x + t[i ? 'paddingLeft' : 'paddingRight'],
					i =
						((e[i ? 'left' : 'right'] = this.getXValue(s)),
						(e[o] = ''),
						n ? 'paddingTop' : 'paddingBottom'),
					s = n ? 'bottom' : 'top',
					o = this.position.y + t[i];
				(e[n ? 'top' : 'bottom'] = this.getYValue(o)),
					(e[s] = ''),
					this.css(e),
					this.emitEvent('layout', [this]);
			}),
			(t.getXValue = function (t) {
				var e = this.layout._getOption('horizontal');
				return this.layout.options.percentPosition && !e
					? (t / this.layout.size.width) * 100 + '%'
					: t + 'px';
			}),
			(t.getYValue = function (t) {
				var e = this.layout._getOption('horizontal');
				return this.layout.options.percentPosition && e
					? (t / this.layout.size.height) * 100 + '%'
					: t + 'px';
			}),
			(t._transitionTo = function (t, e) {
				this.getPosition();
				var i = this.position.x,
					n = this.position.y,
					o = t == this.position.x && e == this.position.y;
				this.setPosition(t, e),
					o && !this.isTransitioning
						? this.layoutPosition()
						: (((o = {}).transform = this.getTranslate(
								t - i,
								e - n
						  )),
						  this.transition({
								to: o,
								onTransitionEnd: {
									transform: this.layoutPosition,
								},
								isCleaning: !0,
						  }));
			}),
			(t.getTranslate = function (t, e) {
				return (
					'translate3d(' +
					(t = this.layout._getOption('originLeft') ? t : -t) +
					'px, ' +
					(e = this.layout._getOption('originTop') ? e : -e) +
					'px, 0)'
				);
			}),
			(t.goTo = function (t, e) {
				this.setPosition(t, e), this.layoutPosition();
			}),
			(t.moveTo = t._transitionTo),
			(t.setPosition = function (t, e) {
				(this.position.x = parseFloat(t)),
					(this.position.y = parseFloat(e));
			}),
			(t._nonTransition = function (t) {
				for (var e in (this.css(t.to),
				t.isCleaning && this._removeStyles(t.to),
				t.onTransitionEnd))
					t.onTransitionEnd[e].call(this);
			}),
			(t.transition = function (t) {
				if (parseFloat(this.layout.options.transitionDuration)) {
					var e,
						i = this._transn;
					for (e in t.onTransitionEnd)
						i.onEnd[e] = t.onTransitionEnd[e];
					for (e in t.to)
						(i.ingProperties[e] = !0),
							t.isCleaning && (i.clean[e] = !0);
					t.from && (this.css(t.from), this.element.offsetHeight, 0),
						this.enableTransition(t.to),
						this.css(t.to),
						(this.isTransitioning = !0);
				} else this._nonTransition(t);
			});
		var a =
				'opacity,' +
				i.replace(/([A-Z])/g, function (t) {
					return '-' + t.toLowerCase();
				}),
			h =
				((t.enableTransition = function () {
					var t;
					this.isTransitioning ||
						((t = this.layout.options.transitionDuration),
						this.css({
							transitionProperty: a,
							transitionDuration: (t =
								'number' == typeof t ? t + 'ms' : t),
							transitionDelay: this.staggerDelay || 0,
						}),
						this.element.addEventListener(o, this, !1));
				}),
				(t.onwebkitTransitionEnd = function (t) {
					this.ontransitionend(t);
				}),
				(t.onotransitionend = function (t) {
					this.ontransitionend(t);
				}),
				{ '-webkit-transform': 'transform' }),
			u =
				((t.ontransitionend = function (t) {
					var e, i;
					t.target === this.element &&
						((e = this._transn),
						(i = h[t.propertyName] || t.propertyName),
						delete e.ingProperties[i],
						(function (t) {
							for (var e in t) return;
							return 1;
						})(e.ingProperties) && this.disableTransition(),
						i in e.clean &&
							((this.element.style[t.propertyName] = ''),
							delete e.clean[i]),
						i in e.onEnd &&
							(e.onEnd[i].call(this), delete e.onEnd[i]),
						this.emitEvent('transitionEnd', [this]));
				}),
				(t.disableTransition = function () {
					this.removeTransitionStyles(),
						this.element.removeEventListener(o, this, !1),
						(this.isTransitioning = !1);
				}),
				(t._removeStyles = function (t) {
					var e,
						i = {};
					for (e in t) i[e] = '';
					this.css(i);
				}),
				{
					transitionProperty: '',
					transitionDuration: '',
					transitionDelay: '',
				});
		return (
			(t.removeTransitionStyles = function () {
				this.css(u);
			}),
			(t.stagger = function (t) {
				(t = isNaN(t) ? 0 : t), (this.staggerDelay = t + 'ms');
			}),
			(t.removeElem = function () {
				this.element.parentNode.removeChild(this.element),
					this.css({ display: '' }),
					this.emitEvent('remove', [this]);
			}),
			(t.remove = function () {
				n && parseFloat(this.layout.options.transitionDuration)
					? (this.once('transitionEnd', function () {
							this.removeElem();
					  }),
					  this.hide())
					: this.removeElem();
			}),
			(t.reveal = function () {
				delete this.isHidden, this.css({ display: '' });
				var t = this.layout.options,
					e = {};
				(e[this.getHideRevealTransitionEndProperty('visibleStyle')] =
					this.onRevealTransitionEnd),
					this.transition({
						from: t.hiddenStyle,
						to: t.visibleStyle,
						isCleaning: !0,
						onTransitionEnd: e,
					});
			}),
			(t.onRevealTransitionEnd = function () {
				this.isHidden || this.emitEvent('reveal');
			}),
			(t.getHideRevealTransitionEndProperty = function (t) {
				var e,
					t = this.layout.options[t];
				if (t.opacity) return 'opacity';
				for (e in t) return e;
			}),
			(t.hide = function () {
				(this.isHidden = !0), this.css({ display: '' });
				var t = this.layout.options,
					e = {};
				(e[this.getHideRevealTransitionEndProperty('hiddenStyle')] =
					this.onHideTransitionEnd),
					this.transition({
						from: t.visibleStyle,
						to: t.hiddenStyle,
						isCleaning: !0,
						onTransitionEnd: e,
					});
			}),
			(t.onHideTransitionEnd = function () {
				this.isHidden &&
					(this.css({ display: 'none' }), this.emitEvent('hide'));
			}),
			(t.destroy = function () {
				this.css({
					position: '',
					left: '',
					right: '',
					top: '',
					bottom: '',
					transition: '',
					transform: '',
				});
			}),
			r
		);
	}),
	(function (t, e) {
		'use strict';
		t.Outlayer = e(
			t,
			t.EvEmitter,
			t.getSize,
			t.fizzyUIUtils,
			t.Outlayer.Item
		);
	})(window, function (t, e, o, n, s) {
		'use strict';
		function i() {}
		var r = t.console,
			a = t.jQuery,
			h = 0,
			u = {};
		function l(t, e) {
			var i = n.getQueryElement(t);
			i
				? ((this.element = i),
				  a && (this.$element = a(this.element)),
				  (this.options = n.extend({}, this.constructor.defaults)),
				  this.option(e),
				  (e = ++h),
				  (this.element.outlayerGUID = e),
				  (u[e] = this)._create(),
				  this._getOption('initLayout') && this.layout())
				: r &&
				  r.error(
						'Bad element for ' +
							this.constructor.namespace +
							': ' +
							(i || t)
				  );
		}
		(l.namespace = 'outlayer'),
			(l.Item = s),
			(l.defaults = {
				containerStyle: { position: 'relative' },
				initLayout: !0,
				originLeft: !0,
				originTop: !0,
				resize: !0,
				resizeContainer: !0,
				transitionDuration: '0.4s',
				hiddenStyle: { opacity: 0, transform: 'scale(0.001)' },
				visibleStyle: { opacity: 1, transform: 'scale(1)' },
			});
		var d = l.prototype;
		function c(t) {
			function e() {
				t.apply(this, arguments);
			}
			return ((e.prototype = Object.create(t.prototype)).constructor = e);
		}
		n.extend(d, e.prototype),
			(d.option = function (t) {
				n.extend(this.options, t);
			}),
			(d._getOption = function (t) {
				var e = this.constructor.compatOptions[t];
				return e && void 0 !== this.options[e]
					? this.options[e]
					: this.options[t];
			}),
			(l.compatOptions = {
				initLayout: 'isInitLayout',
				horizontal: 'isHorizontal',
				layoutInstant: 'isLayoutInstant',
				originLeft: 'isOriginLeft',
				originTop: 'isOriginTop',
				resize: 'isResizeBound',
				resizeContainer: 'isResizingContainer',
			}),
			(d._create = function () {
				this.reloadItems(),
					(this.stamps = []),
					this.stamp(this.options.stamp),
					n.extend(this.element.style, this.options.containerStyle),
					this._getOption('resize') && this.bindResize();
			}),
			(d.reloadItems = function () {
				this.items = this._itemize(this.element.children);
			}),
			(d._itemize = function (t) {
				for (
					var e = this._filterFindItemElements(t),
						i = this.constructor.Item,
						n = [],
						o = 0;
					o < e.length;
					o++
				) {
					var s = new i(e[o], this);
					n.push(s);
				}
				return n;
			}),
			(d._filterFindItemElements = function (t) {
				return n.filterFindElements(t, this.options.itemSelector);
			}),
			(d.getItemElements = function () {
				return this.items.map(function (t) {
					return t.element;
				});
			}),
			(d.layout = function () {
				this._resetLayout(), this._manageStamps();
				var t = this._getOption('layoutInstant'),
					t = void 0 !== t ? t : !this._isLayoutInited;
				this.layoutItems(this.items, t), (this._isLayoutInited = !0);
			}),
			(d._init = d.layout),
			(d._resetLayout = function () {
				this.getSize();
			}),
			(d.getSize = function () {
				this.size = o(this.element);
			}),
			(d._getMeasurement = function (t, e) {
				var i,
					n = this.options[t];
				n
					? ('string' == typeof n
							? (i = this.element.querySelector(n))
							: n instanceof HTMLElement && (i = n),
					  (this[t] = i ? o(i)[e] : n))
					: (this[t] = 0);
			}),
			(d.layoutItems = function (t, e) {
				(t = this._getItemsForLayout(t)),
					this._layoutItems(t, e),
					this._postLayout();
			}),
			(d._getItemsForLayout = function (t) {
				return t.filter(function (t) {
					return !t.isIgnored;
				});
			}),
			(d._layoutItems = function (t, i) {
				var n;
				this._emitCompleteOnItems('layout', t),
					t &&
						t.length &&
						((n = []),
						t.forEach(function (t) {
							var e = this._getItemLayoutPosition(t);
							(e.item = t),
								(e.isInstant = i || t.isLayoutInstant),
								n.push(e);
						}, this),
						this._processLayoutQueue(n));
			}),
			(d._getItemLayoutPosition = function () {
				return { x: 0, y: 0 };
			}),
			(d._processLayoutQueue = function (t) {
				this.updateStagger(),
					t.forEach(function (t, e) {
						this._positionItem(t.item, t.x, t.y, t.isInstant, e);
					}, this);
			}),
			(d.updateStagger = function () {
				var t = this.options.stagger;
				if (null != t)
					return (
						(this.stagger = (function (t) {
							if ('number' == typeof t) return t;
							var t = t.match(/(^\d*\.?\d*)(\w*)/),
								e = t && t[1],
								t = t && t[2];
							if (!e.length) return 0;
							e = parseFloat(e);
							t = f[t] || 1;
							return e * t;
						})(t)),
						this.stagger
					);
				this.stagger = 0;
			}),
			(d._positionItem = function (t, e, i, n, o) {
				n
					? t.goTo(e, i)
					: (t.stagger(o * this.stagger), t.moveTo(e, i));
			}),
			(d._postLayout = function () {
				this.resizeContainer();
			}),
			(d.resizeContainer = function () {
				var t;
				this._getOption('resizeContainer') &&
					(t = this._getContainerSize()) &&
					(this._setContainerMeasure(t.width, !0),
					this._setContainerMeasure(t.height, !1));
			}),
			(d._getContainerSize = i),
			(d._setContainerMeasure = function (t, e) {
				var i;
				void 0 !== t &&
					((i = this.size).isBorderBox &&
						(t += e
							? i.paddingLeft +
							  i.paddingRight +
							  i.borderLeftWidth +
							  i.borderRightWidth
							: i.paddingBottom +
							  i.paddingTop +
							  i.borderTopWidth +
							  i.borderBottomWidth),
					(t = Math.max(t, 0)),
					(this.element.style[e ? 'width' : 'height'] = t + 'px'));
			}),
			(d._emitCompleteOnItems = function (e, t) {
				var i = this;
				function n() {
					i.dispatchEvent(e + 'Complete', null, [t]);
				}
				var o,
					s = t.length;
				function r() {
					++o == s && n();
				}
				t && s
					? ((o = 0),
					  t.forEach(function (t) {
							t.once(e, r);
					  }))
					: n();
			}),
			(d.dispatchEvent = function (t, e, i) {
				var n = e ? [e].concat(i) : i;
				this.emitEvent(t, n),
					a &&
						((this.$element = this.$element || a(this.element)),
						e
							? (((n = a.Event(e)).type = t),
							  this.$element.trigger(n, i))
							: this.$element.trigger(t, i));
			}),
			(d.ignore = function (t) {
				t = this.getItem(t);
				t && (t.isIgnored = !0);
			}),
			(d.unignore = function (t) {
				t = this.getItem(t);
				t && delete t.isIgnored;
			}),
			(d.stamp = function (t) {
				(t = this._find(t)) &&
					((this.stamps = this.stamps.concat(t)),
					t.forEach(this.ignore, this));
			}),
			(d.unstamp = function (t) {
				(t = this._find(t)) &&
					t.forEach(function (t) {
						n.removeFrom(this.stamps, t), this.unignore(t);
					}, this);
			}),
			(d._find = function (t) {
				if (t)
					return (
						'string' == typeof t &&
							(t = this.element.querySelectorAll(t)),
						(t = n.makeArray(t))
					);
			}),
			(d._manageStamps = function () {
				this.stamps &&
					this.stamps.length &&
					(this._getBoundingRect(),
					this.stamps.forEach(this._manageStamp, this));
			}),
			(d._getBoundingRect = function () {
				var t = this.element.getBoundingClientRect(),
					e = this.size;
				this._boundingRect = {
					left: t.left + e.paddingLeft + e.borderLeftWidth,
					top: t.top + e.paddingTop + e.borderTopWidth,
					right: t.right - (e.paddingRight + e.borderRightWidth),
					bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
				};
			}),
			(d._manageStamp = i),
			(d._getElementOffset = function (t) {
				var e = t.getBoundingClientRect(),
					i = this._boundingRect,
					t = o(t);
				return {
					left: e.left - i.left - t.marginLeft,
					top: e.top - i.top - t.marginTop,
					right: i.right - e.right - t.marginRight,
					bottom: i.bottom - e.bottom - t.marginBottom,
				};
			}),
			(d.handleEvent = n.handleEvent),
			(d.bindResize = function () {
				t.addEventListener('resize', this), (this.isResizeBound = !0);
			}),
			(d.unbindResize = function () {
				t.removeEventListener('resize', this),
					(this.isResizeBound = !1);
			}),
			(d.onresize = function () {
				this.resize();
			}),
			n.debounceMethod(l, 'onresize', 100),
			(d.resize = function () {
				this.isResizeBound && this.needsResizeLayout() && this.layout();
			}),
			(d.needsResizeLayout = function () {
				var t = o(this.element);
				return this.size && t && t.innerWidth !== this.size.innerWidth;
			}),
			(d.addItems = function (t) {
				t = this._itemize(t);
				return t.length && (this.items = this.items.concat(t)), t;
			}),
			(d.appended = function (t) {
				t = this.addItems(t);
				t.length && (this.layoutItems(t, !0), this.reveal(t));
			}),
			(d.prepended = function (t) {
				var e,
					t = this._itemize(t);
				t.length &&
					((e = this.items.slice(0)),
					(this.items = t.concat(e)),
					this._resetLayout(),
					this._manageStamps(),
					this.layoutItems(t, !0),
					this.reveal(t),
					this.layoutItems(e));
			}),
			(d.reveal = function (t) {
				var i;
				this._emitCompleteOnItems('reveal', t),
					t &&
						t.length &&
						((i = this.updateStagger()),
						t.forEach(function (t, e) {
							t.stagger(e * i), t.reveal();
						}));
			}),
			(d.hide = function (t) {
				var i;
				this._emitCompleteOnItems('hide', t),
					t &&
						t.length &&
						((i = this.updateStagger()),
						t.forEach(function (t, e) {
							t.stagger(e * i), t.hide();
						}));
			}),
			(d.revealItemElements = function (t) {
				t = this.getItems(t);
				this.reveal(t);
			}),
			(d.hideItemElements = function (t) {
				t = this.getItems(t);
				this.hide(t);
			}),
			(d.getItem = function (t) {
				for (var e = 0; e < this.items.length; e++) {
					var i = this.items[e];
					if (i.element == t) return i;
				}
			}),
			(d.getItems = function (t) {
				t = n.makeArray(t);
				var e = [];
				return (
					t.forEach(function (t) {
						t = this.getItem(t);
						t && e.push(t);
					}, this),
					e
				);
			}),
			(d.remove = function (t) {
				t = this.getItems(t);
				this._emitCompleteOnItems('remove', t),
					t &&
						t.length &&
						t.forEach(function (t) {
							t.remove(), n.removeFrom(this.items, t);
						}, this);
			}),
			(d.destroy = function () {
				var t = this.element.style,
					t =
						((t.height = ''),
						(t.position = ''),
						(t.width = ''),
						this.items.forEach(function (t) {
							t.destroy();
						}),
						this.unbindResize(),
						this.element.outlayerGUID);
				delete u[t],
					delete this.element.outlayerGUID,
					a && a.removeData(this.element, this.constructor.namespace);
			}),
			(l.data = function (t) {
				t = (t = n.getQueryElement(t)) && t.outlayerGUID;
				return t && u[t];
			}),
			(l.create = function (t, e) {
				var i = c(l);
				return (
					(i.defaults = n.extend({}, l.defaults)),
					n.extend(i.defaults, e),
					(i.compatOptions = n.extend({}, l.compatOptions)),
					(i.namespace = t),
					(i.data = l.data),
					(i.Item = c(s)),
					n.htmlInit(i, t),
					a && a.bridget && a.bridget(t, i),
					i
				);
			});
		var f = { ms: 1, s: 1e3 };
		return (l.Item = s), l;
	}),
	(function (t, e) {
		(t.ModulaIsotope = t.ModulaIsotope || {}),
			(t.ModulaIsotope.Item = e(t.Outlayer));
	})(window, function (t) {
		'use strict';
		function e() {
			t.Item.apply(this, arguments);
		}
		var i = (e.prototype = Object.create(t.Item.prototype)),
			n = i._create,
			o =
				((i._create = function () {
					(this.id = this.layout.itemGUID++),
						n.call(this),
						(this.sortData = {});
				}),
				(i.updateSortData = function () {
					if (!this.isIgnored) {
						(this.sortData.id = this.id),
							(this.sortData['original-order'] = this.id),
							(this.sortData.random = Math.random());
						var t,
							e = this.layout.options.getSortData,
							i = this.layout._sorters;
						for (t in e) {
							var n = i[t];
							this.sortData[t] = n(this.element, this);
						}
					}
				}),
				i.destroy);
		return (
			(i.destroy = function () {
				o.apply(this, arguments), this.css({ display: '' });
			}),
			e
		);
	}),
	(function (t, e) {
		(t.ModulaIsotope = t.ModulaIsotope || {}),
			(t.ModulaIsotope.LayoutMode = e(t.getSize, t.Outlayer));
	})(window, function (e, i) {
		'use strict';
		function n(t) {
			(this.isotope = t) &&
				((this.options = t.options[this.namespace]),
				(this.element = t.element),
				(this.items = t.filteredItems),
				(this.size = t.size));
		}
		var o = n.prototype;
		return (
			[
				'_resetLayout',
				'_getItemLayoutPosition',
				'_manageStamp',
				'_getContainerSize',
				'_getElementOffset',
				'needsResizeLayout',
				'_getOption',
			].forEach(function (t) {
				o[t] = function () {
					return i.prototype[t].apply(this.isotope, arguments);
				};
			}),
			(o.needsVerticalResizeLayout = function () {
				var t = e(this.isotope.element);
				return (
					this.isotope.size &&
					t &&
					t.innerHeight != this.isotope.size.innerHeight
				);
			}),
			(o._getMeasurement = function () {
				this.isotope._getMeasurement.apply(this, arguments);
			}),
			(o.getColumnWidth = function () {
				this.getSegmentSize('column', 'Width');
			}),
			(o.getRowHeight = function () {
				this.getSegmentSize('row', 'Height');
			}),
			(o.getSegmentSize = function (t, e) {
				var i,
					t = t + e,
					n = 'outer' + e;
				this._getMeasurement(t, n),
					this[t] ||
						((i = this.getFirstItemSize()),
						(this[t] =
							(i && i[n]) || this.isotope.size['inner' + e]));
			}),
			(o.getFirstItemSize = function () {
				var t = this.isotope.filteredItems[0];
				return t && t.element && e(t.element);
			}),
			(o.layout = function () {
				this.isotope.layout.apply(this.isotope, arguments);
			}),
			(o.getSize = function () {
				this.isotope.getSize(), (this.size = this.isotope.size);
			}),
			(n.modes = {}),
			(n.create = function (t, e) {
				function i() {
					n.apply(this, arguments);
				}
				return (
					((i.prototype = Object.create(o)).constructor = i),
					e && (i.options = e),
					(n.modes[(i.prototype.namespace = t)] = i)
				);
			}),
			n
		);
	}),
	(function (t) {
		t.Masonry = (function (t, d) {
			var e = t.create('masonry');
			e.compatOptions.fitWidth = 'isFitWidth';
			var i = e.prototype;
			i._resetLayout = function () {
				this.getSize();
				this._getMeasurement('columnWidth', 'outerWidth');
				this._getMeasurement('gutter', 'outerWidth');
				this.measureColumns();
				this.colYs = [];
				for (var t = 0; t < this.cols; t++) this.colYs.push(0);
				this.maxY = 0;
				this.horizontalColIndex = 0;
			};
			i.measureColumns = function () {
				this.getContainerWidth();
				if (!this.columnWidth) {
					var t = this.items[0];
					var e = t && t.element;
					this.columnWidth =
						(e && d(e).outerWidth) || this.containerWidth;
				}
				var i = (this.columnWidth += this.gutter);
				var n = this.containerWidth + this.gutter;
				var o = n / i;
				var s = i - (n % i);
				var r = s && s < 1 ? 'round' : 'floor';
				o = Math[r](o);
				this.cols = Math.max(o, 1);
			};
			i.getContainerWidth = function () {
				var t = this._getOption('fitWidth');
				var e = t ? this.element.parentNode : this.element;
				var i = d(e);
				this.containerWidth = i && i.innerWidth;
			};
			i._getItemLayoutPosition = function (t) {
				t.getSize();
				var e = t.size.outerWidth % this.columnWidth;
				var i = e && e < 1 ? 'round' : 'ceil';
				var n = Math[i](t.size.outerWidth / this.columnWidth);
				n = Math.min(n, this.cols);
				var o = this.options.horizontalOrder
					? '_getHorizontalColPosition'
					: '_getTopColPosition';
				var s = this[o](n, t);
				var r = { x: this.columnWidth * s.col, y: s.y };
				var a = s.y + t.size.outerHeight;
				var h = n + s.col;
				for (var u = s.col; u < h; u++) this.colYs[u] = a;
				return r;
			};
			i._getTopColPosition = function (t) {
				var e = this._getTopColGroup(t);
				var i = Math.min.apply(Math, e);
				return { col: e.indexOf(i), y: i };
			};
			i._getTopColGroup = function (t) {
				if (t < 2) return this.colYs;
				var e = [];
				var i = this.cols + 1 - t;
				for (var n = 0; n < i; n++) e[n] = this._getColGroupY(n, t);
				return e;
			};
			i._getColGroupY = function (t, e) {
				if (e < 2) return this.colYs[t];
				var i = this.colYs.slice(t, t + e);
				return Math.max.apply(Math, i);
			};
			i._getHorizontalColPosition = function (t, e) {
				var i = this.horizontalColIndex % this.cols;
				var n = t > 1 && i + t > this.cols;
				i = n ? 0 : i;
				var o = e.size.outerWidth && e.size.outerHeight;
				this.horizontalColIndex = o ? i + t : this.horizontalColIndex;
				return { col: i, y: this._getColGroupY(i, t) };
			};
			i._manageStamp = function (t) {
				var e = d(t);
				var i = this._getElementOffset(t);
				var n = this._getOption('originLeft');
				var o = n ? i.left : i.right;
				var s = o + e.outerWidth;
				var r = Math.floor(o / this.columnWidth);
				r = Math.max(0, r);
				var a = Math.floor(s / this.columnWidth);
				a -= s % this.columnWidth ? 0 : 1;
				a = Math.min(this.cols - 1, a);
				var h = this._getOption('originTop');
				var u = (h ? i.top : i.bottom) + e.outerHeight;
				for (var l = r; l <= a; l++)
					this.colYs[l] = Math.max(u, this.colYs[l]);
			};
			i._getContainerSize = function () {
				this.maxY = Math.max.apply(Math, this.colYs);
				var t = { height: this.maxY };
				if (this._getOption('fitWidth'))
					t.width = this._getContainerFitWidth();
				return t;
			};
			i._getContainerFitWidth = function () {
				var t = 0;
				var e = this.cols;
				while (--e) {
					if (this.colYs[e] !== 0) break;
					t++;
				}
				return (this.cols - t) * this.columnWidth - this.gutter;
			};
			i.needsResizeLayout = function () {
				var t = this.containerWidth;
				this.getContainerWidth();
				return t != this.containerWidth;
			};
			return e;
		})(t.Outlayer, t.getSize);
	})(window),
	(function (t, e) {
		e(t.ModulaIsotope.LayoutMode, t.Masonry);
	})(window, function (t, e) {
		'use strict';
		var i,
			t = t.create('masonry'),
			n = t.prototype,
			o = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
		for (i in e.prototype) o[i] || (n[i] = e.prototype[i]);
		var s = n.measureColumns,
			r =
				((n.measureColumns = function () {
					(this.items = this.isotope.filteredItems), s.call(this);
				}),
				n._getOption);
		n._getOption = function (t) {
			return 'fitWidth' == t
				? void 0 !== this.options.isFitWidth
					? this.options.isFitWidth
					: this.options.fitWidth
				: r.apply(this.isotope, arguments);
		};
	}),
	(function () {
		'use strict';
		var t = window.ModulaIsotope.LayoutMode.create('fitRows'),
			t = t.prototype;
		(t._resetLayout = function () {
			(this.x = 0),
				(this.y = 0),
				(this.maxY = 0),
				this._getMeasurement('gutter', 'outerWidth');
		}),
			(t._getItemLayoutPosition = function (t) {
				t.getSize();
				var e = t.size.outerWidth + this.gutter,
					i = this.isotope.size.innerWidth + this.gutter,
					i =
						(0 !== this.x &&
							e + this.x > i &&
							((this.x = 0), (this.y = this.maxY)),
						{ x: this.x, y: this.y });
				return (
					(this.maxY = Math.max(
						this.maxY,
						this.y + t.size.outerHeight
					)),
					(this.x += e),
					i
				);
			}),
			(t._getContainerSize = function () {
				return { height: this.maxY };
			});
	})(),
	(function () {
		'use strict';
		var t = window.ModulaIsotope.LayoutMode.create('vertical', {
				horizontalAlignment: 0,
			}),
			t = t.prototype;
		(t._resetLayout = function () {
			this.y = 0;
		}),
			(t._getItemLayoutPosition = function (t) {
				t.getSize();
				var e =
						(this.isotope.size.innerWidth - t.size.outerWidth) *
						this.options.horizontalAlignment,
					i = this.y;
				return (this.y += t.size.outerHeight), { x: e, y: i };
			}),
			(t._getContainerSize = function () {
				return { height: this.y };
			});
	})(),
	(function (t, e) {
		t.ModulaIsotope = e(
			t,
			t.Outlayer,
			t.getSize,
			t.matchesSelector,
			t.fizzyUIUtils,
			t.ModulaIsotope.Item,
			t.ModulaIsotope.LayoutMode
		);
	})(window, function (t, i, e, n, s, o, r) {
		var a = t.jQuery,
			h = String.prototype.trim
				? function (t) {
						return t.trim();
				  }
				: function (t) {
						return t.replace(/^\s+|\s+$/g, '');
				  },
			u = i.create('modulaisotope', {
				layoutMode: 'masonry',
				isJQueryFiltering: !0,
				sortAscending: !0,
			}),
			t = ((u.Item = o), (u.LayoutMode = r), u.prototype),
			l =
				((t._create = function () {
					for (var t in ((this.itemGUID = 0),
					(this._sorters = {}),
					this._getSorters(),
					i.prototype._create.call(this),
					(this.modes = {}),
					(this.filteredItems = this.items),
					(this.sortHistory = ['original-order']),
					r.modes))
						this._initLayoutMode(t);
				}),
				(t.reloadItems = function () {
					(this.itemGUID = 0), i.prototype.reloadItems.call(this);
				}),
				(t._itemize = function () {
					for (
						var t = i.prototype._itemize.apply(this, arguments),
							e = 0;
						e < t.length;
						e++
					)
						t[e].id = this.itemGUID++;
					return this._updateItemsSortData(t), t;
				}),
				(t._initLayoutMode = function (t) {
					var e = r.modes[t],
						i = this.options[t] || {};
					(this.options[t] = e.options ? s.extend(e.options, i) : i),
						(this.modes[t] = new e(this));
				}),
				(t.layout = function () {
					!this._isLayoutInited && this._getOption('initLayout')
						? this.arrange()
						: this._layout();
				}),
				(t._layout = function () {
					var t = this._getIsInstant();
					this._resetLayout(),
						this._manageStamps(),
						this.layoutItems(this.filteredItems, t),
						(this._isLayoutInited = !0);
				}),
				(t.arrange = function (t) {
					this.option(t), this._getIsInstant();
					t = this._filter(this.items);
					(this.filteredItems = t.matches),
						this._bindArrangeComplete(),
						this._isInstant
							? this._noTransition(this._hideReveal, [t])
							: this._hideReveal(t),
						this._sort(),
						this._layout();
				}),
				(t._init = t.arrange),
				(t._hideReveal = function (t) {
					this.reveal(t.needReveal), this.hide(t.needHide);
				}),
				(t._getIsInstant = function () {
					var t = this._getOption('layoutInstant'),
						t = void 0 !== t ? t : !this._isLayoutInited;
					return (this._isInstant = t);
				}),
				(t._bindArrangeComplete = function () {
					var t,
						e,
						i,
						n = this;
					function o() {
						t &&
							e &&
							i &&
							n.dispatchEvent('arrangeComplete', null, [
								n.filteredItems,
							]);
					}
					this.once('layoutComplete', function () {
						(t = !0), o();
					}),
						this.once('hideComplete', function () {
							(e = !0), o();
						}),
						this.once('revealComplete', function () {
							(i = !0), o();
						});
				}),
				(t._filter = function (t) {
					for (
						var e = this.options.filter,
							i = [],
							n = [],
							o = [],
							s = this._getFilterTest(e || '*'),
							r = 0;
						r < t.length;
						r++
					) {
						var a,
							h = t[r];
						h.isIgnored ||
							((a = s(h)) && i.push(h),
							a && h.isHidden
								? n.push(h)
								: a || h.isHidden || o.push(h));
					}
					return { matches: i, needReveal: n, needHide: o };
				}),
				(t._getFilterTest = function (e) {
					return a && this.options.isJQueryFiltering
						? function (t) {
								return a(t.element).is(e);
						  }
						: 'function' == typeof e
						? function (t) {
								return e(t.element);
						  }
						: function (t) {
								return n(t.element, e);
						  };
				}),
				(t.updateSortData = function (t) {
					t = t
						? ((t = s.makeArray(t)), this.getItems(t))
						: this.items;
					this._getSorters(), this._updateItemsSortData(t);
				}),
				(t._getSorters = function () {
					var t,
						e = this.options.getSortData;
					for (t in e) {
						var i = e[t];
						this._sorters[t] = l(i);
					}
				}),
				(t._updateItemsSortData = function (t) {
					for (var e = t && t.length, i = 0; e && i < e; i++)
						t[i].updateSortData();
				}),
				function (t) {
					var e, i, n, o, s;
					return (
						'string' == typeof t &&
							((n = (i = (e = h(t).split(' '))[0]).match(
								/^\[(.+)\]$/
							)),
							(o = (function (e, i) {
								if (e)
									return function (t) {
										return t.getAttribute(e);
									};
								return function (t) {
									t = t.querySelector(i);
									return t && t.textContent;
								};
							})(n && n[1], i)),
							(t = (s = u.sortDataParsers[e[1]])
								? function (t) {
										return t && s(o(t));
								  }
								: function (t) {
										return t && o(t);
								  })),
						t
					);
				});
		(u.sortDataParsers = {
			parseInt: function (t) {
				return parseInt(t, 10);
			},
			parseFloat: function (t) {
				return parseFloat(t);
			},
		}),
			(t._sort = function () {
				var t, r, a;
				this.options.sortBy &&
					((t = s.makeArray(this.options.sortBy)),
					this._getIsSameSortBy(t) ||
						(this.sortHistory = t.concat(this.sortHistory)),
					(r = this.sortHistory),
					(a = this.options.sortAscending),
					this.filteredItems.sort(function (t, e) {
						for (var i = 0; i < r.length; i++) {
							var n = r[i],
								o = t.sortData[n],
								s = e.sortData[n];
							if (s < o || o < s)
								return (
									(s < o ? 1 : -1) *
									((void 0 !== a[n] ? a[n] : a) ? 1 : -1)
								);
						}
						return 0;
					}));
			}),
			(t._getIsSameSortBy = function (t) {
				for (var e = 0; e < t.length; e++)
					if (t[e] != this.sortHistory[e]) return !1;
				return !0;
			}),
			(t._mode = function () {
				var t = this.options.layoutMode,
					e = this.modes[t];
				if (e) return (e.options = this.options[t]), e;
				throw new Error('No layout mode: ' + t);
			}),
			(t._resetLayout = function () {
				i.prototype._resetLayout.call(this),
					this._mode()._resetLayout();
			}),
			(t._getItemLayoutPosition = function (t) {
				return this._mode()._getItemLayoutPosition(t);
			}),
			(t._manageStamp = function (t) {
				this._mode()._manageStamp(t);
			}),
			(t._getContainerSize = function () {
				return this._mode()._getContainerSize();
			}),
			(t.needsResizeLayout = function () {
				return this._mode().needsResizeLayout();
			}),
			(t.appended = function (t) {
				var t = this.addItems(t);
				t.length &&
					((t = this._filterRevealAdded(t)),
					(this.filteredItems = this.filteredItems.concat(t)));
			}),
			(t.prepended = function (t) {
				var e,
					t = this._itemize(t);
				t.length &&
					(this._resetLayout(),
					this._manageStamps(),
					(e = this._filterRevealAdded(t)),
					this.layoutItems(this.filteredItems),
					(this.filteredItems = e.concat(this.filteredItems)),
					(this.items = t.concat(this.items)));
			}),
			(t._filterRevealAdded = function (t) {
				t = this._filter(t);
				return (
					this.hide(t.needHide),
					this.reveal(t.matches),
					this.layoutItems(t.matches, !0),
					t.matches
				);
			}),
			(t.insert = function (t) {
				var e = this.addItems(t);
				if (e.length) {
					for (var i, n = e.length, o = 0; o < n; o++)
						(i = e[o]), this.element.appendChild(i.element);
					t = this._filter(e).matches;
					for (o = 0; o < n; o++) e[o].isLayoutInstant = !0;
					for (this.arrange(), o = 0; o < n; o++)
						delete e[o].isLayoutInstant;
					this.reveal(t);
				}
			});
		var d = t.remove;
		return (
			(t.remove = function (t) {
				t = s.makeArray(t);
				for (
					var e = this.getItems(t),
						i = (d.call(this, t), e && e.length),
						n = 0;
					i && n < i;
					n++
				) {
					var o = e[n];
					s.removeFrom(this.filteredItems, o);
				}
			}),
			(t.shuffle = function () {
				for (var t = 0; t < this.items.length; t++)
					this.items[t].sortData.random = Math.random();
				(this.options.sortBy = 'random'), this._sort(), this._layout();
			}),
			(t._noTransition = function (t, e) {
				var i = this.options.transitionDuration,
					t =
						((this.options.transitionDuration = 0),
						t.apply(this, e));
				return (this.options.transitionDuration = i), t;
			}),
			(t.getFilteredItemElements = function () {
				return this.filteredItems.map(function (t) {
					return t.element;
				});
			}),
			u
		);
	});
!(function (t, i) {
	(t.Packery = t.Packery || {}), (t.Packery.Rect = i());
})(window, function () {
	function o(t) {
		for (var i in o.defaults) this[i] = o.defaults[i];
		for (i in t) this[i] = t[i];
	}
	o.defaults = { x: 0, y: 0, width: 0, height: 0 };
	var t = o.prototype;
	return (
		(t.contains = function (t) {
			var i = t.width || 0,
				e = t.height || 0;
			return (
				this.x <= t.x &&
				this.y <= t.y &&
				this.x + this.width >= t.x + i &&
				this.y + this.height >= t.y + e
			);
		}),
		(t.overlaps = function (t) {
			var i = this.x + this.width,
				e = this.y + this.height,
				s = t.x + t.width,
				h = t.y + t.height;
			return this.x < s && i > t.x && this.y < h && e > t.y;
		}),
		(t.getMaximalFreeRects = function (t) {
			var i, e, s, h, n, r;
			return (
				!!this.overlaps(t) &&
				((i = []),
				(s = this.x + this.width),
				(h = this.y + this.height),
				(n = t.x + t.width),
				(r = t.y + t.height),
				this.y < t.y &&
					((e = new o({
						x: this.x,
						y: this.y,
						width: this.width,
						height: t.y - this.y,
					})),
					i.push(e)),
				n < s &&
					((e = new o({
						x: n,
						y: this.y,
						width: s - n,
						height: this.height,
					})),
					i.push(e)),
				r < h &&
					((e = new o({
						x: this.x,
						y: r,
						width: this.width,
						height: h - r,
					})),
					i.push(e)),
				this.x < t.x &&
					((e = new o({
						x: this.x,
						y: this.y,
						width: t.x - this.x,
						height: this.height,
					})),
					i.push(e)),
				i)
			);
		}),
		(t.canFit = function (t) {
			return this.width >= t.width && this.height >= t.height;
		}),
		o
	);
}),
	(function (t, i) {
		t = t.Packery = t.Packery || {};
		t.Packer = i(t.Rect);
	})(window, function (i) {
		function t(t, i, e) {
			(this.width = t || 0),
				(this.height = i || 0),
				(this.sortDirection = e || 'downwardLeftToRight'),
				this.reset();
		}
		var e = t.prototype,
			s =
				((e.reset = function () {
					this.spaces = [];
					var t = new i({
						x: 0,
						y: 0,
						width: this.width,
						height: this.height,
					});
					this.spaces.push(t),
						(this.sorter =
							s[this.sortDirection] || s.downwardLeftToRight);
				}),
				(e.pack = function (t) {
					for (var i = 0; i < this.spaces.length; i++) {
						var e = this.spaces[i];
						if (e.canFit(t)) {
							this.placeInSpace(t, e);
							break;
						}
					}
				}),
				(e.columnPack = function (t) {
					for (var i = 0; i < this.spaces.length; i++) {
						var e = this.spaces[i];
						if (
							e.x <= t.x &&
							e.x + e.width >= t.x + t.width &&
							e.height >= t.height - 0.01
						) {
							(t.y = e.y), this.placed(t);
							break;
						}
					}
				}),
				(e.rowPack = function (t) {
					for (var i = 0; i < this.spaces.length; i++) {
						var e = this.spaces[i];
						if (
							e.y <= t.y &&
							e.y + e.height >= t.y + t.height &&
							e.width >= t.width - 0.01
						) {
							(t.x = e.x), this.placed(t);
							break;
						}
					}
				}),
				(e.placeInSpace = function (t, i) {
					(t.x = i.x), (t.y = i.y), this.placed(t);
				}),
				(e.placed = function (t) {
					for (var i = [], e = 0; e < this.spaces.length; e++) {
						var s = this.spaces[e],
							h = s.getMaximalFreeRects(t);
						h ? i.push.apply(i, h) : i.push(s);
					}
					(this.spaces = i), this.mergeSortSpaces();
				}),
				(e.mergeSortSpaces = function () {
					t.mergeRects(this.spaces), this.spaces.sort(this.sorter);
				}),
				(e.addSpace = function (t) {
					this.spaces.push(t), this.mergeSortSpaces();
				}),
				(t.mergeRects = function (t) {
					var i = 0,
						e = t[i];
					t: for (; e; ) {
						for (var s = 0, h = t[i + s]; h; ) {
							if (h == e) s++;
							else {
								if (h.contains(e)) {
									t.splice(i, 1), (e = t[i]);
									continue t;
								}
								e.contains(h) ? t.splice(i + s, 1) : s++;
							}
							h = t[i + s];
						}
						e = t[++i];
					}
					return t;
				}),
				{
					downwardLeftToRight: function (t, i) {
						return t.y - i.y || t.x - i.x;
					},
					rightwardTopToBottom: function (t, i) {
						return t.x - i.x || t.y - i.y;
					},
				});
		return t;
	}),
	(function (t, i) {
		t.Packery.Item = i(t.Outlayer, t.Packery.Rect);
	})(window, function (t, i) {
		function e() {
			t.Item.apply(this, arguments);
		}
		var s =
				'string' == typeof document.documentElement.style.transform
					? 'transform'
					: 'WebkitTransform',
			h = (e.prototype = Object.create(t.Item.prototype)),
			n = h._create,
			r =
				((h._create = function () {
					n.call(this), (this.rect = new i());
				}),
				h.moveTo);
		return (
			(h.moveTo = function (t, i) {
				var e = Math.abs(this.position.x - t),
					s = Math.abs(this.position.y - i);
				this.layout.dragItemCount &&
				!this.isPlacing &&
				!this.isTransitioning &&
				e < 1 &&
				s < 1
					? this.goTo(t, i)
					: r.apply(this, arguments);
			}),
			(h.enablePlacing = function () {
				this.removeTransitionStyles(),
					this.isTransitioning &&
						s &&
						(this.element.style[s] = 'none'),
					(this.isTransitioning = !1),
					this.getSize(),
					this.layout._setRectSize(this.element, this.rect),
					(this.isPlacing = !0);
			}),
			(h.disablePlacing = function () {
				this.isPlacing = !1;
			}),
			(h.removeElem = function () {
				this.element.parentNode.removeChild(this.element),
					this.layout.packer.addSpace(this.rect),
					this.emitEvent('remove', [this]);
			}),
			(h.showDropPlaceholder = function () {
				var t = this.dropPlaceholder;
				t ||
					(((t = this.dropPlaceholder =
						document.createElement('div')).className =
						'packery-drop-placeholder'),
					(t.style.position = 'absolute')),
					(t.style.width = this.size.width + 'px'),
					(t.style.height = this.size.height + 'px'),
					this.positionDropPlaceholder(),
					this.layout.element.appendChild(t);
			}),
			(h.positionDropPlaceholder = function () {
				this.dropPlaceholder.style[s] =
					'translate(' + this.rect.x + 'px, ' + this.rect.y + 'px)';
			}),
			(h.hideDropPlaceholder = function () {
				this.layout.element.removeChild(this.dropPlaceholder);
			}),
			e
		);
	}),
	(function (t, i) {
		t.Packery = i(
			t.getSize,
			t.Outlayer,
			t.Packery.Rect,
			t.Packery.Packer,
			t.Packery.Item
		);
	})(window, function (c, t, r, i, e) {
		r.prototype.canFit = function (t) {
			return this.width >= t.width - 1 && this.height >= t.height - 1;
		};
		var s = t.create('packery'),
			e = ((s.Item = e), s.prototype);
		function h(t, i) {
			return t.position.y - i.position.y || t.position.x - i.position.x;
		}
		function n(t, i) {
			return t.position.x - i.position.x || t.position.y - i.position.y;
		}
		(e._create = function () {
			t.prototype._create.call(this),
				(this.packer = new i()),
				(this.shiftPacker = new i()),
				(this.isEnabled = !0),
				(this.dragItemCount = 0);
			var e = this;
			(this.handleDraggabilly = {
				dragStart: function () {
					e.itemDragStart(this.element);
				},
				dragMove: function () {
					e.itemDragMove(
						this.element,
						this.position.x,
						this.position.y
					);
				},
				dragEnd: function () {
					e.itemDragEnd(this.element);
				},
			}),
				(this.handleUIDraggable = {
					start: function (t, i) {
						i && e.itemDragStart(t.currentTarget);
					},
					drag: function (t, i) {
						i &&
							e.itemDragMove(
								t.currentTarget,
								i.position.left,
								i.position.top
							);
					},
					stop: function (t, i) {
						i && e.itemDragEnd(t.currentTarget);
					},
				});
		}),
			(e._resetLayout = function () {
				var t, i, e;
				this.getSize(),
					this._getMeasurements(),
					(e = this._getOption('horizontal')
						? ((t = 1 / 0),
						  (i = this.size.innerHeight + this.gutter),
						  'rightwardTopToBottom')
						: ((t = this.size.innerWidth + this.gutter),
						  (i = 1 / 0),
						  'downwardLeftToRight')),
					(this.packer.width = this.shiftPacker.width = t),
					(this.packer.height = this.shiftPacker.height = i),
					(this.packer.sortDirection =
						this.shiftPacker.sortDirection =
							e),
					this.packer.reset(),
					(this.maxY = 0),
					(this.maxX = 0);
			}),
			(e._getMeasurements = function () {
				this._getMeasurement('columnWidth', 'width'),
					this._getMeasurement('rowHeight', 'height'),
					this._getMeasurement('gutter', 'width');
			}),
			(e._getItemLayoutPosition = function (t) {
				var i;
				return (
					this._setRectSize(t.element, t.rect),
					this.isShifting || 0 < this.dragItemCount
						? ((i = this._getPackMethod()), this.packer[i](t.rect))
						: this.packer.pack(t.rect),
					this._setMaxXY(t.rect),
					t.rect
				);
			}),
			(e.shiftLayout = function () {
				(this.isShifting = !0), this.layout(), delete this.isShifting;
			}),
			(e._getPackMethod = function () {
				return this._getOption('horizontal') ? 'rowPack' : 'columnPack';
			}),
			(e._setMaxXY = function (t) {
				(this.maxX = Math.max(t.x + t.width, this.maxX)),
					(this.maxY = Math.max(t.y + t.height, this.maxY));
			}),
			(e._setRectSize = function (t, i) {
				var t = c(t),
					e = t.outerWidth,
					t = t.outerHeight;
				(e || t) &&
					((e = this._applyGridGutter(e, this.columnWidth)),
					(t = this._applyGridGutter(t, this.rowHeight))),
					(i.width = Math.min(e, this.packer.width)),
					(i.height = Math.min(t, this.packer.height));
			}),
			(e._applyGridGutter = function (t, i) {
				var e;
				return i
					? ((e = t % (i += this.gutter)),
					  Math[e && e < 1 ? 'round' : 'ceil'](t / i) * i)
					: t + this.gutter;
			}),
			(e._getContainerSize = function () {
				return this._getOption('horizontal')
					? { width: this.maxX - this.gutter }
					: { height: this.maxY - this.gutter };
			}),
			(e._manageStamp = function (t) {
				var i = this.getItem(t);
				(i =
					i && i.isPlacing
						? i.rect
						: ((i = this._getElementOffset(t)),
						  new r({
								x: this._getOption('originLeft')
									? i.left
									: i.right,
								y: this._getOption('originTop')
									? i.top
									: i.bottom,
						  }))),
					this._setRectSize(t, i),
					this.packer.placed(i),
					this._setMaxXY(i);
			}),
			(e.sortItemsByPosition = function () {
				var t = this._getOption('horizontal') ? n : h;
				this.items.sort(t);
			}),
			(e.fit = function (t, i, e) {
				t = this.getItem(t);
				t &&
					(this.stamp(t.element),
					t.enablePlacing(),
					this.updateShiftTargets(t),
					(i = void 0 === i ? t.rect.x : i),
					(e = void 0 === e ? t.rect.y : e),
					this.shift(t, i, e),
					this._bindFitEvents(t),
					t.moveTo(t.rect.x, t.rect.y),
					this.shiftLayout(),
					this.unstamp(t.element),
					this.sortItemsByPosition(),
					t.disablePlacing());
			}),
			(e._bindFitEvents = function (t) {
				var i = this,
					e = 0;
				function s() {
					2 == ++e && i.dispatchEvent('fitComplete', null, [t]);
				}
				t.once('layout', s), this.once('layoutComplete', s);
			}),
			(e.resize = function () {
				this.isResizeBound &&
					this.needsResizeLayout() &&
					(this.options.shiftPercentResize
						? this.resizeShiftPercentLayout()
						: this.layout());
			}),
			(e.needsResizeLayout = function () {
				var t = c(this.element),
					i = this._getOption('horizontal')
						? 'innerHeight'
						: 'innerWidth';
				return t[i] != this.size[i];
			}),
			(e.resizeShiftPercentLayout = function () {
				var e,
					i,
					s,
					t = this._getItemsForLayout(this.items),
					h = this._getOption('horizontal'),
					n = h ? 'y' : 'x',
					r = h ? 'height' : 'width',
					o = h ? 'rowHeight' : 'columnWidth',
					h = h ? 'innerHeight' : 'innerWidth',
					a = this[o];
				(a = a && a + this.gutter)
					? (this._getMeasurements(),
					  (e = this[o] + this.gutter),
					  t.forEach(function (t) {
							var i = Math.round(t.rect[n] / a);
							t.rect[n] = i * e;
					  }))
					: ((i = c(this.element)[h] + this.gutter),
					  (s = this.packer[r]),
					  t.forEach(function (t) {
							t.rect[n] = (t.rect[n] / s) * i;
					  })),
					this.shiftLayout();
			}),
			(e.itemDragStart = function (t) {
				this.isEnabled &&
					(this.stamp(t), (t = this.getItem(t))) &&
					(t.enablePlacing(),
					t.showDropPlaceholder(),
					this.dragItemCount++,
					this.updateShiftTargets(t));
			}),
			(e.updateShiftTargets = function (t) {
				this.shiftPacker.reset(), this._getBoundingRect();
				var e = this._getOption('originLeft'),
					s = this._getOption('originTop'),
					a =
						(this.stamps.forEach(function (t) {
							var i = this.getItem(t);
							(i && i.isPlacing) ||
								((i = this._getElementOffset(t)),
								(i = new r({
									x: e ? i.left : i.right,
									y: s ? i.top : i.bottom,
								})),
								this._setRectSize(t, i),
								this.shiftPacker.placed(i));
						}, this),
						this._getOption('horizontal')),
					i = a ? 'rowHeight' : 'columnWidth',
					c = a ? 'height' : 'width',
					g =
						((this.shiftTargetKeys = []),
						(this.shiftTargets = []),
						this[i]);
				if ((g = g && g + this.gutter))
					for (
						var i = Math.ceil(t.rect[c] / g),
							h = Math.floor(
								(this.shiftPacker[c] + this.gutter) / g
							),
							u = (h - i) * g,
							n = 0;
						n < h;
						n++
					)
						this._addShiftTarget(n * g, 0, u);
				else
					(u = this.shiftPacker[c] + this.gutter - t.rect[c]),
						this._addShiftTarget(0, 0, u);
				var i = this._getItemsForLayout(this.items),
					d = this._getPackMethod();
				i.forEach(function (t) {
					var i = t.rect,
						e =
							(this._setRectSize(t.element, i),
							this.shiftPacker[d](i),
							this._addShiftTarget(i.x, i.y, u),
							a ? i.x + i.width : i.x),
						s = a ? i.y : i.y + i.height;
					if ((this._addShiftTarget(e, s, u), g))
						for (var h = Math.round(i[c] / g), n = 1; n < h; n++) {
							var r = a ? e : i.x + g * n,
								o = a ? i.y + g * n : s;
							this._addShiftTarget(r, o, u);
						}
				}, this);
			}),
			(e._addShiftTarget = function (t, i, e) {
				var s = this._getOption('horizontal') ? i : t;
				(0 !== s && e < s) ||
					-1 != this.shiftTargetKeys.indexOf((e = t + ',' + i)) ||
					(this.shiftTargetKeys.push(e),
					this.shiftTargets.push({ x: t, y: i }));
			}),
			(e.shift = function (t, i, e) {
				var s,
					h = 1 / 0,
					n = { x: i, y: e };
				this.shiftTargets.forEach(function (t) {
					(e = (i = n).x - t.x), (i = i.y - t.y);
					var i,
						e = Math.sqrt(e * e + i * i);
					e < h && ((s = t), (h = e));
				}),
					(t.rect.x = s.x),
					(t.rect.y = s.y);
			});
		(e.itemDragMove = function (t, i, e) {
			var s,
				h = this.isEnabled && this.getItem(t);
			function n() {
				s.shift(h, i, e), h.positionDropPlaceholder(), s.layout();
			}
			h &&
				((i -= this.size.paddingLeft),
				(e -= this.size.paddingTop),
				(s = this),
				(t = new Date()),
				this._itemDragTime && t - this._itemDragTime < 120
					? (clearTimeout(this.dragTimeout),
					  (this.dragTimeout = setTimeout(n, 120)))
					: (n(), (this._itemDragTime = t)));
		}),
			(e.itemDragEnd = function (t) {
				var i,
					e,
					s = this.isEnabled && this.getItem(t);
				function h() {
					2 == ++i &&
						(s.element.classList.remove('is-positioning-post-drag'),
						s.hideDropPlaceholder(),
						e.dispatchEvent('dragItemPositioned', null, [s]));
				}
				s &&
					(clearTimeout(this.dragTimeout),
					s.element.classList.add('is-positioning-post-drag'),
					(i = 0),
					(e = this),
					s.once('layout', h),
					this.once('layoutComplete', h),
					s.moveTo(s.rect.x, s.rect.y),
					this.layout(),
					(this.dragItemCount = Math.max(0, this.dragItemCount - 1)),
					this.sortItemsByPosition(),
					s.disablePlacing(),
					this.unstamp(s.element));
			}),
			(e.bindDraggabillyEvents = function (t) {
				this._bindDraggabillyEvents(t, 'on');
			}),
			(e.unbindDraggabillyEvents = function (t) {
				this._bindDraggabillyEvents(t, 'off');
			}),
			(e._bindDraggabillyEvents = function (t, i) {
				var e = this.handleDraggabilly;
				t[i]('dragStart', e.dragStart),
					t[i]('dragMove', e.dragMove),
					t[i]('dragEnd', e.dragEnd);
			}),
			(e.bindUIDraggableEvents = function (t) {
				this._bindUIDraggableEvents(t, 'on');
			}),
			(e.unbindUIDraggableEvents = function (t) {
				this._bindUIDraggableEvents(t, 'off');
			}),
			(e._bindUIDraggableEvents = function (t, i) {
				var e = this.handleUIDraggable;
				t[i]('dragstart', e.start)
					[i]('drag', e.drag)
					[i]('dragstop', e.stop);
			});
		var o = e.destroy;
		return (
			(e.destroy = function () {
				o.apply(this, arguments), (this.isEnabled = !1);
			}),
			(s.Rect = r),
			(s.Packer = i),
			s
		);
	}),
	(function (t, i) {
		i(t.ModulaIsotope.LayoutMode, t.Packery);
	})(window, function (t, i) {
		var e,
			t = t.create('packery'),
			s = t.prototype,
			h = { _getElementOffset: !0, _getMeasurement: !0 };
		for (e in i.prototype) h[e] || (s[e] = i.prototype[e]);
		var n = s._resetLayout,
			r =
				((s._resetLayout = function () {
					(this.packer = this.packer || new i.Packer()),
						(this.shiftPacker = this.shiftPacker || new i.Packer()),
						n.apply(this, arguments);
				}),
				s._getItemLayoutPosition),
			o =
				((s._getItemLayoutPosition = function (t) {
					return (t.rect = t.rect || new i.Rect()), r.call(this, t);
				}),
				s.needsResizeLayout),
			a =
				((s.needsResizeLayout = function () {
					return this._getOption('horizontal')
						? this.needsVerticalResizeLayout()
						: o.call(this);
				}),
				s._getOption);
		s._getOption = function (t) {
			return 'horizontal' == t
				? void 0 !== this.options.isHorizontal
					? this.options.isHorizontal
					: this.options.horizontal
				: a.apply(this.isotope, arguments);
		};
	});
function tg_getURLParameter(t) {
	return (
		decodeURIComponent(
			(new RegExp('[?|&]' + t + '=([^&;]+?)(&|#|;|$)').exec(
				location.search
			) || [, ''])[1].replace(/\+/g, '%20')
		) || null
	);
}
function modulaInViewport(t) {
	t = (t =
		'function' == typeof jQuery && t instanceof jQuery
			? t[0]
			: t).getBoundingClientRect();
	return (
		(t.top - jQuery(window).height() <= -100 &&
			-400 <= t.top - jQuery(window).height()) ||
		t.bottom <= jQuery(window).height()
	);
}
jQuery(document).on(
	'vc-full-width-row-single vc-full-width-row',
	function (t, e) {
		0 < jQuery('body').find('.modula').length &&
			jQuery(window).trigger('modula-update');
	}
),
	jQuery(window).on('elementor/frontend/init', function () {
		window.elementorFrontend &&
			window.elementorFrontend.hooks.addAction(
				'frontend/element_ready/global',
				function (t) {
					jQuery('body').find('.modula').length;
				}
			);
	}),
	(function (u, s, a, t) {
		var n = 'modulaGallery',
			i = {
				resizer: '/',
				keepArea: !0,
				type: 'creative-gallery',
				columns: 12,
				height: 800,
				desktopHeight: 800,
				mobileHeight: 800,
				tabletHeight: 800,
				gutter: 10,
				desktopGutter: 10,
				mobileGutter: 10,
				tabletGutter: 10,
				enableTwitter: !1,
				enableFacebook: !1,
				enableWhatsapp: !1,
				enablePinterest: !1,
				enableLinkedin: !1,
				enableEmail: !1,
				lazyLoad: 0,
				initLightbox: !1,
				lightbox: 'fancybox',
				lightboxOpts: {},
				inView: !1,
			};
		function h(t, e) {
			(this.element = t),
				(this.$element = u(t)),
				(this.$itemsCnt = this.$element.find('.modula-items')),
				(this.$items = this.$itemsCnt.find('.modula-item')),
				(this.options = u.extend({}, i, e)),
				(this._defaults = i),
				(this._name = n),
				(this.tiles = []),
				(this.$tilesCnt = null),
				(this.completed = !1),
				(this.lastWidth = 0),
				(this.resizeTO = 0),
				(this.isIsotope = !1),
				(this.isLazyLoaded = !0),
				this.init();
		}
		(h.prototype.init = function () {
			var e = this,
				t = a.documentElement.clientWidth;
			(this.options.gutter =
				t <= 568
					? this.options.mobileGutter
					: t <= 768
					? this.options.tabletGutter
					: this.options.desktopGutter),
				u(a).trigger('modula_api_before_init', [e]),
				'custom-grid' === this.options.type
					? this.createCustomGallery()
					: 'creative-gallery' == this.options.type
					? this.createGrid()
					: 'grid' == this.options.type &&
					  ('automatic' == this.options.grid_type
							? this.createAutoGrid()
							: this.createColumnsGrid()),
				'custom-grid' === this.options.type &&
					u(s).height() < u('html').height() &&
					e.onResize(e),
				u(s).resize(function () {
					e.onResize(e);
				}),
				new ResizeObserver((t) => {
					e.onResize(e);
				}).observe(e.$element[0]),
				u(s).on('modula-update', function () {
					e.onResize(e);
				}),
				u(a).on('lazyloaded', function (t) {
					var t = u(t.target);
					'modula' == t.data('source') &&
						(t.data('size', {
							width: t.width(),
							height: t.height(),
						}),
						(t = t.parents('.modula-item')).addClass('tg-loaded'),
						(t = e.$items.not('.jtg-hidden').index(t)),
						e.placeImage(t),
						e.isIsotope &&
							void 0 !== e.$itemsCnt.data('modulaisotope') &&
							e.$itemsCnt.modulaisotope('layout'),
						'grid' == e.options.type) &&
						'automatic' == e.options.grid_type &&
						e.$itemsCnt.justifiedGallery();
				}),
				e.options.inView &&
					jQuery(s).on(
						'DOMContentLoaded load resize scroll',
						function () {
							modulaInViewport(e.$element) &&
								e.$element.addClass('modula-loaded-scale');
						}
					),
				this.setupSocial(),
				jQuery(e.$element).addClass('modula-gallery-initialized'),
				this.options.onComplete && this.options.onComplete(),
				'fancybox' != e.options.lightbox ||
					e.options.initLightbox ||
					this.initLightbox(),
				u(a).trigger('modula_api_after_init', [e]);
		}),
			(h.prototype.initLightbox = function () {
				var i = this;
				i.$element.on('click', '.modula-no-follow', function (t) {
					t.preventDefault();
				}),
					i.$element.on(
						'click',
						'.modula-item-link:not( .modula-simple-link )',
						function (t) {
							t.preventDefault();
							var o = jQuery(this),
								t = u.map(i.$items, function (t) {
									var e, i;
									if (
										0 <
										jQuery(t).find(
											'.modula-item-link:not( .modula-no-follow )'
										).length
									)
										return (
											(e = jQuery(t).find(
												'.modula-item-link:not( .modula-simple-link )'
											)),
											{
												src: (i =
													jQuery(t).find(
														'.pic'
													)).data('full'),
												opts: {
													$thumb: i.parents(
														'.modula-item'
													),
													caption: e.data('caption'),
													alt: i.attr('alt'),
													image_id:
														e.attr('data-image-id'),
												},
												current: jQuery(t).is(
													o.parents('.modula-item')
												),
											}
										);
								}),
								e = u.map(t, function (t, e) {
									if (t.current) return e;
								})[0];
							jQuery.modulaFancybox.open(
								t,
								i.options.lightboxOpts,
								e
							);
						}
					);
			}),
			(h.prototype.trunc = function (t) {
				return Math.trunc
					? Math.trunc(t)
					: ((t = +t),
					  isFinite(t)
							? t - (t % 1) || (t < 0 ? -0 : 0 === t ? t : 0)
							: t);
			}),
			(h.prototype.createCustomGallery = function () {
				var h,
					r = this,
					t = this.$element.find('.modula-items').width(),
					l = this,
					d = this.options.columns,
					e = a.documentElement.clientWidth,
					e =
						('1' == this.options.enableResponsive &&
							(e <= 568
								? (d = this.options.mobileColumns)
								: e <= 768 && (d = this.options.tabletColumns)),
						(h =
							0 < this.options.gutter
								? (t - this.options.gutter * (d - 1)) / d
								: Math.floor((t / d) * 1e3) / 1e3),
						this.$items.not('.jtg-hidden').each(function (t, e) {
							var i,
								o,
								n = {},
								s = u(e).data('width'),
								a = u(e).data('height');
							12 < s && (s = 12),
								'1' == l.options.enableResponsive &&
									((i = s),
									(o = a),
									1 == d
										? (a = ((s = 1) * o) / i)
										: ((s = Math.round((d * i) / 12)) < 1 &&
												(s = 1),
										  (a = Math.round((s * o) / i)) < 1 &&
												(a = 1))),
								(n.width = h * s + l.options.gutter * (s - 1)),
								(n.height =
									Math.round(h) * a +
									l.options.gutter * (a - 1)),
								u(e)
									.data('size', n)
									.addClass('tiled')
									.addClass(
										n.height < n.width ? 'tile-h' : 'tile-v'
									)
									.data('position'),
								u(e).css(u(e).data('size')),
								u(e)
									.find('.figc')
									.css({
										width: u(e).data('size').width,
										height: u(e).data('size').height,
									}),
								r.loadImage(t);
						}),
						{
							itemSelector: '.modula-item',
							layoutMode: 'packery',
							packery: { gutter: parseInt(l.options.gutter) },
						});
				this.$itemsCnt.modulaisotope(e), (this.isIsotope = !0);
			}),
			(h.prototype.createGrid = function () {
				var o = this,
					t = a.documentElement.clientWidth;
				(o.options.height =
					t <= 568
						? o.options.mobileHeight
						: t <= 768
						? o.options.tabletHeight
						: o.options.desktopHeight),
					this.$itemsCnt.data(
						'area',
						this.$itemsCnt.width() * this.options.height
					),
					(this.lastWidth = this.$itemsCnt.width());
				for (var e = 0; e < this.$items.not('.jtg-hidden').length; e++)
					this.tiles.push(o.getSlot());
				this.tiles.sort(function (t, e) {
					return t.position - e.position;
				}),
					this.$items.not('.jtg-hidden').each(function (t, e) {
						var i = o.tiles[t];
						u(e).data('size', i),
							u(e)
								.addClass('tiled')
								.addClass(
									i.width > i.height ? 'tile-h' : 'tile-v'
								)
								.data('position'),
							u(e).css({ width: i.width, height: i.height }),
							u(e)
								.find('.figc')
								.css({ width: i.width, height: i.height }),
							o.loadImage(t);
					}),
					this.isIsotope ||
						((t = {
							resizesContainer: !1,
							itemSelector: '.modula-item',
							layoutMode: 'packery',
							packery: { gutter: parseInt(o.options.gutter) },
						}),
						this.$itemsCnt.modulaisotope(t),
						(this.isIsotope = !0));
			}),
			(h.prototype.createAutoGrid = function () {
				this.$itemsCnt.justifiedGallery({
					rowHeight: this.options.rowHeight,
					margins: this.options.gutter,
					lastRow: this.options.lastRow,
					captions: !1,
					border: 0,
					imgSelector: '.pic',
					cssAnimation: !0,
					imagesAnimationDuration: 700,
				});
			}),
			(h.prototype.createColumnsGrid = function () {
				var i = this;
				this.$itemsCnt.modulaisotope({
					itemSelector: '.modula-item',
					layoutMode: 'packery',
					packery: { gutter: parseInt(this.options.gutter) },
				}),
					this.$items.each(function (t, e) {
						i.loadImage(t);
					}),
					(this.isIsotope = !0);
			}),
			(h.prototype.getSlot = function () {
				if (0 == this.tiles.length)
					return (o = {
						top: 0,
						left: 0,
						width: this.$itemsCnt.width(),
						height: this.options.height,
						area: this.$itemsCnt.width() * this.options.height,
						position: 0,
					});
				for (var t = 0, e = 0; e < this.tiles.length; e++)
					(o = this.tiles[e]).area > this.tiles[t].area && (t = e);
				var i,
					o = {},
					n = this.tiles[t];
				return (
					((o =
						n.width > n.height
							? ((i = (n.width / 2) * this.options.randomFactor),
							  (n.prevWidth = n.width),
							  (n.width = Math.floor(
									n.width / 2 + i * (Math.random() - 0.5)
							  )),
							  {
									top: n.top,
									left:
										n.left + n.width + this.options.gutter,
									width:
										n.prevWidth -
										n.width -
										this.options.gutter,
									height: n.height,
							  })
							: ((i = (n.height / 2) * this.options.randomFactor),
							  (n.prevHeight = n.height),
							  (n.height = Math.floor(
									n.height / 2 + i * (Math.random() - 0.5)
							  )),
							  {
									left: n.left,
									top: n.top + n.height + this.options.gutter,
									width: n.width,
									height:
										n.prevHeight -
										n.height -
										this.options.gutter,
							  })).area = o.width * o.height),
					(o.position = 1e3 * o.top + o.left),
					(n.position = 1e3 * n.top + n.left),
					(this.tiles[t] = n),
					(this.tiles[t].area = n.width * n.height),
					o
				);
			}),
			(h.prototype.reset = function () {
				(this.tiles = []),
					'custom-grid' === this.options.type
						? this.createCustomGallery()
						: 'creative-gallery' == this.options.type
						? this.createGrid()
						: 'grid' == this.options.type &&
						  ('automatic' == this.options.grid_type
								? this.createAutoGrid()
								: this.createColumnsGrid()),
					(this.lastWidth = this.$itemsCnt.width()),
					u(a).trigger('modula_api_reset', [this]);
			}),
			(h.prototype.onResize = function (e) {
				var t;
				e.lastWidth != e.$itemsCnt.width() &&
					((t = a.documentElement.clientWidth),
					(e.options.gutter =
						t <= 568
							? e.options.mobileGutter
							: t <= 768
							? e.options.tabletGutter
							: this.options.desktopGutter),
					clearTimeout(e.resizeTO),
					(e.resizeTO = setTimeout(function () {
						var t;
						e.options.keepArea &&
							((t = e.$itemsCnt.data('area')),
							e.$itemsCnt.height(t / e.$itemsCnt.width())),
							e.reset(),
							e.isIsotope &&
								e.$itemsCnt
									.modulaisotope({
										packery: {
											gutter: parseInt(e.options.gutter),
										},
									})
									.modulaisotope('layout');
					}, 100)));
			}),
			(h.prototype.loadImage = function (t) {
				var e,
					i,
					o = this,
					n = o.$items.not('.jtg-hidden').eq(t).find('.pic');
				'0' != o.options.lazyLoad
					? o.placeImage(t)
					: (((i = new Image()).onload = function () {
							(e = { width: this.width, height: this.height }),
								n.data('size', e),
								o.placeImage(t);
					  }),
					  'undefined' != n.attr('src')
							? (i.src = n.attr('src'))
							: (i.src = n.data('src')));
			}),
			(h.prototype.placeImage = function (t) {
				if ('grid' != this.options.type) {
					var e = this.$items.not('.jtg-hidden').eq(t),
						i = e.find('.pic'),
						o = e.data('size'),
						n = i.data('size');
					if (void 0 !== o && void 0 !== n) {
						o.width, o.height;
						var s = n.width / n.height,
							a = i.data('valign') ? i.data('valign') : 'middle',
							h = i.data('halign') ? i.data('halign') : 'center',
							r = {
								top: 'auto',
								bottom: 'auto',
								left: 'auto',
								right: 'auto',
								width: 'auto',
								height: 'auto',
								margin: '0',
								maxWidth: '999em',
							};
						if ((o.width * n.height) / n.width > o.height)
							switch (((r.width = o.width), (r.left = 0), a)) {
								case 'top':
									r.top = 0;
									break;
								case 'middle':
									r.top =
										0 - (o.width * (1 / s) - o.height) / 2;
									break;
								case 'bottom':
									r.bottom = 0;
							}
						else
							switch (((r.height = o.height), (r.top = 0), h)) {
								case 'left':
									r.left = 0;
									break;
								case 'center':
									r.left = 0 - (o.height * s - o.width) / 2;
									break;
								case 'right':
									r.right = 0;
							}
						e.hasClass('effect-under') &&
							(r.top =
								r.top -
								e.find('.modula-item-content').height()),
							i.css(r),
							this.$items
								.not('.jtg-hidden')
								.eq(t)
								.addClass('tg-loaded');
					}
				}
			}),
			(h.prototype.setupSocial = function () {
				this.options.enableTwitter && e(this.$items, this),
					this.options.enableFacebook && o(this.$items, this),
					this.options.enablePinterest && l(this.$items, this),
					this.options.enableLinkedin && d(this.$items, this),
					this.options.enableWhatsapp && r(this.$items, this),
					this.options.enableEmail && p(this.$items, this);
			}),
			(h.prototype.destroy = function () {
				this.isPackeryActive &&
					(this.$itemsCnt.packery('destroy'),
					(this.isPackeryActive = !1));
			});
		var e = function (t, e) {
				t.find('.modula-icon-twitter').click(function (t) {
					t.preventDefault();
					var t = u(this).parents('.modula-item').find('img.pic'),
						e = t.data('caption'),
						i = t.data('full'),
						t = t.attr('title'),
						o = a.title;
					return (
						0 < t.length
							? (o = u.trim(t))
							: 0 < e.length && (o = u.trim(e)),
						s
							.open(
								'https://twitter.com/intent/tweet?url=' +
									encodeURI(i) +
									'&text=' +
									encodeURI(o),
								'ftgw',
								'location=1,status=1,scrollbars=1,width=600,height=400'
							)
							.moveTo(
								screen.width / 2 - 300,
								screen.height / 2 - 200
							),
						!1
					);
				});
			},
			o = function (t, e) {
				t.find('.modula-icon-facebook').click(function (t) {
					t.preventDefault();
					t = u(this)
						.parents('.modula-item')
						.find('img.pic')
						.attr('data-full');
					return (
						s
							.open(
								'//www.facebook.com/sharer.php?u=' + t,
								'ftgw',
								'location=1,status=1,scrollbars=1,width=600,height=400'
							)
							.moveTo(
								screen.width / 2 - 300,
								screen.height / 2 - 200
							),
						!1
					);
				});
			},
			r = function (t, e) {
				t.find('.modula-icon-whatsapp').click(function (t) {
					t.preventDefault();
					t = u(this)
						.parents('.modula-item')
						.find('img.pic')
						.attr('data-full');
					return (
						s
							.open(
								'https://api.whatsapp.com/send?text=' +
									encodeURI(t) +
									'&preview_url=true',
								'ftgw',
								'location=1,status=1,scrollbars=1,width=600,height=400'
							)
							.moveTo(
								screen.width / 2 - 300,
								screen.height / 2 - 200
							),
						!1
					);
				});
			},
			l = function (t, e) {
				t.find('.modula-icon-pinterest').click(function (t) {
					t.preventDefault();
					var t = u(this).parents('.modula-item').find('img.pic'),
						e = t.data('full'),
						i = t.data('caption'),
						o = t.attr('title'),
						n = a.title,
						o =
							(0 < o.length
								? (n = u.trim(o))
								: 0 < i.length && (n = u.trim(i)),
							'http://pinterest.com/pin/create/button/?url=' +
								encodeURI(e) +
								'&description=' +
								encodeURI(n));
					return (
						1 <= t.length &&
							((i = t.attr('data-full')),
							(o +=
								'&media=' +
								((e = i),
								((n = a.createElement('img')).src = e),
								(e = n.src),
								(n.src = null),
								e))),
						s
							.open(
								o,
								'ftgw',
								'location=1,status=1,scrollbars=1,width=600,height=400'
							)
							.moveTo(
								screen.width / 2 - 300,
								screen.height / 2 - 200
							),
						!1
					);
				});
			},
			d = function (t, e) {
				t.find('.modula-icon-linkedin').click(function (t) {
					t.preventDefault();
					(t = u(this)
						.parents('.modula-item')
						.find('img.pic')
						.attr('data-full')),
						(t =
							'//linkedin.com/shareArticle?mini=true&url=' +
							encodeURI(t));
					return (
						s
							.open(
								t,
								'ftgw',
								'location=1,status=1,scrollbars=1,width=600,height=400'
							)
							.moveTo(
								screen.width / 2 - 300,
								screen.height / 2 - 200
							),
						!1
					);
				});
			},
			p = function (t, n) {
				t.find('.modula-icon-email').click(function (t) {
					var e = encodeURI(n.options.email_subject),
						i = jQuery('.modula-icon-email')
							.parents('.modula-item')
							.find('img.pic')
							.attr('data-full'),
						o = location.href,
						i = encodeURI(
							n.options.email_message
								.replace(/%%image_link%%/g, i)
								.replace(/%%gallery_link%%/g, o)
						);
					return (
						s
							.open(
								'mailto:?subject=' + e + '&body=' + i,
								'ftgw',
								'location=1,status=1,scrollbars=1,width=600,height=400'
							)
							.moveTo(
								screen.width / 2 - 300,
								screen.height / 2 - 200
							),
						!1
					);
				});
			};
		u.fn[n] = function (e) {
			var i,
				o = arguments;
			return e === t || 'object' == typeof e
				? this.each(function () {
						u.data(this, 'plugin_' + n) ||
							u.data(this, 'plugin_' + n, new h(this, e));
				  })
				: 'string' == typeof e && '_' !== e[0] && 'init' !== e
				? (this.each(function () {
						var t = u.data(this, 'plugin_' + n);
						t instanceof h &&
							'function' == typeof t[e] &&
							(i = t[e].apply(
								t,
								Array.prototype.slice.call(o, 1)
							)),
							'destroy' === e &&
								u.data(this, 'plugin_' + n, null);
				  }),
				  i !== t ? i : this)
				: void 0;
		};
	})(jQuery, window, document),
	jQuery(document).ready(function () {
		var t = jQuery('.modula.modula-gallery');
		jQuery.each(t, function () {
			var t = jQuery(this).data('config');
			jQuery(this).modulaGallery(t);
		});
	}),
	jQuery(document).on('elementor/popup/show', (t, e, i) => {
		e = jQuery('#elementor-popup-modal-' + e).find(
			'.modula.modula-gallery'
		);
		jQuery.each(e, function () {
			var t = jQuery(this).data('config');
			jQuery(this).modulaGallery(t);
		});
	});
