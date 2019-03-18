import Vue from 'vue';
import App from './App.vue';

import store from './store';
import router from './routes.js';
import axios from 'axios';

import Vuetify from 'vuetify';

import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'vuetify/dist/vuetify.min.css'; 

Vue.use(Vuetify);

Vue.http = axios.create();


var vm = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});

