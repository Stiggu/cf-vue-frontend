<template>
  <v-container id="Comparator">
    <v-simple-table dense height="300px">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">

          </th>
          <th class="text-left">
            Ruta 1
          </th>
          <th class="text-left">
            Ruta 2
          </th>
        </tr>
        </thead>
        <tbody>
        <tr :style="tableData['check'][parseInt(index)] ? {} : {'color': 'white', 'background-color' : '#CD5C5C'} "
            v-for="(entry, index) in tableData['route1']" v-bind:key="entry.id">
          <td>{{ parseInt(index) + 1 }}</td>
          <td>{{ entry }}</td>
          <td>{{ tableData['route2'][parseInt(index)] }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>

    <p class="mt-3">* Rojo indica que son rutas distintas.</p>
  </v-container>
</template>

<script>
export default {
  name: "Comparator",
  props: ['tableData'],
  data: () => ({}),
}
</script>

<style scoped>

</style>