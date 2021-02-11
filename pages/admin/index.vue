<template>
   <div>
     <h1>Admin Area</h1>
     {{ authenticated }}
     <p v-if="!authenticated">You are not logged in. Log in <nuxt-link :to="{ name: 'login' }">here</nuxt-link>.</p>
     <p v-else>You should only see this if you're logged in.</p>
   </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'adminIndex',
  computed: {
    ...mapState(['authenticated'])
  }
}
</script>

<style scoped>

</style>
