import React from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'

export default function Description({ title, description }) {
  const { t } = useTranslation()

  const getFirstTwoWords = (str) => {
    const words = str?.split(' ')
    return words?.slice(0, 2).join(' ')
  }

  const truncatedTitle = getFirstTwoWords(title)

  return (
    <div className="mt-5">
      <h2 className="description-title">
        {t('propertyDetails.about')} {truncatedTitle}
      </h2>
      <div
        className="description"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  )
}

Description.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
