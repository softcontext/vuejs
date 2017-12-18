import Vue from 'vue'
import App from './App.vue'
import Example from './components/Example.vue'

Vue.config.productionTip = false;

// Vue.js의 템플릿은 실제로 빌드 할 때 render 함수로 컴파일됩니다.
// template은 render 함수를 기반으로 편리한 문법적인 슈가코딩을 제공합니다.
// 더 강력한 render 함수는 가독성 부분이 조금 떨어집니다.

// new Vue({
//   el: '#app',
//   // render: h => h(App)
//   render: h => h(Example)
// })

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})

// Components with render functions do not have a template tag or property.
// Instead they define a function called render that receives
// a createElement(renderElement: String | Component, definition: Object, children: String | Array)
// argument (commonly aliased as h, for some reason, blame JSX) and
// returns an element created with that function. Everything else stays the same.
// https://alligator.io/vuejs/introduction-render-functions/
