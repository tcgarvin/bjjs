var Player = require("../src/player.js");
var mockStrategy = require("./mockStrategy.js");

var player = new Player(mockStrategy);
if (player.getBalance() != 0) {
  throw "Player initial balance should be 0, not " + player.getBalance();
}

player.changeBalance(50);
player.changeBalance(50);
if (player.getBalance() != 100) {
  throw "After adding 50 twice, player balance should be 100, not " + player.getBalance();
}

if (player.chooseBet().getAmount() != 10) {
  throw "With the mock strategy, we should be seeing a bet of 10, but we're not.";
}

if (player.choosePlay() != "stay") {
  throw "With the mock strategy, we should always see 'stay', but we're not.";
}
