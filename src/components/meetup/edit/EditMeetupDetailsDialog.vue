<template>
  <v-dialog width="350px" persistent v-model="editDialog">
    <v-btn small fab accent slot="activator" class="buttonv2">
      <v-icon>edit</v-icon>
    </v-btn>
    <v-card class="transp_dialog">
      <v-container>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-title><h2>Editar Meetup</h2></v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                color="purple"
                name="title"
                label="Título"
                id="title"
                v-model="editedTitle"
                required>
              </v-text-field>
              <v-text-field
                color="purple"
                name="description"
                label="Descripción"
                id="description"
                v-model="editedDescription"
                multi-line
                required>
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-actions>
              <v-flex xs12 class="text-xs-center hidden-xs-only">
                <v-btn flat round
                  class="_close shs sh text-xs-left"
                  style="margin-right: 0px"
                  @click.native="editDialog = false">Cancelar </v-btn>
                <v-btn flat round
                  class="_save shs sh text-xs-right"
                  style="margin-left: 0px"
                  @click.native="onSaveChanges">Aceptar </v-btn>
              </v-flex>
              <v-flex xs12 class="text-xs-center hidden-sm-and-up">
                <v-btn flat round
                  class="_xsclose shs sh text-xs-left"
                  style="margin-right: 0px"
                  @click.native="editDialog = false">Cancelar </v-btn>
                <v-btn flat round
                  class="_xssave shs sh text-xs-right"
                  style="margin-left: 0px"
                  @click.native="onSaveChanges">Aceptar </v-btn>
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
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editedTitle: this.meetup.title,
        editedDescription: this.meetup.description
      }
    },
    methods: {
      onSaveChanges () {
        if (this.editedTitle.trim() === '' ||
          this.editedDescription.trim() === '') {
          return
        }
        this.editDialog = false
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
      }
    }
  }
</script>

<style scoped>
  h2 {
    font-weight: bolder;
    font-variant: small-caps;
    color: purple;
  }
</style>
