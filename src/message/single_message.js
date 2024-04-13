class SingleMessage {

    static getElementType() {
        throw new Error('Abstract method not implemented.');
    }

    async toElement() {
        throw new Error('Abstract method not implemented.');
    }

}

export default SingleMessage