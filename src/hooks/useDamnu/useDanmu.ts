import { ComputedRef, onUnmounted, ref, watch } from "vue";
import Danmu, { type Bullet, type Ops } from ".";
import { useTimeoutFn } from "@vueuse/core";

let danmu: Danmu | undefined;

export default async function useDanmu(
  selector: string,
  bullets: ComputedRef<Bullet[]>,
  options?: Ops
) {
  if (!danmu) {
    danmu = new Danmu(selector, options);
  }
  const index = ref(0);
  async function* makeQueue<T>(jobs: T[], waitGap: number) {
    for (const i of jobs) {
      await new Promise((resolve) => {
        useTimeoutFn(() => {
          resolve(true);
        }, waitGap);
      });
      yield i;
    }
  }

  const repeat = (fn: Function, waitGap: number) => {
    return async function (arg: Bullet[]) {
      for await (const i of makeQueue(arg, waitGap)) {
        fn(i);
        index.value = index.value + 1;
        index.value = index.value % bullets.value.length;
      }
    };
  };

  const repeatPlay = repeat(danmu.shootBullet.bind(danmu), 3000);
  onUnmounted(() => {
    danmu = undefined;
  })
  watch(
    [() => index.value, () => danmu?.waitingQueue.value],
    ([idx, queue]) => {
      if (idx === 0 && queue?.length === 0) {
        repeatPlay(bullets.value);
      }
    },
    { immediate: true, deep: true }
  );
}
