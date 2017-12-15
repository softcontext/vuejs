<!-- vgc -s src/components/ShowGreetings -->

<template lang="html">

  <section class="src-components-show-greetings">
    <h1>{{ msg }}</h1>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'src-components-show-greetings',
    // props: ['msg'],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {
      msg () {
        return this.$store.state.msg
      }
    }
}
</script>

<!-- SCSS를 사용하기 위해서는 sass-loader, node-sass 디펜던시 설치가 필요하다. -->
<style scoped lang="scss">
  .src-components-show-greetings {

  }
</style>
