import { Contact, Friend, Group, SingleMessage, MessageChain, PlainText, Image, Audio, At, AtAll, EventChannel } from '../index.js';

Object.defineProperty(window, 'euphony', {
    value: {
        Contact,
        Friend,
        Group,
        SingleMessage,
        MessageChain,
        PlainText,
        Image,
        Audio,
        At,
        AtAll,
        EventChannel
    },
    writable: false
});