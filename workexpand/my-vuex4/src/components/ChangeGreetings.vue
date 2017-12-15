<template lang="html">

  <section class="src-components-change-greetings">
    <!-- <input type="text" v-bind:value='msg' size="30" @keyup='changeMessage($event.target.value)' @keyup.enter='incrementCounter'> -->
    <input :value='msg' size="30" @keyup='handleMessageInputChanges($event)' />
  </section>

</template>

<script lang="js">
import { mapGetters, mapActions } from 'vuex'

export default  {
  name: 'src-components-change-greetings',
  props: [],
  mounted() {

  },
  data() {
    return {

    }
  },
  methods: mapActions(['changeMessage', 'incrementCounter', 'handleMessageInputChanges']),
  computed: mapGetters({
    msg: 'getMessage'
  })
}
</script>

<style scoped lang="scss">
  .src-components-change-greetings {

  }
</style>
