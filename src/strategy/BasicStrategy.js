/**
 * This is the strategy a dealer follows.  It's very simple.
 */

// With thanks to http://wizardofodds.com/games/blackjack/strategy/calculator/
var basicHard = {
    //     2     3     4     5     6     7     8     9     T     A

    4:  [ "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H"],   // Hard  4
    5:  [ "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H"],   // Hard  5
    6:  [ "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H"],   // Hard  6
    7:  [ "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H"],   // Hard  7
    8:  [ "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H"],   // Hard  8
    9:  [ "H", "DH", "DH", "DH", "DH",  "H",  "H",  "H",  "H",  "H"],   // Hard  9
    10: ["DH", "DH", "DH", "DH", "DH", "DH", "DH", "DH",  "H",  "H"],   // Hard 10
    11: ["DH", "DH", "DH", "DH", "DH", "DH", "DH", "DH", "DH",  "H"],   // Hard 11
    12: [ "H",  "H",  "S",  "S",  "S",  "H",  "H",  "H",  "H",  "H"],   // Hard 12
    13: [ "S",  "S",  "S",  "S",  "S",  "H",  "H",  "H",  "H",  "H"],   // Hard 13
    14: [ "S",  "S",  "S",  "S",  "S",  "H",  "H",  "H",  "H",  "H"],   // Hard 14
    15: [ "S",  "S",  "S",  "S",  "S",  "H",  "H",  "H", "RH",  "H"],   // Hard 15
    16: [ "S",  "S",  "S",  "S",  "S",  "H",  "H", "RH", "RH", "RH"],   // Hard 16
    17: [ "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S"],   // Hard 17
    18: [ "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S"],   // Hard 18
    19: [ "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S"],   // Hard 19
    20: [ "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S"],   // Hard 20
    21: [ "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S"]    // Hard 21
};

var basicSoft = {
    12: [ "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H",  "H"],   // Soft 12
    13: [ "H",  "H",  "H", "DH", "DH",  "H",  "H",  "H",  "H",  "H"],   // Soft 13
    14: [ "H",  "H",  "H", "DH", "DH",  "H",  "H",  "H",  "H",  "H"],   // Soft 14
    15: [ "H",  "H", "DH", "DH", "DH",  "H",  "H",  "H",  "H",  "H"],   // Soft 15
    16: [ "H",  "H", "DH", "DH", "DH",  "H",  "H",  "H",  "H",  "H"],   // Soft 16
    17: [ "H", "DH", "DH", "DH", "DH",  "H",  "H",  "H",  "H",  "H"],   // Soft 17
    18: [ "S", "DS", "DS", "DS", "DS",  "S",  "S",  "H",  "H",  "H"],   // Soft 18
    19: [ "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S"],   // Soft 19
    20: [ "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S"],   // Soft 20
    21: [ "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S"]    // Soft 21
};

var basicSplit = {
    2:  ["QH", "QH",  "P",  "P",  "P",  "P",  "H",  "H",  "H",  "H"],   // 2,2
    3:  ["QH", "QH",  "P",  "P",  "P",  "P",  "H",  "H",  "H",  "H"],   // 3,3
    4:  [ "H",  "H",  "H", "QH", "QH",  "H",  "H",  "H",  "H",  "H"],   // 4,4
    5:  ["DH", "DH", "DH", "DH", "DH", "DH", "DH", "DH",  "H",  "H"],   // 5,5
    6:  ["QH",  "P",  "P",  "P",  "P",  "H",  "H",  "H",  "H",  "H"],   // 6,6
    7:  [ "P",  "P",  "P",  "P",  "P",  "P",  "H",  "H",  "H",  "H"],   // 7,7
    8:  [ "P",  "P",  "P",  "P",  "P",  "P",  "P",  "P",  "P",  "P"],   // 8,8
    9:  [ "P",  "P",  "P",  "P",  "P",  "S",  "P",  "P",  "S",  "S"],   // 9,9
    10: [ "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S",  "S"],   // T,T
    11: [ "P",  "P",  "P",  "P",  "P",  "P",  "P",  "P",  "P",  "P"]    // A,A
};

var dealerRankToIndex = {
  "2": 0,
  "3": 1,
  "4": 2,
  "5": 3,
  "6": 4,
  "7": 5,
  "8": 6,
  "9": 7,
  "10": 8,
  "J": 8,
  "Q": 8,
  "K": 8,
  "A": 9,
};

solutionCodeToAction = {
  "S": "stay",
  "H": "hit",
  "P": "split",
  "D": "double",
  "R": "surrender",
  "Q": "invalid"
};

function BasicStrategy() {
  this.chooseBet = function() {
    return 10;
  }

  // Returns a string if we find a valid play, otherwise false;
  this.solutionToPlay = function(solution, allowedPlays) {
    var play;
    for(var i = 0; i < solution.length && !play; i++) {
      var code = solution.charAt(i);
      var candidate = solutionCodeToAction[code];
      if (allowedPlays.indexOf(candidate) >= 0) {
        play = candidate;
      }
    }
    
    if (!play) {
      play = false;
    }

    return play;
  }

  this.choosePlay = function(hand, dealerCard, allowedPlays, player, game) {
    var dealerRank = dealerCard.getRank();
    var dealerLookupIndex = dealerRankToIndex[dealerRank];

    var finalAnswer;

    // First check split.
    var firstCard = hand.getCardAt(0);
    if (firstCard.getRank() == hand.getCardAt(1).getRank()) {
      var solutionRow = basicSplit[firstCard.getValue()];
      finalAnswer = this.solutionToPlay(solutionRow[dealerLookupIndex], allowedPlays);
    }

    // If we don't have anything yet, try the regular tables.
    if (!finalAnswer) {
      var solutionRow;
      if (hand.isSoft()) {
        solutionRow = basicSoft[hand.getValue()];
      }
      else if (!finalAnswer) {
        solutionRow = basicHard[hand.getValue()];
      }
      finalAnswer = this.solutionToPlay(solutionRow[dealerLookupIndex], allowedPlays);
    }

    // If we don't have something by now, something is wrong.
    if (!finalAnswer) {
      throw "My basic strategy is failing me!";
    }

    return finalAnswer;
  }
}

module.exports = BasicStrategy;
