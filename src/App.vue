<template>
  <v-app>
    <v-app-bar
        color="success"
        dense
        dark
        absolute
    >

      <v-toolbar-title>Importador/Comparador Excel</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn plain to="/">
        Inicio
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>

    <v-footer padless>
    <v-col
      class="text-right"
      cols="12"
    >
      {{ new Date().getFullYear() }} — <strong>Abel Mundarain</strong>
    </v-col>
  </v-footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
