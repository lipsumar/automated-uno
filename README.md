# Automated UNO

> Play UNO (the card game) via automated bots in your browser

![Screenshot](https://raw.githubusercontent.com/lipsumar/automated-uno/master/resources/screenshot.png)

[Live demo](https://lipsumar.github.io/automated-uno/)

* The **Step** button (`❙▶`) will make the current player play his card, this is a step by step mode for debugging.
* The **Play** button will launch the game for an infinite amount of hands. It only stops if you click pause or close the tab.
* **Restart** button restarts the current hand.

At the bottom, the graph shows the evolution of the scores. The white line is player 1, the grey are the other players.

## What is this ?

A game of UNO, played by bots. 

4 players at the table. By default they all play cards at random.

Click a player to see the code used to select a card (javascript). Here is an example of a simple strategy:

```js
// group card by color, count them and order in descending order
var manyColor = _.chain(playable).groupBy('color').map(function(group){
    return {length: group.length, cards: group, color: group[0].color};
}).sortBy('length').reverse().value();

// do we have too many of a color ?
if(manyColor[0].length > 2){
  // yes we do, let's choose the best out of this color
  return _.chain(manyColor[0].cards).sortBy('points').last().value();
}

// default is to choose the point with highest points
return _.chain(playable).sortBy('points').last().value();
```

You must return a `Card`, that's all you need to do.

Available variables:
* `_`: [Underscore.js](http://underscorejs.org/)
* `playable`: an array of `Card` in your hand that are possible to play at the curren turn
* `gameCard`: the `Card` on the table at the current turn
* `others`: an array giving information about the other players

You can use `console.log` to debug your function, it will show up in your browser console.


## Why did you do that ?

That's the kind of things I do...
