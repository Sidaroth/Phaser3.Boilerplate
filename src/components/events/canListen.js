import store from 'root/store';

const canListen = function canListenFunc(state) {
    const listeners = [];

    function listenOn(emitState, event, fn, context) {
        const listener = emitState.on(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function listenOnce(emitState, event, fn, context) {
        const listener = emitState.once(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function listenGlobal(event, fn, context) {
        const listener = store.messageBus.on(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function listenOnceGlobal(event, fn, context) {
        const listener = store.messageBus.once(event, fn, context);
        listeners.push(listener);
        return listener;
    }

    function dropListener(listener) {
        listeners.splice(listeners.findIndex(l => l === listener), 1);
        listener.drop();
    }

    function destroy() {
        listeners.forEach((l) => {
            l.drop();
        });
    }

    return {
        // props
        // methods
        dropListener,
        listenOn,
        listenOnce,
        listenGlobal,
        listenOnceGlobal,
        destroy,
    };
};

export default canListen;
