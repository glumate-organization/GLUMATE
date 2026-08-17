import { defineConfig } from 'astro/config';

// 글루메이트 기업 사이트 — 정적 빌드(GitHub Pages 배포 전제).
// 런타임 외부 의존 0: 폰트/이미지 모두 번들, API 호출은 빌드 시점에만.
//
// 배포 위치가 두 곳일 수 있어 site/base 를 환경변수로 받는다.
//   - 커스텀 도메인:  (기본값) SITE_URL/BASE_PATH 미설정 → https://glumate.org, base '/'
//   - 저장소 경로:    SITE_URL=https://glumate-organization.github.io BASE_PATH=/GLUMATE
// 내부 링크는 반드시 src/lib/url.ts 의 url() 을 거쳐야 base 가 붙는다.
export default defineConfig({
  site: process.env.SITE_URL || 'https://glumate.org',
  base: process.env.BASE_PATH || '/',
  output: 'static',
  trailingSlash: 'ignore',
});
