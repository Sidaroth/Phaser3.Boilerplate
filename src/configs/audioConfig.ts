export interface MusicInfo {
    KEY: string;
    PATH: string;
}

export type Music = { [key: string]: MusicInfo }

export const MUSIC: Music = {
    BG_SCORE: {
        KEY: 'bg_score',
        PATH: 'assets/audio/Philipp_Weigl_-_06_-_Full_of_Stars.mp3',
    },
}

export interface SfxInfo {
    KEY: string;
    PATH: string;
}

export type Sfx = { [key: string]: SfxInfo }

export const SFX: Sfx = {
    COIN: {
        KEY: 'coin_sfx',
        PATH: 'assets/audio/coin.wav',
    },
}
