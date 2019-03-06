import gameConfig from 'configs/gameConfig';
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
            state.getScene().load.audio(AUDIO.KEY, AUDIO.PATH);
        });

        // load SFX
        Object.keys(audioConfig.SFX).forEach((objKey) => {
            const SFX = audioConfig.SFX[objKey];
            state.getScene().load.audio(SFX.KEY, SFX.PATH);
        });
    }

    function loadSpritesheets() {}

    function loadMaps() {}

    function loadImages() {
        Object.keys(spriteConfig).forEach((objKey) => {
            const SPRITE = spriteConfig[objKey];
            state.getScene().load.image(SPRITE.KEY, SPRITE.PATH);
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
        loadingBar = createLoadingBar(state.getScene());
        loadingBar.setPosition({ x: gameConfig.GAME.VIEWWIDTH / 2, y: gameConfig.GAME.VIEWHEIGHT / 2 });
        loadingBar.setSize({ w: gameConfig.GAME.VIEWWIDTH * 0.4, h: gameConfig.GAME.VIEWHEIGHT * 0.025 });

        state.getScene().load.on('complete', () => {
            state.getScene().scene.start(gameConfig.SCENES.GAME);
            state.getScene().destroy();
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
        isScene: isScene(state, gameConfig.SCENES.LOAD),
    });
};

export default LoadScene;
