# JWT(Json Web Token)

이 문서에 저작권은 다음사이트에 있습니다. 이 문서는 수업의 도움을 주고자 제공됩니다.
https://velopert.com/2350

### 소개
토큰(Token) 기반 인증은 모던 웹서비스에서 정말 많이 사용되고 있습니다. 여러분이 API 를 사용하는 웹서비스를 개발한다면, 토큰을 사용하여 유저들의 인증작업을 처리하는것이 가장 좋은 방법입니다.

토큰 기반 인증 시스템을 선택하는데에는 여러가지 이유가 있는데요, 그 중 주요 이유들은 다음과 같습니다

#### Stateless 서버
Stateless 서버를 이해하려면 먼저 Stateful 서버가 무엇인지 알아야합니다. Stateful 서버는 클라이언트에게서 요청을 받을 때 마다, 클라이언트의 상태를 계속해서 유지하고, 이 정보를 서비스 제공에 이용합니다. stateful 서버의 예제로는 세션을 유지하는 웹서버가 있습니다. 예를들어 유저가 로그인을 하면, 세션에 로그인이 되었다고 저장을 해 두고, 서비스를 제공 할 때에 그 데이터를 사용하지요. 여기서 이 세션은, 서버컴퓨터의 메모리에 담을 때도 있고, 데이터베이스 시스템에 담을 때도 있습니다. Stateless 서버는 반대로, 상태를 유지 하지 않습니다. 상태정보를 저장하지 않으면, 서버는 클라이언트측에서 들어오는 요청만으로만 작업을 처리합니다. 이렇게 상태가 없는 경우 클라이언트와 서버의 연결고리가 없기 때문에 서버의 확장성 (Scalability) 이 높아집니다.

#### 모바일 어플리케이션에 적합하다
만약에 Android / iOS 모바일 어플리케이션을 개발 한다면, 안전한 API 를 만들기 위해선 쿠키같은 인증시스템은 이상적이지 않습니다. (쿠키 컨테이너를 사용해야하죠). 토큰 기반 인증을 도입한다면, 더욱 간단하게 이 번거로움을 해결 할 수 있습니다.

#### 인증정보를 다른 어플리케이션으로 전달
대표적인 예제로는, OAuth 가 있습니다. 페이스북/구글 같은 소셜 계정들을 이용하여 다른 웹서비스에서도 로그인 할 수 있게 할 수 있습니다.

#### 보안
토큰 기반 인증 시스템을 사용하여 어플리케이션의 보안을 높일 수 있습니다. 단, 이 토큰 기반 인증을 사용한다고 해서 무조건 해킹의 위험에서 벗어나는건 아닙니다.


### 토큰 기반 인증 시스템을 사용하는 서비스들
토큰 기반 인증 시스템은 여러분이 알고있는 많은 서비스들에서 사용되고있습니다.

![twitter](./img/twitter.png)![face-book](./img/fb.png)![github](./img/github.png)![google-plus](./img/googleplus.png)


# 왜 토큰을 사용하게 돼었을까?
토큰 기반 인증 시스템이 어떻게 작동하고, 또 이로 인하여 얻을 수 있는 이득에 대하여 알아보기전에, 이 토큰 기반 인증 시스템이 어쩌다가 나타났는지 알아봅시다. 이를 위해선, 과거의 인증시스템이 어떤 방식으로 작동했는지 살펴볼 필요가 있습니다.

### 서버 기반 인증
기존의 인증 시스템에서는 서버측에서 유저들의 정보를 기억하고 있어야합니다. 이 세션을 유지하기 위해서는 여러가지 방법이 사용됩니다. 메모리 / 디스크 / 데이터베이스 시스템에 이를 담곤 하죠.

서버 기반 인증 시스템의 흐름을 보자면 다음과 같습니다.

![back-end](./img/bb.png)

이런 방식의 인증 시스템은 아직도 많이 사용 되고 있습니다. 하지만, 요즘 웹 / 모바일 웹 어플리케이션들이 부흥하게 되면서, 이런 방식의 인증 시스템은 문제를 보이기 시작했습니다. 예를 들자면, 서버를 확장하기가 어려웠죠.

### 서버 기반 인증의 문제점
#### 세션
유저가 인증을 할 때, 서버는 이 기록을 서버에 저장을 해야합니다. 이를 세션 이라고 부릅니다. 대부분의 경우엔 메모리에 이를 저장하는데, 로그인 중인 유저의 수가 늘어난다면 어떻게될까요? 서버의 램이 과부화가 되겠지요? 이를 피하기 위해서, 세션을 데이터베이스에 시스템에 저장하는 방식도 있지만, 이 또한 유저의 수가 많으면 데이터베이스의 성능에 무리를 줄 수 있습니다.

#### 확장성
세션을 사용하면 서버를 확장하는것이 어려워집니다. 여기서 서버의 확장이란, 단순히 서버의 사양을 업그레이드 하는것이 아니라, 더 많은 트래픽을 감당하기 위하여 여러개의 프로세스를 돌리거나, 여러대의 서버 컴퓨터를 추가 하는것을 의미합니다. 세션을 사용하면서 분산된 시스템을 설계하는건 불가능한것은 아니지만 과정이 매우 복잡해집니다.

#### CORS (Cross-Origin Resource Sharing)

웹 어플리케이션에서 세션을 관리 할 때 자주 사용되는 쿠키는 단일 도메인 및 서브 도메인에서만 작동하도록 설계되어있습니다. 따라서 쿠키를 여러 도메인에서 관리하는것은 좀 번거롭습니다.

# 토큰 기반 시스템의 작동 원리
토큰 기반 시스템은 stateless 합니다. 무상태. 즉 상태유지를 하지 않는다는 것이죠. 이 시스템에서는 더 이상 유저의 인증 정보를 서버나 세션에 담아두지 않습니다. 이 개념 하나만으로도 위에서 서술한 서버에서 유저의 인증 정보를 서버측에 담아둠으로서 발생하는 많은 문제점들이 해소됩니다.

세션이 존재하지 않으니, 유저들이 로그인 되어있는지 안되어있는지 신경도 쓰지 않으면서 서버를 손쉽게 확장 할 수 있겠죠?

토큰 기반 시스템의 구현 방식은 시스템마다 크고작은 차이가 있겠지만, 대략적으로 보면 다음과 같습니다:

1. 유저가 아이디와 비밀번호로 로그인을 합니다
2. 서버측에서 해당 계정정보를 검증합니다.
3. 계정정보가 정확하다면, 서버측에서 유저에게 signed 토큰을 발급해줍니다.
여기서 signed 의 의미는 해당 토큰이 서버에서 정상적으로 발급된 토큰임을 증명하는 signature 를 지니고 있다는 것입니다
4. 클라이언트 측에서 전달받은 토큰을 저장해두고, 서버에 요청을 할 때 마다, 해당 토큰을 함께 서버에 전달합니다.
5. 서버는 토큰을 검증하고, 요청에 응답합니다.

![](./img/token-diagram.png)

# 토큰의 장점
### 무상태(stateless) 이며 확장성(scalability)이 있다
이 개념에 대해선 지금 반복적으로 이야기하고 있죠? 이는 그만큼 토큰 기반 인증 시스템의 중요한 속성입니다. 토큰은 클라이언트사이드에 저장하기때문에 완전히 stateless 하며, 서버를 확장하기에 매우 적합한 환경을 제공합니다. 만약에 세션을 서버측에 저장하고 있고, 서버를 여러대를 사용하여 요청을 분산하였다면, 어떤 유저가 로그인 했을땐, 그 유저는 처음 로그인했었던 그 서버에만 요청을 보내도록 설정을 해야합니다. 하지만, 토큰을 사용한다면, 어떤 서버로 요청이 들어가던, 이제 상관이 없죠.

### 보안성
클라이언트가 서버에 요청을 보낼 때, 더 이상 쿠키를 전달하지 않음으로 쿠키를 사용함으로 인해 발생하는 취약점이 사라집니다. 하지만, 토큰을 사용하는 환경에서도 취약점이 존재 할 수 있으니 언제나 취약점에 대비해야 합니다.

### Extensibility (확장성)
여기서의 확장성은, Scalability 와는 또 다른 개념입니다. Scalability 는 서버를 확장하는걸 의미하는 반면, Extensibility 는 로그인 정보가 사용되는 분야를 확장하는것을 의미합니다. 토큰을 사용하여 다른 서비스에서도 권한을 공유 할 수 있습니다. 예를 들어서, 스타트업 구인구직 웹서비스인 로켓펀치에서는 Facebook, LinkedIn, GitHub, Google 계정으로 로그인을 할 수 있습니다. 토큰 기반 시스템에서는, 토큰에 선택적인 권한만 부여하여 발급을 할 수 있습니다 (예를들어서 로켓펀치에서 페이스북 계정으로 로그인을 했다면, 프로필 정보를 가져오는 권한은 있어도, 포스트를 작성 할 수 있는 권한은 없죠)

### 여러 플랫폼 및 도메인
서버 기반 인증 시스템의 문제점을 다룰 때 CORS 에 대하여 언급 했었죠? 어플리케이션과 서비스의 규모가 커지면, 우리는 여러 디바이스를 호환 시키고, 더 많은 종류의 서비스를 제공하게 됩니다. 토큰을 사용한다면, 그 어떤 디바이스에서도, 그 어떤 도메인에서도, 토큰만 유효하다면 요청이 정상적으로 처리 됩니다. 서버측에서 어플리케이션의 응답부분에 다음 헤더만 포함시켜주면 되지요.

`Access-Control-Allow-Origin: *`

이런 구조라면, assets 파일들(이미지, css, js, html 파일 등)은 모두 CDN 에서 제공을 하도록 하고, 서버측에서는 오직 API만 다루도록 하도록 설계 할 수도 있지요.

### 웹 표준 기반
토큰 기반 인증 시스템의 구현체인 JWT는 웹 표준 [RFC 7519](https://tools.ietf.org/html/rfc7519) 에 등록이 되어있습니다. 따라서 여러 환경에서 지원이 되며 (.NET, Ruby, Java, Node.js, Python, PHP …) 수많은 회사의 인프라스트럭쳐에서 사용 되고 있습니다 (구글, 마이크로소프트 …)

# 마치면서..
이번 포스트에서는 토큰 기반 인증 시스템에 대한 소개, 그리고 기존의 시스템과 어떠한 차이가 있는지에 대하여 알아보았습니다. 다음 포스트에서는, 이번에 배운 시스템의 구현체인 JWT (JSON Web Token) 에 대해서 알아보고, 그 시스템에서 사용하는 토큰의 구조를 살펴보도록 하겠습니다.

# Reference
Stateless vs Stateful Servers
http://orca.st.usm.edu/~seyfarth/network_pgm/net-6-3-3.html

Cookies vs Tokens. Getting auth right with Angular.JS
https://auth0.com/blog/angularjs-authentication-with-cookies-vs-token/

확장성 있는 웹 아키텍처와 분산 시스템
http://d2.naver.com/helloworld/206816

What is token based authentication?
http://stackoverflow.com/questions/1592534/what-is-token-based-authentication

REST API의 이해와 설계 #1-개념 소개
http://bcho.tistory.com/953

The Ins and Outs of Token Based Authentication
https://scotch.io/tutorials/the-ins-and-outs-of-token-based-authentication#introduction

Token-based authentication: security considerations
http://www.kieranpotts.com/blog/token-authentication-security

***

# JSON Web Token 이 뭘까?
### 기본 정보
JSON Web Token (JWT) 은 웹표준 (RFC 7519) 으로서 두 개체에서 JSON 객체를 사용하여 가볍고 자가수용적인 (self-contained) 방식으로 정보를 안전성 있게 전달해줍니다.

### 수많은 프로그래밍 언어에서 지원됩니다
JWT 는 C, Java, Python, C++, R, C#, PHP, JavaScript, Ruby, Go, Swift 등 대부분의 주류 프로그래밍 언어에서 지원됩니다.

### 자가 수용적 (self-contained) 입니다
JWT 는 필요한 모든 정보를 자체적으로 지니고 있습니다. JWT 시스템에서 발급된 토큰은, 토큰에 대한 기본정보, 전달 할 정보 (로그인시스템에서는 유저 정보를 나타내겠죠?) 그리고 토큰이 검증됐다는것을 증명해주는 signature 를 포함하고있습니다.

### 쉽게 전달 될 수 있습니다
JWT 는 자가수용적이므로, 두 개체 사이에서 손쉽게 전달 될 수 있습니다. 웹서버의 경우 HTTP의 헤더에 넣어서 전달 할 수도 있고, URL 의 파라미터로 전달 할 수도 있습니다.

# JWT 는 어떤 상황에서 사용될까?
다음과 같은 상황에서 JWT 가 유용하게 사용 될 수 있습니다:

* 회원 인증: JWT 를 사용하는 가장 흔한 시나리오 입니다. 유저가 로그인을 하면, 서버는 유저의 정보에 기반한 토큰을 발급하여 유저에게 전달해줍니다. 그 후, 유저가 서버에 요청을 할 때 마다 JWT를 포함하여 전달합니다. 서버가 클라이언트에게서 요청을 받을때 마다, 해당 토큰이 유효하고 인증됐는지 검증을 하고, 유저가 요청한 작업에 권한이 있는지 확인하여 작업을 처리합니다.
서버측에서는 유저의 세션을 유지 할 필요가 없습니다. 즉 유저가 로그인되어있는지 안되어있는지 신경 쓸 필요가 없고, 유저가 요청을 했을때 토큰만 확인하면 되니, 세션 관리가 필요 없어서 서버 자원을 많이 아낄 수 있죠.
* 정보 교류: JWT는 두 개체 사이에서 안정성있게 정보를 교환하기에 좋은 방법입니다. 그 이유는, 정보가 sign 이 되어있기 때문에 정보를 보낸이가 바뀌진 않았는지, 또 정보가 도중에 조작되지는 않았는지 검증할 수 있습니다.

# JWT 의 생김새
JWT 는 . 을 구분자로 3가지의 문자열로 되어있습니다. 구조는 다음과 같이 이루어져있습니다:
![JWT](./img/jwt.png)
자, 그럼 이렇게 3가지 부분으로 나뉘어져 있는 토큰을 하나하나 파헤쳐봅시다.
> JWT 토큰을 만들때는 JWT 를 담당하는 라이브러리가 자동으로 인코딩 및 해싱 작업을 해줍니다. 하지만 이 포스트에서는 JWT 토큰이 만들어지는 과정을 더 잘 파악하기 위해 하나하나 Node.js 환경에서 인코딩 및 해싱을 하도록 하겠습니다.

# 헤더 (Header)
Header 는 두가지의 정보를 지니고 있습니다.

typ: 토큰의 타입을 지정합니다. 바로 JWT 이죠.

alg: 해싱 알고리즘을 지정합니다.  해싱 알고리즘으로는 보통 HMAC SHA256 혹은 RSA 가 사용되며, 이 알고리즘은, 토큰을 검증 할 때 사용되는 signature 부분에서 사용됩니다.

한번, 이 예제를 살펴보세요 :
```
{
  "typ": "JWT",
  "alg": "HS256"
}
```

(위 예제에서는 HMAC SHA256 이 해싱 알고리즘으로 사용됩니다)

이 정보를 base64 로 인코딩을 하면 다음과 같습니다.

Node.js 환경에서 인코딩하기
```
const header = {
  "typ": "JWT",
  "alg": "HS256"
};

// encode to base64
const encodedPayload = new Buffer(JSON.stringify(payload))
                            .toString('base64')
                            .replace('=', '');
console.log('payload: ',encodedPayload);

/* Result:
header: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9
*/
```

자, 이제 JWT 의 첫번째 파트가 완성되었습니다!


> 참고: JSON 형태의 객체가 base64 로 인코딩 되는 과정에서 공백 / 엔터들이 사라집니다. 따라서, 다음과 같은 문자열을 인코딩을 하게 되죠:
`{"alg":"HS256","typ":"JWT"}`

# 정보 (payload)
Payload 부분에는 토큰에 담을 정보가 들어있습니다. 여기에 담는 정보의 한 ‘조각’ 을 클레임(claim) 이라고 부르고, 이는 name / value 의 한 쌍으로 이뤄져있습니다. 토큰에는 여러개의 클레임 들을 넣을 수 있습니다.

클레임 의 종류는 다음과 같이 크게 세 분류로 나뉘어져있습니다:

* 등록된 (registered) 클레임,
* 공개 (public) 클레임,
* 비공개 (private) 클레임

그럼, 하나 하나 알아볼까요?

### #1 등록된 (registered) 클레임
등록된 클레임들은 서비스에서 필요한 정보들이 아닌, 토큰에 대한 정보들을 담기위하여 이름이 이미 정해진 클레임들입니다. 등록된 클레임의 사용은 모두 선택적 (optional)이며, 이에 포함된 클레임 이름들은 다음과 같습니다:

* `iss`: 토큰 발급자 (issuer)
* `sub`: 토큰 제목 (subject)
* `aud`: 토큰 대상자 (audience)
* `exp`: 토큰의 만료시간 (expiraton), 시간은 NumericDate 형식으로 되어있어야 하며 (예: 1480849147370) 언제나 현재 시간보다 이후로 설정되어있어야합니다.
* `nbf`: Not Before 를 의미하며, 토큰의 활성 날짜와 비슷한 개념입니다. 여기에도 NumericDate 형식으로 날짜를 지정하며, 이 날짜가 지나기 전까지는 토큰이 처리되지 않습니다.
* `iat`: 토큰이 발급된 시간 (issued at), 이 값을 사용하여 토큰의 age 가 얼마나 되었는지 판단 할 수 있습니다.
* `jti`: JWT의 고유 식별자로서, 주로 중복적인 처리를 방지하기 위하여 사용됩니다. 일회용 토큰에 사용하면 유용합니다.

### #2 공개 (public) 클레임
공개 클레임들은 충돌이 방지된 (collision-resistant) 이름을 가지고 있어야 합니다. 충돌을 방지하기 위해서는, 클레임 이름을 URI 형식으로 짓습니다.
```
{
    "https://velopert.com/jwt_claims/is_admin": true
}
```

### #3 비공개 (private) 클레임
등록된 클레임도아니고, 공개된 클레임들도 아닙니다. 양 측간에 (보통 클라이언트 <->서버) 협의하에 사용되는 클레임 이름들입니다. 공개 클레임과는 달리 이름이 중복되어 충돌이 될 수 있으니 사용할때에 유의해야합니다.
```
{
    "username": "velopert"
}
```

# 예제 Payload
```
{
    "iss": "velopert.com",
    "exp": "1485270000000",
    "https://velopert.com/jwt_claims/is_admin": true,
    "userId": "11028373727102",
    "username": "velopert"
}
```
위 예제 payload 는 2개의 등록된 클레임, 1개의 공개 클레임, 2개의 비공개 클레임으로 이뤄져있습니다.

위 데이터를 base64 로 인코딩을 해볼까요?

```
Node.js 환경에서 인코딩하기

const payload = {
    "iss": "velopert.com",
    "exp": "1485270000000",
    "https://velopert.com/jwt_claims/is_admin": true,
    "userId": "11028373727102",
    "username": "velopert"
};

// encode to base64
const encodedPayload = new Buffer(JSON.stringify(payload))
                            .toString('base64')
                            .replace('=', '');

console.log('payload: ',encodedPayload);

/* result
payload:  eyJpc3MiOiJ2ZWxvcGVydC5jb20iLCJleHAiOiIxNDg1Mjc...생략
*/
```

> 주의: base64로 인코딩을 할 때 dA== 처럼 뒤에 = 문자가 한두개 붙을 때가 있습니다. 이 문자는 base64 인코딩의 padding 문자라고 부릅니다.
JWT 토큰은 가끔 URL 의 파라미터로 전달 될 때도 있는데요, 이 = 문자는, url-safe 하지 않으므로, 제거되어야 합니다. 패딩이 한개 생길 때도 있고, 두개 생길 때도 있는데, 전부 지워(제거해줘도 디코딩 할 때 전혀 문제가 되지 않습니다)

JWT 토큰의 두번째 파트가 완성되었습니다!

# 서명 (signature)
JSON Web Token 의 마지막 부분은 바로 서명(signature) 입니다. 이 서명은 헤더의 인코딩값과, 정보의 인코딩값을 합친후 주어진 비밀키로 해쉬를 하여 생성합니다.

서명 부분을 만드는 슈도코드(pseudocode)의 구조는 다음과 같습니다.
```
HMACSHA256(
  base64UrlEncode(header) + "." +
  base64UrlEncode(payload),
  secret)
```

이렇게 만든 해쉬를, base64 형태로 나타내면 됩니다 (문자열을 인코딩 하는게 아닌 hex → base64 인코딩을 해야합니다)

한번, 이 포스트에서 사용된 예제 헤더와 정보를 해싱 해볼까요?

먼저, 헤더와 정보의 인코딩 값 사이에 . 을 넣어주고, 합칩니다.

`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9`.eyJpc3MiOiJ2ZWxvcGVydC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly92ZWxvcGVydC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiMTEwMjgzNzM3MjcxMDIiLCJ1c2VybmFtZSI6InZlbG9wZXJ0In0

이 값을 비밀키의 값을 secret 으로 해싱을 하고 base64로 인코딩하면 다음과 같은 값이 나옵니다.

Node.js 환경에서 해싱 및 인코딩하기
```
const crypto = require('crypto');
const signature = crypto.createHmac('sha256', 'secret')
             .update(encodedHeader + '.' + encodedPayload)
             .digest('base64')
             .replace('=', '');

console.log('signature: ',signature);
// WE5fMufM0NDSVGJ8cAolXGkyB5RmYwCto1pQwDIqo2w
```

이 부분 또한 padding 이 생기면 지워줍니다.

오우! 3번째 부분까지 끝났군요. 그러면 지금까지 구한 값들을 . 을 중간자로 다 합쳐주면, 하나의 토큰이 완성됩니다.

eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ2ZWxvcGVydC5jb20iLCJleHAiOiIxNDg1MjcwMDAwMDAwIiwiaHR0cHM6Ly92ZWxvcGVydC5jb20vand0X2NsYWltcy9pc19hZG1pbiI6dHJ1ZSwidXNlcklkIjoiMTEwMjgzNzM3MjcxMDIiLCJ1c2VybmFtZSI6InZlbG9wZXJ0In0.`WE5fMufM0NDSVGJ8cAolXGkyB5RmYwCto1pQwDIqo2w`

이 값을 https://jwt.io/ 의 디버거에 붙여넣어보세요 (JWT.IO 는 브라우저 상에서 JWT 토큰을 검증하고 생성 할 수 있게 해주는 디버거 서비스입니다)

![JWT-Debugger](./img/jwt-debugger.png)

하단의 텍스트가 파란색으로 Signature Verified 라고 뜨면 JWT 토큰이 검증되었다는 것 입니다.

# 마치면서..
이번 포스트에서는 JWT 의 구조가 어떻게 되어있는지, 그리고 어떤 과정을 거쳐서 만들어지는지 배웠습니다. 토큰에서 필요한 정보를 하나하나 인코딩하고 해싱하는것은 그렇게 대단한 작업은 아니지만 조금은 귀찮기도 합니다. 실제로 JWT 를 서비스에서 사용할때는 우리가 직접 base64 인코딩을하거나 SHA256 해싱을 할 일은 없습니다. JWT 담당 라이브러리에 설정만 해주면 자동으로 손쉽게 만들고, 또 검증도 쉽게해주기 때문이지요.

다음 포스트에서는, Node.js 환경에서 `jsonwebtoken` 이라는 패키지를 사용하여 MongoDB를 연동한 Express.js 웹 서버 프레임워크에서 JWT 기반 인증 시스템을 구현해보겠습니다.

# References
JSON Web Token (JWT)
http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html

JWT – Claims and Signing
http://self-issued.info/docs/draft-jones-json-web-token-01.html

JSON Web Token Tutorial: An Example in Laravel and AngularJS
https://www.toptal.com/web/cookie-free-authentication-with-json-web-tokens-an-example-in-laravel-and-angularjs

***

# Express.js 서버에서 JWT 기반 회원인증 시스템 구현하기

> 이 강의에서는 Node.js 의 인기있는 웹서버 프레임워크인 Express.js 서버에서 JSON Web Token 을 사용하여 회원인증 시스템을 구현하는 방법을 알아보겠습니다.

# 사전 지식
이 강의에서는 Node.js에 대한 배경지식이 있어야합니다. Node.js 를 잘 모르시는분들은 Node.js 기초 강의 를 먼저 읽어주세요. 추가적으로, 토큰 기반 시스템 (포스트 i)과 JWT(포스트 ii)에 대한 이해가 필요하니, 지난 포스트들을 읽지 않으신분들은 강의를 시작하기전에 한번 참조해주세요.

추가적으로, 이 강의에서는 ES6 문법을 사용합니다.

* 이 강좌를 진행 하면서 이해가 가질 않거나 궁금한것이 있으면 언제든지 덧글로 달아주세요. https://velopert.com/2448

# 소개

![Facebook](./img/facebook-640.jpg)

회원인증 시스템은 모든 어플리케이션에서 정말 중요한 부분입니다. 기존의 어플리케이션들은 세션 기반 회원인증 시스템을 많이 사용해왔습니다. 지금도, 많은 곳에서 사용되고 있죠. 하지만 요즘은 토큰을 기반으로 회원인증 시스템을 구축하는 서비스 회사들이 늘어가고있습니다.  Facebook, LinkedIn, Instagram, GitHub, Google 등 수많은 공룡급 회사에서 사용을 하고있지요. 지금은 이런 인증 시스템이 가히 ‘대세‘ 라고 할 수 있겠습니다. (주관적인 표현입니다.)

이를 사용함으로서, 서버측의 확장성이 높아지고, 보안시스템을 강화 할 수 있습니다. 하지만 무조건 좋은것만은 아니겠죠. 토큰을 사용함으로서 보안시스템을 강화 할 수도 있겠지만, 오히려 잘못사용하면 매우 취약해지기때문에 잘 알고 사용하는것이 좋습니다.

토큰기반인증 시스템은 API 모델을 가진 어플리케이션에 매우 적합합니다. 요즘은 Angular2, React, Vue 등을 사용해서 많은 서비스들이 만들어져있고 그런 자바스크립트 라이브러리 혹은 프레임워크를 사용하는 어플리케이션들은 REST API 던 GraphQL API 던.. 정말 많이 의존하고 있죠. 모바일앱도 마찬가지구요.

세션기반인증 시스템도 충분히 제구실을 하지만, 여러분이 ‘모던 웹/앱 개발자’라면, 토큰기반인증 시스템은 한번쯤 배워볼 가치가있습니다. 사용해보고, 여러분의 서비스에 적합하다 싶으면 도입을 하면되죠.

자, 그럼 시작해봅시다!

> 이 프로젝트에 사용된 코드는 GitHub 에서 에서 열람 하실 수 있습니다.
https://github.com/velopert/nodejs-jwt-example

# 준비물
이 강의를 진행하기 위해 필요한 주요 준비물은 다음과 같습니다.

1. Node.js LTS 버전(현재 기준 6.91) 과 npm
2. MongoDB 서버 (강의에서는 편의상 mLab 에서 호스팅을 받아 사용합니다. 본인이 원한다면 몽고디비 서버를 직접 설치하여 사용해도 됩니다)
3. 코드 에디터 (자신이 가장 좋아하는 에디터를 사용하세요. 강의에서는 VS Code 를 사용하도록 하겠습니다)
4. POSTMAN – API 테스팅 크롬 확장 프로그램

# #1 프로젝트 생성 및 설정하기
프로젝트 설정
먼저 nodejs-jwt-example 이라는 디렉토리를 만들은후, 터미널로 해당 디렉토리를 열어 npm 으로 프로젝트를 생성하세요.

`npm -y`

그러면 디렉토리내에서 프로젝트를 기본설정으로 설정하게되면서 package.json 파일이 생성됩니다. 한번 열어보세요.

```
{
  "name": "nodejs-jwt-example",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```
잘 됐나요? 아직은 npm 을 사용하여 설치한 모듈들이 없기때문에, dependency 가 존재하지 않습니다.

의존(dependency) 모듈 설치
자, 이제 저희 프로젝트에서 필요한 의존 모듈을 설치하겠습니다.

`npm install --save express body-parser jsonwebtoken mongoose morgan`

* express: 저희 프로젝트에서 사용 할 웹서버 프레임워크입니다.
* body-parser: 클라이언트측에서 요청을 받을때, url-encoded 쿼리 및 json 형태의 바디를 파싱하는데 도움을 주는 모듈입니다.
* jsonwebtoken: 이 예제프로젝트에서 사용되는 핵심 모듈입니다. JSON Web Token 을 손쉽게 생성하고, 또 검증도 해줍니다.
* mongoose: 서버에서 MongoDB 를 사용하기 위하여 설치합니다.
* morgan: Express 서버에서 발생하는 이벤트들을 기록해주는 미들웨어입니다.

설치가 끝났으면, 다시 package.json 을 확인해보세요. (...) 은 생략되었다는 의미 입니다.

```
{
  (...)
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.15.2",
    "express": "^4.14.0",
    "jsonwebtoken": "^7.1.9",
    "mongoose": "^4.7.1",
    "morgan": "^1.7.0"
  }
}
```

### 디렉토리 구조
프로젝트에서 사용 할 디렉토리 구조는 다음과 같습니다. 각 파일들은 진행을 하면서 하나하나 생성 할 것이며 설명 또한 진행하면서 하도록 하겠습니다.

<img src="./img/node-scaffolding.png" width="60%">

> 문법 검사를 위하여 ESLint 를 사용하고있습니다. 위 프로젝트의 ESLint 설정 파일의 내용은 여기서 확인할수있습니다. ESLint 를 설정하는건 필수는 아닙니다. 사용을 원하시는 분들은 .eslintrc 파일을 생성하시고 npm 으로 ESlint 를 설치하세요

`npm install --save-dev eslint`

# #2 User 스키마 작성하기
mongoose 에서 User 정보를 MongoDB 에 넣기 위해선, 스키마를 먼저 만들어야합니다.
models/user.js 에 다음 코드를 작성해주세요.

**models/user.js**
```JavaScript
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    username: String,
    password: String,
    admin: { type: Boolean, default: false }
})

// create new User document
User.statics.create = function(username, password) {
    const user = new this({
        username,
        password
    })

    // return the Promise
    return user.save()
}

// find one user by using username
User.statics.findOneByUsername = function(username) {
    return this.findOne({
        username
    }).exec()
}


// verify the password of the User documment
User.methods.verify = function(password) {
    return this.password === password
}

User.methods.assignAdmin = function() {
    this.admin = true
    return this.save()
}

module.exports = mongoose.model('User', User)
```

앞으로 User 모델을 사용하여 처리를 하기 위한 작업들을 멤버 / 스태틱 메소드로 미리 준비했습니다.

* create 메소드는 새 유저를 생성합니다. 원래는 이 메소드처럼 비밀번호를 그대로 문자열 형태로 저장하면 보안적으로 매우 나쁩니다. 일단 지금은 배우는 과정이니 간단하게 문자열로 저장을 하지만, 포스트의 후반부에서는 비밀번호를 해쉬하여 저장하도록 하겠습니다.
* findOneByUsername 메소드는 username 값을 사용하여 유저를 찾습니다.
* verify 메소드는 비밀번호가 정확한지 확인을 합니다. 지금은 그냥 === 를 사용해서 비교 후 결과를 반환하지만 포스트 후반부에서는 해쉬를 확인하여 결과를 반환하겠습니다
* assignAdmin 메소드는 유저를 관리자 계정으로 설정해줍니다. 저희 예제 프로젝트에서는, 가장 처음으로 가입한 사람과, 관리자가 나중에 API 를 사용하여 지정한사람이 관리자 권한을 부여 받습니다.

# #3 MongoDB 준비 및 설정 파일 (config.js) 만들기
config.js 파일은 우리 예제 프로젝트에서 사용할 MongoDB 서버의 정보와, JWT 토큰을 만들 때 사용 될 secret 키의 정보를 지니고있습니다. 이렇게 보안에 관련된 정보는 따로 파일에 분리하여 관리를 하는게 좋습니다. 이렇게 하면, 예를들어, github 에 오픈 소스를 할 때, .gitignore 에 추가해서 해당 파일은 싱크가 되지 않도록 설정 할 수 있겠죠? (이 프로젝트의 github 저장소에서도 config.js 파일은 커밋이 되어있지 않습니다. `예제 정보가 적혀있는 config.example.js 파일의 이름을 config.js 로 수정하고 사용해야합니다.`

설정 파일을 작성하기 전에, MongoDB 서버를 준비해주어야 합니다. 개인 서버에서 MongoDB 를 돌려도 되고, 아니면 mLab 이라는 MongoDB 호스팅 서비스를 사용해도 됩니다. 이 포스트에서는 mLab 을 사용하도록 하겠습니다.

### mlab 가입 및 데이터베이스 생성

<img src="./img/mlab-1.png" width="100%">
<img src="./img/mlab-2.png" width="100%">
<img src="./img/mlab-3.jpg" width="100%">
<img src="./img/mlab-4.jpg" width="100%">
<img src="./img/mlab-5.jpg" width="100%">
<img src="./img/mlab-6.jpg" width="100%">

자, 이제 데이터베이스를 설정하는 과정이 끝났습니다. mLab 에서 데이터베이스 페이지의 상단을 보시면 다음과 같은 텍스트가 있습니다.

<img src="./img/mlab-7.jpg" width="100%">

이 값을 복사하세요.

### config.js 파일 작성
이제, config.js 파일을 생성하여 다음 코드를 작성하세요.

**config.js**
```
module.exports = {
    'secret': 'SeCrEtKeYfOrHaShInG',
    // 'mongodbUri': 'mongodb://id:pwd@ds127428.mlab.com:27428/jwt-tutorial'
    'mongodbUri': 'mongodb://localhost:27017/jwt-tutorial'
}
```

위에서 복사했던 MongoDB URI 를 코드에 붙여넣고, <dbuser>:<password> 가 있던 부분에 여러분이 아까 만들었던 계정 정보를 입력하세요.

여기서 secret 은 나중에 JWT 토큰을 검증하는 서명부분을 만들 때, 해싱 알고리즘에서 사용 될 비밀 키 입니다.

# #4 서버 코드 작성하기
이제 서버의 메인 부분인 app.js 의 코드를 작성해봅시다.
주요코드를 먼저 작성하고, 추후 라우터들을 만든 다음에 또 수정 하겠습니다.

**app.js**
```JavaScript
/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config')
const port = process.env.PORT || 3000

/* =======================
    EXPRESS CONFIGURATION
==========================*/
const app = express()

// parse JSON and url-encoded query
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// print the request log on console
app.use(morgan('dev'))

// set the secret key variable for jwt
app.set('jwt-secret', config.secret)

// index page, just for testing
app.get('/', (req, res) => {
    res.send('Hello JWT')
})

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})



/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
mongoose.connect(config.mongodbUri)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', ()=>{
    console.log('connected to mongodb server')
})
```

코드 작성이 완료되었다면, 터미널에서 node app.js 를 입력하여 서버를 실행해보세요.

```
> node app.js
Express is running on port 3000
connected to mongodb server
```

잘 되었나요? 그렇다면 Postman을 열어서 http://localhost:3000/ 에 GET 요청을 해보세요.

<img src="./img/postman-1.png" width="100%">

Hello JWT 라고 응답을 하네요! 게속해서 진행해봅시다.

> 앞으로 서버를 수정하고 테스팅을 할 때 마다 서버를 재시작해주어야 합니다. 재시작 하는게 귀찮다면 nodemon 도구를 사용해서 서버를 실행하면 서버가 수정 될 때마다 자동으로 재시작됩니다.
`npm install -g nodemon`
`nodemon app.js`

# #5 회원가입 구현
app.js 파일에서 모든 코드를 입력해버리면 파일도 너무 커지고 보기 힘드니까, 라우터를 작성해봅시다. 우리는 라우터의 기본 틀을 먼저 만들고 나서, 기능구현은 그 다음에 하도록 하겠습니다.

### 회원가입 API 준비하기
auth 라우터부터 작성을 해볼까요?  회원가입의 라우트는 /api/auth/register 로 설정하도록 하겠습니다.

routes/api/auth/auth.controller.js 파일을 생성하여 다음 코드를 작성하세요.

**routes/api/auth/auth.controller.js**
```
/*
    POST /api/auth/register
    {
        username,
        password
    }
*/
exports.register = (req, res) => {
    res.send('this router is working')
}
```

회원가입 API 의 기본 틀을 만들어놓았습니다.

그 다음엔, routes/api/auth/index.js 파일에서 방금 만든 컨트롤러 파일을 불러온 후, 라우터를 정의해봅시다.

**routes/api/auth/index.js**
```
const router = require('express').Router()
const controller = require('./auth.controller')

router.post('/register', controller.register)

module.exports = router
```

우리는 auth 라는 라우터를 정의했습니다.

이제 상위 폴더로 올라가서 api 라는 라우터를 정의 한 뒤, 해당 라우터에서 /auth 로 요청이 들어오면 위 라우터로 연결시켜줍시다.

**routes/api/index.js**
```
const router = require('express').Router()
const auth = require('./auth')

router.use('/auth', auth)

module.exports = router
```

코드가 거의 비슷하지요?

마지막으로, app.js 파일을 다시 열어서 /api/ 경로로 요청이 들어오면 위 라우터로 연결시켜줍시다.

**app.js**
```
// (...)

// index page, just for testing
app.get('/', (req, res) => {
    res.send('Hello JWT')
})

// configure api router
app.use('/api', require('./routes/api'))

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
})

// (...)
```

지금까지 한 작업을 정리하자면, `auth` → `api` → `app` 순으로 한단계 한단계 거슬러 올라간 것 입니다. 자 이제 코드를 저장 후, Postman 으로 http://localhost:3000/api/auth/register 경로에 `POST` 요청을 해보세요.

<img src="./img/postman-2.png" width="100%">

# 회원가입 API 기능 구현하기
회원가입 기능을 구현하기전에 우리 프로젝트에서 회원가입부분에서 사용할 알고리즘을 알아봅시다.

<p align="center">
  <img src="./img/data-flow.png" width="50%">
</p>

회원가입 요청이 들어오면, 아이디가 중복되는지 확인을 하고, 새 회원을 등록합니다. 그리고 만약에 해당 유저가 첫번째 유저라면, 그 유저를 관리자 권한을 부여합니다.

이 작업에서 우리는 MongoDB에 3번의 쿼리를 해야합니다. 데이터베이스에 쿼리를 하는것은, 비동기 작업이죠. Node.js 에서 비동기작업은 보통 콜백으로 처리를하지요. 하지만, 이렇게 비동기작업이 많아지면 콜백안에 콜백안에 콜백이 생기게됩니다.

콜백이 많아지면… 콜백지옥이라고도 부르죠.

<img src="./img/cb-hell.jpg" width="100%">

업데이트된 자바스크립트의 문법 ES6 에서는 Promise 라는 기능을 지원하여 조금더 코드를 보기 좋게 작성 할 수 있게 해줍니다.  만약에 Promise 에 대해서 잘 모르신다면 [Webframeworks.kr 의 ES6 Promises(1) – the API](http://webframeworks.kr/tutorials/translate/es6-promise-api-1/) 포스트를 참고하세요.

자, 이제 routes/api/auth/auth.controller.js 파일을 열어서 상단에 User 모델을 require 해주고, 함수에 기능을 구현해봅시다.

**/api/auth/auth.controller.js**
```JavaScript
const User = require('../../../models/user')

/*
    POST /api/auth
    {
        username,
        password
    }
*/

exports.register = (req, res) => {
    const { username, password } = req.body
    let newUser = null

    // create a new user if does not exist
    const create = (user) => {
        if(user) {
            throw new Error('username exists')
        } else {
            return User.create(username, password)
        }
    }

    // count the number of the user
    const count = (user) => {
        newUser = user
        return User.count({}).exec()
    }

    // assign admin if count is 1
    const assign = (count) => {
        if(count === 1) {
            return newUser.assignAdmin()
        } else {
            // if not, return a promise that returns false
            return Promise.resolve(false)
        }
    }

    // respond to the client
    const respond = (isAdmin) => {
        res.json({
            message: 'registered successfully',
            admin: isAdmin ? true : false
        })
    }

    // run when there is an error (username exists)
    const onError = (error) => {
        res.status(409).json({
            message: error.message
        })
    }

    // check username duplication
    User.findOneByUsername(username)
    .then(create)
    .then(count)
    .then(assign)
    .then(respond)
    .catch(onError)
}
```

만약에 Promise 를 사용하지 않았더라면, 조금 더 nested 되어있고 복잡한 구조였겠죠.

코드를 조금 더 깔끔하게 작성하기 위하여 각 작업들을 따로 함수로 만든다음에 Promise chain 을 만들었습니다.

위 구조도, 보기에 꽤 괜찮긴하지만, ES6 보다 더 최신문법인 ES7 에서는 비동기작업을 더 깔끔하게 할 수 있는 async & await 이라는 문법을 지원합니다. 하지만 그 문법을 사용하려면 babel 설정을 해야하기에.. 이 강의에선 Promise 만 사용을 했습니다. 나중에 시간이 있으시면 이 문법도 알아보시길 바랍니다. 정말 편하거든요. 자세한 내용은 [ES6의 제너레이터를 사용한 비동기 프로그래밍](http://meetup.toast.com/posts/73)에서 확인하세요.

코드를 저장하고, Postman 으로 회원가입 요청을 넣어보세요.

<img src="./img/postman-3.png" width="100%">

오호.. 가입에 성공했다고합니다. 관리자로도 지정이 되었습니다. 한번 똑같은 요청을 다시한번 넣어보세요.

<img src="./img/postman-4.png" width="100%">

유저네임이 중복된다고 뜨네요. 이번엔 username 을 다른 값으로 설정해서 다시 요청을 해보세요.

<img src="./img/postman-5.png" width="100%">

이번엔 관리자 지정이 되지 않았습니다. 저희가 작성한 코드가 제대로 작동을 하는군요.

# #6 로그인 구현
### 로그인 API 준비하기
자, 이제 드디어 로그인을 하고 JWT 토큰을 발급받는 방법을 다뤄보도록 하겠습니다.

우선, 회원가입 API 를 만들때 했었던것처럼 로그인 API 도 라우팅을 위한 코드를 미리 작성하겠습니다.

로그인의 라우트는 POST /api/auth/login 으로 설정하겠습니다.

**routes/api/auth/auth.controller.js**
```
// (...)

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/

exports.login = (req, res) => {
    res.send('login api is working')
}
```

**routes/api/auth/index.js**
```
const router = require('express').Router()
const controller = require('./auth.controller')

router.post('/register', controller.register)
router.post('/login', controller.login)

module.exports = router
```

### 로그인 API 기능 구현하기
자, 이제 login 함수의 기능을 구현해줄 차례입니다. jwt 토큰을 발급하려면, 강좌의 시작부분에서 npm 을 통해 설치한 jsonwebtoken 모듈을 사용해야합니다. 우선, 컨트롤러 파일의 상단에 해당 모듈을 불러와주세요.

**routes/api/auth/auth.controller.js**
```
const jwt = require('jsonwebtoken')
const User = require('../../../models/user')

// (...)
```


> **jsonwebtoken 으로 JWT 발급하기**
사용법: jwt.sign(payload, secret, options, [callback])
만약에 callback 이 전달되면 비동기적으로 작동하며, 콜백함수의 파라미터는 (err, token) 입니다. 전달되지 않을시엔 동기적으로 작동하며, JWT 를 문자열 형태로 리턴합니다.
payload 는  객체, buffer, 혹은 문자열형태로 전달 될 수 있습니다.
secret 은 서명을 만들 때 사용되는 알고리즘에서 사용되는 문자열 혹은 buffer 형태의 값 입니다.
> **options:**
> * algorithm: 기본값은 HS256 으로 지정됩니다.
> * expiresIn: JWT 의 등록된 클레임중 exp 값을 x 초후 혹은 rauchg/ms 형태의 기간 후로 설정합니다. (예제: (60, “2 days”, “10h”, “7d”)
> * notbefore: JWT 의 등록된 클레임중 nbf 값을 x 초후 혹은 rauchg/ms 형태의 기간 후로 설정합니다. (예제: (60, “2 days”, “10h”, “7d”)
> * audience
> * issuer
> * jwtid
> * subject
> * noTimestamp
> * header
더 자세히보기: [node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

이제 login 함수 내에서 유저 정보를 확인하고, jwt 토큰을 발급해줍시다.

**routes/api/auth/auth.controller.js**
```JavaScript
// (...)

/*
    POST /api/auth/login
    {
        username,
        password
    }
*/

exports.login = (req, res) => {
    const {username, password} = req.body
    const secret = req.app.get('jwt-secret')

    // check the user info & generate the jwt
        // check the user info & generate the jwt
    const check = (user) => {
        if(!user) {
            // user does not exist
            throw new Error('login failed')
        } else {
            // user exists, check the password
            if(user.verify(password)) {
                // create a promise that generates jwt asynchronously
                const p = new Promise((resolve, reject) => {
                    jwt.sign(
                        {
                            _id: user._id,
                            username: user.username,
                            admin: user.admin
                        },
                        secret,
                        {
                            expiresIn: '7d',
                            issuer: 'velopert.com',
                            subject: 'userInfo'
                        }, (err, token) => {
                            if (err) reject(err)
                            resolve(token)
                        })
                })
                return p
            } else {
                throw new Error('login failed')
            }
        }
    }

    // respond the token
    const respond = (token) => {
        res.json({
            message: 'logged in successfully',
            token
        })
    }

    // error occured
    const onError = (error) => {
        res.status(403).json({
            message: error.message
        })
    }

    // find the user
    User.findOneByUsername(username)
    .then(check)
    .then(respond)
    .catch(onError)

}
```

여기에서도 마찬가지로 각 작업을 함수로 만든다음에, Promise chain을 만들어주었습니다. 함수의 내부에 check 함수는 유저의 정보를 확인하고 토큰을 발급해주는데요, 여기서 토큰을 비동기적을 만들기에, 내부에서 새로운 Promise 를 만들어 리턴을 하도록 설정하였습니다. 그러면 Promise 에서 이 함수가 실행되면, 로그인이 성공 했을 때 다음. then() 에서는 토큰값을 전달 받겠지요.

코드를 저장하고, Postman 을 열어 다음과 같이 로그인 요청을 해봅시다.

<img src="./img/postman-6.png" width="100%">

토큰이 정상적으로 생성이 되었네요! 한번 이 토큰을 https://jwt.io/ 에 붙여넣어볼까요?

<img src="./img/postman-7.png" width="100%">

잘 만들어졌군요. `서명 부분에서 secret 부분에 우리가 config.js 파일에서 입력한 값을 넣어주어야 합니다.`

# #7 JWT 검증 구현
유저가 JWT 값을 헤더에 x-access-token 으로 설정하거나, url parameter 로 서버로 전달하면, 서버측에서 그 토큰을 가지고 검증 한 후 현재 계정의 상태를 보여주는 기능을 구현해보겠습니다.

계정정보 체킹 라우트는 GET /api/auth/check 로 설정하겠습니다.

**routes/api/auth/auth.controller.js**
```
/*
    GET /api/auth/check
*/

exports.check = (req, res) => {
    // read the token from header or url
    const token = req.headers['x-access-token'] || req.query.token

    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if token is valid, it will respond with its info
    const respond = (token) => {
        res.json({
            success: true,
            info: token
        })
    }

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then(respond).catch(onError)
}
```

**routes/api/auth/index.js**
```
const router = require('express').Router()
const controller = require('./auth.controller')

router.post('/register', controller.register)
router.post('/login', controller.login)
router.get('/check', controller.check)

module.exports = router
```

코드를 저장하고 테스팅을 해봅시다. 첫 시도에서는 아까 발급받은 토큰을 x-access-token 헤더값으로 지정하고 다음과 같이 요청을 날려보세요.

<img src="./img/postman-8.png" width="100%">

잘 되는군요. 두번째 시도는 기존 헤더 값을 지우고, 다음과 같이 url-encoded 쿼리 값을 설정하여 전달을 해보세요.

<img src="./img/postman-9.png" width="100%">

이 또한 잘 됩니다. 이번엔 토큰 값을 막무가내로 수정하고 요청을 해봅시다.

<img src="./img/postman-10.png" width="100%">

실패도 제대로 반환이 되네요.

# #8 JWT 검증 미들웨어 구현
어느정도 감을 잡았죠? 그런데, 토큰을 필요로하는 모든 요청에 토큰검증 코드를 넣기엔 너무나 자주 반복되잖아요? 이 작업을 더 간단하게 하는 방법이 있습니다. 바로 미들웨어죠.

라우터에서 주어진 요청을 설정하기전에, JWT 검증 미들웨어를 통하여 JWT 검증 작업을 하고 나서, 주어진 작업을 하게 하도록 구현을 해봅시다.

`middlewares/auth.js` 파일을 열어 다음 코드를 작성해주세요.

**middlewares/auth.js**
```
const jwt = require('jsonwebtoken')

const authMiddleware = (req, res, next) => {
    // read the token from header or url
    const token = req.headers['x-access-token'] || req.query.token

    // token does not exist
    if(!token) {
        return res.status(403).json({
            success: false,
            message: 'not logged in'
        })
    }

    // create a promise that decodes the token
    const p = new Promise(
        (resolve, reject) => {
            jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
                if(err) reject(err)
                resolve(decoded)
            })
        }
    )

    // if it has failed to verify, it will return an error message
    const onError = (error) => {
        res.status(403).json({
            success: false,
            message: error.message
        })
    }

    // process the promise
    p.then((decoded)=>{
        req.decoded = decoded
        next()
    }).catch(onError)
}

module.exports = authMiddleware
```

사전에 작성했었던 check 함수와 비슷하죠? 이제 이 미들웨어를 GET /api/auth/check 라우트에 적용해보겠습니다.

**/routes/api/auth/index.js**
```
const router = require('express').Router()
const controller = require('./auth.controller')
const authMiddleware = require('../../../middlewares/auth')

router.post('/register', controller.register)
router.post('/login', controller.login)

router.use('/check', authMiddleware)
router.get('/check', controller.check)

module.exports = router
```

그러면, auth.controller.js 안에 있는 check 함수를 이렇게 간단하게 수정하면됩니다. 만약에 토큰 검증에 실패 될 땐, 미들웨어에서 next() 함수가 실행되지 않기때문에, 이 check 함수 내부에서는 토큰이 검증실패했을때를 고려하지 않아도 된답니다.

**/routes/api/auth/auth.controller.js**
```
// (...)
/*
    GET /api/auth/check
*/

exports.check = (req, res) => {
    res.json({
        success: true,
        info: req.decoded
    })
}
```

여기까지 잘 따라오셨나요? 축하합니다! 이 강의에서 배울 핵심적인 내용을 다 배우셨습니다! 이 포스트 하단부로는 유저 인증 시스템의 추가적인 기능들을 구현하고, plain text 로 저장하던 비밀번호를 해싱하여 저장하도록 수정합니다.

Node.js 실습을 추가적으로 하고 싶다면 섹션 #9 와 섹션 #10 도 진행을 하시고, 그렇지 않다면 최하단의 마치면서.. 섹션으로 스크롤하세요.

# #9 유저 인증 시스템 추가기능 구현
자, 이제 유저 인증 시스템에서 필요한 두가지의 추가 기능들을 구현해보도록 하겠습니다.

* 관리자 계정으로 모든 유저 리스팅
* 관리자 계정으로 특정 유저 관리자권한 부여

### user 라우터 컨트롤러 코드 작성
이 라우터에서는 jwt 와 발급 / 검증 작업을 하지 않기 때문에 (미들웨어가 해줄것이기 때문이죠) 작성 할 코드는 꽤나 간단합니다.

**routes/api/user/user.controller.js**
```
const User = require ('../../../models/user')

/*
    GET /api/user/list
*/

exports.list = (req, res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    User.find({})
    .then(
        users=> {
            res.json({users})
        }
    )

}


/*
    POST /api/user/assign-admin/:username
*/

exports.assignAdmin = (req, res) => {
    // refuse if not an admin
    if(!req.decoded.admin) {
        return res.status(403).json({
            message: 'you are not an admin'
        })
    }

    User.findOneByUsername(req.params.username)
    .then(
        user => user.assignAdmin
    ).then(
        res.json({
            success: true
        })
    )
}
```

### user 라우터 코드 작성

**routes/api/user/index.js**
```
const router = require('express').Router()
const controller = require('./user.controller')

router.get('/list', controller.list)
router.post('/assign-admin/:username', controller.assignAdmin)

module.exports = router
```

user 라우터의 경우,라우터 내부의 모든 API 들이 JWT 토큰 검증이 필요하므로, 여기서 authMiddleware 적용하지 않고, routes/api/index.js 파일에서 적용합니다.

### api 라우터 수정
api 라우터에서 방금 만든 user 라우터를 불러오고, 그 라우터에 authMiddleware 도 적용을 해줍니다.
**/routes/api/index.js**
```
const router = require('express').Router()
const authMiddleware = require('../../middlewares/auth')
const auth = require('./auth')
const user = require('./user')

router.use('/auth', auth)
router.use('/user', authMiddleware)
router.use('/user', user)

module.exports = router
```

코드를 저장하고, 방금 만든 API들이 잘 작동하는지 체크해봅시다.

<img src="./img/postman-11.png" width="100%">

잘 되는군요. API 요청을 할 때, `x-access-token` 값 설정하는것 잊지 마세요!

# #10 비밀번호를 암호화하여 저장하기
비밀번호를 데이터베이스에 저장 할때, plain text 그대로 저장하는것은 매우 위험합니다.  따라서 우리는 HMAC-SHA1 으로 비밀번호를 해쉬하여 저장하도록 하겠습니다.

그러기 위해선, 유저 모델에서 node.js 내장 모듈인 crypto 를 불러와서 사용하면 됩니다. 해싱을 할 때 사용 할 비밀키는 편의상 config 파일을 다시 불러와서 jwt 에서 사용하는 비밀키와 동일하게 사용하겠습니다.

create 메소드와 verify 메소드를 다음과 같이 수정해주세요.

**models/user.js**
```
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const crypto = require('crypto')
const config = require('../config')

// (...)

// create new User document
User.statics.create = function(username, password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')

    const user = new this({
        username,
        password: encrypted
    })

    // return the Promise
    return user.save()
}

// (...)

// verify the password of the User documment
User.methods.verify = function(password) {
    const encrypted = crypto.createHmac('sha1', config.secret)
                      .update(password)
                      .digest('base64')

    return this.password === encrypted
}

// (...)
```

주의: 이전에 만든 계정들은 작동을 안할테니, 데이터베이스를 비워주시고 새로 가입을 하세요.

<img src="./img/mlab-del-docu.png" width="100%">

자, 이제 기존에 만들었던 API 들이 제대로 되는지 테스팅을 해보세요. 도중에 막히는게 있다면 소스코드를 참고해보시길 바랍니다.

# 마치면서..
이번 포스트에서는 JSON Web Token 을 사용하는 간단한 인증시스템을 구현해보았습니다. 다음 이어질 글에서는 JWT 를 사용 할 때의 보안 이슈, 토큰을 클라이언트측에서 어디에 저장해야 할 지 알아보도록 하겠습니다. 추후, React 어플리케이션에서 이 JWT 기반 인증 시스템을 연동하는 방법도 알아보겠습니다.

# [React.JS] 강좌: React 컴포넌트 구성 & AJAX 비동기 작업 처리하기 & CSS 애니메이션 처리

이어지는 강좌는 해당 사이트에서 보시기 바랍니다.

https://velopert.com/2597
