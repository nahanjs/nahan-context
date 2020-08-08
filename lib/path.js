'use strict';

function init_path(ctx) {

    if (ctx.path) return;

    const path = ctx.req.url.split('?')[0];

    ctx.path = {
        full: path,
        chop: '',
        rest: path,
        match: [],
        get last() {
            return this.match[this.match.length - 1];
        },
    };
}

module.exports = init_path;
