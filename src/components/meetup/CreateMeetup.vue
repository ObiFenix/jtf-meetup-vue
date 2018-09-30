<template>
  <!-- <v-container fluid grid-list-md> -->
  <v-container class="mb-4 mt-5">
    <v-layout row class="mt-3">
      <v-flex xs12 sm6 offset-sm3>
        <div>
          <h1 class="msize purple--text">
            |<span style="color:#DDDDDD"> Crear un Nuevo Meetup</span>
          </h1><br>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex x12>
        <form @submit.prevent="onCreateMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                color="purple"
                name="title"
                label="Título"
                id="title"
                v-model="title"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                color="purple"
                name="location"
                label="Ubicación"
                id="location"
                v-model="location"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn
                round
                raised
                class="upload buttonv2"
                @click="onPickFile"> Upload Image
              </v-btn>
              <input
                type="file"
                style="display: none"
                ref="fileInput"
                @change="onFilePicked"
                accept="image/*">
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="200" width="250">
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field
                color="purple"
                name="description"
                label="Description"
                id="description"
                multi-line
                v-model="description"
                required>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 class="mt-4 mb-2">
              <h2 class="grey--text">Selecciona Fecha y Tiempo</h2>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-2 mt-3">
            <v-flex xs12 sm6 offset-sm3 class="mb-3">
              <v-date-picker
                color="purple"
                locale="es-sp"
                v-model="date">
              </v-date-picker>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="mb-5">
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker
                color="purple"
                locale="es-sp"
                v-model="time"
                format="24hr">
              </v-time-picker>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn round
                class="create_meetup buttonv2 mb-4"
                :disabled="!formIsValid"
                type="submit">Crear Meetup
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
        title: '',
        image: null,
        imageUrl: '',
        location: '',
        description: '',
        date: null,
        time: new Date()
      }
    },
    computed: {
      formIsValid () {
        return this.title !== '' &&
          this.location !== '' &&
          this.description !== ''
      },
      submitableDateTime () {
        const date = new Date(this.date)
        if (typeof this.time === 'string') {
          const hours = this.time.match(/^(\d+)/)[1]
          const minutes = this.time.match(/:(\d+)/)[1]
          date.setHours(hours)
          date.setMinutes(minutes)
        } else {
          date.setHours(this.time.getHours())
          date.setMinutes(this.time.getMinutes())
        }
        return date
      }
    },
    methods: {
      onCreateMeetup () {
        if (!this.formIsValid) { return }
        if (!this.image) { return }
        const meetupData = {
          title: this.title,
          image: this.image,
          location: this.location,
          description: this.description,
          date: this.submitableDateTime
        }
        this.$store.dispatch('createMeetup', meetupData)
        this.$router.push('/meetups')
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      onFilePicked (event) {
        const files = event.target.files
        let fileName = files[0].name
        if (fileName.lastIndexOf('.') <= 0) {
          return alert('Please, must enter a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load', () => {
          this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
      }
    }
  }
</script>
