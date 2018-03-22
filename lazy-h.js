'use strict';

const h = (tag, attrs = {}, ...children) => {
  const elem = typeof tag === 'string' ? document.createElement(tag) : tag;
  if (Object.prototype.toString.call(attrs) === '[object Object]') {
    Object.keys(attrs).forEach(key => elem[key] = attrs[key]);
  } else {
    children.unshift(attrs);
  }
  children.forEach((_child) => {
    const child = typeof _child === 'string'
      ? document.createTextNode(_child)
      : _child;
    elem.appendChild(child);
  });
  return elem;
};