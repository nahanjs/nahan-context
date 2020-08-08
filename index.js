'use strict';

function Context() {

    async function context(ctx, next) {
        await next();
    };

    return context;
}

module.exports = Context;
