function newStack() {
  let stack = [];

  class Stack {
    push(value) {
      stack.push(value);
    }

    pop() {
      return stack.pop();
    }

    printStack() {
      stack.forEach(item => console.log(item));
    }
  }

  return new Stack();
}

let stack = newStack();

stack.push('first');
stack.push('second');
stack.push('third');

stack.printStack();
// 'first'
// 'second'
// 'third'

console.log(stack.pop()) // 'third'

stack.printStack();
// 'first'
// 'second'