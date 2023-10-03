import { AudioManager } from "core/createAudioManager";

export interface Store {
    messageBus?: any;
    game?: Phaser.Game;
    audioManager?: AudioManager;
}

const store: Store = {};

export default store;
