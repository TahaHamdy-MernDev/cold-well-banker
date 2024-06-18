import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Property from '../Cards/Property';

function Elements({ currentElements, Component }) {
  console.log("----------------------" , currentElements);
  return (
    <>
      {currentElements &&
        currentElements?.map((element, index) => (
       <Component key={element._id} item={element}/>
        ))}
    </>
  );
}

function PaginatedItems({ data, pageSize, initialPage = 0, Component }) {
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(initialPage * pageSize);

  useEffect(() => {
    const endOffset = itemOffset + pageSize;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / pageSize));
  }, [itemOffset, pageSize, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * pageSize) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <>
    <div className="row gy-4 gx-5">
      <Elements currentElements={currentItems} Component={Component} />
    </div>
    <div className="row">
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        />
        </div>
    </>
  );
}

export default PaginatedItems;
