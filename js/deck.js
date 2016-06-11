var Card = require('./Card');

var colorAbbrToFull = {Y:'yellow', G:'green', B:'blue', R:'red'};
var deck = [
    '0-Y', '0-G', '0-B', '0-R',

    '1-Y', '1-G', '1-B', '1-R',
    '1-Y', '1-G', '1-B', '1-R',

    '2-Y', '2-G', '2-B', '2-R',
    '2-Y', '2-G', '2-B', '2-R',

    '3-Y', '3-G', '3-B', '3-R',
    '3-Y', '3-G', '3-B', '3-R',

    '4-Y', '4-G', '4-B', '4-R',
    '4-Y', '4-G', '4-B', '4-R',

    '5-Y', '5-G', '5-B', '5-R',
    '5-Y', '5-G', '5-B', '5-R',

    '6-Y', '6-G', '6-B', '6-R',
    '6-Y', '6-G', '6-B', '6-R',

    '7-Y', '7-G', '7-B', '7-R',
    '7-Y', '7-G', '7-B', '7-R',

    '8-Y', '8-G', '8-B', '8-R',
    '8-Y', '8-G', '8-B', '8-R',

    '9-Y', '9-G', '9-B', '9-R',
    '9-Y', '9-G', '9-B', '9-R',

    'STOP-Y', 'STOP-G', 'STOP-B', 'STOP-R',
    'STOP-Y', 'STOP-G', 'STOP-B', 'STOP-R',

    'REVERSE-Y', 'REVERSE-G', 'REVERSE-B', 'REVERSE-R',
    'REVERSE-Y', 'REVERSE-G', 'REVERSE-B', 'REVERSE-R',

    '+2-Y', '+2-G', '+2-B', '+2-R',
    '+2-Y', '+2-G', '+2-B', '+2-R',

    'COLOR', 'COLOR', 'COLOR', 'COLOR', // wild
    '+4', '+4', '+4', '+4'              // wild +4
].map(function(c){
    var parts = c.split('-');

    var valueInt = parseInt(parts[0], 10);

    return new Card({
        value: parts[0],
        color: parts[1] ? colorAbbrToFull[parts[1]] : 'black',
        addsCards: parts[0][0] === '+' ? parts[0][1] : null,
        points: isNaN(valueInt) ? (parts.length === 1 ? 50 : 20) : valueInt
    });
});
module.exports = deck;
