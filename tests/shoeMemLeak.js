var Shoe = require('../src/shoe.js');

var shoe = new Shoe(4);

for (var i = 0; i < 1000000000; i++) {
  if (shoe.cardsLeft() < 5) {
    shoe.shuffle();
  }
  shoe.draw();
}
