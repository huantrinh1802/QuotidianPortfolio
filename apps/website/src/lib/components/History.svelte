<script lang="ts">
  export let content: any = null;
</script>

<div class="flex flex-col gap-3 print:block print:break-before-auto print:gap-1">
  <h3 class="print:!text-lg">{content.title}</h3>
  {#if content.subtitle}
    <h4 class="text-gray-200 print:!text-base print:text-gray-800">{content.subtitle}</h4>
  {/if}
  <div class="flex justify-between text-gray-200 print:text-gray-800">
    <div class="text-sm">{content.timeline}</div>
    <div class="text-sm">{content.location}</div>
  </div>
  {#if content.summary}
    <div class="py-2 print:text-xs">{content.summary}</div>
  {/if}
  {#if content.tasks}
    <ul class="list">
      {#each content.tasks as task}
        <li class="!whitespace-normal">
          <span>○</span>
          <span class="print:text-xs">{task}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>
