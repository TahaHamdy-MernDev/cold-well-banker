import React from 'react'
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

const Seo = ({ title, description, url, page }) => {
  const { t, i18n } = useTranslation()

  const defaultTitle = t('SEO.title')
  const defaultDescription = t('SEO.description')
  const siteName = t('SEO.siteName')
  const pageUrl = url || import.meta.env.VITE_WEBSITE_URI
  const pageImage = '/favicon.png'
  const pageType = 'website'

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: pageUrl,
    name: title || defaultTitle,
    description: description || defaultDescription,
    inLanguage: i18n.language,
    image: pageImage,
  }

  return (
    <Helmet>
      <title>{(title || defaultTitle) + '| ' + page}</title>
      <meta name="description" content={description || defaultDescription} />

      <meta property="og:type" content={pageType} />
      <meta
        property="og:title"
        content={(title || defaultTitle) + '| ' + page}
      />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={pageImage} />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:title"
        content={(title || defaultTitle) + '| ' + page}
      />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={pageImage} />

      <link rel="canonical" href={pageUrl} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  )
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
}

export default Seo
