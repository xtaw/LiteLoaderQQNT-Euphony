import { Cache, Friend, Group } from '../index.js';

/**
 * `Client` 类型代表自身客户端。
 * @property { Array } #friends 客户端好友列表。
 */
class Client {

    static #friends = [];
    static #groups = [];

    static {
        euphonyNative.subscribeEvent('onBuddyListChange', payload => {
            const friends = [];
            for (const category of payload.data) {
                for (const buddy of category.buddyList) {
                    friends.push(Friend.make(buddy.uin, buddy.uid));
                }
            }
            Client.#friends = friends;
        });
        euphonyNative.subscribeEvent('onGroupListUpdate', payload => {
            if (payload.updateType == 1) {
                const groups = [];
                for (const nativeGroup of payload.groupList) {
                    groups.push(Group.make(nativeGroup.groupCode));
                }
                Client.#groups = groups;
            } else {
                euphonyNative.invokeNative('ns-ntApi', 'nodeIKernelGroupService/getGroupList', false, { forceFetch: true });
            }
        });
    }

    /**
     * 获取客户端登录账号的 **qq号**。
     * @returns { String } 客户端登录账号的 **qq号**。
     */
    static async getUin() {
        return await Cache.withCacheAsync('client-uin', async () => (await euphonyNative.invokeNative('ns-GlobalDataApi', 'fetchAuthData', false)).uin);
    }

    /**
     * 获取客户端登录账号的 **uid**。
     * @returns { String } 客户端登录账号的 **uid**。 
     */
    static async getUid() {
        return await Cache.withCacheAsync('client-uid', async () => (await euphonyNative.invokeNative('ns-GlobalDataApi', 'fetchAuthData', false)).uid);
    }

    /**
     * 获取客户端好友列表。
     * @returns { Array<Friend> } 客户端好友列表。
     */
    static getFriends() {
        return Client.#friends;
    }

    /**
     * 获取客户端群列表。
     * @returns { Array<Group> } 客户端群列表。
     */
    static getGroups() {
        return Client.#groups;
    }

}

export default Client