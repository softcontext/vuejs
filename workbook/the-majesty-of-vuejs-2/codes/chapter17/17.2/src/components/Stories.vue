<template>
  <div>
    <h2>Stories</h2>
    <ul class="list-group">
      <li v-for="story in stories"  class="list-group-item">
        {{ story.writer }} said "{{ story.plot }}". Story upvotes {{ story.upvotes }}.
      </li>
    </ul>
  </div>
</template>

<script>
import {store} from '../store.js'

export default {
  data () {
    return {
      // Bind directly to stories
      stories: store.stories
    }
  }
}
</script>
