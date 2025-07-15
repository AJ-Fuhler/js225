function countdown(count) {
  return (function() {
    let i;
    for (i = count; i >= 0; i -= 1) {
      console.log(i);
    }
    console.log('Done!');
  })();
}

countdown(7);