import { Contact, Friend, Group, SingleMessage, MessageChain, MessageSource, PlainText, Image, Audio, At, AtAll, EventChannel } from '../index.js';

Object.defineProperty(window, 'euphony', {
    value: {
        Contact,
        Friend,
        Group,
        SingleMessage,
        MessageChain,
        MessageSource,
        PlainText,
        Image,
        Audio,
        At,
        AtAll,
        EventChannel
    },
    writable: false
});