import { EmitState } from 'components/events/canEmit';
import { EventData } from 'configs/eventConfig';
import { v4 as uuidv4 } from 'uuid';

export interface Listener<T extends keyof EventData> {
    id: any;
    dropped: boolean;
    once: boolean;
    event: string;
    fn: (event: EventData[T]) => void;
    drop: () => void;
}

function createListener<T extends keyof EventData>(event: T, fn: (event: EventData[T]) => void, once: boolean, emitState: EmitState): Listener<T> {
    const state = {} as Listener<T>;

    function drop() {
        if (state.dropped) return;
        emitState.off(state);
        state.dropped = true;
    }

    return Object.assign(state, {
        // props
        id: uuidv4(),
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
}

export default createListener;
