// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

// Custom Validation
VeeValidate.Validator.extend('verify_coupon', {
  getMessage: (field) => `The ${field} is not a valid coupon.`,
  validate: (value) => new Promise(resolve => {
    const validCoupons = ['SUMMER2018', 'WINTER2018', 'FALL2018'];
    resolve({
      valid: value && (validCoupons.indexOf(value.toUpperCase()) > -1)
    });
  })
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
