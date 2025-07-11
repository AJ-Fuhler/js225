let makeCar = function(rate, brakeRate) {
  return {
    speed: 0,
    rate,
    brakeRate,
    accelerate() {
      this.speed += this.rate;
    },
    brake() {
      if (this.speed > this.brakeRate) {
        this.speed -= this.brakeRate;
      } else {
        this.speed = 0;
      }
    }
  };
};

let hatchback = makeCar(9);