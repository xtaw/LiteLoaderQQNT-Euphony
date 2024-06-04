import { SimpleMessageEvent } from '../index.js';

/**
 * `GroupMessageEvent` 代表消息接收到的事件。
 * 
 */
class GroupMessageEvent extends SimpleMessageEvent {

    #senderUin;

    constructor(msgData, message, source, senderUin) {
        super(msgData, message, source);
        this.#senderUin = senderUin;
    }

    getSenderUin(){
        return this.#senderUin;
    }

    getSenderAsMember(){
        return this.getMessageSource().getContact().getMemberFromUin(this.#senderUin);
    }

}

    export default GroupMessageEvent