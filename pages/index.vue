<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
        </v-card-title>
        <v-card-text>
          Local API Data: <br><br>{{ localapidata }}<br><br><br><hr><br><br><br>
          Remote API Data: <br><br>{{ remoteapidata }}
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>

export default {
  data () {
    return {
      localapidata: [],
      remoteapidata: []
    }
  },
  created () {
    this.$axios.get('/internal-api/getJSON?dept=216000')
      .then((r) => {
        this.localapidata = r.data
      })

    this.$axios.get('http://localhost:3001/customers')
      .then((r) => {
        this.remoteapidata = r.data
      })
  }
}
</script>
