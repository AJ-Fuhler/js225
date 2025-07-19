let shape = {
  getType() {
    return this.type;
  }
};

let Triangle = function(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = 'triangle';
};

Triangle.prototype = shape;
Triangle.prototype.constructor = Triangle;

shape.getPerimeter = function() {
  return this.a + this.b + this.c;
};

let t = new Triangle(3, 4, 5);
console.log(t.constructor);                 // Triangle(a, b, c)
console.log(shape.isPrototypeOf(t));        // true
console.log(t.getPerimeter());              // 12
console.log(t.getType());                   // "triangle"
