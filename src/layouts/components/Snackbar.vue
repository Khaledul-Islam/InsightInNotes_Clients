<template>
  <v-snackbar
    v-model="snackbar"
    :vertical="vertical"
    timeout="4000"
    :color="snackbarColor"
    bottom
    right
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  name: "BaseMaterialSnackbar",
  data() {
    return {
      multiLine: true,
      snackbar: false,
      snackbarColor: "warning",
      text: ``,
      vertical: true,
    };
  },
  watch: {},
  methods: {
    //show error message
    seterrortext(text = 'There was an unexpected error. Please contact with system Administrator.') {
      this.text = text;
      this.snackbar = true;
      this.snackbarColor = 'error';
    },
    //show Success message
    setsuccesstext(text = 'The operation was completed successfully.') {
      this.text = text;
      this.snackbar = true;
      this.snackbarColor = 'success';
    },
  },
};
</script>
<style>
.snackbar-padding{
  padding-right: 20%;
}
</style>
