import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Toaster = () => {
  return (
    <ToastContainer
      autoClose={5000}
      limit={1}
      className="toaster-container"
      position="bottom-right"
      onClick={() => toast.dismiss()}
    />
  );
};
export const notify = () => {
    console.log("hiiiiiiiiiiiii");
    toast.success("Successfully Created!");
  };
export default Toaster;
