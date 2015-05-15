var Bet = require('./bet.js');

/*return*
 * A blackjack player has a cash balance and a strategy.  The game interacts 
 * with the player, which causes the game to progress.
 */
function Player(strategy) {
  var balance = 0;
  var name = "Player";
  
  this.chooseBet = function(game) {
    var amount = strategy.chooseBet(this, game);
    var bet = new Bet(amount);
    this.changeBalance(amount * -1);
    return bet;
  };

  this.choosePlay = function(hand, dealerCard, validPlays, game) {
    return strategy.choosePlay(hand, dealerCard, validPlays, this, game);
  };

  this.collectWinnings = function(bet) {
    this.changeBalance(bet.getWinnings());
  }

  this.changeBalance = function(amount) {
    balance += amount;
  };

  this.getBalance = function(){
    return balance;
  };

  this.setName = function(value) {
    name = value;
  }

  this.getName = function() {
    return name;
  }
}

module.exports = Player;
