function makeCounterLogger(start) {
  return function(finish) {
    let i;

    if (start > finish) {
      for (i = start; i >= finish; i -= 1) {
        console.log(i);
      }
    } else {
      for (i = start; i <= finish; i += 1) {
        console.log(i);
      }
    }
  };
}