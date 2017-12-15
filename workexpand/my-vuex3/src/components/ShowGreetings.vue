<template lang="html">

  <section class="src-components-show-greetings">
    <h1>{{ getMessage }}</h1>
    <div>
      the message was changed {{ getCounter }} times
    </div>
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
  computed: mapGetters(['getMessage', 'getCounter'])
}
</script>

<!-- SCSS를 사용하기 위해서는 sass-loader, node-sass 디펜던시 설치가 필요하다. -->
<style scoped lang="scss">
  .src-components-show-greetings {

  }
</style>
