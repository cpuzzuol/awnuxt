<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Welcome to the Vuetify + Nuxt.js template
          {{ authenticated }}
        </v-card-title>
        <v-card-text>
          Local API Data: <br><br>{{ localapidata }}<br><br><br><hr><br><br><br>
          Remote API Data: <br><br>{{ remoteapidata }}<br><br><br>
          <v-form v-model="userForm">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="newUser.firstName" label="First Name"></v-text-field>
                <v-text-field v-model="newUser.lastName" label="Last Name"></v-text-field>
                <v-text-field v-model="newUser.email" label="Email Address"></v-text-field>
                <v-text-field v-model="newUser.username" label="Username"></v-text-field>
                <v-text-field v-model="newUser.password" label="Password"></v-text-field>
                <v-btn color="success" @click="registerUser">Register</v-btn>
                <p v-if="registrationStatus.success === true" class="success--text">{{ registrationStatus.msg }}</p>
                <p v-if="registrationStatus.success === false" class="error--text">{{ registrationStatus.msg }}</p>
              </v-col>
            </v-row>
          </v-form>
          <v-row></v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      localapidata: [],
      newUser: {
        firstName: 'Rod',
        lastName: 'Gonzalez',
        email: 'rg@da.com',
        username: 'therod',
        password: 'epthnw2y2'
      },
      remoteapidata: [],
      userForm: false,
      registrationStatus: {
        success: null,
        msg: ''
      }
    }
  },
  computed: {
    ...mapState(['authenticated', 'user'])
  },
  methods: {
    registerUser () {
      const formData = new FormData()
      formData.append('newUser', JSON.stringify(this.newUser))

      this.$axios.post('http://localhost:3001/users/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => {
          this.registrationStatus.success = true
          this.registrationStatus.msg = 'User registered!'
          this.newUser = {
            firstName: '',
            lastName: '',
            email: '',
            username: '',
            password: ''
          }
        })
        .catch(() => {
          this.registrationStatus.success = false
          this.registrationStatus.msg = 'Failed registering user!'
        })
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
