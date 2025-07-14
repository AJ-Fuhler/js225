function makeListTransformer(func) {
  return function(collection) {
    return collection.map(func);
  };
}

let timesTwo = makeListTransformer(function(number) {
  return number * 2;
});

timesTwo([1, 2, 3, 4]); // [2, 4, 6, 8]