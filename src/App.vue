<template>
  <v-app>
    <v-navigation-drawer fixed temporary v-model="drawer">
      <v-list>
        <v-list-tile
          Router
          v-for="item in meetupItems"
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon
              v-html="item.icon"
              class="purple--text">
            </v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title
              v-text="item.title"
              class="black--text sh">
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list>
        <v-list-tile
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon class="purple--text"> exit_to_app </v-icon>
          </v-list-tile-action>
          <v-list-tile-content> Cerar Sesión </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar>
      <v-toolbar-title>
        <router-link
          to="/"
          tag="span"
          style="cursor: pointer">
          <h5 class="brush_SMT hidden-xs-only">ObiFenix Meetups</h5>
          <h5 class="xsbrush_SMT hidden-sm-and-up">ObiFenix Meetups</h5>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-side-icon
        @click.native.stop="drawer = !drawer"
        class="hidden-md-and-up purple--text">
      </v-toolbar-side-icon>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat left
          Router
          v-for="item in meetupItems"
          :key="item.title"
          :to="item.link">
          <v-icon left class="purple--text"> {{ item.icon }} </v-icon>
          <span class="sh">{{ item.title }}</span>
        </v-btn>
        <v-btn flat left
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-icon left class="purple--text"> exit_to_app </v-icon>
          <span class="sh"> Cerar Sesión </span>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
    <v-footer :fixed="true">
      <span class="purple--text"> &copy; 2018 </span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return { drawer: false }
    },
    computed: {
      meetupItems () {
        let meetupItems = [
          { icon: 'face', title: 'Registrarse', link: '/signup' },
          { icon: 'lock_open', title: 'Iniciar Sesión', link: '/signin' }
          // { icon: 'bubble_chart', title: 'Inspire', link: '/' }
        ]
        if (this.userIsAuthenticated) {
          meetupItems = [
            { icon: 'supervisor_account', title: 'Ver Meetups', link: '/meetups' },
            { icon: 'room', title: 'Crear un Meetup', link: '/meetups/new' },
            { icon: 'person', title: 'Perfil', link: '/profile' }
          ]
        }
        return meetupItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null &&
          this.$store.getters.user !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
