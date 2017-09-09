import JSHINT from 'jshint';    // eslint-disable-line

/**
 * Lint function for linting the code using JSHint
 * @param code {string} The code to lint
 * @api
 * @func
 * @returns {Promise} resolves if the code is properly linted or is rejected with errors
 */
function lint(code) {
  return new Promise((resolve, reject) => {   // eslint-disable-line
    const linted = JSHINT(code, {
      esnext: true,
      devel: true,
      browser: true,
    });

    if (linted) {
      resolve();
    } else {
      reject(JSHINT.errors);
    }
  });
}

export default function install(api) {
  api.prototype.lint = lint; // eslint-disable-line no-param-reassign
}
