/**
 * Logic and rules for a single hand of blackjack.  Should be able to handle
 * either a dealer hand or a player hand.  All it really does is keep track of
 * hard and soft hands.
 */
function Hand() {
  var cards = [];
  var value = 0;
  var aces = 0; // Number of aces.
  var hardenedAces = 0; // Number of aces considered hard.
  var isSoft = false;

  // Add one card to the hand.
  this.dealCard = function(card) {
    cards.push(card);
    value += card.getValue();

    // Handle Aces
    if (card.getRank() == "A") {
      aces += 1;
      isSoft = true;
    }

    if (value > 21 && hardenedAces < aces) {
      value -= 10;
      hardenedAces += 1;
      if (hardenedAces == aces) {
        isSoft = false;
      }
    }
  }

  // Get the blackjack value of this hand.
  this.getValue = function() {
    return value;
  };

  // Return whether or not any aces are considered soft.
  this.isSoft = function() {
    return isSoft;
  };

  this.isBlackJack = function() {
    return cards.length == 2 && this.getValue() == 21;
  }

  // Returns a copy of the cards.
  this.getCards = function() {
    return cards.slice();
  };

  this.getCardAt = function(i) {
    return cards[i];
  }

  this.toString = function() {
    var result = cards.reduce(function(a,b) {
      return a + " and " + b;
    });
    return result + " (" + (this.isSoft() ? "soft" : "hard") + " " + this.getValue() + ")";
  }
}

module.exports = Hand;
