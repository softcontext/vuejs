import Vue from 'vue'
import App from './App'

/* eslint-disable no-new */
new Vue({
  // el: 'body',
  el: '#target',
  // 컴포넌트들을 구성하여 엘리먼트의 속성 id가 target인 곳에 랜더링한다.
  // 이 때, id가 target인 엘리먼트는 사라지고 template 엘리먼트로 대체된다.

  template: '<span><App/></span>',
  // 컴포넌트 배치 전략을 template 속성에 설정한다.
  // template 속성을 제거하고 직접 <app></app> 커스텀 태그를 index.html에 설정하면
  // App 컴포넌트가 기동 컴포넌트가 된다.

  components: { App }
  // 뷰 인스턴스에서 사용할 외부 컴포넌트들을 설정한다.
})
