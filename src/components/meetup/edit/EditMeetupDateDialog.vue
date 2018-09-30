<template>
  <v-dialog
    width="290px"
    v-model="editDialog"
    style="padding: 0px"
    transition="scale-transition"
    :close-on-content-click="false">
    <v-btn small round accent
      slot="activator"
      class="edit_datetime button hidden-xs-only">Editar Fecha
    </v-btn>
    <v-btn small round accent
      slot="activator"
      class="xsedit_datetime button hidden-sm-and-up">Editar Fecha
    </v-btn>
    <v-card class="transp_dialog">
      <v-layout row wrap>
        <v-flex xs12>
          <v-date-picker
            color="purple"
            v-model="editableDate"
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
          </v-date-picker>
        </v-flex>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['meetup'],
    data: () => ({
      editDialog: false,
      editableDate: null
    }),
    created () {
      this.editableDate = new Date(this.meetup.date)
    },
    methods: {
      onSaveChanges () {
        const newDate = new Date(this.meetup.date)
        const newDay = new Date(this.editableDate).getUTCDate()
        const newMonth = new Date(this.editableDate).getUTCMonth()
        const newYear = new Date(this.editableDate).getUTCFullYear()
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          date: newDate
        })
      }
    }
  }
</script>

<style scoped>
  h3 {
    font-weight: bolder;
    font-variant: small-caps;
    margin-left: -15px !important;
    color: purple;
  }
  .container {
    flex: 1 1 100%;
    font-size: 14px;
    margin: auto;
    height: fit-content !important;
    justify-content: center !important;
    padding: 0px !important;
    width: 85%;
  }
</style>
