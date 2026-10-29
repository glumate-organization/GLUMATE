import { company } from './company';

/** 제목을 미리 채운 문의 메일 링크. 문의 창구는 메일 하나다. */
export const mailto = (subject: string) =>
  `mailto:${company.email}?subject=${encodeURIComponent(`[글루메이트] ${subject}`)}`;
