<template>
  <v-container>
    <p class="pc mt-3 mb-3 text-xs-center hidden-xs-only hidden-sm-only">
      Selecciona y Disfruta tu Meetup Favorito</p>
    <p class="tablet mt-3 mb-3 text-xs-center hidden-xs-only hidden-md-and-up">
      Selecciona y Disfruta tu Meetup Favorito</p>
    <p class="phone mt-3 mb-3 text-xs-center hidden-sm-and-up">
      Selecciona y Disfruta tu Meetup Favorito</p>

    <v-layout row wrap class="sh">
      <v-flex xs12>
        <v-progress-circular
          indeterminate
          v-bind:size="70"
          v-bind:width="7"
          color="purple"
          v-if="loading">
        </v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout>
      <v-flex xs12>
        <v-carousel
          style="cursor: pointer"
          v-if="!loading"
          class="xsm hidden-sm-and-up">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key=meetup.id
            @click="onLoadMeetup(meetup.id)">
            <div class="titleSm text-xs-center">
              <h2>{{ meetup.title }}</h2>
            </div>
          </v-carousel-item>
        </v-carousel>
        <v-carousel
          style="cursor: pointer"
          v-if="!loading"
          class="hidden-xs-only">
          <v-carousel-item
            v-for="meetup in meetups"
            :src="meetup.imageUrl"
            :key=meetup.id
            @click="onLoadMeetup(meetup.id)">
            <div class="titleLg text-xs-center">
              <h2>{{ meetup.title }}</h2>
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2 mb-2 hidden-sm-and-up">
      <v-flex xs6 sm6 md6 class="text-xs-center text-sm-right">
        <v-btn round small router to="/meetups" class="button phones">
          Explorar Meetup
        </v-btn>
      </v-flex>
      <v-flex xs6 sm6 class="text-xs-center text-sm-left">
        <v-btn round medium router to="/meetups/new" class="button phones">
          Crear un meetup
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4 mb-3 hidden-xs-only hidden-md-and-up">
      <v-flex xs12 sm6 md6 class="text-xs-center text-sm-right">
        <v-btn round large router to="/meetups" class="button tablets">
          Explorar Meetup
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn round large router to="/meetups/new" class="button tablets">
          Crear un meetup
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-4 mb-3 hidden-xs-only hidden-sm-only">
      <v-flex xs12 sm6 md6 class="text-xs-center text-sm-right">
        <v-btn round large router to="/meetups" class="button pcs">
          Explorar Meetup
        </v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn round large router to="/meetups/new" class="button pcs">
          Crear un meetup
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      meetups () {
        return this.$store.getters.featuredMeetups
      },
      loading () {
        return this.$store.getters.loading
      },
      error () {
        return this.$store.getters.error
      }
    },
    methods: {
      onLoadMeetup (id) {
        this.$router.push('/meetups/' + id)
      }
    }
  }
</script>

<style scoped>
  /* .btn.tablets[data-v-8dc7cce2] {
    color: purple !important;
    margin-right: 14px !important;
    margin-left: 10px !important;
    padding-left: 2.5rem !important;
    padding-right: 2.5rem !important;
    border: 2px solid white !important;
    background-color: #eeeeee !important;
  } */
</style>
