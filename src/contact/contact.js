import SingleMessage from "../message/single_message.js";

class Contact {

    #id;

    constructor(id) {
        this.#id = id;
    }

    async sendMessage(message) {
        await euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelMsgService/sendMsg', false, {
            msgId: '0',
            peer: this.toPeer(),
            msgElements: message instanceof SingleMessage ? [ await message.toElement() ] : await message.toElements(),
            msgAttributeInfos: new Map()
        });
    }

    getId() {
        return this.#id;
    }

    toPeer() {
        throw new Error('Abstract method not implemented.');
    }

}

export default Contact