import { Friend, Group, PlainText, Image, Audio, At, AtAll, MessageChain, EventChannel } from '../index.js';

Object.defineProperty(window, 'euphony', {
    value: {
        Friend,
        Group,
        PlainText,
        Image,
        Audio,
        At,
        AtAll,
        MessageChain,
        EventChannel
    },
    writable: false
});

euphonyNative.subscribeEvent('nodeIKernelMsgListener/onRecvMsg', payload => EventChannel.global().call('receive-message', payload));
euphonyNative.subscribeEvent('nodeIKernelMsgListener/onRecvActiveMsg', payload => EventChannel.global().call('receive-message', payload));
euphonyNative.subscribeEvent('nodeIKernelMsgListener/onAddSendMsg', payload => EventChannel.global().call('send-message', payload));