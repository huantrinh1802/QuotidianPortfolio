<script lang="ts">
  import TypeWriter from '$lib/components/TypeWriter.svelte';
  import AboutMe from '$contents/about-me.md';
  import Skills from '$contents/skills.svx';
  import { base } from '$app/paths';
  import SearchBar from '$lib/components/SearchBar.svelte';
  let helloName = 'World';
  const contents = [AboutMe, Skills];
  let typewriter;
  let timer;
  const debounce = (event) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      helloName = event.target.value;
      typewriter.reset();
    }, 900);
  };
</script>

<SearchBar />
<div class="h-[calc(100vh-var(--sk-header-height))] w-screen snap-y snap-mandatory overflow-y-auto px-10">
  <section class="ks-hero-section grid h-full snap-center snap-normal grid-cols-1 gap-10 md:grid-cols-2 md:gap-10">
    <div class="my-auto flex flex-col gap-4">
      <TypeWriter
        style="text-4xl font-bold md:min-w-[50%] md:relative "
        words={`print("Hello ${helloName}")`}
        bind:this={typewriter} />
      <input
        class="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
        on:input={debounce} />
    </div>
    <img
      class="relative mx-auto my-auto mb-auto max-w-lg rounded-3xl object-cover"
      srcset={`${base}/images/hero.png`}
      alt="King Studio Hero" />
  </section>
  {#each contents as content}
    <section class="ks-section show-on-scroll overflow-y-auto">
      <svelte:component this={content} />
    </section>
  {/each}
</div>

<style lang="postcss">
  .ks-section {
    @apply mx-auto flex min-h-full snap-start flex-col gap-4 pb-10 md:justify-center;
  }
</style>
