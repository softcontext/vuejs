<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>Welcome to Routing!</h1>
    <router-link :to="{name: 'hello'}" exact>Home</router-link>
    <router-link :to="{name: 'login'}">Login</router-link>
    <router-link :to="{ name: 'stories.all'}">Stories</router-link>

    <transition enter-active-class="animated slideInLeft">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
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
/* 활성화 된 라우터 링크에 다음 클래스 속성이 자동으로 추가됩니다. */
/* .router-link-active {
  color: green;
} */
.router-link-exact-active {
  font-weight: bold;
}
</style>
