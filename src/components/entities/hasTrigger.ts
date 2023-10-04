import { Position } from 'components/hasPosition';
import { Size } from 'components/hasSize';
import { ExtendedPhaserScene } from 'components/isScene';
import Phaser from 'phaser';

export interface TriggerState {
    init(parentScene: ExtendedPhaserScene): void;
    onEntityLeftRange(entity: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void;
    onEntityEnteredRange(entity: Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody): void;
    setSize(size: Size): Size;
    setPosition(pos: Position): Position;
    setOverlaps(bodies: Array<Phaser.GameObjects.Zone>): void;
    addOverlapBody(body: Phaser.GameObjects.Zone): void;
    isOverlappedByAny(): boolean;
    update(): void;
}

const hasTrigger = function hasTriggerFunc(state: TriggerState): TriggerState {
    let parentScene: ExtendedPhaserScene | undefined;

    let triggerZone: Phaser.GameObjects.Zone | undefined;
    let overlapsWith: Array<Phaser.GameObjects.Zone> = [];
    let overlappedEntities: Array<Phaser.Tilemaps.Tile | Phaser.Types.Physics.Arcade.GameObjectWithBody> = [];
    let x = 0;
    let y = 0;
    let w = 10;
    let h = 10;

    function createTriggerZone() {
        if (parentScene) {
            triggerZone = new Phaser.GameObjects.Zone(parentScene, x, y, w, h);
            parentScene.physics.add.existing(triggerZone, true);
        }
    }

    function init(newParentScene: ExtendedPhaserScene) {
        parentScene = newParentScene;
        createTriggerZone();
    }

    function setSize(size: Size): Size {
        w = size.height;
        h = size.width;
        if (triggerZone) {
            triggerZone.setSize(w, h);
        }
        return size;
    }

    function setPosition(pos: Position): Position {
        x = pos.x;
        y = pos.y;
        if (triggerZone) {
            triggerZone.setPosition(x, y);
        }
        return pos;
    }

    function setOverlaps(bodies: Array<Phaser.GameObjects.Zone>) {
        overlapsWith = bodies;
    }

    function addOverlapBody(body: Phaser.GameObjects.Zone) {
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
        overlappedEntities = [];
        if (parentScene && triggerZone) {
            parentScene.physics.overlap(triggerZone, overlapsWith, (zone, entity) => {
                overlappedEntities.push(entity);
            });
        }

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

    return {
        // props
        // methods
        init,
        setSize,
        setPosition,
        setOverlaps,
        addOverlapBody,
        isOverlappedByAny,
        update,
        onEntityLeftRange: e => e,
        onEntityEnteredRange: e => e,
    };
};

export default hasTrigger;
