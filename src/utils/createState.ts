import getFunctionUsage from './getFunctionUsage';
import pipe from './pipe';

export interface State {
    state: any;
    name: string;
}

function createState<T>(className = 'MyClass', mainState: T &  { __constructor?: unknown}, states: { [key: string]: any } = {}, overrides = {}): T {
    const stateList: Array<State> = [];
    const pipes: { [key: string]: Array<(a: unknown) => unknown> } = {};
    const finishedPipes: { [key: string]: (a: unknown) => unknown } = {};

    // Loop over all states (components).
    Object.keys(states).forEach((stateKey) => {
        const state = states[stateKey];
        stateList.push({
            state,
            name: stateKey,
        });

        for(const propKey in state) {
            if (typeof state[propKey] === 'function') {
                if (!pipes[propKey]) {
                    pipes[propKey] = [];
                }
                pipes[propKey].push(state[propKey] as (a: unknown) => unknown);
            }
        }
        // Loop over all properties on the state object. If functions, store them away for now.
    });

    // Loop over all functions stored in pipes, check for multiple usages of the same name.
    // Automatically set up a pipe() structure for these.
    Object.keys(pipes).forEach((propKey) => {
        if (pipes[propKey].length > 1) {
            finishedPipes[propKey] = pipe(...pipes[propKey]);
        }
    });

    getFunctionUsage(stateList, className);

    // Creates a piped init/constructor that runs each __constructor() function in the different states.
    // This allows a created class/state to have a constructor that is ran at create time.
    const init = pipe(...stateList.map(s => (s.state.__constructor as (a: unknown) => unknown)).filter(c => c));

    Object.assign(mainState, ...stateList.map(s => s.state), finishedPipes, overrides);

    // Cleans up any constructor still on the mainstate.
    if (mainState.__constructor) {
        delete mainState.__constructor;
    }

    // actually calls the piped init constructor from above.
    init(undefined);

    return mainState as T;
}

export default createState;
