import { defineConfig } from 'astro/config';

// 글루메이트 기업 사이트 — 정적 빌드(GitHub Pages 배포 전제).
// 런타임 외부 의존 0: 폰트/이미지 모두 번들, API 호출은 빌드 시점에만.
export default defineConfig({
  site: 'https://glumate.org',
  base: '/',
  output: 'static',
});
