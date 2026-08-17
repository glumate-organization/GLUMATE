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

/** 파트너십 · 선정 이력 */
export interface Credential {
  key: string;
  kind: string;
  name: string;
  title: string;
  body: string;
  meta: string;
}

export const credentials: Credential[] = [
  {
    key: 'isens',
    kind: 'Partnership',
    name: '㈜아이센스',
    title: '연속혈당측정 센서 제조사와 함께합니다',
    body: '케어센스 에어(CareSens Air)를 만드는 ㈜아이센스와 개발 파트너십을 맺었습니다.',
    meta: '개발 파트너십 체결',
  },
  {
    key: 'startup-academy',
    kind: 'Selected',
    name: '청년창업사관학교 16기',
    title: '창업 지원 프로그램',
    body: '중소벤처기업진흥공단이 운영하는 청년창업사관학교 16기에 선정되었습니다.',
    meta: '중소벤처기업진흥공단',
  },
];
