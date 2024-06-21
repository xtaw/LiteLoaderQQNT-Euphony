import { Friend, Group, ClientKey, LuckyCard, Base64Util } from '../index.js';

/**
 * `Client` 类型代表自身客户端。
 */
class Client {

    /**
     * 获取客户端登录账号的 **qq号**。
     * 
     * @returns { String } 客户端登录账号的 **qq号**。
     */
    static getUin() {
        return app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Auth?.authData?.uin;
    }

    /**
     * 获取客户端登录账号的 **uid**。
     * 
     * @returns { String } 客户端登录账号的 **uid**。 
     */
    static getUid() {
        return app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Auth?.authData?.uid;
    }

    /**
     * 获取客户端好友列表。
     * 
     * @returns { Array<Friend> } 客户端好友列表。
     */
    static getFriends() {
        const buddyMap = app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Contact_buddy?.buddyMap;
        if (!buddyMap) {
            return null;
        }
        const result = [];
        for (const uid in buddyMap) {
            result.push(Friend.make(buddyMap[uid].uin, uid));
        }
        return result;
    }

    /**
     * 获取客户端群列表。
     * 
     * @returns { Array<Group> } 客户端群列表。
     */
    static getGroups() {
        const groupList = app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Contact_group?.groupList;
        if (!groupList) {
            return null;
        }
        const result = [];
        for (const nativeGroup of groupList) {
            result.push(Group.make(nativeGroup.groupCode));
        }
        return result;
    }

    /**
     * 获取客户端登录账号的 clientKey。
     * 
     * 若获取失败，则返回错误信息。
     * 
     * @returns { ClientKey | Object } 客户端登录账号的 clientKey。
     */
    static async getClientKey() {
        const result = await euphonyInternal.getClientKey();
        if (result.result == 0) {
            return new ClientKey(result.clientKey, result.keyIndex, result.expireTime, result.url);
        }
        return {
            error: result.errMsg
        };
    }

    /**
     * 获取特定作用域的客户端登录账号的 pskey。
     * 
     * 若获取失败，则返回错误信息。
     * 
     * @param { String } domain pskey 的作用域。
     * @param { ClientKey } clientKey 客户端登录账号的 clientKey。若为空，则会自动获取。
     * @returns { String | Object } 作用域为 `domain` 的客户端登录账号的 pskey。
     */
    static async getPskey(domain, clientKey) {
        if (!clientKey) {
            clientKey = await Client.getClientKey();
            if (clientKey.error) {
                return {
                    error: `An error occurred while getting client key. Details: ${ clientKey.error }`
                };
            }
        }
        return await euphonyInternal.getPskey(Client.getUin(), clientKey.key, clientKey.keyIndex, domain);
    }

    /**
     * 抽取幸运字符。
     * 
     * 若抽取失败，则返回错误信息。
     * 
     * @param { String } uin 要抽取幸运字符的好友的 **qq号**。
     * @param { String } pskey 客户端登录账号的 pskey。若为空，则会自动获取。
     * @returns { LuckyCard | Object } 抽取结果。
     */
    static async drawLuckyCard(uin, pskey) {
        if (!pskey) {
            pskey = await Client.getPskey('ti.qq.com');
        }
        const result = await euphonyInternal.drawLuckyCard(Client.getUin(), uin, pskey);
        if (result.error) {
            return result;
        }
        if (result.ActionStatus != 'OK') {
            return {
                error: `Failed to draw lucky card. Details: ${ result.ErrorInfo }`
            };
        }
        return new LuckyCard(Base64Util.decode(result.card_id), Base64Util.decode(result.card_url), Base64Util.decode(result.card_word), result.rpt_wording.map(value => Base64Util.decode(value)).join('\n'));
    }

    /**
     * 获取自身是否为 qq 会员。
     * 
     * @returns { Boolean } 自身是否为 qq 会员。
     */
    static isVip() {
        return app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Auth?.selfProfileInfo?.vipFlag;
    }

    /**
     * 获取自身是否为 qq 超级会员。
     * 
     * @returns { Boolean } 自身是否为 qq 超级会员。
     */
    static isSvip() {
        return app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Auth?.selfProfileInfo?.svipFlag;
    }

    /**
     * 获取自身是否为 qq 年会员。
     * 
     * @returns { Boolean } 自身是否为 qq 年会员。
     */
    static isYearVip() {
        return app?.__vue_app__?.config?.globalProperties?.$store?.state?.common_Auth?.selfProfileInfo?.yearVipFlag;
    }

}

export default Client