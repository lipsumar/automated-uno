var _ = require('underscore');

function Player(id){
    this.id = id;
    this.score = 0;
    this.handsWon = 0;
    this.deck = [];
}
Player.prototype.addCard = function(card) {
    this.deck.push(card);
};
Player.prototype.play = function(game) {

    // make sure we have a playable card
    while(!this.canPlayCard(game.card)){
        if(game.deck.length===0){
            throw new Error('ERR_EMPTY_GAME_DECK');
        }
        this.deck.push(game.deck.shift());
    }

    // pick a playable card
    var card = this.pickCardToPlay(game.card);

    // remove it from deck
    this.deck.splice(this.deck.indexOf(card),1);

    if(card.color === 'black'){
        card.currentTargetColor = this.pickColor();
    }

    return card;
};
Player.prototype.pickColor = function() {
    return ['red', 'green', 'blue', 'yellow'][Math.round(Math.random()*3)];
};
Player.prototype.pickCardToPlay = function(gameCard) {
    var playable = this.getPlayableCards(gameCard);
    if(this.id === 1){

        // too many of a playbale some color ?
        var manyColor = _.chain(playable).groupBy('color').map(function(group){
            return {length: group.length, cards: group, color: group[0].color};
        }).sortBy('length').reverse().value();

        if(manyColor[0].length > 2){
            console.log('get rid of '+manyColor[0].color+' ('+manyColor[0].length+')');
            return _.chain(manyColor[0].cards).sortBy('points').reverse().value()[0];
        }

        return _.chain(playable).sortBy('points').value()[0];

    }else{
        return _.chain(playable).sample().value();
    }

};
Player.prototype.canPlayCard = function(gameCard) {
    return this.getPlayableCards(gameCard).length > 0;
};
Player.prototype.getPlayableCards = function(gameCard) {
    //console.log('this.deck',this.deck);
    return this.deck.filter(function(card){
        var targetColor = gameCard.currentTargetColor || gameCard.color;

        if(gameCard.color === 'black' && card.color === 'black'){
            return false;
        }
        if(card.color === targetColor || card.color==='black' || card.value === gameCard.value){
            return true;
        }
        return false;
    });
};

Player.prototype.getPoints = function() {
    return this.deck.reduce(function(points, card){
        points += card.points;
        return points;
    }, 0);
};

Player.prototype.addScore = function(add) {
    this.score+=add;
};

Player.prototype.toString = function() {
    return '[Player#'+this.id+': '+this.deck.join(',')+']';
};



module.exports = Player;
