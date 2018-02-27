/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
!(function(e) {
	"use strict";
	var n = function(n, t, o) {
		function i(e) {
			if (a.body) return e();
			setTimeout(function() {
				i(e);
			});
		}
		function r() {
			l.addEventListener && l.removeEventListener("load", r), (l.media =
				o || "all");
		}
		var d,
			a = e.document,
			l = a.createElement("link");
		if (t) d = t;
		else {
			var f = (a.body || a.getElementsByTagName("head")[0]).childNodes;
			d = f[f.length - 1];
		}
		var s = a.styleSheets;
		(l.rel = "stylesheet"), (l.href = n), (l.media = "only x"), i(function() {
			d.parentNode.insertBefore(l, t ? d : d.nextSibling);
		});
		var u = function(e) {
			for (var n = l.href, t = s.length; t--; ) if (s[t].href === n) return e();
			setTimeout(function() {
				u(e);
			});
		};
		return l.addEventListener &&
			l.addEventListener("load", r), (l.onloadcssdefined = u), u(r), l;
	};
	"undefined" != typeof exports ? (exports.loadCSS = n) : (e.loadCSS = n);
})("undefined" != typeof global ? global : this);

/*! loadCSS rel=preload polyfill. [c]2017 Filament Group, Inc. MIT License */
!(function(t) {
	if (t.loadCSS) {
		var e = (loadCSS.relpreload = {});
		if (
			(
				(e.support = function() {
					try {
						return t.document.createElement("link").relList.supports("preload");
					} catch (t) {
						return !1;
					}
				}),
				(e.poly = function() {
					for (
						var e = t.document.getElementsByTagName("link"), r = 0;
						r < e.length;
						r++
					) {
						var n = e[r];
						"preload" === n.rel &&
							"style" === n.getAttribute("as") &&
							(t.loadCSS(n.href, n, n.getAttribute("media")), (n.rel = null));
					}
				}),
				!e.support()
			)
		) {
			e.poly();
			var r = t.setInterval(e.poly, 300);
			t.addEventListener &&
				t.addEventListener("load", function() {
					e.poly(), t.clearInterval(r);
				}), t.attachEvent &&
				t.attachEvent("onload", function() {
					t.clearInterval(r);
				});
		}
	}
})(this);

function initMobileMenu() {
	$bottomNav.on("click", $menuToggle, function() {
		$menuItemsWrapper.toggleClass("is-open");
	});
}
function initSmoothScroll() {
	$main.on("click", ".SectionsNav-link, #justAsk", function(t) {
		t.preventDefault();
		var e = $(this).attr("href");
		if (
			location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
			location.hostname == this.hostname
		) {
			var i = $(this.hash);
			if (((i = i.length ? i : $("[name=" + this.hash.slice(1) + "]")), i.length))
				return $("html,body").animate(
					{ scrollTop: i.offset().top },
					1e3,
					function() {
						window.location.hash = e;
					}
				), !1;
		}
	});
}
function initTypeIt() {
	$("#homeHeader", $top).typeIt(
		{ typeSpeed: 125, whatToType: ["This is Slate Coding."] },
		function() {
			$(".SocialNav-item", $main).addClass("animation-popup");
		}
	);
}
function initScrollify() {
	viewportWidth > 600 && viewportHeight > 500
		? $main.hasClass("scrollify-enabled") ||
				(
					$.scrollify({ section: ".HomeSection", sectionName: "" }),
					$main.addClass("scrollify-enabled")
				)
		: (
				$main.hasClass("scrollify-enabled") &&
					($.scrollify.destroy(), $main.removeClass("scrollify-enabled")),
				$homeSections.css("height", "auto"),
				$top.css("height", viewportHeight)
			);
}
function initCurrentMenuLink() {
	currentMenuLink(), $window.scroll(function() {
		currentMenuLink();
	});
}
function initSlick() {
	$("#workList", "#work").slick({
		infinite: !1,
		slidesToShow: 3,
		slidesToScroll: 3,
		prevArrow: $("#slickPrevious"),
		nextArrow: $("#slickNext"),
		speed: 100,
		easing: "swing",
		responsive: [
			{ breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2 } },
			{ breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } }
		]
	});
}
function initContactForm() {
	$("#ContactForm", "#contact").submit(function(t) {
		t.preventDefault();
		var e = $("#formName"),
			i = $("#formEmail"),
			n = $("#formMessage"),
			s = $("#StatusMessages");
		s.removeClass("failure success"), $.ajax({
			url: "//formspree.io/slate-coding@outlook.com",
			method: "POST",
			data: { name: e.val(), email: i.val(), message: n.val() },
			dataType: "json"
		})
			.done(function(t) {
				e.val(
					""
				), i.val(""), n.val(""), s.html("Your message was successfully sent!").removeClass("failure").addClass("success");
			})
			.fail(function(t) {
				s
					.html(
						"Sorry, looks like something's messed up."
					)
					.removeClass("success")
					.addClass("failure");
			});
	});
}
function currentMenuLink() {
	for (var t = 0; t < $homeSections.length; t++) {
		var e = $($homeSections[t]);
		($mostVisible = e.fracs().visible > $mostVisible.fracs().visible
			? e
			: $mostVisible), (mostVisibleID = $mostVisible.attr("id"));
	}
	"top" === mostVisibleID
		? $bottomNav.addClass("is-invisible")
		: $bottomNav.removeClass("is-invisible"), $sectionNavLinks.removeClass(
		"active-link"
	), $main
		.find('.SectionsNav-link[href="#' + mostVisibleID + '"]')
		.addClass("active-link");
}
!(function(t, e) {
	(t.fn.typeIt = function(e, i) {
		return this.each(function() {
			t(this).data("typeit", new t.fn.typeIt.typeItClass(t(this), e, i));
		});
	}), (t.fn.typeIt.typeItClass = function(e, i, n) {
		(this.defaults = {
			whatToType: "This is Slate Coding.",
			typeSpeed: 100,
			lifeLike: !0,
			showCursor: !0,
			breakLines: !0,
			breakDelay: 750,
			startDelay: 250,
			loop: !1,
			loopDelay: 750
		}), (this.dataAttDefaults = {
			whatToType: e.data("typeitWhattotype"),
			typeSpeed: e.data("typeitTypespeed"),
			lifeLike: e.data("typeitLifelike"),
			showCursor: e.data("typeitShowcursor"),
			breakLines: e.data("typeitBreaklines"),
			breakDelay: e.data("typeitBreakdelay"),
			startDelay: e.data("typeitStartdelay"),
			loop: e.data("typeitLoop"),
			loopDelay: e.data("typeitLoopdelay")
		}), (this.settings = {}), t.extend(
			this.settings,
			this.defaults,
			i,
			this.dataAttDefaults
		), (this.theElement = e), (this.callback = n), this.init(i);
	}), (_proto = t.fn.typeIt.typeItClass.prototype), (_proto.init = function(t) {
		return (this.stringPlaceCount = 0), (this.phraseLength = 0), (this.stringArray = []), (this.stringArrayIndex = 0), (this.stringArrayCharacterIndex = 0), (this.contentStartEnd = []), (this.contentStartEndIndex = 0), (this.contentStartEndSpan = 0), (this.printingInTag = !1), (this.characterToAppend = null), (this.thisTiTextContainer = null), (this.thisString = null), (this.thisTag = null), (this.stringLengths = []), (this.stringToDelete = null), (this.typeTimeout = null), (this.deleteTimeout = null), (this.typeSpeedRangeSpan = null), (this.typeSpeedMin = null), (this.typeSpeedMax = null), this.validateCallbackFunction() !==
			!1 &&
			(
				this.testForElementStringOverride(),
				this.processWhatToType(),
				this.setupDOMComponents(),
				void setTimeout(
					function() {
						this.typeLoop();
					}.bind(this),
					this.settings.startDelay
				)
			);
	}), (_proto.testForElementStringOverride = function() {
		this.theElement.text().length > 0 &&
			!this.theElement.has(".ti-container") &&
			(this.settings.whatToType = this.theElement.html());
	}), (_proto.setupDOMComponents = function() {
		for (this.theElement.html(""), j = 0; j < this.stringArray.length; j++)
			(this.stringLengths[j] = this.stringArray[j].length), this.theElement.append(
				'<span class="ti-container"><span class="ti-text-container ti-cursor"></span></span>'
			);
		this.theElement
			.find(".ti-container:first-child")
			.find(".ti-text-container")
			.addClass("active-container"), this.settings.breakLines === !1 &&
			(
				this.theElement.find(".ti-container").remove(),
				this.theElement.append(
					'<span class="ti-container"><span class="ti-text-container ti-cursor"></span></span>'
				)
			), this.settings.showCursor === !1 &&
			this.theElement.find(".ti-text-container").removeClass("ti-cursor");
	}), (_proto.processWhatToType = function() {
		if (
			"[object Array]" !== Object.prototype.toString.call(this.settings.whatToType)
		)
			(this.stringArray =
				'["' + this.settings.whatToType + '"]'), (this.stringArray = JSON.parse(
				this.stringArray
			));
		else {
			(this.stringArrayTemp = t.extend(
				{},
				this.settings.whatToType
			)), (this.stringArrayTemp = t.map(this.stringArrayTemp, function(t, e) {
				return [t];
			}));
			for (var e = 0; e < this.stringArrayTemp.length; e++)
				this.stringArray.push(this.stringArrayTemp[e]);
		}
		for (var i = 0; i < this.stringArray.length; i++) {
			(this.contentStartEnd = []), (this.contentStartEndIndex = 0), (this.contentStartEndSpan = 0), (this.stringArray[
				i
			] = this.stringArray[i].split(""));
			for (var n = 0, s = this.stringArray[i]; n < s.length; n++)
				"<" === s[n] &&
					(
						(this.contentStartEnd[this.contentStartEndIndex] = []),
						(this.contentStartEnd[this.contentStartEndIndex][0] = n)
					), ">" === s[n] &&
					(
						(this.contentStartEnd[this.contentStartEndIndex][1] = n),
						this.contentStartEndIndex++
					);
			for (var o = 0; o < this.contentStartEnd.length; o++)
				for (
					var r = this.contentStartEnd[o][0];
					r < this.contentStartEnd[o][1];
					r++
				)
					this.stringArray[i][this.contentStartEnd[o][0]] =
						this.stringArray[i][this.contentStartEnd[o][0]] +
						this.stringArray[i][r + 1];
			for (var a = 0; a < this.contentStartEnd.length; a++) {
				var h = this.contentStartEnd[a][0] + 1;
				this.stringArray[i].splice(
					h,
					this.contentStartEnd[a][1] - this.contentStartEnd[a][0]
				);
				for (
					var l = this.contentStartEnd[a][1] - this.contentStartEnd[a][0], c = 0;
					c < this.contentStartEnd.length;
					c++
				)
					(this.contentStartEnd[c][0] =
						this.contentStartEnd[c][0] - l), (this.contentStartEnd[c][1] =
						this.contentStartEnd[c][1] - l);
			}
		}
	}), (_proto.validateCallbackFunction = function() {
		"undefined" == typeof this.callback &&
			(this.callback = function() {
				return !0;
			});
	}), (_proto.randomizeTypeSpeed = function() {
		this.settings.lifeLike === !0
			? (
					(this.typeSpeedRangeSpan = this.settings.typeSpeed / 2),
					(this.typeSpeedMin = this.settings.typeSpeed - this.typeSpeedRangeSpan),
					(this.typeSpeedMax = this.settings.typeSpeed + this.typeSpeedRangeSpan),
					(this.delayTime = Math.abs(
						Math.random() * (this.typeSpeedMax - this.typeSpeedMin) +
							this.typeSpeedMin
					))
				)
			: (this.delayTime = this.settings.typeSpeed);
	}), (_proto.typeLoop = function() {
		(this.thisString = this.stringArray[
			this.stringArrayIndex
		]), (this.phraseLength = this.thisString.length), (this.typeTimeout = setTimeout(
			function() {
				if (
					(
						this.randomizeTypeSpeed(),
						(this.characterToAppend = this.stringArray[this.stringArrayIndex][
							this.stringArrayCharacterIndex
						]),
						this.characterToAppend.indexOf("<") !== -1 &&
							this.characterToAppend.indexOf("</") === -1
					)
				) {
					(this.contentStartEndIndex = 0), (this.contentStartEnd[0] =
						this.stringArrayCharacterIndex + 1);
					for (
						var e = this.stringArrayCharacterIndex;
						e < this.thisString.length;
						e++
					)
						if (this.thisString[e].indexOf("</") !== -1) {
							this.contentStartEnd[1] = e - 1;
							break;
						}
					(this.contentStartEndSpan =
						this.contentStartEnd[1] - this.contentStartEnd[0]), (this.thisTag = t(
						t.parseHTML(this.characterToAppend)
					)), (this.characterToAppend = this.thisTag), this.appendTheCharacter(), (this.printingInTag = !0);
				}
				this.appendTheCharacter(), this.stringArrayCharacterIndex++, this
					.stringArrayCharacterIndex < this.phraseLength
					? this.typeLoop()
					: this.stringArray.length > 1
						? (
								(this.stringArrayCharacterIndex = 0),
								(this.stringPlaceCount = this.stringPlaceCount + this.phraseLength),
								this.stringArrayIndex + 1 === this.stringArray.length
									? this.endOfStringsFork()
									: this.stringArrayIndex + 1 < this.stringArray.length &&
											this.settings.breakLines === !1
										? setTimeout(
												function() {
													this.deleteLoop();
												}.bind(this),
												this.settings.breakDelay
											)
										: this.stringArrayIndex + 1 < this.stringArray.length &&
												this.settings.breakLines === !0 &&
												(
													this.stringArrayIndex++,
													setTimeout(
														function() {
															this.theElement
																.find(".ti-text-container")
																.removeClass("active-container"), this.theElement
																.find(
																	".ti-text-container:eq(" + this.stringArrayIndex + ")"
																)
																.addClass("active-container"), setTimeout(
																function() {
																	this.typeLoop();
																}.bind(this),
																this.settings.breakDelay
															);
														}.bind(this),
														this.settings.breakDelay
													)
												)
							)
						: this.endOfStringsFork();
			}.bind(this),
			this.delayTime
		));
	}), (_proto.endOfStringsFork = function() {
		this.settings.loop === !0
			? setTimeout(
					function() {
						this.deleteLoop();
					}.bind(this),
					this.settings.loopDelay
				)
			: this.callback();
	}), (_proto.appendTheCharacter = function() {
		this.settings.breakLines === !0
			? (
					(this.thisTiTextContainer = this.theElement.find(
						".ti-text-container:eq(" + this.stringArrayIndex + ")"
					)),
					this.thisTiTextContainer.addClass("active-container")
				)
			: (
					(this.thisTiTextContainer = this.theElement.find(".ti-text-container")),
					this.thisTiTextContainer.addClass("active-container")
				), this.appendToHTMLTag(
			function() {
				this.thisTiTextContainer.append(this.characterToAppend);
			}.bind(this)
		);
	}), (_proto.appendToHTMLTag = function(e) {
		this.printingInTag === !0
			? (
					(this.characterToAppend = this.thisString[
						this.contentStartEnd[0] + this.contentStartEndIndex
					]),
					t(this.thisTag, this.theElement).last().append(this.characterToAppend),
					(this.printingInTag =
						this.contentStartEnd[1] !==
						this.contentStartEnd[0] + this.contentStartEndIndex - 1),
					this.contentStartEndIndex++
				)
			: e();
	}), (_proto.deleteLoop = function(t) {
		(this.thisTiTextContainer = this.theElement.find(
			".ti-text-container"
		)), (this.deleteTimeout = setTimeout(
			function() {
				this.randomizeTypeSpeed(), (this.stringToDelete = this.thisTiTextContainer
					.last()
					.html()), (this.arrayToDelete = typeof this.arrayToDelete !== t
					? this.stringToDelete.split("")
					: []);
				for (var e = this.arrayToDelete.length - 1; e > -1; e--) {
					if (">" === this.arrayToDelete[e]) {
						for (var i = e - 1; i > -1; i--)
							if ("<" === this.arrayToDelete[i] && ">" !== this.arrayToDelete[i - 1]) {
								this.arrayToDelete.splice(i - 1, 1);
								break;
							}
						break;
					}
					this.arrayToDelete.splice(e, 1);
					break;
				}
				this.thisTiTextContainer.last().html(this.arrayToDelete.join("")), 0 ===
					this.thisTiTextContainer.last().text().length &&
					this.thisTiTextContainer
						.last()
						.html(""), this.thisTiTextContainer.last().text().length > 0
					? this.deleteLoop()
					: this.stringArray[this.stringArrayIndex + 1] !== t
						? (this.stringArrayIndex++, this.typeLoop())
						: this.settings.loop === !0 &&
								(this.thisTiTextContainer.length > 1
									? (
											this.thisTiTextContainer.last().remove(),
											this.theElement
												.find(".ti-text-container")
												.last()
												.addClass("active-container"),
											this.deleteLoop()
										)
									: this.init());
			}.bind(this),
			this.delayTime / 3
		));
	}), (_proto.stop = function() {
		clearTimeout(this.typeTimeout), clearTimeout(this.deleteTimeout);
	});
})(jQuery), (function(t, e, i, n) {
	"use strict";
	function s(i, n) {
		return (
			x === !0 ||
			void (
				p[i] &&
				(
					C.before(i, f),
					(y = 1),
					C.sectionName && (e.location.hash = p[i]),
					n
						? (t(C.target).stop().scrollTop(d[i]), C.after(i, f))
						: (
								t(C.target)
									.stop()
									.animate({ scrollTop: d[i] }, C.scrollSpeed, C.easing),
								t(C.target).promise().done(function() {
									(S = !1), C.after(i, f);
								})
							)
				)
			)
		);
	}
	function o(t) {
		if (t < 4) return !1;
		var e,
			i = 20,
			n = 0,
			s = t.length - 1;
		for (
			t.length < 2 * i && (i = Math.floor(t.length / 2)), e = t.length - i;
			s >= e;
			s--
		)
			n += t[s];
		var o = n / i;
		for (n = 0, s = t.length - i - 1, e = t.length - 2 * i; s >= e; s--)
			n += t[s];
		var r = n / i;
		return o >= r;
	}
	function r(t, e) {
		for (var i = p.length; i >= 0; i--)
			"string" == typeof t
				? p[i] === t && ((m = i), s(i, e))
				: i === t && ((m = i), s(i, e));
	}
	var a,
		h,
		l,
		c,
		u,
		d = [],
		p = [],
		f = [],
		g = [],
		m = 0,
		y = 1,
		v = (e.location.hash, !1),
		T = t(e).scrollTop(),
		w = !1,
		S = !1,
		b = !1,
		x = !1,
		E = [],
		k = new Date().getTime(),
		C = {
			section: "section",
			sectionName: "section-name",
			easing: "easeOutExpo",
			scrollSpeed: 1100,
			offset: 0,
			scrollbars: !0,
			axis: "y",
			target: "html,body",
			before: function() {},
			after: function() {},
			afterResize: function() {}
		};
	(t.scrollify = function(n) {
		function r(e) {
			t(C.target).stop().animate({ scrollTop: e }, C.scrollSpeed, C.easing);
		}
		function $() {
			t(C.section).each(function(i) {
				t(this).css("height", "auto").outerHeight() < t(e).height()
					? (t(this).css({ height: t(e).height() }), (g[i] = !1))
					: (t(this).css({ height: t(this).height() }), (g[i] = !0));
			});
		}
		function A(i) {
			t(C.section).each(function(i) {
				i > 0
					? (d[i] = parseInt(t(this).offset().top) + C.offset)
					: (d[i] = parseInt(
							t(this).offset().top
						)), C.sectionName && t(this).data(C.sectionName) ? (p[i] = "#" + t(this).data(C.sectionName).replace(/ /g, "-")) : (p[i] = "#" + (i + 1)), (f[i] = t(this)), e.location.hash === p[i] && ((m = i), (v = !0));
			}), !0 === i && s(m, !1);
		}
		function I() {
			return (T = t(e).scrollTop()), !(T > parseInt(d[m]));
		}
		function L() {
			return (T = t(e).scrollTop()), !(
				T <
				parseInt(d[m]) + (f[m].height() - t(e).height())
			);
		}
		(t.easing.easeOutExpo = function(t, e, i, n, s) {
			return e == s ? i + n : n * (-Math.pow(2, -10 * e / s) + 1) + i;
		}), (l = {
			handleMousedown: function() {
				return x === !0 || ((w = !1), void (b = !1));
			},
			handleMouseup: function() {
				return x === !0 || ((w = !0), void (b && l.calculateNearest()));
			},
			handleScroll: function() {
				return (
					x === !0 ||
					(
						a && clearTimeout(a),
						void (a = setTimeout(function() {
							return (b = !0), w !== !1 && ((w = !1), void l.calculateNearest());
						}, 200))
					)
				);
			},
			calculateNearest: function() {
				T = t(e).scrollTop();
				for (var i, n = 1, o = d.length, r = 0, a = Math.abs(d[0] - T); n < o; n++)
					(i = Math.abs(d[n] - T)), i < a && ((a = i), (r = n));
				(L() || I()) && ((m = r), s(r, !1));
			},
			wheelHandler: function(t, e) {
				if (x === !0) return !0;
				g[m] || t.preventDefault();
				var i = new Date().getTime();
				if (
					(
						(e =
							e || -t.originalEvent.detail / 3 || t.originalEvent.wheelDelta / 120),
						i - k > 1300 && (E = []),
						(k = i),
						E.length >= 35 && E.shift(),
						E.push(Math.abs(10 * e)),
						S
					)
				)
					return !1;
				if (e < 0) {
					if (m < d.length - 1 && L()) {
						if (!o(E)) return !1;
						t.preventDefault(), m++, (S = !0), s(m, !1);
					}
				} else if (e > 0 && m > 0 && I()) {
					if (!o(E)) return !1;
					t.preventDefault(), m--, (S = !0), s(m, !1);
				}
			},
			keyHandler: function(t) {
				return (
					x === !0 ||
					void (38 == t.keyCode
						? m > 0 && I() && (m--, s(m, !1))
						: 40 == t.keyCode && m < d.length - 1 && L() && (m++, s(m, !1)))
				);
			},
			init: function() {
				C.scrollbars
					? (
							t(e).bind("mousedown", l.handleMousedown),
							t(e).bind("mouseup", l.handleMouseup),
							t(e).bind("scroll", l.handleScroll)
						)
					: t("body").css({ overflow: "hidden" }), t(i).bind(
					"DOMMouseScroll mousewheel",
					l.wheelHandler
				), t(i).bind("keydown", l.keyHandler);
			}
		}), (c = {
			touches: {
				touchstart: { y: -1 },
				touchmove: { y: -1 },
				touchend: !1,
				direction: "undetermined"
			},
			options: { distance: 30, timeGap: 800, timeStamp: new Date().getTime() },
			touchHandler: function(t) {
				if (x === !0) return !0;
				var e;
				if ("undefined" != typeof t && "undefined" != typeof t.touches)
					switch (((e = t.touches[0]), t.type)) {
						case "touchstart":
							(c.touches.touchstart.y =
								e.pageY), (c.touches.touchmove.y = -1), (c.options.timeStamp = new Date().getTime()), (c.touches.touchend = !1);
						case "touchmove":
							(c.touches.touchmove.y = e.pageY), c.touches.touchstart.y !==
								c.touches.touchmove.y &&
								(
									t.preventDefault(),
									c.options.timeStamp + c.options.timeGap < new Date().getTime() &&
										0 == c.touches.touchend &&
										(
											(c.touches.touchend = !0),
											c.touches.touchstart.y > -1 &&
												Math.abs(c.touches.touchmove.y - c.touches.touchstart.y) >
													c.options.distance &&
												(c.touches.touchstart.y < c.touches.touchmove.y ? c.up() : c.down())
										)
								);
							break;
						case "touchend":
							c.touches[t.type] === !1 &&
								(
									(c.touches[t.type] = !0),
									c.touches.touchstart.y > -1 &&
										c.touches.touchmove.y > -1 &&
										(
											Math.abs(c.touches.touchmove.y - c.touches.touchstart.y) >
												c.options.distance &&
												(c.touches.touchstart.y < c.touches.touchmove.y
													? c.up()
													: c.down()),
											(c.touches.touchstart.y = -1)
										)
								);
					}
			},
			down: function() {
				m <= d.length - 1 &&
					(L() && m < d.length - 1
						? (m++, s(m, !1))
						: Math.floor(f[m].height() / t(e).height()) > y
							? (r(parseInt(d[m]) + t(e).height() * y), (y += 1))
							: r(parseInt(d[m]) + (f[m].height() - t(e).height())));
			},
			up: function() {
				m >= 0 &&
					(I() && m > 0
						? (m--, s(m, !1))
						: y > 2
							? ((y -= 1), r(parseInt(d[m]) + t(e).height() * y))
							: ((y = 1), r(parseInt(d[m]))));
			},
			init: function() {
				i.addEventListener &&
					(
						i.addEventListener("touchstart", c.touchHandler, !1),
						i.addEventListener("touchmove", c.touchHandler, !1),
						i.addEventListener("touchend", c.touchHandler, !1)
					);
			}
		}), (u = {
			handleResize: function() {
				clearTimeout(h), (h = setTimeout(function() {
					$(), A(!0), C.afterResize();
				}, 50));
			}
		}), (C = t.extend(C, n)), $(), A(!1), v === !1 && C.sectionName
			? (e.location.hash = p[0])
			: s(m, !1), l.init(), c.init(), t(e).bind(
			"resize",
			u.handleResize
		), e.addEventListener("orientationchange", u.handleResize, !1);
	}), (t.scrollify.move = function(t) {
		return t !== n && void r(t, !1);
	}), (t.scrollify.instantMove = function(t) {
		return t !== n && void r(t, !0);
	}), (t.scrollify.next = function() {
		m < p.length && ((m += 1), s(m, !1));
	}), (t.scrollify.previous = function() {
		m > 0 && ((m -= 1), s(m, !1));
	}), (t.scrollify.instantNext = function() {
		m < p.length && ((m += 1), s(m, !0));
	}), (t.scrollify.instantPrevious = function() {
		m > 0 && ((m -= 1), s(m, !0));
	}), (t.scrollify.destroy = function() {
		t(C.section).each(function() {
			t(this).css("height", "auto");
		}), t(e).unbind("resize", u.handleResize), C.scrollbars &&
			(
				t(e).unbind("mousedown", l.handleMousedown),
				t(e).unbind("mouseup", l.handleMouseup),
				t(e).unbind("scroll", l.handleScroll)
			), t(i).unbind("DOMMouseScroll mousewheel", l.wheelHandler), t(i).unbind(
			"keydown",
			l.keyHandler
		), i.addEventListener &&
			(
				i.removeEventListener("touchstart", c.touchHandler, !1),
				i.removeEventListener("touchmove", c.touchHandler, !1),
				i.removeEventListener("touchend", c.touchHandler, !1)
			), (d = []), (p = []), (f = []), (g = []);
	}), (t.scrollify.update = function() {
		u.handleResize();
	}), (t.scrollify.current = function() {
		return f[m];
	}), (t.scrollify.disable = function() {
		x = !0;
	}), (t.scrollify.enable = function() {
		x = !1;
	}), (t.scrollify.isDisabled = function() {
		return x;
	});
})(jQuery, this, document), !(function() {
	"use strict";
	function t(t, e) {
		return typeof t === e;
	}
	function e(t, e) {
		return t instanceof e;
	}
	function i(t) {
		return t && t.nodeType;
	}
	function n(t) {
		return i(t) ? t : e(t, v) ? t[0] : void 0;
	}
	function s(t, e, i) {
		return v.each(t, function(t, n) {
			i = e.call(n, i, t, n);
		}), i;
	}
	function o(t, e, i) {
		var n, s, o;
		if (t === e) return !0;
		if (!t || !e || t.constructor !== e.constructor) return !1;
		for (n = 0, s = i.length; s > n; n += 1) {
			if (((o = i[n]), t[o] && b(t[o].equals) && !t[o].equals(e[o]))) return !1;
			if (t[o] !== e[o]) return !1;
		}
		return !0;
	}
	function r(t, e, i, n) {
		(this.left = k(t)), (this.top = k(e)), (this.width = k(i)), (this.height = k(
			n
		)), (this.right = this.left + this.width), (this.bottom =
			this.top + this.height);
	}
	function a(t, e, i, n) {
		(this.visible = t || 0), (this.viewport = e || 0), (this.possible =
			i || 0), (this.rects = (n && S({}, n)) || null);
	}
	function h(t, e) {
		(this.els = t), (this.viewport = e);
	}
	function l(t, e, i) {
		var n;
		return v.inArray(i, $) >= 0
			? (n = r.ofElement(t))
			: v.inArray(i, A) >= 0 && (n = a.of(t, e)), n ? n[i] : 0;
	}
	function c(t, e) {
		return t.val - e.val;
	}
	function u(t, e) {
		return e.val - t.val;
	}
	function d(t) {
		var e = r.ofContent(t, !0),
			i = r.ofViewport(t, !0),
			n = e.width - i.width,
			s = e.height - i.height;
		(this.content = e), (this.viewport = i), (this.width = 0 >= n
			? null
			: i.left / n), (this.height = 0 >= s ? null : i.top / s), (this.left =
			i.left), (this.top = i.top), (this.right = e.right - i.right), (this.bottom =
			e.bottom - i.bottom);
	}
	function p(t) {
		this.el = t || window;
	}
	function f(t, e) {
		(this.context = t), (this.viewport = e), this.init();
	}
	function g(t, e, i, n) {
		(this.context = new h(
			t,
			e
		)), (this.property = i), (this.descending = n), this.init();
	}
	function m(t) {
		t && t !== window && t !== document
			? ((this.context = t), (this.$autoTarget = v(t)))
			: (this.context = window), this.init();
	}
	function y(t, e) {
		function i(e, i, n, s) {
			return (n = a(n) ? n.apply(e, i) : n), a(s[n])
				? s[n].apply(e, i)
				: void o.error('Method "' + n + '" does not exist on jQuery.' + t);
		}
		function n(t) {
			t && (r(l, t.statics), r(c, t.methods)), (l.modplug = n);
		}
		var s = [].slice,
			o = jQuery,
			r = o.extend,
			a = o.isFunction,
			h = r({}, e),
			l = function u() {
				return i(this, s.call(arguments), h.defaultStatic, u);
			},
			c = function d(t) {
				return a(d[t])
					? d[t].apply(this, s.call(arguments, 1))
					: i(this, s.call(arguments), h.defaultMethod, d);
			};
		(n.prev = { statics: o[t], methods: o.fn[t] }), n(e), (o[t] = l), (o.fn[
			t
		] = c);
	}
	var v = jQuery,
		T = v(window),
		w = v(document),
		S = v.extend,
		b = v.isFunction,
		x = Math.max,
		E = Math.min,
		k = Math.round,
		C = (function() {
			var t = {},
				e = 1;
			return function(i) {
				return i ? (t[i] || ((t[i] = e), (e += 1)), t[i]) : 0;
			};
		})();
	S(r.prototype, {
		equals: function(t) {
			return o(this, t, ["left", "top", "width", "height"]);
		},
		area: function() {
			return this.width * this.height;
		},
		relativeTo: function(t) {
			return new r(this.left - t.left, this.top - t.top, this.width, this.height);
		},
		intersection: function(t) {
			if (!e(t, r)) return null;
			var i = x(this.left, t.left),
				n = E(this.right, t.right),
				s = x(this.top, t.top),
				o = E(this.bottom, t.bottom),
				a = n - i,
				h = o - s;
			return a >= 0 && h >= 0 ? new r(i, s, a, h) : null;
		},
		envelope: function(t) {
			if (!e(t, r)) return this;
			var i = E(this.left, t.left),
				n = x(this.right, t.right),
				s = E(this.top, t.top),
				o = x(this.bottom, t.bottom),
				a = n - i,
				h = o - s;
			return new r(i, s, a, h);
		}
	}), S(r, {
		ofContent: function(t, e) {
			return t && t !== document && t !== window
				? e
					? new r(0, 0, t.scrollWidth, t.scrollHeight)
					: new r(
							t.offsetLeft - t.scrollLeft,
							t.offsetTop - t.scrollTop,
							t.scrollWidth,
							t.scrollHeight
						)
				: new r(0, 0, w.width(), w.height());
		},
		ofViewport: function(t, e) {
			return t && t !== document && t !== window
				? e
					? new r(t.scrollLeft, t.scrollTop, t.clientWidth, t.clientHeight)
					: new r(t.offsetLeft, t.offsetTop, t.clientWidth, t.clientHeight)
				: new r(T.scrollLeft(), T.scrollTop(), T.width(), T.height());
		},
		ofElement: function(t) {
			var e = v(t);
			if (!e.is(":visible")) return null;
			var i = e.offset();
			return new r(i.left, i.top, e.outerWidth(), e.outerHeight());
		}
	}), S(a.prototype, {
		equals: function(t) {
			return this.fracsEqual(t) && this.rectsEqual(t);
		},
		fracsEqual: function(t) {
			return o(this, t, ["visible", "viewport", "possible"]);
		},
		rectsEqual: function(t) {
			return o(this.rects, t.rects, ["document", "element", "viewport"]);
		}
	}), S(a, {
		of: function(t, e) {
			var n, s, o;
			return (t = (i(t) && r.ofElement(t)) || t), (e =
				(i(e) && r.ofViewport(e)) || e || r.ofViewport()), t instanceof r &&
				(n = t.intersection(e))
				? (
						(s = n.area()),
						(o = E(t.width, e.width) * E(t.height, e.height)),
						new a(s / t.area(), s / e.area(), s / o, {
							document: n,
							element: n.relativeTo(t),
							viewport: n.relativeTo(e)
						})
					)
				: new a();
		}
	});
	var $ = ["width", "height", "left", "right", "top", "bottom"],
		A = ["possible", "visible", "viewport"];
	S(h.prototype, {
		sorted: function(t, e) {
			var i = this.viewport;
			return v
				.map(this.els, function(e) {
					return { el: e, val: l(e, i, t) };
				})
				.sort(e ? u : c);
		},
		best: function(t, e) {
			return this.els.length ? this.sorted(t, e)[0] : null;
		}
	}), S(d.prototype, {
		equals: function(t) {
			return o(this, t, [
				"width",
				"height",
				"left",
				"top",
				"right",
				"bottom",
				"content",
				"viewport"
			]);
		}
	}), S(p.prototype, {
		equals: function(t) {
			return o(this, t, ["el"]);
		},
		scrollState: function() {
			return new d(this.el);
		},
		scrollTo: function(t, e, i) {
			var n = v(this.el === window ? "html,body" : this.el);
			(t = t || 0), (e = e || 0), (i = isNaN(i) ? 1e3 : i), n
				.stop(!0)
				.animate({ scrollLeft: t, scrollTop: e }, i);
		},
		scroll: function(t, e, i) {
			var n = this.el === window ? T : v(this.el);
			(t = t || 0), (e = e || 0), this.scrollTo(
				n.scrollLeft() + t,
				n.scrollTop() + e,
				i
			);
		},
		scrollToRect: function(t, e, i, n) {
			(e = e || 0), (i = i || 0), this.scrollTo(t.left - e, t.top - i, n);
		},
		scrollToElement: function(t, e, i, n) {
			var s = r.ofElement(t).relativeTo(r.ofContent(this.el));
			this.scrollToRect(s, e, i, n);
		}
	});
	var I = {
		init: function() {
			(this.callbacks = v.Callbacks(
				"memory unique"
			)), (this.currVal = null), (this.prevVal = null), (this.checkProxy = v.proxy(
				this.check,
				this
			)), this.autoCheck();
		},
		bind: function(t) {
			this.callbacks.add(t);
		},
		unbind: function(t) {
			t ? this.callbacks.remove(t) : this.callbacks.empty();
		},
		trigger: function() {
			this.callbacks.fireWith(this.context, [this.currVal, this.prevVal]);
		},
		check: function(t) {
			var e = this.updatedValue(t);
			return (
				void 0 !== e &&
				((this.prevVal = this.currVal), (this.currVal = e), this.trigger(), !0)
			);
		},
		$autoTarget: T,
		autoEvents: "load resize scroll",
		autoCheck: function(t) {
			this.$autoTarget[t === !1 ? "off" : "on"](this.autoEvents, this.checkProxy);
		}
	};
	S(f.prototype, I, {
		updatedValue: function() {
			var t = a.of(this.context, this.viewport);
			return this.currVal && this.currVal.equals(t) ? void 0 : t;
		}
	}), S(g.prototype, I, {
		updatedValue: function() {
			var t = this.context.best(this.property, this.descending);
			return t && ((t = t.val > 0 ? t.el : null), this.currVal !== t) ? t : void 0;
		}
	}), S(m.prototype, I, {
		updatedValue: function() {
			var t = new d(this.context);
			return this.currVal && this.currVal.equals(t) ? void 0 : t;
		}
	});
	var L = "fracs";
	y(L, {
		statics: {
			version: "0.15.1",
			Rect: r,
			Fractions: a,
			Group: h,
			ScrollState: d,
			Viewport: p,
			FracsCallbacks: f,
			GroupCallbacks: g,
			ScrollStateCallbacks: m,
			fracs: function(t, e) {
				return a.of(t, e);
			}
		},
		methods: {
			content: function(t) {
				return this.length ? r.ofContent(this[0], t) : null;
			},
			envelope: function() {
				return s(this, function(t) {
					var e = r.ofElement(this);
					return t ? t.envelope(e) : e;
				});
			},
			fracs: function(e, i, s) {
				t(e, "string") || ((s = i), (i = e), (e = null)), b(i) ||
					((s = i), (i = null)), (s = n(s));
				var o = L + ".fracs." + C(s);
				return "unbind" === e
					? this.each(function() {
							var t = v(this).data(o);
							t && t.unbind(i);
						})
					: "check" === e
						? this.each(function() {
								var t = v(this).data(o);
								t && t.check();
							})
						: b(i)
							? this.each(function() {
									var t = v(this),
										e = t.data(o);
									e || ((e = new f(this, s)), t.data(o, e)), e.bind(i);
								})
							: this.length ? a.of(this[0], s) : null;
			},
			intersection: function() {
				return s(this, function(t) {
					var e = r.ofElement(this);
					return t ? t.intersection(e) : e;
				});
			},
			max: function(t, e, i) {
				return b(e) || ((i = e), (e = null)), (i = n(i)), e
					? (new g(this, i, t, !0).bind(e), this)
					: this.pushStack(new h(this, i).best(t, !0).el);
			},
			min: function(t, e, i) {
				return b(e) || ((i = e), (e = null)), (i = n(i)), e
					? (new g(this, i, t).bind(e), this)
					: this.pushStack(new h(this, i).best(t).el);
			},
			rect: function() {
				return this.length ? r.ofElement(this[0]) : null;
			},
			scrollState: function(e, i) {
				var n = L + ".scrollState";
				return t(e, "string") || ((i = e), (e = null)), "unbind" === e
					? this.each(function() {
							var t = v(this).data(n);
							t && t.unbind(i);
						})
					: "check" === e
						? this.each(function() {
								var t = v(this).data(n);
								t && t.check();
							})
						: b(i)
							? this.each(function() {
									var t = v(this),
										e = t.data(n);
									e || ((e = new m(this)), t.data(n, e)), e.bind(i);
								})
							: this.length ? new d(this[0]) : null;
			},
			scroll: function(t, e, i) {
				return this.each(function() {
					new p(this).scroll(t, e, i);
				});
			},
			scrollTo: function(t, e, i, s) {
				return v.isNumeric(t) && ((s = i), (i = e), (e = t), (t = null)), (t = n(
					t
				)), this.each(function() {
					t
						? new p(this).scrollToElement(t, e, i, s)
						: new p(this).scrollTo(e, i, s);
				});
			},
			scrollToThis: function(t, e, i, s) {
				return (s = new p(n(s))), s.scrollToElement(this[0], t, e, i), this;
			},
			softLink: function(t, e, i, s) {
				return (s = new p(n(s))), this.filter("a[href^=#]").each(function() {
					var n = v(this);
					n.on("click", function() {
						s.scrollToElement(v(n.attr("href"))[0], t, e, i);
					});
				});
			},
			sort: function(e, i, s) {
				return t(i, "boolean") || ((s = i), (i = null)), (s = n(s)), this.pushStack(
					v.map(new h(this, s).sorted(e, !i), function(t) {
						return t.el;
					})
				);
			},
			viewport: function(t) {
				return this.length ? r.ofViewport(this[0], t) : null;
			}
		},
		defaultStatic: "fracs",
		defaultMethod: "fracs"
	});
})();
var $window = $(window),
	$top = $("#top"),
	$main = $("#main"),
	$homeSections = $(".HomeSection", $main),
	$menuToggle = $("#menuToggle"),
	$menuItemsWrapper = $("#menuItemsWrapper"),
	$bottomNav = $("#bottomNav", $main),
	$mostVisible = $("#top", $main),
	$sectionNavLinks = $(".SectionsNav-link", $main),
	mostVisibleID = "top",
	viewportHeight = $window.height(),
	viewportWidth = $window.width();
$(document).ready(function() {
	$("#body").removeClass("no-js"), $window.resize(function() {
		(viewportHeight = $window.height()), (viewportWidth = $window.width()), initScrollify();
	}), initTypeIt(), initCurrentMenuLink(), initSlick(), initScrollify(), initContactForm(), initSmoothScroll(), initMobileMenu();
});