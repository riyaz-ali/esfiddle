/**
 * Privacy toggle function. This function toggles the privacy level of the fiddle.
 *
 * @api
 * @func
 */
function togglePrivacy() {
  const pathArr = window.location.pathname.split('/');
  const fiddleID = pathArr[1].length > 1 ? pathArr[1] : -1;

  if (fiddleID !== -1) {
    return fetch(`/private/${fiddleID}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    }).then(resp => resp.json())
      .then(({ message: e }) => {
        if (e) {
          // message -> error, and if error is not undefined then throw!
          throw new Error(e);
        }
      });
  }

  return Promise.reject(new Error('Looks like your fiddle isn\'t saved!'));
}

export default function install(api) {
  api.prototype.togglePrivacy = togglePrivacy;  // eslint-disable-line
}
