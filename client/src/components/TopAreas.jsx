import React, { useEffect, useState, useCallback } from 'react';
import Title from './Common/Title';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FetchTopAreas } from '../Api/ApiCalls';

const TopAreas = React.memo(() => {
  const { t, i18n } = useTranslation();
  const [topAreas, setTopAreas] = useState([]);


  const fetchData = useCallback(async () => {
    try {
      const data = await FetchTopAreas();
      setTopAreas(data);
    } catch (err) {
      console.error('Error fetching top areas:', err);
    }
  }, [t]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);


  return (
    <section className="container-xxl section-padding">
      <div className="container p-2">
        <h2 className="sup-title">
          {t('topArea')}
        </h2>
        <div className="row gy-5">
          {topAreas.map((area, index) => {
            const itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${area.images[0].url}`;
            const name = area.title[i18n.language];
            return (
              <div className="col-md-3" key={index}>
                <Link
                  to={`/area-details/${area._id}`}
                  className="area-card px-2 py-5 border rounded-2 d-flex flex-column gap-2 align-items-center justify-content-center mb-2"
                >
                  <img
                    width="75"
                    height="75"
                    loading="lazy"
                    src={itemImage}
                    alt={name}
                    className="object-fit-cover rounded-circle"
                  />
                  <div className="z-3 text-primary-white w-100 d-flex justify-content-center flex-column gap-2 align-items-center">
                    <h4 className="text-primary-black text-center text-wrap mb-0">{name}</h4>
                    <p className="mb-0 text-secondary-gray">
                      {area.numberOfCompounds || 0} {t('titles.compounds')}
                    </p>
                    <p className="mb-0 text-secondary-gray">
                      {area.numberOfProperties || 0} {t('titles.propertiesAvailable')}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default TopAreas;
