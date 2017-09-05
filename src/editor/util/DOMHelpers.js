/**
 * Utility functions to help with DOM-stuff
 */

/* function emptyNode: remove all children from the node */
export function emptyNode(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.lastChild);
  }
}

/* function removeClass: remove class(es) from the node */
export function removeClass(node, cls) {
  (Array.isArray(cls) ? cls : [cls]).forEach(c => node.classList.remove(c));
}
