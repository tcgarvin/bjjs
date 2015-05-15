/**
 * A card, valued for blackjack
 */

function Card(rank, suit) {
  var value;

  switch (rank) {
    case "A":
      value = 11;
      break;
    case "2":
      value = 2;
      break;
    case "3":
      value = 3;
      break;
    case "4":
      value = 4;
      break;
    case "5":
      value = 5;
      break;
    case "6":
      value = 6;
      break;
    case "7":
      value = 7;
      break;
    case "8":
      value = 8;
      break;
    case "9":
      value = 9;
      break;
    case "10":
    case "J":
    case "Q":
    case "K":
      value = 10;
      break;
    default:
      throw rank + " is not a real card rand."
  }

  this.getRank = function() { return rank; };
  this.getSuit = function() { return suit; };
  this.getValue = function() { return value; };
  this.toString = function() { return rank + " of " + suit; };
}

// I don't want to use unicode suits.
Card.suits = ["hearts", "spades", "clubs", "diamonds"];
Card.ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

module.exports = Card;
