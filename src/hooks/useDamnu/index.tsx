import { ref, render, type CSSProperties } from "vue";
import { useEventListener, useIntersectionObserver } from "@vueuse/core";

export type Bullet = {
  Id: number;
  BarrageSeq: number;
  Message: string;
};

export type Ops = {
  top?: number;
  tracks?: number;
  lv1?: string;
  lv2?: string;
  lv3?: string;
};

const defaultOptions = {
  top: 100,
  bulletGap: "100px",
  tracks: 2,
  trackHeight: 50,
  lv1: "#ef4a38",
  lv2: "#eebe77",
  lv3: "#0bb449",
} as const;

export default class Danmu {
  #options = defaultOptions;
  #target: HTMLElement;
  waitingQueue = ref<Bullet[]>([]);
  track = ref<Array<"occupied" | "idle">>([]);

  constructor(ele: string, opt: Ops = {}) {
    this.#options = Object.assign(this.#options, opt);
    this.#target = document.querySelector(ele) as HTMLElement;
    if (!this.#target) {
      throw new Error("The display target does not exist");
    }
    const { position } = getComputedStyle(this.#target);
    if (position === "static") {
      this.#target.style.position = "relative";
    }
    this.track.value = new Array(this.#options.tracks).fill("idle");
    this.#initBulletAnimate(this.#target);
  }

  #initBulletAnimate = (bulletScreen: HTMLElement) => {
    if (!bulletScreen) return;
    const style: HTMLStyleElement = document.createElement("style");
    document.head.appendChild(style);
    let { width } = bulletScreen.getBoundingClientRect();
    let from = `from { visibility: visible; transform: translateX(${width}px); }`;
    let to = `to { visibility: visible; transform: translateX(-100%); }`;
    style.sheet?.insertRule(`@keyframes RightToLeft { ${from} ${to} }`, 0);
  };

  #getTrack = () => {
    let idleTrackIndex: number = -1;
    for (let i = 0; i < this.track.value.length; i++) {
      if (this.track.value[i] === "idle") {
        idleTrackIndex = i;
        break;
      }
    }
    return idleTrackIndex;
  };

  #createBulletContainer() {
    const curTrackIdx = this.#getTrack();
    const bulletContainer = document.createElement("div");
    bulletContainer.id = Math.random().toString(36).slice(2);
    bulletContainer.style.animationName = "RightToLeft";
    bulletContainer.style.transitionProperty = "opacity";
    bulletContainer.style.transitionDuration = "0.5s";
    bulletContainer.style.cursor = "pointer";
    bulletContainer.style.position = "absolute";
    bulletContainer.style.left = "0px";
    bulletContainer.style.visibility = "hidden";
    bulletContainer.style.animationIterationCount = "1";

    bulletContainer.style.animationDuration = `10s`;
    bulletContainer.style.animationTimingFunction = "linear";

    // 性能小优化
    bulletContainer.style.willChange = "transform";
    bulletContainer.style.top =
      this.#options.top + curTrackIdx * this.#options.trackHeight + "px";
    bulletContainer.dataset.trackIndex = curTrackIdx.toString();
    this.track.value[curTrackIdx] = "occupied";
    // this.#target.appendChild(bulletContainer);

    useEventListener(bulletContainer, "mouseenter", () => {
      bulletContainer.style.animationPlayState = "paused";
    });

    useEventListener(bulletContainer, "mouseleave", () => {
      bulletContainer.style.animationPlayState = "running";
    });

    useEventListener(bulletContainer, "animationend", () => {
      this.#target.removeChild(bulletContainer);
      this.track.value[Number(bulletContainer.dataset.trackIndex)] = "idle";
      if (this.waitingQueue.value.length > 0) {
        this.shootBullet(this.waitingQueue.value.shift()!);
      }
    });

    useIntersectionObserver(
      bulletContainer,
      ([{ isIntersecting }]) => {
        if (isIntersecting === false) {
        }
      },
      {
        root: this.#target,
        rootMargin: `0px ${this.#options.bulletGap} 0px 0px`,
      }
    );

    return bulletContainer;
  }

  #loadAmmo(bullet: Bullet) {
    let textColor = "black";
    if (bullet.BarrageSeq === 0) {
      textColor = this.#options.lv1;
    }
    if (bullet.BarrageSeq === 1) {
      textColor = this.#options.lv2;
    }
    if (bullet.BarrageSeq === 2) {
      textColor = this.#options.lv3;
    }

    const bulletStyle = {
      color: textColor,
      fontSize: "18px",
      fontWeight: "bold",
      width: "100%",
      lineHeight: "18px",
      padding: "0 20px",
    } as CSSProperties;

    const vm = (
      <>
        <div onClick={() => {}} style={bulletStyle}>
          {bullet.Message}
        </div>
      </>
    );

    return vm;
  }
  shootBullet(bullet: Bullet) {
    // debugger
    if (this.#getTrack() === -1) {
      this.waitingQueue.value.push(bullet);
      return;
    }
    const bulletContainer = this.#createBulletContainer();
    const vm = this.#loadAmmo(bullet);
    render(vm, bulletContainer);
    this.#target.appendChild(bulletContainer);
  }
}
