'use strict';

const fastify = require('fastify')({
    logger: true
})

const options = {
    namespace: 'mynamespace2'
};

fastify.register(require('./fastify-logging-context'), options)

const {
    doDBThing
} = require('./db')


const handler = async (request, reply) => {

    const id = Math.random();
    request.log.info('here', id)
    const result = await doDBThing(id)

    reply.code((id + 1) === result ? 200 : 418).send()

}

fastify.get('/', handler)


fastify.listen(3000, (err, address) => {
    if (err) throw err
    fastify.log.info(`server listening on ${address}`)
})