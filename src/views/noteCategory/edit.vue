<template>
  <v-row justify="center">
    <v-dialog v-model="editdialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Update Category</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field v-model="categorydata.category_Name" required label="category Name"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="close()" text> Close </v-btn>
          <v-btn color="blue darken-1" @click="Update()" text> Update </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import Axios from 'axios'
import { commonConfig, postConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config'
export default {
  data: () => ({
    editdialog: true,
  }),

  methods: {
    Update() {
      this.editBody = {
        path: '/NoteCategory/NoteCategoryUpdate',
        method: 'POST',
        data: {
          id: '',
          category_Name: '',
        },
      }
      let requestPath = RepositoryAPI.URL + RepositoryAPI.ServicePath + this.editBody.path
      this.editBody.data.id = this.categorydata.id
      this.editBody.data.category_Name = this.categorydata.category_Name

      Axios.post(requestPath, this.editBody.data)
        .then(response => {
          if (response['data']) {
            this.$root.snackbar.setsuccesstext('Data updated successfully')
            this.close()
          }
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e)
          this.editdialog = false
        })
    },
    close() {
      this.$emit('closeeditdialog', !this.value)
    },

    rowClick: function (item, row) {
      row.select(true)
      this.selectedId = item.id
      this.selectedItem = item
    },
  },

  created() {},
  computed: {
    categorydata: {
      get() {
        return this.$store.state.CategoryInfoData.categorydata
      },
    },
  },
  watch: {
    categorydata: {
      deep: true,
      handler(newValue) {
        this.$store.commit('setCategoryInfo', newValue)
      },
    },
  },
}
</script>