<script lang="ts">
  import Breadcrumb from '$lib/components/Breadcrumb.svelte';
  export let prevUrl = '/';
  export let article: any;
</script>

<main class="mx-auto overflow-auto bg-white px-4 py-4 dark:bg-gray-900 lg:w-3/4">
  <article class="format format-sm sm:format-base lg:format-lg format-blue dark:format-invert relative w-full rounded-md">
    <header
      class={`not-format mle-article-header h-1/4 min-h-[360px] md:min-h-[400px] md:rounded-md xl:min-h-[600px]`}
      style={`background-image: url(${article?.coverImage?.url})`} />
    <div class="-mt-20 px-4 md:-mt-40 md:px-10">
      <div class="mx-auto flex w-full max-w-3xl flex-col gap-10 rounded-lg bg-slate-50 p-8 text-black dark:bg-slate-800 md:mx-0 md:max-w-none">
        <Breadcrumb
          url={`${prevUrl}/${article?.slug}`}
          urlMetadata={{ name: article?.title, type: article?.type }} />
        <h1 class="text-center text-3xl font-extrabold leading-tight text-gray-900 dark:text-white lg:mb-6 lg:text-3xl">{article?.title}</h1>
        <div class="flex gap-2">
          {#each article?.tags as tag}
            <a
              class="mle-link"
              href={`${prevUrl}?tag=${tag}`}>#{tag}</a>
          {/each}
          <time class="ml-auto !text-primary-700-200-token">{new Date(article.date).toLocaleDateString()}</time>
        </div>
        <div class="md-wrapper prose max-w-none dark:prose-invert">
          {@html article?.content.html}
        </div>
      </div>
    </div>
  </article>
</main>

<style lang="postcss">
  .mle-article-header {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 80%;
  }
</style>
