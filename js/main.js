var uno = require('./uno.js');
var scoreGraph = require('./score-graph');
var history = [];
var totalRounds = 0;
var totalTurns = 0;
var codeHeader = 'var _ = this._;\nvar playable = this.getPlayableCards(gameCard);\n';
var defaultCode = 'return _.chain(playable).sample().value();';

// tiny dom lib
function $(n){var t=document.querySelector(n);return t&&(t.on=function(n,c){return t.addEventListener.call(t,n,function(n){c.call(t,n)})}),t}function $$(n){function t(n){[].forEach.call(this,n)}var c=n;return n&&"string"==typeof n&&(c=document.querySelectorAll(n)),{each:function(n,e){if(c instanceof NodeList)t.call(c,function(t){n.call(e||t)});else for(var l in c)c.hasOwnProperty(l)&&n.call(e||c[l],c[l],l,c)},on:function(n,e){t.call(c,function(t){t.addEventListener.call(t,n,e.bind(t))})}}}




function openPlayerOptions(player){
    $('.player-options').classList.add('player-options--show');
    $('.player-options .js-code').value = player.code;
}
function closePlayerOptions(){
    $('.player-options').classList.remove('player-options--show');
}


function updateGame(uno){

    function updatePlayer(player){

        player.el.innerHTML = player.deck.reduce(function(html, card){
            html+=card.toHtml('card--small');
            return html;
        }, '');

    }

    uno.getPlayers().forEach(updatePlayer);

    var currentPlayer = uno.getCurrentPlayer();
    $$('.player').each(function(){
        this.classList.remove('current');
    });
    currentPlayer.el.classList.add('current');

    var currentCard = uno.getCard();
    $('.current-card').innerHTML = currentCard.toHtml();
    $('.current-card .card').classList.add(currentCard.currentTargetColor);

    var winner = uno.getWinner();
    if(winner){
        $$('.player').each(function(){
            this.classList.remove('winner');
        });
        winner.el.classList.add('winner');
    }
}

function updateScores(){

    scoreGraph.draw(history, 'roundsWon');

    $('.stats').innerHTML = uno.getPlayers().map(function(p){
        return '<li>'+'PLAYER '+p.id+': '+p.handsWon+' hands / '+p.roundsWon+'</li>';
    }).join('')
        + '<li>TOTAL: '+(history.length-1)+' hands / '+totalRounds+'</li>';
}

function resetScores(){

    uno.getPlayers().forEach(function(p){
        p.score = 0;
    });

}

var nextPlayTimeout;
var turnsEl = $('.turns');
function play(){
    totalTurns++;
    turnsEl.innerHTML = totalTurns;
    var winner = uno.getWinner();
    if(winner){
        updateGame(uno);

        // end of hand
        history.push({
            tstamp: new Date(),
            scores: uno.getPlayers().map(function(p){
                return {
                    id: p.id,
                    score: p.score,
                    roundsWon: p.roundsWon
                };
            })
        });

        updateScores();

        // reset scores
        if(winner.score >= 500){
            winner.roundsWon++;
            totalRounds++;
            resetScores();
        }

        // auto restart
        uno.start();


    }else{
        try{
            uno.play();
        }catch(err){
            if(err.message === 'ERR_EMPTY_GAME_DECK'){
                console.log('ERR_EMPTY_GAME_DECK');
                resetScores();
                uno.start();// start again
            }else{
                console.log('err', err);
                new Audio('resources/buzz.mp3').play();
                stop();
            }
        }

        //updateGame(uno);
    }


    if(autoPlay){
        nextPlayTimeout = setTimeout(play, 0);
    }
}
function stop(){
    if(nextPlayTimeout){
        clearTimeout(nextPlayTimeout);
    }
    autoPlay = false;
}

function setCode(player, code){
    player.code = code;
    player.pickCardToPlay = new Function('gameCard','others',codeHeader + player.code);
}

var autoPlay = false;
var player;
for(var i=0;i<4;i++){
    player = uno.createPlayer();
    player.el = $('.player-'+(i+1)+' .cards');
    player.roundsWon = 0;
    setCode(player, defaultCode);
    uno.addPlayer(player);
}

history.push({
    tstamp: new Date(),
    scores: uno.getPlayers().map(function(p){
        return {
            id: p.id,
            score: p.score,
            roundsWon: p.roundsWon
        };
    })
});

uno.start();
updateGame(uno);
updateScores();

$('.restart').on('click', function(){
    stop();
    $('.play').innerHTML = ' ▶ ';
    uno.start();
    updateGame(uno);
});
$('.step').on('click', function(){
    play();
    updateGame(uno);
});

$('.play').on('click', function(){
    autoPlay = !autoPlay;
    this.innerHTML = autoPlay ? ' ❙❙ ' : ' ▶ ';
    if(autoPlay){
        play();
    }

});

var playerEdit;
$$('.player').on('click', function(){
    var playerId = parseInt(this.getAttribute('data-player-id'), 10);
    var player = uno.getPlayer(playerId);
    playerEdit = player;
    openPlayerOptions(player);
});
$('.player-options .close').on('click', function(){
    closePlayerOptions();
});

$('.player-options .js-code-submit').on('click', function(){
    var code = $('.player-options textarea').value;
    setCode(playerEdit, code);
});
