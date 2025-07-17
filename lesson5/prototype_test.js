function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating.`);
};

function Mammal(name, hasFur) {
  Animal.call(this, name);
  this.hasFur = hasFur;
}

Mammal.prototype = Object.create(Animal.prototype);
Mammal.prototype.constructor = Mammal;

Mammal.prototype.sleep = function() {
  console.log(`${this.name} is sleeping.`);
};

function Dog(name, hasFur, breed) {
  Mammal.call(this, name, hasFur);
  this.breed = breed;
}

Dog.prototype = Object.create(Mammal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log(`${this.name} the ${this.breed} is barking.`);
}

let myDog = new Dog('Rex', true, 'German Shepard');
myDog.eat();
myDog.sleep();
myDog.bark();

/*

When using the constructor/prototype pattern, there are three significant steps
to have a subtype inherit from a supertype:

1. Replace the function prototype for each subtype's constructor. To do that,
use Object.create with an argument referencing the supertype's function
prototype, and assign it to the subtype constructor's prototype property.

2. Set the subtype's prototype.constructor property to the subtype's constructor
function.

3. In the subtype's constructor, call the supertype's constructor using
Function.prototype.call. You should pass `this` as the first argument to `call`
followed by the arguments for the supertype's constructor.

*/