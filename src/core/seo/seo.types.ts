export type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export type SeoMetadata = {
  title: string;
  description: string;
  keywords?: string[];
  robots: string;
};
