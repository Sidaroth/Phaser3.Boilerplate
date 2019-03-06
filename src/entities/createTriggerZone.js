import Phaser from 'phaser';
import hasPosition from 'components/hasPosition';
import hasSize from 'components/hasSize';
import isGameEntity from 'components/entities/isGameEntity';
import createState from 'utils/createState';

const createTriggerZone = function createTriggerZoneFunc(originalScene) {
    const state = {};

    let parentScene = originalScene;
    let triggerZone = new Phaser.GameObjects.Zone(parentScene, 0, 0, 0, 0);
    const overlapsWith = [];
    const overlappedEntities = [];

    function setScene(newScene) {
        parentScene = newScene;
        triggerZone.destroy();
        const { x, y } = state.getPosition();

        triggerZone = new Phaser.GameObjects.Zone(parentScene, x, y, state.getWidth(), state.getHeight());
    }

    function setSize(size) {
        triggerZone.setSize(size.w, size.h);
        return size;
    }

    function setPosition(pos) {
        triggerZone.setPosition(pos.x, pos.y);
        return pos;
    }

    function setOverlaps(bodies) {
        overlapsWith.length = 0;
        overlapsWith.splice(0, 0, bodies);
    }

    function addOverlapBody(body) {
        overlapsWith.push(body);
    }

    function isOverlappedByAny() {
        return overlappedEntities.length > 0;
    }

    /**
     * It should be possible to optimize state to avoid a double loop (or is it?).
     */
    function update() {
        const previous = overlappedEntities;
        overlappedEntities.length = 0;
        parentScene.physics.overlap(triggerZone, overlapsWith, (zone, entity) => {
            overlappedEntities.push(entity);
        });

        overlappedEntities.forEach((entity) => {
            if (previous.indexOf(entity) === -1) {
                state.onEntityEnteredRange(entity);
            }
        });

        // If an entity was overlapped previously, but no longer, we emit an exit event.
        previous.forEach((entity) => {
            if (overlappedEntities.indexOf(entity) === -1) {
                state.onEntityLeftRange(entity);
            }
        });
    }

    const localState = {
        // props
        // methods
        setScene,
        setSize,
        setPosition,
        setOverlaps,
        addOverlapBody,
        isOverlappedByAny,
        update,
        onEntityLeftRange: e => e,
        onEntityEnteredRange: e => e,
    };

    return createState('createTriggerZone', state, {
        localState,
        isGameEntity: isGameEntity(state),
        hasPosition: hasPosition(state),
        hasSize: hasSize(state),
    });
};

export default createTriggerZone;
