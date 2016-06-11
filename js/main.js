var uno = require('./uno.js');

// tiny dom lib
function $(n){var t=document.querySelector(n);return t&&(t.on=function(n,c){return t.addEventListener.call(t,n,function(n){c.call(t,n)})}),t}function $$(n){function t(n){[].forEach.call(this,n)}var c=n;return n&&"string"==typeof n&&(c=document.querySelectorAll(n)),{each:function(n,e){if(c instanceof NodeList)t.call(c,function(t){n.call(e||t)});else for(var l in c)c.hasOwnProperty(l)&&n.call(e||c[l],c[l],l,c)},on:function(n,e){t.call(c,function(t){t.addEventListener.call(t,n,e.bind(t))})}}}


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
        winner.el.classList.add('winner');
        stop();
    }
}

var nextPlayTimeout;
function play(){
    uno.play();
    updateGame(uno);
    if(autoPlay){
        nextPlayTimeout = setTimeout(play, 700);
    }
}
function stop(){
    if(nextPlayTimeout){
        clearTimeout(nextPlayTimeout);
    }
    autoPlay = false;
}

var autoPlay = false;
var player;
for(var i=0;i<4;i++){
    player = uno.createPlayer();
    player.el = $('.player-'+(i+1));
    uno.addPlayer(player);
}

uno.start();
updateGame(uno);

$('.restart').on('click', function(){
    stop();
    $('.play').innerHTML = ' ▶ ';
    uno.start();
    updateGame(uno);
});
$('.step').on('click', function(){
    play();
});

$('.play').on('click', function(){
    autoPlay = !autoPlay;
    this.innerHTML = autoPlay ? ' ❙❙ ' : ' ▶ ';
    if(autoPlay){
        play();
    }

});
