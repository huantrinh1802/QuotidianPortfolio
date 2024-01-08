import { base } from '$app/paths';
import type { BlogMetadata } from '$lib/types/blog';
import type { RequestHandler } from './$types';
export const prerender = true;
function generate_url(loc: string, lastmod: string) {
  if (loc.includes('localhost')) {
    return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
  } else {
    return `<url><loc>https://${loc}</loc><lastmod>${lastmod}</lastmod></url>`;
  }
}
export const GET = (async (event) => {
  //   const { data } = await siteMapStore.fetch({ event });
  const urls: string[] = [
    generate_url(`${base}/`, new Date().toISOString()),
    generate_url(`${base}/skills`, new Date().toISOString()),
    generate_url(`${base}/resume`, new Date().toISOString()),
    // generate_url(`${base}/en/services/migration`, new Date().toISOString()),
    // generate_url(`${base}/vi/services/migration`, new Date().toISOString()),
    // generate_url(`${base}/en/services/legal`, new Date().toISOString()),
    // generate_url(`${base}/vi/services/legal`, new Date().toISOString()),
    // generate_url(`${base}/en/services/education`, new Date().toISOString()),
    // generate_url(`${base}/vi/services/education`, new Date().toISOString()),
    // generate_url(`${base}/en/services/employment`, new Date().toISOString()),
    // generate_url(`${base}/vi/services/employment`, new Date().toISOString()),
  ];
  const modules: Record<string, { metadata: BlogMetadata; content: object }> = await import.meta.glob('$contents/blogs/**/*.svx', { eager: true });
  for (const modulePath in modules) {
    const paths = modulePath.split('/');
    const slug = paths.at(-1).split('.')[0];
    const year = paths.at(-2);
    const type = paths.at(-3);
    const file: { metadata: BlogMetadata; content: object } = modules[modulePath];
    urls.push(generate_url(`${base}/${type}/${year}/${slug}`, new Date(file.metadata.date).toISOString()));
  }
  //   data?.agents.forEach((agent) => {
  //     agent.localizations.forEach((localizedAgent) => {
  //       const loc = `${base}/${localizedAgent.locale}/agents/${localizedAgent.slug}`;
  //       urls.push(generate_url(loc, new Date(localizedAgent.updatedAt).toISOString()));
  //     });
  //   });
  //   data?.posts.forEach((post) => {
  //     post.localizations.forEach((localizedPost) => {
  //       const loc = `${base}/${localizedPost.locale}/services/${localizedPost.type?.toLowerCase()}/${localizedPost.slug}`;
  //       urls.push(generate_url(loc, new Date(localizedPost.updatedAt).toISOString()));
  //     });
  //   });
  //   data?.blogs.forEach((blog) => {
  //     blog.localizations.forEach((localizedBlog) => {
  //       const loc = `${base}/${localizedBlog.locale}/blogs/${localizedBlog.slug}`;
  //       urls.push(generate_url(loc, new Date(localizedBlog.updatedAt).toISOString()));
  //     });
  //   });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8" ?>
      <urlset
          xmlns="https://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xhtml="https://www.w3.org/1999/xhtml"
          xmlns:mobile="https://www.google.com/schemas/sitemap-mobile/1.0"
          xmlns:news="https://www.google.com/schemas/sitemap-news/0.9"
          xmlns:image="https://www.google.com/schemas/sitemap-image/1.1"
          xmlns:video="https://www.google.com/schemas/sitemap-video/1.1"
      >
      ${urls.map((url) => url)}
      </urlset>`.trim(),
    {
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
}) satisfies RequestHandler;