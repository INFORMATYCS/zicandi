var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! jQuery v3.2.1 | (c) JS Foundation and other contributors | jquery.org/license */
!function (a, b) {
  "use strict";
  "object" == (typeof module === "undefined" ? "undefined" : _typeof(module)) && "object" == _typeof(module.exports) ? module.exports = a.document ? b(a, !0) : function (a) {
    if (!a.document) throw new Error("jQuery requires a window with a document");return b(a);
  } : b(a);
}("undefined" != typeof window ? window : this, function (a, b) {
  "use strict";
  var c = [],
      d = a.document,
      e = Object.getPrototypeOf,
      f = c.slice,
      g = c.concat,
      h = c.push,
      i = c.indexOf,
      j = {},
      k = j.toString,
      l = j.hasOwnProperty,
      m = l.toString,
      n = m.call(Object),
      o = {};function p(a, b) {
    b = b || d;var c = b.createElement("script");c.text = a, b.head.appendChild(c).parentNode.removeChild(c);
  }var q = "3.2.1",
      r = function r(a, b) {
    return new r.fn.init(a, b);
  },
      s = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
      t = /^-ms-/,
      u = /-([a-z])/g,
      v = function v(a, b) {
    return b.toUpperCase();
  };r.fn = r.prototype = { jquery: q, constructor: r, length: 0, toArray: function toArray() {
      return f.call(this);
    }, get: function get(a) {
      return null == a ? f.call(this) : a < 0 ? this[a + this.length] : this[a];
    }, pushStack: function pushStack(a) {
      var b = r.merge(this.constructor(), a);return b.prevObject = this, b;
    }, each: function each(a) {
      return r.each(this, a);
    }, map: function map(a) {
      return this.pushStack(r.map(this, function (b, c) {
        return a.call(b, c, b);
      }));
    }, slice: function slice() {
      return this.pushStack(f.apply(this, arguments));
    }, first: function first() {
      return this.eq(0);
    }, last: function last() {
      return this.eq(-1);
    }, eq: function eq(a) {
      var b = this.length,
          c = +a + (a < 0 ? b : 0);return this.pushStack(c >= 0 && c < b ? [this[c]] : []);
    }, end: function end() {
      return this.prevObject || this.constructor();
    }, push: h, sort: c.sort, splice: c.splice }, r.extend = r.fn.extend = function () {
    var a,
        b,
        c,
        d,
        e,
        f,
        g = arguments[0] || {},
        h = 1,
        i = arguments.length,
        j = !1;for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == (typeof g === "undefined" ? "undefined" : _typeof(g)) || r.isFunction(g) || (g = {}), h === i && (g = this, h--); h < i; h++) {
      if (null != (a = arguments[h])) for (b in a) {
        c = g[b], d = a[b], g !== d && (j && d && (r.isPlainObject(d) || (e = Array.isArray(d))) ? (e ? (e = !1, f = c && Array.isArray(c) ? c : []) : f = c && r.isPlainObject(c) ? c : {}, g[b] = r.extend(j, f, d)) : void 0 !== d && (g[b] = d));
      }
    }return g;
  }, r.extend({ expando: "jQuery" + (q + Math.random()).replace(/\D/g, ""), isReady: !0, error: function error(a) {
      throw new Error(a);
    }, noop: function noop() {}, isFunction: function isFunction(a) {
      return "function" === r.type(a);
    }, isWindow: function isWindow(a) {
      return null != a && a === a.window;
    }, isNumeric: function isNumeric(a) {
      var b = r.type(a);return ("number" === b || "string" === b) && !isNaN(a - parseFloat(a));
    }, isPlainObject: function isPlainObject(a) {
      var b, c;return !(!a || "[object Object]" !== k.call(a)) && (!(b = e(a)) || (c = l.call(b, "constructor") && b.constructor, "function" == typeof c && m.call(c) === n));
    }, isEmptyObject: function isEmptyObject(a) {
      var b;for (b in a) {
        return !1;
      }return !0;
    }, type: function type(a) {
      return null == a ? a + "" : "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a ? j[k.call(a)] || "object" : typeof a === "undefined" ? "undefined" : _typeof(a);
    }, globalEval: function globalEval(a) {
      p(a);
    }, camelCase: function camelCase(a) {
      return a.replace(t, "ms-").replace(u, v);
    }, each: function each(a, b) {
      var c,
          d = 0;if (w(a)) {
        for (c = a.length; d < c; d++) {
          if (b.call(a[d], d, a[d]) === !1) break;
        }
      } else for (d in a) {
        if (b.call(a[d], d, a[d]) === !1) break;
      }return a;
    }, trim: function trim(a) {
      return null == a ? "" : (a + "").replace(s, "");
    }, makeArray: function makeArray(a, b) {
      var c = b || [];return null != a && (w(Object(a)) ? r.merge(c, "string" == typeof a ? [a] : a) : h.call(c, a)), c;
    }, inArray: function inArray(a, b, c) {
      return null == b ? -1 : i.call(b, a, c);
    }, merge: function merge(a, b) {
      for (var c = +b.length, d = 0, e = a.length; d < c; d++) {
        a[e++] = b[d];
      }return a.length = e, a;
    }, grep: function grep(a, b, c) {
      for (var d, e = [], f = 0, g = a.length, h = !c; f < g; f++) {
        d = !b(a[f], f), d !== h && e.push(a[f]);
      }return e;
    }, map: function map(a, b, c) {
      var d,
          e,
          f = 0,
          h = [];if (w(a)) for (d = a.length; f < d; f++) {
        e = b(a[f], f, c), null != e && h.push(e);
      } else for (f in a) {
        e = b(a[f], f, c), null != e && h.push(e);
      }return g.apply([], h);
    }, guid: 1, proxy: function proxy(a, b) {
      var c, d, e;if ("string" == typeof b && (c = a[b], b = a, a = c), r.isFunction(a)) return d = f.call(arguments, 2), e = function e() {
        return a.apply(b || this, d.concat(f.call(arguments)));
      }, e.guid = a.guid = a.guid || r.guid++, e;
    }, now: Date.now, support: o }), "function" == typeof Symbol && (r.fn[Symbol.iterator] = c[Symbol.iterator]), r.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (a, b) {
    j["[object " + b + "]"] = b.toLowerCase();
  });function w(a) {
    var b = !!a && "length" in a && a.length,
        c = r.type(a);return "function" !== c && !r.isWindow(a) && ("array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a);
  }var x = function (a) {
    var b,
        c,
        d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l,
        m,
        n,
        o,
        p,
        q,
        r,
        s,
        t,
        u = "sizzle" + 1 * new Date(),
        v = a.document,
        w = 0,
        x = 0,
        y = ha(),
        z = ha(),
        A = ha(),
        B = function B(a, b) {
      return a === b && (l = !0), 0;
    },
        C = {}.hasOwnProperty,
        D = [],
        E = D.pop,
        F = D.push,
        G = D.push,
        H = D.slice,
        I = function I(a, b) {
      for (var c = 0, d = a.length; c < d; c++) {
        if (a[c] === b) return c;
      }return -1;
    },
        J = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
        K = "[\\x20\\t\\r\\n\\f]",
        L = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
        M = "\\[" + K + "*(" + L + ")(?:" + K + "*([*^$|!~]?=)" + K + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + L + "))|)" + K + "*\\]",
        N = ":(" + L + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
        O = new RegExp(K + "+", "g"),
        P = new RegExp("^" + K + "+|((?:^|[^\\\\])(?:\\\\.)*)" + K + "+$", "g"),
        Q = new RegExp("^" + K + "*," + K + "*"),
        R = new RegExp("^" + K + "*([>+~]|" + K + ")" + K + "*"),
        S = new RegExp("=" + K + "*([^\\]'\"]*?)" + K + "*\\]", "g"),
        T = new RegExp(N),
        U = new RegExp("^" + L + "$"),
        V = { ID: new RegExp("^#(" + L + ")"), CLASS: new RegExp("^\\.(" + L + ")"), TAG: new RegExp("^(" + L + "|[*])"), ATTR: new RegExp("^" + M), PSEUDO: new RegExp("^" + N), CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + K + "*(even|odd|(([+-]|)(\\d*)n|)" + K + "*(?:([+-]|)" + K + "*(\\d+)|))" + K + "*\\)|)", "i"), bool: new RegExp("^(?:" + J + ")$", "i"), needsContext: new RegExp("^" + K + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + K + "*((?:-\\d)?\\d*)" + K + "*\\)|)(?=[^-]|$)", "i") },
        W = /^(?:input|select|textarea|button)$/i,
        X = /^h\d$/i,
        Y = /^[^{]+\{\s*\[native \w/,
        Z = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        $ = /[+~]/,
        _ = new RegExp("\\\\([\\da-f]{1,6}" + K + "?|(" + K + ")|.)", "ig"),
        aa = function aa(a, b, c) {
      var d = "0x" + b - 65536;return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320);
    },
        ba = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        ca = function ca(a, b) {
      return b ? "\0" === a ? "\uFFFD" : a.slice(0, -1) + "\\" + a.charCodeAt(a.length - 1).toString(16) + " " : "\\" + a;
    },
        da = function da() {
      m();
    },
        ea = ta(function (a) {
      return a.disabled === !0 && ("form" in a || "label" in a);
    }, { dir: "parentNode", next: "legend" });try {
      G.apply(D = H.call(v.childNodes), v.childNodes), D[v.childNodes.length].nodeType;
    } catch (fa) {
      G = { apply: D.length ? function (a, b) {
          F.apply(a, H.call(b));
        } : function (a, b) {
          var c = a.length,
              d = 0;while (a[c++] = b[d++]) {}a.length = c - 1;
        } };
    }function ga(a, b, d, e) {
      var f,
          h,
          j,
          k,
          l,
          o,
          r,
          s = b && b.ownerDocument,
          w = b ? b.nodeType : 9;if (d = d || [], "string" != typeof a || !a || 1 !== w && 9 !== w && 11 !== w) return d;if (!e && ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, p)) {
        if (11 !== w && (l = Z.exec(a))) if (f = l[1]) {
          if (9 === w) {
            if (!(j = b.getElementById(f))) return d;if (j.id === f) return d.push(j), d;
          } else if (s && (j = s.getElementById(f)) && t(b, j) && j.id === f) return d.push(j), d;
        } else {
          if (l[2]) return G.apply(d, b.getElementsByTagName(a)), d;if ((f = l[3]) && c.getElementsByClassName && b.getElementsByClassName) return G.apply(d, b.getElementsByClassName(f)), d;
        }if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
          if (1 !== w) s = b, r = a;else if ("object" !== b.nodeName.toLowerCase()) {
            (k = b.getAttribute("id")) ? k = k.replace(ba, ca) : b.setAttribute("id", k = u), o = g(a), h = o.length;while (h--) {
              o[h] = "#" + k + " " + sa(o[h]);
            }r = o.join(","), s = $.test(a) && qa(b.parentNode) || b;
          }if (r) try {
            return G.apply(d, s.querySelectorAll(r)), d;
          } catch (x) {} finally {
            k === u && b.removeAttribute("id");
          }
        }
      }return i(a.replace(P, "$1"), b, d, e);
    }function ha() {
      var a = [];function b(c, e) {
        return a.push(c + " ") > d.cacheLength && delete b[a.shift()], b[c + " "] = e;
      }return b;
    }function ia(a) {
      return a[u] = !0, a;
    }function ja(a) {
      var b = n.createElement("fieldset");try {
        return !!a(b);
      } catch (c) {
        return !1;
      } finally {
        b.parentNode && b.parentNode.removeChild(b), b = null;
      }
    }function ka(a, b) {
      var c = a.split("|"),
          e = c.length;while (e--) {
        d.attrHandle[c[e]] = b;
      }
    }function la(a, b) {
      var c = b && a,
          d = c && 1 === a.nodeType && 1 === b.nodeType && a.sourceIndex - b.sourceIndex;if (d) return d;if (c) while (c = c.nextSibling) {
        if (c === b) return -1;
      }return a ? 1 : -1;
    }function ma(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return "input" === c && b.type === a;
      };
    }function na(a) {
      return function (b) {
        var c = b.nodeName.toLowerCase();return ("input" === c || "button" === c) && b.type === a;
      };
    }function oa(a) {
      return function (b) {
        return "form" in b ? b.parentNode && b.disabled === !1 ? "label" in b ? "label" in b.parentNode ? b.parentNode.disabled === a : b.disabled === a : b.isDisabled === a || b.isDisabled !== !a && ea(b) === a : b.disabled === a : "label" in b && b.disabled === a;
      };
    }function pa(a) {
      return ia(function (b) {
        return b = +b, ia(function (c, d) {
          var e,
              f = a([], c.length, b),
              g = f.length;while (g--) {
            c[e = f[g]] && (c[e] = !(d[e] = c[e]));
          }
        });
      });
    }function qa(a) {
      return a && "undefined" != typeof a.getElementsByTagName && a;
    }c = ga.support = {}, f = ga.isXML = function (a) {
      var b = a && (a.ownerDocument || a).documentElement;return !!b && "HTML" !== b.nodeName;
    }, m = ga.setDocument = function (a) {
      var b,
          e,
          g = a ? a.ownerDocument || a : v;return g !== n && 9 === g.nodeType && g.documentElement ? (n = g, o = n.documentElement, p = !f(n), v !== n && (e = n.defaultView) && e.top !== e && (e.addEventListener ? e.addEventListener("unload", da, !1) : e.attachEvent && e.attachEvent("onunload", da)), c.attributes = ja(function (a) {
        return a.className = "i", !a.getAttribute("className");
      }), c.getElementsByTagName = ja(function (a) {
        return a.appendChild(n.createComment("")), !a.getElementsByTagName("*").length;
      }), c.getElementsByClassName = Y.test(n.getElementsByClassName), c.getById = ja(function (a) {
        return o.appendChild(a).id = u, !n.getElementsByName || !n.getElementsByName(u).length;
      }), c.getById ? (d.filter.ID = function (a) {
        var b = a.replace(_, aa);return function (a) {
          return a.getAttribute("id") === b;
        };
      }, d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c = b.getElementById(a);return c ? [c] : [];
        }
      }) : (d.filter.ID = function (a) {
        var b = a.replace(_, aa);return function (a) {
          var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");return c && c.value === b;
        };
      }, d.find.ID = function (a, b) {
        if ("undefined" != typeof b.getElementById && p) {
          var c,
              d,
              e,
              f = b.getElementById(a);if (f) {
            if (c = f.getAttributeNode("id"), c && c.value === a) return [f];e = b.getElementsByName(a), d = 0;while (f = e[d++]) {
              if (c = f.getAttributeNode("id"), c && c.value === a) return [f];
            }
          }return [];
        }
      }), d.find.TAG = c.getElementsByTagName ? function (a, b) {
        return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : c.qsa ? b.querySelectorAll(a) : void 0;
      } : function (a, b) {
        var c,
            d = [],
            e = 0,
            f = b.getElementsByTagName(a);if ("*" === a) {
          while (c = f[e++]) {
            1 === c.nodeType && d.push(c);
          }return d;
        }return f;
      }, d.find.CLASS = c.getElementsByClassName && function (a, b) {
        if ("undefined" != typeof b.getElementsByClassName && p) return b.getElementsByClassName(a);
      }, r = [], q = [], (c.qsa = Y.test(n.querySelectorAll)) && (ja(function (a) {
        o.appendChild(a).innerHTML = "<a id='" + u + "'></a><select id='" + u + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + K + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || q.push("\\[" + K + "*(?:value|" + J + ")"), a.querySelectorAll("[id~=" + u + "-]").length || q.push("~="), a.querySelectorAll(":checked").length || q.push(":checked"), a.querySelectorAll("a#" + u + "+*").length || q.push(".#.+[+~]");
      }), ja(function (a) {
        a.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";var b = n.createElement("input");b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && q.push("name" + K + "*[*^$|!~]?="), 2 !== a.querySelectorAll(":enabled").length && q.push(":enabled", ":disabled"), o.appendChild(a).disabled = !0, 2 !== a.querySelectorAll(":disabled").length && q.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), q.push(",.*:");
      })), (c.matchesSelector = Y.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ja(function (a) {
        c.disconnectedMatch = s.call(a, "*"), s.call(a, "[s!='']:x"), r.push("!=", N);
      }), q = q.length && new RegExp(q.join("|")), r = r.length && new RegExp(r.join("|")), b = Y.test(o.compareDocumentPosition), t = b || Y.test(o.contains) ? function (a, b) {
        var c = 9 === a.nodeType ? a.documentElement : a,
            d = b && b.parentNode;return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
      } : function (a, b) {
        if (b) while (b = b.parentNode) {
          if (b === a) return !0;
        }return !1;
      }, B = b ? function (a, b) {
        if (a === b) return l = !0, 0;var d = !a.compareDocumentPosition - !b.compareDocumentPosition;return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === n || a.ownerDocument === v && t(v, a) ? -1 : b === n || b.ownerDocument === v && t(v, b) ? 1 : k ? I(k, a) - I(k, b) : 0 : 4 & d ? -1 : 1);
      } : function (a, b) {
        if (a === b) return l = !0, 0;var c,
            d = 0,
            e = a.parentNode,
            f = b.parentNode,
            g = [a],
            h = [b];if (!e || !f) return a === n ? -1 : b === n ? 1 : e ? -1 : f ? 1 : k ? I(k, a) - I(k, b) : 0;if (e === f) return la(a, b);c = a;while (c = c.parentNode) {
          g.unshift(c);
        }c = b;while (c = c.parentNode) {
          h.unshift(c);
        }while (g[d] === h[d]) {
          d++;
        }return d ? la(g[d], h[d]) : g[d] === v ? -1 : h[d] === v ? 1 : 0;
      }, n) : n;
    }, ga.matches = function (a, b) {
      return ga(a, null, null, b);
    }, ga.matchesSelector = function (a, b) {
      if ((a.ownerDocument || a) !== n && m(a), b = b.replace(S, "='$1']"), c.matchesSelector && p && !A[b + " "] && (!r || !r.test(b)) && (!q || !q.test(b))) try {
        var d = s.call(a, b);if (d || c.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d;
      } catch (e) {}return ga(b, n, null, [a]).length > 0;
    }, ga.contains = function (a, b) {
      return (a.ownerDocument || a) !== n && m(a), t(a, b);
    }, ga.attr = function (a, b) {
      (a.ownerDocument || a) !== n && m(a);var e = d.attrHandle[b.toLowerCase()],
          f = e && C.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0;return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
    }, ga.escape = function (a) {
      return (a + "").replace(ba, ca);
    }, ga.error = function (a) {
      throw new Error("Syntax error, unrecognized expression: " + a);
    }, ga.uniqueSort = function (a) {
      var b,
          d = [],
          e = 0,
          f = 0;if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) {
        while (b = a[f++]) {
          b === a[f] && (e = d.push(f));
        }while (e--) {
          a.splice(d[e], 1);
        }
      }return k = null, a;
    }, e = ga.getText = function (a) {
      var b,
          c = "",
          d = 0,
          f = a.nodeType;if (f) {
        if (1 === f || 9 === f || 11 === f) {
          if ("string" == typeof a.textContent) return a.textContent;for (a = a.firstChild; a; a = a.nextSibling) {
            c += e(a);
          }
        } else if (3 === f || 4 === f) return a.nodeValue;
      } else while (b = a[d++]) {
        c += e(b);
      }return c;
    }, d = ga.selectors = { cacheLength: 50, createPseudo: ia, match: V, attrHandle: {}, find: {}, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(a) {
          return a[1] = a[1].replace(_, aa), a[3] = (a[3] || a[4] || a[5] || "").replace(_, aa), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4);
        }, CHILD: function CHILD(a) {
          return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || ga.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && ga.error(a[0]), a;
        }, PSEUDO: function PSEUDO(a) {
          var b,
              c = !a[6] && a[2];return V.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && T.test(c) && (b = g(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
        } }, filter: { TAG: function TAG(a) {
          var b = a.replace(_, aa).toLowerCase();return "*" === a ? function () {
            return !0;
          } : function (a) {
            return a.nodeName && a.nodeName.toLowerCase() === b;
          };
        }, CLASS: function CLASS(a) {
          var b = y[a + " "];return b || (b = new RegExp("(^|" + K + ")" + a + "(" + K + "|$)")) && y(a, function (a) {
            return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "");
          });
        }, ATTR: function ATTR(a, b, c) {
          return function (d) {
            var e = ga.attr(d, a);return null == e ? "!=" === b : !b || (e += "", "=" === b ? e === c : "!=" === b ? e !== c : "^=" === b ? c && 0 === e.indexOf(c) : "*=" === b ? c && e.indexOf(c) > -1 : "$=" === b ? c && e.slice(-c.length) === c : "~=" === b ? (" " + e.replace(O, " ") + " ").indexOf(c) > -1 : "|=" === b && (e === c || e.slice(0, c.length + 1) === c + "-"));
          };
        }, CHILD: function CHILD(a, b, c, d, e) {
          var f = "nth" !== a.slice(0, 3),
              g = "last" !== a.slice(-4),
              h = "of-type" === b;return 1 === d && 0 === e ? function (a) {
            return !!a.parentNode;
          } : function (b, c, i) {
            var j,
                k,
                l,
                m,
                n,
                o,
                p = f !== g ? "nextSibling" : "previousSibling",
                q = b.parentNode,
                r = h && b.nodeName.toLowerCase(),
                s = !i && !h,
                t = !1;if (q) {
              if (f) {
                while (p) {
                  m = b;while (m = m[p]) {
                    if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                  }o = p = "only" === a && !o && "nextSibling";
                }return !0;
              }if (o = [g ? q.firstChild : q.lastChild], g && s) {
                m = q, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n && j[2], m = n && q.childNodes[n];while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
                  if (1 === m.nodeType && ++t && m === b) {
                    k[a] = [w, n, t];break;
                  }
                }
              } else if (s && (m = b, l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === w && j[1], t = n), t === !1) while (m = ++n && m && m[p] || (t = n = 0) || o.pop()) {
                if ((h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) && ++t && (s && (l = m[u] || (m[u] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [w, t]), m === b)) break;
              }return t -= e, t === d || t % d === 0 && t / d >= 0;
            }
          };
        }, PSEUDO: function PSEUDO(a, b) {
          var c,
              e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || ga.error("unsupported pseudo: " + a);return e[u] ? e(b) : e.length > 1 ? (c = [a, a, "", b], d.setFilters.hasOwnProperty(a.toLowerCase()) ? ia(function (a, c) {
            var d,
                f = e(a, b),
                g = f.length;while (g--) {
              d = I(a, f[g]), a[d] = !(c[d] = f[g]);
            }
          }) : function (a) {
            return e(a, 0, c);
          }) : e;
        } }, pseudos: { not: ia(function (a) {
          var b = [],
              c = [],
              d = h(a.replace(P, "$1"));return d[u] ? ia(function (a, b, c, e) {
            var f,
                g = d(a, null, e, []),
                h = a.length;while (h--) {
              (f = g[h]) && (a[h] = !(b[h] = f));
            }
          }) : function (a, e, f) {
            return b[0] = a, d(b, null, f, c), b[0] = null, !c.pop();
          };
        }), has: ia(function (a) {
          return function (b) {
            return ga(a, b).length > 0;
          };
        }), contains: ia(function (a) {
          return a = a.replace(_, aa), function (b) {
            return (b.textContent || b.innerText || e(b)).indexOf(a) > -1;
          };
        }), lang: ia(function (a) {
          return U.test(a || "") || ga.error("unsupported lang: " + a), a = a.replace(_, aa).toLowerCase(), function (b) {
            var c;do {
              if (c = p ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
            } while ((b = b.parentNode) && 1 === b.nodeType);return !1;
          };
        }), target: function target(b) {
          var c = a.location && a.location.hash;return c && c.slice(1) === b.id;
        }, root: function root(a) {
          return a === o;
        }, focus: function focus(a) {
          return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex);
        }, enabled: oa(!1), disabled: oa(!0), checked: function checked(a) {
          var b = a.nodeName.toLowerCase();return "input" === b && !!a.checked || "option" === b && !!a.selected;
        }, selected: function selected(a) {
          return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
        }, empty: function empty(a) {
          for (a = a.firstChild; a; a = a.nextSibling) {
            if (a.nodeType < 6) return !1;
          }return !0;
        }, parent: function parent(a) {
          return !d.pseudos.empty(a);
        }, header: function header(a) {
          return X.test(a.nodeName);
        }, input: function input(a) {
          return W.test(a.nodeName);
        }, button: function button(a) {
          var b = a.nodeName.toLowerCase();return "input" === b && "button" === a.type || "button" === b;
        }, text: function text(a) {
          var b;return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase());
        }, first: pa(function () {
          return [0];
        }), last: pa(function (a, b) {
          return [b - 1];
        }), eq: pa(function (a, b, c) {
          return [c < 0 ? c + b : c];
        }), even: pa(function (a, b) {
          for (var c = 0; c < b; c += 2) {
            a.push(c);
          }return a;
        }), odd: pa(function (a, b) {
          for (var c = 1; c < b; c += 2) {
            a.push(c);
          }return a;
        }), lt: pa(function (a, b, c) {
          for (var d = c < 0 ? c + b : c; --d >= 0;) {
            a.push(d);
          }return a;
        }), gt: pa(function (a, b, c) {
          for (var d = c < 0 ? c + b : c; ++d < b;) {
            a.push(d);
          }return a;
        }) } }, d.pseudos.nth = d.pseudos.eq;for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 }) {
      d.pseudos[b] = ma(b);
    }for (b in { submit: !0, reset: !0 }) {
      d.pseudos[b] = na(b);
    }function ra() {}ra.prototype = d.filters = d.pseudos, d.setFilters = new ra(), g = ga.tokenize = function (a, b) {
      var c,
          e,
          f,
          g,
          h,
          i,
          j,
          k = z[a + " "];if (k) return b ? 0 : k.slice(0);h = a, i = [], j = d.preFilter;while (h) {
        c && !(e = Q.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = R.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(P, " ") }), h = h.slice(c.length));for (g in d.filter) {
          !(e = V[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length));
        }if (!c) break;
      }return b ? h.length : h ? ga.error(a) : z(a, i).slice(0);
    };function sa(a) {
      for (var b = 0, c = a.length, d = ""; b < c; b++) {
        d += a[b].value;
      }return d;
    }function ta(a, b, c) {
      var d = b.dir,
          e = b.next,
          f = e || d,
          g = c && "parentNode" === f,
          h = x++;return b.first ? function (b, c, e) {
        while (b = b[d]) {
          if (1 === b.nodeType || g) return a(b, c, e);
        }return !1;
      } : function (b, c, i) {
        var j,
            k,
            l,
            m = [w, h];if (i) {
          while (b = b[d]) {
            if ((1 === b.nodeType || g) && a(b, c, i)) return !0;
          }
        } else while (b = b[d]) {
          if (1 === b.nodeType || g) if (l = b[u] || (b[u] = {}), k = l[b.uniqueID] || (l[b.uniqueID] = {}), e && e === b.nodeName.toLowerCase()) b = b[d] || b;else {
            if ((j = k[f]) && j[0] === w && j[1] === h) return m[2] = j[2];if (k[f] = m, m[2] = a(b, c, i)) return !0;
          }
        }return !1;
      };
    }function ua(a) {
      return a.length > 1 ? function (b, c, d) {
        var e = a.length;while (e--) {
          if (!a[e](b, c, d)) return !1;
        }return !0;
      } : a[0];
    }function va(a, b, c) {
      for (var d = 0, e = b.length; d < e; d++) {
        ga(a, b[d], c);
      }return c;
    }function wa(a, b, c, d, e) {
      for (var f, g = [], h = 0, i = a.length, j = null != b; h < i; h++) {
        (f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
      }return g;
    }function xa(a, b, c, d, e, f) {
      return d && !d[u] && (d = xa(d)), e && !e[u] && (e = xa(e, f)), ia(function (f, g, h, i) {
        var j,
            k,
            l,
            m = [],
            n = [],
            o = g.length,
            p = f || va(b || "*", h.nodeType ? [h] : h, []),
            q = !a || !f && b ? p : wa(p, m, a, h, i),
            r = c ? e || (f ? a : o || d) ? [] : g : q;if (c && c(q, r, h, i), d) {
          j = wa(r, n), d(j, [], h, i), k = j.length;while (k--) {
            (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
          }
        }if (f) {
          if (e || a) {
            if (e) {
              j = [], k = r.length;while (k--) {
                (l = r[k]) && j.push(q[k] = l);
              }e(null, r = [], j, i);
            }k = r.length;while (k--) {
              (l = r[k]) && (j = e ? I(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l));
            }
          }
        } else r = wa(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : G.apply(g, r);
      });
    }function ya(a) {
      for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[" "], i = g ? 1 : 0, k = ta(function (a) {
        return a === b;
      }, h, !0), l = ta(function (a) {
        return I(b, a) > -1;
      }, h, !0), m = [function (a, c, d) {
        var e = !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d));return b = null, e;
      }]; i < f; i++) {
        if (c = d.relative[a[i].type]) m = [ta(ua(m), c)];else {
          if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) {
            for (e = ++i; e < f; e++) {
              if (d.relative[a[e].type]) break;
            }return xa(i > 1 && ua(m), i > 1 && sa(a.slice(0, i - 1).concat({ value: " " === a[i - 2].type ? "*" : "" })).replace(P, "$1"), c, i < e && ya(a.slice(i, e)), e < f && ya(a = a.slice(e)), e < f && sa(a));
          }m.push(c);
        }
      }return ua(m);
    }function za(a, b) {
      var c = b.length > 0,
          e = a.length > 0,
          f = function f(_f, g, h, i, k) {
        var l,
            o,
            q,
            r = 0,
            s = "0",
            t = _f && [],
            u = [],
            v = j,
            x = _f || e && d.find.TAG("*", k),
            y = w += null == v ? 1 : Math.random() || .1,
            z = x.length;for (k && (j = g === n || g || k); s !== z && null != (l = x[s]); s++) {
          if (e && l) {
            o = 0, g || l.ownerDocument === n || (m(l), h = !p);while (q = a[o++]) {
              if (q(l, g || n, h)) {
                i.push(l);break;
              }
            }k && (w = y);
          }c && ((l = !q && l) && r--, _f && t.push(l));
        }if (r += s, c && s !== r) {
          o = 0;while (q = b[o++]) {
            q(t, u, g, h);
          }if (_f) {
            if (r > 0) while (s--) {
              t[s] || u[s] || (u[s] = E.call(i));
            }u = wa(u);
          }G.apply(i, u), k && !_f && u.length > 0 && r + b.length > 1 && ga.uniqueSort(i);
        }return k && (w = y, j = v), t;
      };return c ? ia(f) : f;
    }return h = ga.compile = function (a, b) {
      var c,
          d = [],
          e = [],
          f = A[a + " "];if (!f) {
        b || (b = g(a)), c = b.length;while (c--) {
          f = ya(b[c]), f[u] ? d.push(f) : e.push(f);
        }f = A(a, za(e, d)), f.selector = a;
      }return f;
    }, i = ga.select = function (a, b, c, e) {
      var f,
          i,
          j,
          k,
          l,
          m = "function" == typeof a && a,
          n = !e && g(a = m.selector || a);if (c = c || [], 1 === n.length) {
        if (i = n[0] = n[0].slice(0), i.length > 2 && "ID" === (j = i[0]).type && 9 === b.nodeType && p && d.relative[i[1].type]) {
          if (b = (d.find.ID(j.matches[0].replace(_, aa), b) || [])[0], !b) return c;m && (b = b.parentNode), a = a.slice(i.shift().value.length);
        }f = V.needsContext.test(a) ? 0 : i.length;while (f--) {
          if (j = i[f], d.relative[k = j.type]) break;if ((l = d.find[k]) && (e = l(j.matches[0].replace(_, aa), $.test(i[0].type) && qa(b.parentNode) || b))) {
            if (i.splice(f, 1), a = e.length && sa(i), !a) return G.apply(c, e), c;break;
          }
        }
      }return (m || h(a, n))(e, b, !p, c, !b || $.test(a) && qa(b.parentNode) || b), c;
    }, c.sortStable = u.split("").sort(B).join("") === u, c.detectDuplicates = !!l, m(), c.sortDetached = ja(function (a) {
      return 1 & a.compareDocumentPosition(n.createElement("fieldset"));
    }), ja(function (a) {
      return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href");
    }) || ka("type|href|height|width", function (a, b, c) {
      if (!c) return a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
    }), c.attributes && ja(function (a) {
      return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value");
    }) || ka("value", function (a, b, c) {
      if (!c && "input" === a.nodeName.toLowerCase()) return a.defaultValue;
    }), ja(function (a) {
      return null == a.getAttribute("disabled");
    }) || ka(J, function (a, b, c) {
      var d;if (!c) return a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null;
    }), ga;
  }(a);r.find = x, r.expr = x.selectors, r.expr[":"] = r.expr.pseudos, r.uniqueSort = r.unique = x.uniqueSort, r.text = x.getText, r.isXMLDoc = x.isXML, r.contains = x.contains, r.escapeSelector = x.escape;var y = function y(a, b, c) {
    var d = [],
        e = void 0 !== c;while ((a = a[b]) && 9 !== a.nodeType) {
      if (1 === a.nodeType) {
        if (e && r(a).is(c)) break;d.push(a);
      }
    }return d;
  },
      z = function z(a, b) {
    for (var c = []; a; a = a.nextSibling) {
      1 === a.nodeType && a !== b && c.push(a);
    }return c;
  },
      A = r.expr.match.needsContext;function B(a, b) {
    return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase();
  }var C = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
      D = /^.[^:#\[\.,]*$/;function E(a, b, c) {
    return r.isFunction(b) ? r.grep(a, function (a, d) {
      return !!b.call(a, d, a) !== c;
    }) : b.nodeType ? r.grep(a, function (a) {
      return a === b !== c;
    }) : "string" != typeof b ? r.grep(a, function (a) {
      return i.call(b, a) > -1 !== c;
    }) : D.test(b) ? r.filter(b, a, c) : (b = r.filter(b, a), r.grep(a, function (a) {
      return i.call(b, a) > -1 !== c && 1 === a.nodeType;
    }));
  }r.filter = function (a, b, c) {
    var d = b[0];return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? r.find.matchesSelector(d, a) ? [d] : [] : r.find.matches(a, r.grep(b, function (a) {
      return 1 === a.nodeType;
    }));
  }, r.fn.extend({ find: function find(a) {
      var b,
          c,
          d = this.length,
          e = this;if ("string" != typeof a) return this.pushStack(r(a).filter(function () {
        for (b = 0; b < d; b++) {
          if (r.contains(e[b], this)) return !0;
        }
      }));for (c = this.pushStack([]), b = 0; b < d; b++) {
        r.find(a, e[b], c);
      }return d > 1 ? r.uniqueSort(c) : c;
    }, filter: function filter(a) {
      return this.pushStack(E(this, a || [], !1));
    }, not: function not(a) {
      return this.pushStack(E(this, a || [], !0));
    }, is: function is(a) {
      return !!E(this, "string" == typeof a && A.test(a) ? r(a) : a || [], !1).length;
    } });var F,
      G = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
      H = r.fn.init = function (a, b, c) {
    var e, f;if (!a) return this;if (c = c || F, "string" == typeof a) {
      if (e = "<" === a[0] && ">" === a[a.length - 1] && a.length >= 3 ? [null, a, null] : G.exec(a), !e || !e[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);if (e[1]) {
        if (b = b instanceof r ? b[0] : b, r.merge(this, r.parseHTML(e[1], b && b.nodeType ? b.ownerDocument || b : d, !0)), C.test(e[1]) && r.isPlainObject(b)) for (e in b) {
          r.isFunction(this[e]) ? this[e](b[e]) : this.attr(e, b[e]);
        }return this;
      }return f = d.getElementById(e[2]), f && (this[0] = f, this.length = 1), this;
    }return a.nodeType ? (this[0] = a, this.length = 1, this) : r.isFunction(a) ? void 0 !== c.ready ? c.ready(a) : a(r) : r.makeArray(a, this);
  };H.prototype = r.fn, F = r(d);var I = /^(?:parents|prev(?:Until|All))/,
      J = { children: !0, contents: !0, next: !0, prev: !0 };r.fn.extend({ has: function has(a) {
      var b = r(a, this),
          c = b.length;return this.filter(function () {
        for (var a = 0; a < c; a++) {
          if (r.contains(this, b[a])) return !0;
        }
      });
    }, closest: function closest(a, b) {
      var c,
          d = 0,
          e = this.length,
          f = [],
          g = "string" != typeof a && r(a);if (!A.test(a)) for (; d < e; d++) {
        for (c = this[d]; c && c !== b; c = c.parentNode) {
          if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && r.find.matchesSelector(c, a))) {
            f.push(c);break;
          }
        }
      }return this.pushStack(f.length > 1 ? r.uniqueSort(f) : f);
    }, index: function index(a) {
      return a ? "string" == typeof a ? i.call(r(a), this[0]) : i.call(this, a.jquery ? a[0] : a) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
    }, add: function add(a, b) {
      return this.pushStack(r.uniqueSort(r.merge(this.get(), r(a, b))));
    }, addBack: function addBack(a) {
      return this.add(null == a ? this.prevObject : this.prevObject.filter(a));
    } });function K(a, b) {
    while ((a = a[b]) && 1 !== a.nodeType) {}return a;
  }r.each({ parent: function parent(a) {
      var b = a.parentNode;return b && 11 !== b.nodeType ? b : null;
    }, parents: function parents(a) {
      return y(a, "parentNode");
    }, parentsUntil: function parentsUntil(a, b, c) {
      return y(a, "parentNode", c);
    }, next: function next(a) {
      return K(a, "nextSibling");
    }, prev: function prev(a) {
      return K(a, "previousSibling");
    }, nextAll: function nextAll(a) {
      return y(a, "nextSibling");
    }, prevAll: function prevAll(a) {
      return y(a, "previousSibling");
    }, nextUntil: function nextUntil(a, b, c) {
      return y(a, "nextSibling", c);
    }, prevUntil: function prevUntil(a, b, c) {
      return y(a, "previousSibling", c);
    }, siblings: function siblings(a) {
      return z((a.parentNode || {}).firstChild, a);
    }, children: function children(a) {
      return z(a.firstChild);
    }, contents: function contents(a) {
      return B(a, "iframe") ? a.contentDocument : (B(a, "template") && (a = a.content || a), r.merge([], a.childNodes));
    } }, function (a, b) {
    r.fn[a] = function (c, d) {
      var e = r.map(this, b, c);return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = r.filter(d, e)), this.length > 1 && (J[a] || r.uniqueSort(e), I.test(a) && e.reverse()), this.pushStack(e);
    };
  });var L = /[^\x20\t\r\n\f]+/g;function M(a) {
    var b = {};return r.each(a.match(L) || [], function (a, c) {
      b[c] = !0;
    }), b;
  }r.Callbacks = function (a) {
    a = "string" == typeof a ? M(a) : r.extend({}, a);var b,
        c,
        d,
        e,
        f = [],
        g = [],
        h = -1,
        i = function i() {
      for (e = e || a.once, d = b = !0; g.length; h = -1) {
        c = g.shift();while (++h < f.length) {
          f[h].apply(c[0], c[1]) === !1 && a.stopOnFalse && (h = f.length, c = !1);
        }
      }a.memory || (c = !1), b = !1, e && (f = c ? [] : "");
    },
        j = { add: function add() {
        return f && (c && !b && (h = f.length - 1, g.push(c)), function d(b) {
          r.each(b, function (b, c) {
            r.isFunction(c) ? a.unique && j.has(c) || f.push(c) : c && c.length && "string" !== r.type(c) && d(c);
          });
        }(arguments), c && !b && i()), this;
      }, remove: function remove() {
        return r.each(arguments, function (a, b) {
          var c;while ((c = r.inArray(b, f, c)) > -1) {
            f.splice(c, 1), c <= h && h--;
          }
        }), this;
      }, has: function has(a) {
        return a ? r.inArray(a, f) > -1 : f.length > 0;
      }, empty: function empty() {
        return f && (f = []), this;
      }, disable: function disable() {
        return e = g = [], f = c = "", this;
      }, disabled: function disabled() {
        return !f;
      }, lock: function lock() {
        return e = g = [], c || b || (f = c = ""), this;
      }, locked: function locked() {
        return !!e;
      }, fireWith: function fireWith(a, c) {
        return e || (c = c || [], c = [a, c.slice ? c.slice() : c], g.push(c), b || i()), this;
      }, fire: function fire() {
        return j.fireWith(this, arguments), this;
      }, fired: function fired() {
        return !!d;
      } };return j;
  };function N(a) {
    return a;
  }function O(a) {
    throw a;
  }function P(a, b, c, d) {
    var e;try {
      a && r.isFunction(e = a.promise) ? e.call(a).done(b).fail(c) : a && r.isFunction(e = a.then) ? e.call(a, b, c) : b.apply(void 0, [a].slice(d));
    } catch (a) {
      c.apply(void 0, [a]);
    }
  }r.extend({ Deferred: function Deferred(b) {
      var c = [["notify", "progress", r.Callbacks("memory"), r.Callbacks("memory"), 2], ["resolve", "done", r.Callbacks("once memory"), r.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", r.Callbacks("once memory"), r.Callbacks("once memory"), 1, "rejected"]],
          d = "pending",
          e = { state: function state() {
          return d;
        }, always: function always() {
          return f.done(arguments).fail(arguments), this;
        }, "catch": function _catch(a) {
          return e.then(null, a);
        }, pipe: function pipe() {
          var a = arguments;return r.Deferred(function (b) {
            r.each(c, function (c, d) {
              var e = r.isFunction(a[d[4]]) && a[d[4]];f[d[1]](function () {
                var a = e && e.apply(this, arguments);a && r.isFunction(a.promise) ? a.promise().progress(b.notify).done(b.resolve).fail(b.reject) : b[d[0] + "With"](this, e ? [a] : arguments);
              });
            }), a = null;
          }).promise();
        }, then: function then(b, d, e) {
          var f = 0;function g(b, c, d, e) {
            return function () {
              var h = this,
                  i = arguments,
                  j = function j() {
                var a, j;if (!(b < f)) {
                  if (a = d.apply(h, i), a === c.promise()) throw new TypeError("Thenable self-resolution");j = a && ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" == typeof a) && a.then, r.isFunction(j) ? e ? j.call(a, g(f, c, N, e), g(f, c, O, e)) : (f++, j.call(a, g(f, c, N, e), g(f, c, O, e), g(f, c, N, c.notifyWith))) : (d !== N && (h = void 0, i = [a]), (e || c.resolveWith)(h, i));
                }
              },
                  k = e ? j : function () {
                try {
                  j();
                } catch (a) {
                  r.Deferred.exceptionHook && r.Deferred.exceptionHook(a, k.stackTrace), b + 1 >= f && (d !== O && (h = void 0, i = [a]), c.rejectWith(h, i));
                }
              };b ? k() : (r.Deferred.getStackHook && (k.stackTrace = r.Deferred.getStackHook()), a.setTimeout(k));
            };
          }return r.Deferred(function (a) {
            c[0][3].add(g(0, a, r.isFunction(e) ? e : N, a.notifyWith)), c[1][3].add(g(0, a, r.isFunction(b) ? b : N)), c[2][3].add(g(0, a, r.isFunction(d) ? d : O));
          }).promise();
        }, promise: function promise(a) {
          return null != a ? r.extend(a, e) : e;
        } },
          f = {};return r.each(c, function (a, b) {
        var g = b[2],
            h = b[5];e[b[1]] = g.add, h && g.add(function () {
          d = h;
        }, c[3 - a][2].disable, c[0][2].lock), g.add(b[3].fire), f[b[0]] = function () {
          return f[b[0] + "With"](this === f ? void 0 : this, arguments), this;
        }, f[b[0] + "With"] = g.fireWith;
      }), e.promise(f), b && b.call(f, f), f;
    }, when: function when(a) {
      var b = arguments.length,
          c = b,
          d = Array(c),
          e = f.call(arguments),
          g = r.Deferred(),
          h = function h(a) {
        return function (c) {
          d[a] = this, e[a] = arguments.length > 1 ? f.call(arguments) : c, --b || g.resolveWith(d, e);
        };
      };if (b <= 1 && (P(a, g.done(h(c)).resolve, g.reject, !b), "pending" === g.state() || r.isFunction(e[c] && e[c].then))) return g.then();while (c--) {
        P(e[c], h(c), g.reject);
      }return g.promise();
    } });var Q = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;r.Deferred.exceptionHook = function (b, c) {
    a.console && a.console.warn && b && Q.test(b.name) && a.console.warn("jQuery.Deferred exception: " + b.message, b.stack, c);
  }, r.readyException = function (b) {
    a.setTimeout(function () {
      throw b;
    });
  };var R = r.Deferred();r.fn.ready = function (a) {
    return R.then(a)["catch"](function (a) {
      r.readyException(a);
    }), this;
  }, r.extend({ isReady: !1, readyWait: 1, ready: function ready(a) {
      (a === !0 ? --r.readyWait : r.isReady) || (r.isReady = !0, a !== !0 && --r.readyWait > 0 || R.resolveWith(d, [r]));
    } }), r.ready.then = R.then;function S() {
    d.removeEventListener("DOMContentLoaded", S), a.removeEventListener("load", S), r.ready();
  }"complete" === d.readyState || "loading" !== d.readyState && !d.documentElement.doScroll ? a.setTimeout(r.ready) : (d.addEventListener("DOMContentLoaded", S), a.addEventListener("load", S));var T = function T(a, b, c, d, e, f, g) {
    var h = 0,
        i = a.length,
        j = null == c;if ("object" === r.type(c)) {
      e = !0;for (h in c) {
        T(a, b, h, c[h], !0, f, g);
      }
    } else if (void 0 !== d && (e = !0, r.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function b(a, _b, c) {
      return j.call(r(a), c);
    })), b)) for (; h < i; h++) {
      b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
    }return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
  },
      U = function U(a) {
    return 1 === a.nodeType || 9 === a.nodeType || !+a.nodeType;
  };function V() {
    this.expando = r.expando + V.uid++;
  }V.uid = 1, V.prototype = { cache: function cache(a) {
      var b = a[this.expando];return b || (b = {}, U(a) && (a.nodeType ? a[this.expando] = b : Object.defineProperty(a, this.expando, { value: b, configurable: !0 }))), b;
    }, set: function set(a, b, c) {
      var d,
          e = this.cache(a);if ("string" == typeof b) e[r.camelCase(b)] = c;else for (d in b) {
        e[r.camelCase(d)] = b[d];
      }return e;
    }, get: function get(a, b) {
      return void 0 === b ? this.cache(a) : a[this.expando] && a[this.expando][r.camelCase(b)];
    }, access: function access(a, b, c) {
      return void 0 === b || b && "string" == typeof b && void 0 === c ? this.get(a, b) : (this.set(a, b, c), void 0 !== c ? c : b);
    }, remove: function remove(a, b) {
      var c,
          d = a[this.expando];if (void 0 !== d) {
        if (void 0 !== b) {
          Array.isArray(b) ? b = b.map(r.camelCase) : (b = r.camelCase(b), b = b in d ? [b] : b.match(L) || []), c = b.length;while (c--) {
            delete d[b[c]];
          }
        }(void 0 === b || r.isEmptyObject(d)) && (a.nodeType ? a[this.expando] = void 0 : delete a[this.expando]);
      }
    }, hasData: function hasData(a) {
      var b = a[this.expando];return void 0 !== b && !r.isEmptyObject(b);
    } };var W = new V(),
      X = new V(),
      Y = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
      Z = /[A-Z]/g;function $(a) {
    return "true" === a || "false" !== a && ("null" === a ? null : a === +a + "" ? +a : Y.test(a) ? JSON.parse(a) : a);
  }function _(a, b, c) {
    var d;if (void 0 === c && 1 === a.nodeType) if (d = "data-" + b.replace(Z, "-$&").toLowerCase(), c = a.getAttribute(d), "string" == typeof c) {
      try {
        c = $(c);
      } catch (e) {}X.set(a, b, c);
    } else c = void 0;return c;
  }r.extend({ hasData: function hasData(a) {
      return X.hasData(a) || W.hasData(a);
    }, data: function data(a, b, c) {
      return X.access(a, b, c);
    }, removeData: function removeData(a, b) {
      X.remove(a, b);
    }, _data: function _data(a, b, c) {
      return W.access(a, b, c);
    }, _removeData: function _removeData(a, b) {
      W.remove(a, b);
    } }), r.fn.extend({ data: function data(a, b) {
      var c,
          d,
          e,
          f = this[0],
          g = f && f.attributes;if (void 0 === a) {
        if (this.length && (e = X.get(f), 1 === f.nodeType && !W.get(f, "hasDataAttrs"))) {
          c = g.length;while (c--) {
            g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = r.camelCase(d.slice(5)), _(f, d, e[d])));
          }W.set(f, "hasDataAttrs", !0);
        }return e;
      }return "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? this.each(function () {
        X.set(this, a);
      }) : T(this, function (b) {
        var c;if (f && void 0 === b) {
          if (c = X.get(f, a), void 0 !== c) return c;if (c = _(f, a), void 0 !== c) return c;
        } else this.each(function () {
          X.set(this, a, b);
        });
      }, null, b, arguments.length > 1, null, !0);
    }, removeData: function removeData(a) {
      return this.each(function () {
        X.remove(this, a);
      });
    } }), r.extend({ queue: function queue(a, b, c) {
      var d;if (a) return b = (b || "fx") + "queue", d = W.get(a, b), c && (!d || Array.isArray(c) ? d = W.access(a, b, r.makeArray(c)) : d.push(c)), d || [];
    }, dequeue: function dequeue(a, b) {
      b = b || "fx";var c = r.queue(a, b),
          d = c.length,
          e = c.shift(),
          f = r._queueHooks(a, b),
          g = function g() {
        r.dequeue(a, b);
      };"inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
    }, _queueHooks: function _queueHooks(a, b) {
      var c = b + "queueHooks";return W.get(a, c) || W.access(a, c, { empty: r.Callbacks("once memory").add(function () {
          W.remove(a, [b + "queue", c]);
        }) });
    } }), r.fn.extend({ queue: function queue(a, b) {
      var c = 2;return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? r.queue(this[0], a) : void 0 === b ? this : this.each(function () {
        var c = r.queue(this, a, b);r._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && r.dequeue(this, a);
      });
    }, dequeue: function dequeue(a) {
      return this.each(function () {
        r.dequeue(this, a);
      });
    }, clearQueue: function clearQueue(a) {
      return this.queue(a || "fx", []);
    }, promise: function promise(a, b) {
      var c,
          d = 1,
          e = r.Deferred(),
          f = this,
          g = this.length,
          h = function h() {
        --d || e.resolveWith(f, [f]);
      };"string" != typeof a && (b = a, a = void 0), a = a || "fx";while (g--) {
        c = W.get(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
      }return h(), e.promise(b);
    } });var aa = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
      ba = new RegExp("^(?:([+-])=|)(" + aa + ")([a-z%]*)$", "i"),
      ca = ["Top", "Right", "Bottom", "Left"],
      da = function da(a, b) {
    return a = b || a, "none" === a.style.display || "" === a.style.display && r.contains(a.ownerDocument, a) && "none" === r.css(a, "display");
  },
      ea = function ea(a, b, c, d) {
    var e,
        f,
        g = {};for (f in b) {
      g[f] = a.style[f], a.style[f] = b[f];
    }e = c.apply(a, d || []);for (f in b) {
      a.style[f] = g[f];
    }return e;
  };function fa(a, b, c, d) {
    var e,
        f = 1,
        g = 20,
        h = d ? function () {
      return d.cur();
    } : function () {
      return r.css(a, b, "");
    },
        i = h(),
        j = c && c[3] || (r.cssNumber[b] ? "" : "px"),
        k = (r.cssNumber[b] || "px" !== j && +i) && ba.exec(r.css(a, b));if (k && k[3] !== j) {
      j = j || k[3], c = c || [], k = +i || 1;do {
        f = f || ".5", k /= f, r.style(a, b, k + j);
      } while (f !== (f = h() / i) && 1 !== f && --g);
    }return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e;
  }var ga = {};function ha(a) {
    var b,
        c = a.ownerDocument,
        d = a.nodeName,
        e = ga[d];return e ? e : (b = c.body.appendChild(c.createElement(d)), e = r.css(b, "display"), b.parentNode.removeChild(b), "none" === e && (e = "block"), ga[d] = e, e);
  }function ia(a, b) {
    for (var c, d, e = [], f = 0, g = a.length; f < g; f++) {
      d = a[f], d.style && (c = d.style.display, b ? ("none" === c && (e[f] = W.get(d, "display") || null, e[f] || (d.style.display = "")), "" === d.style.display && da(d) && (e[f] = ha(d))) : "none" !== c && (e[f] = "none", W.set(d, "display", c)));
    }for (f = 0; f < g; f++) {
      null != e[f] && (a[f].style.display = e[f]);
    }return a;
  }r.fn.extend({ show: function show() {
      return ia(this, !0);
    }, hide: function hide() {
      return ia(this);
    }, toggle: function toggle(a) {
      return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function () {
        da(this) ? r(this).show() : r(this).hide();
      });
    } });var ja = /^(?:checkbox|radio)$/i,
      ka = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
      la = /^$|\/(?:java|ecma)script/i,
      ma = { option: [1, "<select multiple='multiple'>", "</select>"], thead: [1, "<table>", "</table>"], col: [2, "<table><colgroup>", "</colgroup></table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], _default: [0, "", ""] };ma.optgroup = ma.option, ma.tbody = ma.tfoot = ma.colgroup = ma.caption = ma.thead, ma.th = ma.td;function na(a, b) {
    var c;return c = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : [], void 0 === b || b && B(a, b) ? r.merge([a], c) : c;
  }function oa(a, b) {
    for (var c = 0, d = a.length; c < d; c++) {
      W.set(a[c], "globalEval", !b || W.get(b[c], "globalEval"));
    }
  }var pa = /<|&#?\w+;/;function qa(a, b, c, d, e) {
    for (var f, g, h, i, j, k, l = b.createDocumentFragment(), m = [], n = 0, o = a.length; n < o; n++) {
      if (f = a[n], f || 0 === f) if ("object" === r.type(f)) r.merge(m, f.nodeType ? [f] : f);else if (pa.test(f)) {
        g = g || l.appendChild(b.createElement("div")), h = (ka.exec(f) || ["", ""])[1].toLowerCase(), i = ma[h] || ma._default, g.innerHTML = i[1] + r.htmlPrefilter(f) + i[2], k = i[0];while (k--) {
          g = g.lastChild;
        }r.merge(m, g.childNodes), g = l.firstChild, g.textContent = "";
      } else m.push(b.createTextNode(f));
    }l.textContent = "", n = 0;while (f = m[n++]) {
      if (d && r.inArray(f, d) > -1) e && e.push(f);else if (j = r.contains(f.ownerDocument, f), g = na(l.appendChild(f), "script"), j && oa(g), c) {
        k = 0;while (f = g[k++]) {
          la.test(f.type || "") && c.push(f);
        }
      }
    }return l;
  }!function () {
    var a = d.createDocumentFragment(),
        b = a.appendChild(d.createElement("div")),
        c = d.createElement("input");c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), b.appendChild(c), o.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, b.innerHTML = "<textarea>x</textarea>", o.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue;
  }();var ra = d.documentElement,
      sa = /^key/,
      ta = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
      ua = /^([^.]*)(?:\.(.+)|)/;function va() {
    return !0;
  }function wa() {
    return !1;
  }function xa() {
    try {
      return d.activeElement;
    } catch (a) {}
  }function ya(a, b, c, d, e, f) {
    var g, h;if ("object" == (typeof b === "undefined" ? "undefined" : _typeof(b))) {
      "string" != typeof c && (d = d || c, c = void 0);for (h in b) {
        ya(a, h, c, d, b[h], f);
      }return a;
    }if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = wa;else if (!e) return a;return 1 === f && (g = e, e = function e(a) {
      return r().off(a), g.apply(this, arguments);
    }, e.guid = g.guid || (g.guid = r.guid++)), a.each(function () {
      r.event.add(this, b, e, d, c);
    });
  }r.event = { global: {}, add: function add(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q = W.get(a);if (q) {
        c.handler && (f = c, c = f.handler, e = f.selector), e && r.find.matchesSelector(ra, e), c.guid || (c.guid = r.guid++), (i = q.events) || (i = q.events = {}), (g = q.handle) || (g = q.handle = function (b) {
          return "undefined" != typeof r && r.event.triggered !== b.type ? r.event.dispatch.apply(a, arguments) : void 0;
        }), b = (b || "").match(L) || [""], j = b.length;while (j--) {
          h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n && (l = r.event.special[n] || {}, n = (e ? l.delegateType : l.bindType) || n, l = r.event.special[n] || {}, k = r.extend({ type: n, origType: p, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && r.expr.match.needsContext.test(e), namespace: o.join(".") }, f), (m = i[n]) || (m = i[n] = [], m.delegateCount = 0, l.setup && l.setup.call(a, d, o, g) !== !1 || a.addEventListener && a.addEventListener(n, g)), l.add && (l.add.call(a, k), k.handler.guid || (k.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, k) : m.push(k), r.event.global[n] = !0);
        }
      }
    }, remove: function remove(a, b, c, d, e) {
      var f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p,
          q = W.hasData(a) && W.get(a);if (q && (i = q.events)) {
        b = (b || "").match(L) || [""], j = b.length;while (j--) {
          if (h = ua.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
            l = r.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = i[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), g = f = m.length;while (f--) {
              k = m[f], !e && p !== k.origType || c && c.guid !== k.guid || h && !h.test(k.namespace) || d && d !== k.selector && ("**" !== d || !k.selector) || (m.splice(f, 1), k.selector && m.delegateCount--, l.remove && l.remove.call(a, k));
            }g && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || r.removeEvent(a, n, q.handle), delete i[n]);
          } else for (n in i) {
            r.event.remove(a, n + b[j], c, d, !0);
          }
        }r.isEmptyObject(i) && W.remove(a, "handle events");
      }
    }, dispatch: function dispatch(a) {
      var b = r.event.fix(a),
          c,
          d,
          e,
          f,
          g,
          h,
          i = new Array(arguments.length),
          j = (W.get(this, "events") || {})[b.type] || [],
          k = r.event.special[b.type] || {};for (i[0] = b, c = 1; c < arguments.length; c++) {
        i[c] = arguments[c];
      }if (b.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, b) !== !1) {
        h = r.event.handlers.call(this, b, j), c = 0;while ((f = h[c++]) && !b.isPropagationStopped()) {
          b.currentTarget = f.elem, d = 0;while ((g = f.handlers[d++]) && !b.isImmediatePropagationStopped()) {
            b.rnamespace && !b.rnamespace.test(g.namespace) || (b.handleObj = g, b.data = g.data, e = ((r.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, i), void 0 !== e && (b.result = e) === !1 && (b.preventDefault(), b.stopPropagation()));
          }
        }return k.postDispatch && k.postDispatch.call(this, b), b.result;
      }
    }, handlers: function handlers(a, b) {
      var c,
          d,
          e,
          f,
          g,
          h = [],
          i = b.delegateCount,
          j = a.target;if (i && j.nodeType && !("click" === a.type && a.button >= 1)) for (; j !== this; j = j.parentNode || this) {
        if (1 === j.nodeType && ("click" !== a.type || j.disabled !== !0)) {
          for (f = [], g = {}, c = 0; c < i; c++) {
            d = b[c], e = d.selector + " ", void 0 === g[e] && (g[e] = d.needsContext ? r(e, this).index(j) > -1 : r.find(e, this, null, [j]).length), g[e] && f.push(d);
          }f.length && h.push({ elem: j, handlers: f });
        }
      }return j = this, i < b.length && h.push({ elem: j, handlers: b.slice(i) }), h;
    }, addProp: function addProp(a, b) {
      Object.defineProperty(r.Event.prototype, a, { enumerable: !0, configurable: !0, get: r.isFunction(b) ? function () {
          if (this.originalEvent) return b(this.originalEvent);
        } : function () {
          if (this.originalEvent) return this.originalEvent[a];
        }, set: function set(b) {
          Object.defineProperty(this, a, { enumerable: !0, configurable: !0, writable: !0, value: b });
        } });
    }, fix: function fix(a) {
      return a[r.expando] ? a : new r.Event(a);
    }, special: { load: { noBubble: !0 }, focus: { trigger: function trigger() {
          if (this !== xa() && this.focus) return this.focus(), !1;
        }, delegateType: "focusin" }, blur: { trigger: function trigger() {
          if (this === xa() && this.blur) return this.blur(), !1;
        }, delegateType: "focusout" }, click: { trigger: function trigger() {
          if ("checkbox" === this.type && this.click && B(this, "input")) return this.click(), !1;
        }, _default: function _default(a) {
          return B(a.target, "a");
        } }, beforeunload: { postDispatch: function postDispatch(a) {
          void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result);
        } } } }, r.removeEvent = function (a, b, c) {
    a.removeEventListener && a.removeEventListener(b, c);
  }, r.Event = function (a, b) {
    return this instanceof r.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? va : wa, this.target = a.target && 3 === a.target.nodeType ? a.target.parentNode : a.target, this.currentTarget = a.currentTarget, this.relatedTarget = a.relatedTarget) : this.type = a, b && r.extend(this, b), this.timeStamp = a && a.timeStamp || r.now(), void (this[r.expando] = !0)) : new r.Event(a, b);
  }, r.Event.prototype = { constructor: r.Event, isDefaultPrevented: wa, isPropagationStopped: wa, isImmediatePropagationStopped: wa, isSimulated: !1, preventDefault: function preventDefault() {
      var a = this.originalEvent;this.isDefaultPrevented = va, a && !this.isSimulated && a.preventDefault();
    }, stopPropagation: function stopPropagation() {
      var a = this.originalEvent;this.isPropagationStopped = va, a && !this.isSimulated && a.stopPropagation();
    }, stopImmediatePropagation: function stopImmediatePropagation() {
      var a = this.originalEvent;this.isImmediatePropagationStopped = va, a && !this.isSimulated && a.stopImmediatePropagation(), this.stopPropagation();
    } }, r.each({ altKey: !0, bubbles: !0, cancelable: !0, changedTouches: !0, ctrlKey: !0, detail: !0, eventPhase: !0, metaKey: !0, pageX: !0, pageY: !0, shiftKey: !0, view: !0, "char": !0, charCode: !0, key: !0, keyCode: !0, button: !0, buttons: !0, clientX: !0, clientY: !0, offsetX: !0, offsetY: !0, pointerId: !0, pointerType: !0, screenX: !0, screenY: !0, targetTouches: !0, toElement: !0, touches: !0, which: function which(a) {
      var b = a.button;return null == a.which && sa.test(a.type) ? null != a.charCode ? a.charCode : a.keyCode : !a.which && void 0 !== b && ta.test(a.type) ? 1 & b ? 1 : 2 & b ? 3 : 4 & b ? 2 : 0 : a.which;
    } }, r.event.addProp), r.each({ mouseenter: "mouseover", mouseleave: "mouseout", pointerenter: "pointerover", pointerleave: "pointerout" }, function (a, b) {
    r.event.special[a] = { delegateType: b, bindType: b, handle: function handle(a) {
        var c,
            d = this,
            e = a.relatedTarget,
            f = a.handleObj;return e && (e === d || r.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
      } };
  }), r.fn.extend({ on: function on(a, b, c, d) {
      return ya(this, a, b, c, d);
    }, one: function one(a, b, c, d) {
      return ya(this, a, b, c, d, 1);
    }, off: function off(a, b, c) {
      var d, e;if (a && a.preventDefault && a.handleObj) return d = a.handleObj, r(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;if ("object" == (typeof a === "undefined" ? "undefined" : _typeof(a))) {
        for (e in a) {
          this.off(e, b, a[e]);
        }return this;
      }return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = wa), this.each(function () {
        r.event.remove(this, a, c, b);
      });
    } });var za = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
      Aa = /<script|<style|<link/i,
      Ba = /checked\s*(?:[^=]|=\s*.checked.)/i,
      Ca = /^true\/(.*)/,
      Da = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;function Ea(a, b) {
    return B(a, "table") && B(11 !== b.nodeType ? b : b.firstChild, "tr") ? r(">tbody", a)[0] || a : a;
  }function Fa(a) {
    return a.type = (null !== a.getAttribute("type")) + "/" + a.type, a;
  }function Ga(a) {
    var b = Ca.exec(a.type);return b ? a.type = b[1] : a.removeAttribute("type"), a;
  }function Ha(a, b) {
    var c, d, e, f, g, h, i, j;if (1 === b.nodeType) {
      if (W.hasData(a) && (f = W.access(a), g = W.set(b, f), j = f.events)) {
        delete g.handle, g.events = {};for (e in j) {
          for (c = 0, d = j[e].length; c < d; c++) {
            r.event.add(b, e, j[e][c]);
          }
        }
      }X.hasData(a) && (h = X.access(a), i = r.extend({}, h), X.set(b, i));
    }
  }function Ia(a, b) {
    var c = b.nodeName.toLowerCase();"input" === c && ja.test(a.type) ? b.checked = a.checked : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue);
  }function Ja(a, b, c, d) {
    b = g.apply([], b);var e,
        f,
        h,
        i,
        j,
        k,
        l = 0,
        m = a.length,
        n = m - 1,
        q = b[0],
        s = r.isFunction(q);if (s || m > 1 && "string" == typeof q && !o.checkClone && Ba.test(q)) return a.each(function (e) {
      var f = a.eq(e);s && (b[0] = q.call(this, e, f.html())), Ja(f, b, c, d);
    });if (m && (e = qa(b, a[0].ownerDocument, !1, a, d), f = e.firstChild, 1 === e.childNodes.length && (e = f), f || d)) {
      for (h = r.map(na(e, "script"), Fa), i = h.length; l < m; l++) {
        j = e, l !== n && (j = r.clone(j, !0, !0), i && r.merge(h, na(j, "script"))), c.call(a[l], j, l);
      }if (i) for (k = h[h.length - 1].ownerDocument, r.map(h, Ga), l = 0; l < i; l++) {
        j = h[l], la.test(j.type || "") && !W.access(j, "globalEval") && r.contains(k, j) && (j.src ? r._evalUrl && r._evalUrl(j.src) : p(j.textContent.replace(Da, ""), k));
      }
    }return a;
  }function Ka(a, b, c) {
    for (var d, e = b ? r.filter(b, a) : a, f = 0; null != (d = e[f]); f++) {
      c || 1 !== d.nodeType || r.cleanData(na(d)), d.parentNode && (c && r.contains(d.ownerDocument, d) && oa(na(d, "script")), d.parentNode.removeChild(d));
    }return a;
  }r.extend({ htmlPrefilter: function htmlPrefilter(a) {
      return a.replace(za, "<$1></$2>");
    }, clone: function clone(a, b, c) {
      var d,
          e,
          f,
          g,
          h = a.cloneNode(!0),
          i = r.contains(a.ownerDocument, a);if (!(o.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || r.isXMLDoc(a))) for (g = na(h), f = na(a), d = 0, e = f.length; d < e; d++) {
        Ia(f[d], g[d]);
      }if (b) if (c) for (f = f || na(a), g = g || na(h), d = 0, e = f.length; d < e; d++) {
        Ha(f[d], g[d]);
      } else Ha(a, h);return g = na(h, "script"), g.length > 0 && oa(g, !i && na(a, "script")), h;
    }, cleanData: function cleanData(a) {
      for (var b, c, d, e = r.event.special, f = 0; void 0 !== (c = a[f]); f++) {
        if (U(c)) {
          if (b = c[W.expando]) {
            if (b.events) for (d in b.events) {
              e[d] ? r.event.remove(c, d) : r.removeEvent(c, d, b.handle);
            }c[W.expando] = void 0;
          }c[X.expando] && (c[X.expando] = void 0);
        }
      }
    } }), r.fn.extend({ detach: function detach(a) {
      return Ka(this, a, !0);
    }, remove: function remove(a) {
      return Ka(this, a);
    }, text: function text(a) {
      return T(this, function (a) {
        return void 0 === a ? r.text(this) : this.empty().each(function () {
          1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = a);
        });
      }, null, a, arguments.length);
    }, append: function append() {
      return Ja(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Ea(this, a);b.appendChild(a);
        }
      });
    }, prepend: function prepend() {
      return Ja(this, arguments, function (a) {
        if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
          var b = Ea(this, a);b.insertBefore(a, b.firstChild);
        }
      });
    }, before: function before() {
      return Ja(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this);
      });
    }, after: function after() {
      return Ja(this, arguments, function (a) {
        this.parentNode && this.parentNode.insertBefore(a, this.nextSibling);
      });
    }, empty: function empty() {
      for (var a, b = 0; null != (a = this[b]); b++) {
        1 === a.nodeType && (r.cleanData(na(a, !1)), a.textContent = "");
      }return this;
    }, clone: function clone(a, b) {
      return a = null != a && a, b = null == b ? a : b, this.map(function () {
        return r.clone(this, a, b);
      });
    }, html: function html(a) {
      return T(this, function (a) {
        var b = this[0] || {},
            c = 0,
            d = this.length;if (void 0 === a && 1 === b.nodeType) return b.innerHTML;if ("string" == typeof a && !Aa.test(a) && !ma[(ka.exec(a) || ["", ""])[1].toLowerCase()]) {
          a = r.htmlPrefilter(a);try {
            for (; c < d; c++) {
              b = this[c] || {}, 1 === b.nodeType && (r.cleanData(na(b, !1)), b.innerHTML = a);
            }b = 0;
          } catch (e) {}
        }b && this.empty().append(a);
      }, null, a, arguments.length);
    }, replaceWith: function replaceWith() {
      var a = [];return Ja(this, arguments, function (b) {
        var c = this.parentNode;r.inArray(this, a) < 0 && (r.cleanData(na(this)), c && c.replaceChild(b, this));
      }, a);
    } }), r.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
    r.fn[a] = function (a) {
      for (var c, d = [], e = r(a), f = e.length - 1, g = 0; g <= f; g++) {
        c = g === f ? this : this.clone(!0), r(e[g])[b](c), h.apply(d, c.get());
      }return this.pushStack(d);
    };
  });var La = /^margin/,
      Ma = new RegExp("^(" + aa + ")(?!px)[a-z%]+$", "i"),
      Na = function Na(b) {
    var c = b.ownerDocument.defaultView;return c && c.opener || (c = a), c.getComputedStyle(b);
  };!function () {
    function b() {
      if (i) {
        i.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", i.innerHTML = "", ra.appendChild(h);var b = a.getComputedStyle(i);c = "1%" !== b.top, g = "2px" === b.marginLeft, e = "4px" === b.width, i.style.marginRight = "50%", f = "4px" === b.marginRight, ra.removeChild(h), i = null;
      }
    }var c,
        e,
        f,
        g,
        h = d.createElement("div"),
        i = d.createElement("div");i.style && (i.style.backgroundClip = "content-box", i.cloneNode(!0).style.backgroundClip = "", o.clearCloneStyle = "content-box" === i.style.backgroundClip, h.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", h.appendChild(i), r.extend(o, { pixelPosition: function pixelPosition() {
        return b(), c;
      }, boxSizingReliable: function boxSizingReliable() {
        return b(), e;
      }, pixelMarginRight: function pixelMarginRight() {
        return b(), f;
      }, reliableMarginLeft: function reliableMarginLeft() {
        return b(), g;
      } }));
  }();function Oa(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.style;return c = c || Na(a), c && (g = c.getPropertyValue(b) || c[b], "" !== g || r.contains(a.ownerDocument, a) || (g = r.style(a, b)), !o.pixelMarginRight() && Ma.test(g) && La.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 !== g ? g + "" : g;
  }function Pa(a, b) {
    return { get: function get() {
        return a() ? void delete this.get : (this.get = b).apply(this, arguments);
      } };
  }var Qa = /^(none|table(?!-c[ea]).+)/,
      Ra = /^--/,
      Sa = { position: "absolute", visibility: "hidden", display: "block" },
      Ta = { letterSpacing: "0", fontWeight: "400" },
      Ua = ["Webkit", "Moz", "ms"],
      Va = d.createElement("div").style;function Wa(a) {
    if (a in Va) return a;var b = a[0].toUpperCase() + a.slice(1),
        c = Ua.length;while (c--) {
      if (a = Ua[c] + b, a in Va) return a;
    }
  }function Xa(a) {
    var b = r.cssProps[a];return b || (b = r.cssProps[a] = Wa(a) || a), b;
  }function Ya(a, b, c) {
    var d = ba.exec(b);return d ? Math.max(0, d[2] - (c || 0)) + (d[3] || "px") : b;
  }function Za(a, b, c, d, e) {
    var f,
        g = 0;for (f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0; f < 4; f += 2) {
      "margin" === c && (g += r.css(a, c + ca[f], !0, e)), d ? ("content" === c && (g -= r.css(a, "padding" + ca[f], !0, e)), "margin" !== c && (g -= r.css(a, "border" + ca[f] + "Width", !0, e))) : (g += r.css(a, "padding" + ca[f], !0, e), "padding" !== c && (g += r.css(a, "border" + ca[f] + "Width", !0, e)));
    }return g;
  }function $a(a, b, c) {
    var d,
        e = Na(a),
        f = Oa(a, b, e),
        g = "border-box" === r.css(a, "boxSizing", !1, e);return Ma.test(f) ? f : (d = g && (o.boxSizingReliable() || f === a.style[b]), "auto" === f && (f = a["offset" + b[0].toUpperCase() + b.slice(1)]), f = parseFloat(f) || 0, f + Za(a, b, c || (g ? "border" : "content"), d, e) + "px");
  }r.extend({ cssHooks: { opacity: { get: function get(a, b) {
          if (b) {
            var c = Oa(a, "opacity");return "" === c ? "1" : c;
          }
        } } }, cssNumber: { animationIterationCount: !0, columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": "cssFloat" }, style: function style(a, b, c, d) {
      if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
        var e,
            f,
            g,
            h = r.camelCase(b),
            i = Ra.test(b),
            j = a.style;return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], void 0 === c ? g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : j[b] : (f = typeof c === "undefined" ? "undefined" : _typeof(c), "string" === f && (e = ba.exec(c)) && e[1] && (c = fa(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (r.cssNumber[h] ? "" : "px")), o.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (j[b] = "inherit"), g && "set" in g && void 0 === (c = g.set(a, c, d)) || (i ? j.setProperty(b, c) : j[b] = c)), void 0);
      }
    }, css: function css(a, b, c, d) {
      var e,
          f,
          g,
          h = r.camelCase(b),
          i = Ra.test(b);return i || (b = Xa(h)), g = r.cssHooks[b] || r.cssHooks[h], g && "get" in g && (e = g.get(a, !0, c)), void 0 === e && (e = Oa(a, b, d)), "normal" === e && b in Ta && (e = Ta[b]), "" === c || c ? (f = parseFloat(e), c === !0 || isFinite(f) ? f || 0 : e) : e;
    } }), r.each(["height", "width"], function (a, b) {
    r.cssHooks[b] = { get: function get(a, c, d) {
        if (c) return !Qa.test(r.css(a, "display")) || a.getClientRects().length && a.getBoundingClientRect().width ? $a(a, b, d) : ea(a, Sa, function () {
          return $a(a, b, d);
        });
      }, set: function set(a, c, d) {
        var e,
            f = d && Na(a),
            g = d && Za(a, b, d, "border-box" === r.css(a, "boxSizing", !1, f), f);return g && (e = ba.exec(c)) && "px" !== (e[3] || "px") && (a.style[b] = c, c = r.css(a, b)), Ya(a, c, g);
      } };
  }), r.cssHooks.marginLeft = Pa(o.reliableMarginLeft, function (a, b) {
    if (b) return (parseFloat(Oa(a, "marginLeft")) || a.getBoundingClientRect().left - ea(a, { marginLeft: 0 }, function () {
      return a.getBoundingClientRect().left;
    })) + "px";
  }), r.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
    r.cssHooks[a + b] = { expand: function expand(c) {
        for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; d < 4; d++) {
          e[a + ca[d] + b] = f[d] || f[d - 2] || f[0];
        }return e;
      } }, La.test(a) || (r.cssHooks[a + b].set = Ya);
  }), r.fn.extend({ css: function css(a, b) {
      return T(this, function (a, b, c) {
        var d,
            e,
            f = {},
            g = 0;if (Array.isArray(b)) {
          for (d = Na(a), e = b.length; g < e; g++) {
            f[b[g]] = r.css(a, b[g], !1, d);
          }return f;
        }return void 0 !== c ? r.style(a, b, c) : r.css(a, b);
      }, a, b, arguments.length > 1);
    } });function _a(a, b, c, d, e) {
    return new _a.prototype.init(a, b, c, d, e);
  }r.Tween = _a, _a.prototype = { constructor: _a, init: function init(a, b, c, d, e, f) {
      this.elem = a, this.prop = c, this.easing = e || r.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (r.cssNumber[c] ? "" : "px");
    }, cur: function cur() {
      var a = _a.propHooks[this.prop];return a && a.get ? a.get(this) : _a.propHooks._default.get(this);
    }, run: function run(a) {
      var b,
          c = _a.propHooks[this.prop];return this.options.duration ? this.pos = b = r.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : this.pos = b = a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : _a.propHooks._default.set(this), this;
    } }, _a.prototype.init.prototype = _a.prototype, _a.propHooks = { _default: { get: function get(a) {
        var b;return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = r.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0);
      }, set: function set(a) {
        r.fx.step[a.prop] ? r.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[r.cssProps[a.prop]] && !r.cssHooks[a.prop] ? a.elem[a.prop] = a.now : r.style(a.elem, a.prop, a.now + a.unit);
      } } }, _a.propHooks.scrollTop = _a.propHooks.scrollLeft = { set: function set(a) {
      a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now);
    } }, r.easing = { linear: function linear(a) {
      return a;
    }, swing: function swing(a) {
      return .5 - Math.cos(a * Math.PI) / 2;
    }, _default: "swing" }, r.fx = _a.prototype.init, r.fx.step = {};var ab,
      bb,
      cb = /^(?:toggle|show|hide)$/,
      db = /queueHooks$/;function eb() {
    bb && (d.hidden === !1 && a.requestAnimationFrame ? a.requestAnimationFrame(eb) : a.setTimeout(eb, r.fx.interval), r.fx.tick());
  }function fb() {
    return a.setTimeout(function () {
      ab = void 0;
    }), ab = r.now();
  }function gb(a, b) {
    var c,
        d = 0,
        e = { height: a };for (b = b ? 1 : 0; d < 4; d += 2 - b) {
      c = ca[d], e["margin" + c] = e["padding" + c] = a;
    }return b && (e.opacity = e.width = a), e;
  }function hb(a, b, c) {
    for (var d, e = (kb.tweeners[b] || []).concat(kb.tweeners["*"]), f = 0, g = e.length; f < g; f++) {
      if (d = e[f].call(c, b, a)) return d;
    }
  }function ib(a, b, c) {
    var d,
        e,
        f,
        g,
        h,
        i,
        j,
        k,
        l = "width" in b || "height" in b,
        m = this,
        n = {},
        o = a.style,
        p = a.nodeType && da(a),
        q = W.get(a, "fxshow");c.queue || (g = r._queueHooks(a, "fx"), null == g.unqueued && (g.unqueued = 0, h = g.empty.fire, g.empty.fire = function () {
      g.unqueued || h();
    }), g.unqueued++, m.always(function () {
      m.always(function () {
        g.unqueued--, r.queue(a, "fx").length || g.empty.fire();
      });
    }));for (d in b) {
      if (e = b[d], cb.test(e)) {
        if (delete b[d], f = f || "toggle" === e, e === (p ? "hide" : "show")) {
          if ("show" !== e || !q || void 0 === q[d]) continue;p = !0;
        }n[d] = q && q[d] || r.style(a, d);
      }
    }if (i = !r.isEmptyObject(b), i || !r.isEmptyObject(n)) {
      l && 1 === a.nodeType && (c.overflow = [o.overflow, o.overflowX, o.overflowY], j = q && q.display, null == j && (j = W.get(a, "display")), k = r.css(a, "display"), "none" === k && (j ? k = j : (ia([a], !0), j = a.style.display || j, k = r.css(a, "display"), ia([a]))), ("inline" === k || "inline-block" === k && null != j) && "none" === r.css(a, "float") && (i || (m.done(function () {
        o.display = j;
      }), null == j && (k = o.display, j = "none" === k ? "" : k)), o.display = "inline-block")), c.overflow && (o.overflow = "hidden", m.always(function () {
        o.overflow = c.overflow[0], o.overflowX = c.overflow[1], o.overflowY = c.overflow[2];
      })), i = !1;for (d in n) {
        i || (q ? "hidden" in q && (p = q.hidden) : q = W.access(a, "fxshow", { display: j }), f && (q.hidden = !p), p && ia([a], !0), m.done(function () {
          p || ia([a]), W.remove(a, "fxshow");for (d in n) {
            r.style(a, d, n[d]);
          }
        })), i = hb(p ? q[d] : 0, d, m), d in q || (q[d] = i.start, p && (i.end = i.start, i.start = 0));
      }
    }
  }function jb(a, b) {
    var c, d, e, f, g;for (c in a) {
      if (d = r.camelCase(c), e = b[d], f = a[c], Array.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = r.cssHooks[d], g && "expand" in g) {
        f = g.expand(f), delete a[d];for (c in f) {
          c in a || (a[c] = f[c], b[c] = e);
        }
      } else b[d] = e;
    }
  }function kb(a, b, c) {
    var d,
        e,
        f = 0,
        g = kb.prefilters.length,
        h = r.Deferred().always(function () {
      delete i.elem;
    }),
        i = function i() {
      if (e) return !1;for (var b = ab || fb(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; g < i; g++) {
        j.tweens[g].run(f);
      }return h.notifyWith(a, [j, f, c]), f < 1 && i ? c : (i || h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j]), !1);
    },
        j = h.promise({ elem: a, props: r.extend({}, b), opts: r.extend(!0, { specialEasing: {}, easing: r.easing._default }, c), originalProperties: b, originalOptions: c, startTime: ab || fb(), duration: c.duration, tweens: [], createTween: function createTween(b, c) {
        var d = r.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);return j.tweens.push(d), d;
      }, stop: function stop(b) {
        var c = 0,
            d = b ? j.tweens.length : 0;if (e) return this;for (e = !0; c < d; c++) {
          j.tweens[c].run(1);
        }return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this;
      } }),
        k = j.props;for (jb(k, j.opts.specialEasing); f < g; f++) {
      if (d = kb.prefilters[f].call(j, a, k, j.opts)) return r.isFunction(d.stop) && (r._queueHooks(j.elem, j.opts.queue).stop = r.proxy(d.stop, d)), d;
    }return r.map(k, hb, j), r.isFunction(j.opts.start) && j.opts.start.call(a, j), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always), r.fx.timer(r.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j;
  }r.Animation = r.extend(kb, { tweeners: { "*": [function (a, b) {
        var c = this.createTween(a, b);return fa(c.elem, a, ba.exec(b), c), c;
      }] }, tweener: function tweener(a, b) {
      r.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(L);for (var c, d = 0, e = a.length; d < e; d++) {
        c = a[d], kb.tweeners[c] = kb.tweeners[c] || [], kb.tweeners[c].unshift(b);
      }
    }, prefilters: [ib], prefilter: function prefilter(a, b) {
      b ? kb.prefilters.unshift(a) : kb.prefilters.push(a);
    } }), r.speed = function (a, b, c) {
    var d = a && "object" == (typeof a === "undefined" ? "undefined" : _typeof(a)) ? r.extend({}, a) : { complete: c || !c && b || r.isFunction(a) && a, duration: a, easing: c && b || b && !r.isFunction(b) && b };return r.fx.off ? d.duration = 0 : "number" != typeof d.duration && (d.duration in r.fx.speeds ? d.duration = r.fx.speeds[d.duration] : d.duration = r.fx.speeds._default), null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function () {
      r.isFunction(d.old) && d.old.call(this), d.queue && r.dequeue(this, d.queue);
    }, d;
  }, r.fn.extend({ fadeTo: function fadeTo(a, b, c, d) {
      return this.filter(da).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d);
    }, animate: function animate(a, b, c, d) {
      var e = r.isEmptyObject(a),
          f = r.speed(b, c, d),
          g = function g() {
        var b = kb(this, r.extend({}, a), f);(e || W.get(this, "finish")) && b.stop(!0);
      };return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
    }, stop: function stop(a, b, c) {
      var d = function d(a) {
        var b = a.stop;delete a.stop, b(c);
      };return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function () {
        var b = !0,
            e = null != a && a + "queueHooks",
            f = r.timers,
            g = W.get(this);if (e) g[e] && g[e].stop && d(g[e]);else for (e in g) {
          g[e] && g[e].stop && db.test(e) && d(g[e]);
        }for (e = f.length; e--;) {
          f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
        }!b && c || r.dequeue(this, a);
      });
    }, finish: function finish(a) {
      return a !== !1 && (a = a || "fx"), this.each(function () {
        var b,
            c = W.get(this),
            d = c[a + "queue"],
            e = c[a + "queueHooks"],
            f = r.timers,
            g = d ? d.length : 0;for (c.finish = !0, r.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) {
          f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
        }for (b = 0; b < g; b++) {
          d[b] && d[b].finish && d[b].finish.call(this);
        }delete c.finish;
      });
    } }), r.each(["toggle", "show", "hide"], function (a, b) {
    var c = r.fn[b];r.fn[b] = function (a, d, e) {
      return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(gb(b, !0), a, d, e);
    };
  }), r.each({ slideDown: gb("show"), slideUp: gb("hide"), slideToggle: gb("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (a, b) {
    r.fn[a] = function (a, c, d) {
      return this.animate(b, a, c, d);
    };
  }), r.timers = [], r.fx.tick = function () {
    var a,
        b = 0,
        c = r.timers;for (ab = r.now(); b < c.length; b++) {
      a = c[b], a() || c[b] !== a || c.splice(b--, 1);
    }c.length || r.fx.stop(), ab = void 0;
  }, r.fx.timer = function (a) {
    r.timers.push(a), r.fx.start();
  }, r.fx.interval = 13, r.fx.start = function () {
    bb || (bb = !0, eb());
  }, r.fx.stop = function () {
    bb = null;
  }, r.fx.speeds = { slow: 600, fast: 200, _default: 400 }, r.fn.delay = function (b, c) {
    return b = r.fx ? r.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function (c, d) {
      var e = a.setTimeout(c, b);d.stop = function () {
        a.clearTimeout(e);
      };
    });
  }, function () {
    var a = d.createElement("input"),
        b = d.createElement("select"),
        c = b.appendChild(d.createElement("option"));a.type = "checkbox", o.checkOn = "" !== a.value, o.optSelected = c.selected, a = d.createElement("input"), a.value = "t", a.type = "radio", o.radioValue = "t" === a.value;
  }();var lb,
      mb = r.expr.attrHandle;r.fn.extend({ attr: function attr(a, b) {
      return T(this, r.attr, a, b, arguments.length > 1);
    }, removeAttr: function removeAttr(a) {
      return this.each(function () {
        r.removeAttr(this, a);
      });
    } }), r.extend({ attr: function attr(a, b, c) {
      var d,
          e,
          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof a.getAttribute ? r.prop(a, b, c) : (1 === f && r.isXMLDoc(a) || (e = r.attrHooks[b.toLowerCase()] || (r.expr.match.bool.test(b) ? lb : void 0)), void 0 !== c ? null === c ? void r.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = r.find.attr(a, b), null == d ? void 0 : d));
    }, attrHooks: { type: { set: function set(a, b) {
          if (!o.radioValue && "radio" === b && B(a, "input")) {
            var c = a.value;return a.setAttribute("type", b), c && (a.value = c), b;
          }
        } } }, removeAttr: function removeAttr(a, b) {
      var c,
          d = 0,
          e = b && b.match(L);if (e && 1 === a.nodeType) while (c = e[d++]) {
        a.removeAttribute(c);
      }
    } }), lb = { set: function set(a, b, c) {
      return b === !1 ? r.removeAttr(a, c) : a.setAttribute(c, c), c;
    } }, r.each(r.expr.match.bool.source.match(/\w+/g), function (a, b) {
    var c = mb[b] || r.find.attr;mb[b] = function (a, b, d) {
      var e,
          f,
          g = b.toLowerCase();return d || (f = mb[g], mb[g] = e, e = null != c(a, b, d) ? g : null, mb[g] = f), e;
    };
  });var nb = /^(?:input|select|textarea|button)$/i,
      ob = /^(?:a|area)$/i;r.fn.extend({ prop: function prop(a, b) {
      return T(this, r.prop, a, b, arguments.length > 1);
    }, removeProp: function removeProp(a) {
      return this.each(function () {
        delete this[r.propFix[a] || a];
      });
    } }), r.extend({ prop: function prop(a, b, c) {
      var d,
          e,
          f = a.nodeType;if (3 !== f && 8 !== f && 2 !== f) return 1 === f && r.isXMLDoc(a) || (b = r.propFix[b] || b, e = r.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b];
    }, propHooks: { tabIndex: { get: function get(a) {
          var b = r.find.attr(a, "tabindex");return b ? parseInt(b, 10) : nb.test(a.nodeName) || ob.test(a.nodeName) && a.href ? 0 : -1;
        } } }, propFix: { "for": "htmlFor", "class": "className" } }), o.optSelected || (r.propHooks.selected = { get: function get(a) {
      var b = a.parentNode;return b && b.parentNode && b.parentNode.selectedIndex, null;
    }, set: function set(a) {
      var b = a.parentNode;b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex);
    } }), r.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
    r.propFix[this.toLowerCase()] = this;
  });function pb(a) {
    var b = a.match(L) || [];return b.join(" ");
  }function qb(a) {
    return a.getAttribute && a.getAttribute("class") || "";
  }r.fn.extend({ addClass: function addClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;if (r.isFunction(a)) return this.each(function (b) {
        r(this).addClass(a.call(this, b, qb(this)));
      });if ("string" == typeof a && a) {
        b = a.match(L) || [];while (c = this[i++]) {
          if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
            g = 0;while (f = b[g++]) {
              d.indexOf(" " + f + " ") < 0 && (d += f + " ");
            }h = pb(d), e !== h && c.setAttribute("class", h);
          }
        }
      }return this;
    }, removeClass: function removeClass(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h,
          i = 0;if (r.isFunction(a)) return this.each(function (b) {
        r(this).removeClass(a.call(this, b, qb(this)));
      });if (!arguments.length) return this.attr("class", "");if ("string" == typeof a && a) {
        b = a.match(L) || [];while (c = this[i++]) {
          if (e = qb(c), d = 1 === c.nodeType && " " + pb(e) + " ") {
            g = 0;while (f = b[g++]) {
              while (d.indexOf(" " + f + " ") > -1) {
                d = d.replace(" " + f + " ", " ");
              }
            }h = pb(d), e !== h && c.setAttribute("class", h);
          }
        }
      }return this;
    }, toggleClass: function toggleClass(a, b) {
      var c = typeof a === "undefined" ? "undefined" : _typeof(a);return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : r.isFunction(a) ? this.each(function (c) {
        r(this).toggleClass(a.call(this, c, qb(this), b), b);
      }) : this.each(function () {
        var b, d, e, f;if ("string" === c) {
          d = 0, e = r(this), f = a.match(L) || [];while (b = f[d++]) {
            e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
          }
        } else void 0 !== a && "boolean" !== c || (b = qb(this), b && W.set(this, "__className__", b), this.setAttribute && this.setAttribute("class", b || a === !1 ? "" : W.get(this, "__className__") || ""));
      });
    }, hasClass: function hasClass(a) {
      var b,
          c,
          d = 0;b = " " + a + " ";while (c = this[d++]) {
        if (1 === c.nodeType && (" " + pb(qb(c)) + " ").indexOf(b) > -1) return !0;
      }return !1;
    } });var rb = /\r/g;r.fn.extend({ val: function val(a) {
      var b,
          c,
          d,
          e = this[0];{
        if (arguments.length) return d = r.isFunction(a), this.each(function (c) {
          var e;1 === this.nodeType && (e = d ? a.call(this, c, r(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : Array.isArray(e) && (e = r.map(e, function (a) {
            return null == a ? "" : a + "";
          })), b = r.valHooks[this.type] || r.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e));
        });if (e) return b = r.valHooks[e.type] || r.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(rb, "") : null == c ? "" : c);
      }
    } }), r.extend({ valHooks: { option: { get: function get(a) {
          var b = r.find.attr(a, "value");return null != b ? b : pb(r.text(a));
        } }, select: { get: function get(a) {
          var b,
              c,
              d,
              e = a.options,
              f = a.selectedIndex,
              g = "select-one" === a.type,
              h = g ? null : [],
              i = g ? f + 1 : e.length;for (d = f < 0 ? i : g ? f : 0; d < i; d++) {
            if (c = e[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !B(c.parentNode, "optgroup"))) {
              if (b = r(c).val(), g) return b;h.push(b);
            }
          }return h;
        }, set: function set(a, b) {
          var c,
              d,
              e = a.options,
              f = r.makeArray(b),
              g = e.length;while (g--) {
            d = e[g], (d.selected = r.inArray(r.valHooks.option.get(d), f) > -1) && (c = !0);
          }return c || (a.selectedIndex = -1), f;
        } } } }), r.each(["radio", "checkbox"], function () {
    r.valHooks[this] = { set: function set(a, b) {
        if (Array.isArray(b)) return a.checked = r.inArray(r(a).val(), b) > -1;
      } }, o.checkOn || (r.valHooks[this].get = function (a) {
      return null === a.getAttribute("value") ? "on" : a.value;
    });
  });var sb = /^(?:focusinfocus|focusoutblur)$/;r.extend(r.event, { trigger: function trigger(b, c, e, f) {
      var g,
          h,
          i,
          j,
          k,
          m,
          n,
          o = [e || d],
          p = l.call(b, "type") ? b.type : b,
          q = l.call(b, "namespace") ? b.namespace.split(".") : [];if (h = i = e = e || d, 3 !== e.nodeType && 8 !== e.nodeType && !sb.test(p + r.event.triggered) && (p.indexOf(".") > -1 && (q = p.split("."), p = q.shift(), q.sort()), k = p.indexOf(":") < 0 && "on" + p, b = b[r.expando] ? b : new r.Event(p, "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && b), b.isTrigger = f ? 2 : 3, b.namespace = q.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + q.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = e), c = null == c ? [b] : r.makeArray(c, [b]), n = r.event.special[p] || {}, f || !n.trigger || n.trigger.apply(e, c) !== !1)) {
        if (!f && !n.noBubble && !r.isWindow(e)) {
          for (j = n.delegateType || p, sb.test(j + p) || (h = h.parentNode); h; h = h.parentNode) {
            o.push(h), i = h;
          }i === (e.ownerDocument || d) && o.push(i.defaultView || i.parentWindow || a);
        }g = 0;while ((h = o[g++]) && !b.isPropagationStopped()) {
          b.type = g > 1 ? j : n.bindType || p, m = (W.get(h, "events") || {})[b.type] && W.get(h, "handle"), m && m.apply(h, c), m = k && h[k], m && m.apply && U(h) && (b.result = m.apply(h, c), b.result === !1 && b.preventDefault());
        }return b.type = p, f || b.isDefaultPrevented() || n._default && n._default.apply(o.pop(), c) !== !1 || !U(e) || k && r.isFunction(e[p]) && !r.isWindow(e) && (i = e[k], i && (e[k] = null), r.event.triggered = p, e[p](), r.event.triggered = void 0, i && (e[k] = i)), b.result;
      }
    }, simulate: function simulate(a, b, c) {
      var d = r.extend(new r.Event(), c, { type: a, isSimulated: !0 });r.event.trigger(d, null, b);
    } }), r.fn.extend({ trigger: function trigger(a, b) {
      return this.each(function () {
        r.event.trigger(a, b, this);
      });
    }, triggerHandler: function triggerHandler(a, b) {
      var c = this[0];if (c) return r.event.trigger(a, b, c, !0);
    } }), r.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function (a, b) {
    r.fn[b] = function (a, c) {
      return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
    };
  }), r.fn.extend({ hover: function hover(a, b) {
      return this.mouseenter(a).mouseleave(b || a);
    } }), o.focusin = "onfocusin" in a, o.focusin || r.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
    var c = function c(a) {
      r.event.simulate(b, a.target, r.event.fix(a));
    };r.event.special[b] = { setup: function setup() {
        var d = this.ownerDocument || this,
            e = W.access(d, b);e || d.addEventListener(a, c, !0), W.access(d, b, (e || 0) + 1);
      }, teardown: function teardown() {
        var d = this.ownerDocument || this,
            e = W.access(d, b) - 1;e ? W.access(d, b, e) : (d.removeEventListener(a, c, !0), W.remove(d, b));
      } };
  });var tb = a.location,
      ub = r.now(),
      vb = /\?/;r.parseXML = function (b) {
    var c;if (!b || "string" != typeof b) return null;try {
      c = new a.DOMParser().parseFromString(b, "text/xml");
    } catch (d) {
      c = void 0;
    }return c && !c.getElementsByTagName("parsererror").length || r.error("Invalid XML: " + b), c;
  };var wb = /\[\]$/,
      xb = /\r?\n/g,
      yb = /^(?:submit|button|image|reset|file)$/i,
      zb = /^(?:input|select|textarea|keygen)/i;function Ab(a, b, c, d) {
    var e;if (Array.isArray(b)) r.each(b, function (b, e) {
      c || wb.test(a) ? d(a, e) : Ab(a + "[" + ("object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && null != e ? b : "") + "]", e, c, d);
    });else if (c || "object" !== r.type(b)) d(a, b);else for (e in b) {
      Ab(a + "[" + e + "]", b[e], c, d);
    }
  }r.param = function (a, b) {
    var c,
        d = [],
        e = function e(a, b) {
      var c = r.isFunction(b) ? b() : b;d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(null == c ? "" : c);
    };if (Array.isArray(a) || a.jquery && !r.isPlainObject(a)) r.each(a, function () {
      e(this.name, this.value);
    });else for (c in a) {
      Ab(c, a[c], b, e);
    }return d.join("&");
  }, r.fn.extend({ serialize: function serialize() {
      return r.param(this.serializeArray());
    }, serializeArray: function serializeArray() {
      return this.map(function () {
        var a = r.prop(this, "elements");return a ? r.makeArray(a) : this;
      }).filter(function () {
        var a = this.type;return this.name && !r(this).is(":disabled") && zb.test(this.nodeName) && !yb.test(a) && (this.checked || !ja.test(a));
      }).map(function (a, b) {
        var c = r(this).val();return null == c ? null : Array.isArray(c) ? r.map(c, function (a) {
          return { name: b.name, value: a.replace(xb, "\r\n") };
        }) : { name: b.name, value: c.replace(xb, "\r\n") };
      }).get();
    } });var Bb = /%20/g,
      Cb = /#.*$/,
      Db = /([?&])_=[^&]*/,
      Eb = /^(.*?):[ \t]*([^\r\n]*)$/gm,
      Fb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
      Gb = /^(?:GET|HEAD)$/,
      Hb = /^\/\//,
      Ib = {},
      Jb = {},
      Kb = "*/".concat("*"),
      Lb = d.createElement("a");Lb.href = tb.href;function Mb(a) {
    return function (b, c) {
      "string" != typeof b && (c = b, b = "*");var d,
          e = 0,
          f = b.toLowerCase().match(L) || [];if (r.isFunction(c)) while (d = f[e++]) {
        "+" === d[0] ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
      }
    };
  }function Nb(a, b, c, d) {
    var e = {},
        f = a === Jb;function g(h) {
      var i;return e[h] = !0, r.each(a[h] || [], function (a, h) {
        var j = h(b, c, d);return "string" != typeof j || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1);
      }), i;
    }return g(b.dataTypes[0]) || !e["*"] && g("*");
  }function Ob(a, b) {
    var c,
        d,
        e = r.ajaxSettings.flatOptions || {};for (c in b) {
      void 0 !== b[c] && ((e[c] ? a : d || (d = {}))[c] = b[c]);
    }return d && r.extend(!0, a, d), a;
  }function Pb(a, b, c) {
    var d,
        e,
        f,
        g,
        h = a.contents,
        i = a.dataTypes;while ("*" === i[0]) {
      i.shift(), void 0 === d && (d = a.mimeType || b.getResponseHeader("Content-Type"));
    }if (d) for (e in h) {
      if (h[e] && h[e].test(d)) {
        i.unshift(e);break;
      }
    }if (i[0] in c) f = i[0];else {
      for (e in c) {
        if (!i[0] || a.converters[e + " " + i[0]]) {
          f = e;break;
        }g || (g = e);
      }f = f || g;
    }if (f) return f !== i[0] && i.unshift(f), c[f];
  }function Qb(a, b, c, d) {
    var e,
        f,
        g,
        h,
        i,
        j = {},
        k = a.dataTypes.slice();if (k[1]) for (g in a.converters) {
      j[g.toLowerCase()] = a.converters[g];
    }f = k.shift();while (f) {
      if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if ("*" === f) f = i;else if ("*" !== i && i !== f) {
        if (g = j[i + " " + f] || j["* " + f], !g) for (e in j) {
          if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
            g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));break;
          }
        }if (g !== !0) if (g && a["throws"]) b = g(b);else try {
          b = g(b);
        } catch (l) {
          return { state: "parsererror", error: g ? l : "No conversion from " + i + " to " + f };
        }
      }
    }return { state: "success", data: b };
  }r.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: tb.href, type: "GET", isLocal: Fb.test(tb.protocol), global: !0, processData: !0, async: !0, contentType: "application/x-www-form-urlencoded; charset=UTF-8", accepts: { "*": Kb, text: "text/plain", html: "text/html", xml: "application/xml, text/xml", json: "application/json, text/javascript" }, contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ }, responseFields: { xml: "responseXML", text: "responseText", json: "responseJSON" }, converters: { "* text": String, "text html": !0, "text json": JSON.parse, "text xml": r.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup: function ajaxSetup(a, b) {
      return b ? Ob(Ob(a, r.ajaxSettings), b) : Ob(r.ajaxSettings, a);
    }, ajaxPrefilter: Mb(Ib), ajaxTransport: Mb(Jb), ajax: function ajax(b, c) {
      "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (c = b, b = void 0), c = c || {};var e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o = r.ajaxSetup({}, c),
          p = o.context || o,
          q = o.context && (p.nodeType || p.jquery) ? r(p) : r.event,
          s = r.Deferred(),
          t = r.Callbacks("once memory"),
          u = o.statusCode || {},
          v = {},
          w = {},
          x = "canceled",
          y = { readyState: 0, getResponseHeader: function getResponseHeader(a) {
          var b;if (k) {
            if (!h) {
              h = {};while (b = Eb.exec(g)) {
                h[b[1].toLowerCase()] = b[2];
              }
            }b = h[a.toLowerCase()];
          }return null == b ? null : b;
        }, getAllResponseHeaders: function getAllResponseHeaders() {
          return k ? g : null;
        }, setRequestHeader: function setRequestHeader(a, b) {
          return null == k && (a = w[a.toLowerCase()] = w[a.toLowerCase()] || a, v[a] = b), this;
        }, overrideMimeType: function overrideMimeType(a) {
          return null == k && (o.mimeType = a), this;
        }, statusCode: function statusCode(a) {
          var b;if (a) if (k) y.always(a[y.status]);else for (b in a) {
            u[b] = [u[b], a[b]];
          }return this;
        }, abort: function abort(a) {
          var b = a || x;return e && e.abort(b), A(0, b), this;
        } };if (s.promise(y), o.url = ((b || o.url || tb.href) + "").replace(Hb, tb.protocol + "//"), o.type = c.method || c.type || o.method || o.type, o.dataTypes = (o.dataType || "*").toLowerCase().match(L) || [""], null == o.crossDomain) {
        j = d.createElement("a");try {
          j.href = o.url, j.href = j.href, o.crossDomain = Lb.protocol + "//" + Lb.host != j.protocol + "//" + j.host;
        } catch (z) {
          o.crossDomain = !0;
        }
      }if (o.data && o.processData && "string" != typeof o.data && (o.data = r.param(o.data, o.traditional)), Nb(Ib, o, c, y), k) return y;l = r.event && o.global, l && 0 === r.active++ && r.event.trigger("ajaxStart"), o.type = o.type.toUpperCase(), o.hasContent = !Gb.test(o.type), f = o.url.replace(Cb, ""), o.hasContent ? o.data && o.processData && 0 === (o.contentType || "").indexOf("application/x-www-form-urlencoded") && (o.data = o.data.replace(Bb, "+")) : (n = o.url.slice(f.length), o.data && (f += (vb.test(f) ? "&" : "?") + o.data, delete o.data), o.cache === !1 && (f = f.replace(Db, "$1"), n = (vb.test(f) ? "&" : "?") + "_=" + ub++ + n), o.url = f + n), o.ifModified && (r.lastModified[f] && y.setRequestHeader("If-Modified-Since", r.lastModified[f]), r.etag[f] && y.setRequestHeader("If-None-Match", r.etag[f])), (o.data && o.hasContent && o.contentType !== !1 || c.contentType) && y.setRequestHeader("Content-Type", o.contentType), y.setRequestHeader("Accept", o.dataTypes[0] && o.accepts[o.dataTypes[0]] ? o.accepts[o.dataTypes[0]] + ("*" !== o.dataTypes[0] ? ", " + Kb + "; q=0.01" : "") : o.accepts["*"]);for (m in o.headers) {
        y.setRequestHeader(m, o.headers[m]);
      }if (o.beforeSend && (o.beforeSend.call(p, y, o) === !1 || k)) return y.abort();if (x = "abort", t.add(o.complete), y.done(o.success), y.fail(o.error), e = Nb(Jb, o, c, y)) {
        if (y.readyState = 1, l && q.trigger("ajaxSend", [y, o]), k) return y;o.async && o.timeout > 0 && (i = a.setTimeout(function () {
          y.abort("timeout");
        }, o.timeout));try {
          k = !1, e.send(v, A);
        } catch (z) {
          if (k) throw z;A(-1, z);
        }
      } else A(-1, "No Transport");function A(b, c, d, h) {
        var j,
            m,
            n,
            v,
            w,
            x = c;k || (k = !0, i && a.clearTimeout(i), e = void 0, g = h || "", y.readyState = b > 0 ? 4 : 0, j = b >= 200 && b < 300 || 304 === b, d && (v = Pb(o, y, d)), v = Qb(o, v, y, j), j ? (o.ifModified && (w = y.getResponseHeader("Last-Modified"), w && (r.lastModified[f] = w), w = y.getResponseHeader("etag"), w && (r.etag[f] = w)), 204 === b || "HEAD" === o.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = v.state, m = v.data, n = v.error, j = !n)) : (n = x, !b && x || (x = "error", b < 0 && (b = 0))), y.status = b, y.statusText = (c || x) + "", j ? s.resolveWith(p, [m, x, y]) : s.rejectWith(p, [y, x, n]), y.statusCode(u), u = void 0, l && q.trigger(j ? "ajaxSuccess" : "ajaxError", [y, o, j ? m : n]), t.fireWith(p, [y, x]), l && (q.trigger("ajaxComplete", [y, o]), --r.active || r.event.trigger("ajaxStop")));
      }return y;
    }, getJSON: function getJSON(a, b, c) {
      return r.get(a, b, c, "json");
    }, getScript: function getScript(a, b) {
      return r.get(a, void 0, b, "script");
    } }), r.each(["get", "post"], function (a, b) {
    r[b] = function (a, c, d, e) {
      return r.isFunction(c) && (e = e || d, d = c, c = void 0), r.ajax(r.extend({ url: a, type: b, dataType: e, data: c, success: d }, r.isPlainObject(a) && a));
    };
  }), r._evalUrl = function (a) {
    return r.ajax({ url: a, type: "GET", dataType: "script", cache: !0, async: !1, global: !1, "throws": !0 });
  }, r.fn.extend({ wrapAll: function wrapAll(a) {
      var b;return this[0] && (r.isFunction(a) && (a = a.call(this[0])), b = r(a, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && b.insertBefore(this[0]), b.map(function () {
        var a = this;while (a.firstElementChild) {
          a = a.firstElementChild;
        }return a;
      }).append(this)), this;
    }, wrapInner: function wrapInner(a) {
      return r.isFunction(a) ? this.each(function (b) {
        r(this).wrapInner(a.call(this, b));
      }) : this.each(function () {
        var b = r(this),
            c = b.contents();c.length ? c.wrapAll(a) : b.append(a);
      });
    }, wrap: function wrap(a) {
      var b = r.isFunction(a);return this.each(function (c) {
        r(this).wrapAll(b ? a.call(this, c) : a);
      });
    }, unwrap: function unwrap(a) {
      return this.parent(a).not("body").each(function () {
        r(this).replaceWith(this.childNodes);
      }), this;
    } }), r.expr.pseudos.hidden = function (a) {
    return !r.expr.pseudos.visible(a);
  }, r.expr.pseudos.visible = function (a) {
    return !!(a.offsetWidth || a.offsetHeight || a.getClientRects().length);
  }, r.ajaxSettings.xhr = function () {
    try {
      return new a.XMLHttpRequest();
    } catch (b) {}
  };var Rb = { 0: 200, 1223: 204 },
      Sb = r.ajaxSettings.xhr();o.cors = !!Sb && "withCredentials" in Sb, o.ajax = Sb = !!Sb, r.ajaxTransport(function (b) {
    var _c, d;if (o.cors || Sb && !b.crossDomain) return { send: function send(e, f) {
        var g,
            h = b.xhr();if (h.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields) for (g in b.xhrFields) {
          h[g] = b.xhrFields[g];
        }b.mimeType && h.overrideMimeType && h.overrideMimeType(b.mimeType), b.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest");for (g in e) {
          h.setRequestHeader(g, e[g]);
        }_c = function c(a) {
          return function () {
            _c && (_c = d = h.onload = h.onerror = h.onabort = h.onreadystatechange = null, "abort" === a ? h.abort() : "error" === a ? "number" != typeof h.status ? f(0, "error") : f(h.status, h.statusText) : f(Rb[h.status] || h.status, h.statusText, "text" !== (h.responseType || "text") || "string" != typeof h.responseText ? { binary: h.response } : { text: h.responseText }, h.getAllResponseHeaders()));
          };
        }, h.onload = _c(), d = h.onerror = _c("error"), void 0 !== h.onabort ? h.onabort = d : h.onreadystatechange = function () {
          4 === h.readyState && a.setTimeout(function () {
            _c && d();
          });
        }, _c = _c("abort");try {
          h.send(b.hasContent && b.data || null);
        } catch (i) {
          if (_c) throw i;
        }
      }, abort: function abort() {
        _c && _c();
      } };
  }), r.ajaxPrefilter(function (a) {
    a.crossDomain && (a.contents.script = !1);
  }), r.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /\b(?:java|ecma)script\b/ }, converters: { "text script": function textScript(a) {
        return r.globalEval(a), a;
      } } }), r.ajaxPrefilter("script", function (a) {
    void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET");
  }), r.ajaxTransport("script", function (a) {
    if (a.crossDomain) {
      var b, _c2;return { send: function send(e, f) {
          b = r("<script>").prop({ charset: a.scriptCharset, src: a.url }).on("load error", _c2 = function c(a) {
            b.remove(), _c2 = null, a && f("error" === a.type ? 404 : 200, a.type);
          }), d.head.appendChild(b[0]);
        }, abort: function abort() {
          _c2 && _c2();
        } };
    }
  });var Tb = [],
      Ub = /(=)\?(?=&|$)|\?\?/;r.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
      var a = Tb.pop() || r.expando + "_" + ub++;return this[a] = !0, a;
    } }), r.ajaxPrefilter("json jsonp", function (b, c, d) {
    var e,
        f,
        g,
        h = b.jsonp !== !1 && (Ub.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && Ub.test(b.data) && "data");if (h || "jsonp" === b.dataTypes[0]) return e = b.jsonpCallback = r.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(Ub, "$1" + e) : b.jsonp !== !1 && (b.url += (vb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function () {
      return g || r.error(e + " was not called"), g[0];
    }, b.dataTypes[0] = "json", f = a[e], a[e] = function () {
      g = arguments;
    }, d.always(function () {
      void 0 === f ? r(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, Tb.push(e)), g && r.isFunction(f) && f(g[0]), g = f = void 0;
    }), "script";
  }), o.createHTMLDocument = function () {
    var a = d.implementation.createHTMLDocument("").body;return a.innerHTML = "<form></form><form></form>", 2 === a.childNodes.length;
  }(), r.parseHTML = function (a, b, c) {
    if ("string" != typeof a) return [];"boolean" == typeof b && (c = b, b = !1);var e, f, g;return b || (o.createHTMLDocument ? (b = d.implementation.createHTMLDocument(""), e = b.createElement("base"), e.href = d.location.href, b.head.appendChild(e)) : b = d), f = C.exec(a), g = !c && [], f ? [b.createElement(f[1])] : (f = qa([a], b, g), g && g.length && r(g).remove(), r.merge([], f.childNodes));
  }, r.fn.load = function (a, b, c) {
    var d,
        e,
        f,
        g = this,
        h = a.indexOf(" ");return h > -1 && (d = pb(a.slice(h)), a = a.slice(0, h)), r.isFunction(b) ? (c = b, b = void 0) : b && "object" == (typeof b === "undefined" ? "undefined" : _typeof(b)) && (e = "POST"), g.length > 0 && r.ajax({ url: a, type: e || "GET", dataType: "html", data: b }).done(function (a) {
      f = arguments, g.html(d ? r("<div>").append(r.parseHTML(a)).find(d) : a);
    }).always(c && function (a, b) {
      g.each(function () {
        c.apply(this, f || [a.responseText, b, a]);
      });
    }), this;
  }, r.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (a, b) {
    r.fn[b] = function (a) {
      return this.on(b, a);
    };
  }), r.expr.pseudos.animated = function (a) {
    return r.grep(r.timers, function (b) {
      return a === b.elem;
    }).length;
  }, r.offset = { setOffset: function setOffset(a, b, c) {
      var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k = r.css(a, "position"),
          l = r(a),
          m = {};"static" === k && (a.style.position = "relative"), h = l.offset(), f = r.css(a, "top"), i = r.css(a, "left"), j = ("absolute" === k || "fixed" === k) && (f + i).indexOf("auto") > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), r.isFunction(b) && (b = b.call(a, c, r.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m);
    } }, r.fn.extend({ offset: function offset(a) {
      if (arguments.length) return void 0 === a ? this : this.each(function (b) {
        r.offset.setOffset(this, a, b);
      });var b,
          c,
          d,
          e,
          f = this[0];if (f) return f.getClientRects().length ? (d = f.getBoundingClientRect(), b = f.ownerDocument, c = b.documentElement, e = b.defaultView, { top: d.top + e.pageYOffset - c.clientTop, left: d.left + e.pageXOffset - c.clientLeft }) : { top: 0, left: 0 };
    }, position: function position() {
      if (this[0]) {
        var a,
            b,
            c = this[0],
            d = { top: 0, left: 0 };return "fixed" === r.css(c, "position") ? b = c.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), B(a[0], "html") || (d = a.offset()), d = { top: d.top + r.css(a[0], "borderTopWidth", !0), left: d.left + r.css(a[0], "borderLeftWidth", !0) }), { top: b.top - d.top - r.css(c, "marginTop", !0), left: b.left - d.left - r.css(c, "marginLeft", !0) };
      }
    }, offsetParent: function offsetParent() {
      return this.map(function () {
        var a = this.offsetParent;while (a && "static" === r.css(a, "position")) {
          a = a.offsetParent;
        }return a || ra;
      });
    } }), r.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, b) {
    var c = "pageYOffset" === b;r.fn[a] = function (d) {
      return T(this, function (a, d, e) {
        var f;return r.isWindow(a) ? f = a : 9 === a.nodeType && (f = a.defaultView), void 0 === e ? f ? f[b] : a[d] : void (f ? f.scrollTo(c ? f.pageXOffset : e, c ? e : f.pageYOffset) : a[d] = e);
      }, a, d, arguments.length);
    };
  }), r.each(["top", "left"], function (a, b) {
    r.cssHooks[b] = Pa(o.pixelPosition, function (a, c) {
      if (c) return c = Oa(a, b), Ma.test(c) ? r(a).position()[b] + "px" : c;
    });
  }), r.each({ Height: "height", Width: "width" }, function (a, b) {
    r.each({ padding: "inner" + a, content: b, "": "outer" + a }, function (c, d) {
      r.fn[d] = function (e, f) {
        var g = arguments.length && (c || "boolean" != typeof e),
            h = c || (e === !0 || f === !0 ? "margin" : "border");return T(this, function (b, c, e) {
          var f;return r.isWindow(b) ? 0 === d.indexOf("outer") ? b["inner" + a] : b.document.documentElement["client" + a] : 9 === b.nodeType ? (f = b.documentElement, Math.max(b.body["scroll" + a], f["scroll" + a], b.body["offset" + a], f["offset" + a], f["client" + a])) : void 0 === e ? r.css(b, c, h) : r.style(b, c, e, h);
        }, b, g ? e : void 0, g);
      };
    });
  }), r.fn.extend({ bind: function bind(a, b, c) {
      return this.on(a, null, b, c);
    }, unbind: function unbind(a, b) {
      return this.off(a, null, b);
    }, delegate: function delegate(a, b, c, d) {
      return this.on(b, a, c, d);
    }, undelegate: function undelegate(a, b, c) {
      return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c);
    } }), r.holdReady = function (a) {
    a ? r.readyWait++ : r.ready(!0);
  }, r.isArray = Array.isArray, r.parseJSON = JSON.parse, r.nodeName = B, "function" == typeof define && define.amd && define("jquery", [], function () {
    return r;
  });var Vb = a.jQuery,
      Wb = a.$;return r.noConflict = function (b) {
    return a.$ === r && (a.$ = Wb), b && a.jQuery === r && (a.jQuery = Vb), r;
  }, b || (a.jQuery = a.$ = r), r;
});

/*
 Copyright (C) Federico Zivolo 2017
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */(function (e, t) {
  'object' == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && 'undefined' != typeof module ? module.exports = t() : 'function' == typeof define && define.amd ? define(t) : e.Popper = t();
})(this, function () {
  'use strict';
  function e(e) {
    return e && '[object Function]' === {}.toString.call(e);
  }function t(e, t) {
    if (1 !== e.nodeType) return [];var o = window.getComputedStyle(e, null);return t ? o[t] : o;
  }function o(e) {
    return 'HTML' === e.nodeName ? e : e.parentNode || e.host;
  }function n(e) {
    if (!e || -1 !== ['HTML', 'BODY', '#document'].indexOf(e.nodeName)) return window.document.body;var i = t(e),
        r = i.overflow,
        p = i.overflowX,
        s = i.overflowY;return (/(auto|scroll)/.test(r + s + p) ? e : n(o(e))
    );
  }function r(e) {
    var o = e && e.offsetParent,
        i = o && o.nodeName;return i && 'BODY' !== i && 'HTML' !== i ? -1 !== ['TD', 'TABLE'].indexOf(o.nodeName) && 'static' === t(o, 'position') ? r(o) : o : window.document.documentElement;
  }function p(e) {
    var t = e.nodeName;return 'BODY' !== t && ('HTML' === t || r(e.firstElementChild) === e);
  }function s(e) {
    return null === e.parentNode ? e : s(e.parentNode);
  }function d(e, t) {
    if (!e || !e.nodeType || !t || !t.nodeType) return window.document.documentElement;var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
        i = o ? e : t,
        n = o ? t : e,
        a = document.createRange();a.setStart(i, 0), a.setEnd(n, 0);var l = a.commonAncestorContainer;if (e !== l && t !== l || i.contains(n)) return p(l) ? l : r(l);var f = s(e);return f.host ? d(f.host, t) : d(e, s(t).host);
  }function a(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'top',
        o = 'top' === t ? 'scrollTop' : 'scrollLeft',
        i = e.nodeName;if ('BODY' === i || 'HTML' === i) {
      var n = window.document.documentElement,
          r = window.document.scrollingElement || n;return r[o];
    }return e[o];
  }function l(e, t) {
    var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
        i = a(t, 'top'),
        n = a(t, 'left'),
        r = o ? -1 : 1;return e.top += i * r, e.bottom += i * r, e.left += n * r, e.right += n * r, e;
  }function f(e, t) {
    var o = 'x' === t ? 'Left' : 'Top',
        i = 'Left' == o ? 'Right' : 'Bottom';return +e['border' + o + 'Width'].split('px')[0] + +e['border' + i + 'Width'].split('px')[0];
  }function m(e, t, o, i) {
    return X(t['offset' + e], t['scroll' + e], o['client' + e], o['offset' + e], o['scroll' + e], ne() ? o['offset' + e] + i['margin' + ('Height' === e ? 'Top' : 'Left')] + i['margin' + ('Height' === e ? 'Bottom' : 'Right')] : 0);
  }function c() {
    var e = window.document.body,
        t = window.document.documentElement,
        o = ne() && window.getComputedStyle(t);return { height: m('Height', e, t, o), width: m('Width', e, t, o) };
  }function h(e) {
    return de({}, e, { right: e.left + e.width, bottom: e.top + e.height });
  }function g(e) {
    var o = {};if (ne()) try {
      o = e.getBoundingClientRect();var i = a(e, 'top'),
          n = a(e, 'left');o.top += i, o.left += n, o.bottom += i, o.right += n;
    } catch (e) {} else o = e.getBoundingClientRect();var r = { left: o.left, top: o.top, width: o.right - o.left, height: o.bottom - o.top },
        p = 'HTML' === e.nodeName ? c() : {},
        s = p.width || e.clientWidth || r.right - r.left,
        d = p.height || e.clientHeight || r.bottom - r.top,
        l = e.offsetWidth - s,
        m = e.offsetHeight - d;if (l || m) {
      var g = t(e);l -= f(g, 'x'), m -= f(g, 'y'), r.width -= l, r.height -= m;
    }return h(r);
  }function u(e, o) {
    var i = ne(),
        r = 'HTML' === o.nodeName,
        p = g(e),
        s = g(o),
        d = n(e),
        a = t(o),
        f = +a.borderTopWidth.split('px')[0],
        m = +a.borderLeftWidth.split('px')[0],
        c = h({ top: p.top - s.top - f, left: p.left - s.left - m, width: p.width, height: p.height });if (c.marginTop = 0, c.marginLeft = 0, !i && r) {
      var u = +a.marginTop.split('px')[0],
          b = +a.marginLeft.split('px')[0];c.top -= f - u, c.bottom -= f - u, c.left -= m - b, c.right -= m - b, c.marginTop = u, c.marginLeft = b;
    }return (i ? o.contains(d) : o === d && 'BODY' !== d.nodeName) && (c = l(c, o)), c;
  }function b(e) {
    var t = window.document.documentElement,
        o = u(e, t),
        i = X(t.clientWidth, window.innerWidth || 0),
        n = X(t.clientHeight, window.innerHeight || 0),
        r = a(t),
        p = a(t, 'left'),
        s = { top: r - o.top + o.marginTop, left: p - o.left + o.marginLeft, width: i, height: n };return h(s);
  }function y(e) {
    var i = e.nodeName;return 'BODY' === i || 'HTML' === i ? !1 : 'fixed' === t(e, 'position') || y(o(e));
  }function w(e, t, i, r) {
    var p = { top: 0, left: 0 },
        s = d(e, t);if ('viewport' === r) p = b(s);else {
      var a;'scrollParent' === r ? (a = n(o(e)), 'BODY' === a.nodeName && (a = window.document.documentElement)) : 'window' === r ? a = window.document.documentElement : a = r;var l = u(a, s);if ('HTML' === a.nodeName && !y(s)) {
        var f = c(),
            m = f.height,
            h = f.width;p.top += l.top - l.marginTop, p.bottom = m + l.top, p.left += l.left - l.marginLeft, p.right = h + l.left;
      } else p = l;
    }return p.left += i, p.top += i, p.right -= i, p.bottom -= i, p;
  }function E(e) {
    var t = e.width,
        o = e.height;return t * o;
  }function v(e, t, o, i, n) {
    var r = 5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;if (-1 === e.indexOf('auto')) return e;var p = w(o, i, r, n),
        s = { top: { width: p.width, height: t.top - p.top }, right: { width: p.right - t.right, height: p.height }, bottom: { width: p.width, height: p.bottom - t.bottom }, left: { width: t.left - p.left, height: p.height } },
        d = Object.keys(s).map(function (e) {
      return de({ key: e }, s[e], { area: E(s[e]) });
    }).sort(function (e, t) {
      return t.area - e.area;
    }),
        a = d.filter(function (e) {
      var t = e.width,
          i = e.height;return t >= o.clientWidth && i >= o.clientHeight;
    }),
        l = 0 < a.length ? a[0].key : d[0].key,
        f = e.split('-')[1];return l + (f ? '-' + f : '');
  }function x(e, t, o) {
    var i = d(t, o);return u(o, i);
  }function O(e) {
    var t = window.getComputedStyle(e),
        o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
        i = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
        n = { width: e.offsetWidth + i, height: e.offsetHeight + o };return n;
  }function L(e) {
    var t = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };return e.replace(/left|right|bottom|top/g, function (e) {
      return t[e];
    });
  }function S(e, t, o) {
    o = o.split('-')[0];var i = O(e),
        n = { width: i.width, height: i.height },
        r = -1 !== ['right', 'left'].indexOf(o),
        p = r ? 'top' : 'left',
        s = r ? 'left' : 'top',
        d = r ? 'height' : 'width',
        a = r ? 'width' : 'height';return n[p] = t[p] + t[d] / 2 - i[d] / 2, n[s] = o === s ? t[s] - i[a] : t[L(s)], n;
  }function T(e, t) {
    return Array.prototype.find ? e.find(t) : e.filter(t)[0];
  }function C(e, t, o) {
    if (Array.prototype.findIndex) return e.findIndex(function (e) {
      return e[t] === o;
    });var i = T(e, function (e) {
      return e[t] === o;
    });return e.indexOf(i);
  }function N(t, o, i) {
    var n = void 0 === i ? t : t.slice(0, C(t, 'name', i));return n.forEach(function (t) {
      t.function && console.warn('`modifier.function` is deprecated, use `modifier.fn`!');var i = t.function || t.fn;t.enabled && e(i) && (o.offsets.popper = h(o.offsets.popper), o.offsets.reference = h(o.offsets.reference), o = i(o, t));
    }), o;
  }function k() {
    if (!this.state.isDestroyed) {
      var e = { instance: this, styles: {}, arrowStyles: {}, attributes: {}, flipped: !1, offsets: {} };e.offsets.reference = x(this.state, this.popper, this.reference), e.placement = v(this.options.placement, e.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding), e.originalPlacement = e.placement, e.offsets.popper = S(this.popper, e.offsets.reference, e.placement), e.offsets.popper.position = 'absolute', e = N(this.modifiers, e), this.state.isCreated ? this.options.onUpdate(e) : (this.state.isCreated = !0, this.options.onCreate(e));
    }
  }function W(e, t) {
    return e.some(function (e) {
      var o = e.name,
          i = e.enabled;return i && o === t;
    });
  }function B(e) {
    for (var t = [!1, 'ms', 'Webkit', 'Moz', 'O'], o = e.charAt(0).toUpperCase() + e.slice(1), n = 0; n < t.length - 1; n++) {
      var i = t[n],
          r = i ? '' + i + o : e;if ('undefined' != typeof window.document.body.style[r]) return r;
    }return null;
  }function P() {
    return this.state.isDestroyed = !0, W(this.modifiers, 'applyStyle') && (this.popper.removeAttribute('x-placement'), this.popper.style.left = '', this.popper.style.position = '', this.popper.style.top = '', this.popper.style[B('transform')] = ''), this.disableEventListeners(), this.options.removeOnDestroy && this.popper.parentNode.removeChild(this.popper), this;
  }function D(e, t, o, i) {
    var r = 'BODY' === e.nodeName,
        p = r ? window : e;p.addEventListener(t, o, { passive: !0 }), r || D(n(p.parentNode), t, o, i), i.push(p);
  }function H(e, t, o, i) {
    o.updateBound = i, window.addEventListener('resize', o.updateBound, { passive: !0 });var r = n(e);return D(r, 'scroll', o.updateBound, o.scrollParents), o.scrollElement = r, o.eventsEnabled = !0, o;
  }function A() {
    this.state.eventsEnabled || (this.state = H(this.reference, this.options, this.state, this.scheduleUpdate));
  }function M(e, t) {
    return window.removeEventListener('resize', t.updateBound), t.scrollParents.forEach(function (e) {
      e.removeEventListener('scroll', t.updateBound);
    }), t.updateBound = null, t.scrollParents = [], t.scrollElement = null, t.eventsEnabled = !1, t;
  }function I() {
    this.state.eventsEnabled && (window.cancelAnimationFrame(this.scheduleUpdate), this.state = M(this.reference, this.state));
  }function R(e) {
    return '' !== e && !isNaN(parseFloat(e)) && isFinite(e);
  }function U(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = '';-1 !== ['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(o) && R(t[o]) && (i = 'px'), e.style[o] = t[o] + i;
    });
  }function Y(e, t) {
    Object.keys(t).forEach(function (o) {
      var i = t[o];!1 === i ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
    });
  }function F(e, t, o) {
    var i = T(e, function (e) {
      var o = e.name;return o === t;
    }),
        n = !!i && e.some(function (e) {
      return e.name === o && e.enabled && e.order < i.order;
    });if (!n) {
      var r = '`' + t + '`';console.warn('`' + o + '`' + ' modifier is required by ' + r + ' modifier in order to work, be sure to include it before ' + r + '!');
    }return n;
  }function j(e) {
    return 'end' === e ? 'start' : 'start' === e ? 'end' : e;
  }function K(e) {
    var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
        o = le.indexOf(e),
        i = le.slice(o + 1).concat(le.slice(0, o));return t ? i.reverse() : i;
  }function q(e, t, o, i) {
    var n = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
        r = +n[1],
        p = n[2];if (!r) return e;if (0 === p.indexOf('%')) {
      var s;switch (p) {case '%p':
          s = o;break;case '%':case '%r':default:
          s = i;}var d = h(s);return d[t] / 100 * r;
    }if ('vh' === p || 'vw' === p) {
      var a;return a = 'vh' === p ? X(document.documentElement.clientHeight, window.innerHeight || 0) : X(document.documentElement.clientWidth, window.innerWidth || 0), a / 100 * r;
    }return r;
  }function G(e, t, o, i) {
    var n = [0, 0],
        r = -1 !== ['right', 'left'].indexOf(i),
        p = e.split(/(\+|\-)/).map(function (e) {
      return e.trim();
    }),
        s = p.indexOf(T(p, function (e) {
      return -1 !== e.search(/,|\s/);
    }));p[s] && -1 === p[s].indexOf(',') && console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');var d = /\s*,\s*|\s+/,
        a = -1 === s ? [p] : [p.slice(0, s).concat([p[s].split(d)[0]]), [p[s].split(d)[1]].concat(p.slice(s + 1))];return a = a.map(function (e, i) {
      var n = (1 === i ? !r : r) ? 'height' : 'width',
          p = !1;return e.reduce(function (e, t) {
        return '' === e[e.length - 1] && -1 !== ['+', '-'].indexOf(t) ? (e[e.length - 1] = t, p = !0, e) : p ? (e[e.length - 1] += t, p = !1, e) : e.concat(t);
      }, []).map(function (e) {
        return q(e, n, t, o);
      });
    }), a.forEach(function (e, t) {
      e.forEach(function (o, i) {
        R(o) && (n[t] += o * ('-' === e[i - 1] ? -1 : 1));
      });
    }), n;
  }function z(e, t) {
    var o,
        i = t.offset,
        n = e.placement,
        r = e.offsets,
        p = r.popper,
        s = r.reference,
        d = n.split('-')[0];return o = R(+i) ? [+i, 0] : G(i, p, s, d), 'left' === d ? (p.top += o[0], p.left -= o[1]) : 'right' === d ? (p.top += o[0], p.left += o[1]) : 'top' === d ? (p.left += o[0], p.top -= o[1]) : 'bottom' === d && (p.left += o[0], p.top += o[1]), e.popper = p, e;
  }for (var V = Math.min, _ = Math.floor, X = Math.max, Q = ['native code', '[object MutationObserverConstructor]'], J = function J(e) {
    return Q.some(function (t) {
      return -1 < (e || '').toString().indexOf(t);
    });
  }, Z = 'undefined' != typeof window, $ = ['Edge', 'Trident', 'Firefox'], ee = 0, te = 0; te < $.length; te += 1) {
    if (Z && 0 <= navigator.userAgent.indexOf($[te])) {
      ee = 1;break;
    }
  }var i,
      oe = Z && J(window.MutationObserver),
      ie = oe ? function (e) {
    var t = !1,
        o = 0,
        i = document.createElement('span'),
        n = new MutationObserver(function () {
      e(), t = !1;
    });return n.observe(i, { attributes: !0 }), function () {
      t || (t = !0, i.setAttribute('x-index', o), ++o);
    };
  } : function (e) {
    var t = !1;return function () {
      t || (t = !0, setTimeout(function () {
        t = !1, e();
      }, ee));
    };
  },
      ne = function ne() {
    return void 0 == i && (i = -1 !== navigator.appVersion.indexOf('MSIE 10')), i;
  },
      re = function re(e, t) {
    if (!(e instanceof t)) throw new TypeError('Cannot call a class as a function');
  },
      pe = function () {
    function e(e, t) {
      for (var o, n = 0; n < t.length; n++) {
        o = t[n], o.enumerable = o.enumerable || !1, o.configurable = !0, 'value' in o && (o.writable = !0), Object.defineProperty(e, o.key, o);
      }
    }return function (t, o, i) {
      return o && e(t.prototype, o), i && e(t, i), t;
    };
  }(),
      se = function se(e, t, o) {
    return t in e ? Object.defineProperty(e, t, { value: o, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = o, e;
  },
      de = Object.assign || function (e) {
    for (var t, o = 1; o < arguments.length; o++) {
      for (var i in t = arguments[o], t) {
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
      }
    }return e;
  },
      ae = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'],
      le = ae.slice(3),
      fe = { FLIP: 'flip', CLOCKWISE: 'clockwise', COUNTERCLOCKWISE: 'counterclockwise' },
      me = function () {
    function t(o, i) {
      var n = this,
          r = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : {};re(this, t), this.scheduleUpdate = function () {
        return requestAnimationFrame(n.update);
      }, this.update = ie(this.update.bind(this)), this.options = de({}, t.Defaults, r), this.state = { isDestroyed: !1, isCreated: !1, scrollParents: [] }, this.reference = o.jquery ? o[0] : o, this.popper = i.jquery ? i[0] : i, this.options.modifiers = {}, Object.keys(de({}, t.Defaults.modifiers, r.modifiers)).forEach(function (e) {
        n.options.modifiers[e] = de({}, t.Defaults.modifiers[e] || {}, r.modifiers ? r.modifiers[e] : {});
      }), this.modifiers = Object.keys(this.options.modifiers).map(function (e) {
        return de({ name: e }, n.options.modifiers[e]);
      }).sort(function (e, t) {
        return e.order - t.order;
      }), this.modifiers.forEach(function (t) {
        t.enabled && e(t.onLoad) && t.onLoad(n.reference, n.popper, n.options, t, n.state);
      }), this.update();var p = this.options.eventsEnabled;p && this.enableEventListeners(), this.state.eventsEnabled = p;
    }return pe(t, [{ key: 'update', value: function value() {
        return k.call(this);
      } }, { key: 'destroy', value: function value() {
        return P.call(this);
      } }, { key: 'enableEventListeners', value: function value() {
        return A.call(this);
      } }, { key: 'disableEventListeners', value: function value() {
        return I.call(this);
      } }]), t;
  }();return me.Utils = ('undefined' == typeof window ? global : window).PopperUtils, me.placements = ae, me.Defaults = { placement: 'bottom', eventsEnabled: !0, removeOnDestroy: !1, onCreate: function onCreate() {}, onUpdate: function onUpdate() {}, modifiers: { shift: { order: 100, enabled: !0, fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              i = t.split('-')[1];if (i) {
            var n = e.offsets,
                r = n.reference,
                p = n.popper,
                s = -1 !== ['bottom', 'top'].indexOf(o),
                d = s ? 'left' : 'top',
                a = s ? 'width' : 'height',
                l = { start: se({}, d, r[d]), end: se({}, d, r[d] + r[a] - p[a]) };e.offsets.popper = de({}, p, l[i]);
          }return e;
        } }, offset: { order: 200, enabled: !0, fn: z, offset: 0 }, preventOverflow: { order: 300, enabled: !0, fn: function fn(e, t) {
          var o = t.boundariesElement || r(e.instance.popper);e.instance.reference === o && (o = r(o));var i = w(e.instance.popper, e.instance.reference, t.padding, o);t.boundaries = i;var n = t.priority,
              p = e.offsets.popper,
              s = { primary: function primary(e) {
              var o = p[e];return p[e] < i[e] && !t.escapeWithReference && (o = X(p[e], i[e])), se({}, e, o);
            }, secondary: function secondary(e) {
              var o = 'right' === e ? 'left' : 'top',
                  n = p[o];return p[e] > i[e] && !t.escapeWithReference && (n = V(p[o], i[e] - ('right' === e ? p.width : p.height))), se({}, o, n);
            } };return n.forEach(function (e) {
            var t = -1 === ['left', 'top'].indexOf(e) ? 'secondary' : 'primary';p = de({}, p, s[t](e));
          }), e.offsets.popper = p, e;
        }, priority: ['left', 'right', 'top', 'bottom'], padding: 5, boundariesElement: 'scrollParent' }, keepTogether: { order: 400, enabled: !0, fn: function fn(e) {
          var t = e.offsets,
              o = t.popper,
              i = t.reference,
              n = e.placement.split('-')[0],
              r = _,
              p = -1 !== ['top', 'bottom'].indexOf(n),
              s = p ? 'right' : 'bottom',
              d = p ? 'left' : 'top',
              a = p ? 'width' : 'height';return o[s] < r(i[d]) && (e.offsets.popper[d] = r(i[d]) - o[a]), o[d] > r(i[s]) && (e.offsets.popper[d] = r(i[s])), e;
        } }, arrow: { order: 500, enabled: !0, fn: function fn(e, o) {
          if (!F(e.instance.modifiers, 'arrow', 'keepTogether')) return e;var i = o.element;if ('string' == typeof i) {
            if (i = e.instance.popper.querySelector(i), !i) return e;
          } else if (!e.instance.popper.contains(i)) return console.warn('WARNING: `arrow.element` must be child of its popper element!'), e;var n = e.placement.split('-')[0],
              r = e.offsets,
              p = r.popper,
              s = r.reference,
              d = -1 !== ['left', 'right'].indexOf(n),
              a = d ? 'height' : 'width',
              l = d ? 'Top' : 'Left',
              f = l.toLowerCase(),
              m = d ? 'left' : 'top',
              c = d ? 'bottom' : 'right',
              g = O(i)[a];s[c] - g < p[f] && (e.offsets.popper[f] -= p[f] - (s[c] - g)), s[f] + g > p[c] && (e.offsets.popper[f] += s[f] + g - p[c]);var u = s[f] + s[a] / 2 - g / 2,
              b = t(e.instance.popper, 'margin' + l).replace('px', ''),
              y = u - h(e.offsets.popper)[f] - b;return y = X(V(p[a] - g, y), 0), e.arrowElement = i, e.offsets.arrow = {}, e.offsets.arrow[f] = Math.round(y), e.offsets.arrow[m] = '', e;
        }, element: '[x-arrow]' }, flip: { order: 600, enabled: !0, fn: function fn(e, t) {
          if (W(e.instance.modifiers, 'inner')) return e;if (e.flipped && e.placement === e.originalPlacement) return e;var o = w(e.instance.popper, e.instance.reference, t.padding, t.boundariesElement),
              i = e.placement.split('-')[0],
              n = L(i),
              r = e.placement.split('-')[1] || '',
              p = [];switch (t.behavior) {case fe.FLIP:
              p = [i, n];break;case fe.CLOCKWISE:
              p = K(i);break;case fe.COUNTERCLOCKWISE:
              p = K(i, !0);break;default:
              p = t.behavior;}return p.forEach(function (s, d) {
            if (i !== s || p.length === d + 1) return e;i = e.placement.split('-')[0], n = L(i);var a = e.offsets.popper,
                l = e.offsets.reference,
                f = _,
                m = 'left' === i && f(a.right) > f(l.left) || 'right' === i && f(a.left) < f(l.right) || 'top' === i && f(a.bottom) > f(l.top) || 'bottom' === i && f(a.top) < f(l.bottom),
                c = f(a.left) < f(o.left),
                h = f(a.right) > f(o.right),
                g = f(a.top) < f(o.top),
                u = f(a.bottom) > f(o.bottom),
                b = 'left' === i && c || 'right' === i && h || 'top' === i && g || 'bottom' === i && u,
                y = -1 !== ['top', 'bottom'].indexOf(i),
                w = !!t.flipVariations && (y && 'start' === r && c || y && 'end' === r && h || !y && 'start' === r && g || !y && 'end' === r && u);(m || b || w) && (e.flipped = !0, (m || b) && (i = p[d + 1]), w && (r = j(r)), e.placement = i + (r ? '-' + r : ''), e.offsets.popper = de({}, e.offsets.popper, S(e.instance.popper, e.offsets.reference, e.placement)), e = N(e.instance.modifiers, e, 'flip'));
          }), e;
        }, behavior: 'flip', padding: 5, boundariesElement: 'viewport' }, inner: { order: 700, enabled: !1, fn: function fn(e) {
          var t = e.placement,
              o = t.split('-')[0],
              i = e.offsets,
              n = i.popper,
              r = i.reference,
              p = -1 !== ['left', 'right'].indexOf(o),
              s = -1 === ['top', 'left'].indexOf(o);return n[p ? 'left' : 'top'] = r[o] - (s ? n[p ? 'width' : 'height'] : 0), e.placement = L(t), e.offsets.popper = h(n), e;
        } }, hide: { order: 800, enabled: !0, fn: function fn(e) {
          if (!F(e.instance.modifiers, 'hide', 'preventOverflow')) return e;var t = e.offsets.reference,
              o = T(e.instance.modifiers, function (e) {
            return 'preventOverflow' === e.name;
          }).boundaries;if (t.bottom < o.top || t.left > o.right || t.top > o.bottom || t.right < o.left) {
            if (!0 === e.hide) return e;e.hide = !0, e.attributes['x-out-of-boundaries'] = '';
          } else {
            if (!1 === e.hide) return e;e.hide = !1, e.attributes['x-out-of-boundaries'] = !1;
          }return e;
        } }, computeStyle: { order: 850, enabled: !0, fn: function fn(e, t) {
          var o = t.x,
              i = t.y,
              n = e.offsets.popper,
              p = T(e.instance.modifiers, function (e) {
            return 'applyStyle' === e.name;
          }).gpuAcceleration;void 0 !== p && console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');var s,
              d,
              a = void 0 === p ? t.gpuAcceleration : p,
              l = r(e.instance.popper),
              f = g(l),
              m = { position: n.position },
              c = { left: _(n.left), top: _(n.top), bottom: _(n.bottom), right: _(n.right) },
              h = 'bottom' === o ? 'top' : 'bottom',
              u = 'right' === i ? 'left' : 'right',
              b = B('transform');if (d = 'bottom' == h ? -f.height + c.bottom : c.top, s = 'right' == u ? -f.width + c.right : c.left, a && b) m[b] = 'translate3d(' + s + 'px, ' + d + 'px, 0)', m[h] = 0, m[u] = 0, m.willChange = 'transform';else {
            var y = 'bottom' == h ? -1 : 1,
                w = 'right' == u ? -1 : 1;m[h] = d * y, m[u] = s * w, m.willChange = h + ', ' + u;
          }var E = { "x-placement": e.placement };return e.attributes = de({}, E, e.attributes), e.styles = de({}, m, e.styles), e.arrowStyles = de({}, e.offsets.arrow, e.arrowStyles), e;
        }, gpuAcceleration: !0, x: 'bottom', y: 'right' }, applyStyle: { order: 900, enabled: !0, fn: function fn(e) {
          return U(e.instance.popper, e.styles), Y(e.instance.popper, e.attributes), e.arrowElement && Object.keys(e.arrowStyles).length && U(e.arrowElement, e.arrowStyles), e;
        }, onLoad: function onLoad(e, t, o, i, n) {
          var r = x(n, t, e),
              p = v(o.placement, r, t, e, o.modifiers.flip.boundariesElement, o.modifiers.flip.padding);return t.setAttribute('x-placement', p), U(t, { position: 'absolute' }), o;
        }, gpuAcceleration: void 0 } } }, me;
});
//# sourceMappingURL=popper.min.js.map

/*!
 * Bootstrap v4.0.0-beta (https://getbootstrap.com)
 * Copyright 2011-2017 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */
if ("undefined" == typeof jQuery) throw new Error("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");!function (t) {
  var e = jQuery.fn.jquery.split(" ")[0].split(".");if (e[0] < 2 && e[1] < 9 || 1 == e[0] && 9 == e[1] && e[2] < 1 || e[0] >= 4) throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0");
}(), function () {
  function t(t, e) {
    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? t : e;
  }function e(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + (typeof e === "undefined" ? "undefined" : _typeof(e)));t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e);
  }function n(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }var i = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
    return typeof t === "undefined" ? "undefined" : _typeof(t);
  } : function (t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
  },
      o = function () {
    function t(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }return function (e, n, i) {
      return n && t(e.prototype, n), i && t(e, i), e;
    };
  }(),
      r = function (t) {
    function e(t) {
      return {}.toString.call(t).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }function n(t) {
      return (t[0] || t).nodeType;
    }function i() {
      return { bindType: s.end, delegateType: s.end, handle: function handle(e) {
          if (t(e.target).is(this)) return e.handleObj.handler.apply(this, arguments);
        } };
    }function o() {
      if (window.QUnit) return !1;var t = document.createElement("bootstrap");for (var e in a) {
        if (void 0 !== t.style[e]) return { end: a[e] };
      }return !1;
    }function r(e) {
      var n = this,
          i = !1;return t(this).one(l.TRANSITION_END, function () {
        i = !0;
      }), setTimeout(function () {
        i || l.triggerTransitionEnd(n);
      }, e), this;
    }var s = !1,
        a = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" },
        l = { TRANSITION_END: "bsTransitionEnd", getUID: function getUID(t) {
        do {
          t += ~~(1e6 * Math.random());
        } while (document.getElementById(t));return t;
      }, getSelectorFromElement: function getSelectorFromElement(e) {
        var n = e.getAttribute("data-target");n && "#" !== n || (n = e.getAttribute("href") || "");try {
          return t(n).length > 0 ? n : null;
        } catch (t) {
          return null;
        }
      }, reflow: function reflow(t) {
        return t.offsetHeight;
      }, triggerTransitionEnd: function triggerTransitionEnd(e) {
        t(e).trigger(s.end);
      }, supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(s);
      }, typeCheckConfig: function typeCheckConfig(t, i, o) {
        for (var r in o) {
          if (o.hasOwnProperty(r)) {
            var s = o[r],
                a = i[r],
                l = a && n(a) ? "element" : e(a);if (!new RegExp(s).test(l)) throw new Error(t.toUpperCase() + ': Option "' + r + '" provided type "' + l + '" but expected type "' + s + '".');
          }
        }
      } };return s = o(), t.fn.emulateTransitionEnd = r, l.supportsTransitionEnd() && (t.event.special[l.TRANSITION_END] = i()), l;
  }(jQuery),
      s = (function (t) {
    var e = "alert",
        i = t.fn[e],
        s = { DISMISS: '[data-dismiss="alert"]' },
        a = { CLOSE: "close.bs.alert", CLOSED: "closed.bs.alert", CLICK_DATA_API: "click.bs.alert.data-api" },
        l = { ALERT: "alert", FADE: "fade", SHOW: "show" },
        h = function () {
      function e(t) {
        n(this, e), this._element = t;
      }return e.prototype.close = function (t) {
        t = t || this._element;var e = this._getRootElement(t);this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e);
      }, e.prototype.dispose = function () {
        t.removeData(this._element, "bs.alert"), this._element = null;
      }, e.prototype._getRootElement = function (e) {
        var n = r.getSelectorFromElement(e),
            i = !1;return n && (i = t(n)[0]), i || (i = t(e).closest("." + l.ALERT)[0]), i;
      }, e.prototype._triggerCloseEvent = function (e) {
        var n = t.Event(a.CLOSE);return t(e).trigger(n), n;
      }, e.prototype._removeElement = function (e) {
        var n = this;t(e).removeClass(l.SHOW), r.supportsTransitionEnd() && t(e).hasClass(l.FADE) ? t(e).one(r.TRANSITION_END, function (t) {
          return n._destroyElement(e, t);
        }).emulateTransitionEnd(150) : this._destroyElement(e);
      }, e.prototype._destroyElement = function (e) {
        t(e).detach().trigger(a.CLOSED).remove();
      }, e._jQueryInterface = function (n) {
        return this.each(function () {
          var i = t(this),
              o = i.data("bs.alert");o || (o = new e(this), i.data("bs.alert", o)), "close" === n && o[n](this);
        });
      }, e._handleDismiss = function (t) {
        return function (e) {
          e && e.preventDefault(), t.close(this);
        };
      }, o(e, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }]), e;
    }();t(document).on(a.CLICK_DATA_API, s.DISMISS, h._handleDismiss(new h())), t.fn[e] = h._jQueryInterface, t.fn[e].Constructor = h, t.fn[e].noConflict = function () {
      return t.fn[e] = i, h._jQueryInterface;
    };
  }(jQuery), function (t) {
    var e = "button",
        i = t.fn[e],
        r = { ACTIVE: "active", BUTTON: "btn", FOCUS: "focus" },
        s = { DATA_TOGGLE_CARROT: '[data-toggle^="button"]', DATA_TOGGLE: '[data-toggle="buttons"]', INPUT: "input", ACTIVE: ".active", BUTTON: ".btn" },
        a = { CLICK_DATA_API: "click.bs.button.data-api", FOCUS_BLUR_DATA_API: "focus.bs.button.data-api blur.bs.button.data-api" },
        l = function () {
      function e(t) {
        n(this, e), this._element = t;
      }return e.prototype.toggle = function () {
        var e = !0,
            n = !0,
            i = t(this._element).closest(s.DATA_TOGGLE)[0];if (i) {
          var o = t(this._element).find(s.INPUT)[0];if (o) {
            if ("radio" === o.type) if (o.checked && t(this._element).hasClass(r.ACTIVE)) e = !1;else {
              var a = t(i).find(s.ACTIVE)[0];a && t(a).removeClass(r.ACTIVE);
            }if (e) {
              if (o.hasAttribute("disabled") || i.hasAttribute("disabled") || o.classList.contains("disabled") || i.classList.contains("disabled")) return;o.checked = !t(this._element).hasClass(r.ACTIVE), t(o).trigger("change");
            }o.focus(), n = !1;
          }
        }n && this._element.setAttribute("aria-pressed", !t(this._element).hasClass(r.ACTIVE)), e && t(this._element).toggleClass(r.ACTIVE);
      }, e.prototype.dispose = function () {
        t.removeData(this._element, "bs.button"), this._element = null;
      }, e._jQueryInterface = function (n) {
        return this.each(function () {
          var i = t(this).data("bs.button");i || (i = new e(this), t(this).data("bs.button", i)), "toggle" === n && i[n]();
        });
      }, o(e, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }]), e;
    }();t(document).on(a.CLICK_DATA_API, s.DATA_TOGGLE_CARROT, function (e) {
      e.preventDefault();var n = e.target;t(n).hasClass(r.BUTTON) || (n = t(n).closest(s.BUTTON)), l._jQueryInterface.call(t(n), "toggle");
    }).on(a.FOCUS_BLUR_DATA_API, s.DATA_TOGGLE_CARROT, function (e) {
      var n = t(e.target).closest(s.BUTTON)[0];t(n).toggleClass(r.FOCUS, /^focus(in)?$/.test(e.type));
    }), t.fn[e] = l._jQueryInterface, t.fn[e].Constructor = l, t.fn[e].noConflict = function () {
      return t.fn[e] = i, l._jQueryInterface;
    };
  }(jQuery), function (t) {
    var e = "carousel",
        s = "bs.carousel",
        a = "." + s,
        l = t.fn[e],
        h = { interval: 5e3, keyboard: !0, slide: !1, pause: "hover", wrap: !0 },
        c = { interval: "(number|boolean)", keyboard: "boolean", slide: "(boolean|string)", pause: "(string|boolean)", wrap: "boolean" },
        u = { NEXT: "next", PREV: "prev", LEFT: "left", RIGHT: "right" },
        d = { SLIDE: "slide" + a, SLID: "slid" + a, KEYDOWN: "keydown" + a, MOUSEENTER: "mouseenter" + a, MOUSELEAVE: "mouseleave" + a, TOUCHEND: "touchend" + a, LOAD_DATA_API: "load.bs.carousel.data-api", CLICK_DATA_API: "click.bs.carousel.data-api" },
        f = { CAROUSEL: "carousel", ACTIVE: "active", SLIDE: "slide", RIGHT: "carousel-item-right", LEFT: "carousel-item-left", NEXT: "carousel-item-next", PREV: "carousel-item-prev", ITEM: "carousel-item" },
        p = { ACTIVE: ".active", ACTIVE_ITEM: ".active.carousel-item", ITEM: ".carousel-item", NEXT_PREV: ".carousel-item-next, .carousel-item-prev", INDICATORS: ".carousel-indicators", DATA_SLIDE: "[data-slide], [data-slide-to]", DATA_RIDE: '[data-ride="carousel"]' },
        _ = function () {
      function l(e, i) {
        n(this, l), this._items = null, this._interval = null, this._activeElement = null, this._isPaused = !1, this._isSliding = !1, this.touchTimeout = null, this._config = this._getConfig(i), this._element = t(e)[0], this._indicatorsElement = t(this._element).find(p.INDICATORS)[0], this._addEventListeners();
      }return l.prototype.next = function () {
        this._isSliding || this._slide(u.NEXT);
      }, l.prototype.nextWhenVisible = function () {
        document.hidden || this.next();
      }, l.prototype.prev = function () {
        this._isSliding || this._slide(u.PREV);
      }, l.prototype.pause = function (e) {
        e || (this._isPaused = !0), t(this._element).find(p.NEXT_PREV)[0] && r.supportsTransitionEnd() && (r.triggerTransitionEnd(this._element), this.cycle(!0)), clearInterval(this._interval), this._interval = null;
      }, l.prototype.cycle = function (t) {
        t || (this._isPaused = !1), this._interval && (clearInterval(this._interval), this._interval = null), this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval));
      }, l.prototype.to = function (e) {
        var n = this;this._activeElement = t(this._element).find(p.ACTIVE_ITEM)[0];var i = this._getItemIndex(this._activeElement);if (!(e > this._items.length - 1 || e < 0)) if (this._isSliding) t(this._element).one(d.SLID, function () {
          return n.to(e);
        });else {
          if (i === e) return this.pause(), void this.cycle();var o = e > i ? u.NEXT : u.PREV;this._slide(o, this._items[e]);
        }
      }, l.prototype.dispose = function () {
        t(this._element).off(a), t.removeData(this._element, s), this._items = null, this._config = null, this._element = null, this._interval = null, this._isPaused = null, this._isSliding = null, this._activeElement = null, this._indicatorsElement = null;
      }, l.prototype._getConfig = function (n) {
        return n = t.extend({}, h, n), r.typeCheckConfig(e, n, c), n;
      }, l.prototype._addEventListeners = function () {
        var e = this;this._config.keyboard && t(this._element).on(d.KEYDOWN, function (t) {
          return e._keydown(t);
        }), "hover" === this._config.pause && (t(this._element).on(d.MOUSEENTER, function (t) {
          return e.pause(t);
        }).on(d.MOUSELEAVE, function (t) {
          return e.cycle(t);
        }), "ontouchstart" in document.documentElement && t(this._element).on(d.TOUCHEND, function () {
          e.pause(), e.touchTimeout && clearTimeout(e.touchTimeout), e.touchTimeout = setTimeout(function (t) {
            return e.cycle(t);
          }, 500 + e._config.interval);
        }));
      }, l.prototype._keydown = function (t) {
        if (!/input|textarea/i.test(t.target.tagName)) switch (t.which) {case 37:
            t.preventDefault(), this.prev();break;case 39:
            t.preventDefault(), this.next();break;default:
            return;}
      }, l.prototype._getItemIndex = function (e) {
        return this._items = t.makeArray(t(e).parent().find(p.ITEM)), this._items.indexOf(e);
      }, l.prototype._getItemByDirection = function (t, e) {
        var n = t === u.NEXT,
            i = t === u.PREV,
            o = this._getItemIndex(e),
            r = this._items.length - 1;if ((i && 0 === o || n && o === r) && !this._config.wrap) return e;var s = (o + (t === u.PREV ? -1 : 1)) % this._items.length;return -1 === s ? this._items[this._items.length - 1] : this._items[s];
      }, l.prototype._triggerSlideEvent = function (e, n) {
        var i = this._getItemIndex(e),
            o = this._getItemIndex(t(this._element).find(p.ACTIVE_ITEM)[0]),
            r = t.Event(d.SLIDE, { relatedTarget: e, direction: n, from: o, to: i });return t(this._element).trigger(r), r;
      }, l.prototype._setActiveIndicatorElement = function (e) {
        if (this._indicatorsElement) {
          t(this._indicatorsElement).find(p.ACTIVE).removeClass(f.ACTIVE);var n = this._indicatorsElement.children[this._getItemIndex(e)];n && t(n).addClass(f.ACTIVE);
        }
      }, l.prototype._slide = function (e, n) {
        var i = this,
            o = t(this._element).find(p.ACTIVE_ITEM)[0],
            s = this._getItemIndex(o),
            a = n || o && this._getItemByDirection(e, o),
            l = this._getItemIndex(a),
            h = Boolean(this._interval),
            c = void 0,
            _ = void 0,
            g = void 0;if (e === u.NEXT ? (c = f.LEFT, _ = f.NEXT, g = u.LEFT) : (c = f.RIGHT, _ = f.PREV, g = u.RIGHT), a && t(a).hasClass(f.ACTIVE)) this._isSliding = !1;else if (!this._triggerSlideEvent(a, g).isDefaultPrevented() && o && a) {
          this._isSliding = !0, h && this.pause(), this._setActiveIndicatorElement(a);var m = t.Event(d.SLID, { relatedTarget: a, direction: g, from: s, to: l });r.supportsTransitionEnd() && t(this._element).hasClass(f.SLIDE) ? (t(a).addClass(_), r.reflow(a), t(o).addClass(c), t(a).addClass(c), t(o).one(r.TRANSITION_END, function () {
            t(a).removeClass(c + " " + _).addClass(f.ACTIVE), t(o).removeClass(f.ACTIVE + " " + _ + " " + c), i._isSliding = !1, setTimeout(function () {
              return t(i._element).trigger(m);
            }, 0);
          }).emulateTransitionEnd(600)) : (t(o).removeClass(f.ACTIVE), t(a).addClass(f.ACTIVE), this._isSliding = !1, t(this._element).trigger(m)), h && this.cycle();
        }
      }, l._jQueryInterface = function (e) {
        return this.each(function () {
          var n = t(this).data(s),
              o = t.extend({}, h, t(this).data());"object" === (void 0 === e ? "undefined" : i(e)) && t.extend(o, e);var r = "string" == typeof e ? e : o.slide;if (n || (n = new l(this, o), t(this).data(s, n)), "number" == typeof e) n.to(e);else if ("string" == typeof r) {
            if (void 0 === n[r]) throw new Error('No method named "' + r + '"');n[r]();
          } else o.interval && (n.pause(), n.cycle());
        });
      }, l._dataApiClickHandler = function (e) {
        var n = r.getSelectorFromElement(this);if (n) {
          var i = t(n)[0];if (i && t(i).hasClass(f.CAROUSEL)) {
            var o = t.extend({}, t(i).data(), t(this).data()),
                a = this.getAttribute("data-slide-to");a && (o.interval = !1), l._jQueryInterface.call(t(i), o), a && t(i).data(s).to(a), e.preventDefault();
          }
        }
      }, o(l, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }, { key: "Default", get: function get() {
          return h;
        } }]), l;
    }();t(document).on(d.CLICK_DATA_API, p.DATA_SLIDE, _._dataApiClickHandler), t(window).on(d.LOAD_DATA_API, function () {
      t(p.DATA_RIDE).each(function () {
        var e = t(this);_._jQueryInterface.call(e, e.data());
      });
    }), t.fn[e] = _._jQueryInterface, t.fn[e].Constructor = _, t.fn[e].noConflict = function () {
      return t.fn[e] = l, _._jQueryInterface;
    };
  }(jQuery), function (t) {
    var e = "collapse",
        s = "bs.collapse",
        a = t.fn[e],
        l = { toggle: !0, parent: "" },
        h = { toggle: "boolean", parent: "string" },
        c = { SHOW: "show.bs.collapse", SHOWN: "shown.bs.collapse", HIDE: "hide.bs.collapse", HIDDEN: "hidden.bs.collapse", CLICK_DATA_API: "click.bs.collapse.data-api" },
        u = { SHOW: "show", COLLAPSE: "collapse", COLLAPSING: "collapsing", COLLAPSED: "collapsed" },
        d = { WIDTH: "width", HEIGHT: "height" },
        f = { ACTIVES: ".show, .collapsing", DATA_TOGGLE: '[data-toggle="collapse"]' },
        p = function () {
      function a(e, i) {
        n(this, a), this._isTransitioning = !1, this._element = e, this._config = this._getConfig(i), this._triggerArray = t.makeArray(t('[data-toggle="collapse"][href="#' + e.id + '"],[data-toggle="collapse"][data-target="#' + e.id + '"]'));for (var o = t(f.DATA_TOGGLE), s = 0; s < o.length; s++) {
          var l = o[s],
              h = r.getSelectorFromElement(l);null !== h && t(h).filter(e).length > 0 && this._triggerArray.push(l);
        }this._parent = this._config.parent ? this._getParent() : null, this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray), this._config.toggle && this.toggle();
      }return a.prototype.toggle = function () {
        t(this._element).hasClass(u.SHOW) ? this.hide() : this.show();
      }, a.prototype.show = function () {
        var e = this;if (!this._isTransitioning && !t(this._element).hasClass(u.SHOW)) {
          var n = void 0,
              i = void 0;if (this._parent && ((n = t.makeArray(t(this._parent).children().children(f.ACTIVES))).length || (n = null)), !(n && (i = t(n).data(s)) && i._isTransitioning)) {
            var o = t.Event(c.SHOW);if (t(this._element).trigger(o), !o.isDefaultPrevented()) {
              n && (a._jQueryInterface.call(t(n), "hide"), i || t(n).data(s, null));var l = this._getDimension();t(this._element).removeClass(u.COLLAPSE).addClass(u.COLLAPSING), this._element.style[l] = 0, this._triggerArray.length && t(this._triggerArray).removeClass(u.COLLAPSED).attr("aria-expanded", !0), this.setTransitioning(!0);var h = function h() {
                t(e._element).removeClass(u.COLLAPSING).addClass(u.COLLAPSE).addClass(u.SHOW), e._element.style[l] = "", e.setTransitioning(!1), t(e._element).trigger(c.SHOWN);
              };if (r.supportsTransitionEnd()) {
                var d = "scroll" + (l[0].toUpperCase() + l.slice(1));t(this._element).one(r.TRANSITION_END, h).emulateTransitionEnd(600), this._element.style[l] = this._element[d] + "px";
              } else h();
            }
          }
        }
      }, a.prototype.hide = function () {
        var e = this;if (!this._isTransitioning && t(this._element).hasClass(u.SHOW)) {
          var n = t.Event(c.HIDE);if (t(this._element).trigger(n), !n.isDefaultPrevented()) {
            var i = this._getDimension();if (this._element.style[i] = this._element.getBoundingClientRect()[i] + "px", r.reflow(this._element), t(this._element).addClass(u.COLLAPSING).removeClass(u.COLLAPSE).removeClass(u.SHOW), this._triggerArray.length) for (var o = 0; o < this._triggerArray.length; o++) {
              var s = this._triggerArray[o],
                  a = r.getSelectorFromElement(s);null !== a && (t(a).hasClass(u.SHOW) || t(s).addClass(u.COLLAPSED).attr("aria-expanded", !1));
            }this.setTransitioning(!0);var l = function l() {
              e.setTransitioning(!1), t(e._element).removeClass(u.COLLAPSING).addClass(u.COLLAPSE).trigger(c.HIDDEN);
            };this._element.style[i] = "", r.supportsTransitionEnd() ? t(this._element).one(r.TRANSITION_END, l).emulateTransitionEnd(600) : l();
          }
        }
      }, a.prototype.setTransitioning = function (t) {
        this._isTransitioning = t;
      }, a.prototype.dispose = function () {
        t.removeData(this._element, s), this._config = null, this._parent = null, this._element = null, this._triggerArray = null, this._isTransitioning = null;
      }, a.prototype._getConfig = function (n) {
        return n = t.extend({}, l, n), n.toggle = Boolean(n.toggle), r.typeCheckConfig(e, n, h), n;
      }, a.prototype._getDimension = function () {
        return t(this._element).hasClass(d.WIDTH) ? d.WIDTH : d.HEIGHT;
      }, a.prototype._getParent = function () {
        var e = this,
            n = t(this._config.parent)[0],
            i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';return t(n).find(i).each(function (t, n) {
          e._addAriaAndCollapsedClass(a._getTargetFromElement(n), [n]);
        }), n;
      }, a.prototype._addAriaAndCollapsedClass = function (e, n) {
        if (e) {
          var i = t(e).hasClass(u.SHOW);n.length && t(n).toggleClass(u.COLLAPSED, !i).attr("aria-expanded", i);
        }
      }, a._getTargetFromElement = function (e) {
        var n = r.getSelectorFromElement(e);return n ? t(n)[0] : null;
      }, a._jQueryInterface = function (e) {
        return this.each(function () {
          var n = t(this),
              o = n.data(s),
              r = t.extend({}, l, n.data(), "object" === (void 0 === e ? "undefined" : i(e)) && e);if (!o && r.toggle && /show|hide/.test(e) && (r.toggle = !1), o || (o = new a(this, r), n.data(s, o)), "string" == typeof e) {
            if (void 0 === o[e]) throw new Error('No method named "' + e + '"');o[e]();
          }
        });
      }, o(a, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }, { key: "Default", get: function get() {
          return l;
        } }]), a;
    }();t(document).on(c.CLICK_DATA_API, f.DATA_TOGGLE, function (e) {
      /input|textarea/i.test(e.target.tagName) || e.preventDefault();var n = t(this),
          i = r.getSelectorFromElement(this);t(i).each(function () {
        var e = t(this),
            i = e.data(s) ? "toggle" : n.data();p._jQueryInterface.call(e, i);
      });
    }), t.fn[e] = p._jQueryInterface, t.fn[e].Constructor = p, t.fn[e].noConflict = function () {
      return t.fn[e] = a, p._jQueryInterface;
    };
  }(jQuery), function (t) {
    if ("undefined" == typeof Popper) throw new Error("Bootstrap dropdown require Popper.js (https://popper.js.org)");var e = "dropdown",
        s = "bs.dropdown",
        a = "." + s,
        l = t.fn[e],
        h = new RegExp("38|40|27"),
        c = { HIDE: "hide" + a, HIDDEN: "hidden" + a, SHOW: "show" + a, SHOWN: "shown" + a, CLICK: "click" + a, CLICK_DATA_API: "click.bs.dropdown.data-api", KEYDOWN_DATA_API: "keydown.bs.dropdown.data-api", KEYUP_DATA_API: "keyup.bs.dropdown.data-api" },
        u = { DISABLED: "disabled", SHOW: "show", DROPUP: "dropup", MENURIGHT: "dropdown-menu-right", MENULEFT: "dropdown-menu-left" },
        d = { DATA_TOGGLE: '[data-toggle="dropdown"]', FORM_CHILD: ".dropdown form", MENU: ".dropdown-menu", NAVBAR_NAV: ".navbar-nav", VISIBLE_ITEMS: ".dropdown-menu .dropdown-item:not(.disabled)" },
        f = { TOP: "top-start", TOPEND: "top-end", BOTTOM: "bottom-start", BOTTOMEND: "bottom-end" },
        p = { placement: f.BOTTOM, offset: 0, flip: !0 },
        _ = { placement: "string", offset: "(number|string)", flip: "boolean" },
        g = function () {
      function l(t, e) {
        n(this, l), this._element = t, this._popper = null, this._config = this._getConfig(e), this._menu = this._getMenuElement(), this._inNavbar = this._detectNavbar(), this._addEventListeners();
      }return l.prototype.toggle = function () {
        if (!this._element.disabled && !t(this._element).hasClass(u.DISABLED)) {
          var e = l._getParentFromElement(this._element),
              n = t(this._menu).hasClass(u.SHOW);if (l._clearMenus(), !n) {
            var i = { relatedTarget: this._element },
                o = t.Event(c.SHOW, i);if (t(e).trigger(o), !o.isDefaultPrevented()) {
              var r = this._element;t(e).hasClass(u.DROPUP) && (t(this._menu).hasClass(u.MENULEFT) || t(this._menu).hasClass(u.MENURIGHT)) && (r = e), this._popper = new Popper(r, this._menu, this._getPopperConfig()), "ontouchstart" in document.documentElement && !t(e).closest(d.NAVBAR_NAV).length && t("body").children().on("mouseover", null, t.noop), this._element.focus(), this._element.setAttribute("aria-expanded", !0), t(this._menu).toggleClass(u.SHOW), t(e).toggleClass(u.SHOW).trigger(t.Event(c.SHOWN, i));
            }
          }
        }
      }, l.prototype.dispose = function () {
        t.removeData(this._element, s), t(this._element).off(a), this._element = null, this._menu = null, null !== this._popper && this._popper.destroy(), this._popper = null;
      }, l.prototype.update = function () {
        this._inNavbar = this._detectNavbar(), null !== this._popper && this._popper.scheduleUpdate();
      }, l.prototype._addEventListeners = function () {
        var e = this;t(this._element).on(c.CLICK, function (t) {
          t.preventDefault(), t.stopPropagation(), e.toggle();
        });
      }, l.prototype._getConfig = function (n) {
        var i = t(this._element).data();return void 0 !== i.placement && (i.placement = f[i.placement.toUpperCase()]), n = t.extend({}, this.constructor.Default, t(this._element).data(), n), r.typeCheckConfig(e, n, this.constructor.DefaultType), n;
      }, l.prototype._getMenuElement = function () {
        if (!this._menu) {
          var e = l._getParentFromElement(this._element);this._menu = t(e).find(d.MENU)[0];
        }return this._menu;
      }, l.prototype._getPlacement = function () {
        var e = t(this._element).parent(),
            n = this._config.placement;return e.hasClass(u.DROPUP) || this._config.placement === f.TOP ? (n = f.TOP, t(this._menu).hasClass(u.MENURIGHT) && (n = f.TOPEND)) : t(this._menu).hasClass(u.MENURIGHT) && (n = f.BOTTOMEND), n;
      }, l.prototype._detectNavbar = function () {
        return t(this._element).closest(".navbar").length > 0;
      }, l.prototype._getPopperConfig = function () {
        var t = { placement: this._getPlacement(), modifiers: { offset: { offset: this._config.offset }, flip: { enabled: this._config.flip } } };return this._inNavbar && (t.modifiers.applyStyle = { enabled: !this._inNavbar }), t;
      }, l._jQueryInterface = function (e) {
        return this.each(function () {
          var n = t(this).data(s),
              o = "object" === (void 0 === e ? "undefined" : i(e)) ? e : null;if (n || (n = new l(this, o), t(this).data(s, n)), "string" == typeof e) {
            if (void 0 === n[e]) throw new Error('No method named "' + e + '"');n[e]();
          }
        });
      }, l._clearMenus = function (e) {
        if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which)) for (var n = t.makeArray(t(d.DATA_TOGGLE)), i = 0; i < n.length; i++) {
          var o = l._getParentFromElement(n[i]),
              r = t(n[i]).data(s),
              a = { relatedTarget: n[i] };if (r) {
            var h = r._menu;if (t(o).hasClass(u.SHOW) && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && t.contains(o, e.target))) {
              var f = t.Event(c.HIDE, a);t(o).trigger(f), f.isDefaultPrevented() || ("ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), n[i].setAttribute("aria-expanded", "false"), t(h).removeClass(u.SHOW), t(o).removeClass(u.SHOW).trigger(t.Event(c.HIDDEN, a)));
            }
          }
        }
      }, l._getParentFromElement = function (e) {
        var n = void 0,
            i = r.getSelectorFromElement(e);return i && (n = t(i)[0]), n || e.parentNode;
      }, l._dataApiKeydownHandler = function (e) {
        if (!(!h.test(e.which) || /button/i.test(e.target.tagName) && 32 === e.which || /input|textarea/i.test(e.target.tagName) || (e.preventDefault(), e.stopPropagation(), this.disabled || t(this).hasClass(u.DISABLED)))) {
          var n = l._getParentFromElement(this),
              i = t(n).hasClass(u.SHOW);if ((i || 27 === e.which && 32 === e.which) && (!i || 27 !== e.which && 32 !== e.which)) {
            var o = t(n).find(d.VISIBLE_ITEMS).get();if (o.length) {
              var r = o.indexOf(e.target);38 === e.which && r > 0 && r--, 40 === e.which && r < o.length - 1 && r++, r < 0 && (r = 0), o[r].focus();
            }
          } else {
            if (27 === e.which) {
              var s = t(n).find(d.DATA_TOGGLE)[0];t(s).trigger("focus");
            }t(this).trigger("click");
          }
        }
      }, o(l, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }, { key: "Default", get: function get() {
          return p;
        } }, { key: "DefaultType", get: function get() {
          return _;
        } }]), l;
    }();t(document).on(c.KEYDOWN_DATA_API, d.DATA_TOGGLE, g._dataApiKeydownHandler).on(c.KEYDOWN_DATA_API, d.MENU, g._dataApiKeydownHandler).on(c.CLICK_DATA_API + " " + c.KEYUP_DATA_API, g._clearMenus).on(c.CLICK_DATA_API, d.DATA_TOGGLE, function (e) {
      e.preventDefault(), e.stopPropagation(), g._jQueryInterface.call(t(this), "toggle");
    }).on(c.CLICK_DATA_API, d.FORM_CHILD, function (t) {
      t.stopPropagation();
    }), t.fn[e] = g._jQueryInterface, t.fn[e].Constructor = g, t.fn[e].noConflict = function () {
      return t.fn[e] = l, g._jQueryInterface;
    };
  }(jQuery), function (t) {
    var e = "modal",
        s = ".bs.modal",
        a = t.fn[e],
        l = { backdrop: !0, keyboard: !0, focus: !0, show: !0 },
        h = { backdrop: "(boolean|string)", keyboard: "boolean", focus: "boolean", show: "boolean" },
        c = { HIDE: "hide.bs.modal", HIDDEN: "hidden.bs.modal", SHOW: "show.bs.modal", SHOWN: "shown.bs.modal", FOCUSIN: "focusin.bs.modal", RESIZE: "resize.bs.modal", CLICK_DISMISS: "click.dismiss.bs.modal", KEYDOWN_DISMISS: "keydown.dismiss.bs.modal", MOUSEUP_DISMISS: "mouseup.dismiss.bs.modal", MOUSEDOWN_DISMISS: "mousedown.dismiss.bs.modal", CLICK_DATA_API: "click.bs.modal.data-api" },
        u = { SCROLLBAR_MEASURER: "modal-scrollbar-measure", BACKDROP: "modal-backdrop", OPEN: "modal-open", FADE: "fade", SHOW: "show" },
        d = { DIALOG: ".modal-dialog", DATA_TOGGLE: '[data-toggle="modal"]', DATA_DISMISS: '[data-dismiss="modal"]', FIXED_CONTENT: ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", NAVBAR_TOGGLER: ".navbar-toggler" },
        f = function () {
      function a(e, i) {
        n(this, a), this._config = this._getConfig(i), this._element = e, this._dialog = t(e).find(d.DIALOG)[0], this._backdrop = null, this._isShown = !1, this._isBodyOverflowing = !1, this._ignoreBackdropClick = !1, this._originalBodyPadding = 0, this._scrollbarWidth = 0;
      }return a.prototype.toggle = function (t) {
        return this._isShown ? this.hide() : this.show(t);
      }, a.prototype.show = function (e) {
        var n = this;if (!this._isTransitioning) {
          r.supportsTransitionEnd() && t(this._element).hasClass(u.FADE) && (this._isTransitioning = !0);var i = t.Event(c.SHOW, { relatedTarget: e });t(this._element).trigger(i), this._isShown || i.isDefaultPrevented() || (this._isShown = !0, this._checkScrollbar(), this._setScrollbar(), t(document.body).addClass(u.OPEN), this._setEscapeEvent(), this._setResizeEvent(), t(this._element).on(c.CLICK_DISMISS, d.DATA_DISMISS, function (t) {
            return n.hide(t);
          }), t(this._dialog).on(c.MOUSEDOWN_DISMISS, function () {
            t(n._element).one(c.MOUSEUP_DISMISS, function (e) {
              t(e.target).is(n._element) && (n._ignoreBackdropClick = !0);
            });
          }), this._showBackdrop(function () {
            return n._showElement(e);
          }));
        }
      }, a.prototype.hide = function (e) {
        var n = this;if (e && e.preventDefault(), !this._isTransitioning && this._isShown) {
          var i = r.supportsTransitionEnd() && t(this._element).hasClass(u.FADE);i && (this._isTransitioning = !0);var o = t.Event(c.HIDE);t(this._element).trigger(o), this._isShown && !o.isDefaultPrevented() && (this._isShown = !1, this._setEscapeEvent(), this._setResizeEvent(), t(document).off(c.FOCUSIN), t(this._element).removeClass(u.SHOW), t(this._element).off(c.CLICK_DISMISS), t(this._dialog).off(c.MOUSEDOWN_DISMISS), i ? t(this._element).one(r.TRANSITION_END, function (t) {
            return n._hideModal(t);
          }).emulateTransitionEnd(300) : this._hideModal());
        }
      }, a.prototype.dispose = function () {
        t.removeData(this._element, "bs.modal"), t(window, document, this._element, this._backdrop).off(s), this._config = null, this._element = null, this._dialog = null, this._backdrop = null, this._isShown = null, this._isBodyOverflowing = null, this._ignoreBackdropClick = null, this._scrollbarWidth = null;
      }, a.prototype.handleUpdate = function () {
        this._adjustDialog();
      }, a.prototype._getConfig = function (n) {
        return n = t.extend({}, l, n), r.typeCheckConfig(e, n, h), n;
      }, a.prototype._showElement = function (e) {
        var n = this,
            i = r.supportsTransitionEnd() && t(this._element).hasClass(u.FADE);this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.scrollTop = 0, i && r.reflow(this._element), t(this._element).addClass(u.SHOW), this._config.focus && this._enforceFocus();var o = t.Event(c.SHOWN, { relatedTarget: e }),
            s = function s() {
          n._config.focus && n._element.focus(), n._isTransitioning = !1, t(n._element).trigger(o);
        };i ? t(this._dialog).one(r.TRANSITION_END, s).emulateTransitionEnd(300) : s();
      }, a.prototype._enforceFocus = function () {
        var e = this;t(document).off(c.FOCUSIN).on(c.FOCUSIN, function (n) {
          document === n.target || e._element === n.target || t(e._element).has(n.target).length || e._element.focus();
        });
      }, a.prototype._setEscapeEvent = function () {
        var e = this;this._isShown && this._config.keyboard ? t(this._element).on(c.KEYDOWN_DISMISS, function (t) {
          27 === t.which && (t.preventDefault(), e.hide());
        }) : this._isShown || t(this._element).off(c.KEYDOWN_DISMISS);
      }, a.prototype._setResizeEvent = function () {
        var e = this;this._isShown ? t(window).on(c.RESIZE, function (t) {
          return e.handleUpdate(t);
        }) : t(window).off(c.RESIZE);
      }, a.prototype._hideModal = function () {
        var e = this;this._element.style.display = "none", this._element.setAttribute("aria-hidden", !0), this._isTransitioning = !1, this._showBackdrop(function () {
          t(document.body).removeClass(u.OPEN), e._resetAdjustments(), e._resetScrollbar(), t(e._element).trigger(c.HIDDEN);
        });
      }, a.prototype._removeBackdrop = function () {
        this._backdrop && (t(this._backdrop).remove(), this._backdrop = null);
      }, a.prototype._showBackdrop = function (e) {
        var n = this,
            i = t(this._element).hasClass(u.FADE) ? u.FADE : "";if (this._isShown && this._config.backdrop) {
          var o = r.supportsTransitionEnd() && i;if (this._backdrop = document.createElement("div"), this._backdrop.className = u.BACKDROP, i && t(this._backdrop).addClass(i), t(this._backdrop).appendTo(document.body), t(this._element).on(c.CLICK_DISMISS, function (t) {
            n._ignoreBackdropClick ? n._ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" === n._config.backdrop ? n._element.focus() : n.hide());
          }), o && r.reflow(this._backdrop), t(this._backdrop).addClass(u.SHOW), !e) return;if (!o) return void e();t(this._backdrop).one(r.TRANSITION_END, e).emulateTransitionEnd(150);
        } else if (!this._isShown && this._backdrop) {
          t(this._backdrop).removeClass(u.SHOW);var s = function s() {
            n._removeBackdrop(), e && e();
          };r.supportsTransitionEnd() && t(this._element).hasClass(u.FADE) ? t(this._backdrop).one(r.TRANSITION_END, s).emulateTransitionEnd(150) : s();
        } else e && e();
      }, a.prototype._adjustDialog = function () {
        var t = this._element.scrollHeight > document.documentElement.clientHeight;!this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"), this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px");
      }, a.prototype._resetAdjustments = function () {
        this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
      }, a.prototype._checkScrollbar = function () {
        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth, this._scrollbarWidth = this._getScrollbarWidth();
      }, a.prototype._setScrollbar = function () {
        var e = this;if (this._isBodyOverflowing) {
          t(d.FIXED_CONTENT).each(function (n, i) {
            var o = t(i)[0].style.paddingRight,
                r = t(i).css("padding-right");t(i).data("padding-right", o).css("padding-right", parseFloat(r) + e._scrollbarWidth + "px");
          }), t(d.NAVBAR_TOGGLER).each(function (n, i) {
            var o = t(i)[0].style.marginRight,
                r = t(i).css("margin-right");t(i).data("margin-right", o).css("margin-right", parseFloat(r) + e._scrollbarWidth + "px");
          });var n = document.body.style.paddingRight,
              i = t("body").css("padding-right");t("body").data("padding-right", n).css("padding-right", parseFloat(i) + this._scrollbarWidth + "px");
        }
      }, a.prototype._resetScrollbar = function () {
        t(d.FIXED_CONTENT).each(function (e, n) {
          var i = t(n).data("padding-right");void 0 !== i && t(n).css("padding-right", i).removeData("padding-right");
        }), t(d.NAVBAR_TOGGLER).each(function (e, n) {
          var i = t(n).data("margin-right");void 0 !== i && t(n).css("margin-right", i).removeData("margin-right");
        });var e = t("body").data("padding-right");void 0 !== e && t("body").css("padding-right", e).removeData("padding-right");
      }, a.prototype._getScrollbarWidth = function () {
        var t = document.createElement("div");t.className = u.SCROLLBAR_MEASURER, document.body.appendChild(t);var e = t.getBoundingClientRect().width - t.clientWidth;return document.body.removeChild(t), e;
      }, a._jQueryInterface = function (e, n) {
        return this.each(function () {
          var o = t(this).data("bs.modal"),
              r = t.extend({}, a.Default, t(this).data(), "object" === (void 0 === e ? "undefined" : i(e)) && e);if (o || (o = new a(this, r), t(this).data("bs.modal", o)), "string" == typeof e) {
            if (void 0 === o[e]) throw new Error('No method named "' + e + '"');o[e](n);
          } else r.show && o.show(n);
        });
      }, o(a, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }, { key: "Default", get: function get() {
          return l;
        } }]), a;
    }();t(document).on(c.CLICK_DATA_API, d.DATA_TOGGLE, function (e) {
      var n = this,
          i = void 0,
          o = r.getSelectorFromElement(this);o && (i = t(o)[0]);var s = t(i).data("bs.modal") ? "toggle" : t.extend({}, t(i).data(), t(this).data());"A" !== this.tagName && "AREA" !== this.tagName || e.preventDefault();var a = t(i).one(c.SHOW, function (e) {
        e.isDefaultPrevented() || a.one(c.HIDDEN, function () {
          t(n).is(":visible") && n.focus();
        });
      });f._jQueryInterface.call(t(i), s, this);
    }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function () {
      return t.fn[e] = a, f._jQueryInterface;
    };
  }(jQuery), function (t) {
    var e = "scrollspy",
        s = t.fn[e],
        a = { offset: 10, method: "auto", target: "" },
        l = { offset: "number", method: "string", target: "(string|element)" },
        h = { ACTIVATE: "activate.bs.scrollspy", SCROLL: "scroll.bs.scrollspy", LOAD_DATA_API: "load.bs.scrollspy.data-api" },
        c = { DROPDOWN_ITEM: "dropdown-item", DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active" },
        u = { DATA_SPY: '[data-spy="scroll"]', ACTIVE: ".active", NAV_LIST_GROUP: ".nav, .list-group", NAV_LINKS: ".nav-link", LIST_ITEMS: ".list-group-item", DROPDOWN: ".dropdown", DROPDOWN_ITEMS: ".dropdown-item", DROPDOWN_TOGGLE: ".dropdown-toggle" },
        d = { OFFSET: "offset", POSITION: "position" },
        f = function () {
      function s(e, i) {
        var o = this;n(this, s), this._element = e, this._scrollElement = "BODY" === e.tagName ? window : e, this._config = this._getConfig(i), this._selector = this._config.target + " " + u.NAV_LINKS + "," + this._config.target + " " + u.LIST_ITEMS + "," + this._config.target + " " + u.DROPDOWN_ITEMS, this._offsets = [], this._targets = [], this._activeTarget = null, this._scrollHeight = 0, t(this._scrollElement).on(h.SCROLL, function (t) {
          return o._process(t);
        }), this.refresh(), this._process();
      }return s.prototype.refresh = function () {
        var e = this,
            n = this._scrollElement !== this._scrollElement.window ? d.POSITION : d.OFFSET,
            i = "auto" === this._config.method ? n : this._config.method,
            o = i === d.POSITION ? this._getScrollTop() : 0;this._offsets = [], this._targets = [], this._scrollHeight = this._getScrollHeight(), t.makeArray(t(this._selector)).map(function (e) {
          var n = void 0,
              s = r.getSelectorFromElement(e);if (s && (n = t(s)[0]), n) {
            var a = n.getBoundingClientRect();if (a.width || a.height) return [t(n)[i]().top + o, s];
          }return null;
        }).filter(function (t) {
          return t;
        }).sort(function (t, e) {
          return t[0] - e[0];
        }).forEach(function (t) {
          e._offsets.push(t[0]), e._targets.push(t[1]);
        });
      }, s.prototype.dispose = function () {
        t.removeData(this._element, "bs.scrollspy"), t(this._scrollElement).off(".bs.scrollspy"), this._element = null, this._scrollElement = null, this._config = null, this._selector = null, this._offsets = null, this._targets = null, this._activeTarget = null, this._scrollHeight = null;
      }, s.prototype._getConfig = function (n) {
        if ("string" != typeof (n = t.extend({}, a, n)).target) {
          var i = t(n.target).attr("id");i || (i = r.getUID(e), t(n.target).attr("id", i)), n.target = "#" + i;
        }return r.typeCheckConfig(e, n, l), n;
      }, s.prototype._getScrollTop = function () {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      }, s.prototype._getScrollHeight = function () {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }, s.prototype._getOffsetHeight = function () {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      }, s.prototype._process = function () {
        var t = this._getScrollTop() + this._config.offset,
            e = this._getScrollHeight(),
            n = this._config.offset + e - this._getOffsetHeight();if (this._scrollHeight !== e && this.refresh(), t >= n) {
          var i = this._targets[this._targets.length - 1];this._activeTarget !== i && this._activate(i);
        } else {
          if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0) return this._activeTarget = null, void this._clear();for (var o = this._offsets.length; o--;) {
            this._activeTarget !== this._targets[o] && t >= this._offsets[o] && (void 0 === this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o]);
          }
        }
      }, s.prototype._activate = function (e) {
        this._activeTarget = e, this._clear();var n = this._selector.split(",");n = n.map(function (t) {
          return t + '[data-target="' + e + '"],' + t + '[href="' + e + '"]';
        });var i = t(n.join(","));i.hasClass(c.DROPDOWN_ITEM) ? (i.closest(u.DROPDOWN).find(u.DROPDOWN_TOGGLE).addClass(c.ACTIVE), i.addClass(c.ACTIVE)) : (i.addClass(c.ACTIVE), i.parents(u.NAV_LIST_GROUP).prev(u.NAV_LINKS + ", " + u.LIST_ITEMS).addClass(c.ACTIVE)), t(this._scrollElement).trigger(h.ACTIVATE, { relatedTarget: e });
      }, s.prototype._clear = function () {
        t(this._selector).filter(u.ACTIVE).removeClass(c.ACTIVE);
      }, s._jQueryInterface = function (e) {
        return this.each(function () {
          var n = t(this).data("bs.scrollspy"),
              o = "object" === (void 0 === e ? "undefined" : i(e)) && e;if (n || (n = new s(this, o), t(this).data("bs.scrollspy", n)), "string" == typeof e) {
            if (void 0 === n[e]) throw new Error('No method named "' + e + '"');n[e]();
          }
        });
      }, o(s, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }, { key: "Default", get: function get() {
          return a;
        } }]), s;
    }();t(window).on(h.LOAD_DATA_API, function () {
      for (var e = t.makeArray(t(u.DATA_SPY)), n = e.length; n--;) {
        var i = t(e[n]);f._jQueryInterface.call(i, i.data());
      }
    }), t.fn[e] = f._jQueryInterface, t.fn[e].Constructor = f, t.fn[e].noConflict = function () {
      return t.fn[e] = s, f._jQueryInterface;
    };
  }(jQuery), function (t) {
    var e = t.fn.tab,
        i = { HIDE: "hide.bs.tab", HIDDEN: "hidden.bs.tab", SHOW: "show.bs.tab", SHOWN: "shown.bs.tab", CLICK_DATA_API: "click.bs.tab.data-api" },
        s = { DROPDOWN_MENU: "dropdown-menu", ACTIVE: "active", DISABLED: "disabled", FADE: "fade", SHOW: "show" },
        a = { DROPDOWN: ".dropdown", NAV_LIST_GROUP: ".nav, .list-group", ACTIVE: ".active", DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', DROPDOWN_TOGGLE: ".dropdown-toggle", DROPDOWN_ACTIVE_CHILD: "> .dropdown-menu .active" },
        l = function () {
      function e(t) {
        n(this, e), this._element = t;
      }return e.prototype.show = function () {
        var e = this;if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && t(this._element).hasClass(s.ACTIVE) || t(this._element).hasClass(s.DISABLED))) {
          var n = void 0,
              o = void 0,
              l = t(this._element).closest(a.NAV_LIST_GROUP)[0],
              h = r.getSelectorFromElement(this._element);l && (o = t.makeArray(t(l).find(a.ACTIVE)), o = o[o.length - 1]);var c = t.Event(i.HIDE, { relatedTarget: this._element }),
              u = t.Event(i.SHOW, { relatedTarget: o });if (o && t(o).trigger(c), t(this._element).trigger(u), !u.isDefaultPrevented() && !c.isDefaultPrevented()) {
            h && (n = t(h)[0]), this._activate(this._element, l);var d = function d() {
              var n = t.Event(i.HIDDEN, { relatedTarget: e._element }),
                  r = t.Event(i.SHOWN, { relatedTarget: o });t(o).trigger(n), t(e._element).trigger(r);
            };n ? this._activate(n, n.parentNode, d) : d();
          }
        }
      }, e.prototype.dispose = function () {
        t.removeData(this._element, "bs.tab"), this._element = null;
      }, e.prototype._activate = function (e, n, i) {
        var o = this,
            l = t(n).find(a.ACTIVE)[0],
            h = i && r.supportsTransitionEnd() && l && t(l).hasClass(s.FADE),
            c = function c() {
          return o._transitionComplete(e, l, h, i);
        };l && h ? t(l).one(r.TRANSITION_END, c).emulateTransitionEnd(150) : c(), l && t(l).removeClass(s.SHOW);
      }, e.prototype._transitionComplete = function (e, n, i, o) {
        if (n) {
          t(n).removeClass(s.ACTIVE);var l = t(n.parentNode).find(a.DROPDOWN_ACTIVE_CHILD)[0];l && t(l).removeClass(s.ACTIVE), n.setAttribute("aria-expanded", !1);
        }if (t(e).addClass(s.ACTIVE), e.setAttribute("aria-expanded", !0), i ? (r.reflow(e), t(e).addClass(s.SHOW)) : t(e).removeClass(s.FADE), e.parentNode && t(e.parentNode).hasClass(s.DROPDOWN_MENU)) {
          var h = t(e).closest(a.DROPDOWN)[0];h && t(h).find(a.DROPDOWN_TOGGLE).addClass(s.ACTIVE), e.setAttribute("aria-expanded", !0);
        }o && o();
      }, e._jQueryInterface = function (n) {
        return this.each(function () {
          var i = t(this),
              o = i.data("bs.tab");if (o || (o = new e(this), i.data("bs.tab", o)), "string" == typeof n) {
            if (void 0 === o[n]) throw new Error('No method named "' + n + '"');o[n]();
          }
        });
      }, o(e, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }]), e;
    }();t(document).on(i.CLICK_DATA_API, a.DATA_TOGGLE, function (e) {
      e.preventDefault(), l._jQueryInterface.call(t(this), "show");
    }), t.fn.tab = l._jQueryInterface, t.fn.tab.Constructor = l, t.fn.tab.noConflict = function () {
      return t.fn.tab = e, l._jQueryInterface;
    };
  }(jQuery), function (t) {
    if ("undefined" == typeof Popper) throw new Error("Bootstrap tooltips require Popper.js (https://popper.js.org)");var e = "tooltip",
        s = ".bs.tooltip",
        a = t.fn[e],
        l = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        h = { animation: "boolean", template: "string", title: "(string|element|function)", trigger: "string", delay: "(number|object)", html: "boolean", selector: "(string|boolean)", placement: "(string|function)", offset: "(number|string)", container: "(string|element|boolean)", fallbackPlacement: "(string|array)" },
        c = { AUTO: "auto", TOP: "top", RIGHT: "right", BOTTOM: "bottom", LEFT: "left" },
        u = { animation: !0, template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, selector: !1, placement: "top", offset: 0, container: !1, fallbackPlacement: "flip" },
        d = { SHOW: "show", OUT: "out" },
        f = { HIDE: "hide" + s, HIDDEN: "hidden" + s, SHOW: "show" + s, SHOWN: "shown" + s, INSERTED: "inserted" + s, CLICK: "click" + s, FOCUSIN: "focusin" + s, FOCUSOUT: "focusout" + s, MOUSEENTER: "mouseenter" + s, MOUSELEAVE: "mouseleave" + s },
        p = { FADE: "fade", SHOW: "show" },
        _ = { TOOLTIP: ".tooltip", TOOLTIP_INNER: ".tooltip-inner", ARROW: ".arrow" },
        g = { HOVER: "hover", FOCUS: "focus", CLICK: "click", MANUAL: "manual" },
        m = function () {
      function a(t, e) {
        n(this, a), this._isEnabled = !0, this._timeout = 0, this._hoverState = "", this._activeTrigger = {}, this._popper = null, this.element = t, this.config = this._getConfig(e), this.tip = null, this._setListeners();
      }return a.prototype.enable = function () {
        this._isEnabled = !0;
      }, a.prototype.disable = function () {
        this._isEnabled = !1;
      }, a.prototype.toggleEnabled = function () {
        this._isEnabled = !this._isEnabled;
      }, a.prototype.toggle = function (e) {
        if (e) {
          var n = this.constructor.DATA_KEY,
              i = t(e.currentTarget).data(n);i || (i = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(n, i)), i._activeTrigger.click = !i._activeTrigger.click, i._isWithActiveTrigger() ? i._enter(null, i) : i._leave(null, i);
        } else {
          if (t(this.getTipElement()).hasClass(p.SHOW)) return void this._leave(null, this);this._enter(null, this);
        }
      }, a.prototype.dispose = function () {
        clearTimeout(this._timeout), t.removeData(this.element, this.constructor.DATA_KEY), t(this.element).off(this.constructor.EVENT_KEY), t(this.element).closest(".modal").off("hide.bs.modal"), this.tip && t(this.tip).remove(), this._isEnabled = null, this._timeout = null, this._hoverState = null, this._activeTrigger = null, null !== this._popper && this._popper.destroy(), this._popper = null, this.element = null, this.config = null, this.tip = null;
      }, a.prototype.show = function () {
        var e = this;if ("none" === t(this.element).css("display")) throw new Error("Please use show on visible elements");var n = t.Event(this.constructor.Event.SHOW);if (this.isWithContent() && this._isEnabled) {
          t(this.element).trigger(n);var i = t.contains(this.element.ownerDocument.documentElement, this.element);if (n.isDefaultPrevented() || !i) return;var o = this.getTipElement(),
              s = r.getUID(this.constructor.NAME);o.setAttribute("id", s), this.element.setAttribute("aria-describedby", s), this.setContent(), this.config.animation && t(o).addClass(p.FADE);var l = "function" == typeof this.config.placement ? this.config.placement.call(this, o, this.element) : this.config.placement,
              h = this._getAttachment(l);this.addAttachmentClass(h);var c = !1 === this.config.container ? document.body : t(this.config.container);t(o).data(this.constructor.DATA_KEY, this), t.contains(this.element.ownerDocument.documentElement, this.tip) || t(o).appendTo(c), t(this.element).trigger(this.constructor.Event.INSERTED), this._popper = new Popper(this.element, o, { placement: h, modifiers: { offset: { offset: this.config.offset }, flip: { behavior: this.config.fallbackPlacement }, arrow: { element: _.ARROW } }, onCreate: function onCreate(t) {
              t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t);
            }, onUpdate: function onUpdate(t) {
              e._handlePopperPlacementChange(t);
            } }), t(o).addClass(p.SHOW), "ontouchstart" in document.documentElement && t("body").children().on("mouseover", null, t.noop);var u = function u() {
            e.config.animation && e._fixTransition();var n = e._hoverState;e._hoverState = null, t(e.element).trigger(e.constructor.Event.SHOWN), n === d.OUT && e._leave(null, e);
          };r.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE) ? t(this.tip).one(r.TRANSITION_END, u).emulateTransitionEnd(a._TRANSITION_DURATION) : u();
        }
      }, a.prototype.hide = function (e) {
        var n = this,
            i = this.getTipElement(),
            o = t.Event(this.constructor.Event.HIDE),
            s = function s() {
          n._hoverState !== d.SHOW && i.parentNode && i.parentNode.removeChild(i), n._cleanTipClass(), n.element.removeAttribute("aria-describedby"), t(n.element).trigger(n.constructor.Event.HIDDEN), null !== n._popper && n._popper.destroy(), e && e();
        };t(this.element).trigger(o), o.isDefaultPrevented() || (t(i).removeClass(p.SHOW), "ontouchstart" in document.documentElement && t("body").children().off("mouseover", null, t.noop), this._activeTrigger[g.CLICK] = !1, this._activeTrigger[g.FOCUS] = !1, this._activeTrigger[g.HOVER] = !1, r.supportsTransitionEnd() && t(this.tip).hasClass(p.FADE) ? t(i).one(r.TRANSITION_END, s).emulateTransitionEnd(150) : s(), this._hoverState = "");
      }, a.prototype.update = function () {
        null !== this._popper && this._popper.scheduleUpdate();
      }, a.prototype.isWithContent = function () {
        return Boolean(this.getTitle());
      }, a.prototype.addAttachmentClass = function (e) {
        t(this.getTipElement()).addClass("bs-tooltip-" + e);
      }, a.prototype.getTipElement = function () {
        return this.tip = this.tip || t(this.config.template)[0];
      }, a.prototype.setContent = function () {
        var e = t(this.getTipElement());this.setElementContent(e.find(_.TOOLTIP_INNER), this.getTitle()), e.removeClass(p.FADE + " " + p.SHOW);
      }, a.prototype.setElementContent = function (e, n) {
        var o = this.config.html;"object" === (void 0 === n ? "undefined" : i(n)) && (n.nodeType || n.jquery) ? o ? t(n).parent().is(e) || e.empty().append(n) : e.text(t(n).text()) : e[o ? "html" : "text"](n);
      }, a.prototype.getTitle = function () {
        var t = this.element.getAttribute("data-original-title");return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title), t;
      }, a.prototype._getAttachment = function (t) {
        return c[t.toUpperCase()];
      }, a.prototype._setListeners = function () {
        var e = this;this.config.trigger.split(" ").forEach(function (n) {
          if ("click" === n) t(e.element).on(e.constructor.Event.CLICK, e.config.selector, function (t) {
            return e.toggle(t);
          });else if (n !== g.MANUAL) {
            var i = n === g.HOVER ? e.constructor.Event.MOUSEENTER : e.constructor.Event.FOCUSIN,
                o = n === g.HOVER ? e.constructor.Event.MOUSELEAVE : e.constructor.Event.FOCUSOUT;t(e.element).on(i, e.config.selector, function (t) {
              return e._enter(t);
            }).on(o, e.config.selector, function (t) {
              return e._leave(t);
            });
          }t(e.element).closest(".modal").on("hide.bs.modal", function () {
            return e.hide();
          });
        }), this.config.selector ? this.config = t.extend({}, this.config, { trigger: "manual", selector: "" }) : this._fixTitle();
      }, a.prototype._fixTitle = function () {
        var t = i(this.element.getAttribute("data-original-title"));(this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""), this.element.setAttribute("title", ""));
      }, a.prototype._enter = function (e, n) {
        var i = this.constructor.DATA_KEY;(n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusin" === e.type ? g.FOCUS : g.HOVER] = !0), t(n.getTipElement()).hasClass(p.SHOW) || n._hoverState === d.SHOW ? n._hoverState = d.SHOW : (clearTimeout(n._timeout), n._hoverState = d.SHOW, n.config.delay && n.config.delay.show ? n._timeout = setTimeout(function () {
          n._hoverState === d.SHOW && n.show();
        }, n.config.delay.show) : n.show());
      }, a.prototype._leave = function (e, n) {
        var i = this.constructor.DATA_KEY;(n = n || t(e.currentTarget).data(i)) || (n = new this.constructor(e.currentTarget, this._getDelegateConfig()), t(e.currentTarget).data(i, n)), e && (n._activeTrigger["focusout" === e.type ? g.FOCUS : g.HOVER] = !1), n._isWithActiveTrigger() || (clearTimeout(n._timeout), n._hoverState = d.OUT, n.config.delay && n.config.delay.hide ? n._timeout = setTimeout(function () {
          n._hoverState === d.OUT && n.hide();
        }, n.config.delay.hide) : n.hide());
      }, a.prototype._isWithActiveTrigger = function () {
        for (var t in this._activeTrigger) {
          if (this._activeTrigger[t]) return !0;
        }return !1;
      }, a.prototype._getConfig = function (n) {
        return (n = t.extend({}, this.constructor.Default, t(this.element).data(), n)).delay && "number" == typeof n.delay && (n.delay = { show: n.delay, hide: n.delay }), n.title && "number" == typeof n.title && (n.title = n.title.toString()), n.content && "number" == typeof n.content && (n.content = n.content.toString()), r.typeCheckConfig(e, n, this.constructor.DefaultType), n;
      }, a.prototype._getDelegateConfig = function () {
        var t = {};if (this.config) for (var e in this.config) {
          this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
        }return t;
      }, a.prototype._cleanTipClass = function () {
        var e = t(this.getTipElement()),
            n = e.attr("class").match(l);null !== n && n.length > 0 && e.removeClass(n.join(""));
      }, a.prototype._handlePopperPlacementChange = function (t) {
        this._cleanTipClass(), this.addAttachmentClass(this._getAttachment(t.placement));
      }, a.prototype._fixTransition = function () {
        var e = this.getTipElement(),
            n = this.config.animation;null === e.getAttribute("x-placement") && (t(e).removeClass(p.FADE), this.config.animation = !1, this.hide(), this.show(), this.config.animation = n);
      }, a._jQueryInterface = function (e) {
        return this.each(function () {
          var n = t(this).data("bs.tooltip"),
              o = "object" === (void 0 === e ? "undefined" : i(e)) && e;if ((n || !/dispose|hide/.test(e)) && (n || (n = new a(this, o), t(this).data("bs.tooltip", n)), "string" == typeof e)) {
            if (void 0 === n[e]) throw new Error('No method named "' + e + '"');n[e]();
          }
        });
      }, o(a, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }, { key: "Default", get: function get() {
          return u;
        } }, { key: "NAME", get: function get() {
          return e;
        } }, { key: "DATA_KEY", get: function get() {
          return "bs.tooltip";
        } }, { key: "Event", get: function get() {
          return f;
        } }, { key: "EVENT_KEY", get: function get() {
          return s;
        } }, { key: "DefaultType", get: function get() {
          return h;
        } }]), a;
    }();return t.fn[e] = m._jQueryInterface, t.fn[e].Constructor = m, t.fn[e].noConflict = function () {
      return t.fn[e] = a, m._jQueryInterface;
    }, m;
  }(jQuery));!function (r) {
    var a = "popover",
        l = ".bs.popover",
        h = r.fn[a],
        c = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        u = r.extend({}, s.Default, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>' }),
        d = r.extend({}, s.DefaultType, { content: "(string|element|function)" }),
        f = { FADE: "fade", SHOW: "show" },
        p = { TITLE: ".popover-header", CONTENT: ".popover-body" },
        _ = { HIDE: "hide" + l, HIDDEN: "hidden" + l, SHOW: "show" + l, SHOWN: "shown" + l, INSERTED: "inserted" + l, CLICK: "click" + l, FOCUSIN: "focusin" + l, FOCUSOUT: "focusout" + l, MOUSEENTER: "mouseenter" + l, MOUSELEAVE: "mouseleave" + l },
        g = function (s) {
      function h() {
        return n(this, h), t(this, s.apply(this, arguments));
      }return e(h, s), h.prototype.isWithContent = function () {
        return this.getTitle() || this._getContent();
      }, h.prototype.addAttachmentClass = function (t) {
        r(this.getTipElement()).addClass("bs-popover-" + t);
      }, h.prototype.getTipElement = function () {
        return this.tip = this.tip || r(this.config.template)[0];
      }, h.prototype.setContent = function () {
        var t = r(this.getTipElement());this.setElementContent(t.find(p.TITLE), this.getTitle()), this.setElementContent(t.find(p.CONTENT), this._getContent()), t.removeClass(f.FADE + " " + f.SHOW);
      }, h.prototype._getContent = function () {
        return this.element.getAttribute("data-content") || ("function" == typeof this.config.content ? this.config.content.call(this.element) : this.config.content);
      }, h.prototype._cleanTipClass = function () {
        var t = r(this.getTipElement()),
            e = t.attr("class").match(c);null !== e && e.length > 0 && t.removeClass(e.join(""));
      }, h._jQueryInterface = function (t) {
        return this.each(function () {
          var e = r(this).data("bs.popover"),
              n = "object" === (void 0 === t ? "undefined" : i(t)) ? t : null;if ((e || !/destroy|hide/.test(t)) && (e || (e = new h(this, n), r(this).data("bs.popover", e)), "string" == typeof t)) {
            if (void 0 === e[t]) throw new Error('No method named "' + t + '"');e[t]();
          }
        });
      }, o(h, null, [{ key: "VERSION", get: function get() {
          return "4.0.0-beta";
        } }, { key: "Default", get: function get() {
          return u;
        } }, { key: "NAME", get: function get() {
          return a;
        } }, { key: "DATA_KEY", get: function get() {
          return "bs.popover";
        } }, { key: "Event", get: function get() {
          return _;
        } }, { key: "EVENT_KEY", get: function get() {
          return l;
        } }, { key: "DefaultType", get: function get() {
          return d;
        } }]), h;
    }(s);r.fn[a] = g._jQueryInterface, r.fn[a].Constructor = g, r.fn[a].noConflict = function () {
      return r.fn[a] = h, g._jQueryInterface;
    };
  }(jQuery);
}();
/*!
 * Chart.js v2.9.3
 * https://www.chartjs.org
 * (c) 2019 Chart.js Contributors
 * Released under the MIT License
 */
!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e(function () {
    try {
      return require("moment");
    } catch (t) {}
  }()) : "function" == typeof define && define.amd ? define(["require"], function (t) {
    return e(function () {
      try {
        return t("moment");
      } catch (t) {}
    }());
  }) : (t = t || self).Chart = e(t.moment);
}(this, function (t) {
  "use strict";
  t = t && t.hasOwnProperty("default") ? t.default : t;var e = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] },
      n = function (t, e) {
    return t(e = { exports: {} }, e.exports), e.exports;
  }(function (t) {
    var n = {};for (var i in e) {
      e.hasOwnProperty(i) && (n[e[i]] = i);
    }var a = t.exports = { rgb: { channels: 3, labels: "rgb" }, hsl: { channels: 3, labels: "hsl" }, hsv: { channels: 3, labels: "hsv" }, hwb: { channels: 3, labels: "hwb" }, cmyk: { channels: 4, labels: "cmyk" }, xyz: { channels: 3, labels: "xyz" }, lab: { channels: 3, labels: "lab" }, lch: { channels: 3, labels: "lch" }, hex: { channels: 1, labels: ["hex"] }, keyword: { channels: 1, labels: ["keyword"] }, ansi16: { channels: 1, labels: ["ansi16"] }, ansi256: { channels: 1, labels: ["ansi256"] }, hcg: { channels: 3, labels: ["h", "c", "g"] }, apple: { channels: 3, labels: ["r16", "g16", "b16"] }, gray: { channels: 1, labels: ["gray"] } };for (var r in a) {
      if (a.hasOwnProperty(r)) {
        if (!("channels" in a[r])) throw new Error("missing channels property: " + r);if (!("labels" in a[r])) throw new Error("missing channel labels property: " + r);if (a[r].labels.length !== a[r].channels) throw new Error("channel and label counts mismatch: " + r);var o = a[r].channels,
            s = a[r].labels;delete a[r].channels, delete a[r].labels, Object.defineProperty(a[r], "channels", { value: o }), Object.defineProperty(a[r], "labels", { value: s });
      }
    }a.rgb.hsl = function (t) {
      var e,
          n,
          i = t[0] / 255,
          a = t[1] / 255,
          r = t[2] / 255,
          o = Math.min(i, a, r),
          s = Math.max(i, a, r),
          l = s - o;return s === o ? e = 0 : i === s ? e = (a - r) / l : a === s ? e = 2 + (r - i) / l : r === s && (e = 4 + (i - a) / l), (e = Math.min(60 * e, 360)) < 0 && (e += 360), n = (o + s) / 2, [e, 100 * (s === o ? 0 : n <= .5 ? l / (s + o) : l / (2 - s - o)), 100 * n];
    }, a.rgb.hsv = function (t) {
      var e,
          n,
          i,
          a,
          r,
          o = t[0] / 255,
          s = t[1] / 255,
          l = t[2] / 255,
          u = Math.max(o, s, l),
          d = u - Math.min(o, s, l),
          h = function h(t) {
        return (u - t) / 6 / d + .5;
      };return 0 === d ? a = r = 0 : (r = d / u, e = h(o), n = h(s), i = h(l), o === u ? a = i - n : s === u ? a = 1 / 3 + e - i : l === u && (a = 2 / 3 + n - e), a < 0 ? a += 1 : a > 1 && (a -= 1)), [360 * a, 100 * r, 100 * u];
    }, a.rgb.hwb = function (t) {
      var e = t[0],
          n = t[1],
          i = t[2];return [a.rgb.hsl(t)[0], 100 * (1 / 255 * Math.min(e, Math.min(n, i))), 100 * (i = 1 - 1 / 255 * Math.max(e, Math.max(n, i)))];
    }, a.rgb.cmyk = function (t) {
      var e,
          n = t[0] / 255,
          i = t[1] / 255,
          a = t[2] / 255;return [100 * ((1 - n - (e = Math.min(1 - n, 1 - i, 1 - a))) / (1 - e) || 0), 100 * ((1 - i - e) / (1 - e) || 0), 100 * ((1 - a - e) / (1 - e) || 0), 100 * e];
    }, a.rgb.keyword = function (t) {
      var i = n[t];if (i) return i;var a,
          r,
          o,
          s = 1 / 0;for (var l in e) {
        if (e.hasOwnProperty(l)) {
          var u = e[l],
              d = (r = t, o = u, Math.pow(r[0] - o[0], 2) + Math.pow(r[1] - o[1], 2) + Math.pow(r[2] - o[2], 2));d < s && (s = d, a = l);
        }
      }return a;
    }, a.keyword.rgb = function (t) {
      return e[t];
    }, a.rgb.xyz = function (t) {
      var e = t[0] / 255,
          n = t[1] / 255,
          i = t[2] / 255;return [100 * (.4124 * (e = e > .04045 ? Math.pow((e + .055) / 1.055, 2.4) : e / 12.92) + .3576 * (n = n > .04045 ? Math.pow((n + .055) / 1.055, 2.4) : n / 12.92) + .1805 * (i = i > .04045 ? Math.pow((i + .055) / 1.055, 2.4) : i / 12.92)), 100 * (.2126 * e + .7152 * n + .0722 * i), 100 * (.0193 * e + .1192 * n + .9505 * i)];
    }, a.rgb.lab = function (t) {
      var e = a.rgb.xyz(t),
          n = e[0],
          i = e[1],
          r = e[2];return i /= 100, r /= 108.883, n = (n /= 95.047) > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116, [116 * (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116) - 16, 500 * (n - i), 200 * (i - (r = r > .008856 ? Math.pow(r, 1 / 3) : 7.787 * r + 16 / 116))];
    }, a.hsl.rgb = function (t) {
      var e,
          n,
          i,
          a,
          r,
          o = t[0] / 360,
          s = t[1] / 100,
          l = t[2] / 100;if (0 === s) return [r = 255 * l, r, r];e = 2 * l - (n = l < .5 ? l * (1 + s) : l + s - l * s), a = [0, 0, 0];for (var u = 0; u < 3; u++) {
        (i = o + 1 / 3 * -(u - 1)) < 0 && i++, i > 1 && i--, r = 6 * i < 1 ? e + 6 * (n - e) * i : 2 * i < 1 ? n : 3 * i < 2 ? e + (n - e) * (2 / 3 - i) * 6 : e, a[u] = 255 * r;
      }return a;
    }, a.hsl.hsv = function (t) {
      var e = t[0],
          n = t[1] / 100,
          i = t[2] / 100,
          a = n,
          r = Math.max(i, .01);return n *= (i *= 2) <= 1 ? i : 2 - i, a *= r <= 1 ? r : 2 - r, [e, 100 * (0 === i ? 2 * a / (r + a) : 2 * n / (i + n)), 100 * ((i + n) / 2)];
    }, a.hsv.rgb = function (t) {
      var e = t[0] / 60,
          n = t[1] / 100,
          i = t[2] / 100,
          a = Math.floor(e) % 6,
          r = e - Math.floor(e),
          o = 255 * i * (1 - n),
          s = 255 * i * (1 - n * r),
          l = 255 * i * (1 - n * (1 - r));switch (i *= 255, a) {case 0:
          return [i, l, o];case 1:
          return [s, i, o];case 2:
          return [o, i, l];case 3:
          return [o, s, i];case 4:
          return [l, o, i];case 5:
          return [i, o, s];}
    }, a.hsv.hsl = function (t) {
      var e,
          n,
          i,
          a = t[0],
          r = t[1] / 100,
          o = t[2] / 100,
          s = Math.max(o, .01);return i = (2 - r) * o, n = r * s, [a, 100 * (n = (n /= (e = (2 - r) * s) <= 1 ? e : 2 - e) || 0), 100 * (i /= 2)];
    }, a.hwb.rgb = function (t) {
      var e,
          n,
          i,
          a,
          r,
          o,
          s,
          l = t[0] / 360,
          u = t[1] / 100,
          d = t[2] / 100,
          h = u + d;switch (h > 1 && (u /= h, d /= h), i = 6 * l - (e = Math.floor(6 * l)), 0 != (1 & e) && (i = 1 - i), a = u + i * ((n = 1 - d) - u), e) {default:case 6:case 0:
          r = n, o = a, s = u;break;case 1:
          r = a, o = n, s = u;break;case 2:
          r = u, o = n, s = a;break;case 3:
          r = u, o = a, s = n;break;case 4:
          r = a, o = u, s = n;break;case 5:
          r = n, o = u, s = a;}return [255 * r, 255 * o, 255 * s];
    }, a.cmyk.rgb = function (t) {
      var e = t[0] / 100,
          n = t[1] / 100,
          i = t[2] / 100,
          a = t[3] / 100;return [255 * (1 - Math.min(1, e * (1 - a) + a)), 255 * (1 - Math.min(1, n * (1 - a) + a)), 255 * (1 - Math.min(1, i * (1 - a) + a))];
    }, a.xyz.rgb = function (t) {
      var e,
          n,
          i,
          a = t[0] / 100,
          r = t[1] / 100,
          o = t[2] / 100;return n = -.9689 * a + 1.8758 * r + .0415 * o, i = .0557 * a + -.204 * r + 1.057 * o, e = (e = 3.2406 * a + -1.5372 * r + -.4986 * o) > .0031308 ? 1.055 * Math.pow(e, 1 / 2.4) - .055 : 12.92 * e, n = n > .0031308 ? 1.055 * Math.pow(n, 1 / 2.4) - .055 : 12.92 * n, i = i > .0031308 ? 1.055 * Math.pow(i, 1 / 2.4) - .055 : 12.92 * i, [255 * (e = Math.min(Math.max(0, e), 1)), 255 * (n = Math.min(Math.max(0, n), 1)), 255 * (i = Math.min(Math.max(0, i), 1))];
    }, a.xyz.lab = function (t) {
      var e = t[0],
          n = t[1],
          i = t[2];return n /= 100, i /= 108.883, e = (e /= 95.047) > .008856 ? Math.pow(e, 1 / 3) : 7.787 * e + 16 / 116, [116 * (n = n > .008856 ? Math.pow(n, 1 / 3) : 7.787 * n + 16 / 116) - 16, 500 * (e - n), 200 * (n - (i = i > .008856 ? Math.pow(i, 1 / 3) : 7.787 * i + 16 / 116))];
    }, a.lab.xyz = function (t) {
      var e,
          n,
          i,
          a = t[0];e = t[1] / 500 + (n = (a + 16) / 116), i = n - t[2] / 200;var r = Math.pow(n, 3),
          o = Math.pow(e, 3),
          s = Math.pow(i, 3);return n = r > .008856 ? r : (n - 16 / 116) / 7.787, e = o > .008856 ? o : (e - 16 / 116) / 7.787, i = s > .008856 ? s : (i - 16 / 116) / 7.787, [e *= 95.047, n *= 100, i *= 108.883];
    }, a.lab.lch = function (t) {
      var e,
          n = t[0],
          i = t[1],
          a = t[2];return (e = 360 * Math.atan2(a, i) / 2 / Math.PI) < 0 && (e += 360), [n, Math.sqrt(i * i + a * a), e];
    }, a.lch.lab = function (t) {
      var e,
          n = t[0],
          i = t[1];return e = t[2] / 360 * 2 * Math.PI, [n, i * Math.cos(e), i * Math.sin(e)];
    }, a.rgb.ansi16 = function (t) {
      var e = t[0],
          n = t[1],
          i = t[2],
          r = 1 in arguments ? arguments[1] : a.rgb.hsv(t)[2];if (0 === (r = Math.round(r / 50))) return 30;var o = 30 + (Math.round(i / 255) << 2 | Math.round(n / 255) << 1 | Math.round(e / 255));return 2 === r && (o += 60), o;
    }, a.hsv.ansi16 = function (t) {
      return a.rgb.ansi16(a.hsv.rgb(t), t[2]);
    }, a.rgb.ansi256 = function (t) {
      var e = t[0],
          n = t[1],
          i = t[2];return e === n && n === i ? e < 8 ? 16 : e > 248 ? 231 : Math.round((e - 8) / 247 * 24) + 232 : 16 + 36 * Math.round(e / 255 * 5) + 6 * Math.round(n / 255 * 5) + Math.round(i / 255 * 5);
    }, a.ansi16.rgb = function (t) {
      var e = t % 10;if (0 === e || 7 === e) return t > 50 && (e += 3.5), [e = e / 10.5 * 255, e, e];var n = .5 * (1 + ~~(t > 50));return [(1 & e) * n * 255, (e >> 1 & 1) * n * 255, (e >> 2 & 1) * n * 255];
    }, a.ansi256.rgb = function (t) {
      if (t >= 232) {
        var e = 10 * (t - 232) + 8;return [e, e, e];
      }var n;return t -= 16, [Math.floor(t / 36) / 5 * 255, Math.floor((n = t % 36) / 6) / 5 * 255, n % 6 / 5 * 255];
    }, a.rgb.hex = function (t) {
      var e = (((255 & Math.round(t[0])) << 16) + ((255 & Math.round(t[1])) << 8) + (255 & Math.round(t[2]))).toString(16).toUpperCase();return "000000".substring(e.length) + e;
    }, a.hex.rgb = function (t) {
      var e = t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if (!e) return [0, 0, 0];var n = e[0];3 === e[0].length && (n = n.split("").map(function (t) {
        return t + t;
      }).join(""));var i = parseInt(n, 16);return [i >> 16 & 255, i >> 8 & 255, 255 & i];
    }, a.rgb.hcg = function (t) {
      var e,
          n = t[0] / 255,
          i = t[1] / 255,
          a = t[2] / 255,
          r = Math.max(Math.max(n, i), a),
          o = Math.min(Math.min(n, i), a),
          s = r - o;return e = s <= 0 ? 0 : r === n ? (i - a) / s % 6 : r === i ? 2 + (a - n) / s : 4 + (n - i) / s + 4, e /= 6, [360 * (e %= 1), 100 * s, 100 * (s < 1 ? o / (1 - s) : 0)];
    }, a.hsl.hcg = function (t) {
      var e = t[1] / 100,
          n = t[2] / 100,
          i = 1,
          a = 0;return (i = n < .5 ? 2 * e * n : 2 * e * (1 - n)) < 1 && (a = (n - .5 * i) / (1 - i)), [t[0], 100 * i, 100 * a];
    }, a.hsv.hcg = function (t) {
      var e = t[1] / 100,
          n = t[2] / 100,
          i = e * n,
          a = 0;return i < 1 && (a = (n - i) / (1 - i)), [t[0], 100 * i, 100 * a];
    }, a.hcg.rgb = function (t) {
      var e = t[0] / 360,
          n = t[1] / 100,
          i = t[2] / 100;if (0 === n) return [255 * i, 255 * i, 255 * i];var a,
          r = [0, 0, 0],
          o = e % 1 * 6,
          s = o % 1,
          l = 1 - s;switch (Math.floor(o)) {case 0:
          r[0] = 1, r[1] = s, r[2] = 0;break;case 1:
          r[0] = l, r[1] = 1, r[2] = 0;break;case 2:
          r[0] = 0, r[1] = 1, r[2] = s;break;case 3:
          r[0] = 0, r[1] = l, r[2] = 1;break;case 4:
          r[0] = s, r[1] = 0, r[2] = 1;break;default:
          r[0] = 1, r[1] = 0, r[2] = l;}return a = (1 - n) * i, [255 * (n * r[0] + a), 255 * (n * r[1] + a), 255 * (n * r[2] + a)];
    }, a.hcg.hsv = function (t) {
      var e = t[1] / 100,
          n = e + t[2] / 100 * (1 - e),
          i = 0;return n > 0 && (i = e / n), [t[0], 100 * i, 100 * n];
    }, a.hcg.hsl = function (t) {
      var e = t[1] / 100,
          n = t[2] / 100 * (1 - e) + .5 * e,
          i = 0;return n > 0 && n < .5 ? i = e / (2 * n) : n >= .5 && n < 1 && (i = e / (2 * (1 - n))), [t[0], 100 * i, 100 * n];
    }, a.hcg.hwb = function (t) {
      var e = t[1] / 100,
          n = e + t[2] / 100 * (1 - e);return [t[0], 100 * (n - e), 100 * (1 - n)];
    }, a.hwb.hcg = function (t) {
      var e = t[1] / 100,
          n = 1 - t[2] / 100,
          i = n - e,
          a = 0;return i < 1 && (a = (n - i) / (1 - i)), [t[0], 100 * i, 100 * a];
    }, a.apple.rgb = function (t) {
      return [t[0] / 65535 * 255, t[1] / 65535 * 255, t[2] / 65535 * 255];
    }, a.rgb.apple = function (t) {
      return [t[0] / 255 * 65535, t[1] / 255 * 65535, t[2] / 255 * 65535];
    }, a.gray.rgb = function (t) {
      return [t[0] / 100 * 255, t[0] / 100 * 255, t[0] / 100 * 255];
    }, a.gray.hsl = a.gray.hsv = function (t) {
      return [0, 0, t[0]];
    }, a.gray.hwb = function (t) {
      return [0, 100, t[0]];
    }, a.gray.cmyk = function (t) {
      return [0, 0, 0, t[0]];
    }, a.gray.lab = function (t) {
      return [t[0], 0, 0];
    }, a.gray.hex = function (t) {
      var e = 255 & Math.round(t[0] / 100 * 255),
          n = ((e << 16) + (e << 8) + e).toString(16).toUpperCase();return "000000".substring(n.length) + n;
    }, a.rgb.gray = function (t) {
      return [(t[0] + t[1] + t[2]) / 3 / 255 * 100];
    };
  });n.rgb, n.hsl, n.hsv, n.hwb, n.cmyk, n.xyz, n.lab, n.lch, n.hex, n.keyword, n.ansi16, n.ansi256, n.hcg, n.apple, n.gray;function i(t) {
    var e = function () {
      for (var t = {}, e = Object.keys(n), i = e.length, a = 0; a < i; a++) {
        t[e[a]] = { distance: -1, parent: null };
      }return t;
    }(),
        i = [t];for (e[t].distance = 0; i.length;) {
      for (var a = i.pop(), r = Object.keys(n[a]), o = r.length, s = 0; s < o; s++) {
        var l = r[s],
            u = e[l];-1 === u.distance && (u.distance = e[a].distance + 1, u.parent = a, i.unshift(l));
      }
    }return e;
  }function a(t, e) {
    return function (n) {
      return e(t(n));
    };
  }function r(t, e) {
    for (var i = [e[t].parent, t], r = n[e[t].parent][t], o = e[t].parent; e[o].parent;) {
      i.unshift(e[o].parent), r = a(n[e[o].parent][o], r), o = e[o].parent;
    }return r.conversion = i, r;
  }var o = {};Object.keys(n).forEach(function (t) {
    o[t] = {}, Object.defineProperty(o[t], "channels", { value: n[t].channels }), Object.defineProperty(o[t], "labels", { value: n[t].labels });var e = function (t) {
      for (var e = i(t), n = {}, a = Object.keys(e), o = a.length, s = 0; s < o; s++) {
        var l = a[s];null !== e[l].parent && (n[l] = r(l, e));
      }return n;
    }(t);Object.keys(e).forEach(function (n) {
      var i = e[n];o[t][n] = function (t) {
        var e = function e(_e2) {
          if (null == _e2) return _e2;arguments.length > 1 && (_e2 = Array.prototype.slice.call(arguments));var n = t(_e2);if ("object" == (typeof n === "undefined" ? "undefined" : _typeof(n))) for (var i = n.length, a = 0; a < i; a++) {
            n[a] = Math.round(n[a]);
          }return n;
        };return "conversion" in t && (e.conversion = t.conversion), e;
      }(i), o[t][n].raw = function (t) {
        var e = function e(_e3) {
          return null == _e3 ? _e3 : (arguments.length > 1 && (_e3 = Array.prototype.slice.call(arguments)), t(_e3));
        };return "conversion" in t && (e.conversion = t.conversion), e;
      }(i);
    });
  });var s = o,
      l = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] },
      u = { getRgba: d, getHsla: h, getRgb: function getRgb(t) {
      var e = d(t);return e && e.slice(0, 3);
    }, getHsl: function getHsl(t) {
      var e = h(t);return e && e.slice(0, 3);
    }, getHwb: c, getAlpha: function getAlpha(t) {
      var e = d(t);if (e) return e[3];if (e = h(t)) return e[3];if (e = c(t)) return e[3];
    }, hexString: function hexString(t, e) {
      e = void 0 !== e && 3 === t.length ? e : t[3];return "#" + v(t[0]) + v(t[1]) + v(t[2]) + (e >= 0 && e < 1 ? v(Math.round(255 * e)) : "");
    }, rgbString: function rgbString(t, e) {
      if (e < 1 || t[3] && t[3] < 1) return f(t, e);return "rgb(" + t[0] + ", " + t[1] + ", " + t[2] + ")";
    }, rgbaString: f, percentString: function percentString(t, e) {
      if (e < 1 || t[3] && t[3] < 1) return g(t, e);var n = Math.round(t[0] / 255 * 100),
          i = Math.round(t[1] / 255 * 100),
          a = Math.round(t[2] / 255 * 100);return "rgb(" + n + "%, " + i + "%, " + a + "%)";
    }, percentaString: g, hslString: function hslString(t, e) {
      if (e < 1 || t[3] && t[3] < 1) return p(t, e);return "hsl(" + t[0] + ", " + t[1] + "%, " + t[2] + "%)";
    }, hslaString: p, hwbString: function hwbString(t, e) {
      void 0 === e && (e = void 0 !== t[3] ? t[3] : 1);return "hwb(" + t[0] + ", " + t[1] + "%, " + t[2] + "%" + (void 0 !== e && 1 !== e ? ", " + e : "") + ")";
    }, keyword: function keyword(t) {
      return b[t.slice(0, 3)];
    } };function d(t) {
    if (t) {
      var e = [0, 0, 0],
          n = 1,
          i = t.match(/^#([a-fA-F0-9]{3,4})$/i),
          a = "";if (i) {
        a = (i = i[1])[3];for (var r = 0; r < e.length; r++) {
          e[r] = parseInt(i[r] + i[r], 16);
        }a && (n = Math.round(parseInt(a + a, 16) / 255 * 100) / 100);
      } else if (i = t.match(/^#([a-fA-F0-9]{6}([a-fA-F0-9]{2})?)$/i)) {
        a = i[2], i = i[1];for (r = 0; r < e.length; r++) {
          e[r] = parseInt(i.slice(2 * r, 2 * r + 2), 16);
        }a && (n = Math.round(parseInt(a, 16) / 255 * 100) / 100);
      } else if (i = t.match(/^rgba?\(\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*,\s*([+-]?\d+)\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
        for (r = 0; r < e.length; r++) {
          e[r] = parseInt(i[r + 1]);
        }n = parseFloat(i[4]);
      } else if (i = t.match(/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*,\s*([+-]?[\d\.]+)\%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)$/i)) {
        for (r = 0; r < e.length; r++) {
          e[r] = Math.round(2.55 * parseFloat(i[r + 1]));
        }n = parseFloat(i[4]);
      } else if (i = t.match(/(\w+)/)) {
        if ("transparent" == i[1]) return [0, 0, 0, 0];if (!(e = l[i[1]])) return;
      }for (r = 0; r < e.length; r++) {
        e[r] = m(e[r], 0, 255);
      }return n = n || 0 == n ? m(n, 0, 1) : 1, e[3] = n, e;
    }
  }function h(t) {
    if (t) {
      var e = t.match(/^hsla?\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if (e) {
        var n = parseFloat(e[4]);return [m(parseInt(e[1]), 0, 360), m(parseFloat(e[2]), 0, 100), m(parseFloat(e[3]), 0, 100), m(isNaN(n) ? 1 : n, 0, 1)];
      }
    }
  }function c(t) {
    if (t) {
      var e = t.match(/^hwb\(\s*([+-]?\d+)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?[\d\.]+)\s*)?\)/);if (e) {
        var n = parseFloat(e[4]);return [m(parseInt(e[1]), 0, 360), m(parseFloat(e[2]), 0, 100), m(parseFloat(e[3]), 0, 100), m(isNaN(n) ? 1 : n, 0, 1)];
      }
    }
  }function f(t, e) {
    return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "rgba(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + e + ")";
  }function g(t, e) {
    return "rgba(" + Math.round(t[0] / 255 * 100) + "%, " + Math.round(t[1] / 255 * 100) + "%, " + Math.round(t[2] / 255 * 100) + "%, " + (e || t[3] || 1) + ")";
  }function p(t, e) {
    return void 0 === e && (e = void 0 !== t[3] ? t[3] : 1), "hsla(" + t[0] + ", " + t[1] + "%, " + t[2] + "%, " + e + ")";
  }function m(t, e, n) {
    return Math.min(Math.max(e, t), n);
  }function v(t) {
    var e = t.toString(16).toUpperCase();return e.length < 2 ? "0" + e : e;
  }var b = {};for (var x in l) {
    b[l[x]] = x;
  }var y = function y(t) {
    return t instanceof y ? t : this instanceof y ? (this.valid = !1, this.values = { rgb: [0, 0, 0], hsl: [0, 0, 0], hsv: [0, 0, 0], hwb: [0, 0, 0], cmyk: [0, 0, 0, 0], alpha: 1 }, void ("string" == typeof t ? (e = u.getRgba(t)) ? this.setValues("rgb", e) : (e = u.getHsla(t)) ? this.setValues("hsl", e) : (e = u.getHwb(t)) && this.setValues("hwb", e) : "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && (void 0 !== (e = t).r || void 0 !== e.red ? this.setValues("rgb", e) : void 0 !== e.l || void 0 !== e.lightness ? this.setValues("hsl", e) : void 0 !== e.v || void 0 !== e.value ? this.setValues("hsv", e) : void 0 !== e.w || void 0 !== e.whiteness ? this.setValues("hwb", e) : void 0 === e.c && void 0 === e.cyan || this.setValues("cmyk", e)))) : new y(t);var e;
  };y.prototype = { isValid: function isValid() {
      return this.valid;
    }, rgb: function rgb() {
      return this.setSpace("rgb", arguments);
    }, hsl: function hsl() {
      return this.setSpace("hsl", arguments);
    }, hsv: function hsv() {
      return this.setSpace("hsv", arguments);
    }, hwb: function hwb() {
      return this.setSpace("hwb", arguments);
    }, cmyk: function cmyk() {
      return this.setSpace("cmyk", arguments);
    }, rgbArray: function rgbArray() {
      return this.values.rgb;
    }, hslArray: function hslArray() {
      return this.values.hsl;
    }, hsvArray: function hsvArray() {
      return this.values.hsv;
    }, hwbArray: function hwbArray() {
      var t = this.values;return 1 !== t.alpha ? t.hwb.concat([t.alpha]) : t.hwb;
    }, cmykArray: function cmykArray() {
      return this.values.cmyk;
    }, rgbaArray: function rgbaArray() {
      var t = this.values;return t.rgb.concat([t.alpha]);
    }, hslaArray: function hslaArray() {
      var t = this.values;return t.hsl.concat([t.alpha]);
    }, alpha: function alpha(t) {
      return void 0 === t ? this.values.alpha : (this.setValues("alpha", t), this);
    }, red: function red(t) {
      return this.setChannel("rgb", 0, t);
    }, green: function green(t) {
      return this.setChannel("rgb", 1, t);
    }, blue: function blue(t) {
      return this.setChannel("rgb", 2, t);
    }, hue: function hue(t) {
      return t && (t = (t %= 360) < 0 ? 360 + t : t), this.setChannel("hsl", 0, t);
    }, saturation: function saturation(t) {
      return this.setChannel("hsl", 1, t);
    }, lightness: function lightness(t) {
      return this.setChannel("hsl", 2, t);
    }, saturationv: function saturationv(t) {
      return this.setChannel("hsv", 1, t);
    }, whiteness: function whiteness(t) {
      return this.setChannel("hwb", 1, t);
    }, blackness: function blackness(t) {
      return this.setChannel("hwb", 2, t);
    }, value: function value(t) {
      return this.setChannel("hsv", 2, t);
    }, cyan: function cyan(t) {
      return this.setChannel("cmyk", 0, t);
    }, magenta: function magenta(t) {
      return this.setChannel("cmyk", 1, t);
    }, yellow: function yellow(t) {
      return this.setChannel("cmyk", 2, t);
    }, black: function black(t) {
      return this.setChannel("cmyk", 3, t);
    }, hexString: function hexString() {
      return u.hexString(this.values.rgb);
    }, rgbString: function rgbString() {
      return u.rgbString(this.values.rgb, this.values.alpha);
    }, rgbaString: function rgbaString() {
      return u.rgbaString(this.values.rgb, this.values.alpha);
    }, percentString: function percentString() {
      return u.percentString(this.values.rgb, this.values.alpha);
    }, hslString: function hslString() {
      return u.hslString(this.values.hsl, this.values.alpha);
    }, hslaString: function hslaString() {
      return u.hslaString(this.values.hsl, this.values.alpha);
    }, hwbString: function hwbString() {
      return u.hwbString(this.values.hwb, this.values.alpha);
    }, keyword: function keyword() {
      return u.keyword(this.values.rgb, this.values.alpha);
    }, rgbNumber: function rgbNumber() {
      var t = this.values.rgb;return t[0] << 16 | t[1] << 8 | t[2];
    }, luminosity: function luminosity() {
      for (var t = this.values.rgb, e = [], n = 0; n < t.length; n++) {
        var i = t[n] / 255;e[n] = i <= .03928 ? i / 12.92 : Math.pow((i + .055) / 1.055, 2.4);
      }return .2126 * e[0] + .7152 * e[1] + .0722 * e[2];
    }, contrast: function contrast(t) {
      var e = this.luminosity(),
          n = t.luminosity();return e > n ? (e + .05) / (n + .05) : (n + .05) / (e + .05);
    }, level: function level(t) {
      var e = this.contrast(t);return e >= 7.1 ? "AAA" : e >= 4.5 ? "AA" : "";
    }, dark: function dark() {
      var t = this.values.rgb;return (299 * t[0] + 587 * t[1] + 114 * t[2]) / 1e3 < 128;
    }, light: function light() {
      return !this.dark();
    }, negate: function negate() {
      for (var t = [], e = 0; e < 3; e++) {
        t[e] = 255 - this.values.rgb[e];
      }return this.setValues("rgb", t), this;
    }, lighten: function lighten(t) {
      var e = this.values.hsl;return e[2] += e[2] * t, this.setValues("hsl", e), this;
    }, darken: function darken(t) {
      var e = this.values.hsl;return e[2] -= e[2] * t, this.setValues("hsl", e), this;
    }, saturate: function saturate(t) {
      var e = this.values.hsl;return e[1] += e[1] * t, this.setValues("hsl", e), this;
    }, desaturate: function desaturate(t) {
      var e = this.values.hsl;return e[1] -= e[1] * t, this.setValues("hsl", e), this;
    }, whiten: function whiten(t) {
      var e = this.values.hwb;return e[1] += e[1] * t, this.setValues("hwb", e), this;
    }, blacken: function blacken(t) {
      var e = this.values.hwb;return e[2] += e[2] * t, this.setValues("hwb", e), this;
    }, greyscale: function greyscale() {
      var t = this.values.rgb,
          e = .3 * t[0] + .59 * t[1] + .11 * t[2];return this.setValues("rgb", [e, e, e]), this;
    }, clearer: function clearer(t) {
      var e = this.values.alpha;return this.setValues("alpha", e - e * t), this;
    }, opaquer: function opaquer(t) {
      var e = this.values.alpha;return this.setValues("alpha", e + e * t), this;
    }, rotate: function rotate(t) {
      var e = this.values.hsl,
          n = (e[0] + t) % 360;return e[0] = n < 0 ? 360 + n : n, this.setValues("hsl", e), this;
    }, mix: function mix(t, e) {
      var n = t,
          i = void 0 === e ? .5 : e,
          a = 2 * i - 1,
          r = this.alpha() - n.alpha(),
          o = ((a * r == -1 ? a : (a + r) / (1 + a * r)) + 1) / 2,
          s = 1 - o;return this.rgb(o * this.red() + s * n.red(), o * this.green() + s * n.green(), o * this.blue() + s * n.blue()).alpha(this.alpha() * i + n.alpha() * (1 - i));
    }, toJSON: function toJSON() {
      return this.rgb();
    }, clone: function clone() {
      var t,
          e,
          n = new y(),
          i = this.values,
          a = n.values;for (var r in i) {
        i.hasOwnProperty(r) && (t = i[r], "[object Array]" === (e = {}.toString.call(t)) ? a[r] = t.slice(0) : "[object Number]" === e ? a[r] = t : console.error("unexpected color value:", t));
      }return n;
    } }, y.prototype.spaces = { rgb: ["red", "green", "blue"], hsl: ["hue", "saturation", "lightness"], hsv: ["hue", "saturation", "value"], hwb: ["hue", "whiteness", "blackness"], cmyk: ["cyan", "magenta", "yellow", "black"] }, y.prototype.maxes = { rgb: [255, 255, 255], hsl: [360, 100, 100], hsv: [360, 100, 100], hwb: [360, 100, 100], cmyk: [100, 100, 100, 100] }, y.prototype.getValues = function (t) {
    for (var e = this.values, n = {}, i = 0; i < t.length; i++) {
      n[t.charAt(i)] = e[t][i];
    }return 1 !== e.alpha && (n.a = e.alpha), n;
  }, y.prototype.setValues = function (t, e) {
    var n,
        i,
        a = this.values,
        r = this.spaces,
        o = this.maxes,
        l = 1;if (this.valid = !0, "alpha" === t) l = e;else if (e.length) a[t] = e.slice(0, t.length), l = e[t.length];else if (void 0 !== e[t.charAt(0)]) {
      for (n = 0; n < t.length; n++) {
        a[t][n] = e[t.charAt(n)];
      }l = e.a;
    } else if (void 0 !== e[r[t][0]]) {
      var u = r[t];for (n = 0; n < t.length; n++) {
        a[t][n] = e[u[n]];
      }l = e.alpha;
    }if (a.alpha = Math.max(0, Math.min(1, void 0 === l ? a.alpha : l)), "alpha" === t) return !1;for (n = 0; n < t.length; n++) {
      i = Math.max(0, Math.min(o[t][n], a[t][n])), a[t][n] = Math.round(i);
    }for (var d in r) {
      d !== t && (a[d] = s[t][d](a[t]));
    }return !0;
  }, y.prototype.setSpace = function (t, e) {
    var n = e[0];return void 0 === n ? this.getValues(t) : ("number" == typeof n && (n = Array.prototype.slice.call(e)), this.setValues(t, n), this);
  }, y.prototype.setChannel = function (t, e, n) {
    var i = this.values[t];return void 0 === n ? i[e] : n === i[e] ? this : (i[e] = n, this.setValues(t, i), this);
  }, "undefined" != typeof window && (window.Color = y);var _,
      k = y,
      w = { noop: function noop() {}, uid: (_ = 0, function () {
      return _++;
    }), isNullOrUndef: function isNullOrUndef(t) {
      return null == t;
    }, isArray: function isArray(t) {
      if (Array.isArray && Array.isArray(t)) return !0;var e = Object.prototype.toString.call(t);return "[object" === e.substr(0, 7) && "Array]" === e.substr(-6);
    }, isObject: function isObject(t) {
      return null !== t && "[object Object]" === Object.prototype.toString.call(t);
    }, isFinite: function (_isFinite) {
      function isFinite(_x) {
        return _isFinite.apply(this, arguments);
      }

      isFinite.toString = function () {
        return _isFinite.toString();
      };

      return isFinite;
    }(function (t) {
      return ("number" == typeof t || t instanceof Number) && isFinite(t);
    }), valueOrDefault: function valueOrDefault(t, e) {
      return void 0 === t ? e : t;
    }, valueAtIndexOrDefault: function valueAtIndexOrDefault(t, e, n) {
      return w.valueOrDefault(w.isArray(t) ? t[e] : t, n);
    }, callback: function callback(t, e, n) {
      if (t && "function" == typeof t.call) return t.apply(n, e);
    }, each: function each(t, e, n, i) {
      var a, r, o;if (w.isArray(t)) {
        if (r = t.length, i) for (a = r - 1; a >= 0; a--) {
          e.call(n, t[a], a);
        } else for (a = 0; a < r; a++) {
          e.call(n, t[a], a);
        }
      } else if (w.isObject(t)) for (r = (o = Object.keys(t)).length, a = 0; a < r; a++) {
        e.call(n, t[o[a]], o[a]);
      }
    }, arrayEquals: function arrayEquals(t, e) {
      var n, i, a, r;if (!t || !e || t.length !== e.length) return !1;for (n = 0, i = t.length; n < i; ++n) {
        if (a = t[n], r = e[n], a instanceof Array && r instanceof Array) {
          if (!w.arrayEquals(a, r)) return !1;
        } else if (a !== r) return !1;
      }return !0;
    }, clone: function clone(t) {
      if (w.isArray(t)) return t.map(w.clone);if (w.isObject(t)) {
        for (var e = {}, n = Object.keys(t), i = n.length, a = 0; a < i; ++a) {
          e[n[a]] = w.clone(t[n[a]]);
        }return e;
      }return t;
    }, _merger: function _merger(t, e, n, i) {
      var a = e[t],
          r = n[t];w.isObject(a) && w.isObject(r) ? w.merge(a, r, i) : e[t] = w.clone(r);
    }, _mergerIf: function _mergerIf(t, e, n) {
      var i = e[t],
          a = n[t];w.isObject(i) && w.isObject(a) ? w.mergeIf(i, a) : e.hasOwnProperty(t) || (e[t] = w.clone(a));
    }, merge: function merge(t, e, n) {
      var i,
          a,
          r,
          o,
          s,
          l = w.isArray(e) ? e : [e],
          u = l.length;if (!w.isObject(t)) return t;for (i = (n = n || {}).merger || w._merger, a = 0; a < u; ++a) {
        if (e = l[a], w.isObject(e)) for (s = 0, o = (r = Object.keys(e)).length; s < o; ++s) {
          i(r[s], t, e, n);
        }
      }return t;
    }, mergeIf: function mergeIf(t, e) {
      return w.merge(t, e, { merger: w._mergerIf });
    }, extend: Object.assign || function (t) {
      return w.merge(t, [].slice.call(arguments, 1), { merger: function merger(t, e, n) {
          e[t] = n[t];
        } });
    }, inherits: function inherits(t) {
      var e = this,
          n = t && t.hasOwnProperty("constructor") ? t.constructor : function () {
        return e.apply(this, arguments);
      },
          i = function i() {
        this.constructor = n;
      };return i.prototype = e.prototype, n.prototype = new i(), n.extend = w.inherits, t && w.extend(n.prototype, t), n.__super__ = e.prototype, n;
    }, _deprecated: function _deprecated(t, e, n, i) {
      void 0 !== e && console.warn(t + ': "' + n + '" is deprecated. Please use "' + i + '" instead');
    } },
      M = w;w.callCallback = w.callback, w.indexOf = function (t, e, n) {
    return Array.prototype.indexOf.call(t, e, n);
  }, w.getValueOrDefault = w.valueOrDefault, w.getValueAtIndexOrDefault = w.valueAtIndexOrDefault;var S = { linear: function linear(t) {
      return t;
    }, easeInQuad: function easeInQuad(t) {
      return t * t;
    }, easeOutQuad: function easeOutQuad(t) {
      return -t * (t - 2);
    }, easeInOutQuad: function easeInOutQuad(t) {
      return (t /= .5) < 1 ? .5 * t * t : -.5 * (--t * (t - 2) - 1);
    }, easeInCubic: function easeInCubic(t) {
      return t * t * t;
    }, easeOutCubic: function easeOutCubic(t) {
      return (t -= 1) * t * t + 1;
    }, easeInOutCubic: function easeInOutCubic(t) {
      return (t /= .5) < 1 ? .5 * t * t * t : .5 * ((t -= 2) * t * t + 2);
    }, easeInQuart: function easeInQuart(t) {
      return t * t * t * t;
    }, easeOutQuart: function easeOutQuart(t) {
      return -((t -= 1) * t * t * t - 1);
    }, easeInOutQuart: function easeInOutQuart(t) {
      return (t /= .5) < 1 ? .5 * t * t * t * t : -.5 * ((t -= 2) * t * t * t - 2);
    }, easeInQuint: function easeInQuint(t) {
      return t * t * t * t * t;
    }, easeOutQuint: function easeOutQuint(t) {
      return (t -= 1) * t * t * t * t + 1;
    }, easeInOutQuint: function easeInOutQuint(t) {
      return (t /= .5) < 1 ? .5 * t * t * t * t * t : .5 * ((t -= 2) * t * t * t * t + 2);
    }, easeInSine: function easeInSine(t) {
      return 1 - Math.cos(t * (Math.PI / 2));
    }, easeOutSine: function easeOutSine(t) {
      return Math.sin(t * (Math.PI / 2));
    }, easeInOutSine: function easeInOutSine(t) {
      return -.5 * (Math.cos(Math.PI * t) - 1);
    }, easeInExpo: function easeInExpo(t) {
      return 0 === t ? 0 : Math.pow(2, 10 * (t - 1));
    }, easeOutExpo: function easeOutExpo(t) {
      return 1 === t ? 1 : 1 - Math.pow(2, -10 * t);
    }, easeInOutExpo: function easeInOutExpo(t) {
      return 0 === t ? 0 : 1 === t ? 1 : (t /= .5) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * --t));
    }, easeInCirc: function easeInCirc(t) {
      return t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1);
    }, easeOutCirc: function easeOutCirc(t) {
      return Math.sqrt(1 - (t -= 1) * t);
    }, easeInOutCirc: function easeInOutCirc(t) {
      return (t /= .5) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1);
    }, easeInElastic: function easeInElastic(t) {
      var e = 1.70158,
          n = 0,
          i = 1;return 0 === t ? 0 : 1 === t ? 1 : (n || (n = .3), i < 1 ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), -i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n));
    }, easeOutElastic: function easeOutElastic(t) {
      var e = 1.70158,
          n = 0,
          i = 1;return 0 === t ? 0 : 1 === t ? 1 : (n || (n = .3), i < 1 ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), i * Math.pow(2, -10 * t) * Math.sin((t - e) * (2 * Math.PI) / n) + 1);
    }, easeInOutElastic: function easeInOutElastic(t) {
      var e = 1.70158,
          n = 0,
          i = 1;return 0 === t ? 0 : 2 == (t /= .5) ? 1 : (n || (n = .45), i < 1 ? (i = 1, e = n / 4) : e = n / (2 * Math.PI) * Math.asin(1 / i), t < 1 ? i * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * -.5 : i * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - e) * (2 * Math.PI) / n) * .5 + 1);
    }, easeInBack: function easeInBack(t) {
      var e = 1.70158;return t * t * ((e + 1) * t - e);
    }, easeOutBack: function easeOutBack(t) {
      var e = 1.70158;return (t -= 1) * t * ((e + 1) * t + e) + 1;
    }, easeInOutBack: function easeInOutBack(t) {
      var e = 1.70158;return (t /= .5) < 1 ? t * t * ((1 + (e *= 1.525)) * t - e) * .5 : .5 * ((t -= 2) * t * ((1 + (e *= 1.525)) * t + e) + 2);
    }, easeInBounce: function easeInBounce(t) {
      return 1 - S.easeOutBounce(1 - t);
    }, easeOutBounce: function easeOutBounce(t) {
      return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
    }, easeInOutBounce: function easeInOutBounce(t) {
      return t < .5 ? .5 * S.easeInBounce(2 * t) : .5 * S.easeOutBounce(2 * t - 1) + .5;
    } },
      C = { effects: S };M.easingEffects = S;var P = Math.PI,
      A = P / 180,
      D = 2 * P,
      T = P / 2,
      I = P / 4,
      F = 2 * P / 3,
      L = { clear: function clear(t) {
      t.ctx.clearRect(0, 0, t.width, t.height);
    }, roundedRect: function roundedRect(t, e, n, i, a, r) {
      if (r) {
        var o = Math.min(r, a / 2, i / 2),
            s = e + o,
            l = n + o,
            u = e + i - o,
            d = n + a - o;t.moveTo(e, l), s < u && l < d ? (t.arc(s, l, o, -P, -T), t.arc(u, l, o, -T, 0), t.arc(u, d, o, 0, T), t.arc(s, d, o, T, P)) : s < u ? (t.moveTo(s, n), t.arc(u, l, o, -T, T), t.arc(s, l, o, T, P + T)) : l < d ? (t.arc(s, l, o, -P, 0), t.arc(s, d, o, 0, P)) : t.arc(s, l, o, -P, P), t.closePath(), t.moveTo(e, n);
      } else t.rect(e, n, i, a);
    }, drawPoint: function drawPoint(t, e, n, i, a, r) {
      var o,
          s,
          l,
          u,
          d,
          h = (r || 0) * A;if (e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && ("[object HTMLImageElement]" === (o = e.toString()) || "[object HTMLCanvasElement]" === o)) return t.save(), t.translate(i, a), t.rotate(h), t.drawImage(e, -e.width / 2, -e.height / 2, e.width, e.height), void t.restore();if (!(isNaN(n) || n <= 0)) {
        switch (t.beginPath(), e) {default:
            t.arc(i, a, n, 0, D), t.closePath();break;case "triangle":
            t.moveTo(i + Math.sin(h) * n, a - Math.cos(h) * n), h += F, t.lineTo(i + Math.sin(h) * n, a - Math.cos(h) * n), h += F, t.lineTo(i + Math.sin(h) * n, a - Math.cos(h) * n), t.closePath();break;case "rectRounded":
            u = n - (d = .516 * n), s = Math.cos(h + I) * u, l = Math.sin(h + I) * u, t.arc(i - s, a - l, d, h - P, h - T), t.arc(i + l, a - s, d, h - T, h), t.arc(i + s, a + l, d, h, h + T), t.arc(i - l, a + s, d, h + T, h + P), t.closePath();break;case "rect":
            if (!r) {
              u = Math.SQRT1_2 * n, t.rect(i - u, a - u, 2 * u, 2 * u);break;
            }h += I;case "rectRot":
            s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + l, a - s), t.lineTo(i + s, a + l), t.lineTo(i - l, a + s), t.closePath();break;case "crossRot":
            h += I;case "cross":
            s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l), t.moveTo(i + l, a - s), t.lineTo(i - l, a + s);break;case "star":
            s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l), t.moveTo(i + l, a - s), t.lineTo(i - l, a + s), h += I, s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l), t.moveTo(i + l, a - s), t.lineTo(i - l, a + s);break;case "line":
            s = Math.cos(h) * n, l = Math.sin(h) * n, t.moveTo(i - s, a - l), t.lineTo(i + s, a + l);break;case "dash":
            t.moveTo(i, a), t.lineTo(i + Math.cos(h) * n, a + Math.sin(h) * n);}t.fill(), t.stroke();
      }
    }, _isPointInArea: function _isPointInArea(t, e) {
      return t.x > e.left - 1e-6 && t.x < e.right + 1e-6 && t.y > e.top - 1e-6 && t.y < e.bottom + 1e-6;
    }, clipArea: function clipArea(t, e) {
      t.save(), t.beginPath(), t.rect(e.left, e.top, e.right - e.left, e.bottom - e.top), t.clip();
    }, unclipArea: function unclipArea(t) {
      t.restore();
    }, lineTo: function lineTo(t, e, n, i) {
      var a = n.steppedLine;if (a) {
        if ("middle" === a) {
          var r = (e.x + n.x) / 2;t.lineTo(r, i ? n.y : e.y), t.lineTo(r, i ? e.y : n.y);
        } else "after" === a && !i || "after" !== a && i ? t.lineTo(e.x, n.y) : t.lineTo(n.x, e.y);t.lineTo(n.x, n.y);
      } else n.tension ? t.bezierCurveTo(i ? e.controlPointPreviousX : e.controlPointNextX, i ? e.controlPointPreviousY : e.controlPointNextY, i ? n.controlPointNextX : n.controlPointPreviousX, i ? n.controlPointNextY : n.controlPointPreviousY, n.x, n.y) : t.lineTo(n.x, n.y);
    } },
      O = L;M.clear = L.clear, M.drawRoundedRectangle = function (t) {
    t.beginPath(), L.roundedRect.apply(L, arguments);
  };var R = { _set: function _set(t, e) {
      return M.merge(this[t] || (this[t] = {}), e);
    } };R._set("global", { defaultColor: "rgba(0,0,0,0.1)", defaultFontColor: "#666", defaultFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif", defaultFontSize: 12, defaultFontStyle: "normal", defaultLineHeight: 1.2, showLines: !0 });var z = R,
      N = M.valueOrDefault;var B = { toLineHeight: function toLineHeight(t, e) {
      var n = ("" + t).match(/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/);if (!n || "normal" === n[1]) return 1.2 * e;switch (t = +n[2], n[3]) {case "px":
          return t;case "%":
          t /= 100;}return e * t;
    }, toPadding: function toPadding(t) {
      var e, n, i, a;return M.isObject(t) ? (e = +t.top || 0, n = +t.right || 0, i = +t.bottom || 0, a = +t.left || 0) : e = n = i = a = +t || 0, { top: e, right: n, bottom: i, left: a, height: e + i, width: a + n };
    }, _parseFont: function _parseFont(t) {
      var e = z.global,
          n = N(t.fontSize, e.defaultFontSize),
          i = { family: N(t.fontFamily, e.defaultFontFamily), lineHeight: M.options.toLineHeight(N(t.lineHeight, e.defaultLineHeight), n), size: n, style: N(t.fontStyle, e.defaultFontStyle), weight: null, string: "" };return i.string = function (t) {
        return !t || M.isNullOrUndef(t.size) || M.isNullOrUndef(t.family) ? null : (t.style ? t.style + " " : "") + (t.weight ? t.weight + " " : "") + t.size + "px " + t.family;
      }(i), i;
    }, resolve: function resolve(t, e, n, i) {
      var a,
          r,
          o,
          s = !0;for (a = 0, r = t.length; a < r; ++a) {
        if (void 0 !== (o = t[a]) && (void 0 !== e && "function" == typeof o && (o = o(e), s = !1), void 0 !== n && M.isArray(o) && (o = o[n], s = !1), void 0 !== o)) return i && !s && (i.cacheable = !1), o;
      }
    } },
      E = { _factorize: function _factorize(t) {
      var e,
          n = [],
          i = Math.sqrt(t);for (e = 1; e < i; e++) {
        t % e == 0 && (n.push(e), n.push(t / e));
      }return i === (0 | i) && n.push(i), n.sort(function (t, e) {
        return t - e;
      }).pop(), n;
    }, log10: Math.log10 || function (t) {
      var e = Math.log(t) * Math.LOG10E,
          n = Math.round(e);return t === Math.pow(10, n) ? n : e;
    } },
      W = E;M.log10 = E.log10;var V = M,
      H = C,
      j = O,
      q = B,
      U = W,
      Y = { getRtlAdapter: function getRtlAdapter(t, e, n) {
      return t ? function (t, e) {
        return { x: function x(n) {
            return t + t + e - n;
          }, setWidth: function setWidth(t) {
            e = t;
          }, textAlign: function textAlign(t) {
            return "center" === t ? t : "right" === t ? "left" : "right";
          }, xPlus: function xPlus(t, e) {
            return t - e;
          }, leftForLtr: function leftForLtr(t, e) {
            return t - e;
          } };
      }(e, n) : { x: function x(t) {
          return t;
        }, setWidth: function setWidth(t) {}, textAlign: function textAlign(t) {
          return t;
        }, xPlus: function xPlus(t, e) {
          return t + e;
        }, leftForLtr: function leftForLtr(t, e) {
          return t;
        } };
    }, overrideTextDirection: function overrideTextDirection(t, e) {
      var n, i;"ltr" !== e && "rtl" !== e || (i = [(n = t.canvas.style).getPropertyValue("direction"), n.getPropertyPriority("direction")], n.setProperty("direction", e, "important"), t.prevTextDirection = i);
    }, restoreTextDirection: function restoreTextDirection(t) {
      var e = t.prevTextDirection;void 0 !== e && (delete t.prevTextDirection, t.canvas.style.setProperty("direction", e[0], e[1]));
    } };V.easing = H, V.canvas = j, V.options = q, V.math = U, V.rtl = Y;var G = function G(t) {
    V.extend(this, t), this.initialize.apply(this, arguments);
  };V.extend(G.prototype, { _type: void 0, initialize: function initialize() {
      this.hidden = !1;
    }, pivot: function pivot() {
      var t = this;return t._view || (t._view = V.extend({}, t._model)), t._start = {}, t;
    }, transition: function transition(t) {
      var e = this,
          n = e._model,
          i = e._start,
          a = e._view;return n && 1 !== t ? (a || (a = e._view = {}), i || (i = e._start = {}), function (t, e, n, i) {
        var a,
            r,
            o,
            s,
            l,
            u,
            d,
            h,
            c,
            f = Object.keys(n);for (a = 0, r = f.length; a < r; ++a) {
          if (u = n[o = f[a]], e.hasOwnProperty(o) || (e[o] = u), (s = e[o]) !== u && "_" !== o[0]) {
            if (t.hasOwnProperty(o) || (t[o] = s), (d = typeof u === "undefined" ? "undefined" : _typeof(u)) === _typeof(l = t[o])) if ("string" === d) {
              if ((h = k(l)).valid && (c = k(u)).valid) {
                e[o] = c.mix(h, i).rgbString();continue;
              }
            } else if (V.isFinite(l) && V.isFinite(u)) {
              e[o] = l + (u - l) * i;continue;
            }e[o] = u;
          }
        }
      }(i, a, n, t), e) : (e._view = V.extend({}, n), e._start = null, e);
    }, tooltipPosition: function tooltipPosition() {
      return { x: this._model.x, y: this._model.y };
    }, hasValue: function hasValue() {
      return V.isNumber(this._model.x) && V.isNumber(this._model.y);
    } }), G.extend = V.inherits;var X = G,
      K = X.extend({ chart: null, currentStep: 0, numSteps: 60, easing: "", render: null, onAnimationProgress: null, onAnimationComplete: null }),
      Z = K;Object.defineProperty(K.prototype, "animationObject", { get: function get() {
      return this;
    } }), Object.defineProperty(K.prototype, "chartInstance", { get: function get() {
      return this.chart;
    }, set: function set(t) {
      this.chart = t;
    } }), z._set("global", { animation: { duration: 1e3, easing: "easeOutQuart", onProgress: V.noop, onComplete: V.noop } });var $ = { animations: [], request: null, addAnimation: function addAnimation(t, e, n, i) {
      var a,
          r,
          o = this.animations;for (e.chart = t, e.startTime = Date.now(), e.duration = n, i || (t.animating = !0), a = 0, r = o.length; a < r; ++a) {
        if (o[a].chart === t) return void (o[a] = e);
      }o.push(e), 1 === o.length && this.requestAnimationFrame();
    }, cancelAnimation: function cancelAnimation(t) {
      var e = V.findIndex(this.animations, function (e) {
        return e.chart === t;
      });-1 !== e && (this.animations.splice(e, 1), t.animating = !1);
    }, requestAnimationFrame: function requestAnimationFrame() {
      var t = this;null === t.request && (t.request = V.requestAnimFrame.call(window, function () {
        t.request = null, t.startDigest();
      }));
    }, startDigest: function startDigest() {
      this.advance(), this.animations.length > 0 && this.requestAnimationFrame();
    }, advance: function advance() {
      for (var t, e, n, i, a = this.animations, r = 0; r < a.length;) {
        e = (t = a[r]).chart, n = t.numSteps, i = Math.floor((Date.now() - t.startTime) / t.duration * n) + 1, t.currentStep = Math.min(i, n), V.callback(t.render, [e, t], e), V.callback(t.onAnimationProgress, [t], e), t.currentStep >= n ? (V.callback(t.onAnimationComplete, [t], e), e.animating = !1, a.splice(r, 1)) : ++r;
      }
    } },
      J = V.options.resolve,
      Q = ["push", "pop", "shift", "splice", "unshift"];function tt(t, e) {
    var n = t._chartjs;if (n) {
      var i = n.listeners,
          a = i.indexOf(e);-1 !== a && i.splice(a, 1), i.length > 0 || (Q.forEach(function (e) {
        delete t[e];
      }), delete t._chartjs);
    }
  }var et = function et(t, e) {
    this.initialize(t, e);
  };V.extend(et.prototype, { datasetElementType: null, dataElementType: null, _datasetElementOptions: ["backgroundColor", "borderCapStyle", "borderColor", "borderDash", "borderDashOffset", "borderJoinStyle", "borderWidth"], _dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "pointStyle"], initialize: function initialize(t, e) {
      var n = this;n.chart = t, n.index = e, n.linkScales(), n.addElements(), n._type = n.getMeta().type;
    }, updateIndex: function updateIndex(t) {
      this.index = t;
    }, linkScales: function linkScales() {
      var t = this.getMeta(),
          e = this.chart,
          n = e.scales,
          i = this.getDataset(),
          a = e.options.scales;null !== t.xAxisID && t.xAxisID in n && !i.xAxisID || (t.xAxisID = i.xAxisID || a.xAxes[0].id), null !== t.yAxisID && t.yAxisID in n && !i.yAxisID || (t.yAxisID = i.yAxisID || a.yAxes[0].id);
    }, getDataset: function getDataset() {
      return this.chart.data.datasets[this.index];
    }, getMeta: function getMeta() {
      return this.chart.getDatasetMeta(this.index);
    }, getScaleForId: function getScaleForId(t) {
      return this.chart.scales[t];
    }, _getValueScaleId: function _getValueScaleId() {
      return this.getMeta().yAxisID;
    }, _getIndexScaleId: function _getIndexScaleId() {
      return this.getMeta().xAxisID;
    }, _getValueScale: function _getValueScale() {
      return this.getScaleForId(this._getValueScaleId());
    }, _getIndexScale: function _getIndexScale() {
      return this.getScaleForId(this._getIndexScaleId());
    }, reset: function reset() {
      this._update(!0);
    }, destroy: function destroy() {
      this._data && tt(this._data, this);
    }, createMetaDataset: function createMetaDataset() {
      var t = this.datasetElementType;return t && new t({ _chart: this.chart, _datasetIndex: this.index });
    }, createMetaData: function createMetaData(t) {
      var e = this.dataElementType;return e && new e({ _chart: this.chart, _datasetIndex: this.index, _index: t });
    }, addElements: function addElements() {
      var t,
          e,
          n = this.getMeta(),
          i = this.getDataset().data || [],
          a = n.data;for (t = 0, e = i.length; t < e; ++t) {
        a[t] = a[t] || this.createMetaData(t);
      }n.dataset = n.dataset || this.createMetaDataset();
    }, addElementAndReset: function addElementAndReset(t) {
      var e = this.createMetaData(t);this.getMeta().data.splice(t, 0, e), this.updateElement(e, t, !0);
    }, buildOrUpdateElements: function buildOrUpdateElements() {
      var t,
          e,
          n = this,
          i = n.getDataset(),
          a = i.data || (i.data = []);n._data !== a && (n._data && tt(n._data, n), a && Object.isExtensible(a) && (e = n, (t = a)._chartjs ? t._chartjs.listeners.push(e) : (Object.defineProperty(t, "_chartjs", { configurable: !0, enumerable: !1, value: { listeners: [e] } }), Q.forEach(function (e) {
        var n = "onData" + e.charAt(0).toUpperCase() + e.slice(1),
            i = t[e];Object.defineProperty(t, e, { configurable: !0, enumerable: !1, value: function value() {
            var e = Array.prototype.slice.call(arguments),
                a = i.apply(this, e);return V.each(t._chartjs.listeners, function (t) {
              "function" == typeof t[n] && t[n].apply(t, e);
            }), a;
          } });
      }))), n._data = a), n.resyncElements();
    }, _configure: function _configure() {
      this._config = V.merge({}, [this.chart.options.datasets[this._type], this.getDataset()], { merger: function merger(t, e, n) {
          "_meta" !== t && "data" !== t && V._merger(t, e, n);
        } });
    }, _update: function _update(t) {
      this._configure(), this._cachedDataOpts = null, this.update(t);
    }, update: V.noop, transition: function transition(t) {
      for (var e = this.getMeta(), n = e.data || [], i = n.length, a = 0; a < i; ++a) {
        n[a].transition(t);
      }e.dataset && e.dataset.transition(t);
    }, draw: function draw() {
      var t = this.getMeta(),
          e = t.data || [],
          n = e.length,
          i = 0;for (t.dataset && t.dataset.draw(); i < n; ++i) {
        e[i].draw();
      }
    }, getStyle: function getStyle(t) {
      var e,
          n = this.getMeta(),
          i = n.dataset;return this._configure(), i && void 0 === t ? e = this._resolveDatasetElementOptions(i || {}) : (t = t || 0, e = this._resolveDataElementOptions(n.data[t] || {}, t)), !1 !== e.fill && null !== e.fill || (e.backgroundColor = e.borderColor), e;
    }, _resolveDatasetElementOptions: function _resolveDatasetElementOptions(t, e) {
      var n,
          i,
          a,
          r,
          o = this,
          s = o.chart,
          l = o._config,
          u = t.custom || {},
          d = s.options.elements[o.datasetElementType.prototype._type] || {},
          h = o._datasetElementOptions,
          c = {},
          f = { chart: s, dataset: o.getDataset(), datasetIndex: o.index, hover: e };for (n = 0, i = h.length; n < i; ++n) {
        a = h[n], r = e ? "hover" + a.charAt(0).toUpperCase() + a.slice(1) : a, c[a] = J([u[r], l[r], d[r]], f);
      }return c;
    }, _resolveDataElementOptions: function _resolveDataElementOptions(t, e) {
      var n = this,
          i = t && t.custom,
          a = n._cachedDataOpts;if (a && !i) return a;var r,
          o,
          s,
          l,
          u = n.chart,
          d = n._config,
          h = u.options.elements[n.dataElementType.prototype._type] || {},
          c = n._dataElementOptions,
          f = {},
          g = { chart: u, dataIndex: e, dataset: n.getDataset(), datasetIndex: n.index },
          p = { cacheable: !i };if (i = i || {}, V.isArray(c)) for (o = 0, s = c.length; o < s; ++o) {
        f[l = c[o]] = J([i[l], d[l], h[l]], g, e, p);
      } else for (o = 0, s = (r = Object.keys(c)).length; o < s; ++o) {
        f[l = r[o]] = J([i[l], d[c[l]], d[l], h[l]], g, e, p);
      }return p.cacheable && (n._cachedDataOpts = Object.freeze(f)), f;
    }, removeHoverStyle: function removeHoverStyle(t) {
      V.merge(t._model, t.$previousStyle || {}), delete t.$previousStyle;
    }, setHoverStyle: function setHoverStyle(t) {
      var e = this.chart.data.datasets[t._datasetIndex],
          n = t._index,
          i = t.custom || {},
          a = t._model,
          r = V.getHoverColor;t.$previousStyle = { backgroundColor: a.backgroundColor, borderColor: a.borderColor, borderWidth: a.borderWidth }, a.backgroundColor = J([i.hoverBackgroundColor, e.hoverBackgroundColor, r(a.backgroundColor)], void 0, n), a.borderColor = J([i.hoverBorderColor, e.hoverBorderColor, r(a.borderColor)], void 0, n), a.borderWidth = J([i.hoverBorderWidth, e.hoverBorderWidth, a.borderWidth], void 0, n);
    }, _removeDatasetHoverStyle: function _removeDatasetHoverStyle() {
      var t = this.getMeta().dataset;t && this.removeHoverStyle(t);
    }, _setDatasetHoverStyle: function _setDatasetHoverStyle() {
      var t,
          e,
          n,
          i,
          a,
          r,
          o = this.getMeta().dataset,
          s = {};if (o) {
        for (r = o._model, a = this._resolveDatasetElementOptions(o, !0), t = 0, e = (i = Object.keys(a)).length; t < e; ++t) {
          s[n = i[t]] = r[n], r[n] = a[n];
        }o.$previousStyle = s;
      }
    }, resyncElements: function resyncElements() {
      var t = this.getMeta(),
          e = this.getDataset().data,
          n = t.data.length,
          i = e.length;i < n ? t.data.splice(i, n - i) : i > n && this.insertElements(n, i - n);
    }, insertElements: function insertElements(t, e) {
      for (var n = 0; n < e; ++n) {
        this.addElementAndReset(t + n);
      }
    }, onDataPush: function onDataPush() {
      var t = arguments.length;this.insertElements(this.getDataset().data.length - t, t);
    }, onDataPop: function onDataPop() {
      this.getMeta().data.pop();
    }, onDataShift: function onDataShift() {
      this.getMeta().data.shift();
    }, onDataSplice: function onDataSplice(t, e) {
      this.getMeta().data.splice(t, e), this.insertElements(t, arguments.length - 2);
    }, onDataUnshift: function onDataUnshift() {
      this.insertElements(0, arguments.length);
    } }), et.extend = V.inherits;var nt = et,
      it = 2 * Math.PI;function at(t, e) {
    var n = e.startAngle,
        i = e.endAngle,
        a = e.pixelMargin,
        r = a / e.outerRadius,
        o = e.x,
        s = e.y;t.beginPath(), t.arc(o, s, e.outerRadius, n - r, i + r), e.innerRadius > a ? (r = a / e.innerRadius, t.arc(o, s, e.innerRadius - a, i + r, n - r, !0)) : t.arc(o, s, a, i + Math.PI / 2, n - Math.PI / 2), t.closePath(), t.clip();
  }function rt(t, e, n) {
    var i = "inner" === e.borderAlign;i ? (t.lineWidth = 2 * e.borderWidth, t.lineJoin = "round") : (t.lineWidth = e.borderWidth, t.lineJoin = "bevel"), n.fullCircles && function (t, e, n, i) {
      var a,
          r = n.endAngle;for (i && (n.endAngle = n.startAngle + it, at(t, n), n.endAngle = r, n.endAngle === n.startAngle && n.fullCircles && (n.endAngle += it, n.fullCircles--)), t.beginPath(), t.arc(n.x, n.y, n.innerRadius, n.startAngle + it, n.startAngle, !0), a = 0; a < n.fullCircles; ++a) {
        t.stroke();
      }for (t.beginPath(), t.arc(n.x, n.y, e.outerRadius, n.startAngle, n.startAngle + it), a = 0; a < n.fullCircles; ++a) {
        t.stroke();
      }
    }(t, e, n, i), i && at(t, n), t.beginPath(), t.arc(n.x, n.y, e.outerRadius, n.startAngle, n.endAngle), t.arc(n.x, n.y, n.innerRadius, n.endAngle, n.startAngle, !0), t.closePath(), t.stroke();
  }z._set("global", { elements: { arc: { backgroundColor: z.global.defaultColor, borderColor: "#fff", borderWidth: 2, borderAlign: "center" } } });var ot = X.extend({ _type: "arc", inLabelRange: function inLabelRange(t) {
      var e = this._view;return !!e && Math.pow(t - e.x, 2) < Math.pow(e.radius + e.hoverRadius, 2);
    }, inRange: function inRange(t, e) {
      var n = this._view;if (n) {
        for (var i = V.getAngleFromPoint(n, { x: t, y: e }), a = i.angle, r = i.distance, o = n.startAngle, s = n.endAngle; s < o;) {
          s += it;
        }for (; a > s;) {
          a -= it;
        }for (; a < o;) {
          a += it;
        }var l = a >= o && a <= s,
            u = r >= n.innerRadius && r <= n.outerRadius;return l && u;
      }return !1;
    }, getCenterPoint: function getCenterPoint() {
      var t = this._view,
          e = (t.startAngle + t.endAngle) / 2,
          n = (t.innerRadius + t.outerRadius) / 2;return { x: t.x + Math.cos(e) * n, y: t.y + Math.sin(e) * n };
    }, getArea: function getArea() {
      var t = this._view;return Math.PI * ((t.endAngle - t.startAngle) / (2 * Math.PI)) * (Math.pow(t.outerRadius, 2) - Math.pow(t.innerRadius, 2));
    }, tooltipPosition: function tooltipPosition() {
      var t = this._view,
          e = t.startAngle + (t.endAngle - t.startAngle) / 2,
          n = (t.outerRadius - t.innerRadius) / 2 + t.innerRadius;return { x: t.x + Math.cos(e) * n, y: t.y + Math.sin(e) * n };
    }, draw: function draw() {
      var t,
          e = this._chart.ctx,
          n = this._view,
          i = "inner" === n.borderAlign ? .33 : 0,
          a = { x: n.x, y: n.y, innerRadius: n.innerRadius, outerRadius: Math.max(n.outerRadius - i, 0), pixelMargin: i, startAngle: n.startAngle, endAngle: n.endAngle, fullCircles: Math.floor(n.circumference / it) };if (e.save(), e.fillStyle = n.backgroundColor, e.strokeStyle = n.borderColor, a.fullCircles) {
        for (a.endAngle = a.startAngle + it, e.beginPath(), e.arc(a.x, a.y, a.outerRadius, a.startAngle, a.endAngle), e.arc(a.x, a.y, a.innerRadius, a.endAngle, a.startAngle, !0), e.closePath(), t = 0; t < a.fullCircles; ++t) {
          e.fill();
        }a.endAngle = a.startAngle + n.circumference % it;
      }e.beginPath(), e.arc(a.x, a.y, a.outerRadius, a.startAngle, a.endAngle), e.arc(a.x, a.y, a.innerRadius, a.endAngle, a.startAngle, !0), e.closePath(), e.fill(), n.borderWidth && rt(e, n, a), e.restore();
    } }),
      st = V.valueOrDefault,
      lt = z.global.defaultColor;z._set("global", { elements: { line: { tension: .4, backgroundColor: lt, borderWidth: 3, borderColor: lt, borderCapStyle: "butt", borderDash: [], borderDashOffset: 0, borderJoinStyle: "miter", capBezierPoints: !0, fill: !0 } } });var ut = X.extend({ _type: "line", draw: function draw() {
      var t,
          e,
          n,
          i = this,
          a = i._view,
          r = i._chart.ctx,
          o = a.spanGaps,
          s = i._children.slice(),
          l = z.global,
          u = l.elements.line,
          d = -1,
          h = i._loop;if (s.length) {
        if (i._loop) {
          for (t = 0; t < s.length; ++t) {
            if (e = V.previousItem(s, t), !s[t]._view.skip && e._view.skip) {
              s = s.slice(t).concat(s.slice(0, t)), h = o;break;
            }
          }h && s.push(s[0]);
        }for (r.save(), r.lineCap = a.borderCapStyle || u.borderCapStyle, r.setLineDash && r.setLineDash(a.borderDash || u.borderDash), r.lineDashOffset = st(a.borderDashOffset, u.borderDashOffset), r.lineJoin = a.borderJoinStyle || u.borderJoinStyle, r.lineWidth = st(a.borderWidth, u.borderWidth), r.strokeStyle = a.borderColor || l.defaultColor, r.beginPath(), (n = s[0]._view).skip || (r.moveTo(n.x, n.y), d = 0), t = 1; t < s.length; ++t) {
          n = s[t]._view, e = -1 === d ? V.previousItem(s, t) : s[d], n.skip || (d !== t - 1 && !o || -1 === d ? r.moveTo(n.x, n.y) : V.canvas.lineTo(r, e._view, n), d = t);
        }h && r.closePath(), r.stroke(), r.restore();
      }
    } }),
      dt = V.valueOrDefault,
      ht = z.global.defaultColor;function ct(t) {
    var e = this._view;return !!e && Math.abs(t - e.x) < e.radius + e.hitRadius;
  }z._set("global", { elements: { point: { radius: 3, pointStyle: "circle", backgroundColor: ht, borderColor: ht, borderWidth: 1, hitRadius: 1, hoverRadius: 4, hoverBorderWidth: 1 } } });var ft = X.extend({ _type: "point", inRange: function inRange(t, e) {
      var n = this._view;return !!n && Math.pow(t - n.x, 2) + Math.pow(e - n.y, 2) < Math.pow(n.hitRadius + n.radius, 2);
    }, inLabelRange: ct, inXRange: ct, inYRange: function inYRange(t) {
      var e = this._view;return !!e && Math.abs(t - e.y) < e.radius + e.hitRadius;
    }, getCenterPoint: function getCenterPoint() {
      var t = this._view;return { x: t.x, y: t.y };
    }, getArea: function getArea() {
      return Math.PI * Math.pow(this._view.radius, 2);
    }, tooltipPosition: function tooltipPosition() {
      var t = this._view;return { x: t.x, y: t.y, padding: t.radius + t.borderWidth };
    }, draw: function draw(t) {
      var e = this._view,
          n = this._chart.ctx,
          i = e.pointStyle,
          a = e.rotation,
          r = e.radius,
          o = e.x,
          s = e.y,
          l = z.global,
          u = l.defaultColor;e.skip || (void 0 === t || V.canvas._isPointInArea(e, t)) && (n.strokeStyle = e.borderColor || u, n.lineWidth = dt(e.borderWidth, l.elements.point.borderWidth), n.fillStyle = e.backgroundColor || u, V.canvas.drawPoint(n, i, r, o, s, a));
    } }),
      gt = z.global.defaultColor;function pt(t) {
    return t && void 0 !== t.width;
  }function mt(t) {
    var e, n, i, a, r;return pt(t) ? (r = t.width / 2, e = t.x - r, n = t.x + r, i = Math.min(t.y, t.base), a = Math.max(t.y, t.base)) : (r = t.height / 2, e = Math.min(t.x, t.base), n = Math.max(t.x, t.base), i = t.y - r, a = t.y + r), { left: e, top: i, right: n, bottom: a };
  }function vt(t, e, n) {
    return t === e ? n : t === n ? e : t;
  }function bt(t, e, n) {
    var i,
        a,
        r,
        o,
        s = t.borderWidth,
        l = function (t) {
      var e = t.borderSkipped,
          n = {};return e ? (t.horizontal ? t.base > t.x && (e = vt(e, "left", "right")) : t.base < t.y && (e = vt(e, "bottom", "top")), n[e] = !0, n) : n;
    }(t);return V.isObject(s) ? (i = +s.top || 0, a = +s.right || 0, r = +s.bottom || 0, o = +s.left || 0) : i = a = r = o = +s || 0, { t: l.top || i < 0 ? 0 : i > n ? n : i, r: l.right || a < 0 ? 0 : a > e ? e : a, b: l.bottom || r < 0 ? 0 : r > n ? n : r, l: l.left || o < 0 ? 0 : o > e ? e : o };
  }function xt(t, e, n) {
    var i = null === e,
        a = null === n,
        r = !(!t || i && a) && mt(t);return r && (i || e >= r.left && e <= r.right) && (a || n >= r.top && n <= r.bottom);
  }z._set("global", { elements: { rectangle: { backgroundColor: gt, borderColor: gt, borderSkipped: "bottom", borderWidth: 0 } } });var yt = X.extend({ _type: "rectangle", draw: function draw() {
      var t = this._chart.ctx,
          e = this._view,
          n = function (t) {
        var e = mt(t),
            n = e.right - e.left,
            i = e.bottom - e.top,
            a = bt(t, n / 2, i / 2);return { outer: { x: e.left, y: e.top, w: n, h: i }, inner: { x: e.left + a.l, y: e.top + a.t, w: n - a.l - a.r, h: i - a.t - a.b } };
      }(e),
          i = n.outer,
          a = n.inner;t.fillStyle = e.backgroundColor, t.fillRect(i.x, i.y, i.w, i.h), i.w === a.w && i.h === a.h || (t.save(), t.beginPath(), t.rect(i.x, i.y, i.w, i.h), t.clip(), t.fillStyle = e.borderColor, t.rect(a.x, a.y, a.w, a.h), t.fill("evenodd"), t.restore());
    }, height: function height() {
      var t = this._view;return t.base - t.y;
    }, inRange: function inRange(t, e) {
      return xt(this._view, t, e);
    }, inLabelRange: function inLabelRange(t, e) {
      var n = this._view;return pt(n) ? xt(n, t, null) : xt(n, null, e);
    }, inXRange: function inXRange(t) {
      return xt(this._view, t, null);
    }, inYRange: function inYRange(t) {
      return xt(this._view, null, t);
    }, getCenterPoint: function getCenterPoint() {
      var t,
          e,
          n = this._view;return pt(n) ? (t = n.x, e = (n.y + n.base) / 2) : (t = (n.x + n.base) / 2, e = n.y), { x: t, y: e };
    }, getArea: function getArea() {
      var t = this._view;return pt(t) ? t.width * Math.abs(t.y - t.base) : t.height * Math.abs(t.x - t.base);
    }, tooltipPosition: function tooltipPosition() {
      var t = this._view;return { x: t.x, y: t.y };
    } }),
      _t = {},
      kt = ot,
      wt = ut,
      Mt = ft,
      St = yt;_t.Arc = kt, _t.Line = wt, _t.Point = Mt, _t.Rectangle = St;var Ct = V._deprecated,
      Pt = V.valueOrDefault;function At(t, e, n) {
    var i,
        a,
        r = n.barThickness,
        o = e.stackCount,
        s = e.pixels[t],
        l = V.isNullOrUndef(r) ? function (t, e) {
      var n,
          i,
          a,
          r,
          o = t._length;for (a = 1, r = e.length; a < r; ++a) {
        o = Math.min(o, Math.abs(e[a] - e[a - 1]));
      }for (a = 0, r = t.getTicks().length; a < r; ++a) {
        i = t.getPixelForTick(a), o = a > 0 ? Math.min(o, Math.abs(i - n)) : o, n = i;
      }return o;
    }(e.scale, e.pixels) : -1;return V.isNullOrUndef(r) ? (i = l * n.categoryPercentage, a = n.barPercentage) : (i = r * o, a = 1), { chunk: i / o, ratio: a, start: s - i / 2 };
  }z._set("bar", { hover: { mode: "label" }, scales: { xAxes: [{ type: "category", offset: !0, gridLines: { offsetGridLines: !0 } }], yAxes: [{ type: "linear" }] } }), z._set("global", { datasets: { bar: { categoryPercentage: .8, barPercentage: .9 } } });var Dt = nt.extend({ dataElementType: _t.Rectangle, _dataElementOptions: ["backgroundColor", "borderColor", "borderSkipped", "borderWidth", "barPercentage", "barThickness", "categoryPercentage", "maxBarThickness", "minBarLength"], initialize: function initialize() {
      var t,
          e,
          n = this;nt.prototype.initialize.apply(n, arguments), (t = n.getMeta()).stack = n.getDataset().stack, t.bar = !0, e = n._getIndexScale().options, Ct("bar chart", e.barPercentage, "scales.[x/y]Axes.barPercentage", "dataset.barPercentage"), Ct("bar chart", e.barThickness, "scales.[x/y]Axes.barThickness", "dataset.barThickness"), Ct("bar chart", e.categoryPercentage, "scales.[x/y]Axes.categoryPercentage", "dataset.categoryPercentage"), Ct("bar chart", n._getValueScale().options.minBarLength, "scales.[x/y]Axes.minBarLength", "dataset.minBarLength"), Ct("bar chart", e.maxBarThickness, "scales.[x/y]Axes.maxBarThickness", "dataset.maxBarThickness");
    }, update: function update(t) {
      var e,
          n,
          i = this.getMeta().data;for (this._ruler = this.getRuler(), e = 0, n = i.length; e < n; ++e) {
        this.updateElement(i[e], e, t);
      }
    }, updateElement: function updateElement(t, e, n) {
      var i = this,
          a = i.getMeta(),
          r = i.getDataset(),
          o = i._resolveDataElementOptions(t, e);t._xScale = i.getScaleForId(a.xAxisID), t._yScale = i.getScaleForId(a.yAxisID), t._datasetIndex = i.index, t._index = e, t._model = { backgroundColor: o.backgroundColor, borderColor: o.borderColor, borderSkipped: o.borderSkipped, borderWidth: o.borderWidth, datasetLabel: r.label, label: i.chart.data.labels[e] }, V.isArray(r.data[e]) && (t._model.borderSkipped = null), i._updateElementGeometry(t, e, n, o), t.pivot();
    }, _updateElementGeometry: function _updateElementGeometry(t, e, n, i) {
      var a = this,
          r = t._model,
          o = a._getValueScale(),
          s = o.getBasePixel(),
          l = o.isHorizontal(),
          u = a._ruler || a.getRuler(),
          d = a.calculateBarValuePixels(a.index, e, i),
          h = a.calculateBarIndexPixels(a.index, e, u, i);r.horizontal = l, r.base = n ? s : d.base, r.x = l ? n ? s : d.head : h.center, r.y = l ? h.center : n ? s : d.head, r.height = l ? h.size : void 0, r.width = l ? void 0 : h.size;
    }, _getStacks: function _getStacks(t) {
      var e,
          n,
          i = this._getIndexScale(),
          a = i._getMatchingVisibleMetas(this._type),
          r = i.options.stacked,
          o = a.length,
          s = [];for (e = 0; e < o && (n = a[e], (!1 === r || -1 === s.indexOf(n.stack) || void 0 === r && void 0 === n.stack) && s.push(n.stack), n.index !== t); ++e) {}return s;
    }, getStackCount: function getStackCount() {
      return this._getStacks().length;
    }, getStackIndex: function getStackIndex(t, e) {
      var n = this._getStacks(t),
          i = void 0 !== e ? n.indexOf(e) : -1;return -1 === i ? n.length - 1 : i;
    }, getRuler: function getRuler() {
      var t,
          e,
          n = this._getIndexScale(),
          i = [];for (t = 0, e = this.getMeta().data.length; t < e; ++t) {
        i.push(n.getPixelForValue(null, t, this.index));
      }return { pixels: i, start: n._startPixel, end: n._endPixel, stackCount: this.getStackCount(), scale: n };
    }, calculateBarValuePixels: function calculateBarValuePixels(t, e, n) {
      var i,
          a,
          r,
          o,
          s,
          l,
          u,
          d = this.chart,
          h = this._getValueScale(),
          c = h.isHorizontal(),
          f = d.data.datasets,
          g = h._getMatchingVisibleMetas(this._type),
          p = h._parseValue(f[t].data[e]),
          m = n.minBarLength,
          v = h.options.stacked,
          b = this.getMeta().stack,
          x = void 0 === p.start ? 0 : p.max >= 0 && p.min >= 0 ? p.min : p.max,
          y = void 0 === p.start ? p.end : p.max >= 0 && p.min >= 0 ? p.max - p.min : p.min - p.max,
          _ = g.length;if (v || void 0 === v && void 0 !== b) for (i = 0; i < _ && (a = g[i]).index !== t; ++i) {
        a.stack === b && (r = void 0 === (u = h._parseValue(f[a.index].data[e])).start ? u.end : u.min >= 0 && u.max >= 0 ? u.max : u.min, (p.min < 0 && r < 0 || p.max >= 0 && r > 0) && (x += r));
      }return o = h.getPixelForValue(x), l = (s = h.getPixelForValue(x + y)) - o, void 0 !== m && Math.abs(l) < m && (l = m, s = y >= 0 && !c || y < 0 && c ? o - m : o + m), { size: l, base: o, head: s, center: s + l / 2 };
    }, calculateBarIndexPixels: function calculateBarIndexPixels(t, e, n, i) {
      var a = "flex" === i.barThickness ? function (t, e, n) {
        var i,
            a = e.pixels,
            r = a[t],
            o = t > 0 ? a[t - 1] : null,
            s = t < a.length - 1 ? a[t + 1] : null,
            l = n.categoryPercentage;return null === o && (o = r - (null === s ? e.end - e.start : s - r)), null === s && (s = r + r - o), i = r - (r - Math.min(o, s)) / 2 * l, { chunk: Math.abs(s - o) / 2 * l / e.stackCount, ratio: n.barPercentage, start: i };
      }(e, n, i) : At(e, n, i),
          r = this.getStackIndex(t, this.getMeta().stack),
          o = a.start + a.chunk * r + a.chunk / 2,
          s = Math.min(Pt(i.maxBarThickness, 1 / 0), a.chunk * a.ratio);return { base: o - s / 2, head: o + s / 2, center: o, size: s };
    }, draw: function draw() {
      var t = this.chart,
          e = this._getValueScale(),
          n = this.getMeta().data,
          i = this.getDataset(),
          a = n.length,
          r = 0;for (V.canvas.clipArea(t.ctx, t.chartArea); r < a; ++r) {
        var o = e._parseValue(i.data[r]);isNaN(o.min) || isNaN(o.max) || n[r].draw();
      }V.canvas.unclipArea(t.ctx);
    }, _resolveDataElementOptions: function _resolveDataElementOptions() {
      var t = this,
          e = V.extend({}, nt.prototype._resolveDataElementOptions.apply(t, arguments)),
          n = t._getIndexScale().options,
          i = t._getValueScale().options;return e.barPercentage = Pt(n.barPercentage, e.barPercentage), e.barThickness = Pt(n.barThickness, e.barThickness), e.categoryPercentage = Pt(n.categoryPercentage, e.categoryPercentage), e.maxBarThickness = Pt(n.maxBarThickness, e.maxBarThickness), e.minBarLength = Pt(i.minBarLength, e.minBarLength), e;
    } }),
      Tt = V.valueOrDefault,
      It = V.options.resolve;z._set("bubble", { hover: { mode: "single" }, scales: { xAxes: [{ type: "linear", position: "bottom", id: "x-axis-0" }], yAxes: [{ type: "linear", position: "left", id: "y-axis-0" }] }, tooltips: { callbacks: { title: function title() {
          return "";
        }, label: function label(t, e) {
          var n = e.datasets[t.datasetIndex].label || "",
              i = e.datasets[t.datasetIndex].data[t.index];return n + ": (" + t.xLabel + ", " + t.yLabel + ", " + i.r + ")";
        } } } });var Ft = nt.extend({ dataElementType: _t.Point, _dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth", "hoverRadius", "hitRadius", "pointStyle", "rotation"], update: function update(t) {
      var e = this,
          n = e.getMeta().data;V.each(n, function (n, i) {
        e.updateElement(n, i, t);
      });
    }, updateElement: function updateElement(t, e, n) {
      var i = this,
          a = i.getMeta(),
          r = t.custom || {},
          o = i.getScaleForId(a.xAxisID),
          s = i.getScaleForId(a.yAxisID),
          l = i._resolveDataElementOptions(t, e),
          u = i.getDataset().data[e],
          d = i.index,
          h = n ? o.getPixelForDecimal(.5) : o.getPixelForValue("object" == (typeof u === "undefined" ? "undefined" : _typeof(u)) ? u : NaN, e, d),
          c = n ? s.getBasePixel() : s.getPixelForValue(u, e, d);t._xScale = o, t._yScale = s, t._options = l, t._datasetIndex = d, t._index = e, t._model = { backgroundColor: l.backgroundColor, borderColor: l.borderColor, borderWidth: l.borderWidth, hitRadius: l.hitRadius, pointStyle: l.pointStyle, rotation: l.rotation, radius: n ? 0 : l.radius, skip: r.skip || isNaN(h) || isNaN(c), x: h, y: c }, t.pivot();
    }, setHoverStyle: function setHoverStyle(t) {
      var e = t._model,
          n = t._options,
          i = V.getHoverColor;t.$previousStyle = { backgroundColor: e.backgroundColor, borderColor: e.borderColor, borderWidth: e.borderWidth, radius: e.radius }, e.backgroundColor = Tt(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = Tt(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = Tt(n.hoverBorderWidth, n.borderWidth), e.radius = n.radius + n.hoverRadius;
    }, _resolveDataElementOptions: function _resolveDataElementOptions(t, e) {
      var n = this,
          i = n.chart,
          a = n.getDataset(),
          r = t.custom || {},
          o = a.data[e] || {},
          s = nt.prototype._resolveDataElementOptions.apply(n, arguments),
          l = { chart: i, dataIndex: e, dataset: a, datasetIndex: n.index };return n._cachedDataOpts === s && (s = V.extend({}, s)), s.radius = It([r.radius, o.r, n._config.radius, i.options.elements.point.radius], l, e), s;
    } }),
      Lt = V.valueOrDefault,
      Ot = Math.PI,
      Rt = 2 * Ot,
      zt = Ot / 2;z._set("doughnut", { animation: { animateRotate: !0, animateScale: !1 }, hover: { mode: "single" }, legendCallback: function legendCallback(t) {
      var e,
          n,
          i,
          a = document.createElement("ul"),
          r = t.data,
          o = r.datasets,
          s = r.labels;if (a.setAttribute("class", t.id + "-legend"), o.length) for (e = 0, n = o[0].data.length; e < n; ++e) {
        (i = a.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor = o[0].backgroundColor[e], s[e] && i.appendChild(document.createTextNode(s[e]));
      }return a.outerHTML;
    }, legend: { labels: { generateLabels: function generateLabels(t) {
          var e = t.data;return e.labels.length && e.datasets.length ? e.labels.map(function (n, i) {
            var a = t.getDatasetMeta(0),
                r = a.controller.getStyle(i);return { text: n, fillStyle: r.backgroundColor, strokeStyle: r.borderColor, lineWidth: r.borderWidth, hidden: isNaN(e.datasets[0].data[i]) || a.data[i].hidden, index: i };
          }) : [];
        } }, onClick: function onClick(t, e) {
        var n,
            i,
            a,
            r = e.index,
            o = this.chart;for (n = 0, i = (o.data.datasets || []).length; n < i; ++n) {
          (a = o.getDatasetMeta(n)).data[r] && (a.data[r].hidden = !a.data[r].hidden);
        }o.update();
      } }, cutoutPercentage: 50, rotation: -zt, circumference: Rt, tooltips: { callbacks: { title: function title() {
          return "";
        }, label: function label(t, e) {
          var n = e.labels[t.index],
              i = ": " + e.datasets[t.datasetIndex].data[t.index];return V.isArray(n) ? (n = n.slice())[0] += i : n += i, n;
        } } } });var Nt = nt.extend({ dataElementType: _t.Arc, linkScales: V.noop, _dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "borderAlign", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth"], getRingIndex: function getRingIndex(t) {
      for (var e = 0, n = 0; n < t; ++n) {
        this.chart.isDatasetVisible(n) && ++e;
      }return e;
    }, update: function update(t) {
      var e,
          n,
          i,
          a,
          r = this,
          o = r.chart,
          s = o.chartArea,
          l = o.options,
          u = 1,
          d = 1,
          h = 0,
          c = 0,
          f = r.getMeta(),
          g = f.data,
          p = l.cutoutPercentage / 100 || 0,
          m = l.circumference,
          v = r._getRingWeight(r.index);if (m < Rt) {
        var b = l.rotation % Rt,
            x = (b += b >= Ot ? -Rt : b < -Ot ? Rt : 0) + m,
            y = Math.cos(b),
            _ = Math.sin(b),
            k = Math.cos(x),
            w = Math.sin(x),
            M = b <= 0 && x >= 0 || x >= Rt,
            S = b <= zt && x >= zt || x >= Rt + zt,
            C = b <= -zt && x >= -zt || x >= Ot + zt,
            P = b === -Ot || x >= Ot ? -1 : Math.min(y, y * p, k, k * p),
            A = C ? -1 : Math.min(_, _ * p, w, w * p),
            D = M ? 1 : Math.max(y, y * p, k, k * p),
            T = S ? 1 : Math.max(_, _ * p, w, w * p);u = (D - P) / 2, d = (T - A) / 2, h = -(D + P) / 2, c = -(T + A) / 2;
      }for (i = 0, a = g.length; i < a; ++i) {
        g[i]._options = r._resolveDataElementOptions(g[i], i);
      }for (o.borderWidth = r.getMaxBorderWidth(), e = (s.right - s.left - o.borderWidth) / u, n = (s.bottom - s.top - o.borderWidth) / d, o.outerRadius = Math.max(Math.min(e, n) / 2, 0), o.innerRadius = Math.max(o.outerRadius * p, 0), o.radiusLength = (o.outerRadius - o.innerRadius) / (r._getVisibleDatasetWeightTotal() || 1), o.offsetX = h * o.outerRadius, o.offsetY = c * o.outerRadius, f.total = r.calculateTotal(), r.outerRadius = o.outerRadius - o.radiusLength * r._getRingWeightOffset(r.index), r.innerRadius = Math.max(r.outerRadius - o.radiusLength * v, 0), i = 0, a = g.length; i < a; ++i) {
        r.updateElement(g[i], i, t);
      }
    }, updateElement: function updateElement(t, e, n) {
      var i = this,
          a = i.chart,
          r = a.chartArea,
          o = a.options,
          s = o.animation,
          l = (r.left + r.right) / 2,
          u = (r.top + r.bottom) / 2,
          d = o.rotation,
          h = o.rotation,
          c = i.getDataset(),
          f = n && s.animateRotate ? 0 : t.hidden ? 0 : i.calculateCircumference(c.data[e]) * (o.circumference / Rt),
          g = n && s.animateScale ? 0 : i.innerRadius,
          p = n && s.animateScale ? 0 : i.outerRadius,
          m = t._options || {};V.extend(t, { _datasetIndex: i.index, _index: e, _model: { backgroundColor: m.backgroundColor, borderColor: m.borderColor, borderWidth: m.borderWidth, borderAlign: m.borderAlign, x: l + a.offsetX, y: u + a.offsetY, startAngle: d, endAngle: h, circumference: f, outerRadius: p, innerRadius: g, label: V.valueAtIndexOrDefault(c.label, e, a.data.labels[e]) } });var v = t._model;n && s.animateRotate || (v.startAngle = 0 === e ? o.rotation : i.getMeta().data[e - 1]._model.endAngle, v.endAngle = v.startAngle + v.circumference), t.pivot();
    }, calculateTotal: function calculateTotal() {
      var t,
          e = this.getDataset(),
          n = this.getMeta(),
          i = 0;return V.each(n.data, function (n, a) {
        t = e.data[a], isNaN(t) || n.hidden || (i += Math.abs(t));
      }), i;
    }, calculateCircumference: function calculateCircumference(t) {
      var e = this.getMeta().total;return e > 0 && !isNaN(t) ? Rt * (Math.abs(t) / e) : 0;
    }, getMaxBorderWidth: function getMaxBorderWidth(t) {
      var e,
          n,
          i,
          a,
          r,
          o,
          s,
          l,
          u = 0,
          d = this.chart;if (!t) for (e = 0, n = d.data.datasets.length; e < n; ++e) {
        if (d.isDatasetVisible(e)) {
          t = (i = d.getDatasetMeta(e)).data, e !== this.index && (r = i.controller);break;
        }
      }if (!t) return 0;for (e = 0, n = t.length; e < n; ++e) {
        a = t[e], r ? (r._configure(), o = r._resolveDataElementOptions(a, e)) : o = a._options, "inner" !== o.borderAlign && (s = o.borderWidth, u = (l = o.hoverBorderWidth) > (u = s > u ? s : u) ? l : u);
      }return u;
    }, setHoverStyle: function setHoverStyle(t) {
      var e = t._model,
          n = t._options,
          i = V.getHoverColor;t.$previousStyle = { backgroundColor: e.backgroundColor, borderColor: e.borderColor, borderWidth: e.borderWidth }, e.backgroundColor = Lt(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = Lt(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = Lt(n.hoverBorderWidth, n.borderWidth);
    }, _getRingWeightOffset: function _getRingWeightOffset(t) {
      for (var e = 0, n = 0; n < t; ++n) {
        this.chart.isDatasetVisible(n) && (e += this._getRingWeight(n));
      }return e;
    }, _getRingWeight: function _getRingWeight(t) {
      return Math.max(Lt(this.chart.data.datasets[t].weight, 1), 0);
    }, _getVisibleDatasetWeightTotal: function _getVisibleDatasetWeightTotal() {
      return this._getRingWeightOffset(this.chart.data.datasets.length);
    } });z._set("horizontalBar", { hover: { mode: "index", axis: "y" }, scales: { xAxes: [{ type: "linear", position: "bottom" }], yAxes: [{ type: "category", position: "left", offset: !0, gridLines: { offsetGridLines: !0 } }] }, elements: { rectangle: { borderSkipped: "left" } }, tooltips: { mode: "index", axis: "y" } }), z._set("global", { datasets: { horizontalBar: { categoryPercentage: .8, barPercentage: .9 } } });var Bt = Dt.extend({ _getValueScaleId: function _getValueScaleId() {
      return this.getMeta().xAxisID;
    }, _getIndexScaleId: function _getIndexScaleId() {
      return this.getMeta().yAxisID;
    } }),
      Et = V.valueOrDefault,
      Wt = V.options.resolve,
      Vt = V.canvas._isPointInArea;function Ht(t, e) {
    var n = t && t.options.ticks || {},
        i = n.reverse,
        a = void 0 === n.min ? e : 0,
        r = void 0 === n.max ? e : 0;return { start: i ? r : a, end: i ? a : r };
  }function jt(t, e, n) {
    var i = n / 2,
        a = Ht(t, i),
        r = Ht(e, i);return { top: r.end, right: a.end, bottom: r.start, left: a.start };
  }function qt(t) {
    var e, n, i, a;return V.isObject(t) ? (e = t.top, n = t.right, i = t.bottom, a = t.left) : e = n = i = a = t, { top: e, right: n, bottom: i, left: a };
  }z._set("line", { showLines: !0, spanGaps: !1, hover: { mode: "label" }, scales: { xAxes: [{ type: "category", id: "x-axis-0" }], yAxes: [{ type: "linear", id: "y-axis-0" }] } });var Ut = nt.extend({ datasetElementType: _t.Line, dataElementType: _t.Point, _datasetElementOptions: ["backgroundColor", "borderCapStyle", "borderColor", "borderDash", "borderDashOffset", "borderJoinStyle", "borderWidth", "cubicInterpolationMode", "fill"], _dataElementOptions: { backgroundColor: "pointBackgroundColor", borderColor: "pointBorderColor", borderWidth: "pointBorderWidth", hitRadius: "pointHitRadius", hoverBackgroundColor: "pointHoverBackgroundColor", hoverBorderColor: "pointHoverBorderColor", hoverBorderWidth: "pointHoverBorderWidth", hoverRadius: "pointHoverRadius", pointStyle: "pointStyle", radius: "pointRadius", rotation: "pointRotation" }, update: function update(t) {
      var e,
          n,
          i = this,
          a = i.getMeta(),
          r = a.dataset,
          o = a.data || [],
          s = i.chart.options,
          l = i._config,
          u = i._showLine = Et(l.showLine, s.showLines);for (i._xScale = i.getScaleForId(a.xAxisID), i._yScale = i.getScaleForId(a.yAxisID), u && (void 0 !== l.tension && void 0 === l.lineTension && (l.lineTension = l.tension), r._scale = i._yScale, r._datasetIndex = i.index, r._children = o, r._model = i._resolveDatasetElementOptions(r), r.pivot()), e = 0, n = o.length; e < n; ++e) {
        i.updateElement(o[e], e, t);
      }for (u && 0 !== r._model.tension && i.updateBezierControlPoints(), e = 0, n = o.length; e < n; ++e) {
        o[e].pivot();
      }
    }, updateElement: function updateElement(t, e, n) {
      var i,
          a,
          r = this,
          o = r.getMeta(),
          s = t.custom || {},
          l = r.getDataset(),
          u = r.index,
          d = l.data[e],
          h = r._xScale,
          c = r._yScale,
          f = o.dataset._model,
          g = r._resolveDataElementOptions(t, e);i = h.getPixelForValue("object" == (typeof d === "undefined" ? "undefined" : _typeof(d)) ? d : NaN, e, u), a = n ? c.getBasePixel() : r.calculatePointY(d, e, u), t._xScale = h, t._yScale = c, t._options = g, t._datasetIndex = u, t._index = e, t._model = { x: i, y: a, skip: s.skip || isNaN(i) || isNaN(a), radius: g.radius, pointStyle: g.pointStyle, rotation: g.rotation, backgroundColor: g.backgroundColor, borderColor: g.borderColor, borderWidth: g.borderWidth, tension: Et(s.tension, f ? f.tension : 0), steppedLine: !!f && f.steppedLine, hitRadius: g.hitRadius };
    }, _resolveDatasetElementOptions: function _resolveDatasetElementOptions(t) {
      var e = this,
          n = e._config,
          i = t.custom || {},
          a = e.chart.options,
          r = a.elements.line,
          o = nt.prototype._resolveDatasetElementOptions.apply(e, arguments);return o.spanGaps = Et(n.spanGaps, a.spanGaps), o.tension = Et(n.lineTension, r.tension), o.steppedLine = Wt([i.steppedLine, n.steppedLine, r.stepped]), o.clip = qt(Et(n.clip, jt(e._xScale, e._yScale, o.borderWidth))), o;
    }, calculatePointY: function calculatePointY(t, e, n) {
      var i,
          a,
          r,
          o,
          s,
          l,
          u,
          d = this.chart,
          h = this._yScale,
          c = 0,
          f = 0;if (h.options.stacked) {
        for (s = +h.getRightValue(t), u = (l = d._getSortedVisibleDatasetMetas()).length, i = 0; i < u && (r = l[i]).index !== n; ++i) {
          a = d.data.datasets[r.index], "line" === r.type && r.yAxisID === h.id && ((o = +h.getRightValue(a.data[e])) < 0 ? f += o || 0 : c += o || 0);
        }return s < 0 ? h.getPixelForValue(f + s) : h.getPixelForValue(c + s);
      }return h.getPixelForValue(t);
    }, updateBezierControlPoints: function updateBezierControlPoints() {
      var t,
          e,
          n,
          i,
          a = this.chart,
          r = this.getMeta(),
          o = r.dataset._model,
          s = a.chartArea,
          l = r.data || [];function u(t, e, n) {
        return Math.max(Math.min(t, n), e);
      }if (o.spanGaps && (l = l.filter(function (t) {
        return !t._model.skip;
      })), "monotone" === o.cubicInterpolationMode) V.splineCurveMonotone(l);else for (t = 0, e = l.length; t < e; ++t) {
        n = l[t]._model, i = V.splineCurve(V.previousItem(l, t)._model, n, V.nextItem(l, t)._model, o.tension), n.controlPointPreviousX = i.previous.x, n.controlPointPreviousY = i.previous.y, n.controlPointNextX = i.next.x, n.controlPointNextY = i.next.y;
      }if (a.options.elements.line.capBezierPoints) for (t = 0, e = l.length; t < e; ++t) {
        n = l[t]._model, Vt(n, s) && (t > 0 && Vt(l[t - 1]._model, s) && (n.controlPointPreviousX = u(n.controlPointPreviousX, s.left, s.right), n.controlPointPreviousY = u(n.controlPointPreviousY, s.top, s.bottom)), t < l.length - 1 && Vt(l[t + 1]._model, s) && (n.controlPointNextX = u(n.controlPointNextX, s.left, s.right), n.controlPointNextY = u(n.controlPointNextY, s.top, s.bottom)));
      }
    }, draw: function draw() {
      var t,
          e = this.chart,
          n = this.getMeta(),
          i = n.data || [],
          a = e.chartArea,
          r = e.canvas,
          o = 0,
          s = i.length;for (this._showLine && (t = n.dataset._model.clip, V.canvas.clipArea(e.ctx, { left: !1 === t.left ? 0 : a.left - t.left, right: !1 === t.right ? r.width : a.right + t.right, top: !1 === t.top ? 0 : a.top - t.top, bottom: !1 === t.bottom ? r.height : a.bottom + t.bottom }), n.dataset.draw(), V.canvas.unclipArea(e.ctx)); o < s; ++o) {
        i[o].draw(a);
      }
    }, setHoverStyle: function setHoverStyle(t) {
      var e = t._model,
          n = t._options,
          i = V.getHoverColor;t.$previousStyle = { backgroundColor: e.backgroundColor, borderColor: e.borderColor, borderWidth: e.borderWidth, radius: e.radius }, e.backgroundColor = Et(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = Et(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = Et(n.hoverBorderWidth, n.borderWidth), e.radius = Et(n.hoverRadius, n.radius);
    } }),
      Yt = V.options.resolve;z._set("polarArea", { scale: { type: "radialLinear", angleLines: { display: !1 }, gridLines: { circular: !0 }, pointLabels: { display: !1 }, ticks: { beginAtZero: !0 } }, animation: { animateRotate: !0, animateScale: !0 }, startAngle: -.5 * Math.PI, legendCallback: function legendCallback(t) {
      var e,
          n,
          i,
          a = document.createElement("ul"),
          r = t.data,
          o = r.datasets,
          s = r.labels;if (a.setAttribute("class", t.id + "-legend"), o.length) for (e = 0, n = o[0].data.length; e < n; ++e) {
        (i = a.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor = o[0].backgroundColor[e], s[e] && i.appendChild(document.createTextNode(s[e]));
      }return a.outerHTML;
    }, legend: { labels: { generateLabels: function generateLabels(t) {
          var e = t.data;return e.labels.length && e.datasets.length ? e.labels.map(function (n, i) {
            var a = t.getDatasetMeta(0),
                r = a.controller.getStyle(i);return { text: n, fillStyle: r.backgroundColor, strokeStyle: r.borderColor, lineWidth: r.borderWidth, hidden: isNaN(e.datasets[0].data[i]) || a.data[i].hidden, index: i };
          }) : [];
        } }, onClick: function onClick(t, e) {
        var n,
            i,
            a,
            r = e.index,
            o = this.chart;for (n = 0, i = (o.data.datasets || []).length; n < i; ++n) {
          (a = o.getDatasetMeta(n)).data[r].hidden = !a.data[r].hidden;
        }o.update();
      } }, tooltips: { callbacks: { title: function title() {
          return "";
        }, label: function label(t, e) {
          return e.labels[t.index] + ": " + t.yLabel;
        } } } });var Gt = nt.extend({ dataElementType: _t.Arc, linkScales: V.noop, _dataElementOptions: ["backgroundColor", "borderColor", "borderWidth", "borderAlign", "hoverBackgroundColor", "hoverBorderColor", "hoverBorderWidth"], _getIndexScaleId: function _getIndexScaleId() {
      return this.chart.scale.id;
    }, _getValueScaleId: function _getValueScaleId() {
      return this.chart.scale.id;
    }, update: function update(t) {
      var e,
          n,
          i,
          a = this,
          r = a.getDataset(),
          o = a.getMeta(),
          s = a.chart.options.startAngle || 0,
          l = a._starts = [],
          u = a._angles = [],
          d = o.data;for (a._updateRadius(), o.count = a.countVisibleElements(), e = 0, n = r.data.length; e < n; e++) {
        l[e] = s, i = a._computeAngle(e), u[e] = i, s += i;
      }for (e = 0, n = d.length; e < n; ++e) {
        d[e]._options = a._resolveDataElementOptions(d[e], e), a.updateElement(d[e], e, t);
      }
    }, _updateRadius: function _updateRadius() {
      var t = this,
          e = t.chart,
          n = e.chartArea,
          i = e.options,
          a = Math.min(n.right - n.left, n.bottom - n.top);e.outerRadius = Math.max(a / 2, 0), e.innerRadius = Math.max(i.cutoutPercentage ? e.outerRadius / 100 * i.cutoutPercentage : 1, 0), e.radiusLength = (e.outerRadius - e.innerRadius) / e.getVisibleDatasetCount(), t.outerRadius = e.outerRadius - e.radiusLength * t.index, t.innerRadius = t.outerRadius - e.radiusLength;
    }, updateElement: function updateElement(t, e, n) {
      var i = this,
          a = i.chart,
          r = i.getDataset(),
          o = a.options,
          s = o.animation,
          l = a.scale,
          u = a.data.labels,
          d = l.xCenter,
          h = l.yCenter,
          c = o.startAngle,
          f = t.hidden ? 0 : l.getDistanceFromCenterForValue(r.data[e]),
          g = i._starts[e],
          p = g + (t.hidden ? 0 : i._angles[e]),
          m = s.animateScale ? 0 : l.getDistanceFromCenterForValue(r.data[e]),
          v = t._options || {};V.extend(t, { _datasetIndex: i.index, _index: e, _scale: l, _model: { backgroundColor: v.backgroundColor, borderColor: v.borderColor, borderWidth: v.borderWidth, borderAlign: v.borderAlign, x: d, y: h, innerRadius: 0, outerRadius: n ? m : f, startAngle: n && s.animateRotate ? c : g, endAngle: n && s.animateRotate ? c : p, label: V.valueAtIndexOrDefault(u, e, u[e]) } }), t.pivot();
    }, countVisibleElements: function countVisibleElements() {
      var t = this.getDataset(),
          e = this.getMeta(),
          n = 0;return V.each(e.data, function (e, i) {
        isNaN(t.data[i]) || e.hidden || n++;
      }), n;
    }, setHoverStyle: function setHoverStyle(t) {
      var e = t._model,
          n = t._options,
          i = V.getHoverColor,
          a = V.valueOrDefault;t.$previousStyle = { backgroundColor: e.backgroundColor, borderColor: e.borderColor, borderWidth: e.borderWidth }, e.backgroundColor = a(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = a(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = a(n.hoverBorderWidth, n.borderWidth);
    }, _computeAngle: function _computeAngle(t) {
      var e = this,
          n = this.getMeta().count,
          i = e.getDataset(),
          a = e.getMeta();if (isNaN(i.data[t]) || a.data[t].hidden) return 0;var r = { chart: e.chart, dataIndex: t, dataset: i, datasetIndex: e.index };return Yt([e.chart.options.elements.arc.angle, 2 * Math.PI / n], r, t);
    } });z._set("pie", V.clone(z.doughnut)), z._set("pie", { cutoutPercentage: 0 });var Xt = Nt,
      Kt = V.valueOrDefault;z._set("radar", { spanGaps: !1, scale: { type: "radialLinear" }, elements: { line: { fill: "start", tension: 0 } } });var Zt = nt.extend({ datasetElementType: _t.Line, dataElementType: _t.Point, linkScales: V.noop, _datasetElementOptions: ["backgroundColor", "borderWidth", "borderColor", "borderCapStyle", "borderDash", "borderDashOffset", "borderJoinStyle", "fill"], _dataElementOptions: { backgroundColor: "pointBackgroundColor", borderColor: "pointBorderColor", borderWidth: "pointBorderWidth", hitRadius: "pointHitRadius", hoverBackgroundColor: "pointHoverBackgroundColor", hoverBorderColor: "pointHoverBorderColor", hoverBorderWidth: "pointHoverBorderWidth", hoverRadius: "pointHoverRadius", pointStyle: "pointStyle", radius: "pointRadius", rotation: "pointRotation" }, _getIndexScaleId: function _getIndexScaleId() {
      return this.chart.scale.id;
    }, _getValueScaleId: function _getValueScaleId() {
      return this.chart.scale.id;
    }, update: function update(t) {
      var e,
          n,
          i = this,
          a = i.getMeta(),
          r = a.dataset,
          o = a.data || [],
          s = i.chart.scale,
          l = i._config;for (void 0 !== l.tension && void 0 === l.lineTension && (l.lineTension = l.tension), r._scale = s, r._datasetIndex = i.index, r._children = o, r._loop = !0, r._model = i._resolveDatasetElementOptions(r), r.pivot(), e = 0, n = o.length; e < n; ++e) {
        i.updateElement(o[e], e, t);
      }for (i.updateBezierControlPoints(), e = 0, n = o.length; e < n; ++e) {
        o[e].pivot();
      }
    }, updateElement: function updateElement(t, e, n) {
      var i = this,
          a = t.custom || {},
          r = i.getDataset(),
          o = i.chart.scale,
          s = o.getPointPositionForValue(e, r.data[e]),
          l = i._resolveDataElementOptions(t, e),
          u = i.getMeta().dataset._model,
          d = n ? o.xCenter : s.x,
          h = n ? o.yCenter : s.y;t._scale = o, t._options = l, t._datasetIndex = i.index, t._index = e, t._model = { x: d, y: h, skip: a.skip || isNaN(d) || isNaN(h), radius: l.radius, pointStyle: l.pointStyle, rotation: l.rotation, backgroundColor: l.backgroundColor, borderColor: l.borderColor, borderWidth: l.borderWidth, tension: Kt(a.tension, u ? u.tension : 0), hitRadius: l.hitRadius };
    }, _resolveDatasetElementOptions: function _resolveDatasetElementOptions() {
      var t = this,
          e = t._config,
          n = t.chart.options,
          i = nt.prototype._resolveDatasetElementOptions.apply(t, arguments);return i.spanGaps = Kt(e.spanGaps, n.spanGaps), i.tension = Kt(e.lineTension, n.elements.line.tension), i;
    }, updateBezierControlPoints: function updateBezierControlPoints() {
      var t,
          e,
          n,
          i,
          a = this.getMeta(),
          r = this.chart.chartArea,
          o = a.data || [];function s(t, e, n) {
        return Math.max(Math.min(t, n), e);
      }for (a.dataset._model.spanGaps && (o = o.filter(function (t) {
        return !t._model.skip;
      })), t = 0, e = o.length; t < e; ++t) {
        n = o[t]._model, i = V.splineCurve(V.previousItem(o, t, !0)._model, n, V.nextItem(o, t, !0)._model, n.tension), n.controlPointPreviousX = s(i.previous.x, r.left, r.right), n.controlPointPreviousY = s(i.previous.y, r.top, r.bottom), n.controlPointNextX = s(i.next.x, r.left, r.right), n.controlPointNextY = s(i.next.y, r.top, r.bottom);
      }
    }, setHoverStyle: function setHoverStyle(t) {
      var e = t._model,
          n = t._options,
          i = V.getHoverColor;t.$previousStyle = { backgroundColor: e.backgroundColor, borderColor: e.borderColor, borderWidth: e.borderWidth, radius: e.radius }, e.backgroundColor = Kt(n.hoverBackgroundColor, i(n.backgroundColor)), e.borderColor = Kt(n.hoverBorderColor, i(n.borderColor)), e.borderWidth = Kt(n.hoverBorderWidth, n.borderWidth), e.radius = Kt(n.hoverRadius, n.radius);
    } });z._set("scatter", { hover: { mode: "single" }, scales: { xAxes: [{ id: "x-axis-1", type: "linear", position: "bottom" }], yAxes: [{ id: "y-axis-1", type: "linear", position: "left" }] }, tooltips: { callbacks: { title: function title() {
          return "";
        }, label: function label(t) {
          return "(" + t.xLabel + ", " + t.yLabel + ")";
        } } } }), z._set("global", { datasets: { scatter: { showLine: !1 } } });var $t = { bar: Dt, bubble: Ft, doughnut: Nt, horizontalBar: Bt, line: Ut, polarArea: Gt, pie: Xt, radar: Zt, scatter: Ut };function Jt(t, e) {
    return t.native ? { x: t.x, y: t.y } : V.getRelativePosition(t, e);
  }function Qt(t, e) {
    var n,
        i,
        a,
        r,
        o,
        s,
        l = t._getSortedVisibleDatasetMetas();for (i = 0, r = l.length; i < r; ++i) {
      for (a = 0, o = (n = l[i].data).length; a < o; ++a) {
        (s = n[a])._view.skip || e(s);
      }
    }
  }function te(t, e) {
    var n = [];return Qt(t, function (t) {
      t.inRange(e.x, e.y) && n.push(t);
    }), n;
  }function ee(t, e, n, i) {
    var a = Number.POSITIVE_INFINITY,
        r = [];return Qt(t, function (t) {
      if (!n || t.inRange(e.x, e.y)) {
        var o = t.getCenterPoint(),
            s = i(e, o);s < a ? (r = [t], a = s) : s === a && r.push(t);
      }
    }), r;
  }function ne(t) {
    var e = -1 !== t.indexOf("x"),
        n = -1 !== t.indexOf("y");return function (t, i) {
      var a = e ? Math.abs(t.x - i.x) : 0,
          r = n ? Math.abs(t.y - i.y) : 0;return Math.sqrt(Math.pow(a, 2) + Math.pow(r, 2));
    };
  }function ie(t, e, n) {
    var i = Jt(e, t);n.axis = n.axis || "x";var a = ne(n.axis),
        r = n.intersect ? te(t, i) : ee(t, i, !1, a),
        o = [];return r.length ? (t._getSortedVisibleDatasetMetas().forEach(function (t) {
      var e = t.data[r[0]._index];e && !e._view.skip && o.push(e);
    }), o) : [];
  }var ae = { modes: { single: function single(t, e) {
        var n = Jt(e, t),
            i = [];return Qt(t, function (t) {
          if (t.inRange(n.x, n.y)) return i.push(t), i;
        }), i.slice(0, 1);
      }, label: ie, index: ie, dataset: function dataset(t, e, n) {
        var i = Jt(e, t);n.axis = n.axis || "xy";var a = ne(n.axis),
            r = n.intersect ? te(t, i) : ee(t, i, !1, a);return r.length > 0 && (r = t.getDatasetMeta(r[0]._datasetIndex).data), r;
      }, "x-axis": function xAxis(t, e) {
        return ie(t, e, { intersect: !1 });
      }, point: function point(t, e) {
        return te(t, Jt(e, t));
      }, nearest: function nearest(t, e, n) {
        var i = Jt(e, t);n.axis = n.axis || "xy";var a = ne(n.axis);return ee(t, i, n.intersect, a);
      }, x: function x(t, e, n) {
        var i = Jt(e, t),
            a = [],
            r = !1;return Qt(t, function (t) {
          t.inXRange(i.x) && a.push(t), t.inRange(i.x, i.y) && (r = !0);
        }), n.intersect && !r && (a = []), a;
      }, y: function y(t, e, n) {
        var i = Jt(e, t),
            a = [],
            r = !1;return Qt(t, function (t) {
          t.inYRange(i.y) && a.push(t), t.inRange(i.x, i.y) && (r = !0);
        }), n.intersect && !r && (a = []), a;
      } } },
      re = V.extend;function oe(t, e) {
    return V.where(t, function (t) {
      return t.pos === e;
    });
  }function se(t, e) {
    return t.sort(function (t, n) {
      var i = e ? n : t,
          a = e ? t : n;return i.weight === a.weight ? i.index - a.index : i.weight - a.weight;
    });
  }function le(t, e, n, i) {
    return Math.max(t[n], e[n]) + Math.max(t[i], e[i]);
  }function ue(t, e, n) {
    var i,
        a,
        r = n.box,
        o = t.maxPadding;if (n.size && (t[n.pos] -= n.size), n.size = n.horizontal ? r.height : r.width, t[n.pos] += n.size, r.getPadding) {
      var s = r.getPadding();o.top = Math.max(o.top, s.top), o.left = Math.max(o.left, s.left), o.bottom = Math.max(o.bottom, s.bottom), o.right = Math.max(o.right, s.right);
    }if (i = e.outerWidth - le(o, t, "left", "right"), a = e.outerHeight - le(o, t, "top", "bottom"), i !== t.w || a !== t.h) return t.w = i, t.h = a, n.horizontal ? i !== t.w : a !== t.h;
  }function de(t, e) {
    var n = e.maxPadding;function i(t) {
      var i = { left: 0, top: 0, right: 0, bottom: 0 };return t.forEach(function (t) {
        i[t] = Math.max(e[t], n[t]);
      }), i;
    }return i(t ? ["left", "right"] : ["top", "bottom"]);
  }function he(t, e, n) {
    var i,
        a,
        r,
        o,
        s,
        l,
        u = [];for (i = 0, a = t.length; i < a; ++i) {
      (o = (r = t[i]).box).update(r.width || e.w, r.height || e.h, de(r.horizontal, e)), ue(e, n, r) && (l = !0, u.length && (s = !0)), o.fullWidth || u.push(r);
    }return s && he(u, e, n) || l;
  }function ce(t, e, n) {
    var i,
        a,
        r,
        o,
        s = n.padding,
        l = e.x,
        u = e.y;for (i = 0, a = t.length; i < a; ++i) {
      o = (r = t[i]).box, r.horizontal ? (o.left = o.fullWidth ? s.left : e.left, o.right = o.fullWidth ? n.outerWidth - s.right : e.left + e.w, o.top = u, o.bottom = u + o.height, o.width = o.right - o.left, u = o.bottom) : (o.left = l, o.right = l + o.width, o.top = e.top, o.bottom = e.top + e.h, o.height = o.bottom - o.top, l = o.right);
    }e.x = l, e.y = u;
  }z._set("global", { layout: { padding: { top: 0, right: 0, bottom: 0, left: 0 } } });var fe,
      ge = { defaults: {}, addBox: function addBox(t, e) {
      t.boxes || (t.boxes = []), e.fullWidth = e.fullWidth || !1, e.position = e.position || "top", e.weight = e.weight || 0, e._layers = e._layers || function () {
        return [{ z: 0, draw: function draw() {
            e.draw.apply(e, arguments);
          } }];
      }, t.boxes.push(e);
    }, removeBox: function removeBox(t, e) {
      var n = t.boxes ? t.boxes.indexOf(e) : -1;-1 !== n && t.boxes.splice(n, 1);
    }, configure: function configure(t, e, n) {
      for (var i, a = ["fullWidth", "position", "weight"], r = a.length, o = 0; o < r; ++o) {
        i = a[o], n.hasOwnProperty(i) && (e[i] = n[i]);
      }
    }, update: function update(t, e, n) {
      if (t) {
        var i = t.options.layout || {},
            a = V.options.toPadding(i.padding),
            r = e - a.width,
            o = n - a.height,
            s = function (t) {
          var e = function (t) {
            var e,
                n,
                i,
                a = [];for (e = 0, n = (t || []).length; e < n; ++e) {
              i = t[e], a.push({ index: e, box: i, pos: i.position, horizontal: i.isHorizontal(), weight: i.weight });
            }return a;
          }(t),
              n = se(oe(e, "left"), !0),
              i = se(oe(e, "right")),
              a = se(oe(e, "top"), !0),
              r = se(oe(e, "bottom"));return { leftAndTop: n.concat(a), rightAndBottom: i.concat(r), chartArea: oe(e, "chartArea"), vertical: n.concat(i), horizontal: a.concat(r) };
        }(t.boxes),
            l = s.vertical,
            u = s.horizontal,
            d = Object.freeze({ outerWidth: e, outerHeight: n, padding: a, availableWidth: r, vBoxMaxWidth: r / 2 / l.length, hBoxMaxHeight: o / 2 }),
            h = re({ maxPadding: re({}, a), w: r, h: o, x: a.left, y: a.top }, a);!function (t, e) {
          var n, i, a;for (n = 0, i = t.length; n < i; ++n) {
            (a = t[n]).width = a.horizontal ? a.box.fullWidth && e.availableWidth : e.vBoxMaxWidth, a.height = a.horizontal && e.hBoxMaxHeight;
          }
        }(l.concat(u), d), he(l, h, d), he(u, h, d) && he(l, h, d), function (t) {
          var e = t.maxPadding;function n(n) {
            var i = Math.max(e[n] - t[n], 0);return t[n] += i, i;
          }t.y += n("top"), t.x += n("left"), n("right"), n("bottom");
        }(h), ce(s.leftAndTop, h, d), h.x += h.w, h.y += h.h, ce(s.rightAndBottom, h, d), t.chartArea = { left: h.left, top: h.top, right: h.left + h.w, bottom: h.top + h.h }, V.each(s.chartArea, function (e) {
          var n = e.box;re(n, t.chartArea), n.update(h.w, h.h);
        });
      }
    } },
      pe = (fe = Object.freeze({ __proto__: null, default: "@keyframes chartjs-render-animation{from{opacity:.99}to{opacity:1}}.chartjs-render-monitor{animation:chartjs-render-animation 1ms}.chartjs-size-monitor,.chartjs-size-monitor-expand,.chartjs-size-monitor-shrink{position:absolute;direction:ltr;left:0;top:0;right:0;bottom:0;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1}.chartjs-size-monitor-expand>div{position:absolute;width:1000000px;height:1000000px;left:0;top:0}.chartjs-size-monitor-shrink>div{position:absolute;width:200%;height:200%;left:0;top:0}" })) && fe.default || fe,
      me = "$chartjs",
      ve = "chartjs-size-monitor",
      be = "chartjs-render-monitor",
      xe = "chartjs-render-animation",
      ye = ["animationstart", "webkitAnimationStart"],
      _e = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup", pointerenter: "mouseenter", pointerdown: "mousedown", pointermove: "mousemove", pointerup: "mouseup", pointerleave: "mouseout", pointerout: "mouseout" };function ke(t, e) {
    var n = V.getStyle(t, e),
        i = n && n.match(/^(\d+)(\.\d+)?px$/);return i ? Number(i[1]) : void 0;
  }var we = !!function () {
    var t = !1;try {
      var e = Object.defineProperty({}, "passive", { get: function get() {
          t = !0;
        } });window.addEventListener("e", null, e);
    } catch (t) {}return t;
  }() && { passive: !0 };function Me(t, e, n) {
    t.addEventListener(e, n, we);
  }function Se(t, e, n) {
    t.removeEventListener(e, n, we);
  }function Ce(t, e, n, i, a) {
    return { type: t, chart: e, native: a || null, x: void 0 !== n ? n : null, y: void 0 !== i ? i : null };
  }function Pe(t) {
    var e = document.createElement("div");return e.className = t || "", e;
  }function Ae(t, e, n) {
    var i,
        a,
        r,
        o,
        s = t[me] || (t[me] = {}),
        l = s.resizer = function (t) {
      var e = Pe(ve),
          n = Pe(ve + "-expand"),
          i = Pe(ve + "-shrink");n.appendChild(Pe()), i.appendChild(Pe()), e.appendChild(n), e.appendChild(i), e._reset = function () {
        n.scrollLeft = 1e6, n.scrollTop = 1e6, i.scrollLeft = 1e6, i.scrollTop = 1e6;
      };var a = function a() {
        e._reset(), t();
      };return Me(n, "scroll", a.bind(n, "expand")), Me(i, "scroll", a.bind(i, "shrink")), e;
    }((i = function i() {
      if (s.resizer) {
        var i = n.options.maintainAspectRatio && t.parentNode,
            a = i ? i.clientWidth : 0;e(Ce("resize", n)), i && i.clientWidth < a && n.canvas && e(Ce("resize", n));
      }
    }, r = !1, o = [], function () {
      o = Array.prototype.slice.call(arguments), a = a || this, r || (r = !0, V.requestAnimFrame.call(window, function () {
        r = !1, i.apply(a, o);
      }));
    }));!function (t, e) {
      var n = t[me] || (t[me] = {}),
          i = n.renderProxy = function (t) {
        t.animationName === xe && e();
      };V.each(ye, function (e) {
        Me(t, e, i);
      }), n.reflow = !!t.offsetParent, t.classList.add(be);
    }(t, function () {
      if (s.resizer) {
        var e = t.parentNode;e && e !== l.parentNode && e.insertBefore(l, e.firstChild), l._reset();
      }
    });
  }function De(t) {
    var e = t[me] || {},
        n = e.resizer;delete e.resizer, function (t) {
      var e = t[me] || {},
          n = e.renderProxy;n && (V.each(ye, function (e) {
        Se(t, e, n);
      }), delete e.renderProxy), t.classList.remove(be);
    }(t), n && n.parentNode && n.parentNode.removeChild(n);
  }var Te = { disableCSSInjection: !1, _enabled: "undefined" != typeof window && "undefined" != typeof document, _ensureLoaded: function _ensureLoaded(t) {
      if (!this.disableCSSInjection) {
        var e = t.getRootNode ? t.getRootNode() : document;!function (t, e) {
          var n = t[me] || (t[me] = {});if (!n.containsStyles) {
            n.containsStyles = !0, e = "/* Chart.js */\n" + e;var i = document.createElement("style");i.setAttribute("type", "text/css"), i.appendChild(document.createTextNode(e)), t.appendChild(i);
          }
        }(e.host ? e : document.head, pe);
      }
    }, acquireContext: function acquireContext(t, e) {
      "string" == typeof t ? t = document.getElementById(t) : t.length && (t = t[0]), t && t.canvas && (t = t.canvas);var n = t && t.getContext && t.getContext("2d");return n && n.canvas === t ? (this._ensureLoaded(t), function (t, e) {
        var n = t.style,
            i = t.getAttribute("height"),
            a = t.getAttribute("width");if (t[me] = { initial: { height: i, width: a, style: { display: n.display, height: n.height, width: n.width } } }, n.display = n.display || "block", null === a || "" === a) {
          var r = ke(t, "width");void 0 !== r && (t.width = r);
        }if (null === i || "" === i) if ("" === t.style.height) t.height = t.width / (e.options.aspectRatio || 2);else {
          var o = ke(t, "height");void 0 !== r && (t.height = o);
        }
      }(t, e), n) : null;
    }, releaseContext: function releaseContext(t) {
      var e = t.canvas;if (e[me]) {
        var n = e[me].initial;["height", "width"].forEach(function (t) {
          var i = n[t];V.isNullOrUndef(i) ? e.removeAttribute(t) : e.setAttribute(t, i);
        }), V.each(n.style || {}, function (t, n) {
          e.style[n] = t;
        }), e.width = e.width, delete e[me];
      }
    }, addEventListener: function addEventListener(t, e, n) {
      var i = t.canvas;if ("resize" !== e) {
        var a = n[me] || (n[me] = {});Me(i, e, (a.proxies || (a.proxies = {}))[t.id + "_" + e] = function (e) {
          n(function (t, e) {
            var n = _e[t.type] || t.type,
                i = V.getRelativePosition(t, e);return Ce(n, e, i.x, i.y, t);
          }(e, t));
        });
      } else Ae(i, n, t);
    }, removeEventListener: function removeEventListener(t, e, n) {
      var i = t.canvas;if ("resize" !== e) {
        var a = ((n[me] || {}).proxies || {})[t.id + "_" + e];a && Se(i, e, a);
      } else De(i);
    } };V.addEvent = Me, V.removeEvent = Se;var Ie = Te._enabled ? Te : { acquireContext: function acquireContext(t) {
      return t && t.canvas && (t = t.canvas), t && t.getContext("2d") || null;
    } },
      Fe = V.extend({ initialize: function initialize() {}, acquireContext: function acquireContext() {}, releaseContext: function releaseContext() {}, addEventListener: function addEventListener() {}, removeEventListener: function removeEventListener() {} }, Ie);z._set("global", { plugins: {} });var Le = { _plugins: [], _cacheId: 0, register: function register(t) {
      var e = this._plugins;[].concat(t).forEach(function (t) {
        -1 === e.indexOf(t) && e.push(t);
      }), this._cacheId++;
    }, unregister: function unregister(t) {
      var e = this._plugins;[].concat(t).forEach(function (t) {
        var n = e.indexOf(t);-1 !== n && e.splice(n, 1);
      }), this._cacheId++;
    }, clear: function clear() {
      this._plugins = [], this._cacheId++;
    }, count: function count() {
      return this._plugins.length;
    }, getAll: function getAll() {
      return this._plugins;
    }, notify: function notify(t, e, n) {
      var i,
          a,
          r,
          o,
          s,
          l = this.descriptors(t),
          u = l.length;for (i = 0; i < u; ++i) {
        if ("function" == typeof (s = (r = (a = l[i]).plugin)[e]) && ((o = [t].concat(n || [])).push(a.options), !1 === s.apply(r, o))) return !1;
      }return !0;
    }, descriptors: function descriptors(t) {
      var e = t.$plugins || (t.$plugins = {});if (e.id === this._cacheId) return e.descriptors;var n = [],
          i = [],
          a = t && t.config || {},
          r = a.options && a.options.plugins || {};return this._plugins.concat(a.plugins || []).forEach(function (t) {
        if (-1 === n.indexOf(t)) {
          var e = t.id,
              a = r[e];!1 !== a && (!0 === a && (a = V.clone(z.global.plugins[e])), n.push(t), i.push({ plugin: t, options: a || {} }));
        }
      }), e.descriptors = i, e.id = this._cacheId, i;
    }, _invalidate: function _invalidate(t) {
      delete t.$plugins;
    } },
      Oe = { constructors: {}, defaults: {}, registerScaleType: function registerScaleType(t, e, n) {
      this.constructors[t] = e, this.defaults[t] = V.clone(n);
    }, getScaleConstructor: function getScaleConstructor(t) {
      return this.constructors.hasOwnProperty(t) ? this.constructors[t] : void 0;
    }, getScaleDefaults: function getScaleDefaults(t) {
      return this.defaults.hasOwnProperty(t) ? V.merge({}, [z.scale, this.defaults[t]]) : {};
    }, updateScaleDefaults: function updateScaleDefaults(t, e) {
      this.defaults.hasOwnProperty(t) && (this.defaults[t] = V.extend(this.defaults[t], e));
    }, addScalesToLayout: function addScalesToLayout(t) {
      V.each(t.scales, function (e) {
        e.fullWidth = e.options.fullWidth, e.position = e.options.position, e.weight = e.options.weight, ge.addBox(t, e);
      });
    } },
      Re = V.valueOrDefault,
      ze = V.rtl.getRtlAdapter;z._set("global", { tooltips: { enabled: !0, custom: null, mode: "nearest", position: "average", intersect: !0, backgroundColor: "rgba(0,0,0,0.8)", titleFontStyle: "bold", titleSpacing: 2, titleMarginBottom: 6, titleFontColor: "#fff", titleAlign: "left", bodySpacing: 2, bodyFontColor: "#fff", bodyAlign: "left", footerFontStyle: "bold", footerSpacing: 2, footerMarginTop: 6, footerFontColor: "#fff", footerAlign: "left", yPadding: 6, xPadding: 6, caretPadding: 2, caretSize: 5, cornerRadius: 6, multiKeyBackground: "#fff", displayColors: !0, borderColor: "rgba(0,0,0,0)", borderWidth: 0, callbacks: { beforeTitle: V.noop, title: function title(t, e) {
          var n = "",
              i = e.labels,
              a = i ? i.length : 0;if (t.length > 0) {
            var r = t[0];r.label ? n = r.label : r.xLabel ? n = r.xLabel : a > 0 && r.index < a && (n = i[r.index]);
          }return n;
        }, afterTitle: V.noop, beforeBody: V.noop, beforeLabel: V.noop, label: function label(t, e) {
          var n = e.datasets[t.datasetIndex].label || "";return n && (n += ": "), V.isNullOrUndef(t.value) ? n += t.yLabel : n += t.value, n;
        }, labelColor: function labelColor(t, e) {
          var n = e.getDatasetMeta(t.datasetIndex).data[t.index]._view;return { borderColor: n.borderColor, backgroundColor: n.backgroundColor };
        }, labelTextColor: function labelTextColor() {
          return this._options.bodyFontColor;
        }, afterLabel: V.noop, afterBody: V.noop, beforeFooter: V.noop, footer: V.noop, afterFooter: V.noop } } });var Ne = { average: function average(t) {
      if (!t.length) return !1;var e,
          n,
          i = 0,
          a = 0,
          r = 0;for (e = 0, n = t.length; e < n; ++e) {
        var o = t[e];if (o && o.hasValue()) {
          var s = o.tooltipPosition();i += s.x, a += s.y, ++r;
        }
      }return { x: i / r, y: a / r };
    }, nearest: function nearest(t, e) {
      var n,
          i,
          a,
          r = e.x,
          o = e.y,
          s = Number.POSITIVE_INFINITY;for (n = 0, i = t.length; n < i; ++n) {
        var l = t[n];if (l && l.hasValue()) {
          var u = l.getCenterPoint(),
              d = V.distanceBetweenPoints(e, u);d < s && (s = d, a = l);
        }
      }if (a) {
        var h = a.tooltipPosition();r = h.x, o = h.y;
      }return { x: r, y: o };
    } };function Be(t, e) {
    return e && (V.isArray(e) ? Array.prototype.push.apply(t, e) : t.push(e)), t;
  }function Ee(t) {
    return ("string" == typeof t || t instanceof String) && t.indexOf("\n") > -1 ? t.split("\n") : t;
  }function We(t) {
    var e = z.global;return { xPadding: t.xPadding, yPadding: t.yPadding, xAlign: t.xAlign, yAlign: t.yAlign, rtl: t.rtl, textDirection: t.textDirection, bodyFontColor: t.bodyFontColor, _bodyFontFamily: Re(t.bodyFontFamily, e.defaultFontFamily), _bodyFontStyle: Re(t.bodyFontStyle, e.defaultFontStyle), _bodyAlign: t.bodyAlign, bodyFontSize: Re(t.bodyFontSize, e.defaultFontSize), bodySpacing: t.bodySpacing, titleFontColor: t.titleFontColor, _titleFontFamily: Re(t.titleFontFamily, e.defaultFontFamily), _titleFontStyle: Re(t.titleFontStyle, e.defaultFontStyle), titleFontSize: Re(t.titleFontSize, e.defaultFontSize), _titleAlign: t.titleAlign, titleSpacing: t.titleSpacing, titleMarginBottom: t.titleMarginBottom, footerFontColor: t.footerFontColor, _footerFontFamily: Re(t.footerFontFamily, e.defaultFontFamily), _footerFontStyle: Re(t.footerFontStyle, e.defaultFontStyle), footerFontSize: Re(t.footerFontSize, e.defaultFontSize), _footerAlign: t.footerAlign, footerSpacing: t.footerSpacing, footerMarginTop: t.footerMarginTop, caretSize: t.caretSize, cornerRadius: t.cornerRadius, backgroundColor: t.backgroundColor, opacity: 0, legendColorBackground: t.multiKeyBackground, displayColors: t.displayColors, borderColor: t.borderColor, borderWidth: t.borderWidth };
  }function Ve(t, e) {
    return "center" === e ? t.x + t.width / 2 : "right" === e ? t.x + t.width - t.xPadding : t.x + t.xPadding;
  }function He(t) {
    return Be([], Ee(t));
  }var je = X.extend({ initialize: function initialize() {
      this._model = We(this._options), this._lastActive = [];
    }, getTitle: function getTitle() {
      var t = this,
          e = t._options,
          n = e.callbacks,
          i = n.beforeTitle.apply(t, arguments),
          a = n.title.apply(t, arguments),
          r = n.afterTitle.apply(t, arguments),
          o = [];return o = Be(o, Ee(i)), o = Be(o, Ee(a)), o = Be(o, Ee(r));
    }, getBeforeBody: function getBeforeBody() {
      return He(this._options.callbacks.beforeBody.apply(this, arguments));
    }, getBody: function getBody(t, e) {
      var n = this,
          i = n._options.callbacks,
          a = [];return V.each(t, function (t) {
        var r = { before: [], lines: [], after: [] };Be(r.before, Ee(i.beforeLabel.call(n, t, e))), Be(r.lines, i.label.call(n, t, e)), Be(r.after, Ee(i.afterLabel.call(n, t, e))), a.push(r);
      }), a;
    }, getAfterBody: function getAfterBody() {
      return He(this._options.callbacks.afterBody.apply(this, arguments));
    }, getFooter: function getFooter() {
      var t = this,
          e = t._options.callbacks,
          n = e.beforeFooter.apply(t, arguments),
          i = e.footer.apply(t, arguments),
          a = e.afterFooter.apply(t, arguments),
          r = [];return r = Be(r, Ee(n)), r = Be(r, Ee(i)), r = Be(r, Ee(a));
    }, update: function update(t) {
      var e,
          n,
          i,
          a,
          r,
          o,
          s,
          l,
          u,
          d,
          h = this,
          c = h._options,
          f = h._model,
          g = h._model = We(c),
          p = h._active,
          m = h._data,
          v = { xAlign: f.xAlign, yAlign: f.yAlign },
          b = { x: f.x, y: f.y },
          x = { width: f.width, height: f.height },
          y = { x: f.caretX, y: f.caretY };if (p.length) {
        g.opacity = 1;var _ = [],
            k = [];y = Ne[c.position].call(h, p, h._eventPosition);var w = [];for (e = 0, n = p.length; e < n; ++e) {
          w.push((i = p[e], a = void 0, r = void 0, o = void 0, s = void 0, l = void 0, u = void 0, d = void 0, a = i._xScale, r = i._yScale || i._scale, o = i._index, s = i._datasetIndex, l = i._chart.getDatasetMeta(s).controller, u = l._getIndexScale(), d = l._getValueScale(), { xLabel: a ? a.getLabelForIndex(o, s) : "", yLabel: r ? r.getLabelForIndex(o, s) : "", label: u ? "" + u.getLabelForIndex(o, s) : "", value: d ? "" + d.getLabelForIndex(o, s) : "", index: o, datasetIndex: s, x: i._model.x, y: i._model.y }));
        }c.filter && (w = w.filter(function (t) {
          return c.filter(t, m);
        })), c.itemSort && (w = w.sort(function (t, e) {
          return c.itemSort(t, e, m);
        })), V.each(w, function (t) {
          _.push(c.callbacks.labelColor.call(h, t, h._chart)), k.push(c.callbacks.labelTextColor.call(h, t, h._chart));
        }), g.title = h.getTitle(w, m), g.beforeBody = h.getBeforeBody(w, m), g.body = h.getBody(w, m), g.afterBody = h.getAfterBody(w, m), g.footer = h.getFooter(w, m), g.x = y.x, g.y = y.y, g.caretPadding = c.caretPadding, g.labelColors = _, g.labelTextColors = k, g.dataPoints = w, x = function (t, e) {
          var n = t._chart.ctx,
              i = 2 * e.yPadding,
              a = 0,
              r = e.body,
              o = r.reduce(function (t, e) {
            return t + e.before.length + e.lines.length + e.after.length;
          }, 0);o += e.beforeBody.length + e.afterBody.length;var s = e.title.length,
              l = e.footer.length,
              u = e.titleFontSize,
              d = e.bodyFontSize,
              h = e.footerFontSize;i += s * u, i += s ? (s - 1) * e.titleSpacing : 0, i += s ? e.titleMarginBottom : 0, i += o * d, i += o ? (o - 1) * e.bodySpacing : 0, i += l ? e.footerMarginTop : 0, i += l * h, i += l ? (l - 1) * e.footerSpacing : 0;var c = 0,
              f = function f(t) {
            a = Math.max(a, n.measureText(t).width + c);
          };return n.font = V.fontString(u, e._titleFontStyle, e._titleFontFamily), V.each(e.title, f), n.font = V.fontString(d, e._bodyFontStyle, e._bodyFontFamily), V.each(e.beforeBody.concat(e.afterBody), f), c = e.displayColors ? d + 2 : 0, V.each(r, function (t) {
            V.each(t.before, f), V.each(t.lines, f), V.each(t.after, f);
          }), c = 0, n.font = V.fontString(h, e._footerFontStyle, e._footerFontFamily), V.each(e.footer, f), { width: a += 2 * e.xPadding, height: i };
        }(this, g), b = function (t, e, n, i) {
          var a = t.x,
              r = t.y,
              o = t.caretSize,
              s = t.caretPadding,
              l = t.cornerRadius,
              u = n.xAlign,
              d = n.yAlign,
              h = o + s,
              c = l + s;return "right" === u ? a -= e.width : "center" === u && ((a -= e.width / 2) + e.width > i.width && (a = i.width - e.width), a < 0 && (a = 0)), "top" === d ? r += h : r -= "bottom" === d ? e.height + h : e.height / 2, "center" === d ? "left" === u ? a += h : "right" === u && (a -= h) : "left" === u ? a -= c : "right" === u && (a += c), { x: a, y: r };
        }(g, x, v = function (t, e) {
          var n,
              i,
              a,
              r,
              o,
              s = t._model,
              l = t._chart,
              u = t._chart.chartArea,
              d = "center",
              h = "center";s.y < e.height ? h = "top" : s.y > l.height - e.height && (h = "bottom");var c = (u.left + u.right) / 2,
              f = (u.top + u.bottom) / 2;"center" === h ? (n = function n(t) {
            return t <= c;
          }, i = function i(t) {
            return t > c;
          }) : (n = function n(t) {
            return t <= e.width / 2;
          }, i = function i(t) {
            return t >= l.width - e.width / 2;
          }), a = function a(t) {
            return t + e.width + s.caretSize + s.caretPadding > l.width;
          }, r = function r(t) {
            return t - e.width - s.caretSize - s.caretPadding < 0;
          }, o = function o(t) {
            return t <= f ? "top" : "bottom";
          }, n(s.x) ? (d = "left", a(s.x) && (d = "center", h = o(s.y))) : i(s.x) && (d = "right", r(s.x) && (d = "center", h = o(s.y)));var g = t._options;return { xAlign: g.xAlign ? g.xAlign : d, yAlign: g.yAlign ? g.yAlign : h };
        }(this, x), h._chart);
      } else g.opacity = 0;return g.xAlign = v.xAlign, g.yAlign = v.yAlign, g.x = b.x, g.y = b.y, g.width = x.width, g.height = x.height, g.caretX = y.x, g.caretY = y.y, h._model = g, t && c.custom && c.custom.call(h, g), h;
    }, drawCaret: function drawCaret(t, e) {
      var n = this._chart.ctx,
          i = this._view,
          a = this.getCaretPosition(t, e, i);n.lineTo(a.x1, a.y1), n.lineTo(a.x2, a.y2), n.lineTo(a.x3, a.y3);
    }, getCaretPosition: function getCaretPosition(t, e, n) {
      var i,
          a,
          r,
          o,
          s,
          l,
          u = n.caretSize,
          d = n.cornerRadius,
          h = n.xAlign,
          c = n.yAlign,
          f = t.x,
          g = t.y,
          p = e.width,
          m = e.height;if ("center" === c) s = g + m / 2, "left" === h ? (a = (i = f) - u, r = i, o = s + u, l = s - u) : (a = (i = f + p) + u, r = i, o = s - u, l = s + u);else if ("left" === h ? (i = (a = f + d + u) - u, r = a + u) : "right" === h ? (i = (a = f + p - d - u) - u, r = a + u) : (i = (a = n.caretX) - u, r = a + u), "top" === c) s = (o = g) - u, l = o;else {
        s = (o = g + m) + u, l = o;var v = r;r = i, i = v;
      }return { x1: i, x2: a, x3: r, y1: o, y2: s, y3: l };
    }, drawTitle: function drawTitle(t, e, n) {
      var i,
          a,
          r,
          o = e.title,
          s = o.length;if (s) {
        var l = ze(e.rtl, e.x, e.width);for (t.x = Ve(e, e._titleAlign), n.textAlign = l.textAlign(e._titleAlign), n.textBaseline = "middle", i = e.titleFontSize, a = e.titleSpacing, n.fillStyle = e.titleFontColor, n.font = V.fontString(i, e._titleFontStyle, e._titleFontFamily), r = 0; r < s; ++r) {
          n.fillText(o[r], l.x(t.x), t.y + i / 2), t.y += i + a, r + 1 === s && (t.y += e.titleMarginBottom - a);
        }
      }
    }, drawBody: function drawBody(t, e, n) {
      var i,
          a,
          r,
          o,
          s,
          l,
          u,
          d,
          h = e.bodyFontSize,
          c = e.bodySpacing,
          f = e._bodyAlign,
          g = e.body,
          p = e.displayColors,
          m = 0,
          v = p ? Ve(e, "left") : 0,
          b = ze(e.rtl, e.x, e.width),
          x = function x(e) {
        n.fillText(e, b.x(t.x + m), t.y + h / 2), t.y += h + c;
      },
          y = b.textAlign(f);for (n.textAlign = f, n.textBaseline = "middle", n.font = V.fontString(h, e._bodyFontStyle, e._bodyFontFamily), t.x = Ve(e, y), n.fillStyle = e.bodyFontColor, V.each(e.beforeBody, x), m = p && "right" !== y ? "center" === f ? h / 2 + 1 : h + 2 : 0, s = 0, u = g.length; s < u; ++s) {
        for (i = g[s], a = e.labelTextColors[s], r = e.labelColors[s], n.fillStyle = a, V.each(i.before, x), l = 0, d = (o = i.lines).length; l < d; ++l) {
          if (p) {
            var _ = b.x(v);n.fillStyle = e.legendColorBackground, n.fillRect(b.leftForLtr(_, h), t.y, h, h), n.lineWidth = 1, n.strokeStyle = r.borderColor, n.strokeRect(b.leftForLtr(_, h), t.y, h, h), n.fillStyle = r.backgroundColor, n.fillRect(b.leftForLtr(b.xPlus(_, 1), h - 2), t.y + 1, h - 2, h - 2), n.fillStyle = a;
          }x(o[l]);
        }V.each(i.after, x);
      }m = 0, V.each(e.afterBody, x), t.y -= c;
    }, drawFooter: function drawFooter(t, e, n) {
      var i,
          a,
          r = e.footer,
          o = r.length;if (o) {
        var s = ze(e.rtl, e.x, e.width);for (t.x = Ve(e, e._footerAlign), t.y += e.footerMarginTop, n.textAlign = s.textAlign(e._footerAlign), n.textBaseline = "middle", i = e.footerFontSize, n.fillStyle = e.footerFontColor, n.font = V.fontString(i, e._footerFontStyle, e._footerFontFamily), a = 0; a < o; ++a) {
          n.fillText(r[a], s.x(t.x), t.y + i / 2), t.y += i + e.footerSpacing;
        }
      }
    }, drawBackground: function drawBackground(t, e, n, i) {
      n.fillStyle = e.backgroundColor, n.strokeStyle = e.borderColor, n.lineWidth = e.borderWidth;var a = e.xAlign,
          r = e.yAlign,
          o = t.x,
          s = t.y,
          l = i.width,
          u = i.height,
          d = e.cornerRadius;n.beginPath(), n.moveTo(o + d, s), "top" === r && this.drawCaret(t, i), n.lineTo(o + l - d, s), n.quadraticCurveTo(o + l, s, o + l, s + d), "center" === r && "right" === a && this.drawCaret(t, i), n.lineTo(o + l, s + u - d), n.quadraticCurveTo(o + l, s + u, o + l - d, s + u), "bottom" === r && this.drawCaret(t, i), n.lineTo(o + d, s + u), n.quadraticCurveTo(o, s + u, o, s + u - d), "center" === r && "left" === a && this.drawCaret(t, i), n.lineTo(o, s + d), n.quadraticCurveTo(o, s, o + d, s), n.closePath(), n.fill(), e.borderWidth > 0 && n.stroke();
    }, draw: function draw() {
      var t = this._chart.ctx,
          e = this._view;if (0 !== e.opacity) {
        var n = { width: e.width, height: e.height },
            i = { x: e.x, y: e.y },
            a = Math.abs(e.opacity < .001) ? 0 : e.opacity,
            r = e.title.length || e.beforeBody.length || e.body.length || e.afterBody.length || e.footer.length;this._options.enabled && r && (t.save(), t.globalAlpha = a, this.drawBackground(i, e, t, n), i.y += e.yPadding, V.rtl.overrideTextDirection(t, e.textDirection), this.drawTitle(i, e, t), this.drawBody(i, e, t), this.drawFooter(i, e, t), V.rtl.restoreTextDirection(t, e.textDirection), t.restore());
      }
    }, handleEvent: function handleEvent(t) {
      var e,
          n = this,
          i = n._options;return n._lastActive = n._lastActive || [], "mouseout" === t.type ? n._active = [] : (n._active = n._chart.getElementsAtEventForMode(t, i.mode, i), i.reverse && n._active.reverse()), (e = !V.arrayEquals(n._active, n._lastActive)) && (n._lastActive = n._active, (i.enabled || i.custom) && (n._eventPosition = { x: t.x, y: t.y }, n.update(!0), n.pivot())), e;
    } }),
      qe = Ne,
      Ue = je;Ue.positioners = qe;var Ye = V.valueOrDefault;function Ge() {
    return V.merge({}, [].slice.call(arguments), { merger: function merger(t, e, n, i) {
        if ("xAxes" === t || "yAxes" === t) {
          var a,
              r,
              o,
              s = n[t].length;for (e[t] || (e[t] = []), a = 0; a < s; ++a) {
            o = n[t][a], r = Ye(o.type, "xAxes" === t ? "category" : "linear"), a >= e[t].length && e[t].push({}), !e[t][a].type || o.type && o.type !== e[t][a].type ? V.merge(e[t][a], [Oe.getScaleDefaults(r), o]) : V.merge(e[t][a], o);
          }
        } else V._merger(t, e, n, i);
      } });
  }function Xe() {
    return V.merge({}, [].slice.call(arguments), { merger: function merger(t, e, n, i) {
        var a = e[t] || {},
            r = n[t];"scales" === t ? e[t] = Ge(a, r) : "scale" === t ? e[t] = V.merge(a, [Oe.getScaleDefaults(r.type), r]) : V._merger(t, e, n, i);
      } });
  }function Ke(t) {
    var e = t.options;V.each(t.scales, function (e) {
      ge.removeBox(t, e);
    }), e = Xe(z.global, z[t.config.type], e), t.options = t.config.options = e, t.ensureScalesHaveIDs(), t.buildOrUpdateScales(), t.tooltip._options = e.tooltips, t.tooltip.initialize();
  }function Ze(t, e, n) {
    var i,
        a = function a(t) {
      return t.id === i;
    };do {
      i = e + n++;
    } while (V.findIndex(t, a) >= 0);return i;
  }function $e(t) {
    return "top" === t || "bottom" === t;
  }function Je(t, e) {
    return function (n, i) {
      return n[t] === i[t] ? n[e] - i[e] : n[t] - i[t];
    };
  }z._set("global", { elements: {}, events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"], hover: { onHover: null, mode: "nearest", intersect: !0, animationDuration: 400 }, onClick: null, maintainAspectRatio: !0, responsive: !0, responsiveAnimationDuration: 0 });var Qe = function Qe(t, e) {
    return this.construct(t, e), this;
  };V.extend(Qe.prototype, { construct: function construct(t, e) {
      var n = this;e = function (t) {
        var e = (t = t || {}).data = t.data || {};return e.datasets = e.datasets || [], e.labels = e.labels || [], t.options = Xe(z.global, z[t.type], t.options || {}), t;
      }(e);var i = Fe.acquireContext(t, e),
          a = i && i.canvas,
          r = a && a.height,
          o = a && a.width;n.id = V.uid(), n.ctx = i, n.canvas = a, n.config = e, n.width = o, n.height = r, n.aspectRatio = r ? o / r : null, n.options = e.options, n._bufferedRender = !1, n._layers = [], n.chart = n, n.controller = n, Qe.instances[n.id] = n, Object.defineProperty(n, "data", { get: function get() {
          return n.config.data;
        }, set: function set(t) {
          n.config.data = t;
        } }), i && a ? (n.initialize(), n.update()) : console.error("Failed to create chart: can't acquire context from the given item");
    }, initialize: function initialize() {
      var t = this;return Le.notify(t, "beforeInit"), V.retinaScale(t, t.options.devicePixelRatio), t.bindEvents(), t.options.responsive && t.resize(!0), t.initToolTip(), Le.notify(t, "afterInit"), t;
    }, clear: function clear() {
      return V.canvas.clear(this), this;
    }, stop: function stop() {
      return $.cancelAnimation(this), this;
    }, resize: function resize(t) {
      var e = this,
          n = e.options,
          i = e.canvas,
          a = n.maintainAspectRatio && e.aspectRatio || null,
          r = Math.max(0, Math.floor(V.getMaximumWidth(i))),
          o = Math.max(0, Math.floor(a ? r / a : V.getMaximumHeight(i)));if ((e.width !== r || e.height !== o) && (i.width = e.width = r, i.height = e.height = o, i.style.width = r + "px", i.style.height = o + "px", V.retinaScale(e, n.devicePixelRatio), !t)) {
        var s = { width: r, height: o };Le.notify(e, "resize", [s]), n.onResize && n.onResize(e, s), e.stop(), e.update({ duration: n.responsiveAnimationDuration });
      }
    }, ensureScalesHaveIDs: function ensureScalesHaveIDs() {
      var t = this.options,
          e = t.scales || {},
          n = t.scale;V.each(e.xAxes, function (t, n) {
        t.id || (t.id = Ze(e.xAxes, "x-axis-", n));
      }), V.each(e.yAxes, function (t, n) {
        t.id || (t.id = Ze(e.yAxes, "y-axis-", n));
      }), n && (n.id = n.id || "scale");
    }, buildOrUpdateScales: function buildOrUpdateScales() {
      var t = this,
          e = t.options,
          n = t.scales || {},
          i = [],
          a = Object.keys(n).reduce(function (t, e) {
        return t[e] = !1, t;
      }, {});e.scales && (i = i.concat((e.scales.xAxes || []).map(function (t) {
        return { options: t, dtype: "category", dposition: "bottom" };
      }), (e.scales.yAxes || []).map(function (t) {
        return { options: t, dtype: "linear", dposition: "left" };
      }))), e.scale && i.push({ options: e.scale, dtype: "radialLinear", isDefault: !0, dposition: "chartArea" }), V.each(i, function (e) {
        var i = e.options,
            r = i.id,
            o = Ye(i.type, e.dtype);$e(i.position) !== $e(e.dposition) && (i.position = e.dposition), a[r] = !0;var s = null;if (r in n && n[r].type === o) (s = n[r]).options = i, s.ctx = t.ctx, s.chart = t;else {
          var l = Oe.getScaleConstructor(o);if (!l) return;s = new l({ id: r, type: o, options: i, ctx: t.ctx, chart: t }), n[s.id] = s;
        }s.mergeTicksOptions(), e.isDefault && (t.scale = s);
      }), V.each(a, function (t, e) {
        t || delete n[e];
      }), t.scales = n, Oe.addScalesToLayout(this);
    }, buildOrUpdateControllers: function buildOrUpdateControllers() {
      var t,
          e,
          n = this,
          i = [],
          a = n.data.datasets;for (t = 0, e = a.length; t < e; t++) {
        var r = a[t],
            o = n.getDatasetMeta(t),
            s = r.type || n.config.type;if (o.type && o.type !== s && (n.destroyDatasetMeta(t), o = n.getDatasetMeta(t)), o.type = s, o.order = r.order || 0, o.index = t, o.controller) o.controller.updateIndex(t), o.controller.linkScales();else {
          var l = $t[o.type];if (void 0 === l) throw new Error('"' + o.type + '" is not a chart type.');o.controller = new l(n, t), i.push(o.controller);
        }
      }return i;
    }, resetElements: function resetElements() {
      var t = this;V.each(t.data.datasets, function (e, n) {
        t.getDatasetMeta(n).controller.reset();
      }, t);
    }, reset: function reset() {
      this.resetElements(), this.tooltip.initialize();
    }, update: function update(t) {
      var e,
          n,
          i = this;if (t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) || (t = { duration: t, lazy: arguments[1] }), Ke(i), Le._invalidate(i), !1 !== Le.notify(i, "beforeUpdate")) {
        i.tooltip._data = i.data;var a = i.buildOrUpdateControllers();for (e = 0, n = i.data.datasets.length; e < n; e++) {
          i.getDatasetMeta(e).controller.buildOrUpdateElements();
        }i.updateLayout(), i.options.animation && i.options.animation.duration && V.each(a, function (t) {
          t.reset();
        }), i.updateDatasets(), i.tooltip.initialize(), i.lastActive = [], Le.notify(i, "afterUpdate"), i._layers.sort(Je("z", "_idx")), i._bufferedRender ? i._bufferedRequest = { duration: t.duration, easing: t.easing, lazy: t.lazy } : i.render(t);
      }
    }, updateLayout: function updateLayout() {
      var t = this;!1 !== Le.notify(t, "beforeLayout") && (ge.update(this, this.width, this.height), t._layers = [], V.each(t.boxes, function (e) {
        e._configure && e._configure(), t._layers.push.apply(t._layers, e._layers());
      }, t), t._layers.forEach(function (t, e) {
        t._idx = e;
      }), Le.notify(t, "afterScaleUpdate"), Le.notify(t, "afterLayout"));
    }, updateDatasets: function updateDatasets() {
      if (!1 !== Le.notify(this, "beforeDatasetsUpdate")) {
        for (var t = 0, e = this.data.datasets.length; t < e; ++t) {
          this.updateDataset(t);
        }Le.notify(this, "afterDatasetsUpdate");
      }
    }, updateDataset: function updateDataset(t) {
      var e = this.getDatasetMeta(t),
          n = { meta: e, index: t };!1 !== Le.notify(this, "beforeDatasetUpdate", [n]) && (e.controller._update(), Le.notify(this, "afterDatasetUpdate", [n]));
    }, render: function render(t) {
      var e = this;t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) || (t = { duration: t, lazy: arguments[1] });var n = e.options.animation,
          i = Ye(t.duration, n && n.duration),
          a = t.lazy;if (!1 !== Le.notify(e, "beforeRender")) {
        var r = function r(t) {
          Le.notify(e, "afterRender"), V.callback(n && n.onComplete, [t], e);
        };if (n && i) {
          var o = new Z({ numSteps: i / 16.66, easing: t.easing || n.easing, render: function render(t, e) {
              var n = V.easing.effects[e.easing],
                  i = e.currentStep,
                  a = i / e.numSteps;t.draw(n(a), a, i);
            }, onAnimationProgress: n.onProgress, onAnimationComplete: r });$.addAnimation(e, o, i, a);
        } else e.draw(), r(new Z({ numSteps: 0, chart: e }));return e;
      }
    }, draw: function draw(t) {
      var e,
          n,
          i = this;if (i.clear(), V.isNullOrUndef(t) && (t = 1), i.transition(t), !(i.width <= 0 || i.height <= 0) && !1 !== Le.notify(i, "beforeDraw", [t])) {
        for (n = i._layers, e = 0; e < n.length && n[e].z <= 0; ++e) {
          n[e].draw(i.chartArea);
        }for (i.drawDatasets(t); e < n.length; ++e) {
          n[e].draw(i.chartArea);
        }i._drawTooltip(t), Le.notify(i, "afterDraw", [t]);
      }
    }, transition: function transition(t) {
      for (var e = 0, n = (this.data.datasets || []).length; e < n; ++e) {
        this.isDatasetVisible(e) && this.getDatasetMeta(e).controller.transition(t);
      }this.tooltip.transition(t);
    }, _getSortedDatasetMetas: function _getSortedDatasetMetas(t) {
      var e,
          n,
          i = [];for (e = 0, n = (this.data.datasets || []).length; e < n; ++e) {
        t && !this.isDatasetVisible(e) || i.push(this.getDatasetMeta(e));
      }return i.sort(Je("order", "index")), i;
    }, _getSortedVisibleDatasetMetas: function _getSortedVisibleDatasetMetas() {
      return this._getSortedDatasetMetas(!0);
    }, drawDatasets: function drawDatasets(t) {
      var e, n;if (!1 !== Le.notify(this, "beforeDatasetsDraw", [t])) {
        for (n = (e = this._getSortedVisibleDatasetMetas()).length - 1; n >= 0; --n) {
          this.drawDataset(e[n], t);
        }Le.notify(this, "afterDatasetsDraw", [t]);
      }
    }, drawDataset: function drawDataset(t, e) {
      var n = { meta: t, index: t.index, easingValue: e };!1 !== Le.notify(this, "beforeDatasetDraw", [n]) && (t.controller.draw(e), Le.notify(this, "afterDatasetDraw", [n]));
    }, _drawTooltip: function _drawTooltip(t) {
      var e = this.tooltip,
          n = { tooltip: e, easingValue: t };!1 !== Le.notify(this, "beforeTooltipDraw", [n]) && (e.draw(), Le.notify(this, "afterTooltipDraw", [n]));
    }, getElementAtEvent: function getElementAtEvent(t) {
      return ae.modes.single(this, t);
    }, getElementsAtEvent: function getElementsAtEvent(t) {
      return ae.modes.label(this, t, { intersect: !0 });
    }, getElementsAtXAxis: function getElementsAtXAxis(t) {
      return ae.modes["x-axis"](this, t, { intersect: !0 });
    }, getElementsAtEventForMode: function getElementsAtEventForMode(t, e, n) {
      var i = ae.modes[e];return "function" == typeof i ? i(this, t, n) : [];
    }, getDatasetAtEvent: function getDatasetAtEvent(t) {
      return ae.modes.dataset(this, t, { intersect: !0 });
    }, getDatasetMeta: function getDatasetMeta(t) {
      var e = this.data.datasets[t];e._meta || (e._meta = {});var n = e._meta[this.id];return n || (n = e._meta[this.id] = { type: null, data: [], dataset: null, controller: null, hidden: null, xAxisID: null, yAxisID: null, order: e.order || 0, index: t }), n;
    }, getVisibleDatasetCount: function getVisibleDatasetCount() {
      for (var t = 0, e = 0, n = this.data.datasets.length; e < n; ++e) {
        this.isDatasetVisible(e) && t++;
      }return t;
    }, isDatasetVisible: function isDatasetVisible(t) {
      var e = this.getDatasetMeta(t);return "boolean" == typeof e.hidden ? !e.hidden : !this.data.datasets[t].hidden;
    }, generateLegend: function generateLegend() {
      return this.options.legendCallback(this);
    }, destroyDatasetMeta: function destroyDatasetMeta(t) {
      var e = this.id,
          n = this.data.datasets[t],
          i = n._meta && n._meta[e];i && (i.controller.destroy(), delete n._meta[e]);
    }, destroy: function destroy() {
      var t,
          e,
          n = this,
          i = n.canvas;for (n.stop(), t = 0, e = n.data.datasets.length; t < e; ++t) {
        n.destroyDatasetMeta(t);
      }i && (n.unbindEvents(), V.canvas.clear(n), Fe.releaseContext(n.ctx), n.canvas = null, n.ctx = null), Le.notify(n, "destroy"), delete Qe.instances[n.id];
    }, toBase64Image: function toBase64Image() {
      return this.canvas.toDataURL.apply(this.canvas, arguments);
    }, initToolTip: function initToolTip() {
      var t = this;t.tooltip = new Ue({ _chart: t, _chartInstance: t, _data: t.data, _options: t.options.tooltips }, t);
    }, bindEvents: function bindEvents() {
      var t = this,
          e = t._listeners = {},
          n = function n() {
        t.eventHandler.apply(t, arguments);
      };V.each(t.options.events, function (i) {
        Fe.addEventListener(t, i, n), e[i] = n;
      }), t.options.responsive && (n = function n() {
        t.resize();
      }, Fe.addEventListener(t, "resize", n), e.resize = n);
    }, unbindEvents: function unbindEvents() {
      var t = this,
          e = t._listeners;e && (delete t._listeners, V.each(e, function (e, n) {
        Fe.removeEventListener(t, n, e);
      }));
    }, updateHoverStyle: function updateHoverStyle(t, e, n) {
      var i,
          a,
          r,
          o = n ? "set" : "remove";for (a = 0, r = t.length; a < r; ++a) {
        (i = t[a]) && this.getDatasetMeta(i._datasetIndex).controller[o + "HoverStyle"](i);
      }"dataset" === e && this.getDatasetMeta(t[0]._datasetIndex).controller["_" + o + "DatasetHoverStyle"]();
    }, eventHandler: function eventHandler(t) {
      var e = this,
          n = e.tooltip;if (!1 !== Le.notify(e, "beforeEvent", [t])) {
        e._bufferedRender = !0, e._bufferedRequest = null;var i = e.handleEvent(t);n && (i = n._start ? n.handleEvent(t) : i | n.handleEvent(t)), Le.notify(e, "afterEvent", [t]);var a = e._bufferedRequest;return a ? e.render(a) : i && !e.animating && (e.stop(), e.render({ duration: e.options.hover.animationDuration, lazy: !0 })), e._bufferedRender = !1, e._bufferedRequest = null, e;
      }
    }, handleEvent: function handleEvent(t) {
      var e,
          n = this,
          i = n.options || {},
          a = i.hover;return n.lastActive = n.lastActive || [], "mouseout" === t.type ? n.active = [] : n.active = n.getElementsAtEventForMode(t, a.mode, a), V.callback(i.onHover || i.hover.onHover, [t.native, n.active], n), "mouseup" !== t.type && "click" !== t.type || i.onClick && i.onClick.call(n, t.native, n.active), n.lastActive.length && n.updateHoverStyle(n.lastActive, a.mode, !1), n.active.length && a.mode && n.updateHoverStyle(n.active, a.mode, !0), e = !V.arrayEquals(n.active, n.lastActive), n.lastActive = n.active, e;
    } }), Qe.instances = {};var tn = Qe;Qe.Controller = Qe, Qe.types = {}, V.configMerge = Xe, V.scaleMerge = Ge;function en() {
    throw new Error("This method is not implemented: either no adapter can be found or an incomplete integration was provided.");
  }function nn(t) {
    this.options = t || {};
  }V.extend(nn.prototype, { formats: en, parse: en, format: en, add: en, diff: en, startOf: en, endOf: en, _create: function _create(t) {
      return t;
    } }), nn.override = function (t) {
    V.extend(nn.prototype, t);
  };var an = { _date: nn },
      rn = { formatters: { values: function values(t) {
        return V.isArray(t) ? t : "" + t;
      }, linear: function linear(t, e, n) {
        var i = n.length > 3 ? n[2] - n[1] : n[1] - n[0];Math.abs(i) > 1 && t !== Math.floor(t) && (i = t - Math.floor(t));var a = V.log10(Math.abs(i)),
            r = "";if (0 !== t) {
          if (Math.max(Math.abs(n[0]), Math.abs(n[n.length - 1])) < 1e-4) {
            var o = V.log10(Math.abs(t)),
                s = Math.floor(o) - Math.floor(a);s = Math.max(Math.min(s, 20), 0), r = t.toExponential(s);
          } else {
            var l = -1 * Math.floor(a);l = Math.max(Math.min(l, 20), 0), r = t.toFixed(l);
          }
        } else r = "0";return r;
      }, logarithmic: function logarithmic(t, e, n) {
        var i = t / Math.pow(10, Math.floor(V.log10(t)));return 0 === t ? "0" : 1 === i || 2 === i || 5 === i || 0 === e || e === n.length - 1 ? t.toExponential() : "";
      } } },
      on = V.isArray,
      sn = V.isNullOrUndef,
      ln = V.valueOrDefault,
      un = V.valueAtIndexOrDefault;function dn(t, e, n) {
    var i,
        a = t.getTicks().length,
        r = Math.min(e, a - 1),
        o = t.getPixelForTick(r),
        s = t._startPixel,
        l = t._endPixel;if (!(n && (i = 1 === a ? Math.max(o - s, l - o) : 0 === e ? (t.getPixelForTick(1) - o) / 2 : (o - t.getPixelForTick(r - 1)) / 2, (o += r < e ? i : -i) < s - 1e-6 || o > l + 1e-6))) return o;
  }function hn(t, e, n, i) {
    var a,
        r,
        o,
        s,
        l,
        u,
        d,
        h,
        c,
        f,
        g,
        p,
        m,
        v = n.length,
        b = [],
        x = [],
        y = [];for (a = 0; a < v; ++a) {
      if (s = n[a].label, l = n[a].major ? e.major : e.minor, t.font = u = l.string, d = i[u] = i[u] || { data: {}, gc: [] }, h = l.lineHeight, c = f = 0, sn(s) || on(s)) {
        if (on(s)) for (r = 0, o = s.length; r < o; ++r) {
          g = s[r], sn(g) || on(g) || (c = V.measureText(t, d.data, d.gc, c, g), f += h);
        }
      } else c = V.measureText(t, d.data, d.gc, c, s), f = h;b.push(c), x.push(f), y.push(h / 2);
    }function _(t) {
      return { width: b[t] || 0, height: x[t] || 0, offset: y[t] || 0 };
    }return function (t, e) {
      V.each(t, function (t) {
        var n,
            i = t.gc,
            a = i.length / 2;if (a > e) {
          for (n = 0; n < a; ++n) {
            delete t.data[i[n]];
          }i.splice(0, a);
        }
      });
    }(i, v), p = b.indexOf(Math.max.apply(null, b)), m = x.indexOf(Math.max.apply(null, x)), { first: _(0), last: _(v - 1), widest: _(p), highest: _(m) };
  }function cn(t) {
    return t.drawTicks ? t.tickMarkLength : 0;
  }function fn(t) {
    var e, n;return t.display ? (e = V.options._parseFont(t), n = V.options.toPadding(t.padding), e.lineHeight + n.height) : 0;
  }function gn(t, e) {
    return V.extend(V.options._parseFont({ fontFamily: ln(e.fontFamily, t.fontFamily), fontSize: ln(e.fontSize, t.fontSize), fontStyle: ln(e.fontStyle, t.fontStyle), lineHeight: ln(e.lineHeight, t.lineHeight) }), { color: V.options.resolve([e.fontColor, t.fontColor, z.global.defaultFontColor]) });
  }function pn(t) {
    var e = gn(t, t.minor);return { minor: e, major: t.major.enabled ? gn(t, t.major) : e };
  }function mn(t) {
    var e,
        n,
        i,
        a = [];for (n = 0, i = t.length; n < i; ++n) {
      void 0 !== (e = t[n])._index && a.push(e);
    }return a;
  }function vn(t, e, n, i) {
    var a,
        r,
        o,
        s,
        l = ln(n, 0),
        u = Math.min(ln(i, t.length), t.length),
        d = 0;for (e = Math.ceil(e), i && (e = (a = i - n) / Math.floor(a / e)), s = l; s < 0;) {
      d++, s = Math.round(l + d * e);
    }for (r = Math.max(l, 0); r < u; r++) {
      o = t[r], r === s ? (o._index = r, d++, s = Math.round(l + d * e)) : delete o.label;
    }
  }z._set("scale", { display: !0, position: "left", offset: !1, gridLines: { display: !0, color: "rgba(0,0,0,0.1)", lineWidth: 1, drawBorder: !0, drawOnChartArea: !0, drawTicks: !0, tickMarkLength: 10, zeroLineWidth: 1, zeroLineColor: "rgba(0,0,0,0.25)", zeroLineBorderDash: [], zeroLineBorderDashOffset: 0, offsetGridLines: !1, borderDash: [], borderDashOffset: 0 }, scaleLabel: { display: !1, labelString: "", padding: { top: 4, bottom: 4 } }, ticks: { beginAtZero: !1, minRotation: 0, maxRotation: 50, mirror: !1, padding: 0, reverse: !1, display: !0, autoSkip: !0, autoSkipPadding: 0, labelOffset: 0, callback: rn.formatters.values, minor: {}, major: {} } });var bn = X.extend({ zeroLineIndex: 0, getPadding: function getPadding() {
      return { left: this.paddingLeft || 0, top: this.paddingTop || 0, right: this.paddingRight || 0, bottom: this.paddingBottom || 0 };
    }, getTicks: function getTicks() {
      return this._ticks;
    }, _getLabels: function _getLabels() {
      var t = this.chart.data;return this.options.labels || (this.isHorizontal() ? t.xLabels : t.yLabels) || t.labels || [];
    }, mergeTicksOptions: function mergeTicksOptions() {}, beforeUpdate: function beforeUpdate() {
      V.callback(this.options.beforeUpdate, [this]);
    }, update: function update(t, e, n) {
      var i,
          a,
          r,
          o,
          s,
          l = this,
          u = l.options.ticks,
          d = u.sampleSize;if (l.beforeUpdate(), l.maxWidth = t, l.maxHeight = e, l.margins = V.extend({ left: 0, right: 0, top: 0, bottom: 0 }, n), l._ticks = null, l.ticks = null, l._labelSizes = null, l._maxLabelLines = 0, l.longestLabelWidth = 0, l.longestTextCache = l.longestTextCache || {}, l._gridLineItems = null, l._labelItems = null, l.beforeSetDimensions(), l.setDimensions(), l.afterSetDimensions(), l.beforeDataLimits(), l.determineDataLimits(), l.afterDataLimits(), l.beforeBuildTicks(), o = l.buildTicks() || [], (!(o = l.afterBuildTicks(o) || o) || !o.length) && l.ticks) for (o = [], i = 0, a = l.ticks.length; i < a; ++i) {
        o.push({ value: l.ticks[i], major: !1 });
      }return l._ticks = o, s = d < o.length, r = l._convertTicksToLabels(s ? function (t, e) {
        for (var n = [], i = t.length / e, a = 0, r = t.length; a < r; a += i) {
          n.push(t[Math.floor(a)]);
        }return n;
      }(o, d) : o), l._configure(), l.beforeCalculateTickRotation(), l.calculateTickRotation(), l.afterCalculateTickRotation(), l.beforeFit(), l.fit(), l.afterFit(), l._ticksToDraw = u.display && (u.autoSkip || "auto" === u.source) ? l._autoSkip(o) : o, s && (r = l._convertTicksToLabels(l._ticksToDraw)), l.ticks = r, l.afterUpdate(), l.minSize;
    }, _configure: function _configure() {
      var t,
          e,
          n = this,
          i = n.options.ticks.reverse;n.isHorizontal() ? (t = n.left, e = n.right) : (t = n.top, e = n.bottom, i = !i), n._startPixel = t, n._endPixel = e, n._reversePixels = i, n._length = e - t;
    }, afterUpdate: function afterUpdate() {
      V.callback(this.options.afterUpdate, [this]);
    }, beforeSetDimensions: function beforeSetDimensions() {
      V.callback(this.options.beforeSetDimensions, [this]);
    }, setDimensions: function setDimensions() {
      var t = this;t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0;
    }, afterSetDimensions: function afterSetDimensions() {
      V.callback(this.options.afterSetDimensions, [this]);
    }, beforeDataLimits: function beforeDataLimits() {
      V.callback(this.options.beforeDataLimits, [this]);
    }, determineDataLimits: V.noop, afterDataLimits: function afterDataLimits() {
      V.callback(this.options.afterDataLimits, [this]);
    }, beforeBuildTicks: function beforeBuildTicks() {
      V.callback(this.options.beforeBuildTicks, [this]);
    }, buildTicks: V.noop, afterBuildTicks: function afterBuildTicks(t) {
      var e = this;return on(t) && t.length ? V.callback(e.options.afterBuildTicks, [e, t]) : (e.ticks = V.callback(e.options.afterBuildTicks, [e, e.ticks]) || e.ticks, t);
    }, beforeTickToLabelConversion: function beforeTickToLabelConversion() {
      V.callback(this.options.beforeTickToLabelConversion, [this]);
    }, convertTicksToLabels: function convertTicksToLabels() {
      var t = this.options.ticks;this.ticks = this.ticks.map(t.userCallback || t.callback, this);
    }, afterTickToLabelConversion: function afterTickToLabelConversion() {
      V.callback(this.options.afterTickToLabelConversion, [this]);
    }, beforeCalculateTickRotation: function beforeCalculateTickRotation() {
      V.callback(this.options.beforeCalculateTickRotation, [this]);
    }, calculateTickRotation: function calculateTickRotation() {
      var t,
          e,
          n,
          i,
          a,
          r,
          o,
          s = this,
          l = s.options,
          u = l.ticks,
          d = s.getTicks().length,
          h = u.minRotation || 0,
          c = u.maxRotation,
          f = h;!s._isVisible() || !u.display || h >= c || d <= 1 || !s.isHorizontal() ? s.labelRotation = h : (e = (t = s._getLabelSizes()).widest.width, n = t.highest.height - t.highest.offset, i = Math.min(s.maxWidth, s.chart.width - e), e + 6 > (a = l.offset ? s.maxWidth / d : i / (d - 1)) && (a = i / (d - (l.offset ? .5 : 1)), r = s.maxHeight - cn(l.gridLines) - u.padding - fn(l.scaleLabel), o = Math.sqrt(e * e + n * n), f = V.toDegrees(Math.min(Math.asin(Math.min((t.highest.height + 6) / a, 1)), Math.asin(Math.min(r / o, 1)) - Math.asin(n / o))), f = Math.max(h, Math.min(c, f))), s.labelRotation = f);
    }, afterCalculateTickRotation: function afterCalculateTickRotation() {
      V.callback(this.options.afterCalculateTickRotation, [this]);
    }, beforeFit: function beforeFit() {
      V.callback(this.options.beforeFit, [this]);
    }, fit: function fit() {
      var t = this,
          e = t.minSize = { width: 0, height: 0 },
          n = t.chart,
          i = t.options,
          a = i.ticks,
          r = i.scaleLabel,
          o = i.gridLines,
          s = t._isVisible(),
          l = "bottom" === i.position,
          u = t.isHorizontal();if (u ? e.width = t.maxWidth : s && (e.width = cn(o) + fn(r)), u ? s && (e.height = cn(o) + fn(r)) : e.height = t.maxHeight, a.display && s) {
        var d = pn(a),
            h = t._getLabelSizes(),
            c = h.first,
            f = h.last,
            g = h.widest,
            p = h.highest,
            m = .4 * d.minor.lineHeight,
            v = a.padding;if (u) {
          var b = 0 !== t.labelRotation,
              x = V.toRadians(t.labelRotation),
              y = Math.cos(x),
              _ = Math.sin(x),
              k = _ * g.width + y * (p.height - (b ? p.offset : 0)) + (b ? 0 : m);e.height = Math.min(t.maxHeight, e.height + k + v);var w,
              M,
              S = t.getPixelForTick(0) - t.left,
              C = t.right - t.getPixelForTick(t.getTicks().length - 1);b ? (w = l ? y * c.width + _ * c.offset : _ * (c.height - c.offset), M = l ? _ * (f.height - f.offset) : y * f.width + _ * f.offset) : (w = c.width / 2, M = f.width / 2), t.paddingLeft = Math.max((w - S) * t.width / (t.width - S), 0) + 3, t.paddingRight = Math.max((M - C) * t.width / (t.width - C), 0) + 3;
        } else {
          var P = a.mirror ? 0 : g.width + v + m;e.width = Math.min(t.maxWidth, e.width + P), t.paddingTop = c.height / 2, t.paddingBottom = f.height / 2;
        }
      }t.handleMargins(), u ? (t.width = t._length = n.width - t.margins.left - t.margins.right, t.height = e.height) : (t.width = e.width, t.height = t._length = n.height - t.margins.top - t.margins.bottom);
    }, handleMargins: function handleMargins() {
      var t = this;t.margins && (t.margins.left = Math.max(t.paddingLeft, t.margins.left), t.margins.top = Math.max(t.paddingTop, t.margins.top), t.margins.right = Math.max(t.paddingRight, t.margins.right), t.margins.bottom = Math.max(t.paddingBottom, t.margins.bottom));
    }, afterFit: function afterFit() {
      V.callback(this.options.afterFit, [this]);
    }, isHorizontal: function isHorizontal() {
      var t = this.options.position;return "top" === t || "bottom" === t;
    }, isFullWidth: function isFullWidth() {
      return this.options.fullWidth;
    }, getRightValue: function getRightValue(t) {
      if (sn(t)) return NaN;if (("number" == typeof t || t instanceof Number) && !isFinite(t)) return NaN;if (t) if (this.isHorizontal()) {
        if (void 0 !== t.x) return this.getRightValue(t.x);
      } else if (void 0 !== t.y) return this.getRightValue(t.y);return t;
    }, _convertTicksToLabels: function _convertTicksToLabels(t) {
      var e,
          n,
          i,
          a = this;for (a.ticks = t.map(function (t) {
        return t.value;
      }), a.beforeTickToLabelConversion(), e = a.convertTicksToLabels(t) || a.ticks, a.afterTickToLabelConversion(), n = 0, i = t.length; n < i; ++n) {
        t[n].label = e[n];
      }return e;
    }, _getLabelSizes: function _getLabelSizes() {
      var t = this,
          e = t._labelSizes;return e || (t._labelSizes = e = hn(t.ctx, pn(t.options.ticks), t.getTicks(), t.longestTextCache), t.longestLabelWidth = e.widest.width), e;
    }, _parseValue: function _parseValue(t) {
      var e, n, i, a;return on(t) ? (e = +this.getRightValue(t[0]), n = +this.getRightValue(t[1]), i = Math.min(e, n), a = Math.max(e, n)) : (e = void 0, n = t = +this.getRightValue(t), i = t, a = t), { min: i, max: a, start: e, end: n };
    }, _getScaleLabel: function _getScaleLabel(t) {
      var e = this._parseValue(t);return void 0 !== e.start ? "[" + e.start + ", " + e.end + "]" : +this.getRightValue(t);
    }, getLabelForIndex: V.noop, getPixelForValue: V.noop, getValueForPixel: V.noop, getPixelForTick: function getPixelForTick(t) {
      var e = this.options.offset,
          n = this._ticks.length,
          i = 1 / Math.max(n - (e ? 0 : 1), 1);return t < 0 || t > n - 1 ? null : this.getPixelForDecimal(t * i + (e ? i / 2 : 0));
    }, getPixelForDecimal: function getPixelForDecimal(t) {
      return this._reversePixels && (t = 1 - t), this._startPixel + t * this._length;
    }, getDecimalForPixel: function getDecimalForPixel(t) {
      var e = (t - this._startPixel) / this._length;return this._reversePixels ? 1 - e : e;
    }, getBasePixel: function getBasePixel() {
      return this.getPixelForValue(this.getBaseValue());
    }, getBaseValue: function getBaseValue() {
      var t = this.min,
          e = this.max;return this.beginAtZero ? 0 : t < 0 && e < 0 ? e : t > 0 && e > 0 ? t : 0;
    }, _autoSkip: function _autoSkip(t) {
      var e,
          n,
          i,
          a,
          r = this.options.ticks,
          o = this._length,
          s = r.maxTicksLimit || o / this._tickSize() + 1,
          l = r.major.enabled ? function (t) {
        var e,
            n,
            i = [];for (e = 0, n = t.length; e < n; e++) {
          t[e].major && i.push(e);
        }return i;
      }(t) : [],
          u = l.length,
          d = l[0],
          h = l[u - 1];if (u > s) return function (t, e, n) {
        var i,
            a,
            r = 0,
            o = e[0];for (n = Math.ceil(n), i = 0; i < t.length; i++) {
          a = t[i], i === o ? (a._index = i, o = e[++r * n]) : delete a.label;
        }
      }(t, l, u / s), mn(t);if (i = function (t, e, n, i) {
        var a,
            r,
            o,
            s,
            l = function (t) {
          var e,
              n,
              i = t.length;if (i < 2) return !1;for (n = t[0], e = 1; e < i; ++e) {
            if (t[e] - t[e - 1] !== n) return !1;
          }return n;
        }(t),
            u = (e.length - 1) / i;if (!l) return Math.max(u, 1);for (o = 0, s = (a = V.math._factorize(l)).length - 1; o < s; o++) {
          if ((r = a[o]) > u) return r;
        }return Math.max(u, 1);
      }(l, t, 0, s), u > 0) {
        for (e = 0, n = u - 1; e < n; e++) {
          vn(t, i, l[e], l[e + 1]);
        }return a = u > 1 ? (h - d) / (u - 1) : null, vn(t, i, V.isNullOrUndef(a) ? 0 : d - a, d), vn(t, i, h, V.isNullOrUndef(a) ? t.length : h + a), mn(t);
      }return vn(t, i), mn(t);
    }, _tickSize: function _tickSize() {
      var t = this.options.ticks,
          e = V.toRadians(this.labelRotation),
          n = Math.abs(Math.cos(e)),
          i = Math.abs(Math.sin(e)),
          a = this._getLabelSizes(),
          r = t.autoSkipPadding || 0,
          o = a ? a.widest.width + r : 0,
          s = a ? a.highest.height + r : 0;return this.isHorizontal() ? s * n > o * i ? o / n : s / i : s * i < o * n ? s / n : o / i;
    }, _isVisible: function _isVisible() {
      var t,
          e,
          n,
          i = this.chart,
          a = this.options.display;if ("auto" !== a) return !!a;for (t = 0, e = i.data.datasets.length; t < e; ++t) {
        if (i.isDatasetVisible(t) && ((n = i.getDatasetMeta(t)).xAxisID === this.id || n.yAxisID === this.id)) return !0;
      }return !1;
    }, _computeGridLineItems: function _computeGridLineItems(t) {
      var e,
          n,
          i,
          a,
          r,
          o,
          s,
          l,
          u,
          d,
          h,
          c,
          f,
          g,
          p,
          m,
          v,
          b = this,
          x = b.chart,
          y = b.options,
          _ = y.gridLines,
          k = y.position,
          w = _.offsetGridLines,
          M = b.isHorizontal(),
          S = b._ticksToDraw,
          C = S.length + (w ? 1 : 0),
          P = cn(_),
          A = [],
          D = _.drawBorder ? un(_.lineWidth, 0, 0) : 0,
          T = D / 2,
          I = V._alignPixel,
          F = function F(t) {
        return I(x, t, D);
      };for ("top" === k ? (e = F(b.bottom), s = b.bottom - P, u = e - T, h = F(t.top) + T, f = t.bottom) : "bottom" === k ? (e = F(b.top), h = t.top, f = F(t.bottom) - T, s = e + T, u = b.top + P) : "left" === k ? (e = F(b.right), o = b.right - P, l = e - T, d = F(t.left) + T, c = t.right) : (e = F(b.left), d = t.left, c = F(t.right) - T, o = e + T, l = b.left + P), n = 0; n < C; ++n) {
        i = S[n] || {}, sn(i.label) && n < S.length || (n === b.zeroLineIndex && y.offset === w ? (g = _.zeroLineWidth, p = _.zeroLineColor, m = _.zeroLineBorderDash || [], v = _.zeroLineBorderDashOffset || 0) : (g = un(_.lineWidth, n, 1), p = un(_.color, n, "rgba(0,0,0,0.1)"), m = _.borderDash || [], v = _.borderDashOffset || 0), void 0 !== (a = dn(b, i._index || n, w)) && (r = I(x, a, g), M ? o = l = d = c = r : s = u = h = f = r, A.push({ tx1: o, ty1: s, tx2: l, ty2: u, x1: d, y1: h, x2: c, y2: f, width: g, color: p, borderDash: m, borderDashOffset: v })));
      }return A.ticksLength = C, A.borderValue = e, A;
    }, _computeLabelItems: function _computeLabelItems() {
      var t,
          e,
          n,
          i,
          a,
          r,
          o,
          s,
          l,
          u,
          d,
          h,
          c = this,
          f = c.options,
          g = f.ticks,
          p = f.position,
          m = g.mirror,
          v = c.isHorizontal(),
          b = c._ticksToDraw,
          x = pn(g),
          y = g.padding,
          _ = cn(f.gridLines),
          k = -V.toRadians(c.labelRotation),
          w = [];for ("top" === p ? (r = c.bottom - _ - y, o = k ? "left" : "center") : "bottom" === p ? (r = c.top + _ + y, o = k ? "right" : "center") : "left" === p ? (a = c.right - (m ? 0 : _) - y, o = m ? "left" : "right") : (a = c.left + (m ? 0 : _) + y, o = m ? "right" : "left"), t = 0, e = b.length; t < e; ++t) {
        i = (n = b[t]).label, sn(i) || (s = c.getPixelForTick(n._index || t) + g.labelOffset, u = (l = n.major ? x.major : x.minor).lineHeight, d = on(i) ? i.length : 1, v ? (a = s, h = "top" === p ? ((k ? 1 : .5) - d) * u : (k ? 0 : .5) * u) : (r = s, h = (1 - d) * u / 2), w.push({ x: a, y: r, rotation: k, label: i, font: l, textOffset: h, textAlign: o }));
      }return w;
    }, _drawGrid: function _drawGrid(t) {
      var e = this,
          n = e.options.gridLines;if (n.display) {
        var i,
            a,
            r,
            o,
            s,
            l = e.ctx,
            u = e.chart,
            d = V._alignPixel,
            h = n.drawBorder ? un(n.lineWidth, 0, 0) : 0,
            c = e._gridLineItems || (e._gridLineItems = e._computeGridLineItems(t));for (r = 0, o = c.length; r < o; ++r) {
          i = (s = c[r]).width, a = s.color, i && a && (l.save(), l.lineWidth = i, l.strokeStyle = a, l.setLineDash && (l.setLineDash(s.borderDash), l.lineDashOffset = s.borderDashOffset), l.beginPath(), n.drawTicks && (l.moveTo(s.tx1, s.ty1), l.lineTo(s.tx2, s.ty2)), n.drawOnChartArea && (l.moveTo(s.x1, s.y1), l.lineTo(s.x2, s.y2)), l.stroke(), l.restore());
        }if (h) {
          var f,
              g,
              p,
              m,
              v = h,
              b = un(n.lineWidth, c.ticksLength - 1, 1),
              x = c.borderValue;e.isHorizontal() ? (f = d(u, e.left, v) - v / 2, g = d(u, e.right, b) + b / 2, p = m = x) : (p = d(u, e.top, v) - v / 2, m = d(u, e.bottom, b) + b / 2, f = g = x), l.lineWidth = h, l.strokeStyle = un(n.color, 0), l.beginPath(), l.moveTo(f, p), l.lineTo(g, m), l.stroke();
        }
      }
    }, _drawLabels: function _drawLabels() {
      var t = this;if (t.options.ticks.display) {
        var e,
            n,
            i,
            a,
            r,
            o,
            s,
            l,
            u = t.ctx,
            d = t._labelItems || (t._labelItems = t._computeLabelItems());for (e = 0, i = d.length; e < i; ++e) {
          if (o = (r = d[e]).font, u.save(), u.translate(r.x, r.y), u.rotate(r.rotation), u.font = o.string, u.fillStyle = o.color, u.textBaseline = "middle", u.textAlign = r.textAlign, s = r.label, l = r.textOffset, on(s)) for (n = 0, a = s.length; n < a; ++n) {
            u.fillText("" + s[n], 0, l), l += o.lineHeight;
          } else u.fillText(s, 0, l);u.restore();
        }
      }
    }, _drawTitle: function _drawTitle() {
      var t = this,
          e = t.ctx,
          n = t.options,
          i = n.scaleLabel;if (i.display) {
        var a,
            r,
            o = ln(i.fontColor, z.global.defaultFontColor),
            s = V.options._parseFont(i),
            l = V.options.toPadding(i.padding),
            u = s.lineHeight / 2,
            d = n.position,
            h = 0;if (t.isHorizontal()) a = t.left + t.width / 2, r = "bottom" === d ? t.bottom - u - l.bottom : t.top + u + l.top;else {
          var c = "left" === d;a = c ? t.left + u + l.top : t.right - u - l.top, r = t.top + t.height / 2, h = c ? -.5 * Math.PI : .5 * Math.PI;
        }e.save(), e.translate(a, r), e.rotate(h), e.textAlign = "center", e.textBaseline = "middle", e.fillStyle = o, e.font = s.string, e.fillText(i.labelString, 0, 0), e.restore();
      }
    }, draw: function draw(t) {
      this._isVisible() && (this._drawGrid(t), this._drawTitle(), this._drawLabels());
    }, _layers: function _layers() {
      var t = this,
          e = t.options,
          n = e.ticks && e.ticks.z || 0,
          i = e.gridLines && e.gridLines.z || 0;return t._isVisible() && n !== i && t.draw === t._draw ? [{ z: i, draw: function draw() {
          t._drawGrid.apply(t, arguments), t._drawTitle.apply(t, arguments);
        } }, { z: n, draw: function draw() {
          t._drawLabels.apply(t, arguments);
        } }] : [{ z: n, draw: function draw() {
          t.draw.apply(t, arguments);
        } }];
    }, _getMatchingVisibleMetas: function _getMatchingVisibleMetas(t) {
      var e = this,
          n = e.isHorizontal();return e.chart._getSortedVisibleDatasetMetas().filter(function (i) {
        return (!t || i.type === t) && (n ? i.xAxisID === e.id : i.yAxisID === e.id);
      });
    } });bn.prototype._draw = bn.prototype.draw;var xn = bn,
      yn = V.isNullOrUndef,
      _n = xn.extend({ determineDataLimits: function determineDataLimits() {
      var t,
          e = this,
          n = e._getLabels(),
          i = e.options.ticks,
          a = i.min,
          r = i.max,
          o = 0,
          s = n.length - 1;void 0 !== a && (t = n.indexOf(a)) >= 0 && (o = t), void 0 !== r && (t = n.indexOf(r)) >= 0 && (s = t), e.minIndex = o, e.maxIndex = s, e.min = n[o], e.max = n[s];
    }, buildTicks: function buildTicks() {
      var t = this._getLabels(),
          e = this.minIndex,
          n = this.maxIndex;this.ticks = 0 === e && n === t.length - 1 ? t : t.slice(e, n + 1);
    }, getLabelForIndex: function getLabelForIndex(t, e) {
      var n = this.chart;return n.getDatasetMeta(e).controller._getValueScaleId() === this.id ? this.getRightValue(n.data.datasets[e].data[t]) : this._getLabels()[t];
    }, _configure: function _configure() {
      var t = this,
          e = t.options.offset,
          n = t.ticks;xn.prototype._configure.call(t), t.isHorizontal() || (t._reversePixels = !t._reversePixels), n && (t._startValue = t.minIndex - (e ? .5 : 0), t._valueRange = Math.max(n.length - (e ? 0 : 1), 1));
    }, getPixelForValue: function getPixelForValue(t, e, n) {
      var i,
          a,
          r,
          o = this;return yn(e) || yn(n) || (t = o.chart.data.datasets[n].data[e]), yn(t) || (i = o.isHorizontal() ? t.x : t.y), (void 0 !== i || void 0 !== t && isNaN(e)) && (a = o._getLabels(), t = V.valueOrDefault(i, t), e = -1 !== (r = a.indexOf(t)) ? r : e, isNaN(e) && (e = t)), o.getPixelForDecimal((e - o._startValue) / o._valueRange);
    }, getPixelForTick: function getPixelForTick(t) {
      var e = this.ticks;return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t], t + this.minIndex);
    }, getValueForPixel: function getValueForPixel(t) {
      var e = Math.round(this._startValue + this.getDecimalForPixel(t) * this._valueRange);return Math.min(Math.max(e, 0), this.ticks.length - 1);
    }, getBasePixel: function getBasePixel() {
      return this.bottom;
    } }),
      kn = { position: "bottom" };_n._defaults = kn;var wn = V.noop,
      Mn = V.isNullOrUndef;var Sn = xn.extend({ getRightValue: function getRightValue(t) {
      return "string" == typeof t ? +t : xn.prototype.getRightValue.call(this, t);
    }, handleTickRangeOptions: function handleTickRangeOptions() {
      var t = this,
          e = t.options.ticks;if (e.beginAtZero) {
        var n = V.sign(t.min),
            i = V.sign(t.max);n < 0 && i < 0 ? t.max = 0 : n > 0 && i > 0 && (t.min = 0);
      }var a = void 0 !== e.min || void 0 !== e.suggestedMin,
          r = void 0 !== e.max || void 0 !== e.suggestedMax;void 0 !== e.min ? t.min = e.min : void 0 !== e.suggestedMin && (null === t.min ? t.min = e.suggestedMin : t.min = Math.min(t.min, e.suggestedMin)), void 0 !== e.max ? t.max = e.max : void 0 !== e.suggestedMax && (null === t.max ? t.max = e.suggestedMax : t.max = Math.max(t.max, e.suggestedMax)), a !== r && t.min >= t.max && (a ? t.max = t.min + 1 : t.min = t.max - 1), t.min === t.max && (t.max++, e.beginAtZero || t.min--);
    }, getTickLimit: function getTickLimit() {
      var t,
          e = this.options.ticks,
          n = e.stepSize,
          i = e.maxTicksLimit;return n ? t = Math.ceil(this.max / n) - Math.floor(this.min / n) + 1 : (t = this._computeTickLimit(), i = i || 11), i && (t = Math.min(i, t)), t;
    }, _computeTickLimit: function _computeTickLimit() {
      return Number.POSITIVE_INFINITY;
    }, handleDirectionalChanges: wn, buildTicks: function buildTicks() {
      var t = this,
          e = t.options.ticks,
          n = t.getTickLimit(),
          i = { maxTicks: n = Math.max(2, n), min: e.min, max: e.max, precision: e.precision, stepSize: V.valueOrDefault(e.fixedStepSize, e.stepSize) },
          a = t.ticks = function (t, e) {
        var n,
            i,
            a,
            r,
            o = [],
            s = t.stepSize,
            l = s || 1,
            u = t.maxTicks - 1,
            d = t.min,
            h = t.max,
            c = t.precision,
            f = e.min,
            g = e.max,
            p = V.niceNum((g - f) / u / l) * l;if (p < 1e-14 && Mn(d) && Mn(h)) return [f, g];(r = Math.ceil(g / p) - Math.floor(f / p)) > u && (p = V.niceNum(r * p / u / l) * l), s || Mn(c) ? n = Math.pow(10, V._decimalPlaces(p)) : (n = Math.pow(10, c), p = Math.ceil(p * n) / n), i = Math.floor(f / p) * p, a = Math.ceil(g / p) * p, s && (!Mn(d) && V.almostWhole(d / p, p / 1e3) && (i = d), !Mn(h) && V.almostWhole(h / p, p / 1e3) && (a = h)), r = (a - i) / p, r = V.almostEquals(r, Math.round(r), p / 1e3) ? Math.round(r) : Math.ceil(r), i = Math.round(i * n) / n, a = Math.round(a * n) / n, o.push(Mn(d) ? i : d);for (var m = 1; m < r; ++m) {
          o.push(Math.round((i + m * p) * n) / n);
        }return o.push(Mn(h) ? a : h), o;
      }(i, t);t.handleDirectionalChanges(), t.max = V.max(a), t.min = V.min(a), e.reverse ? (a.reverse(), t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max);
    }, convertTicksToLabels: function convertTicksToLabels() {
      var t = this;t.ticksAsNumbers = t.ticks.slice(), t.zeroLineIndex = t.ticks.indexOf(0), xn.prototype.convertTicksToLabels.call(t);
    }, _configure: function _configure() {
      var t,
          e = this,
          n = e.getTicks(),
          i = e.min,
          a = e.max;xn.prototype._configure.call(e), e.options.offset && n.length && (i -= t = (a - i) / Math.max(n.length - 1, 1) / 2, a += t), e._startValue = i, e._endValue = a, e._valueRange = a - i;
    } }),
      Cn = { position: "left", ticks: { callback: rn.formatters.linear } };function Pn(t, e, n, i) {
    var a,
        r,
        o = t.options,
        s = function (t, e, n) {
      var i = [n.type, void 0 === e && void 0 === n.stack ? n.index : "", n.stack].join(".");return void 0 === t[i] && (t[i] = { pos: [], neg: [] }), t[i];
    }(e, o.stacked, n),
        l = s.pos,
        u = s.neg,
        d = i.length;for (a = 0; a < d; ++a) {
      r = t._parseValue(i[a]), isNaN(r.min) || isNaN(r.max) || n.data[a].hidden || (l[a] = l[a] || 0, u[a] = u[a] || 0, o.relativePoints ? l[a] = 100 : r.min < 0 || r.max < 0 ? u[a] += r.min : l[a] += r.max);
    }
  }function An(t, e, n) {
    var i,
        a,
        r = n.length;for (i = 0; i < r; ++i) {
      a = t._parseValue(n[i]), isNaN(a.min) || isNaN(a.max) || e.data[i].hidden || (t.min = Math.min(t.min, a.min), t.max = Math.max(t.max, a.max));
    }
  }var Dn = Sn.extend({ determineDataLimits: function determineDataLimits() {
      var t,
          e,
          n,
          i,
          a = this,
          r = a.options,
          o = a.chart.data.datasets,
          s = a._getMatchingVisibleMetas(),
          l = r.stacked,
          u = {},
          d = s.length;if (a.min = Number.POSITIVE_INFINITY, a.max = Number.NEGATIVE_INFINITY, void 0 === l) for (t = 0; !l && t < d; ++t) {
        l = void 0 !== (e = s[t]).stack;
      }for (t = 0; t < d; ++t) {
        n = o[(e = s[t]).index].data, l ? Pn(a, u, e, n) : An(a, e, n);
      }V.each(u, function (t) {
        i = t.pos.concat(t.neg), a.min = Math.min(a.min, V.min(i)), a.max = Math.max(a.max, V.max(i));
      }), a.min = V.isFinite(a.min) && !isNaN(a.min) ? a.min : 0, a.max = V.isFinite(a.max) && !isNaN(a.max) ? a.max : 1, a.handleTickRangeOptions();
    }, _computeTickLimit: function _computeTickLimit() {
      var t;return this.isHorizontal() ? Math.ceil(this.width / 40) : (t = V.options._parseFont(this.options.ticks), Math.ceil(this.height / t.lineHeight));
    }, handleDirectionalChanges: function handleDirectionalChanges() {
      this.isHorizontal() || this.ticks.reverse();
    }, getLabelForIndex: function getLabelForIndex(t, e) {
      return this._getScaleLabel(this.chart.data.datasets[e].data[t]);
    }, getPixelForValue: function getPixelForValue(t) {
      return this.getPixelForDecimal((+this.getRightValue(t) - this._startValue) / this._valueRange);
    }, getValueForPixel: function getValueForPixel(t) {
      return this._startValue + this.getDecimalForPixel(t) * this._valueRange;
    }, getPixelForTick: function getPixelForTick(t) {
      var e = this.ticksAsNumbers;return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t]);
    } }),
      Tn = Cn;Dn._defaults = Tn;var In = V.valueOrDefault,
      Fn = V.math.log10;var Ln = { position: "left", ticks: { callback: rn.formatters.logarithmic } };function On(t, e) {
    return V.isFinite(t) && t >= 0 ? t : e;
  }var Rn = xn.extend({ determineDataLimits: function determineDataLimits() {
      var t,
          e,
          n,
          i,
          a,
          r,
          o = this,
          s = o.options,
          l = o.chart,
          u = l.data.datasets,
          d = o.isHorizontal();function h(t) {
        return d ? t.xAxisID === o.id : t.yAxisID === o.id;
      }o.min = Number.POSITIVE_INFINITY, o.max = Number.NEGATIVE_INFINITY, o.minNotZero = Number.POSITIVE_INFINITY;var c = s.stacked;if (void 0 === c) for (t = 0; t < u.length; t++) {
        if (e = l.getDatasetMeta(t), l.isDatasetVisible(t) && h(e) && void 0 !== e.stack) {
          c = !0;break;
        }
      }if (s.stacked || c) {
        var f = {};for (t = 0; t < u.length; t++) {
          var g = [(e = l.getDatasetMeta(t)).type, void 0 === s.stacked && void 0 === e.stack ? t : "", e.stack].join(".");if (l.isDatasetVisible(t) && h(e)) for (void 0 === f[g] && (f[g] = []), a = 0, r = (i = u[t].data).length; a < r; a++) {
            var p = f[g];n = o._parseValue(i[a]), isNaN(n.min) || isNaN(n.max) || e.data[a].hidden || n.min < 0 || n.max < 0 || (p[a] = p[a] || 0, p[a] += n.max);
          }
        }V.each(f, function (t) {
          if (t.length > 0) {
            var e = V.min(t),
                n = V.max(t);o.min = Math.min(o.min, e), o.max = Math.max(o.max, n);
          }
        });
      } else for (t = 0; t < u.length; t++) {
        if (e = l.getDatasetMeta(t), l.isDatasetVisible(t) && h(e)) for (a = 0, r = (i = u[t].data).length; a < r; a++) {
          n = o._parseValue(i[a]), isNaN(n.min) || isNaN(n.max) || e.data[a].hidden || n.min < 0 || n.max < 0 || (o.min = Math.min(n.min, o.min), o.max = Math.max(n.max, o.max), 0 !== n.min && (o.minNotZero = Math.min(n.min, o.minNotZero)));
        }
      }o.min = V.isFinite(o.min) ? o.min : null, o.max = V.isFinite(o.max) ? o.max : null, o.minNotZero = V.isFinite(o.minNotZero) ? o.minNotZero : null, this.handleTickRangeOptions();
    }, handleTickRangeOptions: function handleTickRangeOptions() {
      var t = this,
          e = t.options.ticks;t.min = On(e.min, t.min), t.max = On(e.max, t.max), t.min === t.max && (0 !== t.min && null !== t.min ? (t.min = Math.pow(10, Math.floor(Fn(t.min)) - 1), t.max = Math.pow(10, Math.floor(Fn(t.max)) + 1)) : (t.min = 1, t.max = 10)), null === t.min && (t.min = Math.pow(10, Math.floor(Fn(t.max)) - 1)), null === t.max && (t.max = 0 !== t.min ? Math.pow(10, Math.floor(Fn(t.min)) + 1) : 10), null === t.minNotZero && (t.min > 0 ? t.minNotZero = t.min : t.max < 1 ? t.minNotZero = Math.pow(10, Math.floor(Fn(t.max))) : t.minNotZero = 1);
    }, buildTicks: function buildTicks() {
      var t = this,
          e = t.options.ticks,
          n = !t.isHorizontal(),
          i = { min: On(e.min), max: On(e.max) },
          a = t.ticks = function (t, e) {
        var n,
            i,
            a = [],
            r = In(t.min, Math.pow(10, Math.floor(Fn(e.min)))),
            o = Math.floor(Fn(e.max)),
            s = Math.ceil(e.max / Math.pow(10, o));0 === r ? (n = Math.floor(Fn(e.minNotZero)), i = Math.floor(e.minNotZero / Math.pow(10, n)), a.push(r), r = i * Math.pow(10, n)) : (n = Math.floor(Fn(r)), i = Math.floor(r / Math.pow(10, n)));var l = n < 0 ? Math.pow(10, Math.abs(n)) : 1;do {
          a.push(r), 10 === ++i && (i = 1, l = ++n >= 0 ? 1 : l), r = Math.round(i * Math.pow(10, n) * l) / l;
        } while (n < o || n === o && i < s);var u = In(t.max, r);return a.push(u), a;
      }(i, t);t.max = V.max(a), t.min = V.min(a), e.reverse ? (n = !n, t.start = t.max, t.end = t.min) : (t.start = t.min, t.end = t.max), n && a.reverse();
    }, convertTicksToLabels: function convertTicksToLabels() {
      this.tickValues = this.ticks.slice(), xn.prototype.convertTicksToLabels.call(this);
    }, getLabelForIndex: function getLabelForIndex(t, e) {
      return this._getScaleLabel(this.chart.data.datasets[e].data[t]);
    }, getPixelForTick: function getPixelForTick(t) {
      var e = this.tickValues;return t < 0 || t > e.length - 1 ? null : this.getPixelForValue(e[t]);
    }, _getFirstTickValue: function _getFirstTickValue(t) {
      var e = Math.floor(Fn(t));return Math.floor(t / Math.pow(10, e)) * Math.pow(10, e);
    }, _configure: function _configure() {
      var t = this,
          e = t.min,
          n = 0;xn.prototype._configure.call(t), 0 === e && (e = t._getFirstTickValue(t.minNotZero), n = In(t.options.ticks.fontSize, z.global.defaultFontSize) / t._length), t._startValue = Fn(e), t._valueOffset = n, t._valueRange = (Fn(t.max) - Fn(e)) / (1 - n);
    }, getPixelForValue: function getPixelForValue(t) {
      var e = this,
          n = 0;return (t = +e.getRightValue(t)) > e.min && t > 0 && (n = (Fn(t) - e._startValue) / e._valueRange + e._valueOffset), e.getPixelForDecimal(n);
    }, getValueForPixel: function getValueForPixel(t) {
      var e = this,
          n = e.getDecimalForPixel(t);return 0 === n && 0 === e.min ? 0 : Math.pow(10, e._startValue + (n - e._valueOffset) * e._valueRange);
    } }),
      zn = Ln;Rn._defaults = zn;var Nn = V.valueOrDefault,
      Bn = V.valueAtIndexOrDefault,
      En = V.options.resolve,
      Wn = { display: !0, animate: !0, position: "chartArea", angleLines: { display: !0, color: "rgba(0,0,0,0.1)", lineWidth: 1, borderDash: [], borderDashOffset: 0 }, gridLines: { circular: !1 }, ticks: { showLabelBackdrop: !0, backdropColor: "rgba(255,255,255,0.75)", backdropPaddingY: 2, backdropPaddingX: 2, callback: rn.formatters.linear }, pointLabels: { display: !0, fontSize: 10, callback: function callback(t) {
        return t;
      } } };function Vn(t) {
    var e = t.ticks;return e.display && t.display ? Nn(e.fontSize, z.global.defaultFontSize) + 2 * e.backdropPaddingY : 0;
  }function Hn(t, e, n, i, a) {
    return t === i || t === a ? { start: e - n / 2, end: e + n / 2 } : t < i || t > a ? { start: e - n, end: e } : { start: e, end: e + n };
  }function jn(t) {
    return 0 === t || 180 === t ? "center" : t < 180 ? "left" : "right";
  }function qn(t, e, n, i) {
    var a,
        r,
        o = n.y + i / 2;if (V.isArray(e)) for (a = 0, r = e.length; a < r; ++a) {
      t.fillText(e[a], n.x, o), o += i;
    } else t.fillText(e, n.x, o);
  }function Un(t, e, n) {
    90 === t || 270 === t ? n.y -= e.h / 2 : (t > 270 || t < 90) && (n.y -= e.h);
  }function Yn(t) {
    return V.isNumber(t) ? t : 0;
  }var Gn = Sn.extend({ setDimensions: function setDimensions() {
      var t = this;t.width = t.maxWidth, t.height = t.maxHeight, t.paddingTop = Vn(t.options) / 2, t.xCenter = Math.floor(t.width / 2), t.yCenter = Math.floor((t.height - t.paddingTop) / 2), t.drawingArea = Math.min(t.height - t.paddingTop, t.width) / 2;
    }, determineDataLimits: function determineDataLimits() {
      var t = this,
          e = t.chart,
          n = Number.POSITIVE_INFINITY,
          i = Number.NEGATIVE_INFINITY;V.each(e.data.datasets, function (a, r) {
        if (e.isDatasetVisible(r)) {
          var o = e.getDatasetMeta(r);V.each(a.data, function (e, a) {
            var r = +t.getRightValue(e);isNaN(r) || o.data[a].hidden || (n = Math.min(r, n), i = Math.max(r, i));
          });
        }
      }), t.min = n === Number.POSITIVE_INFINITY ? 0 : n, t.max = i === Number.NEGATIVE_INFINITY ? 0 : i, t.handleTickRangeOptions();
    }, _computeTickLimit: function _computeTickLimit() {
      return Math.ceil(this.drawingArea / Vn(this.options));
    }, convertTicksToLabels: function convertTicksToLabels() {
      var t = this;Sn.prototype.convertTicksToLabels.call(t), t.pointLabels = t.chart.data.labels.map(function () {
        var e = V.callback(t.options.pointLabels.callback, arguments, t);return e || 0 === e ? e : "";
      });
    }, getLabelForIndex: function getLabelForIndex(t, e) {
      return +this.getRightValue(this.chart.data.datasets[e].data[t]);
    }, fit: function fit() {
      var t = this.options;t.display && t.pointLabels.display ? function (t) {
        var e,
            n,
            i,
            a = V.options._parseFont(t.options.pointLabels),
            r = { l: 0, r: t.width, t: 0, b: t.height - t.paddingTop },
            o = {};t.ctx.font = a.string, t._pointLabelSizes = [];var s,
            l,
            u,
            d = t.chart.data.labels.length;for (e = 0; e < d; e++) {
          i = t.getPointPosition(e, t.drawingArea + 5), s = t.ctx, l = a.lineHeight, u = t.pointLabels[e], n = V.isArray(u) ? { w: V.longestText(s, s.font, u), h: u.length * l } : { w: s.measureText(u).width, h: l }, t._pointLabelSizes[e] = n;var h = t.getIndexAngle(e),
              c = V.toDegrees(h) % 360,
              f = Hn(c, i.x, n.w, 0, 180),
              g = Hn(c, i.y, n.h, 90, 270);f.start < r.l && (r.l = f.start, o.l = h), f.end > r.r && (r.r = f.end, o.r = h), g.start < r.t && (r.t = g.start, o.t = h), g.end > r.b && (r.b = g.end, o.b = h);
        }t.setReductions(t.drawingArea, r, o);
      }(this) : this.setCenterPoint(0, 0, 0, 0);
    }, setReductions: function setReductions(t, e, n) {
      var i = this,
          a = e.l / Math.sin(n.l),
          r = Math.max(e.r - i.width, 0) / Math.sin(n.r),
          o = -e.t / Math.cos(n.t),
          s = -Math.max(e.b - (i.height - i.paddingTop), 0) / Math.cos(n.b);a = Yn(a), r = Yn(r), o = Yn(o), s = Yn(s), i.drawingArea = Math.min(Math.floor(t - (a + r) / 2), Math.floor(t - (o + s) / 2)), i.setCenterPoint(a, r, o, s);
    }, setCenterPoint: function setCenterPoint(t, e, n, i) {
      var a = this,
          r = a.width - e - a.drawingArea,
          o = t + a.drawingArea,
          s = n + a.drawingArea,
          l = a.height - a.paddingTop - i - a.drawingArea;a.xCenter = Math.floor((o + r) / 2 + a.left), a.yCenter = Math.floor((s + l) / 2 + a.top + a.paddingTop);
    }, getIndexAngle: function getIndexAngle(t) {
      var e = this.chart,
          n = (t * (360 / e.data.labels.length) + ((e.options || {}).startAngle || 0)) % 360;return (n < 0 ? n + 360 : n) * Math.PI * 2 / 360;
    }, getDistanceFromCenterForValue: function getDistanceFromCenterForValue(t) {
      var e = this;if (V.isNullOrUndef(t)) return NaN;var n = e.drawingArea / (e.max - e.min);return e.options.ticks.reverse ? (e.max - t) * n : (t - e.min) * n;
    }, getPointPosition: function getPointPosition(t, e) {
      var n = this.getIndexAngle(t) - Math.PI / 2;return { x: Math.cos(n) * e + this.xCenter, y: Math.sin(n) * e + this.yCenter };
    }, getPointPositionForValue: function getPointPositionForValue(t, e) {
      return this.getPointPosition(t, this.getDistanceFromCenterForValue(e));
    }, getBasePosition: function getBasePosition(t) {
      var e = this.min,
          n = this.max;return this.getPointPositionForValue(t || 0, this.beginAtZero ? 0 : e < 0 && n < 0 ? n : e > 0 && n > 0 ? e : 0);
    }, _drawGrid: function _drawGrid() {
      var t,
          e,
          n,
          i = this,
          a = i.ctx,
          r = i.options,
          o = r.gridLines,
          s = r.angleLines,
          l = Nn(s.lineWidth, o.lineWidth),
          u = Nn(s.color, o.color);if (r.pointLabels.display && function (t) {
        var e = t.ctx,
            n = t.options,
            i = n.pointLabels,
            a = Vn(n),
            r = t.getDistanceFromCenterForValue(n.ticks.reverse ? t.min : t.max),
            o = V.options._parseFont(i);e.save(), e.font = o.string, e.textBaseline = "middle";for (var s = t.chart.data.labels.length - 1; s >= 0; s--) {
          var l = 0 === s ? a / 2 : 0,
              u = t.getPointPosition(s, r + l + 5),
              d = Bn(i.fontColor, s, z.global.defaultFontColor);e.fillStyle = d;var h = t.getIndexAngle(s),
              c = V.toDegrees(h);e.textAlign = jn(c), Un(c, t._pointLabelSizes[s], u), qn(e, t.pointLabels[s], u, o.lineHeight);
        }e.restore();
      }(i), o.display && V.each(i.ticks, function (t, n) {
        0 !== n && (e = i.getDistanceFromCenterForValue(i.ticksAsNumbers[n]), function (t, e, n, i) {
          var a,
              r = t.ctx,
              o = e.circular,
              s = t.chart.data.labels.length,
              l = Bn(e.color, i - 1),
              u = Bn(e.lineWidth, i - 1);if ((o || s) && l && u) {
            if (r.save(), r.strokeStyle = l, r.lineWidth = u, r.setLineDash && (r.setLineDash(e.borderDash || []), r.lineDashOffset = e.borderDashOffset || 0), r.beginPath(), o) r.arc(t.xCenter, t.yCenter, n, 0, 2 * Math.PI);else {
              a = t.getPointPosition(0, n), r.moveTo(a.x, a.y);for (var d = 1; d < s; d++) {
                a = t.getPointPosition(d, n), r.lineTo(a.x, a.y);
              }
            }r.closePath(), r.stroke(), r.restore();
          }
        }(i, o, e, n));
      }), s.display && l && u) {
        for (a.save(), a.lineWidth = l, a.strokeStyle = u, a.setLineDash && (a.setLineDash(En([s.borderDash, o.borderDash, []])), a.lineDashOffset = En([s.borderDashOffset, o.borderDashOffset, 0])), t = i.chart.data.labels.length - 1; t >= 0; t--) {
          e = i.getDistanceFromCenterForValue(r.ticks.reverse ? i.min : i.max), n = i.getPointPosition(t, e), a.beginPath(), a.moveTo(i.xCenter, i.yCenter), a.lineTo(n.x, n.y), a.stroke();
        }a.restore();
      }
    }, _drawLabels: function _drawLabels() {
      var t = this,
          e = t.ctx,
          n = t.options.ticks;if (n.display) {
        var i,
            a,
            r = t.getIndexAngle(0),
            o = V.options._parseFont(n),
            s = Nn(n.fontColor, z.global.defaultFontColor);e.save(), e.font = o.string, e.translate(t.xCenter, t.yCenter), e.rotate(r), e.textAlign = "center", e.textBaseline = "middle", V.each(t.ticks, function (r, l) {
          (0 !== l || n.reverse) && (i = t.getDistanceFromCenterForValue(t.ticksAsNumbers[l]), n.showLabelBackdrop && (a = e.measureText(r).width, e.fillStyle = n.backdropColor, e.fillRect(-a / 2 - n.backdropPaddingX, -i - o.size / 2 - n.backdropPaddingY, a + 2 * n.backdropPaddingX, o.size + 2 * n.backdropPaddingY)), e.fillStyle = s, e.fillText(r, 0, -i));
        }), e.restore();
      }
    }, _drawTitle: V.noop }),
      Xn = Wn;Gn._defaults = Xn;var Kn = V._deprecated,
      Zn = V.options.resolve,
      $n = V.valueOrDefault,
      Jn = Number.MIN_SAFE_INTEGER || -9007199254740991,
      Qn = Number.MAX_SAFE_INTEGER || 9007199254740991,
      ti = { millisecond: { common: !0, size: 1, steps: 1e3 }, second: { common: !0, size: 1e3, steps: 60 }, minute: { common: !0, size: 6e4, steps: 60 }, hour: { common: !0, size: 36e5, steps: 24 }, day: { common: !0, size: 864e5, steps: 30 }, week: { common: !1, size: 6048e5, steps: 4 }, month: { common: !0, size: 2628e6, steps: 12 }, quarter: { common: !1, size: 7884e6, steps: 4 }, year: { common: !0, size: 3154e7 } },
      ei = Object.keys(ti);function ni(t, e) {
    return t - e;
  }function ii(t) {
    return V.valueOrDefault(t.time.min, t.ticks.min);
  }function ai(t) {
    return V.valueOrDefault(t.time.max, t.ticks.max);
  }function ri(t, e, n, i) {
    var a = function (t, e, n) {
      for (var i, a, r, o = 0, s = t.length - 1; o >= 0 && o <= s;) {
        if (a = t[(i = o + s >> 1) - 1] || null, r = t[i], !a) return { lo: null, hi: r };if (r[e] < n) o = i + 1;else {
          if (!(a[e] > n)) return { lo: a, hi: r };s = i - 1;
        }
      }return { lo: r, hi: null };
    }(t, e, n),
        r = a.lo ? a.hi ? a.lo : t[t.length - 2] : t[0],
        o = a.lo ? a.hi ? a.hi : t[t.length - 1] : t[1],
        s = o[e] - r[e],
        l = s ? (n - r[e]) / s : 0,
        u = (o[i] - r[i]) * l;return r[i] + u;
  }function oi(t, e) {
    var n = t._adapter,
        i = t.options.time,
        a = i.parser,
        r = a || i.format,
        o = e;return "function" == typeof a && (o = a(o)), V.isFinite(o) || (o = "string" == typeof r ? n.parse(o, r) : n.parse(o)), null !== o ? +o : (a || "function" != typeof r || (o = r(e), V.isFinite(o) || (o = n.parse(o))), o);
  }function si(t, e) {
    if (V.isNullOrUndef(e)) return null;var n = t.options.time,
        i = oi(t, t.getRightValue(e));return null === i ? i : (n.round && (i = +t._adapter.startOf(i, n.round)), i);
  }function li(t, e, n, i) {
    var a,
        r,
        o,
        s = ei.length;for (a = ei.indexOf(t); a < s - 1; ++a) {
      if (o = (r = ti[ei[a]]).steps ? r.steps : Qn, r.common && Math.ceil((n - e) / (o * r.size)) <= i) return ei[a];
    }return ei[s - 1];
  }function ui(t, e, n) {
    var i,
        a,
        r = [],
        o = {},
        s = e.length;for (i = 0; i < s; ++i) {
      o[a = e[i]] = i, r.push({ value: a, major: !1 });
    }return 0 !== s && n ? function (t, e, n, i) {
      var a,
          r,
          o = t._adapter,
          s = +o.startOf(e[0].value, i),
          l = e[e.length - 1].value;for (a = s; a <= l; a = +o.add(a, 1, i)) {
        (r = n[a]) >= 0 && (e[r].major = !0);
      }return e;
    }(t, r, o, n) : r;
  }var di = xn.extend({ initialize: function initialize() {
      this.mergeTicksOptions(), xn.prototype.initialize.call(this);
    }, update: function update() {
      var t = this,
          e = t.options,
          n = e.time || (e.time = {}),
          i = t._adapter = new an._date(e.adapters.date);return Kn("time scale", n.format, "time.format", "time.parser"), Kn("time scale", n.min, "time.min", "ticks.min"), Kn("time scale", n.max, "time.max", "ticks.max"), V.mergeIf(n.displayFormats, i.formats()), xn.prototype.update.apply(t, arguments);
    }, getRightValue: function getRightValue(t) {
      return t && void 0 !== t.t && (t = t.t), xn.prototype.getRightValue.call(this, t);
    }, determineDataLimits: function determineDataLimits() {
      var t,
          e,
          n,
          i,
          a,
          r,
          o,
          s = this,
          l = s.chart,
          u = s._adapter,
          d = s.options,
          h = d.time.unit || "day",
          c = Qn,
          f = Jn,
          g = [],
          p = [],
          m = [],
          v = s._getLabels();for (t = 0, n = v.length; t < n; ++t) {
        m.push(si(s, v[t]));
      }for (t = 0, n = (l.data.datasets || []).length; t < n; ++t) {
        if (l.isDatasetVisible(t)) {
          if (a = l.data.datasets[t].data, V.isObject(a[0])) for (p[t] = [], e = 0, i = a.length; e < i; ++e) {
            r = si(s, a[e]), g.push(r), p[t][e] = r;
          } else p[t] = m.slice(0), o || (g = g.concat(m), o = !0);
        } else p[t] = [];
      }m.length && (c = Math.min(c, m[0]), f = Math.max(f, m[m.length - 1])), g.length && (g = n > 1 ? function (t) {
        var e,
            n,
            i,
            a = {},
            r = [];for (e = 0, n = t.length; e < n; ++e) {
          a[i = t[e]] || (a[i] = !0, r.push(i));
        }return r;
      }(g).sort(ni) : g.sort(ni), c = Math.min(c, g[0]), f = Math.max(f, g[g.length - 1])), c = si(s, ii(d)) || c, f = si(s, ai(d)) || f, c = c === Qn ? +u.startOf(Date.now(), h) : c, f = f === Jn ? +u.endOf(Date.now(), h) + 1 : f, s.min = Math.min(c, f), s.max = Math.max(c + 1, f), s._table = [], s._timestamps = { data: g, datasets: p, labels: m };
    }, buildTicks: function buildTicks() {
      var t,
          e,
          n,
          i = this,
          a = i.min,
          r = i.max,
          o = i.options,
          s = o.ticks,
          l = o.time,
          u = i._timestamps,
          d = [],
          h = i.getLabelCapacity(a),
          c = s.source,
          f = o.distribution;for (u = "data" === c || "auto" === c && "series" === f ? u.data : "labels" === c ? u.labels : function (t, e, n, i) {
        var a,
            r = t._adapter,
            o = t.options,
            s = o.time,
            l = s.unit || li(s.minUnit, e, n, i),
            u = Zn([s.stepSize, s.unitStepSize, 1]),
            d = "week" === l && s.isoWeekday,
            h = e,
            c = [];if (d && (h = +r.startOf(h, "isoWeek", d)), h = +r.startOf(h, d ? "day" : l), r.diff(n, e, l) > 1e5 * u) throw e + " and " + n + " are too far apart with stepSize of " + u + " " + l;for (a = h; a < n; a = +r.add(a, u, l)) {
          c.push(a);
        }return a !== n && "ticks" !== o.bounds || c.push(a), c;
      }(i, a, r, h), "ticks" === o.bounds && u.length && (a = u[0], r = u[u.length - 1]), a = si(i, ii(o)) || a, r = si(i, ai(o)) || r, t = 0, e = u.length; t < e; ++t) {
        (n = u[t]) >= a && n <= r && d.push(n);
      }return i.min = a, i.max = r, i._unit = l.unit || (s.autoSkip ? li(l.minUnit, i.min, i.max, h) : function (t, e, n, i, a) {
        var r, o;for (r = ei.length - 1; r >= ei.indexOf(n); r--) {
          if (o = ei[r], ti[o].common && t._adapter.diff(a, i, o) >= e - 1) return o;
        }return ei[n ? ei.indexOf(n) : 0];
      }(i, d.length, l.minUnit, i.min, i.max)), i._majorUnit = s.major.enabled && "year" !== i._unit ? function (t) {
        for (var e = ei.indexOf(t) + 1, n = ei.length; e < n; ++e) {
          if (ti[ei[e]].common) return ei[e];
        }
      }(i._unit) : void 0, i._table = function (t, e, n, i) {
        if ("linear" === i || !t.length) return [{ time: e, pos: 0 }, { time: n, pos: 1 }];var a,
            r,
            o,
            s,
            l,
            u = [],
            d = [e];for (a = 0, r = t.length; a < r; ++a) {
          (s = t[a]) > e && s < n && d.push(s);
        }for (d.push(n), a = 0, r = d.length; a < r; ++a) {
          l = d[a + 1], o = d[a - 1], s = d[a], void 0 !== o && void 0 !== l && Math.round((l + o) / 2) === s || u.push({ time: s, pos: a / (r - 1) });
        }return u;
      }(i._timestamps.data, a, r, f), i._offsets = function (t, e, n, i, a) {
        var r,
            o,
            s = 0,
            l = 0;return a.offset && e.length && (r = ri(t, "time", e[0], "pos"), s = 1 === e.length ? 1 - r : (ri(t, "time", e[1], "pos") - r) / 2, o = ri(t, "time", e[e.length - 1], "pos"), l = 1 === e.length ? o : (o - ri(t, "time", e[e.length - 2], "pos")) / 2), { start: s, end: l, factor: 1 / (s + 1 + l) };
      }(i._table, d, 0, 0, o), s.reverse && d.reverse(), ui(i, d, i._majorUnit);
    }, getLabelForIndex: function getLabelForIndex(t, e) {
      var n = this,
          i = n._adapter,
          a = n.chart.data,
          r = n.options.time,
          o = a.labels && t < a.labels.length ? a.labels[t] : "",
          s = a.datasets[e].data[t];return V.isObject(s) && (o = n.getRightValue(s)), r.tooltipFormat ? i.format(oi(n, o), r.tooltipFormat) : "string" == typeof o ? o : i.format(oi(n, o), r.displayFormats.datetime);
    }, tickFormatFunction: function tickFormatFunction(t, e, n, i) {
      var a = this._adapter,
          r = this.options,
          o = r.time.displayFormats,
          s = o[this._unit],
          l = this._majorUnit,
          u = o[l],
          d = n[e],
          h = r.ticks,
          c = l && u && d && d.major,
          f = a.format(t, i || (c ? u : s)),
          g = c ? h.major : h.minor,
          p = Zn([g.callback, g.userCallback, h.callback, h.userCallback]);return p ? p(f, e, n) : f;
    }, convertTicksToLabels: function convertTicksToLabels(t) {
      var e,
          n,
          i = [];for (e = 0, n = t.length; e < n; ++e) {
        i.push(this.tickFormatFunction(t[e].value, e, t));
      }return i;
    }, getPixelForOffset: function getPixelForOffset(t) {
      var e = this._offsets,
          n = ri(this._table, "time", t, "pos");return this.getPixelForDecimal((e.start + n) * e.factor);
    }, getPixelForValue: function getPixelForValue(t, e, n) {
      var i = null;if (void 0 !== e && void 0 !== n && (i = this._timestamps.datasets[n][e]), null === i && (i = si(this, t)), null !== i) return this.getPixelForOffset(i);
    }, getPixelForTick: function getPixelForTick(t) {
      var e = this.getTicks();return t >= 0 && t < e.length ? this.getPixelForOffset(e[t].value) : null;
    }, getValueForPixel: function getValueForPixel(t) {
      var e = this._offsets,
          n = this.getDecimalForPixel(t) / e.factor - e.end,
          i = ri(this._table, "pos", n, "time");return this._adapter._create(i);
    }, _getLabelSize: function _getLabelSize(t) {
      var e = this.options.ticks,
          n = this.ctx.measureText(t).width,
          i = V.toRadians(this.isHorizontal() ? e.maxRotation : e.minRotation),
          a = Math.cos(i),
          r = Math.sin(i),
          o = $n(e.fontSize, z.global.defaultFontSize);return { w: n * a + o * r, h: n * r + o * a };
    }, getLabelWidth: function getLabelWidth(t) {
      return this._getLabelSize(t).w;
    }, getLabelCapacity: function getLabelCapacity(t) {
      var e = this,
          n = e.options.time,
          i = n.displayFormats,
          a = i[n.unit] || i.millisecond,
          r = e.tickFormatFunction(t, 0, ui(e, [t], e._majorUnit), a),
          o = e._getLabelSize(r),
          s = Math.floor(e.isHorizontal() ? e.width / o.w : e.height / o.h);return e.options.offset && s--, s > 0 ? s : 1;
    } }),
      hi = { position: "bottom", distribution: "linear", bounds: "data", adapters: {}, time: { parser: !1, unit: !1, round: !1, displayFormat: !1, isoWeekday: !1, minUnit: "millisecond", displayFormats: {} }, ticks: { autoSkip: !1, source: "auto", major: { enabled: !1 } } };di._defaults = hi;var ci = { category: _n, linear: Dn, logarithmic: Rn, radialLinear: Gn, time: di },
      fi = { datetime: "MMM D, YYYY, h:mm:ss a", millisecond: "h:mm:ss.SSS a", second: "h:mm:ss a", minute: "h:mm a", hour: "hA", day: "MMM D", week: "ll", month: "MMM YYYY", quarter: "[Q]Q - YYYY", year: "YYYY" };an._date.override("function" == typeof t ? { _id: "moment", formats: function formats() {
      return fi;
    }, parse: function parse(e, n) {
      return "string" == typeof e && "string" == typeof n ? e = t(e, n) : e instanceof t || (e = t(e)), e.isValid() ? e.valueOf() : null;
    }, format: function format(e, n) {
      return t(e).format(n);
    }, add: function add(e, n, i) {
      return t(e).add(n, i).valueOf();
    }, diff: function diff(e, n, i) {
      return t(e).diff(t(n), i);
    }, startOf: function startOf(e, n, i) {
      return e = t(e), "isoWeek" === n ? e.isoWeekday(i).valueOf() : e.startOf(n).valueOf();
    }, endOf: function endOf(e, n) {
      return t(e).endOf(n).valueOf();
    }, _create: function _create(e) {
      return t(e);
    } } : {}), z._set("global", { plugins: { filler: { propagate: !0 } } });var gi = { dataset: function dataset(t) {
      var e = t.fill,
          n = t.chart,
          i = n.getDatasetMeta(e),
          a = i && n.isDatasetVisible(e) && i.dataset._children || [],
          r = a.length || 0;return r ? function (t, e) {
        return e < r && a[e]._view || null;
      } : null;
    }, boundary: function boundary(t) {
      var e = t.boundary,
          n = e ? e.x : null,
          i = e ? e.y : null;return V.isArray(e) ? function (t, n) {
        return e[n];
      } : function (t) {
        return { x: null === n ? t.x : n, y: null === i ? t.y : i };
      };
    } };function pi(t, e, n) {
    var i,
        a = t._model || {},
        r = a.fill;if (void 0 === r && (r = !!a.backgroundColor), !1 === r || null === r) return !1;if (!0 === r) return "origin";if (i = parseFloat(r, 10), isFinite(i) && Math.floor(i) === i) return "-" !== r[0] && "+" !== r[0] || (i = e + i), !(i === e || i < 0 || i >= n) && i;switch (r) {case "bottom":
        return "start";case "top":
        return "end";case "zero":
        return "origin";case "origin":case "start":case "end":
        return r;default:
        return !1;}
  }function mi(t) {
    return (t.el._scale || {}).getPointPositionForValue ? function (t) {
      var e,
          n,
          i,
          a,
          r,
          o = t.el._scale,
          s = o.options,
          l = o.chart.data.labels.length,
          u = t.fill,
          d = [];if (!l) return null;for (e = s.ticks.reverse ? o.max : o.min, n = s.ticks.reverse ? o.min : o.max, i = o.getPointPositionForValue(0, e), a = 0; a < l; ++a) {
        r = "start" === u || "end" === u ? o.getPointPositionForValue(a, "start" === u ? e : n) : o.getBasePosition(a), s.gridLines.circular && (r.cx = i.x, r.cy = i.y, r.angle = o.getIndexAngle(a) - Math.PI / 2), d.push(r);
      }return d;
    }(t) : function (t) {
      var e,
          n = t.el._model || {},
          i = t.el._scale || {},
          a = t.fill,
          r = null;if (isFinite(a)) return null;if ("start" === a ? r = void 0 === n.scaleBottom ? i.bottom : n.scaleBottom : "end" === a ? r = void 0 === n.scaleTop ? i.top : n.scaleTop : void 0 !== n.scaleZero ? r = n.scaleZero : i.getBasePixel && (r = i.getBasePixel()), null != r) {
        if (void 0 !== r.x && void 0 !== r.y) return r;if (V.isFinite(r)) return { x: (e = i.isHorizontal()) ? r : null, y: e ? null : r };
      }return null;
    }(t);
  }function vi(t, e, n) {
    var i,
        a = t[e].fill,
        r = [e];if (!n) return a;for (; !1 !== a && -1 === r.indexOf(a);) {
      if (!isFinite(a)) return a;if (!(i = t[a])) return !1;if (i.visible) return a;r.push(a), a = i.fill;
    }return !1;
  }function bi(t) {
    var e = t.fill,
        n = "dataset";return !1 === e ? null : (isFinite(e) || (n = "boundary"), gi[n](t));
  }function xi(t) {
    return t && !t.skip;
  }function yi(t, e, n, i, a) {
    var r, o, s, l;if (i && a) {
      for (t.moveTo(e[0].x, e[0].y), r = 1; r < i; ++r) {
        V.canvas.lineTo(t, e[r - 1], e[r]);
      }if (void 0 === n[0].angle) for (t.lineTo(n[a - 1].x, n[a - 1].y), r = a - 1; r > 0; --r) {
        V.canvas.lineTo(t, n[r], n[r - 1], !0);
      } else for (o = n[0].cx, s = n[0].cy, l = Math.sqrt(Math.pow(n[0].x - o, 2) + Math.pow(n[0].y - s, 2)), r = a - 1; r > 0; --r) {
        t.arc(o, s, l, n[r].angle, n[r - 1].angle, !0);
      }
    }
  }function _i(t, e, n, i, a, r) {
    var o,
        s,
        l,
        u,
        d,
        h,
        c,
        f,
        g = e.length,
        p = i.spanGaps,
        m = [],
        v = [],
        b = 0,
        x = 0;for (t.beginPath(), o = 0, s = g; o < s; ++o) {
      d = n(u = e[l = o % g]._view, l, i), h = xi(u), c = xi(d), r && void 0 === f && h && (s = g + (f = o + 1)), h && c ? (b = m.push(u), x = v.push(d)) : b && x && (p ? (h && m.push(u), c && v.push(d)) : (yi(t, m, v, b, x), b = x = 0, m = [], v = []));
    }yi(t, m, v, b, x), t.closePath(), t.fillStyle = a, t.fill();
  }var ki = { id: "filler", afterDatasetsUpdate: function afterDatasetsUpdate(t, e) {
      var n,
          i,
          a,
          r,
          o = (t.data.datasets || []).length,
          s = e.propagate,
          l = [];for (i = 0; i < o; ++i) {
        r = null, (a = (n = t.getDatasetMeta(i)).dataset) && a._model && a instanceof _t.Line && (r = { visible: t.isDatasetVisible(i), fill: pi(a, i, o), chart: t, el: a }), n.$filler = r, l.push(r);
      }for (i = 0; i < o; ++i) {
        (r = l[i]) && (r.fill = vi(l, i, s), r.boundary = mi(r), r.mapper = bi(r));
      }
    }, beforeDatasetsDraw: function beforeDatasetsDraw(t) {
      var e,
          n,
          i,
          a,
          r,
          o,
          s,
          l = t._getSortedVisibleDatasetMetas(),
          u = t.ctx;for (n = l.length - 1; n >= 0; --n) {
        (e = l[n].$filler) && e.visible && (a = (i = e.el)._view, r = i._children || [], o = e.mapper, s = a.backgroundColor || z.global.defaultColor, o && s && r.length && (V.canvas.clipArea(u, t.chartArea), _i(u, r, o, a, s, i._loop), V.canvas.unclipArea(u)));
      }
    } },
      wi = V.rtl.getRtlAdapter,
      Mi = V.noop,
      Si = V.valueOrDefault;function Ci(t, e) {
    return t.usePointStyle && t.boxWidth > e ? e : t.boxWidth;
  }z._set("global", { legend: { display: !0, position: "top", align: "center", fullWidth: !0, reverse: !1, weight: 1e3, onClick: function onClick(t, e) {
        var n = e.datasetIndex,
            i = this.chart,
            a = i.getDatasetMeta(n);a.hidden = null === a.hidden ? !i.data.datasets[n].hidden : null, i.update();
      }, onHover: null, onLeave: null, labels: { boxWidth: 40, padding: 10, generateLabels: function generateLabels(t) {
          var e = t.data.datasets,
              n = t.options.legend || {},
              i = n.labels && n.labels.usePointStyle;return t._getSortedDatasetMetas().map(function (n) {
            var a = n.controller.getStyle(i ? 0 : void 0);return { text: e[n.index].label, fillStyle: a.backgroundColor, hidden: !t.isDatasetVisible(n.index), lineCap: a.borderCapStyle, lineDash: a.borderDash, lineDashOffset: a.borderDashOffset, lineJoin: a.borderJoinStyle, lineWidth: a.borderWidth, strokeStyle: a.borderColor, pointStyle: a.pointStyle, rotation: a.rotation, datasetIndex: n.index };
          }, this);
        } } }, legendCallback: function legendCallback(t) {
      var e,
          n,
          i,
          a = document.createElement("ul"),
          r = t.data.datasets;for (a.setAttribute("class", t.id + "-legend"), e = 0, n = r.length; e < n; e++) {
        (i = a.appendChild(document.createElement("li"))).appendChild(document.createElement("span")).style.backgroundColor = r[e].backgroundColor, r[e].label && i.appendChild(document.createTextNode(r[e].label));
      }return a.outerHTML;
    } });var Pi = X.extend({ initialize: function initialize(t) {
      V.extend(this, t), this.legendHitBoxes = [], this._hoveredItem = null, this.doughnutMode = !1;
    }, beforeUpdate: Mi, update: function update(t, e, n) {
      var i = this;return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize;
    }, afterUpdate: Mi, beforeSetDimensions: Mi, setDimensions: function setDimensions() {
      var t = this;t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = { width: 0, height: 0 };
    }, afterSetDimensions: Mi, beforeBuildLabels: Mi, buildLabels: function buildLabels() {
      var t = this,
          e = t.options.labels || {},
          n = V.callback(e.generateLabels, [t.chart], t) || [];e.filter && (n = n.filter(function (n) {
        return e.filter(n, t.chart.data);
      })), t.options.reverse && n.reverse(), t.legendItems = n;
    }, afterBuildLabels: Mi, beforeFit: Mi, fit: function fit() {
      var t = this,
          e = t.options,
          n = e.labels,
          i = e.display,
          a = t.ctx,
          r = V.options._parseFont(n),
          o = r.size,
          s = t.legendHitBoxes = [],
          l = t.minSize,
          u = t.isHorizontal();if (u ? (l.width = t.maxWidth, l.height = i ? 10 : 0) : (l.width = i ? 10 : 0, l.height = t.maxHeight), i) {
        if (a.font = r.string, u) {
          var d = t.lineWidths = [0],
              h = 0;a.textAlign = "left", a.textBaseline = "middle", V.each(t.legendItems, function (t, e) {
            var i = Ci(n, o) + o / 2 + a.measureText(t.text).width;(0 === e || d[d.length - 1] + i + 2 * n.padding > l.width) && (h += o + n.padding, d[d.length - (e > 0 ? 0 : 1)] = 0), s[e] = { left: 0, top: 0, width: i, height: o }, d[d.length - 1] += i + n.padding;
          }), l.height += h;
        } else {
          var c = n.padding,
              f = t.columnWidths = [],
              g = t.columnHeights = [],
              p = n.padding,
              m = 0,
              v = 0;V.each(t.legendItems, function (t, e) {
            var i = Ci(n, o) + o / 2 + a.measureText(t.text).width;e > 0 && v + o + 2 * c > l.height && (p += m + n.padding, f.push(m), g.push(v), m = 0, v = 0), m = Math.max(m, i), v += o + c, s[e] = { left: 0, top: 0, width: i, height: o };
          }), p += m, f.push(m), g.push(v), l.width += p;
        }t.width = l.width, t.height = l.height;
      } else t.width = l.width = t.height = l.height = 0;
    }, afterFit: Mi, isHorizontal: function isHorizontal() {
      return "top" === this.options.position || "bottom" === this.options.position;
    }, draw: function draw() {
      var t = this,
          e = t.options,
          n = e.labels,
          i = z.global,
          a = i.defaultColor,
          r = i.elements.line,
          o = t.height,
          s = t.columnHeights,
          l = t.width,
          u = t.lineWidths;if (e.display) {
        var d,
            h = wi(e.rtl, t.left, t.minSize.width),
            c = t.ctx,
            f = Si(n.fontColor, i.defaultFontColor),
            g = V.options._parseFont(n),
            p = g.size;c.textAlign = h.textAlign("left"), c.textBaseline = "middle", c.lineWidth = .5, c.strokeStyle = f, c.fillStyle = f, c.font = g.string;var m = Ci(n, p),
            v = t.legendHitBoxes,
            b = function b(t, i) {
          switch (e.align) {case "start":
              return n.padding;case "end":
              return t - i;default:
              return (t - i + n.padding) / 2;}
        },
            x = t.isHorizontal();d = x ? { x: t.left + b(l, u[0]), y: t.top + n.padding, line: 0 } : { x: t.left + n.padding, y: t.top + b(o, s[0]), line: 0 }, V.rtl.overrideTextDirection(t.ctx, e.textDirection);var y = p + n.padding;V.each(t.legendItems, function (e, i) {
          var f = c.measureText(e.text).width,
              g = m + p / 2 + f,
              _ = d.x,
              k = d.y;h.setWidth(t.minSize.width), x ? i > 0 && _ + g + n.padding > t.left + t.minSize.width && (k = d.y += y, d.line++, _ = d.x = t.left + b(l, u[d.line])) : i > 0 && k + y > t.top + t.minSize.height && (_ = d.x = _ + t.columnWidths[d.line] + n.padding, d.line++, k = d.y = t.top + b(o, s[d.line]));var w = h.x(_);!function (t, e, i) {
            if (!(isNaN(m) || m <= 0)) {
              c.save();var o = Si(i.lineWidth, r.borderWidth);if (c.fillStyle = Si(i.fillStyle, a), c.lineCap = Si(i.lineCap, r.borderCapStyle), c.lineDashOffset = Si(i.lineDashOffset, r.borderDashOffset), c.lineJoin = Si(i.lineJoin, r.borderJoinStyle), c.lineWidth = o, c.strokeStyle = Si(i.strokeStyle, a), c.setLineDash && c.setLineDash(Si(i.lineDash, r.borderDash)), n && n.usePointStyle) {
                var s = m * Math.SQRT2 / 2,
                    l = h.xPlus(t, m / 2),
                    u = e + p / 2;V.canvas.drawPoint(c, i.pointStyle, s, l, u, i.rotation);
              } else c.fillRect(h.leftForLtr(t, m), e, m, p), 0 !== o && c.strokeRect(h.leftForLtr(t, m), e, m, p);c.restore();
            }
          }(w, k, e), v[i].left = h.leftForLtr(w, v[i].width), v[i].top = k, function (t, e, n, i) {
            var a = p / 2,
                r = h.xPlus(t, m + a),
                o = e + a;c.fillText(n.text, r, o), n.hidden && (c.beginPath(), c.lineWidth = 2, c.moveTo(r, o), c.lineTo(h.xPlus(r, i), o), c.stroke());
          }(w, k, e, f), x ? d.x += g + n.padding : d.y += y;
        }), V.rtl.restoreTextDirection(t.ctx, e.textDirection);
      }
    }, _getLegendItemAt: function _getLegendItemAt(t, e) {
      var n,
          i,
          a,
          r = this;if (t >= r.left && t <= r.right && e >= r.top && e <= r.bottom) for (a = r.legendHitBoxes, n = 0; n < a.length; ++n) {
        if (t >= (i = a[n]).left && t <= i.left + i.width && e >= i.top && e <= i.top + i.height) return r.legendItems[n];
      }return null;
    }, handleEvent: function handleEvent(t) {
      var e,
          n = this,
          i = n.options,
          a = "mouseup" === t.type ? "click" : t.type;if ("mousemove" === a) {
        if (!i.onHover && !i.onLeave) return;
      } else {
        if ("click" !== a) return;if (!i.onClick) return;
      }e = n._getLegendItemAt(t.x, t.y), "click" === a ? e && i.onClick && i.onClick.call(n, t.native, e) : (i.onLeave && e !== n._hoveredItem && (n._hoveredItem && i.onLeave.call(n, t.native, n._hoveredItem), n._hoveredItem = e), i.onHover && e && i.onHover.call(n, t.native, e));
    } });function Ai(t, e) {
    var n = new Pi({ ctx: t.ctx, options: e, chart: t });ge.configure(t, n, e), ge.addBox(t, n), t.legend = n;
  }var Di = { id: "legend", _element: Pi, beforeInit: function beforeInit(t) {
      var e = t.options.legend;e && Ai(t, e);
    }, beforeUpdate: function beforeUpdate(t) {
      var e = t.options.legend,
          n = t.legend;e ? (V.mergeIf(e, z.global.legend), n ? (ge.configure(t, n, e), n.options = e) : Ai(t, e)) : n && (ge.removeBox(t, n), delete t.legend);
    }, afterEvent: function afterEvent(t, e) {
      var n = t.legend;n && n.handleEvent(e);
    } },
      Ti = V.noop;z._set("global", { title: { display: !1, fontStyle: "bold", fullWidth: !0, padding: 10, position: "top", text: "", weight: 2e3 } });var Ii = X.extend({ initialize: function initialize(t) {
      V.extend(this, t), this.legendHitBoxes = [];
    }, beforeUpdate: Ti, update: function update(t, e, n) {
      var i = this;return i.beforeUpdate(), i.maxWidth = t, i.maxHeight = e, i.margins = n, i.beforeSetDimensions(), i.setDimensions(), i.afterSetDimensions(), i.beforeBuildLabels(), i.buildLabels(), i.afterBuildLabels(), i.beforeFit(), i.fit(), i.afterFit(), i.afterUpdate(), i.minSize;
    }, afterUpdate: Ti, beforeSetDimensions: Ti, setDimensions: function setDimensions() {
      var t = this;t.isHorizontal() ? (t.width = t.maxWidth, t.left = 0, t.right = t.width) : (t.height = t.maxHeight, t.top = 0, t.bottom = t.height), t.paddingLeft = 0, t.paddingTop = 0, t.paddingRight = 0, t.paddingBottom = 0, t.minSize = { width: 0, height: 0 };
    }, afterSetDimensions: Ti, beforeBuildLabels: Ti, buildLabels: Ti, afterBuildLabels: Ti, beforeFit: Ti, fit: function fit() {
      var t,
          e = this,
          n = e.options,
          i = e.minSize = {},
          a = e.isHorizontal();n.display ? (t = (V.isArray(n.text) ? n.text.length : 1) * V.options._parseFont(n).lineHeight + 2 * n.padding, e.width = i.width = a ? e.maxWidth : t, e.height = i.height = a ? t : e.maxHeight) : e.width = i.width = e.height = i.height = 0;
    }, afterFit: Ti, isHorizontal: function isHorizontal() {
      var t = this.options.position;return "top" === t || "bottom" === t;
    }, draw: function draw() {
      var t = this,
          e = t.ctx,
          n = t.options;if (n.display) {
        var i,
            a,
            r,
            o = V.options._parseFont(n),
            s = o.lineHeight,
            l = s / 2 + n.padding,
            u = 0,
            d = t.top,
            h = t.left,
            c = t.bottom,
            f = t.right;e.fillStyle = V.valueOrDefault(n.fontColor, z.global.defaultFontColor), e.font = o.string, t.isHorizontal() ? (a = h + (f - h) / 2, r = d + l, i = f - h) : (a = "left" === n.position ? h + l : f - l, r = d + (c - d) / 2, i = c - d, u = Math.PI * ("left" === n.position ? -.5 : .5)), e.save(), e.translate(a, r), e.rotate(u), e.textAlign = "center", e.textBaseline = "middle";var g = n.text;if (V.isArray(g)) for (var p = 0, m = 0; m < g.length; ++m) {
          e.fillText(g[m], 0, p, i), p += s;
        } else e.fillText(g, 0, 0, i);e.restore();
      }
    } });function Fi(t, e) {
    var n = new Ii({ ctx: t.ctx, options: e, chart: t });ge.configure(t, n, e), ge.addBox(t, n), t.titleBlock = n;
  }var Li = {},
      Oi = ki,
      Ri = Di,
      zi = { id: "title", _element: Ii, beforeInit: function beforeInit(t) {
      var e = t.options.title;e && Fi(t, e);
    }, beforeUpdate: function beforeUpdate(t) {
      var e = t.options.title,
          n = t.titleBlock;e ? (V.mergeIf(e, z.global.title), n ? (ge.configure(t, n, e), n.options = e) : Fi(t, e)) : n && (ge.removeBox(t, n), delete t.titleBlock);
    } };for (var Ni in Li.filler = Oi, Li.legend = Ri, Li.title = zi, tn.helpers = V, function () {
    function t(t, e, n) {
      var i;return "string" == typeof t ? (i = parseInt(t, 10), -1 !== t.indexOf("%") && (i = i / 100 * e.parentNode[n])) : i = t, i;
    }function e(t) {
      return null != t && "none" !== t;
    }function n(n, i, a) {
      var r = document.defaultView,
          o = V._getParentNode(n),
          s = r.getComputedStyle(n)[i],
          l = r.getComputedStyle(o)[i],
          u = e(s),
          d = e(l),
          h = Number.POSITIVE_INFINITY;return u || d ? Math.min(u ? t(s, n, a) : h, d ? t(l, o, a) : h) : "none";
    }V.where = function (t, e) {
      if (V.isArray(t) && Array.prototype.filter) return t.filter(e);var n = [];return V.each(t, function (t) {
        e(t) && n.push(t);
      }), n;
    }, V.findIndex = Array.prototype.findIndex ? function (t, e, n) {
      return t.findIndex(e, n);
    } : function (t, e, n) {
      n = void 0 === n ? t : n;for (var i = 0, a = t.length; i < a; ++i) {
        if (e.call(n, t[i], i, t)) return i;
      }return -1;
    }, V.findNextWhere = function (t, e, n) {
      V.isNullOrUndef(n) && (n = -1);for (var i = n + 1; i < t.length; i++) {
        var a = t[i];if (e(a)) return a;
      }
    }, V.findPreviousWhere = function (t, e, n) {
      V.isNullOrUndef(n) && (n = t.length);for (var i = n - 1; i >= 0; i--) {
        var a = t[i];if (e(a)) return a;
      }
    }, V.isNumber = function (t) {
      return !isNaN(parseFloat(t)) && isFinite(t);
    }, V.almostEquals = function (t, e, n) {
      return Math.abs(t - e) < n;
    }, V.almostWhole = function (t, e) {
      var n = Math.round(t);return n - e <= t && n + e >= t;
    }, V.max = function (t) {
      return t.reduce(function (t, e) {
        return isNaN(e) ? t : Math.max(t, e);
      }, Number.NEGATIVE_INFINITY);
    }, V.min = function (t) {
      return t.reduce(function (t, e) {
        return isNaN(e) ? t : Math.min(t, e);
      }, Number.POSITIVE_INFINITY);
    }, V.sign = Math.sign ? function (t) {
      return Math.sign(t);
    } : function (t) {
      return 0 === (t = +t) || isNaN(t) ? t : t > 0 ? 1 : -1;
    }, V.toRadians = function (t) {
      return t * (Math.PI / 180);
    }, V.toDegrees = function (t) {
      return t * (180 / Math.PI);
    }, V._decimalPlaces = function (t) {
      if (V.isFinite(t)) {
        for (var e = 1, n = 0; Math.round(t * e) / e !== t;) {
          e *= 10, n++;
        }return n;
      }
    }, V.getAngleFromPoint = function (t, e) {
      var n = e.x - t.x,
          i = e.y - t.y,
          a = Math.sqrt(n * n + i * i),
          r = Math.atan2(i, n);return r < -.5 * Math.PI && (r += 2 * Math.PI), { angle: r, distance: a };
    }, V.distanceBetweenPoints = function (t, e) {
      return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
    }, V.aliasPixel = function (t) {
      return t % 2 == 0 ? 0 : .5;
    }, V._alignPixel = function (t, e, n) {
      var i = t.currentDevicePixelRatio,
          a = n / 2;return Math.round((e - a) * i) / i + a;
    }, V.splineCurve = function (t, e, n, i) {
      var a = t.skip ? e : t,
          r = e,
          o = n.skip ? e : n,
          s = Math.sqrt(Math.pow(r.x - a.x, 2) + Math.pow(r.y - a.y, 2)),
          l = Math.sqrt(Math.pow(o.x - r.x, 2) + Math.pow(o.y - r.y, 2)),
          u = s / (s + l),
          d = l / (s + l),
          h = i * (u = isNaN(u) ? 0 : u),
          c = i * (d = isNaN(d) ? 0 : d);return { previous: { x: r.x - h * (o.x - a.x), y: r.y - h * (o.y - a.y) }, next: { x: r.x + c * (o.x - a.x), y: r.y + c * (o.y - a.y) } };
    }, V.EPSILON = Number.EPSILON || 1e-14, V.splineCurveMonotone = function (t) {
      var e,
          n,
          i,
          a,
          r,
          o,
          s,
          l,
          u,
          d = (t || []).map(function (t) {
        return { model: t._model, deltaK: 0, mK: 0 };
      }),
          h = d.length;for (e = 0; e < h; ++e) {
        if (!(i = d[e]).model.skip) {
          if (n = e > 0 ? d[e - 1] : null, (a = e < h - 1 ? d[e + 1] : null) && !a.model.skip) {
            var c = a.model.x - i.model.x;i.deltaK = 0 !== c ? (a.model.y - i.model.y) / c : 0;
          }!n || n.model.skip ? i.mK = i.deltaK : !a || a.model.skip ? i.mK = n.deltaK : this.sign(n.deltaK) !== this.sign(i.deltaK) ? i.mK = 0 : i.mK = (n.deltaK + i.deltaK) / 2;
        }
      }for (e = 0; e < h - 1; ++e) {
        i = d[e], a = d[e + 1], i.model.skip || a.model.skip || (V.almostEquals(i.deltaK, 0, this.EPSILON) ? i.mK = a.mK = 0 : (r = i.mK / i.deltaK, o = a.mK / i.deltaK, (l = Math.pow(r, 2) + Math.pow(o, 2)) <= 9 || (s = 3 / Math.sqrt(l), i.mK = r * s * i.deltaK, a.mK = o * s * i.deltaK)));
      }for (e = 0; e < h; ++e) {
        (i = d[e]).model.skip || (n = e > 0 ? d[e - 1] : null, a = e < h - 1 ? d[e + 1] : null, n && !n.model.skip && (u = (i.model.x - n.model.x) / 3, i.model.controlPointPreviousX = i.model.x - u, i.model.controlPointPreviousY = i.model.y - u * i.mK), a && !a.model.skip && (u = (a.model.x - i.model.x) / 3, i.model.controlPointNextX = i.model.x + u, i.model.controlPointNextY = i.model.y + u * i.mK));
      }
    }, V.nextItem = function (t, e, n) {
      return n ? e >= t.length - 1 ? t[0] : t[e + 1] : e >= t.length - 1 ? t[t.length - 1] : t[e + 1];
    }, V.previousItem = function (t, e, n) {
      return n ? e <= 0 ? t[t.length - 1] : t[e - 1] : e <= 0 ? t[0] : t[e - 1];
    }, V.niceNum = function (t, e) {
      var n = Math.floor(V.log10(t)),
          i = t / Math.pow(10, n);return (e ? i < 1.5 ? 1 : i < 3 ? 2 : i < 7 ? 5 : 10 : i <= 1 ? 1 : i <= 2 ? 2 : i <= 5 ? 5 : 10) * Math.pow(10, n);
    }, V.requestAnimFrame = "undefined" == typeof window ? function (t) {
      t();
    } : window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
      return window.setTimeout(t, 1e3 / 60);
    }, V.getRelativePosition = function (t, e) {
      var n,
          i,
          a = t.originalEvent || t,
          r = t.target || t.srcElement,
          o = r.getBoundingClientRect(),
          s = a.touches;s && s.length > 0 ? (n = s[0].clientX, i = s[0].clientY) : (n = a.clientX, i = a.clientY);var l = parseFloat(V.getStyle(r, "padding-left")),
          u = parseFloat(V.getStyle(r, "padding-top")),
          d = parseFloat(V.getStyle(r, "padding-right")),
          h = parseFloat(V.getStyle(r, "padding-bottom")),
          c = o.right - o.left - l - d,
          f = o.bottom - o.top - u - h;return { x: n = Math.round((n - o.left - l) / c * r.width / e.currentDevicePixelRatio), y: i = Math.round((i - o.top - u) / f * r.height / e.currentDevicePixelRatio) };
    }, V.getConstraintWidth = function (t) {
      return n(t, "max-width", "clientWidth");
    }, V.getConstraintHeight = function (t) {
      return n(t, "max-height", "clientHeight");
    }, V._calculatePadding = function (t, e, n) {
      return (e = V.getStyle(t, e)).indexOf("%") > -1 ? n * parseInt(e, 10) / 100 : parseInt(e, 10);
    }, V._getParentNode = function (t) {
      var e = t.parentNode;return e && "[object ShadowRoot]" === e.toString() && (e = e.host), e;
    }, V.getMaximumWidth = function (t) {
      var e = V._getParentNode(t);if (!e) return t.clientWidth;var n = e.clientWidth,
          i = n - V._calculatePadding(e, "padding-left", n) - V._calculatePadding(e, "padding-right", n),
          a = V.getConstraintWidth(t);return isNaN(a) ? i : Math.min(i, a);
    }, V.getMaximumHeight = function (t) {
      var e = V._getParentNode(t);if (!e) return t.clientHeight;var n = e.clientHeight,
          i = n - V._calculatePadding(e, "padding-top", n) - V._calculatePadding(e, "padding-bottom", n),
          a = V.getConstraintHeight(t);return isNaN(a) ? i : Math.min(i, a);
    }, V.getStyle = function (t, e) {
      return t.currentStyle ? t.currentStyle[e] : document.defaultView.getComputedStyle(t, null).getPropertyValue(e);
    }, V.retinaScale = function (t, e) {
      var n = t.currentDevicePixelRatio = e || "undefined" != typeof window && window.devicePixelRatio || 1;if (1 !== n) {
        var i = t.canvas,
            a = t.height,
            r = t.width;i.height = a * n, i.width = r * n, t.ctx.scale(n, n), i.style.height || i.style.width || (i.style.height = a + "px", i.style.width = r + "px");
      }
    }, V.fontString = function (t, e, n) {
      return e + " " + t + "px " + n;
    }, V.longestText = function (t, e, n, i) {
      var a = (i = i || {}).data = i.data || {},
          r = i.garbageCollect = i.garbageCollect || [];i.font !== e && (a = i.data = {}, r = i.garbageCollect = [], i.font = e), t.font = e;var o,
          s,
          l,
          u,
          d,
          h = 0,
          c = n.length;for (o = 0; o < c; o++) {
        if (null != (u = n[o]) && !0 !== V.isArray(u)) h = V.measureText(t, a, r, h, u);else if (V.isArray(u)) for (s = 0, l = u.length; s < l; s++) {
          null == (d = u[s]) || V.isArray(d) || (h = V.measureText(t, a, r, h, d));
        }
      }var f = r.length / 2;if (f > n.length) {
        for (o = 0; o < f; o++) {
          delete a[r[o]];
        }r.splice(0, f);
      }return h;
    }, V.measureText = function (t, e, n, i, a) {
      var r = e[a];return r || (r = e[a] = t.measureText(a).width, n.push(a)), r > i && (i = r), i;
    }, V.numberOfLabelLines = function (t) {
      var e = 1;return V.each(t, function (t) {
        V.isArray(t) && t.length > e && (e = t.length);
      }), e;
    }, V.color = k ? function (t) {
      return t instanceof CanvasGradient && (t = z.global.defaultColor), k(t);
    } : function (t) {
      return console.error("Color.js not found!"), t;
    }, V.getHoverColor = function (t) {
      return t instanceof CanvasPattern || t instanceof CanvasGradient ? t : V.color(t).saturate(.5).darken(.1).rgbString();
    };
  }(), tn._adapters = an, tn.Animation = Z, tn.animationService = $, tn.controllers = $t, tn.DatasetController = nt, tn.defaults = z, tn.Element = X, tn.elements = _t, tn.Interaction = ae, tn.layouts = ge, tn.platform = Fe, tn.plugins = Le, tn.Scale = xn, tn.scaleService = Oe, tn.Ticks = rn, tn.Tooltip = Ue, tn.helpers.each(ci, function (t, e) {
    tn.scaleService.registerScaleType(e, t, t._defaults);
  }), Li) {
    Li.hasOwnProperty(Ni) && tn.plugins.register(Li[Ni]);
  }tn.platform.initialize();var Bi = tn;return "undefined" != typeof window && (window.Chart = tn), tn.Chart = tn, tn.Legend = Li.legend._element, tn.Title = Li.title._element, tn.pluginService = tn.plugins, tn.PluginBase = tn.Element.extend({}), tn.canvasHelpers = tn.helpers.canvas, tn.layoutService = tn.layouts, tn.LinearScaleBase = Sn, tn.helpers.each(["Bar", "Bubble", "Doughnut", "Line", "PolarArea", "Radar", "Scatter"], function (t) {
    tn[t] = function (e, n) {
      return new tn(e, tn.helpers.merge(n || {}, { type: t.charAt(0).toLowerCase() + t.slice(1) }));
    };
  }), Bi;
});
/*! pace 1.0.2 */
(function () {
  var a,
      b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      _v,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L,
      M,
      N,
      O,
      P,
      Q,
      R,
      S,
      T,
      U,
      V,
      W,
      X = [].slice,
      Y = {}.hasOwnProperty,
      Z = function Z(a, b) {
    function c() {
      this.constructor = a;
    }for (var d in b) {
      Y.call(b, d) && (a[d] = b[d]);
    }return c.prototype = b.prototype, a.prototype = new c(), a.__super__ = b.prototype, a;
  },
      $ = [].indexOf || function (a) {
    for (var b = 0, c = this.length; c > b; b++) {
      if (b in this && this[b] === a) return b;
    }return -1;
  };for (u = { catchupTime: 100, initialRate: .03, minTime: 250, ghostTime: 100, maxProgressPerFrame: 20, easeFactor: 1.25, startOnPageLoad: !0, restartOnPushState: !0, restartOnRequestAfter: 500, target: "body", elements: { checkInterval: 100, selectors: ["body"] }, eventLag: { minSamples: 10, sampleCount: 3, lagThreshold: 3 }, ajax: { trackMethods: ["GET"], trackWebSockets: !0, ignoreURLs: [] } }, C = function C() {
    var a;return null != (a = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance.now() : void 0) ? a : +new Date();
  }, E = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame, t = window.cancelAnimationFrame || window.mozCancelAnimationFrame, null == E && (E = function E(a) {
    return setTimeout(a, 50);
  }, t = function t(a) {
    return clearTimeout(a);
  }), G = function G(a) {
    var b, _c3;return b = C(), (_c3 = function c() {
      var d;return d = C() - b, d >= 33 ? (b = C(), a(d, function () {
        return E(_c3);
      })) : setTimeout(_c3, 33 - d);
    })();
  }, F = function F() {
    var a, b, c;return c = arguments[0], b = arguments[1], a = 3 <= arguments.length ? X.call(arguments, 2) : [], "function" == typeof c[b] ? c[b].apply(c, a) : c[b];
  }, _v = function v() {
    var a, b, c, d, e, f, g;for (b = arguments[0], d = 2 <= arguments.length ? X.call(arguments, 1) : [], f = 0, g = d.length; g > f; f++) {
      if (c = d[f]) for (a in c) {
        Y.call(c, a) && (e = c[a], null != b[a] && "object" == _typeof(b[a]) && null != e && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) ? _v(b[a], e) : b[a] = e);
      }
    }return b;
  }, q = function q(a) {
    var b, c, d, e, f;for (c = b = 0, e = 0, f = a.length; f > e; e++) {
      d = a[e], c += Math.abs(d), b++;
    }return c / b;
  }, x = function x(a, b) {
    var c, d, e;if (null == a && (a = "options"), null == b && (b = !0), e = document.querySelector("[data-pace-" + a + "]")) {
      if (c = e.getAttribute("data-pace-" + a), !b) return c;try {
        return JSON.parse(c);
      } catch (f) {
        return d = f, "undefined" != typeof console && null !== console ? console.error("Error parsing inline pace options", d) : void 0;
      }
    }
  }, g = function () {
    function a() {}return a.prototype.on = function (a, b, c, d) {
      var e;return null == d && (d = !1), null == this.bindings && (this.bindings = {}), null == (e = this.bindings)[a] && (e[a] = []), this.bindings[a].push({ handler: b, ctx: c, once: d });
    }, a.prototype.once = function (a, b, c) {
      return this.on(a, b, c, !0);
    }, a.prototype.off = function (a, b) {
      var c, d, e;if (null != (null != (d = this.bindings) ? d[a] : void 0)) {
        if (null == b) return delete this.bindings[a];for (c = 0, e = []; c < this.bindings[a].length;) {
          e.push(this.bindings[a][c].handler === b ? this.bindings[a].splice(c, 1) : c++);
        }return e;
      }
    }, a.prototype.trigger = function () {
      var a, b, c, d, e, f, g, h, i;if (c = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], null != (g = this.bindings) ? g[c] : void 0) {
        for (e = 0, i = []; e < this.bindings[c].length;) {
          h = this.bindings[c][e], d = h.handler, b = h.ctx, f = h.once, d.apply(null != b ? b : this, a), i.push(f ? this.bindings[c].splice(e, 1) : e++);
        }return i;
      }
    }, a;
  }(), j = window.Pace || {}, window.Pace = j, _v(j, g.prototype), D = j.options = _v({}, u, window.paceOptions, x()), U = ["ajax", "document", "eventLag", "elements"], Q = 0, S = U.length; S > Q; Q++) {
    K = U[Q], D[K] === !0 && (D[K] = u[K]);
  }i = function (a) {
    function b() {
      return V = b.__super__.constructor.apply(this, arguments);
    }return Z(b, a), b;
  }(Error), b = function () {
    function a() {
      this.progress = 0;
    }return a.prototype.getElement = function () {
      var a;if (null == this.el) {
        if (a = document.querySelector(D.target), !a) throw new i();this.el = document.createElement("div"), this.el.className = "pace pace-active", document.body.className = document.body.className.replace(/pace-done/g, ""), document.body.className += " pace-running", this.el.innerHTML = '<div class="pace-progress">\n  <div class="pace-progress-inner"></div>\n</div>\n<div class="pace-activity"></div>', null != a.firstChild ? a.insertBefore(this.el, a.firstChild) : a.appendChild(this.el);
      }return this.el;
    }, a.prototype.finish = function () {
      var a;return a = this.getElement(), a.className = a.className.replace("pace-active", ""), a.className += " pace-inactive", document.body.className = document.body.className.replace("pace-running", ""), document.body.className += " pace-done";
    }, a.prototype.update = function (a) {
      return this.progress = a, this.render();
    }, a.prototype.destroy = function () {
      try {
        this.getElement().parentNode.removeChild(this.getElement());
      } catch (a) {
        i = a;
      }return this.el = void 0;
    }, a.prototype.render = function () {
      var a, b, c, d, e, f, g;if (null == document.querySelector(D.target)) return !1;for (a = this.getElement(), d = "translate3d(" + this.progress + "%, 0, 0)", g = ["webkitTransform", "msTransform", "transform"], e = 0, f = g.length; f > e; e++) {
        b = g[e], a.children[0].style[b] = d;
      }return (!this.lastRenderedProgress || this.lastRenderedProgress | 0 !== this.progress | 0) && (a.children[0].setAttribute("data-progress-text", "" + (0 | this.progress) + "%"), this.progress >= 100 ? c = "99" : (c = this.progress < 10 ? "0" : "", c += 0 | this.progress), a.children[0].setAttribute("data-progress", "" + c)), this.lastRenderedProgress = this.progress;
    }, a.prototype.done = function () {
      return this.progress >= 100;
    }, a;
  }(), h = function () {
    function a() {
      this.bindings = {};
    }return a.prototype.trigger = function (a, b) {
      var c, d, e, f, g;if (null != this.bindings[a]) {
        for (f = this.bindings[a], g = [], d = 0, e = f.length; e > d; d++) {
          c = f[d], g.push(c.call(this, b));
        }return g;
      }
    }, a.prototype.on = function (a, b) {
      var c;return null == (c = this.bindings)[a] && (c[a] = []), this.bindings[a].push(b);
    }, a;
  }(), P = window.XMLHttpRequest, O = window.XDomainRequest, N = window.WebSocket, w = function w(a, b) {
    var c, d, e;e = [];for (d in b.prototype) {
      try {
        e.push(null == a[d] && "function" != typeof b[d] ? "function" == typeof Object.defineProperty ? Object.defineProperty(a, d, { get: function get() {
            return b.prototype[d];
          }, configurable: !0, enumerable: !0 }) : a[d] = b.prototype[d] : void 0);
      } catch (f) {
        c = f;
      }
    }return e;
  }, A = [], j.ignore = function () {
    var a, b, c;return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("ignore"), c = b.apply(null, a), A.shift(), c;
  }, j.track = function () {
    var a, b, c;return b = arguments[0], a = 2 <= arguments.length ? X.call(arguments, 1) : [], A.unshift("track"), c = b.apply(null, a), A.shift(), c;
  }, J = function J(a) {
    var b;if (null == a && (a = "GET"), "track" === A[0]) return "force";if (!A.length && D.ajax) {
      if ("socket" === a && D.ajax.trackWebSockets) return !0;if (b = a.toUpperCase(), $.call(D.ajax.trackMethods, b) >= 0) return !0;
    }return !1;
  }, k = function (a) {
    function b() {
      var a,
          c = this;b.__super__.constructor.apply(this, arguments), a = function a(_a2) {
        var b;return b = _a2.open, _a2.open = function (d, e) {
          return J(d) && c.trigger("request", { type: d, url: e, request: _a2 }), b.apply(_a2, arguments);
        };
      }, window.XMLHttpRequest = function (b) {
        var c;return c = new P(b), a(c), c;
      };try {
        w(window.XMLHttpRequest, P);
      } catch (d) {}if (null != O) {
        window.XDomainRequest = function () {
          var b;return b = new O(), a(b), b;
        };try {
          w(window.XDomainRequest, O);
        } catch (d) {}
      }if (null != N && D.ajax.trackWebSockets) {
        window.WebSocket = function (a, b) {
          var d;return d = null != b ? new N(a, b) : new N(a), J("socket") && c.trigger("request", { type: "socket", url: a, protocols: b, request: d }), d;
        };try {
          w(window.WebSocket, N);
        } catch (d) {}
      }
    }return Z(b, a), b;
  }(h), R = null, y = function y() {
    return null == R && (R = new k()), R;
  }, I = function I(a) {
    var b, c, d, e;for (e = D.ajax.ignoreURLs, c = 0, d = e.length; d > c; c++) {
      if (b = e[c], "string" == typeof b) {
        if (-1 !== a.indexOf(b)) return !0;
      } else if (b.test(a)) return !0;
    }return !1;
  }, y().on("request", function (b) {
    var c, d, e, f, g;return f = b.type, e = b.request, g = b.url, I(g) ? void 0 : j.running || D.restartOnRequestAfter === !1 && "force" !== J(f) ? void 0 : (d = arguments, c = D.restartOnRequestAfter || 0, "boolean" == typeof c && (c = 0), setTimeout(function () {
      var b, c, g, h, i, k;if (b = "socket" === f ? e.readyState < 2 : 0 < (h = e.readyState) && 4 > h) {
        for (j.restart(), i = j.sources, k = [], c = 0, g = i.length; g > c; c++) {
          if (K = i[c], K instanceof a) {
            K.watch.apply(K, d);break;
          }k.push(void 0);
        }return k;
      }
    }, c));
  }), a = function () {
    function a() {
      var a = this;this.elements = [], y().on("request", function () {
        return a.watch.apply(a, arguments);
      });
    }return a.prototype.watch = function (a) {
      var b, c, d, e;return d = a.type, b = a.request, e = a.url, I(e) ? void 0 : (c = "socket" === d ? new n(b) : new o(b), this.elements.push(c));
    }, a;
  }(), o = function () {
    function a(a) {
      var b,
          c,
          d,
          e,
          f,
          g,
          h = this;if (this.progress = 0, null != window.ProgressEvent) for (c = null, a.addEventListener("progress", function (a) {
        return h.progress = a.lengthComputable ? 100 * a.loaded / a.total : h.progress + (100 - h.progress) / 2;
      }, !1), g = ["load", "abort", "timeout", "error"], d = 0, e = g.length; e > d; d++) {
        b = g[d], a.addEventListener(b, function () {
          return h.progress = 100;
        }, !1);
      } else f = a.onreadystatechange, a.onreadystatechange = function () {
        var b;return 0 === (b = a.readyState) || 4 === b ? h.progress = 100 : 3 === a.readyState && (h.progress = 50), "function" == typeof f ? f.apply(null, arguments) : void 0;
      };
    }return a;
  }(), n = function () {
    function a(a) {
      var b,
          c,
          d,
          e,
          f = this;for (this.progress = 0, e = ["error", "open"], c = 0, d = e.length; d > c; c++) {
        b = e[c], a.addEventListener(b, function () {
          return f.progress = 100;
        }, !1);
      }
    }return a;
  }(), d = function () {
    function a(a) {
      var b, c, d, f;for (null == a && (a = {}), this.elements = [], null == a.selectors && (a.selectors = []), f = a.selectors, c = 0, d = f.length; d > c; c++) {
        b = f[c], this.elements.push(new e(b));
      }
    }return a;
  }(), e = function () {
    function a(a) {
      this.selector = a, this.progress = 0, this.check();
    }return a.prototype.check = function () {
      var a = this;return document.querySelector(this.selector) ? this.done() : setTimeout(function () {
        return a.check();
      }, D.elements.checkInterval);
    }, a.prototype.done = function () {
      return this.progress = 100;
    }, a;
  }(), c = function () {
    function a() {
      var a,
          b,
          c = this;this.progress = null != (b = this.states[document.readyState]) ? b : 100, a = document.onreadystatechange, document.onreadystatechange = function () {
        return null != c.states[document.readyState] && (c.progress = c.states[document.readyState]), "function" == typeof a ? a.apply(null, arguments) : void 0;
      };
    }return a.prototype.states = { loading: 0, interactive: 50, complete: 100 }, a;
  }(), f = function () {
    function a() {
      var a,
          b,
          c,
          d,
          e,
          f = this;this.progress = 0, a = 0, e = [], d = 0, c = C(), b = setInterval(function () {
        var g;return g = C() - c - 50, c = C(), e.push(g), e.length > D.eventLag.sampleCount && e.shift(), a = q(e), ++d >= D.eventLag.minSamples && a < D.eventLag.lagThreshold ? (f.progress = 100, clearInterval(b)) : f.progress = 100 * (3 / (a + 3));
      }, 50);
    }return a;
  }(), m = function () {
    function a(a) {
      this.source = a, this.last = this.sinceLastUpdate = 0, this.rate = D.initialRate, this.catchup = 0, this.progress = this.lastProgress = 0, null != this.source && (this.progress = F(this.source, "progress"));
    }return a.prototype.tick = function (a, b) {
      var c;return null == b && (b = F(this.source, "progress")), b >= 100 && (this.done = !0), b === this.last ? this.sinceLastUpdate += a : (this.sinceLastUpdate && (this.rate = (b - this.last) / this.sinceLastUpdate), this.catchup = (b - this.progress) / D.catchupTime, this.sinceLastUpdate = 0, this.last = b), b > this.progress && (this.progress += this.catchup * a), c = 1 - Math.pow(this.progress / 100, D.easeFactor), this.progress += c * this.rate * a, this.progress = Math.min(this.lastProgress + D.maxProgressPerFrame, this.progress), this.progress = Math.max(0, this.progress), this.progress = Math.min(100, this.progress), this.lastProgress = this.progress, this.progress;
    }, a;
  }(), L = null, H = null, r = null, M = null, p = null, s = null, j.running = !1, z = function z() {
    return D.restartOnPushState ? j.restart() : void 0;
  }, null != window.history.pushState && (T = window.history.pushState, window.history.pushState = function () {
    return z(), T.apply(window.history, arguments);
  }), null != window.history.replaceState && (W = window.history.replaceState, window.history.replaceState = function () {
    return z(), W.apply(window.history, arguments);
  }), l = { ajax: a, elements: d, document: c, eventLag: f }, (B = function B() {
    var a, c, d, e, f, g, h, i;for (j.sources = L = [], g = ["ajax", "elements", "document", "eventLag"], c = 0, e = g.length; e > c; c++) {
      a = g[c], D[a] !== !1 && L.push(new l[a](D[a]));
    }for (i = null != (h = D.extraSources) ? h : [], d = 0, f = i.length; f > d; d++) {
      K = i[d], L.push(new K(D));
    }return j.bar = r = new b(), H = [], M = new m();
  })(), j.stop = function () {
    return j.trigger("stop"), j.running = !1, r.destroy(), s = !0, null != p && ("function" == typeof t && t(p), p = null), B();
  }, j.restart = function () {
    return j.trigger("restart"), j.stop(), j.start();
  }, j.go = function () {
    var a;return j.running = !0, r.render(), a = C(), s = !1, p = G(function (b, c) {
      var d, e, f, g, h, i, k, l, n, o, p, q, t, u, v, w;for (l = 100 - r.progress, e = p = 0, f = !0, i = q = 0, u = L.length; u > q; i = ++q) {
        for (K = L[i], o = null != H[i] ? H[i] : H[i] = [], h = null != (w = K.elements) ? w : [K], k = t = 0, v = h.length; v > t; k = ++t) {
          g = h[k], n = null != o[k] ? o[k] : o[k] = new m(g), f &= n.done, n.done || (e++, p += n.tick(b));
        }
      }return d = p / e, r.update(M.tick(b, d)), r.done() || f || s ? (r.update(100), j.trigger("done"), setTimeout(function () {
        return r.finish(), j.running = !1, j.trigger("hide");
      }, Math.max(D.ghostTime, Math.max(D.minTime - (C() - a), 0)))) : c();
    });
  }, j.start = function (a) {
    _v(D, a), j.running = !0;try {
      r.render();
    } catch (b) {
      i = b;
    }return document.querySelector(".pace") ? (j.trigger("start"), j.go()) : setTimeout(j.start, 50);
  }, "function" == typeof define && define.amd ? define(["pace"], function () {
    return j;
  }) : "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) ? module.exports = j : D.startOnPageLoad && j.start();
}).call(this);
/*****
* CONFIGURATION
*/
// Active ajax page loader
$.ajaxLoad = true;

//required when $.ajaxLoad = true
//$.defaultPage = 'main.html';
//$.subPagesDirectory = 'views/';
//$.page404 = 'views/pages/404.html';
$.mainContent = $('#ui-view');

//Main navigation
$.navigation = $('nav > ul.nav');

$.panelIconOpened = 'icon-arrow-up';
$.panelIconClosed = 'icon-arrow-down';

//Default colours
$.brandPrimary = '#20a8d8';
$.brandSuccess = '#4dbd74';
$.brandInfo = '#63c2de';
$.brandWarning = '#f8cb00';
$.brandDanger = '#f86c6b';

$.grayDark = '#2a2c36';
$.gray = '#55595c';
$.grayLight = '#818a91';
$.grayLighter = '#d1d4d7';
$.grayLightest = '#f8f9fa';

'use strict';

/*****
* ASYNC LOAD
* Load JS files and CSS files asynchronously in ajax mode
*/
function loadJS(jsFiles, pageScript) {

  var i;
  for (i = 0; i < jsFiles.length; i++) {

    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = jsFiles[i];
    body.appendChild(script);
  }

  if (pageScript) {
    var body = document.getElementsByTagName('body')[0];
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = false;
    script.src = pageScript;
    body.appendChild(script);
  }

  init();
}

function loadCSS(cssFile, end, callback) {

  var cssArray = {};

  if (!cssArray[cssFile]) {
    cssArray[cssFile] = true;

    if (end == 1) {

      var head = document.getElementsByTagName('head')[0];
      var s = document.createElement('link');
      s.setAttribute('rel', 'stylesheet');
      s.setAttribute('type', 'text/css');
      s.setAttribute('href', cssFile);

      s.onload = callback;
      head.appendChild(s);
    } else {

      var head = document.getElementsByTagName('head')[0];
      var style = document.getElementById('main-style');

      var s = document.createElement('link');
      s.setAttribute('rel', 'stylesheet');
      s.setAttribute('type', 'text/css');
      s.setAttribute('href', cssFile);

      s.onload = callback;
      head.insertBefore(s, style);
    }
  } else if (callback) {
    callback();
  }
}

/****
* AJAX LOAD
* Load pages asynchronously in ajax mode
*/

if ($.ajaxLoad) {

  var paceOptions = {
    elements: false,
    restartOnRequestAfter: false
  };

  var url = location.hash.replace(/^#/, '');

  if (url != '') {
    setUpUrl(url);
  } else {
    setUpUrl($.defaultPage);
  }

  $(document).on('click', '.nav a[href!="#"]', function (e) {
    if ($(this).parent().parent().hasClass('nav-tabs') || $(this).parent().parent().hasClass('nav-pills')) {
      e.preventDefault();
    } else if ($(this).attr('target') == '_top') {
      e.preventDefault();
      var target = $(e.currentTarget);
      window.location = target.attr('href');
    } else if ($(this).attr('target') == '_blank') {
      e.preventDefault();
      var target = $(e.currentTarget);
      window.open(target.attr('href'));
    } else {
      e.preventDefault();
      var target = $(e.currentTarget);
      setUpUrl(target.attr('href'));
    }
  });

  $(document).on('click', 'a[href="#"]', function (e) {
    e.preventDefault();
  });
}

function setUpUrl(url) {

  $('nav .nav li .nav-link').removeClass('active');
  $('nav .nav li.nav-dropdown').removeClass('open');
  //$('nav .nav li:has(a[href="' + url.split('?')[0] + '"])').addClass('open');
  //$('nav .nav a[href="' + url.split('?')[0] + '"]').addClass('active');

  loadPage(url);
}

function loadPage(url) {

  $.ajax({
    type: 'GET',
    url: $.subPagesDirectory + url,
    dataType: 'html',
    cache: false,
    async: false,
    beforeSend: function beforeSend() {
      $.mainContent.css({ opacity: 0 });
    },
    success: function success() {
      Pace.restart();
      $('html, body').animate({ scrollTop: 0 }, 0);
      //$.mainContent.load($.subPagesDirectory + url, null, function (responseText) {
      //  window.location.hash = url;
      //}).delay(250).animate({ opacity : 1 }, 0);
    },
    error: function error() {
      //window.location.href = $.page404;
    }

  });
}

/****
* MAIN NAVIGATION
*/

$(document).ready(function ($) {

  // Add class .active to current link - AJAX Mode off
  $.navigation.find('a').each(function () {

    var cUrl = String(window.location).split('?')[0];

    if (cUrl.substr(cUrl.length - 1) == '#') {
      cUrl = cUrl.slice(0, -1);
    }

    if ($($(this))[0].href == cUrl) {
      $(this).addClass('active');

      $(this).parents('ul').add(this).each(function () {
        $(this).parent().addClass('open');
      });
    }
  });

  // Dropdown Menu
  $.navigation.on('click', 'a', function (e) {

    if ($.ajaxLoad) {
      e.preventDefault();
    }

    if ($(this).hasClass('nav-dropdown-toggle')) {
      $(this).parent().toggleClass('open');
      resizeBroadcast();
    }
  });

  function resizeBroadcast() {

    var timesRun = 0;
    var interval = setInterval(function () {
      timesRun += 1;
      if (timesRun === 5) {
        clearInterval(interval);
      }
      window.dispatchEvent(new Event('resize'));
    }, 62.5);
  }

  /* ---------- Main Menu Open/Close, Min/Full ---------- */
  $('.sidebar-toggler').click(function () {
    $('body').toggleClass('sidebar-hidden');
    resizeBroadcast();
  });

  $('.sidebar-minimizer').click(function () {
    $('body').toggleClass('sidebar-minimized');
    resizeBroadcast();
  });

  $('.brand-minimizer').click(function () {
    $('body').toggleClass('brand-minimized');
  });

  $('.aside-menu-toggler').click(function () {
    $('body').toggleClass('aside-menu-hidden');
    resizeBroadcast();
  });

  $('.mobile-sidebar-toggler').click(function () {
    $('body').toggleClass('sidebar-mobile-show');
    resizeBroadcast();
  });

  $('.sidebar-close').click(function () {
    $('body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
  });

  /* ---------- Disable moving to top ---------- */
  $('a[href="#"][data-top!=true]').click(function (e) {
    e.preventDefault();
  });
});

/****
* CARDS ACTIONS
*/

$(document).on('click', '.card-actions a', function (e) {
  e.preventDefault();

  if ($(this).hasClass('btn-close')) {
    $(this).parent().parent().parent().fadeOut();
  } else if ($(this).hasClass('btn-minimize')) {
    var $target = $(this).parent().parent().next('.card-block');
    if (!$(this).hasClass('collapsed')) {
      $('i', $(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
    } else {
      $('i', $(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
    }
  } else if ($(this).hasClass('btn-setting')) {
    $('#myModal').modal('show');
  }
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function init(url) {

  /* ---------- Tooltip ---------- */
  $('[rel="tooltip"],[data-rel="tooltip"]').tooltip({ "placement": "bottom", delay: { show: 400, hide: 200 } });

  /* ---------- Popover ---------- */
  $('[rel="popover"],[data-rel="popover"],[data-toggle="popover"]').popover();
}

!function (t, e) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).Sweetalert2 = e();
}(this, function () {
  "use strict";
  function r(t) {
    return (r = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (t) {
      return typeof t === "undefined" ? "undefined" : _typeof(t);
    } : function (t) {
      return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t === "undefined" ? "undefined" : _typeof(t);
    })(t);
  }function o(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }function i(t, e) {
    for (var n = 0; n < e.length; n++) {
      var o = e[n];o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o);
    }
  }function a(t, e, n) {
    return e && i(t.prototype, e), n && i(t, n), t;
  }function c() {
    return (c = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];for (var o in n) {
          Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
      }return t;
    }).apply(this, arguments);
  }function s(t) {
    return (s = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
      return t.__proto__ || Object.getPrototypeOf(t);
    })(t);
  }function u(t, e) {
    return (u = Object.setPrototypeOf || function (t, e) {
      return t.__proto__ = e, t;
    })(t, e);
  }function l(t, e, n) {
    return (l = function () {
      if ("undefined" != typeof Reflect && Reflect.construct && !Reflect.construct.sham) {
        if ("function" == typeof Proxy) return 1;try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function () {})), 1;
        } catch (t) {
          return;
        }
      }
    }() ? Reflect.construct : function (t, e, n) {
      var o = [null];o.push.apply(o, e);var i = new (Function.bind.apply(t, o))();return n && u(i, n.prototype), i;
    }).apply(null, arguments);
  }function d(t, e) {
    return !e || "object" != (typeof e === "undefined" ? "undefined" : _typeof(e)) && "function" != typeof e ? function (t) {
      if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t;
    }(t) : e;
  }function p(t, e, n) {
    return (p = "undefined" != typeof Reflect && Reflect.get ? Reflect.get : function (t, e, n) {
      var o = function (t, e) {
        for (; !Object.prototype.hasOwnProperty.call(t, e) && null !== (t = s(t));) {}return t;
      }(t, e);if (o) {
        var i = Object.getOwnPropertyDescriptor(o, e);return i.get ? i.get.call(n) : i.value;
      }
    })(t, e, n || t);
  }function f(e) {
    return Object.keys(e).map(function (t) {
      return e[t];
    });
  }function m(t) {
    return Array.prototype.slice.call(t);
  }function v(t) {
    console.error("".concat(V, " ").concat(t));
  }function h(t, e) {
    var n;n = '"'.concat(t, '" is deprecated and will be removed in the next major release. Please use "').concat(e, '" instead.'), -1 === D.indexOf(n) && (D.push(n), R(n));
  }function g(t) {
    return t && Promise.resolve(t) === t;
  }function b(t) {
    return t instanceof Element || "object" === r(e = t) && e.jquery;var e;
  }function t(t) {
    var e = {};for (var n in t) {
      e[t[n]] = "swal2-" + t[n];
    }return e;
  }function y(t) {
    var e = z();return e ? e.querySelector(t) : null;
  }function e(t) {
    return y(".".concat(t));
  }function n() {
    var t = W();return m(t.querySelectorAll(".".concat(_.icon)));
  }function w() {
    var t = n().filter(function (t) {
      return dt(t);
    });return t.length ? t[0] : null;
  }function C() {
    return e(_.title);
  }function k() {
    return e(_.content);
  }function x() {
    return e(_.image);
  }function P() {
    return e(_["progress-steps"]);
  }function A() {
    return e(_["validation-message"]);
  }function B() {
    return y(".".concat(_.actions, " .").concat(_.confirm));
  }function T() {
    return y(".".concat(_.actions, " .").concat(_.cancel));
  }function E() {
    return e(_.actions);
  }function S() {
    return e(_.header);
  }function L() {
    return e(_.footer);
  }function O() {
    return e(_["timer-progress-bar"]);
  }function M() {
    return e(_.close);
  }function H() {
    var t = m(W().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')).sort(function (t, e) {
      return t = parseInt(t.getAttribute("tabindex")), (e = parseInt(e.getAttribute("tabindex"))) < t ? 1 : t < e ? -1 : 0;
    }),
        e = m(W().querySelectorAll('\n  a[href],\n  area[href],\n  input:not([disabled]),\n  select:not([disabled]),\n  textarea:not([disabled]),\n  button:not([disabled]),\n  iframe,\n  object,\n  embed,\n  [tabindex="0"],\n  [contenteditable],\n  audio[controls],\n  video[controls],\n  summary\n')).filter(function (t) {
      return "-1" !== t.getAttribute("tabindex");
    });return function (t) {
      for (var e = [], n = 0; n < t.length; n++) {
        -1 === e.indexOf(t[n]) && e.push(t[n]);
      }return e;
    }(t.concat(e)).filter(function (t) {
      return dt(t);
    });
  }function I() {
    return !K() && !document.body.classList.contains(_["no-backdrop"]);
  }function j(t, e) {
    if (e) {
      for (var n = e.split(/\s+/), o = 0; o < n.length; o++) {
        if (!t.classList.contains(n[o])) return;
      }return 1;
    }
  }function q(t, e, n) {
    var o, i;if (i = e, m((o = t).classList).forEach(function (t) {
      -1 === f(_).indexOf(t) && -1 === f(F).indexOf(t) && -1 === f(i.showClass).indexOf(t) && o.classList.remove(t);
    }), e.customClass && e.customClass[n]) {
      if ("string" != typeof e.customClass[n] && !e.customClass[n].forEach) return R("Invalid type of customClass.".concat(n, '! Expected string or iterable object, got "').concat(r(e.customClass[n]), '"'));st(t, e.customClass[n]);
    }
  }var V = "SweetAlert2:",
      R = function R(t) {
    console.warn("".concat(V, " ").concat(t));
  },
      D = [],
      N = function N(t) {
    return "function" == typeof t ? t() : t;
  },
      U = Object.freeze({ cancel: "cancel", backdrop: "backdrop", close: "close", esc: "esc", timer: "timer" }),
      _ = t(["container", "shown", "height-auto", "iosfix", "popup", "modal", "no-backdrop", "no-transition", "toast", "toast-shown", "toast-column", "show", "hide", "close", "title", "header", "content", "html-container", "actions", "confirm", "cancel", "footer", "icon", "icon-content", "image", "input", "file", "range", "select", "radio", "checkbox", "label", "textarea", "inputerror", "validation-message", "progress-steps", "active-progress-step", "progress-step", "progress-step-line", "loading", "styled", "top", "top-start", "top-end", "top-left", "top-right", "center", "center-start", "center-end", "center-left", "center-right", "bottom", "bottom-start", "bottom-end", "bottom-left", "bottom-right", "grow-row", "grow-column", "grow-fullscreen", "rtl", "timer-progress-bar", "timer-progress-bar-container", "scrollbar-measure", "icon-success", "icon-warning", "icon-info", "icon-question", "icon-error"]),
      F = t(["success", "warning", "info", "question", "error"]),
      z = function z() {
    return document.body.querySelector(".".concat(_.container));
  },
      W = function W() {
    return e(_.popup);
  },
      K = function K() {
    return document.body.classList.contains(_["toast-shown"]);
  },
      Y = { previousBodyPadding: null };function Z(t, e) {
    if (!e) return null;switch (e) {case "select":case "textarea":case "file":
        return lt(t, _[e]);case "checkbox":
        return t.querySelector(".".concat(_.checkbox, " input"));case "radio":
        return t.querySelector(".".concat(_.radio, " input:checked")) || t.querySelector(".".concat(_.radio, " input:first-child"));case "range":
        return t.querySelector(".".concat(_.range, " input"));default:
        return lt(t, _.input);}
  }function Q(t) {
    if (t.focus(), "file" !== t.type) {
      var e = t.value;t.value = "", t.value = e;
    }
  }function $(t, e, n) {
    t && e && ("string" == typeof e && (e = e.split(/\s+/).filter(Boolean)), e.forEach(function (e) {
      t.forEach ? t.forEach(function (t) {
        n ? t.classList.add(e) : t.classList.remove(e);
      }) : n ? t.classList.add(e) : t.classList.remove(e);
    }));
  }function J(t, e, n) {
    n || 0 === parseInt(n) ? t.style[e] = "number" == typeof n ? "".concat(n, "px") : n : t.style.removeProperty(e);
  }function X(t, e) {
    var n = 1 < arguments.length && void 0 !== e ? e : "flex";t.style.opacity = "", t.style.display = n;
  }function G(t) {
    t.style.opacity = "", t.style.display = "none";
  }function tt(t, e, n) {
    e ? X(t, n) : G(t);
  }function et(t) {
    var e = window.getComputedStyle(t),
        n = parseFloat(e.getPropertyValue("animation-duration") || "0"),
        o = parseFloat(e.getPropertyValue("transition-duration") || "0");return 0 < n || 0 < o;
  }function nt(t, e) {
    var n = 1 < arguments.length && void 0 !== e && e,
        o = O();dt(o) && (n && (o.style.transition = "none", o.style.width = "100%"), setTimeout(function () {
      o.style.transition = "width ".concat(t / 1e3, "s linear"), o.style.width = "0%";
    }, 10));
  }function ot() {
    return "undefined" == typeof window || "undefined" == typeof document;
  }function it(t) {
    Xe.isVisible() && ct !== t.target.value && Xe.resetValidationMessage(), ct = t.target.value;
  }function rt(t, e) {
    t instanceof HTMLElement ? e.appendChild(t) : "object" === r(t) ? mt(t, e) : t && (e.innerHTML = t);
  }function at(t, e) {
    var n = E(),
        o = B(),
        i = T();e.showConfirmButton || e.showCancelButton || G(n), q(n, e, "actions"), vt(o, "confirm", e), vt(i, "cancel", e), e.buttonsStyling ? function (t, e, n) {
      st([t, e], _.styled), n.confirmButtonColor && (t.style.backgroundColor = n.confirmButtonColor);n.cancelButtonColor && (e.style.backgroundColor = n.cancelButtonColor);var o = window.getComputedStyle(t).getPropertyValue("background-color");t.style.borderLeftColor = o, t.style.borderRightColor = o;
    }(o, i, e) : (ut([o, i], _.styled), o.style.backgroundColor = o.style.borderLeftColor = o.style.borderRightColor = "", i.style.backgroundColor = i.style.borderLeftColor = i.style.borderRightColor = ""), e.reverseButtons && o.parentNode.insertBefore(i, o);
  }var ct,
      st = function st(t, e) {
    $(t, e, !0);
  },
      ut = function ut(t, e) {
    $(t, e, !1);
  },
      lt = function lt(t, e) {
    for (var n = 0; n < t.childNodes.length; n++) {
      if (j(t.childNodes[n], e)) return t.childNodes[n];
    }
  },
      dt = function dt(t) {
    return !(!t || !(t.offsetWidth || t.offsetHeight || t.getClientRects().length));
  },
      pt = '\n <div aria-labelledby="'.concat(_.title, '" aria-describedby="').concat(_.content, '" class="').concat(_.popup, '" tabindex="-1">\n   <div class="').concat(_.header, '">\n     <ul class="').concat(_["progress-steps"], '"></ul>\n     <div class="').concat(_.icon, " ").concat(F.error, '"></div>\n     <div class="').concat(_.icon, " ").concat(F.question, '"></div>\n     <div class="').concat(_.icon, " ").concat(F.warning, '"></div>\n     <div class="').concat(_.icon, " ").concat(F.info, '"></div>\n     <div class="').concat(_.icon, " ").concat(F.success, '"></div>\n     <img class="').concat(_.image, '" />\n     <h2 class="').concat(_.title, '" id="').concat(_.title, '"></h2>\n     <button type="button" class="').concat(_.close, '"></button>\n   </div>\n   <div class="').concat(_.content, '">\n     <div id="').concat(_.content, '" class="').concat(_["html-container"], '"></div>\n     <input class="').concat(_.input, '" />\n     <input type="file" class="').concat(_.file, '" />\n     <div class="').concat(_.range, '">\n       <input type="range" />\n       <output></output>\n     </div>\n     <select class="').concat(_.select, '"></select>\n     <div class="').concat(_.radio, '"></div>\n     <label for="').concat(_.checkbox, '" class="').concat(_.checkbox, '">\n       <input type="checkbox" />\n       <span class="').concat(_.label, '"></span>\n     </label>\n     <textarea class="').concat(_.textarea, '"></textarea>\n     <div class="').concat(_["validation-message"], '" id="').concat(_["validation-message"], '"></div>\n   </div>\n   <div class="').concat(_.actions, '">\n     <button type="button" class="').concat(_.confirm, '">OK</button>\n     <button type="button" class="').concat(_.cancel, '">Cancel</button>\n   </div>\n   <div class="').concat(_.footer, '"></div>\n   <div class="').concat(_["timer-progress-bar-container"], '">\n     <div class="').concat(_["timer-progress-bar"], '"></div>\n   </div>\n </div>\n').replace(/(^|\n)\s*/g, ""),
      ft = function ft(t) {
    var e,
        n = !!(e = z()) && (e.parentNode.removeChild(e), ut([document.documentElement, document.body], [_["no-backdrop"], _["toast-shown"], _["has-column"]]), !0);if (ot()) v("SweetAlert2 requires document to initialize");else {
      var o = document.createElement("div");o.className = _.container, n && st(o, _["no-transition"]), o.innerHTML = pt;var i,
          r,
          a,
          c,
          s,
          u,
          l,
          d,
          p,
          f,
          m,
          h,
          g = "string" == typeof (i = t.target) ? document.querySelector(i) : i;g.appendChild(o), r = t, (a = W()).setAttribute("role", r.toast ? "alert" : "dialog"), a.setAttribute("aria-live", r.toast ? "polite" : "assertive"), r.toast || a.setAttribute("aria-modal", "true"), c = g, "rtl" === window.getComputedStyle(c).direction && st(z(), _.rtl), s = k(), u = lt(s, _.input), l = lt(s, _.file), d = s.querySelector(".".concat(_.range, " input")), p = s.querySelector(".".concat(_.range, " output")), f = lt(s, _.select), m = s.querySelector(".".concat(_.checkbox, " input")), h = lt(s, _.textarea), u.oninput = it, l.onchange = it, f.onchange = it, m.onchange = it, h.oninput = it, d.oninput = function (t) {
        it(t), p.value = d.value;
      }, d.onchange = function (t) {
        it(t), d.nextSibling.value = d.value;
      };
    }
  },
      mt = function mt(t, e) {
    t.jquery ? ht(e, t) : e.innerHTML = t.toString();
  },
      ht = function ht(t, e) {
    if (t.innerHTML = "", 0 in e) for (var n = 0; n in e; n++) {
      t.appendChild(e[n].cloneNode(!0));
    } else t.appendChild(e.cloneNode(!0));
  },
      gt = function () {
    if (ot()) return !1;var t = document.createElement("div"),
        e = { WebkitAnimation: "webkitAnimationEnd", OAnimation: "oAnimationEnd oanimationend", animation: "animationend" };for (var n in e) {
      if (Object.prototype.hasOwnProperty.call(e, n) && void 0 !== t.style[n]) return e[n];
    }return !1;
  }();function vt(t, e, n) {
    var o;tt(t, n["show".concat((o = e).charAt(0).toUpperCase() + o.slice(1), "Button")], "inline-block"), t.innerHTML = n["".concat(e, "ButtonText")], t.setAttribute("aria-label", n["".concat(e, "ButtonAriaLabel")]), t.className = _[e], q(t, n, "".concat(e, "Button")), st(t, n["".concat(e, "ButtonClass")]);
  }function bt(t, e) {
    var n = z();if (n) {
      var o, i, r, a;o = n, "string" == typeof (i = e.backdrop) ? o.style.background = i : i || st([document.documentElement, document.body], _["no-backdrop"]), !e.backdrop && e.allowOutsideClick && R('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`'), r = n, (a = e.position) in _ ? st(r, _[a]) : (R('The "position" parameter is not valid, defaulting to "center"'), st(r, _.center)), function (t, e) {
        if (e && "string" == typeof e) {
          var n = "grow-".concat(e);n in _ && st(t, _[n]);
        }
      }(n, e.grow), q(n, e, "container");var c = document.body.getAttribute("data-swal2-queue-step");c && (n.setAttribute("data-queue-step", c), document.body.removeAttribute("data-swal2-queue-step"));
    }
  }function yt(t, e) {
    t.placeholder && !e.inputPlaceholder || (t.placeholder = e.inputPlaceholder);
  }var wt = { promise: new WeakMap(), innerParams: new WeakMap(), domCache: new WeakMap() },
      Ct = ["input", "file", "range", "select", "radio", "checkbox", "textarea"],
      kt = function kt(t) {
    if (!Bt[t.input]) return v('Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "'.concat(t.input, '"'));var e = At(t.input),
        n = Bt[t.input](e, t);X(n), setTimeout(function () {
      Q(n);
    });
  },
      xt = function xt(t, e) {
    var n = Z(k(), t);if (n) for (var o in !function (t) {
      for (var e = 0; e < t.attributes.length; e++) {
        var n = t.attributes[e].name;-1 === ["type", "value", "style"].indexOf(n) && t.removeAttribute(n);
      }
    }(n), e) {
      "range" === t && "placeholder" === o || n.setAttribute(o, e[o]);
    }
  },
      Pt = function Pt(t) {
    var e = At(t.input);t.customClass && st(e, t.customClass.input);
  },
      At = function At(t) {
    var e = _[t] ? _[t] : _.input;return lt(k(), e);
  },
      Bt = {};Bt.text = Bt.email = Bt.password = Bt.number = Bt.tel = Bt.url = function (t, e) {
    return "string" == typeof e.inputValue || "number" == typeof e.inputValue ? t.value = e.inputValue : g(e.inputValue) || R('Unexpected type of inputValue! Expected "string", "number" or "Promise", got "'.concat(r(e.inputValue), '"')), yt(t, e), t.type = e.input, t;
  }, Bt.file = function (t, e) {
    return yt(t, e), t;
  }, Bt.range = function (t, e) {
    var n = t.querySelector("input"),
        o = t.querySelector("output");return n.value = e.inputValue, n.type = e.input, o.value = e.inputValue, t;
  }, Bt.select = function (t, e) {
    if (t.innerHTML = "", e.inputPlaceholder) {
      var n = document.createElement("option");n.innerHTML = e.inputPlaceholder, n.value = "", n.disabled = !0, n.selected = !0, t.appendChild(n);
    }return t;
  }, Bt.radio = function (t) {
    return t.innerHTML = "", t;
  }, Bt.checkbox = function (t, e) {
    var n = Z(k(), "checkbox");return n.value = 1, n.id = _.checkbox, n.checked = Boolean(e.inputValue), t.querySelector("span").innerHTML = e.inputPlaceholder, t;
  }, Bt.textarea = function (e, t) {
    if (e.value = t.inputValue, yt(e, t), "MutationObserver" in window) {
      var n = parseInt(window.getComputedStyle(W()).width),
          o = parseInt(window.getComputedStyle(W()).paddingLeft) + parseInt(window.getComputedStyle(W()).paddingRight);new MutationObserver(function () {
        var t = e.offsetWidth + o;W().style.width = n < t ? "".concat(t, "px") : null;
      }).observe(e, { attributes: !0, attributeFilter: ["style"] });
    }return e;
  };function Tt(t, e) {
    var n,
        o,
        i,
        r,
        a,
        c = k().querySelector("#".concat(_.content));e.html ? (rt(e.html, c), X(c, "block")) : e.text ? (c.textContent = e.text, X(c, "block")) : G(c), n = t, o = e, i = k(), r = wt.innerParams.get(n), a = !r || o.input !== r.input, Ct.forEach(function (t) {
      var e = _[t],
          n = lt(i, e);xt(t, o.inputAttributes), n.className = e, a && G(n);
    }), o.input && (a && kt(o), Pt(o)), q(k(), e, "content");
  }function Et() {
    return z().getAttribute("data-queue-step");
  }function St(t, s) {
    var u = P();if (!s.progressSteps || 0 === s.progressSteps.length) return G(u);X(u), u.innerHTML = "";var l = parseInt(void 0 === s.currentProgressStep ? Et() : s.currentProgressStep);l >= s.progressSteps.length && R("Invalid currentProgressStep parameter, it should be less than progressSteps.length (currentProgressStep like JS arrays starts from 0)"), s.progressSteps.forEach(function (t, e) {
      var n,
          o,
          i,
          r,
          a = (n = t, o = document.createElement("li"), st(o, _["progress-step"]), o.innerHTML = n, o);if (u.appendChild(a), e === l && st(a, _["active-progress-step"]), e !== s.progressSteps.length - 1) {
        var c = (i = t, r = document.createElement("li"), st(r, _["progress-step-line"]), i.progressStepsDistance && (r.style.width = i.progressStepsDistance), r);u.appendChild(c);
      }
    });
  }function Lt(t, e) {
    var n,
        o,
        i,
        r,
        a = S();q(a, e, "header"), St(0, e), function (t, e) {
      var n = wt.innerParams.get(t);if (n && e.icon === n.icon && w()) q(w(), e, "icon");else if (Ht(), e.icon) if (-1 !== Object.keys(F).indexOf(e.icon)) {
        var o = y(".".concat(_.icon, ".").concat(F[e.icon]));X(o), jt(o, e), It(), q(o, e, "icon"), st(o, e.showClass.icon);
      } else v('Unknown icon! Expected "success", "error", "warning", "info" or "question", got "'.concat(e.icon, '"'));
    }(t, e), function (t) {
      var e = x();if (!t.imageUrl) return G(e);X(e), e.setAttribute("src", t.imageUrl), e.setAttribute("alt", t.imageAlt), J(e, "width", t.imageWidth), J(e, "height", t.imageHeight), e.className = _.image, q(e, t, "image");
    }(e), n = e, o = C(), tt(o, n.title || n.titleText), n.title && rt(n.title, o), n.titleText && (o.innerText = n.titleText), q(o, n, "title"), i = e, (r = M()).innerHTML = i.closeButtonHtml, q(r, i, "closeButton"), tt(r, i.showCloseButton), r.setAttribute("aria-label", i.closeButtonAriaLabel);
  }function Ot(t, e) {
    var n, o, i, r;n = e, o = W(), J(o, "width", n.width), J(o, "padding", n.padding), n.background && (o.style.background = n.background), Rt(o, n), bt(0, e), Lt(t, e), Tt(t, e), at(0, e), i = e, r = L(), tt(r, i.footer), i.footer && rt(i.footer, r), q(r, i, "footer"), "function" == typeof e.onRender && e.onRender(W());
  }function Mt() {
    return B() && B().click();
  }var Ht = function Ht() {
    for (var t = n(), e = 0; e < t.length; e++) {
      G(t[e]);
    }
  },
      It = function It() {
    for (var t = W(), e = window.getComputedStyle(t).getPropertyValue("background-color"), n = t.querySelectorAll("[class^=swal2-success-circular-line], .swal2-success-fix"), o = 0; o < n.length; o++) {
      n[o].style.backgroundColor = e;
    }
  },
      jt = function jt(t, e) {
    if (t.innerHTML = "", e.iconHtml) t.innerHTML = qt(e.iconHtml);else if ("success" === e.icon) t.innerHTML = '\n      <div class="swal2-success-circular-line-left"></div>\n      <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>\n      <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>\n      <div class="swal2-success-circular-line-right"></div>\n    ';else if ("error" === e.icon) t.innerHTML = '\n      <span class="swal2-x-mark">\n        <span class="swal2-x-mark-line-left"></span>\n        <span class="swal2-x-mark-line-right"></span>\n      </span>\n    ';else {
      t.innerHTML = qt({ question: "?", warning: "!", info: "i" }[e.icon]);
    }
  },
      qt = function qt(t) {
    return '<div class="'.concat(_["icon-content"], '">').concat(t, "</div>");
  },
      Vt = [],
      Rt = function Rt(t, e) {
    t.className = "".concat(_.popup, " ").concat(dt(t) ? e.showClass.popup : ""), e.toast ? (st([document.documentElement, document.body], _["toast-shown"]), st(t, _.toast)) : st(t, _.modal), q(t, e, "popup"), "string" == typeof e.customClass && st(t, e.customClass), e.icon && st(t, _["icon-".concat(e.icon)]);
  };function Dt() {
    var t = W();t || Xe.fire(), t = W();var e = E(),
        n = B();X(e), X(n, "inline-block"), st([t, e], _.loading), n.disabled = !0, t.setAttribute("data-loading", !0), t.setAttribute("aria-busy", !0), t.focus();
  }function Nt() {
    return new Promise(function (t) {
      var e = window.scrollX,
          n = window.scrollY;Wt.restoreFocusTimeout = setTimeout(function () {
        Wt.previousActiveElement && Wt.previousActiveElement.focus ? (Wt.previousActiveElement.focus(), Wt.previousActiveElement = null) : document.body && document.body.focus(), t();
      }, 100), void 0 !== e && void 0 !== n && window.scrollTo(e, n);
    });
  }function Ut() {
    if (Wt.timeout) return function () {
      var t = O(),
          e = parseInt(window.getComputedStyle(t).width);t.style.removeProperty("transition"), t.style.width = "100%";var n = parseInt(window.getComputedStyle(t).width),
          o = parseInt(e / n * 100);t.style.removeProperty("transition"), t.style.width = "".concat(o, "%");
    }(), Wt.timeout.stop();
  }function _t() {
    if (Wt.timeout) {
      var t = Wt.timeout.start();return nt(t), t;
    }
  }function Ft(t) {
    return Object.prototype.hasOwnProperty.call(Kt, t);
  }function zt(t) {
    return Zt[t];
  }var Wt = {},
      Kt = { title: "", titleText: "", text: "", html: "", footer: "", icon: void 0, iconHtml: void 0, toast: !1, animation: !0, showClass: { popup: "swal2-show", backdrop: "swal2-backdrop-show", icon: "swal2-icon-show" }, hideClass: { popup: "swal2-hide", backdrop: "swal2-backdrop-hide", icon: "swal2-icon-hide" }, customClass: void 0, target: "body", backdrop: !0, heightAuto: !0, allowOutsideClick: !0, allowEscapeKey: !0, allowEnterKey: !0, stopKeydownPropagation: !0, keydownListenerCapture: !1, showConfirmButton: !0, showCancelButton: !1, preConfirm: void 0, confirmButtonText: "OK", confirmButtonAriaLabel: "", confirmButtonColor: void 0, cancelButtonText: "Cancel", cancelButtonAriaLabel: "", cancelButtonColor: void 0, buttonsStyling: !0, reverseButtons: !1, focusConfirm: !0, focusCancel: !1, showCloseButton: !1, closeButtonHtml: "&times;", closeButtonAriaLabel: "Close this dialog", showLoaderOnConfirm: !1, imageUrl: void 0, imageWidth: void 0, imageHeight: void 0, imageAlt: "", timer: void 0, timerProgressBar: !1, width: void 0, padding: void 0, background: void 0, input: void 0, inputPlaceholder: "", inputValue: "", inputOptions: {}, inputAutoTrim: !0, inputAttributes: {}, inputValidator: void 0, validationMessage: void 0, grow: !1, position: "center", progressSteps: [], currentProgressStep: void 0, progressStepsDistance: void 0, onBeforeOpen: void 0, onOpen: void 0, onRender: void 0, onClose: void 0, onAfterClose: void 0, onDestroy: void 0, scrollbarPadding: !0 },
      Yt = ["title", "titleText", "text", "html", "icon", "hideClass", "customClass", "allowOutsideClick", "allowEscapeKey", "showConfirmButton", "showCancelButton", "confirmButtonText", "confirmButtonAriaLabel", "confirmButtonColor", "cancelButtonText", "cancelButtonAriaLabel", "cancelButtonColor", "buttonsStyling", "reverseButtons", "imageUrl", "imageWidth", "imageHeight", "imageAlt", "progressSteps", "currentProgressStep"],
      Zt = { animation: 'showClass" and "hideClass' },
      Qt = ["allowOutsideClick", "allowEnterKey", "backdrop", "focusConfirm", "focusCancel", "heightAuto", "keydownListenerCapture"],
      $t = Object.freeze({ isValidParameter: Ft, isUpdatableParameter: function isUpdatableParameter(t) {
      return -1 !== Yt.indexOf(t);
    }, isDeprecatedParameter: zt, argsToParams: function argsToParams(o) {
      var i = {};return "object" !== r(o[0]) || b(o[0]) ? ["title", "html", "icon"].forEach(function (t, e) {
        var n = o[e];"string" == typeof n || b(n) ? i[t] = n : void 0 !== n && v("Unexpected type of ".concat(t, '! Expected "string" or "Element", got ').concat(r(n)));
      }) : c(i, o[0]), i;
    }, isVisible: function isVisible() {
      return dt(W());
    }, clickConfirm: Mt, clickCancel: function clickCancel() {
      return T() && T().click();
    }, getContainer: z, getPopup: W, getTitle: C, getContent: k, getHtmlContainer: function getHtmlContainer() {
      return e(_["html-container"]);
    }, getImage: x, getIcon: w, getIcons: n, getCloseButton: M, getActions: E, getConfirmButton: B, getCancelButton: T, getHeader: S, getFooter: L, getTimerProgressBar: O, getFocusableElements: H, getValidationMessage: A, isLoading: function isLoading() {
      return W().hasAttribute("data-loading");
    }, fire: function fire() {
      for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) {
        e[n] = arguments[n];
      }return l(this, e);
    }, mixin: function mixin(n) {
      return function (t) {
        function e() {
          return o(this, e), d(this, s(e).apply(this, arguments));
        }return function (t, e) {
          if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), e && u(t, e);
        }(e, t), a(e, [{ key: "_main", value: function value(t) {
            return p(s(e.prototype), "_main", this).call(this, c({}, n, t));
          } }]), e;
      }(this);
    }, queue: function queue(t) {
      var r = this;Vt = t;function a(t, e) {
        Vt = [], t(e);
      }var c = [];return new Promise(function (i) {
        !function e(n, o) {
          n < Vt.length ? (document.body.setAttribute("data-swal2-queue-step", n), r.fire(Vt[n]).then(function (t) {
            void 0 !== t.value ? (c.push(t.value), e(n + 1, o)) : a(i, { dismiss: t.dismiss });
          })) : a(i, { value: c });
        }(0);
      });
    }, getQueueStep: Et, insertQueueStep: function insertQueueStep(t, e) {
      return e && e < Vt.length ? Vt.splice(e, 0, t) : Vt.push(t);
    }, deleteQueueStep: function deleteQueueStep(t) {
      void 0 !== Vt[t] && Vt.splice(t, 1);
    }, showLoading: Dt, enableLoading: Dt, getTimerLeft: function getTimerLeft() {
      return Wt.timeout && Wt.timeout.getTimerLeft();
    }, stopTimer: Ut, resumeTimer: _t, toggleTimer: function toggleTimer() {
      var t = Wt.timeout;return t && (t.running ? Ut : _t)();
    }, increaseTimer: function increaseTimer(t) {
      if (Wt.timeout) {
        var e = Wt.timeout.increase(t);return nt(e, !0), e;
      }
    }, isTimerRunning: function isTimerRunning() {
      return Wt.timeout && Wt.timeout.isRunning();
    } });function Jt() {
    var t = wt.innerParams.get(this);if (t) {
      var e = wt.domCache.get(this);t.showConfirmButton || (G(e.confirmButton), t.showCancelButton || G(e.actions)), ut([e.popup, e.actions], _.loading), e.popup.removeAttribute("aria-busy"), e.popup.removeAttribute("data-loading"), e.confirmButton.disabled = !1, e.cancelButton.disabled = !1;
    }
  }function Xt() {
    null === Y.previousBodyPadding && document.body.scrollHeight > window.innerHeight && (Y.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right")), document.body.style.paddingRight = "".concat(Y.previousBodyPadding + function () {
      var t = document.createElement("div");t.className = _["scrollbar-measure"], document.body.appendChild(t);var e = t.getBoundingClientRect().width - t.clientWidth;return document.body.removeChild(t), e;
    }(), "px"));
  }function Gt() {
    return !!window.MSInputMethodContext && !!document.documentMode;
  }function te() {
    var t = z(),
        e = W();t.style.removeProperty("align-items"), e.offsetTop < 0 && (t.style.alignItems = "flex-start");
  }var ee = function ee() {
    var n,
        o = z();o.ontouchstart = function (t) {
      var e;n = t.target === o || !((e = o).scrollHeight > e.clientHeight) && "INPUT" !== t.target.tagName;
    }, o.ontouchmove = function (t) {
      n && (t.preventDefault(), t.stopPropagation());
    };
  },
      ne = { swalPromiseResolve: new WeakMap() };function oe(t, e, n, o) {
    n ? ae(t, o) : (Nt().then(function () {
      return ae(t, o);
    }), Wt.keydownTarget.removeEventListener("keydown", Wt.keydownHandler, { capture: Wt.keydownListenerCapture }), Wt.keydownHandlerAdded = !1), e.parentNode && !document.body.getAttribute("data-swal2-queue-step") && e.parentNode.removeChild(e), I() && (null !== Y.previousBodyPadding && (document.body.style.paddingRight = "".concat(Y.previousBodyPadding, "px"), Y.previousBodyPadding = null), function () {
      if (j(document.body, _.iosfix)) {
        var t = parseInt(document.body.style.top, 10);ut(document.body, _.iosfix), document.body.style.top = "", document.body.scrollTop = -1 * t;
      }
    }(), "undefined" != typeof window && Gt() && window.removeEventListener("resize", te), m(document.body.children).forEach(function (t) {
      t.hasAttribute("data-previous-aria-hidden") ? (t.setAttribute("aria-hidden", t.getAttribute("data-previous-aria-hidden")), t.removeAttribute("data-previous-aria-hidden")) : t.removeAttribute("aria-hidden");
    })), ut([document.documentElement, document.body], [_.shown, _["height-auto"], _["no-backdrop"], _["toast-shown"], _["toast-column"]]);
  }function ie(t) {
    var e = W();if (e) {
      var n = wt.innerParams.get(this);if (n && !j(e, n.hideClass.popup)) {
        var o = ne.swalPromiseResolve.get(this);ut(e, n.showClass.popup), st(e, n.hideClass.popup);var i = z();ut(i, n.showClass.backdrop), st(i, n.hideClass.backdrop), function (t, e, n) {
          var o = z(),
              i = gt && et(e),
              r = n.onClose,
              a = n.onAfterClose;if (r !== null && typeof r === "function") {
            r(e);
          }if (i) {
            re(t, e, o, a);
          } else {
            oe(t, o, K(), a);
          }
        }(this, e, n), o(t || {});
      }
    }
  }var re = function re(t, e, n, o) {
    Wt.swalCloseEventFinishedCallback = oe.bind(null, t, n, K(), o), e.addEventListener(gt, function (t) {
      t.target === e && (Wt.swalCloseEventFinishedCallback(), delete Wt.swalCloseEventFinishedCallback);
    });
  },
      ae = function ae(t, e) {
    setTimeout(function () {
      "function" == typeof e && e(), t._destroy();
    });
  };function ce(t, e, n) {
    var o = wt.domCache.get(t);e.forEach(function (t) {
      o[t].disabled = n;
    });
  }function se(t, e) {
    if (!t) return !1;if ("radio" === t.type) for (var n = t.parentNode.parentNode.querySelectorAll("input"), o = 0; o < n.length; o++) {
      n[o].disabled = e;
    } else t.disabled = e;
  }var ue = function () {
    function n(t, e) {
      o(this, n), this.callback = t, this.remaining = e, this.running = !1, this.start();
    }return a(n, [{ key: "start", value: function value() {
        return this.running || (this.running = !0, this.started = new Date(), this.id = setTimeout(this.callback, this.remaining)), this.remaining;
      } }, { key: "stop", value: function value() {
        return this.running && (this.running = !1, clearTimeout(this.id), this.remaining -= new Date() - this.started), this.remaining;
      } }, { key: "increase", value: function value(t) {
        var e = this.running;return e && this.stop(), this.remaining += t, e && this.start(), this.remaining;
      } }, { key: "getTimerLeft", value: function value() {
        return this.running && (this.stop(), this.start()), this.remaining;
      } }, { key: "isRunning", value: function value() {
        return this.running;
      } }]), n;
  }(),
      le = { email: function email(t, e) {
      return (/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid email address")
      );
    }, url: function url(t, e) {
      return (/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(t) ? Promise.resolve() : Promise.resolve(e || "Invalid URL")
      );
    } };function de(t) {
    var e, n;(e = t).inputValidator || Object.keys(le).forEach(function (t) {
      e.input === t && (e.inputValidator = le[t]);
    }), t.showLoaderOnConfirm && !t.preConfirm && R("showLoaderOnConfirm is set to true, but preConfirm is not defined.\nshowLoaderOnConfirm should be used together with preConfirm, see usage example:\nhttps://sweetalert2.github.io/#ajax-request"), t.animation = N(t.animation), (n = t).target && ("string" != typeof n.target || document.querySelector(n.target)) && ("string" == typeof n.target || n.target.appendChild) || (R('Target parameter is not valid, defaulting to "body"'), n.target = "body"), "string" == typeof t.title && (t.title = t.title.split("\n").join("<br />")), ft(t);
  }function pe(t) {
    var e = z(),
        n = W();"function" == typeof t.onBeforeOpen && t.onBeforeOpen(n), xe(e, n, t), Ce(e, n), I() && ke(e, t.scrollbarPadding), K() || Wt.previousActiveElement || (Wt.previousActiveElement = document.activeElement), "function" == typeof t.onOpen && setTimeout(function () {
      return t.onOpen(n);
    }), ut(e, _["no-transition"]);
  }function fe(t) {
    var e = W();if (t.target === e) {
      var n = z();e.removeEventListener(gt, fe), n.style.overflowY = "auto";
    }
  }function me(t, e) {
    "select" === e.input || "radio" === e.input ? Te(t, e) : -1 !== ["text", "email", "number", "tel", "textarea"].indexOf(e.input) && g(e.inputValue) && Ee(t, e);
  }function he(t, e) {
    t.disableButtons(), e.input ? Oe(t, e) : Me(t, e, !0);
  }function ge(t, e) {
    t.disableButtons(), e(U.cancel);
  }function ve(t, e) {
    t.closePopup({ value: e });
  }function be(e, t, n, o) {
    t.keydownTarget && t.keydownHandlerAdded && (t.keydownTarget.removeEventListener("keydown", t.keydownHandler, { capture: t.keydownListenerCapture }), t.keydownHandlerAdded = !1), n.toast || (t.keydownHandler = function (t) {
      return je(e, t, o);
    }, t.keydownTarget = n.keydownListenerCapture ? window : W(), t.keydownListenerCapture = n.keydownListenerCapture, t.keydownTarget.addEventListener("keydown", t.keydownHandler, { capture: t.keydownListenerCapture }), t.keydownHandlerAdded = !0);
  }function ye(t, e, n) {
    var o = H(),
        i = 0;if (i < o.length) return (e += n) === o.length ? e = 0 : -1 === e && (e = o.length - 1), o[e].focus();W().focus();
  }function we(t, e, n) {
    wt.innerParams.get(t).toast ? Ne(t, e, n) : (_e(e), Fe(e), ze(t, e, n));
  }var Ce = function Ce(t, e) {
    gt && et(e) ? (t.style.overflowY = "hidden", e.addEventListener(gt, fe)) : t.style.overflowY = "auto";
  },
      ke = function ke(t, e) {
    !function () {
      if ((/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream || "MacIntel" === navigator.platform && 1 < navigator.maxTouchPoints) && !j(document.body, _.iosfix)) {
        var t = document.body.scrollTop;document.body.style.top = "".concat(-1 * t, "px"), st(document.body, _.iosfix), ee();
      }
    }(), "undefined" != typeof window && Gt() && (te(), window.addEventListener("resize", te)), m(document.body.children).forEach(function (t) {
      t === z() || function (t, e) {
        if ("function" == typeof t.contains) return t.contains(e);
      }(t, z()) || (t.hasAttribute("aria-hidden") && t.setAttribute("data-previous-aria-hidden", t.getAttribute("aria-hidden")), t.setAttribute("aria-hidden", "true"));
    }), e && Xt(), setTimeout(function () {
      t.scrollTop = 0;
    });
  },
      xe = function xe(t, e, n) {
    st(t, n.showClass.backdrop), X(e), st(e, n.showClass.popup), st([document.documentElement, document.body], _.shown), n.heightAuto && n.backdrop && !n.toast && st([document.documentElement, document.body], _["height-auto"]);
  },
      Pe = function Pe(t) {
    return t.checked ? 1 : 0;
  },
      Ae = function Ae(t) {
    return t.checked ? t.value : null;
  },
      Be = function Be(t) {
    return t.files.length ? null !== t.getAttribute("multiple") ? t.files : t.files[0] : null;
  },
      Te = function Te(e, n) {
    function o(t) {
      return Se[n.input](i, Le(t), n);
    }var i = k();g(n.inputOptions) ? (Dt(), n.inputOptions.then(function (t) {
      e.hideLoading(), o(t);
    })) : "object" === r(n.inputOptions) ? o(n.inputOptions) : v("Unexpected type of inputOptions! Expected object, Map or Promise, got ".concat(r(n.inputOptions)));
  },
      Ee = function Ee(e, n) {
    var o = e.getInput();G(o), n.inputValue.then(function (t) {
      o.value = "number" === n.input ? parseFloat(t) || 0 : "".concat(t), X(o), o.focus(), e.hideLoading();
    }).catch(function (t) {
      v("Error in inputValue promise: ".concat(t)), o.value = "", X(o), o.focus(), e.hideLoading();
    });
  },
      Se = { select: function select(t, e, i) {
      var r = lt(t, _.select);e.forEach(function (t) {
        var e = t[0],
            n = t[1],
            o = document.createElement("option");o.value = e, o.innerHTML = n, i.inputValue.toString() === e.toString() && (o.selected = !0), r.appendChild(o);
      }), r.focus();
    }, radio: function radio(t, e, a) {
      var c = lt(t, _.radio);e.forEach(function (t) {
        var e = t[0],
            n = t[1],
            o = document.createElement("input"),
            i = document.createElement("label");o.type = "radio", o.name = _.radio, o.value = e, a.inputValue.toString() === e.toString() && (o.checked = !0);var r = document.createElement("span");r.innerHTML = n, r.className = _.label, i.appendChild(o), i.appendChild(r), c.appendChild(i);
      });var n = c.querySelectorAll("input");n.length && n[0].focus();
    } },
      Le = function Le(e) {
    var n = [];return "undefined" != typeof Map && e instanceof Map ? e.forEach(function (t, e) {
      n.push([e, t]);
    }) : Object.keys(e).forEach(function (t) {
      n.push([t, e[t]]);
    }), n;
  },
      Oe = function Oe(e, n) {
    var o = function (t, e) {
      var n = t.getInput();if (!n) return null;switch (e.input) {case "checkbox":
          return Pe(n);case "radio":
          return Ae(n);case "file":
          return Be(n);default:
          return e.inputAutoTrim ? n.value.trim() : n.value;}
    }(e, n);n.inputValidator ? (e.disableInput(), Promise.resolve().then(function () {
      return n.inputValidator(o, n.validationMessage);
    }).then(function (t) {
      e.enableButtons(), e.enableInput(), t ? e.showValidationMessage(t) : Me(e, n, o);
    })) : e.getInput().checkValidity() ? Me(e, n, o) : (e.enableButtons(), e.showValidationMessage(n.validationMessage));
  },
      Me = function Me(e, t, n) {
    (t.showLoaderOnConfirm && Dt(), t.preConfirm) ? (e.resetValidationMessage(), Promise.resolve().then(function () {
      return t.preConfirm(n, t.validationMessage);
    }).then(function (t) {
      dt(A()) || !1 === t ? e.hideLoading() : ve(e, void 0 === t ? n : t);
    })) : ve(e, n);
  },
      He = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Left", "Right", "Up", "Down"],
      Ie = ["Escape", "Esc"],
      je = function je(t, e, n) {
    var o = wt.innerParams.get(t);o.stopKeydownPropagation && e.stopPropagation(), "Enter" === e.key ? qe(t, e, o) : "Tab" === e.key ? Ve(e, o) : -1 !== He.indexOf(e.key) ? Re() : -1 !== Ie.indexOf(e.key) && De(e, o, n);
  },
      qe = function qe(t, e, n) {
    if (!e.isComposing && e.target && t.getInput() && e.target.outerHTML === t.getInput().outerHTML) {
      if (-1 !== ["textarea", "file"].indexOf(n.input)) return;Mt(), e.preventDefault();
    }
  },
      Ve = function Ve(t) {
    for (var e = t.target, n = H(), o = -1, i = 0; i < n.length; i++) {
      if (e === n[i]) {
        o = i;break;
      }
    }t.shiftKey ? ye(0, o, -1) : ye(0, o, 1), t.stopPropagation(), t.preventDefault();
  },
      Re = function Re() {
    var t = B(),
        e = T();document.activeElement === t && dt(e) ? e.focus() : document.activeElement === e && dt(t) && t.focus();
  },
      De = function De(t, e, n) {
    N(e.allowEscapeKey) && (t.preventDefault(), n(U.esc));
  },
      Ne = function Ne(e, t, n) {
    t.popup.onclick = function () {
      var t = wt.innerParams.get(e);t.showConfirmButton || t.showCancelButton || t.showCloseButton || t.input || n(U.close);
    };
  },
      Ue = !1,
      _e = function _e(e) {
    e.popup.onmousedown = function () {
      e.container.onmouseup = function (t) {
        e.container.onmouseup = void 0, t.target === e.container && (Ue = !0);
      };
    };
  },
      Fe = function Fe(e) {
    e.container.onmousedown = function () {
      e.popup.onmouseup = function (t) {
        e.popup.onmouseup = void 0, t.target !== e.popup && !e.popup.contains(t.target) || (Ue = !0);
      };
    };
  },
      ze = function ze(n, o, i) {
    o.container.onclick = function (t) {
      var e = wt.innerParams.get(n);Ue ? Ue = !1 : t.target === o.container && N(e.allowOutsideClick) && i(U.backdrop);
    };
  };var We = function We(t, e, n) {
    var o = O();G(o), e.timer && (t.timeout = new ue(function () {
      n("timer"), delete t.timeout;
    }, e.timer), e.timerProgressBar && (X(o), setTimeout(function () {
      t.timeout.running && nt(e.timer);
    })));
  },
      Ke = function Ke(t, e) {
    if (!e.toast) return N(e.allowEnterKey) ? e.focusCancel && dt(t.cancelButton) ? t.cancelButton.focus() : e.focusConfirm && dt(t.confirmButton) ? t.confirmButton.focus() : void ye(0, -1, 1) : Ye();
  },
      Ye = function Ye() {
    document.activeElement && "function" == typeof document.activeElement.blur && document.activeElement.blur();
  };var Ze,
      Qe = function Qe(t) {
    for (var e in t) {
      t[e] = new WeakMap();
    }
  },
      $e = Object.freeze({ hideLoading: Jt, disableLoading: Jt, getInput: function getInput(t) {
      var e = wt.innerParams.get(t || this),
          n = wt.domCache.get(t || this);return n ? Z(n.content, e.input) : null;
    }, close: ie, closePopup: ie, closeModal: ie, closeToast: ie, enableButtons: function enableButtons() {
      ce(this, ["confirmButton", "cancelButton"], !1);
    }, disableButtons: function disableButtons() {
      ce(this, ["confirmButton", "cancelButton"], !0);
    }, enableInput: function enableInput() {
      return se(this.getInput(), !1);
    }, disableInput: function disableInput() {
      return se(this.getInput(), !0);
    }, showValidationMessage: function showValidationMessage(t) {
      var e = wt.domCache.get(this);e.validationMessage.innerHTML = t;var n = window.getComputedStyle(e.popup);e.validationMessage.style.marginLeft = "-".concat(n.getPropertyValue("padding-left")), e.validationMessage.style.marginRight = "-".concat(n.getPropertyValue("padding-right")), X(e.validationMessage);var o = this.getInput();o && (o.setAttribute("aria-invalid", !0), o.setAttribute("aria-describedBy", _["validation-message"]), Q(o), st(o, _.inputerror));
    }, resetValidationMessage: function resetValidationMessage() {
      var t = wt.domCache.get(this);t.validationMessage && G(t.validationMessage);var e = this.getInput();e && (e.removeAttribute("aria-invalid"), e.removeAttribute("aria-describedBy"), ut(e, _.inputerror));
    }, getProgressSteps: function getProgressSteps() {
      return wt.domCache.get(this).progressSteps;
    }, _main: function _main(t) {
      !function (t) {
        for (var e in t) {
          Ft(i = e) || R('Unknown parameter "'.concat(i, '"')), t.toast && (o = e, -1 !== Qt.indexOf(o) && R('The parameter "'.concat(o, '" is incompatible with toasts'))), zt(n = e) && h(n, zt(n));
        }var n, o, i;
      }(t), Wt.currentInstance && Wt.currentInstance._destroy(), Wt.currentInstance = this;var e = function (t) {
        var e = c({}, Kt.showClass, t.showClass),
            n = c({}, Kt.hideClass, t.hideClass),
            o = c({}, Kt, t);if (o.showClass = e, o.hideClass = n, t.animation === false) {
          o.showClass = { popup: "", backdrop: "swal2-backdrop-show swal2-noanimation" };o.hideClass = {};
        }return o;
      }(t);de(e), Object.freeze(e), Wt.timeout && (Wt.timeout.stop(), delete Wt.timeout), clearTimeout(Wt.restoreFocusTimeout);var n = function (t) {
        var e = { popup: W(), container: z(), content: k(), actions: E(), confirmButton: B(), cancelButton: T(), closeButton: M(), validationMessage: A(), progressSteps: P() };return wt.domCache.set(t, e), e;
      }(this);return Ot(this, e), wt.innerParams.set(this, e), function (n, o, i) {
        return new Promise(function (t) {
          var e = function t(e) {
            n.closePopup({ dismiss: e });
          };ne.swalPromiseResolve.set(n, t);o.confirmButton.onclick = function () {
            return he(n, i);
          };o.cancelButton.onclick = function () {
            return ge(n, e);
          };o.closeButton.onclick = function () {
            return e(U.close);
          };we(n, o, e);be(n, Wt, i, e);if (i.toast && (i.input || i.footer || i.showCloseButton)) {
            st(document.body, _["toast-column"]);
          } else {
            ut(document.body, _["toast-column"]);
          }me(n, i);pe(i);We(Wt, i, e);Ke(o, i);o.container.scrollTop = 0;
        });
      }(this, n, e);
    }, update: function update(e) {
      var t = W(),
          n = wt.innerParams.get(this);if (!t || j(t, n.hideClass.popup)) return R("You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.");var o = {};Object.keys(e).forEach(function (t) {
        Xe.isUpdatableParameter(t) ? o[t] = e[t] : R('Invalid parameter to update: "'.concat(t, '". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js'));
      });var i = c({}, n, o);Ot(this, i), wt.innerParams.set(this, i), Object.defineProperties(this, { params: { value: c({}, this.params, e), writable: !1, enumerable: !0 } });
    }, _destroy: function _destroy() {
      var t = wt.domCache.get(this),
          e = wt.innerParams.get(this);e && (t.popup && Wt.swalCloseEventFinishedCallback && (Wt.swalCloseEventFinishedCallback(), delete Wt.swalCloseEventFinishedCallback), Wt.deferDisposalTimer && (clearTimeout(Wt.deferDisposalTimer), delete Wt.deferDisposalTimer), "function" == typeof e.onDestroy && e.onDestroy(), delete this.params, delete Wt.keydownHandler, delete Wt.keydownTarget, Qe(wt), Qe(ne));
    } });function Je() {
    if ("undefined" != typeof window) {
      "undefined" == typeof Promise && v("This package requires a Promise library, please include a shim to enable it in this browser (See: https://github.com/sweetalert2/sweetalert2/wiki/Migration-from-SweetAlert-to-SweetAlert2#1-ie-support)"), Ze = this;for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) {
        e[n] = arguments[n];
      }var o = Object.freeze(this.constructor.argsToParams(e));Object.defineProperties(this, { params: { value: o, writable: !1, enumerable: !0, configurable: !0 } });var i = this._main(this.params);wt.promise.set(this, i);
    }
  }Je.prototype.then = function (t) {
    return wt.promise.get(this).then(t);
  }, Je.prototype.finally = function (t) {
    return wt.promise.get(this).finally(t);
  }, c(Je.prototype, $e), c(Je, $t), Object.keys($e).forEach(function (t) {
    Je[t] = function () {
      if (Ze) return Ze[t].apply(Ze, arguments);
    };
  }), Je.DismissReason = U, Je.version = "9.10.2";var Xe = Je;return Xe.default = Xe;
}), void 0 !== this && this.Sweetalert2 && (this.swal = this.sweetAlert = this.Swal = this.SweetAlert = this.Sweetalert2);
"undefined" != typeof document && function (e, t) {
  var n = e.createElement("style");if (e.getElementsByTagName("head")[0].appendChild(n), n.styleSheet) n.styleSheet.disabled || (n.styleSheet.cssText = t);else try {
    n.innerHTML = t;
  } catch (e) {
    n.innerText = t;
  }
}(document, ".swal2-popup.swal2-toast{flex-direction:row;align-items:center;width:auto;padding:.625em;overflow-y:hidden;background:#fff;box-shadow:0 0 .625em #d9d9d9}.swal2-popup.swal2-toast .swal2-header{flex-direction:row}.swal2-popup.swal2-toast .swal2-title{flex-grow:1;justify-content:flex-start;margin:0 .6em;font-size:1em}.swal2-popup.swal2-toast .swal2-footer{margin:.5em 0 0;padding:.5em 0 0;font-size:.8em}.swal2-popup.swal2-toast .swal2-close{position:static;width:.8em;height:.8em;line-height:.8}.swal2-popup.swal2-toast .swal2-content{justify-content:flex-start;font-size:1em}.swal2-popup.swal2-toast .swal2-icon{width:2em;min-width:2em;height:2em;margin:0}.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:1.8em;font-weight:700}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-popup.swal2-toast .swal2-icon .swal2-icon-content{font-size:.25em}}.swal2-popup.swal2-toast .swal2-icon.swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line]{top:.875em;width:1.375em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:.3125em}.swal2-popup.swal2-toast .swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:.3125em}.swal2-popup.swal2-toast .swal2-actions{flex-basis:auto!important;width:auto;height:auto;margin:0 .3125em}.swal2-popup.swal2-toast .swal2-styled{margin:0 .3125em;padding:.3125em .625em;font-size:1em}.swal2-popup.swal2-toast .swal2-styled:focus{box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(50,100,150,.4)}.swal2-popup.swal2-toast .swal2-success{border-color:#a5dc86}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line]{position:absolute;width:1.6em;height:3em;transform:rotate(45deg);border-radius:50%}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.8em;left:-.5em;transform:rotate(-45deg);transform-origin:2em 2em;border-radius:4em 0 0 4em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.25em;left:.9375em;transform-origin:0 1.5em;border-radius:0 4em 4em 0}.swal2-popup.swal2-toast .swal2-success .swal2-success-ring{width:2em;height:2em}.swal2-popup.swal2-toast .swal2-success .swal2-success-fix{top:0;left:.4375em;width:.4375em;height:2.6875em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line]{height:.3125em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=tip]{top:1.125em;left:.1875em;width:.75em}.swal2-popup.swal2-toast .swal2-success [class^=swal2-success-line][class$=long]{top:.9375em;right:.1875em;width:1.375em}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-toast-animate-success-line-tip .75s;animation:swal2-toast-animate-success-line-tip .75s}.swal2-popup.swal2-toast .swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-toast-animate-success-line-long .75s;animation:swal2-toast-animate-success-line-long .75s}.swal2-popup.swal2-toast.swal2-show{-webkit-animation:swal2-toast-show .5s;animation:swal2-toast-show .5s}.swal2-popup.swal2-toast.swal2-hide{-webkit-animation:swal2-toast-hide .1s forwards;animation:swal2-toast-hide .1s forwards}.swal2-container{display:flex;position:fixed;z-index:1060;top:0;right:0;bottom:0;left:0;flex-direction:row;align-items:center;justify-content:center;padding:.625em;overflow-x:hidden;transition:background-color .1s;-webkit-overflow-scrolling:touch}.swal2-container.swal2-backdrop-show{background:rgba(0,0,0,.4)}.swal2-container.swal2-backdrop-hide{background:0 0!important}.swal2-container.swal2-top{align-items:flex-start}.swal2-container.swal2-top-left,.swal2-container.swal2-top-start{align-items:flex-start;justify-content:flex-start}.swal2-container.swal2-top-end,.swal2-container.swal2-top-right{align-items:flex-start;justify-content:flex-end}.swal2-container.swal2-center{align-items:center}.swal2-container.swal2-center-left,.swal2-container.swal2-center-start{align-items:center;justify-content:flex-start}.swal2-container.swal2-center-end,.swal2-container.swal2-center-right{align-items:center;justify-content:flex-end}.swal2-container.swal2-bottom{align-items:flex-end}.swal2-container.swal2-bottom-left,.swal2-container.swal2-bottom-start{align-items:flex-end;justify-content:flex-start}.swal2-container.swal2-bottom-end,.swal2-container.swal2-bottom-right{align-items:flex-end;justify-content:flex-end}.swal2-container.swal2-bottom-end>:first-child,.swal2-container.swal2-bottom-left>:first-child,.swal2-container.swal2-bottom-right>:first-child,.swal2-container.swal2-bottom-start>:first-child,.swal2-container.swal2-bottom>:first-child{margin-top:auto}.swal2-container.swal2-grow-fullscreen>.swal2-modal{display:flex!important;flex:1;align-self:stretch;justify-content:center}.swal2-container.swal2-grow-row>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-grow-column{flex:1;flex-direction:column}.swal2-container.swal2-grow-column.swal2-bottom,.swal2-container.swal2-grow-column.swal2-center,.swal2-container.swal2-grow-column.swal2-top{align-items:center}.swal2-container.swal2-grow-column.swal2-bottom-left,.swal2-container.swal2-grow-column.swal2-bottom-start,.swal2-container.swal2-grow-column.swal2-center-left,.swal2-container.swal2-grow-column.swal2-center-start,.swal2-container.swal2-grow-column.swal2-top-left,.swal2-container.swal2-grow-column.swal2-top-start{align-items:flex-start}.swal2-container.swal2-grow-column.swal2-bottom-end,.swal2-container.swal2-grow-column.swal2-bottom-right,.swal2-container.swal2-grow-column.swal2-center-end,.swal2-container.swal2-grow-column.swal2-center-right,.swal2-container.swal2-grow-column.swal2-top-end,.swal2-container.swal2-grow-column.swal2-top-right{align-items:flex-end}.swal2-container.swal2-grow-column>.swal2-modal{display:flex!important;flex:1;align-content:center;justify-content:center}.swal2-container.swal2-no-transition{transition:none!important}.swal2-container:not(.swal2-top):not(.swal2-top-start):not(.swal2-top-end):not(.swal2-top-left):not(.swal2-top-right):not(.swal2-center-start):not(.swal2-center-end):not(.swal2-center-left):not(.swal2-center-right):not(.swal2-bottom):not(.swal2-bottom-start):not(.swal2-bottom-end):not(.swal2-bottom-left):not(.swal2-bottom-right):not(.swal2-grow-fullscreen)>.swal2-modal{margin:auto}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-container .swal2-modal{margin:0!important}}.swal2-popup{display:none;position:relative;box-sizing:border-box;flex-direction:column;justify-content:center;width:32em;max-width:100%;padding:1.25em;border:none;border-radius:.3125em;background:#fff;font-family:inherit;font-size:1rem}.swal2-popup:focus{outline:0}.swal2-popup.swal2-loading{overflow-y:hidden}.swal2-header{display:flex;flex-direction:column;align-items:center}.swal2-title{position:relative;max-width:100%;margin:0 0 .4em;padding:0;color:#595959;font-size:1.875em;font-weight:600;text-align:center;text-transform:none;word-wrap:break-word}.swal2-actions{display:flex;z-index:1;flex-wrap:wrap;align-items:center;justify-content:center;width:100%;margin:1.25em auto 0}.swal2-actions:not(.swal2-loading) .swal2-styled[disabled]{opacity:.4}.swal2-actions:not(.swal2-loading) .swal2-styled:hover{background-image:linear-gradient(rgba(0,0,0,.1),rgba(0,0,0,.1))}.swal2-actions:not(.swal2-loading) .swal2-styled:active{background-image:linear-gradient(rgba(0,0,0,.2),rgba(0,0,0,.2))}.swal2-actions.swal2-loading .swal2-styled.swal2-confirm{box-sizing:border-box;width:2.5em;height:2.5em;margin:.46875em;padding:0;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:.25em solid transparent;border-radius:100%;border-color:transparent;background-color:transparent!important;color:transparent;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-actions.swal2-loading .swal2-styled.swal2-cancel{margin-right:30px;margin-left:30px}.swal2-actions.swal2-loading :not(.swal2-styled).swal2-confirm::after{content:\"\";display:inline-block;width:15px;height:15px;margin-left:5px;-webkit-animation:swal2-rotate-loading 1.5s linear 0s infinite normal;animation:swal2-rotate-loading 1.5s linear 0s infinite normal;border:3px solid #999;border-radius:50%;border-right-color:transparent;box-shadow:1px 1px 1px #fff}.swal2-styled{margin:.3125em;padding:.625em 2em;box-shadow:none;font-weight:500}.swal2-styled:not([disabled]){cursor:pointer}.swal2-styled.swal2-confirm{border:0;border-radius:.25em;background:initial;background-color:#3085d6;color:#fff;font-size:1.0625em}.swal2-styled.swal2-cancel{border:0;border-radius:.25em;background:initial;background-color:#aaa;color:#fff;font-size:1.0625em}.swal2-styled:focus{outline:0;box-shadow:0 0 0 1px #fff,0 0 0 3px rgba(50,100,150,.4)}.swal2-styled::-moz-focus-inner{border:0}.swal2-footer{justify-content:center;margin:1.25em 0 0;padding:1em 0 0;border-top:1px solid #eee;color:#545454;font-size:1em}.swal2-timer-progress-bar-container{position:absolute;right:0;bottom:0;left:0;height:.25em;overflow:hidden;border-bottom-right-radius:.3125em;border-bottom-left-radius:.3125em}.swal2-timer-progress-bar{width:100%;height:.25em;background:rgba(0,0,0,.2)}.swal2-image{max-width:100%;margin:1.25em auto}.swal2-close{position:absolute;z-index:2;top:0;right:0;align-items:center;justify-content:center;width:1.2em;height:1.2em;padding:0;overflow:hidden;transition:color .1s ease-out;border:none;border-radius:0;outline:initial;background:0 0;color:#ccc;font-family:serif;font-size:2.5em;line-height:1.2;cursor:pointer}.swal2-close:hover{transform:none;background:0 0;color:#f27474}.swal2-close::-moz-focus-inner{border:0}.swal2-content{z-index:1;justify-content:center;margin:0;padding:0;color:#545454;font-size:1.125em;font-weight:400;line-height:normal;text-align:center;word-wrap:break-word}.swal2-checkbox,.swal2-file,.swal2-input,.swal2-radio,.swal2-select,.swal2-textarea{margin:1em auto}.swal2-file,.swal2-input,.swal2-textarea{box-sizing:border-box;width:100%;transition:border-color .3s,box-shadow .3s;border:1px solid #d9d9d9;border-radius:.1875em;background:inherit;box-shadow:inset 0 1px 1px rgba(0,0,0,.06);color:inherit;font-size:1.125em}.swal2-file.swal2-inputerror,.swal2-input.swal2-inputerror,.swal2-textarea.swal2-inputerror{border-color:#f27474!important;box-shadow:0 0 2px #f27474!important}.swal2-file:focus,.swal2-input:focus,.swal2-textarea:focus{border:1px solid #b4dbed;outline:0;box-shadow:0 0 3px #c4e6f5}.swal2-file::-webkit-input-placeholder,.swal2-input::-webkit-input-placeholder,.swal2-textarea::-webkit-input-placeholder{color:#ccc}.swal2-file::-moz-placeholder,.swal2-input::-moz-placeholder,.swal2-textarea::-moz-placeholder{color:#ccc}.swal2-file:-ms-input-placeholder,.swal2-input:-ms-input-placeholder,.swal2-textarea:-ms-input-placeholder{color:#ccc}.swal2-file::-ms-input-placeholder,.swal2-input::-ms-input-placeholder,.swal2-textarea::-ms-input-placeholder{color:#ccc}.swal2-file::placeholder,.swal2-input::placeholder,.swal2-textarea::placeholder{color:#ccc}.swal2-range{margin:1em auto;background:#fff}.swal2-range input{width:80%}.swal2-range output{width:20%;color:inherit;font-weight:600;text-align:center}.swal2-range input,.swal2-range output{height:2.625em;padding:0;font-size:1.125em;line-height:2.625em}.swal2-input{height:2.625em;padding:0 .75em}.swal2-input[type=number]{max-width:10em}.swal2-file{background:inherit;font-size:1.125em}.swal2-textarea{height:6.75em;padding:.75em}.swal2-select{min-width:50%;max-width:100%;padding:.375em .625em;background:inherit;color:inherit;font-size:1.125em}.swal2-checkbox,.swal2-radio{align-items:center;justify-content:center;background:#fff;color:inherit}.swal2-checkbox label,.swal2-radio label{margin:0 .6em;font-size:1.125em}.swal2-checkbox input,.swal2-radio input{margin:0 .4em}.swal2-validation-message{display:none;align-items:center;justify-content:center;padding:.625em;overflow:hidden;background:#f0f0f0;color:#666;font-size:1em;font-weight:300}.swal2-validation-message::before{content:\"!\";display:inline-block;width:1.5em;min-width:1.5em;height:1.5em;margin:0 .625em;border-radius:50%;background-color:#f27474;color:#fff;font-weight:600;line-height:1.5em;text-align:center}.swal2-icon{position:relative;box-sizing:content-box;justify-content:center;width:5em;height:5em;margin:1.25em auto 1.875em;border:.25em solid transparent;border-radius:50%;font-family:inherit;line-height:5em;cursor:default;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.swal2-icon .swal2-icon-content{display:flex;align-items:center;font-size:3.75em}.swal2-icon.swal2-error{border-color:#f27474;color:#f27474}.swal2-icon.swal2-error .swal2-x-mark{position:relative;flex-grow:1}.swal2-icon.swal2-error [class^=swal2-x-mark-line]{display:block;position:absolute;top:2.3125em;width:2.9375em;height:.3125em;border-radius:.125em;background-color:#f27474}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=left]{left:1.0625em;transform:rotate(45deg)}.swal2-icon.swal2-error [class^=swal2-x-mark-line][class$=right]{right:1em;transform:rotate(-45deg)}.swal2-icon.swal2-error.swal2-icon-show{-webkit-animation:swal2-animate-error-icon .5s;animation:swal2-animate-error-icon .5s}.swal2-icon.swal2-error.swal2-icon-show .swal2-x-mark{-webkit-animation:swal2-animate-error-x-mark .5s;animation:swal2-animate-error-x-mark .5s}.swal2-icon.swal2-warning{border-color:#facea8;color:#f8bb86}.swal2-icon.swal2-info{border-color:#9de0f6;color:#3fc3ee}.swal2-icon.swal2-question{border-color:#c9dae1;color:#87adbd}.swal2-icon.swal2-success{border-color:#a5dc86;color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-circular-line]{position:absolute;width:3.75em;height:7.5em;transform:rotate(45deg);border-radius:50%}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=left]{top:-.4375em;left:-2.0635em;transform:rotate(-45deg);transform-origin:3.75em 3.75em;border-radius:7.5em 0 0 7.5em}.swal2-icon.swal2-success [class^=swal2-success-circular-line][class$=right]{top:-.6875em;left:1.875em;transform:rotate(-45deg);transform-origin:0 3.75em;border-radius:0 7.5em 7.5em 0}.swal2-icon.swal2-success .swal2-success-ring{position:absolute;z-index:2;top:-.25em;left:-.25em;box-sizing:content-box;width:100%;height:100%;border:.25em solid rgba(165,220,134,.3);border-radius:50%}.swal2-icon.swal2-success .swal2-success-fix{position:absolute;z-index:1;top:.5em;left:1.625em;width:.4375em;height:5.625em;transform:rotate(-45deg)}.swal2-icon.swal2-success [class^=swal2-success-line]{display:block;position:absolute;z-index:2;height:.3125em;border-radius:.125em;background-color:#a5dc86}.swal2-icon.swal2-success [class^=swal2-success-line][class$=tip]{top:2.875em;left:.8125em;width:1.5625em;transform:rotate(45deg)}.swal2-icon.swal2-success [class^=swal2-success-line][class$=long]{top:2.375em;right:.5em;width:2.9375em;transform:rotate(-45deg)}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-tip{-webkit-animation:swal2-animate-success-line-tip .75s;animation:swal2-animate-success-line-tip .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-line-long{-webkit-animation:swal2-animate-success-line-long .75s;animation:swal2-animate-success-line-long .75s}.swal2-icon.swal2-success.swal2-icon-show .swal2-success-circular-line-right{-webkit-animation:swal2-rotate-success-circular-line 4.25s ease-in;animation:swal2-rotate-success-circular-line 4.25s ease-in}.swal2-progress-steps{align-items:center;margin:0 0 1.25em;padding:0;background:inherit;font-weight:600}.swal2-progress-steps li{display:inline-block;position:relative}.swal2-progress-steps .swal2-progress-step{z-index:20;width:2em;height:2em;border-radius:2em;background:#3085d6;color:#fff;line-height:2em;text-align:center}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step{background:#3085d6}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step{background:#add8e6;color:#fff}.swal2-progress-steps .swal2-progress-step.swal2-active-progress-step~.swal2-progress-step-line{background:#add8e6}.swal2-progress-steps .swal2-progress-step-line{z-index:10;width:2.5em;height:.4em;margin:0 -1px;background:#3085d6}[class^=swal2]{-webkit-tap-highlight-color:transparent}.swal2-show{-webkit-animation:swal2-show .3s;animation:swal2-show .3s}.swal2-hide{-webkit-animation:swal2-hide .15s forwards;animation:swal2-hide .15s forwards}.swal2-noanimation{transition:none}.swal2-scrollbar-measure{position:absolute;top:-9999px;width:50px;height:50px;overflow:scroll}.swal2-rtl .swal2-close{right:auto;left:0}.swal2-rtl .swal2-timer-progress-bar{right:0;left:auto}@supports (-ms-accelerator:true){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@media all and (-ms-high-contrast:none),(-ms-high-contrast:active){.swal2-range input{width:100%!important}.swal2-range output{display:none}}@-moz-document url-prefix(){.swal2-close:focus{outline:2px solid rgba(50,100,150,.4)}}@-webkit-keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@keyframes swal2-toast-show{0%{transform:translateY(-.625em) rotateZ(2deg)}33%{transform:translateY(0) rotateZ(-2deg)}66%{transform:translateY(.3125em) rotateZ(2deg)}100%{transform:translateY(0) rotateZ(0)}}@-webkit-keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@keyframes swal2-toast-hide{100%{transform:rotateZ(1deg);opacity:0}}@-webkit-keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@keyframes swal2-toast-animate-success-line-tip{0%{top:.5625em;left:.0625em;width:0}54%{top:.125em;left:.125em;width:0}70%{top:.625em;left:-.25em;width:1.625em}84%{top:1.0625em;left:.75em;width:.5em}100%{top:1.125em;left:.1875em;width:.75em}}@-webkit-keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@keyframes swal2-toast-animate-success-line-long{0%{top:1.625em;right:1.375em;width:0}65%{top:1.25em;right:.9375em;width:0}84%{top:.9375em;right:0;width:1.125em}100%{top:.9375em;right:.1875em;width:1.375em}}@-webkit-keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@keyframes swal2-show{0%{transform:scale(.7)}45%{transform:scale(1.05)}80%{transform:scale(.95)}100%{transform:scale(1)}}@-webkit-keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@keyframes swal2-hide{0%{transform:scale(1);opacity:1}100%{transform:scale(.5);opacity:0}}@-webkit-keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@keyframes swal2-animate-success-line-tip{0%{top:1.1875em;left:.0625em;width:0}54%{top:1.0625em;left:.125em;width:0}70%{top:2.1875em;left:-.375em;width:3.125em}84%{top:3em;left:1.3125em;width:1.0625em}100%{top:2.8125em;left:.8125em;width:1.5625em}}@-webkit-keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@keyframes swal2-animate-success-line-long{0%{top:3.375em;right:2.875em;width:0}65%{top:3.375em;right:2.875em;width:0}84%{top:2.1875em;right:0;width:3.4375em}100%{top:2.375em;right:.5em;width:2.9375em}}@-webkit-keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@keyframes swal2-rotate-success-circular-line{0%{transform:rotate(-45deg)}5%{transform:rotate(-45deg)}12%{transform:rotate(-405deg)}100%{transform:rotate(-405deg)}}@-webkit-keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@keyframes swal2-animate-error-x-mark{0%{margin-top:1.625em;transform:scale(.4);opacity:0}50%{margin-top:1.625em;transform:scale(.4);opacity:0}80%{margin-top:-.375em;transform:scale(1.15)}100%{margin-top:0;transform:scale(1);opacity:1}}@-webkit-keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@keyframes swal2-animate-error-icon{0%{transform:rotateX(100deg);opacity:0}100%{transform:rotateX(0);opacity:1}}@-webkit-keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@keyframes swal2-rotate-loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow:hidden}body.swal2-height-auto{height:auto!important}body.swal2-no-backdrop .swal2-container{top:auto;right:auto;bottom:auto;left:auto;max-width:calc(100% - .625em * 2);background-color:transparent!important}body.swal2-no-backdrop .swal2-container>.swal2-modal{box-shadow:0 0 10px rgba(0,0,0,.4)}body.swal2-no-backdrop .swal2-container.swal2-top{top:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-top-left,body.swal2-no-backdrop .swal2-container.swal2-top-start{top:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-top-end,body.swal2-no-backdrop .swal2-container.swal2-top-right{top:0;right:0}body.swal2-no-backdrop .swal2-container.swal2-center{top:50%;left:50%;transform:translate(-50%,-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-left,body.swal2-no-backdrop .swal2-container.swal2-center-start{top:50%;left:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-center-end,body.swal2-no-backdrop .swal2-container.swal2-center-right{top:50%;right:0;transform:translateY(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom{bottom:0;left:50%;transform:translateX(-50%)}body.swal2-no-backdrop .swal2-container.swal2-bottom-left,body.swal2-no-backdrop .swal2-container.swal2-bottom-start{bottom:0;left:0}body.swal2-no-backdrop .swal2-container.swal2-bottom-end,body.swal2-no-backdrop .swal2-container.swal2-bottom-right{right:0;bottom:0}@media print{body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown){overflow-y:scroll!important}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown)>[aria-hidden=true]{display:none}body.swal2-shown:not(.swal2-no-backdrop):not(.swal2-toast-shown) .swal2-container{position:static!important}}body.swal2-toast-shown .swal2-container{background-color:transparent}body.swal2-toast-shown .swal2-container.swal2-top{top:0;right:auto;bottom:auto;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-top-end,body.swal2-toast-shown .swal2-container.swal2-top-right{top:0;right:0;bottom:auto;left:auto}body.swal2-toast-shown .swal2-container.swal2-top-left,body.swal2-toast-shown .swal2-container.swal2-top-start{top:0;right:auto;bottom:auto;left:0}body.swal2-toast-shown .swal2-container.swal2-center-left,body.swal2-toast-shown .swal2-container.swal2-center-start{top:50%;right:auto;bottom:auto;left:0;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-center{top:50%;right:auto;bottom:auto;left:50%;transform:translate(-50%,-50%)}body.swal2-toast-shown .swal2-container.swal2-center-end,body.swal2-toast-shown .swal2-container.swal2-center-right{top:50%;right:0;bottom:auto;left:auto;transform:translateY(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-left,body.swal2-toast-shown .swal2-container.swal2-bottom-start{top:auto;right:auto;bottom:0;left:0}body.swal2-toast-shown .swal2-container.swal2-bottom{top:auto;right:auto;bottom:0;left:50%;transform:translateX(-50%)}body.swal2-toast-shown .swal2-container.swal2-bottom-end,body.swal2-toast-shown .swal2-container.swal2-bottom-right{top:auto;right:0;bottom:0;left:auto}body.swal2-toast-column .swal2-toast{flex-direction:column;align-items:stretch}body.swal2-toast-column .swal2-toast .swal2-actions{flex:1;align-self:stretch;height:2.2em;margin-top:.3125em}body.swal2-toast-column .swal2-toast .swal2-loading{justify-content:center}body.swal2-toast-column .swal2-toast .swal2-input{height:2em;margin:.3125em auto;font-size:1em}body.swal2-toast-column .swal2-toast .swal2-validation-message{font-size:1em}");
var util = {
  NOMBRE_APP: 'Zicandi - Eclipse',
  tipoOk: 'success',
  tipoErr: 'error',
  tipoAdv: 'warning',
  tipoInf: 'info',
  tipoPreg: 'question',
  btnSi: 'si',
  btnNo: 'no',
  /**
   * Muestra mensaje generico
   * @param {*} titulo 
   * @param {*} mensaje 
   * @param {*} icono success error warning info question
   */
  MSG: function MSG(titulo, mensaje, icono) {
    Swal.fire(titulo, mensaje, icono);
  },
  /**
   * Muestra mensaje con botones de si y no
   * @param {*} titulo 
   * @param {*} mensaje 
   * @param {*} icono 
   * @param {*} botonSi 
   * @param {*} botonNo 
   */
  MSG_SI_NO: function MSG_SI_NO(titulo, mensaje, icono) {
    var botonSi = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'Si, de acuerdo!';
    var botonNo = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 'No, cerrar';

    var me = this;

    var promise = new Promise(function (resolve, reject) {

      var swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      });

      swalWithBootstrapButtons.fire({
        title: titulo,
        text: mensaje,
        icon: icono,
        showCancelButton: true,
        confirmButtonText: botonSi,
        cancelButtonText: botonNo,
        reverseButtons: true
      }).then(function (result) {
        if (result.value == true) {
          resolve(me.btnSi);
        } else if (result.dismiss == 'cancel') {
          resolve(me.btnNo);
        } else {
          resolve('cancel');
        }
      });
    });

    return promise;
  },

  /**
   * Muestra mensaje intermitente
   * @param {*} mensaje 
   * @param {*} icono 
   */
  AVISO: function AVISO(mensaje, icono) {
    Swal.fire({
      position: 'top-end',
      icon: icono,
      title: mensaje,
      showConfirmButton: false,
      timer: 1000
    });
  },

  POPUP: function POPUP(url, styleFrame) {
    Swal.fire({
      title: '<strong>HTML <u>example</u></strong>',
      icon: 'info',
      html: '<iframe src="' + url + '" title="Login Mercadolibre" style="display: none;"></iframe>',
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down'
    });
  },

  /**
   * Recupera el mensaje de error del objecto
   * @param {*} error 
   */
  getErrorMensaje: function getErrorMensaje(error) {
    var msgError = '';
    var codError = '';

    if (error.hasOwnProperty('response')) {
      if (error.response.hasOwnProperty('data')) {
        if (error.response.data.hasOwnProperty('message')) {
          msgError += error.response.data.message;
        }
      }
    } else {
      msgError += error;
    }

    if (error.hasOwnProperty('response')) {
      if (error.response.hasOwnProperty('status')) {
        codError += error.response.status;
      }
    } else {
      codError += error;
    }

    if (codError != '') {
      if (codError.length <= 5) {
        msgError = msgError + " (" + codError + ")";
      }
    }

    return msgError;
  },


  /**Borrar sin uso */
  edimensionaImagen: function edimensionaImagen(data) {
    // Variables
    var inicioX = data.x;
    var inicioY = data.y;
    var nuevoAncho = 90;
    var nuevaAltura = 90;
    var zoom = 1;
    var imagenEn64 = '';
    // La imprimo
    miCanvas.width = nuevoAncho;
    miCanvas.height = nuevaAltura;
    // La declaro
    var miNuevaImagenTemp = new Image();
    // Cuando la imagen se carge se procederá al recorte
    miNuevaImagenTemp.onload = function () {
      // Se recorta
      contexto.drawImage(miNuevaImagenTemp, inicioX, inicioY, nuevoAncho * zoom, nuevaAltura * zoom, 0, 0, nuevoAncho, nuevaAltura);
      // Se transforma a base64
      imagenEn64 = miCanvas.toDataURL("image/jpeg");

      console.log(imagenEn64);
    };
  },


  /**
   * Formatea numero a moneda
   * @param {*} valor 
   */
  toMoneda: function toMoneda(valor) {
    var val = (valor / 1).toFixed(2).replace(',', '.');
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};
var paginador = {
  offset: 3,
  getPagesNumber: function getPagesNumber(pagination) {
    var to = pagination.to;
    var current_page = pagination.current_page;
    var last_page = pagination.last_page;

    if (!to) {
      return [];
    }

    var from = current_page - this.offset;
    if (from < 1) {
      from = 1;
    }

    var tos = from + this.offset * 2;
    if (tos >= last_page) {
      tos = last_page;
    }

    var pageArray = [];
    while (from <= tos) {
      pageArray.push(from);
      from++;
    }

    return pageArray;
  }
};
