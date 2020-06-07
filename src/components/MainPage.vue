<template>
  <div>
    <Data v-if="isLogged" @loggout="isLogged = false" />
    <Login v-else @login="isLogged = true" />
  </div>
</template>

<script>
import Data from "./Data";
import Login from "./Login";
export default {
  components: {
    Data,
    Login
  },
  data() {
    return {
      isLogged: false
    };
  }
};
</script>

<style>
</style>