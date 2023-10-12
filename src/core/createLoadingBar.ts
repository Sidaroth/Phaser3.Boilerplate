import hasPosition, { Position, PositionComponent } from 'components/hasPosition';
import hasSize, { Size, SizeComponent } from 'components/hasSize';
import { ExtendedPhaserScene, LifeCycle } from 'components/isScene';
import createState from 'utils/createState';
import pipe from 'utils/pipe';

export interface LoadingBar extends PositionComponent, SizeComponent, LifeCycle { }

/**
 * A multipurpose loading bar that can be added to any scene.
 */
const createLoadingBar = function createLoadingBarFunc(originalScene: ExtendedPhaserScene): LoadingBar {
    const state = {} as LoadingBar;
    const padding = 2;
    const textPaddingFromBar = 10;
    const parentScene = originalScene;

    let loaderBg: Phaser.GameObjects.Graphics | undefined;
    let progressBar: Phaser.GameObjects.Graphics | undefined;
    let text: Phaser.GameObjects.Text | undefined;
    let currentProgress = 0;

    /**
     * @private
     */
    function updateProgressBar(progress: number) {
        currentProgress = progress;
        const pos = state.getPosition();
        if (progressBar) {
            progressBar.clear();
            progressBar.fillStyle(0xcccccc, 1);
            progressBar.fillRect(
                pos.x - state.getWidth() / 2,
                pos.y - state.getHeight() / 2,
                state.getWidth() * currentProgress,
                state.getHeight(),
            );
        }
    }

    function onChange() {
        const pos = state.getPosition();
        if (loaderBg) {
            loaderBg.clear();
            loaderBg.fillStyle(0x444444, 1);
            loaderBg.fillRect(
                pos.x - state.getWidth() / 2 - padding,
                pos.y - state.getHeight() / 2 - padding,
                state.getWidth() + padding * 2,
                state.getHeight() + padding * 2,
            );
        }

        if (progressBar) {
            progressBar.clear();
            progressBar.fillStyle(0xcccccc, 1);
            progressBar.fillRect(
                pos.x - state.getWidth() / 2,
                pos.y - state.getHeight() / 2,
                state.getWidth() * currentProgress,
                state.getHeight(),
            );
        }

        if (text) {
            text.x = pos.x;
            text.y = pos.y - (text.height + textPaddingFromBar);
        }
    }

    /**
     * @constructor
     * @private
     */
    function init() {
        const pos = state.getPosition();
        loaderBg = parentScene.add.graphics();
        progressBar = parentScene.add.graphics();
        text = parentScene.add.text(pos.x, pos.y, 'Loading...', {
            font: '16px Arial',
            backgroundColor: '#eeeeee',
            align: 'center',
        });
        text.setOrigin(0.5, 1);
        text.y -= text.height + textPaddingFromBar;

        parentScene.load.on('progress', updateProgressBar, state);
    }

    function destroy() {
        if (loaderBg) loaderBg.destroy();
        if (progressBar) progressBar.destroy();
        if (text) text.destroy();
    }

    const localState = {
        destroy,
        setSize: (size: Size): Size => {
            onChange();
            return size;
        },
        setPosition: (pos: Position): Position => {
            onChange();
            return pos;
        }
    };

    const hasPositionState = hasPosition(state)
    const hasSizeState = hasSize(state)

    const returnState = createState<LoadingBar>('LoadingBar', state, {
        localState,
        hasPosition: hasPositionState,
        hasSize: hasSizeState,
    }, {
        setSize: pipe(hasSizeState.setSize, localState.setSize),
        setPosition: pipe(hasPositionState.setPosition, localState.setPosition),
    });

    init();
    return returnState;
};
export default createLoadingBar;
