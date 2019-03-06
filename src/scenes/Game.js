import { List } from 'immutable';
import gameConfig from 'configs/gameConfig';
import spriteConfig from 'configs/spriteConfig';
import AudioManager from 'core/createAudioManager';
import createPlayer from 'entities/createPlayer';
import UI from 'scenes/UI';
import audioConfig from 'configs/audioConfig';
import canListen from 'components/events/canListen';
import isScene from 'components/isScene';
import createState from 'utils/createState';

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
    const state = {};
    let audioManager;
    let entities = List([]);
    let UIScene;
    let background;

    function createCoin() {
        audioManager.playSfx(audioConfig.SFX.COIN.KEY);
    }

    function cameraSetup() {
        state.getScene().cameras.main.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT);
        state.getScene().cameras.main.setZoom(0.8);
    }

    function addEntities() {
        const numberOfEntities = 3;

        for (let i = 0; i < numberOfEntities; i += 1) {
            entities = entities.push(createPlayer());
        }

        // Log a player entity example, same as in readme.md
        console.log(entities.get(0));
        entities.forEach((e) => {
            e.printInfo();
        });
    }

    function init() {
        // After assets are loaded.
        UIScene = UI();
        state.getScene().scene.add(gameConfig.SCENES.UI, UIScene.getScene(), true);
        audioManager = AudioManager(UIScene.getScene());
    }

    function create() {
        background = state.getScene().add.image(0, 0, spriteConfig.BACKGROUND.KEY);
        background.setOrigin(0, 0);
        audioManager.playMusic();
        createCoin();
        addEntities();
        cameraSetup();
    }

    function update(time, delta) {}

    function destroy() {
        if (background) state.getScene().background.destroy();
        if (UI) UI.destroy();
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
        isScene: isScene(state, gameConfig.SCENES.GAME),
    });
};

export default Game;
