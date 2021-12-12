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
                class="me-3"
              ></v-img>

              <h2 class="text-2xl font-weight-semibold">Note Management</h2>
            </router-link>
          </v-card-title>

          <!-- title -->
          <v-card-text>
            <p class="text-2xl font-weight-semibold text--primary mb-2">Recover Your Password</p>
          </v-card-text>

          <!-- login form -->
          <v-card-text>
            <v-form>
              <ValidationProvider name="Email" rules="required|email">
                <v-text-field
                  v-model="userObj.email"
                  label="Email"
                  slot-scope="{ errors, valid }"
                  :error-messages="errors"
                  :success="valid"
                ></v-text-field>
              </ValidationProvider>
              <ValidationProvider name="Password" :rules="{ required: true, min: 8 }">
                <v-text-field
                  v-model="userObj.newPassword"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                  @click:append="isPasswordVisible = !isPasswordVisible"
                  label="New Password"
                  slot-scope="{ errors, valid }"
                  placeholder="Enter New Password"
                  :error-messages="errors"
                  :success="valid"
                ></v-text-field>
              </ValidationProvider>
              <v-text-field
                v-model="userObj.otp"
                label="Otp"
                hint="Enter six digit otp code"
                v-if="flag == true"
                placeholder="Enter Six digit OTP Code"
              ></v-text-field>
              <span>{{ otpMsg }}</span>
              <v-btn block @click="ForgotButtonClick()" color="primary" class="mt-6">
                {{ buttontxt }}
              </v-btn>
            </v-form>
          </v-card-text>

          <!-- create new account  -->
          <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
            <span class="me-2"> Already have an account? </span>
            <router-link :to="{ name: 'login' }"> Sign in instead </router-link>
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
import Axios from 'axios'
import { postConfig } from '../../../../public/ApiLib.js'
import { RepositoryAPI } from '../../../../public/config.js'
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'

var ForgotPassAPIBodyData = {
  path: '/Account/ForgetPassword',
  method: 'POST',
  data: {
    email: '',
    newPassword: '',
    otp: '',
  },
}

export default {
  data() {
    return {
      isPasswordVisible: false,
      userObj: {
        email: null,
        otp: null,
        newPassword: null,
      },
      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      socialLink: null,
      otpMsg: null,
      buttontxt: 'Verify',
      flag: false,
      ForgotPassAPIBody: ForgotPassAPIBodyData,
    }
  },
  methods: {
    ForgotPassAPIwithOTP() {
      let config = postConfig(this.ForgotPassAPIBody, RepositoryAPI)
      this.ForgotPassAPIBody.data.email = this.userObj.email
      this.ForgotPassAPIBody.data.newPassword = this.userObj.newPassword
      this.ForgotPassAPIBody.data.otp = this.userObj.otp
      Axios.post(config, this.ForgotPassAPIBody.data)
        .then(response => {
          this.$root.snackbar.setsuccesstext("Password Changed Succeffully")
          this.$router.push({ name: 'login' })
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e.response.data)
          this.flag = false
          this.buttontxt = 'Verify'
        })
    },
    ForgotPassAPI() {
      let config = postConfig(this.ForgotPassAPIBody, RepositoryAPI)
      this.ForgotPassAPIBody.data.email = this.userObj.email
      this.ForgotPassAPIBody.data.newPassword = this.userObj.newPassword
      this.ForgotPassAPIBody.data.otp = this.userObj.otp
      Axios.post(config, this.ForgotPassAPIBody.data)
        .then(response => {
          this.$root.snackbar.setsuccesstext(response.data.otp)
          this.otpMsg = response.data.otp
          this.buttontxt = 'Recover'
          this.flag = true
          //this.$router.push({ name: 'login' })
        })
        .catch(e => {
          this.$root.snackbar.seterrortext(e.response.data)
          this.flag = false
          this.buttontxt = 'Verify'
        })
    },
    async ForgotButtonClick() {
      console.log(this.userObj.otp)
      if (this.userObj.otp == null || this.userObj.otp == undefined || this.userObj.otp == '') {
        let isValid = await this.$refs['form_observer'].validate()
        console.log(isValid)
        if (!isValid) {
          this.$root.snackbar.seterrortext('Please Fill The Required Field')
        } else {
          this.ForgotPassAPI()
        }
        return
      }
      if (this.userObj.otp != null) {
        this.ForgotPassAPIwithOTP()
      }
    },
  },
  created() {},
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
