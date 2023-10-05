import canEmit, { EmitState } from 'components/events/canEmit';
import createState from 'utils/createState';

export interface MessageBus extends EmitState {
}

function createMessageBus(): MessageBus {
    const state = {} as MessageBus;

    const localState = {
        // props
        // methods
    };

    return createState('MessageBus', state, {
        localState,
        canEmit: canEmit(state),
    });
}

export default createMessageBus;
