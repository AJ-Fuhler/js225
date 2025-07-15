function subtract(a, b) {
  return a - b;
}

function makeSub() {
  return function(a) {
    return subtract(a, 5);
  };
}

const sub5 = makeSub();

sub5(10); // 5
sub5(20); // 15