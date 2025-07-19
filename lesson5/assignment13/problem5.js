let foo = {
  a: 1,
  begetObject() {
    let F = function() {};
    F.prototype = this;
    return new F();
  }
};


Object.prototype.begetObject = function() {
  let F = function() {};
  F.prototype = this;
  return new F();
}

let bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar));         // true
