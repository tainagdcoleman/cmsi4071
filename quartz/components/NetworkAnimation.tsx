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
          <canvas class="network-canvas" data-mode="banner"></canvas>
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
