import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => {
  return (
    <ToastContainer
      autoClose={1000}
      limit={1}
      className="toaster-container"
      position="top-right"
      onClick={() => toast.dismiss()}
    />
  );
};
export const notify = () => {
    toast.success("Successfully Created!");
  };
export default Toaster;
