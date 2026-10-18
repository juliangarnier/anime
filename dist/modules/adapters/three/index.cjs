/**
 * Anime.js - adapters - CJS
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var adapter = require('./adapter.cjs');
require('./resolvers.cjs');
require('./uniform.cjs');
require('./object3d.cjs');
var instance = require('./instance.cjs');



exports.threeAdapter = adapter.threeAdapter;
exports.commitChanges = instance.commitChanges;
exports.getInstances = instance.getInstances;
