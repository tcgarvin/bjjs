var BlackJackGame = require('../src/blackjack.js');
var Player = require('../src/player.js');
var DealerStrategy = require('../src/strategy/DealerStrategy.js');
var BasicStrategy = require('../src/strategy/BasicStrategy.js');

var game = new BlackJackGame({decks:4});

var player1 = new Player(new DealerStrategy());
player1.setName("A.J.");
game.addPlayer(player1);

var player2 = new Player(new DealerStrategy());
player2.setName("Deuce");
game.addPlayer(player2);

var basic = new Player(new BasicStrategy());
basic.setName("Bart");
game.addPlayer(basic);

// Let's do 100 rounds, to get most everything, and make the deck reshuffle a bunch.
for(var i = 0; i < 100; i++) {
  console.log("");
  game.doOneRound();

  game.getPlayers().forEach(function(player) {
    console.log(player.getName() + " has $" + player.getBalance());
  });
}
