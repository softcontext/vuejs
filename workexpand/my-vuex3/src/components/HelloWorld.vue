<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <ShowGreetings></ShowGreetings>
    <ChangeGreetings></ChangeGreetings>
  </div>
</template>

<script>
import store from '../vuex/store'

import ShowGreetings from './ShowGreetings.vue'
import ChangeGreetings from './ChangeGreetings.vue'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  store,
  components: {
    ShowGreetings,
    ChangeGreetings
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
  color: #42b983;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
