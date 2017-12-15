<template>
  <div id="app">
    <img class="logo" src="./assets/logo.png">
    <!-- <HelloWorld/> -->
    <h1>Welcome to dynamic Components!</h1>
    <hr>
    <Hello/>
    <ul class="nav nav-tabs">
      <!-- set 'active' class conditionally -->
      <li v-for="page in pages" :class="isActivePage(page) ? 'active' : ''">
        <!-- use links to change between tabs -->
        <a href="#" @click="setPage(page)">{{page | capitalize}}</a>
      </li>
    </ul>
    <component :is="activePage"></component>
  </div>
</template>

<script>
import Vue from 'vue'

// import HelloWorld from './components/HelloWorld'
import Hello from './components/Hello.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Stories from './components/Stories.vue'

Vue.filter('capitalize', function (value) {
  // 맨 앞 글자만 대문자로 변경하여 리턴한다.
  return value.charAt(0).toUpperCase() + value.substr(1);
})

export default {
  name: 'app',
  components: {
    // HelloWorld,
    Hello,
    Login,
    Register,
    Stories,
  },
  data () {
    return {
      // the pages we want to render each time
      pages: [
        'stories',
        'register',
        'login'
      ],
      activePage: 'stories'
    }
  },
  methods: {
    setPage (newPage) {
      this.activePage = newPage
    },
    isActivePage (page) {
      return this.activePage === page
    }
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>
