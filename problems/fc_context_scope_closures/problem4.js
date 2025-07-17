function myBind(func, context, ...partialArgs) {
  return function(...args) {
    const fullArgs = partialArgs.concat(args);
    return func.apply(context, fullArgs);
  };
}

const fullname = function(firstName) {
  console.log(firstName, this.lastName);
}

let person = {
  lastName: 'Fuhler',
};

const showFullName = myBind(fullname, person);

showFullName('AJ');

function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(addNumbers, null, 5);

console.log(addFive(10));