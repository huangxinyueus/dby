<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>浮光</title>
<style>
*{box-sizing:border-box}
html,body{width:100%;height:100%;margin:0;overflow:hidden;background:#030508}
body{position:fixed;inset:0;color:#f4f7f8;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI","PingFang SC","Microsoft YaHei",sans-serif}
canvas{position:absolute;inset:0;width:100%;height:100%;display:block;touch-action:none}
.shade{position:absolute;inset:0;pointer-events:none;background:radial-gradient(circle at center,transparent 16%,rgba(0,0,0,.12) 58%,rgba(0,0,0,.68) 100%)}
.scene{position:absolute;inset:0;display:grid;place-items:center;pointer-events:none;text-align:center;padding:24px}
.mark{transform:translateY(-2vh);text-shadow:0 2px 28px rgba(0,0,0,.45)}
h1{margin:0;font-family:Georgia,"Times New Roman","Songti SC",serif;font-size:clamp(42px,8vw,88px);font-weight:400;line-height:1;letter-spacing:0}
p{margin:14px 0 0;font-size:clamp(12px,1.6vw,16px);font-weight:300;color:rgba(255,255,255,.72);letter-spacing:0}
.visit{display:inline-flex;align-items:center;justify-content:center;margin-top:28px;padding:11px 20px;border:1px solid rgba(255,255,255,.48);border-radius:999px;background:rgba(8,12,18,.22);backdrop-filter:blur(12px);color:#fff;font-size:13px;text-decoration:none;pointer-events:auto;transition:background .2s ease,border-color .2s ease,transform .2s ease}
.visit:hover,.visit:focus-visible{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.82);transform:translateY(-2px);outline:none}
.corner{position:absolute;left:50%;bottom:clamp(18px,4vw,42px);transform:translateX(-50%);font-size:11px;color:rgba(255,255,255,.42);white-space:nowrap;text-align:center;pointer-events:none}
@media(max-width:520px){.mark{transform:translateY(-5vh)}.shade{background:radial-gradient(circle at center,transparent 8%,rgba(0,0,0,.18) 54%,rgba(0,0,0,.72) 100%)}}
</style>
</head>
<body>
<canvas aria-hidden="true"></canvas>
<div class="shade"></div>
<main class="scene">
  <div class="mark">
    <h1>浮光</h1>
    <p>光落其间，万象自生</p>
    <a class="visit" href="https://yc.wya6.cn/" target="_blank" rel="noopener noreferrer">进入网站</a>
  </div>
</main>
<div class="corner">WUYI · 2026</div>
<script>
requestAnimationFrame(() => requestAnimationFrame(() => {
  const script = document.createElement('script');
  script.src = 'assets/honeypot/fluid.js?v=20260805-smooth-1';
  document.body.appendChild(script);
}));
</script>
</body>
</html>