<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f8fa">
  <meta name="description" content="咕咕番网站入口调整公告。">
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='16' fill='%2300aeec'/%3E%3Cpath d='M18 22h28v20H18z' fill='none' stroke='white' stroke-width='4'/%3E%3Cpath d='m28 26 12 6-12 6Z' fill='white'/%3E%3C/svg%3E">
  <title>新网站引导 · 咕咕番</title>
  <style>
    :root {
      color-scheme: light;
      --blue: #00aeec;
      --blue-dark: #00658b;
      --ink: #191c1d;
      --muted: #6e7881;
      --soft-ink: #3e4850;
      --line: #e7e8e9;
      --surface: #f3f4f5;
      --pink: #a83159;
    }

    * { box-sizing: border-box; }
    html { min-width: 320px; }
    body {
      min-height: 100vh;
      min-height: 100dvh;
      margin: 0;
      color: var(--ink);
      background: #f6f8fa;
      font-family: "Plus Jakarta Sans", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
      -webkit-font-smoothing: antialiased;
    }
    body::before {
      position: fixed;
      inset: 0;
      z-index: -1;
      background:
        radial-gradient(circle at 12% 17%, #c5e7ff88, transparent 30%),
        radial-gradient(circle at 88% 84%, #ffd9e077, transparent 29%);
      content: "";
      pointer-events: none;
    }
    button { font: inherit; }
    button:focus-visible { outline: 3px solid var(--blue-dark); outline-offset: 3px; }
    .page { width: min(100% - 48px, 1120px); min-height: 100dvh; margin: 0 auto; display: flex; flex-direction: column; }
    .topbar { min-height: 96px; display: flex; align-items: center; justify-content: space-between; gap: 20px; }
    .brand { display: inline-flex; align-items: center; gap: 12px; font-size: 18px; font-weight: 750; letter-spacing: -.04em; }
    .brand-mark { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 12px; color: white; background: linear-gradient(145deg, #00aeec, #00658b); box-shadow: 0 8px 20px #00aeec33; }
    .brand-mark svg { width: 22px; height: 22px; }
    .top-note { display: inline-flex; align-items: center; gap: 7px; padding: 7px 12px; border: 1px solid #c5e7ff; border-radius: 999px; color: var(--blue-dark); background: #eaf8ff; font-size: 12px; line-height: 16px; font-weight: 700; white-space: nowrap; }
    .top-note svg { width: 14px; height: 14px; }
    main { flex: 1; display: grid; align-items: center; padding: 32px 0 56px; }
    .card { width: min(100%, 860px); margin: 0 auto; overflow: hidden; border: 1px solid #e7e8e999; border-radius: 24px; background: #fffffff2; box-shadow: 0 25px 50px -12px #00000026, 0 8px 18px #191c1d0a; backdrop-filter: blur(24px); }
    .card-head { position: relative; overflow: hidden; padding: 52px 56px 40px; border-bottom: 1px solid #edeeef; background: linear-gradient(127deg, #00aeec1c, #fc739a0d 57%, #fff 92%); }
    .card-head::after { position: absolute; top: -93px; right: -54px; width: 300px; height: 300px; border: 1px solid #00aeec17; border-radius: 50%; box-shadow: 0 0 0 46px #00aeec0b, 0 0 0 92px #00aeec08; content: ""; pointer-events: none; }
    .eyebrow { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: 8px; margin: 0 0 20px; color: var(--blue-dark); font-size: 12px; line-height: 18px; font-weight: 800; letter-spacing: .12em; }
    .eyebrow-dot { width: 7px; height: 7px; border-radius: 50%; background: var(--blue); box-shadow: 0 0 0 4px #00aeec20; }
    h1 { position: relative; z-index: 1; max-width: 650px; margin: 0; font-size: clamp(34px, 5vw, 52px); line-height: 1.18; font-weight: 800; letter-spacing: -.055em; }
    .lead { position: relative; z-index: 1; max-width: 640px; margin: 20px 0 0; color: var(--soft-ink); font-size: 16px; line-height: 1.9; }
    .card-body { padding: 32px 56px 44px; }
    .section-label { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 14px; color: var(--muted); font-size: 12px; line-height: 18px; font-weight: 700; letter-spacing: .08em; }
    .section-label strong { display: inline-flex; align-items: center; gap: 7px; padding: 5px 9px; border-radius: 999px; background: var(--surface); color: var(--soft-ink); font-size: 11px; line-height: 15px; font-weight: 700; letter-spacing: 0; }
    .section-label strong::before { width: 6px; height: 6px; border-radius: 50%; background: #aeb8c1; content: ""; }
    .ready .section-label strong { background: #e8f9f3; color: #147b5e; }
    .ready .section-label strong::before { background: #10b981; }
    .route { display: grid; grid-template-columns: minmax(0, 1fr) 38px minmax(0, 1fr); align-items: center; gap: 12px; padding: 16px; border: 1px solid #e9eff3; border-radius: 16px; background: var(--surface); }
    .route-item { min-width: 0; padding: 10px 14px; }
    .route-item.new { border: 1px solid #b9e8fa; border-radius: 12px; background: #f7fdff; }
    .route-item span { display: block; margin-bottom: 6px; color: var(--muted); font-size: 11px; line-height: 16px; font-weight: 700; }
    .route-item strong { display: block; overflow-wrap: anywhere; color: var(--soft-ink); font-size: 16px; line-height: 22px; font-weight: 700; }
    .route-item.new strong { color: var(--blue-dark); }
    .route-arrow { width: 38px; height: 38px; display: grid; place-items: center; border-radius: 50%; background: white; color: var(--blue-dark); box-shadow: 0 2px 8px #191c1d0b; font-size: 24px; line-height: 1; }
    .address { min-height: 20px; margin: 13px 0 0; color: var(--muted); font-size: 12px; line-height: 20px; overflow-wrap: anywhere; }
    .address strong { color: var(--soft-ink); font-weight: 600; }
    .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 28px; }
    .primary, .secondary { min-height: 46px; display: inline-flex; align-items: center; justify-content: center; gap: 9px; padding: 0 22px; border-radius: 999px; border: 1px solid transparent; cursor: pointer; font-size: 14px; line-height: 20px; font-weight: 700; transition: transform .2s, background .2s, box-shadow .2s; }
    .primary { color: white; background: var(--blue); box-shadow: 0 10px 15px -3px #00aeec40; }
    .primary:not(:disabled):hover { background: var(--blue-dark); transform: translateY(-2px); box-shadow: 0 16px 25px -5px #00aeec44; }
    .primary:disabled { color: #6e7881; background: #e7e8e9; box-shadow: none; cursor: not-allowed; }
    .secondary { color: var(--blue-dark); background: white; border-color: #c5e7ff; }
    .secondary:not(:disabled):hover { background: #eaf8ff; }
    .secondary:disabled { color: #a5afb8; border-color: var(--line); cursor: not-allowed; }
    .actions svg { width: 17px; height: 17px; flex: none; }
    .hint { display: flex; align-items: flex-start; gap: 10px; margin-top: 32px; padding: 14px 16px; border-radius: 12px; color: var(--soft-ink); background: #f3f4f5; font-size: 12px; line-height: 19px; }
    .hint svg { width: 17px; height: 17px; flex: none; margin-top: 1px; color: var(--blue-dark); }
    .hint p { margin: 0; }
    .hint strong { color: var(--ink); }
    .footer { display: flex; justify-content: space-between; gap: 12px; padding: 0 0 28px; color: var(--muted); font-size: 11px; line-height: 16px; }
    .toast { position: fixed; right: 24px; bottom: 24px; max-width: min(340px, calc(100vw - 32px)); padding: 12px 16px; border: 1px solid #c5e7ff; border-radius: 12px; color: var(--blue-dark); background: #fffffff2; box-shadow: 0 12px 30px #191c1d1a; font-size: 13px; font-weight: 600; opacity: 0; transform: translateY(10px); pointer-events: none; transition: opacity .2s, transform .2s; }
    .toast.visible { opacity: 1; transform: translateY(0); }
    @media (max-width: 640px) {
      .page { width: min(100% - 32px, 440px); }
      .topbar { min-height: 78px; }
      .brand { font-size: 16px; }
      .brand-mark { width: 34px; height: 34px; border-radius: 10px; }
      .top-note { padding: 6px 9px; font-size: 11px; }
      main { align-items: start; padding: 12px 0 40px; }
      .card { border-radius: 18px; }
      .card-head { padding: 34px 24px 30px; }
      .card-head::after { right: -170px; }
      .eyebrow { margin-bottom: 16px; }
      h1 { font-size: clamp(32px, 8.7vw, 40px); }
      .lead { margin-top: 16px; font-size: 14px; line-height: 1.8; }
      .card-body { padding: 24px 20px 28px; }
      .route { grid-template-columns: minmax(0, 1fr); gap: 8px; padding: 12px; }
      .route-item { padding: 8px 10px; }
      .route-arrow { width: 28px; height: 28px; margin-left: 10px; transform: rotate(90deg); font-size: 20px; }
      .actions { display: grid; grid-template-columns: minmax(0, 1fr); gap: 10px; margin-top: 24px; }
      .primary, .secondary { width: 100%; }
      .hint { margin-top: 24px; }
      .footer { flex-direction: column; gap: 4px; }
    }
    @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; transition: none !important; animation: none !important; } }
  </style>
</head>
<body>
  <div class="page">
    <header class="topbar">
      <div class="brand" aria-label="咕咕番">
        <span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><path d="M4 6.5h16v11H4z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="m10 9 5 3-5 3V9Z" fill="currentColor"/></svg></span>
        <span>咕咕番</span>
      </div>
      <span class="top-note"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3.5 4 7v5c0 5.2 3.4 8.2 8 9.5 4.6-1.3 8-4.3 8-9.5V7l-8-3.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="m8.7 12.3 2.2 2.2 4.5-5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>站点迁移公告</span>
    </header>

    <main>
      <article class="card" aria-labelledby="page-title">
        <div class="card-head">
          <p class="eyebrow"><span class="eyebrow-dot" aria-hidden="true"></span>GOGUGUFAN · A NEW HOME</p>
          <h1 id="page-title">新的地址，<br>同样的咕咕番。</h1>
          <p class="lead">网站访问入口已调整。请从这里前往新网站，继续追番与交流，并把新地址加入浏览器书签。</p>
        </div>

        <div class="card-body">
          <div class="section-label"><span>访问入口</span><strong id="site-status">新站地址待公布</strong></div>
          <div class="route" aria-label="网站地址迁移">
            <div class="route-item"><span>原网站</span><strong id="old-site">当前站点</strong></div>
            <span class="route-arrow" aria-hidden="true">→</span>
            <div class="route-item new"><span>新网站</span><strong id="new-site">地址待公布</strong></div>
          </div>
          <p class="address">完整地址：<strong id="full-address">配置后将在这里显示</strong></p>

          <div class="actions">
            <button type="button" class="primary" id="go-button" disabled>地址待公布 <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            <button type="button" class="secondary" id="copy-button" disabled><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" stroke="currentColor" stroke-width="1.8"/></svg>复制新站地址</button>
          </div>

          <div class="hint"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 10.5v5m0-8h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg><p><strong>温馨提示</strong>　请认准本站公布的新地址，前往新站后更新书签。输入账号信息前，请核对浏览器地址栏。</p></div>
        </div>
      </article>
    </main>

    <footer class="footer"><span>© 咕咕番 · 感谢你一路同行</span><span>好故事，换个地址继续看。</span></footer>
  </div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>

  <script>
    // 部署前只需填写这一处，例如："https://new.example.com/"
    const NEW_SITE_URL = "https://gugu.fan/";

    const goButton = document.getElementById("go-button");
    const copyButton = document.getElementById("copy-button");
    const toast = document.getElementById("toast");
    let toastTimer;
    let target = null;

    try {
      const parsed = new URL(NEW_SITE_URL);
      if (parsed.protocol === "https:" && !parsed.username && !parsed.password) {
        target = parsed;
      }
    } catch { /* 保持未配置状态 */ }

    if (/^https?:$/.test(location.protocol) && !/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) {
      document.getElementById("old-site").textContent = location.hostname;
    }

    if (target) {
      document.documentElement.classList.add("ready");
      document.getElementById("site-status").textContent = "新网站已启用";
      document.getElementById("new-site").textContent = target.host;
      document.getElementById("full-address").textContent = target.href;
      goButton.firstChild.textContent = "前往新网站 ";
      goButton.disabled = false;
      copyButton.disabled = false;
    }

    function showToast(message) {
      toast.textContent = message;
      toast.classList.add("visible");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("visible"), 3500);
    }

    goButton.addEventListener("click", () => {
      if (target) location.assign(target.href);
    });
    copyButton.addEventListener("click", async () => {
      if (!target) return;
      try {
        await navigator.clipboard.writeText(target.href);
        showToast("新网站地址已复制");
      } catch {
        showToast("复制失败，请手动选择上方完整地址");
      }
    });
  </script>
</body>
</html>
