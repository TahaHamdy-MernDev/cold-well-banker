import React, { useEffect, useState, useCallback, useMemo } from 'react';
import Title from './Common/Title';
import CompoundCard from './Cards/compoundCard';
import { useTranslation } from 'react-i18next';
import Carousel from './Common/Carousel';
import { FetchTopCompounds } from '../Api/ApiCalls';
import DataLoader from './Common/DataLoader';

const TopCompounds = React.memo(() => {
  const { t } = useTranslation();
  const [topCompounds, setTopCompounds] = useState([]);
  
  const fetchData = useCallback(async () => {
    try {
      const data = await FetchTopCompounds();
      setTopCompounds(data);
    } catch (err) {
      console.error('Error fetching top compounds:', err);
    } 
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const carouselSettings = useMemo(() => ({
    lg: 5.2,
    md: 4.2,
    sm: 1.2,
  }), []);

  
  return (
    <section className="container-xxl section-padding">
      <div className="container p-2">
        <h2 className=' sup-title'>
{t('compoundDetails.topCompound')}
        </h2>
        {/* <Title title= /> */}
        <div className="row">
          <Carousel
            lg={carouselSettings.lg}
            md={carouselSettings.md}
            sm={carouselSettings.sm}
            items={topCompounds}
            Component={CompoundCard}

          />
        </div>
      </div>
    </section>
  );
});

export default TopCompounds;
