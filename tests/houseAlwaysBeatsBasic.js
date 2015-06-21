var BlackJackGame = require('../src/blackjack.js');
var Player = require('../src/player.js');
var BasicStrategy = require('../src/strategy/BasicStrategy.js');

var game = new BlackJackGame({decks:4});

var basic = new Player(new BasicStrategy());
basic.setName("Bart");
game.addPlayer(basic);

// Let's do 10 million rounds, to make sure the house wins.
for(var i = 1; i <= 10000000; i++) {
  game.doOneRound();
  if (i % 10000 == 0) {
    console.log("At " + i + ": " + basic.getName() + " has $" + basic.getBalance());
  }
}

