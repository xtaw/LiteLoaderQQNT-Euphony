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

euphonyNative.subscribeEvent('nodeIKernelMsgListener/onRecvMsg', payload => EventChannel.global().call('receive-message', payload));
euphonyNative.subscribeEvent('nodeIKernelMsgListener/onRecvActiveMsg', payload => EventChannel.global().call('receive-message', payload));
euphonyNative.subscribeEvent('nodeIKernelMsgListener/onAddSendMsg', payload => EventChannel.global().call('send-message', payload));