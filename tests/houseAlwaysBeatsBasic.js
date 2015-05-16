var BlackJackGame = require('../src/blackjack.js');
var Player = require('../src/player.js');
var BasicStrategy = require('../src/strategy/BasicStrategy.js');

var game = new BlackJackGame({decks:4});

var basic = new Player(new BasicStrategy());
basic.setName("Bart");
game.addPlayer(basic);

// Let's do a quarter million rounds, to make sure the house wins, and because tere's some problem if we try to do more than that..
for(var i = 0; i < 250000; i++) {
  game.doOneRound();
  if (i % 10000 == 0) {
    console.log("At " + i + ": " + basic.getName() + " has $" + basic.getBalance());
  }
}

