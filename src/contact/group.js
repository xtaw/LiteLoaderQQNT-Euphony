import Contact from "./contact.js";

class Group extends Contact {

    constructor(id) {
        super(String(id));
    }

    toPeer() {
        return {
            chatType: 2,
            peerUid: this.getId(),
            guildId: ''
        };
    }

}

export default Group