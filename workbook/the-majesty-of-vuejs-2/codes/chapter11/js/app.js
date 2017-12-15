var bus = new Vue()

Vue.component('story', {
    template: '#template-story-raw',
    props: ['story'],
    backup: null,
    methods: {
        deleteStory: function (story) {
            // var index = vm.stories.indexOf(story);
            // 자식 컴포넌트에서 부모 자원을 직접 접근할 수 없기 때문에 this.$parent 예약어를 사용한다.
            var index = this.$parent.stories.indexOf(story);
            // JS 객체에서 제거
            this.$parent.stories.splice(index, 1)
            // 서버에 제거를 요청
            this.$http.delete('http://localhost:3000/stories/' + story.id)
        },
        upvoteStory: function (story) {
            story.upvotes++;
            // 서버에 수정을 요청
            // PUT은 해당 자원이 통채로 교체되는 것을, PATCH는 해당 자원의 일부분만 변경되는 것을 의미한다.
            this.$http.patch('http://localhost:3000/stories/' + story.id, story)
        },
        editStory: function (story) {
            story.editing = true;

            this.backup = JSON.parse(JSON.stringify(story));
        },
        cancelStory: function (story) {
            story.editing = false;
            console.log('-----------');

            if (this.backup) {
              story.id = this.backup.id;
              story.plot = this.backup.plot;
              story.writer = this.backup.writer;
              story.upvotes = this.backup.upvotes;
              this.backup = null;
            }

            if (!story.id) {
              bus.$emit('cleanStory', story);
            }
        },
        updateStory: function (story) {
            // 서버에 수정을 요청
            this.$http.patch('http://localhost:3000/stories/' + story.id, story)
            //Set editing to false to show actions again and hide the inputs
            story.editing = false;
        },
        storeStory: function (story) {
            story.editing = false; // 서버에 저장 시 기본 editing 값을 false로 한다.

            // 서버에 입력을 요청
            this.$http.post('http://localhost:3000/stories/', story).then(function (response) {
                // 새로운 이야기가 데이터베이스에 저장되면 모든 이야기를 다시 가져오세요.
                // vm.fetchStories();
                //
                // 더 나은 방법은 만든 이야기의 ID를 업데이트하는 겁니다.
                // 없던 속성이 추가되면 감시대상이 아니었으므로 돔이 수정되지 않습니다.
                // 이럴 때, Vue.set 이나 Vue.delete 를 사용하여 data 를 조작해야 합니다.
                Vue.set(story, 'id', response.data.id);

                // 여기서 false로 설정하는 것은 서버에는 true, 클라이언트는 false가 되어
                // 데이터 동기화가 깨진다. 따라서, 다음 코드는 삭제하고 post 요청전으로 옮겼다.
                //Set editing to false to show actions again and hide the inputs
                // story.editing = false;
            });
        },
    }
})

var vm = new Vue({
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
            this.$http.get('http://localhost:3000/stories')
                .then(function (response) {
                    // set data on vm
                    var storiesReady = response.data.map(function (story) {
                        story.editing = false;
                        return story
                    })
                    Vue.set(vm, 'stories', storiesReady)
                });
        },
    },
    created () {
      bus.$on('cleanStory', function(story) {
        vm.stories.splice(vm.stories.findIndex(function (s) {
          if (!s.id) {
            return true;
          }
          return false;
        }), 1);
      })
    }
});
