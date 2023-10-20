import React from "react";
import SignupForm from "./SignupForm";
import Appbar from "../../components/Navbar";

// Dialogue 1: Let's define the Signup component
const Signup: React.FC = () => {
  return (
    <>
      <Appbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
        <div className="max-w-md w-full px-6 py-8 bg-white dark:bg-slate-700 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-center text-blue-700  mb-8">
            Sign up
          </h1>
          <SignupForm />
        </div>
      </div>
    </>
  );
};

// Dialogue 3: And finally, we've to export the component
export default Signup;
