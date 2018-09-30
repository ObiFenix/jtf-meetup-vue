<template>
  <!-- <v-container fluid grid-list-md> -->
  <v-container class="mt-5">
    <v-layout class="mt-3">
      <v-flex xs12 sm6 offset-sm1>
        <div class="grey--text">
          <h1 class="msize purple--text">
            |<span style="color:#DDDDDD"> Perfil</span>
          </h1><br>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex x12 sm7 md7 lg6 offset-sm1>
        <v-card style="height: auto">
          <v-layout wrap>
            <v-container grid-list class="mlayout" fuid>
              <v-flex x5>
                <v-card-media>
                  <v-layout wrap>
                    <v-flex xs5 offset-sm1 class="text-xs-center">
                      <img :src="imageUrl" max-height="80px" max-width="250px">
                      <input
                      type="file"
                      style="display: none"
                      ref="fileInput"
                      @change="onFilePicked"
                      accept="image/*">
                      <v-btn
                        raised
                        class="upload buttonv2"
                        @click="onPickFile"> Upload Image
                      </v-btn>
                  </v-flex>
                  </v-layout>
                </v-card-media>
              </v-flex>
            </v-container>
          </v-layout>
        </v-card>
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
