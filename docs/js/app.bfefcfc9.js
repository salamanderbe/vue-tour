;(function(e) {
	function t(t) {
		for (var n, o, i = t[0], u = t[1], c = t[2], d = 0, p = []; d < i.length; d++) (o = i[d]), r[o] && p.push(r[o][0]), (r[o] = 0)
		for (n in u) Object.prototype.hasOwnProperty.call(u, n) && (e[n] = u[n])
		l && l(t)
		while (p.length) p.shift()()
		return s.push.apply(s, c || []), a()
	}
	function a() {
		for (var e, t = 0; t < s.length; t++) {
			for (var a = s[t], n = !0, i = 1; i < a.length; i++) {
				var u = a[i]
				0 !== r[u] && (n = !1)
			}
			n && (s.splice(t--, 1), (e = o((o.s = a[0]))))
		}
		return e
	}
	var n = {},
		r = { app: 0 },
		s = []
	function o(t) {
		if (n[t]) return n[t].exports
		var a = (n[t] = { i: t, l: !1, exports: {} })
		return e[t].call(a.exports, a, a.exports, o), (a.l = !0), a.exports
	}
	;(o.m = e),
		(o.c = n),
		(o.d = function(e, t, a) {
			o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: a })
		}),
		(o.r = function(e) {
			'undefined' !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }), Object.defineProperty(e, '__esModule', { value: !0 })
		}),
		(o.t = function(e, t) {
			if ((1 & t && (e = o(e)), 8 & t)) return e
			if (4 & t && 'object' === typeof e && e && e.__esModule) return e
			var a = Object.create(null)
			if ((o.r(a), Object.defineProperty(a, 'default', { enumerable: !0, value: e }), 2 & t && 'string' != typeof e))
				for (var n in e)
					o.d(
						a,
						n,
						function(t) {
							return e[t]
						}.bind(null, n)
					)
			return a
		}),
		(o.n = function(e) {
			var t =
				e && e.__esModule
					? function() {
							return e['default']
					  }
					: function() {
							return e
					  }
			return o.d(t, 'a', t), t
		}),
		(o.o = function(e, t) {
			return Object.prototype.hasOwnProperty.call(e, t)
		}),
		(o.p = '/')
	var i = (window['webpackJsonp'] = window['webpackJsonp'] || []),
		u = i.push.bind(i)
	;(i.push = t), (i = i.slice())
	for (var c = 0; c < i.length; c++) t(i[c])
	var l = u
	s.push([0, 'chunk-vendors']), a()
})({
	0: function(e, t, a) {
		e.exports = a('56d7')
	},
	'034f': function(e, t, a) {
		'use strict'
		var n = a('c21b'),
			r = a.n(n)
		r.a
	},
	'56d7': function(e, t, a) {
		'use strict'
		a.r(t)
		a('cadf'), a('551c'), a('097d')
		var n = a('2b0e'),
			r = function() {
				var e = this,
					t = e.$createElement,
					a = e._self._c || t
				return a('div', { attrs: { id: 'app' } }, [a('board')], 1)
			},
			s = [],
			o = function() {
				var e = this,
					t = e.$createElement,
					a = e._self._c || t
				return a(
					'div',
					{ attrs: { id: 'app' } },
					[
						a('board', {
							attrs: { items: e.items, lanes: e.lanes, hasUsers: !0, users: e.users },
							on: { 'item-updated': e.handleItemUpdated, 'item-clicked': e.handleItemClicked, 'item-created': e.handleItemCreated },
							scopedSlots: e._u([
								{
									key: 'default',
									fn: function(t) {
										return [
											a('div', { staticClass: 'kb-card-header' }, [a('p', { staticClass: 'kb-card-title' }, [e._v(e._s(t.data.summary))]), a('img', { staticClass: 'kb-card-image', attrs: { src: './logo.jpg' } })]),
											a('p', { staticClass: 'kb-card-description' }, [e._v(e._s(t.data.description))]),
											a('div', { staticClass: 'kb-card-footer' }, [
												a('span', { staticClass: 'left' }, [a('img', { attrs: { src: './check.svg' } }), e._v('2/5')]),
												a('span', { staticClass: 'left' }, [a('img', { attrs: { src: './bubble.svg' } }), e._v('5')]),
												a('span', { staticClass: 'right' }, [a('img', { attrs: { src: './clock.svg' } }), e._v('Tomorrow')])
											])
										]
									}
								}
							])
						})
					],
					1
				)
			},
			i = [],
			u = a('1290'),
			c = a.n(u),
			l = (a('045d'),
			{
				name: 'app',
				components: { Board: c.a },
				data: function() {
					return {
						lanes: [{ name: 'Todo', slug: 'todo' }, { name: 'In progress', slug: 'in-progress' }, { name: 'Done', slug: 'done' }],
						items: [
							{ status: 'todo', summary: 'This is a TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia quis     vel.' },
							{ status: 'todo', summary: 'This is a longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum lacinia     quis vel.' },
							{ status: 'todo', summary: 'This is an even longer TODO task', description: 'Quisque non tellus orci ac auctor augue mauris augue neque. Vitae tortor condimentum     lacinia quis vel.' }
						],
						users: [{ id: 1, image: './logo.jpg', name: 'Default user 1' }, { id: 2, image: './logo.jpg', name: 'Default user 2' }, { id: 3, image: './logo.jpg', name: 'Default     user 3' }]
					}
				}
			}),
			d = l,
			p = a('2877'),
			f = Object(p['a'])(d, o, i, !1, null, null, null)
		f.options.__file = 'board.vue'
		var m = f.exports,
			g = { name: 'app', components: { Board: m } },
			v = g,
			b = (a('034f'), Object(p['a'])(v, r, s, !1, null, null, null))
		b.options.__file = 'App.vue'
		var h = b.exports
		a('a1a3')
		;(n['default'].config.productionTip = !1),
			new n['default']({
				render: function(e) {
					return e(h)
				}
			}).$mount('#app')
	},
	a1a3: function(e, t, a) {},
	c21b: function(e, t, a) {}
})
//# sourceMappingURL=app.bfefcfc9.js.map
