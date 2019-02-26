import canEmit from 'components/events/canEmit';
import getFunctionUsage from 'utils/getFunctionUsage';

const getMessageBus = function getMessageBusFunc() {
    const state = {};

    const canEmitState = canEmit();

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

const messageBusObj = getMessageBus();
export default messageBusObj;
