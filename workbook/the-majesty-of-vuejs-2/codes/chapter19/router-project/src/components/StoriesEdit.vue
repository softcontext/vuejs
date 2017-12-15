<template>
  <div>
      <div class="row">
        <div class="col-md-offset-2 col-md-8">
          <h3>Editing</h3>
          <form>
            <div class="form-group col-md-offset-2 col-md-8">
              <input class="form-control" v-model="story.plot">
            </div>
            <div class="form-group col-md-12">
              <button @click="saveChanges(story)" class="btn btn-success">Save changes</button>
              <button @click="goBack" class="btn btn-default">Go back</button>
            </div>
          </form>
        </div>
      </div>
  </div>
</template>

<script>
import {store} from '../store.js'

export default {
  props: ['id'],
  data () {
    return {
      story: {}
    }
  },
  methods: {
    saveChanges (story) {
      // 프로그램적으로 라우터 경로를 변경합니다.
      this.$router.push('/stories')
      console.log('Saved!')
    },
    goBack () {
      // FIXME: 이전 화면으로 돌아가지 않는다.
      this.$router.go(-1)
      // this.$router.back()
      // this.$router.push('/stories')
    },
    isTheOne (story) {
      // return story.id === Number(this.$route.params.id)
      return story.id === this.id
    }
  },
  mounted () {
    this.story = store.stories.find(this.isTheOne)
  }
}
</script>
