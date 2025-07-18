let createProduct = function(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,
    setPrice(price) {
      if (price < 0) return 'Invalid Price.'
      this.price = price;
    },
    describe() {
      console.log('=> Name: ' + this.name);
      console.log('=> ID: ' + this.id);
      console.log('=> Price: $' + this.price);
      console.log('=> Stock: ' + this.stock);
    }
  };
};

let scissors = createProduct(0, 'Scissors', 8, 10);
let drill = createProduct(1, 'Cordless Drill', 15, 45);


scissors.describe();