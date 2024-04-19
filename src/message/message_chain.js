import { MessageSource, SingleMessage } from '../index.js';

/**
 * `MessageChain` 类型代表一条完整的消息，由多个 `SingleMessage` 组成。
 * 它可以代表一条来自服务器的消息，也可以用于表示本地消息。这取决于 `#source` 属性是否存在。
 * @property { MessageSource } #source 该消息链的来源。仅当该消息链是服务器消息时该属性才有意义。
 * @property { Array } #messages 构成该消息链的所有元素。接收的类型应为 `SingleMessage`。
 */
class MessageChain {

    #source;

    #messages = [];

    /**
     * 构造一个来源为 `source` 的消息链。
     * 若 `source` 参数为空，则构造出的对象代表本地消息链。
     * @param { MessageSource } source 消息来源。
     */
    constructor(source = undefined) {
        this.#source = source;
    }

    /**
     * 返回该消息链的 `#source` 属性。
     * 仅当该消息链是服务器消息时该函数才有意义。
     * @returns { MessageSource } 该消息链的 `#source` 属性。
     */
    getSource() {
        return this.#source;
    }

    /**
     * 将一个消息元素添加至该消息链中。
     * @param { SingleMessage } value 要添加的消息元素。
     * @returns { MessageChain } 该消息链。
     */
    append(value) {
        this.#messages.push(value);
        return this;
    }

    /**
     * 将一个消息元素添加至该消息链中。
     * @param { Native } element 要添加的原生消息元素。
     * @returns { MessageChain } 该消息链。
     */
    appendNative(element) {
        this.#messages.push(SingleMessage.fromNative(element));
        return this;
    }

    /**
     * 将一个消息链添加至该消息链中。
     * @param { Native } elements 要添加的原生消息链。
     * @returns { MessageChain } 该消息链。
     */
    appendNatives(elements) {
        for (const element of elements) {
            this.appendNative(element);
        }
        return this;
    }

    /**
     * 移除该消息链中最后一个消息元素。
     * @returns { MessageChain } 该消息链。 
     */
    pop() {
        this.#messages.pop();
        return this;
    }

    /**
     * 移除该消息链中指定位置的消息元素。
     * @param { Number } index 要移除的消息元素的位置。
     * @returns { MessageChain } 该消息链。
     */
    remove(index) {
        this.#messages.splice(index, 1);
        return this;
    }

    /**
     * 构造并返回该消息链所对应的 **elements** 对象。
     * @returns { Native } 该消息链所对应的 **elements** 对象。
     */
    async toElements() {
        return await Promise.all(this.#messages.map(async message => await message.toElement()));
    }

}

export default MessageChain