let itemCreator = (() => {
  function isValiditemName(itemName) {
    return itemName.replace(/\s/g, '').length >= 5;
  }

  function isValidCategory(category) {
    return (category.replace(/\s/g, '').length === category.length &&
      category.length >= 5);
  }

  function isValidQuantity(quantity) {
    return quantity !== undefined;
  }

  function generateskuCode(itemName, category) {
    let itemNameLetters = itemName.replace(/\s/g, '').slice(0, 3);
    let categoryLetters = category.slice(0, 2);
    return (itemNameLetters + categoryLetters).toUpperCase();
  }

  return function(itemName, category, quantity) {
    if (!(isValiditemName(itemName) &&
          isValidCategory(category) &&
          isValidQuantity(quantity))) {
      return {notValid: true};
    }
    return {
      skuCode: generateskuCode(itemName, category),
      itemName,
      category,
      quantity,
    }
  };
})();



class ItemManager {
  static items = [];

  static create(itemName, category, quantity) {
    let item = itemCreator(itemName, category, quantity);
    if (!item.notValid) {
      ItemManager.items.push(item);
    }
  }

  static update(skuCode, updates) {
    let item = ItemManager.items.filter(item => item.skuCode === skuCode)[0];
    for (let key in updates) {
      item[key] = updates[key];
    }
  }

  static delete(skuCode) {
    ItemManager.items = ItemManager.items.filter(item => item.skuCode !== skuCode);
  }

  static inStock() {
    return ItemManager.items.filter(item => item.quantity > 0);
  }

  static itemsInCategory(category) {
    return ItemManager.items.filter(item => item.category === category);
  }

  static getItem(skuCode) {
    return ItemManager.items.filter(item => item.skuCode === skuCode)[0];
  }
}

class ReportManager {
  static items;

  static init(itemManager) {
    ReportManager.items = itemManager;
  }

  static createReporter(skuCode) {
    let item = ReportManager.items.getItem(skuCode);

    return {
      itemInfo() {
        for (let [key, value] of Object.entries(item)) {
          console.log(`${key}: ${value}`);
        }
      }
    };
  }

  static reportInStock() {
    return ReportManager.items
      .inStock()
      .map(item => item.itemName)
      .join(',');
  }
}

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);
// returns list with the 4 valid items

ReportManager.init(ItemManager);
console.log(ReportManager.reportInStock());
// logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.inStock());
// returns list with the item objects for football and kitchen pot
console.log(ReportManager.reportInStock());
// logs football,kitchen pot
console.log(ItemManager.itemsInCategory('sports'));
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemitemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemitemName: kitchen pot
// category: cooking
// quantity: 10