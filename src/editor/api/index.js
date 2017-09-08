/**
 * ESFiddle frontend common routines and backend interface API.
 *
 * This API provides a common interface to routines for running, linting, saving the fiddle
 * as well as changing privacy level and determining the authentication status of the current user.
 *
 * Also note:
 *  1. No direct DOM interactions should be made in this module
 *  2. All functions within the API must return a Promise to maintain consistency
 */

/**
 * Constructor for API instance
 * @param base {object} Base configuration
 * @class API
 */
export const API = (function (base) { // eslint-disable-line 

  /**
   * constructor method
   * @param config {object} Instance configuration, will be merged with base
   */
  function API(config) {  // eslint-disable-line 
    if (!(this instanceof API)) {
      throw new Error('Invalid instantiation! must use with new');
    }

    this.config = config;
  }

  /**
   * Vue.js plugin's install handle
   *
   * @param Vue exported Vue symbol from the library
   */
  API.prototype.install = function install(Vue, { name }) {
    // add api instance property identified by `name` on all vue instances
    Vue.prototype[name] = this; // eslint-disable-line 
  };

  /** import all submodules and 'install' them on the API-prototype */
  /** all submodules are passed a reference to the API 'class' and not an instance */
  [
    require('./save'),    // eslint-disable-line global-require
  ].forEach(({ default: fn }) => fn(API));

  return API;
}({
  /** configuration object */
}));

// export a singleton instance for the API
export default new API();
