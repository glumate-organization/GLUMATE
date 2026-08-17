// 회사 정보 단일 출처(single source of truth).
//
// 아래 값은 모두 공적 증빙 서류에서 그대로 옮긴 것이다.
//  - 사업자등록증명 (발급번호 1737-690-7027-302, 2026-08-03 발급, 북대전세무서)
//  - 통신판매업신고증 (제 2026-대전대덕-0372 호, 2026-08-14, 대전광역시 대덕구청)
//
// ⚠️ 이 파일에는 법인/사업자 공개 정보만 둔다.
//    대표자 생년월일·주민등록번호 등 개인정보는 절대 넣지 않는다.

export const company = {
  nameKo: '글루메이트',
  nameEn: 'GLUMATE',
  legalName: '글루메이트',
  ceo: '윤정훈',

  /** 슬로건 — 회사의 존재 이유 */
  slogan: '더 많은 사람들이 건강하게 살 수 있는 세상을 만들기 위해 최선을 다합니다.',
  sloganShort: '더 많은 사람들이 건강하게 살 수 있는 세상을',

  bizNo: '785-03-03768',
  /** 통신판매업 신고번호 — 2026.08 대덕구 이전 신고 기준 */
  mailOrderNo: '제 2026-대전대덕-0372 호',

  foundedISO: '2026-03-25',
  foundedLabel: '2026년 3월 25일',
  registeredLabel: '2026년 3월 26일',

  bizType: '정보통신업',
  bizItem: '응용 소프트웨어 개발 및 공급업',
  taxType: '일반과세자',

  address: '대전광역시 대덕구 한남로 70, B203호 (오정동, 한남대학교 캠퍼스혁신파크)',
  addressShort: '대전광역시 대덕구 한남로 70, B203호',
  addressBuilding: '한남대학교 캠퍼스혁신파크 B동 203호',

  email: 'glumate@glumate.org',
  site: 'https://glumate.org',
} as const;

/** 회사 정보 표에 그대로 렌더링되는 행 (기업 신뢰 정보) */
export const companySpec: { label: string; value: string }[] = [
  { label: '상호', value: `${company.nameKo} (${company.nameEn})` },
  { label: '대표자', value: company.ceo },
  { label: '사업자등록번호', value: company.bizNo },
  { label: '통신판매업 신고번호', value: company.mailOrderNo },
  { label: '설립일', value: company.foundedLabel },
  { label: '업태 · 종목', value: `${company.bizType} · ${company.bizItem}` },
  { label: '소재지', value: company.address },
  { label: '이메일', value: company.email },
];
