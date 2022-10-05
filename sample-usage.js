import el from './lazy-el.js';

el.on(document, 'DOMContentLoaded', () => {
  el(document.body,
    el('h1', {id: 'greeting'}, 'Hi!'),
    el('p', 'This is all dynamic content'),
  );

  // make a container, put things in it, then insert it at the end
  const container = el('div', {id: 'container'});
  const items = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth'];

  // the verbose way
  el(container,
    el('h2', 'List 1'),
    el('p', 'A list'),
    el('ol', ...items.slice(0, 3).map(txt => el('li', txt))),
  );

  // or you can optionally make things more concise by generating tag funcs
  const [h2, p, ol, li] = el.tags('h2', 'p', 'ol', 'li');

  // alternatively, even shorter (in ES2015+ sicne Proxy can't be shimmed):
  // const {h2, p, ol, li} = el.ptag;

  el(container,
    h2('List 2'),
    p('Another list'),
    ol(...items.map(txt => li(txt))),
  );
  // now insert the container into the DOM
  el(document.body, container);
});
