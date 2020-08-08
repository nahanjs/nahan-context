'use strict';

function init_path(ctx) {

    if (ctx.path) return;

    const path = ctx.req.url.split('?')[0];

    ctx.path = {
        full: path,
        rest: path,
        chop: '',
        match: [],
    };
}

module.exports = init_path;
