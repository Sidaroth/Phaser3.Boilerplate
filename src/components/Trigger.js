import messageBus from './MessageBus';
import config from '../config';
import Phaser from 'phaser';

export default class Trigger extends Phaser.EventEmitter {
    /** @type {Phaser.Scene}   */
    parentScene = null;
    parent = null;

    /** @type {Phaser.GameObjects.Zone}   */
    triggerZone = null;
    overlapsWith = [];
    overlappedEntities = [];

    constructor(parentScene, x, y, w, h, bodies, parent) {
        super();

        if (parent) this.parent = parent; // We may want a trigger zone that is not conncected to an object, but free in the scene.
        this.parentScene = parentScene;
        this.triggerZone = new Phaser.GameObjects.Zone(this.parentScene, x, y, w, h);
        this.emitter = new Phaser.EventEmitter();
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
                this.emit(config.EVENTS.ENTITY_ENTERED_RANGE, parent, entity);
            }
        });

        // If an entity was overlapped previously, but no longer, we emit an exit event.
        previous.forEach((entity) => {
            if (this.overlappedEntities.indexOf(entity) === -1) {
                const parent = this.parent || this;
                this.emit(config.EVENTS.ENTITY_LEFT_RANGE, parent, entity);
                messageBus.emit(config.EVENTS.ENTITY_LEFT_RANGE, parent, entity);
            }
        });
    }
}
