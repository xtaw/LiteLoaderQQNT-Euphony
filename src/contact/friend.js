import { Contact } from '../index.js';

/**
 * `Friend` 类型代表好友。
 * @property { String } #uid 好友的 **uid**。
 */
class Friend extends Contact {

    #uid;

    /**
     * 返回该联系人类型所对应的 **chatType**，值为 **1**。
     * @returns { Number } 该联系人类型所对应的 **chatType**，值为 **1**。
     */
    static getChatType() { 
        return 1;
    }

    /**
     * 通过 **qq号** 来获取一个好友。
     * @param { String } uin 要获取的好友的 **qq号**。
     * @returns { Friend } 获取到的好友。
     */
    static fromUin(uin) {
        const uid = euphonyNative.convertUinToUid(uin);
        if (!uid) {
            return null;
        }
        return new Friend(uin, uid);
    }

    /**
     * 通过 **uid** 来获取一个好友。
     * @param { String } uid 要获取的好友的 **uid**。
     * @returns { Friend } 获取到的好友。
     */
    static fromUid(uid) {
        const uin = euphonyNative.convertUidToUin(uid);
        if (!uin) {
            return null;
        }
        return new Friend(uin, uid);
    }

    /**
     * 构造一个 **qq号** 为 `uin`，**uid** 为 `uid` 的好友。
     * @param { String } uin 好友的 **qq号**。
     * @param { String } uid 好友的 **uid**。
     */
    constructor(uin, uid) {
        super(uin);
        this.#uid = uid;
    }

    /**
     * 返回该好友的 `#uid` 属性。
     * @returns { String } 该好友的 `#uid` 属性。
     */
    getUid() {
        return this.#uid;
    }

    /**
     * 构造并返回该好友所对应的 **peer** 对象。
     * @returns { Native } 该好友所对应的 **peer** 对象。
     */
    toPeer() {
        return {
            chatType: Friend.getChatType(),
            peerUid: this.#uid,
            guildId: ''
        };
    }

}

export default Friend