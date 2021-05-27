export default function el(tag, attrs = {}, ...children) {
  const elem = typeof tag === 'string' ? document.createElement(tag) : tag;
  if (Object.prototype.toString.call(attrs) === '[object Object]') {
    Object.keys(attrs).forEach(key => elem.setAttribute(key, attrs[key]));
  } else {
    children.unshift(attrs);
  }
  children.forEach(child => elem.appendChild(typeof child === 'string' ? el.text(child) : child));
  return elem;
};

// helper for generating tag creation funcs
const tags = Object.create(null);
el.tag = (tagname) => tags[tagname] || (tags[tagname] = (...args) => el(tagname, ...args), tags[tagname]);

// tack on a few other shorthand utils
el.qs = (selectors, parentNode = document) => parentNode.querySelector(selectors);
el.qsAll = (selectors, parentNode = document) => parentNode.querySelectorAll(selectors);
el.getById = (id, parentNode = document) => parentNode.getElementById(id);
el.text = (text) => document.createTextNode(text);
el.on = (tgt, event, handler, ...args) => tgt.addEventListener(event, handler, ...args);
el.off = (tgt, event, handler) => tgt.removeEventListener(event, handler);
el.once = (tgt, event, handler, ...args) => tgt.addEventListener(event, function wrappedHandler(e) {
  tgt.removeEventListener(event, wrappedHandler);
  return handler.call(this, e);
}, ...args);
