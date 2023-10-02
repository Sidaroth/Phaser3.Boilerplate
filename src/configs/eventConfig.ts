export const EVENTS = {
    GAME: {
        STARTED: 'game_started',
    },
    OTHER: {
        TEST: 'other_event'
    }
}

export interface GameStartedEvent {
    welcomeMessage: string;
}

export interface OtherEvent {
    test: string;
}

export interface EventData {
    'game_started': GameStartedEvent;
    'other_event': OtherEvent;
}