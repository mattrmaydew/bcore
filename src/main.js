import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import jQuery from 'jquery';
import {
  fb
} from './firebase'
import VueFirestore from 'vue-firestore'
import store from './store.js'
import Vuelidate from 'vuelidate';
Vue.use(Vuelidate);
require('firebase/firestore')

import { VueReCaptcha } from 'vue-recaptcha-v3'

// For more options see below
Vue.use(VueReCaptcha, { siteKey: '6LcvJKkUAAAAAHeEF3OgnatLmnI-w_HHq3jC7D5n' })
 

Vue.use(VueFirestore, {
  key: 'id', // the name of the property. Default is '.key'.
  enumerable: true //  whether it is enumerable or not. Default is true.
})

window.$ = window.jQuery = jQuery;

import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import Vue2Filters from 'vue2-filters'
import Swal from 'sweetalert2';

import VueCarousel from 'vue-carousel'


Vue.use(Vue2Filters)
Vue.use(VueFirestore)
Vue.use(VueCarousel)
window.Swal = Swal;

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

window.Toast = Toast;

Vue.component('Navbar', require('./components/Navbar.vue').default);
Vue.component('add-to-cart', require('./components/AddToCart.vue').default);
Vue.component('mini-cart', require('./components/MiniCart.vue').default);
Vue.component('products-list', require('./sections/ProductList.vue').default);

Vue.config.productionTip = false;

let app = '';

fb.auth().onAuthStateChanged(function (user) {

  if (!app) {
    new Vue({
      router,
      store,
      user,
      render: h => h(App)
    }).$mount("#app");

  }


});