<template>
  <ValidationObserver ref="form_observer">
    <div class="auth-wrapper auth-v1">
      <div class="auth-inner">
        <v-card class="auth-card">
          <!-- logo -->
          <v-card-title class="d-flex align-center justify-center py-7">
            <router-link to="/" class="d-flex align-center">
              <v-img
                :src="require('@/assets/images/logos/logoinsight.png')"
                max-height="40px"
                max-width="40px"
                alt="logo"
                contain
                class="me-3 "
              ></v-img>

              <h2 class="text-2xl font-weight-semibold">
                Note Management
              </h2>
            </router-link>
          </v-card-title>

          <!-- title -->
          <v-card-text>
            <p class="text-2xl font-weight-semibold text--primary mb-2">
              Journey starts here 🚀
            </p>
          </v-card-text>

          <!-- login form -->
          <v-card-text>
            <v-form>
              <ValidationProvider name="First Name" :rules="{ required: true, max: 30 }">
                <v-text-field
                  v-model="userObj.firstName"
                  label="First Name"
                  hint="Max Length 30 Character"
                  slot-scope="{ errors, valid }"
                  :error-messages="errors"
                  :success="valid"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="Last Name" :rules="{ max: 30, required: true }">
                <v-text-field
                  v-model="userObj.lastName"
                  slot-scope="{ errors, valid }"
                  :error-messages="errors"
                  :success="valid"
                  hint="Max Length 30 Character"
                  label="Last Name"
                >
                </v-text-field>
              </ValidationProvider>

              <ValidationProvider name="Email" rules="required|email">
                <v-text-field
                  v-model="userObj.email"
                  label="Email"
                  slot-scope="{ errors, valid }"
                  :error-messages="errors"
                  :success="valid"
                ></v-text-field>
              </ValidationProvider>
              <DatePickerWithText v-model="userObj.dob" dateLabel="Date of Birth" :requiredRules="false" />
              <ValidationProvider name="Password" :rules="{ required: true, min: 8 }">
                <v-text-field
                  v-model="userObj.password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  label="Password"
                  slot-scope="{ errors, valid }"
                  :error-messages="errors"
                  :success="valid"
                ></v-text-field>
              </ValidationProvider>
              <v-btn block @click="SignUpButtonClick()" :loading="loading" color="primary" class="mt-6">
                Sign Up
              </v-btn>
            </v-form>
          </v-card-text>

          <!-- create new account  -->
          <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
            <span class="me-2">
              Already have an account?
            </span>
            <router-link :to="{ name: 'login' }">
              Sign in instead
            </router-link>
          </v-card-text>
        </v-card>
      </div>

      <!-- background triangle shape  -->
      <img
        class="auth-mask-bg"
        height="190"
        :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
      />

      <!-- tree -->
      <v-img class="auth-tree" width="247" height="185" src="@/assets/images/misc/tree.png"></v-img>

      <!-- tree  -->
      <v-img class="auth-tree-3" width="377" height="289" src="@/assets/images/misc/tree-3.png"></v-img>
    </div>
  </ValidationObserver>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { ref } from '@vue/composition-api'
import Axios from 'axios'
import { commonConfig, postConfig } from '../../../../public/ApiLib.js'
import { RepositoryAPI } from '../../../../public/config.js'

var RegisterAPIBodyData = {
  path: '/Account/Register',
  method: 'POST',
  data: {
    firstName: '',
    lastName: '',
    email: '',
    dateOfBirth: '',
    password: '',
  },
}

var isExistBodyData = {
  path: '/Account/IsExist?email=',
  method: 'GET',
  data: {},
}
export default {
  data() {
    return {
      isPasswordVisible: null,
      loading: false,
      userObj: {
        firstName: null,
        lastName: null,
        email: null,
        dob: null,
        password: null,
      },
      socialLink: null,
      RegisterAPIBody: RegisterAPIBodyData,
      isExistBody: isExistBodyData,
    }
  },
  methods: {
    isExist() {
      this.isExistBody.path = this.isExistBody.path + this.userObj.email
      let config = commonConfig(this.isExistBody, RepositoryAPI)
      Axios(config)
        .then(response => {})
        .catch(error => {
          this.userObj.email = ''
          this.$root.snackbar.seterrortext(error.response.data)
        })
    },
    formatDate(date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month}-${day}`
    },
    RegisterAPI() {
      this.loading = true
      let config = postConfig(this.RegisterAPIBody, RepositoryAPI)
      this.RegisterAPIBody.data.firstName = this.userObj.firstName
      this.RegisterAPIBody.data.lastName = this.userObj.lastName
      this.RegisterAPIBody.data.email = this.userObj.email
      this.RegisterAPIBody.data.dateOfBirth = this.formatDate(this.userObj.dob)
      this.RegisterAPIBody.data.password = this.userObj.password
      Axios.post(config, this.RegisterAPIBody.data)
        .then(response => {
          this.userObj = {}
          this.loading = false
          this.$root.snackbar.setsuccesstext('Account created successfully.Please sign in')
          this.$router.push({ name: 'login' })
          this.userObj = {}
        })
        .catch(e => {
          this.loading = false
          this.$root.snackbar.seterrortext(e.response.data)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async SignUpButtonClick() {
      let isValid = await this.$refs['form_observer'].validate()
      if (!isValid) {
        this.$root.snackbar.seterrortext('Please Fill The Required Field')
      } else {
        await this.RegisterAPI()
      }
    },
  },
  created() {},
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
