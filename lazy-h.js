'use strict';

const lazyHyperScript = (tag, attrs = {}, ...children) => {
  const elem = typeof tag === 'string' ? document.createElement(tag) : tag;
  if (Object.prototype.toString.call(attrs) === '[object Object]') {
    Object.keys(attrs).forEach(key => elem.setAttribute(key, attrs[key]));
  } else {
    children.unshift(attrs);
  }
  children.forEach((child) => {
    elem.appendChild(typeof child === 'string' ? document.createTextNode(child) : child);
  });
  return elem;
};
export const h = lazyHyperScript;
h.qs = (selectors, parentNode = document) => parentNode.querySelector(selectors);
h.qsAll = (selectors, parentNode = document) => parentNode.querySelectorAll(selectors);
h.getById = (id, parentNode = document) => parentNode.getElementById(id);
h.on = (tgt, event, handler, ...args) => tgt.addEventListener(event, handler, ...args);
h.off = (tgt, event, handler) => tgt.removeEventListener(event, handler);
h.once = (tgt, event, handler, ...args) => tgt.addEventListener(event, function wrappedHandler(e) {
  tgt.removeEventListener(event, wrappedHandler);
  return handler.call(this, e);
}, ...args);

export default h;