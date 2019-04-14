'use strict';

const {
    getLogger
} = require('./logging-context');

const {
    promisify
} = require('util');
const wait = promisify(setTimeout);

const doDBThing = async (id) => {

    await wait(0);

    const logger = getLogger();
    logger.info('in the db thing', id)

    return ++id;
};


module.exports = {
    doDBThing
}