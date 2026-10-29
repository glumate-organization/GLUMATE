// 회사의 기술·성과 근거 단일 출처.
//
// ⚠️ 원칙: 확인 가능한 사실만 적는다. 특허는 '출원'과 '등록'이 다르므로 반드시
//    "출원(심사 진행 중)"으로만 표기하고, 등록된 것처럼 쓰지 않는다.
//    출원번호·명세서 내용은 공개하지 않고 기술 영역만 짧게 적는다.

/** 특허 출원 (3건, 2026.06.01 출원 · 심사 진행 중) */
export interface PatentArea {
  no: string;
  area: string;
  title: string;
  body: string;
}

export const patentAreas: PatentArea[] = [
  {
    no: '01',
    area: 'Personalization',
    title: '짧게 착용해도 남는 개인 맞춤 예측',
    body: '센서를 오래 붙이고 있지 않아도, 짧은 기간의 측정 데이터로 그 사람에게 맞는 혈당 흐름을 그려내는 기술입니다.',
  },
  {
    no: '02',
    area: 'Prediction',
    title: '운동 강도를 반영한 단기 예측',
    body: '최근 데이터와 운동 강도(METs)를 함께 계산해, 지금 이 운동을 하면 흐름이 어떻게 달라질지 미리 살펴볼 수 있게 합니다.',
  },
  {
    no: '03',
    area: 'Interpretation',
    title: '여러 지표를 하나의 상태로',
    body: '혈당·활동 같은 여러 생체 지표를 하나의 건강 상태 점수로 합치고, 숫자 대신 캐릭터의 표정으로 전합니다.',
  },
];

export const patentSummary = {
  count: 3,
  filedLabel: '2026년 6월 출원',
  statusLabel: '심사 진행 중',
  note: '특허 출원 3건 — 모두 심사 진행 중이며, 등록 여부가 확정된 권리는 아닙니다.',
};

/** 지식재산 현황 — 상태를 정확히 나눠 적는다. 출원(filed)은 심사 중, 등록(registered)만 확정된 권리. */
export interface IpItem {
  key: string;
  kind: string;
  en: string;
  count: number;
  status: 'filed' | 'registered';
  statusLabel: string;
  /** 공개해도 되는 범위의 한 줄. 출원번호·명세 내용은 적지 않는다. */
  scope?: string;
}

export const ipPortfolio = {
  asOf: '2026년 10월 기준',
  items: [
    {
      key: 'patent',
      kind: '특허',
      en: 'Patent',
      count: 3,
      status: 'filed',
      statusLabel: '출원 · 심사 진행 중',
      scope: '혈당 예측과 건강 상태 해석 기술',
    },
    {
      key: 'trademark',
      kind: '상표',
      en: 'Trademark',
      count: 3,
      status: 'filed',
      statusLabel: '출원 · 심사 진행 중',
    },
    {
      key: 'design',
      kind: '디자인',
      en: 'Design',
      count: 2,
      status: 'filed',
      statusLabel: '출원 · 심사 진행 중',
    },
    {
      key: 'copyright',
      kind: '저작권',
      en: 'Copyright',
      count: 4,
      status: 'registered',
      statusLabel: '등록 완료',
      scope: '글루밍즈 캐릭터 4종',
    },
  ] as IpItem[],
};

export const ipTotals = {
  all: ipPortfolio.items.reduce((n, i) => n + i.count, 0),
  filed: ipPortfolio.items.filter((i) => i.status === 'filed').reduce((n, i) => n + i.count, 0),
  registered: ipPortfolio.items
    .filter((i) => i.status === 'registered')
    .reduce((n, i) => n + i.count, 0),
};

/** 선정 · 파트너십 — 엠블럼 상패로 보여준다. */
export interface Honor {
  key: string;
  emblem: 'medal' | 'laurel' | 'seal';
  /** 맨 위 전체 폭으로 크게 보여줄 상패 */
  featured?: boolean;
  /** 엠블럼 가운데 새기는 짧은 표기 */
  mark: string;
  org: string;
  title: string;
  sub: string;
  date: string;
}

export const honors: Honor[] = [
  {
    key: 'wellness-makers',
    emblem: 'medal',
    featured: true,
    mark: '대상',
    org: '대전광역시',
    title: '장대 웰니스 메이커스 대상 수상',
    sub: '1위 수상 후 대전시와 함께 지역 시민을 위한 혈당 관리 프로그램을 운영하고 있습니다.',
    date: '2026.10',
  },
  {
    key: 'startup-academy',
    emblem: 'laurel',
    mark: '16',
    org: '중소벤처기업진흥공단',
    title: '청년창업사관학교 16기 선정',
    sub: '창업 지원 프로그램',
    date: '2026.03',
  },
  {
    key: 'isens',
    emblem: 'seal',
    mark: 'i-SENS',
    org: '㈜아이센스',
    title: '개발 파트너십 체결',
    sub: '케어센스 에어 데이터 연동 · 센서 공급 협력',
    date: '2026.07',
  },
];

/** 입주 — 상패보다 한 단계 낮춰 한 줄로 둔다. */
export const residency = {
  name: '대전소셜벤처캠퍼스',
  role: '입주기업',
  org: '대전창조경제혁신센터',
  since: '2026.11',
};
