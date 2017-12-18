<!-- <template lang="html">

  <section class="example">
    <h1>example Component</h1>
  </section>

</template> -->

<script lang="js">
// name 속성의 용도: It is mandatory for recursive components. 또는 디버깅 목적으로 사용.
export default {
  name: 'example',
  props: [],
  mounted() {

  },
  data() {
    return {
      isRed: true
    }
  },
  methods: {

  },
  computed: {

  },
  /*
   * Same as
   * <template>
   *   <div :class="{'is-red': isRed}">
   *     <p>Example Text</p>
   *   </div>
   * </template>
   */
  render(h) {
    return h('div', {
      'class': {
        'is-red': this.isRed
      }
    }, [
      h('p', 'Example Text')
    ])
  }
}
</script>

<style scoped lang="scss">
.example {
    }
</style>
