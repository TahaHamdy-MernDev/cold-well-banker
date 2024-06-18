import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FetchAreaDetails } from '../Api/ApiCalls';
import { useTranslation } from 'react-i18next';
import { ContactUs } from '../components/Common/Buttons';
import Description from '../components/Common/Description';
import PaginatedItems from '../components/Common/PaginatedItems';
import Compound from '../components/Cards/Compound';

export default function AreaDetails() {
  const { id } = useParams();
  const { i18n, t } = useTranslation();
  const [areaDetails, setAreaDetails] = useState(null);
  const [compounds, setCompounds] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const fetchData = useCallback(
    async (pageNumber = 1) => {
      const data = await FetchAreaDetails(id, pageNumber, pageSize);
      setAreaDetails(data.area);
      setCompounds(data.pagination.compounds);
      console.log(data.pagination);
      setTotalPages(data.pagination.totalPages);
    },
    [id, pageSize]
  );

  useEffect(() => {
    fetchData(page);
  }, [fetchData, page]);

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const areaImage = areaDetails?.images
    ? `${import.meta.env.VITE_IMAGE_ORIGIN}/${areaDetails.images[0].url}`
    : '';

  return (
    <div className="container-xxl my-5">
      <div className="container">
        <div className="row border-bottom d-flex justify-content-start align-items-center py-4">
          <div className="col-3 col-md-1 mb-4">
            <img
              src={areaImage}
              className="object-fit-cover rounded-circle"
              loading="lazy"
              width="80"
              height="80"
              alt="area"
            />
          </div>
          <div className="col-6 col-md-9 mb-4">
            <div className="d-flex flex-column justify-content-center">
              <h2 className="area-title">
                {areaDetails?.title[i18n.language]}
              </h2>
              <p className="p-custom">
                10 {t('areaDetails.propertiesAvailable')}
              </p>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-end justify-content-md-end align-items-end">
            <ContactUs number={areaDetails?.callUsNumber} />
          </div>
        </div>
      </div>
      <div className="container">
        <Description
          title={areaDetails?.title[i18n.language]}
          description={areaDetails?.description[i18n.language]}
        />
      </div>
      <div className="container mt-5">
<div className="sup-title mb-2">{t('areaDetails.compoundsIn')} {areaDetails?.title[i18n.language]} </div>

        {compounds && (
          <PaginatedItems
          data={compounds}
          pageSize={4}
          initialPage={page - 1}
          Component={Compound}
          />
        )}
      </div>
    </div>
  );
}
