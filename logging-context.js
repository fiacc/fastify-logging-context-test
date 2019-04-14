'use strict';

const {
    getNamespace
} = require('node-request-context');
const pino = require('pino');

const getLoggingContext = () => {

    const namespace = getNamespace('mynamespace2');
    return namespace.get('loggingContext');
};


// const getLogger = () => pino().child(getLoggingContext());

const getLogger = getLoggingContext;


module.exports = {
    getLoggingContext,
    getLogger
};