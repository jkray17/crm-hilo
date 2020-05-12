import Vue from 'vue'
import VueLidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import tooltipDirective from './directives/tooltip.directive'
import currencyFilter from './filters/currency.filter'
import messagePlugin from './utils/message.plugin'
import Loader from './components/app/Loader'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(VueLidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
    apiKey: "AIzaSyAIZz45AgTPOECWvLgAgi-rVDyE8xnlLaM",
    authDomain: "srm-on-vue.firebaseapp.com",
    databaseURL: "https://srm-on-vue.firebaseio.com",
    projectId: "srm-on-vue",
    storageBucket: "srm-on-vue.appspot.com",
    messagingSenderId: "568014734409",
    appId: "1:568014734409:web:ec6e73a9fd63f2d1366b98"
  }
  // Initialize Firebase
firebase.initializeApp(firebaseConfig)

let app
firebase.auth().onAuthStateChanged( () => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
