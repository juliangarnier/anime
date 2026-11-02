/**
 * Anime.js - adapters - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

require('./resolvers.cjs');
require('./uniform.cjs');
require('./object3d.cjs');
var instance = require('./instance.cjs');
var adapter = require('./adapter.cjs');



exports.commitChanges = instance.commitChanges;
exports.getInstances = instance.getInstances;
exports.threeAdapter = adapter.threeAdapter;
