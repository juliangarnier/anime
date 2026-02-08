/**
 * Anime.js - scope - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var globals = require('../core/globals.cjs');
var helpers = require('../core/helpers.cjs');
var targets = require('../core/targets.cjs');
var time = require('../utils/time.cjs');

/**
 * @import {
 *   Tickable,
 *   ScopeParams,
 *   DOMTarget,
 *   ReactRef,
 *   AngularRef,
 *   DOMTargetSelector,
 *   DefaultsParams,
 *   ScopeConstructorCallback,
 *   ScopeCleanupCallback,
 *   Revertible,
 *   ScopeMethod,
 *   ScopedCallback,
 * } from '../types/index.js'
*/

class Scope {
  /** @param {ScopeParams} [parameters] */
  constructor(parameters = {}) {
    if (globals.scope.current) globals.scope.current.register(this);
    const rootParam = parameters.root;
    /** @type {Document|DOMTarget} */
    let root = consts.doc;
    if (rootParam) {
      root = /** @type {ReactRef} */(rootParam).current ||
             /** @type {AngularRef} */(rootParam).nativeElement ||
             targets.parseTargets(/** @type {DOMTargetSelector} */(rootParam))[0] ||
             consts.doc;
    }
    const scopeDefaults = parameters.defaults;
    const globalDefault = globals.globals.defaults;
    const mediaQueries = parameters.mediaQueries;
    /** @type {DefaultsParams} */
    this.defaults = scopeDefaults ? helpers.mergeObjects(scopeDefaults, globalDefault) : globalDefault;
    /** @type {Document|DOMTarget} */
    this.root = root;
    /** @type {Array<ScopeConstructorCallback>} */
    this.constructors = [];
    /** @type {Array<ScopeCleanupCallback>} */
    this.revertConstructors = [];
    /** @type {Array<Revertible>} */
    this.revertibles = [];
    /** @type {Array<ScopeConstructorCallback | ((scope: this) => Tickable)>} */
    this.constructorsOnce = [];
    /** @type {Array<ScopeCleanupCallback>} */
    this.revertConstructorsOnce = [];
    /** @type {Array<Revertible>} */
    this.revertiblesOnce = [];
    /** @type {Boolean} */
    this.once = false;
    /** @type {Number} */
    this.onceIndex = 0;
    /** @type {Record<String, ScopeMethod>} */
    this.methods = {};
    /** @type {Record<String, Boolean>} */
    this.matches = {};
    /** @type {Record<String, MediaQueryList>} */
    this.mediaQueryLists = {};
    /** @type {Record<String, any>} */
    this.data = {};
    if (mediaQueries) {
      for (let mq in mediaQueries) {
        const _mq = consts.win.matchMedia(mediaQueries[mq]);
        this.mediaQueryLists[mq] = _mq;
        _mq.addEventListener('change', this);
      }
    }
  }

  /**
   * @param {Revertible} revertible
   */
  register(revertible) {
    const store = this.once ? this.revertiblesOnce : this.revertibles;
    store.push(revertible);
  }

  /**
   * @template T
   * @param {ScopedCallback<T>} cb
   * @return {T}
   */
  execute(cb) {
    let activeScope = globals.scope.current;
    let activeRoot = globals.scope.root;
    let activeDefaults = globals.globals.defaults;
    globals.scope.current = this;
    globals.scope.root = this.root;
    globals.globals.defaults = this.defaults;
    const mqs = this.mediaQueryLists;
    for (let mq in mqs) this.matches[mq] = mqs[mq].matches;
    const returned = cb(this);
    globals.scope.current = activeScope;
    globals.scope.root = activeRoot;
    globals.globals.defaults = activeDefaults;
    return returned;
  }

  /**
   * @return {this}
   */
  refresh() {
    this.onceIndex = 0;
    this.execute(() => {
      let i = this.revertibles.length;
      let y = this.revertConstructors.length;
      while (i--) this.revertibles[i].revert();
      while (y--) this.revertConstructors[y](this);
      this.revertibles.length = 0;
      this.revertConstructors.length = 0;
      this.constructors.forEach((/** @type {ScopeConstructorCallback} */constructor) => {
        const revertConstructor = constructor(this);
        if (helpers.isFnc(revertConstructor)) {
          this.revertConstructors.push(revertConstructor);
        }
      });
    });
    return this;
  }

  /**
   * @overload
   * @param {String} a1
   * @param {ScopeMethod} a2
   * @return {this}
   *
   * @overload
   * @param {ScopeConstructorCallback} a1
   * @return {this}
   *
   * @param {String|ScopeConstructorCallback} a1
   * @param {ScopeMethod} [a2]
   */
  add(a1, a2) {
    this.once = false;
    if (helpers.isFnc(a1)) {
      const constructor = /** @type {ScopeConstructorCallback} */(a1);
      this.constructors.push(constructor);
      this.execute(() => {
        const revertConstructor = constructor(this);
        if (helpers.isFnc(revertConstructor)) {
          this.revertConstructors.push(revertConstructor);
        }
      });
    } else {
      this.methods[/** @type {String} */(a1)] = (/** @type {any} */...args) => this.execute(() => a2(...args));
    }
    return this;
  }

  /**
   * @param {ScopeConstructorCallback} scopeConstructorCallback
   * @return {this}
   */
  addOnce(scopeConstructorCallback) {
    this.once = true;
    if (helpers.isFnc(scopeConstructorCallback)) {
      const currentIndex = this.onceIndex++;
      const tracked = this.constructorsOnce[currentIndex];
      if (tracked) return this;
      const constructor = /** @type {ScopeConstructorCallback} */(scopeConstructorCallback);
      this.constructorsOnce[currentIndex] = constructor;
      this.execute(() => {
        const revertConstructor = constructor(this);
        if (helpers.isFnc(revertConstructor)) {
          this.revertConstructorsOnce.push(revertConstructor);
        }
      });
    }
    return this;
  }

  /**
   * @param  {(scope: this) => Tickable} cb
   * @return {Tickable}
   */
  keepTime(cb) {
    this.once = true;
    const currentIndex = this.onceIndex++;
    const tracked = /** @type {(scope: this) => Tickable} */(this.constructorsOnce[currentIndex]);
    if (helpers.isFnc(tracked)) return tracked(this);
    const constructor = /** @type {(scope: this) => Tickable} */(time.keepTime(cb));
    this.constructorsOnce[currentIndex] = constructor;
    let trackedTickable;
    this.execute(() => {
      trackedTickable = constructor(this);
    });
    return trackedTickable;
  }

  /**
   * @param {Event} e
   */
  handleEvent(e) {
    switch (e.type) {
      case 'change':
        this.refresh();
        break;
    }
  }

  revert() {
    const revertibles = this.revertibles;
    const revertConstructors = this.revertConstructors;
    const revertiblesOnce = this.revertiblesOnce;
    const revertConstructorsOnce = this.revertConstructorsOnce;
    const mqs = this.mediaQueryLists;
    let i = revertibles.length;
    let j = revertConstructors.length;
    let k = revertiblesOnce.length;
    let l = revertConstructorsOnce.length;
    while (i--) revertibles[i].revert();
    while (j--) revertConstructors[j](this);
    while (k--) revertiblesOnce[k].revert();
    while (l--) revertConstructorsOnce[l](this);
    for (let mq in mqs) mqs[mq].removeEventListener('change', this);
    revertibles.length = 0;
    revertConstructors.length = 0;
    this.constructors.length = 0;
    revertiblesOnce.length = 0;
    revertConstructorsOnce.length = 0;
    this.constructorsOnce.length = 0;
    this.onceIndex = 0;
    this.matches = {};
    this.methods = {};
    this.mediaQueryLists = {};
    this.data = {};
  }
}

/**
 * @param {ScopeParams} [params]
 * @return {Scope}
 */
const createScope = params => new Scope(params);

exports.Scope = Scope;
exports.createScope = createScope;
