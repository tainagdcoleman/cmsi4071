const colors = {
  cyan: '#00f5ff',
  magenta: '#ff00aa',
  yellow: '#f0ff00',
}

function generateIP(): string {
  const subnets = ['192.168', '10.0', '172.16', '8.8']
  const subnet = subnets[Math.floor(Math.random() * subnets.length)]
  return `${subnet}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`
}

class Node {
  x: number
  y: number
  targetX: number
  targetY: number
  radius: number
  color: string
  pulsePhase: number
  connections: Node[] = []
  ip: string
  activity: number = 0

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
    this.targetX = x
    this.targetY = y
    this.radius = Math.random() * 4 + 3
    this.color = Math.random() > 0.7 ? colors.magenta : colors.cyan
    this.pulsePhase = Math.random() * Math.PI * 2
    this.ip = generateIP()
  }

  update(width: number, height: number) {
    this.targetX += (Math.random() - 0.5) * 0.5
    this.targetY += (Math.random() - 0.5) * 0.5
    this.targetX = Math.max(20, Math.min(width - 20, this.targetX))
    this.targetY = Math.max(20, Math.min(height - 20, this.targetY))
    this.x += (this.targetX - this.x) * 0.02
    this.y += (this.targetY - this.y) * 0.02
    this.pulsePhase += 0.03
    this.activity *= 0.95
  }

  draw(ctx: CanvasRenderingContext2D) {
    const pulse = Math.sin(this.pulsePhase) * 0.3 + 1
    const activeGlow = this.activity * 20

    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.radius * 3 * pulse + activeGlow
    )
    gradient.addColorStop(0, this.color)
    gradient.addColorStop(0.5, this.color + '40')
    gradient.addColorStop(1, 'transparent')

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * 3 * pulse + activeGlow, 0, Math.PI * 2)
    ctx.fillStyle = gradient
    ctx.fill()

    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * pulse, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

class Packet {
  from: Node
  to: Node
  progress: number = 0
  speed: number
  color: string
  size: number = 3
  trail: { x: number; y: number; alpha: number }[] = []

  constructor(from: Node, to: Node) {
    this.from = from
    this.to = to
    this.speed = 0.008 + Math.random() * 0.012
    this.color = Math.random() > 0.5 ? colors.cyan : colors.magenta
  }

  update(): boolean {
    this.progress += this.speed
    const x = this.from.x + (this.to.x - this.from.x) * this.progress
    const y = this.from.y + (this.to.y - this.from.y) * this.progress
    this.trail.unshift({ x, y, alpha: 1 })
    if (this.trail.length > 15) this.trail.pop()
    this.trail.forEach(point => { point.alpha *= 0.85 })
    return this.progress < 1
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.trail.forEach((point, i) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, this.size * (1 - i / this.trail.length), 0, Math.PI * 2)
      ctx.fillStyle = this.color + Math.floor(point.alpha * 255).toString(16).padStart(2, '0')
      ctx.fill()
    })

    const x = this.from.x + (this.to.x - this.from.x) * this.progress
    const y = this.from.y + (this.to.y - this.from.y) * this.progress

    ctx.beginPath()
    ctx.arc(x, y, this.size + 1, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.shadowColor = this.color
    ctx.shadowBlur = 10
    ctx.fill()
    ctx.shadowBlur = 0
  }
}

interface Connection {
  from: Node
  to: Node
}

function initNetworkAnimation(canvas: HTMLCanvasElement, isBanner: boolean) {
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const nodes: Node[] = []
  const packets: Packet[] = []
  const connections: Connection[] = []

  let width: number
  let height: number
  let animationId: number

  function resize() {
    const rect = canvas.parentElement?.getBoundingClientRect()
    if (!rect) return
    width = canvas.width = rect.width
    height = canvas.height = rect.height
  }

  function init() {
    resize()
    nodes.length = 0
    connections.length = 0
    packets.length = 0

    const nodeCount = isBanner
      ? Math.floor((width * height) / 25000)
      : Math.floor((width * height) / 3000)

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const radius = Math.random() * Math.min(width, height) * 0.35 + (isBanner ? 50 : 10)
      const x = width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * (isBanner ? 150 : 30)
      const y = height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * (isBanner ? 150 : 30)
      nodes.push(new Node(x, y))
    }

    const maxDist = isBanner ? 200 : 60
    nodes.forEach((node, i) => {
      nodes.forEach((other, j) => {
        if (i < j) {
          const dist = Math.hypot(node.x - other.x, node.y - other.y)
          if (dist < maxDist) {
            connections.push({ from: node, to: other })
            node.connections.push(other)
            other.connections.push(node)
          }
        }
      })
    })

    // Update stats if banner mode
    if (isBanner) {
      const nodeCountEl = canvas.parentElement?.querySelector('[data-stat="nodeCount"]')
      if (nodeCountEl) nodeCountEl.textContent = String(nodes.length)
    }
  }

  function spawnPacket() {
    if (connections.length === 0) return
    const conn = connections[Math.floor(Math.random() * connections.length)]
    const direction = Math.random() > 0.5
    const from = direction ? conn.from : conn.to
    const to = direction ? conn.to : conn.from
    packets.push(new Packet(from, to))
    from.activity = 1
  }

  let packetCounter = 0
  let lastPacketTime = 0
  let startTime = 0

  function animate(timestamp: number) {
    if (!startTime) startTime = timestamp
    ctx.clearRect(0, 0, width, height)

    // Draw connections
    connections.forEach(conn => {
      const gradient = ctx.createLinearGradient(
        conn.from.x, conn.from.y,
        conn.to.x, conn.to.y
      )
      gradient.addColorStop(0, conn.from.color + '30')
      gradient.addColorStop(1, conn.to.color + '30')

      ctx.beginPath()
      ctx.moveTo(conn.from.x, conn.from.y)
      ctx.lineTo(conn.to.x, conn.to.y)
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1
      ctx.stroke()
    })

    nodes.forEach(node => {
      node.update(width, height)
      node.draw(ctx)
    })

    const spawnInterval = isBanner ? 100 : 300
    if (timestamp - lastPacketTime > spawnInterval) {
      spawnPacket()
      lastPacketTime = timestamp
      packetCounter++
    }

    for (let i = packets.length - 1; i >= 0; i--) {
      if (!packets[i].update()) {
        packets[i].to.activity = 1
        packets.splice(i, 1)
      } else {
        packets[i].draw(ctx)
      }
    }

    // Update stats periodically if banner
    if (isBanner && Math.floor(timestamp / 1000) !== Math.floor((timestamp - 16) / 1000)) {
      const elapsed = (timestamp - startTime) / 1000
      const packetCountEl = canvas.parentElement?.querySelector('[data-stat="packetCount"]')
      const latencyEl = canvas.parentElement?.querySelector('[data-stat="latency"]')
      if (packetCountEl) packetCountEl.textContent = String(Math.floor(packetCounter / elapsed * 10) / 10)
      if (latencyEl) latencyEl.textContent = String(Math.floor(Math.random() * 20 + 10))
    }

    animationId = requestAnimationFrame(animate)
  }

  // Handle resize
  const resizeObserver = new ResizeObserver(() => {
    resize()
    init()
  })
  resizeObserver.observe(canvas.parentElement!)

  init()
  animationId = requestAnimationFrame(animate)

  // Cleanup on navigation
  document.addEventListener('nav', () => {
    cancelAnimationFrame(animationId)
    resizeObserver.disconnect()
  }, { once: true })
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
