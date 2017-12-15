<template>
  <div id="app">
    <img src="./assets/logo.png">
    <HelloWorld/>
    <my-footer/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import MyFooter from './components/Footer'

export default {
  name: 'app',
  components: {
    HelloWorld,
    MyFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
