import canEmit from 'components/events/canEmit';
import createState from 'utils/createState';

const createMessageBus = function createMessageBusFunc() {
    const state = {};

    const localState = {
        // props
        // methods
    };

    return createState('MessageBus', state, {
        localState,
        canEmit: canEmit(state),
    });
};

export default createMessageBus;
