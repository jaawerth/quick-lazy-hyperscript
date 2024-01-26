export default function el(tag, attrs = {}, ...chx) {
  const elem = typeof tag === 'string' ? document.createElement(tag) : tag;
  if (Object.prototype.toString.call(attrs) === '[object Object]') {
    Object.keys(attrs).forEach(key => elem.setAttribute(key, attrs[key]));
  } else {
    chx.unshift(attrs);
  }
  chx.flat(Infinity).forEach(child => elem.appendChild(typeof child === 'string' ? el.text(child) : child));
  return elem;
};

// helper for generating tag creation funcs
const tags = Object.create(null);
el.tag = (tagname) => tags[tagname] || (tags[tagname] = (...args) => el(tagname, ...args), tags[tagname]);
el.tags = (...tagnames) => tagnames.map(el.tag);
el.ptag = (typeof Proxy === 'undefined') ? {} : new Proxy({}, {get: (t, k) => el.tag(k)});

// tack on a few other shorthand utils
el.qs = (selectors, parent = document) => parent.querySelector(selectors);
el.qsAll = (selectors, parent = document) => parent.querySelectorAll(selectors);
el.getById = (id, parent = document) => parent.getElementById(id);
el.text = (text) => document.createTextNode(text);
el.on = (tgt, event, handler, ...args) => tgt.addEventListener(event, handler, ...args);
el.off = (tgt, event, handler) => tgt.removeEventListener(event, handler);
el.once = (tgt, event, handler, opts) => tgt.addEventListener(
  event,
  handler,
  typeof opts === 'object' ? {...opts, once: true} : opts,
);
