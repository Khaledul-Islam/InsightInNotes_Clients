<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Note Details</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-autocomplete
                  :items="categoryList"
                  item-text="category_Name"
                  item-value="id"
                  filled
                  readonly
                  label="Note Category"
                  v-model="noteObj.noteCategoryID"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field filled readonly v-model="noteObj.noteTitle" label="Note Title Name"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="12">
                <v-textarea
                  filled
                  readonly
                  v-model="noteObj.noteDescription"
                  required
                  label="Note Description"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  filled
                  readonly
                  v-if="reminderflag == true"
                  v-model="noteObj.reminder"
                  label="Reminder Date"
                  type="datetime-local"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                <v-text-field
                  filled
                  readonly
                  v-if="todoflag == true"
                  v-model="noteObj.dueDate"
                  label="Due Date"
                  type="datetime-local"
                ></v-text-field>
              </v-col>
              <v-col cols="12" md="5">
                <v-switch
                  v-if="todoflag == true"
                  readonly
                  v-model="noteObj.isCompleted"
                  inset
                  label="Task Completed ?"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="close()" text> Close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Axios from 'axios'
import { commonConfig, postConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config.js'

var categoryListAPIBodyData = {
  path: '/NoteCategory/GetNoteCategories',
  method: 'GET',
  data: {},
}

export default {
  data: () => ({
    dialog: true,
    reminderflag: false,
    todoflag: false,
    bookmarkflag: false,
    categoryListAPIBody: categoryListAPIBodyData,
    categoryList: [],
  }),
  methods: {
    GetCategoryList() {
      let config = commonConfig(this.categoryListAPIBody, RepositoryAPI)
      Axios(config)
        .then(response => {
          this.categoryList = response['data']
        })
        .catch(error => {
          this.$root.snackbar.seterrortext(error)
        })
    },
    SetFlagOnField(id) {
      if (id == 2) {
        this.reminderflag = true
        this.todoflag = false
        this.bookmarkflag = false
      }
      if (id == 3) {
        this.todoflag = true
        this.bookmarkflag = false
        this.reminderflag = false
      }
      if (id == 4) {
        this.bookmarkflag = true
        this.reminderflag = false
        this.todoflag = false
      }
    },
    close() {
      this.$emit('closeviewdialog', !this.value)
      this.$store.commit('resetNotesInfo')
    },
  },

  created() {
    this.GetCategoryList()
  },
  mounted() {
    this.SetFlagOnField(this.noteObj.noteCategoryID)
  },
  computed: {
    noteObj: {
      get() {
        return this.$store.state.NotesInfoData.notesdata
      },
    },
  },
}
</script>
