'use strict';
const fp = require('fastify-plugin')
const {
    createNamespace
} = require('node-request-context');

module.exports = fp(function (fastify, opts, next) {

    const {
        namespace: namespaceName
    } = Object.assign({
        namespace: 'fastify-logging-context'
    }, opts);

    const namespace = createNamespace(namespaceName);
    fastify.addHook('onRequest', (request, reply, callback) => {
        namespace.run(() => {

            const context = {
                ...request.log.bindings(),
                requestId: request.id,
                hello: 'world'
            };

            request.log = request.log.child(context)
            namespace.set('loggingContext', request.log)

            callback()
        });
    });

    fastify.decorate('loggingContext', {
        getter() {
            return namespace.get('loggingContext')
        }
    })


    next()
}, {
    fastify: '2.x',
    name: 'fastify-logging-context'
})