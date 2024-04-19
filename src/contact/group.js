import { Contact } from '../index.js';

/**
 * `Group` 类型代表群聊。
 */
class Group extends Contact {

    /**
     * 返回该联系人类型所对应的 **chatType**，值为 **2**。
     * @returns { Number } 该联系人类型所对应的 **chatType**，值为 **2**。
     */
    static getChatType() {
        return 2;
    }

    /**
     * 构造一个 **群号** 为 `id` 的群聊。
     * @param { String } id 群聊的 **群号**。
     */
    constructor(id) {
        super(id);
    }

    /**
     * 构造并返回该群聊所对应的 **peer** 对象。
     * @returns { Native } 该群聊所对应的 **peer** 对象。
     */
    toPeer() {
        return {
            chatType: Group.getChatType(),
            peerUid: this.getId(),
            guildId: ''
        };
    }

}

export default Group