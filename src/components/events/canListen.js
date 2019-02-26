import store from 'root/store';

const canListen = function canListenFunc(state) {
    const listeners = [];

    function listenOn(emitState, event, fn, context) {
        listeners.push(emitState.on(event, fn, context));
    }

    function listenOnce(emitState, event, fn, context) {
        listeners.push(emitState.once(event, fn, context));
    }

    function listenGlobal(event, fn, context) {
        listeners.push(store.messageBus.on(event, fn, context));
    }

    function listenOnceGlobal(event, fn, context) {
        listeners.push(store.messageBus.once(event, fn, context));
    }

    function destroy() {
        listeners.forEach((l) => {
            l.drop();
        });
    }

    return {
        // props
        // methods
        listenOn,
        listenOnce,
        listenGlobal,
        listenOnceGlobal,
        destroy,
    };
};

export default canListen;
