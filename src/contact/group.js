import { Cache, Contact } from '../index.js';

/**
 * `Group` 类型代表群聊。
 * @property { String } #name 群聊名称。
 * @property { Number } #maxMemberCount 群聊最大人数。
 * @property { Number } #memberCount 群聊人数。
 * @property { String } #remark 群聊备注。
 */
class Group extends Contact {

    #name;
    #maxMemberCount;
    #memberCount;
    #remark;

    static {
        euphonyNative.subscribeEvent('onGroupListUpdate', payload => {
            for (const nativeGroup of payload.groupList) {
                const group = Group.make(nativeGroup.groupCode);
                group.#name = nativeGroup.groupName;
                group.#maxMemberCount = nativeGroup.maxMember;
                group.#memberCount = nativeGroup.memberCount;
                group.#remark = nativeGroup.remarkName;
            }
        });
    }

    /**
     * 返回该联系人类型所对应的 **chatType**，值为 **2**。
     * @returns { Number } 该联系人类型所对应的 **chatType**，值为 **2**。
     */
    static getChatType() {
        return 2;
    }

    /**
     * 构造一个 **群号** 为 `id` 的群聊。
     * 该函数构造出的群聊全局只有一个实例，相同的 `id` 将会返回相同的对象。
     * 在任何情况下，都应该使用该函数来构造群聊，而非直接使用构造器。
     * @param { String } id 群聊的 **群号**。
     * @returns { Group } 构造出的群聊。
     */
    static make(id) {
        return Cache.withCache(`group-${ id }`, () => new Group(id));
    }

    /**
     * 构造一个 **群号** 为 `id` 的群聊。
     * 注意：在任何情况下，都不应该直接使用该构造器来构造群聊。相反地，你应该使用 `Group.make(id)` 函数来构造群聊。
     * @param { String } id 群聊的 **群号**。
     */
    constructor(id) {
        super(id);
    }

    /**
     * 返回该群聊的 `#name` 属性。
     * @returns { String } 该群聊的 `#name` 属性。
     */
    getName() {
        return this.#name;
    }

    /**
     * 返回该群聊的 `#maxMemberCount` 属性。
     * @returns { Number } 该群聊的 `#maxMemberCount` 属性。
     */
    getMaxMemberCount() {
        return this.#maxMemberCount;
    }

    /**
     * 返回该群聊的 `#memberCount` 属性。
     * @returns { Number } 该群聊的 `#memberCount` 属性。
     */
    getMemberCount() {
        return this.#memberCount;
    }

    /**
     * 返回该群聊的 `#remark` 属性。
     * @returns { String } 该群聊的 `#remark` 属性。
     */
    getRemark() {
        return this.#remark;
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