import '@/plugins/vue-composition-api'
import '@/styles/styles.scss'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router/app-router'
import store from './store'
import '@mdi/font/css/materialdesignicons.css'

import { ValidationProvider, ValidationObserver } from 'vee-validate';
import "./rules/validationRules.js";
import DatePickerWithText from "./components/statistics-card/DatePickerWithText.vue";
import moment from 'moment';
import DateMixin from "./mixins/DateMixin";

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("DatePickerWithText", DatePickerWithText);

Vue.mixin(DateMixin);
Vue.prototype.$moment = moment;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
