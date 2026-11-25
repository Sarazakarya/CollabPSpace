import { Helmet } from "react-helmet-async";
import { buildSeo } from "./buildSeo";
import type { SeoProps } from "./seo.types";

export default function Seo(props: SeoProps) {
  const seo = buildSeo(props);

  return (
    <Helmet>
      <title>{seo.title}</title>

      <meta name="description" content={seo.description} />

      {seo.keywords && (
        <meta name="keywords" content={seo.keywords.join(", ")} />
      )}

      <meta name="robots" content={seo.robots} />
    </Helmet>
  );
}
