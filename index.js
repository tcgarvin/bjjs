module.exports = {
  card: require('./src/card.js'),
  player: require('./src/player.js'),
  blackjack: require('./src/blackjack.js'),
  strategy: {
    basic: require('./src/strategy/BasicStrategy.js'),
    dealer: require('./src/strategy/BasicStrategy.js')
  }
};
