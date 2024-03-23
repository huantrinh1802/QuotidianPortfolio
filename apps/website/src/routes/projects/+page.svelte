<script lang="ts">
  export let data;
  function getContrastYIQ(hexColor) {
    // Convert hex color to RGB
    const hexToRGB = (hex) => {
      let r = parseInt(hex.substring(1, 3), 16);
      let g = parseInt(hex.substring(3, 5), 16);
      let b = parseInt(hex.substring(5, 7), 16);
      return [r, g, b];
    };

    // Calculate relative luminance
    const calculateRelativeLuminance = (r, g, b) => {
      const sRGB = (c) => {
        c /= 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
      };
      return 0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b);
    };

    // Get RGB components
    const [r, g, b] = hexToRGB(hexColor);

    // Calculate relative luminance
    const luminance = calculateRelativeLuminance(r, g, b);

    // Compare luminance with threshold
    const threshold = 0.5; // WCAG threshold for normal text
    if (luminance >= threshold) {
      return 'black'; // Use black font color
    } else {
      return 'white'; // Use white font color
    }
  }
  // pull the store reference from the route props
</script>

<div class="grid grid-cols-1 gap-4 rounded-md p-2 sm:grid-cols-2 lg:grid-cols-3">
  {#each data.repositories as repo}
    <div class="card relative flex flex-col gap-4 rounded-md p-4">
      <div class="absolute right-0 top-0 flex h-10 w-full items-center justify-center rounded-t-md bg-primary-600">
        <h2>
          <a target="_blank" href={repo.url} class="hover:underline"> {repo.name}</a>
        </h2>
      </div>
      <div class="mt-12">{repo.description}</div>
      <hr />
      <div class="grid grid-cols-3 justify-center gap-4">
        {#if repo.repositoryTopics.nodes.length !== 0}
          {#each repo.repositoryTopics.nodes as node}
            <div class="rounded-md bg-slate-200 px-4 py-2 text-center">
              <p class="text-black">{node.topic.name}</p>
            </div>
          {/each}
        {/if}
      </div>
      <hr />
      <h2 class="text-center">Written in</h2>
      <div class="grid grid-cols-3 justify-center gap-4">
        {#each repo.languages.nodes as language}
          <div
            class="language-wrapper rounded-md px-4 py-2 text-center"
            style={`--backgroundColor: ${language.color};`}
          >
            <p class="language" style={`--fontColor: ${getContrastYIQ(language.color)}`}>{language.name}</p>
          </div>
        {/each}
      </div>
      <hr />
      {#if repo.homepageUrl}
        <div class="flex justify-center">
          <a target="_blank" href={repo.homepageUrl} class="btn-primary variant-filled-primary btn">Visit website</a>
        </div>
      {/if}
    </div>
  {/each}
</div>

<style lang="postcss">
  .language-wrapper {
    min-width: var(--buttonWidth);
    background-color: var(--backgroundColor);
  }
  .language {
    color: var(--fontColor);
  }
</style>
