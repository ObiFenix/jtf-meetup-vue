<template>
  <v-container class="purple--text mt-5">
    <v-layout row v-if="error" class="mt-5">
      <v-flex xs12 sm6 md6 lg5 offset-sm3>
        <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout class="mt-3">
      <v-flex xs12 sm6 md6 lg5 offset-sm3>
        <div class="grey--text">
          <h1 class="msize purple--text">
            |<span style="color:#DDDDDD"> Iniciar Sesión</span>
          </h1><br>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex x12>
        <form @submit.prevent="onSignIn">
          <v-layout row>
            <v-flex xs12 sm6 md6 lg5 offset-sm3>
              <v-text-field
                color="purple"
                name="email"
                label="Tu E-mail"
                id="email"
                v-model="email"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 md6 lg5 offset-sm3>
              <v-text-field
                color="purple"
                name="password"
                label="Tu Contraseña"
                hint="Debe tener almenos 8 characters"
                v-model="password"
                min="8"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                :type="e1 ? 'password' : 'text'"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row class="mt-3 text-xs-right">
            <v-flex xs12 sm6 md6 lg5 offset-sm3>
              <v-btn
                round
                type="submit"
                :loading="loading"
                :disable="loading"
                @click.native="loader='loading'"
                class="sIn buttonv2"> Iniciar Sesión
                <span slot=loader class="custom-loader">
                  <v-icon light>cached</v-icon>
                </span>
              </v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        e1: true,
        email: '',
        password: ''
      }
    },
    computed: {
      user () {
        return this.$store.getters.user
      },
      loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
      }
    },
    watch: {
      user (status) {
        if (status !== null && status !== undefined) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      onSignIn () {
        this.$store.dispatch('userSignIn', { email: this.email, password: this.password })
      },
      onDismissed () {
        this.$store.dispatch('clearError')
      }
    }
  }
</script>
