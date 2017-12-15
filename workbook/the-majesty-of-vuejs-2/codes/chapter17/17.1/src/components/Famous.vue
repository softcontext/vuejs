<template>
  <div id="famous">
    <h3>Trending stories ({{famous.length}})</h3>
    <ul class="list-group">
      <li v-for="story in famous"  class="list-group-item">
        {{ story.writer }} said "{{ story.plot }}". Story upvotes {{ story.upvotes }}.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['stories'],
  computed: {
    famous () {
      return this.stories.filter(function (item) {
        return item.upvotes > 50
      })
    }
  },
}
</script>
