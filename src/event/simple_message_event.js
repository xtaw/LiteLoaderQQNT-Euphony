/**
 * `MessageEvent` 表示一个被触发的消息事件
 * 
 * @property { MessageChain } #messageChain 事件消息
 * @property { MessageSource } #MessageSource 事件消息的来源
 */
class SimpleMessageEvent {

    #msgData;

    #messageChain;

    #messageSource;

    /**
     * 仅供子类调用。
     * 
     * @param { MessageChain } messageChain 事件消息
     * @param { MessageSource } messageSource 事件消息的来源。
     */
    constructor(msgdata, message, source) {
        this.msgdata = msgdata;
        this.#messageChain = message;
        this.#messageSource = source;
    }

    /**
     * 返回事件的消息
     * 
     * @returns { MessageChain }
     */
    getMessage() {
        return this.#messageChain;
    }

    /**
     * 返回该事件的 *消息来源*
     * 
     * @returns { MessageSource } 
     */
    getMessageSource() {
        return this.#messageSource;
    }

    /**
     * 返回未经处理的消息
     * 
     * @returns { any }
     */
    getMessageData() {
        return this.#msgData;
    }

}

export default SimpleMessageEvent