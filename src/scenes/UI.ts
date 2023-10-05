import Stats from 'stats.js';
import * as dat from 'dat.gui';
import { SCENES } from 'configs/gameConfig';
import isScene, { SceneState } from 'components/isScene';
import createState from 'utils/createState';

/**
 * Layer/Scene for UI elements.
 */

export interface UIScene extends SceneState {
    guiData: {
        name: string;
    };
}

function UI(): UIScene {
    const state = {} as UIScene;
    let gui: dat.GUI | undefined;
    let stats: Stats | undefined;

    function setupPerformanceStats() {
        stats = new Stats();
        stats.showPanel(0);

        stats.dom.style.position = 'absolute';
        stats.dom.style.left = '0px';
        stats.dom.style.top = '0px';

        document.body.appendChild(stats.dom);

        // TODO cleanup listeners
        state.scene.events.on('preupdate', () => {
            stats?.begin();
        });
        state.scene.events.on('postupdate', () => {
            stats?.end();
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
        gui?.destroy();
        stats?.end();
        if (stats?.dom) {
            document.body.removeChild(stats.dom);
        }
    }

    const localState = {
        // props
        guiData: {
            name: ''
        },
        // methods
        create,
        destroy,
    };

    return createState('UIScene', state, {
        localState,
        isScene: isScene(state, SCENES.UI),
    });
}

export default UI;
