import Phaser from 'phaser';

/**
 * It's likely not needed to extend the eventEmitter here, can just use a var.
 */
// class MessageBus extends Phaser.EventEmitter {
//     constructor() {
//         super();
//     }
// }

const messageBus = new Phaser.EventEmitter();
export default messageBus;
