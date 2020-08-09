'use strict';

const Nahan = require('./lib/nahan');

function Context(options) {

    options = options || {};
    options.koa = options.koa || false;

    function context(ctx, next) {

        if (ctx.nh === undefined)
            ctx.nh = new Nahan(ctx);

        ctx._nh = ctx._nh || {};
        const _nh = ctx._nh;

        _nh.ctx_koa = options.koa;
        if (!_nh.ctx_koa)
            ctx._nh_new = ctx.nh;

        return next();
    };

    return context;
}

module.exports = Context;
