'use strict';

class Nahan {
    constructor(ctx) {
        this.req = ctx.req;
        this.res = ctx.res;

        // path
        const path = this.req.url.split('?')[0];
        this.path = {
            full: path,
            chop: '',
            rest: path,
            match: [],
            get last() {
                return this.match[this.match.length - 1];
            },
        };
    }

    // method
    get method() {
        return this.req.method;
    }
    set method(val) {
        this.req.method = val.toUpperCase();
    }
}

module.exports = Nahan;
