const Sort = require('./Sort');

test('shoud be sort an array of numbers', () => {
  const sorted = Sort([3, 1, 2]);
  expect(sorted[0]).toBe(1);
});
