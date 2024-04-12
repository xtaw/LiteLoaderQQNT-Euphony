class MessageChain {

    #messages = [];

    append(value) {
        this.#messages.push(value);
        return this;
    }

    pop() {
        this.#messages.pop();
        return this;
    }

    remove(index) {
        this.#messages.splice(index, 1);
        return this;
    }

    async toElements() {
        return await Promise.all(this.#messages.map(async message => await message.toElement()));
    }

}

export default MessageChain