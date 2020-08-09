'use strict';

const init_path = require('./lib/path');
const init_method = require('./lib/method');

function Context() {

    async function context(ctx, next) {

        init_path(ctx);
        init_method(ctx);

        await next();
    };

    return context;
}

module.exports = Context;
