function makeList() {
  let items = [];
  return {
    list() {
      if (items.length > 0) {
        items.forEach(item => console.log(item));
      } else {
        console.log('The list is empty.');
      }
    },
    add(item) {
      let index = items.indexOf(item);
      if (index === -1) {
        items.push(item);
        console.log(item + ' added!');
      }
    },
    remove(item) {
      index = items.indexOf(item);
      if (index >= 0) {
        items.splice(index, 1);
        console.log(item + ' removed!');
      } else {
        console.log('item was not on the list');
      }
    }
  }
}

let list = makeList();
list.add('peas');
list.list();
list.add('corn');
list.list();
list.remove('peas');
list.list();