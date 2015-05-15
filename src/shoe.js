/**
 * A jackjack shoe,  a 1-8 deck stack of cards.  
 */

var Card = require('./card.js');

function Shoe(size) {
  var stack = [];
  var cursor = 0;
  
  for (var i = 0; i < size; i++) {
    Card.suits.forEach(function(suit) {
      Card.ranks.forEach(function(rank) {
        var card = new Card(rank, suit);
        stack.splice(Math.floor((stack.length + 1) * Math.random()),0,card);
      });
    });
  }

  // Get the next card from the shoe.
  this.draw = function() {
    if (cursor >= stack.length) {
      throw("The deck has been exhausted");
    }
    var topCard = stack[cursor];
    cursor += 1;
    return topCard;
  };

  this.cardsLeft = function() {
    return stack.length - cursor;
  }

  // Shuffles the deck.  All cards are assumed to be gathered back.
  this.shuffle = function() {
    cursor = 0;
    var newstack = [];
    stack.forEach(function(card) {
      newstack.splice(Math.floor((stack.length + 1) * Math.random()),0,card);
    });
    stack = newstack;
  };
  
  // Return a copy of the remaining stack
  this.getRemainingCards = function() {
    return stack.slice(cursor, stack.length);
  };
}

module.exports = Shoe;
