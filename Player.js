
function Player(id){
    this.id = id;
    this.deck = [];
}
Player.prototype.addCard = function(card) {
    this.deck.push(card);
};
Player.prototype.play = function(game) {

    // make sure we have a playable card
    while(!this.canPlayCard(game.card)){
console.log(this.getPlayableCards(game.card));
        if(game.deck.length===0){
            throw new Error('Unexpected end of game!');
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
    return playable[Math.round(Math.random()*(playable.length-1))];
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
Player.prototype.toString = function() {
    return '[Player#'+this.id+': '+this.deck.join(',')+']';
};



module.exports = Player;
