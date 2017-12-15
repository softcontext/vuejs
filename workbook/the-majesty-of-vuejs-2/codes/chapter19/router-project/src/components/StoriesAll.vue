<template>
  <div class="">
    <h3>All Stories ({{stories.length}})</h3>
    <ul class="list-group">
      <li v-for="story in stories" class="list-group-item">
          <h5>
            {{ story.writer }} said "{{ story.plot }}"
            <span class="badge">{{ story.upvotes }}</span>
          </h5>
          <!-- story.id 값을 'id' 를 키로 삼아 패스변수(동적 세그먼트)로 설정합니다. -->
          <router-link :to="{ name: 'stories.edit', params: { id: story.id }}" tag="button" class="btn btn-default" exact>Edit</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {store} from '../store.js'

export default {
  data () {
    return {
      stories: store.stories
    }
  },
  mounted () {
    console.log('stories')
  }
}
</script>
