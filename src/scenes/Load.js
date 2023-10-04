import {GAME, SCENES} from 'configs/gameConfig';
import createLoadingBar from 'core/createLoadingBar';
import * as spriteConfig from 'configs/spriteConfig';
import {MUSIC, SFX} from 'configs/audioConfig';
import isScene from 'components/isScene';
import createState from 'utils/createState';

const LoadScene = function LoadSceneFunc() {
    const state = {};
    let loadingBar;

    function loadAudio() {
        // load MUSIC
        Object.keys(MUSIC).forEach((objKey) => {
            const audio = MUSIC[objKey];
            state.scene.load.audio(audio.KEY, audio.PATH);
        });

        // load SFX
        Object.keys(SFX).forEach((objKey) => {
            const sfx = SFX[objKey];
            state.scene.load.audio(sfx.KEY, sfx.PATH);
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
