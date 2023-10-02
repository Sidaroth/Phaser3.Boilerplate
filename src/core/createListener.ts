import { Emit } from 'components/events/canEmit';
import { EVENTS, EventData } from 'configs/eventConfig';
import getUUID from 'utils/getUUID';

export interface Listener<T extends keyof EventData> {
    id: any;
    dropped: boolean;
    once: boolean;
    event: string;
    fn: (event: EventData[T]) => void;
    drop: () => void;
}

function createListener<T extends keyof EventData>(event: T, fn: (event: EventData[T]) => void, once: boolean, emitState: Emit): Listener<T> {
    const state = {} as Listener<T>;

    function drop() {
        if (state.dropped) return;
        emitState.off(state);
        state.dropped = true;
    }

    return Object.assign(state, {
        // props
        id: getUUID(),
        dropped: false,
        once,
        event,
        fn: !once ? fn : (evt: EventData[T]) => {
            fn(evt);
            state.drop();
        },
        // methods
        drop,
    });
};

export default createListener;
