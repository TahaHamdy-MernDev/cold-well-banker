/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { BathRoom, BedRoom, FT } from '../../assets/icons';
import { MapPin } from 'lucide-react';
import { formatNumber } from '../../assets/common';

const Property = ({ item, index = 1 }) => {
  const { t, i18n } = useTranslation();

  // Memoize URLs and computed values to avoid recomputation
  const itemImage = useMemo(() => `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`, [item?.thumbnail]);
  const developer = useMemo(() => Array.isArray(item.developer) ? item.developer[0] : item.developer, [item.developer]);
  const developerImage = useMemo(() => developer ? `${import.meta.env.VITE_IMAGE_ORIGIN}/${developer.images[0]?.url}` : '', [developer]);
  const formattedPrice = useMemo(() => formatNumber(item.max_price), [item.max_price]);
  const firstTwoWords = useMemo(() => item.name[i18n.language].split(' ').slice(0, 3).join(' '), [item.name, i18n.language]);
  const areaTitle = useMemo(() => item.area[0]?.title[i18n.language] || item?.area?.title[i18n.language], [item.area, i18n.language]);
  const locality = useMemo(() => item.addressLocality[i18n.language], [item.addressLocality, i18n.language]);

  return (
    <div
      className="custom-property-unit bg-white rounded-2"
      // data-aos="fade-up"
      // data-aos-duration="1000"
      // data-aos-delay={200 * index}
      dir={i18n.dir()}
    >
      <div className="custom-property-image position-relative">
        <div
          className="z-3 p-2 position-absolute top-0 w-100 start-0 d-flex justify-content-end"
          style={{ borderRadius: '10px' }}
        >
          <div className="position-relative w-100">
            {item.featured && (
              <span className="custom-type position-absolute top-0 start-0 custom-type-featured p-1 rounded-4">
                Featured
              </span>
            )}
            <span className="custom-type position-absolute top-0 end-0 custom-type-sale p-1 rounded-4">
              {item.forRent
                ? 'Rent'
                : item.forSale
                ? 'Sale'
                : item.resale
                ? 'Resale'
                : ''}
            </span>
          </div>
        </div>
        <img
          className="w-100 custom-property-thumbnail"
          width="auto"
          loading="lazy"
          height="250"
          src={itemImage}
          alt={item.title}
        />
        <span className="position-absolute custom-developer-logo">
          {developer && (
            <Link to={`/developer-details/${developer?._id}`}>
              <img
                className="w-100 h-100 rounded-circle"
                src={developerImage}
                alt={developer?.name[i18n.language] || ''}
                loading="lazy"
              />
            </Link>
          )}
        </span>
      </div>
      <div className="custom-property-unit-information-wrapper p-2">
        <p className="custom-property-unit_description mb-1">
          <MapPin size={18} /> {areaTitle}, {locality}
        </p>
        <Link
          className="custom-property-unit_name"
          to={`/property-details/${item._id}`}
        >
          <h3>{firstTwoWords}</h3>
        </Link>
        <p className="custom-property-unit_price mb-1">
          ${formattedPrice} {t('egp')}
        </p>
        <div className="d-flex justify-content-start gap-4 py-1">
          <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
            <BathRoom />
            {item.number_of_bathrooms}
          </span>
          <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
            <BedRoom />
            {item.number_of_bedrooms}
          </span>
          <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
            <FT />
            {item.max_unit_area}m²
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Property);

// import { useTranslation } from 'react-i18next'
// import { Link } from 'react-router-dom'
// import { BathRoom, BedRoom, FT } from '../../assets/icons'
// import { MapPin } from 'lucide-react'
// import { formatNumber } from '../../assets/common'
// export default function Property({ item, index = 1 }) {
//   const { t, i18n } = useTranslation()
//   const itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`

//   // Handle developer
//   const developer = Array.isArray(item.developer)
//     ? item.developer[0]
//     : item.developer
//   const developerImage = developer
//     ? `${import.meta.env.VITE_IMAGE_ORIGIN}/${developer.images[0]?.url}`
//     : ''

//   // Handle formatted price
//   const formattedPrice = formatNumber(item.max_price)

//   // Handle property name and description
//   const words = item.name[i18n.language].split(' ')
//   const firstTwoWords = words.slice(0, 3).join(' ')

//   // Handle location details
//   const areaTitle =
//     item.area[0]?.title[i18n.language] || item?.area?.title[i18n.language]
//   const locality = item.addressLocality[i18n.language]
//   console.log('----------------------------------item', item)
//   return (
//     <div
//       className="custom-property-unit bg-white rounded-2"
//       data-aos="fade-up"
//       data-aos-duration="1000"
//       data-aos-delay={200 * index}
//       dir={i18n.dir()}
//     >
//       <div className="custom-property-image position-relative">
//         <div
//           className="z-3 p-2 position-absolute top-0 w-100 start-0 d-flex justify-content-end"
//           style={{ borderRadius: '10px' }}
//         >
//           <div className=" position-relative w-100">
//             {item.featured && (
//               <span className="custom-type position-absolute top-0 start-0 custom-type-featured p-1 rounded-4">
//                 Featured
//               </span>
//             )}
//             <span className="custom-type position-absolute top-0 end-0 custom-type-sale p-1 rounded-4">
//               {item.forRent
//                 ? 'Rent'
//                 : item.forSale
//                   ? 'Sale'
//                   : item.resale
//                     ? 'Resale'
//                     : ''}
//             </span>
//           </div>
//         </div>
//         <img
//           className="w-100 custom-property-thumbnail"
//           width="auto"
//           loading="lazy"
//           height="250"
//           src={itemImage}
//           alt={item.title}
//         />
//         <span className="position-absolute custom-developer-logo">
//           {developer && (
//             <Link to={`/developer-details/${developer?._id}`}>
//               <img
//                 className="w-100 h-100 rounded-circle"
//                 src={developerImage}
//                 alt={developer?.name[i18n.language] || ''}
//               />
//             </Link>
//           )}
//         </span>
//       </div>
//       <div className="custom-property-unit-information-wrapper p-2">
//         <p className="custom-property-unit_description mb-1">
//           <MapPin size={18} /> {areaTitle}, {locality}
//         </p>
//         <Link
//           className="custom-property-unit_name"
//           to={`/property-details/${item._id}`}
//         >
//           <h3>{firstTwoWords}</h3>
//         </Link>
//         <p className="custom-property-unit_price mb-1">
//           ${formattedPrice} {t('egp')}
//         </p>
//         <div className="d-flex justify-content-start gap-4 py-1">
//           <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
//             <BathRoom />
//             {item.number_of_bathrooms}
//           </span>
//           <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
//             <BedRoom />
//             {item.number_of_bedrooms}
//           </span>
//           <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
//             <FT />
//             {item.max_unit_area}m²
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }
// export default function Property({ item, index = 1 }) {

//   const { t,i18n } = useTranslation()
//   let itemImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item?.thumbnail[0].url}`;

//   let developerImage = `${import.meta.env.VITE_IMAGE_ORIGIN}/${item.developer[0]?.images[0]?.url|| item.developer.images[0].url}`;
//   const formattedPrice = formatNumber(item.max_price)
//   // Number().toLocaleString('en-US');
//   const words = item.name[i18n.language].split(' ');
//   const firstTwoWords = words.slice(0, 3).join(' ');
//   const description = item.description[i18n.language].slice(0, 250 - 3) + '...';

//   return (
//     <div
//       className="custom-property-unit bg-white rounded-2"
//       data-aos="fade-up"
//       data-aos-duration="1000"
//       data-aos-delay={200 * index}
//       dir={i18n.dir()}
//     >
//       <div className="custom-property-image position-relative">
//         <div
//           className="z-3 p-2 position-absolute top-0 w-100 start-0 d-flex justify-content-end"
//           style={{ borderRadius: '10px' }}
//         >
//           <div className=" position-relative w-100">
//             {item.featured &&(
//                <span className="custom-type position-absolute top-0 start-0 custom-type-featured p-1 rounded-4">
//                 Featured
//             </span>
//             )

//             }

//             <span className="custom-type position-absolute top-0 end-0 custom-type-sale p-1 rounded-4">
//             {item.forRent&& "Rent"|| item.forSale &&"Sale"}
//             </span>
//           </div>
//         </div>
//         <img
//           className="w-100 custom-property-thumbnail"
//           width="auto"
//           loading="lazy"
//           height="250"
//           src={itemImage}
//           alt={item.title}
//         />
//         <span className="position-absolute custom-developer-logo">
//           <Link to={`/developer-details/${item.developer[0]?._id || item.developer?._id}`}>
//             <img
//               className="w-100 h-100 rounded-circle"
//               src={developerImage}
//               alt={item.developer[0]?.name[i18n.language] ||item.developer?.name[i18n.language]}
//             />
//           </Link>
//         </span>
//       </div>
//       <div className="custom-property-unit-information-wrapper p-2">
//         <p className="custom-property-unit_description mb-1"><MapPin size={18}   /> {item.area[0]?.title[i18n.language]||item?.area?.title[i18n.language] }, {item.addressLocality[i18n.language]} </p>
//         <Link
//           className="custom-property-unit_name"
//           to={`/property-details/${item._id}`}
//         >
//          <h3>
//          {firstTwoWords}
//           </h3>
//         </Link>
//         <p className="custom-property-unit_price mb-1">${formattedPrice} {t('egp')}</p>
//         <div className="d-flex justify-content-start gap-4 py-1">
//           <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
//             <BathRoom />
//             {item.number_of_bathrooms}
//           </span>
//           <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
//             <BedRoom />
//             {item.number_of_bedrooms}
//           </span>
//           <span className="d-flex justify-content-center align-items-center gap-2 text-primary-blue">
//             <FT />
//             {item.max_unit_area}m²
//           </span>
//         </div>
//       </div>
//     </div>
//   )
// }
