function objectsEqual(obj1, obj2) {
  if (obj1 === obj2) return true;

  if (Object.keys(obj1).length === Object.keys(obj2).length) {
    for (let [key, value] of Object.entries(obj1)) {
      if (typeof value === 'object' && value !== null &&
          typeof obj2[key] === 'object' && obj2[key] !== null) {
        if (!objectsEqual(value, obj2[key])) {
          return false;
        } else {
          continue;
        }
      }
      if (!(key in obj2) || obj2[key] !== value) {
        return false;
      }
    }
    return true;
  }

  return false;
}

// console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
// console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
// console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'}));  // true
// console.log(objectsEqual({}, {}));                                      // true
// console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
// console.log(objectsEqual({a: 'foo', b: {c: 'bar'}}, {a: 'foo', b: {c: 'bar'}})); // true
// console.log(objectsEqual({a: 'foo', b: {c: 'bar'}}, {a: 'foo', b: {c: 'not bar'}})); // false

console.log(objectsEqual(['foo', 'bar', 4], ['foo', 'bar', 4]));
console.log(objectsEqual({a: 'foo', b: {c: 'bar', f: ['foo', 'bar', 4]}, d: ['foo', 'bar', 4], e: null}, {a: 'foo', b: {c: 'bar', f: ['foo', 'bar', 4]}, d: ['foo', 'bar', 4], e: null})); // true