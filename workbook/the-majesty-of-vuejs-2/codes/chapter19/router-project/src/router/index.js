import Vue from 'vue'
import Router from 'vue-router'

import Hello from '@/components/Hello'
import Login from '@/components/Login'

import StoriesPage from '@/components/StoriesPage'
import StoriesAll from '@/components/StoriesAll.vue'
import StoriesFamous from '@/components/StoriesFamous.vue'
import StoriesEdit from '@/components/StoriesEdit.vue'

// 라우터 플러그인을 설치한다.
Vue.use(Router)

// name 속성은 패스 대신 사용할 수 있는 패스를 가리키는 이름입니다.
// 또한 링크를 설정할 때 식별자로 이용할 수 있습니다.
// 예: <router-link :to="{name: 'hello'}" exact>Home</router-link>
const routes = [
  {
    path: '/',
    name: 'hello',
    component: Hello
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/stories',
    // name: 'stories',
    component: StoriesPage,
    // StoriesPage 컴포넌트가 자신의 router-view 영역에 자식 컴포넌트를 교체해 배치합니다.
    children: [
      {
        path: '/',
        name: 'stories.all',
        component: StoriesAll
      },
      // 긴 이름을 별칭을 설정하여 짧게 사용할 수 있습니다.
      {
        path: 'famous',
        name: 'stories.famous',
        alias: '/famous',
        component: StoriesFamous
      },
      {
        path: ':id/edit',
        // 동적 세그먼트가 문자열인 경우를 대비하여 숫자로 형변환을 처리합니다.
        props: (route) => ({ id: Number(route.params.id) }),
        name: 'stories.edit',
        component: StoriesEdit
      }
    ]
  }
]

// 디폴트 설정인 해시 모드 대신 히스토리 모드를 사용합니다.
export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  routes
})
