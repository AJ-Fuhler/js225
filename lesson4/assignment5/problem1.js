function makeMultipleLister(number) {
  return function() {
    for (let i = number; i < 100; i += number) {
      console.log(i);
    }
  };
}

let lister = makeMultipleLister(13);
lister();