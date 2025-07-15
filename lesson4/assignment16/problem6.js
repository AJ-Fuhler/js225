// recursion with IIFE

function countdown(count) {
  (function recursiveSub(n) {
    console.log(n);

    if (n === 0) {
      console.log('Done!');
    } else {
      recursiveSub(n - 1);
    }
  })(count);
}

// regular recursive solution

function recursiveCountdown(count) {
  if (count === -1) {
    console.log('Done!');
    return;
  } else {
    console.log(count);
    return recursiveCountdown(count - 1);
  }
}
