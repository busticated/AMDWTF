/* jshint */
/*global define: false, require: false, sinon: false, start: false, stop: false */

var testing = (function () {
    'use strict';
    var idx = 0;
    var urlBuster = "bust=" + (new Date()).getTime();

    if (typeof require === 'undefined') {
        throw new Error('RequireJS library is not available - please load require.js');
    }

    if (typeof sinon === 'undefined') {
        throw new Error('Sinon library is not available - please load sinon.js');
    }

    if (typeof start === 'undefined' || typeof stop === 'undefined') {
        throw new Error('QUnit library is not available - please load qunit.js');
    }

    Object.keys = Object.keys || function (o) {
        var result = [];
        for (var name in o) {
            if (o.hasOwnProperty(name)) {
                result.push(name);
            }
        }
        return result;
    };

    var isArray = function( a ){
        return Object.prototype.toString.call( a ) === '[object Array]';
    };

    var isObject = function( o ){
        return typeof o === 'object' && !isArray( o );
    };

    var mergeObjects = function( target, source ){
        var value;
        for ( var prop in source ){
            if ( source.hasOwnProperty( prop ) ){
                value = source[ prop ];
                target[ prop ] = isObject( value ) ? mergeObjects( target[ prop ] || {}, value ) : source[ prop ];
            }
        }

        return target;
    };

    var withRequireContext = function (config) {
        var defaultConfigs = {
            baseUrl: '../../',
            paths: {
                'jquery': 'http://code.jquery.com/jquery-latest'
            },
            urlArgs: urlBuster,
            context: 'req' + (idx += 1)
        };

        mergeObjects(defaultConfigs, config);

        var req = require.config(defaultConfigs);

        req.using = function (moduleId, implementation) {
            define(moduleId, implementation);
        };

        req.given = function (modules, callback) {

            if (typeof (modules) === 'string') {
                modules = [modules];
            }

            stop();
            req(modules, function () {
                start();
                return callback.apply(null, arguments);
            });
        };

        return req;
    };

    // public api ////////////////////////////////////////////////////////////////
    return {
        withRequireContext: withRequireContext,
        sandbox: null,
        req: null,
        utils: {
            isArray: isArray,
            isObject: isObject,
            mergeObjects: mergeObjects
        },
        setupAndTeardown: {
            setup: function (config) {
                testing.sandbox = sinon.sandbox.create();
                testing.req = withRequireContext(config);
            },
            teardown: function () {
                testing.sandbox.restore();
                testing.sandbox = null;
                testing.req = null;
            }
        }
    };
})();
