import Phaser from 'phaser';

class MessageBus extends Phaser.EventEmitter {
    constructor() {
        super();
    }
}

const messageBus = new MessageBus();
export default messageBus;
