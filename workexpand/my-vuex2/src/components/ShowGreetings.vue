<!-- vgc -s src/components/ShowGreetings -->

<template lang="html">

  <section class="src-components-show-greetings">
    <!-- <h1>{{ msg }}</h1> -->
    <h1>{{ getMessage }}</h1>
  </section>

</template>

<script lang="js">
// 저장소의 모든 게터를 컴포넌트에 제공한다.
import { mapGetters } from 'vuex'

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
  // computed: {
  //   msg () {
  //     // return this.$store.state.msg
  //     return this.$store.getters.getMessage
  //   }
  // }
  computed: mapGetters(['getMessage'])
}
</script>

<!-- SCSS를 사용하기 위해서는 sass-loader, node-sass 디펜던시 설치가 필요하다. -->
<style scoped lang="scss">
  .src-components-show-greetings {

  }
</style>
