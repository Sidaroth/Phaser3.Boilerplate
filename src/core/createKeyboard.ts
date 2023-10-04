import canEmit, { EmitState } from 'components/events/canEmit';
import createState from 'utils/createState';

export interface KeyboardInput extends EmitState {
    disable: () => void;
    enable: () => void;
}

function createKeyboardInput(): KeyboardInput {
    const state = {} as KeyboardInput;

    function keyDownFn(e: KeyboardEvent) {
        state.emit('keydown', { key: e.key, repeat: e.repeat, keyCode: e.keyCode });
    }

    function keyUpFn(e: KeyboardEvent) {
        state.emit('keyup', { key: e.key, repeat: e.repeat, keyCode: e.keyCode });
    }

    function enable() {
        document.addEventListener('keydown', keyDownFn);
        document.addEventListener('keyup', keyUpFn);
    }

    function disable() {
        document.removeEventListener('keydown', keyDownFn);
        document.removeEventListener('keyup', keyUpFn);
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
};

export default createKeyboardInput;
