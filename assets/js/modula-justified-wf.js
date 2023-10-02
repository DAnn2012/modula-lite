!(function (e) {
	'function' == typeof define && define.amd
		? define(['jquery'], e)
		: 'object' == typeof module && module.exports
		? (module.exports = function (t, i) {
				return (
					void 0 === i &&
						(i =
							'undefined' != typeof window
								? require('jquery')
								: require('jquery')(t)),
					e(i),
					i
				);
		  })
		: e(jQuery);
})(function (g) {
	function n(t, i) {
		(this.settings = i),
			this.checkSettings(),
			(this.imgAnalyzerTimeout = null),
			(this.entries = null),
			(this.buildingRow = {
				entriesBuff: [],
				width: 0,
				height: 0,
				aspectRatio: 0,
			}),
			(this.lastFetchedEntry = null),
			(this.lastAnalyzedIndex = -1),
			(this.yield = { every: 2, flushed: 0 }),
			(this.border = 0 <= i.border ? i.border : i.margins),
			(this.maxRowHeight = this.retrieveMaxRowHeight()),
			(this.suffixRanges = this.retrieveSuffixRanges()),
			(this.offY = this.border),
			(this.rows = 0),
			(this.spinner = {
				phase: 0,
				timeSlot: 150,
				$el: g(
					'<div class="jg-spinner"><span></span><span></span><span></span></div>'
				),
				intervalId: null,
			}),
			(this.scrollBarOn = !1),
			(this.checkWidthIntervalId = null),
			(this.galleryWidth = t.width()),
			(this.$gallery = t);
	}
	(n.prototype.getSuffix = function (t, i) {
		for (var e = i < t ? t : i, s = 0; s < this.suffixRanges.length; s++)
			if (e <= this.suffixRanges[s])
				return this.settings.sizeRangeSuffixes[this.suffixRanges[s]];
		return this.settings.sizeRangeSuffixes[this.suffixRanges[s - 1]];
	}),
		(n.prototype.removeSuffix = function (t, i) {
			return t.substring(0, t.length - i.length);
		}),
		(n.prototype.endsWith = function (t, i) {
			return -1 !== t.indexOf(i, t.length - i.length);
		}),
		(n.prototype.getUsedSuffix = function (t) {
			for (var i in this.settings.sizeRangeSuffixes)
				if (
					this.settings.sizeRangeSuffixes.hasOwnProperty(i) &&
					0 !== this.settings.sizeRangeSuffixes[i].length &&
					this.endsWith(t, this.settings.sizeRangeSuffixes[i])
				)
					return this.settings.sizeRangeSuffixes[i];
			return '';
		}),
		(n.prototype.newSrc = function (t, i, e, s) {
			var n;
			return (
				this.settings.thumbnailPath
					? (n = this.settings.thumbnailPath(t, i, e, s))
					: ((s =
							null !== (s = t.match(this.settings.extension))
								? s[0]
								: ''),
					  (n = t.replace(this.settings.extension, '')),
					  (n = this.removeSuffix(n, this.getUsedSuffix(n))),
					  (n += this.getSuffix(i, e) + s)),
				n
			);
		}),
		(n.prototype.showImg = function (t, i) {
			this.settings.cssAnimation
				? (t.addClass('jg-entry-visible'), i && i())
				: (t.stop().fadeTo(this.settings.imagesAnimationDuration, 1, i),
				  t
						.find(this.settings.imgSelector)
						.stop()
						.fadeTo(this.settings.imagesAnimationDuration, 1, i));
		}),
		(n.prototype.extractImgSrcFromImage = function (t) {
			var i = t.data('safe-src'),
				e = 'data-safe-src';
			return (
				void 0 === i && ((i = t.attr('src')), (e = 'src')),
				t.data('jg.originalSrc', i),
				t.data('jg.src', i),
				t.data('jg.originalSrcLoc', e),
				i
			);
		}),
		(n.prototype.imgFromEntry = function (t) {
			t = t.find(this.settings.imgSelector);
			return 0 === t.length ? null : t;
		}),
		(n.prototype.captionFromEntry = function (t) {
			t = t.find('> .jg-caption');
			return 0 === t.length ? null : t;
		}),
		(n.prototype.displayEntry = function (t, i, e, s, n, r) {
			t.width(s), t.height(r), t.css('top', e), t.css('left', i);
			var o,
				a,
				h = this.imgFromEntry(t);
			null !== h
				? (h.css('width', s),
				  h.css('height', n),
				  h.css('margin-left', -s / 2),
				  h.css('margin-top', -n / 2),
				  (o = h.data('jg.src')) &&
						((o = this.newSrc(o, s, n, h[0])),
						h.one('error', function () {
							this.resetImgSrc(h);
						}),
						(a = function () {
							h.attr('src', o);
						}),
						'skipped' === t.data('jg.loaded') && o
							? this.onImageEvent(
									o,
									function () {
										this.showImg(t, a),
											t.data('jg.loaded', !0);
									}.bind(this)
							  )
							: this.showImg(t, a)))
				: this.showImg(t),
				this.displayEntryCaption(t);
		}),
		(n.prototype.displayEntryCaption = function (t) {
			var i,
				e = this.imgFromEntry(t);
			null !== e && this.settings.captions
				? (null === (i = this.captionFromEntry(t)) &&
						((e = e.attr('alt')),
						this.isValidCaption(e) || (e = t.attr('title')),
						this.isValidCaption(e)) &&
						((i = g('<div class="jg-caption">' + e + '</div>')),
						t.append(i),
						t.data('jg.createdCaption', !0)),
				  null !== i &&
						(this.settings.cssAnimation ||
							i
								.stop()
								.fadeTo(
									0,
									this.settings.captionSettings
										.nonVisibleOpacity
								),
						this.addCaptionEventsHandlers(t)))
				: this.removeCaptionEventsHandlers(t);
		}),
		(n.prototype.isValidCaption = function (t) {
			return void 0 !== t && 0 < t.length;
		}),
		(n.prototype.onEntryMouseEnterForCaption = function (t) {
			t = this.captionFromEntry(g(t.currentTarget));
			this.settings.cssAnimation
				? t
						.addClass('jg-caption-visible')
						.removeClass('jg-caption-hidden')
				: t
						.stop()
						.fadeTo(
							this.settings.captionSettings.animationDuration,
							this.settings.captionSettings.visibleOpacity
						);
		}),
		(n.prototype.onEntryMouseLeaveForCaption = function (t) {
			t = this.captionFromEntry(g(t.currentTarget));
			this.settings.cssAnimation
				? t
						.removeClass('jg-caption-visible')
						.removeClass('jg-caption-hidden')
				: t
						.stop()
						.fadeTo(
							this.settings.captionSettings.animationDuration,
							this.settings.captionSettings.nonVisibleOpacity
						);
		}),
		(n.prototype.addCaptionEventsHandlers = function (t) {
			var i;
			void 0 === t.data('jg.captionMouseEvents') &&
				((i = {
					mouseenter: g.proxy(this.onEntryMouseEnterForCaption, this),
					mouseleave: g.proxy(this.onEntryMouseLeaveForCaption, this),
				}),
				t.on('mouseenter', void 0, void 0, i.mouseenter),
				t.on('mouseleave', void 0, void 0, i.mouseleave),
				t.data('jg.captionMouseEvents', i));
		}),
		(n.prototype.removeCaptionEventsHandlers = function (t) {
			var i = t.data('jg.captionMouseEvents');
			void 0 !== i &&
				(t.off('mouseenter', void 0, i.mouseenter),
				t.off('mouseleave', void 0, i.mouseleave),
				t.removeData('jg.captionMouseEvents'));
		}),
		(n.prototype.clearBuildingRow = function () {
			(this.buildingRow.entriesBuff = []),
				(this.buildingRow.aspectRatio = 0),
				(this.buildingRow.width = 0);
		}),
		(n.prototype.prepareBuildingRow = function (t, i) {
			var e,
				s,
				n,
				r,
				o = !0,
				a = 0,
				h =
					this.galleryWidth -
					2 * this.border -
					(this.buildingRow.entriesBuff.length - 1) *
						this.settings.margins,
				g = h / this.buildingRow.aspectRatio,
				l = this.settings.rowHeight,
				u = this.buildingRow.width / h > this.settings.justifyThreshold;
			if (i || (t && 'hide' === this.settings.lastRow && !u)) {
				for (e = 0; e < this.buildingRow.entriesBuff.length; e++)
					(s = this.buildingRow.entriesBuff[e]),
						this.settings.cssAnimation
							? s.removeClass('jg-entry-visible')
							: (s.stop().fadeTo(0, 0.1),
							  s.find('> img, > a > img').fadeTo(0, 0));
				return -1;
			}
			for (
				t &&
					!u &&
					'justify' !== this.settings.lastRow &&
					'hide' !== this.settings.lastRow &&
					((o = !1), 0 < this.rows) &&
					(o =
						((l =
							(this.offY -
								this.border -
								this.settings.margins * this.rows) /
							this.rows) *
							this.buildingRow.aspectRatio) /
							h >
						this.settings.justifyThreshold),
					e = 0;
				e < this.buildingRow.entriesBuff.length;
				e++
			)
				(r =
					(s = this.buildingRow.entriesBuff[e]).data('jg.width') /
					s.data('jg.height')),
					(r = o
						? ((n =
								e === this.buildingRow.entriesBuff.length - 1
									? h
									: g * r),
						  g)
						: ((n = l * r), l)),
					(h -= Math.round(n)),
					s.data('jg.jwidth', Math.round(n)),
					s.data('jg.jheight', Math.ceil(r)),
					(0 === e || r < a) && (a = r);
			return (
				s.hasClass('effect-under') &&
					(a += jQuery(s).find('.modula-item-content').height()),
				(this.buildingRow.height = a),
				o
			);
		}),
		(n.prototype.flushRow = function (t, i) {
			var e,
				s = this.settings,
				n = this.border,
				r = this.prepareBuildingRow(t, i);
			if (i || (t && 'hide' === s.lastRow && -1 === r))
				this.clearBuildingRow();
			else {
				if (
					(this.maxRowHeight &&
						this.maxRowHeight < this.buildingRow.height &&
						(this.buildingRow.height = this.maxRowHeight),
					t && ('center' === s.lastRow || 'right' === s.lastRow))
				) {
					for (
						var o =
								this.galleryWidth -
								2 * this.border -
								(this.buildingRow.entriesBuff.length - 1) *
									s.margins,
							a = 0;
						a < this.buildingRow.entriesBuff.length;
						a++
					)
						o -= (e = this.buildingRow.entriesBuff[a]).data(
							'jg.jwidth'
						);
					'center' === s.lastRow
						? (n += Math.round(o / 2))
						: 'right' === s.lastRow && (n += o);
				}
				var h = this.buildingRow.entriesBuff.length - 1;
				for (a = 0; a <= h; a++)
					(e =
						this.buildingRow.entriesBuff[
							this.settings.rtl ? h - a : a
						]),
						this.displayEntry(
							e,
							n,
							this.offY,
							e.data('jg.jwidth'),
							e.data('jg.jheight'),
							this.buildingRow.height
						),
						(n += e.data('jg.jwidth') + s.margins);
				(this.galleryHeightToSet =
					this.offY + this.buildingRow.height + this.border),
					this.setGalleryTempHeight(
						this.galleryHeightToSet + this.getSpinnerHeight()
					),
					(!t || (this.buildingRow.height <= s.rowHeight && r)) &&
						((this.offY += this.buildingRow.height + s.margins),
						(this.rows += 1),
						this.clearBuildingRow(),
						this.settings.triggerEvent.call(this, 'jg.rowflush'));
			}
		});
	var i = 0;
	(n.prototype.rememberGalleryHeight = function () {
		(i = this.$gallery.height()), this.$gallery.height(i);
	}),
		(n.prototype.setGalleryTempHeight = function (t) {
			(i = Math.max(t, i)), this.$gallery.height(i);
		}),
		(n.prototype.setGalleryFinalHeight = function (t) {
			(i = t), this.$gallery.height(t);
		}),
		(n.prototype.checkWidth = function () {
			this.checkWidthIntervalId = setInterval(
				g.proxy(function () {
					var t;
					this.$gallery.is(':visible') &&
						((t = parseFloat(this.$gallery.width())),
						Math.abs(t - this.galleryWidth) >
							this.settings.refreshSensitivity) &&
						((this.galleryWidth = t),
						this.rewind(),
						this.rememberGalleryHeight(),
						this.startImgAnalyzer(!0));
				}, this),
				this.settings.refreshTime
			);
		}),
		(n.prototype.isSpinnerActive = function () {
			return null !== this.spinner.intervalId;
		}),
		(n.prototype.getSpinnerHeight = function () {
			return this.spinner.$el.innerHeight();
		}),
		(n.prototype.stopLoadingSpinnerAnimation = function () {
			clearInterval(this.spinner.intervalId),
				(this.spinner.intervalId = null),
				this.setGalleryTempHeight(
					this.$gallery.height() - this.getSpinnerHeight()
				),
				this.spinner.$el.detach();
		}),
		(n.prototype.startLoadingSpinnerAnimation = function () {
			var t = this.spinner,
				i = t.$el.find('span');
			clearInterval(t.intervalId),
				this.$gallery.append(t.$el),
				this.setGalleryTempHeight(
					this.offY +
						this.buildingRow.height +
						this.getSpinnerHeight()
				),
				(t.intervalId = setInterval(function () {
					t.phase < i.length
						? i.eq(t.phase).fadeTo(t.timeSlot, 1)
						: i.eq(t.phase - i.length).fadeTo(t.timeSlot, 0),
						(t.phase = (t.phase + 1) % (2 * i.length));
				}, t.timeSlot));
		}),
		(n.prototype.rewind = function () {
			(this.lastFetchedEntry = null),
				(this.lastAnalyzedIndex = -1),
				(this.offY = this.border),
				(this.rows = 0),
				this.clearBuildingRow();
		}),
		(n.prototype.getSelectorWithoutSpinner = function () {
			return this.settings.selector + ', div:not(.jg-spinner)';
		}),
		(n.prototype.getAllEntries = function () {
			var t = this.getSelectorWithoutSpinner();
			return this.$gallery.children(t).toArray();
		}),
		(n.prototype.updateEntries = function (t) {
			return (
				0 <
					(t =
						t && null != this.lastFetchedEntry
							? ((t = this.getSelectorWithoutSpinner()),
							  g(this.lastFetchedEntry).nextAll(t).toArray())
							: ((this.entries = []), this.getAllEntries()))
						.length &&
					(g.isFunction(this.settings.sort)
						? (t = this.sortArray(t))
						: this.settings.randomize && (t = this.shuffleArray(t)),
					(this.lastFetchedEntry = t[t.length - 1]),
					this.settings.filter
						? (t = this.filterArray(t))
						: this.resetFilters(t)),
				(this.entries = this.entries.concat(t)),
				!0
			);
		}),
		(n.prototype.insertToGallery = function (t) {
			var i = this;
			g.each(t, function () {
				g(this).appendTo(i.$gallery);
			});
		}),
		(n.prototype.shuffleArray = function (t) {
			for (var i, e, s = t.length - 1; 0 < s; s--)
				(i = Math.floor(Math.random() * (s + 1))),
					(e = t[s]),
					(t[s] = t[i]),
					(t[i] = e);
			return this.insertToGallery(t), t;
		}),
		(n.prototype.sortArray = function (t) {
			return t.sort(this.settings.sort), this.insertToGallery(t), t;
		}),
		(n.prototype.resetFilters = function (t) {
			for (var i = 0; i < t.length; i++)
				g(t[i]).removeClass('jg-filtered');
		}),
		(n.prototype.filterArray = function (t) {
			var i = this.settings;
			if ('string' === g.type(i.filter))
				return t.filter(function (t) {
					t = g(t);
					return t.is(i.filter)
						? (t.removeClass('jg-filtered'), !0)
						: (t.addClass('jg-filtered').removeClass('jg-visible'),
						  !1);
				});
			if (g.isFunction(i.filter)) {
				for (var e = t.filter(i.filter), s = 0; s < t.length; s++)
					-1 === e.indexOf(t[s])
						? g(t[s])
								.addClass('jg-filtered')
								.removeClass('jg-visible')
						: g(t[s]).removeClass('jg-filtered');
				return e;
			}
		}),
		(n.prototype.resetImgSrc = function (t) {
			'src' === t.data('jg.originalSrcLoc')
				? t.attr('src', t.data('jg.originalSrc'))
				: t.attr('src', '');
		}),
		(n.prototype.destroy = function () {
			clearInterval(this.checkWidthIntervalId),
				this.stopImgAnalyzerStarter(),
				g.each(
					this.getAllEntries(),
					g.proxy(function (t, i) {
						var i = g(i),
							e =
								(i.css('width', ''),
								i.css('height', ''),
								i.css('top', ''),
								i.css('left', ''),
								i.data('jg.loaded', void 0),
								i.removeClass(
									'jg-entry jg-filtered jg-entry-visible'
								),
								this.imgFromEntry(i)),
							e =
								(e &&
									(e.css('width', ''),
									e.css('height', ''),
									e.css('margin-left', ''),
									e.css('margin-top', ''),
									this.resetImgSrc(e),
									e.data('jg.originalSrc', void 0),
									e.data('jg.originalSrcLoc', void 0),
									e.data('jg.src', void 0)),
								this.removeCaptionEventsHandlers(i),
								this.captionFromEntry(i));
						i.data('jg.createdCaption')
							? (i.data('jg.createdCaption', void 0),
							  null !== e && e.remove())
							: null !== e && e.fadeTo(0, 1);
					}, this)
				),
				this.$gallery.css('height', ''),
				this.$gallery.removeClass('justified-gallery'),
				this.$gallery.data('jg.controller', void 0),
				this.settings.triggerEvent.call(this, 'jg.destroy');
		}),
		(n.prototype.analyzeImages = function (t) {
			for (
				var i = this.lastAnalyzedIndex + 1;
				i < this.entries.length;
				i++
			) {
				var e = g(this.entries[i]);
				if (
					!0 === e.data('jg.loaded') ||
					'skipped' === e.data('jg.loaded')
				) {
					var s =
							this.galleryWidth -
							2 * this.border -
							(this.buildingRow.entriesBuff.length - 1) *
								this.settings.margins,
						n = e.data('jg.width') / e.data('jg.height');
					if (
						(this.buildingRow.entriesBuff.push(e),
						(this.buildingRow.aspectRatio += n),
						(this.buildingRow.width += n * this.settings.rowHeight),
						(this.lastAnalyzedIndex = i),
						s / (this.buildingRow.aspectRatio + n) <
							this.settings.rowHeight &&
							(this.flushRow(
								!1,
								0 < this.settings.maxRowsCount &&
									this.rows === this.settings.maxRowsCount
							),
							++this.yield.flushed >= this.yield.every))
					)
						return void this.startImgAnalyzer(t);
				} else if ('error' !== e.data('jg.loaded')) return;
			}
			0 < this.buildingRow.entriesBuff.length &&
				this.flushRow(
					!0,
					0 < this.settings.maxRowsCount &&
						this.rows === this.settings.maxRowsCount
				),
				this.isSpinnerActive() && this.stopLoadingSpinnerAnimation(),
				this.stopImgAnalyzerStarter(),
				this.setGalleryFinalHeight(this.galleryHeightToSet),
				this.settings.triggerEvent.call(
					this,
					t ? 'jg.resize' : 'jg.complete'
				);
		}),
		(n.prototype.stopImgAnalyzerStarter = function () {
			(this.yield.flushed = 0),
				null !== this.imgAnalyzerTimeout &&
					(clearTimeout(this.imgAnalyzerTimeout),
					(this.imgAnalyzerTimeout = null));
		}),
		(n.prototype.startImgAnalyzer = function (t) {
			var i = this;
			this.stopImgAnalyzerStarter(),
				(this.imgAnalyzerTimeout = setTimeout(function () {
					i.analyzeImages(t);
				}, 0.001));
		}),
		(n.prototype.onImageEvent = function (t, i, e) {
			var s, n;
			(i || e) &&
				((s = new Image()),
				(n = g(s)),
				i &&
					n.one('load', function () {
						n.off('load error'), i(s);
					}),
				e &&
					n.one('error', function () {
						n.off('load error'), e(s);
					}),
				(s.src = t));
		}),
		(n.prototype.init = function () {
			var o = !1,
				a = !1,
				h = this;
			g.each(this.entries, function (t, i) {
				var e = g(i),
					i = h.imgFromEntry(e);
				if (
					(e.addClass('jg-entry'),
					!0 !== e.data('jg.loaded') &&
						'skipped' !== e.data('jg.loaded'))
				)
					if (
						(null !== h.settings.rel &&
							e.attr('rel', h.settings.rel),
						null !== h.settings.target &&
							e.attr('target', h.settings.target),
						null !== i)
					) {
						var s = h.extractImgSrcFromImage(i);
						if (!1 === h.settings.waitThumbnailsLoad || !s) {
							var n = parseFloat(i.attr('width')),
								r = parseFloat(i.attr('height'));
							if (
								('svg' === i.prop('tagName') &&
									((n = parseFloat(i[0].getBBox().width)),
									(r = parseFloat(i[0].getBBox().height))),
								!isNaN(n) && !isNaN(r))
							)
								return (
									e.data('jg.width', n),
									e.data('jg.height', r),
									e.data('jg.loaded', 'skipped'),
									(a = !0),
									h.startImgAnalyzer(!1),
									!0
								);
						}
						e.data('jg.loaded', !1),
							(o = !0),
							h.isSpinnerActive() ||
								h.startLoadingSpinnerAnimation(),
							h.onImageEvent(
								s,
								function (t) {
									e.data('jg.width', t.width),
										e.data('jg.height', t.height),
										e.data('jg.loaded', !0),
										h.startImgAnalyzer(!1);
								},
								function () {
									e.data('jg.loaded', 'error'),
										h.startImgAnalyzer(!1);
								}
							);
					} else
						e.data('jg.loaded', !0),
							e.data(
								'jg.width',
								e.width() | parseFloat(e.css('width')) | 1
							),
							e.data(
								'jg.height',
								e.height() | parseFloat(e.css('height')) | 1
							);
			}),
				o || a || this.startImgAnalyzer(!1),
				this.checkWidth();
		}),
		(n.prototype.checkOrConvertNumber = function (t, i) {
			if (
				('string' === g.type(t[i]) && (t[i] = parseFloat(t[i])),
				'number' !== g.type(t[i]))
			)
				throw i + ' must be a number';
			if (isNaN(t[i])) throw 'invalid number for ' + i;
		}),
		(n.prototype.checkSizeRangesSuffixes = function () {
			if ('object' !== g.type(this.settings.sizeRangeSuffixes))
				throw 'sizeRangeSuffixes must be defined and must be an object';
			var t,
				i = [];
			for (t in this.settings.sizeRangeSuffixes)
				this.settings.sizeRangeSuffixes.hasOwnProperty(t) && i.push(t);
			for (var e = { 0: '' }, s = 0; s < i.length; s++)
				if ('string' === g.type(i[s]))
					try {
						e[parseInt(i[s].replace(/^[a-z]+/, ''), 10)] =
							this.settings.sizeRangeSuffixes[i[s]];
					} catch (t) {
						throw (
							'sizeRangeSuffixes keys must contains correct numbers (' +
							t +
							')'
						);
					}
				else e[i[s]] = this.settings.sizeRangeSuffixes[i[s]];
			this.settings.sizeRangeSuffixes = e;
		}),
		(n.prototype.retrieveMaxRowHeight = function () {
			var t = null,
				i = this.settings.rowHeight;
			if ('string' === g.type(this.settings.maxRowHeight))
				t = this.settings.maxRowHeight.match(/^[0-9]+%$/)
					? (i *
							parseFloat(
								this.settings.maxRowHeight.match(
									/^([0-9]+)%$/
								)[1]
							)) /
					  100
					: parseFloat(this.settings.maxRowHeight);
			else {
				if ('number' !== g.type(this.settings.maxRowHeight)) {
					if (
						!1 === this.settings.maxRowHeight ||
						null == this.settings.maxRowHeight
					)
						return null;
					throw 'maxRowHeight must be a number or a percentage';
				}
				t = this.settings.maxRowHeight;
			}
			if (isNaN(t)) throw 'invalid number for maxRowHeight';
			return (t = t < i ? i : t);
		}),
		(n.prototype.checkSettings = function () {
			this.checkSizeRangesSuffixes(),
				this.checkOrConvertNumber(this.settings, 'rowHeight'),
				this.checkOrConvertNumber(this.settings, 'margins'),
				this.checkOrConvertNumber(this.settings, 'border'),
				this.checkOrConvertNumber(this.settings, 'maxRowsCount');
			var t = ['justify', 'nojustify', 'left', 'center', 'right', 'hide'];
			if (-1 === t.indexOf(this.settings.lastRow))
				throw 'lastRow must be one of: ' + t.join(', ');
			if (
				(this.checkOrConvertNumber(this.settings, 'justifyThreshold'),
				this.settings.justifyThreshold < 0 ||
					1 < this.settings.justifyThreshold)
			)
				throw 'justifyThreshold must be in the interval [0,1]';
			if ('boolean' !== g.type(this.settings.cssAnimation))
				throw 'cssAnimation must be a boolean';
			if ('boolean' !== g.type(this.settings.captions))
				throw 'captions must be a boolean';
			if (
				(this.checkOrConvertNumber(
					this.settings.captionSettings,
					'animationDuration'
				),
				this.checkOrConvertNumber(
					this.settings.captionSettings,
					'visibleOpacity'
				),
				this.settings.captionSettings.visibleOpacity < 0 ||
					1 < this.settings.captionSettings.visibleOpacity)
			)
				throw 'captionSettings.visibleOpacity must be in the interval [0, 1]';
			if (
				(this.checkOrConvertNumber(
					this.settings.captionSettings,
					'nonVisibleOpacity'
				),
				this.settings.captionSettings.nonVisibleOpacity < 0 ||
					1 < this.settings.captionSettings.nonVisibleOpacity)
			)
				throw 'captionSettings.nonVisibleOpacity must be in the interval [0, 1]';
			if (
				(this.checkOrConvertNumber(
					this.settings,
					'imagesAnimationDuration'
				),
				this.checkOrConvertNumber(this.settings, 'refreshTime'),
				this.checkOrConvertNumber(this.settings, 'refreshSensitivity'),
				'boolean' !== g.type(this.settings.randomize))
			)
				throw 'randomize must be a boolean';
			if ('string' !== g.type(this.settings.selector))
				throw 'selector must be a string';
			if (!1 !== this.settings.sort && !g.isFunction(this.settings.sort))
				throw 'sort must be false or a comparison function';
			if (
				!1 !== this.settings.filter &&
				!g.isFunction(this.settings.filter) &&
				'string' !== g.type(this.settings.filter)
			)
				throw 'filter must be false, a string or a filter function';
		}),
		(n.prototype.retrieveSuffixRanges = function () {
			var t,
				i = [];
			for (t in this.settings.sizeRangeSuffixes)
				this.settings.sizeRangeSuffixes.hasOwnProperty(t) &&
					i.push(parseInt(t, 10));
			return (
				i.sort(function (t, i) {
					return i < t ? 1 : t < i ? -1 : 0;
				}),
				i
			);
		}),
		(n.prototype.updateSettings = function (t) {
			(this.settings = g.extend({}, this.settings, t)),
				this.checkSettings(),
				(this.border =
					0 <= this.settings.border
						? this.settings.border
						: this.settings.margins),
				(this.maxRowHeight = this.retrieveMaxRowHeight()),
				(this.suffixRanges = this.retrieveSuffixRanges());
		}),
		(n.prototype.defaults = {
			sizeRangeSuffixes: {},
			thumbnailPath: void 0,
			rowHeight: 120,
			maxRowHeight: !1,
			maxRowsCount: 0,
			margins: 1,
			border: -1,
			lastRow: 'nojustify',
			justifyThreshold: 0.9,
			waitThumbnailsLoad: !0,
			captions: !0,
			cssAnimation: !0,
			imagesAnimationDuration: 500,
			captionSettings: {
				animationDuration: 500,
				visibleOpacity: 0.7,
				nonVisibleOpacity: 0,
			},
			rel: null,
			target: null,
			extension: /\.[^.\\/]+$/,
			refreshTime: 200,
			refreshSensitivity: 0,
			randomize: !1,
			rtl: !1,
			sort: !1,
			filter: !1,
			selector: 'a',
			imgSelector: '> img, > a > img, > svg, > a > svg',
			triggerEvent: function (t) {
				this.$gallery.trigger(t);
			},
		}),
		(g.fn.justifiedGallery = function (s) {
			return this.each(function (t, i) {
				var i = g(i),
					e =
						(i.addClass('justified-gallery'),
						i.data('jg.controller'));
				if (void 0 === e) {
					if (null != s && 'object' !== g.type(s)) {
						if ('destroy' === s) return;
						throw 'The argument must be an object';
					}
					(e = new n(i, g.extend({}, n.prototype.defaults, s))),
						i.data('jg.controller', e);
				} else if ('norewind' !== s) {
					if ('destroy' === s) return void e.destroy();
					e.updateSettings(s), e.rewind();
				}
				e.updateEntries('norewind' === s) && e.init();
			});
		});
});
!(function (e, t) {
	t = t(e, e.document);
	(e.lazySizes = t),
		'object' == typeof module && module.exports && (module.exports = t);
})(window, function (a, m) {
	'use strict';
	if (m.getElementsByClassName) {
		var z,
			i,
			k,
			D,
			H,
			n,
			e,
			y = m.documentElement,
			s = a.Date,
			O = a.HTMLPictureElement,
			o = 'addEventListener',
			h = 'getAttribute',
			t = a[o],
			c = a.setTimeout,
			P = a.requestAnimationFrame || c,
			$ = a.requestIdleCallback,
			I = /^picture$/i,
			q = ['load', 'error', 'lazyincluded', '_lazyloaded'],
			r = {},
			j = Array.prototype.forEach,
			l = function (e, t) {
				return (
					r[t] || (r[t] = new RegExp('(\\s|^)' + t + '(\\s|$)')),
					r[t].test(e[h]('class') || '') && r[t]
				);
			},
			d = function (e, t) {
				l(e, t) ||
					e.setAttribute(
						'class',
						(e[h]('class') || '').trim() + ' ' + t
					);
			},
			G = function (e, t) {
				(t = l(e, t)) &&
					e.setAttribute(
						'class',
						(e[h]('class') || '').replace(t, ' ')
					);
			},
			J = function (t, i, e) {
				var a = e ? o : 'removeEventListener';
				e && J(t, i),
					q.forEach(function (e) {
						t[a](e, i);
					});
			},
			u = function (e, t, i, a, n) {
				var s = m.createEvent('Event');
				return (
					((i = i || {}).instance = S),
					s.initEvent(t, !a, !n),
					(s.detail = i),
					e.dispatchEvent(s),
					s
				);
			},
			K = function (e, t) {
				var i;
				!O && (i = a.picturefill || z.pf)
					? (t &&
							t.src &&
							!e[h]('srcset') &&
							e.setAttribute('srcset', t.src),
					  i({ reevaluate: !0, elements: [e] }))
					: t && t.src && (e.src = t.src);
			},
			g = function (e, t) {
				return (getComputedStyle(e, null) || {})[t];
			},
			Q = function (e, t, i) {
				for (
					i = i || e.offsetWidth;
					i < z.minSize && t && !e._lazysizesWidth;

				)
					(i = t.offsetWidth), (t = t.parentNode);
				return i;
			},
			f = ((H = []), (n = D = []), (pe._lsFlush = ve), pe),
			v = function (i, e) {
				return e
					? function () {
							f(i);
					  }
					: function () {
							var e = this,
								t = arguments;
							f(function () {
								i.apply(e, t);
							});
					  };
			},
			U = function (e) {
				function t() {
					var e = s.now() - a;
					e < 99 ? c(t, 99 - e) : ($ || n)(n);
				}
				var i,
					a,
					n = function () {
						(i = null), e();
					};
				return function () {
					(a = s.now()), (i = i || c(t, 99));
				};
			},
			V = {
				lazyClass: 'lazyload',
				loadedClass: 'lazyloaded',
				loadingClass: 'lazyloading',
				preloadClass: 'lazypreload',
				errorClass: 'lazyerror',
				autosizesClass: 'lazyautosizes',
				srcAttr: 'data-src',
				srcsetAttr: 'data-srcset',
				sizesAttr: 'data-sizes',
				minSize: 40,
				customMedia: {},
				init: !0,
				expFactor: 1.5,
				hFac: 0.8,
				loadMode: 2,
				loadHidden: !0,
				ricTimeout: 0,
				throttleDelay: 125,
			};
		for (e in ((z = a.lazySizesConfig || a.lazysizesConfig || {}), V))
			e in z || (z[e] = V[e]);
		(a.lazySizesConfig = z),
			c(function () {
				z.init && L();
			});
		(oe = /^img$/i),
			(re = /^iframe$/i),
			(le = 'onscroll' in a && !/(gle|ing)bot/.test(navigator.userAgent)),
			(T = -1),
			(ce = function (e) {
				return (
					(M = null == M ? 'hidden' == g(m.body, 'visibility') : M) ||
					('hidden' != g(e.parentNode, 'visibility') &&
						'hidden' != g(e, 'visibility'))
				);
			}),
			(te = be),
			(ae = W = x = 0),
			(ne = z.throttleDelay),
			(N = z.ricTimeout),
			(se =
				$ && 49 < N
					? function () {
							$(Ae, { timeout: N }),
								N !== z.ricTimeout && (N = z.ricTimeout);
					  }
					: v(function () {
							c(Ae);
					  }, !0)),
			(de = v(Ee)),
			(ue = function (e) {
				de({ target: e.target });
			}),
			(fe = v(function (e, t, i, a, n) {
				var s, o, r;
				if (!(o = u(e, 'lazybeforeunveil', t)).defaultPrevented) {
					if (
						(a &&
							(i
								? d(e, z.autosizesClass)
								: e.setAttribute('sizes', a)),
						(i = e[h](z.srcsetAttr)),
						(a = e[h](z.srcAttr)),
						n &&
							(s =
								(l = e.parentNode) && I.test(l.nodeName || '')),
						(r = t.firesLoad || ('src' in e && (i || a || s))),
						(o = { target: e }),
						d(e, z.loadingClass),
						r && (clearTimeout(X), (X = c(Ce, 2500)), J(e, ue, !0)),
						s && j.call(l.getElementsByTagName('source'), _e),
						i)
					)
						e.setAttribute('srcset', i);
					else if (a && !s)
						if (re.test(e.nodeName)) {
							var t = e,
								l = a;
							try {
								t.contentWindow.location.replace(l);
							} catch (e) {
								t.src = l;
							}
						} else e.src = a;
					n && (i || s) && K(e, { src: a });
				}
				e._lazyRace && delete e._lazyRace,
					G(e, z.lazyClass),
					f(function () {
						(!r || (e.complete && 1 < e.naturalWidth)) &&
							(Ee(o),
							(e._lazyCache = !0),
							c(function () {
								'_lazyCache' in e && delete e._lazyCache;
							}, 9));
					}, !0);
			}));
		var p,
			C,
			X,
			b,
			Y,
			Z,
			ee,
			A,
			E,
			_,
			w,
			M,
			te,
			ie,
			ae,
			ne,
			N,
			se,
			oe,
			re,
			le,
			x,
			W,
			T,
			ce,
			B,
			de,
			ue,
			fe,
			F,
			me,
			ze,
			ye,
			S,
			he = {
				_: function () {
					(Y = s.now()),
						(S.elements = m.getElementsByClassName(z.lazyClass)),
						(p = m.getElementsByClassName(
							z.lazyClass + ' ' + z.preloadClass
						)),
						t('scroll', B, !0),
						t('resize', B, !0),
						a.MutationObserver
							? new MutationObserver(B).observe(y, {
									childList: !0,
									subtree: !0,
									attributes: !0,
							  })
							: (y[o]('DOMNodeInserted', B, !0),
							  y[o]('DOMAttrModified', B, !0),
							  setInterval(B, 999)),
						t('hashchange', B, !0),
						[
							'focus',
							'mouseover',
							'click',
							'load',
							'transitionend',
							'animationend',
							'webkitAnimationEnd',
						].forEach(function (e) {
							m[o](e, B, !0);
						}),
						/d$|^c/.test(m.readyState)
							? R()
							: (t('load', R),
							  m[o]('DOMContentLoaded', B),
							  c(R, 2e4)),
						S.elements.length ? (be(), f._lsFlush()) : B();
				},
				checkElems: (B = function (e) {
					var t;
					(e = !0 === e) && (N = 33),
						ie ||
							((ie = !0),
							(t = ne - (s.now() - ae)) < 0 && (t = 0),
							e || t < 9 ? se() : c(se, t));
				}),
				unveil: (F = function (e) {
					var t,
						i = oe.test(e.nodeName),
						a = i && (e[h](z.sizesAttr) || e[h]('sizes')),
						n = 'auto' == a;
					((!n && C) ||
						!i ||
						(!e[h]('src') && !e.srcset) ||
						e.complete ||
						l(e, z.errorClass) ||
						!l(e, z.lazyClass)) &&
						((t = u(e, 'lazyunveilread').detail),
						n && ge.updateElem(e, !0, e.offsetWidth),
						(e._lazyRace = !0),
						W++,
						fe(e, t, n, a, i));
				}),
			},
			ge =
				((ze = v(function (e, t, i, a) {
					var n, s, o;
					if (
						((e._lazysizesWidth = a),
						e.setAttribute('sizes', (a += 'px')),
						I.test(t.nodeName || ''))
					)
						for (
							s = 0,
								o = (n = t.getElementsByTagName('source'))
									.length;
							s < o;
							s++
						)
							n[s].setAttribute('sizes', a);
					i.detail.dataAttr || K(e, i.detail);
				})),
				{
					_: function () {
						(me = m.getElementsByClassName(z.autosizesClass)),
							t('resize', ye);
					},
					checkElems: (ye = U(function () {
						var e,
							t = me.length;
						if (t) for (e = 0; e < t; e++) we(me[e]);
					})),
					updateElem: we,
				}),
			L = function () {
				L.i || ((L.i = !0), ge._(), he._());
			};
		return (S = {
			cfg: z,
			autoSizer: ge,
			loader: he,
			init: L,
			uP: K,
			aC: d,
			rC: G,
			hC: l,
			fire: u,
			gW: Q,
			rAF: f,
		});
	}
	function ve() {
		var e = n;
		for (n = D.length ? H : D, k = !(i = !0); e.length; ) e.shift()();
		i = !1;
	}
	function pe(e, t) {
		i && !t
			? e.apply(this, arguments)
			: (n.push(e), k || ((k = !0), (m.hidden ? c : P)(ve)));
	}
	function Ce(e) {
		W--, (e && !(W < 0) && e.target) || (W = 0);
	}
	function be() {
		var e,
			t,
			i,
			a,
			n,
			s,
			o,
			r,
			l,
			c,
			d,
			u,
			f = S.elements;
		if ((b = z.loadMode) && W < 8 && (e = f.length)) {
			for (
				t = 0,
					T++,
					c =
						!z.expand || z.expand < 1
							? 500 < y.clientHeight && 500 < y.clientWidth
								? 500
								: 370
							: z.expand,
					d = (S._defEx = c) * z.expFactor,
					u = z.hFac,
					M = null,
					x < d && W < 1 && 2 < T && 2 < b && !m.hidden
						? ((x = d), (T = 0))
						: (x = 1 < b && 1 < T && W < 6 ? c : 0);
				t < e;
				t++
			)
				if (f[t] && !f[t]._lazyRace)
					if (le)
						if (
							(l !==
								(s =
									(r = f[t][h]('data-expand')) && (s = +r)
										? s
										: x) &&
								((Z = innerWidth + s * u),
								(ee = innerHeight + s),
								(o = -1 * s),
								(l = s)),
							(i = f[t].getBoundingClientRect()),
							(w = i.bottom) >= o &&
								(A = i.top) <= ee &&
								(_ = i.right) >= o * u &&
								(E = i.left) <= Z &&
								(w || _ || E || A) &&
								(z.loadHidden || ce(f[t])) &&
								((C && W < 3 && !r && (b < 3 || T < 4)) ||
									(function (e, t) {
										var i,
											a = e,
											n = ce(e);
										for (
											A -= t, w += t, E -= t, _ += t;
											n &&
											(a = a.offsetParent) &&
											a != m.body &&
											a != y;

										)
											(n = 0 < (g(a, 'opacity') || 1)) &&
												'visible' != g(a, 'overflow') &&
												((i =
													a.getBoundingClientRect()),
												(n =
													_ > i.left &&
													E < i.right &&
													w > i.top - 1 &&
													A < i.bottom + 1));
										return n;
									})(f[t], s)))
						) {
							if ((F(f[t]), (n = !0), 9 < W)) break;
						} else
							!n &&
								C &&
								!a &&
								W < 4 &&
								T < 4 &&
								2 < b &&
								(p[0] || z.preloadAfterLoad) &&
								(p[0] ||
									(!r &&
										(w ||
											_ ||
											E ||
											A ||
											'auto' != f[t][h](z.sizesAttr)))) &&
								(a = p[0] || f[t]);
					else F(f[t]);
			a && !n && F(a);
		}
	}
	function Ae() {
		(ie = !1), (ae = s.now()), te();
	}
	function Ee(e) {
		var t = e.target;
		t._lazyCache
			? delete t._lazyCache
			: (Ce(e),
			  d(t, z.loadedClass),
			  G(t, z.loadingClass),
			  J(t, ue),
			  u(t, 'lazyloaded'));
	}
	function _e(e) {
		var t,
			i = e[h](z.srcsetAttr);
		(t = z.customMedia[e[h]('data-media') || e[h]('media')]) &&
			e.setAttribute('media', t),
			i && e.setAttribute('srcset', i);
	}
	function R() {
		var e;
		C ||
			(s.now() - Y < 999
				? c(R, 999)
				: ((e = U(function () {
						(z.loadMode = 3), B();
				  })),
				  (C = !0),
				  (z.loadMode = 3),
				  B(),
				  t(
						'scroll',
						function () {
							3 == z.loadMode && (z.loadMode = 2), e();
						},
						!0
				  )));
	}
	function we(e, t, i) {
		var a = e.parentNode;
		a &&
			((i = Q(e, a, i)),
			(t = u(e, 'lazybeforesizes', { width: i, dataAttr: !!t }))
				.defaultPrevented ||
				((i = t.detail.width) &&
					i !== e._lazysizesWidth &&
					ze(e, a, t, i)));
	}
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
