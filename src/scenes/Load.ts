import { GAME, SCENES } from 'configs/gameConfig';
import createLoadingBar, { LoadingBar } from 'core/createLoadingBar';
import { MUSIC, SFX } from 'configs/audioConfig';
import isScene, { Scene } from 'components/isScene';
import createState from 'utils/createState';
import { BACKGROUND, SPEAKER, SPEAKER_OFF } from 'configs/spriteConfig';

export interface LoadScene extends Scene { }

const LoadScene = function LoadSceneFunc() {
    const state = {} as LoadScene;
    let loadingBar: LoadingBar | undefined;

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

    function loadSpritesheets() { }

    function loadMaps() { }

    function loadImages() {
        state.scene.load.image(BACKGROUND.KEY, BACKGROUND.PATH);
        state.scene.load.image(SPEAKER.KEY, SPEAKER.PATH);
        state.scene.load.image(SPEAKER_OFF.KEY, SPEAKER_OFF.PATH);
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
        loadingBar.setSize({ width: GAME.VIEWWIDTH * 0.4, height: GAME.VIEWHEIGHT * 0.025 });

        state.scene.load.on('complete', () => {
            state.sceneManager?.start(SCENES.GAME);
            if (state.scene && state.scene.destroy) {
                state.scene.destroy();
            }
        });

        loadAssets();
    }

    function destroy() {
        if (loadingBar && loadingBar.destroy) loadingBar.destroy();
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
