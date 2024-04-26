import { Cache, Friend, Group } from '../index.js';

/**
 * `Client` 类型代表自身客户端。
 * 
 * @property { Set<Friend> } #friends 客户端好友列表。
 * @property { Set<Group> } #groups 客户端群列表。
 */
class Client {

    static #friends = new Set();
    static #groups = new Set();

    static {
        euphonyNative.subscribeEvent('onBuddyListChange', payload => {
            const friends = new Set();
            for (const category of payload.data) {
                for (const buddy of category.buddyList) {
                    friends.add(Friend.make(buddy.uin, buddy.uid));
                }
            }
            Client.#friends = friends;
        });
        euphonyNative.subscribeEvent('onGroupListUpdate', payload => {
            if (payload.updateType == 3) {
                for (const nativeGroup of payload.groupList) {
                    Client.#groups.delete(Group.make(nativeGroup.groupCode));
                }
            } else {
                for (const nativeGroup of payload.groupList) {
                    Client.#groups.add(Group.make(nativeGroup.groupCode));
                }
            }
        });
    }

    /**
     * 获取客户端登录账号的 **qq号**。
     * 
     * @returns { String } 客户端登录账号的 **qq号**。
     */
    static async getUin() {
        return await Cache.withCacheAsync('client-uin', async () => (await euphonyNative.invokeNative('ns-GlobalDataApi', 'fetchAuthData', false)).uin);
    }

    /**
     * 获取客户端登录账号的 **uid**。
     * 
     * @returns { String } 客户端登录账号的 **uid**。 
     */
    static async getUid() {
        return await Cache.withCacheAsync('client-uid', async () => (await euphonyNative.invokeNative('ns-GlobalDataApi', 'fetchAuthData', false)).uid);
    }

    /**
     * 获取客户端好友列表。
     * 
     * @returns { Set<Friend> } 客户端好友列表。
     */
    static getFriends() {
        return Client.#friends;
    }

    /**
     * 获取客户端群列表。
     * 
     * @returns { Set<Group> } 客户端群列表。
     */
    static getGroups() {
        return Client.#groups;
    }

}

export default Client