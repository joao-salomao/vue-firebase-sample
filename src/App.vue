<template>
  <div id="app">
    <MainPage />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import MainPage from "./components/MainPage.vue";

export default {
  name: "App",
  components: {
    MainPage
  }
};
</script>
