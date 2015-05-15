/**
 * This is the strategy a dealer follows.  It's very simple.
 */

function DealerStrategy() {
  // Dealers don't bet, obviously, but this fulfills the interface in case we
  // want to test with it or something.
  this.chooseBet = function() {
    return 10;
  }

  // A dealer only looks at his own hand.  We don't even need the other arguments.
  this.choosePlay = function(hand) {
    // TODO: handle rules about things like soft 17.
    if (hand.getValue() < 17) {
      return "hit";
    }
    return "stay";
  }
}

module.exports = DealerStrategy;
