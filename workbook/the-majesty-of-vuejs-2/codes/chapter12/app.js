const SERVER_URL = 'http://localhost:3000/stories/';

Vue.component('story', {
    template: '#template-story-raw',
    props: ['story'],
    methods: {
        deleteStory: function (story) {
            var index = this.$parent.stories.indexOf(story);
            this.$parent.stories.splice(index, 1)
            this.$http.delete(SERVER_URL + story.id)
        },
        upvoteStory: function (story) {
            story.upvotes++;
            this.$http.patch(SERVER_URL + story.id, story)
        },
        editStory: function (story) {
            story.editing = true;
        },
        updateStory: function (story) {
            this.$http.patch(SERVER_URL + story.id, story)
            //Set editing to false to show actions again and hide the inputs
            story.editing = false;
        },
        storeStory: function (story) {
            this.$http.post(SERVER_URL, story).then(function (response) {
                /*
                After the the new story is stored in the database fetch again all stories with
                vm.fetchStories();
                Or Better, update the id of the created story
                */
                Vue.set(story, 'id', response.data.id);

                //Set editing to false to show actions again and hide the inputs
                story.editing = false;
            });
        },
    }
})

new Vue({
    el: '#v-app',
    data: {
        stories: [],
        story: {}
    },
    mounted: function () {
        this.fetchStories()
    },
    methods: {
        createStory: function () {
            var newStory = {
                plot: "",
                upvotes: 0,
                editing: true
            };
            this.stories.push(newStory);
        },
        fetchStories: function () {
            var vm = this;
            this.$http.get(SERVER_URL)
                .then(function (response) {
                    // set data on vm
                    var storiesReady = response.data.map(function (story) {
                        story.editing = false;
                        return story
                    })
                    Vue.set(vm, 'stories', storiesReady)
                });
        },
    }
});
