import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/user/Profile'
import Meetups from '@/components/meetup/Meetups'
import SingleMeetup from '@/components/meetup/SingleMeetup'
import CreateMeetup from '@/components/meetup/CreateMeetup'
import Signin from '@/components/user/Signin'
import Signup from '@/components/user/Signup'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/meetups/new',
      name: 'CreateMeetup',
      component: CreateMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetups/:id',
      name: 'SingleMeetup',
      props: true,
      component: SingleMeetup
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ],
  mode: 'history'
})
