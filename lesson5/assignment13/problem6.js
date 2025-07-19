function neww(constructor, args) {
  let newObj = Object.create(constructor.prototype);
  let result = constructor.apply(newObj, args);

  return typeof result === 'object' ? result : newObj;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
john.constructor;         // Person(firstName, lastName) {...}
