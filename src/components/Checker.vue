<template>
  <v-container class="mt-16" fluid>

    <!--  Alertas  -->
    <v-snackbar v-model="alertSuccess" color="success" timeout="-1">
      Exito.
      <template v-slot:action="{ attrs }">
        <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="alertSuccess = false"
        >
          <v-icon>mdi-checkbox-marked-circle</v-icon>
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="alertFail" color="red accent-2" timeout="-1">
      Fallo.
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

    <!--Form-->
    <v-form v-model="valid" ref="form" lazy-validation>
      <v-row class="text-center">
        <!--    Field: Name    -->
        <v-col cols="12" offset-sm="4" sm="4">
          <v-text-field
              v-model="name"
              hide-details="auto"
              prepend-icon="mdi-card-text-outline"
              :rules="nameRules"
              required
          >
            <template #label>
              Nombre<span class="red--text"><strong> *</strong></span>
            </template>
          </v-text-field>
        </v-col>

        <!--    Field: Date    -->
        <v-col cols="12" offset-sm="4" sm="4">
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="date"
                  label="Fecha"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  required
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                no-title
                scrollable
                color="success"
            >
              <v-btn
                  text
                  color="success"
                  @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  v-model="file"
                  text
                  color="success"
                  @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </v-col>

        <!--    Field: Excel File    -->
        <v-col cols="12" offset-sm="4" sm="4">
          <v-file-input
              label="Archivo"
              accept=".xlsx"
              v-model="file"
              :rules="fileRules"
              show-size
              multiple
              small-chips
          ></v-file-input>
        </v-col>

        <!--    Send & Save    -->
        <v-col cols="12" sm="2" offset-sm="5">
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-btn
                    color="success"
                    block
                    v-on:click="saveData('save/')"
                >
                  Guardar
                </v-btn>
              </v-col>

              <v-col cols="12">
                <v-btn
                    color="primary"
                    block
                    v-on:click="saveData('compare/')"
                >
                  Comparar
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <!--    Send & Compare    -->
      </v-row>
    </v-form>

    <v-container v-if="Object.keys(viewData).length > 0" class="mt-10">
      <SingleContract :tableData="viewData"/>
    </v-container>

    <v-container v-if="Object.keys(compareData).length > 0" class="mt-10">
      <Comparator :tableData="compareData"/>
    </v-container>

  </v-container>
</template>

<script>
import axios from "axios";
import SingleContract from "@/components/SingleContract";
import Comparator from "@/components/Comparator";

export default {
  name: "Checker",
  components: {
    Comparator,
    SingleContract
  },
  data: () => ({
    valid: true,
    name: '',
    menu: false,
    date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
    file: [],
    nameRules: [
      v => !!v || 'El nombre es requerido.',
    ],
    fileRules: [
      v => !!v || 'Al menos un archivo es requerido',
      v => (v.length > 0 && v.length <= 2) || 'Solo se pueden cargar de 1 a 2 archivos.'
    ],
    viewData: {},
    compareData: {},
    alertSuccess: false,
    alertFail: false,
  }),
  methods: {
    readExcel(file) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onerror = () => {
          reader.abort();
          reject(new DOMException("Problem parsing input file."));
        };

        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(file);
      });
    },
    async saveData(location) {

      if (!this.$refs.form.validate()) {
        return
      }

      this.viewData = {};
      this.compareData = {};
      this.alertFail = false;
      this.alertSuccess = false;

      const obj = this;
      const jsonData = {
        name: this.name,
        date: this.date,
        file: []
      };

      for (const fileKey of this.file) {
        const parsed = await this.readExcel(fileKey);
        jsonData['file'].push(parsed);
      }

      axios.post(location, jsonData)
          .then(response => {
            console.log(response.data);
            if (location === 'save/') {
              obj.viewData = response.data;
            } else if (location === 'compare/') {
              obj.compareData = JSON.parse(response.data);
              console.log(obj.compareData)
            }
            obj.alertSuccess = true;
          })
          .catch(error => {
            console.log(error);
            obj.alertFail = true;
          })
    }
  }
}
</script>

<style scoped>

</style>