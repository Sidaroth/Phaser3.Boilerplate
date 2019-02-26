import canEmit from 'components/events/canEmit';
import getFunctionUsage from 'utils/getFunctionUsage';

const createMessageBus = function createMessageBusFunc() {
    const state = {};

    const canEmitState = canEmit(state);

    const localState = {
        // props
        // methods
    };

    const states = [{ state, name: 'state' }, { state: localState, name: 'localState' }, { state: canEmitState, name: 'canEmit' }];

    getFunctionUsage(states, 'MessageBus');
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
    });
};

export default createMessageBus;
