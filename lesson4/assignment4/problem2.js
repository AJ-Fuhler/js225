function makeList() {
  let todos = [];
  return function(todo) {
    if (!todo) {
      if (todos.length > 0) {
        todos.forEach(todo => console.log(todo));
      } else {
        console.log('The list is empty.')
      }
    } else {
      index = todos.indexOf(todo);
      if (index === -1) {
        todos.push(todo);
        console.log(todo + ' added!');
      } else {
        todos.splice(index, 1);
        console.log(todo + ' removed!');
      }
    }
  };
}

let list = makeList();
list();
list('make breakfast');
list('read book');
list();
list('make breakfast');
list();