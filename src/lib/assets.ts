// 자가완결 에셋 중앙 모듈.
// Astro 가 빌드 시 최적화 + 해시 파일명으로 dist/ 에 출력한다 → 외부 의존 0.

import type { ImageMetadata } from 'astro';

// ── 브랜드 로고 ────────────────────────────────────────
// 원본(글루메이트_원본 PNG 세트)에서 가져온 공식 락업.
// 밝은 바탕에는 navy, 네이비 바탕에는 white 버전을 쓴다. 로고 색을 임의로 바꾸지 않는다.
import logoHorizontal from '../assets/brand/logo-horizontal.png'; // 가로 락업 (네이비)
import logoHorizontalWhite from '../assets/brand/logo-horizontal-white.png'; // 가로 락업 (화이트)
import logoHorizontalKo from '../assets/brand/logo-horizontal-ko.png'; // 가로 락업 + 국문 병기
import logoVertical from '../assets/brand/logo-vertical.png'; // 세로 락업 + 국문 병기 (네이비)
import logoVerticalWhite from '../assets/brand/logo-vertical-white.png'; // 세로 락업 (화이트)
import mark from '../assets/brand/mark.png'; // GM 심볼 (네이비)
import markWhite from '../assets/brand/mark-white.png'; // GM 심볼 (화이트)

export const logos = {
  horizontal: logoHorizontal,
  horizontalWhite: logoHorizontalWhite,
  horizontalKo: logoHorizontalKo,
  vertical: logoVertical,
  verticalWhite: logoVerticalWhite,
  mark,
  markWhite,
};

// ── 제품 이미지 (글루밍) ───────────────────────────────
import glumingLogo from '../assets/product/gluming-logo.png';
import glumingHome from '../assets/product/gluming-home.png';
import glumingSim from '../assets/product/gluming-sim.png';
import glumingReport from '../assets/product/gluming-report.png';

export const productImages = {
  glumingLogo,
  glumingHome, // 홈 — 오늘의 컨디션
  glumingSim, // 운동별 예상 변화 비교
  glumingReport, // 14일 리포트
};

// ── 제품 목록 ──────────────────────────────────────────
// 제품은 앞으로 늘어난다. 새 제품은 이 배열에 추가하면 홈·제품 페이지에 함께 반영된다.
export interface Product {
  key: string;
  name: string;
  nameEn: string;
  status: 'live' | 'upcoming';
  statusLabel: string;
  tagline: string;
  summary: string;
  points: string[];
  site?: string;
  logo?: ImageMetadata;
  shots?: { img: ImageMetadata; caption: string }[];
}

export const products: Product[] = [
  {
    key: 'gluming',
    name: '글루밍',
    nameEn: 'Gluming',
    status: 'live',
    statusLabel: '서비스 중',
    tagline: '나의 몸을 이해하는 새로운 방식',
    summary:
      '연속혈당측정(CGM) 센서가 잰 값과 걸음·식사·운동 같은 일상의 기록을 하나로 이어, 생활습관을 스스로 관리하도록 돕는 웰니스 앱입니다. 지난 그래프를 되돌아보는 데서 멈추지 않고, 무언가를 선택하기 전에 흐름을 미리 그려볼 수 있게 만들었습니다.',
    points: [
      '센서·건강 데이터 연동으로 기록 부담을 줄였습니다',
      '식사·운동 전에 예상 흐름을 살펴보는 시뮬레이션',
      '캐릭터와 미션으로 이어가는 매일의 습관',
    ],
    site: 'https://gluming.app',
    logo: glumingLogo,
    shots: [
      { img: glumingHome, caption: '오늘의 컨디션을 한눈에' },
      { img: glumingSim, caption: '행동 전에 흐름을 미리 살펴보기' },
      { img: glumingReport, caption: '2주 단위로 돌아보는 리포트' },
    ],
  },
];
