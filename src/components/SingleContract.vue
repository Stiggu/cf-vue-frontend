<template>
  <div id="SingleContract">
    <v-simple-table dense height="300px">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">

          </th>
          <th class="text-left">
            Nombre
          </th>
          <th class="text-left">
            Fecha
          </th>
          <th class="text-left">
            Origen
          </th>
          <th class="text-left">
            Destino
          </th>
          <th class="text-left">
            Tarifa 20
          </th>
          <th class="text-left">
            Tarifa 40
          </th>
          <th class="text-left">
            Tarifa 40 HC
          </th>
          <th class="text-left">
            Moneda
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(entry, index) in tableData['rates']" v-bind:key="entry.id">
          <td>{{ index + 1 }}</td>
          <td>{{ tableData.name }}</td>
          <td>{{ tableData.date }}</td>
          <td>{{ entry.origin }}</td>
          <td>{{ entry.destination }}</td>
          <td>{{ entry.twenty }}</td>
          <td>{{ entry.forty }}</td>
          <td>{{ entry.fortyhc }}</td>
          <td>{{ entry.currency }}</td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "SingleContract",
  props: ['tableData'],
  mounted() {
  },
  data: () => ({}),
}
</script>

<style scoped>

</style>