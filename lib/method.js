'use strict';

function init_method(ctx) {

    if (ctx.method) return;

    Object.defineProperty(ctx, 'method', {
        get() {
            return ctx.req.method;
        },
        set(val) {
            ctx.req.method = val.toUpperCase();
        }
    });
}

module.exports = init_method;
