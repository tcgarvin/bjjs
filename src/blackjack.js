var Shoe = require('./shoe.js');
var Hand = require('./hand.js');
var Player = require('./player.js');
var DealerStrategy = require('./strategy/DealerStrategy.js');

/**
 * The game itself.  Handles house rules, deciding results, dealing, etc.  You
 * could almost think of this as a Dealer object.  (The actual dealer is a
 * seperate object that runs the game, and makes no deciions about the actual
 * game progression, mirroring real life.)
 */
function BlackJackGame(houseRules) {
  initHouseRules();

  var maxPlayers = houseRules.decks * 5; // Most games shouldn't get near this.
  var players = [];
  var shoe = new Shoe(houseRules.decks);

  //We model the dealer after a player, which may buy us some code reuse.
  var dealer = new Player(new DealerStrategy());
  dealer.setName("Dealer");

  /**
   * A a player to the game.  If position (given as a player to sit before)
   * isn't given, player is added to last seat at the table.  (Rules about
   * table size are outside of this object, but we set a ceiling based on the
   * max number of cards possibly needed to deal to all these people )
   */
  this.addPlayer = function(player, position) {
    if (players.length >= maxPlayers) {
      throw "Too many players."
    }

    // TODO: Position
    players.push(player);
  }

  this.getPlayers = function() {
    return players.slice();
  }

  this.doOneRound = function() {
    var game = this;
    var playersInThisRound = [];
    var playerHands = [];

    game.emit("story", "Starting Round");

    // Shuffle, if we need to. (TODO: How best to model the timing of a shuffle?)
    // Let's say we want 5 cards available per hand being dealt. If we can't
    // have that, we shuffle.
    var desiredShoeSize = (players.length + 1) * 5;
    if (shoe.cardsLeft() < desiredShoeSize) {
      game.emit("story", "Shuffling deck.");
      shoe.shuffle();
    }

    // Gather bets
    players.forEach(function(player) {
      var bet = player.chooseBet();
      if (bet.getAmount() > 0) {
        game.emit("story", player.getName() + " bets " + bet.getAmount());
        playersInThisRound.push(player);

        // Alright, so I want to associate players and their hands in the
        // context of this current round.  I could make hands aware of players
        // or vis-versa, but those types don't really need to know about
        // eachother.  I could just set hand.player, which is almost certainly
        // an anti-pattern, though I can't really say why.  I think making a
        // playerhand object sounds like a pretty good way of doing things.
        // I'll just make that up here for now.. maybe I'll formalize it later.
        playerHands.push({
          hand: new Hand(),
          player: player,
          bet: bet
        });
      }
      else {
        game.emit("story", player.getName() + " sits out.");
      }
    });

    // If nobody is going to play, then that's that.
    if (playersInThisRound.length == 0) {
      return;
    }

    // Deal first card
    playerHands.forEach(function(playerHand) {
      playerHand.hand.dealCard(shoe.draw());
    });

    // Deal second card. Also check for Yeah yeah, it doesn't matter, I know.
    playerHands.forEach(function(playerHand) {
      playerHand.hand.dealCard(shoe.draw());
      game.emit("story", playerHand.player.getName() + " draws a " + playerHand.hand.toString() + ".");
    });

    // Deal dealer
    dealerHand = new Hand();
    dealerHand.dealCard(shoe.draw());
    dealerHand.dealCard(shoe.draw());

    // If dealer first card is an ace, call for insurance
    var showingCard = dealerHand.getCardAt(0);
    this.emit("story", "Dealer shows " + showingCard.toString());
    if (showingCard.getRank() == "A") {
      // Offer insurance. XXX: Everyone knows you don't take insurance.
      this.emit("story", "Insurance? No takers.");
      // Check for dealer blackjack
      if (dealerHand.getValue() == 21) {
        this.emit("story", "Dealer blackjack with " + showingCard.toString() + " and " + dealerHand.getCardAt(1).toString());
        // In the event of a dealer blackjack, we just resolve winnings without
        // letting players play.  A player blackjack will result in a push.
        this.resolveWinnings(playerHands, dealerHand)
        return;
      }
    }

    // Go around the table so players can play
    for(var i = 0; i < playerHands.length; i++) {
      var splitHands = this.playHand(playerHands[i], dealerHand);
      // If the hands split, make sure they're accounted for and played.
      if (splitHands) {
        this.playHand(splitHands[0], dealerHand, true);
        this.playHand(splitHands[1], dealerHand, true);
        // The splice will increase the length by 1.  We i++ to make sure the
        // next iteration is the hand after these splits.
        playerHands.splice(i,1,splitHands[0],splitHands[1]);
        i++;
      }
    }

    // If all players have busted, the dealer need not play.
    var everyoneLost = playerHands.every(function(playerHand) {
      return playerHand.hand.getValue() > 21 || playerHand.bet.isSurrendered();
    });
    if (everyoneLost) {
      this.emit("story", "Everyone has busted or surrendered.");
      this.resolveWinnings(playerHands, dealerHand);
      return;
    }
    
    this.emit("story", dealer.getName() + " has a " + dealerHand.toString() + ".");
    this.playHand({
      hand: dealerHand,
      player: dealer
    });

    this.resolveWinnings(playerHands, dealerHand);
  };

  this.playHand = function(playerHand, dealerHand, isSplit) {
    var game = this;
    var player = playerHand.player;
    var hand = playerHand.hand;

    function playerDoes(what) {
      game.emit("story", player.getName() + " " + what);
    }

    var playerDone = false;
    if (hand.getValue() == 21) {
      playerDoes("has blackjack!");
      playerDone = true;
    }
    while(!playerDone) {
      // TODO var validPlays = this.getValidPlaysFor(hand);
      var validPlays;
      var play = player.choosePlay(hand, dealerHand, validPlays, this);

      switch (play) {
        case "stay":
          playerDoes("stays");
          playerDone = true;
          break;
          
        case "hit":
          playerDoes("hits");
          var card = shoe.draw();
          hand.dealCard(card);
          playerDoes("draws a " + card.toString() + ". (" + (hand.isSoft() ? "soft" : "hard") + " " + hand.getValue() + ")");
          break;

        case "split":
          playerDoes("splits");
          var originalBet = hand.getBet();
          var split1 = new Hand(originalBet);
          split1.dealCard(hand.getCardAt(0));
          split1.dealCard(shoe.draw());

          var newBet = new Bet(originalBet.getAmount());
          player.changeBalance(newBet.getAmount());
          var split2 = new Hand(newBet);
          split2.dealCard(hand.getCardAt(1));
          split2.dealCard(shoe.draw());

          // Break out with the two new hands.  The caller must account for
          // them and ensure they get played out.
          return [split1, split2];
          break;

        case "double":
          playerDoes("doubles down");
          hand.getBet().double();
          var card = shoe.draw();
          hand.dealCard(card);
          playerDoes("draws a " + card.toString() + ". (" + (hand.isSoft() ? "soft" : "hard") + " " + hand.getValue() + ")");
          playerDone = true;
          break;

        case "surrender":
          playerDoes("surrenders");
          hand.getBet().surrender();
          playerDone = true;
      }

      if (hand.getValue() == 21) {
        playerDoes("stops with 21");
        playerDone = true;
      } else if (hand.getValue() > 21) {
        playerDoes("busts");
        playerDone = true;
      }
    }
  }

  // I forget how to do emit right now.
  this.emit = function(topic, message) {
    console.log(message);
  }

  this.resolveWinnings = function(playerHands, dealerHand) {
    var game = this;
    var dealerHandValue = dealerHand.getValue();
    playerHands.forEach(function(playerHand) {
      var playerHandValue = playerHand.hand.getValue();
      var bet = playerHand.bet;
      var player = playerHand.player;

      var winRatio = 2; // That is, 1 + 1 = 2;  
      // If a player has blackjack, they're eligible to win more.
      if (playerHand.hand.isBlackJack()) {
        winRatio = 3; // That is, 1 + 2 = 3.
      }

      // If the player has busted or surrendered, all is lost.
      if (playerHandValue > 21 || bet.isSurrendered()) {
        game.emit("story", player.getName() + " loses.");
      }
      // If Dealer busted, all unbusted hands win
      else if (dealerHandValue > 21 && playerHandValue <= 21) {
        game.emit("story", player.getName() + " wins.");
        bet.setWinnings(bet.getAmount() * winRatio);
      }
      // If dealer didn't bust, player must beat dealer score.
      else if ( playerHandValue > dealerHandValue ) {
        game.emit("story", player.getName() + " wins.");
        bet.setWinnings(bet.getAmount() * winRatio);
      }
      else if ( playerHandValue == dealerHandValue ) {
        game.emit("story", player.getName() + " pushes.");
        bet.setWinnings(bet.getAmount());
      }
      else {
        game.emit("story", player.getName() + " loses.");
      }

      playerHand.player.collectWinnings(bet);
    });
  }

  function initHouseRules() {
    if (!houseRules.decks) {
      houseRules.decks = 2;
    }
  }
}

module.exports = BlackJackGame;
