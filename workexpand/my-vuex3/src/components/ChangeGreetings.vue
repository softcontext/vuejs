<template lang="html">

  <section class="src-components-change-greetings">
    <input type="text" v-bind:value='msg' size="30" @keyup='changeMsg'>
  </section>

</template>

<script lang="js">
import { mapGetters } from 'vuex'
import {CHANGE_MSG} from '../vuex/mutation_types'

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
      // 직접 호출은 불가하고 commit 함수를 통해서 연동해야 한다.
      this.$store.commit(CHANGE_MSG, e.target.value)
    }
  },
  computed: mapGetters({
    msg: 'getMessage'
  })
}
</script>

<style scoped lang="scss">
  .src-components-change-greetings {

  }
</style>
