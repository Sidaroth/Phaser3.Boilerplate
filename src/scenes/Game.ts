import { GAME, SCENES } from 'configs/gameConfig';
import { BACKGROUND } from 'configs/spriteConfig';
import createAudioManager, { AudioManager } from 'core/createAudioManager';
import createPlayer from 'entities/createPlayer';
import UI, { UIScene } from 'scenes/UI';
import canListen, { ListenComponent } from 'components/events/canListen';
import isScene, { SceneComponent } from 'components/isScene';
import createState from 'utils/createState';
import store from 'root/store';
import hasCamera, { Camera } from 'components/hasCamera';

export interface GameScene extends SceneComponent, Camera, ListenComponent { }
/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
function Game(): GameScene {
    const state = {} as GameScene;
    let audioManager: AudioManager | undefined;
    let UIContainer: UIScene | undefined;
    let background: Phaser.GameObjects.Image | undefined;

    function cameraSetup() {
        state.setViewport(0, 0, GAME.VIEWWIDTH, GAME.VIEWHEIGHT);
        state.setZoom(0.8);
    }


    function init() {
        // After assets are loaded.
        UIContainer = UI();
        state.addScene(SCENES.UI, UIContainer.scene, true);
        audioManager = createAudioManager(UIContainer.scene);
        store.audioManager = audioManager;
    }

    function create() {
        background = state.addImage(0, 0, BACKGROUND.KEY);
        background.setOrigin(0, 0);
        audioManager?.playMusic();
        cameraSetup();

        const player = createPlayer();
        console.log(player);
    }

    function update() { }

    function destroy() {
        if (background) state.removeChild(BACKGROUND.KEY);
        if (UIContainer && UIContainer.destroy) UIContainer.destroy();
    }

    const localState = {
        // props
        // methods
        init,
        create,
        update,
        destroy,
    };

    return createState('Game', state, {
        localState,
        canListen: canListen(state),
        isScene: isScene(state, SCENES.GAME),
        hasCamera: hasCamera(state),
    });
}

export default Game;
