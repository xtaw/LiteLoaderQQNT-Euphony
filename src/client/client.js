import { Cache, Friend } from '../index.js';

/**
 * `Client` 类型代表自身客户端。
 * @property { Array } #friends 客户端好友列表。
 */
class Client {

    static #friends = [];

    static {
        euphonyNative.subscribeEvent('onBuddyListChange', payload => {
            const friends = [];
            for (const category of payload.data) {
                for (const friend of category.buddyList) {
                    friends.push(Friend.make(friend.uin, friend.uid));
                }
            }
            Client.#friends = friends;
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
     * @returns { Array } 客户端好友列表。
     */
    static getFriends() {
        return Client.#friends;
    }

}

export default Client