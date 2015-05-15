var Shoe = require('../src/shoe.js');

var shoe = new Shoe(1);
if (shoe.cardsLeft() != 52) {
  throw "1 deck should be 52 cards, not " + shoe.cardsLeft();
}

shoe.draw();
shoe.draw();
if (shoe.cardsLeft() != 50) {
  throw "1 deck minus 2 should be 50 cards, not " + shoe.cardsLeft();
}

stackCopy = shoe.getRemainingCards();
if (stackCopy.length != 50) {
  throw "The copy doesn't seem to quite match up, lengthwise."
}



var bigShoe = new Shoe(4);
if (bigShoe.cardsLeft() != 208) {
  throw "4 decks should be 208 cards, not " + bigShoe.cardsLeft();
}

