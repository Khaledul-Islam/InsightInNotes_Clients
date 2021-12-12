<template>
  <v-card class="mx-auto">
    <v-card-title>Notes</v-card-title>
    <v-spacer></v-spacer>
    <v-card-title>
      <v-row>
        <v-col cols="4" md="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-col>
        <v-col cols="8" md="8" class="text-right">
          <v-btn color="primary" @click="createNew()"><v-icon dark left> mdi-plus-circle </v-icon> create </v-btn>
        </v-col>
      </v-row>
    </v-card-title>
    <v-row>
      <v-col cols="12" md="12">
        <v-data-table
          :headers="headers"
          :items="ApiResponse"
          item-key="noteID"
          :search="search"
          class="elevation-1 pb-5 mt-5"
        >
          <template v-slot:[`item.createDate`]="{ item }">
            <span>{{ convertFromMMDDYYYYwithTimeToDDMMYYYY(item.createDate) }}</span>
          </template>
          <template v-slot:[`item.reminder`]="{ item }">
            <span>{{ convertFromMMDDYYYYwithTimeToDDMMYYYY(item.reminder) }}</span>
          </template>
          <template v-slot:[`item.dueDate`]="{ item }">
            <span>{{ convertFromMMDDYYYYwithTimeToDDMMYYYY(item.dueDate) }}</span>
          </template>
          <template v-slot:[`item.isCompleted`]="{ item }">
            <v-switch @click="isCompleted(item)" v-model="item.isCompleted" inset></v-switch>
          </template>

          <template v-slot:[`item.View`]="{ item }">
            <v-btn class="mx-2" x-small color="success" dark fab @click="rowClickView(item)">
              <v-icon>mdi-eye</v-icon></v-btn
            >
            <v-btn class="mx-2" x-small color="error" dark fab @click="rowClickDelete(item)">
              <v-icon>mdi-delete</v-icon></v-btn
            >
          </template>
        </v-data-table>
      </v-col>
      <CreateModal
        v-if="dialog === true"
        v-model="dialog"
        @SetItem="GetItem($event)"
        @closedialog="Closedialog($event)"
      />
      <ViewModal v-if="viewdialog === true" v-model="viewdialog" @closeviewdialog="Closedialog($event)" />
    </v-row>
  </v-card>
</template>

<script>
import Axios from 'axios'
import { commonConfig, postConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config.js'
import CreateModal from './create.vue'
import ViewModal from './view.vue'

var notesListAPIBodyData = {
  path: '/Notes/GetNotes',
  method: 'GET',
  data: {},
}
var UpdateNoteAPIBodyData = {
  path: '/Notes/UpdateNote',
  method: 'POST',
  data: {
    isCompleted: '',
  },
}

var headersData = [
  {
    text: 'Note ID',
    value: 'noteID',
  },
  {
    text: 'Note Type',
    value: 'noteCategory.category_Name',
  },
  {
    text: 'Note Title',
    value: 'noteTitle',
  },
  {
    text: 'Create Date',
    value: 'createDate',
  },
  {
    text: 'Due Date',
    value: 'dueDate',
  },
  {
    text: 'Remind Date',
    value: 'reminder',
  },
  {
    text: 'Completed?',
    value: 'isCompleted',
  },

  // {
  //   text: 'Reminder',
  //   value: 'reminder',
  // },
  {
    text: '',
    value: 'View',
  },
  {
    text: '',
    value: 'Delete',
  },
]

export default {
  data() {
    return {
      search: '',
      dialog: false,
      viewdialog: false,
      developerName: null,
      isIndex: true,
      selectIndex: null,
      ApiResponse: [],
      headers: headersData,
      notesListAPIBody: notesListAPIBodyData,
      UpdateNoteAPIBody: UpdateNoteAPIBodyData,
      UserName: null,
      UserEmail: null,
    }
  },
  components: {
    CreateModal,
    ViewModal,
  },
  methods: {
    isCompleted(item) {
      let config = postConfig(this.UpdateNoteAPIBody, RepositoryAPI)
      this.UpdateNoteAPIBody.data = item
      Axios.post(config, this.UpdateNoteAPIBody.data)
        .then(response => {
          this.$root.snackbar.setsuccesstext('Task Updated')
        })
        .catch(error => {
          this.$root.snackbar.seterrortext(error)
        })
    },
    formatDate(date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month}-${day}`
    },
    convertFromMMDDYYYYwithTimeToDDMMYYYY(date) {
      if (date) return this.$moment(date, 'YYYY/MM/DD HH:mm:ss').format('DD/MM/YYYY')
      else return null
    },
    saveNotes() {
      this.saveBody = {
        path: '/Notes/CreateNote',
        method: 'POST',
        data: {
          // noteID: 0,
          noteCategoryID: '',
          noteTitle: '',
          noteDescription: '',
          reminder: '',
          dueDate: '',
          isCompleted: '',
          userName: '',
          email: '',
        },
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.saveBody.path
      this.saveBody.data.noteCategoryID = this.selectIndex.noteCategoryID
      this.saveBody.data.noteTitle = this.selectIndex.noteTitle
      this.saveBody.data.noteDescription = this.selectIndex.noteDescription
      this.saveBody.data.reminder = this.selectIndex.reminder
      this.saveBody.data.dueDate = this.selectIndex.dueDate
      this.saveBody.data.isCompleted = this.selectIndex.isCompleted
      this.saveBody.data.userName = this.UserName
      this.saveBody.data.email = this.UserEmail
      Axios.post(requestPath, this.saveBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('Data saved successfully')
            this.GetNoteList()
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e.response.data)
        })
    },
    GetItem(item) {
      this.selectIndex = null
      this.selectIndex = item
      this.saveNotes()
    },
    Closedialog() {
      this.dialog = false
      this.viewdialog = false
    },
    GetNoteList() {
      let config = commonConfig(this.notesListAPIBody, RepositoryAPI)
      Axios(config)
        .then(response => {
          this.ApiResponse = response['data']
        })
        .catch(error => {
          this.$root.snackbar.seterrortext(error)
        })
    },
    createNew() {
      this.dialog = true
    },
    DeleteNotes() {
      this.deleteBody = {
        path: '/Notes/DeleteNote?NoteID=',
        method: 'DELETE',
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.deleteBody.path + this.selectIndex.noteID

      Axios.delete(requestPath, this.deleteBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('deleted successfully')
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e)
        })
    },
    rowClickView(item) {
      this.$store.commit('setNotesInfo', item)
      this.viewdialog = true
    },
    rowClickDelete(item) {
      this.selectIndex = item
      console.log(item)
      const proceed = confirm('Confirm remove?')
      if (proceed) {
        this.DeleteNotes()
        const addressIndex = this.ApiResponse.findIndex(obj => obj.noteID === item.noteID)
        this.ApiResponse.splice(addressIndex, 1)
      }
    },
  },

  created() {
    let data = JSON.parse(sessionStorage.getItem('user'))
    this.UserEmail = data.email
    this.UserName = data.firstName
    this.GetNoteList()
  },
}
</script>
