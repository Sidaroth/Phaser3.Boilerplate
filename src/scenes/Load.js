import Phaser from 'phaser';
import gameConfig from 'configs/gameConfig';
import createLoadingBar from 'core/createLoadingBar';
import spriteConfig from 'configs/spriteConfig';
import audioConfig from 'configs/audioConfig';
import getFunctionUsage from 'utils/getFunctionUsage';

const LoadScene = function LoadSceneFunc() {
    const state = new Phaser.Scene(gameConfig.SCENES.LOAD);
    let loadingBar;

    function loadAudio() {
        // load MUSIC
        Object.keys(audioConfig.MUSIC).forEach((objKey) => {
            const AUDIO = audioConfig.MUSIC[objKey];
            state.load.audio(AUDIO.KEY, AUDIO.PATH);
        });

        // load SFX
        Object.keys(audioConfig.SFX).forEach((objKey) => {
            const SFX = audioConfig.SFX[objKey];
            state.load.audio(SFX.KEY, SFX.PATH);
        });
    }

    function loadSpritesheets() {}

    function loadMaps() {}

    function loadImages() {
        Object.keys(spriteConfig).forEach((objKey) => {
            const SPRITE = spriteConfig[objKey];
            state.load.image(SPRITE.KEY, SPRITE.PATH);
        });
    }

    function loadAssets() {
        loadAudio();
        loadImages();
        loadSpritesheets();
        loadMaps();
    }

    function preload() {
        loadingBar = createLoadingBar(state);
        loadingBar.setPosition({ x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 });
        loadingBar.setSize({ w: gameConfig.GAME.VIEWWIDTH * 0.4, h: gameConfig.GAME.VIEWHEIGHT * 0.025 });

        state.load.on('complete', () => {
            state.scene.start(gameConfig.SCENES.GAME);
            state.destroy();
        });

        loadAssets();
    }

    function destroy() {
        if (loadingBar) loadingBar.destroy();
    }

    const localState = {
        // props
        // methods
        preload,
        destroy,
    };

    const states = [{ state, name: 'state' }, { state: localState, name: 'localState' }];

    getFunctionUsage(states, 'LoadState');
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
    });
};

export default LoadScene;
