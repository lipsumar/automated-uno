var Player = require('./Player');
var Game = require('./Game');
var deck = require('./deck');

var players = [],
    playerId = 1;

var game;

var API = {
    createPlayer: function(){
        var player = new Player(playerId);
        playerId++;
        return player;
    },
    addPlayer: function(p){
        players.push(p);

    },
    start: function(){
        players.forEach(function(p){
            p.deck = [];
        });
        game = new Game({
            deck: deck,
            players: players
        });
        game.start();
    },
    play: function(){
        game.play();
    },
    getWinner: function(){
        return game.winner;
    },
    getCard: function(){
        return game.card;
    },
    getPlayers: function(){
        return players;
    },
    getCurrentPlayer: function(){
        return game.getCurrentPlayer();
    }
};
module.exports = API;
