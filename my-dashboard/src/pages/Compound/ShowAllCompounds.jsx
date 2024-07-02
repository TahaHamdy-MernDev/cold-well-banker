import React, { useEffect, useState } from 'react'
import { Spinner, Table } from 'react-bootstrap';
import Api from '../../Api';
import { Link } from 'react-router-dom';
import { MdDelete, MdEdit } from 'react-icons/md';
const fetchCompounds = async()=>{
  const response = await Api.get("/compound/get-all");
  return response.data.data;
}
export default function ShowAllCompounds() {
  const [compounds,setCompounds] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCompounds = async () => {
      try {
        const data = await fetchCompounds();
        console.log(data);
        setCompounds(data);
      } catch (error) {
        console.error("Failed to fetch compounds", error);
      } finally {
        setLoading(false);
      }
    };

    loadCompounds();
  }, []);


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
        <th>Area</th>
        <th>Developer</th>
        <th>Properties</th>
        <th>Call Us Number</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {compounds?.map((compound, index) => (
        <tr key={compound._id}>
          <td>{index + 1}</td>
          <td>{getFirstTwoWords(compound.name.ar)}</td>
          <td>{compound.area[0].title.ar}</td>
          <td>{getFirstTwoWords(compound.developer[0].name.ar)}</td>
          <td>{compound.properties.length}</td>
          <td>{compound.contactUsNumber}</td>
          <td>
            <div className="d-flex justify-content-between">
             <Link to={`/update-compound/${compound._id}`}><MdEdit size={22} />
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
