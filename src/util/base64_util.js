class Base64Util {

    static encode(value) {
        return btoa(encodeURIComponent(value).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(Number('0x' + p1))));
    }

    static decode(value) {
        return decodeURIComponent(atob(value).split('').map(c => `%${ `00${ c.charCodeAt(0).toString(16) }`.slice(-2) }`).join(''));
    }

}

export default Base64Util