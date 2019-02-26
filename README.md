# Phaser3Boilerplate

Phaser 3.x Boilerplate project for rapid development.

Documentation for Phaser: https://photonstorm.github.io/phaser3-docs/index.html

## Requirements
-   A modern browser.
-   Node.js and NPM
-   (preferably git)

## How to use

1. Clone the repository
2. Copy into a new folder/repository
3. Update Package.json and index.html with author/title/etc.
4. npm install
5. npm start

### Concerning object composing
This project uses a classless, object composing focused architecture, which may be unfamiliar to you. There are several reasons to do this, but the main reason is how adaptive this way of programming is. The basic idea behind it is to compose in the various functionality you want to use in your resulting object. You may in some cases, even think of these objects as pseudo classes. An example from this boilerplate project is the (simplified!) player object. It consists of a few different states, that make up all the functionality the player has. 
```javascript
const Player = function PlayerFunc() {
    // This is the base state, which in some cases will be an 'inherited' value, i.e Phaser.Scene
    const state = {};

    function printInfo() {
        console.log(`name: %c${state.name}`, 'color: red');
    }
    
    // The internal or local state of the object. This is where all exposed variables, properties and methods are described.
    const localState = {
        // props
        name: 'Player name',
        // methods
        printInfo,
    };

    const isGameEntityState = isGameEntity(state);
    const hasPositionState = hasPosition(state);

    // These are the substates, or components, that describe the functionality of the resulting object.
    const states = [
        { state, name: 'state' },
        { state: localState, name: 'localState' },
        { state: isGameEntityState, name: 'isGameEntity' },
        { state: hasPositionState, name: 'hasPosition' },
    ];

    // We compose these substates together through using Object.assign when Player() is called.
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
        printInfo: pipe(
            isGameEntityState.printInfo,
            localState.printInfo,
        ),
    });
};

export default Player;
```

In essence what happens here, is that when Player() is called, an Object is created that has all the functionality of the different substates/components provided. The localState object describes the internal/local state of the player. This is where any variables and functions that concern the player itself will live. The states[] array is where all substates/components that will make up the final object are described. The naming/object notation used within the array, is mainly there for debugging purposes. 

How do we then link the different components together, such that when a function is called on the Player object, all states that needs know about it gets called properly? The solution we apply is to use the Pipe() function, as can be seen above in `printInfo: pipe(...)`. It is important to note here however, that object composing does not equal function composing, which is often done by a 'reverse' pipe operation, and combined with curry, which we will not cover here. A few links on functional composing can be found in further reading below.

To better understand how pipe works, we'll take a closer look at the isGameEntity state. 
```javascript
const isGameEntity = function isGameEntityFunc(state) {
    function printInfo() {
        console.log(`id: %c${state.id}`, 'color: yellow');
    }

    return {
        id: getUUID(),
        printInfo,
    };
};
```
Here we can see that both the Player, and the isGameEntity objects have a printInfo function. We need to set this up so that when printInfo() is called on the player, we get both the ID that is present in isGameEntity, and the name that is present in the Player object printed.

As mentioned above, we do this through applying the Pipe() function. Pipe() works as expected, if one has any previous experience with any command line scripting. It takes the result of the first function, and passes on to the next one, for an N number of functions. The resulting console log when running player.printInfo() is this:


![alt text](https://i.imgur.com/vHue8rn.png "Screenshot of the console output.")

If/when the pipeline operator gets finalized and implemented in browsers, that may be used instead of the pipe function above. (See further reading below for details.). 

Now that we have gotten this far, it's time to look at what the final Player() object actually contains:
![alt text](https://i.imgur.com/VGen7Li.png "Screenshot of the player object.")

In the image above, we can see that we have an id, a name, and the setPosition and getPosition methods that come from the hasPosition state. Here we can make yet another very important observation. If we look at the hasPosition state below, it contains x, and y variables, but these do not show up here, why is this?
```javascript
const hasPosition = function hasPositionFunc(state) {
    let x = 0;
    let y = 0;

    function setPosition(pos) {
        ({ x, y } = pos);

        return { x, y };
    }

    function getPosition() {
        return { x, y };
    }

    return {
        // props
        // methods
        setPosition,
        getPosition,
    };
};
```
Through composing we've essentialy created true private variables that can only be accessed by internal substates alone. Now, the players' `x, y` position is only attainable through the getPosition call. The reason they do not show up, is that they are not exposed in the final return statement.


Further reading:
* http://gameprogrammingpatterns.com/component.html
* https://medium.com/code-monkey/object-composition-in-javascript-2f9b9077b5e6
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Pipeline_operator
* https://blakeembrey.com/articles/2014/01/compose-functions-javascript/
* https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983
* https://hackernoon.com/javascript-functional-composition-for-every-day-use-22421ef65a10

### Contributions

Pull requests with features that you believe should be in a phaser boilerplate project is welcome. You may also create issues regarding missing boilerplate.

### Attributions

Default background Soundtrack is Full of Stars, by Philipp Weigl (http://freemusicarchive.org/music/Philipp_Weigl/Sound-trax/Philipp_Weigl_-_Full_of_Stars)
Used under creative commons license CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/, https://creativecommons.org/licenses/by/4.0/legalcode)
