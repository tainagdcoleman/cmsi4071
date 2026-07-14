import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/network-animation.inline"
import style from "./styles/network-animation.scss"
import { classNames } from "../util/lang"

interface NetworkAnimationOptions {
  mode: "banner" | "corner"
}

const defaultOptions: NetworkAnimationOptions = {
  mode: "banner",
}

export default ((userOpts?: Partial<NetworkAnimationOptions>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const NetworkAnimation: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    if (opts.mode === "banner") {
      return (
        <div class={classNames(displayClass, "network-animation-banner")}>
          <div class="grid-bg"></div>
          <canvas class="network-canvas" data-mode="banner"></canvas>
          <div class="scanline"></div>
          <div class="banner-content">
            <div class="glitch-wrapper">
              <h1 class="banner-title">NETS</h1>
            </div>
            <p class="banner-subtitle">
              <span class="typing-text">Network Fundamentals</span>
            </p>
          </div>
          <div class="stats">
            <div class="stat">
              <span class="stat-value" data-stat="nodeCount">0</span>
              <span class="stat-label">Active Nodes</span>
            </div>
            <div class="stat">
              <span class="stat-value" data-stat="packetCount">0</span>
              <span class="stat-label">Packets/sec</span>
            </div>
            <div class="stat">
              <span class="stat-value" data-stat="latency">0</span>
              <span class="stat-label">Avg Latency (ms)</span>
            </div>
          </div>
          <div class="protocols">
            <span class="protocol-badge">RIP</span>
            <span class="protocol-badge magenta">OSPF</span>
            <span class="protocol-badge">BGP</span>
            <span class="protocol-badge magenta">TCP/IP</span>
            <span class="protocol-badge">UDP</span>
          </div>
        </div>
      )
    }

    // Corner mode
    return (
      <div class={classNames(displayClass, "network-animation-corner")}>
        <canvas class="network-canvas" data-mode="corner"></canvas>
      </div>
    )
  }

  NetworkAnimation.css = style
  NetworkAnimation.afterDOMLoaded = script

  return NetworkAnimation
}) satisfies QuartzComponentConstructor
