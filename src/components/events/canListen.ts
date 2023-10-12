import store from 'root/store';
import { EmitComponent } from './canEmit';
import { EventData } from 'configs/eventConfig';
import { Listener } from 'core/createListener';
import { LifeCycle } from 'components/isScene';

export interface ListenComponent extends LifeCycle {
    dropListener(listener: Listener<any>): void;
    listenOn<T extends keyof EventData>(emitState: EmitComponent, event: T, fn: (e: EventData[T]) => void, context: EmitComponent): Listener<T> | undefined;
    listenOnce<T extends keyof EventData>(emitState: EmitComponent, event: T, fn: (e: EventData[T]) => void, context: EmitComponent): Listener<T> | undefined;
    listenGlobal<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: EmitComponent): Listener<T> | undefined;
    listenOnceGlobal<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: EmitComponent): Listener<T> | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const canListen = function canListenFunc(state: ListenComponent): ListenComponent {
    const listeners: Array<Listener<any>> = [];

    function listenOn<T extends keyof EventData>(emitState: EmitComponent, event: T, fn: (e: EventData[T]) => void, context: EmitComponent): Listener<T> {
        const listener = emitState.on(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function listenOnce<T extends keyof EventData>(emitState: EmitComponent, event: T, fn: (e: EventData[T]) => void, context: EmitComponent): Listener<T> {
        const listener = emitState.once(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function listenGlobal<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: EmitComponent): Listener<T> | undefined{
        const listener = store.messageBus?.on(event, fn, context);
        if(listener) {
            listeners.push(listener);
        }
        return listener;
    }

    function listenOnceGlobal<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: EmitComponent): Listener<T> | undefined {
        const listener = store.messageBus?.once(event, fn, context);
        if(listener) {
            listeners.push(listener);
        }
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

    const returnState: ListenComponent = {
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
