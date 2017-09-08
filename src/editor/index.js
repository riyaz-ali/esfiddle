/**
 * Application entrypoint module
 */

// import helpers
import { emptyNode, removeClass } from '@/util/DOMHelpers';

// import libs
import Vue from 'vue';

// import API
import $api from './api';

// import stylesheets
import './assets/hint.css';

// import main application class
import App from './App';

// add API as a plugin to Vue
Vue.use($api, { name: '$api' });

// create a new Vue application
const app = new Vue({
  components: {
    App,
  },
  render(h) {
    return h(App, {
      props: {
        examples: [{ title: 'Arrow Functions', code: 'const inc = v => v+1' }],
      },
    });
  },
});

// get the mountpoint
const mountPoint = document.getElementById('es-fiddle');
// clear it and remove the preload class
emptyNode(mountPoint); removeClass(mountPoint, 'preload');
// then mount the application onto it
app.$mount(mountPoint);

// [DEBUG]
window.app = app;
