'use strict';

const init_path = require('./lib/path');

function Context() {

    async function context(ctx, next) {

        init_path(ctx);

        await next();
    };

    return context;
}

module.exports = Context;
