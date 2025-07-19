function Pet(animal, name) {
  this.animal = animal;
  this.name = name;
}

Pet.prototype.sleep = function() {
  console.log('I am sleeping');
}

Pet.prototype.wake = function() {
  console.log('I am awake');
}
