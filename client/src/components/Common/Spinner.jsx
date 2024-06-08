import React from "react";

function Spinner() {
  return (

      <div
        className=" bg-white  position-fixed vw-100  vh-100 top-50 start-50 "
        style={{ zIndex: "9999999" }}
      >
        <div className="new_prelader"></div>
      </div>

  );
}

export default Spinner;
