// 검색엔진 관련 설정 단일 출처. Layout.astro 의 <head> 에서 읽는다.
//
// 사이트 소유 확인 코드는 비밀값이 아니다(HTML 에 그대로 노출되는 값).
// 검색엔진 콘솔에서 새 코드를 받으면 여기만 고친다.
export const seo = {
  /** 네이버 서치어드바이저 사이트 소유 확인 */
  naverSiteVerification: 'c91ce495f5e7b9a1e1f4c6e223c90724da22f6a0',
  /** 구글 서치콘솔 — 발급받으면 채운다. 비어 있으면 태그를 내지 않는다. */
  googleSiteVerification: '',
} as const;
