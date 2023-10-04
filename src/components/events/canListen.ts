import store from 'root/store';
import { EmitState } from './canEmit';
import { EventData } from 'configs/eventConfig';
import { Listener } from 'core/createListener';
import { LifeCycle } from 'components/isScene';

export interface ListenState extends LifeCycle {
    dropListener(listener: Listener<any>): void;
    listenOn<T extends keyof EventData>(emitState: EmitState, event: T, fn: (e: EventData[T]) => void, context: EmitState): Listener<T>;
    listenOnce<T extends keyof EventData>(emitState: EmitState, event: T, fn: (e: EventData[T]) => void, context: EmitState): Listener<T>;
    listenGlobal<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: EmitState): Listener<T>;
    listenOnceGlobal<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: EmitState): Listener<T>;
}

const canListen = function canListenFunc(state: ListenState): ListenState {
    const listeners: Array<Listener<any>> = [];

    function listenOn<T extends keyof EventData>(emitState: EmitState, event: T, fn: (e: EventData[T]) => void, context: EmitState): Listener<T> {
        const listener = emitState.on(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function listenOnce<T extends keyof EventData>(emitState: EmitState, event: T, fn: (e: EventData[T]) => void, context: EmitState): Listener<T> {
        const listener = emitState.once(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function listenGlobal<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: EmitState): Listener<T> {
        const listener = store.messageBus.on(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function listenOnceGlobal<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: EmitState): Listener<T> {
        const listener = store.messageBus.once(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function dropListener(listener: Listener<any>) {
        listeners.splice(listeners.findIndex(l => l === listener), 1);
        listener.drop();
    }

    function destroy() {
        listeners.forEach((l) => {
            l.drop();
        });
    }

    const returnState: ListenState = {
        // props
        // methods
        dropListener,
        listenOn,
        listenOnce,
        listenGlobal,
        listenOnceGlobal,
        destroy,
    };

    return returnState;
};

export default canListen;
