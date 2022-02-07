<template>
  <v-snackbar v-model="alertFail" color="red accent-2" timeout="-1">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="alertFail = false"
      >
        <v-icon>mdi-checkbox-marked-circle</v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "FailedPopUp",
  props: ['message'],
  data: () => ({
    alertFail: true
  })
}
</script>

<style scoped>

</style>