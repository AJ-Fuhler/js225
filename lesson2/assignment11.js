function makeCountry(name, continent, visited=false) {
  return {
    name,
    continent,
    visited,
    getDescription() {
      let visited = this.visited ? `I have visited ${this.name}.` : `I haven't visited ${this.name}.`
      return this.name + ' is located in ' + this.continent + '. ' + visited;
    },
    visitCountry() {
      this.visited = true;
    }
  };
}

let chile = makeCountry('The Republic of Chile', 'South America');
let canada = makeCountry('Canada', 'North America');
let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

console.log(chile.getDescription());       // "The Republic of Chile is located in South America."
console.log(canada.getDescription());      // "Canada is located in North America."
console.log(southAfrica.getDescription()); // "The Republic of South Africa is located in Africa."

console.log(canada.getDescription()); // "Canada is located in North America. I haven't visited Canada."
console.log(canada.visitCountry());
console.log(canada.getDescription()); // "Canada is located in North America. I have visited Canada."