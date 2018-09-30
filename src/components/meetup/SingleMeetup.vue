<template>
  <v-container>
    <v-layout row wrap v-if="loading">
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="purple--text"
          :width= "7"
          :size="70">
        </v-progress-circular>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4" v-else>
      <v-flex xs12>
        <v-card class="transp_dialog mb-2 hidden-xs-only">
          <v-card-title>
            <h1>{{ meetup.title }}</h1>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-single-meetup-details-dialog
                round :meetup="meetup">
              </app-edit-single-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="450px">
          </v-card-media>
          <v-card-text>
            <div class="bigf_date_location">
              {{ meetup.date | date}} - {{ meetup.location }}
              <div class="pad" v-if="userIsCreator">
                <app-edit-single-meetup-date-dialog
                  :meetup="meetup">
                </app-edit-single-meetup-date-dialog>
                <app-edit-single-meetup-time-dialog
                  :meetup="meetup">
                </app-edit-single-meetup-time-dialog>
              </div>
            </div>
            <div class="bigf_description"><br>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-meetup-dialog
              :meetupId="meetup.id">
            </app-register-meetup-dialog>
          </v-card-actions>
        </v-card>
        <v-card class="transp_dialog mb-2 hidden-sm-and-up">
          <v-card-title>
            <h2 class="purple--text xsf_mlocation">{{ meetup.title }}</h2>
            <template v-if="userIsCreator">
              <v-spacer></v-spacer>
              <app-edit-single-meetup-details-dialog
                round :meetup="meetup">
              </app-edit-single-meetup-details-dialog>
            </template>
          </v-card-title>
          <v-card-media
            :src="meetup.imageUrl"
            height="250px">
          </v-card-media>
          <v-card-text>
            <div class="xsf_date_location">
              {{ meetup.date | date}} - {{ meetup.location }}
              <div class="pad" v-if="userIsCreator">
                <app-edit-single-meetup-date-dialog
                  :meetup="meetup">
                </app-edit-single-meetup-date-dialog>
                <app-edit-single-meetup-time-dialog
                  :meetup="meetup">
                </app-edit-single-meetup-time-dialog>
              </div>
            </div>
            <div class="xsf_description"><br>{{ meetup.description }}</div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <app-register-meetup-dialog
              :meetupId="meetup.id"
              v-if="userIsCreator">
            </app-register-meetup-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: ['id'],
    computed: {
      meetup () {
        return this.$store.getters.loadedMeetup(this.id)
      },
      loading () {
        return this.$store.getters.loading
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsCreator () {
        if (!this.userIsAuthenticated) { return false }
        return this.$store.getters.user.id === this.meetup.creatorId
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1 {
    font-variant: small-caps;
    color: purple;
  }
</style>
