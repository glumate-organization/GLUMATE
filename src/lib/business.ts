// 빌드 타임에 국세청 '사업자등록 상태조회' 공식 API(공공데이터포털/odcloud)를 호출해
// 결과를 페이지에 그대로 새긴다 → 방문자는 클릭 없이 확인 결과를 바로 본다.
//
// 자가완결: API 호출은 '빌드 시점'에만 일어나고 HTML에는 결과 문자열만 박힌다.
//   → 런타임 외부 의존 0, API 서버가 꺼져도 사이트는 그대로 동작.
//   → 키(NTS_API_KEY)는 빌드 컨텍스트에서만 읽히고 클라이언트 번들에 노출되지 않는다.
//     (PUBLIC_ 접두사를 쓰지 말 것 — 그러면 노출됨)
//
// 키가 없거나 호출이 실패하면 { ok:false } 폴백 → 배지 미표시, 빌드는 안 깨진다.

import { loadEnv } from 'vite';

const B_NO = '7850303768'; // 785-03-03768 (하이픈 제거)
const ENDPOINT = 'https://api.odcloud.kr/api/nts-businessman/v1/status';

function readKey(): string {
  if (process.env.NTS_API_KEY) return process.env.NTS_API_KEY;
  try {
    // 로컬 .env 의 비공개 변수는 import.meta.env 에 실리지 않으므로 직접 읽는다.
    const env = loadEnv('production', process.cwd(), '');
    return env.NTS_API_KEY || '';
  } catch {
    return '';
  }
}

export interface BizStatus {
  ok: boolean;
  bStt?: string; // 예: '계속사업자'
  taxType?: string; // 예: '부가가치세 일반과세자'
  checkedAt?: string; // YYYY-MM-DD (빌드 시점)
}

let cache: Promise<BizStatus> | null = null;

/** 빌드 중 여러 페이지에서 호출해도 실제 요청은 1회만 (모듈 캐시). */
export function getBusinessStatus(): Promise<BizStatus> {
  if (!cache) cache = fetchStatus();
  return cache;
}

async function fetchStatus(): Promise<BizStatus> {
  const key = readKey();
  if (!key) return { ok: false };

  try {
    const res = await fetch(`${ENDPOINT}?serviceKey=${encodeURIComponent(key)}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ b_no: [B_NO] }),
    });
    if (!res.ok) return { ok: false };

    const json = (await res.json()) as { data?: { b_stt?: string; tax_type?: string }[] };
    const d = json.data?.[0];
    // 미등록 번호면 b_stt 가 빈 문자열로 온다 → 폴백
    if (!d || !d.b_stt) return { ok: false };

    return {
      ok: true,
      bStt: d.b_stt,
      taxType: d.tax_type,
      checkedAt: new Date().toISOString().slice(0, 10),
    };
  } catch {
    return { ok: false };
  }
}
