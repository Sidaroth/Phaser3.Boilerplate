export enum GAME {
    VIEWHEIGHT = 1080,
    VIEWWIDTH = 1920,
    TITLE = 'Replace Me',
}
export enum SCENES {
    BOOT = 'game_boot',
    LOAD = 'game_load',
    GAME = 'game_game',
    UI = 'UI',
}
export const DEFAULT_TEXT_STYLE = {
    font: 'Roboto',
    fontSize: 20,
    fill: '#ffffff',
    smoothed: false,
}
export const UI_DEFAULT = {
    tint: 0xaaaaaa,
}
export const AUDIO = {
    musicKeys: ['bgScore'],
    sfxKeys: ['coinSfx'],
}

export interface KeyInfo {
    CODE: number;
    KEY: string;
}

export type KeyboardKeys = { [KEY in KeyboardKey]: KeyInfo }

type KeyboardKey = "LEFT_ARROW" | "UP_ARROW" | "RIGHT_ARROW" | "DOWN_ARROW" | "Z" | "X" | "COMMA" | "DOT" | "A" | "S" | "K" | "L" | "ENTER" | "ESCAPE"

export const KEYS: KeyboardKeys = {
    LEFT_ARROW: {
        CODE: 37,
        KEY: '',
    },
    UP_ARROW: {
        CODE: 38,
        KEY: '',
    },
    RIGHT_ARROW: {
        CODE: 39,
        KEY: '',
    },
    DOWN_ARROW: {
        CODE: 40,
        KEY: '',
    },
    Z: {
        CODE: 90,
        KEY: 'Z',
    },
    X: {
        CODE: 88,
        KEY: 'X',
    },
    COMMA: {
        CODE: 188,
        KEY: ',',
    },
    DOT: {
        CODE: 190,
        KEY: '.',
    },
    A: {
        CODE: 65,
        KEY: 'A',
    },
    S: {
        CODE: 83,
        KEY: 'S',
    },
    K: {
        CODE: 75,
        KEY: 'K',
    },
    L: {
        CODE: 76,
        KEY: 'L',
    },
    ENTER: {
        CODE: 13,
        KEY: '',
    },
    ESCAPE: {
        CODE: 27,
        KEY: '',
    },
}

