let rotateArray = function(arr) {
  if (!Array.isArray(arr)) return undefined;
  
  return arr.slice(1).concat(arr[0]);
}

let rotateRightmostDigits = function(digits, rotationAmount) {
  let digitsArr = [...String(digits)];
  digitsArr.push(digitsArr.splice(-rotationAmount, 1));
  return Number(digitsArr.join(''));
}

let maxRotation = function(number) {
  let length = String(number).length;
  for (let rotationAmount = length; rotationAmount >= 2; rotationAmount -= 1) {
    number = rotateRightmostDigits(number, rotationAmount);
  }

  return number;
}

maxRotation(735291);          // 321579
maxRotation(3);               // 3
maxRotation(35);              // 53
maxRotation(105);             // 15 -- the leading zero gets dropped
maxRotation(8703529146);      // 7321609845
