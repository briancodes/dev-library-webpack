import Cat from './lib/cat.js';
import Dog from './lib/dog.js';

function msgAfterTimeout(msg, who, timeout) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(`${msg} Hello ${who}!`), timeout);
  });
}
msgAfterTimeout('', 'Foo', 100).then((msg) =>
  msgAfterTimeout(msg, 'Bar', 200)
).then((msg) => {
  console.log(`done after 300ms:${msg}`);
});

export { Dog, Cat };
