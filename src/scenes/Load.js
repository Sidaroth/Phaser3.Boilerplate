import {GAME, SCENES} from 'configs/gameConfig';
import createLoadingBar from 'core/createLoadingBar';
import spriteConfig from 'configs/spriteConfig';
import audioConfig from 'configs/audioConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';

const LoadScene = function LoadSceneFunc() {
    const state = {};
    let loadingBar;

    function loadAudio() {
        // load MUSIC
        Object.keys(audioConfig.MUSIC).forEach((objKey) => {
            const AUDIO = audioConfig.MUSIC[objKey];
            state.scene.load.audio(AUDIO.KEY, AUDIO.PATH);
        });

        // load SFX
        Object.keys(audioConfig.SFX).forEach((objKey) => {
            const SFX = audioConfig.SFX[objKey];
            state.scene.load.audio(SFX.KEY, SFX.PATH);
        });
    }

    function loadSpritesheets() {}

    function loadMaps() {}

    function loadImages() {
        Object.keys(spriteConfig).forEach((objKey) => {
            const SPRITE = spriteConfig[objKey];
            state.scene.load.image(SPRITE.KEY, SPRITE.PATH);
        });
    }

    function loadAssets() {
        loadAudio();
        loadImages();
        loadSpritesheets();
        loadMaps();
    }

    // hook into phasers scene lifecycle.
    function preload() {
        loadingBar = createLoadingBar(state.scene);
        loadingBar.setPosition({ x: GAME.VIEWWIDTH / 2, y: GAME.VIEWHEIGHT / 2 });
        loadingBar.setSize({ w: GAME.VIEWWIDTH * 0.4, h: GAME.VIEWHEIGHT * 0.025 });

        state.scene.load.on('complete', () => {
            state.sceneManager.start(SCENES.GAME);
            state.scene.destroy();
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

    return createState('LoadState', state, {
        localState,
        isScene: isScene(state, SCENES.LOAD),
    });
};

export default LoadScene;
