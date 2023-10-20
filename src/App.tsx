import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router";


function App() {
  
  return (
    <div
      className={`h-screen overflow-y-scroll no-scrollbar w-full mx-auto`}
    >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
