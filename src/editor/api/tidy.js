import beautify from 'beautify-js'; // eslint-disable-line

/**
 * Tidy function to tidy up and indent the code using the BeautifierJS library
 *
 * @param code {string} code to lint
 * @api
 * @func
 */
function tidy(code) {
  return new Promise((resolve) => {
    resolve(beautify(code, {
      indent_size: 2,
      end_with_newline: true,
      jslint_happy: true,
      break_chained_methods: true,
    }));
  });
}

export default function install(api) {
  api.prototype.tidy = tidy;  // eslint-disable-line
}
