<template>
  <v-card>
    <v-card-title class="align-start">
      <span>Events On Next Week</span>
      <v-spacer></v-spacer>

      <v-btn icon small class="me-n3 mt-n2">
        <v-icon>
          <!-- {{ icons.mdiDotsVertical }} -->
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="my-7">
      <div class="d-flex align-center">
        <h1 class="text-4xl font-weight-semibold">
          {{ eventCount }}
        </h1>
      </div>
    </v-card-text>

    <v-card-text>
      <div
        v-for="(item, index) in todaysEventList"
        :key="item.noteID"
        :class="`d-flex align-start ${index > 0 ? 'mt-8' : ''}`"
      >
        <v-icon  left> mdi-file </v-icon>
        <div class="d-flex align-center flex-grow-1 flex-wrap">
          <div>
            <h4 class="font-weight-medium">
              {{ item.category_Name }}
            </h4>
            <span class="text-xs text-no-wrap">{{ item.noteTitle }}</span>
          </div>

          <v-spacer></v-spacer>

          <div class="ms-1">
            <p class="text--primary font-weight-medium mb-1">
              {{ item.reminder|| item.dueDate }}
            </p>
            <!-- <v-progress-linear :value="item.progress" :color="item.noteTitle"></v-progress-linear> -->
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiMenuUp } from '@mdi/js'
import Axios from 'axios'
import { commonConfig, postConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config.js'

var GetTodaysEventAPIBodyList = {
  path: '/Reports/WeeklyEvent',
  method: 'GET',
  data: {},
}

export default {
  data() {
    return {
      eventCount: null,
      GetTodaysEventAPIList: GetTodaysEventAPIBodyList,
      todaysEventList: [],
    }
  },
  methods: {
    GetTodaysEventList() {
      let config = commonConfig(this.GetTodaysEventAPIList, RepositoryAPI)
      Axios(config)
        .then(response => {
          this.eventCount = response['data'].length
          this.todaysEventList = response['data']
          console.log(this.todaysEventList)
        })
        .catch(error => {
          this.$root.snackbar.seterrortext(error)
        })
    },
  },
  created() {
    this.GetTodaysEventList()
  },
}
</script>
