import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Solo un Papá REAL';
const SITE_URL = 'https://solounpapareal.com';
const DEFAULT_IMAGE = `${SITE_URL}/icon.svg`;

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  publishedTime?: string;
  author?: string;
  jsonLd?: Record<string, unknown>;
}

export default function SEOHead({
  title,
  description,
  path,
  type = 'website',
  image,
  publishedTime,
  author,
  jsonLd,
}: SEOHeadProps) {
  const fullTitle = path === '/' ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = `${SITE_URL}${path}`;
  const ogImage = image || DEFAULT_IMAGE;

  const defaultJsonLd = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'BlogPosting' : 'WebPage',
    name: fullTitle,
    description,
    url: canonicalUrl,
    ...(type === 'article' && publishedTime && {
      datePublished: publishedTime,
      author: {
        '@type': 'Person',
        name: author || SITE_NAME,
      },
      publisher: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
      image: ogImage,
      headline: title,
    }),
  };

  const structuredData = jsonLd || defaultJsonLd;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type === 'article' ? 'article' : 'website'} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="es_LA" />
      <meta property="og:site_name" content={SITE_NAME} />
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
