<template>
  <v-dialog
    persistent
    width="330px"
    v-model="registerDialog"
    transition="scale-transition">
    <v-btn
      round accent
      class="register buttonv2"
      slot="activator">{{ userIsRegistered ? 'Cancelar Registro' : 'Registrarse' }}
    </v-btn>

    <v-card class="transp_dialog">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title v-if="userIsRegistered">
              <h5 class="bSMT purple--text">Desea cancelar su subscribción de este Meetup ?</h5>
            </v-card-title>
            <v-card-title v-else>
              <h5 class="bSMT purple--text">Desea Registrar este Meetup ?</h5>
            </v-card-title>
          </v-flex>
        </v-layout>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12 class="text-xs-center">
            <v-card-text><h3>Siempre puede cambiar su opción más tarde.</h3></v-card-text>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs12 class="text-xs-center">
            <v-card-actions>
              <v-flex xs12>
                <v-btn flat round
                  class="cancel sh text-xs-left"
                  @click.native="registerDialog = false">Cancelar </v-btn>
                <v-btn flat round
                  class="confirm sh text-xs-right"
                  @click.native="onConfirm">Confirmar </v-btn>
              </v-flex>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetupId'],
    data () {
      return {
        registerDialog: false
      }
    },
    computed: {
      userIsRegistered () {
        return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
          return meetupId === this.meetupId
        }) >= 0
      }
    },
    methods: {
      onConfirm () {
        if (!this.userIsRegistered) {
          this.$store.dispatch('registerUserForMeetup', this.meetupId)
        } else {
          this.$store.dispatch('unregisterUserFromMeetup', this.meetupId)
        }
      }
    }
  }
</script>

<style scoped>
  h3 {
    font-variant: small-caps;
    margin-left: -15px !important;
    /* color: purple; */
  }
  .container {
    padding: 0px !important;
    width: 90%;
  }
</style>
