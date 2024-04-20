import { Cache, Contact } from '../index.js';

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
     * 构造一个 **qq号** 为 `uin`，**uid** 为 `uid` 的好友。
     * 该函数构造出的好友全局只有一个实例，相同的 `uin` 和 `uid` 将会返回相同的对象。
     * 在任何情况下，都应该使用该函数来构造好友，而非直接使用构造器。
     * @param { String } uin 好友的 **qq号**。
     * @param { String } uid 好友的 **uid**。
     * @returns { Friend } 构造出的好友。
     */
    static make(uin, uid) {
        return Cache.withCache(`friend-${ uin }-${ uid }`, () => new Friend(uin, uid));
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
        return Friend.make(uin, uid);
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
        return Friend.make(uin, uid);
    }

    /**
     * 构造一个 **qq号** 为 `uin`，**uid** 为 `uid` 的好友。
     * 注意：在任何情况下，都不应该直接使用该构造器来构造好友。相反地，你应该使用 `Friend.make(uin, uid)` 函数来构造好友。
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