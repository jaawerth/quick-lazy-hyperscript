
'use strict';
const isPlainObj = val => typeof val === 'object' && Object.prototype.toString.call(val) === '[object Object]';

const h = (tag, attrs = {}, ...children) => {
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

h.qs = (selectors, parentNode = document) => parentNode.querySelector(selectors);
h.qsAll = (selectors, parentNode = document) => parentNode.querySelectorAll(selectors);
h.getById = (id, parentNode = document) => parentNode.getElementById(id);

export default h;