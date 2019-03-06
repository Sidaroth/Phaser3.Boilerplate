import getFunctionUsage from './getFunctionUsage';
import pipe from './pipe';

const createState = function createStateFunc(className = 'MyClass', mainState = {}, states = {}, overrides = {}) {
    const stateList = [];
    const pipes = {};
    Object.keys(states).forEach((stateKey) => {
        const state = states[stateKey];
        stateList.push({
            state,
            name: stateKey,
        });

        Object.keys(state).forEach((propKey) => {
            if (typeof state[propKey] === 'function') {
                if (!pipes[propKey]) {
                    pipes[propKey] = [];
                }
                pipes[propKey].push(state[propKey]);
            }
        });
    });

    Object.keys(pipes).forEach((propKey) => {
        if (pipes[propKey].length > 1) {
            pipes[propKey] = pipe(...pipes[propKey]);
        } else {
            delete pipes[propKey];
        }
    });

    getFunctionUsage(stateList, className);
    const init = pipe(...stateList.map(s => s.state.__constructor).filter(c => c));

    Object.assign(mainState, ...stateList.map(s => s.state), pipes, overrides);

    if (mainState.__constructor) {
        delete mainState.__constructor;
    }

    init();

    return mainState;
};

export default createState;
