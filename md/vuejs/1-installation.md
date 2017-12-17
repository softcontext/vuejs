# Vue.js 설치

### 호환성 정보

Vue는 ECMAScript 5 기능을 사용하기 때문에 IE8 이하 버전을 지원하지 않습니다. 하지만 모든 ECMAScript 5 호환 브라우저를 지원합니다.

[ECMAScript 5 호환 브라우저](https://caniuse.com/#feat=es5)

### Vue Devtools

Vue를 사용할 때, 브라우저에 Vue Devtools를 설치하세요. Vue 앱을 보다 사용자 친화적으로 검사하고 디버그할 수 있습니다.

[Vue Devtools](https://github.com/vuejs/vue-devtools#vue-devtools)

### 직접 `<script>` 에 추가

다운로드 받아 script 태그에 추가하기만 하면 됩니다. Vue는 전역 변수로 등록됩니다.

> 개발 중에는 최소화 버전을 사용하지 마십시오. 일반적인 실수에 대한 모든 훌륭한 경고를 놓치게됩니다!

[개발용 버전](https://kr.vuejs.org/js/vue.js) 모든 경고 및 디버그 모드 포함

[배포용 버전](https://kr.vuejs.org/js/vue.min.js) 경고가 제거 되고, 30.33kb min+gzip 로 압축하였습니다.

### CDN

추천 : https://unpkg.com/vue는 npm에 올라간 최신 버전을 반영합니다.
https://unpkg.com/vue/에서 npm 패키지의 원본을 찾아 볼 수도 있습니다.

또한 jsDelivr와 cdnjs를 사용할 수 있으나, 두 서비스는 동기화에 시간이 걸리므로 아직 최신 버전을 사용지 못할 수 있습니다.

### NPM

Vue로 대규모 응용 프로그램을 빌드할 때 NPM을 권장합니다. Webpack 또는 Browserify와 같은 모듈 번들러와 잘 작동합니다. Vue는 싱글 파일 컴포넌트를 만들기 위한 도구도 제공합니다.

```
# 최신 안정화 버전
$ npm install vue
```

### CLI

Vue.js는 단일 페이지 응용 프로그램을 빠르게 스캐폴딩하기 위한 공식 CLI를 제공합니다. 현대적인 프론트엔드 워크플로우를 위해 잘 구성된 빌드 설정을 제공합니다. 핫 리로드, lint-on-save 및 프로덕션 준비가 된 빌드로 시작하고 실행하는데 몇 분 밖에 걸리지 않습니다.

```
# vue-cli 설치
$ npm install --global vue-cli

# "webpack" 템플릿을 이용해서 새 프로젝트 생성
$ vue init webpack my-project

# 의존성을 설치하고 실행하세요!
$ cd my-project
$ npm install
$ npm run dev
```

#### Templates

새 프로젝트 생성 시 선택할 수 있는 템플릿 목록은 다음 사이트에서 확인하세요.

[Vuejs templates](https://github.com/vuejs-templates)

* webpack
A full-featured Webpack + vue-loader setup with hot reload, linting, testing & css extraction. vue-loader 는 webpack 에서 사용하는 Vue 컴포넌트 로더입니다.
<br>

  설치시 선택사항
  * ESLint preset : Standard, AirBNB, none (사용자 설정)
  * unit test (Karma + Mocha) (Yes/No)
  * e2e test (Nightwatch) (Yes/No)
<br>

* pwa
PWA template for vue-cli based on the webpack template
<br>

* webpack-simple
A simple Webpack + vue-loader setup for quick prototyping.
<br>

* simple
The simplest possible Vue setup in a single HTML file.
<br>

* browserify
A full-featured Browserify + vueify setup with hot-reload, linting & unit testing.
vueify 는 Browserify 변환을 위한 Vue 컴포넌트입니다.
<br>

* browserify-simple
A simple Browserify + vueify setup for quick prototyping.
<br>
