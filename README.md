# 글루메이트 기업 사이트 (glumate.co.kr)

글루메이트(GLUMATE)의 회사 웹사이트. **Astro** 정적 사이트로 빌드해 **GitHub Pages**에 배포한다.
제품(글루밍) 사이트는 별도 리포(`Gluming/docs` → gluming.app)에 있다.

```bash
npm install
npm run dev       # 로컬 개발 서버
npm run build     # 정적 빌드 → dist/
npm run preview   # 빌드 결과 미리보기
```

Node 22 이상.

---

## 페이지

| 경로 | 내용 |
| --- | --- |
| `/` | 홈 — 슬로건, 숫자, 기술(핀 스크롤), 파트너십, 제품, 문의 |
| `/about` | 회사 소개 — 미션, 이름의 뜻, 가치, 연혁, 함께하는 곳 |
| `/technology` | 기술 — 특허 출원 3건, 데이터 파이프라인, 파트너십, 경계 |
| `/products` | 제품 — 글루밍 상세, 제품 기준 |
| `/contact` | 문의 — 연락 창구, 문의 유형, 찾아오시는 길 |
| `/privacy` | 기업 웹사이트 개인정보처리방침 |
| `/sitemap.xml` | 빌드 시 생성 (페이지 추가 시 `src/pages/sitemap.xml.ts` 배열에 한 줄 추가) |

---

## 원칙

### 1. 자가완결 (self-contained)

런타임에 외부 서버·CDN·API에 의존하지 않는다. `dist/`만으로 완전히 동작해야 한다.

- 폰트(Pretendard)·로고·스크린샷은 전부 `src/assets/`에 두고 번들한다.
- 외부 이미지 URL, CDN 폰트 `<link>`, 런타임 fetch 금지.
- 예외: `og:image`·`canonical` 같은 **자기 도메인 절대 URL 메타데이터**는 렌더링 의존이 아니므로 허용.
- 국세청 사업자등록 상태 조회는 **빌드 시점**에만 호출하고 결과 문자열만 HTML에 새긴다.

### 2. 웰니스 포지셔닝

글루메이트가 만드는 서비스는 **의료기기·진단·치료 서비스가 아니다.**
의학적 단정, 진단/치료/완치 표현, 효능·수치 보장 표현을 쓰지 않는다.

### 3. 확인 가능한 사실만

- 특허는 **출원(심사 진행 중)** 으로만 표기한다. 등록된 권리처럼 쓰지 않는다.
- 사업자등록번호·통신판매업 신고번호 등 등록 정보는 **푸터에만** 둔다. 본문 섹션으로 올리지 않는다.
- 대표자 생년월일·주민등록번호 등 개인정보는 어떤 파일에도 넣지 않는다.

---

## 구조

```
src/
├── assets/
│   ├── brand/      로고 원본 PNG (가로/세로 × 네이비/화이트, GM 심볼)
│   ├── fonts/      PretendardVariable.woff2 (self-host)
│   └── product/    글루밍 로고 · 앱 스크린샷
├── components/     Nav · Footer · SectionHead
├── layouts/        Layout.astro (메타 · JSON-LD · 모션 부트)
├── lib/
│   ├── company.ts      회사 정보 단일 출처 (증빙 서류 기재값)
│   ├── credentials.ts  특허 출원 영역 · 파트너십 · 선정 이력
│   ├── assets.ts       이미지 · 제품 목록
│   ├── links.ts        외부 링크 단일 출처
│   └── business.ts     국세청 사업자등록 상태 조회 (빌드 타임)
├── pages/
├── scripts/motion.ts   스크롤 모션 엔진 (라이브러리 0)
└── styles/global.css   디자인 토큰 + 모션 레이어
```

**내용을 고칠 때는 `src/lib/`의 데이터 파일을 먼저 본다.** 회사 정보·제품·특허·링크는 전부
거기서 한 번만 정의하고 페이지들이 가져다 쓴다.

---

## 모션

`src/scripts/motion.ts` — 외부 라이브러리 없이 동작한다.

| 마크업 | 동작 |
| --- | --- |
| `[data-reveal]` | 화면에 들어오면 페이드 + 상승 |
| `[data-reveal="stagger"]` | 자식이 90ms 간격으로 차례차례 |
| `[data-parallax="0.12"]` | 스크롤에 따라 살짝 어긋나게 이동 |
| `[data-count="3"]` | 0부터 값까지 세어 올라감 |
| `[data-pin]` + `[data-pin-track]` | 구간을 붙잡고 내부 트랙을 가로로 밀어냄 (900px 이상에서만) |
| `.line > span` | 히어로 제목의 줄 단위 마스크 등장 |
| `.progress-bar` | 페이지 스크롤 진행률 |

**안전 규칙 두 가지 (반드시 지킬 것)**

1. 요소를 숨기는 CSS는 전부 `html.js` 안에서만 적용된다. `Layout.astro` `<head>`의 인라인
   한 줄이 `js` 클래스를 붙인다. **JS가 죽어도 콘텐츠는 100% 보인다.**
2. `data-parallax`와 `.intro`/`[data-reveal]`을 **같은 요소에 걸지 않는다.** JS가 쓰는
   인라인 `transform`이 CSS 등장 애니메이션의 `transform`을 덮어쓴다. 래퍼를 하나 두고 나눠 건다.

`prefers-reduced-motion: reduce`면 모든 변형을 끄고 즉시 최종 상태로 보여준다.

---

## 배포

`.github/workflows/deploy.yml` — `main` 푸시 시 빌드 후 GitHub Pages에 배포한다.
리포지토리: `glumate-organization/GLUMATE`

### 서빙 주소

<https://glumate.co.kr> — GitHub Pages 커스텀 도메인 (`public/CNAME`).
DNS A 레코드가 이미 GitHub Pages(`185.199.108~111.153`)를 가리키고 있다.

커스텀 도메인이라 사이트는 **루트(`/`)**에 올라간다. 그래서 `astro.config.mjs`의
기본값(`site: https://glumate.co.kr`, `base: '/'`)을 그대로 쓴다.

저장소 하위 경로(`github.io/GLUMATE/`)로 임시 배포해야 할 일이 생기면 빌드 시
`SITE_URL`/`BASE_PATH`만 넘기면 된다. 내부 링크는 전부 `src/lib/url.ts`의 `url()`을
거치므로 base가 자동으로 붙는다. **`href="/about"` 같은 하드코딩은 쓰지 않는다.**

```bash
SITE_URL=https://glumate-organization.github.io BASE_PATH=/GLUMATE npm run build
```

### 환경변수

| 이름 | 용도 | 없으면 |
| --- | --- | --- |
| `NTS_API_KEY` | 국세청 사업자등록 상태조회(공공데이터포털 odcloud) | 푸터의 "국세청 확인" 배지만 미표시. 빌드는 정상 |

로컬은 `.env`(gitignore됨), CI는 리포지토리 secret으로 주입한다. `.env.example` 참고.
키는 **빌드 컨텍스트에서만** 읽히며 클라이언트 번들에 포함되지 않는다 (`PUBLIC_` 접두사 금지).
