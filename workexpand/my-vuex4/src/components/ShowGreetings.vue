<template lang="html">

  <section class="src-components-show-greetings">
    <h1>{{ getMessage }}</h1>
    <div>
      the message was changed {{ getCounter }} times
    </div>
  </section>

</template>

<script lang="js">
import { mapGetters } from 'vuex'

export default  {
  name: 'src-components-show-greetings',
  props: [],
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

<style scoped lang="scss">
  .src-components-show-greetings {

  }
</style>
