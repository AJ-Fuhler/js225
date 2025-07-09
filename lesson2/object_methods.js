let me = {
  firstName: 'AJ',
  lastName: 'Fuhler',
};

let friend = {
  firstName: 'Evan',
  lastName: 'Wrazidlo',
};

let mother = {
  firstName: 'Marjan',
  lastName: 'Kraaij',
};

let father = {
  firstName: 'Johnny',
  lastName: 'Fuhler',
};

let people = {
  collection: [],
  currentId: 1,
  fullName(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },

  rollCall() {
    this.collection.forEach(this.fullName);
  },

  add(person) {
    if (this.isInvalidPerson(person)) return;
    person.id = this.currentId;
    this.currentId += 1;
    this.collection.push(person);
  },

  getIndex(person) {
    let index = -1;
    this.collection.forEach((comparator, i) => {
      if (comparator.firstName === person.firstName &&
          comparator.lastName === person.lastName) {
            index = i;
      }
    });

    return index;
  },

  getIndexById(id) {
    let index = -1;
    this.collection.forEach((comparator, i) => {
      if (comparator.id === id) {
        index = i;
      }
    })

    return index;
  },

  isInvalidPerson(person) {
    return typeof person.firstName !== 'string' || typeof person.lastName !== 'string';
  },

  remove(person) {
    if (this.isInvalidPerson(person)) return;

    let index = this.getIndexById(person.id);
    if (index === -1) {
      return;
    }

    this.collection.splice(index, 1);
  },

  get(person) {
    if (this.isInvalidPerson(person)) return;
    return this.collection[this.getIndexById(person.id)];
  },

  update(person) {
    if (this.isInvalidPerson(person)) return;

    let existingPersonId = this.getIndexById(person.id);
    if (existingPersonId === -1) {
      person.id = this.currentId;
      this.currentId += 1;
      this.add(person);
    } else {
      this.collection[existingPersonId] = person;
    }
  },
}

people.remove({firstName: 'AJ', lastName: 'Fuhler'});
people.rollCall();

people.add(me);
console.log(people.get(me));
me.married = true;
me.hasChildren = true;

console.log(people.update(me));
console.log(people.get(me));