import getFunctionUsage from './getFunctionUsage';
import pipe from './pipe';

const createState = function createStateFunc(className = 'MyClass', mainState = {}, states = {}, overrides = {}) {
    const stateList = [];
    const pipes = {};

    // Loop over all states (components).
    Object.keys(states).forEach((stateKey) => {
        const state = states[stateKey];
        stateList.push({
            state,
            name: stateKey,
        });

        // Loop over all properties on the state object. If functions, store them away for now.
        Object.keys(state).forEach((propKey) => {
            if (typeof state[propKey] === 'function') {
                if (!pipes[propKey]) {
                    pipes[propKey] = [];
                }
                pipes[propKey].push(state[propKey]);
            }
        });
    });

    // Loop over all functions stored in pipes, check for multiple usages of the same name.
    // Automatically set up a pipe() structure for these.
    Object.keys(pipes).forEach((propKey) => {
        if (pipes[propKey].length > 1) {
            pipes[propKey] = pipe(...pipes[propKey]);
        } else {
            delete pipes[propKey];
        }
    });

    getFunctionUsage(stateList, className);

    // Creates a piped init/constructor that runs each __constructor() function in the different states.
    // This allows a created class/state to have a constructor that is ran at create time.
    const init = pipe(...stateList.map(s => s.state.__constructor).filter(c => c));

    Object.assign(mainState, ...stateList.map(s => s.state), pipes, overrides);

    // Cleans up any constructor still on the mainstate.
    if (mainState.__constructor) {
        delete mainState.__constructor;
    }

    // actually calls the piped init constructor from above.
    init();

    return mainState;
};

export default createState;
