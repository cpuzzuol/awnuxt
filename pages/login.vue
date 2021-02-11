<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Login
          {{ authenticated }}
        </v-card-title>
        <v-card-text>
          <v-form v-model="loginForm">
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="loginInfo.username" label="Username"></v-text-field>
                <v-text-field v-model="loginInfo.password" label="Password"></v-text-field>
                <v-btn color="success" @click="login">Login</v-btn>
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
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'login',
  data () {
    return {
      loginForm: false,
      loginInfo: {
        username: 'bobjones',
        password: 'epthnw2y'
      },
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
    ...mapMutations(['setAuthenticated', 'setUser']),
    login () {
      const formData = new FormData()
      formData.append('loginInfo', JSON.stringify(this.loginInfo))

      this.$axios.post('http://localhost:3001/users/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(() => {
          this.setAuthenticated(true)
          this.registrationStatus.success = true
          this.registrationStatus.msg = 'Logged In!'
        })
        .catch(() => {
          this.registrationStatus.success = false
          this.registrationStatus.msg = 'No good!'
        })
    }
  },
  created () {

  }
}
</script>
