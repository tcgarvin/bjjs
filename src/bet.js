/**
 * Logic and rules for a single bet in BlackJack.
 */
function Bet(amount) {
  var winnings = 0;
  var doubled = false;
  var surrendered = false;

  // Double down
  this.double = function() {
    amount *= 2;
    doubled = true;
  }
  
  this.isDoubled = function() {
    return doubled;
  }

  // Get half your money back.
  this.surrender = function() {
    surrendered = true;
  }

  this.isSurrendered = function() {
    return surrendered;
  }

  this.setWinnings = function(howMuch) {
    if (surrendered) {
      // Fail silently?
      return;
    }
    winnings = howMuch;
  }

  this.getWinnings = function() {
    result = winnings;
    if (surrendered) {
      result = amount / 2;
    }
    return result;
  };

  this.getAmount = function() { return amount; };
}

module.exports = Bet;
