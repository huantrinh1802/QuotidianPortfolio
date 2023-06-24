<script lang="ts">
  import { browser } from '$app/environment';

  export let percentage = 85;
  $: hsl = (() => {
    if (percentage >= 100) {
      percentage = 100;
    } else if (percentage <= 0) {
      percentage = 1;
    }
    let hue = (120 / 100) * percentage;
    return `hsl(${hue}, 100%, 30%)`;
  })();
  let animating = false;
  let duration = 1;
  let direction = true;
  export let logoOnly = true;
  async function animate() {
    direction = !direction;
    if (browser) {
      animating = true;
      new Promise((resolve) => {
        setTimeout(() => {
          animating = false;
          resolve;
        }, duration * 1000);
      });
    }
  }
  function handleMouseMove(e: MouseEvent) {
    direction = !direction;
  }
</script>

<div
  class="rotate relative flex h-full items-center justify-center"
  style={`--dashoffset: ${percentage};`}
  on:mouseenter={animate}
  on:mouseleave={handleMouseMove}>
  <div
    class="ks-skill-icon-wrapper relative flex h-full w-full grow items-center justify-center"
    class:rotated={direction}
    class:logo-only={logoOnly}>
    <div class="ks-banner-logo absolute flex h-full w-full grow items-center justify-center p-[20%]">
      <slot name="logo" />
    </div>
    <div class="ks-banner-content absolute flex items-center justify-center">
      <slot name="content" />
    </div>
  </div>
  <svg
    class="absolute h-full w-full"
    viewBox="0 0 36 36">
    <path
      id="progress-bar"
      class:progress-bar-animating={animating}
      d="M18 2.0845
      a 15.9155 15.9155 0 0 1 0 31.831
      a 15.9155 15.9155 0 0 1 0 -31.831"
      fill="none"
      stroke={hsl}
      stroke-width="1.5"
      stroke-dasharray={`${percentage}, 100`} />
  </svg>
</div>

<style>
  .progress-bar-animating {
    stroke-dashoffset: var(--dashoffset);
    animation: complete 1s linear forwards;
  }

  @keyframes complete {
    to {
      stroke-dashoffset: 0;
    }
  }
  .ks-skill-icon-wrapper > .ks-banner-content {
    opacity: 0;
  }
</style>
