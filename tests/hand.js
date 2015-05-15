var Card = require("../src/card.js");
var Hand = require("../src/hand.js");

var hardHand = new Hand();
hardHand.dealCard(new Card("5", "clubs"));
hardHand.dealCard(new Card("2", "clubs"));
if (hardHand.getValue() != 7) {
  throw "Hand given a 5 and a 2, should equal 7, not " + hardHand.getValue() + "!";
}
if (hardHand.isSoft()) {
  throw "A 5 and a 2 should not make a soft hand!";
}
cardCopy = hardHand.getCards();
if (cardCopy.length != 2) {
  throw "We put 2 cards in and got " + cardCopy.length() + " cards out!";
}



var softHand = new Hand();
softHand.dealCard(new Card("A", "spades"));
softHand.dealCard(new Card("K", "spades"));

if (!softHand.isSoft()) {
  throw "A and K should be soft, not hard!";
}
if (softHand.getValue() != 21) {
  throw "A and K should be 21, not " + softHand.getValue();
}

softHand.dealCard(new Card("2", "clubs"));

if (softHand.isSoft()) {
  throw "A, K and 2 should be hard, not soft!";
}

if (softHand.getValue() != 13) {
  throw "A, K and 2 should be hard 13, not " + softHand.getValue() + "!";
}

