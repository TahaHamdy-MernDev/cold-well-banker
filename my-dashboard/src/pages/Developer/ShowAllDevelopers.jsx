import React, { useEffect, useState } from "react";
import Api from "../../Api";
import { Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
const fetchDevelopers = async () => {
  const response = await Api.get("/developer/get-all");
  console.log(response);
  return response.data.data;
};
export default function ShowAllDevelopers() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadDevelopers = async () => {
      console.log("hhhhh");
      try {
        const data = await fetchDevelopers();
        console.log(data);
        setDevelopers(data);
      } catch (error) {
        console.log(error);
        console.error("Failed to fetch developers", error);
      } finally {
        setLoading(false);
      }
    };
    loadDevelopers()
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
        <th>Name</th>
        <th>Properties</th>
        <th>Compounds</th>
        <th>Launches</th>
        <th>Call Us Number</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {developers?.map((developer, index) => (
        <tr key={developer._id}>
          <td>{index + 1}</td>
          <td>{getFirstTwoWords(developer.name.ar)}</td>
          <td>{developer.properties.length}</td>
          <td>{developer.compounds.length}</td>
          <td>{developer.launches.length}</td>
          {/* <td>{developer.properties.length}</td> */}
          {/* <td>{getFirstTwoWords(developer.developer[0].name.ar)}</td> */}
          <td>{developer.callUsNumber}</td>
          <td>
            <div className="d-flex justify-content-between">
             <Link to={`/update-developer/${developer._id}`}><MdEdit size={22} />
             </Link> 
              <MdDelete size={22} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  );
}
