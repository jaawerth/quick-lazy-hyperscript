'use strict';

const h = (tag, ...children) => {
  const elem = typeof tag === 'string' ? document.createElement(tag) : tag;
  children.forEach((_child) => {
    const child = typeof _child === 'string'
      ? document.createTextNode(_child)
      : _child;
    elem.appendChild(child);
  });
  return elem;
};