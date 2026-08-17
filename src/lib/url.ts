// 내부 링크는 반드시 이 함수를 통과시킨다.
//
// 왜: 같은 빌드가 두 곳에 올라갈 수 있다.
//   - 커스텀 도메인(glumate.co.kr)      → base '/'        → /about
//   - 저장소 경로(github.io/GLUMATE/)   → base '/GLUMATE' → /GLUMATE/about
// Astro 는 문자열 href 를 자동으로 보정해 주지 않으므로, 직접 붙여야 한다.
//
// base 는 astro.config.mjs 에서 BASE_PATH 환경변수로 정해진다 (미설정 시 '/').

/** 내부 경로에 base 를 붙인다. `url('/about')` → '/about' 또는 '/GLUMATE/about' */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, ''); // 끝 슬래시 제거
  if (path === '/') return base === '' ? '/' : `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
