import React, { useEffect, useState } from "react";
import { Table, Spinner } from "react-bootstrap";

import Api from "../../Api";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
const fetchAreas = async () => {
  const response = await Api.get("/area/get-all");
  return response.data.data;
};
export default function ShowAllAreas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAreas = async () => {
      try {
        const data = await fetchAreas();
        console.log(data);
        setAreas(data);
      } catch (error) {
        console.error("Failed to fetch areas", error);
      } finally {
        setLoading(false);
      }
    };

    loadAreas();
  }, []);

  if (loading) {
    return (
      <div className=" position-absolute top-50 start-50 translate-middle">
        <Spinner animation="border" />
      </div>
    );
  }
  function getFirstTwoWords(text) {
    const words = text.split(" ");
    return words.slice(0, 2).join(" ");
  }
  return (
    <div className="table-responsive">

    
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Title (AR)</th>
          <th>Properties</th>
          <th>Developers</th>
          <th>Compounds</th>
          <th>Call Us Number</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {areas?.map((area, index) => (
          <tr key={area._id}>
            <td>{index + 1}</td>
            <td>{getFirstTwoWords(area.title.ar)}</td>
            <td>{area.propertiesAvailable}</td>
            <td>{area.developers.length}</td>
            <td>{area.compounds.length}</td>

            <td>{area.callUsNumber}</td>
            <td>
              <div className="d-flex justify-content-between">
               <Link to={`/update-area/${area._id}`}><MdEdit size={22} />
               </Link> 
                <MdDelete size={22} />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table></div>
  );
}
