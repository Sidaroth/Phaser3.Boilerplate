import canEmit, { EmitState } from 'components/events/canEmit';
import { EVENTS } from 'configs/eventConfig';
import createState from 'utils/createState';

export interface KeyboardInput extends EmitState {
    disable: () => void;
    enable: () => void;
}

function createKeyboardInput(): KeyboardInput {
    const state = {} as KeyboardInput;

    function keyDownFn(e: KeyboardEvent) {
        state.emit(EVENTS.KEYBOARD.KEYDOWN, { key: e.key, repeat: e.repeat, keyCode: e.keyCode });
    }

    function keyUpFn(e: KeyboardEvent) {
        state.emit(EVENTS.KEYBOARD.KEYUP, { key: e.key, repeat: e.repeat, keyCode: e.keyCode });
    }

    function enable() {
        document.addEventListener(EVENTS.KEYBOARD.KEYDOWN, keyDownFn);
        document.addEventListener(EVENTS.KEYBOARD.KEYUP, keyUpFn);
    }

    function disable() {
        document.removeEventListener(EVENTS.KEYBOARD.KEYDOWN, keyDownFn);
        document.removeEventListener(EVENTS.KEYBOARD.KEYUP, keyUpFn);
    }

    const localState = {
        // props
        // methods
        disable,
        enable,
    };

    return createState<KeyboardInput>('KeyboardState', state, {
        localState,
        canEmit: canEmit(state),
    });
}

export default createKeyboardInput;
