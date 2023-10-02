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
!(function (l, s, f, m) {
	'use strict';
	var a, i, r, d, e, c, p, u, n, t, o, h, g;
	function b(t, e) {
		var o,
			n,
			a,
			i = [],
			s = 0;
		(t && t.isDefaultPrevented()) ||
			(t.preventDefault(),
			(e = e || {}),
			(o =
				(e = t && t.data ? u(t.data.options, e) : e).$target ||
				f(t.currentTarget).trigger('blur')),
			(a = f.modulaFancybox.getInstance()) &&
				a.$trigger &&
				a.$trigger.is(o)) ||
			((i = e.selector
				? f(e.selector)
				: (n = o.attr('data-fancybox') || '')
				? (i = t.data ? t.data.items : []).length
					? i.filter('[data-fancybox="' + n + '"]')
					: f('[data-fancybox="' + n + '"]')
				: [o]),
			(s = f(i).index(o)),
			((a = f.modulaFancybox.open(i, e, (s = s < 0 ? 0 : s))).$trigger =
				o));
	}
	(l.console = l.console || { info: function (t) {} }),
		f &&
			(f.fn.modulaFancybox
				? console.info('fancyBox already initialized')
				: ((t = {
						closeExisting: !1,
						loop: !1,
						gutter: 50,
						keyboard: !0,
						preventCaptionOverlap: !0,
						arrows: !0,
						infobar: !0,
						smallBtn: 'auto',
						toolbar: 'auto',
						buttons: ['zoom', 'slideShow', 'thumbs', 'close'],
						idleTime: 3,
						protect: !1,
						modal: !1,
						image: { preload: !1 },
						ajax: { settings: { data: { fancybox: !0 } } },
						iframe: {
							tpl: '<iframe id="modula-fancybox-frame{rnd}" name="modula-fancybox-frame{rnd}" class="modula-fancybox-iframe" allowfullscreen="allowfullscreen" allow="autoplay; fullscreen" src=""></iframe>',
							preload: !0,
							css: {},
							attr: { scrolling: 'auto' },
						},
						video: {
							tpl: '<video class="modula-fancybox-video" controls controlsList="nodownload" poster="{{poster}}"><source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos, <a href="{{src}}">download</a> and watch with your favorite video player!</video>',
							format: '',
							autoStart: !0,
						},
						defaultType: 'image',
						animationEffect: 'zoom',
						animationDuration: 366,
						zoomOpacity: 'auto',
						transitionEffect: 'fade',
						transitionDuration: 366,
						slideClass: '',
						baseClass: '',
						baseTpl:
							'<div class="modula-fancybox-container" role="dialog" tabindex="-1"><div class="modula-fancybox-bg"></div><div class="modula-fancybox-inner"><div class="modula-fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="modula-fancybox-toolbar">{{buttons}}</div><div class="modula-fancybox-navigation">{{arrows}}</div><div class="modula-fancybox-stage"></div><div class="modula-fancybox-caption"><div class="modula-fancybox-caption__body"></div></div></div></div>',
						spinnerTpl:
							'<div class="modula-fancybox-loading"></div>',
						errorTpl:
							'<div class="modula-fancybox-error"><p>{{ERROR}}</p></div>',
						btnTpl: {
							download:
								'<a download data-fancybox-download class="modula-fancybox-button modula-fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
							zoom: '<button data-fancybox-zoom class="modula-fancybox-button modula-fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
							close: '<button data-fancybox-close class="modula-fancybox-button modula-fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
							arrowLeft:
								'<button data-fancybox-prev class="modula-fancybox-button modula-fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
							arrowRight:
								'<button data-fancybox-next class="modula-fancybox-button modula-fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
							smallBtn:
								'<button type="button" data-fancybox-close class="modula-fancybox-button modula-fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
						},
						modulaShare: [
							'facebook',
							'twitter',
							'pinterest',
							'whatsapp',
							'linkedin',
							'email',
						],
						shareBtnTpl: {
							facebook:
								'<a class="modula-fancybox-share__button modula-fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{modulaShareUrl}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a>',
							twitter:
								'<a class="modula-fancybox-share__button modula-fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{modulaShareUrl}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a>',
							pinterest:
								'<a class="modula-fancybox-share__button modula-fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{modulaShareUrl}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a>',
							whatsapp:
								'<a class="modula-fancybox-share__button modula-fancybox-share__button--wa" href="https://api.whatsapp.com/send?text={{modulaShareUrl}}&review_url=true"><svg aria-hidden="true" focusable="false" style="-ms-transform: rotate(360deg); -webkit-transform: rotate(360deg); transform: rotate(360deg);" preserveAspectRatio="xMidYMid meet" viewBox="0 0 1536 1600"><path d="M985 878q13 0 97.5 44t89.5 53q2 5 2 15q0 33-17 76q-16 39-71 65.5T984 1158q-57 0-190-62q-98-45-170-118T476 793q-72-107-71-194v-8q3-91 74-158q24-22 52-22q6 0 18 1.5t19 1.5q19 0 26.5 6.5T610 448q8 20 33 88t25 75q0 21-34.5 57.5T599 715q0 7 5 15q34 73 102 137q56 53 151 101q12 7 22 7q15 0 54-48.5t52-48.5zm-203 530q127 0 243.5-50t200.5-134t134-200.5t50-243.5t-50-243.5T1226 336t-200.5-134T782 152t-243.5 50T338 336T204 536.5T154 780q0 203 120 368l-79 233l242-77q158 104 345 104zm0-1382q153 0 292.5 60T1315 247t161 240.5t60 292.5t-60 292.5t-161 240.5t-240.5 161t-292.5 60q-195 0-365-94L0 1574l136-405Q28 991 28 780q0-153 60-292.5T249 247T489.5 86T782 26z" fill="currentColor"/></svg><span>WhatsApp</span></a>',
							linkedin:
								'<a class="modula-fancybox-share__button modula-fancybox-share__button--li" href="//linkedin.com/shareArticle?mini=true&url={{modulaShareUrl}}"><svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="linkedin-in" class="svg-inline--fa fa-linkedin-in fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path></svg><span>LinkedIn</span></a>',
							email: '<a class="modula-fancybox-share__button modula-fancybox-share__button--email" href="mailto:?subject={{subject}}&body={{emailMessage}}"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z" fill="currentColor"></path></svg><span>Email</span></a>',
						},
						parentEl: 'body',
						hideScrollbar: !0,
						autoFocus: !0,
						backFocus: !0,
						trapFocus: !0,
						fullScreen: { autoStart: !1 },
						touch: { vertical: !0, momentum: !0 },
						hash: null,
						media: {},
						slideShow: { autoStart: !1, speed: 3e3 },
						thumbs: {
							autoStart: !1,
							hideOnClose: !0,
							parentEl: '.modula-fancybox-container',
							axis: 'y',
						},
						wheel: 'auto',
						onInit: f.noop,
						beforeLoad: f.noop,
						afterLoad: f.noop,
						beforeShow: f.noop,
						afterShow: f.noop,
						beforeClose: f.noop,
						afterClose: f.noop,
						onActivate: f.noop,
						onDeactivate: f.noop,
						clickContent: function (t, e) {
							return 'image' === t.type && 'zoom';
						},
						clickSlide: 'close',
						clickOutside: 'close',
						dblclickContent: !1,
						dblclickSlide: !1,
						dblclickOutside: !1,
						mobile: {
							preventCaptionOverlap: !1,
							idleTime: !1,
							clickContent: function (t, e) {
								return 'image' === t.type && 'toggleControls';
							},
							clickSlide: function (t, e) {
								return 'image' === t.type
									? 'toggleControls'
									: 'close';
							},
							dblclickContent: function (t, e) {
								return 'image' === t.type && 'zoom';
							},
							dblclickSlide: function (t, e) {
								return 'image' === t.type && 'zoom';
							},
						},
						lang: 'en',
						i18n: {
							en: {
								CLOSE: 'Close',
								NEXT: 'Next',
								PREV: 'Previous',
								ERROR: 'The requested content cannot be loaded. <br/> Please try again later.',
								PLAY_START: 'Start slideshow',
								PLAY_STOP: 'Pause slideshow',
								FULL_SCREEN: 'Full screen',
								THUMBS: 'Thumbnails',
								DOWNLOAD: 'Download',
								SHARE: 'Share',
								ZOOM: 'Zoom',
							},
							de: {
								CLOSE: 'Schlie&szlig;en',
								NEXT: 'Weiter',
								PREV: 'Zur&uuml;ck',
								ERROR: 'Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es sp&auml;ter nochmal.',
								PLAY_START: 'Diaschau starten',
								PLAY_STOP: 'Diaschau beenden',
								FULL_SCREEN: 'Vollbild',
								THUMBS: 'Vorschaubilder',
								DOWNLOAD: 'Herunterladen',
								SHARE: 'Teilen',
								ZOOM: 'Vergr&ouml;&szlig;ern',
							},
						},
				  }),
				  (a = f(l)),
				  (i = f(s)),
				  (r = 0),
				  (d =
						l.requestAnimationFrame ||
						l.webkitRequestAnimationFrame ||
						l.mozRequestAnimationFrame ||
						l.oRequestAnimationFrame ||
						function (t) {
							return l.setTimeout(t, 1e3 / 60);
						}),
				  (e =
						l.cancelAnimationFrame ||
						l.webkitCancelAnimationFrame ||
						l.mozCancelAnimationFrame ||
						l.oCancelAnimationFrame ||
						function (t) {
							l.clearTimeout(t);
						}),
				  (c = (function () {
						var t,
							e = s.createElement('fakeelement'),
							o = {
								transition: 'transitionend',
								OTransition: 'oTransitionEnd',
								MozTransition: 'transitionend',
								WebkitTransition: 'webkitTransitionEnd',
							};
						for (t in o) if (e.style[t] !== m) return o[t];
						return 'transitionend';
				  })()),
				  (p = function (t) {
						return t && t.length && t[0].offsetHeight;
				  }),
				  (u = function (t, e) {
						var o = f.extend(!0, {}, t, e);
						return (
							f.each(e, function (t, e) {
								f.isArray(e) && (o[t] = e);
							}),
							o
						);
				  }),
				  f.extend(
						(n = function (t, e, o) {
							var n = this;
							(n.opts = u(
								{ index: o },
								f.modulaFancybox.defaults
							)),
								f.isPlainObject(e) && (n.opts = u(n.opts, e)),
								f.modulaFancybox.isMobile &&
									(n.opts = u(n.opts, n.opts.mobile)),
								(n.id = n.opts.id || ++r),
								(n.currIndex = parseInt(n.opts.index, 10) || 0),
								(n.prevIndex = null),
								(n.prevPos = null),
								(n.currPos = 0),
								(n.firstRun = !0),
								(n.group = []),
								(n.slides = {}),
								n.addContent(t),
								n.group.length && n.init();
						}).prototype,
						{
							init: function () {
								var o = this;
								o.currIndex < 0 && (o.currIndex = 0),
									void 0 === o.group[o.currIndex] &&
										jQuery.each(
											this.group,
											function (t, e) {
												o.currIndex ==
													parseInt(e.opts.image_id) &&
													(o.currIndex = t);
											}
										);
								var e,
									n,
									a = o.group[o.currIndex].opts;
								a.closeExisting && f.modulaFancybox.close(!0),
									f('body').addClass(
										'modula-fancybox-active'
									),
									!f.modulaFancybox.getInstance() &&
										!1 !== a.hideScrollbar &&
										!f.modulaFancybox.isMobile &&
										s.body.scrollHeight > l.innerHeight &&
										(f('head').append(
											'<style id="modula-fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar{margin-right:' +
												(l.innerWidth -
													s.documentElement
														.clientWidth) +
												'px;overflow:hidden;}</style>'
										),
										f('body').addClass(
											'compensate-for-scrollbar'
										)),
									(n = ''),
									f.each(a.buttons, function (t, e) {
										n += a.btnTpl[e] || '';
									}),
									(e = f(
										o.translate(
											o,
											a.baseTpl
												.replace('{{buttons}}', n)
												.replace(
													'{{arrows}}',
													a.btnTpl.arrowLeft +
														a.btnTpl.arrowRight
												)
										)
									)
										.attr(
											'id',
											'modula-fancybox-container-' + o.id
										)
										.addClass(a.baseClass)
										.data('modulaFancyBox', o)
										.appendTo(a.parentEl)),
									(o.$refs = { container: e }),
									[
										'bg',
										'inner',
										'infobar',
										'toolbar',
										'stage',
										'caption',
										'navigation',
									].forEach(function (t) {
										o.$refs[t] = e.find(
											'.modula-fancybox-' + t
										);
									}),
									o.trigger('onInit'),
									o.activate(),
									o.jumpTo(o.currIndex);
							},
							translate: function (t, e) {
								var o =
									t.opts.i18n[t.opts.lang] || t.opts.i18n.en;
								return e.replace(
									/\{\{(\w+)\}\}/g,
									function (t, e) {
										return o[e] === m ? t : o[e];
									}
								);
							},
							addContent: function (t) {
								var s = this,
									t = f.makeArray(t);
								f.each(t, function (t, e) {
									var o,
										n,
										a = {},
										i = {};
									f.isPlainObject(e)
										? (i = (a = e).opts || e)
										: 'object' === f.type(e) && f(e).length
										? ((i = (o = f(e)).data() || {}),
										  ((i = f.extend(
												!0,
												{},
												i,
												i.options
										  )).$orig = o),
										  (a.src =
												s.opts.src ||
												i.src ||
												o.attr('href')),
										  a.type ||
												a.src ||
												((a.type = 'inline'),
												(a.src = e)))
										: (a = { type: 'html', src: e + '' }),
										(a.opts = f.extend(!0, {}, s.opts, i)),
										f.isArray(i.buttons) &&
											(a.opts.buttons = i.buttons),
										f.modulaFancybox.isMobile &&
											a.opts.mobile &&
											(a.opts = u(a.opts, a.opts.mobile)),
										(o = a.type || a.opts.type),
										(i = a.src || ''),
										!o &&
											i &&
											((n = i.match(
												/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i
											))
												? ((o = 'video'),
												  a.opts.video.format ||
														(a.opts.video.format =
															'video/' +
															('ogv' === n[1]
																? 'ogg'
																: n[1])))
												: i.match(
														/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
												  )
												? (o = 'image')
												: i.match(
														/\.(pdf)((\?|#).*)?$/i
												  )
												? (a = f.extend(!0, a, {
														contentType: 'pdf',
														opts: {
															iframe: {
																preload: !(o =
																	'iframe'),
															},
														},
												  }))
												: '#' === i.charAt(0) &&
												  (o = 'inline')),
										o
											? (a.type = o)
											: s.trigger('objectNeedsType', a),
										a.contentType ||
											(a.contentType =
												-1 <
												f.inArray(a.type, [
													'html',
													'inline',
													'ajax',
												])
													? 'html'
													: a.type),
										(a.index = s.group.length),
										'auto' == a.opts.smallBtn &&
											(a.opts.smallBtn =
												-1 <
												f.inArray(a.type, [
													'html',
													'inline',
													'ajax',
												])),
										'auto' === a.opts.toolbar &&
											(a.opts.toolbar = !a.opts.smallBtn),
										(a.$thumb = a.opts.$thumb || null),
										a.opts.$trigger &&
											a.index === s.opts.index &&
											((a.$thumb =
												a.opts.$trigger.find(
													'img:first'
												)),
											a.$thumb.length) &&
											(a.opts.$orig = a.opts.$trigger),
										(a.$thumb && a.$thumb.length) ||
											!a.opts.$orig ||
											(a.$thumb =
												a.opts.$orig.find('img:first')),
										a.$thumb &&
											!a.$thumb.length &&
											(a.$thumb = null),
										(a.thumb =
											a.opts.thumb ||
											(a.$thumb
												? a.$thumb[0].src
												: null)),
										'function' === f.type(a.opts.caption) &&
											(a.opts.caption =
												a.opts.caption.apply(e, [
													s,
													a,
												])),
										'function' === f.type(s.opts.caption) &&
											(a.opts.caption =
												s.opts.caption.apply(e, [
													s,
													a,
												])),
										a.opts.caption instanceof f ||
											(a.opts.caption =
												a.opts.caption === m
													? ''
													: a.opts.caption + ''),
										'ajax' === a.type &&
											1 <
												(n = i.split(/\s+/, 2))
													.length &&
											((a.src = n.shift()),
											(a.opts.filter = n.shift())),
										a.opts.modal &&
											(a.opts = f.extend(!0, a.opts, {
												trapFocus: !0,
												infobar: 0,
												toolbar: 0,
												smallBtn: 0,
												keyboard: 0,
												slideShow: 0,
												fullScreen: 0,
												thumbs: 0,
												touch: 0,
												clickContent: !1,
												clickSlide: !1,
												clickOutside: !1,
												dblclickContent: !1,
												dblclickSlide: !1,
												dblclickOutside: !1,
											})),
										s.group.push(a);
								}),
									Object.keys(s.slides).length &&
										(s.updateControls(), (t = s.Thumbs)) &&
										t.isActive &&
										(t.create(), t.focus());
							},
							addEvents: function () {
								var n = this;
								n.removeEvents(),
									n.$refs.container
										.on(
											'click.fb-close',
											'[data-fancybox-close]',
											function (t) {
												t.stopPropagation(),
													t.preventDefault(),
													n.close(t);
											}
										)
										.on(
											'touchstart.fb-prev click.fb-prev',
											'[data-fancybox-prev]',
											function (t) {
												t.stopPropagation(),
													t.preventDefault(),
													n.previous();
											}
										)
										.on(
											'touchstart.fb-next click.fb-next',
											'[data-fancybox-next]',
											function (t) {
												t.stopPropagation(),
													t.preventDefault(),
													n.next();
											}
										)
										.on(
											'click.fb',
											'[data-fancybox-zoom]',
											function (t) {
												n[
													n.isScaledDown()
														? 'scaleToActual'
														: 'scaleToFit'
												]();
											}
										),
									a.on(
										'orientationchange.fb resize.fb',
										function (t) {
											t &&
											t.originalEvent &&
											'resize' === t.originalEvent.type
												? (n.requestId &&
														e(n.requestId),
												  (n.requestId = d(function () {
														n.update(t);
												  })))
												: (n.current &&
														'iframe' ===
															n.current.type &&
														n.$refs.stage.hide(),
												  setTimeout(
														function () {
															n.$refs.stage.show(),
																n.update(t);
														},
														f.modulaFancybox
															.isMobile
															? 600
															: 250
												  ));
										}
									),
									i.on('keydown.fb', function (t) {
										var e = (
												f.modulaFancybox
													? f.modulaFancybox.getInstance()
													: null
											).current,
											o = t.keyCode || t.which;
										9 == o
											? e.opts.trapFocus && n.focus(t)
											: !e.opts.keyboard ||
											  t.ctrlKey ||
											  t.altKey ||
											  t.shiftKey ||
											  f(t.target).is(
													'input,textarea,video,audio,select'
											  ) ||
											  (8 === o || 27 === o
													? (t.preventDefault(),
													  n.close(t))
													: 37 === o || 38 === o
													? (t.preventDefault(),
													  n.previous())
													: 39 === o || 40 === o
													? (t.preventDefault(),
													  n.next())
													: n.trigger(
															'afterKeydown',
															t,
															o
													  ));
									}),
									n.group[n.currIndex].opts.idleTime &&
										((n.idleSecondsCounter = 0),
										i.on(
											'mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle',
											function (t) {
												(n.idleSecondsCounter = 0),
													n.isIdle &&
														n.showControls(),
													(n.isIdle = !1);
											}
										),
										(n.idleInterval = l.setInterval(
											function () {
												n.idleSecondsCounter++,
													n.idleSecondsCounter >=
														n.group[n.currIndex]
															.opts.idleTime &&
														!n.isDragging &&
														((n.isIdle = !0),
														(n.idleSecondsCounter = 0),
														n.hideControls());
											},
											1e3
										)));
							},
							removeEvents: function () {
								a.off('orientationchange.fb resize.fb'),
									i.off('keydown.fb .fb-idle'),
									this.$refs.container.off(
										'.fb-close .fb-prev .fb-next'
									),
									this.idleInterval &&
										(l.clearInterval(this.idleInterval),
										(this.idleInterval = null));
							},
							previous: function (t) {
								return this.jumpTo(this.currPos - 1, t);
							},
							next: function (t) {
								return this.jumpTo(this.currPos + 1, t);
							},
							jumpTo: function (t, n) {
								var e,
									o,
									a,
									i,
									s,
									r,
									l,
									c,
									d = this,
									u = d.group.length;
								if (
									!(
										d.isDragging ||
										d.isClosing ||
										(d.isAnimating && d.firstRun)
									)
								) {
									if (
										((t = parseInt(t, 10)),
										!(o = (d.current || d).opts.loop) &&
											(t < 0 || u <= t))
									)
										return !1;
									(e = d.firstRun =
										!Object.keys(d.slides).length),
										(i = d.current),
										(d.prevIndex = d.currIndex),
										(d.prevPos = d.currPos),
										(a = d.createSlide(t)),
										1 < u &&
											((o || a.index < u - 1) &&
												d.createSlide(t + 1),
											o || 0 < a.index) &&
											d.createSlide(t - 1),
										(d.current = a),
										(d.currIndex = a.index),
										(d.currPos = a.pos),
										d.trigger('beforeShow', e),
										d.updateControls(),
										(a.forcedDuration = m),
										f.isNumeric(n)
											? (a.forcedDuration = n)
											: (n =
													a.opts[
														e
															? 'animationDuration'
															: 'transitionDuration'
													]),
										(n = parseInt(n, 10)),
										(u = d.isMoved(a)),
										a.$slide.addClass(
											'modula-fancybox-slide--current'
										),
										e
											? (a.opts.animationEffect &&
													n &&
													d.$refs.container.css(
														'transition-duration',
														n + 'ms'
													),
											  d.$refs.container
													.addClass(
														'modula-fancybox-is-open'
													)
													.trigger('focus'),
											  d.loadSlide(a))
											: ((s =
													f.modulaFancybox.getTranslate(
														i.$slide
													)),
											  (r =
													f.modulaFancybox.getTranslate(
														d.$refs.stage
													)),
											  f.each(d.slides, function (t, e) {
													f.modulaFancybox.stop(
														e.$slide,
														!0
													);
											  }),
											  i.pos !== a.pos &&
													(i.isComplete = !1),
											  i.$slide.removeClass(
													'modula-fancybox-slide--complete modula-fancybox-slide--current'
											  ),
											  u
													? ((c =
															s.left -
															(i.pos * s.width +
																i.pos *
																	i.opts
																		.gutter)),
													  f.each(
															d.slides,
															function (t, e) {
																e.$slide
																	.removeClass(
																		'modula-fancybox-animated'
																	)
																	.removeClass(
																		function (
																			t,
																			e
																		) {
																			return (
																				e.match(
																					/(^|\s)modula-fancybox-fx-\S+/g
																				) ||
																				[]
																			).join(
																				' '
																			);
																		}
																	);
																var o =
																	e.pos *
																		s.width +
																	e.pos *
																		e.opts
																			.gutter;
																f.modulaFancybox.setTranslate(
																	e.$slide,
																	{
																		top: 0,
																		left:
																			o -
																			r.left +
																			c,
																	}
																),
																	e.pos !==
																		a.pos &&
																		e.$slide.addClass(
																			'modula-fancybox-slide--' +
																				(e.pos >
																				a.pos
																					? 'next'
																					: 'previous')
																		),
																	p(e.$slide),
																	f.modulaFancybox.animate(
																		e.$slide,
																		{
																			top: 0,
																			left:
																				(e.pos -
																					a.pos) *
																					s.width +
																				(e.pos -
																					a.pos) *
																					e
																						.opts
																						.gutter,
																		},
																		n,
																		function () {
																			e.$slide
																				.css(
																					{
																						transform:
																							'',
																						opacity:
																							'',
																					}
																				)
																				.removeClass(
																					'modula-fancybox-slide--next modula-fancybox-slide--previous'
																				),
																				e.pos ===
																					d.currPos &&
																					d.complete();
																		}
																	);
															}
													  ))
													: n &&
													  a.opts.transitionEffect &&
													  ((l =
															'modula-fancybox-animated modula-fancybox-fx-' +
															a.opts
																.transitionEffect),
													  i.$slide.addClass(
															'modula-fancybox-slide--' +
																(i.pos > a.pos
																	? 'next'
																	: 'previous')
													  ),
													  f.modulaFancybox.animate(
															i.$slide,
															l,
															n,
															function () {
																i.$slide
																	.removeClass(
																		l
																	)
																	.removeClass(
																		'modula-fancybox-slide--next modula-fancybox-slide--previous'
																	);
															},
															!1
													  )),
											  a.isLoaded
													? d.revealContent(a)
													: d.loadSlide(a)),
										d.preload('image');
								}
							},
							createSlide: function (t) {
								var e,
									o = this,
									n = t % o.group.length;
								return (
									(n = n < 0 ? o.group.length + n : n),
									!o.slides[t] &&
										o.group[n] &&
										((e = f(
											'<div class="modula-fancybox-slide"></div>'
										).appendTo(o.$refs.stage)),
										(o.slides[t] = f.extend(
											!0,
											{},
											o.group[n],
											{ pos: t, $slide: e, isLoaded: !1 }
										)),
										o.updateSlide(o.slides[t])),
									o.slides[t]
								);
							},
							scaleToActual: function (t, e, o) {
								var n,
									a,
									i,
									s,
									r = this,
									l = r.current,
									c = l.$content,
									d = f.modulaFancybox.getTranslate(
										l.$slide
									).width,
									u = f.modulaFancybox.getTranslate(
										l.$slide
									).height,
									p = l.width,
									h = l.height;
								r.isAnimating ||
									r.isMoved() ||
									!c ||
									'image' != l.type ||
									!l.isLoaded ||
									l.hasError ||
									((r.isAnimating = !0),
									f.modulaFancybox.stop(c),
									(t = t === m ? 0.5 * d : t),
									(e = e === m ? 0.5 * u : e),
									((n =
										f.modulaFancybox.getTranslate(c)).top -=
										f.modulaFancybox.getTranslate(
											l.$slide
										).top),
									(n.left -= f.modulaFancybox.getTranslate(
										l.$slide
									).left),
									(l = p / n.width),
									(s = h / n.height),
									(a = 0.5 * d - 0.5 * p),
									(i = 0.5 * u - 0.5 * h),
									d < p &&
										(a =
											0 < (a = n.left * l - (t * l - t))
												? 0
												: a) <
											d - p &&
										(a = d - p),
									u < h &&
										(i =
											0 < (i = n.top * s - (e * s - e))
												? 0
												: i) <
											u - h &&
										(i = u - h),
									r.updateCursor(p, h),
									f.modulaFancybox.animate(
										c,
										{
											top: i,
											left: a,
											scaleX: l,
											scaleY: s,
										},
										o || 366,
										function () {
											r.isAnimating = !1;
										}
									),
									r.SlideShow &&
										r.SlideShow.isActive &&
										r.SlideShow.stop());
							},
							scaleToFit: function (t) {
								var e = this,
									o = e.current,
									n = o.$content;
								e.isAnimating ||
									e.isMoved() ||
									!n ||
									'image' != o.type ||
									!o.isLoaded ||
									o.hasError ||
									((e.isAnimating = !0),
									f.modulaFancybox.stop(n),
									(o = e.getFitPos(o)),
									e.updateCursor(o.width, o.height),
									f.modulaFancybox.animate(
										n,
										{
											top: o.top,
											left: o.left,
											scaleX: o.width / n.width(),
											scaleY: o.height / n.height(),
										},
										t || 366,
										function () {
											e.isAnimating = !1;
										}
									));
							},
							getFitPos: function (t) {
								var e,
									o,
									n = t.$content,
									a = t.$slide,
									i = t.width || t.opts.width,
									s = t.height || t.opts.height,
									r = {};
								return (
									!!(t.isLoaded && n && n.length) &&
									((e = f.modulaFancybox.getTranslate(
										this.$refs.stage
									).width),
									(o = f.modulaFancybox.getTranslate(
										this.$refs.stage
									).height),
									(e -=
										parseFloat(a.css('paddingLeft')) +
										parseFloat(a.css('paddingRight')) +
										parseFloat(n.css('marginLeft')) +
										parseFloat(n.css('marginRight'))),
									(o -=
										parseFloat(a.css('paddingTop')) +
										parseFloat(a.css('paddingBottom')) +
										parseFloat(n.css('marginTop')) +
										parseFloat(n.css('marginBottom'))),
									(i && s) || ((i = e), (s = o)),
									e - 0.5 <
										(i *= n = Math.min(1, e / i, o / s)) &&
										(i = e),
									o - 0.5 < (s *= n) && (s = o),
									'image' === t.type
										? ((r.top =
												Math.floor(0.5 * (o - s)) +
												parseFloat(
													a.css('paddingTop')
												)),
										  (r.left =
												Math.floor(0.5 * (e - i)) +
												parseFloat(
													a.css('paddingLeft')
												)))
										: 'video' === t.contentType &&
										  (i /
												(n =
													t.opts.width &&
													t.opts.height
														? i / s
														: t.opts.ratio ||
														  16 / 9) <
										  s
												? (s = i / n)
												: s * n < i && (i = s * n)),
									(r.width = i),
									(r.height = s),
									r)
								);
							},
							update: function (o) {
								var n = this;
								f.each(n.slides, function (t, e) {
									n.updateSlide(e, o);
								});
							},
							updateSlide: function (t, e) {
								var o = this,
									n = t && t.$content,
									a = t.width || t.opts.width,
									i = t.height || t.opts.height,
									s = t.$slide;
								o.adjustCaption(t),
									n &&
										(a || i || 'video' === t.contentType) &&
										!t.hasError &&
										(f.modulaFancybox.stop(n),
										f.modulaFancybox.setTranslate(
											n,
											o.getFitPos(t)
										),
										t.pos === o.currPos) &&
										((o.isAnimating = !1),
										o.updateCursor()),
									o.adjustLayout(t),
									s.length &&
										(s.trigger('refresh'),
										t.pos === o.currPos) &&
										o.$refs.toolbar
											.add(
												o.$refs.navigation.find(
													'.modula-fancybox-button--arrow_right'
												)
											)
											.toggleClass(
												'compensate-for-scrollbar',
												s.get(0).scrollHeight >
													s.get(0).clientHeight
											),
									o.trigger('onUpdate', t, e);
							},
							centerSlide: function (t) {
								var e = this,
									o = e.current,
									n = o.$slide;
								!e.isClosing &&
									o &&
									(n
										.siblings()
										.css({ transform: '', opacity: '' }),
									n
										.parent()
										.children()
										.removeClass(
											'modula-fancybox-slide--previous modula-fancybox-slide--next'
										),
									f.modulaFancybox.animate(
										n,
										{ top: 0, left: 0, opacity: 1 },
										t === m ? 0 : t,
										function () {
											n.css({
												transform: '',
												opacity: '',
											}),
												o.isComplete || e.complete();
										},
										!1
									));
							},
							isMoved: function (t) {
								var e,
									o,
									t = t || this.current;
								return (
									!!t &&
									((o = f.modulaFancybox.getTranslate(
										this.$refs.stage
									)),
									(e = f.modulaFancybox.getTranslate(
										t.$slide
									)),
									!t.$slide.hasClass(
										'modula-fancybox-animated'
									)) &&
									(0.5 < Math.abs(e.top - o.top) ||
										0.5 < Math.abs(e.left - o.left))
								);
							},
							updateCursor: function (t, e) {
								var o = this,
									n = o.current,
									a = o.$refs.container;
								n &&
									!o.isClosing &&
									o.Guestures &&
									(a.removeClass(
										'modula-fancybox-is-zoomable modula-fancybox-can-zoomIn modula-fancybox-can-zoomOut modula-fancybox-can-swipe modula-fancybox-can-pan'
									),
									(e =
										!!(t = o.canPan(t, e)) ||
										o.isZoomable()),
									a.toggleClass(
										'modula-fancybox-is-zoomable',
										e
									),
									f('[data-fancybox-zoom]').prop(
										'disabled',
										!e
									),
									t
										? a.addClass('modula-fancybox-can-pan')
										: e &&
										  ('zoom' === n.opts.clickContent ||
												(f.isFunction(
													n.opts.clickContent
												) &&
													'zoom' ==
														n.opts.clickContent(n)))
										? a.addClass(
												'modula-fancybox-can-zoomIn'
										  )
										: n.opts.touch &&
										  (n.opts.touch.vertical ||
												1 < o.group.length) &&
										  'video' !== n.contentType &&
										  a.addClass(
												'modula-fancybox-can-swipe'
										  ));
							},
							isZoomable: function () {
								var t,
									e = this.current;
								if (
									e &&
									!this.isClosing &&
									'image' === e.type &&
									!e.hasError
								) {
									if (!e.isLoaded) return !0;
									if (
										(t = this.getFitPos(e)) &&
										(e.width > t.width ||
											e.height > t.height)
									)
										return !0;
								}
								return !1;
							},
							isScaledDown: function (t, e) {
								var o = !1,
									n = this.current,
									a = n.$content;
								return (
									t !== m && e !== m
										? (o = t < n.width && e < n.height)
										: a &&
										  (o =
												(o =
													f.modulaFancybox.getTranslate(
														a
													)).width < n.width &&
												o.height < n.height),
									o
								);
							},
							canPan: function (t, e) {
								var o = this.current,
									n = null,
									a = !1;
								return (a =
									'image' === o.type &&
									(o.isComplete || (t && e)) &&
									!o.hasError &&
									((a = this.getFitPos(o)),
									t !== m && e !== m
										? (n = { width: t, height: e })
										: o.isComplete &&
										  (n = f.modulaFancybox.getTranslate(
												o.$content
										  )),
									n)
										? a &&
										  (1.5 < Math.abs(n.width - a.width) ||
												1.5 <
													Math.abs(
														n.height - a.height
													))
										: a);
							},
							loadSlide: function (o) {
								var t,
									e,
									n,
									a = this;
								if (!o.isLoading && !o.isLoaded) {
									if (
										!(o.isLoading = !0) ===
										a.trigger('beforeLoad', o)
									)
										return (o.isLoading = !1);
									switch (
										((t = o.type),
										(e = o.$slide)
											.off('refresh')
											.trigger('onReset')
											.addClass(o.opts.slideClass),
										t)
									) {
										case 'image':
											a.setImage(o);
											break;
										case 'iframe':
											a.setIframe(o);
											break;
										case 'html':
											a.setContent(o, o.src || o.content);
											break;
										case 'video':
											a.setContent(
												o,
												o.opts.video.tpl
													.replace(
														/\{\{src\}\}/gi,
														o.src
													)
													.replace(
														'{{format}}',
														o.opts.videoFormat ||
															o.opts.video
																.format ||
															''
													)
													.replace(
														'{{poster}}',
														o.thumb || ''
													)
											);
											break;
										case 'inline':
											f(o.src).length
												? a.setContent(o, f(o.src))
												: a.setError(o);
											break;
										case 'ajax':
											a.showLoading(o),
												(n = f.ajax(
													f.extend(
														{},
														o.opts.ajax.settings,
														{
															url: o.src,
															success: function (
																t,
																e
															) {
																'success' ===
																	e &&
																	a.setContent(
																		o,
																		t
																	);
															},
															error: function (
																t,
																e
															) {
																t &&
																	'abort' !==
																		e &&
																	a.setError(
																		o
																	);
															},
														}
													)
												)),
												e.one('onReset', function () {
													n.abort();
												});
											break;
										default:
											a.setError(o);
									}
									return !0;
								}
							},
							setImage: function (e) {
								var t,
									o = this;
								setTimeout(function () {
									var t = e.$image;
									o.isClosing ||
										!e.isLoading ||
										(t && t.length && t[0].complete) ||
										e.hasError ||
										o.showLoading(e);
								}, 50),
									o.checkSrcset(e),
									(e.$content = f(
										'<div class="modula-fancybox-content"></div>'
									)
										.addClass('modula-fancybox-is-hidden')
										.appendTo(
											e.$slide.addClass(
												'modula-fancybox-slide--image'
											)
										)),
									!1 !== e.opts.preload &&
										e.opts.width &&
										e.opts.height &&
										e.thumb &&
										((e.width = e.opts.width),
										(e.height = e.opts.height),
										((t = s.createElement('img')).onerror =
											function () {
												f(this).remove(),
													(e.$ghost = null);
											}),
										(t.onload = function () {
											o.afterLoad(e);
										}),
										(e.$ghost = f(t)
											.addClass('modula-fancybox-image')
											.appendTo(e.$content)
											.attr('src', e.thumb)),
										'undifined' != typeof e.src) &&
										e.$ghost.attr('alt', e.alt),
									o.setBigImage(e);
							},
							checkSrcset: function (t) {
								var e,
									o,
									n,
									a,
									i = t.opts.srcset || t.opts.image.srcset;
								if (i) {
									(n = l.devicePixelRatio || 1),
										(a = l.innerWidth * n),
										(o = i.split(',').map(function (t) {
											var n = {};
											return (
												t
													.trim()
													.split(/\s+/)
													.forEach(function (t, e) {
														var o = parseInt(
															t.substring(
																0,
																t.length - 1
															),
															10
														);
														if (0 === e)
															return (n.url = t);
														o &&
															((n.value = o),
															(n.postfix =
																t[
																	t.length - 1
																]));
													}),
												n
											);
										})).sort(function (t, e) {
											return t.value - e.value;
										});
									for (var s = 0; s < o.length; s++) {
										var r = o[s];
										if (
											('w' === r.postfix &&
												r.value >= a) ||
											('x' === r.postfix && r.value >= n)
										) {
											e = r;
											break;
										}
									}
									(e =
										!e && o.length ? o[o.length - 1] : e) &&
										((t.src = e.url),
										t.width &&
											t.height &&
											'w' == e.postfix &&
											((t.height =
												(t.width / t.height) * e.value),
											(t.width = e.value)),
										(t.opts.srcset = i));
								}
							},
							setBigImage: function (e) {
								var o = this,
									t = s.createElement('img'),
									n = f(t);
								(e.$image = n
									.one('error', function () {
										o.setError(e);
									})
									.one('load', function () {
										var t;
										e.$ghost ||
											(o.resolveImageSlideSize(
												e,
												this.naturalWidth,
												this.naturalHeight
											),
											o.afterLoad(e)),
											o.isClosing ||
												(e.opts.srcset &&
													(((t = e.opts.sizes) &&
														'auto' !== t) ||
														(t =
															(1 <
																e.width /
																	e.height &&
															1 <
																a.width() /
																	a.height()
																? '100'
																: Math.round(
																		(e.width /
																			e.height) *
																			100
																  )) + 'vw'),
													n
														.attr('sizes', t)
														.attr(
															'srcset',
															e.opts.srcset
														)),
												e.opts.alt &&
													n.attr('alt', e.opts.alt),
												e.opts.image_id &&
													n.attr(
														'image-id',
														e.opts.image_id
													),
												e.$thumb &&
													n.attr(
														'title',
														e.$thumb
															.find('img.pic')
															.attr('title')
													),
												e.$ghost &&
													setTimeout(
														function () {
															e.$ghost &&
																!o.isClosing &&
																e.$ghost.hide();
														},
														Math.min(
															300,
															Math.max(
																1e3,
																e.height / 1600
															)
														)
													),
												o.hideLoading(e));
									})
									.addClass('modula-fancybox-image')
									.attr('src', e.src)
									.attr(
										'aria-describedby',
										'modula-caption-' + e.index
									)
									.appendTo(e.$content)),
									(t.complete ||
										'complete' == t.readyState) &&
									n.naturalWidth &&
									n.naturalHeight
										? n.trigger('load')
										: t.error && n.trigger('error');
							},
							resolveImageSlideSize: function (t, e, o) {
								var n = parseInt(t.opts.width, 10),
									a = parseInt(t.opts.height, 10);
								(t.width = e),
									(t.height = o),
									0 < n &&
										((t.width = n),
										(t.height = Math.floor((n * o) / e))),
									0 < a &&
										((t.width = Math.floor((a * e) / o)),
										(t.height = a));
							},
							setIframe: function (a) {
								var i,
									e = this,
									s = a.opts.iframe,
									r = a.$slide;
								(a.$content = f(
									'<div class="modula-fancybox-content' +
										(s.preload
											? ' modula-fancybox-is-hidden'
											: '') +
										'"></div>'
								)
									.css(s.css)
									.appendTo(r)),
									r.addClass(
										'modula-fancybox-slide--' +
											a.contentType
									),
									(a.$iframe = i =
										f(
											s.tpl.replace(
												/\{rnd\}/g,
												new Date().getTime()
											)
										)
											.attr(s.attr)
											.appendTo(a.$content)),
									s.preload
										? (e.showLoading(a),
										  i.on(
												'load.fb error.fb',
												function (t) {
													(this.isReady = 1),
														a.$slide.trigger(
															'refresh'
														),
														e.afterLoad(a);
												}
										  ),
										  r.on('refresh.fb', function () {
												var t,
													e = a.$content,
													o = s.css.width,
													n = s.css.height;
												if (1 === i[0].isReady) {
													try {
														t = i
															.contents()
															.find('body');
													} catch (t) {}
													t &&
														t.length &&
														t.children().length &&
														(r.css(
															'overflow',
															'visible'
														),
														e.css({
															width: '100%',
															'max-width': '100%',
															height: '9999px',
														}),
														o === m &&
															(o = Math.ceil(
																Math.max(
																	t[0]
																		.clientWidth,
																	t.outerWidth(
																		!0
																	)
																)
															)),
														e
															.css(
																'width',
																o || ''
															)
															.css(
																'max-width',
																''
															),
														n === m &&
															(n = Math.ceil(
																Math.max(
																	t[0]
																		.clientHeight,
																	t.outerHeight(
																		!0
																	)
																)
															)),
														e.css(
															'height',
															n || ''
														),
														r.css(
															'overflow',
															'auto'
														)),
														e.removeClass(
															'modula-fancybox-is-hidden'
														);
												}
										  }))
										: e.afterLoad(a),
									i.attr('src', a.src),
									r.one('onReset', function () {
										try {
											f(this)
												.find('iframe')
												.hide()
												.unbind()
												.attr('src', '//about:blank');
										} catch (t) {}
										f(this).off('refresh.fb').empty(),
											(a.isLoaded = !1),
											(a.isRevealed = !1);
									});
							},
							setContent: function (t, e) {
								var o;
								this.isClosing ||
									(this.hideLoading(t),
									t.$content &&
										f.modulaFancybox.stop(t.$content),
									t.$slide.empty(),
									(o = e) &&
									o.hasOwnProperty &&
									o instanceof f &&
									e.parent().length
										? ((e.hasClass(
												'modula-fancybox-content'
										  ) ||
												e
													.parent()
													.hasClass(
														'modula-fancybox-content'
													)) &&
												e
													.parents(
														'.modula-fancybox-slide'
													)
													.trigger('onReset'),
										  (t.$placeholder = f('<div>')
												.hide()
												.insertAfter(e)),
										  e.css('display', 'inline-block'))
										: t.hasError ||
										  ('string' === f.type(e) &&
												(e = f('<div>')
													.append(f.trim(e))
													.contents()),
										  t.opts.filter &&
												(e = f('<div>')
													.html(e)
													.find(t.opts.filter))),
									t.$slide.one('onReset', function () {
										f(this)
											.find('video,audio')
											.trigger('pause'),
											t.$placeholder &&
												(t.$placeholder
													.after(
														e
															.removeClass(
																'modula-fancybox-content'
															)
															.hide()
													)
													.remove(),
												(t.$placeholder = null)),
											t.$smallBtn &&
												(t.$smallBtn.remove(),
												(t.$smallBtn = null)),
											t.hasError ||
												(f(this).empty(),
												(t.isLoaded = !1),
												(t.isRevealed = !1));
									}),
									f(e).appendTo(t.$slide),
									f(e).is('video,audio') &&
										(f(e).addClass('modula-fancybox-video'),
										f(e).wrap('<div></div>'),
										(t.contentType = 'video'),
										(t.opts.width =
											t.opts.width || f(e).attr('width')),
										(t.opts.height =
											t.opts.height ||
											f(e).attr('height'))),
									(t.$content = t.$slide
										.children()
										.filter(
											'div,form,main,video,audio,article,.modula-fancybox-content'
										)
										.first()),
									t.$content.siblings().hide(),
									t.$content.length ||
										(t.$content = t.$slide
											.wrapInner('<div></div>')
											.children()
											.first()),
									t.$content.addClass(
										'modula-fancybox-content'
									),
									t.$slide.addClass(
										'modula-fancybox-slide--' +
											t.contentType
									),
									this.afterLoad(t));
							},
							setError: function (t) {
								(t.hasError = !0),
									t.$slide
										.trigger('onReset')
										.removeClass(
											'modula-fancybox-slide--' +
												t.contentType
										)
										.addClass(
											'modula-fancybox-slide--error'
										),
									(t.contentType = 'html'),
									this.setContent(
										t,
										this.translate(t, t.opts.errorTpl)
									),
									t.pos === this.currPos &&
										(this.isAnimating = !1);
							},
							showLoading: function (t) {
								(t = t || this.current) &&
									!t.$spinner &&
									(t.$spinner = f(
										this.translate(
											this,
											this.opts.spinnerTpl
										)
									)
										.appendTo(t.$slide)
										.hide()
										.fadeIn('fast'));
							},
							hideLoading: function (t) {
								(t = t || this.current) &&
									t.$spinner &&
									(t.$spinner.stop().remove(),
									delete t.$spinner);
							},
							afterLoad: function (t) {
								var e = this;
								e.isClosing ||
									((t.isLoading = !1),
									(t.isLoaded = !0),
									e.trigger('afterLoad', t),
									e.hideLoading(t),
									!t.opts.smallBtn ||
										(t.$smallBtn && t.$smallBtn.length) ||
										(t.$smallBtn = f(
											e.translate(
												t,
												t.opts.btnTpl.smallBtn
											)
										).appendTo(t.$content)),
									t.opts.protect &&
										t.$content &&
										!t.hasError &&
										(t.$content.on(
											'contextmenu.fb',
											function (t) {
												return (
													2 == t.button &&
														t.preventDefault(),
													!0
												);
											}
										),
										'image' === t.type) &&
										f(
											'<div class="modula-fancybox-spaceball"></div>'
										).appendTo(t.$content),
									e.adjustCaption(t),
									e.adjustLayout(t),
									t.pos === e.currPos && e.updateCursor(),
									e.revealContent(t));
							},
							adjustCaption: function (t) {
								var e = this,
									t = t || e.current,
									o = t.opts.caption,
									n = t.opts.preventCaptionOverlap,
									a = e.$refs.caption,
									i = !1;
								a.toggleClass(
									'modula-fancybox-caption--separate',
									n
								),
									n &&
										o &&
										o.length &&
										(t.pos !== e.currPos
											? ((n = a
													.clone()
													.appendTo(a.parent()))
													.children()
													.eq(0)
													.empty()
													.html(o),
											  (i = n.outerHeight(!0)),
											  n.empty().remove())
											: e.$caption &&
											  (i = e.$caption.outerHeight(!0)),
										t.$slide.css(
											'padding-bottom',
											i || ''
										));
							},
							adjustLayout: function (t) {
								var e,
									o,
									n,
									a,
									t = t || this.current;
								t.isLoaded &&
									!0 !== t.opts.disableLayoutFix &&
									(t.$content.css('margin-bottom', ''),
									t.$content.outerHeight() >
										t.$slide.height() + 0.5 &&
										((n =
											t.$slide[0].style[
												'padding-bottom'
											]),
										(a = t.$slide.css('padding-bottom')),
										0 < parseFloat(a)) &&
										((e = t.$slide[0].scrollHeight),
										t.$slide.css('padding-bottom', 0),
										Math.abs(e - t.$slide[0].scrollHeight) <
											1 && (o = a),
										t.$slide.css('padding-bottom', n)),
									t.$content.css('margin-bottom', o));
							},
							revealContent: function (t) {
								var e,
									o,
									n,
									a,
									i = this,
									s = t.$slide,
									r = !1,
									l = !1,
									c = i.isMoved(t),
									d = t.isRevealed;
								(t.isRevealed = !0),
									(e =
										t.opts[
											i.firstRun
												? 'animationEffect'
												: 'transitionEffect'
										]),
									(n =
										t.opts[
											i.firstRun
												? 'animationDuration'
												: 'transitionDuration'
										]),
									(n = parseInt(
										t.forcedDuration === m
											? n
											: t.forcedDuration,
										10
									)),
									'zoom' ===
										(e =
											!c && t.pos === i.currPos && n
												? e
												: !1) &&
										(t.pos === i.currPos &&
										n &&
										'image' === t.type &&
										!t.hasError &&
										(l = i.getThumbPos(t))
											? (r = i.getFitPos(t))
											: (e = 'fade')),
									'zoom' === e
										? ((i.isAnimating = !0),
										  (r.scaleX = r.width / l.width),
										  (r.scaleY = r.height / l.height),
										  (a =
												'auto' ==
												(a = t.opts.zoomOpacity)
													? 0.1 <
													  Math.abs(
															t.width / t.height -
																l.width /
																	l.height
													  )
													: a) &&
												((l.opacity = 0.1),
												(r.opacity = 1)),
										  f.modulaFancybox.setTranslate(
												t.$content.removeClass(
													'modula-fancybox-is-hidden'
												),
												l
										  ),
										  p(t.$content),
										  f.modulaFancybox.animate(
												t.$content,
												r,
												n,
												function () {
													(i.isAnimating = !1),
														i.complete();
												}
										  ))
										: (i.updateSlide(t),
										  e
												? (f.modulaFancybox.stop(s),
												  (o =
														'modula-fancybox-slide--' +
														(t.pos >= i.prevPos
															? 'next'
															: 'previous') +
														' modula-fancybox-animated modula-fancybox-fx-' +
														e),
												  s
														.addClass(o)
														.removeClass(
															'modula-fancybox-slide--current'
														),
												  t.$content.removeClass(
														'modula-fancybox-is-hidden'
												  ),
												  p(s),
												  'image' !== t.type &&
														t.$content
															.hide()
															.show(0),
												  f.modulaFancybox.animate(
														s,
														'modula-fancybox-slide--current',
														n,
														function () {
															s
																.removeClass(o)
																.css({
																	transform:
																		'',
																	opacity: '',
																}),
																t.pos ===
																	i.currPos &&
																	i.complete();
														},
														!0
												  ))
												: (t.$content.removeClass(
														'modula-fancybox-is-hidden'
												  ),
												  d ||
														!c ||
														'image' !== t.type ||
														t.hasError ||
														t.$content
															.hide()
															.fadeIn('fast'),
												  t.pos === i.currPos &&
														i.complete()));
							},
							getThumbPos: function (t) {
								var e,
									o,
									n,
									a,
									t = t.$thumb;
								return (
									!!(
										t &&
										(n = (n = t).find('a.tile-inner')[0]) &&
										n.ownerDocument === s &&
										(f('.modula-fancybox-container').css(
											'pointer-events',
											'none'
										),
										(a = {
											x:
												n.getBoundingClientRect().left +
												n.offsetWidth / 2,
											y:
												n.getBoundingClientRect().top +
												n.offsetHeight / 2,
										}),
										(a =
											s.elementFromPoint(a.x, a.y) === n),
										f('.modula-fancybox-container').css(
											'pointer-events',
											''
										),
										a)
									) &&
									((n = f.modulaFancybox.getTranslate(t)),
									(a = parseFloat(
										t.css('border-top-width') || 0
									)),
									(e = parseFloat(
										t.css('border-right-width') || 0
									)),
									(o = parseFloat(
										t.css('border-bottom-width') || 0
									)),
									(t = parseFloat(
										t.css('border-left-width') || 0
									)),
									(e = {
										top: n.top + a,
										left: n.left + t,
										width: n.width - e - t,
										height: n.height - a - o,
										scaleX: 1,
										scaleY: 1,
									}),
									0 < n.width) &&
									0 < n.height &&
									e
								);
							},
							complete: function () {
								var t,
									o = this,
									e = o.current,
									n = {};
								!o.isMoved() &&
									e.isLoaded &&
									(e.isComplete ||
										((e.isComplete = !0),
										e.$slide.siblings().trigger('onReset'),
										o.preload('inline'),
										p(e.$slide),
										e.$slide.addClass(
											'modula-fancybox-slide--complete'
										),
										f.each(o.slides, function (t, e) {
											e.pos >= o.currPos - 1 &&
											e.pos <= o.currPos + 1
												? (n[e.pos] = e)
												: e &&
												  (f.modulaFancybox.stop(
														e.$slide
												  ),
												  e.$slide.off().remove());
										}),
										(o.slides = n)),
									(o.isAnimating = !1),
									o.updateCursor(),
									o.trigger('afterShow'),
									e.opts.video.autoStart &&
										e.$slide
											.find('video,audio')
											.filter(':visible:first')
											.trigger('play')
											.one('ended', function () {
												Document.exitFullscreen
													? Document.exitFullscreen()
													: this
															.webkitExitFullscreen &&
													  this.webkitExitFullscreen(),
													o.next();
											}),
									e.opts.autoFocus &&
										'html' === e.contentType &&
										((t = e.$content.find(
											'input[autofocus]:enabled:visible:first'
										)).length
											? t.trigger('focus')
											: o.focus(null, !0)),
									e.$slide.scrollTop(0).scrollLeft(0));
							},
							preload: function (t) {
								var e,
									o,
									n = this;
								n.group.length < 2 ||
									((o = n.slides[n.currPos + 1]),
									(e = n.slides[n.currPos - 1]) &&
										e.type === t &&
										n.loadSlide(e),
									o && o.type === t && n.loadSlide(o));
							},
							focus: function (t, e) {
								var o = this,
									n = [
										'a[href]',
										'area[href]',
										'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
										'select:not([disabled]):not([aria-hidden])',
										'textarea:not([disabled]):not([aria-hidden])',
										'button:not([disabled]):not([aria-hidden])',
										'iframe',
										'object',
										'embed',
										'video',
										'audio',
										'[contenteditable]',
										'[tabindex]:not([tabindex^="-"])',
									].join(',');
								o.isClosing ||
									((e = (e =
										!t && o.current && o.current.isComplete
											? o.current.$slide.find(
													'*:visible' +
														(e
															? ':not(.modula-fancybox-close-small)'
															: '')
											  )
											: o.$refs.container.find(
													'*:visible'
											  ))
										.filter(n)
										.filter(function () {
											return (
												'hidden' !==
													f(this).css('visibility') &&
												!f(this).hasClass('disabled')
											);
										})).length
										? ((n = e.index(s.activeElement)),
										  t && t.shiftKey
												? (n < 0 || 0 == n) &&
												  (t.preventDefault(),
												  e
														.eq(e.length - 1)
														.trigger('focus'))
												: (n < 0 ||
														n == e.length - 1) &&
												  (t && t.preventDefault(),
												  e.eq(0).trigger('focus')))
										: o.$refs.container.trigger('focus'));
							},
							activate: function () {
								var e = this;
								f('.modula-fancybox-container').each(
									function () {
										var t = f(this).data('modulaFancyBox');
										t &&
											t.id !== e.id &&
											!t.isClosing &&
											(t.trigger('onDeactivate'),
											t.removeEvents(),
											(t.isVisible = !1));
									}
								),
									(e.isVisible = !0),
									(e.current || e.isIdle) &&
										(e.update(), e.updateControls()),
									e.trigger('onActivate'),
									e.addEvents();
							},
							close: function (t, e) {
								function o() {
									l.cleanUp(t);
								}
								var n,
									a,
									i,
									s,
									r,
									l = this,
									c = l.current;
								return (
									!l.isClosing &&
									(!(l.isClosing = !0) ===
									l.trigger('beforeClose', t)
										? ((l.isClosing = !1),
										  d(function () {
												l.update();
										  }),
										  !1)
										: (l.removeEvents(),
										  (a = c.$content),
										  (n = c.opts.animationEffect),
										  (e = f.isNumeric(e)
												? e
												: n
												? c.opts.animationDuration
												: 0),
										  c.$slide.removeClass(
												'modula-fancybox-slide--complete modula-fancybox-slide--next modula-fancybox-slide--previous modula-fancybox-animated'
										  ),
										  !0 !== t
												? f.modulaFancybox.stop(
														c.$slide
												  )
												: (n = !1),
										  c.$slide
												.siblings()
												.trigger('onReset')
												.remove(),
										  e &&
												l.$refs.container
													.removeClass(
														'modula-fancybox-is-open'
													)
													.addClass(
														'modula-fancybox-is-closing'
													)
													.css(
														'transition-duration',
														e + 'ms'
													),
										  l.hideLoading(c),
										  l.hideControls(!0),
										  l.updateCursor(),
										  'zoom' ===
										  (n =
												'zoom' !== n ||
												(a &&
													e &&
													'image' === c.type &&
													!l.isMoved() &&
													!c.hasError &&
													(r = l.getThumbPos(c)))
													? n
													: 'fade')
												? (f.modulaFancybox.stop(a),
												  (s = {
														top: (s =
															f.modulaFancybox.getTranslate(
																a
															)).top,
														left: s.left,
														scaleX:
															s.width / r.width,
														scaleY:
															s.height / r.height,
														width: r.width,
														height: r.height,
												  }),
												  (i =
														'auto' ==
														(i = c.opts.zoomOpacity)
															? 0.1 <
															  Math.abs(
																	c.width /
																		c.height -
																		r.width /
																			r.height
															  )
															: i) &&
														(r.opacity = 0),
												  f.modulaFancybox.setTranslate(
														a,
														s
												  ),
												  p(a),
												  f.modulaFancybox.animate(
														a,
														r,
														e,
														o
												  ))
												: n && e
												? f.modulaFancybox.animate(
														c.$slide
															.addClass(
																'modula-fancybox-slide--previous'
															)
															.removeClass(
																'modula-fancybox-slide--current'
															),
														'modula-fancybox-animated modula-fancybox-fx-' +
															n,
														e,
														o
												  )
												: !0 === t
												? setTimeout(o, e)
												: o(),
										  !0))
								);
							},
							cleanUp: function (t) {
								var e,
									o = this,
									n = o.current.opts.$orig;
								o.current.$slide.trigger('onReset'),
									o.$refs.container.empty().remove(),
									o.trigger('afterClose', t),
									o.current.opts.backFocus &&
										(n =
											n && n.length && n.is(':visible')
												? n
												: o.$trigger) &&
										n.length &&
										((t = l.scrollX),
										(e = l.scrollY),
										n.trigger('focus'),
										f('html, body')
											.scrollTop(e)
											.scrollLeft(t)),
									(o.current = null),
									(n = f.modulaFancybox.getInstance())
										? n.activate()
										: (f('body').removeClass(
												'modula-fancybox-active compensate-for-scrollbar'
										  ),
										  f(
												'#modula-fancybox-style-noscroll'
										  ).remove());
							},
							trigger: function (t, e) {
								var o,
									n = Array.prototype.slice.call(
										arguments,
										1
									),
									a = this,
									e = e && e.opts ? e : a.current;
								if (
									(e ? n.unshift(e) : (e = a),
									n.unshift(a),
									!1 ===
										(o = f.isFunction(e.opts[t])
											? e.opts[t].apply(e, n)
											: o))
								)
									return o;
								('afterClose' !== t && a.$refs
									? a.$refs.container
									: i
								).trigger(t + '.fb', n);
							},
							updateControls: function () {
								var t = this,
									e = t.current,
									o = e.index,
									n = t.$refs.container,
									a = t.$refs.caption,
									i = e.opts.caption;
								e.$slide.trigger('refresh'),
									i && i.length
										? (t.$caption = a)
												.children()
												.eq(0)
												.html(
													'<p id="modula-caption-' +
														e.index +
														'" class="modula-fancybox-caption__text">' +
														i +
														'</p>'
												)
										: (t.$caption = null),
									t.hasHiddenControls ||
										t.isIdle ||
										t.showControls(),
									n
										.find('[data-fancybox-count]')
										.html(t.group.length),
									n.find('[data-fancybox-index]').html(o + 1),
									n
										.find('[data-fancybox-prev]')
										.prop(
											'disabled',
											!e.opts.loop && o <= 0
										),
									n
										.find('[data-fancybox-next]')
										.prop(
											'disabled',
											!e.opts.loop &&
												o >= t.group.length - 1
										),
									'image' === e.type
										? n
												.find('[data-fancybox-zoom]')
												.show()
												.end()
												.find(
													'[data-fancybox-download]'
												)
												.attr(
													'href',
													e.opts.image.src || e.src
												)
												.show()
										: e.opts.toolbar &&
										  n
												.find(
													'[data-fancybox-download],[data-fancybox-zoom]'
												)
												.hide(),
									f(s.activeElement).is(
										':hidden,[disabled]'
									) && t.$refs.container.trigger('focus');
							},
							hideControls: function (t) {
								var e = ['infobar', 'toolbar', 'nav'];
								(!t &&
									this.current.opts.preventCaptionOverlap) ||
									e.push('caption'),
									this.$refs.container.removeClass(
										e
											.map(function (t) {
												return (
													'modula-fancybox-show-' + t
												);
											})
											.join(' ')
									),
									(this.hasHiddenControls = !0);
							},
							showControls: function () {
								var t = this,
									e = (t.current || t).opts,
									o = t.$refs.container;
								(t.hasHiddenControls = !1),
									(t.idleSecondsCounter = 0),
									o
										.toggleClass(
											'modula-fancybox-show-toolbar',
											!(!e.toolbar || !e.buttons)
										)
										.toggleClass(
											'modula-fancybox-show-infobar',
											!!(e.infobar && 1 < t.group.length)
										)
										.toggleClass(
											'modula-fancybox-show-caption',
											!!t.$caption
										)
										.toggleClass(
											'modula-fancybox-show-nav',
											!!(e.arrows && 1 < t.group.length)
										)
										.toggleClass(
											'modula-fancybox-is-modal',
											!!e.modal
										);
							},
							toggleControls: function () {
								this.hasHiddenControls
									? this.showControls()
									: this.hideControls();
							},
						}
				  ),
				  (f.modulaFancybox = {
						version: '3.5.7',
						defaults: t,
						getInstance: function (t) {
							var e = f(
									'.modula-fancybox-container:not(".modula-fancybox-is-closing"):last'
								).data('modulaFancyBox'),
								o = Array.prototype.slice.call(arguments, 1);
							return (
								e instanceof n &&
								('string' === f.type(t)
									? e[t].apply(e, o)
									: 'function' === f.type(t) && t.apply(e, o),
								e)
							);
						},
						open: function (t, e, o) {
							return new n(t, e, o);
						},
						close: function (t) {
							var e = this.getInstance();
							e && (e.close(), !0 === t) && this.close(t);
						},
						destroy: function () {
							this.close(!0),
								i.add('body').off('click.fb-start', '**');
						},
						isMobile:
							/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
								navigator.userAgent
							),
						use3d:
							((t = s.createElement('div')),
							l.getComputedStyle &&
								l.getComputedStyle(t) &&
								l
									.getComputedStyle(t)
									.getPropertyValue('transform') &&
								!(s.documentMode && s.documentMode < 11)),
						getTranslate: function (t) {
							var e;
							return (
								!(!t || !t.length) && {
									top:
										(e = t[0].getBoundingClientRect())
											.top || 0,
									left: e.left || 0,
									width: e.width,
									height: e.height,
									opacity: parseFloat(t.css('opacity')),
								}
							);
						},
						setTranslate: function (t, e) {
							var o = '',
								n = {};
							if (t && e)
								return (
									(e.left === m && e.top === m) ||
										((o =
											(e.left === m ? t.position() : e)
												.left +
											'px, ' +
											(e.top === m ? t.position() : e)
												.top +
											'px'),
										(o = this.use3d
											? 'translate3d(' + o + ', 0px)'
											: 'translate(' + o + ')')),
									e.scaleX !== m && e.scaleY !== m
										? (o +=
												' scale(' +
												e.scaleX +
												', ' +
												e.scaleY +
												')')
										: e.scaleX !== m &&
										  (o += ' scaleX(' + e.scaleX + ')'),
									o.length && (n.transform = o),
									e.opacity !== m && (n.opacity = e.opacity),
									e.width !== m && (n.width = e.width),
									e.height !== m && (n.height = e.height),
									t.css(n)
								);
						},
						animate: function (e, o, n, a, i) {
							var s,
								r = this;
							f.isFunction(n) && ((a = n), (n = null)),
								r.stop(e),
								(s = r.getTranslate(e)),
								e.on(c, function (t) {
									(!t ||
										!t.originalEvent ||
										(e.is(t.originalEvent.target) &&
											'z-index' !=
												t.originalEvent
													.propertyName)) &&
										(r.stop(e),
										f.isNumeric(n) &&
											e.css('transition-duration', ''),
										f.isPlainObject(o)
											? o.scaleX !== m &&
											  o.scaleY !== m &&
											  r.setTranslate(e, {
													top: o.top,
													left: o.left,
													width: s.width * o.scaleX,
													height: s.height * o.scaleY,
													scaleX: 1,
													scaleY: 1,
											  })
											: !0 !== i && e.removeClass(o),
										f.isFunction(a)) &&
										a(t);
								}),
								f.isNumeric(n) &&
									e.css('transition-duration', n + 'ms'),
								f.isPlainObject(o)
									? (o.scaleX !== m &&
											o.scaleY !== m &&
											(delete o.width,
											delete o.height,
											e
												.parent()
												.hasClass(
													'modula-fancybox-slide--image'
												)) &&
											e
												.parent()
												.addClass(
													'modula-fancybox-is-scaling'
												),
									  f.modulaFancybox.setTranslate(e, o))
									: e.addClass(o),
								e.data(
									'timer',
									setTimeout(function () {
										e.trigger(c);
									}, n + 33)
								);
						},
						stop: function (t, e) {
							t &&
								t.length &&
								(clearTimeout(t.data('timer')),
								e && t.trigger(c),
								t.off(c).css('transition-duration', ''),
								t
									.parent()
									.removeClass('modula-fancybox-is-scaling'));
						},
				  }),
				  (f.fn.modulaFancybox = function (t) {
						var e;
						return (
							(e = (t = t || {}).selector || !1)
								? f('body')
										.off('click.fb-start', e)
										.on(
											'click.fb-start',
											e,
											{ options: t },
											b
										)
								: this.off('click.fb-start').on(
										'click.fb-start',
										{ items: this, options: t },
										b
								  ),
							this
						);
				  }),
				  i.on('click.fb-start', '[data-fancybox]', b),
				  i.on(
						'click.fb-start',
						'[data-fancybox-trigger]',
						function (t) {
							f(
								'[data-fancybox="' +
									f(this).attr('data-fancybox-trigger') +
									'"]'
							)
								.eq(f(this).attr('data-fancybox-index') || 0)
								.trigger('click.fb-start', {
									$trigger: f(this),
								});
						}
				  ),
				  (o = '.modula-fancybox-button'),
				  (h = 'modula-fancybox-focus'),
				  (g = null),
				  i.on('mousedown mouseup focus blur', o, function (t) {
						switch (t.type) {
							case 'mousedown':
								g = f(this);
								break;
							case 'mouseup':
								g = null;
								break;
							case 'focusin':
								f(o).removeClass(h),
									f(this).is(g) ||
										f(this).is('[disabled]') ||
										f(this).addClass(h);
								break;
							case 'focusout':
								f(o).removeClass(h);
						}
				  })));
})(window, document, jQuery),
	(function (h) {
		'use strict';
		function f(o, t, e) {
			if (o)
				return (
					'object' === h.type((e = e || '')) && (e = h.param(e, !0)),
					h.each(t, function (t, e) {
						o = o.replace('$' + t, e || '');
					}),
					e.length && (o += (0 < o.indexOf('?') ? '&' : '?') + e),
					o
				);
		}
		var n = {
				youtube: {
					matcher:
						/(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
					params: {
						autoplay: 1,
						autohide: 1,
						fs: 1,
						rel: 0,
						hd: 1,
						wmode: 'transparent',
						enablejsapi: 1,
						html5: 1,
					},
					paramPlace: 8,
					type: 'iframe',
					url: 'https://www.youtube-nocookie.com/embed/$4',
					thumb: 'https://img.youtube.com/vi/$4/hqdefault.jpg',
				},
				vimeo: {
					matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
					params: {
						autoplay: 1,
						hd: 1,
						show_title: 1,
						show_byline: 1,
						show_portrait: 0,
						fullscreen: 1,
					},
					paramPlace: 3,
					type: 'iframe',
					url: '//player.vimeo.com/video/$2',
				},
				instagram: {
					matcher:
						/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
					type: 'image',
					url: '//$1/p/$2/media/?size=l',
				},
				gmap_place: {
					matcher:
						/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
					type: 'iframe',
					url: function (t) {
						return (
							'//maps.google.' +
							t[2] +
							'/?ll=' +
							(t[9]
								? t[9] +
								  '&z=' +
								  Math.floor(t[10]) +
								  (t[12] ? t[12].replace(/^\//, '&') : '')
								: t[12] + ''
							).replace(/\?/, '&') +
							'&output=' +
							(t[12] && 0 < t[12].indexOf('layer=c')
								? 'svembed'
								: 'embed')
						);
					},
				},
				gmap_search: {
					matcher:
						/(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
					type: 'iframe',
					url: function (t) {
						return (
							'//maps.google.' +
							t[2] +
							'/maps?q=' +
							t[5].replace('query=', 'q=').replace('api=1', '') +
							'&output=embed'
						);
					},
				},
			},
			a =
				(h(document).on('objectNeedsType.fb', function (t, e, a) {
					var i,
						s,
						r,
						l,
						c,
						d,
						u = a.src || '',
						p = !1,
						o = h.extend(!0, {}, n, a.opts.media);
					h.each(o, function (t, e) {
						if ((s = u.match(e.matcher))) {
							if (
								((p = e.type),
								(d = t),
								(c = {}),
								e.paramPlace && s[e.paramPlace])
							) {
								l = (l =
									'?' == (l = s[e.paramPlace])[0]
										? l.substring(1)
										: l).split('&');
								for (var o = 0; o < l.length; ++o) {
									var n = l[o].split('=', 2);
									2 == n.length &&
										(c[n[0]] = decodeURIComponent(
											n[1].replace(/\+/g, ' ')
										));
								}
							}
							return (
								(r = h.extend(!0, {}, e.params, a.opts[t], c)),
								(u =
									'function' === h.type(e.url)
										? e.url.call(this, s, r, a)
										: f(e.url, s, r)),
								(i =
									'function' === h.type(e.thumb)
										? e.thumb.call(this, s, r, a)
										: f(e.thumb, s)),
								'youtube' === t
									? (u = u.replace(
											/&t=(\d+)/,
											function (t, e) {
												return '&start=' + e;
											}
									  ))
									: 'vimeo' === t &&
									  (u = u.replace('&%23', '#')),
								!1
							);
						}
					}),
						p
							? (a.opts.thumb ||
									(a.opts.$thumb && a.opts.$thumb.length) ||
									(a.opts.thumb = i),
							  'iframe' === p &&
									(a.opts = h.extend(!0, a.opts, {
										iframe: {
											preload: !1,
											attr: { scrolling: 'no' },
										},
									})),
							  h.extend(a, {
									type: p,
									src: u,
									origSrc: a.src,
									contentSource: d,
									contentType:
										'image' === p
											? 'image'
											: 'gmap_place' == d ||
											  'gmap_search' == d
											? 'map'
											: 'video',
							  }))
							: u && (a.type = a.opts.defaultType);
				}),
				{
					youtube: {
						src: 'https://www.youtube.com/iframe_api',
						class: 'YT',
						loading: !1,
						loaded: !1,
					},
					vimeo: {
						src: 'https://player.vimeo.com/api/player.js',
						class: 'Vimeo',
						loading: !1,
						loaded: !1,
					},
					load: function (t) {
						var e,
							o = this;
						this[t].loaded
							? setTimeout(function () {
									o.done(t);
							  })
							: this[t].loading ||
							  ((this[t].loading = !0),
							  ((e = document.createElement('script')).type =
									'text/javascript'),
							  (e.src = this[t].src),
							  'youtube' === t
									? (window.onYouTubeIframeAPIReady =
											function () {
												(o[t].loaded = !0), o.done(t);
											})
									: (e.onload = function () {
											(o[t].loaded = !0), o.done(t);
									  }),
							  document.body.appendChild(e));
					},
					done: function (t) {
						var e, o;
						'youtube' === t &&
							delete window.onYouTubeIframeAPIReady,
							(e = h.modulaFancybox.getInstance()) &&
								((o = e.current.$content.find('iframe')),
								'youtube' === t && void 0 !== YT && YT
									? new YT.Player(o.attr('id'), {
											events: {
												onStateChange: function (t) {
													0 == t.data && e.next();
												},
											},
									  })
									: 'vimeo' === t &&
									  void 0 !== Vimeo &&
									  Vimeo &&
									  new Vimeo.Player(o).on(
											'ended',
											function () {
												e.next();
											}
									  ));
					},
				});
		h(document).on({
			'afterShow.fb': function (t, e, o) {
				1 < e.group.length &&
					('youtube' === o.contentSource ||
						'vimeo' === o.contentSource) &&
					a.load(o.contentSource);
			},
		});
	})(jQuery),
	(function (d, l, u) {
		'use strict';
		function p(t) {
			var e,
				o = [];
			for (e in (t =
				(t = t.originalEvent || t || d.e).touches && t.touches.length
					? t.touches
					: t.changedTouches && t.changedTouches.length
					? t.changedTouches
					: [t]))
				t[e].pageX
					? o.push({ x: t[e].pageX, y: t[e].pageY })
					: t[e].clientX &&
					  o.push({ x: t[e].clientX, y: t[e].clientY });
			return o;
		}
		function h(t, e, o) {
			return e && t
				? 'x' === o
					? t.x - e.x
					: 'y' === o
					? t.y - e.y
					: Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
				: 0;
		}
		function c(t) {
			if (
				t.is(
					'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio,iframe'
				) ||
				u.isFunction(t.get(0).onclick) ||
				t.data('selectable')
			)
				return 1;
			for (var e = 0, o = t[0].attributes, n = o.length; e < n; e++)
				if ('data-fancybox-' === o[e].nodeName.substr(0, 14)) return 1;
		}
		function f(t) {
			for (
				var e, o, n, a = !1;
				((e = t.get(0)),
				(n = o = n = o = void 0),
				(o = d.getComputedStyle(e)['overflow-y']),
				(n = d.getComputedStyle(e)['overflow-x']),
				(o =
					('scroll' === o || 'auto' === o) &&
					e.scrollHeight > e.clientHeight),
				(n =
					('scroll' === n || 'auto' === n) &&
					e.scrollWidth > e.clientWidth),
				!(a = o || n)) &&
				(t = t.parent()).length &&
				!t.hasClass('modula-fancybox-stage') &&
				!t.is('body');

			);
			return a;
		}
		function o(t) {
			var e = this;
			(e.instance = t),
				(e.$bg = t.$refs.bg),
				(e.$stage = t.$refs.stage),
				(e.$container = t.$refs.container),
				e.destroy(),
				e.$container.on(
					'touchstart.fb.touch mousedown.fb.touch',
					u.proxy(e, 'ontouchstart')
				);
		}
		var m =
				d.requestAnimationFrame ||
				d.webkitRequestAnimationFrame ||
				d.mozRequestAnimationFrame ||
				d.oRequestAnimationFrame ||
				function (t) {
					return d.setTimeout(t, 1e3 / 60);
				},
			g =
				d.cancelAnimationFrame ||
				d.webkitCancelAnimationFrame ||
				d.mozCancelAnimationFrame ||
				d.oCancelAnimationFrame ||
				function (t) {
					d.clearTimeout(t);
				};
		(o.prototype.destroy = function () {
			var t = this;
			t.$container.off('.fb.touch'),
				u(l).off('.fb.touch'),
				t.requestId && (g(t.requestId), (t.requestId = null)),
				t.tapped && (clearTimeout(t.tapped), (t.tapped = null));
		}),
			(o.prototype.ontouchstart = function (t) {
				var e = this,
					o = u(t.target),
					n = e.instance,
					a = n.current,
					i = a.$slide,
					s = a.$content,
					r = 'touchstart' == t.type;
				r && e.$container.off('mousedown.fb.touch'),
					(t.originalEvent && 2 == t.originalEvent.button) ||
						!i.length ||
						!o.length ||
						c(o) ||
						c(o.parent()) ||
						(!o.is('img') &&
							t.originalEvent.clientX >
								o[0].clientWidth + o.offset().left) ||
						(!a ||
						n.isAnimating ||
						a.$slide.hasClass('modula-fancybox-animated')
							? (t.stopPropagation(), t.preventDefault())
							: ((e.realPoints = e.startPoints = p(t)),
							  e.startPoints.length &&
									(a.touch && t.stopPropagation(),
									(e.startEvent = t),
									(e.canTap = !0),
									(e.$target = o),
									(e.$content = s),
									(e.opts = a.opts.touch),
									(e.isPanning = !1),
									(e.isSwiping = !1),
									(e.isZooming = !1),
									(e.isScrolling = !1),
									(e.canPan = n.canPan()),
									(e.startTime = new Date().getTime()),
									(e.distanceX =
										e.distanceY =
										e.distance =
											0),
									(e.canvasWidth = Math.round(
										i[0].clientWidth
									)),
									(e.canvasHeight = Math.round(
										i[0].clientHeight
									)),
									(e.contentLastPos = null),
									(e.contentStartPos =
										u.modulaFancybox.getTranslate(
											e.$content
										) || { top: 0, left: 0 }),
									(e.sliderStartPos =
										u.modulaFancybox.getTranslate(i)),
									(e.stagePos = u.modulaFancybox.getTranslate(
										n.$refs.stage
									)),
									(e.sliderStartPos.top -= e.stagePos.top),
									(e.sliderStartPos.left -= e.stagePos.left),
									(e.contentStartPos.top -= e.stagePos.top),
									(e.contentStartPos.left -= e.stagePos.left),
									u(l)
										.off('.fb.touch')
										.on(
											r
												? 'touchend.fb.touch touchcancel.fb.touch'
												: 'mouseup.fb.touch mouseleave.fb.touch',
											u.proxy(e, 'ontouchend')
										)
										.on(
											r
												? 'touchmove.fb.touch'
												: 'mousemove.fb.touch',
											u.proxy(e, 'ontouchmove')
										),
									u.modulaFancybox.isMobile &&
										l.addEventListener(
											'scroll',
											e.onscroll,
											!0
										),
									((e.opts || e.canPan) &&
										(o.is(e.$stage) ||
											e.$stage.find(o).length)) ||
										(o.is('.modula-fancybox-image') &&
											t.preventDefault(),
										u.modulaFancybox.isMobile &&
											o.parents(
												'.modula-fancybox-caption'
											).length)) &&
									((e.isScrollable = f(o) || f(o.parent())),
									(u.modulaFancybox.isMobile &&
										e.isScrollable) ||
										t.preventDefault(),
									(1 !== e.startPoints.length &&
										!a.hasError) ||
										(e.canPan
											? (u.modulaFancybox.stop(
													e.$content
											  ),
											  (e.isPanning = !0))
											: (e.isSwiping = !0),
										e.$container.addClass(
											'modula-fancybox-is-grabbing'
										)),
									2 === e.startPoints.length) &&
									'image' === a.type &&
									(a.isLoaded || a.$ghost) &&
									((e.canTap = !1),
									(e.isSwiping = !1),
									(e.isPanning = !1),
									(e.isZooming = !0),
									u.modulaFancybox.stop(e.$content),
									(e.centerPointStartX =
										0.5 *
											(e.startPoints[0].x +
												e.startPoints[1].x) -
										u(d).scrollLeft()),
									(e.centerPointStartY =
										0.5 *
											(e.startPoints[0].y +
												e.startPoints[1].y) -
										u(d).scrollTop()),
									(e.percentageOfImageAtPinchPointX =
										(e.centerPointStartX -
											e.contentStartPos.left) /
										e.contentStartPos.width),
									(e.percentageOfImageAtPinchPointY =
										(e.centerPointStartY -
											e.contentStartPos.top) /
										e.contentStartPos.height),
									(e.startDistanceBetweenFingers = h(
										e.startPoints[0],
										e.startPoints[1]
									)))));
			}),
			(o.prototype.onscroll = function (t) {
				(this.isScrolling = !0),
					l.removeEventListener('scroll', this.onscroll, !0);
			}),
			(o.prototype.ontouchmove = function (t) {
				var e = this;
				void 0 !== t.originalEvent.buttons &&
				0 === t.originalEvent.buttons
					? e.ontouchend(t)
					: e.isScrolling
					? (e.canTap = !1)
					: ((e.newPoints = p(t)),
					  (e.opts || e.canPan) &&
							e.newPoints.length &&
							e.newPoints.length &&
							((e.isSwiping && !0 === e.isSwiping) ||
								t.preventDefault(),
							(e.distanceX = h(
								e.newPoints[0],
								e.startPoints[0],
								'x'
							)),
							(e.distanceY = h(
								e.newPoints[0],
								e.startPoints[0],
								'y'
							)),
							(e.distance = h(e.newPoints[0], e.startPoints[0])),
							0 < e.distance) &&
							(e.isSwiping
								? e.onSwipe(t)
								: e.isPanning
								? e.onPan()
								: e.isZooming && e.onZoom()));
			}),
			(o.prototype.onSwipe = function (t) {
				var e,
					a = this,
					i = a.instance,
					o = a.isSwiping,
					n = a.sliderStartPos.left || 0;
				if (!0 === o) {
					if (10 < Math.abs(a.distance)) {
						if (
							((a.canTap = !1),
							i.group.length < 2 && a.opts.vertical
								? (a.isSwiping = 'y')
								: i.isDragging ||
								  !1 === a.opts.vertical ||
								  ('auto' === a.opts.vertical &&
										800 < u(d).width())
								? (a.isSwiping = 'x')
								: ((e = Math.abs(
										(180 *
											Math.atan2(
												a.distanceY,
												a.distanceX
											)) /
											Math.PI
								  )),
								  (a.isSwiping =
										45 < e && e < 135 ? 'y' : 'x')),
							'y' === a.isSwiping &&
								u.modulaFancybox.isMobile &&
								a.isScrollable)
						)
							return void (a.isScrolling = !0);
						(i.isDragging = a.isSwiping),
							(a.startPoints = a.newPoints),
							u.each(i.slides, function (t, e) {
								var o, n;
								u.modulaFancybox.stop(e.$slide),
									(o = u.modulaFancybox.getTranslate(
										e.$slide
									)),
									(n = u.modulaFancybox.getTranslate(
										i.$refs.stage
									)),
									e.$slide
										.css({
											transform: '',
											opacity: '',
											'transition-duration': '',
										})
										.removeClass('modula-fancybox-animated')
										.removeClass(function (t, e) {
											return (
												e.match(
													/(^|\s)modula-fancybox-fx-\S+/g
												) || []
											).join(' ');
										}),
									e.pos === i.current.pos &&
										((a.sliderStartPos.top = o.top - n.top),
										(a.sliderStartPos.left =
											o.left - n.left)),
									u.modulaFancybox.setTranslate(e.$slide, {
										top: o.top - n.top,
										left: o.left - n.left,
									});
							}),
							i.SlideShow &&
								i.SlideShow.isActive &&
								i.SlideShow.stop();
					}
				} else
					'x' == o &&
						(0 < a.distanceX &&
						(a.instance.group.length < 2 ||
							(0 === a.instance.current.index &&
								!a.instance.current.opts.loop))
							? (n += Math.pow(a.distanceX, 0.8))
							: a.distanceX < 0 &&
							  (a.instance.group.length < 2 ||
									(a.instance.current.index ===
										a.instance.group.length - 1 &&
										!a.instance.current.opts.loop))
							? (n -= Math.pow(-a.distanceX, 0.8))
							: (n += a.distanceX)),
						(a.sliderLastPos = {
							top:
								'x' == o
									? 0
									: a.sliderStartPos.top + a.distanceY,
							left: n,
						}),
						a.requestId && (g(a.requestId), (a.requestId = null)),
						(a.requestId = m(function () {
							a.sliderLastPos &&
								(u.each(a.instance.slides, function (t, e) {
									var o = e.pos - a.instance.currPos;
									u.modulaFancybox.setTranslate(e.$slide, {
										top: a.sliderLastPos.top,
										left:
											a.sliderLastPos.left +
											o * a.canvasWidth +
											o * e.opts.gutter,
									});
								}),
								a.$container.addClass(
									'modula-fancybox-is-sliding'
								));
						}));
			}),
			(o.prototype.onPan = function () {
				var t = this;
				h(t.newPoints[0], t.realPoints[0]) <
				(u.modulaFancybox.isMobile ? 10 : 5)
					? (t.startPoints = t.newPoints)
					: ((t.canTap = !1),
					  (t.contentLastPos = t.limitMovement()),
					  t.requestId && g(t.requestId),
					  (t.requestId = m(function () {
							u.modulaFancybox.setTranslate(
								t.$content,
								t.contentLastPos
							);
					  })));
			}),
			(o.prototype.limitMovement = function () {
				var t = this,
					e = t.canvasWidth,
					o = t.canvasHeight,
					n = t.distanceX,
					a = t.distanceY,
					t = t.contentStartPos,
					i = t.left,
					s = t.top,
					r = t.width,
					t = t.height,
					l = e < r ? i + n : i,
					c = s + a,
					d = Math.max(0, 0.5 * e - 0.5 * r),
					u = Math.max(0, 0.5 * o - 0.5 * t),
					e = Math.min(e - r, 0.5 * e - 0.5 * r),
					r = Math.min(o - t, 0.5 * o - 0.5 * t);
				return (
					0 < n &&
						d < l &&
						(l = d - 1 + Math.pow(-d + i + n, 0.8) || 0),
					n < 0 &&
						l < e &&
						(l = e + 1 - Math.pow(e - i - n, 0.8) || 0),
					0 < a &&
						u < c &&
						(c = u - 1 + Math.pow(-u + s + a, 0.8) || 0),
					{
						top: (c =
							a < 0 && c < r
								? r + 1 - Math.pow(r - s - a, 0.8) || 0
								: c),
						left: l,
					}
				);
			}),
			(o.prototype.limitPosition = function (t, e, o, n) {
				var a = this.canvasWidth,
					i = this.canvasHeight;
				return (
					(t =
						a < o
							? (t = 0 < t ? 0 : t) < a - o
								? a - o
								: t
							: Math.max(0, a / 2 - o / 2)),
					{
						top: (e =
							i < n
								? (e = 0 < e ? 0 : e) < i - n
									? i - n
									: e
								: Math.max(0, i / 2 - n / 2)),
						left: t,
					}
				);
			}),
			(o.prototype.onZoom = function () {
				var t = this,
					e = t.contentStartPos,
					o = e.width,
					n = e.height,
					a = e.left,
					e = e.top,
					i =
						h(t.newPoints[0], t.newPoints[1]) /
						t.startDistanceBetweenFingers,
					s = Math.floor(o * i),
					r = Math.floor(n * i),
					o = (o - s) * t.percentageOfImageAtPinchPointX,
					n = (n - r) * t.percentageOfImageAtPinchPointY,
					l =
						(t.newPoints[0].x + t.newPoints[1].x) / 2 -
						u(d).scrollLeft(),
					c =
						(t.newPoints[0].y + t.newPoints[1].y) / 2 -
						u(d).scrollTop(),
					l = l - t.centerPointStartX,
					e = {
						top: e + (n + (c - t.centerPointStartY)),
						left: a + (o + l),
						scaleX: i,
						scaleY: i,
					};
				(t.canTap = !1),
					(t.newWidth = s),
					(t.newHeight = r),
					(t.contentLastPos = e),
					t.requestId && g(t.requestId),
					(t.requestId = m(function () {
						u.modulaFancybox.setTranslate(
							t.$content,
							t.contentLastPos
						);
					}));
			}),
			(o.prototype.ontouchend = function (t) {
				var e = this,
					o = e.isSwiping,
					n = e.isPanning,
					a = e.isZooming,
					i = e.isScrolling;
				if (
					((e.endPoints = p(t)),
					(e.dMs = Math.max(new Date().getTime() - e.startTime, 1)),
					e.$container.removeClass('modula-fancybox-is-grabbing'),
					u(l).off('.fb.touch'),
					l.removeEventListener('scroll', e.onscroll, !0),
					e.requestId && (g(e.requestId), (e.requestId = null)),
					(e.isSwiping = !1),
					(e.isPanning = !1),
					(e.isZooming = !1),
					(e.isScrolling = !1),
					(e.instance.isDragging = !1),
					e.canTap)
				)
					return e.onTap(t);
				(e.speed = 100),
					(e.velocityX = (e.distanceX / e.dMs) * 0.5),
					(e.velocityY = (e.distanceY / e.dMs) * 0.5),
					n
						? e.endPanning()
						: a
						? e.endZooming()
						: e.endSwiping(o, i);
			}),
			(o.prototype.endSwiping = function (t, e) {
				var o = this,
					n = !1,
					a = o.instance.group.length,
					i = Math.abs(o.distanceX),
					a =
						'x' == t &&
						1 < a &&
						((130 < o.dMs && 10 < i) || 50 < i);
				(o.sliderLastPos = null),
					'y' == t && !e && 50 < Math.abs(o.distanceY)
						? (u.modulaFancybox.animate(
								o.instance.current.$slide,
								{
									top:
										o.sliderStartPos.top +
										o.distanceY +
										150 * o.velocityY,
									opacity: 0,
								},
								200
						  ),
						  (n = o.instance.close(!0, 250)))
						: a && 0 < o.distanceX
						? (n = o.instance.previous(300))
						: a && o.distanceX < 0 && (n = o.instance.next(300)),
					!1 !== n ||
						('x' != t && 'y' != t) ||
						o.instance.centerSlide(200),
					o.$container.removeClass('modula-fancybox-is-sliding');
			}),
			(o.prototype.endPanning = function () {
				var t,
					e,
					o = this;
				o.contentLastPos &&
					((t =
						!1 === o.opts.momentum || 350 < o.dMs
							? ((e = o.contentLastPos.left),
							  o.contentLastPos.top)
							: ((e = o.contentLastPos.left + 500 * o.velocityX),
							  o.contentLastPos.top + 500 * o.velocityY)),
					((e = o.limitPosition(
						e,
						t,
						o.contentStartPos.width,
						o.contentStartPos.height
					)).width = o.contentStartPos.width),
					(e.height = o.contentStartPos.height),
					u.modulaFancybox.animate(o.$content, e, 366));
			}),
			(o.prototype.endZooming = function () {
				var t,
					e,
					o = this,
					n = o.instance.current,
					a = o.newWidth,
					i = o.newHeight;
				o.contentLastPos &&
					((t = o.contentLastPos.left),
					(e = o.contentLastPos.top),
					u.modulaFancybox.setTranslate(o.$content, {
						top: e,
						left: t,
						width: a,
						height: i,
						scaleX: 1,
						scaleY: 1,
					}),
					a < o.canvasWidth && i < o.canvasHeight
						? o.instance.scaleToFit(150)
						: a > n.width || i > n.height
						? o.instance.scaleToActual(
								o.centerPointStartX,
								o.centerPointStartY,
								150
						  )
						: ((n = o.limitPosition(t, e, a, i)),
						  u.modulaFancybox.animate(o.$content, n, 150)));
			}),
			(o.prototype.onTap = function (e) {
				function t(t) {
					if (
						((t = s.opts[t]),
						(t = u.isFunction(t) ? t.apply(i, [s, e]) : t))
					)
						switch (t) {
							case 'close':
								i.close(n.startEvent);
								break;
							case 'toggleControls':
								i.toggleControls();
								break;
							case 'next':
								i.next();
								break;
							case 'nextOrClose':
								1 < i.group.length
									? i.next()
									: i.close(n.startEvent);
								break;
							case 'zoom':
								'image' == s.type &&
									(s.isLoaded || s.$ghost) &&
									(i.canPan()
										? i.scaleToFit()
										: i.isScaledDown()
										? i.scaleToActual(l, c)
										: i.group.length < 2 &&
										  i.close(n.startEvent));
						}
				}
				var o,
					n = this,
					a = u(e.target),
					i = n.instance,
					s = i.current,
					r = (e && p(e)) || n.startPoints,
					l = r[0] ? r[0].x - u(d).scrollLeft() - n.stagePos.left : 0,
					c = r[0] ? r[0].y - u(d).scrollTop() - n.stagePos.top : 0;
				if (
					(!e.originalEvent || 2 != e.originalEvent.button) &&
					(a.is('img') || !(l > a[0].clientWidth + a.offset().left))
				) {
					if (
						a.is(
							'.modula-fancybox-bg,.modula-fancybox-inner,.modula-fancybox-outer,.modula-fancybox-container'
						)
					)
						o = 'Outside';
					else if (a.is('.modula-fancybox-slide')) o = 'Slide';
					else {
						if (
							!i.current.$content ||
							!i.current.$content.find(a).addBack().filter(a)
								.length
						)
							return;
						o = 'Content';
					}
					if (n.tapped) {
						if (
							(clearTimeout(n.tapped),
							(n.tapped = null),
							50 < Math.abs(l - n.tapX) ||
								50 < Math.abs(c - n.tapY))
						)
							return this;
						t('dblclick' + o);
					} else
						(n.tapX = l),
							(n.tapY = c),
							s.opts['dblclick' + o] &&
							s.opts['dblclick' + o] !== s.opts['click' + o]
								? (n.tapped = setTimeout(function () {
										(n.tapped = null),
											i.isAnimating || t('click' + o);
								  }, 500))
								: t('click' + o);
					return this;
				}
			}),
			u(l)
				.on('onActivate.fb', function (t, e) {
					e && !e.Guestures && (e.Guestures = new o(e));
				})
				.on('beforeClose.fb', function (t, e) {
					e && e.Guestures && e.Guestures.destroy();
				});
	})(window, document, jQuery),
	(function (i, s) {
		'use strict';
		s.extend(!0, s.modulaFancybox.defaults, {
			btnTpl: {
				slideShow:
					'<button data-fancybox-play class="modula-fancybox-button modula-fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
			},
			slideShow: { autoStart: !1, speed: 3e3, progress: !0 },
		});
		function o(t) {
			(this.instance = t), this.init();
		}
		s.extend(o.prototype, {
			timer: null,
			isActive: !1,
			$button: null,
			init: function () {
				var t = this,
					e = t.instance,
					o = e.group[e.currIndex].opts.slideShow;
				(t.$button = e.$refs.toolbar
					.find('[data-fancybox-play]')
					.on('click', function () {
						t.toggle();
					})),
					e.group.length < 2 || !o
						? t.$button.hide()
						: o.progress &&
						  (t.$progress = s(
								'<div class="modula-fancybox-progress"></div>'
						  ).appendTo(e.$refs.inner));
			},
			set: function (t) {
				var e = this,
					o = e.instance,
					n = o.current;
				n &&
				(!0 === t || n.opts.loop || o.currIndex < o.group.length - 1)
					? e.isActive &&
					  'video' !== n.contentType &&
					  (e.$progress &&
							s.modulaFancybox.animate(
								e.$progress.show(),
								{ scaleX: 1 },
								n.opts.slideShow.speed
							),
					  (e.timer = setTimeout(function () {
							o.current.opts.loop ||
							o.current.index != o.group.length - 1
								? o.next()
								: o.jumpTo(0);
					  }, n.opts.slideShow.speed)))
					: (e.stop(), (o.idleSecondsCounter = 0), o.showControls());
			},
			clear: function () {
				clearTimeout(this.timer),
					(this.timer = null),
					this.$progress && this.$progress.removeAttr('style').hide();
			},
			start: function () {
				var t = this,
					e = t.instance.current;
				e &&
					(t.$button
						.attr(
							'title',
							(e.opts.i18n[e.opts.lang] || e.opts.i18n.en)
								.PLAY_STOP
						)
						.removeClass('modula-fancybox-button--play')
						.addClass('modula-fancybox-button--pause'),
					(t.isActive = !0),
					e.isComplete && t.set(!0),
					t.instance.trigger('onSlideShowChange', !0));
			},
			stop: function () {
				var t = this,
					e = t.instance.current;
				t.clear(),
					t.$button
						.attr(
							'title',
							(e.opts.i18n[e.opts.lang] || e.opts.i18n.en)
								.PLAY_START
						)
						.removeClass('modula-fancybox-button--pause')
						.addClass('modula-fancybox-button--play'),
					(t.isActive = !1),
					t.instance.trigger('onSlideShowChange', !1),
					t.$progress && t.$progress.removeAttr('style').hide();
			},
			toggle: function () {
				this.isActive ? this.stop() : this.start();
			},
		}),
			s(i).on({
				'onInit.fb': function (t, e) {
					e && !e.SlideShow && (e.SlideShow = new o(e));
				},
				'beforeShow.fb': function (t, e, o, n) {
					e = e && e.SlideShow;
					n
						? e && o.opts.slideShow.autoStart && e.start()
						: e && e.isActive && e.clear();
				},
				'afterShow.fb': function (t, e, o) {
					e = e && e.SlideShow;
					e && e.isActive && e.set();
				},
				'afterKeydown.fb': function (t, e, o, n, a) {
					e = e && e.SlideShow;
					!e ||
						!o.opts.slideShow ||
						(80 !== a && 32 !== a) ||
						s(i.activeElement).is('button,a,input') ||
						(n.preventDefault(), e.toggle());
				},
				'beforeClose.fb onDeactivate.fb': function (t, e) {
					e = e && e.SlideShow;
					e && e.stop();
				},
			}),
			s(i).on('visibilitychange', function () {
				var t = s.modulaFancybox.getInstance(),
					t = t && t.SlideShow;
				t && t.isActive && (i.hidden ? t.clear() : t.set());
			});
	})(document, jQuery),
	(function (i, o) {
		'use strict';
		var n,
			a = (function () {
				for (
					var t = [
							[
								'requestFullscreen',
								'exitFullscreen',
								'fullscreenElement',
								'fullscreenEnabled',
								'fullscreenchange',
								'fullscreenerror',
							],
							[
								'webkitRequestFullscreen',
								'webkitExitFullscreen',
								'webkitFullscreenElement',
								'webkitFullscreenEnabled',
								'webkitfullscreenchange',
								'webkitfullscreenerror',
							],
							[
								'webkitRequestFullScreen',
								'webkitCancelFullScreen',
								'webkitCurrentFullScreenElement',
								'webkitCancelFullScreen',
								'webkitfullscreenchange',
								'webkitfullscreenerror',
							],
							[
								'mozRequestFullScreen',
								'mozCancelFullScreen',
								'mozFullScreenElement',
								'mozFullScreenEnabled',
								'mozfullscreenchange',
								'mozfullscreenerror',
							],
							[
								'msRequestFullscreen',
								'msExitFullscreen',
								'msFullscreenElement',
								'msFullscreenEnabled',
								'MSFullscreenChange',
								'MSFullscreenError',
							],
						],
						e = {},
						o = 0;
					o < t.length;
					o++
				) {
					var n = t[o];
					if (n && n[1] in i) {
						for (var a = 0; a < n.length; a++) e[t[0][a]] = n[a];
						return e;
					}
				}
				return !1;
			})();
		a &&
			((n = {
				request: function (t) {
					(t = t || i.documentElement)[a.requestFullscreen](
						t.ALLOW_KEYBOARD_INPUT
					);
				},
				exit: function () {
					i[a.exitFullscreen]();
				},
				toggle: function (t) {
					(t = t || i.documentElement),
						this.isFullscreen() ? this.exit() : this.request(t);
				},
				isFullscreen: function () {
					return Boolean(i[a.fullscreenElement]);
				},
				enabled: function () {
					return Boolean(i[a.fullscreenEnabled]);
				},
			}),
			o.extend(!0, o.modulaFancybox.defaults, {
				btnTpl: {
					fullScreen:
						'<button data-fancybox-fullscreen class="modula-fancybox-button modula-fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
				},
				fullScreen: { autoStart: !1 },
			}),
			o(i).on(a.fullscreenchange, function () {
				var t = n.isFullscreen(),
					e = o.modulaFancybox.getInstance();
				e &&
					(e.current &&
						'image' === e.current.type &&
						e.isAnimating &&
						((e.isAnimating = !1),
						e.update(!0, !0, 0),
						e.isComplete || e.complete()),
					e.trigger('onFullscreenChange', t),
					e.$refs.container.toggleClass(
						'modula-fancybox-is-fullscreen',
						t
					),
					e.$refs.toolbar
						.find('[data-fancybox-fullscreen]')
						.toggleClass('modula-fancybox-button--fsenter', !t)
						.toggleClass('modula-fancybox-button--fsexit', t));
			})),
			o(i).on({
				'onInit.fb': function (t, e) {
					a
						? e && e.group[e.currIndex].opts.fullScreen
							? (e.$refs.container.on(
									'click.fb-fullscreen',
									'[data-fancybox-fullscreen]',
									function (t) {
										t.stopPropagation(),
											t.preventDefault(),
											n.toggle();
									}
							  ),
							  e.opts.fullScreen &&
									!0 === e.opts.fullScreen.autoStart &&
									n.request(),
							  (e.FullScreen = n))
							: e &&
							  e.$refs.toolbar
									.find('[data-fancybox-fullscreen]')
									.hide()
						: e.$refs.toolbar
								.find('[data-fancybox-fullscreen]')
								.remove();
				},
				'afterKeydown.fb': function (t, e, o, n, a) {
					e &&
						e.FullScreen &&
						70 === a &&
						(n.preventDefault(), e.FullScreen.toggle());
				},
				'beforeClose.fb': function (t, e) {
					e &&
						e.FullScreen &&
						e.$refs.container.hasClass(
							'modula-fancybox-is-fullscreen'
						) &&
						n.exit();
				},
			});
	})(document, jQuery),
	(function (t, i) {
		'use strict';
		function o(t) {
			this.init(t);
		}
		var s = 'modula-fancybox-thumbs',
			r = s + '-active';
		i.modulaFancybox.defaults = i.extend(
			!0,
			{
				btnTpl: {
					thumbs: '<button data-fancybox-thumbs class="modula-fancybox-button modula-fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
				},
				thumbs: {
					autoStart: !1,
					hideOnClose: !0,
					parentEl: '.modula-fancybox-container',
					axis: 'y',
				},
			},
			i.modulaFancybox.defaults
		);
		i.extend(o.prototype, {
			$button: null,
			$grid: null,
			$list: null,
			isVisible: !1,
			isActive: !1,
			init: function (t) {
				var e = this,
					o = t.group,
					n = 0;
				(e.instance = t),
					(e.opts = o[t.currIndex].opts.thumbs),
					((t.Thumbs = e).$button = t.$refs.toolbar.find(
						'[data-fancybox-thumbs]'
					));
				for (
					var a = 0, i = o.length;
					a < i && (o[a].thumb && n++, !(1 < n));
					a++
				);
				1 < n && e.opts
					? (e.$button.removeAttr('style').on('click', function () {
							e.toggle();
					  }),
					  (e.isActive = !0))
					: e.$button.hide();
			},
			create: function () {
				var o,
					t = this,
					e = t.instance,
					n = t.opts.parentEl,
					a = [];
				t.$grid ||
					((t.$grid = i(
						'<div class="' +
							s +
							' ' +
							s +
							'-' +
							t.opts.axis +
							'"></div>'
					).appendTo(e.$refs.container.find(n).addBack().filter(n))),
					t.$grid.on('click', 'a', function () {
						e.jumpTo(i(this).attr('data-index'));
					})),
					t.$list ||
						(t.$list = i('<div class="' + s + '__list">').appendTo(
							t.$grid
						)),
					i.each(e.group, function (t, e) {
						(o = e.thumb) || 'image' !== e.type || (o = e.src);
						e = (e = e.opts.caption.replace(
							/<p>|<\/p>/gim,
							''
						)).replace(/[\u00A0-\u9999<>\&]/g, function (t) {
							return '&#' + t.charCodeAt(0) + ';';
						});
						a.push(
							'<a href="javascript:;" role="button" aria-label="Click to show image titled ' +
								e +
								'" tabindex="0" data-index="' +
								t +
								'"' +
								(o && o.length
									? ' style="background-image:url(' + o + ')"'
									: 'class="modula-fancybox-thumbs-missing"') +
								'></a>'
						);
					}),
					(t.$list[0].innerHTML = a.join('')),
					'x' === t.opts.axis &&
						t.$list.width(
							parseInt(t.$grid.css('padding-right'), 10) +
								e.group.length *
									t.$list.children().eq(0).outerWidth(!0)
						);
			},
			focus: function (t) {
				var e,
					o,
					n = this,
					a = n.$list,
					i = n.$grid;
				n.instance.current &&
					((o = (e = a
						.children()
						.removeClass(r)
						.filter(
							'[data-index="' + n.instance.current.index + '"]'
						)
						.addClass(r)).position()),
					'y' === n.opts.axis &&
					(o.top < 0 || o.top > a.height() - e.outerHeight())
						? a
								.stop()
								.animate(
									{ scrollTop: a.scrollTop() + o.top },
									t
								)
						: 'x' === n.opts.axis &&
						  (o.left < i.scrollLeft() ||
								o.left >
									i.scrollLeft() +
										(i.width() - e.outerWidth())) &&
						  a.parent().stop().animate({ scrollLeft: o.left }, t));
			},
			update: function () {
				var t = this;
				t.instance.$refs.container.toggleClass(
					'modula-fancybox-show-thumbs',
					this.isVisible
				),
					t.isVisible
						? (t.$grid || t.create(),
						  t.instance.trigger('onThumbsShow'),
						  t.focus(0))
						: t.$grid && t.instance.trigger('onThumbsHide'),
					t.instance.update();
			},
			hide: function () {
				(this.isVisible = !1), this.update();
			},
			show: function () {
				(this.isVisible = !0), this.update();
			},
			toggle: function () {
				(this.isVisible = !this.isVisible), this.update();
			},
		}),
			i(t).on({
				'onInit.fb': function (t, e) {
					e &&
						!e.Thumbs &&
						(e = new o(e)).isActive &&
						!0 === e.opts.autoStart &&
						e.show();
				},
				'beforeShow.fb': function (t, e, o, n) {
					e = e && e.Thumbs;
					e && e.isVisible && e.focus(n ? 0 : 250);
				},
				'afterKeydown.fb': function (t, e, o, n, a) {
					e = e && e.Thumbs;
					e &&
						e.isActive &&
						71 === a &&
						(n.preventDefault(), e.toggle());
				},
				'beforeClose.fb': function (t, e) {
					e = e && e.Thumbs;
					e &&
						e.isVisible &&
						!1 !== e.opts.hideOnClose &&
						e.$grid.hide();
				},
			});
	})(document, jQuery),
	(function (t, o) {
		'use strict';
		o.extend(!0, o.modulaFancybox.defaults, {
			btnTpl: {
				share: '<button data-fancybox-share class="modula-fancybox-button modula-fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
			},
			share: {
				url: function (t, e) {
					return (
						(!t.currentHash &&
							'inline' !== e.type &&
							'html' !== e.type &&
							(e.origSrc || e.src)) ||
						window.location
					);
				},
			},
		}),
			o(t).on('click', '[data-fancybox-share]', function () {
				var a,
					e,
					i = o.modulaFancybox.getInstance(),
					s = i.current || null,
					r =
						"<div class='modula-fancybox-share'><h1>{{SHARE}}</h1><p>";
				s &&
					('function' === o.type(s.opts.share.url) &&
						(a = s.opts.share.url.apply(s, [i, s])),
					o.each(s.opts.modulaShare, function (t, e) {
						var o = (
								s.opts.lightboxEmailMessage.length
									? s.opts.lightboxEmailMessage
									: 'Here is the link to the image : %%image_link%% and this is the link to the gallery : %%gallery_link%%'
							)
								.replace(
									/\%%gallery_link%%/g,
									window.location.href
								)
								.replace(/\%%image_link%%/g, s.src),
							n =
								null != jQuery(s.$image).attr('title')
									? jQuery(s.$image).attr('title')
									: '';
						'' == n &&
							i.$caption &&
							void 0 !== i.$caption.text &&
							(n = i.$caption.text()),
							(r += s.opts.shareBtnTpl[e]
								.replace(
									/\{\{media\}\}/g,
									'image' === s.type
										? encodeURIComponent(s.src)
										: ''
								)
								.replace(
									/\{\{modulaShareUrl\}\}/g,
									encodeURIComponent(a)
								)
								.replace(
									/\{\{descr\}\}/g,
									encodeURIComponent(n)
								)
								.replace(
									/\{\{subject\}\}/g,
									encodeURIComponent(
										s.opts.lightboxEmailSubject
									)
								)
								.replace(
									/\{\{emailMessage\}\}/g,
									encodeURIComponent(o)
								));
					}),
					(r = (r +=
						"</p><p><input class='modula-fancybox-share__input' type='text' value='{{url_raw}}' /></p></div>").replace(
						/\{\{url_raw\}\}/g,
						((e = {
							'&': '&amp;',
							'<': '&lt;',
							'>': '&gt;',
							'"': '&quot;',
							"'": '&#39;',
							'/': '&#x2F;',
							'`': '&#x60;',
							'=': '&#x3D;',
						}),
						String(a).replace(/[&<>"'`=\/]/g, function (t) {
							return e[t];
						}))
					)),
					o.modulaFancybox.open({
						src: i.translate(i, r),
						type: 'html',
						opts: {
							touch: !1,
							animationEffect: !1,
							afterLoad: function (t, e) {
								i.$refs.container.one(
									'beforeClose.fb',
									function () {
										t.close(null, 0);
									}
								),
									e.$content
										.find('.modula-fancybox-share__button')
										.click(function () {
											return (
												window.open(
													this.href,
													'Share',
													'width=550, height=450'
												),
												!1
											);
										});
							},
							mobile: { autoFocus: !1 },
						},
					}));
			});
	})(document, jQuery),
	(function (i, s, n) {
		'use strict';
		function a() {
			var t = i.location.hash.substr(1),
				e = t.split('-'),
				o =
					(1 < e.length &&
						/^\+?\d+$/.test(e[e.length - 1]) &&
						parseInt(e.pop(-1), 10)) ||
					1;
			return { hash: t, index: o < 1 ? 1 : o, gallery: e.join('-') };
		}
		function e(t) {
			'' !== t.gallery &&
				n("[data-fancybox='" + n.escapeSelector(t.gallery) + "']")
					.eq(t.index - 1)
					.focus()
					.trigger('click.fb-start');
		}
		function r(t) {
			return (
				!!t &&
				'' !==
					(t =
						(t = (t.current || t).opts).hash ||
						(t.$orig
							? t.$orig.data('fancybox') ||
							  t.$orig.data('fancybox-trigger')
							: '')) &&
				t
			);
		}
		n.escapeSelector ||
			(n.escapeSelector = function (t) {
				return (t + '').replace(
					/([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
					function (t, e) {
						return e
							? '\0' === t
								? '�'
								: t.slice(0, -1) +
								  '\\' +
								  t.charCodeAt(t.length - 1).toString(16) +
								  ' '
							: '\\' + t;
					}
				);
			}),
			n(function () {
				!1 !== n.modulaFancybox.defaults.hash &&
					(n(s).on({
						'onInit.fb': function (t, e) {
							!1 !== e.group[e.currIndex].opts.hash &&
								(a(), r(e));
						},
						'beforeShow.fb': function (t, e, o, n) {
							var a;
							o &&
								!1 !== o.opts.hash &&
								(a = r(e)) &&
								((e.currentHash =
									a +
									(1 < e.group.length
										? '-' + o.opts.image_id
										: '')),
								i.location.hash !== '#' + e.currentHash) &&
								(n &&
									!e.origHash &&
									(e.origHash = i.location.hash),
								e.hashTimer && clearTimeout(e.hashTimer),
								(e.hashTimer = setTimeout(function () {
									'replaceState' in i.history
										? (i.history[
												n ? 'pushState' : 'replaceState'
										  ](
												{},
												s.title,
												i.location.pathname +
													i.location.search +
													'#' +
													e.currentHash
										  ),
										  n && (e.hasCreatedHistory = !0))
										: (i.location.hash = e.currentHash),
										(e.hashTimer = null);
								}, 300)));
						},
						'beforeClose.fb': function (t, e, o) {
							o &&
								!1 !== o.opts.hash &&
								(clearTimeout(e.hashTimer),
								e.currentHash && e.hasCreatedHistory
									? i.history.back()
									: e.currentHash &&
									  ('replaceState' in i.history
											? i.history.replaceState(
													{},
													s.title,
													i.location.pathname +
														i.location.search +
														(e.origHash || '')
											  )
											: (i.location.hash = e.origHash)),
								(e.currentHash = null));
						},
					}),
					n(i).on('hashchange.fb', function () {
						var t = a(),
							o = null;
						n.each(
							n('.modula-fancybox-container').get().reverse(),
							function (t, e) {
								e = n(e).data('modulaFancyBox');
								if (e && e.currentHash) return (o = e), !1;
							}
						),
							o
								? o.currentHash === t.gallery + '-' + t.index ||
								  (1 === t.index &&
										o.currentHash == t.gallery) ||
								  ((o.currentHash = null), o.close())
								: '' !== t.gallery && e(t);
					}),
					setTimeout(function () {
						n.modulaFancybox.getInstance() || e(a());
					}, 50));
			});
	})(window, document, jQuery),
	(function (t, e) {
		'use strict';
		var a = new Date().getTime();
		e(t).on({
			'onInit.fb': function (t, n, e) {
				n.$refs.stage.on(
					'mousewheel DOMMouseScroll wheel MozMousePixelScroll',
					function (t) {
						var e = n.current,
							o = new Date().getTime();
						n.group.length < 2 ||
							!1 === e.opts.wheel ||
							('auto' === e.opts.wheel && 'image' !== e.type) ||
							(t.preventDefault(),
							t.stopPropagation(),
							e.$slide.hasClass('modula-fancybox-animated')) ||
							((t = t.originalEvent || t), o - a < 250) ||
							((a = o),
							n[
								(-t.deltaY ||
									-t.deltaX ||
									t.wheelDelta ||
									-t.detail) < 0
									? 'next'
									: 'previous'
							]());
					}
				);
			},
		});
	})(document, jQuery);
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
