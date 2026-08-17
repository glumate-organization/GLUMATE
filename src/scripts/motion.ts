/**
 * 스크롤 모션 엔진 — 외부 라이브러리 0, 약 3KB.
 *
 * 안전 원칙(중요): JS가 실패해도 콘텐츠는 반드시 보여야 한다.
 *   → 요소를 숨기는 CSS는 `html.js` 가 붙었을 때만 적용된다(Layout head의 인라인 스크립트).
 *   → 모션을 끈 사용자(prefers-reduced-motion)에게는 관측만 하고 즉시 보이게 한다.
 *
 * 제공 기능
 *   [data-reveal]            진입 시 페이드+상승. data-reveal="stagger" 면 자식이 차례로.
 *   [data-parallax="0.12"]   스크롤에 따라 살짝 어긋나게 움직임.
 *   [data-count="3"]         화면에 들어오면 0 → 값까지 세어 올라감.
 *   [data-pin]               구간을 붙잡아 두고 내부 트랙을 가로로 밀어냄.
 *   .progress-bar            페이지 스크롤 진행률.
 */

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── 1. 진입 리빌 ─────────────────────────────────────────
function initReveal() {
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!targets.length) return;

  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  // stagger 컨테이너는 자식에게 순번(--i)을 부여해 시차를 만든다.
  targets.forEach((el) => {
    if (el.dataset.reveal !== 'stagger') return;
    Array.from(el.children).forEach((child, i) => {
      (child as HTMLElement).style.setProperty('--i', String(i));
    });
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
  );

  targets.forEach((el) => io.observe(el));
}

// ── 2. 숫자 카운트 ───────────────────────────────────────
function initCounters() {
  const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  if (!nodes.length) return;

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count || '0');
    if (reduce) {
      el.textContent = String(target);
      return;
    }
    const dur = 900;
    const start = performance.now();
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      el.textContent = String(target);
    };
    const tick = (now: number) => {
      if (done) return;
      const t = Math.min(1, (now - start) / dur);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = String(Math.round(target * eased));
      if (t < 1) requestAnimationFrame(tick);
      else finish();
    };
    requestAnimationFrame(tick);
    // 안전망: 백그라운드 탭 등으로 rAF가 멈춰도 값은 반드시 채워진다.
    setTimeout(finish, dur + 600);
  };

  if (!('IntersectionObserver' in window)) {
    nodes.forEach(run);
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target as HTMLElement);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.6 }
  );
  nodes.forEach((el) => io.observe(el));
}

// ── 3. 스크롤 구동 (진행바 · 패럴랙스 · 핀) ──────────────
function initScrollDriven() {
  const bar = document.querySelector<HTMLElement>('.progress-bar');
  const parallax = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
  const pins = Array.from(document.querySelectorAll<HTMLElement>('[data-pin]'));

  if (!bar && !parallax.length && !pins.length) return;

  // 모션을 끈 사용자에게는 진행바만 남기고 변형은 적용하지 않는다.
  const allowTransform = !reduce;
  let ticking = false;

  const update = () => {
    ticking = false;
    const vh = window.innerHeight;

    if (bar) {
      const max = document.documentElement.scrollHeight - vh;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    }

    if (!allowTransform) return;

    for (const el of parallax) {
      const speed = Number(el.dataset.parallax || '0.1');
      const rect = el.getBoundingClientRect();
      // 요소 중심이 화면 중심에서 얼마나 벗어났는지 (-1 ~ 1)
      const offset = (rect.top + rect.height / 2 - vh / 2) / vh;
      el.style.transform = `translate3d(0, ${(offset * speed * 100).toFixed(2)}px, 0)`;
    }

    for (const pin of pins) {
      const track = pin.querySelector<HTMLElement>('[data-pin-track]');
      if (!track || pin.dataset.pinActive !== 'true') continue;
      const rect = pin.getBoundingClientRect();
      const distance = Math.max(0, track.scrollWidth - pin.clientWidth);
      const total = pin.offsetHeight - vh;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
      track.style.transform = `translate3d(${(-p * distance).toFixed(1)}px, 0, 0)`;
    }
  };

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  // 핀 구간은 넓은 화면에서만 켠다 (모바일은 그냥 세로로 쌓임)
  const mq = window.matchMedia('(min-width: 900px)');
  const syncPins = () => {
    pins.forEach((pin) => {
      const on = mq.matches && allowTransform;
      pin.dataset.pinActive = String(on);
      if (!on) {
        const track = pin.querySelector<HTMLElement>('[data-pin-track]');
        if (track) track.style.transform = '';
      }
    });
    update();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', syncPins);
  mq.addEventListener?.('change', syncPins);
  syncPins();
}

// ── 4. 히어로 첫 등장 ────────────────────────────────────
function initIntro() {
  const ready = () => document.documentElement.classList.add('is-ready');
  requestAnimationFrame(ready);
  // rAF는 백그라운드 탭에서 멈춘다. 히어로가 영영 숨겨지는 일은 없어야 한다.
  setTimeout(ready, 150);
}

function boot() {
  initIntro();
  initReveal();
  initCounters();
  initScrollDriven();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
