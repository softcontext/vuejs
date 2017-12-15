const SERVER_URL = 'http://localhost:3000/movies/';

Vue.component('movie', {
  template: '#template-movie-raw',
  props: ['movie'],
  methods: {
    deleteMovie: function(movie) {
      this.$http.delete(SERVER_URL + movie.id).then(function(response) {
        if (response.ok) {
          var index = this.$parent.movies.indexOf(movie);
          this.$parent.movies.splice(index, 1)
        } else {
          alert('Delete Request Failed! Try Again.')
        }
      })
    },
    editMovie: function(movie) {
      movie.editing = true;
    },
    updateMovie: function(movie) {
      this.$http.patch(SERVER_URL + movie.id, movie).then(function (response) {
        if (response.ok) {
          //Set editing to false to show actions again and hide the inputs
          movie.editing = false;
        } else {
          alert('Update Request Failed! Try Again.')
        }
      })
    },
    storeMovie: function(movie) {
      this.$http.post(SERVER_URL, movie).then(function(response) {
        /*
        After the the new movie is stored in the database fetch again all movies with
        vm.fetchMovies();
        Or Better, update the id of the created movie
        */
        Vue.set(movie, 'id', response.data.id);

        //Set editing to false to show actions again and hide the inputs
        movie.editing = false;
      });
    }
  }
})

new Vue({
  el: '#v-app',
  data: {
    movies: [],
    // movie: {} // 미 사용
  },
  mounted: function() {
    this.fetchMovies()
  },
  methods: {
    createMovie: function() {
      // 새 입력 버튼을 누르자마자 내용이 빈 객체를 배열에 추가한다.
      // 화면이 재 랜더링되면서 이 객체는 id가 존재하지 않으므로 입력화면이 표시된다.
      var newMovie = {
        title: "",
        director: "",
        editing: true
      };
      this.movies.push(newMovie);
      // FIXME: 사용자가 새 데이터를 입력한 후 완료버튼을 누르지 않고 cancel 버튼을
      // 클릭하면 배열에 추가한 내용이 빈 객체를 삭제하는 로직이 추가되어야 한다.
    },
    fetchMovies: function() {
      var vm = this; // 콜백함수 내 함수 context 바인딩 고정처리
      this.$http.get(SERVER_URL).then(function(response) {
        // set data on vm
        var moviesReady = response.data.map(function(movie) {
          movie.editing = false; // 동적으로 편집모드 구분 변수 추가
          return movie
        })
        Vue.set(vm, 'movies', moviesReady) // 변경감지 대상이 되도록 set 함수로 덮어쓰기
      });
    }
  }
});
