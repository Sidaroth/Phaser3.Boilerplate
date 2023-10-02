import store from 'root/store';
import Phaser from 'phaser';
import createListener, { Listener } from 'core/createListener';
import { EventData } from 'configs/eventConfig';

export interface Emit {
    emitGlobal: <T extends keyof EventData>(event: T, data: EventData[T]) => void;
    emit: <T extends keyof EventData>(event: T, data: EventData[T]) => void;
    on: <T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: Emit) => Listener<T>;
    once: <T extends keyof EventData>(event: string, fn: (e: T) => void, context: Emit) => Listener<T>;
    off: <T extends keyof EventData>(listener: Listener<T>) => void;
    removeAllListeners: () => void;
    destroy: () => void;
}

function canEmit(state: Emit) {
    const localEmitter = new Phaser.Events.EventEmitter();
    const listeners: Array<Listener<any>> = [];

    function emitGlobal<T extends keyof EventData>(event: T, data: EventData[T]) {
        store.messageBus.emit(event, data);
    }

    function emit<T extends keyof EventData>(event: T, data: EventData[T]) {
        localEmitter.emit(event, data);
    }

    function on<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: Emit): Listener<T> {
        localEmitter.on(event, fn, context);
        const listener = createListener(event, fn, false, state);
        listeners.push(listener);
        return listener;
    }

    function once<T extends keyof EventData>(event: T, fn: (e: EventData[T]) => void, context: Emit): Listener<T> {
        localEmitter.once(event, fn, context);
        const listener = createListener(event, fn, true, state);
        listeners.push(listener);
        return listener;
    }

    function off<T extends keyof EventData>(listener: Listener<T>) {
        if (listeners.indexOf(listener) >= 0) {
            localEmitter.off(listener.event, listener.fn, listener.once);
            listeners.splice(listeners.indexOf(listener), 1);
        }
    }

    function removeAllListeners() {
        if (localEmitter) {
            listeners.forEach((l) => {
                l.drop();
            });
        }
    }

    function destroy() {
        if (localEmitter) {
            state.removeAllListeners();
            localEmitter.destroy();
        }
    }

    return {
        // props
        // methods
        emitGlobal,
        emit,
        on,
        once,
        off,
        removeAllListeners,
        destroy,
    };
};

export default canEmit;
