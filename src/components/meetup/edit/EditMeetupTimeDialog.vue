<template>
  <v-dialog
    v-model="editDialog"
    style="padding: 0px"
    width="290px"
    :close-on-content-click="false">
    <v-btn small round accent
      slot="activator"
      class="edit_datetime button hidden-xs-only">Editar Hora
    </v-btn>
    <v-btn small round accent
      slot="activator"
      class="xsedit_datetime button hidden-sm-and-up">Editar Hora
    </v-btn>
    <v-card class="transp_dialog">
      <v-layout row wrap>
        <v-flex xs12>
          <v-time-picker
            v-model="editableTime"
            color="purple"
            format="24h"
            scrollable actions>
            <template slot-scope="{ save, cancel }">
              <v-card-actions>
                <v-flex xs12 class="text-xs-center hidden-xs-only">
                  <v-btn flat round
                    class="close shs sh text-xs-right"
                    @click.native="editDialog = false">Cancelar </v-btn>
                  <v-btn flat round
                    class="save shs sh text-xs-left"
                    @click.native="onSaveChanges">Aceptar </v-btn>
                </v-flex>
                <v-flex xs12 class="text-xs-center hidden-sm-and-up">
                  <v-btn flat round
                    class="xsclose shs sh text-xs-left"
                    @click.native="editDialog = false">Cancelar </v-btn>
                  <v-btn flat round
                    class="xssave shs sh text-xs-right"
                    @click.native="onSaveChanges">Aceptar </v-btn>
                </v-flex>
              </v-card-actions>
            </template>
          </v-time-picker>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data () {
      return {
        editDialog: false,
        editableTime: null
      }
    },
    created () {
      this.editableTime = new Date(this.meetup.date).toTimeString()
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const hours = this.editableTime.match(/^(\d+)/)[1]
        const minutes = this.editableTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    }
  }
</script>

<style scoped>
  h3{
    font-weight: bolder;
    font-variant: small-caps;
    margin-left: -15px !important;
    color: purple;
  }
</style>
