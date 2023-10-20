import React from "react";
import Signi from "./Signi";
import Appbar from "../../components/Navbar";

const Signin: React.FC = () => {
  return (
    <>
      <Appbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="max-w-md w-full px-6 py-8 bg-white  rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-black-700 mb-8">
            Sign in
          </h1>
          <Signi />
        </div>
      </div>
    </>
  );
};

export default Signin;
