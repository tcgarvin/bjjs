// I don't have internet right now to learn a node testing framework.  Maybe later

Card = require("../src/card.js");

// Let's just make every possible card and make sure they all have a suit, rank, and value.
Card.suits.forEach(function(suit) {
  Card.ranks.forEach(function(rank) {
    card = new Card(rank, suit);
    if (card.getRank() != rank) {
      throw "Card rank should be " + rank + ", not " + card.getRank();
    }
    if (card.getSuit() != suit) {
      throw "Card suit should be " + suit + ", not " + card.getSuit();
    }
    if (!card.getValue()) {
      console.err("No getValue! Trying to get " + rank + " of " + suit);
    }
  });
});
