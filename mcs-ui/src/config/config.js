
const urls = [
    'ws://localhost:8080',
    'wss://192.168.0.102:8080',
    'wss://192.168.43.143:8080',
    'wss://192.168.1.5:8080',
]

export const SOCKET_URL = urls[3];

const CONSTRAINTS = [
    {
        MEDIA: { audio: true, video: { width: 1280, height: 720, } },
        AMOUNT: 2
    },
    {
        MEDIA: { audio: true, video: false },
        AMOUNT: 1
    }
]

export const NOW_CONSTRAINT = CONSTRAINTS[0]