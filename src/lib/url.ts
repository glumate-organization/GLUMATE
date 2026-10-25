// 내부 링크는 반드시 이 함수를 통과시킨다.
//
// 왜: 같은 빌드가 두 곳에 올라갈 수 있다.
//   - 커스텀 도메인(glumate.co.kr)      → base '/'        → /about
//   - 저장소 경로(github.io/GLUMATE/)   → base '/GLUMATE' → /GLUMATE/about
// Astro 는 문자열 href 를 자동으로 보정해 주지 않으므로, 직접 붙여야 한다.
//
// base 는 astro.config.mjs 에서 BASE_PATH 환경변수로 정해진다 (미설정 시 '/').

/**
 * 내부 경로에 base 를 붙인다. `url('/about')` → '/about/' 또는 '/GLUMATE/about/'
 *
 * 페이지 경로에는 끝 슬래시를 붙인다. GitHub Pages 는 /about 을 /about/ 로 301 시키므로,
 * 슬래시가 없으면 내부 링크마다 리다이렉트가 한 번씩 낀다 (canonical 도 /about/ 형태).
 * 확장자가 있는 파일 경로('/og.png')는 그대로 둔다.
 */
export function url(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, ''); // 끝 슬래시 제거
  if (path === '/') return base === '' ? '/' : `${base}/`;
  let p = path.startsWith('/') ? path : `/${path}`;
  const isFile = /\.[a-z0-9]+$/i.test(p);
  if (!isFile && !p.endsWith('/')) p = `${p}/`;
  return `${base}${p}`;
}
