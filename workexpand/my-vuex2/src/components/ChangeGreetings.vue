<!-- vgc -s src/components/ChangeGreetings -->

<template lang="html">

  <section class="src-components-change-greetings">
    <!-- <input type="text" v-model='msg' size="30"> -->
    <input type="text" v-bind:value='msg' size="30" @keyup='changeMsg'>
  </section>

</template>

<script lang="js">
import { mapGetters } from 'vuex'

export default  {
  name: 'src-components-change-greetings',
  // props: ['msg'],
  mounted() {

  },
  data() {
    return {

    }
  },
  methods: {
    changeMsg(e){
      // store.js > mutations 객체가 가진 changeMessage 함수를 호출한다.
      this.$store.commit('changeMessage', e.target.value)
    }
  },
  // computed: {
  //   msg () {
  //     // return this.$store.state.msg
  //     return this.$store.getters.getMessage
  //   }
  // }
  computed: mapGetters({
    msg: 'getMessage'
  })
}
</script>

<style scoped lang="scss">
  .src-components-change-greetings {

  }
</style>
