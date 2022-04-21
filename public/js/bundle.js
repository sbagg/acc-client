/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./public/pages/acc.tpl.js":
/*!*********************************!*\
  !*** ./public/pages/acc.tpl.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./node_modules/lit/index.js");

// import { html } from 'lit';

function render() { 
    return lit__WEBPACK_IMPORTED_MODULE_0__.html`
    
    <style>
      :host {
        display: block;
      }
    
    </style>
    <h1>Welcome to Our Company</h1> 
    <h2>This is the sample for this for right now <b>VERSION: ${this.version}</b></h2>
    <h2>Web Site Main Ingredients:</h2>
    
    <p>Pages (HTML)</p>
    <p>Style Sheets (CSS)</p>
    <p>Computer Code (JavaScript)</p>
    <p>Live Data (Files and Databases)</p>

    <iron-pages selected="0">
        <div>Page 0</div>
        <div>Page 1</div>
        <div>Page 2</div>
        <div>Page 3</div>
      </iron-pages>
    
`;
}

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/css-tag.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/css-tag.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSSResult": () => (/* binding */ CSSResult),
/* harmony export */   "adoptStyles": () => (/* binding */ adoptStyles),
/* harmony export */   "css": () => (/* binding */ css),
/* harmony export */   "getCompatibleStyle": () => (/* binding */ getCompatibleStyle),
/* harmony export */   "supportsAdoptingStyleSheets": () => (/* binding */ supportsAdoptingStyleSheets),
/* harmony export */   "unsafeCSS": () => (/* binding */ unsafeCSS)
/* harmony export */ });
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
const supportsAdoptingStyleSheets = window.ShadowRoot &&
    (window.ShadyCSS === undefined || window.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype;
const constructionToken = Symbol();
const styleSheetCache = new Map();
/**
 * A container for a string of CSS text, that may be used to create a CSSStyleSheet.
 *
 * CSSResult is the return value of `css`-tagged template literals and
 * `unsafeCSS()`. In order to ensure that CSSResults are only created via the
 * `css` tag and `unsafeCSS()`, CSSResult cannot be constructed directly.
 */
class CSSResult {
    constructor(cssText, safeToken) {
        // This property needs to remain unminified.
        this['_$cssResult$'] = true;
        if (safeToken !== constructionToken) {
            throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
        }
        this.cssText = cssText;
    }
    // Note, this is a getter so that it's lazy. In practice, this means
    // stylesheets are not created until the first element instance is made.
    get styleSheet() {
        // Note, if `supportsAdoptingStyleSheets` is true then we assume
        // CSSStyleSheet is constructable.
        let styleSheet = styleSheetCache.get(this.cssText);
        if (supportsAdoptingStyleSheets && styleSheet === undefined) {
            styleSheetCache.set(this.cssText, (styleSheet = new CSSStyleSheet()));
            styleSheet.replaceSync(this.cssText);
        }
        return styleSheet;
    }
    toString() {
        return this.cssText;
    }
}
const textFromCSSResult = (value) => {
    // This property needs to remain unminified.
    if (value['_$cssResult$'] === true) {
        return value.cssText;
    }
    else if (typeof value === 'number') {
        return value;
    }
    else {
        throw new Error(`Value passed to 'css' function must be a 'css' function result: ` +
            `${value}. Use 'unsafeCSS' to pass non-literal values, but take care ` +
            `to ensure page security.`);
    }
};
/**
 * Wrap a value for interpolation in a {@linkcode css} tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
const unsafeCSS = (value) => new CSSResult(typeof value === 'string' ? value : String(value), constructionToken);
/**
 * A template literal tag which can be used with LitElement's
 * {@linkcode LitElement.styles} property to set element styles.
 *
 * For security reasons, only literal string values and number may be used in
 * embedded expressions. To incorporate non-literal values {@linkcode unsafeCSS}
 * may be used inside an expression.
 */
const css = (strings, ...values) => {
    const cssText = strings.length === 1
        ? strings[0]
        : values.reduce((acc, v, idx) => acc + textFromCSSResult(v) + strings[idx + 1], strings[0]);
    return new CSSResult(cssText, constructionToken);
};
/**
 * Applies the given styles to a `shadowRoot`. When Shadow DOM is
 * available but `adoptedStyleSheets` is not, styles are appended to the
 * `shadowRoot` to [mimic spec behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
 * Note, when shimming is used, any styles that are subsequently placed into
 * the shadowRoot should be placed *before* any shimmed adopted styles. This
 * will match spec behavior that gives adopted sheets precedence over styles in
 * shadowRoot.
 */
const adoptStyles = (renderRoot, styles) => {
    if (supportsAdoptingStyleSheets) {
        renderRoot.adoptedStyleSheets = styles.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
    }
    else {
        styles.forEach((s) => {
            const style = document.createElement('style');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const nonce = window['litNonce'];
            if (nonce !== undefined) {
                style.setAttribute('nonce', nonce);
            }
            style.textContent = s.cssText;
            renderRoot.appendChild(style);
        });
    }
};
const cssResultFromStyleSheet = (sheet) => {
    let cssText = '';
    for (const rule of sheet.cssRules) {
        cssText += rule.cssText;
    }
    return unsafeCSS(cssText);
};
const getCompatibleStyle = supportsAdoptingStyleSheets
    ? (s) => s
    : (s) => s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;
//# sourceMappingURL=css-tag.js.map

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/reactive-element.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/reactive-element.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSSResult": () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.CSSResult),
/* harmony export */   "ReactiveElement": () => (/* binding */ ReactiveElement),
/* harmony export */   "adoptStyles": () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.adoptStyles),
/* harmony export */   "css": () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.css),
/* harmony export */   "defaultConverter": () => (/* binding */ defaultConverter),
/* harmony export */   "getCompatibleStyle": () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle),
/* harmony export */   "notEqual": () => (/* binding */ notEqual),
/* harmony export */   "supportsAdoptingStyleSheets": () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.supportsAdoptingStyleSheets),
/* harmony export */   "unsafeCSS": () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.unsafeCSS)
/* harmony export */ });
/* harmony import */ var _css_tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-tag.js */ "./node_modules/@lit/reactive-element/development/css-tag.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c;
var _d;
/**
 * Use this module if you want to create your own base class extending
 * {@link ReactiveElement}.
 * @packageDocumentation
 */


const DEV_MODE = true;
let requestUpdateThenable;
let issueWarning;
const trustedTypes = window
    .trustedTypes;
// Temporary workaround for https://crbug.com/993268
// Currently, any attribute starting with "on" is considered to be a
// TrustedScript source. Such boolean attributes must be set to the equivalent
// trusted emptyScript value.
const emptyStringForBooleanAttribute = trustedTypes
    ? trustedTypes.emptyScript
    : '';
const polyfillSupport = DEV_MODE
    ? window.reactiveElementPolyfillSupportDevMode
    : window.reactiveElementPolyfillSupport;
if (DEV_MODE) {
    // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    const issuedWarnings = ((_a = globalThis.litIssuedWarnings) !== null && _a !== void 0 ? _a : (globalThis.litIssuedWarnings = new Set()));
    // Issue a warning, if we haven't already.
    issueWarning = (code, warning) => {
        warning += ` See https://lit.dev/msg/${code} for more information.`;
        if (!issuedWarnings.has(warning)) {
            console.warn(warning);
            issuedWarnings.add(warning);
        }
    };
    issueWarning('dev-mode', `Lit is in dev mode. Not recommended for production!`);
    // Issue polyfill support warning.
    if (((_b = window.ShadyDOM) === null || _b === void 0 ? void 0 : _b.inUse) && polyfillSupport === undefined) {
        issueWarning('polyfill-support-missing', `Shadow DOM is being polyfilled via \`ShadyDOM\` but ` +
            `the \`polyfill-support\` module has not been loaded.`);
    }
    requestUpdateThenable = (name) => ({
        then: (onfulfilled, _onrejected) => {
            issueWarning('request-update-promise', `The \`requestUpdate\` method should no longer return a Promise but ` +
                `does so on \`${name}\`. Use \`updateComplete\` instead.`);
            if (onfulfilled !== undefined) {
                onfulfilled(false);
            }
        },
    });
}
/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */
const debugLogEvent = DEV_MODE
    ? (event) => {
        const shouldEmit = window
            .emitLitDebugLogEvents;
        if (!shouldEmit) {
            return;
        }
        window.dispatchEvent(new CustomEvent('lit-debug', {
            detail: event,
        }));
    }
    : undefined;
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
/*@__INLINE__*/
const JSCompiler_renameProperty = (prop, _obj) => prop;
const defaultConverter = {
    toAttribute(value, type) {
        switch (type) {
            case Boolean:
                value = value ? emptyStringForBooleanAttribute : null;
                break;
            case Object:
            case Array:
                // if the value is `null` or `undefined` pass this through
                // to allow removing/no change behavior.
                value = value == null ? value : JSON.stringify(value);
                break;
        }
        return value;
    },
    fromAttribute(value, type) {
        let fromValue = value;
        switch (type) {
            case Boolean:
                fromValue = value !== null;
                break;
            case Number:
                fromValue = value === null ? null : Number(value);
                break;
            case Object:
            case Array:
                // Do *not* generate exception when invalid JSON is set as elements
                // don't normally complain on being mis-configured.
                // TODO(sorvell): Do generate exception in *dev mode*.
                try {
                    // Assert to adhere to Bazel's "must type assert JSON parse" rule.
                    fromValue = JSON.parse(value);
                }
                catch (e) {
                    fromValue = null;
                }
                break;
        }
        return fromValue;
    },
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
const notEqual = (value, old) => {
    // This ensures (old==NaN, value==NaN) always returns false
    return old !== value && (old === old || value === value);
};
const defaultPropertyDeclaration = {
    attribute: true,
    type: String,
    converter: defaultConverter,
    reflect: false,
    hasChanged: notEqual,
};
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
const finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */
class ReactiveElement extends HTMLElement {
    constructor() {
        super();
        this.__instanceProperties = new Map();
        /**
         * True if there is a pending update as a result of calling `requestUpdate()`.
         * Should only be read.
         * @category updates
         */
        this.isUpdatePending = false;
        /**
         * Is set to `true` after the first update. The element code cannot assume
         * that `renderRoot` exists before the element `hasUpdated`.
         * @category updates
         */
        this.hasUpdated = false;
        /**
         * Name of currently reflecting property
         */
        this.__reflectingProperty = null;
        this._initialize();
    }
    /**
     * Adds an initializer function to the class that is called during instance
     * construction.
     *
     * This is useful for code that runs against a `ReactiveElement`
     * subclass, such as a decorator, that needs to do work for each
     * instance, such as setting up a `ReactiveController`.
     *
     * ```ts
     * const myDecorator = (target: typeof ReactiveElement, key: string) => {
     *   target.addInitializer((instance: ReactiveElement) => {
     *     // This is run during construction of the element
     *     new MyController(instance);
     *   });
     * }
     * ```
     *
     * Decorating a field will then cause each instance to run an initializer
     * that adds a controller:
     *
     * ```ts
     * class MyElement extends LitElement {
     *   @myDecorator foo;
     * }
     * ```
     *
     * Initializers are stored per-constructor. Adding an initializer to a
     * subclass does not add it to a superclass. Since initializers are run in
     * constructors, initializers will run in order of the class hierarchy,
     * starting with superclasses and progressing to the instance's class.
     *
     * @nocollapse
     */
    static addInitializer(initializer) {
        var _a;
        (_a = this._initializers) !== null && _a !== void 0 ? _a : (this._initializers = []);
        this._initializers.push(initializer);
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     * @category attributes
     */
    static get observedAttributes() {
        // note: piggy backing on this to ensure we're finalized.
        this.finalize();
        const attributes = [];
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.elementProperties.forEach((v, p) => {
            const attr = this.__attributeNameForProperty(p, v);
            if (attr !== undefined) {
                this.__attributeToPropertyMap.set(attr, p);
                attributes.push(attr);
            }
        });
        return attributes;
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a {@linkcode PropertyDeclaration} for the property with the
     * given options. The property setter calls the property's `hasChanged`
     * property option or uses a strict identity check to determine whether or not
     * to request an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * ```ts
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */
    static createProperty(name, options = defaultPropertyDeclaration) {
        var _a;
        // if this is a state property, force the attribute to false.
        if (options.state) {
            // Cast as any since this is readonly.
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            options.attribute = false;
        }
        // Note, since this can be called by the `@property` decorator which
        // is called before `finalize`, we ensure finalization has been kicked off.
        this.finalize();
        this.elementProperties.set(name, options);
        // Do not generate an accessor if the prototype already has one, since
        // it would be lost otherwise and that would never be the user's intention;
        // Instead, we expect users to call `requestUpdate` themselves from
        // user-defined accessors. Note that if the super has an accessor we will
        // still overwrite it
        if (!options.noAccessor && !this.prototype.hasOwnProperty(name)) {
            const key = typeof name === 'symbol' ? Symbol() : `__${name}`;
            const descriptor = this.getPropertyDescriptor(name, key, options);
            if (descriptor !== undefined) {
                Object.defineProperty(this.prototype, name, descriptor);
                if (DEV_MODE) {
                    // If this class doesn't have its own set, create one and initialize
                    // with the values in the set from the nearest ancestor class, if any.
                    if (!this.hasOwnProperty('__reactivePropertyKeys')) {
                        this.__reactivePropertyKeys = new Set((_a = this.__reactivePropertyKeys) !== null && _a !== void 0 ? _a : []);
                    }
                    this.__reactivePropertyKeys.add(name);
                }
            }
        }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     * ```ts
     * class MyElement extends LitElement {
     *   static getPropertyDescriptor(name, key, options) {
     *     const defaultDescriptor =
     *         super.getPropertyDescriptor(name, key, options);
     *     const setter = defaultDescriptor.set;
     *     return {
     *       get: defaultDescriptor.get,
     *       set(value) {
     *         setter.call(this, value);
     *         // custom action.
     *       },
     *       configurable: true,
     *       enumerable: true
     *     }
     *   }
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */
    static getPropertyDescriptor(name, key, options) {
        return {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            get() {
                return this[key];
            },
            set(value) {
                const oldValue = this[name];
                this[key] = value;
                this.requestUpdate(name, oldValue, options);
            },
            configurable: true,
            enumerable: true,
        };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a `PropertyDeclaration` via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override
     * {@linkcode createProperty}.
     *
     * @nocollapse
     * @final
     * @category properties
     */
    static getPropertyOptions(name) {
        return this.elementProperties.get(name) || defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties, sets up element
     * styling, and ensures any superclasses are also finalized. Returns true if
     * the element was finalized.
     * @nocollapse
     */
    static finalize() {
        if (this.hasOwnProperty(finalized)) {
            return false;
        }
        this[finalized] = true;
        // finalize any superclasses
        const superCtor = Object.getPrototypeOf(this);
        superCtor.finalize();
        this.elementProperties = new Map(superCtor.elementProperties);
        // initialize Map populated in observedAttributes
        this.__attributeToPropertyMap = new Map();
        // make any properties
        // Note, only process "own" properties since this element will inherit
        // any properties defined on the superClass, and finalization ensures
        // the entire prototype chain is finalized.
        if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
            const props = this.properties;
            // support symbols in properties (IE11 does not support this)
            const propKeys = [
                ...Object.getOwnPropertyNames(props),
                ...Object.getOwnPropertySymbols(props),
            ];
            // This for/of is ok because propKeys is an array
            for (const p of propKeys) {
                // note, use of `any` is due to TypeScript lack of support for symbol in
                // index types
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                this.createProperty(p, props[p]);
            }
        }
        this.elementStyles = this.finalizeStyles(this.styles);
        // DEV mode warnings
        if (DEV_MODE) {
            const warnRemovedOrRenamed = (name, renamed = false) => {
                if (this.prototype.hasOwnProperty(name)) {
                    issueWarning(renamed ? 'renamed-api' : 'removed-api', `\`${name}\` is implemented on class ${this.name}. It ` +
                        `has been ${renamed ? 'renamed' : 'removed'} ` +
                        `in this version of LitElement.`);
                }
            };
            warnRemovedOrRenamed('initialize');
            warnRemovedOrRenamed('requestUpdateInternal');
            warnRemovedOrRenamed('_getUpdateComplete', true);
        }
        return true;
    }
    /**
     * Takes the styles the user supplied via the `static styles` property and
     * returns the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * Styles are deduplicated preserving the _last_ instance in the list. This
     * is a performance optimization to avoid duplicated styles that can occur
     * especially when composing via subclassing. The last item is kept to try
     * to preserve the cascade order with the assumption that it's most important
     * that last added styles override previous styles.
     *
     * @nocollapse
     * @category styles
     */
    static finalizeStyles(styles) {
        const elementStyles = [];
        if (Array.isArray(styles)) {
            // Dedupe the flattened array in reverse order to preserve the last items.
            // Casting to Array<unknown> works around TS error that
            // appears to come from trying to flatten a type CSSResultArray.
            const set = new Set(styles.flat(Infinity).reverse());
            // Then preserve original order by adding the set items in reverse order.
            for (const s of set) {
                elementStyles.unshift((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle)(s));
            }
        }
        else if (styles !== undefined) {
            elementStyles.push((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle)(styles));
        }
        return elementStyles;
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
    static __attributeNameForProperty(name, options) {
        const attribute = options.attribute;
        return attribute === false
            ? undefined
            : typeof attribute === 'string'
                ? attribute
                : typeof name === 'string'
                    ? name.toLowerCase()
                    : undefined;
    }
    /**
     * Internal only override point for customizing work done when elements
     * are constructed.
     *
     * @internal
     */
    _initialize() {
        var _a;
        this.__updatePromise = new Promise((res) => (this.enableUpdating = res));
        this._$changedProperties = new Map();
        this.__saveInstanceProperties();
        // ensures first update will be caught by an early access of
        // `updateComplete`
        this.requestUpdate();
        (_a = this.constructor._initializers) === null || _a === void 0 ? void 0 : _a.forEach((i) => i(this));
    }
    /**
     * Registers a `ReactiveController` to participate in the element's reactive
     * update cycle. The element automatically calls into any registered
     * controllers during its lifecycle callbacks.
     *
     * If the element is connected when `addController()` is called, the
     * controller's `hostConnected()` callback will be immediately called.
     * @category controllers
     */
    addController(controller) {
        var _a, _b;
        ((_a = this.__controllers) !== null && _a !== void 0 ? _a : (this.__controllers = [])).push(controller);
        // If a controller is added after the element has been connected,
        // call hostConnected. Note, re-using existence of `renderRoot` here
        // (which is set in connectedCallback) to avoid the need to track a
        // first connected state.
        if (this.renderRoot !== undefined && this.isConnected) {
            (_b = controller.hostConnected) === null || _b === void 0 ? void 0 : _b.call(controller);
        }
    }
    /**
     * Removes a `ReactiveController` from the element.
     * @category controllers
     */
    removeController(controller) {
        var _a;
        // Note, if the indexOf is -1, the >>> will flip the sign which makes the
        // splice do nothing.
        (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.splice(this.__controllers.indexOf(controller) >>> 0, 1);
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
    __saveInstanceProperties() {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        this.constructor.elementProperties.forEach((_v, p) => {
            if (this.hasOwnProperty(p)) {
                this.__instanceProperties.set(p, this[p]);
                delete this[p];
            }
        });
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     *
     * @return Returns a node into which to render.
     * @category rendering
     */
    createRenderRoot() {
        var _a;
        const renderRoot = (_a = this.shadowRoot) !== null && _a !== void 0 ? _a : this.attachShadow(this.constructor.shadowRootOptions);
        (0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.adoptStyles)(renderRoot, this.constructor.elementStyles);
        return renderRoot;
    }
    /**
     * On first connection, creates the element's renderRoot, sets up
     * element styling, and enables updating.
     * @category lifecycle
     */
    connectedCallback() {
        var _a;
        // create renderRoot before first update.
        if (this.renderRoot === undefined) {
            this.renderRoot = this.createRenderRoot();
        }
        this.enableUpdating(true);
        (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.forEach((c) => { var _a; return (_a = c.hostConnected) === null || _a === void 0 ? void 0 : _a.call(c); });
    }
    /**
     * Note, this method should be considered final and not overridden. It is
     * overridden on the element instance with a function that triggers the first
     * update.
     * @category updates
     */
    enableUpdating(_requestedUpdate) { }
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     * @category lifecycle
     */
    disconnectedCallback() {
        var _a;
        (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.forEach((c) => { var _a; return (_a = c.hostDisconnected) === null || _a === void 0 ? void 0 : _a.call(c); });
    }
    /**
     * Synchronizes property values when attributes change.
     *
     * Specifically, when an attribute is set, the corresponding property is set.
     * You should rarely need to implement this callback. If this method is
     * overridden, `super.attributeChangedCallback(name, _old, value)` must be
     * called.
     *
     * See [using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)
     * on MDN for more information about the `attributeChangedCallback`.
     * @category attributes
     */
    attributeChangedCallback(name, _old, value) {
        this._$attributeToProperty(name, value);
    }
    __propertyToAttribute(name, value, options = defaultPropertyDeclaration) {
        var _a, _b;
        const attr = this.constructor.__attributeNameForProperty(name, options);
        if (attr !== undefined && options.reflect === true) {
            const toAttribute = (_b = (_a = options.converter) === null || _a === void 0 ? void 0 : _a.toAttribute) !== null && _b !== void 0 ? _b : defaultConverter.toAttribute;
            const attrValue = toAttribute(value, options.type);
            if (DEV_MODE &&
                this.constructor.enabledWarnings.indexOf('migration') >= 0 &&
                attrValue === undefined) {
                issueWarning('undefined-attribute-value', `The attribute value for the ${name} property is ` +
                    `undefined on element ${this.localName}. The attribute will be ` +
                    `removed, but in the previous version of \`ReactiveElement\`, ` +
                    `the attribute would not have changed.`);
            }
            // Track if the property is being reflected to avoid
            // setting the property again via `attributeChangedCallback`. Note:
            // 1. this takes advantage of the fact that the callback is synchronous.
            // 2. will behave incorrectly if multiple attributes are in the reaction
            // stack at time of calling. However, since we process attributes
            // in `update` this should not be possible (or an extreme corner case
            // that we'd like to discover).
            // mark state reflecting
            this.__reflectingProperty = name;
            if (attrValue == null) {
                this.removeAttribute(attr);
            }
            else {
                this.setAttribute(attr, attrValue);
            }
            // mark state not reflecting
            this.__reflectingProperty = null;
        }
    }
    /** @internal */
    _$attributeToProperty(name, value) {
        var _a, _b, _c;
        const ctor = this.constructor;
        // Note, hint this as an `AttributeMap` so closure clearly understands
        // the type; it has issues with tracking types through statics
        const propName = ctor.__attributeToPropertyMap.get(name);
        // Use tracking info to avoid reflecting a property value to an attribute
        // if it was just set because the attribute changed.
        if (propName !== undefined && this.__reflectingProperty !== propName) {
            const options = ctor.getPropertyOptions(propName);
            const converter = options.converter;
            const fromAttribute = (_c = (_b = (_a = converter) === null || _a === void 0 ? void 0 : _a.fromAttribute) !== null && _b !== void 0 ? _b : (typeof converter === 'function'
                ? converter
                : null)) !== null && _c !== void 0 ? _c : defaultConverter.fromAttribute;
            // mark state reflecting
            this.__reflectingProperty = propName;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this[propName] = fromAttribute(value, options.type);
            // mark state not reflecting
            this.__reflectingProperty = null;
        }
    }
    /**
     * Requests an update which is processed asynchronously. This should be called
     * when an element should update based on some state not triggered by setting
     * a reactive property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored.
     *
     * @param name name of requesting property
     * @param oldValue old value of requesting property
     * @param options property options to use instead of the previously
     *     configured options
     * @category updates
     */
    requestUpdate(name, oldValue, options) {
        let shouldRequestUpdate = true;
        // If we have a property key, perform property update steps.
        if (name !== undefined) {
            options =
                options ||
                    this.constructor.getPropertyOptions(name);
            const hasChanged = options.hasChanged || notEqual;
            if (hasChanged(this[name], oldValue)) {
                if (!this._$changedProperties.has(name)) {
                    this._$changedProperties.set(name, oldValue);
                }
                // Add to reflecting properties set.
                // Note, it's important that every change has a chance to add the
                // property to `_reflectingProperties`. This ensures setting
                // attribute + property reflects correctly.
                if (options.reflect === true && this.__reflectingProperty !== name) {
                    if (this.__reflectingProperties === undefined) {
                        this.__reflectingProperties = new Map();
                    }
                    this.__reflectingProperties.set(name, options);
                }
            }
            else {
                // Abort the request if the property should not be considered changed.
                shouldRequestUpdate = false;
            }
        }
        if (!this.isUpdatePending && shouldRequestUpdate) {
            this.__updatePromise = this.__enqueueUpdate();
        }
        // Note, since this no longer returns a promise, in dev mode we return a
        // thenable which warns if it's called.
        return DEV_MODE
            ? requestUpdateThenable(this.localName)
            : undefined;
    }
    /**
     * Sets up the element to asynchronously update.
     */
    async __enqueueUpdate() {
        this.isUpdatePending = true;
        try {
            // Ensure any previous update has resolved before updating.
            // This `await` also ensures that property changes are batched.
            await this.__updatePromise;
        }
        catch (e) {
            // Refire any previous errors async so they do not disrupt the update
            // cycle. Errors are refired so developers have a chance to observe
            // them, and this can be done by implementing
            // `window.onunhandledrejection`.
            Promise.reject(e);
        }
        const result = this.scheduleUpdate();
        // If `scheduleUpdate` returns a Promise, we await it. This is done to
        // enable coordinating updates with a scheduler. Note, the result is
        // checked to avoid delaying an additional microtask unless we need to.
        if (result != null) {
            await result;
        }
        return !this.isUpdatePending;
    }
    /**
     * Schedules an element update. You can override this method to change the
     * timing of updates by returning a Promise. The update will await the
     * returned Promise, and you should resolve the Promise to allow the update
     * to proceed. If this method is overridden, `super.scheduleUpdate()`
     * must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```ts
     * override protected async scheduleUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.scheduleUpdate();
     * }
     * ```
     * @category updates
     */
    scheduleUpdate() {
        return this.performUpdate();
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * Call `performUpdate()` to immediately process a pending update. This should
     * generally not be needed, but it can be done in rare cases when you need to
     * update synchronously.
     *
     * Note: To ensure `performUpdate()` synchronously completes a pending update,
     * it should not be overridden. In LitElement 2.x it was suggested to override
     * `performUpdate()` to also customizing update scheduling. Instead, you should now
     * override `scheduleUpdate()`. For backwards compatibility with LitElement 2.x,
     * scheduling updates via `performUpdate()` continues to work, but will make
     * also calling `performUpdate()` to synchronously process updates difficult.
     *
     * @category updates
     */
    performUpdate() {
        var _a, _b;
        // Abort any update if one is not pending when this is called.
        // This can happen if `performUpdate` is called early to "flush"
        // the update.
        if (!this.isUpdatePending) {
            return;
        }
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({ kind: 'update' });
        // create renderRoot before first update.
        if (!this.hasUpdated) {
            // Produce warning if any class properties are shadowed by class fields
            if (DEV_MODE) {
                const shadowedProperties = [];
                (_a = this.constructor.__reactivePropertyKeys) === null || _a === void 0 ? void 0 : _a.forEach((p) => {
                    var _a;
                    if (this.hasOwnProperty(p) && !((_a = this.__instanceProperties) === null || _a === void 0 ? void 0 : _a.has(p))) {
                        shadowedProperties.push(p);
                    }
                });
                if (shadowedProperties.length) {
                    throw new Error(`The following properties on element ${this.localName} will not ` +
                        `trigger updates as expected because they are set using class ` +
                        `fields: ${shadowedProperties.join(', ')}. ` +
                        `Native class fields and some compiled output will overwrite ` +
                        `accessors used for detecting changes. See ` +
                        `https://lit.dev/msg/class-field-shadowing ` +
                        `for more information.`);
                }
            }
        }
        // Mixin instance properties once, if they exist.
        if (this.__instanceProperties) {
            // Use forEach so this works even if for/of loops are compiled to for loops
            // expecting arrays
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.__instanceProperties.forEach((v, p) => (this[p] = v));
            this.__instanceProperties = undefined;
        }
        let shouldUpdate = false;
        const changedProperties = this._$changedProperties;
        try {
            shouldUpdate = this.shouldUpdate(changedProperties);
            if (shouldUpdate) {
                this.willUpdate(changedProperties);
                (_b = this.__controllers) === null || _b === void 0 ? void 0 : _b.forEach((c) => { var _a; return (_a = c.hostUpdate) === null || _a === void 0 ? void 0 : _a.call(c); });
                this.update(changedProperties);
            }
            else {
                this.__markUpdated();
            }
        }
        catch (e) {
            // Prevent `firstUpdated` and `updated` from running when there's an
            // update exception.
            shouldUpdate = false;
            // Ensure element can accept additional updates after an exception.
            this.__markUpdated();
            throw e;
        }
        // The update is no longer considered pending and further updates are now allowed.
        if (shouldUpdate) {
            this._$didUpdate(changedProperties);
        }
    }
    /**
     * Invoked before `update()` to compute values needed during the update.
     *
     * Implement `willUpdate` to compute property values that depend on other
     * properties and are used in the rest of the update process.
     *
     * ```ts
     * willUpdate(changedProperties) {
     *   // only need to check changed properties for an expensive computation.
     *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
     *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
     *   }
     * }
     *
     * render() {
     *   return html`SHA: ${this.sha}`;
     * }
     * ```
     *
     * @category updates
     */
    willUpdate(_changedProperties) { }
    // Note, this is an override point for polyfill-support.
    // @internal
    _$didUpdate(changedProperties) {
        var _a;
        (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.forEach((c) => { var _a; return (_a = c.hostUpdated) === null || _a === void 0 ? void 0 : _a.call(c); });
        if (!this.hasUpdated) {
            this.hasUpdated = true;
            this.firstUpdated(changedProperties);
        }
        this.updated(changedProperties);
        if (DEV_MODE &&
            this.isUpdatePending &&
            this.constructor.enabledWarnings.indexOf('change-in-update') >= 0) {
            issueWarning('change-in-update', `Element ${this.localName} scheduled an update ` +
                `(generally because a property was set) ` +
                `after an update completed, causing a new update to be scheduled. ` +
                `This is inefficient and should be avoided unless the next update ` +
                `can only be scheduled as a side effect of the previous update.`);
        }
    }
    __markUpdated() {
        this._$changedProperties = new Map();
        this.isUpdatePending = false;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super.getUpdateComplete()`, then any subsequent state.
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */
    get updateComplete() {
        return this.getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     * ```ts
     * class MyElement extends LitElement {
     *   override async getUpdateComplete() {
     *     const result = await super.getUpdateComplete();
     *     await this._myChild.updateComplete;
     *     return result;
     *   }
     * }
     * ```
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */
    getUpdateComplete() {
        return this.__updatePromise;
    }
    /**
     * Controls whether or not `update()` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
    shouldUpdate(_changedProperties) {
        return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
    update(_changedProperties) {
        if (this.__reflectingProperties !== undefined) {
            // Use forEach so this works even if for/of loops are compiled to for
            // loops expecting arrays
            this.__reflectingProperties.forEach((v, k) => this.__propertyToAttribute(k, this[k], v));
            this.__reflectingProperties = undefined;
        }
        this.__markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
    updated(_changedProperties) { }
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * ```ts
     * firstUpdated() {
     *   this.renderRoot.getElementById('my-text-area').focus();
     * }
     * ```
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
    firstUpdated(_changedProperties) { }
}
_d = finalized;
/**
 * Marks class as having finished creating properties.
 */
ReactiveElement[_d] = true;
/**
 * Memoized list of all element properties, including any superclass properties.
 * Created lazily on user subclasses when finalizing the class.
 * @nocollapse
 * @category properties
 */
ReactiveElement.elementProperties = new Map();
/**
 * Memoized list of all element styles.
 * Created lazily on user subclasses when finalizing the class.
 * @nocollapse
 * @category styles
 */
ReactiveElement.elementStyles = [];
/**
 * Options used when calling `attachShadow`. Set this property to customize
 * the options for the shadowRoot; for example, to create a closed
 * shadowRoot: `{mode: 'closed'}`.
 *
 * Note, these options are used in `createRenderRoot`. If this method
 * is customized, options should be respected if possible.
 * @nocollapse
 * @category rendering
 */
ReactiveElement.shadowRootOptions = { mode: 'open' };
// Apply polyfills if available
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({ ReactiveElement });
// Dev mode warnings...
if (DEV_MODE) {
    // Default warning set.
    ReactiveElement.enabledWarnings = ['change-in-update'];
    const ensureOwnWarnings = function (ctor) {
        if (!ctor.hasOwnProperty(JSCompiler_renameProperty('enabledWarnings', ctor))) {
            ctor.enabledWarnings = ctor.enabledWarnings.slice();
        }
    };
    ReactiveElement.enableWarning = function (warning) {
        ensureOwnWarnings(this);
        if (this.enabledWarnings.indexOf(warning) < 0) {
            this.enabledWarnings.push(warning);
        }
    };
    ReactiveElement.disableWarning = function (warning) {
        ensureOwnWarnings(this);
        const i = this.enabledWarnings.indexOf(warning);
        if (i >= 0) {
            this.enabledWarnings.splice(i, 1);
        }
    };
}
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for ReactiveElement usage.
((_c = globalThis.reactiveElementVersions) !== null && _c !== void 0 ? _c : (globalThis.reactiveElementVersions = [])).push('1.3.1');
if (DEV_MODE && globalThis.reactiveElementVersions.length > 1) {
    issueWarning('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` +
        `is not recommended.`);
}
//# sourceMappingURL=reactive-element.js.map

/***/ }),

/***/ "./node_modules/lit-element/development/lit-element.js":
/*!*************************************************************!*\
  !*** ./node_modules/lit-element/development/lit-element.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSSResult": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.CSSResult),
/* harmony export */   "INTERNAL": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.INTERNAL),
/* harmony export */   "LitElement": () => (/* binding */ LitElement),
/* harmony export */   "ReactiveElement": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement),
/* harmony export */   "UpdatingElement": () => (/* binding */ UpdatingElement),
/* harmony export */   "_$LE": () => (/* binding */ _$LE),
/* harmony export */   "_$LH": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__._$LH),
/* harmony export */   "adoptStyles": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.adoptStyles),
/* harmony export */   "css": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.css),
/* harmony export */   "defaultConverter": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.defaultConverter),
/* harmony export */   "getCompatibleStyle": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle),
/* harmony export */   "html": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.html),
/* harmony export */   "noChange": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.noChange),
/* harmony export */   "notEqual": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.notEqual),
/* harmony export */   "nothing": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.nothing),
/* harmony export */   "render": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.render),
/* harmony export */   "supportsAdoptingStyleSheets": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.supportsAdoptingStyleSheets),
/* harmony export */   "svg": () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.svg),
/* harmony export */   "unsafeCSS": () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.unsafeCSS)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lit/reactive-element */ "./node_modules/@lit/reactive-element/development/reactive-element.js");
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/development/lit-html.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c;
/**
 * The main LitElement module, which defines the {@linkcode LitElement} base
 * class and related APIs.
 *
 *  LitElement components can define a template and a set of observed
 * properties. Changing an observed property triggers a re-render of the
 * element.
 *
 *  Import {@linkcode LitElement} and {@linkcode html} from this module to
 * create a component:
 *
 *  ```js
 * import {LitElement, html} from 'lit-element';
 *
 * class MyElement extends LitElement {
 *
 *   // Declare observed properties
 *   static get properties() {
 *     return {
 *       adjective: {}
 *     }
 *   }
 *
 *   constructor() {
 *     this.adjective = 'awesome';
 *   }
 *
 *   // Define the element's template
 *   render() {
 *     return html`<p>your ${adjective} template here</p>`;
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 * ```
 *
 * `LitElement` extends {@linkcode ReactiveElement} and adds lit-html
 * templating. The `ReactiveElement` class is provided for users that want to
 * build their own custom element base classes that don't use lit-html.
 *
 * @packageDocumentation
 */




// For backwards compatibility export ReactiveElement as UpdatingElement. Note,
// IE transpilation requires exporting like this.
const UpdatingElement = _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement;
const DEV_MODE = true;
let issueWarning;
if (DEV_MODE) {
    // Ensure warnings are issued only 1x, even if multiple versions of Lit
    // are loaded.
    const issuedWarnings = ((_a = globalThis.litIssuedWarnings) !== null && _a !== void 0 ? _a : (globalThis.litIssuedWarnings = new Set()));
    // Issue a warning, if we haven't already.
    issueWarning = (code, warning) => {
        warning += ` See https://lit.dev/msg/${code} for more information.`;
        if (!issuedWarnings.has(warning)) {
            console.warn(warning);
            issuedWarnings.add(warning);
        }
    };
}
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the {@linkcode LitElement.properties properties} property or the
 * {@linkcode property} decorator.
 */
class LitElement extends _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement {
    constructor() {
        super(...arguments);
        /**
         * @category rendering
         */
        this.renderOptions = { host: this };
        this.__childPart = undefined;
    }
    /**
     * @category rendering
     */
    createRenderRoot() {
        var _a;
        var _b;
        const renderRoot = super.createRenderRoot();
        // When adoptedStyleSheets are shimmed, they are inserted into the
        // shadowRoot by createRenderRoot. Adjust the renderBefore node so that
        // any styles in Lit content render before adoptedStyleSheets. This is
        // important so that adoptedStyleSheets have precedence over styles in
        // the shadowRoot.
        (_a = (_b = this.renderOptions).renderBefore) !== null && _a !== void 0 ? _a : (_b.renderBefore = renderRoot.firstChild);
        return renderRoot;
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param changedProperties Map of changed properties with old values
     * @category updates
     */
    update(changedProperties) {
        // Setting properties in `render` should not trigger an update. Since
        // updates are allowed after super.update, it's important to call `render`
        // before that.
        const value = this.render();
        if (!this.hasUpdated) {
            this.renderOptions.isConnected = this.isConnected;
        }
        super.update(changedProperties);
        this.__childPart = (0,lit_html__WEBPACK_IMPORTED_MODULE_1__.render)(value, this.renderRoot, this.renderOptions);
    }
    /**
     * Invoked when the component is added to the document's DOM.
     *
     * In `connectedCallback()` you should setup tasks that should only occur when
     * the element is connected to the document. The most common of these is
     * adding event listeners to nodes external to the element, like a keydown
     * event handler added to the window.
     *
     * ```ts
     * connectedCallback() {
     *   super.connectedCallback();
     *   addEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * Typically, anything done in `connectedCallback()` should be undone when the
     * element is disconnected, in `disconnectedCallback()`.
     *
     * @category lifecycle
     */
    connectedCallback() {
        var _a;
        super.connectedCallback();
        (_a = this.__childPart) === null || _a === void 0 ? void 0 : _a.setConnected(true);
    }
    /**
     * Invoked when the component is removed from the document's DOM.
     *
     * This callback is the main signal to the element that it may no longer be
     * used. `disconnectedCallback()` should ensure that nothing is holding a
     * reference to the element (such as event listeners added to nodes external
     * to the element), so that it is free to be garbage collected.
     *
     * ```ts
     * disconnectedCallback() {
     *   super.disconnectedCallback();
     *   window.removeEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * An element may be re-connected after being disconnected.
     *
     * @category lifecycle
     */
    disconnectedCallback() {
        var _a;
        super.disconnectedCallback();
        (_a = this.__childPart) === null || _a === void 0 ? void 0 : _a.setConnected(false);
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `ChildPart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     * @category rendering
     */
    render() {
        return lit_html__WEBPACK_IMPORTED_MODULE_1__.noChange;
    }
}
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See @lit/reactive-element for more information.
 */
LitElement['finalized'] = true;
// This property needs to remain unminified.
LitElement['_$litElement$'] = true;
// Install hydration if available
(_b = globalThis.litElementHydrateSupport) === null || _b === void 0 ? void 0 : _b.call(globalThis, { LitElement });
// Apply polyfills if available
const polyfillSupport = DEV_MODE
    ? globalThis.litElementPolyfillSupportDevMode
    : globalThis.litElementPolyfillSupport;
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({ LitElement });
// DEV mode warnings
if (DEV_MODE) {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    // Note, for compatibility with closure compilation, this access
    // needs to be as a string property index.
    LitElement['finalize'] = function () {
        const finalized = _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement.finalize.call(this);
        if (!finalized) {
            return false;
        }
        const warnRemovedOrRenamed = (obj, name, renamed = false) => {
            if (obj.hasOwnProperty(name)) {
                const ctorName = (typeof obj === 'function' ? obj : obj.constructor)
                    .name;
                issueWarning(renamed ? 'renamed-api' : 'removed-api', `\`${name}\` is implemented on class ${ctorName}. It ` +
                    `has been ${renamed ? 'renamed' : 'removed'} ` +
                    `in this version of LitElement.`);
            }
        };
        warnRemovedOrRenamed(this, 'render');
        warnRemovedOrRenamed(this, 'getStyles', true);
        warnRemovedOrRenamed(this.prototype, 'adoptStyles');
        return true;
    };
    /* eslint-enable @typescript-eslint/no-explicit-any */
}
/**
 * END USERS SHOULD NOT RELY ON THIS OBJECT.
 *
 * Private exports for use by other Lit packages, not intended for use by
 * external users.
 *
 * We currently do not make a mangled rollup build of the lit-ssr code. In order
 * to keep a number of (otherwise private) top-level exports  mangled in the
 * client side code, we export a _$LE object containing those members (or
 * helper methods for accessing private fields of those members), and then
 * re-export them for use in lit-ssr. This keeps lit-ssr agnostic to whether the
 * client-side code is being used in `dev` mode or `prod` mode.
 *
 * This has a unique name, to disambiguate it from private exports in
 * lit-html, since this module re-exports all of lit-html.
 *
 * @private
 */
const _$LE = {
    _$attributeToProperty: (el, name, value) => {
        // eslint-disable-next-line
        el._$attributeToProperty(name, value);
    },
    // eslint-disable-next-line
    _$changedProperties: (el) => el._$changedProperties,
};
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
((_c = globalThis.litElementVersions) !== null && _c !== void 0 ? _c : (globalThis.litElementVersions = [])).push('3.2.0');
if (DEV_MODE && globalThis.litElementVersions.length > 1) {
    issueWarning('multiple-versions', `Multiple versions of Lit loaded. Loading multiple versions ` +
        `is not recommended.`);
}
//# sourceMappingURL=lit-element.js.map

/***/ }),

/***/ "./node_modules/lit-html/development/lit-html.js":
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/development/lit-html.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INTERNAL": () => (/* binding */ INTERNAL),
/* harmony export */   "_$LH": () => (/* binding */ _$LH),
/* harmony export */   "html": () => (/* binding */ html),
/* harmony export */   "noChange": () => (/* binding */ noChange),
/* harmony export */   "nothing": () => (/* binding */ nothing),
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "svg": () => (/* binding */ svg)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c, _d;
const DEV_MODE = true;
const ENABLE_EXTRA_SECURITY_HOOKS = true;
const ENABLE_SHADYDOM_NOPATCH = true;
/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */
const debugLogEvent = DEV_MODE
    ? (event) => {
        const shouldEmit = window
            .emitLitDebugLogEvents;
        if (!shouldEmit) {
            return;
        }
        window.dispatchEvent(new CustomEvent('lit-debug', {
            detail: event,
        }));
    }
    : undefined;
// Used for connecting beginRender and endRender events when there are nested
// renders when errors are thrown preventing an endRender event from being
// called.
let debugLogRenderId = 0;
/**
 * `true` if we're building for google3 with temporary back-compat helpers.
 * This export is not present in prod builds.
 * @internal
 */
const INTERNAL = true;
let issueWarning;
if (DEV_MODE) {
    (_a = globalThis.litIssuedWarnings) !== null && _a !== void 0 ? _a : (globalThis.litIssuedWarnings = new Set());
    // Issue a warning, if we haven't already.
    issueWarning = (code, warning) => {
        warning += code
            ? ` See https://lit.dev/msg/${code} for more information.`
            : '';
        if (!globalThis.litIssuedWarnings.has(warning)) {
            console.warn(warning);
            globalThis.litIssuedWarnings.add(warning);
        }
    };
    issueWarning('dev-mode', `Lit is in dev mode. Not recommended for production!`);
}
const wrap = ENABLE_SHADYDOM_NOPATCH &&
    ((_b = window.ShadyDOM) === null || _b === void 0 ? void 0 : _b.inUse) &&
    ((_c = window.ShadyDOM) === null || _c === void 0 ? void 0 : _c.noPatch) === true
    ? window.ShadyDOM.wrap
    : (node) => node;
const trustedTypes = globalThis.trustedTypes;
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
const policy = trustedTypes
    ? trustedTypes.createPolicy('lit-html', {
        createHTML: (s) => s,
    })
    : undefined;
const identityFunction = (value) => value;
const noopSanitizer = (_node, _name, _type) => identityFunction;
/** Sets the global sanitizer factory. */
const setSanitizer = (newSanitizer) => {
    if (!ENABLE_EXTRA_SECURITY_HOOKS) {
        return;
    }
    if (sanitizerFactoryInternal !== noopSanitizer) {
        throw new Error(`Attempted to overwrite existing lit-html security policy.` +
            ` setSanitizeDOMValueFactory should be called at most once.`);
    }
    sanitizerFactoryInternal = newSanitizer;
};
/**
 * Only used in internal tests, not a part of the public API.
 */
const _testOnlyClearSanitizerFactoryDoNotCallOrElse = () => {
    sanitizerFactoryInternal = noopSanitizer;
};
const createSanitizer = (node, name, type) => {
    return sanitizerFactoryInternal(node, name, type);
};
// Added to an attribute name to mark the attribute as bound so we can find
// it easily.
const boundAttributeSuffix = '$lit$';
// This marker is used in many syntactic positions in HTML, so it must be
// a valid element name and attribute name. We don't support dynamic names (yet)
// but this at least ensures that the parse tree is closer to the template
// intention.
const marker = `lit$${String(Math.random()).slice(9)}$`;
// String used to tell if a comment is a marker comment
const markerMatch = '?' + marker;
// Text used to insert a comment marker node. We use processing instruction
// syntax because it's slightly smaller, but parses as a comment node.
const nodeMarker = `<${markerMatch}>`;
const d = document;
// Creates a dynamic marker. We never have to search for these in the DOM.
const createMarker = (v = '') => d.createComment(v);
const isPrimitive = (value) => value === null || (typeof value != 'object' && typeof value != 'function');
const isArray = Array.isArray;
const isIterable = (value) => {
    var _a;
    return isArray(value) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof ((_a = value) === null || _a === void 0 ? void 0 : _a[Symbol.iterator]) === 'function';
};
const SPACE_CHAR = `[ \t\n\f\r]`;
const ATTR_VALUE_CHAR = `[^ \t\n\f\r"'\`<>=]`;
const NAME_CHAR = `[^\\s"'>=/]`;
// These regexes represent the five parsing states that we care about in the
// Template's HTML scanner. They match the *end* of the state they're named
// after.
// Depending on the match, we transition to a new state. If there's no match,
// we stay in the same state.
// Note that the regexes are stateful. We utilize lastIndex and sync it
// across the multiple regexes used. In addition to the five regexes below
// we also dynamically create a regex to find the matching end tags for raw
// text elements.
/**
 * End of text is: `<` followed by:
 *   (comment start) or (tag) or (dynamic tag binding)
 */
const textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
const COMMENT_START = 1;
const TAG_NAME = 2;
const DYNAMIC_TAG_NAME = 3;
const commentEndRegex = /-->/g;
/**
 * Comments not started with <!--, like </{, can be ended by a single `>`
 */
const comment2EndRegex = />/g;
/**
 * The tagEnd regex matches the end of the "inside an opening" tag syntax
 * position. It either matches a `>`, an attribute-like sequence, or the end
 * of the string after a space (attribute-name position ending).
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \t\n\f\r" are HTML space characters:
 * https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * So an attribute is:
 *  * The name: any character except a whitespace character, ("), ('), ">",
 *    "=", or "/". Note: this is different from the HTML spec which also excludes control characters.
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
const tagEndRegex = new RegExp(`>|${SPACE_CHAR}(?:(${NAME_CHAR}+)(${SPACE_CHAR}*=${SPACE_CHAR}*(?:${ATTR_VALUE_CHAR}|("|')|))|$)`, 'g');
const ENTIRE_MATCH = 0;
const ATTRIBUTE_NAME = 1;
const SPACES_AND_EQUALS = 2;
const QUOTE_CHAR = 3;
const singleQuoteAttrEndRegex = /'/g;
const doubleQuoteAttrEndRegex = /"/g;
/**
 * Matches the raw text elements.
 *
 * Comments are not parsed within raw text elements, so we need to search their
 * text content for marker strings.
 */
const rawTextElement = /^(?:script|style|textarea|title)$/i;
/** TemplateResult types */
const HTML_RESULT = 1;
const SVG_RESULT = 2;
// TemplatePart types
// IMPORTANT: these must match the values in PartType
const ATTRIBUTE_PART = 1;
const CHILD_PART = 2;
const PROPERTY_PART = 3;
const BOOLEAN_ATTRIBUTE_PART = 4;
const EVENT_PART = 5;
const ELEMENT_PART = 6;
const COMMENT_PART = 7;
/**
 * Generates a template literal tag function that returns a TemplateResult with
 * the given result type.
 */
const tag = (type) => (strings, ...values) => {
    // Warn against templates octal escape sequences
    // We do this here rather than in render so that the warning is closer to the
    // template definition.
    if (DEV_MODE && strings.some((s) => s === undefined)) {
        console.warn('Some template strings are undefined.\n' +
            'This is probably caused by illegal octal escape sequences.');
    }
    return {
        // This property needs to remain unminified.
        ['_$litType$']: type,
        strings,
        values,
    };
};
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 *
 * ```ts
 * const header = (title: string) => html`<h1>${title}</h1>`;
 * ```
 *
 * The `html` tag returns a description of the DOM to render as a value. It is
 * lazy, meaning no work is done until the template is rendered. When rendering,
 * if a template comes from the same expression as a previously rendered result,
 * it's efficiently updated instead of replaced.
 */
const html = tag(HTML_RESULT);
/**
 * Interprets a template literal as an SVG fragment that can efficiently
 * render to and update a container.
 *
 * ```ts
 * const rect = svg`<rect width="10" height="10"></rect>`;
 *
 * const myImage = html`
 *   <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
 *     ${rect}
 *   </svg>`;
 * ```
 *
 * The `svg` *tag function* should only be used for SVG fragments, or elements
 * that would be contained **inside** an `<svg>` HTML element. A common error is
 * placing an `<svg>` *element* in a template tagged with the `svg` tag
 * function. The `<svg>` element is an HTML element and should be used within a
 * template tagged with the {@linkcode html} tag function.
 *
 * In LitElement usage, it's invalid to return an SVG fragment from the
 * `render()` method, as the SVG fragment will be contained within the element's
 * shadow root and thus cannot be used within an `<svg>` HTML element.
 */
const svg = tag(SVG_RESULT);
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
const noChange = Symbol.for('lit-noChange');
/**
 * A sentinel value that signals a ChildPart to fully clear its content.
 *
 * ```ts
 * const button = html`${
 *  user.isAdmin
 *    ? html`<button>DELETE</button>`
 *    : nothing
 * }`;
 * ```
 *
 * Prefer using `nothing` over other falsy values as it provides a consistent
 * behavior between various expression binding contexts.
 *
 * In child expressions, `undefined`, `null`, `''`, and `nothing` all behave the
 * same and render no nodes. In attribute expressions, `nothing` _removes_ the
 * attribute, while `undefined` and `null` will render an empty string. In
 * property expressions `nothing` becomes `undefined`.
 */
const nothing = Symbol.for('lit-nothing');
/**
 * The cache of prepared templates, keyed by the tagged TemplateStringsArray
 * and _not_ accounting for the specific template tag used. This means that
 * template tags cannot be dynamic - the must statically be one of html, svg,
 * or attr. This restriction simplifies the cache lookup, which is on the hot
 * path for rendering.
 */
const templateCache = new WeakMap();
/**
 * Renders a value, usually a lit-html TemplateResult, to the container.
 * @param value
 * @param container
 * @param options
 */
const render = (value, container, options) => {
    var _a, _b, _c;
    const renderId = DEV_MODE ? debugLogRenderId++ : 0;
    const partOwnerNode = (_a = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _a !== void 0 ? _a : container;
    // This property needs to remain unminified.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let part = partOwnerNode['_$litPart$'];
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: 'begin render',
        id: renderId,
        value,
        container,
        options,
        part,
    });
    if (part === undefined) {
        const endNode = (_b = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _b !== void 0 ? _b : null;
        // Internal modification: don't clear container to match lit-html 2.0
        if (INTERNAL &&
            ((_c = options) === null || _c === void 0 ? void 0 : _c.clearContainerForLit2MigrationOnly) ===
                true) {
            let n = container.firstChild;
            // Clear only up to the `endNode` aka `renderBefore` node.
            while (n && n !== endNode) {
                const next = n.nextSibling;
                n.remove();
                n = next;
            }
        }
        // This property needs to remain unminified.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        partOwnerNode['_$litPart$'] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, undefined, options !== null && options !== void 0 ? options : {});
    }
    part._$setValue(value);
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: 'end render',
        id: renderId,
        value,
        container,
        options,
        part,
    });
    return part;
};
if (ENABLE_EXTRA_SECURITY_HOOKS) {
    render.setSanitizer = setSanitizer;
    render.createSanitizer = createSanitizer;
    if (DEV_MODE) {
        render._testOnlyClearSanitizerFactoryDoNotCallOrElse =
            _testOnlyClearSanitizerFactoryDoNotCallOrElse;
    }
}
const walker = d.createTreeWalker(d, 129 /* NodeFilter.SHOW_{ELEMENT|COMMENT} */, null, false);
let sanitizerFactoryInternal = noopSanitizer;
/**
 * Returns an HTML string for the given TemplateStringsArray and result type
 * (HTML or SVG), along with the case-sensitive bound attribute names in
 * template order. The HTML contains comment comment markers denoting the
 * `ChildPart`s and suffixes on bound attributes denoting the `AttributeParts`.
 *
 * @param strings template strings array
 * @param type HTML or SVG
 * @return Array containing `[html, attrNames]` (array returned for terseness,
 *     to avoid object fields since this code is shared with non-minified SSR
 *     code)
 */
const getTemplateHtml = (strings, type) => {
    // Insert makers into the template HTML to represent the position of
    // bindings. The following code scans the template strings to determine the
    // syntactic position of the bindings. They can be in text position, where
    // we insert an HTML comment, attribute value position, where we insert a
    // sentinel string and re-write the attribute name, or inside a tag where
    // we insert the sentinel string.
    const l = strings.length - 1;
    // Stores the case-sensitive bound attribute names in the order of their
    // parts. ElementParts are also reflected in this array as undefined
    // rather than a string, to disambiguate from attribute bindings.
    const attrNames = [];
    let html = type === SVG_RESULT ? '<svg>' : '';
    // When we're inside a raw text tag (not it's text content), the regex
    // will still be tagRegex so we can find attributes, but will switch to
    // this regex when the tag ends.
    let rawTextEndRegex;
    // The current parsing state, represented as a reference to one of the
    // regexes
    let regex = textEndRegex;
    for (let i = 0; i < l; i++) {
        const s = strings[i];
        // The index of the end of the last attribute name. When this is
        // positive at end of a string, it means we're in an attribute value
        // position and need to rewrite the attribute name.
        // We also use a special value of -2 to indicate that we encountered
        // the end of a string in attribute name position.
        let attrNameEndIndex = -1;
        let attrName;
        let lastIndex = 0;
        let match;
        // The conditions in this loop handle the current parse state, and the
        // assignments to the `regex` variable are the state transitions.
        while (lastIndex < s.length) {
            // Make sure we start searching from where we previously left off
            regex.lastIndex = lastIndex;
            match = regex.exec(s);
            if (match === null) {
                break;
            }
            lastIndex = regex.lastIndex;
            if (regex === textEndRegex) {
                if (match[COMMENT_START] === '!--') {
                    regex = commentEndRegex;
                }
                else if (match[COMMENT_START] !== undefined) {
                    // We started a weird comment, like </{
                    regex = comment2EndRegex;
                }
                else if (match[TAG_NAME] !== undefined) {
                    if (rawTextElement.test(match[TAG_NAME])) {
                        // Record if we encounter a raw-text element. We'll switch to
                        // this regex at the end of the tag.
                        rawTextEndRegex = new RegExp(`</${match[TAG_NAME]}`, 'g');
                    }
                    regex = tagEndRegex;
                }
                else if (match[DYNAMIC_TAG_NAME] !== undefined) {
                    if (DEV_MODE) {
                        throw new Error('Bindings in tag names are not supported. Please use static templates instead. ' +
                            'See https://lit.dev/docs/templates/expressions/#static-expressions');
                    }
                    regex = tagEndRegex;
                }
            }
            else if (regex === tagEndRegex) {
                if (match[ENTIRE_MATCH] === '>') {
                    // End of a tag. If we had started a raw-text element, use that
                    // regex
                    regex = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
                    // We may be ending an unquoted attribute value, so make sure we
                    // clear any pending attrNameEndIndex
                    attrNameEndIndex = -1;
                }
                else if (match[ATTRIBUTE_NAME] === undefined) {
                    // Attribute name position
                    attrNameEndIndex = -2;
                }
                else {
                    attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
                    attrName = match[ATTRIBUTE_NAME];
                    regex =
                        match[QUOTE_CHAR] === undefined
                            ? tagEndRegex
                            : match[QUOTE_CHAR] === '"'
                                ? doubleQuoteAttrEndRegex
                                : singleQuoteAttrEndRegex;
                }
            }
            else if (regex === doubleQuoteAttrEndRegex ||
                regex === singleQuoteAttrEndRegex) {
                regex = tagEndRegex;
            }
            else if (regex === commentEndRegex || regex === comment2EndRegex) {
                regex = textEndRegex;
            }
            else {
                // Not one of the five state regexes, so it must be the dynamically
                // created raw text regex and we're at the close of that element.
                regex = tagEndRegex;
                rawTextEndRegex = undefined;
            }
        }
        if (DEV_MODE) {
            // If we have a attrNameEndIndex, which indicates that we should
            // rewrite the attribute name, assert that we're in a valid attribute
            // position - either in a tag, or a quoted attribute value.
            console.assert(attrNameEndIndex === -1 ||
                regex === tagEndRegex ||
                regex === singleQuoteAttrEndRegex ||
                regex === doubleQuoteAttrEndRegex, 'unexpected parse state B');
        }
        // We have four cases:
        //  1. We're in text position, and not in a raw text element
        //     (regex === textEndRegex): insert a comment marker.
        //  2. We have a non-negative attrNameEndIndex which means we need to
        //     rewrite the attribute name to add a bound attribute suffix.
        //  3. We're at the non-first binding in a multi-binding attribute, use a
        //     plain marker.
        //  4. We're somewhere else inside the tag. If we're in attribute name
        //     position (attrNameEndIndex === -2), add a sequential suffix to
        //     generate a unique attribute name.
        // Detect a binding next to self-closing tag end and insert a space to
        // separate the marker from the tag end:
        const end = regex === tagEndRegex && strings[i + 1].startsWith('/>') ? ' ' : '';
        html +=
            regex === textEndRegex
                ? s + nodeMarker
                : attrNameEndIndex >= 0
                    ? (attrNames.push(attrName),
                        s.slice(0, attrNameEndIndex) +
                            boundAttributeSuffix +
                            s.slice(attrNameEndIndex)) +
                        marker +
                        end
                    : s +
                        marker +
                        (attrNameEndIndex === -2 ? (attrNames.push(undefined), i) : end);
    }
    const htmlResult = html + (strings[l] || '<?>') + (type === SVG_RESULT ? '</svg>' : '');
    // A security check to prevent spoofing of Lit template results.
    // In the future, we may be able to replace this with Array.isTemplateObject,
    // though we might need to make that check inside of the html and svg
    // functions, because precompiled templates don't come in as
    // TemplateStringArray objects.
    if (!Array.isArray(strings) || !strings.hasOwnProperty('raw')) {
        let message = 'invalid template strings array';
        if (DEV_MODE) {
            message =
                `Internal Error: expected template strings to be an array ` +
                    `with a 'raw' field. Please file a bug at ` +
                    `https://github.com/lit/lit/issues/new?template=bug_report.md ` +
                    `and include information about your build tooling, if any.`;
        }
        throw new Error(message);
    }
    // Returned as an array for terseness
    return [
        policy !== undefined
            ? policy.createHTML(htmlResult)
            : htmlResult,
        attrNames,
    ];
};
class Template {
    constructor(
    // This property needs to remain unminified.
    { strings, ['_$litType$']: type }, options) {
        /** @internal */
        this.parts = [];
        let node;
        let nodeIndex = 0;
        let attrNameIndex = 0;
        const partCount = strings.length - 1;
        const parts = this.parts;
        // Create template element
        const [html, attrNames] = getTemplateHtml(strings, type);
        this.el = Template.createElement(html, options);
        walker.currentNode = this.el.content;
        // Reparent SVG nodes into template root
        if (type === SVG_RESULT) {
            const content = this.el.content;
            const svgElement = content.firstChild;
            svgElement.remove();
            content.append(...svgElement.childNodes);
        }
        // Walk the template to find binding markers and create TemplateParts
        while ((node = walker.nextNode()) !== null && parts.length < partCount) {
            if (node.nodeType === 1) {
                if (DEV_MODE) {
                    const tag = node.localName;
                    // Warn if `textarea` includes an expression and throw if `template`
                    // does since these are not supported. We do this by checking
                    // innerHTML for anything that looks like a marker. This catches
                    // cases like bindings in textarea there markers turn into text nodes.
                    if (/^(?:textarea|template)$/i.test(tag) &&
                        node.innerHTML.includes(marker)) {
                        const m = `Expressions are not supported inside \`${tag}\` ` +
                            `elements. See https://lit.dev/msg/expression-in-${tag} for more ` +
                            `information.`;
                        if (tag === 'template') {
                            throw new Error(m);
                        }
                        else
                            issueWarning('', m);
                    }
                }
                // TODO (justinfagnani): for attempted dynamic tag names, we don't
                // increment the bindingIndex, and it'll be off by 1 in the element
                // and off by two after it.
                if (node.hasAttributes()) {
                    // We defer removing bound attributes because on IE we might not be
                    // iterating attributes in their template order, and would sometimes
                    // remove an attribute that we still need to create a part for.
                    const attrsToRemove = [];
                    for (const name of node.getAttributeNames()) {
                        // `name` is the name of the attribute we're iterating over, but not
                        // _neccessarily_ the name of the attribute we will create a part
                        // for. They can be different in browsers that don't iterate on
                        // attributes in source order. In that case the attrNames array
                        // contains the attribute name we'll process next. We only need the
                        // attribute name here to know if we should process a bound attribute
                        // on this element.
                        if (name.endsWith(boundAttributeSuffix) ||
                            name.startsWith(marker)) {
                            const realName = attrNames[attrNameIndex++];
                            attrsToRemove.push(name);
                            if (realName !== undefined) {
                                // Lowercase for case-sensitive SVG attributes like viewBox
                                const value = node.getAttribute(realName.toLowerCase() + boundAttributeSuffix);
                                const statics = value.split(marker);
                                const m = /([.?@])?(.*)/.exec(realName);
                                parts.push({
                                    type: ATTRIBUTE_PART,
                                    index: nodeIndex,
                                    name: m[2],
                                    strings: statics,
                                    ctor: m[1] === '.'
                                        ? PropertyPart
                                        : m[1] === '?'
                                            ? BooleanAttributePart
                                            : m[1] === '@'
                                                ? EventPart
                                                : AttributePart,
                                });
                            }
                            else {
                                parts.push({
                                    type: ELEMENT_PART,
                                    index: nodeIndex,
                                });
                            }
                        }
                    }
                    for (const name of attrsToRemove) {
                        node.removeAttribute(name);
                    }
                }
                // TODO (justinfagnani): benchmark the regex against testing for each
                // of the 3 raw text element names.
                if (rawTextElement.test(node.tagName)) {
                    // For raw text elements we need to split the text content on
                    // markers, create a Text node for each segment, and create
                    // a TemplatePart for each marker.
                    const strings = node.textContent.split(marker);
                    const lastIndex = strings.length - 1;
                    if (lastIndex > 0) {
                        node.textContent = trustedTypes
                            ? trustedTypes.emptyScript
                            : '';
                        // Generate a new text node for each literal section
                        // These nodes are also used as the markers for node parts
                        // We can't use empty text nodes as markers because they're
                        // normalized when cloning in IE (could simplify when
                        // IE is no longer supported)
                        for (let i = 0; i < lastIndex; i++) {
                            node.append(strings[i], createMarker());
                            // Walk past the marker node we just added
                            walker.nextNode();
                            parts.push({ type: CHILD_PART, index: ++nodeIndex });
                        }
                        // Note because this marker is added after the walker's current
                        // node, it will be walked to in the outer loop (and ignored), so
                        // we don't need to adjust nodeIndex here
                        node.append(strings[lastIndex], createMarker());
                    }
                }
            }
            else if (node.nodeType === 8) {
                const data = node.data;
                if (data === markerMatch) {
                    parts.push({ type: CHILD_PART, index: nodeIndex });
                }
                else {
                    let i = -1;
                    while ((i = node.data.indexOf(marker, i + 1)) !== -1) {
                        // Comment node has a binding marker inside, make an inactive part
                        // The binding won't work, but subsequent bindings will
                        parts.push({ type: COMMENT_PART, index: nodeIndex });
                        // Move to the end of the match
                        i += marker.length - 1;
                    }
                }
            }
            nodeIndex++;
        }
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
            kind: 'template prep',
            template: this,
            clonableTemplate: this.el,
            parts: this.parts,
            strings,
        });
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @nocollapse */
    static createElement(html, _options) {
        const el = d.createElement('template');
        el.innerHTML = html;
        return el;
    }
}
function resolveDirective(part, value, parent = part, attributeIndex) {
    var _a, _b, _c;
    var _d;
    // Bail early if the value is explicitly noChange. Note, this means any
    // nested directive is still attached and is not run.
    if (value === noChange) {
        return value;
    }
    let currentDirective = attributeIndex !== undefined
        ? (_a = parent.__directives) === null || _a === void 0 ? void 0 : _a[attributeIndex]
        : parent.__directive;
    const nextDirectiveConstructor = isPrimitive(value)
        ? undefined
        : // This property needs to remain unminified.
            value['_$litDirective$'];
    if ((currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
        // This property needs to remain unminified.
        (_b = currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective['_$notifyDirectiveConnectionChanged']) === null || _b === void 0 ? void 0 : _b.call(currentDirective, false);
        if (nextDirectiveConstructor === undefined) {
            currentDirective = undefined;
        }
        else {
            currentDirective = new nextDirectiveConstructor(part);
            currentDirective._$initialize(part, parent, attributeIndex);
        }
        if (attributeIndex !== undefined) {
            ((_c = (_d = parent).__directives) !== null && _c !== void 0 ? _c : (_d.__directives = []))[attributeIndex] =
                currentDirective;
        }
        else {
            parent.__directive = currentDirective;
        }
    }
    if (currentDirective !== undefined) {
        value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
    }
    return value;
}
/**
 * An updateable instance of a Template. Holds references to the Parts used to
 * update the template instance.
 */
class TemplateInstance {
    constructor(template, parent) {
        /** @internal */
        this._parts = [];
        /** @internal */
        this._$disconnectableChildren = undefined;
        this._$template = template;
        this._$parent = parent;
    }
    // Called by ChildPart parentNode getter
    get parentNode() {
        return this._$parent.parentNode;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    // This method is separate from the constructor because we need to return a
    // DocumentFragment and we don't want to hold onto it with an instance field.
    _clone(options) {
        var _a;
        const { el: { content }, parts: parts, } = this._$template;
        const fragment = ((_a = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _a !== void 0 ? _a : d).importNode(content, true);
        walker.currentNode = fragment;
        let node = walker.nextNode();
        let nodeIndex = 0;
        let partIndex = 0;
        let templatePart = parts[0];
        while (templatePart !== undefined) {
            if (nodeIndex === templatePart.index) {
                let part;
                if (templatePart.type === CHILD_PART) {
                    part = new ChildPart(node, node.nextSibling, this, options);
                }
                else if (templatePart.type === ATTRIBUTE_PART) {
                    part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
                }
                else if (templatePart.type === ELEMENT_PART) {
                    part = new ElementPart(node, this, options);
                }
                this._parts.push(part);
                templatePart = parts[++partIndex];
            }
            if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
                node = walker.nextNode();
                nodeIndex++;
            }
        }
        return fragment;
    }
    _update(values) {
        let i = 0;
        for (const part of this._parts) {
            if (part !== undefined) {
                debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                    kind: 'set part',
                    part,
                    value: values[i],
                    valueIndex: i,
                    values,
                    templateInstance: this,
                });
                if (part.strings !== undefined) {
                    part._$setValue(values, part, i);
                    // The number of values the part consumes is part.strings.length - 1
                    // since values are in between template spans. We increment i by 1
                    // later in the loop, so increment it by part.strings.length - 2 here
                    i += part.strings.length - 2;
                }
                else {
                    part._$setValue(values[i]);
                }
            }
            i++;
        }
    }
}
class ChildPart {
    constructor(startNode, endNode, parent, options) {
        var _a;
        this.type = CHILD_PART;
        this._$committedValue = nothing;
        // The following fields will be patched onto ChildParts when required by
        // AsyncDirective
        /** @internal */
        this._$disconnectableChildren = undefined;
        this._$startNode = startNode;
        this._$endNode = endNode;
        this._$parent = parent;
        this.options = options;
        // Note __isConnected is only ever accessed on RootParts (i.e. when there is
        // no _$parent); the value on a non-root-part is "don't care", but checking
        // for parent would be more code
        this.__isConnected = (_a = options === null || options === void 0 ? void 0 : options.isConnected) !== null && _a !== void 0 ? _a : true;
        if (ENABLE_EXTRA_SECURITY_HOOKS) {
            // Explicitly initialize for consistent class shape.
            this._textSanitizer = undefined;
        }
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        var _a, _b;
        // ChildParts that are not at the root should always be created with a
        // parent; only RootChildNode's won't, so they return the local isConnected
        // state
        return (_b = (_a = this._$parent) === null || _a === void 0 ? void 0 : _a._$isConnected) !== null && _b !== void 0 ? _b : this.__isConnected;
    }
    /**
     * The parent node into which the part renders its content.
     *
     * A ChildPart's content consists of a range of adjacent child nodes of
     * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
     * `.endNode`).
     *
     * - If both `.startNode` and `.endNode` are non-null, then the part's content
     * consists of all siblings between `.startNode` and `.endNode`, exclusively.
     *
     * - If `.startNode` is non-null but `.endNode` is null, then the part's
     * content consists of all siblings following `.startNode`, up to and
     * including the last child of `.parentNode`. If `.endNode` is non-null, then
     * `.startNode` will always be non-null.
     *
     * - If both `.endNode` and `.startNode` are null, then the part's content
     * consists of all child nodes of `.parentNode`.
     */
    get parentNode() {
        let parentNode = wrap(this._$startNode).parentNode;
        const parent = this._$parent;
        if (parent !== undefined &&
            parentNode.nodeType === 11 /* Node.DOCUMENT_FRAGMENT */) {
            // If the parentNode is a DocumentFragment, it may be because the DOM is
            // still in the cloned fragment during initial render; if so, get the real
            // parentNode the part will be committed into by asking the parent.
            parentNode = parent.parentNode;
        }
        return parentNode;
    }
    /**
     * The part's leading marker node, if any. See `.parentNode` for more
     * information.
     */
    get startNode() {
        return this._$startNode;
    }
    /**
     * The part's trailing marker node, if any. See `.parentNode` for more
     * information.
     */
    get endNode() {
        return this._$endNode;
    }
    _$setValue(value, directiveParent = this) {
        if (DEV_MODE && this.parentNode === null) {
            throw new Error(`This \`ChildPart\` has no \`parentNode\` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's \`innerHTML\` or \`textContent\` can do this.`);
        }
        value = resolveDirective(this, value, directiveParent);
        if (isPrimitive(value)) {
            // Non-rendering child values. It's important that these do not render
            // empty text nodes to avoid issues with preventing default <slot>
            // fallback content.
            if (value === nothing || value == null || value === '') {
                if (this._$committedValue !== nothing) {
                    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                        kind: 'commit nothing to child',
                        start: this._$startNode,
                        end: this._$endNode,
                        parent: this._$parent,
                        options: this.options,
                    });
                    this._$clear();
                }
                this._$committedValue = nothing;
            }
            else if (value !== this._$committedValue && value !== noChange) {
                this._commitText(value);
            }
            // This property needs to remain unminified.
        }
        else if (value['_$litType$'] !== undefined) {
            this._commitTemplateResult(value);
        }
        else if (value.nodeType !== undefined) {
            this._commitNode(value);
        }
        else if (isIterable(value)) {
            this._commitIterable(value);
        }
        else {
            // Fallback, will render the string representation
            this._commitText(value);
        }
    }
    _insert(node, ref = this._$endNode) {
        return wrap(wrap(this._$startNode).parentNode).insertBefore(node, ref);
    }
    _commitNode(value) {
        var _a;
        if (this._$committedValue !== value) {
            this._$clear();
            if (ENABLE_EXTRA_SECURITY_HOOKS &&
                sanitizerFactoryInternal !== noopSanitizer) {
                const parentNodeName = (_a = this._$startNode.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName;
                if (parentNodeName === 'STYLE' || parentNodeName === 'SCRIPT') {
                    let message = 'Forbidden';
                    if (DEV_MODE) {
                        if (parentNodeName === 'STYLE') {
                            message =
                                `Lit does not support binding inside style nodes. ` +
                                    `This is a security risk, as style injection attacks can ` +
                                    `exfiltrate data and spoof UIs. ` +
                                    `Consider instead using css\`...\` literals ` +
                                    `to compose styles, and make do dynamic styling with ` +
                                    `css custom properties, ::parts, <slot>s, ` +
                                    `and by mutating the DOM rather than stylesheets.`;
                        }
                        else {
                            message =
                                `Lit does not support binding inside script nodes. ` +
                                    `This is a security risk, as it could allow arbitrary ` +
                                    `code execution.`;
                        }
                    }
                    throw new Error(message);
                }
            }
            debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                kind: 'commit node',
                start: this._$startNode,
                parent: this._$parent,
                value: value,
                options: this.options,
            });
            this._$committedValue = this._insert(value);
        }
    }
    _commitText(value) {
        // If the committed value is a primitive it means we called _commitText on
        // the previous render, and we know that this._$startNode.nextSibling is a
        // Text node. We can now just replace the text content (.data) of the node.
        if (this._$committedValue !== nothing &&
            isPrimitive(this._$committedValue)) {
            const node = wrap(this._$startNode).nextSibling;
            if (ENABLE_EXTRA_SECURITY_HOOKS) {
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(node, 'data', 'property');
                }
                value = this._textSanitizer(value);
            }
            debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                kind: 'commit text',
                node,
                value,
                options: this.options,
            });
            node.data = value;
        }
        else {
            if (ENABLE_EXTRA_SECURITY_HOOKS) {
                const textNode = document.createTextNode('');
                this._commitNode(textNode);
                // When setting text content, for security purposes it matters a lot
                // what the parent is. For example, <style> and <script> need to be
                // handled with care, while <span> does not. So first we need to put a
                // text node into the document, then we can sanitize its content.
                if (this._textSanitizer === undefined) {
                    this._textSanitizer = createSanitizer(textNode, 'data', 'property');
                }
                value = this._textSanitizer(value);
                debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                    kind: 'commit text',
                    node: textNode,
                    value,
                    options: this.options,
                });
                textNode.data = value;
            }
            else {
                this._commitNode(d.createTextNode(value));
                debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                    kind: 'commit text',
                    node: wrap(this._$startNode).nextSibling,
                    value,
                    options: this.options,
                });
            }
        }
        this._$committedValue = value;
    }
    _commitTemplateResult(result) {
        var _a;
        // This property needs to remain unminified.
        const { values, ['_$litType$']: type } = result;
        // If $litType$ is a number, result is a plain TemplateResult and we get
        // the template from the template cache. If not, result is a
        // CompiledTemplateResult and _$litType$ is a CompiledTemplate and we need
        // to create the <template> element the first time we see it.
        const template = typeof type === 'number'
            ? this._$getTemplate(result)
            : (type.el === undefined &&
                (type.el = Template.createElement(type.h, this.options)),
                type);
        if (((_a = this._$committedValue) === null || _a === void 0 ? void 0 : _a._$template) === template) {
            debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                kind: 'template updating',
                template,
                instance: this._$committedValue,
                parts: this._$committedValue._parts,
                options: this.options,
                values,
            });
            this._$committedValue._update(values);
        }
        else {
            const instance = new TemplateInstance(template, this);
            const fragment = instance._clone(this.options);
            debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                kind: 'template instantiated',
                template,
                instance,
                parts: instance._parts,
                options: this.options,
                fragment,
                values,
            });
            instance._update(values);
            debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                kind: 'template instantiated and updated',
                template,
                instance,
                parts: instance._parts,
                options: this.options,
                fragment,
                values,
            });
            this._commitNode(fragment);
            this._$committedValue = instance;
        }
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @internal */
    _$getTemplate(result) {
        let template = templateCache.get(result.strings);
        if (template === undefined) {
            templateCache.set(result.strings, (template = new Template(result)));
        }
        return template;
    }
    _commitIterable(value) {
        // For an Iterable, we create a new InstancePart per item, then set its
        // value to the item. This is a little bit of overhead for every item in
        // an Iterable, but it lets us recurse easily and efficiently update Arrays
        // of TemplateResults that will be commonly returned from expressions like:
        // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
        // If value is an array, then the previous render was of an
        // iterable and value will contain the ChildParts from the previous
        // render. If value is not an array, clear this part and make a new
        // array for ChildParts.
        if (!isArray(this._$committedValue)) {
            this._$committedValue = [];
            this._$clear();
        }
        // Lets us keep track of how many items we stamped so we can clear leftover
        // items from a previous render
        const itemParts = this._$committedValue;
        let partIndex = 0;
        let itemPart;
        for (const item of value) {
            if (partIndex === itemParts.length) {
                // If no existing part, create a new one
                // TODO (justinfagnani): test perf impact of always creating two parts
                // instead of sharing parts between nodes
                // https://github.com/lit/lit/issues/1266
                itemParts.push((itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options)));
            }
            else {
                // Reuse an existing part
                itemPart = itemParts[partIndex];
            }
            itemPart._$setValue(item);
            partIndex++;
        }
        if (partIndex < itemParts.length) {
            // itemParts always have end nodes
            this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
            // Truncate the parts array so _value reflects the current state
            itemParts.length = partIndex;
        }
    }
    /**
     * Removes the nodes contained within this Part from the DOM.
     *
     * @param start Start node to clear from, for clearing a subset of the part's
     *     DOM (used when truncating iterables)
     * @param from  When `start` is specified, the index within the iterable from
     *     which ChildParts are being removed, used for disconnecting directives in
     *     those Parts.
     *
     * @internal
     */
    _$clear(start = wrap(this._$startNode).nextSibling, from) {
        var _a;
        (_a = this._$notifyConnectionChanged) === null || _a === void 0 ? void 0 : _a.call(this, false, true, from);
        while (start && start !== this._$endNode) {
            const n = wrap(start).nextSibling;
            wrap(start).remove();
            start = n;
        }
    }
    /**
     * Implementation of RootPart's `isConnected`. Note that this metod
     * should only be called on `RootPart`s (the `ChildPart` returned from a
     * top-level `render()` call). It has no effect on non-root ChildParts.
     * @param isConnected Whether to set
     * @internal
     */
    setConnected(isConnected) {
        var _a;
        if (this._$parent === undefined) {
            this.__isConnected = isConnected;
            (_a = this._$notifyConnectionChanged) === null || _a === void 0 ? void 0 : _a.call(this, isConnected);
        }
        else if (DEV_MODE) {
            throw new Error('part.setConnected() may only be called on a ' +
                'RootPart returned from render().');
        }
    }
}
class AttributePart {
    constructor(element, name, strings, parent, options) {
        this.type = ATTRIBUTE_PART;
        /** @internal */
        this._$committedValue = nothing;
        /** @internal */
        this._$disconnectableChildren = undefined;
        this.element = element;
        this.name = name;
        this._$parent = parent;
        this.options = options;
        if (strings.length > 2 || strings[0] !== '' || strings[1] !== '') {
            this._$committedValue = new Array(strings.length - 1).fill(new String());
            this.strings = strings;
        }
        else {
            this._$committedValue = nothing;
        }
        if (ENABLE_EXTRA_SECURITY_HOOKS) {
            this._sanitizer = undefined;
        }
    }
    get tagName() {
        return this.element.tagName;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    /**
     * Sets the value of this part by resolving the value from possibly multiple
     * values and static strings and committing it to the DOM.
     * If this part is single-valued, `this._strings` will be undefined, and the
     * method will be called with a single value argument. If this part is
     * multi-value, `this._strings` will be defined, and the method is called
     * with the value array of the part's owning TemplateInstance, and an offset
     * into the value array from which the values should be read.
     * This method is overloaded this way to eliminate short-lived array slices
     * of the template instance values, and allow a fast-path for single-valued
     * parts.
     *
     * @param value The part value, or an array of values for multi-valued parts
     * @param valueIndex the index to start reading values from. `undefined` for
     *   single-valued parts
     * @param noCommit causes the part to not commit its value to the DOM. Used
     *   in hydration to prime attribute parts with their first-rendered value,
     *   but not set the attribute, and in SSR to no-op the DOM operation and
     *   capture the value for serialization.
     *
     * @internal
     */
    _$setValue(value, directiveParent = this, valueIndex, noCommit) {
        const strings = this.strings;
        // Whether any of the values has changed, for dirty-checking
        let change = false;
        if (strings === undefined) {
            // Single-value binding case
            value = resolveDirective(this, value, directiveParent, 0);
            change =
                !isPrimitive(value) ||
                    (value !== this._$committedValue && value !== noChange);
            if (change) {
                this._$committedValue = value;
            }
        }
        else {
            // Interpolation case
            const values = value;
            value = strings[0];
            let i, v;
            for (i = 0; i < strings.length - 1; i++) {
                v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
                if (v === noChange) {
                    // If the user-provided value is `noChange`, use the previous value
                    v = this._$committedValue[i];
                }
                change || (change = !isPrimitive(v) || v !== this._$committedValue[i]);
                if (v === nothing) {
                    value = nothing;
                }
                else if (value !== nothing) {
                    value += (v !== null && v !== void 0 ? v : '') + strings[i + 1];
                }
                // We always record each value, even if one is `nothing`, for future
                // change detection.
                this._$committedValue[i] = v;
            }
        }
        if (change && !noCommit) {
            this._commitValue(value);
        }
    }
    /** @internal */
    _commitValue(value) {
        if (value === nothing) {
            wrap(this.element).removeAttribute(this.name);
        }
        else {
            if (ENABLE_EXTRA_SECURITY_HOOKS) {
                if (this._sanitizer === undefined) {
                    this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'attribute');
                }
                value = this._sanitizer(value !== null && value !== void 0 ? value : '');
            }
            debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
                kind: 'commit attribute',
                element: this.element,
                name: this.name,
                value,
                options: this.options,
            });
            wrap(this.element).setAttribute(this.name, (value !== null && value !== void 0 ? value : ''));
        }
    }
}
class PropertyPart extends AttributePart {
    constructor() {
        super(...arguments);
        this.type = PROPERTY_PART;
    }
    /** @internal */
    _commitValue(value) {
        if (ENABLE_EXTRA_SECURITY_HOOKS) {
            if (this._sanitizer === undefined) {
                this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'property');
            }
            value = this._sanitizer(value);
        }
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
            kind: 'commit property',
            element: this.element,
            name: this.name,
            value,
            options: this.options,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.element[this.name] = value === nothing ? undefined : value;
    }
}
// Temporary workaround for https://crbug.com/993268
// Currently, any attribute starting with "on" is considered to be a
// TrustedScript source. Such boolean attributes must be set to the equivalent
// trusted emptyScript value.
const emptyStringForBooleanAttribute = trustedTypes
    ? trustedTypes.emptyScript
    : '';
class BooleanAttributePart extends AttributePart {
    constructor() {
        super(...arguments);
        this.type = BOOLEAN_ATTRIBUTE_PART;
    }
    /** @internal */
    _commitValue(value) {
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
            kind: 'commit boolean attribute',
            element: this.element,
            name: this.name,
            value: !!(value && value !== nothing),
            options: this.options,
        });
        if (value && value !== nothing) {
            wrap(this.element).setAttribute(this.name, emptyStringForBooleanAttribute);
        }
        else {
            wrap(this.element).removeAttribute(this.name);
        }
    }
}
class EventPart extends AttributePart {
    constructor(element, name, strings, parent, options) {
        super(element, name, strings, parent, options);
        this.type = EVENT_PART;
        if (DEV_MODE && this.strings !== undefined) {
            throw new Error(`A \`<${element.localName}>\` has a \`@${name}=...\` listener with ` +
                'invalid content. Event listeners in templates must have exactly ' +
                'one expression and no surrounding text.');
        }
    }
    // EventPart does not use the base _$setValue/_resolveValue implementation
    // since the dirty checking is more complex
    /** @internal */
    _$setValue(newListener, directiveParent = this) {
        var _a;
        newListener =
            (_a = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a !== void 0 ? _a : nothing;
        if (newListener === noChange) {
            return;
        }
        const oldListener = this._$committedValue;
        // If the new value is nothing or any options change we have to remove the
        // part as a listener.
        const shouldRemoveListener = (newListener === nothing && oldListener !== nothing) ||
            newListener.capture !==
                oldListener.capture ||
            newListener.once !==
                oldListener.once ||
            newListener.passive !==
                oldListener.passive;
        // If the new value is not nothing and we removed the listener, we have
        // to add the part as a listener.
        const shouldAddListener = newListener !== nothing &&
            (oldListener === nothing || shouldRemoveListener);
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
            kind: 'commit event listener',
            element: this.element,
            name: this.name,
            value: newListener,
            options: this.options,
            removeListener: shouldRemoveListener,
            addListener: shouldAddListener,
            oldListener,
        });
        if (shouldRemoveListener) {
            this.element.removeEventListener(this.name, this, oldListener);
        }
        if (shouldAddListener) {
            // Beware: IE11 and Chrome 41 don't like using the listener as the
            // options object. Figure out how to deal w/ this in IE11 - maybe
            // patch addEventListener?
            this.element.addEventListener(this.name, this, newListener);
        }
        this._$committedValue = newListener;
    }
    handleEvent(event) {
        var _a, _b;
        if (typeof this._$committedValue === 'function') {
            this._$committedValue.call((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : this.element, event);
        }
        else {
            this._$committedValue.handleEvent(event);
        }
    }
}
class ElementPart {
    constructor(element, parent, options) {
        this.element = element;
        this.type = ELEMENT_PART;
        /** @internal */
        this._$disconnectableChildren = undefined;
        this._$parent = parent;
        this.options = options;
    }
    // See comment in Disconnectable interface for why this is a getter
    get _$isConnected() {
        return this._$parent._$isConnected;
    }
    _$setValue(value) {
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
            kind: 'commit to element binding',
            element: this.element,
            value,
            options: this.options,
        });
        resolveDirective(this, value);
    }
}
/**
 * END USERS SHOULD NOT RELY ON THIS OBJECT.
 *
 * Private exports for use by other Lit packages, not intended for use by
 * external users.
 *
 * We currently do not make a mangled rollup build of the lit-ssr code. In order
 * to keep a number of (otherwise private) top-level exports  mangled in the
 * client side code, we export a _$LH object containing those members (or
 * helper methods for accessing private fields of those members), and then
 * re-export them for use in lit-ssr. This keeps lit-ssr agnostic to whether the
 * client-side code is being used in `dev` mode or `prod` mode.
 *
 * This has a unique name, to disambiguate it from private exports in
 * lit-element, which re-exports all of lit-html.
 *
 * @private
 */
const _$LH = {
    // Used in lit-ssr
    _boundAttributeSuffix: boundAttributeSuffix,
    _marker: marker,
    _markerMatch: markerMatch,
    _HTML_RESULT: HTML_RESULT,
    _getTemplateHtml: getTemplateHtml,
    // Used in hydrate
    _TemplateInstance: TemplateInstance,
    _isIterable: isIterable,
    _resolveDirective: resolveDirective,
    // Used in tests and private-ssr-support
    _ChildPart: ChildPart,
    _AttributePart: AttributePart,
    _BooleanAttributePart: BooleanAttributePart,
    _EventPart: EventPart,
    _PropertyPart: PropertyPart,
    _ElementPart: ElementPart,
};
// Apply polyfills if available
const polyfillSupport = DEV_MODE
    ? window.litHtmlPolyfillSupportDevMode
    : window.litHtmlPolyfillSupport;
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport(Template, ChildPart);
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
((_d = globalThis.litHtmlVersions) !== null && _d !== void 0 ? _d : (globalThis.litHtmlVersions = [])).push('2.2.1');
if (DEV_MODE && globalThis.litHtmlVersions.length > 1) {
    issueWarning('multiple-versions', `Multiple versions of Lit loaded. ` +
        `Loading multiple versions is not recommended.`);
}
//# sourceMappingURL=lit-html.js.map

/***/ }),

/***/ "./node_modules/lit/index.js":
/*!***********************************!*\
  !*** ./node_modules/lit/index.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CSSResult": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.CSSResult),
/* harmony export */   "INTERNAL": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.INTERNAL),
/* harmony export */   "LitElement": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.LitElement),
/* harmony export */   "ReactiveElement": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.ReactiveElement),
/* harmony export */   "UpdatingElement": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.UpdatingElement),
/* harmony export */   "_$LE": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__._$LE),
/* harmony export */   "_$LH": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__._$LH),
/* harmony export */   "adoptStyles": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.adoptStyles),
/* harmony export */   "css": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.css),
/* harmony export */   "defaultConverter": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.defaultConverter),
/* harmony export */   "getCompatibleStyle": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.getCompatibleStyle),
/* harmony export */   "html": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.html),
/* harmony export */   "noChange": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.noChange),
/* harmony export */   "notEqual": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.notEqual),
/* harmony export */   "nothing": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.nothing),
/* harmony export */   "render": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.render),
/* harmony export */   "supportsAdoptingStyleSheets": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.supportsAdoptingStyleSheets),
/* harmony export */   "svg": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.svg),
/* harmony export */   "unsafeCSS": () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.unsafeCSS)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lit/reactive-element */ "./node_modules/@lit/reactive-element/development/reactive-element.js");
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/development/lit-html.js");
/* harmony import */ var lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit-element/lit-element.js */ "./node_modules/lit-element/development/lit-element.js");

//# sourceMappingURL=index.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./public/pages/acc.js ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./node_modules/lit/index.js");
/* harmony import */ var _acc_tpl_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./acc.tpl.js */ "./public/pages/acc.tpl.js");
// import { LitElement} from 'lit';



 
// import 'https://unpkg.com/@polymer/iron-pages@latest/iron-pages.js?module';

// import '@polymer/iron-pages';

class AccApp extends lit__WEBPACK_IMPORTED_MODULE_0__.LitElement {
  constructor() {
    super();
    this.render = _acc_tpl_js__WEBPACK_IMPORTED_MODULE_1__.render.bind(this);

    this.version = "alpha";
    
  }


}

customElements.define('aggie-crop-calculator', AccApp);
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUEyQjtBQUMzQixZQUFZLE9BQU87O0FBRVo7QUFDUCxXQUFXLHFDQUFJO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRSxhQUFhO0FBQzdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsTUFBTTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxlQUFlO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSxJQUFJLDZCQUE2QjtBQUNqQztBQUNBO0FBQ0EsNERBQTREO0FBQzVEO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLHNCQUFzQjtBQUMxQjtBQUNBO0FBQ2dFO0FBQ25DO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxNQUFNO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsS0FBSztBQUNyQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsK0JBQStCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxlQUFlO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLEtBQUs7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLHlCQUF5QjtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtFQUErRSxLQUFLLDZCQUE2QixVQUFVO0FBQzNILG9DQUFvQyxpQ0FBaUM7QUFDckU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQywrREFBa0I7QUFDeEQ7QUFDQTtBQUNBO0FBQ0EsK0JBQStCLCtEQUFrQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSx3REFBVztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkZBQTJGLFFBQVEsZ0ZBQWdGO0FBQ25MO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkZBQTJGLFFBQVEsbUZBQW1GO0FBQ3RMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUZBQXlGLE1BQU07QUFDL0YsNENBQTRDLGVBQWU7QUFDM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0ZBQXNGLGdCQUFnQjtBQUN0RztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLDJFQUEyRSxnQkFBZ0I7QUFDM0Y7QUFDQSxtQ0FBbUMsOEJBQThCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1HQUFtRyxRQUFRLDZFQUE2RTtBQUN4TDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGdCQUFnQixFQUFFLGNBQWM7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsU0FBUztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJGQUEyRixRQUFRLDhFQUE4RTtBQUNqTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELGdCQUFnQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLGlCQUFpQixlQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBLG9GQUFvRixpQkFBaUI7QUFDckc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1L0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELHNCQUFzQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHNCQUFzQixLQUFLLGdCQUFnQjtBQUN2RDtBQUNBO0FBQ0E7QUFDQSxXQUFXLGtCQUFrQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixXQUFXO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QiwyQkFBMkI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN3RDtBQUNaO0FBQ047QUFDYjtBQUN6QjtBQUNBO0FBQ08sd0JBQXdCLGtFQUFlO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsTUFBTTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLDRDQUE0QztBQUMxRCxJQUFJLG9CQUFvQjtBQUN4QjtBQUNPLHlCQUF5QixrRUFBZTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixnREFBTTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsOENBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzR0FBc0csWUFBWTtBQUNsSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9GQUFvRixZQUFZO0FBQ2hHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQixnRkFBNkI7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyRUFBMkUsS0FBSyw2QkFBNkIsU0FBUztBQUN0SCxnQ0FBZ0MsaUNBQWlDO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsTUFBTTtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsK0JBQStCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxXQUFXLE1BQU0sVUFBVSxLQUFLLFdBQVcsSUFBSSxXQUFXLE1BQU0sZ0JBQWdCO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELE1BQU07QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QixnQkFBZ0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUxBQXFMO0FBQ3JMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZEQUE2RCxpQkFBaUI7QUFDOUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRCxnQkFBZ0I7QUFDMUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sK0JBQStCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0RUFBNEUsSUFBSTtBQUNoRiwrRUFBK0UsS0FBSztBQUNwRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsZUFBZTtBQUN2RDtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsc0NBQXNDO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsb0NBQW9DO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxzQ0FBc0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLE1BQU0sU0FBUyxrQkFBa0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwrQkFBK0I7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLEVBQUU7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHdCQUF3QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0Msa0JBQWtCLGVBQWUsS0FBSztBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3Y2Q3VGO0FBQ3ZGOzs7Ozs7O1VDREE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOQSxZQUFZLFlBQVk7QUFDUTs7QUFFSTtBQUNwQztBQUNBOztBQUVBOztBQUVBLHFCQUFxQiwyQ0FBVTtBQUMvQjtBQUNBO0FBQ0Esa0JBQWtCLG9EQUFXOztBQUU3QjtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLHVEIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWMtY2xpZW50Mi8uL3B1YmxpYy9wYWdlcy9hY2MudHBsLmpzIiwid2VicGFjazovL2FjLWNsaWVudDIvLi9ub2RlX21vZHVsZXMvQGxpdC9yZWFjdGl2ZS1lbGVtZW50L2RldmVsb3BtZW50L2Nzcy10YWcuanMiLCJ3ZWJwYWNrOi8vYWMtY2xpZW50Mi8uL25vZGVfbW9kdWxlcy9AbGl0L3JlYWN0aXZlLWVsZW1lbnQvZGV2ZWxvcG1lbnQvcmVhY3RpdmUtZWxlbWVudC5qcyIsIndlYnBhY2s6Ly9hYy1jbGllbnQyLy4vbm9kZV9tb2R1bGVzL2xpdC1lbGVtZW50L2RldmVsb3BtZW50L2xpdC1lbGVtZW50LmpzIiwid2VicGFjazovL2FjLWNsaWVudDIvLi9ub2RlX21vZHVsZXMvbGl0LWh0bWwvZGV2ZWxvcG1lbnQvbGl0LWh0bWwuanMiLCJ3ZWJwYWNrOi8vYWMtY2xpZW50Mi8uL25vZGVfbW9kdWxlcy9saXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vYWMtY2xpZW50Mi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9hYy1jbGllbnQyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9hYy1jbGllbnQyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYWMtY2xpZW50Mi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2FjLWNsaWVudDIvLi9wdWJsaWMvcGFnZXMvYWNjLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGh0bWwgfSBmcm9tICdsaXQnO1xuLy8gaW1wb3J0IHsgaHRtbCB9IGZyb20gJ2xpdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiByZW5kZXIoKSB7IFxuICAgIHJldHVybiBodG1sYFxuICAgIFxuICAgIDxzdHlsZT5cbiAgICAgIDpob3N0IHtcbiAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICB9XG4gICAgXG4gICAgPC9zdHlsZT5cbiAgICA8aDE+V2VsY29tZSB0byBPdXIgQ29tcGFueTwvaDE+IFxuICAgIDxoMj5UaGlzIGlzIHRoZSBzYW1wbGUgZm9yIHRoaXMgZm9yIHJpZ2h0IG5vdyA8Yj5WRVJTSU9OOiAke3RoaXMudmVyc2lvbn08L2I+PC9oMj5cbiAgICA8aDI+V2ViIFNpdGUgTWFpbiBJbmdyZWRpZW50czo8L2gyPlxuICAgIFxuICAgIDxwPlBhZ2VzIChIVE1MKTwvcD5cbiAgICA8cD5TdHlsZSBTaGVldHMgKENTUyk8L3A+XG4gICAgPHA+Q29tcHV0ZXIgQ29kZSAoSmF2YVNjcmlwdCk8L3A+XG4gICAgPHA+TGl2ZSBEYXRhIChGaWxlcyBhbmQgRGF0YWJhc2VzKTwvcD5cblxuICAgIDxpcm9uLXBhZ2VzIHNlbGVjdGVkPVwiMFwiPlxuICAgICAgICA8ZGl2PlBhZ2UgMDwvZGl2PlxuICAgICAgICA8ZGl2PlBhZ2UgMTwvZGl2PlxuICAgICAgICA8ZGl2PlBhZ2UgMjwvZGl2PlxuICAgICAgICA8ZGl2PlBhZ2UgMzwvZGl2PlxuICAgICAgPC9pcm9uLXBhZ2VzPlxuICAgIFxuYDtcbn0iLCIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgMjAxOSBHb29nbGUgTExDXG4gKiBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQlNELTMtQ2xhdXNlXG4gKi9cbi8qKlxuICogV2hldGhlciB0aGUgY3VycmVudCBicm93c2VyIHN1cHBvcnRzIGBhZG9wdGVkU3R5bGVTaGVldHNgLlxuICovXG5leHBvcnQgY29uc3Qgc3VwcG9ydHNBZG9wdGluZ1N0eWxlU2hlZXRzID0gd2luZG93LlNoYWRvd1Jvb3QgJiZcbiAgICAod2luZG93LlNoYWR5Q1NTID09PSB1bmRlZmluZWQgfHwgd2luZG93LlNoYWR5Q1NTLm5hdGl2ZVNoYWRvdykgJiZcbiAgICAnYWRvcHRlZFN0eWxlU2hlZXRzJyBpbiBEb2N1bWVudC5wcm90b3R5cGUgJiZcbiAgICAncmVwbGFjZScgaW4gQ1NTU3R5bGVTaGVldC5wcm90b3R5cGU7XG5jb25zdCBjb25zdHJ1Y3Rpb25Ub2tlbiA9IFN5bWJvbCgpO1xuY29uc3Qgc3R5bGVTaGVldENhY2hlID0gbmV3IE1hcCgpO1xuLyoqXG4gKiBBIGNvbnRhaW5lciBmb3IgYSBzdHJpbmcgb2YgQ1NTIHRleHQsIHRoYXQgbWF5IGJlIHVzZWQgdG8gY3JlYXRlIGEgQ1NTU3R5bGVTaGVldC5cbiAqXG4gKiBDU1NSZXN1bHQgaXMgdGhlIHJldHVybiB2YWx1ZSBvZiBgY3NzYC10YWdnZWQgdGVtcGxhdGUgbGl0ZXJhbHMgYW5kXG4gKiBgdW5zYWZlQ1NTKClgLiBJbiBvcmRlciB0byBlbnN1cmUgdGhhdCBDU1NSZXN1bHRzIGFyZSBvbmx5IGNyZWF0ZWQgdmlhIHRoZVxuICogYGNzc2AgdGFnIGFuZCBgdW5zYWZlQ1NTKClgLCBDU1NSZXN1bHQgY2Fubm90IGJlIGNvbnN0cnVjdGVkIGRpcmVjdGx5LlxuICovXG5leHBvcnQgY2xhc3MgQ1NTUmVzdWx0IHtcbiAgICBjb25zdHJ1Y3Rvcihjc3NUZXh0LCBzYWZlVG9rZW4pIHtcbiAgICAgICAgLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICAgICAgdGhpc1snXyRjc3NSZXN1bHQkJ10gPSB0cnVlO1xuICAgICAgICBpZiAoc2FmZVRva2VuICE9PSBjb25zdHJ1Y3Rpb25Ub2tlbikge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDU1NSZXN1bHQgaXMgbm90IGNvbnN0cnVjdGFibGUuIFVzZSBgdW5zYWZlQ1NTYCBvciBgY3NzYCBpbnN0ZWFkLicpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY3NzVGV4dCA9IGNzc1RleHQ7XG4gICAgfVxuICAgIC8vIE5vdGUsIHRoaXMgaXMgYSBnZXR0ZXIgc28gdGhhdCBpdCdzIGxhenkuIEluIHByYWN0aWNlLCB0aGlzIG1lYW5zXG4gICAgLy8gc3R5bGVzaGVldHMgYXJlIG5vdCBjcmVhdGVkIHVudGlsIHRoZSBmaXJzdCBlbGVtZW50IGluc3RhbmNlIGlzIG1hZGUuXG4gICAgZ2V0IHN0eWxlU2hlZXQoKSB7XG4gICAgICAgIC8vIE5vdGUsIGlmIGBzdXBwb3J0c0Fkb3B0aW5nU3R5bGVTaGVldHNgIGlzIHRydWUgdGhlbiB3ZSBhc3N1bWVcbiAgICAgICAgLy8gQ1NTU3R5bGVTaGVldCBpcyBjb25zdHJ1Y3RhYmxlLlxuICAgICAgICBsZXQgc3R5bGVTaGVldCA9IHN0eWxlU2hlZXRDYWNoZS5nZXQodGhpcy5jc3NUZXh0KTtcbiAgICAgICAgaWYgKHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cyAmJiBzdHlsZVNoZWV0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHN0eWxlU2hlZXRDYWNoZS5zZXQodGhpcy5jc3NUZXh0LCAoc3R5bGVTaGVldCA9IG5ldyBDU1NTdHlsZVNoZWV0KCkpKTtcbiAgICAgICAgICAgIHN0eWxlU2hlZXQucmVwbGFjZVN5bmModGhpcy5jc3NUZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3R5bGVTaGVldDtcbiAgICB9XG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNzc1RleHQ7XG4gICAgfVxufVxuY29uc3QgdGV4dEZyb21DU1NSZXN1bHQgPSAodmFsdWUpID0+IHtcbiAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgIGlmICh2YWx1ZVsnXyRjc3NSZXN1bHQkJ10gPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLmNzc1RleHQ7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBWYWx1ZSBwYXNzZWQgdG8gJ2NzcycgZnVuY3Rpb24gbXVzdCBiZSBhICdjc3MnIGZ1bmN0aW9uIHJlc3VsdDogYCArXG4gICAgICAgICAgICBgJHt2YWx1ZX0uIFVzZSAndW5zYWZlQ1NTJyB0byBwYXNzIG5vbi1saXRlcmFsIHZhbHVlcywgYnV0IHRha2UgY2FyZSBgICtcbiAgICAgICAgICAgIGB0byBlbnN1cmUgcGFnZSBzZWN1cml0eS5gKTtcbiAgICB9XG59O1xuLyoqXG4gKiBXcmFwIGEgdmFsdWUgZm9yIGludGVycG9sYXRpb24gaW4gYSB7QGxpbmtjb2RlIGNzc30gdGFnZ2VkIHRlbXBsYXRlIGxpdGVyYWwuXG4gKlxuICogVGhpcyBpcyB1bnNhZmUgYmVjYXVzZSB1bnRydXN0ZWQgQ1NTIHRleHQgY2FuIGJlIHVzZWQgdG8gcGhvbmUgaG9tZVxuICogb3IgZXhmaWx0cmF0ZSBkYXRhIHRvIGFuIGF0dGFja2VyIGNvbnRyb2xsZWQgc2l0ZS4gVGFrZSBjYXJlIHRvIG9ubHkgdXNlXG4gKiB0aGlzIHdpdGggdHJ1c3RlZCBpbnB1dC5cbiAqL1xuZXhwb3J0IGNvbnN0IHVuc2FmZUNTUyA9ICh2YWx1ZSkgPT4gbmV3IENTU1Jlc3VsdCh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnID8gdmFsdWUgOiBTdHJpbmcodmFsdWUpLCBjb25zdHJ1Y3Rpb25Ub2tlbik7XG4vKipcbiAqIEEgdGVtcGxhdGUgbGl0ZXJhbCB0YWcgd2hpY2ggY2FuIGJlIHVzZWQgd2l0aCBMaXRFbGVtZW50J3NcbiAqIHtAbGlua2NvZGUgTGl0RWxlbWVudC5zdHlsZXN9IHByb3BlcnR5IHRvIHNldCBlbGVtZW50IHN0eWxlcy5cbiAqXG4gKiBGb3Igc2VjdXJpdHkgcmVhc29ucywgb25seSBsaXRlcmFsIHN0cmluZyB2YWx1ZXMgYW5kIG51bWJlciBtYXkgYmUgdXNlZCBpblxuICogZW1iZWRkZWQgZXhwcmVzc2lvbnMuIFRvIGluY29ycG9yYXRlIG5vbi1saXRlcmFsIHZhbHVlcyB7QGxpbmtjb2RlIHVuc2FmZUNTU31cbiAqIG1heSBiZSB1c2VkIGluc2lkZSBhbiBleHByZXNzaW9uLlxuICovXG5leHBvcnQgY29uc3QgY3NzID0gKHN0cmluZ3MsIC4uLnZhbHVlcykgPT4ge1xuICAgIGNvbnN0IGNzc1RleHQgPSBzdHJpbmdzLmxlbmd0aCA9PT0gMVxuICAgICAgICA/IHN0cmluZ3NbMF1cbiAgICAgICAgOiB2YWx1ZXMucmVkdWNlKChhY2MsIHYsIGlkeCkgPT4gYWNjICsgdGV4dEZyb21DU1NSZXN1bHQodikgKyBzdHJpbmdzW2lkeCArIDFdLCBzdHJpbmdzWzBdKTtcbiAgICByZXR1cm4gbmV3IENTU1Jlc3VsdChjc3NUZXh0LCBjb25zdHJ1Y3Rpb25Ub2tlbik7XG59O1xuLyoqXG4gKiBBcHBsaWVzIHRoZSBnaXZlbiBzdHlsZXMgdG8gYSBgc2hhZG93Um9vdGAuIFdoZW4gU2hhZG93IERPTSBpc1xuICogYXZhaWxhYmxlIGJ1dCBgYWRvcHRlZFN0eWxlU2hlZXRzYCBpcyBub3QsIHN0eWxlcyBhcmUgYXBwZW5kZWQgdG8gdGhlXG4gKiBgc2hhZG93Um9vdGAgdG8gW21pbWljIHNwZWMgYmVoYXZpb3JdKGh0dHBzOi8vd2ljZy5naXRodWIuaW8vY29uc3RydWN0LXN0eWxlc2hlZXRzLyN1c2luZy1jb25zdHJ1Y3RlZC1zdHlsZXNoZWV0cykuXG4gKiBOb3RlLCB3aGVuIHNoaW1taW5nIGlzIHVzZWQsIGFueSBzdHlsZXMgdGhhdCBhcmUgc3Vic2VxdWVudGx5IHBsYWNlZCBpbnRvXG4gKiB0aGUgc2hhZG93Um9vdCBzaG91bGQgYmUgcGxhY2VkICpiZWZvcmUqIGFueSBzaGltbWVkIGFkb3B0ZWQgc3R5bGVzLiBUaGlzXG4gKiB3aWxsIG1hdGNoIHNwZWMgYmVoYXZpb3IgdGhhdCBnaXZlcyBhZG9wdGVkIHNoZWV0cyBwcmVjZWRlbmNlIG92ZXIgc3R5bGVzIGluXG4gKiBzaGFkb3dSb290LlxuICovXG5leHBvcnQgY29uc3QgYWRvcHRTdHlsZXMgPSAocmVuZGVyUm9vdCwgc3R5bGVzKSA9PiB7XG4gICAgaWYgKHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0cykge1xuICAgICAgICByZW5kZXJSb290LmFkb3B0ZWRTdHlsZVNoZWV0cyA9IHN0eWxlcy5tYXAoKHMpID0+IHMgaW5zdGFuY2VvZiBDU1NTdHlsZVNoZWV0ID8gcyA6IHMuc3R5bGVTaGVldCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzdHlsZXMuZm9yRWFjaCgocykgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICAgIGNvbnN0IG5vbmNlID0gd2luZG93WydsaXROb25jZSddO1xuICAgICAgICAgICAgaWYgKG5vbmNlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBzdHlsZS5zZXRBdHRyaWJ1dGUoJ25vbmNlJywgbm9uY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3R5bGUudGV4dENvbnRlbnQgPSBzLmNzc1RleHQ7XG4gICAgICAgICAgICByZW5kZXJSb290LmFwcGVuZENoaWxkKHN0eWxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmNvbnN0IGNzc1Jlc3VsdEZyb21TdHlsZVNoZWV0ID0gKHNoZWV0KSA9PiB7XG4gICAgbGV0IGNzc1RleHQgPSAnJztcbiAgICBmb3IgKGNvbnN0IHJ1bGUgb2Ygc2hlZXQuY3NzUnVsZXMpIHtcbiAgICAgICAgY3NzVGV4dCArPSBydWxlLmNzc1RleHQ7XG4gICAgfVxuICAgIHJldHVybiB1bnNhZmVDU1MoY3NzVGV4dCk7XG59O1xuZXhwb3J0IGNvbnN0IGdldENvbXBhdGlibGVTdHlsZSA9IHN1cHBvcnRzQWRvcHRpbmdTdHlsZVNoZWV0c1xuICAgID8gKHMpID0+IHNcbiAgICA6IChzKSA9PiBzIGluc3RhbmNlb2YgQ1NTU3R5bGVTaGVldCA/IGNzc1Jlc3VsdEZyb21TdHlsZVNoZWV0KHMpIDogcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNzcy10YWcuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG52YXIgX2EsIF9iLCBfYztcbnZhciBfZDtcbi8qKlxuICogVXNlIHRoaXMgbW9kdWxlIGlmIHlvdSB3YW50IHRvIGNyZWF0ZSB5b3VyIG93biBiYXNlIGNsYXNzIGV4dGVuZGluZ1xuICoge0BsaW5rIFJlYWN0aXZlRWxlbWVudH0uXG4gKiBAcGFja2FnZURvY3VtZW50YXRpb25cbiAqL1xuaW1wb3J0IHsgZ2V0Q29tcGF0aWJsZVN0eWxlLCBhZG9wdFN0eWxlcywgfSBmcm9tICcuL2Nzcy10YWcuanMnO1xuZXhwb3J0ICogZnJvbSAnLi9jc3MtdGFnLmpzJztcbmNvbnN0IERFVl9NT0RFID0gdHJ1ZTtcbmxldCByZXF1ZXN0VXBkYXRlVGhlbmFibGU7XG5sZXQgaXNzdWVXYXJuaW5nO1xuY29uc3QgdHJ1c3RlZFR5cGVzID0gd2luZG93XG4gICAgLnRydXN0ZWRUeXBlcztcbi8vIFRlbXBvcmFyeSB3b3JrYXJvdW5kIGZvciBodHRwczovL2NyYnVnLmNvbS85OTMyNjhcbi8vIEN1cnJlbnRseSwgYW55IGF0dHJpYnV0ZSBzdGFydGluZyB3aXRoIFwib25cIiBpcyBjb25zaWRlcmVkIHRvIGJlIGFcbi8vIFRydXN0ZWRTY3JpcHQgc291cmNlLiBTdWNoIGJvb2xlYW4gYXR0cmlidXRlcyBtdXN0IGJlIHNldCB0byB0aGUgZXF1aXZhbGVudFxuLy8gdHJ1c3RlZCBlbXB0eVNjcmlwdCB2YWx1ZS5cbmNvbnN0IGVtcHR5U3RyaW5nRm9yQm9vbGVhbkF0dHJpYnV0ZSA9IHRydXN0ZWRUeXBlc1xuICAgID8gdHJ1c3RlZFR5cGVzLmVtcHR5U2NyaXB0XG4gICAgOiAnJztcbmNvbnN0IHBvbHlmaWxsU3VwcG9ydCA9IERFVl9NT0RFXG4gICAgPyB3aW5kb3cucmVhY3RpdmVFbGVtZW50UG9seWZpbGxTdXBwb3J0RGV2TW9kZVxuICAgIDogd2luZG93LnJlYWN0aXZlRWxlbWVudFBvbHlmaWxsU3VwcG9ydDtcbmlmIChERVZfTU9ERSkge1xuICAgIC8vIEVuc3VyZSB3YXJuaW5ncyBhcmUgaXNzdWVkIG9ubHkgMXgsIGV2ZW4gaWYgbXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0XG4gICAgLy8gYXJlIGxvYWRlZC5cbiAgICBjb25zdCBpc3N1ZWRXYXJuaW5ncyA9ICgoX2EgPSBnbG9iYWxUaGlzLmxpdElzc3VlZFdhcm5pbmdzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncyA9IG5ldyBTZXQoKSkpO1xuICAgIC8vIElzc3VlIGEgd2FybmluZywgaWYgd2UgaGF2ZW4ndCBhbHJlYWR5LlxuICAgIGlzc3VlV2FybmluZyA9IChjb2RlLCB3YXJuaW5nKSA9PiB7XG4gICAgICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgICAgIGlmICghaXNzdWVkV2FybmluZ3MuaGFzKHdhcm5pbmcpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4od2FybmluZyk7XG4gICAgICAgICAgICBpc3N1ZWRXYXJuaW5ncy5hZGQod2FybmluZyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlzc3VlV2FybmluZygnZGV2LW1vZGUnLCBgTGl0IGlzIGluIGRldiBtb2RlLiBOb3QgcmVjb21tZW5kZWQgZm9yIHByb2R1Y3Rpb24hYCk7XG4gICAgLy8gSXNzdWUgcG9seWZpbGwgc3VwcG9ydCB3YXJuaW5nLlxuICAgIGlmICgoKF9iID0gd2luZG93LlNoYWR5RE9NKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaW5Vc2UpICYmIHBvbHlmaWxsU3VwcG9ydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlzc3VlV2FybmluZygncG9seWZpbGwtc3VwcG9ydC1taXNzaW5nJywgYFNoYWRvdyBET00gaXMgYmVpbmcgcG9seWZpbGxlZCB2aWEgXFxgU2hhZHlET01cXGAgYnV0IGAgK1xuICAgICAgICAgICAgYHRoZSBcXGBwb2x5ZmlsbC1zdXBwb3J0XFxgIG1vZHVsZSBoYXMgbm90IGJlZW4gbG9hZGVkLmApO1xuICAgIH1cbiAgICByZXF1ZXN0VXBkYXRlVGhlbmFibGUgPSAobmFtZSkgPT4gKHtcbiAgICAgICAgdGhlbjogKG9uZnVsZmlsbGVkLCBfb25yZWplY3RlZCkgPT4ge1xuICAgICAgICAgICAgaXNzdWVXYXJuaW5nKCdyZXF1ZXN0LXVwZGF0ZS1wcm9taXNlJywgYFRoZSBcXGByZXF1ZXN0VXBkYXRlXFxgIG1ldGhvZCBzaG91bGQgbm8gbG9uZ2VyIHJldHVybiBhIFByb21pc2UgYnV0IGAgK1xuICAgICAgICAgICAgICAgIGBkb2VzIHNvIG9uIFxcYCR7bmFtZX1cXGAuIFVzZSBcXGB1cGRhdGVDb21wbGV0ZVxcYCBpbnN0ZWFkLmApO1xuICAgICAgICAgICAgaWYgKG9uZnVsZmlsbGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBvbmZ1bGZpbGxlZChmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG59XG4vKipcbiAqIFVzZWZ1bCBmb3IgdmlzdWFsaXppbmcgYW5kIGxvZ2dpbmcgaW5zaWdodHMgaW50byB3aGF0IHRoZSBMaXQgdGVtcGxhdGUgc3lzdGVtIGlzIGRvaW5nLlxuICpcbiAqIENvbXBpbGVkIG91dCBvZiBwcm9kIG1vZGUgYnVpbGRzLlxuICovXG5jb25zdCBkZWJ1Z0xvZ0V2ZW50ID0gREVWX01PREVcbiAgICA/IChldmVudCkgPT4ge1xuICAgICAgICBjb25zdCBzaG91bGRFbWl0ID0gd2luZG93XG4gICAgICAgICAgICAuZW1pdExpdERlYnVnTG9nRXZlbnRzO1xuICAgICAgICBpZiAoIXNob3VsZEVtaXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoJ2xpdC1kZWJ1ZycsIHtcbiAgICAgICAgICAgIGRldGFpbDogZXZlbnQsXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgOiB1bmRlZmluZWQ7XG4vKlxuICogV2hlbiB1c2luZyBDbG9zdXJlIENvbXBpbGVyLCBKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KHByb3BlcnR5LCBvYmplY3QpIGlzXG4gKiByZXBsYWNlZCBhdCBjb21waWxlIHRpbWUgYnkgdGhlIG11bmdlZCBuYW1lIGZvciBvYmplY3RbcHJvcGVydHldLiBXZSBjYW5ub3RcbiAqIGFsaWFzIHRoaXMgZnVuY3Rpb24sIHNvIHdlIGhhdmUgdG8gdXNlIGEgc21hbGwgc2hpbSB0aGF0IGhhcyB0aGUgc2FtZVxuICogYmVoYXZpb3Igd2hlbiBub3QgY29tcGlsaW5nLlxuICovXG4vKkBfX0lOTElORV9fKi9cbmNvbnN0IEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkgPSAocHJvcCwgX29iaikgPT4gcHJvcDtcbmV4cG9ydCBjb25zdCBkZWZhdWx0Q29udmVydGVyID0ge1xuICAgIHRvQXR0cmlidXRlKHZhbHVlLCB0eXBlKSB7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBCb29sZWFuOlxuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUgPyBlbXB0eVN0cmluZ0ZvckJvb2xlYW5BdHRyaWJ1dGUgOiBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBPYmplY3Q6XG4gICAgICAgICAgICBjYXNlIEFycmF5OlxuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSB2YWx1ZSBpcyBgbnVsbGAgb3IgYHVuZGVmaW5lZGAgcGFzcyB0aGlzIHRocm91Z2hcbiAgICAgICAgICAgICAgICAvLyB0byBhbGxvdyByZW1vdmluZy9ubyBjaGFuZ2UgYmVoYXZpb3IuXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZSA9PSBudWxsID8gdmFsdWUgOiBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgZnJvbUF0dHJpYnV0ZSh2YWx1ZSwgdHlwZSkge1xuICAgICAgICBsZXQgZnJvbVZhbHVlID0gdmFsdWU7XG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSBCb29sZWFuOlxuICAgICAgICAgICAgICAgIGZyb21WYWx1ZSA9IHZhbHVlICE9PSBudWxsO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBOdW1iZXI6XG4gICAgICAgICAgICAgICAgZnJvbVZhbHVlID0gdmFsdWUgPT09IG51bGwgPyBudWxsIDogTnVtYmVyKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgT2JqZWN0OlxuICAgICAgICAgICAgY2FzZSBBcnJheTpcbiAgICAgICAgICAgICAgICAvLyBEbyAqbm90KiBnZW5lcmF0ZSBleGNlcHRpb24gd2hlbiBpbnZhbGlkIEpTT04gaXMgc2V0IGFzIGVsZW1lbnRzXG4gICAgICAgICAgICAgICAgLy8gZG9uJ3Qgbm9ybWFsbHkgY29tcGxhaW4gb24gYmVpbmcgbWlzLWNvbmZpZ3VyZWQuXG4gICAgICAgICAgICAgICAgLy8gVE9ETyhzb3J2ZWxsKTogRG8gZ2VuZXJhdGUgZXhjZXB0aW9uIGluICpkZXYgbW9kZSouXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXNzZXJ0IHRvIGFkaGVyZSB0byBCYXplbCdzIFwibXVzdCB0eXBlIGFzc2VydCBKU09OIHBhcnNlXCIgcnVsZS5cbiAgICAgICAgICAgICAgICAgICAgZnJvbVZhbHVlID0gSlNPTi5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyb21WYWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmcm9tVmFsdWU7XG4gICAgfSxcbn07XG4vKipcbiAqIENoYW5nZSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdHJ1ZSBpZiBgdmFsdWVgIGlzIGRpZmZlcmVudCBmcm9tIGBvbGRWYWx1ZWAuXG4gKiBUaGlzIG1ldGhvZCBpcyB1c2VkIGFzIHRoZSBkZWZhdWx0IGZvciBhIHByb3BlcnR5J3MgYGhhc0NoYW5nZWRgIGZ1bmN0aW9uLlxuICovXG5leHBvcnQgY29uc3Qgbm90RXF1YWwgPSAodmFsdWUsIG9sZCkgPT4ge1xuICAgIC8vIFRoaXMgZW5zdXJlcyAob2xkPT1OYU4sIHZhbHVlPT1OYU4pIGFsd2F5cyByZXR1cm5zIGZhbHNlXG4gICAgcmV0dXJuIG9sZCAhPT0gdmFsdWUgJiYgKG9sZCA9PT0gb2xkIHx8IHZhbHVlID09PSB2YWx1ZSk7XG59O1xuY29uc3QgZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24gPSB7XG4gICAgYXR0cmlidXRlOiB0cnVlLFxuICAgIHR5cGU6IFN0cmluZyxcbiAgICBjb252ZXJ0ZXI6IGRlZmF1bHRDb252ZXJ0ZXIsXG4gICAgcmVmbGVjdDogZmFsc2UsXG4gICAgaGFzQ2hhbmdlZDogbm90RXF1YWwsXG59O1xuLyoqXG4gKiBUaGUgQ2xvc3VyZSBKUyBDb21waWxlciBkb2Vzbid0IGN1cnJlbnRseSBoYXZlIGdvb2Qgc3VwcG9ydCBmb3Igc3RhdGljXG4gKiBwcm9wZXJ0eSBzZW1hbnRpY3Mgd2hlcmUgXCJ0aGlzXCIgaXMgZHluYW1pYyAoZS5nLlxuICogaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWNvbXBpbGVyL2lzc3Vlcy8zMTc3IGFuZCBvdGhlcnMpIHNvIHdlIHVzZVxuICogdGhpcyBoYWNrIHRvIGJ5cGFzcyBhbnkgcmV3cml0aW5nIGJ5IHRoZSBjb21waWxlci5cbiAqL1xuY29uc3QgZmluYWxpemVkID0gJ2ZpbmFsaXplZCc7XG4vKipcbiAqIEJhc2UgZWxlbWVudCBjbGFzcyB3aGljaCBtYW5hZ2VzIGVsZW1lbnQgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcy4gV2hlblxuICogcHJvcGVydGllcyBjaGFuZ2UsIHRoZSBgdXBkYXRlYCBtZXRob2QgaXMgYXN5bmNocm9ub3VzbHkgY2FsbGVkLiBUaGlzIG1ldGhvZFxuICogc2hvdWxkIGJlIHN1cHBsaWVkIGJ5IHN1YmNsYXNzZXJzIHRvIHJlbmRlciB1cGRhdGVzIGFzIGRlc2lyZWQuXG4gKiBAbm9Jbmhlcml0RG9jXG4gKi9cbmV4cG9ydCBjbGFzcyBSZWFjdGl2ZUVsZW1lbnQgZXh0ZW5kcyBIVE1MRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX19pbnN0YW5jZVByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcnVlIGlmIHRoZXJlIGlzIGEgcGVuZGluZyB1cGRhdGUgYXMgYSByZXN1bHQgb2YgY2FsbGluZyBgcmVxdWVzdFVwZGF0ZSgpYC5cbiAgICAgICAgICogU2hvdWxkIG9ubHkgYmUgcmVhZC5cbiAgICAgICAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gZmFsc2U7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJcyBzZXQgdG8gYHRydWVgIGFmdGVyIHRoZSBmaXJzdCB1cGRhdGUuIFRoZSBlbGVtZW50IGNvZGUgY2Fubm90IGFzc3VtZVxuICAgICAgICAgKiB0aGF0IGByZW5kZXJSb290YCBleGlzdHMgYmVmb3JlIHRoZSBlbGVtZW50IGBoYXNVcGRhdGVkYC5cbiAgICAgICAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaGFzVXBkYXRlZCA9IGZhbHNlO1xuICAgICAgICAvKipcbiAgICAgICAgICogTmFtZSBvZiBjdXJyZW50bHkgcmVmbGVjdGluZyBwcm9wZXJ0eVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSA9IG51bGw7XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemUoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhbiBpbml0aWFsaXplciBmdW5jdGlvbiB0byB0aGUgY2xhc3MgdGhhdCBpcyBjYWxsZWQgZHVyaW5nIGluc3RhbmNlXG4gICAgICogY29uc3RydWN0aW9uLlxuICAgICAqXG4gICAgICogVGhpcyBpcyB1c2VmdWwgZm9yIGNvZGUgdGhhdCBydW5zIGFnYWluc3QgYSBgUmVhY3RpdmVFbGVtZW50YFxuICAgICAqIHN1YmNsYXNzLCBzdWNoIGFzIGEgZGVjb3JhdG9yLCB0aGF0IG5lZWRzIHRvIGRvIHdvcmsgZm9yIGVhY2hcbiAgICAgKiBpbnN0YW5jZSwgc3VjaCBhcyBzZXR0aW5nIHVwIGEgYFJlYWN0aXZlQ29udHJvbGxlcmAuXG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIGNvbnN0IG15RGVjb3JhdG9yID0gKHRhcmdldDogdHlwZW9mIFJlYWN0aXZlRWxlbWVudCwga2V5OiBzdHJpbmcpID0+IHtcbiAgICAgKiAgIHRhcmdldC5hZGRJbml0aWFsaXplcigoaW5zdGFuY2U6IFJlYWN0aXZlRWxlbWVudCkgPT4ge1xuICAgICAqICAgICAvLyBUaGlzIGlzIHJ1biBkdXJpbmcgY29uc3RydWN0aW9uIG9mIHRoZSBlbGVtZW50XG4gICAgICogICAgIG5ldyBNeUNvbnRyb2xsZXIoaW5zdGFuY2UpO1xuICAgICAqICAgfSk7XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogRGVjb3JhdGluZyBhIGZpZWxkIHdpbGwgdGhlbiBjYXVzZSBlYWNoIGluc3RhbmNlIHRvIHJ1biBhbiBpbml0aWFsaXplclxuICAgICAqIHRoYXQgYWRkcyBhIGNvbnRyb2xsZXI6XG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICAgICAqICAgQG15RGVjb3JhdG9yIGZvbztcbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBJbml0aWFsaXplcnMgYXJlIHN0b3JlZCBwZXItY29uc3RydWN0b3IuIEFkZGluZyBhbiBpbml0aWFsaXplciB0byBhXG4gICAgICogc3ViY2xhc3MgZG9lcyBub3QgYWRkIGl0IHRvIGEgc3VwZXJjbGFzcy4gU2luY2UgaW5pdGlhbGl6ZXJzIGFyZSBydW4gaW5cbiAgICAgKiBjb25zdHJ1Y3RvcnMsIGluaXRpYWxpemVycyB3aWxsIHJ1biBpbiBvcmRlciBvZiB0aGUgY2xhc3MgaGllcmFyY2h5LFxuICAgICAqIHN0YXJ0aW5nIHdpdGggc3VwZXJjbGFzc2VzIGFuZCBwcm9ncmVzc2luZyB0byB0aGUgaW5zdGFuY2UncyBjbGFzcy5cbiAgICAgKlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIGFkZEluaXRpYWxpemVyKGluaXRpYWxpemVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5faW5pdGlhbGl6ZXJzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAodGhpcy5faW5pdGlhbGl6ZXJzID0gW10pO1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplcnMucHVzaChpbml0aWFsaXplcik7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGF0dHJpYnV0ZXMgY29ycmVzcG9uZGluZyB0byB0aGUgcmVnaXN0ZXJlZCBwcm9wZXJ0aWVzLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICogQGNhdGVnb3J5IGF0dHJpYnV0ZXNcbiAgICAgKi9cbiAgICBzdGF0aWMgZ2V0IG9ic2VydmVkQXR0cmlidXRlcygpIHtcbiAgICAgICAgLy8gbm90ZTogcGlnZ3kgYmFja2luZyBvbiB0aGlzIHRvIGVuc3VyZSB3ZSdyZSBmaW5hbGl6ZWQuXG4gICAgICAgIHRoaXMuZmluYWxpemUoKTtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlcyA9IFtdO1xuICAgICAgICAvLyBVc2UgZm9yRWFjaCBzbyB0aGlzIHdvcmtzIGV2ZW4gaWYgZm9yL29mIGxvb3BzIGFyZSBjb21waWxlZCB0byBmb3IgbG9vcHNcbiAgICAgICAgLy8gZXhwZWN0aW5nIGFycmF5c1xuICAgICAgICB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLmZvckVhY2goKHYsIHApID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF0dHIgPSB0aGlzLl9fYXR0cmlidXRlTmFtZUZvclByb3BlcnR5KHAsIHYpO1xuICAgICAgICAgICAgaWYgKGF0dHIgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwLnNldChhdHRyLCBwKTtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLnB1c2goYXR0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIHByb3BlcnR5IGFjY2Vzc29yIG9uIHRoZSBlbGVtZW50IHByb3RvdHlwZSBpZiBvbmUgZG9lcyBub3QgZXhpc3RcbiAgICAgKiBhbmQgc3RvcmVzIGEge0BsaW5rY29kZSBQcm9wZXJ0eURlY2xhcmF0aW9ufSBmb3IgdGhlIHByb3BlcnR5IHdpdGggdGhlXG4gICAgICogZ2l2ZW4gb3B0aW9ucy4gVGhlIHByb3BlcnR5IHNldHRlciBjYWxscyB0aGUgcHJvcGVydHkncyBgaGFzQ2hhbmdlZGBcbiAgICAgKiBwcm9wZXJ0eSBvcHRpb24gb3IgdXNlcyBhIHN0cmljdCBpZGVudGl0eSBjaGVjayB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3RcbiAgICAgKiB0byByZXF1ZXN0IGFuIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIG1heSBiZSBvdmVycmlkZGVuIHRvIGN1c3RvbWl6ZSBwcm9wZXJ0aWVzOyBob3dldmVyLFxuICAgICAqIHdoZW4gZG9pbmcgc28sIGl0J3MgaW1wb3J0YW50IHRvIGNhbGwgYHN1cGVyLmNyZWF0ZVByb3BlcnR5YCB0byBlbnN1cmVcbiAgICAgKiB0aGUgcHJvcGVydHkgaXMgc2V0dXAgY29ycmVjdGx5LiBUaGlzIG1ldGhvZCBjYWxsc1xuICAgICAqIGBnZXRQcm9wZXJ0eURlc2NyaXB0b3JgIGludGVybmFsbHkgdG8gZ2V0IGEgZGVzY3JpcHRvciB0byBpbnN0YWxsLlxuICAgICAqIFRvIGN1c3RvbWl6ZSB3aGF0IHByb3BlcnRpZXMgZG8gd2hlbiB0aGV5IGFyZSBnZXQgb3Igc2V0LCBvdmVycmlkZVxuICAgICAqIGBnZXRQcm9wZXJ0eURlc2NyaXB0b3JgLiBUbyBjdXN0b21pemUgdGhlIG9wdGlvbnMgZm9yIGEgcHJvcGVydHksXG4gICAgICogaW1wbGVtZW50IGBjcmVhdGVQcm9wZXJ0eWAgbGlrZSB0aGlzOlxuICAgICAqXG4gICAgICogYGBgdHNcbiAgICAgKiBzdGF0aWMgY3JlYXRlUHJvcGVydHkobmFtZSwgb3B0aW9ucykge1xuICAgICAqICAgb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24ob3B0aW9ucywge215T3B0aW9uOiB0cnVlfSk7XG4gICAgICogICBzdXBlci5jcmVhdGVQcm9wZXJ0eShuYW1lLCBvcHRpb25zKTtcbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqIEBjYXRlZ29yeSBwcm9wZXJ0aWVzXG4gICAgICovXG4gICAgc3RhdGljIGNyZWF0ZVByb3BlcnR5KG5hbWUsIG9wdGlvbnMgPSBkZWZhdWx0UHJvcGVydHlEZWNsYXJhdGlvbikge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIGlmIHRoaXMgaXMgYSBzdGF0ZSBwcm9wZXJ0eSwgZm9yY2UgdGhlIGF0dHJpYnV0ZSB0byBmYWxzZS5cbiAgICAgICAgaWYgKG9wdGlvbnMuc3RhdGUpIHtcbiAgICAgICAgICAgIC8vIENhc3QgYXMgYW55IHNpbmNlIHRoaXMgaXMgcmVhZG9ubHkuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgb3B0aW9ucy5hdHRyaWJ1dGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOb3RlLCBzaW5jZSB0aGlzIGNhbiBiZSBjYWxsZWQgYnkgdGhlIGBAcHJvcGVydHlgIGRlY29yYXRvciB3aGljaFxuICAgICAgICAvLyBpcyBjYWxsZWQgYmVmb3JlIGBmaW5hbGl6ZWAsIHdlIGVuc3VyZSBmaW5hbGl6YXRpb24gaGFzIGJlZW4ga2lja2VkIG9mZi5cbiAgICAgICAgdGhpcy5maW5hbGl6ZSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzLnNldChuYW1lLCBvcHRpb25zKTtcbiAgICAgICAgLy8gRG8gbm90IGdlbmVyYXRlIGFuIGFjY2Vzc29yIGlmIHRoZSBwcm90b3R5cGUgYWxyZWFkeSBoYXMgb25lLCBzaW5jZVxuICAgICAgICAvLyBpdCB3b3VsZCBiZSBsb3N0IG90aGVyd2lzZSBhbmQgdGhhdCB3b3VsZCBuZXZlciBiZSB0aGUgdXNlcidzIGludGVudGlvbjtcbiAgICAgICAgLy8gSW5zdGVhZCwgd2UgZXhwZWN0IHVzZXJzIHRvIGNhbGwgYHJlcXVlc3RVcGRhdGVgIHRoZW1zZWx2ZXMgZnJvbVxuICAgICAgICAvLyB1c2VyLWRlZmluZWQgYWNjZXNzb3JzLiBOb3RlIHRoYXQgaWYgdGhlIHN1cGVyIGhhcyBhbiBhY2Nlc3NvciB3ZSB3aWxsXG4gICAgICAgIC8vIHN0aWxsIG92ZXJ3cml0ZSBpdFxuICAgICAgICBpZiAoIW9wdGlvbnMubm9BY2Nlc3NvciAmJiAhdGhpcy5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IHR5cGVvZiBuYW1lID09PSAnc3ltYm9sJyA/IFN5bWJvbCgpIDogYF9fJHtuYW1lfWA7XG4gICAgICAgICAgICBjb25zdCBkZXNjcmlwdG9yID0gdGhpcy5nZXRQcm9wZXJ0eURlc2NyaXB0b3IobmFtZSwga2V5LCBvcHRpb25zKTtcbiAgICAgICAgICAgIGlmIChkZXNjcmlwdG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5wcm90b3R5cGUsIG5hbWUsIGRlc2NyaXB0b3IpO1xuICAgICAgICAgICAgICAgIGlmIChERVZfTU9ERSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIGNsYXNzIGRvZXNuJ3QgaGF2ZSBpdHMgb3duIHNldCwgY3JlYXRlIG9uZSBhbmQgaW5pdGlhbGl6ZVxuICAgICAgICAgICAgICAgICAgICAvLyB3aXRoIHRoZSB2YWx1ZXMgaW4gdGhlIHNldCBmcm9tIHRoZSBuZWFyZXN0IGFuY2VzdG9yIGNsYXNzLCBpZiBhbnkuXG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNPd25Qcm9wZXJ0eSgnX19yZWFjdGl2ZVByb3BlcnR5S2V5cycpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fcmVhY3RpdmVQcm9wZXJ0eUtleXMgPSBuZXcgU2V0KChfYSA9IHRoaXMuX19yZWFjdGl2ZVByb3BlcnR5S2V5cykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogW10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19yZWFjdGl2ZVByb3BlcnR5S2V5cy5hZGQobmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwcm9wZXJ0eSBkZXNjcmlwdG9yIHRvIGJlIGRlZmluZWQgb24gdGhlIGdpdmVuIG5hbWVkIHByb3BlcnR5LlxuICAgICAqIElmIG5vIGRlc2NyaXB0b3IgaXMgcmV0dXJuZWQsIHRoZSBwcm9wZXJ0eSB3aWxsIG5vdCBiZWNvbWUgYW4gYWNjZXNzb3IuXG4gICAgICogRm9yIGV4YW1wbGUsXG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICAgICAqICAgc3RhdGljIGdldFByb3BlcnR5RGVzY3JpcHRvcihuYW1lLCBrZXksIG9wdGlvbnMpIHtcbiAgICAgKiAgICAgY29uc3QgZGVmYXVsdERlc2NyaXB0b3IgPVxuICAgICAqICAgICAgICAgc3VwZXIuZ2V0UHJvcGVydHlEZXNjcmlwdG9yKG5hbWUsIGtleSwgb3B0aW9ucyk7XG4gICAgICogICAgIGNvbnN0IHNldHRlciA9IGRlZmF1bHREZXNjcmlwdG9yLnNldDtcbiAgICAgKiAgICAgcmV0dXJuIHtcbiAgICAgKiAgICAgICBnZXQ6IGRlZmF1bHREZXNjcmlwdG9yLmdldCxcbiAgICAgKiAgICAgICBzZXQodmFsdWUpIHtcbiAgICAgKiAgICAgICAgIHNldHRlci5jYWxsKHRoaXMsIHZhbHVlKTtcbiAgICAgKiAgICAgICAgIC8vIGN1c3RvbSBhY3Rpb24uXG4gICAgICogICAgICAgfSxcbiAgICAgKiAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICogICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAqICAgICB9XG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQG5vY29sbGFwc2VcbiAgICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRQcm9wZXJ0eURlc2NyaXB0b3IobmFtZSwga2V5LCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzW2tleV07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29uc3Qgb2xkVmFsdWUgPSB0aGlzW25hbWVdO1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdFVwZGF0ZShuYW1lLCBvbGRWYWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJvcGVydHkgb3B0aW9ucyBhc3NvY2lhdGVkIHdpdGggdGhlIGdpdmVuIHByb3BlcnR5LlxuICAgICAqIFRoZXNlIG9wdGlvbnMgYXJlIGRlZmluZWQgd2l0aCBhIGBQcm9wZXJ0eURlY2xhcmF0aW9uYCB2aWEgdGhlIGBwcm9wZXJ0aWVzYFxuICAgICAqIG9iamVjdCBvciB0aGUgYEBwcm9wZXJ0eWAgZGVjb3JhdG9yIGFuZCBhcmUgcmVnaXN0ZXJlZCBpblxuICAgICAqIGBjcmVhdGVQcm9wZXJ0eSguLi4pYC5cbiAgICAgKlxuICAgICAqIE5vdGUsIHRoaXMgbWV0aG9kIHNob3VsZCBiZSBjb25zaWRlcmVkIFwiZmluYWxcIiBhbmQgbm90IG92ZXJyaWRkZW4uIFRvXG4gICAgICogY3VzdG9taXplIHRoZSBvcHRpb25zIGZvciBhIGdpdmVuIHByb3BlcnR5LCBvdmVycmlkZVxuICAgICAqIHtAbGlua2NvZGUgY3JlYXRlUHJvcGVydHl9LlxuICAgICAqXG4gICAgICogQG5vY29sbGFwc2VcbiAgICAgKiBAZmluYWxcbiAgICAgKiBAY2F0ZWdvcnkgcHJvcGVydGllc1xuICAgICAqL1xuICAgIHN0YXRpYyBnZXRQcm9wZXJ0eU9wdGlvbnMobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50UHJvcGVydGllcy5nZXQobmFtZSkgfHwgZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb247XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgcHJvcGVydHkgYWNjZXNzb3JzIGZvciByZWdpc3RlcmVkIHByb3BlcnRpZXMsIHNldHMgdXAgZWxlbWVudFxuICAgICAqIHN0eWxpbmcsIGFuZCBlbnN1cmVzIGFueSBzdXBlcmNsYXNzZXMgYXJlIGFsc28gZmluYWxpemVkLiBSZXR1cm5zIHRydWUgaWZcbiAgICAgKiB0aGUgZWxlbWVudCB3YXMgZmluYWxpemVkLlxuICAgICAqIEBub2NvbGxhcHNlXG4gICAgICovXG4gICAgc3RhdGljIGZpbmFsaXplKCkge1xuICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShmaW5hbGl6ZWQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpc1tmaW5hbGl6ZWRdID0gdHJ1ZTtcbiAgICAgICAgLy8gZmluYWxpemUgYW55IHN1cGVyY2xhc3Nlc1xuICAgICAgICBjb25zdCBzdXBlckN0b3IgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YodGhpcyk7XG4gICAgICAgIHN1cGVyQ3Rvci5maW5hbGl6ZSgpO1xuICAgICAgICB0aGlzLmVsZW1lbnRQcm9wZXJ0aWVzID0gbmV3IE1hcChzdXBlckN0b3IuZWxlbWVudFByb3BlcnRpZXMpO1xuICAgICAgICAvLyBpbml0aWFsaXplIE1hcCBwb3B1bGF0ZWQgaW4gb2JzZXJ2ZWRBdHRyaWJ1dGVzXG4gICAgICAgIHRoaXMuX19hdHRyaWJ1dGVUb1Byb3BlcnR5TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICAvLyBtYWtlIGFueSBwcm9wZXJ0aWVzXG4gICAgICAgIC8vIE5vdGUsIG9ubHkgcHJvY2VzcyBcIm93blwiIHByb3BlcnRpZXMgc2luY2UgdGhpcyBlbGVtZW50IHdpbGwgaW5oZXJpdFxuICAgICAgICAvLyBhbnkgcHJvcGVydGllcyBkZWZpbmVkIG9uIHRoZSBzdXBlckNsYXNzLCBhbmQgZmluYWxpemF0aW9uIGVuc3VyZXNcbiAgICAgICAgLy8gdGhlIGVudGlyZSBwcm90b3R5cGUgY2hhaW4gaXMgZmluYWxpemVkLlxuICAgICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShKU0NvbXBpbGVyX3JlbmFtZVByb3BlcnR5KCdwcm9wZXJ0aWVzJywgdGhpcykpKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IHRoaXMucHJvcGVydGllcztcbiAgICAgICAgICAgIC8vIHN1cHBvcnQgc3ltYm9scyBpbiBwcm9wZXJ0aWVzIChJRTExIGRvZXMgbm90IHN1cHBvcnQgdGhpcylcbiAgICAgICAgICAgIGNvbnN0IHByb3BLZXlzID0gW1xuICAgICAgICAgICAgICAgIC4uLk9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHByb3BzKSxcbiAgICAgICAgICAgICAgICAuLi5PYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHByb3BzKSxcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICAvLyBUaGlzIGZvci9vZiBpcyBvayBiZWNhdXNlIHByb3BLZXlzIGlzIGFuIGFycmF5XG4gICAgICAgICAgICBmb3IgKGNvbnN0IHAgb2YgcHJvcEtleXMpIHtcbiAgICAgICAgICAgICAgICAvLyBub3RlLCB1c2Ugb2YgYGFueWAgaXMgZHVlIHRvIFR5cGVTY3JpcHQgbGFjayBvZiBzdXBwb3J0IGZvciBzeW1ib2wgaW5cbiAgICAgICAgICAgICAgICAvLyBpbmRleCB0eXBlc1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQcm9wZXJ0eShwLCBwcm9wc1twXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbGVtZW50U3R5bGVzID0gdGhpcy5maW5hbGl6ZVN0eWxlcyh0aGlzLnN0eWxlcyk7XG4gICAgICAgIC8vIERFViBtb2RlIHdhcm5pbmdzXG4gICAgICAgIGlmIChERVZfTU9ERSkge1xuICAgICAgICAgICAgY29uc3Qgd2FyblJlbW92ZWRPclJlbmFtZWQgPSAobmFtZSwgcmVuYW1lZCA9IGZhbHNlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvdG90eXBlLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzc3VlV2FybmluZyhyZW5hbWVkID8gJ3JlbmFtZWQtYXBpJyA6ICdyZW1vdmVkLWFwaScsIGBcXGAke25hbWV9XFxgIGlzIGltcGxlbWVudGVkIG9uIGNsYXNzICR7dGhpcy5uYW1lfS4gSXQgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICBgaGFzIGJlZW4gJHtyZW5hbWVkID8gJ3JlbmFtZWQnIDogJ3JlbW92ZWQnfSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBpbiB0aGlzIHZlcnNpb24gb2YgTGl0RWxlbWVudC5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2FyblJlbW92ZWRPclJlbmFtZWQoJ2luaXRpYWxpemUnKTtcbiAgICAgICAgICAgIHdhcm5SZW1vdmVkT3JSZW5hbWVkKCdyZXF1ZXN0VXBkYXRlSW50ZXJuYWwnKTtcbiAgICAgICAgICAgIHdhcm5SZW1vdmVkT3JSZW5hbWVkKCdfZ2V0VXBkYXRlQ29tcGxldGUnLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGFrZXMgdGhlIHN0eWxlcyB0aGUgdXNlciBzdXBwbGllZCB2aWEgdGhlIGBzdGF0aWMgc3R5bGVzYCBwcm9wZXJ0eSBhbmRcbiAgICAgKiByZXR1cm5zIHRoZSBhcnJheSBvZiBzdHlsZXMgdG8gYXBwbHkgdG8gdGhlIGVsZW1lbnQuXG4gICAgICogT3ZlcnJpZGUgdGhpcyBtZXRob2QgdG8gaW50ZWdyYXRlIGludG8gYSBzdHlsZSBtYW5hZ2VtZW50IHN5c3RlbS5cbiAgICAgKlxuICAgICAqIFN0eWxlcyBhcmUgZGVkdXBsaWNhdGVkIHByZXNlcnZpbmcgdGhlIF9sYXN0XyBpbnN0YW5jZSBpbiB0aGUgbGlzdC4gVGhpc1xuICAgICAqIGlzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uIHRvIGF2b2lkIGR1cGxpY2F0ZWQgc3R5bGVzIHRoYXQgY2FuIG9jY3VyXG4gICAgICogZXNwZWNpYWxseSB3aGVuIGNvbXBvc2luZyB2aWEgc3ViY2xhc3NpbmcuIFRoZSBsYXN0IGl0ZW0gaXMga2VwdCB0byB0cnlcbiAgICAgKiB0byBwcmVzZXJ2ZSB0aGUgY2FzY2FkZSBvcmRlciB3aXRoIHRoZSBhc3N1bXB0aW9uIHRoYXQgaXQncyBtb3N0IGltcG9ydGFudFxuICAgICAqIHRoYXQgbGFzdCBhZGRlZCBzdHlsZXMgb3ZlcnJpZGUgcHJldmlvdXMgc3R5bGVzLlxuICAgICAqXG4gICAgICogQG5vY29sbGFwc2VcbiAgICAgKiBAY2F0ZWdvcnkgc3R5bGVzXG4gICAgICovXG4gICAgc3RhdGljIGZpbmFsaXplU3R5bGVzKHN0eWxlcykge1xuICAgICAgICBjb25zdCBlbGVtZW50U3R5bGVzID0gW107XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHN0eWxlcykpIHtcbiAgICAgICAgICAgIC8vIERlZHVwZSB0aGUgZmxhdHRlbmVkIGFycmF5IGluIHJldmVyc2Ugb3JkZXIgdG8gcHJlc2VydmUgdGhlIGxhc3QgaXRlbXMuXG4gICAgICAgICAgICAvLyBDYXN0aW5nIHRvIEFycmF5PHVua25vd24+IHdvcmtzIGFyb3VuZCBUUyBlcnJvciB0aGF0XG4gICAgICAgICAgICAvLyBhcHBlYXJzIHRvIGNvbWUgZnJvbSB0cnlpbmcgdG8gZmxhdHRlbiBhIHR5cGUgQ1NTUmVzdWx0QXJyYXkuXG4gICAgICAgICAgICBjb25zdCBzZXQgPSBuZXcgU2V0KHN0eWxlcy5mbGF0KEluZmluaXR5KS5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgLy8gVGhlbiBwcmVzZXJ2ZSBvcmlnaW5hbCBvcmRlciBieSBhZGRpbmcgdGhlIHNldCBpdGVtcyBpbiByZXZlcnNlIG9yZGVyLlxuICAgICAgICAgICAgZm9yIChjb25zdCBzIG9mIHNldCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnRTdHlsZXMudW5zaGlmdChnZXRDb21wYXRpYmxlU3R5bGUocykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHN0eWxlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBlbGVtZW50U3R5bGVzLnB1c2goZ2V0Q29tcGF0aWJsZVN0eWxlKHN0eWxlcykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlbGVtZW50U3R5bGVzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBwcm9wZXJ0eSBuYW1lIGZvciB0aGUgZ2l2ZW4gYXR0cmlidXRlIGBuYW1lYC5cbiAgICAgKiBAbm9jb2xsYXBzZVxuICAgICAqL1xuICAgIHN0YXRpYyBfX2F0dHJpYnV0ZU5hbWVGb3JQcm9wZXJ0eShuYW1lLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZSA9IG9wdGlvbnMuYXR0cmlidXRlO1xuICAgICAgICByZXR1cm4gYXR0cmlidXRlID09PSBmYWxzZVxuICAgICAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgICAgIDogdHlwZW9mIGF0dHJpYnV0ZSA9PT0gJ3N0cmluZydcbiAgICAgICAgICAgICAgICA/IGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIDogdHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnXG4gICAgICAgICAgICAgICAgICAgID8gbmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnRlcm5hbCBvbmx5IG92ZXJyaWRlIHBvaW50IGZvciBjdXN0b21pemluZyB3b3JrIGRvbmUgd2hlbiBlbGVtZW50c1xuICAgICAqIGFyZSBjb25zdHJ1Y3RlZC5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF9pbml0aWFsaXplKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHRoaXMuX191cGRhdGVQcm9taXNlID0gbmV3IFByb21pc2UoKHJlcykgPT4gKHRoaXMuZW5hYmxlVXBkYXRpbmcgPSByZXMpKTtcbiAgICAgICAgdGhpcy5fJGNoYW5nZWRQcm9wZXJ0aWVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLl9fc2F2ZUluc3RhbmNlUHJvcGVydGllcygpO1xuICAgICAgICAvLyBlbnN1cmVzIGZpcnN0IHVwZGF0ZSB3aWxsIGJlIGNhdWdodCBieSBhbiBlYXJseSBhY2Nlc3Mgb2ZcbiAgICAgICAgLy8gYHVwZGF0ZUNvbXBsZXRlYFxuICAgICAgICB0aGlzLnJlcXVlc3RVcGRhdGUoKTtcbiAgICAgICAgKF9hID0gdGhpcy5jb25zdHJ1Y3Rvci5faW5pdGlhbGl6ZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaCgoaSkgPT4gaSh0aGlzKSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGBSZWFjdGl2ZUNvbnRyb2xsZXJgIHRvIHBhcnRpY2lwYXRlIGluIHRoZSBlbGVtZW50J3MgcmVhY3RpdmVcbiAgICAgKiB1cGRhdGUgY3ljbGUuIFRoZSBlbGVtZW50IGF1dG9tYXRpY2FsbHkgY2FsbHMgaW50byBhbnkgcmVnaXN0ZXJlZFxuICAgICAqIGNvbnRyb2xsZXJzIGR1cmluZyBpdHMgbGlmZWN5Y2xlIGNhbGxiYWNrcy5cbiAgICAgKlxuICAgICAqIElmIHRoZSBlbGVtZW50IGlzIGNvbm5lY3RlZCB3aGVuIGBhZGRDb250cm9sbGVyKClgIGlzIGNhbGxlZCwgdGhlXG4gICAgICogY29udHJvbGxlcidzIGBob3N0Q29ubmVjdGVkKClgIGNhbGxiYWNrIHdpbGwgYmUgaW1tZWRpYXRlbHkgY2FsbGVkLlxuICAgICAqIEBjYXRlZ29yeSBjb250cm9sbGVyc1xuICAgICAqL1xuICAgIGFkZENvbnRyb2xsZXIoY29udHJvbGxlcikge1xuICAgICAgICB2YXIgX2EsIF9iO1xuICAgICAgICAoKF9hID0gdGhpcy5fX2NvbnRyb2xsZXJzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAodGhpcy5fX2NvbnRyb2xsZXJzID0gW10pKS5wdXNoKGNvbnRyb2xsZXIpO1xuICAgICAgICAvLyBJZiBhIGNvbnRyb2xsZXIgaXMgYWRkZWQgYWZ0ZXIgdGhlIGVsZW1lbnQgaGFzIGJlZW4gY29ubmVjdGVkLFxuICAgICAgICAvLyBjYWxsIGhvc3RDb25uZWN0ZWQuIE5vdGUsIHJlLXVzaW5nIGV4aXN0ZW5jZSBvZiBgcmVuZGVyUm9vdGAgaGVyZVxuICAgICAgICAvLyAod2hpY2ggaXMgc2V0IGluIGNvbm5lY3RlZENhbGxiYWNrKSB0byBhdm9pZCB0aGUgbmVlZCB0byB0cmFjayBhXG4gICAgICAgIC8vIGZpcnN0IGNvbm5lY3RlZCBzdGF0ZS5cbiAgICAgICAgaWYgKHRoaXMucmVuZGVyUm9vdCAhPT0gdW5kZWZpbmVkICYmIHRoaXMuaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICAgIChfYiA9IGNvbnRyb2xsZXIuaG9zdENvbm5lY3RlZCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoY29udHJvbGxlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyBhIGBSZWFjdGl2ZUNvbnRyb2xsZXJgIGZyb20gdGhlIGVsZW1lbnQuXG4gICAgICogQGNhdGVnb3J5IGNvbnRyb2xsZXJzXG4gICAgICovXG4gICAgcmVtb3ZlQ29udHJvbGxlcihjb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgLy8gTm90ZSwgaWYgdGhlIGluZGV4T2YgaXMgLTEsIHRoZSA+Pj4gd2lsbCBmbGlwIHRoZSBzaWduIHdoaWNoIG1ha2VzIHRoZVxuICAgICAgICAvLyBzcGxpY2UgZG8gbm90aGluZy5cbiAgICAgICAgKF9hID0gdGhpcy5fX2NvbnRyb2xsZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc3BsaWNlKHRoaXMuX19jb250cm9sbGVycy5pbmRleE9mKGNvbnRyb2xsZXIpID4+PiAwLCAxKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRml4ZXMgYW55IHByb3BlcnRpZXMgc2V0IG9uIHRoZSBpbnN0YW5jZSBiZWZvcmUgdXBncmFkZSB0aW1lLlxuICAgICAqIE90aGVyd2lzZSB0aGVzZSB3b3VsZCBzaGFkb3cgdGhlIGFjY2Vzc29yIGFuZCBicmVhayB0aGVzZSBwcm9wZXJ0aWVzLlxuICAgICAqIFRoZSBwcm9wZXJ0aWVzIGFyZSBzdG9yZWQgaW4gYSBNYXAgd2hpY2ggaXMgcGxheWVkIGJhY2sgYWZ0ZXIgdGhlXG4gICAgICogY29uc3RydWN0b3IgcnVucy4gTm90ZSwgb24gdmVyeSBvbGQgdmVyc2lvbnMgb2YgU2FmYXJpICg8PTkpIG9yIENocm9tZVxuICAgICAqICg8PTQxKSwgcHJvcGVydGllcyBjcmVhdGVkIGZvciBuYXRpdmUgcGxhdGZvcm0gcHJvcGVydGllcyBsaWtlIChgaWRgIG9yXG4gICAgICogYG5hbWVgKSBtYXkgbm90IGhhdmUgZGVmYXVsdCB2YWx1ZXMgc2V0IGluIHRoZSBlbGVtZW50IGNvbnN0cnVjdG9yLiBPblxuICAgICAqIHRoZXNlIGJyb3dzZXJzIG5hdGl2ZSBwcm9wZXJ0aWVzIGFwcGVhciBvbiBpbnN0YW5jZXMgYW5kIHRoZXJlZm9yZSB0aGVpclxuICAgICAqIGRlZmF1bHQgdmFsdWUgd2lsbCBvdmVyd3JpdGUgYW55IGVsZW1lbnQgZGVmYXVsdCAoZS5nLiBpZiB0aGUgZWxlbWVudCBzZXRzXG4gICAgICogdGhpcy5pZCA9ICdpZCcgaW4gdGhlIGNvbnN0cnVjdG9yLCB0aGUgJ2lkJyB3aWxsIGJlY29tZSAnJyBzaW5jZSB0aGlzIGlzXG4gICAgICogdGhlIG5hdGl2ZSBwbGF0Zm9ybSBkZWZhdWx0KS5cbiAgICAgKi9cbiAgICBfX3NhdmVJbnN0YW5jZVByb3BlcnRpZXMoKSB7XG4gICAgICAgIC8vIFVzZSBmb3JFYWNoIHNvIHRoaXMgd29ya3MgZXZlbiBpZiBmb3Ivb2YgbG9vcHMgYXJlIGNvbXBpbGVkIHRvIGZvciBsb29wc1xuICAgICAgICAvLyBleHBlY3RpbmcgYXJyYXlzXG4gICAgICAgIHRoaXMuY29uc3RydWN0b3IuZWxlbWVudFByb3BlcnRpZXMuZm9yRWFjaCgoX3YsIHApID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX2luc3RhbmNlUHJvcGVydGllcy5zZXQocCwgdGhpc1twXSk7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXNbcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBub2RlIGludG8gd2hpY2ggdGhlIGVsZW1lbnQgc2hvdWxkIHJlbmRlciBhbmQgYnkgZGVmYXVsdFxuICAgICAqIGNyZWF0ZXMgYW5kIHJldHVybnMgYW4gb3BlbiBzaGFkb3dSb290LiBJbXBsZW1lbnQgdG8gY3VzdG9taXplIHdoZXJlIHRoZVxuICAgICAqIGVsZW1lbnQncyBET00gaXMgcmVuZGVyZWQuIEZvciBleGFtcGxlLCB0byByZW5kZXIgaW50byB0aGUgZWxlbWVudCdzXG4gICAgICogY2hpbGROb2RlcywgcmV0dXJuIGB0aGlzYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4gUmV0dXJucyBhIG5vZGUgaW50byB3aGljaCB0byByZW5kZXIuXG4gICAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgICAqL1xuICAgIGNyZWF0ZVJlbmRlclJvb3QoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgY29uc3QgcmVuZGVyUm9vdCA9IChfYSA9IHRoaXMuc2hhZG93Um9vdCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5hdHRhY2hTaGFkb3codGhpcy5jb25zdHJ1Y3Rvci5zaGFkb3dSb290T3B0aW9ucyk7XG4gICAgICAgIGFkb3B0U3R5bGVzKHJlbmRlclJvb3QsIHRoaXMuY29uc3RydWN0b3IuZWxlbWVudFN0eWxlcyk7XG4gICAgICAgIHJldHVybiByZW5kZXJSb290O1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBPbiBmaXJzdCBjb25uZWN0aW9uLCBjcmVhdGVzIHRoZSBlbGVtZW50J3MgcmVuZGVyUm9vdCwgc2V0cyB1cFxuICAgICAqIGVsZW1lbnQgc3R5bGluZywgYW5kIGVuYWJsZXMgdXBkYXRpbmcuXG4gICAgICogQGNhdGVnb3J5IGxpZmVjeWNsZVxuICAgICAqL1xuICAgIGNvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIC8vIGNyZWF0ZSByZW5kZXJSb290IGJlZm9yZSBmaXJzdCB1cGRhdGUuXG4gICAgICAgIGlmICh0aGlzLnJlbmRlclJvb3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJSb290ID0gdGhpcy5jcmVhdGVSZW5kZXJSb290KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbmFibGVVcGRhdGluZyh0cnVlKTtcbiAgICAgICAgKF9hID0gdGhpcy5fX2NvbnRyb2xsZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaCgoYykgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBjLmhvc3RDb25uZWN0ZWQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jYWxsKGMpOyB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTm90ZSwgdGhpcyBtZXRob2Qgc2hvdWxkIGJlIGNvbnNpZGVyZWQgZmluYWwgYW5kIG5vdCBvdmVycmlkZGVuLiBJdCBpc1xuICAgICAqIG92ZXJyaWRkZW4gb24gdGhlIGVsZW1lbnQgaW5zdGFuY2Ugd2l0aCBhIGZ1bmN0aW9uIHRoYXQgdHJpZ2dlcnMgdGhlIGZpcnN0XG4gICAgICogdXBkYXRlLlxuICAgICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAgICovXG4gICAgZW5hYmxlVXBkYXRpbmcoX3JlcXVlc3RlZFVwZGF0ZSkgeyB9XG4gICAgLyoqXG4gICAgICogQWxsb3dzIGZvciBgc3VwZXIuZGlzY29ubmVjdGVkQ2FsbGJhY2soKWAgaW4gZXh0ZW5zaW9ucyB3aGlsZVxuICAgICAqIHJlc2VydmluZyB0aGUgcG9zc2liaWxpdHkgb2YgbWFraW5nIG5vbi1icmVha2luZyBmZWF0dXJlIGFkZGl0aW9uc1xuICAgICAqIHdoZW4gZGlzY29ubmVjdGluZyBhdCBzb21lIHBvaW50IGluIHRoZSBmdXR1cmUuXG4gICAgICogQGNhdGVnb3J5IGxpZmVjeWNsZVxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIChfYSA9IHRoaXMuX19jb250cm9sbGVycykgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZvckVhY2goKGMpID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gYy5ob3N0RGlzY29ubmVjdGVkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChjKTsgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFN5bmNocm9uaXplcyBwcm9wZXJ0eSB2YWx1ZXMgd2hlbiBhdHRyaWJ1dGVzIGNoYW5nZS5cbiAgICAgKlxuICAgICAqIFNwZWNpZmljYWxseSwgd2hlbiBhbiBhdHRyaWJ1dGUgaXMgc2V0LCB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBpcyBzZXQuXG4gICAgICogWW91IHNob3VsZCByYXJlbHkgbmVlZCB0byBpbXBsZW1lbnQgdGhpcyBjYWxsYmFjay4gSWYgdGhpcyBtZXRob2QgaXNcbiAgICAgKiBvdmVycmlkZGVuLCBgc3VwZXIuYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIF9vbGQsIHZhbHVlKWAgbXVzdCBiZVxuICAgICAqIGNhbGxlZC5cbiAgICAgKlxuICAgICAqIFNlZSBbdXNpbmcgdGhlIGxpZmVjeWNsZSBjYWxsYmFja3NdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL1dlYl9Db21wb25lbnRzL1VzaW5nX2N1c3RvbV9lbGVtZW50cyN1c2luZ190aGVfbGlmZWN5Y2xlX2NhbGxiYWNrcylcbiAgICAgKiBvbiBNRE4gZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGBhdHRyaWJ1dGVDaGFuZ2VkQ2FsbGJhY2tgLlxuICAgICAqIEBjYXRlZ29yeSBhdHRyaWJ1dGVzXG4gICAgICovXG4gICAgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrKG5hbWUsIF9vbGQsIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuXyRhdHRyaWJ1dGVUb1Byb3BlcnR5KG5hbWUsIHZhbHVlKTtcbiAgICB9XG4gICAgX19wcm9wZXJ0eVRvQXR0cmlidXRlKG5hbWUsIHZhbHVlLCBvcHRpb25zID0gZGVmYXVsdFByb3BlcnR5RGVjbGFyYXRpb24pIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgY29uc3QgYXR0ciA9IHRoaXMuY29uc3RydWN0b3IuX19hdHRyaWJ1dGVOYW1lRm9yUHJvcGVydHkobmFtZSwgb3B0aW9ucyk7XG4gICAgICAgIGlmIChhdHRyICE9PSB1bmRlZmluZWQgJiYgb3B0aW9ucy5yZWZsZWN0ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCB0b0F0dHJpYnV0ZSA9IChfYiA9IChfYSA9IG9wdGlvbnMuY29udmVydGVyKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EudG9BdHRyaWJ1dGUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IGRlZmF1bHRDb252ZXJ0ZXIudG9BdHRyaWJ1dGU7XG4gICAgICAgICAgICBjb25zdCBhdHRyVmFsdWUgPSB0b0F0dHJpYnV0ZSh2YWx1ZSwgb3B0aW9ucy50eXBlKTtcbiAgICAgICAgICAgIGlmIChERVZfTU9ERSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuZW5hYmxlZFdhcm5pbmdzLmluZGV4T2YoJ21pZ3JhdGlvbicpID49IDAgJiZcbiAgICAgICAgICAgICAgICBhdHRyVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlzc3VlV2FybmluZygndW5kZWZpbmVkLWF0dHJpYnV0ZS12YWx1ZScsIGBUaGUgYXR0cmlidXRlIHZhbHVlIGZvciB0aGUgJHtuYW1lfSBwcm9wZXJ0eSBpcyBgICtcbiAgICAgICAgICAgICAgICAgICAgYHVuZGVmaW5lZCBvbiBlbGVtZW50ICR7dGhpcy5sb2NhbE5hbWV9LiBUaGUgYXR0cmlidXRlIHdpbGwgYmUgYCArXG4gICAgICAgICAgICAgICAgICAgIGByZW1vdmVkLCBidXQgaW4gdGhlIHByZXZpb3VzIHZlcnNpb24gb2YgXFxgUmVhY3RpdmVFbGVtZW50XFxgLCBgICtcbiAgICAgICAgICAgICAgICAgICAgYHRoZSBhdHRyaWJ1dGUgd291bGQgbm90IGhhdmUgY2hhbmdlZC5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFRyYWNrIGlmIHRoZSBwcm9wZXJ0eSBpcyBiZWluZyByZWZsZWN0ZWQgdG8gYXZvaWRcbiAgICAgICAgICAgIC8vIHNldHRpbmcgdGhlIHByb3BlcnR5IGFnYWluIHZpYSBgYXR0cmlidXRlQ2hhbmdlZENhbGxiYWNrYC4gTm90ZTpcbiAgICAgICAgICAgIC8vIDEuIHRoaXMgdGFrZXMgYWR2YW50YWdlIG9mIHRoZSBmYWN0IHRoYXQgdGhlIGNhbGxiYWNrIGlzIHN5bmNocm9ub3VzLlxuICAgICAgICAgICAgLy8gMi4gd2lsbCBiZWhhdmUgaW5jb3JyZWN0bHkgaWYgbXVsdGlwbGUgYXR0cmlidXRlcyBhcmUgaW4gdGhlIHJlYWN0aW9uXG4gICAgICAgICAgICAvLyBzdGFjayBhdCB0aW1lIG9mIGNhbGxpbmcuIEhvd2V2ZXIsIHNpbmNlIHdlIHByb2Nlc3MgYXR0cmlidXRlc1xuICAgICAgICAgICAgLy8gaW4gYHVwZGF0ZWAgdGhpcyBzaG91bGQgbm90IGJlIHBvc3NpYmxlIChvciBhbiBleHRyZW1lIGNvcm5lciBjYXNlXG4gICAgICAgICAgICAvLyB0aGF0IHdlJ2QgbGlrZSB0byBkaXNjb3ZlcikuXG4gICAgICAgICAgICAvLyBtYXJrIHN0YXRlIHJlZmxlY3RpbmdcbiAgICAgICAgICAgIHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydHkgPSBuYW1lO1xuICAgICAgICAgICAgaWYgKGF0dHJWYWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShhdHRyLCBhdHRyVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gbWFyayBzdGF0ZSBub3QgcmVmbGVjdGluZ1xuICAgICAgICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0eSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF8kYXR0cmlidXRlVG9Qcm9wZXJ0eShuYW1lLCB2YWx1ZSkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYztcbiAgICAgICAgY29uc3QgY3RvciA9IHRoaXMuY29uc3RydWN0b3I7XG4gICAgICAgIC8vIE5vdGUsIGhpbnQgdGhpcyBhcyBhbiBgQXR0cmlidXRlTWFwYCBzbyBjbG9zdXJlIGNsZWFybHkgdW5kZXJzdGFuZHNcbiAgICAgICAgLy8gdGhlIHR5cGU7IGl0IGhhcyBpc3N1ZXMgd2l0aCB0cmFja2luZyB0eXBlcyB0aHJvdWdoIHN0YXRpY3NcbiAgICAgICAgY29uc3QgcHJvcE5hbWUgPSBjdG9yLl9fYXR0cmlidXRlVG9Qcm9wZXJ0eU1hcC5nZXQobmFtZSk7XG4gICAgICAgIC8vIFVzZSB0cmFja2luZyBpbmZvIHRvIGF2b2lkIHJlZmxlY3RpbmcgYSBwcm9wZXJ0eSB2YWx1ZSB0byBhbiBhdHRyaWJ1dGVcbiAgICAgICAgLy8gaWYgaXQgd2FzIGp1c3Qgc2V0IGJlY2F1c2UgdGhlIGF0dHJpYnV0ZSBjaGFuZ2VkLlxuICAgICAgICBpZiAocHJvcE5hbWUgIT09IHVuZGVmaW5lZCAmJiB0aGlzLl9fcmVmbGVjdGluZ1Byb3BlcnR5ICE9PSBwcm9wTmFtZSkge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGN0b3IuZ2V0UHJvcGVydHlPcHRpb25zKHByb3BOYW1lKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnZlcnRlciA9IG9wdGlvbnMuY29udmVydGVyO1xuICAgICAgICAgICAgY29uc3QgZnJvbUF0dHJpYnV0ZSA9IChfYyA9IChfYiA9IChfYSA9IGNvbnZlcnRlcikgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmZyb21BdHRyaWJ1dGUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6ICh0eXBlb2YgY29udmVydGVyID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgPyBjb252ZXJ0ZXJcbiAgICAgICAgICAgICAgICA6IG51bGwpKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiBkZWZhdWx0Q29udmVydGVyLmZyb21BdHRyaWJ1dGU7XG4gICAgICAgICAgICAvLyBtYXJrIHN0YXRlIHJlZmxlY3RpbmdcbiAgICAgICAgICAgIHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydHkgPSBwcm9wTmFtZTtcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgICAgICB0aGlzW3Byb3BOYW1lXSA9IGZyb21BdHRyaWJ1dGUodmFsdWUsIG9wdGlvbnMudHlwZSk7XG4gICAgICAgICAgICAvLyBtYXJrIHN0YXRlIG5vdCByZWZsZWN0aW5nXG4gICAgICAgICAgICB0aGlzLl9fcmVmbGVjdGluZ1Byb3BlcnR5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXF1ZXN0cyBhbiB1cGRhdGUgd2hpY2ggaXMgcHJvY2Vzc2VkIGFzeW5jaHJvbm91c2x5LiBUaGlzIHNob3VsZCBiZSBjYWxsZWRcbiAgICAgKiB3aGVuIGFuIGVsZW1lbnQgc2hvdWxkIHVwZGF0ZSBiYXNlZCBvbiBzb21lIHN0YXRlIG5vdCB0cmlnZ2VyZWQgYnkgc2V0dGluZ1xuICAgICAqIGEgcmVhY3RpdmUgcHJvcGVydHkuIEluIHRoaXMgY2FzZSwgcGFzcyBubyBhcmd1bWVudHMuIEl0IHNob3VsZCBhbHNvIGJlXG4gICAgICogY2FsbGVkIHdoZW4gbWFudWFsbHkgaW1wbGVtZW50aW5nIGEgcHJvcGVydHkgc2V0dGVyLiBJbiB0aGlzIGNhc2UsIHBhc3MgdGhlXG4gICAgICogcHJvcGVydHkgYG5hbWVgIGFuZCBgb2xkVmFsdWVgIHRvIGVuc3VyZSB0aGF0IGFueSBjb25maWd1cmVkIHByb3BlcnR5XG4gICAgICogb3B0aW9ucyBhcmUgaG9ub3JlZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBuYW1lIG5hbWUgb2YgcmVxdWVzdGluZyBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSBvbGRWYWx1ZSBvbGQgdmFsdWUgb2YgcmVxdWVzdGluZyBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSBvcHRpb25zIHByb3BlcnR5IG9wdGlvbnMgdG8gdXNlIGluc3RlYWQgb2YgdGhlIHByZXZpb3VzbHlcbiAgICAgKiAgICAgY29uZmlndXJlZCBvcHRpb25zXG4gICAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICAgKi9cbiAgICByZXF1ZXN0VXBkYXRlKG5hbWUsIG9sZFZhbHVlLCBvcHRpb25zKSB7XG4gICAgICAgIGxldCBzaG91bGRSZXF1ZXN0VXBkYXRlID0gdHJ1ZTtcbiAgICAgICAgLy8gSWYgd2UgaGF2ZSBhIHByb3BlcnR5IGtleSwgcGVyZm9ybSBwcm9wZXJ0eSB1cGRhdGUgc3RlcHMuXG4gICAgICAgIGlmIChuYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPVxuICAgICAgICAgICAgICAgIG9wdGlvbnMgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5nZXRQcm9wZXJ0eU9wdGlvbnMobmFtZSk7XG4gICAgICAgICAgICBjb25zdCBoYXNDaGFuZ2VkID0gb3B0aW9ucy5oYXNDaGFuZ2VkIHx8IG5vdEVxdWFsO1xuICAgICAgICAgICAgaWYgKGhhc0NoYW5nZWQodGhpc1tuYW1lXSwgb2xkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl8kY2hhbmdlZFByb3BlcnRpZXMuaGFzKG5hbWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuXyRjaGFuZ2VkUHJvcGVydGllcy5zZXQobmFtZSwgb2xkVmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBBZGQgdG8gcmVmbGVjdGluZyBwcm9wZXJ0aWVzIHNldC5cbiAgICAgICAgICAgICAgICAvLyBOb3RlLCBpdCdzIGltcG9ydGFudCB0aGF0IGV2ZXJ5IGNoYW5nZSBoYXMgYSBjaGFuY2UgdG8gYWRkIHRoZVxuICAgICAgICAgICAgICAgIC8vIHByb3BlcnR5IHRvIGBfcmVmbGVjdGluZ1Byb3BlcnRpZXNgLiBUaGlzIGVuc3VyZXMgc2V0dGluZ1xuICAgICAgICAgICAgICAgIC8vIGF0dHJpYnV0ZSArIHByb3BlcnR5IHJlZmxlY3RzIGNvcnJlY3RseS5cbiAgICAgICAgICAgICAgICBpZiAob3B0aW9ucy5yZWZsZWN0ID09PSB0cnVlICYmIHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydHkgIT09IG5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fcmVmbGVjdGluZ1Byb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0aWVzLnNldChuYW1lLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBBYm9ydCB0aGUgcmVxdWVzdCBpZiB0aGUgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSBjb25zaWRlcmVkIGNoYW5nZWQuXG4gICAgICAgICAgICAgICAgc2hvdWxkUmVxdWVzdFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5pc1VwZGF0ZVBlbmRpbmcgJiYgc2hvdWxkUmVxdWVzdFVwZGF0ZSkge1xuICAgICAgICAgICAgdGhpcy5fX3VwZGF0ZVByb21pc2UgPSB0aGlzLl9fZW5xdWV1ZVVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5vdGUsIHNpbmNlIHRoaXMgbm8gbG9uZ2VyIHJldHVybnMgYSBwcm9taXNlLCBpbiBkZXYgbW9kZSB3ZSByZXR1cm4gYVxuICAgICAgICAvLyB0aGVuYWJsZSB3aGljaCB3YXJucyBpZiBpdCdzIGNhbGxlZC5cbiAgICAgICAgcmV0dXJuIERFVl9NT0RFXG4gICAgICAgICAgICA/IHJlcXVlc3RVcGRhdGVUaGVuYWJsZSh0aGlzLmxvY2FsTmFtZSlcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIHRoZSBlbGVtZW50IHRvIGFzeW5jaHJvbm91c2x5IHVwZGF0ZS5cbiAgICAgKi9cbiAgICBhc3luYyBfX2VucXVldWVVcGRhdGUoKSB7XG4gICAgICAgIHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gdHJ1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIEVuc3VyZSBhbnkgcHJldmlvdXMgdXBkYXRlIGhhcyByZXNvbHZlZCBiZWZvcmUgdXBkYXRpbmcuXG4gICAgICAgICAgICAvLyBUaGlzIGBhd2FpdGAgYWxzbyBlbnN1cmVzIHRoYXQgcHJvcGVydHkgY2hhbmdlcyBhcmUgYmF0Y2hlZC5cbiAgICAgICAgICAgIGF3YWl0IHRoaXMuX191cGRhdGVQcm9taXNlO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBSZWZpcmUgYW55IHByZXZpb3VzIGVycm9ycyBhc3luYyBzbyB0aGV5IGRvIG5vdCBkaXNydXB0IHRoZSB1cGRhdGVcbiAgICAgICAgICAgIC8vIGN5Y2xlLiBFcnJvcnMgYXJlIHJlZmlyZWQgc28gZGV2ZWxvcGVycyBoYXZlIGEgY2hhbmNlIHRvIG9ic2VydmVcbiAgICAgICAgICAgIC8vIHRoZW0sIGFuZCB0aGlzIGNhbiBiZSBkb25lIGJ5IGltcGxlbWVudGluZ1xuICAgICAgICAgICAgLy8gYHdpbmRvdy5vbnVuaGFuZGxlZHJlamVjdGlvbmAuXG4gICAgICAgICAgICBQcm9taXNlLnJlamVjdChlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSB0aGlzLnNjaGVkdWxlVXBkYXRlKCk7XG4gICAgICAgIC8vIElmIGBzY2hlZHVsZVVwZGF0ZWAgcmV0dXJucyBhIFByb21pc2UsIHdlIGF3YWl0IGl0LiBUaGlzIGlzIGRvbmUgdG9cbiAgICAgICAgLy8gZW5hYmxlIGNvb3JkaW5hdGluZyB1cGRhdGVzIHdpdGggYSBzY2hlZHVsZXIuIE5vdGUsIHRoZSByZXN1bHQgaXNcbiAgICAgICAgLy8gY2hlY2tlZCB0byBhdm9pZCBkZWxheWluZyBhbiBhZGRpdGlvbmFsIG1pY3JvdGFzayB1bmxlc3Mgd2UgbmVlZCB0by5cbiAgICAgICAgaWYgKHJlc3VsdCAhPSBudWxsKSB7XG4gICAgICAgICAgICBhd2FpdCByZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICF0aGlzLmlzVXBkYXRlUGVuZGluZztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2NoZWR1bGVzIGFuIGVsZW1lbnQgdXBkYXRlLiBZb3UgY2FuIG92ZXJyaWRlIHRoaXMgbWV0aG9kIHRvIGNoYW5nZSB0aGVcbiAgICAgKiB0aW1pbmcgb2YgdXBkYXRlcyBieSByZXR1cm5pbmcgYSBQcm9taXNlLiBUaGUgdXBkYXRlIHdpbGwgYXdhaXQgdGhlXG4gICAgICogcmV0dXJuZWQgUHJvbWlzZSwgYW5kIHlvdSBzaG91bGQgcmVzb2x2ZSB0aGUgUHJvbWlzZSB0byBhbGxvdyB0aGUgdXBkYXRlXG4gICAgICogdG8gcHJvY2VlZC4gSWYgdGhpcyBtZXRob2QgaXMgb3ZlcnJpZGRlbiwgYHN1cGVyLnNjaGVkdWxlVXBkYXRlKClgXG4gICAgICogbXVzdCBiZSBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBGb3IgaW5zdGFuY2UsIHRvIHNjaGVkdWxlIHVwZGF0ZXMgdG8gb2NjdXIganVzdCBiZWZvcmUgdGhlIG5leHQgZnJhbWU6XG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIG92ZXJyaWRlIHByb3RlY3RlZCBhc3luYyBzY2hlZHVsZVVwZGF0ZSgpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgKiAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gcmVzb2x2ZSgpKSk7XG4gICAgICogICBzdXBlci5zY2hlZHVsZVVwZGF0ZSgpO1xuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgICAqL1xuICAgIHNjaGVkdWxlVXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wZXJmb3JtVXBkYXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGFuIGVsZW1lbnQgdXBkYXRlLiBOb3RlLCBpZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGR1cmluZyB0aGVcbiAgICAgKiB1cGRhdGUsIGBmaXJzdFVwZGF0ZWRgIGFuZCBgdXBkYXRlZGAgd2lsbCBub3QgYmUgY2FsbGVkLlxuICAgICAqXG4gICAgICogQ2FsbCBgcGVyZm9ybVVwZGF0ZSgpYCB0byBpbW1lZGlhdGVseSBwcm9jZXNzIGEgcGVuZGluZyB1cGRhdGUuIFRoaXMgc2hvdWxkXG4gICAgICogZ2VuZXJhbGx5IG5vdCBiZSBuZWVkZWQsIGJ1dCBpdCBjYW4gYmUgZG9uZSBpbiByYXJlIGNhc2VzIHdoZW4geW91IG5lZWQgdG9cbiAgICAgKiB1cGRhdGUgc3luY2hyb25vdXNseS5cbiAgICAgKlxuICAgICAqIE5vdGU6IFRvIGVuc3VyZSBgcGVyZm9ybVVwZGF0ZSgpYCBzeW5jaHJvbm91c2x5IGNvbXBsZXRlcyBhIHBlbmRpbmcgdXBkYXRlLFxuICAgICAqIGl0IHNob3VsZCBub3QgYmUgb3ZlcnJpZGRlbi4gSW4gTGl0RWxlbWVudCAyLnggaXQgd2FzIHN1Z2dlc3RlZCB0byBvdmVycmlkZVxuICAgICAqIGBwZXJmb3JtVXBkYXRlKClgIHRvIGFsc28gY3VzdG9taXppbmcgdXBkYXRlIHNjaGVkdWxpbmcuIEluc3RlYWQsIHlvdSBzaG91bGQgbm93XG4gICAgICogb3ZlcnJpZGUgYHNjaGVkdWxlVXBkYXRlKClgLiBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgd2l0aCBMaXRFbGVtZW50IDIueCxcbiAgICAgKiBzY2hlZHVsaW5nIHVwZGF0ZXMgdmlhIGBwZXJmb3JtVXBkYXRlKClgIGNvbnRpbnVlcyB0byB3b3JrLCBidXQgd2lsbCBtYWtlXG4gICAgICogYWxzbyBjYWxsaW5nIGBwZXJmb3JtVXBkYXRlKClgIHRvIHN5bmNocm9ub3VzbHkgcHJvY2VzcyB1cGRhdGVzIGRpZmZpY3VsdC5cbiAgICAgKlxuICAgICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAgICovXG4gICAgcGVyZm9ybVVwZGF0ZSgpIHtcbiAgICAgICAgdmFyIF9hLCBfYjtcbiAgICAgICAgLy8gQWJvcnQgYW55IHVwZGF0ZSBpZiBvbmUgaXMgbm90IHBlbmRpbmcgd2hlbiB0aGlzIGlzIGNhbGxlZC5cbiAgICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIGBwZXJmb3JtVXBkYXRlYCBpcyBjYWxsZWQgZWFybHkgdG8gXCJmbHVzaFwiXG4gICAgICAgIC8vIHRoZSB1cGRhdGUuXG4gICAgICAgIGlmICghdGhpcy5pc1VwZGF0ZVBlbmRpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkZWJ1Z0xvZ0V2ZW50ID09PSBudWxsIHx8IGRlYnVnTG9nRXZlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlYnVnTG9nRXZlbnQoeyBraW5kOiAndXBkYXRlJyB9KTtcbiAgICAgICAgLy8gY3JlYXRlIHJlbmRlclJvb3QgYmVmb3JlIGZpcnN0IHVwZGF0ZS5cbiAgICAgICAgaWYgKCF0aGlzLmhhc1VwZGF0ZWQpIHtcbiAgICAgICAgICAgIC8vIFByb2R1Y2Ugd2FybmluZyBpZiBhbnkgY2xhc3MgcHJvcGVydGllcyBhcmUgc2hhZG93ZWQgYnkgY2xhc3MgZmllbGRzXG4gICAgICAgICAgICBpZiAoREVWX01PREUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzaGFkb3dlZFByb3BlcnRpZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAoX2EgPSB0aGlzLmNvbnN0cnVjdG9yLl9fcmVhY3RpdmVQcm9wZXJ0eUtleXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5mb3JFYWNoKChwKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfYTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkocCkgJiYgISgoX2EgPSB0aGlzLl9faW5zdGFuY2VQcm9wZXJ0aWVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaGFzKHApKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93ZWRQcm9wZXJ0aWVzLnB1c2gocCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoc2hhZG93ZWRQcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRoZSBmb2xsb3dpbmcgcHJvcGVydGllcyBvbiBlbGVtZW50ICR7dGhpcy5sb2NhbE5hbWV9IHdpbGwgbm90IGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgYHRyaWdnZXIgdXBkYXRlcyBhcyBleHBlY3RlZCBiZWNhdXNlIHRoZXkgYXJlIHNldCB1c2luZyBjbGFzcyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBmaWVsZHM6ICR7c2hhZG93ZWRQcm9wZXJ0aWVzLmpvaW4oJywgJyl9LiBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBOYXRpdmUgY2xhc3MgZmllbGRzIGFuZCBzb21lIGNvbXBpbGVkIG91dHB1dCB3aWxsIG92ZXJ3cml0ZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBhY2Nlc3NvcnMgdXNlZCBmb3IgZGV0ZWN0aW5nIGNoYW5nZXMuIFNlZSBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBodHRwczovL2xpdC5kZXYvbXNnL2NsYXNzLWZpZWxkLXNoYWRvd2luZyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGBmb3IgbW9yZSBpbmZvcm1hdGlvbi5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWl4aW4gaW5zdGFuY2UgcHJvcGVydGllcyBvbmNlLCBpZiB0aGV5IGV4aXN0LlxuICAgICAgICBpZiAodGhpcy5fX2luc3RhbmNlUHJvcGVydGllcykge1xuICAgICAgICAgICAgLy8gVXNlIGZvckVhY2ggc28gdGhpcyB3b3JrcyBldmVuIGlmIGZvci9vZiBsb29wcyBhcmUgY29tcGlsZWQgdG8gZm9yIGxvb3BzXG4gICAgICAgICAgICAvLyBleHBlY3RpbmcgYXJyYXlzXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgdGhpcy5fX2luc3RhbmNlUHJvcGVydGllcy5mb3JFYWNoKCh2LCBwKSA9PiAodGhpc1twXSA9IHYpKTtcbiAgICAgICAgICAgIHRoaXMuX19pbnN0YW5jZVByb3BlcnRpZXMgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHNob3VsZFVwZGF0ZSA9IGZhbHNlO1xuICAgICAgICBjb25zdCBjaGFuZ2VkUHJvcGVydGllcyA9IHRoaXMuXyRjaGFuZ2VkUHJvcGVydGllcztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHNob3VsZFVwZGF0ZSA9IHRoaXMuc2hvdWxkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgICAgICAgIGlmIChzaG91bGRVcGRhdGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpbGxVcGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgICAgIChfYiA9IHRoaXMuX19jb250cm9sbGVycykgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZvckVhY2goKGMpID0+IHsgdmFyIF9hOyByZXR1cm4gKF9hID0gYy5ob3N0VXBkYXRlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChjKTsgfSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fX21hcmtVcGRhdGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIFByZXZlbnQgYGZpcnN0VXBkYXRlZGAgYW5kIGB1cGRhdGVkYCBmcm9tIHJ1bm5pbmcgd2hlbiB0aGVyZSdzIGFuXG4gICAgICAgICAgICAvLyB1cGRhdGUgZXhjZXB0aW9uLlxuICAgICAgICAgICAgc2hvdWxkVXBkYXRlID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBFbnN1cmUgZWxlbWVudCBjYW4gYWNjZXB0IGFkZGl0aW9uYWwgdXBkYXRlcyBhZnRlciBhbiBleGNlcHRpb24uXG4gICAgICAgICAgICB0aGlzLl9fbWFya1VwZGF0ZWQoKTtcbiAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIHVwZGF0ZSBpcyBubyBsb25nZXIgY29uc2lkZXJlZCBwZW5kaW5nIGFuZCBmdXJ0aGVyIHVwZGF0ZXMgYXJlIG5vdyBhbGxvd2VkLlxuICAgICAgICBpZiAoc2hvdWxkVXBkYXRlKSB7XG4gICAgICAgICAgICB0aGlzLl8kZGlkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIGJlZm9yZSBgdXBkYXRlKClgIHRvIGNvbXB1dGUgdmFsdWVzIG5lZWRlZCBkdXJpbmcgdGhlIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqIEltcGxlbWVudCBgd2lsbFVwZGF0ZWAgdG8gY29tcHV0ZSBwcm9wZXJ0eSB2YWx1ZXMgdGhhdCBkZXBlbmQgb24gb3RoZXJcbiAgICAgKiBwcm9wZXJ0aWVzIGFuZCBhcmUgdXNlZCBpbiB0aGUgcmVzdCBvZiB0aGUgdXBkYXRlIHByb2Nlc3MuXG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIHdpbGxVcGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpIHtcbiAgICAgKiAgIC8vIG9ubHkgbmVlZCB0byBjaGVjayBjaGFuZ2VkIHByb3BlcnRpZXMgZm9yIGFuIGV4cGVuc2l2ZSBjb21wdXRhdGlvbi5cbiAgICAgKiAgIGlmIChjaGFuZ2VkUHJvcGVydGllcy5oYXMoJ2ZpcnN0TmFtZScpIHx8IGNoYW5nZWRQcm9wZXJ0aWVzLmhhcygnbGFzdE5hbWUnKSkge1xuICAgICAqICAgICB0aGlzLnNoYSA9IGNvbXB1dGVTSEEoYCR7dGhpcy5maXJzdE5hbWV9ICR7dGhpcy5sYXN0TmFtZX1gKTtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiByZW5kZXIoKSB7XG4gICAgICogICByZXR1cm4gaHRtbGBTSEE6ICR7dGhpcy5zaGF9YDtcbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgICAqL1xuICAgIHdpbGxVcGRhdGUoX2NoYW5nZWRQcm9wZXJ0aWVzKSB7IH1cbiAgICAvLyBOb3RlLCB0aGlzIGlzIGFuIG92ZXJyaWRlIHBvaW50IGZvciBwb2x5ZmlsbC1zdXBwb3J0LlxuICAgIC8vIEBpbnRlcm5hbFxuICAgIF8kZGlkVXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5fX2NvbnRyb2xsZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuZm9yRWFjaCgoYykgPT4geyB2YXIgX2E7IHJldHVybiAoX2EgPSBjLmhvc3RVcGRhdGVkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbChjKTsgfSk7XG4gICAgICAgIGlmICghdGhpcy5oYXNVcGRhdGVkKSB7XG4gICAgICAgICAgICB0aGlzLmhhc1VwZGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5maXJzdFVwZGF0ZWQoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudXBkYXRlZChjaGFuZ2VkUHJvcGVydGllcyk7XG4gICAgICAgIGlmIChERVZfTU9ERSAmJlxuICAgICAgICAgICAgdGhpcy5pc1VwZGF0ZVBlbmRpbmcgJiZcbiAgICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuZW5hYmxlZFdhcm5pbmdzLmluZGV4T2YoJ2NoYW5nZS1pbi11cGRhdGUnKSA+PSAwKSB7XG4gICAgICAgICAgICBpc3N1ZVdhcm5pbmcoJ2NoYW5nZS1pbi11cGRhdGUnLCBgRWxlbWVudCAke3RoaXMubG9jYWxOYW1lfSBzY2hlZHVsZWQgYW4gdXBkYXRlIGAgK1xuICAgICAgICAgICAgICAgIGAoZ2VuZXJhbGx5IGJlY2F1c2UgYSBwcm9wZXJ0eSB3YXMgc2V0KSBgICtcbiAgICAgICAgICAgICAgICBgYWZ0ZXIgYW4gdXBkYXRlIGNvbXBsZXRlZCwgY2F1c2luZyBhIG5ldyB1cGRhdGUgdG8gYmUgc2NoZWR1bGVkLiBgICtcbiAgICAgICAgICAgICAgICBgVGhpcyBpcyBpbmVmZmljaWVudCBhbmQgc2hvdWxkIGJlIGF2b2lkZWQgdW5sZXNzIHRoZSBuZXh0IHVwZGF0ZSBgICtcbiAgICAgICAgICAgICAgICBgY2FuIG9ubHkgYmUgc2NoZWR1bGVkIGFzIGEgc2lkZSBlZmZlY3Qgb2YgdGhlIHByZXZpb3VzIHVwZGF0ZS5gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBfX21hcmtVcGRhdGVkKCkge1xuICAgICAgICB0aGlzLl8kY2hhbmdlZFByb3BlcnRpZXMgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuaXNVcGRhdGVQZW5kaW5nID0gZmFsc2U7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZWxlbWVudCBoYXMgY29tcGxldGVkIHVwZGF0aW5nLlxuICAgICAqIFRoZSBQcm9taXNlIHZhbHVlIGlzIGEgYm9vbGVhbiB0aGF0IGlzIGB0cnVlYCBpZiB0aGUgZWxlbWVudCBjb21wbGV0ZWQgdGhlXG4gICAgICogdXBkYXRlIHdpdGhvdXQgdHJpZ2dlcmluZyBhbm90aGVyIHVwZGF0ZS4gVGhlIFByb21pc2UgcmVzdWx0IGlzIGBmYWxzZWAgaWZcbiAgICAgKiBhIHByb3BlcnR5IHdhcyBzZXQgaW5zaWRlIGB1cGRhdGVkKClgLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgYW5cbiAgICAgKiBleGNlcHRpb24gd2FzIHRocm93biBkdXJpbmcgdGhlIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqIFRvIGF3YWl0IGFkZGl0aW9uYWwgYXN5bmNocm9ub3VzIHdvcmssIG92ZXJyaWRlIHRoZSBgZ2V0VXBkYXRlQ29tcGxldGVgXG4gICAgICogbWV0aG9kLiBGb3IgZXhhbXBsZSwgaXQgaXMgc29tZXRpbWVzIHVzZWZ1bCB0byBhd2FpdCBhIHJlbmRlcmVkIGVsZW1lbnRcbiAgICAgKiBiZWZvcmUgZnVsZmlsbGluZyB0aGlzIFByb21pc2UuIFRvIGRvIHRoaXMsIGZpcnN0IGF3YWl0XG4gICAgICogYHN1cGVyLmdldFVwZGF0ZUNvbXBsZXRlKClgLCB0aGVuIGFueSBzdWJzZXF1ZW50IHN0YXRlLlxuICAgICAqXG4gICAgICogQHJldHVybiBBIHByb21pc2Ugb2YgYSBib29sZWFuIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgdXBkYXRlIGNvbXBsZXRlZFxuICAgICAqICAgICB3aXRob3V0IHRyaWdnZXJpbmcgYW5vdGhlciB1cGRhdGUuXG4gICAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICAgKi9cbiAgICBnZXQgdXBkYXRlQ29tcGxldGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFVwZGF0ZUNvbXBsZXRlKCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE92ZXJyaWRlIHBvaW50IGZvciB0aGUgYHVwZGF0ZUNvbXBsZXRlYCBwcm9taXNlLlxuICAgICAqXG4gICAgICogSXQgaXMgbm90IHNhZmUgdG8gb3ZlcnJpZGUgdGhlIGB1cGRhdGVDb21wbGV0ZWAgZ2V0dGVyIGRpcmVjdGx5IGR1ZSB0byBhXG4gICAgICogbGltaXRhdGlvbiBpbiBUeXBlU2NyaXB0IHdoaWNoIG1lYW5zIGl0IGlzIG5vdCBwb3NzaWJsZSB0byBjYWxsIGFcbiAgICAgKiBzdXBlcmNsYXNzIGdldHRlciAoZS5nLiBgc3VwZXIudXBkYXRlQ29tcGxldGUudGhlbiguLi4pYCkgd2hlbiB0aGUgdGFyZ2V0XG4gICAgICogbGFuZ3VhZ2UgaXMgRVM1IChodHRwczovL2dpdGh1Yi5jb20vbWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzMzOCkuXG4gICAgICogVGhpcyBtZXRob2Qgc2hvdWxkIGJlIG92ZXJyaWRkZW4gaW5zdGVhZC4gRm9yIGV4YW1wbGU6XG4gICAgICpcbiAgICAgKiBgYGB0c1xuICAgICAqIGNsYXNzIE15RWxlbWVudCBleHRlbmRzIExpdEVsZW1lbnQge1xuICAgICAqICAgb3ZlcnJpZGUgYXN5bmMgZ2V0VXBkYXRlQ29tcGxldGUoKSB7XG4gICAgICogICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHN1cGVyLmdldFVwZGF0ZUNvbXBsZXRlKCk7XG4gICAgICogICAgIGF3YWl0IHRoaXMuX215Q2hpbGQudXBkYXRlQ29tcGxldGU7XG4gICAgICogICAgIHJldHVybiByZXN1bHQ7XG4gICAgICogICB9XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHJldHVybiBBIHByb21pc2Ugb2YgYSBib29sZWFuIHRoYXQgcmVzb2x2ZXMgdG8gdHJ1ZSBpZiB0aGUgdXBkYXRlIGNvbXBsZXRlZFxuICAgICAqICAgICB3aXRob3V0IHRyaWdnZXJpbmcgYW5vdGhlciB1cGRhdGUuXG4gICAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICAgKi9cbiAgICBnZXRVcGRhdGVDb21wbGV0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX191cGRhdGVQcm9taXNlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBDb250cm9scyB3aGV0aGVyIG9yIG5vdCBgdXBkYXRlKClgIHNob3VsZCBiZSBjYWxsZWQgd2hlbiB0aGUgZWxlbWVudCByZXF1ZXN0c1xuICAgICAqIGFuIHVwZGF0ZS4gQnkgZGVmYXVsdCwgdGhpcyBtZXRob2QgYWx3YXlzIHJldHVybnMgYHRydWVgLCBidXQgdGhpcyBjYW4gYmVcbiAgICAgKiBjdXN0b21pemVkIHRvIGNvbnRyb2wgd2hlbiB0byB1cGRhdGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gX2NoYW5nZWRQcm9wZXJ0aWVzIE1hcCBvZiBjaGFuZ2VkIHByb3BlcnRpZXMgd2l0aCBvbGQgdmFsdWVzXG4gICAgICogQGNhdGVnb3J5IHVwZGF0ZXNcbiAgICAgKi9cbiAgICBzaG91bGRVcGRhdGUoX2NoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBlbGVtZW50LiBUaGlzIG1ldGhvZCByZWZsZWN0cyBwcm9wZXJ0eSB2YWx1ZXMgdG8gYXR0cmlidXRlcy5cbiAgICAgKiBJdCBjYW4gYmUgb3ZlcnJpZGRlbiB0byByZW5kZXIgYW5kIGtlZXAgdXBkYXRlZCBlbGVtZW50IERPTS5cbiAgICAgKiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlIHRoaXMgbWV0aG9kIHdpbGwgKm5vdCogdHJpZ2dlclxuICAgICAqIGFub3RoZXIgdXBkYXRlLlxuICAgICAqXG4gICAgICogQHBhcmFtIF9jaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAgICovXG4gICAgdXBkYXRlKF9jaGFuZ2VkUHJvcGVydGllcykge1xuICAgICAgICBpZiAodGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0aWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFVzZSBmb3JFYWNoIHNvIHRoaXMgd29ya3MgZXZlbiBpZiBmb3Ivb2YgbG9vcHMgYXJlIGNvbXBpbGVkIHRvIGZvclxuICAgICAgICAgICAgLy8gbG9vcHMgZXhwZWN0aW5nIGFycmF5c1xuICAgICAgICAgICAgdGhpcy5fX3JlZmxlY3RpbmdQcm9wZXJ0aWVzLmZvckVhY2goKHYsIGspID0+IHRoaXMuX19wcm9wZXJ0eVRvQXR0cmlidXRlKGssIHRoaXNba10sIHYpKTtcbiAgICAgICAgICAgIHRoaXMuX19yZWZsZWN0aW5nUHJvcGVydGllcyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9fbWFya1VwZGF0ZWQoKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogSW52b2tlZCB3aGVuZXZlciB0aGUgZWxlbWVudCBpcyB1cGRhdGVkLiBJbXBsZW1lbnQgdG8gcGVyZm9ybVxuICAgICAqIHBvc3QtdXBkYXRpbmcgdGFza3MgdmlhIERPTSBBUElzLCBmb3IgZXhhbXBsZSwgZm9jdXNpbmcgYW4gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIHRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICAgICAqIGFnYWluIGFmdGVyIHRoaXMgdXBkYXRlIGN5Y2xlIGNvbXBsZXRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBfY2hhbmdlZFByb3BlcnRpZXMgTWFwIG9mIGNoYW5nZWQgcHJvcGVydGllcyB3aXRoIG9sZCB2YWx1ZXNcbiAgICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgICAqL1xuICAgIHVwZGF0ZWQoX2NoYW5nZWRQcm9wZXJ0aWVzKSB7IH1cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIHdoZW4gdGhlIGVsZW1lbnQgaXMgZmlyc3QgdXBkYXRlZC4gSW1wbGVtZW50IHRvIHBlcmZvcm0gb25lIHRpbWVcbiAgICAgKiB3b3JrIG9uIHRoZSBlbGVtZW50IGFmdGVyIHVwZGF0ZS5cbiAgICAgKlxuICAgICAqIGBgYHRzXG4gICAgICogZmlyc3RVcGRhdGVkKCkge1xuICAgICAqICAgdGhpcy5yZW5kZXJSb290LmdldEVsZW1lbnRCeUlkKCdteS10ZXh0LWFyZWEnKS5mb2N1cygpO1xuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIFNldHRpbmcgcHJvcGVydGllcyBpbnNpZGUgdGhpcyBtZXRob2Qgd2lsbCB0cmlnZ2VyIHRoZSBlbGVtZW50IHRvIHVwZGF0ZVxuICAgICAqIGFnYWluIGFmdGVyIHRoaXMgdXBkYXRlIGN5Y2xlIGNvbXBsZXRlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBfY2hhbmdlZFByb3BlcnRpZXMgTWFwIG9mIGNoYW5nZWQgcHJvcGVydGllcyB3aXRoIG9sZCB2YWx1ZXNcbiAgICAgKiBAY2F0ZWdvcnkgdXBkYXRlc1xuICAgICAqL1xuICAgIGZpcnN0VXBkYXRlZChfY2hhbmdlZFByb3BlcnRpZXMpIHsgfVxufVxuX2QgPSBmaW5hbGl6ZWQ7XG4vKipcbiAqIE1hcmtzIGNsYXNzIGFzIGhhdmluZyBmaW5pc2hlZCBjcmVhdGluZyBwcm9wZXJ0aWVzLlxuICovXG5SZWFjdGl2ZUVsZW1lbnRbX2RdID0gdHJ1ZTtcbi8qKlxuICogTWVtb2l6ZWQgbGlzdCBvZiBhbGwgZWxlbWVudCBwcm9wZXJ0aWVzLCBpbmNsdWRpbmcgYW55IHN1cGVyY2xhc3MgcHJvcGVydGllcy5cbiAqIENyZWF0ZWQgbGF6aWx5IG9uIHVzZXIgc3ViY2xhc3NlcyB3aGVuIGZpbmFsaXppbmcgdGhlIGNsYXNzLlxuICogQG5vY29sbGFwc2VcbiAqIEBjYXRlZ29yeSBwcm9wZXJ0aWVzXG4gKi9cblJlYWN0aXZlRWxlbWVudC5lbGVtZW50UHJvcGVydGllcyA9IG5ldyBNYXAoKTtcbi8qKlxuICogTWVtb2l6ZWQgbGlzdCBvZiBhbGwgZWxlbWVudCBzdHlsZXMuXG4gKiBDcmVhdGVkIGxhemlseSBvbiB1c2VyIHN1YmNsYXNzZXMgd2hlbiBmaW5hbGl6aW5nIHRoZSBjbGFzcy5cbiAqIEBub2NvbGxhcHNlXG4gKiBAY2F0ZWdvcnkgc3R5bGVzXG4gKi9cblJlYWN0aXZlRWxlbWVudC5lbGVtZW50U3R5bGVzID0gW107XG4vKipcbiAqIE9wdGlvbnMgdXNlZCB3aGVuIGNhbGxpbmcgYGF0dGFjaFNoYWRvd2AuIFNldCB0aGlzIHByb3BlcnR5IHRvIGN1c3RvbWl6ZVxuICogdGhlIG9wdGlvbnMgZm9yIHRoZSBzaGFkb3dSb290OyBmb3IgZXhhbXBsZSwgdG8gY3JlYXRlIGEgY2xvc2VkXG4gKiBzaGFkb3dSb290OiBge21vZGU6ICdjbG9zZWQnfWAuXG4gKlxuICogTm90ZSwgdGhlc2Ugb3B0aW9ucyBhcmUgdXNlZCBpbiBgY3JlYXRlUmVuZGVyUm9vdGAuIElmIHRoaXMgbWV0aG9kXG4gKiBpcyBjdXN0b21pemVkLCBvcHRpb25zIHNob3VsZCBiZSByZXNwZWN0ZWQgaWYgcG9zc2libGUuXG4gKiBAbm9jb2xsYXBzZVxuICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICovXG5SZWFjdGl2ZUVsZW1lbnQuc2hhZG93Um9vdE9wdGlvbnMgPSB7IG1vZGU6ICdvcGVuJyB9O1xuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxucG9seWZpbGxTdXBwb3J0ID09PSBudWxsIHx8IHBvbHlmaWxsU3VwcG9ydCA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9seWZpbGxTdXBwb3J0KHsgUmVhY3RpdmVFbGVtZW50IH0pO1xuLy8gRGV2IG1vZGUgd2FybmluZ3MuLi5cbmlmIChERVZfTU9ERSkge1xuICAgIC8vIERlZmF1bHQgd2FybmluZyBzZXQuXG4gICAgUmVhY3RpdmVFbGVtZW50LmVuYWJsZWRXYXJuaW5ncyA9IFsnY2hhbmdlLWluLXVwZGF0ZSddO1xuICAgIGNvbnN0IGVuc3VyZU93bldhcm5pbmdzID0gZnVuY3Rpb24gKGN0b3IpIHtcbiAgICAgICAgaWYgKCFjdG9yLmhhc093blByb3BlcnR5KEpTQ29tcGlsZXJfcmVuYW1lUHJvcGVydHkoJ2VuYWJsZWRXYXJuaW5ncycsIGN0b3IpKSkge1xuICAgICAgICAgICAgY3Rvci5lbmFibGVkV2FybmluZ3MgPSBjdG9yLmVuYWJsZWRXYXJuaW5ncy5zbGljZSgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBSZWFjdGl2ZUVsZW1lbnQuZW5hYmxlV2FybmluZyA9IGZ1bmN0aW9uICh3YXJuaW5nKSB7XG4gICAgICAgIGVuc3VyZU93bldhcm5pbmdzKHRoaXMpO1xuICAgICAgICBpZiAodGhpcy5lbmFibGVkV2FybmluZ3MuaW5kZXhPZih3YXJuaW5nKSA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlZFdhcm5pbmdzLnB1c2god2FybmluZyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFJlYWN0aXZlRWxlbWVudC5kaXNhYmxlV2FybmluZyA9IGZ1bmN0aW9uICh3YXJuaW5nKSB7XG4gICAgICAgIGVuc3VyZU93bldhcm5pbmdzKHRoaXMpO1xuICAgICAgICBjb25zdCBpID0gdGhpcy5lbmFibGVkV2FybmluZ3MuaW5kZXhPZih3YXJuaW5nKTtcbiAgICAgICAgaWYgKGkgPj0gMCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGVkV2FybmluZ3Muc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgfTtcbn1cbi8vIElNUE9SVEFOVDogZG8gbm90IGNoYW5nZSB0aGUgcHJvcGVydHkgbmFtZSBvciB0aGUgYXNzaWdubWVudCBleHByZXNzaW9uLlxuLy8gVGhpcyBsaW5lIHdpbGwgYmUgdXNlZCBpbiByZWdleGVzIHRvIHNlYXJjaCBmb3IgUmVhY3RpdmVFbGVtZW50IHVzYWdlLlxuKChfYyA9IGdsb2JhbFRoaXMucmVhY3RpdmVFbGVtZW50VmVyc2lvbnMpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IChnbG9iYWxUaGlzLnJlYWN0aXZlRWxlbWVudFZlcnNpb25zID0gW10pKS5wdXNoKCcxLjMuMScpO1xuaWYgKERFVl9NT0RFICYmIGdsb2JhbFRoaXMucmVhY3RpdmVFbGVtZW50VmVyc2lvbnMubGVuZ3RoID4gMSkge1xuICAgIGlzc3VlV2FybmluZygnbXVsdGlwbGUtdmVyc2lvbnMnLCBgTXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0IGxvYWRlZC4gTG9hZGluZyBtdWx0aXBsZSB2ZXJzaW9ucyBgICtcbiAgICAgICAgYGlzIG5vdCByZWNvbW1lbmRlZC5gKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXJlYWN0aXZlLWVsZW1lbnQuanMubWFwIiwiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IDIwMTcgR29vZ2xlIExMQ1xuICogU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEJTRC0zLUNsYXVzZVxuICovXG52YXIgX2EsIF9iLCBfYztcbi8qKlxuICogVGhlIG1haW4gTGl0RWxlbWVudCBtb2R1bGUsIHdoaWNoIGRlZmluZXMgdGhlIHtAbGlua2NvZGUgTGl0RWxlbWVudH0gYmFzZVxuICogY2xhc3MgYW5kIHJlbGF0ZWQgQVBJcy5cbiAqXG4gKiAgTGl0RWxlbWVudCBjb21wb25lbnRzIGNhbiBkZWZpbmUgYSB0ZW1wbGF0ZSBhbmQgYSBzZXQgb2Ygb2JzZXJ2ZWRcbiAqIHByb3BlcnRpZXMuIENoYW5naW5nIGFuIG9ic2VydmVkIHByb3BlcnR5IHRyaWdnZXJzIGEgcmUtcmVuZGVyIG9mIHRoZVxuICogZWxlbWVudC5cbiAqXG4gKiAgSW1wb3J0IHtAbGlua2NvZGUgTGl0RWxlbWVudH0gYW5kIHtAbGlua2NvZGUgaHRtbH0gZnJvbSB0aGlzIG1vZHVsZSB0b1xuICogY3JlYXRlIGEgY29tcG9uZW50OlxuICpcbiAqICBgYGBqc1xuICogaW1wb3J0IHtMaXRFbGVtZW50LCBodG1sfSBmcm9tICdsaXQtZWxlbWVudCc7XG4gKlxuICogY2xhc3MgTXlFbGVtZW50IGV4dGVuZHMgTGl0RWxlbWVudCB7XG4gKlxuICogICAvLyBEZWNsYXJlIG9ic2VydmVkIHByb3BlcnRpZXNcbiAqICAgc3RhdGljIGdldCBwcm9wZXJ0aWVzKCkge1xuICogICAgIHJldHVybiB7XG4gKiAgICAgICBhZGplY3RpdmU6IHt9XG4gKiAgICAgfVxuICogICB9XG4gKlxuICogICBjb25zdHJ1Y3RvcigpIHtcbiAqICAgICB0aGlzLmFkamVjdGl2ZSA9ICdhd2Vzb21lJztcbiAqICAgfVxuICpcbiAqICAgLy8gRGVmaW5lIHRoZSBlbGVtZW50J3MgdGVtcGxhdGVcbiAqICAgcmVuZGVyKCkge1xuICogICAgIHJldHVybiBodG1sYDxwPnlvdXIgJHthZGplY3RpdmV9IHRlbXBsYXRlIGhlcmU8L3A+YDtcbiAqICAgfVxuICogfVxuICpcbiAqIGN1c3RvbUVsZW1lbnRzLmRlZmluZSgnbXktZWxlbWVudCcsIE15RWxlbWVudCk7XG4gKiBgYGBcbiAqXG4gKiBgTGl0RWxlbWVudGAgZXh0ZW5kcyB7QGxpbmtjb2RlIFJlYWN0aXZlRWxlbWVudH0gYW5kIGFkZHMgbGl0LWh0bWxcbiAqIHRlbXBsYXRpbmcuIFRoZSBgUmVhY3RpdmVFbGVtZW50YCBjbGFzcyBpcyBwcm92aWRlZCBmb3IgdXNlcnMgdGhhdCB3YW50IHRvXG4gKiBidWlsZCB0aGVpciBvd24gY3VzdG9tIGVsZW1lbnQgYmFzZSBjbGFzc2VzIHRoYXQgZG9uJ3QgdXNlIGxpdC1odG1sLlxuICpcbiAqIEBwYWNrYWdlRG9jdW1lbnRhdGlvblxuICovXG5pbXBvcnQgeyBSZWFjdGl2ZUVsZW1lbnQgfSBmcm9tICdAbGl0L3JlYWN0aXZlLWVsZW1lbnQnO1xuaW1wb3J0IHsgcmVuZGVyLCBub0NoYW5nZSB9IGZyb20gJ2xpdC1odG1sJztcbmV4cG9ydCAqIGZyb20gJ0BsaXQvcmVhY3RpdmUtZWxlbWVudCc7XG5leHBvcnQgKiBmcm9tICdsaXQtaHRtbCc7XG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgZXhwb3J0IFJlYWN0aXZlRWxlbWVudCBhcyBVcGRhdGluZ0VsZW1lbnQuIE5vdGUsXG4vLyBJRSB0cmFuc3BpbGF0aW9uIHJlcXVpcmVzIGV4cG9ydGluZyBsaWtlIHRoaXMuXG5leHBvcnQgY29uc3QgVXBkYXRpbmdFbGVtZW50ID0gUmVhY3RpdmVFbGVtZW50O1xuY29uc3QgREVWX01PREUgPSB0cnVlO1xubGV0IGlzc3VlV2FybmluZztcbmlmIChERVZfTU9ERSkge1xuICAgIC8vIEVuc3VyZSB3YXJuaW5ncyBhcmUgaXNzdWVkIG9ubHkgMXgsIGV2ZW4gaWYgbXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0XG4gICAgLy8gYXJlIGxvYWRlZC5cbiAgICBjb25zdCBpc3N1ZWRXYXJuaW5ncyA9ICgoX2EgPSBnbG9iYWxUaGlzLmxpdElzc3VlZFdhcm5pbmdzKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncyA9IG5ldyBTZXQoKSkpO1xuICAgIC8vIElzc3VlIGEgd2FybmluZywgaWYgd2UgaGF2ZW4ndCBhbHJlYWR5LlxuICAgIGlzc3VlV2FybmluZyA9IChjb2RlLCB3YXJuaW5nKSA9PiB7XG4gICAgICAgIHdhcm5pbmcgKz0gYCBTZWUgaHR0cHM6Ly9saXQuZGV2L21zZy8ke2NvZGV9IGZvciBtb3JlIGluZm9ybWF0aW9uLmA7XG4gICAgICAgIGlmICghaXNzdWVkV2FybmluZ3MuaGFzKHdhcm5pbmcpKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4od2FybmluZyk7XG4gICAgICAgICAgICBpc3N1ZWRXYXJuaW5ncy5hZGQod2FybmluZyk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBCYXNlIGVsZW1lbnQgY2xhc3MgdGhhdCBtYW5hZ2VzIGVsZW1lbnQgcHJvcGVydGllcyBhbmQgYXR0cmlidXRlcywgYW5kXG4gKiByZW5kZXJzIGEgbGl0LWh0bWwgdGVtcGxhdGUuXG4gKlxuICogVG8gZGVmaW5lIGEgY29tcG9uZW50LCBzdWJjbGFzcyBgTGl0RWxlbWVudGAgYW5kIGltcGxlbWVudCBhXG4gKiBgcmVuZGVyYCBtZXRob2QgdG8gcHJvdmlkZSB0aGUgY29tcG9uZW50J3MgdGVtcGxhdGUuIERlZmluZSBwcm9wZXJ0aWVzXG4gKiB1c2luZyB0aGUge0BsaW5rY29kZSBMaXRFbGVtZW50LnByb3BlcnRpZXMgcHJvcGVydGllc30gcHJvcGVydHkgb3IgdGhlXG4gKiB7QGxpbmtjb2RlIHByb3BlcnR5fSBkZWNvcmF0b3IuXG4gKi9cbmV4cG9ydCBjbGFzcyBMaXRFbGVtZW50IGV4dGVuZHMgUmVhY3RpdmVFbGVtZW50IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBjYXRlZ29yeSByZW5kZXJpbmdcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmVuZGVyT3B0aW9ucyA9IHsgaG9zdDogdGhpcyB9O1xuICAgICAgICB0aGlzLl9fY2hpbGRQYXJ0ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBAY2F0ZWdvcnkgcmVuZGVyaW5nXG4gICAgICovXG4gICAgY3JlYXRlUmVuZGVyUm9vdCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB2YXIgX2I7XG4gICAgICAgIGNvbnN0IHJlbmRlclJvb3QgPSBzdXBlci5jcmVhdGVSZW5kZXJSb290KCk7XG4gICAgICAgIC8vIFdoZW4gYWRvcHRlZFN0eWxlU2hlZXRzIGFyZSBzaGltbWVkLCB0aGV5IGFyZSBpbnNlcnRlZCBpbnRvIHRoZVxuICAgICAgICAvLyBzaGFkb3dSb290IGJ5IGNyZWF0ZVJlbmRlclJvb3QuIEFkanVzdCB0aGUgcmVuZGVyQmVmb3JlIG5vZGUgc28gdGhhdFxuICAgICAgICAvLyBhbnkgc3R5bGVzIGluIExpdCBjb250ZW50IHJlbmRlciBiZWZvcmUgYWRvcHRlZFN0eWxlU2hlZXRzLiBUaGlzIGlzXG4gICAgICAgIC8vIGltcG9ydGFudCBzbyB0aGF0IGFkb3B0ZWRTdHlsZVNoZWV0cyBoYXZlIHByZWNlZGVuY2Ugb3ZlciBzdHlsZXMgaW5cbiAgICAgICAgLy8gdGhlIHNoYWRvd1Jvb3QuXG4gICAgICAgIChfYSA9IChfYiA9IHRoaXMucmVuZGVyT3B0aW9ucykucmVuZGVyQmVmb3JlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiAoX2IucmVuZGVyQmVmb3JlID0gcmVuZGVyUm9vdC5maXJzdENoaWxkKTtcbiAgICAgICAgcmV0dXJuIHJlbmRlclJvb3Q7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIGVsZW1lbnQuIFRoaXMgbWV0aG9kIHJlZmxlY3RzIHByb3BlcnR5IHZhbHVlcyB0byBhdHRyaWJ1dGVzXG4gICAgICogYW5kIGNhbGxzIGByZW5kZXJgIHRvIHJlbmRlciBET00gdmlhIGxpdC1odG1sLiBTZXR0aW5nIHByb3BlcnRpZXMgaW5zaWRlXG4gICAgICogdGhpcyBtZXRob2Qgd2lsbCAqbm90KiB0cmlnZ2VyIGFub3RoZXIgdXBkYXRlLlxuICAgICAqIEBwYXJhbSBjaGFuZ2VkUHJvcGVydGllcyBNYXAgb2YgY2hhbmdlZCBwcm9wZXJ0aWVzIHdpdGggb2xkIHZhbHVlc1xuICAgICAqIEBjYXRlZ29yeSB1cGRhdGVzXG4gICAgICovXG4gICAgdXBkYXRlKGNoYW5nZWRQcm9wZXJ0aWVzKSB7XG4gICAgICAgIC8vIFNldHRpbmcgcHJvcGVydGllcyBpbiBgcmVuZGVyYCBzaG91bGQgbm90IHRyaWdnZXIgYW4gdXBkYXRlLiBTaW5jZVxuICAgICAgICAvLyB1cGRhdGVzIGFyZSBhbGxvd2VkIGFmdGVyIHN1cGVyLnVwZGF0ZSwgaXQncyBpbXBvcnRhbnQgdG8gY2FsbCBgcmVuZGVyYFxuICAgICAgICAvLyBiZWZvcmUgdGhhdC5cbiAgICAgICAgY29uc3QgdmFsdWUgPSB0aGlzLnJlbmRlcigpO1xuICAgICAgICBpZiAoIXRoaXMuaGFzVXBkYXRlZCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJPcHRpb25zLmlzQ29ubmVjdGVkID0gdGhpcy5pc0Nvbm5lY3RlZDtcbiAgICAgICAgfVxuICAgICAgICBzdXBlci51cGRhdGUoY2hhbmdlZFByb3BlcnRpZXMpO1xuICAgICAgICB0aGlzLl9fY2hpbGRQYXJ0ID0gcmVuZGVyKHZhbHVlLCB0aGlzLnJlbmRlclJvb3QsIHRoaXMucmVuZGVyT3B0aW9ucyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFkZGVkIHRvIHRoZSBkb2N1bWVudCdzIERPTS5cbiAgICAgKlxuICAgICAqIEluIGBjb25uZWN0ZWRDYWxsYmFjaygpYCB5b3Ugc2hvdWxkIHNldHVwIHRhc2tzIHRoYXQgc2hvdWxkIG9ubHkgb2NjdXIgd2hlblxuICAgICAqIHRoZSBlbGVtZW50IGlzIGNvbm5lY3RlZCB0byB0aGUgZG9jdW1lbnQuIFRoZSBtb3N0IGNvbW1vbiBvZiB0aGVzZSBpc1xuICAgICAqIGFkZGluZyBldmVudCBsaXN0ZW5lcnMgdG8gbm9kZXMgZXh0ZXJuYWwgdG8gdGhlIGVsZW1lbnQsIGxpa2UgYSBrZXlkb3duXG4gICAgICogZXZlbnQgaGFuZGxlciBhZGRlZCB0byB0aGUgd2luZG93LlxuICAgICAqXG4gICAgICogYGBgdHNcbiAgICAgKiBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgKiAgIHN1cGVyLmNvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgICogICBhZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5faGFuZGxlS2V5ZG93bik7XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogVHlwaWNhbGx5LCBhbnl0aGluZyBkb25lIGluIGBjb25uZWN0ZWRDYWxsYmFjaygpYCBzaG91bGQgYmUgdW5kb25lIHdoZW4gdGhlXG4gICAgICogZWxlbWVudCBpcyBkaXNjb25uZWN0ZWQsIGluIGBkaXNjb25uZWN0ZWRDYWxsYmFjaygpYC5cbiAgICAgKlxuICAgICAqIEBjYXRlZ29yeSBsaWZlY3ljbGVcbiAgICAgKi9cbiAgICBjb25uZWN0ZWRDYWxsYmFjaygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICBzdXBlci5jb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgICAgICAoX2EgPSB0aGlzLl9fY2hpbGRQYXJ0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Euc2V0Q29ubmVjdGVkKHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyByZW1vdmVkIGZyb20gdGhlIGRvY3VtZW50J3MgRE9NLlxuICAgICAqXG4gICAgICogVGhpcyBjYWxsYmFjayBpcyB0aGUgbWFpbiBzaWduYWwgdG8gdGhlIGVsZW1lbnQgdGhhdCBpdCBtYXkgbm8gbG9uZ2VyIGJlXG4gICAgICogdXNlZC4gYGRpc2Nvbm5lY3RlZENhbGxiYWNrKClgIHNob3VsZCBlbnN1cmUgdGhhdCBub3RoaW5nIGlzIGhvbGRpbmcgYVxuICAgICAqIHJlZmVyZW5jZSB0byB0aGUgZWxlbWVudCAoc3VjaCBhcyBldmVudCBsaXN0ZW5lcnMgYWRkZWQgdG8gbm9kZXMgZXh0ZXJuYWxcbiAgICAgKiB0byB0aGUgZWxlbWVudCksIHNvIHRoYXQgaXQgaXMgZnJlZSB0byBiZSBnYXJiYWdlIGNvbGxlY3RlZC5cbiAgICAgKlxuICAgICAqIGBgYHRzXG4gICAgICogZGlzY29ubmVjdGVkQ2FsbGJhY2soKSB7XG4gICAgICogICBzdXBlci5kaXNjb25uZWN0ZWRDYWxsYmFjaygpO1xuICAgICAqICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLl9oYW5kbGVLZXlkb3duKTtcbiAgICAgKiB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBBbiBlbGVtZW50IG1heSBiZSByZS1jb25uZWN0ZWQgYWZ0ZXIgYmVpbmcgZGlzY29ubmVjdGVkLlxuICAgICAqXG4gICAgICogQGNhdGVnb3J5IGxpZmVjeWNsZVxuICAgICAqL1xuICAgIGRpc2Nvbm5lY3RlZENhbGxiYWNrKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHN1cGVyLmRpc2Nvbm5lY3RlZENhbGxiYWNrKCk7XG4gICAgICAgIChfYSA9IHRoaXMuX19jaGlsZFBhcnQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5zZXRDb25uZWN0ZWQoZmFsc2UpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbnZva2VkIG9uIGVhY2ggdXBkYXRlIHRvIHBlcmZvcm0gcmVuZGVyaW5nIHRhc2tzLiBUaGlzIG1ldGhvZCBtYXkgcmV0dXJuXG4gICAgICogYW55IHZhbHVlIHJlbmRlcmFibGUgYnkgbGl0LWh0bWwncyBgQ2hpbGRQYXJ0YCAtIHR5cGljYWxseSBhXG4gICAgICogYFRlbXBsYXRlUmVzdWx0YC4gU2V0dGluZyBwcm9wZXJ0aWVzIGluc2lkZSB0aGlzIG1ldGhvZCB3aWxsICpub3QqIHRyaWdnZXJcbiAgICAgKiB0aGUgZWxlbWVudCB0byB1cGRhdGUuXG4gICAgICogQGNhdGVnb3J5IHJlbmRlcmluZ1xuICAgICAqL1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIG5vQ2hhbmdlO1xuICAgIH1cbn1cbi8qKlxuICogRW5zdXJlIHRoaXMgY2xhc3MgaXMgbWFya2VkIGFzIGBmaW5hbGl6ZWRgIGFzIGFuIG9wdGltaXphdGlvbiBlbnN1cmluZ1xuICogaXQgd2lsbCBub3QgbmVlZGxlc3NseSB0cnkgdG8gYGZpbmFsaXplYC5cbiAqXG4gKiBOb3RlIHRoaXMgcHJvcGVydHkgbmFtZSBpcyBhIHN0cmluZyB0byBwcmV2ZW50IGJyZWFraW5nIENsb3N1cmUgSlMgQ29tcGlsZXJcbiAqIG9wdGltaXphdGlvbnMuIFNlZSBAbGl0L3JlYWN0aXZlLWVsZW1lbnQgZm9yIG1vcmUgaW5mb3JtYXRpb24uXG4gKi9cbkxpdEVsZW1lbnRbJ2ZpbmFsaXplZCddID0gdHJ1ZTtcbi8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG5MaXRFbGVtZW50WydfJGxpdEVsZW1lbnQkJ10gPSB0cnVlO1xuLy8gSW5zdGFsbCBoeWRyYXRpb24gaWYgYXZhaWxhYmxlXG4oX2IgPSBnbG9iYWxUaGlzLmxpdEVsZW1lbnRIeWRyYXRlU3VwcG9ydCkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoZ2xvYmFsVGhpcywgeyBMaXRFbGVtZW50IH0pO1xuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgICA/IGdsb2JhbFRoaXMubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydERldk1vZGVcbiAgICA6IGdsb2JhbFRoaXMubGl0RWxlbWVudFBvbHlmaWxsU3VwcG9ydDtcbnBvbHlmaWxsU3VwcG9ydCA9PT0gbnVsbCB8fCBwb2x5ZmlsbFN1cHBvcnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHBvbHlmaWxsU3VwcG9ydCh7IExpdEVsZW1lbnQgfSk7XG4vLyBERVYgbW9kZSB3YXJuaW5nc1xuaWYgKERFVl9NT0RFKSB7XG4gICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICAgIC8vIE5vdGUsIGZvciBjb21wYXRpYmlsaXR5IHdpdGggY2xvc3VyZSBjb21waWxhdGlvbiwgdGhpcyBhY2Nlc3NcbiAgICAvLyBuZWVkcyB0byBiZSBhcyBhIHN0cmluZyBwcm9wZXJ0eSBpbmRleC5cbiAgICBMaXRFbGVtZW50WydmaW5hbGl6ZSddID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBmaW5hbGl6ZWQgPSBSZWFjdGl2ZUVsZW1lbnQuZmluYWxpemUuY2FsbCh0aGlzKTtcbiAgICAgICAgaWYgKCFmaW5hbGl6ZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3YXJuUmVtb3ZlZE9yUmVuYW1lZCA9IChvYmosIG5hbWUsIHJlbmFtZWQgPSBmYWxzZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGN0b3JOYW1lID0gKHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbicgPyBvYmogOiBvYmouY29uc3RydWN0b3IpXG4gICAgICAgICAgICAgICAgICAgIC5uYW1lO1xuICAgICAgICAgICAgICAgIGlzc3VlV2FybmluZyhyZW5hbWVkID8gJ3JlbmFtZWQtYXBpJyA6ICdyZW1vdmVkLWFwaScsIGBcXGAke25hbWV9XFxgIGlzIGltcGxlbWVudGVkIG9uIGNsYXNzICR7Y3Rvck5hbWV9LiBJdCBgICtcbiAgICAgICAgICAgICAgICAgICAgYGhhcyBiZWVuICR7cmVuYW1lZCA/ICdyZW5hbWVkJyA6ICdyZW1vdmVkJ30gYCArXG4gICAgICAgICAgICAgICAgICAgIGBpbiB0aGlzIHZlcnNpb24gb2YgTGl0RWxlbWVudC5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgd2FyblJlbW92ZWRPclJlbmFtZWQodGhpcywgJ3JlbmRlcicpO1xuICAgICAgICB3YXJuUmVtb3ZlZE9yUmVuYW1lZCh0aGlzLCAnZ2V0U3R5bGVzJywgdHJ1ZSk7XG4gICAgICAgIHdhcm5SZW1vdmVkT3JSZW5hbWVkKHRoaXMucHJvdG90eXBlLCAnYWRvcHRTdHlsZXMnKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICAvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbn1cbi8qKlxuICogRU5EIFVTRVJTIFNIT1VMRCBOT1QgUkVMWSBPTiBUSElTIE9CSkVDVC5cbiAqXG4gKiBQcml2YXRlIGV4cG9ydHMgZm9yIHVzZSBieSBvdGhlciBMaXQgcGFja2FnZXMsIG5vdCBpbnRlbmRlZCBmb3IgdXNlIGJ5XG4gKiBleHRlcm5hbCB1c2Vycy5cbiAqXG4gKiBXZSBjdXJyZW50bHkgZG8gbm90IG1ha2UgYSBtYW5nbGVkIHJvbGx1cCBidWlsZCBvZiB0aGUgbGl0LXNzciBjb2RlLiBJbiBvcmRlclxuICogdG8ga2VlcCBhIG51bWJlciBvZiAob3RoZXJ3aXNlIHByaXZhdGUpIHRvcC1sZXZlbCBleHBvcnRzICBtYW5nbGVkIGluIHRoZVxuICogY2xpZW50IHNpZGUgY29kZSwgd2UgZXhwb3J0IGEgXyRMRSBvYmplY3QgY29udGFpbmluZyB0aG9zZSBtZW1iZXJzIChvclxuICogaGVscGVyIG1ldGhvZHMgZm9yIGFjY2Vzc2luZyBwcml2YXRlIGZpZWxkcyBvZiB0aG9zZSBtZW1iZXJzKSwgYW5kIHRoZW5cbiAqIHJlLWV4cG9ydCB0aGVtIGZvciB1c2UgaW4gbGl0LXNzci4gVGhpcyBrZWVwcyBsaXQtc3NyIGFnbm9zdGljIHRvIHdoZXRoZXIgdGhlXG4gKiBjbGllbnQtc2lkZSBjb2RlIGlzIGJlaW5nIHVzZWQgaW4gYGRldmAgbW9kZSBvciBgcHJvZGAgbW9kZS5cbiAqXG4gKiBUaGlzIGhhcyBhIHVuaXF1ZSBuYW1lLCB0byBkaXNhbWJpZ3VhdGUgaXQgZnJvbSBwcml2YXRlIGV4cG9ydHMgaW5cbiAqIGxpdC1odG1sLCBzaW5jZSB0aGlzIG1vZHVsZSByZS1leHBvcnRzIGFsbCBvZiBsaXQtaHRtbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgXyRMRSA9IHtcbiAgICBfJGF0dHJpYnV0ZVRvUHJvcGVydHk6IChlbCwgbmFtZSwgdmFsdWUpID0+IHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGVsLl8kYXR0cmlidXRlVG9Qcm9wZXJ0eShuYW1lLCB2YWx1ZSk7XG4gICAgfSxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBfJGNoYW5nZWRQcm9wZXJ0aWVzOiAoZWwpID0+IGVsLl8kY2hhbmdlZFByb3BlcnRpZXMsXG59O1xuLy8gSU1QT1JUQU5UOiBkbyBub3QgY2hhbmdlIHRoZSBwcm9wZXJ0eSBuYW1lIG9yIHRoZSBhc3NpZ25tZW50IGV4cHJlc3Npb24uXG4vLyBUaGlzIGxpbmUgd2lsbCBiZSB1c2VkIGluIHJlZ2V4ZXMgdG8gc2VhcmNoIGZvciBMaXRFbGVtZW50IHVzYWdlLlxuKChfYyA9IGdsb2JhbFRoaXMubGl0RWxlbWVudFZlcnNpb25zKSAhPT0gbnVsbCAmJiBfYyAhPT0gdm9pZCAwID8gX2MgOiAoZ2xvYmFsVGhpcy5saXRFbGVtZW50VmVyc2lvbnMgPSBbXSkpLnB1c2goJzMuMi4wJyk7XG5pZiAoREVWX01PREUgJiYgZ2xvYmFsVGhpcy5saXRFbGVtZW50VmVyc2lvbnMubGVuZ3RoID4gMSkge1xuICAgIGlzc3VlV2FybmluZygnbXVsdGlwbGUtdmVyc2lvbnMnLCBgTXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0IGxvYWRlZC4gTG9hZGluZyBtdWx0aXBsZSB2ZXJzaW9ucyBgICtcbiAgICAgICAgYGlzIG5vdCByZWNvbW1lbmRlZC5gKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpdC1lbGVtZW50LmpzLm1hcCIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAyMDE3IEdvb2dsZSBMTENcbiAqIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBCU0QtMy1DbGF1c2VcbiAqL1xudmFyIF9hLCBfYiwgX2MsIF9kO1xuY29uc3QgREVWX01PREUgPSB0cnVlO1xuY29uc3QgRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTID0gdHJ1ZTtcbmNvbnN0IEVOQUJMRV9TSEFEWURPTV9OT1BBVENIID0gdHJ1ZTtcbi8qKlxuICogVXNlZnVsIGZvciB2aXN1YWxpemluZyBhbmQgbG9nZ2luZyBpbnNpZ2h0cyBpbnRvIHdoYXQgdGhlIExpdCB0ZW1wbGF0ZSBzeXN0ZW0gaXMgZG9pbmcuXG4gKlxuICogQ29tcGlsZWQgb3V0IG9mIHByb2QgbW9kZSBidWlsZHMuXG4gKi9cbmNvbnN0IGRlYnVnTG9nRXZlbnQgPSBERVZfTU9ERVxuICAgID8gKGV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHNob3VsZEVtaXQgPSB3aW5kb3dcbiAgICAgICAgICAgIC5lbWl0TGl0RGVidWdMb2dFdmVudHM7XG4gICAgICAgIGlmICghc2hvdWxkRW1pdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCgnbGl0LWRlYnVnJywge1xuICAgICAgICAgICAgZGV0YWlsOiBldmVudCxcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICA6IHVuZGVmaW5lZDtcbi8vIFVzZWQgZm9yIGNvbm5lY3RpbmcgYmVnaW5SZW5kZXIgYW5kIGVuZFJlbmRlciBldmVudHMgd2hlbiB0aGVyZSBhcmUgbmVzdGVkXG4vLyByZW5kZXJzIHdoZW4gZXJyb3JzIGFyZSB0aHJvd24gcHJldmVudGluZyBhbiBlbmRSZW5kZXIgZXZlbnQgZnJvbSBiZWluZ1xuLy8gY2FsbGVkLlxubGV0IGRlYnVnTG9nUmVuZGVySWQgPSAwO1xuLyoqXG4gKiBgdHJ1ZWAgaWYgd2UncmUgYnVpbGRpbmcgZm9yIGdvb2dsZTMgd2l0aCB0ZW1wb3JhcnkgYmFjay1jb21wYXQgaGVscGVycy5cbiAqIFRoaXMgZXhwb3J0IGlzIG5vdCBwcmVzZW50IGluIHByb2QgYnVpbGRzLlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBJTlRFUk5BTCA9IHRydWU7XG5sZXQgaXNzdWVXYXJuaW5nO1xuaWYgKERFVl9NT0RFKSB7XG4gICAgKF9hID0gZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogKGdsb2JhbFRoaXMubGl0SXNzdWVkV2FybmluZ3MgPSBuZXcgU2V0KCkpO1xuICAgIC8vIElzc3VlIGEgd2FybmluZywgaWYgd2UgaGF2ZW4ndCBhbHJlYWR5LlxuICAgIGlzc3VlV2FybmluZyA9IChjb2RlLCB3YXJuaW5nKSA9PiB7XG4gICAgICAgIHdhcm5pbmcgKz0gY29kZVxuICAgICAgICAgICAgPyBgIFNlZSBodHRwczovL2xpdC5kZXYvbXNnLyR7Y29kZX0gZm9yIG1vcmUgaW5mb3JtYXRpb24uYFxuICAgICAgICAgICAgOiAnJztcbiAgICAgICAgaWYgKCFnbG9iYWxUaGlzLmxpdElzc3VlZFdhcm5pbmdzLmhhcyh3YXJuaW5nKSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKHdhcm5pbmcpO1xuICAgICAgICAgICAgZ2xvYmFsVGhpcy5saXRJc3N1ZWRXYXJuaW5ncy5hZGQod2FybmluZyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIGlzc3VlV2FybmluZygnZGV2LW1vZGUnLCBgTGl0IGlzIGluIGRldiBtb2RlLiBOb3QgcmVjb21tZW5kZWQgZm9yIHByb2R1Y3Rpb24hYCk7XG59XG5jb25zdCB3cmFwID0gRU5BQkxFX1NIQURZRE9NX05PUEFUQ0ggJiZcbiAgICAoKF9iID0gd2luZG93LlNoYWR5RE9NKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuaW5Vc2UpICYmXG4gICAgKChfYyA9IHdpbmRvdy5TaGFkeURPTSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLm5vUGF0Y2gpID09PSB0cnVlXG4gICAgPyB3aW5kb3cuU2hhZHlET00ud3JhcFxuICAgIDogKG5vZGUpID0+IG5vZGU7XG5jb25zdCB0cnVzdGVkVHlwZXMgPSBnbG9iYWxUaGlzLnRydXN0ZWRUeXBlcztcbi8qKlxuICogT3VyIFRydXN0ZWRUeXBlUG9saWN5IGZvciBIVE1MIHdoaWNoIGlzIGRlY2xhcmVkIHVzaW5nIHRoZSBodG1sIHRlbXBsYXRlXG4gKiB0YWcgZnVuY3Rpb24uXG4gKlxuICogVGhhdCBIVE1MIGlzIGEgZGV2ZWxvcGVyLWF1dGhvcmVkIGNvbnN0YW50LCBhbmQgaXMgcGFyc2VkIHdpdGggaW5uZXJIVE1MXG4gKiBiZWZvcmUgYW55IHVudHJ1c3RlZCBleHByZXNzaW9ucyBoYXZlIGJlZW4gbWl4ZWQgaW4uIFRoZXJlZm9yIGl0IGlzXG4gKiBjb25zaWRlcmVkIHNhZmUgYnkgY29uc3RydWN0aW9uLlxuICovXG5jb25zdCBwb2xpY3kgPSB0cnVzdGVkVHlwZXNcbiAgICA/IHRydXN0ZWRUeXBlcy5jcmVhdGVQb2xpY3koJ2xpdC1odG1sJywge1xuICAgICAgICBjcmVhdGVIVE1MOiAocykgPT4gcyxcbiAgICB9KVxuICAgIDogdW5kZWZpbmVkO1xuY29uc3QgaWRlbnRpdHlGdW5jdGlvbiA9ICh2YWx1ZSkgPT4gdmFsdWU7XG5jb25zdCBub29wU2FuaXRpemVyID0gKF9ub2RlLCBfbmFtZSwgX3R5cGUpID0+IGlkZW50aXR5RnVuY3Rpb247XG4vKiogU2V0cyB0aGUgZ2xvYmFsIHNhbml0aXplciBmYWN0b3J5LiAqL1xuY29uc3Qgc2V0U2FuaXRpemVyID0gKG5ld1Nhbml0aXplcikgPT4ge1xuICAgIGlmICghRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHNhbml0aXplckZhY3RvcnlJbnRlcm5hbCAhPT0gbm9vcFNhbml0aXplcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEF0dGVtcHRlZCB0byBvdmVyd3JpdGUgZXhpc3RpbmcgbGl0LWh0bWwgc2VjdXJpdHkgcG9saWN5LmAgK1xuICAgICAgICAgICAgYCBzZXRTYW5pdGl6ZURPTVZhbHVlRmFjdG9yeSBzaG91bGQgYmUgY2FsbGVkIGF0IG1vc3Qgb25jZS5gKTtcbiAgICB9XG4gICAgc2FuaXRpemVyRmFjdG9yeUludGVybmFsID0gbmV3U2FuaXRpemVyO1xufTtcbi8qKlxuICogT25seSB1c2VkIGluIGludGVybmFsIHRlc3RzLCBub3QgYSBwYXJ0IG9mIHRoZSBwdWJsaWMgQVBJLlxuICovXG5jb25zdCBfdGVzdE9ubHlDbGVhclNhbml0aXplckZhY3RvcnlEb05vdENhbGxPckVsc2UgPSAoKSA9PiB7XG4gICAgc2FuaXRpemVyRmFjdG9yeUludGVybmFsID0gbm9vcFNhbml0aXplcjtcbn07XG5jb25zdCBjcmVhdGVTYW5pdGl6ZXIgPSAobm9kZSwgbmFtZSwgdHlwZSkgPT4ge1xuICAgIHJldHVybiBzYW5pdGl6ZXJGYWN0b3J5SW50ZXJuYWwobm9kZSwgbmFtZSwgdHlwZSk7XG59O1xuLy8gQWRkZWQgdG8gYW4gYXR0cmlidXRlIG5hbWUgdG8gbWFyayB0aGUgYXR0cmlidXRlIGFzIGJvdW5kIHNvIHdlIGNhbiBmaW5kXG4vLyBpdCBlYXNpbHkuXG5jb25zdCBib3VuZEF0dHJpYnV0ZVN1ZmZpeCA9ICckbGl0JCc7XG4vLyBUaGlzIG1hcmtlciBpcyB1c2VkIGluIG1hbnkgc3ludGFjdGljIHBvc2l0aW9ucyBpbiBIVE1MLCBzbyBpdCBtdXN0IGJlXG4vLyBhIHZhbGlkIGVsZW1lbnQgbmFtZSBhbmQgYXR0cmlidXRlIG5hbWUuIFdlIGRvbid0IHN1cHBvcnQgZHluYW1pYyBuYW1lcyAoeWV0KVxuLy8gYnV0IHRoaXMgYXQgbGVhc3QgZW5zdXJlcyB0aGF0IHRoZSBwYXJzZSB0cmVlIGlzIGNsb3NlciB0byB0aGUgdGVtcGxhdGVcbi8vIGludGVudGlvbi5cbmNvbnN0IG1hcmtlciA9IGBsaXQkJHtTdHJpbmcoTWF0aC5yYW5kb20oKSkuc2xpY2UoOSl9JGA7XG4vLyBTdHJpbmcgdXNlZCB0byB0ZWxsIGlmIGEgY29tbWVudCBpcyBhIG1hcmtlciBjb21tZW50XG5jb25zdCBtYXJrZXJNYXRjaCA9ICc/JyArIG1hcmtlcjtcbi8vIFRleHQgdXNlZCB0byBpbnNlcnQgYSBjb21tZW50IG1hcmtlciBub2RlLiBXZSB1c2UgcHJvY2Vzc2luZyBpbnN0cnVjdGlvblxuLy8gc3ludGF4IGJlY2F1c2UgaXQncyBzbGlnaHRseSBzbWFsbGVyLCBidXQgcGFyc2VzIGFzIGEgY29tbWVudCBub2RlLlxuY29uc3Qgbm9kZU1hcmtlciA9IGA8JHttYXJrZXJNYXRjaH0+YDtcbmNvbnN0IGQgPSBkb2N1bWVudDtcbi8vIENyZWF0ZXMgYSBkeW5hbWljIG1hcmtlci4gV2UgbmV2ZXIgaGF2ZSB0byBzZWFyY2ggZm9yIHRoZXNlIGluIHRoZSBET00uXG5jb25zdCBjcmVhdGVNYXJrZXIgPSAodiA9ICcnKSA9PiBkLmNyZWF0ZUNvbW1lbnQodik7XG5jb25zdCBpc1ByaW1pdGl2ZSA9ICh2YWx1ZSkgPT4gdmFsdWUgPT09IG51bGwgfHwgKHR5cGVvZiB2YWx1ZSAhPSAnb2JqZWN0JyAmJiB0eXBlb2YgdmFsdWUgIT0gJ2Z1bmN0aW9uJyk7XG5jb25zdCBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbmNvbnN0IGlzSXRlcmFibGUgPSAodmFsdWUpID0+IHtcbiAgICB2YXIgX2E7XG4gICAgcmV0dXJuIGlzQXJyYXkodmFsdWUpIHx8XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHR5cGVvZiAoKF9hID0gdmFsdWUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVtTeW1ib2wuaXRlcmF0b3JdKSA9PT0gJ2Z1bmN0aW9uJztcbn07XG5jb25zdCBTUEFDRV9DSEFSID0gYFsgXFx0XFxuXFxmXFxyXWA7XG5jb25zdCBBVFRSX1ZBTFVFX0NIQVIgPSBgW14gXFx0XFxuXFxmXFxyXCInXFxgPD49XWA7XG5jb25zdCBOQU1FX0NIQVIgPSBgW15cXFxcc1wiJz49L11gO1xuLy8gVGhlc2UgcmVnZXhlcyByZXByZXNlbnQgdGhlIGZpdmUgcGFyc2luZyBzdGF0ZXMgdGhhdCB3ZSBjYXJlIGFib3V0IGluIHRoZVxuLy8gVGVtcGxhdGUncyBIVE1MIHNjYW5uZXIuIFRoZXkgbWF0Y2ggdGhlICplbmQqIG9mIHRoZSBzdGF0ZSB0aGV5J3JlIG5hbWVkXG4vLyBhZnRlci5cbi8vIERlcGVuZGluZyBvbiB0aGUgbWF0Y2gsIHdlIHRyYW5zaXRpb24gdG8gYSBuZXcgc3RhdGUuIElmIHRoZXJlJ3Mgbm8gbWF0Y2gsXG4vLyB3ZSBzdGF5IGluIHRoZSBzYW1lIHN0YXRlLlxuLy8gTm90ZSB0aGF0IHRoZSByZWdleGVzIGFyZSBzdGF0ZWZ1bC4gV2UgdXRpbGl6ZSBsYXN0SW5kZXggYW5kIHN5bmMgaXRcbi8vIGFjcm9zcyB0aGUgbXVsdGlwbGUgcmVnZXhlcyB1c2VkLiBJbiBhZGRpdGlvbiB0byB0aGUgZml2ZSByZWdleGVzIGJlbG93XG4vLyB3ZSBhbHNvIGR5bmFtaWNhbGx5IGNyZWF0ZSBhIHJlZ2V4IHRvIGZpbmQgdGhlIG1hdGNoaW5nIGVuZCB0YWdzIGZvciByYXdcbi8vIHRleHQgZWxlbWVudHMuXG4vKipcbiAqIEVuZCBvZiB0ZXh0IGlzOiBgPGAgZm9sbG93ZWQgYnk6XG4gKiAgIChjb21tZW50IHN0YXJ0KSBvciAodGFnKSBvciAoZHluYW1pYyB0YWcgYmluZGluZylcbiAqL1xuY29uc3QgdGV4dEVuZFJlZ2V4ID0gLzwoPzooIS0tfFxcL1teYS16QS1aXSl8KFxcLz9bYS16QS1aXVtePlxcc10qKXwoXFwvPyQpKS9nO1xuY29uc3QgQ09NTUVOVF9TVEFSVCA9IDE7XG5jb25zdCBUQUdfTkFNRSA9IDI7XG5jb25zdCBEWU5BTUlDX1RBR19OQU1FID0gMztcbmNvbnN0IGNvbW1lbnRFbmRSZWdleCA9IC8tLT4vZztcbi8qKlxuICogQ29tbWVudHMgbm90IHN0YXJ0ZWQgd2l0aCA8IS0tLCBsaWtlIDwveywgY2FuIGJlIGVuZGVkIGJ5IGEgc2luZ2xlIGA+YFxuICovXG5jb25zdCBjb21tZW50MkVuZFJlZ2V4ID0gLz4vZztcbi8qKlxuICogVGhlIHRhZ0VuZCByZWdleCBtYXRjaGVzIHRoZSBlbmQgb2YgdGhlIFwiaW5zaWRlIGFuIG9wZW5pbmdcIiB0YWcgc3ludGF4XG4gKiBwb3NpdGlvbi4gSXQgZWl0aGVyIG1hdGNoZXMgYSBgPmAsIGFuIGF0dHJpYnV0ZS1saWtlIHNlcXVlbmNlLCBvciB0aGUgZW5kXG4gKiBvZiB0aGUgc3RyaW5nIGFmdGVyIGEgc3BhY2UgKGF0dHJpYnV0ZS1uYW1lIHBvc2l0aW9uIGVuZGluZykuXG4gKlxuICogU2VlIGF0dHJpYnV0ZXMgaW4gdGhlIEhUTUwgc3BlYzpcbiAqIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCNlbGVtZW50cy1hdHRyaWJ1dGVzXG4gKlxuICogXCIgXFx0XFxuXFxmXFxyXCIgYXJlIEhUTUwgc3BhY2UgY2hhcmFjdGVyczpcbiAqIGh0dHBzOi8vaW5mcmEuc3BlYy53aGF0d2cub3JnLyNhc2NpaS13aGl0ZXNwYWNlXG4gKlxuICogU28gYW4gYXR0cmlidXRlIGlzOlxuICogICogVGhlIG5hbWU6IGFueSBjaGFyYWN0ZXIgZXhjZXB0IGEgd2hpdGVzcGFjZSBjaGFyYWN0ZXIsIChcIiksICgnKSwgXCI+XCIsXG4gKiAgICBcIj1cIiwgb3IgXCIvXCIuIE5vdGU6IHRoaXMgaXMgZGlmZmVyZW50IGZyb20gdGhlIEhUTUwgc3BlYyB3aGljaCBhbHNvIGV4Y2x1ZGVzIGNvbnRyb2wgY2hhcmFjdGVycy5cbiAqICAqIEZvbGxvd2VkIGJ5IHplcm8gb3IgbW9yZSBzcGFjZSBjaGFyYWN0ZXJzXG4gKiAgKiBGb2xsb3dlZCBieSBcIj1cIlxuICogICogRm9sbG93ZWQgYnkgemVybyBvciBtb3JlIHNwYWNlIGNoYXJhY3RlcnNcbiAqICAqIEZvbGxvd2VkIGJ5OlxuICogICAgKiBBbnkgY2hhcmFjdGVyIGV4Y2VwdCBzcGFjZSwgKCcpLCAoXCIpLCBcIjxcIiwgXCI+XCIsIFwiPVwiLCAoYCksIG9yXG4gKiAgICAqIChcIikgdGhlbiBhbnkgbm9uLShcIiksIG9yXG4gKiAgICAqICgnKSB0aGVuIGFueSBub24tKCcpXG4gKi9cbmNvbnN0IHRhZ0VuZFJlZ2V4ID0gbmV3IFJlZ0V4cChgPnwke1NQQUNFX0NIQVJ9KD86KCR7TkFNRV9DSEFSfSspKCR7U1BBQ0VfQ0hBUn0qPSR7U1BBQ0VfQ0hBUn0qKD86JHtBVFRSX1ZBTFVFX0NIQVJ9fChcInwnKXwpKXwkKWAsICdnJyk7XG5jb25zdCBFTlRJUkVfTUFUQ0ggPSAwO1xuY29uc3QgQVRUUklCVVRFX05BTUUgPSAxO1xuY29uc3QgU1BBQ0VTX0FORF9FUVVBTFMgPSAyO1xuY29uc3QgUVVPVEVfQ0hBUiA9IDM7XG5jb25zdCBzaW5nbGVRdW90ZUF0dHJFbmRSZWdleCA9IC8nL2c7XG5jb25zdCBkb3VibGVRdW90ZUF0dHJFbmRSZWdleCA9IC9cIi9nO1xuLyoqXG4gKiBNYXRjaGVzIHRoZSByYXcgdGV4dCBlbGVtZW50cy5cbiAqXG4gKiBDb21tZW50cyBhcmUgbm90IHBhcnNlZCB3aXRoaW4gcmF3IHRleHQgZWxlbWVudHMsIHNvIHdlIG5lZWQgdG8gc2VhcmNoIHRoZWlyXG4gKiB0ZXh0IGNvbnRlbnQgZm9yIG1hcmtlciBzdHJpbmdzLlxuICovXG5jb25zdCByYXdUZXh0RWxlbWVudCA9IC9eKD86c2NyaXB0fHN0eWxlfHRleHRhcmVhfHRpdGxlKSQvaTtcbi8qKiBUZW1wbGF0ZVJlc3VsdCB0eXBlcyAqL1xuY29uc3QgSFRNTF9SRVNVTFQgPSAxO1xuY29uc3QgU1ZHX1JFU1VMVCA9IDI7XG4vLyBUZW1wbGF0ZVBhcnQgdHlwZXNcbi8vIElNUE9SVEFOVDogdGhlc2UgbXVzdCBtYXRjaCB0aGUgdmFsdWVzIGluIFBhcnRUeXBlXG5jb25zdCBBVFRSSUJVVEVfUEFSVCA9IDE7XG5jb25zdCBDSElMRF9QQVJUID0gMjtcbmNvbnN0IFBST1BFUlRZX1BBUlQgPSAzO1xuY29uc3QgQk9PTEVBTl9BVFRSSUJVVEVfUEFSVCA9IDQ7XG5jb25zdCBFVkVOVF9QQVJUID0gNTtcbmNvbnN0IEVMRU1FTlRfUEFSVCA9IDY7XG5jb25zdCBDT01NRU5UX1BBUlQgPSA3O1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSB0ZW1wbGF0ZSBsaXRlcmFsIHRhZyBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBUZW1wbGF0ZVJlc3VsdCB3aXRoXG4gKiB0aGUgZ2l2ZW4gcmVzdWx0IHR5cGUuXG4gKi9cbmNvbnN0IHRhZyA9ICh0eXBlKSA9PiAoc3RyaW5ncywgLi4udmFsdWVzKSA9PiB7XG4gICAgLy8gV2FybiBhZ2FpbnN0IHRlbXBsYXRlcyBvY3RhbCBlc2NhcGUgc2VxdWVuY2VzXG4gICAgLy8gV2UgZG8gdGhpcyBoZXJlIHJhdGhlciB0aGFuIGluIHJlbmRlciBzbyB0aGF0IHRoZSB3YXJuaW5nIGlzIGNsb3NlciB0byB0aGVcbiAgICAvLyB0ZW1wbGF0ZSBkZWZpbml0aW9uLlxuICAgIGlmIChERVZfTU9ERSAmJiBzdHJpbmdzLnNvbWUoKHMpID0+IHMgPT09IHVuZGVmaW5lZCkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdTb21lIHRlbXBsYXRlIHN0cmluZ3MgYXJlIHVuZGVmaW5lZC5cXG4nICtcbiAgICAgICAgICAgICdUaGlzIGlzIHByb2JhYmx5IGNhdXNlZCBieSBpbGxlZ2FsIG9jdGFsIGVzY2FwZSBzZXF1ZW5jZXMuJyk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgICAgIFsnXyRsaXRUeXBlJCddOiB0eXBlLFxuICAgICAgICBzdHJpbmdzLFxuICAgICAgICB2YWx1ZXMsXG4gICAgfTtcbn07XG4vKipcbiAqIEludGVycHJldHMgYSB0ZW1wbGF0ZSBsaXRlcmFsIGFzIGFuIEhUTUwgdGVtcGxhdGUgdGhhdCBjYW4gZWZmaWNpZW50bHlcbiAqIHJlbmRlciB0byBhbmQgdXBkYXRlIGEgY29udGFpbmVyLlxuICpcbiAqIGBgYHRzXG4gKiBjb25zdCBoZWFkZXIgPSAodGl0bGU6IHN0cmluZykgPT4gaHRtbGA8aDE+JHt0aXRsZX08L2gxPmA7XG4gKiBgYGBcbiAqXG4gKiBUaGUgYGh0bWxgIHRhZyByZXR1cm5zIGEgZGVzY3JpcHRpb24gb2YgdGhlIERPTSB0byByZW5kZXIgYXMgYSB2YWx1ZS4gSXQgaXNcbiAqIGxhenksIG1lYW5pbmcgbm8gd29yayBpcyBkb25lIHVudGlsIHRoZSB0ZW1wbGF0ZSBpcyByZW5kZXJlZC4gV2hlbiByZW5kZXJpbmcsXG4gKiBpZiBhIHRlbXBsYXRlIGNvbWVzIGZyb20gdGhlIHNhbWUgZXhwcmVzc2lvbiBhcyBhIHByZXZpb3VzbHkgcmVuZGVyZWQgcmVzdWx0LFxuICogaXQncyBlZmZpY2llbnRseSB1cGRhdGVkIGluc3RlYWQgb2YgcmVwbGFjZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBodG1sID0gdGFnKEhUTUxfUkVTVUxUKTtcbi8qKlxuICogSW50ZXJwcmV0cyBhIHRlbXBsYXRlIGxpdGVyYWwgYXMgYW4gU1ZHIGZyYWdtZW50IHRoYXQgY2FuIGVmZmljaWVudGx5XG4gKiByZW5kZXIgdG8gYW5kIHVwZGF0ZSBhIGNvbnRhaW5lci5cbiAqXG4gKiBgYGB0c1xuICogY29uc3QgcmVjdCA9IHN2Z2A8cmVjdCB3aWR0aD1cIjEwXCIgaGVpZ2h0PVwiMTBcIj48L3JlY3Q+YDtcbiAqXG4gKiBjb25zdCBteUltYWdlID0gaHRtbGBcbiAqICAgPHN2ZyB2aWV3Qm94PVwiMCAwIDEwIDEwXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiPlxuICogICAgICR7cmVjdH1cbiAqICAgPC9zdmc+YDtcbiAqIGBgYFxuICpcbiAqIFRoZSBgc3ZnYCAqdGFnIGZ1bmN0aW9uKiBzaG91bGQgb25seSBiZSB1c2VkIGZvciBTVkcgZnJhZ21lbnRzLCBvciBlbGVtZW50c1xuICogdGhhdCB3b3VsZCBiZSBjb250YWluZWQgKippbnNpZGUqKiBhbiBgPHN2Zz5gIEhUTUwgZWxlbWVudC4gQSBjb21tb24gZXJyb3IgaXNcbiAqIHBsYWNpbmcgYW4gYDxzdmc+YCAqZWxlbWVudCogaW4gYSB0ZW1wbGF0ZSB0YWdnZWQgd2l0aCB0aGUgYHN2Z2AgdGFnXG4gKiBmdW5jdGlvbi4gVGhlIGA8c3ZnPmAgZWxlbWVudCBpcyBhbiBIVE1MIGVsZW1lbnQgYW5kIHNob3VsZCBiZSB1c2VkIHdpdGhpbiBhXG4gKiB0ZW1wbGF0ZSB0YWdnZWQgd2l0aCB0aGUge0BsaW5rY29kZSBodG1sfSB0YWcgZnVuY3Rpb24uXG4gKlxuICogSW4gTGl0RWxlbWVudCB1c2FnZSwgaXQncyBpbnZhbGlkIHRvIHJldHVybiBhbiBTVkcgZnJhZ21lbnQgZnJvbSB0aGVcbiAqIGByZW5kZXIoKWAgbWV0aG9kLCBhcyB0aGUgU1ZHIGZyYWdtZW50IHdpbGwgYmUgY29udGFpbmVkIHdpdGhpbiB0aGUgZWxlbWVudCdzXG4gKiBzaGFkb3cgcm9vdCBhbmQgdGh1cyBjYW5ub3QgYmUgdXNlZCB3aXRoaW4gYW4gYDxzdmc+YCBIVE1MIGVsZW1lbnQuXG4gKi9cbmV4cG9ydCBjb25zdCBzdmcgPSB0YWcoU1ZHX1JFU1VMVCk7XG4vKipcbiAqIEEgc2VudGluZWwgdmFsdWUgdGhhdCBzaWduYWxzIHRoYXQgYSB2YWx1ZSB3YXMgaGFuZGxlZCBieSBhIGRpcmVjdGl2ZSBhbmRcbiAqIHNob3VsZCBub3QgYmUgd3JpdHRlbiB0byB0aGUgRE9NLlxuICovXG5leHBvcnQgY29uc3Qgbm9DaGFuZ2UgPSBTeW1ib2wuZm9yKCdsaXQtbm9DaGFuZ2UnKTtcbi8qKlxuICogQSBzZW50aW5lbCB2YWx1ZSB0aGF0IHNpZ25hbHMgYSBDaGlsZFBhcnQgdG8gZnVsbHkgY2xlYXIgaXRzIGNvbnRlbnQuXG4gKlxuICogYGBgdHNcbiAqIGNvbnN0IGJ1dHRvbiA9IGh0bWxgJHtcbiAqICB1c2VyLmlzQWRtaW5cbiAqICAgID8gaHRtbGA8YnV0dG9uPkRFTEVURTwvYnV0dG9uPmBcbiAqICAgIDogbm90aGluZ1xuICogfWA7XG4gKiBgYGBcbiAqXG4gKiBQcmVmZXIgdXNpbmcgYG5vdGhpbmdgIG92ZXIgb3RoZXIgZmFsc3kgdmFsdWVzIGFzIGl0IHByb3ZpZGVzIGEgY29uc2lzdGVudFxuICogYmVoYXZpb3IgYmV0d2VlbiB2YXJpb3VzIGV4cHJlc3Npb24gYmluZGluZyBjb250ZXh0cy5cbiAqXG4gKiBJbiBjaGlsZCBleHByZXNzaW9ucywgYHVuZGVmaW5lZGAsIGBudWxsYCwgYCcnYCwgYW5kIGBub3RoaW5nYCBhbGwgYmVoYXZlIHRoZVxuICogc2FtZSBhbmQgcmVuZGVyIG5vIG5vZGVzLiBJbiBhdHRyaWJ1dGUgZXhwcmVzc2lvbnMsIGBub3RoaW5nYCBfcmVtb3Zlc18gdGhlXG4gKiBhdHRyaWJ1dGUsIHdoaWxlIGB1bmRlZmluZWRgIGFuZCBgbnVsbGAgd2lsbCByZW5kZXIgYW4gZW1wdHkgc3RyaW5nLiBJblxuICogcHJvcGVydHkgZXhwcmVzc2lvbnMgYG5vdGhpbmdgIGJlY29tZXMgYHVuZGVmaW5lZGAuXG4gKi9cbmV4cG9ydCBjb25zdCBub3RoaW5nID0gU3ltYm9sLmZvcignbGl0LW5vdGhpbmcnKTtcbi8qKlxuICogVGhlIGNhY2hlIG9mIHByZXBhcmVkIHRlbXBsYXRlcywga2V5ZWQgYnkgdGhlIHRhZ2dlZCBUZW1wbGF0ZVN0cmluZ3NBcnJheVxuICogYW5kIF9ub3RfIGFjY291bnRpbmcgZm9yIHRoZSBzcGVjaWZpYyB0ZW1wbGF0ZSB0YWcgdXNlZC4gVGhpcyBtZWFucyB0aGF0XG4gKiB0ZW1wbGF0ZSB0YWdzIGNhbm5vdCBiZSBkeW5hbWljIC0gdGhlIG11c3Qgc3RhdGljYWxseSBiZSBvbmUgb2YgaHRtbCwgc3ZnLFxuICogb3IgYXR0ci4gVGhpcyByZXN0cmljdGlvbiBzaW1wbGlmaWVzIHRoZSBjYWNoZSBsb29rdXAsIHdoaWNoIGlzIG9uIHRoZSBob3RcbiAqIHBhdGggZm9yIHJlbmRlcmluZy5cbiAqL1xuY29uc3QgdGVtcGxhdGVDYWNoZSA9IG5ldyBXZWFrTWFwKCk7XG4vKipcbiAqIFJlbmRlcnMgYSB2YWx1ZSwgdXN1YWxseSBhIGxpdC1odG1sIFRlbXBsYXRlUmVzdWx0LCB0byB0aGUgY29udGFpbmVyLlxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gY29udGFpbmVyXG4gKiBAcGFyYW0gb3B0aW9uc1xuICovXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKHZhbHVlLCBjb250YWluZXIsIG9wdGlvbnMpID0+IHtcbiAgICB2YXIgX2EsIF9iLCBfYztcbiAgICBjb25zdCByZW5kZXJJZCA9IERFVl9NT0RFID8gZGVidWdMb2dSZW5kZXJJZCsrIDogMDtcbiAgICBjb25zdCBwYXJ0T3duZXJOb2RlID0gKF9hID0gb3B0aW9ucyA9PT0gbnVsbCB8fCBvcHRpb25zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBvcHRpb25zLnJlbmRlckJlZm9yZSkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogY29udGFpbmVyO1xuICAgIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBsZXQgcGFydCA9IHBhcnRPd25lck5vZGVbJ18kbGl0UGFydCQnXTtcbiAgICBkZWJ1Z0xvZ0V2ZW50ID09PSBudWxsIHx8IGRlYnVnTG9nRXZlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICBraW5kOiAnYmVnaW4gcmVuZGVyJyxcbiAgICAgICAgaWQ6IHJlbmRlcklkLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgY29udGFpbmVyLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICBwYXJ0LFxuICAgIH0pO1xuICAgIGlmIChwYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3QgZW5kTm9kZSA9IChfYiA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5yZW5kZXJCZWZvcmUpICE9PSBudWxsICYmIF9iICE9PSB2b2lkIDAgPyBfYiA6IG51bGw7XG4gICAgICAgIC8vIEludGVybmFsIG1vZGlmaWNhdGlvbjogZG9uJ3QgY2xlYXIgY29udGFpbmVyIHRvIG1hdGNoIGxpdC1odG1sIDIuMFxuICAgICAgICBpZiAoSU5URVJOQUwgJiZcbiAgICAgICAgICAgICgoX2MgPSBvcHRpb25zKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuY2xlYXJDb250YWluZXJGb3JMaXQyTWlncmF0aW9uT25seSkgPT09XG4gICAgICAgICAgICAgICAgdHJ1ZSkge1xuICAgICAgICAgICAgbGV0IG4gPSBjb250YWluZXIuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgIC8vIENsZWFyIG9ubHkgdXAgdG8gdGhlIGBlbmROb2RlYCBha2EgYHJlbmRlckJlZm9yZWAgbm9kZS5cbiAgICAgICAgICAgIHdoaWxlIChuICYmIG4gIT09IGVuZE5vZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXh0ID0gbi5uZXh0U2libGluZztcbiAgICAgICAgICAgICAgICBuLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIG4gPSBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRoaXMgcHJvcGVydHkgbmVlZHMgdG8gcmVtYWluIHVubWluaWZpZWQuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIHBhcnRPd25lck5vZGVbJ18kbGl0UGFydCQnXSA9IHBhcnQgPSBuZXcgQ2hpbGRQYXJ0KGNvbnRhaW5lci5pbnNlcnRCZWZvcmUoY3JlYXRlTWFya2VyKCksIGVuZE5vZGUpLCBlbmROb2RlLCB1bmRlZmluZWQsIG9wdGlvbnMgIT09IG51bGwgJiYgb3B0aW9ucyAhPT0gdm9pZCAwID8gb3B0aW9ucyA6IHt9KTtcbiAgICB9XG4gICAgcGFydC5fJHNldFZhbHVlKHZhbHVlKTtcbiAgICBkZWJ1Z0xvZ0V2ZW50ID09PSBudWxsIHx8IGRlYnVnTG9nRXZlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICBraW5kOiAnZW5kIHJlbmRlcicsXG4gICAgICAgIGlkOiByZW5kZXJJZCxcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIGNvbnRhaW5lcixcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgcGFydCxcbiAgICB9KTtcbiAgICByZXR1cm4gcGFydDtcbn07XG5pZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgcmVuZGVyLnNldFNhbml0aXplciA9IHNldFNhbml0aXplcjtcbiAgICByZW5kZXIuY3JlYXRlU2FuaXRpemVyID0gY3JlYXRlU2FuaXRpemVyO1xuICAgIGlmIChERVZfTU9ERSkge1xuICAgICAgICByZW5kZXIuX3Rlc3RPbmx5Q2xlYXJTYW5pdGl6ZXJGYWN0b3J5RG9Ob3RDYWxsT3JFbHNlID1cbiAgICAgICAgICAgIF90ZXN0T25seUNsZWFyU2FuaXRpemVyRmFjdG9yeURvTm90Q2FsbE9yRWxzZTtcbiAgICB9XG59XG5jb25zdCB3YWxrZXIgPSBkLmNyZWF0ZVRyZWVXYWxrZXIoZCwgMTI5IC8qIE5vZGVGaWx0ZXIuU0hPV197RUxFTUVOVHxDT01NRU5UfSAqLywgbnVsbCwgZmFsc2UpO1xubGV0IHNhbml0aXplckZhY3RvcnlJbnRlcm5hbCA9IG5vb3BTYW5pdGl6ZXI7XG4vKipcbiAqIFJldHVybnMgYW4gSFRNTCBzdHJpbmcgZm9yIHRoZSBnaXZlbiBUZW1wbGF0ZVN0cmluZ3NBcnJheSBhbmQgcmVzdWx0IHR5cGVcbiAqIChIVE1MIG9yIFNWRyksIGFsb25nIHdpdGggdGhlIGNhc2Utc2Vuc2l0aXZlIGJvdW5kIGF0dHJpYnV0ZSBuYW1lcyBpblxuICogdGVtcGxhdGUgb3JkZXIuIFRoZSBIVE1MIGNvbnRhaW5zIGNvbW1lbnQgY29tbWVudCBtYXJrZXJzIGRlbm90aW5nIHRoZVxuICogYENoaWxkUGFydGBzIGFuZCBzdWZmaXhlcyBvbiBib3VuZCBhdHRyaWJ1dGVzIGRlbm90aW5nIHRoZSBgQXR0cmlidXRlUGFydHNgLlxuICpcbiAqIEBwYXJhbSBzdHJpbmdzIHRlbXBsYXRlIHN0cmluZ3MgYXJyYXlcbiAqIEBwYXJhbSB0eXBlIEhUTUwgb3IgU1ZHXG4gKiBAcmV0dXJuIEFycmF5IGNvbnRhaW5pbmcgYFtodG1sLCBhdHRyTmFtZXNdYCAoYXJyYXkgcmV0dXJuZWQgZm9yIHRlcnNlbmVzcyxcbiAqICAgICB0byBhdm9pZCBvYmplY3QgZmllbGRzIHNpbmNlIHRoaXMgY29kZSBpcyBzaGFyZWQgd2l0aCBub24tbWluaWZpZWQgU1NSXG4gKiAgICAgY29kZSlcbiAqL1xuY29uc3QgZ2V0VGVtcGxhdGVIdG1sID0gKHN0cmluZ3MsIHR5cGUpID0+IHtcbiAgICAvLyBJbnNlcnQgbWFrZXJzIGludG8gdGhlIHRlbXBsYXRlIEhUTUwgdG8gcmVwcmVzZW50IHRoZSBwb3NpdGlvbiBvZlxuICAgIC8vIGJpbmRpbmdzLiBUaGUgZm9sbG93aW5nIGNvZGUgc2NhbnMgdGhlIHRlbXBsYXRlIHN0cmluZ3MgdG8gZGV0ZXJtaW5lIHRoZVxuICAgIC8vIHN5bnRhY3RpYyBwb3NpdGlvbiBvZiB0aGUgYmluZGluZ3MuIFRoZXkgY2FuIGJlIGluIHRleHQgcG9zaXRpb24sIHdoZXJlXG4gICAgLy8gd2UgaW5zZXJ0IGFuIEhUTUwgY29tbWVudCwgYXR0cmlidXRlIHZhbHVlIHBvc2l0aW9uLCB3aGVyZSB3ZSBpbnNlcnQgYVxuICAgIC8vIHNlbnRpbmVsIHN0cmluZyBhbmQgcmUtd3JpdGUgdGhlIGF0dHJpYnV0ZSBuYW1lLCBvciBpbnNpZGUgYSB0YWcgd2hlcmVcbiAgICAvLyB3ZSBpbnNlcnQgdGhlIHNlbnRpbmVsIHN0cmluZy5cbiAgICBjb25zdCBsID0gc3RyaW5ncy5sZW5ndGggLSAxO1xuICAgIC8vIFN0b3JlcyB0aGUgY2FzZS1zZW5zaXRpdmUgYm91bmQgYXR0cmlidXRlIG5hbWVzIGluIHRoZSBvcmRlciBvZiB0aGVpclxuICAgIC8vIHBhcnRzLiBFbGVtZW50UGFydHMgYXJlIGFsc28gcmVmbGVjdGVkIGluIHRoaXMgYXJyYXkgYXMgdW5kZWZpbmVkXG4gICAgLy8gcmF0aGVyIHRoYW4gYSBzdHJpbmcsIHRvIGRpc2FtYmlndWF0ZSBmcm9tIGF0dHJpYnV0ZSBiaW5kaW5ncy5cbiAgICBjb25zdCBhdHRyTmFtZXMgPSBbXTtcbiAgICBsZXQgaHRtbCA9IHR5cGUgPT09IFNWR19SRVNVTFQgPyAnPHN2Zz4nIDogJyc7XG4gICAgLy8gV2hlbiB3ZSdyZSBpbnNpZGUgYSByYXcgdGV4dCB0YWcgKG5vdCBpdCdzIHRleHQgY29udGVudCksIHRoZSByZWdleFxuICAgIC8vIHdpbGwgc3RpbGwgYmUgdGFnUmVnZXggc28gd2UgY2FuIGZpbmQgYXR0cmlidXRlcywgYnV0IHdpbGwgc3dpdGNoIHRvXG4gICAgLy8gdGhpcyByZWdleCB3aGVuIHRoZSB0YWcgZW5kcy5cbiAgICBsZXQgcmF3VGV4dEVuZFJlZ2V4O1xuICAgIC8vIFRoZSBjdXJyZW50IHBhcnNpbmcgc3RhdGUsIHJlcHJlc2VudGVkIGFzIGEgcmVmZXJlbmNlIHRvIG9uZSBvZiB0aGVcbiAgICAvLyByZWdleGVzXG4gICAgbGV0IHJlZ2V4ID0gdGV4dEVuZFJlZ2V4O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHMgPSBzdHJpbmdzW2ldO1xuICAgICAgICAvLyBUaGUgaW5kZXggb2YgdGhlIGVuZCBvZiB0aGUgbGFzdCBhdHRyaWJ1dGUgbmFtZS4gV2hlbiB0aGlzIGlzXG4gICAgICAgIC8vIHBvc2l0aXZlIGF0IGVuZCBvZiBhIHN0cmluZywgaXQgbWVhbnMgd2UncmUgaW4gYW4gYXR0cmlidXRlIHZhbHVlXG4gICAgICAgIC8vIHBvc2l0aW9uIGFuZCBuZWVkIHRvIHJld3JpdGUgdGhlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAgICAvLyBXZSBhbHNvIHVzZSBhIHNwZWNpYWwgdmFsdWUgb2YgLTIgdG8gaW5kaWNhdGUgdGhhdCB3ZSBlbmNvdW50ZXJlZFxuICAgICAgICAvLyB0aGUgZW5kIG9mIGEgc3RyaW5nIGluIGF0dHJpYnV0ZSBuYW1lIHBvc2l0aW9uLlxuICAgICAgICBsZXQgYXR0ck5hbWVFbmRJbmRleCA9IC0xO1xuICAgICAgICBsZXQgYXR0ck5hbWU7XG4gICAgICAgIGxldCBsYXN0SW5kZXggPSAwO1xuICAgICAgICBsZXQgbWF0Y2g7XG4gICAgICAgIC8vIFRoZSBjb25kaXRpb25zIGluIHRoaXMgbG9vcCBoYW5kbGUgdGhlIGN1cnJlbnQgcGFyc2Ugc3RhdGUsIGFuZCB0aGVcbiAgICAgICAgLy8gYXNzaWdubWVudHMgdG8gdGhlIGByZWdleGAgdmFyaWFibGUgYXJlIHRoZSBzdGF0ZSB0cmFuc2l0aW9ucy5cbiAgICAgICAgd2hpbGUgKGxhc3RJbmRleCA8IHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgd2Ugc3RhcnQgc2VhcmNoaW5nIGZyb20gd2hlcmUgd2UgcHJldmlvdXNseSBsZWZ0IG9mZlxuICAgICAgICAgICAgcmVnZXgubGFzdEluZGV4ID0gbGFzdEluZGV4O1xuICAgICAgICAgICAgbWF0Y2ggPSByZWdleC5leGVjKHMpO1xuICAgICAgICAgICAgaWYgKG1hdGNoID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0SW5kZXggPSByZWdleC5sYXN0SW5kZXg7XG4gICAgICAgICAgICBpZiAocmVnZXggPT09IHRleHRFbmRSZWdleCkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFtDT01NRU5UX1NUQVJUXSA9PT0gJyEtLScpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPSBjb21tZW50RW5kUmVnZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1hdGNoW0NPTU1FTlRfU1RBUlRdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2Ugc3RhcnRlZCBhIHdlaXJkIGNvbW1lbnQsIGxpa2UgPC97XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4ID0gY29tbWVudDJFbmRSZWdleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWF0Y2hbVEFHX05BTUVdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhd1RleHRFbGVtZW50LnRlc3QobWF0Y2hbVEFHX05BTUVdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVjb3JkIGlmIHdlIGVuY291bnRlciBhIHJhdy10ZXh0IGVsZW1lbnQuIFdlJ2xsIHN3aXRjaCB0b1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyByZWdleCBhdCB0aGUgZW5kIG9mIHRoZSB0YWcuXG4gICAgICAgICAgICAgICAgICAgICAgICByYXdUZXh0RW5kUmVnZXggPSBuZXcgUmVnRXhwKGA8LyR7bWF0Y2hbVEFHX05BTUVdfWAsICdnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPSB0YWdFbmRSZWdleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWF0Y2hbRFlOQU1JQ19UQUdfTkFNRV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoREVWX01PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQmluZGluZ3MgaW4gdGFnIG5hbWVzIGFyZSBub3Qgc3VwcG9ydGVkLiBQbGVhc2UgdXNlIHN0YXRpYyB0ZW1wbGF0ZXMgaW5zdGVhZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1NlZSBodHRwczovL2xpdC5kZXYvZG9jcy90ZW1wbGF0ZXMvZXhwcmVzc2lvbnMvI3N0YXRpYy1leHByZXNzaW9ucycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4ID0gdGFnRW5kUmVnZXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmVnZXggPT09IHRhZ0VuZFJlZ2V4KSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoW0VOVElSRV9NQVRDSF0gPT09ICc+Jykge1xuICAgICAgICAgICAgICAgICAgICAvLyBFbmQgb2YgYSB0YWcuIElmIHdlIGhhZCBzdGFydGVkIGEgcmF3LXRleHQgZWxlbWVudCwgdXNlIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVnZXhcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPSByYXdUZXh0RW5kUmVnZXggIT09IG51bGwgJiYgcmF3VGV4dEVuZFJlZ2V4ICE9PSB2b2lkIDAgPyByYXdUZXh0RW5kUmVnZXggOiB0ZXh0RW5kUmVnZXg7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIG1heSBiZSBlbmRpbmcgYW4gdW5xdW90ZWQgYXR0cmlidXRlIHZhbHVlLCBzbyBtYWtlIHN1cmUgd2VcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xlYXIgYW55IHBlbmRpbmcgYXR0ck5hbWVFbmRJbmRleFxuICAgICAgICAgICAgICAgICAgICBhdHRyTmFtZUVuZEluZGV4ID0gLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1hdGNoW0FUVFJJQlVURV9OQU1FXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEF0dHJpYnV0ZSBuYW1lIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICAgIGF0dHJOYW1lRW5kSW5kZXggPSAtMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dHJOYW1lRW5kSW5kZXggPSByZWdleC5sYXN0SW5kZXggLSBtYXRjaFtTUEFDRVNfQU5EX0VRVUFMU10ubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBhdHRyTmFtZSA9IG1hdGNoW0FUVFJJQlVURV9OQU1FXTtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggPVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hbUVVPVEVfQ0hBUl0gPT09IHVuZGVmaW5lZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdGFnRW5kUmVnZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG1hdGNoW1FVT1RFX0NIQVJdID09PSAnXCInXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gZG91YmxlUXVvdGVBdHRyRW5kUmVnZXhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBzaW5nbGVRdW90ZUF0dHJFbmRSZWdleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChyZWdleCA9PT0gZG91YmxlUXVvdGVBdHRyRW5kUmVnZXggfHxcbiAgICAgICAgICAgICAgICByZWdleCA9PT0gc2luZ2xlUXVvdGVBdHRyRW5kUmVnZXgpIHtcbiAgICAgICAgICAgICAgICByZWdleCA9IHRhZ0VuZFJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocmVnZXggPT09IGNvbW1lbnRFbmRSZWdleCB8fCByZWdleCA9PT0gY29tbWVudDJFbmRSZWdleCkge1xuICAgICAgICAgICAgICAgIHJlZ2V4ID0gdGV4dEVuZFJlZ2V4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gTm90IG9uZSBvZiB0aGUgZml2ZSBzdGF0ZSByZWdleGVzLCBzbyBpdCBtdXN0IGJlIHRoZSBkeW5hbWljYWxseVxuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZWQgcmF3IHRleHQgcmVnZXggYW5kIHdlJ3JlIGF0IHRoZSBjbG9zZSBvZiB0aGF0IGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgcmVnZXggPSB0YWdFbmRSZWdleDtcbiAgICAgICAgICAgICAgICByYXdUZXh0RW5kUmVnZXggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAgICAgICAvLyBJZiB3ZSBoYXZlIGEgYXR0ck5hbWVFbmRJbmRleCwgd2hpY2ggaW5kaWNhdGVzIHRoYXQgd2Ugc2hvdWxkXG4gICAgICAgICAgICAvLyByZXdyaXRlIHRoZSBhdHRyaWJ1dGUgbmFtZSwgYXNzZXJ0IHRoYXQgd2UncmUgaW4gYSB2YWxpZCBhdHRyaWJ1dGVcbiAgICAgICAgICAgIC8vIHBvc2l0aW9uIC0gZWl0aGVyIGluIGEgdGFnLCBvciBhIHF1b3RlZCBhdHRyaWJ1dGUgdmFsdWUuXG4gICAgICAgICAgICBjb25zb2xlLmFzc2VydChhdHRyTmFtZUVuZEluZGV4ID09PSAtMSB8fFxuICAgICAgICAgICAgICAgIHJlZ2V4ID09PSB0YWdFbmRSZWdleCB8fFxuICAgICAgICAgICAgICAgIHJlZ2V4ID09PSBzaW5nbGVRdW90ZUF0dHJFbmRSZWdleCB8fFxuICAgICAgICAgICAgICAgIHJlZ2V4ID09PSBkb3VibGVRdW90ZUF0dHJFbmRSZWdleCwgJ3VuZXhwZWN0ZWQgcGFyc2Ugc3RhdGUgQicpO1xuICAgICAgICB9XG4gICAgICAgIC8vIFdlIGhhdmUgZm91ciBjYXNlczpcbiAgICAgICAgLy8gIDEuIFdlJ3JlIGluIHRleHQgcG9zaXRpb24sIGFuZCBub3QgaW4gYSByYXcgdGV4dCBlbGVtZW50XG4gICAgICAgIC8vICAgICAocmVnZXggPT09IHRleHRFbmRSZWdleCk6IGluc2VydCBhIGNvbW1lbnQgbWFya2VyLlxuICAgICAgICAvLyAgMi4gV2UgaGF2ZSBhIG5vbi1uZWdhdGl2ZSBhdHRyTmFtZUVuZEluZGV4IHdoaWNoIG1lYW5zIHdlIG5lZWQgdG9cbiAgICAgICAgLy8gICAgIHJld3JpdGUgdGhlIGF0dHJpYnV0ZSBuYW1lIHRvIGFkZCBhIGJvdW5kIGF0dHJpYnV0ZSBzdWZmaXguXG4gICAgICAgIC8vICAzLiBXZSdyZSBhdCB0aGUgbm9uLWZpcnN0IGJpbmRpbmcgaW4gYSBtdWx0aS1iaW5kaW5nIGF0dHJpYnV0ZSwgdXNlIGFcbiAgICAgICAgLy8gICAgIHBsYWluIG1hcmtlci5cbiAgICAgICAgLy8gIDQuIFdlJ3JlIHNvbWV3aGVyZSBlbHNlIGluc2lkZSB0aGUgdGFnLiBJZiB3ZSdyZSBpbiBhdHRyaWJ1dGUgbmFtZVxuICAgICAgICAvLyAgICAgcG9zaXRpb24gKGF0dHJOYW1lRW5kSW5kZXggPT09IC0yKSwgYWRkIGEgc2VxdWVudGlhbCBzdWZmaXggdG9cbiAgICAgICAgLy8gICAgIGdlbmVyYXRlIGEgdW5pcXVlIGF0dHJpYnV0ZSBuYW1lLlxuICAgICAgICAvLyBEZXRlY3QgYSBiaW5kaW5nIG5leHQgdG8gc2VsZi1jbG9zaW5nIHRhZyBlbmQgYW5kIGluc2VydCBhIHNwYWNlIHRvXG4gICAgICAgIC8vIHNlcGFyYXRlIHRoZSBtYXJrZXIgZnJvbSB0aGUgdGFnIGVuZDpcbiAgICAgICAgY29uc3QgZW5kID0gcmVnZXggPT09IHRhZ0VuZFJlZ2V4ICYmIHN0cmluZ3NbaSArIDFdLnN0YXJ0c1dpdGgoJy8+JykgPyAnICcgOiAnJztcbiAgICAgICAgaHRtbCArPVxuICAgICAgICAgICAgcmVnZXggPT09IHRleHRFbmRSZWdleFxuICAgICAgICAgICAgICAgID8gcyArIG5vZGVNYXJrZXJcbiAgICAgICAgICAgICAgICA6IGF0dHJOYW1lRW5kSW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICAgICA/IChhdHRyTmFtZXMucHVzaChhdHRyTmFtZSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWNlKDAsIGF0dHJOYW1lRW5kSW5kZXgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib3VuZEF0dHJpYnV0ZVN1ZmZpeCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGljZShhdHRyTmFtZUVuZEluZGV4KSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZFxuICAgICAgICAgICAgICAgICAgICA6IHMgK1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFya2VyICtcbiAgICAgICAgICAgICAgICAgICAgICAgIChhdHRyTmFtZUVuZEluZGV4ID09PSAtMiA/IChhdHRyTmFtZXMucHVzaCh1bmRlZmluZWQpLCBpKSA6IGVuZCk7XG4gICAgfVxuICAgIGNvbnN0IGh0bWxSZXN1bHQgPSBodG1sICsgKHN0cmluZ3NbbF0gfHwgJzw/PicpICsgKHR5cGUgPT09IFNWR19SRVNVTFQgPyAnPC9zdmc+JyA6ICcnKTtcbiAgICAvLyBBIHNlY3VyaXR5IGNoZWNrIHRvIHByZXZlbnQgc3Bvb2Zpbmcgb2YgTGl0IHRlbXBsYXRlIHJlc3VsdHMuXG4gICAgLy8gSW4gdGhlIGZ1dHVyZSwgd2UgbWF5IGJlIGFibGUgdG8gcmVwbGFjZSB0aGlzIHdpdGggQXJyYXkuaXNUZW1wbGF0ZU9iamVjdCxcbiAgICAvLyB0aG91Z2ggd2UgbWlnaHQgbmVlZCB0byBtYWtlIHRoYXQgY2hlY2sgaW5zaWRlIG9mIHRoZSBodG1sIGFuZCBzdmdcbiAgICAvLyBmdW5jdGlvbnMsIGJlY2F1c2UgcHJlY29tcGlsZWQgdGVtcGxhdGVzIGRvbid0IGNvbWUgaW4gYXNcbiAgICAvLyBUZW1wbGF0ZVN0cmluZ0FycmF5IG9iamVjdHMuXG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHN0cmluZ3MpIHx8ICFzdHJpbmdzLmhhc093blByb3BlcnR5KCdyYXcnKSkge1xuICAgICAgICBsZXQgbWVzc2FnZSA9ICdpbnZhbGlkIHRlbXBsYXRlIHN0cmluZ3MgYXJyYXknO1xuICAgICAgICBpZiAoREVWX01PREUpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPVxuICAgICAgICAgICAgICAgIGBJbnRlcm5hbCBFcnJvcjogZXhwZWN0ZWQgdGVtcGxhdGUgc3RyaW5ncyB0byBiZSBhbiBhcnJheSBgICtcbiAgICAgICAgICAgICAgICAgICAgYHdpdGggYSAncmF3JyBmaWVsZC4gUGxlYXNlIGZpbGUgYSBidWcgYXQgYCArXG4gICAgICAgICAgICAgICAgICAgIGBodHRwczovL2dpdGh1Yi5jb20vbGl0L2xpdC9pc3N1ZXMvbmV3P3RlbXBsYXRlPWJ1Z19yZXBvcnQubWQgYCArXG4gICAgICAgICAgICAgICAgICAgIGBhbmQgaW5jbHVkZSBpbmZvcm1hdGlvbiBhYm91dCB5b3VyIGJ1aWxkIHRvb2xpbmcsIGlmIGFueS5gO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9XG4gICAgLy8gUmV0dXJuZWQgYXMgYW4gYXJyYXkgZm9yIHRlcnNlbmVzc1xuICAgIHJldHVybiBbXG4gICAgICAgIHBvbGljeSAhPT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IHBvbGljeS5jcmVhdGVIVE1MKGh0bWxSZXN1bHQpXG4gICAgICAgICAgICA6IGh0bWxSZXN1bHQsXG4gICAgICAgIGF0dHJOYW1lcyxcbiAgICBdO1xufTtcbmNsYXNzIFRlbXBsYXRlIHtcbiAgICBjb25zdHJ1Y3RvcihcbiAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgIHsgc3RyaW5ncywgWydfJGxpdFR5cGUkJ106IHR5cGUgfSwgb3B0aW9ucykge1xuICAgICAgICAvKiogQGludGVybmFsICovXG4gICAgICAgIHRoaXMucGFydHMgPSBbXTtcbiAgICAgICAgbGV0IG5vZGU7XG4gICAgICAgIGxldCBub2RlSW5kZXggPSAwO1xuICAgICAgICBsZXQgYXR0ck5hbWVJbmRleCA9IDA7XG4gICAgICAgIGNvbnN0IHBhcnRDb3VudCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICAgICAgY29uc3QgcGFydHMgPSB0aGlzLnBhcnRzO1xuICAgICAgICAvLyBDcmVhdGUgdGVtcGxhdGUgZWxlbWVudFxuICAgICAgICBjb25zdCBbaHRtbCwgYXR0ck5hbWVzXSA9IGdldFRlbXBsYXRlSHRtbChzdHJpbmdzLCB0eXBlKTtcbiAgICAgICAgdGhpcy5lbCA9IFRlbXBsYXRlLmNyZWF0ZUVsZW1lbnQoaHRtbCwgb3B0aW9ucyk7XG4gICAgICAgIHdhbGtlci5jdXJyZW50Tm9kZSA9IHRoaXMuZWwuY29udGVudDtcbiAgICAgICAgLy8gUmVwYXJlbnQgU1ZHIG5vZGVzIGludG8gdGVtcGxhdGUgcm9vdFxuICAgICAgICBpZiAodHlwZSA9PT0gU1ZHX1JFU1VMVCkge1xuICAgICAgICAgICAgY29uc3QgY29udGVudCA9IHRoaXMuZWwuY29udGVudDtcbiAgICAgICAgICAgIGNvbnN0IHN2Z0VsZW1lbnQgPSBjb250ZW50LmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICBzdmdFbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgY29udGVudC5hcHBlbmQoLi4uc3ZnRWxlbWVudC5jaGlsZE5vZGVzKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBXYWxrIHRoZSB0ZW1wbGF0ZSB0byBmaW5kIGJpbmRpbmcgbWFya2VycyBhbmQgY3JlYXRlIFRlbXBsYXRlUGFydHNcbiAgICAgICAgd2hpbGUgKChub2RlID0gd2Fsa2VyLm5leHROb2RlKCkpICE9PSBudWxsICYmIHBhcnRzLmxlbmd0aCA8IHBhcnRDb3VudCkge1xuICAgICAgICAgICAgaWYgKG5vZGUubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBpZiAoREVWX01PREUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFnID0gbm9kZS5sb2NhbE5hbWU7XG4gICAgICAgICAgICAgICAgICAgIC8vIFdhcm4gaWYgYHRleHRhcmVhYCBpbmNsdWRlcyBhbiBleHByZXNzaW9uIGFuZCB0aHJvdyBpZiBgdGVtcGxhdGVgXG4gICAgICAgICAgICAgICAgICAgIC8vIGRvZXMgc2luY2UgdGhlc2UgYXJlIG5vdCBzdXBwb3J0ZWQuIFdlIGRvIHRoaXMgYnkgY2hlY2tpbmdcbiAgICAgICAgICAgICAgICAgICAgLy8gaW5uZXJIVE1MIGZvciBhbnl0aGluZyB0aGF0IGxvb2tzIGxpa2UgYSBtYXJrZXIuIFRoaXMgY2F0Y2hlc1xuICAgICAgICAgICAgICAgICAgICAvLyBjYXNlcyBsaWtlIGJpbmRpbmdzIGluIHRleHRhcmVhIHRoZXJlIG1hcmtlcnMgdHVybiBpbnRvIHRleHQgbm9kZXMuXG4gICAgICAgICAgICAgICAgICAgIGlmICgvXig/OnRleHRhcmVhfHRlbXBsYXRlKSQvaS50ZXN0KHRhZykgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuaW5uZXJIVE1MLmluY2x1ZGVzKG1hcmtlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG0gPSBgRXhwcmVzc2lvbnMgYXJlIG5vdCBzdXBwb3J0ZWQgaW5zaWRlIFxcYCR7dGFnfVxcYCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgZWxlbWVudHMuIFNlZSBodHRwczovL2xpdC5kZXYvbXNnL2V4cHJlc3Npb24taW4tJHt0YWd9IGZvciBtb3JlIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBpbmZvcm1hdGlvbi5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRhZyA9PT0gJ3RlbXBsYXRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc3N1ZVdhcm5pbmcoJycsIG0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFRPRE8gKGp1c3RpbmZhZ25hbmkpOiBmb3IgYXR0ZW1wdGVkIGR5bmFtaWMgdGFnIG5hbWVzLCB3ZSBkb24ndFxuICAgICAgICAgICAgICAgIC8vIGluY3JlbWVudCB0aGUgYmluZGluZ0luZGV4LCBhbmQgaXQnbGwgYmUgb2ZmIGJ5IDEgaW4gdGhlIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBhbmQgb2ZmIGJ5IHR3byBhZnRlciBpdC5cbiAgICAgICAgICAgICAgICBpZiAobm9kZS5oYXNBdHRyaWJ1dGVzKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZGVmZXIgcmVtb3ZpbmcgYm91bmQgYXR0cmlidXRlcyBiZWNhdXNlIG9uIElFIHdlIG1pZ2h0IG5vdCBiZVxuICAgICAgICAgICAgICAgICAgICAvLyBpdGVyYXRpbmcgYXR0cmlidXRlcyBpbiB0aGVpciB0ZW1wbGF0ZSBvcmRlciwgYW5kIHdvdWxkIHNvbWV0aW1lc1xuICAgICAgICAgICAgICAgICAgICAvLyByZW1vdmUgYW4gYXR0cmlidXRlIHRoYXQgd2Ugc3RpbGwgbmVlZCB0byBjcmVhdGUgYSBwYXJ0IGZvci5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYXR0cnNUb1JlbW92ZSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IG5hbWUgb2Ygbm9kZS5nZXRBdHRyaWJ1dGVOYW1lcygpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBgbmFtZWAgaXMgdGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB3ZSdyZSBpdGVyYXRpbmcgb3ZlciwgYnV0IG5vdFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gX25lY2Nlc3NhcmlseV8gdGhlIG5hbWUgb2YgdGhlIGF0dHJpYnV0ZSB3ZSB3aWxsIGNyZWF0ZSBhIHBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvci4gVGhleSBjYW4gYmUgZGlmZmVyZW50IGluIGJyb3dzZXJzIHRoYXQgZG9uJ3QgaXRlcmF0ZSBvblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYXR0cmlidXRlcyBpbiBzb3VyY2Ugb3JkZXIuIEluIHRoYXQgY2FzZSB0aGUgYXR0ck5hbWVzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb250YWlucyB0aGUgYXR0cmlidXRlIG5hbWUgd2UnbGwgcHJvY2VzcyBuZXh0LiBXZSBvbmx5IG5lZWQgdGhlXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhdHRyaWJ1dGUgbmFtZSBoZXJlIHRvIGtub3cgaWYgd2Ugc2hvdWxkIHByb2Nlc3MgYSBib3VuZCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoaXMgZWxlbWVudC5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuYW1lLmVuZHNXaXRoKGJvdW5kQXR0cmlidXRlU3VmZml4KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUuc3RhcnRzV2l0aChtYXJrZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhbE5hbWUgPSBhdHRyTmFtZXNbYXR0ck5hbWVJbmRleCsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdHRyc1RvUmVtb3ZlLnB1c2gobmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlYWxOYW1lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG93ZXJjYXNlIGZvciBjYXNlLXNlbnNpdGl2ZSBTVkcgYXR0cmlidXRlcyBsaWtlIHZpZXdCb3hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBub2RlLmdldEF0dHJpYnV0ZShyZWFsTmFtZS50b0xvd2VyQ2FzZSgpICsgYm91bmRBdHRyaWJ1dGVTdWZmaXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0aWNzID0gdmFsdWUuc3BsaXQobWFya2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbSA9IC8oWy4/QF0pPyguKikvLmV4ZWMocmVhbE5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJ0cy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IEFUVFJJQlVURV9QQVJULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IG5vZGVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IG1bMl0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpbmdzOiBzdGF0aWNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3RvcjogbVsxXSA9PT0gJy4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBQcm9wZXJ0eVBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG1bMV0gPT09ICc/J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEJvb2xlYW5BdHRyaWJ1dGVQYXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogbVsxXSA9PT0gJ0AnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IEV2ZW50UGFydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBBdHRyaWJ1dGVQYXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogRUxFTUVOVF9QQVJULFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IG5vZGVJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZvciAoY29uc3QgbmFtZSBvZiBhdHRyc1RvUmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogYmVuY2htYXJrIHRoZSByZWdleCBhZ2FpbnN0IHRlc3RpbmcgZm9yIGVhY2hcbiAgICAgICAgICAgICAgICAvLyBvZiB0aGUgMyByYXcgdGV4dCBlbGVtZW50IG5hbWVzLlxuICAgICAgICAgICAgICAgIGlmIChyYXdUZXh0RWxlbWVudC50ZXN0KG5vZGUudGFnTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gRm9yIHJhdyB0ZXh0IGVsZW1lbnRzIHdlIG5lZWQgdG8gc3BsaXQgdGhlIHRleHQgY29udGVudCBvblxuICAgICAgICAgICAgICAgICAgICAvLyBtYXJrZXJzLCBjcmVhdGUgYSBUZXh0IG5vZGUgZm9yIGVhY2ggc2VnbWVudCwgYW5kIGNyZWF0ZVxuICAgICAgICAgICAgICAgICAgICAvLyBhIFRlbXBsYXRlUGFydCBmb3IgZWFjaCBtYXJrZXIuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0cmluZ3MgPSBub2RlLnRleHRDb250ZW50LnNwbGl0KG1hcmtlcik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxhc3RJbmRleCA9IHN0cmluZ3MubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3RJbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUudGV4dENvbnRlbnQgPSB0cnVzdGVkVHlwZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRydXN0ZWRUeXBlcy5lbXB0eVNjcmlwdFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBHZW5lcmF0ZSBhIG5ldyB0ZXh0IG5vZGUgZm9yIGVhY2ggbGl0ZXJhbCBzZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGVzZSBub2RlcyBhcmUgYWxzbyB1c2VkIGFzIHRoZSBtYXJrZXJzIGZvciBub2RlIHBhcnRzXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCB1c2UgZW1wdHkgdGV4dCBub2RlcyBhcyBtYXJrZXJzIGJlY2F1c2UgdGhleSdyZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm9ybWFsaXplZCB3aGVuIGNsb25pbmcgaW4gSUUgKGNvdWxkIHNpbXBsaWZ5IHdoZW5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIElFIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQpXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxhc3RJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hcHBlbmQoc3RyaW5nc1tpXSwgY3JlYXRlTWFya2VyKCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdhbGsgcGFzdCB0aGUgbWFya2VyIG5vZGUgd2UganVzdCBhZGRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdhbGtlci5uZXh0Tm9kZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goeyB0eXBlOiBDSElMRF9QQVJULCBpbmRleDogKytub2RlSW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBOb3RlIGJlY2F1c2UgdGhpcyBtYXJrZXIgaXMgYWRkZWQgYWZ0ZXIgdGhlIHdhbGtlcidzIGN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vZGUsIGl0IHdpbGwgYmUgd2Fsa2VkIHRvIGluIHRoZSBvdXRlciBsb29wIChhbmQgaWdub3JlZCksIHNvXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSBkb24ndCBuZWVkIHRvIGFkanVzdCBub2RlSW5kZXggaGVyZVxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5hcHBlbmQoc3RyaW5nc1tsYXN0SW5kZXhdLCBjcmVhdGVNYXJrZXIoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChub2RlLm5vZGVUeXBlID09PSA4KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IG5vZGUuZGF0YTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PT0gbWFya2VyTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydHMucHVzaCh7IHR5cGU6IENISUxEX1BBUlQsIGluZGV4OiBub2RlSW5kZXggfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaSA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKGkgPSBub2RlLmRhdGEuaW5kZXhPZihtYXJrZXIsIGkgKyAxKSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBDb21tZW50IG5vZGUgaGFzIGEgYmluZGluZyBtYXJrZXIgaW5zaWRlLCBtYWtlIGFuIGluYWN0aXZlIHBhcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZSBiaW5kaW5nIHdvbid0IHdvcmssIGJ1dCBzdWJzZXF1ZW50IGJpbmRpbmdzIHdpbGxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnRzLnB1c2goeyB0eXBlOiBDT01NRU5UX1BBUlQsIGluZGV4OiBub2RlSW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIHRvIHRoZSBlbmQgb2YgdGhlIG1hdGNoXG4gICAgICAgICAgICAgICAgICAgICAgICBpICs9IG1hcmtlci5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZUluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgZGVidWdMb2dFdmVudCA9PT0gbnVsbCB8fCBkZWJ1Z0xvZ0V2ZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBwcmVwJyxcbiAgICAgICAgICAgIHRlbXBsYXRlOiB0aGlzLFxuICAgICAgICAgICAgY2xvbmFibGVUZW1wbGF0ZTogdGhpcy5lbCxcbiAgICAgICAgICAgIHBhcnRzOiB0aGlzLnBhcnRzLFxuICAgICAgICAgICAgc3RyaW5ncyxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIE92ZXJyaWRkZW4gdmlhIGBsaXRIdG1sUG9seWZpbGxTdXBwb3J0YCB0byBwcm92aWRlIHBsYXRmb3JtIHN1cHBvcnQuXG4gICAgLyoqIEBub2NvbGxhcHNlICovXG4gICAgc3RhdGljIGNyZWF0ZUVsZW1lbnQoaHRtbCwgX29wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgZWwgPSBkLmNyZWF0ZUVsZW1lbnQoJ3RlbXBsYXRlJyk7XG4gICAgICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICB9XG59XG5mdW5jdGlvbiByZXNvbHZlRGlyZWN0aXZlKHBhcnQsIHZhbHVlLCBwYXJlbnQgPSBwYXJ0LCBhdHRyaWJ1dGVJbmRleCkge1xuICAgIHZhciBfYSwgX2IsIF9jO1xuICAgIHZhciBfZDtcbiAgICAvLyBCYWlsIGVhcmx5IGlmIHRoZSB2YWx1ZSBpcyBleHBsaWNpdGx5IG5vQ2hhbmdlLiBOb3RlLCB0aGlzIG1lYW5zIGFueVxuICAgIC8vIG5lc3RlZCBkaXJlY3RpdmUgaXMgc3RpbGwgYXR0YWNoZWQgYW5kIGlzIG5vdCBydW4uXG4gICAgaWYgKHZhbHVlID09PSBub0NoYW5nZSkge1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIGxldCBjdXJyZW50RGlyZWN0aXZlID0gYXR0cmlidXRlSW5kZXggIT09IHVuZGVmaW5lZFxuICAgICAgICA/IChfYSA9IHBhcmVudC5fX2RpcmVjdGl2ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYVthdHRyaWJ1dGVJbmRleF1cbiAgICAgICAgOiBwYXJlbnQuX19kaXJlY3RpdmU7XG4gICAgY29uc3QgbmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yID0gaXNQcmltaXRpdmUodmFsdWUpXG4gICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgIDogLy8gVGhpcyBwcm9wZXJ0eSBuZWVkcyB0byByZW1haW4gdW5taW5pZmllZC5cbiAgICAgICAgICAgIHZhbHVlWydfJGxpdERpcmVjdGl2ZSQnXTtcbiAgICBpZiAoKGN1cnJlbnREaXJlY3RpdmUgPT09IG51bGwgfHwgY3VycmVudERpcmVjdGl2ZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogY3VycmVudERpcmVjdGl2ZS5jb25zdHJ1Y3RvcikgIT09IG5leHREaXJlY3RpdmVDb25zdHJ1Y3Rvcikge1xuICAgICAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgICAgICAoX2IgPSBjdXJyZW50RGlyZWN0aXZlID09PSBudWxsIHx8IGN1cnJlbnREaXJlY3RpdmUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGN1cnJlbnREaXJlY3RpdmVbJ18kbm90aWZ5RGlyZWN0aXZlQ29ubmVjdGlvbkNoYW5nZWQnXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmNhbGwoY3VycmVudERpcmVjdGl2ZSwgZmFsc2UpO1xuICAgICAgICBpZiAobmV4dERpcmVjdGl2ZUNvbnN0cnVjdG9yID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGN1cnJlbnREaXJlY3RpdmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50RGlyZWN0aXZlID0gbmV3IG5leHREaXJlY3RpdmVDb25zdHJ1Y3RvcihwYXJ0KTtcbiAgICAgICAgICAgIGN1cnJlbnREaXJlY3RpdmUuXyRpbml0aWFsaXplKHBhcnQsIHBhcmVudCwgYXR0cmlidXRlSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRyaWJ1dGVJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAoKF9jID0gKF9kID0gcGFyZW50KS5fX2RpcmVjdGl2ZXMpICE9PSBudWxsICYmIF9jICE9PSB2b2lkIDAgPyBfYyA6IChfZC5fX2RpcmVjdGl2ZXMgPSBbXSkpW2F0dHJpYnV0ZUluZGV4XSA9XG4gICAgICAgICAgICAgICAgY3VycmVudERpcmVjdGl2ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhcmVudC5fX2RpcmVjdGl2ZSA9IGN1cnJlbnREaXJlY3RpdmU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGN1cnJlbnREaXJlY3RpdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YWx1ZSA9IHJlc29sdmVEaXJlY3RpdmUocGFydCwgY3VycmVudERpcmVjdGl2ZS5fJHJlc29sdmUocGFydCwgdmFsdWUudmFsdWVzKSwgY3VycmVudERpcmVjdGl2ZSwgYXR0cmlidXRlSW5kZXgpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG4vKipcbiAqIEFuIHVwZGF0ZWFibGUgaW5zdGFuY2Ugb2YgYSBUZW1wbGF0ZS4gSG9sZHMgcmVmZXJlbmNlcyB0byB0aGUgUGFydHMgdXNlZCB0b1xuICogdXBkYXRlIHRoZSB0ZW1wbGF0ZSBpbnN0YW5jZS5cbiAqL1xuY2xhc3MgVGVtcGxhdGVJbnN0YW5jZSB7XG4gICAgY29uc3RydWN0b3IodGVtcGxhdGUsIHBhcmVudCkge1xuICAgICAgICAvKiogQGludGVybmFsICovXG4gICAgICAgIHRoaXMuX3BhcnRzID0gW107XG4gICAgICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICAgICAgdGhpcy5fJGRpc2Nvbm5lY3RhYmxlQ2hpbGRyZW4gPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMuXyR0ZW1wbGF0ZSA9IHRlbXBsYXRlO1xuICAgICAgICB0aGlzLl8kcGFyZW50ID0gcGFyZW50O1xuICAgIH1cbiAgICAvLyBDYWxsZWQgYnkgQ2hpbGRQYXJ0IHBhcmVudE5vZGUgZ2V0dGVyXG4gICAgZ2V0IHBhcmVudE5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl8kcGFyZW50LnBhcmVudE5vZGU7XG4gICAgfVxuICAgIC8vIFNlZSBjb21tZW50IGluIERpc2Nvbm5lY3RhYmxlIGludGVyZmFjZSBmb3Igd2h5IHRoaXMgaXMgYSBnZXR0ZXJcbiAgICBnZXQgXyRpc0Nvbm5lY3RlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuXyRwYXJlbnQuXyRpc0Nvbm5lY3RlZDtcbiAgICB9XG4gICAgLy8gVGhpcyBtZXRob2QgaXMgc2VwYXJhdGUgZnJvbSB0aGUgY29uc3RydWN0b3IgYmVjYXVzZSB3ZSBuZWVkIHRvIHJldHVybiBhXG4gICAgLy8gRG9jdW1lbnRGcmFnbWVudCBhbmQgd2UgZG9uJ3Qgd2FudCB0byBob2xkIG9udG8gaXQgd2l0aCBhbiBpbnN0YW5jZSBmaWVsZC5cbiAgICBfY2xvbmUob3B0aW9ucykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGNvbnN0IHsgZWw6IHsgY29udGVudCB9LCBwYXJ0czogcGFydHMsIH0gPSB0aGlzLl8kdGVtcGxhdGU7XG4gICAgICAgIGNvbnN0IGZyYWdtZW50ID0gKChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jcmVhdGlvblNjb3BlKSAhPT0gbnVsbCAmJiBfYSAhPT0gdm9pZCAwID8gX2EgOiBkKS5pbXBvcnROb2RlKGNvbnRlbnQsIHRydWUpO1xuICAgICAgICB3YWxrZXIuY3VycmVudE5vZGUgPSBmcmFnbWVudDtcbiAgICAgICAgbGV0IG5vZGUgPSB3YWxrZXIubmV4dE5vZGUoKTtcbiAgICAgICAgbGV0IG5vZGVJbmRleCA9IDA7XG4gICAgICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgICAgICBsZXQgdGVtcGxhdGVQYXJ0ID0gcGFydHNbMF07XG4gICAgICAgIHdoaWxlICh0ZW1wbGF0ZVBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKG5vZGVJbmRleCA9PT0gdGVtcGxhdGVQYXJ0LmluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IHBhcnQ7XG4gICAgICAgICAgICAgICAgaWYgKHRlbXBsYXRlUGFydC50eXBlID09PSBDSElMRF9QQVJUKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQgPSBuZXcgQ2hpbGRQYXJ0KG5vZGUsIG5vZGUubmV4dFNpYmxpbmcsIHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0ZW1wbGF0ZVBhcnQudHlwZSA9PT0gQVRUUklCVVRFX1BBUlQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydCA9IG5ldyB0ZW1wbGF0ZVBhcnQuY3Rvcihub2RlLCB0ZW1wbGF0ZVBhcnQubmFtZSwgdGVtcGxhdGVQYXJ0LnN0cmluZ3MsIHRoaXMsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0ZW1wbGF0ZVBhcnQudHlwZSA9PT0gRUxFTUVOVF9QQVJUKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQgPSBuZXcgRWxlbWVudFBhcnQobm9kZSwgdGhpcywgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuX3BhcnRzLnB1c2gocGFydCk7XG4gICAgICAgICAgICAgICAgdGVtcGxhdGVQYXJ0ID0gcGFydHNbKytwYXJ0SW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5vZGVJbmRleCAhPT0gKHRlbXBsYXRlUGFydCA9PT0gbnVsbCB8fCB0ZW1wbGF0ZVBhcnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHRlbXBsYXRlUGFydC5pbmRleCkpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gd2Fsa2VyLm5leHROb2RlKCk7XG4gICAgICAgICAgICAgICAgbm9kZUluZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZyYWdtZW50O1xuICAgIH1cbiAgICBfdXBkYXRlKHZhbHVlcykge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiB0aGlzLl9wYXJ0cykge1xuICAgICAgICAgICAgaWYgKHBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRlYnVnTG9nRXZlbnQgPT09IG51bGwgfHwgZGVidWdMb2dFdmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6ICdzZXQgcGFydCcsXG4gICAgICAgICAgICAgICAgICAgIHBhcnQsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZXNbaV0sXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlSW5kZXg6IGksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVJbnN0YW5jZTogdGhpcyxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAocGFydC5zdHJpbmdzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydC5fJHNldFZhbHVlKHZhbHVlcywgcGFydCwgaSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBudW1iZXIgb2YgdmFsdWVzIHRoZSBwYXJ0IGNvbnN1bWVzIGlzIHBhcnQuc3RyaW5ncy5sZW5ndGggLSAxXG4gICAgICAgICAgICAgICAgICAgIC8vIHNpbmNlIHZhbHVlcyBhcmUgaW4gYmV0d2VlbiB0ZW1wbGF0ZSBzcGFucy4gV2UgaW5jcmVtZW50IGkgYnkgMVxuICAgICAgICAgICAgICAgICAgICAvLyBsYXRlciBpbiB0aGUgbG9vcCwgc28gaW5jcmVtZW50IGl0IGJ5IHBhcnQuc3RyaW5ncy5sZW5ndGggLSAyIGhlcmVcbiAgICAgICAgICAgICAgICAgICAgaSArPSBwYXJ0LnN0cmluZ3MubGVuZ3RoIC0gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcnQuXyRzZXRWYWx1ZSh2YWx1ZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIENoaWxkUGFydCB7XG4gICAgY29uc3RydWN0b3Ioc3RhcnROb2RlLCBlbmROb2RlLCBwYXJlbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICB0aGlzLnR5cGUgPSBDSElMRF9QQVJUO1xuICAgICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBub3RoaW5nO1xuICAgICAgICAvLyBUaGUgZm9sbG93aW5nIGZpZWxkcyB3aWxsIGJlIHBhdGNoZWQgb250byBDaGlsZFBhcnRzIHdoZW4gcmVxdWlyZWQgYnlcbiAgICAgICAgLy8gQXN5bmNEaXJlY3RpdmVcbiAgICAgICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgICAgICB0aGlzLl8kZGlzY29ubmVjdGFibGVDaGlsZHJlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fJHN0YXJ0Tm9kZSA9IHN0YXJ0Tm9kZTtcbiAgICAgICAgdGhpcy5fJGVuZE5vZGUgPSBlbmROb2RlO1xuICAgICAgICB0aGlzLl8kcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICAvLyBOb3RlIF9faXNDb25uZWN0ZWQgaXMgb25seSBldmVyIGFjY2Vzc2VkIG9uIFJvb3RQYXJ0cyAoaS5lLiB3aGVuIHRoZXJlIGlzXG4gICAgICAgIC8vIG5vIF8kcGFyZW50KTsgdGhlIHZhbHVlIG9uIGEgbm9uLXJvb3QtcGFydCBpcyBcImRvbid0IGNhcmVcIiwgYnV0IGNoZWNraW5nXG4gICAgICAgIC8vIGZvciBwYXJlbnQgd291bGQgYmUgbW9yZSBjb2RlXG4gICAgICAgIHRoaXMuX19pc0Nvbm5lY3RlZCA9IChfYSA9IG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5pc0Nvbm5lY3RlZCkgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdHJ1ZTtcbiAgICAgICAgaWYgKEVOQUJMRV9FWFRSQV9TRUNVUklUWV9IT09LUykge1xuICAgICAgICAgICAgLy8gRXhwbGljaXRseSBpbml0aWFsaXplIGZvciBjb25zaXN0ZW50IGNsYXNzIHNoYXBlLlxuICAgICAgICAgICAgdGhpcy5fdGV4dFNhbml0aXplciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBTZWUgY29tbWVudCBpbiBEaXNjb25uZWN0YWJsZSBpbnRlcmZhY2UgZm9yIHdoeSB0aGlzIGlzIGEgZ2V0dGVyXG4gICAgZ2V0IF8kaXNDb25uZWN0ZWQoKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIC8vIENoaWxkUGFydHMgdGhhdCBhcmUgbm90IGF0IHRoZSByb290IHNob3VsZCBhbHdheXMgYmUgY3JlYXRlZCB3aXRoIGFcbiAgICAgICAgLy8gcGFyZW50OyBvbmx5IFJvb3RDaGlsZE5vZGUncyB3b24ndCwgc28gdGhleSByZXR1cm4gdGhlIGxvY2FsIGlzQ29ubmVjdGVkXG4gICAgICAgIC8vIHN0YXRlXG4gICAgICAgIHJldHVybiAoX2IgPSAoX2EgPSB0aGlzLl8kcGFyZW50KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuXyRpc0Nvbm5lY3RlZCkgIT09IG51bGwgJiYgX2IgIT09IHZvaWQgMCA/IF9iIDogdGhpcy5fX2lzQ29ubmVjdGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcGFyZW50IG5vZGUgaW50byB3aGljaCB0aGUgcGFydCByZW5kZXJzIGl0cyBjb250ZW50LlxuICAgICAqXG4gICAgICogQSBDaGlsZFBhcnQncyBjb250ZW50IGNvbnNpc3RzIG9mIGEgcmFuZ2Ugb2YgYWRqYWNlbnQgY2hpbGQgbm9kZXMgb2ZcbiAgICAgKiBgLnBhcmVudE5vZGVgLCBwb3NzaWJseSBib3JkZXJlZCBieSAnbWFya2VyIG5vZGVzJyAoYC5zdGFydE5vZGVgIGFuZFxuICAgICAqIGAuZW5kTm9kZWApLlxuICAgICAqXG4gICAgICogLSBJZiBib3RoIGAuc3RhcnROb2RlYCBhbmQgYC5lbmROb2RlYCBhcmUgbm9uLW51bGwsIHRoZW4gdGhlIHBhcnQncyBjb250ZW50XG4gICAgICogY29uc2lzdHMgb2YgYWxsIHNpYmxpbmdzIGJldHdlZW4gYC5zdGFydE5vZGVgIGFuZCBgLmVuZE5vZGVgLCBleGNsdXNpdmVseS5cbiAgICAgKlxuICAgICAqIC0gSWYgYC5zdGFydE5vZGVgIGlzIG5vbi1udWxsIGJ1dCBgLmVuZE5vZGVgIGlzIG51bGwsIHRoZW4gdGhlIHBhcnQnc1xuICAgICAqIGNvbnRlbnQgY29uc2lzdHMgb2YgYWxsIHNpYmxpbmdzIGZvbGxvd2luZyBgLnN0YXJ0Tm9kZWAsIHVwIHRvIGFuZFxuICAgICAqIGluY2x1ZGluZyB0aGUgbGFzdCBjaGlsZCBvZiBgLnBhcmVudE5vZGVgLiBJZiBgLmVuZE5vZGVgIGlzIG5vbi1udWxsLCB0aGVuXG4gICAgICogYC5zdGFydE5vZGVgIHdpbGwgYWx3YXlzIGJlIG5vbi1udWxsLlxuICAgICAqXG4gICAgICogLSBJZiBib3RoIGAuZW5kTm9kZWAgYW5kIGAuc3RhcnROb2RlYCBhcmUgbnVsbCwgdGhlbiB0aGUgcGFydCdzIGNvbnRlbnRcbiAgICAgKiBjb25zaXN0cyBvZiBhbGwgY2hpbGQgbm9kZXMgb2YgYC5wYXJlbnROb2RlYC5cbiAgICAgKi9cbiAgICBnZXQgcGFyZW50Tm9kZSgpIHtcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSB3cmFwKHRoaXMuXyRzdGFydE5vZGUpLnBhcmVudE5vZGU7XG4gICAgICAgIGNvbnN0IHBhcmVudCA9IHRoaXMuXyRwYXJlbnQ7XG4gICAgICAgIGlmIChwYXJlbnQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAgICAgcGFyZW50Tm9kZS5ub2RlVHlwZSA9PT0gMTEgLyogTm9kZS5ET0NVTUVOVF9GUkFHTUVOVCAqLykge1xuICAgICAgICAgICAgLy8gSWYgdGhlIHBhcmVudE5vZGUgaXMgYSBEb2N1bWVudEZyYWdtZW50LCBpdCBtYXkgYmUgYmVjYXVzZSB0aGUgRE9NIGlzXG4gICAgICAgICAgICAvLyBzdGlsbCBpbiB0aGUgY2xvbmVkIGZyYWdtZW50IGR1cmluZyBpbml0aWFsIHJlbmRlcjsgaWYgc28sIGdldCB0aGUgcmVhbFxuICAgICAgICAgICAgLy8gcGFyZW50Tm9kZSB0aGUgcGFydCB3aWxsIGJlIGNvbW1pdHRlZCBpbnRvIGJ5IGFza2luZyB0aGUgcGFyZW50LlxuICAgICAgICAgICAgcGFyZW50Tm9kZSA9IHBhcmVudC5wYXJlbnROb2RlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXJlbnROb2RlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaGUgcGFydCdzIGxlYWRpbmcgbWFya2VyIG5vZGUsIGlmIGFueS4gU2VlIGAucGFyZW50Tm9kZWAgZm9yIG1vcmVcbiAgICAgKiBpbmZvcm1hdGlvbi5cbiAgICAgKi9cbiAgICBnZXQgc3RhcnROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fJHN0YXJ0Tm9kZTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVGhlIHBhcnQncyB0cmFpbGluZyBtYXJrZXIgbm9kZSwgaWYgYW55LiBTZWUgYC5wYXJlbnROb2RlYCBmb3IgbW9yZVxuICAgICAqIGluZm9ybWF0aW9uLlxuICAgICAqL1xuICAgIGdldCBlbmROb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fJGVuZE5vZGU7XG4gICAgfVxuICAgIF8kc2V0VmFsdWUodmFsdWUsIGRpcmVjdGl2ZVBhcmVudCA9IHRoaXMpIHtcbiAgICAgICAgaWYgKERFVl9NT0RFICYmIHRoaXMucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBUaGlzIFxcYENoaWxkUGFydFxcYCBoYXMgbm8gXFxgcGFyZW50Tm9kZVxcYCBhbmQgdGhlcmVmb3JlIGNhbm5vdCBhY2NlcHQgYSB2YWx1ZS4gVGhpcyBsaWtlbHkgbWVhbnMgdGhlIGVsZW1lbnQgY29udGFpbmluZyB0aGUgcGFydCB3YXMgbWFuaXB1bGF0ZWQgaW4gYW4gdW5zdXBwb3J0ZWQgd2F5IG91dHNpZGUgb2YgTGl0J3MgY29udHJvbCBzdWNoIHRoYXQgdGhlIHBhcnQncyBtYXJrZXIgbm9kZXMgd2VyZSBlamVjdGVkIGZyb20gRE9NLiBGb3IgZXhhbXBsZSwgc2V0dGluZyB0aGUgZWxlbWVudCdzIFxcYGlubmVySFRNTFxcYCBvciBcXGB0ZXh0Q29udGVudFxcYCBjYW4gZG8gdGhpcy5gKTtcbiAgICAgICAgfVxuICAgICAgICB2YWx1ZSA9IHJlc29sdmVEaXJlY3RpdmUodGhpcywgdmFsdWUsIGRpcmVjdGl2ZVBhcmVudCk7XG4gICAgICAgIGlmIChpc1ByaW1pdGl2ZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgIC8vIE5vbi1yZW5kZXJpbmcgY2hpbGQgdmFsdWVzLiBJdCdzIGltcG9ydGFudCB0aGF0IHRoZXNlIGRvIG5vdCByZW5kZXJcbiAgICAgICAgICAgIC8vIGVtcHR5IHRleHQgbm9kZXMgdG8gYXZvaWQgaXNzdWVzIHdpdGggcHJldmVudGluZyBkZWZhdWx0IDxzbG90PlxuICAgICAgICAgICAgLy8gZmFsbGJhY2sgY29udGVudC5cbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gbm90aGluZyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl8kY29tbWl0dGVkVmFsdWUgIT09IG5vdGhpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVidWdMb2dFdmVudCA9PT0gbnVsbCB8fCBkZWJ1Z0xvZ0V2ZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgbm90aGluZyB0byBjaGlsZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogdGhpcy5fJHN0YXJ0Tm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZDogdGhpcy5fJGVuZE5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IHRoaXMuXyRwYXJlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl8kY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlID0gbm90aGluZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlICE9PSB0aGlzLl8kY29tbWl0dGVkVmFsdWUgJiYgdmFsdWUgIT09IG5vQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tbWl0VGV4dCh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlWydfJGxpdFR5cGUkJ10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5fY29tbWl0VGVtcGxhdGVSZXN1bHQodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHZhbHVlLm5vZGVUeXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbW1pdE5vZGUodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzSXRlcmFibGUodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21taXRJdGVyYWJsZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBGYWxsYmFjaywgd2lsbCByZW5kZXIgdGhlIHN0cmluZyByZXByZXNlbnRhdGlvblxuICAgICAgICAgICAgdGhpcy5fY29tbWl0VGV4dCh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgX2luc2VydChub2RlLCByZWYgPSB0aGlzLl8kZW5kTm9kZSkge1xuICAgICAgICByZXR1cm4gd3JhcCh3cmFwKHRoaXMuXyRzdGFydE5vZGUpLnBhcmVudE5vZGUpLmluc2VydEJlZm9yZShub2RlLCByZWYpO1xuICAgIH1cbiAgICBfY29tbWl0Tm9kZSh2YWx1ZSkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLl8kY29tbWl0dGVkVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl8kY2xlYXIoKTtcbiAgICAgICAgICAgIGlmIChFTkFCTEVfRVhUUkFfU0VDVVJJVFlfSE9PS1MgJiZcbiAgICAgICAgICAgICAgICBzYW5pdGl6ZXJGYWN0b3J5SW50ZXJuYWwgIT09IG5vb3BTYW5pdGl6ZXIpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBwYXJlbnROb2RlTmFtZSA9IChfYSA9IHRoaXMuXyRzdGFydE5vZGUucGFyZW50Tm9kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm5vZGVOYW1lO1xuICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlTmFtZSA9PT0gJ1NUWUxFJyB8fCBwYXJlbnROb2RlTmFtZSA9PT0gJ1NDUklQVCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1lc3NhZ2UgPSAnRm9yYmlkZGVuJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKERFVl9NT0RFKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50Tm9kZU5hbWUgPT09ICdTVFlMRScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYExpdCBkb2VzIG5vdCBzdXBwb3J0IGJpbmRpbmcgaW5zaWRlIHN0eWxlIG5vZGVzLiBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBUaGlzIGlzIGEgc2VjdXJpdHkgcmlzaywgYXMgc3R5bGUgaW5qZWN0aW9uIGF0dGFja3MgY2FuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYGV4ZmlsdHJhdGUgZGF0YSBhbmQgc3Bvb2YgVUlzLiBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBDb25zaWRlciBpbnN0ZWFkIHVzaW5nIGNzc1xcYC4uLlxcYCBsaXRlcmFscyBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB0byBjb21wb3NlIHN0eWxlcywgYW5kIG1ha2UgZG8gZHluYW1pYyBzdHlsaW5nIHdpdGggYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgY3NzIGN1c3RvbSBwcm9wZXJ0aWVzLCA6OnBhcnRzLCA8c2xvdD5zLCBgICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBhbmQgYnkgbXV0YXRpbmcgdGhlIERPTSByYXRoZXIgdGhhbiBzdHlsZXNoZWV0cy5gO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBMaXQgZG9lcyBub3Qgc3VwcG9ydCBiaW5kaW5nIGluc2lkZSBzY3JpcHQgbm9kZXMuIGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYFRoaXMgaXMgYSBzZWN1cml0eSByaXNrLCBhcyBpdCBjb3VsZCBhbGxvdyBhcmJpdHJhcnkgYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgY29kZSBleGVjdXRpb24uYDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVidWdMb2dFdmVudCA9PT0gbnVsbCB8fCBkZWJ1Z0xvZ0V2ZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgICAgICBraW5kOiAnY29tbWl0IG5vZGUnLFxuICAgICAgICAgICAgICAgIHN0YXJ0OiB0aGlzLl8kc3RhcnROb2RlLFxuICAgICAgICAgICAgICAgIHBhcmVudDogdGhpcy5fJHBhcmVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSB0aGlzLl9pbnNlcnQodmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIF9jb21taXRUZXh0KHZhbHVlKSB7XG4gICAgICAgIC8vIElmIHRoZSBjb21taXR0ZWQgdmFsdWUgaXMgYSBwcmltaXRpdmUgaXQgbWVhbnMgd2UgY2FsbGVkIF9jb21taXRUZXh0IG9uXG4gICAgICAgIC8vIHRoZSBwcmV2aW91cyByZW5kZXIsIGFuZCB3ZSBrbm93IHRoYXQgdGhpcy5fJHN0YXJ0Tm9kZS5uZXh0U2libGluZyBpcyBhXG4gICAgICAgIC8vIFRleHQgbm9kZS4gV2UgY2FuIG5vdyBqdXN0IHJlcGxhY2UgdGhlIHRleHQgY29udGVudCAoLmRhdGEpIG9mIHRoZSBub2RlLlxuICAgICAgICBpZiAodGhpcy5fJGNvbW1pdHRlZFZhbHVlICE9PSBub3RoaW5nICYmXG4gICAgICAgICAgICBpc1ByaW1pdGl2ZSh0aGlzLl8kY29tbWl0dGVkVmFsdWUpKSB7XG4gICAgICAgICAgICBjb25zdCBub2RlID0gd3JhcCh0aGlzLl8kc3RhcnROb2RlKS5uZXh0U2libGluZztcbiAgICAgICAgICAgIGlmIChFTkFCTEVfRVhUUkFfU0VDVVJJVFlfSE9PS1MpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fdGV4dFNhbml0aXplciA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3RleHRTYW5pdGl6ZXIgPSBjcmVhdGVTYW5pdGl6ZXIobm9kZSwgJ2RhdGEnLCAncHJvcGVydHknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl90ZXh0U2FuaXRpemVyKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlYnVnTG9nRXZlbnQgPT09IG51bGwgfHwgZGVidWdMb2dFdmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICAgICAga2luZDogJ2NvbW1pdCB0ZXh0JyxcbiAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbm9kZS5kYXRhID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dE5vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSgnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29tbWl0Tm9kZSh0ZXh0Tm9kZSk7XG4gICAgICAgICAgICAgICAgLy8gV2hlbiBzZXR0aW5nIHRleHQgY29udGVudCwgZm9yIHNlY3VyaXR5IHB1cnBvc2VzIGl0IG1hdHRlcnMgYSBsb3RcbiAgICAgICAgICAgICAgICAvLyB3aGF0IHRoZSBwYXJlbnQgaXMuIEZvciBleGFtcGxlLCA8c3R5bGU+IGFuZCA8c2NyaXB0PiBuZWVkIHRvIGJlXG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlZCB3aXRoIGNhcmUsIHdoaWxlIDxzcGFuPiBkb2VzIG5vdC4gU28gZmlyc3Qgd2UgbmVlZCB0byBwdXQgYVxuICAgICAgICAgICAgICAgIC8vIHRleHQgbm9kZSBpbnRvIHRoZSBkb2N1bWVudCwgdGhlbiB3ZSBjYW4gc2FuaXRpemUgaXRzIGNvbnRlbnQuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX3RleHRTYW5pdGl6ZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl90ZXh0U2FuaXRpemVyID0gY3JlYXRlU2FuaXRpemVyKHRleHROb2RlLCAnZGF0YScsICdwcm9wZXJ0eScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXMuX3RleHRTYW5pdGl6ZXIodmFsdWUpO1xuICAgICAgICAgICAgICAgIGRlYnVnTG9nRXZlbnQgPT09IG51bGwgfHwgZGVidWdMb2dFdmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgdGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IHRleHROb2RlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRleHROb2RlLmRhdGEgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbW1pdE5vZGUoZC5jcmVhdGVUZXh0Tm9kZSh2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIGRlYnVnTG9nRXZlbnQgPT09IG51bGwgfHwgZGVidWdMb2dFdmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgdGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IHdyYXAodGhpcy5fJHN0YXJ0Tm9kZSkubmV4dFNpYmxpbmcsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlID0gdmFsdWU7XG4gICAgfVxuICAgIF9jb21taXRUZW1wbGF0ZVJlc3VsdChyZXN1bHQpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICAvLyBUaGlzIHByb3BlcnR5IG5lZWRzIHRvIHJlbWFpbiB1bm1pbmlmaWVkLlxuICAgICAgICBjb25zdCB7IHZhbHVlcywgWydfJGxpdFR5cGUkJ106IHR5cGUgfSA9IHJlc3VsdDtcbiAgICAgICAgLy8gSWYgJGxpdFR5cGUkIGlzIGEgbnVtYmVyLCByZXN1bHQgaXMgYSBwbGFpbiBUZW1wbGF0ZVJlc3VsdCBhbmQgd2UgZ2V0XG4gICAgICAgIC8vIHRoZSB0ZW1wbGF0ZSBmcm9tIHRoZSB0ZW1wbGF0ZSBjYWNoZS4gSWYgbm90LCByZXN1bHQgaXMgYVxuICAgICAgICAvLyBDb21waWxlZFRlbXBsYXRlUmVzdWx0IGFuZCBfJGxpdFR5cGUkIGlzIGEgQ29tcGlsZWRUZW1wbGF0ZSBhbmQgd2UgbmVlZFxuICAgICAgICAvLyB0byBjcmVhdGUgdGhlIDx0ZW1wbGF0ZT4gZWxlbWVudCB0aGUgZmlyc3QgdGltZSB3ZSBzZWUgaXQuXG4gICAgICAgIGNvbnN0IHRlbXBsYXRlID0gdHlwZW9mIHR5cGUgPT09ICdudW1iZXInXG4gICAgICAgICAgICA/IHRoaXMuXyRnZXRUZW1wbGF0ZShyZXN1bHQpXG4gICAgICAgICAgICA6ICh0eXBlLmVsID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgICAgICAgICAodHlwZS5lbCA9IFRlbXBsYXRlLmNyZWF0ZUVsZW1lbnQodHlwZS5oLCB0aGlzLm9wdGlvbnMpKSxcbiAgICAgICAgICAgICAgICB0eXBlKTtcbiAgICAgICAgaWYgKCgoX2EgPSB0aGlzLl8kY29tbWl0dGVkVmFsdWUpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5fJHRlbXBsYXRlKSA9PT0gdGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGRlYnVnTG9nRXZlbnQgPT09IG51bGwgfHwgZGVidWdMb2dFdmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICAgICAga2luZDogJ3RlbXBsYXRlIHVwZGF0aW5nJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICBpbnN0YW5jZTogdGhpcy5fJGNvbW1pdHRlZFZhbHVlLFxuICAgICAgICAgICAgICAgIHBhcnRzOiB0aGlzLl8kY29tbWl0dGVkVmFsdWUuX3BhcnRzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZS5fdXBkYXRlKHZhbHVlcyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBpbnN0YW5jZSA9IG5ldyBUZW1wbGF0ZUluc3RhbmNlKHRlbXBsYXRlLCB0aGlzKTtcbiAgICAgICAgICAgIGNvbnN0IGZyYWdtZW50ID0gaW5zdGFuY2UuX2Nsb25lKHRoaXMub3B0aW9ucyk7XG4gICAgICAgICAgICBkZWJ1Z0xvZ0V2ZW50ID09PSBudWxsIHx8IGRlYnVnTG9nRXZlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgICAgICAgIGtpbmQ6ICd0ZW1wbGF0ZSBpbnN0YW50aWF0ZWQnLFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlLFxuICAgICAgICAgICAgICAgIGluc3RhbmNlLFxuICAgICAgICAgICAgICAgIHBhcnRzOiBpbnN0YW5jZS5fcGFydHMsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgICAgICAgIGZyYWdtZW50LFxuICAgICAgICAgICAgICAgIHZhbHVlcyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW5zdGFuY2UuX3VwZGF0ZSh2YWx1ZXMpO1xuICAgICAgICAgICAgZGVidWdMb2dFdmVudCA9PT0gbnVsbCB8fCBkZWJ1Z0xvZ0V2ZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgICAgICBraW5kOiAndGVtcGxhdGUgaW5zdGFudGlhdGVkIGFuZCB1cGRhdGVkJyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICBpbnN0YW5jZSxcbiAgICAgICAgICAgICAgICBwYXJ0czogaW5zdGFuY2UuX3BhcnRzLFxuICAgICAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgICAgICAgICBmcmFnbWVudCxcbiAgICAgICAgICAgICAgICB2YWx1ZXMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2NvbW1pdE5vZGUoZnJhZ21lbnQpO1xuICAgICAgICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlID0gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gT3ZlcnJpZGRlbiB2aWEgYGxpdEh0bWxQb2x5ZmlsbFN1cHBvcnRgIHRvIHByb3ZpZGUgcGxhdGZvcm0gc3VwcG9ydC5cbiAgICAvKiogQGludGVybmFsICovXG4gICAgXyRnZXRUZW1wbGF0ZShyZXN1bHQpIHtcbiAgICAgICAgbGV0IHRlbXBsYXRlID0gdGVtcGxhdGVDYWNoZS5nZXQocmVzdWx0LnN0cmluZ3MpO1xuICAgICAgICBpZiAodGVtcGxhdGUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGVtcGxhdGVDYWNoZS5zZXQocmVzdWx0LnN0cmluZ3MsICh0ZW1wbGF0ZSA9IG5ldyBUZW1wbGF0ZShyZXN1bHQpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgICBfY29tbWl0SXRlcmFibGUodmFsdWUpIHtcbiAgICAgICAgLy8gRm9yIGFuIEl0ZXJhYmxlLCB3ZSBjcmVhdGUgYSBuZXcgSW5zdGFuY2VQYXJ0IHBlciBpdGVtLCB0aGVuIHNldCBpdHNcbiAgICAgICAgLy8gdmFsdWUgdG8gdGhlIGl0ZW0uIFRoaXMgaXMgYSBsaXR0bGUgYml0IG9mIG92ZXJoZWFkIGZvciBldmVyeSBpdGVtIGluXG4gICAgICAgIC8vIGFuIEl0ZXJhYmxlLCBidXQgaXQgbGV0cyB1cyByZWN1cnNlIGVhc2lseSBhbmQgZWZmaWNpZW50bHkgdXBkYXRlIEFycmF5c1xuICAgICAgICAvLyBvZiBUZW1wbGF0ZVJlc3VsdHMgdGhhdCB3aWxsIGJlIGNvbW1vbmx5IHJldHVybmVkIGZyb20gZXhwcmVzc2lvbnMgbGlrZTpcbiAgICAgICAgLy8gYXJyYXkubWFwKChpKSA9PiBodG1sYCR7aX1gKSwgYnkgcmV1c2luZyBleGlzdGluZyBUZW1wbGF0ZUluc3RhbmNlcy5cbiAgICAgICAgLy8gSWYgdmFsdWUgaXMgYW4gYXJyYXksIHRoZW4gdGhlIHByZXZpb3VzIHJlbmRlciB3YXMgb2YgYW5cbiAgICAgICAgLy8gaXRlcmFibGUgYW5kIHZhbHVlIHdpbGwgY29udGFpbiB0aGUgQ2hpbGRQYXJ0cyBmcm9tIHRoZSBwcmV2aW91c1xuICAgICAgICAvLyByZW5kZXIuIElmIHZhbHVlIGlzIG5vdCBhbiBhcnJheSwgY2xlYXIgdGhpcyBwYXJ0IGFuZCBtYWtlIGEgbmV3XG4gICAgICAgIC8vIGFycmF5IGZvciBDaGlsZFBhcnRzLlxuICAgICAgICBpZiAoIWlzQXJyYXkodGhpcy5fJGNvbW1pdHRlZFZhbHVlKSkge1xuICAgICAgICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlID0gW107XG4gICAgICAgICAgICB0aGlzLl8kY2xlYXIoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBMZXRzIHVzIGtlZXAgdHJhY2sgb2YgaG93IG1hbnkgaXRlbXMgd2Ugc3RhbXBlZCBzbyB3ZSBjYW4gY2xlYXIgbGVmdG92ZXJcbiAgICAgICAgLy8gaXRlbXMgZnJvbSBhIHByZXZpb3VzIHJlbmRlclxuICAgICAgICBjb25zdCBpdGVtUGFydHMgPSB0aGlzLl8kY29tbWl0dGVkVmFsdWU7XG4gICAgICAgIGxldCBwYXJ0SW5kZXggPSAwO1xuICAgICAgICBsZXQgaXRlbVBhcnQ7XG4gICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHBhcnRJbmRleCA9PT0gaXRlbVBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIC8vIElmIG5vIGV4aXN0aW5nIHBhcnQsIGNyZWF0ZSBhIG5ldyBvbmVcbiAgICAgICAgICAgICAgICAvLyBUT0RPIChqdXN0aW5mYWduYW5pKTogdGVzdCBwZXJmIGltcGFjdCBvZiBhbHdheXMgY3JlYXRpbmcgdHdvIHBhcnRzXG4gICAgICAgICAgICAgICAgLy8gaW5zdGVhZCBvZiBzaGFyaW5nIHBhcnRzIGJldHdlZW4gbm9kZXNcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vbGl0L2xpdC9pc3N1ZXMvMTI2NlxuICAgICAgICAgICAgICAgIGl0ZW1QYXJ0cy5wdXNoKChpdGVtUGFydCA9IG5ldyBDaGlsZFBhcnQodGhpcy5faW5zZXJ0KGNyZWF0ZU1hcmtlcigpKSwgdGhpcy5faW5zZXJ0KGNyZWF0ZU1hcmtlcigpKSwgdGhpcywgdGhpcy5vcHRpb25zKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gUmV1c2UgYW4gZXhpc3RpbmcgcGFydFxuICAgICAgICAgICAgICAgIGl0ZW1QYXJ0ID0gaXRlbVBhcnRzW3BhcnRJbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpdGVtUGFydC5fJHNldFZhbHVlKGl0ZW0pO1xuICAgICAgICAgICAgcGFydEluZGV4Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcnRJbmRleCA8IGl0ZW1QYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIC8vIGl0ZW1QYXJ0cyBhbHdheXMgaGF2ZSBlbmQgbm9kZXNcbiAgICAgICAgICAgIHRoaXMuXyRjbGVhcihpdGVtUGFydCAmJiB3cmFwKGl0ZW1QYXJ0Ll8kZW5kTm9kZSkubmV4dFNpYmxpbmcsIHBhcnRJbmRleCk7XG4gICAgICAgICAgICAvLyBUcnVuY2F0ZSB0aGUgcGFydHMgYXJyYXkgc28gX3ZhbHVlIHJlZmxlY3RzIHRoZSBjdXJyZW50IHN0YXRlXG4gICAgICAgICAgICBpdGVtUGFydHMubGVuZ3RoID0gcGFydEluZGV4O1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIG5vZGVzIGNvbnRhaW5lZCB3aXRoaW4gdGhpcyBQYXJ0IGZyb20gdGhlIERPTS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSBzdGFydCBTdGFydCBub2RlIHRvIGNsZWFyIGZyb20sIGZvciBjbGVhcmluZyBhIHN1YnNldCBvZiB0aGUgcGFydCdzXG4gICAgICogICAgIERPTSAodXNlZCB3aGVuIHRydW5jYXRpbmcgaXRlcmFibGVzKVxuICAgICAqIEBwYXJhbSBmcm9tICBXaGVuIGBzdGFydGAgaXMgc3BlY2lmaWVkLCB0aGUgaW5kZXggd2l0aGluIHRoZSBpdGVyYWJsZSBmcm9tXG4gICAgICogICAgIHdoaWNoIENoaWxkUGFydHMgYXJlIGJlaW5nIHJlbW92ZWQsIHVzZWQgZm9yIGRpc2Nvbm5lY3RpbmcgZGlyZWN0aXZlcyBpblxuICAgICAqICAgICB0aG9zZSBQYXJ0cy5cbiAgICAgKlxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIF8kY2xlYXIoc3RhcnQgPSB3cmFwKHRoaXMuXyRzdGFydE5vZGUpLm5leHRTaWJsaW5nLCBmcm9tKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgKF9hID0gdGhpcy5fJG5vdGlmeUNvbm5lY3Rpb25DaGFuZ2VkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0aGlzLCBmYWxzZSwgdHJ1ZSwgZnJvbSk7XG4gICAgICAgIHdoaWxlIChzdGFydCAmJiBzdGFydCAhPT0gdGhpcy5fJGVuZE5vZGUpIHtcbiAgICAgICAgICAgIGNvbnN0IG4gPSB3cmFwKHN0YXJ0KS5uZXh0U2libGluZztcbiAgICAgICAgICAgIHdyYXAoc3RhcnQpLnJlbW92ZSgpO1xuICAgICAgICAgICAgc3RhcnQgPSBuO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEltcGxlbWVudGF0aW9uIG9mIFJvb3RQYXJ0J3MgYGlzQ29ubmVjdGVkYC4gTm90ZSB0aGF0IHRoaXMgbWV0b2RcbiAgICAgKiBzaG91bGQgb25seSBiZSBjYWxsZWQgb24gYFJvb3RQYXJ0YHMgKHRoZSBgQ2hpbGRQYXJ0YCByZXR1cm5lZCBmcm9tIGFcbiAgICAgKiB0b3AtbGV2ZWwgYHJlbmRlcigpYCBjYWxsKS4gSXQgaGFzIG5vIGVmZmVjdCBvbiBub24tcm9vdCBDaGlsZFBhcnRzLlxuICAgICAqIEBwYXJhbSBpc0Nvbm5lY3RlZCBXaGV0aGVyIHRvIHNldFxuICAgICAqIEBpbnRlcm5hbFxuICAgICAqL1xuICAgIHNldENvbm5lY3RlZChpc0Nvbm5lY3RlZCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIGlmICh0aGlzLl8kcGFyZW50ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuX19pc0Nvbm5lY3RlZCA9IGlzQ29ubmVjdGVkO1xuICAgICAgICAgICAgKF9hID0gdGhpcy5fJG5vdGlmeUNvbm5lY3Rpb25DaGFuZ2VkKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2FsbCh0aGlzLCBpc0Nvbm5lY3RlZCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoREVWX01PREUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcigncGFydC5zZXRDb25uZWN0ZWQoKSBtYXkgb25seSBiZSBjYWxsZWQgb24gYSAnICtcbiAgICAgICAgICAgICAgICAnUm9vdFBhcnQgcmV0dXJuZWQgZnJvbSByZW5kZXIoKS4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmNsYXNzIEF0dHJpYnV0ZVBhcnQge1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQsIG5hbWUsIHN0cmluZ3MsIHBhcmVudCwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLnR5cGUgPSBBVFRSSUJVVEVfUEFSVDtcbiAgICAgICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBub3RoaW5nO1xuICAgICAgICAvKiogQGludGVybmFsICovXG4gICAgICAgIHRoaXMuXyRkaXNjb25uZWN0YWJsZUNoaWxkcmVuID0gdW5kZWZpbmVkO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl8kcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvcHRpb25zO1xuICAgICAgICBpZiAoc3RyaW5ncy5sZW5ndGggPiAyIHx8IHN0cmluZ3NbMF0gIT09ICcnIHx8IHN0cmluZ3NbMV0gIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUgPSBuZXcgQXJyYXkoc3RyaW5ncy5sZW5ndGggLSAxKS5maWxsKG5ldyBTdHJpbmcoKSk7XG4gICAgICAgICAgICB0aGlzLnN0cmluZ3MgPSBzdHJpbmdzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlID0gbm90aGluZztcbiAgICAgICAgfVxuICAgICAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICAgICAgICB0aGlzLl9zYW5pdGl6ZXIgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0IHRhZ05hbWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnQudGFnTmFtZTtcbiAgICB9XG4gICAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICAgIGdldCBfJGlzQ29ubmVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5fJGlzQ29ubmVjdGVkO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSB2YWx1ZSBvZiB0aGlzIHBhcnQgYnkgcmVzb2x2aW5nIHRoZSB2YWx1ZSBmcm9tIHBvc3NpYmx5IG11bHRpcGxlXG4gICAgICogdmFsdWVzIGFuZCBzdGF0aWMgc3RyaW5ncyBhbmQgY29tbWl0dGluZyBpdCB0byB0aGUgRE9NLlxuICAgICAqIElmIHRoaXMgcGFydCBpcyBzaW5nbGUtdmFsdWVkLCBgdGhpcy5fc3RyaW5nc2Agd2lsbCBiZSB1bmRlZmluZWQsIGFuZCB0aGVcbiAgICAgKiBtZXRob2Qgd2lsbCBiZSBjYWxsZWQgd2l0aCBhIHNpbmdsZSB2YWx1ZSBhcmd1bWVudC4gSWYgdGhpcyBwYXJ0IGlzXG4gICAgICogbXVsdGktdmFsdWUsIGB0aGlzLl9zdHJpbmdzYCB3aWxsIGJlIGRlZmluZWQsIGFuZCB0aGUgbWV0aG9kIGlzIGNhbGxlZFxuICAgICAqIHdpdGggdGhlIHZhbHVlIGFycmF5IG9mIHRoZSBwYXJ0J3Mgb3duaW5nIFRlbXBsYXRlSW5zdGFuY2UsIGFuZCBhbiBvZmZzZXRcbiAgICAgKiBpbnRvIHRoZSB2YWx1ZSBhcnJheSBmcm9tIHdoaWNoIHRoZSB2YWx1ZXMgc2hvdWxkIGJlIHJlYWQuXG4gICAgICogVGhpcyBtZXRob2QgaXMgb3ZlcmxvYWRlZCB0aGlzIHdheSB0byBlbGltaW5hdGUgc2hvcnQtbGl2ZWQgYXJyYXkgc2xpY2VzXG4gICAgICogb2YgdGhlIHRlbXBsYXRlIGluc3RhbmNlIHZhbHVlcywgYW5kIGFsbG93IGEgZmFzdC1wYXRoIGZvciBzaW5nbGUtdmFsdWVkXG4gICAgICogcGFydHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gdmFsdWUgVGhlIHBhcnQgdmFsdWUsIG9yIGFuIGFycmF5IG9mIHZhbHVlcyBmb3IgbXVsdGktdmFsdWVkIHBhcnRzXG4gICAgICogQHBhcmFtIHZhbHVlSW5kZXggdGhlIGluZGV4IHRvIHN0YXJ0IHJlYWRpbmcgdmFsdWVzIGZyb20uIGB1bmRlZmluZWRgIGZvclxuICAgICAqICAgc2luZ2xlLXZhbHVlZCBwYXJ0c1xuICAgICAqIEBwYXJhbSBub0NvbW1pdCBjYXVzZXMgdGhlIHBhcnQgdG8gbm90IGNvbW1pdCBpdHMgdmFsdWUgdG8gdGhlIERPTS4gVXNlZFxuICAgICAqICAgaW4gaHlkcmF0aW9uIHRvIHByaW1lIGF0dHJpYnV0ZSBwYXJ0cyB3aXRoIHRoZWlyIGZpcnN0LXJlbmRlcmVkIHZhbHVlLFxuICAgICAqICAgYnV0IG5vdCBzZXQgdGhlIGF0dHJpYnV0ZSwgYW5kIGluIFNTUiB0byBuby1vcCB0aGUgRE9NIG9wZXJhdGlvbiBhbmRcbiAgICAgKiAgIGNhcHR1cmUgdGhlIHZhbHVlIGZvciBzZXJpYWxpemF0aW9uLlxuICAgICAqXG4gICAgICogQGludGVybmFsXG4gICAgICovXG4gICAgXyRzZXRWYWx1ZSh2YWx1ZSwgZGlyZWN0aXZlUGFyZW50ID0gdGhpcywgdmFsdWVJbmRleCwgbm9Db21taXQpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5ncyA9IHRoaXMuc3RyaW5ncztcbiAgICAgICAgLy8gV2hldGhlciBhbnkgb2YgdGhlIHZhbHVlcyBoYXMgY2hhbmdlZCwgZm9yIGRpcnR5LWNoZWNraW5nXG4gICAgICAgIGxldCBjaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgaWYgKHN0cmluZ3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gU2luZ2xlLXZhbHVlIGJpbmRpbmcgY2FzZVxuICAgICAgICAgICAgdmFsdWUgPSByZXNvbHZlRGlyZWN0aXZlKHRoaXMsIHZhbHVlLCBkaXJlY3RpdmVQYXJlbnQsIDApO1xuICAgICAgICAgICAgY2hhbmdlID1cbiAgICAgICAgICAgICAgICAhaXNQcmltaXRpdmUodmFsdWUpIHx8XG4gICAgICAgICAgICAgICAgICAgICh2YWx1ZSAhPT0gdGhpcy5fJGNvbW1pdHRlZFZhbHVlICYmIHZhbHVlICE9PSBub0NoYW5nZSk7XG4gICAgICAgICAgICBpZiAoY2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBJbnRlcnBvbGF0aW9uIGNhc2VcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHZhbHVlO1xuICAgICAgICAgICAgdmFsdWUgPSBzdHJpbmdzWzBdO1xuICAgICAgICAgICAgbGV0IGksIHY7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc3RyaW5ncy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2ID0gcmVzb2x2ZURpcmVjdGl2ZSh0aGlzLCB2YWx1ZXNbdmFsdWVJbmRleCArIGldLCBkaXJlY3RpdmVQYXJlbnQsIGkpO1xuICAgICAgICAgICAgICAgIGlmICh2ID09PSBub0NoYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBJZiB0aGUgdXNlci1wcm92aWRlZCB2YWx1ZSBpcyBgbm9DaGFuZ2VgLCB1c2UgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIHYgPSB0aGlzLl8kY29tbWl0dGVkVmFsdWVbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNoYW5nZSB8fCAoY2hhbmdlID0gIWlzUHJpbWl0aXZlKHYpIHx8IHYgIT09IHRoaXMuXyRjb21taXR0ZWRWYWx1ZVtpXSk7XG4gICAgICAgICAgICAgICAgaWYgKHYgPT09IG5vdGhpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBub3RoaW5nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWx1ZSAhPT0gbm90aGluZykge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSArPSAodiAhPT0gbnVsbCAmJiB2ICE9PSB2b2lkIDAgPyB2IDogJycpICsgc3RyaW5nc1tpICsgMV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFdlIGFsd2F5cyByZWNvcmQgZWFjaCB2YWx1ZSwgZXZlbiBpZiBvbmUgaXMgYG5vdGhpbmdgLCBmb3IgZnV0dXJlXG4gICAgICAgICAgICAgICAgLy8gY2hhbmdlIGRldGVjdGlvbi5cbiAgICAgICAgICAgICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWVbaV0gPSB2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjaGFuZ2UgJiYgIW5vQ29tbWl0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb21taXRWYWx1ZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9jb21taXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAodmFsdWUgPT09IG5vdGhpbmcpIHtcbiAgICAgICAgICAgIHdyYXAodGhpcy5lbGVtZW50KS5yZW1vdmVBdHRyaWJ1dGUodGhpcy5uYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChFTkFCTEVfRVhUUkFfU0VDVVJJVFlfSE9PS1MpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fc2FuaXRpemVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2FuaXRpemVyID0gc2FuaXRpemVyRmFjdG9yeUludGVybmFsKHRoaXMuZWxlbWVudCwgdGhpcy5uYW1lLCAnYXR0cmlidXRlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhbHVlID0gdGhpcy5fc2FuaXRpemVyKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDAgPyB2YWx1ZSA6ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlYnVnTG9nRXZlbnQgPT09IG51bGwgfHwgZGVidWdMb2dFdmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICAgICAga2luZDogJ2NvbW1pdCBhdHRyaWJ1dGUnLFxuICAgICAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB3cmFwKHRoaXMuZWxlbWVudCkuc2V0QXR0cmlidXRlKHRoaXMubmFtZSwgKHZhbHVlICE9PSBudWxsICYmIHZhbHVlICE9PSB2b2lkIDAgPyB2YWx1ZSA6ICcnKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBQcm9wZXJ0eVBhcnQgZXh0ZW5kcyBBdHRyaWJ1dGVQYXJ0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy50eXBlID0gUFJPUEVSVFlfUEFSVDtcbiAgICB9XG4gICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgIF9jb21taXRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICBpZiAoRU5BQkxFX0VYVFJBX1NFQ1VSSVRZX0hPT0tTKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5fc2FuaXRpemVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zYW5pdGl6ZXIgPSBzYW5pdGl6ZXJGYWN0b3J5SW50ZXJuYWwodGhpcy5lbGVtZW50LCB0aGlzLm5hbWUsICdwcm9wZXJ0eScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLl9zYW5pdGl6ZXIodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGRlYnVnTG9nRXZlbnQgPT09IG51bGwgfHwgZGVidWdMb2dFdmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICBraW5kOiAnY29tbWl0IHByb3BlcnR5JyxcbiAgICAgICAgICAgIGVsZW1lbnQ6IHRoaXMuZWxlbWVudCxcbiAgICAgICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgICAgIHZhbHVlLFxuICAgICAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICB9KTtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgdGhpcy5lbGVtZW50W3RoaXMubmFtZV0gPSB2YWx1ZSA9PT0gbm90aGluZyA/IHVuZGVmaW5lZCA6IHZhbHVlO1xuICAgIH1cbn1cbi8vIFRlbXBvcmFyeSB3b3JrYXJvdW5kIGZvciBodHRwczovL2NyYnVnLmNvbS85OTMyNjhcbi8vIEN1cnJlbnRseSwgYW55IGF0dHJpYnV0ZSBzdGFydGluZyB3aXRoIFwib25cIiBpcyBjb25zaWRlcmVkIHRvIGJlIGFcbi8vIFRydXN0ZWRTY3JpcHQgc291cmNlLiBTdWNoIGJvb2xlYW4gYXR0cmlidXRlcyBtdXN0IGJlIHNldCB0byB0aGUgZXF1aXZhbGVudFxuLy8gdHJ1c3RlZCBlbXB0eVNjcmlwdCB2YWx1ZS5cbmNvbnN0IGVtcHR5U3RyaW5nRm9yQm9vbGVhbkF0dHJpYnV0ZSA9IHRydXN0ZWRUeXBlc1xuICAgID8gdHJ1c3RlZFR5cGVzLmVtcHR5U2NyaXB0XG4gICAgOiAnJztcbmNsYXNzIEJvb2xlYW5BdHRyaWJ1dGVQYXJ0IGV4dGVuZHMgQXR0cmlidXRlUGFydCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMudHlwZSA9IEJPT0xFQU5fQVRUUklCVVRFX1BBUlQ7XG4gICAgfVxuICAgIC8qKiBAaW50ZXJuYWwgKi9cbiAgICBfY29tbWl0VmFsdWUodmFsdWUpIHtcbiAgICAgICAgZGVidWdMb2dFdmVudCA9PT0gbnVsbCB8fCBkZWJ1Z0xvZ0V2ZW50ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBkZWJ1Z0xvZ0V2ZW50KHtcbiAgICAgICAgICAgIGtpbmQ6ICdjb21taXQgYm9vbGVhbiBhdHRyaWJ1dGUnLFxuICAgICAgICAgICAgZWxlbWVudDogdGhpcy5lbGVtZW50LFxuICAgICAgICAgICAgbmFtZTogdGhpcy5uYW1lLFxuICAgICAgICAgICAgdmFsdWU6ICEhKHZhbHVlICYmIHZhbHVlICE9PSBub3RoaW5nKSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gbm90aGluZykge1xuICAgICAgICAgICAgd3JhcCh0aGlzLmVsZW1lbnQpLnNldEF0dHJpYnV0ZSh0aGlzLm5hbWUsIGVtcHR5U3RyaW5nRm9yQm9vbGVhbkF0dHJpYnV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB3cmFwKHRoaXMuZWxlbWVudCkucmVtb3ZlQXR0cmlidXRlKHRoaXMubmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBFdmVudFBhcnQgZXh0ZW5kcyBBdHRyaWJ1dGVQYXJ0IHtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50LCBuYW1lLCBzdHJpbmdzLCBwYXJlbnQsIG9wdGlvbnMpIHtcbiAgICAgICAgc3VwZXIoZWxlbWVudCwgbmFtZSwgc3RyaW5ncywgcGFyZW50LCBvcHRpb25zKTtcbiAgICAgICAgdGhpcy50eXBlID0gRVZFTlRfUEFSVDtcbiAgICAgICAgaWYgKERFVl9NT0RFICYmIHRoaXMuc3RyaW5ncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEEgXFxgPCR7ZWxlbWVudC5sb2NhbE5hbWV9PlxcYCBoYXMgYSBcXGBAJHtuYW1lfT0uLi5cXGAgbGlzdGVuZXIgd2l0aCBgICtcbiAgICAgICAgICAgICAgICAnaW52YWxpZCBjb250ZW50LiBFdmVudCBsaXN0ZW5lcnMgaW4gdGVtcGxhdGVzIG11c3QgaGF2ZSBleGFjdGx5ICcgK1xuICAgICAgICAgICAgICAgICdvbmUgZXhwcmVzc2lvbiBhbmQgbm8gc3Vycm91bmRpbmcgdGV4dC4nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBFdmVudFBhcnQgZG9lcyBub3QgdXNlIHRoZSBiYXNlIF8kc2V0VmFsdWUvX3Jlc29sdmVWYWx1ZSBpbXBsZW1lbnRhdGlvblxuICAgIC8vIHNpbmNlIHRoZSBkaXJ0eSBjaGVja2luZyBpcyBtb3JlIGNvbXBsZXhcbiAgICAvKiogQGludGVybmFsICovXG4gICAgXyRzZXRWYWx1ZShuZXdMaXN0ZW5lciwgZGlyZWN0aXZlUGFyZW50ID0gdGhpcykge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIG5ld0xpc3RlbmVyID1cbiAgICAgICAgICAgIChfYSA9IHJlc29sdmVEaXJlY3RpdmUodGhpcywgbmV3TGlzdGVuZXIsIGRpcmVjdGl2ZVBhcmVudCwgMCkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IG5vdGhpbmc7XG4gICAgICAgIGlmIChuZXdMaXN0ZW5lciA9PT0gbm9DaGFuZ2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbGRMaXN0ZW5lciA9IHRoaXMuXyRjb21taXR0ZWRWYWx1ZTtcbiAgICAgICAgLy8gSWYgdGhlIG5ldyB2YWx1ZSBpcyBub3RoaW5nIG9yIGFueSBvcHRpb25zIGNoYW5nZSB3ZSBoYXZlIHRvIHJlbW92ZSB0aGVcbiAgICAgICAgLy8gcGFydCBhcyBhIGxpc3RlbmVyLlxuICAgICAgICBjb25zdCBzaG91bGRSZW1vdmVMaXN0ZW5lciA9IChuZXdMaXN0ZW5lciA9PT0gbm90aGluZyAmJiBvbGRMaXN0ZW5lciAhPT0gbm90aGluZykgfHxcbiAgICAgICAgICAgIG5ld0xpc3RlbmVyLmNhcHR1cmUgIT09XG4gICAgICAgICAgICAgICAgb2xkTGlzdGVuZXIuY2FwdHVyZSB8fFxuICAgICAgICAgICAgbmV3TGlzdGVuZXIub25jZSAhPT1cbiAgICAgICAgICAgICAgICBvbGRMaXN0ZW5lci5vbmNlIHx8XG4gICAgICAgICAgICBuZXdMaXN0ZW5lci5wYXNzaXZlICE9PVxuICAgICAgICAgICAgICAgIG9sZExpc3RlbmVyLnBhc3NpdmU7XG4gICAgICAgIC8vIElmIHRoZSBuZXcgdmFsdWUgaXMgbm90IG5vdGhpbmcgYW5kIHdlIHJlbW92ZWQgdGhlIGxpc3RlbmVyLCB3ZSBoYXZlXG4gICAgICAgIC8vIHRvIGFkZCB0aGUgcGFydCBhcyBhIGxpc3RlbmVyLlxuICAgICAgICBjb25zdCBzaG91bGRBZGRMaXN0ZW5lciA9IG5ld0xpc3RlbmVyICE9PSBub3RoaW5nICYmXG4gICAgICAgICAgICAob2xkTGlzdGVuZXIgPT09IG5vdGhpbmcgfHwgc2hvdWxkUmVtb3ZlTGlzdGVuZXIpO1xuICAgICAgICBkZWJ1Z0xvZ0V2ZW50ID09PSBudWxsIHx8IGRlYnVnTG9nRXZlbnQgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGRlYnVnTG9nRXZlbnQoe1xuICAgICAgICAgICAga2luZDogJ2NvbW1pdCBldmVudCBsaXN0ZW5lcicsXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgICBuYW1lOiB0aGlzLm5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogbmV3TGlzdGVuZXIsXG4gICAgICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgICAgICByZW1vdmVMaXN0ZW5lcjogc2hvdWxkUmVtb3ZlTGlzdGVuZXIsXG4gICAgICAgICAgICBhZGRMaXN0ZW5lcjogc2hvdWxkQWRkTGlzdGVuZXIsXG4gICAgICAgICAgICBvbGRMaXN0ZW5lcixcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChzaG91bGRSZW1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5uYW1lLCB0aGlzLCBvbGRMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNob3VsZEFkZExpc3RlbmVyKSB7XG4gICAgICAgICAgICAvLyBCZXdhcmU6IElFMTEgYW5kIENocm9tZSA0MSBkb24ndCBsaWtlIHVzaW5nIHRoZSBsaXN0ZW5lciBhcyB0aGVcbiAgICAgICAgICAgIC8vIG9wdGlvbnMgb2JqZWN0LiBGaWd1cmUgb3V0IGhvdyB0byBkZWFsIHcvIHRoaXMgaW4gSUUxMSAtIG1heWJlXG4gICAgICAgICAgICAvLyBwYXRjaCBhZGRFdmVudExpc3RlbmVyP1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodGhpcy5uYW1lLCB0aGlzLCBuZXdMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fJGNvbW1pdHRlZFZhbHVlID0gbmV3TGlzdGVuZXI7XG4gICAgfVxuICAgIGhhbmRsZUV2ZW50KGV2ZW50KSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fJGNvbW1pdHRlZFZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLl8kY29tbWl0dGVkVmFsdWUuY2FsbCgoX2IgPSAoX2EgPSB0aGlzLm9wdGlvbnMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5ob3N0KSAhPT0gbnVsbCAmJiBfYiAhPT0gdm9pZCAwID8gX2IgOiB0aGlzLmVsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuXyRjb21taXR0ZWRWYWx1ZS5oYW5kbGVFdmVudChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5jbGFzcyBFbGVtZW50UGFydCB7XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCwgcGFyZW50LCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMudHlwZSA9IEVMRU1FTlRfUEFSVDtcbiAgICAgICAgLyoqIEBpbnRlcm5hbCAqL1xuICAgICAgICB0aGlzLl8kZGlzY29ubmVjdGFibGVDaGlsZHJlbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5fJHBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICB9XG4gICAgLy8gU2VlIGNvbW1lbnQgaW4gRGlzY29ubmVjdGFibGUgaW50ZXJmYWNlIGZvciB3aHkgdGhpcyBpcyBhIGdldHRlclxuICAgIGdldCBfJGlzQ29ubmVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fJHBhcmVudC5fJGlzQ29ubmVjdGVkO1xuICAgIH1cbiAgICBfJHNldFZhbHVlKHZhbHVlKSB7XG4gICAgICAgIGRlYnVnTG9nRXZlbnQgPT09IG51bGwgfHwgZGVidWdMb2dFdmVudCA9PT0gdm9pZCAwID8gdm9pZCAwIDogZGVidWdMb2dFdmVudCh7XG4gICAgICAgICAgICBraW5kOiAnY29tbWl0IHRvIGVsZW1lbnQgYmluZGluZycsXG4gICAgICAgICAgICBlbGVtZW50OiB0aGlzLmVsZW1lbnQsXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHRoaXMub3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJlc29sdmVEaXJlY3RpdmUodGhpcywgdmFsdWUpO1xuICAgIH1cbn1cbi8qKlxuICogRU5EIFVTRVJTIFNIT1VMRCBOT1QgUkVMWSBPTiBUSElTIE9CSkVDVC5cbiAqXG4gKiBQcml2YXRlIGV4cG9ydHMgZm9yIHVzZSBieSBvdGhlciBMaXQgcGFja2FnZXMsIG5vdCBpbnRlbmRlZCBmb3IgdXNlIGJ5XG4gKiBleHRlcm5hbCB1c2Vycy5cbiAqXG4gKiBXZSBjdXJyZW50bHkgZG8gbm90IG1ha2UgYSBtYW5nbGVkIHJvbGx1cCBidWlsZCBvZiB0aGUgbGl0LXNzciBjb2RlLiBJbiBvcmRlclxuICogdG8ga2VlcCBhIG51bWJlciBvZiAob3RoZXJ3aXNlIHByaXZhdGUpIHRvcC1sZXZlbCBleHBvcnRzICBtYW5nbGVkIGluIHRoZVxuICogY2xpZW50IHNpZGUgY29kZSwgd2UgZXhwb3J0IGEgXyRMSCBvYmplY3QgY29udGFpbmluZyB0aG9zZSBtZW1iZXJzIChvclxuICogaGVscGVyIG1ldGhvZHMgZm9yIGFjY2Vzc2luZyBwcml2YXRlIGZpZWxkcyBvZiB0aG9zZSBtZW1iZXJzKSwgYW5kIHRoZW5cbiAqIHJlLWV4cG9ydCB0aGVtIGZvciB1c2UgaW4gbGl0LXNzci4gVGhpcyBrZWVwcyBsaXQtc3NyIGFnbm9zdGljIHRvIHdoZXRoZXIgdGhlXG4gKiBjbGllbnQtc2lkZSBjb2RlIGlzIGJlaW5nIHVzZWQgaW4gYGRldmAgbW9kZSBvciBgcHJvZGAgbW9kZS5cbiAqXG4gKiBUaGlzIGhhcyBhIHVuaXF1ZSBuYW1lLCB0byBkaXNhbWJpZ3VhdGUgaXQgZnJvbSBwcml2YXRlIGV4cG9ydHMgaW5cbiAqIGxpdC1lbGVtZW50LCB3aGljaCByZS1leHBvcnRzIGFsbCBvZiBsaXQtaHRtbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5leHBvcnQgY29uc3QgXyRMSCA9IHtcbiAgICAvLyBVc2VkIGluIGxpdC1zc3JcbiAgICBfYm91bmRBdHRyaWJ1dGVTdWZmaXg6IGJvdW5kQXR0cmlidXRlU3VmZml4LFxuICAgIF9tYXJrZXI6IG1hcmtlcixcbiAgICBfbWFya2VyTWF0Y2g6IG1hcmtlck1hdGNoLFxuICAgIF9IVE1MX1JFU1VMVDogSFRNTF9SRVNVTFQsXG4gICAgX2dldFRlbXBsYXRlSHRtbDogZ2V0VGVtcGxhdGVIdG1sLFxuICAgIC8vIFVzZWQgaW4gaHlkcmF0ZVxuICAgIF9UZW1wbGF0ZUluc3RhbmNlOiBUZW1wbGF0ZUluc3RhbmNlLFxuICAgIF9pc0l0ZXJhYmxlOiBpc0l0ZXJhYmxlLFxuICAgIF9yZXNvbHZlRGlyZWN0aXZlOiByZXNvbHZlRGlyZWN0aXZlLFxuICAgIC8vIFVzZWQgaW4gdGVzdHMgYW5kIHByaXZhdGUtc3NyLXN1cHBvcnRcbiAgICBfQ2hpbGRQYXJ0OiBDaGlsZFBhcnQsXG4gICAgX0F0dHJpYnV0ZVBhcnQ6IEF0dHJpYnV0ZVBhcnQsXG4gICAgX0Jvb2xlYW5BdHRyaWJ1dGVQYXJ0OiBCb29sZWFuQXR0cmlidXRlUGFydCxcbiAgICBfRXZlbnRQYXJ0OiBFdmVudFBhcnQsXG4gICAgX1Byb3BlcnR5UGFydDogUHJvcGVydHlQYXJ0LFxuICAgIF9FbGVtZW50UGFydDogRWxlbWVudFBhcnQsXG59O1xuLy8gQXBwbHkgcG9seWZpbGxzIGlmIGF2YWlsYWJsZVxuY29uc3QgcG9seWZpbGxTdXBwb3J0ID0gREVWX01PREVcbiAgICA/IHdpbmRvdy5saXRIdG1sUG9seWZpbGxTdXBwb3J0RGV2TW9kZVxuICAgIDogd2luZG93LmxpdEh0bWxQb2x5ZmlsbFN1cHBvcnQ7XG5wb2x5ZmlsbFN1cHBvcnQgPT09IG51bGwgfHwgcG9seWZpbGxTdXBwb3J0ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2x5ZmlsbFN1cHBvcnQoVGVtcGxhdGUsIENoaWxkUGFydCk7XG4vLyBJTVBPUlRBTlQ6IGRvIG5vdCBjaGFuZ2UgdGhlIHByb3BlcnR5IG5hbWUgb3IgdGhlIGFzc2lnbm1lbnQgZXhwcmVzc2lvbi5cbi8vIFRoaXMgbGluZSB3aWxsIGJlIHVzZWQgaW4gcmVnZXhlcyB0byBzZWFyY2ggZm9yIGxpdC1odG1sIHVzYWdlLlxuKChfZCA9IGdsb2JhbFRoaXMubGl0SHRtbFZlcnNpb25zKSAhPT0gbnVsbCAmJiBfZCAhPT0gdm9pZCAwID8gX2QgOiAoZ2xvYmFsVGhpcy5saXRIdG1sVmVyc2lvbnMgPSBbXSkpLnB1c2goJzIuMi4xJyk7XG5pZiAoREVWX01PREUgJiYgZ2xvYmFsVGhpcy5saXRIdG1sVmVyc2lvbnMubGVuZ3RoID4gMSkge1xuICAgIGlzc3VlV2FybmluZygnbXVsdGlwbGUtdmVyc2lvbnMnLCBgTXVsdGlwbGUgdmVyc2lvbnMgb2YgTGl0IGxvYWRlZC4gYCArXG4gICAgICAgIGBMb2FkaW5nIG11bHRpcGxlIHZlcnNpb25zIGlzIG5vdCByZWNvbW1lbmRlZC5gKTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpdC1odG1sLmpzLm1hcCIsImltcG9ydFwiQGxpdC9yZWFjdGl2ZS1lbGVtZW50XCI7aW1wb3J0XCJsaXQtaHRtbFwiO2V4cG9ydCpmcm9tXCJsaXQtZWxlbWVudC9saXQtZWxlbWVudC5qc1wiO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aW5kZXguanMubWFwXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIGltcG9ydCB7IExpdEVsZW1lbnR9IGZyb20gJ2xpdCc7XG5pbXBvcnQgeyBMaXRFbGVtZW50fSBmcm9tICdsaXQnO1xuXG5pbXBvcnQge3JlbmRlcn0gZnJvbSBcIi4vYWNjLnRwbC5qc1wiO1xuIFxuLy8gaW1wb3J0ICdodHRwczovL3VucGtnLmNvbS9AcG9seW1lci9pcm9uLXBhZ2VzQGxhdGVzdC9pcm9uLXBhZ2VzLmpzP21vZHVsZSc7XG5cbi8vIGltcG9ydCAnQHBvbHltZXIvaXJvbi1wYWdlcyc7XG5cbmNsYXNzIEFjY0FwcCBleHRlbmRzIExpdEVsZW1lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICAgIHRoaXMucmVuZGVyID0gcmVuZGVyLmJpbmQodGhpcyk7XG5cbiAgICB0aGlzLnZlcnNpb24gPSBcImFscGhhXCI7XG4gICAgXG4gIH1cblxuXG59XG5cbmN1c3RvbUVsZW1lbnRzLmRlZmluZSgnYWdnaWUtY3JvcC1jYWxjdWxhdG9yJywgQWNjQXBwKTsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=