import messageBus from '../components/messageBus';
import config from '../config';

export default class Trigger {
    /** @type {Phaser.GameObjects.Zone}   */
    triggerZone = null;
    /** @type {Phaser.Scene}   */
    parentScene = null;
    overlapsWith = [];
    overlappedEntities = [];
    connectedTo = null;

    constructor(parentScene, x, y, w, h, bodies, parent) {
        if (parent) this.parent = parent; // We may want a trigger zone that is not conncected to an object, but free in the scene.
        this.parentScene = parentScene;
        this.triggerZone = new Phaser.GameObjects.Zone(this.parentScene, x, y, w, h);
        this.parentScene.physics.add.existing(this.triggerZone, true);
        this.overlapsWith = bodies;
    }

    setOverlaps(bodies) {
        this.overlapsWith = bodies;
    }

    addOverlapBody(body) {
        this.overlapsWith.push(body);
    }

    isOverlappedByAny() {
        return this.overlappedEntities.length > 0;
    }

    /**
     * It should be possible to optimize this to avoid a double loop (or is it?).
     */
    update() {
        const previous = this.overlappedEntities;
        this.overlappedEntities = [];
        this.parentScene.physics.overlap(this.triggerZone, this.overlapsWith, (zone, entity) => {
            this.overlappedEntities.push(entity);
        });

        // If an entity is overlapped, and was not overlapped previously, we emit an enter event.
        this.overlappedEntities.forEach((entity) => {
            if (previous.indexOf(entity) === -1) {
                const parent = this.parent || this;
                messageBus.emit(config.EVENTS.ENTITY_ENTERED_RANGE, parent, entity);
            }
        });

        // If an entity was overlapped previously, but no longer, we emit an exit event.
        previous.forEach((entity) => {
            if (this.overlappedEntities.indexOf(entity) === -1) {
                const parent = this.parent || this;
                messageBus.emit(config.EVENTS.ENTITY_LEFT_RANGE, parent, entity);
            }
        });
    }
}