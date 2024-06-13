import React, { useEffect, useState, useMemo } from 'react';
import Title from './Common/Title';
import CompoundCard from './Cards/compoundCard'
import { useTranslation } from 'react-i18next';
import Carousel from './Common/Carousel';
import { FetchTopCompounds } from '../Api/ApiCalls';
import DataLoader from './Common/DataLoader';

export default function TopCompounds() {
  const { t } = useTranslation();
  const [topCompounds, setTopCompounds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await FetchTopCompounds();
        setTopCompounds(data);
      } catch (error) {
        console.error('Error fetching top compounds:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);


  if (loading) return <DataLoader />;

  return (
    <section className="container-xxl section-padding">
      <div className="container card-style">
        <Title title={t('compoundDetails.topCompound')} />
        <div className="row">
          <Carousel 
           lg={5.2}
           md={4.2}
           sm={1.2}
            items={topCompounds} 
            Component={CompoundCard} 

          />
        </div>
      </div>
    </section>
  );
}
