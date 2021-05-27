import el from './lazy-el.js';

el.on(document, 'DOMContentLoaded', () => {
  el(document.body,
    el('h1', {id: 'greeting'}, 'Hi!'),
    el('p', 'This is all dynamic content'),
  );

  // make a container, put things in it, then insert it at the end
  const container = el('div', {id: 'container'});
  const items = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'];

  el(container,
    el('h2', 'List 1'),
    el('p', 'A list'),
    el('ol', ...items.slice(0, 3).map(txt => el('li', txt))),
  );

  // you can optionally make things (arguably) cleaner by generating tag funcs
  const [h2, p, ol, li] = ['h2', 'p', 'ol', 'li'].map(el.tag);
  el(container,
    h2('List 2'),
    p('Another list'),
    ol(...items.slice(3).map(txt => li(txt))),
  );

  // now insert container
  el(document.body, container);
});
