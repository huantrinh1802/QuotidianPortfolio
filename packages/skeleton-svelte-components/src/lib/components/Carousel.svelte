<script lang="ts">
  import { sineInOut } from 'svelte/easing';
  import { fly } from 'svelte/transition';
  // import GreaterThan from '~icons/ic/baseline-greater-than';
  // import LessThan from '~icons/ic/baseline-less-than';

  export let items: any;
  export let duration = 3000;
  export let twStyle = '';
  export let indicatorsStyle = 'bottom-4';
  export const autoplayEnabled = false;

  $: current = 0;
  $: direction = 500;
  let autoplay: NodeJS.Timer | null = null;
  if (autoplayEnabled) {
    autoplay = setInterval(() => {
      if (current == items.length - 1) {
        calcDirection('neg');
        current = 0;
      } else {
        calcDirection('pos');
        current++;
      }
    }, duration);
  }
  function stopAutoplay() {
    if (autoplay !== null) {
      clearInterval(autoplay);
      autoplay = null;
    }
  }
  function calcDirection(dir: 'pos' | 'neg') {
    if (dir === 'pos') {
      direction = Math.abs(direction);
    } else {
      direction = -1 * Math.abs(direction);
    }
  }
</script>

<div class={`carousel ${twStyle}`}>
  <!-- Carousel wrapper -->
  <div class="wrapper">
    {#each items as item, index}
      {#if current === index}
        <div
          class={`item`}
          data-value={index}
          in:fly|global={{
            x: direction,
            easing: sineInOut,
          }}>
          <svelte:component
            this={item.component}
            {...item.props} />
        </div>
      {/if}
    {/each}
  </div>
  <!-- Slider indicators -->
  <div class={`indicators ${indicatorsStyle}`}>
    {#each items as _, index}
      <button
        class="btn btn-sm"
        on:click={() => {
          stopAutoplay();
          if (current > index) {
            calcDirection('neg');
          } else {
            calcDirection('pos');
          }
          current = index;
        }}
        type="button"
        class:active={current === index}
        data-value={index} />
    {/each}
  </div>
  <!-- Slider controls -->
  <button
    on:click={() => {
      stopAutoplay();
      calcDirection('neg');
      if (current === 0) {
        current = items.length - 1;
      } else {
        current--;
      }
    }}
    type="button"
    class="controls top-0 left-0"
    data-carousel-prev="">
    <span class="item">
      <p>GT</p>
      <span class="hidden">Previous</span>
    </span>
  </button>
  <button
    on:click={() => {
      stopAutoplay();
      calcDirection('pos');
      if (current == items.length - 1) {
        current = 0;
      } else {
        current++;
      }
    }}
    type="button"
    class="controls top-0 right-0"
    data-carousel-next="">
    <span class="item flex items-center justify-center">
      >
      <span class="hidden">Next</span>
    </span>
  </button>
</div>

<style lang="postcss">
  .carousel {
    @apply relative;
  }
  .carousel .wrapper {
    @apply relative h-max rounded-lg;
  }
  .carousel .wrapper .item {
    @apply inset-0 translate-x-0 transform transition-all duration-700 ease-in-out;
  }

  .carousel .indicators {
    @apply absolute left-1/2 z-30 flex -translate-x-1/2 space-x-3;
  }
  .carousel .indicators .btn {
    @apply rounded-full bg-slate-500;
  }
  .carousel .indicators .active {
    @apply bg-slate-400 hover:dark:bg-white;
  }
  .carousel .controls {
    @apply absolute bottom-0 z-30 flex h-full cursor-pointer items-center justify-center focus:outline-none md:px-2;
  }
  .carousel .controls .item {
    @apply inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/30 dark:bg-gray-800/30 sm:h-10 sm:w-10;
  }
</style>
