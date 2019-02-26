import store from 'root/store';
import Phaser from 'phaser';
import createListener from 'core/createListener';

const canEmit = function canEmitFunc(state) {
    const localEmitter = new Phaser.Events.EventEmitter();
    const listeners = [];

    function emitGlobal(event, data) {
        store.messageBus.emit(event, data);
    }

    function emit(event, data) {
        localEmitter.emit(event, data);
    }

    function on(event, fn, context) {
        localEmitter.on(event, fn, context);
        const listener = createListener(event, fn, false, state);
        listeners.push(listener);
        return listener;
    }

    function once(event, fn, context) {
        localEmitter.once(event, fn, context);
        const listener = createListener(event, fn, true, state);
        listeners.push(listener);
        return listener;
    }

    function off(listener) {
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
