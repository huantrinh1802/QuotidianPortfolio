<script>
  /**
   * @type any[]
   */
  export let list = [];
  export let indent = 0;
</script>

{#each list as item}
  {#if item.type === 'list'}
    <div
      class="font-medium"
      style="padding-left: {indent}rem; font-size: {20 - indent}px">
      {item.name}
    </div>
    <svelte:self
      list={item.items}
      indent={indent + 2} />
  {:else if item.type === 'item'}
    <div class="flex w-full">
      <a
        href=""
        class="hover:bg-primary-600 w-full hover:text-white"
        style="padding-left: {indent}rem">{item.name}</a>
    </div>
  {/if}
{/each}

<!-- {#if open}
  {#each items as item}
    <svelte:self
      {...}
      indent={indent + 4} />
  {/each}
{/if} -->

<style>
  h3 {
    cursor: pointer;
    user-select: none;
  }
</style>
