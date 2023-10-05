import { AudioManager } from "core/createAudioManager";
import { MessageBus } from "core/createMessageBus";

export interface Store {
    messageBus?: MessageBus;
    game?: Phaser.Game;
    audioManager?: AudioManager;
}

const store: Store = {};

export default store;
