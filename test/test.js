'use strict';

const http = require('http');
const request = require('supertest');
const expect = require('chai').expect;

const { Pipeline, Branch } = require('nahan-onion');
const Path = require('nahan-path');
const Context = require('..');

function Test(done, Func) {
    return (ctx, next) => {
        try {
            Func(ctx);
            done();
        } catch (e) {
            done(e);
        }
        return next();;
    }
}

function Callback(url, Func, opts = []) {
    return (done) => {
        const app = Pipeline(
            async (ctx, next) => { await next(); ctx.res.end(); },
            Context(opts[0]),
            Context(opts[1]),

            Branch(Path('/path'), Test(done, Func)),
            Test(done, Func),
        );

        request((req, res) => app({ req, res })).get(url).end(() => { });
    }
}

describe('Context', () => {

    describe('Options: koa', () => {

        it('test (1)', Callback('/', ctx => {
            expect(ctx.path).to.equal(undefined);
            expect(ctx._nh.ctx_koa).to.equal(true);
        }, [{ koa: true }, { koa: true }]));

        it('test (2)', Callback('/', ctx => {
            expect(ctx).to.equal(ctx.nh);
            expect(ctx._nh.ctx_koa).to.equal(false);
        }, [{ koa: true }, { koa: false }]));
    });

    describe('Attribute: path', () => {

        it('Default', Callback('/', ctx => {
            const path = ctx.path;
            expect(path.full).to.eql('/');
            expect(path.chop).to.eql('');
            expect(path.rest).to.eql('/');
            expect(path.match).to.eql([]);
            expect(path.last).to.eql(undefined);
        }));

        it("After Path('/path')", Callback('/path', ctx => {
            const path = ctx.path;
            expect(path.full).to.eql('/path');
            expect(path.chop).to.eql('');
            expect(path.rest).to.eql('/path');
            expect(path.match).to.eql([['/path']]);
            expect(path.last).to.equal(path.match[path.match.length - 1]);
        }));
    });

    describe('Attribute: method', () => {

        it('Get', Callback('/', ctx => {
            expect(ctx.method).to.eql(ctx.req.method).to.eql('GET');
        }));

        it('Set', Callback('/', ctx => {
            ctx.method = 'put';
            expect(ctx.method).to.eql(ctx.req.method).to.eql('PUT');
        }));
    })
});
