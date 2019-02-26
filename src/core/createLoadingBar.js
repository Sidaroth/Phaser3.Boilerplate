import gameConfig from 'configs/gameConfig';
import hasPosition from 'components/hasPosition';
import hasSize from 'components/hasSize';

/**
 * A multipurpose loading bar that can be added to any scene.
 */
const createLoadingBar = function createLoadingBarFunc() {
    const state = {};
    const padding = 2;
    const textPaddingFromBar = 10;

    let parentScene;
    let loaderBg;
    let progressBar;
    let text;

    function updateProgressBar(progress) {
        if (!progressBar) {
            progressBar = parentScene.add.graphics();
        }

        const pos = state.getPosition();
        progressBar.clear();
        progressBar.fillStyle(0xcccccc, 1);
        progressBar.fillRect(pos.x - state.getWidth() / 2, pos.y - state.getHeight() / 2, state.getWidth() * progress, state.getHeight());
    }

    function init(newParent, newX = 400, newY = 400) {
        parentScene = newParent;

        state.setPosition({ x: newX, y: newY });
        state.setSize({ w: gameConfig.GAME.VIEWWIDTH * 0.4, h: gameConfig.GAME.VIEWHEIGHT * 0.025 });


        const pos = state.getPosition();
        loaderBg = parentScene.add.graphics();
        loaderBg.fillStyle(0x444444, 1);
        loaderBg.fillRect(
            pos.x - state.getWidth() / 2 - padding,
            pos.y - state.getHeight() / 2 - padding,
            state.getWidth() + padding * 2,
            state.getHeight() + padding * 2,
        );

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
        init,
        destroy,
    };

    const states = [
        { state, name: 'state' },
        { state: localState, name: 'localState' },
        { state: hasPositionState, name: 'hasPosition' },
        { state: hasSizeState, name: 'hasSize' },
    ];

    return Object.assign(...states.map(s => s.state), {
        // overrides and pipes.
    });
};
export default createLoadingBar;
