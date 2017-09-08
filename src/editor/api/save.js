/**
 * Save function for saving the fiddle on the server
 * @param code {string} The code to save
 * @api
 * @func
 */
function save(code) {   // eslint-disable-line
  if (!code) {
    return Promise.reject('No code!');
  }

  const pathArr = window.location.pathname.split('/');

  return fetch('/save', {
    credentials: 'same-origin',
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({
      fiddle: pathArr[1] ? pathArr[1] : -1,
      value: code,
    }),
  })
  .then(response => response.json())
  .then((data) => {
    if (data.saved) {
      // push the fiddle number to the url using history API
      window.history.replaceState({}, '', data.fiddle);
    } else {
      throw new Error('Failed to save fiddle. Try again later');
    }
  });
}

// install handle
export default function install(api) {
  api.prototype.save = save;   // eslint-disable-line no-param-reassign
}
