import Stats from 'stats-js';
import * as dat from 'dat.gui';
import gameConfig from 'configs/gameConfig';
import getFunctionUsage from 'utils/getFunctionUsage';
import isScene from 'components/isScene';

/**
 * Layer/Scene for UI elements.
 */

const UI = function UIFunc() {
    const state = {};
    let gui;
    let stats;

    function setupPerformanceStats() {
        stats = new Stats();
        stats.setMode(0);

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.left = '0px';
        stats.domElement.style.top = '0px';

        document.body.appendChild(stats.domElement);

        // TODO cleanup listeners
        state.getScene().events.on('preupdate', () => {
            stats.begin();
        });
        state.getScene().events.on('postupdate', () => {
            stats.end();
        });
    }

    function setupDatGui() {
        gui = new dat.GUI();
        gui.addFolder('Test folder');

        state.guiData = {
            name: 'name',
        };
        const guiController = gui.add(state.guiData, 'name');
        guiController.onFinishChange((name) => {
            console.log(name);
        });
    }

    function create() {
        setupDatGui();
        setupPerformanceStats();
    }

    function destroy() {
        gui.destroy();
        stats.end();
        document.body.removeChild(stats);
    }

    const localState = {
        // methods
        create,
        destroy,
    };

    const isSceneState = isScene(state, gameConfig.SCENES.UI);
    const states = [{ state, name: 'state' }, { state: localState, name: 'localState' }, { state: isSceneState, name: 'isScene' }];

    getFunctionUsage(states, 'UIScene');
    return Object.assign(...states.map(s => s.state), {
        // pipes and overrides
    });
};

export default UI;
