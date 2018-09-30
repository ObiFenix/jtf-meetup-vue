<template>
  <v-container class="mt-5">
    <v-layout class="mt-3">
      <v-flex xs12 sm6 offset-sm3>
        <div class="grey--text">
          <h1 class="msize purple--text">
            |<span style="color:#DDDDDD"> Meetups</span>
          </h1><br>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mb-3"
      v-for="meetup in meetups"
      :key="meetup.id">
      <v-flex xs12 sm7 md7 lg6 offset-sm3>
        <v-card style="height: auto">
          <v-container fluid grid-list-lg class="mlayout">
            <v-layout row wrap>
              <v-flex xs4 class="hidden-sm-and-up">
                <v-card-media
                  :src= "meetup.imageUrl"
                  height="90px"
                  contain>
                </v-card-media>
              </v-flex>
              <v-flex xs4 class="hidden-xs-only">
                <v-card-media
                  :src= "meetup.imageUrl"
                  height="130px"
                  contain>
                </v-card-media>
              </v-flex>
              <v-flex xs8>
                <v-card-title class="mtitle text-sm-left">
                  <div style="margin: 1px" class="sh headline">
                    Meetup en <span style="color:purple">{{ meetup.location }}</span>
                    <hr class="purple">
                  </div>
                  <div class="grey--text">{{ meetup.date | date}}</div>
                </v-card-title>
                <v-card-actions>
                  <v-btn small round :to="'/meetups/' + meetup.id" class="mbtn button hidden-sm-and-down">
                    <v-icon left color="grey">arrow_forward</v-icon>Ver Meetup
                  </v-btn>
                  <v-btn small round :to="'/meetups/' + meetup.id" class="xsmbtn button hidden-md-and-up">
                    <v-icon left color="grey">arrow_forward</v-icon>Ver Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.loadedMeetups
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetup/' + id)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .btn .icon--left {
    margin-right: 8px;
  }
</style>
