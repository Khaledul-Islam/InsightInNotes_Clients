<template>
  <v-card class="greeting-card">
    <v-row class="ma-0 pa-0">
      <v-col cols="8">
        <v-card-title class="text-no-wrap pt-1 ps-2"> Total Note Category </v-card-title>
        <v-card-subtitle class="text-no-wrap ps-2"> Number of note category in this Project </v-card-subtitle>
        <v-card-text class="d-flex align-center mt-2 pb-2 ps-2">
          <div>
            <p class="text-xl font-weight-semibold primary--text mb-2">
              {{ totalClients }}
            </p>

            <v-btn small color="primary" @click="NotePush()"> Note Category </v-btn>
          </div>
        </v-card-text>
      </v-col>

      <v-col cols="4">
        <v-img
          contain
          height="180"
          width="159"
          :src="require(`@/assets/images/misc/triangle-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
          class="greeting-card-bg"
        ></v-img>
        <v-img
          contain
          height="130"
          max-width="100"
          class="greeting-card-trophy"
          src="@/assets/images/logos/notes.jpg"
        ></v-img>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import Axios from 'axios'
import { commonConfig } from '../../../public/ApiLib'
import { RepositoryAPI } from '../../../public/config'

var TotalNoteCategoryBodyData = {
  path: '/NoteCategory/GetNoteCategories',
  method: 'GET',
  data: {},
}

export default {
  data: () => ({
    totalClients: [],
    TotalNoteCategory: TotalNoteCategoryBodyData,
  }),
  methods: {
    NotePush() {
      this.$router.push('/noteCategory')
    },
    GetTotalClients() {
      let config = commonConfig(this.TotalNoteCategory, RepositoryAPI)
      Axios(config)
        .then(response => {
          this.totalClients = response['data'].length
        })
        .catch(error => {
          this.$root.snackbar.seterrortext(error)
        })
    },
  },

  created() {
    this.GetTotalClients()
  },
}
</script>

<style lang="scss" scoped>
.greeting-card {
  position: relative;
  .greeting-card-bg {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .greeting-card-trophy {
    position: absolute;
    bottom: 10%;
    right: 8%;
  }
}
// rtl
.v-application {
  &.v-application--is-rtl {
    .greeting-card-bg {
      right: initial;
      left: 0;
      transform: rotateY(180deg);
    }
    .greeting-card-trophy {
      left: 8%;
      right: initial;
    }
  }
}
</style>
