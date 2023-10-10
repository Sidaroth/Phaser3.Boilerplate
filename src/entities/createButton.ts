import canEmit, { EmitState } from 'components/events/canEmit';
import hasSize, { Size, SizeState } from 'components/hasSize';
import hasPosition, { Position, PositionState } from 'components/hasPosition';
import pipe from 'utils/pipe';
import createState from 'utils/createState';
import { EVENTS } from 'configs/eventConfig';

export interface Button extends EmitState, PositionState, SizeState {
    refresh: () => void;
    setText: (val: string) => void;
}

const createButton = function createButtonFunc(parent: Phaser.Scene): Button {
    const state = {} as Button;
    const parentState = parent;

    let background: Phaser.GameObjects.Graphics | undefined;
    let zone: Phaser.GameObjects.Zone | undefined;
    let text = 'My Button';
    let textElem: Phaser.GameObjects.Text | undefined;

    function init() {
        state.refresh();
    }

    function setText(val: string) {
        text = val;
        state.refresh();
    }

    function onClick(e: any) {
        state.emit(EVENTS.BUTTON.CLICK, e);
    }

    function refresh() {
        if (!background) {
            background = parentState.add.graphics();
            zone = parentState.add.zone(0, 0, 10, 10);
            zone.setInteractive();
            zone.on('pointerup', onClick, state);
        }
        background.clear();
        background.lineStyle(3, 0xcccccc, 1);
        background.fillStyle(0x333333, 1);
        background.strokeRect(state.getX(), state.getY(), state.getWidth(), state.getHeight());
        background.fillRect(state.getX(), state.getY(), state.getWidth(), state.getHeight());

        zone?.input?.hitArea.setTo(state.getX(), state.getY(), state.getWidth(), state.getHeight());
        zone?.setInteractive();

        if (!textElem) {
            textElem = parent.add.text(0, 0, '', {
                font: '64px Arial',
                backgroundColor: '#eeeeee',
                align: 'center',
            });
        }

        textElem.text = `${text}`;
        textElem.x = state.getX() + state.getWidth() / 2 - textElem.width / 2;
        textElem.y = state.getY() - textElem.height / 2 + state.getHeight() / 2;
    }

    function destroy() {
        if (background) {
            background.destroy();
            background = undefined;
        }

        if (zone) {
            zone.destroy();
            zone = undefined;
        }

        if (textElem) {
            textElem.destroy();
            textElem = undefined;
        }
    }

    const localState = {
        // props
        // methods
        init,
        setText,
        refresh,
        destroy,
        setPosition: (pos: Position): Position => {
            state.refresh();
            return pos;
        },
        setSize: (size: Size): Size => {
            state.refresh();
            return size;
        }
    };


    const hasPositionState = hasPosition(state)
    const hasSizeState = hasSize(state)
    return createState('Button', state, {
        localState,
        canEmit: canEmit(state),
        hasPosition: hasPositionState,
        hasSize: hasSizeState,
    }, {
        setPosition: pipe(
            hasPositionState.setPosition,
            localState.setPosition
        ),
        setSize: pipe(
            hasSizeState.setSize,
            localState.setSize
        ),
    });
};

export default createButton;
