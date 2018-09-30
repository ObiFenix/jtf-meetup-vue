import Vue from 'vue'
import App from './App'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import router from './router'
import { store } from './store'
import DateFilter from './filters/date'
import Alert from './components/shared/Alert.vue'
import EditMeetupDetailsDialog from './components/meetup/edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/meetup/edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/meetup/edit/EditMeetupTimeDialog.vue'
import RegisterMeetupDialog from './components/meetup/registration/RegisterMeetupDialog.vue'
// import 'vuetify/dist/vuetify.css'

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.filter('date', DateFilter)
Vue.component('app-alert', Alert)
Vue.component('app-edit-single-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-single-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-single-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-register-meetup-dialog', RegisterMeetupDialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAm7002nIbcRXNLz0UHsTQL3WOkZNIr6mQ',
      authDomain: 'jtf-meetup.firebaseapp.com',
      databaseURL: 'https://jtf-meetup.firebaseio.com',
      projectId: 'jtf-meetup',
      storageBucket: 'jtf-meetup.appspot.com'
      // storageBucket: 'gs://jtf-meetup.appspot.com'
      // messagingSenderId: "186684075351"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) { this.$store.dispatch('autoSignIn', user) }
    })
    this.$store.dispatch('loadMeetups')
  }
})
