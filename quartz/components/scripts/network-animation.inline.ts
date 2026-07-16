// Hand-drawn "sketchnote" banner: a central SOFTWARE ENGINEERING cloud with
// sketchy arrows out to labeled doodle icons (bug, UML, docs, tests, ...).

// Ink (strokes/text) and paper (cloud fill) follow the site's theme colors;
// read from the page's CSS variables so the banner matches light/dark mode.
let INK = '#ebebec'
let PAPER = '#161618'

function readTheme() {
  const cs = getComputedStyle(document.documentElement)
  INK = cs.getPropertyValue('--dark').trim() || INK
  PAPER = cs.getPropertyValue('--light').trim() || PAPER
}
const ACCENT = {
  pink: 'rgba(242, 84, 125, 0.85)',
  cyan: 'rgba(57, 194, 214, 0.85)',
  green: 'rgba(150, 196, 46, 0.85)',
  yellow: 'rgba(255, 205, 51, 0.9)',
  blue: 'rgba(61, 155, 255, 0.8)',
  purple: 'rgba(155, 108, 255, 0.8)',
  orange: 'rgba(255, 148, 61, 0.85)',
  teal: 'rgba(51, 194, 163, 0.85)',
}

type Pt = { x: number; y: number }
type Stroke = { pts: Pt[]; w?: number; color?: string }
type Fill = { pts: Pt[]; color: string }
type Doodle = { fills: Fill[]; strokes: Stroke[] }

function jit(v: number): number {
  return (Math.random() - 0.5) * v
}

// A slightly wobbly hand-drawn line segment, returned as a polyline
function seg(x1: number, y1: number, x2: number, y2: number, j = 1.6): Pt[] {
  const n = 4
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.hypot(dx, dy) || 1
  const nx = -dy / len
  const ny = dx / len
  const pts: Pt[] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const off = i === 0 || i === n ? jit(j) : jit(j * 2)
    pts.push({ x: x1 + dx * t + nx * off, y: y1 + dy * t + ny * off })
  }
  return pts
}

function rectStrokes(x: number, y: number, w: number, h: number): Stroke[] {
  return [
    { pts: seg(x, y, x + w, y) },
    { pts: seg(x + w, y, x + w, y + h) },
    { pts: seg(x + w, y + h, x, y + h) },
    { pts: seg(x, y + h, x, y) },
  ]
}

function rectFill(x: number, y: number, w: number, h: number): Pt[] {
  return [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }]
}

// A wobbly ellipse polyline
function ell(cx: number, cy: number, rx: number, ry: number, steps = 16): Pt[] {
  const pts: Pt[] = []
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2
    const wob = i < steps ? jit(Math.min(rx, ry) * 0.12) : 0
    pts.push({ x: cx + Math.cos(a) * (rx + wob), y: cy + Math.sin(a) * (ry + wob) })
  }
  return pts
}

// A lumpy cloud outline
function cloudPath(cx: number, cy: number, rx: number, ry: number): Pt[] {
  const pts: Pt[] = []
  const steps = 46
  for (let i = 0; i < steps; i++) {
    const a = (i / steps) * Math.PI * 2
    const bump = 1 + 0.11 * Math.sin(a * 6) + 0.05 * Math.sin(a * 10 + 1)
    pts.push({ x: cx + Math.cos(a) * rx * bump + jit(1.5), y: cy + Math.sin(a) * ry * bump + jit(1.5) })
  }
  pts.push(pts[0])
  return pts
}

function arrowHead(x: number, y: number, ang: number, size = 9): Stroke[] {
  return [
    { pts: seg(x, y, x - size * Math.cos(ang - 0.42), y - size * Math.sin(ang - 0.42), 1) },
    { pts: seg(x, y, x - size * Math.cos(ang + 0.42), y - size * Math.sin(ang + 0.42), 1) },
  ]
}

// ---- Doodle icons (local coords centered on 0,0, roughly within ±s/2) ----

function bug(s: number, color: string): Doodle {
  const bw = s * 0.42
  const bh = s * 0.58
  const body = ell(0, 4, bw / 2, bh / 2, 14)
  const head = ell(0, -bh / 2, s * 0.13, s * 0.11, 10)
  const strokes: Stroke[] = [{ pts: body }, { pts: head }, { pts: seg(0, -bh / 2 + 4, 0, bh / 2) }]
  for (const sy of [-6, 2, 10]) {
    strokes.push({ pts: seg(-bw / 2 + 1, sy, -bw / 2 - 8, sy - 4) })
    strokes.push({ pts: seg(bw / 2 - 1, sy, bw / 2 + 8, sy - 4) })
  }
  strokes.push({ pts: seg(-4, -bh / 2 - 3, -9, -bh / 2 - 11) })
  strokes.push({ pts: seg(4, -bh / 2 - 3, 9, -bh / 2 - 11) })
  return { fills: [{ pts: body, color }, { pts: head, color }], strokes }
}

function uml(s: number, color: string): Doodle {
  const w = s * 0.82
  const h = s * 0.66
  const x = -w / 2
  const y = -h / 2
  const strokes = rectStrokes(x, y, w, h)
  strokes.push({ pts: seg(x, y + h * 0.34, x + w, y + h * 0.34) })
  strokes.push({ pts: seg(x, y + h * 0.66, x + w, y + h * 0.66) })
  strokes.push({ pts: seg(x + 5, y + h * 0.5, x + w * 0.6, y + h * 0.5, 0.8) })
  strokes.push({ pts: seg(x + 5, y + h * 0.82, x + w * 0.5, y + h * 0.82, 0.8) })
  return { fills: [{ pts: rectFill(x, y, w, h * 0.34), color }], strokes }
}

function docs(s: number, color: string): Doodle {
  const w = s * 0.58
  const h = s * 0.74
  const x = -w / 2
  const y = -h / 2
  const f = w * 0.32
  const outline: Pt[] = [
    { x, y },
    { x: x + w - f, y },
    { x: x + w, y: y + f },
    { x: x + w, y: y + h },
    { x, y: y + h },
    { x, y },
  ]
  const strokes: Stroke[] = [
    { pts: seg(x, y, x + w - f, y) },
    { pts: seg(x + w - f, y, x + w, y + f) },
    { pts: seg(x + w, y + f, x + w, y + h) },
    { pts: seg(x + w, y + h, x, y + h) },
    { pts: seg(x, y + h, x, y) },
    { pts: seg(x + w - f, y, x + w - f, y + f) },
    { pts: seg(x + w - f, y + f, x + w, y + f) },
  ]
  for (let i = 0; i < 3; i++) {
    const ly = y + f + 8 + i * 9
    strokes.push({ pts: seg(x + 6, ly, x + w - 6 - (i === 2 ? w * 0.3 : 0), ly, 0.8) })
  }
  return { fills: [{ pts: outline, color }], strokes }
}

function tests(s: number, color: string): Doodle {
  const w = s * 0.6
  const h = s * 0.76
  const x = -w / 2
  const y = -h / 2
  const strokes = rectStrokes(x, y, w, h)
  // clip at top
  strokes.push(...rectStrokes(-w * 0.14, y - 4, w * 0.28, 8))
  // checkmark
  strokes.push({ pts: seg(x + w * 0.24, y + h * 0.55, x + w * 0.42, y + h * 0.72, 1) })
  strokes.push({ pts: seg(x + w * 0.42, y + h * 0.72, x + w * 0.78, y + h * 0.34, 1) })
  return { fills: [{ pts: rectFill(x, y, w, h), color }], strokes }
}

function rocket(s: number, color: string): Doodle {
  const nose: Pt[] = [
    { x: 0, y: -s * 0.5 },
    { x: -s * 0.16, y: -s * 0.18 },
    { x: s * 0.16, y: -s * 0.18 },
    { x: 0, y: -s * 0.5 },
  ]
  const body = rectFill(-s * 0.16, -s * 0.18, s * 0.32, s * 0.5)
  const win = ell(0, -s * 0.02, s * 0.07, s * 0.07, 10)
  const strokes: Stroke[] = [
    { pts: seg(0, -s * 0.5, -s * 0.16, -s * 0.18, 1) },
    { pts: seg(0, -s * 0.5, s * 0.16, -s * 0.18, 1) },
    { pts: seg(-s * 0.16, -s * 0.18, -s * 0.16, s * 0.32) },
    { pts: seg(s * 0.16, -s * 0.18, s * 0.16, s * 0.32) },
    { pts: seg(-s * 0.16, s * 0.32, s * 0.16, s * 0.32) },
    { pts: win },
    // fins
    { pts: seg(-s * 0.16, s * 0.14, -s * 0.3, s * 0.34, 1) },
    { pts: seg(-s * 0.3, s * 0.34, -s * 0.16, s * 0.3, 1) },
    { pts: seg(s * 0.16, s * 0.14, s * 0.3, s * 0.34, 1) },
    { pts: seg(s * 0.3, s * 0.34, s * 0.16, s * 0.3, 1) },
    // flame
    { pts: seg(-s * 0.08, s * 0.32, 0, s * 0.48, 1) },
    { pts: seg(0, s * 0.48, s * 0.08, s * 0.32, 1) },
  ]
  return { fills: [{ pts: nose, color }, { pts: body, color }], strokes }
}

function git(s: number, color: string): Doodle {
  const a = { x: -s * 0.18, y: -s * 0.3 }
  const b = { x: -s * 0.18, y: s * 0.3 }
  const c = { x: s * 0.22, y: s * 0.02 }
  const r = s * 0.09
  const ca = ell(a.x, a.y, r, r, 10)
  const cb = ell(b.x, b.y, r, r, 10)
  const cc = ell(c.x, c.y, r, r, 10)
  const strokes: Stroke[] = [
    { pts: seg(a.x, a.y + r, b.x, b.y - r) },
    { pts: seg(a.x + r, a.y + r * 0.5, c.x - r, c.y - r * 0.5) },
    { pts: ca },
    { pts: cb },
    { pts: cc },
  ]
  return { fills: [{ pts: ca, color }, { pts: cb, color }, { pts: cc, color }], strokes }
}

function gear(s: number, color: string): Doodle {
  const R = s * 0.32
  const outer = ell(0, 0, R, R, 18)
  const inner = ell(0, 0, R * 0.4, R * 0.4, 12)
  const strokes: Stroke[] = [{ pts: outer }, { pts: inner }]
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2
    strokes.push({
      pts: seg(Math.cos(ang) * R, Math.sin(ang) * R, Math.cos(ang) * (R + s * 0.12), Math.sin(ang) * (R + s * 0.12), 0.8),
    })
  }
  return { fills: [{ pts: outer, color }], strokes }
}

function team(s: number, color: string): Doodle {
  const fills: Fill[] = []
  const strokes: Stroke[] = []
  for (const dx of [-s * 0.16, s * 0.16]) {
    const head = ell(dx, -s * 0.14, s * 0.12, s * 0.12, 12)
    const shoulders: Pt[] = [
      { x: dx - s * 0.2, y: s * 0.3 },
      { x: dx - s * 0.16, y: s * 0.06 },
      { x: dx, y: -s * 0.02 },
      { x: dx + s * 0.16, y: s * 0.06 },
      { x: dx + s * 0.2, y: s * 0.3 },
    ]
    fills.push({ pts: head, color })
    strokes.push({ pts: head })
    strokes.push({ pts: shoulders })
  }
  return { fills, strokes }
}

interface IconSpec {
  fx: number
  fy: number
  label: string
  color: string
  build: (s: number, color: string) => Doodle
}

const ICONS: IconSpec[] = [
  { fx: 0.29, fy: 0.2, label: 'BUGS', color: ACCENT.pink, build: bug },
  { fx: 0.5, fy: 0.13, label: 'GIT', color: ACCENT.purple, build: git },
  { fx: 0.71, fy: 0.2, label: 'DEPLOY', color: ACCENT.yellow, build: rocket },
  { fx: 0.11, fy: 0.5, label: 'UML', color: ACCENT.cyan, build: uml },
  { fx: 0.89, fy: 0.5, label: 'DESIGN', color: ACCENT.orange, build: gear },
  { fx: 0.29, fy: 0.82, label: 'DOCS', color: ACCENT.blue, build: docs },
  { fx: 0.5, fy: 0.9, label: 'TESTS', color: ACCENT.green, build: tests },
  { fx: 0.71, fy: 0.82, label: 'TEAM', color: ACCENT.teal, build: team },
]

interface SceneIcon {
  x: number
  y: number
  s: number
  geo: Doodle
  label: string
  labelAbove: boolean
  phase: number
  arrow: Stroke
  head: Stroke[]
}

interface Scene {
  cx: number
  cy: number
  rx: number
  ry: number
  cloud: Pt[]
  title: string[]
  titleSize: number
  icons: SceneIcon[]
}

function polyPath(ctx: CanvasRenderingContext2D, pts: Pt[], ox: number, oy: number) {
  pts.forEach((p, i) => (i ? ctx.lineTo(p.x + ox, p.y + oy) : ctx.moveTo(p.x + ox, p.y + oy)))
}

function drawDoodle(ctx: CanvasRenderingContext2D, geo: Doodle, ox: number, oy: number) {
  for (const f of geo.fills) {
    ctx.beginPath()
    polyPath(ctx, f.pts, ox, oy)
    ctx.closePath()
    ctx.fillStyle = f.color
    ctx.fill()
  }
  for (const st of geo.strokes) {
    ctx.beginPath()
    polyPath(ctx, st.pts, ox, oy)
    ctx.strokeStyle = st.color || INK
    ctx.lineWidth = st.w || 2
    ctx.stroke()
  }
}

function initNetworkAnimation(canvas: HTMLCanvasElement, isBanner: boolean) {
  const maybeCtx = canvas.getContext('2d')
  if (!maybeCtx) return
  // bind after the null check so the nested draw functions see a non-nullable type
  const ctx: CanvasRenderingContext2D = maybeCtx

  let width: number
  let height: number
  let animationId: number
  let scene: Scene

  function resize() {
    const rect = canvas.parentElement?.getBoundingClientRect()
    if (!rect) return
    width = canvas.width = rect.width
    height = canvas.height = rect.height
  }

  function buildScene() {
    resize()
    const cx = width / 2
    const cy = height * 0.5
    const rx = Math.min(width * 0.18, 195)
    const ry = Math.min(height * 0.28, 72)

    const title = ['SENIOR', 'PROJECT I']
    const longest = title.reduce((a, b) => (a.length >= b.length ? a : b))
    let titleSize = Math.min(ry * 0.5, width * 0.028, 32)
    ctx.font = `800 ${titleSize}px "Schibsted Grotesk", "Inter", sans-serif`
    // shrink title until the longest line fits comfortably inside the cloud
    while (titleSize > 10 && ctx.measureText(longest).width > rx * 1.7) {
      titleSize -= 1
      ctx.font = `800 ${titleSize}px "Schibsted Grotesk", "Inter", sans-serif`
    }

    const s = Math.max(36, Math.min(52, width * 0.045))
    // reserve room for the artwork, the bob, AND a label on either side,
    // so nothing (icon or label) can clip the top/bottom edge
    const labelH = s * 0.26
    const vPad = s * 0.62 + labelH + 10
    const minY = vPad
    const maxY = height - vPad
    const icons: SceneIcon[] = ICONS.map((ic, i) => {
      const ix = Math.max(s, Math.min(width - s, ic.fx * width))
      const iy = Math.max(minY, Math.min(maxY, ic.fy * height))
      const geo = ic.build(s, ic.color)
      const ang = Math.atan2(iy - cy, ix - cx)
      const start = { x: cx + Math.cos(ang) * (rx + 8), y: cy + Math.sin(ang) * (ry + 8) }
      // stop the arrow at the icon's edge so the head never sits on the artwork/label
      const end = { x: ix - Math.cos(ang) * s * 0.5, y: iy - Math.sin(ang) * s * 0.5 }
      return {
        x: ix,
        y: iy,
        s,
        geo,
        label: ic.label,
        // put the label on the far side of the icon from the cloud, so the
        // arrow (which comes from the cloud) is never drawn over the label
        labelAbove: iy < cy - 4,
        phase: i * 0.8,
        arrow: { pts: seg(start.x, start.y, end.x, end.y, 1.4) },
        head: arrowHead(end.x, end.y, ang),
      }
    })

    scene = { cx, cy, rx, ry, cloud: cloudPath(cx, cy, rx, ry), title, titleSize, icons }
  }

  function drawScene(t: number) {
    ctx.clearRect(0, 0, width, height)
    ctx.lineJoin = 'round'
    ctx.lineCap = 'round'

    if (!isBanner) {
      // Corner: just a small cloud with "SP"
      const cx = width / 2
      const cy = height / 2
      const cloud = cloudPath(cx, cy, width * 0.32, height * 0.24)
      ctx.beginPath()
      polyPath(ctx, cloud, 0, 0)
      ctx.closePath()
      ctx.fillStyle = PAPER
      ctx.fill()
      ctx.strokeStyle = INK
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.fillStyle = INK
      ctx.font = `800 ${width * 0.22}px "Schibsted Grotesk", sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('SP', cx, cy)
      return
    }

    // Arrows first (behind everything)
    ctx.strokeStyle = INK
    ctx.lineWidth = 1.7
    for (const icon of scene.icons) {
      ctx.beginPath()
      polyPath(ctx, icon.arrow.pts, 0, 0)
      ctx.stroke()
      for (const h of icon.head) {
        ctx.beginPath()
        polyPath(ctx, h.pts, 0, 0)
        ctx.stroke()
      }
    }

    // Central cloud
    ctx.beginPath()
    polyPath(ctx, scene.cloud, 0, 0)
    ctx.closePath()
    ctx.fillStyle = PAPER
    ctx.fill()
    ctx.strokeStyle = INK
    ctx.lineWidth = 2.4
    ctx.stroke()

    // Cloud title
    ctx.fillStyle = INK
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `800 ${scene.titleSize}px "Schibsted Grotesk", "Inter", sans-serif`
    const lh = scene.titleSize * 1.06
    scene.title.forEach((line, i) => {
      ctx.fillText(line, scene.cx, scene.cy + (i - (scene.title.length - 1) / 2) * lh)
    })

    // Icons (gentle bob) + labels
    for (const icon of scene.icons) {
      const bob = Math.sin(t * 0.0016 + icon.phase) * 3
      drawDoodle(ctx, icon.geo, icon.x, icon.y + bob)
      ctx.fillStyle = INK
      ctx.font = `700 ${Math.round(icon.s * 0.26)}px "Schibsted Grotesk", "Inter", sans-serif`
      ctx.textAlign = 'center'
      if (icon.labelAbove) {
        ctx.textBaseline = 'bottom'
        ctx.fillText(icon.label, icon.x, icon.y + bob - icon.s * 0.52 - 6)
      } else {
        ctx.textBaseline = 'top'
        ctx.fillText(icon.label, icon.x, icon.y + bob + icon.s * 0.52 + 6)
      }
    }
  }

  function animate(timestamp: number) {
    drawScene(timestamp)
    animationId = requestAnimationFrame(animate)
  }

  const resizeObserver = new ResizeObserver(() => {
    if (isBanner) buildScene()
    else resize()
  })
  resizeObserver.observe(canvas.parentElement!)

  // Re-read colors when the user toggles light/dark mode
  const onThemeChange = () => readTheme()
  document.addEventListener('themechange', onThemeChange)

  readTheme()
  if (isBanner) buildScene()
  else resize()
  animationId = requestAnimationFrame(animate)

  // Cleanup on navigation
  document.addEventListener(
    'nav',
    () => {
      cancelAnimationFrame(animationId)
      resizeObserver.disconnect()
      document.removeEventListener('themechange', onThemeChange)
    },
    { once: true },
  )
}

function initAllCanvases() {
  const canvases = document.querySelectorAll<HTMLCanvasElement>('.network-canvas')
  canvases.forEach(canvas => {
    const mode = canvas.dataset.mode
    initNetworkAnimation(canvas, mode === 'banner')
  })
}

// Run on Quartz SPA navigation
document.addEventListener('nav', initAllCanvases)

// Also run on initial DOMContentLoaded as fallback
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAllCanvases)
} else {
  // DOM already loaded, run immediately
  initAllCanvases()
}
