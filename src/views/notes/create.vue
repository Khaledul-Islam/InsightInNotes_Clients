<template>
  <ValidationObserver ref="form_observer">
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="800px">
        <v-card>
          <v-card-title>
            <span class="text-h5">Create New Notes</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" md="6">
                  <ValidationProvider name="Note Category" :rules="{ required: true }">
                    <v-autocomplete
                      clearable
                      hint="Enter Note Category"
                      :items="categoryList"
                      item-text="category_Name"
                      item-value="id"
                      label="Note Category"
                      @change="SetFlagOnField(noteObj.noteCategoryID)"
                      slot-scope="{ errors, valid }"
                      :error-messages="errors"
                      :success="valid"
                      v-model="noteObj.noteCategoryID"
                    ></v-autocomplete>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="6">
                  <ValidationProvider name="Note Title Name" :rules="{ required: true, max: 50 }">
                    <v-text-field
                      hint="Maximum length 50 character"
                      v-model="noteObj.noteTitle"
                      required
                      label="Note Title Name"
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <ValidationProvider name="Note Description" :rules="{ required: true, max: 100 }">
                    <v-textarea
                      hint="Maximum 100 Character"
                      v-model="noteObj.noteDescription"
                      required
                      label="Note Description"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" md="12">
                  <v-textarea v-model="test" required v-if="bookmarkflag == true" label="Bookmark"></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    v-if="reminderflag == true"
                    v-model="noteObj.reminder"
                    label="Reminder Date"
                    type="datetime-local"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    v-if="todoflag == true"
                    v-model="noteObj.dueDate"
                    label="Due Date"
                    type="datetime-local"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="5">
                  <v-switch
                    v-if="todoflag == true"
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
            <v-btn color="blue darken-1" @click="sendItemToParent()" text> Save </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </ValidationObserver>
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
    categoryListAPIBody: categoryListAPIBodyData,
    categoryList: [],
    noteObj: {
      noteCategoryID: null,
      noteTitle: null,
      noteDescription: null,
      reminder: null,
      dueDate: null,
      isCompleted: false,
      userName: null,
      email: null,
    },

    reminderflag: false,
    todoflag: false,
    bookmarkflag: false,
    test: null,
  }),
  methods: {
    SetFlagOnField(id) {
      if (id == 1) {
        this.reminderflag = false
        this.todoflag = false
        this.bookmarkflag = false
      }
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
    close() {
      this.$emit('closedialog', !this.value)
    },
    async sendItemToParent() {
      let isValid = await this.$refs['form_observer'].validate()
      if (!isValid) {
        this.$root.snackbar.seterrortext('Please Fill The Required Field')
      } else {
        this.$emit('SetItem', this.noteObj)
        this.close()
      }
    },
  },
  created() {
    this.GetCategoryList()
  },
}
</script>
