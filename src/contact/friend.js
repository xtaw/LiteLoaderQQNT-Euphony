import Contact from "./contact.js";

class Friend extends Contact {

    #uid;

    static fromUin(uin) {
        const uid = euphonyNative.convertUinToUid(uin);
        if (!uid) {
            return null;
        }
        return new Friend(uin, uid);
    }

    static fromUid(uid) {
        const uin = euphonyNative.convertUidToUin(uid);
        if (!uin) {
            return null;
        }
        return new Friend(uin, uid);
    }

    constructor(uin, uid) {
        super(String(uin));
        this.#uid = uid;
    }

    getUid() {
        return this.#uid;
    }

    toPeer() {
        return {
            chatType: 1,
            peerUid: this.#uid,
            guildId: ''
        };
    }

}

export default Friend