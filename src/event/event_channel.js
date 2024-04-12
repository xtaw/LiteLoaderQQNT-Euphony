class EventChannel {

    #registry = new Map();

    static #GLOBAL = new EventChannel();

    static global() {
        return EventChannel.#GLOBAL;
    }

    subscribeEvent(eventName, handler) {
        if (!this.#registry.has(eventName)) {
            this.#registry.set(eventName, []);
        }
        this.#registry.get(eventName).push(handler);
        return handler;
    }

    unsubscribeEvent(eventName, handler) {
        const event = this.#registry.get(eventName);
        if (event) {
            const index = event.indexOf(handler);
            if (index != -1) {
                event.splice(index, 1);
            }
        }
    }

    call(eventName, ...args) {
        this.#registry.get(eventName)?.forEach(handler => handler(...args));
    }

}

export default EventChannel