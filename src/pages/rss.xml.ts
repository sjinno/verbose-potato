import rss, { pagesGlobToRssItems } from "@astrojs/rss";

export async function GET(context: any) {
  const rssItems = await pagesGlobToRssItems(import.meta.glob("./**/*.md"));
  const items = rssItems.map((item) => {
    return {
      link: item.link ? item.link : "https://astrolearner.com",
      title: item.title ? item.title : "Astro Learner | Blog",
      pubDate: item.pubDate ? item.pubDate : new Date(),
    };
  });

  return rss({
    title: "Astro Learner | Blog",
    description: "My journey learning Astro",
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}
