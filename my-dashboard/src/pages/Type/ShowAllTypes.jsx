import React, { useEffect, useState } from "react";
import Api from "../../Api";
import { Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
const fetchTypes = async () => {
  const { data } = await Api.get("/type/get-all");
  return data.data;
};
export default function ShowAllTypes() {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadTypes = async () => {
      try {
        const data = await fetchTypes();
        console.table(data);
        setTypes(data);
      } catch (error) {
        console.error("Failed to fetch types", error);
      } finally {
        setLoading(false);
      }
    };
    loadTypes()
  },[]);
  if (loading) {
    return <div className=" position-absolute top-50 start-50 translate-middle" >
      <Spinner   animation="border" />;
    </div>
  }
  function getFirstTwoWords(text) {
    const words = text.split(" ");
    return words.slice(0, 2).join(" ");
  }
  return (
    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Name (Ar)</th>
        <th>Name (En)</th>
        <th>Properties</th>

        <th></th>
      </tr>
    </thead>
    <tbody>
      {types?.map((type, index) => (
        <tr key={type._id}>
          <td>{index + 1}</td>
          <td>{getFirstTwoWords(type.name.ar)}</td>
          <td>{getFirstTwoWords(type.name.en)}</td>
          <td>{type.propertiesCount}</td>
          <td>
            <div className="d-flex justify-content-between">
             <Link to={`/update-type/${type._id}`}><MdEdit size={22} />
             </Link> 
              <MdDelete size={22} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  )
}
