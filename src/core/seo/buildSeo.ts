import type { SeoProps, SeoMetadata } from "./seo.types";
import { defaultSeo } from "./seo.config";

export function buildSeo({
  title,
  description,
  keywords,
  noIndex,
}: SeoProps): SeoMetadata {
  return {
    title: title ?? defaultSeo.title,
    description: description ?? defaultSeo.description,
    keywords: keywords ?? defaultSeo.keywords,
    robots: noIndex ? "noindex, nofollow" : "index, follow",
  };
}
