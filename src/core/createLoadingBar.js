import hasPosition from 'components/hasPosition';
import hasSize from 'components/hasSize';
import pipe from 'utils/pipe';

/**
 * A multipurpose loading bar that can be added to any scene.
 */
const createLoadingBar = function createLoadingBarFunc(originalScene) {
    const state = {};
    const padding = 2;
    const textPaddingFromBar = 10;
    const parentScene = originalScene;

    let loaderBg;
    let progressBar;
    let text;
    let currentProgress = 0;

    /**
     * @private
     */
    function updateProgressBar(progress) {
        currentProgress = progress;
        const pos = state.getPosition();
        progressBar.clear();
        progressBar.fillStyle(0xcccccc, 1);
        progressBar.fillRect(
            pos.x - state.getWidth() / 2,
            pos.y - state.getHeight() / 2,
            state.getWidth() * currentProgress,
            state.getHeight(),
        );
    }

    function onChange() {
        const pos = state.getPosition();
        loaderBg.clear();
        loaderBg.fillStyle(0x444444, 1);
        loaderBg.fillRect(
            pos.x - state.getWidth() / 2 - padding,
            pos.y - state.getHeight() / 2 - padding,
            state.getWidth() + padding * 2,
            state.getHeight() + padding * 2,
        );

        progressBar.clear();
        progressBar.fillStyle(0xcccccc, 1);
        progressBar.fillRect(
            pos.x - state.getWidth() / 2,
            pos.y - state.getHeight() / 2,
            state.getWidth() * currentProgress,
            state.getHeight(),
        );

        text.x = pos.x;
        text.y = pos.y - (text.height + textPaddingFromBar);
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
            fill: '#eeeeee',
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

    const hasPositionState = hasPosition(state);
    const hasSizeState = hasSize(state);
    const localState = {
        destroy,
    };

    const states = [
        { state, name: 'state' },
        { state: localState, name: 'localState' },
        { state: hasPositionState, name: 'hasPosition' },
        { state: hasSizeState, name: 'hasSize' },
    ];

    const returnState = Object.assign(...states.map(s => s.state), {
        // overrides and pipes.
        setPosition: pipe(
            hasPositionState.setPosition,
            onChange,
        ),
        setSize: pipe(
            hasSizeState.setSize,
            onChange,
        ),
    });

    init();
    return returnState;
};
export default createLoadingBar;
