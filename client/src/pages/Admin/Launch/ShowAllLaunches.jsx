import React, { useEffect, useState } from "react";
import Api from "../../../Api/ApiCalls";;
import { Spinner, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MdDelete, MdEdit } from "react-icons/md";
const fetchLaunches = async () => {
  const { data } = await Api.get("/launch/get-all");
  return data.data;
};
export default function ShowAllLaunches() {
  const [launches, setLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadLaunches = async () => {
      try {
        const data = await fetchLaunches();
        setLaunches(data);
      } catch (error) {
        console.error("Failed to fetch launches", error);
      } finally {
        setLoading(false);
      }
    };
    loadLaunches()
  }, []);

  if (loading) {
    return <div className=" position-absolute top-50 start-50 translate-middle" >
      <Spinner   animation="border" />;
    </div>
  }
  function getFirstTwoWords(text) {
    const words = text.split(" ");
    return words.slice(0, 6).join(" ");
  }
  return (
    <div className="table-responsive">

    <Table striped bordered hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Developer</th>
        <th>Call Us Number</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {launches?.map((launch, index) => (
        <tr key={launch._id}>
          <td>{index + 1}</td>
          <td>{getFirstTwoWords(launch.launchName.ar)}</td>
         <td>{launch.developer.name.ar}</td>
          <td>{launch.developer.callUsNumber}</td>
          <td>
            <div className="d-flex justify-content-between">
             <Link to={`/update-launch/${launch._id}`}><MdEdit size={22} />
             </Link> 
              <MdDelete size={22} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </Table> 
  </div>
  );
}
