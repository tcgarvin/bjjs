var BlackJackGame = require('../src/blackjack.js');
var Player = require('../src/player.js');
var mockStrategy = require('./mockStrategy.js');

var houseRules = {};

var game = new BlackJackGame(houseRules);
var player = new Player(mockStrategy);

game.addPlayer(player);

game.doOneRound();
