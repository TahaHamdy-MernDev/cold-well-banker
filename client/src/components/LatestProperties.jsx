import React, { useCallback, useEffect, useState } from 'react';
import { FetchLatestProperties } from '../Api/ApiCalls';
import Property from './Cards/Property';
import Title from './Common/Title';
import { useTranslation } from 'react-i18next';
import Carousel from './Common/Carousel';

const LatestProperties = React.memo(() => {
  const { t } = useTranslation();
  const [latestProperties, setLatestProperties] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      const data = await FetchLatestProperties();
      setLatestProperties(data);
    } catch (err) {
      console.error('Error fetching latest properties:', err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <section className="container-xxl section-padding mb-4">
      <div className="container card-style latest-properties">
        <Title title={t('latestProperties')} />
        <div className="row gx-4 gy-5">
          <Carousel sm={1.1} md={2.2} lg={2.9} Component={Property} items={latestProperties} />
        </div>
      </div>
    </section>
  );
});

export default LatestProperties;
