const SERVER_URL = 'http://localhost:3000/data/';

Vue.component('story', {
    template: '#template-story-raw',
    props: ['story'],
    methods: {
        deleteStory: function (story) {
            var index = this.$parent.stories.indexOf(story)
            this.$parent.stories.splice(index, 1) // bug FIXED!
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
        pagination: {},
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
        fetchStories: function (page_url) {
            var vm = this;
            page_url = page_url || SERVER_URL
            console.log('page_url = '+page_url);

            this.$http.get(page_url).then(function (response) {
                console.log(response);
                var storiesReady = response.data.data.map(function (story) {
                    story.editing = false;
                    return story
                })
                vm.makePagination(response.data)

                // this.stories = storiesReady
                // 페이징을 지원하는 실 서버가 아니므로 2번째 페이지 내용만 잘라서 사용합니다.
                this.stories = storiesReady.splice(5, 5);
            });
        },
        makePagination(data){
            //here we use response.data
            var pagination = {
                current_page: data.current_page,
                last_page: data.last_page,
                next_page_url: data.next_page_url,
                prev_page_url: data.prev_page_url
            }
            this.pagination = pagination
        }
    }
});
